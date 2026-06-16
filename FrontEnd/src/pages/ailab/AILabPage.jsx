import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { Sun, Moon, ArrowLeft, Search, ChevronRight, X, BookOpen } from 'lucide-react'
import ScrollToTop from '../../components/ScrollToTop'
import { CATEGORIES, TOOLS } from './aiLabData'

const CYAN = '#00D9FF'

const PRIMER_SECTIONS = [
  {
    icon: '🧠',
    title: 'What is AI, actually?',
    color: '#00D9FF',
    body: `AI stands for Artificial Intelligence — software that can perform tasks that normally require human thinking: understanding language, recognizing images, writing code, making decisions. Modern AI doesn't follow explicit rules. It learns patterns from massive amounts of data and uses those patterns to generate responses.

The AI tools in this lab are mostly powered by Large Language Models (LLMs) — neural networks trained on billions of pages of text. They learned language, reasoning, and knowledge by predicting what word comes next, billions of times. The result is a system that can answer questions, write code, explain concepts, and hold conversations.`,
  },
  {
    icon: '🔑',
    title: 'Three concepts you must understand first',
    color: '#7C3AED',
    body: `Before using any AI tool effectively, understand these three ideas:

1. Context is everything. AI models have no memory between sessions. Every conversation starts fresh. The quality of your output depends almost entirely on the quality of your input — what you tell the model, how much context you give, how specific you are. "Fix my code" produces worse results than "Fix this Python function that should return the top 3 items by price but currently returns all items unsorted."

2. AI generates, it does not recall. The model is not searching a database for the correct answer. It is generating the most probable next token based on patterns learned during training. This means it can be confidently wrong. Always verify factual claims, especially for specific numbers, names, and dates.

3. Models have a training cutoff. Everything an AI knows comes from data collected before a certain date — typically 6-18 months before you're using it. For current news, live prices, or recently released software versions, use tools with web access (Perplexity, Gemini) or verify independently.`,
  },
  {
    icon: '⚡',
    title: 'How to actually learn AI tools',
    color: '#10B981',
    body: `The wrong approach: watch a 45-minute tutorial, feel like you understand, never open the tool.

The right approach:
• Open the tool while watching or reading — do it in parallel, not after.
• Build something small immediately. A chatbot, a script, a data analysis. Real use reveals real understanding.
• Learn the concept first, then the tool. Knowing what a vector database is makes ChromaDB make sense. Knowing what an LLM is makes every chatbot tool make sense.
• Use free tiers to experiment. Almost every tool here has a free tier. You do not need to spend money to build real projects.

Start with the AI Foundations section — GenAI, Prompt Engineering, and RAG. These three concepts underpin everything else in this lab. Ten minutes on each before diving into tools will make everything click faster.`,
  },
  {
    icon: '🗺️',
    title: 'Suggested learning order',
    color: '#F59E0B',
    body: `Week 1 — Foundations: Start with Generative AI, then Prompt Engineering, then RAG. These are not optional prerequisites — they are the mental models that make every other tool in this lab understandable.

Week 2 — Chatbots + Coding: Use ChatGPT, Claude, or Gemini daily for your actual work. Add Copilot or Codeium to your IDE. Get comfortable with AI in your existing workflow before learning new ones.

Week 3 — APIs: Try Groq's free API. Make your first API call. Understand that the AI you've been chatting with is also a function you can call from code. This unlocks everything else.

Week 4+ — Build: Pick one tool from Agents, Automation, or Local AI that solves a real problem you have. Build something with it. The project task in every tool page is designed for exactly this.

There is no shortcut. The people who learn AI tools fastest are the ones who build with them immediately — not the ones who watch the most tutorials.`,
  },
  {
    icon: '⚠️',
    title: 'What AI cannot do (that people assume it can)',
    color: '#EF4444',
    body: `Know these limitations before you are surprised by them:

• It cannot access the internet by default. Unless the tool explicitly has web browsing (Perplexity, Gemini, ChatGPT Plus browsing), its knowledge is frozen at its training cutoff.

• It cannot run your code automatically. When ChatGPT gives you Python, it is not executing it — you are. Code Interpreter and Julius are exceptions.

• It does not know your context unless you tell it. It does not know your project, your constraints, your codebase, or your audience unless you include that information in your message.

• It can sound confident while being wrong. This is the most dangerous property. For any claim that matters — a statistic, a medical fact, a legal requirement, a specific API behavior — verify with a primary source.

• It cannot replace deep understanding. AI can write a sorting algorithm for you. But if you do not understand sorting, you cannot evaluate whether the output is correct, debug it when it fails, or adapt it to your actual requirements.`,
  },
]

