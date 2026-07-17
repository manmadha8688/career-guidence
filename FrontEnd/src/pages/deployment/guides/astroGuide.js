export const ASTRO_GUIDE = [
  {
    phase: '01',
    title: 'What you will build — a fast Astro site, hosted free',
    color: '#FF5D01',
    steps: [
      {
        label: 'Astro is static-first — that is why it hosts free',
        isText: true,
        text: [
          'Astro is a content-focused web framework. By default it PRE-RENDERS every',
          'page to plain HTML at build time and ships almost zero JavaScript. That',
          'makes an Astro site blazing fast and, crucially, a "static" site — the',
          'cheapest thing on the internet to host.',
          '',
          'When you DO need interactivity, Astro uses "islands": you drop a React,',
          'Vue, Svelte, or Solid component into a page and only THAT component ships',
          'JS to the browser. The rest of the page stays static HTML.',
          '',
          'Two output modes matter for deployment:',
          '→ Static (default)  — every page pre-rendered → any static host, free,',
          '  zero config. This is what most Astro blogs / docs / portfolios use.',
          '→ Server (SSR)      — pages render per request → needs an adapter and a',
          '  host that runs server functions (Vercel/Netlify/Cloudflare).',
          '',
          'Free homes for a static Astro site (pick ONE):',
          '→ Vercel           — zero config for static',
          '→ Netlify          — zero config for static',
          '→ Cloudflare Pages — unlimited bandwidth',
          '',
          'All give free HTTPS, a global CDN, a free subdomain, and auto-redeploy',
          'on every git push.',
        ],
        note: 'A default Astro site is pure static HTML — it deploys with ZERO configuration and no adapter. You only add an adapter when you switch a route to on-demand server rendering (Phase 03).',
      },
    ],
  },

  {
    phase: '02',
    title: 'Before you deploy — build and preview locally',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Run the dev server and check every page',
        isText: true,
        text: [
          '1. Open a terminal in your project folder (where astro.config.mjs lives)',
          '2. Run: npm install   (run once)',
          '3. Run: npm run dev   → opens http://localhost:4321',
          '4. Click through every page and any interactive island',
          '',
          'Golden rule: broken locally = broken online. Fix it here first.',
        ],
        note: 'The Astro dev server default port is 4321 (not 3000/5173). If a component island does not hydrate, check you added a client directive like client:load.',
      },
      {
        label: 'Run the real production build',
        commands: [
          `# Builds static files into the dist/ folder
npm run build`,
          `# Serve the built dist/ locally to preview the real output
npm run preview`,
        ],
        note: 'For a static Astro site, npm run build outputs to dist/ — that is the folder any static host serves. If build fails locally, it fails on the host.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Static vs SSR — pick your output mode',
    color: '#FF5D01',
    steps: [
      {
        label: 'The three real shapes of an Astro site (2026)',
        isText: true,
        text: [
          'Astro 5 simplified this. The old "hybrid" mode was REMOVED and merged',
          'into "static". Today there are three shapes:',
          '',
          '1) ALL STATIC (most common):',
          '   output: "static" (the default), NO adapter, no prerender overrides.',
          '   Deploys as plain HTML to any static host with zero config.',
          '',
          '2) MOSTLY STATIC + a few dynamic routes ("hybrid" replacement):',
          '   Keep output: "static", install an adapter, and add',
          '   "export const prerender = false" to ONLY the routes that must render',
          '   per request. Astro serves those as functions and pre-renders the rest.',
          '',
          '3) ALL SSR:',
          '   output: "server", adapter installed. Every route renders per request',
          '   (add "export const prerender = true" to any page that can be frozen).',
        ],
        note: 'If you are unsure, you are almost certainly case 1 (all static) — a blog, docs, or portfolio. Do not add an adapter you do not need; it only slows the build.',
      },
      {
        label: 'Only if you need SSR — add the adapter with one command',
        commands: [
          `# Vercel SSR (also configures astro.config.mjs for you)
npx astro add vercel`,
          `# or Netlify SSR
npx astro add netlify`,
          `# or Cloudflare Pages / Workers SSR
npx astro add cloudflare`,
        ],
        note: 'npx astro add <host> installs the right adapter AND wires it into astro.config.mjs automatically — the safest way to set it up. In Astro 5+, the Vercel import is the single "@astrojs/vercel" (the old /serverless and /edge sub-paths were removed).',
      },
      {
        label: 'What astro.config.mjs looks like for SSR',
        isFile: true,
        fileName: 'astro.config.mjs',
        commands: [
          `import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // 'static' (default) keeps pages pre-rendered; add
  // "export const prerender = false" to routes that need SSR.
  // Use 'server' to server-render everything by default.
  output: 'static',
  adapter: vercel(),
});`,
        ],
        note: 'Leaving output as "static" WITH an adapter is the modern "hybrid": pages prerender unless you opt a route out with prerender = false. Only set output: "server" if you truly want every route server-rendered.',
      },
    ],
  },

  {
    phase: '04',
    title: '.gitignore and push to GitHub',
    color: '#F59E0B',
    steps: [
      {
        label: 'Confirm your .gitignore covers the essentials',
        isFile: true,
        fileName: '.gitignore',
        commands: [
          `# Dependencies
node_modules/

# Astro build output + cache
dist/
.astro/

# Environment files — NEVER push these
.env
.env.production

# OS / editor junk
.DS_Store
Thumbs.db
*.log`,
        ],
        note: 'Astro ships a .gitignore that already lists dist/ and node_modules/. Just confirm your .env is ignored before the first commit.',
      },
      {
        label: 'Create an empty GitHub repo, then push',
        commands: [
          `git init`,
          `git add .`,
          `git commit -m "initial commit"`,
          `git branch -M main`,
          `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git`,
          `git push -u origin main`,
        ],
        note: 'Create the empty repo on github.com first (no README if your project already has one). If auth fails, GitHub needs a Personal Access Token with "repo" scope, not your password.',
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
          '2. "Add New… → Project" → find your repo → "Import"',
          '',
          '3. Vercel auto-detects Astro and fills in:',
          '   Framework Preset:  Astro',
          '   Build Command:     astro build   (auto)',
          '   Output Directory:  dist          (auto)',
          '',
          '4. Click "Deploy" — wait ~1 minute',
          '',
          '5. Live at your-project.vercel.app',
          '',
          'A static Astro site needs NO adapter and NO config for this — Vercel',
          'just serves the dist/ folder. If you added an SSR adapter (Phase 03),',
          'Vercel runs your dynamic routes as functions automatically.',
          '',
          'Every push to main auto-redeploys; other branches get preview URLs.',
        ],
        note: 'For a static site, do not install @astrojs/vercel — it is unnecessary and slows builds. Only add it if you use SSR, ISR, Vercel Image Optimization, or Vercel Web Analytics.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Alternatives — Netlify and Cloudflare Pages',
    color: '#00C7B7',
    steps: [
      {
        label: 'Netlify',
        isText: true,
        text: [
          'Connect GitHub (auto-deploys):',
          '1. netlify.com → "Add new site" → "Import an existing project" → pick repo',
          '2. Build command:     astro build   (auto-detected)',
          '3. Publish directory: dist',
          '4. "Deploy site" → live in ~1 minute',
          '',
          'Drag & drop (fastest, no GitHub):',
          '1. Run "npm run build" locally → creates dist/',
          '2. Drag the dist/ folder onto app.netlify.com',
          '',
          'For SSR on Netlify, run "npx astro add netlify" first (Phase 03).',
        ],
        note: 'A static Astro site works on Netlify with zero extra config. Drag & drop does not auto-update — connect GitHub for an evolving project.',
      },
      {
        label: 'Cloudflare Pages',
        isText: true,
        text: [
          '1. dash.cloudflare.com → "Workers & Pages" → "Create" → "Pages"',
          '2. Connect your GitHub repo',
          '3. Framework preset:   Astro',
          '4. Build command:      npm run build',
          '5. Build output dir:   dist',
          '6. "Save and Deploy" → live at your-project.pages.dev',
          '',
          'For SSR on Cloudflare, run "npx astro add cloudflare" first — it runs on',
          'Cloudflare Workers and the build layout differs from a static one.',
        ],
        note: 'Cloudflare Pages gives unlimited bandwidth free — the most generous host if your content ever gets a traffic spike.',
      },
    ],
  },

  {
    phase: '07',
    title: 'Environment variables + the honest free-tier picture',
    color: '#34D399',
    steps: [
      {
        label: 'Public vs private env vars in Astro',
        isText: true,
        text: [
          'Astro reads a .env file automatically. The prefix decides visibility:',
          '',
          '   PUBLIC_API_URL=https://api.example.com   ← shipped to the browser',
          '   SECRET_API_KEY=super-secret              ← server-only (SSR / build)',
          '',
          'Read them in code with import.meta.env:',
          '   import.meta.env.PUBLIC_API_URL   (safe anywhere)',
          '   import.meta.env.SECRET_API_KEY   (server code only — never in a',
          '                                     client:load React/Vue island)',
          '',
          '⚠️ ONLY PUBLIC_-prefixed variables are safe in browser/island code.',
          'Anything without the prefix must stay in server-rendered code or build',
          'scripts. On a static site there is no server at runtime at all, so treat',
          'every value you reference in a page as effectively public.',
        ],
        note: 'On a purely static Astro site, there is no server to hold a secret at runtime — keep true secrets (DB URLs, private keys) on a separate backend the site calls, not baked into the build.',
      },
      {
        label: 'Add the same variables in your host dashboard',
        isText: true,
        text: [
          'Your local .env is not pushed to GitHub, so the host does not have it.',
          'Add each variable in the host dashboard, then REDEPLOY:',
          '',
          'Vercel:  Settings → Environment Variables → Add → Redeploy',
          'Netlify: Site settings → Environment variables → Add → Redeploy',
          'Cloudflare Pages: Settings → Variables → Add → Redeploy',
        ],
        note: 'A missing PUBLIC_ prefix (for browser-read values) or forgetting to redeploy after adding a variable are the two most common "it is undefined online" causes.',
      },
      {
        label: 'What free gives you — and go use the link',
        isText: true,
        text: [
          'For an Astro blog, docs site, or portfolio, the free tier of Vercel,',
          'Netlify, or Cloudflare Pages is far more than enough:',
          '→ Vercel Hobby:      ~100 GB bandwidth/month',
          '→ Netlify Free:      ~100 GB bandwidth/month + 300 build minutes',
          '→ Cloudflare Pages:  unlimited bandwidth, 500 builds/month',
          '',
          'Honest catch: these free tiers are for personal / non-commercial use —',
          'exactly what a portfolio, blog, or college project is. You would only',
          'need a paid plan for a commercial app or team features.',
          '',
          'Now use it: add the live URL to your resume, LinkedIn, and repo README.',
          'Astro sites score near-perfect on performance audits — a great thing to',
          'show off.',
        ],
        note: 'Astro\'s tiny JS output means great Lighthouse scores — mention that when you share the link. Every push to main auto-updates the live site in about a minute.',
      },
    ],
  },
]
