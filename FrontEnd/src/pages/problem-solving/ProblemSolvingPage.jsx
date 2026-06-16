import { useNavigate } from 'react-router-dom'
import { Sun, Moon, ChevronRight } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const TRACKS = [
  {
    key: 'start-coding',
    icon: '💻',
    title: 'Start Coding',
    subtitle: 'Never written code before?',
    desc: 'Step-by-step guided path from zero. Variables, loops, functions — in order. Cannot skip steps.',
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.22)',
    tag: 'GUIDED PATH',
  },
  {
    key: 'logic-building',
    icon: '🧠',
    title: 'Logic Building',
    subtitle: 'Can code but cannot solve problems?',
    desc: 'Train your problem-solving mind. Patterns, number problems, array and string challenges.',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.22)',
    tag: 'THINK LIKE A DEV',
  },
  {
    key: 'skill-up',
    icon: '⚡',
    title: 'Skill Up',
    subtitle: 'Want to improve problem solving?',
    desc: 'Filter by topic. Same problem, four languages. Learn brute force to optimized approach.',
    color: '#0EA5E9',
    bg: 'rgba(14,165,233,0.08)',
    border: 'rgba(14,165,233,0.22)',
    tag: 'MULTI-LANGUAGE',
  },
  {
    key: 'interview-prep',
    icon: '💼',
    title: 'Interview Prep',
    subtitle: 'Preparing for job interviews?',
    desc: 'Pick a 7, 30, or 90-day plan. Most-asked questions with output, debug, write and conceptual types.',
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.22)',
    tag: 'GET HIRED',
  },
  {
    key: 'scenario-coding',
    icon: '🏗️',
    title: 'Scenario Coding',
    subtitle: 'Can you build real systems?',
    desc: 'real-world problems. Implement functions for shopping carts, banks, parking lots, booking systems — scenario first, you code the logic.',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.22)',
    tag: 'REAL WORLD',
  },
]

export default function ProblemSolvingPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const light = theme === 'light'

  return (
    <div style={{
      minHeight: '100vh', overflowX: 'hidden',
      background: 'var(--ps-bg)',
      fontFamily: "'Rajdhani', sans-serif",
      color: 'var(--text-primary)',
    }}>
      <style>{`@media(max-width:480px){.ps-nav-center{display:none!important;}}`}</style>

      {/* Nav */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.25rem', height: 52,
        background: 'var(--ps-nav-bg)', backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--ps-nav-border)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <button onClick={() => navigate(-1)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          fontFamily: "'Orbitron', sans-serif", fontWeight: 900,
          fontSize: '0.72rem', letterSpacing: '0.1em',
          color: 'var(--ps-accent)', padding: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          LearnToEarn
        </button>

        <span className="ps-nav-center" style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: '0.72rem',
          fontWeight: 700, letterSpacing: '0.15em',
          color: light ? '#1A1A2E' : '#CBD5E1',
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        }}>
          PROBLEM SOLVING
        </span>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button onClick={toggleTheme} style={{
            background: 'none', border: '1px solid var(--ps-nav-border)',
            borderRadius: 6, width: 32, height: 32, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--ps-muted)',
          }}>
            {light ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <button onClick={() => navigate('/skill-arena/dashboard')} style={{
            background: 'var(--ps-accent-dim)', border: '1px solid var(--ps-accent)55',
            borderRadius: 6, padding: '0.25rem 0.65rem', cursor: 'pointer',
            fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem',
            letterSpacing: '0.07em', color: 'var(--ps-accent)',
          }}>
            ⚔ SKILL ARENA
          </button>
        </div>
      </div>

      {/* Track selector */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: 'clamp(2rem,5vw,4rem) 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{
            fontFamily: "'Orbitron', sans-serif", fontWeight: 900,
            fontSize: 'clamp(1.5rem, 5vw, 2.4rem)', letterSpacing: '0.1em',
            color: 'var(--text-primary)', margin: '0 0 0.75rem',
          }}>
            WHERE DO YOU START?
          </h1>
          <p style={{
            fontFamily: "'Share Tech Mono', monospace", fontSize: '0.78rem',
            color: 'var(--ps-muted)', letterSpacing: '0.08em',
          }}>
            Five tracks. One goal — write code that works and gets you hired.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px,100%), 1fr))',
          gap: '1rem',
        }}>
          {TRACKS.map(t => (
            <button key={t.key} onClick={() => navigate(`/problem-solving/${t.key}`)} style={{
              background: t.bg, border: `1.5px solid ${t.border}`,
              borderRadius: 12, padding: '1.5rem 1.25rem',
              cursor: 'pointer', textAlign: 'left',
              transition: 'transform 0.15s, box-shadow 0.15s, border-color 0.15s',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 8px 28px ${t.color}22`
                e.currentTarget.style.borderColor = `${t.color}55`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = t.border
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{t.icon}</div>
              <div style={{
                fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem',
                letterSpacing: '0.12em', color: t.color, marginBottom: '0.35rem',
              }}>
                {t.tag}
              </div>
              <div style={{
                fontFamily: "'Orbitron', sans-serif", fontWeight: 700,
                fontSize: '0.88rem', letterSpacing: '0.05em',
                color: light ? '#1A1A2E' : '#E2E8F0', marginBottom: '0.3rem',
              }}>
                {t.title}
              </div>
              <div style={{ fontSize: '0.75rem', color: t.color, fontWeight: 600, marginBottom: '0.5rem' }}>
                {t.subtitle}
              </div>
              <div style={{ fontSize: '0.78rem', color: light ? '#374151' : '#8B9AB8', lineHeight: 1.5 }}>
                {t.desc}
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.2rem',
                marginTop: '1rem', color: t.color,
                fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem',
              }}>
                ENTER <ChevronRight size={13} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
