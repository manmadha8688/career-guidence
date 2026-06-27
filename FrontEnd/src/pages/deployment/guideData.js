// ─── Stack cards ─────────────────────────────────────────────────────────────
export const STACKS = [
  {
    id: 'react',
    route: '/deployment/react',
    emoji: '⚛️',
    title: 'React App',
    subtitle: 'Frontend only',
    desc: 'Deploy a React / Vite project to Vercel. Free forever with HTTPS and custom domain.',
    color: '#60A5FA',
    platforms: 'Vercel',
    stackType: 'frontend',
    tags: ['react', 'vite', 'javascript', 'frontend', 'vercel', 'spa', 'portfolio', 'web app', 'static'],
  },
  {
    id: 'mongodb-atlas',
    route: '/deployment/mongodb-atlas',
    emoji: '🍃',
    title: 'MongoDB Atlas',
    subtitle: 'Free NoSQL database — forever',
    desc: 'Set up a free MongoDB Atlas cluster (M0, 512MB, never expires). Connect it to Node.js, Python (PyMongo/Motor), Django, FastAPI, Flask, and Spring Boot with exact connection string formats.',
    color: '#00ED64',
    platforms: 'MongoDB Atlas',
    stackType: 'database',
    tags: ['mongodb', 'nosql', 'database', 'atlas', 'mongoose', 'motor', 'pymongo', 'free forever', 'node', 'python', 'spring boot'],
  },
  {
    id: 'neon-postgres',
    route: '/deployment/neon-postgres',
    emoji: '⚡',
    title: 'Neon PostgreSQL',
    subtitle: 'Free SQL database — 0.5GB/project, data safe',
    desc: 'Set up a free Neon PostgreSQL database (0.5GB/project, data preserved). Connect it to Node.js (pg/Prisma), Python (psycopg2/SQLAlchemy), Django, FastAPI, Flask, and Spring Boot.',
    color: '#A78BFA',
    platforms: 'Neon',
    stackType: 'database',
    tags: ['postgresql', 'sql', 'neon', 'database', 'prisma', 'sqlalchemy', 'psycopg2', 'free forever', 'node', 'python', 'spring boot', 'django'],
  },
  {
    id: 'supabase',
    route: '/deployment/supabase',
    emoji: '🟢',
    title: 'Supabase',
    subtitle: 'PostgreSQL + Auth + Storage — free',
    desc: 'Set up a free Supabase project (PostgreSQL, 500MB, forever free). Use Supabase as a database, get built-in auth, and connect to Node.js, Python, and React.',
    color: '#3ECF8E',
    platforms: 'Supabase',
    stackType: 'database',
    tags: ['supabase', 'postgresql', 'sql', 'database', 'auth', 'free forever', 'node', 'python', 'react', 'nextjs'],
  },
  {
    id: 'render-postgres',
    route: '/deployment/render-postgres',
    emoji: '🐘',
    title: 'Render PostgreSQL',
    subtitle: 'Free SQL database — 1GB, 30 days',
    desc: 'Set up a free Render PostgreSQL database (1GB). Easy to link directly to Render backend services. Free tier expires after 30 days — best for demos and short-term projects.',
    color: '#4ADE80',
    platforms: 'Render',
    stackType: 'database',
    tags: ['postgresql', 'sql', 'render', 'database', 'free', '30 days', 'node', 'python', 'django', 'spring boot'],
  },
  {
    id: 'django-backend',
    route: '/deployment/django',
    emoji: '🎸',
    title: 'Django Backend',
    subtitle: 'Django REST API + PostgreSQL',
    desc: 'Deploy your Django REST API on Render with Render PostgreSQL (built-in). Neon PostgreSQL also shown as a free alternative.',
    color: '#4ADE80',
    platforms: 'Render + PostgreSQL',
    stackType: 'backend',
    tags: ['django', 'python', 'backend', 'api', 'rest api', 'postgresql', 'database', 'render', 'neon', 'full stack'],
  },
  {
    id: 'nodejs',
    route: '/deployment/nodejs',
    emoji: '🟢',
    title: 'Node.js / Express',
    subtitle: 'Express REST API',
    desc: 'Deploy a Node.js + Express REST API to Render. No Docker needed — Render detects Node.js automatically from package.json. Includes MongoDB Atlas and PostgreSQL options.',
    color: '#68A063',
    platforms: 'Render',
    stackType: 'backend',
    tags: ['nodejs', 'node', 'express', 'javascript', 'backend', 'api', 'rest', 'render', 'mongodb', 'mongoose'],
  },
  {
    id: 'mern',
    route: '/deployment/mern',
    emoji: '🔷',
    title: 'MERN Stack',
    subtitle: 'MongoDB + Express + React + Node',
    desc: 'Deploy a full MERN stack — React frontend on Vercel, Express/Node backend on Render, MongoDB Atlas as database. Three free services, all connected.',
    color: '#61DAFB',
    platforms: 'Vercel + Render + Atlas',
    stackType: 'fullstack',
    tags: ['mern', 'react', 'nodejs', 'express', 'mongodb', 'full stack', 'javascript', 'vercel', 'render'],
  },
  {
    id: 'nextjs',
    route: '/deployment/nextjs',
    emoji: '▲',
    title: 'Next.js',
    subtitle: 'Full-stack React framework',
    desc: 'Deploy a Next.js app to Vercel — made by the same team, one-click deploy, SSR and API routes all work free. No build configuration needed.',
    color: '#E2E8F0',
    platforms: 'Vercel',
    stackType: 'fullstack',
    tags: ['nextjs', 'next', 'react', 'javascript', 'ssr', 'vercel', 'full stack', 'api routes', 'frontend'],
  },
  {
    id: 'fastapi',
    route: '/deployment/fastapi',
    emoji: '⚡',
    title: 'FastAPI',
    subtitle: 'Python REST API (ASGI)',
    desc: 'Deploy a FastAPI application to Render. No Docker needed — Render detects Python from requirements.txt. Great for AI/ML projects and modern Python APIs.',
    color: '#009688',
    platforms: 'Render',
    stackType: 'backend',
    tags: ['fastapi', 'python', 'backend', 'api', 'rest', 'asgi', 'uvicorn', 'render', 'ai', 'ml', 'mongodb'],
  },
  {
    id: 'flask',
    route: '/deployment/flask',
    emoji: '🌶',
    title: 'Flask',
    subtitle: 'Python Web Framework',
    desc: 'Deploy a Flask application to Render. Lightweight Python web framework — no Docker needed, gunicorn as the production server, PostgreSQL or MongoDB Atlas.',
    color: '#F97316',
    platforms: 'Render',
    stackType: 'backend',
    tags: ['flask', 'python', 'backend', 'api', 'wsgi', 'gunicorn', 'render', 'mongodb', 'postgresql', 'web'],
  },
  {
    id: 'html-static',
    route: '/deployment/html-static',
    emoji: '🌐',
    title: 'HTML / CSS / JS Site',
    subtitle: 'Static website',
    desc: 'Deploy a pure HTML, CSS, and JavaScript website to GitHub Pages. Free forever, no build step, live in minutes directly from your GitHub repo.',
    color: '#F59E0B',
    platforms: 'GitHub Pages',
    stackType: 'frontend',
    tags: ['html', 'css', 'javascript', 'static', 'github pages', 'portfolio', 'website', 'no framework', 'beginner', 'landing page'],
  },
  {
    id: 'springboot',
    route: '/deployment/springboot',
    emoji: '🍃',
    title: 'Spring Boot',
    subtitle: 'Spring Boot + Docker + PostgreSQL / MongoDB',
    desc: 'Deploy any Spring Boot application to Render using Docker — REST API, MVC templates, or full stack. Render has no native Java runtime so Docker is required. Includes PostgreSQL and MongoDB Atlas options.',
    color: '#6DB33F',
    platforms: 'Render + Docker',
    stackType: 'backend',
    tags: ['spring boot', 'java', 'backend', 'api', 'rest api', 'mvc', 'thymeleaf', 'docker', 'postgresql', 'mongodb', 'render', 'jwt', 'spring', 'maven', 'jpa', 'full stack'],
  },
  {
    id: 'django-fullstack',
    route: '/deployment/django-fullstack',
    emoji: '🐍',
    title: 'Django Full Stack',
    subtitle: 'Django templates + PostgreSQL',
    desc: 'Deploy a complete Django web app — templates, static files, and PostgreSQL — all on Render. No separate frontend framework needed.',
    color: '#34D399',
    platforms: 'Render + PostgreSQL',
    stackType: 'fullstack',
    tags: ['django', 'python', 'full stack', 'templates', 'postgresql', 'render', 'web app', 'backend', 'frontend', 'jinja', 'html'],
  },
]

// ─── Free platforms ──────────────────────────────────────────────────────────
export const PLATFORMS = [
  {
    name: 'Vercel', emoji: '▲',
    desc: 'Deploy React, Next.js, or any frontend app instantly from GitHub',
    free: 'Free forever',
    color: '#60A5FA', url: 'vercel.com',
    stackType: 'frontend',
    tags: ['vercel', 'frontend', 'react', 'nextjs', 'static', 'javascript', 'spa', 'portfolio'],
  },
  {
    name: 'Netlify', emoji: '◆',
    desc: 'Deploy frontend apps via drag & drop or GitHub — good alternative to Vercel',
    free: 'Free forever',
    color: '#00C7B7', url: 'netlify.com',
    stackType: 'frontend',
    tags: ['netlify', 'frontend', 'react', 'html', 'static', 'javascript', 'deploy'],
  },
  {
    name: 'Render', emoji: '🖥',
    desc: 'Host Django, Node.js, or Spring Boot backends — free PostgreSQL included (expires in 30 days, use Neon for long-term)',
    free: 'Free (sleeps on idle, DB 30 days)',
    color: '#4ADE80', url: 'render.com',
    stackType: 'backend',
    tags: ['render', 'backend', 'django', 'python', 'nodejs', 'postgresql', 'docker', 'spring boot'],
  },
  {
    name: 'GitHub', emoji: '🐙',
    desc: 'Host your code — required by Vercel, Netlify, and Render for auto-deploy',
    free: 'Always free',
    color: '#F59E0B', url: 'github.com',
    stackType: 'all',
    tags: ['github', 'git', 'code', 'version control', 'source', 'repo', 'frontend', 'backend'],
  },
  {
    name: 'GitHub Pages', emoji: '📄',
    desc: 'Free hosting for HTML/CSS/JS sites directly from your GitHub repository',
    free: 'Free forever',
    color: '#F97316', url: 'pages.github.com',
    stackType: 'frontend',
    tags: ['github pages', 'html', 'css', 'javascript', 'static', 'portfolio', 'frontend'],
  },
  {
    name: 'MongoDB Atlas', emoji: '🍃',
    desc: 'Free NoSQL cloud database — M0 cluster, 512MB, truly free forever, 1 free cluster per project',
    free: '512MB, free forever',
    color: '#00ED64', url: 'cloud.mongodb.com',
    stackType: 'backend',
    tags: ['mongodb', 'database', 'nosql', 'atlas', 'spring boot', 'django', 'nodejs', 'backend'],
  },
  {
    name: 'Neon', emoji: '⚡',
    desc: 'Serverless PostgreSQL — 0.5GB per project, data preserved forever, compute auto-suspends after 5 min idle',
    free: '0.5GB/project, data safe forever',
    color: '#A78BFA', url: 'neon.tech',
    stackType: 'backend',
    tags: ['neon', 'database', 'postgresql', 'postgres', 'sql', 'serverless', 'backend'],
  },
  {
    name: 'Supabase', emoji: '🟢',
    desc: 'PostgreSQL + Auth + Storage — 500MB free, pauses after 7 days DB inactivity (data safe, resume in 1 min)',
    free: '500MB, pauses if idle 7 days',
    color: '#3ECF8E', url: 'supabase.com',
    stackType: 'backend',
    tags: ['supabase', 'postgresql', 'database', 'auth', 'storage', 'backend', 'full stack'],
  },
  {
    name: 'Cloudinary', emoji: '☁️',
    desc: 'Image & video CDN storage — solves the Render ephemeral filesystem problem for media uploads',
    free: '25 GB free, no expiry',
    color: '#3448C5', url: 'cloudinary.com',
    stackType: 'backend',
    tags: ['cloudinary', 'images', 'media', 'storage', 'cdn', 'django', 'spring boot', 'files'],
  },
  {
    name: 'Railway', emoji: '🚂',
    desc: 'Deploy Docker apps with databases easily — sleek alternative to Render',
    free: '$5 credit/month',
    color: '#9B6ED4', url: 'railway.app',
    stackType: 'backend',
    tags: ['railway', 'docker', 'backend', 'deploy', 'nodejs', 'spring boot', 'django'],
  },
  {
    name: 'cron-job.org', emoji: '⏰',
    desc: 'Free cron jobs to ping your Render backend every 10 min and prevent sleep',
    free: 'Unlimited free jobs',
    color: '#F59E0B', url: 'cron-job.org',
    stackType: 'all',
    tags: ['cron', 'ping', 'keepalive', 'render', 'sleep', 'uptime', 'backend'],
  },
]

