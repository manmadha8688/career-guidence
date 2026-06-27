# ARISE — LearnToEarn Career Learning Platform

A Solo Leveling–inspired learning platform helping freshers and college students build job-ready tech skills through structured roadmaps, concept-by-concept learning, coding challenges, AI tools, real-world missions, and deployment guides.

---

## Features

- **Skill Arena** — Hunter-ranked learning system. Study concepts, pass trials, earn XP and badges.
- **Dungeon Gates** — Subject-level gates with 10–30 concepts each. Complete all skills to unlock the gate trial.
- **Hunter Paths** — Full career roadmaps (Full Stack, MERN, Python, Frontend). Structured gate sequences.
- **Code GYM** — LeetCode-style coding problems across 5 tracks: Start Coding, Logic Building, Skill Up, Interview Prep, Scenario Coding.
- **Mission Board** — Real-world project missions with objectives, hints, and approach guidance.
- **AI Lab** — Curated directory of 89 AI/ML tools across 14 categories with usage guides.
- **Deployment Guides** — Step-by-step free-tier deployment for 20+ stacks (React, Django, Node, MERN, FastAPI, Flask, Spring Boot, ML models, databases).
- **Fresher Guide** — Honest career guidance: market realities, role comparisons, AI impact, learning paths.
- **Walk-Ins** — Community job board for walk-in interview postings.
- **Report System** — Users can flag wrong content, missing questions, or broken features.
- **Dark/Light Theme** — CSS variable system with animated sky-canvas theme transitions.
- **Guest Mode** — Explore without registration; device-linked guest sessions.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 8 |
| Routing | React Router v6 |
| Styling | CSS Variables (custom design system, 4000+ lines) |
| Animation | Framer Motion (AI Lab hero), CSS keyframes |
| 3D | Spline (AI Lab robot, lazy-loaded) |
| Icons | Lucide React |
| API client | Axios with sessionStorage cache layer |
| Notifications | react-hot-toast |
| Auth | httpOnly cookie sessions (no JWT in localStorage) |
| State | React Context API (AuthContext + ThemeContext) |
| Backend | Spring Boot + MongoDB (separate repo: `Student-BackEnd/`) |
| Deploy | Vercel (SPA rewrite pre-configured) |

---

## Architecture Decisions

**CSS Variables over Tailwind** — The design system lives entirely in `src/styles/global.css` as CSS custom properties (`--primary`, `--bg-card`, etc.). Theme switching toggles `data-theme` on `<html>`, swapping all variables at once for instant transitions without component re-renders.

**Session-storage API cache** — All API calls route through a cache layer in `src/api/api.js`. Each endpoint has a TTL (30s–10min). Cache keys are invalidated on mutations. Reduces backend load and makes navigation feel instant.

**Route-level lazy loading** — Every page component loads via `React.lazy()`. Main bundle is ~316 kB; pages load on demand, reducing initial parse time by ~80%.

**Per-guide data splitting** — Deployment guide data (originally 15k lines in one file) is split into 20 individual guide files in `src/pages/deployment/guides/`. Each guide page loads only its own ~500–1200 lines instead of the full dataset.

**Component extraction** — `DashboardPage.jsx` was split from 2,600+ lines into 12 focused components under `panels/`, `modals/`, and `mobile/` subdirectories.

**httpOnly cookies** — Auth tokens never touch localStorage or sessionStorage. The backend sets an httpOnly cookie; React uses `withCredentials: true` on all requests.

---

## Local Setup

```bash
# 1. Clone and install
cd FrontEnd
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local — set VITE_API_URL to your backend URL

# 3. Start backend first (Spring Boot)
# cd ../Student-BackEnd && mvn spring-boot:run

# 4. Start frontend
npm run dev
# Opens at http://localhost:5173
```

### Available Scripts

```bash
npm run dev       # Vite dev server with HMR
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint check
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes | Backend API base URL |

> All `VITE_` variables are **public** — embedded in the JS bundle. Never store API keys, passwords, or secrets here.

**Development (`.env.local`):**
```
VITE_API_URL=http://localhost:8080/api
```

**Production (set in Vercel dashboard):**
```
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## Project Structure

```
src/
  api/              ← Axios instance + 60+ cached API endpoints
  components/
    loaders/        ← 14 cinematic loader animations (themed per section)
  context/          ← AuthContext (cookie session), ThemeContext (sky animation)
  hooks/            ← useSkyTransition (theme animation), useBodyLock (modal scroll)
  pages/
    auth/           ← LoginPage, RegisterPage (OTP email verification)
    ailab/          ← 89 AI tool pages across 14 categories
    deployment/
      guides/       ← 20 per-guide data files (split from original 15k-line file)
    student-skill-arena/
      panels/       ← ConceptInlinePanel, RoadmapPanel, SubjectPanel, LivePreview
      modals/       ← AboutGateModal, AboutRoadmapModal, InstructionsModal
      mobile/       ← MobileAvatarMenu, MobileStatsPopup, MobileQuestsPopup
    admin-skill-arena/ ← 11 admin CRUD panels
    problem-solving/   ← 5-track coding challenge system
  styles/
    global.css             ← Full design system (~4000 lines, CSS variables)
    landing-animations.css
    pages-animations.css
  utils/            ← slRank.js (XP → rank calculator)
```

---

## Deployment

### Frontend (Vercel)

1. Connect your GitHub repo to Vercel.
2. Set root directory: `FrontEnd`
3. Build command: `npm run build` | Output directory: `dist`
4. Add environment variable: `VITE_API_URL` → your backend URL
5. Deploy — `vercel.json` SPA rewrite is pre-configured:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

### Backend (Spring Boot on Render)

See `Student-BackEnd/` for backend deployment. Free tier on Render — note that the service sleeps after 15 minutes of inactivity and takes ~30s to wake.

---

## Screenshots

> Add screenshots here after first public deployment.

| Screen | Description |
|--------|-------------|
| Skill Arena Dashboard | XP bar, rank badge, dungeon gates grid, daily quests |
| Concept Panel | Video link, explanation tabs, live code preview, quiz CTA |
| AI Lab | 3D Spline robot hero, tool grid with 14 categories |
| Deployment Guides | Filter sidebar, guide cards, step-by-step instructions |
| Mission Board | Role-based, academic, and subject-practice missions |
