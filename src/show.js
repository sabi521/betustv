import "./style.css";
import { asset } from "./lib/assets.js";
import { icons } from "./icons.js";
import {
  CONTAINER,
  sectionHeader,
  carouselNav,
  showCard,
  community,
  initHome,
} from "./sections.js";

/* ============================================================================
   Show Page — BetUS TV "The EPL Show"
   Header/footer are shared/global (backend); this renders the page body only.
   Reuses home-page components: section headers, video cards, Join Community,
   and the generic carousel wiring (initHome).
   ============================================================================ */

// ---- sample data (backend swaps these) ------------------------------------
const showMeta = {
  date: "10:00 AM ET Thursday",
  poster: "show-premier-1",
  vimeoId: "1207428466",
};

const fullShowVideos = [
  { title: "Premier League Picks Matchday 38 | Soccer Predictions & Betting Analysis", image: "show-premier-1", duration: "34:26", timestamp: "1 week ago" },
  { title: "Premier League Picks Matchday 37 | Soccer Predictions & Betting Analysis", image: "show-premier-2", duration: "34:39", timestamp: "5 days ago" },
  { title: "Premier League Picks Matchday 36 | Soccer Predictions & Betting Analysis", image: "show-premier-3", duration: "34:52", timestamp: "4 weeks ago" },
  { title: "Premier League Picks Matchday 35 | Soccer Predictions & Betting Analysis", image: "show-premier-1", duration: "35:07", timestamp: "2 weeks ago" },
  { title: "Premier League Picks Matchday 34 | Soccer Predictions & Betting Analysis", image: "show-premier-2", duration: "35:20", timestamp: "3 weeks ago" },
  { title: "Premier League Picks Matchday 33 | Soccer Predictions & Betting Analysis", image: "show-premier-3", duration: "35:32", timestamp: "1 week ago" },
];

const relatedNews = [
  { image: "news-1", meta: "May 22 · 7 min read", title: "Premier League Final Day: Europe and Relegation on the Line" },
  { image: "news-2", meta: "Sep 03 · 6 min read", title: "Premier League Odds: Man City & Liverpool Lead the Way" },
  { image: "news-3", meta: "Aug 06 · 6 min read", title: "Premier League 2024-25 Season Preview and Betting Picks" },
  { image: "news-4", meta: "Jul 15 · 7 min read", title: "4 Storylines to Follow if You're Betting on the Premier League in 2024-25" },
  { image: "news-5", meta: "May 20 · 15 min read", title: "The Clubs with the Most FIFA World Cup Winning Players" },
];

// Desktop: dark full-bleed "picks" cards. Mobile: light video cards.
const picks = [
  { title: "European Leagues Games Hot Takes and Picks for May 15-17", image: "picks-1", meta: "May 15 · 6 min read" },
  { title: "Champions League Semifinals | Soccer Predictions & Best Bets", image: "picks-vid-1", meta: "Jan 16, 2026 · 4 min read" },
  { title: "Premier League Weekend Best Bets & Value Picks", image: "picks-vid-2", meta: "Jan 12, 2026 · 5 min read" },
  { title: "Top Soccer Parlays and Player Props This Week", image: "picks-vid-3", meta: "Jan 09, 2026 · 6 min read" },
  { title: "European Leagues Games Hot Takes and Picks for May 15-17", image: "picks-1", meta: "May 15 · 6 min read" },
  { title: "Champions League Semifinals | Soccer Predictions & Best Bets", image: "picks-vid-1", meta: "Jan 16, 2026 · 4 min read" },
];

const shorts = [
  { title: "PSG TOO MUCH FOR ARSENAL 👀⚽", image: "shorts-1", isNew: true },
  { title: "DON'T SLEEP ON GHANA 👀🇬🇭", image: "shorts-2", isNew: true },
  { title: "MEXICO OWNS THIS GROUP 🇲🇽🔥", image: "shorts-3", isNew: true },
  { title: "CALAFIORI CARD IS A BANKER 🟨⚽", image: "shorts-4", isNew: false },
  { title: "CITY SHOULD ROLL 🔥⚽", image: "shorts-5", isNew: false },
  { title: "NO CLEAN SHEETS HERE 🚫⚽", image: "shorts-6", isNew: false },
];

