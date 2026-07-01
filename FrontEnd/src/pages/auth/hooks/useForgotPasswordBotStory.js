import { useEffect, useRef } from 'react'
import { getBeatDurationMs, isValidEmail } from './companionMurmurs'

const GREET_DELAY_MS = 380

function passwordStrength(pw) {
  let s = 0
  if (pw.length >= 8)          s++
  if (/[A-Z]/.test(pw))        s++
  if (/[0-9]/.test(pw))        s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  return s
}

/**
 * Forgot-password bot story — pre-verify (email/OTP) and post-verify (new password).
 */
export default function useForgotPasswordBotStory(
  email,
  otpSent,
  emailVerified,
  password,
  confirmPassword,
  emitBeat,
) {
  const emailRef = useRef(email)
  useEffect(() => { emailRef.current = email }, [email])

  const hasActed = () => emailRef.current.trim().length > 0

  const typingEmailPlayed    = useRef(false)
  const emailValidPlayed     = useRef(false)
  const otpSentPlayed        = useRef(false)
  const otpVerifiedPlayed    = useRef(false)
  const typingPasswordPlayed = useRef(false)
  const passWeakPlayed       = useRef(false)
  const passStrongPlayed     = useRef(false)
  const formReadyPlayed      = useRef(false)
  const prevConfirmMismatch  = useRef(false)
  const postVerifyGreetPlayed = useRef(false)

  const normalizedEmail = email.trim()
  const hasEmail        = normalizedEmail.length > 0
  const emailValid      = isValidEmail(normalizedEmail)
  const hasPassword     = password.length > 0
  const strength        = passwordStrength(password)
  const confirmMismatch =
    confirmPassword.length > 0 && confirmPassword !== password
  const formReady =
    emailVerified &&
    strength >= 4 &&
    password === confirmPassword &&
    confirmPassword.length > 0

  /* ── GREET — forgot password landing ── */
  useEffect(() => {
    let idle6
    const greetTimer = setTimeout(() => {
      emitBeat('FP_GREET')
      const greetMs = getBeatDurationMs('FP_GREET')
      idle6 = setTimeout(() => {
        if (!hasActed()) emitBeat('FP_IDLE_6S')
      }, greetMs + 6000)
    }, GREET_DELAY_MS)
    return () => {
      clearTimeout(greetTimer)
      clearTimeout(idle6)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!hasEmail || typingEmailPlayed.current) return
    typingEmailPlayed.current = true
    emitBeat('FP_TYPING_EMAIL')
  }, [hasEmail, emitBeat])

  useEffect(() => {
    if (emailValid && !emailValidPlayed.current) {
      emailValidPlayed.current = true
      emitBeat('FP_EMAIL_VALID')
    }
    if (!emailValid) emailValidPlayed.current = false
  }, [emailValid, emitBeat])

  useEffect(() => {
    if (!otpSent || otpSentPlayed.current) return
    otpSentPlayed.current = true
    emitBeat('FP_OTP_SENT')
  }, [otpSent, emitBeat])

  useEffect(() => {
    if (!emailVerified || otpVerifiedPlayed.current) return
    otpVerifiedPlayed.current = true
    emitBeat('FP_OTP_VERIFIED')
  }, [emailVerified, emitBeat])

  /* ── Post-verify welcome beat ── */
  useEffect(() => {
    if (!emailVerified || postVerifyGreetPlayed.current) return
    postVerifyGreetPlayed.current = true
    const t = setTimeout(() => emitBeat('FP_NEW_PASS_GREET'), 600)
    return () => clearTimeout(t)
  }, [emailVerified, emitBeat])

  useEffect(() => {
    if (!hasPassword || typingPasswordPlayed.current) return
    typingPasswordPlayed.current = true
    emitBeat('FP_TYPING_PASSWORD')
  }, [hasPassword, emitBeat])

  useEffect(() => {
    if (!hasPassword) return
    if (strength <= 1 && !passWeakPlayed.current) {
      passWeakPlayed.current = true
      passStrongPlayed.current = false
      emitBeat('FP_PASS_WEAK')
    }
    if (strength > 1) passWeakPlayed.current = false
  }, [hasPassword, strength, emitBeat])

  useEffect(() => {
    if (strength >= 4 && !passStrongPlayed.current) {
      passStrongPlayed.current = true
      passWeakPlayed.current = false
      emitBeat('FP_PASS_STRONG')
    }
    if (strength < 4) passStrongPlayed.current = false
  }, [strength, emitBeat])

  useEffect(() => {
    if (confirmMismatch && !prevConfirmMismatch.current) emitBeat('FP_CONFIRM_MISMATCH')
    prevConfirmMismatch.current = confirmMismatch
  }, [confirmMismatch, emitBeat])

  useEffect(() => {
    if (formReady && !formReadyPlayed.current) {
      formReadyPlayed.current = true
      emitBeat('FP_FORM_READY')
    }
    if (!formReady) formReadyPlayed.current = false
  }, [formReady, emitBeat])
}
