## 2024-05-16 - Throttling Scroll Event Listeners in React
**Learning:** Attaching standard non-passive scroll event listeners that directly update React state causes significant main thread overhead due to frequent and unnecessary re-renders.
**Action:** Always throttle scroll event state updates using `requestAnimationFrame` with a `ticking` flag, and mark the event listener as `{ passive: true }` to ensure smooth scrolling. Remember to clean up the animation frame `cancelAnimationFrame(frameId)` along with the event listener upon component unmount.
