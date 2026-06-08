import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { getMissions } from '../api/api'

const RANK_META = {
  D: { color: '#22C55E', bg: 'rgba(34,197,94,0.12)', label: 'D-RANK', desc: 'Academy Level' },
  C: { color: '#60A5FA', bg: 'rgba(96,165,250,0.12)', label: 'C-RANK', desc: 'Genin Level' },
  B: { color: '#9B6ED4', bg: 'rgba(155,110,212,0.12)', label: 'B-RANK', desc: 'Chunin Level' },
  A: { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', label: 'A-RANK', desc: 'Jonin Level' },
  S: { color: '#EF4444', bg: 'rgba(239,68,68,0.12)',  label: 'S-RANK', desc: 'Kage Level' },
}

const TECH_COLORS = {
  Python:       { bg: '#3776AB22', color: '#60A5FA' },
  HTML:         { bg: '#E44D2622', color: '#FF7F2A' },
  CSS:          { bg: '#264DE422', color: '#7BA3FA' },
  JavaScript:   { bg: '#F7DF1E22', color: '#F7DF1E' },
  OOP:          { bg: '#10B98122', color: '#34D399' },
  JSON:         { bg: '#9B6ED422', color: '#C084FC' },
  'File I/O':   { bg: '#F59E0B22', color: '#FCD34D' },
  API:          { bg: '#EF444422', color: '#FCA5A5' },
  DOM:          { bg: '#60A5FA22', color: '#93C5FD' },
  localStorage: { bg: '#4ADE8022', color: '#86EFAC' },
  BOM:          { bg: '#FB923C22', color: '#FDBA74' },
  threading:    { bg: '#A78BFA22', color: '#C4B5FD' },
  requests:     { bg: '#34D39922', color: '#6EE7B7' },
  CSV:          { bg: '#F59E0B22', color: '#FCD34D' },
  collections:  { bg: '#9B6ED422', color: '#C084FC' },
}

export default function MissionsPage() {
  const [missions, setMissions]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [filter, setFilter]       = useState('')
  const { user }                  = useAuth()
  const { theme, toggleTheme }    = useTheme()
  const navigate                  = useNavigate()
  const light                     = theme === 'light'

  useEffect(() => {
    getMissions()
      .then(r => setMissions(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter.trim() === ''
    ? missions
    : missions.filter(m => {
        const q = filter.toLowerCase()
        return (
          m.title?.toLowerCase().includes(q) ||
          m.subjectTitles?.some(s => s.toLowerCase().includes(q)) ||
          m.techStack?.some(t => t.toLowerCase().includes(q)) ||
          m.rank?.toLowerCase().includes(q)
        )
      })

  const handleCardClick = (id) => {
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent(`/missions/${id}`)}`)
      return
    }
    navigate(`/missions/${id}`)
  }

  // ── Styles ──────────────────────────────────────────────────────────────
  const S = {
    page: {
      minHeight: '100vh',
      background: 'var(--mission-page-bg)',
      fontFamily: "'Rajdhani', sans-serif",
      color: 'var(--text-primary)',
    },
    hero: {
      textAlign: 'center',
      padding: 'clamp(2rem, 6vw, 4rem) 1.25rem clamp(1.5rem, 4vw, 2.5rem)',
      position: 'relative',
      overflow: 'hidden',
    },
    kanji: {
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: '0.75rem',
      color: light ? 'rgba(100,40,0,0.5)' : 'rgba(255,127,42,0.5)',
      letterSpacing: '0.25em',
      marginBottom: '0.5rem',
      display: 'block',
    },
    heroTitle: {
      fontFamily: "'Orbitron', sans-serif",
      fontSize: 'clamp(2rem, 6vw, 3.5rem)',
      fontWeight: 900,
      letterSpacing: '0.12em',
      margin: '0 0 0.5rem',
    },
    heroSub: {
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: '0.85rem',
      color: 'var(--mission-hero-sub)',
      letterSpacing: '0.1em',
      marginBottom: '2rem',
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      maxWidth: 800,
      margin: '0 auto 2rem',
      padding: '0 1.5rem',
    },
    dividerLine: {
      flex: 1,
      height: 1,
      background: 'var(--mission-divider)',
    },
    dividerIcon: {
      color: light ? '#7C3500' : '#FF7F2A',
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: '0.7rem',
      letterSpacing: '0.2em',
    },
    filters: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.5rem',
      flexWrap: 'wrap',
      padding: '0 1.5rem 2.5rem',
    },
    container: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '0 1.5rem 4rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
      gap: '1.25rem',
    },
    footer: {
      textAlign: 'center',
      padding: '2rem',
      borderTop: '1px solid var(--mission-footer-bdr)',
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: '0.72rem',
      color: 'var(--mission-footer-text)',
      letterSpacing: '0.1em',
    },
  }

  return (
    <div style={S.page}>

      {/* ── Top Nav ──────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1rem', height: 52,
        background: 'var(--mission-nav-bg)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--mission-nav-border)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>

        {/* Left — back arrow + brand name */}
        <button onClick={() => navigate('/')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          fontFamily: "'Orbitron', sans-serif", fontWeight: 900,
          fontSize: 'clamp(1.1rem, 2.5vw, 0.9rem)',
          letterSpacing: '0.12em', color: light ? '#7C3500' : '#FF7F2A',
          padding: 0, flexShrink: 0,
        }}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          LearnToEarn
        </button>

        {/* Right — theme toggle + Skill Arena */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>

          {/* Theme toggle */}
          <button onClick={toggleTheme} style={{
            background: 'none',
            border: `1px solid ${light ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 6, width: 32, height: 32, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: light ? '#7C3500' : '#8B9AB8', transition: 'all 0.15s', flexShrink: 0,
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = light ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = light ? '#1A1A2E' : '#E2E8F0' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = light ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = light ? '#7C3500' : '#8B9AB8' }}
            title={light ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {light ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          {/* Skill Arena */}
          <button onClick={() => navigate(user ? '/skill-arena/dashboard' : '/login?redirect=/skill-arena/dashboard')} style={{
            background: 'linear-gradient(135deg, rgba(155,110,212,0.15), rgba(155,110,212,0.08))',
            border: '1px solid rgba(155,110,212,0.4)',
            borderRadius: 6, padding: '0.3rem 0.75rem', cursor: 'pointer',
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 'clamp(1.1rem, 2vw, 1.2rem)',
            letterSpacing: '0.07em',
            color: '#B48AE8', transition: 'all 0.15s',
            display: 'flex', alignItems: 'center', gap: '0.3rem',
            whiteSpace: 'nowrap', flexShrink: 0,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(155,110,212,0.22)'; e.currentTarget.style.borderColor = 'rgba(155,110,212,0.7)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(155,110,212,0.15), rgba(155,110,212,0.08))'; e.currentTarget.style.borderColor = 'rgba(155,110,212,0.4)' }}
          >
            ⚔ <span className="mission-arena-label">SKILL ARENA</span>
          </button>
        </div>

      </div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div style={S.hero}>
        <h1 style={S.heroTitle} className="mission-title-grad">MISSION BOARD</h1>
        <p style={S.heroSub}>Accept your mission. Prove your worth. Build your legacy.</p>

      </div>

      {/* ── Search ───────────────────────────────────────────── */}
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 1.5rem 2rem' }}>
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)',
            color: light ? '#8B6040' : '#6B5030', pointerEvents: 'none', fontSize: '0.85rem',
          }}>🔍</span>
          <input
            type="text"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Search by subject, title or tech..."
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '0.65rem 2.5rem 0.65rem 2.25rem',
              borderRadius: 8,
              border: `1.5px solid ${light ? 'rgba(100,40,0,0.2)' : 'rgba(255,127,42,0.15)'}`,
              background: light ? 'rgba(252,250,246,0.95)' : 'rgba(13,17,32,0.8)',
              color: light ? '#1A1A2E' : '#E2E8F0',
              fontFamily: "'Rajdhani', sans-serif", fontSize: '0.95rem',
              outline: 'none', transition: 'border-color 0.2s',
            }}
            onFocus={e => { e.target.style.borderColor = light ? 'rgba(100,40,0,0.5)' : 'rgba(255,127,42,0.4)' }}
            onBlur={e => { e.target.style.borderColor = light ? 'rgba(100,40,0,0.2)' : 'rgba(255,127,42,0.15)' }}
          />
          {filter && (
            <button onClick={() => setFilter('')} style={{
              position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              color: light ? '#8B6040' : '#6B5030', fontSize: '1rem', lineHeight: 1,
              padding: '0.1rem',
            }}>✕</button>
          )}
        </div>
        <div style={{
          marginTop: '0.5rem', textAlign: 'center',
          fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem',
          letterSpacing: '0.08em', color: light ? '#6B4820' : '#6B5020',
        }}>
          {filter
            ? `${filtered.length} MISSION${filtered.length !== 1 ? 'S' : ''} FOUND`
            : `SHOWING ALL ${missions.length} MISSIONS`
          }
        </div>
      </div>

      {/* ── Grid ─────────────────────────────────────────────── */}
      <div style={S.container}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
            <ShurikenSpinner />
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: light ? '#6B4820' : '#6B5020',
            fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.1em' }}>
            NO MISSIONS FOUND
          </div>
        ) : (
          <div style={S.grid}>
            {filtered.map((mission, i) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                index={i}
                light={light}
                onClick={() => handleCardClick(mission.id)}
              />
            ))}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div style={S.footer}>
            ◆ {filtered.length} MISSION{filtered.length !== 1 ? 'S' : ''} AVAILABLE · MORE COMING SOON ◆
          </div>
        )}
      </div>
    </div>
  )
}

