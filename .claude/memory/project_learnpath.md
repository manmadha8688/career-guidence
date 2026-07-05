---
name: project-learnpath
description: Complete project summary — LearnForEarn / ARISE platform. READ THIS FIRST every session.
metadata:
  type: project
---

# LearnForEarn / ARISE — Skills Arena Platform

## App Names
- **Brand / Landing**: LearnForEarn
- **In-app navbar logo**: ARISE
- **Tagline**: "Learn the skills. Earn the job."
- **Theme**: Solo Leveling anime / dark gaming aesthetic
- **Audience**: Indian graduate students — zero to hired

---

## Live URLs
| Service | URL |
|---|---|
| Frontend (Vercel) | https://learnforearn.com |
| Backend (Render) | https://learnforearn-wnpp.onrender.com |

---

## Tech Stack
| Layer | Tech |
|-------|------|
| Backend | Spring Boot 3.3.5, Java 17, Spring Security 6, JWT (jjwt 0.12.3) |
| Frontend | React 19 + Vite 8, pure CSS only (NO Tailwind, NO Bootstrap) |
| Database | MongoDB Atlas (spring-boot-starter-data-mongodb) |
| Auth | JWT httpOnly cookie, 24h expiry |
| Fonts | Orbitron (numbers/headings), Rajdhani (body), Share Tech Mono (labels/mono) |

---

## Deployment
### Frontend — Vercel
- Root directory: `FrontEnd/`
- Build: `npm run build` → `dist/`
- `vercel.json`: SPA rewrites all routes to index.html
- Env vars: `VITE_API_URL=https://learnforearn-wnpp.onrender.com/api`

### Backend — Render
- Root directory: `Student-BackEnd/`
- Runtime: Docker (Dockerfile in Student-BackEnd/)
- Env vars: MONGODB_URI, JWT_SECRET, CORS_ALLOWED_ORIGINS, SPRING_PROFILES_ACTIVE=prod, SPRING_REDIS_URL
- Do NOT set PORT manually — Render injects it

---

## Database (MongoDB Atlas)
```
Database: learnData_db
```

### Collections
- `users` — fullName, email, password (BCrypt), role (STUDENT/GUEST/ADMIN), xp, level, avatarColor
- `subjects` — overview, whyLearn, forWho, prerequisites, outcomes, whatYouWillBuild, difficulty, estimatedHours
- `concepts` — subjectId, title, rank, introduction, explanationSimple, explanationTechnical, syntax, examples[], keyPoints[], tip, commonMistakes[], videoUrl, videoTitle
- `roadmaps`, `roadmap_subjects`
- `user_concept_progress` — userId, conceptId, completedAt
- `user_roadmap_enrollments` — paused boolean
- `questions`, `quiz_attempts` — xpEarned, dailyBonusEarned
- `user_subject_badges`
- `missions`, `problems`
- `reports`, `feedback`, `walkIns`

---

## Rank System
| XP | Rank | Color |
|---|---|---|
| 0 | E | #888888 |
| 500 | D | #4ADE80 |
| 1500 | C | #60A5FA |
| 3000 | B | #9B6ED4 |
| 6000 | A | #F59E0B |
| 10000 | S | #EF4444 |

XP = quiz score × 10 + 50 daily bonus (first concept of day).

---

## Credentials
- Admin: `admin@demo.com` / `***REMOVED***`
- Student: `student@test.com` / `***REMOVED***`

---

## How to Run Locally

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

## Key Routes
| URL | Auth |
|-----|------|
| `/` | Public |
| `/login`, `/register` | Public |
| `/missions`, `/walk-ins`, `/fresher-instructions` | Public |
| `/ai-lab`, `/ai-lab/:category/:toolId` | Public |
| `/deployment/*` | Public |
| `/problem-solving` | Public |
| `/problem-solving/:track`, `/problem-solving/:id` | Required |
| `/skill-arena/dashboard` | Required |
| `/skill-arena/quiz/*`, `/skill-arena/roadmaps/:id` | Required |
| `/admin-skill-arena/*` | ADMIN only |

---

## Key UX Rules (NEVER BREAK)
- No separate Subject/Concept/Roadmap pages — everything inline in DashboardPage SPA
- QuizPage is 100vh fixed — never add scrolling
- DashboardPage, QuizPage, QuizResultPage, RoadmapDetailPage have NO AppLayout
- Theme: CSS variables only — never `dark ? colorA : colorB` for backgrounds
- No JWT in localStorage — httpOnly cookie auth only
- Logout preserves `guest_device_id` and `theme` in localStorage
- sl:refresh event triggers full dashboard reload after quiz pass

---

## Caching Architecture

### Backend — Caffeine L1 + Redis L2
- `CacheService.get(name, key, supplier)` → Caffeine → Redis → DB
- All admin mutations call `CacheService.evict()` immediately
- `CacheWarmup` pre-fills on startup: subjects, concepts, roadmaps, missions, problems

### Frontend — sessionStorage (api.js)
- `withCache(key, ttlMs, fn)` — sessionStorage-backed
- `clearUserCache()` — clears all user-specific keys
- `clearApiCache(...keys)` — targeted clear, supports `prefix:*`
- TTLs: subjects/concepts=2min, roadmaps/missions/problems=5min, progress/stats=60s, quiz=2min

---

## Backend Structure
```
config/     DataSeeder, SecurityConfig (CORS from env), CacheConfig, CacheWarmup
model/      User, Subject, Concept, Roadmap, RoadmapSubject,
            UserConceptProgress, UserRoadmapEnrollment, Question,
            QuizAttempt (xpEarned, dailyBonusEarned), UserSubjectBadge,
            Mission, Problem
service/    AuthService, SubjectService, ConceptService, ProgressService,
            RoadmapService, QuizService, AdminService, CacheService
controller/ AuthController, SubjectController, ConceptController,
            ProgressController, RoadmapController, QuizController,
            AdminController, MissionController, ProblemController,
            FeedbackController, ReportController, WalkInController
security/   JwtFilter
```

## Frontend Structure (after refactor)
```
api/api.js                          ← All API calls + sessionStorage cache
context/AuthContext, ThemeContext
hooks/useBodyLock, useSkyTransition
pages/
  auth/                             ← LoginPage, RegisterPage (OTP flow)
  ailab/                            ← 89 tools, 14 categories
  deployment/
    guides/                         ← 20 per-guide data files (split from monolith)
  student-skill-arena/
    panels/                         ← ConceptInlinePanel, SubjectPanel, RoadmapPanel, HunterProfileDrawer
    modals/                         ← AboutGateModal, AboutRoadmapModal, InstructionsModal
    mobile/                         ← MobileAvatarMenu, MobileStatsPopup, MobileQuestsPopup
  admin-skill-arena/                ← 11 admin CRUD panels
  problem-solving/                  ← 5 tracks
```
