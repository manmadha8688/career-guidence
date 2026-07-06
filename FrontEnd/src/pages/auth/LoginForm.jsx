import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { loginUser, guestLogin, googleLogin } from '../../api/api'
import { buildAuthRedirectQuery, resolveAuthRedirect } from '../../utils/authRedirect'
import { getApiError } from '../../utils/apiError'
import toast from 'react-hot-toast'
import AuthSubmitButton from './components/AuthSubmitButton'
import GoogleSignInButton from './components/GoogleSignInButton'
import { useAuthForm } from './context/AuthFormContext'
import useLoginBotStory from './hooks/useLoginBotStory'

export default function LoginForm() {
  const [form, setForm]           = useState({ email: '', password: '' })
  const [loading, setLoading]     = useState(false)
  const [guestLoading, setGuestLoading] = useState(false)
  const [showPass, setShowPass]   = useState(false)

  const { login, showAuthOverlay, completeAuthOverlay, hideAuthOverlay } = useAuth()
  const navigate           = useNavigate()
  const location           = useLocation()
  const redirectTo         = resolveAuthRedirect(location.search, '/')
  const registerQs         = buildAuthRedirectQuery(redirectTo)

  const prevFieldRef        = useRef(null)
  const emailFocusedOnceRef = useRef(false)
  const passwordFocusAtRef  = useRef(null)

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
    focusedField,
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
    cancelRankTimer()
    setFocusedField('email')
    touchActivity()

    if (prevFieldRef.current === 'password') {
      const elapsed = Date.now() - (passwordFocusAtRef.current || 0)
      if (elapsed < 2800) {
        dismissCompanion()
        emitCompanionEvent('EMAIL_RETURN_QUICK')
      } else {
        emitCompanionEvent('EMAIL_RETURN')
      }
    } else if (!emailFocusedOnceRef.current) {
      emailFocusedOnceRef.current = true
      emitCompanionEvent('FOUND_EMAIL')
    }
    prevFieldRef.current = 'email'
  }

  const handlePasswordFocus = () => {
    setFocusedField('password')
    touchActivity()
    prevFieldRef.current = 'password'
    passwordFocusAtRef.current = Date.now()
    emitCompanionEvent('FOCUS_PASSWORD')
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
    } catch (err) {
      hideAuthOverlay()
      toast.error(getApiError(err, 'Guest mode is unavailable right now. Please try again in a moment.'))
    } finally {
      setGuestLoading(false)
    }
  }

  /* ── google ───────────────────────────────────────────────────── */
  const handleGoogleClick = () => {
    dismissCompanion()
    emitCompanionEvent('GOOGLE_CLICK')
  }

  const handleGoogle = async (credential) => {
    setLoading(true)
    showAuthOverlay('login')
    dismissCompanion()
    emitCompanionEvent('GOOGLE_PROCESSING')
    try {
      const { data } = await googleLogin(credential)
      dismissCompanion()
      emitCompanionEvent('GOOGLE_SUCCESS')
      completeAuthOverlay()
      await new Promise(r => setTimeout(r, 800))
      hideAuthOverlay()
      login(data.token, data.user)
      if (data.user.role === 'ADMIN') navigate('/admin-skill-arena')
      else navigate(redirectTo)
    } catch (err) {
      hideAuthOverlay()
      dismissCompanion()
      emitCompanionEvent('GOOGLE_FAILED')
      toast.error(getApiError(err, 'Google sign-in did not complete. Please try again.'))
    } finally {
      setLoading(false)
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
      toast.error(getApiError(err, 'That email or password did not match. Please double-check and try again.'))
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

      <div className="auth-auth-switch">
        <span className="auth-auth-switch__label">New here?</span>
        <Link to={`/register${registerQs}`} className="auth-auth-switch__link" replace>
          Sign up
        </Link>
      </div>

      <GoogleSignInButton text="signin_with" onCredential={handleGoogle} onInteract={handleGoogleClick} disabled={loading || guestLoading} />
      <div className="auth-divider"><span>or sign in with email</span></div>

      <form onSubmit={handleSubmit} className="auth-form auth-form--login-manual">
        {/* Email */}
        <div className={`auth-field auth-field--compact${focusedField === 'email' ? ' auth-field--focus' : ''}`}>
          <label className="auth-label auth-label--with-icon" htmlFor="login-email">
            <Mail size={12} aria-hidden="true" />
            Email
          </label>
          <input
            id="login-email"
            type="email"
            className="auth-input auth-input--compact"
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
        <div className={`auth-field auth-field--compact${focusedField === 'password' ? ' auth-field--focus' : ''}`}>
          <label className="auth-label" htmlFor="login-password">Password</label>
          <div className="auth-pass-wrap">
            <input
              id="login-password"
              type={showPass ? 'text' : 'password'}
              className="auth-input auth-input--compact"
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
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          <div className="auth-field-meta auth-field-meta--end auth-field-meta--compact">
            <Link to="/forgot-password" className="auth-link auth-link--meta">
              Forgot password?
            </Link>
          </div>
        </div>

        <AuthSubmitButton ready={ready} loading={loading} size="sm">
          Sign in
        </AuthSubmitButton>
      </form>

      <div className="auth-guest-row">
        <button
          type="button"
          className="auth-ghost-inline"
          onClick={handleGuest}
          disabled={guestLoading}
        >
          {guestLoading && <span className="loading-spinner loading-spinner--sm" />}
          Guest login
        </button>
      </div>
    </>
  )
}
