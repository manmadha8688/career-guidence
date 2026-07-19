import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { LogOut, Bookmark, UserCog, GraduationCap, UserPlus } from 'lucide-react'
import { getRank } from '../../../utils/slRank'
import { isGuest } from '../../../utils/auth'
import useBodyLock from '../../../hooks/useBodyLock'
import useBackClose from '../../../hooks/useBackClose'
import RegisterCTA from '../../../components/RegisterCTA'

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
  if (isGuest(user)) {
    return { label: 'Guest Hunter', sub: 'Temporary session — progress may not be saved', isGuest: true, isAdmin: false }
  }
  const rank = getRank(user?.xp ?? 0)
  return { label: `${rank.label}-Rank Hunter`, sub: 'Student account', rank, isGuest: false, isAdmin: false }
}

function ProfileOverview({ user, onLogout, onNavigate, onClose }) {
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
        {meta.rank && (
          <span className={`rank-badge ${meta.rank.cls} lp-profile-panel__rank`}>{meta.rank.label}</span>
        )}
      </div>

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

      <div className="lp-profile-panel__actions">
        {!meta.isAdmin && (
          <>
            <button type="button" className="lp-profile-panel__action" onClick={() => onNavigate('/bookmarks')}>
              <Bookmark size={15} /> My Bookmarks
            </button>
            {!meta.isGuest && (
              <button type="button" className="lp-profile-panel__action" onClick={() => onNavigate('/myprofile')}>
                <UserCog size={15} /> My Profile
              </button>
            )}
          </>
        )}
        <button type="button" className="lp-profile-panel__action" onClick={() => onNavigate('/about')}>
          <GraduationCap size={15} /> Tutorial
        </button>
        {meta.isGuest && (
          <RegisterCTA
            className="lp-profile-panel__action lp-profile-panel__action--primary"
            icon={<UserPlus size={15} />}
            onClick={onClose}
          />
        )}
      </div>

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
  const navigate = useNavigate()
  const rank = getRank(user?.xp ?? 0)
  const isAdmin = user?.role === 'ADMIN'

  useBodyLock(open && isMobile)
  useBackClose(open && isMobile, () => setOpen(false))

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
        <ProfileOverview
          user={user}
          onClose={close}
          onLogout={() => { close(); logout() }}
          onNavigate={(path) => { close(); navigate(path) }}
        />
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
