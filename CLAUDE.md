# LearnForEarn / ARISE — Claude Code Project Guide

> Read this before every session. Contains everything Claude needs to understand this codebase.

## Available Commands

### Frontend (type `/front-xxx`)
| Command | What it does |
|---------|-------------|
| `/front-review` | Full code review — structure, imports, architecture, naming |
| `/front-audit` | Deep production audit — bugs, race conditions, edge cases, auth |
| `/front-optimize` | Performance — bundle size, lazy loading, cache, re-renders |
| `/front-clean` | Dead code — unused imports, orphan files, dead exports, assets |
| `/front-debug` | Debug any UI issue — crash, loading, state, auth, navigation |
| `/front-security` | Security + accessibility — tokens, links, aria-labels |
| `/front-redesign` | Redesign/restyle a section — acts as senior designer + React dev (`design-engineer`) |

### Backend (type `/back-xxx`)
| Command | What it does |
|---------|-------------|
| `/back-review` | Full code review — structure, cache, N+1, security |
| `/back-audit` | Deep production audit — correctness, baselines, edge cases |
| `/back-optimize` | Performance — queries, cache coverage, response size |
| `/back-clean` | Dead code — unused endpoints, orphan methods, stale DTOs |
| `/back-debug` | Debug any API issue — 401/403/500, slow response, stale data |
| `/back-test` | API endpoint testing — full test suite with curl commands |

### Deployment
| Command | What it does |
|---------|-------------|
| `/deploy-ready` | Full deployment readiness check — Vercel + Render, latest limits, env vars, CORS, smoke test |

### Fix Issues
| Command | What it does |
|---------|-------------|
| `/front-fix` | Fix any React issue — crash, blank page, loading, state, quiz, auth, theme, routing, modals |
| `/back-fix` | Fix any Spring Boot issue — 401/403/500, slow, stale data, Atlas, CORS, cache, quiz/XP |

---

## Standing Instruction (Always Active)

**Whenever the user provides any new rule, command, prompt, memory, feedback, or project information — persist it immediately to the correct place in the `.claude/` system. Do not keep it only in conversation context.**

| User provides | Where to write it |
|---|---|
| New rule or constraint | `.claude/rules/` matching topic file |
| New command / workflow | `.claude/commands/` |
| New project fact or decision | Memory file + `CLAUDE.md` if architectural |
| New behavior feedback | Memory `feedback_*.md` |
| Agent behavior update | `.claude/agents/` relevant file |
| New design/UX preference | `.claude/rules/design.md` + `.claude/memory/feedback_design_iterations.md` |
| New env variable or deploy config | `.claude/skills/deployment/deploy-config.md` |

This happens automatically — user does not need to ask.

---

## Design & Redesign (Always Active)

**When the user asks to design, redesign, restyle, modernize, or "make it impressive/unique" — act as the `design-engineer` agent (senior product designer + React developer).**

1. Read `.claude/rules/design.md` → `.claude/memory/feedback_design_iterations.md` first.
2. Follow `/front-redesign` workflow: lock scope → concept → data-driven build → CSS-var styling → motion + mobile + a11y → `npm run build` + both themes.
3. Core defaults: **muted base + one accent**, **show all options** (no scroll-locked single reveal), **no unrequested overlays/CTAs**, **full width when asked**, **reuse existing tokens/components**, and **never touch a section the user likes**.

Supporting files: agent `design-engineer.md`, command `front-redesign.md`, skill `skills/design-audit/`, rule `rules/design.md`.

---

## Project Identity

| Field | Value |
|-------|-------|
| Brand name | LearnForEarn |
| In-app name | ARISE |
| Theme | Solo Leveling anime — dark gaming aesthetic |
| Audience | Indian graduate students (0 → hired) |
| Frontend live | https://learnforearn.in |
| Backend live  | https://learnforearn-wnpp.onrender.com |

---

## Full-Stack Architecture

```
Browser
  │
  ├── React 19 + Vite 8 (Vercel CDN)
  │     ├── Lazy-loaded routes (56 routes, code split)
  │     ├── sessionStorage API cache (TTL 1–5 min)
  │     ├── httpOnly cookie auth (no JWT in JS)
  │     └── Prefetch strategy on idle
  │
  │   HTTPS requests → /api/*
  │
  ├── Spring Boot 3.3.5 (Render — Docker)
  │     ├── SecurityConfig (CORS: CORS_ALLOWED_ORIGINS env)
  │     ├── JWT filter (Bearer token, 24h expiry)
  │     ├── Controllers → Services → Repositories
  │     └── Two-level cache: Caffeine L1 + Redis L2
  │
  │   mongodb+srv://...
  │
  └── MongoDB Atlas (learnData_db)
        ├── users, subjects, concepts
        ├── roadmaps, roadmap_subjects
        ├── user_concept_progress, user_roadmap_enrollments
        ├── questions, quiz_attempts, user_subject_badges
        ├── missions, problems
        └── reports, feedback, walkIns
```

---

## Repository Structure

