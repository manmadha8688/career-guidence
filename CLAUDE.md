# LearnForEarn / ARISE — Claude Code Project Guide

> Read this first every session. It is the lean entry point. Deep knowledge lives in
> `.claude/memory/*.md`; project rules in `.claude/rules/*.md`. Generic engineering
> workflows (review, QA, ship, deploy) come from **gstack** (installed globally — see below),
> not from this repo.

**LearnForEarn** (in-app name **ARISE**) is a free, Solo-Leveling-themed learning platform that takes
Indian graduate students from "zero idea" to hired — career roadmaps, subject "gates" with concept
lessons + quizzes, a problem-solving gym, project missions, an AI-tools lab, deployment guides,
aptitude practice, and shareable hunter profiles. Frontend on Vercel (learnforearn.in), Spring Boot
backend on Render, MongoDB Atlas.

---

## Prerequisites — Install gstack once on your machine

This project uses **gstack** for AI-assisted development (code review, QA, security audits, docs, deployment). Every contributor must install gstack **once** on their own machine before using Claude Code on this repo.

**Requirements:** Claude Code, Git, Node.js 18+ ([nodejs.org](https://nodejs.org) LTS). Bun is installed automatically by gstack's setup.

**Windows users:** you must use **Git Bash** (comes with Git for Windows). PowerShell and CMD will NOT work.

### Fastest install — paste this to Claude Code

Open Claude Code (from anywhere on your machine) and paste this exact message:

> Install gstack: run `git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup` then confirm the skills are available by listing `~/.claude/skills/`.

Claude will clone the repo, run setup, and verify. Takes ~60 seconds.

### Manual install

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack
./setup
```

### Verify it works

Reopen this project in Claude Code and type `/office-hours` — if Claude responds with the office-hours flow, gstack is working.

### Update gstack later

Inside any Claude Code session, run `/gstack-upgrade`.

### Troubleshooting

| Problem | Fix |
|---|---|
| `/office-hours` not recognized | `cd ~/.claude/skills/gstack && ./setup` |
| Windows: `bad interpreter: /bin/bash^M` | `cd ~/.claude/skills/gstack && git config core.autocrlf false && git config core.eol lf && git rm --cached -r . && git reset --hard HEAD && ./setup` |
| `/browse` fails | `cd ~/.claude/skills/gstack && bun install && bun run build` |

---

## Tech Stack

| Layer | Stack |
|---|---|
| Frontend | React 19 + Vite 8, React Router v6 (lazy routes), framer-motion, Axios; deployed on Vercel |
| Backend | Spring Boot 3.3.5 (Java 21), Docker on Render |
| Database | MongoDB Atlas (`learnData_db`) |
| Cache | Caffeine L1 + Redis L2 (`prod` profile) |
| Auth | JWT in httpOnly cookie (24h), BCrypt(12), Google Sign-In, OTP email via Brevo |

## Architecture Summary

- **Frontend** (`FrontEnd/`): all routes `React.lazy()`; API through `src/api/api.js` (Axios + `sessionStorage` cache + 401 interceptor); auth state only in `AuthContext` (from `/api/auth/me`); theme via CSS variables only.
- **Backend** (`Student-BackEnd/`): strict `Controller → Service → Repository`; services own caching via `CacheService`; every admin mutation evicts cache; `CacheWarmup` pre-fills static data on startup.
- **Data flow:** Browser → `/api/*` (CORS from `CORS_ALLOWED_ORIGINS`) → services → Mongo, with a two-level cache in front of read-heavy endpoints.

## Critical Constraints (never break)

1. **CSS variables for all theming** — never `dark ? colorA : colorB` for backgrounds; gradient text via a CSS class, never inline `background-clip`.
2. **No JWT in localStorage/sessionStorage** — httpOnly cookie only; `logout()` preserves `guest_device_id` + `theme`.
3. **No AppLayout** on DashboardPage, QuizPage, QuizResultPage, RoadmapDetailPage; QuizPage is 100vh fixed.
4. **Every admin mutation evicts** the matching `CacheService` keys; keep `getProgressSummary`/`getBulkSubjectStatus` at 2 DB queries.
5. **Every route is lazy**; no new npm dependency without checking bundle impact.
6. Pass bar for changes: `npm run build` + `npx eslint` with **0 errors** (pre-existing warnings tolerated); backend must compile.

## Repository Navigation

```
FrontEnd/            React app → Vercel   (see .claude/memory/repository-map.md)
Student-BackEnd/     Spring Boot → Render (Docker)
CLAUDE.md            you are here
CLAUDE.local.md      personal overrides (gitignored)
.claude/             project knowledge base + rules + workflows (this repo's source of truth)
```

Full per-folder map: [.claude/memory/repository-map.md](.claude/memory/repository-map.md).

## Memory Files (read as needed)

- [project-context.md](.claude/memory/project-context.md) — business purpose, audience, product surface
- [architecture.md](.claude/memory/architecture.md) — full-stack architecture, auth, cache, XP/rank
- [domain-knowledge.md](.claude/memory/domain-knowledge.md) — Solo Leveling vocabulary, data model, gotchas
- [repository-map.md](.claude/memory/repository-map.md) — folder-by-folder guide
- [decisions.md](.claude/memory/decisions.md) — architectural decisions + gstack collision notes
- [progress.md](.claude/memory/progress.md) — current state, known limitations, what's next

## Environment Variables

**Frontend** (`.env.local` / Vercel): `VITE_API_URL`, `VITE_GOOGLE_CLIENT_ID`.
**Backend** (Render): `MONGODB_URI`, `JWT_SECRET`, `CORS_ALLOWED_ORIGINS`, `SPRING_PROFILES_ACTIVE`, `SPRING_REDIS_URL`, `PORT`, `COOKIE_SECURE`, `APP_URL`, `BREVO_API_KEY`, `GOOGLE_CLIENT_ID`.
Secrets never live in source — see [.claude/rules/security-rules.md](.claude/rules/security-rules.md).

## Common Commands

```bash
# Frontend
cd FrontEnd && npm install && npm run dev         # http://localhost:5173
cd FrontEnd && npm run build && npx eslint .       # pre-commit gate (0 errors)

# Backend (Git Bash / PowerShell — set JAVA_HOME to Java 21 first)
cd Student-BackEnd && ./mvnw.cmd spring-boot:run   # http://localhost:8080
```

---

## Available gstack Commands

gstack is installed globally at `~/.claude/skills/gstack`. Use `/browse` from gstack for all web browsing; never use `mcp__claude-in-chrome__*` tools.

- **Planning:** `/office-hours`, `/autoplan`, `/spec`, `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`
- **Review & investigate:** `/review`, `/investigate`, `/codex`
- **Testing:** `/qa <url>`, `/qa-only <url>`, `/browse`, `/open-gstack-browser`
- **Security & docs:** `/cso`, `/document-release`, `/document-generate`
- **Ship & deploy:** `/ship`, `/land-and-deploy`, `/canary`
- **Safety:** `/careful`, `/freeze`, `/guard`, `/unfreeze`
- **Learn & upgrade:** `/learn`, `/gstack-upgrade`

## Recommended Workflow

- **New feature:** `/office-hours` → `/autoplan` → implement → `/review` → `/qa` → `/cso` → `/ship`
- **Routine change:** implement → `/review` → `/qa` → `/ship`
- **Bug fix:** `/investigate` → fix → `/review` → `/qa` → `/ship`

Before every PR (never skip):
- `/review` — bugs CI won't catch
- `/qa <staging-url>` — real browser test
- `/cso` — security audit (if security-sensitive)
- `/ship` — opens PR

---

## Pre-flight — gstack availability check

Before offering the Skill routing menu OR running any gstack slash command, Claude MUST first verify gstack is installed:

```bash
test -f ~/.claude/skills/gstack/setup && echo "gstack_installed" || echo "gstack_missing"
```

- `gstack_installed` → show **Menu A** below
- `gstack_missing` → show **Menu B** below

Install command (used when the user chooses "Install gstack now"):

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup
```

After install, tell the user: "✅ gstack installed. Reopen this project in Claude Code so the new skills are discovered. Then re-ask your original question."

If install fails, report the error, suggest the manual install, and fall back to the normal project approach.

## Skill routing

Before any repository task, Claude must run the Pre-flight check and show the correct menu.

**Menu A — gstack IS installed**
> "Before I start, choose one:
> 1. Use gstack workflow
> 2. Use normal project files / plain Claude approach
> 3. Let Claude recommend the best option first"

**Menu B — gstack is NOT installed**
> "gstack is not installed on your machine. Before I start, choose one:
> 1. Install gstack now (~60 seconds), then use gstack workflow
> 2. Use normal project files / plain Claude approach (no gstack workflows available)
> 3. Let Claude recommend the best option first"

The install option MUST appear on every question until gstack is installed — not just the first time.

**Slash command exception:** if the user types a gstack slash command (`/review`, `/qa`, `/cso`, `/ship`, `/office-hours`, etc.) directly, run the Pre-flight check first. If installed, run the command directly. If not, show Menu B.

Claude must wait for the user's selection before reading files, editing files, or invoking any skill.

### Option 1 (Menu A) — Use gstack workflow

Mappings:
- Product brainstorm / feature ideas → `/office-hours`
- Rough idea to spec → `/spec`
- Scope tradeoffs → `/plan-ceo-review`
- New-feature architecture → `/plan-eng-review`
- Bugs / unexpected errors → `/investigate`
- Test a URL → `/qa` or `/qa-only`
- Diff review before land → `/review`
- Security-sensitive change → `/cso`
- Open a PR → `/ship`
- Deploy / verify prod → `/land-and-deploy`
- Docs update → `/document-release`
- Docs generation → `/document-generate`

### Option 1 (Menu B) — Install gstack now

Run the install command. On success, tell the user to reopen the project. On failure, fall back to Option 2.

### Option 2 — Use normal project files / plain Claude approach

Reading files, explaining code, small edits, typo fixes, one-file updates, basic refactoring, config changes, project Q&A, checking implementation details. Follow `.claude/rules/*.md` and the project's own commands (`/team-review`, `/scaffold`, `/feature`, `/bugfix`, `/deploy`, and the existing `/front-*`, `/back-*`, `/seed-subject`, `/deploy-ready`).

### Option 3 — Let Claude recommend

If gstack installed → recommend between gstack workflow and normal approach. If gstack missing → recommend between installing gstack (for tasks that need it) or normal approach (for small tasks).

---

> **Project vs gstack:** `.claude/` is the source of truth for **project-specific** guidance (this repo's conventions, domain, rules). `~/.claude/skills/gstack/` is the shared toolkit for **generic** workflows (review, QA, ship). The project's own domain commands (`/front-*`, `/back-*`, `/seed-subject`, `/deploy-ready`, `/change-check`) remain available and do not collide with gstack's reserved names.
