export const SCRAPER_GUIDE = [
  {
    phase: '01',
    title: 'What this guide does — run a script on a schedule, for free',
    color: '#FBBF24',
    steps: [
      {
        label: 'The idea: no server, just GitHub Actions on a timer',
        isText: true,
        text: [
          'A scraper, a daily report, a price tracker, an auto-emailer — these are',
          '"batch jobs". They wake up on a schedule, do one job, and go back to sleep.',
          '',
          'You do NOT need a server running 24/7 for that. GitHub can run your',
          'script on a timer for you, for free, using a feature called',
          'GitHub Actions (with a "cron" schedule).',
          '',
          'How it works, end to end:',
          '→ Your script lives in a GitHub repo',
          '→ A tiny workflow file tells GitHub "run this every day at 6 AM"',
          '→ GitHub spins up a fresh Linux machine, runs your script, then throws',
          '  the machine away',
          '→ Your results get saved back into the repo (or uploaded as a file)',
          '',
          'What this is great for:',
          '✅ Web scrapers (news, jobs, prices, sports scores)',
          '✅ Daily/weekly data snapshots and reports',
          '✅ "Ping a website and alert me if it is down" monitors',
          '✅ Auto-posting or auto-emailing on a schedule',
          '',
          'What this is NOT for:',
          '🚫 A live website or API (that needs an always-on host — see the',
          '   Node.js / FastAPI / Flask guides instead)',
          '🚫 A bot that must respond instantly 24/7',
        ],
        note: 'GitHub Actions is genuinely free for this: unlimited minutes on public repos, and 2,000 free minutes/month on private repos. A typical scrape run costs 1–2 minutes.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Scrape responsibly — the rules that keep you (and this) legal',
    color: '#EF4444',
    steps: [
      {
        label: 'Read this before you scrape anything',
        isText: true,
        text: [
          'Scraping is a real skill, but doing it carelessly can get your IP',
          'blocked or break a site\'s rules. Follow these and you are fine:',
          '',
          '✅ Check the site\'s Terms of Service — some sites forbid scraping.',
          '   If they offer an official API, prefer the API.',
          '✅ Check /robots.txt (example: example.com/robots.txt) — respect what',
          '   it disallows.',
          '✅ Go slow. Add a short delay (1–2 seconds) between requests. Never',
          '   hammer a site with hundreds of rapid requests.',
          '✅ Send a real User-Agent header so you are identifiable, not sneaky.',
          '✅ Only scrape public pages. Never scrape behind a login or paywall.',
          '✅ Scrape data, not personal info. Do not collect private user data.',
          '',
          'For learning and portfolios, the safest targets are sites that WANT to',
          'be scraped or offer practice sandboxes:',
          '→ books.toscrape.com     (a sandbox built for practicing scraping)',
          '→ quotes.toscrape.com    (another official practice site)',
          '→ Public APIs / open data (no scraping needed, even easier)',
        ],
        note: 'One polite request every couple of seconds is the difference between a fine hobby project and getting your IP banned. Be a good guest on other people\'s servers.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Build the scraper and confirm it works locally',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Write scraper.py',
        isFile: true,
        fileName: 'scraper.py',
        commands: [
          `import csv
import time
from datetime import datetime, timezone

import httpx
from bs4 import BeautifulSoup

# A sandbox site built specifically for practicing scraping.
URL = "https://books.toscrape.com/"
HEADERS = {"User-Agent": "student-learning-scraper/1.0"}


def scrape():
    resp = httpx.get(URL, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")

    rows = []
    for card in soup.select("article.product_pod"):
        title = card.h3.a["title"]
        price = card.select_one(".price_color").get_text(strip=True)
        rows.append({"title": title, "price": price})
        time.sleep(0.2)  # be polite even on a sandbox

    return rows


def save(rows):
    stamp = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    with open(f"data/books-{stamp}.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["title", "price"])
        writer.writeheader()
        writer.writerows(rows)
    print(f"Saved {len(rows)} rows to data/books-{stamp}.csv")


if __name__ == "__main__":
    save(scrape())`,
        ],
        note: 'This scrapes a practice sandbox that exists for exactly this purpose. Swap the URL and CSS selectors for your own target once it works — the structure stays the same.',
      },
      {
        label: 'Create requirements.txt (the packages your script needs)',
        isFile: true,
        fileName: 'requirements.txt',
        commands: [
          `httpx
beautifulsoup4`,
        ],
        note: 'List every package you import. GitHub installs exactly these before running your script. Pin versions later (e.g. httpx==0.27.0) if you want fully reproducible runs.',
      },
      {
        label: 'Test it locally first',
        commands: [
          `# Create the output folder your script writes into
mkdir data`,
          `# Install the packages
pip install -r requirements.txt`,
          `# Run the scraper
python scraper.py`,
        ],
        note: 'If it prints "Saved N rows" and a CSV appears in data/, you are ready to automate it. If it errors locally, it will error on GitHub too — fix it here first.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Push the project to GitHub',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Add a .gitignore first',
        isFile: true,
        fileName: '.gitignore',
        commands: [
          `# Python
__pycache__/
*.pyc
venv/
.venv/

# Secrets — NEVER commit
.env

# Local editor / OS junk
.DS_Store
Thumbs.db`,
        ],
        note: 'Note: we do NOT ignore the data/ folder here — for a scraper we actually WANT the results committed back so the repo becomes a growing dataset. Keep a placeholder file (see next step) so the folder exists.',
      },
      {
        label: 'Keep the data/ folder in git with a placeholder',
        commands: [
          `# Git does not track empty folders; this keeps data/ in the repo
echo "" > data/.gitkeep`,
        ],
        note: 'Without a file inside it, an empty data/ folder will not be pushed — and then the workflow fails because the folder it writes to does not exist.',
      },
      {
        label: 'Create the repo and push',
        commands: [
          `git init`,
          `git add .`,
          `git commit -m "initial scraper"`,
          `git branch -M main`,
          `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git`,
          `git push -u origin main`,
        ],
        note: 'A PUBLIC repo gets unlimited free Actions minutes. A private repo works too but uses your 2,000 free minutes/month — plenty for a normal scraper, but worth knowing.',
      },
    ],
  },

  {
    phase: '05',
    title: 'The workflow file — this is what runs on the schedule',
    color: '#4ADE80',
    steps: [
      {
        label: 'Why the exact folder path matters',
        isText: true,
        text: [
          'GitHub only looks for workflows in ONE exact place:',
          '',
          '   .github/workflows/',
          '',
          'The leading dot, the folder name "workflows" (plural), and the',
          '.yml extension all matter. If any of these is wrong, GitHub simply',
          'ignores the file and nothing ever runs — with no error message.',
          '',
          'So the file you create in the next step must be at:',
          '   .github/workflows/scrape.yml',
        ],
        note: 'The silent #1 mistake: putting the file in the wrong folder (e.g. workflow instead of workflows, or missing the leading dot). Double-check the path.',
      },
      {
        label: 'Create .github/workflows/scrape.yml',
        isFile: true,
        fileName: '.github/workflows/scrape.yml',
        commands: [
          `name: Daily Scraper

on:
  schedule:
    # Runs every day at 06:00 UTC. GitHub cron is ALWAYS in UTC.
    - cron: "0 6 * * *"
  workflow_dispatch:   # adds a manual "Run workflow" button for testing

# The job needs permission to commit results back to the repo
permissions:
  contents: write

jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - name: Get the code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Install packages
        run: pip install -r requirements.txt

      - name: Run the scraper
        run: python scraper.py

      - name: Commit the new data
        run: |
          git config user.name "github-actions"
          git config user.email "actions@github.com"
          git add data/
          git diff --staged --quiet || git commit -m "data: $(date -u +'%Y-%m-%d')"
          git push`,
        ],
        note: 'The last step commits results ONLY if something changed (that is what "git diff --staged --quiet ||" does), so you do not get empty commits on days the data is identical.',
      },
      {
        label: 'What each part means (so you can change it confidently)',
        isText: true,
        text: [
          'on.schedule.cron  — WHEN it runs (see Phase 06 for the syntax)',
          'on.workflow_dispatch — lets you trigger it by hand from the UI',
          'permissions.contents: write — lets the job push the results back',
          'runs-on: ubuntu-latest — a fresh, free Linux machine each run',
          'actions/checkout — downloads your repo onto that machine',
          'actions/setup-python — installs Python',
          'the run steps — install packages, run your script, save results',
          '',
          'Everything the machine does is thrown away after the run EXCEPT what',
          'you commit or upload — that is why the last step pushes data/ back.',
        ],
        note: 'The machine is brand new and empty every single run. Nothing persists between runs unless you commit it to the repo or upload it as an artifact (Phase 08).',
      },
    ],
  },

  {
    phase: '06',
    title: 'Cron schedules — decode the five little numbers',
    color: '#38BDF8',
    steps: [
      {
        label: 'How to read "0 6 * * *"',
        isText: true,
        text: [
          'A cron schedule is five fields separated by spaces:',
          '',
          '   ┌───────── minute (0 - 59)',
          '   │ ┌─────── hour   (0 - 23)  ← in UTC!',
          '   │ │ ┌───── day of month (1 - 31)',
          '   │ │ │ ┌─── month  (1 - 12)',
          '   │ │ │ │ ┌─ day of week (0 - 6, Sunday = 0)',
          '   * * * * *',
          '',
          'An asterisk (*) means "every". So "0 6 * * *" = at minute 0 of hour 6,',
          'every day, every month, every weekday = 6:00 AM UTC daily.',
          '',
          'Handy examples:',
          '   "0 6 * * *"      → every day at 06:00 UTC',
          '   "0 */6 * * *"    → every 6 hours',
          '   "*/30 * * * *"   → every 30 minutes',
          '   "0 9 * * 1"      → every Monday at 09:00 UTC',
          '   "0 0 1 * *"      → the 1st of every month at midnight UTC',
        ],
        note: 'Not sure about a pattern? Type it into crontab.guru — it shows in plain English exactly when it will run.',
      },
      {
        label: 'Two honest gotchas about GitHub cron',
        isText: true,
        text: [
          '1) It is ALWAYS in UTC — there is no timezone setting.',
          '   India (IST) is UTC + 5:30. So if you want it to run at 9:00 AM IST,',
          '   set the cron to 03:30 UTC:  "30 3 * * *".',
          '   (Subtract 5 hours 30 minutes from your local time.)',
          '',
          '2) The time is "around" then, not exact.',
          '   GitHub scheduled jobs can start 10–30 minutes late when GitHub is',
          '   busy. Perfect for "sometime each morning" — NOT for tasks that must',
          '   fire at an exact second.',
          '',
          '3) The minimum interval is every 5 minutes. On public repos GitHub',
          '   suggests no more often than every ~15 minutes.',
        ],
        note: 'Remember: cron time is UTC. The single most common confusion is "why did it run 5.5 hours off?" — because you gave it your local time instead of UTC.',
      },
    ],
  },

  {
    phase: '07',
    title: 'Secrets — API keys the safe way',
    color: '#EC4899',
    steps: [
      {
        label: 'Never hardcode a key — store it as a GitHub Secret',
        isText: true,
        text: [
          'If your script needs an API key (weather API, an email service, etc.),',
          'do NOT paste it into the code or the workflow file. Anyone reading',
          'your repo would see it.',
          '',
          'Store it as a GitHub Secret instead:',
          '1. Repo → Settings → Secrets and variables → Actions',
          '2. Click "New repository secret"',
          '3. Name it (example: API_KEY) and paste the value → "Add secret"',
          '',
          'GitHub encrypts it. Even you cannot read it back afterwards — you can',
          'only replace it. It never appears in logs.',
        ],
        note: 'Secrets are hidden even in the Actions logs — GitHub automatically masks them if they ever get printed. This is the correct home for any real key.',
      },
      {
        label: 'Use the secret in the workflow',
        isFile: true,
        fileName: '.github/workflows/scrape.yml (edited step)',
        commands: [
          `      - name: Run the scraper
        env:
          API_KEY: \${{ secrets.API_KEY }}
        run: python scraper.py`,
        ],
        note: 'This passes the secret in as an environment variable for that step only. In Python you read it with: import os; key = os.environ["API_KEY"]. The key never touches your source code.',
      },
    ],
  },

  {
    phase: '08',
    title: 'Run it, watch it, and get told when it breaks',
    color: '#F59E0B',
    steps: [
      {
        label: 'Trigger a test run right now (do not wait for the schedule)',
        isText: true,
        text: [
          '1. Push the workflow file to GitHub',
          '2. Go to your repo → the "Actions" tab',
          '3. Click your workflow ("Daily Scraper") in the left sidebar',
          '4. Click "Run workflow" → "Run workflow" (this button exists because',
          '   you added workflow_dispatch)',
          '5. Watch it run live — click the run to see each step\'s logs',
          '',
          'If it goes green ✅ and a new commit appears in data/, it works.',
          'If it goes red ❌, click the failed step and read the log — the error',
          'is right there.',
        ],
        note: 'Always test with the manual "Run workflow" button first. Never push a workflow and just hope it runs correctly at 6 AM tomorrow.',
      },
      {
        label: 'Storing results: commit vs. artifact',
        isText: true,
        text: [
          'Two ways to keep what your script produces:',
          '',
          'A) Commit it back to the repo (used in Phase 05):',
          '   → Best for small data (CSV/JSON). The repo becomes a live dataset',
          '     with full history you can browse.',
          '',
          'B) Upload it as an "artifact" (a downloadable file on the run):',
          '   → Best for bigger files you do not want cluttering the repo.',
          '   Add this step instead of the commit step:',
          '',
          '      - uses: actions/upload-artifact@v4',
          '        with:',
          '          name: scraped-data',
          '          path: data/',
          '',
          'Do NOT commit files over ~50–100 MB — Git is not built for that.',
        ],
        note: 'For a growing dataset you want to see over time, commit it. For a heavy one-off output, upload an artifact and download it from the run page.',
      },
      {
        label: 'Get an email when a scheduled run fails (important!)',
        isText: true,
        text: [
          'Honest gotcha: GitHub does NOT email you when a *scheduled* run fails.',
          'It can silently break for weeks. Two ways to protect yourself:',
          '',
          '→ Simplest: GitHub → your profile → Settings → Notifications →',
          '  Actions → make sure "Send notifications for failed workflows only"',
          '  is enabled. You get an email on red runs.',
          '',
          '→ Also know: if your repo has NO activity for 60 days, GitHub',
          '  auto-disables scheduled workflows. Just push any commit, or click',
          '  "Enable workflow" in the Actions tab, to wake it back up.',
        ],
        note: 'Two facts that save you: scheduled failures are silent by default (turn on failure emails), and scheduled workflows auto-pause after 60 days of repo inactivity.',
      },
    ],
  },

  {
    phase: '09',
    title: 'Free tier & when to outgrow it — the honest version',
    color: '#34D399',
    steps: [
      {
        label: 'What "free" really covers here',
        isText: true,
        text: [
          'GitHub Actions free allowance:',
          '   Public repos:  unlimited minutes — genuinely, truly free.',
          '   Private repos: 2,000 minutes/month free.',
          '',
          'A normal scrape runs in 1–2 minutes. Some real-world budgets:',
          '   Once a day  (~2 min)  → ~60 min/month   → free, even private',
          '   Every hour  (~1 min)  → ~720 min/month  → free, even private',
          '   Every 15 min (~0.5 min) → ~1,440 min/month → still under 2,000',
          '',
          'So for basically any student scraper, you will never pay a cent.',
        ],
        note: 'On a public repo the minutes are unlimited, so cost is simply not a concern. Keep the repo public unless the data must stay private.',
      },
      {
        label: 'When GitHub Actions is the WRONG tool',
        isText: true,
        text: [
          'Be honest with yourself about the limits:',
          '',
          '🚫 You need exact timing (e.g. exactly 09:00:00) → GitHub can be',
          '   10–30 min late. Use a dedicated scheduler.',
          '🚫 You need runs more often than every 5 minutes → not allowed.',
          '🚫 The job runs for hours → you would burn minutes fast on private',
          '   repos (and jobs have a 6-hour hard limit anyway).',
          '',
          'Honest free-ish alternatives for those cases:',
          '→ cron-job.org — free, calls a URL on a precise schedule (great to',
          '  trigger an endpoint on your Render/FastAPI app).',
          '→ Render Cron Jobs — clean, but a PAID feature on Render.',
          '→ A tiny always-on worker (needs a paid host — most free tiers sleep).',
        ],
        note: 'GitHub Actions is unbeatable for "run this occasionally and keep the output". For anything needing precise timing or long runtimes, reach for a dedicated scheduler.',
      },
      {
        label: 'Put it on your resume the right way',
        isText: true,
        text: [
          'This project quietly proves several real skills — say so:',
          '→ "Automated a daily data pipeline with GitHub Actions (CI/CD + cron)"',
          '→ "Scraped and versioned a dataset that updates itself hands-free"',
          '→ Link the repo — the commit history literally shows it running daily,',
          '  which is impossible to fake and very convincing to recruiters.',
        ],
        note: 'The auto-updating commit history is your proof. A repo whose data quietly grows every day shows you can build something that runs without you babysitting it.',
      },
    ],
  },
]
