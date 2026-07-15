# PR Standard — LearnForEarn / ARISE

> The pre-merge checklist for this repo. gstack `/review` reads it before signing off.

---

## Every PR must

### Build & quality gate (see [testing-standard.md](testing-standard.md))
- [ ] `npm run build` succeeds in `FrontEnd/`.
- [ ] `npx eslint src` → **0 errors** (pre-existing warnings tolerated, no new ones).
- [ ] Backend compiles: `./mvnw.cmd -q compile` in `Student-BackEnd/`; starts without bean errors if services/controllers changed.

### UI changes
- [ ] Verified in **both light and dark themes** (all colors via CSS vars; gradient text via CSS class).
- [ ] Responsive checked (mobile-first; 360px width sane); reduced-motion honored for new animation.
- [ ] No `AppLayout` added to DashboardPage/QuizPage/QuizResultPage/RoadmapDetailPage; QuizPage still 100vh.

### Data / API changes
- [ ] Admin mutations evict the correct `CacheService` keys (verify immediate re-fetch is fresh).
- [ ] Frontend mutations call matching `clearApiCache(...)`; reads use `withCache`.
- [ ] No N+1 introduced; `getProgressSummary` / `getBulkSubjectStatus` stay 2 DB queries.
- [ ] DTOs never expose `password`; no `email` in public/list responses.

### Security & hygiene (see [security-rules.md](security-rules.md))
- [ ] No secrets in code or committed files; no JWT in JS storage; no `dangerouslySetInnerHTML`.
- [ ] `logout()` still preserves `guest_device_id` + `theme` if auth touched.

## Commit / PR conventions
- Branch off `master` (never commit straight to it). Commit only when the user asks.
- Concise, conventional-ish subject (`feat:`, `fix:`, `refactor:`, `perf:`, `chore:`) describing the change.
- End every commit message with the repo trailer:
  ```
  Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
  ```
- End PR bodies with:
  ```
  🤖 Generated with [Claude Code](https://claude.com/claude-code)
  ```

## gstack pre-PR gate (run in order)
1. `/review` — code review against these rule files.
2. `/qa <staging-url>` — real-browser verification of the affected flow, both themes.
3. `/cso` — only for security-sensitive changes (auth, roles, secrets, data exposure).
4. `/ship` — final gate once the above pass.