export default function AILabPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [primerOpen, setPrimerOpen] = useState(false)

  const bg     = dark ? '#020817' : '#F0F4FF'
  const border = dark ? 'rgba(0,217,255,0.09)' : 'rgba(79,70,229,0.11)'
  const txt    = dark ? '#E2E8F0' : '#0F172A'
  const sub    = dark ? '#94A3B8' : '#475569'

  const filtered = TOOLS.filter(t => {
    const matchCat = activeCategory === 'all' || t.category === activeCategory
    const q = search.toLowerCase()
    return matchCat && (!q || t.name.toLowerCase().includes(q) || t.tagline.toLowerCase().includes(q))
  })

  const grouped = CATEGORIES.filter(c => c.id !== 'all').map(cat => ({
    ...cat,
    tools: filtered.filter(t => t.category === cat.id),
  })).filter(g => g.tools.length > 0)

  const goToTool = tool => navigate(`/ai-lab/${tool.category}/${tool.id}`)

  return (
    <div style={{ minHeight: '100vh', background: bg, color: txt, fontFamily: "'Rajdhani', sans-serif", overflowX: 'hidden' }}>

      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 600, borderRadius: '50%', background: `radial-gradient(ellipse, ${dark ? 'rgba(0,217,255,0.04)' : 'rgba(79,70,229,0.05)'} 0%, transparent 70%)`, filter: 'blur(60px)' }} />
      </div>

      {/* Primer Modal */}
      {primerOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '1.5rem 1rem', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', overflowY: 'auto' }}
          onClick={e => { if (e.target === e.currentTarget) setPrimerOpen(false) }}>
          <div style={{ width: '100%', maxWidth: 700, background: dark ? '#060E24' : '#FFFFFF', border: `1px solid ${border}`, borderTop: `3px solid ${CYAN}`, borderRadius: 18, overflow: 'hidden', position: 'relative', marginBottom: '1.5rem' }}>

            {/* Modal header */}
            <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.14em', color: CYAN, marginBottom: '0.3rem' }}>BEFORE YOU START</div>
                <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1rem,3vw,1.3rem)', color: txt, margin: 0 }}>What to Know Before Learning AI Tools</h2>
              </div>
              <button onClick={() => setPrimerOpen(false)} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 8, width: 34, height: 34, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: sub, flexShrink: 0, marginLeft: '1rem' }}>
                <X size={15} />
              </button>
            </div>

            {/* Intro strip */}
            <div style={{ padding: '1rem 1.5rem', background: dark ? 'rgba(0,217,255,0.05)' : 'rgba(0,217,255,0.04)', borderBottom: `1px solid ${border}` }}>
              <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>
                This page lists AI tools — but using a tool without understanding the underlying concepts leads to frustration. Read this primer first. It takes 5 minutes and will make every tool in this lab make more sense.
              </p>
            </div>

            {/* Sections */}
            <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {PRIMER_SECTIONS.map((s, i) => (
                <div key={i} style={{ borderRadius: 12, border: `1px solid ${border}`, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem', background: dark ? `${s.color}09` : `${s.color}07`, borderBottom: `1px solid ${s.color}20` }}>
                    <span style={{ fontSize: '1.1rem', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${s.color}18`, borderRadius: 8, border: `1px solid ${s.color}28`, flexShrink: 0 }}>{s.icon}</span>
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 800, fontSize: '0.95rem', color: s.color }}>{s.title}</span>
                  </div>
                  <div style={{ padding: '1rem', background: dark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.015)' }}>
                    {s.body.split('\n\n').map((para, j) => (
                      <p key={j} style={{ fontSize: '0.85rem', color: sub, lineHeight: 1.8, margin: j < s.body.split('\n\n').length - 1 ? '0 0 0.75rem' : 0, whiteSpace: 'pre-line' }}>{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div style={{ padding: '1rem 1.5rem 1.5rem', borderTop: `1px solid ${border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', color: sub }}>Start with <strong style={{ color: CYAN }}>AI Foundations</strong> — the first category below.</span>
              <button onClick={() => { setPrimerOpen(false); setActiveCategory('foundations') }}
                style={{ padding: '0.6rem 1.25rem', borderRadius: 10, border: 'none', cursor: 'pointer', background: `linear-gradient(135deg, ${CYAN}, #7C3AED)`, color: '#fff', fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.08em' }}>
                Go to Foundations →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', background: dark ? 'rgba(2,8,23,0.93)' : 'rgba(240,244,255,0.95)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${border}` }}>
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.72rem', letterSpacing: '0.1em', color: CYAN, padding: 0 }}>
          <ArrowLeft size={14} /> LearnToEarn
        </button>
        <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.8rem', letterSpacing: '0.2em', color: CYAN }}>⚡ AI LAB</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: sub }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', padding: 'clamp(3rem,7vw,5rem) 1.5rem 2.5rem', maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1rem', borderRadius: 999, marginBottom: '1.5rem', background: dark ? 'rgba(0,217,255,0.07)' : 'rgba(79,70,229,0.07)', border: `1px solid ${dark ? 'rgba(0,217,255,0.2)' : 'rgba(79,70,229,0.18)'}`, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.12em', color: CYAN }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: CYAN, display: 'inline-block', boxShadow: `0 0 8px ${CYAN}` }} />
            EXPLORE · LEARN · BUILD WITH AI
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,6vw,3.5rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 1.25rem', fontFamily: "'Orbitron', sans-serif" }}>
            <span style={{ color: txt }}>The </span>
            <span style={{ background: `linear-gradient(135deg, ${CYAN}, #7C3AED)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>AI Tools</span>
            <span style={{ color: txt }}> Lab</span>
          </h1>
          <p style={{ fontSize: 'clamp(0.9rem,2vw,1.05rem)', color: sub, lineHeight: 1.8, maxWidth: 540, margin: '0 auto 2rem' }}>
            Every AI tool a developer and student needs — what it is, how it works, what you can build with it, and free tutorials to go deeper.
          </p>

          {/* CTA Button */}
          <button onClick={() => setPrimerOpen(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: 12, cursor: 'pointer', border: `1.5px solid ${CYAN}40`, background: dark ? 'rgba(0,217,255,0.07)' : 'rgba(0,217,255,0.06)', color: CYAN, fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.08em', transition: 'all 0.18s' }}
            onMouseEnter={e => { e.currentTarget.style.background = dark ? 'rgba(0,217,255,0.13)' : 'rgba(0,217,255,0.1)'; e.currentTarget.style.borderColor = CYAN }}
            onMouseLeave={e => { e.currentTarget.style.background = dark ? 'rgba(0,217,255,0.07)' : 'rgba(0,217,255,0.06)'; e.currentTarget.style.borderColor = `${CYAN}40` }}>
            <BookOpen size={15} />
            New to AI? Read this first
          </button>
        </div>

        {/* Search + Filter */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.25rem 2.5rem' }}>
          <div style={{ position: 'relative', maxWidth: 420, margin: '0 auto 1.5rem' }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: sub }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tools..."
              style={{ width: '100%', boxSizing: 'border-box', paddingLeft: 36, paddingRight: 12, height: 42, borderRadius: 10, border: `1px solid ${border}`, background: dark ? 'rgba(6,14,36,0.7)' : 'rgba(255,255,255,0.9)', color: txt, fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none' }} />
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
                padding: '0.35rem 0.875rem', borderRadius: 999, cursor: 'pointer',
                fontFamily: "'Share Tech Mono', monospace", fontSize: '0.63rem', letterSpacing: '0.05em', transition: 'all 0.15s',
                border: activeCategory === cat.id ? `1px solid ${CYAN}` : `1px solid ${border}`,
                background: activeCategory === cat.id ? (dark ? 'rgba(0,217,255,0.1)' : 'rgba(79,70,229,0.08)') : 'transparent',
                color: activeCategory === cat.id ? CYAN : sub,
              }}>{cat.label}</button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.25rem 6rem' }}>
          {search || activeCategory !== 'all' ? (
            <>
              <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: sub, marginBottom: '1.25rem', letterSpacing: '0.06em' }}>{filtered.length} tool{filtered.length !== 1 ? 's' : ''}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px,100%),1fr))', gap: '1rem' }}>
                {filtered.map(tool => <ToolCard key={tool.id} tool={tool} onClick={() => goToTool(tool)} dark={dark} border={border} txt={txt} sub={sub} />)}
              </div>
              {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '4rem', color: sub }}>No tools found for "{search}"</div>}
            </>
          ) : (
            grouped.map(group => (
              <div key={group.id} style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: `1px solid ${border}` }}>
                  <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', color: CYAN, margin: 0 }}>{group.label}</h2>
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: sub }}>{group.tools.length}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(270px,100%),1fr))', gap: '0.875rem' }}>
                  {group.tools.map(tool => <ToolCard key={tool.id} tool={tool} onClick={() => goToTool(tool)} dark={dark} border={border} txt={txt} sub={sub} />)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ScrollToTop />
    </div>
  )
}

function ToolCard({ tool, onClick, dark, border, txt, sub }) {
  return (
    <div onClick={onClick} style={{ background: dark ? 'rgba(6,14,36,0.75)' : 'rgba(255,255,255,0.92)', border: `1px solid ${border}`, borderLeft: `3px solid ${tool.color}`, borderRadius: 13, padding: '1.125rem', cursor: 'pointer', transition: 'transform 0.17s, box-shadow 0.17s' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${tool.color}1a` }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <span style={{ fontSize: '1.3rem', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${tool.color}15`, borderRadius: 8, border: `1px solid ${tool.color}22`, flexShrink: 0 }}>{tool.icon}</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: txt }}>{tool.name}</div>
            <div style={{ fontSize: '0.68rem', color: sub, lineHeight: 1.4 }}>{tool.tagline}</div>
          </div>
        </div>
        <span style={{ fontSize: '0.55rem', fontFamily: "'Share Tech Mono', monospace", padding: '0.12rem 0.4rem', borderRadius: 4, flexShrink: 0, background: tool.free ? 'rgba(74,222,128,0.1)' : 'rgba(251,146,60,0.1)', color: tool.free ? '#4ADE80' : '#FB923C', border: `1px solid ${tool.free ? 'rgba(74,222,128,0.2)' : 'rgba(251,146,60,0.2)'}` }}>
          {tool.free ? 'FREE' : 'PAID'}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
        <span style={{ fontSize: '0.62rem', color: sub, fontFamily: "'Share Tech Mono', monospace" }}>{tool.freeTier}</span>
        <span style={{ fontSize: '0.65rem', color: tool.color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>Learn <ChevronRight size={11} /></span>
      </div>
    </div>
  )
}
