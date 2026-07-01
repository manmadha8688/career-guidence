import { useEffect, useRef } from 'react'
import { getBeatDurationMs, isValidEmail } from './companionMurmurs'

const EMAIL_INVALID_DEBOUNCE_MS = 700

export default function useLoginBotStory(form, emitBeat, lastActivity, emailFocusedRef) {
  /* ── activity tracking ────────────────────────────────────────── */
  // Refs survive closure capture — safe inside setTimeout callbacks
  const emailRef     = useRef(form.email)
  const passwordRef  = useRef(form.password)

  useEffect(() => {
    emailRef.current    = form.email
    passwordRef.current = form.password
  }, [form])

  const hasActed = () =>
    emailFocusedRef.current ||
    emailRef.current.length > 0 ||
    passwordRef.current.length > 0

  /* ── one-shot flags ──────────────────────────────────────────── */
  const typingEmailPlayed    = useRef(false)
  const typingPasswordPlayed = useRef(false)
  const prevEmailValid       = useRef(false)
  const prevFormValid        = useRef(false)
  const prevEmailInvalid     = useRef(false)
  const invalidDebounce      = useRef(null)

  /* ── derived state ───────────────────────────────────────────── */
  const email      = form.email.trim()
  const emailValid = isValidEmail(email)
  const hasEmail   = email.length > 0
  const hasPassword = form.password.length > 0
  const formValid   = emailValid && hasPassword

  /* ── GREET on mount + idle scheduling ───────────────────────── */
  useEffect(() => {
    let idle6, idle12

    const greetTimer = setTimeout(() => {
      emitBeat('GREET')

      const greetMs = getBeatDurationMs('GREET')

      // 6-second idle fires after greet finishes if user hasn't touched anything
      idle6 = setTimeout(() => {
        if (!hasActed()) emitBeat('IDLE_6S')
      }, greetMs + 6000)

      // 12-second idle fires if still nothing after another 6 s
      idle12 = setTimeout(() => {
        if (!hasActed()) emitBeat('IDLE_12S')
      }, greetMs + 12000)
    }, 380)

    return () => {
      clearTimeout(greetTimer)
      clearTimeout(idle6)
      clearTimeout(idle12)
    }
  // emitBeat is stable (useCallback with no deps), so this runs exactly once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ── first character in email ────────────────────────────────── */
  useEffect(() => {
    if (!hasEmail || typingEmailPlayed.current) return
    typingEmailPlayed.current = true
    emitBeat('TYPING_EMAIL')
  }, [hasEmail, emitBeat])

  /* ── first character in password ────────────────────────────── */
  useEffect(() => {
    if (!hasPassword || typingPasswordPlayed.current) return
    typingPasswordPlayed.current = true
    emitBeat('TYPING_PASSWORD')
  }, [hasPassword, emitBeat])

  /* ── email becomes valid ─────────────────────────────────────── */
  useEffect(() => {
    if (emailValid && !prevEmailValid.current) emitBeat('EMAIL_VALID')
    prevEmailValid.current = emailValid
  }, [emailValid, emitBeat])

  /* ── email becomes invalid (debounced) ──────────────────────── */
  useEffect(() => {
    const isInvalid = hasEmail && !emailValid
    if (isInvalid && !prevEmailInvalid.current) {
      clearTimeout(invalidDebounce.current)
      invalidDebounce.current = setTimeout(
        () => emitBeat('EMAIL_INVALID'),
        EMAIL_INVALID_DEBOUNCE_MS,
      )
    }
    if (!isInvalid) clearTimeout(invalidDebounce.current)
    prevEmailInvalid.current = isInvalid
    return () => clearTimeout(invalidDebounce.current)
  }, [hasEmail, emailValid, emitBeat])

  /* ── form becomes fully valid ────────────────────────────────── */
  useEffect(() => {
    if (formValid && !prevFormValid.current) emitBeat('FORM_VALID')
    prevFormValid.current = formValid
  }, [formValid, emitBeat])

  // Kept for API compat — no-op since we removed RANK_GUESS
  const cancelRankTimer = () => {}
  return { cancelRankTimer }
}
