import { useEffect } from 'react'

/*
 * Robust body-scroll lock for overlays (drawers, modals, mobile menus, sheets).
 *
 * Plain `body { overflow: hidden }` is NOT reliable on mobile — touch scrolling
 * often still moves the page behind the overlay. The dependable cross-browser
 * fix is to pin the body with `position: fixed` (offset by the current scroll)
 * which fully freezes the window, then restore the exact scroll on release.
 *
 * A module-level reference count keeps stacked overlays safe: the lock is only
 * applied on the first request and released on the last, so opening a second
 * overlay never double-locks or restores to the wrong scroll position.
 */

let lockCount = 0
let savedScrollY = 0
let savedBody = null

function applyLock() {
  const body = document.body
  savedScrollY = window.scrollY || document.documentElement.scrollTop || 0
  savedBody = {
    position: body.style.position,
    top: body.style.top,
    left: body.style.left,
    right: body.style.right,
    width: body.style.width,
    overflow: body.style.overflow,
  }
  body.style.position = 'fixed'
  body.style.top = `-${savedScrollY}px`
  body.style.left = '0'
  body.style.right = '0'
  body.style.width = '100%'
  body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
  // Freezes pages whose scroll lives in a nested container (e.g. AppLayout's
  // `.main-content`) instead of the window — see the CSS rule in global.css.
  document.documentElement.classList.add('scroll-locked')
}

function releaseLock() {
  const body = document.body
  if (savedBody) {
    body.style.position = savedBody.position
    body.style.top = savedBody.top
    body.style.left = savedBody.left
    body.style.right = savedBody.right
    body.style.width = savedBody.width
    body.style.overflow = savedBody.overflow
    savedBody = null
  }
  document.documentElement.style.overflow = ''
  document.documentElement.classList.remove('scroll-locked')
  window.scrollTo(0, savedScrollY)
}

export default function useBodyLock(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    if (lockCount === 0) applyLock()
    lockCount++
    return () => {
      lockCount = Math.max(0, lockCount - 1)
      if (lockCount === 0) releaseLock()
    }
  }, [enabled])
}
