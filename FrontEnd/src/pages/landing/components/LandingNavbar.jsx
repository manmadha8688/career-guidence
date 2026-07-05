import { Link } from 'react-router-dom'
import { Swords, Ghost, Menu, X as XIcon, Sun, Moon, ChevronRight } from 'lucide-react'
import { NAV_LINKS } from '../landingData'
import { useLanding } from '../context/LandingPageContext'
import { LandingProfileDropdown } from './LandingProfileMenu'

export default function LandingNavbar() {
  const {
    theme, toggleTheme, user, logout,
    navigate, handleEnter, handleGuest, guestLoading,
    mobileMenuOpen, setMobileMenuOpen,
  } = useLanding()

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
      <nav className="lp-navbar">
        <div className="lp-navbar__brand">
          <div className="lp-navbar__logo">
            <Swords size={16} color="#fff" />
          </div>
          <span className="lp-grad-text lp-navbar__title">learnforearn</span>
        </div>

        <div className="lp-nav-links">
          {NAV_LINKS.map(link => (
            <div
              key={link.label}
              className={`lp-nav-link${link.live ? ' lp-nav-link--live' : ''}`}
              onClick={onNavLink(link)}
            >
              {link.label}
              {!link.live && <span className="lp-nav-soon-badge">SOON</span>}
            </div>
          ))}
        </div>

        <div className="lp-navbar__end">
          <div className="lp-nav-auth">
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
                  <Link to="/register" className="lp-btn-primary lp-btn-primary--full" onClick={closeMobile}>
                    <Swords size={16} /> Sign up
                  </Link>
                  <Link to="/login?redirect=/" className="lp-btn-ghost lp-btn-ghost--full" onClick={closeMobile}>
                    Sign In
                  </Link>
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
