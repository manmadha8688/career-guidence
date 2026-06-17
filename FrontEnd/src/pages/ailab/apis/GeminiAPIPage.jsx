import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#3B82F6'

export default function GeminiAPIPage() {
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🌟</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Gemini API — Google's Most Generous Free AI API</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Multimodal AI with 2M context window — free tier, no credit card</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE TIER', '#4ADE80'], ['Google AI Studio', color], ['2M Token Context', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>The Gemini API gives developers access to Google DeepMind's Gemini models — including Gemini 2.0 Flash, which outperforms GPT-3.5 Turbo and GPT-4 on many benchmarks at a fraction of the cost. The free tier at Google AI Studio requires no credit card and provides generous daily limits for learning and prototyping. The defining technical advantage is Gemini's 2 million token context window — 15x larger than GPT-4o's 128K. In practice, this means you can send an entire codebase, a full book, or a 90-minute audio recording in one API call and have Gemini analyze the entire thing. For students building their first AI-powered applications, the free Gemini API with Python is the most accessible entry point into production AI development.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Gemini API with Python — Getting Started Tutorial', url: 'https://www.youtube.com/watch?v=qfWpPEgea2A', dur: 'Jun 2025', note: 'Patrick Loeber — best beginner guide' },
            { label: 'Google Gemini API Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=0qv_4x1K6hU', dur: 'Beginner', note: 'Complete walkthrough from key to first call' },
            { label: 'Build with Gemini API — Multimodal AI Tutorial', url: 'https://www.youtube.com/watch?v=O00yBRmDFXY', dur: 'Intermediate', note: 'Multimodal: images, PDFs, audio, video' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Getting your free API key */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Getting your free API key" color={color} />
          <InfoBox color={color} dark={dark}>Google AI Studio (ai.google.dev) is for individual developers and students. No credit card required. Vertex AI is Google's enterprise cloud product — requires a GCP project and billing setup. For learning and personal projects, always start with AI Studio.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Go to Google AI Studio', body: 'Open ai.google.dev → click "Get API key" → "Create API key in new project" → copy your key. Takes 60 seconds. Save it immediately — you will use it in every project.' },
            { n: '2', title: 'Install the SDK and make your first call', body: 'pip install google-generativeai\n\nimport google.generativeai as genai\ngenai.configure(api_key=\'YOUR_KEY\')\n\nmodel = genai.GenerativeModel(\'gemini-2.0-flash\')\nresponse = model.generate_content(\'Explain recursion in simple terms\')\nprint(response.text)' },
            { n: '3', title: 'Set your key as an environment variable', body: 'Never hardcode API keys. Create a .env file: GEMINI_API_KEY=your_key_here. Access with: import os; api_key = os.getenv(\'GEMINI_API_KEY\'). Add .env to .gitignore immediately. Push code without the key.' },
          ]} />
        </Block>

        {/* Model lineup */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Model lineup — which to use" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Gemini 2.5 Flash-Lite', badge: 'Highest free limits', body: 'Fastest, cheapest model. 15 RPM, 1000 requests/day free. Use for high-volume simple tasks: text classification, quick Q&A, summarization pipelines where you make many calls. Best for learning and testing.' },
            { label: 'Gemini 2.0 Flash', badge: 'Best all-rounder', body: 'Outperforms Gemini 1.5 Pro on coding tasks (Python, Java, SQL) while running at Flash speed. Paid: ~$0.10/1M input tokens. The default choice for most production applications. Better code generation than same-tier OpenAI models.' },
            { label: 'Gemini 2.5 Flash', badge: 'Current best speed/cost', body: 'Latest generation Flash model. Strongest reasoning at fast inference speed. ~$0.0007/K output tokens. Use this for most new projects — best balance of capability, speed, and cost in 2025.' },
            { label: 'Gemini 2.5 Pro', badge: 'Most capable', body: '$1.25/M input tokens — 50% cheaper than GPT-4o ($2.50/M). Use for the hardest tasks: complex reasoning, long document analysis, difficult code generation. Best when quality matters more than speed.' },
          ]} />
        </Block>

        {/* 2M token context window */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="The 2M token context window" color={color} />
          <p style={{ ...P(sub), marginBottom: '1rem' }}>Gemini's 2 million token context window is its most practically significant feature. GPT-4o supports 128K tokens — roughly 100 pages of text. Gemini 2.0 Flash supports 2 million tokens — roughly 1,500 pages, or an entire codebase, or a 90-minute audio recording. This is not a marginal improvement: it changes what categories of tasks are possible in a single API call.</p>
          <InfoBox color={color} dark={dark}>Practical examples of what fits in 2M tokens: all of Python's standard library documentation, an entire university course's lecture notes, 10 full research papers simultaneously, a 2-hour video transcript, your entire GitHub repository including all source files. For students building RAG systems, the 2M window means some documents don't need chunking at all — just send the whole thing.</InfoBox>
        </Block>

        {/* Multimodal capabilities */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Multimodal capabilities" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Text generation and chat', desc: 'Multi-turn conversations, document Q&A, code generation, summarization. Same capabilities as ChatGPT but with the larger context window and more generous free tier.' },
            { name: 'Image analysis', desc: 'Upload photos, screenshots, diagrams, charts, or UI mockups. Ask questions, extract text, describe what is shown, compare multiple images. Works with JPG, PNG, GIF, WebP.' },
            { name: 'PDF and document analysis', desc: 'Send PDFs directly — no text extraction needed. Ask questions about any section, request summaries, extract structured data, compare multiple documents simultaneously.' },
            { name: 'Audio transcription and analysis', desc: 'Transcribe audio files, summarize spoken content, extract key points from meetings or lectures. Supports MP3, WAV, AAC, FLAC, and more. Up to 9.5 hours of audio.' },
            { name: 'Video understanding', desc: 'Upload video files or YouTube links. Gemini watches the video and answers questions, creates summaries, identifies segments, and describes what happens. Up to 1 hour of video.' },
            { name: 'Code execution (Code Interpreter)', desc: 'Gemini can execute Python code and return results — similar to ChatGPT\'s Code Interpreter. Analyze data, generate charts, solve computational problems in the same API call.' },
          ]} />
        </Block>

        {/* Gemini vs OpenAI */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Gemini API vs OpenAI API" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Free tier', badge: 'Gemini wins clearly', body: 'Gemini: ongoing free tier, no credit card, generous daily limits. OpenAI: $5 starter credits with 3-month expiry, then pay-per-token. For students building projects over months, Gemini\'s free tier is dramatically more practical.' },
            { label: 'Context window', badge: 'Gemini wins (15x larger)', body: 'Gemini 2.0+: 2M tokens. GPT-4o: 128K tokens. For applications that need to process large documents, entire codebases, or long conversations — Gemini\'s advantage is decisive.' },
            { label: 'Cost at paid tiers', badge: 'Gemini 40-50% cheaper', body: 'Gemini 2.5 Pro: $1.25/M input. GPT-4o: $2.50/M input. Gemini 2.0 Flash: ~$0.10/M input. GPT-4o mini: $0.15/M. For equivalent model tiers, Gemini is consistently less expensive.' },
            { label: 'Ecosystem and reliability', badge: 'OpenAI ahead', body: 'OpenAI has a larger developer ecosystem, more third-party library support (LangChain integrations, tooling), and a more stable free tier history. Google cut free-tier limits without notice in Dec 2025 causing 429 errors. For production, OpenAI\'s reliability has been better.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Make your first AI API call in 5 lines of Python using the free Gemini API — no credit card needed',
            'Build multimodal applications that process text, images, PDFs, audio, and video in the same API call',
            'Send entire documents or codebases to Gemini in one call thanks to the 2M token context window',
            'Build production-quality AI features at 40-50% lower cost than equivalent OpenAI API tiers',
            'Prototype unlimited applications during learning — the free tier covers all development and experimentation',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Multimodal Document Analyzer</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Use the Gemini API to build a Python script that accepts any PDF or image file and answers questions about it. Input: file path + question. Output: Gemini's answer based on the file content. Test with: (1) a research paper PDF → ask for a 3-point summary, (2) a screenshot of a chart → ask what trend it shows, (3) your own lecture notes → ask 5 practice questions based on them. This demonstrates multimodal API usage in a real tool.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Get API key and install SDK', body: 'ai.google.dev → Get API key. pip install google-generativeai python-dotenv. Create .env with GEMINI_API_KEY=your_key. This takes 3 minutes total.' },
            { n: '2', title: 'Upload and analyze a PDF', body: "from pathlib import Path\nimport google.generativeai as genai\n\ngenai.configure(api_key=os.getenv('GEMINI_API_KEY'))\nmodel = genai.GenerativeModel('gemini-2.0-flash')\n\npdf_data = Path('document.pdf').read_bytes()\nresponse = model.generate_content([\n    {'mime_type': 'application/pdf', 'data': pdf_data},\n    'Summarize the 3 most important points in this document'\n])\nprint(response.text)" },
            { n: '3', title: 'Add image analysis', body: "from PIL import Image\nimage = Image.open('screenshot.png')\nresponse = model.generate_content(['What data does this chart show? What is the main trend?', image])\nGemini reads the image as visual input — no OCR or preprocessing needed." },
            { n: '4', title: 'Build the interactive version', body: 'Add a simple input loop: ask the user for a file path and a question. Load the file. Send to Gemini with the question. Print the answer. This is a working multimodal Q&A tool in ~30 lines of code.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Gemini free tier, no credit card required</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Use <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.8rem', color: color }}>gemini-2.0-flash</code> as your default model for almost everything during development. Switch to <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.8rem', color: color }}>gemini-2.5-pro</code> only for specific prompts where 2.0 Flash gives insufficient quality. The cost difference between Flash and Pro is 10-15x — running your entire development cycle on Flash and only using Pro for final output review will keep your costs near zero while still benefiting from the best model where it matters.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/apis/huggingface')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Hugging Face
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/apis/groq')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Groq <ChevronRight size={14} />
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
