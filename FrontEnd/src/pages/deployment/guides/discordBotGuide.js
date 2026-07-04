export const DISCORD_BOT_GUIDE = [
  {
    phase: '01',
    title: 'The honest truth about "free 24/7" Discord bots',
    color: '#EF4444',
    steps: [
      {
        label: 'Read this first — it will save you days of frustration',
        isText: true,
        text: [
          'Every beginner asks the same thing: "How do I host my Discord bot',
          'online for free, 24/7?" Here is the honest answer most tutorials',
          'hide from you:',
          '',
          'There are TWO completely different kinds of Discord bot, and only',
          'ONE of them can truly run free and always-on:',
          '',
          '1) A GATEWAY bot (the classic kind)',
          '   → Keeps a permanent live connection open to Discord',
          '   → Can read messages, react to events, track presence, etc.',
          '   → NEEDS a process running every second of every day',
          '   → Free hosts that "sleep" when idle DISCONNECT it → bot goes offline',
          '',
          '2) An INTERACTIONS bot (slash-command / HTTP)',
          '   → No permanent connection. Discord sends a web request only when',
          '     someone uses a /command',
          '   → Perfect fit for "serverless" hosts that are free AND always ready',
          '   → This is the one you can host truly free, forever, 24/7',
          '',
          'What changed by 2026 (be aware):',
          '→ Heroku killed its free tier years ago.',
          '→ Fly.io removed its free tier for new accounts.',
          '→ Render / Replit free tiers SLEEP after inactivity → bad for gateway',
          '  bots.',
          '',
          'So: if you want a genuinely free, always-online bot, build an',
          'INTERACTIONS bot on Cloudflare Workers (Path A). It is the honest',
          'winner. We also cover the gateway bot (Path B) honestly, including',
          'where it actually can and cannot run free.',
        ],
        note: 'Nobody can give you a free, always-on GATEWAY bot in 2026 without a workaround that eventually breaks. But a slash-command (interactions) bot on Cloudflare Workers is truly free, truly always-on. Choose that if you can.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Pick your path — A (recommended) or B',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Which one should YOU build?',
        isText: true,
        text: [
          'PATH A — Slash-command bot on Cloudflare Workers  ✅ recommended',
          '   Best for: a portfolio bot that is online 24/7 and costs nothing.',
          '   You get: /commands that respond instantly, buttons, embeds.',
          '   Free reality: genuinely free forever, no card, always awake.',
          '   Trade-off: it only reacts to interactions (slash commands, button',
          '   clicks). It cannot passively read every message in a channel.',
          '',
          'PATH B — Classic gateway bot (discord.py / discord.js)',
          '   Best for: learning the classic library, reading message events,',
          '   music bots, moderation that watches all messages.',
          '   Free reality: NO free host keeps it online 24/7 reliably in 2026.',
          '   Honest options: run it for demos on a sleeping free host, or use',
          '   Oracle Cloud\'s Always-Free VM (real 24/7, but more setup).',
          '',
          'If your goal is "a live bot I can show recruiters, free, always on"',
          '→ do Path A (Phases 03–06).',
          'If your goal is "learn discord.py / read messages" → do Path B',
          '(Phases 07–09) and accept the hosting honesty.',
        ],
        note: 'Most students should pick Path A. It is the only option that is honestly free AND honestly always-online. Path B is for when you specifically need to read message content or use the classic libraries.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Create your Discord application (both paths need this)',
    color: '#5865F2',
    steps: [
      {
        label: 'Register the app and get your keys',
        isText: true,
        text: [
          '1. Go to discord.com/developers/applications',
          '2. Click "New Application", give it a name → "Create"',
          '3. On the "General Information" page, copy and save:',
          '   → APPLICATION ID (also called Client ID)',
          '   → PUBLIC KEY (Path A uses this to verify requests)',
          '',
          '4. Open the "Bot" tab (left sidebar):',
          '   → Click "Reset Token" → copy the BOT TOKEN and save it somewhere',
          '     safe. This is a password — treat it like one.',
          '',
          'You now have three values. Which you use depends on your path:',
          '   Application ID → both paths (registering commands)',
          '   Public Key     → Path A (verifying Discord\'s requests)',
          '   Bot Token      → both paths (talking to Discord\'s API)',
        ],
        note: 'The BOT TOKEN is a full password to your bot. If it ever leaks, anyone can control your bot. If that happens, click "Reset Token" immediately — the old one dies instantly.',
      },
      {
        label: 'Invite the bot to a test server',
        isText: true,
        text: [
          '1. In the developer portal → "OAuth2" → "URL Generator"',
          '2. Under SCOPES tick:  applications.commands   (and  bot  for Path B)',
          '3. For Path B, tick the bot permissions you need (e.g. Send Messages)',
          '4. Copy the generated URL at the bottom, open it in your browser',
          '5. Pick a server you own (make a private test server) → "Authorize"',
          '',
          'The bot now appears in your server\'s member list (offline until you',
          'deploy it — that is normal).',
        ],
        note: 'Create a throwaway private server just for testing. You do not want to spam a real community while you are learning.',
      },
    ],
  },

  {
    phase: '04',
    title: 'PATH A · Build the slash-command bot (Cloudflare Workers)',
    color: '#F6821F',
    steps: [
      {
        label: 'Why Cloudflare Workers is the honest free winner',
        isText: true,
        text: [
          'Cloudflare Workers runs small pieces of code on Cloudflare\'s global',
          'network. It does not "sleep" — there is no server to keep awake. When',
          'a slash command fires, Discord sends a web request, your Worker runs',
          'for a few milliseconds, replies, and stops.',
          '',
          'Free tier reality: 100,000 requests per DAY, free forever, no credit',
          'card. A student bot will never come close to that.',
          '',
          'Discord officially supports this and even publishes a sample app:',
          '   github.com/discord/cloudflare-sample-app',
          '',
          'What you will do:',
          '→ Make a tiny Worker project',
          '→ Verify each request really came from Discord (a security step',
          '  Discord requires)',
          '→ Answer PING with PONG, and answer your /commands',
        ],
        note: 'No sleeping, no keep-alive hacks, no card. This is the one path in this whole guide that is honestly free AND honestly online 24/7.',
      },
      {
        label: 'Set up the Worker project',
        commands: [
          `# Create a Cloudflare Worker project (choose "Hello World" TS/JS)
npm create cloudflare@latest my-discord-bot`,
          `cd my-discord-bot`,
          `# Discord's helper for verifying + typing interactions
npm install discord-interactions`,
        ],
        note: 'This uses Wrangler, Cloudflare\'s free CLI, which the create-cloudflare command sets up for you. Sign in when it prompts (it opens a browser) — the Cloudflare account is free.',
      },
      {
        label: 'Write the Worker — src/index.js',
        isFile: true,
        fileName: 'src/index.js',
        commands: [
          `import { verifyKey, InteractionType, InteractionResponseType } from 'discord-interactions'

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('Bot is running', { status: 200 })
    }

    // 1) Verify the request truly came from Discord (required)
    const signature = request.headers.get('x-signature-ed25519')
    const timestamp = request.headers.get('x-signature-timestamp')
    const body = await request.text()
    const valid = signature && timestamp &&
      (await verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY))
    if (!valid) return new Response('Bad request signature', { status: 401 })

    const interaction = JSON.parse(body)

    // 2) Discord's health check — must reply PONG
    if (interaction.type === InteractionType.PING) {
      return json({ type: InteractionResponseType.PONG })
    }

    // 3) A slash command was used
    if (interaction.type === InteractionType.APPLICATION_COMMAND) {
      const name = interaction.data.name
      if (name === 'hello') {
        return json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: { content: 'Hello! I am alive on Cloudflare Workers, free and 24/7.' },
        })
      }
    }

    return new Response('Unknown interaction', { status: 400 })
  },
}

function json(data) {
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json' },
  })
}`,
        ],
        note: 'The signature check is not optional — Discord sends test requests with bad signatures and will reject your endpoint if you do not return 401 for them.',
      },
      {
        label: 'Register the /hello command (run once) — register.js',
        isFile: true,
        fileName: 'register.js',
        commands: [
          `// Run locally once to tell Discord your command exists:
//   node register.js
// Reads DISCORD_TOKEN and DISCORD_APP_ID from your shell environment.

const commands = [
  { name: 'hello', description: 'Say hello from the bot' },
]

const url = \`https://discord.com/api/v10/applications/\${process.env.DISCORD_APP_ID}/commands\`

const res = await fetch(url, {
  method: 'PUT',
  headers: {
    Authorization: \`Bot \${process.env.DISCORD_TOKEN}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(commands),
})

console.log(res.status, await res.text())`,
        ],
        note: 'Registering commands is separate from hosting the bot. You run this script once (and again whenever you add/rename a command). Global commands can take up to an hour to appear; per-guild commands appear instantly (see the Discord docs).',
      },
    ],
  },

  {
    phase: '05',
    title: 'PATH A · Deploy to Cloudflare and connect it to Discord',
    color: '#F6821F',
    steps: [
      {
        label: 'Add your secrets to the Worker',
        commands: [
          `# Your Discord app's PUBLIC KEY (from the portal, Phase 03)
npx wrangler secret put DISCORD_PUBLIC_KEY`,
          `# (Optional) token if your Worker calls Discord's API
npx wrangler secret put DISCORD_TOKEN`,
        ],
        note: 'wrangler secret stores values encrypted in Cloudflare — they never appear in your code or on GitHub. It will prompt you to paste each value.',
      },
      {
        label: 'Deploy the Worker',
        commands: [
          `npx wrangler deploy`,
        ],
        note: 'When it finishes, Wrangler prints your Worker URL, e.g. https://my-discord-bot.your-name.workers.dev — copy it, you need it in the next step.',
      },
      {
        label: 'Point Discord at your Worker',
        isText: true,
        text: [
          '1. Register your commands (from Phase 04):',
          '   set DISCORD_APP_ID and DISCORD_TOKEN in your shell, then:',
          '      node register.js',
          '',
          '2. Go back to discord.com/developers/applications → your app',
          '3. On "General Information", find "Interactions Endpoint URL"',
          '4. Paste your Worker URL and click "Save Changes"',
          '',
          'Discord immediately sends a PING to test it. If your Worker replies',
          'PONG (it will, from Phase 04), Discord accepts and saves the URL.',
          '',
          '5. In your test server, type "/" and you should see /hello. Run it —',
          '   the bot replies instantly, and it will keep working 24/7 with',
          '   nothing running on your side.',
        ],
        note: 'If Discord refuses to save the URL, it means the PING failed the signature check. Re-check that DISCORD_PUBLIC_KEY matches the Public Key in the portal exactly.',
      },
    ],
  },

  {
    phase: '06',
    title: 'PATH A · What it can and cannot do (be honest with yourself)',
    color: '#22D3EE',
    steps: [
      {
        label: 'The real limits of an interactions bot',
        isText: true,
        text: [
          '✅ CAN do:',
          '   → Slash commands (/ping, /weather, /help, …)',
          '   → Buttons, select menus, modals (pop-up forms)',
          '   → Rich embeds, ephemeral (private) replies',
          '   → Call other APIs and return the result',
          '',
          '🚫 CANNOT do (needs a gateway bot — Path B):',
          '   → Read every message people type (no "message content" stream)',
          '   → React to someone joining/leaving, typing, presence changes',
          '   → Play music in a voice channel',
          '',
          'If your bot idea is "respond when someone runs a command" → Path A is',
          'perfect. If it is "watch the chat and react" → you need Path B.',
        ],
        note: 'A huge number of useful bots are 100% command-driven (utilities, lookups, games, forms). For those, you now have a free, always-on bot with zero hosting cost — done.',
      },
    ],
  },

  {
    phase: '07',
    title: 'PATH B · Build a classic gateway bot (discord.py)',
    color: '#5865F2',
    steps: [
      {
        label: 'A minimal discord.py bot — bot.py',
        isFile: true,
        fileName: 'bot.py',
        commands: [
          `import os
import discord
from discord import app_commands

intents = discord.Intents.default()
# Only enable message_content if you truly need to read message text,
# and also switch it ON in the Developer Portal → Bot → Privileged Intents.
# intents.message_content = True

class MyBot(discord.Client):
    def __init__(self):
        super().__init__(intents=intents)
        self.tree = app_commands.CommandTree(self)

    async def setup_hook(self):
        await self.tree.sync()  # register slash commands with Discord

bot = MyBot()

@bot.tree.command(name="hello", description="Say hello")
async def hello(interaction: discord.Interaction):
    await interaction.response.send_message("Hello from a gateway bot!")

@bot.event
async def on_ready():
    print(f"Logged in as {bot.user}")

bot.run(os.environ["DISCORD_TOKEN"])`,
        ],
        note: 'This uses slash commands via the gateway. Reading raw message text needs the privileged "Message Content Intent" — turn it on in the portal AND in code, and only if you genuinely need it.',
      },
      {
        label: 'requirements.txt and local run',
        isFile: true,
        fileName: 'requirements.txt',
        commands: [
          `discord.py`,
        ],
        note: 'Install with: pip install -r requirements.txt',
      },
      {
        label: 'Run it locally with your token kept out of the code',
        isText: true,
        text: [
          'Never write your token inside bot.py. Set it as an environment',
          'variable instead, then run:',
          '',
          'Windows PowerShell:',
          '   $env:DISCORD_TOKEN="your-token-here"',
          '   python bot.py',
          '',
          'Mac / Linux:',
          '   export DISCORD_TOKEN="your-token-here"',
          '   python bot.py',
          '',
          'When you see "Logged in as ..." and /hello works in your server, the',
          'bot is correct. Now the real question: where does it live 24/7?',
        ],
        note: 'Keep the token in an environment variable, never in the source. If you use a .env file locally, add .env to .gitignore so it never reaches GitHub.',
      },
    ],
  },

  {
    phase: '08',
    title: 'PATH B · Where a gateway bot can actually run (the honest map)',
    color: '#F97316',
    steps: [
      {
        label: 'Option 1 — Render free (great for DEMO, not real 24/7)',
        isText: true,
        text: [
          'Render\'s free tier is the easiest place to put a gateway bot, but be',
          'honest about what it is: a demo host, not a 24/7 one.',
          '',
          'Reality:',
          '→ Free web services SLEEP after ~15 minutes of no web traffic. A bot',
          '  has no web traffic, so it sleeps → goes offline.',
          '→ The common "fix" is to add a tiny web server to your bot and ping it',
          '  every few minutes (UptimeRobot / cron-job.org) to keep it awake.',
          '  This works... mostly... and breaks sometimes. It is a workaround,',
          '  not a guarantee.',
          '',
          'Honest verdict: perfect for "turn it on to demo in an interview", not',
          'for a community that needs the bot up at 3 AM.',
        ],
        note: 'It is fine to say on your resume "hosted on Render free tier for demos". Do not claim guaranteed 24/7 uptime on a free sleeping host — an interviewer who knows hosting will catch that.',
      },
      {
        label: 'Option 2 — Oracle Cloud Always Free (real 24/7, more setup)',
        isText: true,
        text: [
          'If you genuinely need a gateway bot online 24/7 for free, the honest',
          'answer in 2026 is a free virtual machine that never sleeps. Oracle',
          'Cloud offers an "Always Free" VM that fits.',
          '',
          'The trade-offs (be prepared):',
          '→ Sign-up asks for a card for identity verification (Always-Free',
          '  resources are not charged, but the friction is real).',
          '→ You manage a Linux server yourself: SSH in, install Python, and run',
          '  the bot under a process manager (systemd or pm2) so it auto-restarts.',
          '→ It is more work than clicking "Deploy" — but it is truly free and',
          '  truly always-on.',
          '',
          'This is the "grown-up" free option. If you are up for learning a',
          'little Linux, it is the real deal.',
        ],
        note: 'A free VM + a process manager (systemd/pm2) is the only honestly-free way to keep a gateway bot online 24/7 in 2026. Everything else free either sleeps or costs money.',
      },
      {
        label: 'Option 3 — just pay a little (when the bot matters)',
        isText: true,
        text: [
          'If a bot becomes something people actually rely on, the honest advice',
          'is: stop fighting free tiers. A Railway hobby plan or a $3–5/month VPS',
          '(Hetzner, DigitalOcean, Vultr) runs a gateway bot rock-solid with a',
          'process manager. Cheaper than the time you will spend nursing hacks.',
          '',
          'For a student portfolio, you do NOT need this — Path A (free) or a',
          'Render demo is plenty to show the skill.',
        ],
        note: 'This is only worth it once real users depend on the bot. For learning and showcasing, stick to the free paths.',
      },
    ],
  },

  {
    phase: '09',
    title: 'Keep your token safe + choose your path with confidence',
    color: '#34D399',
    steps: [
      {
        label: 'Token safety — the one rule you cannot break',
        isText: true,
        text: [
          '→ NEVER commit your bot token to GitHub. Put it in an environment',
          '  variable or a .gitignored .env, never in the code.',
          '→ On any host, add the token in the dashboard\'s "Environment" /',
          '  "Secrets" section — not in a file you push.',
          '→ If it leaks (pushed by accident, pasted in a screenshot): go to the',
          '  Developer Portal → Bot → "Reset Token" NOW. The old token dies',
          '  instantly and bots scanning GitHub can no longer use it.',
        ],
        note: 'Discord automatically invalidates tokens it detects in public GitHub repos — but do not rely on that. Reset the token yourself the moment it is exposed.',
      },
      {
        label: 'Final honest recommendation',
        isText: true,
        text: [
          'For a free, always-on bot to showcase → Path A (Cloudflare Workers).',
          'For learning discord.py / reading messages → Path B, hosted on:',
          '   • Render free  → for interview demos (accept the sleeping)',
          '   • Oracle Always-Free VM → if you want real 24/7 for free',
          '   • a cheap VPS → once real people depend on it',
          '',
          'Whatever you pick, put the repo link + a short GIF of the bot working',
          'on your resume. A working bot — even a simple one — is a memorable',
          'portfolio piece because it shows you can integrate with a real API.',
        ],
        note: 'The best bot for your portfolio is the one that is actually online when a recruiter clicks. That is why Path A wins for most students: it is always there, and it costs nothing.',
      },
    ],
  },
]
