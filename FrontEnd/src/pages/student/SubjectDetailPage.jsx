import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Clock, CheckCircle, Circle, ArrowLeft } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import ProgressBar from '../../components/ProgressBar'
import { getSubject } from '../../api/api'
import toast from 'react-hot-toast'

export default function SubjectDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [subject, setSubject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSubject(id)
      .then(r => setSubject(r.data))
      .catch(() => toast.error('Failed to load subject'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <AppLayout>
      <div className="flex-center" style={{ height: '60vh' }}><div className="loading-spinner-lg" /></div>
    </AppLayout>
  )

  if (!subject) return null

  const pct = subject.totalConcepts > 0 ? Math.round((subject.completedCount / subject.totalConcepts) * 100) : 0

  return (
    <AppLayout title={subject.title}>
      <button className="btn btn-ghost btn-sm mb-3" onClick={() => navigate(-1)}>
        <ArrowLeft size={15} /> Back
      </button>

      <div className="card mb-3">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-lg)', background: subject.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
            {subject.icon}
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{subject.title}</h1>
            <p className="text-muted text-sm mt-1">{subject.description}</p>
          </div>
        </div>
        <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
          <span className="text-sm text-muted">{subject.completedCount} of {subject.totalConcepts} concepts completed</span>
          <span className="font-semibold" style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>{pct}%</span>
        </div>
        <ProgressBar value={pct} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {subject.concepts?.map((c, i) => (
          <div
            key={c.id}
            className="card card-hover"
            style={{ cursor: 'pointer', padding: '1rem 1.5rem', borderLeft: c.completed ? '4px solid var(--success)' : '4px solid var(--border)', transition: 'all 0.2s ease' }}
            onClick={() => navigate(`/concepts/${c.id}`)}
          >
            <div className="flex-between">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', minWidth: 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: c.completed ? 'var(--success)' : 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {c.completed
                    ? <CheckCircle size={16} color="#fff" />
                    : <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>{i + 1}</span>
                  }
                </div>
                <div style={{ minWidth: 0 }}>
                  <div className="font-semibold text-sm">{c.title}</div>
                  {c.whatItIs && <div className="text-xs text-muted truncate" style={{ maxWidth: 400 }}>{c.whatItIs.substring(0, 80)}…</div>}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                <span className="text-xs text-muted flex" style={{ alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={12} /> {c.estimatedMinutes}m
                </span>
                <span className={`badge ${c.completed ? 'badge-success' : 'badge-neutral'}`}>
                  {c.completed ? 'Done' : 'Start'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
