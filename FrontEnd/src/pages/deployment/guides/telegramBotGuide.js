export const TELEGRAM_BOT_GUIDE = [
  {
    phase: '01',
    title: 'The honest truth — polling vs webhook, and "free 24/7"',
    color: '#EF4444',
    steps: [
      {
        label: 'Read this first — it decides where your bot can live free',
        isText: true,
        text: [
          'A Telegram bot receives messages in one of two ways. Which you choose',
          'decides whether it can run truly free AND always-on:',
          '',
          '1) POLLING (getUpdates) — the classic, easy way',
          '   Your program runs in a loop, constantly ASKING Telegram "any new',
          '   messages?". Simple to code locally, but it NEEDS a process running',
          '   every second. On free hosts that "sleep" when idle, polling dies →',
          '   bot goes offline. It also cannot run on serverless (there is no',
          '   long-lived process).',
          '',
          '2) WEBHOOK — the deploy-friendly way',
          '   You give Telegram a public URL. When someone messages your bot,',
          '   Telegram sends an HTTP POST to that URL. No loop, no always-running',
          '   process needed. This is the shape that fits FREE serverless hosting.',
          '',
          'The 2026 reality for free hosting:',
          '→ Cloudflare Workers — serverless, NEVER sleeps, 100,000 requests/day',
          '  free. A webhook bot here is genuinely free AND always-on. ✅ (Path A)',
          '→ Render free web service — runs Python easily, but SLEEPS after ~15 min',
          '  idle. Fine for a demo; needs a keep-alive ping for real uptime. (Path B)',
          '',
          'So: for a truly free, always-online bot, use a WEBHOOK on Cloudflare',
          'Workers (Path A). If you specifically want python-telegram-bot, use',
          'Render (Path B) and be honest about the sleeping.',
        ],
        note: 'The single most important choice: webhook, not polling, for any free deployment. Polling needs a process that never stops — no free host guarantees that. A webhook on Cloudflare Workers is the honest winner for free + always-on.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Create your bot with BotFather (both paths need this)',
    color: '#26A5E4',
    steps: [
      {
        label: 'Get your bot token from BotFather',
        isText: true,
        text: [
          '1. Open Telegram and search for "BotFather" (the verified one, blue tick)',
          '2. Start a chat → send: /newbot',
          '3. Give it a display NAME (e.g. My Helper Bot)',
          '4. Give it a USERNAME that ends in "bot" (e.g. my_helper_bot)',
          '5. BotFather replies with your BOT TOKEN — a long string like:',
          '   123456789:AAExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          '',
          'That token is a PASSWORD to your bot. Save it somewhere safe. Anyone who',
          'has it can control your bot completely.',
          '',
          'Handy BotFather commands for later:',
          '   /setdescription  — the text shown before a user starts the bot',
          '   /setcommands     — the / command menu users see',
          '   /token           — reveal the token again',
          '   /revoke          — kill the old token and get a new one (if leaked)',
        ],
        note: 'Treat the bot token like a password. Never paste it into your code or a public repo. If it ever leaks, run /revoke in BotFather immediately — the old token dies and the leaked one becomes useless.',
      },
    ],
  },

  {
    phase: '03',
    title: 'PATH A · Build the webhook bot on Cloudflare Workers',
    color: '#F6821F',
    steps: [
      {
        label: 'Why Cloudflare Workers is the honest free winner',
        isText: true,
        text: [
          'Cloudflare Workers runs small pieces of code on Cloudflare\'s global',
          'network. There is no server to keep awake — when Telegram sends a',
          'webhook POST, your Worker runs for a few milliseconds, replies, and',
          'stops. No sleeping, no keep-alive hacks.',
          '',
          'Free tier: 100,000 requests/day, free forever, no credit card. A student',
          'bot will never come close.',
          '',
          'What you will do:',
          '→ Create a tiny Worker project (JavaScript)',
          '→ Handle Telegram\'s POST and reply to messages',
          '→ Register the webhook so Telegram knows your Worker URL',
        ],
        note: 'This is the one path that is honestly free AND honestly online 24/7. The trade-off: you write the bot in JavaScript (not python-telegram-bot). For most command bots that is totally fine.',
      },
      {
        label: 'Create the Worker project',
        commands: [
          `# Create a Cloudflare Worker (choose "Hello World" JS/TS)
npm create cloudflare@latest my-telegram-bot`,
          `cd my-telegram-bot`,
        ],
        note: 'This sets up Wrangler, Cloudflare\'s free CLI. Sign in when prompted (it opens a browser) — the Cloudflare account is free, no card.',
      },
      {
        label: 'Write the Worker — src/index.js',
        isFile: true,
        fileName: 'src/index.js',
        commands: [
          `export default {
  async fetch(request, env) {
    // Telegram sends updates as POST requests
    if (request.method !== 'POST') {
      return new Response('Telegram bot is running')
    }

    const update = await request.json()
    const msg = update.message
    if (msg && msg.text) {
      const chatId = msg.chat.id
      let reply = 'I only know /start and /hello for now.'
      if (msg.text === '/start') reply = 'Hi! I am alive on Cloudflare Workers, free and 24/7.'
      if (msg.text === '/hello') reply = 'Hello ' + (msg.from.first_name || 'there') + '!'

      await sendMessage(env.BOT_TOKEN, chatId, reply)
    }

    // Always reply 200 quickly so Telegram does not retry
    return new Response('ok')
  },
}

async function sendMessage(token, chatId, text) {
  await fetch(\`https://api.telegram.org/bot\${token}/sendMessage\`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  })
}`,
        ],
        note: 'The token is read from env.BOT_TOKEN (a Worker secret, next step) — never hardcoded. Always return a 200 response quickly; if you take too long or error, Telegram keeps re-sending the same update.',
      },
      {
        label: 'Add the token as a secret and deploy',
        commands: [
          `# Store the bot token encrypted in Cloudflare (paste it when prompted)
npx wrangler secret put BOT_TOKEN`,
          `# Deploy the Worker
npx wrangler deploy`,
        ],
        note: 'wrangler secret keeps the token out of your code and off GitHub. After deploy, Wrangler prints your Worker URL, e.g. https://my-telegram-bot.your-name.workers.dev — copy it for the next phase.',
      },
    ],
  },

  {
    phase: '04',
    title: 'PATH A · Register the webhook and test',
    color: '#F6821F',
    steps: [
      {
        label: 'Point Telegram at your Worker with setWebhook',
        commands: [
          `# Tell Telegram to send updates to your Worker URL.
# Replace <TOKEN> and the URL with your real values.
curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://my-telegram-bot.your-name.workers.dev"`,
        ],
        note: 'You only run setWebhook ONCE (or again if the URL changes). On Windows PowerShell, curl works, or use Invoke-RestMethod. A successful response is {"ok":true,"result":true,"description":"Webhook was set"}.',
      },
      {
        label: 'Verify and troubleshoot the webhook',
        commands: [
          `# Check the webhook status and any recent delivery errors
curl "https://api.telegram.org/bot<TOKEN>/getWebhookInfo"`,
        ],
        note: 'getWebhookInfo shows the registered URL and, crucially, last_error_message if Telegram could not reach your Worker. Empty error + your URL = healthy. To switch back to local polling later, call /deleteWebhook first (polling and webhook cannot both be active).',
      },
      {
        label: 'Test it',
        isText: true,
        text: [
          '1. Open Telegram, search your bot\'s @username, press Start',
          '2. Send /start → it should reply instantly',
          '3. Send /hello → it greets you by name',
          '',
          'It now works 24/7 with nothing running on your side. Cloudflare only',
          'runs your code for the milliseconds it takes to answer each message.',
        ],
        note: 'If nothing happens: run getWebhookInfo (previous step) and read last_error_message. Common causes: wrong URL, the Worker erroring (check "npx wrangler tail" for live logs), or a typo in the token.',
      },
    ],
  },

  {
    phase: '05',
    title: 'PATH B · python-telegram-bot on Render (webhook)',
    color: '#68A063',
    steps: [
      {
        label: 'When to choose this path (and its honest catch)',
        isText: true,
        text: [
          'Choose Path B if you specifically want to use python-telegram-bot — the',
          'popular Python library — maybe because your logic is in Python, or you',
          'are learning it for a course.',
          '',
          'The honest catch: Render\'s free web service SLEEPS after ~15 minutes of',
          'no incoming traffic. A sleeping service misses webhooks until it wakes',
          '(the first message after idle is delayed while it spins up). So free',
          'Render is great for DEMOS, and okay for real use only with a keep-alive',
          'ping (Phase 06). It is not a guaranteed always-on host like Cloudflare.',
          '',
          'We still use WEBHOOK mode (not polling) because Render free needs a web',
          'server responding to health checks anyway — a webhook fits that perfectly.',
        ],
        note: 'Be honest on your resume: "hosted on Render free tier (demo)" is fine. For guaranteed 24/7 free, Path A (Cloudflare) is the honest choice.',
      },
      {
        label: 'The bot — app.py (webhook mode)',
        isFile: true,
        fileName: 'app.py',
        commands: [
          `import os
from telegram import Update
from telegram.ext import (
    Application, CommandHandler, MessageHandler, filters, ContextTypes,
)

TOKEN = os.environ["BOT_TOKEN"]
# Render exposes the public URL of your service in this env var
URL = os.environ["RENDER_EXTERNAL_URL"]
PORT = int(os.environ.get("PORT", "10000"))

async def start(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Hi! I am a python-telegram-bot on Render.")

async def echo(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(update.message.text)

def main():
    app = Application.builder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))

    # Run a webhook server. python-telegram-bot registers the webhook for us
    # and serves it on the given path.
    app.run_webhook(
        listen="0.0.0.0",         # Render requires binding to 0.0.0.0
        port=PORT,
        url_path=TOKEN,           # secret-ish path so randoms cannot POST
        webhook_url=f"{URL}/{TOKEN}",
    )

if __name__ == "__main__":
    main()`,
        ],
        note: 'run_webhook both starts a web server AND calls setWebhook for you — no separate curl needed. Binding to 0.0.0.0 and using the PORT env var are required by Render. Using the token as the url_path makes the endpoint hard to guess.',
      },
      {
        label: 'requirements.txt',
        isFile: true,
        fileName: 'requirements.txt',
        commands: [
          `python-telegram-bot`,
        ],
        note: 'Pin a version for reproducible builds, e.g. python-telegram-bot==21.6 (check the latest on PyPI). Run "pip freeze > requirements.txt" locally to capture exact versions.',
      },
    ],
  },

  {
    phase: '06',
    title: 'PATH B · Deploy to Render + the keep-alive honesty',
    color: '#4ADE80',
    steps: [
      {
        label: 'Push to GitHub, then create the Render service',
        isText: true,
        text: [
          '1. Push your project (app.py, requirements.txt, .gitignore) to GitHub.',
          '   Make sure .env / the token are NOT committed.',
          '',
          '2. Go to render.com → "New +" → "Web Service" → connect your repo',
          '',
          '3. Settings:',
          '   Runtime:        Python 3',
          '   Build Command:  pip install -r requirements.txt',
          '   Start Command:  python app.py',
          '   Instance Type:  Free',
          '',
          '4. Add environment variable:  BOT_TOKEN = your BotFather token',
          '   (RENDER_EXTERNAL_URL is provided by Render automatically)',
          '',
          '5. "Create Web Service" → wait for the build → it goes live at',
          '   https://your-bot.onrender.com and registers its own webhook.',
        ],
        note: 'Never put the token in Start Command or code — add it under the service\'s "Environment" tab. Render injects RENDER_EXTERNAL_URL for you, which app.py uses to build the webhook URL.',
      },
      {
        label: 'The sleeping problem — and the honest fix',
        isText: true,
        text: [
          'Render free services sleep after ~15 minutes with no incoming HTTP',
          'traffic. A sleeping bot does not receive webhooks until the next request',
          'wakes it — so the first message after a quiet period is delayed (or',
          'missed if Telegram gives up retrying).',
          '',
          'Honest options:',
          '→ Accept it for a DEMO: it wakes on the first message, just slowly.',
          '→ Keep it awake with a cron ping: use cron-job.org or UptimeRobot to',
          '  GET your Render URL every ~10 minutes. This mostly works, but it is a',
          '  workaround, not a guarantee — and it burns your free instance hours.',
          '→ For guaranteed free 24/7, use Path A (Cloudflare Workers) instead.',
          '',
          'Render also gives free web services a monthly instance-hours budget —',
          'a single always-pinged bot fits, but running several can exhaust it.',
        ],
        note: 'The honest verdict: Render free is perfect for "turn it on to demo in an interview". For a bot people rely on around the clock, either keep-alive ping it (imperfect) or move to Cloudflare Workers (Path A) for real always-on free hosting.',
      },
    ],
  },

  {
    phase: '07',
    title: 'Token safety + pick your path with confidence',
    color: '#34D399',
    steps: [
      {
        label: 'Token safety — the one rule you cannot break',
        isText: true,
        text: [
          '→ NEVER commit your bot token to GitHub. Put it in an environment',
          '  variable or a .gitignored .env — never in the code.',
          '→ On any host, add the token in the dashboard\'s "Environment" / "Secrets"',
          '  section (Cloudflare: wrangler secret; Render: Environment tab).',
          '→ If it leaks (pushed by accident, in a screenshot): open BotFather →',
          '  /revoke NOW. The old token dies instantly and the leaked one is useless.',
          '',
          'Add this to .gitignore before your first commit:',
          '   .env',
          '   __pycache__/',
          '   *.pyc',
        ],
        note: 'A leaked token lets anyone hijack your bot to send spam or scams under your name. Revoke immediately via BotFather if it is ever exposed — it takes two seconds.',
      },
      {
        label: 'Final honest recommendation',
        isText: true,
        text: [
          'For a free, always-on bot to showcase → Path A (Cloudflare Workers).',
          '   Genuinely free, never sleeps, webhook-based, written in JavaScript.',
          '',
          'For learning python-telegram-bot → Path B on Render.',
          '   Great for demos; add a keep-alive ping or accept the cold-start delay.',
          '',
          'Free tiers to remember:',
          '→ Cloudflare Workers: 100,000 requests/day, no sleep, no card',
          '→ Render free web service: sleeps after ~15 min idle, monthly hour cap',
          '',
          'Whatever you pick, put the repo link + a short GIF of a real chat with',
          'the bot on your resume. A working bot that integrates with a live API is',
          'a memorable portfolio piece.',
        ],
        note: 'The best bot for your portfolio is the one that actually replies when a recruiter messages it. That is why Path A wins for most students — it is always there, and it costs nothing.',
      },
    ],
  },
]
