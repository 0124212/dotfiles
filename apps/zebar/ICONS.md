# Paix — How to change icons properly

> `top-bar/src/CurrentApps/` is the only place for taskbar icons. Everything else is auto-copied to `dist/`.

### Architecture

```
GlazeWM → Window.processName → Application.tsx → ICON_MAP → ./assets/icons/*.png
                                      ↓ (no match) → TITLE_ICON_RULES (regex on window title) → fallback Application-32.png
```

- `IconConfig.ts:5` `ICON_MAP: Record<string, string>` — keys are **lowercase** process names without `.exe`
- `Application.tsx:22` `getIconSrc()` does `processName.toLowerCase().trim()` → `ICON_MAP[key] ?? DEFAULT`
- `IconConfig.ts:91` `ICON_BASE = "./assets/icons/"` → Vite copies `AppIcons/*.png` → `dist/assets/icons/*.png`
- `Application.tsx:33` renders `<img src={ICON_BASE+file}>`

No dynamic extraction — icons are **static 32×32 PNGs**.

---

### 1) Find the process name

- Open the app → Task Manager → **Details** tab → exact `Name` column (without `.exe`)
- Examples: `RiotClientServices`, `Riot Client` (with space), `VALORANT-Win64-Shipping`, `parsecd`, `librewolf`
- Confirm with PowerShell: `Get-Process | Where Name -like "*riot*" | Select ProcessName`

### 2) Get a 32×32 PNG — use the *taskbar* icon, not just the exe

The Windows taskbar **does not** always use `ExtractAssociatedIcon(exe)`. It uses the shortcut's `IconLocation` (`.lnk` → `.ico` with 256/48/32/16 sizes). The exe's first icon is often a low-res fallback (e.g. `RiotClientServices.exe` → grey gear, not the red fist).

#### a) Find the proper `.ico` (the one the taskbar shows)

```powershell
# 1) What the Start Menu / taskbar actually uses:
$shell = New-Object -ComObject WScript.Shell
$lnk = $shell.CreateShortcut("C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Riot Games\Riot Client.lnk")
$lnk.IconLocation  # → C:/Riot Games/Riot Client/RiotClientElectron/resources/assets/icon.ico,0
$lnk = $shell.CreateShortcut("C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Riot Games\VALORANT.lnk")
$lnk.IconLocation  # → C:/ProgramData/Riot Games/Metadata/valorant.live/valorant.live.ico,0

# 2) If no shortcut, hunt for .ico:
Get-ChildItem "C:\Riot Games" -Recurse -Filter "*.ico" | Sort Length -Descending | Select FullName,Length
```

| App | Process (Task Manager → Details) | Proper taskbar source | Why |
|---|---|---|---|
| **Riot Client** | `Riot Client` / `RiotClientServices` | `Riot Client\RiotClientElectron\resources\assets\icon.ico` (285KB) | exe gives generic, `.ico` has red fist |
| **VALORANT** | `valorant-win64-shipping` | `C:\ProgramData\Riot Games\Metadata\valorant.live\valorant.live.ico` | exe icon is tiny |
| **Parsec / Telegram / Beeper / ShareX / Ditto** | `parsecd`, `Telegram`, `Beeper` | `App.exe` itself | exe already has correct icon |

#### b) Extract the `.ico` (or `.exe` if it is correct) to 32×32 PNG

```powershell
Add-Type -AssemblyName System.Drawing
$src = "C:\Riot Games\Riot Client\RiotClientElectron\resources\assets\icon.ico" # or "C:\Path\To\App.exe" if that *is* the taskbar icon
$out = "C:\Users\asher\.glzr\zebar\paix\top-bar\src\CurrentApps\AppIcons\MyApp-32.png"

# Use Icon(path) for .ico (keeps 256px), ExtractAssociatedIcon for .exe
$icon = if ($src -like "*.ico") { New-Object System.Drawing.Icon($src) } else { [System.Drawing.Icon]::ExtractAssociatedIcon($src) }
$bmp = $icon.ToBitmap(); $resized = New-Object System.Drawing.Bitmap(32,32)
$g = [System.Drawing.Graphics]::FromImage($resized)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($bmp,0,0,32,32); $resized.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $resized.Dispose(); $bmp.Dispose(); $icon.Dispose()
Write-Host "Saved taskbar icon to $out — compare with taskbar preview at 100%"
```

### 3) Drop the PNG

- Place as `top-bar/src/CurrentApps/AppIcons/<Name>-32.png` (keep `-32.png` suffix, `32×32`)
- Already tracked examples: `RiotClientServices-32.png`, `VALORANT-32.png`, `Parsec-32.png`, `Ditto-32.png`, `ShareX-32.png`, `glazewm-32.png`

### 4) Add the MAP entry

`top-bar/src/CurrentApps/IconConfig.ts:5`

```ts
export const ICON_MAP: Record<string, string> = {
  // ...
  librewolf: "LibreWolf-32.png",
  parsecd: "Parsec-32.png",
  "riot client": "RiotClientServices-32.png", // space → must be quoted
  riotclientservices: "RiotClientServices-32.png",
  "valorant-win64-shipping": "VALORANT-32.png", // hyphen → must be quoted
  zen: "zen-32.png",
};
```

Rules:
- **lowercase** key, no `.exe`
- **spaces / hyphens / dots** → quote the key: `"riot client": ...`
- Simple keys (`discord`, `zen`) can be unquoted
- Duplicates are fine (cover both `riot client` and `riotclientservices`)

For PWAs sharing `chrome.exe`, use `TITLE_ICON_RULES:83` instead:

```ts
{ match: /^spotify(\s|-|$)/i, icon: "Spotify-32.png" },
```

### 5) Build + restart

```powershell
pnpm --dir C:\Users\asher\.glzr\zebar\paix\top-bar run build
Stop-Process -Name zebar -Force; Remove-Item $env:APPDATA\zebar\webview-cache\paix -Recurse -Force
Start-Process "C:\Program Files\glzr.io\Zebar\zebar.exe" -WindowStyle Hidden
# or right-click bar → Reload
```

- Vite copies `AppIcons/*.png` → `dist/assets/icons/` — if you only copy to `src` without `build`, the bar shows fallback
- `settings.json:3` must list `paix → top-bar → default`, otherwise GlazeWM's `startup_commands: ['shell-exec zebar']` loads the wrong pack

### 6) Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Shows `Application-32.png` | Key mismatch (case / space / hyphen not quoted) or not rebuilt | Check `Get-Process` name, quote key, `pnpm run build` |
| Icon in `src` but not in `dist` | Forgot `build` | `pnpm run build` → verify `dist/assets/icons/<Name>-32.png` exists |
| Two bars overlapping | `settings.json` still lists watermelon + paix | Keep only `{ "pack": "paix", "widget": "top-bar", "preset": "default" }`, clear `webview-cache` |
| Invisible gap top/bottom | `outer_gap.top` ≠ bar `height` or Windows taskbar not auto-hidden | `glazewm/config.yaml:17` `top: '50px'` must match `zpack.json:52` `height: '50px'`; `StuckRects3` auto-hide `1` |
| Icon looks wrong color | Extracted from exe, not `icon.ico` | Extract from `icon.ico` path (see 2a) |

### Examples in this repo

- `riot client` / `riotclientservices` + `valorant-win64-shipping` → red fist / VALORANT (from `.ico`)
- `parsecd` / `pservice` → Parsec
- `sharex`, `ditto`, `rustdesk`, `glazewm` → extracted via script

Keep naming `<Process>-32.png` (PascalCase) and lowercase map keys.
