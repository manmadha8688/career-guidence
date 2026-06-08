import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, Swords, Target, Zap, Trophy, ChevronLeft } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { loginUser, guestLogin } from '../../api/api'
import toast from 'react-hot-toast'

const DARK_C = {
  bg:     '#090E1C',
  bgCard: '#0D1424',
  bgInput:'#080D1A',
  border: 'rgba(155,110,212,0.2)',
  primary:'#9B6ED4',
  text:   '#E2E8F0',
  sub:    '#8B9AB8',
  muted:  '#64748B',
}
const LIGHT_C = {
  bg:     'var(--bg-secondary)',
  bgCard: 'var(--bg-card)',
  bgInput:'var(--bg-secondary)',
  border: 'rgba(124,93,187,0.2)',
  primary:'#7C5DBB',
  text:   '#18244A',
  sub:    '#384470',
  muted:  '#6B7FA3',
}

const RANKS = [
  { r: 'E', dark: '#888888', light: '#6B7FA3' },
  { r: 'D', dark: '#4ADE80', light: '#15803D' },
  { r: 'C', dark: '#60A5FA', light: '#1D4ED8' },
  { r: 'B', dark: '#9B6ED4', light: '#7C5DBB' },
  { r: 'A', dark: '#F59E0B', light: '#B45309' },
  { r: 'S', dark: '#EF4444', light: '#DC2626' },
]

// Left panel features — always on dark background, neon colors are fine
const FEATURES = [
  { icon: <Target size={15} color="#9B6ED4" />, title: 'Structured career roadmaps', sub: 'Know exactly what to learn next' },
  { icon: <Zap    size={15} color="#60A5FA" />, title: 'Learn concept by concept',   sub: 'Examples, syntax, real code' },
  { icon: <Trophy size={15} color="#F59E0B" />, title: 'Earn XP and rise in rank',   sub: 'Prove your skills with badges' },
]

