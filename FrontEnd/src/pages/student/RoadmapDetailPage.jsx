import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, CheckCircle, PlayCircle, Lock } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import ProgressBar from '../../components/ProgressBar'
import { getRoadmap, enrollRoadmap } from '../../api/api'
import toast from 'react-hot-toast'

export default function RoadmapDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [roadmap, setRoadmap] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)

  useEffect(() => {
    getRoadmap(id)
      .then(r => setRoadmap(r.data))
      .catch(() => toast.error('Failed to load roadmap'))
      .finally(() => setLoading(false))
  }, [id])

  const handleEnroll = async () => {
    setEnrolling(true)
    try {
      await enrollRoadmap(id)
      setRoadmap(r => ({ ...r, enrolled: true }))
      toast.success('Enrolled successfully! 🎉')
    } catch {
      toast.error('Failed to enroll')
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
    if (pct >= 100) return 'Completed'
    if (pct > 0) return 'In Progress'
    return 'Not Started'
  }

  const getStatusBadgeClass = (pct) => {
    if (pct >= 100) return 'badge-success'
    if (pct > 0) return 'badge-info'
    return 'badge-neutral'
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
        <ArrowLeft size={15} /> Back to Roadmaps
      </button>

      {/* Header */}
      <div className="card mb-4" style={{ borderTop: `4px solid ${roadmap.color}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 64, height: 64, background: roadmap.color + '22', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
              {roadmap.icon}
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{roadmap.title}</h1>
              <p className="text-muted text-sm mt-1">{roadmap.description}</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <span className="text-xs text-muted flex items-center gap-1"><Clock size={12} /> {roadmap.totalSubjects} subjects to master</span>
              </div>
            </div>
          </div>
          {!roadmap.enrolled && (
            <button className="btn btn-primary" onClick={handleEnroll} disabled={enrolling}>
              {enrolling ? <span className="loading-spinner" /> : null}
              {enrolling ? 'Enrolling…' : 'Enroll Now'}
            </button>
          )}
          {roadmap.enrolled && <span className="badge badge-success" style={{ fontSize: '0.875rem', padding: '0.4rem 0.875rem' }}><CheckCircle size={13} style={{ marginRight: 4 }} /> Enrolled</span>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span className="text-sm text-muted">{roadmap.completedSubjects} of {roadmap.totalSubjects} subjects completed</span>
          <span className="font-semibold text-sm" style={{ color: 'var(--primary)' }}>{roadmap.overallPercentage}%</span>
        </div>
        <ProgressBar value={roadmap.overallPercentage} />
      </div>

      {/* Visual roadmap flow */}
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
                      <div className="roadmap-step-title">{s.title}</div>
                      <div className="text-xs text-muted">{s.totalConcepts} concepts</div>
                    </div>
                  </div>
                  <span className={`roadmap-step-status badge ${getStatusBadgeClass(s.percentage)}`}>
                    {getStatusLabel(s.percentage)}
                  </span>
                </div>

                <div className="roadmap-step-progress">
                  <div className="roadmap-step-progress-text">
                    <span>{s.completedConcepts}/{s.totalConcepts} completed</span>
                    <span>{s.percentage}%</span>
                  </div>
                  <ProgressBar value={s.percentage} size="sm" />
                </div>

                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button
                    className={`btn btn-sm ${s.percentage > 0 ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => navigate(`/subjects/${s.id}`)}
                  >
                    {s.percentage >= 100 ? <><CheckCircle size={13} /> Review</> :
                     s.percentage > 0 ? <><PlayCircle size={13} /> Continue</> :
                     <><PlayCircle size={13} /> Start</>}
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
