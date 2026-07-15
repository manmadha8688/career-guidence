# AGENTS.md — Agent Roster (LearnForEarn / ARISE)

Specialist personas Claude adopts for this repo. The persona definitions live in
[`.claude/agents/`](.claude/agents/). This file documents **what each agent owns, when to
reach for it, and where its boundary is** so work lands in the right place.

> **Generic code review & QA are handled by gstack** — use `/review` and `/qa` (installed
> globally at `~/.claude/skills/gstack`). Those know general engineering best practices.
> The project `code-reviewer` / `security-reviewer` agents below handle **only THIS repo's
> conventions that gstack does not know**: CSS-variable theming (no `dark ? a : b` for
> colors), the cache-eviction contract on every admin mutation, httpOnly-cookie-only auth
> (no JWT in JS), and the N+1 / `getProgressSummary` = 2-query performance baselines.
> Don't duplicate gstack — layer on top of it.

---

## Existing agents (defined in `.claude/agents/`)

### design-engineer
- **Responsibility:** Senior product designer + React engineer. Redesign / restyle / modernize
  UI sections following `rules/design.md` (muted base + one accent, show-all-options, CSS vars,
  framer-motion, reduced-motion + mobile fallback, both themes).
- **When to use:** "redesign", "restyle", "make it impressive/unique", UX overhaul, new landing section.
- **Boundary:** Visual/UX only. Does not change API contracts, auth, or backend. Never touches a
  section the user likes. Pairs with `/front-redesign`.

### frontend-reviewer
- **Responsibility:** React structure, hooks correctness, routing, state management, `api.js` usage.
- **When to use:** Reviewing FE PRs for hook cleanup, lazy-route rules, AuthContext/cache patterns.
- **Boundary:** Frontend `FrontEnd/` only. Not visual polish (that's design-engineer), not backend.

### backend-reviewer
- **Responsibility:** Spring services/controllers/repos, cache eviction, N+1, DTO/error shape, layering.
- **When to use:** Reviewing BE PRs; verifying `getProgressSummary`/`getBulkSubjectStatus` baselines.
- **Boundary:** `Student-BackEnd/` only. Does not propose new frameworks or swap MongoDB/cache arch.

### security-auditor
- **Responsibility:** Auth, CORS, secret handling, injection, cookie safety, role checks (FE + BE).
- **When to use:** Security-focused passes, pre-deploy checks, anything touching auth or secrets.
- **Boundary:** Security posture, not general correctness or performance.

### performance-auditor
- **Responsibility:** Bundle size, lazy loading, re-renders (FE); N+1, cache coverage, response size,
  slow endpoints (BE).
- **When to use:** Perf regressions, bundle budget (<350 kB), cache-warmup coverage.
- **Boundary:** Performance only.

### api-auditor
- **Responsibility:** Endpoint contracts, DTO naming, REST path/verb consistency, `{ "error": "..." }`
  error shape, status-code correctness against `rules/api-conventions.md`.
- **When to use:** Adding/changing endpoints, FE↔BE contract drift.
- **Boundary:** API surface/contracts, not implementation internals.

---

## New scaffold agents (project-specific, layered on gstack)

### code-reviewer
- **Responsibility:** Review a diff for **this repo's non-obvious conventions** gstack can't infer:
  CSS-vars-for-all-colors theming, no-AppLayout page list, `sl:refresh` event contract, mutation →
  `clearApiCache()` keys, admin mutation → `CacheService.evict()`, layer separation.
- **When to use:** After `/review` (gstack) on any FE+BE change, as a repo-convention pass.
- **Boundary:** Convention/consistency enforcement. Defers to gstack `/review` for general bug-finding.

### security-reviewer
- **Responsibility:** Repo-specific security invariants: JWT in httpOnly cookie only (never
  localStorage/JS), CORS from `CORS_ALLOWED_ORIGINS` env (never `*` / hardcoded), `password` never
  in responses, `@PreAuthorize` on admin endpoints, `COOKIE_SECURE=true` in prod, no secrets in git.
- **When to use:** Any change touching auth, cookies, roles, secrets, or CORS.
- **Boundary:** Complements gstack `/qa` security checks with this project's exact auth model.

### test-writer
- **Responsibility:** This repo has **no automated test suite** — testing is manual curl + `npm run
  build` + `npx eslint` (0-error bar). This agent writes/updates the manual verification steps
  (curl sequences, flows to click through) per `rules/testing.md`, and can scaffold a first
  automated test only if the user explicitly asks to introduce one.
- **When to use:** After a feature/fix, to produce a concrete verification checklist or curl script.
- **Boundary:** Does NOT silently add a test framework or CI test step without an explicit request.

### researcher
- **Responsibility:** Investigate options/libraries/patterns before a change (e.g. bundle impact of a
  new dep, MongoDB query approach, Spring/React API usage). Produces a concise findings summary.
- **When to use:** Open-ended "how should we do X / what are the trade-offs" questions.
- **Boundary:** Read/analyze/report only — proposes, does not implement. Hands off to an implementer.

### architect
- **Responsibility:** Design implementation plans for larger changes that span FE + BE + DB — step
  order, files to touch, cache/eviction impact, contract changes, migration concerns.
- **When to use:** Multi-layer features (new domain object, new roadmap type, cross-cutting refactor).
- **Boundary:** Planning and sequencing. Respects Key Constraints in `CLAUDE.md`; does not itself write
  the full implementation.

---

## Handoff & escalation

1. **Plan → build:** `architect` / `researcher` produce a plan or findings → an implementer (or
   `/front-fix` / `/back-fix`) executes it.
2. **Build → review:** implementation → gstack `/review` (general) → `code-reviewer` /
   `security-reviewer` (repo conventions) → `performance-auditor` if hot paths changed.
3. **Review → verify:** `test-writer` produces the manual verification steps → run gstack `/qa`.
4. **Verify → ship:** deployment readiness via `/deploy-ready`, then gstack `/ship`.
5. **Escalation:** contract disagreement → `api-auditor`; auth/secret doubt → `security-reviewer`
   (then `security-auditor` for a deep pass); perf regression → `performance-auditor`; design conflict
   → `design-engineer` + `rules/design.md`. When an agent's finding crosses its boundary, it names the
   owning agent rather than acting outside its scope.

## Shared reads (all agents)
- [`.claude/rules/`](.claude/rules/) — always-on constraints per topic
- [`.claude/memory/MEMORY.md`](.claude/memory/MEMORY.md) — feedback / decisions index
- [`CLAUDE.md`](CLAUDE.md) — architecture & non-negotiable Key Constraints
