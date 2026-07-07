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

## Git commits — NEVER commit, only supply messages (always active)

The user commits and pushes **manually**. The agent must **never run `git commit` / `git add` / `git push`** on its own — only supply commit messages.

### THREE separate git repos (not one)

| Repo | Location | Deploys to |
|---|---|---|
| Whole project | `C:\manmadha\Student-project\.git` (root) | — (dev/meta only) |
| Frontend | `FrontEnd\.git` | Vercel |
| Backend | `Student-BackEnd\.git` | Render |

`FrontEnd/` and `Student-BackEnd/` are **their own repos** with their own remotes — a commit in the root repo does NOT put changes in the deploy repos. Check each with `git -C <folder> status`.

### When the user asks to commit

1. Ask/confirm **which repo** (root / frontend / backend) — the user will name the exact one.
2. Run `git -C <that repo> status` to see **actual** staged + unstaged changes.
3. **Only if there are real changes** (staged or unstaged), provide a ready-to-paste commit message.
4. If `git status` shows nothing, just say **"nothing to commit"** — do **NOT** reconstruct changes from what the agent edited this session. The user often stages/commits manually without the agent, so the agent's edit memory is unreliable; **git status is the only source of truth**.

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
