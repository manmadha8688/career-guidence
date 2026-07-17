export const PYTHONANYWHERE_GUIDE = [
  {
    phase: '01',
    title: 'What is PythonAnywhere and who is it for?',
    color: '#2E7BB4',
    steps: [
      {
        label: 'PythonAnywhere — Python hosting with no build/deploy pipeline',
        isText: true,
        text: [
          'PythonAnywhere is a hosting service dedicated to Python. Everything runs',
          'in your browser: a code editor, Bash consoles, and a "Web" tab where you',
          'point it at your app and click reload. There is no git-push-to-deploy',
          'and no Docker — you edit files on their server and reload.',
          '',
          'Why students like it:',
          '→ Genuinely beginner-friendly — deploy Flask/Django with a web form',
          '→ Your app does NOT sleep like Render free (it stays served)',
          '→ Built-in browser consoles — great from a locked-down college PC',
          '→ A free *.pythonanywhere.com URL with HTTPS',
          '',
          'How it differs from Render/Koyeb:',
          '→ Render builds from GitHub on each push; PythonAnywhere you upload',
          '  code (git clone or file upload) and manually reload the web app',
          '→ PythonAnywhere is Python-only and web-UI driven, not container-based',
          '',
          'Good fit: a Flask/Django class project, a small API, a personal site.',
          'Not a fit: Node/Java apps, websocket-heavy apps, or anything needing',
          'unrestricted outbound internet on the free tier (see Phase 06).',
        ],
        note: 'PythonAnywhere shines for a first Python deployment — no build config, no Docker, just a web form. The trade-offs (whitelisted internet, low CPU, one worker) are covered honestly in Phase 06 so you can decide before you invest time.',
      },
      {
        label: 'The free "Beginner" tier — verified 2026 limits',
        isText: true,
        text: [
          'Free (Beginner) account includes:',
          '   1 web app (1 web worker) at yourname.pythonanywhere.com',
          '   512 MiB disk space',
          '   100 CPU-seconds per day (see below)',
          '   Up to 2 consoles',
          '   Free HTTPS/SSL on the *.pythonanywhere.com domain',
          '',
          'Important 2026 changes (be aware):',
          '→ For accounts created AFTER 2026-01-15, scheduled tasks and MySQL are',
          '  no longer on the free tier — they moved to the paid Developer plan.',
          '→ Free accounts created BEFORE that date keep 1 daily scheduled task.',
          '→ Free web apps now expire after 1 MONTH of inactivity (was 3). You',
          '  get a warning email with a "keep it running" link — nothing is',
          '  deleted, you just log in and click to re-enable.',
          '→ Free accounts get community support (forums), not direct support.',
          '',
          'What "100 CPU-seconds/day" means:',
          '   It is CPU TIME, not wall-clock time. Serving normal web requests',
          '   uses very little CPU. You mainly hit this doing heavy computation.',
          '   Exceed it and your work is not stopped — it just runs at reduced',
          '   priority ("tarpitted") until the next day.',
        ],
        note: 'The 2026 change that catches people out: on NEW free accounts there is no built-in scheduled task and no MySQL. If your project needs a cron job or MySQL, either use a pre-2026 account, upgrade to Developer ($10/mo), or use an external DB (Neon/Turso) + an external cron (GitHub Actions / cron-job.org).',
      },
    ],
  },

  {
    phase: '02',
    title: 'Sign up & get your code onto PythonAnywhere',
    color: '#2E7BB4',
    steps: [
      {
        label: 'Create the account',
        isText: true,
        text: [
          '1. Go to pythonanywhere.com → "Pricing & signup"',
          '2. Choose "Create a Beginner account" (the free one) — no card',
          '3. Pick a username — it BECOMES your URL: username.pythonanywhere.com',
          '4. Confirm your email and log in to the Dashboard',
          '',
          'The Dashboard tabs you will use:',
          '→ Consoles — start a Bash console (your terminal in the browser)',
          '→ Files — browse/upload files',
          '→ Web — configure and reload your web app',
          '→ (Tasks — only if your account/plan includes scheduled tasks)',
        ],
        note: 'Your username is permanent and public in the URL, so pick something you are happy to share (e.g. your name), not a throwaway.',
      },
      {
        label: 'Get your code up — git clone (recommended)',
        commands: [
          `# Open a Bash console (Consoles tab → "Bash"), then:
git clone https://github.com/yourname/yourproject.git`,
          `# Move into it
cd yourproject`,
          `# Later, to update your deployed code, just pull and reload the web app:
git pull`,
        ],
        note: 'Cloning from GitHub is the cleanest workflow: push from your laptop, "git pull" in the PythonAnywhere console, then hit Reload on the Web tab. You can also drag-and-drop files in the Files tab, but git keeps things in sync.',
      },
      {
        label: 'Create a virtualenv and install dependencies',
        commands: [
          `# In the Bash console, create a virtualenv (Python 3.10 shown)
mkvirtualenv myenv --python=/usr/bin/python3.10`,
          `# It activates automatically; install your requirements
cd yourproject
pip install -r requirements.txt`,
          `# To reactivate the env in a future console:
workon myenv`,
        ],
        note: 'Note the FULL PATH to this virtualenv — you will paste it into the Web tab so your app uses the right packages. You can find it later with "echo $VIRTUAL_ENV" while the env is active (typically /home/username/.virtualenvs/myenv).',
      },
    ],
  },

  {
    phase: '03',
    title: 'Deploy a Flask app (Web tab + WSGI)',
    color: '#F97316',
    steps: [
      {
        label: 'Create the web app in the Web tab',
        isText: true,
        text: [
          '1. Web tab → "Add a new web app" → your domain is shown → Next',
          '2. Choose "Manual configuration" (NOT the auto Flask option — manual',
          '   gives you control and works with your git-cloned code)',
          '3. Pick the SAME Python version you used for the virtualenv',
          '4. It creates the app and shows you a WSGI config file path',
          '',
          'Then set two things on the Web tab:',
          '→ "Virtualenv" section: paste your virtualenv path',
          '   /home/username/.virtualenvs/myenv',
          '→ "Code" section: set the Source code + Working directory to your',
          '   project folder, e.g. /home/username/yourproject',
        ],
        note: 'Choose "Manual configuration" so PythonAnywhere does not scaffold a throwaway Flask app over your real code. You wire everything up through the WSGI file yourself — it is just a few lines.',
      },
      {
        label: 'Edit the WSGI file to import YOUR app',
        isFile: true,
        fileName: '/var/www/username_pythonanywhere_com_wsgi.py',
        commands: [
          `import sys

# 1. Add your project folder to the path
project_home = '/home/username/yourproject'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# 2. Import your Flask app object as "application"
#    (if your file is app.py with "app = Flask(__name__)")
from app import app as application`,
        ],
        note: 'PythonAnywhere runs whatever object is named "application" in this file. The line "from app import app as application" means: from app.py, take the Flask instance called app, and expose it as application. Adjust module/variable names to match your code.',
      },
      {
        label: 'Reload and view your site',
        isText: true,
        text: [
          '1. Back on the Web tab, click the big green "Reload" button',
          '2. Visit https://username.pythonanywhere.com — your Flask app is live',
          '',
          'If it errors, open the error log:',
          '→ Web tab → "Log files" → click the Error log',
          '→ Most first-time errors are: wrong virtualenv path, wrong import in',
          '  the WSGI file, or a missing package (pip install it, then reload)',
        ],
        note: 'You must click Reload after ANY code change or "git pull" — PythonAnywhere does not auto-restart. The error log is your best friend; almost every deploy problem is explained there in plain text.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Deploy a Django app',
    color: '#4ADE80',
    steps: [
      {
        label: 'Point the WSGI file at Django',
        isFile: true,
        fileName: '/var/www/username_pythonanywhere_com_wsgi.py',
        commands: [
          `import os
import sys

path = '/home/username/yourproject'
if path not in sys.path:
    sys.path.insert(0, path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'yourproject.settings'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()`,
        ],
        note: 'Django ships its own WSGI entry point via get_wsgi_application(). Set DJANGO_SETTINGS_MODULE to your settings module (folder that contains settings.py). Set the virtualenv path on the Web tab exactly as with Flask.',
      },
      {
        label: 'settings.py — the three must-change lines',
        isFile: true,
        fileName: 'settings.py',
        commands: [
          `# 1. Allow your PythonAnywhere domain
ALLOWED_HOSTS = ['username.pythonanywhere.com']

# 2. Turn OFF debug in production
DEBUG = False

# 3. Where collectstatic puts files (served via the Web tab mapping)
STATIC_URL = '/static/'
STATIC_ROOT = '/home/username/yourproject/static'`,
        ],
        note: 'Leaving DEBUG = True in production leaks stack traces and settings to visitors — always set it False once live. Forgetting to add your domain to ALLOWED_HOSTS gives a "Bad Request (400)" page.',
      },
      {
        label: 'Collect static files & map the static URL',
        commands: [
          `# In a Bash console with your virtualenv active:
cd yourproject
python manage.py collectstatic --noinput`,
          `# Run migrations against your database
python manage.py migrate`,
        ],
        note: 'PythonAnywhere does NOT serve Django static files automatically. After collectstatic, go to the Web tab → "Static files" section and map URL "/static/" to your STATIC_ROOT directory, then Reload. Without this, your site loads but has no CSS.',
      },
      {
        label: 'A note on the database (2026)',
        isText: true,
        text: [
          'On NEW free accounts, MySQL is no longer included. Your options:',
          '→ SQLite — fine for a small project; the db.sqlite3 file lives in your',
          '  512 MiB disk. Simplest, zero setup.',
          '→ An EXTERNAL free database — Neon (Postgres) or Turso, connected via',
          '  DATABASE_URL. But note the outbound-internet whitelist (Phase 06):',
          '  free accounts can only reach whitelisted hosts, and arbitrary DB',
          '  hosts may be blocked. Test the connection early.',
        ],
        note: 'For a free-tier Django demo, SQLite is the path of least resistance. If you need Postgres/MySQL, verify the external host is reachable from a free account first — the whitelist can block it, in which case the Developer plan ($10/mo) removes the restriction.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Scheduled tasks (honest about the 2026 change)',
    color: '#A78BFA',
    steps: [
      {
        label: 'Who can run scheduled tasks now',
        isText: true,
        text: [
          'Scheduled tasks are like cron — run a Python script at a set time.',
          '',
          'The honest 2026 situation:',
          '→ Free accounts created BEFORE 2026-01-15 keep ONE daily scheduled',
          '  task (can run up to ~2 hours).',
          '→ Free accounts created AFTER that date do NOT get scheduled tasks —',
          '  they are now part of the paid Developer plan (20 tasks, hourly/daily).',
          '',
          'If your NEW free account needs periodic jobs, the free alternative:',
          '→ Use GitHub Actions with a cron schedule to run the script, OR',
          '→ Use cron-job.org to hit a URL on your web app on a timer',
          '  (turn the job into a protected endpoint your app exposes).',
        ],
        note: 'Do not assume scheduled tasks are free — on accounts made after Jan 2026 they are a paid feature. GitHub Actions cron is a solid, genuinely-free replacement for "run this script every day" and it does not touch your 100 CPU-seconds budget.',
      },
      {
        label: 'Setting up a task (paid / pre-2026 accounts)',
        isText: true,
        text: [
          '1. Tasks tab → enter the command to run, e.g.:',
          '   /home/username/.virtualenvs/myenv/bin/python',
          '   /home/username/yourproject/daily_job.py',
          '2. Choose the time (UTC) → Create',
          '',
          'Tips:',
          '→ Use the FULL path to the virtualenv python so your packages load',
          '→ Times are UTC — convert from IST (UTC+5:30) when scheduling',
          '→ Print/log output; task logs are available from the Tasks tab',
        ],
        note: 'Always invoke the virtualenv\'s python by full path in a scheduled task, otherwise it uses the system Python and your pip-installed packages will be missing.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Free-tier reality & the outbound whitelist',
    color: '#EF4444',
    steps: [
      {
        label: 'The most important gotcha: outbound internet is whitelisted',
        isText: true,
        text: [
          'On the FREE tier, your app can only make outbound network requests to',
          'sites on PythonAnywhere\'s allow-list (major APIs, package indexes, etc).',
          'Calls to arbitrary third-party APIs or DB hosts may be BLOCKED.',
          '',
          'What this breaks on free:',
          '→ Calling a random external REST API not on the whitelist',
          '→ Connecting to some external databases',
          '→ Outbound email via arbitrary SMTP hosts',
          '',
          'Options:',
          '→ Check the current whitelist (PythonAnywhere maintains a public list)',
          '  and request additions on their forums',
          '→ Upgrade to a paid plan ($10/mo Developer) for UNRESTRICTED outbound',
          '  internet',
        ],
        note: 'This whitelist is the single biggest free-tier surprise. If your project consumes external APIs, verify each host is reachable EARLY — before you build your whole app around it. Unrestricted internet is a paid-plan feature.',
      },
      {
        label: 'Everything else to keep in mind',
        isText: true,
        text: [
          '→ One web app, one worker: fine for a demo, but it handles requests',
          '  one-ish at a time — not built for high concurrency',
          '→ 100 CPU-seconds/day: heavy computation gets throttled, not stopped',
          '→ 512 MiB disk: watch big virtualenvs (ML libraries) + your data',
          '→ Web apps expire after 1 month idle: click the "keep alive" email',
          '  link, or just log in and Reload; nothing is deleted',
          '→ No native background workers on free (use always-on tasks on paid)',
          '',
          'When PythonAnywhere is the RIGHT free choice:',
          '→ A Flask/Django class project or small personal API/site',
          '→ You want it always-served (no cold-start sleep like Render free)',
          '→ You are on a restricted machine and love the in-browser workflow',
        ],
        note: 'PythonAnywhere trades flexibility for simplicity. For a straightforward always-on Flask/Django demo it is excellent and free; for API-heavy apps or anything needing open outbound internet, either budget for the $10/mo plan or deploy on Render/Koyeb instead.',
      },
    ],
  },
]
