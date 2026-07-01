---
name: feedback-claude-system-sync
description: Whenever user shares new rules, commands, prompts, memory, or any new information — automatically persist it to the .claude/ system immediately
metadata:
  type: feedback
---

Any new information the user provides must be saved to the right place in the Claude system immediately:

| What user provides | Where to save it |
|---|---|
| New rule or constraint | `.claude/rules/` — appropriate topic file |
| New command or workflow | `.claude/commands/` — new or existing command file |
| New project fact/decision | Memory: `project_*.md` + MEMORY.md index |
| New behavior feedback | Memory: `feedback_*.md` + MEMORY.md index |
| New agent behavior | `.claude/agents/` — relevant agent file |
| Architecture change | `CLAUDE.md` — relevant section |
| New environment variable | `.claude/skills/deployment/deploy-config.md` |

**Why:** User explicitly said "if any rules, memory, commands, prompts and whatever new thing I enter just add as in claude." Every piece of new information must be persisted to the .claude/ structure — never kept only in conversation context.

**How to apply:**
1. New rule → write to `.claude/rules/` AND save memory if behavioral
2. Behavior correction → save feedback memory AND update relevant .claude/ file
3. Project progress → save project memory AND update CLAUDE.md if architectural
4. Do this WITHOUT being asked — proactively persist new info immediately when shared
