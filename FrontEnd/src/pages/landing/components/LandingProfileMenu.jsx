import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { LogOut } from 'lucide-react'
import { getRank } from '../../../utils/slRank'
import useBodyLock from '../../../hooks/useBodyLock'

const MOBILE_BP = 768

function useIsMobile() {
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(`(max-width: ${MOBILE_BP}px)`).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BP}px)`)
    const sync = () => setMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return mobile
}

function getInitials(name) {
  return name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?'
}

function getRoleMeta(user) {
  if (user?.role === 'ADMIN') {
    return { label: 'Shadow Monarch', sub: 'Platform Admin', isGuest: false, isAdmin: true }
  }
  if (user?.role === 'GUEST') {
    return { label: 'Guest Hunter', sub: 'Temporary session — progress may not be saved', isGuest: true, isAdmin: false }
  }
  const rank = getRank(user?.xp ?? 0)
  return { label: `${rank.label}-Rank Hunter`, sub: 'Student account', rank, isGuest: false, isAdmin: false }
}

function ProfileOverview({ user, onLogout }) {
  const meta = getRoleMeta(user)
  const xp = user?.xp ?? 0

  return (
    <div className="lp-profile-panel">
      <div className="lp-profile-panel__head">
        <div
          className={`lp-profile-panel__avatar${meta.isAdmin ? ' lp-profile-panel__avatar--admin' : ''}`}
          style={{
            '--avatar-bg': user?.avatarColor || '#9B6ED4',
            '--rank-border': meta.rank ? `${meta.rank.color}55` : 'transparent',
          }}
        >
          {getInitials(user?.fullName)}
        </div>
        <div className="lp-profile-panel__identity">
          <div className="lp-profile-panel__name">{user?.fullName}</div>
          <div className="lp-profile-panel__email">{user?.email}</div>
        </div>
      </div>

      <div className="lp-profile-panel__meta">
        <span className={`lp-profile-panel__role${meta.isAdmin ? ' lp-profile-panel__role--admin' : ''}`}>
          {meta.label}
        </span>
        {meta.rank && (
          <span className={`rank-badge ${meta.rank.cls}`}>{meta.rank.label}</span>
        )}
      </div>

      <p className="lp-profile-panel__sub">{meta.sub}</p>

      {!meta.isAdmin && !meta.isGuest && meta.rank && (
        <div className="lp-profile-panel__xp">
          <div className="lp-profile-panel__xp-row">
            <span>{xp.toLocaleString()} XP</span>
            {meta.rank.next && (
              <span className="lp-profile-panel__xp-next">
                {meta.rank.next - xp} to {getRank(meta.rank.next).label}-Rank
              </span>
            )}
          </div>
          <div className="lp-profile-panel__xp-track">
            <div
              className="lp-profile-panel__xp-fill"
              style={{
                width: `${meta.rank.progress}%`,
                background: `linear-gradient(90deg, ${meta.rank.color}99, ${meta.rank.color})`,
              }}
            />
          </div>
        </div>
      )}

      {user?.collegeName && (
        <div className="lp-profile-panel__college">
          <span className="lp-profile-panel__college-label">College</span>
          <span>{user.collegeName}</span>
        </div>
      )}

      <button type="button" onClick={onLogout} className="lp-profile-panel__logout">
        <LogOut size={14} /> Sign Out
      </button>
    </div>
  )
}

export function LandingProfileDropdown({ user, logout, dismissSignal = false }) {
  const [open, setOpen] = useState(false)
  const btnRef = useRef(null)
  const [anchor, setAnchor] = useState(null)
  const isMobile = useIsMobile()
  const rank = getRank(user?.xp ?? 0)
  const isAdmin = user?.role === 'ADMIN'

  useBodyLock(open && isMobile)

  const close = () => setOpen(false)

  useEffect(() => {
    if (dismissSignal) close()
  }, [dismissSignal])

  useLayoutEffect(() => {
    if (!open || isMobile || !btnRef.current) {
      setAnchor(null)
      return
    }
    const update = () => {
      const rect = btnRef.current.getBoundingClientRect()
      setAnchor({
        top: rect.bottom + 8,
        right: Math.max(12, window.innerWidth - rect.right),
      })
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [open, isMobile])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (!open || isMobile) return
    const onPointer = (e) => {
      const inBtn = btnRef.current?.contains(e.target)
      const inPanel = e.target.closest?.('.lp-profile-dropdown')
      if (!inBtn && !inPanel) close()
    }
    document.addEventListener('mousedown', onPointer)
    return () => document.removeEventListener('mousedown', onPointer)
  }, [open, isMobile])

  const overlay = open ? (
    <>
      <div
        className={`lp-profile-backdrop${isMobile ? ' lp-profile-backdrop--mobile' : ''}`}
        onClick={close}
        aria-hidden="true"
      />
      <div
        className={`lp-profile-dropdown${isMobile ? ' lp-profile-dropdown--mobile' : ''}`}
        role="dialog"
        aria-label="Profile overview"
        style={!isMobile && anchor ? { top: anchor.top, right: anchor.right } : undefined}
      >
        <ProfileOverview user={user} onLogout={() => { close(); logout() }} />
      </div>
    </>
  ) : null

  return (
    <div className="lp-profile">
      <button
        ref={btnRef}
        type="button"
        className={`sl-nav-avatar lp-profile-avatar${open ? ' lp-profile-avatar--open' : ''}`}
        style={{
          '--avatar-bg': user?.avatarColor || '#9B6ED4',
          '--rank-color': isAdmin ? '#F59E0B' : rank.color,
        }}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`Open profile for ${user?.fullName || 'user'}`}
      >
        {getInitials(user?.fullName)}
      </button>

      {overlay && createPortal(overlay, document.body)}
    </div>
  )
}
