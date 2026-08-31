# vscode — minimal, clean, beautiful

**Vitesse Dark** (`antfu.theme-vitesse:1.0.1`) + JetBrains Mono — warm ink, quiet chrome, airy type.

> Minimal = no noise. Clean = everything aligns. Beautiful = warm, not stark.

### Palette
- **Theme:** Vitesse Dark — `#121212` ink, muted sage/moss accents, low-contrast chrome
- **Icons:** `vs-minimal` (outline only, no color noise)
- **Font:** JetBrains Mono + CaskaydiaMono Nerd Font, ligatures, **13px / 22px** line height, `0.3` letter spacing

### Layout (what you see)
- Activity bar → **top** (horizontal, like a tab bar)
- Title bar → `custom`, command center **off**, layout controls **off**
- Sidebar → 16px indent, no indent guides, `singleClick` to open
- Editor → no minimap, `gutter`-only highlight, `boundary` whitespace, 6px minimal scrollbars
- Tabs → shrink + wrap, no preview mode (keeps working set stable)
- Chrome off → no breadcrumbs, no sticky scroll, no folding controls, no glyph margin, no lightbulb

### Behavior (what you feel)
- Smooth caret (`phase` + `smoothCaretAnimation`), smooth scrolling (editor + list + terminal)
- Bracket colorization **on** but guides only on `active` pair — calm
- Inlay hints → `offUnlessPressed` (hold Ctrl+Alt), occurrences/selection highlight **off**
- File nesting (`.ts → .js`, `package.json → lockfiles`) + `compactFolders: false` for clear hierarchy
- Auto-save `afterDelay 800ms`, `trimTrailingWhitespace`, `insertFinalNewline`
- Format on save + `fixAll.eslint` via Prettier/ESLint

### Stack
`Error Lens` · `Prettier` · `ESLint` · `GitLens` · `Git Graph` · `Path Intellisense` · `Auto Rename Tag` · `Color Highlight` · `Indent Rainbow`

## Install

```powershell
git clone git@github.com:0124212/vscode.git $env:USERPROFILE\vscode
Copy-Item "$env:USERPROFILE\vscode\settings.json" "$env:APPDATA\Code\User\settings.json" -Force
Copy-Item "$env:USERPROFILE\vscode\keybindings.json" "$env:APPDATA\Code\User\keybindings.json" -Force
code --install-extension antfu.theme-vitesse --force
.\vscode\install.ps1  # installs full functional pack
```

Reload window after install: `Ctrl+Shift+P` → `Developer: Reload Window`

## Switch variants

Vitesse ships Light/Dark/Soft — swap `workbench.colorTheme`:

```
Vitesse Dark
Vitesse Dark Soft — softer contrast, even warmer
Vitesse Light
```

## Tweaks

All tuning lives in `settings.json` (127 lines, commented sections):

- **Typography:** `editor.fontSize / lineHeight / letterSpacing`
- **Quiet chrome:** `renderLineHighlight: gutter`, `renderWhitespace: boundary`, `showFoldingControls: never`
- **Motion:** `cursorSmoothCaretAnimation`, `smoothScrolling`
- **Explorer:** `fileNesting.patterns`, `compactFolders`, `openEditors.visible: 0`

Edit → copy to `%APPDATA%\Code\User\settings.json` → reload.

## Preview

Minimal means borders are `#191919` on `#121212` — almost invisible. Foreground `#dbd7caee` at 13px/22px breathes. No minimap, no breadcrumbs, no command center = content fills space.
