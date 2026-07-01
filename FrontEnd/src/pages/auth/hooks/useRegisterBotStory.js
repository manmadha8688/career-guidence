import { useEffect, useRef } from 'react'
import { getBeatDurationMs, isValidEmail } from './companionMurmurs'

const GREET_DELAY_MS = 380
const TYPING_DEBOUNCE_MS = 1600

function passwordStrength(pw) {
  let s = 0
  if (pw.length >= 8)          s++
  if (/[A-Z]/.test(pw))        s++
  if (/[0-9]/.test(pw))        s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  return s
}

export default function useRegisterBotStory(form, emailVerified, otpSent, emitBeat, focusedField) {
  const nameRef     = useRef(form.fullName)
  const emailRef    = useRef(form.email)
  const passwordRef = useRef(form.password)

  useEffect(() => {
    nameRef.current     = form.fullName
    emailRef.current    = form.email
    passwordRef.current = form.password
  }, [form])

  const hasActed = () =>
    nameRef.current.length > 0 || emailRef.current.length > 0

  const typingNamePlayed     = useRef(false)
  const typingEmailPlayed    = useRef(false)
  const emailFormatPlayed    = useRef(false)
  const otpSentPlayed        = useRef(false)
  const otpVerifiedPlayed    = useRef(false)
  const typingPasswordPlayed = useRef(false)
  const passWeakPlayed       = useRef(false)
  const passStrongPlayed     = useRef(false)
  const formReadyPlayed      = useRef(false)
  const prevConfirmMismatch  = useRef(false)
  const greetDoneAt          = useRef(0)

  const hasName     = form.fullName.trim().length > 0
  const hasEmail    = form.email.trim().length > 0
  const emailValid  = isValidEmail(form.email)
  const hasPassword = form.password.length > 0
  const strength    = passwordStrength(form.password)
  const confirmMismatch =
    form.confirmPassword.length > 0 && form.confirmPassword !== form.password
  const formReady =
    form.fullName.trim().length >= 2 &&
    emailVerified &&
    strength >= 4 &&
    form.password === form.confirmPassword &&
    form.confirmPassword.length > 0

  useEffect(() => {
    let idle6
    const greetTimer = setTimeout(() => {
      emitBeat('REG_GREET')
      greetDoneAt.current = Date.now() + getBeatDurationMs('REG_GREET')
      const greetMs = getBeatDurationMs('REG_GREET')
      idle6 = setTimeout(() => {
        if (!hasActed()) emitBeat('REG_IDLE_6S')
      }, greetMs + 6000)
    }, GREET_DELAY_MS)

    return () => {
      clearTimeout(greetTimer)
      clearTimeout(idle6)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (focusedField !== 'fullName') return
    if (!hasName || typingNamePlayed.current) return
    if (Date.now() < greetDoneAt.current + 800) return

    const t = setTimeout(() => {
      if (typingNamePlayed.current) return
      typingNamePlayed.current = true
      emitBeat('REG_TYPING_NAME')
    }, TYPING_DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [hasName, focusedField, emitBeat])

  useEffect(() => {
    if (focusedField !== 'email') return
    if (!hasEmail || typingEmailPlayed.current) return
    if (Date.now() < greetDoneAt.current + 800) return

    const t = setTimeout(() => {
      if (typingEmailPlayed.current) return
      typingEmailPlayed.current = true
      emitBeat('REG_TYPING_EMAIL')
    }, TYPING_DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [hasEmail, focusedField, emitBeat])

  useEffect(() => {
    if (focusedField !== 'email') return
    if (emailValid && !emailFormatPlayed.current) {
      emailFormatPlayed.current = true
      emitBeat('REG_EMAIL_FORMAT_OK')
    }
    if (!emailValid) emailFormatPlayed.current = false
  }, [emailValid, focusedField, emitBeat])

  useEffect(() => {
    if (!otpSent || otpSentPlayed.current) return
    otpSentPlayed.current = true
    emitBeat('REG_OTP_SENT')
  }, [otpSent, emitBeat])

  useEffect(() => {
    if (!emailVerified || otpVerifiedPlayed.current) return
    otpVerifiedPlayed.current = true
    emitBeat('REG_OTP_VERIFIED')
  }, [emailVerified, emitBeat])

  useEffect(() => {
    if (focusedField !== 'password') return
    if (!hasPassword || typingPasswordPlayed.current) return

    const t = setTimeout(() => {
      if (typingPasswordPlayed.current) return
      typingPasswordPlayed.current = true
      emitBeat('REG_TYPING_PASSWORD')
    }, TYPING_DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [hasPassword, focusedField, emitBeat])

  useEffect(() => {
    if (focusedField !== 'password') return
    if (!hasPassword) return
    if (strength <= 1 && !passWeakPlayed.current) {
      passWeakPlayed.current  = true
      passStrongPlayed.current = false
      emitBeat('REG_PASS_WEAK')
    }
    if (strength > 1) passWeakPlayed.current = false
  }, [hasPassword, strength, focusedField, emitBeat])

  useEffect(() => {
    if (focusedField !== 'password' && focusedField !== 'confirmPassword') return
    if (strength >= 4 && !passStrongPlayed.current) {
      passStrongPlayed.current = true
      passWeakPlayed.current   = false
      emitBeat('REG_PASS_STRONG')
    }
    if (strength < 4) passStrongPlayed.current = false
  }, [strength, focusedField, emitBeat])

  useEffect(() => {
    if (confirmMismatch && !prevConfirmMismatch.current) emitBeat('REG_CONFIRM_MISMATCH')
    prevConfirmMismatch.current = confirmMismatch
  }, [confirmMismatch, emitBeat])

  useEffect(() => {
    if (formReady && !formReadyPlayed.current) {
      formReadyPlayed.current = true
      emitBeat('REG_FORM_READY')
    }
    if (!formReady) formReadyPlayed.current = false
  }, [formReady, emitBeat])
}
