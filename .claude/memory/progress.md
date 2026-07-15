# Progress — LearnForEarn / ARISE

> Current state, known limitations, and what's next. Feature-level history lives in the `project_*.md` files.

## Shipped (working in production)
- **Skill Arena core**: subjects (Gates) → concepts → quizzes → XP/rank, subject badges, roadmap (Path) enroll/pause/resume, roadmap badges, certificates.
- **Public profile** at `/u/:username` — rank, XP, badges, certificates, shareable.
- **Certificates** — issue + view + verify (`CertificateVerifyPage`).
- **Auth**: email+password (BCrypt 12), Google Sign-In, guest login, OTP email verification + welcome + password reset (Brevo), login lockout, token revocation via `tokenVersion`.
- **Problem Solving gym** — all 6 tracks seeded (LeetCode-style, 2 examples + brute/normal/optimized + live preview).
- **Mission Board** — 55+ missions across 4 categories.
- **AI Lab** — 89 tools / 14 categories; ~49 rich pages done, ~40 lighter (see `project_ailab_progress.md`).
- **Aptitude** — quant/logical/verbal DB-driven + frontend-rendered Data Interpretation; admin CRUD.
- **Deployment guides** (20), **Career Guidance + Fresher Instructions**, **Bookmarks**, **Reports**, **Feedback**, **Walk-Ins**, global search, cinematic loaders.
- **Admin** — 12 CRUD panels with cache eviction on every mutation.
- **Curriculum seeded**: Python (full), JS/HTML/CSS, React, Node/Express, MongoDB/Mongoose, Django + DRF, plus data-role roadmaps (DA/DS/AI-ML). See `project_*_progress.md`.
- **Perf**: two-level cache + warmup, getProgressSummary/getBulkSubjectStatus 2-query, 72 lazy routes, guide-data split, DashboardPage decomposed into panels/modals/mobile.

## Known limitations
- **No automated test suite** — no Jest/JUnit. Verification = build + eslint + backend compile + manual/curl flows (`testing-patterns` skill, `.claude/rules/testing.md`).
- **Hard 24h session expiry, no refresh token** — user must re-login daily; only mitigation is `tokenVersion` for forced revocation.
- **sharp / asset-gen is a manual devDependency** — image/asset generation is not part of the automated build; run locally when needed.
- **Certificates + email content on public profile require a backend restart to appear** (cache warmup / static data path) — not instantly live after a data change.
- **M0 free Atlas + Render free tier** — cold starts and query budgets matter; do not regress the 2-query paths.
- **~40 AI Lab pages** are still lighter/less-researched than the 49 rich ones.
- **Concept videos**: Django Framework + Django Advanced need redo (reused URLs); Spring Boot + SQL videos pending (see `project_concept_videos.md`).
- **224 pre-existing eslint errors** noted in the June 2026 audit (none from that audit) — see `project_code_audit.md`.

## What's next (near-term)
- Finish remaining AI Lab rich pages (next priority per memory: Bolt.new, v0, Benchmark & Evals).
- Redo Django concept videos; add Spring Boot + SQL videos.
- Continue subject parity via `/seed-subject` (content-pipeline skill): audit+enrich, 20 questions/concept, 3 tricky/concept.
- Enterprise roadmap items — see `project_enterprise_roadmap.md`.
- Address pre-existing lint debt opportunistically.
