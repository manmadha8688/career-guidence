# Architectural Decision Log — LearnForEarn / ARISE

> Why the system is the way it is. Newest-relevant first. Don't re-litigate these without a reason.

## D0 — gstack integration (scaffold)
**Context**: `gstack` was adopted for generic engineering workflow (review, QA, ship, deploy orchestration).
**Decisions**:
- **(a) gstack is a GLOBAL install** at `~/.claude/skills/gstack` — NOT vendored into this repo. The repo's `.claude/` holds only *project-specific* knowledge (rules, memory, project commands). Generic review/QA/ship/deploy behavior comes from the global gstack.
- **(b) Collision audit — no renames needed.** The repo's existing commands (`front-*`, `back-*`, `deploy-ready`, `seed-subject`, `change-check`) were checked against gstack reserved names and do NOT collide. None were renamed; all keep their names.
- **(c) Scaffold added `team-review`** (deliberately NOT `review`, to avoid shadowing gstack's) and a **project `deploy`** command holding the project-specific Vercel + Render logic. gstack's `/land-and-deploy` remains the orchestrator; project `deploy` supplies the platform details.
- **(d) CLAUDE.md reworked** into a lean, gstack-aware entry point. The old detailed command tables were moved into `.claude/commands/` + `.claude/rules/` and this memory. CLAUDE.md points to them instead of duplicating.
**Consequence**: future Claude reads `.claude/memory/*.md` + rules instead of scanning the repo, and inherits generic workflow from global gstack.

## D1 — Two-level cache (Caffeine L1 + Redis L2)
Read-heavy static content (subjects/concepts/roadmaps/missions/problems) is hot and rarely changes. Chose Caffeine (in-process, ~0ms) backed by Redis (shared across instances) via `CacheService`. `CacheWarmup` pre-fills L1 on startup so first requests are fast. Local profile = Caffeine only. **Trade-off**: every admin mutation MUST evict both levels or all users see stale data until TTL.

## D2 — httpOnly cookie JWT auth (no JWT in JS)
JWT stored in an httpOnly `jwt` cookie (24h), never in localStorage/sessionStorage/React state — eliminates XSS token theft. AuthContext derives user solely from `/api/auth/me`. **Trade-off**: hard 24h expiry, no refresh token; revocation handled by `User.tokenVersion` bump. BCrypt strength 12. Google Sign-In verifies ID token server-side; OTP email via Brevo.

## D3 — Frontend-rendered Data Interpretation aptitude
DI questions need charts/tables that are painful to store and render from DB text. Chose to render them as SVG on the frontend (`AptitudeCharts.jsx` + `dataInterpretationData.js`) rather than persist chart markup. Other aptitude categories stay DB-driven. **Trade-off**: DI content changes require a frontend deploy, not an admin edit.

## D4 — CSS-variable-only theming
Dark/light theme is expressed entirely through CSS custom properties; JSX never branches on theme for colors. Prevents flash-of-wrong-theme and keeps one styling source. Gradient text uses shared classes (`.lp-grad-text`). Exceptions: cinematic loaders + auth left panel are intentionally hardcoded dark. **Trade-off**: contributors must add every new surface to both themes' token sets.

## D5 — Everything inline in DashboardPage SPA
No separate subject/concept/roadmap routes — subject → concept → quiz-trial all render inline in the Skill Arena SPA for a seamless "System" feel. Dashboard/Quiz/QuizResult/RoadmapDetail render WITHOUT AppLayout; QuizPage is 100vh fixed. `sl:refresh` event re-syncs dashboard after a quiz pass.

## D6 — Query-count budgets as hard constraints
`getProgressSummary` (2 DB queries) and `getBulkSubjectStatus` (2 DB queries) were optimized down from N+1 patterns. These counts are treated as invariants — regressions here are production-visible on the M0 free Atlas tier.

## D7 — No automated test suite; build+lint+manual as the gate
Chose not to invest in Jest/JUnit. Quality gate = `npm run build` + eslint 0 errors, backend compiles, plus manual/curl flow checks. See `testing-patterns` skill and `.claude/rules/testing.md`. gstack `/qa` used for browser flows.
