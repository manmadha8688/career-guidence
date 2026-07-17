export const ANGULAR_GUIDE = [
  {
    phase: '01',
    title: 'What you will build — a live Angular app anyone can open',
    color: '#DD0031',
    steps: [
      {
        label: 'Where Angular apps get deployed — and why it is free',
        isText: true,
        text: [
          'A standard Angular app (built with the Angular CLI) compiles into plain',
          'HTML, CSS, and JavaScript. That makes it a "static" single-page app —',
          'no Node server is needed to run it (unless you specifically use Angular',
          'SSR / server-side rendering, which this guide notes but does not require).',
          '',
          'Static sites are the cheapest thing on the internet to host, so the best',
          'platforms host them completely free, forever.',
          '',
          'Four genuinely free homes for an Angular app (pick ONE):',
          '→ Vercel           — easiest, auto-deploys from GitHub',
          '→ Netlify          — just as easy, drag-and-drop option too',
          '→ Cloudflare Pages — unlimited bandwidth, global edge',
          '→ Firebase Hosting — Google CDN, free SSL',
          '',
          'All four give you the same core things, free and with no credit card:',
          '✅ Free HTTPS (the padlock) added automatically',
          '✅ Global CDN — fast for visitors anywhere',
          '✅ Auto-redeploy — every git push rebuilds the site in ~1–2 minutes',
          '✅ A free *.vercel.app / *.netlify.app / *.pages.dev / *.web.app URL',
          '✅ Free custom domain support if you own one',
          '',
          'This guide uses Vercel as the main path (Phase 05) and shows Netlify,',
          'Cloudflare Pages, and Firebase as alternatives (Phase 06). The steps',
          'before that are the same no matter which host you choose.',
        ],
        note: 'A normal Angular app is a static site once built — that is why it hosts for free. You are not renting a server; you are just serving files. (Angular SSR is the exception and needs a Node host like Render — most student/portfolio apps do NOT use it.)',
      },
    ],
  },

  {
    phase: '02',
    title: 'Build locally — and the dist/…/browser gotcha',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Run the app locally and confirm every page works',
        isText: true,
        text: [
          '1. Open a terminal in your project folder (where angular.json lives)',
          '2. Run: npm install   (downloads packages — run once)',
          '3. Run: ng serve   (or npm start) → opens http://localhost:4200',
          '4. Click through EVERY page and feature',
          '',
          'Golden rule: if something is broken locally, it will be broken online',
          'too. Fix all local bugs before you even think about deploying.',
          '',
          'No Angular CLI installed globally? Use npx:',
          '   npx ng serve   /   npx ng build',
        ],
        note: 'If "ng" is not recognized, either install the CLI globally with "npm install -g @angular/cli" or prefix every command with "npx" (e.g. npx ng build). npx uses the version already in your project.',
      },
      {
        label: 'Run the REAL production build',
        commands: [
          `# Build the production bundle (same thing the host runs)
ng build`,
        ],
        note: 'ng build creates a production build by default in modern Angular (v17+). If it fails here, it fails on the host — always build locally first.',
      },
      {
        label: '⚠️ The #1 Angular deploy bug — the /browser output folder',
        isText: true,
        text: [
          'Since Angular 17, "ng build" outputs to a NESTED folder:',
          '',
          '   dist/your-app-name/browser/',
          '',
          'NOT the old dist/your-app-name/ that Angular 16 and earlier used.',
          'This changed because the modern "application" builder can also emit a',
          'server/ folder for SSR — so your browser files live under /browser.',
          '',
          'Why this matters: almost every host defaults to publishing dist/ or',
          'dist/your-app-name/. If you point it there, you get a BLANK WHITE PAGE',
          'even though the build "succeeded". You must point the host at the',
          '/browser sub-folder.',
          '',
          'Find your exact path: open angular.json and look for "outputPath".',
          'Your publish directory is that path + "/browser".',
          '   Example: dist/my-portfolio/browser',
        ],
        note: 'Blank page after a successful Angular deploy = wrong output directory 99% of the time. The correct publish folder is dist/<your-app-name>/browser, not dist/ or dist/<your-app-name>.',
      },
    ],
  },

  {
    phase: '03',
    title: '.gitignore and push your code to GitHub',
    color: '#F59E0B',
    steps: [
      {
        label: 'Create .gitignore in your project root',
        isFile: true,
        fileName: '.gitignore',
        commands: [
          `# Dependencies — huge, auto-installed by "npm install", never commit
node_modules/

# Build output — the host builds this itself
dist/
/tmp/
/out-tsc/

# Angular / editor cache
.angular/
.vscode/

# Environment secret files — NEVER push these
.env
.env.local

# OS junk
.DS_Store
Thumbs.db
*.log`,
        ],
        note: 'Angular projects usually ship with a .gitignore already — if so, just make sure node_modules/, dist/, and .angular/ are listed. Do this BEFORE your first "git add .".',
      },
      {
        label: 'Create an empty GitHub repo, then push',
        commands: [
          `# In your project folder
git init`,
          `git add .`,
          `git commit -m "initial commit"`,
          `git branch -M main`,
          `# Use YOUR username and repo name
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git`,
          `git push -u origin main`,
        ],
        note: 'Create the empty repo on github.com FIRST (do not tick "Add a README" if your project already has one). Then run these commands. If auth fails, GitHub needs a Personal Access Token, not your password (Settings → Developer Settings → Personal Access Tokens, "repo" scope).',
      },
    ],
  },

  {
    phase: '04',
    title: 'Fix the "404 on refresh" problem (Angular Router)',
    color: '#A78BFA',
    steps: [
      {
        label: 'Why /about shows 404 when you refresh it',
        isText: true,
        text: [
          'Angular Router uses clean URLs like /about by default (PathLocationStrategy).',
          'Those URLs work when you CLICK links inside the app — but if you refresh',
          '/about or paste it directly, some hosts return a 404.',
          '',
          'Why: the browser asks the HOST for a file called /about, which does not',
          'exist as a real file. The host returns 404 instead of letting Angular',
          'Router handle the route.',
          '',
          'Fix: tell the host "for ANY URL, serve index.html and let Angular Router',
          'figure out the page." This is the SPA fallback rewrite. Add the right',
          'config for your host BEFORE deploying.',
        ],
        note: 'Vercel, Netlify, Cloudflare Pages, and Firebase all often auto-handle SPA routing when they detect Angular — but adding the explicit config below guarantees links work on the very first deploy.',
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
        note: 'Put this file next to angular.json (the project root), not inside src/. Commit and push it.',
      },
      {
        label: 'For Netlify OR Cloudflare Pages — create src/_redirects',
        isFile: true,
        fileName: 'src/_redirects',
        commands: [
          `/*    /index.html   200`,
        ],
        note: 'Name the file _redirects (no extension) and place it in src/. In angular.json, make sure src/_redirects is listed under "assets" so the CLI copies it into the build output. This one file works for both Netlify and Cloudflare Pages.',
      },
      {
        label: 'For Firebase Hosting — the rewrite lives in firebase.json',
        isFile: true,
        fileName: 'firebase.json',
        commands: [
          `{
  "hosting": {
    "public": "dist/YOUR_APP_NAME/browser",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ]
  }
}`,
        ],
        note: 'For Firebase, the SPA rewrite is a "rewrites" block inside firebase.json (Phase 06 sets this up). Note the "public" path ends in /browser — the Angular 17+ gotcha applies here too.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Deploy on Vercel (main path)',
    color: '#60A5FA',
    steps: [
      {
        label: 'Import your repo and go live',
        isText: true,
        text: [
          '1. Go to vercel.com → "Sign Up" → "Continue with GitHub"',
          '',
          '2. Click "Add New… → Project" → find your repo → "Import"',
          '',
          '3. Vercel usually auto-detects Angular and fills in:',
          '   Framework Preset:  Angular',
          '   Build Command:     ng build   (or npm run build)',
          '',
          '4. ⚠️ CHECK the Output Directory carefully (this is the common trap):',
          '   Modern Angular (v17+, "application" builder) outputs to',
          '   dist/YOUR_APP_NAME/browser',
          '   If Vercel shows only dist/YOUR_APP_NAME, override it and add',
          '   "/browser" — otherwise you get a blank page.',
          '',
          '5. (Optional) add any environment variables now (Phase 07)',
          '',
          '6. Click "Deploy" — wait 1–2 minutes',
          '',
          '7. Your app is live at your-project.vercel.app',
          '',
          'From now on, every push to main auto-redeploys, and other branches get',
          'their own preview URL.',
        ],
        note: 'If the deploy succeeds but the page is blank, it is almost always the Output Directory. Set it to dist/YOUR_APP_NAME/browser in Settings → Build & Deployment, then redeploy.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Alternatives — Netlify, Cloudflare Pages, Firebase',
    color: '#00C7B7',
    steps: [
      {
        label: 'Netlify (GitHub or drag & drop)',
        isText: true,
        text: [
          'Connect GitHub (auto-deploys):',
          '1. netlify.com → "Add new site" → "Import an existing project" → pick repo',
          '2. Build command:     ng build',
          '3. Publish directory:  dist/YOUR_APP_NAME/browser   ← the /browser folder',
          '4. "Deploy site" → live in ~1 minute',
          '',
          'Drag & drop (fastest, no GitHub):',
          '1. Run "ng build" locally',
          '2. Drag the dist/YOUR_APP_NAME/browser folder onto app.netlify.com',
          '   (drag the /browser folder itself, not dist/)',
        ],
        note: 'The src/_redirects file (Phase 04) makes Angular Router work on Netlify. Drag & drop does not auto-update — for an evolving project, connect GitHub instead.',
      },
      {
        label: 'Cloudflare Pages',
        isText: true,
        text: [
          '1. dash.cloudflare.com → "Workers & Pages" → "Create" → "Pages"',
          '2. Connect your GitHub repo',
          '3. Framework preset:   Angular',
          '4. Build command:      ng build   (or npm run build)',
          '5. Build output dir:   dist/YOUR_APP_NAME/browser   ← the /browser folder',
          '6. "Save and Deploy" → live at your-project.pages.dev',
        ],
        note: 'Cloudflare Pages gives unlimited bandwidth on the free plan — the most generous if your project ever gets a traffic spike. The src/_redirects file handles SPA routing here too.',
      },
      {
        label: 'Firebase Hosting (Google CDN)',
        commands: [
          `# Install the Firebase CLI (once, globally)
npm install -g firebase-tools`,
          `# Log in with your Google account (opens the browser)
firebase login`,
          `# Set up hosting in your project folder
firebase init hosting`,
          `# Build, then deploy
ng build`,
          `firebase deploy`,
        ],
        note: 'During "firebase init hosting": set the public directory to dist/YOUR_APP_NAME/browser, answer "Yes" to "Configure as a single-page app (rewrite all urls to /index.html)". That SPA answer is what fixes 404-on-refresh (see the firebase.json in Phase 04). Free Spark plan: 10 GB storage + ~10 GB/month transfer — plenty for a portfolio.',
      },
    ],
  },

  {
    phase: '07',
    title: 'Environment variables + the honest free-tier picture',
    color: '#34D399',
    steps: [
      {
        label: 'How Angular "environments" work (and the secret rule)',
        isFile: true,
        fileName: 'src/environments/environment.ts',
        commands: [
          `// Angular uses environment files, not a .env by default.
// This is the PRODUCTION config used by "ng build".

export const environment = {
  production: true,
  apiUrl: 'https://your-backend.onrender.com',
  appName: 'My Angular App',
};`,
        ],
        note: 'Angular swaps environment.ts for environment.development.ts during dev via the "fileReplacements" in angular.json. Read it in code with: import { environment } from "../environments/environment".',
      },
      {
        label: '⚠️ Frontend values are NOT secret — ever',
        isText: true,
        text: [
          'Everything in an Angular build ships to the browser as JavaScript.',
          'Anyone can open DevTools and read it. There is NO way to hide a value',
          'in a frontend app.',
          '',
          '✅ SAFE in an Angular environment file:',
          '   apiUrl (your public backend URL), appName, Firebase web config',
          '   (designed to be public), Maps/Analytics keys (restrict by domain)',
          '',
          '🚫 NEVER put here:',
          '   Database connection strings, JWT secrets, payment SECRET keys,',
          '   anything labelled "secret" or "private".',
          '',
          'If a feature needs a private key, that key lives on your BACKEND.',
          'Your Angular app calls the backend; the backend uses the secret.',
        ],
        note: 'There is no such thing as a secret variable in a frontend app. If it ships to the browser, it is public. Keep true secrets on a backend server.',
      },
      {
        label: 'What free actually gives you — and go use the link',
        isText: true,
        text: [
          'For an Angular portfolio, learning project, or college demo, the free',
          'tier of any of these four hosts is far more than enough:',
          '',
          '→ Vercel Hobby:      ~100 GB bandwidth/month (personal projects)',
          '→ Netlify Free:      ~100 GB bandwidth/month + 300 build minutes',
          '→ Cloudflare Pages:  unlimited bandwidth, 500 builds/month',
          '→ Firebase Hosting:  10 GB storage + ~10 GB/month transfer',
          '',
          'Honest catch: these free tiers are for personal / non-commercial use.',
          'Portfolios, demos, and college work are exactly the intended use — you',
          'would only need a paid plan for a real business or team features.',
          '',
          'Now use your live link:',
          '→ Add it to your resume and LinkedIn',
          '→ Pin the GitHub repo and put the live link in its "About" section',
          '→ Put the link in the README so recruiters click straight through',
        ],
        note: 'A live link is proof you can ship — not just write code that runs on your laptop. Every push to main auto-updates the live site in a minute or two.',
      },
    ],
  },
]
