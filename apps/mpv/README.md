# mpv

mpv video player — rice config with HQ settings + keybinds.

## Install

```powershell
.\install.ps1
```

## What's Included

| File | What it does |
|------|-------------|
| `mpv.conf` | HQ video output, scaling, interpolation |
| `input.conf` | Vim-style keybinds |
| `scripts/` | Custom scripts (empty, add your own) |
| `shaders/` | Custom shaders (empty, add your own) |

## Keybinds

| Key | Action |
|-----|--------|
| `Space` | Play/pause |
| `←/→` | Seek ±5s |
| `↑/↓` | Seek ±30s |
| `f` | Fullscreen |
| `m` | Mute |
| `9/0` | Volume ±5% |
| `s` | Screenshot |
| `j/J` | Cycle subtitles |
| `[/]` | Speed ±10% |
| `q` | Quit |
| `Q` | Quit + save position |

## Video Settings

- GPU: Vulkan (gpu-next)
- Scaling: ewa_lanczossharp
- Debanding: enabled
- Interpolation: enabled

## License

Do whatever you want.
