# Deploy Configuration — Environment Variables

## Frontend (Vercel)

Set these in: Vercel Dashboard → Project → Settings → Environment Variables

| Variable | Value | Required |
|----------|-------|----------|
| `VITE_API_URL` | `https://learntoearn-wnpp.onrender.com/api` | ✅ Yes |

> **Note:** `VITE_` prefix = public variable, embedded in JS bundle.
> Never put secrets here. The backend URL is safe to expose.

---

## Backend (Render)

Set these in: Render Dashboard → Service → Environment

| Variable | Value | Notes |
|----------|-------|-------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster/learnData_db` | Full Atlas connection string |
| `JWT_SECRET` | `<256-bit random string>` | Generate: `openssl rand -hex 32` |
| `CORS_ALLOWED_ORIGINS` | `https://learn-to-earn-omega.vercel.app` | No trailing slash |
| `SPRING_PROFILES_ACTIVE` | `prod` | Enables Redis cache |
| `SPRING_REDIS_URL` | `redis://***REMOVED***:6379` | Render Redis instance |
| `PORT` | (auto-injected by Render) | DO NOT set manually |

> **Security:** Never commit these values. Never put them in code.

---

## Local Development

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:8080/api
```

### Backend (application-local.properties or environment)
```properties
spring.data.mongodb.uri=mongodb+srv://...@free-database.lfnuahd.mongodb.net/learnData_db
jwt.secret=local-dev-secret-not-production
cors.allowed.origins=http://localhost:5173
spring.profiles.active=local
```

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

## Render Redis Setup

Redis is provisioned as a Render "Redis" service (private).
URL format: `redis://red-<id>:<port>`
This is internal to Render — no external access needed.

---

## Vercel Config (already in repo)

`FrontEnd/vercel.json`:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```
This handles SPA routing — all URLs serve index.html (React Router handles routing).
