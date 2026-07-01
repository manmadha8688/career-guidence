import { useEffect, useRef } from 'react'
import { getBeatDurationMs, isValidEmail } from './companionMurmurs'

const EMAIL_INVALID_DEBOUNCE_MS = 1000
const PASSWORD_TYPING_DELAY_MS = 800

export default function useLoginBotStory(form, emitBeat, lastActivity, emailFocusedRef, focusedField) {
  const emailRef        = useRef(form.email)
  const passwordRef     = useRef(form.password)
  const focusedFieldRef = useRef(focusedField)
  const passwordFocusAt = useRef(0)

  useEffect(() => {
    emailRef.current    = form.email
    passwordRef.current = form.password
  }, [form])

  useEffect(() => {
    focusedFieldRef.current = focusedField
    if (focusedField === 'password') passwordFocusAt.current = Date.now()
  }, [focusedField])

  const hasActed = () =>
    emailFocusedRef.current ||
    emailRef.current.length > 0 ||
    passwordRef.current.length > 0

  const typingEmailPlayed    = useRef(false)
  const typingPasswordPlayed = useRef(false)
  const prevEmailValid       = useRef(false)
  const prevFormValid        = useRef(false)
  const prevEmailInvalid     = useRef(false)
  const invalidDebounce      = useRef(null)
  const greetDoneAt          = useRef(0)
  const idle6Ref             = useRef(null)
  const idle12Ref            = useRef(null)

  const email       = form.email.trim()
  const emailValid  = isValidEmail(email)
  const hasEmail    = email.length > 0
  const hasPassword = form.password.length > 0
  const formValid   = emailValid && hasPassword

  useEffect(() => {
    const greetTimer = setTimeout(() => {
      emitBeat('GREET')
      greetDoneAt.current = Date.now() + getBeatDurationMs('GREET')
      const greetMs = getBeatDurationMs('GREET')

      idle6Ref.current = setTimeout(() => {
        if (!hasActed()) emitBeat('IDLE_6S')
      }, greetMs + 6000)

      idle12Ref.current = setTimeout(() => {
        if (!hasActed()) emitBeat('IDLE_12S')
      }, greetMs + 12000)
    }, 380)

    return () => {
      clearTimeout(greetTimer)
      clearTimeout(idle6Ref.current)
      clearTimeout(idle12Ref.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (focusedField !== 'email') return
    if (!hasEmail || typingEmailPlayed.current) return
    if (Date.now() < greetDoneAt.current) return

    const t = setTimeout(() => {
      if (typingEmailPlayed.current || focusedFieldRef.current !== 'email') return
      typingEmailPlayed.current = true
      emitBeat('TYPING_EMAIL')
    }, 1800)
    return () => clearTimeout(t)
  }, [hasEmail, focusedField, emitBeat])

  useEffect(() => {
    if (focusedField !== 'password') return
    if (!hasPassword || typingPasswordPlayed.current) return

    // Wait for the full password-privacy skit to finish before typing banter
    const sinceFocus = Date.now() - passwordFocusAt.current
    const waitMs = Math.max(
      PASSWORD_TYPING_DELAY_MS,
      getBeatDurationMs('FOCUS_PASSWORD') - sinceFocus + PASSWORD_TYPING_DELAY_MS,
    )

    const t = setTimeout(() => {
      if (typingPasswordPlayed.current || focusedFieldRef.current !== 'password') return
      typingPasswordPlayed.current = true
      emitBeat('TYPING_PASSWORD')
    }, waitMs)
    return () => clearTimeout(t)
  }, [hasPassword, focusedField, emitBeat])

  useEffect(() => {
    if (focusedField !== 'email') return
    if (emailValid && !prevEmailValid.current) emitBeat('EMAIL_VALID')
    prevEmailValid.current = emailValid
  }, [emailValid, focusedField, emitBeat])

  useEffect(() => {
    if (focusedField !== 'email') return
    const isInvalid = hasEmail && !emailValid
    if (isInvalid && !prevEmailInvalid.current) {
      clearTimeout(invalidDebounce.current)
      invalidDebounce.current = setTimeout(
        () => {
          if (focusedFieldRef.current === 'email') emitBeat('EMAIL_INVALID')
        },
        EMAIL_INVALID_DEBOUNCE_MS,
      )
    }
    if (!isInvalid) clearTimeout(invalidDebounce.current)
    prevEmailInvalid.current = isInvalid
    return () => clearTimeout(invalidDebounce.current)
  }, [hasEmail, emailValid, focusedField, emitBeat])

  useEffect(() => {
    if (formValid && !prevFormValid.current) {
      const t = setTimeout(() => emitBeat('FORM_VALID'), 600)
      prevFormValid.current = true
      return () => clearTimeout(t)
    }
    if (!formValid) prevFormValid.current = false
  }, [formValid, emitBeat])

  const cancelRankTimer = () => {}
  return { cancelRankTimer }
}
