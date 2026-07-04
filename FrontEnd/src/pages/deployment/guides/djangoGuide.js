export const DJANGO_GUIDE = [
  {
    phase: '01',
    title: 'What is Render and why deploy your Django API?',
    color: '#4ADE80',
    steps: [
      {
        label: 'What Render gives you — completely free',
        isText: true,
        text: [
          'Render is a cloud platform for hosting backends, APIs, and databases.',
          'When you push code to GitHub, Render automatically builds and redeploys.',
          'No server setup. No Linux knowledge needed. Free tier available.',
          '',
          'What you get on the free tier:',
          '✅ Live HTTPS URL — your-api.onrender.com with SSL automatically',
          '✅ Auto-redeploy — every push to GitHub redeploys your app',
          '✅ Free PostgreSQL database — connect directly inside Render',
          '✅ Django admin panel — accessible at /admin on your live URL',
          '✅ Environment variables — store secrets safely outside your code',
          '',
          'Why a live API matters more than localhost for your resume:',
          '→ Recruiters can call your endpoints without setting up anything',
          '→ A live URL proves the project works in a real environment',
          '→ It shows deployment skill — not just backend coding skill',
          '→ You can connect it to a live React frontend on Vercel',
          '→ It separates you from the 80% of students who only submit code',
        ],
        note: 'A Django API with a live URL + working admin panel is one of the strongest backend projects you can put on your resume.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Before deployment — checklist',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Confirm your project works locally before touching deployment',
        isText: true,
        text: [
          '✅ Virtual environment is activated',
          '   source venv/bin/activate  (Mac/Linux)',
          '   venv\\Scripts\\activate     (Windows)',
          '',
          '✅ python manage.py runserver works at http://127.0.0.1:8000',
          '✅ API endpoints respond correctly (test with browser or Postman)',
          '✅ Django admin panel works at http://127.0.0.1:8000/admin',
          '✅ No red error messages in the terminal',
          '',
          '✅ requirements.txt exists and is up-to-date:',
          '   pip freeze > requirements.txt',
          '',
          '✅ .env file exists for local secrets (SECRET_KEY, DATABASE_URL)',
          '✅ .env is in .gitignore — it must NEVER go to GitHub',
          '',
          'Fix everything locally first.',
          'Render runs the same code you run locally.',
          'If it breaks locally, it will break on Render.',
        ],
        note: 'The #1 cause of failed deployments is skipping local testing. Spend 10 minutes verifying locally and save hours of debugging on Render.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Install required packages',
    color: '#60A5FA',
    steps: [
      {
        label: 'Install all production packages',
        commands: [
          `pip install gunicorn whitenoise dj-database-url psycopg2-binary python-decouple django-cors-headers`,
          `pip freeze > requirements.txt`,
        ],
        note: 'Run these in your activated virtual environment. pip freeze captures every installed package — Render reads requirements.txt to install your dependencies.',
      },
      {
        label: 'What each package does',
        isText: true,
        text: [
          'gunicorn',
          '→ Production-grade web server for Django.',
          '→ django.core.wsgi is a development server — never use it in production.',
          '→ Render starts your app using: gunicorn yourproject.wsgi',
          '',
          'whitenoise',
          '→ Serves your static files (CSS, JS, admin assets) directly from Django.',
          '→ Without this, your admin panel has no CSS and looks broken.',
          '',
          'dj-database-url',
          '→ Reads a DATABASE_URL environment variable and configures Django database.',
          '→ Works with PostgreSQL, SQLite, MySQL — same code, different URL.',
          '',
          'psycopg2-binary',
          '→ PostgreSQL driver for Python. Required to connect to any PostgreSQL database.',
          '',
          'python-decouple',
          '→ Reads values from your .env file into Python variables.',
          '→ config("SECRET_KEY") reads SECRET_KEY from .env.',
          '',
          'django-cors-headers',
          '→ Allows your React frontend (on Vercel) to call your Django API.',
          '→ Without CORS headers, the browser blocks all API requests.',
        ],
        note: 'After installing, always run pip freeze > requirements.txt again. If Render cannot find a package, it is missing from requirements.txt.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Update settings.py for production',
    color: '#F59E0B',
    steps: [
      {
        label: 'Complete production settings.py',
        isFile: true,
        fileName: 'settings.py',
        commands: [
          `import os
from decouple import config
import dj_database_url

# ── Security ──────────────────────────────────────────────
SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = ['*']
# Tip: after deploying, replace '*' with your specific domain:
# ALLOWED_HOSTS = ['your-api.onrender.com', '127.0.0.1', 'localhost']

# ── Apps ──────────────────────────────────────────────────
INSTALLED_APPS = [
    # ... your existing apps ...
    'rest_framework',    # if using DRF
    'corsheaders',       # add this
]

# ── Middleware ────────────────────────────────────────────
# Order matters — SecurityMiddleware must be first
# WhiteNoise must be second
# CorsMiddleware must be before CommonMiddleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ... rest of your middleware unchanged ...
]

# ── Static Files ──────────────────────────────────────────
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# ── Database ──────────────────────────────────────────────
DATABASES = {
    'default': dj_database_url.config(
        default=config('DATABASE_URL', default='sqlite:///db.sqlite3'),
        conn_max_age=600,
        ssl_require=not config('DEBUG', default=False, cast=bool),
    )
}

# ── CORS ──────────────────────────────────────────────────
CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:5173'
).split(',')

# ── Security headers (production) ─────────────────────────
CSRF_TRUSTED_ORIGINS = config(
    'CSRF_TRUSTED_ORIGINS',
    default='http://localhost:5173'
).split(',')

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SESSION_COOKIE_SECURE = not config('DEBUG', default=False, cast=bool)
CSRF_COOKIE_SECURE = not config('DEBUG', default=False, cast=bool)`,
        ],
        note: 'Add these settings carefully. Do not delete your existing settings — only ADD or MODIFY the specific values shown above.',
      },
      {
        label: 'Common mistakes in settings.py',
        isText: true,
        text: [
          'Mistake: DEBUG = True in production',
          '→ Exposes full error tracebacks to anyone who visits your site.',
          '→ Always: DEBUG = config("DEBUG", default=False, cast=bool)',
          '→ Set DEBUG=False in Render environment variables.',
          '',
          'Mistake: Hardcoded SECRET_KEY in code',
          '→ Anyone who reads your GitHub repo has your secret key.',
          '→ Always: SECRET_KEY = config("SECRET_KEY")',
          '',
          'Mistake: WhiteNoise not second in MIDDLEWARE',
          '→ Static files and admin CSS will not load.',
          '→ WhiteNoise must be immediately after SecurityMiddleware.',
          '',
          'Mistake: ALLOWED_HOSTS = [] (empty) in production',
          '→ Django rejects all requests with DisallowedHost error.',
          '→ Set ALLOWED_HOSTS = ["*"] or your specific Render domain.',
        ],
        note: 'Read the error message carefully when deployment fails — settings.py issues almost always show the specific problem in Render build logs.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Create .env for local development',
    color: '#EC4899',
    steps: [
      {
        label: 'Create your local .env file',
        isFile: true,
        fileName: '.env',
        commands: [
          `# Local development environment variables
# This file is ONLY for your local machine — never push to GitHub

SECRET_KEY=your-local-dev-secret-key-change-this-to-something-random
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
CSRF_TRUSTED_ORIGINS=http://localhost:5173,http://localhost:3000`,
        ],
        note: 'For local development, SQLite (the default Django database) is fine. You only switch to PostgreSQL in production on Render.',
      },
      {
        label: 'Important rules about .env',
        isText: true,
        text: [
          '.env is ONLY for local development — never for production.',
          'On Render, you add environment variables directly in the dashboard.',
          'Never push .env to GitHub — see Phase 06 for .gitignore.',
          '',
          'For local SECRET_KEY, you can generate one quickly:',
          '   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"',
          '',
          'Why SQLite for local is fine:',
          '→ SQLite is a file-based database included with Python.',
          '→ No installation needed — great for local dev.',
          '→ Render uses PostgreSQL — dj-database-url handles the switch automatically.',
          '',
          'DEBUG=True locally:',
          '→ Shows detailed error pages which help you debug faster.',
          '→ Must be False on Render (set as environment variable there).',
        ],
        note: 'python-decouple reads .env automatically when DEBUG=True. On Render, environment variables are read from the dashboard — no .env file needed on the server.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Create .gitignore',
    color: '#F59E0B',
    steps: [
      {
        label: 'Create .gitignore in your project root',
        isFile: true,
        fileName: '.gitignore',
        commands: [
          `# Python bytecode — auto-generated, never needed in git
__pycache__/
*.pyc
*.pyo
*.pyd

# Local database — contains your dev data, not needed in production
*.sqlite3
db.sqlite3

# Environment variables — NEVER push to GitHub
.env
.env.local
.env.*.local

# Virtual environments — huge, auto-recreated with pip install
venv/
env/
.venv/
ENV/

# Static files — Render runs collectstatic itself during build
staticfiles/

# Media/uploaded files — should use cloud storage in production
media/

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
django_debug.log

# IDE config
.vscode/settings.json
.idea/`,
        ],
        note: 'Create this file in your project ROOT — the same folder as manage.py. If you already have .gitignore, add the missing entries rather than replacing the whole file.',
      },
      {
        label: 'Why each entry must be excluded',
        isText: true,
        text: [
          '.env — CRITICAL:',
          '→ Contains SECRET_KEY, DATABASE_URL, and other secrets.',
          '→ Pushed to a public repo = anyone can read your secrets.',
          '→ Bots scan GitHub for .env files within minutes of a push.',
          '',
          'db.sqlite3 — Important:',
          '→ Your local development database with test data.',
          '→ Production uses PostgreSQL on Render — SQLite file is irrelevant there.',
          '→ Committing it fills your repo with binary data that changes every save.',
          '',
          'venv/ — Important:',
          '→ Can contain thousands of files totalling hundreds of megabytes.',
          '→ Anyone cloning your repo runs pip install -r requirements.txt to recreate it.',
          '',
          'staticfiles/ — Good practice:',
          '→ Auto-generated by python manage.py collectstatic.',
          '→ Render runs collectstatic during build — it does not need your copy.',
          '',
          'media/ — Important:',
          '→ Uploaded user files (images, documents).',
          '→ Render has an ephemeral filesystem — see Phase 20 for the warning.',
        ],
        note: 'Run "git status" before every "git push" and verify none of these files appear in the list.',
      },
    ],
  },

  {
    phase: '07',
    title: 'Create Procfile',
    color: '#4ADE80',
    steps: [
      {
        label: 'Create Procfile in your project root',
        isFile: true,
        fileName: 'Procfile',
        commands: [
          `web: gunicorn your_project_name.wsgi:application --log-file -`,
        ],
        note: 'Replace "your_project_name" with the name of your Django project folder — the one that contains settings.py, wsgi.py, and urls.py. It is NOT the app folder (like users/ or api/).',
      },
      {
        label: 'How to find your project name',
        isText: true,
        text: [
          'Your project folder structure looks like this:',
          '',
          '   manage.py              ← project root',
          '   Procfile               ← create here',
          '   requirements.txt       ← create here',
          '   your_project_name/     ← THIS is what goes in the Procfile',
          '     settings.py',
          '     wsgi.py',
          '     urls.py',
          '   your_app_name/         ← NOT this one',
          '     models.py',
          '     views.py',
          '',
          'Example: if your project is named "myapi":',
          '   web: gunicorn myapi.wsgi:application --log-file -',
          '',
          'You can verify: open wsgi.py — the first line shows:',
          '   os.environ.setdefault("DJANGO_SETTINGS_MODULE", "your_project_name.settings")',
          'The folder name before ".settings" is what you put in the Procfile.',
        ],
        note: 'Wrong project name in Procfile is one of the most common deployment errors. Double-check before pushing.',
      },
    ],
  },

  {
    phase: '08',
    title: 'Test locally before pushing',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Run all checks before pushing to GitHub',
        commands: [
          `python manage.py check`,
          `python manage.py makemigrations`,
          `python manage.py migrate`,
          `python manage.py collectstatic --noinput`,
          `python manage.py runserver`,
        ],
        note: 'Run these one by one. Fix any errors before moving on. These are exactly the commands Render runs during deployment.',
      },
      {
        label: 'What each command does and what errors mean',
        isText: true,
        text: [
          'python manage.py check',
          '→ Validates your Django configuration without running the server.',
          '→ Catches settings errors, missing dependencies, and app issues.',
          '→ If this fails, fix it before anything else.',
          '',
          'python manage.py makemigrations',
          '→ Creates migration files from your models.',
          '→ Run this every time you add or change a model.',
          '',
          'python manage.py migrate',
          '→ Applies migrations to the database.',
          '→ Creates tables for all your models.',
          '→ Render runs this automatically in the Build Command.',
          '',
          'python manage.py collectstatic --noinput',
          '→ Copies all static files to the STATIC_ROOT folder (staticfiles/).',
          '→ Required for WhiteNoise to serve them.',
          '→ If admin CSS is broken after deploy, collectstatic probably failed.',
          '',
          'python manage.py runserver',
          '→ Final check — open http://127.0.0.1:8000 and test everything.',
          '→ Fix every error that appears in the terminal.',
        ],
        note: 'If python manage.py check or collectstatic fails locally, it will fail on Render too. Fix it locally first — you get much better error messages.',
      },
    ],
  },

  {
    phase: '09',
    title: 'Push your project to GitHub',
    color: '#60A5FA',
    steps: [
      {
        label: 'Create a GitHub repo and push your code',
        isText: true,
        text: [
          '1. Go to github.com → click "+" → "New repository"',
          '2. Name: my-django-api (or your project name)',
          '3. Set to Public (Render needs access on free plan)',
          '4. Do NOT check "Add README" or "Add .gitignore"',
          '   Your project already has these — adding them causes merge conflicts',
          '5. Click "Create repository"',
          '6. Run these commands in your Django project folder:',
        ],
        note: 'Make sure your .gitignore exists before running git add . — this prevents accidentally staging .env or venv.',
      },
      {
        label: 'Initialize git and push to GitHub',
        commands: [
          `git init`,
          `git add .`,
          `git status`,
          `git commit -m "django backend ready for production"`,
          `git branch -M main`,
          `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git`,
          `git push -u origin main`,
        ],
        note: 'After "git add ." run "git status" to verify .env and venv/ are NOT in the staged files list. If they appear, check your .gitignore.',
      },
      {
        label: 'Common Git errors and fixes',
        isText: true,
        text: [
          'Error: "remote origin already exists"',
          'Fix: git remote remove origin — then re-run git remote add origin ...',
          '',
          'Error: Authentication failed',
          'Fix: GitHub no longer accepts passwords.',
          '   Go to GitHub → Settings → Developer Settings → Personal Access Tokens',
          '   Generate a Classic token with repo scope. Use it as password.',
          '',
          'Error: "master" vs "main" mismatch',
          'Fix: Run git branch -M main before pushing.',
          '',
          'Problem: .env appears in git status',
          'Fix: STOP. Do not push. Add .env to .gitignore first.',
          '   Then: git rm --cached .env && git add . && git commit',
          '   See Phase 10 if you already pushed it accidentally.',
          '',
          'Problem: venv/ folder appears in git status',
          'Fix: Add venv/ to .gitignore.',
          '   git rm -r --cached venv/',
          '   git commit -m "remove venv from tracking"',
        ],
        note: 'Always run "git status" before "git push" and review the staged file list. This one habit prevents most accidental leaks.',
      },
    ],
  },

  {
    phase: '10',
    title: '🚨 If you accidentally pushed a secret to GitHub',
    color: '#EF4444',
    steps: [
      {
        label: 'Deleting the file in a new commit is NOT enough — act immediately',
        isText: true,
        text: [
          'If you committed .env or any secret key to GitHub:',
          'Deleting it in a new commit does NOT make it safe.',
          'The secret still exists in every previous commit in Git history.',
          'Anyone can run "git log" and see every version of every file.',
          '',
          'GitHub indexes public repos. Bots scan for leaked secrets',
          'within minutes of any push. Assume the secret is already compromised.',
          '',
          'Step 1 — REVOKE the leaked secret immediately:',
          '→ Django SECRET_KEY: regenerate it in your .env and Render env vars',
          '→ Database password: reset it in Render/Neon dashboard',
          '→ Any API key: go to the provider dashboard and delete/regenerate',
          '',
          'Step 2 — Add .env to .gitignore if not already done',
          'Step 3 — Remove .env from Git tracking',
        ],
        note: '⚠️  Revoking the key is mandatory even if you later clean Git history. The old key may already be scraped and stored elsewhere.',
      },
      {
        label: 'Commands to remove .env from Git tracking',
        commands: [
          `# Remove .env from git index (keeps file on disk, stops tracking it)
git rm --cached .env`,
          `# Commit the removal
git commit -m "remove .env from git tracking"`,
          `# Push
git push`,
          `# Check if .env appears in any past commits
git log --all -- .env`,
          `# Search all commit history for a specific secret value
git grep "YOUR_SECRET_VALUE" $(git rev-list --all)`,
        ],
        note: 'git rm --cached removes .env from Git tracking without deleting it from your local disk. After this, future commits will not include it.',
      },
      {
        label: 'Clean Git history if secret is in old commits (advanced)',
        isText: true,
        text: [
          'If "git log --all -- .env" shows old commits with the file,',
          'those commits still hold the secret. To fully purge from history:',
          '',
          'Option A — git-filter-repo (modern, recommended):',
          '   pip install git-filter-repo',
          '   git filter-repo --path .env --invert-paths',
          '   git push --force',
          '',
          'Option B — BFG Repo Cleaner (simpler, needs Java):',
          '   Download from rtyley.github.io/bfg-repo-cleaner',
          '   java -jar bfg.jar --delete-files .env',
          '   git reflog expire --expire=now --all',
          '   git gc --prune=now --aggressive',
          '   git push --force',
          '',
          '⚠️  Force push rewrites all commit history on GitHub.',
          'If collaborators have cloned the repo they must re-clone.',
          '',
          'IMPORTANT: Even after cleaning history, always use the NEW revoked key.',
          'Cleaning history does not make the old exposed key safe again.',
        ],
        note: 'For solo student projects: revoke old key → clean history with git-filter-repo → generate new key → add new key only in .env and Render dashboard (never commit).',
      },
    ],
  },

  {
    phase: '11',
    title: 'Database — choose your option',
    color: '#A78BFA',
    steps: [
      {
        label: 'Option A: Render PostgreSQL (recommended — easiest)',
        isText: true,
        text: [
          '→ Easiest option — database and backend are both managed by Render.',
          '',
          '1. render.com → New → PostgreSQL',
          '2. Name: your-project-db',
          '3. Select free plan → Click "Create Database"',
          '4. After creation, Render shows two connection URLs:',
          '   • Internal Database URL — use this if Django is also on Render',
          '   • External Database URL — use this for local testing only',
          '',
          '5. Copy the Internal URL. It looks like:',
          '   postgresql://user:pass@dpg-xxxx-a.oregon-postgres.render.com:5432/dbname',
          '',
          '6. Add as DATABASE_URL in your Render web service environment variables.',
          '',
          '💡 Why Internal URL:',
          '   → Django and the DB communicate inside Render private network.',
          '   → Faster. No extra cost. No external traffic charges.',
          '',
          '⚠️  Free Render PostgreSQL expires after 30 days.',
          '   Back up your data before expiry using:',
          '   pg_dump DATABASE_URL > backup.sql',
          '   After expiry, create a new free database and re-run migrations.',
        ],
        note: 'Render PostgreSQL free: 1GB storage, expires in 30 days. Good for demos and learning projects. For long-term projects, use Neon.',
      },
      {
        label: 'Option B: Neon PostgreSQL (0.5GB/project, data preserved)',
        isText: true,
        text: [
          '→ Better free tier for long-term student projects.',
          '→ Database never expires. 0.5GB per project. No credit card.',
          '',
          '1. Go to neon.tech → Sign up free',
          '2. Click "Create a Project" → Choose nearest region',
          '3. Go to Connection Details',
          '4. Copy the connection string — it looks like:',
          '   postgresql://user:pass@ep-xx.us-east-2.aws.neon.tech/neondb?sslmode=require',
          '',
          '5. Add this string as DATABASE_URL in Render environment variables.',
          '',
          '💡 The ?sslmode=require at the end is important.',
          '   Django settings ssl_require=True handles this automatically.',
          '',
          'Neon vs Render DB comparison:',
          '→ Render DB: easier setup (auto-link in dashboard), expires in 30 days',
          '→ Neon: requires copy-paste setup, never expires, 0.5GB free vs 1GB Render',
          '→ For a resume project you want to keep alive: choose Neon.',
          '→ For a quick demo: either works.',
        ],
        note: 'Both options work identically with Django. dj-database-url handles both connection string formats automatically.',
      },
    ],
  },

  {
    phase: '12',
    title: 'Deploy Django on Render',
    color: '#EC4899',
    steps: [
      {
        label: 'Create a Web Service on Render',
        isText: true,
        text: [
          '1. Go to render.com → sign up with GitHub',
          '2. Click "New" → "Web Service"',
          '3. Connect your GitHub account if not already done',
          '4. Find your Django repo → click "Connect"',
          '5. Configure the service:',
          '   Name:     your-project-api  (this becomes your URL)',
          '   Region:   pick nearest to your users',
          '   Branch:   main',
          '   Runtime:  Python 3',
          '',
          '6. Build Command (copy exactly):',
          '   pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput',
          '',
          '7. Start Command (replace your_project_name):',
          '   gunicorn your_project_name.wsgi:application --log-file -',
          '',
          '8. Click "Create Web Service"',
          '9. First deploy takes 3–5 minutes',
          '',
          'Your app goes live at: https://your-project-api.onrender.com',
        ],
        note: 'The Build Command runs once during each deploy. It installs packages, runs database migrations, and collects static files — all automatically.',
      },
      {
        label: 'If using Render PostgreSQL — link it automatically',
        isText: true,
        text: [
          '→ Skip this step if you are using Neon (you already have the URL).',
          '',
          'Render can auto-link your database so you do not need to copy-paste:',
          '',
          '1. In your Web Service → click "Environment" tab',
          '2. Click "Add from Database"',
          '3. Select your Render PostgreSQL database',
          '4. Select DATABASE_URL from the list',
          '5. Render automatically sets the Internal URL as DATABASE_URL',
          '',
          '✅ No manual copy-paste needed.',
          '✅ Internal URL is automatically used for best performance.',
        ],
        note: 'This automatic linking is why Render PostgreSQL is the easiest option — zero configuration for the database connection.',
      },
    ],
  },

  {
    phase: '13',
    title: 'Add environment variables in Render',
    color: '#60A5FA',
    steps: [
      {
        label: 'Add all required environment variables',
        isText: true,
        text: [
          '1. In your Render Web Service → click "Environment" tab',
          '2. Click "Add Environment Variable" for each:',
          '',
          '   SECRET_KEY',
          '   → Generate one: python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"',
          '   → Or use: djecrety.it',
          '   → Must be 50+ characters, completely random',
          '',
          '   DEBUG',
          '   → Value: False',
          '   → Never set to True in production',
          '',
          '   DATABASE_URL',
          '   → Paste from Phase 11 (Render or Neon connection string)',
          '   → Or use "Add from Database" if using Render PostgreSQL',
          '',
          '   CORS_ALLOWED_ORIGINS',
          '   → Value: https://yourfrontend.vercel.app',
          '   → For multiple: https://yourfrontend.vercel.app,http://localhost:5173',
          '',
          '   CSRF_TRUSTED_ORIGINS',
          '   → Value: https://your-api.onrender.com,https://yourfrontend.vercel.app',
          '',
          '3. Click "Save Changes" → Render auto-redeploys',
        ],
        note: 'Never hardcode SECRET_KEY or any password directly in settings.py. If it is in your code, it is in GitHub, and it is not a secret.',
      },
      {
        label: 'Security rules for environment variables',
        isText: true,
        text: [
          '✅ Environment variables on Render are safe:',
          '   → They are encrypted at rest',
          '   → They are only injected into your app at runtime',
          '   → They never appear in GitHub or build logs',
          '',
          '🚫 Never do these:',
          '   → Never paste SECRET_KEY directly in settings.py',
          '   → Never commit .env to GitHub',
          '   → Never push requirements.txt with a hardcoded password',
          '   → Never log environment variables in your Django code',
          '',
          'After adding env vars, always redeploy:',
          '   Render → your service → Manual Deploy → Deploy latest commit',
          '   (Render auto-redeploys when env vars change, but verify)',
        ],
        note: 'If your Django app starts but behaves incorrectly (wrong database, DEBUG errors), the environment variables are the first thing to check.',
      },
    ],
  },

  {
    phase: '14',
    title: 'Create Django superuser',
    color: '#F97316',
    steps: [
      {
        label: 'Method 1 — Create locally using production database',
        isText: true,
        text: [
          'You can run createsuperuser on your local machine while pointing',
          'to the production PostgreSQL database.',
          '',
          '1. Open your local .env file',
          '2. Temporarily replace DATABASE_URL with the production URL:',
          '   DATABASE_URL=postgresql://user:pass@dpg-xxx.render.com:5432/dbname',
          '   (copy the External Database URL from Render PostgreSQL dashboard)',
          '',
          '3. Run:',
          '   python manage.py createsuperuser',
          '',
          '4. Enter your admin username, email, and password when prompted',
          '',
          '5. After the superuser is created — IMMEDIATELY restore .env:',
          '   DATABASE_URL=sqlite:///db.sqlite3',
          '',
          '6. Visit https://your-api.onrender.com/admin and log in',
          '',
          'Why this works:',
          '→ Django connects to the same live PostgreSQL database',
          '→ The superuser is created directly in production',
          '→ No credentials stored in code or environment variables',
        ],
        note: 'Always restore your local .env to SQLite after creating the superuser. Leaving the production DATABASE_URL in .env risks accidentally running migrations or deleting data on the production database.',
      },
      {
        label: 'Method 2 — Auto-create via Render environment variables',
        isText: true,
        text: [
          'Django automatically reads these 3 environment variables',
          'when you run createsuperuser --noinput:',
          '',
          'Add to Render → Environment Variables:',
          '   DJANGO_SUPERUSER_USERNAME = admin',
          '   DJANGO_SUPERUSER_EMAIL    = your@email.com',
          '   DJANGO_SUPERUSER_PASSWORD = YourStrongPassword123',
          '',
          'Update your Build Command in Render to include superuser creation:',
          '   pip install -r requirements.txt &&',
          '   python manage.py migrate &&',
          '   python manage.py collectstatic --noinput &&',
          '   (python manage.py createsuperuser --noinput || true)',
          '',
          'The || true at the end:',
          '→ First deploy: creates the superuser successfully',
          '→ Every deploy after: superuser already exists, command fails',
          '→ || true makes the build succeed anyway — without it, build fails',
          '',
          'After first successful deploy:',
          '→ Visit https://your-api.onrender.com/admin',
          '→ Log in with DJANGO_SUPERUSER_USERNAME and DJANGO_SUPERUSER_PASSWORD',
        ],
        note: 'Once the superuser is created, you can remove the DJANGO_SUPERUSER_* variables from Render env vars for better security — or leave them if you want auto-recreation on new deployments.',
      },
    ],
  },

  {
    phase: '15',
    title: 'Verify your live backend',
    color: '#4ADE80',
    steps: [
      {
        label: 'Test every part of your live backend',
        isText: true,
        text: [
          '✅ API root: https://your-api.onrender.com',
          '   Should show Django REST Framework browsable API or JSON response.',
          '',
          '✅ Admin panel: https://your-api.onrender.com/admin',
          '   Should load with full CSS styling (if broken CSS, see Phase 22).',
          '   Log in with your superuser credentials.',
          '',
          '✅ API endpoints: test each endpoint you built',
          '   https://your-api.onrender.com/api/items/',
          '   https://your-api.onrender.com/api/users/',
          '   etc.',
          '',
          '✅ Test with Postman or Thunder Client:',
          '   GET, POST, PUT, DELETE requests to your endpoints.',
          '',
          '✅ Check Render logs if anything fails:',
          '   Render dashboard → your service → "Logs" tab',
          '   The full error stack trace appears there.',
          '',
          '✅ Database data:',
          '   Create test records via admin and verify they persist.',
          '   Refresh the page — data should still be there (PostgreSQL working).',
        ],
        note: 'Check the Render Logs tab first whenever something is wrong. It shows the exact Python error and line number — much more useful than a generic 500 error.',
      },
    ],
  },

  {
    phase: '16',
    title: 'Connect React/Vite frontend (if you have one)',
    color: '#60A5FA',
    steps: [
      {
        label: 'Set the backend URL in your React frontend',
        isFile: true,
        fileName: '.env.production',
        commands: [
          `VITE_API_URL=https://your-project-api.onrender.com`,
        ],
        note: 'Also keep VITE_API_URL=http://localhost:8000 in your local .env for development. Vite uses .env.production for production builds automatically.',
      },
      {
        label: 'How to call Django APIs from React',
        isText: true,
        text: [
          'In your React components, access the URL like this:',
          '',
          '   const API = import.meta.env.VITE_API_URL',
          '   const response = await fetch(API + "/api/items/")',
          '',
          'Or with axios:',
          '   axios.defaults.baseURL = import.meta.env.VITE_API_URL',
          '   const response = await axios.get("/api/items/")',
          '',
          '⚠️  Security reminder — VITE_ variables are NOT secret:',
          '→ Vite bakes all VITE_ variables into the JavaScript bundle.',
          '→ Anyone can open browser DevTools and read them.',
          '→ VITE_API_URL is just a public URL — that is fine.',
          '→ Never put SECRET_KEY, database passwords, or payment secrets',
          '   in React frontend environment variables.',
          '→ Private secrets stay ONLY in your Django backend (Render env vars).',
        ],
        note: 'The VITE_API_URL is just a URL — it is not a secret. Secrets belong only in your Django backend environment variables.',
      },
    ],
  },

  {
    phase: '17',
    title: 'CORS setup — fix frontend blocked errors',
    color: '#A78BFA',
    steps: [
      {
        label: 'What CORS is and why it matters',
        isText: true,
        text: [
          'CORS (Cross-Origin Resource Sharing) is a browser security feature.',
          'When your React app on Vercel calls your Django API on Render,',
          'the browser checks if Django allows requests from that origin.',
          '',
          'Without CORS setup: browser blocks the request with error:',
          '   "Access to fetch blocked by CORS policy"',
          '',
          'Your React app works but API calls all fail silently.',
          'Users see blank data. No clear error in the UI.',
          '',
          'Fix: configure CORS_ALLOWED_ORIGINS in Django settings',
          'and add the Render/Vercel URL as an environment variable.',
        ],
        note: 'CORS errors only appear in the browser console (F12). If your frontend shows no data after deploy, check the Network tab for red CORS errors.',
      },
      {
        label: 'CORS configuration for common setups',
        isText: true,
        text: [
          'For local frontend + live backend (during development):',
          '   CORS_ALLOWED_ORIGINS=http://localhost:5173',
          '',
          'For live Vercel frontend + live Render backend:',
          '   CORS_ALLOWED_ORIGINS=https://yourfrontend.vercel.app',
          '',
          'For both local and live (most common for student projects):',
          '   CORS_ALLOWED_ORIGINS=http://localhost:5173,https://yourfrontend.vercel.app',
          '',
          'Set this value in:',
          '→ Your .env file (for local development)',
          '→ Render environment variables (for production)',
          '',
          '⚠️  Never use CORS_ALLOW_ALL_ORIGINS = True in production.',
          '   It disables all CORS protection — any website can call your API.',
          '   Only use it temporarily during local development debugging.',
        ],
        note: 'After updating CORS_ALLOWED_ORIGINS in Render, trigger a redeploy. CORS settings take effect only after a new deploy.',
      },
    ],
  },

  {
    phase: '18',
    title: 'Final deployment checklist',
    color: '#34D399',
    steps: [
      {
        label: 'Verify every item before sharing your live link',
        isText: true,
        text: [
          '── Security ──────────────────────────────────────────',
          '✅ DEBUG=False in Render environment variables',
          '✅ SECRET_KEY is a real random 50+ character string',
          '✅ .env is in .gitignore (run git status to confirm)',
          '✅ No secrets in Git history (no accidental .env commits)',
          '✅ DATABASE_URL is set in Render, not hardcoded in code',
          '',
          '── Database ──────────────────────────────────────────',
          '✅ Migrations ran successfully (check Render build logs)',
          '✅ Admin panel loads at /admin with full CSS',
          '✅ Can create records via admin — they persist after refresh',
          '',
          '── API ───────────────────────────────────────────────',
          '✅ All API endpoints respond correctly',
          '✅ Authentication works (if you have login/token)',
          '✅ CORS not blocking your frontend',
          '',
          '── README and Resume ─────────────────────────────────',
          '✅ GitHub README has live API URL',
          '✅ README explains endpoints and how to test',
          '✅ Resume/LinkedIn/GitHub updated with live backend URL',
        ],
        note: 'A live Django API on your resume demonstrates real backend engineering experience. Add the Render URL and admin URL to your GitHub repo description.',
      },
    ],
  },

  {
    phase: '19',
    title: 'Free tier — honest explanation for students',
    color: '#4ADE80',
    steps: [
      {
        label: 'What the free tier includes and what the limits mean',
        isText: true,
        text: [
          'Render free tier is usually enough for student demos and portfolio projects.',
          '',
          '✅ Service sleeps after 15 minutes of inactivity',
          '   The first request after sleep takes ~30 seconds to wake up.',
          '   For a resume project or demo, just open the app 1 minute before showing it.',
          '   Use cron-job.org (see Phase 21) to keep it awake if needed.',
          '',
          '✅ 750 free instance hours per month',
          '   One service running 24/7 uses ~744 hours.',
          '   Enough for one backend service. Do not run 3 free services at once.',
          '',
          '✅ 512 MB RAM',
          '   More than enough for a Django REST API.',
          '   Only an issue if you process large files or run ML models.',
          '',
          '✅ PostgreSQL expires in 30 days (Render DB)',
          '   Good for demos and project submissions.',
          '   Use Neon (see Phase 11) for projects you want running longer.',
          '',
          'When to consider upgrading:',
          '→ You need zero cold-start latency for a real product',
          '→ Your project handles real user data that cannot expire',
          '→ You are beyond the demo/portfolio stage',
          '',
          'For student projects: just deploy and use it.',
          'The limitations are invisible at student project scale.',
        ],
        note: 'Render free tier is not for production business applications. For portfolios, demos, and college projects — it is more than enough.',
      },
    ],
  },

  {
    phase: '20',
    title: '⚠️  File storage warning — ephemeral filesystem',
    color: '#F59E0B',
    steps: [
      {
        label: 'Uploaded files are lost on every redeploy',
        isText: true,
        text: [
          'IMPORTANT: Render free services have an ephemeral filesystem.',
          'This means: any file your app writes to disk is temporary.',
          '',
          'Affected features:',
          '→ User-uploaded images (profile pictures, documents)',
          '→ Any file stored using Django ImageField or FileField',
          '→ Files written to the media/ folder',
          '',
          'What happens:',
          '→ User uploads an image. It saves to media/. Works initially.',
          '→ You push new code. Render restarts the container.',
          '→ All files in media/ are gone. Broken image links everywhere.',
          '',
          'Fix for production: use cloud storage',
          '→ Cloudinary (free tier): best for student projects with images',
          '   pip install cloudinary django-cloudinary-storage',
          '   Upload goes to Cloudinary CDN — never lost',
          '',
          '→ AWS S3 (requires credit card for identity verification)',
          '→ Backblaze B2 (free 10GB, no credit card)',
          '',
          'For student projects with no file uploads:',
          '→ This warning does not apply to you.',
          '→ Database data (PostgreSQL) is NOT affected — only files.',
        ],
        note: 'If your Django project uses models.ImageField or models.FileField, you need cloud storage before deploying. Database records are safe — only media files are at risk.',
      },
    ],
  },

  {
    phase: '21',
    title: 'Keep your backend awake with a free cron job',
    color: '#60A5FA',
    steps: [
      {
        label: 'Set up cron-job.org to prevent cold starts',
        isText: true,
        text: [
          'Render free services sleep after 15 minutes of no requests.',
          'The first request wakes them up but takes ~30 seconds.',
          'A cron job pings your API every 10 minutes to reduce how often it',
          'goes cold — it does NOT guarantee 24/7 uptime, but visitors rarely',
          'hit the slow cold start.',
          '',
          '1. Go to cron-job.org → Sign up free (no credit card)',
          '2. Click "CREATE CRONJOB"',
          '3. Fill in:',
          '   Title:    Keep Django Alive',
          '   URL:      https://your-project-api.onrender.com/',
          '   Schedule: Every 10 minutes',
          '   → Click "Custom" → set Minutes to */10',
          '4. Click "CREATE" → toggle to ON',
          '',
          '✅ cron-job.org pings your API every 10 min.',
          '   Render sees regular activity, so it rarely goes to sleep.',
          '   Most visitors get a fast response instead of a cold start.',
          '',
          'Things to know:',
          '→ cron-job.org is completely free for basic jobs',
          '→ It uses your free instance hours (750/month) more quickly',
          '→ For a single service: 730 pings/month — well within limits',
          '→ Check the execution log inside cron-job.org for 200 OK responses',
        ],
        note: 'For demo projects and interviews, just open the app 1 minute before. For public projects you want always responsive, set up the cron job.',
      },
    ],
  },

  {
    phase: '22',
    title: 'Common errors and fixes',
    color: '#F97316',
    steps: [
      {
        label: 'Build failed — ModuleNotFoundError',
        isText: true,
        text: [
          'Error: ModuleNotFoundError: No module named "gunicorn"',
          'Or:    ModuleNotFoundError: No module named "decouple"',
          '',
          'Cause: The package is installed in your venv locally but not in requirements.txt.',
          '',
          'Fix:',
          '1. Activate venv: source venv/bin/activate',
          '2. Install the missing package: pip install package_name',
          '3. Regenerate requirements.txt: pip freeze > requirements.txt',
          '4. Commit and push: git add requirements.txt && git commit -m "fix requirements" && git push',
        ],
        note: 'requirements.txt must list every package your app needs. Run pip freeze > requirements.txt after installing any new package.',
      },
      {
        label: 'DisallowedHost — 400 Bad Request',
        isText: true,
        text: [
          'Error: DisallowedHost at / — Invalid HTTP_HOST header: your-api.onrender.com',
          '',
          'Cause: ALLOWED_HOSTS in settings.py does not include your Render domain.',
          '',
          'Fix:',
          '   ALLOWED_HOSTS = ["*"]',
          '   Or more specific:',
          '   ALLOWED_HOSTS = ["your-api.onrender.com", "127.0.0.1", "localhost"]',
          '',
          'Note: ALLOWED_HOSTS = ["*"] is fine for student projects.',
          'For real production, list specific domains only.',
        ],
        note: 'ALLOWED_HOSTS must include your full Render domain without https://',
      },
      {
        label: 'Admin CSS broken — unstyled admin panel',
        isText: true,
        text: [
          'Problem: Django admin loads but has no CSS — looks like plain HTML.',
          '',
          'Cause 1: WhiteNoise not configured correctly.',
          'Fix: Verify MIDDLEWARE has WhiteNoiseMiddleware as the second item.',
          '   It must be right after SecurityMiddleware.',
          '',
          'Cause 2: collectstatic did not run or failed.',
          'Fix: Check Render build logs — look for "collectstatic" output.',
          '   If it failed, fix the error and redeploy.',
          '',
          'Cause 3: STATIC_ROOT is wrong.',
          'Fix: STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")',
          '   STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"',
        ],
        note: 'Broken admin CSS is almost always a WhiteNoise middleware order issue or a failed collectstatic run.',
      },
      {
        label: 'Database connection failed',
        isText: true,
        text: [
          'Error: could not connect to server: Connection refused',
          'Or:    OperationalError: FATAL: password authentication failed',
          '',
          'Cause 1: DATABASE_URL not set in Render environment variables.',
          'Fix: Add DATABASE_URL to Render env vars (Phase 13).',
          '',
          'Cause 2: Using External URL instead of Internal URL.',
          'Fix: Use the Internal Database URL from Render PostgreSQL.',
          '',
          'Cause 3: Neon connection string missing ?sslmode=require.',
          'Fix: Append ?sslmode=require to the Neon connection string.',
          '   Or ensure ssl_require=True in dj_database_url.config().',
          '',
          'Cause 4: Database has expired (30-day Render free tier limit).',
          'Fix: Create a new free database and update DATABASE_URL.',
        ],
        note: 'Copy the DATABASE_URL value from Render and paste it into a local test: python -c "import dj_database_url; print(dj_database_url.config(default=\'YOUR_URL\'))" — this verifies parsing is correct.',
      },
      {
        label: 'CORS blocked — frontend cannot call API',
        isText: true,
        text: [
          'Error in browser console: "Access to fetch at blocked by CORS policy"',
          '',
          'Cause 1: CORS_ALLOWED_ORIGINS does not include your frontend URL.',
          'Fix: Add your Vercel URL to CORS_ALLOWED_ORIGINS in Render env vars.',
          '   Example: https://yourfrontend.vercel.app',
          '',
          'Cause 2: corsheaders middleware not in MIDDLEWARE list.',
          'Fix: Add "corsheaders.middleware.CorsMiddleware" to MIDDLEWARE.',
          '   It must come before "django.middleware.common.CommonMiddleware".',
          '',
          'Cause 3: "corsheaders" not in INSTALLED_APPS.',
          'Fix: Add "corsheaders" to INSTALLED_APPS in settings.py.',
          '',
          'Cause 4: Trailing slash mismatch.',
          '   CORS_ALLOWED_ORIGINS should NOT have a trailing slash.',
          '   Right:  https://yourfrontend.vercel.app',
          '   Wrong:  https://yourfrontend.vercel.app/',
        ],
        note: 'After fixing CORS settings, always redeploy on Render. CORS changes in code require a new deployment to take effect.',
      },
      {
        label: 'Wrong gunicorn project name — ModuleNotFoundError on start',
        isText: true,
        text: [
          'Error: ModuleNotFoundError: No module named "your_project_name"',
          'Or:    Failed to find application object in module "wsgi"',
          '',
          'Cause: The project name in Procfile or Start Command is wrong.',
          '',
          'Fix:',
          '1. Open your wsgi.py file',
          '2. Read the first line:',
          '   os.environ.setdefault("DJANGO_SETTINGS_MODULE", "CORRECT_NAME.settings")',
          '3. Use CORRECT_NAME in your Start Command:',
          '   gunicorn CORRECT_NAME.wsgi:application --log-file -',
          '',
          'Common mistake: using the app name instead of the project name.',
          '   Project folder (has settings.py) = correct',
          '   App folder (has models.py)       = wrong',
        ],
        note: 'The Procfile and Start Command must use the project name (folder with settings.py), not the app name (folder with models.py).',
      },
      {
        label: 'DEBUG=True still showing in production',
        isText: true,
        text: [
          'Problem: Error pages show full Python tracebacks on your live site.',
          'This means DEBUG=True in production — a serious security issue.',
          '',
          'Cause 1: DEBUG=True hardcoded in settings.py.',
          'Fix: DEBUG = config("DEBUG", default=False, cast=bool)',
          '   Never hardcode True.',
          '',
          'Cause 2: DEBUG=True in Render environment variables.',
          'Fix: Go to Render → Environment → change DEBUG to False → redeploy.',
          '',
          'Cause 3: DEBUG not set in Render — using local .env value.',
          'Fix: Explicitly add DEBUG=False in Render environment variables.',
          '',
          '⚠️  Full tracebacks in production expose your code structure,',
          '   file paths, and settings. Always verify DEBUG=False before',
          '   sharing your live URL.',
        ],
        note: 'Open your live URL in an incognito window and navigate to a URL that does not exist. If you see a detailed Django error page, DEBUG is still True.',
      },
    ],
  },
]

// ─── HTML / CSS / JS Static Site → GitHub Pages ──────────────────────────────
