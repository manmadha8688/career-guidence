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
