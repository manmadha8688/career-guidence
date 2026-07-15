---
name: documentation
description: How to keep the LearnForEarn/ARISE in-repo knowledge base current — when to update .claude/memory/*.md, which .claude/rules/*.md owns a convention, keeping CLAUDE.md lean (<300 lines), and recording decisions. Use after any architectural change, new convention, or user-provided rule/feedback. gstack /document-generate and /document-release own release docs; this is about the internal knowledge base.
---

# Documentation — LearnForEarn / ARISE

This project keeps its own knowledge base under `.claude/` and a persistent memory index.
Keeping it current is a **standing instruction**: whenever the user gives a new rule, command,
fact, decision, or feedback — persist it immediately, don't leave it only in conversation.

## Where each kind of knowledge lives
| What changed | Write it to |
|---|---|
| A convention/constraint (frontend, backend, db, security, perf, api, design) | the matching `.claude/rules/*.md` |
| A new command / workflow | `.claude/commands/*.md` |
| A durable project fact, progress, or "how we did X" | a `.claude/memory/*.md` file + add a one-line entry to `memory/MEMORY.md` index |
| Behavior feedback / a correction the user made | `.claude/memory/feedback_*.md` (grouped by topic) |
| Design/UX preference | `.claude/rules/design.md` + `.claude/memory/feedback_design.md` |
| Agent behavior | `.claude/agents/*.md` |
| Env var / deploy config | `.claude/skills/deployment/deploy-config.md` |
| An architectural fact worth surfacing every session | also reflect in `CLAUDE.md` |

## Memory index discipline
`.claude/.../memory/MEMORY.md` is the index read first each session. Every memory file must have
a corresponding one-line bullet there (`[Title](file.md) — one-line summary`). When you add or
materially change a memory file, update its index line too. Keep summaries specific and factual
(IDs, counts, file paths, what's done vs pending) — these are load-bearing, not prose.

## Rules files
`.claude/rules/*.md` are always-on constraints, not tutorials. When a convention changes, edit
the single owning file (see table) — don't scatter the same rule across several. `rules/README.md`
lists the file→scope mapping. Redesign lessons and hard-won corrections go in `rules/design.md`
section 10 and `memory/feedback_design.md`, not duplicated elsewhere.

## Decisions
Record notable architectural/product decisions (with the why and date) in
`.claude/memory/decisions.md` — create it if absent and index it in MEMORY.md. A decision entry
should capture: what was decided, the alternative rejected, and the reason, so future sessions
don't relitigate it.

## CLAUDE.md hygiene
CLAUDE.md is the every-session brief — keep it **lean (< 300 lines)** and architectural. Put
detail in rules/memory/skills and link to it. Add to CLAUDE.md only facts that must be known
before touching the code (identity, architecture, hard constraints, env vars, run commands).
Don't let progress logs or one-off notes accumulate there — those belong in memory files.

## What this skill is NOT
Release notes, changelogs, and generated end-user docs are handled by gstack
`/document-generate` and `/document-release`. This skill governs only the **in-repo knowledge
base** that teaches Claude how this codebase works.
