# Performance Rules

## Frontend

### Lazy Loading (Required)
- Every page in App.jsx MUST be `React.lazy()`
- Never add eager page imports without strong reason
- `usePrefetchRoutes()` runs once on idle — only add new prefetches for frequently visited routes

### Code Splitting Points
- Routes: each page is its own chunk
- AI Lab tools: 89 tool pages via `toolComponents.js` lazy map
- Deployment guides: 20 data files in `guides/` — each page loads only its own

### What Must NOT Be Heavy
- Main bundle target: < 350 kB (currently ~316 kB gzip: 103 kB)
- No new libraries without checking bundle impact first
- If adding a chart/editor/3D library → must be lazy-loaded via dynamic import

### Caching Rules
- All read API calls must use `withCache(key, ttl, fn)` — never call `api.get()` directly
- TTLs: user data (60s), static content (5 min), quiz status (2 min)
- After any mutation: call `clearApiCache()` with relevant keys immediately

### Re-render Prevention
- `React.memo()` only on pure leaf components rendering in large lists (e.g., ConceptVideo)
- `useMemo()` only for expensive derived data (e.g., `computeStats` in DashboardPage)
- Avoid creating objects/arrays in JSX props — define outside render

### Prefetch Strategy
- `usePrefetchRoutes()` in App.jsx uses `requestIdleCallback` to pre-load main page chunks
- Only add routes that have >50% chance of being visited in a session
- Do NOT prefetch: admin pages, individual deployment guides, individual AI lab tools

---

## Backend

### Avoid N+1 Queries
- Never query per item in a loop — batch with `findByUserIdAndSubjectIdIn()`
- `getProgressSummary` must remain O(2 DB queries) — do NOT add per-subject calls
- `getBulkSubjectStatus` must remain 2 DB queries — do NOT revert to per-subject

### Cache Warm-Up
- `CacheWarmup.java` fills Caffeine on startup for: subjects, concepts, roadmaps, missions, problems
- Add any new static-ish data (loaded frequently, changes only on admin mutations) to CacheWarmup
- Never warm user-specific data (progress, quiz status)

### Cache Eviction (Critical)
- Every admin mutation MUST evict the corresponding cache keys
- Missing eviction = stale data for ALL users until TTL expires
- Test: after admin update → immediate refresh should show new data

### MongoDB Query Guidelines
- Index `userId` on all user-specific collections
- Use `Pageable` for admin list endpoints (users, reports, feedbacks)
- Avoid `findAll()` on large collections — always filter by userId or paginate

### Response Size
- Never return full concept list with all fields in subject list endpoint
- Subject list → lightweight (title, icon, color, rank, totalConcepts)
- Concept detail → full fields on individual fetch only

---

## Default quality bar (proven — Jul 2026 perf/quality pass)

> Apply these by default when writing/changing code, without being asked. They are
> the standards the codebase already holds; new code must not regress them.

### Frontend — write it optimized the first time
- **Never declare a component inside another component.** A nested component is a new
  type every render → its whole subtree remounts. Hoist to module scope; wrap list
  leaves in `React.memo` and pass closure values as props.
- **Stable references:** wrap Context/`use*`-hook return objects in `useMemo`, and
  callbacks passed down or into deps in `useCallback`. Never build `{}`/`[]`/config
  objects inline in JSX or context values — hoist consts (e.g. `TOAST_OPTIONS`).
- **Every async effect** uses a mounted guard (`let alive = true` … `return () => { alive = false }`)
  and **clears every timer/interval/listener** in cleanup — including a `setTimeout`
  inside `.finally()`. Guard `setState` behind the flag.
- **`api.js` eviction must cover EVERY mutation**, not just the obvious ones. Enroll /
  pause / resume / any state-changing call evicts the same user caches a quiz pass does
  (`progressSummary`, `hunterStats`, plus the entity key). Missing eviction = stale UI.
- Prefetch heavy/auth-only chunks (dashboard) **only when a session exists** — never for
  logged-out landing visitors. Gate dev-only routes with `import.meta.env.DEV`.

### Backend — write it optimized the first time
- **Bound every history/list query** with `Pageable`; treat `limit <= 0` as a safe
  default (e.g. 50). Never fetch-all-then-trim-in-memory.
- **Cap unbounded request inputs** at the controller and return `400 {"error": "..."}`
  when exceeded (e.g. bulk-status ≤ 50 ids, search query ≤ 100 chars).
- **Scoped repository queries, not `findByUserId(...)` + in-memory `.filter(byField)`.**
  Add a derived finder (`findByUserIdAndSubjectId`) so Mongo does the filtering.
  (Exception: filters a derived query can't express identically, e.g. `hasText` empty-vs-null.)
- **Cache read-heavy endpoints with a short TTL AND evict on every change.** Public
  profile (90s) / hunter stats (60s) via `CacheService.get(name, key, supplier)`; evict
  the key wherever the underlying data mutates (self-update, quiz pass, complete/uncomplete).
- **Don't hit the DB per request for auth.** `UserDetailsServiceImpl` caches the user
  (Caffeine, ~45s) keyed by email and is evicted wherever `tokenVersion` bumps
  (logout, password reset) — preserving the exact revocation check.
- **Move recurring/expensive work off the request path** to `@Scheduled`
  (`@EnableScheduling` is on). Don't run sweeps like walk-in expiry on every public read.
- `CacheService.TTLS` has > 10 namespaces → it must use `Map.ofEntries(...)` (not `Map.of`).
- Indexes: `auto-index-creation` is **disabled**, so `@Indexed`/`@CompoundIndex` are inert —
  every hot-path index MUST be created explicitly in `DataIntegrityMigration.ensureIndexes()`.
- Give outbound `HttpClient` calls (Brevo, GitHub OAuth) connect + request timeouts so a
  slow upstream can't pin a request thread.
