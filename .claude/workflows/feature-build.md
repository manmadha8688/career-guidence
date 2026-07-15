# Workflow: Feature Build (New Feature, End-to-End)

> Repeatable flow for shipping a new feature in LearnForEarn / ARISE (React 19 + Vite 8 frontend, Spring Boot 3.3.5 / Java 21 backend, MongoDB Atlas, Caffeine+Redis cache, JWT httpOnly-cookie auth).

## Pre-flight
- **gstack must be installed globally.** The `/office-hours`, `/autoplan`, `/review`, `/qa`, `/cso`, `/ship` commands below are gstack slash commands. If they are missing, install/verify gstack first (see `CLAUDE.md` pre-flight). The `/scaffold` and `/feature` commands are this repo's own commands in `.claude/commands/`.
- Backend runs on Java 21. Set `JAVA_HOME` first (see `CLAUDE.local.md`).
- Work on a branch, never directly on `master`.

## Steps

### 1. Clarify — `/office-hours`
Run gstack `/office-hours` to pin down the problem before writing anything: who the feature is for (Indian grad students, mostly mobile), what "done" looks like, which surfaces it touches (Skill Arena dashboard SPA? admin panel? a new route?).

### 2. Plan — `/autoplan`
Run gstack `/autoplan` for the CEO + engineering + design review of the approach. Confirm it respects the hard constraints in `CLAUDE.md`:
- No separate Subject/Concept/Roadmap pages — everything is inline in `DashboardPage` SPA.
- `DashboardPage`, `QuizPage`, `QuizResultPage`, `RoadmapDetailPage` have **no** `AppLayout`.
- New user-facing visual work follows `.claude/rules/design.md` (muted base + one accent, show all options, both themes) — act as the `design-engineer` agent for redesign-shaped work.

### 3. Scaffold boilerplate — `/scaffold`
Use this repo's `/scaffold` command to generate the boilerplate (page/panel/modal/hook, or backend controller→service→repository triad) so the new code lands in the right folders with the right naming:
- Pages → `FrontEnd/src/pages/`; page-specific sub-components co-located under `panels/`, `modals/`, `mobile/`.
- Backend follows `Controller → Service → Repository` — never skip layers (`.claude/rules/backend.md`).

### 4. Implement
Follow `.claude/rules/architecture-boundaries.md` and the area rules (`frontend.md`, `backend.md`, `database.md`, `security.md`, `performance.md`). Non-negotiables:
- **All colors via CSS variables** (`var(--bg-primary)`), never `dark ? a : b`. Gradient text → `.lp-grad-text` class.
- **All API calls go through `FrontEnd/src/api/api.js`** — never import axios in a page. Reads use `withCache(key, ttl, fn)`; mutations call `clearApiCache(...)` after success.
- **New route → `React.lazy()` in `App.jsx`.** Add to `usePrefetchRoutes()` only if >50% likely to be visited.
- **Auth is httpOnly cookie only** — never store JWT in localStorage/sessionStorage/state.
- **Every admin mutation evicts backend cache** via `CacheService.evict()` (both Caffeine + Redis). Add new static-ish read data to `CacheWarmup.java`.
- **No N+1** — batch with `findByUserId...In(...)`. Don't regress `getProgressSummary` (2 queries) or `getBulkSubjectStatus` (2 queries).
- **DTOs for responses** — never expose `password`, never leak `email` in public list responses.
- Use `useBodyLock()` for modals; clean up every effect (intervals/timeouts/listeners).

### 5. Verify (project acceptance gate)
See `.claude/workflows/testing.md` for the full procedure. Minimum bar before review:
- `cd FrontEnd && npm run build` — succeeds.
- `npx eslint src` — **0 errors** (warnings tolerated).
- Backend compiles: `cd Student-BackEnd && ./mvnw.cmd -q compile` (Java 21).
- UI checked in **both light and dark themes**.
- For admin mutations: **cache eviction verified** (mutate → immediate refresh shows new data).
- New route confirmed lazy-loaded; API confirmed routed through `src/api/api.js`.

### 6. Code review — `/review` then `/team-review`
Run gstack `/review` for generic bugs/quality, then this repo's `/team-review` for project conventions (theming both modes, eviction, no JWT in localStorage, no N+1, no DTO leakage, the JSX-string blank-page gotcha). Details in `.claude/workflows/code-review.md`.

### 7. Real browser test — `/qa <staging-url>`
Run gstack `/qa <staging-url>` to drive the affected flow in a real browser (auth, quiz start→submit→result, admin create→appears in student view).

### 8. Security audit — `/cso` (conditional)
Run gstack `/cso` **only if** the feature is security-sensitive (auth, cookies, roles, CORS, user input, file handling, anything touching tokens or PII).

### 9. Ship — `/ship`
Run gstack `/ship` to open the PR. Then deploy per `.claude/workflows/deployment.md`.

## Acceptance gate (all must pass)
- [ ] `npm run build` succeeds
- [ ] `npx eslint` 0 errors (warnings OK)
- [ ] Backend compiles (Java 21)
- [ ] Both light + dark themes verified for any UI
- [ ] Cache eviction verified for any admin mutation
- [ ] New route added as `React.lazy()` in `App.jsx`
- [ ] All API access via `src/api/api.js` (cached reads, evicting mutations)
- [ ] `/review` + `/team-review` clean; `/qa` passed; `/cso` if security-sensitive
