export const FLASK_GUIDE = [
  {
    phase: '01',
    title: 'What is Flask on Render?',
    color: '#F97316',
    steps: [
      {
        label: 'Flask — lightweight Python backend, deployed on Render',
        isText: true,
        text: [
          'Flask is a lightweight Python WSGI web framework.',
          'It is minimal by design — you build exactly what you need.',
          '',
          'Flask vs other Python frameworks:',
          '→ Flask: minimal, you add what you need, WSGI (sync)',
          '→ Django: full-featured, batteries included, WSGI',
          '→ FastAPI: modern, async, auto-docs at /docs, ASGI',
          '',
          'Flask is the right choice when:',
          '→ Your project is already built with Flask',
          '→ You want a simple REST API without Django complexity',
          '→ Quick college projects or Python backend prototypes',
          '',
          'Important: Never use Flask built-in development server in production.',
          'Flask\'s flask run / app.run() is for local development ONLY.',
          'Production Flask apps run with Gunicorn (WSGI server).',
          'Render uses Gunicorn to run your Flask app.',
          '',
          'Render supports Python natively — no Docker needed.',
          '',
          'What you get free on Render:',
          '✅ Live HTTPS URL — your-flask-api.onrender.com',
          '✅ Auto-deploy on every GitHub push',
          '✅ Python runtime auto-detected from requirements.txt',
          '✅ Environment variables stored safely in dashboard',
          '✅ Logs tab to debug errors in real time',
          '',
          'Honest free-tier note:',
          '→ Free services sleep after 15 min of no requests',
          '→ First request after sleep takes 30-60 seconds to wake up',
          '→ Not ideal for serious production or business apps',
          '→ For student demos and learning projects: usually enough',
        ],
        note: 'If you are starting a new Python project from scratch, consider FastAPI (modern, automatic /docs) or Django (full admin + ORM). Flask is the correct guide if your project is already built with it.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Before deployment — checklist',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Verify your Flask app is ready before touching Render',
        isText: true,
        text: [
          '✅ Virtual environment activated:',
          '   source venv/bin/activate      (macOS/Linux)',
          '   venv\\Scripts\\activate         (Windows)',
          '',
          '✅ Flask app runs locally:',
          '   python app.py                 (direct run)',
          '   OR: flask --app app run       (flask CLI)',
          '✅ All routes respond correctly',
          '✅ No 500 errors in terminal when testing endpoints',
          '',
          '✅ requirements.txt is current:',
          '   pip freeze > requirements.txt',
          '',
          '✅ gunicorn is in requirements.txt',
          '   (If not: pip install gunicorn && pip freeze > requirements.txt)',
          '',
          '✅ No passwords, secrets, or DB URLs in any .py file',
          '✅ .env file exists with your local secrets',
          '✅ .gitignore excludes venv/, .env, and __pycache__/',
          '',
          '✅ debug=False in production code',
          '   app.run(debug=True) must NEVER be in Render-deployed code',
          '',
          'Rule: If it fails locally, it fails on Render.',
          'Fix all local errors before pushing to GitHub.',
        ],
        note: 'Test with gunicorn locally before pushing: gunicorn app:app. If gunicorn fails locally, it fails on Render too — catching it here saves deployment debugging time.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Install required packages',
    color: '#60A5FA',
    steps: [
      {
        label: 'Install core Flask production packages',
        commands: [
          `pip install flask gunicorn python-decouple flask-cors`,
          `# For MongoDB:
pip install pymongo`,
          `# For PostgreSQL:
pip install flask-sqlalchemy psycopg2-binary`,
          `pip freeze > requirements.txt`,
        ],
        note: 'Always run pip freeze > requirements.txt after installing packages. Render reads requirements.txt to install everything. If a package is missing from this file, deployment fails.',
      },
      {
        label: 'What each package does',
        isText: true,
        text: [
          'flask',
          '   The web framework — handles routes, middleware, request/response.',
          '',
          'gunicorn',
          '   Production WSGI server that runs Flask.',
          '   Flask built-in server (flask run) is for development ONLY.',
          '   Render uses Gunicorn to serve your app in production.',
          '',
          'python-decouple',
          '   Reads variables from .env file locally.',
          '   On Render, reads from environment variables in the dashboard.',
          '   Use: from decouple import config  →  config("MY_VAR")',
          '',
          'flask-cors',
          '   Allows your React/Vite frontend (Vercel) to call this API.',
          '   Without it, the browser blocks every cross-origin API request.',
          '',
          'pymongo',
          '   Official MongoDB driver for Python — synchronous.',
          '   Correct choice for Flask (synchronous framework).',
          '   Do NOT use motor (async) with Flask — Flask is sync.',
          '',
          'flask-sqlalchemy',
          '   ORM for SQL databases with Flask integration.',
          '',
          'psycopg2-binary',
          '   PostgreSQL driver — required to connect Flask to any Postgres DB.',
        ],
        note: 'pymongo (synchronous) is the correct MongoDB driver for Flask. Motor (async) is for FastAPI. Using the wrong driver causes issues.',
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
          'flask-app/',
          '  app.py             ← Flask app instance lives here',
          '  requirements.txt   ← all dependencies',
          '  Procfile           ← tells Render how to start the app',
          '  .env               ← local secrets (NEVER commit)',
          '  .env.example       ← template with placeholders (commit this)',
          '  .gitignore         ← excludes venv, .env, __pycache__',
          '  routes/            ← Blueprint files (users.py, products.py)',
          '  models/            ← database models',
          '  database.py        ← database connection code',
          '',
          'Key rules:',
          '→ app.py must contain the Flask app instance named "app"',
          '   (or update the Procfile to match your file and variable name)',
          '→ All secrets come from environment variables, never from code',
          '→ requirements.txt must list every package used in production',
          '→ Procfile must exist at the same level as app.py and requirements.txt',
        ],
        note: 'Keep app.py at the root of your project (same level as requirements.txt). If it is inside a subfolder, set Root Directory in Render settings.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Create production-ready app.py',
    color: '#EC4899',
    steps: [
      {
        label: 'Complete app.py with CORS, health check, and MongoDB',
        isFile: true,
        fileName: 'app.py',
        commands: [
          `from flask import Flask, jsonify
from flask_cors import CORS
from decouple import config

app = Flask(__name__)

# ── Configuration ─────────────────────────────────────
app.config["SECRET_KEY"] = config("SECRET_KEY", default="unsafe-local-secret")

# ── CORS ──────────────────────────────────────────────
cors_origins_raw = config("CORS_ORIGINS", default="http://localhost:5173")
cors_origins = [o.strip() for o in cors_origins_raw.split(",") if o.strip()]

CORS(app, origins=cors_origins, supports_credentials=True)

# ── MongoDB connection ─────────────────────────────────
# Remove this section if you are NOT using MongoDB
from pymongo import MongoClient

mongodb_uri = config("MONGODB_URI", default=None)
db_name     = config("DB_NAME", default="flaskdb")

if mongodb_uri:
    mongo_client = MongoClient(mongodb_uri)
    db = mongo_client[db_name]
    print("MongoDB connected")
else:
    db = None
    print("No MONGODB_URI set — database not connected")

# ── Routes ────────────────────────────────────────────
@app.route("/")
def index():
    return jsonify({"status": "ok", "message": "Flask API is running"})

@app.route("/health")
def health():
    return jsonify({"status": "healthy"})

@app.route("/api/test")
def test_api():
    return jsonify({"message": "API endpoint working"})

# Register blueprints here (if using):
# from routes.users import users_bp
# app.register_blueprint(users_bp, url_prefix="/api/users")

# ── Local run only ─────────────────────────────────────
# Gunicorn does NOT use app.run() — this block is for local python app.py
if __name__ == "__main__":
    port = int(config("PORT", default=5000))
    app.run(host="0.0.0.0", port=port, debug=False)`,
        ],
        note: 'Remove the MongoDB section if you are not using a database. The if __name__ == "__main__" block is for local testing only — Gunicorn never calls it in production.',
      },
      {
        label: 'Why each part matters',
        isText: true,
        text: [
          'SECRET_KEY from env var:',
          '   Flask uses SECRET_KEY for session signing and security.',
          '   Never hardcode a real secret — use config("SECRET_KEY").',
          '',
          'CORS from env var:',
          '   cors_origins_raw.split(",") supports multiple origins.',
          '   Locally: CORS_ORIGINS=http://localhost:5173',
          '   Production: CORS_ORIGINS=https://yourfrontend.vercel.app',
          '',
          '/health route:',
          '   Lightweight 200 endpoint — no DB query.',
          '   Use this URL in cron-job.org to keep the service awake.',
          '',
          'if __name__ == "__main__":',
          '   This block runs ONLY when you do python app.py locally.',
          '   Gunicorn ignores this block entirely.',
          '   debug=False is set here to prevent accidental debug mode.',
          '',
          'MongoDB at module level:',
          '   MongoClient connects when Gunicorn imports the module.',
          '   The if mongodb_uri check prevents crashes if no URI is set.',
          '',
          'Never put app.run() outside the __name__ guard:',
          '   Gunicorn imports app.py as a module.',
          '   app.run() outside the guard would start a second server — conflict.',
        ],
        note: 'debug=True must NEVER reach production. With debug=True enabled, Flask exposes an interactive debugger in the browser that allows arbitrary code execution.',
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
          `SECRET_KEY=local-dev-secret-change-this
MONGODB_URI=mongodb+srv://user:password@cluster.xxxxx.mongodb.net/flaskdb?retryWrites=true&w=majority
DB_NAME=flaskdb
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

SECRET_KEY=your_random_secret_50_chars_minimum
MONGODB_URI=your_mongodb_connection_string
DB_NAME=flaskdb
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
        label: '.gitignore for Python/Flask projects',
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

# Flask instance folder (may contain local config)
instance/

# OS files
.DS_Store
Thumbs.db

# Test caches
.pytest_cache/
.mypy_cache/`,
        ],
        note: 'venv/ can contain thousands of files and hundreds of MB. Render installs packages from requirements.txt automatically — never commit venv. The Flask instance/ folder may contain local config or secrets.',
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
        label: 'Procfile — tells Render how to start Flask with Gunicorn',
        isFile: true,
        fileName: 'Procfile',
        commands: [
          `web: gunicorn app:app --bind 0.0.0.0:$PORT`,
        ],
        note: 'Place Procfile at the root (same level as app.py and requirements.txt). No file extension. The --bind 0.0.0.0:$PORT part is important on Render: Render assigns a port via the $PORT variable and expects your app to listen on it — without --bind, Gunicorn stays on 8000 and Render may report "no open ports".',
      },
      {
        label: 'Understanding the Procfile command',
        isText: true,
        text: [
          'web: gunicorn app:app',
          '',
          'Breaking it down:',
          '   gunicorn = the WSGI server that runs Flask in production',
          '   app      = your Python file name (app.py, without .py)',
          '   :app     = the Flask instance variable name inside that file',
          '',
          'If your file is main.py with Flask instance named app:',
          '   web: gunicorn main:app',
          '',
          'If your file is server.py with Flask instance named application:',
          '   web: gunicorn server:application',
          '',
          'If your Flask app is inside a blueprints pattern:',
          '   Keep app.py at root with the Flask instance',
          '   Gunicorn only needs to find the Flask instance',
          '',
          'Test locally before pushing:',
          '   gunicorn app:app',
          '   Visit http://localhost:8000/ to confirm it works',
          '   (Gunicorn defaults to port 8000 locally)',
          '',
          'Why not flask run or python app.py for Render:',
          '   flask run = development server, single-threaded, NOT production-safe',
          '   python app.py = calls app.run() which is development server',
          '   gunicorn = multi-worker production-grade server',
        ],
        note: 'Gunicorn is the most common source of "application failed to start" errors. Test "gunicorn app:app" locally first. If it works locally, it works on Render.',
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
          'If .env, SECRET_KEY, MONGODB_URI, DATABASE_URL, API keys, or passwords',
          'were committed to GitHub:',
          '',
          'Deleting it in a new commit does NOT make it safe.',
          'The secret still exists in every previous Git commit.',
          'Anyone can run git log and read the full history.',
          '',
          'Bots scan GitHub for exposed secrets within minutes.',
          'Assume the secret is already compromised.',
          '',
          'Step 1 — ROTATE the exposed secret immediately:',
          '   MongoDB password: Atlas → Database Access → Edit user → New password',
          '   DATABASE_URL: change password in Neon/Render/Supabase dashboard',
          '   SECRET_KEY: generate a new one (all Flask sessions invalidated)',
          '   API key: go to the provider and regenerate',
          '',
          'Step 2 — Remove .env from Git tracking:',
        ],
        note: 'Rotating the secret is mandatory even if you later clean Git history. Old credentials may already be scraped. Always generate fresh secrets after a leak.',
      },
      {
        label: 'Remove .env from Git tracking',
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
          'If git log shows old commits with the env file:',
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
          'Cleaning history does NOT make leaked credentials safe.',
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
        label: 'Set up MongoDB Atlas for Flask',
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
          '6. Replace <password> with your actual saved password',
          '7. Add database name before the ?:',
          '   mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/flaskdb?retryWrites=true&w=majority',
          '8. Use this as MONGODB_URI in .env locally and Render env vars',
          '',
          'Security reminder:',
          '   0.0.0.0/0 network access is convenient for student demos.',
          '   Your database user password is the real security layer.',
          '   Use a strong autogenerated password.',
          '   MONGODB_URI must never appear in any Python file.',
        ],
        note: 'Always use pymongo (synchronous) with Flask — NOT motor (async). Motor is designed for async frameworks like FastAPI. Using motor with Flask causes compatibility issues.',
      },
    ],
  },

  {
    phase: '11',
    title: 'Database — PostgreSQL',
    color: '#60A5FA',
    steps: [
      {
        label: 'PostgreSQL options for Flask',
        isText: true,
        text: [
          'Use PostgreSQL if your project needs relational/structured data.',
          '',
          'Free PostgreSQL options:',
          '→ Neon (neon.tech): 0.5GB/project, data preserved',
          '   DATABASE_URL=postgresql://user:pass@ep-xxx.aws.neon.tech/neondb?sslmode=require',
          '',
          '→ Render PostgreSQL: free, expires in 30 days',
          '   DATABASE_URL=postgresql://user:pass@dpg-xxx.render.com:5432/mydb',
          '',
          'Install:',
          '   pip install flask-sqlalchemy psycopg2-binary',
          '   pip freeze > requirements.txt',
          '',
          'In app.py:',
          '   from flask_sqlalchemy import SQLAlchemy',
          '   from decouple import config',
          '   app.config["SQLALCHEMY_DATABASE_URI"] = config("DATABASE_URL")',
          '   db = SQLAlchemy(app)',
          '',
          'Important: ?sslmode=require is mandatory for Neon and Render PostgreSQL.',
          'Without it, the SSL connection fails.',
          '',
          'For simple student Flask APIs:',
          '   MongoDB Atlas is often easier (no schema migrations).',
          '   PostgreSQL is better for structured relational data.',
        ],
        note: 'DATABASE_URL must never be hardcoded. Always use config("DATABASE_URL"). Store it in .env locally and in Render environment variables.',
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
          `# Run locally for development
python app.py`,
          `# OR: Test with Gunicorn (matches Render production)
gunicorn app:app`,
        ],
        note: 'Always test with "gunicorn app:app" before pushing — this is exactly what Render runs. Flask development server (python app.py) can hide Gunicorn-specific issues.',
      },
      {
        label: 'What to test locally',
        isText: true,
        text: [
          '✅ http://localhost:5000/        → { "status": "ok" }  (python app.py)',
          '✅ http://localhost:8000/        → { "status": "ok" }  (gunicorn app:app)',
          '✅ http://localhost:5000/health  → { "status": "healthy" }',
          '✅ http://localhost:5000/api/test → { "message": "API endpoint working" }',
          '',
          '✅ Database: create and read a test record',
          '✅ Check terminal: "MongoDB connected" or DB log message',
          '✅ CORS: no browser errors when calling from React dev server',
          '',
          'Common local errors to fix:',
          '   ImportError  — missing package in requirements.txt',
          '   ValueError   — missing env var in .env',
          '   MongoClientError — wrong MONGODB_URI or network issue',
          '   gunicorn "failed to find attribute" — wrong Procfile module:variable',
        ],
        note: 'If gunicorn app:app fails locally, the Procfile has an error. Fix it before pushing — Render shows very similar error messages and they are harder to debug remotely.',
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
          `git commit -m "flask app ready for production"`,
          `git branch -M main`,
          `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git`,
          `git push -u origin main`,
        ],
        note: 'After "git add ." always run "git status". If .env or venv/ appear — STOP. Fix .gitignore and use "git rm --cached .env" before proceeding.',
      },
      {
        label: 'Verify GitHub repo after pushing',
        isText: true,
        text: [
          'Open your GitHub repository in the browser.',
          'These files must be at the ROOT:',
          '',
          '   app.py           ← Flask app',
          '   requirements.txt ← includes gunicorn',
          '   Procfile         ← web: gunicorn app:app',
          '   .env.example     ← committed',
          '   .gitignore       ← committed',
          '',
          'Files that must NOT be in GitHub:',
          '   .env             ← secrets',
          '   venv/            ← dependencies',
          '   __pycache__/     ← bytecode',
          '   instance/        ← may contain local config',
          '',
          'Common Git errors:',
          '   remote origin already exists:',
          '   → git remote remove origin  →  re-add',
          '',
          '   Authentication failed:',
          '   → Use Personal Access Token (not password)',
          '   → GitHub → Settings → Developer settings → Personal access tokens',
        ],
        note: 'If app.py is inside a subfolder (e.g., backend/app.py), set Root Directory in Render to "backend". See the Common Errors phase.',
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
          '   Name:          your-flask-api',
          '   Region:        pick nearest to your users',
          '   Branch:        main',
          '   Runtime:       Python 3  (auto-detected from requirements.txt)',
          '   Build Command: pip install -r requirements.txt',
          '   Start Command: gunicorn app:app --bind 0.0.0.0:$PORT',
          '   (or leave empty if Procfile exists — Render reads it automatically)',
          '',
          '5. Environment Variables — add before deploying:',
          '   SECRET_KEY   = 50+ random chars',
          '   MONGODB_URI  = your Atlas connection string',
          '   DB_NAME      = flaskdb',
          '   CORS_ORIGINS = (leave for now — add Vercel URL after frontend deploy)',
          '   ENVIRONMENT  = production',
          '',
          '6. Click "Create Web Service"',
          '',
          '7. Watch Logs tab — look for:',
          '   "[INFO] Listening at: http://0.0.0.0:XXXXX"',
          '   "MongoDB connected"',
          '   No errors',
          '',
          '8. Your API is live at:',
          '   https://your-flask-api.onrender.com',
        ],
        note: 'The Procfile start command overrides the "Start Command" field in Render dashboard. If both exist, Procfile takes priority. Use one or the other — not both with different values.',
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
          'SECRET_KEY',
          '   Generate: python -c "import secrets; print(secrets.token_hex(32))"',
          '   Must be 50+ random characters.',
          '',
          'MONGODB_URI',
          '   Your full Atlas connection string with database name:',
          '   mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/flaskdb?retryWrites=true&w=majority',
          '',
          'DB_NAME',
          '   Your database name: flaskdb (or whatever you named it)',
          '',
          'CORS_ORIGINS',
          '   After Vercel frontend deploy:',
          '   https://yourfrontend.vercel.app',
          '   For both local and production:',
          '   http://localhost:5173,https://yourfrontend.vercel.app',
          '   (comma-separated, no spaces)',
          '',
          'ENVIRONMENT',
          '   Value: production',
          '',
          'No trailing slash in CORS_ORIGINS:',
          '   Correct: https://yourfrontend.vercel.app',
          '   Wrong:   https://yourfrontend.vercel.app/',
          '',
          'After saving → Render auto-redeploys.',
        ],
        note: 'Environment variables on Render are encrypted at rest. They are safely injected into your Python process. They do not appear in build logs.',
      },
    ],
  },

  {
    phase: '16',
    title: 'Verify live API',
    color: '#34D399',
    steps: [
      {
        label: 'Test every part of your live Flask API',
        isText: true,
        text: [
          '✅ Root: https://your-flask-api.onrender.com/',
          '   Should return: { "status": "ok", "message": "Flask API is running" }',
          '',
          '✅ Health: https://your-flask-api.onrender.com/health',
          '   Should return: { "status": "healthy" }',
          '',
          '✅ Test route: https://your-flask-api.onrender.com/api/test',
          '   Should return: { "message": "API endpoint working" }',
          '',
          '✅ All your actual routes:',
          '   Test with Postman or browser',
          '',
          '✅ Render Logs tab confirms:',
          '   "[INFO] Listening at: http://0.0.0.0:XXXXX"',
          '   "MongoDB connected" (if using MongoDB)',
          '   No ModuleNotFoundError',
          '   No import errors',
          '',
          'First request may take 30-60 seconds:',
          '   Render free services sleep after 15 min of inactivity.',
          '   This is normal — the service is waking up.',
          '   Subsequent requests respond quickly.',
          '',
          'If something fails:',
          '   Read Render Logs — exact Python error is shown.',
          '   Most common: missing env var or missing package in requirements.txt.',
        ],
        note: 'Add your live URL to GitHub README, resume, and LinkedIn as soon as it is verified working. A live Flask API URL on your resume shows real backend deployment experience.',
      },
    ],
  },

  {
    phase: '17',
    title: 'Connect React/Vite frontend',
    color: '#A78BFA',
    steps: [
      {
        label: 'Set VITE_API_URL and CORS_ORIGINS',
        isFile: true,
        fileName: 'frontend/.env.production',
        commands: [
          `VITE_API_URL=https://your-flask-api.onrender.com`,
        ],
        note: 'Keep VITE_API_URL=http://localhost:5000 in your local frontend .env for development. Vite uses .env.production automatically for production builds.',
      },
      {
        label: 'CORS_ORIGINS and frontend security rules',
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
          'For both local and production:',
          '   CORS_ORIGINS = http://localhost:5173,https://yourfrontend.vercel.app',
          '',
          'In app.py, this is already handled:',
          '   cors_origins = [o.strip() for o in cors_origins_raw.split(",") if o.strip()]',
          '   CORS(app, origins=cors_origins, supports_credentials=True)',
          '',
          'VITE_ variables are NOT secret:',
          '   VITE_API_URL is a public URL — visible in browser bundle.',
          '   NEVER put SECRET_KEY, MONGODB_URI, or DATABASE_URL in any VITE_ variable.',
          '   Secrets belong only in Render environment variables.',
        ],
        note: 'CORS errors appear in browser console (F12 → Console), NOT in Render Logs. If API calls fail from React but the API works in Postman — check browser DevTools for CORS errors.',
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
          '   Adequate for demos and small projects.',
          '',
          'For student projects: free tier is usually enough.',
          '',
          'When to consider upgrading:',
          '   You need guaranteed fast response times.',
          '   You need to handle real traffic or SLA guarantees.',
          '   Your project is beyond portfolio/demo stage.',
        ],
        note: 'Be honest in demos: "The backend is on Render free tier — the first request may take a moment while it wakes up." This is a professional answer that shows deployment awareness.',
      },
      {
        label: 'Optional — keep awake with cron-job.org',
        isText: true,
        text: [
          'A free cron job that pings /health every 10 min keeps the service awake.',
          '',
          '1. cron-job.org → Sign up free',
          '2. Create Cronjob:',
          '   URL:      https://your-flask-api.onrender.com/health',
          '   Schedule: Every 10 minutes (Custom → Minutes: */10)',
          '3. Save and enable',
          '',
          'Things to know:',
          '   → Free with no limits for basic ping jobs',
          '   → Uses your 750 free instance hours/month',
          '   → Reduces cold start frequency, not eliminates it',
          '   → Not mandatory — open URL 1 min before a demo instead',
        ],
        note: 'cron-job.org is optional. The /health endpoint added to app.py was included specifically for this use case.',
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
          'All packages your code imports must be in requirements.txt.',
          'There is no devDependencies in Python — every import used in production',
          'must be listed.',
        ],
        note: '',
      },
      {
        label: 'Error 2 — gunicorn: command not found',
        isText: true,
        text: [
          'Problem: Render cannot find gunicorn.',
          'Cause: gunicorn not installed or not in requirements.txt.',
          '',
          'Fix:',
          '   pip install gunicorn',
          '   pip freeze > requirements.txt',
          '   Commit and push requirements.txt.',
          '',
          'Verify requirements.txt contains a line like:',
          '   gunicorn==21.x.x',
        ],
        note: '',
      },
      {
        label: 'Error 3 — Failed to find attribute "app" / gunicorn error',
        isText: true,
        text: [
          'Problem: Gunicorn cannot find the Flask app instance.',
          '',
          'Cause A: File name wrong in Procfile.',
          '   File is main.py, not app.py:',
          '   Fix: web: gunicorn main:app',
          '',
          'Cause B: Flask instance has a different variable name.',
          '   Flask instance is named "application" in server.py:',
          '   Fix: web: gunicorn server:application',
          '',
          'How to find the correct names:',
          '   Open your main Python file.',
          '   Find the line: app = Flask(__name__) — "app" is the variable name.',
          '   The filename (without .py) is the module name.',
          '   Procfile: web: gunicorn MODULE:VARIABLE',
        ],
        note: 'Test "gunicorn app:app" locally before pushing. If it fails locally with the same error, the Procfile syntax is wrong.',
      },
      {
        label: 'Error 4 — Application failed to start',
        isText: true,
        text: [
          'Problem: General startup failure in Render logs.',
          '',
          'Cause A: Missing environment variable — config() crashes without default.',
          '   Fix: Add the variable in Render env vars.',
          '   Or add a default: config("SOME_VAR", default=None)',
          '',
          'Cause B: Import error in app.py.',
          '   Fix: Run python app.py locally and read the exact error.',
          '',
          'Cause C: Syntax error in app.py.',
          '   Fix: Run python -m py_compile app.py to check syntax.',
          '',
          'Always read the full Render log — it shows file name and line number.',
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
          '   (no trailing slash, https not http)',
          '',
          'CORS errors appear in BROWSER CONSOLE (F12),',
          'NOT in Render Logs. Always check browser DevTools first.',
        ],
        note: '',
      },
      {
        label: 'Error 6 — Database connection failed',
        isText: true,
        text: [
          'Problem: Database queries fail on Render but work locally.',
          '',
          'Cause 1: MONGODB_URI not set in Render env vars.',
          '   Fix: Render → Environment → add MONGODB_URI.',
          '',
          'Cause 2: Password wrong or <password> not replaced.',
          '   Fix: Re-copy from Atlas, replace <password> exactly.',
          '',
          'Cause 3: Special characters in password (@, #, %, etc.).',
          '   Fix: Autogenerate a new password with letters/numbers only.',
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
          'Cause: Render does NOT deploy your .env file.',
          '   python-decouple reads .env locally.',
          '   On Render, it reads from environment variables in the dashboard.',
          '',
          'Fix: Add every .env variable to Render Environment tab.',
          '   Render → your service → Environment → Add each variable.',
          '',
          'Rule: Every variable in your .env must be manually added in Render.',
        ],
        note: '',
      },
      {
        label: 'Error 8 — .env accidentally pushed',
        isText: true,
        text: [
          'Problem: .env file visible on GitHub.',
          'Cause: .gitignore missing or added after the first commit.',
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
        label: 'Error 9 — Flask app in a subfolder',
        isText: true,
        text: [
          'Problem: Render cannot find app.py or requirements.txt.',
          'Cause: Flask app is inside a backend/ folder in a monorepo.',
          '',
          'Fix A: Set Root Directory in Render.',
          '   Render → your service → Settings → Root Directory → set to: backend',
          '',
          'Fix B: Update Procfile to use module path:',
          '   web: gunicorn backend.app:app',
        ],
        note: '',
      },
      {
        label: 'Error 10 — 404 on expected route',
        isText: true,
        text: [
          'Problem: Route exists in code but returns 404 on live URL.',
          '',
          'Cause 1: Blueprint not registered in app.py.',
          '   Fix: app.register_blueprint(blueprint_name, url_prefix="/api/...")',
          '',
          'Cause 2: Wrong URL in test.',
          '   Check route definition exactly — /api/users vs /api/user',
          '',
          'Cause 3: Method mismatch.',
          '   @app.route("/...") defaults to GET only.',
          '   For POST: @app.route("/...", methods=["POST"])',
          '',
          'Cause 4: Import error prevented route from loading.',
          '   Check Render Logs for import errors on startup.',
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
          '  flask is listed',
          '  gunicorn is listed',
          '  python-decouple is listed',
          '  flask-cors is listed',
          '  All other packages used in production are listed',
          '',
          '── Procfile / Start Command ───────────────────────────',
          '  "web: gunicorn app:app" (or correct module:variable)',
          '  No --reload flag',
          '  No flask run or python app.py in Procfile',
          '',
          '── Security ──────────────────────────────────────────',
          '  .env NOT in GitHub',
          '  .env.example IS in GitHub',
          '  venv/ NOT in GitHub',
          '  __pycache__/ NOT in GitHub',
          '  No secrets in any Python file',
          '  No secrets in Git history',
          '  debug=False in app.run()',
          '',
          '── Render environment variables ─────────────────────',
          '  SECRET_KEY set (50+ random chars)',
          '  MONGODB_URI or DATABASE_URL set',
          '  DB_NAME set',
          '  CORS_ORIGINS set (Vercel URL, no trailing slash)',
          '  ENVIRONMENT = production',
          '',
          '── Live verification ─────────────────────────────────',
          '  / returns { "status": "ok" }',
          '  /health returns { "status": "healthy" }',
          '  All routes return correct responses',
          '  Database reads and writes work',
          '  CORS works with React frontend',
          '  Render Logs are clean',
          '',
          'Add live URL to:',
          '  GitHub README and repo description',
          '  Resume under your project',
          '  LinkedIn Projects section',
        ],
        note: 'A deployed Flask API with a live URL, working database, and proper CORS is a solid backend portfolio item. It shows you can take a Python project from local development to production.',
      },
    ],
  },
]


// ─── Spring Boot → Render (Docker) + PostgreSQL / MongoDB ────────────────────
