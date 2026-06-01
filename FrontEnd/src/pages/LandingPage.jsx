import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Shield, Zap, Brain, Briefcase, ChevronRight, Swords, BookOpen, Trophy, Star } from 'lucide-react'

const C = {
  bg:        '#060B14',
  bgCard:    '#0D1526',
  bgCardHov: '#111D33',
  border:    'rgba(99, 102, 241, 0.2)',
  borderHov: 'rgba(139, 92, 246, 0.5)',
  primary:   '#6366F1',
  purple:    '#8B5CF6',
  text:      '#F1F5F9',
  muted:     '#64748B',
  sub:       '#94A3B8',
}

const gradText = {
  background: 'linear-gradient(135deg, #A78BFA 0%, #6366F1 50%, #38BDF8 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const glowBtn = {
  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  padding: '0.875rem 2.5rem',
  fontSize: '1rem',
  fontWeight: 700,
  cursor: 'pointer',
  boxShadow: '0 0 32px rgba(99, 102, 241, 0.5), 0 4px 20px rgba(0,0,0,0.4)',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  letterSpacing: '0.01em',
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
}

const features = [
  {
    icon: <Swords size={28} color="#A78BFA" />,
    label: 'Skills Arena',
    status: 'Live',
    statusColor: '#10B981',
    desc: 'Structured career roadmaps with concept-by-concept learning, real code examples, quizzes, and badge progression.',
    glow: 'rgba(139, 92, 246, 0.15)',
  },
  {
    icon: <BookOpen size={28} color="#38BDF8" />,
    label: 'Resume Builder',
    status: 'Coming Soon',
    statusColor: '#64748B',
    desc: 'Auto-generate a skills-based resume from your learning journey and quiz performance.',
    glow: 'rgba(56, 189, 248, 0.08)',
  },
  {
    icon: <Brain size={28} color="#F59E0B" />,
    label: 'AI Mentor',
    status: 'Coming Soon',
    statusColor: '#64748B',
    desc: 'Get AI-powered explanations, code reviews, and personalised hints when you\'re stuck.',
    glow: 'rgba(245, 158, 11, 0.08)',
  },
  {
    icon: <Briefcase size={28} color="#34D399" />,
    label: 'Jobs Board',
    status: 'Coming Soon',
    statusColor: '#64748B',
    desc: 'Curated job listings matched to your skill level and completed roadmap progress.',
    glow: 'rgba(52, 211, 153, 0.08)',
  },
]

const steps = [
  {
    num: '01',
    icon: <Shield size={22} color="#A78BFA" />,
    title: 'Choose Your Path',
    desc: 'Pick a career roadmap — Java Full Stack, MERN, Python, Frontend, or Backend. Each is a structured sequence of subjects.',
  },
  {
    num: '02',
    icon: <Zap size={22} color="#38BDF8" />,
    title: 'Master Concepts',
    desc: 'Learn each concept with simple and technical explanations, syntax breakdowns, real code examples, and common mistakes.',
  },
  {
    num: '03',
    icon: <Trophy size={22} color="#F59E0B" />,
    title: 'Prove & Progress',
    desc: 'Pass concept quizzes (8/10) to unlock completion. Earn subject badges by scoring 19/25 on the subject test.',
  },
]

