import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, BookOpen, Layers, Map, TrendingUp, Swords, Code2, HelpCircle, Flag } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import { getAdminStats } from '../../api/api'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getAdminStats()
      .then(r => setStats(r.data))
      .catch(() => toast.error('Failed to load stats'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <AppLayout title="Admin Overview">
      <div className="flex-center" style={{ height: '60vh' }}><div className="loading-spinner-lg" /></div>
    </AppLayout>
  )

  const cards = [
    { icon: <Users size={22} />,      label: 'Total Users',          value: stats?.totalUsers ?? 0,     bg: '#EEF2FF', color: '#4F46E5', link: '/admin-skill-arena/users' },
    { icon: <TrendingUp size={22} />, label: 'Registered Students',  value: stats?.totalStudents ?? 0,  bg: '#D1FAE5', color: '#059669', link: '/admin-skill-arena/users' },
    { icon: <Users size={22} />,      label: 'Guest Visits',         value: stats?.totalGuests ?? 0,    bg: '#FEF9C3', color: '#CA8A04', link: '/admin-skill-arena/users' },
    { icon: <BookOpen size={22} />,   label: 'Subjects',             value: stats?.totalSubjects ?? 0,  bg: '#F3E8FF', color: '#7C3AED', link: '/admin-skill-arena/subjects' },
    { icon: <Layers size={22} />,     label: 'Concepts',             value: stats?.totalConcepts ?? 0,  bg: '#FEF3C7', color: '#D97706', link: '/admin-skill-arena/concepts' },
    { icon: <HelpCircle size={22} />, label: 'Questions',            value: stats?.totalQuestions ?? 0, bg: '#ECFDF5', color: '#059669', link: '/admin-skill-arena/questions' },
    { icon: <Map size={22} />,        label: 'Roadmaps',             value: stats?.totalRoadmaps ?? 0,  bg: '#DBEAFE', color: '#1D4ED8', link: '/admin-skill-arena/roadmaps' },
    { icon: <Swords size={22} />,     label: 'Missions',             value: stats?.totalMissions ?? 0,  bg: '#FFF7ED', color: '#EA580C', link: '/admin-skill-arena/missions' },
    { icon: <Code2 size={22} />,      label: 'Problems',             value: stats?.totalProblems ?? 0,  bg: '#F0FDF4', color: '#16A34A', link: '/admin-skill-arena/problems' },
    { icon: <Flag size={22} />,       label: 'Open Reports',         value: stats?.totalReports ?? 0,   bg: '#FEF2F2', color: '#DC2626', link: '/admin-skill-arena/reports' },
  ]

  return (
    <AppLayout title="Admin Overview">
      <div className="page-header">
        <div>
          <h1 className="page-title">Platform Overview</h1>
          <p className="page-subtitle">Monitor and manage your learning platform</p>
        </div>
      </div>

      <div className="stats-grid">
        {cards.map(c => (
          <div key={c.label} className="stat-card card-hover" style={{ cursor: 'pointer' }} onClick={() => navigate(c.link)}>
            <div className="stat-icon" style={{ background: c.bg, color: c.color }}>{c.icon}</div>
            <div className="stat-info">
              <div className="stat-value" style={{ color: c.color }}>{c.value}</div>
              <div className="stat-label">{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        {/* Recent Users */}
        <div>
          <div className="flex-between mb-2">
            <h2 className="font-bold" style={{ fontSize: '1rem' }}>Recent Registrations</h2>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/admin-skill-arena/users')}>View All</button>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentUsers?.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div className="table-name">{u.fullName}</div>
                      <div className="text-xs text-muted">{u.email}</div>
                    </td>
                    <td>
                      <span className={`badge ${u.role === 'ADMIN' ? 'badge-admin' : u.role === 'GUEST' ? 'badge-warning' : 'badge-student'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="text-muted text-sm">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Subjects */}
        <div>
          <div className="flex-between mb-2">
            <h2 className="font-bold" style={{ fontSize: '1rem' }}>Top Subjects by Completion</h2>
          </div>
          {stats?.topSubjects?.length ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {stats.topSubjects.map((s, i) => (
                <div key={s.subjectId} className="card" style={{ padding: '0.875rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <div style={{ width: 28, height: 28, background: 'var(--primary-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary)', flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: '1.25rem' }}>{s.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="text-sm font-semibold truncate">{s.title}</div>
                  </div>
                  <span className="badge badge-primary">{s.completionCount} completions</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <p className="text-muted text-sm">No completion data yet</p>
            </div>
          )}
        </div>
      </div>

    </AppLayout>
  )
}
