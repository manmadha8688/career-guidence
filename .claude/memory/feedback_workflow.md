---
name: feedback-workflow
description: Agent workflow — permissions, auto-persist, product suggestions in audits
metadata:
  type: feedback
---

# Workflow & Agent Behavior

---

## Full permissions

User granted full create/edit/delete in `C:\manmadha\Student-project` without per-action confirmation. Proceed directly with changes inside this project.

---

## Auto-persist to `.claude/` (always active)

Whenever the user provides new rules, commands, memory, or project facts — **write to disk immediately**. Never keep only in conversation.

| User provides | Where to save |
|---|---|
| Rule / constraint | `.claude/rules/` (matching topic) |
| Command / workflow | `.claude/commands/` |
| Project fact / architecture | `project_*.md` + `MEMORY.md` + `CLAUDE.md` if architectural |
| Behavior feedback | `.claude/memory/feedback_*.md` (grouped files below) |
| Agent behavior | `.claude/agents/` |
| Env / deploy config | `.claude/skills/deployment/deploy-config.md` |

### Grouped feedback files (use these, not 15 separate files)

| File | Topics |
|---|---|
| `feedback_design.md` | Redesign, theme, CSS vars, page formulas |
| `feedback_content.md` | Subjects, concepts, missions, questions, videos, seeding, guide tone |
| `feedback_technical.md` | Cache, Redis, JSX, CSP, COOP |
| `feedback_auth.md` | Bots, OAuth, guest, admin seed |
| `feedback_workflow.md` | This file — permissions, persist rules, audits |

---

## Product suggestions in audits

Every full audit ends with **product gap analysis**, not just code:

- Missing features for students (e.g. Resume Builder)
- Missing page sections (FAQ, testimonials, sharing)
- UX improvements (SEO, PWA, offline states)

Mark each with effort + value. Use `/change-check` for targeted post-change verification instead of full re-audit.
