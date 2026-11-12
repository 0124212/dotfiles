#Requires -RunAsAdministrator
# Live-system port of E:\autounattend.xml. Skipped: disk/partition, accounts/autologon, computer name,
# German keyboard / W. Europe TZ / en-150 locale, 8.3 strip, junction deletion (breaks scoop), update pause,
# taskbar pin lock, Zen Browser. Kept: Windows Terminal, OpenSSH client, Windows Hello face.
$ErrorActionPreference = 'Continue'
Start-Transcript "$env:TEMP\debloat.log" -Force

function SetReg($key, $name, $value, $type = 'DWord') {
    $p = "Registry::$key"
    if (!(Test-Path -LiteralPath $p)) { New-Item -Path $p -Force | Out-Null }
    Set-ItemProperty -LiteralPath $p -Name $name -Value $value -Type $type -Force
}

# ---------- System (HKLM) ----------
$pe = 'HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer'
SetReg $pe NoDriveAutoRun 0x3FFFFFF; SetReg $pe NoDriveTypeAutoRun 0xFF
SetReg 'HKLM\SYSTEM\CurrentControlSet\Control\Remote Assistance' fAllowToGetHelp 0
SetReg 'HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Communications' ConfigureChatAutoInstall 0
$cc = 'HKLM\Software\Policies\Microsoft\Windows\CloudContent'
SetReg $cc DisableCloudOptimizedContent 1; SetReg $cc DisableWindowsConsumerFeatures 1
SetReg 'HKLM\SYSTEM\CurrentControlSet\Control\FileSystem' LongPathsEnabled 1
SetReg 'HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Power' HiberbootEnabled 0
SetReg 'HKLM\SOFTWARE\Policies\Microsoft\Dsh' AllowNewsAndInterests 0
SetReg 'HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Authentication\LogonUI\BootAnimation' DisableStartupSound 1
SetReg 'HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\EditionOverrides' UserSetting_DisableStartupSound 1
SetReg 'HKLM\SYSTEM\CurrentControlSet\Control\BitLocker' PreventDeviceEncryption 1
SetReg 'HKLM\Software\Policies\Microsoft\Edge' HideFirstRunExperience 1
SetReg 'HKLM\Software\Policies\Microsoft\Edge\Recommended' BackgroundModeEnabled 0
SetReg 'HKLM\Software\Policies\Microsoft\Edge\Recommended' StartupBoostEnabled 0
SetReg 'HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\System' DisableAutomaticRestartSignOn 1
SetReg 'HKLM\System\CurrentControlSet\Control\Session Manager' DisableWpbtExecution 1
SetReg 'HKLM\Software\Microsoft\Windows\CurrentVersion\Device Metadata' PreventDeviceMetadataFromNetwork 1
SetReg 'HKLM\Software\Microsoft\Windows\CurrentVersion\Device Installer' DisableCoInstallers 1
SetReg 'HKLM\SOFTWARE\Microsoft\PolicyManager\current\device\Start' ConfigureStartPins '{"pinnedList":[]}' String
net.exe accounts /lockoutthreshold:0
net.exe accounts /maxpwage:UNLIMITED
Set-ExecutionPolicy -Scope LocalMachine RemoteSigned -Force
fsutil.exe behavior set disableLastAccess 1
Remove-Item 'C:\Users\Public\Desktop\Microsoft Edge.lnk', "$env:USERPROFILE\Desktop\Microsoft Edge.lnk" -ErrorAction SilentlyContinue
# "New > Text Document" keeps working after Store Notepad is removed
reg.exe add 'HKCR\.txt\ShellNew' /v ItemName /t REG_EXPAND_SZ /d '@C:\Windows\system32\notepad.exe,-470' /f
reg.exe add 'HKCR\.txt\ShellNew' /v NullFile /t REG_SZ /f
reg.exe add 'HKCR\txtfilelegacy' /v FriendlyTypeName /t REG_EXPAND_SZ /d '@C:\Windows\system32\notepad.exe,-469' /f
reg.exe add 'HKCR\txtfilelegacy' /ve /t REG_SZ /d 'Text Document' /f
# Make Edge uninstallable
try {
    $f = 'C:\Windows\System32\IntegratedServicesRegionPolicySet.json'
    takeown.exe /f $f /a | Out-Null; icacls.exe $f /grant '*S-1-5-32-544:F' | Out-Null  # TrustedInstaller-owned
    $o = Get-Content $f -Encoding UTF8 | ConvertFrom-Json
    $o.policies | Where-Object guid -eq '{1bca278a-5d11-4acf-ad2f-f9ab6d7f93a6}' | ForEach-Object { $_.defaultState = 'enabled' }
    $o | ConvertTo-Json -Depth 9 | Out-File $f -Encoding UTF8
} catch { $_ }

