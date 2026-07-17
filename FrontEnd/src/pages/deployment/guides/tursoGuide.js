export const TURSO_GUIDE = [
  {
    phase: '01',
    title: 'What is Turso and why use it?',
    color: '#4FF8D2',
    steps: [
      {
        label: 'Turso — SQLite at the edge, no server to run',
        isText: true,
        text: [
          'Turso is a hosted database built on libSQL — an open-source fork of',
          'SQLite made for the cloud. You get the simplicity of SQLite with a',
          'real hosted database you can reach from anywhere over the network.',
          '',
          'What is SQLite? The most-used database on earth — a single file, zero',
          'config, rock-solid SQL. The catch: plain SQLite is a local file, so it',
          'is awkward to share between a deployed server and your laptop. Turso',
          'fixes that by hosting libSQL and giving you a URL + auth token.',
          '',
          'What libSQL adds on top of SQLite:',
          '→ Remote access over HTTP/WebSocket (a URL + token, not a file path)',
          '→ Edge replicas — reads served from a location near your users',
          '→ Embedded replicas — a local SQLite file that syncs from the cloud',
          '  (reads are local-fast, writes go to the cloud and sync back)',
          '→ Still plain SQL — everything you know about SQLite works',
          '',
          'When to reach for Turso:',
          '→ You like SQLite and want it hosted for a deployed app',
          '→ Edge / serverless apps (Vercel, Cloudflare, Deno) that want low',
          '  read latency without a heavy Postgres',
          '→ Small-to-medium projects, MVPs, side projects, learning SQL',
          '→ Drizzle ORM projects (Drizzle has first-class libSQL support)',
        ],
        note: 'Think of Turso as "SQLite you can deploy". If your app is small and you love how simple SQLite is, Turso lets you keep that simplicity in production without managing a database server.',
      },
      {
        label: 'The free tier — verified 2026 numbers',
        isText: true,
        text: [
          'Turso free tier (no credit card):',
          '   5 GB total storage',
          '   Up to 100 databases',
          '   500 million row READS per month',
          '   10 million row WRITES per month',
          '   3 GB of monthly syncs (for embedded replicas)',
          '   No cold starts — databases stay responsive (removed in 2025)',
          '',
          'How the limits are counted:',
          '   Turso meters "rows read" and "rows written", NOT queries. One SELECT',
          '   that scans 1,000 rows counts as 1,000 row reads. Good indexes keep',
          '   this number low; a query with no WHERE/index can read the whole table.',
          '',
          'What this means in practice:',
          '   500M row reads/month is genuinely generous for a student project —',
          '   you would need a fairly busy app with poor indexing to hit it. Add',
          '   indexes on the columns you filter/join on and you will be fine.',
          '',
          'Next step up (honest):',
          '   Developer plan is $4.99/month (billed yearly) → 2.5B reads, 9 GB.',
          '   The free tier is not a trial; it does not expire.',
        ],
        note: 'Turso meters ROWS read/written, not the number of queries — so indexing matters. A missing index turns one query into a full-table scan and burns through your row-read budget. This is the single most useful thing to know about staying free.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Install the Turso CLI & create a database',
    color: '#4FF8D2',
    steps: [
      {
        label: 'Install the Turso CLI and sign up',
        commands: [
          `# macOS / Linux
curl -sSfL https://get.tur.so/install.sh | bash`,
          `# Windows: install via WSL (Ubuntu) and run the same script,
# or use npm (works cross-platform):
npm install -g turso`,
          `# Sign up / log in (opens your browser)
turso auth signup`,
        ],
        note: 'On native Windows the recommended path is WSL. If you prefer to stay in PowerShell, the "npm install -g turso" package wraps the CLI. After signup, "turso auth login" reconnects on a new machine.',
      },
      {
        label: 'Create a database and inspect it',
        commands: [
          `# Create a database (Turso picks a nearby region)
turso db create myapp`,
          `# See its details, including the libSQL URL
turso db show myapp`,
          `# Open an interactive SQL shell against it
turso db shell myapp`,
        ],
        note: 'turso db create spins up a libSQL database in seconds. "turso db show" prints the URL that looks like libsql://myapp-<org>.turso.io — that is your connection URL.',
      },
      {
        label: 'Get the URL and an auth token',
        commands: [
          `# The database URL (libsql://...)
turso db show myapp --url`,
          `# Create an auth token for that database
turso db tokens create myapp`,
        ],
        note: 'You need TWO values to connect: the libsql:// URL and an auth token. Store them as TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in your environment — never commit the token.',
      },
      {
        label: 'Create a table (SQL is plain SQLite)',
        commands: [
          `# Run SQL directly from the CLI
turso db shell myapp "CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);"`,
          `# Add an index on the column you filter by (keeps row-reads low)
turso db shell myapp "CREATE INDEX idx_users_email ON users(email);"`,
        ],
        note: 'It is 100% standard SQLite SQL — no new dialect to learn. Adding indexes on columns you query is the key to staying inside the free row-read budget.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Connect from Node.js with @libsql/client',
    color: '#68A063',
    steps: [
      {
        label: 'Install the official libSQL client',
        commands: [
          `npm install @libsql/client`,
        ],
        note: 'This is the official client for Turso/libSQL. It works in Node, and there is an edge-friendly import (@libsql/client/web) for Cloudflare Workers and other edge runtimes.',
      },
      {
        label: 'Create a client and query',
        isFile: true,
        fileName: 'db.js',
        commands: [
          `import { createClient } from '@libsql/client';

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL,   // libsql://myapp-org.turso.io
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// SELECT
export async function getUsers() {
  const result = await db.execute('SELECT * FROM users');
  return result.rows;
}

// INSERT with safe placeholders (prevents SQL injection)
export async function addUser(name, email) {
  await db.execute({
    sql: 'INSERT INTO users (name, email) VALUES (?, ?)',
    args: [name, email],
  });
}`,
        ],
        note: 'Always use the { sql, args } form with ? placeholders for user input — never string-concatenate values into SQL. Create the client once and reuse it across your app.',
      },
      {
        label: 'Use it in an Express route',
        isFile: true,
        fileName: 'routes/users.js',
        commands: [
          `import express from 'express';
import { db } from '../db.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const result = await db.execute('SELECT * FROM users');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  await db.execute({
    sql: 'INSERT INTO users (name, email) VALUES (?, ?)',
    args: [name, email],
  });
  res.status(201).json({ ok: true });
});

export default router;`,
        ],
        note: 'On the free tier with no cold starts, the first query after idle is still fast — there is no wake-up delay like some serverless databases have.',
      },
      {
        label: '.env for local development',
        isFile: true,
        fileName: '.env',
        commands: [
          `TURSO_DATABASE_URL=libsql://myapp-yourorg.turso.io
TURSO_AUTH_TOKEN=ey...your-token...`,
        ],
        note: 'Add .env to .gitignore. In production set these in your host (Vercel/Render/Koyeb) environment settings.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Use Turso with Drizzle ORM',
    color: '#F59E0B',
    steps: [
      {
        label: 'Why Drizzle + Turso is a great combo',
        isText: true,
        text: [
          'Drizzle is a lightweight TypeScript ORM with first-class libSQL support.',
          'You define your tables in TypeScript, get full type-safety on queries,',
          'and Drizzle generates SQL migrations for you.',
          '',
          'Good fit when:',
          '→ You use TypeScript and want autocomplete on your queries',
          '→ You want versioned schema migrations instead of hand-written SQL',
          '→ You are building a Next.js / Node API on the edge',
        ],
        note: 'Drizzle is much lighter than Prisma and pairs naturally with SQLite/libSQL. If you are on plain JS and just want to run SQL, the raw @libsql/client from Phase 03 is perfectly fine on its own.',
      },
      {
        label: 'Install Drizzle',
        commands: [
          `npm install drizzle-orm @libsql/client`,
          `npm install -D drizzle-kit`,
        ],
        note: 'drizzle-orm is the runtime; drizzle-kit is the dev tool that generates and pushes migrations.',
      },
      {
        label: 'Define your schema',
        isFile: true,
        fileName: 'src/schema.js',
        commands: [
          `import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});`,
        ],
        note: 'Use the sqlite-core imports (not postgres-core) — libSQL is SQLite under the hood.',
      },
      {
        label: 'Create the Drizzle client',
        isFile: true,
        fileName: 'src/db.js',
        commands: [
          `import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema.js';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });

// Type-safe query
// const allUsers = await db.select().from(schema.users);`,
        ],
        note: 'Push your schema to Turso with "npx drizzle-kit push" (needs a drizzle.config.js pointing at your schema and the Turso URL/token). After that, db.select()/insert() are fully typed.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Local dev & embedded replicas (optional superpower)',
    color: '#A78BFA',
    steps: [
      {
        label: 'Two ways to develop locally',
        isText: true,
        text: [
          'A) Just point at your Turso cloud database (simplest):',
          '   Use the same TURSO_DATABASE_URL + TURSO_AUTH_TOKEN locally.',
          '   Every query goes over the network to Turso. Easy, always in sync.',
          '',
          'B) Embedded replica (advanced, very fast reads):',
          '   Keep a local SQLite FILE that syncs from your Turso cloud DB.',
          '   → Reads hit the local file (microseconds, no network)',
          '   → Writes go to the cloud, then sync back down',
          '   This is unique to libSQL and great for read-heavy apps.',
        ],
        note: 'Start with option A while learning — it is the least surprising. Reach for embedded replicas only when read latency actually matters.',
      },
      {
        label: 'Embedded replica in Node',
        isFile: true,
        fileName: 'db.replica.js',
        commands: [
          `import { createClient } from '@libsql/client';

export const db = createClient({
  url: 'file:local.db',                  // local SQLite file (the replica)
  syncUrl: process.env.TURSO_DATABASE_URL, // the Turso cloud DB
  authToken: process.env.TURSO_AUTH_TOKEN,
  syncInterval: 60,                       // auto-sync every 60s (optional)
});

// Pull the latest from the cloud on startup
await db.sync();`,
        ],
        note: 'With an embedded replica, reads come from local.db (fast) and writes are sent to the cloud and replicated back. Call db.sync() to refresh on demand, or set syncInterval for periodic syncing. Syncs count against your 3 GB/month free sync budget.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Free-tier reality & best practices',
    color: '#EF4444',
    steps: [
      {
        label: 'Honest advice before you ship',
        isText: true,
        text: [
          'Stay inside the free tier:',
          '→ INDEX the columns you filter/join on — this is the #1 way to keep',
          '  row-reads (your main free-tier metric) low',
          '→ Avoid SELECT * on huge tables; select only the columns you need',
          '→ Use LIMIT for lists/pagination instead of reading everything',
          '→ Keep total data under 5 GB (SQLite is compact, so this is roomy)',
          '',
          'Watch usage:',
          '→ The Turso dashboard shows rows read/written and storage per DB',
          '→ 500M reads/month is a lot — but a single un-indexed query looping',
          '  over a big table in a hot endpoint can eat it, so index first',
          '',
          'Honest limits:',
          '→ Turso is SQLite semantics: great for most apps, but heavy concurrent',
          '  WRITE workloads suit Postgres better. Reads scale beautifully.',
          '→ The free tier does not expire, but exceeding a metric can BLOCK',
          '  further queries on that metric until the month resets (or you',
          '  upgrade to Developer at $4.99/mo). Your data is safe either way.',
          '',
          'When to pick something else:',
          '→ Need relational Postgres features / heavy writes → Neon',
          '→ Need document/NoSQL → MongoDB Atlas',
          '→ Need a fast cache, not a primary DB → Upstash Redis',
        ],
        note: 'Turso rewards good SQL habits: index your filter columns and select only what you need. Do that and the free tier comfortably covers a student project or MVP.',
      },
    ],
  },
]
