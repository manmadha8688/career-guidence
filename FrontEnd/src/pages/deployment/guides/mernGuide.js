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
          '→ Render         — hosts your Express/Node backend (free, sleeps when idle)',
          '→ Vercel         — hosts your React frontend (free Hobby plan, personal use)',
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
    "node": ">=20.0.0"
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
        note: 'Render uses "npm start" to run your app. The "engines" field tells Render to use Node.js 20+. Replace server.js if your entry file has a different name.',
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
        note: 'Best done BEFORE your first Vercel deploy: add vercel.json in the same push as your frontend code so routes work from day one. Create it even if you do not yet use React Router — it prevents future 404s when you add routes later. Already deployed? Add it now and push; Vercel redeploys automatically.',
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