// Avatar crops from the shared show-cast-mobile group image (exact Figma offsets).
const hosts = [
  {
    name: 'Gordon "Flash" Watson',
    left: "-98.04%",
    bio: "A former Premier League striker turned lead analyst, Gordon 'Flash' Watson brings two decades of top-flight experience to every matchday breakdown. He fronts the show with the sharp reads and honest calls that made him a fan favourite.",
  },
  {
    name: "Brad Thomas",
    left: "-192.58%",
    bio: "A seasoned betting analyst, Brad Thomas has built his reputation on fearless value picks and data-driven insight across Europe's biggest leagues. Expect straight talk, standout numbers, and the odd contrarian shout.",
  },
  {
    name: "Mina Rzouki",
    left: "-6.46%",
    bio: "Award-winning football journalist Mina Rzouki covers the tactical side of the beautiful game, connecting the numbers to what actually happens on the pitch. She adds the context that turns a hunch into a confident bet.",
  },
];

const channels = [
  { key: "mlb", label: "MLB" },
  { key: "nba", label: "NBA" },
  { key: "ncaab", label: "NCAAB" },
  { key: "ncaaf", label: "NCAAF" },
  { key: "nfl", label: "NFL" },
  { key: "ucl", label: "UCL" },
];

// ---- shared bits -----------------------------------------------------------
const playIcon = `<svg viewBox="0 0 24 24" fill="currentColor" class="size-6 translate-x-0.5" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`;

// "THE EPL / PREDICTIONS / SHOW" title lockup (Gustavo). `size` sets font size,
// `pad` sets the cyan "Predictions" band padding, `items`/`text` set alignment.
function titleLockup(size, pad = "px-3 py-1.5", items = "items-start", text = "text-left") {
  const line = (t) =>
    `<p class="w-full ${text} font-display ${size} font-bold uppercase leading-[1.1] text-white">${t}</p>`;
  return `
    <div class="flex w-full flex-col ${items}">
      ${line("The EPL")}
      <div class="w-full -rotate-[1.18deg]">
        <div class="flex w-full items-center justify-center bg-[#80e2ff] ${pad}">
          <p class="whitespace-nowrap text-center font-display ${size} font-bold uppercase leading-[1.1] text-[#010159]">Predictions</p>
        </div>
      </div>
      ${line("Show")}
    </div>`;
}

// "Go to X" style link (right side of a section header).
const goLink = (label) =>
  `<a href="#" class="shrink-0 font-heading text-sm font-extrabold text-primary-text hover:underline md:text-base">${label}</a>`;

/* -------------------------------------------------------------------------- */
/* Breadcrumb                                                                 */
/* -------------------------------------------------------------------------- */
// Inverse breadcrumb — lives inside the dark banner (bg #000c19).
function breadcrumb() {
  return `
    <nav class="flex items-center gap-1 py-1.5 md:py-2" aria-label="Breadcrumb">
      <a href="/" class="inline-flex h-6 min-w-20 shrink-0 items-center justify-center gap-1.5 rounded-[10px] border border-[#8e9ab0] px-2.5 font-heading text-sm font-extrabold text-white transition hover:bg-white/10 md:h-8 md:px-3">
        ${icons.home("size-4")} BetUS TV
      </a>
      ${icons.chevronRight("size-4 shrink-0 text-[#9eaabe] md:size-5")}
      <span class="shrink-0 whitespace-nowrap font-heading text-sm font-semibold leading-4 text-[#9eaabe]">The EPL Show</span>
    </nav>`;
}

/* -------------------------------------------------------------------------- */
/* Hero: player + title bar (+ Related News sidebar on desktop)               */
/* -------------------------------------------------------------------------- */
function player() {
  return `
    <div class="relative aspect-[390/213] w-full overflow-hidden rounded-none md:rounded-2xl">
      <img src="${asset(showMeta.poster)}" alt="" class="absolute inset-0 size-full object-cover" />
      <div class="pointer-events-none absolute inset-x-0 top-0 h-[57px] bg-gradient-to-t from-transparent to-[#000c19] md:h-[100px]"></div>
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#000c19] md:h-[100px]"></div>
      <button type="button" aria-label="Play" class="absolute left-1/2 top-1/2 grid size-[60px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#0f223d]/40 text-white transition hover:bg-[#0f223d]/60">
        ${playIcon}
      </button>
    </div>`;
}

