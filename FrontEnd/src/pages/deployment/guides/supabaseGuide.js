export const SUPABASE_GUIDE = [
  {
    phase: '01',
    title: 'What is Supabase and why use it?',
    color: '#3ECF8E',
    steps: [
      {
        label: 'Supabase — PostgreSQL + Auth + Storage (free tier, pauses when idle)',
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
