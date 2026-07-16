# BetUS TV — Frontend

Plain HTML + Tailwind CSS. Four static pages, two small JavaScript files, no
framework and no build tooling beyond the Tailwind compiler.

The markup lives **in the HTML files** — nothing is rendered by JavaScript — so
each page can be pasted straight into a PHP/Blade view and driven with backend
data.

## Open it

Just open `index.html` in a browser. `css/style.css` is committed, so nothing
needs to be installed or run to view the pages.

## Structure

```
betustv-new-design/
├─ index.html          # home
├─ show.html           # show page ("The EPL Show")
├─ video.html          # video page (light hero)
├─ video-2.html        # video page (home-style hero + Related News slider)
├─ favicon.svg
├─ css/
│  └─ style.css        # compiled Tailwind — committed, linked by every page
├─ js/
│  ├─ slider.js        # prev/next buttons on the card rows
│  └─ ui.js            # chat collapse, accordions, close buttons
├─ assets/
│  ├─ img/             # all images, referenced by plain relative path
│  └─ fonts/           # Nexa, Roboto, Gustavo
└─ src/
   └─ input.css        # Tailwind source: @theme tokens + @font-face
```

> The **header and footer are intentionally omitted** — they're global and owned
> by the backend. Each page contains only its own body.

## Changing styles

Only needed if you add/change Tailwind classes or design tokens.

```bash
npm install
npm run css     # build css/style.css once
npm run watch   # rebuild on save
```

Design tokens (brand colours, fonts, radii) are Tailwind v4 `@theme` variables in
`src/input.css`. Each one becomes a utility automatically:

| Token (in `src/input.css`)              | Utility examples             |
| --------------------------------------- | ---------------------------- |
| `--color-fg-high` `#282e38`             | `text-fg-high`               |
| `--color-fg-medium` `#576276`           | `text-fg-medium`             |
| `--color-fg-low` `#7f8ba3`              | `text-fg-low`                |
| `--color-primary` `#007bff`             | `bg-primary`, `text-primary` |
| `--color-primary-text` `#0072eb`        | `text-primary-text`          |
| `--color-link` `#a4d8ff`                | `text-link`                  |
| `--color-card-1/2/3`, `--color-surface` | `bg-card-2`, `bg-surface`    |
| `--color-border-low/medium`             | `border-border-low`          |
| `--font-heading` (Nexa)                 | `font-heading`               |
| `--font-body` (Roboto)                  | `font-body`                  |
| `--font-display` (Gustavo)              | `font-display`               |

Dark surfaces (show-page hero, About card, alert bar) use literal hex values
inline (e.g. `#000c19`, `#111a2a`) since they're the inverse-theme equivalents.

### Button cursors

Tailwind v4 dropped v3's `button { cursor: pointer }`, so without help every
button shows the plain arrow. `src/input.css` puts it back in one rule:

```css
button:not(:disabled) {
  cursor: pointer;
}
```

That covers every button on every page — no `cursor-pointer` class needed on
individual buttons. Disabled buttons are excluded, so a greyed-out slider arrow
doesn't look clickable. **Carry this rule over to the PHP project** or the
buttons there will show the wrong cursor.

## Sliders

A slider is three classes. No config, no options, no library:

```html
<div class="slider">
  <button class="slider-prev">‹</button>
  <button class="slider-next">›</button>

  <div class="slider-track flex gap-2 overflow-x-auto">
    <article>card</article>
    <article>card</article>
  </div>
</div>
```

- `.slider` — the wrapper. The buttons can be anywhere inside it.
- `.slider-track` — the scrolling row. It's `overflow-x-auto`, so **touch swipe
  works with no JavaScript at all**.
- `.slider-prev` / `.slider-next` — one click scrolls 80% of the visible width.

The arrows show the hand cursor, and revert to the normal arrow once that end is
reached — see the note on button cursors below.

`js/slider.js` only does two things: scroll the track on click, and set
`disabled` on a button when there's nothing more to scroll that way (which is
what greys it out, via `disabled:opacity-40`).

**Card count comes from your data.** A row scrolls when its cards are wider than
the space available — nothing to configure. If a row is short enough to fit, the
arrows grey out on their own, which is correct behaviour, not a bug.

Some sample rows (the odds ticker, Top Promotions, Shorts) list the same few
records more than once so the row overflows and the arrows are live on a wide
desktop — the original design did the same. Your `foreach` replaces the whole
block, so the duplication disappears with real data.

Featured Products is deliberately different: on desktop the cells are `flex-1`
and fill the bar, so it doesn't scroll there and its arrows are `md:hidden`. It
only scrolls on mobile.

## Other interactive bits (`js/ui.js`)

Same idea — a class on the markup, a click handler in the file:

| Feature          | Classes                                                                 |
| ---------------- | ----------------------------------------------------------------------- |
| Live chat        | `.chat`, `.chat-toggle`, `.chat-body`, `.chat-icon`                     |
| Accordions       | `.accordion`, `.accordion-toggle`, `.accordion-body`, `.accordion-icon` |
| Dismissible bars | `.closable` + `.close-button`                                           |

## Using this in the PHP project

1. **Copy the markup.** Open the page, copy the section you need into your view.
   Keep the classes intact.
2. **Loop the repeats.** Every list is written once per item and wrapped in a
   `<!-- REPEAT -->` … `<!-- /REPEAT -->` comment. That's where your `@foreach`
   goes — one item maps to one card.
3. **Fix the asset paths.** Images are `assets/img/<name>.<ext>`. Swap for your
   own asset/CDN helper.
4. **Bring the CSS.** Either copy `css/style.css` as-is, or point your project's
   Tailwind build at the same `@theme` block in `src/input.css` so the tokens
   match.
5. **Copy `js/slider.js` and `js/ui.js`** and include them with `defer`. They're
   plain scripts — no modules, no imports, no bundler.

### Sample content

All copy, images and lists in these pages are **sample data** — replace them with
real values. Where a card repeats, only the unique items are written out (the
original design padded rows by duplicating the same few records).

### Media

The players are **Vimeo iframes** (`player.vimeo.com/video/1207428466`). Swap for
the real stream/embed URL.

### Fonts

Nexa (`font-heading`), Roboto (`font-body`), Gustavo (`font-display`).
⚠️ **Gustavo is the TRIAL version** — replace `assets/fonts/Gustavo-*.otf` with
the licensed files before production.

### Responsive conventions

- Breakpoints: **`md` (768px)** is the main mobile↔desktop switch; **`lg`
  (1024px)** is where the hero/related-news go side-by-side.
- Page gutter: `mx-auto w-full max-w-[1462px] px-3 md:px-4` (12px mobile / 16px
  desktop). Lower show/video sections cap narrower (`max-w-[1140px]`).
- Some 2-line clamped titles use `text-box-trim` (Chromium 133+/Safari 18.2+);
  older browsers fall back to a slightly clipped second line.
