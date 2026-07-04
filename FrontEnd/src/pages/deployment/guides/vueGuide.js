export const VUE_GUIDE = [
  {
    phase: '01',
    title: 'What you will build — a live Vue app anyone can open',
    color: '#42B883',
    steps: [
      {
        label: 'Where Vue apps get deployed — and why it is free',
        isText: true,
        text: [
          'A Vue app (built with Vite) compiles into plain HTML, CSS, and JavaScript.',
          'That means it is a "static" site — no server needed to run it.',
          'Static sites are the cheapest thing on the internet to host, so the best',
          'platforms host them completely free, forever.',
          '',
          'Three genuinely free homes for a Vue app (pick ONE):',
          '→ Vercel          — easiest, auto-deploys from GitHub',
          '→ Netlify         — just as easy, drag-and-drop option too',
          '→ Cloudflare Pages — unlimited bandwidth, global edge',
          '',
          'All three give you the same core things, free and with no credit card:',
          '✅ Free HTTPS (the padlock) added automatically',
          '✅ Global CDN — fast for visitors anywhere',
          '✅ Auto-redeploy — every git push rebuilds the site in ~1 minute',
          '✅ A free *.vercel.app / *.netlify.app / *.pages.dev URL',
          '✅ Free custom domain support if you own one',
          '',
          'This guide uses Vercel as the main path (Phase 08) and shows',
          'Netlify as the alternative (Phase 09). The steps before that are',
          'the same no matter which host you choose.',
        ],
        note: 'A Vue app is a static site once built — that is why it hosts for free. You are not renting a server; you are just serving files.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Before you deploy — make it work locally first',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Run the app locally and confirm every page works',
        isText: true,
        text: [
          '1. Open a terminal in your project folder (where package.json lives)',
          '2. Run: npm install',
          '   (downloads every package your project needs — run once)',
          '3. Run: npm run dev',
          '   (starts the dev server, usually at http://localhost:5173)',
          '4. Open that URL and click through EVERY page and feature',
          '',
          'Golden rule: if something is broken locally, it will be broken online too.',
          'Fix all local bugs before you even think about deploying.',
          '',
          'Confirm your package.json has these scripts (Vite default):',
          '   "dev":     "vite"',
          '   "build":   "vite build"',
          '   "preview": "vite preview"',
        ],
        note: 'npm install only needs to run once (or when you add a new package). npm run dev is what you use every day while building.',
      },
      {
        label: 'Run the REAL production build and preview it',
        commands: [
          `npm run build`,
          `npm run preview`,
        ],
        note: 'npm run build is EXACTLY what the host runs on their servers — it creates the dist/ folder. If it fails here, it fails online. npm run preview serves that dist/ folder locally so you see the true production version before pushing.',
      },
      {
        label: 'Clean-up checklist before pushing',
        isText: true,
        text: [
          '✅ Remove test components and unused files',
          '✅ Remove or comment out console.log() calls (visible to anyone in DevTools)',
          '✅ Check every image and icon actually loads',
          '✅ Test the mobile layout (Chrome DevTools → Toggle device toolbar)',
          '✅ Click through every route / view',
          '✅ Set the page title in index.html (<title> tag)',
          '',
          'Where the build goes:',
          '→ Vite (the modern Vue default): output folder is dist/',
          '→ Old Vue CLI projects: output folder is also dist/',
          'Both Vercel and Netlify auto-detect this, but it is good to know.',
        ],
        note: 'console.log() lines stay in your shipped code and are readable by anyone who opens browser DevTools. Clear them out before deploying a public project.',
      },
    ],
  },

  {
    phase: '03',
    title: '.gitignore — never push these folders',
    color: '#F59E0B',
    steps: [
      {
        label: 'Create .gitignore in your project root',
        isFile: true,
        fileName: '.gitignore',
        commands: [
          `# Dependencies — huge, auto-installed by "npm install", never commit
node_modules/

# Build output — the host builds this itself, no need to push it
dist/

# Environment files — NEVER push these to GitHub
.env
.env.local
.env.*.local

# Editor / OS junk
.DS_Store
Thumbs.db
*.log`,
        ],
        note: 'Create this file in the SAME folder as package.json, and do it BEFORE your first "git add .". If node_modules or .env sneak into a commit first, they are harder to remove later.',
      },
      {
        label: 'Why node_modules and .env must never reach GitHub',
        isText: true,
        text: [
          'node_modules/ — why to ignore:',
          '→ Can be 50,000+ files and hundreds of megabytes',
          '→ Anyone who clones your repo gets them back with "npm install"',
          '→ It is never your code — it belongs to package authors',
          '',
          '.env — why to ignore:',
          '→ It can hold secret keys and passwords',
          '→ On a PUBLIC repo, the whole internet can read it',
          '→ Bots scan new GitHub commits for leaked keys within minutes',
          '',
          'Verify it is working: run "git status" and make sure you do NOT',
          'see node_modules/ or .env in the list before you push.',
        ],
        note: 'Make "git status" a habit before every "git push". One glance stops most accidental secret leaks.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Push your code to GitHub',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Create an empty GitHub repo first',
        isText: true,
        text: [
          '1. Go to github.com → click "+" (top right) → "New repository"',
          '2. Name it (example: my-vue-app)',
          '3. Set it to Public (simplest for free hosting)',
          '4. Do NOT tick "Add a README", ".gitignore", or a license',
          '   if your local project already has those files — it causes a conflict',
          '5. Click "Create repository"',
          '6. GitHub then shows you the exact push commands (or use the ones below)',
        ],
        note: 'Create the empty repo on GitHub first, THEN run the git commands on your computer. Do not initialize it with a README if your project already has one.',
      },
      {
        label: 'Initialize git and push',
        commands: [
          `# Start git tracking in your project folder
git init`,
          `# Stage all files — .gitignore keeps node_modules and .env out
git add .`,
          `# Save your first commit
git commit -m "initial commit"`,
          `# Name the main branch "main"
git branch -M main`,
          `# Connect to your GitHub repo (use YOUR username and repo name)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git`,
          `# Upload your code
git push -u origin main`,
        ],
        note: 'Replace YOUR_USERNAME and YOUR_REPO_NAME with your real details — copy the exact URL shown on your new GitHub repo page.',
      },
      {
        label: 'Common Git errors and quick fixes',
        isText: true,
        text: [
          'Error: "remote origin already exists"',
          'Fix: git remote remove origin — then add it again',
          '',
          'Error: Authentication failed / password rejected',
          'Fix: GitHub no longer accepts your account password. Create a',
          '   Personal Access Token: GitHub → Settings → Developer Settings →',
          '   Personal Access Tokens → generate one with "repo" scope, and use',
          '   that token as the password when git asks.',
          '',
          'Error: "src refspec main does not match any"',
          'Fix: you have not committed yet — run git add . and git commit first.',
          '',
          'Problem: node_modules shows up in git status',
          'Fix: git rm -r --cached node_modules — then commit again',
        ],
        note: 'Review the file list from "git status" before every push. If you spot .env, stop and remove it from tracking before pushing.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Fix the "404 on refresh" problem (Vue Router)',
    color: '#A78BFA',
    steps: [
      {
        label: 'Why /about shows 404 when you refresh it',
        isText: true,
        text: [
          'If your app uses Vue Router in "history mode" (clean URLs like /about),',
          'those URLs work when you click links inside the app — but if you refresh',
          '/about or paste it directly, you get a 404 error.',
          '',
          'Why: Vue Router handles routing inside the browser. When you refresh,',
          'the browser asks the HOST for a file called /about — which does not',
          'exist as a file. The host returns 404.',
          '',
          'Fix: tell the host "for ANY URL, serve index.html and let Vue Router',
          'figure out the page." This is called an SPA fallback rewrite.',
          '',
          'Create the right config file for your host BEFORE deploying so links',
          'work from the very first deployment. Pick the file for your host below.',
        ],
        note: 'This only matters if you use Vue Router with history mode (the default modern setup). If you use hash mode (URLs with #), you can skip it — but the fix is harmless to add anyway.',
      },
      {
        label: 'For Vercel — create vercel.json in the project root',
        isFile: true,
        fileName: 'vercel.json',
        commands: [
          `{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`,
        ],
        note: 'Put this file next to package.json (the project root), not inside src/. Commit and push it with your code.',
      },
      {
        label: 'For Netlify OR Cloudflare Pages — create public/_redirects',
        isFile: true,
        fileName: 'public/_redirects',
        commands: [
          `/*    /index.html   200`,
        ],
        note: 'Create a file named _redirects (no extension) inside your public/ folder. Vite copies everything in public/ straight into dist/, so the host picks it up automatically. This same file works for both Netlify and Cloudflare Pages.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Environment variables — and the security rule',
    color: '#EC4899',
    steps: [
      {
        label: 'How Vite env variables work in Vue',
        isFile: true,
        fileName: '.env',
        commands: [
          `# In a Vite + Vue app, browser env variables MUST start with VITE_
# Without the VITE_ prefix, the value is undefined in your app

VITE_API_URL=https://your-backend.onrender.com
VITE_APP_NAME=My Vue App`,
        ],
        note: 'Read them in your Vue code with: import.meta.env.VITE_API_URL — the VITE_ prefix is required, not optional.',
      },
      {
        label: '⚠️ Frontend env variables are NOT secret — ever',
        isText: true,
        text: [
          'Everything in a Vue/Vite .env file gets baked into the JavaScript',
          'that ships to the browser. Anyone can open DevTools and read it.',
          'There is no way to "hide" a value in a frontend app.',
          '',
          '✅ SAFE to put in a frontend .env:',
          '   VITE_API_URL   — your public backend URL',
          '   VITE_APP_NAME  — your app title',
          '   Firebase web config keys (designed to be public)',
          '   Maps/Analytics keys (restrict them to your domain in their dashboard)',
          '',
          '🚫 NEVER put in a frontend .env:',
          '   Database connection strings (MongoDB URI, Postgres URL)',
          '   JWT secrets or signing keys',
          '   Payment gateway SECRET keys (Razorpay/Stripe secret)',
          '   Any key labelled "secret" or "private"',
          '',
          'If a feature needs a private key, that key lives on your BACKEND.',
          'Your Vue app calls your backend, and the backend uses the secret.',
        ],
        note: 'There is no such thing as a secret variable in a frontend app. If it ships to the browser, it is public. Keep true secrets on a backend server.',
      },
      {
        label: 'Add the same variables in your host dashboard',
        isText: true,
        text: [
          'Your local .env is NOT pushed to GitHub (good). So the host does not',
          'have it — you must add the variables in the host dashboard too.',
          '',
          'Vercel:  project → Settings → Environment Variables → Add → Redeploy',
          'Netlify: Site settings → Environment variables → Add → Redeploy',
          'Cloudflare Pages: project → Settings → Variables → Add → Redeploy',
          '',
          'Two rules that trip everyone up:',
          '→ The name MUST start with VITE_ (or it is undefined)',
          '→ After adding/changing a variable you MUST redeploy — the live',
          '  build does not pick up new variables on its own.',
        ],
        note: 'Env var undefined after deploy? 90% of the time it is a missing VITE_ prefix, or you forgot to redeploy after adding it.',
      },
    ],
  },

  {
    phase: '07',
    title: 'Base path — only if you deploy to a sub-folder',
    color: '#38BDF8',
    steps: [
      {
        label: 'When your app lives at example.com/my-app/ instead of the root',
        isText: true,
        text: [
          'On Vercel, Netlify, and Cloudflare Pages your app sits at the ROOT of',
          'its domain (your-app.vercel.app/). In that case you do NOT need this —',
          'skip to Phase 08.',
          '',
          'You ONLY need this if you deploy to a sub-path, such as:',
          '→ GitHub Pages at username.github.io/my-app/',
          '→ any host serving your app from a folder, not the domain root',
          '',
          'Symptom of a missing base path: the page loads blank and the console',
          'shows 404s for your JS/CSS files (it is looking for them at the wrong',
          'path).',
        ],
        note: 'Deploying to Vercel/Netlify/Cloudflare Pages? Your app is at the root, so ignore this phase entirely.',
      },
      {
        label: 'Set the base in vite.config.js',
        isFile: true,
        fileName: 'vite.config.js',
        commands: [
          `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // Only needed for sub-folder hosting, e.g. GitHub Pages.
  // Must match the folder name, with slashes on both sides.
  base: '/my-app/',
  plugins: [vue()],
})`,
        ],
        note: 'If you use Vue Router history mode with a base path, also pass the same base to createWebHistory(import.meta.env.BASE_URL) so routing matches the sub-folder.',
      },
    ],
  },

  {
    phase: '08',
    title: 'Deploy on Vercel (main path)',
    color: '#60A5FA',
    steps: [
      {
        label: 'Import your repo and go live in 3 clicks',
        isText: true,
        text: [
          '1. Go to vercel.com → "Sign Up" → "Continue with GitHub"',
          '   (log in with GitHub so Vercel can see your repositories)',
          '',
          '2. Click "Add New… → Project" → find your repo → "Import"',
          '',
          '3. Vercel auto-detects Vite:',
          '   Framework Preset:  Vite   (auto-selected)',
          '   Build Command:     npm run build   (auto-filled)',
          '   Output Directory:  dist   (auto-filled)',
          '',
          '4. (Optional) open "Environment Variables" and add your VITE_ vars now',
          '',
          '5. Click "Deploy" — wait about a minute',
          '',
          '6. Your app is live at your-project.vercel.app — the link is on screen',
          '',
          'From now on, every push to the main branch auto-redeploys the site,',
          'and every other branch gets its own preview URL you can share.',
        ],
        note: 'If the site deploys but shows blank, check that Output Directory is "dist" (Settings → Build & Output Settings) and that you added vercel.json from Phase 05 for Vue Router.',
      },
    ],
  },

  {
    phase: '09',
    title: 'Deploy on Netlify (alternative path)',
    color: '#00C7B7',
    steps: [
      {
        label: 'Option A — connect GitHub (auto-deploys on every push)',
        isText: true,
        text: [
          '1. Go to netlify.com → "Sign up" → continue with GitHub',
          '2. "Add new site" → "Import an existing project" → pick your repo',
          '3. Build settings (Netlify auto-fills these for Vite):',
          '   Build command:     npm run build',
          '   Publish directory: dist',
          '4. Click "Deploy site" — live in ~1 minute at a random-name.netlify.app',
          '5. Rename it: Site configuration → Change site name',
        ],
        note: 'The _redirects file from Phase 05 (in public/) makes Vue Router work on Netlify. Without it, refreshing a route shows 404.',
      },
      {
        label: 'Option B — drag & drop (fastest, no GitHub needed)',
        isText: true,
        text: [
          '1. Run npm run build locally — this creates the dist/ folder',
          '2. Go to app.netlify.com → "Sites"',
          '3. Drag your dist/ folder onto the drop zone',
          '4. Netlify uploads it and gives you a live URL instantly',
          '',
          'Trade-off: drag & drop does NOT auto-update. Every time you change',
          'code you must rebuild and drag the new dist/ again. For a project you',
          'keep improving, Option A (GitHub) is better.',
        ],
        note: 'Drag & drop is great for a one-off demo you need live in 60 seconds. For an evolving project, connect GitHub so pushes deploy automatically.',
      },
      {
        label: '(Optional) netlify.toml to lock in build settings',
        isFile: true,
        fileName: 'netlify.toml',
        commands: [
          `[build]
  command = "npm run build"
  publish = "dist"

# SPA fallback so Vue Router works on refresh
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`,
        ],
        note: 'Adding netlify.toml is optional if you already have public/_redirects, but it also pins your build command and publish folder so the settings live in your repo.',
      },
    ],
  },

  {
    phase: '10',
    title: 'Common deploy errors and fixes',
    color: '#F97316',
    steps: [
      {
        label: 'Build fails on the host',
        isText: true,
        text: [
          'The host runs npm run build exactly as your machine does.',
          '',
          'Fix:',
          '1. Run npm run build locally',
          '2. Read the exact error and the file/line it names',
          '3. Fix it, confirm npm run build passes with no errors',
          '4. Push — the host redeploys automatically',
          '',
          'Common causes:',
          '→ "Cannot find module X" — run npm install X, then commit package.json',
          '→ An import path with the wrong file name (see case-sensitivity below)',
          '→ A syntax error in a .vue or .js file (the error names the line)',
        ],
        note: 'The golden rule: if npm run build fails locally, it fails on the host. Always build locally first — it saves you slow deploy-fail loops.',
      },
      {
        label: 'Blank white screen after deploy',
        isText: true,
        text: [
          'Cause 1 — Wrong output directory:',
          '   It must be "dist" for Vite (Settings → Build & Output).',
          '',
          'Cause 2 — Missing SPA rewrite / wrong base path:',
          '   Add vercel.json or public/_redirects (Phase 05). If deploying to a',
          '   sub-folder, set base in vite.config.js (Phase 07).',
          '',
          'Cause 3 — A JavaScript crash on load:',
          '   Open the live site, press F12, read the red error in the Console.',
        ],
        note: 'Press F12 on the live URL and check the Console tab first. The red error almost always names the exact file and problem.',
      },
      {
        label: 'Images work locally but break online',
        isText: true,
        text: [
          'The #1 cause is file-name capitalization.',
          'Windows and Mac ignore case; the hosting servers run Linux, which does NOT.',
          '',
          '   Wrong: import logo from "./Assets/Logo.PNG"',
          '   Right:  import logo from "./assets/logo.png"',
          '',
          'The path must match the real file name EXACTLY, letter for letter.',
          '',
          'Also: files you put in public/ are referenced from the root:',
          '   <img src="/logo.png">   ✅   (not "./public/logo.png")',
        ],
        note: 'Case-sensitivity is the most common "works on my machine but broken online" bug for Windows users. Match filenames exactly.',
      },
    ],
  },

  {
    phase: '11',
    title: 'Free tier — the honest picture for students',
    color: '#34D399',
    steps: [
      {
        label: 'What free actually gives you (and what the limits mean)',
        isText: true,
        text: [
          'For a Vue portfolio, learning project, or college demo, the free tier',
          'of Vercel, Netlify, or Cloudflare Pages is genuinely more than enough.',
          '',
          'Vercel Hobby (free):',
          '   ~100 GB bandwidth/month — a portfolio with 1,000 visitors uses a',
          '   few GB. You would need tens of thousands of heavy visits to worry.',
          '',
          'Netlify (free):',
          '   ~100 GB bandwidth/month + 300 build minutes/month. A Vue build',
          '   takes ~1 minute, so that is hundreds of deploys.',
          '',
          'Cloudflare Pages (free):',
          '   Unlimited bandwidth, 500 builds/month. The most generous for',
          '   traffic if your project ever goes semi-viral.',
          '',
          'Honest catch to know:',
          '→ These free tiers are for personal / non-commercial projects.',
          '  Portfolios, demos, and college work are exactly the intended use.',
          '→ You would only need a paid plan for a real business/commercial app',
          '  or team features — not for showcasing your work to recruiters.',
        ],
        note: 'Do not let free-tier limits stop you. For a student portfolio you will almost certainly never reach them — just deploy and share the link.',
      },
      {
        label: 'You are live — now use it',
        isText: true,
        text: [
          'Your Vue app now has a real URL. Put it to work:',
          '→ Add the live link to your resume and LinkedIn',
          '→ Pin the GitHub repo and add the live link in its "About" section',
          '→ Put the link in the README so recruiters can click straight through',
          '',
          'A live link is proof you can ship — not just write code that runs on',
          'your own laptop. That is what turns a project into an interview.',
        ],
        note: 'Every push to your main branch now auto-updates the live site in about a minute. Keep improving it — the URL stays the same.',
      },
    ],
  },
]