function showTitleBar() {
  return `
    <div class="flex items-center justify-between gap-4">
      <div class="w-[195px] shrink-0 md:w-[247px]">
        ${titleLockup("text-[25.086px] md:text-[31.776px]", "px-2.5 py-2.5 md:px-[13px] md:py-3")}
      </div>
      <div class="flex flex-col items-center gap-2.5 md:flex-row md:gap-3.5">
        <span class="whitespace-nowrap font-body text-sm font-normal leading-5 text-white md:text-base md:leading-6">${showMeta.date}</span>
        <div class="flex items-center gap-2">
          <button type="button" class="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 font-heading text-xs font-extrabold text-white transition hover:bg-primary-text md:px-4 md:py-2 md:text-sm">
            ${icons.bell("size-4")} Subscribe
          </button>
          <button type="button" aria-label="Share" class="grid size-8 shrink-0 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white/10 md:size-10">
            ${icons.share("size-4")}
          </button>
        </div>
      </div>
    </div>`;
}

function newsCard(n) {
  return `
    <a href="#" class="flex flex-1 items-center gap-4 rounded-xl bg-[#111a2a] py-0.5 pl-0.5 pr-4 transition hover:brightness-110">
      <img src="${asset(n.image)}" alt="" class="aspect-[130/86] w-[150px] shrink-0 rounded-[10px] object-cover" />
      <div class="flex min-w-0 flex-1 flex-col gap-2 py-1">
        <p class="line-clamp-1 font-body text-sm font-normal leading-5 text-[#d3dae6]">${n.meta}</p>
        <p class="line-clamp-2 h-9 max-w-[183px] font-heading text-base font-extrabold leading-5 text-[#f8fafc] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">${n.title}</p>
      </div>
    </a>`;
}

function hero() {
  return `
    <section class="w-full bg-[#000c19] pb-6 md:pb-8">
      <div class="${CONTAINER} flex flex-col items-stretch">
        ${breadcrumb()}
        <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-[51px]">
          <div class="flex w-full min-w-0 flex-1 flex-col gap-5">
            <div class="-mx-3 md:mx-0">${player()}</div>
            ${showTitleBar()}
          </div>
          ${relatedNewsMarkup()}
        </div>
      </div>
    </section>`;
}

// Related News — desktop-only sidebar (the mobile show page has no Related News).
function relatedNewsMarkup() {
  return `
    <aside class="hidden w-[400px] shrink-0 flex-col gap-4 overflow-hidden lg:flex">
      <div class="flex items-center gap-3">
        <h2 class="min-w-0 flex-1 truncate font-heading text-base font-extrabold text-[#f8fafc]">Related News</h2>
        <a href="#" class="shrink-0 font-heading text-sm font-extrabold text-link hover:underline">Go to News</a>
      </div>
      <div class="flex flex-1 flex-col gap-2">
        ${relatedNews.map(newsCard).join("")}
      </div>
    </aside>`;
}

/* -------------------------------------------------------------------------- */
/* Full Show Videos (reuses home showCard)                                    */
/* -------------------------------------------------------------------------- */
function fullShowVideosSection(
  title = "Full Show Videos",
  subtitle = "Full episodes and betting insights.",
) {
  return `
    <section class="${CONTAINER} pt-6 md:pt-8" data-carousel-root>
      ${sectionHeader(title, subtitle, {
        right: carouselNav(),
      })}
      <div data-carousel-scroll class="-mr-3 mt-4 flex gap-2 overflow-x-auto scroll-smooth pb-1 pr-3 no-scrollbar [-webkit-overflow-scrolling:touch] md:mr-0 md:pr-0">
        ${fullShowVideos.map(showCard).join("")}
      </div>
    </section>`;
}

