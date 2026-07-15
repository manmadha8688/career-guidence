# Testing Standard — LearnForEarn / ARISE

> gstack `/review` and `/qa` read this to know what "tested" means here.
> Manual flows and curl scripts live in [testing.md](testing.md) — this file defines the pass/fail gate.

---

## This repo has NO automated test suite

There is no Jest/Vitest/JUnit suite. Do not invent one or fail a change for "missing tests".
The quality gate is build + lint + compile + targeted manual verification.

## The gate (must pass before any change ships)

### Frontend (`FrontEnd/`)
```bash
cd C:/manmadha/Student-project/FrontEnd
npm run build      # MUST succeed (production build)
npx eslint src     # 0 ERRORS required; pre-existing warnings tolerated
```
- 0 eslint **errors**. Warnings that already existed are acceptable — do not let a change add new errors.
- Build failure = blocked. Main bundle target < 350 kB (see [performance.md](performance.md)).

### Backend (`Student-BackEnd/`)
```bash
cd C:/manmadha/Student-project/Student-BackEnd
./mvnw.cmd -q compile   # MUST compile (Java 21)
```
- Backend must compile cleanly. If a service/controller changed, also confirm it starts without bean errors.

## Manual verification (do the ones your change touches)

### API (curl) — confirm shape and auth
- Success returns the resource / list; errors return `{ "error": "message" }`.
- Protected route without cookie → 401; student cookie on `/api/admin/*` → 403; admin cookie → 200.
- After an admin mutation, an immediate re-fetch reflects the change (cache evicted, not stale).

### Frontend flows (per [testing.md](testing.md))
- **Auth**: register/OTP, login redirect (admin vs student), logout preserves `guest_device_id` + `theme`, session restore with no unauthenticated flash.
- **Quiz**: start → answer → submit → result shows score/XP/badge; `sl:refresh` fires after a pass and dashboard updates.
- **Cache eviction**: admin create/update appears without a hard refresh for the evicted keys.
- **Both themes**: any UI change verified in light AND dark.

## Prefer gstack for real verification
- `/qa <url>` runs a **real browser** against the app — use it to verify UI behavior, responsive layout, and both themes rather than eyeballing code.
- `/review` reads these rule files for conventions; give it the build/lint results above.
