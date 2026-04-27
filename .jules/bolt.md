## 2024-04-27 - Optimize scroll listeners in React
**Learning:** Wrapping React state updates in scroll event listeners with `requestAnimationFrame` alongside a `ticking` flag prevents state updates from happening more often than the browser can paint, avoiding layout thrashing. Adding `{ passive: true }` ensures the browser knows we won't `preventDefault()`, which prevents scroll jank.
**Action:** Always use `requestAnimationFrame` + `ticking` and `{ passive: true }` when tying React state to the `window.scrollY` position.
