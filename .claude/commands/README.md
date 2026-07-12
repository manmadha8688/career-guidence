# Commands

Type these in Claude Code (e.g. `/front-fix`).

## Frontend

| Command | Purpose |
|---|---|
| `/front-review` | Structure, imports, architecture |
| `/front-audit` | Production bugs, race conditions, auth edge cases |
| `/front-optimize` | Bundle, lazy load, cache, re-renders |
| `/front-clean` | Dead code, orphan files |
| `/front-debug` | Crashes, loading, navigation |
| `/front-security` | Tokens, links, a11y |
| `/front-redesign` | Visual/UX redesign (design-engineer) |
| `/front-fix` | Fix any React issue end-to-end |

## Backend

| Command | Purpose |
|---|---|
| `/back-review` | Structure, cache, security |
| `/back-audit` | Correctness, baselines, edge cases |
| `/back-optimize` | Queries, cache, response size |
| `/back-clean` | Dead endpoints, stale DTOs |
| `/back-debug` | 401/403/500, slow, stale data |
| `/back-test` | curl test suite |
| `/back-fix` | Fix any Spring Boot issue |

## Cross-cutting

| Command | Purpose |
|---|---|
| `/deploy-ready` | Vercel + Render env, CORS, smoke test |
| `/change-check` | Targeted verification after a small change |

## Content / Curriculum

| Command | Purpose |
|---|---|
| `/seed-subject` | Bring a subject to full parity: audit+enrich, 20 questions/concept, 3 tricky/concept |

## Fix commands first

For user-reported bugs, prefer `/front-fix` or `/back-fix` before running a full audit.
