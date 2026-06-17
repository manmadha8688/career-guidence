import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#06B6D4'

export default function LocalAIPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(6,182,212,0.09)' : 'rgba(6,182,212,0.13)'
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🏠</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>LocalAI — Self-Hosted OpenAI-Compatible API</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Run a private AI API server on your hardware — any model, no cloud, no API keys</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ 100% FREE', '#4ADE80'], ['localai.io', color], ['Self-Hosted', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>LocalAI is a free, open-source REST API server that gives your own hardware an OpenAI-compatible endpoint. Point any app that calls OpenAI at LocalAI's address instead — same request format, same response format, zero API costs, zero data leaving your network. Unlike Ollama (which focuses on developer UX for a single machine) or LM Studio (which targets desktop experimentation), LocalAI is designed to be an API server — the kind you deploy on a server or VM and share across a team or application. It supports chat completions, embeddings, image generation, text-to-speech, and speech-to-text, all from one self-hosted endpoint. If your goal is to replace OpenAI with a private, self-managed API for a team or project, LocalAI is the right tool.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'How to Use and Set up LocalAI — OpenAI API Open-Source Alternative', url: 'https://www.youtube.com/watch?v=9YuT5bmwQCY', dur: '~20 min', note: 'Step-by-step setup guide — Docker install, model loading, API calls' },
            { label: 'Install & Run LocalAI — LLM, TTS, Stable Diffusion on GPU/CPU', url: 'https://www.youtube.com/watch?v=yNF1vOxMMDg', dur: '~25 min', note: 'Multi-modal walkthrough — chat, image generation, and audio in one server' },
            { label: 'LocalAI Introduction — Install, Configure and Build on Your Own AI Platform', url: 'https://www.youtube.com/watch?v=cMVNnlqwfw4', dur: '~45 min', note: 'Deep-dive — Docker setup, model gallery, building apps on top of LocalAI' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What LocalAI is */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What LocalAI actually is" color={color} />
          <InfoBox color={color} dark={dark}>LocalAI is an API server, not a desktop app. You run it as a Docker container (or binary) on any machine — your laptop, a home server, a cloud VM, or an air-gapped enterprise machine. It listens on a port (default: 8080) and exposes the exact same REST endpoints as OpenAI: /v1/chat/completions, /v1/embeddings, /v1/images/generations, /v1/audio/transcriptions, /v1/audio/speech. Any code that works with the OpenAI SDK works with LocalAI by changing one line: the base URL.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The key design decision that sets LocalAI apart: it runs multiple AI workloads from a single server. Most teams have separate services for chat, embeddings, and image generation — each with their own cloud API costs. LocalAI consolidates all of these into one self-hosted endpoint. A RAG pipeline that needs both embeddings and chat completions, a creative pipeline that needs both image generation and text, a voice app that needs both STT and TTS — all of these can run against a single LocalAI instance with zero per-call cost. The server also works without a GPU; it uses CPU inference by default, which is slower but runs on any machine.</p>
        </Block>

        {/* Key features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Key features" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Full OpenAI API Compatibility', desc: 'Implements /v1/chat/completions, /v1/embeddings, /v1/images/generations, /v1/audio/transcriptions, /v1/audio/speech. Any OpenAI SDK client (Python, JS, Go) works unchanged — just swap the base URL.' },
            { name: 'No GPU Required', desc: 'Runs on CPU using llama.cpp under the hood. Slower than GPU inference, but works on any laptop, server, or VM without special hardware. GPU acceleration optional with NVIDIA CUDA, AMD ROCm, or Intel oneAPI.' },
            { name: 'Docker Deployment', desc: 'Official Docker images for CPU and GPU variants. One docker run command or a docker-compose.yml is all you need to have a running AI API server. No Python environment, no dependency conflicts.' },
            { name: 'GGUF Model Support', desc: 'Loads GGUF-format models (the quantized format from llama.cpp). Download any GGUF model from Hugging Face, place it in the models directory, define a config YAML — and it appears as an API endpoint.' },
            { name: 'Built-in Model Gallery', desc: 'LocalAI ships a curated gallery of optimized models. Install with one API call: POST /models/apply with the model name. The gallery handles downloading, configuring, and registering the model automatically.' },
            { name: 'Multi-modal in One Server', desc: 'Chat LLMs, embedding models, Stable Diffusion image generation, Whisper speech-to-text, and TTS models all run from the same LocalAI instance. One server, one base URL, every modality.' },
          ]} />
        </Block>

        {/* Docker setup */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Docker setup — quickstart" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Pull and run LocalAI (CPU)', body: 'docker run -p 8080:8080 -v $PWD/models:/build/models localai/localai:latest-aio-cpu\n\nThis starts LocalAI on http://localhost:8080. The -v flag mounts a local models/ directory so model files persist between container restarts. The "aio-cpu" tag is the all-in-one CPU image.' },
            { n: '2', title: 'Run with docker-compose (recommended)', body: 'Create docker-compose.yml:\nservices:\n  localai:\n    image: localai/localai:latest-aio-cpu\n    ports:\n      - "8080:8080"\n    volumes:\n      - ./models:/build/models\n    restart: unless-stopped\n\nThen: docker compose up -d' },
            { n: '3', title: 'Install a model from the gallery', body: 'curl http://localhost:8080/models/apply -H "Content-Type: application/json" -d \'{"id": "huggingface@TheBloke/Mistral-7B-Instruct-v0.2-GGUF/mistral-7b-instruct-v0.2.Q4_K_M.gguf"}\'\n\nThe gallery API downloads and registers the model. After it finishes (poll /models/jobs/{id}), the model is ready.' },
            { n: '4', title: 'Or drop in a GGUF file manually', body: 'Download any GGUF from Hugging Face into your models/ directory, then create a YAML config:\n# models/mistral.yaml\nname: mistral\nbackend: llama\nparameters:\n  model: mistral-7b-instruct-v0.2.Q4_K_M.gguf\n  context_size: 4096\n\nRestart the container and the model appears at the API.' },
          ]} />
        </Block>

        {/* Using the API */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Using the API with OpenAI SDK" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Python — point client at LocalAI', body: 'pip install openai\n\nfrom openai import OpenAI\nclient = OpenAI(\n    base_url="http://localhost:8080/v1",\n    api_key="not-needed"  # LocalAI ignores the key by default\n)' },
            { n: '2', title: 'Chat completions', body: 'response = client.chat.completions.create(\n    model="mistral",  # must match your model YAML name\n    messages=[{"role": "user", "content": "Explain Docker in one paragraph"}]\n)\nprint(response.choices[0].message.content)\n\nIdentical to OpenAI — change the model name and base_url, nothing else.' },
            { n: '3', title: 'Embeddings', body: 'result = client.embeddings.create(\n    model="text-embedding-ada-002",  # map to a local embedding model\n    input="LocalAI is an OpenAI-compatible API server"\n)\nvector = result.data[0].embedding\nprint(f"Embedding dim: {len(vector)}")\n\nUse with ChromaDB, FAISS, or any vector DB for local RAG at zero cost.' },
            { n: '4', title: 'Image generation', body: 'image = client.images.generate(\n    model="stablediffusion",  # configure a diffusion model in LocalAI\n    prompt="a futuristic city at night, cyberpunk style",\n    n=1,\n    size="512x512"\n)\nprint(image.data[0].url)\n\nStable Diffusion runs locally — no DALL-E API costs.' },
          ]} />
        </Block>

        {/* LocalAI vs Ollama vs LM Studio */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="LocalAI vs Ollama vs LM Studio" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'LocalAI', badge: 'API server focus', body: 'Designed for deployment as a shared API server. Best for: teams sharing a single AI endpoint, projects that need chat + embeddings + images + audio from one service, air-gapped production deployments, replacing OpenAI costs across an entire app. Requires more manual setup (YAML configs, Docker volumes). More powerful, more complex.' },
            { label: 'Ollama', badge: 'Developer UX focus', body: 'Designed for a single developer running models locally during development. Best for: quick model downloads and chat, OpenAI-compatible dev API, switching models fast. Simpler commands (ollama pull, ollama run), cleaner developer experience. Less flexible for multi-modal or team deployments. 15–20% faster inference than LocalAI on LLM tasks.' },
            { label: 'LM Studio', badge: 'Desktop GUI focus', body: 'Designed for interactive exploration and experimentation on a desktop machine. Best for: beginners, browsing and comparing models, quick prompting without code. Not intended for serving APIs to applications. No Docker, no CLI — pure desktop GUI. Ideal for learning what models can do, not for production deployment.' },
          ]} />
        </Block>

        {/* Use cases */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="When to use LocalAI" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Team API Server', desc: 'Deploy LocalAI on one machine (or VM) on your network. Every team member points their OpenAI SDK calls at the same LocalAI URL. No one needs their own API key. No per-token costs for internal tools, scripts, and experiments.' },
            { name: 'Air-Gapped Environments', desc: 'Banks, hospitals, government, and defense projects where data cannot touch the internet. LocalAI on an internal server gives the full OpenAI API surface with no network dependency after model download. Fully compliant with data isolation requirements.' },
            { name: 'Eliminating Cloud API Costs', desc: 'High-volume internal tools — document processing, code review automation, batch summarization — are expensive against cloud APIs. LocalAI handles these workloads at fixed hardware cost. The ROI pays off quickly for teams with high token volumes.' },
            { name: 'Multi-modal Apps Without Multiple APIs', desc: 'An app that generates images, transcribes audio, creates embeddings, and chats can use one LocalAI instance for everything. No managing multiple API keys and vendor accounts. One endpoint, one auth, all modalities.' },
            { name: 'Privacy-First Applications', desc: 'HR tools, legal document analysis, medical record summarization — anything where data privacy is a legal or ethical requirement. LocalAI keeps all data on your infrastructure. Zero leakage to cloud providers.' },
            { name: 'Development and CI/CD', desc: 'Run tests against AI features without real API costs or rate limits. LocalAI in Docker makes it easy to spin up a local AI server in CI pipelines for integration testing of AI-powered features.' },
          ]} />
        </Block>

        {/* Supported model formats */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Supported model formats and backends" color={color} />
          <p style={{ ...P(sub), marginBottom: '1rem' }}>LocalAI uses a plugin-style backend system. Each backend handles a different format or task type. The most important ones to know:</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: 'GGUF', title: 'GGUF — primary format for LLMs', body: 'The standard quantized format for llama.cpp. All major open-source LLMs (Llama, Mistral, Gemma, Phi, Qwen, DeepSeek) are available as GGUF on Hugging Face. Pick the Q4_K_M quantization for the best balance of quality and RAM use. This is the format you will use most.' },
            { n: 'SD', title: 'Stable Diffusion — image generation', body: 'LocalAI supports Stable Diffusion 1.5 and SDXL for image generation via the /v1/images/generations endpoint. Download diffusion model weights, point the config at them — fully local image generation compatible with the DALL-E API format.' },
            { n: 'Whisper', title: 'Whisper — speech to text', body: 'OpenAI Whisper models run locally for speech-to-text. Exposes the /v1/audio/transcriptions endpoint. Useful for building transcription tools that process audio without sending data to OpenAI. Whisper models are available in tiny, base, small, medium, large sizes.' },
            { n: 'TTS', title: 'Text-to-Speech backends', body: 'LocalAI supports several TTS engines via the /v1/audio/speech endpoint. Piper TTS is the recommended backend — fast, free, offline, and produces natural-sounding speech in multiple languages. No ElevenLabs costs for internal tools.' },
          ]} />
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Private Team AI API Server</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Set up a LocalAI server with three models: one LLM (Mistral 7B), one embedding model, and one Whisper STT model. Write a Python script that uses all three through the OpenAI SDK — chat, generate embeddings for a set of documents, and transcribe an audio clip. Everything runs locally. The entire multi-modal AI stack costs ₹0 to run.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Start LocalAI with Docker', body: "docker run -p 8080:8080 -v $(pwd)/models:/build/models localai/localai:latest-aio-cpu\n\nCreate a models/ directory first. On Windows: use %cd%/models or an absolute path. Wait for LocalAI to finish starting — it prints 'LocalAI API is ready' when done." },
            { n: '2', title: 'Install a GGUF model', body: "Download Mistral-7B-Instruct Q4_K_M GGUF from Hugging Face into models/. Create models/mistral.yaml:\nname: mistral\nbackend: llama\nparameters:\n  model: mistral-7b-instruct-v0.2.Q4_K_M.gguf\n  context_size: 4096\n\nRestart LocalAI — the model is now available at /v1/chat/completions." },
            { n: '3', title: 'Connect with OpenAI SDK', body: "pip install openai\n\nfrom openai import OpenAI\nclient = OpenAI(base_url='http://localhost:8080/v1', api_key='local')\n\nresponse = client.chat.completions.create(\n    model='mistral',\n    messages=[{'role': 'user', 'content': 'What is LocalAI in one sentence?'}]\n)\nprint(response.choices[0].message.content)" },
            { n: '4', title: 'Compare cost: LocalAI vs OpenAI', body: "Estimate: if your app sends 1M tokens/day to GPT-4o-mini at $0.15/1M input tokens = $45/month.\nLocalAI on a $10/month VPS: $10/month — same traffic, 78% cheaper.\nFor internal tools processing 10M+ tokens/month, the savings compound fast. Calculate your team's actual token usage and project the savings." },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — LocalAI is free, open source, runs on your own hardware or any cheap VPS</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>The single most impactful LocalAI optimization: choose the right GGUF quantization. Q4_K_M is the sweet spot — roughly 4-bit with K-quant mixing that preserves quality on important layers. Q2_K fits more models into RAM but noticeably degrades coherence on complex tasks. Q8_0 is near-lossless but doubles the file size vs Q4. For a team API server, run Q4_K_M for general use. If a specific task (legal analysis, code generation) needs higher quality, load a Q6_K or Q8_0 variant as a second named model alongside your default. Users pick the right model per task — LocalAI serves both from one container.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/local/lmstudio')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> LM Studio
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/local/oobabooga')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            text-gen-webui <ChevronRight size={14} />
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
