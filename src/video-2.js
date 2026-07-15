import "./style.css";
import { asset } from "./lib/assets.js";
import { CONTAINER, carouselNav, hero, community, initHome } from "./sections.js";
import { fullShowVideosSection } from "./show.js";

/* ============================================================================
   Video Page 2 — BetUS TV
   Same hero as the home page, a horizontal Related News slider, then the same
   body as video.html (Recent Videos slider + Join Our Community).
   ============================================================================ */

const relatedNews = [
  { image: "news-1", meta: "May 22 · 7 min read", title: "Premier League Final Day: Europe and Relegation on the Line" },
  { image: "news-2", meta: "Sep 03 · 6 min read", title: "Premier League Odds: Man City & Liverpool Lead the Way" },
  { image: "news-3", meta: "Aug 06 · 6 min read", title: "Premier League 2024-25 Season Preview and Betting Picks" },
  { image: "news-4", meta: "Jul 15 · 7 min read", title: "4 Storylines to Follow if You're Betting on the Premier League in 2024-25" },
  { image: "news-5", meta: "May 20 · 15 min read", title: "The Clubs with the Most FIFA World Cup Winning Players" },
];

/* -------------------------------------------------------------------------- */
/* Related News — horizontal slider (desktop) / vertical stack (mobile)       */
/* -------------------------------------------------------------------------- */
function newsCard(n) {
  return `
    <a href="#" class="flex h-[125px] w-full shrink-0 items-center gap-4 rounded-xl bg-card-2 py-0.5 pl-0.5 pr-4 transition hover:bg-card-3 md:w-[430px]">
      <img src="${asset(n.image)}" alt="" class="h-full w-[130px] shrink-0 rounded-[10px] object-cover md:w-[150px]" />
      <div class="flex min-w-0 flex-1 flex-col gap-2 pb-2">
        <p class="truncate font-body text-sm leading-5 text-fg-medium">${n.meta}</p>
        <p class="line-clamp-2 h-[34px] font-heading text-base font-extrabold leading-[1.25] text-fg-high [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">${n.title}</p>
      </div>
    </a>`;
}

function relatedNewsSection() {
  return `
    <section class="${CONTAINER} pt-6 md:pt-8" data-carousel-root>
      <div class="flex items-center gap-2">
        <h2 class="min-w-0 flex-1 line-clamp-1 font-heading text-xl font-extrabold leading-6 text-fg-high md:text-2xl md:leading-7">Related News</h2>
        <a href="#" class="shrink-0 font-heading text-sm font-extrabold text-primary-text hover:underline md:hidden">Go to News</a>
        <div class="hidden shrink-0 md:block">${carouselNav()}</div>
      </div>
      <div data-carousel-scroll class="mt-4 flex flex-col gap-2 md:-mr-3 md:flex-row md:overflow-x-auto md:scroll-smooth md:pb-1 md:pr-3 md:no-scrollbar md:[-webkit-overflow-scrolling:touch]">
        ${relatedNews.map(newsCard).join("")}
      </div>
    </section>`;
}

/* -------------------------------------------------------------------------- */
export function renderVideo2() {
  return [
    hero(),
    relatedNewsSection(),
    fullShowVideosSection("Recent Videos", ""),
    community("max-w-[1430px]"),
  ].join("");
}

const app = document.querySelector("#app");
if (app) {
  app.innerHTML = renderVideo2();
  initHome();
}
