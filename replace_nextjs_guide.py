"""Replace NEXTJS_GUIDE with comprehensive 22-phase version."""

NEW_GUIDE = r"""export const NEXTJS_GUIDE = [
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
          '   3GB storage, never expires, serverless connection pooler.',
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
"""

content = open('C:/manmadha/Student-project/FrontEnd/src/pages/deployment/guideData.js', 'r', encoding='utf-8').read()

old_start = content.index('export const NEXTJS_GUIDE = [')
old_end   = content.index('export const FASTAPI_GUIDE = [', old_start)

new_content = (
    content[:old_start]
    + NEW_GUIDE.strip()
    + '\n\n// ─── FastAPI → Render ─────────────────────────────────────────────────────────\n'
    + content[old_end:]
)

with open('C:/manmadha/Student-project/FrontEnd/src/pages/deployment/guideData.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Done. Next.js guide replaced successfully.')
