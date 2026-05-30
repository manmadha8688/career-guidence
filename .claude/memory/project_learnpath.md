---
name: project-learnpath
description: Complete project summary — LearnPath career learning platform. Read this first in every session.
metadata: 
  node_type: memory
  type: project
  originSessionId: f9411e75-fc4a-4f3e-b6d4-e4ed711e7d61
---

# LearnPath — Career Learning Platform

## One-line summary
A learning platform for graduate students: follow career roadmaps → learn subjects → learn concepts one by one → track progress. Built with Spring Boot + React + pure CSS + PostgreSQL.

---

## Vision & Design Goals
- Students learn **concept by concept** with 3 angles per concept: **What is it**, **Why it matters**, **Code example**
- **Visual roadmaps** — not plain text lists, but a visual step-by-step flow diagram showing career path progression
- Two roles: `STUDENT` (learns, tracks) and `ADMIN` (manages all content)

---

## Tech Stack
| Layer | Tech |
|-------|------|
| Backend | Spring Boot 3.3.5, Java 17, Spring Security 6, JWT (jjwt 0.12.3) |
| Frontend | React 18 + Vite, pure CSS only (NO Tailwind, NO Bootstrap) |
| Database | PostgreSQL on Render |
| Auth | JWT, 24h expiry, Bearer token |

---

## Database (Render PostgreSQL)
```
Host     : dpg-d8d7ktpo3t8c73e97db0-a.oregon-postgres.render.com
Port     : 5432
Database : students_k25f
Username : students_k25f_user
Password : YrHhYdmzUynU9eHVqrBjlYmFQ4wBouUz
JDBC URL : jdbc:postgresql://dpg-d8d7ktpo3t8c73e97db0-a.oregon-postgres.render.com:5432/students_k25f?sslmode=require
```

### Tables
- `users` — id, full_name, email, password, role (STUDENT/ADMIN), college_name, avatar_color, is_active, created_at
- `subjects` — id, title, description, icon, color, total_concepts, created_at, updated_at
- `concepts` — id, subject_id (FK), title, content, what_it_is, why_it_matters, code_example, estimated_minutes, order_index
- `roadmaps` — id, title, description, role_target, icon, color, estimated_weeks, is_published, created_at
- `roadmap_subjects` — id, roadmap_id (FK), subject_id (FK), order_index — unique(roadmap_id, subject_id)
- `user_concept_progress` — id, user_id (FK), concept_id (FK), completed_at — unique(user_id, concept_id)
- `user_roadmap_enrollments` — **composite PK** (user_id, roadmap_id), enrolled_at

---

## Admin Credentials
- Email: `admin@demo.com` / Password: `***REMOVED***`

---

## How to Run

### Backend
```powershell
$env:JAVA_HOME = "C:\Users\ManmadhaJayamangala\.p2\pool\plugins\org.eclipse.justj.openjdk.hotspot.jre.full.win32.x86_64_21.0.11.v20260515-1531\jre"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
Set-Location "C:\manmadha\Student-project\Student-BackEnd"
.\mvnw.cmd spring-boot:run
# Runs on http://localhost:8080
```

### Frontend
```powershell
Set-Location "C:\manmadha\Student-project\FrontEnd"
npm run dev
# Runs on http://localhost:5173
```

---

## Project File Structure

### Backend: `C:\manmadha\Student-project\Student-BackEnd\src\main\java\com\example\student\`
```
config/       DataSeeder.java          — seeds admin + 18 subjects + 12 concepts + 5 roadmaps on startup
security/     JwtUtil, JwtFilter, UserDetailsServiceImpl, SecurityConfig
model/        User, Subject, Concept, Roadmap, RoadmapSubject,
              UserConceptProgress, UserRoadmapEnrollment, UserRoadmapEnrollmentId
repository/   UserRepository, SubjectRepository, ConceptRepository,
              RoadmapRepository, RoadmapSubjectRepository,
              UserConceptProgressRepository, UserRoadmapEnrollmentRepository
service/      AuthService, SubjectService, ConceptService,
              RoadmapService, ProgressService, AdminService
controller/   AuthController, SubjectController, ConceptController,
              RoadmapController, ProgressController, AdminController,
              GlobalExceptionHandler
dto/          SubjectDTO, ConceptDTO, ConceptDetailDTO, ConceptSearchDTO,
              RoadmapListDTO, RoadmapDetailDTO, ProgressSummaryDTO,
              AdminStatsDTO, AdminSubjectRequest, AdminConceptRequest, AdminRoadmapRequest
exception/    ResourceNotFoundException
```

