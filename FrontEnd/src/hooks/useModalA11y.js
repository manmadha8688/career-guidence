import { useEffect, useRef } from 'react'
import useBackClose from './useBackClose'

// Accessibility helper for modals/drawers. Returns a ref to attach to the dialog
// container. While enabled it:
//   - moves focus into the dialog on open
//   - traps Tab / Shift+Tab focus inside the dialog
//   - closes on Escape
//   - closes on the browser Back button / back-gesture
//   - restores focus to the element that opened it on unmount
//
// Usage:
//   const ref = useModalA11y(onClose)                          // always-mounted modal
//   const ref = useModalA11y(onClose, open)                    // conditionally-open modal
//   const ref = useModalA11y(onClose, open, { backClose:false }) // opt out of Back-to-close
//
// Pass { backClose: false } for dialogs whose lifecycle is owned by React Router's
// useBlocker (e.g. the unsaved-changes / link-verify leave flow). Those manage history
// themselves, so trapping Back here would desync the blocker and break Stay/Discard/Save.
const FOCUSABLE = [
  'a[href]', 'button:not([disabled])', 'textarea:not([disabled])',
  'input:not([disabled])', 'select:not([disabled])', '[tabindex]:not([tabindex="-1"])',
].join(',')

export default function useModalA11y(onClose, enabled = true, { backClose = true } = {}) {
  const ref = useRef(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  // Back button / back-gesture closes the dialog (mobile + desktop), unless opted out.
  useBackClose(enabled && backClose, onClose)

  useEffect(() => {
    if (!enabled) return
    const node = ref.current
    const previouslyFocused = document.activeElement

    const focusables = () =>
      Array.from(node?.querySelectorAll(FOCUSABLE) || []).filter(el => el.offsetParent !== null)

    // Move focus into the dialog (first control, else the container itself).
    const first = focusables()[0]
    if (first) first.focus()
    else if (node) { node.setAttribute('tabindex', '-1'); node.focus() }

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onCloseRef.current?.()
        return
      }
      if (e.key !== 'Tab' || !node) return
      const items = focusables()
      if (!items.length) { e.preventDefault(); return }
      const firstEl = items[0]
      const lastEl = items[items.length - 1]
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault(); lastEl.focus()
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault(); firstEl.focus()
      }
    }

    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('keydown', handleKey)
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus()
      }
    }
  }, [enabled])

  return ref
}
