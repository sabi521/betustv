import { asset } from "./lib/assets.js";
import { icons } from "./icons.js";
import * as data from "./data.js";

const CONTAINER = "mx-auto w-full max-w-[1462px] px-3 md:px-4";

// Circular outline prev/next buttons wired to the nearest [data-carousel-scroll]
// (see initHome). Used by carousel sections like Top Promotions.
function carouselNav() {
  const btn = (dir) => `
    <button type="button" data-carousel="${dir}" aria-label="${
    dir === "prev" ? "Previous" : "Next"
  }"
      class="grid size-8 place-items-center rounded-full border border-border-low text-fg-medium transition hover:bg-card-3 disabled:opacity-40 disabled:hover:bg-transparent">
      ${
        dir === "prev"
          ? icons.chevronLeft("size-4")
          : icons.chevronRight("size-4")
      }
    </button>`;
  return `<div class="flex items-center gap-2">${btn("prev")}${btn(
    "next"
  )}</div>`;
}

// Shared "Title + subtitle" block with an optional right-side control slot.
function sectionHeader(title, subtitle, { badge = "", right = "" } = {}) {
  return `
    <div class="flex w-full items-center gap-2">
      <div class="flex min-w-0 flex-1 flex-col gap-2">
        <div class="flex items-center gap-2">
          <h2 class="font-heading text-xl font-extrabold leading-6 text-fg-high md:text-2xl md:leading-7">${title}</h2>
          ${badge}
        </div>
        ${
          subtitle
            ? `<p class="font-body text-sm font-normal leading-5 text-fg-medium md:text-base md:leading-6">${subtitle}</p>`
            : ""
        }
      </div>
      ${right}
    </div>`;
}

/* -------------------------------------------------------------------------- */
/* Odds ticker (top bar)                                                      */
/* -------------------------------------------------------------------------- */
function oddsCard(g) {
  const abbr = (t, size = "text-sm") =>
    `<span class="font-body ${size} font-bold text-fg-high">${t}</span>`;
  const teamIcon = (src) =>
    `<img src="${asset(src)}" alt="" class="size-4 shrink-0 object-contain" />`;

  // Desktop: matchup + time on top, hairline, then odds on a single line.
  const dPair = (label, value) =>
    `<span class="font-body text-xs font-bold text-fg-low">${label}</span><span class="font-body text-sm text-fg-high">${value}</span>`;
  const dot = `<span class="font-body text-sm text-fg-high">•</span>`;
  const desktop = `
    <div class="hidden flex-col items-center gap-1.5 md:flex">
      <div class="flex items-center justify-center gap-1">
        ${abbr(g.away)}${teamIcon(g.awayIcon)}
        <span class="whitespace-nowrap font-body text-xs font-bold text-fg-low">${
          g.time
        }</span>
        ${teamIcon(g.homeIcon)}${abbr(g.home)}
      </div>
      <div class="h-px w-full bg-border-card"></div>
      <div class="flex items-center gap-1 whitespace-nowrap">
        ${dPair("Spread:", g.spread)} ${dot} ${dPair(
    "Total:",
    g.total
  )} ${dot} ${dPair("ML:", g.ml)}
      </div>
    </div>`;

  // Mobile: matchup + time | vertical divider | odds stacked as 3 rows.
  const mRow = (label, value) => `
    <div class="flex items-center gap-0.5">
      <span class="w-10 shrink-0 font-body text-[10px] font-bold leading-4 text-fg-low">${label}</span>
      <span class="whitespace-nowrap font-body text-[10px] font-normal leading-4 text-fg-high">${value}</span>
    </div>`;
  const mobile = `
    <div class="flex items-center gap-2 md:hidden">
      <div class="flex flex-col items-center justify-center gap-1.5">
        <div class="flex items-center justify-center gap-0.5">
          <span class="flex items-center gap-1">${abbr(
            g.away,
            "text-xs"
          )}${teamIcon(g.awayIcon)}</span>
          <span class="font-body text-xs text-fg-low">vs</span>
          <span class="flex items-center gap-1">${teamIcon(g.homeIcon)}${abbr(
    g.home,
    "text-xs"
  )}</span>
        </div>
        <span class="whitespace-nowrap font-body text-[10px] text-fg-high">${
          g.time
        }</span>
      </div>
      <div class="h-9 w-px shrink-0 bg-border-card"></div>
      <div class="flex flex-col gap-1">
        ${mRow("Spread:", g.spread)}${mRow("Total:", g.total)}${mRow(
    "ML:",
    g.ml
  )}
      </div>
    </div>`;

  return `
    <article class="flex shrink-0 items-center rounded-xl border border-border-card bg-card-1 px-2 py-[5px] md:rounded-[10px] md:px-3 md:py-2">
      ${desktop}${mobile}
    </article>`;
}

