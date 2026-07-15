# /bugfix — Bug Investigation & Fix Flow (gstack-integrated)

The flow for fixing a bug in LearnForEarn / ARISE. Uses gstack global commands for
investigation/review/QA/ship, plus this repo's known failure patterns to speed up root-cause.

---

## The flow

1. **`/investigate`** — reproduce the bug and root-cause it. Get to the actual cause (a specific
   file+line and why), not the symptom. Use the repo pointers below to jump to the likely area.

2. **Fix minimally** — smallest change that addresses the root cause. Don't refactor around it,
   don't gold-plate. Preserve the architecture boundaries in
   `.claude/rules/architecture-boundaries.md`.

3. **`/review`** — gstack correctness review of the fix, then project `/team-review` for the
   LearnForEarn invariants (theming, cache eviction, no-JWT, lazy routes, no N+1, DTO leakage).

4. **`/qa`** — verify the exact flow that was broken is now fixed (and not just masked), both
   themes / mobile width where relevant. Pass a staging URL for browser QA.

5. **`/ship`** — land it (see `/deploy` for the Vercel/Render targets + smoke test).

---

## Repo-specific debugging pointers

Jump straight to the likely cause by symptom:

| Symptom | Likely cause & where to look |
|---|---|
| **401 / 403** | httpOnly cookie not sent (`withCredentials`), `COOKIE_SECURE`/domain mismatch, `CORS_ALLOWED_ORIGINS` not the exact frontend origin, expired/rotated token (tokenVersion), or missing `adminOnly` / `@PreAuthorize`. Check `SecurityConfig`, `JwtFilter`, `AuthContext`. |
| **Stale data after a mutation** | Missing `CacheService.evict()` in the service (Caffeine + Redis), or frontend didn't `clearApiCache()` the right keys, or sessionStorage still holds a cached read. Manual DB edits bypass the sessionStorage cache — clear DevTools session storage to confirm. |
| **Blank page / white screen** | JSX string bug (HTML tags or `${}` template literals inside string values in JSX breaks Vite), a chunk-load failure on a `lazy()` route, or a hook called after an early return. Check the browser console for the chunk/error. |
| **Loading forever** | `.then` without `finally` resetting loading state, a failed fetch with no error branch, or an async effect updating after unmount (missing `active` flag). |
| **Wrong concept / stale panel content** | Race condition — rapid selection without the `let active = true` cleanup pattern in the panel effect. |
| **Theme flips look wrong** | A color set in JSX (`dark ? A : B`) or inline `background-clip: text` instead of a CSS var / `.lp-grad-text`. |
| **Slow API** | New N+1 in a service (query in a loop), or a hot path lost its Caffeine/batch optimization (`getProgressSummary`, `getBulkSubjectStatus` must stay 2 queries). |

---

## Fix acceptance

- [ ] Root cause identified (not just symptom suppressed)
- [ ] `npm run build` + `npx eslint src` → 0 errors; backend compiles
- [ ] The originally-broken flow verified fixed (both themes if UI)
- [ ] No regression to cache eviction / auth / N+1 invariants

---

## OUTPUT

Report: reproduction → root cause (file:line + why) → minimal fix → verification → gate result.