# ---------- Security (opted in) ----------
SetReg 'HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer' SmartScreenEnabled 'Off' String
$wt = 'HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\WTDS\Components'
'ServiceEnabled', 'NotifyMalicious', 'NotifyPasswordReuse', 'NotifyUnsafeApp' | ForEach-Object { SetReg $wt $_ 0 }
SetReg 'HKLM\SOFTWARE\Policies\Microsoft\Windows Defender Security Center\Systray' HideSystray 1
SetReg 'HKLM\System\CurrentControlSet\Control\DeviceGuard' EnableVirtualizationBasedSecurity 0
$hv = 'HKLM\System\CurrentControlSet\Control\DeviceGuard\Scenarios\HypervisorEnforcedCodeIntegrity'
'Enabled', 'EnabledBootId', 'WasEnabledBy' | ForEach-Object { SetReg $hv $_ 0 }
SetReg 'HKCU\Software\Microsoft\Edge\SmartScreenEnabled' '(Default)' 0
SetReg 'HKCU\Software\Microsoft\Edge\SmartScreenPuaEnabled' '(Default)' 0
SetReg 'HKCU\Software\Microsoft\Windows\CurrentVersion\AppHost' EnableWebContentEvaluation 0
SetReg 'HKCU\Software\Microsoft\Windows\CurrentVersion\AppHost' PreventOverride 0
Disable-ComputerRestore -Drive 'C:\'

# ---------- Current user (HKCU) ----------
$adv = 'HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced'
SetReg $adv LaunchTo 1; SetReg $adv HideFileExt 0; SetReg $adv Hidden 1; SetReg $adv ShowSuperHidden 1
SetReg $adv ShowTaskViewButton 0; SetReg $adv ShowInfoTip 0; SetReg $adv TaskbarAnimations 0; SetReg $adv ListviewShadow 0; SetReg $adv ListviewAlphaSelect 1
SetReg "$adv\TaskbarDeveloperSettings" TaskbarEndTask 1
SetReg 'HKCU\Software\Microsoft\Windows\CurrentVersion\Search' SearchboxTaskbarMode 0
SetReg 'HKCU\Software\Policies\Microsoft\Windows\Explorer' DisableSearchBoxSuggestions 1
SetReg 'HKCU\Software\Policies\Microsoft\Windows\WindowsCopilot' TurnOffWindowsCopilot 1
SetReg 'HKCU\Software\Microsoft\Notepad' ShowStoreBanner 0
SetReg 'HKCU\Software\Microsoft\Windows\CurrentVersion\GameDVR' AppCaptureEnabled 0
SetReg 'HKCU\Software\Microsoft\Windows\DWM' ColorPrevalence 0
SetReg 'HKCU\Software\Microsoft\Windows\DWM' EnableAeroPeek 0
reg.exe add 'HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32' /ve /f  # classic context menu
$cdm = 'HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager'
'ContentDeliveryAllowed', 'FeatureManagementEnabled', 'OEMPreInstalledAppsEnabled', 'PreInstalledAppsEnabled',
'PreInstalledAppsEverEnabled', 'SilentInstalledAppsEnabled', 'SoftLandingEnabled', 'SubscribedContentEnabled',
'SubscribedContent-310093Enabled', 'SubscribedContent-338387Enabled', 'SubscribedContent-338388Enabled',
'SubscribedContent-338389Enabled', 'SubscribedContent-338393Enabled', 'SubscribedContent-353694Enabled',
'SubscribedContent-353696Enabled', 'SubscribedContent-353698Enabled', 'SystemPaneSuggestionsEnabled' | ForEach-Object { SetReg $cdm $_ 0 }
# Lock keys off at boot, Sticky Keys off, no pointer precision
foreach ($root in 'HKCU', 'HKU\.DEFAULT') {
    SetReg "$root\Control Panel\Keyboard" InitialKeyboardIndicators '0' String
    SetReg "$root\Control Panel\Accessibility\StickyKeys" Flags '10' String
}
'MouseSpeed', 'MouseThreshold1', 'MouseThreshold2' | ForEach-Object { SetReg 'HKCU\Control Panel\Mouse' $_ '0' String }
# System sounds off
Set-ItemProperty 'Registry::HKCU\AppEvents\Schemes' '(Default)' '.None'
$excl = Get-ChildItem 'Registry::HKCU\AppEvents\EventLabels' | Where-Object { ($_ | Get-ItemProperty).ExcludeFromCPL -eq 1 } | Select-Object -ExpandProperty PSChildName
Get-ChildItem 'Registry::HKCU\AppEvents\Schemes\Apps\*\*' | Where-Object PSChildName -NotIn $excl |
    Get-ChildItem -Include '.Current' | Set-ItemProperty -Name '(Default)' -Value ''
