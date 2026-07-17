export const SVELTEKIT_GUIDE = [
  {
    phase: '01',
    title: 'What you will build — and why SvelteKit uses "adapters"',
    color: '#FF3E00',
    steps: [
      {
        label: 'SvelteKit is full-stack — the adapter decides where it runs',
        isText: true,
        text: [
          'SvelteKit is Svelte\'s full-stack framework. Unlike a plain Svelte SPA,',
          'it can render pages on the server (SSR), pre-render them at build time,',
          'and run backend code in +server.js / +page.server.js "load" functions.',
          '',
          'Because it can do server work, SvelteKit does not build to plain static',
          'files by default. Instead it uses an ADAPTER — a small plugin that packs',
          'your app for a specific host:',
          '',
          '→ adapter-vercel   → Vercel serverless/edge functions (this guide\'s path)',
          '→ adapter-static   → a fully pre-rendered static site (any static host)',
          '→ adapter-netlify  → Netlify functions',
          '→ adapter-cloudflare → Cloudflare Workers/Pages',
          '→ adapter-node     → a Node server you run yourself (Render, a VPS)',
          '',
          'Fun fact: Rich Harris, Svelte\'s creator, works at Vercel — so Vercel is',
          'the smoothest, best-supported free home for a SvelteKit app. That is the',
          'main path here. Phase 06 covers the pure-static option.',
        ],
        note: 'The adapter is the whole game in SvelteKit deployment. Pick adapter-vercel for a full-stack app with server routes; pick adapter-static only if your app has zero server-side rendering.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Before you deploy — build and test locally',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Run the dev server and click through everything',
        isText: true,
        text: [
          '1. Open a terminal in your project folder (where package.json + svelte.config.js live)',
          '2. Run: npm install   (run once)',
          '3. Run: npm run dev   → opens http://localhost:5173',
          '4. Click through EVERY page, form, and load function',
          '',
          'Golden rule: if it breaks locally, it breaks online. Fix it here first.',
        ],
        note: 'SvelteKit projects are Vite-based, so npm run dev / npm run build feel exactly like a Vite React or Vue project.',
      },
      {
        label: 'Run the real production build and preview it',
        commands: [
          `npm run build`,
          `npm run preview`,
        ],
        note: 'npm run build is exactly what Vercel runs on its servers. npm run preview serves the built app locally so you see the true production version before pushing. If build fails here, it fails on the host.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Set the Vercel adapter (recommended for full-stack)',
    color: '#FF3E00',
    steps: [
      {
        label: 'Why install adapter-vercel explicitly',
        isText: true,
        text: [
          'New SvelteKit projects ship with adapter-auto. When you deploy on Vercel,',
          'adapter-auto DETECTS Vercel and pulls in @sveltejs/adapter-vercel at build',
          'time — so a fresh project often "just works" on Vercel with zero changes.',
          '',
          'But installing adapter-vercel yourself is recommended because it:',
          '→ pins the version (no surprise breakage when adapter-auto updates)',
          '→ slightly speeds up CI (nothing to auto-download)',
          '→ lets you set Vercel-specific options (Node runtime, region, ISR)',
        ],
        note: 'adapter-auto is fine for a first deploy. Switching to adapter-vercel gives you version stability and control — do it once your app is more than a demo.',
      },
      {
        label: 'Install the Vercel adapter as a dev dependency',
        commands: [
          `# MUST be a devDependency — adapters are build-time tools
npm i -D @sveltejs/adapter-vercel`,
        ],
        note: 'If a Vercel build ever fails with "adapter not found", the cause is almost always that the adapter landed in "dependencies" instead of "devDependencies". Keep it in devDependencies.',
      },
      {
        label: 'Wire it into svelte.config.js',
        isFile: true,
        fileName: 'svelte.config.js',
        commands: [
          `import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    // Defaults are sensible; runtime is optional.
    adapter: adapter({
      runtime: 'nodejs22.x',
    }),
  },
};

export default config;`,
        ],
        note: 'Note: SvelteKit does NOT allow a TypeScript config file — it must be svelte.config.js. The runtime option is optional; leaving adapter() empty lets Vercel pick the Node version from your project settings.',
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

# SvelteKit build output + generated types
.svelte-kit/
build/

# Environment files — NEVER push these
.env
.env.*
!.env.example

# OS / editor junk
.DS_Store
Thumbs.db
*.log`,
        ],
        note: 'SvelteKit generates a .gitignore for you that already lists .svelte-kit/ and node_modules/. Just make sure your .env is ignored — SvelteKit apps often hold real secrets in server code, so a leaked .env is dangerous.',
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
        note: 'Create the empty repo on github.com first (no README if your project already has one). If auth fails, GitHub needs a Personal Access Token with "repo" scope, not your account password.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Deploy on Vercel',
    color: '#60A5FA',
    steps: [
      {
        label: 'Import your repo — SvelteKit is auto-detected',
        isText: true,
        text: [
          '1. Go to vercel.com → "Sign Up" → "Continue with GitHub"',
          '',
          '2. "Add New… → Project" → find your repo → "Import"',
          '',
          '3. Vercel auto-detects SvelteKit and fills in the build settings:',
          '   Framework Preset:  SvelteKit',
          '   Build Command:     vite build   (auto)',
          '   Install Command:   npm install  (auto)',
          '   Output:            handled by the adapter (leave default)',
          '',
          '4. Add environment variables now if your app needs them (Phase 07)',
          '',
          '5. Click "Deploy" — wait 1–2 minutes',
          '',
          '6. Live at your-project.vercel.app — SSR pages, load functions, and',
          '   +server.js API routes all run as Vercel functions automatically.',
          '',
          'Every push to main auto-redeploys; other branches get preview URLs.',
        ],
        note: 'If Vercel does not auto-detect the framework, set Settings → General → Framework Preset to "SvelteKit" manually, or the build output will be structured wrong.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Alternative — a fully static SvelteKit site (adapter-static)',
    color: '#38BDF8',
    steps: [
      {
        label: 'When to go static instead',
        isText: true,
        text: [
          'If your SvelteKit app has NO server-side rendering at request time — it is',
          'a blog, docs, portfolio, or marketing site where every page can be',
          'pre-rendered at build time — you can output plain static files and host',
          'them anywhere free (GitHub Pages, Cloudflare Pages, Netlify, Vercel).',
          '',
          'The catch: adapter-static pre-renders pages at BUILD time. It cannot run',
          '+page.server.js load functions or +server.js API routes on each request.',
          'If you need per-request server logic or auth, stay on adapter-vercel',
          '(Phase 03–05).',
        ],
        note: 'Rule of thumb: dynamic/auth/API-per-request → adapter-vercel. Purely content that can be frozen at build time → adapter-static.',
      },
      {
        label: 'Install and configure adapter-static',
        commands: [
          `npm i -D @sveltejs/adapter-static`,
        ],
        note: 'Also add a prerender option so every route is captured. If a route cannot be prerendered, the build tells you exactly which one — fix it or exclude it.',
      },
      {
        label: 'svelte.config.js + enable prerendering',
        isFile: true,
        fileName: 'svelte.config.js',
        commands: [
          `import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '200.html', // SPA fallback so client routing works on refresh
      precompress: false,
      strict: true,
    }),
  },
};

export default config;`,
        ],
        note: 'Add "export const prerender = true;" to your root +layout.js so all pages prerender. The fallback: "200.html" acts as the SPA rewrite for hosts like Netlify/Cloudflare so deep links do not 404. Publish directory = build/.',
      },
    ],
  },

  {
    phase: '07',
    title: 'Environment variables (public vs private) + free tier',
    color: '#34D399',
    steps: [
      {
        label: 'SvelteKit keeps secrets truly server-side',
        isText: true,
        text: [
          'SvelteKit has a real advantage over pure frontend apps: it can keep',
          'secrets on the SERVER. It exposes env vars through four modules:',
          '',
          '   $env/static/private   — build-time secrets, server-only (DB URL, keys)',
          '   $env/dynamic/private  — runtime secrets, server-only',
          '   $env/static/public    — PUBLIC values, must be prefixed PUBLIC_',
          '   $env/dynamic/public   — PUBLIC values at runtime, prefixed PUBLIC_',
          '',
          'Only PUBLIC_-prefixed variables can be imported into browser code.',
          'Anything from a /private module is refused in client-side code — which',
          'is exactly the safety you want.',
          '',
          'Example .env:',
          '   DATABASE_URL=postgres://...        (private, server-only)',
          '   PUBLIC_API_BASE=https://api.me.com (safe to ship to the browser)',
        ],
        note: 'Import { DATABASE_URL } from "$env/static/private" ONLY inside server files (+page.server.js, +server.js). Import { PUBLIC_API_BASE } from "$env/static/public" anywhere. SvelteKit blocks private imports in client code at build time.',
      },
      {
        label: 'Add the same variables in the Vercel dashboard',
        isText: true,
        text: [
          'Your local .env is not pushed to GitHub (good), so Vercel does not have',
          'it. Add each variable in:',
          '   Vercel → project → Settings → Environment Variables → Add',
          '',
          'Then REDEPLOY — the live build does not pick up new variables on its own.',
          'Remember the PUBLIC_ prefix rule for anything the browser must read.',
        ],
        note: 'Env var undefined after deploy? Usually a missing PUBLIC_ prefix (for client-read values) or you forgot to redeploy after adding it.',
      },
      {
        label: 'The honest free-tier picture — and go use the link',
        isText: true,
        text: [
          'Vercel Hobby (free) runs a SvelteKit app — SSR, API routes and all —',
          'genuinely free for personal projects:',
          '→ ~100 GB bandwidth/month',
          '→ Serverless function execution included',
          '→ Free HTTPS, preview deploys, custom domain',
          '',
          'Honest catch: the Hobby plan is for personal / non-commercial use, and',
          'serverless functions have execution limits (fine for a portfolio; a',
          'high-traffic commercial app would need Pro). Static sites (adapter-static)',
          'have essentially no such limits.',
          '',
          'Now use it: put the live URL on your resume, LinkedIn, and the repo',
          'README. A live full-stack app shows you can ship end to end.',
        ],
        note: 'For a student portfolio you will almost never hit the free limits. Ship it and share the link — every push to main updates the live site automatically.',
      },
    ],
  },
]
