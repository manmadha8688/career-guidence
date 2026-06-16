import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Swords, CheckCircle, Map, Award, Briefcase, ChevronLeft, Mail, ShieldCheck, RefreshCw } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { registerUser, sendOtp, verifyOtp } from '../../api/api'
import toast from 'react-hot-toast'
import LoadingOverlay from '../../components/LoadingOverlay'

const REG_MESSAGES = ['Registering...', 'Creating Hunter License...', 'Generating your ID...', 'Setting up arena...']
function useCyclingText(messages, active) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (!active) { setIdx(0); return }
    const t = setInterval(() => setIdx(i => (i + 1) % messages.length), 1500)
    return () => clearInterval(t)
  }, [active])
  return messages[idx]
}

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

// Left panel benefits — always on dark background, neon colors are fine
const BENEFITS = [
  { icon: <Map        size={15} color="#60A5FA" />, text: 'Clear roadmaps — Java, MERN, Python, Frontend', color: '#60A5FA' },
  { icon: <CheckCircle size={15} color="#4ADE80" />, text: 'Quiz every concept to prove you learned it',   color: '#4ADE80' },
  { icon: <Award      size={15} color="#F59E0B" />, text: 'Earn XP, rank up from E → S class hunter',  color: '#F59E0B' },
  { icon: <Briefcase  size={15} color="#9B6ED4" />, text: 'Resume + Jobs board coming soon',               color: '#9B6ED4' },
]

