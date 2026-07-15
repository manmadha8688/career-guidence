# Project Context — LearnForEarn / ARISE

> Read this to understand *what* the product is and *who* it's for. Facts here are stable.

## Brand & Identity
| Field | Value |
|-------|-------|
| Brand name | **LearnForEarn** |
| In-app name | **ARISE** |
| Theme | Solo Leveling anime — dark gaming "hunter" aesthetic |
| Audience | Indian graduate students, journey framed as **0 → hired** (mostly mobile users) |
| Monetization | **Free** — no paywall, no subscriptions, no ads |
| Frontend live | https://learnforearn.in (Vercel CDN) |
| Backend live | https://learnforearn-wnpp.onrender.com (Render, Docker) |
| Database | MongoDB Atlas — `learnData_db` (M0 free shared cluster) |

## Business Purpose
A free, gamified upskilling platform that takes a fresher from zero to job-ready. Learning is dressed in Solo Leveling vocabulary (see `domain-knowledge.md`) to make grind feel like a game: clear a Gate (subject), rank up, earn XP, collect badges and certificates. The golden test for any surface: *"Would a student screenshot this and send it to a friend?"*

## Product Surface (feature areas)
- **Skill Arena** — the core SPA. Subjects (= "Gates") contain concepts → each concept has a lesson + quiz. Roadmaps (= "Paths") bundle subjects toward a role. Earn subject badges, roadmap badges, certificates. All inline in `DashboardPage` (no separate subject/concept/roadmap pages).
- **Public Profile** — shareable hunter profile at `/u/:username` showing rank, XP, badges, certificates.
- **Problem Solving gym** — 6 tracks (START_CODING, LOGIC_BUILDING, SKILL_UP, CRACK_IT, BUILD_IT, PROVE_IT) of LeetCode-style problems with brute/normal/optimized solutions + live preview.
- **Mission Board** — 55+ real-world/academic/role-based mission briefs with objectives, hints, approach guides.
- **AI Lab** — ~89 curated AI-tool guide pages across 14 categories (agents, apis, automation, builders, career, chatbots, security, …), lazy-mapped.
- **Deployment guides** — 20 per-guide data files + thin wrapper pages.
- **Aptitude** — 4 categories (quant, logical, verbal, data interpretation). Data Interpretation is **frontend-rendered** (SVG charts), not DB text.
- **Career Guidance + Fresher Instructions** — peer-to-peer role guidance (passion fit + AI impact + future outlook per role).
- **Supporting** — Bookmarks, Reports, Feedback, Walk-Ins, Contact/About/Privacy/Terms, Jobs.
- **Admin Skill Arena** — 12 CRUD panels (subjects, concepts, questions, roadmaps, missions, problems, aptitude, users, feedbacks, reports, walk-ins, dashboard).

## XP & Rank (fixed)
XP earned = quiz score × 10. First concept cleared each day = +50 daily bonus.

| XP | Rank | Color |
|----|------|-------|
| 0 | E | #888888 |
| 500 | D | #4ADE80 |
| 1500 | C | #60A5FA |
| 3000 | B | #9B6ED4 |
| 6000 | A | #F59E0B |
| 10000 | S | #EF4444 |

## Related memory
- Vision/history + DB creds + run commands → `project_learnpath.md`
- Feature-specific history → `project_*.md` files (missions, problems, aptitude, roadmaps, ailab, videos, email)