function oddsTicker() {
  const cards = data.oddsTicker.map(oddsCard).join("");
  // Scroll arrows are a desktop affordance; on mobile the row is touch-scrolled.
  const arrowBtn = (dir) => `
    <button type="button" data-odds="${dir}" aria-label="${
    dir === "prev" ? "Scroll left" : "Scroll right"
  }"
      class="pointer-events-auto hidden size-6 place-items-center rounded-full bg-fill-secondary text-fg-high transition hover:brightness-95 disabled:opacity-0 md:grid">
      ${
        dir === "prev"
          ? icons.chevronLeft("size-3.5")
          : icons.chevronRight("size-3.5")
      }
    </button>`;
  return `
    <section class="w-full border-t border-border-card bg-surface py-[7px] md:border-t-0 md:py-3">
      <div class="mx-auto flex max-w-[1430px] items-center gap-2 px-3 md:gap-[18px] md:px-4">
        <div class="relative min-w-0 flex-1" data-odds-root>
          <div data-odds-scroll class="flex gap-1 overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar [-webkit-overflow-scrolling:touch]">
            ${cards}
          </div>
          <div class="pointer-events-none absolute inset-y-0 left-0 hidden w-[34px] items-center justify-start bg-gradient-to-r from-surface to-transparent md:flex">
            ${arrowBtn("prev")}
          </div>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex w-[34px] items-center justify-end bg-gradient-to-l from-surface to-transparent">
            ${arrowBtn("next")}
          </div>
        </div>
        <button type="button" class="shrink-0 whitespace-nowrap rounded-full border border-border-low bg-white px-3 py-1 font-body text-xs font-bold text-fg-high transition hover:bg-card-3 md:px-4 md:py-1.5 md:text-sm">
          View Odds
        </button>
      </div>
    </section>`;
}

/* -------------------------------------------------------------------------- */
/* Hero: video + live chat                                                    */
/* -------------------------------------------------------------------------- */
function heroChat() {
  const rows = [];
  // Repeat the sample messages to fill the scrollable panel.
  for (let i = 0; i < 5; i++) {
    for (const m of data.chatMessages) {
      rows.push(`
        <div class="w-full py-2 lg:py-3">
          <p class="text-sm leading-normal">
            <span class="font-body font-bold text-primary-text">@${m.user}</span>
            <span class="ml-2 font-body text-fg-high">${m.text}</span>
          </p>
        </div>`);
    }
  }
  return `
    <aside data-chat class="flex w-full shrink-0 flex-col gap-3 rounded-xl border border-border-card bg-card-1 p-4 lg:w-[430px] lg:rounded-2xl">
      <div class="flex w-full items-center justify-between">
        <div class="flex items-center gap-3">
          <h3 class="text-sm leading-tight text-fg-high">Live Chat</h3>
          <span class="flex items-center gap-1.5">
            <span class="size-2 rounded-full bg-green-500"></span>
            <span class="font-heading text-sm font-normal text-fg-high">${
              data.hero.chatCount
            } in chat</span>
          </span>
        </div>
        <button type="button" data-chat-toggle aria-label="Toggle chat" aria-expanded="true" class="text-fg-medium">
          <span data-chat-icon class="block transition-transform">${icons.chevronUp(
            "size-5"
          )}</span>
        </button>
      </div>
      <div data-chat-body class="flex flex-col gap-3">
        <div class="flex h-[130px] w-full flex-col justify-end gap-0.5 overflow-y-auto rounded-lg bg-card-3 px-2.5 py-1 no-scrollbar lg:h-[419px]">
          ${rows.join("")}
        </div>
        <!-- Logged-out CTA on mobile, message input on desktop -->
        <button type="button" class="w-full rounded-lg border border-border-low bg-white px-3 py-2.5 text-left font-body text-sm text-fg-low transition hover:border-primary lg:hidden">
          Log In to Chat
        </button>
        <input type="text" placeholder="Say Something..."
          class="hidden w-full rounded-lg border border-border-low bg-white px-3 py-2.5 font-body text-sm text-fg-high placeholder:text-fg-low focus:border-primary focus:outline-none lg:block" />
      </div>
    </aside>`;
}