export default function LandingPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleEnter = () => navigate(user ? '/skill-arena/dashboard' : '/login')

  return (
    <div style={{ background: C.bg, minHeight: '100vh', color: C.text, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", overflowX: 'hidden' }}>

      {/* ── Navbar ───────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2rem', height: 64,
        background: 'rgba(6, 11, 20, 0.85)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.4rem' }}>⚔️</span>
          <span style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '0.08em', ...gradText }}>PROTAGONIST</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {user ? (
            <button onClick={handleEnter} style={{ ...glowBtn, padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
              Enter Arena <ChevronRight size={15} />
            </button>
          ) : (
            <>
              <Link to="/login" style={ghostBtn}>Sign In</Link>
              <button onClick={handleEnter} style={{ ...glowBtn, padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
                Get Started <ChevronRight size={15} />
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '6rem 1.5rem 4rem',
        background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(99,102,241,0.12) 0%, transparent 70%)',
        position: 'relative',
      }}>
        {/* grid bg */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 760 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem', borderRadius: 999,
            border: '1px solid rgba(139,92,246,0.4)',
            background: 'rgba(139,92,246,0.1)',
            fontSize: '0.8125rem', fontWeight: 600, color: '#C4B5FD',
            marginBottom: '2rem', letterSpacing: '0.04em',
          }}>
            <Star size={13} fill="#C4B5FD" color="#C4B5FD" /> SKILLS ARENA IS LIVE
          </div>

          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 1.5rem', ...gradText }}>
            PROTAGONIST
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: C.sub, lineHeight: 1.7, maxWidth: 560, margin: '0 auto 2.5rem' }}>
            Your story begins here. Master tech skills one concept at a time, earn badges, and unlock your career.
          </p>

          <button
            onClick={handleEnter}
            style={glowBtn}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 48px rgba(99,102,241,0.7), 0 8px 32px rgba(0,0,0,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 0 32px rgba(99, 102, 241, 0.5), 0 4px 20px rgba(0,0,0,0.4)' }}
          >
            <Swords size={18} />
            Enter Skills Arena
          </button>

          <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', marginTop: '3.5rem', flexWrap: 'wrap' }}>
            {[['6', 'Career Paths'], ['30+', 'Subjects'], ['100+', 'Concepts'], ['3', 'Quiz Levels']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, ...gradText }}>{val}</div>
                <div style={{ fontSize: '0.75rem', color: C.muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em', ...gradText }}>
            One Platform. Four Superpowers.
          </h2>
          <p style={{ color: C.sub, marginTop: '0.75rem', fontSize: '1rem' }}>
            Everything you need to go from zero to hired.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {features.map(f => (
            <div
              key={f.label}
              style={{
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                padding: '1.75rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderHov; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = 'none' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `radial-gradient(ellipse at top left, ${f.glow}, transparent 60%)`, pointerEvents: 'none' }} />
              <div style={{ position: 'relative' }}>
                <div style={{ marginBottom: '1rem' }}>{f.icon}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.0625rem' }}>{f.label}</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: 999, background: f.statusColor === '#10B981' ? 'rgba(16,185,129,0.15)' : 'rgba(100,116,139,0.15)', color: f.statusColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {f.status}
                  </span>
                </div>
                <p style={{ color: C.sub, fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', background: 'linear-gradient(180deg, transparent, rgba(99,102,241,0.05), transparent)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em', ...gradText }}>
              How It Works
            </h2>
            <p style={{ color: C.sub, marginTop: '0.75rem', fontSize: '1rem' }}>Three steps from beginner to badged.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {steps.map((step, i) => (
              <div key={step.num} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {i < steps.length - 1 && (
                  <div style={{ display: 'none' }} /> /* connector hidden on mobile */
                )}
                <div style={{
                  background: C.bgCard,
                  border: `1px solid ${C.border}`,
                  borderRadius: 16,
                  padding: '1.75rem',
                  height: '100%',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {step.icon}
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: C.muted, letterSpacing: '0.08em' }}>STEP {step.num}</span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.0625rem', marginBottom: '0.625rem' }}>{step.title}</h3>
                  <p style={{ color: C.sub, fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem 7rem', textAlign: 'center' }}>
        <div style={{
          maxWidth: 620, margin: '0 auto',
          background: C.bgCard,
          border: `1px solid ${C.border}`,
          borderRadius: 24,
          padding: 'clamp(2rem, 5vw, 3.5rem)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚔️</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.875rem', ...gradText }}>
              Ready to write your story?
            </h2>
            <p style={{ color: C.sub, fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Join Protagonist. Pick a roadmap, master concepts, and prove your skills — one quiz at a time.
            </p>
            <button
              onClick={handleEnter}
              style={glowBtn}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 48px rgba(99,102,241,0.7), 0 8px 32px rgba(0,0,0,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 0 32px rgba(99, 102, 241, 0.5), 0 4px 20px rgba(0,0,0,0.4)' }}
            >
              <Swords size={18} />
              {user ? 'Go to Dashboard' : 'Enter Skills Arena'}
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span style={{ fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.06em', ...gradText }}>PROTAGONIST</span>
        <span style={{ fontSize: '0.8125rem', color: C.muted }}>Your career. Your story.</span>
      </footer>
    </div>
  )
}
