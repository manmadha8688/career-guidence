# /deploy — Project Deploy Runbook (Vercel + Render)

The repo-specific deploy runbook for LearnForEarn / ARISE. Generic release orchestration
(branch → PR → merge) is gstack `/land-and-deploy`; THIS documents the two deploy targets,
their exact env vars, and the post-deploy smoke test unique to this project.

Two independently-deployed services:

| Service | Platform | Trigger | Live URL |
|---|---|---|---|
| Frontend (`FrontEnd/`) | Vercel CDN | Auto-deploy on push to `master` | https://learnforearn.in |
| Backend (`Student-BackEnd/`) | Render (Docker) | Restart / redeploy picks up new code | https://learnforearn-wnpp.onrender.com |

---

## STEP 1 — Pre-deploy gate

```bash
cd FrontEnd && npx eslint src 2>&1 | tail -3 && npm run build 2>&1 | tail -5
```
```powershell
cd Student-BackEnd; .\mvnw.cmd clean package -DskipTests 2>&1 | Select-Object -Last 3
```

- [ ] Frontend build succeeds, `npx eslint` 0 errors
- [ ] Backend packages clean
- [ ] Run `/team-review` on the diff first

---

## STEP 2 — Frontend → Vercel

Vercel auto-deploys every push to `master`. No manual step beyond the merge.

Env vars (Vercel dashboard → Project → Settings → Environment Variables):

| Var | Value |
|---|---|
| `VITE_API_URL` | `https://learnforearn-wnpp.onrender.com/api` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth web client ID (must equal backend `GOOGLE_CLIENT_ID`) |

- [ ] `VITE_API_URL` points at the Render backend `/api` (no trailing slash mistakes)
- [ ] `VITE_GOOGLE_CLIENT_ID` matches backend `GOOGLE_CLIENT_ID`
- [ ] `VITE_`-prefixed vars are PUBLIC — never put secrets here
- [ ] After push: watch the Vercel deployment go green, then verify https://learnforearn.in loads

---

## STEP 3 — Backend → Render (Docker)

Render builds the Docker image and needs a restart / redeploy to pick up backend code changes.

Env vars (Render dashboard → Service → Environment):

| Var | Value / note |
|---|---|
| `MONGODB_URI` | full Atlas connection string with password |
| `JWT_SECRET` | strong random 256-bit string |
| `CORS_ALLOWED_ORIGINS` | exact frontend origin `https://learnforearn.in` (no trailing slash) |
| `SPRING_PROFILES_ACTIVE` | `prod` (enables Redis L2) |
| `SPRING_REDIS_URL` | Redis connection URL |
| `PORT` | injected by Render (falls back to 8080 locally) |
| `COOKIE_SECURE` | `true` (HTTPS; false only for local HTTP dev) |
| `APP_URL` | `https://learnforearn.in` (base URL in outbound OTP/welcome/reset emails) |
| `BREVO_API_KEY` | Brevo transactional email API key |
| `GOOGLE_CLIENT_ID` | Google OAuth web client ID (verifies Sign-In tokens; must equal frontend `VITE_GOOGLE_CLIENT_ID`) |

- [ ] `CORS_ALLOWED_ORIGINS` lists the EXACT live frontend origin — mismatch = every request fails preflight
- [ ] `SPRING_PROFILES_ACTIVE=prod` and `COOKIE_SECURE=true` in production
- [ ] Trigger restart / redeploy so new code is live
- [ ] After deploy: `curl https://learnforearn-wnpp.onrender.com/api/ping` responds OK

---

## STEP 4 — Smoke test (production)

Run against the live site after both services are up:

- [ ] **Login** — log in with a test account → 200, `SESSION_TOKEN` httpOnly cookie set, redirects by role
- [ ] **`/api/auth/me`** — reload dashboard → returns the user (no password field), no flash of unauthenticated content
- [ ] **Cached read** — open the dashboard/gates → subjects/progress load; second load is instant (sessionStorage/Caffeine hit)
- [ ] **Admin mutation → immediate refresh** — as admin, edit a subject/mission → student view shows the new data right after (cache evicted both levels)
- [ ] **CORS** — no CORS errors in browser console; cookie sent on cross-origin `/api/*` calls
- [ ] **Theme** — toggle light/dark on a couple of pages, both render correctly

---

## OUTPUT

Report: gate result → which services deployed → env vars verified → smoke-test results.
Flag any CORS-origin, `COOKIE_SECURE`, or Google-client-ID mismatch loudly — those break auth silently in prod.
