## 2024-05-24 - Throttling React Scroll Listeners
**Learning:** Adding naive `window.addEventListener('scroll', handler)` in React components can cause excessive re-renders and potential memory leaks if not cleaned up properly, leading to janky performance during scroll.
**Action:** Always use `requestAnimationFrame` with a `ticking` flag to throttle scroll event state updates, apply `{ passive: true }` to the event listener, and explicitly capture and clear the `frameId` (`cancelAnimationFrame`) in the cleanup function.
