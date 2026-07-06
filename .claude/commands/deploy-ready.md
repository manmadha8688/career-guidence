# /deploy-ready — Full Deployment Readiness Check

Verifies both frontend (Vercel) and backend (Render) are production-ready.
Covers latest platform limitations as of 2025–2026.

---

## ═══ FRONTEND — VERCEL READINESS ═══

### V1 — Build Must Pass Cleanly

```bash
cd FrontEnd
npm run build 2>&1
```

✅ Pass: `✓ built in X.XXs` with zero errors
❌ Fail: Any `error` line → fix before deploying

**Vercel build limit:** 45 minutes max (free tier).
Your build should complete in < 5 seconds — well within limit.

---

### V2 — Bundle Size Check

```bash
npm run build 2>&1 | grep "dist/assets/index.*\.js"
# → index.js must be < 1 MB (Vercel warns at 500 kB)
# Current target: ~316 kB ✓

npm run build 2>&1 | grep "kB" | awk '{print $2, $1}' | sort -rn | head -10
# → No single chunk > 2 MB (Vercel hard limit per file)
```

**Vercel free tier limits:**
- Build output: 100 MB max compressed
- Single file: 50 MB max (edge) / 250 MB max (serverless)
- Bandwidth: 100 GB/month
- Build minutes: 6,000 min/month

---

### V3 — vercel.json SPA Rewrite

```bash
cat FrontEnd/vercel.json
```

✅ Must contain:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

❌ If missing → React Router routes return 404 on browser refresh

---

### V4 — Environment Variables Check

```bash
cat FrontEnd/.env.example
```

**Must be set in Vercel dashboard (NOT in code):**
```
VITE_API_URL = https://learnforearn-wnpp.onrender.com/api
```

**Verify no secrets in VITE_ vars:**
```bash
grep "VITE_" FrontEnd/.env.example FrontEnd/.env.local 2>/dev/null
# → Only VITE_API_URL should exist
# → No API keys, passwords, or tokens with VITE_ prefix
```

**Vercel env var rules:**
- `VITE_` prefix = embedded in JS bundle = PUBLIC (browser can read it)
- Set `VITE_API_URL` in: Vercel → Project → Settings → Environment Variables
- Select: Production + Preview + Development (all environments)

---

### V5 — Static Asset Check

```bash
ls FrontEnd/public/
# → Only favicon.svg should be here (icons.svg was deleted)
# → No large images or videos in public/

wc -c FrontEnd/public/favicon.svg
# → Should be < 50 kB (SVG favicon)
```

---

### V6 — .gitignore Verification

```bash
grep "node_modules\|dist\|\.env\.local" FrontEnd/.gitignore
```

✅ Must have:
- `node_modules` — never commit (huge)
- `dist` — never commit build output
- `*.local` — covers .env.local with secrets

---

### V7 — index.html Meta & SEO

```bash
grep "title\|description\|viewport\|theme-color" FrontEnd/index.html
```

✅ Must have:
- `<title>` tag
- `<meta name="viewport">` (mobile)
- `<meta name="theme-color">` (browser chrome color)
- `<meta name="description">` (SEO)

---

### V8 — Vercel Deployment Settings

Verify in Vercel dashboard before deploying:
```
Framework Preset:    Vite
Root Directory:      FrontEnd
Build Command:       npm run build
Output Directory:    dist
Install Command:     npm install
Node.js Version:     20.x (LTS)
```

---

### V9 — Frontend Cold Start Check

Vercel is serverless — no cold start for static sites.
SPA deploys instantly. No warming needed.

✅ Vercel free tier has NO sleep/spin-down for static sites.
✅ Global CDN — automatically cached at edge.

---

## ═══ BACKEND — RENDER READINESS ═══

### R1 — Build Must Pass

```powershell
cd C:\manmadha\Student-project\Student-BackEnd
.\mvnw.cmd clean package -DskipTests 2>&1 | tail -5
```

✅ Must show: `BUILD SUCCESS`

---

### R2 — Docker Build Check

```bash
# If Docker is available:
cd Student-BackEnd
docker build -t learnforearn-backend . 2>&1 | tail -10
# → "Successfully built" or "Successfully tagged"

# Verify Dockerfile exists
cat Student-BackEnd/Dockerfile | head -20
```

