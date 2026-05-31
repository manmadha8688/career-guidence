import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Clock, CheckCircle, ArrowLeft, Brain, Trophy, Search } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import ProgressBar from '../../components/ProgressBar'
import { getSubject, getSubjectStatus } from '../../api/api'
import toast from 'react-hot-toast'

export default function SubjectDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [subject, setSubject] = useState(null)
  const [subjectStatus, setSubjectStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    Promise.all([
      getSubject(id),
      getSubjectStatus(id).catch(() => null)
    ])
      .then(([s, st]) => {
        setSubject(s.data)
        if (st) setSubjectStatus(st.data)
      })
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)}>
          <ArrowLeft size={15} /> Back
        </button>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '0.7rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <input
            className="form-input"
            style={{ paddingLeft: '2.1rem', width: 220, fontSize: '0.875rem' }}
            placeholder="Filter concepts…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

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

      {/* Subject test banner — always shown when subject has concepts */}
      {subject.totalConcepts > 0 && (
        subjectStatus?.hasBadge ? (
          <div className="badge-earned-banner" style={{ marginBottom: '1.25rem' }}>
            <Trophy size={24} />
            <div>
              <div className="font-semibold">Subject Badge Earned!</div>
              <div className="text-sm" style={{ opacity: 0.85 }}>
                Score: {subjectStatus.badgeScore}/{subjectStatus.badgeTotal} · {Math.round(subjectStatus.badgeScore / subjectStatus.badgeTotal * 100)}%
              </div>
            </div>
            <button
              className="btn btn-sm"
              style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.2)', color: 'white' }}
              onClick={() => navigate(`/quiz/subject/${id}`)}
            >
              Retake
            </button>
          </div>
        ) : (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '0.75rem',
            padding: '1rem 1.25rem', marginBottom: '1.25rem',
            background: 'var(--bg-card)', border: '1.5px solid var(--primary)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Brain size={20} color="var(--primary)" />
              <div>
                <div className="font-semibold text-sm">Subject Test</div>
                <div className="text-xs text-muted">25 questions · Pass 19/25 to earn badge</div>
              </div>
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate(`/quiz/subject/${id}`)}
            >
              <Brain size={14} />
              {subjectStatus?.attemptCount > 0
                ? `Retry Test · Best ${subjectStatus.bestScore}/25`
                : 'Take Subject Test →'}
            </button>
          </div>
        )
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {subject.concepts?.filter(c => c.title.toLowerCase().includes(search.toLowerCase())).length === 0 && search ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <div className="empty-state-text">No concepts match "{search}"</div>
          </div>
        ) : null}
        {subject.concepts?.filter(c => c.title.toLowerCase().includes(search.toLowerCase())).map((c, i) => (
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