function hero() {
  const avatar = asset(data.hero.avatar);
  return `
  <section class="w-full pb-2 md:bg-surface lg:pb-8">
    <div class="${CONTAINER} flex flex-col gap-2">
      <div class="flex flex-col items-start justify-center gap-3 lg:flex-row lg:gap-8">
        <div class="flex w-full min-w-0 flex-1 flex-col">
          <!-- Mobile: video + show-info share one full-bleed surface block; chat below sits on white.
               Desktop: transparent (the whole hero section is surface). -->
          <div class="-mx-3 flex flex-col bg-surface md:mx-0 md:gap-6 md:bg-transparent">
          <div class="relative overflow-hidden shadow-[inset_0_0_20px_0_rgba(0,0,0,0.2)] md:rounded-2xl">
            <div style="padding:56.25% 0 0 0;position:relative;">
              <iframe
                src="https://player.vimeo.com/video/${
                  data.hero.vimeoId
                }?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                style="position:absolute;top:0;left:0;width:100%;height:100%;"
                title="${data.hero.showTitle}"></iframe>
            </div>
          </div>

          <div class="flex w-full items-center gap-4 px-3 py-2.5 md:gap-3 md:rounded-full md:bg-card-1 md:py-2 md:pl-1.5 md:pr-4">
            <a href="#" class="flex min-w-0 flex-1 items-center gap-2.5">
              <span class="size-9 shrink-0 overflow-hidden rounded-full bg-fg-high md:size-14">
                <img src="${avatar}" alt="" class="size-full object-cover" />
              </span>
              <span class="min-w-0 truncate font-heading text-sm font-extrabold text-fg-high md:text-xl">
                <span class="md:hidden">${data.hero.showTitleMobile}</span>
                <span class="hidden md:inline">${data.hero.showTitle}</span>
              </span>
            </a>
            <div class="flex shrink-0 items-center gap-2">
              <button type="button" class="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 font-heading text-xs font-extrabold text-white transition hover:bg-primary-text md:px-4 md:py-2 md:text-sm">
                ${icons.bell("size-4")} Subscribe
              </button>
              <button type="button" class="grid size-8 shrink-0 place-items-center rounded-full border border-border-low text-fg-medium transition hover:bg-card-3 md:size-9">
                ${icons.share("size-4")}
              </button>
            </div>
          </div>
          </div>
        </div>

        ${heroChat()}
      </div>
    </div>
  </section>`;
}

/* -------------------------------------------------------------------------- */
/* Jump to Show pills                                                         */
/* -------------------------------------------------------------------------- */
function jumpToShow() {
  const pills = data.jumpToShow
    .map(
      (label) => `
      <button type="button" class="flex h-[34px] shrink-0 items-center gap-1 rounded-full border border-border-low pl-3.5 pr-3 font-heading text-base font-extrabold text-fg-high transition hover:bg-card-3">
        ${label} ${icons.arrowDown("size-3.5")}
      </button>`
    )
    .join("");
  // Desktop: label inline before the pills. Mobile: label stacked above.
  return `
    <div class="${CONTAINER} pt-2 md:pt-6">
      <div class="flex flex-col gap-2.5 md:flex-row md:items-center md:gap-3">
        <span class="shrink-0 font-heading text-sm font-extrabold leading-4 text-fg-high md:text-base md:leading-5">Jump to Show<span class="hidden md:inline">:</span></span>
        <div class="flex gap-2 overflow-x-auto no-scrollbar">${pills}</div>
      </div>
    </div>`;
}

