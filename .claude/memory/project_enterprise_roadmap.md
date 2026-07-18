---
name: project-enterprise-roadmap
description: Enterprise-readiness roadmap — audit findings (Jul 2026), what was fixed, and prioritized next steps for scale, security, and growth
metadata:
  type: project
---

# Enterprise Roadmap — LearnForEarn / ARISE

Full-stack audit on Jul 6 2026 (security + dead code + production health). Production
(`learnforearn.in` + `learnforearn.onrender.com`) and local both verified healthy.

---

## Health check results

All production endpoints responded correctly:
- Backend: `/actuator/health`, `/api/missions`, `/api/problems`, `/api/walkins`, `/api/public-stats`, `/api/ping` → 200; `/api/subjects`, `/api/roadmaps` → 401 (correct, auth-gated).
- Frontend: `/`, `/about`, `/ai-lab`, `/deployment`, `/problem-solving`, `/missions`, `robots.txt`, `sitemap.xml`, `og-image.png`, `site.webmanifest` → 200.
- No broken links or dead public routes found.

---

## Fixed in this pass

| Area | Change |
|---|---|
| Secrets hygiene | Added root `.gitignore` — ignores `.claude/settings.local.json` (contained live Mongo URI), `CLAUDE.local.md`, `*.local`, `.env*`, keys, cookie/login temp files |
| JWT robustness | `JwtUtil.validateSecret()` fails fast at startup if `JWT_SECRET` missing or < 32 bytes |
| Login DoS | `LoginRequest.password` capped at `@Size(max=72)` (BCrypt work-factor abuse) |
| OTP strength | `OtpService` now uses `SecureRandom` instead of `java.util.Random` |
| Utility hygiene | `HashPassword.java` no longer defaults to a real password |
| SEO | Per-route `<title>`, meta description, canonical, OG/Twitter, and robots noindex now sync on every SPA navigation (`App.jsx` `Seo`, `utils/documentTitle.js`) |
| JWT revocation | Per-user `tokenVersion` on `User`, embedded as `ver` claim in the JWT, re-checked in `JwtFilter`; bumped on logout + password reset. Stolen/old tokens die immediately (verified live: post-logout `/me` with old token → 401). Note: logout invalidates all sessions for that user (logout-everywhere). |
| Rate-limit gaps | New `RateLimiterService` (fixed-window, IP+action) applied to `register` (10/h), `guest` new-session (20/h), `feedback` (10/h). In-memory — move to Redis for multi-instance. |
| Reset enumeration | `/forgot-password` + `/forgot-password/verify-otp` now return uniform responses — no 404 for unknown/guest email. Code only mailed to real non-guest accounts. |

---

## Perf/quality pass — Jul 2026 (15 fixes, build + backend compile green, 0 visual/behavior change)

Standards distilled from this pass now live in `rules/performance.md` ("Default quality bar") + `rules/code-style.md` ("Code hygiene") — apply them by default; don't re-flag.

| # | Area | Change |
|---|---|---|
| 1 | FE re-render | `GateCard` hoisted out of `DashboardPage` to module scope + `React.memo`; closure deps passed as props |
| 2 | FE prefetch | Dashboard chunk prefetch gated behind `isAuthenticated` (App.jsx) |
| 3 | FE alloc | `TOAST_OPTIONS` hoisted to module scope |
| 4 | FE alloc | `useLandingPage` return object `useMemo`'d; `handleEnter`/`handleGuest` `useCallback`'d |
| 5 | FE dead code | Removed unused exports (`slRank`, `documentTitle`, `reportTypes`) |
| 6 | FE safety | `/loader-demo` gated to `import.meta.env.DEV` |
| 7 | BE observability | `GitHubAuthController` logs the swallowed OAuth exception |
| 8 | BE auth perf | `UserDetailsServiceImpl` 45s Caffeine user cache; evict on logout + reset |
| 9 | BE bounds | `/api/quiz/history` uses `Pageable` (limit ≤ 0 → 50); no in-memory trim |
| 10 | BE bounds | bulk-status capped at 50 ids, concept search at 100 chars → 400 |
| 11 | FE cache | `api.js` enroll/pause/resume also evict `progressSummary` + `hunterStats` |
| 12 | FE leaks | mounted-guard + `clearTimeout` cleanup in `TrackPage` + 4 aptitude pages |
| 13 | BE off-path | `WalkInService.expirePastWalkIns` → `@Scheduled(1h)`, off the read path |
| 14 | BE query | `SubjectService.getSubjectDetail` uses scoped `findByUserIdAndSubjectId` |
| 15 | BE cache | short-TTL `publicProfile` (90s) + `hunterStats` (60s) with targeted eviction |

---

## HIGH priority — do next (not yet applied; need product/UX decisions)

1. **Rotate exposed credentials.** The Mongo password and admin passwords appeared in
   tracked docs / local config. Rotate Atlas DB password + `JWT_SECRET`, then redact
   `CLAUDE.md` real credentials to placeholders. (History rewrite if repo ever public.)
   NOTE: rotating `JWT_SECRET` in prod invalidates all live sessions (acceptable).
2. **Trusted-proxy IP.** `X-Forwarded-For` is trusted blindly — only trust it behind
   Render's proxy (Spring `ForwardedHeaderFilter`). Relevant now that the new rate
   limiter keys on client IP — a spoofed header could evade or poison it.

## MEDIUM

6. **Validated DTOs** for raw `@RequestBody` endpoints: walk-ins, feedback, OTP flows,
   admin mission/problem create/update.
7. **Walk-in authorization** uses manual `user.getRole()` checks — move under
   `/api/admin/walkins` with `@PreAuthorize("hasRole('ADMIN')")`.
8. **Tighten CSP** — `vercel.json` allows `unsafe-inline`/`unsafe-eval`; move toward
   hashes/nonces.
9. **Remove `Authorization: Bearer` fallback** in prod profile (cookie-only).
10. **Dead API surface** (certain, verified no frontend caller): `GET /subjects/search`,
    `GET /concepts/search`, `GET /subjects/{id}/concepts`, `GET /roadmaps/enrolled`,
    `GET /quiz/subject/{id}/status`, `GET /walkins/{id}`, `GET /admin/users/{id}/progress`,
    plus their service/repository methods. Keep `POST/DELETE /progress/concept/...` and
    `/api/ping` (documented contract / health probe). Prune after confirming no external
    consumer.

## LOW / ops

11. Add CI: GitHub Dependabot + OWASP dependency-check.
12. Add automated tests (currently ~1 test class) — controller slice tests for auth,
    quiz XP, progress summary.
13. Bundle: `react-spline` + `physics` (~4 MB) already lazy + mobile-gated — fine.

---

## Scalability notes (already strong)

- 56 routes lazy-loaded/code-split; prefetch on idle.
- Two-level cache (Caffeine L1 + Redis L2) with graceful degradation.
- Progress/quiz queries already batched (2 DB queries, not N).
- Stateless JWT auth → horizontally scalable **once** rate-limit + token state move to Redis.

## Growth / product ideas

- Resume Builder (student-requested #1), certificate/badge sharing, public profile SEO,
  leaderboard, streaks/notifications (email digest), PWA offline for guides,
  server-side rendering or prerender for landing/guide pages (better SEO than SPA meta).
