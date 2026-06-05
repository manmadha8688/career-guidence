import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  BookOpen, Map, LayoutDashboard, LogOut,
  Users, ChevronRight, Layers, HelpCircle, MessageSquare
} from 'lucide-react'

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth()
  const isAdmin = user?.role === 'ADMIN'

  const studentLinks = [
    { to: '/skill-arena/dashboard',           icon: <LayoutDashboard size={18} />, label: 'Status Window' },
    { to: '/skill-arena/dashboard?view=gates', icon: <BookOpen size={18} />,        label: 'Dungeon Gates' },
    { to: '/skill-arena/dashboard?view=paths', icon: <Map size={18} />,             label: 'Hunter Paths' },
  ]

  const adminLinks = [
    { to: '/admin-skill-arena',           icon: <LayoutDashboard size={18} />, label: 'Overview' },
    { to: '/admin-skill-arena/users',     icon: <Users size={18} />,           label: 'Users' },
    { to: '/admin-skill-arena/subjects',  icon: <BookOpen size={18} />,        label: 'Subjects' },
    { to: '/admin-skill-arena/concepts',  icon: <Layers size={18} />,          label: 'Concepts' },
    { to: '/admin-skill-arena/roadmaps',  icon: <Map size={18} />,             label: 'Roadmaps' },
    { to: '/admin-skill-arena/questions', icon: <HelpCircle size={18} />,      label: 'Questions' },
    { to: '/admin-skill-arena/feedbacks', icon: <MessageSquare size={18} />,   label: 'Feedbacks' },
  ]

  const links = isAdmin ? adminLinks : studentLinks

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar${open ? ' open' : ''}`}>
        <NavLink to={isAdmin ? '/admin-skill-arena' : '/skill-arena/dashboard'} className="sidebar-brand">
          <div className="sidebar-brand-icon" style={{ background: 'transparent', fontSize: '1.25rem' }}>⚔️</div>
          <span className="sidebar-brand-text" style={{ fontFamily: isAdmin ? 'inherit' : "'Orbitron', sans-serif", fontSize: '0.875rem', letterSpacing: '0.06em' }}>
            {isAdmin ? 'SHADOW PANEL' : 'ARISE'}
          </span>
        </NavLink>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">{isAdmin ? 'Admin Panel' : 'Hunter Menu'}</div>
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/admin-skill-arena'}
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-link-icon">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}

          {isAdmin && (
            <>
              <div className="sidebar-section-label" style={{ marginTop: '1rem' }}>Hunter View</div>
              <NavLink to="/skill-arena/dashboard" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`} onClick={onClose}>
                <span className="sidebar-link-icon"><ChevronRight size={18} /></span>
                Status Window
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
