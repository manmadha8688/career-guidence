import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { guestLogin, submitFeedback } from '../api/api'
import toast from 'react-hot-toast'
import {
  Swords, BookOpen, Code2, Briefcase,
  ChevronRight, Trophy, Target,
  CheckCircle, ArrowRight, Zap, Ghost, Menu, X as XIcon,
  Sun, Moon,
} from 'lucide-react'

const DARK_C = {
  bg:        '#090E1C',
  bgCard:    '#0E1526',
  bgCard2:   '#131A2E',
  border:    'rgba(155, 110, 212, 0.18)',
  borderHov: 'rgba(155, 110, 212, 0.5)',
  primary:   '#9B6ED4',
  gold:      '#F59E0B',
  green:     '#4ADE80',
  blue:      '#60A5FA',
  text:      '#E2E8F0',
  muted:     '#64748B',
  sub:       '#8B9AB8',
  navBg:     'rgba(9,14,28,0.92)',
  mobileBg:  'rgba(9,14,28,0.98)',
}

const LIGHT_C = {
  bg:        '#E8EDF7',
  bgCard:    '#F4F7FF',
  bgCard2:   '#EEF3FF',
  border:    'rgba(124, 93, 187, 0.2)',
  borderHov: 'rgba(124, 93, 187, 0.5)',
  primary:   '#7C5DBB',
  gold:      '#B45309',
  green:     '#15803D',
  blue:      '#1D4ED8',
  text:      '#18244A',
  muted:     '#6B7FA3',
  sub:       '#384470',
  navBg:     'rgba(232,237,247,0.95)',
  mobileBg:  'rgba(232,237,247,0.99)',
}


const primaryBtn = {
  background: 'linear-gradient(135deg, #7C3AED, #9B6ED4)',
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  padding: '0.9rem 2rem',
  fontSize: '1rem',
  fontWeight: 700,
  cursor: 'pointer',
  boxShadow: '0 0 32px rgba(155,110,212,0.45), 0 4px 20px rgba(0,0,0,0.4)',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  letterSpacing: '0.01em',
  textDecoration: 'none',
}


const features = [
  { Icon: Swords,   iconD: '#C4B5FD', iconL: '#7C5DBB', label: 'Skills Arena',    status: 'Live',         statusColorD: '#4ADE80', statusColorL: '#15803D', statusBg: 'rgba(74,222,128,0.12)',       desc: 'Structured career roadmaps with concept-by-concept learning, real code examples, quizzes, and XP progression.', glow: 'rgba(155,110,212,0.15)', activeBorder: 'rgba(155,110,212,0.4)', isLive: true },
  { Icon: BookOpen, iconD: '#60A5FA', iconL: '#1D4ED8', label: 'Resume Builder',  status: 'Coming Soon',  statusColorD: '#64748B', statusColorL: '#64748B', statusBg: 'rgba(100,116,139,0.12)', desc: 'Auto-build a proof-of-skills resume from your learning journey and quiz performance.',                              glow: 'rgba(96,165,250,0.07)',  activeBorder: 'rgba(155,110,212,0.18)', isLive: false },
  { Icon: Code2,    iconD: '#0EA5E9', iconL: '#0284C7', label: 'Problem Solving',  status: 'Live',         statusColorD: '#4ADE80', statusColorL: '#15803D', statusBg: 'rgba(74,222,128,0.12)',       desc: 'Four learning tracks — Start Coding, Logic Building, Skill Up, and Interview Prep — with solutions in C, Python, Java, and C++.', glow: 'rgba(14,165,233,0.1)', activeBorder: 'rgba(14,165,233,0.25)', isLive: true, href: '/problem-solving' },
  { Icon: Briefcase,iconD: '#4ADE80', iconL: '#15803D', label: 'Jobs Board',      status: 'Coming Soon',  statusColorD: '#64748B', statusColorL: '#64748B', statusBg: 'rgba(100,116,139,0.12)', desc: 'Curated job listings matched to your skill level and completed roadmap badges.',                                   glow: 'rgba(74,222,128,0.07)',  activeBorder: 'rgba(155,110,212,0.18)', isLive: false },
]

const steps = [
  { num: '01', Icon: Target, iconD: '#C4B5FD', iconL: '#7C5DBB', title: 'Pick Your Roadmap',         colorD: '#9B6ED4', colorL: '#7C5DBB', desc: 'Choose a career path — Java Full Stack, MERN, Python, Frontend, Backend. Each is a structured sequence of subjects built around real job requirements.' },
  { num: '02', Icon: Zap,    iconD: '#60A5FA', iconL: '#1D4ED8', title: 'Learn Concept by Concept', colorD: '#60A5FA', colorL: '#1D4ED8', desc: 'Each concept has simple + technical explanations, syntax breakdowns, real code examples, and common mistakes. Learn at your own pace.' },
  { num: '03', Icon: Trophy, iconD: '#F59E0B', iconL: '#B45309', title: 'Earn XP. Prove Your Skills.', colorD: '#F59E0B', colorL: '#B45309', desc: 'Pass quizzes to earn XP and unlock badges. Your rank rises as you progress. Completed subjects become proof of skill on your resume.' },
]

