# rice

Master rice repo — one installer to set up everything.

## What's Inside

This repo is the central hub for all your Windows ricing. It links to all your config repos and installs the extra tools that don't have their own repo.

## Quick Start

```powershell
# Fresh machine
git clone https://github.com/0124212/rice.git
cd rice
.\scripts\fresh-start.ps1

# Already set up, just want to sync
.\scripts\sync.ps1
```

## Rice Repos

| Repo | What it does |
|------|-------------|
| [terminal](https://github.com/0124212/terminal) | Windows Terminal, Oh My Posh, Starship, Yazi, Cava, Fastfetch, GlazeWM, Zebar, Tacky Borders |
| [vscode](https://github.com/0124212/vscode) | VS Code — Doki Theme + JetBrains Mono |
| [librewolf](https://github.com/0124212/librewolf) | LibreWolf — Betterfox + FoxOne + userChrome.css |
| [betterbird](https://github.com/0124212/betterbird) | Betterbird — Dracula dark theme + rice configs |
| [mpv](https://github.com/0124212/mpv) | mpv — HQ config + keybinds |
| [obs](https://github.com/0124212/obs) | OBS — Scene collection + hotkeys |
| [zebar](https://github.com/0124212/zebar) | Zebar — paix minimalist bar |
| [thicc-zebar](https://github.com/0124212/thicc-zebar) | Zebar — thicc watermelon variant |

## Extra Tools (installed via winget)

| Tool | What it does |
|------|-------------|
| **Espanso** | Text expansion — snippets, typo fixes, unicode |
| **f.lux** | Blue light filter |
| **Everything** | Instant file search |
| **Lively Wallpaper** | Animated backgrounds |
| **keyviz** | Keystroke visualizer |
| **Betterbird** | Email + calendar (Thunderbird fork) |
| **mpv** | Video player |
| **OBS** | Screen recording / streaming |

## Scripts

| Script | When to use |
|--------|------------|
| `install.ps1` | Clone repos + install apps + deploy configs |
| `scripts/fresh-start.ps1` | Fresh Windows — base tools + git config + everything |
| `scripts/sync.ps1` | Pull latest from all repos + reapply configs |

## Directory Structure

```
rice/
├── install.ps1
├── apps/
│   ├── espanso/base.yml
│   ├── keyviz/config.json
│   └── lively/library.json
├── scripts/
│   ├── fresh-start.ps1
│   └── sync.ps1
├── README.md
├── links.md
└── .gitignore
```

## Manual Steps

1. Set up Espanso: `espanso start`
2. Configure f.lux for your timezone
3. Pick a Lively Wallpaper
4. Install JetBrainsMono Nerd Font