# Visual effects: custom (keep thumbnails, alpha select, full-window drag, font smoothing)
SetReg 'HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\VisualEffects' VisualFXSetting 3
SetReg 'HKCU\Control Panel\Desktop' UserPreferencesMask ([byte[]](0x90, 0x12, 0x03, 0x80, 0x10, 0, 0, 0)) Binary
SetReg 'HKCU\Control Panel\Desktop' DragFullWindows '1' String
SetReg 'HKCU\Control Panel\Desktop' FontSmoothing '2' String
SetReg 'HKCU\Control Panel\Desktop\WindowMetrics' MinAnimate '0' String
# Desktop icons: only Control Panel + Recycle Bin
foreach ($k in 'ClassicStartMenu', 'NewStartPanel') {
    $h = "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\HideDesktopIcons\$k"
    '{b4bfcc3a-db2c-424c-b029-7fe99a87c641}', '{a8cdff1c-4878-43be-b5fd-f8091c1c60d0}', '{374de290-123f-4565-9164-39c4925e467b}',
    '{e88865ea-0e1c-4e20-9aa6-edcd0212c87c}', '{f874310e-b6b7-47dc-bc84-b9e6b38f5903}', '{1cf1260c-4dd0-4ebb-811f-33c572699fde}',
    '{f02c1a0d-be21-4350-88b0-7367fc96ef3c}', '{3add1653-eb32-4cb0-bbd7-dfa0abb5acca}', '{20d04fe0-3aea-1069-a2d8-08002b30309d}',
    '{59031a47-3f72-44a7-89c5-5595fe6b30ee}', '{a0953c92-50dc-43bf-be83-3742fed03c9c}' | ForEach-Object { SetReg $h $_ 1 }
    '{5399e694-6ce5-4d6c-8fce-1d8870fdcba0}', '{645ff040-5081-101b-9f08-00aa002f954e}' | ForEach-Object { SetReg $h $_ 0 }
}
# Start menu folders: File Explorer + Settings
SetReg 'HKCU\Software\Microsoft\Windows\CurrentVersion\Start' VisiblePlaces ([convert]::FromBase64String('vCSKFAzWiUKggG7Zu6JIgoYIc1KqUUNCn3sndlhGWdQ=')) Binary

# ---------- Theme: dark, #707070 accent, no transparency, solid black wallpaper ----------
$pz = 'HKCU\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize'
SetReg $pz SystemUsesLightTheme 0; SetReg $pz AppsUseLightTheme 0; SetReg $pz ColorPrevalence 0; SetReg $pz EnableTransparency 0
$c = [byte[]](0x70, 0x70, 0x70, 0xFF); $dw = [BitConverter]::ToUInt32($c, 0)
$ac = 'HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Accent'
SetReg $ac StartColorMenu $dw; SetReg $ac AccentColorMenu $dw; SetReg 'HKCU\Software\Microsoft\Windows\DWM' AccentColor $dw
$pal = Get-ItemPropertyValue "Registry::$ac" AccentPalette -ErrorAction SilentlyContinue
if ($pal) { $c.CopyTo($pal, 20); SetReg $ac AccentPalette $pal Binary }
Add-Type -Namespace W -Name U -MemberDefinition @'
[DllImport("user32.dll")] public static extern bool SetSysColors(int n, int[] e, int[] v);
[DllImport("user32.dll", CharSet = CharSet.Unicode)] public static extern bool SystemParametersInfo(uint a, uint p, string s, uint f);
'@
[W.U]::SystemParametersInfo(20, 0, '', 3) | Out-Null
[W.U]::SetSysColors(1, @(1), @(0)) | Out-Null
SetReg 'HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Wallpapers' BackgroundType 1
SetReg 'HKCU\Control Panel\Desktop' WallPaper '' String
SetReg 'HKCU\Control Panel\Colors' Background '0 0 0' String

