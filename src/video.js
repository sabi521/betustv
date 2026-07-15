import "./style.css";
import { asset } from "./lib/assets.js";
import { icons } from "./icons.js";
import { CONTAINER, community, initHome } from "./sections.js";
import { fullShowVideosSection } from "./show.js";

/* ============================================================================
   Video Page — BetUS TV
   Light-themed variant of the show page: a live video player + details on the
   left and Related News on the right. Header/footer are shared/global.
   The lower sections (Full Show Videos, Picks, Shorts, About, Channels,
   Community) are reused from the show page.
   ============================================================================ */

// ---- sample data (backend swaps these) ------------------------------------
const video = {
  date: "May 07, 2026",
  title:
    "Premier League Picks Matchday 36 | Soccer Predictions & Betting Analysis",
  showName: "The Europe Premier League Show",
  showNameShort: "The EPL Show",
  vimeoId: "1207428466",
  avatar: "avatar-premier",
};

const relatedNews = [
  { image: "news-1", meta: "May 22 · 7 min read", title: "Premier League Final Day: Europe and Relegation on the Line" },
  { image: "news-2", meta: "Sep 03 · 6 min read", title: "Premier League Odds: Man City & Liverpool Lead the Way" },
  { image: "news-3", meta: "Aug 06 · 6 min read", title: "Premier League 2024-25 Season Preview and Betting Picks" },
  { image: "news-4", meta: "Jul 15 · 7 min read", title: "4 Storylines to Follow if You're Betting on the Premier League in 2024-25" },
  { image: "news-5", meta: "May 20 · 15 min read", title: "The Clubs with the Most FIFA World Cup Winning Players" },
];

/* -------------------------------------------------------------------------- */
/* Breadcrumb (3 levels, light theme)                                         */
/* -------------------------------------------------------------------------- */
function breadcrumb() {
  return `
    <nav class="flex items-center gap-1 py-1.5 md:py-2" aria-label="Breadcrumb">
      <a href="/" class="inline-flex h-6 min-w-20 shrink-0 items-center justify-center gap-1.5 rounded-[10px] border border-border-medium px-2.5 font-heading text-sm font-extrabold text-fg-high transition hover:bg-card-3 md:h-8 md:px-3">
        ${icons.home("size-4")} BetUS TV
      </a>
      ${icons.chevronRight("size-4 shrink-0 text-fg-low md:size-5")}
      <a href="/show.html" class="shrink-0 whitespace-nowrap font-heading text-sm font-extrabold text-fg-high hover:underline">The EPL Show</a>
      ${icons.chevronRight("size-4 shrink-0 text-fg-low md:size-5")}
      <span class="max-w-[197px] truncate font-heading text-sm font-semibold leading-4 text-fg-low">${video.title}</span>
    </nav>`;
}

/* -------------------------------------------------------------------------- */
/* Video player — Vimeo embed (same video as the home hero), at the player's   */
/* exact 949/534 box; full-bleed on mobile, rounded on desktop.                */
/* -------------------------------------------------------------------------- */
function player() {
  return `
    <div class="relative aspect-[949/534] w-full overflow-hidden rounded-none shadow-[inset_0_0_20px_0_rgba(0,0,0,0.2)] md:rounded-2xl">
      <iframe
        src="https://player.vimeo.com/video/${video.vimeoId}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        class="absolute inset-0 size-full"
        title="${video.title}"></iframe>
    </div>`;
}

/* -------------------------------------------------------------------------- */
/* Video info (date + title) — order flips between breakpoints                */
/* -------------------------------------------------------------------------- */
function videoInfo() {
  return `
    <div class="flex flex-col gap-2 md:gap-3">
      <p class="order-2 font-body text-sm leading-5 text-fg-medium md:order-1 md:text-base md:leading-6">${video.date}</p>
      <p class="order-1 font-heading text-lg font-extrabold leading-[1.2] text-fg-high md:order-2 md:truncate md:text-2xl">${video.title}</p>
    </div>`;
}

