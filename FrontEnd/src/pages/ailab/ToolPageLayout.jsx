import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, Copy, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../components/ScrollToTop'
import { TOOLS, CATEGORIES } from './aiLabData'
import toast from 'react-hot-toast'

const CYAN = '#00D9FF'

/**
 * ToolPageLayout — shared layout for every AI tool page
 *
 * Props:
 *   tool: { id, category, name, tagline, icon, color, free, freeTier, officialUrl }
 *   videos: [{ label, url, duration, note }]
 *   overview: string  — 1-2 paragraph plain text shown right after header
 *   sections: [{ content: string | ReactNode }]  — flowing content blocks (no titles)
 *   canDo: string[]   — what you can do after learning this
 *   task: { title, description, steps[], cost }  — project task
 *   tip: string       — pro tip
 */
export default function ToolPageLayout({ tool, videos = [], overview, sections = [], canDo = [], task, tip }) {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'

  const bg     = dark ? '#020817' : '#F0F4FF'
  const card   = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(0,217,255,0.09)' : 'rgba(79,70,229,0.11)'
  const txt    = dark ? '#E2E8F0' : '#0F172A'
  const sub    = dark ? '#94A3B8' : '#475569'
  const muted  = dark ? '#64748B' : '#94A3B8'

  const categoryLabel = CATEGORIES.find(c => c.id === tool.category)?.label || ''

  // Prev / Next within same category
  const sameCat = TOOLS.filter(t => t.category === tool.category)
  const idx  = sameCat.findIndex(t => t.id === tool.id)
  const prev = idx > 0 ? sameCat[idx - 1] : null
  const next = idx < sameCat.length - 1 ? sameCat[idx + 1] : null

  const copy = text => { navigator.clipboard.writeText(text); toast.success('Copied!') }

  return (
    <div style={{ minHeight: '100vh', background: bg, color: txt, fontFamily: "'Rajdhani', sans-serif", overflowX: 'hidden' }}>

      {/* ambient glow */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, borderRadius: '50%', background: `radial-gradient(ellipse, ${tool.color}07 0%, transparent 65%)`, filter: 'blur(60px)' }} />
      </div>

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', background: dark ? 'rgba(2,8,23,0.93)' : 'rgba(240,244,255,0.95)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${border}` }}>
        <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.72rem', letterSpacing: '0.1em', color: CYAN, padding: 0 }}>
          <ArrowLeft size={14} /> AI Lab
        </button>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>{categoryLabel}</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* ── Header ── */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${tool.color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem', boxShadow: dark ? `0 0 50px ${tool.color}0d` : `0 4px 24px ${tool.color}10` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${tool.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${tool.color}28`, flexShrink: 0 }}>
              {tool.icon}
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem', letterSpacing: '-0.01em' }}>{tool.name}</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>{tool.tagline}</p>
            </div>
          </div>
          {/* badges */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <Chip label={tool.free ? '✓ FREE' : '⊕ PAID'} color={tool.free ? '#4ADE80' : '#FB923C'} />
            <Chip label={tool.freeTier} color={tool.color} />
            <Chip label={categoryLabel} color={muted} />
            {tool.officialUrl && (
              <a href={tool.officialUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', ...chipStyle(tool.color), textDecoration: 'none' }}>
                <ExternalLink size={10} /> Official Site
              </a>
            )}
          </div>
          {/* overview */}
          {overview && <p style={{ fontSize: '0.925rem', color: sub, lineHeight: 1.85, margin: 0 }}>{overview}</p>}
        </div>

        {/* ── Videos ── */}
        {videos.length > 0 && (
          <Block title="Free tutorials — watch these first" titleColor="#EF4444" dark={dark} border={border} card={card}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {videos.map((v, i) => (
                <a key={i} href={v.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1.125rem', borderRadius: 11, textDecoration: 'none', background: dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.16)', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.09)'}
                  onMouseLeave={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)'}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Play size={13} color="#fff" fill="#fff" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: txt }}>{v.label}</div>
                    {(v.duration || v.note) && <div style={{ fontSize: '0.7rem', color: muted, marginTop: 2 }}>{[v.duration, v.note].filter(Boolean).join(' · ')}</div>}
                  </div>
                  <ExternalLink size={12} color={muted} />
                </a>
              ))}
            </div>
          </Block>
        )}

        {/* ── Flowing content sections ── */}
        {sections.map((section, i) => (
          <Block key={i} dark={dark} border={border} card={card}>
            {typeof section.content === 'string'
              ? section.content.split('\n\n').map((para, j) => (
                  <p key={j} style={{ fontSize: '0.9rem', color: sub, lineHeight: 1.85, margin: '0 0 0.875rem', ...(j === section.content.split('\n\n').length - 1 && { margin: 0 }) }}>{para}</p>
                ))
              : section.content
            }
          </Block>
        ))}

        {/* ── What you can do ── */}
        {canDo.length > 0 && (
          <Block title="What you can do after this" titleColor={tool.color} dark={dark} border={border} card={card}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px,100%),1fr))', gap: '0.5rem' }}>
              {canDo.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}` }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: tool.color, flexShrink: 0, marginTop: 7 }} />
                  <span style={{ fontSize: '0.85rem', color: sub, lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </Block>
        )}

        {/* ── Project Task ── */}
        {task && (
          <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${tool.color}08` : `${tool.color}06`, border: `2px solid ${tool.color}28`, marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
              <span style={{ fontSize: '1.1rem' }}>🎯</span>
              <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color: tool.color }}>PROJECT — {task.title}</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>{task.description}</p>
            {task.steps?.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '0.875rem' }}>
                {task.steps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: tool.color, flexShrink: 0, marginTop: 3 }}>→</span>
                    <span style={{ fontSize: '0.8rem', color: sub, lineHeight: 1.6 }}>{step}</span>
                  </div>
                ))}
              </div>
            )}
            {task.cost && (
              <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>{task.cost}</span>
              </div>
            )}
          </div>
        )}

        {/* ── Pro Tip ── */}
        {tip && (
          <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
            <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>{tip}</p>
          </div>
        )}

        {/* ── Prev / Next ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          {prev ? (
            <button onClick={() => navigate(`/ai-lab/${prev.category}/${prev.id}`)} style={navBtn(border)}>
              <ChevronLeft size={14} /> <span>{prev.icon}</span> {prev.name}
            </button>
          ) : <div />}
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          {next ? (
            <button onClick={() => navigate(`/ai-lab/${next.category}/${next.id}`)} style={navBtn(border)}>
              {next.name} <span>{next.icon}</span> <ChevronRight size={14} />
            </button>
          ) : <div />}
        </div>

      </div>
      <ScrollToTop />
    </div>
  )
}

// ── Small helpers ─────────────────────────────────────────────────────────────
function Block({ title, titleColor, dark, border, card, children }) {
  return (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '1.375rem', backdropFilter: 'blur(8px)', marginBottom: '1.25rem' }}>
      {title && (
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.14em', color: titleColor, textTransform: 'uppercase', paddingBottom: '0.75rem', marginBottom: '1rem', borderBottom: `1px solid ${titleColor}20` }}>
          {title}
        </div>
      )}
      {children}
    </div>
  )
}

function Chip({ label, color }) {
  return <span style={{ ...chipStyle(color) }}>{label}</span>
}

const chipStyle = color => ({
  fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em',
  padding: '0.22rem 0.65rem', borderRadius: 6,
  background: `${color}14`, color, border: `1px solid ${color}28`,
})

const navBtn = border => ({
  display: 'flex', alignItems: 'center', gap: '0.4rem',
  padding: '0.65rem 1.1rem', borderRadius: 10,
  border: `1px solid ${border}`, background: 'none', cursor: 'pointer',
  color: '#94A3B8', fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600,
  transition: 'all 0.15s',
})
