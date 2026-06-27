import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { guestLogin } from '../api/api'
import axios from 'axios'
import toast from 'react-hot-toast'
import '../styles/landing-animations.css'
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
  { Icon: Swords,   iconD: '#C4B5FD', iconL: '#7C5DBB', label: 'Skills Arena',    status: '',         statusColorD: '#4ADE80', statusColorL: '#15803D', statusBg: 'rgba(74,222,128,0.12)',       desc: 'Structured career roadmaps with concept-by-concept learning, real code examples, quizzes, and XP progression.', glow: 'rgba(155,110,212,0.15)', activeBorder: 'rgba(155,110,212,0.4)', isLive: true },
  { Icon: Code2,    iconD: '#0EA5E9', iconL: '#0284C7', label: 'Problem Solving',  status: '',         statusColorD: '#4ADE80', statusColorL: '#15803D', statusBg: 'rgba(74,222,128,0.12)',       desc: 'Five learning tracks — Start Coding, Logic Building, Skill Up, Interview Prep, and Scenario Coding — with solutions in C, Python, Java, and C++.', glow: 'rgba(14,165,233,0.1)', activeBorder: 'rgba(14,165,233,0.25)', isLive: true, href: '/problem-solving' },
  { Icon: Briefcase,iconD: '#4ADE80', iconL: '#15803D', label: 'Walk-In Jobs',    status: '',         statusColorD: '#4ADE80', statusColorL: '#15803D', statusBg: 'rgba(74,222,128,0.12)',       desc: 'Live walk-in interview updates posted by students and community. Find opportunities near you.',              glow: 'rgba(74,222,128,0.12)', activeBorder: 'rgba(74,222,128,0.3)',   isLive: true,  href: '/walk-ins', cta: 'View Walk-Ins' },
  { Icon: Zap,      iconD: '#00D9FF', iconL: '#0284C7', label: 'AI Lab',          status: '',         statusColorD: '#4ADE80', statusColorL: '#15803D', statusBg: 'rgba(74,222,128,0.12)',       desc: 'Explore every AI tool a developer needs — ChatGPT, Copilot, LangChain, CrewAI, automation, and more. With free tutorials.',  glow: 'rgba(0,217,255,0.1)',   activeBorder: 'rgba(0,217,255,0.35)',  isLive: true,  href: '/ai-lab', cta: 'Explore AI Tools' },
]

const steps = [
  { num: '01', Icon: Target, iconD: '#C4B5FD', iconL: '#7C5DBB', title: 'Pick Your Roadmap',         colorD: '#9B6ED4', colorL: '#7C5DBB', desc: 'Choose a career path — Java Full Stack, MERN, Python, Frontend, Backend. Each is a structured sequence of subjects built around real job requirements.' },
  { num: '02', Icon: Zap,    iconD: '#60A5FA', iconL: '#1D4ED8', title: 'Learn Concept by Concept', colorD: '#60A5FA', colorL: '#1D4ED8', desc: 'Each concept has simple + technical explanations, syntax breakdowns, real code examples, and common mistakes. Learn at your own pace.' },
  { num: '03', Icon: Trophy, iconD: '#F59E0B', iconL: '#B45309', title: 'Earn XP. Prove Your Skills.', colorD: '#F59E0B', colorL: '#B45309', desc: 'Pass quizzes to earn XP and unlock badges. Your rank rises as you progress. Completed subjects become proof of skill on your resume.' },
]