function getStrength(pw) {
  let s = 0
  if (pw.length >= 8) s++
  if (/[A-Z]/.test(pw)) s++
  if (/[0-9]/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  return s
}

const strengthLabel  = ['', 'Weak', 'Fair', 'Good', 'Strong']
const strengthColors = ['', 'weak', 'medium', 'medium', 'strong']

export default function RegisterPage() {
  const { theme } = useTheme()
  const C = theme === 'light' ? LIGHT_C : DARK_C
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '', collegeName: '' })
  const [loading, setLoading] = useState(false)
  const [overlayDone, setOverlayDone] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [focused, setFocused] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()
  const strength = getStrength(form.password)
  const btnText = useCyclingText(REG_MESSAGES, loading)

  // OTP state
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [emailVerified, setEmailVerified] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [sendingOtp, setSendingOtp] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)
  const cooldownRef = useRef(null)

  // Restore cooldown from localStorage on mount
  const getInitialCooldown = () => {
    const sent = parseInt(localStorage.getItem('otp_sent_at') || '0', 10)
    if (!sent) return 0
    const remaining = Math.ceil((sent + 60000 - Date.now()) / 1000)
    return remaining > 0 ? remaining : 0
  }
  const [resendCooldown, setResendCooldown] = useState(getInitialCooldown)
  const [otpSentForEmail, setOtpSentForEmail] = useState(localStorage.getItem('otp_email') || '')

  const startCooldown = (secs = 60) => {
    localStorage.setItem('otp_sent_at', String(Date.now()))
    setResendCooldown(secs)
    clearInterval(cooldownRef.current)
    cooldownRef.current = setInterval(() => {
      setResendCooldown(s => {
        if (s <= 1) { clearInterval(cooldownRef.current); localStorage.removeItem('otp_sent_at'); return 0 }
        return s - 1
      })
    }, 1000)
  }

  // Start timer on mount if cooldown is active
  useEffect(() => {
    const initial = getInitialCooldown()
    if (initial > 0) {
      setResendCooldown(initial)
      cooldownRef.current = setInterval(() => {
        setResendCooldown(s => {
          if (s <= 1) { clearInterval(cooldownRef.current); localStorage.removeItem('otp_sent_at'); return 0 }
          return s - 1
        })
      }, 1000)
    }
    return () => clearInterval(cooldownRef.current)
  }, [])

  // Restore otpSent state on mount if email matches
  useEffect(() => {
    const savedEmail = localStorage.getItem('otp_email')
    if (savedEmail && getInitialCooldown() > 0) {
      setOtpSent(true)
      setForm(f => ({ ...f, email: savedEmail }))
    }
  }, [])

  const handleSendOtp = async () => {
    if (!form.email) { toast.error('Enter your email first'); return }
    setEmailError('')
    setSendingOtp(true)
    try {
      await sendOtp(form.email)
      setOtpSent(true)
      setOtp('')
      startCooldown(60)
      localStorage.setItem('otp_email', form.email)
      toast.success('OTP sent! Check your inbox.')
    } catch (err) {
      const status = err.response?.status
      const msg = err.response?.data?.error || 'Failed to send OTP'
      const retryAfter = err.response?.data?.retryAfter
      if (status === 409) {
        setEmailError(msg)  // show inline under email field
      } else if (retryAfter) {
        startCooldown(retryAfter)
        toast.error(`Wait ${retryAfter}s before resending.`)
      } else {
        toast.error(msg)
      }
    } finally {
      setSendingOtp(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) { toast.error('Enter the 6-digit OTP'); return }
    setVerifyingOtp(true)
    try {
      await verifyOtp(form.email, otp)
      setEmailVerified(true)
      setOtpSent(false)
      localStorage.removeItem('otp_email')
      localStorage.removeItem('otp_sent_at')
      toast.success('Email verified successfully!')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Invalid OTP. Try again.')
    } finally {
      setVerifyingOtp(false)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!emailVerified) { toast.error('Please verify your email first'); return }
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return }
    setLoading(true)
    setOverlayDone(false)
    try {
      const { fullName, email, password, collegeName } = form
      const { data } = await registerUser({ fullName, email, password, collegeName })
      setOverlayDone(true)
      await new Promise(r => setTimeout(r, 700))
      login(data.token, data.user)
      navigate('/skill-arena/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const inp = name => ({
    width: '100%',
    padding: '0.7rem 1rem',
    background: 'var(--bg-secondary)',
    border: `1.5px solid ${focused === name ? 'rgba(155,110,212,0.55)' : 'var(--border)'}`,
    borderRadius: 8,
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
    boxShadow: focused === name ? '0 0 0 3px rgba(155,110,212,0.1)' : 'none',
    fontFamily: 'inherit',
  })

  const label = text => (
    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
      {text}
    </label>
  )

  return (
    <>
    {loading && <LoadingOverlay type="register" completing={overlayDone} />}
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
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(96,165,250,0.07), transparent 70%)' }} />

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
            Your journey starts here.
          </h2>
          <p style={{ color: '#8B9AB8', fontSize: '0.9375rem', lineHeight: 1.75, marginBottom: '2.25rem' }}>
            Free forever. No credit card. Just skills, roadmaps, and a clear path to your first job offer.
          </p>

          {/* Benefits */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
            {BENEFITS.map(b => (
              <div key={b.text} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.875rem',
                padding: '0.875rem 1rem',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(155,110,212,0.1)',
                borderRadius: 10,
              }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, background: `${b.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  {b.icon}
                </div>
                <span style={{ fontSize: '0.875rem', color: '#8B9AB8', lineHeight: 1.55, paddingTop: '0.25rem' }}>{b.text}</span>
              </div>
            ))}
          </div>

          {/* Stats strip */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(155,110,212,0.1)',
            borderRadius: 10, overflow: 'hidden',
          }}>
            {[['3', 'Career Paths', '#9B6ED4'], ['30+', 'Subjects', '#60A5FA'], ['100+', 'Concepts', '#4ADE80']].map(([val, lbl, color], i) => (
              <div key={lbl} style={{ textAlign: 'center', padding: '0.875rem 0.5rem', borderRight: i < 2 ? '1px solid rgba(155,110,212,0.1)' : 'none' }}>
                <div style={{ fontSize: '1.375rem', fontWeight: 800, color, fontFamily: "'Orbitron', sans-serif" }}>{val}</div>
                <div style={{ fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel / Form ──────────────────────────── */}
      <div className="ap-right" style={{
        width: 500, flexShrink: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '2.5rem',
        background: 'var(--bg-card)',
        borderLeft: '1px solid rgba(155,110,212,0.08)',
        overflowY: 'auto',
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

        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.375rem', letterSpacing: '-0.025em' }}>
          Create your account
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
          Start learning for free today
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            {label('Full Name')}
            <input
              type="text" placeholder="Your Name Please"
              value={form.fullName}
              onChange={e => setForm({ ...form, fullName: e.target.value })}
              onFocus={() => setFocused('fullName')}
              onBlur={() => setFocused(null)}
              style={inp('fullName')}
              required
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            {label('Email address')}
            {/* Email row */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email" placeholder="XXXX@gmail.com"
                value={form.email}
                onChange={e => { setForm({ ...form, email: e.target.value }); setEmailVerified(false); setOtpSent(false); setEmailError(''); localStorage.removeItem('otp_email'); localStorage.removeItem('otp_sent_at') }}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                style={{ ...inp('email'), flex: 1, borderColor: emailVerified ? 'rgba(74,222,128,0.5)' : emailError ? 'rgba(239,68,68,0.5)' : undefined }}
                disabled={emailVerified}
                required
              />
              {!emailVerified && (
                <button type="button" onClick={handleSendOtp} disabled={sendingOtp || resendCooldown > 0}
                  style={{ padding: '0 1rem', borderRadius: 8, border: '1px solid rgba(155,110,212,0.4)', background: 'rgba(155,110,212,0.1)', color: '#C4B5FD', fontSize: '0.8rem', fontWeight: 700, cursor: sendingOtp || resendCooldown > 0 ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', opacity: sendingOtp || resendCooldown > 0 ? 0.6 : 1, fontFamily: 'inherit', flexShrink: 0 }}>
                  {sendingOtp ? '...' : otpSent && resendCooldown > 0 ? `Resend (${resendCooldown}s)` : otpSent ? 'Resend' : 'Verify'}
                </button>
              )}
              {emailVerified && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#4ADE80', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0 }}>
                  <ShieldCheck size={16} /> Verified
                </div>
              )}
            </div>

            {/* Email already exists error */}
            {emailError && (
              <div style={{ fontSize: '0.775rem', color: '#EF4444', marginTop: '0.3rem' }}>
                {emailError} <a href="/login" style={{ color: '#B48AE8', fontWeight: 600, textDecoration: 'none' }}>Sign in instead?</a>
              </div>
            )}

            {/* OTP input */}
            {otpSent && !emailVerified && (
              <div style={{ marginTop: '0.625rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.375rem' }}>
                  Enter the 6-digit OTP sent to your email
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text" inputMode="numeric" maxLength={6}
                    placeholder="000000"
                    value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    onFocus={() => setFocused('otp')}
                    onBlur={() => setFocused(null)}
                    style={{ ...inp('otp'), flex: 1, letterSpacing: '0.2em', fontFamily: 'monospace', fontSize: '1.1rem', textAlign: 'center' }}
                  />
                  <button type="button" onClick={handleVerifyOtp} disabled={verifyingOtp || otp.length !== 6}
                    style={{ padding: '0 1.25rem', borderRadius: 8, border: 'none', background: otp.length === 6 ? 'linear-gradient(135deg,#16A34A,#4ADE80)' : 'rgba(74,222,128,0.15)', color: otp.length === 6 ? '#fff' : '#4ADE80', fontSize: '0.85rem', fontWeight: 700, cursor: verifyingOtp || otp.length !== 6 ? 'not-allowed' : 'pointer', opacity: verifyingOtp ? 0.7 : 1, fontFamily: 'inherit', flexShrink: 0 }}>
                    {verifyingOtp ? '...' : 'Confirm'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            {label('Password')}
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="At least 8 characters"
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
            {form.password && (
              <>
                <div className="password-strength" style={{ marginTop: '0.5rem' }}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`strength-bar ${i <= strength ? strengthColors[strength] : ''}`} />
                  ))}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  {strengthLabel[strength]} password
                </div>
              </>
            )}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            {label('Confirm Password')}
            <input
              type="password" placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
              onFocus={() => setFocused('confirm')}
              onBlur={() => setFocused(null)}
              style={{ ...inp('confirm'), borderColor: form.confirmPassword && form.password !== form.confirmPassword ? 'rgba(239,68,68,0.5)' : (focused === 'confirm' ? 'rgba(155,110,212,0.55)' : 'var(--border)') }}
            />
            {form.confirmPassword && form.password !== form.confirmPassword && (
              <div style={{ fontSize: '0.775rem', color: '#EF4444', marginTop: '0.25rem' }}>
                Passwords don't match
              </div>
            )}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              College Name <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span>
            </label>
            <input
              type="text" placeholder="Your college or university"
              value={form.collegeName}
              onChange={e => setForm({ ...form, collegeName: e.target.value })}
              onFocus={() => setFocused('college')}
              onBlur={() => setFocused(null)}
              style={inp('college')}
            />
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
            {loading ? btnText : 'Create account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#B48AE8', fontWeight: 600, textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
    </>
  )
}