**Expected Dockerfile pattern:**
```dockerfile
FROM maven:3.9-eclipse-temurin-17 AS build
# ... Maven build stage

FROM eclipse-temurin:17-jre-alpine
# ... Runtime stage (smaller image)
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Render Docker limits (free tier):**
- Memory: 512 MB RAM
- CPU: 0.1 vCPU (shared)
- Image size: no hard limit but keep < 500 MB

---

### R3 — Environment Variables Check

**All of these must be set in Render dashboard:**

```bash
# Verify these are NOT hardcoded in Java files
grep -rn "mongodb+srv://\|JWT_SECRET.*=.*[A-Za-z0-9]\{20\}" \
  Student-BackEnd/src/main/java/ --include="*.java" | grep -v "//\|test\|Test"
# → Must return 0 (no hardcoded credentials)

grep -rn "cors.allowed\|CORS_ALLOWED" \
  Student-BackEnd/src/main/resources/ --include="*.yml" --include="*.properties"
# → Must show: ${CORS_ALLOWED_ORIGINS} (env var reference, not hardcoded URL)
```

**Required Render env vars:**
| Variable | Value | Notes |
|----------|-------|-------|
| `MONGODB_URI` | `mongodb+srv://...` | Full Atlas connection string |
| `JWT_SECRET` | `<256-bit random>` | Generate: `openssl rand -hex 32` |
| `CORS_ALLOWED_ORIGINS` | `https://learnforearn.in` | No trailing slash |
| `SPRING_PROFILES_ACTIVE` | `prod` | Enables Redis |
| `SPRING_REDIS_URL` | `redis://red-xxx:6379` | Internal Render Redis |

**Do NOT set `PORT`** — Render injects it automatically. Setting it manually breaks deployment.

---

### R4 — Health Check Endpoint

```bash
# Verify actuator health endpoint exists
grep -rn "actuator\|management" \
  Student-BackEnd/src/main/resources/ --include="*.yml" --include="*.properties"

# Test locally:
curl http://localhost:8080/actuator/health
# → {"status":"UP"}
```

**Render uses this for health checks.**
If `/actuator/health` returns non-200 → Render marks service as unhealthy.

Set in Render dashboard:
- Health Check Path: `/actuator/health`

---

### R5 — CORS Configuration Check

```bash
grep -rn "CorsConfiguration\|allowedOrigin\|CORS_ALLOWED_ORIGINS" \
  Student-BackEnd/src/main/java/ --include="*.java" | grep -v "//"
```

✅ Must read from env var:
```java
config.setAllowedOrigins(List.of(System.getenv("CORS_ALLOWED_ORIGINS")));
// OR via @Value("${cors.allowed.origins}")
```

❌ Never: `config.setAllowedOrigins(List.of("*"))` in production

**Test after deploy:**
```bash
curl -H "Origin: https://learnforearn.in" \
  -H "Access-Control-Request-Method: GET" \
  -X OPTIONS \
  https://learnforearn-wnpp.onrender.com/api/subjects -v 2>&1 | \
  grep "Access-Control"
# → Should show: Access-Control-Allow-Origin: https://learnforearn.in
```

---

### R6 — MongoDB Atlas Readiness

```bash
# Test connection from local (confirms credentials work)
curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@demo.com","password":"***REMOVED***"}' | python -m json.tool | grep '"role"'
# → "role": "ADMIN" means Atlas is reachable
```

