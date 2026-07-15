# BetusTV — Frontend

Frontend for BetusTV, built with **Vite** + **Tailwind CSS v4** (vanilla JS/HTML).
No framework lock-in — the markup is plain HTML with Tailwind utility classes, so
it drops cleanly into **Blade / Laravel / WordPress** templates on the backend side.

## Requirements

- Node.js 18+ (built on Node 24), Yarn

## Getting started

```bash
yarn install
yarn dev      # start dev server at http://localhost:5173 (HMR)
yarn build    # production build -> dist/ (one HTML file per page)
yarn preview  # preview the production build locally
```

Pages in dev: `/` (home), `/show.html`, `/video.html`, `/video-2.html`.

## Project structure

```
betustv-new-design/
├─ index.html          # home entry
├─ show.html           # show-page entry
├─ video.html          # video-page entry (light hero)
├─ video-2.html        # video-page entry (home-style hero)
├─ vite.config.js      # Vite + Tailwind plugin; multi-page build inputs
├─ src/
│  ├─ main.js          # home entry — renders renderHome() into #app
│  ├─ show.js          # show entry — renderShow(); also EXPORTS section builders
│  ├─ video.js         # video entry — renderVideo() (reuses show.js sections)
│  ├─ video-2.js       # video-2 entry — renderVideo2()
│  ├─ sections.js      # home sections + shared helpers (CONTAINER, showCard,
│  │                   #   sectionHeader, carouselNav, community, hero, initHome)
│  ├─ data.js          # home-page sample content (swap for backend data)
│  ├─ icons.js         # inline SVG icons
│  ├─ style.css        # Tailwind entry, @font-face, @theme design tokens
│  ├─ lib/assets.js    # maps src/assets/figma/* to hashed URLs by basename
│  └─ assets/
│     ├─ *.woff2/.otf  # Nexa (headings) + Roboto (body) + Gustavo (display)
│     └─ figma/        # images/icons exported from the Figma design
└─ dist/               # build output (generated; git-ignored)
```

## Pages

| Page      | HTML entry      | JS entry        | Render fn        | Sample data source                     |
| --------- | --------------- | --------------- | ---------------- | -------------------------------------- |
| Home      | `index.html`    | `src/main.js`   | `renderHome()`   | `src/data.js`                          |
| Show      | `show.html`     | `src/show.js`   | `renderShow()`   | inline consts in `src/show.js`         |
| Video     | `video.html`    | `src/video.js`  | `renderVideo()`  | inline consts in `src/video.js`        |
| Video 2   | `video-2.html`  | `src/video-2.js`| `renderVideo2()` | inline consts in `src/video-2.js`      |

Each entry does the same two things: write the page markup into `#app`, then call
`initHome()` to wire interactivity. `video.js` / `video-2.js` **reuse** the show
page's lower sections (imported from `show.js`), so those sections live in one
place.

> The shared **header and footer are intentionally omitted** — they're global and
> owned by the backend layer. Each page renders only its own body.

## Design tokens

Brand colors, fonts, radii, etc. are Tailwind v4 `@theme` variables in
`src/style.css` and auto-generate utilities. The main ones:

| Token (in `style.css`)              | Utility examples                         |
| ----------------------------------- | ---------------------------------------- |
| `--color-fg-high` `#282e38`         | `text-fg-high`                           |
| `--color-fg-medium` `#576276`       | `text-fg-medium`                         |
| `--color-fg-low` `#7f8ba3`          | `text-fg-low`                            |
| `--color-primary` `#007bff`         | `bg-primary`, `text-primary`             |
| `--color-primary-text` `#0072eb`    | `text-primary-text`                      |
| `--color-link` `#a4d8ff`            | `text-link`                              |
| `--color-card-1/2/3`, `--color-surface` | `bg-card-2`, `bg-surface`            |
| `--color-border-low/medium`         | `border-border-low`                      |
| `--font-heading` (Nexa)             | `font-heading`                           |
| `--font-body` (Roboto)              | `font-body`                              |
| `--font-display` (Gustavo)          | `font-display`                           |

