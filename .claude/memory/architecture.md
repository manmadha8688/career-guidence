# Architecture — LearnForEarn / ARISE

> Full-stack request path, auth, caching, XP, and the perf optimizations that must not regress.

## Stack
- **Frontend**: React 19 + Vite 8, deployed to Vercel CDN. 72 `React.lazy()` routes (code-split per page). sessionStorage API cache. framer-motion for motion. CSS-variable design system (`global.css`, tokens/).
- **Backend**: Spring Boot 3.3.5 on Java 21, Docker image on Render. Controller → Service → Repository layering. Two-level cache. JWT filter.
- **Database**: MongoDB Atlas `learnData_db`.
- **Cache L2**: Redis (prod profile only; local = Caffeine only).
- **Email**: Brevo transactional API (OTP verify, welcome, password reset).

## ASCII diagram
```
Browser
  │  React 19 + Vite 8  (Vercel CDN)
  │   ├─ 72 lazy routes, code split
  │   ├─ sessionStorage API cache (withCache, TTL 30s–5min)
  │   ├─ AuthContext (only source of truth for user)
  │   ├─ ThemeContext (CSS-var dark/light, sky canvas)
  │   └─ httpOnly cookie auth — NO JWT in JS
  │
  │  HTTPS  /api/*   (axios withCredentials: true)
  ▼
Spring Boot 3.3.5 / Java 21  (Render — Docker)
  │   ├─ SecurityConfig (CORS from CORS_ALLOWED_ORIGINS env)
  │   ├─ JwtFilter (reads "jwt" cookie, validates + tokenVersion check)
  │   ├─ Controller → Service → Repository
  │   └─ CacheService: Caffeine L1 + Redis L2
  │        └─ CacheWarmup pre-fills L1 on ApplicationReadyEvent
  │
  │  mongodb+srv://…
  ▼
MongoDB Atlas (learnData_db)
  users, subjects, concepts, roadmaps, roadmap_subjects,
  user_concept_progress, user_roadmap_enrollments,
  questions, quiz_attempts, user_subject_badges, user_roadmap_badges,
  certificates, missions, problems, aptitude_*, bookmarks,
  reports, feedback, walkIns, login_events, user_daily_quests
```

## Request / cache path (read)
```
component → src/api/api.js wrapper → withCache(key, ttl, fn)
   ├─ sessionStorage hit (not expired) → return cached (0 network)
   └─ miss → axios GET (withCredentials) → BE CacheService.get(name,key,supplier)
                ├─ Caffeine L1 hit → return (~0ms)
                ├─ Redis L2 hit → fill L1 + return (<5ms)
                └─ DB → fill L1+L2 + return
```
Mutations bypass cache, then call `clearApiCache(...)` on FE and `CacheService.evict(...)` on BE. **Every admin mutation must evict** the matching keys (map in `project_caching_audit.md`).

## Auth flow
```
1. POST /api/auth/login {email,password}  (or /google, /guest)
      → BCrypt(strength 12) verify → sets httpOnly "jwt" cookie
        (24h expiry; COOKIE_SECURE=true in prod)
2. FE AuthContext mount → GET /api/auth/me (withCredentials)
      200 → setUser(data);  401 → setUser(null)
3. ProtectedRoute:
      loading → SystemAwakeningLoader
      !user → /login?redirect=…
      adminOnly && role!=='ADMIN' → /skill-arena/dashboard
4. Logout → POST /api/auth/logout (clears cookie)
      localStorage.clear() BUT preserve guest_device_id + theme
      clearUserCache() (sessionStorage) → hard reload window.location='/'
5. Guest → POST /api/auth/guest {guestId?} → GUEST-role user, device id in localStorage
```
**Revocation**: `User.tokenVersion` (long). JwtFilter compares token's version to the user's; a bump (e.g. password reset) invalidates all outstanding 24h tokens without waiting for expiry. There is no refresh token — hard 24h ceiling.

## Two-level cache details
- `CacheService.get(cacheName, key, supplier)` / `evict(name,key)` / `evictAll(name)`.
- Cache names by entity: `subjects`, `concepts`, `roadmaps`, `missions`, `problems`, `progress`, aptitude names.
- `CacheWarmup.java` warms L1 on startup for static-ish data (subjects, concepts, roadmaps, missions, problems). Never warm user-specific data.
- Profiles: `local` = Caffeine only. `prod` = Caffeine + Redis (`SPRING_REDIS_URL`).

## XP / rank
XP = quiz score × 10; +50 for first concept cleared that day. Thresholds E/D/C/B/A/S at 0/500/1500/3000/6000/10000 (see `project-context.md`). `utils/slRank.js` computes rank from XP on the frontend.

## Performance optimizations (do NOT regress)
- `getProgressSummary` — **2 DB queries** (subjects from Caffeine + one batched badge query). Was 18.
- `getBulkSubjectStatus` — **2 DB queries** (one badge query, one progress query) replacing N×M per-subject calls.
- All 72 routes lazy; `usePrefetchRoutes()` fires once on idle (requestIdleCallback).
- Subject list endpoint returns lightweight fields; full concept fields only on single fetch.
- Main bundle target < 350 kB.

## Hard layout constraints
- No `AppLayout` (no sidebar/navbar) on: DashboardPage, QuizPage, QuizResultPage, RoadmapDetailPage.
- QuizPage is 100vh fixed — never add scrolling.
- `sl:refresh` custom event fired by QuizResultPage after a pass → DashboardPage reloads all user data.
