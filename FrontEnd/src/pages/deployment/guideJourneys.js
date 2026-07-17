/* Per-guide "journey" flows — the real path each guide walks, shown as an
   animated diagram at the end of the guide. Keyed by the stack id in guideIndex.
   Kept honest: the final node reflects what you actually end up with. */

export const GUIDE_JOURNEYS = {
  'html-static': {
    title: 'From your folder to a live github.io link',
    subtitle: 'No servers, no build step, no credit card. Push your files and GitHub Pages serves them to the world.',
    stages: [
      { icon: '</>', label: 'YOUR FILES', sub: 'index.html + css' },
      { icon: '⎇', label: 'GIT INIT', sub: 'track the code' },
      { icon: '↥', label: 'PUSH TO GITHUB', sub: 'a public repo' },
      { icon: '⚙', label: 'ENABLE PAGES', sub: 'Settings → Pages' },
      { icon: '🌐', label: "YOU'RE LIVE", sub: 'username.github.io', live: true },
    ],
  },

  'react': {
    title: 'From a Vite build to a live Vercel URL',
    subtitle: 'Vercel builds your React app on every push and serves it on a global CDN — free for personal projects.',
    stages: [
      { icon: '⚛', label: 'REACT APP', sub: 'vite project' },
      { icon: '↥', label: 'PUSH TO GITHUB', sub: 'public or private' },
      { icon: '▲', label: 'IMPORT TO VERCEL', sub: 'connect repo' },
      { icon: '⚙', label: 'AUTO BUILD', sub: 'npm run build' },
      { icon: '🌐', label: "YOU'RE LIVE", sub: '*.vercel.app', live: true },
    ],
  },

  'vue': {
    title: 'From a Vite Vue app to a live URL',
    subtitle: 'Vercel, Netlify and Cloudflare Pages all build Vue for free and redeploy on every push.',
    stages: [
      { icon: '🟢', label: 'VUE APP', sub: 'vite project' },
      { icon: '↥', label: 'PUSH TO GITHUB', sub: 'a repo' },
      { icon: '△', label: 'IMPORT ON HOST', sub: 'Vercel / Netlify' },
      { icon: '⚙', label: 'AUTO BUILD', sub: 'npm run build' },
      { icon: '🌐', label: "YOU'RE LIVE", sub: 'shareable link', live: true },
    ],
  },

  'nextjs': {
    title: 'From a Next.js app to a live Vercel URL',
    subtitle: 'Vercel is built by the Next.js team — pages, API routes and images all deploy with zero config.',
    stages: [
      { icon: '⬡', label: 'NEXT.JS APP', sub: 'app router' },
      { icon: '↥', label: 'PUSH TO GITHUB', sub: 'a repo' },
      { icon: '▲', label: 'IMPORT TO VERCEL', sub: 'auto-detected' },
      { icon: '⚙', label: 'AUTO BUILD', sub: 'next build' },
      { icon: '🌐', label: "YOU'RE LIVE", sub: '*.vercel.app', live: true },
    ],
  },

  'mern': {
    title: 'Three free services, one full-stack app',
    subtitle: 'React on Vercel talks to an Express API on Render, which stores data in MongoDB Atlas.',
    stages: [
      { icon: '⚛', label: 'REACT', sub: 'on Vercel' },
      { icon: '⬢', label: 'EXPRESS API', sub: 'on Render' },
      { icon: '🍃', label: 'MONGODB ATLAS', sub: 'the database' },
      { icon: '🔑', label: 'WIRE ENV VARS', sub: 'connect all 3' },
      { icon: '🌐', label: 'FULL APP LIVE', sub: 'end to end', live: true },
    ],
  },

  'nodejs': {
    title: 'From an Express API to a live Render URL',
    subtitle: 'Render builds your Node service, injects your env vars and gives you an HTTPS API endpoint.',
    stages: [
      { icon: '⬢', label: 'NODE / EXPRESS', sub: 'REST API' },
      { icon: '↥', label: 'PUSH TO GITHUB', sub: 'a repo' },
      { icon: '◆', label: 'RENDER SERVICE', sub: 'web service' },
      { icon: '🔑', label: 'ADD ENV VARS', sub: 'before deploy' },
      { icon: '🌐', label: 'LIVE API', sub: '*.onrender.com', live: true },
    ],
  },

  'django-backend': {
    title: 'From Django to a live API on Render',
    subtitle: 'Gunicorn serves Django on Render, backed by a free PostgreSQL database.',
    stages: [
      { icon: '🎸', label: 'DJANGO API', sub: 'DRF project' },
      { icon: '📄', label: 'REQUIREMENTS', sub: '+ gunicorn' },
      { icon: '↥', label: 'PUSH TO GITHUB', sub: 'a repo' },
      { icon: '◆', label: 'RENDER + DB', sub: 'web + Postgres' },
      { icon: '🌐', label: 'LIVE API', sub: '*.onrender.com', live: true },
    ],
  },

  'django-fullstack': {
    title: 'From Django templates to a live site',
    subtitle: 'Collect your static files, push, and Render serves the whole app with a PostgreSQL database.',
    stages: [
      { icon: '🎸', label: 'DJANGO APP', sub: 'templates + views' },
      { icon: '🎨', label: 'COLLECTSTATIC', sub: 'whitenoise' },
      { icon: '↥', label: 'PUSH TO GITHUB', sub: 'a repo' },
      { icon: '◆', label: 'RENDER + DB', sub: 'web + Postgres' },
      { icon: '🌐', label: 'LIVE SITE', sub: '*.onrender.com', live: true },
    ],
  },

  'fastapi': {
    title: 'From FastAPI to a live /docs on Render',
    subtitle: 'Uvicorn serves your ASGI app on Render — you even get interactive Swagger docs for free.',
    stages: [
      { icon: '⚡', label: 'FASTAPI APP', sub: 'ASGI' },
      { icon: '📄', label: 'REQUIREMENTS', sub: '+ uvicorn' },
      { icon: '↥', label: 'PUSH TO GITHUB', sub: 'a repo' },
      { icon: '◆', label: 'RENDER SERVICE', sub: 'web service' },
      { icon: '🌐', label: 'LIVE + /docs', sub: '*.onrender.com', live: true },
    ],
  },

  'flask': {
    title: 'From a Flask app to a live Render URL',
    subtitle: 'A Procfile tells Render to run Gunicorn bound to its port — then you push and go live.',
    stages: [
      { icon: '🐍', label: 'FLASK APP', sub: 'app.py' },
      { icon: '📄', label: 'REQ + PROCFILE', sub: '+ gunicorn' },
      { icon: '↥', label: 'PUSH TO GITHUB', sub: 'a repo' },
      { icon: '◆', label: 'RENDER SERVICE', sub: 'bind $PORT' },
      { icon: '🌐', label: "YOU'RE LIVE", sub: '*.onrender.com', live: true },
    ],
  },

  'springboot': {
    title: 'From Spring Boot to a live Docker service',
    subtitle: 'A Dockerfile packages your app, and Render builds and runs the container on every push.',
    stages: [
      { icon: '☕', label: 'SPRING BOOT', sub: 'the jar' },
      { icon: '🐳', label: 'DOCKERFILE', sub: 'package it' },
      { icon: '↥', label: 'PUSH TO GITHUB', sub: 'a repo' },
      { icon: '◆', label: 'RENDER (DOCKER)', sub: 'build + run' },
      { icon: '🌐', label: 'LIVE API', sub: '*.onrender.com', live: true },
    ],
  },

  'streamlit': {
    title: 'From a Streamlit script to a live app',
    subtitle: 'List your requirements, push to GitHub, and Streamlit Community Cloud hosts the app for free.',
    stages: [
      { icon: '📊', label: 'STREAMLIT APP', sub: 'app.py' },
      { icon: '📄', label: 'REQUIREMENTS', sub: 'pin versions' },
      { icon: '↥', label: 'PUSH TO GITHUB', sub: 'a repo' },
      { icon: '☁', label: 'STREAMLIT CLOUD', sub: 'connect repo' },
      { icon: '🌐', label: 'LIVE APP', sub: '*.streamlit.app', live: true },
    ],
  },

  'heavy-model-deploy': {
    title: 'From a big model to a live GPU demo',
    subtitle: 'Store weights on the HF Model Hub and run inference in a Hugging Face Space.',
    stages: [
      { icon: '🧠', label: 'HEAVY MODEL', sub: '> 1GB weights' },
      { icon: '📦', label: 'MODEL HUB', sub: 'store weights' },
      { icon: '📄', label: 'APP + REQS', sub: 'gradio' },
      { icon: '↥', label: 'PUSH TO SPACE', sub: 'HF Spaces' },
      { icon: '🌐', label: 'LIVE DEMO', sub: '*.hf.space', live: true },
    ],
  },

  'chatbot-deploy': {
    title: 'From chatbot code to a live demo link',
    subtitle: 'Keep your API key as a secret, push to a Hugging Face Space, and share a live chat.',
    stages: [
      { icon: '🤖', label: 'CHATBOT APP', sub: 'gradio UI' },
      { icon: '🔑', label: 'API KEY SECRET', sub: 'never in code' },
      { icon: '📄', label: 'APP + REQS', sub: 'requirements' },
      { icon: '↥', label: 'PUSH TO SPACE', sub: 'HF Spaces' },
      { icon: '🌐', label: 'LIVE CHAT', sub: '*.hf.space', live: true },
    ],
  },

  'nlp-demo': {
    title: 'From an NLP model to a live demo',
    subtitle: 'Wrap your model in Gradio and let a free Hugging Face Space host it for you.',
    stages: [
      { icon: '🧬', label: 'NLP MODEL', sub: 'sentiment · etc' },
      { icon: '📄', label: 'APP + REQS', sub: 'gradio' },
      { icon: '↥', label: 'PUSH TO SPACE', sub: 'HF Spaces' },
      { icon: '⚙', label: 'SPACE BUILDS', sub: 'auto' },
      { icon: '🌐', label: 'LIVE DEMO', sub: '*.hf.space', live: true },
    ],
  },

  'image-ai': {
    title: 'From a vision model to a live demo',
    subtitle: 'Upload an image, get a prediction — hosted free on a Hugging Face Space.',
    stages: [
      { icon: '🎨', label: 'VISION MODEL', sub: 'classify · detect' },
      { icon: '📄', label: 'APP + REQS', sub: 'gradio' },
      { icon: '↥', label: 'PUSH TO SPACE', sub: 'HF Spaces' },
      { icon: '⚙', label: 'SPACE BUILDS', sub: 'auto' },
      { icon: '🌐', label: 'LIVE DEMO', sub: '*.hf.space', live: true },
    ],
  },

  'rag-app': {
    title: 'From documents to a live Q&A app',
    subtitle: 'Embed your docs into a vector store, wire up your API key, and host the app on a Space.',
    stages: [
      { icon: '📚', label: 'YOUR DOCS', sub: 'PDFs / text' },
      { icon: '🧠', label: 'EMBED + STORE', sub: 'vector db' },
      { icon: '🔑', label: 'API KEY SECRET', sub: 'in Space' },
      { icon: '↥', label: 'PUSH TO SPACE', sub: 'HF Spaces' },
      { icon: '🌐', label: 'LIVE Q&A', sub: '*.hf.space', live: true },
    ],
  },

  'discord-bot': {
    title: 'From bot code to a 24/7 online bot',
    subtitle: 'A slash-command bot runs on Cloudflare Workers — genuinely free and always awake.',
    stages: [
      { icon: '🤖', label: 'BOT CODE', sub: 'worker' },
      { icon: '⌘', label: 'REGISTER CMDS', sub: 'slash commands' },
      { icon: '↥', label: 'DEPLOY WORKER', sub: 'wrangler' },
      { icon: '⚡', label: 'CLOUDFLARE', sub: 'always on' },
      { icon: '✅', label: 'BOT ONLINE', sub: '24/7 free', live: true },
    ],
  },

  'scraper-automation': {
    title: 'From a script to a scheduled robot',
    subtitle: 'GitHub Actions runs your scraper on a cron timer — no server, no cost.',
    stages: [
      { icon: '🕷', label: 'SCRAPER SCRIPT', sub: 'python' },
      { icon: '↥', label: 'PUSH TO GITHUB', sub: 'a repo' },
      { icon: '⏰', label: 'CRON WORKFLOW', sub: 'schedule' },
      { icon: '🤖', label: 'ACTIONS RUNS IT', sub: 'on a timer' },
      { icon: '💾', label: 'SAVED OUTPUT', sub: 'commit / artifact', live: true },
    ],
  },

  'expo-mobile': {
    title: 'From an Expo project to a real app',
    subtitle: 'EAS builds a shareable APK, and EAS Update pushes changes over the air — all on the free tier.',
    stages: [
      { icon: '📱', label: 'EXPO APP', sub: 'react native' },
      { icon: '⚙', label: 'EAS BUILD', sub: 'cloud build' },
      { icon: '📦', label: 'SHAREABLE APK', sub: 'download link' },
      { icon: '📲', label: 'OTA UPDATES', sub: 'eas update' },
      { icon: '🚀', label: 'SHIPPED', sub: 'on real phones', live: true },
    ],
  },

  'mongodb-atlas': {
    title: 'From zero to a connected cloud database',
    subtitle: 'Spin up a free cluster, lock it down with a user + network rule, and grab your connection string.',
    stages: [
      { icon: '🍃', label: 'CREATE CLUSTER', sub: 'free M0' },
      { icon: '👤', label: 'DB USER', sub: 'read/write' },
      { icon: '🌐', label: 'NETWORK ACCESS', sub: 'allow your IP' },
      { icon: '🔗', label: 'CONNECTION URI', sub: 'copy string' },
      { icon: '✅', label: 'CONNECTED', sub: 'from your app', live: true },
    ],
  },

  'neon-postgres': {
    title: 'From zero to a serverless Postgres',
    subtitle: 'Neon gives you a free Postgres that keeps your data forever and auto-suspends compute when idle.',
    stages: [
      { icon: '🐘', label: 'CREATE PROJECT', sub: 'neon' },
      { icon: '🔗', label: 'CONNECTION URI', sub: 'copy string' },
      { icon: '🔑', label: 'SET ENV VAR', sub: 'DATABASE_URL' },
      { icon: '🔌', label: 'CONNECT APP', sub: 'migrate' },
      { icon: '✅', label: 'SERVERLESS DB', sub: 'data safe', live: true },
    ],
  },

  'supabase': {
    title: 'From a new project to a live backend',
    subtitle: 'Supabase gives you Postgres, auth and storage — create tables, grab your keys, and connect.',
    stages: [
      { icon: '🗄', label: 'NEW PROJECT', sub: 'supabase' },
      { icon: '📋', label: 'CREATE TABLES', sub: 'schema' },
      { icon: '🔑', label: 'API KEYS', sub: 'url + anon key' },
      { icon: '🔌', label: 'CONNECT APP', sub: 'client sdk' },
      { icon: '✅', label: 'LIVE BACKEND', sub: 'db + auth', live: true },
    ],
  },

  'render-postgres': {
    title: 'From a new database to a connected app',
    subtitle: 'Render Postgres is free for 30 days — create it, copy the internal URL, and wire it to your service.',
    stages: [
      { icon: '◆', label: 'CREATE POSTGRES', sub: 'on Render' },
      { icon: '🔗', label: 'INTERNAL URL', sub: 'copy string' },
      { icon: '🔑', label: 'SET ENV VAR', sub: 'DATABASE_URL' },
      { icon: '🔌', label: 'CONNECT SERVICE', sub: 'same region' },
      { icon: '✅', label: 'LIVE DB', sub: 'connected', live: true },
    ],
  },

  'aiven': {
    title: 'From a managed service to a connected app',
    subtitle: 'Aiven runs the database for you — create a free service, copy the Service URI, and wire it into your app.',
    stages: [
      { icon: '🐦', label: 'CREATE SERVICE', sub: 'free plan' },
      { icon: '🔗', label: 'SERVICE URI', sub: 'copy string' },
      { icon: '🔑', label: 'SET ENV VAR', sub: 'DATABASE_URL' },
      { icon: '🔌', label: 'CONNECT APP', sub: 'ssl required' },
      { icon: '✅', label: 'LIVE DB', sub: 'connected', live: true },
    ],
  },

  'upstash-redis': {
    title: 'From zero to a serverless Redis',
    subtitle: 'Upstash hosts a Redis that scales to zero — create it, grab your REST URL + token, and cache from anywhere.',
    stages: [
      { icon: '⚡', label: 'CREATE DATABASE', sub: 'upstash' },
      { icon: '🌍', label: 'PICK REGION', sub: 'single region' },
      { icon: '🔑', label: 'URL + TOKEN', sub: 'copy creds' },
      { icon: '🔌', label: 'CONNECT APP', sub: 'REST / TCP' },
      { icon: '✅', label: 'CACHE LIVE', sub: 'scales to zero', live: true },
    ],
  },

  'turso': {
    title: 'From the CLI to a hosted SQLite',
    subtitle: 'Turso hosts libSQL (SQLite at the edge) — create a database with the CLI, grab a URL + token, and connect.',
    stages: [
      { icon: '⬇', label: 'INSTALL CLI', sub: 'turso' },
      { icon: '🗃️', label: 'CREATE DB', sub: 'turso db create' },
      { icon: '🔑', label: 'URL + TOKEN', sub: 'copy creds' },
      { icon: '🔌', label: 'CONNECT APP', sub: '@libsql/client' },
      { icon: '✅', label: 'EDGE DB LIVE', sub: 'no cold starts', live: true },
    ],
  },

  'angular': {
    title: 'From ng build to a live Angular URL',
    subtitle: 'Build, point the host at the /browser folder, add the SPA rewrite, and your Angular app is live and free.',
    stages: [
      { icon: '🅰️', label: 'ANGULAR APP', sub: 'ng project' },
      { icon: '⚙', label: 'NG BUILD', sub: 'dist/…/browser' },
      { icon: '↥', label: 'PUSH TO GITHUB', sub: 'a repo' },
      { icon: '△', label: 'IMPORT ON HOST', sub: 'Vercel / Netlify' },
      { icon: '🌐', label: "YOU'RE LIVE", sub: 'shareable link', live: true },
    ],
  },

  'astro': {
    title: 'From an Astro build to a live URL',
    subtitle: 'A default Astro site is pure static HTML — it deploys to Vercel, Netlify, or Cloudflare with zero config and no adapter.',
    stages: [
      { icon: '🚀', label: 'ASTRO SITE', sub: 'content + islands' },
      { icon: '⚙', label: 'ASTRO BUILD', sub: 'dist/' },
      { icon: '↥', label: 'PUSH TO GITHUB', sub: 'a repo' },
      { icon: '△', label: 'IMPORT ON HOST', sub: 'Vercel / Netlify' },
      { icon: '🌐', label: "YOU'RE LIVE", sub: 'fast static site', live: true },
    ],
  },

  'cloudflare-pages': {
    title: 'From a Vite build to the global edge',
    subtitle: 'Cloudflare Pages builds your app on every push and serves it worldwide with unlimited bandwidth — free.',
    stages: [
      { icon: '⚛', label: 'VITE / STATIC', sub: 'your frontend' },
      { icon: '↥', label: 'PUSH TO GITHUB', sub: 'a repo' },
      { icon: '🟧', label: 'CONNECT PAGES', sub: 'set build cmd' },
      { icon: '⚙', label: 'AUTO BUILD', sub: 'npm run build' },
      { icon: '🌐', label: "YOU'RE LIVE", sub: '*.pages.dev', live: true },
    ],
  },

  'sveltekit': {
    title: 'From a SvelteKit app to a live Vercel URL',
    subtitle: 'The adapter packs your app for Vercel — SSR pages and API routes deploy as functions, free for personal projects.',
    stages: [
      { icon: '🔥', label: 'SVELTEKIT APP', sub: 'vite project' },
      { icon: '🔌', label: 'SET ADAPTER', sub: 'adapter-vercel' },
      { icon: '↥', label: 'PUSH TO GITHUB', sub: 'a repo' },
      { icon: '▲', label: 'IMPORT TO VERCEL', sub: 'auto-detected' },
      { icon: '🌐', label: "YOU'RE LIVE", sub: '*.vercel.app', live: true },
    ],
  },

  'firebase': {
    title: 'From a React app to a live backend',
    subtitle: 'Firebase gives you Hosting, a Firestore database, and Auth — a full backend with no server to manage, free on the Spark plan.',
    stages: [
      { icon: '🔶', label: 'CREATE PROJECT', sub: 'firebase console' },
      { icon: '⚛', label: 'CONNECT APP', sub: 'firebase config' },
      { icon: '🗄', label: 'FIRESTORE + AUTH', sub: 'db + login' },
      { icon: '⚙', label: 'BUILD + INIT', sub: 'firebase init' },
      { icon: '🌐', label: 'LIVE APP', sub: '*.web.app', live: true },
    ],
  },

  'docker': {
    title: 'From a Dockerfile to a running container',
    subtitle: 'Write a recipe, build an image, run it anywhere — then ship the same container to a host like Render.',
    stages: [
      { icon: '📝', label: 'DOCKERFILE', sub: 'the recipe' },
      { icon: '📦', label: 'BUILD IMAGE', sub: 'docker build' },
      { icon: '▶', label: 'RUN CONTAINER', sub: 'docker run' },
      { icon: '↥', label: 'PUSH / DEPLOY', sub: 'registry / host' },
      { icon: '✅', label: 'RUNS ANYWHERE', sub: 'same everywhere', live: true },
    ],
  },

  'pythonanywhere': {
    title: 'From uploaded code to a live Python site',
    subtitle: 'PythonAnywhere runs Flask/Django from a web form — clone your code, point the WSGI file at your app, and reload.',
    stages: [
      { icon: '🐍', label: 'FLASK / DJANGO', sub: 'your app' },
      { icon: '⬇', label: 'CLONE CODE', sub: 'git in console' },
      { icon: '📦', label: 'VIRTUALENV', sub: 'pip install' },
      { icon: '⚙', label: 'WSGI + RELOAD', sub: 'Web tab' },
      { icon: '🌐', label: "YOU'RE LIVE", sub: '*.pythonanywhere.com', live: true },
    ],
  },

  'deno-deploy': {
    title: 'From a handler to a live edge API',
    subtitle: 'Write a web-standard Deno handler, connect GitHub on console.deno.com, and it deploys to the edge on every push.',
    stages: [
      { icon: '🦕', label: 'DENO HANDLER', sub: 'main.ts' },
      { icon: '↥', label: 'PUSH TO GITHUB', sub: 'a repo' },
      { icon: '🏢', label: 'CREATE ORG + APP', sub: 'console.deno.com' },
      { icon: '⚙', label: 'INTEGRATED BUILD', sub: 'live logs' },
      { icon: '🌐', label: 'LIVE EDGE API', sub: '*.deno.dev', live: true },
    ],
  },

  'koyeb': {
    title: 'From a repo to a live free backend',
    subtitle: 'Koyeb builds from GitHub or Docker and runs one free web service — bind $PORT, deploy, and go live.',
    stages: [
      { icon: '🪂', label: 'YOUR BACKEND', sub: 'node / python' },
      { icon: '↥', label: 'PUSH TO GITHUB', sub: 'a repo' },
      { icon: '🔧', label: 'CREATE SERVICE', sub: 'buildpack / Docker' },
      { icon: '🔑', label: 'ENV + $PORT', sub: 'bind 0.0.0.0' },
      { icon: '🌐', label: 'LIVE API', sub: '*.koyeb.app', live: true },
    ],
  },

  'flutter': {
    title: 'From one Flutter codebase to a shared app',
    subtitle: 'Build for the web and host it free, and build an APK to send — two free ways to put your Flutter app in people\'s hands.',
    stages: [
      { icon: '🦋', label: 'FLUTTER APP', sub: 'dart codebase' },
      { icon: '🌐', label: 'BUILD WEB', sub: 'build/web' },
      { icon: '📦', label: 'BUILD APK', sub: 'app-release.apk' },
      { icon: '↥', label: 'HOST + SHARE', sub: 'Firebase / Pages' },
      { icon: '🚀', label: 'SHIPPED', sub: 'link + apk', live: true },
    ],
  },

  'telegram-bot': {
    title: 'From bot code to a 24/7 online bot',
    subtitle: 'A webhook bot on Cloudflare Workers is genuinely free and always awake — BotFather gives the token, setWebhook connects it.',
    stages: [
      { icon: '✈️', label: 'BOTFATHER', sub: 'get token' },
      { icon: '🤖', label: 'BOT CODE', sub: 'webhook handler' },
      { icon: '↥', label: 'DEPLOY WORKER', sub: 'wrangler' },
      { icon: '🔗', label: 'SET WEBHOOK', sub: 'point telegram' },
      { icon: '✅', label: 'BOT ONLINE', sub: '24/7 free', live: true },
    ],
  },
}
