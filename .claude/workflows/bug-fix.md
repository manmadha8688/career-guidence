# Workflow: Bug Fix

> Repeatable flow for diagnosing and fixing a defect in LearnForEarn / ARISE without over-reaching the change.

## Pre-flight
- **gstack must be installed globally** for `/investigate`, `/review`, `/qa`, `/ship`. Verify per `CLAUDE.md` pre-flight if missing.
- `/bugfix` is this repo's own command in `.claude/commands/` — use it to kick off the guided fix flow; the gstack commands below are the generic phases.
- Branch off `master`; never fix directly on `master`.

## Steps

### 1. Investigate — `/investigate`
Run gstack `/investigate` to find the root cause (not just the symptom). Feed it the exact error, the failing route/endpoint, and reproduction context.

### 2. Reproduce first
Confirm you can trigger the bug locally before changing anything.
- Frontend: `cd FrontEnd && npm run dev` (5173/5174).
- Backend: set Java 21 `JAVA_HOME`, then `cd Student-BackEnd && ./mvnw.cmd spring-boot:run` (8080).
- Reproduce the exact user action. A fix you can't first reproduce is a guess.

### 3. Repo-specific triage
Match the symptom to the usual cause in this codebase:

| Symptom | Likely cause | Where to look |
|---|---|---|
| **401 / 403** | httpOnly cookie not sent, CORS origin mismatch, or `tokenVersion` bumped/mismatched | `api.js` (`withCredentials: true`), `SecurityConfig` (`CORS_ALLOWED_ORIGINS`), `JwtFilter`, `AuthService` token version; `COOKIE_SECURE`/domain in prod |
| **Stale data after a change** | missing backend cache eviction on the mutation, OR frontend sessionStorage cache not cleared | Service mutation must call `CacheService.evict()` (both levels); FE mutation must `clearApiCache(...)` the right keys (see `.claude/rules/api-conventions.md`). Dev tip: clear DevTools sessionStorage to see fresh data |
| **Blank page / white screen** | JSX string gotcha — HTML tags or `${}` template literals inside a string value in JSX; OR a lazy chunk failed to load | Search the changed JSX for embedded tags/template literals in string props; check the browser console for chunk-load errors and `ErrorBoundary` |
| **Wrong redirect after login** | role routing | `ProtectedRoute` (`adminOnly`), post-login navigate logic |
| **Quiz XP / badge wrong** | daily-bonus detection uses `takenAt`, not completion date | `QuizService`, `quiz_attempts` |
| **Progress endpoint slow** | someone reintroduced per-subject DB calls | `getProgressSummary` (keep 2 queries), `getBulkSubjectStatus` (keep 2 queries) |

### 4. Minimal fix
Change the smallest thing that fixes the root cause. Do not refactor unrelated code, do not "improve" nearby sections, do not touch a UI section the user likes. Preserve the hard constraints in `CLAUDE.md` (no-AppLayout pages, CSS-var theming, cookie-only auth, `sl:refresh` after quiz pass).

### 5. Verify
Per `.claude/workflows/testing.md`:
- Reproduction no longer triggers the bug.
- `npm run build` succeeds; `npx eslint src` 0 errors.
- Backend compiles (`./mvnw.cmd -q compile`) if backend touched.
- If UI: both light + dark themes. If admin mutation: eviction verified.
- If backend: curl the affected `/api/*` endpoint with and without cookie.

### 6. Review — `/review`
Run gstack `/review` on the diff, then this repo's `/team-review` checklist for project conventions (`.claude/workflows/code-review.md`).

### 7. Browser test — `/qa <staging-url>`
Run gstack `/qa <staging-url>` to confirm the fix in a real browser on the exact flow that was broken.

### 8. Ship — `/ship`
Run gstack `/ship` to open the PR describing root cause + fix + how it was verified. Deploy per `.claude/workflows/deployment.md`.

## Done when
- [ ] Root cause identified (via `/investigate`), not just symptom
- [ ] Bug reproduced before the fix, gone after
- [ ] Change is minimal and scoped
- [ ] build + eslint 0 errors; backend compiles if touched
- [ ] Both themes / eviction / curl checks as applicable
- [ ] `/review` + `/team-review` clean; `/qa` passed
