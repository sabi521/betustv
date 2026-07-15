// Inline SVG icons (stroke uses currentColor so they inherit text color).
const svg = (paths, cls = "") =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

export const icons = {
  chevronDown: (c) => svg('<path d="m6 9 6 6 6-6"/>', c),
  chevronUp: (c) => svg('<path d="m18 15-6-6-6 6"/>', c),
  chevronLeft: (c) => svg('<path d="m15 18-6-6 6-6"/>', c),
  chevronRight: (c) => svg('<path d="m9 18 6-6-6-6"/>', c),
  home: (c) =>
    svg('<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>', c),
  arrowRight: (c) => svg('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>', c),
  arrowDown: (c) => svg('<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>', c),
  share: (c) =>
    svg(
      '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/>',
      c,
    ),
  bell: (c) =>
    svg(
      '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
      c,
    ),
  // BellRing (from Figma BellRing.svg — 20x20 viewBox, stroke inherits currentColor).
  bellRing: (c = "") =>
    `<svg class="${c}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.58346 17.4998C8.72294 17.7535 8.928 17.9651 9.1772 18.1125C9.4264 18.2599 9.7106 18.3376 10.0001 18.3376C10.2896 18.3376 10.5738 18.2599 10.823 18.1125C11.0722 17.9651 11.2773 17.7535 11.4168 17.4998M3.33341 1.6665C2.33341 3.08317 1.66675 4.74984 1.66675 6.6665M18.3334 6.6665C18.3334 4.74984 17.6667 3.08317 16.6667 1.6665M5.00008 6.6665C5.00008 5.34042 5.52687 4.06865 6.46455 3.13097C7.40223 2.19329 8.674 1.6665 10.0001 1.6665C11.3262 1.6665 12.5979 2.19329 13.5356 3.13097C14.4733 4.06865 15.0001 5.34042 15.0001 6.6665C15.0001 12.4998 17.5001 14.1665 17.5001 14.1665H2.50008C2.50008 14.1665 5.00008 12.4998 5.00008 6.6665Z"/></svg>`,
};
