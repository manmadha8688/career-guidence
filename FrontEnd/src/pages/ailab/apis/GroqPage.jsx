import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#3B82F6'

export default function GroqPage() {
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>APIs</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>⚡</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Groq — The Fastest AI API on the Planet</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Run open-source LLMs at speeds that feel instant</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE TIER', '#4ADE80'], ['Free API key', color], ['Ultra-fast inference', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Groq is not a model company — they build hardware. The Groq LPU (Language Processing Unit) is custom silicon designed specifically for running large language models, not repurposed GPU chips. The result is jaw-dropping inference speed: where OpenAI's GPT-4o might return 50-80 tokens per second, Groq returns 500-800 tokens per second — nearly 10x faster. This speed is not just impressive in benchmarks; it changes what is possible. Real-time voice applications, live code streaming, instant document analysis, applications where any noticeable delay breaks the user experience. Groq hosts popular open-source models — Llama 3, Mixtral, Gemma — for free via API, making it the best way to build fast AI applications without paying per token during development and experimentation.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Getting Started With Groq API In Python', url: 'https://www.youtube.com/watch?v=jScpBCBoGdU', dur: '~12 min', note: 'First API call walkthrough — setup to streaming in Python' },
            { label: 'Create Your Own Groq AI Chatbot In Python In Less than 10 Minutes', url: 'https://www.youtube.com/watch?v=ToONdnhpFBg', dur: '10 min', note: 'Build a streaming chatbot from scratch with Groq' },
            { label: 'Build an AI Chatbot in 15 Minutes with Groq AI API', url: 'https://www.youtube.com/watch?v=hyY2RKb-qnM', dur: '15 min', note: 'Full project — real-time streaming Python app' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Why speed matters */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why speed matters" color={color} />
          <InfoBox color={color} dark={dark}>The Groq LPU achieves its speed through a fundamentally different architecture. Traditional GPU inference processes transformer attention in parallel across matrix operations — efficient but not optimized for sequential token generation. Groq's LPU processes token generation as a streaming pipeline where each layer feeds directly into the next without memory bottlenecks. The result: tokens arrive in a continuous stream rather than in batches.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>In practical terms, speed changes the category of applications you can build. A 3-second response time works for a chat interface but breaks a voice application. At 500 tokens/second, a 200-token response arrives in 0.4 seconds — fast enough for real-time voice, live transcription assistance, and applications where the AI response needs to feel as fast as a human typing. For students building portfolio projects, Groq's speed alone makes your demo feel significantly more impressive.</p>
        </Block>

        {/* Available models */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Available models on Groq" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Llama 3.1 70B', desc: "Meta's flagship open-source model. Strong reasoning, coding, instruction following. Comparable to GPT-3.5 Turbo on most tasks. Best general-purpose choice on Groq." },
            { name: 'Llama 3.1 8B', desc: 'Smaller, even faster. Excellent for tasks where response quality matters less than latency — classification, routing, simple Q&A. Best for high-volume low-cost use.' },
            { name: 'Mixtral 8x7B', desc: "Mistral's mixture-of-experts model. Strong on code generation and multilingual tasks. Often outperforms models twice its size on technical tasks." },
            { name: 'Gemma 2 9B', desc: "Google's open-source model. Good instruction following and safety. Solid choice for content that needs conservative outputs." },
            { name: 'Llama 3.2 Vision', desc: 'Multimodal — accepts images alongside text. Analyze screenshots, diagrams, photos via API. Rare to have vision capability free in an API.' },
            { name: 'Whisper v3', desc: "OpenAI's open-source speech-to-text model, running on Groq's hardware for fast transcription. Transcribe audio files or live audio at high speed." },
          ]} />
        </Block>

        {/* Making your first API call */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Making your first API call" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Get your free API key', body: 'Go to console.groq.com → Sign up with email → API Keys → Create API key. Free tier includes generous limits: 14,400 requests/day on Llama 3.1 70B.' },
            { n: '2', title: 'Install the SDK', body: "pip install groq (Python) or npm install groq (Node.js). Groq's SDK is OpenAI-compatible — if you know the OpenAI SDK, you already know Groq." },
            { n: '3', title: 'Write your first call', body: "from groq import Groq\nclient = Groq(api_key='your_key')\nresponse = client.chat.completions.create(\n  model='llama-3.1-70b-versatile',\n  messages=[{'role': 'user', 'content': 'Hello!'}]\n)\nprint(response.choices[0].message.content)" },
            { n: '4', title: 'Add streaming', body: 'For real-time output (text appears as it generates): add stream=True to the create() call. Iterate over the response chunks. This is what makes chatbots feel live.' },
            { n: '5', title: 'Set your API key as environment variable', body: "Never hardcode API keys in code. Use .env file + python-dotenv: GROQ_API_KEY=your_key_here. Access with os.getenv('GROQ_API_KEY'). Add .env to .gitignore immediately." },
          ]} />
        </Block>

        {/* Groq vs OpenAI */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Groq vs OpenAI API" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Speed', badge: 'Groq wins by a wide margin', body: 'Groq: 500-800 tokens/second. OpenAI GPT-4o: 50-80 tokens/second. OpenAI GPT-4o-mini: ~100 tokens/second. For latency-sensitive applications, Groq is in a different category entirely.' },
            { label: 'Model quality', badge: 'OpenAI leads on top tasks', body: "GPT-4o and Claude 3.5 Sonnet remain the strongest models for complex reasoning and code generation. Groq's Llama 3.1 70B is excellent but not quite at that level. For most production use cases, the quality difference is acceptable; for the hardest reasoning tasks, OpenAI edges ahead." },
            { label: 'Cost', badge: 'Groq wins for free development', body: 'Groq free tier: 14,400 requests/day. OpenAI free tier: $5 credit, then pay per token. For development and experimentation, Groq is effectively free. For production, Groq paid pricing is competitive — ~$0.59/1M tokens for Llama 3.1 70B.' },
            { label: 'OpenAI compatibility', badge: 'Groq advantage', body: "Groq's API is 100% compatible with the OpenAI client library. Change one line: base_url='https://api.groq.com/openai/v1'. Any code written for OpenAI runs on Groq without changes. This makes switching trivial for experiments." },
          ]} />
        </Block>

        {/* Practical use cases */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Practical use cases" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Real-time chatbots', desc: "Build a streaming chatbot where responses appear token by token. Groq's speed makes the streaming feel natural — like someone typing fast, not like waiting for a batch response." },
            { name: 'Voice applications', desc: "Combine Groq's Whisper (speech-to-text) with Llama 3.1 (reasoning) and a TTS service. End-to-end voice assistant latency under 1 second is achievable on Groq." },
            { name: 'Document processing', desc: "Process large batches of documents quickly. Summarize 100 reports, classify 1000 emails, extract data from 500 pages — Groq's speed makes batch processing practical." },
            { name: 'Prototyping any AI feature', desc: 'Because it is free and fast, Groq is ideal for rapid prototyping. Test ideas quickly, iterate on prompts without watching costs, build demos that impress in presentations.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Build AI-powered applications with responses that feel instant — no noticeable delay for users',
            'Use open-source models (Llama, Mixtral, Gemma) for free during development without burning API credits',
            "Transcribe audio files and live speech with Whisper running on Groq's fast hardware",
            'Switch any OpenAI-based code to Groq by changing one line — same SDK, dramatically faster',
            'Build real-time streaming chatbots where text appears token-by-token as it generates',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Streaming Chatbot</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Create a simple chatbot web app or CLI that uses Groq's API with streaming enabled. The user types a message, presses enter, and the response streams in token-by-token in real time. Focus on: (1) correct streaming implementation, (2) conversation history (pass previous messages in the messages array), (3) environment variable for the API key, (4) graceful error handling. The streaming experience is the point — make it feel fast.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Set up your environment', body: 'Create a project folder. pip install groq python-dotenv (or npm install groq). Create .env with GROQ_API_KEY=your_key. Create .gitignore with .env on the first line.' },
            { n: '2', title: 'Implement streaming', body: "Call client.chat.completions.create() with stream=True. Iterate over chunks: for chunk in stream: print(chunk.choices[0].delta.content or '', end='', flush=True). The flush=True makes characters appear immediately." },
            { n: '3', title: 'Add conversation history', body: 'Maintain a messages list. Append each user message and assistant response. Pass the full list to every API call. This gives the model conversation memory.' },
            { n: '4', title: 'Test the speed', body: 'Run your chatbot. Ask a question that requires a long response. Time how quickly it starts streaming and how fast the text arrives. Compare to a ChatGPT free tier response for the same question.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Groq free tier, 14,400 requests/day included</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Groq's free tier limits reset daily. If you hit the rate limit during development, switch to the 8B model (much higher limits) for testing and switch back to 70B for demos and production. The 8B model is fast enough to test streaming and conversation logic — you only need 70B when testing response quality.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/coding/codeium')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Codeium
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/apis/openai-api')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            OpenAI API <ChevronRight size={14} />
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
