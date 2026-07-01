import { useState, useEffect } from 'react'
import { TEST_DELAY_MS } from '../../components/loaders/_config'
import { useNavigate } from 'react-router-dom'
import {
  Users, BookOpen, Layers, Map, TrendingUp, Swords, Code2, HelpCircle,
  Flag, Briefcase, Plus, MessageSquare, AlertCircle,
} from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import { getAdminStats } from '../../api/api'
import toast from 'react-hot-toast'
import AdminSkeleton from '../../components/loaders/AdminSkeleton'

const QUICK_ACTIONS = [
  { label: 'New Subject',  icon: BookOpen,   path: '/admin-skill-arena/subjects',  accent: '#7C3AED' },
  { label: 'New Concept',  icon: Layers,     path: '/admin-skill-arena/concepts',  accent: '#D97706' },
  { label: 'New Mission',  icon: Swords,     path: '/admin-skill-arena/missions', accent: '#EA580C' },
  { label: 'View Reports', icon: Flag,       path: '/admin-skill-arena/reports', accent: '#DC2626' },
  { label: 'Feedbacks',    icon: MessageSquare, path: '/admin-skill-arena/feedbacks', accent: '#4F46E5' },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getAdminStats()
      .then(r => setStats(r.data))
      .catch(() => toast.error('Could not load dashboard stats. Please refresh.'))
      .finally(() => setTimeout(() => setLoading(false), TEST_DELAY_MS))
  }, [])

  if (loading) {
    return (
      <AppLayout title="Admin Overview">
        <AdminSkeleton rows={5} />
      </AppLayout>
    )
  }

  const cards = [
    { icon: Users,      label: 'Total Users',          value: stats?.totalUsers ?? 0,     bg: '#EEF2FF', color: '#4F46E5', link: '/admin-skill-arena/users' },
    { icon: TrendingUp, label: 'Registered Students',  value: stats?.totalStudents ?? 0,  bg: '#D1FAE5', color: '#059669', link: '/admin-skill-arena/users' },
    { icon: Users,      label: 'Guest Visits',         value: stats?.totalGuests ?? 0,    bg: '#FEF9C3', color: '#CA8A04', link: '/admin-skill-arena/users' },
    { icon: BookOpen,   label: 'Subjects',             value: stats?.totalSubjects ?? 0,  bg: '#F3E8FF', color: '#7C3AED', link: '/admin-skill-arena/subjects' },
    { icon: Layers,     label: 'Concepts',             value: stats?.totalConcepts ?? 0,  bg: '#FEF3C7', color: '#D97706', link: '/admin-skill-arena/concepts' },
    { icon: HelpCircle, label: 'Questions',            value: stats?.totalQuestions ?? 0, bg: '#ECFDF5', color: '#059669', link: '/admin-skill-arena/questions' },
    { icon: Map,        label: 'Roadmaps',             value: stats?.totalRoadmaps ?? 0,  bg: '#DBEAFE', color: '#1D4ED8', link: '/admin-skill-arena/roadmaps' },
    { icon: Swords,     label: 'Missions',             value: stats?.totalMissions ?? 0,  bg: '#FFF7ED', color: '#EA580C', link: '/admin-skill-arena/missions' },
    { icon: Code2,      label: 'Problems',             value: stats?.totalProblems ?? 0,  bg: '#F0FDF4', color: '#16A34A', link: '/admin-skill-arena/problems' },
    { icon: Flag,       label: 'Open Reports',         value: stats?.totalReports ?? 0,   bg: '#FEF2F2', color: '#DC2626', link: '/admin-skill-arena/reports' },
    { icon: Briefcase,  label: 'Walk-In Posts',        value: stats?.totalWalkIns ?? 0,   bg: '#ECFDF5', color: '#059669', link: '/admin-skill-arena/walk-ins' },
  ]

  const openReports = stats?.totalReports ?? 0

  return (
    <AppLayout title="Admin Overview">
      <div className="admin-dash-hero">
        <div>
          <h2>Command Center</h2>
          <p className="page-subtitle admin-dash-subtitle">
            Monitor platform health, manage content, and respond to student feedback.
          </p>
          {openReports > 0 && (
            <button
              type="button"
              className="btn btn-ghost btn-sm admin-dash-alert-btn"
              onClick={() => navigate('/admin-skill-arena/reports')}
            >
              <AlertCircle size={14} /> {openReports} open report{openReports !== 1 ? 's' : ''} need attention
            </button>
          )}
        </div>
        <div className="admin-dash-quick">
          {QUICK_ACTIONS.map(a => (
            <button
              key={a.label}
              type="button"
              className="btn btn-ghost btn-sm admin-quick-action-btn"
              style={{ '--accent-color': a.accent, '--accent-border': `${a.accent}44` }}
              onClick={() => navigate(a.path)}
            >
              <a.icon size={14} /> {a.label}
            </button>
          ))}
        </div>
      </div>

      <div className="page-header">
        <div>
          <h1 className="page-title">Platform Overview</h1>
          <p className="page-subtitle">Click any card to jump to that section</p>
        </div>
      </div>

      <div className="stats-grid">
        {cards.map(c => {
          const Icon = c.icon
          return (
            <div
              key={c.label}
              className="stat-card card-hover admin-stat-card-clickable"
              onClick={() => navigate(c.link)}
              onKeyDown={e => e.key === 'Enter' && navigate(c.link)}
              role="button"
              tabIndex={0}
            >
              <div className="stat-icon admin-stat-icon-dynamic" style={{ '--stat-bg': c.bg, '--stat-color': c.color }}>
                <Icon size={22} />
              </div>
              <div className="stat-info">
                <div className="stat-value admin-stat-value-dynamic" style={{ '--stat-color': c.color }}>{c.value}</div>
                <div className="stat-label">{c.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid-2">
        <div>
          <div className="flex-between mb-2">
            <h2 className="font-bold admin-section-heading">Recent Registrations</h2>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => navigate('/admin-skill-arena/users')}>
              View all
            </button>
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
                {(stats?.recentUsers?.length ?? 0) === 0 ? (
                  <tr>
                    <td colSpan={3} className="admin-table-empty">
                      No registrations yet
                    </td>
                  </tr>
                ) : stats.recentUsers.map(u => (
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
                    <td className="text-muted text-sm">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="flex-between mb-2">
            <h2 className="font-bold admin-section-heading">Top Subjects by Completion</h2>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => navigate('/admin-skill-arena/subjects')}>
              <Plus size={14} /> Manage
            </button>
          </div>
          {stats?.topSubjects?.length ? (
            <div className="admin-top-subjects-list">
              {stats.topSubjects.map((s, i) => (
                <div
                  key={s.subjectId}
                  className="card card-hover admin-top-subject-card"
                  onClick={() => navigate('/admin-skill-arena/subjects')}
                >
                  <div className="admin-top-subject-rank">
                    {i + 1}
                  </div>
                  <span className="admin-emoji-lg">{s.icon}</span>
                  <div className="admin-flex-1-min">
                    <div className="text-sm font-semibold truncate">{s.title}</div>
                  </div>
                  <span className="badge badge-primary">{s.completionCount} done</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="card admin-card-empty-center">
              <p className="text-muted text-sm">No completion data yet</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
