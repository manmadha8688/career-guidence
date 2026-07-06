# Deploy Configuration — Environment Variables

## Test vs Production stacks

| | Frontend | Backend API | Render `CORS_ALLOWED_ORIGINS` |
|---|---|---|---|
| **Test** | `https://learn-to-earn-omega.vercel.app` | `https://learntoearn-wnpp.onrender.com/api` | `https://learn-to-earn-omega.vercel.app` |
| **Production** | `https://learnforearn.in` | `https://learnforearn.onrender.com/api` | `https://learnforearn.in` |

> **CSP:** `FrontEnd/vercel.json` allows `https://*.onrender.com` in `connect-src` so both test and prod Render backends work. Vercel reads `vercel.json` **before** the build — env-based CSP patching at build time does not affect deployed headers.

---

## Frontend (Vercel)

Set these in: Vercel Dashboard → Project → Settings → Environment Variables

### Test project (`learn-to-earn-omega`)

| Variable | Value | Required |
|----------|-------|----------|
<<<<<<< HEAD
| `VITE_API_URL` | `https://learntoearn-wnpp.onrender.com/api` | Yes |
| `VITE_GOOGLE_CLIENT_ID` | `<web-client-id>.apps.googleusercontent.com` | Yes (Google sign-in) |

### Production project (`learnforearn.in`)

| Variable | Value | Required |
|----------|-------|----------|
| `VITE_API_URL` | `https://learnforearn.onrender.com/api` | Yes |
| `VITE_GOOGLE_CLIENT_ID` | `<web-client-id>.apps.googleusercontent.com` | Yes (Google sign-in) |
=======
| `VITE_API_URL` | `https://learnforearn-wnpp.onrender.com/api` | ✅ Yes |
| `VITE_GOOGLE_CLIENT_ID` | `<web-client-id>.apps.googleusercontent.com` | ✅ Yes (for Google sign-in) |
>>>>>>> c27961f9349d0c97de5a2dcb6ed9abce756c9e6f

> **Note:** `VITE_` prefix = public variable, embedded in JS bundle.
> Never put secrets here. The backend URL is safe to expose.
> After changing env vars, **redeploy** — Vite bakes them at build time.

---

## Backend (Render)

Set these in: Render Dashboard → Service → Environment

### Test service (`learntoearn-wnpp`)

| Variable | Value | Notes |
|----------|-------|-------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster/learnData_db` | Full Atlas connection string |
| `JWT_SECRET` | `<256-bit random string>` | Generate: `openssl rand -hex 32` |
| `CORS_ALLOWED_ORIGINS` | `https://learn-to-earn-omega.vercel.app` | No trailing slash |
| `SPRING_PROFILES_ACTIVE` | `prod` | Enables Redis L2 cache (omit for Caffeine-only) |
| `SPRING_REDIS_URL` | `redis://red-<id>:6379` | Optional — Render Key Value internal URL |
| `BREVO_API_KEY` | `<Brevo SMTP API key>` | Required for register/forgot-password OTP emails |
<<<<<<< HEAD
| `GOOGLE_CLIENT_ID` | `<web-client-id>.apps.googleusercontent.com` | Must match `VITE_GOOGLE_CLIENT_ID` |
=======
| `GOOGLE_CLIENT_ID` | `<web-client-id>.apps.googleusercontent.com` | Required for Google sign-in — must match `VITE_GOOGLE_CLIENT_ID` |
>>>>>>> c27961f9349d0c97de5a2dcb6ed9abce756c9e6f
| `COOKIE_SECURE` | `true` | Required in production — httpOnly auth cookies over HTTPS only |
| `PORT` | (auto-injected by Render) | DO NOT set manually |

### Production service (`learnforearn`)

| Variable | Value | Notes |
|----------|-------|-------|
| `MONGODB_URI` | (production Atlas URI) | |
| `JWT_SECRET` | (production secret) | |
| `CORS_ALLOWED_ORIGINS` | `https://learnforearn.in` | No trailing slash |
| `SPRING_PROFILES_ACTIVE` | `prod` | |
| `SPRING_REDIS_URL` | (optional) | |
| `BREVO_API_KEY` | (production key) | |
| `GOOGLE_CLIENT_ID` | same Web Client ID as Vercel | |
| `COOKIE_SECURE` | `true` | |