/* -------------------------------------------------------------------------- */
/* Top Promotions                                                             */
/* -------------------------------------------------------------------------- */
function promotions() {
  // Repeat the promos so the slider has plenty to scroll through.
  const list = [...data.promotions, ...data.promotions, ...data.promotions];
  const cards = list
    .map(
      (p) => `
      <article class="relative flex h-[200px] w-[138px] shrink-0 items-end overflow-hidden rounded-[9px] bg-fill-medium p-3.5 shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]">
        <img src="${asset(
          p.image
        )}" alt="" class="absolute inset-0 size-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-primary-muted from-0% to-transparent to-[51.5%]"></div>
        <div class="relative flex w-full flex-col gap-[7px]">
          <img src="${asset(p.icon)}" alt="" class="size-5" />
          <p class="max-w-[110px] font-display text-sm font-bold leading-4 text-white/90">${
            p.title
          }</p>
          <a href="#" class="flex items-center gap-1 font-body text-sm text-link">Details ${icons.arrowRight(
            "size-3.5"
          )}</a>
        </div>
      </article>`
    )
    .join("");
  return `
    <section class="${CONTAINER} pt-6 md:pt-8" data-carousel-root>
      ${sectionHeader(
        "Top Promotions",
        "Your go-to features, all in one place",
        {
          right: carouselNav(),
        }
      )}
      <div data-carousel-scroll class="-mr-3 mt-4 flex gap-2.5 overflow-x-auto scroll-smooth pb-1 pr-3 no-scrollbar [-webkit-overflow-scrolling:touch] md:mr-0 md:pr-0">${cards}</div>
    </section>`;
}

/* -------------------------------------------------------------------------- */
/* Featured Products                                                          */
/* -------------------------------------------------------------------------- */
function featured() {
  // Cells fill the bar on desktop (flex-1); on mobile they're fixed-width and scroll.
  const cells = data.featuredProducts.map(
    (f) => `
      <div class="relative z-10 flex w-[104px] shrink-0 flex-col items-center justify-center gap-[7px] p-3.5 md:w-auto md:flex-1">
        <img src="${asset(
          f.icon
        )}" alt="" class="size-9 object-contain md:size-[45px]" />
        <p class="text-center font-heading text-xs font-extrabold leading-tight text-fg-high">${
          f.label
        }</p>
      </div>`
  );
  // Short (36px) centered divider between cells — not full height.
  const divider = `<div class="relative z-10 h-9 w-px shrink-0 self-center bg-border-low"></div>`;
  const row = cells.join(divider);
  return `
    <section class="${CONTAINER} pt-6 md:pt-8" data-carousel-root>
      ${sectionHeader(
        "Featured Products",
        "Your go-to features, all in one place",
        {
          right: `<div class="md:hidden">${carouselNav()}</div>`,
        }
      )}
      <!-- The bordered bar is the scroll content: it bleeds off the right edge while
           scrolling, and pr-3 pulls it back 12px at the last slide (border visible). -->
      <div data-carousel-scroll class="-mr-3 mt-4 overflow-x-auto scroll-smooth pr-3 no-scrollbar [-webkit-overflow-scrolling:touch] md:mr-0 md:pr-0">
        <div class="relative flex w-max items-center rounded-xl border border-border-card bg-white p-1 md:w-full">
          <div class="pointer-events-none absolute inset-1 z-0 overflow-hidden rounded-lg">
            <img src="${asset(
              "feat-bg"
            )}" alt="" class="absolute inset-0 size-full object-cover" />
            <div class="absolute inset-0" style="background-image:url('${asset(
              "feat-pattern"
            )}');background-size:1024px 1024px;background-position:top left;background-repeat:repeat;"></div>
          </div>
          ${row}
        </div>
      </div>
    </section>`;
}

/* -------------------------------------------------------------------------- */
/* Shorts                                                                     */
/* -------------------------------------------------------------------------- */
function shorts() {
  // Repeat the sample shorts (same images reused) so the slider looks full.
  // Swap `data.shorts` for real shorts data later — the markup stays the same.
  const list = [...data.shorts, ...data.shorts, ...data.shorts];
  const cards = list
    .map(
      (s) => `
      <article class="relative flex h-[260px] w-[175px] shrink-0 items-end overflow-hidden rounded-2xl shadow-[inset_0_0_10px_0_rgba(1,1,89,0.1)] md:h-[300px] md:w-[202px]">
        <img src="${asset(
          s.image
        )}" alt="" class="absolute inset-0 size-full object-cover" />
        ${
          s.isNew
            ? `<span class="absolute left-3 top-3 rounded-md bg-[#ebf0fa] px-2 py-0.5 font-heading text-[10px] font-extrabold text-fg-high">NEW</span>`
            : ""
        }
        <div class="relative flex w-full items-center bg-gradient-to-b from-transparent to-[#0f223d]/90 px-3 pb-4 pt-3">
          <p class="font-heading text-sm font-extrabold leading-[1.15] text-white [text-shadow:0_0_4px_rgba(0,0,0,0.5)]">${
            s.title
          }</p>
        </div>
      </article>`
    )
    .join("");
  const newBadge = `<span class="rounded-md bg-fg-high px-2 py-0.5 font-heading text-[10px] font-extrabold text-white">NEW</span>`;
  return `
    <section class="${CONTAINER} pt-6 md:pt-8" data-carousel-root>
      ${sectionHeader("Shorts", "Bite-sized hot takes & viral moments", {
        badge: newBadge,
        right: carouselNav(),
      })}
      <div data-carousel-scroll class="-mr-3 mt-3 flex gap-2 overflow-x-auto scroll-smooth pb-1 pr-3 no-scrollbar [-webkit-overflow-scrolling:touch] md:mr-0 md:pr-0">${cards}</div>
    </section>`;
}