```
Student-project/
  FrontEnd/              ← React app (this is what ships to Vercel)
  Student-BackEnd/       ← Spring Boot app (ships to Render via Docker)
  CLAUDE.md              ← You are here
  CLAUDE.local.md        ← Local secrets (gitignored)
```

---

## Frontend Structure

```
FrontEnd/src/
  api/api.js             ← Axios + sessionStorage cache + 401 interceptor
  context/
    AuthContext.jsx       ← httpOnly cookie session, guest device persistence
    ThemeContext.jsx      ← dark/light toggle, sky canvas animation
  hooks/
    useSkyTransition.js   ← canvas theme animation
    useBodyLock.js        ← scroll lock for modals (replaces 11 inline patterns)
  components/
    loaders/              ← 14 cinematic loaders (SystemAwakening, DungeonPortal…)
    Navbar, Sidebar, AppLayout, ErrorBoundary, ScrollToTop…
  pages/
    auth/                 ← LoginPage, RegisterPage (OTP email verification)
    ailab/                ← 89 AI tool pages, 14 categories, toolComponents.js lazy map
    deployment/
      guides/             ← 20 per-guide .js data files (split from 15k-line monolith)
      *.jsx               ← 20 thin wrapper components (14–22 lines each)
    student-skill-arena/
      DashboardPage.jsx   ← Main SPA (1014 lines after extraction)
      panels/             ← ConceptInlinePanel, RoadmapPanel, SubjectPanel…
      modals/             ← AboutGateModal, AboutRoadmapModal, InstructionsModal
      mobile/             ← MobileAvatarMenu, MobileStatsPopup, MobileQuestsPopup
    admin-skill-arena/    ← 11 admin CRUD panels
    problem-solving/      ← 5 tracks, ProblemDetailPage, TrackPage
  styles/
    global.css            ← Full design system (CSS vars, 4000+ lines)
    landing-animations.css
    pages-animations.css
  utils/slRank.js         ← XP → rank calculator
```

---

## Backend Structure

```
Student-BackEnd/src/main/java/com/
  config/
    DataSeeder.java          ← Seeds subjects/concepts/missions/problems on startup
    SecurityConfig.java      ← CORS (CORS_ALLOWED_ORIGINS), JWT filter, public routes
    CacheConfig.java          ← Caffeine L1 bean (Redis L2 conditional on prod profile)
    CacheWarmup.java          ← Pre-warms Caffeine from DB on ApplicationReadyEvent
  model/
    User.java                ← role: STUDENT / GUEST / ADMIN
    Subject.java             ← rich fields: overview, whyLearn, prerequisites, outcomes…
    Concept.java             ← examples[], keyPoints[], tip, commonMistakes[]
    Roadmap.java / RoadmapSubject.java
    UserConceptProgress.java ← completedAt, manual uncomplete supported
    UserRoadmapEnrollment.java ← paused boolean
    Question.java / QuizAttempt.java ← xpEarned, dailyBonusEarned
    UserSubjectBadge.java
    Mission.java / Problem.java
  dto/
    AdminStatsDTO.java       ← totalGuests field
    ProgressSummaryDTO.java  ← built by buildProgressSummary()
  service/
    AuthService.java         ← login, guestLogin, register, /me
    SubjectService.java / ConceptService.java
    ProgressService.java     ← getProgressSummary (optimized: <500ms, 2 DB queries)
    RoadmapService.java      ← enroll, pause, resume
    QuizService.java         ← start, submit, getBulkSubjectStatus (2 DB queries)
    AdminService.java        ← CRUD + cache eviction on every mutation
    CacheService.java        ← get(name, key, supplier), evict, evictAll
  controller/
    AuthController.java      ← POST /register /login /guest, GET /me
    SubjectController.java / ConceptController.java
    ProgressController.java  ← GET /summary, /hunter-stats
    RoadmapController.java   ← enroll /pause /resume /enrolled
    QuizController.java      ← start, submit, GET /status, /bulk-status
    AdminController.java     ← all /admin/* endpoints
    MissionController.java / ProblemController.java
    FeedbackController.java / ReportController.java
    WalkInController.java
  security/
    JwtFilter.java           ← validates Bearer token per request
```

---

## Authentication Flow

```
1. POST /api/auth/login { email, password }
   └── Returns JWT in httpOnly cookie (24h expiry)

2. Frontend AuthContext.jsx on mount:
   └── GET /api/auth/me (withCredentials: true)
       ├── 200 → setUser(data) + setLoading(false)
       └── 401 → setUser(null) + setLoading(false)

3. ProtectedRoute.jsx:
   └── while loading → SystemAwakeningLoader
   └── !user → navigate('/login?redirect=...')
   └── adminOnly && user.role !== 'ADMIN' → navigate('/skill-arena/dashboard')

4. Logout:
   └── POST /api/auth/logout (clears httpOnly cookie)
   └── localStorage.clear() (preserves guest_device_id + theme)
   └── clearUserCache() (clears sessionStorage API cache)
   └── window.location.href = '/' (hard reload, clears all React state)

5. Guest Login:
   └── POST /api/auth/guest { guestId? }
   └── Creates GUEST-role user, stores device ID in localStorage
```

