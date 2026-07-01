import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { getMurmurHideMs } from '../hooks/companionMurmurs'

const AuthFormContext = createContext(null)

export function AuthFormProvider({ children }) {
  const [focusedField, setFocusedField] = useState(null)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [formProgress, setFormProgress] = useState(0)
  const [companionEvent, setCompanionEvent] = useState(null)
  const [companionVisible, setCompanionVisible] = useState(false)
  const [lastActivity, setLastActivity] = useState(() => Date.now())
  const hideTimerRef = useRef(null)

  const dismissCompanion = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    hideTimerRef.current = null
    setCompanionVisible(false)
    setCompanionEvent(null)
  }, [])

  const emitCompanionEvent = useCallback((type) => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)

    setCompanionVisible(true)
    setCompanionEvent(prev => {
      const count = prev?.type === type ? (prev.count || 0) + 1 : 0
      const next = { type, id: Date.now(), count }

      hideTimerRef.current = setTimeout(() => {
        setCompanionVisible(false)
        setCompanionEvent(null)
      }, getMurmurHideMs(next))

      return next
    })
  }, [])

  const touchActivity = useCallback(() => {
    setLastActivity(Date.now())
  }, [])

  const resetCompanion = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    setCompanionEvent(null)
    setCompanionVisible(false)
    setLastActivity(Date.now())
  }, [])

  useEffect(() => () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
  }, [])

  const value = useMemo(() => ({
    focusedField,
    setFocusedField,
    passwordVisible,
    setPasswordVisible,
    formProgress,
    setFormProgress,
    companionEvent,
    companionVisible,
    emitCompanionEvent,
    dismissCompanion,
    lastActivity,
    touchActivity,
    resetCompanion,
  }), [
    focusedField,
    passwordVisible,
    formProgress,
    companionEvent,
    companionVisible,
    emitCompanionEvent,
    dismissCompanion,
    lastActivity,
    touchActivity,
    resetCompanion,
  ])

  return (
    <AuthFormContext.Provider value={value}>
      {children}
    </AuthFormContext.Provider>
  )
}

export function useAuthForm() {
  const ctx = useContext(AuthFormContext)
  if (!ctx) throw new Error('useAuthForm must be used within AuthFormProvider')
  return ctx
}
