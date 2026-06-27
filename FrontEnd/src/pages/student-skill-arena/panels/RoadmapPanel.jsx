import { useState, useEffect } from 'react'
import { TEST_DELAY_MS } from '../../../components/loaders/_config'
import DungeonPortalLoader from '../../../components/loaders/DungeonPortalLoader'
import { getRoadmap, getRoadmapStatus, enrollRoadmap, pauseRoadmap, resumeRoadmap } from '../../../api/api'
import { CheckCircle, Trophy, Lock } from 'lucide-react'
import toast from 'react-hot-toast'

// ─── Roadmap Panel (right overlay, shows gates list) ─────
export default function RoadmapPanel({ roadmapId, onClose, onGateClick, navigate, startQuiz }) {
  const [roadmap, setRoadmap]   = useState(null)
  const [status, setStatus]     = useState(null)
  const [loading, setLoading]   = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [pausing, setPausing]     = useState(false)
  const [resuming, setResuming]   = useState(false)

  useEffect(() => {
    setLoading(true); setRoadmap(null)
    Promise.all([
      getRoadmap(roadmapId),
      getRoadmapStatus(roadmapId).catch(() => null),
    ]).then(([r, rs]) => {
      setRoadmap(r.data)
      if (rs) setStatus(rs.data)
    }).finally(() => setTimeout(() => setLoading(false), TEST_DELAY_MS))
  }, [roadmapId])

  const handleEnroll = async (e) => {
    e.stopPropagation()
    setEnrolling(true)
    try {
      await enrollRoadmap(roadmapId)
      setRoadmap(r => ({ ...r, enrolled: true, paused: false }))
      toast.success('⚔️ Path registered!')
    } catch { toast.error('Failed to register') }
    finally { setEnrolling(false) }
  }

  const handlePause = async (e) => {
    e.stopPropagation()
    setPausing(true)
    try {
      await pauseRoadmap(roadmapId)
      setRoadmap(r => ({ ...r, paused: true }))
      toast.success('Hunt paused')
    } catch { toast.error('Failed to pause') }
    finally { setPausing(false) }
  }

  const handleResume = async (e) => {
    e.stopPropagation()
    setResuming(true)
    try {
      await resumeRoadmap(roadmapId)
      setRoadmap(r => ({ ...r, paused: false }))
      toast.success('⚔️ Hunt resumed!')
    } catch { toast.error('Failed to resume') }
    finally { setResuming(false) }
  }

  const pct      = roadmap?.overallPercentage ?? 0
  const subjects = roadmap?.subjects ?? []
  const isEnrolled = roadmap?.enrolled
  const isPaused   = roadmap?.paused

  // Show progress only when enrolled AND not paused
  const showProgress = isEnrolled && !isPaused

  return (
    <div className="sl-subject-panel">
      {/* Header */}
      <div className="sl-subject-panel-header">
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.1em', color: '#9B6ED4' }}>
          [ HUNTER PATH ]
        </span>
        <button className="sl-subject-panel-close" onClick={onClose}>✕</button>
      </div>

      {loading ? (
        <div className="flex-center" style={{ flex: 1 }}><DungeonPortalLoader panel height={180} /></div>
      ) : !roadmap ? null : (
        <div className="sl-subject-panel-body">

          {/* Path header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{ width: 38, height: 38, borderRadius: 8, background: roadmap.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
              {roadmap.icon}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>{roadmap.title}</div>
                <button
                  onClick={() => navigate('/missions?category=role_based')}
                  title="View role-based missions"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                    background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.35)',
                    borderRadius: 4, padding: '0.15rem 0.45rem', cursor: 'pointer',
                    fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem',
                    letterSpacing: '0.06em', color: '#F59E0B',
                    transition: 'all 0.15s', flexShrink: 0,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(245,158,11,0.1)'}
                >
                  ⚔ MISSIONS
                </button>
              </div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: roadmap.color, letterSpacing: '0.06em' }}>{roadmap.roleTarget}</div>
            </div>
            {/* Pause / Resume beside title */}
            {isEnrolled && (
              <button onClick={isPaused ? handleResume : handlePause} disabled={pausing || resuming}
                title={isPaused ? 'Resume Hunt' : 'Pause Hunt'}
                style={{ flexShrink: 0, padding: '0.35rem 0.6rem', background: 'rgba(136,136,136,0.1)', border: '1px solid var(--border)', borderRadius: 6, cursor: (pausing || resuming) ? 'not-allowed' : 'pointer', color: 'var(--text-muted)', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                {(pausing || resuming) ? <span className="loading-spinner" style={{ width: 12, height: 12 }} /> : isPaused ? '▶' : '⏸'}
              </button>
            )}
          </div>

          {/* Progress bar — only when enrolled + active */}
          {showProgress && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '0.3rem' }}>
                <span>{roadmap.completedSubjects ?? 0}/{roadmap.totalSubjects ?? subjects.length} gates cleared</span>
                <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.65rem', color: roadmap.color, fontWeight: 700 }}>{pct}%</span>
              </div>
              <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${roadmap.color}88, ${roadmap.color})`, borderRadius: 3, transition: 'width 0.8s ease' }} />
              </div>
            </div>
          )}

          {/* Action button */}
          {!isEnrolled ? (
            /* Not enrolled → Begin Hunt */
            <button onClick={handleEnroll} disabled={enrolling}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', background: `linear-gradient(135deg, ${roadmap.color}CC, ${roadmap.color})`, border: 'none', borderRadius: 6, padding: '0.5rem', cursor: 'pointer', color: '#fff', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.06em' }}>
              {enrolling ? <span className="loading-spinner" style={{ borderTopColor: '#fff' }} /> : '⚔️'}
              {enrolling ? 'Registering…' : 'Begin Hunt'}
            </button>
          ) : status?.allSubjectsDone ? (
            /* All gates badged → Path Final Test */
            <button onClick={() => startQuiz('roadmap', roadmapId, roadmap?.title ?? 'Path Final Trial', roadmap?.icon)}
              style={{ width: '100%', padding: '0.625rem 0.75rem', background: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(245,158,11,0.08))', border: '1.5px solid rgba(245,158,11,0.5)', borderRadius: 6, cursor: 'pointer', color: '#F59E0B', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.08em', textAlign: 'center', boxShadow: '0 0 12px rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Trophy size={15} /> TAKE PATH FINAL TEST
            </button>
          ) : isEnrolled ? (
            /* Enrolled but gates not all done → locked banner */
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', padding: '0.625rem 0.875rem', background: 'rgba(136,136,136,0.06)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6 }}>
              <Lock size={13} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.05em', lineHeight: 1.6 }}>
                PATH FINAL TEST LOCKED · Earn badges for all {subjects.length} gates to unlock
              </span>
            </div>
          ) : null}

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>GATES</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          {/* Gates list — always visible, but progress hidden when paused/not enrolled */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {subjects.map((s, i) => {
              const p          = showProgress ? (s.percentage ?? 0) : 0
              const hasBadge   = s.hasBadge ?? false
              const allLearned = showProgress && p >= 100
              const gateClosed = allLearned && hasBadge
              const active     = showProgress && p > 0 && !gateClosed
              const borderCol  = gateClosed ? 'rgba(74,222,128,0.2)' : allLearned ? 'rgba(245,158,11,0.3)' : active ? 'rgba(155,110,212,0.2)' : 'var(--border)'
              const accentCol  = gateClosed ? '#4ADE80' : allLearned ? '#F59E0B' : active ? '#9B6ED4' : 'var(--border)'
              return (
                <div key={s.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <div
                    onClick={() => s.totalConcepts > 0 && onGateClick(s.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.5rem 0.625rem',
                      background: 'var(--bg-secondary)',
                      border: `1px solid ${borderCol}`,
                      borderLeft: `3px solid ${accentCol}`,
                      borderRadius: 'var(--radius-sm)',
                      cursor: s.totalConcepts > 0 ? 'pointer' : 'default',
                      opacity: s.totalConcepts > 0 ? 1 : 0.45,
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { if (s.totalConcepts > 0) e.currentTarget.style.borderColor = 'rgba(155,110,212,0.4)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = borderCol }}
                  >
                    <div style={{ width: 22, height: 22, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Orbitron', sans-serif", fontSize: '0.55rem', fontWeight: 700, background: gateClosed ? 'rgba(74,222,128,0.15)' : 'var(--bg-tertiary)', border: `1.5px solid ${gateClosed ? '#4ADE8055' : 'var(--border)'}`, color: gateClosed ? '#4ADE80' : 'var(--text-muted)' }}>
                      {gateClosed ? <CheckCircle size={11} color="#4ADE80" /> : s.totalConcepts > 0 ? i + 1 : <Lock size={10} />}
                    </div>
                    <span style={{ fontSize: '0.875rem', flexShrink: 0 }}>{s.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: '0.8125rem', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.title}</div>
                      {active && !allLearned ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.15rem' }}>
                          <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${p}%`, background: '#9B6ED4', borderRadius: 2 }} />
                          </div>
                          <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.55rem', color: '#9B6ED4', fontWeight: 700 }}>{p}%</span>
                        </div>
                      ) : (
                        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: gateClosed ? '#4ADE80' : allLearned ? '#F59E0B' : 'var(--text-muted)', letterSpacing: '0.03em' }}>
                          {gateClosed ? 'GATE CLOSED' : allLearned ? 'SKILLS LEARNED' : s.totalConcepts > 0 ? `${s.totalConcepts} skills` : 'sealed'}
                        </div>
                      )}
                    </div>
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.06em', padding: '0.1rem 0.35rem', borderRadius: 3, flexShrink: 0, background: gateClosed ? 'rgba(74,222,128,0.1)' : allLearned ? 'rgba(245,158,11,0.1)' : active ? 'rgba(155,110,212,0.1)' : 'rgba(136,136,136,0.07)', color: gateClosed ? '#4ADE80' : allLearned ? '#F59E0B' : active ? '#B48AE8' : '#555' }}>
                      {gateClosed ? 'DONE' : allLearned ? 'TEST' : active ? 'HUNT' : 'Enter'}
                    </span>
                  </div>
                  {/* Final test button for this gate — shown inline when skills learned but no badge */}
                  {allLearned && !hasBadge && (
                    <button
                      onClick={e => { e.stopPropagation(); startQuiz('subject', s.id, s.title, s.icon) }}
                      style={{ width: '100%', padding: '0.35rem 0.625rem', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: '#F59E0B', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.08em', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}
                    >
                      <Trophy size={11} /> TAKE GATE FINAL TEST →
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
