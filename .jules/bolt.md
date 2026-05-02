## 2026-05-01 - Throttled Scroll Listeners with Passive Flag
**Learning:** Found an unthrottled scroll event listener in `src/components/layout/Navbar.tsx` driving a React state update for a visual effect. In high-frequency events like scrolling, updating state unconditionally can lead to frame drops.
**Action:** Always throttle scroll-based state updates using `requestAnimationFrame` and a `ticking` lock flag, and apply `{ passive: true }` when calling `addEventListener` to offload work from the main thread.