const NAV_LINKS = [
  { label: 'Missions',          live: true, href: '/missions' },
  { label: 'Code GYM',         live: true, href: '/problem-solving' },
  { label: 'Walk-Ins',         live: true, href: '/walk-ins' },
  { label: 'AI Lab',           live: true, href: '/ai-lab' },
  { label: 'Deploy Guidance',  live: true, href: '/deployment' },
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
  const [platformStats, setPlatformStats] = useState({ subjects: '9', concepts: '130+', paths: '3' })


  // ── Scroll reveal (IntersectionObserver) ──────────────
  useEffect(() => {
    const els = document.querySelectorAll('.lp-reveal, .lp-reveal-left, .lp-reveal-right')
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('lp-visible'); io.unobserve(e.target) } }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // ── Scramble text effect ───────────────────────────────
  const scrambleRef = useRef(null)
  useEffect(() => {
    const el = scrambleRef.current
    if (!el) return
    const original = el.textContent
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%'
    let iterations = 0
    const interval = setInterval(() => {
      el.textContent = original.split('').map((ch, i) => {
        if (i < iterations) return original[i]
        return ch === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]
      }).join('')
      iterations += 0.4
      if (iterations >= original.length) { el.textContent = original; clearInterval(interval) }
    }, 30)
    return () => clearInterval(interval)
  }, [])

  // ── Count-up numbers ──────────────────────────────────
  const countUpRef = useRef(null)
  const countedRef = useRef(false)
  useEffect(() => {
    if (!countUpRef.current || countedRef.current) return
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      countedRef.current = true
      io.disconnect()
      const items = countUpRef.current.querySelectorAll('[data-target]')
      items.forEach(item => {
        const target = item.getAttribute('data-target')
        const isNum = /^\d+$/.test(target)
        if (!isNum) return
        const end = parseInt(target)
        let start = 0
        const duration = 1800
        const step = Math.ceil(end / (duration / 16))
        const timer = setInterval(() => {
          start = Math.min(start + step, end)
          item.textContent = start + (item.dataset.suffix || '')
          if (start >= end) clearInterval(timer)
        }, 16)
      })
    }, { threshold: 0.3 })
    io.observe(countUpRef.current)
    return () => io.disconnect()
  }, [platformStats])


  useEffect(() => {
    const base = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
    axios.get(`${base}/public-stats`)
      .then(r => {
        const { subjectCount, conceptCount, roadmapCount } = r.data
        if (subjectCount > 0) setPlatformStats({
          subjects: String(subjectCount),
          concepts: `${conceptCount}+`,
          paths:    String(roadmapCount),
        })
      })
      .catch(() => {})
  }, [])

  const handleEnter = () => navigate(user ? '/skill-arena/dashboard' : '/login?redirect=/skill-arena/dashboard')

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

      {/* ══════════════════════════════════════════════════
          HERO — clean, focused, student-first
          ══════════════════════════════════════════════════ */}
      <section className="lp-hero-section">

        {/* ── Background ── */}
        <div className="lp-hero-bg" />
        <div className="lp-aurora lp-aurora-1" />
        <div className="lp-aurora lp-aurora-2" />
        <div className="lp-hero-noise" />
        <div className="lp-hero-fade-bottom" style={{
          background: `linear-gradient(to bottom, transparent 60%, ${lt ? '#E8EDF7' : '#090E1C'} 100%)`
        }} />

        {/* ── Floating skill badges (background decoration) ── */}
        <div className="lp-skill-badges" aria-hidden="true">
          {[
            { label:'Python',     color:'#4ADE80', x:'8%',  y:'22%', delay:'0s',   dur:'6s'  },
            { label:'DSA',        color:'#C4B5FD', x:'88%', y:'18%', delay:'0.8s', dur:'7s'  },
            { label:'Java',       color:'#F59E0B', x:'6%',  y:'70%', delay:'1.2s', dur:'5.5s'},
            { label:'React',      color:'#38BDF8', x:'85%', y:'65%', delay:'0.4s', dur:'6.5s'},
            { label:'SQL',        color:'#A78BFA', x:'14%', y:'45%', delay:'2s',   dur:'7.5s'},
            { label:'Node.js',    color:'#86EFAC', x:'80%', y:'42%', delay:'1.6s', dur:'5s'  },
            { label:'Spring Boot',color:'#FCA5A5', x:'20%', y:'82%', delay:'0.6s', dur:'8s'  },
            { label:'Git',        color:'#FCD34D', x:'75%', y:'80%', delay:'1.8s', dur:'6s'  },
          ].map((s,i) => (
            <div key={i} className="lp-skill-pill" style={{
              left: s.x, top: s.y,
              color: s.color,
              borderColor: `${s.color}40`,
              background: `${s.color}0d`,
              animationDelay: s.delay,
              animationDuration: s.dur,
            }}>
              {s.label}
            </div>
          ))}
        </div>

        {/* ── Main content — centered ── */}
        <div className="lp-hero-center">

          {/* Live badge */}
          <div className="lp-hero-eyebrow lp-hero-title">
            <span className="lp-eyebrow-dot" />
            Skills Arena · Code GYM · Mission Board — Free
          </div>

          {/* Tagline */}
          <p className="lp-hero-tagline-cap lp-hero-title" style={{ animationDelay: '0.1s' }}>
            Learn the skills. Earn the job.
          </p>

          {/* Headline with rotating job title */}
          <h1 className="lp-hero-headline-v2 lp-hero-title" style={{ color: C.text, animationDelay: '0.2s' }}>
            Your path to becoming a<br />
            <span className="lp-job-rotate" style={{ display: 'block', minHeight: '1.15em' }}>
              <span className="lp-job-word lp-job-1 lp-grad-text">Python Developer</span>
              <span className="lp-job-word lp-job-2 lp-grad-blue">Full Stack Dev</span>
              <span className="lp-job-word lp-job-3 lp-grad-orange">Data Analyst</span>
              <span className="lp-job-word lp-job-4 lp-grad-text">Backend Engineer</span>
            </span>
          </h1>

          {/* Sub description */}
          <p className="lp-hero-desc-v2 lp-hero-sub" style={{ color: C.sub, animationDelay: '0.38s' }}>
            Structured career roadmaps, real coding problems, and project missions —<br className="lp-br-desktop" />
            everything an Indian fresher needs to land their first tech job.
          </p>

          {/* CTAs */}
          <div className="lp-hero-actions lp-hero-ctas" style={{ justifyContent: 'center' }}>
            <button
              onClick={handleEnter}
              className="lp-btn-primary lp-cta-pulse"
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 0 60px rgba(155,110,212,0.8), 0 8px 32px rgba(0,0,0,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              <Swords size={17} />
              {user ? 'Go to Dashboard' : 'Start Learning — Free'}
            </button>
            <button
              onClick={() => navigate('/fresher-instructions')}
              className="lp-btn-ghost"
              style={{ color: lt ? '#6366F1' : '#818CF8', borderColor: 'rgba(99,102,241,0.35)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)' }}
              onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)' }}
            >
              🎓 Fresher? Read this first
            </button>
            {!user && (
              <button
                onClick={handleGuest}
                disabled={guestLoading}
                className="lp-btn-ghost"
                style={{ color: C.sub, borderColor: C.border }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(155,110,212,0.4)'; e.currentTarget.style.color = C.text }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.sub }}
              >
                <Ghost size={14} /> {guestLoading ? 'Starting…' : 'Try as Guest'}
              </button>
            )}
          </div>

          {/* Stats */}
          <div ref={countUpRef} className="lp-hero-stats-row lp-hero-stats">
            {[
              [platformStats.paths,    'Career Paths',  C.primary, /^\d+$/.test(platformStats.paths) ? platformStats.paths : null, ''],
              [platformStats.subjects, 'Subjects',      C.blue,    /^\d+$/.test(platformStats.subjects) ? platformStats.subjects : null, ''],
              [platformStats.concepts, 'Concepts',      C.green,   platformStats.concepts.replace('+',''), '+'],
              ['100+',                 'Problems',      C.gold,    null, ''],
            ].map(([val, label, color, countTarget, suffix], i) => (
              <div key={label} className="lp-hero-stat" style={{
                borderRight: i < 3 ? `1px solid ${lt ? 'rgba(124,93,187,0.12)' : 'rgba(255,255,255,0.07)'}` : 'none',
              }}>
                <div
                  data-target={countTarget || undefined}
                  data-suffix={suffix || undefined}
                  className="lp-countup"
                  style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: "'Orbitron', sans-serif", color }}
                >{val}</div>
                <div style={{ fontSize: '0.62rem', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* ── Glow divider ── */}
      <div className="lp-glow-divider" />

      {/* ── Pain Point ─────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', background: 'linear-gradient(180deg, transparent, rgba(155,110,212,0.04) 50%, transparent)' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div className="lp-reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ color: C.primary, fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              The Reality
            </p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 0.625rem', color: C.text }}>
              Sound familiar?
            </h2>
            <p style={{ color: C.sub, fontSize: '1rem', margin: 0 }}>
              Every year, thousands of Indian graduates face the same wall.
            </p>
          </div>

          <div className="lp-stagger" style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2.5rem' }}>
            {PAIN_POINTS.map((p, i) => (
              <div key={i} className="lp-reveal" style={{
                background: C.bgCard, border: `1px solid ${C.border}`,
                borderRadius: 12, padding: '1.125rem 1.5rem',
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
        <div className="lp-reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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

        <div className="lp-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
          {features.map(f => (
            <div
              key={f.label}
              className="lp-reveal"
              onClick={f.isLive ? (f.href ? () => navigate(f.href) : handleEnter) : undefined}
              style={{
                background: C.bgCard,
                border: `1px solid ${f.activeBorder}`,
                borderRadius: 16, padding: '1.75rem',
                position: 'relative', overflow: 'hidden',
                cursor: f.isLive ? 'pointer' : 'default',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.borderColor = lt ? f.iconL : f.iconD
                e.currentTarget.style.boxShadow = `0 12px 32px ${f.glow.replace('0.15', '0.25')}`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = ''
                e.currentTarget.style.borderColor = f.activeBorder
                e.currentTarget.style.boxShadow = ''
              }}
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
                    {f.cta || (f.href ? 'Start Solving' : 'Enter Arena')} <ArrowRight size={14} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="lp-glow-divider" />

      {/* ── Missions Section ───────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>

          {/* Label */}
          <div className="lp-reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: lt ? '#7C3500' : '#FF7F2A', fontWeight: 700, fontSize: '0.78rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              background: lt ? 'rgba(120,50,0,0.07)' : 'rgba(255,127,42,0.08)',
              border: `1px solid ${lt ? 'rgba(120,50,0,0.2)' : 'rgba(255,127,42,0.2)'}`,
              borderRadius: 20, padding: '0.3rem 0.9rem',
            }}>
              ⚔ Mission Board
            </span>
          </div>

          {/* 2-col layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '2.5rem', alignItems: 'center', marginBottom: '2.5rem',
          }}>
            {/* Left — headline + CTA */}
            <div className="lp-reveal-left">
              <h2 style={{
                fontSize: 'clamp(1.875rem, 4vw, 2.75rem)', fontWeight: 800,
                letterSpacing: '-0.025em', lineHeight: 1.15,
                color: C.text, margin: '0 0 1.25rem',
              }}>
                Tutorials teach you.<br />
                <span className="lp-grad-orange">
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
            <div className="lp-reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
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

      <div className="lp-glow-divider" />

      {/* ── Problem Solving Section ────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>

          {/* Label */}
          <div className="lp-reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: lt ? '#0284C7' : '#0EA5E9', fontWeight: 700, fontSize: '0.78rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              background: lt ? 'rgba(2,132,199,0.07)' : 'rgba(14,165,233,0.08)',
              border: `1px solid ${lt ? 'rgba(2,132,199,0.2)' : 'rgba(14,165,233,0.2)'}`,
              borderRadius: 20, padding: '0.3rem 0.9rem',
            }}>
              💻 Code GYM
            </span>
          </div>

          {/* 2-col layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '2.5rem', alignItems: 'center', marginBottom: '2.5rem',
          }}>
            {/* Left — headline + CTA */}
            <div className="lp-reveal-left">
              <h2 style={{
                fontSize: 'clamp(1.875rem, 4vw, 2.75rem)', fontWeight: 800,
                letterSpacing: '-0.025em', lineHeight: 1.15,
                color: C.text, margin: '0 0 1.25rem',
              }}>
                Know the code.<br />
                <span className="lp-grad-blue">
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
            <div className="lp-reveal-right" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px,100%), 1fr))', gap: '0.75rem' }}>
              {[
                { icon: '💻', title: 'Start Coding',     color: '#22C55E', href: '/problem-solving/start-coding',    desc: 'Never coded before? Begin here. Step-by-step from Hello World to functions.' },
                { icon: '🧠', title: 'Logic Building',  color: '#F59E0B', href: '/problem-solving/logic-building',  desc: "Can code but can't solve problems? Train your problem-solving mind." },
                { icon: '⚡', title: 'Skill Up',          color: '#0EA5E9', href: '/problem-solving/skill-up',        desc: 'Arrays, strings, searching — same problem, 4 languages, brute to optimized.' },
                { icon: '💼', title: 'Interview Prep',   color: '#EF4444', href: '/problem-solving/interview-prep',  desc: 'Most-asked questions from Amazon, Google, TCS, and more. All levels.' },
                { icon: '🎯', title: 'Scenario Coding',  color: '#A78BFA', href: '/problem-solving/scenario-coding', desc: 'Real-world story problems — solve placement-style scenarios with logic.' },
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

      <div className="lp-glow-divider" />

      {/* ── AI Lab Section ─────────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>

          {/* Label */}
          <div className="lp-reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: lt ? '#0284C7' : '#00D9FF', fontWeight: 700, fontSize: '0.78rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              background: lt ? 'rgba(2,132,199,0.07)' : 'rgba(0,217,255,0.07)',
              border: `1px solid ${lt ? 'rgba(2,132,199,0.2)' : 'rgba(0,217,255,0.2)'}`,
              borderRadius: 20, padding: '0.3rem 0.9rem',
            }}>
              ⚡ AI Lab
            </span>
          </div>

          {/* 2-col layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '2.5rem', alignItems: 'center', marginBottom: '2.5rem',
          }}>
            {/* Left — headline + CTA */}
            <div className="lp-reveal-left">
              <h2 style={{
                fontSize: 'clamp(1.875rem, 4vw, 2.75rem)', fontWeight: 800,
                letterSpacing: '-0.025em', lineHeight: 1.15,
                color: C.text, margin: '0 0 1.25rem',
              }}>
                Every AI tool.<br />
                <span style={{ background: 'linear-gradient(135deg, #00D9FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  One place to learn them.
                </span>
              </h2>
              <p style={{ color: C.sub, fontSize: '1.0625rem', lineHeight: 1.8, margin: '0 0 1rem', maxWidth: 420 }}>
                AI tools explained — what they are, how they work, what you can build.
                From ChatGPT and Copilot to LangChain, CrewAI, RAG systems, and local models.
              </p>
              <p style={{ color: C.sub, fontSize: '0.9375rem', lineHeight: 1.75, margin: '0 0 2rem', maxWidth: 420 }}>
                Each tool page includes free video tutorials, concept explanations, and a hands-on project to build. Most tools are completely free to use.
              </p>
              <button
                onClick={() => navigate('/ai-lab')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: lt
                    ? 'linear-gradient(135deg, #0284C7, #0369A1)'
                    : 'linear-gradient(135deg, #00D9FF, #0EA5E9)',
                  border: 'none', borderRadius: 8,
                  padding: '0.75rem 1.75rem',
                  color: lt ? '#fff' : '#020817', fontWeight: 700, fontSize: '0.9375rem',
                  cursor: 'pointer',
                  boxShadow: lt ? '0 4px 20px rgba(2,132,199,0.3)' : '0 4px 24px rgba(0,217,255,0.3)',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = lt ? '0 8px 28px rgba(2,132,199,0.45)' : '0 8px 32px rgba(0,217,255,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = lt ? '0 4px 20px rgba(2,132,199,0.3)' : '0 4px 24px rgba(0,217,255,0.3)' }}
              >
                ⚡ Explore AI Lab — Free
              </button>
            </div>

            {/* Right — category cards */}
            <div className="lp-reveal-right" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
              {[
                { icon: '🤖', title: 'AI Chatbots',       color: '#8B5CF6', desc: 'ChatGPT, Claude, Gemini, Perplexity, NotebookLM' },
                { icon: '💻', title: 'Coding Assistants', color: '#F59E0B', desc: 'Copilot, Cursor, Windsurf, Codeium' },
                { icon: '🔗', title: 'AI Agents',         color: '#EC4899', desc: 'LangChain, CrewAI, AutoGen, LangGraph, MCP' },
                { icon: '⚙️', title: 'Automation',        color: '#F97316', desc: 'n8n, Flowise, Dify, Zapier' },
                { icon: '🦙', title: 'Local AI',          color: '#6366F1', desc: 'Ollama, LM Studio — run models free' },
                { icon: '🎯', title: 'Vector Databases',  color: '#14B8A6', desc: 'ChromaDB, Pinecone — build RAG systems' },
              ].map((cat, i) => (
                <div key={i}
                  onClick={() => navigate('/ai-lab')}
                  style={{
                    padding: '1rem',
                    background: lt ? 'rgba(255,255,255,0.7)' : `${cat.color}08`,
                    border: `1px solid ${lt ? `${cat.color}25` : `${cat.color}22`}`,
                    borderLeft: `3px solid ${cat.color}`,
                    borderRadius: 12, cursor: 'pointer',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 6px 20px ${cat.color}20` }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>{cat.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.8rem', color: cat.color, marginBottom: '0.25rem' }}>{cat.title}</div>
                  <p style={{ color: C.muted, fontSize: '0.72rem', lineHeight: 1.5, margin: 0 }}>{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: lt ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
            borderRadius: 14, overflow: 'hidden',
          }}>
            
          </div>

        </div>
      </section>

      <div className="lp-glow-divider" />

      {/* ── How It Works ───────────────────────────────────── */}
      <section id="how-it-works" style={{
        padding: '5rem 1.5rem',
        background: 'linear-gradient(180deg, transparent, rgba(155,110,212,0.04) 50%, transparent)',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div className="lp-reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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

          <div className="lp-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="lp-reveal"
                style={{
                  background: C.bgCard,
                  border: `1px solid ${hoveredStep === i ? (lt ? step.colorL : step.colorD) + '55' : C.border}`,
                  borderRadius: 16, padding: '2rem 1.75rem',
                  position: 'relative', overflow: 'hidden',
                  cursor: 'default',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                  transform: hoveredStep === i ? 'translateY(-5px)' : '',
                  boxShadow: hoveredStep === i ? `0 12px 32px ${lt ? step.colorL : step.colorD}22` : '',
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

      <div className="lp-glow-divider" />

      {/* ── Final CTA ──────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem 7rem' }}>
        <div className="lp-reveal" style={{
          maxWidth: 820, margin: '0 auto', textAlign: 'center',
          padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 5vw, 4rem)',
          background: lt
            ? 'linear-gradient(135deg, rgba(124,93,187,0.08), rgba(29,78,216,0.04))'
            : 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(29,78,216,0.06))',
          border: `1px solid ${lt ? 'rgba(124,93,187,0.2)' : 'rgba(155,110,212,0.25)'}`,
          borderRadius: 24, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(155,110,212,0.12), transparent 65%)',
          }} />
          <div style={{ position: 'relative' }}>

            {/* Icon */}
            <div style={{
              width: 56, height: 56, borderRadius: 16, margin: '0 auto 1.75rem',
              background: 'linear-gradient(135deg, #7C3AED, #9B6ED4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 24px rgba(155,110,212,0.4)',
            }}>
              <Swords size={24} color="#fff" />
            </div>

            {/* Headline */}
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800,
              letterSpacing: '-0.025em', margin: '0 0 0.875rem', lineHeight: 1.2, color: C.text,
            }}>
              Learn the skills.{' '}
              <span className="lp-grad-text">Earn the job.</span>
            </h2>

            <p style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: C.sub, lineHeight: 1.8,
              maxWidth: 520, margin: '0 auto 2.25rem',
            }}>
              Structured roadmaps show you exactly what to learn next.
              Every concept you master brings you one step closer to your first tech job.
            </p>

            {/* Proof checklist */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))',
              gap: '0.625rem', maxWidth: 560, margin: '0 auto 2.5rem', textAlign: 'left',
            }}>
              {PROOF_POINTS.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: C.sub, fontSize: '0.9rem' }}>
                  <CheckCircle size={15} color={C.green} style={{ flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handleEnter}
                className="lp-cta-pulse"
                style={primaryBtn}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 0 60px rgba(155,110,212,0.8), 0 8px 32px rgba(0,0,0,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '' }}
              >
                <Swords size={17} />
                {user ? 'Continue Learning' : 'Start for Free'}
              </button>
              {!user && (
                <button
                  onClick={handleGuest}
                  disabled={guestLoading}
                  style={{ ...ghostBtn, borderColor: C.border, color: C.sub }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(155,110,212,0.4)'; e.currentTarget.style.color = C.text }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.sub }}
                >
                  <Ghost size={14} /> {guestLoading ? 'Starting…' : 'Try as Guest'}
                </button>
              )}
            </div>
          </div>
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