/* -------------------------------------------------------------------------- */
/* "Coming up next" promo card — mobile only                                  */
/* -------------------------------------------------------------------------- */
function upNext() {
  const u = data.upNext;
  const seg = (v) =>
    `<div class="flex h-8 w-[50px] items-center justify-center rounded-[10px] bg-white/10 font-heading text-sm font-extrabold text-white">${v}</div>`;
  const colon = `<span class="font-heading text-sm text-white">:</span>`;
  return `
    <section class="px-3 pt-10 md:hidden">
      <div class="relative flex h-[451px] flex-col overflow-hidden rounded-2xl px-6 pb-[15px] pt-6">
        <img src="${asset(
          u.image
        )}" alt="" class="pointer-events-none absolute inset-0 size-full object-cover" />
        <div class="relative flex w-full flex-col gap-4">
          <p class="font-body text-xs text-[#d3dae6]">${u.eyebrow}</p>
          <div class="flex flex-col items-center">
            <p class="w-full font-display text-[35px] font-bold uppercase leading-[1.2] text-white">${
              u.titleTop
            }</p>
            <div class="w-full -rotate-[1.18deg]">
              <div class="flex h-[57px] w-full items-center justify-center overflow-hidden bg-[#80e2ff] px-3.5">
                <p class="whitespace-nowrap font-display text-[35px] font-bold uppercase leading-[1.2] text-[#010159]">${
                  u.titleHighlight
                }</p>
              </div>
            </div>
            <p class="w-full font-display text-[35px] font-bold uppercase leading-[1.2] text-white">${
              u.titleBottom
            }</p>
          </div>
          <div class="flex items-center gap-2.5">
            <div class="flex items-center gap-0.5">
              ${seg(u.countdown.d)}${colon}${seg(u.countdown.h)}${colon}${seg(
    u.countdown.m
  )}
            </div>
            <button type="button" class="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 font-heading text-sm font-extrabold text-fg-high transition hover:bg-white/90">
              ${icons.bell("size-4")} Remind Me
            </button>
          </div>
          <p class="font-body text-xs text-[#d3dae6]">${u.footer}</p>
        </div>
      </div>
    </section>`;
}

/* -------------------------------------------------------------------------- */
/* All Shows                                                                  */
/* -------------------------------------------------------------------------- */
function showCard(ep) {
  // 304px wide on mobile, 400px on desktop; height hugs on mobile, fixed 300px on desktop.
  return `
    <article class="flex w-[304px] shrink-0 flex-col gap-3.5 overflow-hidden rounded-xl bg-card-3 p-0.5 pb-[18px] md:w-[400px]">
      <div class="relative w-full shrink-0 overflow-hidden rounded-[10px]">
        <img src="${asset(
          ep.image
        )}" alt="" class="aspect-[300/167] w-full object-cover" />
        <span class="absolute bottom-1.5 left-1.5 flex h-4 items-center justify-center rounded-md bg-black px-1.5 font-heading text-[10px] font-bold leading-[1.2] text-white">${
          ep.duration
        }</span>
      </div>
      <div class="flex w-full flex-col gap-2 px-2.5">
        <h4 class="line-clamp-2 h-7 overflow-hidden font-heading text-sm font-extrabold leading-4 text-fg-high [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">${
          ep.title
        }</h4>
        <p class="font-body text-xs font-normal leading-4 text-fg-low">${ep.timestamp}</p>
      </div>
    </article>`;
}