# ---------- Remove apps ----------
$pkgs = 'Microsoft.Microsoft3DViewer', 'Microsoft.BingSearch', 'Microsoft.WindowsCalculator', 'Microsoft.WindowsCamera',
'Clipchamp.Clipchamp', 'Microsoft.WindowsAlarms', 'Microsoft.Copilot', 'Microsoft.549981C3F5F10', 'Microsoft.Windows.DevHome',
'MicrosoftCorporationII.MicrosoftFamily', 'Microsoft.WindowsFeedbackHub', 'Microsoft.Edge.GameAssist', 'Microsoft.GetHelp',
'Microsoft.Getstarted', 'microsoft.windowscommunicationsapps', 'Microsoft.WindowsMaps', 'Microsoft.MixedReality.Portal',
'Microsoft.BingNews', 'Microsoft.WindowsNotepad', 'Microsoft.MicrosoftOfficeHub', 'Microsoft.Office.OneNote',
'Microsoft.OutlookForWindows', 'Microsoft.Paint', 'Microsoft.MSPaint', 'Microsoft.People', 'Microsoft.Windows.Photos',
'Microsoft.PowerAutomateDesktop', 'MicrosoftCorporationII.QuickAssist', 'Microsoft.SkypeApp', 'Microsoft.ScreenSketch',
'Microsoft.MicrosoftSolitaireCollection', 'Microsoft.MicrosoftStickyNotes', 'Microsoft.WindowsStore', 'Microsoft.StorePurchaseApp',
'MicrosoftTeams', 'MSTeams', 'Microsoft.Todos', 'Microsoft.WindowsSoundRecorder', 'Microsoft.Wallet', 'Microsoft.BingWeather',
'Microsoft.Xbox.TCUI', 'Microsoft.XboxApp', 'Microsoft.XboxGameOverlay', 'Microsoft.XboxGamingOverlay',
'Microsoft.XboxIdentityProvider', 'Microsoft.XboxSpeechToTextOverlay', 'Microsoft.GamingApp', 'Microsoft.YourPhone',
'Microsoft.ZuneMusic', 'Microsoft.ZuneVideo', 'Microsoft.Windows.Ai.Copilot.Provider'
Get-AppxProvisionedPackage -Online | Where-Object DisplayName -In $pkgs | Remove-AppxProvisionedPackage -Online -AllUsers
Get-AppxPackage -AllUsers | Where-Object Name -In $pkgs | ForEach-Object { "Removing $($_.Name)"; $_ | Remove-AppxPackage -AllUsers }

$caps = 'Language.Handwriting', 'Browser.InternetExplorer', 'MathRecognizer', 'OneCoreUAP.OneSync', 'Microsoft.Windows.MSPaint',
'Microsoft.Windows.PowerShell.ISE', 'App.Support.QuickAssist', 'Microsoft.Windows.SnippingTool', 'Language.Speech',
'Language.TextToSpeech', 'App.StepsRecorder', 'Media.WindowsMediaPlayer', 'Microsoft.Windows.WordPad'
Get-WindowsCapability -Online | Where-Object { $_.State -eq 'Installed' -and ($_.Name -split '~')[0] -in $caps } |
    ForEach-Object { "Removing $($_.Name)"; $_ | Remove-WindowsCapability -Online }

$feats = 'MediaPlayback', 'MicrosoftWindowsPowerShellV2Root', 'Microsoft-RemoteDesktopConnection', 'Recall', 'Microsoft-SnippingTool'
Get-WindowsOptionalFeature -Online | Where-Object { $_.State -eq 'Enabled' -and $_.FeatureName -in $feats } |
    ForEach-Object { "Disabling $($_.FeatureName)"; $_ | Disable-WindowsOptionalFeature -Online -Remove -NoRestart }

winget uninstall --id Microsoft.OneDrive --silent --accept-source-agreements

# ---------- Installs ----------
winget install --id Microsoft.VCRedist.2015+.x64 --silent --accept-package-agreements --accept-source-agreements
Enable-WindowsOptionalFeature -Online -FeatureName NetFx3 -All -NoRestart

# ---------- Extras ----------
# Widgets: policy key is TrustedInstaller-locked on a live system, so remove the package instead
Get-AppxProvisionedPackage -Online | Where-Object DisplayName -eq 'MicrosoftWindows.Client.WebExperience' | Remove-AppxProvisionedPackage -Online -AllUsers
Get-AppxPackage -AllUsers MicrosoftWindows.Client.WebExperience | Remove-AppxPackage -AllUsers
# No new 8.3 short names on C: (existing ones left alone)
fsutil.exe 8dot3name set C: 1
# Empty taskbar pins
Remove-Item "$env:APPDATA\Microsoft\Internet Explorer\Quick Launch\User Pinned\TaskBar\*" -Force -ErrorAction SilentlyContinue
SetReg 'HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Taskband' Favorites ([byte[]](0xFF)) Binary
Remove-ItemProperty 'Registry::HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Taskband' FavoritesResolve -ErrorAction SilentlyContinue

Stop-Process -Name explorer -Force
Stop-Transcript

