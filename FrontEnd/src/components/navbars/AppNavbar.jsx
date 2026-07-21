import { Menu, Sun, Moon, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { getRank } from '../../utils/slRank'
import { openGlobalSearch } from '../GlobalSearchOverlay'

/** Skill Arena top bar (used by AppLayout): sidebar toggle + XP/rank + hunter avatar. */
export default function AppNavbar({ onMenuClick, title = '' }) {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const isAdmin = user?.role === 'ADMIN'

  const xp   = user?.xp   ?? 0
  const rank = getRank(xp)
  const initials = user?.fullName?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="theme-toggle" onClick={onMenuClick} title="Toggle menu" aria-label="Toggle sidebar menu">
          <Menu size={18} />
        </button>
        {title && <span className="navbar-title">{title}</span>}
      </div>

      <div className="navbar-right">
        {!isAdmin && (
          <button
            type="button"
            onClick={openGlobalSearch}
            className="theme-icon-btn"
            title="Search (Ctrl+K)"
            aria-label="Search"
          >
            <Search size={16} />
          </button>
        )}
        {!isAdmin && (
          <>
            <button
              type="button"
              onClick={() => navigate('/code-gym')}
              className="navbar-quick-btn navbar-quick-btn--coding"
              title="Problem Solving"
              aria-label="Problem Solving"
            >
              Coding
            </button>
            <button
              type="button"
              onClick={() => navigate('/aptitude')}
              className="navbar-quick-btn navbar-quick-btn--aptitude"
              title="Aptitude"
              aria-label="Aptitude"
            >
              Aptitude
            </button>
            <button
              type="button"
              onClick={() => navigate('/missions')}
              className="navbar-quick-btn navbar-quick-btn--missions"
              title="Mission Board"
              aria-label="Mission Board"
            >
              ◆ MISSIONS
            </button>
            <button
              type="button"
              onClick={() => navigate('/resume')}
              className="navbar-quick-btn navbar-quick-btn--resume"
              title="Resume Studio"
              aria-label="Resume Studio"
            >
              Resume
            </button>
          </>
        )}
        <button className="theme-icon-btn" onClick={toggleTheme} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        {!isAdmin && (
          <div className="navbar-xp-block">
            <span className={`rank-badge ${rank.cls}`}>{rank.label}</span>
            <div className="navbar-xp-meta">
              <span className="navbar-xp-label">{xp.toLocaleString()} XP</span>
              <div className="xp-bar-track navbar-xp-track">
                <div
                  className="xp-bar-fill"
                  style={{
                    width: `${rank.progress}%`,
                    background: `linear-gradient(90deg, ${rank.color}99, ${rank.color})`,
                  }}
                />
              </div>
            </div>
          </div>
        )}
        <div className="navbar-user">
          <div
            className={`navbar-avatar${isAdmin ? ' navbar-avatar--admin' : ''}`}
            style={{
              '--avatar-bg': user?.avatarColor || '#9B6ED4',
              '--rank-border': isAdmin ? 'transparent' : `${rank.color}55`,
            }}
          >
            {initials}
          </div>
          <div>
            <div className={`navbar-name${!isAdmin ? ' navbar-name--hunter' : ''}`}>
              {user?.fullName}
            </div>
            <div className="text-xs text-muted navbar-role-label">
              {isAdmin ? 'SHADOW MONARCH' : `${rank.label}-RANK HUNTER`}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
