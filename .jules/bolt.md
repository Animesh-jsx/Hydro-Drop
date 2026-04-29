## 2026-04-29 - Scroll Event Optimization
**Learning:** React scroll event listeners can cause significant main thread blocking and jank if state updates are fired continuously during scroll.
**Action:** Always wrap continuous event state updates (like scroll, resize) in `requestAnimationFrame` and use `{ passive: true }` on the event listener to avoid blocking the browser's scroll implementation.
