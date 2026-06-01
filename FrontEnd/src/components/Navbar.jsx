import { Menu } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getRank } from '../utils/slRank'

export default function Navbar({ onMenuClick, title = '' }) {
  const { user } = useAuth()
  const isAdmin = user?.role === 'ADMIN'

  // Use xp/level/rank from user object (set by /api/auth/me which includes DB values)
  const xp   = user?.xp   ?? 0
  const rank = getRank(xp)

  const initials = user?.fullName?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="theme-toggle" onClick={onMenuClick} title="Toggle menu">
          <Menu size={18} />
        </button>
        {title && <span className="navbar-title">{title}</span>}
      </div>

      <div className="navbar-right">
        {!isAdmin && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <span className={`rank-badge ${rank.cls}`}>{rank.label}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 56 }}>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.03em' }}>
                {xp.toLocaleString()} XP
              </span>
              <div className="xp-bar-track" style={{ height: 5 }}>
                <div className="xp-bar-fill" style={{ width: `${rank.progress}%`, background: `linear-gradient(90deg, ${rank.color}99, ${rank.color})` }} />
              </div>
            </div>
          </div>
        )}
        <div className="navbar-user">
          <div className="navbar-avatar" style={{ background: user?.avatarColor || '#9B6ED4', border: isAdmin ? 'none' : `2px solid ${rank.color}55` }}>
            {initials}
          </div>
          <div>
            <div className="navbar-name" style={{ fontFamily: isAdmin ? 'inherit' : "'Rajdhani', sans-serif", fontWeight: 700 }}>
              {user?.fullName}
            </div>
            <div className="text-xs text-muted" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.05em' }}>
              {isAdmin ? 'SHADOW MONARCH' : `${rank.label}-RANK HUNTER`}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
