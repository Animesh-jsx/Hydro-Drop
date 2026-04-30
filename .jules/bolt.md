## 2024-05-20 - Scroll Event Listener Performance
**Learning:** Attaching standard, non-passive scroll event listeners that update React state can block the main thread, cause multiple unnecessary re-renders, and lead to scroll jank.
**Action:** Always apply `{ passive: true }` to `scroll`, `wheel`, and `touchstart` event listeners to allow the browser to continue scrolling without waiting for the JavaScript event handler. When the scroll event updates React state, throttle the updates using `requestAnimationFrame` with a `ticking` flag to ensure the state update fires at most once per frame.
