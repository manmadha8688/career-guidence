export const FASTAPI_GUIDE = [
  {
    phase: '01',
    title: 'What is FastAPI on Render?',
    color: '#009688',
    steps: [
      {
        label: 'FastAPI — modern Python API framework, deployed on Render',
        isText: true,
        text: [
          'FastAPI is a modern Python framework for building REST APIs.',
          'It is faster than Flask and Django for pure API projects.',
          '',
          'Why FastAPI is popular for students:',
          '→ Automatic Swagger UI at /docs — test all endpoints in the browser',
          '→ Automatic ReDoc documentation at /redoc',
          '→ Type hints and Pydantic validation — fewer bugs, cleaner code',
          '→ Very fast to build endpoints',
          '→ Popular for AI/ML projects — serving prediction APIs',
          '→ ASGI-based — handles async code properly',
          '',
          'FastAPI uses Uvicorn as its ASGI server.',
          '(Django and Flask use Gunicorn/WSGI — different server for FastAPI.)',
          '',
          'Render supports Python natively — no Docker needed.',
          '',
          'What you get free on Render:',
          '✅ Live HTTPS URL — your-api.onrender.com',
          '✅ Auto-deploy on every GitHub push',
          '✅ Python runtime auto-detected from requirements.txt',
          '✅ Environment variables in the dashboard',
          '✅ Logs tab to debug errors',
          '✅ Working /docs and /redoc on your live URL',
          '',
          'Honest free-tier note:',
          '→ Free services sleep after 15 min of no requests',
          '→ First request after sleep takes 30-60 seconds to wake up',
          '→ Not ideal for serious production or business apps',
          '→ For student demos and learning projects: usually enough',
        ],
        note: 'FastAPI /docs is available on your live Render URL too. Share it with teammates or include the link in your README so others can test your API without Postman.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Before deployment — checklist',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Verify your FastAPI app is ready before touching Render',
        isText: true,
        text: [
          '✅ Virtual environment activated:',
          '   source venv/bin/activate      (macOS/Linux)',
          '   venv\\Scripts\\activate         (Windows)',
          '',
          '✅ uvicorn main:app --reload runs at http://localhost:8000',
          '✅ / route returns { "status": "ok" }',
          '✅ /health route returns { "status": "healthy" }',
          '✅ /docs loads Swagger UI with all your endpoints',
          '✅ All endpoints tested in Swagger UI or Postman',
          '✅ Database connection works locally (if using one)',
          '',
          '✅ requirements.txt is current:',
          '   pip freeze > requirements.txt',
          '',
          '✅ No passwords, secrets, or connection strings in any .py file',
          '✅ .env file exists with your local secrets',
          '✅ .gitignore excludes venv/, .env, and __pycache__/',
          '',
          'Rule: If it fails locally, it fails on Render.',
          'Fix all local errors before pushing to GitHub.',
        ],
        note: 'The most common reason FastAPI deployments fail on Render is that something was never tested locally. Run uvicorn main:app --reload and test every endpoint before pushing.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Install required packages',
    color: '#60A5FA',
    steps: [
      {
        label: 'Install core FastAPI production packages',
        commands: [
          `pip install fastapi "uvicorn[standard]" python-decouple`,
          `# For MongoDB (async driver — preferred for FastAPI):
pip install motor`,
          `# For PostgreSQL (sync):
pip install sqlalchemy psycopg2-binary`,
          `# For PostgreSQL (async):
pip install sqlalchemy asyncpg`,
          `pip freeze > requirements.txt`,
        ],
        note: 'Always run pip freeze > requirements.txt after installing packages. Render reads requirements.txt to install your dependencies. If a package is missing from this file, the deployment fails.',
      },
      {
        label: 'What each package does',
        isText: true,
        text: [
          'fastapi',
          '   The API framework — handles routes, middleware, request validation.',
          '',
          '"uvicorn[standard]"',
          '   ASGI server that runs FastAPI.',
          '   The [standard] extras include uvloop and httptools for better performance.',
          '   This is what Render uses to start your app.',
          '',
          'python-decouple',
          '   Reads variables from .env file locally.',
          '   On Render, reads from environment variables set in the dashboard.',
          '   Use: from decouple import config  →  config("MY_VAR")',
          '',
          'motor',
          '   Async MongoDB driver — designed for FastAPI (async framework).',
          '   Do NOT use pymongo (synchronous) with FastAPI async routes.',
          '',
          'sqlalchemy',
          '   ORM/query toolkit for SQL databases (PostgreSQL, MySQL, SQLite).',
          '',
          'psycopg2-binary',
          '   Synchronous PostgreSQL driver.',
          '',
          'asyncpg',
          '   Async PostgreSQL driver — better performance with FastAPI async routes.',
        ],
        note: 'After any new pip install, run pip freeze > requirements.txt and commit both requirements.txt and the code change together.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Project structure',
    color: '#F59E0B',
    steps: [
      {
        label: 'Recommended folder structure for beginners',
        isText: true,
        text: [
          'fastapi-app/',
          '  main.py            ← FastAPI app object lives here',
          '  requirements.txt   ← all dependencies',
          '  Procfile           ← tells Render how to start the app',
          '  .env               ← local secrets (NEVER commit)',
          '  .env.example       ← template with placeholder values (commit this)',
          '  .gitignore         ← excludes venv, .env, __pycache__',
          '  routes/            ← route files (users.py, products.py)',
          '  models/            ← Pydantic request/response models',
          '  schemas/           ← database schema models',
          '  database.py        ← database connection and session',
          '',
          'Key rules:',
          '→ main.py must contain the FastAPI app object named "app"',
          '   (or update the Procfile to match your actual file and variable name)',
          '→ All secrets come from environment variables, never from the code',
          '→ requirements.txt must list every package used in production code',
        ],
        note: 'Keep main.py at the root of your project (same level as requirements.txt). If it is inside a subfolder, update the Procfile and set Root Directory in Render.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Create production-ready main.py',
    color: '#EC4899',
    steps: [
      {
        label: 'Complete main.py with CORS, health check, and MongoDB',
        isFile: true,
        fileName: 'main.py',
        commands: [
          `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from decouple import config

app = FastAPI(
    title="My FastAPI Project",
    version="1.0.0",
    description="Student API project"
)

# ── CORS ────────────────────────────────────────────────
# Reads from CORS_ORIGINS env var — comma-separated URLs
cors_origins_raw = config("CORS_ORIGINS", default="http://localhost:5173")
cors_origins = [o.strip() for o in cors_origins_raw.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routes ───────────────────────────────────────────────
@app.get("/")
def root():
    return {"status": "ok", "message": "FastAPI backend is running"}

@app.get("/health")
def health():
    return {"status": "healthy"}

# Add your routers here:
# from routes import users, products
# app.include_router(users.router, prefix="/api/users", tags=["users"])

# ── MongoDB startup/shutdown ────────────────────────────
# Remove this section if you are NOT using MongoDB
from motor.motor_asyncio import AsyncIOMotorClient

@app.on_event("startup")
async def startup_db():
    mongodb_uri = config("MONGODB_URI", default=None)
    db_name     = config("DB_NAME", default="mydb")
    if mongodb_uri:
        app.mongodb_client = AsyncIOMotorClient(mongodb_uri)
        app.mongodb = app.mongodb_client[db_name]
        print("MongoDB connected")
    else:
        print("No MONGODB_URI set — database not connected")

@app.on_event("shutdown")
async def shutdown_db():
    if hasattr(app, "mongodb_client"):
        app.mongodb_client.close()
        print("MongoDB connection closed")`,
        ],
        note: 'Remove the MongoDB startup/shutdown section if you are not using MongoDB. The CORS origins list is built from the CORS_ORIGINS env var — set it in .env locally and in Render for production.',
      },
      {
        label: 'Why each critical part matters',
        isText: true,
        text: [
          'CORSMiddleware:',
          '   Allows your React/Vite frontend (Vercel) to call this API.',
          '   Without it, browser blocks every API request from a different domain.',
          '',
          'CORS_ORIGINS from env var:',
          '   Locally: CORS_ORIGINS=http://localhost:5173',
          '   Production: CORS_ORIGINS=https://yourfrontend.vercel.app',
          '   Never hardcode URLs — they change between local and production.',
          '',
          '/ route:',
          '   Confirms the API is running. Use it to test after deploy.',
          '',
          '/health route:',
          '   Lightweight 200 endpoint. No DB query.',
          '   Use this URL in cron-job.org to keep the service awake.',
          '',
          '/docs (automatic):',
          '   FastAPI generates Swagger UI automatically — no code needed.',
          '   Available at https://your-api.onrender.com/docs',
          '',
          'Motor startup/shutdown:',
          '   Opens one database connection when the app starts.',
          '   Closes it cleanly when the app stops.',
          '   This is the correct pattern for FastAPI + MongoDB.',
        ],
        note: 'Never return raw secrets (MONGODB_URI, JWT_SECRET) in any API response. API responses are public — anyone who calls your endpoint can read the JSON.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Create .env and .env.example',
    color: '#A78BFA',
    steps: [
      {
        label: '.env — local development, NEVER commit',
        isFile: true,
        fileName: '.env',
        commands: [
          `MONGODB_URI=mongodb+srv://user:password@cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
DB_NAME=mydb
JWT_SECRET=local-dev-secret-change-this
CORS_ORIGINS=http://localhost:5173
ENVIRONMENT=development`,
        ],
        note: '.env is for your local machine only. On Render, these values are set in the Environment tab of the dashboard. Never push .env to GitHub.',
      },
      {
        label: '.env.example — always commit this',
        isFile: true,
        fileName: '.env.example',
        commands: [
          `# Copy this to .env and fill in your real values

MONGODB_URI=your_mongodb_connection_string
DB_NAME=mydb
JWT_SECRET=your_random_secret_50_chars_minimum
CORS_ORIGINS=http://localhost:5173
ENVIRONMENT=development`,
        ],
        note: '.env.example contains only placeholder values — no real secrets. Always commit this. Add a README note: "Copy .env.example to .env and fill in your values."',
      },
    ],
  },

  {
    phase: '07',
    title: 'Create .gitignore',
    color: '#F59E0B',
    steps: [
      {
        label: '.gitignore for Python/FastAPI projects',
        isFile: true,
        fileName: '.gitignore',
        commands: [
          `# Python bytecode
__pycache__/
*.py[cod]
*.pyo
*.pyd

# Virtual environments
venv/
env/
.venv/
ENV/

# Environment variable files — NEVER commit
.env
.env.local
.env.*

# Local database files
*.sqlite3
*.db

# OS files
.DS_Store
Thumbs.db

# Test and type checker caches
.pytest_cache/
.mypy_cache/`,
        ],
        note: 'venv/ can contain thousands of files and hundreds of MB. Render installs packages from requirements.txt automatically — never commit venv. __pycache__/ is Python bytecode and auto-generated.',
      },
      {
        label: 'Verify .gitignore before committing',
        commands: [
          `git add .`,
          `git status`,
        ],
        note: 'After "git add ." run "git status". If .env or venv/ appear — STOP. Fix .gitignore, run "git rm --cached .env", then recommit. Never push until they are gone.',
      },
    ],
  },

  {
    phase: '08',
    title: 'Create Procfile',
    color: '#4ADE80',
    steps: [
      {
        label: 'Procfile — tells Render how to start FastAPI',
        isFile: true,
        fileName: 'Procfile',
        commands: [
          `web: uvicorn main:app --host 0.0.0.0 --port $PORT`,
        ],
        note: 'Place Procfile at the root of your project (same level as main.py and requirements.txt). Do NOT add --reload in the Procfile — that is for local development only.',
      },
      {
        label: 'Understanding the Procfile command',
        isText: true,
        text: [
          'web: uvicorn main:app --host 0.0.0.0 --port $PORT',
          '',
          'Breaking it down:',
          '   uvicorn    = the ASGI server that runs FastAPI',
          '   main       = your Python file name (main.py, without .py)',
          '   app        = the FastAPI app variable in that file',
          '   --host 0.0.0.0 = accepts traffic from any network interface (required for Render)',
          '   --port $PORT   = Render injects PORT automatically as an env var',
          '',
          'If your file is app.py with FastAPI app named api:',
          '   web: uvicorn app:api --host 0.0.0.0 --port $PORT',
          '',
          'If your main file is inside a folder (e.g., src/main.py):',
          '   web: uvicorn src.main:app --host 0.0.0.0 --port $PORT',
          '   (use dot notation, not slash)',
          '',
          'NEVER hardcode a port number:',
          '   Wrong: uvicorn main:app --host 0.0.0.0 --port 8000',
          '   Right: uvicorn main:app --host 0.0.0.0 --port $PORT',
          '',
          'Render injects PORT as an environment variable.',
          'Hardcoding 8000 causes Render to report "no open ports detected".',
        ],
        note: 'The Procfile is the most common source of FastAPI deployment failures. Double-check: correct file name, correct app variable name, $PORT not 8000.',
      },
    ],
  },

  {
    phase: '09',
    title: 'If you accidentally pushed a secret to GitHub',
    color: '#EF4444',
    steps: [
      {
        label: 'Deleting in a new commit is NOT enough — act immediately',
        isText: true,
        text: [
          'If .env, MONGODB_URI, DATABASE_URL, JWT_SECRET, or any password',
          'was committed to GitHub:',
          '',
          'Deleting it in a new commit does NOT make it safe.',
          'The secret still exists in every previous Git commit.',
          'Anyone can run git log and read the full history.',
          '',
          'Bots scan GitHub for exposed secrets within minutes of a push.',
          'Assume the secret is already compromised.',
          '',
          'Step 1 — ROTATE the exposed secret immediately:',
          '   MongoDB password: Atlas → Database Access → Edit user → New password',
          '   DATABASE_URL: change password in Neon/Supabase/Render dashboard',
          '   JWT_SECRET: generate a new one (all existing tokens become invalid)',
          '   API key: go to provider and regenerate',
          '',
          'Step 2 — Remove .env from Git tracking:',
        ],
        note: 'Rotating the secret is mandatory even if you later clean Git history. Old credentials may already be scraped. Always generate fresh secrets after a leak.',
      },
      {
        label: 'Commands to remove .env from Git',
        commands: [
          `git rm --cached .env`,
          `git commit -m "remove .env from git tracking"`,
          `git push`,
          `git log --all -- .env`,
          `git grep "OLD_SECRET_VALUE" $(git rev-list --all)`,
        ],
        note: 'git rm --cached removes .env from tracking but keeps your local file. After this commit, .env will never be staged again.',
      },
      {
        label: 'Clean Git history if secret is in old commits',
        isText: true,
        text: [
          'If git log shows old commits containing the file:',
          '',
          'Option A — git-filter-repo (recommended):',
          '   pip install git-filter-repo',
          '   git filter-repo --path .env --invert-paths',
          '   git push --force',
          '',
          'Option B — BFG Repo Cleaner:',
          '   java -jar bfg.jar --delete-files .env',
          '   git reflog expire --expire=now --all',
          '   git gc --prune=now --aggressive',
          '   git push --force',
          '',
          'Force push rewrites all commit history on GitHub.',
          'Collaborators must re-clone after force push.',
          '',
          'Even after cleaning history:',
          'The old exposed secret must still be rotated.',
          'Cleaning history does NOT make leaked credentials safe again.',
        ],
        note: 'For solo student projects: rotate → git filter-repo → generate new secrets → store only in .env locally and in Render dashboard.',
      },
    ],
  },

  {
    phase: '10',
    title: 'Database — MongoDB Atlas',
    color: '#00ED64',
    steps: [
      {
        label: 'Set up MongoDB Atlas for FastAPI',
        isText: true,
        text: [
          '1. cloud.mongodb.com → Sign up free (no credit card)',
          '2. Create M0 free cluster → choose nearest region',
          '3. Security → Database Access → Add New User',
          '   → Autogenerate password → COPY and SAVE it',
          '   → Role: "Read and write to any database"',
          '4. Security → Network Access → Add IP Address',
          '   → "Allow Access from Anywhere" (0.0.0.0/0)',
          '   → Required — Render uses dynamic IPs that cannot be whitelisted',
          '5. Connect → Drivers → Python → copy connection string:',
          '   mongodb+srv://user:<password>@cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority',
          '6. Replace <password> with your actual password',
          '7. Use this as MONGODB_URI in .env locally and Render env vars',
          '',
          'In main.py (already shown in Phase 05):',
          '   Use motor (async driver) — NOT pymongo (sync)',
          '   FastAPI is async — motor is the correct choice',
          '',
          'Security warning:',
          '   0.0.0.0/0 is convenient for student demos but not ideal for production.',
          '   The database user password is your real security layer.',
          '   Use a strong autogenerated password.',
          '   Never put MONGODB_URI in any Python file — always from env vars.',
        ],
        note: 'MongoDB Atlas M0 free tier: 512MB, free forever, no credit card. Motor (async MongoDB driver) is the correct choice for FastAPI — it works with async/await naturally.',
      },
    ],
  },

  {
    phase: '11',
    title: 'Database — PostgreSQL',
    color: '#60A5FA',
    steps: [
      {
        label: 'PostgreSQL options for FastAPI',
        isText: true,
        text: [
          'Use PostgreSQL if your project needs relational/structured data.',
          '',
          'Free PostgreSQL options:',
          '→ Neon (neon.tech): 0.5GB/project, data preserved, serverless',
          '   DATABASE_URL=postgresql://user:pass@ep-xxx.aws.neon.tech/neondb?sslmode=require',
          '',
          '→ Render PostgreSQL: 1GB free, expires 30 days',
          '   DATABASE_URL=postgresql://user:pass@dpg-xxx.render.com:5432/mydb',
          '',
          '→ Supabase: PostgreSQL + auth + storage',
          '',
          'Store as DATABASE_URL in .env and Render env vars.',
          '',
          'Install for synchronous SQLAlchemy:',
          '   pip install sqlalchemy psycopg2-binary',
          '',
          'Install for async SQLAlchemy:',
          '   pip install sqlalchemy asyncpg',
          '',
          'Always add ?sslmode=require to Neon/Render PostgreSQL URLs.',
          'Without it, the SSL handshake fails and the connection is rejected.',
          '',
          'For simple student FastAPI projects:',
          '   MongoDB Atlas is often easier to start with (no schema setup)',
          '   PostgreSQL is better for structured/relational data',
        ],
        note: 'DATABASE_URL must never be hardcoded. Store it in .env locally and set it in Render environment variables. Always use python-decouple: config("DATABASE_URL").',
      },
    ],
  },

  {
    phase: '12',
    title: 'Test locally before pushing',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Set up virtual environment and run locally',
        commands: [
          `# Create virtual environment
python -m venv venv`,
          `# Activate — macOS/Linux
source venv/bin/activate

# Activate — Windows
venv\\Scripts\\activate`,
          `# Install from requirements.txt
pip install -r requirements.txt`,
          `# Run FastAPI with hot-reload
uvicorn main:app --reload`,
        ],
        note: 'Always activate venv before running uvicorn. --reload restarts automatically on file changes. Never use --reload in production (the Procfile does not include it).',
      },
      {
        label: 'What to test locally',
        isText: true,
        text: [
          '✅ http://localhost:8000/         → { "status": "ok" }',
          '✅ http://localhost:8000/health   → { "status": "healthy" }',
          '✅ http://localhost:8000/docs     → Swagger UI with all routes',
          '✅ Test each endpoint in Swagger UI or Postman',
          '✅ Database: create and read a test record',
          '✅ Check terminal: "MongoDB connected" or DB connection log',
          '',
          'Also test the production start command:',
          '   uvicorn main:app --host 0.0.0.0 --port 8000',
          '   (without --reload — matches the Procfile)',
          '   Confirm it works before pushing.',
          '',
          'Common local errors to fix:',
          '   ImportError — missing package in requirements.txt',
          '   ValueError — missing env var in .env',
          '   ConnectionError — wrong MONGODB_URI or DB URL',
          '   422 Unprocessable Entity — Pydantic validation failed on request',
        ],
        note: 'Test with the exact Procfile command (without --reload) before pushing. Render errors are much harder to debug than local errors.',
      },
    ],
  },

  {
    phase: '13',
    title: 'Push to GitHub',
    color: '#60A5FA',
    steps: [
      {
        label: 'Create GitHub repo and push',
        commands: [
          `git init`,
          `git add .`,
          `git status`,
          `git commit -m "fastapi app ready for production"`,
          `git branch -M main`,
          `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git`,
          `git push -u origin main`,
        ],
        note: 'After "git add ." run "git status". If .env or venv/ appear — STOP. Fix .gitignore and use "git rm --cached .env" before proceeding.',
      },
      {
        label: 'Verify GitHub repo after pushing',
        isText: true,
        text: [
          'Open your GitHub repository in the browser.',
          'Confirm these files are at the ROOT of the repo:',
          '',
          '   main.py          ← FastAPI app',
          '   requirements.txt ← packages',
          '   Procfile         ← start command',
          '   .env.example     ← committed',
          '   .gitignore       ← committed',
          '',
          'Files that must NOT be in GitHub:',
          '   .env             ← secrets',
          '   venv/            ← dependencies',
          '   __pycache__/     ← bytecode',
          '',
          'Common Git errors:',
          '   remote origin already exists:',
          '   → git remote remove origin  →  re-add',
          '',
          '   Authentication failed:',
          '   → Use Personal Access Token (not password)',
          '   → GitHub → Settings → Developer settings → Personal access tokens',
        ],
        note: 'If main.py is inside a subfolder (e.g., backend/main.py), you need to set Root Directory in Render settings. See the Common Errors phase.',
      },
    ],
  },

  {
    phase: '14',
    title: 'Deploy on Render',
    color: '#4ADE80',
    steps: [
      {
        label: 'Create a Python Web Service on Render',
        isText: true,
        text: [
          '1. render.com → sign up / login with GitHub',
          '2. New → Web Service',
          '3. Connect your GitHub repo → click "Connect"',
          '',
          '4. Configure:',
          '   Name:          your-fastapi-api',
          '   Region:        pick nearest to your users',
          '   Branch:        main',
          '   Runtime:       Python 3  (auto-detected from requirements.txt)',
          '   Build Command: pip install -r requirements.txt',
          '   Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT',
          '   (or leave empty if Procfile exists — Render reads it automatically)',
          '',
          '5. Environment Variables — add before deploying:',
          '   MONGODB_URI  = your Atlas connection string',
          '   DB_NAME      = your database name',
          '   JWT_SECRET   = 50+ random chars',
          '   CORS_ORIGINS = (leave for now — add Vercel URL after frontend deploy)',
          '   ENVIRONMENT  = production',
          '',
          '6. Click "Create Web Service"',
          '',
          '7. Watch Logs tab — look for:',
          '   "Application startup complete."',
          '   "Uvicorn running on http://0.0.0.0:XXXXX"',
          '   "MongoDB connected"',
          '',
          '8. Your API is live at:',
          '   https://your-fastapi-api.onrender.com',
        ],
        note: 'If Render does not auto-detect Python, select "Python 3" from the Runtime dropdown manually. The Procfile start command overrides the "Start Command" field if both are present.',
      },
    ],
  },

  {
    phase: '15',
    title: 'Add environment variables in Render',
    color: '#60A5FA',
    steps: [
      {
        label: 'Add all required variables in Render dashboard',
        isText: true,
        text: [
          'Render → your service → "Environment" tab → "Add Environment Variable"',
          '',
          'MONGODB_URI',
          '   Your full Atlas connection string:',
          '   mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/mydb?retryWrites=true&w=majority',
          '',
          'DB_NAME',
          '   Your database name: mydb  (or whatever you named it)',
          '',
          'JWT_SECRET',
          '   Generate: python -c "import secrets; print(secrets.token_hex(32))"',
          '   Must be 50+ random characters.',
          '',
          'CORS_ORIGINS',
          '   For local dev only: http://localhost:5173',
          '   After Vercel deploy: https://yourfrontend.vercel.app',
          '   For both: http://localhost:5173,https://yourfrontend.vercel.app',
          '   (comma-separated, no spaces)',
          '',
          'ENVIRONMENT',
          '   Value: production',
          '',
          'Do NOT set PORT:',
          '   Render injects PORT automatically.',
          '   Setting it manually can conflict with the injected value.',
          '',
          'After saving → Render auto-redeploys.',
        ],
        note: 'Environment variables on Render are encrypted at rest. They are injected safely into your Python process. They are NOT visible in build logs.',
      },
    ],
  },

  {
    phase: '16',
    title: 'Verify live API',
    color: '#34D399',
    steps: [
      {
        label: 'Test every part of your live FastAPI',
        isText: true,
        text: [
          '✅ Root: https://your-fastapi-api.onrender.com/',
          '   Should return: { "status": "ok", "message": "FastAPI backend is running" }',
          '',
          '✅ Health: https://your-fastapi-api.onrender.com/health',
          '   Should return: { "status": "healthy" }',
          '',
          '✅ Docs: https://your-fastapi-api.onrender.com/docs',
          '   Swagger UI should load with all your endpoints',
          '',
          '✅ Test each endpoint from Swagger UI:',
          '   → Click "Try it out" → fill in request body → "Execute"',
          '   → Check response code and body',
          '',
          '✅ Render Logs tab confirms:',
          '   "Application startup complete."',
          '   "MongoDB connected" (if using MongoDB)',
          '',
          'First request may take 30-60 seconds:',
          '   Render free services sleep after 15 min of inactivity.',
          '   This is normal — the service is waking up.',
          '   Subsequent requests are fast.',
          '',
          'If something fails:',
          '   Check Render Logs tab first — exact Python error is shown.',
          '   Most common: missing env var or package not in requirements.txt.',
        ],
        note: 'The /docs endpoint is your best debugging tool for a live API. It shows all routes, models, and lets you test everything without Postman. Share the /docs URL in your README.',
      },
    ],
  },

  {
    phase: '17',
    title: 'Connect React/Vite frontend',
    color: '#A78BFA',
    steps: [
      {
        label: 'Set VITE_API_URL and configure CORS',
        isFile: true,
        fileName: 'frontend/.env.production',
        commands: [
          `VITE_API_URL=https://your-fastapi-api.onrender.com`,
        ],
        note: 'Keep VITE_API_URL=http://localhost:8000 in your local frontend .env for development. Vite uses .env.production automatically for production builds.',
      },
      {
        label: 'CORS_ORIGINS rules',
        isText: true,
        text: [
          'After deploying the React frontend on Vercel, update CORS_ORIGINS in Render:',
          '',
          '   CORS_ORIGINS = https://yourfrontend.vercel.app',
          '',
          'Rules:',
          '   No trailing slash: https://yourfrontend.vercel.app    ✅',
          '   Trailing slash:    https://yourfrontend.vercel.app/   ❌',
          '',
          'For both local and production origins:',
          '   CORS_ORIGINS = http://localhost:5173,https://yourfrontend.vercel.app',
          '   (comma-separated, no spaces)',
          '',
          'In main.py, cors_origins is already built from this env var:',
          '   cors_origins_raw = config("CORS_ORIGINS", default="http://localhost:5173")',
          '   cors_origins = [o.strip() for o in cors_origins_raw.split(",") if o.strip()]',
          '',
          'VITE_ variables are NOT secret:',
          '   VITE_API_URL is a public URL — visible in browser bundle.',
          '   NEVER put MONGODB_URI, JWT_SECRET, or DATABASE_URL in any VITE_ variable.',
          '   Secrets belong only in Render environment variables.',
        ],
        note: 'After updating CORS_ORIGINS in Render, a new deployment is triggered automatically. Test the React → FastAPI connection by opening the browser Network tab and checking for CORS errors.',
      },
    ],
  },

  {
    phase: '18',
    title: 'Free tier and keep-awake',
    color: '#4ADE80',
    steps: [
      {
        label: 'Render free tier — honest explanation',
        isText: true,
        text: [
          'Render free Web Service:',
          '   Sleeps after 15 min of no requests.',
          '   First request after sleep: 30-60 seconds to wake up.',
          '   750 free instance hours/month (one service ≈ 744 hrs/month).',
          '   Shared CPU — performance can vary.',
          '   Not for production/business apps.',
          '   Good for: student demos, portfolios, learning projects.',
          '',
          'MongoDB Atlas M0 free:',
          '   512MB storage, free forever, no credit card.',
          '   Shared cluster — adequate for demos.',
          '',
          'For student projects: free tier is usually enough.',
          '',
          'When to consider upgrading:',
          '   You need guaranteed fast response times.',
          '   You need to handle real traffic or SLA guarantees.',
          '   Your project is beyond portfolio/demo stage.',
        ],
        note: 'Be honest in demos: "The backend is on Render free tier — the first request may take a moment while it wakes up." This shows real-world deployment awareness.',
      },
      {
        label: 'Keep awake with cron-job.org (optional)',
        isText: true,
        text: [
          'A free cron job that pings /health every 10 min keeps the service awake.',
          '',
          '1. cron-job.org → Sign up free (no credit card)',
          '2. Create Cronjob:',
          '   URL:      https://your-fastapi-api.onrender.com/health',
          '   Schedule: Every 10 minutes (Custom → Minutes: */10)',
          '3. Save and enable',
          '',
          'Things to know:',
          '   → Free with no limits for basic jobs',
          '   → Uses your 750 free instance hours/month more quickly',
          '   → Does not guarantee zero cold starts — reduces their frequency',
          '   → Not mandatory — just open the URL 1 min before a demo instead',
          '',
          'The /health endpoint is ideal for this:',
          '   → Lightweight — no DB query, responds instantly',
          '   → Returns 200 OK confirming the service is alive',
        ],
        note: 'cron-job.org is optional. For demo presentations, just open your API URL 1 minute before showing it to pre-warm the service.',
      },
    ],
  },

  {
    phase: '19',
    title: 'Common errors and fixes',
    color: '#F97316',
    steps: [
      {
        label: 'Error 1 — ModuleNotFoundError',
        isText: true,
        text: [
          'Problem: Render logs show "ModuleNotFoundError: No module named X".',
          'Cause: Package not in requirements.txt.',
          '',
          'Fix:',
          '   pip install package-name',
          '   pip freeze > requirements.txt',
          '   git add requirements.txt',
          '   git commit -m "add missing package"',
          '   git push',
          '',
          'Important: devDependencies do not exist in Python.',
          'Every package your code imports must be in requirements.txt.',
        ],
        note: '',
      },
      {
        label: 'Error 2 — uvicorn: command not found',
        isText: true,
        text: [
          'Problem: Render cannot find uvicorn.',
          'Cause: uvicorn not in requirements.txt.',
          '',
          'Fix:',
          '   pip install "uvicorn[standard]"',
          '   pip freeze > requirements.txt',
          '   Commit and push requirements.txt.',
          '',
          'Verify requirements.txt contains a line like:',
          '   uvicorn==0.xx.x',
        ],
        note: '',
      },
      {
        label: 'Error 3 — No open ports / 502 Bad Gateway',
        isText: true,
        text: [
          'Problem: Render says "No open ports detected" or all requests return 502.',
          'Cause: Start command uses wrong port or missing --host 0.0.0.0.',
          '',
          'Fix: Verify Procfile or Start Command is exactly:',
          '   uvicorn main:app --host 0.0.0.0 --port $PORT',
          '',
          'Must have both:',
          '   --host 0.0.0.0  (accepts external traffic)',
          '   --port $PORT    (uses Render-injected port)',
          '',
          'Wrong: --port 8000  →  Render routes to a different port',
        ],
        note: 'This is the #1 FastAPI deployment error on Render. Always use $PORT.',
      },
      {
        label: 'Error 4 — Application failed to start',
        isText: true,
        text: [
          'Problem: App startup fails in Render logs.',
          '',
          'Cause A: File name or app variable name is wrong in Procfile.',
          '   File is app.py, app variable is api:',
          '   Fix: uvicorn app:api --host 0.0.0.0 --port $PORT',
          '',
          'Cause B: Import error in main.py',
          '   Fix: Run uvicorn main:app locally and read the exact error.',
          '',
          'Cause C: Missing environment variable',
          '   config("SOME_VAR") crashes if the var is not set and no default.',
          '   Fix: Add the variable in Render env vars.',
          '   Or add a default: config("SOME_VAR", default=None)',
        ],
        note: '',
      },
      {
        label: 'Error 5 — CORS blocked by browser',
        isText: true,
        text: [
          'Problem: Browser console shows "blocked by CORS policy".',
          'Cause: CORS_ORIGINS does not include the frontend URL exactly.',
          '',
          'Fix:',
          '   Set CORS_ORIGINS in Render to exact Vercel URL:',
          '   https://yourfrontend.vercel.app',
          '   (no trailing slash)',
          '',
          'CORS errors appear in browser console (F12 → Console),',
          'NOT in Render Logs. Always check browser DevTools first.',
        ],
        note: '',
      },
      {
        label: 'Error 6 — Database connection failed',
        isText: true,
        text: [
          'Problem: "MongoDB connection error" or DB query crashes on Render.',
          '',
          'Cause 1: MONGODB_URI not set in Render env vars.',
          '   Fix: Render → Environment → add MONGODB_URI.',
          '',
          'Cause 2: Password wrong or <password> not replaced.',
          '   Fix: Re-copy from Atlas, replace <password> exactly.',
          '',
          'Cause 3: Special characters in password.',
          '   Fix: Autogenerate password with letters/numbers only.',
          '',
          'Cause 4: Atlas Network Access blocking Render.',
          '   Fix: Atlas → Network Access → allow 0.0.0.0/0.',
          '',
          'Cause 5: PostgreSQL missing ?sslmode=require.',
          '   Fix: Append ?sslmode=require to DATABASE_URL.',
        ],
        note: '',
      },
      {
        label: 'Error 7 — .env works locally but not on Render',
        isText: true,
        text: [
          'Problem: App works locally but crashes on Render with undefined env vars.',
          'Cause: .env file works locally (python-decouple reads it) but Render',
          'does NOT deploy your .env file.',
          '',
          'Fix: Add every .env variable to Render Environment tab.',
          '   Render → your service → Environment → Add each variable.',
          '',
          'Rule: Every variable in your .env must be manually added in Render.',
          'Render has no knowledge of your .env file — it is gitignored.',
        ],
        note: '',
      },
      {
        label: 'Error 8 — .env accidentally pushed',
        isText: true,
        text: [
          'Problem: .env file visible on GitHub.',
          'Cause: .gitignore was missing or added after the first commit.',
          '',
          'Fix: See Phase 09 immediately.',
          '   1. Rotate all secrets',
          '   2. git rm --cached .env',
          '   3. git commit and push',
          '   4. Clean Git history if repo is public',
        ],
        note: '',
      },
      {
        label: 'Error 9 — FastAPI app in a subfolder',
        isText: true,
        text: [
          'Problem: Render cannot find requirements.txt or main.py.',
          'Cause: FastAPI app is inside a backend/ folder in a monorepo.',
          '',
          'Fix A: Set Root Directory in Render.',
          '   Render → your service → Settings → Root Directory → set to: backend',
          '',
          'Fix B: Update Procfile to use dot notation for nested module:',
          '   web: uvicorn backend.main:app --host 0.0.0.0 --port $PORT',
        ],
        note: '',
      },
      {
        label: 'Error 10 — /docs not loading',
        isText: true,
        text: [
          'Problem: https://your-api.onrender.com/docs returns 404 or error.',
          '',
          'Cause 1: App failed to start (other errors in logs).',
          '   Fix: Check Render Logs for startup errors first.',
          '',
          'Cause 2: Wrong URL.',
          '   Verify: https://your-api.onrender.com/docs (no trailing slash needed)',
          '   Not: https://your-api.onrender.com/api/docs',
          '',
          'Cause 3: docs disabled in FastAPI constructor.',
          '   Check main.py: app = FastAPI(docs_url=None) disables docs.',
          '   Remove docs_url=None to re-enable.',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '20',
    title: 'Final deployment checklist',
    color: '#34D399',
    steps: [
      {
        label: 'Verify all items before sharing your live API',
        isText: true,
        text: [
          '── requirements.txt ──────────────────────────────────',
          '  fastapi is listed',
          '  uvicorn is listed',
          '  All other packages are listed',
          '  No missing imports when running locally',
          '',
          '── Procfile / Start Command ───────────────────────────',
          '  Uses uvicorn main:app --host 0.0.0.0 --port $PORT',
          '  File name and app variable match actual main.py',
          '  No --reload flag',
          '',
          '── Security ──────────────────────────────────────────',
          '  .env NOT in GitHub',
          '  .env.example IS in GitHub',
          '  venv/ NOT in GitHub',
          '  __pycache__/ NOT in GitHub',
          '  No secrets in any Python file',
          '  No secrets in Git history',
          '',
          '── Render environment variables ─────────────────────',
          '  MONGODB_URI or DATABASE_URL set',
          '  JWT_SECRET set (50+ random chars)',
          '  CORS_ORIGINS set (Vercel URL, no trailing slash)',
          '  ENVIRONMENT = production',
          '  PORT not set manually (Render injects it)',
          '',
          '── Live verification ─────────────────────────────────',
          '  / returns { "status": "ok" }',
          '  /health returns { "status": "healthy" }',
          '  /docs loads Swagger UI with all endpoints',
          '  All endpoints return correct responses',
          '  Database reads and writes work',
          '  CORS works with React frontend',
          '  Render Logs are clean (no errors)',
          '',
          'Add live URL to:',
          '  GitHub README and repo description',
          '  Resume under your project',
          '  LinkedIn Projects section',
        ],
        note: 'A deployed FastAPI with working /docs, database, and CORS is an impressive backend portfolio project. The live /docs URL is a great thing to show in interviews.',
      },
    ],
  },
]

// ─── Flask → Render ───────────────────────────────────────────────────────────
