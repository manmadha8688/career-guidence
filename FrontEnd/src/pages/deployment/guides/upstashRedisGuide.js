export const UPSTASH_REDIS_GUIDE = [
  {
    phase: '01',
    title: 'What is Upstash Redis and why use it?',
    color: '#00E9A3',
    steps: [
      {
        label: 'Upstash — serverless Redis, pay nothing when idle',
        isText: true,
        text: [
          'Upstash Redis is a serverless, Redis-compatible database.',
          'You never run a Redis server yourself — Upstash hosts it, and it',
          'scales to zero when idle, so a hobby project costs nothing.',
          '',
          'What is Redis? An in-memory key-value store. It is blazing fast',
          'because data lives in RAM, not on disk. It is NOT your main database',
          '— it sits BESIDE your main DB (MongoDB / Postgres) for things that',
          'need to be fast and temporary.',
          '',
          'What students actually use it for:',
          '→ Caching — store the result of a slow DB query or API call for a',
          '  few minutes so repeat requests are instant',
          '→ Rate limiting — "max 5 login attempts per minute per IP"',
          '→ Sessions / OTP — short-lived tokens that expire automatically',
          '→ Leaderboards — Redis sorted sets rank scores natively',
          '→ Simple job queues — push/pop tasks between services',
          '',
          'Two ways to connect (this matters):',
          '→ REST API (HTTP) — works everywhere, including serverless/edge',
          '  functions (Vercel, Cloudflare, Deno). Use @upstash/redis.',
          '→ Redis protocol (TCP) — the classic wire protocol, for long-running',
          '  servers (Express on Render, FastAPI). Use ioredis / redis-py.',
        ],
        note: 'Upstash is the best free Redis for students because it is truly serverless — no credit card, and it costs nothing when your project is asleep. It is a companion to your main database, not a replacement for it.',
      },
      {
        label: 'The free tier — verified 2026 numbers, honest limits',
        isText: true,
        text: [
          'Upstash Redis free tier (no credit card):',
          '   256 MB max data size',
          '   500,000 commands per MONTH',
          '   10 GB monthly bandwidth',
          '   Up to 10 databases free',
          '   Max 10,000 commands/sec',
          '   Single region',
          '',
          'Note on the command limit:',
          '   Older guides mention a "10,000 commands/day" cap. That is OUTDATED.',
          '   Since March 2025 the free tier is 500K commands/MONTH (~16K/day',
          '   averaged) with no hard daily cap. Every GET, SET, INCR, EXPIRE, etc.',
          '   counts as one command.',
          '',
          'What "500K commands/month" really means:',
          '   A cache with a 5-minute TTL that gets ~10 hits/min = ~14K GETs/day',
          '   ≈ 430K/month — right at the edge. For a student demo or portfolio',
          '   project it is plenty. For a busy app, cache more aggressively.',
          '',
          'Honest gotcha (multi-region):',
          '   If you ever create a GLOBAL (multi-region) database, every write is',
          '   replicated to each read region and EACH replication counts as a',
          '   billable command. Stick to single region on the free tier.',
        ],
        note: 'Free tier = 256 MB, 500K commands/month, 10 GB bandwidth, single region, no card. When you exceed it, apps are not deleted — you are asked to add a card to switch to pay-as-you-go ($0.20 per 100K extra commands).',
      },
    ],
  },

  {
    phase: '02',
    title: 'Create your free Upstash Redis database',
    color: '#00E9A3',
    steps: [
      {
        label: 'Step-by-step: create the database and copy credentials',
        isText: true,
        text: [
          '1. Go to upstash.com → "Sign Up" (use GitHub or Google — no card)',
          '',
          '2. In the console, open the "Redis" product → "Create Database"',
          '',
          '3. Fill in:',
          '   → Name: e.g. "myapp-cache"',
          '   → Primary Region: pick the one NEAREST your backend',
          '     (for a Render backend in Singapore, choose ap-southeast-1)',
          '   → Leave it as a single region (do NOT enable "Global") on free',
          '   → Click "Create"',
          '',
          '4. On the database page, scroll to "REST API" and "Details".',
          '   You get FOUR values — you usually only need two per method:',
          '   → UPSTASH_REDIS_REST_URL   (for @upstash/redis — HTTP)',
          '   → UPSTASH_REDIS_REST_TOKEN (for @upstash/redis — HTTP)',
          '   → A redis:// (or rediss://) connection URL (for ioredis/redis-py)',
          '',
          '5. Store them as environment variables — NEVER hard-code the token:',
          '   → .env for local dev',
          '   → Render / Vercel / Koyeb env settings for production',
        ],
        note: 'The REST token is a password to your entire database. Keep it in environment variables only. If it ever leaks, click "Reset" on the database page to rotate it.',
      },
      {
        label: 'Understand the two connection formats',
        isText: true,
        text: [
          'A) REST (HTTP) — for serverless & edge:',
          '   UPSTASH_REDIS_REST_URL=https://xxxx.upstash.io',
          '   UPSTASH_REDIS_REST_TOKEN=AX...long-token...',
          '   Used by @upstash/redis (JS) and upstash-redis (Python).',
          '   Works on Vercel functions, Cloudflare Workers, Deno Deploy.',
          '',
          'B) Redis protocol (TCP) — for long-running servers:',
          '   rediss://default:PASSWORD@xxxx.upstash.io:6379',
          '   Used by ioredis (JS) and redis-py (Python).',
          '   The "rediss://" (double s) means TLS is on — always use it.',
          '',
          'Which do I pick?',
          '   → Vercel / Cloudflare / Deno / Next.js API routes → REST',
          '   → Express on Render / FastAPI / Flask / Spring Boot → either,',
          '     but the Redis protocol (TCP) is the traditional choice.',
        ],
        note: 'On serverless platforms, plain TCP Redis connections often fail or leak because functions are short-lived. That is exactly why Upstash built the REST API — it is stateless HTTP, so it just works in those environments.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Connect from Node.js',
    color: '#68A063',
    steps: [
      {
        label: 'Option A: @upstash/redis (REST) — best for serverless/edge',
        commands: [
          `npm install @upstash/redis`,
        ],
        note: 'This is the official Upstash client. It talks HTTP, so it works on Vercel, Cloudflare Workers, Next.js API routes and Deno with no connection pooling headaches.',
      },
      {
        label: 'Use @upstash/redis',
        isFile: true,
        fileName: 'redis.js',
        commands: [
          `import { Redis } from '@upstash/redis';

// Reads UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN from env
export const redis = Redis.fromEnv();

// Example: cache a value for 60 seconds
export async function cacheDemo() {
  await redis.set('greeting', 'hello', { ex: 60 }); // ex = expiry in seconds
  const value = await redis.get('greeting');
  return value; // "hello"
}`,
        ],
        note: 'Redis.fromEnv() automatically reads the two REST env vars. Or pass them explicitly: new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN }).',
      },
      {
        label: 'Option B: ioredis (TCP) — for long-running Express servers',
        commands: [
          `npm install ioredis`,
        ],
        note: 'ioredis is the popular classic Redis client. Use it when you have a persistent server (Render, a VPS) rather than short-lived serverless functions.',
      },
      {
        label: 'Use ioredis with the rediss:// URL',
        isFile: true,
        fileName: 'redisClient.js',
        commands: [
          `import Redis from 'ioredis';

// REDIS_URL = rediss://default:PASSWORD@xxxx.upstash.io:6379
const redis = new Redis(process.env.REDIS_URL);

export default redis;`,
        ],
        note: 'Create ONE client and reuse it across your app. Creating a new client per request exhausts connections fast. The "rediss://" URL already enables TLS — do not switch it to "redis://".',
      },
      {
        label: 'Real pattern: cache a slow database query',
        isFile: true,
        fileName: 'routes/products.js',
        commands: [
          `import { redis } from '../redis.js';
import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
  // 1. Try cache first
  const cached = await redis.get('products:all');
  if (cached) return res.json(cached); // instant

  // 2. Cache miss → hit the real DB (pretend this is slow)
  const products = await db.products.find();

  // 3. Store for 5 minutes so the next request is instant
  await redis.set('products:all', products, { ex: 300 });
  res.json(products);
});

export default router;`,
        ],
        note: 'This "cache-aside" pattern is the #1 use of Redis. Remember to DELETE the cache key (redis.del) whenever the underlying data changes, or users will see stale data.',
      },
      {
        label: '.env for local development',
        isFile: true,
        fileName: '.env',
        commands: [
          `# For @upstash/redis (REST)
UPSTASH_REDIS_REST_URL=https://xxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AX...your-token...

# For ioredis (TCP) — only if using Option B
REDIS_URL=rediss://default:PASSWORD@xxxx.upstash.io:6379`,
        ],
        note: 'Add .env to .gitignore. In production, set these in your host (Render/Vercel) environment settings instead of committing them.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Connect from Python',
    color: '#009688',
    steps: [
      {
        label: 'Option A: upstash-redis (REST) — for serverless',
        commands: [
          `pip install upstash-redis`,
          `pip freeze > requirements.txt`,
        ],
        note: 'The official Upstash Python client. Talks HTTP, so it works in serverless functions and anywhere outbound TCP is restricted.',
      },
      {
        label: 'Use upstash-redis',
        isFile: true,
        fileName: 'cache.py',
        commands: [
          `import os
from upstash_redis import Redis

# Reads env vars, or pass url= and token= explicitly
redis = Redis.from_env()

def cache_demo():
    redis.set("greeting", "hello", ex=60)  # expire after 60 seconds
    return redis.get("greeting")            # "hello"`,
        ],
        note: 'Redis.from_env() reads UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN. For async FastAPI, import "from upstash_redis.asyncio import Redis" and await the calls.',
      },
      {
        label: 'Option B: redis-py (TCP) — for Flask / FastAPI on a server',
        commands: [
          `pip install redis`,
          `pip freeze > requirements.txt`,
        ],
        note: 'redis-py is the standard Python Redis client. Use it with the rediss:// URL when you run a long-lived server.',
      },
      {
        label: 'Use redis-py with the rediss:// URL',
        isFile: true,
        fileName: 'redis_client.py',
        commands: [
          `import os
import redis

# REDIS_URL = rediss://default:PASSWORD@xxxx.upstash.io:6379
r = redis.from_url(os.environ["REDIS_URL"])

# Simple rate-limit helper: max 5 hits per key per minute
def allow(key: str, limit: int = 5, window: int = 60) -> bool:
    count = r.incr(key)
    if count == 1:
        r.expire(key, window)  # set TTL only on first hit
    return count <= limit`,
        ],
        note: 'from_url() handles the TLS "rediss://" scheme automatically. This tiny rate-limiter is a classic Redis use case — INCR + EXPIRE gives you a per-window counter for free.',
      },
      {
        label: '.env for local development',
        isFile: true,
        fileName: '.env',
        commands: [
          `UPSTASH_REDIS_REST_URL=https://xxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AX...your-token...
REDIS_URL=rediss://default:PASSWORD@xxxx.upstash.io:6379`,
        ],
        note: '',
      },
    ],
  },

  {
    phase: '05',
    title: 'Common use cases (copy these patterns)',
    color: '#F59E0B',
    steps: [
      {
        label: 'Caching, sessions/OTP, and rate limiting',
        isText: true,
        text: [
          '1) CACHE (cache-aside):',
          '   → GET key → if hit, return it',
          '   → if miss, query DB, then SET key value EX <seconds>',
          '   → on data change, DEL key so it re-fills fresh',
          '',
          '2) SESSIONS / OTP codes (auto-expiring):',
          '   → SET otp:<phone> "123456" EX 300   (dies in 5 min automatically)',
          '   → GET otp:<phone> to verify; DEL after successful use',
          '   → Redis TTL means you never write cleanup code',
          '',
          '3) RATE LIMITING:',
          '   → INCR ratelimit:<ip>  → on first hit also EXPIRE it (e.g. 60s)',
          '   → if the counter exceeds your limit, reject the request',
          '   → For production-grade limiting, use the @upstash/ratelimit package',
          '',
          '4) LEADERBOARD (sorted set):',
          '   → ZADD leaderboard <score> <user>',
          '   → ZREVRANGE leaderboard 0 9 WITHSCORES → top 10',
        ],
        note: 'Every one of these relies on Redis being fast + supporting TTL (auto-expiry). That auto-expiry is the killer feature: temporary data cleans itself up, unlike a normal database.',
      },
      {
        label: 'Production-grade rate limiting with @upstash/ratelimit (Node)',
        commands: [
          `npm install @upstash/ratelimit @upstash/redis`,
        ],
        note: '',
      },
      {
        label: 'Use @upstash/ratelimit',
        isFile: true,
        fileName: 'ratelimit.js',
        commands: [
          `import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '60 s'), // 5 requests / 60s
});

// In a route/middleware:
export async function guard(ip) {
  const { success } = await ratelimit.limit(ip);
  return success; // false → return HTTP 429 Too Many Requests
}`,
        ],
        note: 'This is the recommended way to rate-limit on serverless. It handles the counter + window logic and edge cases for you, and works great on Vercel/Cloudflare/Deno.',
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
          'Stay comfortably inside the free tier:',
          '→ Set a TTL (EX) on almost EVERY key — untended keys eat your 256 MB',
          '→ Cache with sensible windows (minutes, not seconds) to save commands',
          '→ Stay single-region; never enable "Global" on the free plan',
          '→ Batch where you can (MSET/MGET, pipelines) — fewer round trips',
          '',
          'Watch your usage:',
          '→ The Upstash console shows commands/day and data size live',
          '→ 500K commands/month averages ~16K/day — check the graph if unsure',
          '',
          'What happens if you exceed limits?',
          '→ Your data is NOT deleted. Upstash asks you to add a card to move to',
          '  pay-as-you-go ($0.20 per extra 100K commands, $0.25/GB storage)',
          '→ Without a card, new commands are rejected until the month resets',
          '',
          'Do NOT use Redis as your main database:',
          '→ It is in-memory and capped at 256 MB free — for permanent, relational',
          '  or document data use Neon/Postgres or MongoDB Atlas. Redis is the',
          '  fast, temporary layer in FRONT of them.',
        ],
        note: 'The single biggest free-tier mistake is forgetting TTLs — keys pile up until you hit 256 MB. Make "every key gets an EX" a habit and the free tier lasts a long time.',
      },
    ],
  },
]
