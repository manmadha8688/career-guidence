import { useCallback, useEffect, useRef, useState } from 'react'
import { useBlocker, useNavigate } from 'react-router-dom'
import UnsavedChangesModal from '../components/UnsavedChangesModal'

/**
 * Blocks tab close (browser prompt) and in-app navigation when `isDirty`.
 * `onSave` must return true when all pending edits were saved successfully.
 */
export function useUnsavedChangesGuard(isDirty, { onSave, saving = false, contextLabel = 'changes', sections = null } = {}) {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const proceedRef = useRef(null)
  /** Set when leave-save continues in LinkVerifyModal (override / retry). */
  const deferredLeaveRef = useRef(false)
  /** Destination captured when the blocker fires, so we can leave even if it later resets. */
  const pendingLocationRef = useRef(null)
  /** One-shot: lets the guarded leave through when we navigate manually after a reset. */
  const bypassRef = useRef(false)

  const blocker = useBlocker(({ currentLocation, nextLocation, historyAction }) => {
    // Let our own post-reset leave through (mobile: a menu's Back-to-close popstate can
    // reset the blocker before the user picks Stay/Discard/Save).
    if (bypassRef.current) return false
    if (!isDirty) return false
    // Browser Back/Forward (POP) is handled by the sentinel trap below — React Router's
    // POP blocking relies on its internal history `idx` and fails silently when any entry
    // lacks it (e.g. after overlay Back-traps). PUSH/REPLACE (link clicks) stay here.
    if (historyAction === 'POP') return false
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

  // Reliable browser Back/Forward guard: while dirty, keep a same-URL "sentinel" history
  // entry on top. The first Back lands us right back on this page (URL unchanged) and we
  // re-arm the sentinel + open the modal, so nothing is lost until the user chooses.
  useEffect(() => {
    if (!isDirty) return undefined
    let leaving = false
    window.history.pushState({ ...window.history.state, __unsavedSentinel: true }, '')
    const onPop = () => {
      if (leaving) return
      // Landing back ON the sentinel means an overlay (menu/modal) above it was just
      // closed by Back — not a page-leave. Keep the sentinel and let the overlay handle it.
      if (window.history.state && window.history.state.__unsavedSentinel) return
      window.history.pushState({ ...window.history.state, __unsavedSentinel: true }, '')
      // Complete the intended leave by stepping back past the sentinel and this page.
      proceedRef.current = () => { leaving = true; window.history.go(-2) }
      pendingLocationRef.current = null
      setModalOpen(true)
    }
    window.addEventListener('popstate', onPop)
    return () => {
      window.removeEventListener('popstate', onPop)
      // Clean up the sentinel on a normal (saved / clean) unmount so we don't leave a
      // dangling duplicate entry behind.
      if (!leaving && window.history.state && window.history.state.__unsavedSentinel) {
        window.history.back()
      }
    }
  }, [isDirty])

  useEffect(() => {
    if (blocker.state !== 'blocked') return
    proceedRef.current = null
    pendingLocationRef.current = blocker.location || null
    setModalOpen(true)
  }, [blocker.state]) // eslint-disable-line react-hooks/exhaustive-deps

  const stay = useCallback(() => {
    deferredLeaveRef.current = false
    pendingLocationRef.current = null
    setModalOpen(false)
    proceedRef.current = null
    if (blocker.state === 'blocked') blocker.reset()
  }, [blocker])

  const finishLeave = useCallback(() => {
    setModalOpen(false)
    const go = proceedRef.current
    const dest = pendingLocationRef.current
    proceedRef.current = null
    pendingLocationRef.current = null
    if (blocker.state === 'blocked') {
      blocker.proceed()
    } else if (go) {
      go()
    } else if (dest) {
      // Blocker was reset out from under us (mobile menu Back-to-close). Complete the
      // intended leave manually, bypassing the guard for this one navigation.
      bypassRef.current = true
      navigate(dest.pathname + (dest.search || '') + (dest.hash || ''))
      setTimeout(() => { bypassRef.current = false }, 0)
    }
  }, [blocker, navigate])

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
      sections={sections}
      onStay={stay}
      onDiscard={discard}
      onSave={save}
    />
  )

  return { requestLeave, leaveModal, notifyDeferredLeave, completePendingLeave }
}
