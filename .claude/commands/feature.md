# /feature — End-to-End Feature Flow (gstack-integrated)

The full lifecycle for shipping a new feature in LearnForEarn / ARISE. This orchestrates the
gstack global commands with this project's architecture rules and acceptance gate. Use for
anything that adds/changes behavior across the stack.

---

## The flow

1. **`/office-hours`** — clarify the request. Nail down scope, user-facing behavior, which layers
   are touched (FE page? BE resource? both?), and edge cases before writing code.

2. **`/autoplan`** — produce the implementation plan. It should name the exact files (page +
   lazy route + api.js call; model + repo + service + controller + DTO), cache keys to add/evict,
   and any CacheWarmup entry.

3. **Implement** following `.claude/rules/architecture-boundaries.md` (and `/scaffold` for the
   file-by-file mechanics). Non-negotiable while building:
   - Controller → Service → Repository; caching in the Service; cache evicted on every mutation.
   - Frontend: lazy route, api.js + `withCache` for reads, `clearApiCache()` on mutations,
     CSS-var theming, `useBodyLock` for modals, framer-motion + reduced-motion.
   - httpOnly-cookie auth only; no JWT in client storage; DTOs never leak password/email.
   - Keep `getProgressSummary` / `getBulkSubjectStatus` at 2 DB queries.

4. **`/review`** — gstack general correctness/quality review of the diff. Then run project
   `/team-review` for the LearnForEarn-specific invariants (theming both themes, cache eviction,
   no-JWT, lazy routes, no N+1, DTO leakage).

5. **`/qa <staging-url>`** — gstack browser QA of the real user flow on staging (Vercel preview /
   Render). Drive the actual feature end-to-end, both themes, mobile width.

6. **`/cso`** — run ONLY if the feature is security-sensitive (auth, roles, cookies, CORS, user PII,
   file upload, admin endpoints, secrets). Skip for purely presentational changes.

7. **`/ship`** — land it. For the project-specific Vercel/Render deploy targets + smoke test, see
   `/deploy`.

---

## Acceptance gate (must pass before `/ship`)

- [ ] `cd FrontEnd && npm run build` succeeds and `npx eslint src` → 0 errors
- [ ] Backend `.\mvnw.cmd clean package -DskipTests` compiles clean
- [ ] Verified in BOTH light and dark themes (CSS vars, no JSX color switches)
- [ ] Every mutation evicts its cache keys — admin mutate → immediate refresh shows fresh data
- [ ] No JWT in localStorage/sessionStorage; auth still via httpOnly cookie
- [ ] New routes lazy-loaded; admin routes carry `adminOnly`
- [ ] No new N+1 (hot-path summary/bulk-status queries unchanged)

---

## OUTPUT

Summarize: scope agreed → plan → files changed → review/QA findings resolved → gate result.
Do not `/ship` until the acceptance gate is fully green.
