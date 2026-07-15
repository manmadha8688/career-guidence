# Architecture Boundaries — LearnForEarn / ARISE

> The hard lines gstack `/review` must not let a change cross.
> Structure detail: [frontend.md](frontend.md) · [backend.md](backend.md) · [performance.md](performance.md).

---

## Frontend boundaries
- **Every route is `React.lazy()`** in `App.jsx` — no eager page imports without strong reason. `usePrefetchRoutes()` fires once on idle; only add high-probability routes (never admin / individual guides / individual AI-lab tools).
- **All API access goes through `src/api/api.js`.** No page/component imports axios directly. Reads use `withCache(key, ttl, fn)`; mutations call `clearApiCache(...)`.
- **Auth state lives only in `AuthContext`** (from `/api/auth/me`). No duplicate user state; no JWT anywhere in JS.
- **No `AppLayout`** (no navbar/sidebar) on: `DashboardPage`, `QuizPage`, `QuizResultPage`, `RoadmapDetailPage` — they own full-page layouts.
- **`QuizPage` is 100vh fixed** — never introduce scrolling on it.
- **No separate Subject/Concept/Roadmap pages** — everything is inline in the DashboardPage SPA.
- `sl:refresh` custom event is the single signal for a full dashboard reload (fired by QuizResultPage after a pass); listeners bust user-specific cache.
- Page-specific sub-components stay co-located: `panels/` (stateful, own API), `modals/` (overlay + `useBodyLock`), `mobile/` (mobile overlays).

## Backend boundaries
- **Strict Controller → Service → Repository.** Never skip a layer. Controllers hold no business logic.
- **Services own all caching.** Reads: `CacheService.get(name, key, supplier)`. **Every admin mutation MUST evict** the matching `CacheService` keys immediately after save — missing eviction = stale data for all users until TTL.
- **No N+1.** Batch with `findByUserIdAndSubjectIdIn(...)`, never per-item loops. Two invariants that must NOT regress:
  - `getProgressSummary` stays **2 DB queries** (subjects from Caffeine + one batch badge query).
  - `getBulkSubjectStatus` stays **2 DB queries** (one badges, one progress).
- **Two-level cache**: Caffeine L1 + Redis L2 (Redis only in `prod` profile). Evict both levels on mutation.
- **`CacheWarmup` is for static-ish data only** (subjects, concepts, roadmaps, missions, problems). Never warm user-specific data (progress, quiz status).
- Repositories query only; index `userId` on user-specific collections; paginate/filter large collections — no unbounded `findAll()` on hot paths.

## API contract
- Paths: `/api/{resource}`, `/api/{resource}/{id}`, `/api/{resource}/{id}/{action}`, `/api/admin/*`, `/api/auth/*`.
- Errors always `{ "error": "message" }`. Status codes per [api-conventions.md](api-conventions.md).
- XP = quiz score × 10; first concept of the day = +50 bonus. Ranks E/D/C/B/A/S (fixed thresholds/colors).
