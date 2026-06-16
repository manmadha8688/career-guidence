import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#6366F1'

export default function LMStudioPage() {
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🖥️</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>LM Studio — Desktop App for Running Local AI Models</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>A beautiful UI to discover, download, and chat with any local model</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['Windows / Mac / Linux', color], ['No code needed', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>LM Studio is a desktop application that gives you a polished GUI for downloading and running local AI models — think of it as the App Store + ChatGPT interface combined, but for running models on your own hardware. Browse thousands of models from Hugging Face directly in the app, download with one click, chat through a clean interface, and run a local server with an OpenAI-compatible API. Where Ollama is primarily a CLI and API tool optimized for developers, LM Studio is designed for anyone — no command line required. For students who prefer a visual, application-based experience for running local models, LM Studio is the most polished option available.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'LM Studio Tutorial — Run AI Locally with No Code', url: 'https://www.youtube.com/watch?v=yBI1nPep72Q', dur: '16 min', note: 'Complete beginner guide' },
            { label: 'LM Studio vs Ollama — Which is Better for Local AI?', url: 'https://www.youtube.com/watch?v=r1qGFm7iCUI', dur: '12 min', note: 'Direct comparison' },
            { label: 'LM Studio Local Server — OpenAI-Compatible API Setup', url: 'https://www.youtube.com/watch?v=Bm2IFPFdHp0', dur: '10 min', note: 'Developer API setup' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What LM Studio offers */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What LM Studio offers" color={color} />
          <InfoBox color={color} dark={dark}>LM Studio has three main views: Discover (browse and download models from Hugging Face), Chat (full conversation interface with model switching, system prompts, conversation history), and Local Server (run an OpenAI-compatible server so any application can use your local model as if it were the OpenAI API). All three work together — download a model in Discover, chat with it, and serve it to your applications.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The model discovery interface is LM Studio's standout feature. It connects directly to Hugging Face, shows model cards, ratings, memory requirements, and download sizes. You can search for models by capability (coding, instruction, chat, multilingual), filter by size to match your RAM, and read community reviews — all without leaving the app. This makes finding the right model for your hardware trivially easy compared to researching on Hugging Face manually.</p>
        </Block>

        {/* Key features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Key features" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Model discovery', desc: 'Browse Hugging Face models directly in the app. Filter by task, size, architecture. See memory requirements. Download with one click. No command line needed.' },
            { name: 'Chat interface', desc: 'Full conversation interface: system prompt editor, temperature control, conversation history, model switching. Comparable to ChatGPT in functionality.' },
            { name: 'Local server', desc: 'Start an OpenAI-compatible server on localhost:1234. Any application using the OpenAI SDK works with your local models — just change the base_url.' },
            { name: 'Model management', desc: 'See all downloaded models, their sizes, and memory usage. Delete models you no longer need. Track total disk usage. Simple management UI.' },
            { name: 'Prompt templates', desc: 'LM Studio applies the correct prompt template for each model automatically (Llama chat format, Mistral format, etc.). Getting prompt templates wrong produces degraded outputs — LM Studio handles this for you.' },
            { name: 'Hardware acceleration', desc: 'Automatically uses GPU acceleration if available (CUDA for NVIDIA, Metal for Apple Silicon). Shows memory usage split between CPU RAM and GPU VRAM. Optimizes inference for your hardware.' },
          ]} />
        </Block>

        {/* Setting up and running your first model */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Setting up and running your first model" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Download LM Studio', body: 'lmstudio.ai → download for your OS. Install like any desktop app. Launches to a clean dashboard showing your system specs and recommended models for your hardware.' },
            { n: '2', title: 'Find a model to download', body: 'Click Discover tab. Browse or search. Recommended starting models: Llama-3.1-8B-Instruct (general use), Phi-3-mini-4k-instruct (low RAM), Mistral-7B-Instruct (coding). Click Download.' },
            { n: '3', title: 'Start a chat', body: 'Click the Chat tab (speech bubble icon). Select your downloaded model from the dropdown. Configure the system prompt if desired. Start chatting. All runs locally, instantly.' },
            { n: '4', title: 'Adjust generation settings', body: 'Temperature (0 = deterministic, 1 = creative), Context Length (how much conversation history), GPU Layers (how many layers to offload to GPU). Start with defaults and adjust if quality or speed is not what you expect.' },
            { n: '5', title: 'Start the local server', body: "Click the Server tab (➤ icon). Choose a model. Click Start Server. The server runs on localhost:1234 with an OpenAI-compatible API. Use base_url='http://localhost:1234/v1' in any OpenAI SDK application." },
          ]} />
        </Block>

        {/* Using LM Studio's server in your code */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Using LM Studio's server in your code" color={color} />
          <InfoBox color={color} dark={dark}>LM Studio's local server exposes the same endpoints as the OpenAI API — /v1/chat/completions, /v1/completions, /v1/embeddings. Any existing code using the OpenAI SDK connects to your local model by changing two values: the base URL and the model name. No other code changes required.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Connect with OpenAI SDK', body: "from openai import OpenAI\nclient = OpenAI(\n    base_url='http://localhost:1234/v1',\n    api_key='lm-studio'  # any string, ignored locally\n)\nresponse = client.chat.completions.create(\n    model='local-model',  # LM Studio accepts any string here\n    messages=[{'role': 'user', 'content': 'Hello'}]\n)" },
            { n: '2', title: 'Integrate with LangChain', body: "from langchain_openai import ChatOpenAI\nllm = ChatOpenAI(\n    base_url='http://localhost:1234/v1',\n    api_key='lm-studio',\n    model='local-model'\n)\nDrop-in replacement for ChatOpenAI in any LangChain chain." },
            { n: '3', title: 'Test with curl', body: 'curl http://localhost:1234/v1/chat/completions -H \'Content-Type: application/json\' -d \'{"messages": [{"role": "user", "content": "Hello"}], "temperature": 0.7}\'\nFastest way to verify the server is working before writing code.' },
          ]} />
        </Block>

        {/* LM Studio vs Ollama */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="LM Studio vs Ollama" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'User interface', badge: 'LM Studio wins', body: 'LM Studio: polished desktop app with GUI, model browser, chat interface. Ollama: command-line tool and REST API. For non-developers or anyone who prefers visual tools, LM Studio is significantly more accessible.' },
            { label: 'Developer integration', badge: 'Ollama slightly easier', body: "Both expose OpenAI-compatible APIs. Ollama's CLI (ollama pull, ollama run) integrates more naturally into developer workflows. LM Studio requires the GUI to be running. For server deployment, Ollama is the standard choice." },
            { label: 'Model selection', badge: 'LM Studio broader', body: "LM Studio connects to all of Hugging Face. Ollama has a curated model library (~200 models). For accessing niche, specialized, or newly released models not yet in Ollama's library, LM Studio gives broader access." },
            { label: 'Use together?', badge: 'Yes — complementary', body: 'Many developers use both. LM Studio to discover and evaluate models (better browsing UI), Ollama for consistent CLI/API usage in development. Download in LM Studio to assess quality, then use Ollama for the actual development workflow.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Download and run any model from Hugging Face on your computer through a visual app with no command line',
            'Chat with local AI models through a polished interface comparable to ChatGPT — completely offline',
            'Run a local OpenAI-compatible server so any application uses your local model with zero code changes',
            'Compare different models side-by-side in the same chat interface to find the best one for your needs',
            'Develop and test AI features on your laptop for free before connecting to paid cloud APIs',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Model Evaluation</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Download 3 different models in LM Studio (try: Llama 3.1 8B, Phi-3 Mini, and Mistral 7B or another model your hardware can run). Ask all 3 the same 10 questions covering different domains: a coding task, an explanation task, a creative writing task, a math word problem, and a reasoning task. Score each response 1-5 for quality. At the end, you'll have a personal benchmark that matches your actual use cases — more useful than any public leaderboard.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Download 3 models', body: "Use LM Studio's Discover tab to find and download 3 models within your RAM budget. Check the memory requirement badge before downloading — it shows exact RAM needed." },
            { n: '2', title: 'Write your 10 test prompts', body: 'Write prompts you would actually use: debug this Python error, explain this algorithm, write a function that does X, solve this word problem. Your real use cases, not generic benchmarks.' },
            { n: '3', title: 'Run all prompts through all models', body: 'Switch models between conversations. Keep responses in separate text files or a spreadsheet. Score each immediately while it is fresh — harder to score accurately after the fact.' },
            { n: '4', title: 'Pick your daily driver', body: 'Which model scored highest on the tasks you care about? That is your default model for local development. Revisit this benchmark when new model releases appear.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — LM Studio is free, all models run on your hardware</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Pay attention to the 'context length' setting in LM Studio. Default is often 2048 tokens — about 1500 words. For conversations, document analysis, or code review, you typically want 4096-8192 tokens of context. Check the model's supported context length (shown in the model card) and increase the context length in LM Studio's generation settings. Many users get worse results than a model is capable of simply because the context window is too small.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/local/ollama')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Ollama
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/vector/chromadb')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            ChromaDB <ChevronRight size={14} />
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
