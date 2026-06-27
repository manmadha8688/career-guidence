# Frontend Rules — LearnToEarn React App

## Absolute Rules (Never Break)

1. **CSS variables for ALL colors** — `var(--bg-primary)` not `'#0C1020'`
   - Exception: cinematic loaders and auth page left panels use hardcoded dark values (intentional)
   - Gradient text → use `.lp-grad-text` CSS class, never `background-clip: text` inline

2. **No AppLayout on these pages**: DashboardPage, QuizPage, QuizResultPage, RoadmapDetailPage
   - These have their own full-page layouts

3. **QuizPage is 100vh fixed** — never add scrolling

4. **httpOnly cookie only** — never store JWT in localStorage, sessionStorage, or memory
   - Auth state lives in AuthContext only (from /api/auth/me on mount)

5. **`logout()` must preserve** `guest_device_id` and `theme` in localStorage

6. **sl:refresh custom event** must be dispatched from QuizResultPage after a passing score
   - DashboardPage listens for this to re-fetch all user data

## Component Structure Rules

- Pages go in `src/pages/`
- Shared UI components in `src/components/`
- Page-specific sub-components stay co-located:
  - `student-skill-arena/panels/` — complex stateful panels (own API calls)
  - `student-skill-arena/modals/` — overlay modals (useBodyLock)
  - `student-skill-arena/mobile/` — mobile-only overlay UI
- **Hooks** in `src/hooks/` — never inline complex effects in components

## State Management Rules

- **Local state first** — use useState unless state is needed across routes
- **Context only for**: auth (AuthContext) and theme (ThemeContext)
- **No Redux, Zustand, or new context** — project doesn't need it
- **useBodyLock()** for every modal that locks scroll — not inline useEffect
- **Active flag pattern** for async effects where props can change:
  ```js
  useEffect(() => {
    let active = true
    fetch().then(data => { if (active) setState(data) })
    return () => { active = false }
  }, [id])
  ```

## API Call Rules

- All calls go through `src/api/api.js` — never import axios directly in pages
- Use `withCache()` for reads, not for mutations
- Mutations must call relevant `clearApiCache()` keys after success
- The `sl:refresh` event is the signal to bust all user-specific cache keys

## Hooks Rules

- Clean up ALL useEffect side effects (intervals, timeouts, event listeners)
- Never call hooks conditionally or after early returns
- `useBodyLock` goes BEFORE any early return guard in modal components
- Missing cleanup = memory leak = production bug

## Routing Rules

- All route components are `React.lazy()` in App.jsx
- `usePrefetchRoutes()` fires once on idle — do not add more imports without need
- ProtectedRoute: student routes → just `<ProtectedRoute>`, admin → `<ProtectedRoute adminOnly>`
- 404 catch-all → `<NotFoundPage />` (never silent redirect to `/`)

## Naming Conventions

- Pages: `XxxPage.jsx` (e.g., `DashboardPage.jsx`)
- Panels (own state + API): `XxxPanel.jsx`
- Modals (overlay + scroll lock): `XxxModal.jsx`
- Mobile overlays: `MobileXxx.jsx`
- Hooks: `useXxx.js`
- CSS classes: `kebab-case` matching component name prefix (e.g., `.sl-panel`, `.lp-hero`)

## Font System

| Font | Use |
|------|-----|
| Orbitron | Headings, numbers, rank badges, stats |
| Rajdhani | Body text, buttons, labels |
| Share Tech Mono | Code, metadata, monospace labels |
