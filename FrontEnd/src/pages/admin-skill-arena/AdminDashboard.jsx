import { useState, useEffect, useCallback } from 'react'
import { TEST_DELAY_MS } from '../../components/loaders/_config'
import { useNavigate } from 'react-router-dom'
import {
  Users, BookOpen, Layers, Map, TrendingUp, Swords, Code2, HelpCircle,
  Flag, Briefcase, Plus, MessageSquare, AlertCircle, UserPlus, LogIn,
  RefreshCw, Chrome, Mail,
} from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import { getAdminStats, clearApiCache } from '../../api/api'
import toast from 'react-hot-toast'
import { getApiError } from '../../utils/apiError'
import AdminSkeleton from '../../components/loaders/AdminSkeleton'
import '../../styles/pages/admin/index.css'

const QUICK_ACTIONS = [
  { label: 'New Subject',  icon: BookOpen,   path: '/admin-skill-arena/subjects',  accent: '#7C3AED' },
  { label: 'New Concept',  icon: Layers,     path: '/admin-skill-arena/concepts',  accent: '#D97706' },
  { label: 'New Mission',  icon: Swords,     path: '/admin-skill-arena/missions', accent: '#EA580C' },
  { label: 'View Reports', icon: Flag,       path: '/admin-skill-arena/reports', accent: '#DC2626' },
  { label: 'Feedbacks',    icon: MessageSquare, path: '/admin-skill-arena/feedbacks', accent: '#4F46E5' },
]

