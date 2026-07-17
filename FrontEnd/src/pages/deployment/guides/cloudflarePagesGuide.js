export const CLOUDFLARE_PAGES_GUIDE = [
  {
    phase: '01',
    title: 'What is Cloudflare Pages and why use it?',
    color: '#F38020',
    steps: [
      {
        label: 'Cloudflare Pages — static sites & SPAs on a global edge',
        isText: true,
        text: [
          'Cloudflare Pages hosts your frontend (React/Vite, Vue, static HTML) on',
          "Cloudflare's global edge network. You connect a GitHub repo, it builds",
          'on every push, and serves the result from data centers worldwide.',
          '',
          'Why it stands out for students:',
          '→ UNLIMITED bandwidth on the free tier (rare — Vercel/Netlify meter it)',
          '→ Global CDN by default → fast for users anywhere, including India',
          '→ Free HTTPS + custom domain',
          '→ Pages Functions: add serverless API endpoints without a backend',
          '',
          'Pages vs Workers (do not confuse them):',
          '→ Pages = host a website/SPA (with optional Functions for APIs)',
          '→ Workers = standalone serverless functions',
          '  Pages is built ON Workers; Functions in a Pages project ARE Workers.',
          '',
          'Great for: a React/Vite portfolio, a Vue app, a static site, or a',
          'frontend that needs a few lightweight API routes.',
        ],
        note: 'The headline free-tier feature is unlimited bandwidth. If you expect traffic spikes (a viral portfolio, a shared class project), Cloudflare will not bill you for bandwidth the way metered hosts might.',
      },
      {
        label: 'The free tier — verified 2026 limits',
        isText: true,
        text: [
          'Cloudflare Pages free tier:',
          '   Unlimited bandwidth',
          '   Unlimited sites (projects)',
          '   500 builds per MONTH',
          '   1 build at a time (no concurrent builds)',
          '   20-minute build timeout',
          '   Up to 20,000 files per site',
          '   Free HTTPS + custom domains',
          '',
          'Pages Functions (serverless API) on free:',
          '   Requests count toward the Workers free allowance',
          '   (100,000 requests/day) — generous for most projects',
          '',
          'What could actually limit you:',
          '→ 500 builds/month = ~16/day. Each push = one build. Fine unless you',
          '  push dozens of times a day; batch commits if you are close.',
          '→ 20,000 files: a normal Vite build is nowhere near this. Only huge',
          '  asset-heavy sites approach it.',
        ],
        note: 'For a student project the free tier is effectively "unlimited" for what matters (bandwidth, sites). The only real ceiling is 500 builds/month — just avoid pushing 30 tiny commits an hour and you will never notice it.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Push to GitHub & connect the repo',
    color: '#F38020',
    steps: [
      {
        label: 'Get your Vite/React project on GitHub',
        commands: [
          `# In your project folder
git init
git add .
git commit -m "Initial commit"`,
          `# Create a repo on github.com, then link and push
git remote add origin https://github.com/yourname/your-app.git
git branch -M main
git push -u origin main`,
        ],
        note: 'Cloudflare Pages deploys from a Git repo. Make sure node_modules and dist are in your .gitignore — you commit source, and Cloudflare builds the output for you.',
      },
      {
        label: 'Create the Pages project',
        isText: true,
        text: [
          '1. Go to dash.cloudflare.com → sign up (free, no card)',
          '2. Left sidebar → "Workers & Pages" → "Create" → "Pages" tab',
          '3. Click "Connect to Git" and authorize Cloudflare on GitHub',
          '4. Select your repository',
          '5. On the "Set up builds and deployments" screen, set the build',
          '   settings (next step), then "Save and Deploy"',
        ],
        note: 'Cloudflare often auto-detects the framework and pre-fills the build settings. Always double-check them against the next step — a wrong output directory is the most common cause of a blank page.',
      },
      {
        label: 'Build settings for Vite / React',
        isText: true,
        text: [
          'For a Vite project (React, Vue, Svelte):',
          '   Framework preset:        Vite (or "None" if you prefer manual)',
          '   Build command:           npm run build',
          '   Build output directory:  dist',
          '',
          'For Create React App (older):',
          '   Build command:           npm run build',
          '   Build output directory:  build',
          '',
          'For a plain HTML/CSS/JS site (no build step):',
          '   Framework preset:        None',
          '   Build command:           (leave empty)',
          '   Build output directory:  / (or the folder with index.html)',
          '',
          'If your build needs a specific Node version, add an environment',
          'variable NODE_VERSION = 20 (or add a .nvmrc file to your repo).',
        ],
        note: 'The two values that break deploys: Build output directory (Vite = "dist", CRA = "build") and Node version. If the build succeeds but the site is blank, it is almost always the wrong output directory.',
      },
    ],
  },

  {
    phase: '03',
    title: 'SPA routing, env vars & custom domain',
    color: '#60A5FA',
    steps: [
      {
        label: 'Fix client-side routing (the refresh-404 problem)',
        isFile: true,
        fileName: 'public/_redirects',
        commands: [
          `/*    /index.html   200`,
        ],
        note: 'React Router / Vue Router use client-side routes. Without this, refreshing on /about returns 404 because there is no /about.html file. This _redirects rule (placed in your public/ folder so it lands in the build output) tells Cloudflare to serve index.html for all paths with a 200, letting your router take over.',
      },
      {
        label: 'Add environment variables',
        isText: true,
        text: [
          'Project → Settings → "Environment variables" (or "Variables").',
          '',
          'Key points for a Vite frontend:',
          '→ Only VITE_-prefixed vars are exposed to your frontend code',
          '  e.g. VITE_API_URL = https://your-api.onrender.com/api',
          '→ These are BUNDLED into the public JS — never put secrets here',
          '→ You can set separate values for "Production" and "Preview"',
          '→ After adding/changing a variable, trigger a new deploy so the',
          '  build picks it up',
        ],
        note: 'Anything with the VITE_ prefix is public — it ships inside your JavaScript bundle. Put only public config (like your API base URL) there. Real secrets belong on your backend, never in a frontend build.',
      },
      {
        label: 'Add a custom domain (optional)',
        isText: true,
        text: [
          '1. Project → "Custom domains" → "Set up a custom domain"',
          '2. Enter your domain (e.g. myapp.com or a subdomain)',
          '3. If the domain is already on Cloudflare, DNS is configured for you;',
          '   otherwise add the shown CNAME record at your registrar',
          '4. HTTPS is provisioned automatically — no manual certificate steps',
          '',
          'Every deploy also gets a free URL: your-project.pages.dev',
        ],
        note: 'You do not need a custom domain — the free *.pages.dev URL has HTTPS and is perfectly shareable. Add a custom domain only when you want your own branded URL.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Pages Functions — add an API without a backend',
    color: '#A78BFA',
    steps: [
      {
        label: 'How Functions work (file-based routing)',
        isText: true,
        text: [
          'Create a "functions" directory at your project root. Each file becomes',
          'an API endpoint, mapped by its path:',
          '',
          '   functions/api/hello.js   →   /api/hello',
          '   functions/api/users.js   →   /api/users',
          '   functions/api/post/[id].js → /api/post/123  (dynamic param)',
          '',
          'These run as serverless Workers on the edge — no server to manage.',
          'Great for: contact forms, hiding an API key behind a proxy, small',
          'JSON endpoints your frontend calls.',
          '',
          'They are NOT for: heavy/long computations, or a full traditional',
          'backend. For that, deploy an API on Render/Koyeb and call it via',
          'VITE_API_URL instead.',
        ],
        note: 'Functions live in a "functions" folder (note: separate from a Vite "public" folder). During "npm run build" Cloudflare bundles them automatically — you do not add them to your Vite build config.',
      },
      {
        label: 'A simple JSON endpoint',
        isFile: true,
        fileName: 'functions/api/hello.js',
        commands: [
          `// GET /api/hello
export function onRequestGet(context) {
  return new Response(
    JSON.stringify({ message: 'Hello from the edge!' }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}`,
        ],
        note: 'Export onRequestGet / onRequestPost (etc.) for specific HTTP methods, or onRequest for all. The "context" argument gives you context.request, context.env (bindings/secrets), and route params via context.params.',
      },
      {
        label: 'Use a secret safely in a Function',
        isFile: true,
        fileName: 'functions/api/weather.js',
        commands: [
          `// GET /api/weather?city=Hyderabad
export async function onRequestGet(context) {
  const city = new URL(context.request.url).searchParams.get('city');

  // context.env.WEATHER_KEY is a secret set in the dashboard,
  // never exposed to the browser
  const key = context.env.WEATHER_KEY;
  const r = await fetch(
    \`https://api.example.com/weather?q=\${city}&key=\${key}\`
  );
  const data = await r.json();

  return Response.json(data);
}`,
        ],
        note: 'This is the real value of Functions for students: keep an API key SECRET. The browser calls /api/weather, and the Function adds the key server-side. Set WEATHER_KEY in Settings → Environment variables (mark it encrypted/secret) — unlike VITE_ vars, it never reaches the client.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Free-tier reality & tips',
    color: '#EF4444',
    steps: [
      {
        label: 'Honest advice',
        isText: true,
        text: [
          'What is genuinely great (free):',
          '→ Unlimited bandwidth + global edge → no traffic-based surprises',
          '→ Unlimited sites → host all your projects on one account',
          '→ Automatic HTTPS + preview deploys for every branch/PR',
          '',
          'What to watch:',
          '→ 500 builds/month — batch commits if you push very frequently',
          '→ 1 concurrent build — pushes queue; usually a non-issue solo',
          '→ Functions requests share the Workers 100K/day free limit',
          '→ SSR frameworks (Next.js SSR) need an adapter; plain Vite/React,',
          '  Vue and static sites "just work". For heavy SSR, Vercel is simpler.',
          '',
          'Debugging a failed deploy:',
          '→ Read the build log (Deployments → click the build) — it names the',
          '  failing step directly',
          '→ Most failures: wrong output directory, missing env var, or a Node',
          '  version mismatch (set NODE_VERSION)',
        ],
        note: 'Cloudflare Pages is one of the most generous free frontend hosts in 2026, especially on bandwidth. The main friction is around SSR frameworks (which need adapters) — for a standard Vite/React SPA it is a superb, genuinely-free choice.',
      },
    ],
  },
]
