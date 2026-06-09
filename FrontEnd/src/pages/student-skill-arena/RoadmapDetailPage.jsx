import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, PlayCircle, Trophy, Zap, Lock } from 'lucide-react'
import { getRoadmap, enrollRoadmap, getRoadmapStatus } from '../../api/api'
import ReportButton from '../../components/ReportButton'
import { getRank } from '../../utils/slRank'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const RANK_COLORS = {
  S: { color: '#EF4444', bg: '#EF444412' },
  A: { color: '#F59E0B', bg: '#F59E0B12' },
  B: { color: '#9B6ED4', bg: '#9B6ED412' },
  C: { color: '#60A5FA', bg: '#60A5FA12' },
  D: { color: '#4ADE80', bg: '#4ADE8012' },
  E: { color: '#888888', bg: '#88888812' },
}
const subjectRank = (s) => {
  const r = RANK_COLORS[s?.rank] || RANK_COLORS['E']
  return { label: s?.rank || 'E', ...r }
}

export default function RoadmapDetailPage() {
  const { id }       = useParams()
  const navigate     = useNavigate()
  const { user }     = useAuth()
  const [roadmap, setRoadmap]         = useState(null)
  const [roadmapStatus, setRoadmapStatus] = useState(null)
  const [loading, setLoading]         = useState(true)
  const [enrolling, setEnrolling]     = useState(false)

  const xp       = user?.xp ?? 0
  const rank     = getRank(xp)
  const initials = user?.fullName?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  useEffect(() => {
    Promise.all([
      getRoadmap(id),
      getRoadmapStatus(id).catch(() => null),
    ])
      .then(([r, rs]) => {
        setRoadmap(r.data)
        if (rs) setRoadmapStatus(rs.data)
      })
      .catch(() => toast.error('Failed to load hunter path'))
      .finally(() => setLoading(false))
  }, [id])

  const handleEnroll = async () => {
    setEnrolling(true)
    try {
      await enrollRoadmap(id)
      setRoadmap(r => ({ ...r, enrolled: true }))
      toast.success('⚔️ Path registered! Your hunt begins.')
    } catch { toast.error('Failed to register path') }
    finally { setEnrolling(false) }
  }

  // ── Loading ──────────────────────────────────────────
  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 56, background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 1.5rem' }}>
        <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '1.1rem', color: '#B48AE8', letterSpacing: '0.12em' }}>ARISE</span>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loading-spinner-lg" />
      </div>
    </div>
  )

  if (!roadmap) return null

  const pct              = roadmap.overallPercentage ?? 0
  const completedGates   = roadmap.completedSubjects ?? 0
  const totalGates       = roadmap.totalSubjects ?? roadmap.subjects?.length ?? 0
  const subjects         = roadmap.subjects ?? []

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', fontFamily: "'Rajdhani', sans-serif" }}>

      {/* ── Top bar ── */}
      <header style={{
        height: 56, flexShrink: 0,
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center',
        padding: '0 1.5rem', gap: '1rem',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <button
          onClick={() => navigate('/skill-arena/dashboard?view=paths')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-muted)', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem', letterSpacing: '0.06em' }}
        >
          <ArrowLeft size={14} /> PATHS
        </button>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: 0 }}>
          <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{roadmap.icon}</span>
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '1rem', letterSpacing: '0.04em', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {roadmap.title}
          </span>
          {roadmap.enrolled && (
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: '#4ADE80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 3, padding: '0.1rem 0.4rem', letterSpacing: '0.1em', flexShrink: 0 }}>
              ACTIVE
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          <span className={`rank-badge ${rank.cls}`} style={{ fontSize: '0.68rem' }}>{rank.label}</span>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: user?.avatarColor || '#9B6ED4', border: `2px solid ${rank.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem', color: '#fff' }}>
            {initials}
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <div style={{ flex: 1, overflow: 'auto', padding: '1.25rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* ── Hero card ── */}
          <div style={{
            background: 'var(--bg-card)',
            border: `1px solid ${roadmap.color}40`,
            borderTop: `4px solid ${roadmap.color}`,
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap',
          }}>
            {/* Icon */}
            <div style={{ width: 72, height: 72, borderRadius: 'var(--radius-lg)', background: roadmap.color + '18', border: `1px solid ${roadmap.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.25rem', flexShrink: 0 }}>
              {roadmap.icon}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.03em', color: 'var(--text-primary)', margin: 0 }}>{roadmap.title}</h1>
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: roadmap.color, background: roadmap.color + '18', border: `1px solid ${roadmap.color}30`, borderRadius: 3, padding: '0.15rem 0.5rem', letterSpacing: '0.08em' }}>
                  {roadmap.roleTarget}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 1rem' }}>{roadmap.description}</p>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '0.875rem' }}>
                {[
                  { label: 'GATES', value: totalGates },
                  { label: 'CLEARED', value: completedGates },
                  { label: 'WEEKS', value: roadmap.estimatedWeeks ?? '?' },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${roadmap.color}88, ${roadmap.color})`, borderRadius: 4, transition: 'width 1s ease' }} />
                </div>
                <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.85rem', fontWeight: 700, color: roadmap.color, minWidth: 40, textAlign: 'right' }}>{pct}%</span>
              </div>
            </div>

            {/* Enroll / action */}
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
              {!roadmap.enrolled ? (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: `linear-gradient(135deg, ${roadmap.color}CC, ${roadmap.color})`, border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', cursor: enrolling ? 'not-allowed' : 'pointer', color: '#fff', fontFamily: "'Rajdhani', sans-serif", fontWeight: 800, fontSize: '0.9375rem', letterSpacing: '0.06em', opacity: enrolling ? 0.7 : 1 }}
                >
                  {enrolling ? <span className="loading-spinner" style={{ borderTopColor: '#fff' }} /> : '⚔️'}
                  {enrolling ? 'Registering…' : 'Begin Hunt'}
                </button>
              ) : (
                roadmapStatus?.allSubjectsDone && (
                  <button
                    onClick={() => navigate(`/skill-arena/quiz/roadmap/${id}`)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #F59E0B, #FBBF24)', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', cursor: 'pointer', color: '#1A0F00', fontFamily: "'Rajdhani', sans-serif", fontWeight: 800, fontSize: '0.9375rem', letterSpacing: '0.06em' }}
                  >
                    <Trophy size={16} /> Path Trial
                  </button>
                )
              )}
            </div>
          </div>

          {/* ── All cleared banner ── */}
          {roadmapStatus?.allSubjectsDone && (
            <div style={{ padding: '1rem 1.25rem', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', borderLeft: '4px solid #F59E0B', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.875rem', flexWrap: 'wrap' }}>
              <Trophy size={20} color="#F59E0B" style={{ flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '1rem', letterSpacing: '0.04em', color: '#F59E0B' }}>All Gates Cleared!</div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 2 }}>Path Trial available · 50 trials · 90 min</div>
              </div>
              <button onClick={() => navigate(`/skill-arena/quiz/roadmap/${id}`)}
                style={{ background: '#F59E0B', border: 'none', borderRadius: 6, padding: '0.5rem 1.25rem', cursor: 'pointer', color: '#1A0F00', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.05em', flexShrink: 0 }}>
                Begin Path Trial
              </button>
            </div>
          )}

          {/* ── Gate list ── */}
          <div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.14em', marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              DUNGEON GATES
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {subjects.map((s, i) => {
                const p       = s.percentage ?? 0
                const cleared = p >= 100
                const active  = p > 0 && p < 100
                const sealed  = p === 0
                const sr      = subjectRank(s)

                return (
                  <div
                    key={s.id}
                    style={{
                      background: 'var(--bg-card)',
                      border: `1px solid ${cleared ? 'rgba(74,222,128,0.2)' : active ? 'rgba(155,110,212,0.2)' : 'var(--border)'}`,
                      borderLeft: `4px solid ${cleared ? '#4ADE80' : active ? '#9B6ED4' : 'var(--border)'}`,
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem 1.25rem',
                      display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
                      opacity: sealed && !roadmap.enrolled ? 0.6 : 1,
                      transition: 'border-color 0.2s',
                    }}
                  >
                    {/* Step number / check */}
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: cleared ? 'rgba(74,222,128,0.15)' : active ? 'rgba(155,110,212,0.15)' : 'rgba(255,255,255,0.05)',
                      border: `1.5px solid ${cleared ? '#4ADE8055' : active ? '#9B6ED455' : 'var(--border)'}`,
                      fontFamily: "'Orbitron', sans-serif", fontSize: '0.7rem', fontWeight: 700,
                      color: cleared ? '#4ADE80' : active ? '#9B6ED4' : 'var(--text-muted)',
                    }}>
                      {cleared ? <CheckCircle size={16} color="#4ADE80" /> : sealed ? <Lock size={14} color="var(--text-muted)" /> : i + 1}
                    </div>

                    {/* Icon */}
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: sr.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
                      {s.icon}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{s.title}</span>
                        <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.55rem', fontWeight: 700, color: sr.color, background: sr.bg, border: `1px solid ${sr.color}30`, borderRadius: 3, padding: '0.1rem 0.35rem', letterSpacing: '0.06em' }}>
                          {sr.label}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                          {s.completedConcepts ?? 0}/{s.totalConcepts} skills
                        </span>
                        {active && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, maxWidth: 200 }}>
                            <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${p}%`, background: 'linear-gradient(90deg, #7B5EA7, #9B6ED4)', borderRadius: 2 }} />
                            </div>
                            <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.65rem', fontWeight: 700, color: '#9B6ED4', flexShrink: 0 }}>{p}%</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status badge */}
                    <span style={{
                      fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.08em',
                      padding: '0.2rem 0.625rem', borderRadius: 3, flexShrink: 0,
                      background: cleared ? 'rgba(74,222,128,0.1)' : active ? 'rgba(155,110,212,0.1)' : 'rgba(136,136,136,0.08)',
                      color: cleared ? '#4ADE80' : active ? '#B48AE8' : '#555',
                      border: `1px solid ${cleared ? 'rgba(74,222,128,0.2)' : active ? 'rgba(155,110,212,0.2)' : 'rgba(136,136,136,0.12)'}`,
                    }}>
                      {cleared ? 'CLEARED' : active ? 'ACTIVE HUNT' : 'GATE SEALED'}
                    </span>

                    {/* Action button */}
                    <button
                      onClick={() => navigate(`/skill-arena/dashboard?view=gates&subject=${s.id}`)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.375rem',
                        background: cleared ? 'rgba(74,222,128,0.1)' : active ? 'linear-gradient(135deg, #7B5EA7, #9B6ED4)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${cleared ? 'rgba(74,222,128,0.2)' : active ? 'transparent' : 'var(--border)'}`,
                        borderRadius: 6, padding: '0.4rem 0.875rem', cursor: 'pointer',
                        color: cleared ? '#4ADE80' : active ? '#fff' : 'var(--text-muted)',
                        fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.05em',
                        flexShrink: 0, transition: 'all 0.15s',
                      }}
                    >
                      {cleared
                        ? <><CheckCircle size={12} /> Review</>
                        : active
                        ? <><PlayCircle size={12} /> Continue</>
                        : <><Zap size={12} /> Enter Gate</>}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
      <ReportButton variant="floating" pageTitle={`Hunter Path — ${roadmap?.title || ''}`} />
    </div>
  )
}
