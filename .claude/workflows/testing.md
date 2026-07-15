# Workflow: Testing & Verification

> This repo has **no automated test suite** (no Jest, no JUnit). Verification is the build/lint gate + backend compile + curl + manual flows + gstack `/qa` for real browser testing. Never claim a change is verified without running the applicable steps below. See the `testing-patterns` skill for the detailed patterns.

## Pre-flight
- **gstack must be installed globally** for `/qa`. Verify per `CLAUDE.md` if missing.
- Backend needs Java 21 — set `JAVA_HOME` (see `CLAUDE.local.md`) before any `mvnw` command.

## 1. Frontend build + lint gate (always, for FE changes)
```bash
cd C:/manmadha/Student-project/FrontEnd
npm run build          # must succeed
npx eslint src         # must be 0 errors (warnings tolerated)
```
A green build + 0 eslint errors is the minimum bar. Warnings are acceptable; errors are not.

## 2. Backend compile (for BE changes)
```powershell
$env:JAVA_HOME = "C:\Users\ManmadhaJayamangala\.p2\pool\plugins\org.eclipse.justj.openjdk.hotspot.jre.full.win32.x86_64_21.0.11.v20260515-1531\jre"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
cd C:\manmadha\Student-project\Student-BackEnd
.\mvnw.cmd -q compile   # must succeed on Java 21
```

## 3. curl the affected `/api/*` endpoints
Start backend (`./mvnw.cmd spring-boot:run`, port 8080). Verify auth boundaries and shape.
```bash
# Unauthenticated protected endpoint → expect 401
curl -i http://localhost:8080/api/progress/summary

# Login → capture the httpOnly cookie
curl -i -c cookies.txt -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@test.com","password":"<local secret>"}'

# Authenticated read → expect 200, no `password` field in body
curl -i -b cookies.txt http://localhost:8080/api/progress/summary

# Admin endpoint with a student cookie → expect 403
curl -i -b cookies.txt http://localhost:8080/api/admin/users
```
Confirm error responses are `{ "error": "message" }` and status codes match `.claude/rules/api-conventions.md`.

## 4. Manual flow checks (as applicable to the change)
- **Auth**: register (OTP → verify) / login / logout. Logout must preserve `guest_device_id` + `theme`; direct-load a protected route restores or redirects to `/login?redirect=...` with no unauth flash.
- **Quiz**: start → answer → submit → result. Result shows score/XP/badge; returning to dashboard reflects progress (`sl:refresh` fired), concept shows CLEARED.
- **Admin cache eviction**: create/update a subject/concept/mission in admin → hard-refresh the student dashboard → the change appears immediately (proves `CacheService.evict()` ran on both cache levels). If it doesn't appear until TTL, eviction is missing. Note: manual DB edits bypass the frontend sessionStorage cache — clear DevTools session storage to see fresh data during dev.
- **Theme**: any UI change checked in **both light and dark** modes.

## 5. Real browser test — gstack `/qa <url>`
For any user-facing flow, run gstack `/qa <staging-or-local-url>` to drive it in a real browser (clicks, navigation, visual state) — this is the closest thing to end-to-end testing this project has. Use `/qa` against a deployed staging URL before deployment, or a local URL during development.

## Verification checklist
- [ ] `npm run build` succeeds (FE changes)
- [ ] `npx eslint src` 0 errors (FE changes)
- [ ] Backend compiles on Java 21 (BE changes)
- [ ] Affected `/api/*` endpoints curl'd: 401 without cookie, 200/403 with, no `password` leak
- [ ] Relevant manual flow (auth / quiz / admin-eviction) walked through
- [ ] Both themes verified for any UI
- [ ] gstack `/qa` run on the affected browser flow
