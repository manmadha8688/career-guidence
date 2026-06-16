// AI Lab — Minimal hub card data only
// Rich content lives in each tool's dedicated page file

export const CATEGORIES = [
  { id: 'all',        label: 'All Tools' },
  { id: 'foundations',label: 'AI Foundations' },
  { id: 'chatbots',   label: 'AI Chatbots' },
  { id: 'coding',     label: 'Coding Assistants' },
  { id: 'apis',       label: 'Build with AI' },
  { id: 'agents',     label: 'AI Agents' },
  { id: 'automation', label: 'Automation' },
  { id: 'local',      label: 'Local & Open Source' },
  { id: 'vector',     label: 'Vector Databases' },
  { id: 'data',       label: 'Data & Analysis' },
  { id: 'creative',   label: 'Creative & Media' },
  { id: 'voice',      label: 'Voice & Audio' },
  { id: 'career',     label: 'Career & Productivity' },
]

export const TOOLS = [
  // ── FOUNDATIONS ───────────────────────────────────────────
  { id: 'gen-ai',           category: 'foundations', name: 'Generative AI',             tagline: 'What AI actually is — before using any tool',           icon: '🧬', color: '#8B5CF6', free: true,  freeTier: 'Concept — no signup needed' },
  { id: 'prompt-eng',       category: 'foundations', name: 'Prompt Engineering',        tagline: 'The skill that works across every AI tool',               icon: '✍️', color: '#EC4899', free: true,  freeTier: 'Works with any AI tool' },
  { id: 'rag',              category: 'foundations', name: 'RAG',                       tagline: 'How AI reads your own documents to answer accurately',     icon: '📚', color: '#06B6D4', free: true,  freeTier: 'Free open-source tools' },
  { id: 'embeddings',       category: 'foundations', name: 'Embeddings & Vectors',      tagline: 'How AI stores and searches knowledge by meaning',          icon: '🔢', color: '#10B981', free: true,  freeTier: 'Concept — free tools available' },
  // ── CHATBOTS ──────────────────────────────────────────────
  { id: 'chatgpt',          category: 'chatbots',    name: 'ChatGPT',                   tagline: 'Your AI tutor and coding assistant available 24/7',        icon: '🤖', color: '#10B981', free: true,  freeTier: 'Free — GPT-4o with daily limits' },
  { id: 'claude',           category: 'chatbots',    name: 'Claude',                    tagline: 'Better at reasoning, code review, and long documents',     icon: '🎯', color: '#D97706', free: true,  freeTier: 'Free — Claude 3.5 Sonnet' },
  { id: 'gemini',           category: 'chatbots',    name: 'Google Gemini',             tagline: 'Google\'s AI — free, real-time search, Google tools',      icon: '✨', color: '#4285F4', free: true,  freeTier: 'Free — Gemini 2.0 Flash' },
  { id: 'perplexity',       category: 'chatbots',    name: 'Perplexity AI',             tagline: 'AI search that cites every source',                        icon: '🔍', color: '#06B6D4', free: true,  freeTier: 'Free — unlimited basic searches' },
  { id: 'notebooklm',       category: 'chatbots',    name: 'Google NotebookLM',         tagline: 'Chat with your own notes, PDFs, and documents',            icon: '📓', color: '#4F46E5', free: true,  freeTier: '100% Free — Google account' },
  // ── CODING ────────────────────────────────────────────────
  { id: 'copilot',          category: 'coding',      name: 'GitHub Copilot',            tagline: 'AI that writes code alongside you in VS Code',             icon: '🐙', color: '#10B981', free: true,  freeTier: 'Free for students — GitHub Pack' },
  { id: 'cursor',           category: 'coding',      name: 'Cursor',                    tagline: 'VS Code rebuilt for AI-first development',                 icon: '⚡', color: '#F59E0B', free: true,  freeTier: 'Free — 2000 AI completions/month' },
  { id: 'windsurf',         category: 'coding',      name: 'Windsurf',                  tagline: 'Agentic AI editor — builds features autonomously',          icon: '🌊', color: '#0EA5E9', free: true,  freeTier: 'Free tier available' },
  { id: 'codeium',          category: 'coding',      name: 'Codeium',                   tagline: 'Free AI coding — unlimited, no subscription ever',          icon: '🚀', color: '#06B6D4', free: true,  freeTier: '100% Free — unlimited' },
  // ── BUILD WITH AI ─────────────────────────────────────────
  { id: 'groq',             category: 'apis',        name: 'Groq API',                  tagline: 'Free + fastest LLM API — perfect for learning',            icon: '⚡', color: '#EF4444', free: true,  freeTier: 'Free API key — generous limits' },
  { id: 'openai-api',       category: 'apis',        name: 'OpenAI API',                tagline: 'Add GPT-4 to your own applications',                       icon: '🔌', color: '#10B981', free: false, freeTier: '$5 lasts months for learning' },
  { id: 'together-ai',      category: 'apis',        name: 'Together AI',               tagline: 'Free credits, 200+ open-source models via API',            icon: '🤝', color: '#8B5CF6', free: true,  freeTier: 'Free $25 credits on signup' },
  { id: 'huggingface',      category: 'apis',        name: 'Hugging Face',              tagline: 'The GitHub of AI — 500,000+ free models',                  icon: '🤗', color: '#F59E0B', free: true,  freeTier: 'Free Inference API included' },
  // ── AI AGENTS ─────────────────────────────────────────────
  { id: 'langchain',        category: 'agents',      name: 'LangChain',                 tagline: 'The framework for building LLM-powered applications',      icon: '🦜', color: '#10B981', free: true,  freeTier: 'Free — open source' },
  { id: 'langgraph',        category: 'agents',      name: 'LangGraph',                 tagline: 'Build complex multi-step agents with state management',     icon: '🕸️', color: '#8B5CF6', free: true,  freeTier: 'Free — open source' },
  { id: 'crewai',           category: 'agents',      name: 'CrewAI',                    tagline: 'Multiple AI agents collaborating as a team',               icon: '👥', color: '#EC4899', free: true,  freeTier: 'Free — open source' },
  { id: 'autogen',          category: 'agents',      name: 'AutoGen',                   tagline: 'Microsoft\'s multi-agent conversational AI framework',      icon: '🔄', color: '#0078D4', free: true,  freeTier: 'Free — open source (Microsoft)' },
  { id: 'openclaw',         category: 'agents',      name: 'OpenClaw',                  tagline: 'AI agent gateway — connect AI to any messaging platform',   icon: '🦀', color: '#F97316', free: true,  freeTier: 'Free — open source, self-hosted' },
  { id: 'hermes',           category: 'agents',      name: 'Nous-Hermes',               tagline: 'Self-improving open-source agent — free GPT-4 alternative', icon: '⚗️', color: '#D97706', free: true,  freeTier: 'Free via OpenRouter and Ollama' },
  { id: 'mcp',              category: 'agents',      name: 'MCP Protocol',              tagline: 'Standard for connecting AI to any tool or data source',     icon: '🔗', color: '#D97706', free: true,  freeTier: 'Free — open standard by Anthropic' },
  // ── AUTOMATION ────────────────────────────────────────────
  { id: 'n8n',              category: 'automation',  name: 'n8n',                       tagline: 'Free open-source workflow automation with AI nodes',        icon: '⚙️', color: '#F97316', free: true,  freeTier: 'Free — open source, self-host' },
  { id: 'flowise',          category: 'automation',  name: 'Flowise',                   tagline: 'Build AI chatbots and agents visually — no code',           icon: '🌊', color: '#06B6D4', free: true,  freeTier: 'Free — open source' },
  { id: 'dify',             category: 'automation',  name: 'Dify',                      tagline: 'Open-source LLM app platform — build and deploy AI apps',   icon: '🎯', color: '#8B5CF6', free: true,  freeTier: 'Free cloud tier + open source' },
  { id: 'zapier',           category: 'automation',  name: 'Zapier',                    tagline: 'Connect 6000+ apps without code',                           icon: '⚡', color: '#FF4A00', free: true,  freeTier: 'Free — 5 Zaps, 100 tasks/month' },
  // ── LOCAL AI ──────────────────────────────────────────────
  { id: 'ollama',           category: 'local',       name: 'Ollama',                    tagline: 'Run any LLM on your laptop — free, offline, private',       icon: '🦙', color: '#10B981', free: true,  freeTier: '100% Free — runs on your machine' },
  { id: 'lmstudio',         category: 'local',       name: 'LM Studio',                 tagline: 'Run AI models locally with a friendly desktop GUI',          icon: '🖥️', color: '#6366F1', free: true,  freeTier: '100% Free desktop application' },
  // ── VECTOR DATABASES ──────────────────────────────────────
  { id: 'chromadb',         category: 'vector',      name: 'ChromaDB',                  tagline: 'Free open-source vector database — start RAG in minutes',   icon: '🗄️', color: '#F59E0B', free: true,  freeTier: '100% Free — runs locally' },
  { id: 'pinecone',         category: 'vector',      name: 'Pinecone',                  tagline: 'Managed vector database for production AI apps',             icon: '🌲', color: '#10B981', free: true,  freeTier: 'Free tier — 100k vectors' },
  // ── DATA ──────────────────────────────────────────────────
  { id: 'julius',           category: 'data',        name: 'Julius AI',                 tagline: 'Chat with your data — AI data analyst',                     icon: '📊', color: '#3B82F6', free: true,  freeTier: 'Free tier available' },
  { id: 'code-interpreter', category: 'data',        name: 'ChatGPT Code Interpreter',  tagline: 'Upload data and let ChatGPT analyze it with real Python',    icon: '🐍', color: '#10B981', free: true,  freeTier: 'Free with GPT-4o — daily limits' },
  // ── CREATIVE ──────────────────────────────────────────────
  { id: 'dalle-free',       category: 'creative',    name: 'Bing Image Creator',        tagline: 'DALL-E 3 image generation — completely free',                icon: '🎨', color: '#EC4899', free: true,  freeTier: '100% Free — Microsoft account' },
  { id: 'stable-diffusion', category: 'creative',    name: 'Stable Diffusion',          tagline: 'Free unlimited image AI — runs on your computer',           icon: '🌈', color: '#8B5CF6', free: true,  freeTier: '100% Free — open source' },
  { id: 'gamma',            category: 'creative',    name: 'Gamma.app',                 tagline: 'AI creates beautiful presentations from your text',          icon: '📊', color: '#7C3AED', free: true,  freeTier: 'Free — 400 AI credits on signup' },
  { id: 'canva-ai',         category: 'creative',    name: 'Canva AI',                  tagline: 'Design anything — AI-powered, no design skills needed',      icon: '✨', color: '#00C4CC', free: true,  freeTier: 'Free — Pro free for students' },
  // ── VOICE ─────────────────────────────────────────────────
  { id: 'whisper',          category: 'voice',       name: 'OpenAI Whisper',            tagline: 'Free speech-to-text — transcribe anything accurately',       icon: '🎤', color: '#10B981', free: true,  freeTier: '100% Free — open source' },
  { id: 'elevenlabs',       category: 'voice',       name: 'ElevenLabs',                tagline: 'Realistic AI voice generation and voice cloning',             icon: '🎙️', color: '#F59E0B', free: true,  freeTier: 'Free — 10,000 chars/month' },
  // ── CAREER ────────────────────────────────────────────────
  { id: 'teal',             category: 'career',      name: 'Teal',                      tagline: 'AI-powered resume builder and job search tracker',           icon: '📄', color: '#14B8A6', free: true,  freeTier: 'Free — all core features' },
  { id: 'notion-ai',        category: 'career',      name: 'Notion AI',                 tagline: 'AI writing assistant built into your notes',                 icon: '📝', color: '#475569', free: false, freeTier: '20 free responses then $10/month' },
  { id: 'grammarly',        category: 'career',      name: 'Grammarly AI',              tagline: 'AI writing assistant for professional communication',        icon: '✏️', color: '#15C39A', free: true,  freeTier: 'Free — basic AI features' },
]
