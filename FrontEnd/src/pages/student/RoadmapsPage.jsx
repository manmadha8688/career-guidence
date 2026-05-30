import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, BookOpen, CheckCircle, Trophy } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import { getRoadmaps, enrollRoadmap } from '../../api/api'
import toast from 'react-hot-toast'

export default function RoadmapsPage() {
  const [roadmaps, setRoadmaps] = useState([])
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    getRoadmaps()
      .then(r => setRoadmaps(r.data))
      .catch(() => toast.error('Failed to load roadmaps'))
      .finally(() => setLoading(false))
  }, [])

  const handleEnroll = async (e, id) => {
    e.stopPropagation()
    setEnrolling(p => ({ ...p, [id]: true }))
    try {
      await enrollRoadmap(id)
      setRoadmaps(rs => rs.map(r => r.id === id ? { ...r, enrolled: true } : r))
      toast.success('Enrolled! Start your journey 🚀')
    } catch {
      toast.error('Failed to enroll')
    } finally {
      setEnrolling(p => ({ ...p, [id]: false }))
    }
  }

  const handleFinalTest = (e) => {
    e.stopPropagation()
    toast('Complete all subjects in this roadmap to unlock the Final Test', {
      icon: '🔒',
      duration: 3000,
    })
  }

  return (
    <AppLayout title="Roadmaps">
      <div className="page-header">
        <div>
          <h1 className="page-title">Career Roadmaps</h1>
          <p className="page-subtitle">Choose your career path and follow a structured learning journey</p>
        </div>
      </div>

      {loading ? (
        <div className="flex-center" style={{ height: '40vh' }}><div className="loading-spinner-lg" /></div>
      ) : (
        <div className="grid-auto">
          {roadmaps.map(r => (
            <div key={r.id} className="card card-hover" style={{ cursor: 'pointer', borderTop: `4px solid ${r.color}` }}
              onClick={() => navigate(`/roadmaps/${r.id}`)}>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1rem' }}>
                <div style={{ width: 52, height: 52, background: r.color + '22', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                  {r.icon}
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{r.title}</h3>
                  <span className="badge badge-primary" style={{ fontSize: '0.7rem', marginTop: 4 }}>{r.roleTarget}</span>
                </div>
              </div>

              <p className="text-sm text-muted mb-2" style={{ lineHeight: 1.6 }}>{r.description}</p>

              <div className="flex" style={{ gap: '1.25rem', marginBottom: '1.25rem' }}>
                <span className="text-xs text-muted flex items-center gap-1">
                  <Clock size={12} /> {r.estimatedWeeks} weeks
                </span>
                <span className="text-xs text-muted flex items-center gap-1">
                  <BookOpen size={12} /> {r.subjectCount} subjects
                </span>
              </div>

              {/* Enroll / enrolled row */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.625rem' }} onClick={e => e.stopPropagation()}>
                {r.enrolled ? (
                  <>
                    <span className="badge badge-success" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
                      <CheckCircle size={12} style={{ marginRight: 4 }} /> Enrolled
                    </span>
                    <button className="btn btn-ghost btn-sm" onClick={e => { e.stopPropagation(); navigate(`/roadmaps/${r.id}`) }}>
                      View Path
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-primary btn-sm w-full"
                    style={{ justifyContent: 'center' }}
                    onClick={e => handleEnroll(e, r.id)}
                    disabled={enrolling[r.id]}
                  >
                    {enrolling[r.id] ? <span className="loading-spinner" /> : null}
                    {enrolling[r.id] ? 'Enrolling…' : 'Enroll & Start'}
                  </button>
                )}
              </div>

              {/* Final Test button — always visible, locked until all subjects done */}
              <div onClick={e => e.stopPropagation()}>
                <button
                  className="btn btn-sm w-full"
                  style={{
                    justifyContent: 'center',
                    background: 'transparent',
                    color: 'var(--text-muted)',
                    border: '1.5px dashed var(--border)',
                    fontWeight: 500,
                    cursor: 'not-allowed',
                  }}
                  onClick={handleFinalTest}
                >
                  <Trophy size={14} /> Final Test — Coming Soon
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </AppLayout>
  )
}
