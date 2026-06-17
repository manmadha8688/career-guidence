import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#F59E0B'

export default function HuggingChatPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(245,158,11,0.09)' : 'rgba(245,158,11,0.11)'
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Chatbots</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🤗</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>HuggingChat — 115+ Free Open-Source AI Models in One Place</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>No account needed. No subscription. The open-source alternative to ChatGPT.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ 100% FREE', '#4ADE80'], ['huggingface.co/chat', color], ['Open Source', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>HuggingChat is Hugging Face's free chatbot interface — a single URL that gives you access to 115+ of the best open-source AI models with zero cost, zero account required, and all tools included. Where ChatGPT locks you into GPT-4o and Claude locks you into Anthropic's models, HuggingChat lets you run Meta's Llama 3.3 70B, Alibaba's Qwen3 235B, DeepSeek R1, Mistral, and dozens more — and switch between them instantly. Every tool is included free: web search, image generation via Flux.1, Python code execution, PDF document parsing, and live rendering. For students who want the power of modern AI without any subscription cost, HuggingChat is the most complete free option available.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'HuggingChat Tutorial', url: 'https://www.youtube.com/watch?v=SewskTr0o8o', dur: 'Jan 2025', note: 'Best recent walkthrough' },
            { label: 'A Guide to HuggingChat: Your Free Alternative to ChatGPT', url: 'https://www.youtube.com/watch?v=AcZht4ZUEnU', dur: 'Apr 2024', note: 'Step-by-step beginner guide' },
            { label: 'Hugging Chat Assistant | Build Your OWN Personal Assistant With Open Source Models', url: 'https://www.youtube.com/watch?v=c90Ufatajh0', dur: '', note: 'Assistants feature deep dive' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Why open-source models matter */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why open-source models matter" color={color} />
          <InfoBox color={color} dark={dark}>Open-source means the actual model weights are publicly released — anyone can download, inspect, run, or fine-tune them. HuggingChat hosts these models on Hugging Face's servers so you can use them via browser without downloading anything. The transparency is the key difference: you can inspect what model you are actually using, run it locally if you need privacy, and the community can audit the models for bias or safety issues.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The practical benefit for students is cost and variety. Instead of paying $20/month for ChatGPT Plus to access GPT-4o, HuggingChat gives you Llama 3.3 70B (which rivals GPT-4 on most tasks), Qwen3 235B (which rivals GPT-4o on reasoning), and DeepSeek R1 (which rivals OpenAI's o1 on math and coding) — all free. If one model gives a poor answer on a topic, you can switch to another instantly without paying separately for each.</p>
        </Block>

        {/* Available models */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Available models — which to use for what" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Llama 3.3 70B Instruct', desc: "Meta's flagship open-source model. Fast, highly capable, rivals GPT-3.5 Turbo on most everyday tasks. Best default choice for general questions, writing, and explanations. 128K context window." },
            { name: 'Qwen3 235B (Alibaba)', desc: "Alibaba's reasoning model — rivals DeepSeek R1 and OpenAI o1. Best for: complex reasoning, math, coding. Very large model so slower, but produces the highest quality answers for hard problems." },
            { name: 'DeepSeek R1 Distill Qwen 32B', desc: "DeepSeek's reasoning model, shows its thinking step by step. Beats o1-mini on several benchmarks. Best for: math problems, logical reasoning, and tasks where seeing the reasoning process helps." },
            { name: 'Mistral / Mixtral', desc: "French AI lab's model — fast, efficient, great for coding and multilingual tasks. Mixtral 8x7B uses mixture-of-experts for better quality at lower compute." },
            { name: 'Command R+ (Cohere)', desc: 'Optimized for tool use, web search, and conversational interaction. Strong at following complex multi-step instructions.' },
            { name: 'Omni Router', desc: "HuggingChat's auto-selector. Picks the best model for each prompt automatically. Use this when you don't know which model fits your task." },
          ]} />
        </Block>

        {/* All tools included */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="All tools included — for free" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Web search (live browsing)', body: "Toggle on the 'Web Search' tool before asking your question. The AI browses the live internet and cites sources. Works like Perplexity — answers current questions, news, and recent documentation. No plugin, no extra setup." },
            { n: '2', title: 'Image generation (Flux.1)', body: "Ask for an image directly in chat: 'Generate a diagram showing how a REST API works' or 'Create a logo concept for a study app'. HuggingChat uses Flux.1 — currently the best open-source image model. Completely free." },
            { n: '3', title: 'Python code execution', body: 'Ask the AI to solve a computational problem and it writes and runs Python in-chat, returning the actual output. Like ChatGPT\'s Code Interpreter — but free. Great for: math calculations, data analysis, verifying algorithm correctness.' },
            { n: '4', title: 'Document parsing (PDF/CSV upload)', body: "Upload any PDF or CSV and ask questions about it. 'Summarize the key findings in this paper', 'What does this spreadsheet say about Q3 sales?' — the model reads the file and answers from its content." },
            { n: '5', title: 'Live render panel', body: 'Ask for HTML, a chart, or a structured document and it renders live in a side panel with version history. Useful for prototyping UI layouts, seeing diagram outputs, or previewing formatted content.' },
          ]} />
        </Block>

        {/* Assistants */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Assistants — build your own custom chatbot" color={color} />
          <p style={{ ...P(sub), marginBottom: '1rem' }}>HuggingChat Assistants is the open-source equivalent of OpenAI's Custom GPTs. You create a chatbot with a custom name, system prompt, chosen model, and optional knowledge base — then share it with a link. Thousands of community-built assistants are already in the directory at huggingface.co/chat/assistants.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Go to Assistants in the sidebar', body: "Log in with your free Hugging Face account (takes 30 seconds). Click 'Assistants' in the bottom-left sidebar → 'Create new assistant'." },
            { n: '2', title: 'Define name, model, and system prompt', body: "Give it a name (e.g., 'Python Tutor'), choose a base model (Llama 3.3 70B works for most), and write a system prompt: 'You are a Python tutor for beginners. Explain every concept simply. Always include a short code example. Never give full solutions without explanation.'" },
            { n: '3', title: 'Add knowledge base (optional)', body: 'Upload PDFs or documents that the assistant will use to answer questions. Turn your lecture notes into a study bot — upload the PDF and the assistant answers questions from your actual material.' },
            { n: '4', title: 'Share the link', body: 'Click Create. You get a public link immediately. Share with classmates. Build a study group bot, a project FAQ bot, or a coding helper for your team — all free, no backend needed.' },
          ]} />
        </Block>

        {/* HuggingChat vs ChatGPT vs Claude */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="HuggingChat vs ChatGPT vs Claude" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'HuggingChat', badge: 'Best: free + open-source + variety', body: '115+ models, all tools free, no account needed, full open-source transparency. If you hit rate limits on one model, switch to another. Best for: students who want full power at zero cost, developers who want to compare open-source models, anyone who values transparency and privacy.' },
            { label: 'ChatGPT', badge: 'Best: conversation depth + DALL-E + Code Interp', body: 'Deeper, more consistent conversational quality on complex creative tasks. Better custom GPT ecosystem. Code Interpreter for data analysis is more polished. Free tier is GPT-4o mini which is weaker than HuggingChat\'s Llama 3.3 70B. $20/month for Plus.' },
            { label: 'Claude', badge: 'Best: long documents + reasoning + safe outputs', body: '200K token context (vs HuggingChat\'s 128K max). Superior at long-document analysis, nuanced reasoning, and safe/careful outputs. No native image gen. Free tier has daily limits. $20/month for Pro.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Access 115+ of the world\'s best open-source models — Llama, Qwen, DeepSeek, Mistral — completely free',
            'Use web search, image generation, Python execution, and document parsing without any subscription',
            'Build a custom study assistant with your own system prompt and knowledge base in under 5 minutes',
            'Compare how different models answer the same question to understand model strengths',
            'Run smaller models entirely in-browser (WebLLM) with no data sent to any server',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Study Assistant</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Create a HuggingChat Assistant for a subject you are currently studying. Write a system prompt that makes it a tutor for that subject: what it knows, how it explains, what style to use. Upload your lecture notes or a PDF as the knowledge base. Share the link with one classmate. Ask it 10 questions from your syllabus. How accurate is it? Where does it fail? What would you add to the system prompt to improve it? This is practical AI product building — free, in 20 minutes.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Create a free Hugging Face account', body: 'huggingface.co → Sign Up. Takes 30 seconds. Email only, no credit card. This unlocks Assistants creation and conversation history.' },
            { n: '2', title: 'Write your system prompt carefully', body: 'Think about what the perfect tutor for your subject would know and how they would teach. Include: subject area, level (beginner/intermediate), preferred explanation style, any restrictions (always cite sources, never give direct homework answers, always check understanding). 3-5 sentences is enough.' },
            { n: '3', title: 'Upload your study material', body: 'Find a PDF of your lecture notes, textbook chapter, or course material. Upload it as the knowledge base. The assistant will answer from your actual content — not generic internet knowledge.' },
            { n: '4', title: 'Test with real exam-style questions', body: 'Ask 10 questions you might see on an exam. Note: which did it answer correctly? Which did it miss? Where did it contradict your notes? Each failure is a chance to improve the system prompt or the knowledge base.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — HuggingChat is 100% free, no credit card, no subscription</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Use HuggingChat's model switching strategically. Start a conversation with Llama 3.3 70B (fast, reliable). If you get an unsatisfying answer on a hard reasoning problem, switch to Qwen3 235B or DeepSeek R1 for the same question without starting a new conversation. Different models have different strengths — the ability to switch is HuggingChat's biggest advantage over single-model platforms.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/chatbots/youcom')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> You.com
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/builders/bolt-new')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Bolt.new <ChevronRight size={14} />
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
