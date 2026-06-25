## 2024-03-24 - Throttling React Scroll Listeners

**Learning:** Unthrottled scroll listeners trigger on every tick of the scroll event (which can fire hundreds of times per second). In React, if the listener updates state, this causes severe rendering performance issues. Playwright synthetic scrolling `window.dispatchEvent(new Event('scroll'))` can simulate incredibly fast events to test optimization strategies.

**Action:** When working on scroll-based interactions in React, always wrap state updates in `requestAnimationFrame` with a `ticking` flag, include `{ passive: true }` on the event listener, and remember to track the `frameId` to `cancelAnimationFrame` in the `useEffect` cleanup handler to avoid race conditions when unmounting.
