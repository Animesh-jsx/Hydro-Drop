## 2024-04-24 - [Scroll Event Listener Optimization]
**Learning:** Unoptimized scroll event listeners that update React state can block the main thread and cause scroll jank. Always wrap state updates with `requestAnimationFrame` and use `{ passive: true }` to avoid blocking scrolling.
**Action:** Apply this pattern to all global scroll event listeners in React applications.
