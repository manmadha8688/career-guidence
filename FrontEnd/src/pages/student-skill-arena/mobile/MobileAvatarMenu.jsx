import { LogOut } from 'lucide-react'

export default function MobileAvatarMenu({ rank, user, initials, level, xp, onClose, onStatsOpen, onQuestsOpen, onProfileOpen, onLogout }) {
  const xpToNext = rank.next ? rank.next - xp : null
  const MENU_ITEMS = [
    { icon: '⚡', label: 'Stats & Badges',  color: '#9B6ED4', onClick: onStatsOpen },
    { icon: '📋', label: 'Daily Quests',    color: '#4ADE80', onClick: onQuestsOpen },
    { icon: '📖', label: 'Instructions',    color: '#60A5FA', onClick: onProfileOpen },
  ]
  return (
    <>
      <div onClick={onClose} className="dash-overlay-backdrop dash-overlay-backdrop--light dash-overlay-backdrop--avatar" />
      <div className="dash-mob-menu">
        <div className="dash-mob-menu__header">
          <div className="dash-mob-menu__profile-row">
            <div
              className="dash-avatar dash-avatar--lg"
              style={{ '--avatar-bg': user?.avatarColor || '#9B6ED4', '--rank-color': rank.color }}
            >{initials}</div>
            <div className="dash-flex-1">
              <div className="dash-mob-menu__name">{user?.fullName}</div>
              {user?.role === 'GUEST' && <span className="dash-mob-menu__guest-tag">GUEST</span>}
            </div>
            <span className={`rank-badge ${rank.cls} dash-rank-badge-sm`}>{rank.label}-RANK</span>
          </div>
          <div className="dash-mob-menu__xp-row">
            <span className="dash-mob-menu__xp-label">POWER: {xp.toLocaleString()} XP</span>
            <span className="dash-mob-menu__level">LVL {level}</span>
          </div>
          <div className="dash-progress-track">
            <div
              className="dash-progress-fill"
              style={{ '--progress-pct': `${rank.progress}%`, '--accent': rank.color, '--accent-80': `${rank.color}80` }}
            />
          </div>
          <div className="dash-mob-menu__xp-hint">
            {xpToNext != null ? `${xpToNext.toLocaleString()} XP to next rank` : 'MAX RANK — S CLASS ACHIEVED'}
          </div>
        </div>

        {MENU_ITEMS.map(item => (
          <button
            key={item.label}
            onClick={() => { onClose(); item.onClick() }}
            className="dash-mob-menu__item"
            style={{ '--item-color': item.color }}
          >
            <span className="dash-mob-menu__item-icon">{item.icon}</span>
            <span className="dash-mob-menu__item-label">{item.label}</span>
          </button>
        ))}

        {user?.role === 'GUEST' && (
          <div className="dash-mob-menu__guest-banner">
            <span className="dash-guest-note__highlight">Guest session</span> — register to save XP permanently.
          </div>
        )}
        <div className="dash-mob-menu__footer">
          <button onClick={() => { window.location.href = '/' }} className="dash-mob-menu__exit-btn">
            ← Exit Arena
          </button>
          <button onClick={() => { onClose(); onLogout() }} className="dash-mob-menu__logout-btn">
            <LogOut size={11} /> Exit System
          </button>
        </div>
      </div>
    </>
  )
}
