<#
.SYNOPSIS
    Betterbird installer — downloads + applies theme
.DESCRIPTION
    Downloads Betterbird, copies userChrome.css and user.js.
.EXAMPLE
    .\install.ps1
#>

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Betterbird Rice Installer" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan

# --- Install Betterbird ---
Write-Host "`n[1/2] Installing Betterbird" -ForegroundColor Magenta
winget install --id Betterbird.Betterbird --accept-source-agreements --accept-package-agreements -e 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "  Betterbird installed" -ForegroundColor Green
} else {
    Write-Host "  Betterbird failed or already installed" -ForegroundColor DarkYellow
}

# --- Deploy Configs ---
Write-Host "`n[2/2] Deploying Configs" -ForegroundColor Magenta

function Copy-Config {
    param([string]$Source, [string]$Dest)
    $destDir = Split-Path -Parent $Dest
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    if (Test-Path $Dest) {
        Rename-Item $Dest "$Dest.bak" -Force
    }
    Copy-Item $Source $Dest -Force
    Write-Host "  Installed $Dest" -ForegroundColor Green
}

# Find Betterbird profile
$bbProfiles = "$env:APPDATA\Betterbird\Profiles"
if (-not (Test-Path $bbProfiles)) {
    New-Item -ItemType Directory -Path $bbProfiles -Force | Out-Null
}

# Create default profile if needed
$defaultProfile = Get-ChildItem $bbProfiles -Directory | Select-Object -First 1
if (-not $defaultProfile) {
    $profileDir = "$bbProfiles\default.default-release"
    New-Item -ItemType Directory -Path $profileDir -Force | Out-Null
    $defaultProfile = Get-Item $profileDir
}

$chromeDir = "$($defaultProfile.FullName)\chrome"
New-Item -ItemType Directory -Path $chromeDir -Force | Out-Null

Copy-Config "$repoRoot\chrome\userChrome.css" "$chromeDir\userChrome.css"
Copy-Config "$repoRoot\chrome\userContent.css" "$chromeDir\userContent.css"
Copy-Config "$repoRoot\user.js" "$($defaultProfile.FullName)\user.js"

Write-Host "`nDone! Launch Betterbird to apply." -ForegroundColor Cyan
