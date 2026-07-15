# Repository Map — LearnForEarn / ARISE

> Navigate without scanning. Paths are relative to repo root `C:\manmadha\Student-project\`.

```
Student-project/
  FrontEnd/           ← React app → Vercel
  Student-BackEnd/    ← Spring Boot → Render (Docker)
  CLAUDE.md           ← lean gstack-aware entry point
  .claude/            ← rules/, commands/, agents/, memory/, skills/
```

## Frontend — `FrontEnd/src/`
| Path | What lives here |
|------|-----------------|
| `api/api.js` | THE api layer — axios (withCredentials) + sessionStorage `withCache()` + `clearApiCache()` + 401 interceptor. All calls route through here. |
| `context/AuthContext.jsx` | Only source of truth for current user (from `/me`). Guest device persistence, logout. |
| `context/ThemeContext.jsx` | dark/light toggle, sky canvas animation. |
| `hooks/` | `useBodyLock` (modal scroll lock), `useSkyTransition`, `useModalA11y`, `useAdminSelection`. |
| `App.jsx` | Router — 72 `React.lazy()` routes, `usePrefetchRoutes`, ProtectedRoute wiring. |
| `components/` | Shared UI: `ProtectedRoute`, `GuestRoute`, `AppLayout`, `Sidebar`, `navbars/`, `ErrorBoundary`, `ScrollToTop`, `loaders/` (cinematic), `ReportButton`, `BookmarkButton`, `GlobalSearchOverlay`, `CertificateDocument`, `SiteFooter`, `admin/`. |
| `pages/student-skill-arena/` | Core SPA. `DashboardPage.jsx` (main), `QuizPage`, `QuizResultPage`, `RoadmapDetailPage`; `panels/` (ConceptInlinePanel, SubjectPanel, RoadmapPanel, ConceptVideo, LivePreview, HunterProfileDrawer); `modals/` (AboutGate, AboutRoadmap, Instructions); `mobile/` (avatar menu, nav drawer, quests/stats popups); `dashboard/dashboardUtils.js`; `certificates/CertificateViewPage`. |
| `pages/admin-skill-arena/` | 12 CRUD panels: Subjects, Concepts, Questions, Roadmaps, Missions, Problems, Aptitude, Users, Feedbacks, Reports, WalkIns, Dashboard. |
| `pages/problem-solving/` | Tracks + ProblemDetailPage. |
| `pages/ailab/` | AILabPage, AIToolPage, ToolPageLayout, `aiLabData.js`, 14 category folders (~89 tools). |
| `pages/aptitude/` | AptitudePage + Category/Group/Topic/Questions pages, `AptitudeCharts.jsx`, `dataInterpretationData.js`, `DataInterpretationLesson.jsx`, `di/`. |
| `pages/deployment/` | 20 guide data files + thin wrappers. |
| `pages/auth/` | Login/Register (OTP), password reset, Google Sign-In. |
| `pages/certificates/` | CertificateVerifyPage. Top-level: MyProfilePage, PublicProfilePage (`/u/:username`), Missions, Bookmarks, Career/Fresher pages, About/Contact/Privacy/Terms/Jobs, NotFoundPage. |
| `styles/` | `global.css` (4000+ line design system), `tokens/`, `pages/` (per-feature), `components/`, `*-animations.css`, `mobile.css`, `scrollbars.css`. |
| `utils/slRank.js` | XP → rank calculator. |

## Backend — `Student-BackEnd/src/main/java/com/example/student/`
| Path | What lives here |
|------|-----------------|
| `config/` | `SecurityConfig` (CORS, JWT filter chain, public routes), `CacheConfig` (Caffeine bean; Redis L2 conditional), `CacheWarmup` (pre-warm L1 on startup), `DataSeeder`?* now in DB, `MongoConfig`, `GuestCleanupScheduler`, `DataIntegrityMigration`, `QuizConstants`. |
| `security/` | `JwtFilter` (reads `jwt` cookie, validates + tokenVersion), `JwtUtil`, `UserDetailsServiceImpl`, `LoginAttemptService` (lockout), `RateLimiterService`, `ClientIpResolver`. |
| `model/` | `User`, `Subject`, `Concept`, `Roadmap`/`RoadmapSubject`, `UserConceptProgress`, `UserRoadmapEnrollment`(+Id), `Question`, `QuizAttempt`, `UserSubjectBadge`, `UserRoadmapBadge`, `Certificate`, `Mission`, `ProblemQuestion`, `Bookmark`, `Report`, `Feedback`, `WalkIn`, `LoginEvent`, `UserDailyQuest`, Aptitude* (Group/Topic/Question), Logical/Verbal Topic. |
| `dto/` | Request DTOs (Admin*Request, Register/Login/ResetPassword), response DTOs (AuthResponse, ProgressSummaryDTO, Quiz* DTOs, Subject/Concept/Roadmap DTOs, AdminStatsDTO, Aptitude DTOs). |
| `service/` | `AuthService`, `GoogleAuthService`, `OtpService`, `EmailService`, `SubjectService`, `ConceptService`, `ProgressService` (getProgressSummary 2-query), `RoadmapService`, `QuizService` (getBulkSubjectStatus 2-query), `AdminService`, `AptitudeService`+`AptitudeAdminService`, `CacheService`, `CertificateService`, `ProfileService`, `UsernameService`, `BookmarkService`, `QuestService`, `SearchService`, `FeedbackService`, `WalkInService`, `LoginEventService`. |
| `controller/` | Auth, EmailVerification, PasswordReset, Subject, Concept, Progress, Roadmap, Quiz, Admin, AdminAptitude, Aptitude, Mission, Problem, Profile, Certificate, Bookmark, Search, Feedback, Report, WalkIn, Ping, GlobalExceptionHandler (`{error: msg}`). |
| `repository/` | One `MongoRepository` per collection (Subject/Concept/Question/QuizAttempt/User/Roadmap/… + aptitude repos). Batch queries e.g. `findByUserIdAndSubjectIdIn`. |
| `exception/` | Custom exceptions surfaced by GlobalExceptionHandler. |

*Content (subjects/concepts/missions/problems) now lives in MongoDB, not seeder files.
