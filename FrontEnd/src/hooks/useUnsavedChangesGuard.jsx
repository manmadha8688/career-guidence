import { useCallback, useEffect, useRef, useState } from 'react'
import { useBlocker } from 'react-router-dom'
import UnsavedChangesModal from '../components/UnsavedChangesModal'

/**
 * Blocks tab close (browser prompt) and in-app navigation when `isDirty`.
 * `onSave` must return true when all pending edits were saved successfully.
 */
export function useUnsavedChangesGuard(isDirty, { onSave, saving = false, contextLabel = 'changes' } = {}) {
  const [modalOpen, setModalOpen] = useState(false)
  const proceedRef = useRef(null)
  /** Set when leave-save continues in LinkVerifyModal (override / retry). */
  const deferredLeaveRef = useRef(false)

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (!isDirty) return false
    return (
      currentLocation.pathname !== nextLocation.pathname
      || currentLocation.search !== nextLocation.search
      || currentLocation.hash !== nextLocation.hash
    )
  })

  useEffect(() => {
    if (!isDirty) return undefined
    const handler = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])

  useEffect(() => {
    if (blocker.state !== 'blocked') return
    proceedRef.current = null
    setModalOpen(true)
  }, [blocker.state])

  const stay = useCallback(() => {
    deferredLeaveRef.current = false
    setModalOpen(false)
    proceedRef.current = null
    if (blocker.state === 'blocked') blocker.reset()
  }, [blocker])

  const finishLeave = useCallback(() => {
    setModalOpen(false)
    const go = proceedRef.current
    proceedRef.current = null
    if (blocker.state === 'blocked') blocker.proceed()
    else if (go) go()
  }, [blocker])

  const discard = useCallback(() => {
    if (saving) return
    deferredLeaveRef.current = false
    finishLeave()
  }, [saving, finishLeave])

  const save = useCallback(async () => {
    if (saving || !onSave) return
    const ok = await onSave()
    if (!ok) return
    deferredLeaveRef.current = false
    finishLeave()
  }, [saving, onSave, finishLeave])

  const notifyDeferredLeave = useCallback(() => {
    deferredLeaveRef.current = true
  }, [])

  /** Call after LinkVerifyModal saves when leave was blocked on verification. */
  const completePendingLeave = useCallback(() => {
    if (!deferredLeaveRef.current) return
    deferredLeaveRef.current = false
    finishLeave()
  }, [finishLeave])

  /** Run `proceed` immediately when clean; otherwise show Save / Discard / Stay. */
  const requestLeave = useCallback((proceed) => {
    if (!isDirty) {
      proceed?.()
      return
    }
    proceedRef.current = proceed ?? null
    setModalOpen(true)
  }, [isDirty])

  const leaveModal = (
    <UnsavedChangesModal
      open={modalOpen}
      busy={saving}
      contextLabel={contextLabel}
      onStay={stay}
      onDiscard={discard}
      onSave={save}
    />
  )

  return { requestLeave, leaveModal, notifyDeferredLeave, completePendingLeave }
}