### Frontend: `C:\manmadha\Student-project\FrontEnd\src\`
```
api/api.js                   — ALL API calls (named exports)
context/AuthContext.jsx       — user state, login(), logout()
components/
  AppLayout.jsx               — wraps Sidebar + Navbar + main content
  Sidebar.jsx                 — nav links (student & admin views)
  Navbar.jsx                  — top bar with theme toggle (dark/light)
  ProtectedRoute.jsx          — auth guard, adminOnly prop
  ProgressBar.jsx             — reusable progress bar
styles/global.css             — full CSS design system, CSS variables, dark mode
pages/auth/
  LoginPage.jsx               — show/hide password, demo credentials hint
  RegisterPage.jsx            — password strength indicator, confirm password
pages/student/
  DashboardPage.jsx           — welcome card, stats, enrolled roadmaps, subject progress
  SubjectsPage.jsx            — grid with search + filter chips
  SubjectDetailPage.jsx       — concepts list with completion status
  ConceptPage.jsx             — THE KEY PAGE: 2-column layout, code block, ← → keyboard nav, sticky complete bar
  RoadmapsPage.jsx            — roadmap cards with enroll button
  RoadmapDetailPage.jsx       — VISUAL FLOW diagram with step numbers + connectors
pages/admin/
  AdminDashboard.jsx          — stats cards, recent users, top subjects
  AdminUsers.jsx              — paginated table, search, delete
  AdminSubjects.jsx           — CRUD with modal forms
  AdminConcepts.jsx           — filter by subject, CRUD with modal
  AdminRoadmaps.jsx           — CRUD + subjects panel (add/remove/reorder)
```

---

## All API Endpoints

### Auth (public)
```
POST /api/auth/register    → { token, user: { id, fullName, email, role } }
POST /api/auth/login       → { token, user: { id, fullName, email, role } }
GET  /api/auth/me          → { id, fullName, email, role, collegeName, avatarColor, createdAt }
```

### Subjects (authenticated)
```
GET /api/subjects                    → [ SubjectDTO ] with completedCount per user
GET /api/subjects/{id}               → { id, title, description, icon, color, concepts: [...] }
GET /api/subjects/search?q=          → [ SubjectDTO ]
GET /api/subjects/{id}/concepts      → [ ConceptDTO ] with completed flag per user
```

### Concepts (authenticated)
```
GET /api/concepts/{id}               → ConceptDetailDTO with prevConcept, nextConcept, totalInSubject
GET /api/concepts/search?q=          → [ { id, title, subjectId, subjectTitle, subjectIcon } ]
```

### Progress (authenticated)
```
POST   /api/progress/concept/{id}/complete    → { message, conceptId, completedAt }
DELETE /api/progress/concept/{id}/uncomplete  → { message }
GET    /api/progress/summary                  → { totalConcepts, completedConcepts, percentage, streak, subjectProgress[] }
```

### Roadmaps (authenticated)
```
GET  /api/roadmaps                  → [ RoadmapListDTO ] with isEnrolled flag
GET  /api/roadmaps/enrolled         → [ RoadmapDetailDTO ] for enrolled roadmaps
GET  /api/roadmaps/{id}             → RoadmapDetailDTO with subjects[], overallPercentage
POST /api/roadmaps/{id}/enroll      → { message }
```

### Admin (ADMIN role only)
```
GET    /api/admin/stats
GET    /api/admin/users?page=0&size=10&search=
GET    /api/admin/users/{id}/progress
DELETE /api/admin/users/{id}

GET    /api/admin/subjects
POST   /api/admin/subjects                          body: { title, description, icon, color }
PUT    /api/admin/subjects/{id}
DELETE /api/admin/subjects/{id}

GET    /api/admin/concepts?subjectId=
POST   /api/admin/concepts                          body: { subjectId, title, whatItIs, whyItMatters, codeExample, estimatedMinutes, orderIndex }
PUT    /api/admin/concepts/{id}
DELETE /api/admin/concepts/{id}

GET    /api/admin/roadmaps
POST   /api/admin/roadmaps                          body: { title, description, roleTarget, icon, color, estimatedWeeks }
PUT    /api/admin/roadmaps/{id}
DELETE /api/admin/roadmaps/{id}
GET    /api/admin/roadmaps/{id}/subjects
POST   /api/admin/roadmaps/{id}/subjects            body: { subjectId, orderIndex }
DELETE /api/admin/roadmaps/{roadmapId}/subjects/{subjectId}
PUT    /api/admin/roadmaps/{roadmapId}/subjects/{subjectId}/reorder  body: { newOrderIndex }
```

