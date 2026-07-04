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
          '✅ engines field set: "node": ">=20.0.0"',
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
    "node": ">=20.0.0"
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
        note: 'Render runs "npm start" to launch your app. The engines field tells Render to use Node.js 20+. Replace server.js if your main file has a different name.',
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
          '6. Before clicking "Create Web Service", scroll to "Environment',
          '   Variables" and add MONGODB_URI and JWT_SECRET now (see Phase 14).',
          '   Deploying without them first will crash on "MongoDB connected".',
          '',
          '7. Click "Create Web Service"',
          '',
          '8. Watch the Logs tab during deployment:',
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
          '   Fix: Add "engines": { "node": ">=20.0.0" } to package.json',
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
          '  "engines": { "node": ">=20.0.0" } is set',
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
