# BetusTV — Frontend

Frontend for BetusTV, built with **Vite** + **Tailwind CSS v4** (vanilla JS/HTML).
No framework lock-in — the markup is plain HTML with Tailwind utility classes, so
it drops cleanly into **Blade / Laravel / WordPress** templates on the backend side.

## Requirements

- Node.js 18+ (built on Node 24)

## Getting started

```bash
yarn install
yarn dev      # start dev server at http://localhost:5173 (HMR)
yarn build    # production build -> dist/
yarn preview  # preview the production build locally
```

## Project structure

```
betustv-new-design/
├─ index.html          # HTML entry point
├─ vite.config.js      # Vite + Tailwind plugin config
├─ src/
│  ├─ main.js          # JS entry — renders the home page into #app
│  ├─ sections.js      # render functions, one per home-page section
│  ├─ data.js          # sample content (swap for backend data)
│  ├─ icons.js         # inline SVG icons
│  ├─ style.css        # Tailwind entry, @font-face, @theme design tokens
│  ├─ lib/assets.js    # maps src/assets/figma/* to hashed URLs by name
│  └─ assets/
│     ├─ *.woff2/.ttf  # Nexa + Roboto fonts
│     └─ figma/        # images/icons exported from the Figma design
└─ dist/               # build output (generated)
```

## Home page

The home page (`node 239:6709` in Figma) is built section by section in
`src/sections.js`:

1. **Hero** — Vimeo player + live-chat panel
2. **Jump to Show** — quick-nav pills
3. **Top Promotions** — bonus cards carousel
4. **Featured Products** — product icon bar
5. **Shorts** — vertical short-video carousel
6. **All Shows** — per-show episode rows
7. **Join Our Community** — social links

> The shared **header and footer are intentionally omitted** — they're global
> and owned by the backend layer.

All copy, images, and lists come from `src/data.js`. Each export mirrors what a
backend payload would provide, so the Blade/Laravel/WordPress layer can replace
those arrays (or feed the same shapes into loops) without touching the markup in
`sections.js`. Design tokens (brand colors, fonts, radii) live as Tailwind v4
`@theme` variables in `src/style.css`.

## Design tokens

Brand colors and fonts are defined as Tailwind v4 `@theme` variables in
`src/style.css`. They auto-generate utilities:

| Token              | Utility examples                    |
| ------------------ | ----------------------------------- |
| `--color-brand`    | `bg-brand`, `text-brand`, `border-brand` |
| `--color-brand-dark` | `bg-brand-dark`, `hover:bg-brand-dark` |
| `--color-ink`      | `bg-ink`                            |
| `--font-sans`      | `font-sans`                         |

Adjust these values to match the final BetusTV brand palette.

## Handoff to backend (Blade / Laravel / WordPress)

The HTML + Tailwind classes are portable. To integrate:

1. Run `yarn build` to produce optimized CSS/JS in `dist/`, **or**
2. Copy the markup from the rendered pages into Blade/PHP templates and wire up
   Tailwind in the backend project (e.g. Laravel Vite plugin, or the Tailwind
   CLI for a WordPress theme).
