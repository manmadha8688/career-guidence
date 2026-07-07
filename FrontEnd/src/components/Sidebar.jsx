import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  BookOpen, Map, LayoutDashboard, LogOut,
  Users, Layers, HelpCircle, MessageSquare, Sword, Code2, GraduationCap, Flag, Briefcase, Zap, Rocket, Home
} from 'lucide-react'

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth()
  const isAdmin = user?.role === 'ADMIN'

  const studentLinks = [
    { to: '/skill-arena/dashboard',           icon: <LayoutDashboard size={18} />, label: 'Skill Arena' },
    { to: '/skill-arena/dashboard?view=gates', icon: <BookOpen size={18} />,        label: 'Dungeon Gates' },
    { to: '/skill-arena/dashboard?view=paths', icon: <Map size={18} />,             label: 'Hunter Paths' },
    { to: '/problem-solving',                  icon: <Code2 size={18} />,           label: 'Problem Solving' },
    { to: '/missions',                         icon: <Sword size={18} />,           label: 'Missions' },
    { to: '/walk-ins',                         icon: <Briefcase size={18} />,       label: 'Walk-Ins' },
    { to: '/deployment',                       icon: <Rocket size={18} />,          label: 'Deploy Guide' },
    { to: '/fresher-instructions',             icon: <GraduationCap size={18} />,   label: 'Fresher Guide' },
    { to: '/ai-lab',                           icon: <Zap size={18} />,             label: 'AI Lab' },
  ]

  const adminLinks = [
    { to: '/admin-skill-arena',           icon: <LayoutDashboard size={18} />, label: 'Overview' },
    { to: '/admin-skill-arena/users',     icon: <Users size={18} />,           label: 'Users' },
    { to: '/admin-skill-arena/subjects',  icon: <BookOpen size={18} />,        label: 'Subjects' },
    { to: '/admin-skill-arena/concepts',  icon: <Layers size={18} />,          label: 'Concepts' },
    { to: '/admin-skill-arena/roadmaps',  icon: <Map size={18} />,             label: 'Roadmaps' },
    { to: '/admin-skill-arena/questions', icon: <HelpCircle size={18} />,      label: 'Questions' },
    { to: '/admin-skill-arena/feedbacks', icon: <MessageSquare size={18} />,   label: 'Feedbacks' },
    { to: '/admin-skill-arena/reports',  icon: <Flag size={18} />,             label: 'Reports' },
    { to: '/admin-skill-arena/missions',  icon: <Sword size={18} />,           label: 'Missions' },
    { to: '/admin-skill-arena/problems',  icon: <Code2 size={18} />,           label: 'Problems' },
    { to: '/admin-skill-arena/walk-ins',  icon: <Briefcase size={18} />,       label: 'Walk-Ins' },
  ]

  const links = isAdmin ? adminLinks : studentLinks

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar${open ? ' open' : ''}`}>
        <NavLink to={isAdmin ? '/admin-skill-arena' : '/skill-arena/dashboard'} className="sidebar-brand">
          <div className="sidebar-brand-icon sidebar-brand-icon--emoji">⚔️</div>
          <span className={`sidebar-brand-text${!isAdmin ? ' sidebar-brand-text--hunter' : ''}`}>
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
              <div className="sidebar-section-label sidebar-section-label--spaced">Hunter View</div>
              <NavLink to="/" end className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`} onClick={onClose}>
                <span className="sidebar-link-icon"><Home size={18} /></span>
                Landing Page
              </NavLink>
              <NavLink to="/skill-arena/dashboard" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`} onClick={onClose}>
                <span className="sidebar-link-icon"><LayoutDashboard size={18} /></span>
                Skill Arena
              </NavLink>
              <NavLink to="/problem-solving" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`} onClick={onClose}>
                <span className="sidebar-link-icon"><Code2 size={18} /></span>
                Coding
              </NavLink>
              <NavLink to="/missions" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`} onClick={onClose}>
                <span className="sidebar-link-icon"><Sword size={18} /></span>
                Missions
              </NavLink>
              <NavLink to="/walk-ins" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`} onClick={onClose}>
                <span className="sidebar-link-icon"><Briefcase size={18} /></span>
                Walk-Ins
              </NavLink>
              <NavLink to="/ai-lab" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`} onClick={onClose}>
                <span className="sidebar-link-icon"><Zap size={18} /></span>
                AI Lab
              </NavLink>
            </>
          )}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-user">
            <div
              className="navbar-avatar sidebar-footer-avatar"
              style={{ '--avatar-bg': user?.avatarColor || '#4F46E5' }}
            >
              {user?.fullName?.charAt(0)?.toUpperCase()}
            </div>
            <div className="sidebar-footer-user__meta">
              <div className="text-sm font-semibold truncate">{user?.fullName}</div>
              <div className="text-xs text-muted truncate">{user?.email}</div>
            </div>
          </div>
          <button type="button" className="btn btn-ghost w-full btn-sm" onClick={logout}>
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </aside>
    </>
  )
}
