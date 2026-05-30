import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  BookOpen, Map, LayoutDashboard, LogOut,
  Users, ChevronRight, Layers, HelpCircle
} from 'lucide-react'

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth()
  const isAdmin = user?.role === 'ADMIN'

  const studentLinks = [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/subjects', icon: <BookOpen size={18} />, label: 'Subjects' },
    { to: '/roadmaps', icon: <Map size={18} />, label: 'Roadmaps' },
  ]

  const adminLinks = [
    { to: '/admin', icon: <LayoutDashboard size={18} />, label: 'Overview' },
    { to: '/admin/users', icon: <Users size={18} />, label: 'Users' },
    { to: '/admin/subjects', icon: <BookOpen size={18} />, label: 'Subjects' },
    { to: '/admin/concepts', icon: <Layers size={18} />, label: 'Concepts' },
    { to: '/admin/roadmaps', icon: <Map size={18} />, label: 'Roadmaps' },
    { to: '/admin/questions', icon: <HelpCircle size={18} />, label: 'Questions' },
  ]

  const links = isAdmin ? adminLinks : studentLinks

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar${open ? ' open' : ''}`}>
        <NavLink to={isAdmin ? '/admin' : '/dashboard'} className="sidebar-brand">
          <div className="sidebar-brand-icon">🎓</div>
          <span className="sidebar-brand-text">LearnPath</span>
        </NavLink>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">{isAdmin ? 'Admin Panel' : 'Learning'}</div>
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/admin' || link.to === '/dashboard'}
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-link-icon">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}

          {isAdmin && (
            <>
              <div className="sidebar-section-label" style={{ marginTop: '1rem' }}>Student View</div>
              <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`} onClick={onClose}>
                <span className="sidebar-link-icon"><ChevronRight size={18} /></span>
                Student Dashboard
              </NavLink>
            </>
          )}
        </nav>

        <div className="sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div className="navbar-avatar" style={{ background: user?.avatarColor || '#4F46E5', fontSize: '0.8rem' }}>
              {user?.fullName?.charAt(0)?.toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="text-sm font-semibold truncate">{user?.fullName}</div>
              <div className="text-xs text-muted truncate">{user?.email}</div>
            </div>
          </div>
          <button className="btn btn-ghost w-full btn-sm" onClick={logout}>
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </aside>
    </>
  )
}