export default function LoginPage() {
  const { theme } = useTheme()
  const C = theme === 'light' ? LIGHT_C : DARK_C
  const rankColor = (rank) => theme === 'light' ? rank.light : rank.dark

  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [guestLoading, setGuestLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [focused, setFocused] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/skill-arena/dashboard'

  const handleGuest = async () => {
    setGuestLoading(true)
    try {
      const storedGuestId = localStorage.getItem('guest_device_id')
      const { data } = await guestLogin(storedGuestId)
      localStorage.setItem('guest_device_id', data.user.id)
      login(data.token, data.user)
      navigate(redirectTo)
    } catch {
      toast.error('Could not start guest session. Try again.')
    } finally {
      setGuestLoading(false)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await loginUser(form)
      login(data.token, data.user)
      if (data.user.role === 'ADMIN') navigate('/admin-skill-arena')
      else navigate(redirectTo)
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const inp = name => ({
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'var(--bg-secondary)',
    border: `1.5px solid ${focused === name ? 'rgba(155,110,212,0.55)' : 'var(--border)'}`,
    borderRadius: 8,
    color: 'var(--text-primary)',
    fontSize: '0.9375rem',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
    boxShadow: focused === name ? '0 0 0 3px rgba(155,110,212,0.1)' : 'none',
    fontFamily: 'inherit',
  })

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      background: 'var(--bg-secondary)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: 'var(--text-primary)',
    }}>

      {/* ── Left panel ──────────────────────────────────── */}
      <div className="ap-left" style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        padding: '3rem 2.5rem',
        position: 'relative', overflow: 'hidden',
        borderRight: '1px solid rgba(155,110,212,0.1)',
      }}>
        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(155,110,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(155,110,212,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(155,110,212,0.1), transparent 70%)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 420, width: '100%' }}>

          {/* Logo */}
          <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '2.5rem', cursor: 'pointer' }}>
            <div style={{
              width: 42, height: 42, borderRadius: 10,
              background: 'linear-gradient(135deg, #7C3AED, #9B6ED4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(155,110,212,0.45)',
            }}>
              <Swords size={21} color="#fff" />
            </div>
            <span className="lp-grad-text" style={{ fontWeight: 900, fontSize: '1.5rem', letterSpacing: '0.03em' }}>LearnToEarn</span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.125rem)', fontWeight: 800, letterSpacing: '-0.02em', color: '#E2E8F0', lineHeight: 1.2, marginBottom: '0.625rem' }}>
            Level up your career.
          </h2>
          <p style={{ color: '#8B9AB8', fontSize: '0.9375rem', lineHeight: 1.75, marginBottom: '2.25rem' }}>
            Follow skill roadmaps, earn XP, and unlock your dream job — one concept at a time.
          </p>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '2.25rem' }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{
                display: 'flex', alignItems: 'center', gap: '0.875rem',
                padding: '0.7rem 0.875rem',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(155,110,212,0.1)',
                borderRadius: 10,
              }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, background: 'rgba(155,110,212,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {f.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#E2E8F0' }}>{f.title}</div>
                  <div style={{ fontSize: '0.725rem', color: '#64748B', marginTop: 1 }}>{f.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Rank ladder */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(155,110,212,0.1)', borderRadius: 10, padding: '0.875rem 1rem' }}>
            <div style={{ fontSize: '0.62rem', color: '#64748B', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Share Tech Mono', monospace", marginBottom: '0.625rem' }}>
              RANK PROGRESSION — EARN XP TO ADVANCE
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {RANKS.map((r, i) => (
                <div key={r.r} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', flex: 1 }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 6,
                      border: `1.5px solid ${rankColor(r)}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.62rem', fontWeight: 800, color: rankColor(r),
                      background: `${rankColor(r)}18`,
                      fontFamily: "'Orbitron', sans-serif",
                    }}>
                      {r.r}
                    </div>
                  </div>
                  {i < RANKS.length - 1 && <div style={{ height: 1, width: 8, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel / Form ──────────────────────────── */}
      <div className="ap-right" style={{
        width: 480, flexShrink: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '3rem 2.5rem',
        background: 'var(--bg-card)',
        borderLeft: '1px solid rgba(155,110,212,0.08)',
      }}>
        {/* Back button */}
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.8125rem', cursor: 'pointer', padding: 0, marginBottom: '1.75rem' }}>
          <ChevronLeft size={15} /> Back to home
        </button>

        {/* Mobile-only logo */}
        <div className="ap-mobile-logo" onClick={() => navigate('/')} style={{ display: 'none', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', cursor: 'pointer' }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: 'linear-gradient(135deg, #7C3AED, #9B6ED4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(155,110,212,0.4)' }}>
            <Swords size={18} color="#fff" />
          </div>
          <span className="lp-grad-text" style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '0.03em' }}>LearnToEarn</span>
        </div>

        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.375rem', letterSpacing: '-0.025em' }}>
          Welcome back
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Sign in to continue your learning journey
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.125rem' }}>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              style={inp('email')}
              required
            />
          </div>

          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
                style={{ ...inp('password'), paddingRight: '3rem' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.25rem', display: 'flex' }}
              >
                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '0.875rem', borderRadius: 8, border: 'none',
            background: 'linear-gradient(135deg, #7C3AED, #9B6ED4)',
            color: '#fff', fontSize: '1rem', fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.75 : 1,
            boxShadow: loading ? 'none' : '0 0 28px rgba(155,110,212,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            transition: 'opacity 0.15s, box-shadow 0.15s',
            fontFamily: 'inherit',
          }}>
            {loading && <span className="loading-spinner" style={{ width: 18, height: 18 }} />}
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#B48AE8', fontWeight: 600, textDecoration: 'none' }}>
            Create one free
          </Link>
        </p>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.25rem 0' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>or</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* Guest button */}
        <button
          onClick={handleGuest}
          disabled={guestLoading}
          style={{
            width: '100%', padding: '0.8rem', borderRadius: 8,
            background: 'transparent',
            border: `1.5px solid ${'var(--border)'}`,
            color: 'var(--text-secondary)', fontSize: '0.9375rem', fontWeight: 600,
            cursor: guestLoading ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            transition: 'border-color 0.15s, color 0.15s',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => { if (!guestLoading) { e.currentTarget.style.borderColor = 'rgba(155,110,212,0.45)'; e.currentTarget.style.color = C.text } }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = C.sub }}
        >
          {guestLoading && <span className="loading-spinner" style={{ width: 16, height: 16 }} />}
          {guestLoading ? 'Setting up…' : 'Continue as Guest'}
        </button>
        <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.5rem' }}>
          No account needed — explore the full platform instantly
        </p>

        {/* Admin hint */}
        
      </div>
    </div>
  )
}
