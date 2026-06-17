import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#6366F1'

export default function OllamaPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(0,217,255,0.09)' : 'rgba(79,70,229,0.11)'
  const txt   = dark ? '#E2E8F0' : '#0F172A'
  const sub   = dark ? '#94A3B8' : '#475569'
  const muted = dark ? '#64748B' : '#94A3B8'

  return (
    <div style={{ minHeight: '100vh', background: bg, color: txt, fontFamily: "'Rajdhani', sans-serif", overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, borderRadius: '50%', background: `radial-gradient(ellipse, ${color}07 0%, transparent 65%)`, filter: 'blur(60px)' }} />
      </div>

      <nav style={{ position: 'sticky', top: 0, zIndex: 50, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', background: dark ? 'rgba(2,8,23,0.93)' : 'rgba(240,244,255,0.95)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${border}` }}>
        <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.72rem', letterSpacing: '0.1em', color: CYAN, padding: 0 }}>
          <ArrowLeft size={14} /> AI Lab
        </button>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Local AI</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🦙</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Ollama — Run AI Models Locally on Your Machine</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Download and run Llama, Mistral, Gemma, and more — no cloud, no API key</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ COMPLETELY FREE', '#4ADE80'], ['No API key needed', color], ['Runs offline', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Ollama is the easiest way to run large language models on your own computer. Download the app, run one command, and a model like Llama 3.1, Mistral, Gemma 2, or Phi-3 is running locally — no internet connection required, no API key, no per-token cost, complete data privacy. Ollama manages model downloads, quantization, and the inference server automatically. It exposes a local REST API that is compatible with the OpenAI SDK, so any code that calls OpenAI can be switched to a local model by changing one line. For students who want to experiment with AI without spending money, or for any application where data privacy is critical, Ollama is the starting point.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Learn Ollama in 15 Minutes — Run LLM Models Locally for FREE', url: 'https://www.youtube.com/watch?v=UtSSMs6ObqY', dur: '15 min', note: 'Best quick start — install, pull, run, API usage in 15 minutes' },
            { label: 'How to Run & Train LLMs Locally with Ollama — Beginner to Pro', url: 'https://www.youtube.com/watch?v=bRsAMtNfShk', dur: '~40 min', note: 'Complete guide — setup, models, Python integration, fine-tuning' },
            { label: 'How to Run Local LLMs with Ollama: A Step-by-Step Guide', url: 'https://www.youtube.com/watch?v=N4haIG4kWN8', dur: '~25 min', note: 'Step-by-step 2025 — covers latest models and Open WebUI setup' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Why run models locally */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why run models locally" color={color} />
          <InfoBox color={color} dark={dark}>Local models offer three things cloud APIs cannot: zero ongoing cost (run unlimited times after model download), complete data privacy (nothing leaves your machine), and offline operation (works without internet). The tradeoff: local models require disk space (4–40GB per model) and are slower than cloud APIs on most consumer hardware without a dedicated GPU.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The practical sweet spot for local models in 2025: Llama 3.1 8B and Gemma 2 9B run well on 8GB RAM with acceptable speed on CPU. Phi-3 Mini runs on 4GB RAM. For development, testing prompts, building features that need privacy, or learning how models work without API costs — these models are more than capable. For tasks requiring the absolute best quality (complex reasoning, difficult code), cloud APIs still lead. The right approach: use local models for development and experimentation, cloud for production when quality demands it.</p>
        </Block>

        {/* Getting started */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Getting started" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Download and install Ollama', body: 'Go to ollama.com → download for Windows, Mac, or Linux. Install like a regular app. Ollama runs a background service that manages models and handles inference requests on localhost:11434.' },
            { n: '2', title: 'Pull your first model', body: 'ollama pull llama3.1 (8B, ~5GB)\nollama pull gemma2 (9B, ~6GB)\nollama pull phi3 (3.8B, ~2.3GB — best for low-RAM systems)\nModels download once. After that they run instantly offline.' },
            { n: '3', title: 'Chat in the terminal', body: 'ollama run llama3.1\nType your message and press Enter. Type /bye to exit. This is the fastest way to test a model — no code needed.' },
            { n: '4', title: 'Use the REST API', body: "Ollama runs on http://localhost:11434. It accepts the same request format as OpenAI:\ncurl http://localhost:11434/api/chat -d '{\"model\": \"llama3.1\", \"messages\": [{\"role\": \"user\", \"content\": \"Hello\"}]}'" },
          ]} />
        </Block>

        {/* Popular models */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Popular models and what they're good for" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Llama 3.1 8B', desc: "Meta's flagship small model. Best general-purpose local model for most tasks. ~5GB download. Requires 8GB RAM. Strong instruction following, coding, and reasoning for its size." },
            { name: 'Llama 3.1 70B', desc: 'Much more capable, much larger. ~40GB download. Requires 32GB+ RAM or GPU VRAM. Quality approaches GPT-3.5. Only practical on high-spec machines or with GPU.' },
            { name: 'Gemma 2 9B', desc: "Google's open-source model. Excellent instruction following and safety. Slightly better than Llama 3.1 8B on some tasks. ~6GB download. Good default choice." },
            { name: 'Phi-3 Mini (3.8B)', desc: "Microsoft's surprisingly capable small model. ~2.3GB download. Runs on 4GB RAM. Best choice for low-spec hardware. Strong for its size on reasoning tasks." },
            { name: 'Mistral 7B', desc: 'Fast and capable. Strong on coding and technical tasks. ~4GB download. One of the best models at the 7B parameter level. Good balance of speed and quality.' },
            { name: 'CodeLlama / DeepSeek-Coder', desc: 'Fine-tuned specifically for code generation. Better than general models for pure coding tasks. ollama pull codellama or ollama pull deepseek-coder.' },
          ]} />
        </Block>

        {/* Using Ollama with Python */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Using Ollama with Python (OpenAI SDK)" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install OpenAI SDK', body: 'pip install openai\nThe OpenAI Python SDK works with Ollama by changing the base URL. No need for a separate Ollama SDK.' },
            { n: '2', title: 'Point the client to Ollama', body: "from openai import OpenAI\nclient = OpenAI(\n    base_url='http://localhost:11434/v1',\n    api_key='ollama'  # required field but ignored by Ollama\n)" },
            { n: '3', title: 'Make API calls exactly as OpenAI', body: "response = client.chat.completions.create(\n    model='llama3.1',\n    messages=[{'role': 'user', 'content': 'Explain recursion briefly'}]\n)\nprint(response.choices[0].message.content)\nIdentical to OpenAI SDK — just a different base URL and model name." },
            { n: '4', title: 'Use streaming', body: "stream = client.chat.completions.create(\n    model='llama3.1',\n    messages=[{'role': 'user', 'content': 'Write a short poem'}],\n    stream=True\n)\nfor chunk in stream:\n    print(chunk.choices[0].delta.content or '', end='', flush=True)" },
          ]} />
        </Block>

        {/* Open WebUI */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Open WebUI — ChatGPT interface for local models" color={color} />
          <p style={{ ...P(sub), marginBottom: '1rem' }}>Open WebUI is a free, open-source web interface for Ollama that looks and works like ChatGPT. It runs in your browser, connects to your local Ollama instance, and provides a full chat interface with conversation history, system prompts, file uploads, and model switching. If you want the ChatGPT experience with local models at zero cost, Open WebUI + Ollama is the combination.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install with Docker', body: 'docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main\nOpen http://localhost:3000' },
            { n: '2', title: 'Connect to Ollama', body: 'Open WebUI auto-detects Ollama on localhost:11434. Your installed models appear in the model selector immediately. No configuration needed.' },
            { n: '3', title: 'Use like ChatGPT', body: 'Create conversations, save history, set system prompts, upload files for analysis. Full conversation management with local models. Free, private, offline-capable.' },
          ]} />
        </Block>

        {/* LangChain and other frameworks */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Ollama with LangChain and other frameworks" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'LangChain + Ollama', badge: 'ChatOllama class', body: "from langchain_ollama import ChatOllama\nllm = ChatOllama(model='llama3.1')\nDrop-in replacement for ChatOpenAI in any LangChain chain. Build RAG systems, agents, and chains that run entirely locally at zero cost." },
            { label: 'CrewAI + Ollama', badge: 'Local agent teams', body: 'Pass a ChatOllama instance as the llm parameter to any CrewAI Agent. Run multi-agent systems locally — useful for development and for systems processing sensitive data.' },
            { label: 'Flowise + Ollama', badge: 'Visual local AI', body: 'Flowise has an Ollama Chat Model node. Build visual LangChain flows with local models. Prototype AI applications at zero cost before switching to cloud models.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Run Llama 3.1, Gemma 2, Mistral, and 100+ other models on your own computer with zero ongoing cost',
            'Build AI features that work completely offline — no internet, no API key, no usage limits',
            'Process sensitive data (personal documents, confidential code) through an AI without sending it to the cloud',
            'Use any local Ollama model as a drop-in replacement for OpenAI in LangChain, CrewAI, and other frameworks',
            'Get the ChatGPT web interface experience with local models using Open WebUI + Ollama',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}`, marginBottom: '0.5rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 7 }} />
              <span style={{ fontSize: '0.85rem', color: sub, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Private Document Assistant</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Using Ollama (local model) + LangChain + ChromaDB (local vector store), build a document Q&A system where all data stays on your machine. Load a personal document — your CV, notes, a book chapter. Ask questions. The entire pipeline: document → embeddings → vector store → retrieval → LLM → answer runs locally. No data leaves your computer. Cost: ₹0 total.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install everything', body: 'Install Ollama and pull llama3.1. pip install langchain langchain-ollama chromadb sentence-transformers pypdf. All free, all local.' },
            { n: '2', title: 'Build the local RAG chain', body: "Use PyPDFLoader → RecursiveCharacterTextSplitter → HuggingFaceEmbeddings (local, free) → ChromaDB (local) → ChatOllama('llama3.1'). Every component runs on your machine." },
            { n: '3', title: 'Persist the vector store', body: "Pass persist_directory='./chroma_db' when creating ChromaDB. Now the vectors are saved to disk — you do not need to re-embed the document every run." },
            { n: '4', title: 'Test with real questions', body: 'Ask 10 questions about your document. Compare quality to a cloud API (ChatGroq with Llama 3.1 70B via API). Note where the local 8B model struggles vs where it handles questions well.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Ollama is free, all models run locally, no API keys required</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Model quantization is how Ollama fits large models on consumer hardware. A 7B model in full 32-bit precision requires ~28GB RAM. Ollama automatically downloads 4-bit quantized versions (~4GB) that sacrifice small quality for massive size reduction. The 'q4_0' in model names means 4-bit quantization. For most tasks, q4 quality is indistinguishable from full precision. If you need higher quality: pull the q8 version (8-bit, larger but better quality). ollama pull llama3.1:8b-instruct-q8_0</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/automation/zapier')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Zapier
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/local/lmstudio')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            LM Studio <ChevronRight size={14} />
          </button>
        </div>

      </div>
      <ScrollToTop />
    </div>
  )
}

function Block({ title, titleColor, dark, border, card, children }) {
  return (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '1.375rem', backdropFilter: 'blur(8px)', marginBottom: '1.25rem' }}>
      {title && <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.14em', color: titleColor, textTransform: 'uppercase', paddingBottom: '0.75rem', marginBottom: '1rem', borderBottom: `1px solid ${titleColor}20` }}>{title}</div>}
      {children}
    </div>
  )
}

function VideoCard({ v, dark, txt, muted }) {
  return (
    <a href={v.url} target="_blank" rel="noopener noreferrer"
      style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1.125rem', borderRadius: 11, textDecoration: 'none', background: dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.16)', marginBottom: '0.625rem', transition: 'background 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.09)'}
      onMouseLeave={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)'}
    >
      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Play size={13} color="#fff" fill="#fff" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: txt }}>{v.label}</div>
        {(v.dur || v.note) && <div style={{ fontSize: '0.7rem', color: muted, marginTop: 2 }}>{[v.dur, v.note].filter(Boolean).join(' · ')}</div>}
      </div>
      <ExternalLink size={12} color={muted} />
    </a>
  )
}
