#Requires -RunAsAdministrator
<#
.SYNOPSIS
    OBS rice installer — installs OBS + deploys scene collection
.DESCRIPTION
    Installs OBS via winget and copies scene collection.
.EXAMPLE
    .\install.ps1
#>

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "OBS Rice Installer" -ForegroundColor Cyan
Write-Host "==================" -ForegroundColor Cyan

# --- Install OBS ---
Write-Host "`n[1/2] Installing OBS" -ForegroundColor Magenta
winget install --id OBSProject.OBSStudio --accept-source-agreements --accept-package-agreements -e 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "  OBS installed" -ForegroundColor Green
} else {
    Write-Host "  OBS failed or already installed" -ForegroundColor DarkYellow
}

# --- Deploy Configs ---
Write-Host "`n[2/2] Deploying Configs" -ForegroundColor Magenta

$obsDir = "$env:APPDATA\obs-studio"
New-Item -ItemType Directory -Path "$obsDir\basic\scenes" -Force | Out-Null

function Copy-Config {
    param([string]$Source, [string]$Dest)
    if (Test-Path $Dest) {
        Rename-Item $Dest "$Dest.bak" -Force
    }
    Copy-Item $Source $Dest -Force
    Write-Host "  Installed $Dest" -ForegroundColor Green
}

Copy-Config "$repoRoot\global.ini" "$obsDir\global.ini"
Copy-Config "$repoRoot\basic\scenes\Rice.json" "$obsDir\basic\scenes\Rice.json"
Copy-Config "$repoRoot\basic\scenes\Untitled.json" "$obsDir\basic\scenes\Untitled.json"

Write-Host "`nDone! Launch OBS and select the Untitled scene collection." -ForegroundColor Cyan
