# Claude Code System — LearnForEarn / ARISE

Project-specific AI tooling. Entry point: [`CLAUDE.md`](../CLAUDE.md) at repo root.

## Layout

```
.claude/
├── README.md          ← you are here
├── settings.json      ← tool permissions
├── agents/            ← specialist personas (when to use which)
├── commands/          ← slash workflows (/front-fix, /back-audit, …)
├── rules/             ← always-on constraints by topic
├── skills/            ← deep audit & deploy playbooks
├── memory/            ← feedback + project state (read MEMORY.md first)
└── hooks/             ← bash validation
```

## Quick start

1. Read [`CLAUDE.md`](../CLAUDE.md) for architecture + commands table.
2. Read [`memory/MEMORY.md`](memory/MEMORY.md) for feedback index.
3. Pick a command from [`commands/README.md`](commands/README.md) or an agent from [`agents/README.md`](agents/README.md).

## Feedback files (consolidated)

| File | Use when |
|---|---|
| `memory/feedback_design.md` | Redesign, theme, CSS vars |
| `memory/feedback_content.md` | Subjects, missions, questions, seeding |
| `memory/feedback_technical.md` | Cache, 500s, JSX blank page, deploy headers |
| `memory/feedback_auth.md` | Login, OAuth, guest, bots |
| `memory/feedback_workflow.md` | How to persist new rules, audit product gaps |

## Standing rules

- **Persist immediately** — new user rules → correct `.claude/` file (see `feedback_workflow.md`).
- **Design requests** → read `rules/design.md` + `feedback_design.md`, act as `design-engineer`.
- **Minimize scope** — match existing code style; no over-engineering.
