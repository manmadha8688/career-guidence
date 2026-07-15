# Workflow: Code Review

> Two-pass review for LearnForEarn / ARISE: gstack `/review` for generic defects, then the project `/team-review` checklist for this repo's conventions. Run both — they do not overlap.

## Pre-flight
- **gstack must be installed globally** for `/review`. Verify per `CLAUDE.md` if missing.
- `/team-review` is this repo's own command in `.claude/commands/` (backed by the `code-review` and `team-review` skills).

## Pass 1 — gstack `/review` (generic)
Run gstack `/review` on the working diff. This catches language/framework-level bugs, logic errors, race conditions, error handling, resource leaks, and general quality issues. Do not re-do this by hand.

## Pass 2 — project `/team-review` (this repo's conventions)
Run this repo's `/team-review`. It knows the ARISE-specific rules that a generic reviewer misses. Confirm each:

### Theming (both modes)
- [ ] All colors via CSS variables (`var(--bg-primary)`, `var(--ps-card-bg)`, …) — **no** `dark ? colorA : colorB` for backgrounds/text.
- [ ] Gradient text uses `.lp-grad-text` (or existing grad classes), never inline `background-clip: text`.
- [ ] New surfaces verified in **both light and dark** themes (prefer `color-mix` over hard opacity).
- [ ] Section styles live in `src/styles/pages/...`, not dumped into `global.css`.

### Cache eviction
- [ ] Every backend admin mutation calls `CacheService.evict()` for the affected keys — **both** Caffeine + Redis (missing eviction = stale data for all users until TTL).
- [ ] Frontend mutations call `clearApiCache(...)` with the correct keys (see `.claude/rules/api-conventions.md`).
- [ ] New static-ish read data is added to `CacheWarmup.java`; user-specific data is **not** warmed.

### Auth / security
- [ ] **No JWT in localStorage / sessionStorage / React state** — httpOnly cookie only; `AuthContext` is the sole source of truth.
- [ ] Role checks use optional chaining (`user?.role === 'ADMIN'`); backend re-validates with `@PreAuthorize` / SecurityContext — never trust the frontend check alone.
- [ ] No hardcoded secrets/URIs; CORS + JWT secret from env vars.
- [ ] No `dangerouslySetInnerHTML` (the sandboxed iframe code-runner is the only intentional exception).

### Performance / data
- [ ] No N+1 — batch queries (`findByUserId...In`). `getProgressSummary` stays 2 queries; `getBulkSubjectStatus` stays 2 queries.
- [ ] New route is `React.lazy()` in `App.jsx`; prefetch only added if >50% visit likelihood.
- [ ] Subject-list responses stay lightweight; full concept fields only on individual fetch.

### DTO / data exposure
- [ ] Responses use DTOs — `password` never returned, `email` not leaked in public list responses, `AdminStatsDTO.totalGuests` preserved.

### The blank-page gotcha
- [ ] No HTML tags or `${}` template literals inside string values in JSX (causes a blank page under Vite).

### Structural constraints (`CLAUDE.md`)
- [ ] No new separate Subject/Concept/Roadmap pages (everything inline in `DashboardPage`).
- [ ] `DashboardPage`/`QuizPage`/`QuizResultPage`/`RoadmapDetailPage` have no `AppLayout`; `QuizPage` stays 100vh.
- [ ] `sl:refresh` fired from `QuizResultPage` on a passing score; `logout()` preserves `guest_device_id` + `theme`.
- [ ] Controller → Service → Repository layering respected; all FE API via `src/api/api.js`.

## Outcome
Report findings most-severe first. Anything blocking → back to the author before `/qa` and `/ship`. See `.claude/workflows/feature-build.md` / `bug-fix.md` for where this sits in the flow.
