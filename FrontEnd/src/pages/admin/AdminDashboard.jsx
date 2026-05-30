import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, BookOpen, Layers, Map, TrendingUp } from 'lucide-react'
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
    { icon: <Users size={22} />, label: 'Total Users', value: stats?.totalUsers ?? 0, bg: '#EEF2FF', color: '#4F46E5', link: '/admin/users' },
    { icon: <BookOpen size={22} />, label: 'Subjects', value: stats?.totalSubjects ?? 0, bg: '#D1FAE5', color: '#059669', link: '/admin/subjects' },
    { icon: <Layers size={22} />, label: 'Concepts', value: stats?.totalConcepts ?? 0, bg: '#FEF3C7', color: '#D97706', link: '/admin/concepts' },
    { icon: <Map size={22} />, label: 'Roadmaps', value: stats?.totalRoadmaps ?? 0, bg: '#F3E8FF', color: '#7C3AED', link: '/admin/roadmaps' },
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
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/admin/users')}>View All</button>
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
                    <td><span className={`badge ${u.role === 'ADMIN' ? 'badge-admin' : 'badge-student'}`}>{u.role}</span></td>
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

      {/* Quick actions */}
      <div style={{ marginTop: '2rem' }}>
        <h2 className="font-bold mb-2" style={{ fontSize: '1rem' }}>Quick Actions</h2>
        <div className="flex" style={{ gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={() => navigate('/admin/subjects')}>
            <BookOpen size={15} /> Manage Subjects
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/admin/concepts')}>
            <Layers size={15} /> Manage Concepts
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/admin/roadmaps')}>
            <Map size={15} /> Manage Roadmaps
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/admin/users')}>
            <Users size={15} /> Manage Users
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