---

## Key Implementation Details

### Eclipse / Lombok Issue (CRITICAL)
Eclipse's incremental compiler does NOT reliably process Lombok `@RequiredArgsConstructor` on Spring beans. **All services, controllers, and config classes use explicit constructors** — never `@RequiredArgsConstructor`. Models still use `@Getter @Setter` (fine).

### UserRoadmapEnrollment — Composite Key
```java
// Uses @EmbeddedId to match SQL schema (no id column, PK = user_id + roadmap_id)
@EmbeddedId private UserRoadmapEnrollmentId id;
@MapsId("userId") @JoinColumn(name="user_id") private User user;
@MapsId("roadmapId") @JoinColumn(name="roadmap_id") private Roadmap roadmap;
```

### UserDetailsServiceImpl — Returns Domain User
```java
// Returns our User entity (which implements UserDetails) NOT Spring's User wrapper
// This is critical so @AuthenticationPrincipal User user works in controllers
return userRepository.findByEmail(email).orElseThrow(...);
```

### User.isEnabled() — Handles NULL is_active
```java
// !Boolean.FALSE.equals(isActive) treats NULL as enabled (old SQL-seeded rows have NULL)
@Override public boolean isEnabled() { return !Boolean.FALSE.equals(isActive); }
```

### RoadmapRepository — Custom @Query
```java
// boolean isPublished field → Lombok getter isPublished() → JPA property "published"
// Derived query findByIsPublishedTrue() is unreliable — use explicit @Query
@Query("SELECT r FROM Roadmap r WHERE r.isPublished = true")
List<Roadmap> findByIsPublishedTrue();
```

### ConceptPage keyboard navigation
```javascript
useEffect(() => {
  const handler = e => {
    if (e.key === 'ArrowLeft' && concept?.prevConcept) navigate(`/concepts/${concept.prevConcept.id}`)
    if (e.key === 'ArrowRight' && concept?.nextConcept) navigate(`/concepts/${concept.nextConcept.id}`)
  }
  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)
}, [concept, navigate])
```

### CSS Dark Mode
```javascript
// Stored in localStorage as 'theme' = 'light'|'dark'
document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
// CSS: [data-theme="dark"] { --bg-primary: #0F172A; ... }
```

### DataSeeder
- Runs on startup via `CommandLineRunner`
- Seeds admin user (fixes is_active=NULL for old rows)
- Seeds 18 subjects, 12 concepts (Java Fundamentals + Spring Boot Basics), 5 roadmaps, roadmap-subject mappings
- Only seeds if `subjectRepository.count() == 0`

---

## Seed Data Summary
- **18 subjects**: Java Fundamentals, OOP, Data Structures, Spring Boot Basics, Spring Data JPA, Spring Security & JWT, HTML & CSS, JavaScript, React Basics, React Advanced, Node.js & Express, MongoDB, MySQL/PostgreSQL, Python Basics, Django/Flask, REST API Design, Git & GitHub, Docker Basics
- **5 roadmaps**: Java Full Stack (24w), MERN Stack (20w), Python Full Stack (22w), Frontend Developer (16w), Backend Developer Java (20w)
- **12 seeded concepts**: 6 for Java Fundamentals, 6 for Spring Boot Basics

---

## CSS Design System (global.css)
```css
--primary: #4F46E5;  --success: #10B981;  --danger: #EF4444;
--sidebar-width: 260px;  --navbar-height: 64px;
Classes: .card, .btn, .btn-primary, .btn-danger, .badge, .table,
         .stats-grid, .progress-bar, .modal, .search-input,
         .concept-layout, .roadmap-flow, .roadmap-step, .welcome-card
```

---

## What Still Needs Work (future sessions)
- More concept content (only Java Fundamentals + Spring Boot seeded)
- Progress chart/visualization on dashboard  
- Student profile page  
- Search across all subjects + concepts (global search bar in navbar)
- Admin can reorder concepts with drag-and-drop
- Roadmap for Python Full Stack (subjects not mapped yet)
