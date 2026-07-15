// ============================================================================
// Sample content for the BetUS TV home page.
// Structured to mirror a backend payload — the Blade/Laravel/WordPress layer
// can replace these arrays with real data without touching the markup.
// ============================================================================

// Live game odds ticker (top bar). One entry per matchup card.
const oddsBase = [
  {
    away: "SA", home: "NY", time: "5:30 PM PT",
    awayIcon: "team-sa", homeIcon: "team-ny",
    spread: "NY -1.5", total: "215.5", ml: "SA +105",
  },
  {
    away: "LA", home: "CHI", time: "7:00 PM PT",
    awayIcon: "team-la", homeIcon: "team-chi",
    spread: "CHI -3.0", total: "220.0", ml: "LA +120",
  },
  {
    away: "BOS", home: "MIA", time: "8:00 PM PT",
    awayIcon: "team-bos", homeIcon: "team-mia",
    spread: "BOS -2.5", total: "210.0", ml: "MIA +110",
  },
];
// Repeat the matchups to fill the scrollable ticker (as in the design).
export const oddsTicker = [...oddsBase, ...oddsBase, ...oddsBase];

// Vimeo id for the hero player (from the embed snippet provided).
export const hero = {
  vimeoId: "1207428466",
  showTitle: "The Europe Premier League Show",
  showTitleMobile: "The EPL Show",
  avatar: "hero-logo",
  chatCount: 428,
};

// Repeated chat messages to fill the live-chat panel.
export const chatMessages = [
  { user: "JenC", text: "Rogan looks great today" },
  { user: "SamL", text: "the Georgia take is wild" },
  { user: "JamK", text: "I can't believe how intense the debate got!" },
  { user: "AlexT", text: "That twist at the end was unexpected!" },
  { user: "ChrisM", text: "The play was top-notch this season." },
];

export const jumpToShow = [
  "NBA",
  "MLB",
  "World Cup Show",
  "The Champions League Show",
  "EPL",
  "NFL",
  "NCAAB",
  "The College Football Show",
];

export const promotions = [
  { title: "200% Crypto Welcome Bonus", icon: "spade-white", image: "promo-1" },
  { title: "200% Welcome Bonus", icon: "allsports-white", image: "promo-2" },
  { title: "225% Welcome Bonus", icon: "allsports-white", image: "promo-3" },
  { title: "50% Sports Re-up Bonus", icon: "zap-white", image: "promo-4" },
  { title: "100% Crypto Re-up Bonus", icon: "allsports-white", image: "promo-5" },
  { title: "225% Welcome Bonus", icon: "allsports-white", image: "promo-6" },
  { title: "200% Welcome Bonus", icon: "allsports-white", image: "promo-7" },
  { title: "200% Welcome Bonus", icon: "allsports-white", image: "promo-8" },
];

export const featuredProducts = [
  { label: "Live Betting", icon: "feat-live-betting" },
  { label: "Odds Boost", icon: "feat-odds-boost" },
  { label: "Props Builder", icon: "feat-props-builder" },
  { label: "Same Game Parlay", icon: "feat-same-game-parlay" },
  { label: "Live Streaming", icon: "feat-live-streaming" },
  { label: "Contests", icon: "feat-contests" },
  { label: "Promos", icon: "feat-promos" },
  { label: "Casino", icon: "feat-casino" },
  { label: "Sports", icon: "feat-sports" },
];

export const shorts = [
  { title: "PSG TOO MUCH FOR ARSENAL 👀⚽", image: "shorts-1", isNew: true },
  { title: "DON'T SLEEP ON GHANA 👀🇬🇭", image: "shorts-2", isNew: true },
  { title: "MEXICO OWNS THIS GROUP 🇲🇽🔥", image: "shorts-3", isNew: true },
  { title: "CALAFIORI CARD IS A BANKER 🟨⚽", image: "shorts-4", isNew: false },
  { title: "CITY SHOULD ROLL 🔥⚽", image: "shorts-5", isNew: false },
  { title: "NO CLEAN SHEETS HERE 🚫⚽", image: "shorts-6", isNew: false },
];

// Helper to build the 6 cards of a show row from 3 unique thumbnails.
function episodes(title, prefix, timestamps, durations) {
  const order = [1, 2, 3, 1, 2, 1];
  return order.map((n, i) => ({
    title,
    image: `${prefix}-${n}`,
    timestamp: timestamps[i],
    duration: durations[i],
  }));
}

export const shows = [
  {
    name: "The NBA Show",
    avatar: "avatar-nba",
    episodes: episodes(
      "Knicks vs Spurs NBA Finals Game 5 – NBA Expert Picks, Predictions & Best Bets",
      "show-nba",
      ["3 weeks ago", "2 weeks ago", "5 days ago", "4 weeks ago", "6 days ago", "2 weeks ago"],
      ["30:25", "30:37", "30:48", "31:02", "31:15", "31:29"],
    ),
  },
  {
    name: "The NFL Show",
    avatar: "avatar-nfl",
    episodes: episodes(
      "NFL Wild Card Predictions | Playoff Picks, Odds & Best Bets",
      "show-nfl",
      ["3 weeks ago", "1 week ago", "4 days ago", "3 weeks ago", "2 weeks ago", "5 days ago"],
      ["31:41", "31:52", "32:05", "32:18", "32:30", "32:46"],
    ),
  },
  {
    name: "The Champions League Show",
    avatar: "avatar-champions",
    episodes: episodes(
      "Champions League Semifinals | Soccer Predictions & Best Bets",
      "show-champions",
      ["1 week ago", "3 weeks ago", "4 weeks ago", "2 weeks ago", "6 days ago", "3 weeks ago"],
      ["33:03", "33:17", "33:29", "33:45", "34:00", "34:11"],
    ),
  },
  {
    name: "The Premier League Show",
    avatar: "avatar-premier",
    episodes: episodes(
      "Premier League Picks Matchday 38 | Soccer Predictions & Betting Analysis",
      "show-premier",
      ["1 week ago", "5 days ago", "4 weeks ago", "2 weeks ago", "3 weeks ago", "1 week ago"],
      ["34:26", "34:39", "34:52", "35:07", "35:20", "35:32"],
    ),
  },
  {
    name: "The NCAAB Show",
    avatar: "avatar-ncaab",
    episodes: episodes(
      "Round of Four D1 Men's College Basketball Preview | College Basketball Picks for April 4th",
      "show-ncaab",
      ["6 days ago", "2 weeks ago", "3 weeks ago", "4 weeks ago", "5 days ago", "1 week ago"],
      ["35:46", "36:00", "36:14", "36:27", "36:39", "36:50"],
    ),
  },
];

// Mobile-only "coming up next" promo card shown under Shorts.
export const upNext = {
  eyebrow: "Don't miss this week",
  titleTop: "THE EPL",
  titleHighlight: "PREDICTIONS",
  titleBottom: "SHOW",
  countdown: { d: "4d", h: "23h", m: "40m" },
  footer: "Friday 8:00 PM ET · live from the desk",
  image: "upnext-bg",
};

export const community = [
  { label: "Telegram", icon: "social-telegram" },
  { label: "X", icon: "social-x" },
  { label: "YouTube", icon: "social-youtube" },
  { label: "TikTok", icon: "social-tiktok" },
];
