// Tiny event bus for opening the global search overlay. Kept dependency-free and
// separate from GlobalSearchOverlay.jsx so navbars can trigger search WITHOUT
// statically importing the (heavy) overlay — that lets the overlay be lazy-loaded
// in App.jsx and stay out of the navbar/entry chunks.

/** Fire from anywhere to open the search overlay. */
export function openGlobalSearch() {
  window.dispatchEvent(new Event('open-search'))
}
