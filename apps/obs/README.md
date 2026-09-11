# obs

OBS Studio — rice scene collection + hotkeys.

## Install

```powershell
.\install.ps1
```

## What's Included

| File | What it does |
|------|-------------|
| `global.ini` | OBS global settings (1080p60, advanced output) |
| `basic/scenes/Untitled.json` | **Current (live 09-04)** — display capture + Valorant game + BongoCat overlay |
| `basic/scenes/Rice.json` | Previous collection (display/window/game capture) |
| `hotkeys.json` | Recording/streaming hotkeys |

## Hotkeys

| Key | Action |
|-----|--------|
| `F9` | Toggle recording |
| `F10` | Toggle streaming |
| `F11` | Toggle replay buffer |
| `F12` | Save replay |
| `PrintScreen` | Screenshot |

## Output Settings

- Resolution: 1920x1080 @ 60fps
- Encoder: x264 (software)
- Recording: MKV, VBR 8-12 Mbps
- Streaming: CBR 6 Mbps

## Scenes — current collection (`Untitled.json`, live 09-04)

1. **Scene** — Display Capture (Samsung monitor)
2. **Scene 2** — Valorant game capture (window mode) + BongoCat input overlay (window capture) + clipart image

## Previous collection (`Rice.json`)

1. **Display Capture** — full monitor capture
2. **Window Capture** — single window (disabled by default)
3. **Game Capture** — game hook (disabled by default)

## License

Do whatever you want.
