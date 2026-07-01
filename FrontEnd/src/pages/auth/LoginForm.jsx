import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { loginUser, guestLogin } from '../../api/api'
import toast from 'react-hot-toast'
import AuthSubmitButton from './components/AuthSubmitButton'
import { useAuthForm } from './context/AuthFormContext'
import useLoginBotStory from './hooks/useLoginBotStory'

export default function LoginForm() {
  const [form, setForm]           = useState({ email: '', password: '' })
  const [loading, setLoading]     = useState(false)
  const [guestLoading, setGuestLoading] = useState(false)
  const [showPass, setShowPass]   = useState(false)

  const { login, showAuthOverlay, completeAuthOverlay, hideAuthOverlay } = useAuth()
  const navigate           = useNavigate()
  const [searchParams]     = useSearchParams()
  const redirectTo         = searchParams.get('redirect') || '/'
  const registerQs         = redirectTo !== '/' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''

  const prevFieldRef        = useRef(null)
  const emailFocusedOnceRef = useRef(false)

  const {
    focusedField, setFocusedField,
    setPasswordVisible,
    setFormProgress,
    emitCompanionEvent, dismissCompanion,
    touchActivity, resetCompanion,
    lastActivity,
  } = useAuthForm()

  const { cancelRankTimer } = useLoginBotStory(
    form,
    emitCompanionEvent,
    lastActivity,
    emailFocusedOnceRef,
  )

  const emailOk = form.email.trim().length > 0 && form.email.includes('@')
  const passOk  = form.password.length > 0
  const ready   = emailOk && passOk

  /* reset form state on mount only; cleanup on unmount */
  useEffect(() => {
    setFormProgress(0)
    setFocusedField(null)
    prevFieldRef.current        = null
    emailFocusedOnceRef.current = false
    return () => {
      resetCompanion()
      setFormProgress(0)
      setFocusedField(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setFormProgress((Number(emailOk) + Number(passOk)) / 2)
  }, [emailOk, passOk, setFormProgress])

  useEffect(() => { setPasswordVisible(showPass) }, [showPass, setPasswordVisible])

  /* ── focus handlers ───────────────────────────────────────────── */
  const handleEmailFocus = () => {
    dismissCompanion()
    cancelRankTimer()
    setFocusedField('email')
    touchActivity()

    if (prevFieldRef.current === 'password') {
      emitCompanionEvent('EMAIL_RETURN')
    } else if (!emailFocusedOnceRef.current) {
      emailFocusedOnceRef.current = true
      emitCompanionEvent('FOUND_EMAIL')
    }
    prevFieldRef.current = 'email'
  }

  const handlePasswordFocus = () => {
    dismissCompanion()
    setFocusedField('password')
    touchActivity()
    emitCompanionEvent('FOCUS_PASSWORD')
    prevFieldRef.current = 'password'
  }

  /* ── guest ────────────────────────────────────────────────────── */
  const handleGuest = async () => {
    dismissCompanion()
    emitCompanionEvent('GUEST_CLICK')
    setGuestLoading(true)
    showAuthOverlay('guest')
    try {
      const storedGuestId = localStorage.getItem('guest_device_id')
      const { data } = await guestLogin(storedGuestId)
      localStorage.setItem('guest_device_id', data.user.id)
      completeAuthOverlay()
      await new Promise(r => setTimeout(r, 600))
      hideAuthOverlay()
      login(data.token, data.user)
      navigate(redirectTo)
    } catch {
      hideAuthOverlay()
      toast.error('Guest mode is unavailable right now. Please try again in a moment.')
    } finally {
      setGuestLoading(false)
    }
  }

  /* ── submit ───────────────────────────────────────────────────── */
  const handleSubmit = async e => {
    e.preventDefault()
    touchActivity()

    if (!ready) {
      dismissCompanion()
      emitCompanionEvent('SUBMIT_EMPTY')
      return
    }

    setLoading(true)
    showAuthOverlay('login')
    dismissCompanion()
    emitCompanionEvent('LOGIN_PROCESSING')

    try {
      const { data } = await loginUser(form)
      dismissCompanion()
      emitCompanionEvent('LOGIN_SUCCESS')
      completeAuthOverlay()
      await new Promise(r => setTimeout(r, 900))
      hideAuthOverlay()
      login(data.token, data.user)
      if (data.user.role === 'ADMIN') navigate('/admin-skill-arena')
      else navigate(redirectTo)
    } catch (err) {
      hideAuthOverlay()
      dismissCompanion()
      emitCompanionEvent('LOGIN_FAILED')
      toast.error(err.response?.data?.error || 'That email or password did not match. Double-check and try again.')
    } finally {
      setLoading(false)
    }
  }

  /* ── password visibility toggle ───────────────────────────────── */
  const togglePassword = () => {
    setShowPass(prev => {
      const next = !prev
      dismissCompanion()
      emitCompanionEvent(next ? 'PASSWORD_VISIBLE' : 'PASSWORD_HIDDEN')
      return next
    })
    touchActivity()
  }

  /* ── render ───────────────────────────────────────────────────── */
  return (
    <>
      <motion.h1
        className="auth-form-title"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome back
      </motion.h1>
      <motion.p
        className="auth-form-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
      >
        Sign in to continue your journey.{' '}
        <Link to={`/register${registerQs}`} className="auth-link" style={{ fontSize: 'inherit' }}>
          New here? Sign up free
        </Link>
      </motion.p>

      <form onSubmit={handleSubmit} className="auth-form">
        {/* Email */}
        <div className={`auth-field${focusedField === 'email' ? ' auth-field--focus' : ''}`}>
          <label className="auth-label auth-label--with-icon" htmlFor="login-email">
            <Mail size={13} aria-hidden="true" />
            Email
          </label>
          <input
            id="login-email"
            type="email"
            className="auth-input"
            placeholder="you@example.com"
            autoComplete="email"
            required
            value={form.email}
            onChange={e => { setForm({ ...form, email: e.target.value }); touchActivity() }}
            onFocus={handleEmailFocus}
            onBlur={() => setFocusedField(f => (f === 'email' ? null : f))}
          />
        </div>

        {/* Password */}
        <div className={`auth-field${focusedField === 'password' ? ' auth-field--focus' : ''}`}>
          <label className="auth-label" htmlFor="login-password">Password</label>
          <div className="auth-pass-wrap">
            <input
              id="login-password"
              type={showPass ? 'text' : 'password'}
              className="auth-input"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              value={form.password}
              onChange={e => { setForm({ ...form, password: e.target.value }); touchActivity() }}
              onFocus={handlePasswordFocus}
              onBlur={() => setFocusedField(f => (f === 'password' ? null : f))}
            />
            <button
              type="button"
              className="auth-pass-toggle"
              aria-label={showPass ? 'Hide password' : 'Show password'}
              onClick={togglePassword}
            >
              {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          <div className="auth-field-meta auth-field-meta--end">
            <Link to="/forgot-password" className="auth-link auth-link--meta">
              Forgot password?
            </Link>
          </div>
        </div>

        <AuthSubmitButton ready={ready} loading={loading} compact>
          Sign in
        </AuthSubmitButton>
      </form>

      <div className="auth-login-bottom">
        <span className="auth-login-bottom-label">New here?</span>
        <div className="auth-login-bottom-actions">
          <Link
            to={`/register${registerQs}`}
            className="auth-link-btn"
            replace
          >
            Sign up
          </Link>
          <span className="auth-login-bottom-sep">|</span>
          <button
            type="button"
            className="auth-ghost-inline"
            onClick={handleGuest}
            disabled={guestLoading}
          >
            {guestLoading && <span className="loading-spinner" style={{ width: 14, height: 14 }} />}
            Guest login
          </button>
        </div>
      </div>
    </>
  )
}
