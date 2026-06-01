import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, CheckCircle, PlayCircle, Trophy } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import ProgressBar from '../../components/ProgressBar'
import { getRoadmap, enrollRoadmap, getRoadmapStatus } from '../../api/api'
import toast from 'react-hot-toast'

export default function RoadmapDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [roadmap, setRoadmap] = useState(null)
  const [roadmapStatus, setRoadmapStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)

  useEffect(() => {
    Promise.all([
      getRoadmap(id),
      getRoadmapStatus(id).catch(() => null)
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
    } catch {
      toast.error('Failed to register path')
    } finally {
      setEnrolling(false)
    }
  }

  const getStatus = (pct) => {
    if (pct >= 100) return 'completed'
    if (pct > 0) return 'in-progress'
    return 'locked'
  }

  const getStatusLabel = (pct) => {
    if (pct >= 100) return 'Cleared'
    if (pct > 0) return 'Active Hunt'
    return 'Gate Sealed'
  }

  const getStatusBadgeClass = (pct) => {
    if (pct >= 100) return 'badge-cleared'
    if (pct > 0) return 'badge-hunt'
    return 'badge-sealed'
  }

  if (loading) return (
    <AppLayout>
      <div className="flex-center" style={{ height: '60vh' }}><div className="loading-spinner-lg" /></div>
    </AppLayout>
  )

  if (!roadmap) return null

  return (
    <AppLayout title={roadmap.title}>
      <button className="btn btn-ghost btn-sm mb-3" onClick={() => navigate(-1)}>
        <ArrowLeft size={15} /> Back to Hunter Paths
      </button>

      {/* Header */}
      <div className="card mb-4" style={{ borderTop: `4px solid ${roadmap.color}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 64, height: 64, background: roadmap.color + '22', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
              {roadmap.icon}
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.03em' }}>{roadmap.title}</h1>
              <p className="text-muted text-sm mt-1">{roadmap.description}</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <span className="text-xs text-muted flex items-center gap-1" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem' }}>
                  <Clock size={12} /> {roadmap.totalSubjects} gates to clear
                </span>
              </div>
            </div>
          </div>
          {!roadmap.enrolled && (
            <button className="btn btn-primary" onClick={handleEnroll} disabled={enrolling}
              style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: '0.06em' }}>
              {enrolling ? <span className="loading-spinner" /> : null}
              {enrolling ? 'Registering…' : '⚔️ Begin Hunt'}
            </button>
          )}
          {roadmap.enrolled && (
            <span className="badge badge-cleared" style={{ fontSize: '0.8rem', padding: '0.4rem 0.875rem', fontFamily: "'Share Tech Mono', monospace" }}>
              <CheckCircle size={13} style={{ marginRight: 4 }} /> ACTIVE
            </span>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span className="text-sm text-muted">{roadmap.completedSubjects} of {roadmap.totalSubjects} gates cleared</span>
          <span className="font-semibold text-sm" style={{ color: 'var(--primary)', fontFamily: "'Orbitron', sans-serif", fontSize: '0.75rem' }}>{roadmap.overallPercentage}%</span>
        </div>
        <ProgressBar value={roadmap.overallPercentage} />
      </div>

      {/* All gates cleared banner */}
      {roadmapStatus?.allSubjectsDone && (
        <div className="final-test-banner">
          <div>
            <h3 style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.04em' }}>⚔️ All Gates Cleared!</h3>
            <p style={{ opacity: 0.85, fontSize: '0.8125rem', fontFamily: "'Share Tech Mono', monospace" }}>Path Trial ready (50 trials · 90 min)</p>
          </div>
          <button className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', whiteSpace: 'nowrap', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: '0.05em' }}
            onClick={() => navigate(`/skill-arena/quiz/roadmap/${id}`)}>
            <Trophy size={14} /> Begin Path Trial
          </button>
        </div>
      )}

      {/* Gate flow */}
      <div className="roadmap-flow">
        {roadmap.subjects?.map((s, i) => {
          const status = getStatus(s.percentage)
          const isLast = i === roadmap.subjects.length - 1
          return (
            <div key={s.id} className="roadmap-step">
              <div className="roadmap-step-left">
                <div className={`roadmap-step-number ${status}`}>
                  {s.percentage >= 100 ? <CheckCircle size={20} /> : i + 1}
                </div>
                {!isLast && (
                  <div className={`roadmap-step-connector ${s.percentage >= 100 ? 'completed' : 'default'}`} style={{ flex: 1 }} />
                )}
              </div>

              <div className={`roadmap-step-card ${status}`} style={{ marginBottom: isLast ? 0 : '0' }}>
                <div className="roadmap-step-header">
                  <div className="roadmap-step-icon-title">
                    <span className="roadmap-step-icon">{s.icon}</span>
                    <div>
                      <div className="roadmap-step-title" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>{s.title}</div>
                      <div className="text-xs text-muted" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem' }}>{s.totalConcepts} skills</div>
                    </div>
                  </div>
                  <span className={`badge ${getStatusBadgeClass(s.percentage)}`}
                    style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.08em' }}>
                    {getStatusLabel(s.percentage)}
                  </span>
                </div>

                <div className="roadmap-step-progress">
                  <div className="roadmap-step-progress-text">
                    <span>{s.completedConcepts}/{s.totalConcepts} skills</span>
                    <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.7rem' }}>{s.percentage}%</span>
                  </div>
                  <ProgressBar value={s.percentage} size="sm" />
                </div>

                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button
                    className={`btn btn-sm ${s.percentage > 0 ? 'btn-primary' : 'btn-ghost'}`}
                    style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, letterSpacing: '0.05em' }}
                    onClick={() => navigate(`/skill-arena/dashboard?view=gates&subject=${s.id}`)}
                  >
                    {s.percentage >= 100 ? <><CheckCircle size={13} /> Review</> :
                     s.percentage > 0 ? <><PlayCircle size={13} /> Continue</> :
                     <><PlayCircle size={13} /> Enter Gate</>}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </AppLayout>
  )
}
