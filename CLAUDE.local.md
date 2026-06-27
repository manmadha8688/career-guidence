# CLAUDE.local.md — Local Dev Overrides

> This file is gitignored. Contains local-only settings.

## Local URLs
- Frontend: http://localhost:5173
- Backend:  http://localhost:8080

## Local Env Override
VITE_API_URL=http://localhost:8080/api

## Database
MongoDB Atlas (shared dev cluster) — see CLAUDE.md for URI.
Do NOT seed production data from local unless intentional.

## Java Path (Windows)
```powershell
$env:JAVA_HOME = "C:\Users\ManmadhaJayamangala\.p2\pool\plugins\org.eclipse.justj.openjdk.hotspot.jre.full.win32.x86_64_21.0.11.v20260515-1531\jre"
```

## Notes
- Frontend runs on 5173 (or 5174 if port busy)
- Backend must be running before frontend API calls work
- MongoDB Atlas requires network access (not localhost)
