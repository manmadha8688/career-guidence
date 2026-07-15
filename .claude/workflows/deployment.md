# Workflow: Deployment (Vercel frontend + Render backend)

> Repeatable deploy runbook for LearnForEarn / ARISE. Frontend → Vercel (auto on push to `master`, `learnforearn.in`). Backend → Spring Boot on Render (Docker). Use the project `/deploy` command as the runbook and gstack `/land-and-deploy` to orchestrate.

## Pre-flight
- **gstack must be installed globally** for `/review`, `/qa`, `/land-and-deploy`. Verify per `CLAUDE.md` if missing.
- `/deploy` is this repo's own runbook command in `.claude/commands/` (backed by the `deploy` / `deploy-ready` skills).
- Do the deploy from a reviewed, verified branch merged to `master` — Vercel deploys `master` automatically.

## Step 0 — Pre-deploy gates (do not skip)
1. Project `/team-review` — ARISE conventions (`.claude/workflows/code-review.md`).
2. gstack `/review` — generic defects.
3. gstack `/qa <staging-url>` — real browser test of the affected flows.
4. Verification gate green: `npm run build`, `npx eslint` 0 errors, backend compiles, both themes, cache eviction (`.claude/workflows/testing.md`).

If any gate fails, stop — do not deploy.

## Frontend → Vercel
1. **Deploy trigger**: merge/push to `master` → Vercel builds and deploys automatically. No manual step for code.
2. **Env vars** (Vercel dashboard, `VITE_` prefix = public, never secrets):
   - `VITE_API_URL=https://learnforearn-wnpp.onrender.com/api`
   - `VITE_GOOGLE_CLIENT_ID` (must match backend `GOOGLE_CLIENT_ID`)
   - Changing an env var requires a redeploy to take effect.
3. **Verify**: open https://learnforearn.in — landing loads, login works, a cached read (subjects/dashboard) renders, theme toggle works both ways, no console chunk-load errors.

## Backend → Render (Docker)
1. **Deploy trigger**: push backend changes, then **restart / redeploy the Render service** to pick up the new image (code changes are not live until the service restarts).
2. **Env vars** (Render dashboard — never in code):
   - `MONGODB_URI` — full Atlas connection string (with password)
   - `JWT_SECRET` — strong 256-bit random
   - `CORS_ALLOWED_ORIGINS=https://learnforearn.in` (exact, no trailing slash)
   - `SPRING_PROFILES_ACTIVE=prod` (enables Redis L2)
   - `SPRING_REDIS_URL` — Redis connection URL
   - `COOKIE_SECURE=true` (HTTPS in prod)
   - `APP_URL=https://learnforearn.in` (outbound email base URL)
   - `BREVO_API_KEY` — transactional email
   - `GOOGLE_CLIENT_ID` — must match frontend `VITE_GOOGLE_CLIENT_ID`
   - `PORT` — injected by Render (falls back to 8080 locally)
   - Changing an env var requires a service restart.
3. **Smoke test** (after the service is up):
   ```bash
   curl -i https://learnforearn-wnpp.onrender.com/api/ping      # health
   curl -i -c c.txt -X POST https://learnforearn-wnpp.onrender.com/api/auth/login \
     -H "Content-Type: application/json" -d '{"email":"...","password":"..."}'   # login → sets cookie
   curl -i -b c.txt https://learnforearn-wnpp.onrender.com/api/subjects          # a cached read → 200
   ```
   Confirm: `/api/ping` healthy, login sets the httpOnly cookie, a cached read returns 200. CacheWarmup fills Caffeine on startup, so first reads should be fast.

## Orchestration — gstack `/land-and-deploy`
For a coordinated land + deploy, run gstack `/land-and-deploy` (it sequences the merge and deploy). Follow the project `/deploy` runbook for the ARISE-specific env-var + smoke-test steps above.

## Post-deploy verification
- [ ] Frontend live at https://learnforearn.in; login + a cached read + theme toggle work
- [ ] Backend `/api/ping` healthy; login sets cookie; cached read 200
- [ ] CORS origin matches (no CORS errors in browser console)
- [ ] Admin mutation → student view reflects change immediately (eviction live in prod)
- [ ] Backend restarted so new code is actually live

## Rollback
- Frontend: redeploy the previous Vercel deployment (instant rollback in dashboard).
- Backend: redeploy the previous Render image / revert the commit and restart.