Dark surfaces (show-page hero, About card, alert bar) use literal hex values
inline (e.g. `#000c19`, `#111a2a`) since they're the inverse-theme equivalents.

---

## Backend integration notes

The output is plain, portable HTML + Tailwind classes. Two ways to consume it:

1. **Ship the build** — run `yarn build` and serve the generated `dist/` (each page
   is a self-contained HTML file with hashed CSS/JS/asset URLs).
2. **Port the markup** — copy the rendered HTML into Blade / PHP / WordPress
   templates and drive it with backend data (see below). Re-create the Tailwind
   build in the backend project (Laravel Vite plugin, or the Tailwind CLI for a
   WordPress theme) pointing at the same `@theme` in `src/style.css`.

### Where the content comes from (swap this for real data)

All copy, images, and lists are **sample data** kept separate from the markup:

- **Home** — every section reads from the exports in **`src/data.js`**
  (`oddsTicker`, `hero`, `chatMessages`, `jumpToShow`, `promotions`,
  `featuredProducts`, `shorts`, `upNext`, `community`, `shows`). Each export is
  shaped like a backend payload, so you replace the values (or feed the same
  shapes into your template loops) without touching the markup.
- **Show / Video / Video 2** — sample data lives in `const` arrays/objects at the
  top of `src/show.js`, `src/video.js`, `src/video-2.js` (e.g. `showMeta`,
  `fullShowVideos`, `relatedNews`, `picks`, `shorts`, `hosts`, `channels`,
  `video`). Same idea: swap the values for API/DB data.

When templating (Blade `@foreach`, WP `while have_posts()`, etc.), map one data
item to one card/row and keep the element's classes intact.

### Images and fonts

- Images are referenced by **basename** through `asset(name)` in
  `src/lib/assets.js`, which resolves `src/assets/figma/<name>.<ext>` to a hashed
  URL at build time. In a backend template, replace `asset('news-1')` with your
  own asset/CDN URL for that slot.
- Fonts: **Nexa** (`font-heading`), **Roboto** (`font-body`), **Gustavo**
  (`font-display`). ⚠️ **Gustavo is the TRIAL version** — replace the
  `src/assets/Gustavo-*.otf` files with the licensed files before production.

### Media

- The video players are **Vimeo iframes** (`player.vimeo.com/video/<id>`). The id
  comes from the data (`data.hero.vimeoId`, `video.vimeoId`). Swap for the real
  stream/embed URL.

### Interactivity — preserve these `data-*` hooks

`initHome()` (in `src/sections.js`) wires all interactive behaviour by
**data-attribute**, so it works on every page and survives templating **as long as
the attributes are kept**. If the markup is ported to Blade/PHP, either keep these
hooks and reuse `initHome()`, or re-implement the behaviour:

| Feature                     | Attributes                                                                 |
| --------------------------- | -------------------------------------------------------------------------- |
| Odds ticker                 | `data-odds-root`, `data-odds-scroll`, `data-odds="prev\|next"`             |
| Generic carousels/sliders   | `data-carousel-root`, `data-carousel-scroll`, `data-carousel="prev\|next"` |
| Live chat collapse (hero)   | `data-chat`, `data-chat-toggle`, `data-chat-body`, `data-chat-icon`        |
| Accordions (Host & Guests)  | `data-accordion`, `data-accordion-toggle`, `data-accordion-body`, `data-accordion-icon` |
| Fixed mobile footer bars    | `data-welcome-root`, `data-bonus-item` / `data-welcome-close`, `data-alert-item` / `data-alert-close` |

### Responsive conventions

- Breakpoints: **`md` (768px)** is the main mobile↔desktop switch; **`lg` (1024px)**
  is used where the hero/related-news go side-by-side.
- Page gutter: `CONTAINER` (in `sections.js`) = `mx-auto w-full max-w-[1462px]
  px-3 md:px-4` (12px mobile / 16px desktop). Lower show/video sections cap
  narrower (`max-w-[1128px]`–`max-w-[1140px]`).
- Some 2-line clamped titles use `text-box-trim` (Chromium 133+/Safari 18.2+);
  older browsers fall back to a slightly clipped second line.
