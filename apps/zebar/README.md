# paix — 50px minimalist Zebar top-bar for GlazeWM

Compact fork of [attaquer/.glzr](https://github.com/iAttaquer/.glzr) — `50px` top bar, `top_center`, 100% width, no bloat.

## Details

- **Borders:** `5px` white focused, `1px` `#444` unfocused (`glazewm/config.yaml`)
- **Layout:** auto-width widgets, `6px` gaps, icon `→` number `6px` hugs
- **Icons:** custom `32×32` — Riot / VALORANT (red fist), Parsec, ShareX, Ditto, RustDesk, GlazeWM + 70 more (see `AppIcons/`)
- **Click:** date → opens Thunderbird
- **Build:** TypeScript + Zebar `zpack` — `pnpm run build`

## Install

```powershell
git clone https://github.com/0124212/12-s-zebar $env:USERPROFILE\.glzr\zebar\paix
cd $env:USERPROFILE\.glzr\zebar\paix
pnpm install; pnpm run build
# enable in Zebar, set GlazeWM gaps/borders to match
```

## How-to

> Full step-by-step: [`HOWTO.md`](./HOWTO.md) — install, 12345 67890 workspaces, 5px borders, spacing, proper taskbar icons (`.lnk` → `.ico`), Betterbird date click.
> Quick icon add: [`ICONS.md`](./ICONS.md) — add `AppIcons/*.png` + edit `IconConfig.ts` → `pnpm run build` → clear `webview-cache/paix`.

## Related

- [`thicc-zebar`](https://github.com/0124212/thicc-zebar) — 55px gruvvy-watermelon variant (private fork of bar-gruvvy-watermelon)

## Original

Fork of `attaquer` GlazeWM/Zebar theme. Renamed to `paix`.

## License

MIT (original MIT retained)