/* -------------------------------------------------------------------------- */
/* Show info row — bare on mobile, white pill on desktop                      */
/* -------------------------------------------------------------------------- */
function showRow() {
  return `
    <div class="flex items-center gap-4 md:justify-between md:gap-3 md:rounded-full md:bg-card-1 md:py-2 md:pl-1.5 md:pr-4">
      <a href="#" class="flex min-w-0 flex-1 items-center gap-2.5">
        <img src="${asset(video.avatar)}" alt="" class="size-9 shrink-0 rounded-full object-cover md:size-14" />
        <span class="min-w-0 flex-1 truncate font-heading font-extrabold text-fg-high">
          <span class="text-sm md:hidden">${video.showNameShort}</span>
          <span class="hidden text-xl md:inline">${video.showName}</span>
        </span>
      </a>
      <div class="flex shrink-0 items-center gap-2">
        <button type="button" class="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 font-heading text-xs font-extrabold text-white transition hover:bg-primary-text md:px-4 md:py-2 md:text-sm">
          ${icons.bell("size-4")} Subscribe
        </button>
        <button type="button" aria-label="Share" class="grid size-8 shrink-0 place-items-center rounded-full border border-border-medium text-fg-high transition hover:bg-card-3 md:size-10">
          ${icons.share("size-4")}
        </button>
      </div>
    </div>`;
}

/* -------------------------------------------------------------------------- */
/* Related News (light cards, desktop-only sidebar)                           */
/* -------------------------------------------------------------------------- */
function newsCard(n) {
  return `
    <a href="#" class="flex flex-1 items-center gap-4 rounded-xl bg-card-2 py-0.5 pl-0.5 pr-4 transition hover:bg-card-3">
      <img src="${asset(n.image)}" alt="" class="aspect-[130/86] w-[150px] shrink-0 rounded-[10px] object-cover" />
      <div class="flex min-w-0 flex-1 flex-col gap-2 py-1">
        <p class="line-clamp-1 font-body text-sm leading-5 text-fg-medium">${n.meta}</p>
        <p class="line-clamp-2 h-8 font-heading text-base font-extrabold leading-5 text-fg-high [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">${n.title}</p>
      </div>
    </a>`;
}

function relatedNewsMarkup() {
  return `
    <aside class="hidden w-[430px] shrink-0 flex-col gap-4 overflow-hidden lg:flex">
      <div class="flex items-center gap-3">
        <h2 class="min-w-0 flex-1 truncate font-heading text-base font-extrabold text-fg-high">Related News</h2>
        <a href="#" class="shrink-0 font-heading text-sm font-extrabold text-primary-text hover:underline">Go to News</a>
      </div>
      <div class="flex flex-1 flex-col gap-2">
        ${relatedNews.map(newsCard).join("")}
      </div>
    </aside>`;
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */
function videoHero() {
  return `
    <section class="w-full bg-surface pb-8 pt-2">
      <div class="${CONTAINER} flex flex-col gap-2">
        ${breadcrumb()}
        <div class="flex flex-col gap-3.5 lg:flex-row lg:items-start lg:gap-[51px]">
          <div class="flex w-full min-w-0 flex-1 flex-col gap-3.5 md:gap-6 lg:min-w-[720px]">
            <div class="flex flex-col gap-3.5 md:gap-5">
              <div class="-mx-3 md:mx-0">${player()}</div>
              ${videoInfo()}
            </div>
            ${showRow()}
          </div>
          ${relatedNewsMarkup()}
        </div>
      </div>
    </section>`;
}

/* -------------------------------------------------------------------------- */
export function renderVideo() {
  return [
    videoHero(),
    fullShowVideosSection("Recent Videos", ""),
    community("max-w-[1430px]"),
  ].join("");
}

const app = document.querySelector("#app");
if (app) {
  app.innerHTML = renderVideo();
  initHome();
}
