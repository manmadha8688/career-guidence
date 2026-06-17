import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { Sun, Moon, ArrowLeft, Search, ChevronRight, Lock } from 'lucide-react'
import ScrollToTop from '../../components/ScrollToTop'
import { CATEGORIES, TOOLS } from './aiLabData'

const CYAN = '#00D9FF'

const TAG_META = {
  'trending':    { label: '🔥 Trending',    bg: 'rgba(249,115,22,0.13)',  color: '#F97316' },
  'popular':     { label: '⭐ Popular',      bg: 'rgba(245,158,11,0.13)', color: '#F59E0B' },
  'must-know':   { label: '✓ Must Know',    bg: 'rgba(16,185,129,0.13)', color: '#10B981' },
  'enterprise':  { label: '🏢 Enterprise',  bg: 'rgba(59,130,246,0.13)', color: '#3B82F6' },
  'open-source': { label: '⚡ Open Source', bg: 'rgba(139,92,246,0.13)', color: '#8B5CF6' },
  'new':         { label: '✦ New',          bg: 'rgba(6,182,212,0.13)',  color: '#06B6D4' },
}

export default function AILabPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [primerOpen, setPrimerOpen] = useState(false)

  const bg     = dark ? '#020817' : '#F0F4FF'
  const navBg  = dark ? 'rgba(2,8,23,0.93)' : 'rgba(240,244,255,0.95)'
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'
  const card   = dark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.97)'
  const txt    = dark ? '#E2E8F0' : '#0F172A'
  const sub    = dark ? '#94A3B8' : '#475569'
  const muted  = dark ? '#475569' : '#94A3B8'

  const filtered = TOOLS.filter(t => {
    const matchCat = activeCategory === 'all' || t.category === activeCategory
    const q = search.toLowerCase()
    return matchCat && (!q || t.name.toLowerCase().includes(q) || t.tagline.toLowerCase().includes(q) || t.tags?.some(g => g.includes(q)))
  })

  const grouped = CATEGORIES.filter(c => c.id !== 'all').map(cat => ({
    ...cat,
    tools: filtered.filter(t => t.category === cat.id),
  })).filter(g => g.tools.length > 0)

  const goToTool = tool => navigate(`/ai-lab/${tool.category}/${tool.id}`)
  const totalTools = TOOLS.length
  const freeTools  = TOOLS.filter(t => t.free).length
  const doneTools  = TOOLS.filter(t => t.hasPage).length

  return (
    <div style={{ minHeight: '100vh', background: bg, color: txt, fontFamily: "'Rajdhani', sans-serif", overflowX: 'hidden' }}>

      {/* Background glow */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: 900, height: 600, borderRadius: '50%', background: dark ? 'radial-gradient(ellipse, rgba(0,217,255,0.04) 0%, transparent 65%)' : 'radial-gradient(ellipse, rgba(79,70,229,0.05) 0%, transparent 65%)', filter: 'blur(60px)' }} />
      </div>

      {/* Primer Modal */}
      {primerOpen && (
        <div onClick={e => e.target === e.currentTarget && setPrimerOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '2rem 1rem', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', overflowY: 'auto' }}>
          <div style={{ width: '100%', maxWidth: 600, background: dark ? '#0B1120' : '#fff', border: `1px solid ${border}`, borderTop: `3px solid ${CYAN}`, borderRadius: 18, overflow: 'hidden', marginBottom: '2rem' }}>
            <div style={{ padding: '1.5rem', borderBottom: `1px solid ${border}` }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.14em', color: CYAN, marginBottom: '0.4rem' }}>BEFORE YOU START</div>
              <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.1rem', fontWeight: 900, color: txt, margin: 0 }}>What to Know Before Using AI Tools</h2>
            </div>
            {[
              { icon: '🧠', color: CYAN, title: 'AI generates, it does not recall', body: 'LLMs predict the next token — they can be confidently wrong. Always verify specific facts, numbers, and dates from a primary source.' },
              { icon: '📝', color: '#10B981', title: 'Context is everything', body: 'Every session starts fresh. The quality of your output depends almost entirely on the quality of your input. Specific prompts beat vague ones every time.' },
              { icon: '📅', color: '#F59E0B', title: 'Training cutoff matters', body: 'Every AI model has a knowledge cutoff. For current news, live prices, or recent releases — use tools with web access (Perplexity, Gemini) or verify independently.' },
              { icon: '🗺️', title: 'Suggested order', color: '#EC4899', body: 'Start with AI Foundations → Chatbots → Coding Assistants → APIs. Learn the concepts first, then the tools. Everything clicks faster with the right mental model.' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '1.125rem 1.5rem', borderBottom: `1px solid ${border}` }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: s.color, marginBottom: '0.3rem' }}>{s.title}</div>
                    <p style={{ fontSize: '0.83rem', color: sub, lineHeight: 1.7, margin: 0 }}>{s.body}</p>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.8rem', color: sub }}>Start with <strong style={{ color: CYAN }}>AI Foundations</strong> below.</span>
              <button onClick={() => { setPrimerOpen(false); setActiveCategory('foundations') }}
                style={{ padding: '0.55rem 1.125rem', borderRadius: 8, border: 'none', cursor: 'pointer', background: `linear-gradient(135deg, ${CYAN}, #7C3AED)`, color: '#fff', fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.07em' }}>
                Go to Foundations →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', background: navBg, backdropFilter: 'blur(16px)', borderBottom: `1px solid ${border}` }}>
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.72rem', letterSpacing: '0.1em', color: CYAN, padding: 0 }}>
          <ArrowLeft size={14} /> LearnToEarn
        </button>
        <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.8rem', letterSpacing: '0.2em', color: CYAN }}>⚡ AI LAB</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', padding: 'clamp(2.5rem,6vw,4.5rem) 1.5rem 2rem', maxWidth: 680, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0.875rem', borderRadius: 999, marginBottom: '1.25rem', background: dark ? 'rgba(0,217,255,0.07)' : 'rgba(79,70,229,0.07)', border: `1px solid ${dark ? 'rgba(0,217,255,0.2)' : 'rgba(79,70,229,0.18)'}`, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: CYAN }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: CYAN, display: 'inline-block', boxShadow: dark ? `0 0 8px ${CYAN}` : 'none' }} />
            EXPLORE · LEARN · BUILD WITH AI
          </div>
          <h1 style={{ fontSize: 'clamp(1.75rem,5vw,3rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 1rem', fontFamily: "'Orbitron', sans-serif" }}>
            <span style={{ color: txt }}>The </span>
            <span style={{ background: `linear-gradient(135deg, ${CYAN}, #7C3AED)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>AI Tools</span>
            <span style={{ color: txt }}> Lab</span>
          </h1>
          <p style={{ fontSize: 'clamp(0.875rem,2vw,1rem)', color: sub, lineHeight: 1.8, maxWidth: 500, margin: '0 auto 1.5rem' }}>
            Every AI tool a developer needs — what it is, how it works, free tutorials and a hands-on project for each.
          </p>

         

          {/* CTA */}
          <button onClick={() => setPrimerOpen(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.375rem', borderRadius: 10, cursor: 'pointer', border: `1.5px solid ${CYAN}35`, background: dark ? 'rgba(0,217,255,0.06)' : 'rgba(0,217,255,0.05)', color: CYAN, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.875rem', transition: 'all 0.18s' }}
            onMouseEnter={e => { e.currentTarget.style.background = dark ? 'rgba(0,217,255,0.12)' : 'rgba(0,217,255,0.09)'; e.currentTarget.style.borderColor = CYAN }}
            onMouseLeave={e => { e.currentTarget.style.background = dark ? 'rgba(0,217,255,0.06)' : 'rgba(0,217,255,0.05)'; e.currentTarget.style.borderColor = `${CYAN}35` }}>
            📖 New to AI? Read this first
          </button>
        </div>

        {/* Search + Filter */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.25rem 2.25rem' }}>
          <div style={{ position: 'relative', maxWidth: 420, margin: '0 auto 1.375rem' }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: muted }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tools, categories, tags..."
              style={{ width: '100%', boxSizing: 'border-box', paddingLeft: 34, paddingRight: 12, height: 40, borderRadius: 10, border: `1px solid ${border}`, background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.9)', color: txt, fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.15s' }}
              onFocus={e => e.target.style.borderColor = `${CYAN}50`}
              onBlur={e => e.target.style.borderColor = border}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
                padding: '0.3rem 0.75rem', borderRadius: 999, cursor: 'pointer', fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.6rem', letterSpacing: '0.04em', transition: 'all 0.15s',
                border: activeCategory === cat.id ? `1px solid ${CYAN}` : `1px solid ${border}`,
                background: activeCategory === cat.id ? (dark ? 'rgba(0,217,255,0.1)' : 'rgba(0,217,255,0.08)') : 'transparent',
                color: activeCategory === cat.id ? CYAN : sub,
              }}>{cat.label}</button>
            ))}
          </div>
        </div>


        {/* Grid */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.25rem 6rem' }}>
          {search || activeCategory !== 'all' ? (
            <>
              <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: muted, marginBottom: '1.25rem', letterSpacing: '0.05em' }}>{filtered.length} tool{filtered.length !== 1 ? 's' : ''}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px,100%),1fr))', gap: '0.875rem' }}>
                {filtered.map(tool => <ToolCard key={tool.id} tool={tool} onClick={() => goToTool(tool)} dark={dark} border={border} card={card} txt={txt} sub={sub} muted={muted} />)}
              </div>
              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: sub }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</div>
                  <p>No tools found for "{search}"</p>
                </div>
              )}
            </>
          ) : (
            grouped.map(group => (
              <div key={group.id} style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.125rem', paddingBottom: '0.75rem', borderBottom: `1px solid ${border}` }}>
                  <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.1em', color: CYAN, margin: 0 }}>{group.label}</h2>
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: muted, padding: '0.15rem 0.45rem', borderRadius: 4, background: dark ? 'rgba(0,217,255,0.07)' : 'rgba(0,217,255,0.05)', color: CYAN }}>{group.tools.length} tools</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(270px,100%),1fr))', gap: '0.75rem' }}>
                  {group.tools.map(tool => <ToolCard key={tool.id} tool={tool} onClick={() => goToTool(tool)} dark={dark} border={border} card={card} txt={txt} sub={sub} muted={muted} />)}
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

function ToolCard({ tool, onClick, dark, border, card, txt, sub, muted }) {
  const freeColor = '#4ADE80'
  const paidColor = '#FB923C'
  const soon = !tool.hasPage

  return (
    <div
      onClick={onClick}
      style={{
        background: card,
        border: `1px solid ${border}`,
        borderRadius: 14,
        padding: '1rem 1.125rem',
        cursor: 'pointer',
        transition: 'all 0.18s',
        position: 'relative',
        opacity: soon ? 0.72 : 1,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = soon ? border : `${tool.color}40`
        e.currentTarget.style.boxShadow = soon ? 'none' : `0 4px 24px ${tool.color}18`
        e.currentTarget.style.transform = soon ? 'none' : 'translateY(-2px)'
        e.currentTarget.style.opacity = '1'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = border
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.opacity = soon ? '0.72' : '1'
      }}
    >
      {/* Coming soon badge */}
      {soon && (
        <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.55rem', fontFamily: "'Share Tech Mono', monospace", color: muted, background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', padding: '0.15rem 0.45rem', borderRadius: 4 }}>
          <Lock size={9} /> Soon
        </div>
      )}

      {/* Header row: icon + name + free/paid */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.625rem' }}>
        {/* Icon */}
        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${tool.color}15`, border: `1px solid ${tool.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
          {tool.icon}
        </div>
        {/* Name + tagline */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: '0.9rem', color: txt, lineHeight: 1.2, marginBottom: '0.2rem', paddingRight: soon ? '2.5rem' : 0 }}>{tool.name}</div>
          <div style={{ fontSize: '0.72rem', color: sub, lineHeight: 1.45 }}>{tool.tagline}</div>
        </div>
      </div>

      {/* Free tier */}
      <div style={{ fontSize: '0.65rem', color: muted, fontFamily: "'Share Tech Mono', monospace", marginBottom: '0.625rem', lineHeight: 1.4 }}>
        {tool.freeTier}
      </div>

      {/* Footer: tags + free badge + arrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
        {/* FREE / PAID badge */}
        <span style={{ fontSize: '0.55rem', fontFamily: "'Share Tech Mono', monospace", padding: '0.15rem 0.45rem', borderRadius: 4, flexShrink: 0, background: tool.free ? `${freeColor}12` : `${paidColor}12`, color: tool.free ? freeColor : paidColor, border: `1px solid ${tool.free ? freeColor : paidColor}25` }}>
          {tool.free ? 'FREE' : 'PAID'}
        </span>

        {/* Tags */}
        {(tool.tags || []).slice(0, 2).map(tag => {
          const meta = TAG_META[tag]
          if (!meta) return null
          return (
            <span key={tag} style={{ fontSize: '0.55rem', fontFamily: "'Share Tech Mono', monospace", padding: '0.15rem 0.45rem', borderRadius: 4, background: meta.bg, color: meta.color, flexShrink: 0 }}>
              {meta.label}
            </span>
          )
        })}

        {/* Spacer + learn arrow */}
        {!soon && (
          <span style={{ marginLeft: 'auto', fontSize: '0.65rem', color: tool.color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem', flexShrink: 0 }}>
            Learn <ChevronRight size={11} />
          </span>
        )}
      </div>
    </div>
  )
}
