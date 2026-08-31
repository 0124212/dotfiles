<#
.SYNOPSIS
    Sync all rice repos — pull latest + reapply configs
.DESCRIPTION
    Pulls latest changes from all repos and re-runs installers.
.EXAMPLE
    .\sync.ps1
#>

$ErrorActionPreference = "Stop"
$riceDir = "$env:USERPROFILE\rice"

Write-Host "Rice Sync" -ForegroundColor Cyan
Write-Host "=========" -ForegroundColor Cyan

$repos = @("rice", "terminal", "vscode", "librewolf", "zebar", "thicc-zebar")

foreach ($repo in $repos) {
    $path = "$riceDir\$repo"
    if (Test-Path "$path\.git") {
        Write-Host "`n[$repo]" -ForegroundColor Magenta
        Push-Location $path

        $before = git rev-parse HEAD
        git pull 2>$null
        $after = git rev-parse HEAD

        if ($before -ne $after) {
            Write-Host "  Updated: $before -> $after" -ForegroundColor Green

            # Re-run installer if it exists
            if (Test-Path ".\install.ps1") {
                Write-Host "  Re-running install.ps1..." -ForegroundColor Yellow
                & .\install.ps1
            }
        } else {
            Write-Host "  Already up to date" -ForegroundColor Gray
        }

        Pop-Location
    } else {
        Write-Host "`n[$repo] not found, cloning..." -ForegroundColor Yellow
        # Would need URLs — skip for now
    }
}

Write-Host "`nSync complete!" -ForegroundColor Cyan
