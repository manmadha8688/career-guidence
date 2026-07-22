import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Swords, Ghost, Menu, X as XIcon, Sun, Moon, ChevronRight, Search,
  Code2, Brain, FileText, Briefcase, Zap, Rocket, UserPlus,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { guestLogin } from '../../api/api'
import { getApiError } from '../../utils/apiError'
import toast from 'react-hot-toast'
import { NAV_LINKS } from '../../pages/landing/landingData'
import { LandingProfileDropdown } from '../../pages/landing/components/LandingProfileMenu'
import { openGlobalSearch } from '../globalSearchBus'
import { isGuest } from '../../utils/auth'
import RegisterCTA from '../RegisterCTA'
import useBodyLock from '../../hooks/useBodyLock'
import useBackClose from '../../hooks/useBackClose'
import '../../styles/components/mobile-navbar-drawer.css'

const MOBILE_NAV_META = {
  'Code GYM': { accent: '#0EA5E9', Icon: Code2, tag: 'PRACTICE' },
  Aptitude: { accent: '#6366F1', Icon: Brain, tag: 'TRAIN' },
  Resume: { accent: '#0F766E', Icon: FileText, tag: 'BUILD' },
  'Walk-Ins': { accent: '#4ADE80', Icon: Briefcase, tag: 'JOBS' },
  'AI Lab': { accent: '#00D9FF', Icon: Zap, tag: 'TOOLS' },
  'Deploy Guidance': { accent: '#9B6ED4', Icon: Rocket, tag: 'SHIP' },
}

const MOBILE_DRAWER_EASE = [0.16, 1, 0.3, 1]

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
  const reduceMotion = useReducedMotion()

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
  useBackClose(mobileMenuOpen && isMobile, () => setMobileMenuOpen(false))
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
            {!user ? (
              <>
                <Link to="/login?redirect=/" className="lp-btn-ghost">Sign In</Link>
                <Link to="/register" className="lp-btn-primary lp-btn-primary--nav">
                  Sign up <ChevronRight size={14} />
                </Link>
              </>
            ) : isGuest(user) ? (
              <>
                <RegisterCTA
                  className="lp-btn-primary lp-btn-primary--nav"
                  label="Create account"
                  trailingIcon={<ChevronRight size={14} />}
                />
                <button type="button" onClick={handleEnter} className="lp-btn-ghost">
                  Enter Arena
                </button>
              </>
            ) : (
              <button type="button" onClick={handleEnter} className="lp-btn-primary lp-btn-primary--nav">
                Enter Arena <ChevronRight size={14} />
              </button>
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
            className={`lp-mob-menu-btn${mobileMenuOpen ? ' is-open' : ''}`}
            onClick={() => setMobileMenuOpen(o => !o)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <XIcon size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="lp-mobile-overlay"
              role="presentation"
              className="lp-mobile-overlay lp-mobile-overlay--v2"
              onClick={closeMobile}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            />
            <motion.div
              key="lp-mobile-drawer"
              className="lp-mobile-drawer lp-mobile-drawer--v2"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -24, scale: 0.98 }}
              transition={{ duration: 0.38, ease: MOBILE_DRAWER_EASE }}
            >
              <div className="lp-mdraw-body">
                <ul className="lp-mdraw-list">
                  {NAV_LINKS.map((link, i) => {
                    const meta = MOBILE_NAV_META[link.label] ?? { accent: '#9B6ED4', Icon: ChevronRight, tag: 'GO' }
                    const Icon = meta.Icon
                    const isActive = !!(link.href && pathname.startsWith(link.href))
                    return (
                      <motion.li
                        key={link.label}
                        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, ease: MOBILE_DRAWER_EASE, delay: 0.08 + i * 0.06 }}
                      >
                        <motion.button
                          type="button"
                          className={`lp-mdraw-item${isActive ? ' is-active' : ''}`}
                          style={{ '--accent': meta.accent }}
                          disabled={!link.live}
                          aria-current={isActive ? 'page' : undefined}
                          onClick={() => onMobileNav(link)}
                          whileTap={reduceMotion || !link.live ? undefined : { scale: 0.98 }}
                        >
                          <span className="lp-mdraw-item__icon" aria-hidden="true">
                            <Icon size={20} />
                          </span>
                          <span className="lp-mdraw-item__text">
                            <span className="lp-mdraw-item__label">{link.label}</span>
                          </span>
                          {!link.live && <span className="lp-mdraw-soon">SOON</span>}
                        </motion.button>
                      </motion.li>
                    )
                  })}
                </ul>

                <button
                  type="button"
                  className="lp-mdraw-arena"
                  onClick={() => { handleEnter(); closeMobile() }}
                >
                  <Swords size={16} aria-hidden="true" /> Enter Arena
                </button>
              </div>

              <div className="lp-mdraw-footer">
                {!user && (
                  <div className="lp-mobile-auth">
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
                  </div>
                )}

                {user && isGuest(user) && (
                  <div className="lp-mobile-auth">
                    <p className="lp-mobile-guest-note">
                      <span className="lp-mobile-guest-note__hl">Guest session</span> — your XP won't be saved permanently.
                    </p>
                    <RegisterCTA
                      className="lp-btn-primary lp-btn-primary--full"
                      icon={<UserPlus size={16} />}
                      onClick={closeMobile}
                    />
                  </div>
                )}

                <div className="lp-mobile-theme-row">
                  <span className="lp-mobile-theme-label">{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>
                  <button type="button" onClick={() => { toggleTheme(); closeMobile() }} className="lp-mobile-theme-btn">
                    {theme === 'dark' ? <><Sun size={15} /> Light</> : <><Moon size={15} /> Dark</>}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
