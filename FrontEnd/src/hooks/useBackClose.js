import { useEffect, useRef } from 'react'

// Makes the browser Back button / Android back-gesture close an open overlay
// (modal, drawer, sheet, menu) instead of navigating away from the page. Once the
// overlay is closed — by Back, a button, or Escape — Back behaves normally again.
//
// All instances share ONE overlay stack and ONE popstate listener. This is what keeps
// sibling overlays from interfering: e.g. when a menu closes because a modal opened on
// top of it, closing the (now buried) menu must NOT rewind history, or its popstate
// would immediately close the modal above it.
//
// Usage:
//   useBackClose(open, onClose)   // conditionally-open overlay
//   useBackClose(true, onClose)   // overlay mounted only while open

const overlayStack = []      // entries, top-most last: { pushed, close }
let ignorePopCount = 0       // popstate events to swallow (from our own history.back())
let listenerAttached = false

function ensureListener() {
  if (listenerAttached || typeof window === 'undefined') return
  window.addEventListener('popstate', () => {
    // Swallow the popstate produced by our own programmatic history.back().
    if (ignorePopCount > 0) { ignorePopCount -= 1; return }
    const top = overlayStack.pop()
    if (top) top.close()
  })
  listenerAttached = true
}

function openEntry(entry) {
  ensureListener()
  overlayStack.push(entry)
  try {
    // Preserve React Router's history state (usr/key/idx) so its index tracking stays
    // consistent — otherwise the dummy entry has no `idx` and RR's Back/Forward (POP)
    // blocking "fails silently" (e.g. the unsaved-changes guard would be skipped on Back).
    window.history.pushState({ ...window.history.state, __overlay: true }, '')
    entry.pushed = true
  } catch {
    entry.pushed = false
  }
}

function closeEntry(entry) {
  const idx = overlayStack.lastIndexOf(entry)
  if (idx === -1) return
  const wasTop = idx === overlayStack.length - 1
  overlayStack.splice(idx, 1)
  // Only rewind history when closing the top-most overlay on the same page. Closing a
  // buried overlay (another opened on top) leaves its dummy entry in place — harmless
  // because it shares the current URL — and avoids firing a popstate that would close
  // the overlay above it. An in-overlay route navigation replaces history.state, so the
  // __overlay guard also prevents us from undoing that navigation.
  if (wasTop && entry.pushed && window.history.state && window.history.state.__overlay) {
    ignorePopCount += 1
    window.history.back()
  }
}

export default function useBackClose(enabled, onClose) {
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!enabled) return undefined
    const entry = { pushed: false, close: () => onCloseRef.current?.() }
    openEntry(entry)
    return () => closeEntry(entry)
  }, [enabled])
}