const NAV_LINKS = [
  { label: 'Skills Arena', live: true },
  { label: 'Missions',     live: true, href: '/missions' },
  { label: 'Code GYM',    live: true, href: '/problem-solving' },
  { label: 'Resume', live: false },
  { label: 'Jobs', live: false },
  { label: 'Feedback', live: true, scrollTo: 'feedback' }
]

const PAIN_POINTS = [
  '"I have a degree but I\'m still not getting any interview calls."',
  '"There are thousands of courses online — I don\'t know where to even start."',
  '"Every job posting asks for 2 years of experience. I\'m a fresher."',
]

const PROOF_POINTS = [
  'Roadmaps built around real job requirements',
  'Learn concepts with examples, not just theory',
  'Quizzes prove you understand — not just watched',
  'XP + badges = proof of skill for your resume',
]

export default function LandingPage() {
  const { user, login, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const C = theme === 'light' ? LIGHT_C : DARK_C
  const lt = theme === 'light'
  const ghostBtn = {
    background: 'transparent',
    color: C.sub,
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    padding: '0.5rem 1.25rem',
    fontSize: '0.9rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'border-color 0.15s, color 0.15s',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
  }
  const navigate = useNavigate()
  const [hoveredStep, setHoveredStep] = useState(null)
  const [guestLoading, setGuestLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Feedback state
  const [fb, setFb] = useState({ rating: 0, experience: '', category: '', categoryNote: '', isUseful: null })
  const [fbHover, setFbHover] = useState(0)
  const [fbLoading, setFbLoading] = useState(false)
  const [fbDone, setFbDone] = useState(false)

  const handleEnter = () => navigate(user ? '/skill-arena/dashboard' : '/login?redirect=/skill-arena/dashboard')
  const scrollToHow = () => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })

  const handleGuest = async () => {
    setGuestLoading(true)
    try {
      const storedGuestId = localStorage.getItem('guest_device_id')
      const { data } = await guestLogin(storedGuestId)
      localStorage.setItem('guest_device_id', data.user.id)
      login(data.token, data.user)
      navigate('/')
    } catch {
      toast.error('Could not start guest session. Try again.')
    } finally {
      setGuestLoading(false)
    }
  }

  return (
    <div style={{
      background: 'var(--lp-bg)', minHeight: '100vh', color: C.text,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      overflowX: 'hidden',
    }}>

      {/* ── Navbar ─────────────────────────────────────────── */}
      <nav className="lp-navbar" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2rem', height: 64,
        background: 'var(--lp-nav-bg)', backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${C.border}`,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #7C3AED, #9B6ED4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(155,110,212,0.4)',
            flexShrink: 0,
          }}>
            <Swords size={16} color="#fff" />
          </div>
          <span className="lp-grad-text" style={{ fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.03em' }}>
            LearnToEarn
          </span>
        </div>

        {/* Section links */}
        <div className="lp-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '0.125rem' }}>
          {NAV_LINKS.map(link => (
            <div
              key={link.label}
              onClick={link.live ? (link.href ? () => navigate(link.href) : link.scrollTo ? () => document.getElementById(link.scrollTo)?.scrollIntoView({ behavior: 'smooth' }) : handleEnter) : undefined}
              style={{
                padding: '0.375rem 0.875rem', borderRadius: 6,
                fontSize: '0.875rem',
                color: link.live ? (theme === 'light' ? C.primary : '#C4B5FD') : C.muted,
                fontWeight: link.live ? 600 : 400,
                cursor: link.live ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', gap: '0.375rem',
              }}
            >
              {link.label}
              {link.live ? (
                <span style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: C.green, boxShadow: theme === 'light' ? 'none' : '0 0 6px #4ADE80',
                  display: 'inline-block',
                }} />
              ) : (
                <span style={{
                  fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.04em',
                  color: '#64748B', background: 'rgba(100,116,139,0.12)',
                  border: '1px solid rgba(100,116,139,0.2)',
                  padding: '0.05rem 0.35rem', borderRadius: 3,
                }}>
                  SOON
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Desktop auth */}
        <div className="lp-nav-auth" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
<button onClick={toggleTheme} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 8, color: C.sub, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0 }}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          {user ? (
            <>
              <button
                onClick={logout}
                className="lp-signout-btn"
                style={{ ...ghostBtn, fontSize: '0.8125rem', color: '#EF4444', borderColor: 'rgba(239,68,68,0.25)' }}
              >
                Sign Out
              </button>
              <button onClick={handleEnter} style={{ ...primaryBtn, padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
                Enter Arena <ChevronRight size={14} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login?redirect=/" style={ghostBtn}>Sign In</Link>
              <button onClick={handleEnter} style={{ ...primaryBtn, padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
                Get Started Free <ChevronRight size={14} />
              </button>
            </>
          )}
        </div>

        {/* Mobile: hamburger button (CSS shows only on mobile) */}
        <button
          className="lp-mob-menu-btn"
          onClick={() => setMobileMenuOpen(o => !o)}
          style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 8, color: theme === 'light' ? C.primary : '#C4B5FD', width: 38, height: 38, alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
        >
          {mobileMenuOpen ? <XIcon size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <>
          <div onClick={() => setMobileMenuOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 98, background: 'rgba(0,0,0,0.5)' }} />
          <div style={{ position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99, background: 'var(--lp-nav-bg)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${C.border}`, padding: '0.75rem 1rem 1.25rem' }}>
            {/* Nav links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem' }}>
              {NAV_LINKS.map(link => (
                <button key={link.label}
                  onClick={() => { if (link.live) { if (link.href) { navigate(link.href); setMobileMenuOpen(false) } else if (link.scrollTo) { document.getElementById(link.scrollTo)?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false) } else { handleEnter(); setMobileMenuOpen(false) } } }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0.875rem 1rem', background: 'transparent', border: 'none', borderRadius: 10, color: link.live ? (theme === 'light' ? C.primary : '#C4B5FD') : C.muted, fontWeight: link.live ? 700 : 400, fontSize: '1rem', cursor: link.live ? 'pointer' : 'default', textAlign: 'left', borderBottom: `1px solid ${C.border}` }}>
                  <span>{link.label}</span>
                  {link.live ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.72rem', color: C.green, fontWeight: 700 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.green, boxShadow: theme === 'light' ? 'none' : '0 0 6px #4ADE80', display: 'inline-block' }} /> LIVE
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.62rem', color: '#64748B', background: 'rgba(100,116,139,0.12)', border: '1px solid rgba(100,116,139,0.2)', padding: '0.1rem 0.45rem', borderRadius: 4, letterSpacing: '0.04em', fontWeight: 700 }}>SOON</span>
                  )}
                </button>
              ))}
            </div>
            {/* Auth buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {user ? (
                <>
                  <button onClick={() => { handleEnter(); setMobileMenuOpen(false) }}
                    style={{ ...primaryBtn, width: '100%', justifyContent: 'center', padding: '0.875rem' }}>
                    <Swords size={16} /> Enter Arena
                  </button>
                  <button onClick={logout}
                    style={{ ...ghostBtn, width: '100%', justifyContent: 'center', padding: '0.75rem', color: '#EF4444', borderColor: 'rgba(239,68,68,0.25)' }}>
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => { handleEnter(); setMobileMenuOpen(false) }}
                    style={{ ...primaryBtn, width: '100%', justifyContent: 'center', padding: '0.875rem' }}>
                    <Swords size={16} /> Get Started Free
                  </button>
                  <Link to="/login?redirect=/"
                    style={{ ...ghostBtn, width: '100%', justifyContent: 'center', padding: '0.75rem', textAlign: 'center' }}
                    onClick={() => setMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                  <button onClick={() => { handleGuest(); setMobileMenuOpen(false) }}
                    disabled={guestLoading}
                    style={{ ...ghostBtn, width: '100%', justifyContent: 'center', padding: '0.75rem' }}>
                    <Ghost size={14} /> {guestLoading ? 'Starting…' : 'Try as Guest'}
                  </button>
                </>
              )}
            </div>
            {/* Theme toggle row */}
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.875rem', color: C.sub }}>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>
              <button onClick={() => { toggleTheme(); setMobileMenuOpen(false) }}
                style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, color: C.sub, padding: '0.5rem 0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                {theme === 'dark' ? <><Sun size={15} /> Light</> : <><Moon size={15} /> Dark</>}
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Hero ───────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '7rem 1.5rem 5rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(155,110,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(155,110,212,0.04) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }} />
        {/* Radial glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 75% 65% at 50% 42%, rgba(155,110,212,0.12) 0%, transparent 70%)',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>

          {/* Live badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem', borderRadius: 999,
            border: `1px solid ${theme === 'light' ? 'rgba(21,128,61,0.3)' : 'rgba(74,222,128,0.3)'}`,
            background: theme === 'light' ? 'rgba(21,128,61,0.08)' : 'rgba(74,222,128,0.08)',
            fontSize: '0.775rem', fontWeight: 700, color: C.green,
            marginBottom: '2rem', letterSpacing: '0.06em',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: C.green, boxShadow: theme === 'light' ? 'none' : '0 0 8px #4ADE80',
              display: 'inline-block',
            }} />
            SKILLS ARENA IS LIVE — START FOR FREE
          </div>

          {/* Brand name */}
          <h1 className="lp-grad-text" style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 900, lineHeight: 1.05,
            letterSpacing: '-0.035em',
            margin: '0 0 0.75rem',
          }}>
            LearnToEarn
          </h1>

          {/* Tagline */}
          <p style={{
            fontSize: 'clamp(1.2rem, 2.8vw, 1.625rem)',
            fontWeight: 700, color: C.text,
            margin: '0 0 1.25rem',
            letterSpacing: '-0.01em',
          }}>
            Learn the skills. Earn the job.
          </p>

          {/* Sub description */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            color: C.sub, lineHeight: 1.8,
            maxWidth: 580, margin: '0 auto 2.75rem',
          }}>
            Start your journey toward your dream job. Discover the skills you need,
            learn where to begin, and follow clear roadmaps that guide you every step of the way.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleEnter}
              style={primaryBtn}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 48px rgba(155,110,212,0.65), 0 8px 32px rgba(0,0,0,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 0 32px rgba(155,110,212,0.45), 0 4px 20px rgba(0,0,0,0.4)' }}
            >
              <Swords size={18} />
              {user ? 'Go to Dashboard' : 'Enter Skills Arena'}
            </button>
            {!user && (
              <button
                onClick={handleGuest}
                disabled={guestLoading}
                style={ghostBtn}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(155,110,212,0.4)'; e.currentTarget.style.color = C.text }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.sub }}
              >
                <Ghost size={14} />
                {guestLoading ? 'Starting…' : 'Try as Guest'}
              </button>
            )}
          </div>

          {/* Scroll hint */}
          <div style={{ marginTop: '1.25rem' }}>
            <button
              onClick={scrollToHow}
              style={{ background: 'none', border: 'none', color: C.muted, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', margin: '0 auto' }}
            >
              See How It Works <ChevronRight size={12} />
            </button>
          </div>

          {/* Stats strip */}
          <div className="lp-stats-strip" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            marginTop: '4rem',
            background: C.bgCard, borderRadius: 16,
            border: `1px solid ${C.border}`, overflow: 'hidden',
          }}>
            {[
              ['3', 'Career Paths', C.primary],
              ['30+', 'Subjects', C.blue],
              ['100+', 'Concepts', C.green],
              ['XP', 'Rank System', C.gold],
            ].map(([val, label, color], i) => (
              <div key={label} style={{
                textAlign: 'center',
                padding: '1.25rem 0.75rem',
                borderRight: i < 3 ? `1px solid ${C.border}` : 'none',
              }}>
                <div style={{ fontSize: '1.625rem', fontWeight: 800, color }}>{val}</div>
                <div style={{ fontSize: '0.69rem', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pain Point ─────────────────────────────────────── */}
      <section style={{
        padding: '5rem 1.5rem',
        background: 'linear-gradient(180deg, transparent, rgba(155,110,212,0.04) 50%, transparent)',
      }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 0.625rem' }}>
              Sound familiar?
            </h2>
            <p style={{ color: C.sub, fontSize: '1rem', margin: 0 }}>
              Every year, thousands of Indian graduates face the same wall.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2.5rem' }}>
            {PAIN_POINTS.map((p, i) => (
              <div key={i} style={{
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: '1.125rem 1.5rem',
                display: 'flex', alignItems: 'flex-start', gap: '1rem',
              }}>
                <span style={{
                  fontSize: '1.75rem', lineHeight: 1, color: 'rgba(155,110,212,0.4)',
                  fontFamily: 'Georgia, serif', flexShrink: 0, marginTop: '-4px',
                }}>
                  "
                </span>
                <p style={{ color: C.sub, fontSize: '0.9375rem', fontStyle: 'italic', margin: 0, lineHeight: 1.65 }}>{p.slice(1, -1)}</p>
              </div>
            ))}
          </div>

          {/* Answer */}
          <div style={{
            padding: '1.875rem 2rem',
            background: 'linear-gradient(135deg, rgba(155,110,212,0.12), rgba(96,165,250,0.07))',
            border: `1px solid rgba(155,110,212,0.32)`,
            borderRadius: 16, textAlign: 'center',
          }}>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', fontWeight: 700, color: C.text, margin: '0 0 0.75rem', lineHeight: 1.45 }}>
              You don't need a degree from IIT.
            </p>
            <p className="lp-grad-text" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', fontWeight: 700, margin: '0 0 0.875rem', lineHeight: 1.45 }}>
              You need the right skills — learned in the right order.
            </p>
            <p style={{ color: C.sub, fontSize: '0.9rem', margin: 0, lineHeight: 1.7, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
              LearnToEarn gives you a clear roadmap so you always know what to learn next —
              and quizzes to prove you actually learned it.
            </p>
          </div>
        </div>
      </section>

      {/* ── Platform Sections ──────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{
            color: C.primary, fontWeight: 700, fontSize: '0.8rem',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem',
          }}>
            The Platform
          </p>
          <h2 className="lp-grad-text" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}>
            One Platform. Zero to Hired.
          </h2>
          <p style={{ color: C.sub, fontSize: '1rem', maxWidth: 460, margin: '0 auto' }}>
            Four powerful tools working together — learn, build, prove, and land the job.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
          {features.map(f => (
            <div
              key={f.label}
              onClick={f.isLive ? (f.href ? () => navigate(f.href) : handleEnter) : undefined}
              style={{
                background: C.bgCard,
                border: `1px solid ${f.activeBorder}`,
                borderRadius: 16, padding: '1.75rem',
                position: 'relative', overflow: 'hidden',
                transition: 'transform 0.2s, border-color 0.2s',
                cursor: f.isLive ? 'pointer' : 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = C.borderHov }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = f.activeBorder }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(ellipse at top left, ${f.glow}, transparent 55%)`,
                pointerEvents: 'none',
              }} />
              <div style={{ position: 'relative' }}>
                <div style={{ marginBottom: '1.25rem' }}><f.Icon size={30} color={lt ? f.iconL : f.iconD} /></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.0625rem' }}>{f.label}</span>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 700,
                    padding: '0.15rem 0.5rem', borderRadius: 999,
                    background: f.statusBg, color: lt ? f.statusColorL : f.statusColorD,
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>
                    {f.status}
                  </span>
                </div>
                <p style={{ color: C.sub, fontSize: '0.875rem', lineHeight: 1.7, margin: '0 0 1.25rem' }}>
                  {f.desc}
                </p>
                {f.isLive && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.375rem',
                    color: f.href ? '#0EA5E9' : (lt ? C.primary : '#C4B5FD'), fontSize: '0.875rem', fontWeight: 600,
                  }}>
                    {f.href ? 'Start Solving' : 'Enter Arena'} <ArrowRight size={14} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Missions Section ───────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>

          {/* Label */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: lt ? '#7C3500' : '#FF7F2A', fontWeight: 700, fontSize: '0.78rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              background: lt ? 'rgba(120,50,0,0.07)' : 'rgba(255,127,42,0.08)',
              border: `1px solid ${lt ? 'rgba(120,50,0,0.2)' : 'rgba(255,127,42,0.2)'}`,
              borderRadius: 20, padding: '0.3rem 0.9rem',
            }}>
              ⚔ NEW — Mission Board
            </span>
          </div>

          {/* 2-col layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '2.5rem', alignItems: 'center', marginBottom: '2.5rem',
          }}>
            {/* Left — headline + CTA */}
            <div>
              <h2 style={{
                fontSize: 'clamp(1.875rem, 4vw, 2.75rem)', fontWeight: 800,
                letterSpacing: '-0.025em', lineHeight: 1.15,
                color: C.text, margin: '0 0 1.25rem',
              }}>
                Tutorials teach you.<br />
                <span style={{
                  background: lt
                    ? 'linear-gradient(135deg, #7C3500, #B06030)'
                    : 'linear-gradient(135deg, #FF6B00, #FFB347)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Missions prove you.
                </span>
              </h2>
              <p style={{ color: C.sub, fontSize: '1.0625rem', lineHeight: 1.8, margin: '0 0 2rem', maxWidth: 400 }}>
                We've built a collection of real-world project challenges.
                Accept a mission, build something that actually works, and prove your skills beyond theory.
              </p>
              <button
                onClick={() => navigate('/missions')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: lt
                    ? 'linear-gradient(135deg, #7C3500, #A04500)'
                    : 'linear-gradient(135deg, #FF6B00, #FF7F2A)',
                  border: 'none', borderRadius: 8,
                  padding: '0.75rem 1.75rem',
                  color: '#fff', fontWeight: 700, fontSize: '0.9375rem',
                  cursor: 'pointer',
                  boxShadow: lt ? '0 4px 20px rgba(120,50,0,0.3)' : '0 4px 24px rgba(255,127,42,0.4)',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = lt ? '0 8px 28px rgba(120,50,0,0.45)' : '0 8px 32px rgba(255,127,42,0.6)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = lt ? '0 4px 20px rgba(120,50,0,0.3)' : '0 4px 24px rgba(255,127,42,0.4)' }}
              >
                ⚔ Explore Missions
              </button>
            </div>

            {/* Right — 3 feature cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[
                { icon: '🎯', title: 'Project-based practice', body: 'Every mission is a complete project you build from scratch — not a drill, a real thing.' },
                { icon: '🗺️', title: 'Clear objectives & hints', body: "Know exactly what to build. Stuck? Unlock hints one at a time without spoiling the answer." },
                { icon: '📈', title: 'Matched to your skills', body: 'Missions span beginner to advanced — always something challenging but achievable.' },
              ].map((card, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '1rem', alignItems: 'flex-start',
                  padding: '1.125rem 1.25rem',
                  background: lt
                    ? i === 0 ? 'rgba(255,127,42,0.06)' : 'rgba(255,255,255,0.55)'
                    : i === 0 ? 'rgba(255,127,42,0.07)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${lt
                    ? i === 0 ? 'rgba(120,50,0,0.18)' : 'rgba(0,0,0,0.07)'
                    : i === 0 ? 'rgba(255,127,42,0.2)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 12,
                  transition: 'transform 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >
                  <span style={{ fontSize: '1.375rem', flexShrink: 0 }}>{card.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: C.text, marginBottom: '0.25rem' }}>{card.title}</div>
                    <p style={{ color: C.sub, fontSize: '0.8375rem', lineHeight: 1.65, margin: 0 }}>{card.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: lt ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
            borderRadius: 14, overflow: 'hidden',
          }}>
            {[
              { number: '20+', label: 'Missions' },
              { number: '4',   label: 'Technologies' },
              { number: '∞',   label: 'Ways to solve' },
            ].map((s, i) => (
              <div key={i} style={{
                textAlign: 'center', padding: '1.25rem 0.5rem',
                background: lt ? 'rgba(255,255,255,0.7)' : 'rgba(13,17,32,0.5)',
              }}>
                <div style={{
                  fontFamily: "'Orbitron', sans-serif", fontWeight: 900,
                  fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                  color: lt ? '#8C4200' : '#FF7F2A', marginBottom: '0.25rem',
                }}>
                  {s.number}
                </div>
                <div style={{ color: C.muted, fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)' }}>{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Problem Solving Section ────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>

          {/* Label */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: lt ? '#0284C7' : '#0EA5E9', fontWeight: 700, fontSize: '0.78rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              background: lt ? 'rgba(2,132,199,0.07)' : 'rgba(14,165,233,0.08)',
              border: `1px solid ${lt ? 'rgba(2,132,199,0.2)' : 'rgba(14,165,233,0.2)'}`,
              borderRadius: 20, padding: '0.3rem 0.9rem',
            }}>
              💻 NEW — Problem Solving
            </span>
          </div>

          {/* 2-col layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '2.5rem', alignItems: 'center', marginBottom: '2.5rem',
          }}>
            {/* Left — headline + CTA */}
            <div>
              <h2 style={{
                fontSize: 'clamp(1.875rem, 4vw, 2.75rem)', fontWeight: 800,
                letterSpacing: '-0.025em', lineHeight: 1.15,
                color: C.text, margin: '0 0 1.25rem',
              }}>
                Know the code.<br />
                <span style={{
                  background: lt
                    ? 'linear-gradient(135deg, #0284C7, #0369A1)'
                    : 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Crack the interview.
                </span>
              </h2>
              <p style={{ color: C.sub, fontSize: '1.0625rem', lineHeight: 1.8, margin: '0 0 2rem', maxWidth: 420 }}>
                Four tracks built for every type of learner — from writing your first print statement to solving questions asked at Amazon and Google.
                Every problem shows brute force to optimized in four languages.
              </p>
              <button
                onClick={() => navigate('/problem-solving')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: lt
                    ? 'linear-gradient(135deg, #0284C7, #0369A1)'
                    : 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
                  border: 'none', borderRadius: 8,
                  padding: '0.75rem 1.75rem',
                  color: '#fff', fontWeight: 700, fontSize: '0.9375rem',
                  cursor: 'pointer',
                  boxShadow: lt ? '0 4px 20px rgba(2,132,199,0.3)' : '0 4px 24px rgba(14,165,233,0.35)',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = lt ? '0 8px 28px rgba(2,132,199,0.45)' : '0 8px 32px rgba(14,165,233,0.55)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = lt ? '0 4px 20px rgba(2,132,199,0.3)' : '0 4px 24px rgba(14,165,233,0.35)' }}
              >
                💻 Start Solving — Free
              </button>
            </div>

            {/* Right — 4 track cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px,100%), 1fr))', gap: '0.75rem' }}>
              {[
                { icon: '💻', title: 'Start Coding',    color: '#22C55E', href: '/problem-solving/start-coding',   desc: 'Never coded before? Begin here. Step-by-step from Hello World to functions.' },
                { icon: '🧠', title: 'Logic Building',  color: '#F59E0B', href: '/problem-solving/logic-building', desc: "Can code but can't solve problems? Train your problem-solving mind." },
                { icon: '⚡', title: 'Skill Up',         color: '#0EA5E9', href: '/problem-solving/skill-up',       desc: 'Arrays, strings, searching — same problem, 4 languages, brute to optimized.' },
                { icon: '💼', title: 'Interview Prep',  color: '#EF4444', href: '/problem-solving/interview-prep', desc: 'Most-asked questions from Amazon, Google, TCS, and more. All levels.' },
              ].map((track, i) => (
                <div key={i}
                  onClick={() => navigate(track.href)}
                  style={{
                    padding: '1.125rem 1rem',
                    background: lt ? 'rgba(255,255,255,0.7)' : `${track.color}08`,
                    border: `1px solid ${lt ? `${track.color}25` : `${track.color}22`}`,
                    borderTop: `3px solid ${track.color}`,
                    borderRadius: 12, cursor: 'pointer',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 6px 20px ${track.color}20` }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ fontSize: '1.375rem', marginBottom: '0.4rem' }}>{track.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: track.color, marginBottom: '0.35rem' }}>{track.title}</div>
                  <p style={{ color: C.sub, fontSize: '0.78rem', lineHeight: 1.55, margin: 0 }}>{track.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: lt ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
            borderRadius: 14, overflow: 'hidden',
          }}>
            {[
              { number: '35+', label: 'Problems & growing' },
              { number: '4',   label: 'Languages' },
              { number: '3',   label: 'Approaches each' },
            ].map((s, i) => (
              <div key={i} style={{
                textAlign: 'center', padding: '1.25rem 0.5rem',
                background: lt ? 'rgba(255,255,255,0.7)' : 'rgba(13,17,32,0.5)',
              }}>
                <div style={{
                  fontFamily: "'Orbitron', sans-serif", fontWeight: 900,
                  fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                  color: lt ? '#0284C7' : '#0EA5E9', marginBottom: '0.25rem',
                }}>
                  {s.number}
                </div>
                <div style={{ color: C.muted, fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)' }}>{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────── */}
      <section id="how-it-works" style={{
        padding: '5rem 1.5rem',
        background: 'linear-gradient(180deg, transparent, rgba(155,110,212,0.04) 50%, transparent)',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{
              color: C.primary, fontWeight: 700, fontSize: '0.8rem',
              letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem',
            }}>
              The Journey
            </p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 0.75rem', color: C.text }}>
              Learn. Plan. Get Hired.
            </h2>
            <p style={{ color: C.sub, fontSize: '1rem', maxWidth: 480, margin: '0 auto' }}>
              Follow skill roadmaps that show you exactly where to start and what to learn next.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {steps.map((step, i) => (
              <div
                key={step.num}
                style={{
                  background: C.bgCard,
                  border: `1px solid ${hoveredStep === i ? (lt ? step.colorL : step.colorD) + '55' : C.border}`,
                  borderRadius: 16, padding: '2rem 1.75rem',
                  transition: 'transform 0.2s, border-color 0.2s',
                  transform: hoveredStep === i ? 'translateY(-4px)' : 'none',
                  position: 'relative', overflow: 'hidden',
                  cursor: 'default',
                }}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {hoveredStep === i && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `radial-gradient(ellipse at top left, ${lt ? step.colorL : step.colorD}18, transparent 55%)`,
                    pointerEvents: 'none',
                  }} />
                )}
                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.25rem' }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 12,
                      background: `${lt ? step.colorL : step.colorD}18`,
                      border: `1px solid ${lt ? step.colorL : step.colorD}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <step.Icon size={22} color={lt ? step.iconL : step.iconD} />
                    </div>
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 800,
                      color: lt ? step.colorL : step.colorD, letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}>
                      STEP {step.num}
                    </span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem', color: C.text }}>
                    {step.title}
                  </h3>
                  <p style={{ color: C.sub, fontSize: '0.875rem', lineHeight: 1.75, margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / Mission ──────────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem 7rem' }}>
        <div style={{
          maxWidth: 860, margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(155,110,212,0.1) 0%, rgba(96,165,250,0.06) 100%)',
          border: `1px solid rgba(155,110,212,0.3)`,
          borderRadius: 24,
          padding: 'clamp(2rem, 5vw, 4rem)',
          textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(155,110,212,0.14), transparent 60%)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative' }}>

            <div style={{
              width: 52, height: 52, borderRadius: 14, margin: '0 auto 1.5rem',
              background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(155,110,212,0.2))',
              border: '1px solid rgba(155,110,212,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Target size={24} color="#C4B5FD" />
            </div>

            <h2 className="lp-grad-text" style={{
              fontSize: 'clamp(1.625rem, 4vw, 2.5rem)',
              fontWeight: 800, letterSpacing: '-0.025em',
              marginBottom: '1rem', lineHeight: 1.2,
            }}>
              "Learn. Plan. Get Hired."
            </h2>

            <p style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              color: C.sub, lineHeight: 1.8,
              maxWidth: 560, margin: '0 auto 2.5rem',
            }}>
              Follow skill roadmaps that show you exactly where to start and what to learn next.
              Every concept you master is a step closer to your first — or next — job offer.
            </p>

            {/* Proof checklist */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '0.625rem',
              alignItems: 'center', marginBottom: '2.5rem',
            }}>
              {PROOF_POINTS.map(item => (
                <div key={item} style={{
                  display: 'flex', alignItems: 'center',
                  gap: '0.625rem', color: C.sub, fontSize: '0.9375rem',
                }}>
                  <CheckCircle size={16} color={C.green} />
                  {item}
                </div>
              ))}
            </div>

            <button
              onClick={handleEnter}
              style={primaryBtn}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 48px rgba(155,110,212,0.65), 0 8px 32px rgba(0,0,0,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 0 32px rgba(155,110,212,0.45), 0 4px 20px rgba(0,0,0,0.4)' }}
            >
              <Swords size={18} />
              {user ? 'Continue Your Journey' : 'Start Your Journey — Free'}
            </button>
          </div>
        </div>
      </section>

      {/* ── Feedback ───────────────────────────────────────── */}
      <section id="feedback" style={{ padding: '4rem 1.5rem', background: 'linear-gradient(180deg, transparent, rgba(155,110,212,0.04) 50%, transparent)' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{ color: C.primary, fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Your Voice</p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 800, letterSpacing: '-0.02em', color: C.text, margin: '0 0 0.5rem' }}>Share Your Experience</h2>
            <p style={{ color: C.sub, fontSize: '0.9rem', margin: 0 }}>Help us improve LearnToEarn for every student.</p>
          </div>

          {fbDone ? (
            <div style={{ textAlign: 'center', padding: '2.5rem', background: C.bgCard, border: `1px solid ${theme === 'light' ? 'rgba(21,128,61,0.25)' : 'rgba(74,222,128,0.25)'}`, borderRadius: 20 }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎉</div>
              <div style={{ fontWeight: 700, fontSize: '1.125rem', color: C.green, marginBottom: '0.375rem' }}>Thank you for your feedback!</div>
              <div style={{ color: C.muted, fontSize: '0.875rem' }}>Your response helps us build a better platform.</div>
            </div>
          ) : (
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 20, padding: 'clamp(1.5rem, 4vw, 2.25rem)' }}>

              {/* Star Rating */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: C.sub, marginBottom: '0.625rem' }}>Overall Rating</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[1,2,3,4,5].map(star => (
                    <button key={star}
                      onClick={() => setFb(p => ({ ...p, rating: star }))}
                      onMouseEnter={() => setFbHover(star)}
                      onMouseLeave={() => setFbHover(0)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', fontSize: '2rem', lineHeight: 1, transition: 'transform 0.1s', transform: (fbHover || fb.rating) >= star ? 'scale(1.15)' : 'scale(1)' }}>
                      <span style={{ color: (fbHover || fb.rating) >= star ? '#F59E0B' : (theme === 'light' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)') }}>★</span>
                    </button>
                  ))}
                  {fb.rating > 0 && (
                    <span style={{ alignSelf: 'center', marginLeft: '0.5rem', fontSize: '0.8rem', color: C.muted }}>
                      {['','Poor','Fair','Good','Great','Excellent'][fb.rating]}
                    </span>
                  )}
                </div>
              </div>

              {/* Your Experience */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: C.sub, marginBottom: '0.5rem' }}>Your Experience</div>
                <textarea
                  placeholder="Tell us what you loved, what was confusing, or what you'd like to see improved…"
                  value={fb.experience}
                  onChange={e => setFb(p => ({ ...p, experience: e.target.value }))}
                  rows={4}
                  style={{ width: '100%', padding: '0.75rem 1rem', background: C.bgCard, border: `1.5px solid ${C.border}`, borderRadius: 10, color: C.text, fontSize: '0.9rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.65, boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(155,110,212,0.55)'}
                  onBlur={e => e.target.style.borderColor = C.border}
                />
              </div>

              {/* Category dropdown (optional) → opens specific textarea on select */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: C.sub, marginBottom: '0.5rem' }}>
                  Category <span style={{ color: C.muted, fontWeight: 400 }}>(optional)</span>
                </div>
                <select
                  value={fb.category}
                  onChange={e => setFb(p => ({ ...p, category: e.target.value, categoryNote: '' }))}
                  style={{ width: '100%', padding: '0.75rem 1rem', background: C.bgCard, border: `1.5px solid ${C.border}`, borderRadius: 10, color: fb.category ? C.text : C.muted, fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(155,110,212,0.55)'}
                  onBlur={e => e.target.style.borderColor = C.border}
                >
                  <option value="" style={{ background: C.bgCard, color: C.muted }}>— Select a category —</option>
                  <option value="Bug"        style={{ background: C.bgCard, color: C.text }}>🐛 Bug</option>
                  <option value="Suggestion" style={{ background: C.bgCard, color: C.text }}>💡 Suggestion</option>
                  <option value="Content"    style={{ background: C.bgCard, color: C.text }}>📚 Content</option>
                  <option value="Other"      style={{ background: C.bgCard, color: C.text }}>💬 Other</option>
                </select>

                {/* Specific textarea appears after category selection */}
                {fb.category && (
                  <textarea
                    autoFocus
                    placeholder={
                      fb.category === 'Bug'        ? 'Describe the bug — what happened and how to reproduce it…' :
                      fb.category === 'Suggestion' ? 'What would you like us to add or improve?…' :
                      fb.category === 'Content'    ? 'Which concept, quiz, or roadmap needs improvement?…' :
                                                     'Anything else you would like to share…'
                    }
                    value={fb.categoryNote || ''}
                    onChange={e => setFb(p => ({ ...p, categoryNote: e.target.value }))}
                    rows={3}
                    style={{ width: '100%', marginTop: '0.625rem', padding: '0.75rem 1rem', background: C.bgCard, border: `1.5px solid rgba(155,110,212,0.4)`, borderRadius: 10, color: C.text, fontSize: '0.875rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.65, boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(155,110,212,0.65)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(155,110,212,0.4)'}
                  />
                )}
              </div>

              {/* Useful? */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: C.sub, marginBottom: '0.625rem' }}>Was LearnToEarn useful to you?</div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {[{ val: true, label: '👍 Yes, definitely', color: '#4ADE80' }, { val: false, label: '👎 Not really', color: '#EF4444' }].map(opt => (
                    <button key={String(opt.val)}
                      onClick={() => setFb(p => ({ ...p, isUseful: p.isUseful === opt.val ? null : opt.val }))}
                      style={{ flex: 1, padding: '0.7rem', borderRadius: 10, border: `1.5px solid ${fb.isUseful === opt.val ? opt.color + '80' : C.border}`, background: fb.isUseful === opt.val ? opt.color + '12' : 'transparent', color: fb.isUseful === opt.val ? opt.color : C.muted, fontSize: '0.875rem', fontWeight: fb.isUseful === opt.val ? 700 : 400, cursor: 'pointer', transition: 'all 0.15s' }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                disabled={fbLoading || fb.rating === 0}
                onClick={async () => {
                  if (fb.rating === 0) { toast.error('Please give a star rating'); return }
                  setFbLoading(true)
                  try {
                    await submitFeedback({ rating: fb.rating, experience: fb.experience, category: fb.category || null, categoryNote: fb.categoryNote || null, isUseful: fb.isUseful })
                    setFbDone(true)
                  } catch { toast.error('Could not submit feedback. Try again.') }
                  finally { setFbLoading(false) }
                }}
                style={{ width: '100%', padding: '0.9rem', borderRadius: 10, border: 'none', background: fb.rating === 0 ? 'rgba(155,110,212,0.2)' : 'linear-gradient(135deg, #7C3AED, #9B6ED4)', color: fb.rating === 0 ? C.muted : '#fff', fontSize: '1rem', fontWeight: 700, cursor: fb.rating === 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'opacity 0.15s', opacity: fbLoading ? 0.75 : 1, fontFamily: 'inherit' }}>
                {fbLoading ? <><span className="loading-spinner" style={{ width: 18, height: 18 }} /> Submitting…</> : 'Submit Feedback'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="lp-footer" style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '1.75rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Swords size={15} color="#9B6ED4" />
          <span className="lp-grad-text" style={{ fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.04em' }}>
            LearnToEarn
          </span>
        </div>
        <span style={{ fontSize: '0.8rem', color: C.muted }}>
          Learn the skills. Earn the job.
        </span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {NAV_LINKS.map(link => (
            <span
              key={link.label}
              onClick={link.live ? (link.href ? () => navigate(link.href) : link.scrollTo ? () => document.getElementById(link.scrollTo)?.scrollIntoView({ behavior: 'smooth' }) : handleEnter) : undefined}
              style={{
                fontSize: '0.8rem',
                color: link.live ? C.sub : C.muted,
                cursor: link.live ? 'pointer' : 'default',
              }}
            >
              {link.label}
            </span>
          ))}
        </div>
      </footer>
    </div>
  )
}
