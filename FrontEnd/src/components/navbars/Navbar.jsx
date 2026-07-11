import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Swords, Ghost, Menu, X as XIcon, Sun, Moon, ChevronRight, Search } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { guestLogin } from '../../api/api'
import { getApiError } from '../../utils/apiError'
import toast from 'react-hot-toast'
import { NAV_LINKS } from '../../pages/landing/landingData'
import { LandingProfileDropdown } from '../../pages/landing/components/LandingProfileMenu'
import { openGlobalSearch } from '../GlobalSearchOverlay'
import useBodyLock from '../../hooks/useBodyLock'

/**
 * Global site navbar — same look everywhere (landing + top-level feature pages).
 *
 * Props:
 *  - sticky: render in normal flow, pinned on scroll (feature pages). Default is
 *            a fixed overlay bar used by the landing hero.
 *
 * The logo/title always navigates home; back navigation is left to the browser.
 */
export default function Navbar({ sticky = false }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()
  const {
    user, login, logout,
    showAuthOverlay, completeAuthOverlay, hideAuthOverlay,
  } = useAuth()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [guestLoading, setGuestLoading] = useState(false)

  // Lock the page behind the mobile drawer so the background can't scroll while
  // the hamburger menu is open. Mobile-only — the drawer never opens on desktop.
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  useBodyLock(mobileMenuOpen && isMobile)
  // Some pages (e.g. auth) scroll an inner container instead of the body, so a
  // body lock alone won't freeze them. Flag <html> so CSS can stop those too.
  useEffect(() => {
    if (!(mobileMenuOpen && isMobile)) return
    const root = document.documentElement
    root.classList.add('lp-drawer-open')
    return () => root.classList.remove('lp-drawer-open')
  }, [mobileMenuOpen, isMobile])

  const handleEnter = () =>
    navigate(user ? '/skill-arena/dashboard' : '/login?redirect=/skill-arena/dashboard')

  const handleGuest = async () => {
    setGuestLoading(true)
    showAuthOverlay?.('guest')
    try {
      const storedGuestId = localStorage.getItem('guest_device_id')
      const { data } = await guestLogin(storedGuestId)
      // Persist the server-issued secret device token (not the guessable user id).
      if (data.guestToken) localStorage.setItem('guest_device_id', data.guestToken)
      completeAuthOverlay?.()
      await new Promise(r => setTimeout(r, 600))
      hideAuthOverlay?.()
      login(data.token, data.user)
      navigate('/')
    } catch (err) {
      hideAuthOverlay?.()
      toast.error(getApiError(err, 'We could not start a guest session right now. Please try again.'))
    } finally {
      setGuestLoading(false)
    }
  }

  const onNavLink = (link) => {
    if (!link.live) return undefined
    if (link.href) return () => navigate(link.href)
    if (link.scrollTo) return () => document.getElementById(link.scrollTo)?.scrollIntoView({ behavior: 'smooth' })
    return handleEnter
  }

  const closeMobile = () => setMobileMenuOpen(false)

  const onMobileNav = (link) => {
    if (!link.live) return
    if (link.href) { navigate(link.href); closeMobile() }
    else if (link.scrollTo) { document.getElementById(link.scrollTo)?.scrollIntoView({ behavior: 'smooth' }); closeMobile() }
    else { handleEnter(); closeMobile() }
  }

  return (
    <>
      <nav className={`lp-navbar${sticky ? ' lp-navbar--sticky' : ''}`}>
        <div className="lp-navbar__lead">
          <Link to="/" className="lp-navbar__brand" aria-label="LearnForEarn home">
            <div className="lp-navbar__logo">
              <Swords size={16} color="#fff" />
            </div>
            <div className="lp-navbar__brand-text">
              <span className="lp-grad-text lp-navbar__title">LearnForEarn</span>
              <span className="lp-navbar__caption">Learn Skills. Earn Job.</span>
            </div>
          </Link>
        </div>

        <div className="lp-nav-links">
          {NAV_LINKS.map(link => (
            <div
              key={link.label}
              className={`lp-nav-link${link.live ? ' lp-nav-link--live' : ''}${link.href && pathname.startsWith(link.href) ? ' lp-nav-link--active' : ''}`}
              onClick={onNavLink(link)}
            >
              {link.label}
              {!link.live && <span className="lp-nav-soon-badge">SOON</span>}
            </div>
          ))}
        </div>

        <div className="lp-navbar__end">
          <div className="lp-nav-auth">
            {user && user.role !== 'ADMIN' && (
              <button
                type="button"
                onClick={openGlobalSearch}
                className="lp-btn-icon"
                title="Search (Ctrl+K)"
                aria-label="Search"
              >
                <Search size={16} />
              </button>
            )}
            <button
              type="button"
              onClick={toggleTheme}
              className="lp-btn-icon"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            {user ? (
              <button type="button" onClick={handleEnter} className="lp-btn-primary lp-btn-primary--nav">
                Enter Arena <ChevronRight size={14} />
              </button>
            ) : (
              <>
                <Link to="/login?redirect=/" className="lp-btn-ghost">Sign In</Link>
                <Link to="/register" className="lp-btn-primary lp-btn-primary--nav">
                  Sign up <ChevronRight size={14} />
                </Link>
              </>
            )}
          </div>

          {user && (
            <LandingProfileDropdown
              user={user}
              logout={logout}
              dismissSignal={mobileMenuOpen}
            />
          )}

          <button
            type="button"
            className="lp-mob-menu-btn"
            onClick={() => setMobileMenuOpen(o => !o)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <XIcon size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <>
          <div role="presentation" className="lp-mobile-overlay" onClick={closeMobile} />
          <div className="lp-mobile-drawer">
            <div className="lp-mobile-nav-list">
              {NAV_LINKS.map(link => (
                <button
                  key={link.label}
                  type="button"
                  className={`lp-mobile-nav-item${link.live ? ' lp-mobile-nav-item--live' : ''}`}
                  onClick={() => onMobileNav(link)}
                >
                  <span>{link.label}</span>
                  {!link.live && <span className="lp-mobile-soon-badge">SOON</span>}
                </button>
              ))}
            </div>

            <div className="lp-mobile-auth">
              {user ? (
                <button type="button" onClick={() => { handleEnter(); closeMobile() }} className="lp-btn-primary lp-btn-primary--full">
                  <Swords size={16} /> Enter Arena
                </button>
              ) : (
                <>
                  <div className="lp-mobile-auth-row">
                    <Link to="/register" className="lp-btn-primary" onClick={closeMobile}>
                      <Swords size={16} /> Sign up
                    </Link>
                    <Link to="/login?redirect=/" className="lp-btn-ghost" onClick={closeMobile}>
                      Sign In
                    </Link>
                  </div>
                  <button
                    type="button"
                    onClick={() => { handleGuest(); closeMobile() }}
                    disabled={guestLoading}
                    className="lp-btn-ghost lp-btn-ghost--full"
                  >
                    <Ghost size={14} /> {guestLoading ? 'Starting…' : 'Try as Guest'}
                  </button>
                </>
              )}
            </div>

            <div className="lp-mobile-theme-row">
              <span className="lp-mobile-theme-label">{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>
              <button type="button" onClick={() => { toggleTheme(); closeMobile() }} className="lp-mobile-theme-btn">
                {theme === 'dark' ? <><Sun size={15} /> Light</> : <><Moon size={15} /> Dark</>}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
