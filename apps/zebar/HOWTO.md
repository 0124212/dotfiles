# HOWTO — paix

Step-by-step to install, edit, and keep paix portable. No bullshit scripts — just `Copy-Item` + `pnpm run build`.

## 1) Install

```powershell
# prerequisites: Node 20+, pnpm, GlazeWM + Zebar installed
git clone git@github.com:0124212/12-s-zebar.git $env:USERPROFILE\.glzr\zebar\paix
cd $env:USERPROFILE\.glzr\zebar\paix\top-bar
pnpm install
pnpm run build
# Zebar config: %USERPROFILE%\.glzr\zebar\settings.json must have:
# { "startupConfigs": [{ "pack": "paix", "widget": "top-bar", "preset": "default" }] }
# GlazeWM: ensure gaps/borders match (see 2)
```

Restart Zebar: right-click bar → Reload or
```powershell
Stop-Process -Name zebar -Force; Remove-Item $env:APPDATA\zebar\webview-cache\paix -Recurse -Force; Start-Process "C:\Program Files\glzr.io\Zebar\zebar.exe" -WindowStyle Hidden
```

GlazeWM auto-starts it via `glazewm/config.yaml:2` `startup_commands: ['shell-exec zebar']`.

## 2) GlazeWM — workspaces & borders (12345 67890, 5px white)

`%USERPROFILE%\.glzr\glazewm\config.yaml`

```yaml
workspaces:
  - name: '1'  # 1-5 → monitor 1 (main 2560x1440)
    bind_to_monitor: 1
  - name: '2'
    bind_to_monitor: 1
  - name: '3'
    bind_to_monitor: 1
  - name: '4'
    bind_to_monitor: 1
  - name: '5'
    bind_to_monitor: 1
  - name: '6'  # 6-0 → monitor 2 (1920x1080) — 0 = 10
    bind_to_monitor: 0
  - name: '7'
    bind_to_monitor: 0
  - name: '8'
    bind_to_monitor: 0
  - name: '9'
    bind_to_monitor: 0
  - name: '0'
    bind_to_monitor: 0
```

Keys: `Alt+1-5` focus left, `Alt+6-0` right, `Alt+Shift+1-0` move window.

Borders/ gaps:
```yaml
gaps:
  outer_gap: { top: '50px', right: '20px', bottom: '20px', left: '20px' } # top must = bar height 50px (zpack.json:52)
window_effects:
  focused_window: { border: { enabled: true, color: '#ffffff', width: '5px' } }
  other_windows:  { border: { enabled: true, color: '#444444', width: '1px' } }
```

Reload: `Alt+Shift+R` or `Stop-Process glazewm; Start-Process glazewm`.

If you see an invisible `48px` strip at bottom: `Settings → Bluetooth & devices` trick is Windows taskbar reserving `WorkingArea`. Fix: `Taskbar → Automatically hide` → `StuckRects3` `Settings[8] |=1` then explorer restart (already in `fix-btag.ps1`).

## 3) Zebar — spacing (compact minimal)

You already have: `top-bar/src/index.css:196` `.right { gap:6px }`, buttons `width:auto; padding:0 6px; gap:6px` with `16px` icons. To tweak:

- Between-widget gap: `index.css:196` `.right { gap: 6px }` → `8px` loosens, `4px` tightens
- Inside-widget icon→number: `Cpu/style.css:9` `.content { gap:6px }` (same for `Memory/Disk/Weather/Network/Volume/Battery`)
- Height/font: `index.css` `button { height:28px; font-size:13px }`

Then:
```powershell
pnpm --dir $env:USERPROFILE\.glzr\zebar\paix\top-bar run build
# + restart Zebar as in 1)
```

## 4) Icons — add the *proper* taskbar icon (not the exe fallback)

Full guide: [`ICONS.md`](./ICONS.md). TL;DR:

```powershell
# 1) What the taskbar actually shows (Start Menu .lnk → .ico):
$shell = New-Object -ComObject WScript.Shell
$lnk = $shell.CreateShortcut("C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Riot Games\Riot Client.lnk")
$lnk.IconLocation  # → .../icon.ico,0  ← use this, not the exe

# 2) Extract that .ico (or the exe if it IS correct) to 32×32:
Add-Type -AssemblyName System.Drawing
$src = "C:\Riot Games\Riot Client\RiotClientElectron\resources\assets\icon.ico"
$out = "$env:USERPROFILE\.glzr\zebar\paix\top-bar\src\CurrentApps\AppIcons\RiotClientServices-32.png"
$icon = if ($src -like "*.ico") { New-Object System.Drawing.Icon($src) } else { [System.Drawing.Icon]::ExtractAssociatedIcon($src) }
$bmp=$icon.ToBitmap(); $resized=New-Object System.Drawing.Bitmap(32,32)
$g=[System.Drawing.Graphics]::FromImage($resized); $g.InterpolationMode=[System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($bmp,0,0,32,32); $resized.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
```

Drop as `AppIcons/<Name>-32.png`, add to `IconConfig.ts:5` (lowercase, quote spaces/hyphens: `"riot client": "RiotClientServices-32.png"`), then `pnpm run build` + restart.

Covered: `Riot red fist` (.ico), `VALORANT` (.ico), `Parsec`/`Telegram`/`Beeper` (exe ok).

## 5) Date → Betterbird (or Thunderbird)

`top-bar/src/Time/TimeStatus.tsx:14` + `zpack.json:39` privileges:

```ts
zebar.shellExec("C:\\Program Files\\Betterbird\\betterbird.exe").catch(() =>
  props.glazewm.runCommand('shell-exec "C:\\Program Files\\Betterbird\\betterbird.exe"')
);
```

`zpack.json` needs:
```json
{ "program": "C:\\Program Files\\Betterbird\\betterbird.exe", "argsRegex": "" }
```

Swap path to `thunderbird.exe` if you keep Thunderbird. Then `pnpm run build` + restart.

## 6) Update / portable

```powershell
git -C $env:USERPROFILE\.glzr\zebar\paix pull
cd $env:USERPROFILE\.glzr\zebar\paix\top-bar; pnpm install; pnpm run build
# backup before overwrite: chrome.fluentbird.bak etc. already done for Thunderbird
```

All dotfiles: `0124212/librewolf` (FoxOne), `0124212/vscode` (Vitesse), `0124212/12-s-zebar` (this), `0124212/thicc-zebar` (55px watermelon). Each has `install.ps1` → `Copy-Item` only.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Application-32.png` fallback | `Get-Process` name mismatch or not rebuilt — quote key, `pnpm run build`, check `dist/assets/icons` |
| Two bars overlapping | `settings.json` lists two packs — keep only `paix` + clear `webview-cache` |
| Bluetooth broke after debloat | `scripts/fix-bluetooth.ps1` re-enables `CDPSvc/NcdAutoSetup/BTAGService` (Audio Gateway) |
| Zero Two sticker remains after Vitesse | `code --uninstall-extension unthrottled.doki-theme` |

PRs welcome — keep `50px` bar + `outer_gap.top 50px` in sync.