// ── Mission Card ──────────────────────────────────────────────────────────────
function MissionCard({ mission, index, light, onClick }) {
  const m = RANK_META[mission.rank] || RANK_META['D']

  return (
    <div
      className="mission-card"
      onClick={onClick}
      style={{
        background: light ? '#FFFDF6' : '#0D1120',
        border: `1px solid ${m.color}30`,
        borderTop: `3px solid ${m.color}`,
        borderRadius: 10,
        padding: '1.25rem',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        animationDelay: `${index * 0.06}s`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s',
      }}
      onMouseEnter={e => {
        if (!window.matchMedia('(hover: hover)').matches) return
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = `0 8px 32px ${m.color}20`
        e.currentTarget.style.borderColor = `${m.color}60`
      }}
      onMouseLeave={e => {
        if (!window.matchMedia('(hover: hover)').matches) return
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = `${m.color}30`
      }}
    >
      {/* Rank stamp */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
        <div className="rank-stamp" style={{
          fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.75rem',
          color: m.color, background: m.bg, border: `1.5px solid ${m.color}50`,
          borderRadius: 6, padding: '0.25rem 0.6rem', letterSpacing: '0.08em',
        }}>
          {mission.rank}-RANK
        </div>
        <div style={{
          fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem',
          color: light ? '#6B4820' : '#6B5020', letterSpacing: '0.06em',
        }}>
          ⏱ {mission.estimatedHours}h
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
        fontSize: '1.05rem', letterSpacing: '0.04em',
        color: light ? '#1A1A2E' : '#E2E8F0',
        margin: '0 0 0.5rem', lineHeight: 1.3,
      }}>
        {mission.title}
      </h3>

      {/* Brief */}
      <p style={{
        fontSize: '0.8rem', color: light ? '#3A3020' : '#8B9AB8',
        lineHeight: 1.6, margin: '0 0 1rem',
        display: '-webkit-box', WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {mission.missionBrief}
      </p>

      {/* Tech tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '0.875rem' }}>
        {mission.techStack?.slice(0, 4).map(t => {
          const tc = TECH_COLORS[t] || { bg: 'rgba(255,127,42,0.1)', color: '#FF7F2A' }
          return (
            <span key={t} style={{
              fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem',
              letterSpacing: '0.04em', padding: '0.15rem 0.45rem',
              borderRadius: 4, background: tc.bg, color: tc.color,
            }}>
              {t}
            </span>
          )
        })}
      </div>

      {/* Subjects */}
      {mission.subjectTitles?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.25rem' }}>
          {mission.subjectTitles.slice(0, 3).map(s => (
            <span key={s} style={{
              fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem',
              color: light ? '#5A3A18' : '#6B5030', letterSpacing: '0.04em',
              padding: '0.1rem 0.4rem', borderRadius: 3,
              border: light ? '1px solid rgba(230,80,0,0.2)' : '1px solid rgba(255,127,42,0.15)',
            }}>
              {s}
            </span>
          ))}
        </div>
      )}

      {/* Corner decoration */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: 40, height: 40, overflow: 'hidden', opacity: 0.12,
      }}>
        <div style={{
          position: 'absolute', bottom: -10, right: -10,
          width: 50, height: 50, background: m.color,
          transform: 'rotate(45deg)',
        }} />
      </div>
    </div>
  )
}

// ── Shuriken Spinner ──────────────────────────────────────────────────────────
function ShurikenSpinner() {
  return (
    <div className="shuriken-spinner" style={{
      width: 48, height: 48,
      animation: 'shurikenSpin 0.8s linear infinite',
    }}>
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4 L28 20 L44 24 L28 28 L24 44 L20 28 L4 24 L20 20 Z"
          fill="#FF7F2A" opacity="0.9"/>
        <circle cx="24" cy="24" r="4" fill="#FF7F2A"/>
      </svg>
    
    </div>
  )
}
