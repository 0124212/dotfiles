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
| `basic/scenes/Rice.json` | Scene collection with display/window/game capture |
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

## Scenes

1. **Display Capture** — full monitor capture
2. **Window Capture** — single window (disabled by default)
3. **Game Capture** — game hook (disabled by default)

## License

Do whatever you want.