**Atlas checklist for Render deployment:**
- [ ] IP Whitelist: `0.0.0.0/0` added (Render has dynamic IPs)
- [ ] Cluster is running (M0 free tier doesn't auto-pause, but check)
- [ ] Database `learnData_db` exists
- [ ] User has `readWrite` role on `learnData_db`
- [ ] Connection string uses `mongodb+srv://` format (not `mongodb://`)

**Atlas free tier limits (M0):**
- Storage: 512 MB
- Connections: 500 max
- No dedicated RAM (shared cluster)

---

### R7 — Render Free Tier Limitations (Critical)

**Know these before deploying:**

| Limitation | Details | Impact on your app |
|-----------|---------|-------------------|
| **Spin-down** | Service sleeps after 15 min inactivity | First request after sleep: 30–60s delay |
| **RAM** | 512 MB | Spring Boot uses ~200–300 MB — OK |
| **Hours** | 750 hours/month free | 1 service = ~31 days = 744h ≈ enough |
| **Bandwidth** | 100 GB/month free | Should be fine for student project |
| **Build time** | 400 min/month free | Each deploy ~3–5 min → ~80 deploys/month |
| **Persistent disk** | Not available on free | Don't use file storage — use MongoDB |
| **Redis (free)** | Render Redis free = 25 MB RAM | Your Redis for cache is fine |

**Spin-down mitigation:**
- First user each day sees 30–60s "ARISE" splash screen
- This is acceptable for a student project
- Students can upgrade to paid ($7/month) to prevent spin-down

---

### R8 — Render Deployment Configuration

Verify in Render dashboard:
```
Environment:        Docker
Root Directory:     Student-BackEnd
Dockerfile path:    Student-BackEnd/Dockerfile
Branch:             main (or master)
Auto-Deploy:        Yes (on push)
Health Check Path:  /actuator/health
```

---

### R9 — Spring Boot Production Profile

```bash
grep -rn "profiles\|SPRING_PROFILES" \
  Student-BackEnd/src/main/resources/ --include="*.yml" --include="*.properties"
```

**Expected:**
- `application.yml` or `application.properties` — common config
- `application-prod.yml` — production config (Redis enabled)
- `application-local.yml` — local config (Caffeine only, no Redis)

**Render must have:** `SPRING_PROFILES_ACTIVE=prod`

---

## ═══ CROSS-PLATFORM CHECKS ═══

### X1 — Frontend ↔ Backend URL Match

```bash
# Frontend points to correct backend
cat FrontEnd/.env.example | grep VITE_API_URL
# → https://learnforearn-wnpp.onrender.com/api

# Backend CORS allows correct frontend
grep -rn "CORS_ALLOWED_ORIGINS\|learnforearn-omega" \
  Student-BackEnd/src/main/resources/ --include="*.yml" --include="*.properties"
```

---

### X2 — End-to-End Smoke Test (Post-Deploy)

After both are deployed, run this sequence:

```bash
FRONTEND=https://learnforearn.in
BACKEND=https://learnforearn-wnpp.onrender.com

# 1. Backend alive
curl -s $BACKEND/actuator/health | python -m json.tool

# 2. Backend unauthenticated → 401
curl -s -o /dev/null -w "%{http_code}\n" $BACKEND/api/auth/me

# 3. Backend public data
curl -s $BACKEND/api/subjects | python -m json.tool | grep '"title"' | head -3

# 4. Frontend loads (HTML response)
curl -s -o /dev/null -w "%{http_code}\n" $FRONTEND
# → 200

# 5. Frontend SPA routing (any valid route)
curl -s -o /dev/null -w "%{http_code}\n" $FRONTEND/skill-arena/dashboard
# → 200 (vercel.json rewrite working)

# 6. Frontend → Backend CORS
curl -H "Origin: $FRONTEND" -X OPTIONS \
  $BACKEND/api/subjects -v 2>&1 | grep "Access-Control-Allow-Origin"
# → Should include frontend URL
```

---

## ═══ FINAL CHECKLIST ═══

### Frontend (Vercel)
- [ ] `npm run build` passes with 0 errors
- [ ] `index.js` < 1 MB
- [ ] `vercel.json` SPA rewrite present
- [ ] `VITE_API_URL` set in Vercel dashboard
- [ ] No secrets in `VITE_` env vars
- [ ] Framework: Vite, Root: FrontEnd, Output: dist
- [ ] Node.js version: 20.x

### Backend (Render)
- [ ] `mvn clean package` passes
- [ ] Docker builds successfully
- [ ] All 5 env vars set in Render dashboard
- [ ] `PORT` NOT set manually
- [ ] MongoDB Atlas IP whitelist: `0.0.0.0/0`
- [ ] Health check path: `/actuator/health`
- [ ] `SPRING_PROFILES_ACTIVE=prod`
- [ ] `CORS_ALLOWED_ORIGINS` = exact Vercel URL (no trailing slash)

### Both
- [ ] Frontend `VITE_API_URL` matches Render service URL
- [ ] Backend `CORS_ALLOWED_ORIGINS` matches Vercel URL
- [ ] Smoke test passes (all 6 curl checks above)
