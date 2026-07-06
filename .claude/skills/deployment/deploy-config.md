# Deploy Configuration — Environment Variables

## Frontend (Vercel)

Set these in: Vercel Dashboard → Project → Settings → Environment Variables

| Variable | Value | Required |
|----------|-------|----------|
| `VITE_API_URL` | `https://learnforearn-wnpp.onrender.com/api` | ✅ Yes |

> **Note:** `VITE_` prefix = public variable, embedded in JS bundle.
> Never put secrets here. The backend URL is safe to expose.

---

## Backend (Render)

Set these in: Render Dashboard → Service → Environment

| Variable | Value | Notes |
|----------|-------|-------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster/learnData_db` | Full Atlas connection string |
| `JWT_SECRET` | `<256-bit random string>` | Generate: `openssl rand -hex 32` |
| `CORS_ALLOWED_ORIGINS` | `https://learnforearn.in` | No trailing slash |
| `SPRING_PROFILES_ACTIVE` | `prod` | Enables Redis L2 cache (omit for Caffeine-only) |
| `SPRING_REDIS_URL` | `redis://red-<id>:6379` | Render Key Value **internal** URL (set `allkeys-lru`). Omit if not using Redis |
| `BREVO_API_KEY` | `<Brevo SMTP API key>` | Required for register/forgot-password OTP emails |
| `COOKIE_SECURE` | `true` | Required in production — httpOnly auth cookies over HTTPS only |
| `PORT` | (auto-injected by Render) | DO NOT set manually |

### Health Check

Render should use: `GET /actuator/health` (returns `{"status":"UP"}` when healthy).

Public route — no auth required. Added via Spring Boot Actuator.

> **Security:** Never commit these values. Never put them in code.

---

## Local Development

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:8080/api
```

### Backend (application-local.properties — gitignored)
```properties
MONGODB_URI=mongodb+srv://...@cluster/learnData_db
jwt.secret=local-dev-secret-not-production
cors.allowed.origins=http://localhost:5173
spring.profiles.active=local
brevo.api.key=<your-brevo-api-key>
app.cookie.secure=false
```

> Local profile uses `application-local.properties` (gitignored). Set `app.cookie.secure=false` for HTTP localhost.

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

`FrontEnd/vercel.json`:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```
This handles SPA routing — all URLs serve index.html (React Router handles routing).
