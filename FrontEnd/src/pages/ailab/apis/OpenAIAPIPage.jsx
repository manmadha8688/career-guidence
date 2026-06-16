import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#3B82F6'

export default function OpenAIAPIPage() {
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🔑</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>OpenAI API — Build AI Features Into Your Applications</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>The API powering thousands of AI products worldwide</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['$5 Free Credit', '#4ADE80'], ['Pay as you go after', color], ['GPT-4o access', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>The OpenAI API is how developers add GPT-4o, DALL-E, Whisper, and embeddings to their own applications. When you use a product that says "powered by AI" — a writing tool, a customer support bot, a code review tool, a resume analyzer — there is often an OpenAI API call happening in the background. Learning to use the API directly (not through ChatGPT's interface) is the skill that separates people who use AI tools from people who build AI tools. The API is straightforward: send a POST request with your messages and model choice, get a response. New accounts receive $5 in free credits to start. After that, pricing is per-token — a typical conversation costs less than a fraction of a rupee.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'OpenAI API Tutorial for Beginners — Python', url: 'https://www.youtube.com/watch?v=OB99E7Y1cMA', dur: '20 min', note: 'Complete beginner guide with Python' },
            { label: 'OpenAI API Crash Course — All Features Explained', url: 'https://www.youtube.com/watch?v=UyJCGXcNqEs', dur: '25 min', note: 'Full API coverage including function calling' },
            { label: 'OpenAI Function Calling Tutorial — Build Structured AI', url: 'https://www.youtube.com/watch?v=aqdWSYWC_LI', dur: '14 min', note: 'Function calling deep dive' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What the API gives you that ChatGPT doesn't */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What the API gives you that ChatGPT doesn't" color={color} />
          <InfoBox color={color} dark={dark}>The API removes the interface layer and gives you direct access to the model. No chat history limits, no web UI, no content policy UI — just a model that responds to what you send. You control the system prompt (the persona and instructions), the conversation history, the temperature (creativity), the max tokens, and which model to use. These controls let you build products, not just use a product.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The most important control is the system prompt. In ChatGPT, you cannot change the fundamental persona and instructions the model operates under. Via the API, you can set a system message that completely defines the model's behavior: "You are a strict code reviewer. Only respond with specific code issues and improvements. Never praise code. Never explain what the code does correctly." Every application built on the API starts with a system prompt that shapes the model for that specific use case.</p>
        </Block>

        {/* Core API capabilities */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Core API capabilities" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Chat Completions', desc: 'The main API. Send a list of messages (system + user + assistant), receive a response. Powers every chatbot, assistant, and Q&A feature built on OpenAI. 90% of API use cases use this endpoint.' },
            { name: 'Function Calling', desc: 'Tell the model about functions it can call. It returns structured JSON specifying which function to call with which arguments. Use to connect the model to real code: search a database, call an API, look up a price.' },
            { name: 'Embeddings', desc: 'Convert text to vectors. text-embedding-3-small is fast and cheap ($0.02/1M tokens). Use for semantic search, RAG systems, similarity matching, recommendation systems.' },
            { name: 'DALL-E Image Generation', desc: 'Generate images from text prompts programmatically. dall-e-3 produces high-quality 1024x1024 images. Integrate into apps that need custom image generation without a third-party service.' },
            { name: 'Whisper Transcription', desc: 'Convert audio files to text. Supports 50+ languages. $0.006/minute — transcribing an hour of audio costs ₹3. Use for meeting notes, lecture transcription, voice input.' },
            { name: 'Structured Outputs', desc: 'Force the model to return JSON matching a schema you define. Eliminates the need to parse free-text responses. Reliable for any use case that needs structured data extraction.' },
          ]} />
        </Block>

        {/* Making your first API call */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Making your first API call" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Get your API key', body: 'platform.openai.com → Sign up → API keys → Create new secret key. New accounts get $5 free credit. Save the key immediately — it is only shown once.' },
            { n: '2', title: 'Install the SDK', body: 'pip install openai (Python) or npm install openai (Node.js). Set your key: export OPENAI_API_KEY=sk-... (or use .env + python-dotenv).' },
            { n: '3', title: 'Write a chat completion', body: "from openai import OpenAI\nclient = OpenAI()\nresponse = client.chat.completions.create(\n  model='gpt-4o-mini',\n  messages=[\n    {'role': 'system', 'content': 'You are a helpful assistant.'},\n    {'role': 'user', 'content': 'Explain recursion briefly.'}\n  ]\n)\nprint(response.choices[0].message.content)" },
            { n: '4', title: 'Monitor your usage', body: 'platform.openai.com/usage shows token counts and cost per day. Set a monthly spending limit in Settings → Billing → Usage limits to avoid surprise bills during development.' },
            { n: '5', title: 'Use gpt-4o-mini for development', body: 'gpt-4o-mini costs ~20x less than gpt-4o and is excellent for most tasks. Develop and test with mini, switch to gpt-4o only for the specific prompts that need better quality.' },
          ]} />
        </Block>

        {/* Model selection and pricing */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Model selection and pricing" color={color} />
          <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr>
                  {['Model', 'Context', 'Cost (input)', 'Cost (output)', 'Best for'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.6rem 0.875rem', borderBottom: `1px solid ${color}30`, color, fontSize: '0.65rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['gpt-4o-mini', '128K', '$0.15/1M', '$0.60/1M', 'Development, most production tasks, cost-sensitive apps'],
                  ['gpt-4o', '128K', '$2.50/1M', '$10.00/1M', 'Complex reasoning, difficult code, nuanced tasks'],
                  ['gpt-4o (with vision)', '128K', '$2.50/1M', '$10.00/1M', 'Image analysis, screenshot understanding, visual tasks'],
                  ['text-embedding-3-small', '8K', '$0.02/1M', 'N/A', 'Embeddings for RAG, semantic search'],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? (dark ? 'rgba(59,130,246,0.04)' : 'rgba(59,130,246,0.03)') : 'transparent' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '0.6rem 0.875rem', color: j === 0 ? txt : sub, borderBottom: `1px solid ${border}`, whiteSpace: j < 4 ? 'nowrap' : 'normal', fontFamily: j === 0 ? "'Share Tech Mono', monospace" : "'Rajdhani', sans-serif", fontSize: j === 0 ? '0.78rem' : '0.82rem' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'The mini vs full-size decision', badge: 'Use mini by default', body: "GPT-4o mini handles 80-90% of tasks nearly as well as GPT-4o at 1/20th the cost. Start with mini for everything. Only upgrade specific prompts to full GPT-4o when mini's quality is measurably insufficient for that task." },
            { label: 'Context window', badge: '128K for both', body: 'Both models support 128K token context windows. This is enough for about 100 pages of text. In practice, longer contexts cost more — always trim conversation history and only include context that is actually needed.' },
            { label: 'Temperature control', badge: 'Use 0 for determinism', body: 'Temperature 0 = deterministic, consistent outputs (best for extraction, classification, coding). Temperature 0.7-1.0 = creative, varied outputs (best for writing, brainstorming). Default is 1.0 — explicitly set 0 for any task where consistency matters.' },
          ]} />
        </Block>

        {/* Function calling */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Function calling — the power feature" color={color} />
          <InfoBox color={color} dark={dark}>
            Function calling is the feature that makes AI genuinely useful in applications. Instead of getting a text response that says "I would search the database for X", the model returns structured JSON specifying which function to call and with what arguments. Your code calls the actual function with those arguments, and the real result goes back to the model. This is how AI connects to real data and real actions.
          </InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Define your function schema', body: 'Describe the function to the model: name, description, and parameter schema in JSON Schema format. The description tells the model when to call this function.' },
            { n: '2', title: 'Pass tools to the API', body: "Add a 'tools' parameter to your API call with your function definitions. The model decides whether to call a function or respond directly based on the user's message." },
            { n: '3', title: 'Handle the function call response', body: "Check if response.choices[0].finish_reason == 'tool_calls'. If so, parse response.choices[0].message.tool_calls[0] to get the function name and arguments." },
            { n: '4', title: 'Return the result', body: 'Call your actual function with the arguments. Add the result as a tool message. Send the full conversation back to the model. It generates a natural language response incorporating the real data.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Add AI-powered features to any web or mobile app using a simple HTTP POST request',
            'Build chatbots with custom system prompts that define precise behavior for your use case',
            'Connect AI to real data and actions using function calling — search databases, call APIs, trigger workflows',
            'Generate images, transcribe audio, and create embeddings all from the same unified API',
            'Control costs precisely by choosing the right model and setting spending limits',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build an AI Feature for a Real App</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Add an AI-powered feature to a project you already have (or build a small new one). Ideas: an AI that reviews code you paste in, an AI that summarizes articles by URL, an AI that answers questions about a small database, an AI writing assistant with a custom tone. Requirements: use the system prompt to define specific behavior, use gpt-4o-mini to keep costs low, handle errors gracefully, and never expose the API key in frontend code.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Choose a focused feature', body: "Not a full chatbot — a specific feature. 'Summarize this text in 3 bullet points' or 'Review this code for bugs' or 'Extract the key facts from this paragraph'. Narrow scope = better results." },
            { n: '2', title: 'Write a tight system prompt', body: "Define the model's role, output format, and constraints in the system message. Test it with 5-10 different inputs to verify it behaves consistently. The system prompt is your product's most important code." },
            { n: '3', title: 'Set temperature and max_tokens', body: 'For extraction/classification: temperature=0. For writing: temperature=0.7. Set max_tokens to limit response length and control cost. A summary should not be 1000 tokens.' },
            { n: '4', title: 'Add error handling', body: 'Wrap API calls in try/except. Handle rate limit errors (429), API unavailable errors (500), and insufficient credits. Log errors for debugging but show friendly messages to users.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>COST: ~$0.01–$0.05 during development — $5 free credit covers weeks of testing</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Your system prompt is the most valuable thing you will write when building on the OpenAI API. Spend more time on it than on the code. Test it adversarially — what happens when a user tries to make the model do something outside its defined role? Add explicit constraints: "Only answer questions about [topic]. If asked about anything else, politely decline." A well-written system prompt is the difference between a reliable product feature and an unpredictable demo.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/apis/groq')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Groq
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/apis/together-ai')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Together AI <ChevronRight size={14} />
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
