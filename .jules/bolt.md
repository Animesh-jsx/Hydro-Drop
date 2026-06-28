## 2024-05-14 - Navbar Scroll Listener
**Learning:** Found a common anti-pattern where a scroll event listener triggers a state update without throttling, which causes excessive re-renders in the layout component (Navbar) when the user scrolls.
**Action:** Always wrap scroll event listeners with requestAnimationFrame and use { passive: true } to prevent blocking the main thread and ensure smoother scroll performance.
