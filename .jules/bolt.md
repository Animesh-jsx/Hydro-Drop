## 2024-05-08 - [Navbar Scroll Performance Optimization]
**Learning:** React scroll event listeners can trigger state updates on every scroll pixel, severely impacting main-thread performance.
**Action:** Throttle state updates using `requestAnimationFrame` with a `ticking` flag, apply `{ passive: true }` to the event listener, and explicitly capture the `frameId` to cancel it (`cancelAnimationFrame`) in the cleanup function to prevent race conditions and memory leaks.
