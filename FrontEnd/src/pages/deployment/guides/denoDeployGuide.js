export const DENO_DEPLOY_GUIDE = [
  {
    phase: '01',
    title: 'What is Deno Deploy and why use it?',
    color: '#111827',
    steps: [
      {
        label: 'Deno Deploy — run JS/TS on a global edge, no server',
        isText: true,
        text: [
          'Deno Deploy runs your JavaScript/TypeScript on a globally distributed',
          'edge network. You write a small HTTP handler, connect a GitHub repo,',
          'and it serves your API/app from locations near your users — with no',
          'server to provision and no Dockerfile.',
          '',
          'What is Deno? A modern JS/TS runtime (an alternative to Node) by the',
          'original creator of Node. It runs TypeScript directly (no build step),',
          'has web-standard APIs (fetch, Request, Response), and is secure by',
          'default. Deno Deploy is its first-party hosting.',
          '',
          'Great for students building:',
          '→ A small REST/JSON API or webhook receiver',
          '→ An edge proxy that hides an API key from the browser',
          '→ A URL shortener, form handler, or lightweight backend for a',
          '  Cloudflare Pages / Vercel frontend',
          '',
          'Because handlers use web-standard Request/Response, the code you',
          'learn here also transfers to Cloudflare Workers and modern runtimes.',
        ],
        note: 'Deno Deploy is ideal when you want a tiny always-on API without managing a server or writing a Dockerfile. It is not meant for big monolith backends — for those, use Render/Koyeb. Think "edge functions", not "full application server".',
      },
      {
        label: 'IMPORTANT: use the NEW Deno Deploy (2026)',
        isText: true,
        text: [
          'There are TWO Deno Deploys, and this matters right now:',
          '',
          '→ Deno Deploy Classic (old dashboard: dash.deno.com) is being SHUT',
          '  DOWN on July 20, 2026. Do NOT start new projects there.',
          '→ The NEW Deno Deploy (dashboard: console.deno.com / app.deno.com)',
          '  is the current platform. Use this one.',
          '',
          'Key differences of the new platform:',
          '→ Fully integrated builds (live-streamed logs in the dashboard) — no',
          '  more GitHub Actions YAML like Classic used',
          '→ New account/organization system (create an org before deploying)',
          '→ CLI is now the "deno deploy" subcommand (the old "deployctl" is',
          '  being sunset)',
          '→ Regions: us, eu, or global',
        ],
        note: 'This is the biggest gotcha in 2026: older tutorials point at dash.deno.com and deployctl, which are on the way out. Start at console.deno.com and use the built-in "deno deploy" command. Classic projects are NOT auto-migrated — you recreate them on the new platform.',
      },
      {
        label: 'The free tier — verified 2026 limits',
        isText: true,
        text: [
          'Deno Deploy free tier (per organization):',
          '   1,000,000 requests per month',
          '   20 GB egress bandwidth per month',
          '   15 CPU hours per month',
          '   350 GB-hours of memory time per month',
          '   Up to 20 active apps',
          '   Up to 60 deployments per hour',
          '   5 team members',
          '',
          'Honest notes:',
          '→ Metering is ON. If a free org exceeds requests/bandwidth/CPU/memory,',
          '  your apps are PAUSED until the next monthly cycle (data/config kept).',
          '→ To lift the hard pause you can link a credit card (enables overage',
          '  billing) or upgrade to Pro ($20/mo). Without a card, you may need to',
          '  verify the org to use the full free limits.',
          '→ Older blog posts mention "100 GB egress" — the current live figure',
          '  is 20 GB. Always trust the pricing page over old posts.',
        ],
        note: '1M requests/month is plenty for a student API or webhook. The realistic ceiling is CPU/memory time if you do heavy work per request — keep handlers light (I/O and small transforms) and you will stay comfortably free.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Write a Deno HTTP handler',
    color: '#22D3EE',
    steps: [
      {
        label: 'Install Deno locally (to test before deploying)',
        commands: [
          `# macOS / Linux
curl -fsSL https://deno.land/install.sh | sh`,
          `# Windows (PowerShell)
irm https://deno.land/install.ps1 | iex`,
          `# Verify
deno --version`,
        ],
        note: 'Installing Deno locally lets you run and test your handler before deploying. Deno runs TypeScript directly — no tsconfig or build step needed to get started.',
      },
      {
        label: 'A minimal server (web-standard, no dependencies)',
        isFile: true,
        fileName: 'main.ts',
        commands: [
          `// Deno.serve uses the web-standard Request/Response API
Deno.serve((req: Request) => {
  const url = new URL(req.url);

  if (url.pathname === '/') {
    return new Response('Hello from Deno Deploy!');
  }

  if (url.pathname === '/api/time') {
    return Response.json({ now: new Date().toISOString() });
  }

  return new Response('Not found', { status: 404 });
});`,
        ],
        note: 'Deno.serve is the built-in HTTP server — you do not install Express. It hands you a standard Request and expects a standard Response, the same objects you use in the browser fetch API. Test locally with: deno run --allow-net main.ts',
      },
      {
        label: 'Read secrets from environment variables',
        isFile: true,
        fileName: 'main.ts',
        commands: [
          `Deno.serve(async (req: Request) => {
  const url = new URL(req.url);

  if (url.pathname === '/api/quote') {
    // Set API_KEY in the Deno Deploy dashboard (never hard-code it)
    const key = Deno.env.get('API_KEY');
    const r = await fetch('https://api.example.com/quote', {
      headers: { Authorization: \`Bearer \${key}\` },
    });
    return Response.json(await r.json());
  }

  return new Response('Not found', { status: 404 });
});`,
        ],
        note: 'Deno.env.get("API_KEY") reads an environment variable you set in the dashboard. This is the classic edge pattern: the browser calls your endpoint, and your handler adds the secret key server-side so it never reaches the client.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Deploy via the dashboard (GitHub integration)',
    color: '#4ADE80',
    steps: [
      {
        label: 'Push your code to GitHub first',
        commands: [
          `git init
git add .
git commit -m "Deno API"
git remote add origin https://github.com/yourname/deno-api.git
git branch -M main
git push -u origin main`,
        ],
        note: 'The GitHub integration is the easiest path: every push triggers a new build automatically, with logs streamed live in the dashboard.',
      },
      {
        label: 'Create the app on the new dashboard',
        isText: true,
        text: [
          '1. Go to console.deno.com and sign in',
          '2. Create an ORGANIZATION (required before you can deploy anything)',
          '3. Click "+ New App"',
          '4. Select your GitHub repo (authorize the Deno Deploy GitHub app if',
          '   the repo does not appear)',
          '5. Configure the build:',
          '   → Deno usually auto-detects settings',
          '   → Entry point: main.ts (your server file)',
          '   → For a static/framework build, it detects the framework preset',
          '6. Pick a region: us, eu, or global',
          '7. Add environment variables (e.g. API_KEY)',
          '8. Click "Create App" — watch the live build logs, then get your URL',
        ],
        note: 'You MUST create an organization first on the new platform — apps live inside orgs. After the build, the app is served at a *.deno.dev-style URL, and every future "git push" redeploys automatically.',
      },
      {
        label: 'What the build does',
        isText: true,
        text: [
          'The dashboard shows the build streaming through stages:',
          '→ Prepare — clone your repo, restore cache',
          '→ Install — run install (for framework/deps if any)',
          '→ Build — run your build command (if applicable)',
          '→ Warm up — sends a request to the preview URL to confirm it boots',
          '→ Route — rolls the new version out to the regions',
          '',
          'Pushes to your main branch deploy to Production; other branches get',
          'their own preview timelines.',
        ],
        note: 'Unlike Classic (which relied on GitHub Actions YAML), the new platform runs the build itself and streams logs in the UI — if a deploy fails, the failing stage is right there in the dashboard.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Deploy via the CLI (deno deploy)',
    color: '#F59E0B',
    steps: [
      {
        label: 'Deploy from your local directory',
        commands: [
          `# From your project folder, an interactive wizard walks you through it
deno deploy`,
          `# Create an app non-interactively (good for scripts/CI)
deno deploy create`,
        ],
        note: 'The "deno deploy" subcommand replaces the old "deployctl" tool. Run with no arguments to deploy the current directory to your chosen app; the first run walks you through selecting an org and app.',
      },
      {
        label: 'Create an app linked to a GitHub repo from the CLI',
        commands: [
          `deno deploy create \\
  --org my-org \\
  --app my-api \\
  --source github \\
  --owner yourname \\
  --repo deno-api \\
  --region global`,
        ],
        note: 'Providing flags runs the command non-interactively — useful for CI pipelines. --region can be us, eu, or global. For a static site you would also pass --runtime-mode static --static-dir dist --build-command "npm run build".',
      },
    ],
  },

  {
    phase: '05',
    title: 'Regions, env vars & free-tier reality',
    color: '#EF4444',
    steps: [
      {
        label: 'Choosing a region',
        isText: true,
        text: [
          'The new platform serves from two regions with an option for both:',
          '→ us — United States',
          '→ eu — Europe',
          '→ global — serve from both (lowest latency for a worldwide audience)',
          '',
          'For an India-focused student project, "global" gives the most',
          'consistent latency. Egress from more regions still counts against',
          'your single 20 GB/month free bandwidth budget.',
        ],
        note: 'There is no India region on the free tier, so expect some latency versus a truly local host. "global" is usually the best free choice for reach; pick a single region only if you specifically need it.',
      },
      {
        label: 'Environment variables & secrets',
        isText: true,
        text: [
          'Set env vars per app in the dashboard (App → Settings → Environment',
          'variables), or during "deno deploy create".',
          '',
          '→ Read them in code with Deno.env.get("NAME")',
          '→ Keep API keys/tokens here, never in your committed code',
          '→ You can set different values for production vs preview',
        ],
        note: 'Because Deno Deploy is stateless and edge-based, store persistent data in an external DB (Turso and Upstash both work great over HTTP from the edge). Do not rely on local disk — it is not persistent.',
      },
      {
        label: 'Honest limits before you commit',
        isText: true,
        text: [
          '→ Free orgs that exceed a monthly quota are PAUSED until reset. Add a',
          '  card (overage billing) or upgrade to Pro ($20/mo) to avoid pauses.',
          '→ 512 MB memory ceiling per app and a per-request CPU budget — keep',
          '  handlers light; heavy compute is not a fit',
          '→ Deployment size limit (~1 GB total files) — fine for APIs, watch it',
          '  for asset-heavy static builds',
          '→ Classic (dash.deno.com) shuts down July 20, 2026 — build new work',
          '  on console.deno.com only',
          '',
          'When to pick something else:',
          '→ Need a big traditional backend / long-running jobs → Render / Koyeb',
          '→ Need a frontend host with unlimited bandwidth → Cloudflare Pages',
        ],
        note: 'Deno Deploy is a fantastic free home for small edge APIs and webhooks, especially paired with a Cloudflare Pages frontend. Just keep each request cheap (I/O, not crunching), store state in an external DB, and stay on the new platform.',
      },
    ],
  },
]
