import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, CheckCircle, TrendingUp, Flame, ArrowRight, Map } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import ProgressBar from '../../components/ProgressBar'
import { getProgressSummary, getEnrolledRoadmaps } from '../../api/api'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [summary, setSummary] = useState(null)
  const [enrolled, setEnrolled] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getProgressSummary(), getEnrolledRoadmaps()])
      .then(([s, r]) => { setSummary(s.data); setEnrolled(r.data) })
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false))
  }, [])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const initials = user?.fullName?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  if (loading) return (
    <AppLayout title="Dashboard">
      <div className="flex-center" style={{ height: '60vh' }}>
        <div className="loading-spinner-lg" />
      </div>
    </AppLayout>
  )

  const stats = [
    { icon: '📚', label: 'Total Concepts', value: summary?.totalConcepts ?? 0, bg: '#EEF2FF', color: '#4F46E5' },
    { icon: '✅', label: 'Completed', value: summary?.completedConcepts ?? 0, bg: '#D1FAE5', color: '#059669' },
    { icon: '📈', label: 'Progress', value: `${summary?.percentage ?? 0}%`, bg: '#FEF3C7', color: '#D97706' },
    { icon: '🔥', label: 'Day Streak', value: summary?.streak ?? 0, bg: '#FEE2E2', color: '#DC2626' },
  ]

  return (
    <AppLayout title="Dashboard">
      {/* Welcome */}
      <div className="welcome-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="welcome-title">{greeting}, {user?.fullName?.split(' ')[0]}! 👋</div>
            <div className="welcome-subtitle">
              {summary?.completedConcepts > 0
                ? `You've completed ${summary.completedConcepts} concepts — keep it up!`
                : 'Start your learning journey today. Pick a roadmap or explore subjects!'}
            </div>
          </div>
          <div className="navbar-avatar" style={{ width: 56, height: 56, fontSize: '1.25rem', background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.4)' }}>
            {initials}
          </div>
        </div>
        {summary && summary.totalConcepts > 0 && (
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', opacity: 0.85, marginBottom: '0.5rem' }}>
              <span>Overall progress</span>
              <span>{summary.percentage}%</span>
            </div>
            <ProgressBar value={summary.percentage} />
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {stats.map(s => (
          <div className="stat-card" key={s.label}>
            <div className="stat-icon" style={{ background: s.bg }}>
              <span>{s.icon}</span>
            </div>
            <div className="stat-info">
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        {/* Enrolled Roadmaps */}
        <div>
          <div className="flex-between mb-2">
            <h2 className="font-bold" style={{ fontSize: '1rem' }}>My Roadmaps</h2>
            <Link to="/roadmaps" className="btn btn-ghost btn-sm">Browse <ArrowRight size={13} /></Link>
          </div>
          {enrolled.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🗺️</div>
              <div className="text-secondary font-semibold mb-1">No roadmaps yet</div>
              <p className="text-muted text-sm mb-2">Enroll in a career roadmap to start your structured journey</p>
              <Link to="/roadmaps" className="btn btn-primary btn-sm">Explore Roadmaps</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {enrolled.map(r => (
                <div key={r.id} className="card card-hover" style={{ cursor: 'pointer' }} onClick={() => navigate(`/roadmaps/${r.id}`)}>
                  <div className="flex-between mb-1">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{r.icon}</span>
                      <div>
                        <div className="font-semibold text-sm">{r.title}</div>
                        <div className="text-xs text-muted">{r.totalSubjects} subjects</div>
                      </div>
                    </div>
                    <span className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>{r.overallPercentage}%</span>
                  </div>
                  <ProgressBar value={r.overallPercentage} size="sm" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subject Progress */}
        <div>
          <div className="flex-between mb-2">
            <h2 className="font-bold" style={{ fontSize: '1rem' }}>Subject Progress</h2>
            <Link to="/subjects" className="btn btn-ghost btn-sm">All Subjects <ArrowRight size={13} /></Link>
          </div>
          {!summary?.subjectProgress?.length ? (
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📚</div>
              <div className="text-secondary font-semibold mb-1">Start learning</div>
              <p className="text-muted text-sm mb-2">Complete concepts to track subject progress</p>
              <Link to="/subjects" className="btn btn-primary btn-sm">Browse Subjects</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {summary.subjectProgress.slice(0, 5).map(sp => (
                <div key={sp.subjectId} className="card card-hover" style={{ cursor: 'pointer', padding: '1rem 1.25rem' }}
                  onClick={() => navigate(`/subjects/${sp.subjectId}`)}>
                  <div className="flex-between mb-1">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>{sp.icon}</span>
                      <span className="text-sm font-semibold truncate">{sp.title}</span>
                    </div>
                    <span className="text-xs text-muted">{sp.completed}/{sp.total}</span>
                  </div>
                  <ProgressBar value={sp.percentage} size="sm" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
