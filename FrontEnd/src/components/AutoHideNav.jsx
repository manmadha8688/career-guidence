import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Toggles `nav-hidden` on <html> based on scroll direction so top navbars
// slide up + hide when scrolling down and reappear when scrolling up.
// CSS in global.css targets the landing/Code Gym/AI Lab/Deployment/Missions
// navbars only — the admin and Skill Arena bars are unaffected.
//
// Uses a capture-phase listener so it also catches pages that scroll an inner
// container (e.g. .ps-page / .ailab-page set overflow-x:hidden, which makes the
// element its own scroll container instead of the window). Resets on route change.
const SHOW_NEAR_TOP = 60
const DIRECTION_THRESHOLD = 6

const isWindowScroll = (target) =>
  target === document || target === window || target === document.documentElement || target === document.body

const getScrollTop = (target) =>
  isWindowScroll(target)
    ? window.scrollY || document.documentElement.scrollTop || 0
    : target.scrollTop || 0

// Horizontal-only scrollers (e.g. the deployment station chip rail) opt out with
// `data-nav-ignore-scroll` — their scrollTop stays 0, which would otherwise read
// as "near top" and re-show the navbar on every horizontal nudge.
const ignoresNavScroll = (target) =>
  target instanceof Element && target.closest('[data-nav-ignore-scroll]') !== null

export default function AutoHideNav() {
  const { pathname } = useLocation()

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('nav-hidden')

    const positions = new WeakMap()
    let pending = null
    let ticking = false

    const process = () => {
      ticking = false
      const target = pending
      if (!target) return
      const cur = getScrollTop(target)
      const key = isWindowScroll(target) ? window : target
      const prev = positions.get(key) ?? 0
      positions.set(key, cur)

      if (cur <= SHOW_NEAR_TOP) {
        root.classList.remove('nav-hidden')
        return
      }
      const delta = cur - prev
      if (delta > DIRECTION_THRESHOLD) root.classList.add('nav-hidden')
      else if (delta < -DIRECTION_THRESHOLD) root.classList.remove('nav-hidden')
    }

    const onScroll = (e) => {
      // While an overlay locks the background (useBodyLock adds `scroll-locked`),
      // the page itself isn't scrolling — only the overlay's inner content is.
      // Ignore those so the navbar doesn't hide behind an open drawer/modal and
      // then get stuck hidden after it closes.
      if (root.classList.contains('scroll-locked')) return
      // Skill Arena subject / path / concept panels — keep navbar pinned while open.
      if (root.classList.contains('dash-panel-lock')) return
      // A page can freeze show/hide during a programmatic jump (e.g. the
      // deployment station rail) so the animated scroll can't flicker the navbar.
      if (root.classList.contains('nav-jump-lock')) return
      // Ignore opted-out (horizontal-only) scrollers so they don't toggle the navbar.
      if (ignoresNavScroll(e.target)) return
      pending = e.target
      if (!ticking) {
        ticking = true
        requestAnimationFrame(process)
      }
    }

    // capture: true — scroll events don't bubble, so capture lets us observe
    // scrolling from inner containers as well as the window/document.
    window.addEventListener('scroll', onScroll, true)
    return () => window.removeEventListener('scroll', onScroll, true)
  }, [pathname])

  return null
}