function showRow(show) {
  return `
    <div class="flex w-full flex-col gap-3">
      <div class="flex w-full items-center gap-3">
        <span class="size-9 shrink-0 overflow-hidden rounded-full bg-fg-high md:size-12">
          <img src="${asset(
            show.avatar
          )}" alt="" class="size-full object-cover" />
        </span>
        <h3 class="min-w-0 flex-1 line-clamp-1 font-heading text-base font-extrabold leading-5 text-fg-high md:text-xl md:leading-6">${
          show.name
        }</h3>
        <a href="#" class="shrink-0 font-heading text-sm font-extrabold text-primary-text hover:underline md:text-base">Go to Show</a>
      </div>
      <div class="-mr-3 flex gap-2 overflow-x-auto scroll-smooth pb-1 pr-3 no-scrollbar [-webkit-overflow-scrolling:touch] md:mr-0 md:pr-0">
        ${show.episodes.map(showCard).join("")}
      </div>
    </div>`;
}

function allShows() {
  return `
    <section class="${CONTAINER} flex flex-col gap-5 pt-6 md:gap-7 md:pt-8">
      ${sectionHeader(
        "All Shows",
        "Find your favorite shows and new episodes."
      )}
      ${data.shows.map(showRow).join("")}
    </section>`;
}

/* -------------------------------------------------------------------------- */
/* Join Our Community                                                         */
/* -------------------------------------------------------------------------- */
// `maxW` optionally caps the content width (e.g. "max-w-[1140px]" on the show page).
function community(maxW = "") {
  const cards = data.community
    .map(
      (c) => `
      <a href="#" class="flex h-[85px] min-w-px flex-1 flex-col items-center justify-center gap-2 overflow-clip rounded-xl bg-card-3 px-2 py-3 transition hover:bg-border-low">
        <img src="${asset(c.icon)}" alt="" class="size-7" />
        <span class="text-center font-heading text-xs font-extrabold text-fg-high">${
          c.label
        }</span>
      </a>`
    )
    .join("");
  return `
    <section class="${CONTAINER} py-10">
      <div class="mx-auto flex w-full ${maxW} flex-col gap-4">
        ${sectionHeader(
          "Join Our Community",
          "Follow @BetUS for picks, drops & behind-the-scenes"
        )}
        <div class="flex items-center gap-2">${cards}</div>
      </div>
    </section>`;
}

/* -------------------------------------------------------------------------- */
/* Welcome-bonus promo — fixed at the mobile footer. Lives in a flex-col stack */
/* (gap 4px) so a second fixed component can sit above it with a 4px margin.    */
/* -------------------------------------------------------------------------- */
function subscribeAlert() {
  return `
    <div data-alert-item class="mx-3 flex items-center gap-2 rounded-xl bg-[#00264f] py-2 pl-3 pr-2">
      <span class="shrink-0 text-[#a4d8ff]">${icons.bellRing("size-5")}</span>
      <div class="flex min-w-0 flex-1 flex-col gap-0.5">
        <p class="truncate font-heading text-xs font-bold leading-4"><span class="text-[#a4d8ff]">+24</span><span class="text-white"> just subscribed</span></p>
        <p class="truncate font-body text-xs font-normal leading-4 text-white">Tap subscribe to get the next drop</p>
      </div>
      <button type="button" class="inline-flex h-6 min-w-16 shrink-0 items-center justify-center rounded-lg bg-primary px-2.5 font-heading text-xs font-extrabold leading-4 tracking-tight text-white transition hover:bg-primary-text">Subscribe</button>
      <button type="button" data-alert-close aria-label="Close" class="grid size-8 shrink-0 place-items-center text-[#9eaabe] transition hover:text-white">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="size-5" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </div>`;
}

function welcomeBonus() {
  return `
    <div data-welcome-root class="fixed inset-x-0 bottom-0 z-40 flex flex-col gap-1 md:hidden">
      ${subscribeAlert()}
      <div data-bonus-item class="flex items-center gap-2 bg-surface py-2 pl-3 pr-2 shadow-[0_-1px_10px_0_rgba(40,46,56,0.08)]">
        <div class="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 text-center">
          <p class="font-heading text-sm font-extrabold leading-4 text-fg-high">Get <span class="text-primary-text">200%</span> Welcome Bonus</p>
          <p class="flex items-center justify-center gap-0.5 font-body text-[10px] leading-4 text-fg-low">
            <span class="font-extrabold">21+</span><span>·</span><span>Gamble responsibly</span><span>·</span><span>1-800-GAMBLER</span>
          </p>
        </div>
        <button type="button" class="inline-flex h-8 min-w-20 shrink-0 items-center justify-center rounded-lg bg-[#ffc107] px-3 font-heading text-sm font-extrabold uppercase leading-4 text-[#010b1e] transition hover:brightness-95">Get Started</button>
        <button type="button" data-welcome-close aria-label="Close" class="grid size-8 shrink-0 place-items-center text-fg-medium transition hover:text-fg-high">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="size-5" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
    </div>`;
}

