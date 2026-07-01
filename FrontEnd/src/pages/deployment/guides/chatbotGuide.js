export const CHATBOT_DEPLOY_GUIDE = [
  {
    phase: '01',
    title: 'Deploy your AI chatbot as a live demo',
    color: '#9B6ED4',
    steps: [
      {
        label: 'What you will build — a live chatbot URL anyone can open',
        isText: true,
        text: [
          'This guide deploys your chatbot as a live interactive demo.',
          'No React. No HTML. No Flask. No Django. Just Python + Gradio.',
          '',
          'Gradio ChatInterface automatically builds the entire chat UI.',
          'You only write one function: what the bot says given a message.',
          '',
          'What this guide covers:',
          '→ OpenAI API chatbot (GPT-5.5, GPT-5.5-mini, GPT-3.5)',
          '→ Hugging Face model chatbot (no API key needed)',
          '→ Study assistant, FAQ bot, retrieval chatbot',
          '',
          'End result:',
          '→ Live URL: huggingface.co/spaces/yourname/your-chatbot',
          '→ Anyone can open and chat — no login needed',
          '→ Share on resume and LinkedIn as a portfolio project',
          '',
          'Do NOT use this guide for:',
          '→ ML prediction models (use Streamlit Cloud guide)',
          '→ Data dashboards (use Streamlit Cloud guide)',
          '→ React apps (use Vercel guide)',
        ],
        note: 'Gradio ChatInterface handles all conversation history and UI automatically. You write one Python function — that is the entire chatbot.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Before deployment — checklist',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Verify your chatbot works locally before deploying',
        isText: true,
        text: [
          '✅ Chatbot responds correctly in local Python test',
          '✅ No API key hardcoded anywhere in the code',
          '✅ requirements.txt created with all imported packages',
          '✅ README.md created with frontmatter',
          '✅ .gitignore created (no .env, no venv/)',
          '',
          'Quick local test before deploying:',
          '   python -c "from app import chat_response; print(chat_response(\'hello\', []))"',
          '',
          '   If this prints a chatbot reply — you are ready.',
          '   If it crashes — fix the error before deploying.',
          '',
          'Rule: If the chatbot fails locally, it fails on Hugging Face Spaces too.',
          'Fix all local errors first.',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '03',
    title: 'Project structure',
    color: '#60A5FA',
    steps: [
      {
        label: 'Simple folder structure for a chatbot Space',
        isText: true,
        text: [
          'For a basic chatbot:',
          '',
          '   chatbot-space/',
          '     app.py          ← Gradio chatbot code',
          '     requirements.txt',
          '     README.md       ← Space metadata frontmatter',
          '     .gitignore',
          '',
          'If using local retrieval documents:',
          '',
          '   chatbot-space/',
          '     app.py',
          '     requirements.txt',
          '     README.md',
          '     .gitignore',
          '     data/',
          '       sample_docs.txt  ← sample context documents',
          '',
          'Rules:',
          '→ app.py must be at the root — not inside a subfolder',
          '→ Never commit API keys, .env, or venv/',
          '→ data/ should only contain public sample content',
          '→ Private/sensitive data must never be pushed to a public repo',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '04',
    title: 'app.py — OpenAI-powered chatbot',
    color: '#EC4899',
    steps: [
      {
        label: 'Safe OpenAI chatbot — API key from secrets, not code',
        isFile: true,
        fileName: 'app.py (OpenAI chatbot)',
        commands: [
          `import os
import gradio as gr
from openai import OpenAI

# Read API key from environment — never hardcode
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL   = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

SYSTEM_PROMPT = (
    "You are a helpful AI assistant for college students. "
    "Give clear, beginner-friendly answers."
)

# Create client only if key is available
client = OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None

def chat_response(message, history):
    # Handle missing API key gracefully
    if client is None:
        return (
            "⚠️  OPENAI_API_KEY is not set. "
            "Please add it in Hugging Face Space → Settings → Secrets."
        )

    # Build message history for the API
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    for item in history:
        if isinstance(item, dict):
            messages.append(item)
        else:
            user_msg, bot_msg = item
            messages.append({"role": "user",      "content": user_msg})
            messages.append({"role": "assistant", "content": bot_msg})

    messages.append({"role": "user", "content": message})

    response = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=messages,
        max_tokens=500,
        temperature=0.7,
    )

    return response.choices[0].message.content

demo = gr.ChatInterface(
    fn=chat_response,
    title="💬 AI Study Assistant",
    description="Ask anything about programming, AI, data science, or college topics.",
    examples=[
        "Explain neural networks in simple words",
        "What is gradient descent?",
        "Give me a Python learning roadmap",
    ],
    theme=gr.themes.Soft(),
)

if __name__ == "__main__":
    demo.launch()`,
        ],
        note: 'OPENAI_API_KEY is read from the environment — NEVER put the actual key in this file. You will add it in Hugging Face Space secrets settings (Phase 12).',
      },
      {
        label: 'Important: customise the system prompt for your project',
        isText: true,
        text: [
          'The SYSTEM_PROMPT defines your chatbot\'s personality and purpose.',
          'Change it to match your specific project:',
          '',
          'For a college FAQ bot:',
          '   SYSTEM_PROMPT = "You are a helpful assistant for students at XYZ College.',
          '   Answer questions about admissions, courses, and campus life."',
          '',
          'For a Python tutor:',
          '   SYSTEM_PROMPT = "You are a Python programming tutor for beginners.',
          '   Give simple code examples and explain concepts clearly."',
          '',
          'For a data science helper:',
          '   SYSTEM_PROMPT = "You are a data science assistant.',
          '   Help students understand machine learning concepts and debug Python code."',
          '',
          'Keep SYSTEM_PROMPT short and specific.',
          'A focused system prompt gives better, more relevant responses.',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '05',
    title: 'app.py — HuggingFace model chatbot (no API key needed)',
    color: '#EC4899',
    steps: [
      {
        label: 'Free chatbot using a public HuggingFace model',
        isFile: true,
        fileName: 'app.py (HuggingFace model — free)',
        commands: [
          `import gradio as gr
from transformers import pipeline

# Load model once at startup — outside the function
generator = pipeline(
    "text-generation",
    model="microsoft/DialoGPT-medium",
    max_new_tokens=100,
)

def chat_response(message, history):
    # Generate a response for the current message
    result = generator(message)[0]["generated_text"]
    return result

demo = gr.ChatInterface(
    fn=chat_response,
    title="💬 Hugging Face Chatbot Demo",
    description="Chat with a public Hugging Face language model. No API key needed.",
    examples=["Hello!", "What is AI?", "Explain Python in simple words"],
)

if __name__ == "__main__":
    demo.launch()`,
        ],
        note: 'This version uses a free public HuggingFace model — no API key needed. Response quality is lower than GPT models. Good for demos where you want zero external dependencies or cost.',
      },
      {
        label: 'Honest comparison — OpenAI vs HuggingFace model',
        isText: true,
        text: [
          'OpenAI API chatbot:',
          '✅ Much better response quality (GPT-5.5-mini is excellent)',
          '✅ Reliable and fast',
          '⚠️  Needs OPENAI_API_KEY — has per-token cost',
          '⚠️  Students need an OpenAI account with billing',
          '',
          'HuggingFace model chatbot:',
          '✅ Completely free — no API key, no billing',
          '✅ Good for basic demos',
          '⚠️  Lower response quality than modern GPT models',
          '⚠️  Larger models load slowly on free CPU',
          '⚠️  DialoGPT is old — do not promise "state of the art" quality',
          '',
          'Recommendation for students:',
          '→ If you have an OpenAI API key — use it for better quality',
          '→ If you have no budget — use DialoGPT for demo purposes',
          '→ Always be honest about the model limitations in your README',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '06',
    title: 'requirements.txt',
    color: '#60A5FA',
    steps: [
      {
        label: 'requirements.txt — keep it minimal',
        isText: true,
        text: [
          'For OpenAI chatbot:',
          '   gradio',
          '   openai',
          '',
          'For HuggingFace model chatbot:',
          '   gradio',
          '   transformers',
          '   torch',
          '',
          'Rules:',
          '→ Only list packages your app.py actually imports',
          '→ Extra packages slow down the build',
          '→ Do not pin versions unless you have a specific compatibility reason',
          '',
          'Find your exact Gradio version:',
          '   python -c "import gradio; print(gradio.__version__)"',
          '   Use this version in README.md sdk_version field',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '07',
    title: 'README.md — Space metadata frontmatter',
    color: '#F59E0B',
    steps: [
      {
        label: 'README.md — required frontmatter for Hugging Face Spaces',
        isFile: true,
        fileName: 'README.md',
        commands: [
          `---
title: AI Chatbot Demo
emoji: 💬
colorFrom: purple
colorTo: blue
sdk: gradio
sdk_version: 4.44.0
app_file: app.py
pinned: false
---

# AI Chatbot Demo

An interactive AI chatbot deployed on Hugging Face Spaces.

## Features
- Chat with an AI assistant
- Remembers conversation history within the session
- Beginner-friendly answers

## About
Built with Gradio and deployed on Hugging Face Spaces as a portfolio project.`,
        ],
        note: 'The frontmatter YAML between the --- markers is required. Hugging Face reads it to configure your Space. Wrong sdk or app_file will prevent the Space from building.',
      },
    ],
  },

  {
    phase: '08',
    title: 'Create .gitignore',
    color: '#F59E0B',
    steps: [
      {
        label: '.gitignore — protect secrets and skip unnecessary files',
        isFile: true,
        fileName: '.gitignore',
        commands: [
          `.env
.env.local
.env.*

__pycache__/
*.pyc
*.pyo

venv/
env/
.venv/

.DS_Store
Thumbs.db`,
        ],
        note: 'Never push .env files or your virtual environment. API keys in .env are private — once pushed to GitHub or HF, they are exposed permanently (even after deletion).',
      },
    ],
  },

  {
    phase: '09',
    title: 'Create Hugging Face Space',
    color: '#FF9D00',
    steps: [
      {
        label: 'Create your free Space on Hugging Face',
        isText: true,
        text: [
          '1. huggingface.co → Sign up or log in',
          '',
          '2. Click "+" at the top → "New Space"',
          '',
          '3. Configure:',
          '   Owner:      your username',
          '   Space name: ai-chatbot-demo (or your project name)',
          '   License:    MIT',
          '   SDK:        Gradio',
          '   Hardware:   CPU basic  ← free tier',
          '   Visibility: Public  ← required for free hosting',
          '',
          '4. Click "Create Space"',
          '',
          '5. HF creates a Git repo at:',
          '   huggingface.co/spaces/YOUR_USERNAME/ai-chatbot-demo',
          '',
          'Notes on hardware:',
          '   CPU basic is free and handles lightweight chatbot models.',
          '   GPU hardware requires paid upgrades.',
          '   Large LLMs (7B+ parameters) will NOT run on free CPU.',
          '   DialoGPT-medium and GPT-5.5-mini (via API) both work on free CPU.',
          '',
          'Notes on visibility:',
          '   Public Spaces are suitable for student demos.',
          '   Public means anyone can see your code — never push secrets.',
        ],
        note: 'Hugging Face hardware and plan options can change. Always verify current options at huggingface.co before assuming what is available for free.',
      },
    ],
  },

  {
    phase: '10',
    title: 'Push your code to the Space',
    color: '#4ADE80',
    steps: [
      {
        label: 'Clone the Space repo and push your files',
        commands: [
          `# Clone your Space repository
git clone https://huggingface.co/spaces/YOUR_USERNAME/ai-chatbot-demo`,
          `# Move into the folder
cd ai-chatbot-demo`,
          `# Copy your files here: app.py, requirements.txt, README.md, .gitignore`,
          `# Stage all files
git add .`,
          `# Commit
git commit -m "add AI chatbot demo"`,
          `# Push — Space rebuilds automatically
git push`,
        ],
        note: 'Every git push triggers an automatic rebuild. Watch the "Build" tab on the Space page for live logs.',
      },
      {
        label: 'If git push asks for authentication',
        isText: true,
        text: [
          'Use a Hugging Face access token — not your account password.',
          '',
          '1. huggingface.co → click your profile → Settings',
          '2. Access Tokens → New token',
          '   Name: deploy-token',
          '   Permission: Write',
          '   Create → Copy the token',
          '',
          '3. When git push asks for password:',
          '   Username: your-hf-username',
          '   Password: (paste your token)',
          '',
          'Or update the remote URL to include the token:',
          '   git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@huggingface.co/spaces/YOUR_USERNAME/ai-chatbot-demo',
          '   git push',
          '',
          'Tokens can be revoked anytime — safer than using your account password.',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '11',
    title: 'If you accidentally pushed a secret to Git',
    color: '#EF4444',
    steps: [
      {
        label: 'Act immediately — deleting in a new commit is NOT enough',
        isText: true,
        text: [
          'If an API key, token, or password was pushed:',
          '',
          'Deleting it in a new commit does NOT make it safe.',
          'The secret still exists in every previous Git commit.',
          '',
          'Step 1 — REVOKE immediately:',
          '→ OpenAI: platform.openai.com → API Keys → Delete the key',
          '→ HF token: huggingface.co → Settings → Tokens → Delete',
          '',
          'Step 2 — Remove from Git tracking:',
          '   git rm --cached .env',
          '   git commit -m "remove secret file"',
          '   git push',
          '',
          'Step 3 — Check if key is in old commits:',
          '   git grep "sk-" $(git rev-list --all)   ← for OpenAI keys',
          '',
          'Step 4 — If found in old commits, clean with git filter-repo:',
          '   pip install git-filter-repo',
          '   git filter-repo --path .env --invert-paths',
          '   git push --force',
          '',
          'Always: generate a NEW key after revoking the old one.',
          'The old key must not be reused — treat it as permanently compromised.',
        ],
        note: 'Bots scan GitHub and Hugging Face repos for leaked API keys within minutes. Assume the key is compromised the moment it is pushed. Revoke first, clean second.',
      },
    ],
  },

  {
    phase: '12',
    title: 'Add API key secret (OpenAI chatbot only)',
    color: '#A78BFA',
    steps: [
      {
        label: 'Add OPENAI_API_KEY safely in Space settings',
        isText: true,
        text: [
          'Skip this phase if you are using the HuggingFace model chatbot.',
          'Only needed if your app.py uses OpenAI API.',
          '',
          '1. Open your Space page',
          '2. Click "Settings" tab',
          '3. Scroll to "Repository secrets"',
          '4. Click "New secret"',
          '   Name:  OPENAI_API_KEY',
          '   Value: sk-your-actual-openai-key',
          '5. Click "Add new secret"',
          '',
          'Optional — set the model:',
          '   Name:  OPENAI_MODEL',
          '   Value: gpt-4o-mini  (or gpt-3.5-turbo)',
          '',
          '6. Space restarts automatically with the secrets',
          '',
          'In app.py (already written this way):',
          '   OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")',
          '   OPENAI_MODEL   = os.getenv("OPENAI_MODEL", "gpt-4o-mini")',
          '',
          'Rules:',
          '→ Never put the key directly in app.py',
          '→ Never print the key with print() or display it in the chatbot',
          '→ If key is exposed, revoke it immediately (Phase 11)',
        ],
        note: 'Secrets added in the Space settings panel are encrypted and never visible to visitors. They are only accessible inside your running app as environment variables.',
      },
    ],
  },

  {
    phase: '13',
    title: 'Verify live chatbot',
    color: '#4ADE80',
    steps: [
      {
        label: 'Test your deployed chatbot',
        isText: true,
        text: [
          '✅ Open your Space URL:',
          '   huggingface.co/spaces/YOUR_USERNAME/ai-chatbot-demo',
          '',
          '✅ Chat interface loads correctly',
          '✅ Type a test message — bot responds',
          '✅ Conversation history works across multiple messages',
          '✅ Try the example prompts (Explain neural networks, etc.)',
          '',
          'Check logs if something fails:',
          '   Space page → "Build" tab (during build)',
          '   Space page → "Logs" tab (runtime)',
          '   Read the exact error line',
          '',
          'Space may take 30–60 seconds to wake up after inactivity.',
          'This is normal for free CPU Spaces.',
          '',
          'Share your chatbot:',
          '→ Resume: "Live Demo: huggingface.co/spaces/..."',
          '→ LinkedIn: add to Projects section',
          '→ GitHub README: add live demo badge/link',
        ],
        note: 'Test in an incognito window to simulate what a recruiter or interviewer sees when they open your link for the first time.',
      },
    ],
  },

  {
    phase: '14',
    title: 'Free tier and honest limitations',
    color: '#34D399',
    steps: [
      {
        label: 'What HF Spaces free CPU tier gives you for chatbots',
        isText: true,
        text: [
          'Free CPU Spaces:',
          '→ Free forever for public Spaces',
          '→ Approximately 2 vCPU and 16GB RAM',
          '→ Suitable for DialoGPT-medium and API-based chatbots',
          '→ Spaces sleep when unused — first request takes ~30s to wake up',
          '',
          'What works well on free CPU for chatbots:',
          '✅ OpenAI API chatbot (API handles compute, not the Space)',
          '✅ DialoGPT-medium (630MB, fits in free RAM)',
          '✅ Any chatbot that calls an external API',
          '',
          'What will NOT work well on free CPU:',
          '❌ LLaMA 7B, Mistral 7B, or larger local LLMs',
          '❌ Real-time voice chatbots (audio processing is CPU-heavy)',
          '',
          'Cost note for OpenAI chatbot:',
          '→ Hugging Face Spaces hosting is FREE',
          '→ OpenAI API calls are NOT free — you pay per token',
          '→ gpt-4o-mini is very cheap (~$0.00015 per 1K input tokens)',
          '→ For student demo with occasional usage: minimal cost',
          '→ Set a spending limit in OpenAI dashboard to avoid surprises',
          '',
          'Always check current Hugging Face pricing at huggingface.co/pricing.',
        ],
        note: 'For a student demo with a few visitors per day, the OpenAI API cost with gpt-4o-mini is essentially negligible (cents per day). Set a monthly spending cap in OpenAI settings to be safe.',
      },
    ],
  },

  {
    phase: '15',
    title: 'Common errors and fixes',
    color: '#F97316',
    steps: [
      {
        label: 'Error 1 — OPENAI_API_KEY not set',
        isText: true,
        text: [
          'Problem: Chatbot returns "OPENAI_API_KEY is not set"',
          '',
          'Fix: Add the key in Space Settings → Secrets:',
          '   OPENAI_API_KEY = sk-your-key',
          'Space will restart automatically after saving.',
        ],
        note: '',
      },
      {
        label: 'Error 2 — ModuleNotFoundError',
        isText: true,
        text: [
          'Problem: "ModuleNotFoundError: No module named openai" (or gradio)',
          '',
          'Fix: Add the missing package to requirements.txt and push.',
          '   gradio',
          '   openai',
        ],
        note: '',
      },
      {
        label: 'Error 3 — Space stuck building',
        isText: true,
        text: [
          'Problem: Space stays in "Building" for more than 10 minutes.',
          '',
          'Cause A: requirements.txt has a large package (transformers, torch).',
          '   First build with torch takes 8–15 min. Normal — wait it out.',
          '',
          'Cause B: Syntax error in app.py.',
          '   Check Build logs for the exact Python error.',
          '',
          'Cause C: Wrong README.md app_file field.',
          '   Make sure app_file: app.py matches your actual file name.',
        ],
        note: '',
      },
      {
        label: 'Error 4 — CUDA not available',
        isText: true,
        text: [
          'Problem: "RuntimeError: CUDA is not available"',
          '',
          'Cause: Code assumes GPU but free CPU Space has no GPU.',
          '',
          'Fix: Use CPU-compatible model loading:',
          '   generator = pipeline("text-generation", model="...", device=-1)',
          '   device=-1 forces CPU',
          '',
          'Or check device at runtime:',
          '   import torch',
          '   device = "cuda" if torch.cuda.is_available() else "cpu"',
        ],
        note: '',
      },
      {
        label: 'Error 5 — OpenAI quota or billing error',
        isText: true,
        text: [
          'Problem: "RateLimitError" or "You exceeded your current quota"',
          '',
          'Cause: OpenAI API key has hit its usage limit or billing is not set.',
          '',
          'Fix:',
          '   1. Log in at platform.openai.com',
          '   2. Check your usage and billing status',
          '   3. Add a payment method or reduce usage',
          '   4. Optionally switch to a cheaper model:',
          '      OPENAI_MODEL = gpt-4o-mini  ← very cheap',
          '   5. Set a monthly spending limit in OpenAI settings',
        ],
        note: '',
      },
      {
        label: 'Error 6 — Chatbot is very slow',
        isText: true,
        text: [
          'Problem: Bot takes 30+ seconds to respond.',
          '',
          'Cause A: HuggingFace model loaded INSIDE the function.',
          '   Wrong: def chat_response(msg, hist): generator = pipeline(...)',
          '   Right: generator = pipeline(...)  ← outside function, loads once',
          '',
          'Cause B: Large model on free CPU.',
          '   Large models (>1GB) are slow on CPU.',
          '   Use a smaller model or switch to OpenAI API.',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '16',
    title: 'Final checklist',
    color: '#34D399',
    steps: [
      {
        label: 'Verify before sharing your chatbot URL',
        isText: true,
        text: [
          '── Code ─────────────────────────────────────────────',
          '  app.py works locally',
          '  No API key hardcoded in app.py',
          '  chat_response function tested locally',
          '',
          '── Files ────────────────────────────────────────────',
          '  requirements.txt correct (gradio + openai OR transformers)',
          '  README.md has correct frontmatter (sdk, sdk_version, app_file)',
          '  .gitignore excludes .env and venv/',
          '',
          '── Security ─────────────────────────────────────────',
          '  No API key committed to repo',
          '  Secret added in Space Settings (if using OpenAI)',
          '  .gitignore prevents future accidental key commits',
          '',
          '── Live verification ─────────────────────────────────',
          '  Space builds successfully',
          '  Chatbot loads in browser',
          '  Test message gets a response',
          '  Conversation history works',
          '  Build/Logs tab shows no errors',
          '',
          '── Sharing ───────────────────────────────────────────',
          '  Live Space URL in GitHub README',
          '  Live Space URL in LinkedIn Projects',
          '  Live Space URL in resume',
        ],
        note: 'A working live chatbot URL is one of the best AI portfolio demos. It shows you built an end-to-end AI product — from logic to deployment.',
      },
    ],
  },
]

// ─── NLP / Text AI Demo → HF Spaces ──────────────────────────────────────────
