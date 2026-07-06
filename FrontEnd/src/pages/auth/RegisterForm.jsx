import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { registerUser, sendOtp, verifyOtp, googleLogin } from '../../api/api'
import { buildAuthRedirectQuery, resolveAuthRedirect } from '../../utils/authRedirect'
import { getPasswordStrength, strengthLabel, strengthColors } from '../../utils/passwordRules'
import { getApiError } from '../../utils/apiError'
import toast from 'react-hot-toast'
import AuthSubmitButton from './components/AuthSubmitButton'
import GoogleSignInButton from './components/GoogleSignInButton'
import { useAuthForm } from './context/AuthFormContext'
import useRegisterBotStory from './hooks/useRegisterBotStory'

export default function RegisterForm() {
  const [form, setForm] = useState({
    fullName: '', email: '', password: '', confirmPassword: '',
  })
  const [loading, setLoading]         = useState(false)
  const [showPass, setShowPass]       = useState(false)

  const { login, showAuthOverlay, completeAuthOverlay, hideAuthOverlay } = useAuth()
  const navigate       = useNavigate()
  const location       = useLocation()
  const redirectTo     = resolveAuthRedirect(location.search, '/skill-arena/dashboard')
  const loginQs        = buildAuthRedirectQuery(redirectTo)

  const strength = getPasswordStrength(form.password)

  const {
    focusedField, setFocusedField,
    setPasswordVisible,
    setFormProgress,
    emitCompanionEvent, dismissCompanion,
    touchActivity, resetCompanion,
  } = useAuthForm()

  const emitBeat = emitCompanionEvent

  /* ── OTP state ──────────────────────────────────── */
  const [otpSent, setOtpSent]               = useState(false)
  const [otp, setOtp]                       = useState('')
  const [emailVerified, setEmailVerified]   = useState(false)
  const [emailError, setEmailError]         = useState('')
  const [sendingOtp, setSendingOtp]         = useState(false)
  const [verifyingOtp, setVerifyingOtp]     = useState(false)
  const cooldownRef                         = useRef(null)
  const prevFieldRef                        = useRef(null)
  const passwordFocusAtRef                  = useRef(null)
  const passwordBeatTimerRef                = useRef(null)

  const getInitialCooldown = () => {
    const sent = parseInt(sessionStorage.getItem('otp_sent_at') || '0', 10)
    if (!sent) return 0
    const remaining = Math.ceil((sent + 60000 - Date.now()) / 1000)
    return remaining > 0 ? remaining : 0
  }
  const [resendCooldown, setResendCooldown] = useState(getInitialCooldown)

  /* ── bot story ──────────────────────────────────── */
  useRegisterBotStory(form, emailVerified, otpSent, emitBeat, focusedField)

  /* ── validation ─────────────────────────────────── */
  const nameOk    = form.fullName.trim().length >= 2
  const emailOk   = emailVerified
  const passOk    = strength >= 4
  const confirmOk = form.password === form.confirmPassword && form.confirmPassword.length > 0
  const ready     = nameOk && emailOk && passOk && confirmOk

  /* ── sync context ───────────────────────────────── */
  useEffect(() => {
    setFormProgress([nameOk, emailOk, passOk, confirmOk].filter(Boolean).length / 4)
  }, [nameOk, emailOk, passOk, confirmOk, setFormProgress])

  useEffect(() => {
    setFormProgress(0)
    setFocusedField(null)
    return () => {
      clearTimeout(passwordBeatTimerRef.current)
      resetCompanion()
      setFormProgress(0)
      setFocusedField(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { setPasswordVisible(showPass) }, [showPass, setPasswordVisible])

  /* ── cooldown timers ────────────────────────────── */
  const startCooldown = (secs = 60) => {
    sessionStorage.setItem('otp_sent_at', String(Date.now()))
    setResendCooldown(secs)
    clearInterval(cooldownRef.current)
    cooldownRef.current = setInterval(() => {
      setResendCooldown(s => {
        if (s <= 1) {
          clearInterval(cooldownRef.current)
          sessionStorage.removeItem('otp_sent_at')
          return 0
        }
        return s - 1
      })
    }, 1000)
  }

  useEffect(() => {
    const initial = getInitialCooldown()
    if (initial > 0) {
      setResendCooldown(initial)
      cooldownRef.current = setInterval(() => {
        setResendCooldown(s => {
          if (s <= 1) { clearInterval(cooldownRef.current); sessionStorage.removeItem('otp_sent_at'); return 0 }
          return s - 1
        })
      }, 1000)
    }
    return () => clearInterval(cooldownRef.current)
  }, [])

  useEffect(() => {
    const savedEmail = sessionStorage.getItem('otp_email')
    if (savedEmail && getInitialCooldown() > 0) {
      setOtpSent(true)
      setForm(f => ({ ...f, email: savedEmail }))
    }
  }, [])

  /* ── OTP actions ────────────────────────────────── */
  const handleSendOtp = async () => {
    if (!form.email) { toast.error('Please enter your email address first.'); return }
    setEmailError('')
    setSendingOtp(true)
    try {
      await sendOtp(form.email)
      setOtpSent(true)
      setOtp('')
      startCooldown(60)
      sessionStorage.setItem('otp_email', form.email)
      toast.success('We sent a 6-digit code to your inbox.')
    } catch (err) {
      const status      = err.response?.status
      const msg         = getApiError(err, 'We could not send the code. Please try again.')
      const retryAfter  = err.response?.data?.retryAfter
      if (status === 409)  setEmailError(msg)
      else if (retryAfter) { startCooldown(retryAfter); toast.error(`Almost there — please wait ${retryAfter}s before requesting another code.`) }
      else toast.error(msg)
    } finally {
      setSendingOtp(false)
    }
  }

  const handleVerifyOtp = async (code = otp) => {
    if (code.length !== 6) return
    setVerifyingOtp(true)
    try {
      await verifyOtp(form.email, code)
      setEmailVerified(true)
      setOtpSent(false)
      sessionStorage.removeItem('otp_email')
      sessionStorage.removeItem('otp_sent_at')
      toast.success('Your email is verified. You can finish signing up.')
    } catch (err) {
      toast.error(getApiError(err, 'That code did not work. Please check your email and try again.'))
    } finally {
      setVerifyingOtp(false)
    }
  }

  useEffect(() => {
    if (otp.length !== 6 || !otpSent || emailVerified || verifyingOtp) return
    handleVerifyOtp(otp)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp, otpSent, emailVerified])

  /* ── google ─────────────────────────────────────── */
  const handleGoogleClick = () => {
    dismissCompanion()
    emitBeat('REG_GOOGLE_CLICK')
  }

  const handleGoogle = async (credential) => {
    setLoading(true)
    showAuthOverlay('register')
    dismissCompanion()
    emitBeat('REG_GOOGLE_PROCESSING')
    try {
      const { data } = await googleLogin(credential)
      dismissCompanion()
      emitBeat('REG_GOOGLE_SUCCESS')
      completeAuthOverlay()
      await new Promise(r => setTimeout(r, 700))
      hideAuthOverlay()
      login(data.token, data.user)
      navigate(redirectTo)
    } catch (err) {
      hideAuthOverlay()
      dismissCompanion()
      emitBeat('REG_GOOGLE_FAILED')
      toast.error(getApiError(err, 'Google sign-up did not complete. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  /* ── submit ─────────────────────────────────────── */
  const handleSubmit = async e => {
    e.preventDefault()
    if (!ready) return
    setLoading(true)
    showAuthOverlay('register')
    dismissCompanion()
    emitBeat('LOGIN_PROCESSING')
    try {
      const { fullName, email, password } = form
      const { data } = await registerUser({ fullName, email, password })
      dismissCompanion()
      emitBeat('REG_SUCCESS')
      completeAuthOverlay()
      await new Promise(r => setTimeout(r, 700))
      hideAuthOverlay()
      login(data.token, data.user)
      navigate(redirectTo)
    } catch (err) {
      hideAuthOverlay()
      dismissCompanion()
      emitBeat('REG_FAILED')
      toast.error(getApiError(err, 'We could not create your account. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  const resetEmailState = () => {
    setEmailVerified(false)
    setOtpSent(false)
    setEmailError('')
    sessionStorage.removeItem('otp_email')
    sessionStorage.removeItem('otp_sent_at')
  }

  /* ── render ─────────────────────────────────────── */
  return (
    <>
      <motion.h1
        className="auth-form-title"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Register your hunter profile
      </motion.h1>

      <div className="auth-auth-switch">
        <span className="auth-auth-switch__label">Already have an account?</span>
        <Link to={`/login${loginQs}`} className="auth-auth-switch__link" replace>
          Sign in
        </Link>
      </div>

      <GoogleSignInButton text="signup_with" onCredential={handleGoogle} onInteract={handleGoogleClick} disabled={loading} />
      <div className="auth-divider"><span>or register with email</span></div>

      <form onSubmit={handleSubmit} className="auth-form auth-form--register">

        {/* Full Name */}
        <div className={`auth-field auth-field--compact${focusedField === 'fullName' ? ' auth-field--focus' : ''}`}>
          <label className="auth-label" htmlFor="reg-name">Full Name</label>
          <input
            id="reg-name"
            type="text"
            className="auth-input auth-input--compact"
            placeholder="Your full name"
            autoComplete="name"
            value={form.fullName}
            onChange={e => { setForm({ ...form, fullName: e.target.value }); touchActivity() }}
            onFocus={() => { emitBeat('REG_FOUND_NAME'); setFocusedField('fullName'); touchActivity() }}
            onBlur={() => setFocusedField(f => f === 'fullName' ? null : f)}
          />
        </div>

        {/* Email + OTP verify */}
        <div className={`auth-field auth-field--compact${focusedField === 'email' ? ' auth-field--focus' : ''}`}>
          <label className="auth-label" htmlFor="reg-email">Email</label>
          <div className="auth-inline-row">
            <input
              id="reg-email"
              type="email"
              className={`auth-input auth-input--compact${emailVerified ? ' auth-input--success' : emailError ? ' auth-input--error' : ''}`}
              placeholder="you@email.com"
              autoComplete="email"
              value={form.email}
              onChange={e => { setForm({ ...form, email: e.target.value }); resetEmailState(); touchActivity() }}
              onFocus={() => {
                clearTimeout(passwordBeatTimerRef.current)
                if (prevFieldRef.current === 'password') {
                  const elapsed = Date.now() - (passwordFocusAtRef.current || 0)
                  emitBeat(elapsed < 2800 ? 'REG_EMAIL_RETURN_QUICK' : 'REG_EMAIL_RETURN')
                } else {
                  emitBeat('REG_FOUND_EMAIL')
                }
                setFocusedField('email')
                touchActivity()
                prevFieldRef.current = 'email'
              }}
              onBlur={() => setFocusedField(f => f === 'email' ? null : f)}
              disabled={emailVerified}
            />
            {!emailVerified && (
              <button
                type="button"
                className="auth-btn-otp auth-btn-otp--compact"
                onClick={handleSendOtp}
                disabled={sendingOtp || resendCooldown > 0}
              >
                {sendingOtp ? '…' : otpSent && resendCooldown > 0 ? `${resendCooldown}s` : otpSent ? 'Resend' : 'Verify'}
              </button>
            )}
            {emailVerified && (
              <span className="auth-verified-badge"><ShieldCheck size={15} /> OK</span>
            )}
          </div>
          {emailError && (
            <div className="auth-error-text">
              {emailError}{' '}
              <Link to={`/login${loginQs}`} className="auth-link" replace>Sign in?</Link>
            </div>
          )}
          {otpSent && !emailVerified && (
            <div className="auth-otp-row auth-otp-row--auto">
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                className="auth-input auth-input--compact auth-input--otp"
                placeholder="000000"
                aria-label="Email verification OTP"
                aria-busy={verifyingOtp}
                value={otp}
                disabled={verifyingOtp}
                onChange={e => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); touchActivity() }}
                onFocus={() => { emitBeat('REG_OTP_FOCUS'); setFocusedField('otp'); touchActivity(); prevFieldRef.current = 'otp' }}
                onBlur={() => setFocusedField(f => f === 'otp' ? null : f)}
              />
              {verifyingOtp && (
                <span className="auth-otp-verifying">Verifying…</span>
              )}
            </div>
          )}
        </div>

        {/* Password + Confirm (side by side) */}
        <div className="auth-field-row">
          <div className={`auth-field auth-field--compact${focusedField === 'password' ? ' auth-field--focus' : ''}`}>
            <label className="auth-label" htmlFor="reg-password">Password</label>
            <div className="auth-pass-wrap">
              <input
                id="reg-password"
                type={showPass ? 'text' : 'password'}
                className="auth-input auth-input--compact"
                placeholder="8+ chars"
                autoComplete="new-password"
                value={form.password}
                onChange={e => { setForm({ ...form, password: e.target.value }); touchActivity() }}
                onFocus={() => {
                  setFocusedField('password')
                  touchActivity()
                  prevFieldRef.current = 'password'
                  passwordFocusAtRef.current = Date.now()
                  clearTimeout(passwordBeatTimerRef.current)
                  passwordBeatTimerRef.current = setTimeout(() => {
                    emitBeat('REG_FOUND_PASSWORD')
                  }, 480)
                }}
                onBlur={() => setFocusedField(f => f === 'password' ? null : f)}
              />
              <button
                type="button"
                className="auth-pass-toggle"
                aria-label={showPass ? 'Hide password' : 'Show password'}
                onClick={() => setShowPass(p => !p)}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {form.password && (
              <div className="auth-strength-mini">
                <div className="password-strength">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`strength-bar ${i <= strength ? strengthColors[strength] : ''}`} />
                  ))}
                </div>
                <span>{strengthLabel[strength]}</span>
              </div>
            )}
          </div>

          <div className={`auth-field auth-field--compact${focusedField === 'confirm' ? ' auth-field--focus' : ''}`}>
            <label className="auth-label" htmlFor="reg-confirm">Confirm</label>
            <input
              id="reg-confirm"
              type="password"
              className={`auth-input auth-input--compact${form.confirmPassword && form.password !== form.confirmPassword ? ' auth-input--error' : ''}`}
              placeholder="Repeat"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={e => { setForm({ ...form, confirmPassword: e.target.value }); touchActivity() }}
              onFocus={() => { setFocusedField('confirm'); touchActivity() }}
              onBlur={() => setFocusedField(f => f === 'confirm' ? null : f)}
            />
          </div>
        </div>

        <AuthSubmitButton ready={ready} loading={loading} compact>
          Create account
        </AuthSubmitButton>
      </form>
    </>
  )
}
