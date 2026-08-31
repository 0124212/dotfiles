#Requires -RunAsAdministrator
<#
.SYNOPSIS
    Master rice installer — clones repos + installs apps + deploys configs
.DESCRIPTION
    Full rice setup from a single script.
    Run as administrator for full access.
.EXAMPLE
    .\install.ps1
#>

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$riceDir = "$env:USERPROFILE\rice"

Write-Host "Master Rice Installer" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan

# ============================================================
# Helper
# ============================================================

function Install-Winget {
    param([string]$Id, [string]$Name)
    Write-Host "  Installing $Name..." -ForegroundColor Yellow
    winget install --id $Id --accept-source-agreements --accept-package-agreements -e 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  $Name installed" -ForegroundColor Green
    } else {
        Write-Host "  $Name failed or already installed" -ForegroundColor DarkYellow
    }
}

function Clone-RiceRepo {
    param([string]$Name, [string]$Url)
    $dest = "$riceDir\$Name"
    if (Test-Path $dest) {
        Write-Host "  $Name already cloned, pulling latest..." -ForegroundColor Yellow
        Push-Location $dest
        git pull 2>$null
        Pop-Location
    } else {
        Write-Host "  Cloning $Name..." -ForegroundColor Yellow
        git clone $Url $dest 2>$null
    }
    Write-Host "  $Name ready" -ForegroundColor Green
}

function Copy-Config {
    param([string]$Source, [string]$Dest)
    $destDir = Split-Path -Parent $Dest
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    if (Test-Path $Dest) {
        Rename-Item $Dest "$Dest.bak" -Force
    }
    Copy-Item $Source $Dest -Force
}

# ============================================================
# SECTION 1: Clone Rice Repos
# ============================================================

Write-Host "`n[1/4] Cloning Rice Repos" -ForegroundColor Magenta
New-Item -ItemType Directory -Path $riceDir -Force | Out-Null

$repos = @{
    "terminal" = "https://github.com/0124212/terminal.git"
    "vscode"   = "https://github.com/0124212/vscode.git"
    "librewolf"= "https://github.com/0124212/librewolf.git"
    "zebar"    = "https://github.com/0124212/zebar.git"
    "thicc-zebar" = "https://github.com/0124212/thicc-zebar.git"
}

foreach ($repo in $repos.GetEnumerator()) {
    Clone-RiceRepo $repo.Key $repo.Value
}

# ============================================================
# SECTION 2: Install Apps
# ============================================================

Write-Host "`n[2/4] Installing Apps" -ForegroundColor Magenta

# Terminal tools
Install-Winget "JanDeDobbeleer.OhMyPosh" "Oh My Posh"
Install-Winget "Starship.Starship" "Starship"
Install-Winget "Fastfetch-cli.Fastfetch" "Fastfetch"
Install-Winget "sxyazi.yazi" "Yazi"
Install-Winget "karlstav.cava" "Cava"
Install-Winget "Notepad++.Notepad++" "Notepad++"
Install-Winget "WinsiderSS.SystemInformer" "System Informer"

# Window manager
Install-Winget "glzr-io.glazewm" "GlazeWM"

# Browser
Install-Winget "LibreWolf.LibreWolf" "LibreWolf"

# Communication
Install-Winget "Element.Element" "Element"
Install-Winget "Telegram.TelegramDesktop" "Telegram"

# Utilities
Install-Winget "Parsec.Parsec" "Parsec"
Install-Winget "Surfshark.Surfshark" "Surfshark"

# Rice tools
Install-Winget "espanso.espanso" "Espanso"
Install-Winget "flux.flux" "f.lux"
Install-Winget "voidtools.Everything" "Everything"
Install-Winget "rocksdanister.LivelyWallpaper" "Lively Wallpaper"
Install-Winget "nicosep.keyviz" "keyviz"

# ============================================================
# SECTION 3: Run Each Repo's Installer
# ============================================================

Write-Host "`n[3/4] Running Repo Installers" -ForegroundColor Magenta

$installers = @(
    "$riceDir\terminal\install.ps1",
    "$riceDir\vscode\install.ps1",
    "$riceDir\librewolf\install.ps1"
)

foreach ($installer in $installers) {
    if (Test-Path $installer) {
        Write-Host "  Running $(Split-Path $installer -Leaf)..." -ForegroundColor Yellow
        & $installer
    }
}

# ============================================================
# SECTION 4: Deploy Extra Configs
# ============================================================

Write-Host "`n[4/4] Deploying Extra Configs" -ForegroundColor Magenta

Write-Host "  [Espanso]" -ForegroundColor Cyan
$espansoDir = "$env:APPDATA\espanso\config"
New-Item -ItemType Directory -Path $espansoDir -Force | Out-Null
Copy-Config "$repoRoot\apps\espanso\base.yml" "$espansoDir\base.yml"
Write-Host "  Espanso config deployed" -ForegroundColor Green

Write-Host "  [keyviz]" -ForegroundColor Cyan
$keyvizDir = "$env:LOCALAPPDATA\keyviz"
New-Item -ItemType Directory -Path $keyvizDir -Force | Out-Null
Copy-Config "$repoRoot\apps\keyviz\config.json" "$keyvizDir\config.json"
Write-Host "  keyviz config deployed" -ForegroundColor Green

Write-Host "  [Lively]" -ForegroundColor Cyan
$livelyDir = "$env:LOCALAPPDATA\Lively Wallpaper"
New-Item -ItemType Directory -Path $livelyDir -Force | Out-Null
Copy-Config "$repoRoot\apps\lively\library.json" "$livelyDir\library.json"
Write-Host "  Lively Wallpaper config deployed" -ForegroundColor Green

# ============================================================
# Done
# ============================================================

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Rice setup complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Repos cloned to: $riceDir" -ForegroundColor Gray
Write-Host "Restart your terminal to apply changes." -ForegroundColor Gray
Write-Host ""
Write-Host "Optional manual steps:" -ForegroundColor Yellow
Write-Host "  1. Set up Espanso: espanso start" -ForegroundColor Gray
Write-Host "  2. Configure f.lux for your timezone" -ForegroundColor Gray
Write-Host "  3. Pick a Lively Wallpaper" -ForegroundColor Gray
Write-Host "  4. Install JetBrainsMono Nerd Font" -ForegroundColor Gray
