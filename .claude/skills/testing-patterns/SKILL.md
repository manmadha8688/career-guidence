---
name: testing-patterns
description: How the LearnForEarn/ARISE repo is actually verified — build + lint gates, backend compile, curl cookie-auth flows, and manual flow checks that prove cache eviction and sl:refresh. Use before claiming a change is verified. There is NO Jest/JUnit suite. For browser flows prefer gstack /qa <url>.
---

# Testing Patterns — LearnForEarn / ARISE

**There is no automated test suite** — no Jest, no React Testing Library, no JUnit.
"Verified" here means the build/lint gates pass and the relevant manual flow was exercised.
Do not claim tests pass; there are none to run.

## Gate 1 — Frontend build + lint (required before "done")
```bash
cd C:/manmadha/Student-project/FrontEnd
npm run build          # must succeed — a blank-page JSX bug often only shows here
npx eslint src         # 0 errors required; warnings are tolerated
```
- Main bundle target < ~350 kB (currently ~316 kB / 103 kB gzip). A large jump = investigate.
- There is a known baseline of pre-existing lint errors from before audits — compare against
  baseline; your change must not ADD errors.

## Gate 2 — Backend compile
```powershell
$env:JAVA_HOME = "C:\Users\ManmadhaJayamangala\.p2\pool\plugins\org.eclipse.justj.openjdk.hotspot.jre.full.win32.x86_64_21.0.11.v20260515-1531\jre"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
cd C:\manmadha\Student-project\Student-BackEnd
.\mvnw.cmd -q compile     # or spring-boot:run to smoke-test endpoints
```

## Gate 3 — curl / API checks (cookie flow)
Auth is an httpOnly cookie (`jwt`), so use a cookie jar:
```bash
# Login → capture cookie
curl -i -c cookies.txt -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@test.com","password":"<local secret>"}'

# Authenticated call reuses the jar
curl -b cookies.txt http://localhost:8080/api/auth/me        # 200, no password field
curl -b cookies.txt http://localhost:8080/api/progress/summary   # 200

# Auth negative checks
curl -i http://localhost:8080/api/progress/summary            # 401 (no cookie)
curl -i -b student-cookies.txt http://localhost:8080/api/admin/users   # 403 (wrong role)
curl -i -b admin-cookies.txt http://localhost:8080/api/admin/users     # 200
```
Error responses must be `{ "error": "message" }`. Status codes: 200/201/204/400/401/403/404/500.

## Gate 4 — Manual flow checks (the ones that catch real regressions)
- **Auth**: login → student lands on `/skill-arena/dashboard`, admin on `/admin-skill-arena`;
  logout redirects to `/`, and `/skill-arena/dashboard` then bounces to `/login`; confirm
  `guest_device_id` + `theme` survive in localStorage.
- **Quiz pass → refresh**: complete a passing quiz → QuizResultPage fires `sl:refresh` →
  dashboard re-fetches, concept shows CLEARED, daily quest q1 marks done. If the dashboard
  didn't update, the event or cache-bust is broken.
- **Admin mutation → immediate refresh proves eviction**: create/edit a subject in admin →
  hard-refresh the student dashboard → it appears immediately. If it only appears after the
  TTL, backend `cacheService.evict()` is missing.
- **Theme**: toggle dark/light on the changed screen — every new surface must adapt via CSS
  vars in BOTH themes (a common miss).
- **Race**: click different concepts rapidly → last clicked wins (active-flag pattern).

## Cache-debug gotcha
Manual DB edits bypass the frontend `sessionStorage` cache. If data looks stale after a DB
change, clear DevTools → Application → Session Storage before concluding there's a bug.

## Preferred tooling
For real browser interaction flows, prefer gstack **`/qa <url>`** over hand-rolled scripts.
This skill covers only the project-specific gates and flow expectations.
