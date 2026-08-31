#Requires -RunAsAdministrator
<#
.SYNOPSIS
    mpv rice installer — installs mpv + deploys config
.DESCRIPTION
    Installs mpv via winget and copies config files.
.EXAMPLE
    .\install.ps1
#>

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "mpv Rice Installer" -ForegroundColor Cyan
Write-Host "==================" -ForegroundColor Cyan

# --- Install mpv ---
Write-Host "`n[1/2] Installing mpv" -ForegroundColor Magenta
winget install --id mpv.mpv --accept-source-agreements --accept-package-agreements -e 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "  mpv installed" -ForegroundColor Green
} else {
    Write-Host "  mpv failed or already installed" -ForegroundColor DarkYellow
}

# --- Deploy Configs ---
Write-Host "`n[2/2] Deploying Configs" -ForegroundColor Magenta

$mpvDir = "$env:APPDATA\mpv"
New-Item -ItemType Directory -Path $mpvDir -Force | Out-Null
New-Item -ItemType Directory -Path "$mpvDir\scripts" -Force | Out-Null
New-Item -ItemType Directory -Path "$mpvDir\shaders" -Force | Out-Null

function Copy-Config {
    param([string]$Source, [string]$Dest)
    if (Test-Path $Dest) {
        Rename-Item $Dest "$Dest.bak" -Force
    }
    Copy-Item $Source $Dest -Force
    Write-Host "  Installed $Dest" -ForegroundColor Green
}

Copy-Config "$repoRoot\mpv.conf" "$mpvDir\mpv.conf"
Copy-Config "$repoRoot\input.conf" "$mpvDir\input.conf"

Write-Host "`nDone! Launch mpv to apply." -ForegroundColor Cyan
