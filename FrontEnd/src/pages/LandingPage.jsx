import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { guestLogin } from '../api/api'
import toast from 'react-hot-toast'
import {
  Swords, BookOpen, Brain, Briefcase,
  ChevronRight, Trophy, Target,
  CheckCircle, ArrowRight, Zap, Ghost,
} from 'lucide-react'

const C = {
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
}

const gradText = {
  background: 'linear-gradient(135deg, #C4B5FD 0%, #9B6ED4 45%, #60A5FA 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
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

const features = [
  {
    icon: <Swords size={30} color="#C4B5FD" />,
    label: 'Skills Arena',
    status: 'Live',
    statusColor: '#4ADE80',
    statusBg: 'rgba(74,222,128,0.12)',
    desc: 'Structured career roadmaps with concept-by-concept learning, real code examples, quizzes, and XP progression.',
    glow: 'rgba(155,110,212,0.15)',
    activeBorder: 'rgba(155,110,212,0.4)',
    isLive: true,
  },
  {
    icon: <BookOpen size={30} color="#60A5FA" />,
    label: 'Resume Builder',
    status: 'Coming Soon',
    statusColor: '#64748B',
    statusBg: 'rgba(100,116,139,0.12)',
    desc: 'Auto-build a proof-of-skills resume from your learning journey and quiz performance.',
    glow: 'rgba(96,165,250,0.07)',
    activeBorder: C.border,
    isLive: false,
  },
  {
    icon: <Brain size={30} color="#F59E0B" />,
    label: 'AI Mentor',
    status: 'Coming Soon',
    statusColor: '#64748B',
    statusBg: 'rgba(100,116,139,0.12)',
    desc: 'AI-powered explanations, code reviews, and personalised hints when you\'re stuck on a concept.',
    glow: 'rgba(245,158,11,0.07)',
    activeBorder: C.border,
    isLive: false,
  },
  {
    icon: <Briefcase size={30} color="#4ADE80" />,
    label: 'Jobs Board',
    status: 'Coming Soon',
    statusColor: '#64748B',
    statusBg: 'rgba(100,116,139,0.12)',
    desc: 'Curated job listings matched to your skill level and completed roadmap badges.',
    glow: 'rgba(74,222,128,0.07)',
    activeBorder: C.border,
    isLive: false,
  },
]

const steps = [
  {
    num: '01',
    icon: <Target size={22} color="#C4B5FD" />,
    title: 'Pick Your Roadmap',
    desc: 'Choose a career path — Java Full Stack, MERN, Python, Frontend, Backend. Each is a structured sequence of subjects built around real job requirements.',
    color: '#9B6ED4',
  },
  {
    num: '02',
    icon: <Zap size={22} color="#60A5FA" />,
    title: 'Learn Concept by Concept',
    desc: 'Each concept has simple + technical explanations, syntax breakdowns, real code examples, and common mistakes. Learn at your own pace.',
    color: '#60A5FA',
  },
  {
    num: '03',
    icon: <Trophy size={22} color="#F59E0B" />,
    title: 'Earn XP. Prove Your Skills.',
    desc: 'Pass quizzes to earn XP and unlock badges. Your rank rises as you progress. Completed subjects become proof of skill on your resume.',
    color: '#F59E0B',
  },
]

const NAV_LINKS = [
  { label: 'Skills Arena', live: true },
  { label: 'Resume', live: false },
  { label: 'AI', live: false },
  { label: 'Jobs', live: false },
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
  const { user } = useAuth()
  const navigate = useNavigate()
  const [hoveredStep, setHoveredStep] = useState(null)
  const [guestLoading, setGuestLoading] = useState(false)

  const handleEnter = () => navigate(user ? '/skill-arena/dashboard' : '/login')
  const scrollToHow = () => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })

  const handleGuest = async () => {
    setGuestLoading(true)
    try {
      const storedGuestId = localStorage.getItem('guest_device_id')
      const { data } = await guestLogin(storedGuestId)
      localStorage.setItem('guest_device_id', data.user.id)
      login(data.token, data.user)
      navigate('/skill-arena/dashboard')
    } catch {
      toast.error('Could not start guest session. Try again.')
    } finally {
      setGuestLoading(false)
    }
  }

  return (
    <div style={{
      background: C.bg, minHeight: '100vh', color: C.text,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      overflowX: 'hidden',
    }}>

      {/* ── Navbar ─────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2rem', height: 64,
        background: 'rgba(9,14,28,0.92)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
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
          <span style={{ fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.03em', ...gradText }}>
            LearnToEarn
          </span>
        </div>

        {/* Section links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.125rem' }}>
          {NAV_LINKS.map(link => (
            <div
              key={link.label}
              onClick={link.live ? handleEnter : undefined}
              style={{
                padding: '0.375rem 0.875rem', borderRadius: 6,
                fontSize: '0.875rem',
                color: link.live ? '#C4B5FD' : C.muted,
                fontWeight: link.live ? 600 : 400,
                cursor: link.live ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', gap: '0.375rem',
              }}
            >
              {link.label}
              {link.live ? (
                <span style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: '#4ADE80', boxShadow: '0 0 6px #4ADE80',
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

        {/* Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {user ? (
            <button
              onClick={handleEnter}
              style={{ ...primaryBtn, padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
            >
              Enter Arena <ChevronRight size={14} />
            </button>
          ) : (
            <>
              <Link to="/login" style={ghostBtn}>Sign In</Link>
              <button
                onClick={handleEnter}
                style={{ ...primaryBtn, padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
              >
                Get Started Free <ChevronRight size={14} />
              </button>
            </>
          )}
        </div>
      </nav>

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
            border: '1px solid rgba(74,222,128,0.3)',
            background: 'rgba(74,222,128,0.08)',
            fontSize: '0.775rem', fontWeight: 700, color: '#4ADE80',
            marginBottom: '2rem', letterSpacing: '0.06em',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#4ADE80', boxShadow: '0 0 8px #4ADE80',
              display: 'inline-block',
            }} />
            SKILLS ARENA IS LIVE — START FOR FREE
          </div>

          {/* Brand name */}
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 900, lineHeight: 1.05,
            letterSpacing: '-0.035em',
            margin: '0 0 0.75rem',
            ...gradText,
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
          <div style={{
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
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', fontWeight: 700, margin: '0 0 0.875rem', lineHeight: 1.45, ...gradText }}>
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
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 0.75rem', ...gradText }}>
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
              onClick={f.isLive ? handleEnter : undefined}
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
                <div style={{ marginBottom: '1.25rem' }}>{f.icon}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.0625rem' }}>{f.label}</span>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 700,
                    padding: '0.15rem 0.5rem', borderRadius: 999,
                    background: f.statusBg, color: f.statusColor,
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
                    color: '#C4B5FD', fontSize: '0.875rem', fontWeight: 600,
                  }}>
                    Enter Arena <ArrowRight size={14} />
                  </div>
                )}
              </div>
            </div>
          ))}
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
                  border: `1px solid ${hoveredStep === i ? step.color + '55' : C.border}`,
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
                    background: `radial-gradient(ellipse at top left, ${step.color}18, transparent 55%)`,
                    pointerEvents: 'none',
                  }} />
                )}
                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.25rem' }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 12,
                      background: `${step.color}18`,
                      border: `1px solid ${step.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {step.icon}
                    </div>
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 800,
                      color: step.color, letterSpacing: '0.1em',
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

            <h2 style={{
              fontSize: 'clamp(1.625rem, 4vw, 2.5rem)',
              fontWeight: 800, letterSpacing: '-0.025em',
              marginBottom: '1rem', lineHeight: 1.2,
              ...gradText,
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
                  <CheckCircle size={16} color="#4ADE80" />
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

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '1.75rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Swords size={15} color="#9B6ED4" />
          <span style={{ fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.04em', ...gradText }}>
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
              onClick={link.live ? handleEnter : undefined}
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
