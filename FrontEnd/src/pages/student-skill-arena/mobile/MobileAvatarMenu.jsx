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
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 310, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)' }} />
      <div style={{ position: 'fixed', top: 62, right: 12, zIndex: 311, width: 260, background: '#0D1322', border: '1px solid rgba(155,110,212,0.3)', borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,0.7)', overflow: 'hidden', animation: 'slideUp 0.15s ease' }}>

        {/* Hunter card header */}
        <div style={{ padding: '1rem', borderBottom: '1px solid rgba(155,110,212,0.14)', background: 'rgba(155,110,212,0.07)' }}>
          {/* Row: avatar + name | rank on far right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: user?.avatarColor || '#9B6ED4', border: `2.5px solid ${rank.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 700, color: '#fff', flexShrink: 0, boxShadow: `0 0 12px ${rank.color}44` }}>{initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#E2E8F0' }}>{user?.fullName}</div>
              {user?.role === 'GUEST' && <span style={{ fontSize: '0.58rem', fontWeight: 700, color: '#64748B', background: 'rgba(100,116,139,0.15)', padding: '0.1rem 0.4rem', borderRadius: 3, border: '1px solid rgba(100,116,139,0.2)' }}>GUEST</span>}
            </div>
            {/* Rank badge on the RIGHT */}
            <span className={`rank-badge ${rank.cls}`} style={{ fontSize: '0.62rem', flexShrink: 0 }}>{rank.label}-RANK</span>
          </div>
          {/* XP bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', color: '#F59E0B' }}>POWER: {xp.toLocaleString()} XP</span>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', color: '#64748B' }}>LVL {level}</span>
          </div>
          <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${rank.progress}%`, background: `linear-gradient(90deg, ${rank.color}80, ${rank.color})`, borderRadius: 3, transition: 'width 1s ease' }} />
          </div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#64748B', marginTop: '0.3rem' }}>
            {xpToNext != null ? `${xpToNext.toLocaleString()} XP to next rank` : 'MAX RANK — S CLASS ACHIEVED'}
          </div>
        </div>

        {/* Action buttons */}
        {MENU_ITEMS.map((item, i) => (
          <button key={item.label} onClick={() => { onClose(); item.onClick() }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', width: '100%', padding: '0.875rem 1rem', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'background 0.12s' }}
            onMouseEnter={e => e.currentTarget.style.background = `${item.color}12`}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <span style={{ fontSize: '1.15rem', width: 26, textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
            <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.9375rem', color: item.color, letterSpacing: '0.02em' }}>{item.label}</span>
          </button>
        ))}

        {/* Exit buttons */}
        {user?.role === 'GUEST' && (
          <div style={{ padding: '0.625rem 1rem', background: 'rgba(155,110,212,0.06)', borderTop: '1px solid rgba(155,110,212,0.12)', fontSize: '0.72rem', color: '#8B9AB8', lineHeight: 1.5 }}>
            <span style={{ color: '#C4B5FD', fontWeight: 600 }}>Guest session</span> — register to save XP permanently.
          </div>
        )}
        <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={() => { window.location.href = '/' }}
            style={{ flex: 1, padding: '0.55rem', borderRadius: 7, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-muted)', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.08em', cursor: 'pointer' }}>
            ← Exit Arena
          </button>
          <button onClick={() => { onClose(); onLogout() }}
            style={{ flex: 1, padding: '0.55rem', borderRadius: 7, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.08em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}>
            <LogOut size={11} /> Exit System
          </button>
        </div>
      </div>
    </>
  )
}
