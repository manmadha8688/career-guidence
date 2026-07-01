import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Loader2, Eye, EyeOff, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { forgotPassword, verifyForgotPasswordOtp, resetPassword } from '../../api/api'
import { useAuthForm } from './context/AuthFormContext'
import useForgotPasswordBotStory from './hooks/useForgotPasswordBotStory'
import {
  getPasswordStrength,
  isPasswordValid,
  PASSWORD_HINTS,
  strengthLabel,
  strengthColors,
} from '../../utils/passwordRules'

function getApiError(err, fallback) {
  const data = err.response?.data
  if (data?.error) return data.error
  if (data?.errors?.newPassword) return data.errors.newPassword
  if (data?.errors && typeof data.errors === 'object') {
    const first = Object.values(data.errors)[0]
    if (first) return first
  }
  return fallback
}

export default function ForgotPasswordForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPass, setShowPass] = useState(false)

  const [otpSent, setOtpSent] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [emailError, setEmailError] = useState('')

  const [sendingOtp, setSendingOtp] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)
  const [resetting, setResetting] = useState(false)

  const cooldownRef = useRef(null)
  const redirectTimerRef = useRef(null)
  const passwordFocusedRef = useRef(false)
  const passwordBeatTimerRef = useRef(null)

  const {
    focusedField,
    setFocusedField,
    setPasswordVisible,
    setFormProgress,
    emitCompanionEvent,
    dismissCompanion,
    touchActivity,
    resetCompanion,
  } = useAuthForm()

  useForgotPasswordBotStory(
    email,
    otpSent,
    emailVerified,
    password,
    confirmPassword,
    emitCompanionEvent,
    focusedField,
  )

  const hasEmail = email.trim().length > 0
  const strength = getPasswordStrength(password)
  const passOk = isPasswordValid(password)
  const confirmOk = password === confirmPassword && confirmPassword.length > 0
  const ready = emailVerified && passOk && confirmOk

  useEffect(() => {
    setFormProgress(
      emailVerified
        ? (Number(passOk) + Number(confirmOk)) / 2
        : (Number(hasEmail) + Number(otpSent)) / 2,
    )
  }, [emailVerified, passOk, confirmOk, otpSent, hasEmail, setFormProgress])

  useEffect(() => () => {
    clearTimeout(passwordBeatTimerRef.current)
    resetCompanion()
  }, [])

  useEffect(() => { setPasswordVisible(showPass) }, [showPass, setPasswordVisible])

  const getInitialCooldown = () => {
    const sent = parseInt(sessionStorage.getItem('fp_otp_sent_at') || '0', 10)
    if (!sent) return 0
    const remaining = Math.ceil((sent + 60000 - Date.now()) / 1000)
    return remaining > 0 ? remaining : 0
  }
  const [resendCooldown, setResendCooldown] = useState(getInitialCooldown)

  const startCooldown = (secs = 60) => {
    sessionStorage.setItem('fp_otp_sent_at', String(Date.now()))
    setResendCooldown(secs)
    clearInterval(cooldownRef.current)
    cooldownRef.current = setInterval(() => {
      setResendCooldown(s => {
        if (s <= 1) {
          clearInterval(cooldownRef.current)
          sessionStorage.removeItem('fp_otp_sent_at')
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
          if (s <= 1) {
            clearInterval(cooldownRef.current)
            sessionStorage.removeItem('fp_otp_sent_at')
            return 0
          }
          return s - 1
        })
      }, 1000)
    }
    return () => {
      clearInterval(cooldownRef.current)
      clearTimeout(redirectTimerRef.current)
    }
  }, [])

  useEffect(() => {
    const savedEmail = sessionStorage.getItem('fp_otp_email')
    if (savedEmail && getInitialCooldown() > 0) {
      setEmail(savedEmail)
      setOtpSent(true)
    }
  }, [])

  const handleSendOtp = async () => {
    const normalized = email.trim().toLowerCase()
    if (!normalized) {
      toast.error('Please enter your email address first.')
      return
    }
    setEmailError('')
    setSendingOtp(true)
    try {
      await forgotPassword(normalized)
      setEmail(normalized)
      setOtpSent(true)
      setOtp('')
      startCooldown(60)
      sessionStorage.setItem('fp_otp_email', normalized)
      toast.success('We sent a 6-digit code to your inbox.')
    } catch (err) {
      const status = err.response?.status
      const msg = getApiError(err, 'Failed to send OTP')
      const retryAfter = err.response?.data?.retryAfter
      if (status === 404) {
        setEmailError(msg)
        emitCompanionEvent('FP_EMAIL_NOT_FOUND')
      }
      else if (retryAfter) {
        startCooldown(retryAfter)
        toast.error(`Almost there — wait ${retryAfter}s before requesting another code.`)
      } else toast.error(msg)
    } finally {
      setSendingOtp(false)
    }
  }

  const handleVerifyOtp = async (code = otp) => {
    if (code.length !== 6) return
    setVerifyingOtp(true)
    try {
      await verifyForgotPasswordOtp(email.trim().toLowerCase(), code)
      setEmailVerified(true)
      setOtpSent(false)
      sessionStorage.removeItem('fp_otp_email')
      sessionStorage.removeItem('fp_otp_sent_at')
      toast.success('Email verified. Choose a new password below.')
    } catch (err) {
      emitCompanionEvent('FP_OTP_FAILED')
      toast.error(getApiError(err, 'That code did not work. Check your email and try again.'))
    } finally {
      setVerifyingOtp(false)
    }
  }

  useEffect(() => {
    if (otp.length !== 6 || !otpSent || emailVerified || verifyingOtp) return
    handleVerifyOtp(otp)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp, otpSent, emailVerified])

  const handleResetPassword = async e => {
    e.preventDefault()
    if (!ready) return
    setResetting(true)
    try {
      await resetPassword(email.trim().toLowerCase(), password)
      emitCompanionEvent('FP_RESET_SUCCESS')
      toast.success('Password updated. Taking you to sign in…')
      redirectTimerRef.current = setTimeout(() => navigate('/login', { replace: true }), 1200)
    } catch (err) {
      emitCompanionEvent('FP_RESET_FAILED')
      toast.error(getApiError(err, 'We could not update your password. Please try again.'))
    } finally {
      setResetting(false)
    }
  }

  const resetEmailState = () => {
    setOtpSent(false)
    setEmailVerified(false)
    setOtp('')
    setPassword('')
    setConfirmPassword('')
    setEmailError('')
    sessionStorage.removeItem('fp_otp_email')
    sessionStorage.removeItem('fp_otp_sent_at')
  }

  return (
    <motion.form
      className="auth-form auth-form--forgot"
      onSubmit={handleResetPassword}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h2 className="auth-form-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {emailVerified ? 'Set New Password' : 'Forgot Password'}
      </motion.h2>

      <motion.p
        className="auth-form-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
      >
        {emailVerified
          ? 'Choose a strong new password for your account.'
          : 'Enter your account email. We will verify it and send a one-time code.'}
      </motion.p>

      {!emailVerified && (
      <div className="auth-field auth-field--compact">
        <label className="auth-label auth-label--with-icon" htmlFor="fp-email">
          <Mail size={13} aria-hidden="true" />
          Email address
        </label>
        <div className="auth-inline-row auth-inline-row--otp">
          <input
            id="fp-email"
            type="email"
            className={`auth-input auth-input--forgot${emailError ? ' auth-input--error' : ''}`}
            placeholder="you@example.com"
            autoComplete="email"
            required
            value={email}
            onFocus={() => { setFocusedField('email'); touchActivity() }}
            onChange={e => { setEmail(e.target.value); resetEmailState() }}
          />
          <button
            type="button"
            className="auth-btn-otp auth-btn-otp--xs"
            onClick={handleSendOtp}
            disabled={sendingOtp || resendCooldown > 0 || !email.trim()}
          >
            {sendingOtp ? '…' : otpSent && resendCooldown > 0 ? `${resendCooldown}s` : otpSent ? 'Resend' : 'Send OTP'}
          </button>
        </div>
        {emailError && <div className="auth-error-text">{emailError}</div>}
        {otpSent && !emailVerified && (
          <div className="auth-otp-row auth-otp-row--auto">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              className="auth-input auth-input--forgot auth-input--otp"
              placeholder="000000"
              aria-label="Password reset OTP"
              aria-busy={verifyingOtp}
              value={otp}
              disabled={verifyingOtp}
              onChange={e => {
                const v = e.target.value.replace(/\D/g, '').slice(0, 6)
                setOtp(v)
                if (v.length === 1) emitCompanionEvent('FP_TYPING_OTP')
              }}
            />
            {verifyingOtp && <span className="auth-otp-verifying">Verifying…</span>}
          </div>
        )}
      </div>
      )}

      {emailVerified && (
        <>
          <div className="auth-field auth-field--compact">
            <label className="auth-label" htmlFor="fp-password">New password</label>
            <div className="auth-pass-wrap">
              <input
                id="fp-password"
                type={showPass ? 'text' : 'password'}
                className="auth-input auth-input--forgot"
                placeholder="8+ chars, upper, number, symbol"
                autoComplete="new-password"
                value={password}
                onFocus={() => {
                  setFocusedField('password')
                  touchActivity()
                  clearTimeout(passwordBeatTimerRef.current)
                  if (!passwordFocusedRef.current) {
                    passwordFocusedRef.current = true
                    passwordBeatTimerRef.current = setTimeout(() => {
                      emitCompanionEvent('FP_FOUND_PASSWORD')
                    }, 480)
                  }
                }}
                onChange={e => setPassword(e.target.value)}
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
            {password && (
              <div className="auth-strength-mini">
                <div className="password-strength">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`strength-bar ${i <= strength ? strengthColors[strength] : ''}`} />
                  ))}
                </div>
                <span>{strengthLabel[strength]}</span>
              </div>
            )}
            {password && !passOk && (
              <ul className="auth-password-hints">
                {PASSWORD_HINTS.map(h => (
                  <li key={h.label} className={h.ok(password) ? 'auth-password-hints__item--ok' : undefined}>
                    {h.ok(password) ? <CheckCircle size={10} className="auth-password-hints__icon" /> : null}
                    {h.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="auth-field auth-field--compact">
            <label className="auth-label" htmlFor="fp-confirm">Confirm password</label>
            <input
              id="fp-confirm"
              type="password"
              className={`auth-input auth-input--forgot${confirmPassword && password !== confirmPassword ? ' auth-input--error' : ''}`}
              placeholder="Repeat new password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            {confirmPassword && password !== confirmPassword && (
              <div className="auth-error-text">Passwords do not match.</div>
            )}
          </div>

          <button
            type="submit"
            className="auth-btn-primary auth-btn-primary--flex"
            disabled={resetting || !ready}
          >
            {resetting
              ? <><Loader2 size={15} className="auth-spin" /> Updating…</>
              : 'Set new password'}
          </button>
        </>
      )}

      <div className="auth-forgot-bottom">
        <Link to="/login" className="auth-link auth-link--sm">
          Back to login
        </Link>
      </div>
    </motion.form>
  )
}
