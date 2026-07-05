# Deployment Skill

Deploy the LearnForEarn application. Frontend → Vercel. Backend → Render (Docker).

## Pre-Deployment Checklist

### Frontend
- [ ] `npm run build` passes with 0 errors
- [ ] Bundle size: index.js < 400 kB
- [ ] `VITE_API_URL` set to production backend URL in Vercel dashboard
- [ ] `vercel.json` SPA rewrite is present
- [ ] No `VITE_` variables containing secrets

### Backend
- [ ] `mvnw clean package -DskipTests` passes
- [ ] Dockerfile builds successfully
- [ ] All env vars set in Render dashboard (see deploy-config.md)
- [ ] CORS_ALLOWED_ORIGINS matches exact Vercel URL
- [ ] MongoDB Atlas IP whitelist includes `0.0.0.0/0` (for Render)

---

## Frontend Deployment — Vercel

### Method: Auto-deploy on push
```
Repo: your GitHub repo
Root directory: FrontEnd
Build command: npm run build
Output dir: dist
```

### Manual deploy steps:
```bash
cd FrontEnd
npm run build          # Creates dist/
# Push to GitHub → Vercel auto-deploys
# OR: vercel --prod (if Vercel CLI installed)
```

### Environment Variables (Vercel dashboard)
```
VITE_API_URL = https://learnforearn-wnpp.onrender.com/api
```

### Verify deployment:
1. Open https://learnforearn.com
2. Check: page loads without blank screen
3. Check: /login route works (no 404)
4. Check: Network → /api/auth/me returns 401 (backend connected)

---

## Backend Deployment — Render (Docker)

### Method: Auto-deploy from GitHub
```
Repo: your GitHub repo
Root directory: Student-BackEnd
Runtime: Docker
Dockerfile: Student-BackEnd/Dockerfile
```

### Environment Variables (Render dashboard)
See `deploy-config.md` for full list.

### Verify deployment:
```bash
curl https://learnforearn-wnpp.onrender.com/api/auth/me
# → 401 (backend alive, auth required)

curl https://learnforearn-wnpp.onrender.com/actuator/health
# → {"status":"UP"}
```

### Cold start warning:
Render free tier sleeps after 15 min of inactivity.
First request after sleep: ~30 second wake-up delay.
This is expected — users see the splash screen during wake.

---

## Full Stack Smoke Test After Deploy

```
1. Open https://learnforearn.com
2. Click "Try as Guest" → should create guest session
3. Navigate to /missions → should load mission list
4. Login with admin@demo.com / ***REMOVED***
5. Check /admin-skill-arena/subjects → should list subjects
6. Login with student@test.com / ***REMOVED***
7. Check /skill-arena/dashboard → should load with XP/rank
8. Open a concept → concept panel should load
9. Start a concept quiz → quiz should start
10. Submit quiz → result page should show score
```

---

## Rollback Procedure

### Frontend (Vercel):
```
Vercel Dashboard → Deployments → Select previous → Promote to Production
```

### Backend (Render):
```
Render Dashboard → Service → Deploys → Select previous → Redeploy
```