/* -------------------------------------------------------------------------- */
/* Premier League Free Picks                                                  */
/* -------------------------------------------------------------------------- */
function pickCardDesktop(p) {
  return `
    <article class="relative hidden h-[365px] w-[249px] shrink-0 items-end overflow-hidden rounded-2xl md:flex">
      <img src="${asset(p.image)}" alt="" class="absolute inset-0 size-full object-cover" />
      <div class="relative flex w-full flex-col gap-3 bg-gradient-to-b from-[rgba(15,34,61,0.02)] to-[rgba(15,34,61,0.9)] px-4 pb-6 pt-8 backdrop-blur-[3px]">
        <p class="line-clamp-2 max-h-8 font-heading text-sm font-extrabold leading-4 text-white [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [text-shadow:0px_1px_2px_rgb(0_0_0_/_0.10)]">${p.title}</p>
        <p class="font-body text-sm font-normal leading-5 text-[#d3dae6]">${p.meta}</p>
      </div>
    </article>`;
}
function pickCardMobile(p) {
  return `
    <article class="flex w-[241px] shrink-0 flex-col gap-3.5 overflow-hidden rounded-xl bg-card-3 p-0.5 pb-[18px] md:hidden">
      <img src="${asset(p.image)}" alt="" class="aspect-[300/167] w-full rounded-[10px] object-cover" />
      <div class="flex w-full flex-col gap-2 px-2.5">
        <h4 class="line-clamp-2 h-7 overflow-hidden font-heading text-sm font-extrabold leading-4 text-fg-high [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">${p.title}</h4>
        <p class="font-body text-xs font-normal leading-4 text-fg-low">${p.meta}</p>
      </div>
    </article>`;
}
function picksSection() {
  const cards = picks.map((p) => pickCardDesktop(p) + pickCardMobile(p)).join("");
  return `
    <section class="${CONTAINER} pt-6 md:pt-8" data-carousel-root>
      ${sectionHeader("Premier League Free Picks", "Winning bets, straight from the desk.", {
        right: carouselNav(),
      })}
      <div data-carousel-scroll class="-mr-3 mt-4 flex gap-2 overflow-x-auto scroll-smooth pb-1 pr-3 no-scrollbar [-webkit-overflow-scrolling:touch] md:mr-0 md:pr-0">
        ${cards}
      </div>
    </section>`;
}

/* -------------------------------------------------------------------------- */
/* Shorts                                                                     */
/* -------------------------------------------------------------------------- */
function shortsSection() {
  const list = [...shorts, ...shorts];
  const cards = list
    .map(
      (s) => `
      <article class="relative flex h-[260px] w-[175px] shrink-0 items-end overflow-hidden rounded-2xl shadow-[inset_0_0_10px_0_rgba(1,1,89,0.1)] md:h-[370px] md:w-[249px]">
        <img src="${asset(s.image)}" alt="" class="absolute inset-0 size-full object-cover" />
        ${s.isNew ? `<span class="absolute left-3 top-3 rounded-md bg-[#ebf0fa] px-2 py-0.5 font-heading text-[10px] font-extrabold text-fg-high">NEW</span>` : ""}
        <div class="relative flex w-full items-center bg-gradient-to-b from-transparent to-[#0f223d]/90 px-3 pb-4 pt-3">
          <p class="font-heading text-sm font-extrabold leading-[1.15] text-white [text-shadow:0_0_4px_rgba(0,0,0,0.5)]">${s.title}</p>
        </div>
      </article>`,
    )
    .join("");
  const newBadge = `<span class="rounded-md bg-fg-high px-2 py-0.5 font-heading text-[10px] font-extrabold text-white">NEW</span>`;
  return `
    <section class="${CONTAINER} pt-6 md:pt-8" data-carousel-root>
      ${sectionHeader("Shorts", "Bite-sized hot takes & viral moments", { badge: newBadge, right: carouselNav() })}
      <div data-carousel-scroll class="-mr-3 mt-3 flex gap-2 overflow-x-auto scroll-smooth pb-1 pr-3 no-scrollbar [-webkit-overflow-scrolling:touch] md:mr-0 md:pr-0">${cards}</div>
    </section>`;
}

