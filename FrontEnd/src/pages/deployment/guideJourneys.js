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
}
