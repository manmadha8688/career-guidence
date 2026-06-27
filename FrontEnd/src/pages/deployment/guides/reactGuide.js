export const REACT_GUIDE = [
  {
    phase: '01',
    title: 'What is Vercel and why deploy your project?',
    color: '#60A5FA',
    steps: [
      {
        label: 'What Vercel gives you — completely free',
        isText: true,
        text: [
          'Vercel is a cloud hosting platform built specifically for frontend projects.',
          'When you push code to GitHub, Vercel automatically builds and deploys it.',
          'No server setup. No configuration. No credit card needed.',
          '',
          'What you get on the free Hobby plan:',
          '✅ Free HTTPS — your app gets an SSL certificate automatically',
          '✅ Global CDN — served fast from servers near every visitor',
          '✅ Auto-redeploy — every git push rebuilds your app in ~1 minute',
          '✅ Free custom domain — connect your own .com domain',
          '✅ Preview URLs — every branch gets its own shareable preview link',
          '✅ Zero server management — Vercel handles everything',
          '',
          'Why a deployed project beats a localhost project on your resume:',
          '→ Recruiters can see your work without installing anything',
          '→ A live URL proves the project works end-to-end, not just in theory',
          '→ It shows deployment knowledge — a real engineering skill',
          '→ LinkedIn, resume, and GitHub all support live links',
          '→ It is the single highest-impact thing you can do for your portfolio',
        ],
        note: 'A deployed project with a live URL is 10x more impressive than a GitHub repo that only runs on your machine. Always deploy before sharing your resume.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Before you deploy — checklist',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Make sure the project runs locally first',
        isText: true,
        text: [
          '1. Open your terminal in the project folder',
          '2. Run: npm install',
          '   (installs all packages listed in package.json)',
          '3. Run: npm run dev',
          '   (starts local development server at localhost:5173)',
          '4. Open the URL in browser — test every page and feature',
          '',
          'If anything is broken locally, it will also be broken on Vercel.',
          'Fix all local bugs before touching deployment.',
          '',
          'Also confirm your package.json has these scripts:',
          '   "dev":     "vite"',
          '   "build":   "vite build"',
          '   "preview": "vite preview"',
        ],
        note: 'npm install only needs to run once, or when you add a new package. npm run dev starts the app for local testing.',
      },
      {
        label: 'Run a production build and fix any errors',
        commands: [
          `npm run build`,
          `npm run preview`,
        ],
        note: 'npm run build is EXACTLY what Vercel runs on their servers. If it fails here, it fails on Vercel. Fix all errors before pushing. npm run preview lets you test the built dist/ folder locally — what you see is what Vercel deploys.',
      },
      {
        label: 'Clean up your project before pushing',
        isText: true,
        text: [
          '✅ Remove test components and unused files',
          '✅ Remove or comment out console.log() calls',
          '   (they are visible in browser DevTools to anyone)',
          '✅ Check all images load — no broken icons',
          '✅ Test mobile layout in Chrome DevTools (Toggle device toolbar)',
          '✅ Click through every route and page',
          '✅ Check page title shows in browser tab (<title> in index.html)',
          '',
          'Output folder reference:',
          '→ Vite project: output goes to dist/',
          '→ Create React App: output goes to build/',
          'Vite is auto-detected by Vercel. CRA may need manual setting (see Phase 09).',
        ],
        note: 'console.log() statements are visible to everyone who opens your site in DevTools. Remove them before deploying a public project.',
      },
    ],
  },

  {
    phase: '03',
    title: '.gitignore setup — protect your project',
    color: '#F59E0B',
    steps: [
      {
        label: 'Create .gitignore in your project root',
        isFile: true,
        fileName: '.gitignore',
        commands: [
          `# Dependencies — never commit, huge and auto-installed by npm install
node_modules/

# Build output — Vercel builds this itself, no need to push it
dist/
build/

# Environment variable files — NEVER push to GitHub
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env.*.local

# OS files
.DS_Store
Thumbs.db

# Editor config
.vscode/settings.json
*.log
npm-debug.log*`,
        ],
        note: 'Create this file in your project root (same folder as package.json) BEFORE running git add . for the first time. If you add it after, already-tracked files need extra steps to remove.',
      },
      {
        label: 'Why these folders must never go to GitHub',
        isText: true,
        text: [
          'node_modules/ — Why to ignore:',
          '→ Can contain 50,000+ files and hundreds of megabytes',
          '→ GitHub has file size and push limits — large modules will cause push failures',
          '→ Anyone who clones your repo runs npm install and gets them automatically',
          '→ They are never your code — they belong to package authors',
          '',
          '.env files — Why to ignore:',
          '→ Contains secret keys, API tokens, and passwords',
          '→ Once pushed to a public GitHub repo, anyone on the internet can read it',
          '→ Automated bots scan GitHub for leaked secrets within minutes of a push',
          '→ A leaked key can be abused — you may get unexpected charges on your account',
          '',
          'Verify .gitignore is working correctly:',
          '→ Run: git status',
          '→ You should NOT see node_modules/ or .env in the file list',
          '→ If you do see them, see Phase 05 — act before pushing',
        ],
        note: 'Run "git status" before EVERY "git push". Make it a habit. This one check prevents most accidental secret leaks.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Push your code to GitHub',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Create a GitHub repo and connect your project',
        isText: true,
        text: [
          '1. Go to github.com → click "+" (top right) → "New repository"',
          '2. Name your repo (example: my-portfolio)',
          '3. Set visibility to Public (Vercel needs access on the free plan)',
          '4. Do NOT check "Add README", "Add .gitignore", or "Choose a license"',
          '   if your local project already has these files.',
          '   Checking them creates an extra commit that causes a merge conflict.',
          '5. Click "Create repository"',
          '6. GitHub shows you the exact commands to run — or use these below:',
        ],
        note: 'Create the empty GitHub repo first, THEN run git commands. Do not initialize with README if your project already has one.',
      },
      {
        label: 'Initialize git and push to GitHub',
        commands: [
          `# Initialize a new git repo in your project folder
git init`,
          `# Stage all files — .gitignore automatically excludes node_modules and .env
git add .`,
          `# Create your first commit
git commit -m "initial commit"`,
          `# Rename the branch to main (GitHub uses main by default)
git branch -M main`,
          `# Connect your local repo to GitHub (replace with YOUR details)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git`,
          `# Push code to GitHub
git push -u origin main`,
        ],
        note: 'Replace YOUR_USERNAME with your GitHub username and YOUR_REPO_NAME with the repository name you created. Copy the exact URL from GitHub — it is shown on the repo page.',
      },
      {
        label: 'Common Git mistakes and quick fixes',
        isText: true,
        text: [
          'Error: "remote origin already exists"',
          'Fix: git remote remove origin — then re-run git remote add origin ...',
          '',
          'Error: Authentication failed / password rejected',
          'Fix: GitHub removed password auth. Use a Personal Access Token (PAT).',
          '   GitHub → Settings → Developer Settings → Personal Access Tokens → Classic',
          '   Generate a token with "repo" scope. Use it as password when prompted.',
          '',
          'Error: Branch "master" vs "main" mismatch',
          'Fix: Run git branch -M main before pushing.',
          '',
          'Error: "src refspec main does not match any"',
          'Fix: You have not committed anything yet.',
          '   Run git add . and git commit -m "initial commit" first.',
          '',
          'Problem: node_modules is showing in git status',
          'Fix: git rm -r --cached node_modules',
          '   git commit -m "remove node_modules from tracking"',
          '   Ensure node_modules/ is in .gitignore',
          '',
          'Problem: .env file is showing in git status',
          'Fix: See Phase 05. Stop — do not push until .env is removed from tracking.',
        ],
        note: 'Run "git status" and review the file list before EVERY "git push". One glance prevents most accidental leaks.',
      },
    ],
  },

  {
    phase: '05',
    title: '🚨 If you accidentally pushed a secret to GitHub',
    color: '#EF4444',
    steps: [
      {
        label: 'Deleting the file in a new commit is NOT enough — act immediately',
        isText: true,
        text: [
          'If you committed a .env file or API key to GitHub:',
          'Deleting it in a new commit does NOT make it safe.',
          'The key still exists in every previous commit in Git history.',
          'Anyone can run "git log" and see every version of every file ever committed.',
          '',
          'GitHub indexes public repos. Automated bots scan for leaked secrets',
          'within minutes of any push. Assume the key is already compromised.',
          '',
          'Step 1 — REVOKE the leaked key immediately from the provider:',
          '→ OpenAI: platform.openai.com → API Keys → Delete key → Create new',
          '→ Google/Maps: console.cloud.google.com → Credentials → Delete → Create',
          '→ Firebase: Firebase Console → Project Settings → Regenerate web config',
          '→ Razorpay: dashboard.razorpay.com → Settings → API Keys → Regenerate',
          '→ Stripe: dashboard.stripe.com → API Keys → Roll key',
          '→ Any other: go to its dashboard and generate a completely new key',
          '',
          'Step 2 — Add .env to .gitignore (if not already done)',
          'Step 3 — Run the commands in the next step to stop tracking .env',
        ],
        note: '⚠️  Revoking the key is mandatory even if you clean Git history. Old keys may have already been cached, scraped, or used. Always generate a fresh key and use that going forward.',
      },
      {
        label: 'Commands to remove .env from Git tracking',
        commands: [
          `# Stop tracking .env — removes it from Git index but keeps it on your disk
git rm --cached .env`,
          `# Commit the removal
git commit -m "remove .env from git tracking"`,
          `# Push to GitHub
git push`,
          `# Check whether .env appears in any commit in history
git log --all -- .env`,
          `# Search all commits for a specific leaked key value
git grep "YOUR_LEAKED_KEY_VALUE" $(git rev-list --all)`,
        ],
        note: 'git rm --cached removes the file from Git tracking without deleting it from your local disk. After this, .env is ignored going forward.',
      },
      {
        label: 'If the secret is in old commits — clean Git history (advanced)',
        isText: true,
        text: [
          'If "git log --all -- .env" shows commits containing the file,',
          'those commits still hold the secret. To fully remove from history:',
          '',
          'Option A — git-filter-repo (modern, recommended):',
          '   pip install git-filter-repo',
          '   git filter-repo --path .env --invert-paths',
          '   git push --force',
          '',
          'Option B — BFG Repo Cleaner (simpler, needs Java):',
          '   Download from: rtyley.github.io/bfg-repo-cleaner',
          '   java -jar bfg.jar --delete-files .env',
          '   git reflog expire --expire=now --all',
          '   git gc --prune=now --aggressive',
          '   git push --force',
          '',
          '⚠️  Force push rewrites the entire commit history on GitHub.',
          'If collaborators have cloned the repo, they must delete and re-clone.',
          '',
          'REMEMBER: Cleaning history does NOT make the old key safe.',
          'Always use the newly generated key — never the one that was exposed.',
        ],
        note: 'For solo student projects: revoke old key → use git-filter-repo to clean history → generate new key → store new key only in .env (never commit it again).',
      },
    ],
  },

  {
    phase: '06',
    title: 'Fix React Router 404 on page refresh',
    color: '#A78BFA',
    steps: [
      {
        label: 'Why routes like /dashboard show 404 on refresh',
        isText: true,
        text: [
          'If your app uses React Router, routes like:',
          '   /about',
          '   /dashboard',
          '   /projects/1',
          '',
          '...will show a 404 error when you refresh the page or type the URL directly.',
          '',
          'Why this happens:',
          'React Router handles routing inside the browser (client-side routing).',
          'But when you refresh /dashboard, the browser asks Vercel for that file —',
          'which does not exist. Vercel returns 404.',
          '',
          'Fix: create vercel.json before deploying so the fix is live from day one.',
          'React Router then reads the URL in the browser and renders the correct page.',
        ],
        note: 'Create this file now and include it in your first push so routes work from the very first deployment.',
      },
      {
        label: 'Create vercel.json in your project root',
        isFile: true,
        fileName: 'vercel.json',
        commands: [
          `{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}`,
        ],
        note: 'Place this file in the ROOT of your project — the same folder as package.json, not inside src/. Commit and push it along with your code.',
      },
    ],
  },

  {
    phase: '07',
    title: 'Environment variables — understand the security rules',
    color: '#EC4899',
    steps: [
      {
        label: 'How Vite environment variables work',
        isFile: true,
        fileName: '.env',
        commands: [
          `# In Vite, frontend env variables MUST start with VITE_
# Without the VITE_ prefix, the variable is undefined in your app

VITE_API_URL=https://your-backend.onrender.com
VITE_APP_NAME=My Portfolio
VITE_GOOGLE_MAPS_KEY=AIzaSy...yourpublickey`,
        ],
        note: 'Access env vars in your React code using: import.meta.env.VITE_API_URL — the VITE_ prefix is not optional, it is required by Vite.',
      },
      {
        label: '⚠️  Critical security rule — frontend env vars are NOT secret',
        isText: true,
        text: [
          'IMPORTANT: Everything in a React/Vite .env file becomes visible',
          'in the browser after the app is built. There is no way to hide it.',
          'Vite bakes all VITE_ variables directly into your JavaScript bundle.',
          'Anyone can open DevTools → Sources and read them.',
          '',
          '✅ SAFE to put in frontend .env:',
          '   VITE_API_URL = your public backend URL',
          '   VITE_FIREBASE_API_KEY = Firebase web config key (designed to be public)',
          '   VITE_GOOGLE_MAPS_KEY = Maps key (restrict it to your domain in Google Console)',
          '   VITE_APP_TITLE = your app name',
          '   VITE_GA_MEASUREMENT_ID = Google Analytics ID',
          '',
          '🚫 NEVER put in frontend .env:',
          '   Database connection strings (MongoDB URI, PostgreSQL URL)',
          '   JWT secret keys or signing secrets',
          '   Payment gateway secret keys (Razorpay secret, Stripe secret key)',
          '   Admin passwords or service account credentials',
          '   SMTP email passwords',
          '   AWS / GCP / Azure secret access keys',
          '   Any key that says "secret" or "private" in the provider dashboard',
          '',
          'If your feature needs a private key:',
          '→ The private key must live on your BACKEND server',
          '→ React calls your backend API endpoint',
          '→ The backend uses the secret key internally',
          '→ The backend returns only the result — the secret never touches React',
        ],
        note: '⚠️  There is no such thing as a secret environment variable in a React app. Vite inlines all VITE_ variables into your JavaScript bundle at build time — they are always readable in DevTools.',
      },
    ],
  },

  {
    phase: '08',
    title: 'Add environment variables in Vercel dashboard',
    color: '#60A5FA',
    steps: [
      {
        label: 'How to add env variables to your deployed app',
        isText: true,
        text: [
          '1. Go to vercel.com → open your project',
          '2. Click the "Settings" tab (top navigation)',
          '3. Click "Environment Variables" in the left sidebar',
          '4. Click "Add New"',
          '   Name:  VITE_API_URL',
          '   Value: https://your-backend.onrender.com',
          '   Check: Production ✅  Preview ✅  Development ✅',
          '5. Click "Save"',
          '6. Go to "Deployments" tab → click the three-dot menu "..." → "Redeploy"',
          '   (env variables only take effect on the NEXT deployment)',
          '',
          'Important rules:',
          '→ Vite variables MUST start with VITE_',
          '   API_URL without the VITE_ prefix = undefined in your app',
          '→ After adding or changing any env var, you MUST redeploy',
          '→ The current live build does not automatically pick up new vars',
          '',
          '⚠️  Security reminder:',
          'Never add private backend keys, database passwords, or JWT secrets here',
          'for a frontend app. Frontend env vars are visible in the browser.',
          'Private secrets belong in your backend deployment (Render, Railway, etc.).',
        ],
        note: 'After adding any env variable to Vercel, go to Deployments → Redeploy. Until you redeploy, the new variable has no effect on the live app.',
      },
    ],
  },

  {
    phase: '09',
    title: 'Deploy on Vercel',
    color: '#F59E0B',
    steps: [
      {
        label: 'Import your repo and deploy in 3 steps',
        isText: true,
        text: [
          '1. Go to vercel.com → Click "Sign Up" → "Continue with GitHub"',
          '   (log in with GitHub so Vercel can access your repositories)',
          '',
          '2. Click "New Project" → find your repo → click "Import"',
          '',
          '3. Vercel auto-detects Vite or Create React App:',
          '   Framework Preset:  Vite  (auto-selected)',
          '   Build Command:     npm run build  (auto-filled)',
          '   Output Directory:  dist  (auto-filled for Vite)',
          '',
          '   If you use Create React App, change Output Directory to: build',
          '',
          '4. Click "Deploy" — wait about 1 minute',
          '',
          '5. Your app is live at: your-project-name.vercel.app',
          '   Vercel shows the link on the success screen.',
          '',
          'What happens automatically after this:',
          '→ Every push to main branch triggers a new deployment',
          '→ Every other branch or pull request gets its own preview URL',
          '→ You can share the preview URL before merging to main',
        ],
        note: 'If Vercel does not auto-detect the output directory correctly: Settings → Build & Output Settings → Output Directory → set to "dist" for Vite or "build" for Create React App.',
      },
    ],
  },

  {
    phase: '10',
    title: 'Common deployment errors and fixes',
    color: '#F97316',
    steps: [
      {
        label: 'npm run build fails — error during build',
        isText: true,
        text: [
          'Problem: Vercel deployment fails with a build error.',
          'Cause: The build fails on Vercel exactly as it would on your machine.',
          '',
          'Fix:',
          '1. Run npm run build locally in your terminal',
          '2. Read the exact error message — it tells you what is wrong',
          '3. Fix the issue in your code',
          '4. Confirm npm run build completes successfully with no errors',
          '5. Push the fix — Vercel redeploys automatically',
          '',
          'Common build errors:',
          '→ "Cannot find module X" — run: npm install X — then push package.json',
          '→ TypeScript or ESLint errors — fix the flagged issues in your code',
          '→ Missing dependency — the import exists in code but not in package.json',
          '→ Syntax errors — check the file and line number shown in the error',
        ],
        note: 'The golden rule: if npm run build fails locally, it fails on Vercel. Always test your build locally before pushing to save time.',
      },
      {
        label: 'Blank white screen after deploy',
        isText: true,
        text: [
          'Problem: Deployment succeeds but the app shows a blank white page.',
          '',
          'Cause 1 — Wrong output directory:',
          'Fix: Vercel → Settings → Build & Output Settings → Output Directory',
          '   Vite: dist',
          '   Create React App: build',
          '',
          'Cause 2 — JavaScript crash on load:',
          'Fix: Open browser console (F12) on the live URL → read the red error.',
          '',
          'Cause 3 — React Router without vercel.json:',
          'Fix: Add vercel.json with SPA rewrites (see Phase 06).',
          '',
          'Cause 4 — Assets using absolute local file paths:',
          '   Wrong: src="/Users/yourname/Desktop/project/src/image.png"',
          '   Right:  import logo from "./assets/logo.png"',
        ],
        note: 'Press F12 and check the Console tab on your live Vercel URL. The error message almost always points to the exact problem and file.',
      },
      {
        label: 'Images and assets not loading — broken icons',
        isText: true,
        text: [
          'Problem: Images show as broken on Vercel but load fine locally.',
          '',
          'Cause 1 — File path case sensitivity (most common):',
          'Your local filesystem (Windows/Mac) is case-insensitive.',
          'Vercel runs on Linux — Linux IS case-sensitive.',
          '',
          '   Wrong: import img from "./Assets/Logo.PNG"',
          '   Right:  import img from "./assets/logo.png"',
          '',
          'The filename must EXACTLY match — including uppercase/lowercase letters.',
          'Check with: git status — it shows real filenames as Git sees them.',
          '',
          'Cause 2 — Files in public/ referenced incorrectly:',
          '   src="/logo.png"  not  src="./public/logo.png"',
          '',
          'Cause 3 — File too large:',
          'Compress images at: squoosh.app or tinypng.com',
        ],
        note: 'Case sensitivity is the #1 cause of broken assets on Vercel for Windows users. Works locally (Windows ignores case) but fails on Vercel (Linux is strict).',
      },
      {
        label: 'Environment variable is undefined in the app',
        isText: true,
        text: [
          'Problem: import.meta.env.VITE_API_URL is undefined after deploy.',
          '',
          'Cause 1 — Variable not added to Vercel dashboard:',
          'Fix: Vercel → project → Settings → Environment Variables → add it',
          '',
          'Cause 2 — Missing VITE_ prefix:',
          '   Wrong: API_URL=https://...  (undefined in app)',
          '   Right:  VITE_API_URL=https://...  (works as import.meta.env.VITE_API_URL)',
          '',
          'Cause 3 — Did not redeploy after adding the variable:',
          'Fix: Vercel → Deployments → "..." menu → Redeploy',
          '',
          'Cause 4 — Using process.env instead of import.meta.env:',
          '   Wrong: process.env.REACT_APP_API_URL  (Create React App style)',
          '   Right:  import.meta.env.VITE_API_URL   (Vite style)',
        ],
        note: 'Debug tip: temporarily add console.log(import.meta.env) to your app — you will see all VITE_ variables listed. Remove it after testing.',
      },
      {
        label: 'GitHub repo not showing in Vercel import list',
        isText: true,
        text: [
          'Problem: Your repo does not appear when you try to import on Vercel.',
          'Cause: Vercel GitHub App does not have access to that repository.',
          '',
          'Fix:',
          '1. In Vercel → New Project → click "Adjust GitHub App Permissions"',
          '2. GitHub opens → Settings → Applications → Vercel → Configure',
          '3. Under "Repository access":',
          '   Select "All repositories" OR add your specific repo',
          '4. Return to Vercel → New Project → your repo should now appear',
        ],
        note: 'You only need to do this once. After granting access, all future repos you create on GitHub will also appear in Vercel.',
      },
    ],
  },

  {
    phase: '11',
    title: 'Free tier — honest explanation for students',
    color: '#34D399',
    steps: [
      {
        label: 'What the free tier includes and what the limits actually mean',
        isText: true,
        text: [
          'Vercel Hobby Plan is free and designed for personal and non-commercial projects.',
          'For normal student portfolios, learning projects, and demos,',
          'it is usually more than enough.',
          '',
          '✅ 100 GB bandwidth/month',
          '   A portfolio with 1,000 visitors uses roughly 1-5 GB.',
          '   You would need 50,000+ heavy visits to even approach this limit.',
          '',
          '✅ 6,000 build minutes/month',
          '   One React build takes about 1 minute.',
          '   You can push code 6,000 times before hitting this.',
          '   Typical student usage: 10-30 pushes per project per month.',
          '',
          '✅ Non-commercial personal projects',
          '   Portfolios, learning demos, side projects, and college assignments',
          '   are exactly what the Hobby plan is designed for.',
          '',
          'When you should consider upgrading (Pro plan):',
          '→ You are building a product with paying customers',
          '→ You need team collaboration and shared projects',
          '→ Your project is generating commercial revenue',
          '',
          'For students: just deploy and use it.',
          'For normal portfolio and learning work, the limits are not your concern.',
        ],
        note: 'The Vercel Hobby plan is genuinely generous for student use. Do not let free-tier limits stop you from deploying — for portfolio and learning projects, you will almost certainly never hit them.',
      },
    ],
  },
]

// ─── Django Backend guide (22 phases) ────────────────────────────────────────