const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const providerBadgeClass = (p) => {
  if (p === 'guest') return 'badge-warning'
  if (p === 'google' || p === 'email + google') return 'badge-primary'
  return 'badge-student'
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const navigate = useNavigate()

  const load = useCallback((showSpinner = false) => {
    if (showSpinner) setRefreshing(true)
    getAdminStats()
      .then(r => setStats(r.data))
      .catch(err => toast.error(getApiError(err, 'We could not load dashboard stats. Please refresh.')))
      .finally(() => {
        setTimeout(() => setLoading(false), TEST_DELAY_MS)
        setRefreshing(false)
      })
  }, [])

  useEffect(() => { load() }, [load])

  const refresh = () => {
    clearApiCache('adminStats')
    load(true)
    toast.success('Stats refreshed')
  }

  if (loading) {
    return (
      <AppLayout title="Admin Overview">
        <AdminSkeleton rows={5} />
      </AppLayout>
    )
  }

  const openReports = stats?.openReports ?? 0

  const todayCards = [
    { icon: UserPlus, label: 'New Users Today',  value: stats?.newUsersToday ?? 0, color: '#059669', bg: '#D1FAE5' },
    { icon: LogIn,    label: 'Logins Today',      value: stats?.loginsToday ?? 0,  color: '#4F46E5', bg: '#EEF2FF' },
    { icon: Flag,     label: 'Open Reports',      value: openReports,              color: '#DC2626', bg: '#FEF2F2', link: '/admin-skill-arena/reports' },
  ]

  const cards = [
    { icon: Users,      label: 'Total Users',          value: stats?.totalUsers ?? 0,     bg: '#EEF2FF', color: '#4F46E5', link: '/admin-skill-arena/users' },
    { icon: TrendingUp, label: 'Registered Students',  value: stats?.totalStudents ?? 0,  bg: '#D1FAE5', color: '#059669', link: '/admin-skill-arena/users?filter=student' },
    { icon: Users,      label: 'Guest Visits',         value: stats?.totalGuests ?? 0,    bg: '#FEF9C3', color: '#CA8A04', link: '/admin-skill-arena/users?filter=guest' },
    { icon: BookOpen,   label: 'Subjects',             value: stats?.totalSubjects ?? 0,  bg: '#F3E8FF', color: '#7C3AED', link: '/admin-skill-arena/subjects' },
    { icon: Layers,     label: 'Concepts',             value: stats?.totalConcepts ?? 0,  bg: '#FEF3C7', color: '#D97706', link: '/admin-skill-arena/concepts' },
    { icon: HelpCircle, label: 'Questions',            value: stats?.totalQuestions ?? 0, bg: '#ECFDF5', color: '#059669', link: '/admin-skill-arena/questions' },
    { icon: Map,        label: 'Roadmaps',             value: stats?.totalRoadmaps ?? 0,  bg: '#DBEAFE', color: '#1D4ED8', link: '/admin-skill-arena/roadmaps' },
    { icon: Swords,     label: 'Missions',             value: stats?.totalMissions ?? 0,  bg: '#FFF7ED', color: '#EA580C', link: '/admin-skill-arena/missions' },
    { icon: Code2,      label: 'Problems',             value: stats?.totalProblems ?? 0,  bg: '#F0FDF4', color: '#16A34A', link: '/admin-skill-arena/problems' },
    { icon: Flag,       label: 'Open Reports',         value: openReports,                bg: '#FEF2F2', color: '#DC2626', link: '/admin-skill-arena/reports' },
    { icon: Briefcase,  label: 'Walk-In Posts',        value: stats?.totalWalkIns ?? 0,   bg: '#ECFDF5', color: '#059669', link: '/admin-skill-arena/walk-ins' },
  ]

  const trend = stats?.loginTrend ?? []
  const trendMax = Math.max(1, ...trend.map(d => Math.max(d.logins ?? 0, d.signups ?? 0)))

  // Auth method split — Google vs email/password (guests excluded, they have no provider)
  const googleUsers = stats?.googleUsers ?? 0
  const localUsers = stats?.localUsers ?? 0
  const providerTotal = Math.max(1, googleUsers + localUsers)
  const googlePct = Math.round((googleUsers / providerTotal) * 100)
  const localPct = 100 - googlePct

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
          <button
            type="button"
            className="btn btn-ghost btn-sm admin-quick-action-btn"
            style={{ '--accent-color': '#0EA5E9', '--accent-border': '#0EA5E944' }}
            onClick={refresh}
            disabled={refreshing}
          >
            <RefreshCw size={14} className={refreshing ? 'admin-spin' : ''} /> Refresh
          </button>
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

      {/* Today at a glance */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Today at a Glance</h1>
          <p className="page-subtitle">Live activity for {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })} (IST)</p>
        </div>
      </div>

      <div className="admin-today-grid">
        {todayCards.map(c => {
          const Icon = c.icon
          return (
            <div
              key={c.label}
              className={`stat-card admin-today-card ${c.link ? 'card-hover admin-stat-card-clickable' : ''}`}
              onClick={c.link ? () => navigate(c.link) : undefined}
              role={c.link ? 'button' : undefined}
              tabIndex={c.link ? 0 : undefined}
              onKeyDown={c.link ? (e => e.key === 'Enter' && navigate(c.link)) : undefined}
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

      {/* Visualization row: 7-day activity + auth method split */}
      <div className="grid-2 admin-viz-row">
        <div className="card admin-chart-card">
          <div className="flex-between mb-2">
            <h2 className="font-bold admin-section-heading">Last 7 Days</h2>
            <div className="admin-chart-legend">
              <span className="admin-legend-item"><i className="admin-legend-dot admin-legend-dot--logins" /> Logins</span>
              <span className="admin-legend-item"><i className="admin-legend-dot admin-legend-dot--signups" /> New users</span>
            </div>
          </div>
          {trend.length ? (
            <div className="admin-chart">
              {trend.map((d, i) => {
                const day = new Date(d.date + 'T00:00:00')
                const isToday = i === trend.length - 1
                return (
                  <div key={d.date} className={`admin-chart-col ${isToday ? 'admin-chart-col--today' : ''}`}>
                    <div className="admin-chart-bars">
                      <div
                        className="admin-chart-bar admin-chart-bar--logins"
                        style={{ height: `${((d.logins ?? 0) / trendMax) * 100}%` }}
                        title={`${d.logins ?? 0} logins`}
                      />
                      <div
                        className="admin-chart-bar admin-chart-bar--signups"
                        style={{ height: `${((d.signups ?? 0) / trendMax) * 100}%` }}
                        title={`${d.signups ?? 0} new users`}
                      />
                    </div>
                    <div className="admin-chart-label">{WEEKDAY[day.getDay()]}</div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="admin-card-empty-center"><p className="text-muted text-sm">No activity data yet</p></div>
          )}
        </div>

        <div className="card admin-chart-card">
          <div className="flex-between mb-2">
            <h2 className="font-bold admin-section-heading">Sign-in Methods</h2>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => navigate('/admin-skill-arena/users')}>
              View users
            </button>
          </div>
          <div className="admin-provider-split">
            <div className="admin-provider-bar">
              <div className="admin-provider-seg admin-provider-seg--google" style={{ width: `${googlePct}%` }} />
              <div className="admin-provider-seg admin-provider-seg--email" style={{ width: `${localPct}%` }} />
            </div>
            <div className="admin-provider-rows">
              <div className="admin-provider-row">
                <span className="admin-provider-key"><Chrome size={15} /> Google</span>
                <span className="admin-provider-val">{googleUsers} <span className="text-muted">({googlePct}%)</span></span>
              </div>
              <div className="admin-provider-row">
                <span className="admin-provider-key"><Mail size={15} /> Email &amp; password</span>
                <span className="admin-provider-val">{localUsers} <span className="text-muted">({localPct}%)</span></span>
              </div>
              <div className="admin-provider-row admin-provider-row--muted">
                <span className="admin-provider-key"><Users size={15} /> Guests</span>
                <span className="admin-provider-val">{stats?.totalGuests ?? 0}</span>
              </div>
            </div>
            <p className="text-xs text-muted admin-provider-note">
              Accounts linking both methods count under Google. Guests use no provider.
            </p>
          </div>
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
                  <th>Method</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {(stats?.recentUsers?.length ?? 0) === 0 ? (
                  <tr>
                    <td colSpan={4} className="admin-table-empty">
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
                      <span className={`badge ${providerBadgeClass(u.provider)}`}>{u.provider || 'email'}</span>
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
