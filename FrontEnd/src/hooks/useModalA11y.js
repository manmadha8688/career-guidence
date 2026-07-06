import { useEffect, useRef } from 'react'

// Accessibility helper for modals/drawers. Returns a ref to attach to the dialog
// container. While enabled it:
//   - moves focus into the dialog on open
//   - traps Tab / Shift+Tab focus inside the dialog
//   - closes on Escape
//   - restores focus to the element that opened it on unmount
//
// Usage:
//   const ref = useModalA11y(onClose)               // always-mounted modal
//   const ref = useModalA11y(onClose, open)         // conditionally-open modal
const FOCUSABLE = [
  'a[href]', 'button:not([disabled])', 'textarea:not([disabled])',
  'input:not([disabled])', 'select:not([disabled])', '[tabindex]:not([tabindex="-1"])',
].join(',')

export default function useModalA11y(onClose, enabled = true) {
  const ref = useRef(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

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
