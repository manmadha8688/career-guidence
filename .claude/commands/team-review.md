# /team-review — Project Pre-Merge Review Checklist

Project-specific pre-merge gate for LearnForEarn / ARISE. This **complements** the generic
gstack `/review` — run gstack `/review` for general correctness/quality bug-hunting, then run
`/team-review` for the LearnForEarn-specific invariants that a generic reviewer won't know about.

Scope: only the changed files + their blast radius (use `git diff --stat`), not a full re-audit.

---

## STEP 0 — What changed

```bash
git status
git diff --stat
```

Skip any step below whose area isn't touched by the diff.

---

## STEP 1 — CSS-var theming (both themes)

Every new/changed surface must theme via CSS variables, not JSX conditionals.

```bash
# No hardcoded bg/text hex in JSX (loaders + auth left panel are the only allowed exceptions)
grep -rn "background.*#[0-9A-Fa-f]\{6\}" FrontEnd/src/pages/ --include="*.jsx" \
  | grep -viE "loaders|auth|Landing"
# No dark?A:B inline theme switches for backgrounds/gradient text
grep -rn "dark ?.*background\|theme.*background" FrontEnd/src/pages/ --include="*.jsx" | grep -v "//"
```

- [ ] Backgrounds/text/borders use `var(--bg-primary)`, `var(--text-primary)`, `var(--ps-card-*)`, or `color-mix(...)`
- [ ] Gradient text uses `.lp-grad-text` (or existing grad class) — never inline `background-clip: text`
- [ ] New section styles live under `src/styles/pages/…`, not dumped into `global.css`
- [ ] Verified visually in BOTH light and dark themes

---

## STEP 2 — Cache eviction on admin mutations

Every backend mutation MUST evict the caches it invalidates (missing eviction = stale data for
ALL users until TTL). Every frontend mutation MUST clear the matching `clearApiCache()` keys.

```bash
# Backend: each admin mutation method should call cacheService.evict / evictAll
grep -rn "public .*update\|public .*create\|public .*delete\|save(" \
  Student-BackEnd/src/main/java/com/example/student/service/AdminService.java
grep -rn "cacheService.evict" Student-BackEnd/src/main/java/com/example/student/service/AdminService.java
# Frontend: each mutation in api.js clears cache
grep -n "clearApiCache" FrontEnd/src/api/api.js
```

- [ ] Every service mutation calls `CacheService.evict()`/`evictAll()` for all affected keys immediately after `save`
- [ ] Frontend mutation clears the corresponding keys (see `.claude/rules/api-conventions.md` invalidation map)
- [ ] After admin mutate → immediate refresh shows fresh data (Caffeine + Redis both evicted)

---

## STEP 3 — No JWT in client storage

Auth is httpOnly cookie only. Nothing token-like may touch localStorage/sessionStorage/JS state.

```bash
grep -rn "localStorage\|sessionStorage" FrontEnd/src --include="*.js*" \
  | grep -iE "token|jwt|session|auth" | grep -viE "guest_device_id|theme"
```

- [ ] No JWT/session token in localStorage, sessionStorage, or React state
- [ ] `logout()` still preserves `guest_device_id` and `theme` only
- [ ] `AuthContext` remains the single source of truth (from `/api/auth/me`)

---

## STEP 4 — Lazy routes

```bash
grep -n "^import .*from './pages" FrontEnd/src/App.jsx   # → expect 0 eager page imports
grep -c "lazy(" FrontEnd/src/App.jsx
```

- [ ] Every new page route is `React.lazy()`
- [ ] Admin routes carry `adminOnly` on `ProtectedRoute`
- [ ] Catch-all `*` → `NotFoundPage` (no silent redirect)
- [ ] Prefetch only added for high-traffic routes (not admin / individual guides / individual AI tools)

---

## STEP 5 — No N+1 (hot paths stay batched)

```bash
# These two must NOT gain per-item DB calls
grep -n "repository\.\|findBy" Student-BackEnd/src/main/java/com/example/student/service/ProgressService.java
grep -n "repository\.\|findBy" Student-BackEnd/src/main/java/com/example/student/service/QuizService.java
```

- [ ] `getProgressSummary` stays at 2 DB queries (subjects from Caffeine + one batch badge/progress query)
- [ ] `getBulkSubjectStatus` stays at 2 DB queries
- [ ] No `repository.findByX(...)` inside a loop — batch with `findBy...In(...)`

---

## STEP 6 — DTOs don't leak password/email

```bash
grep -rn "password" Student-BackEnd/src/main/java/com/example/student/dto/
grep -rn "return .*[Uu]ser\b" Student-BackEnd/src/main/java/com/example/student/controller/
```

- [ ] No response ever includes `password`
- [ ] Public/list responses don't leak `email` or guest PII
- [ ] Raw `@Document` model with sensitive fields is not returned directly — map to a DTO

---

## STEP 7 — Quality gate (0 errors)

```bash
cd FrontEnd && npx eslint src 2>&1 | tail -3 && npm run build 2>&1 | tail -5
```
```powershell
cd Student-BackEnd; .\mvnw.cmd clean package -DskipTests 2>&1 | Select-Object -Last 3
```

- [ ] `npm run build` succeeds
- [ ] `npx eslint` → 0 errors (no NEW errors beyond the known baseline)
- [ ] Backend compiles / packages clean

---

## OUTPUT

Per issue: file + line, severity (CRITICAL / HIGH / MEDIUM / STYLE), one-line description, minimal fix.
End with the gate result. If clean: "Pre-merge checks pass. Run gstack `/review` for general correctness if not already done."
