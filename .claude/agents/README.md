# Agents

Specialist personas. Claude adopts these when the matching task appears.

| Agent | Use when |
|---|---|
| [design-engineer](design-engineer.md) | Redesign, restyle, “make it impressive”, UX overhaul |
| [frontend-reviewer](frontend-reviewer.md) | React structure, hooks, routing, state review |
| [backend-reviewer](backend-reviewer.md) | Spring services, cache, queries, API design |
| [security-auditor](security-auditor.md) | Auth, CORS, secrets, injection, cookie safety |
| [performance-auditor](performance-auditor.md) | Bundle size, N+1, cache coverage, slow endpoints |
| [api-auditor](api-auditor.md) | Endpoint contracts, DTOs, error shapes, REST consistency |

## Default behavior

- General fixes → use `/front-fix` or `/back-fix` commands (no agent switch needed).
- Full redesign → **design-engineer** + `/front-redesign` + `rules/design.md`.
- Deep audit → matching `/front-audit` or `/back-audit` skill + relevant agent.

## Shared reads

All agents should respect:

- [`../rules/`](../rules/) — topic constraints
- [`../memory/MEMORY.md`](../memory/MEMORY.md) — feedback index
- [`../../CLAUDE.md`](../../CLAUDE.md) — architecture & non-negotiables