export function renderHome() {
  return [
    oddsTicker(),
    hero(),
    jumpToShow(),
    promotions(),
    featured(),
    shorts(),
    upNext(),
    allShows(),
    community(),
    `<div class="h-14 md:hidden"></div>`,
    welcomeBonus(),
  ].join("");
}

// Wires up interactive behavior after the markup is in the DOM.
export function initHome(root = document) {
  const oddsRoot = root.querySelector("[data-odds-root]");
  if (oddsRoot) {
    const scroller = oddsRoot.querySelector("[data-odds-scroll]");
    const prev = oddsRoot.querySelector('[data-odds="prev"]');
    const next = oddsRoot.querySelector('[data-odds="next"]');

    const step = () => Math.max(240, scroller.clientWidth * 0.8);
    prev.addEventListener("click", () =>
      scroller.scrollBy({ left: -step(), behavior: "smooth" })
    );
    next.addEventListener("click", () =>
      scroller.scrollBy({ left: step(), behavior: "smooth" })
    );

    // Hide arrows when there's nothing more to scroll in that direction.
    const sync = () => {
      const max = scroller.scrollWidth - scroller.clientWidth - 1;
      prev.disabled = scroller.scrollLeft <= 0;
      next.disabled = scroller.scrollLeft >= max;
    };
    scroller.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    sync();
  }

  // Generic carousels (Top Promotions, Shorts, …): a [data-carousel-root] with
  // a [data-carousel-scroll] row and prev/next buttons.
  root.querySelectorAll("[data-carousel-root]").forEach((el) => {
    const scroller = el.querySelector("[data-carousel-scroll]");
    const prev = el.querySelector('[data-carousel="prev"]');
    const next = el.querySelector('[data-carousel="next"]');
    if (!scroller || !prev || !next) return;

    const step = () => Math.max(200, scroller.clientWidth * 0.85);
    prev.addEventListener("click", () =>
      scroller.scrollBy({ left: -step(), behavior: "smooth" })
    );
    next.addEventListener("click", () =>
      scroller.scrollBy({ left: step(), behavior: "smooth" })
    );

    const sync = () => {
      const max = scroller.scrollWidth - scroller.clientWidth - 1;
      prev.disabled = scroller.scrollLeft <= 0;
      next.disabled = scroller.scrollLeft >= max;
    };
    scroller.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    sync();
  });

  // Live Chat collapse/expand: the header chevron hides the body and flips.
  root.querySelectorAll("[data-chat]").forEach((chat) => {
    const toggle = chat.querySelector("[data-chat-toggle]");
    const body = chat.querySelector("[data-chat-body]");
    const icon = chat.querySelector("[data-chat-icon]");
    if (!toggle || !body) return;
    toggle.addEventListener("click", () => {
      const collapsed = body.classList.toggle("hidden");
      icon.classList.toggle("rotate-180", collapsed);
      toggle.setAttribute("aria-expanded", String(!collapsed));
    });
  });

  // Dismiss the fixed mobile footer bars independently.
  root.querySelectorAll("[data-welcome-close]").forEach((btn) => {
    btn.addEventListener("click", () => btn.closest("[data-bonus-item]")?.remove());
  });
  root.querySelectorAll("[data-alert-close]").forEach((btn) => {
    btn.addEventListener("click", () => btn.closest("[data-alert-item]")?.remove());
  });

  // Generic accordions (e.g. show-page Host & Guests): click the row (or its
  // arrow) to open/close the body; the chevron flips.
  root.querySelectorAll("[data-accordion-toggle]").forEach((toggle) => {
    const item = toggle.closest("[data-accordion]");
    if (!item) return;
    const body = item.querySelector("[data-accordion-body]");
    const icon = item.querySelector("[data-accordion-icon]");
    toggle.addEventListener("click", () => {
      const open = !body.classList.toggle("hidden");
      if (icon) icon.classList.toggle("rotate-180", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
  });
}

// Reusable helpers for other pages (e.g. the show / video pages).
export { CONTAINER, sectionHeader, carouselNav, showCard, community, hero };
