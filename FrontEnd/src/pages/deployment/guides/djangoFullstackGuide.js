export const DJANGO_FULLSTACK_GUIDE = [
  {
    phase: '01',
    title: 'What is Django Full Stack and why deploy it?',
    color: '#34D399',
    steps: [
      {
        label: 'Django handles both frontend and backend — one deployment',
        isText: true,
        text: [
          'A Django full stack project uses Django Templates for the frontend.',
          'No React, no separate JavaScript framework.',
          'Django renders HTML pages on the server and sends them to the browser.',
          '',
          'The stack:',
          '→ Django views return HTML (not JSON)',
          '→ Django templates render data from models',
          '→ Static files (CSS, JS, images) served by WhiteNoise',
          '→ PostgreSQL stores all data',
          '→ Everything runs on one Render Web Service',
          '',
          'Advantages of Django full stack for students:',
          '✅ One codebase — no separate frontend repo',
          '✅ One deployment — no Vercel + Render split',
          '✅ Simpler CORS setup — no cross-origin issues',
          '✅ Django admin works out of the box for content management',
          '✅ Great for e-commerce, blog, hospital management, college ERP',
          '',
          'Examples of Django full stack projects:',
          '→ Student management system',
          '→ Blog with admin panel',
          '→ E-commerce site with product listings',
          '→ Hospital appointment booking',
          '→ Library management system',
        ],
        note: 'If your project has HTML templates rendered by Django views (not a React frontend), this is the correct guide for you.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Before deployment — checklist',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Confirm everything works locally before deploying',
        isText: true,
        text: [
          '✅ Virtual environment activated',
          '   source venv/bin/activate  (Mac/Linux)',
          '   venv\\Scripts\\activate     (Windows)',
          '',
          '✅ python manage.py runserver works',
          '✅ All pages load at http://127.0.0.1:8000',
          '✅ Admin panel works at http://127.0.0.1:8000/admin',
          '✅ Forms submit and save data correctly',
          '✅ Static files (CSS, images) load on all pages',
          '✅ Templates render without errors',
          '',
          '✅ requirements.txt created:',
          '   pip freeze > requirements.txt',
          '',
          '✅ .env file exists with SECRET_KEY and DATABASE_URL',
          '✅ .env is in .gitignore',
          '',
          'Fix all issues locally.',
          'What breaks locally will break on Render.',
          'Production errors are harder to debug than local errors.',
        ],
        note: 'Open every page of your site manually in the browser before deploying. Broken template tags, missing static files, and form errors are easier to fix locally.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Install required packages',
    color: '#60A5FA',
    steps: [
      {
        label: 'Install all production dependencies',
        commands: [
          `pip install gunicorn whitenoise dj-database-url psycopg2-binary python-decouple`,
          `pip freeze > requirements.txt`,
        ],
        note: 'Run in your activated virtual environment. These 5 packages cover everything needed: production server, static files, PostgreSQL, environment variables.',
      },
      {
        label: 'What each package does',
        isText: true,
        text: [
          'gunicorn',
          '→ Production web server for Django. Render uses it to start your app.',
          '→ django runserver is only for development — never use in production.',
          '',
          'whitenoise',
          '→ Serves CSS, JS, and image files directly from Django.',
          '→ Without it, all static files return 404 and your pages look broken.',
          '→ Critical for Django full stack — templates rely on static files.',
          '',
          'dj-database-url',
          '→ Reads the DATABASE_URL environment variable and configures Django.',
          '→ Switches from SQLite (local) to PostgreSQL (Render) automatically.',
          '',
          'psycopg2-binary',
          '→ PostgreSQL driver for Python. Required to connect to any Postgres DB.',
          '',
          'python-decouple',
          '→ Reads SECRET_KEY, DEBUG, DATABASE_URL from your .env file locally.',
          '→ On Render, reads from environment variables set in the dashboard.',
        ],
        note: 'After pip install, always run pip freeze > requirements.txt. Render reads this file to install your dependencies during every deployment.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Update settings.py for production',
    color: '#F59E0B',
    steps: [
      {
        label: 'Complete production settings.py for Django full stack',
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
# After first deploy, replace with specific domain:
# ALLOWED_HOSTS = ['your-app.onrender.com', '127.0.0.1', 'localhost']

# ── Installed Apps ────────────────────────────────────────
INSTALLED_APPS = [
    # ... your existing apps unchanged ...
]

# ── Middleware ────────────────────────────────────────────
# WhiteNoise must be second, immediately after SecurityMiddleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    # ... rest of your middleware unchanged ...
]

# ── Templates ─────────────────────────────────────────────
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# ── Static Files ──────────────────────────────────────────
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# For static files inside app folders (appname/static/)
STATICFILES_DIRS = []
# If you keep static files at project root (not inside apps):
# STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]

# ── Media Files (uploaded by users) ───────────────────────
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# ── Database ──────────────────────────────────────────────
DATABASES = {
    'default': dj_database_url.config(
        default=config('DATABASE_URL', default='sqlite:///db.sqlite3'),
        conn_max_age=600,
        ssl_require=not config('DEBUG', default=False, cast=bool),
    )
}

# ── Security headers (production) ─────────────────────────
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SESSION_COOKIE_SECURE = not config('DEBUG', default=False, cast=bool)
CSRF_COOKIE_SECURE = not config('DEBUG', default=False, cast=bool)
CSRF_TRUSTED_ORIGINS = config(
    'CSRF_TRUSTED_ORIGINS',
    default='http://localhost:8000'
).split(',')`,
        ],
        note: 'The key difference from the API guide: TEMPLATES config and STATICFILES_DIRS. Make sure TEMPLATES "DIRS" points to your templates folder so Django finds your HTML files.',
      },
      {
        label: 'Configure static files in urls.py for development',
        isFile: true,
        fileName: 'urls.py',
        commands: [
          `from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('yourapp.urls')),
    # ... your other URL patterns ...
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# Note: static() only adds media URLs in DEBUG=True mode
# In production (DEBUG=False), serve media via cloud storage (Cloudinary, S3)`,
        ],
        note: 'The + static(...) line adds media file serving during local development. In production, WhiteNoise handles static files automatically. For uploaded media files, see Phase 17.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Create .env for local development',
    color: '#EC4899',
    steps: [
      {
        label: 'Create .env file for local secrets',
        isFile: true,
        fileName: '.env',
        commands: [
          `SECRET_KEY=your-local-dev-secret-key-change-this-now
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
CSRF_TRUSTED_ORIGINS=http://localhost:8000`,
        ],
        note: 'For local development, SQLite is fine. You switch to PostgreSQL on Render via DATABASE_URL set in the Render dashboard — no local change needed.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Create .gitignore',
    color: '#F59E0B',
    steps: [
      {
        label: 'Safe .gitignore for Django full stack projects',
        isFile: true,
        fileName: '.gitignore',
        commands: [
          `__pycache__/
*.pyc
*.pyo
*.sqlite3
db.sqlite3

.env
.env.local
.env.*.local

venv/
env/
.venv/

staticfiles/
media/

*.log
.DS_Store
Thumbs.db
.vscode/settings.json`,
        ],
        note: 'staticfiles/ is generated by collectstatic — Render runs this during build so you do not need to commit it. media/ contains user uploads — see Phase 17 for why this is dangerous.',
      },
    ],
  },

  {
    phase: '07',
    title: 'Create Procfile',
    color: '#4ADE80',
    steps: [
      {
        label: 'Create Procfile for Render',
        isFile: true,
        fileName: 'Procfile',
        commands: [
          `web: gunicorn your_project_name.wsgi:application --log-file -`,
        ],
        note: 'Replace "your_project_name" with the folder containing settings.py and wsgi.py — NOT your app folder. Check wsgi.py: the DJANGO_SETTINGS_MODULE value shows the correct project name.',
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
        note: 'After collectstatic, check that the staticfiles/ folder was created. Open every page in the browser and verify CSS loads correctly with the collected static files.',
      },
      {
        label: 'Verify static files work after collectstatic',
        isText: true,
        text: [
          'After python manage.py collectstatic:',
          '',
          '1. A staticfiles/ folder should appear in your project root',
          '2. It should contain your CSS, JS, and image files',
          '   plus Django admin static files (admin/css/base.css etc.)',
          '',
          'Test with DEBUG=False temporarily:',
          '   In .env: DEBUG=False',
          '   Run: python manage.py runserver',
          '   Open http://127.0.0.1:8000 — CSS should still load',
          '   If it loads = WhiteNoise is working correctly',
          '   If broken = WhiteNoise not in MIDDLEWARE or wrong STATIC_ROOT',
          '',
          '   Reset DEBUG=True in .env after testing.',
          '',
          'Also check:',
          '→ Admin panel loads with full styling at /admin',
          '→ All template pages render correctly',
          '→ Form submissions work',
          '→ Images display correctly',
        ],
        note: 'Testing with DEBUG=False locally is the closest simulation of production. If pages look broken in DEBUG=False locally, they will be broken on Render.',
      },
    ],
  },

  {
    phase: '09',
    title: 'Push your project to GitHub',
    color: '#60A5FA',
    steps: [
      {
        label: 'Create GitHub repo and push',
        commands: [
          `git init`,
          `git add .`,
          `git status`,
          `git commit -m "django full stack ready for production"`,
          `git branch -M main`,
          `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git`,
          `git push -u origin main`,
        ],
        note: 'After "git add ." always run "git status" to verify .env, venv/, staticfiles/, and media/ are NOT in the staged files. If they appear, check your .gitignore.',
      },
    ],
  },

  {
    phase: '10',
    title: '🚨 If you accidentally pushed a secret to GitHub',
    color: '#EF4444',
    steps: [
      {
        label: 'Act immediately — delete and revoke first',
        isText: true,
        text: [
          'If .env or any secret key was pushed to GitHub:',
          'Deleting it in a new commit is NOT enough.',
          'The secret still exists in Git history.',
          '',
          'Step 1 — REVOKE the exposed secret immediately:',
          '→ Go to the provider dashboard and delete/regenerate the key',
          '→ For Django SECRET_KEY: generate a new one',
          '→ For database passwords: change them in Render/Neon dashboard',
          '',
          'Step 2 — Remove .env from Git tracking:',
        ],
        note: '⚠️  Bots scan GitHub for leaked secrets within minutes of a push. Treat any pushed secret as already compromised — always revoke it immediately.',
      },
      {
        label: 'Commands to remove .env from Git tracking',
        commands: [
          `git rm --cached .env`,
          `git commit -m "remove .env from git tracking"`,
          `git push`,
          `git log --all -- .env`,
        ],
        note: 'git rm --cached removes .env from tracking without deleting your local file. After this, .env will never be committed again.',
      },
    ],
  },

  {
    phase: '11',
    title: 'Database — choose your option',
    color: '#A78BFA',
    steps: [
      {
        label: 'Option A: Render PostgreSQL (easiest)',
        isText: true,
        text: [
          '1. render.com → New → PostgreSQL',
          '2. Name: your-project-db → Free plan → Create Database',
          '3. Copy the Internal Database URL',
          '   (use Internal URL — faster, stays within Render network)',
          '',
          '⚠️  Render free PostgreSQL expires in 30 days.',
          '   For a long-term project, use Neon instead.',
        ],
        note: 'Render PostgreSQL: 1GB free, expires 30 days. Best for demos and project submissions where data lifespan does not matter.',
      },
      {
        label: 'Option B: Neon PostgreSQL (0.5GB/project, data preserved)',
        isText: true,
        text: [
          '1. neon.tech → Sign up free (no credit card)',
          '2. Create Project → Choose region',
          '3. Copy connection string:',
          '   postgresql://user:pass@ep-xx.aws.neon.tech/neondb?sslmode=require',
          '4. Add as DATABASE_URL in Render environment variables',
          '',
          'Better for projects you want running long-term.',
        ],
        note: 'Neon is the better choice for projects you plan to keep alive for months. 0.5GB/project, no expiry, no credit card.',
      },
    ],
  },

  {
    phase: '12',
    title: 'Deploy Django full stack on Render',
    color: '#EC4899',
    steps: [
      {
        label: 'Create Web Service on Render',
        isText: true,
        text: [
          '1. render.com → Sign up/login with GitHub',
          '2. New → Web Service',
          '3. Connect your GitHub repository',
          '4. Configure:',
          '   Name:     your-project-name',
          '   Region:   nearest to your users',
          '   Branch:   main',
          '   Runtime:  Python 3',
          '',
          '5. Build Command:',
          '   pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput',
          '',
          '6. Start Command:',
          '   gunicorn your_project_name.wsgi:application --log-file -',
          '',
          '7. Click "Create Web Service"',
          '',
          'Your app will be live at: https://your-project-name.onrender.com',
        ],
        note: 'Replace "your_project_name" in the Start Command with the folder name that contains settings.py and wsgi.py.',
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
          'Render → your Web Service → Environment tab → Add variables:',
          '',
          'SECRET_KEY',
          '→ Generate: python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"',
          '→ Must be 50+ random characters',
          '',
          'DEBUG',
          '→ Value: False',
          '',
          'DATABASE_URL',
          '→ Paste connection string from Phase 11',
          '→ Or use "Add from Database" for Render PostgreSQL',
          '',
          'CSRF_TRUSTED_ORIGINS',
          '→ Value: https://your-project-name.onrender.com',
          '→ Required for Django forms to work on the live site',
          '→ Without this, form submissions return 403 Forbidden',
          '',
          'ALLOWED_HOSTS (optional — if not using "*" in settings)',
          '→ Value: your-project-name.onrender.com',
        ],
        note: 'CSRF_TRUSTED_ORIGINS is especially important for Django full stack. Without it, every form submission (login, contact form, etc.) returns a 403 error.',
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
          'Run createsuperuser on your local machine while pointing',
          'to the production PostgreSQL database.',
          '',
          '1. Open your local .env file',
          '2. Temporarily replace DATABASE_URL with the External URL:',
          '   DATABASE_URL=postgresql://user:pass@dpg-xxx.render.com:5432/dbname',
          '   (copy External Database URL from Render PostgreSQL dashboard)',
          '',
          '3. Run:',
          '   python manage.py createsuperuser',
          '',
          '4. Enter your admin username, email, and password when prompted',
          '',
          '5. IMMEDIATELY restore .env after:',
          '   DATABASE_URL=sqlite:///db.sqlite3',
          '',
          '6. Visit https://your-app.onrender.com/admin and log in',
        ],
        note: 'Always restore your local .env to SQLite after creating the superuser. Leaving the production DATABASE_URL locally risks accidental migration or data changes on the production database.',
      },
      {
        label: 'Method 2 — Auto-create via Render environment variables',
        isText: true,
        text: [
          'Add to Render → Environment Variables:',
          '   DJANGO_SUPERUSER_USERNAME = admin',
          '   DJANGO_SUPERUSER_EMAIL    = your@email.com',
          '   DJANGO_SUPERUSER_PASSWORD = YourStrongPassword123',
          '',
          'Update the Build Command in Render to include:',
          '   pip install -r requirements.txt &&',
          '   python manage.py migrate &&',
          '   python manage.py collectstatic --noinput &&',
          '   (python manage.py createsuperuser --noinput || true)',
          '',
          'The || true at the end:',
          '→ First deploy: creates the superuser successfully',
          '→ Every deploy after: command fails (user exists) but || true means build succeeds',
          '',
          'After first deploy:',
          '→ Visit https://your-app.onrender.com/admin',
          '→ Log in with DJANGO_SUPERUSER_USERNAME and DJANGO_SUPERUSER_PASSWORD',
        ],
        note: 'Once the superuser is created you can remove the DJANGO_SUPERUSER_* env vars from Render for security, or leave them for auto-recreation on new deployments.',
      },
    ],
  },

  {
    phase: '15',
    title: 'Verify your live full stack app',
    color: '#4ADE80',
    steps: [
      {
        label: 'Test every part of your live Django application',
        isText: true,
        text: [
          '✅ Homepage: https://your-app.onrender.com/',
          '   All CSS and images should load correctly (WhiteNoise working)',
          '',
          '✅ Every page of your site',
          '   Navigate through all URLs — check for broken layouts',
          '',
          '✅ Admin panel: https://your-app.onrender.com/admin',
          '   Should load with full Django admin CSS',
          '   Log in and verify models are accessible',
          '',
          '✅ Forms work correctly',
          '   Submit a test form — check for 403 CSRF errors',
          '   If 403: add your URL to CSRF_TRUSTED_ORIGINS in Render env vars',
          '',
          '✅ Database persistence',
          '   Create a record via admin → refresh the page',
          '   Data should persist (PostgreSQL working)',
          '',
          '✅ Static files on all pages',
          '   No broken CSS or missing images on any page',
          '',
          '⚠️  Check Render Logs tab if any page errors.',
          '   Django shows the exact error with file and line number.',
        ],
        note: 'Test every form submission on the live site. CSRF errors only appear in production with DEBUG=False — you will not see them locally.',
      },
    ],
  },

  {
    phase: '16',
    title: 'Final deployment checklist',
    color: '#34D399',
    steps: [
      {
        label: 'Verify all items before sharing your live link',
        isText: true,
        text: [
          '── Security ────────────────────────────',
          '✅ DEBUG=False in Render environment variables',
          '✅ SECRET_KEY is a real random 50+ char string',
          '✅ .env is in .gitignore (run git status to confirm)',
          '✅ No secrets in Git history',
          '',
          '── Database & Static ───────────────────',
          '✅ Migrations ran (check Render build logs)',
          '✅ Admin panel loads with full CSS styling',
          '✅ All pages load with CSS and images',
          '✅ Data persists in PostgreSQL',
          '',
          '── Forms & CSRF ─────────────────────────',
          '✅ All forms submit without 403 errors',
          '✅ CSRF_TRUSTED_ORIGINS set in Render env vars',
          '✅ Login and logout work',
          '',
          '── Resume ──────────────────────────────',
          '✅ GitHub README has live URL',
          '✅ Resume and LinkedIn updated with live link',
        ],
        note: 'A deployed Django full stack project with a working admin panel and forms is one of the strongest student portfolio projects for backend roles.',
      },
    ],
  },

  {
    phase: '17',
    title: '⚠️  Media files warning (ephemeral filesystem)',
    color: '#F59E0B',
    steps: [
      {
        label: 'User-uploaded files are lost on every Render redeploy',
        isText: true,
        text: [
          'Render free services have an ephemeral filesystem.',
          'Any file written to disk during runtime is temporary.',
          '',
          'What this means for Django full stack:',
          '→ ImageField and FileField uploads save to media/ folder',
          '→ These files disappear every time Render restarts or redeploys',
          '→ Profile pictures, documents, and other uploads will be lost',
          '',
          'For student projects with no file uploads:',
          '→ This does not affect you. Database data is safe.',
          '',
          'If your project has file uploads — use Cloudinary:',
          '   pip install cloudinary django-cloudinary-storage',
          '   Add CLOUDINARY_URL to Render environment variables',
          '   Files upload to Cloudinary CDN — never lost',
          '',
          'Free Cloudinary tier: 25GB storage, plenty for student projects.',
        ],
        note: 'Database records (PostgreSQL) are completely safe — only media files uploaded at runtime are at risk. If your models have no ImageField or FileField, skip this step.',
      },
    ],
  },

  {
    phase: '18',
    title: 'Free tier — honest explanation',
    color: '#4ADE80',
    steps: [
      {
        label: 'What the Render free tier means for your full stack project',
        isText: true,
        text: [
          'Render free tier is enough for student demos and portfolio projects.',
          '',
          '✅ Service sleeps after 15 min of inactivity → ~30s cold start',
          '   Use cron-job.org (Phase 20) to keep it awake if needed.',
          '   For demos: open the app 1 minute before showing it.',
          '',
          '✅ 512 MB RAM — fine for a Django web app with templates',
          '   Only an issue if you have very large image processing.',
          '',
          '✅ PostgreSQL expires in 30 days (Render DB)',
          '   Use Neon for longer-running projects.',
          '',
          '✅ Static files served by WhiteNoise are fast enough for demos',
          '   For high-traffic production, use a CDN.',
          '',
          'For students: deploy and use it.',
          'The limitations are invisible at student project scale.',
        ],
        note: 'Render free tier is not for production businesses. For portfolio projects and college submissions — it works perfectly.',
      },
    ],
  },

  {
    phase: '19',
    title: 'Keep backend awake with cron-job.org',
    color: '#60A5FA',
    steps: [
      {
        label: 'Prevent cold starts with a free ping job',
        isText: true,
        text: [
          '1. Go to cron-job.org → Sign up free',
          '2. Click "CREATE CRONJOB"',
          '3. Fill in:',
          '   Title:    Keep Django Alive',
          '   URL:      https://your-app.onrender.com/',
          '   Schedule: Every 10 minutes (Custom → Minutes: */10)',
          '4. Click CREATE → toggle ON',
          '',
          '✅ Regular pings keep Render awake most of the time, so visitors',
          '   usually avoid the ~30s cold start. It is not a 24/7 guarantee.',
          '',
          'Check execution log in cron-job.org to confirm 200 OK responses.',
        ],
        note: 'cron-job.org is completely free. This is the standard workaround used by students on Render free tier.',
      },
    ],
  },

  {
    phase: '20',
    title: 'Common errors and fixes',
    color: '#F97316',
    steps: [
      {
        label: 'TemplateDoesNotExist error',
        isText: true,
        text: [
          'Error: TemplateDoesNotExist: home.html',
          '',
          'Cause: Django cannot find your HTML template files.',
          '',
          'Fix:',
          '1. Check TEMPLATES DIRS in settings.py:',
          '   "DIRS": [os.path.join(BASE_DIR, "templates")]',
          '2. Make sure your templates folder actually contains the file',
          '3. Check the file name spelling — case-sensitive on Linux',
          '',
          'Template folder options:',
          '→ project/templates/home.html  ← if DIRS includes templates/',
          '→ app/templates/app/home.html  ← if APP_DIRS=True',
        ],
        note: 'TemplateDoesNotExist is the most common Django full stack deployment error. Always set TEMPLATES DIRS explicitly so Django finds your HTML files.',
      },
      {
        label: 'CSS not loading — unstyled pages',
        isText: true,
        text: [
          'Problem: Pages load but have no CSS styling.',
          '',
          'Cause 1: WhiteNoise not configured correctly.',
          'Fix: Verify MIDDLEWARE has WhiteNoiseMiddleware as second item.',
          '',
          'Cause 2: STATICFILES_STORAGE wrong or collectstatic failed.',
          'Fix: Check Render build logs for collectstatic errors.',
          '   Confirm STATICFILES_STORAGE uses whitenoise.storage setting.',
          '',
          'Cause 3: Wrong {% load static %} in templates.',
          'Fix: Every template that uses {% static %} must have',
          '   {% load static %} at the top.',
          '   <link rel="stylesheet" href="{% static \'css/style.css\' %}">',
        ],
        note: 'In Django templates, always use {% static "path/file.css" %} for static files — never hardcode /static/path/file.css.',
      },
      {
        label: 'Forms return 403 Forbidden',
        isText: true,
        text: [
          'Problem: Form submissions return 403 Forbidden error.',
          '',
          'Cause: CSRF verification failed.',
          'Django protects all POST forms with CSRF tokens.',
          '',
          'Fix 1: Add your live URL to CSRF_TRUSTED_ORIGINS:',
          '   Render → Environment Variables',
          '   CSRF_TRUSTED_ORIGINS = https://your-app.onrender.com',
          '',
          'Fix 2: Make sure {% csrf_token %} is inside all forms:',
          '   <form method="POST">',
          '     {% csrf_token %}',
          '     ...',
          '   </form>',
          '',
          'Fix 3: Redeploy after updating CSRF_TRUSTED_ORIGINS.',
        ],
        note: 'CSRF 403 errors only appear in production (DEBUG=False). You will not see them locally. Always add CSRF_TRUSTED_ORIGINS before sharing your live site.',
      },
      {
        label: 'Admin CSS broken after deploy',
        isText: true,
        text: [
          'Problem: Django admin loads but has no CSS — looks like plain HTML.',
          '',
          'Cause 1: WhiteNoise not second in MIDDLEWARE.',
          'Fix: WhiteNoise must be immediately after SecurityMiddleware.',
          '',
          'Cause 2: collectstatic did not collect admin CSS.',
          'Fix: Render → Logs → check collectstatic output.',
          '   Look for: "X static files copied to staticfiles/"',
          '   Admin CSS is at: staticfiles/admin/css/base.css',
          '',
          'Cause 3: STATICFILES_STORAGE not set to whitenoise.storage.',
          'Fix: STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"',
        ],
        note: 'If admin CSS works locally but breaks on Render, WhiteNoise is almost always the cause. Check middleware order first.',
      },
    ],
  },
]

// ─── Node.js / Express → Render ────────────────────────────────────────────────
