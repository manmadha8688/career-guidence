import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  getMurmurHideMs,
  getLineReadMs,
  BEAT_TAIL_MS,
  beatPriority,
} from '../hooks/companionMurmurs'

const AuthFormContext = createContext(null)

export function AuthFormProvider({ children }) {
  const [focusedField, setFocusedField] = useState(null)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [formProgress, setFormProgress] = useState(0)
  const [companionEvent, setCompanionEvent] = useState(null)
  const [companionVisible, setCompanionVisible] = useState(false)
  // Activity timestamp is never rendered (only passed to useLoginBotStory, which ignores
  // it) — a ref keeps it available without re-creating the context value on every touch.
  const lastActivity = useRef(Date.now())

  const hideTimerRef = useRef(null)
  const safetyTimerRef = useRef(null)
  const lastEmitRef = useRef({ type: null, at: 0 })
  const activeBeatRef = useRef(null)
  const pendingBeatRef = useRef(null)

  const clearBeatTimers = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current)
    hideTimerRef.current = null
    safetyTimerRef.current = null
  }, [])

  const finishBeat = useCallback(() => {
    if (!activeBeatRef.current) return
    clearBeatTimers()
    activeBeatRef.current = null
    setCompanionVisible(false)
    setCompanionEvent(null)

    const pending = pendingBeatRef.current
    if (pending) {
      pendingBeatRef.current = null
      // Defer so React flushes the clear before the next beat starts
      setTimeout(() => startBeatRef.current?.(pending), 40)
    }
  }, [clearBeatTimers])

  const startBeatRef = useRef(null)

  const startBeat = useCallback((type) => {
    const now = Date.now()
    const prev = activeBeatRef.current
    const count = prev?.type === type ? (prev.count || 0) + 1 : 0
    const next = { type, id: now, count, startedAt: now }

    clearBeatTimers()
    lastEmitRef.current = { type, at: now }
    activeBeatRef.current = next

    setCompanionVisible(true)
    setCompanionEvent(next)

    // Safety net — never cut a beat shorter than its full script
    safetyTimerRef.current = setTimeout(finishBeat, getMurmurHideMs(next) + 350)
  }, [clearBeatTimers, finishBeat])

  startBeatRef.current = startBeat

  const emitCompanionEvent = useCallback((type) => {
    const now = Date.now()
    const last = lastEmitRef.current
    if (last.type === type && now - last.at < 700) return

    const current = activeBeatRef.current
    if (current) {
      const curPri = beatPriority(current.type)
      const newPri = beatPriority(type)
      const elapsed = now - (current.startedAt || now)

      // Never interrupt a high-priority narrative beat mid-play
      if (newPri < curPri && elapsed < getMurmurHideMs(current) - 400) {
        pendingBeatRef.current = type
        return
      }
    }

    startBeat(type)
  }, [startBeat])

  /** Called when the last line of a beat is shown — hide after readable time. */
  const armLastLineTimer = useCallback((lineText) => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    hideTimerRef.current = setTimeout(
      finishBeat,
      getLineReadMs(lineText) + BEAT_TAIL_MS,
    )
  }, [finishBeat])

  const dismissCompanion = useCallback(() => {
    pendingBeatRef.current = null
    clearBeatTimers()
    activeBeatRef.current = null
    setCompanionVisible(false)
    setCompanionEvent(null)
  }, [clearBeatTimers])

  const touchActivity = useCallback(() => {
    lastActivity.current = Date.now()
  }, [])

  const resetCompanion = useCallback(() => {
    pendingBeatRef.current = null
    clearBeatTimers()
    activeBeatRef.current = null
    setCompanionEvent(null)
    setCompanionVisible(false)
    lastActivity.current = Date.now()
  }, [clearBeatTimers])

  useEffect(() => () => clearBeatTimers(), [clearBeatTimers])

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
    armLastLineTimer,
    lastActivity: lastActivity.current,
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
    armLastLineTimer,
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
