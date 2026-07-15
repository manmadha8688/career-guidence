---
name: architecture
description: The layering and data-flow of LearnForEarn/ARISE — frontend component→api.js→cache→context, AuthContext + 401 interceptor, CSS-var theme; backend Controller→Service→Repository with two-level CacheService + CacheWarmup and admin eviction; the no-AppLayout pages and QuizPage 100vh rule. Read before making cross-layer changes.
---

# Architecture — LearnForEarn / ARISE

Full-stack: React 19 + Vite 8 (Vercel) → Spring Boot 3.3.5 (Render/Docker) → MongoDB Atlas
(`learnData_db`). Brand LearnForEarn, in-app ARISE, Solo Leveling dark-gaming theme.

## Frontend data flow
```
component/page  →  src/api/api.js  →  withCache(key, ttl, fn)  →  sessionStorage hit? return
                                                              →  else axios (withCredentials) → BE
```
- **Never** import axios in a page — everything goes through `src/api/api.js`.
- Reads use `withCache(key, ttl, fn)`; mutations call `clearApiCache(...)` for the affected keys
  (map in `.claude/rules/api-conventions.md`).
- **Auth**: `context/AuthContext.jsx` calls `GET /api/auth/me` on mount (httpOnly cookie).
  200 → `setUser`, 401 → `setUser(null)`. A global 401 interceptor in api.js clears cache and
  redirects to `/login`. AuthContext is the only source of truth for the current user; role
  check is `user?.role === 'ADMIN'`.
- **Theme**: `context/ThemeContext.jsx` toggles dark/light via CSS variables only (plus a sky
  canvas animation). Colors never come from JS ternaries.
- **Routing**: all 56 routes are `React.lazy()` in `App.jsx`; `usePrefetchRoutes()` warms main
  chunks on idle. `ProtectedRoute` guards student routes; `adminOnly` guards admin.

### Layout rules (constraints, not preferences)
- **No `<AppLayout>`** on: DashboardPage, QuizPage, QuizResultPage, RoadmapDetailPage — they own
  their full-page layout (no navbar/sidebar).
- **QuizPage is 100vh fixed** — never introduce scrolling.
- `sl:refresh` custom event: fired by QuizResultPage after a pass; DashboardPage listens and
  re-fetches all user data.
- DashboardPage is the SPA — subjects/concepts/roadmaps render **inline**, there are no separate
  subject/concept/roadmap pages.

## Backend layering
```
Controller  →  Service  →  Repository (MongoRepository)
                  │
                  └── CacheService.get(name, key, supplier)  /  evict / evictAll
```
- Controllers are thin (no business logic), return `ResponseEntity<T>` with correct status,
  admin endpoints guarded by role. CORS is global in `SecurityConfig` (from
  `CORS_ALLOWED_ORIGINS`), never `@CrossOrigin`.
- Services own caching and all mutations **evict immediately** after `save`/`delete`.
- **Two-level cache** (`config/CacheService` + `CacheConfig`): Caffeine L1, Redis L2 (prod only;
  `local` profile is Caffeine-only). Lookup order: Caffeine → Redis → DB, filling upward.
- `config/CacheWarmup.java` pre-fills Caffeine on `ApplicationReadyEvent` for static-ish data:
  subjects, concepts, roadmaps, missions, problems. Never warm user-specific data.
- **N+1 baselines to preserve**: `getProgressSummary` = 2 queries; `getBulkSubjectStatus` = 2
  queries (batch via `findByUserIdAndSubjectIdIn`).

## Backend package map
`com.example.student.{config, model, dto, service, controller, security, repository}`
- `security/JwtFilter` validates the Bearer/cookie token per request.
- `dto/*` shape responses — never expose `password`, nor `email` in public lists.
- `config/DataSeeder` seeds subjects/concepts/missions/problems on startup with `existsBy…` guards.

## XP / rank
XP earned = quiz score × 10; first concept of the day = +50 bonus. Ranks E/D/C/B/A/S computed in
`FrontEnd/src/utils/slRank.js` (thresholds 0/500/1500/3000/6000/10000).

Deeper conventions live in `.claude/rules/{frontend,backend,database,security,performance}.md`.
