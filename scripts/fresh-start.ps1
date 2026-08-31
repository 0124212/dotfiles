#Requires -RunAsAdministrator
<#
.SYNOPSIS
    Full Windows setup — fresh machine to fully riced
.DESCRIPTION
    Installs base tools, clones rice, runs installers, applies all configs.
    Run on a fresh Windows install.
.EXAMPLE
    .\fresh-start.ps1
#>

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$riceDir = "$env:USERPROFILE\rice"

Write-Host "Fresh Start — Full Windows Rice Setup" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

# ============================================================
# SECTION 1: Base Tools
# ============================================================

Write-Host "`n[1/5] Base Tools" -ForegroundColor Magenta

# Git
Write-Host "  Installing Git..." -ForegroundColor Yellow
winget install --id Git.Git --accept-source-agreements --accept-package-agreements -e 2>$null

# GitHub CLI
Write-Host "  Installing GitHub CLI..." -ForegroundColor Yellow
winget install --id GitHub.cli --accept-source-agreements --accept-package-agreements -e 2>$null

# Scoop
if (-not (Get-Command scoop -ErrorAction SilentlyContinue)) {
    Write-Host "  Installing Scoop..." -ForegroundColor Yellow
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
    irm get.scoop.sh | iex
}

# ============================================================
# SECTION 2: Git Config
# ============================================================

Write-Host "`n[2/5] Git Config" -ForegroundColor Magenta

$gitUser = Read-Host "  Git username"
$gitEmail = Read-Host "  Git email"

git config --global user.name $gitUser
git config --global user.email $gitEmail
git config --global init.defaultBranch main
git config --global core.autocrlf true

Write-Host "  Git configured" -ForegroundColor Green

# ============================================================
# SECTION 3: Clone Rice
# ============================================================

Write-Host "`n[3/5] Cloning Rice Repos" -ForegroundColor Magenta

New-Item -ItemType Directory -Path $riceDir -Force | Out-Null

$repos = @{
    "rice"      = "https://github.com/0124212/rice.git"
    "terminal"  = "https://github.com/0124212/terminal.git"
    "vscode"    = "https://github.com/0124212/vscode.git"
    "librewolf" = "https://github.com/0124212/librewolf.git"
    "zebar"     = "https://github.com/0124212/zebar.git"
    "thicc-zebar" = "https://github.com/0124212/thicc-zebar.git"
}

foreach ($repo in $repos.GetEnumerator()) {
    $dest = "$riceDir\$($repo.Key)"
    if (-not (Test-Path $dest)) {
        Write-Host "  Cloning $($repo.Key)..." -ForegroundColor Yellow
        git clone $repo.Value $dest 2>$null
    }
}

Write-Host "  All repos cloned" -ForegroundColor Green

# ============================================================
# SECTION 4: Run Installers
# ============================================================

Write-Host "`n[4/5] Running Installers" -ForegroundColor Magenta

$installOrder = @(
    "$riceDir\rice\install.ps1",
    "$riceDir\terminal\install.ps1",
    "$riceDir\vscode\install.ps1",
    "$riceDir\librewolf\install.ps1"
)

foreach ($installer in $installOrder) {
    if (Test-Path $installer) {
        Write-Host "  Running $(Split-Path $installer -Leaf)..." -ForegroundColor Yellow
        & $installer
    }
}

# ============================================================
# SECTION 5: Windows Settings
# ============================================================

Write-Host "`n[5/5] Windows Settings" -ForegroundColor Magenta

# Dark mode
Write-Host "  Enabling dark mode..." -ForegroundColor Yellow
Set-ItemProperty -Path "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Themes\Personalize" -Name "AppsUseLightTheme" -Value 0
Set-ItemProperty -Path "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Themes\Personalize" -Name "SystemUsesLightTheme" -Value 0

# Show file extensions
Write-Host "  Showing file extensions..." -ForegroundColor Yellow
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" -Name "HideFileExt" -Value 0

# Show hidden files
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" -Name "Hidden" -Value 1

# Disable widget board
Write-Host "  Disabling widgets..." -ForegroundColor Yellow
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Feeds" -Name "ShellFeedsTaskbarViewMode" -Value 2

# Classic right-click menu
Write-Host "  Enabling classic context menu..." -ForegroundColor Yellow
reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve 2>$null

Write-Host "  Windows settings applied" -ForegroundColor Green

# ============================================================
# Done
# ============================================================

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Fresh start complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Everything is set up:" -ForegroundColor Gray
Write-Host "  - Git + GitHub CLI" -ForegroundColor Gray
Write-Host "  - All rice repos cloned to $riceDir" -ForegroundColor Gray
Write-Host "  - All apps installed" -ForegroundColor Gray
Write-Host "  - All configs deployed" -ForegroundColor Gray
Write-Host "  - Windows dark mode + tweaks applied" -ForegroundColor Gray
Write-Host ""
Write-Host "Reboot recommended." -ForegroundColor Yellow