/* -------------------------------------------------------------------------- */
/* About / Host & Guests (teal card)                                          */
/* -------------------------------------------------------------------------- */
function aboutBlock() {
  const hostRow = (h) => `
    <div data-accordion class="overflow-hidden rounded-2xl bg-[#111a2a]">
      <button type="button" data-accordion-toggle aria-expanded="false" class="flex w-full items-center gap-2 py-2.5 pl-2.5 pr-4 text-left transition hover:brightness-110">
        <span class="flex min-w-0 flex-1 items-center gap-4">
          <span class="relative size-12 shrink-0 overflow-hidden rounded-full bg-black/20">
            <img src="${asset("show-cast-mobile")}" alt="" class="absolute max-w-none" style="width:316.41%;height:275.62%;left:${h.left};top:-107.01%;" />
          </span>
          <span class="min-w-0 flex-1 truncate font-heading text-base font-extrabold text-[#f8fafc]">${h.name}</span>
        </span>
        <span data-accordion-icon class="block shrink-0 transition-transform">${icons.chevronDown("size-6 text-[#9eaabe]")}</span>
      </button>
      <div data-accordion-body class="hidden px-4 pb-4 pl-[70px]">
        <p class="font-body text-base leading-6 text-[#d3dae6]">${h.bio}</p>
      </div>
    </div>`;
  return `
    <section class="${CONTAINER} pt-6 md:pt-10">
      <div class="mx-auto flex w-full max-w-[1140px] flex-col gap-6 overflow-hidden rounded-2xl bg-[#000c19] p-5 md:gap-10 md:p-6">
        <!-- hero banner: lockup centered top + hosts centered bottom on mobile;
             lockup left + hosts right on desktop -->
        <div class="relative -mx-5 -mt-5 h-[368px] overflow-hidden rounded-none md:-mx-[18px] md:-mt-[18px] md:h-80 md:rounded-xl"
             style="background:radial-gradient(circle at 75% 115%,#0a565d 0%,#073a3d 50%,#041e1d 100%);">
          <div class="absolute left-1/2 top-6 z-10 w-[263px] -translate-x-1/2 md:left-[31px] md:top-16 md:w-[460px] md:translate-x-0">
            ${titleLockup(
              "text-[33.8px] md:text-[60px]",
              "px-3.5 py-3 md:px-6 md:py-5",
              "items-center md:items-start",
              "text-center md:text-left",
            )}
          </div>
          <img src="${asset("show-cast-mobile")}" alt="" class="pointer-events-none absolute left-0 top-0 h-[368px] w-full object-cover object-[center_25%] md:hidden" />
          <img src="${asset("show-cast")}" alt="" class="pointer-events-none absolute right-0 top-[42px] hidden h-72 w-[582px] object-cover object-[center_95%] md:block" />
        </div>
        <!-- content -->
        <div class="flex flex-col gap-6 md:flex-row md:gap-[86px] md:px-10">
          <div class="flex flex-1 flex-col gap-4">
            <h3 class="font-heading text-lg font-extrabold text-white md:text-2xl">The Premier League Show Picks & Analysis</h3>
            <div class="flex flex-col gap-3 font-body text-base leading-6 text-[#d3dae6] md:text-lg md:leading-relaxed">
              <p>The Premier League Show is live every Thursday at 10:00 AM ET! The show delivers the best analysis, betting insights, and comprehensive information on every EPL matchday.</p>
              <p>Our host, Gordon 'Flash' Watson, is joined by Mina Rzouki and Brad Thomas to provide you with winning bets and plenty of intel to help you make the most of the Premier League. Don't miss it—join us!</p>
            </div>
          </div>
          <div class="flex flex-1 flex-col gap-3">
            <h3 class="font-heading text-lg font-extrabold text-white">Host & Guests</h3>
            <div class="flex flex-col gap-1">
              ${hosts.map(hostRow).join("")}
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

/* -------------------------------------------------------------------------- */
/* Check Other Channels                                                       */
/* -------------------------------------------------------------------------- */
function otherChannels() {
  const tile = (c) =>
    `<a href="#" class="block overflow-hidden rounded-xl border border-white/20"><img src="${asset("channel-" + c.key)}" alt="${c.label}" class="aspect-[117/96] w-full object-cover md:aspect-[183/117]" /></a>`;
  return `
    <section class="${CONTAINER} pt-6 md:pt-10">
      <div class="mx-auto flex w-full max-w-[1140px] flex-col gap-3">
        <h2 class="font-heading text-lg font-extrabold text-fg-high md:text-2xl">Check Other Channels</h2>
        <div class="grid grid-cols-3 gap-2 md:grid-cols-6">
          ${channels.map(tile).join("")}
        </div>
      </div>
    </section>`;
}

/* -------------------------------------------------------------------------- */
export function renderShow() {
  return [
    hero(),
    fullShowVideosSection(),
    picksSection(),
    shortsSection(),
    aboutBlock(),
    otherChannels(),
    community("max-w-[1140px]"),
  ].join("");
}

// Reused by the video page ("the rest is similar").
export {
  fullShowVideosSection,
  picksSection,
  shortsSection,
  aboutBlock,
  otherChannels,
};

// Only mount when this file is the page entry (guarded so video.js can import
// the section builders above without clobbering #app).
const showApp = document.querySelector("#app");
if (showApp && showApp.dataset.page === "show") {
  showApp.innerHTML = renderShow();
  initHome();
}
