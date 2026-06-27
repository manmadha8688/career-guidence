import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Search, X, ExternalLink } from 'lucide-react'
import { STACKS, PLATFORMS } from './deployment/guideData'

// ── Platform visibility per filter ────────────────────────────────────────────
const DB_TAGS = ['database', 'mongodb', 'nosql', 'sql', 'postgresql', 'neon', 'supabase', 'atlas', 'storage', 'cloudinary']

const isPlatformVisible = (platform, filter) => {
  if (filter === 'all') return true
  if (filter === 'frontend') return platform.stackType === 'frontend' || platform.stackType === 'all'
  if (filter === 'backend')  return platform.stackType === 'backend'  || platform.stackType === 'all'
  if (filter === 'fullstack') return true // full stack needs every platform
  if (filter === 'database') return platform.tags?.some(t => DB_TAGS.includes(t))
  return true
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function DeploymentGuidePage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  const [search, setSearch]       = useState('')
  const [filterStack, setFilter]  = useState('all')

  const bg    = dark ? '#07090F' : '#EEF0F8'
  const card  = dark ? '#0C101C' : '#FFFFFF'
  const text  = dark ? '#E2E8F0' : '#18244A'
  const muted = dark ? '#64748B' : '#5E7299'
  const bdr   = dark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.1)'
  const navBg = dark ? 'rgba(7,9,15,0.96)' : 'rgba(238,240,248,0.97)'
  const sidebarBg    = dark ? '#0A0D1E' : '#FFFFFF'
  const accentPurple = dark ? '#C4A8F0' : '#7C5DBB'

  // ── Filter + relevance scoring ────────────────────────────────────────────
  const q = search.trim().toLowerCase()

  const scoreItem = (item) => {
    if (!q) return 0
    const id       = (item.id    || '').toLowerCase()
    const title    = (item.title || item.name || '').toLowerCase()
    const subtitle = (item.subtitle || '').toLowerCase()
    const desc     = (item.desc  || '').toLowerCase()
    const tags     = (item.tags  || [])
    let score = 0
    // ID exact / starts-with  → very high
    if (id === q || id.replace(/-/g, ' ') === q) score += 120
    else if (id.startsWith(q))                    score += 80
    else if (id.includes(q))                      score += 30
    // Title
    if (title === q)            score += 110
    else if (title.startsWith(q)) score += 70
    else if (title.includes(q))   score += 50
    // Subtitle
    if (subtitle.startsWith(q)) score += 40
    else if (subtitle.includes(q)) score += 25
    // Tags — exact tag match ranks high, partial lower
    if (tags.some(t => t === q))          score += 60
    else if (tags.some(t => t.startsWith(q))) score += 35
    else if (tags.some(t => t.includes(q)))   score += 15
    // Desc — lowest weight
    if (desc.includes(q)) score += 8
    return score
  }

  const matchSearch = item =>
    !q || scoreItem(item) > 0

  const matchStack = item =>
    filterStack === 'all' ||
    item.stackType === filterStack ||
    item.stackType === 'all'

  const visibleStacks = STACKS
    .filter(s => matchSearch(s) && matchStack(s))
    .sort((a, b) => scoreItem(b) - scoreItem(a))

  const visiblePlatforms = PLATFORMS
    .filter(p => isPlatformVisible(p, filterStack) && matchSearch(p))
    .sort((a, b) => scoreItem(b) - scoreItem(a))

  const hasFilters = filterStack !== 'all' || !!search
  const clearFilters = () => { setFilter('all'); search && setSearch !== '' && setSearch('') }

  const FILTER_OPTIONS = [
    { key: 'all',       label: 'All',       icon: '🌐' },
    { key: 'frontend',  label: 'Frontend',  icon: '⚛️' },
    { key: 'backend',   label: 'Backend',   icon: '🖥' },
    { key: 'fullstack', label: 'Full Stack', icon: '🔷' },
    { key: 'database',  label: 'Database',  icon: '🗄️' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: bg, color: text, fontFamily: "'Rajdhani', 'Inter', sans-serif" }}>

      {/* ── Top Nav ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: navBg, backdropFilter: 'blur(12px)', borderBottom: `1px solid ${bdr}`, padding: '0 1.5rem', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', color: muted, fontSize: '0.82rem', padding: '0.35rem 0.5rem', borderRadius: 7 }}>
          <ArrowLeft size={15} />
          Home
        </button>
        <span style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 800, fontSize: '0.78rem', color: dark ? '#9B6ED4' : '#7C5DBB', letterSpacing: '0.1em' }}>DEPLOY GUIDE</span>
        <button onClick={toggleTheme} style={{ background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)', border: `1px solid ${bdr}`, borderRadius: 8, padding: '0.38rem', cursor: 'pointer', display: 'flex', alignItems: 'center', color: muted }}>
          {dark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </nav>

      {/* ── 3-column layout ── */}
      <div style={{ display: 'flex', maxWidth: 1280, margin: '0 auto' }}>

        {/* ── LEFT: Filter Sidebar ── */}
        <aside style={{ width: 220, flexShrink: 0, background: sidebarBg, borderRight: `1px solid ${bdr}`, padding: '1.25rem 1rem', minHeight: 'calc(100vh - 52px)', position: 'sticky', top: 52, maxHeight: 'calc(100vh - 52px)', overflowY: 'auto' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', color: muted, textTransform: 'uppercase', marginBottom: '1rem' }}>
            Filter Guides
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.6rem', fontFamily: 'monospace', fontWeight: 700, color: muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem', borderBottom: `1px solid ${bdr}`, paddingBottom: '0.4rem' }}>
              Category
            </div>
            {FILTER_OPTIONS.map(opt => {
              const active = filterStack === opt.key
              return (
                <button key={opt.key} onClick={() => setFilter(opt.key)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', width: '100%', textAlign: 'left', background: active ? (dark ? 'rgba(155,110,212,0.2)' : 'rgba(124,93,187,0.1)') : 'none', border: 'none', borderLeft: active ? `3px solid ${accentPurple}` : '3px solid transparent', borderRadius: '0 6px 6px 0', padding: '0.42rem 0.7rem', cursor: 'pointer', fontSize: '0.8rem', color: active ? accentPurple : muted, fontWeight: active ? 700 : 400, marginBottom: '0.1rem', transition: 'all 0.15s' }}>
                  <span style={{ fontSize: '0.8rem' }}>{opt.icon}</span>
                  {opt.label}
                </button>
              )
            })}
          </div>

          {/* Clear */}
          {hasFilters && (
            <button onClick={clearFilters} style={{ width: '100%', background: 'none', border: `1px solid ${bdr}`, borderRadius: 7, padding: '0.4rem', cursor: 'pointer', fontSize: '0.72rem', color: muted, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
              <X size={11} /> Show all
            </button>
          )}
        </aside>

        {/* ── MIDDLE: Guides ── */}
        <main style={{ flex: 1, minWidth: 0, padding: '1.5rem 1.75rem' }}>

          {/* Page title + search */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h1 style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,2.5vw,1.45rem)', margin: '0 0 0.3rem' }}>
              <span style={{ background: 'linear-gradient(135deg,#9B6ED4,#60A5FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Deploy Your Project</span>
              <span style={{ color: text }}>{' — Go Live Free'}</span>
            </h1>
            <p style={{ color: muted, fontSize: '0.82rem', margin: '0 0 1rem' }}>Step-by-step guides · Free hosting · No credit card needed</p>
            <div style={{ position: 'relative' }}>
              <Search size={14} color={muted} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder='Search — "react", "django", "mongodb", "postgres"…'
                style={{ width: '100%', background: card, border: `1px solid ${bdr}`, borderRadius: 10, padding: '0.65rem 2.4rem 0.65rem 2.3rem', fontSize: '0.83rem', color: text, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', boxShadow: dark ? 'none' : '0 1px 6px rgba(0,0,0,0.07)' }}
              />
              {search && (
                <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '0.7rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: muted, display: 'flex', padding: '0.2rem' }}>
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Guides grid */}
          {visibleStacks.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.62rem', fontFamily: 'monospace', fontWeight: 700, color: muted, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
                {filterStack === 'database' ? '🗄️' : '📦'} {filterStack === 'database' ? 'Database' : 'Deployment'} Guides ({visibleStacks.length})
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '1rem' }}>
                {visibleStacks.map(stack => (
                  <button type="button" key={stack.id} onClick={() => navigate(stack.route)}
                    style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 16, padding: '1.3rem 1.15rem', cursor: 'pointer', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.65rem', transition: 'border-color 0.18s, box-shadow 0.18s, transform 0.18s', boxShadow: dark ? 'none' : '0 2px 10px rgba(0,0,0,0.07)', overflow: 'hidden', position: 'relative' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = stack.color + '70'; e.currentTarget.style.boxShadow = `0 6px 28px ${stack.color}28`; e.currentTarget.style.transform = 'translateY(-3px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = bdr; e.currentTarget.style.boxShadow = dark ? 'none' : '0 2px 10px rgba(0,0,0,0.07)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                    <div style={{ height: 3, background: `linear-gradient(90deg,${stack.color},${stack.color}88)`, position: 'absolute', top: 0, left: 0, right: 0 }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                      <span style={{ fontSize: '2.1rem' }}>{stack.emoji}</span>
                      <span style={{ fontSize: '0.6rem', fontFamily: 'monospace', background: `${stack.color}18`, color: stack.color, border: `1px solid ${stack.color}35`, borderRadius: 20, padding: '0.12rem 0.55rem' }}>{stack.platforms}</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: text, marginBottom: '0.15rem' }}>{stack.title}</div>
                      <div style={{ fontSize: '0.7rem', color: stack.color, fontFamily: 'monospace' }}>{stack.subtitle}</div>
                    </div>
                    <div style={{ fontSize: '0.76rem', color: muted, lineHeight: 1.55, flex: 1 }}>{stack.desc}</div>
                    <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                      {stack.tags.slice(0, 4).map(tag => (
                        <span key={tag} style={{ fontSize: '0.58rem', fontFamily: 'monospace', background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)', color: muted, borderRadius: 4, padding: '0.1rem 0.35rem' }}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: stack.color, fontWeight: 700, textAlign: 'right' }}>Open guide →</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {visibleStacks.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: muted }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', color: text, marginBottom: '0.35rem' }}>No guides match</div>
              <div style={{ fontSize: '0.8rem' }}>Try "react", "django", "mongodb", "postgres", or "docker"</div>
              <button onClick={clearFilters} style={{ marginTop: '1rem', background: 'none', border: `1px solid ${bdr}`, borderRadius: 8, padding: '0.4rem 1rem', cursor: 'pointer', fontSize: '0.78rem', color: muted }}>Show all</button>
            </div>
          )}
        </main>

        {/* ── RIGHT: Free Platforms Sidebar ── */}
        <aside style={{ width: 230, flexShrink: 0, background: sidebarBg, borderLeft: `1px solid ${bdr}`, padding: '1.25rem 1rem', minHeight: 'calc(100vh - 52px)', position: 'sticky', top: 52, maxHeight: 'calc(100vh - 52px)', overflowY: 'auto' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', color: muted, textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            🆓 Free Platforms
          </div>
          {filterStack !== 'all' && (
            <div style={{ fontSize: '0.62rem', color: accentPurple, fontFamily: 'monospace', marginBottom: '0.75rem', background: `${accentPurple}14`, border: `1px solid ${accentPurple}30`, borderRadius: 6, padding: '0.25rem 0.5rem' }}>
              Showing: {FILTER_OPTIONS.find(o => o.key === filterStack)?.icon} {FILTER_OPTIONS.find(o => o.key === filterStack)?.label} only
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {visiblePlatforms.map(p => (
              <a key={p.name} href={`https://${p.url}`} target="_blank" rel="noopener noreferrer"
                style={{ background: dark ? 'rgba(255,255,255,0.04)' : '#F5F7FC', border: `1px solid ${bdr}`, borderRadius: 12, padding: '0.9rem', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', transition: 'border-color 0.18s, background 0.18s', borderLeft: `3px solid ${p.color}` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = p.color + '70'; e.currentTarget.style.background = dark ? `${p.color}0E` : `${p.color}0A` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = bdr; e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.04)' : '#F5F7FC' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, boxShadow: `0 0 6px ${p.color}90` }} />
                    <span style={{ fontWeight: 800, fontSize: '0.88rem', color: text }}>{p.name}</span>
                  </div>
                  <ExternalLink size={11} color={p.color} />
                </div>
                <div style={{ fontSize: '0.72rem', color: muted, lineHeight: 1.5 }}>{p.desc}</div>
                <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: p.color, background: `${p.color}18`, border: `1px solid ${p.color}30`, borderRadius: 20, padding: '0.15rem 0.55rem', alignSelf: 'flex-start' }}>{p.free}</span>
              </a>
            ))}
            {visiblePlatforms.length === 0 && (
              <div style={{ fontSize: '0.75rem', color: muted, textAlign: 'center', padding: '1rem 0' }}>
                No platforms for this filter
              </div>
            )}
          </div>
        </aside>

      </div>
    </div>
  )
}