// ─── React guide  (order: 01 02 03 06 05 08 04 09 07 11 13) ──────────────────
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
          'A cron job pings your API every 10 minutes — it never sleeps.',
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
          '   Render sees activity and never shuts down.',
          '   Your API responds instantly for visitors.',
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
export const HTML_STATIC_GUIDE = [
  {
    phase: '01',
    title: 'What is GitHub Pages and why use it?',
    color: '#F59E0B',
    steps: [
      {
        label: 'GitHub Pages — free hosting directly from your repo',
        isText: true,
        text: [
          'GitHub Pages is a free hosting service built into every GitHub repository.',
          'You push your HTML/CSS/JS files to GitHub and they go live instantly.',
          'No build step. No server setup. No credit card needed.',
          '',
          'What you get free:',
          '✅ Live URL: username.github.io/repo-name',
          '✅ Automatic HTTPS — SSL certificate included',
          '✅ Auto-deploy — every push to main updates your live site',
          '✅ Custom domain support — connect your own .com',
          '✅ Works for any static site — HTML, CSS, JS, Bootstrap, Tailwind',
          '',
          'Perfect for:',
          '→ Personal portfolio websites',
          '→ College project landing pages',
          '→ Resume websites',
          '→ Any project that does not need a backend server',
          '',
          'Limitation:',
          '→ Only static files — no Python, PHP, Node.js, or database',
          '→ If your site needs a backend, see the Django guides instead',
        ],
        note: 'GitHub Pages is the fastest way to get a live URL for a student portfolio. Push code → live in 2 minutes.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Before deployment — checklist',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Verify your site works before pushing',
        isText: true,
        text: [
          '✅ Open index.html directly in your browser (File → Open)',
          '   Every page should display correctly with no broken layouts',
          '',
          '✅ Your project has an index.html file at the root level',
          '   GitHub Pages serves index.html as the homepage by default',
          '',
          '✅ All links between pages are relative (not absolute):',
          '   Right: href="about.html" or href="./about.html"',
          '   Wrong: href="/Users/yourname/Desktop/project/about.html"',
          '',
          '✅ All image paths are relative:',
          '   Right: src="images/photo.jpg" or src="./images/photo.jpg"',
          '   Wrong: src="C:/Users/yourname/project/images/photo.jpg"',
          '',
          '✅ CSS and JS files are linked with relative paths:',
          '   Right: href="style.css" or href="./css/style.css"',
          '   Wrong: href="/home/user/project/style.css"',
          '',
          '✅ No broken images or 404 links when browsing locally',
          '✅ Site looks correct on mobile (open DevTools → device toolbar)',
        ],
        note: 'Absolute local file paths are the #1 cause of broken GitHub Pages sites. All paths must be relative — they work both locally and on GitHub Pages.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Project structure for GitHub Pages',
    color: '#60A5FA',
    steps: [
      {
        label: 'Required file structure',
        isText: true,
        text: [
          'GitHub Pages requires index.html at the root of your repository.',
          '',
          'Recommended structure:',
          '',
          '   my-portfolio/          ← your repo root',
          '     index.html           ← homepage (REQUIRED at root)',
          '     about.html',
          '     projects.html',
          '     css/',
          '       style.css',
          '     js/',
          '       main.js',
          '     images/',
          '       photo.jpg',
          '       logo.png',
          '     fonts/               (if using local fonts)',
          '',
          'Link files from index.html like this:',
          '   <link rel="stylesheet" href="css/style.css">',
          '   <script src="js/main.js"></script>',
          '   <img src="images/photo.jpg" alt="My photo">',
          '',
          'No index.html = GitHub Pages shows a 404 or folder listing.',
          'Make sure index.html exists and is spelled correctly (all lowercase).',
        ],
        note: 'File and folder names on GitHub Pages are case-sensitive (Linux). "Images/Photo.jpg" and "images/photo.jpg" are different. Use lowercase everywhere to be safe.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Create .gitignore',
    color: '#F59E0B',
    steps: [
      {
        label: 'Create .gitignore in your project root',
        isFile: true,
        fileName: '.gitignore',
        commands: [
          `# OS files — auto-generated, not needed in repo
.DS_Store
Thumbs.db
desktop.ini

# Editor files
.vscode/settings.json
.idea/
*.swp
*.swo

# Logs
*.log

# Temp files
*.tmp
~$*`,
        ],
        note: 'HTML/CSS/JS projects have very little to exclude. The main things are OS files (.DS_Store on Mac, Thumbs.db on Windows) and editor files.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Push your site to GitHub',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Create GitHub repo and push your code',
        isText: true,
        text: [
          '1. Go to github.com → click "+" → "New repository"',
          '2. Name: my-portfolio (or your project name)',
          '3. Set to Public (required for free GitHub Pages)',
          '4. Do NOT check "Add README" or "Add .gitignore"',
          '   Your project already has these',
          '5. Click "Create repository"',
        ],
        note: 'The repo must be Public for free GitHub Pages. Private repos need a paid GitHub account for Pages.',
      },
      {
        label: 'Initialize git and push',
        commands: [
          `git init`,
          `git add .`,
          `git commit -m "initial commit — portfolio site"`,
          `git branch -M main`,
          `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git`,
          `git push -u origin main`,
        ],
        note: 'Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual GitHub username and repo name.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Enable GitHub Pages',
    color: '#4ADE80',
    steps: [
      {
        label: 'Turn on GitHub Pages in repo settings',
        isText: true,
        text: [
          '1. Open your GitHub repository',
          '2. Click "Settings" tab (top of the repo page)',
          '3. Scroll down to "Pages" in the left sidebar',
          '4. Under "Source" → select "Deploy from a branch"',
          '5. Branch: main',
          '   Folder: / (root)',
          '6. Click "Save"',
          '',
          'GitHub shows a banner:',
          '   "Your site is live at https://YOUR_USERNAME.github.io/YOUR_REPO/"',
          '',
          'Wait 1–2 minutes for the first deployment.',
          'Then open the URL — your site is live.',
          '',
          'Every future git push automatically updates the live site.',
          'Changes usually go live within 1 minute.',
        ],
        note: 'If the site does not load after 2 minutes, check the "Actions" tab in your repo — it shows the deployment status and any errors.',
      },
      {
        label: 'Special case: username.github.io repo',
        isText: true,
        text: [
          'If you name your repo exactly: YOUR_USERNAME.github.io',
          '(e.g. manmadha.github.io)',
          '',
          '→ GitHub automatically serves it at: https://YOUR_USERNAME.github.io/',
          '→ No need to enable Pages — it is on by default for this repo name',
          '→ This is your "root" GitHub Pages URL — perfect for a main portfolio',
          '',
          'For all other repos, the URL is:',
          '   https://YOUR_USERNAME.github.io/REPO_NAME/',
        ],
        note: 'Naming your repo YOUR_USERNAME.github.io gives you the cleanest URL (no /repo-name). This is the standard approach for a personal portfolio.',
      },
    ],
  },

  {
    phase: '07',
    title: 'Fix common path issues',
    color: '#EF4444',
    steps: [
      {
        label: 'Why paths break on GitHub Pages but work locally',
        isText: true,
        text: [
          'When you open a file locally, the browser uses file:// protocol.',
          'Paths like "./images/photo.jpg" work because the browser resolves them',
          'relative to your file location.',
          '',
          'On GitHub Pages, your site is served from:',
          '   https://username.github.io/repo-name/',
          '',
          'Root-relative paths starting with / cause problems:',
          '   src="/images/photo.jpg"',
          '   → browser looks for: https://username.github.io/images/photo.jpg',
          '   → NOT: https://username.github.io/repo-name/images/photo.jpg',
          '   → Image is missing',
          '',
          'Fix: use relative paths (no leading slash):',
          '   src="images/photo.jpg"     ✅',
          '   src="./images/photo.jpg"   ✅',
          '   src="/images/photo.jpg"    ❌',
          '',
          'Same rule for CSS and JS files:',
          '   href="css/style.css"       ✅',
          '   href="/css/style.css"      ❌',
        ],
        note: 'After pushing changes, wait 1 minute for GitHub Pages to redeploy, then hard-refresh with Ctrl+Shift+R to clear browser cache.',
      },
    ],
  },

  {
    phase: '08',
    title: 'Common errors and fixes',
    color: '#F97316',
    steps: [
      {
        label: '404 — page not found after enabling Pages',
        isText: true,
        text: [
          'Problem: GitHub Pages URL shows 404.',
          '',
          'Cause 1: No index.html at the root of the repository.',
          'Fix: Make sure index.html exists at the top level of your repo.',
          '   (Not inside a subfolder like src/index.html)',
          '',
          'Cause 2: Deployment not finished yet.',
          'Fix: Wait 1–2 minutes. Check the "Actions" tab in your repo.',
          '   A green checkmark means it is live.',
          '',
          'Cause 3: Pages not enabled correctly.',
          'Fix: Settings → Pages → verify Branch=main, Folder=/(root) → Save.',
        ],
        note: 'The Actions tab (next to Settings) shows deployment logs. A yellow spinner means deploying. Green tick means live. Red X means failed.',
      },
      {
        label: 'CSS not loading — unstyled page',
        isText: true,
        text: [
          'Problem: Site appears with no styling after deploy.',
          '',
          'Cause: CSS file path uses /css/style.css (root-relative) or absolute path.',
          '',
          'Fix: Change all CSS links to relative:',
          '   Wrong: <link href="/css/style.css" rel="stylesheet">',
          '   Right: <link href="css/style.css" rel="stylesheet">',
          '   Right: <link href="./css/style.css" rel="stylesheet">',
          '',
          'For Bootstrap CDN — always works (no path issue):',
          '   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">',
        ],
        note: 'CDN links (https://...) always work on GitHub Pages. Only local file paths need to be relative.',
      },
      {
        label: 'Images broken after deploy',
        isText: true,
        text: [
          'Problem: Images appear as broken icons on the live site.',
          '',
          'Cause 1: Absolute or root-relative paths.',
          'Fix: Use relative paths: src="images/photo.jpg"',
          '',
          'Cause 2: Wrong file name case (uppercase vs lowercase).',
          'Fix: GitHub Pages runs on Linux — case-sensitive.',
          '   If file is "Photo.jpg" and src is "photo.jpg" → broken.',
          '   Rename files to lowercase: photo.jpg, logo.png',
          '',
          'Cause 3: File not committed to GitHub.',
          'Fix: Run git status and check if the image file is tracked.',
          '   git add images/ && git commit -m "add images" && git push',
        ],
        note: 'Always use lowercase filenames for all assets. This avoids case sensitivity issues on GitHub Pages (Linux) vs your local machine (Windows/Mac).',
      },
    ],
  },

  {
    phase: '09',
    title: 'Custom domain (optional)',
    color: '#A78BFA',
    steps: [
      {
        label: 'Connect your own domain to GitHub Pages',
        isText: true,
        text: [
          'If you own a domain (e.g. yourname.com), you can connect it free.',
          '',
          '1. In your DNS provider, add a CNAME record:',
          '   Name:  www  (or @ for root)',
          '   Value: YOUR_USERNAME.github.io',
          '',
          '2. In GitHub → repo Settings → Pages → Custom domain:',
          '   Enter: www.yourname.com',
          '   Click Save',
          '',
          '3. Create a CNAME file in your repo root:',
          '   Content: www.yourname.com',
          '   (GitHub Pages creates this automatically when you save above)',
          '',
          '4. Check "Enforce HTTPS" after the SSL certificate generates',
          '   (can take 24 hours)',
          '',
          'Free domain options for students:',
          '→ .tech domains: get.tech (free 1 year with student verification)',
          '→ .me domains: Namecheap student offer',
          '→ Freenom: .tk/.ml/.ga domains (free, limited)',
        ],
        note: 'Custom domain is optional — username.github.io/repo looks professional enough for a student portfolio. Add a domain only if you specifically want one.',
      },
    ],
  },

  {
    phase: '10',
    title: 'Free tier — GitHub Pages limits',
    color: '#34D399',
    steps: [
      {
        label: 'What the free tier includes and what the limits mean',
        isText: true,
        text: [
          'GitHub Pages free tier is genuinely unlimited for student projects.',
          '',
          '✅ Bandwidth: 100 GB/month',
          '   A portfolio with 1,000 visitors/month uses ~1-5 GB.',
          '   You would need tens of thousands of visits to approach this.',
          '',
          '✅ Storage: 1 GB per repository',
          '   A typical portfolio with images is 5-50 MB.',
          '   Do not commit large video files — use YouTube embeds instead.',
          '',
          '✅ Build time: 10 minutes per build',
          '   Static HTML/CSS/JS has no build step — deploys instantly.',
          '',
          '✅ No server-side code allowed',
          '   GitHub Pages is for static files only.',
          '   For forms, contact emails, or databases — use a backend.',
          '',
          'When GitHub Pages is NOT enough:',
          '→ You need a database or user authentication',
          '→ You need server-side code (Python, Node.js)',
          '→ You need form submissions without a third-party service',
          '→ For these: use the Django or React + Django guides',
          '',
          'For student portfolios and HTML/CSS/JS projects:',
          'GitHub Pages is more than enough. Deploy and share your link.',
        ],
        note: 'GitHub Pages has been free and reliable since 2008. For static sites, it is the simplest and most dependable free hosting available.',
      },
    ],
  },
]

// ─── Django Full Stack → Render + PostgreSQL ─────────────────────────────────
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
        note: 'The + static(...) line adds media file serving during local development. In production, WhiteNoise handles static files automatically. For uploaded media files, see Phase 19.',
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
        note: 'staticfiles/ is generated by collectstatic — Render runs this during build so you do not need to commit it. media/ contains user uploads — see Phase 19 for why this is dangerous.',
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
          '✅ Render never sleeps. Your site responds instantly.',
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
export const NODEJS_GUIDE = [
  {
    phase: '01',
    title: 'What is Render and why deploy your Node.js API?',
    color: '#68A063',
    steps: [
      {
        label: 'Live API vs localhost — why deployment matters',
        isText: true,
        text: [
          'Render is a cloud platform that natively supports Node.js.',
          'Push your code to GitHub and Render builds and deploys automatically.',
          'No Docker. No Linux setup. No server management.',
          '',
          'Why a live API is better than localhost for your resume:',
          '→ localhost only works on your machine.',
          '→ A live URL proves it runs in a real environment — anyone can use it.',
          '',
          'What you get on Render free tier:',
          '✅ Live HTTPS URL — your-api.onrender.com',
          '✅ Auto-deploy on every GitHub push',
          '✅ Node.js runtime auto-detected from package.json',
          '✅ Environment variables stored safely in the dashboard',
          '✅ Logs tab to debug issues in real time',
          '✅ Direct connection to MongoDB Atlas',
          '',
          'This guide covers:',
          '→ Express REST API returning JSON',
          '→ MongoDB Atlas as the cloud database',
          '→ CORS for connecting a React frontend on Vercel',
        ],
        note: 'A live Node.js API URL on your resume and LinkedIn shows recruiters you can ship real backend code — not just write it locally.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Before deployment — checklist',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Verify your project is ready before touching Render',
        isText: true,
        text: [
          'Run these checks locally — fix any issues BEFORE pushing to GitHub.',
          '',
          '✅ npm install runs cleanly (no errors)',
          '✅ npm run dev or node server.js starts without errors',
          '✅ API endpoints tested in browser or Postman',
          '✅ package.json has a "start" script',
          '✅ engines field set: "node": ">=18.0.0"',
          '✅ No passwords, secrets, or connection strings in JS files',
          '✅ .env file exists locally with your secrets',
          '✅ .gitignore excludes node_modules/ and .env',
          '',
          'CRITICAL — PORT check:',
          '   Wrong: app.listen(3000)',
          '   Right: app.listen(process.env.PORT || 3000)',
          '',
          'Render injects PORT as an environment variable automatically.',
          'If you hardcode 3000, Render routes traffic to a different port',
          'and every request returns 502 Bad Gateway.',
        ],
        note: 'The PORT issue is the #1 reason Node.js apps fail on Render. Fix it before pushing — it saves hours of debugging.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Install required packages',
    color: '#60A5FA',
    steps: [
      {
        label: 'Install production and development packages',
        commands: [
          `npm install express cors dotenv mongoose helmet express-rate-limit`,
          `npm install -D nodemon`,
        ],
        note: 'nodemon is a devDependency — it only runs locally with npm run dev. Render uses npm start (node server.js) for production, not nodemon.',
      },
      {
        label: 'What each package does',
        isText: true,
        text: [
          'express',
          '   The web framework — handles routes, middleware, and HTTP.',
          '',
          'cors',
          '   Allows your React frontend (on Vercel) to call this API.',
          '   Without it, the browser blocks all API requests.',
          '',
          'dotenv',
          '   Loads .env file values into process.env for local dev.',
          '   On Render, environment variables are injected directly — no .env needed.',
          '',
          'mongoose',
          '   MongoDB driver for Node.js — connects to Atlas, defines schemas.',
          '',
          'helmet',
          '   Sets secure HTTP headers automatically.',
          '   Protects against XSS, clickjacking, and other attacks.',
          '   One line of code — always include it.',
          '',
          'express-rate-limit',
          '   Limits requests per IP — prevents abuse and brute-force attacks.',
          '   Default: 100 requests per 15 minutes per IP.',
          '',
          'nodemon (devDependency)',
          '   Restarts the server when you edit files — for local dev only.',
          '   Never runs in production.',
        ],
        note: 'helmet and express-rate-limit are production best practices. They protect your API from common attacks with minimal setup effort.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Set up package.json correctly',
    color: '#F59E0B',
    steps: [
      {
        label: 'Complete package.json for production',
        isFile: true,
        fileName: 'package.json',
        commands: [
          `{
  "name": "my-express-api",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev":   "nodemon server.js"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "dependencies": {
    "cors":               "^2.8.5",
    "dotenv":             "^16.0.0",
    "express":            "^4.18.0",
    "express-rate-limit": "^7.0.0",
    "helmet":             "^7.0.0",
    "mongoose":           "^8.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}`,
        ],
        note: 'Render runs "npm start" to launch your app. The engines field tells Render to use Node.js 18+. Replace server.js if your main file has a different name.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Create production-ready server.js',
    color: '#EC4899',
    steps: [
      {
        label: 'Complete server.js with security, health check, and MongoDB',
        isFile: true,
        fileName: 'server.js',
        commands: [
          `const express   = require('express');
const cors      = require('cors');
const helmet    = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose  = require('mongoose');
require('dotenv').config();

const app = express();

// ── Security middleware ──────────────────────────────────
app.use(helmet());       // secure HTTP headers
app.use(express.json()); // parse JSON request bodies

// Rate limiting — 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
});
app.use(limiter);

// ── CORS — allow only your frontend ─────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean);   // removes undefined if FRONTEND_URL not set

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// ── Routes ───────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Health check — used by cron-job.org to keep Render awake
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Add your route files here:
// app.use('/api/users',    require('./routes/users'));
// app.use('/api/products', require('./routes/products'));

// ── MongoDB Atlas connection ─────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    // Server stays running — DB-independent routes still work
  });

// ── Start server ─────────────────────────────────────────
// process.env.PORT  — Render injects this automatically
// '0.0.0.0'         — required so Render can route external traffic
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`Server running on port \${PORT}\`);
  console.log(\`Environment: \${process.env.NODE_ENV || 'development'}\`);
});`,
        ],
        note: 'process.env.PORT and 0.0.0.0 binding are both mandatory for Render. The /health route is used by cron-job.org to keep the service awake.',
      },
      {
        label: 'Why each critical part matters',
        isText: true,
        text: [
          'process.env.PORT — MANDATORY:',
          '   Render assigns a port and injects it as PORT env var.',
          '   Hardcoding 3000 = Render sees the wrong port = 502 for all requests.',
          '',
          '0.0.0.0 binding — MANDATORY:',
          '   app.listen(PORT) without 0.0.0.0 binds to 127.0.0.1 (localhost only).',
          '   External traffic from Render routing cannot reach 127.0.0.1.',
          '   Adding 0.0.0.0 accepts traffic from any network interface.',
          '',
          'helmet() — One line. Adds 15+ security headers. Always include it.',
          '',
          'rateLimit — Protects your free-tier service from abuse.',
          '   One script can exhaust your 750 free hours/month.',
          '',
          '/health endpoint:',
          '   Lightweight 200 response — no database query.',
          '   Use this URL in cron-job.org to keep the service awake.',
          '   Also useful to quickly verify the API is up.',
        ],
        note: 'Do not remove any of these. Every line in this server.js is a deliberate production decision.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Create .env for local development',
    color: '#A78BFA',
    steps: [
      {
        label: '.env — local only, NEVER push to GitHub',
        isFile: true,
        fileName: '.env',
        commands: [
          `PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mydb?retryWrites=true&w=majority
JWT_SECRET=local-dev-secret-change-this
FRONTEND_URL=http://localhost:5173
NODE_ENV=development`,
        ],
        note: '.env is for your local machine ONLY. On Render, these same values are added in the Environment tab. Never commit .env to GitHub — not even once.',
      },
    ],
  },

  {
    phase: '07',
    title: 'Create .env.example',
    color: '#60A5FA',
    steps: [
      {
        label: '.env.example — commit this to GitHub (no real secrets)',
        isFile: true,
        fileName: '.env.example',
        commands: [
          `PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_50_chars
FRONTEND_URL=http://localhost:5173
NODE_ENV=development`,
        ],
        note: '.env.example contains only placeholder values — no real secrets. Always commit this. It tells anyone who clones your repo exactly which variables they need to set.',
      },
      {
        label: 'Add setup instructions to README',
        isText: true,
        text: [
          'Add this to your README.md so cloners can get started:',
          '',
          '## Setup',
          '1. cp .env.example .env',
          '2. Fill in your actual values in .env',
          '3. npm install',
          '4. npm run dev',
          '',
          'Rule:',
          '   .env.example → always committed to GitHub',
          '   .env          → always in .gitignore, never committed',
        ],
        note: 'This is a professional standard used in every real-world Node.js project. Start every project with a .env.example file.',
      },
    ],
  },

  {
    phase: '08',
    title: 'Create .gitignore',
    color: '#F59E0B',
    steps: [
      {
        label: '.gitignore — protect your project and keep the repo clean',
        isFile: true,
        fileName: '.gitignore',
        commands: [
          `# Dependencies — hundreds of MB, auto-installed by npm install
node_modules/

# Environment variables — NEVER commit these
.env
.env.local
.env.*.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS files
.DS_Store
Thumbs.db`,
        ],
        note: 'node_modules/ can contain 100,000+ files. Render runs npm install automatically on every deploy. Never commit node_modules.',
      },
      {
        label: 'Verify .gitignore works before pushing',
        commands: [
          `git add .`,
          `git status`,
        ],
        note: 'After git add . look at git status. If .env or node_modules/ appear — STOP. Fix .gitignore, run git rm --cached .env, then recommit. Never push until they are gone.',
      },
    ],
  },

  {
    phase: '09',
    title: 'MongoDB Atlas setup',
    color: '#00ED64',
    steps: [
      {
        label: 'Create free cluster, user, and get connection string',
        isText: true,
        text: [
          '1. cloud.mongodb.com → Sign up free (no credit card)',
          '',
          '2. Create a free cluster:',
          '   → Click "Create" → Select M0 Free tier',
          '   → Choose AWS → nearest region',
          '   → Click "Create Deployment"',
          '',
          '3. Create a database user:',
          '   → Username: myappuser (or any name)',
          '   → Password: click "Autogenerate Secure Password"',
          '   → COPY and SAVE the password immediately',
          '   → Role: "Read and write to any database"',
          '   → Click "Create Database User"',
          '',
          '4. Set up Network Access:',
          '   → Security → Network Access → Add IP Address',
          '   → Click "Allow Access from Anywhere" (0.0.0.0/0)',
          '   → Click Confirm',
          '',
          '   Why 0.0.0.0/0:',
          '   Render uses dynamic IPs that change on every restart.',
          '   Whitelisting a single IP will not work with Render.',
          '   0.0.0.0/0 is required for Render free tier.',
          '',
          '5. Get the connection string:',
          '   → Clusters → Click "Connect" → "Drivers" → Node.js',
          '   → Copy the string:',
          '   mongodb+srv://myappuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority',
          '',
          '6. Build your final MONGODB_URI:',
          '   → Replace <password> with your actual saved password',
          '   → Add your database name before the ?:',
          '   mongodb+srv://myappuser:realpass@cluster0.xxxxx.mongodb.net/mydbname?retryWrites=true&w=majority',
          '',
          '7. This full string is your MONGODB_URI — add it in Render.',
        ],
        note: 'Always include a database name in the URI (before the ?). Without it, data goes to a default "test" database which is confusing when you have multiple projects.',
      },
      {
        label: 'Security rules for MongoDB Atlas',
        isText: true,
        text: [
          'Use an autogenerated strong password — not "password123".',
          '',
          'About 0.0.0.0/0:',
          '   Allows any IP to attempt a connection.',
          '   The database user password is your real security layer.',
          '   For student demos: acceptable.',
          '   For real production: restrict to known IPs.',
          '',
          'NEVER put MONGODB_URI in your JavaScript code.',
          'It must always come from process.env.MONGODB_URI.',
          'If it appears in a git commit — see Phase 10.',
        ],
        note: 'MongoDB Atlas M0 free tier: 512MB, free forever, no credit card. Standard choice for student Node.js projects worldwide.',
      },
    ],
  },

  {
    phase: '10',
    title: 'If you accidentally pushed a secret to GitHub',
    color: '#EF4444',
    steps: [
      {
        label: 'Deleting in a new commit is NOT enough — act immediately',
        isText: true,
        text: [
          'If MONGODB_URI, JWT_SECRET, or any password was committed to GitHub:',
          '',
          'Deleting it in a new commit does NOT make it safe.',
          'The secret still exists in every previous Git commit.',
          'Anyone can run git log and see the full history.',
          '',
          'Bots scan GitHub for leaked secrets within minutes of a push.',
          'Assume the secret is already compromised.',
          '',
          'Step 1 — ROTATE the exposed secret immediately:',
          '   MongoDB password: Atlas → Database Access → Edit user → Autogenerate new password',
          '   JWT_SECRET: generate a new one (all existing tokens become invalid)',
          '   API key: go to the provider and regenerate',
          '',
          'Step 2 — Remove .env from Git tracking (next step)',
        ],
        note: 'Rotating the secret is mandatory even if you later clean Git history. Old secrets may already be scraped. Always generate fresh credentials after a leak.',
      },
      {
        label: 'Commands to remove .env from Git tracking',
        commands: [
          `git rm --cached .env`,
          `git commit -m "remove .env from git tracking"`,
          `git push`,
          `git log --all -- .env`,
          `git grep "OLD_SECRET_VALUE" $(git rev-list --all)`,
        ],
        note: 'git rm --cached removes .env from tracking but keeps the file on your disk. After this, .env will never be committed again.',
      },
      {
        label: 'If secret is in old commits — clean Git history',
        isText: true,
        text: [
          'If git log --all -- .env shows old commits with the file:',
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
          'Force push rewrites all history on GitHub.',
          'If others cloned the repo, they must re-clone.',
          '',
          'Even after cleaning history:',
          'The old exposed key must still be rotated.',
          'History cleaning does not make the old key safe again.',
        ],
        note: 'For solo student projects: rotate key → clean history with git filter-repo → generate new secret → store ONLY in .env locally and in Render dashboard (never commit).',
      },
    ],
  },

  {
    phase: '11',
    title: 'Test locally before pushing',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Run and verify the API locally',
        commands: [
          `npm install`,
          `npm run dev`,
        ],
        note: 'Fix all local errors before pushing to GitHub. Render errors are harder to debug than local errors.',
      },
      {
        label: 'What to verify before pushing',
        isText: true,
        text: [
          'Test in browser:',
          '   http://localhost:3000/        → { "status": "ok" }',
          '   http://localhost:3000/health  → { "status": "healthy" }',
          '',
          'Test API routes in Postman:',
          '   GET/POST/PUT/DELETE for all your endpoints',
          '',
          'Check terminal output:',
          '   "MongoDB connected" — Atlas connection works',
          '   "Server running on port 3000" — server started',
          '',
          'ALSO test with npm start:',
          '   npm start',
          '   This is exactly what Render runs.',
          '   If it fails here, it fails on Render.',
          '',
          'Fix MongoDB locally:',
          '   Check MONGODB_URI in .env is correct',
          '   Check Atlas Network Access includes your local IP',
          '   Check password has no special chars needing URL encoding',
        ],
        note: 'Test with npm start (not just npm run dev) before pushing. Render uses npm start — any failure here saves deployment debugging time.',
      },
    ],
  },

  {
    phase: '12',
    title: 'Push safe code to GitHub',
    color: '#60A5FA',
    steps: [
      {
        label: 'Initialize git, verify staged files, and push',
        commands: [
          `git init`,
          `git add .`,
          `git status`,
          `git commit -m "express api ready for production"`,
          `git branch -M main`,
          `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git`,
          `git push -u origin main`,
        ],
        note: 'After "git add ." run "git status". If .env or node_modules/ appear in the list — STOP. Fix .gitignore, run git rm --cached .env, then re-add and commit.',
      },
      {
        label: 'Common Git errors and quick fixes',
        isText: true,
        text: [
          '.env appears in git status:',
          '   git rm --cached .env',
          '   git add .gitignore',
          '   git commit -m "fix: remove .env from tracking"',
          '',
          'node_modules/ appears in git status:',
          '   git rm -r --cached node_modules',
          '   git commit -m "fix: remove node_modules from tracking"',
          '',
          'remote origin already exists:',
          '   git remote remove origin',
          '   git remote add origin https://...',
          '',
          'Authentication failed:',
          '   GitHub removed password auth. Use a Personal Access Token.',
          '   GitHub → Settings → Developer settings → Personal access tokens → Classic',
          '   Generate token with repo scope. Use as password when prompted.',
        ],
        note: 'Verify the GitHub repo page after pushing. Confirm server.js and package.json are visible at the repo root — not inside a subfolder.',
      },
    ],
  },

  {
    phase: '13',
    title: 'Deploy on Render',
    color: '#4ADE80',
    steps: [
      {
        label: 'Create a Web Service on Render',
        isText: true,
        text: [
          '1. render.com → sign up / login with GitHub',
          '2. Click "New" → "Web Service"',
          '3. Connect your GitHub account if not already done',
          '4. Find your repository → click "Connect"',
          '',
          '5. Configure the service:',
          '   Name:          your-express-api',
          '   Region:        pick nearest to your users',
          '   Branch:        main',
          '   Runtime:       Node  (auto-detected from package.json)',
          '   Build Command: npm install',
          '   Start Command: npm start',
          '',
          '6. Click "Create Web Service"',
          '',
          '7. Watch the Logs tab during deployment:',
          '   → Installing packages...',
          '   → "MongoDB connected"',
          '   → "Server running on port XXXXX"',
          '',
          '8. Your API is live at:',
          '   https://your-express-api.onrender.com',
          '',
          'Every push to GitHub triggers automatic redeployment.',
        ],
        note: 'Render auto-detects Node.js from package.json. If not detected, manually select "Node" from the Runtime dropdown.',
      },
    ],
  },

  {
    phase: '14',
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
          'JWT_SECRET',
          '   Generate a strong 64-char random string:',
          '   node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"',
          '   Copy the output and use it as the value.',
          '',
          'FRONTEND_URL',
          '   Your Vercel frontend URL (if you have a React app):',
          '   https://yourfrontend.vercel.app',
          '   No trailing slash.',
          '',
          'NODE_ENV',
          '   Value: production',
          '',
          'Do NOT set PORT manually:',
          '   Render injects PORT automatically.',
          '   If you set it manually, it may conflict.',
          '',
          'After saving → Render auto-triggers a new deployment.',
        ],
        note: 'Environment variables on Render are encrypted at rest and never appear in build logs. They are safely injected into your running Node.js process.',
      },
    ],
  },

  {
    phase: '15',
    title: 'Verify your live API',
    color: '#4ADE80',
    steps: [
      {
        label: 'Test every part of your live API',
        isText: true,
        text: [
          'Open in browser or Postman:',
          '',
          '✅ Root:   https://your-express-api.onrender.com/',
          '   Should return: { "status": "ok", "message": "API is running" }',
          '',
          '✅ Health: https://your-express-api.onrender.com/health',
          '   Should return: { "status": "healthy" }',
          '',
          '✅ Your routes:',
          '   GET  https://your-express-api.onrender.com/api/users',
          '   POST https://your-express-api.onrender.com/api/users',
          '',
          '✅ Check Render Logs tab for:',
          '   "MongoDB connected"',
          '   "Server running on port XXXXX"',
          '',
          'First request may take 30-60 seconds:',
          '   Render free tier services sleep after 15 min of inactivity.',
          '   This is normal — the service is waking up.',
          '   Subsequent requests are fast.',
          '',
          'If request fails:',
          '   Check Logs tab — the exact error is shown.',
          '   Most common cause: MONGODB_URI missing or wrong format.',
        ],
        note: 'The Render Logs tab is your best debugging tool. It shows every console.log from your Node.js app including Mongoose connection errors and uncaught exceptions.',
      },
    ],
  },

  {
    phase: '16',
    title: 'Connect React/Vite frontend',
    color: '#A78BFA',
    steps: [
      {
        label: 'Set VITE_API_URL in your React app',
        isFile: true,
        fileName: 'frontend/.env.production',
        commands: [
          `VITE_API_URL=https://your-express-api.onrender.com`,
        ],
        note: 'Keep VITE_API_URL=http://localhost:3000 in your local frontend .env for development. Vite uses .env.production automatically when building for production.',
      },
      {
        label: 'CORS setup and FRONTEND_URL rules',
        isText: true,
        text: [
          'In Render, set FRONTEND_URL to your exact Vercel URL:',
          '   Correct: https://yourfrontend.vercel.app',
          '   Wrong:   https://yourfrontend.vercel.app/',
          '   (trailing slash breaks CORS origin matching)',
          '',
          'In server.js your CORS setup reads FRONTEND_URL:',
          '   const allowedOrigins = [',
          '     process.env.FRONTEND_URL,',
          "     'http://localhost:5173',",
          '   ].filter(Boolean);',
          '   app.use(cors({ origin: allowedOrigins, credentials: true }));',
          '',
          'VITE_ variables are NOT secret:',
          '   Vite bundles all VITE_ variables into the JavaScript bundle.',
          '   VITE_API_URL is a public URL — that is fine.',
          '   NEVER put JWT_SECRET, MONGODB_URI, or passwords in React .env.',
          '   Frontend secrets must stay only in Render environment variables.',
          '   React calls your backend API → backend uses the secret internally.',
        ],
        note: 'After updating FRONTEND_URL in Render, trigger a redeploy. CORS settings only take effect from the next deploy.',
      },
    ],
  },

  {
    phase: '17',
    title: 'Free tier — honest explanation',
    color: '#34D399',
    steps: [
      {
        label: 'What Render and MongoDB Atlas free tiers actually mean for students',
        isText: true,
        text: [
          'Render free Web Service:',
          '   Service sleeps after 15 min of no requests.',
          '   First request after sleep takes 30-60 seconds to wake up.',
          '   750 free instance hours/month (one service = ~744 hrs — just enough).',
          '   Shared CPU — response times can vary.',
          '   Not for production business apps.',
          '   Perfect for student demos, portfolio, and learning.',
          '',
          'MongoDB Atlas M0 free cluster:',
          '   512MB storage — plenty for student projects.',
          '   Free forever — no expiry, no credit card required.',
          '   Shared cluster — performance varies but reliable for demos.',
          '',
          'For normal student backend demos, the free tier is usually enough.',
          '',
          'When to consider upgrading:',
          '   You need guaranteed fast response times for real users.',
          '   You need sustained traffic or SLA guarantees.',
          '   You are beyond portfolio/demo stage.',
        ],
        note: 'Be upfront in interviews: "This runs on Render free tier so the first request may be slow while waking up." That shows real-world awareness — it is a strength.',
      },
    ],
  },

  {
    phase: '18',
    title: 'Keep your API awake — cron-job.org',
    color: '#60A5FA',
    steps: [
      {
        label: 'Optional — prevent cold starts with a free ping job',
        isText: true,
        text: [
          'Render free services sleep after 15 min of inactivity.',
          'A cron job that pings /health every 10 min keeps it awake.',
          '',
          '1. cron-job.org → Sign up free (no credit card)',
          '2. Click "CREATE CRONJOB"',
          '3. Fill in:',
          '   Title:    Keep Node.js API Alive',
          '   URL:      https://your-express-api.onrender.com/health',
          '   Schedule: Every 10 minutes (Custom → Minutes: */10)',
          '4. Click CREATE → toggle to ON',
          '',
          'Why /health:',
          '   Lightweight endpoint — responds in milliseconds.',
          '   No database query needed.',
          '   Returns 200 so the monitor knows the service is alive.',
          '',
          'Things to know:',
          '   cron-job.org is free with no limits for basic jobs.',
          '   Uses your 750 free instance hours/month.',
          '   For one service: fine. Monitor if you run multiple free services.',
          '',
          'Is it mandatory?',
          '   No. For demos and interviews, open the URL 1 minute before.',
          '   For a public API you want always fast: yes, set this up.',
        ],
        note: 'The /health endpoint was added to server.js specifically for this purpose. It is a standard practice for any deployed API.',
      },
    ],
  },

  {
    phase: '19',
    title: 'Common errors and fixes',
    color: '#F97316',
    steps: [
      {
        label: 'Error 1 — Missing start script',
        isText: true,
        text: [
          'Problem: Render logs show "npm start script not found" or deploy fails.',
          'Cause: package.json has no "start" script.',
          'Fix: Add to package.json:',
          '   "scripts": { "start": "node server.js" }',
          '   Replace server.js with your actual main file name.',
        ],
        note: '',
      },
      {
        label: 'Error 2 — 502 Bad Gateway after deploy',
        isText: true,
        text: [
          'Problem: App deploys but every request returns 502 Bad Gateway.',
          'Cause: App is not listening on the correct port or address.',
          '',
          'Fix — update server.js:',
          '   const PORT = process.env.PORT || 3000;',
          "   app.listen(PORT, '0.0.0.0', () => { ... });",
          '',
          'Both process.env.PORT and 0.0.0.0 are required.',
          'Verify no other code calls app.listen a second time.',
        ],
        note: 'This is the #1 deployment error for Node.js on Render. The fix is always the same — use process.env.PORT and bind to 0.0.0.0.',
      },
      {
        label: 'Error 3 — Cannot find module',
        isText: true,
        text: [
          'Problem: Render logs show "Error: Cannot find module X".',
          'Cause: Package is used in code but not listed in dependencies in package.json.',
          '',
          'Fix:',
          '   npm install package-name',
          '   git add package.json package-lock.json',
          '   git commit -m "add missing dependency"',
          '   git push',
          '',
          'Important: devDependencies are NOT installed by Render.',
          'Any package your production code needs must be in dependencies,',
          'not devDependencies.',
        ],
        note: '',
      },
      {
        label: 'Error 4 — MongoDB connection failed',
        isText: true,
        text: [
          'Problem: Logs show MongooseError or MongoDB connection error.',
          '',
          'Cause 1: MONGODB_URI not added in Render environment variables.',
          '   Fix: Render → Environment → add MONGODB_URI.',
          '',
          'Cause 2: Password wrong or <password> not replaced.',
          '   Fix: Re-copy from Atlas, replace <password> exactly.',
          '',
          'Cause 3: Special characters in password (@ # % etc.).',
          '   Fix: Autogenerate a password using only letters and numbers,',
          '   or URL-encode the special characters.',
          '',
          'Cause 4: Database name missing from URI.',
          '   Fix: Add database name before the ?:',
          '   .../mongodb.net/mydbname?retryWrites=true...',
          '',
          'Cause 5: Atlas Network Access is blocking connections.',
          '   Fix: Atlas → Security → Network Access → add 0.0.0.0/0.',
        ],
        note: 'Read the exact Mongoose error in Render Logs. It tells you whether it is a DNS issue, auth issue, or network issue — each has a different fix.',
      },
      {
        label: 'Error 5 — CORS blocked by browser',
        isText: true,
        text: [
          'Problem: Browser console shows "blocked by CORS policy".',
          '',
          'Cause: FRONTEND_URL in Render does not exactly match the Vercel URL.',
          '',
          'Fix:',
          '   Set FRONTEND_URL in Render exactly as:',
          '   https://yourfrontend.vercel.app',
          '   No trailing slash. Correct protocol.',
          '',
          'Check server.js CORS setup:',
          '   app.use(cors({ origin: process.env.FRONTEND_URL }));',
          '',
          'CORS errors show in browser console (F12 → Console),',
          'NOT in Render Logs. Always check browser DevTools first.',
        ],
        note: '',
      },
      {
        label: 'Error 6 — Environment variable is undefined on Render',
        isText: true,
        text: [
          'Problem: API crashes with "Cannot read properties of undefined"',
          'or process.env.MONGODB_URI is undefined.',
          '',
          'Cause: .env works locally but variables not added in Render dashboard.',
          '',
          'Fix:',
          '   Render → your service → Environment tab',
          '   Add every variable from your .env file',
          '   Save → Render auto-redeploys',
          '',
          'Render does NOT read your .env file.',
          'Every variable in .env must be manually added in the dashboard.',
        ],
        note: '',
      },
      {
        label: 'Error 7 — Backend is in a subfolder',
        isText: true,
        text: [
          'Problem: Render cannot find server.js or package.json.',
          'Cause: Backend is inside /server or /backend subfolder in the repo.',
          '',
          'Fix: Set Root Directory in Render.',
          '   Render → your service → Settings → Root Directory',
          '   Set to: server  (or backend — wherever package.json is)',
          '',
          'Or: move backend files to the repository root.',
        ],
        note: 'Render defaults to the repo root. For monorepos with frontend + backend in one repo, always set Root Directory to the backend subfolder.',
      },
      {
        label: 'Error 8 — App works locally but crashes on Render',
        isText: true,
        text: [
          'Check these common causes in order:',
          '',
          '1. Not using process.env.PORT',
          '   Fix: const PORT = process.env.PORT || 3000',
          '',
          '2. Missing environment variables in Render',
          '   Fix: Add all .env variables to Render dashboard',
          '',
          '3. Package in devDependencies instead of dependencies',
          '   Fix: npm install package-name --save (not --save-dev)',
          '',
          '4. Wrong start command',
          '   Fix: Verify "start" script in package.json matches your main file',
          '',
          '5. Node version mismatch',
          '   Fix: Add "engines": { "node": ">=18.0.0" } to package.json',
        ],
        note: 'Always check the Render Logs tab first — the error message usually tells you exactly what went wrong and which file/line caused it.',
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
          '── package.json ─────────────────────────────────────',
          '  "start" script exists: "node server.js"',
          '  "engines": { "node": ">=18.0.0" } is set',
          '  All packages are in dependencies (not devDependencies)',
          '',
          '── server.js ────────────────────────────────────────',
          '  Uses process.env.PORT (not hardcoded port)',
          "  Binds to '0.0.0.0'",
          '  helmet() included',
          '  Rate limiting included',
          '  /health route exists',
          '  MONGODB_URI connection uses process.env',
          '',
          '── Security ─────────────────────────────────────────',
          '  .env is NOT in GitHub (verify with git status)',
          '  .env.example IS in GitHub',
          '  node_modules/ is not in GitHub',
          '  No secrets in any .js file',
          '  No secrets in Git history',
          '',
          '── Render environment variables ─────────────────────',
          '  MONGODB_URI set (full Atlas connection string with db name)',
          '  JWT_SECRET set (strong 64-char random string)',
          '  FRONTEND_URL set (Vercel URL, no trailing slash)',
          '  NODE_ENV = production',
          '  PORT is NOT set (Render injects it automatically)',
          '',
          '── MongoDB Atlas ─────────────────────────────────────',
          '  Database user created with strong password',
          '  Network Access: 0.0.0.0/0 is allowed',
          '  Database name included in connection string',
          '',
          '── Live verification ─────────────────────────────────',
          '  / returns { "status": "ok" }',
          '  /health returns { "status": "healthy" }',
          '  Render Logs: "MongoDB connected"',
          '  Render Logs: "Server running on port XXXXX"',
          '  All API endpoints respond correctly',
          '  CORS works with frontend (no browser console errors)',
        ],
        note: 'A deployed Express API with working MongoDB Atlas, proper security headers, and a live URL is a strong backend portfolio project. Add the Render URL to your GitHub README, resume, and LinkedIn.',
      },
    ],
  },
]
// ─── MERN Stack → React/Vercel + Express/Render + MongoDB Atlas ───────────────
export const MERN_GUIDE = [
  {
    phase: '01',
    title: 'What is MERN Stack?',
    color: '#61DAFB',
    steps: [
      {
        label: 'MERN = MongoDB + Express + React + Node.js',
        isText: true,
        text: [
          'MERN is the most popular full-stack JavaScript combination for students.',
          '',
          'M — MongoDB: stores your data as JSON-like documents (NoSQL database)',
          'E — Express.js: creates your backend REST API routes',
          'R — React: builds your frontend user interface',
          'N — Node.js: runs the Express server (JavaScript on the backend)',
          '',
          'Your MERN project uses THREE free platforms:',
          '→ MongoDB Atlas  — cloud database (free forever, 512MB)',
          '→ Render         — hosts your Express/Node backend (free with sleep)',
          '→ Vercel         — hosts your React frontend (free forever)',
          '',
          'Your final live URLs after deployment:',
          '→ Frontend: https://yourfrontend.vercel.app',
          '→ Backend:  https://your-mern-api.onrender.com',
          '→ Database: MongoDB Atlas cloud (no public URL — internal connection)',
          '',
          'Deployment order:',
          '1. Set up MongoDB Atlas database first',
          '2. Deploy Express backend on Render (needs database URL)',
          '3. Deploy React frontend on Vercel (needs live backend URL)',
          '4. Connect frontend and backend using CORS and VITE_API_URL',
          '',
          'This guide takes you through every step in this exact order.',
        ],
        note: 'Never deploy the frontend before the backend. The frontend needs the live Render URL before it can be deployed correctly.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Deployment flow — why this order matters',
    color: '#9B6ED4',
    steps: [
      {
        label: 'The correct 11-step MERN deployment order',
        isText: true,
        text: [
          'Step 1:  Create MongoDB Atlas cluster and get MONGODB_URI',
          'Step 2:  Prepare Express backend (server.js, package.json, .env)',
          'Step 3:  Push backend code to GitHub',
          'Step 4:  Deploy backend on Render — add MONGODB_URI as env var',
          'Step 5:  Copy your live Render backend URL',
          'Step 6:  Prepare React frontend (set VITE_API_URL = Render URL)',
          'Step 7:  Push frontend code to GitHub',
          'Step 8:  Deploy frontend on Vercel — add VITE_API_URL as env var',
          'Step 9:  Copy your live Vercel frontend URL',
          'Step 10: Go back to Render — set FRONTEND_URL = Vercel URL (for CORS)',
          'Step 11: Test full stack end-to-end — frontend calls backend, data saves',
          '',
          'Why this order:',
          '→ Backend needs MONGODB_URI before it can start → so Atlas comes first',
          '→ Frontend needs live backend URL for VITE_API_URL → so backend deploys first',
          '→ Backend CORS needs live frontend URL → so frontend deploys before CORS update',
          '',
          'Skipping steps or doing them out of order is the most common',
          'reason MERN deployments fail the first time.',
        ],
        note: 'Print or save this 11-step order. Go back to it when confused about which step you are on.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Project structure — separate repos vs monorepo',
    color: '#60A5FA',
    steps: [
      {
        label: 'Option A: Separate repositories (recommended for beginners)',
        isText: true,
        text: [
          'Create two GitHub repositories:',
          '',
          '   mern-backend/   ← one repo for Express/Node',
          '     server.js',
          '     package.json',
          '     routes/',
          '     models/',
          '     controllers/',
          '     middleware/',
          '     .env',
          '     .env.example',
          '     .gitignore',
          '',
          '   mern-frontend/  ← separate repo for React/Vite',
          '     src/',
          '     package.json',
          '     .env',
          '     .env.example',
          '     .gitignore',
          '     vercel.json',
          '',
          'Pros of separate repos:',
          '→ Simpler setup — each deploy points to the root of its repo',
          '→ No root directory configuration needed in Render or Vercel',
          '→ Cleaner Git history for each project',
          '→ Recommended for beginners',
        ],
        note: 'This guide uses the separate repositories approach. It is simpler and less error-prone for students deploying their first MERN project.',
      },
      {
        label: 'Option B: Monorepo (advanced — read this if using one repo)',
        isText: true,
        text: [
          'If you keep both backend and frontend in one repository:',
          '',
          '   my-mern-app/',
          '     backend/',
          '       server.js',
          '       package.json',
          '     frontend/',
          '       src/',
          '       package.json',
          '',
          'Extra steps needed for monorepo:',
          '',
          'Render Root Directory:',
          '   Render → your service → Settings → Root Directory',
          '   Set to: backend',
          '',
          'Vercel Root Directory:',
          '   Vercel → New Project → import repo',
          '   Set Root Directory to: frontend',
          '',
          'If Root Directory is not set, Render looks for package.json',
          'at the repo root and fails because it is inside a subfolder.',
        ],
        note: 'If your project is already a monorepo — that is fine. Just remember to set Root Directory in both Render and Vercel before deploying.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Step 1 — MongoDB Atlas setup',
    color: '#00ED64',
    steps: [
      {
        label: 'Create free cluster and database user',
        isText: true,
        text: [
          '1. cloud.mongodb.com → Sign up free (no credit card)',
          '',
          '2. Create a free cluster:',
          '   → Click "Create" → Select M0 Free tier',
          '   → Choose AWS → nearest region to your location',
          '   → Click "Create Deployment"',
          '',
          '3. Create a database user:',
          '   → Username: choose one (e.g. mernappuser)',
          '   → Password: click "Autogenerate Secure Password"',
          '   → COPY and SAVE this password — it will not be shown again',
          '   → Role: "Read and write to any database"',
          '   → Click "Create Database User"',
          '',
          '4. Configure Network Access:',
          '   → Security → Network Access → "Add IP Address"',
          '   → Click "Allow Access from Anywhere" — adds 0.0.0.0/0',
          '   → Click Confirm',
          '',
          '   Why 0.0.0.0/0:',
          '   Render free tier uses dynamic IPs that change on every restart.',
          '   You cannot whitelist a fixed Render IP.',
          '   Allowing all IPs (0.0.0.0/0) is required for Render free tier.',
          '',
          '5. Get the connection string:',
          '   → Clusters → Click "Connect" → "Drivers" → Node.js',
          '   → Copy the connection string:',
          '   mongodb+srv://mernappuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority',
          '',
          '6. Build your final MONGODB_URI:',
          '   → Replace <password> with your actual saved password',
          '   → Add your database name before the ?:',
          '   mongodb+srv://mernappuser:realpass@cluster0.xxxxx.mongodb.net/mern-app?retryWrites=true&w=majority',
          '',
          '7. Save this URI — you will add it to Render env vars in Step 4.',
        ],
        note: 'Always add the database name (like /mern-app) before the ? in the URI. Without it, data goes to a default "test" database which is confusing across projects.',
      },
      {
        label: 'Security rules for MongoDB Atlas',
        isText: true,
        text: [
          'Use a strong autogenerated password — not "password123".',
          '',
          'About 0.0.0.0/0 network access:',
          '   Allows any IP to attempt a connection to your Atlas cluster.',
          '   Your database user password is the real security layer.',
          '   For student demos: acceptable.',
          '   For real production: restrict to known IP ranges.',
          '',
          'NEVER put MONGODB_URI in React frontend code.',
          '   React code runs in the browser — any user can read it.',
          '   MONGODB_URI gives direct database access to anyone who sees it.',
          '   It must only exist in: backend .env (local) and Render env vars.',
          '',
          'NEVER commit .env to GitHub.',
          '   If you accidentally push it — see Phase 11 immediately.',
        ],
        note: 'MongoDB Atlas M0 free tier is 512MB, forever free. It is the standard database for student MERN projects — reliable, cloud-native, zero maintenance.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Step 2 — Prepare Express backend',
    color: '#68A063',
    steps: [
      {
        label: 'Install required backend packages',
        commands: [
          `npm install express mongoose cors dotenv helmet express-rate-limit`,
          `npm install bcryptjs jsonwebtoken`,
          `npm install -D nodemon`,
        ],
        note: 'Remove bcryptjs and jsonwebtoken if your project does not use authentication. Only install what your project actually needs.',
      },
      {
        label: 'What each package does',
        isText: true,
        text: [
          'express',
          '   Web framework — handles HTTP routes and middleware.',
          '',
          'mongoose',
          '   MongoDB driver for Node.js — defines schemas, connects to Atlas.',
          '',
          'cors',
          '   Allows your React frontend (Vercel) to call this API.',
          '   Without it, the browser blocks all API requests with a CORS error.',
          '',
          'dotenv',
          '   Reads .env file into process.env for local development.',
          '   On Render, env vars are injected directly — no .env needed.',
          '',
          'helmet',
          '   Sets 15+ secure HTTP headers automatically.',
          '   Protects against common web attacks. One line of code.',
          '',
          'express-rate-limit',
          '   Limits requests per IP. Prevents abuse and brute force attacks.',
          '   100 requests per 15 minutes per IP by default.',
          '',
          'bcryptjs',
          '   Hashes passwords before storing in MongoDB.',
          '   Never store plain passwords in your database.',
          '',
          'jsonwebtoken',
          '   Creates and verifies JWT tokens for authentication.',
          '',
          'nodemon (devDependency)',
          '   Auto-restarts server on file changes during local development.',
          '   Never used in production.',
        ],
        note: 'helmet and express-rate-limit are production best practices — add them to every Express project. They protect your free-tier API from abuse.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Backend package.json',
    color: '#F59E0B',
    steps: [
      {
        label: 'Correct package.json for Render deployment',
        isFile: true,
        fileName: 'backend/package.json',
        commands: [
          `{
  "name": "mern-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev":   "nodemon server.js"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "dependencies": {
    "bcryptjs":           "^2.4.3",
    "cors":               "^2.8.5",
    "dotenv":             "^16.0.0",
    "express":            "^4.18.0",
    "express-rate-limit": "^7.0.0",
    "helmet":             "^7.0.0",
    "jsonwebtoken":       "^9.0.0",
    "mongoose":           "^8.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}`,
        ],
        note: 'Render uses "npm start" to run your app. The "engines" field tells Render to use Node.js 18+. Replace server.js if your entry file has a different name.',
      },
    ],
  },

  {
    phase: '07',
    title: 'Backend server.js — production ready',
    color: '#EC4899',
    steps: [
      {
        label: 'Complete server.js with security and MongoDB',
        isFile: true,
        fileName: 'backend/server.js',
        commands: [
          `const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const helmet    = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// ── Security middleware ──────────────────────────────────
app.use(helmet());       // secure HTTP headers
app.use(express.json()); // parse JSON request bodies

// Rate limiting — 100 requests per 15 minutes per IP
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
}));

// ── CORS — allow only your frontend ─────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean); // removes undefined if FRONTEND_URL not set yet

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// ── Routes ───────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'MERN backend is running' });
});

// Health check — used by uptime monitors and cron-job.org
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Add your route files here:
// app.use('/api/users', require('./routes/users'));
// app.use('/api/auth',  require('./routes/auth'));
// app.use('/api/posts', require('./routes/posts'));

// ── MongoDB Atlas connection ─────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    // Server keeps running — non-DB routes still work
  });

// ── Start server ─────────────────────────────────────────
// process.env.PORT — Render injects this automatically
// '0.0.0.0'        — required so Render can route external traffic
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`MERN API running on port \${PORT}\`);
  console.log(\`Environment: \${process.env.NODE_ENV || 'development'}\`);
});`,
        ],
        note: 'Both process.env.PORT and 0.0.0.0 binding are mandatory for Render. The /health endpoint is lightweight — use it for uptime monitoring and cron-job.org pings.',
      },
      {
        label: 'Why each critical line matters',
        isText: true,
        text: [
          'process.env.PORT — MANDATORY:',
          '   Render injects a port as PORT env var.',
          '   Hardcoding 5000 = Render routes traffic to a different port = 502.',
          '',
          '0.0.0.0 binding — MANDATORY:',
          '   Without it, app binds to 127.0.0.1 (localhost only).',
          '   External requests from Render routing cannot reach 127.0.0.1.',
          '   0.0.0.0 accepts traffic from any interface.',
          '',
          '.filter(Boolean) on allowedOrigins:',
          '   When FRONTEND_URL is not set yet (during first deploy),',
          '   process.env.FRONTEND_URL is undefined.',
          '   .filter(Boolean) removes undefined from the array.',
          '   Without it, cors() would crash on undefined origin.',
          '',
          'helmet() — One line. Adds 15+ security headers. Always include.',
          '',
          'rateLimit — Prevents a single IP from hammering your free-tier service.',
        ],
        note: 'Do not simplify or remove any of these lines for production. Every part is there for a reason.',
      },
    ],
  },

  {
    phase: '08',
    title: 'Backend .env and .env.example',
    color: '#A78BFA',
    steps: [
      {
        label: '.env — local only, NEVER commit to GitHub',
        isFile: true,
        fileName: 'backend/.env',
        commands: [
          `PORT=5000
MONGODB_URI=mongodb+srv://mernappuser:password@cluster0.xxxxx.mongodb.net/mern-app?retryWrites=true&w=majority
JWT_SECRET=local-dev-secret-change-this
FRONTEND_URL=http://localhost:5173
NODE_ENV=development`,
        ],
        note: '.env is for your local machine ONLY. On Render, these values are set in the Environment tab. Never push .env to GitHub — not even once.',
      },
      {
        label: '.env.example — always commit this to GitHub',
        isFile: true,
        fileName: 'backend/.env.example',
        commands: [
          `PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_random_secret_50_chars_minimum
FRONTEND_URL=http://localhost:5173
NODE_ENV=development`,
        ],
        note: '.env.example contains placeholder values — no real secrets. Always commit this. Anyone who clones your repo can copy .env.example to .env and fill in their values.',
      },
    ],
  },

  {
    phase: '09',
    title: 'Backend .gitignore',
    color: '#F59E0B',
    steps: [
      {
        label: '.gitignore — protect your project',
        isFile: true,
        fileName: 'backend/.gitignore',
        commands: [
          `# Dependencies — huge, auto-installed by npm install
node_modules/

# Environment variables — NEVER commit
.env
.env.local
.env.*.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS files
.DS_Store
Thumbs.db`,
        ],
        note: 'Render runs npm install automatically on every deploy. Never commit node_modules. Never commit .env. If you do either, fix it immediately using git rm --cached.',
      },
      {
        label: 'Verify .gitignore before committing',
        commands: [
          `git add .`,
          `git status`,
        ],
        note: 'After "git add ." always run "git status". If .env or node_modules/ appear — STOP. Fix .gitignore, run "git rm --cached .env", then recommit. Never push until they are gone.',
      },
    ],
  },

  {
    phase: '10',
    title: 'Test backend locally',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Run and test the Express API locally',
        commands: [
          `npm install`,
          `npm run dev`,
        ],
        note: 'Fix all local errors before pushing to GitHub. Render errors are harder to debug than local ones.',
      },
      {
        label: 'What to verify locally',
        isText: true,
        text: [
          'Test in browser or Postman:',
          '   http://localhost:5000/        → { "status": "ok" }',
          '   http://localhost:5000/health  → { "status": "healthy" }',
          '   http://localhost:5000/api/users → your data (if route exists)',
          '',
          'Check terminal:',
          '   "MongoDB Atlas connected" — Atlas connection works',
          '   "MERN API running on port 5000" — server started',
          '',
          'Also test with npm start:',
          '   npm start',
          '   This is exactly what Render runs.',
          '   Any failure here = failure on Render.',
          '',
          'If MongoDB fails locally:',
          '   Check MONGODB_URI in .env is correct',
          '   Check Atlas Network Access includes your local IP or 0.0.0.0/0',
          '   Check password has no special chars needing URL encoding',
        ],
        note: 'Test with npm start (not just npm run dev) before pushing. Render runs npm start — catching issues here saves deployment time.',
      },
    ],
  },

  {
    phase: '11',
    title: 'If you accidentally pushed a secret to GitHub',
    color: '#EF4444',
    steps: [
      {
        label: 'Deleting in a new commit is NOT enough — act immediately',
        isText: true,
        text: [
          'If MONGODB_URI, JWT_SECRET, API keys, or .env were committed to GitHub:',
          '',
          'Deleting it in a new commit does NOT make it safe.',
          'The secret still exists in every previous Git commit in history.',
          'Anyone can run git log and see every version of every file ever committed.',
          '',
          'Bots scan GitHub for exposed secrets within minutes of a push.',
          'Assume the secret is already compromised.',
          '',
          'Step 1 — ROTATE exposed secrets immediately:',
          '   MongoDB password: Atlas → Database Access → Edit user → Autogenerate new',
          '   JWT_SECRET: generate a new one (old tokens all become invalid)',
          '   Any API key: go to the provider dashboard and regenerate',
          '',
          'Step 2 — Remove .env from Git tracking:',
        ],
        note: 'Rotating the secret is mandatory even if you later clean Git history. Cleaning history does not cancel leaked credentials that may already be scraped.',
      },
      {
        label: 'Commands to stop tracking .env',
        commands: [
          `git rm --cached .env`,
          `git commit -m "remove .env from git tracking"`,
          `git push`,
          `git log --all -- .env`,
          `git grep "OLD_SECRET_VALUE" $(git rev-list --all)`,
        ],
        note: 'git rm --cached removes .env from tracking but keeps it on your local disk. After this commit, .env will never be staged again.',
      },
      {
        label: 'If secret is deep in Git history — clean it',
        isText: true,
        text: [
          'If git log --all -- .env shows old commits containing the file:',
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
          'Force push rewrites all history on GitHub.',
          'Any collaborators who cloned the repo must re-clone.',
          '',
          'Even after cleaning history:',
          'The old exposed key must still be rotated.',
          'History cleaning does not make old credentials safe.',
        ],
        note: 'For solo student projects: rotate → git filter-repo → generate new secret → store only in .env locally and in Render dashboard.',
      },
    ],
  },

  {
    phase: '12',
    title: 'Step 3 — Push backend to GitHub',
    color: '#60A5FA',
    steps: [
      {
        label: 'Create GitHub repo and push backend',
        commands: [
          `git init`,
          `git add .`,
          `git status`,
          `git commit -m "mern backend ready for production"`,
          `git branch -M main`,
          `git remote add origin https://github.com/YOUR_USERNAME/mern-backend.git`,
          `git push -u origin main`,
        ],
        note: 'After "git add ." always run "git status". If .env or node_modules/ appear — STOP. Fix .gitignore and use git rm --cached .env before continuing.',
      },
      {
        label: 'Common Git errors and quick fixes',
        isText: true,
        text: [
          '.env appears in git status:',
          '   git rm --cached .env  →  git add .  →  re-commit',
          '',
          'node_modules/ appears in git status:',
          '   git rm -r --cached node_modules  →  re-commit',
          '',
          'remote origin already exists:',
          '   git remote remove origin  →  git remote add origin ...',
          '',
          'Authentication failed (password rejected):',
          '   GitHub removed password auth.',
          '   Use Personal Access Token (PAT).',
          '   GitHub → Settings → Developer settings → Personal access tokens → Classic',
          '   Generate with repo scope. Use as password when prompted.',
        ],
        note: 'Verify your GitHub repo page shows server.js and package.json at the root after pushing. If they are inside a subfolder, see Phase 03 monorepo notes.',
      },
    ],
  },

  {
    phase: '13',
    title: 'Step 4 — Deploy backend on Render',
    color: '#4ADE80',
    steps: [
      {
        label: 'Create a Web Service on Render for the backend',
        isText: true,
        text: [
          '1. render.com → sign up / login with GitHub',
          '2. New → Web Service',
          '3. Connect your GitHub account',
          '4. Find your backend repo → click "Connect"',
          '',
          '5. Configure:',
          '   Name:          your-mern-api',
          '   Region:        pick nearest to your users',
          '   Branch:        main',
          '   Runtime:       Node  (auto-detected from package.json)',
          '   Build Command: npm install',
          '   Start Command: npm start',
          '',
          '6. Environment Variables — add these now:',
          '   MONGODB_URI = (your full Atlas connection string)',
          '   JWT_SECRET  = (50+ random chars)',
          '   NODE_ENV    = production',
          '   FRONTEND_URL = (leave EMPTY for now — add after Vercel deploy)',
          '',
          '   To generate JWT_SECRET:',
          '   node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"',
          '',
          '7. Click "Create Web Service"',
          '',
          '8. Watch Logs tab:',
          '   → npm install...',
          '   → MongoDB Atlas connected',
          '   → MERN API running on port XXXXX',
          '',
          '9. Your backend is live at:',
          '   https://your-mern-api.onrender.com',
          '',
          '   COPY this URL — you need it for the React frontend.',
        ],
        note: 'Leave FRONTEND_URL empty for the first deploy. You will come back after the React frontend is on Vercel to add the Vercel URL. This is normal — .filter(Boolean) in server.js handles the undefined gracefully.',
      },
    ],
  },

  {
    phase: '14',
    title: 'Step 5 — Verify backend on Render',
    color: '#4ADE80',
    steps: [
      {
        label: 'Test the live backend before touching the frontend',
        isText: true,
        text: [
          'Open in browser or Postman:',
          '',
          '✅ Root: https://your-mern-api.onrender.com/',
          '   Expected: { "status": "ok", "message": "MERN backend is running" }',
          '',
          '✅ Health: https://your-mern-api.onrender.com/health',
          '   Expected: { "status": "healthy" }',
          '',
          '✅ Your routes (if any):',
          '   GET https://your-mern-api.onrender.com/api/users',
          '',
          '✅ Render Logs tab shows:',
          '   "MongoDB Atlas connected"',
          '   "MERN API running on port XXXXX"',
          '',
          'First request may take 30-60 seconds:',
          '   Render free services sleep after 15 min of no requests.',
          '   This is normal — the service is waking up.',
          '   Subsequent requests are fast.',
          '',
          'If something fails:',
          '   Read Render Logs — the exact error is there.',
          '   Most common: MONGODB_URI missing or wrong format.',
          '',
          'When all passes: copy the Render URL.',
          'You need https://your-mern-api.onrender.com for the next phase.',
        ],
        note: 'Do not proceed to the React frontend until the backend passes all tests. A broken backend will cause confusing errors on the frontend.',
      },
    ],
  },

  {
    phase: '15',
    title: 'Step 6 — Prepare React frontend',
    color: '#60A5FA',
    steps: [
      {
        label: 'Frontend folder structure',
        isText: true,
        text: [
          'Your React/Vite frontend folder:',
          '',
          '   mern-frontend/',
          '     src/',
          '       api.js         ← centralized API calls',
          '       App.jsx',
          '       components/',
          '       pages/',
          '     public/',
          '     package.json',
          '     .env',
          '     .env.example',
          '     .gitignore',
          '     vercel.json      ← for React Router fix',
          '',
          'Key rules for React in a MERN stack:',
          '→ Use VITE_API_URL for backend URL — never hardcode Render URL',
          '→ Never put MONGODB_URI or JWT_SECRET in any React file',
          '→ Frontend only calls the Express backend API',
          '→ Express backend handles all database access',
          '',
          'VITE_ env vars are visible in the browser after build.',
          'They are fine for public URLs like VITE_API_URL.',
          'They are NEVER fine for secrets like JWT_SECRET.',
        ],
        note: 'Every API call from React must go through your Express backend. React should never connect directly to MongoDB — that would expose your database to anyone.',
      },
      {
        label: 'Create centralized API helper',
        isFile: true,
        fileName: 'src/api.js',
        commands: [
          `// Centralized API calls — import from here, never use fetch directly
const API_URL = import.meta.env.VITE_API_URL;

export const getUsers = async () => {
  const res = await fetch(\`\${API_URL}/api/users\`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

export const createUser = async (data) => {
  const res = await fetch(\`\${API_URL}/api/users\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
};

export const loginUser = async (credentials) => {
  const res = await fetch(\`\${API_URL}/api/auth/login\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',  // needed for cookies
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
};`,
        ],
        note: 'Centralizing all API calls in api.js means you only update one file if the backend URL changes. Never scatter fetch() calls with backend URLs across many components.',
      },
    ],
  },

  {
    phase: '16',
    title: 'Frontend .env, .env.example, .gitignore',
    color: '#F59E0B',
    steps: [
      {
        label: 'Frontend .env — local development',
        isFile: true,
        fileName: 'mern-frontend/.env',
        commands: [
          `# Points to local Express backend during development
VITE_API_URL=http://localhost:5000`,
        ],
        note: 'For local development use localhost. For production on Vercel, set VITE_API_URL to the Render backend URL in the Vercel dashboard — NOT in this file.',
      },
      {
        label: 'Frontend .env.example — commit this',
        isFile: true,
        fileName: 'mern-frontend/.env.example',
        commands: [
          `VITE_API_URL=http://localhost:5000`,
        ],
        note: 'Safe to commit. Shows what variables are needed without exposing production values.',
      },
      {
        label: 'Frontend .gitignore',
        isFile: true,
        fileName: 'mern-frontend/.gitignore',
        commands: [
          `# Dependencies
node_modules/

# Build output — Vercel builds this itself
dist/

# Environment variables
.env
.env.local
.env.*.local

# OS files
.DS_Store
Thumbs.db`,
        ],
        note: 'dist/ is generated by npm run build. Vercel builds it automatically — never commit it. .env must never be pushed — it may contain future API keys.',
      },
    ],
  },

  {
    phase: '17',
    title: 'Test frontend locally',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Run and verify the React app locally',
        commands: [
          `npm install`,
          `npm run dev`,
          `npm run build`,
        ],
        note: 'Always test npm run build locally before pushing. Vercel runs this command during deployment — build errors here = deployment failure.',
      },
      {
        label: 'What to check before pushing',
        isText: true,
        text: [
          '✅ React app opens at http://localhost:5173',
          '✅ API calls work with local Express backend running',
          '✅ No console errors (F12 → Console tab)',
          '✅ npm run build completes without errors',
          '',
          'Check for hardcoded URLs — search your src/ folder:',
          '   Look for: http://localhost:5000 or onrender.com',
          '   Every API call must use import.meta.env.VITE_API_URL',
          '',
          'VITE_ variable security reminder:',
          '   VITE_API_URL = your Render URL = public URL = FINE',
          '   Any secret like JWT_SECRET or MONGODB_URI = NEVER in React',
          '',
          'If API calls fail locally:',
          '   Make sure local Express backend is running (npm run dev in backend folder)',
          '   Check VITE_API_URL in .env matches backend port (5000)',
        ],
        note: 'If npm run build fails locally, it fails on Vercel. Fix all TypeScript or ESLint errors before pushing.',
      },
    ],
  },

  {
    phase: '18',
    title: 'Step 7 — Push frontend to GitHub',
    color: '#60A5FA',
    steps: [
      {
        label: 'Create separate GitHub repo and push frontend',
        commands: [
          `git init`,
          `git add .`,
          `git status`,
          `git commit -m "mern frontend ready for production"`,
          `git branch -M main`,
          `git remote add origin https://github.com/YOUR_USERNAME/mern-frontend.git`,
          `git push -u origin main`,
        ],
        note: 'After "git add ." run "git status". Verify node_modules/ and .env are NOT in the list. If they appear — fix .gitignore and re-stage.',
      },
    ],
  },

  {
    phase: '19',
    title: 'Step 8 — Deploy frontend on Vercel',
    color: '#4ADE80',
    steps: [
      {
        label: 'Import and deploy React frontend on Vercel',
        isText: true,
        text: [
          '1. vercel.com → sign up / login with GitHub',
          '2. Click "New Project"',
          '3. Import your frontend GitHub repository',
          '4. Vercel auto-detects React/Vite:',
          '   Framework Preset: Vite (auto-selected)',
          '   Build Command:    npm run build (auto)',
          '   Output Directory: dist (auto)',
          '',
          '5. Environment Variables — add this BEFORE clicking Deploy:',
          '   VITE_API_URL = https://your-mern-api.onrender.com',
          '   (your Render backend URL from Step 5)',
          '',
          '6. Click "Deploy"',
          '',
          '7. Your frontend is live at:',
          '   https://yourfrontend.vercel.app',
          '',
          '   COPY this URL — you need it to update CORS in Render.',
        ],
        note: 'VITE_API_URL MUST be set before the first deploy. Vite bakes env vars into the JavaScript bundle at build time. If you forget it, add it in Vercel Settings → Environment Variables → Redeploy.',
      },
    ],
  },

  {
    phase: '20',
    title: 'Fix React Router 404 on page refresh',
    color: '#A78BFA',
    steps: [
      {
        label: 'Create vercel.json for SPA routing',
        isText: true,
        text: [
          'If your React app uses React Router (react-router-dom):',
          '',
          'Problem: refreshing /dashboard or /profile shows a 404 error.',
          '',
          'Why it happens:',
          '   React Router handles routing in the browser.',
          '   When you refresh /dashboard, Vercel looks for a file at /dashboard.',
          '   That file does not exist — Vercel returns 404.',
          '',
          'Fix: create vercel.json in the frontend root:',
        ],
        note: 'Create this file even if you do not yet use React Router. It prevents future 404 issues when you add routes later.',
      },
      {
        label: 'Create vercel.json',
        isFile: true,
        fileName: 'mern-frontend/vercel.json',
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
        note: 'Place this at the root of your frontend repo (same level as package.json). Commit and push — Vercel will auto-redeploy and all routes will work on refresh.',
      },
    ],
  },

  {
    phase: '21',
    title: 'Step 9 — Connect frontend and backend (CORS)',
    color: '#EC4899',
    steps: [
      {
        label: 'Update FRONTEND_URL in Render after Vercel deploy',
        isText: true,
        text: [
          'Now that your React frontend is on Vercel, update the backend CORS:',
          '',
          '1. Render → your backend service → "Environment" tab',
          '2. Add or update:',
          '   FRONTEND_URL = https://yourfrontend.vercel.app',
          '   (your exact Vercel URL from Step 8)',
          '',
          '3. Click Save → Render auto-redeploys the backend',
          '',
          '4. Test the connection:',
          '   → Open your Vercel React app',
          '   → Open DevTools → Network tab',
          '   → Trigger any API call (login, fetch data, etc.)',
          '   → Check it goes to onrender.com URL',
          '   → Check DevTools Console for CORS errors',
          '',
          '✅ Data loads = connection works',
          '❌ CORS error = FRONTEND_URL does not match Vercel URL exactly',
          '',
          'FRONTEND_URL rules:',
          '   Correct: https://yourfrontend.vercel.app',
          '   Wrong:   https://yourfrontend.vercel.app/',
          '   Wrong:   http://yourfrontend.vercel.app',
          '   (no trailing slash, must use https)',
        ],
        note: 'CORS errors show in the BROWSER console (F12), not in Render Logs. If API calls fail but no Render log error — always check browser DevTools first.',
      },
    ],
  },

  {
    phase: '22',
    title: 'Full MERN stack verification checklist',
    color: '#34D399',
    steps: [
      {
        label: 'Test every part before sharing your live app',
        isText: true,
        text: [
          '── Database ──────────────────────────────────────────',
          '✅ MongoDB Atlas: data saves and persists after page refresh',
          '✅ Atlas → Browse Collections: see your collections and documents',
          '',
          '── Backend ───────────────────────────────────────────',
          '✅ https://your-mern-api.onrender.com/ → { "status": "ok" }',
          '✅ https://your-mern-api.onrender.com/health → { "status": "healthy" }',
          '✅ All API endpoints respond correctly in Postman',
          '✅ Render Logs: "MongoDB Atlas connected"',
          '✅ Render Logs: "MERN API running on port XXXXX"',
          '',
          '── Frontend ──────────────────────────────────────────',
          '✅ React app loads at https://yourfrontend.vercel.app',
          '✅ API calls reach the Render backend (check Network tab)',
          '✅ No CORS errors in browser console',
          '✅ No "localhost" URLs in production network requests',
          '✅ Login/register works end-to-end (if auth implemented)',
          '✅ Data appears correctly from MongoDB Atlas',
          '✅ Refreshing /dashboard and other routes works (no 404)',
          '',
          '── Security ──────────────────────────────────────────',
          '✅ .env files NOT in GitHub (check both repos)',
          '✅ .env.example files ARE in GitHub (both repos)',
          '✅ node_modules NOT in GitHub',
          '✅ No secrets in any JS file',
          '✅ No secrets in Git history',
          '✅ MONGODB_URI not in any frontend file',
          '',
          '── Final ─────────────────────────────────────────────',
          '✅ Both GitHub repos have live URLs in README',
          '✅ README explains: frontend URL, backend URL, how to run locally',
        ],
        note: 'A deployed MERN stack with frontend + backend + database working together is one of the strongest full-stack portfolio projects a student can show.',
      },
    ],
  },

  {
    phase: '23',
    title: 'Free tier — honest explanation',
    color: '#4ADE80',
    steps: [
      {
        label: 'What the free tiers actually mean for student projects',
        isText: true,
        text: [
          'MongoDB Atlas M0 free cluster:',
          '   512MB storage — plenty for student and demo projects.',
          '   Free forever — no expiry, no credit card.',
          '   Shared cluster — performance varies but reliable for demos.',
          '',
          'Render free Web Service:',
          '   Service sleeps after 15 min of no requests.',
          '   First request after sleep takes 30-60 seconds.',
          '   750 free instance hours/month (one service = ~744 hrs).',
          '   Not for serious production apps.',
          '   Perfect for portfolio, demos, and college projects.',
          '',
          'Vercel free (Hobby plan):',
          '   Free forever for personal/non-commercial projects.',
          '   100GB bandwidth/month — more than enough for student traffic.',
          '   Does NOT sleep — frontend responds instantly.',
          '',
          'For normal student MERN demos, the free tier is usually enough.',
          '',
          'When to consider upgrading:',
          '   You need guaranteed fast API response times.',
          '   You need to handle real paying users.',
          '   Your project is beyond the demo/portfolio stage.',
        ],
        note: 'Be transparent in demos and interviews: "The backend is on Render free tier so the first request may be slow while it wakes up." This shows real-world deployment awareness.',
      },
    ],
  },

  {
    phase: '24',
    title: 'Keep backend awake — optional',
    color: '#60A5FA',
    steps: [
      {
        label: 'Optional — reduce cold starts with cron-job.org',
        isText: true,
        text: [
          'Render free services sleep after 15 min of no requests.',
          'A free cron job that pings /health every 10 min keeps it awake.',
          '',
          '1. cron-job.org → Sign up free',
          '2. Create Cronjob:',
          '   URL:      https://your-mern-api.onrender.com/health',
          '   Schedule: Every 10 minutes (Custom → Minutes: */10)',
          '3. Save and enable',
          '',
          'Is it mandatory?',
          '   No. For demos, just open the backend URL 1 minute before showing.',
          '   For a public project you want always responsive: yes, set this up.',
          '',
          'Things to know:',
          '   Uses your 750 free instance hours/month.',
          '   cron-job.org is completely free for basic jobs.',
          '   Does NOT guarantee the service never sleeps — it reduces frequency.',
          '',
          'The /health endpoint in server.js was added specifically for this.',
          'It is lightweight — no database call, responds instantly.',
        ],
        note: 'Using cron-job.org does NOT mean the service never sleeps or never has cold starts. It reduces the frequency of cold starts during active ping periods.',
      },
    ],
  },

  {
    phase: '25',
    title: 'Common errors and fixes',
    color: '#F97316',
    steps: [
      {
        label: 'Error 1 — Backend missing start script',
        isText: true,
        text: [
          'Problem: Render cannot start app — "npm start script not found".',
          'Cause: package.json has no "start" script.',
          'Fix: Add to package.json:',
          '   "scripts": { "start": "node server.js" }',
          '   Replace server.js with your actual entry file name.',
        ],
        note: '',
      },
      {
        label: 'Error 2 — Backend 502 Bad Gateway',
        isText: true,
        text: [
          'Problem: Backend deploys but all requests return 502.',
          'Cause: App listening on wrong port or not binding to 0.0.0.0.',
          'Fix:',
          '   const PORT = process.env.PORT || 5000;',
          "   app.listen(PORT, '0.0.0.0', () => { ... });",
          'Both process.env.PORT and 0.0.0.0 are required.',
        ],
        note: 'This is the #1 Node.js deployment error on Render.',
      },
      {
        label: 'Error 3 — MongoDB connection failed',
        isText: true,
        text: [
          'Problem: Render logs show MongoDB connection error.',
          '',
          'Cause 1: MONGODB_URI not added in Render env vars.',
          '   Fix: Render → Environment → add MONGODB_URI.',
          '',
          'Cause 2: Password wrong or <password> not replaced.',
          '   Fix: Re-copy from Atlas, replace <password> exactly.',
          '',
          'Cause 3: Special characters in password (@, #, %, etc.).',
          '   Fix: Generate a new password with letters and numbers only.',
          '',
          'Cause 4: Database name missing from URI.',
          '   Fix: Add /mern-app before the ? in the URI.',
          '',
          'Cause 5: Atlas Network Access blocking Render IPs.',
          '   Fix: Atlas → Network Access → allow 0.0.0.0/0.',
        ],
        note: '',
      },
      {
        label: 'Error 4 — CORS error on frontend',
        isText: true,
        text: [
          'Problem: Browser shows "blocked by CORS policy".',
          'Cause: FRONTEND_URL in Render does not exactly match Vercel URL.',
          'Fix:',
          '   Set FRONTEND_URL in Render to exact Vercel URL.',
          '   Correct: https://yourfrontend.vercel.app',
          '   Wrong:   https://yourfrontend.vercel.app/',
          '   (no trailing slash)',
          'CORS errors appear in browser console, not Render Logs.',
        ],
        note: '',
      },
      {
        label: 'Error 5 — VITE_API_URL undefined in frontend',
        isText: true,
        text: [
          'Problem: Frontend API calls fail — URL is "undefined/api/users".',
          'Cause: VITE_API_URL not added in Vercel environment variables.',
          'Fix:',
          '   Vercel → Settings → Environment Variables',
          '   Add: VITE_API_URL = https://your-mern-api.onrender.com',
          '   Redeploy.',
          '',
          'Vite bakes env vars into the bundle at build time.',
          'Adding env vars after deploy requires a new build.',
        ],
        note: '',
      },
      {
        label: 'Error 6 — Frontend still calling localhost',
        isText: true,
        text: [
          'Problem: Production app makes requests to http://localhost:5000.',
          'Cause: Hardcoded localhost in React components or VITE_API_URL not used.',
          'Fix:',
          '   Replace all hardcoded URLs with:',
          '   const API_URL = import.meta.env.VITE_API_URL;',
          '   Use the centralized api.js helper for all calls.',
        ],
        note: '',
      },
      {
        label: 'Error 7 — React route 404 on refresh',
        isText: true,
        text: [
          'Problem: Refreshing /dashboard or any route shows 404.',
          'Cause: SPA routing not configured for Vercel.',
          'Fix: Create vercel.json in frontend root:',
          '   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }',
          'Commit and push — Vercel redeploys automatically.',
        ],
        note: '',
      },
      {
        label: 'Error 8 — Cannot find module on Render',
        isText: true,
        text: [
          'Problem: Render logs show "Cannot find module X".',
          'Cause: Package used in code but not in dependencies in package.json.',
          'Fix:',
          '   npm install package-name',
          '   git add package.json package-lock.json',
          '   git commit -m "add missing package"',
          '   git push',
          '',
          'Note: devDependencies are NOT installed by Render.',
          'Any package used in production code must be in dependencies.',
        ],
        note: '',
      },
      {
        label: 'Error 9 — Wrong root directory (monorepo)',
        isText: true,
        text: [
          'Problem: Render or Vercel cannot find package.json.',
          'Cause: Backend/frontend is inside a subfolder in a monorepo.',
          '',
          'Fix for Render:',
          '   Render → your service → Settings → Root Directory → set to: backend',
          '',
          'Fix for Vercel:',
          '   Vercel → New Project → set Root Directory to: frontend',
        ],
        note: '',
      },
      {
        label: 'Error 10 — .env pushed to GitHub',
        isText: true,
        text: [
          'Problem: .env file is visible on GitHub.',
          'Cause: .gitignore was missing or added after the first commit.',
          'Fix: See Phase 11 immediately.',
          '   1. Rotate all secrets (MongoDB password, JWT_SECRET)',
          '   2. git rm --cached .env',
          '   3. git commit -m "remove .env"',
          '   4. git push',
          '   5. Clean Git history if repo is public',
        ],
        note: 'Never skip this fix. Exposed MongoDB credentials give anyone direct access to your database.',
      },
    ],
  },
]

// ─── Next.js → Vercel ─────────────────────────────────────────────────────────
export const NEXTJS_GUIDE = [
  {
    phase: '01',
    title: 'What is Next.js and why Vercel?',
    color: '#E2E8F0',
    steps: [
      {
        label: 'Next.js — full-stack React, made for Vercel',
        isText: true,
        text: [
          'Next.js is a full-stack React framework that handles both frontend and backend in one project.',
          '',
          'What Next.js gives you beyond plain React:',
          '→ Server-Side Rendering (SSR) — pages rendered on the server for SEO and performance',
          '→ Static Generation (SSG) — pages built at deploy time, served instantly from CDN',
          '→ API Routes / Route Handlers — backend endpoints inside the same project',
          '→ Server Components — React components that run only on the server (no client JS)',
          '→ Server Actions — server-side mutations without writing API endpoints',
          '→ Image Optimization — automatic compression and resizing via next/image',
          '→ File-based routing — create a file, get a route',
          '',
          'Vercel is the creator of Next.js and the easiest deployment platform for it:',
          '✅ Zero-config deployment — Vercel auto-detects Next.js, no setup needed',
          '✅ Live HTTPS URL — yourapp.vercel.app with SSL automatically',
          '✅ Auto-deploy on every GitHub push',
          '✅ Preview URLs for every branch and pull request',
          '✅ SSR, SSG, API routes, and Server Components all work out of the box',
          '✅ Environment variables with proper public/private scoping',
          '✅ Deployment logs and error tracking built in',
          '✅ Custom domain support',
          '',
          'Honest note about Vercel Hobby plan:',
          '→ Suitable for student demos, portfolios, and learning projects',
          '→ Personal/non-commercial use only',
          '→ Has limits on bandwidth, invocations, and function execution',
          '→ Commercial or business projects may require upgrading to Pro',
        ],
        note: 'Next.js can also be self-hosted on Render or a VPS, but Vercel is the simplest and best-optimized option for students starting out.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Before deployment — checklist',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Verify your Next.js project is ready to deploy',
        isText: true,
        text: [
          '✅ npm install runs cleanly',
          '✅ npm run dev works at http://localhost:3000',
          '✅ All pages load without errors',
          '✅ API routes/route handlers work locally',
          '',
          '✅ npm run build runs without errors — CRITICAL:',
          '   Vercel runs this command during deployment.',
          '   If it fails locally, it will fail on Vercel.',
          '   Fix TypeScript errors, ESLint errors, and missing imports first.',
          '',
          '✅ No hardcoded localhost URLs in production code',
          '✅ .env.local exists for local secrets',
          '✅ .gitignore excludes node_modules, .next, and env files',
          '',
          '✅ package.json has the correct Next.js scripts:',
        ],
        note: 'Always run npm run build locally before pushing. This is the single most effective way to catch deployment failures before they happen.',
      },
      {
        label: 'Required scripts in package.json',
        isFile: true,
        fileName: 'package.json (scripts section)',
        commands: [
          `{
  "scripts": {
    "dev":   "next dev",
    "build": "next build",
    "start": "next start",
    "lint":  "next lint"
  }
}`,
        ],
        note: 'Vercel runs "npm run build" then uses "npm run start" for SSR. If your scripts differ, update them before deploying.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Environment variables — public vs private',
    color: '#EC4899',
    steps: [
      {
        label: 'The most important Next.js security rule',
        isText: true,
        text: [
          'Next.js has TWO types of environment variables.',
          'Understanding the difference prevents accidental secret leaks.',
          '',
          'NEXT_PUBLIC_ prefix = CLIENT-SIDE (visible in browser):',
          '   Available in browser JavaScript after the build.',
          '   Anyone can open DevTools and read these.',
          '   Use ONLY for values that are safe to be public.',
          '',
          '   Safe examples:',
          '   NEXT_PUBLIC_APP_URL=https://yourapp.vercel.app',
          '   NEXT_PUBLIC_SITE_NAME=MyApp',
          '   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX',
          '',
          '   NEVER use NEXT_PUBLIC_ for:',
          '   NEXT_PUBLIC_DATABASE_URL=...  ← anyone gets your DB password',
          '   NEXT_PUBLIC_JWT_SECRET=...    ← anyone can forge auth tokens',
          '   NEXT_PUBLIC_STRIPE_SECRET_KEY=... ← payment fraud risk',
          '',
          'No prefix = SERVER-SIDE ONLY (private, safe for secrets):',
          '   Never sent to the browser.',
          '   Only available in:',
          '   → API routes (pages/api/...)',
          '   → Route handlers (app/api/...)',
          '   → Server Components',
          '   → Server Actions',
          '   → getServerSideProps, getStaticProps',
          '',
          '   Use for all secrets:',
          '   DATABASE_URL=postgresql://...',
          '   MONGODB_URI=mongodb+srv://...',
          '   JWT_SECRET=...',
          '   NEXTAUTH_SECRET=...',
          '',
          'This is the biggest security advantage Next.js has over React/Vite:',
          '→ Secrets stay on the server — they literally never reach the browser.',
        ],
        note: 'Vite requires VITE_ prefix and all env vars end up in the browser bundle. Next.js is different — unprefixed variables are truly private and never sent to clients.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Create .env.local and .env.example',
    color: '#F59E0B',
    steps: [
      {
        label: '.env.local — local development, NEVER commit',
        isFile: true,
        fileName: '.env.local',
        commands: [
          `# ── Public / client-side (safe to expose) ────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ── Server-side only (private — never expose to browser) ─
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
MONGODB_URI=mongodb://localhost:27017/mydb
JWT_SECRET=local-dev-secret-change-this
NEXTAUTH_SECRET=local-dev-secret-change-this
NEXTAUTH_URL=http://localhost:3000`,
        ],
        note: '.env.local is for your local machine ONLY. On Vercel, these values are added in Project Settings → Environment Variables. Never commit .env.local to GitHub.',
      },
      {
        label: '.env.example — always commit this',
        isFile: true,
        fileName: '.env.example',
        commands: [
          `# Copy this file to .env.local and fill in your values

# Public / client-side
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Server-side only (private)
DATABASE_URL=your_postgresql_connection_string
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_50_chars_minimum
NEXTAUTH_SECRET=your_random_secret_50_chars_minimum
NEXTAUTH_URL=http://localhost:3000`,
        ],
        note: '.env.example contains only placeholder values — no real secrets. Always commit this file. Add a README note: "Copy .env.example to .env.local and fill in your values."',
      },
    ],
  },

  {
    phase: '05',
    title: 'Create .gitignore',
    color: '#60A5FA',
    steps: [
      {
        label: '.gitignore for Next.js projects',
        isFile: true,
        fileName: '.gitignore',
        commands: [
          `# Dependencies
node_modules/

# Next.js build output
.next/
out/

# Environment variable files — NEVER commit these
.env
.env.local
.env.*.local

# Vercel local project config
.vercel/

# OS files
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*`,
        ],
        note: '.next/ is the build output — Vercel builds this itself. node_modules is auto-installed. .vercel/ contains local CLI metadata and project IDs — no need to commit.',
      },
      {
        label: 'Verify .gitignore before committing',
        commands: [
          `git add .`,
          `git status`,
        ],
        note: 'After "git add ." run "git status". If .env.local, node_modules/, or .next/ appear — STOP. Fix .gitignore, run "git rm --cached .env.local", then recommit.',
      },
    ],
  },

  {
    phase: '06',
    title: 'If you accidentally pushed a secret to GitHub',
    color: '#EF4444',
    steps: [
      {
        label: 'Deleting in a new commit is NOT enough — act immediately',
        isText: true,
        text: [
          'If DATABASE_URL, MONGODB_URI, JWT_SECRET, NEXTAUTH_SECRET,',
          'API keys, or .env.local were committed to GitHub:',
          '',
          'Deleting in a new commit does NOT make it safe.',
          'The secret still exists in every previous Git commit.',
          'Anyone can run git log and see the full history.',
          '',
          'Bots scan GitHub for exposed secrets within minutes.',
          'Assume the secret is already compromised.',
          '',
          'Step 1 — ROTATE the exposed secret immediately:',
          '   Database password: reset in Neon/Supabase/Atlas dashboard',
          '   JWT_SECRET: generate a new one (all existing JWTs become invalid)',
          '   NEXTAUTH_SECRET: generate a new one (all sessions invalidated)',
          '   API key: go to the provider and regenerate',
          '',
          'Step 2 — Remove env file from Git tracking:',
        ],
        note: 'Rotating the secret is mandatory even if you later clean Git history. Old secrets may already be scraped. Always generate fresh credentials after a leak.',
      },
      {
        label: 'Remove .env.local from Git tracking',
        commands: [
          `git rm --cached .env.local`,
          `git commit -m "remove .env.local from git tracking"`,
          `git push`,
          `git log --all -- .env.local`,
          `git grep "OLD_SECRET_VALUE" $(git rev-list --all)`,
        ],
        note: 'git rm --cached removes the file from tracking without deleting it locally. After this commit, .env.local will never be staged again.',
      },
      {
        label: 'Clean Git history if secret is in old commits',
        isText: true,
        text: [
          'If git log shows old commits with the env file:',
          '',
          'Option A — git-filter-repo (recommended):',
          '   pip install git-filter-repo',
          '   git filter-repo --path .env.local --invert-paths',
          '   git push --force',
          '',
          'Option B — BFG Repo Cleaner:',
          '   java -jar bfg.jar --delete-files .env.local',
          '   git reflog expire --expire=now --all',
          '   git gc --prune=now --aggressive',
          '   git push --force',
          '',
          'Force push rewrites all Git history on GitHub.',
          'Collaborators must re-clone after force push.',
          '',
          'Even after cleaning history:',
          'The leaked secret must still be rotated.',
          'History cleaning does NOT make old credentials safe.',
        ],
        note: 'For solo student projects: rotate → git filter-repo → generate new secrets → store only in .env.local locally and in Vercel dashboard.',
      },
    ],
  },

  {
    phase: '07',
    title: 'Database setup — Neon or MongoDB Atlas',
    color: '#A78BFA',
    steps: [
      {
        label: 'Option A: Neon PostgreSQL (SQL — works great with Prisma)',
        isText: true,
        text: [
          'Best for: relational data, auth systems, dashboards, e-commerce.',
          '',
          '1. neon.tech → Sign up free (no credit card)',
          '2. Create a project → choose nearest region',
          '3. Connection Details → copy the connection string:',
          '   postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require',
          '4. Use as DATABASE_URL in .env.local and Vercel env vars',
          '',
          'Neon free tier:',
          '   0.5GB/project, data preserved, serverless connection pooler.',
          '   Excellent compatibility with Vercel serverless functions.',
          '',
          'Use with Prisma (most common):',
          '   npm install prisma @prisma/client',
          '   npx prisma init',
          '   Set DATABASE_URL in .env.local',
          '   Define your schema in prisma/schema.prisma',
          '   npx prisma db push  (creates tables)',
          '   npx prisma generate (generates client)',
        ],
        note: 'DATABASE_URL must NEVER have the NEXT_PUBLIC_ prefix. Database connections happen on the server — in API routes, route handlers, server components, or server actions.',
      },
      {
        label: 'Option B: MongoDB Atlas (NoSQL — flexible documents)',
        isText: true,
        text: [
          'Best for: flexible schemas, social apps, blogs, portfolios.',
          '',
          '1. cloud.mongodb.com → Sign up free',
          '2. Create M0 free cluster → choose region',
          '3. Database Access → Add user → Autogenerate password',
          '4. Network Access → Add IP → Allow from Anywhere (0.0.0.0/0)',
          '   (Vercel uses dynamic IPs — whitelisting a fixed IP does not work)',
          '5. Connect → Drivers → Node.js → copy URI:',
          '   mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/mydb?retryWrites=true&w=majority',
          '6. Use as MONGODB_URI in .env.local and Vercel env vars',
          '',
          'Use with Mongoose:',
          '   npm install mongoose',
          '',
          'Create a reusable connection file (important for serverless):',
          '   Next.js route handlers are serverless functions.',
          '   Without connection caching, each request opens a new DB connection.',
          '   Use a cached connection pattern to avoid connection exhaustion.',
        ],
        note: 'MONGODB_URI must NEVER have the NEXT_PUBLIC_ prefix. MongoDB connections happen in server-side code only — API routes, route handlers, server components.',
      },
    ],
  },

  {
    phase: '08',
    title: 'Prisma setup for PostgreSQL',
    color: '#60A5FA',
    steps: [
      {
        label: 'Install and initialise Prisma',
        commands: [
          `npm install prisma @prisma/client`,
          `npx prisma init`,
          `npx prisma db push`,
          `npx prisma generate`,
        ],
        note: 'npx prisma init creates a prisma/ folder with schema.prisma and adds DATABASE_URL to .env. Move DATABASE_URL to .env.local instead (Next.js convention).',
      },
      {
        label: 'Add postinstall script for Vercel builds',
        isFile: true,
        fileName: 'package.json (add to scripts)',
        commands: [
          `{
  "scripts": {
    "dev":         "next dev",
    "build":       "next build",
    "start":       "next start",
    "lint":        "next lint",
    "postinstall": "prisma generate"
  }
}`,
        ],
        note: 'Vercel runs npm install during build. The postinstall script ensures Prisma generates the client BEFORE the build runs. Without this, Vercel build fails with "Cannot find module @prisma/client".',
      },
    ],
  },

  {
    phase: '09',
    title: 'API Routes / Route Handlers',
    color: '#4ADE80',
    steps: [
      {
        label: 'Create a health check route (App Router)',
        isFile: true,
        fileName: 'app/api/health/route.js',
        commands: [
          `export async function GET() {
  return Response.json({
    status: 'ok',
    message: 'Next.js API route is working',
    timestamp: new Date().toISOString(),
  });
}`,
        ],
        note: 'App Router uses Route Handlers in app/api/***/route.js. Pages Router uses pages/api/***.js — pick the one matching your project structure.',
      },
      {
        label: 'Pages Router health check alternative',
        isFile: true,
        fileName: 'pages/api/health.js',
        commands: [
          `export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    message: 'Next.js API is working',
  });
}`,
        ],
        note: 'API routes run on the server — they can safely use DATABASE_URL, JWT_SECRET, MONGODB_URI, and any other private env var. Never return raw secrets in JSON responses.',
      },
      {
        label: 'Key rules for API routes',
        isText: true,
        text: [
          'API routes run on the server (not in the browser):',
          '   → They can use private env vars (DATABASE_URL, JWT_SECRET)',
          '   → They can connect to databases',
          '   → They should never return raw secrets in responses',
          '',
          'Test locally at:',
          '   http://localhost:3000/api/health',
          '',
          'On Vercel:',
          '   App Router route handlers → serverless functions',
          '   Pages Router API routes  → serverless functions',
          '   Both work on free Hobby plan',
          '',
          'Common mistake:',
          '   Accessing process.env.DATABASE_URL in a Client Component',
          '   → It will be undefined (server-only vars not available client-side)',
          '   → Move the database code to a server component, route handler, or API route',
        ],
        note: 'If an API route returns undefined or crashes, check Vercel Functions Logs — not the browser console. Server-side errors appear in Vercel dashboard, not DevTools.',
      },
    ],
  },

  {
    phase: '10',
    title: 'Test locally before pushing',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Run all checks before pushing to GitHub',
        commands: [
          `npm install`,
          `npm run dev`,
          `npm run build`,
        ],
        note: 'npm run build is the most important check. Vercel runs this exact command. Fix all TypeScript, ESLint, and import errors before pushing.',
      },
      {
        label: 'What to test locally',
        isText: true,
        text: [
          '✅ Home page: http://localhost:3000',
          '✅ All pages load without errors',
          '✅ API route: http://localhost:3000/api/health → { "status": "ok" }',
          '✅ Database connection works (check terminal logs)',
          '✅ Authentication works if used (login/logout)',
          '✅ Browser console (F12) has no errors',
          '✅ npm run build completes without errors',
          '',
          'Check for common build errors:',
          '   TypeScript errors: types must be correct',
          '   Missing imports: imported but not installed packages',
          '   ESLint errors: rules violations (can disable with eslint-disable if needed)',
          '   Dynamic rendering issues: client components using server-only code',
          '',
          'Check env var scoping:',
          '   Open browser DevTools → Sources → search for your secret value',
          '   If you find DATABASE_URL or JWT_SECRET in browser sources — fix immediately',
          '   Move the code to server-side and rotate the secret',
        ],
        note: 'npm run build locally saves hours of Vercel debugging. The build output clearly shows which file and line caused the error.',
      },
    ],
  },

  {
    phase: '11',
    title: 'Push to GitHub',
    color: '#60A5FA',
    steps: [
      {
        label: 'Initialize git and push to GitHub',
        commands: [
          `git init`,
          `git add .`,
          `git status`,
          `git commit -m "nextjs app ready for deployment"`,
          `git branch -M main`,
          `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git`,
          `git push -u origin main`,
        ],
        note: 'After "git add ." always run "git status". If .env.local, .next/, or node_modules/ appear — STOP. Fix .gitignore and remove them before committing.',
      },
      {
        label: 'Common Git errors and fixes',
        isText: true,
        text: [
          '.env.local appears in git status:',
          '   git rm --cached .env.local  →  re-add  →  recommit',
          '',
          '.next/ or node_modules/ in git status:',
          '   git rm -r --cached .next  →  recommit',
          '',
          'remote origin already exists:',
          '   git remote remove origin  →  git remote add origin ...',
          '',
          'Authentication failed:',
          '   GitHub requires Personal Access Token (not password).',
          '   GitHub → Settings → Developer settings → Personal access tokens → Classic',
          '   Generate with repo scope. Use as password when prompted.',
        ],
        note: 'Verify the GitHub repo page after pushing — confirm your Next.js files (app/ or pages/, package.json, next.config.js) are at the repository root.',
      },
    ],
  },

  {
    phase: '12',
    title: 'Deploy on Vercel',
    color: '#4ADE80',
    steps: [
      {
        label: 'Import and deploy your Next.js project',
        isText: true,
        text: [
          '1. vercel.com → sign up / login with GitHub',
          '2. Click "New Project"',
          '3. Import your GitHub repository',
          '',
          '4. Vercel auto-detects Next.js — zero configuration needed:',
          '   Framework Preset: Next.js (auto)',
          '   Build Command:    npm run build (auto)',
          '   Output:           .next (auto)',
          '',
          '5. Environment Variables — add ALL your env vars before deploying:',
          '   Click "Environment Variables" → add each key-value pair',
          '   (See Phase 13 for the full list)',
          '',
          '6. Click "Deploy"',
          '',
          '7. Your app is live at:',
          '   https://yourapp.vercel.app',
          '',
          'After deployment:',
          '   → Every push to main can trigger automatic redeployment',
          '   → Every branch and pull request gets its own preview URL',
          '   → You can share preview URLs before merging',
        ],
        note: 'Add all environment variables BEFORE clicking Deploy. NEXT_PUBLIC_ variables are baked into the JavaScript bundle at build time — they require a new deployment if changed.',
      },
    ],
  },

  {
    phase: '13',
    title: 'Add environment variables in Vercel',
    color: '#60A5FA',
    steps: [
      {
        label: 'Add all variables in Vercel Project Settings',
        isText: true,
        text: [
          'Vercel → your project → Settings → Environment Variables → Add New',
          '',
          'For each variable, select which environments it applies to:',
          '   Production  — your live site (main branch)',
          '   Preview     — branch preview deployments',
          '   Development — local Vercel dev (optional)',
          '',
          'Variables to add:',
          '',
          'NEXT_PUBLIC_APP_URL',
          '   Value: https://yourapp.vercel.app',
          '   Note: Update this to your actual Vercel URL after first deploy',
          '',
          'DATABASE_URL  (if using PostgreSQL/Neon)',
          '   Value: postgresql://user:pass@host/db?sslmode=require',
          '',
          'MONGODB_URI  (if using MongoDB Atlas)',
          '   Value: mongodb+srv://user:pass@cluster.xxxx.mongodb.net/mydb',
          '',
          'JWT_SECRET  (if using custom JWT)',
          '   Generate: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"',
          '',
          'NEXTAUTH_SECRET  (if using NextAuth/Auth.js)',
          '   Generate: npx auth secret  OR  openssl rand -base64 32',
          '',
          'NEXTAUTH_URL  (if using NextAuth — only required for older versions)',
          '   Value: https://yourapp.vercel.app',
          '',
          'After saving:',
          '   Vercel saves env vars and triggers a new deployment.',
          '   NEXT_PUBLIC_ vars require redeploy to take effect.',
          '   Private vars take effect immediately on next function call.',
        ],
        note: 'Do not prefix private secrets with NEXT_PUBLIC_. Vercel treats NEXT_PUBLIC_DATABASE_URL as a public variable — it will be visible in browser JavaScript.',
      },
    ],
  },

  {
    phase: '14',
    title: 'NextAuth / Auth.js notes',
    color: '#EC4899',
    steps: [
      {
        label: 'Setting up auth for production',
        isText: true,
        text: [
          'If your Next.js app uses NextAuth.js or Auth.js for authentication:',
          '',
          'NEXTAUTH_SECRET (or AUTH_SECRET in newer Auth.js):',
          '   → Generate: npx auth secret',
          '   → Or: openssl rand -base64 32',
          '   → Add to Vercel env vars (no NEXT_PUBLIC_ prefix)',
          '   → This is used to sign/verify session tokens',
          '',
          'NEXTAUTH_URL:',
          '   → Set to your production Vercel URL: https://yourapp.vercel.app',
          '   → Required in older NextAuth versions',
          '   → Newer Auth.js versions infer it automatically on Vercel',
          '   → Still set it explicitly to be safe',
          '',
          'Callback URLs in OAuth providers:',
          '   → GitHub, Google, etc. need your production callback URL:',
          '   → https://yourapp.vercel.app/api/auth/callback/github',
          '   → Add this in your OAuth app settings (GitHub/Google developer console)',
          '',
          'After deploying:',
          '   → Test login and logout end-to-end',
          '   → Test session persistence (refresh page while logged in)',
          '   → Verify protected routes work correctly',
          '',
          'Never expose auth secrets:',
          '   → NEXTAUTH_SECRET must NOT have NEXT_PUBLIC_ prefix',
          '   → Rotate it immediately if accidentally committed to GitHub',
        ],
        note: 'OAuth callback URLs must be updated in the OAuth provider settings whenever your Vercel URL changes. Vercel preview deployments get different URLs — register them too if needed.',
      },
    ],
  },

  {
    phase: '15',
    title: 'Verify live deployment',
    color: '#34D399',
    steps: [
      {
        label: 'Test every part of your live Next.js app',
        isText: true,
        text: [
          '✅ Home page: https://yourapp.vercel.app',
          '✅ All pages load without 404 or 500 errors',
          '✅ API routes: https://yourapp.vercel.app/api/health',
          '✅ Database queries return data (create and read test record)',
          '✅ Authentication: login, logout, protected routes work',
          '✅ Images load (especially if using next/image with external domains)',
          '',
          'Check Vercel dashboard:',
          '   → Deployments tab: build succeeded',
          '   → Functions tab: API route invocations and any errors',
          '   → Vercel logs show no server-side errors',
          '',
          'Check browser DevTools:',
          '   → Console tab: no JavaScript errors',
          '   → Network tab: API calls succeed (200 OK)',
          '   → Sources tab: no private secrets visible in JS bundles',
          '',
          'API route 500 errors:',
          '   → Appear in Vercel Functions logs, not browser console',
          '   → Vercel → your project → Functions → click the route',
          '   → Check the log output for the exact error',
          '',
          'After verifying, add your live URL to:',
          '   → GitHub repo description',
          '   → README',
          '   → Resume',
          '   → LinkedIn projects',
        ],
        note: 'Browser DevTools only shows CLIENT-SIDE errors. Server errors (API routes, server components) only appear in Vercel Functions/Logs. Always check both places.',
      },
    ],
  },

  {
    phase: '16',
    title: 'Free tier — honest explanation',
    color: '#4ADE80',
    steps: [
      {
        label: 'What Vercel Hobby plan actually includes',
        isText: true,
        text: [
          'Vercel Hobby plan is free and designed for personal projects.',
          '',
          'Suitable for:',
          '→ Student portfolios and demos',
          '→ Learning Next.js and deploying practice projects',
          '→ Personal blogs and side projects',
          '→ Non-commercial hobby projects',
          '',
          'Important limitations:',
          '→ Personal/non-commercial use only',
          '→ Has limits on bandwidth, function invocations, and execution time',
          '→ Exact limits may change — check vercel.com/pricing for current details',
          '→ Commercial/team/business projects should use Pro plan',
          '',
          'For student projects, the Hobby plan is usually more than enough.',
          '',
          'Serverless functions note:',
          '→ Vercel uses serverless functions for API routes and SSR',
          '→ These can have occasional startup latency depending on',
          '   region, runtime size, and dependency load',
          '→ Unlike Render free tier, Vercel does not have a hard "sleep after X minutes"',
          '→ However, rarely-invoked functions may have higher first-call latency',
          '→ For typical student projects, this is not a significant problem',
        ],
        note: 'Do not assume Vercel is unlimited or always instant. For normal student projects it works very well — just be honest in demos if you notice occasional latency.',
      },
    ],
  },

  {
    phase: '17',
    title: 'Common errors and fixes',
    color: '#F97316',
    steps: [
      {
        label: 'Error 1 — Build failed on Vercel',
        isText: true,
        text: [
          'Problem: Vercel deployment fails during build.',
          'Cause: TypeScript errors, ESLint errors, missing imports, or env var issues.',
          'Fix: Run npm run build locally and fix the exact error shown.',
          '',
          'Error message location:',
          '   Vercel → Deployments → click failed deploy → Build Logs',
          '',
          'Most common build errors:',
          '   Type error: ... → fix TypeScript types',
          '   Module not found: ... → npm install the missing package',
          '   Env var undefined during build → add to Vercel env vars',
        ],
        note: 'npm run build locally is the most reliable way to catch Vercel build failures before they happen.',
      },
      {
        label: 'Error 2 — API route returns 500',
        isText: true,
        text: [
          'Problem: API route at /api/... returns 500 Internal Server Error.',
          'Cause: Missing env var (DATABASE_URL, JWT_SECRET, etc.) or code error.',
          '',
          'Fix:',
          '1. Check Vercel → Functions logs for the exact error',
          '2. Add missing env var in Vercel Settings → Environment Variables',
          '3. Redeploy if the env var is NEXT_PUBLIC_ (requires new build)',
          '',
          '500 errors only appear in Vercel logs — not browser console.',
          'Always check both: Vercel logs AND browser Network tab.',
        ],
        note: '',
      },
      {
        label: 'Error 3 — process.env value undefined in browser',
        isText: true,
        text: [
          'Problem: A value is undefined when accessed in a client component.',
          'Cause: Variable does not have the NEXT_PUBLIC_ prefix.',
          '',
          'Fix:',
          '   If the value is safe to be public: add NEXT_PUBLIC_ prefix.',
          '   If the value is a secret: move the code to server-side.',
          '',
          'Server-side locations (can use unprefixed private vars):',
          '   API routes / route handlers',
          '   Server Components',
          '   Server Actions',
          '   getServerSideProps / getStaticProps',
        ],
        note: '',
      },
      {
        label: 'Error 4 — Secret visible in browser JavaScript',
        isText: true,
        text: [
          'Problem: Found DATABASE_URL or JWT_SECRET in browser DevTools → Sources.',
          'Cause: Secret was placed in a NEXT_PUBLIC_ variable or a Client Component.',
          '',
          'Fix:',
          '1. Remove NEXT_PUBLIC_ prefix from the variable',
          '2. Move the code using the secret to server-side (API route or server component)',
          '3. Rotate the exposed secret immediately — treat it as leaked',
          '4. Update the new secret in Vercel env vars',
        ],
        note: 'This is a critical security issue. If users can see DATABASE_URL, they have direct database access. Fix it immediately.',
      },
      {
        label: 'Error 5 — Prisma client not generated',
        isText: true,
        text: [
          'Problem: Vercel build fails with:',
          '   Cannot find module @prisma/client',
          '   Or: PrismaClientInitializationError',
          '',
          'Cause: Prisma generates its client at install time, not import time.',
          'Vercel runs npm install → build. Without postinstall, client is missing.',
          '',
          'Fix: Add to package.json:',
          '   "postinstall": "prisma generate"',
          '',
          'This makes Vercel run prisma generate automatically after npm install.',
        ],
        note: '',
      },
      {
        label: 'Error 6 — Database connection fails on Vercel',
        isText: true,
        text: [
          'Problem: Database queries fail in production but work locally.',
          '',
          'Cause 1: DATABASE_URL or MONGODB_URI not set in Vercel env vars.',
          '   Fix: Add in Vercel → Settings → Environment Variables.',
          '',
          'Cause 2: SSL not configured for PostgreSQL.',
          '   Fix: Add ?sslmode=require to DATABASE_URL:',
          '   postgresql://user:pass@host/db?sslmode=require',
          '',
          'Cause 3: MongoDB Atlas Network Access blocking Vercel.',
          '   Fix: Atlas → Network Access → Allow from Anywhere (0.0.0.0/0).',
          '   Vercel uses dynamic IPs — whitelisting specific IPs does not work.',
          '',
          'Cause 4: Too many connections (serverless connection exhaustion).',
          '   Fix: Use connection pooling (Neon pooler URL) or a cached connection.',
        ],
        note: '',
      },
      {
        label: 'Error 7 — Env var changed but app uses old value',
        isText: true,
        text: [
          'Problem: Updated env var in Vercel but app still shows old behavior.',
          '',
          'Cause: App was not redeployed after the env var change.',
          'NEXT_PUBLIC_ vars are especially affected — they are baked into the build.',
          '',
          'Fix:',
          '   Vercel → Deployments → click the three dots → Redeploy',
          '   OR push a new commit to trigger automatic redeployment.',
        ],
        note: '',
      },
      {
        label: 'Error 8 — .env.local pushed to GitHub',
        isText: true,
        text: [
          'Problem: .env.local file visible on GitHub.',
          'Cause: .gitignore was missing or added after the first commit.',
          '',
          'Fix: See Phase 06 — act immediately.',
          '1. Rotate all exposed secrets',
          '2. git rm --cached .env.local',
          '3. git commit and push',
          '4. Clean Git history if repo is public',
        ],
        note: '',
      },
      {
        label: 'Error 9 — Next.js not detected (monorepo)',
        isText: true,
        text: [
          'Problem: Vercel cannot detect Next.js or finds the wrong folder.',
          'Cause: Next.js app is inside a subfolder (e.g. frontend/ in a monorepo).',
          '',
          'Fix: Set Root Directory in Vercel project settings.',
          '   Vercel → your project → Settings → General → Root Directory',
          '   Set to: frontend  (or wherever your Next.js app folder is)',
        ],
        note: '',
      },
      {
        label: 'Error 10 — next/image domain error',
        isText: true,
        text: [
          'Problem: Images from external URLs show error or do not load.',
          'Cause: External domain not configured in next.config.js.',
          '',
          'Fix — add to next.config.js:',
          '',
          '// next.config.js',
          'const nextConfig = {',
          '  images: {',
          '    remotePatterns: [',
          '      {',
          '        protocol: "https",',
          '        hostname: "example.com",',
          '      },',
          '    ],',
          '  },',
          '};',
          '',
          'module.exports = nextConfig;',
        ],
        note: 'next/image only serves images from approved domains. Add every external image hostname to remotePatterns in next.config.js.',
      },
    ],
  },

  {
    phase: '18',
    title: 'Final deployment checklist',
    color: '#34D399',
    steps: [
      {
        label: 'Verify all items before sharing your live app',
        isText: true,
        text: [
          '── Build ─────────────────────────────────────────────',
          '  npm run build succeeds locally',
          '  No TypeScript or ESLint errors',
          '  All pages render correctly',
          '',
          '── Security ──────────────────────────────────────────',
          '  .env.local NOT in GitHub',
          '  .env.example IS in GitHub',
          '  node_modules/ NOT in GitHub',
          '  .next/ NOT in GitHub',
          '  No secrets in any client component or NEXT_PUBLIC_ variable',
          '  No secrets in Git history',
          '',
          '── Environment variables ──────────────────────────────',
          '  Public vars use NEXT_PUBLIC_ prefix',
          '  Private vars do NOT use NEXT_PUBLIC_ prefix',
          '  All vars added in Vercel Settings → Environment Variables',
          '  NEXTAUTH_SECRET set if using authentication',
          '  DATABASE_URL or MONGODB_URI set if using a database',
          '',
          '── Live verification ─────────────────────────────────',
          '  Home page loads at yourapp.vercel.app',
          '  All pages load without 500 errors',
          '  API routes return correct responses',
          '  Database reads and writes work',
          '  Authentication works (login, logout, session)',
          '  Vercel Logs are clean (no errors)',
          '  Browser console is clean (no errors)',
          '  No secrets visible in browser DevTools → Sources',
          '',
          '── Sharing ───────────────────────────────────────────',
          '  Live URL in GitHub README',
          '  README explains how to run locally',
          '  Resume and LinkedIn updated with live URL',
        ],
        note: 'A deployed Next.js app with working API routes, database, and auth is one of the most impressive student portfolio projects. It shows full-stack ability in a single codebase.',
      },
    ],
  },
]

// ─── FastAPI → Render ─────────────────────────────────────────────────────────
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
          `web: gunicorn app:app`,
        ],
        note: 'Place Procfile at the root of your project (same level as app.py and requirements.txt). No file extension. The exact content is: web: gunicorn app:app',
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
          '   Start Command: gunicorn app:app',
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
export const SPRINGBOOT_GUIDE = [
  {
    phase: '01',
    title: 'Why Docker — Render has no native Java runtime',
    color: '#6DB33F',
    steps: [
      {
        label: 'Spring Boot on Render requires Docker — here is why',
        isText: true,
        text: [
          'Render supports Python, Node.js, Ruby, Go, and Rust natively.',
          'Java / Spring Boot is NOT in that list.',
          '',
          'This means you cannot just push code and click deploy.',
          'You must package your Spring Boot app inside a Docker container.',
          'Render then builds and runs the Docker image — no Java setup needed.',
          '',
          'This guide covers ALL Spring Boot project types:',
          '→ REST API (returns JSON — for React, Android, mobile frontend)',
          '→ MVC with Thymeleaf/JSP (returns HTML — full-stack in one app)',
          '→ Mixed (/api routes + template pages)',
          '',
          'The deployment process is identical for all three.',
          'Spring Boot handles routing internally — Render only sees one container.',
          '',
          'What you get free on Render:',
          '✅ Live HTTPS URL — your-api.onrender.com',
          '✅ Auto-deploy on every GitHub push',
          '✅ Free PostgreSQL or MongoDB Atlas',
          '✅ 512 MB RAM — enough for a tuned Spring Boot app',
          '',
          'You do NOT need to know Docker deeply.',
          'This guide gives you the exact Dockerfile — copy and deploy.',
        ],
        note: 'Docker is the only supported way to deploy Spring Boot on Render. This is also true of AWS, GCP, and most modern cloud platforms — learning Docker deployment is a real skill.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Before deployment — checklist',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Verify your project is ready before touching Render',
        isText: true,
        text: [
          '✅ Spring Boot app runs locally: mvn spring-boot:run',
          '✅ All API endpoints respond correctly (test with Postman)',
          '✅ No hard-coded passwords, secrets, or URLs in Java code',
          '',
          '✅ Docker Desktop is installed and running',
          '   Download: docs.docker.com/get-docker/',
          '   Verify: docker --version',
          '',
          '✅ pom.xml (or build.gradle) is up to date',
          '✅ .gitignore exists and excludes target/, .env, credentials',
          '',
          'Common mistakes to avoid:',
          '→ Hard-coding database URLs like "localhost:5432" in the code',
          '→ Putting JWT_SECRET or passwords inside application.properties',
          '→ Using spring.jpa.hibernate.ddl-auto=create-drop (destroys data on restart)',
        ],
        note: 'Install Docker Desktop before proceeding. You need it to test your Docker build locally and catch errors before they reach Render.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Add required dependencies to pom.xml',
    color: '#60A5FA',
    steps: [
      {
        label: 'Option A: PostgreSQL + H2 (SQL with local fallback)',
        isFile: true,
        fileName: 'pom.xml (add inside <dependencies>)',
        commands: [
          `<!-- PostgreSQL driver — for production on Render -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>

<!-- H2 in-memory database — for local development -->
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>

<!-- Spring Data JPA — if not already present -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>`,
        ],
        note: 'H2 in-memory database works locally without any setup. On Render, set SPRING_DATASOURCE_URL to PostgreSQL and Spring Boot switches automatically.',
      },
      {
        label: 'Option B: MongoDB (add instead of PostgreSQL)',
        isFile: true,
        fileName: 'pom.xml (add inside <dependencies>)',
        commands: [
          `<!-- Spring Data MongoDB — replaces JPA for MongoDB projects -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>

<!-- Remove spring-boot-starter-data-jpa, postgresql, and h2
     if you choose MongoDB — they are for SQL databases only -->`,
        ],
        note: 'Use MongoDB if your project uses @Document and MongoRepository. Use PostgreSQL if your project uses @Entity and JpaRepository. Do not mix both in the same project without extra config.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Configure application.properties',
    color: '#F59E0B',
    steps: [
      {
        label: 'application.properties for PostgreSQL + H2 fallback',
        isFile: true,
        fileName: 'src/main/resources/application.properties',
        commands: [
          `# ── Server ────────────────────────────────────────────────
server.port=\${PORT:8080}

# ── Database ──────────────────────────────────────────────
# Local: uses H2 in-memory (default, no setup needed)
# Render: set SPRING_DATASOURCE_URL, USERNAME, PASSWORD env vars

spring.datasource.url=\${SPRING_DATASOURCE_URL:jdbc:h2:mem:devdb;DB_CLOSE_DELAY=-1}
spring.datasource.username=\${SPRING_DATASOURCE_USERNAME:sa}
spring.datasource.password=\${SPRING_DATASOURCE_PASSWORD:}

# ── JPA — update = never drops data, safe for production
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.h2.console.enabled=false

# ── App secrets ────────────────────────────────────────────
jwt.secret=\${JWT_SECRET:local-dev-secret-only}
jwt.expiration=\${JWT_EXPIRATION:86400000}`,
        ],
        note: 'The \${VAR:default} syntax reads from environment variables with a fallback. Locally it uses H2. On Render, set SPRING_DATASOURCE_URL to your PostgreSQL URL and it switches automatically.',
      },
      {
        label: 'application.properties for MongoDB',
        isFile: true,
        fileName: 'src/main/resources/application.properties (MongoDB)',
        commands: [
          `server.port=\${PORT:8080}

# MongoDB — set SPRING_DATA_MONGODB_URI in Render env vars
spring.data.mongodb.uri=\${SPRING_DATA_MONGODB_URI:mongodb://localhost:27017/devdb}

# No spring.jpa.* settings needed for MongoDB
jwt.secret=\${JWT_SECRET:local-dev-secret-only}`,
        ],
        note: 'For MongoDB, no JPA/Hibernate settings are needed. Spring Data MongoDB connects using the URI and manages documents via @Document and MongoRepository.',
      },
      {
        label: 'Critical: never use create-drop in production',
        isText: true,
        text: [
          'spring.jpa.hibernate.ddl-auto controls what Hibernate does on startup.',
          '',
          'create-drop → DELETES all tables on every restart = data lost',
          'create      → DROPS and recreates tables = data lost',
          'update      → Creates/alters tables, NEVER deletes data ✅',
          'validate    → Only checks schema, no changes',
          '',
          'Always use: spring.jpa.hibernate.ddl-auto=update',
          'This is the only safe option for production.',
        ],
        note: 'If you deployed with create-drop or create, your database was wiped on every restart. Change to update immediately and redeploy.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Create .gitignore and Dockerfile',
    color: '#EC4899',
    steps: [
      {
        label: '.gitignore for Spring Boot',
        isFile: true,
        fileName: '.gitignore',
        commands: [
          `# Maven build output
target/
!.mvn/wrapper/maven-wrapper.jar

# Gradle build output
build/
.gradle/

# Environment variables
.env
.env.local

# IDE files
.idea/
*.iml
.classpath
.project

# OS files
.DS_Store
Thumbs.db

# Logs
*.log`,
        ],
        note: 'target/ contains your compiled JAR — often 30-50MB. The Dockerfile builds this inside the container, so you never need to commit it.',
      },
      {
        label: 'Dockerfile — multi-stage Maven build',
        isFile: true,
        fileName: 'Dockerfile',
        commands: [
          `# ── Stage 1: Build the JAR with Maven ────────────────────
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Download dependencies first (cached layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Build the JAR
COPY src ./src
RUN mvn clean package -DskipTests -B

# ── Stage 2: Run with slim JRE ────────────────────────────
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080

# CRITICAL: -Xmx256m keeps memory under Render's 512MB limit
ENTRYPOINT ["java", "-Xmx256m", "-Xms128m", "-jar", "app.jar"]`,
        ],
        note: 'CRITICAL: The -Xmx256m flag is mandatory for Render free tier. Without it, Spring Boot exceeds 512MB and Render kills the container with an out-of-memory error.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Test Docker build locally',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Build and run Docker image locally',
        commands: [
          `# Build the image (5-10 min first time — downloads dependencies)
docker build -t my-spring-app .`,
          `# Run locally
docker run -p 8080:8080 my-spring-app`,
          `# Test at http://localhost:8080`,
          `# Stop the container
docker stop $(docker ps -q --filter "ancestor=my-spring-app")`,
        ],
        note: 'If the Docker build fails, the error message tells you exactly what is wrong. Fix locally — do not push until docker build succeeds and the app runs.',
      },
    ],
  },

  {
    phase: '07',
    title: 'Push to GitHub',
    color: '#60A5FA',
    steps: [
      {
        label: 'Push project to GitHub',
        commands: [
          `git init`,
          `git add .`,
          `git status`,
          `git commit -m "spring boot app with Dockerfile ready for Render"`,
          `git branch -M main`,
          `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git`,
          `git push -u origin main`,
        ],
        note: 'After git add . run git status and verify target/ and .env are NOT staged. The Dockerfile MUST be visible at the repository root after pushing.',
      },
    ],
  },

  {
    phase: '08',
    title: 'If you accidentally pushed a secret to GitHub',
    color: '#EF4444',
    steps: [
      {
        label: 'Act immediately — revoke and clean',
        commands: [
          `git rm --cached .env`,
          `git commit -m "remove .env from git tracking"`,
          `git push`,
          `git log --all -- .env`,
        ],
        note: '⚠️  Treat any pushed secret as already compromised. Revoke it at the provider dashboard immediately, then clean Git tracking. See Node.js or Django guide Phase 09 for full cleanup steps.',
      },
    ],
  },

  {
    phase: '09',
    title: 'Database — PostgreSQL or MongoDB Atlas',
    color: '#A78BFA',
    steps: [
      {
        label: 'Option A: Render PostgreSQL (easiest)',
        isText: true,
        text: [
          '1. render.com → New → PostgreSQL → Free plan → Create',
          '2. Copy the Internal Database URL after creation',
          '3. Build your SPRING_DATASOURCE_URL:',
          '   jdbc:postgresql://dpg-xxx.render.com:5432/dbname?sslmode=require',
          '   (add "jdbc:" at the start, remove user:pass from URL, add ?sslmode=require)',
          '4. Add separately:',
          '   SPRING_DATASOURCE_USERNAME = your_username',
          '   SPRING_DATASOURCE_PASSWORD = your_password',
          '',
          '⚠️  Render free PostgreSQL expires after 30 days.',
          '   Export before expiry: pg_dump DATABASE_URL > backup.sql',
        ],
        note: 'Use the Internal Database URL (not External) when both your app and database are on Render. It is faster and stays within Render\'s private network.',
      },
      {
        label: 'Option B: Neon PostgreSQL (0.5GB/project, data preserved)',
        isText: true,
        text: [
          '1. neon.tech → Sign up free',
          '2. Create project → copy connection string:',
          '   postgresql://user:pass@ep-xxx.aws.neon.tech/neondb?sslmode=require',
          '3. Build SPRING_DATASOURCE_URL:',
          '   jdbc:postgresql://ep-xxx.aws.neon.tech/neondb?sslmode=require',
          '4. Set SPRING_DATASOURCE_USERNAME and SPRING_DATASOURCE_PASSWORD separately',
        ],
        note: 'Neon is better for long-term projects. 0.5GB/project, data preserved, no credit card.',
      },
      {
        label: 'Option C: MongoDB Atlas (NoSQL, free forever)',
        isText: true,
        text: [
          '1. cloud.mongodb.com → Sign up free',
          '2. Create M0 cluster → add user → allow 0.0.0.0/0',
          '3. Connect → Drivers → Java → copy connection string:',
          '   mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/mydb?retryWrites=true&w=majority',
          '4. Add as SPRING_DATA_MONGODB_URI in Render env vars',
        ],
        note: 'MongoDB Atlas M0 is 512MB, free forever. Use this if your project uses @Document and MongoRepository.',
      },
    ],
  },

  {
    phase: '10',
    title: 'Deploy on Render — Docker Web Service',
    color: '#4ADE80',
    steps: [
      {
        label: 'Create Docker Web Service on Render',
        isText: true,
        text: [
          '1. render.com → New → Web Service',
          '2. Connect your GitHub repository',
          '3. Configure:',
          '   Name:    your-spring-api',
          '   Runtime: Docker  ← MUST select Docker, not Python/Node',
          '   Branch:  main',
          '',
          '   Build Command: leave EMPTY (Dockerfile handles the build)',
          '   Start Command: leave EMPTY (Dockerfile ENTRYPOINT handles startup)',
          '',
          '4. Click "Create Web Service"',
          '',
          'First build takes 5-10 minutes:',
          '→ Render clones your repo',
          '→ Runs docker build (downloads Maven + dependencies)',
          '→ Starts the container',
          '',
          'Your app goes live at: https://your-spring-api.onrender.com',
        ],
        note: 'Build Command and Start Command fields MUST be empty for Docker services. If filled, Render ignores them anyway — the Dockerfile controls everything.',
      },
    ],
  },

  {
    phase: '11',
    title: 'Add environment variables in Render',
    color: '#60A5FA',
    steps: [
      {
        label: 'Add all required variables',
        isText: true,
        text: [
          'Render → your service → Environment tab → Add:',
          '',
          'For PostgreSQL:',
          '   SPRING_DATASOURCE_URL      = jdbc:postgresql://host:5432/db?sslmode=require',
          '   SPRING_DATASOURCE_USERNAME = your_username',
          '   SPRING_DATASOURCE_PASSWORD = your_password',
          '',
          'For MongoDB:',
          '   SPRING_DATA_MONGODB_URI = mongodb+srv://user:pass@cluster.xxx.mongodb.net/mydb',
          '',
          'For JWT (if using auth):',
          '   JWT_SECRET = (50+ random chars)',
          '',
          'IMPORTANT: SPRING_DATASOURCE_URL format:',
          '   Must start with jdbc:postgresql://',
          '   NOT the plain postgresql:// format that Render/Neon provides',
          '   Add jdbc: at the start and remove user:pass from the URL',
          '   Add ?sslmode=require at the end',
          '',
          'Example conversion:',
          '   Render gives: postgresql://user:pass@host:5432/db',
          '   You set:      jdbc:postgresql://host:5432/db?sslmode=require',
          '   Plus:         SPRING_DATASOURCE_USERNAME = user',
          '   Plus:         SPRING_DATASOURCE_PASSWORD = pass',
        ],
        note: 'The JDBC URL conversion is the most common mistake for students deploying Spring Boot. Add "jdbc:" at start, remove credentials from URL, add "?sslmode=require" at end.',
      },
    ],
  },

  {
    phase: '12',
    title: 'Verify live Spring Boot API',
    color: '#34D399',
    steps: [
      {
        label: 'Test your live API after deployment',
        isText: true,
        text: [
          '✅ API root: https://your-spring-api.onrender.com',
          '✅ Health (if Spring Actuator): https://your-spring-api.onrender.com/actuator/health',
          '✅ Your endpoints: test with Postman',
          '✅ Render Logs: no OOM errors, no DB connection errors',
          '',
          'First request may take 30-60 seconds:',
          '   Docker container cold start + JVM warmup.',
          '   This is normal for Render free tier.',
          '',
          'If container keeps restarting:',
          '   Check Render Logs for "Killed" or "OutOfMemoryError"',
          '   Reduce JVM memory: -Xmx200m -Xms100m in Dockerfile ENTRYPOINT',
        ],
        note: 'Check the Render Logs tab for startup errors. Spring Boot logs the full startup sequence including which datasource URL it connected to.',
      },
    ],
  },

  {
    phase: '13',
    title: 'Create Django superuser — not applicable',
    color: '#F59E0B',
    steps: [
      {
        label: 'Spring Boot admin access',
        isText: true,
        text: [
          'Spring Boot does not have a built-in admin panel like Django.',
          '',
          'If using Spring Security, your admin user is created via:',
          '→ Application startup logic (CommandLineRunner or ApplicationRunner)',
          '→ Database seeder with @PostConstruct',
          '→ Manual POST request to your register/create-user endpoint',
          '',
          'If using Spring Boot + Thymeleaf (full stack):',
          '→ Create your first admin via the registration form',
          '→ Or seed it in your DataInitializer class',
          '',
          'Never hardcode admin passwords in Java code.',
          'Always use environment variables.',
        ],
        note: 'Spring Boot does not have a built-in admin — you design your own admin logic. Use environment variables for any admin credentials.',
      },
    ],
  },

  {
    phase: '14',
    title: 'Free tier — 512 MB memory limit',
    color: '#4ADE80',
    steps: [
      {
        label: 'Memory management on Render free tier',
        isText: true,
        text: [
          'Render free tier gives 512 MB total RAM for OS + JVM + your app.',
          'Spring Boot without tuning can use 400-600 MB just for the JVM.',
          'If you exceed 512 MB, Render kills the container — app stops.',
          '',
          'The fix is already in the Dockerfile:',
          '   ENTRYPOINT ["java", "-Xmx256m", "-Xms128m", "-jar", "app.jar"]',
          '',
          '-Xmx256m = maximum heap (most objects live here)',
          '-Xms128m = starting heap size',
          '',
          'Memory breakdown:',
          '   OS + system:          ~50 MB',
          '   JVM non-heap (classes): ~80 MB',
          '   JVM heap (-Xmx256m):  256 MB max',
          '   Total:                ~386 MB — safely under 512 MB',
          '',
          'If container still crashes with OOM:',
          '   Try: -Xmx200m -Xms100m',
          '   Remove unused Spring Boot starters from pom.xml',
          '   Check for large in-memory caches at startup',
          '',
          'Free tier behavior:',
          '   Sleeps after 15 min inactivity → 30-60s cold start + JVM warmup',
          '   Use cron-job.org with /actuator/health to stay awake (optional)',
        ],
        note: 'Exit code 137 in Render Logs = killed by OS due to out of memory. Always add -Xmx256m. This is the most common Spring Boot failure on Render free tier.',
      },
    ],
  },

  {
    phase: '15',
    title: 'Common errors and fixes',
    color: '#F97316',
    steps: [
      {
        label: 'Dockerfile not found',
        isText: true,
        text: [
          'Problem: Render cannot find the Dockerfile.',
          'Cause: Dockerfile is not at the project root.',
          'Fix: Move Dockerfile to the same level as pom.xml.',
        ],
        note: '',
      },
      {
        label: 'Out of memory — container restarts',
        isText: true,
        text: [
          'Problem: App starts then crashes. Logs show "Killed" or exit code 137.',
          'Cause: JVM heap exceeds 512 MB Render free tier limit.',
          'Fix: In Dockerfile ENTRYPOINT:',
          '   ["java", "-Xmx200m", "-Xms100m", "-jar", "app.jar"]',
          'Commit and push.',
        ],
        note: '',
      },
      {
        label: 'Database connection failed',
        isText: true,
        text: [
          'Problem: App starts but DB connection fails.',
          '',
          'Cause 1: SPRING_DATASOURCE_URL uses wrong format.',
          '   Must start with jdbc:postgresql:// not postgresql://',
          '',
          'Cause 2: Missing ?sslmode=require',
          '   Append it to the JDBC URL.',
          '',
          'Cause 3: Credentials in env vars wrong.',
          '   Re-copy from Render/Neon dashboard.',
        ],
        note: '',
      },
      {
        label: 'Application returns 404 for all endpoints',
        isText: true,
        text: [
          'Problem: Docker deploys but all API calls return 404.',
          '',
          'Cause 1: Incorrect base URL path.',
          '   Check if controllers use @RequestMapping("/api") prefix.',
          '',
          'Cause 2: server.port is wrong.',
          '   Must be: server.port=\${PORT:8080}',
          '   Render injects PORT — do NOT hardcode 8080.',
          '',
          'Cause 3: Component scan not finding controllers.',
          '   Main class must be in root package above all other packages.',
        ],
        note: '',
      },
    ],
  },
]


// ─── MongoDB Atlas ────────────────────────────────────────────────────────────
export const MONGODB_ATLAS_GUIDE = [
  {
    phase: '01',
    title: 'What is MongoDB Atlas and why use it?',
    color: '#00ED64',
    steps: [
      {
        label: 'MongoDB Atlas — free NoSQL cloud database, forever',
        isText: true,
        text: [
          'MongoDB Atlas is the official cloud database service for MongoDB.',
          'M0 free cluster: 512MB storage, free forever, no credit card needed.',
          '',
          'When to use MongoDB (NoSQL):',
          '→ Flexible, changing data structures (no fixed schema)',
          '→ JSON-like documents — great for user profiles, posts, configs',
          '→ Node.js/Express projects (MERN stack)',
          '→ Python projects with varying document shapes',
          '→ When you do not need complex SQL JOINs',
          '',
          'When NOT to use MongoDB:',
          '→ Highly relational data (users → orders → products with JOINs)',
          '→ Financial/accounting systems needing strict ACID transactions',
          '→ When your framework assumes SQL (Django ORM, Spring JPA)',
          '',
          'Free tier highlights:',
          '✅ 512MB storage — plenty for student projects',
          '✅ Free forever — no 30-day expiry like Render PostgreSQL',
          '✅ No credit card required',
          '✅ Hosted on AWS/Azure/GCP globally',
          '✅ Works with every backend framework',
        ],
        note: 'MongoDB Atlas M0 is the most popular free database for student projects. It never expires and requires zero maintenance.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Create your free MongoDB Atlas cluster',
    color: '#00ED64',
    steps: [
      {
        label: 'Step-by-step: create M0 free cluster',
        isText: true,
        text: [
          '1. Go to cloud.mongodb.com → click "Sign Up"',
          '   Use Google or email — no credit card needed',
          '',
          '2. After signup, click "Create" to make a cluster',
          '   → Select M0 Free tier',
          '   → Choose a Cloud Provider (AWS recommended)',
          '   → Choose the region nearest to you or your users',
          '   → Cluster name: leave default or name it "myproject-cluster"',
          '   → Click "Create Deployment"',
          '',
          '3. Create a database user:',
          '   → Username: e.g. myappuser',
          '   → Password: click "Autogenerate Secure Password"',
          '   → COPY and SAVE this password immediately — not shown again',
          '   → Role: "Atlas admin" (full access for student projects)',
          '   → Click "Create Database User"',
          '',
          '4. Set up Network Access:',
          '   → Click "Network Access" in the left menu',
          '   → Click "Add IP Address"',
          '   → Click "Allow Access from Anywhere"',
          '   → This adds 0.0.0.0/0 (required for Render/Vercel dynamic IPs)',
          '   → Click "Confirm"',
          '',
          '5. Get your connection string:',
          '   → Clusters → click "Connect" on your cluster',
          '   → Select "Drivers"',
          '   → Driver: Node.js (or Python, Java depending on your stack)',
          '   → Copy the connection string',
        ],
        note: 'Always click "Allow Access from Anywhere" (0.0.0.0/0) for deployment platforms like Render and Vercel. They use dynamic IPs that change on every restart — whitelisting a single IP fails.',
      },
      {
        label: 'Build your final MONGODB_URI',
        isText: true,
        text: [
          'Atlas gives you a template like:',
          '   mongodb+srv://myappuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority',
          '',
          'You need to:',
          '1. Replace <password> with your actual password',
          '2. Add your database name before the ?',
          '',
          'Final MONGODB_URI:',
          '   mongodb+srv://myappuser:yourpassword@cluster0.xxxxx.mongodb.net/mydbname?retryWrites=true&w=majority',
          '',
          'The database name (mydbname) is created automatically',
          'when your app first writes data to it.',
          '',
          'Store this string as MONGODB_URI in:',
          '→ .env file (local development)',
          '→ Render Environment Variables (production)',
          '→ Vercel Environment Variables (if using Next.js)',
          '',
          'NEVER put MONGODB_URI in your code files.',
          'NEVER commit it to GitHub.',
          'NEVER use NEXT_PUBLIC_ prefix — it exposes DB credentials in browser.',
        ],
        note: 'Special characters in the password (@ # % etc.) must be URL-encoded. To avoid this, regenerate the password until you get one with only letters and numbers.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Connect MongoDB to Node.js / Express',
    color: '#68A063',
    steps: [
      {
        label: 'Install Mongoose and connect',
        commands: [
          `npm install mongoose dotenv`,
        ],
        note: 'Mongoose is the most popular MongoDB ODM for Node.js. It provides schema definitions, validation, and query helpers on top of the raw MongoDB driver.',
      },
      {
        label: 'server.js — connect with Mongoose',
        isFile: true,
        fileName: 'server.js',
        commands: [
          `const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err.message));`,
        ],
        note: 'Call mongoose.connect() once at startup. Mongoose maintains a connection pool — you do not call it again per request.',
      },
      {
        label: 'Define a model and use it',
        isFile: true,
        fileName: 'models/User.js',
        commands: [
          `const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);`,
        ],
        note: 'Mongoose automatically creates the collection name as the lowercase plural of the model name — "User" becomes "users" collection in MongoDB.',
      },
      {
        label: 'Example route using the model',
        isFile: true,
        fileName: 'routes/users.js',
        commands: [
          `const express = require('express');
const User    = require('../models/User');
const router  = express.Router();

// GET all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST create user
router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

module.exports = router;`,
        ],
        note: 'Always use async/await with Mongoose operations. Wrap in try/catch for production code to handle errors gracefully.',
      },
      {
        label: '.env for local development',
        isFile: true,
        fileName: '.env',
        commands: [
          `MONGODB_URI=mongodb+srv://myappuser:yourpassword@cluster0.xxxxx.mongodb.net/mydbname?retryWrites=true&w=majority`,
        ],
        note: '',
      },
    ],
  },

  {
    phase: '04',
    title: 'Connect MongoDB to Python (Flask & FastAPI)',
    color: '#009688',
    steps: [
      {
        label: 'Install the right driver for your framework',
        isText: true,
        text: [
          'Flask (synchronous WSGI):',
          '   pip install pymongo python-decouple',
          '   Use pymongo — it is synchronous, matches Flask',
          '',
          'FastAPI (asynchronous ASGI):',
          '   pip install motor python-decouple',
          '   Use motor — it is async, matches FastAPI',
          '',
          'Rule:',
          '→ Flask + pymongo  ✅',
          '→ FastAPI + motor  ✅',
          '→ Flask + motor    ❌ (async mismatch)',
          '→ FastAPI + pymongo ❌ (blocks event loop)',
          '',
          'After installing, run:',
          '   pip freeze > requirements.txt',
        ],
        note: 'Using the wrong driver (motor with Flask or pymongo with FastAPI) causes either blocking issues or compatibility errors. Match the driver to your framework.',
      },
      {
        label: 'Flask — connect with PyMongo',
        isFile: true,
        fileName: 'app.py',
        commands: [
          `from flask import Flask, jsonify
from pymongo import MongoClient
from decouple import config

app = Flask(__name__)

mongodb_uri = config("MONGODB_URI", default=None)
db_name     = config("DB_NAME", default="mydb")

if mongodb_uri:
    client = MongoClient(mongodb_uri)
    db = client[db_name]
    users_collection = db["users"]
    print("MongoDB connected")

@app.route("/api/users")
def get_users():
    users = list(users_collection.find({}, {"_id": 0}))
    return jsonify(users)`,
        ],
        note: 'MongoClient creates a connection pool at module level — it is shared across all requests. Do not create a new MongoClient per request.',
      },
      {
        label: 'FastAPI — connect with Motor (async)',
        isFile: true,
        fileName: 'main.py',
        commands: [
          `from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from decouple import config

app = FastAPI()

@app.on_event("startup")
async def startup_db():
    mongodb_uri = config("MONGODB_URI", default=None)
    if mongodb_uri:
        app.mongodb_client = AsyncIOMotorClient(mongodb_uri)
        app.mongodb = app.mongodb_client[config("DB_NAME", default="mydb")]
        print("MongoDB connected")

@app.on_event("shutdown")
async def shutdown_db():
    if hasattr(app, "mongodb_client"):
        app.mongodb_client.close()

@app.get("/api/users")
async def get_users():
    users = await app.mongodb["users"].find({}, {"_id": 0}).to_list(100)
    return users`,
        ],
        note: 'Motor is fully async — all database operations use await. Open the connection on startup, close on shutdown. This is the correct pattern for FastAPI + MongoDB.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Connect MongoDB to Django',
    color: '#34D399',
    steps: [
      {
        label: 'Use Djongo or MongoEngine with Django',
        isText: true,
        text: [
          'Django is built for SQL databases (PostgreSQL, MySQL, SQLite).',
          'Using MongoDB with Django requires a third-party connector.',
          '',
          'Option A — Djongo (maps Django ORM to MongoDB):',
          '   pip install djongo',
          '   Works with Django migrations but has limitations',
          '',
          'Option B — MongoEngine (separate ODM for Django):',
          '   pip install mongoengine',
          '   More stable, but uses different syntax from Django ORM',
          '',
          'Option C — Use PyMongo directly (no ORM):',
          '   pip install pymongo',
          '   Full control, manual queries, best for simple use cases',
          '',
          'Honest recommendation for students:',
          '→ If your project needs MongoDB → use FastAPI or Flask, not Django',
          '→ Django with MongoDB is possible but adds complexity',
          '→ Django is designed for SQL — use PostgreSQL (Neon) with Django',
        ],
        note: 'For new Django projects: use PostgreSQL (Neon or Render) — it integrates perfectly with Django ORM. Reserve MongoDB for Node.js, FastAPI, or Flask projects.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Connect MongoDB to Spring Boot',
    color: '#6DB33F',
    steps: [
      {
        label: 'Spring Data MongoDB setup',
        isFile: true,
        fileName: 'src/main/resources/application.properties',
        commands: [
          `# MongoDB connection
spring.data.mongodb.uri=\${SPRING_DATA_MONGODB_URI:mongodb://localhost:27017/devdb}

# The URI above uses the SPRING_DATA_MONGODB_URI env var in production
# Locally falls back to local MongoDB (if installed) or embedded`,
        ],
        note: 'Set SPRING_DATA_MONGODB_URI in Render environment variables with your full Atlas connection string.',
      },
      {
        label: 'Add dependency and create a Document',
        isFile: true,
        fileName: 'pom.xml + User.java',
        commands: [
          `<!-- Add to pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>`,
          `// User.java — MongoDB document
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    // getters + setters
}`,
          `// UserRepository.java
import org.springframework.data.mongodb.repository.MongoRepository;
public interface UserRepository extends MongoRepository<User, String> {}`,
        ],
        note: 'Spring Data MongoDB works almost identically to Spring Data JPA — just replace @Entity with @Document and JpaRepository with MongoRepository.',
      },
    ],
  },

  {
    phase: '07',
    title: 'Security, tips, and common mistakes',
    color: '#EF4444',
    steps: [
      {
        label: 'Security rules for MongoDB Atlas',
        isText: true,
        text: [
          '✅ Use a strong autogenerated password (letters + numbers only)',
          '✅ Store MONGODB_URI only in .env and deployment env vars',
          '✅ Add .env to .gitignore before your first commit',
          '✅ Never log MONGODB_URI in console.log or print statements',
          '',
          '⚠️  0.0.0.0/0 network access:',
          '   Allows any IP to attempt a connection.',
          '   Your DB password is the real security — make it strong.',
          '   For student demos: acceptable.',
          '   For real production: restrict to known IPs when possible.',
          '',
          'Common mistakes:',
          '',
          'Forgetting the database name in URI:',
          '   Wrong: .../mongodb.net/?retryWrites=true',
          '   Right: .../mongodb.net/mydbname?retryWrites=true',
          '',
          'Special characters in password:',
          '   @ # % in password breaks the URI.',
          '   Fix: autogenerate a new password with only letters/numbers.',
          '',
          'Network Access blocking deployment server:',
          '   Fix: Atlas → Network Access → allow 0.0.0.0/0.',
          '',
          'Wrong driver (motor vs pymongo):',
          '   Flask = pymongo (sync)',
          '   FastAPI = motor (async)',
        ],
        note: 'MongoDB Atlas M0 free tier is 512MB and never expires. It is the most reliable free database choice for student projects across all frameworks.',
      },
    ],
  },
]

// ─── Neon PostgreSQL ──────────────────────────────────────────────────────────
export const NEON_POSTGRES_GUIDE = [
  {
    phase: '01',
    title: 'What is Neon and why use it?',
    color: '#A78BFA',
    steps: [
      {
        label: 'Neon — serverless PostgreSQL, 0.5GB/project, data preserved forever',
        isText: true,
        text: [
          'Neon is a serverless PostgreSQL database service.',
          'Free tier: 0.5GB/project, data preserved, no credit card.',
          '',
          'When to use PostgreSQL (SQL / relational):',
          '→ Structured data with clear relationships (users → orders → products)',
          '→ Complex queries, JOINs, aggregations',
          '→ Django ORM projects (Django is built for SQL)',
          '→ Spring Boot + JPA projects',
          '→ Prisma ORM with Node.js/Next.js',
          '→ Any project where data structure is well-defined',
          '',
          'Why Neon over Render PostgreSQL:',
          '✅ 0.5GB/project (vs 1GB Render)',
          '✅ Never expires (vs 30-day Render expiry)',
          '✅ Serverless — scales to zero, no idle cost',
          '✅ Branching feature — create DB branches like Git branches',
          '✅ Works perfectly with Vercel serverless functions',
          '',
          'Free tier:',
          '   0.5GB per project (5GB aggregate across 10 projects), data preserved forever',
          '   Free forever, no credit card',
        ],
        note: 'Neon is the best free PostgreSQL option for long-term student projects. Unlike Render PostgreSQL which expires after 30 days, Neon is permanent.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Create your free Neon project',
    color: '#A78BFA',
    steps: [
      {
        label: 'Step-by-step: create Neon project and get connection string',
        isText: true,
        text: [
          '1. Go to neon.tech → click "Sign Up"',
          '   Use GitHub or email — no credit card needed',
          '',
          '2. After signup, click "Create a project"',
          '   → Project name: e.g. "myproject"',
          '   → PostgreSQL version: 16 (latest)',
          '   → Region: choose nearest to your deployment (AWS us-east-1 for Render)',
          '   → Click "Create project"',
          '',
          '3. Neon creates your database automatically:',
          '   → Database name: neondb (default)',
          '   → Role: your username',
          '   → Connection string shown immediately',
          '',
          '4. Copy the connection string from "Connection Details":',
          '   → Select your database in the dropdown',
          '   → Choose connection type: "Connection string"',
          '   → It looks like:',
          '   postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require',
          '',
          '5. Store this as DATABASE_URL in:',
          '   → .env file (local)',
          '   → Render/Vercel environment variables (production)',
        ],
        note: '?sslmode=require at the end of the URL is important — always include it. Without SSL, Neon rejects the connection.',
      },
      {
        label: 'Understanding the Neon connection string',
        isText: true,
        text: [
          'postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require',
          '',
          'Breaking it down:',
          '   postgresql://    = protocol',
          '   user             = your Neon username',
          '   :password        = your Neon password',
          '   @ep-xxx...       = the Neon endpoint hostname',
          '   /neondb          = database name',
          '   ?sslmode=require = SSL required (always needed)',
          '',
          'For Spring Boot, the JDBC format is different:',
          '   jdbc:postgresql://ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require',
          '   (add "jdbc:" at the start, remove user:password from URL)',
          '   Set user/password as separate env vars:',
          '   SPRING_DATASOURCE_USERNAME = your_neon_user',
          '   SPRING_DATASOURCE_PASSWORD = your_neon_password',
          '',
          'Neon also provides a pooled connection URL for serverless:',
          '   postgresql://user:password@ep-xxx-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
          '   Use the pooled URL for Vercel serverless functions (Next.js API routes)',
          '   Use the direct URL for traditional servers (Render, etc.)',
        ],
        note: 'Use the pooled connection URL for Vercel/serverless deployments. It prevents connection exhaustion when many serverless functions connect simultaneously.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Connect Neon to Node.js / Express',
    color: '#68A063',
    steps: [
      {
        label: 'Option A: Using Prisma ORM (recommended)',
        commands: [
          `npm install prisma @prisma/client`,
          `npx prisma init`,
        ],
        note: 'Prisma init creates a prisma/schema.prisma file and adds DATABASE_URL to .env. Move DATABASE_URL to .env.local for Next.js projects.',
      },
      {
        label: 'Prisma schema and push to Neon',
        isFile: true,
        fileName: 'prisma/schema.prisma',
        commands: [
          `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
}`,
        ],
        note: 'After editing schema.prisma: run "npx prisma db push" to create tables in Neon. Run "npx prisma generate" to update the Prisma client. Run "npx prisma studio" to view your data.',
      },
      {
        label: 'Push schema and use Prisma in Express',
        commands: [
          `# Push schema to Neon (creates tables)
npx prisma db push`,
          `# Generate Prisma client
npx prisma generate`,
        ],
        note: '',
      },
      {
        label: 'Use Prisma in routes',
        isFile: true,
        fileName: 'routes/users.js',
        commands: [
          `const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.post('/', async (req, res) => {
  const user = await prisma.user.create({ data: req.body });
  res.status(201).json(user);
});

module.exports = router;`,
        ],
        note: 'Create one PrismaClient instance and reuse it. Creating a new PrismaClient per request causes too many database connections.',
      },
      {
        label: 'Option B: Using raw pg (no ORM)',
        commands: [
          `npm install pg dotenv`,
        ],
        note: '',
      },
      {
        label: 'Connect with raw pg',
        isFile: true,
        fileName: 'database.js',
        commands: [
          `const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;`,
        ],
        note: 'Use Pool (not Client) for Express apps — it manages multiple connections efficiently. ssl: { rejectUnauthorized: false } is needed for Neon SSL.',
      },
      {
        label: '.env for local development',
        isFile: true,
        fileName: '.env',
        commands: [
          `DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`,
        ],
        note: '',
      },
    ],
  },

  {
    phase: '04',
    title: 'Connect Neon to Python',
    color: '#009688',
    steps: [
      {
        label: 'Install PostgreSQL drivers for Python',
        commands: [
          `# For Flask / FastAPI basic:
pip install psycopg2-binary python-decouple`,
          `# For SQLAlchemy ORM (Flask or FastAPI):
pip install sqlalchemy psycopg2-binary python-decouple`,
          `# For async FastAPI with SQLAlchemy:
pip install sqlalchemy asyncpg python-decouple`,
          `pip freeze > requirements.txt`,
        ],
        note: 'psycopg2-binary is the standard PostgreSQL driver for Python. asyncpg is the async alternative for FastAPI.',
      },
      {
        label: 'Flask — connect with SQLAlchemy',
        isFile: true,
        fileName: 'database.py',
        commands: [
          `from flask_sqlalchemy import SQLAlchemy
from decouple import config

db = SQLAlchemy()

def init_db(app):
    app.config["SQLALCHEMY_DATABASE_URI"] = config("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)`,
        ],
        note: 'Flask-SQLAlchemy integrates SQLAlchemy with Flask. Call init_db(app) in your app factory or main app.py file.',
      },
      {
        label: 'Flask — define a model',
        isFile: true,
        fileName: 'models/user.py',
        commands: [
          `from database import db
from datetime import datetime

class User(db.Model):
    __tablename__ = "users"
    id         = db.Column(db.Integer, primary_key=True)
    name       = db.Column(db.String(100), nullable=False)
    email      = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "email": self.email}`,
        ],
        note: 'After defining models, run db.create_all() inside the app context to create tables in Neon. Or use Flask-Migrate for proper migration management.',
      },
      {
        label: 'FastAPI — async SQLAlchemy',
        isFile: true,
        fileName: 'database.py',
        commands: [
          `from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker
from decouple import config

DATABASE_URL = config("DATABASE_URL").replace(
    "postgresql://", "postgresql+asyncpg://"
)

engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session`,
        ],
        note: 'For async SQLAlchemy, the URL prefix must be postgresql+asyncpg:// instead of postgresql://. The .replace() handles the conversion from the standard DATABASE_URL format.',
      },
      {
        label: '.env for local development',
        isFile: true,
        fileName: '.env',
        commands: [
          `DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`,
        ],
        note: '',
      },
    ],
  },

  {
    phase: '05',
    title: 'Connect Neon to Django',
    color: '#34D399',
    steps: [
      {
        label: 'Django + Neon — perfect combination',
        commands: [
          `pip install psycopg2-binary dj-database-url python-decouple`,
          `pip freeze > requirements.txt`,
        ],
        note: 'Django is built for relational databases. PostgreSQL + Django is the industry-standard combination. Neon is the best free PostgreSQL option for Django.',
      },
      {
        label: 'Configure settings.py for Neon',
        isFile: true,
        fileName: 'settings.py',
        commands: [
          `import dj_database_url
from decouple import config

# Local: SQLite | Production: Neon PostgreSQL
DATABASES = {
    "default": dj_database_url.config(
        default=config("DATABASE_URL", default="sqlite:///db.sqlite3"),
        conn_max_age=600,
        ssl_require=not config("DEBUG", default=False, cast=bool),
    )
}`,
        ],
        note: 'dj_database_url automatically parses the DATABASE_URL connection string. Locally it falls back to SQLite. In production (Render), it uses Neon PostgreSQL.',
      },
      {
        label: 'Run migrations on Neon',
        commands: [
          `python manage.py makemigrations`,
          `python manage.py migrate`,
        ],
        note: 'Set DATABASE_URL in your .env before running migrate locally against Neon. Or let Render run migrations automatically in the Build Command.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Connect Neon to Spring Boot',
    color: '#6DB33F',
    steps: [
      {
        label: 'Spring Boot + Neon setup',
        isFile: true,
        fileName: 'src/main/resources/application.properties',
        commands: [
          `# Server
server.port=\${PORT:8080}

# Neon PostgreSQL — JDBC format (different from standard PostgreSQL URL)
spring.datasource.url=\${SPRING_DATASOURCE_URL:jdbc:h2:mem:devdb;DB_CLOSE_DELAY=-1}
spring.datasource.username=\${SPRING_DATASOURCE_USERNAME:sa}
spring.datasource.password=\${SPRING_DATASOURCE_PASSWORD:}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false`,
        ],
        note: 'In Render, set SPRING_DATASOURCE_URL to the JDBC format: jdbc:postgresql://ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require',
      },
      {
        label: 'Convert Neon URL to JDBC format',
        isText: true,
        text: [
          'Neon gives you:',
          '   postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require',
          '',
          'Spring Boot needs:',
          '   jdbc:postgresql://ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require',
          '',
          'Conversion steps:',
          '1. Add "jdbc:" at the beginning',
          '2. Remove "user:pass@" from the URL (use separate env vars)',
          '3. Keep "?sslmode=require" at the end',
          '',
          'Set in Render Environment Variables:',
          '   SPRING_DATASOURCE_URL = jdbc:postgresql://ep-xxx.../neondb?sslmode=require',
          '   SPRING_DATASOURCE_USERNAME = your_neon_username',
          '   SPRING_DATASOURCE_PASSWORD = your_neon_password',
        ],
        note: 'This JDBC URL conversion is the most common mistake for Spring Boot + Neon/PostgreSQL. Always add "jdbc:" prefix and remove credentials from the URL.',
      },
    ],
  },
]

// ─── Supabase ─────────────────────────────────────────────────────────────────
export const SUPABASE_GUIDE = [
  {
    phase: '01',
    title: 'What is Supabase and why use it?',
    color: '#3ECF8E',
    steps: [
      {
        label: 'Supabase — PostgreSQL + Auth + Storage, free forever',
        isText: true,
        text: [
          'Supabase is an open-source Firebase alternative built on PostgreSQL.',
          'Free tier: 500MB database, 5GB file storage, 50MB edge function size.',
          '',
          'What Supabase gives you beyond a database:',
          '✅ PostgreSQL database — standard SQL, works with any ORM',
          '✅ Auto-generated REST API — instant CRUD without writing backend code',
          '✅ Built-in authentication — email, Google, GitHub, etc.',
          '✅ File storage — upload images, PDFs, and other files',
          '✅ Realtime subscriptions — listen to database changes live',
          '✅ Edge functions — serverless JavaScript functions',
          '',
          'Best use cases for students:',
          '→ Next.js full-stack apps with auth',
          '→ React apps that need a backend without building one',
          '→ Rapid prototypes with auth + database together',
          '→ Projects needing file upload/storage',
          '',
          'Free tier:',
          '   2 projects, 500MB database, never expires, no credit card',
          '   Projects pause after 1 week of inactivity (free tier)',
          '   Restore from dashboard — takes ~1 minute',
        ],
        note: 'Supabase free projects pause after 1 week of inactivity. You can resume them from the Supabase dashboard — it takes about 1 minute. Paid projects never pause.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Create your free Supabase project',
    color: '#3ECF8E',
    steps: [
      {
        label: 'Step-by-step: create Supabase project',
        isText: true,
        text: [
          '1. supabase.com → click "Start your project"',
          '   Sign in with GitHub (recommended) — no credit card needed',
          '',
          '2. Click "New project"',
          '   → Organization: your personal org',
          '   → Project name: e.g. "myproject"',
          '   → Database password: click "Generate a password" → SAVE IT',
          '   → Region: choose nearest to your deployment',
          '   → Click "Create new project" — takes ~2 minutes to set up',
          '',
          '3. Get your connection details:',
          '   → Left sidebar → Settings → Database',
          '   → Scroll to "Connection string"',
          '   → Select "URI" tab',
          '   → Copy: postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres',
          '   → Replace [YOUR-PASSWORD] with the password you saved',
          '',
          '4. Also get the Supabase API credentials (for Supabase client):',
          '   → Left sidebar → Settings → API',
          '   → Copy: Project URL and anon/public key',
          '   → These are used with the Supabase JavaScript/Python client',
        ],
        note: 'Save your database password when creating the project — Supabase shows it only once. If you forget it, reset it in Settings → Database → Reset database password.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Connect Supabase to Next.js / React',
    color: '#60A5FA',
    steps: [
      {
        label: 'Install Supabase client and configure',
        commands: [
          `npm install @supabase/supabase-js`,
        ],
        note: '',
      },
      {
        label: 'Create Supabase client',
        isFile: true,
        fileName: 'lib/supabase.js',
        commands: [
          `import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);`,
        ],
        note: 'NEXT_PUBLIC_ prefix is safe here — the Supabase anon/public key is designed to be exposed in the browser. It has Row Level Security (RLS) to restrict data access.',
      },
      {
        label: '.env.local for Next.js',
        isFile: true,
        fileName: '.env.local',
        commands: [
          `# Public — safe to expose (Supabase anon key is designed to be public)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Private — never expose (for server-side only)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:[password]@db.xxxxx.supabase.co:5432/postgres`,
        ],
        note: 'NEXT_PUBLIC_ vars go to the browser. SUPABASE_SERVICE_ROLE_KEY is PRIVATE — never use NEXT_PUBLIC_ prefix for it. Service role key bypasses Row Level Security.',
      },
      {
        label: 'Query data with Supabase client',
        isFile: true,
        fileName: 'pages/api/users.js (Next.js API route)',
        commands: [
          `import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  }

  if (req.method === 'POST') {
    const { data, error } = await supabase
      .from('users')
      .insert(req.body)
      .select();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }
}`,
        ],
        note: 'The Supabase client auto-generates REST API calls. .from("users").select("*") is equivalent to SELECT * FROM users.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Connect Supabase to Node.js / Python',
    color: '#68A063',
    steps: [
      {
        label: 'Node.js — use as standard PostgreSQL',
        isText: true,
        text: [
          'Supabase is PostgreSQL — you can use it with any PostgreSQL client.',
          '',
          'With Prisma:',
          '   DATABASE_URL=postgresql://postgres:[pass]@db.xxxxx.supabase.co:5432/postgres',
          '   npx prisma db push',
          '',
          'With raw pg:',
          '   const pool = new Pool({ connectionString: process.env.DATABASE_URL });',
          '',
          'With Supabase JS client:',
          '   npm install @supabase/supabase-js',
          '   const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)',
          '',
          'The Supabase JS client also gives you auth:',
          '   const { data, error } = await supabase.auth.signUp({ email, password })',
          '   const { data, error } = await supabase.auth.signInWithPassword({ email, password })',
        ],
        note: 'For Node.js with Express: use the DATABASE_URL with Prisma or pg. For Next.js with auth: use the Supabase JS client which bundles auth + database in one.',
      },
      {
        label: 'Python — connect as standard PostgreSQL',
        isText: true,
        text: [
          'Supabase is standard PostgreSQL — any Python PostgreSQL library works.',
          '',
          'With Django:',
          '   DATABASE_URL=postgresql://postgres:[pass]@db.xxxxx.supabase.co:5432/postgres',
          '   Add to settings.py with dj-database-url',
          '',
          'With SQLAlchemy (Flask/FastAPI):',
          '   from decouple import config',
          '   DATABASE_URL = config("DATABASE_URL")',
          '   engine = create_engine(DATABASE_URL)',
          '',
          'With psycopg2:',
          '   import psycopg2',
          '   conn = psycopg2.connect(os.environ["DATABASE_URL"])',
          '',
          'Supabase also has an official Python client:',
          '   pip install supabase',
          '   from supabase import create_client',
          '   supabase = create_client(SUPABASE_URL, SUPABASE_KEY)',
        ],
        note: 'For Django and FastAPI: use DATABASE_URL with SQLAlchemy or dj-database-url. For quick CRUD without writing SQL: use the supabase Python client.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Supabase Auth — built-in authentication',
    color: '#EC4899',
    steps: [
      {
        label: 'Using Supabase Auth with Next.js',
        isText: true,
        text: [
          'Supabase provides authentication out of the box:',
          '→ Email + password',
          '→ Magic link (email)',
          '→ OAuth: Google, GitHub, Discord, etc.',
          '',
          'Install Supabase Auth helpers for Next.js:',
          '   npm install @supabase/ssr @supabase/supabase-js',
          '',
          'Sign up:',
          '   const { data, error } = await supabase.auth.signUp({',
          '     email: "user@example.com",',
          '     password: "securepassword123"',
          '   })',
          '',
          'Sign in:',
          '   const { data, error } = await supabase.auth.signInWithPassword({',
          '     email: "user@example.com",',
          '     password: "securepassword123"',
          '   })',
          '',
          'Get current user:',
          '   const { data: { user } } = await supabase.auth.getUser()',
          '',
          'Sign out:',
          '   await supabase.auth.signOut()',
          '',
          'All auth handles JWT tokens automatically.',
          'Row Level Security (RLS) uses auth to restrict data access.',
        ],
        note: 'Supabase Auth eliminates the need to build your own auth system. For student projects needing login/register, Supabase is the fastest way to add auth.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Free tier limitations',
    color: '#F97316',
    steps: [
      {
        label: 'Supabase free tier — honest details',
        isText: true,
        text: [
          'What is free:',
          '   2 projects, 500MB database, 5GB file storage',
          '   50,000 monthly active users for auth',
          '   500K edge function invocations',
          '   Free forever — no 30-day expiry',
          '',
          'Important limitation — project pausing:',
          '   Free projects pause after 1 week of inactivity',
          '   Paused project = database not accessible',
          '   Resume from Supabase dashboard → takes ~1 minute',
          '   The pause resets after every access',
          '',
          'For student demos:',
          '   Open your Supabase project in the browser before a demo',
          '   Or make an API call once a week to prevent pausing',
          '',
          'Upgrade to Pro ($25/month) to prevent pausing.',
          '',
          'When to use Supabase vs Neon:',
          '→ Neon: pure PostgreSQL, never pauses, great for backend apps',
          '→ Supabase: PostgreSQL + auth + storage, may pause, great for Next.js full-stack',
        ],
        note: 'The 1-week inactivity pause is the main limitation of Supabase free tier. For actively developed projects, this is rarely an issue since dev activity keeps the project alive.',
      },
    ],
  },
]

// ─── Render PostgreSQL ────────────────────────────────────────────────────────
export const RENDER_POSTGRES_GUIDE = [
  {
    phase: '01',
    title: 'What is Render PostgreSQL and when to use it?',
    color: '#4ADE80',
    steps: [
      {
        label: 'Render PostgreSQL — easiest setup when using Render backend',
        isText: true,
        text: [
          'Render offers a free PostgreSQL database service.',
          '',
          'Key facts:',
          '✅ Free tier: 1GB storage',
          '✅ Easiest setup when your backend is also on Render',
          '✅ Internal URL: faster connections within Render network',
          '✅ Auto-linked to Render web services',
          '',
          '⚠️  Important limitation — 30-day expiry:',
          '   Render free PostgreSQL expires after 30 DAYS from creation',
          '   You get a 14-day grace period to upgrade before permanent deletion',
          '   After the grace period, the database and ALL data are permanently deleted',
          '   Render sends email warnings before expiry',
          '',
          'When to use Render PostgreSQL:',
          '→ Short-term demos and college project submissions',
          '→ When you want the simplest possible setup (auto-link feature)',
          '→ When data beyond 30 days does not matter',
          '',
          'When NOT to use Render PostgreSQL:',
          '→ Projects you want to keep alive long-term',
          '→ When you cannot afford to lose data',
          '',
          'Better alternatives for persistent data:',
          '→ Neon: 0.5GB/project, data preserved ← use this for long-term projects',
          '→ Supabase: 500MB free, never expires (may pause)',
        ],
        note: '⚠️  The 30-day expiry is the most important thing to know about Render PostgreSQL. Set a calendar reminder on day 20 to back up your data or migrate to Neon before the grace period ends.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Create Render PostgreSQL database',
    color: '#4ADE80',
    steps: [
      {
        label: 'Step-by-step: create free Render PostgreSQL',
        isText: true,
        text: [
          '1. render.com → sign in with GitHub',
          '',
          '2. Click "New" → "PostgreSQL"',
          '   → Name: e.g. "myproject-db"',
          '   → Database: e.g. "mydb" (leave blank for auto-name)',
          '   → User: e.g. "mydbuser" (leave blank for auto-name)',
          '   → Region: same region as your web service',
          '   → PostgreSQL Version: 16 (latest)',
          '   → Plan: Free',
          '   → Click "Create Database"',
          '',
          '3. After creation, you see connection details:',
          '   → Internal Database URL — use this if app is ALSO on Render',
          '   → External Database URL — use this for local development',
          '   → Hostname, Port, Database, Username, Password shown separately',
          '',
          '4. Copy the relevant URL:',
          '   → For Render backend (same account):',
          '      Use Internal URL (stays within Render network, faster + free)',
          '   → For local development or Vercel/other hosts:',
          '      Use External URL',
        ],
        note: 'Always use the Internal Database URL when your web service and database are both on Render. It is faster (private network) and does not count against your bandwidth.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Auto-link to Render Web Service',
    color: '#4ADE80',
    steps: [
      {
        label: 'The easiest connection — auto-link in Render dashboard',
        isText: true,
        text: [
          'Render has a feature that auto-fills DATABASE_URL for you:',
          '',
          '1. In your Render Web Service → click "Environment" tab',
          '2. Click "Add from Database"',
          '3. Select your PostgreSQL database from the dropdown',
          '4. Select "DATABASE_URL" from the connection types',
          '5. Render automatically sets DATABASE_URL to the Internal URL',
          '',
          'This is why Render PostgreSQL is the easiest option when',
          'your backend is also on Render — no copy-pasting credentials.',
          '',
          'After clicking Save:',
          '→ DATABASE_URL is set in your web service environment',
          '→ Render triggers a redeployment',
          '→ Your app connects to PostgreSQL automatically',
        ],
        note: 'The auto-link feature is unique to Render PostgreSQL. Neon and Supabase require manual copy-paste of connection strings. For quick setup on Render: use auto-link.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Connect Render PostgreSQL to your backend',
    color: '#60A5FA',
    steps: [
      {
        label: 'Node.js — with Prisma',
        isText: true,
        text: [
          'DATABASE_URL is already set via auto-link (see Phase 03).',
          '',
          'prisma/schema.prisma:',
          '   datasource db {',
          '     provider = "postgresql"',
          '     url      = env("DATABASE_URL")',
          '   }',
          '',
          'Run: npx prisma db push',
          'Prisma creates tables in the Render database.',
        ],
        note: 'The DATABASE_URL from Render PostgreSQL Internal URL works directly with Prisma and pg without any modification.',
      },
      {
        label: 'Python/Django — with dj-database-url',
        isText: true,
        text: [
          'DATABASE_URL is set automatically by Render auto-link.',
          '',
          'In Django settings.py:',
          '   import dj_database_url',
          '   from decouple import config',
          '   DATABASES = {',
          '       "default": dj_database_url.config(',
          '           default=config("DATABASE_URL", default="sqlite:///db.sqlite3"),',
          '           conn_max_age=600,',
          '           ssl_require=True',
          '       )',
          '   }',
          '',
          'In Render Build Command:',
          '   pip install -r requirements.txt && python manage.py migrate',
          '',
          'Django migrations run automatically on every deploy.',
        ],
        note: 'ssl_require=True is important for Render PostgreSQL connections. Without SSL, the connection may be refused.',
      },
      {
        label: 'Spring Boot — JDBC URL conversion',
        isText: true,
        text: [
          'Render provides:',
          '   postgresql://user:pass@dpg-xxx.render.com:5432/mydb',
          '',
          'Spring Boot needs JDBC format:',
          '   jdbc:postgresql://dpg-xxx.render.com:5432/mydb',
          '',
          'In Render Environment Variables:',
          '   SPRING_DATASOURCE_URL = jdbc:postgresql://dpg-xxx.render.com:5432/mydb',
          '   SPRING_DATASOURCE_USERNAME = your_username',
          '   SPRING_DATASOURCE_PASSWORD = your_password',
          '',
          'Or use the auto-link + convert in application.properties:',
          '   spring.datasource.url=jdbc:postgresql://...',
        ],
        note: 'Render PostgreSQL does not need ?sslmode=require (unlike Neon) for internal connections. For external connections, you may want to add it.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Back up data before 30-day expiry',
    color: '#EF4444',
    steps: [
      {
        label: 'Export your data before the database expires',
        isText: true,
        text: [
          'Render sends warning emails before the 30-day expiry.',
          'If you do not act, the database and ALL data are permanently deleted.',
          '',
          'Option 1: Export with pg_dump (command line):',
          '   pg_dump -h HOST -U USER -d DBNAME -f backup.sql',
          '   (Copy HOST, USER, DBNAME from Render PostgreSQL dashboard)',
          '',
          'Option 2: Export from Render dashboard:',
          '   Render → PostgreSQL → your database → Settings → Export data',
          '',
          'Option 3: Migrate to Neon (free, never expires):',
          '   1. Create a Neon project',
          '   2. Export from Render: pg_dump ... > backup.sql',
          '   3. Import to Neon: psql NEON_DATABASE_URL < backup.sql',
          '   4. Update DATABASE_URL in your Render web service to Neon URL',
          '   5. Redeploy',
          '',
          'Set a calendar reminder for day 80 (10 days before expiry).',
          '',
          'Best practice: for any project beyond a demo,',
          'start with Neon (free forever) instead of Render PostgreSQL.',
        ],
        note: 'The 30-day expiry applies only to the FREE tier Render PostgreSQL. Paid Render PostgreSQL plans do not expire.',
      },
    ],
  },
]