### Health Check

Render should use: `GET /actuator/health` (returns `{"status":"UP"}` when healthy).

Public route — no auth required. Added via Spring Boot Actuator.

> **Security:** Never commit these values. Never put them in code.

---

## Google Cloud Console (OAuth)

**OAuth 2.0 Client → Authorized JavaScript origins** (all required):

- `http://localhost:5173`
- `https://learn-to-earn-omega.vercel.app`
- `https://learnforearn.in`

`GOOGLE_CLIENT_ID` on both Render services must match `VITE_GOOGLE_CLIENT_ID` on both Vercel projects.

---

## Local Development

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:8080/api
VITE_GOOGLE_CLIENT_ID=xxxxxxxx.apps.googleusercontent.com
```

### Backend (application-local.properties — gitignored)
```properties
MONGODB_URI=mongodb+srv://...@cluster/learnData_db
jwt.secret=local-dev-secret-not-production
cors.allowed.origins=http://localhost:5173
spring.profiles.active=local
brevo.api.key=<your-brevo-api-key>
app.cookie.secure=false
google.client-id=xxxxxxxx.apps.googleusercontent.com
```

> Local profile uses `application-local.properties` (gitignored). Set `app.cookie.secure=false` for HTTP localhost.
> Local dev does not use `vercel.json` CSP — only Vercel deployments do.

---

## Post-deploy verification

**CSP (test):**
```bash
curl -sI https://learn-to-earn-omega.vercel.app/ | findstr Content-Security-Policy
```
Should include `https://learntoearn-wnpp.onrender.com` in `connect-src`.

**CORS (test):**
```bash
curl -H "Origin: https://learn-to-earn-omega.vercel.app" -I https://learntoearn-wnpp.onrender.com/api/subjects
```
Should return `Access-Control-Allow-Origin: https://learn-to-earn-omega.vercel.app`.

Repeat on production with `learnforearn.in` + `learnforearn.onrender.com`.

---

## MongoDB Atlas Setup

### IP Whitelist
For Render (dynamic IPs): Add `0.0.0.0/0` (allow all)
For local dev: Add your current IP

### Connection String Format
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority&appName=<appName>
```

### Database name
```
learnData_db
```

---

## Render Key Value (Redis) Setup

Provider: **Render Key Value** (Redis-compatible, Valkey 8), **Free tier** (25 MB RAM, 50 connections, no persistence).

Redis is an **optional L2 cache** with graceful fallback — the app runs fine without it (Caffeine-only). It only activates under the `prod` profile.

### To enable
1. Render Dashboard → New → Key Value → **Free** (same region as the backend).
2. Set **maxmemory-policy = `allkeys-lru`** (25 MB is small — this makes it evict old keys instead of erroring on writes when full).
3. Copy the **Internal** URL: `redis://red-<id>:6379` (no TLS, internal-only, no egress cost).
4. On the backend service set:
   - `SPRING_REDIS_URL` = internal URL
   - `SPRING_PROFILES_ACTIVE` = `prod`  ← turns Redis on
5. Redeploy.

Notes:
- Free tier has **no persistence** — data wiped on restart/maintenance. Fine here (cache only, graceful fallback).
- Redis health is disabled (`management.health.redis.enabled=false`) so a down Redis never marks the service unhealthy.
- Single-instance deploys can safely run **without** Redis (Caffeine is enough). Redis L2 matters only when scaling to multiple instances or wanting cross-instance shared cache.
- Off-platform free-forever alternative: **Upstash** (256 MB, 500K cmds/mo, no card) — requires TLS URL form `rediss://...`.

---

## Vercel Config (already in repo)

`FrontEnd/vercel.json` — SPA rewrites + security headers. CSP `connect-src` includes `https://*.onrender.com` so any Render backend (test or prod) is allowed without per-env CSP changes.
