import { useState, useEffect } from 'react'
import { TEST_DELAY_MS, PAGE_MIN_MS } from '../components/loaders/_config'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, ChevronUp, Sun, Moon } from 'lucide-react'
import SmokeBladeLoader from '../components/loaders/SmokeBladeLoader'
import { getMission } from '../api/api'
import { useTheme } from '../context/ThemeContext'

const RANK_META = {
  D: { color: '#4ADE80', bg: 'rgba(74,222,128,0.12)',   label: 'D-RANK', desc: 'Academy Level' },
  C: { color: '#60A5FA', bg: 'rgba(96,165,250,0.12)',   label: 'C-RANK', desc: 'Genin Level' },
  B: { color: '#9B6ED4', bg: 'rgba(155,110,212,0.12)', label: 'B-RANK', desc: 'Chunin Level' },
  A: { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)',   label: 'A-RANK', desc: 'Jonin Level' },
  S: { color: '#EF4444', bg: 'rgba(239,68,68,0.12)',    label: 'S-RANK', desc: 'Kage Level' },
}

export default function MissionDetailPage() {
  const { id }              = useParams()
  const navigate            = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const light               = theme === 'light'
  const [mission, setMission] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hintsOpen, setHintsOpen] = useState(false)
  const [approachOpen, setApproachOpen] = useState(false)
  const [mistakesOpen, setMistakesOpen] = useState(false)

  useEffect(() => {
    getMission(id)
      .then(r => setMission(r.data))
      .catch(() => navigate('/missions'))
      .finally(() => setTimeout(() => setLoading(false), PAGE_MIN_MS))
  }, [id])

  if (loading) return <SmokeBladeLoader />

  if (!mission) return null

  const m = RANK_META[mission.rank] || RANK_META['D']

  const S = {
    page: {
      minHeight: '100vh',
      background: light
        ? 'linear-gradient(135deg, #F5F0E8, #EDE8D8)'
        : 'linear-gradient(135deg, #070B18, #0A0F22)',
      fontFamily: "'Rajdhani', sans-serif",
      color: light ? '#1A1A2E' : '#E2E8F0',
    },
    topBar: {
      height: 56, position: 'sticky', top: 0, zIndex: 50,
      background: 'var(--mission-nav-bg)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--mission-nav-border)',
      display: 'flex', alignItems: 'center', gap: '1rem', padding: '0 1.5rem',
    },
    content: { maxWidth: 800, margin: '0 auto', padding: 'clamp(1rem, 4vw, 2rem) clamp(1rem, 4vw, 1.5rem) 4rem' },
    section: {
      background: light ? 'rgba(252,250,246,0.95)' : 'rgba(13,17,32,0.8)',
      border: light ? '1px solid rgba(230,80,0,0.15)' : '1px solid rgba(255,127,42,0.1)',
      borderRadius: 10, padding: '1.5rem', marginBottom: '1.25rem',
    },
    sectionLabel: {
      fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem',
      letterSpacing: '0.2em', color: light ? '#7C3500' : '#FF7F2A',
      textTransform: 'uppercase', marginBottom: '0.75rem', display: 'block',
    },
    h2: {
      fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
      fontSize: '1rem', letterSpacing: '0.04em',
      color: light ? '#1A1A2E' : '#E2E8F0', margin: '0 0 0.75rem',
    },
    body: { fontSize: '0.9rem', lineHeight: 1.7, color: light ? '#2E2818' : '#A0B0C8' },
    listItem: {
      display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
      marginBottom: '0.6rem', fontSize: '0.875rem', lineHeight: 1.6,
      color: light ? '#251C0C' : '#B0BED0',
    },
    bullet: {
      width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
      marginTop: '0.45rem', background: m.color,
    },
    starBullet: {
      width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
      marginTop: '0.25rem', background: `${m.color}22`, border: `1px solid ${m.color}60`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '0.5rem', color: m.color, fontFamily: "'Orbitron', monospace",
    },
  }

  return (
    <div style={S.page}>
      {/* ── Top bar ────────────────────────────────────────── */}
      <div style={S.topBar}>
        {/* Back to missions */}
        <button onClick={() => navigate(-1)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '0.375rem',
          color: light ? '#8B6040' : '#8B9AB8',
          fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem', letterSpacing: '0.06em',
        }}>
          <ArrowLeft size={14} /> MISSIONS
        </button>

        {/* Title */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0, padding: '0 0.75rem' }}>
          <span style={{
            fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.7rem',
            color: m.color, background: m.bg, border: `1.5px solid ${m.color}50`,
            borderRadius: 6, padding: '0.2rem 0.55rem', letterSpacing: '0.08em', flexShrink: 0,
          }}>
            {mission.rank}-RANK
          </span>
          <span style={{
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.95rem',
            color: light ? '#1A1A2E' : '#E2E8F0',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {mission.title}
          </span>
        </div>

        {/* Right nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
          {/* Hours — hide on very small screens */}
          <span className="mission-detail-hours" style={{
            fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem',
            color: light ? '#6B4820' : '#6B5020',
          }}>
            ⏱ {mission.estimatedHours}h
          </span>

          {/* Theme toggle */}
          <button onClick={toggleTheme} style={{
            background: 'none',
            border: `1px solid ${light ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 5, width: 28, height: 28, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: light ? '#7C3500' : '#8B9AB8', transition: 'all 0.15s',
          }}
            title={light ? 'Switch to dark' : 'Switch to light'}
          >
            {light ? <Moon size={13} /> : <Sun size={13} />}
          </button>

          {/* Skill Arena */}
          <button onClick={() => navigate('/skill-arena/dashboard')} style={{
            background: 'rgba(155,110,212,0.12)', border: '1px solid rgba(155,110,212,0.35)',
            borderRadius: 5, padding: '0.25rem 0.6rem', cursor: 'pointer',
            fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.06em',
            color: '#B48AE8', transition: 'all 0.15s',
            display: 'flex', alignItems: 'center', gap: '0.25rem',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(155,110,212,0.22)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(155,110,212,0.12)'}
          >
            ⚔ <span className="mission-arena-label">SKILL ARENA</span>
          </button>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────── */}
      <div style={S.content}>

        {/* Hero rank + title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="rank-stamp-lg" style={{
            display: 'inline-block',
            fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '1.1rem',
            color: m.color, background: m.bg,
            border: `2.5px solid ${m.color}60`, borderRadius: 10,
            padding: '0.5rem 1.5rem', letterSpacing: '0.12em',
            marginBottom: '1rem',
          }}>
            {mission.rank}-RANK · {m.desc.toUpperCase()}
          </div>
          <h1 style={{
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
            fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', letterSpacing: '0.05em',
            color: light ? '#1A1A2E' : '#E2E8F0', margin: '0 0 0.75rem',
          }}>
            {mission.title}
          </h1>
          {/* Tech tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
            {mission.techStack?.map(t => (
              <span key={t} style={{
                fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem',
                color: light ? '#7C3500' : '#FF9F4A', letterSpacing: '0.06em',
                padding: '0.2rem 0.55rem', borderRadius: 5,
                background: light ? 'rgba(100,40,0,0.08)' : 'rgba(255,127,42,0.1)',
                border: light ? '1px solid rgba(230,80,0,0.25)' : '1px solid rgba(255,127,42,0.2)',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Mission Brief */}
        <div style={S.section}>
          <span style={S.sectionLabel}>◆ MISSION BRIEF</span>
          <p style={S.body}>{mission.missionBrief}</p>

          {/* Learning Outcome */}
          {mission.learningOutcome && (
            <div style={{
              marginTop: '1rem', padding: '0.75rem 1rem', borderRadius: 7,
              background: light ? `${m.color}14` : `${m.color}10`,
              border: `1px solid ${m.color}35`,
            }}>
              <span style={{ ...S.sectionLabel, color: m.color, marginBottom: '0.35rem' }}>🎯 WHAT YOU WILL ACHIEVE</span>
              <p style={{ ...S.body, margin: 0, color: light ? '#1A1A2E' : '#D0DCF0', fontStyle: 'italic' }}>
                {mission.learningOutcome}
              </p>
            </div>
          )}

          {/* Related subjects */}
          {mission.subjectTitles?.length > 0 && (
            <div style={{ marginTop: '1rem', paddingTop: '1rem',
              borderTop: light ? '1px solid rgba(230,80,0,0.1)' : '1px solid rgba(255,127,42,0.08)' }}>
              <span style={{ ...S.sectionLabel, marginBottom: '0.5rem' }}>RELATED SUBJECTS</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {mission.subjectTitles.map(s => (
                  <span key={s} style={{
                    fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem',
                    color: light ? '#4A3018' : '#8B7040', letterSpacing: '0.04em',
                    padding: '0.2rem 0.55rem', borderRadius: 4,
                    border: light ? '1px solid rgba(230,80,0,0.2)' : '1px solid rgba(255,127,42,0.15)',
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Prerequisites */}
        {mission.prerequisites?.length > 0 && (
          <div style={{
            ...S.section,
            borderColor: light ? 'rgba(251,191,36,0.3)' : 'rgba(251,191,36,0.2)',
            background: light ? 'rgba(255,251,235,0.9)' : 'rgba(20,15,5,0.7)',
          }}>
            <span style={{ ...S.sectionLabel, color: '#F59E0B' }}>⚡ BEFORE YOU START — PREREQUISITES</span>
            <p style={{ ...S.body, fontSize: '0.78rem', marginBottom: '0.75rem', color: light ? '#6B4A00' : '#A08030' }}>
              Make sure you are comfortable with these concepts before attempting this mission.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {mission.prerequisites.map((pre, i) => (
                <span key={i} style={{
                  fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem',
                  color: light ? '#7C4F00' : '#D4A030',
                  background: light ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.08)',
                  border: '1px solid rgba(245,158,11,0.35)',
                  borderRadius: 5, padding: '0.25rem 0.65rem', letterSpacing: '0.03em',
                }}>
                  {pre}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Objectives */}
        <div style={S.section}>
          <span style={S.sectionLabel}>◆ MISSION OBJECTIVES</span>
          {mission.objectives?.map((obj, i) => (
            <div key={i} style={S.listItem}>
              <span style={{
                fontFamily: "'Orbitron', sans-serif", fontSize: '0.55rem',
                color: m.color, background: m.bg, border: `1px solid ${m.color}40`,
                borderRadius: 3, padding: '0.1rem 0.3rem', flexShrink: 0, marginTop: '0.2rem',
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{obj}</span>
            </div>
          ))}
        </div>

        {/* Bonus Objectives */}
        {mission.bonusObjectives?.length > 0 && (
          <div style={{ ...S.section, borderColor: light ? 'rgba(245,158,11,0.2)' : 'rgba(245,158,11,0.15)' }}>
            <span style={{ ...S.sectionLabel, color: '#F59E0B' }}>★ BONUS OBJECTIVES</span>
            {mission.bonusObjectives.map((obj, i) => (
              <div key={i} style={S.listItem}>
                <span style={{ ...S.starBullet, background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)', color: '#F59E0B' }}>★</span>
                <span>{obj}</span>
              </div>
            ))}
          </div>
        )}

        {/* Concepts Covered */}
        {mission.conceptsCovered?.length > 0 && (
          <div style={{ ...S.section, borderColor: light ? 'rgba(96,165,250,0.25)' : 'rgba(96,165,250,0.18)' }}>
            <span style={{ ...S.sectionLabel, color: '#60A5FA' }}>📚 CONCEPTS PRACTICED IN THIS MISSION</span>
            <p style={{ ...S.body, fontSize: '0.78rem', marginBottom: '0.75rem', color: light ? '#1A3050' : '#6090B0' }}>
              These concepts from your Skill Arena subjects are actively used in this build.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {mission.conceptsCovered.map((concept, i) => (
                <span key={i} style={{
                  fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem',
                  color: light ? '#1A3A6A' : '#80B8E8',
                  background: light ? 'rgba(96,165,250,0.1)' : 'rgba(96,165,250,0.08)',
                  border: '1px solid rgba(96,165,250,0.3)',
                  borderRadius: 5, padding: '0.25rem 0.65rem', letterSpacing: '0.03em',
                }}>
                  {concept}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Approach Steps — accordion */}
        {mission.approachSteps?.length > 0 && (
          <div style={{
            ...S.section,
            borderColor: approachOpen
              ? (light ? `${m.color}40` : `${m.color}30`)
              : (light ? 'rgba(100,40,0,0.15)' : 'rgba(255,127,42,0.1)'),
          }}>
            <button
              onClick={() => setApproachOpen(o => !o)}
              style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 0 }}
            >
              <span style={{ ...S.sectionLabel, margin: 0, color: m.color }}>
                ◆ APPROACH GUIDE
                <span style={{
                  fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem',
                  color: light ? '#6B4820' : '#6B5030', marginLeft: '0.75rem', fontWeight: 400,
                }}>
                 
                </span>
              </span>
              {approachOpen
                ? <ChevronUp size={16} color={m.color} />
                : <ChevronDown size={16} color={light ? '#6B4820' : '#6B5030'} />}
            </button>

            {approachOpen && (
              <div style={{ marginTop: '1rem' }}>
                <p style={{ ...S.body, fontSize: '0.78rem', marginBottom: '1rem', color: light ? '#5A3A18' : '#6B5030' }}>
                  High-level steps to get you started. No code — your implementation is your own.
                </p>
                {mission.approachSteps.map((step, i) => (
                  <div key={i} style={{ ...S.listItem, marginBottom: '0.75rem' }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                      background: `${m.color}18`, border: `1.5px solid ${m.color}50`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Orbitron', sans-serif", fontSize: '0.55rem',
                      fontWeight: 700, color: m.color,
                    }}>
                      {i + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Common Mistakes — accordion */}
        {mission.commonMistakes?.length > 0 && (
          <div style={{
            ...S.section,
            borderColor: mistakesOpen
              ? (light ? 'rgba(239,68,68,0.3)' : 'rgba(239,68,68,0.25)')
              : (light ? 'rgba(100,40,0,0.15)' : 'rgba(255,127,42,0.1)'),
            background: mistakesOpen
              ? (light ? 'rgba(255,245,245,0.9)' : 'rgba(20,5,5,0.7)')
              : (light ? 'rgba(252,250,246,0.95)' : 'rgba(13,17,32,0.8)'),
          }}>
            <button
              onClick={() => setMistakesOpen(o => !o)}
              style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 0 }}
            >
              <span style={{ ...S.sectionLabel, margin: 0, color: mistakesOpen ? '#EF4444' : (light ? '#7C3500' : '#FF7F2A') }}>
                ⚠ COMMON MISTAKES
                <span style={{
                  fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem',
                  color: light ? '#6B4820' : '#6B5030', marginLeft: '0.75rem', fontWeight: 400,
                }}>
                
                </span>
              </span>
              {mistakesOpen
                ? <ChevronUp size={16} color="#EF4444" />
                : <ChevronDown size={16} color={light ? '#6B4820' : '#6B5030'} />}
            </button>

            {mistakesOpen && (
              <div style={{ marginTop: '1rem' }}>
                {mission.commonMistakes.map((mistake, i) => (
                  <div key={i} style={{
                    ...S.listItem,
                    background: light ? 'rgba(239,68,68,0.05)' : 'rgba(239,68,68,0.06)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    borderRadius: 6, padding: '0.6rem 0.75rem', marginBottom: '0.5rem',
                  }}>
                    <span style={{ ...S.bullet, background: '#EF4444', marginTop: '0.35rem', flexShrink: 0 }} />
                    <span style={{ color: light ? '#5A1A1A' : '#D08080', fontSize: '0.85rem' }}>{mistake}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Intel / Hints — accordion */}
        {mission.hints?.length > 0 && (
          <div style={{
            ...S.section,
            borderColor: hintsOpen
              ? (light ? 'rgba(96,165,250,0.3)' : 'rgba(96,165,250,0.2)')
              : (light ? 'rgba(100,40,0,0.15)' : 'rgba(255,127,42,0.1)'),
          }}>
            <button
              onClick={() => setHintsOpen(o => !o)}
              style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: 0,
              }}
            >
              <span style={{ ...S.sectionLabel, margin: 0, color: '#60A5FA' }}>
                🔍 HINTS
                <span style={{
                  fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem',
                  color: light ? '#6B4820' : '#6B5020',
                  marginLeft: '0.75rem', fontWeight: 400,
                }}>
                 
                </span>
              </span>
              {hintsOpen
                ? <ChevronUp size={16} color="#60A5FA" />
                : <ChevronDown size={16} color={light ? '#6B4820' : '#6B5020'} />
              }
            </button>

            {hintsOpen && (
              <div style={{ marginTop: '1rem' }}>
                {mission.hints.map((hint, i) => (
                  <div key={i} style={{
                    ...S.listItem,
                    background: 'rgba(96,165,250,0.06)',
                    border: '1px solid rgba(96,165,250,0.15)',
                    borderRadius: 6, padding: '0.6rem 0.75rem', marginBottom: '0.5rem',
                  }}>
                    <span style={{ ...S.bullet, background: '#60A5FA', marginTop: '0.35rem' }} />
                    <span style={{ color: light ? '#2A3A5A' : '#93B4D8', fontSize: '0.85rem' }}>{hint}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bottom nav */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate(-1)} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'none', border: light ? '1px solid rgba(230,80,0,0.3)' : '1px solid rgba(255,127,42,0.2)',
            borderRadius: 8, padding: '0.625rem 1.5rem', cursor: 'pointer',
            color: light ? '#7C3500' : '#FF7F2A',
            fontFamily: "'Share Tech Mono', monospace", fontSize: '0.75rem', letterSpacing: '0.1em',
            transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = light ? 'rgba(100,40,0,0.08)' : 'rgba(255,127,42,0.1)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none' }}
          >
            <ArrowLeft size={14} /> BACK TO MISSION BOARD
          </button>
        </div>
      </div>
    </div>
  )
}

