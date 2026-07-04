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