---

## API Communication Pattern

All frontend API calls go through `src/api/api.js`:

```js
// Base URL
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

// Every request: withCredentials: true (sends httpOnly cookie)
// 401 interceptor: clears cache + redirects to /login

// Cached read:
withCache('subjects', 2*60_000, () => api.get('/subjects'))

// Mutation (auto-busts cache):
enrollRoadmap(id) → clears roadmap:{id}, roadmaps, enrolledRoadmaps
```

---

## Caching Strategy

### Frontend (sessionStorage, api.js)
| Data | TTL | Cache key pattern |
|------|-----|-------------------|
| Subjects (list) | 2 min | `subjects` |
| Subject (single) | 2 min | `subject:{id}` |
| Concept (single) | 2 min | `concept:{id}` |
| Progress summary | 60 sec | `progressSummary` |
| Hunter stats | 60 sec | `hunterStats` |
| Roadmaps | 5 min | `roadmaps` |
| Roadmap (single) | 5 min | `roadmap:{id}` |
| Quiz status | 2 min | `quizStatus:{type}:{id}` |
| Bulk quiz status | 2 min | `quizStatus:bulk:{ids}` |
| Missions | 30 sec | `missions`, `mission:{id}` |
| Problems | 5 min | `problems:{track}`, `problem:{id}` |

### Backend (Caffeine L1 + Redis L2)
- CacheService.get(cacheName, key, () → DB call)
- Admin mutations call CacheService.evict() immediately
- CacheWarmup pre-fills on startup: subjects, concepts, roadmaps, missions, problems

---

## Performance Strategy

### Frontend
- All 56 routes are `React.lazy()` — code split per page
- `usePrefetchRoutes()` hook fires once on idle (requestIdleCallback), pre-loads main page chunks
- guideData.js (15k lines) split into 20 per-guide files → each deployment page loads only its own data
- DashboardPage (originally 2634 lines) split into 12 components under panels/modals/mobile/

### Backend
- `getProgressSummary`: optimized from 18 DB queries to 2 (subjects from Caffeine, one batch badge query)
- `getBulkSubjectStatus`: 2 DB queries replaces N×M calls (one query for badges, one for progress)
- DataSeeder uses `existsByXxx()` checks to skip re-seeding

---

## XP & Rank System

| XP threshold | Rank | Color |
|---|---|---|
| 0 | E | #888888 |
| 500 | D | #4ADE80 |
| 1500 | C | #60A5FA |
| 3000 | B | #9B6ED4 |
| 6000 | A | #F59E0B |
| 10000 | S | #EF4444 |

XP earned = quiz score × 10. First concept of the day = +50 daily bonus.

---

## Key Constraints (Never Break These)

1. **No separate Subject/Concept/Roadmap pages** — everything is inline in DashboardPage SPA
2. **QuizPage is 100vh fixed** — never adds scrolling
3. **DashboardPage, QuizPage, QuizResultPage, RoadmapDetailPage have NO AppLayout** (no sidebar/navbar)
4. **Theme is CSS variables only** — never use `dark ? colorA : colorB` for backgrounds; use `var(--bg-primary)`
5. **No JWT in localStorage** — auth is httpOnly cookie only
6. **Logout preserves `guest_device_id` and `theme`** in localStorage
7. **Admin routes require `adminOnly` prop on ProtectedRoute**
8. **sl:refresh custom event** triggers full dashboard data reload (fired by QuizResultPage after pass)
9. **All admin mutations must evict backend cache** via CacheService.evict()

---

## Environment Variables

### Frontend (.env.local / Vercel dashboard)
```
VITE_API_URL=http://localhost:8080/api          # dev
VITE_API_URL=https://learnforearn-wnpp.onrender.com/api  # prod
```

### Backend (Render dashboard)
```
MONGODB_URI=mongodb+srv://...@free-database.lfnuahd.mongodb.net/learnData_db
JWT_SECRET=<strong-random-256-bit>
CORS_ALLOWED_ORIGINS=https://learnforearn.in
SPRING_PROFILES_ACTIVE=prod
SPRING_REDIS_URL=redis://***REMOVED***:6379
```

---

## Local Dev Commands

### Backend (PowerShell)
```powershell
$env:JAVA_HOME = "C:\Users\ManmadhaJayamangala\.p2\pool\plugins\org.eclipse.justj.openjdk.hotspot.jre.full.win32.x86_64_21.0.11.v20260515-1531\jre"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
cd C:\manmadha\Student-project\Student-BackEnd
.\mvnw.cmd spring-boot:run
# → http://localhost:8080
```

### Frontend
```bash
cd C:/manmadha/Student-project/FrontEnd
npm run dev
# → http://localhost:5173
```

---

## Test Credentials
```
Admin:   admin@demo.com  / ***REMOVED***
Student: student@test.com / ***REMOVED***
```
