import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { guestLogin, getPublicStats } from '../../../api/api'
import { logApiError } from '../../../utils/devLog'
import toast from 'react-hot-toast'
import { getApiError } from '../../../utils/apiError'
import useLandingTheme from './useLandingTheme'

export default function useLandingPage() {
  const navigate = useNavigate()
  const { user, login, logout, showAuthOverlay, completeAuthOverlay, hideAuthOverlay } = useAuth()
  const themeProps = useLandingTheme()

  const [guestLoading, setGuestLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [platformStats, setPlatformStats] = useState({ subjects: '9', concepts: '130+', paths: '3' })

  const countUpRef = useRef(null)
  const countedRef = useRef(false)

  useEffect(() => {
    const els = document.querySelectorAll('.lp-reveal, .lp-reveal-left, .lp-reveal-right')
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('lp-visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!countUpRef.current || countedRef.current) return
    const timers = []
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      countedRef.current = true
      io.disconnect()
      const items = countUpRef.current.querySelectorAll('[data-target]')
      items.forEach(item => {
        const target = item.getAttribute('data-target')
        const isNum = /^\d+$/.test(target)
        if (!isNum) return
        const end = parseInt(target, 10)
        let start = 0
        const duration = 1800
        const step = Math.ceil(end / (duration / 16))
        const timer = setInterval(() => {
          start = Math.min(start + step, end)
          item.textContent = start + (item.dataset.suffix || '')
          if (start >= end) clearInterval(timer)
        }, 16)
        timers.push(timer)
      })
    }, { threshold: 0.3 })
    io.observe(countUpRef.current)
    return () => { io.disconnect(); timers.forEach(clearInterval) }
  }, [platformStats])

  useEffect(() => {
    getPublicStats()
      .then(r => {
        const { subjectCount, conceptCount, roadmapCount } = r.data
        if (subjectCount > 0) {
          setPlatformStats({
            subjects: String(subjectCount),
            concepts: `${conceptCount}+`,
            paths: String(roadmapCount),
          })
        }
      })
      .catch(err => logApiError('public-stats', err))
  }, [])

  const handleEnter = useCallback(
    () => navigate(user ? '/skill-arena/dashboard' : '/login?redirect=/skill-arena/dashboard'),
    [navigate, user],
  )

  const handleGuest = useCallback(async () => {
    setGuestLoading(true)
    showAuthOverlay('guest')
    try {
      const storedGuestId = localStorage.getItem('guest_device_id')
      const { data } = await guestLogin(storedGuestId)
      // Persist the server-issued secret device token (not the guessable user id).
      if (data.guestToken) localStorage.setItem('guest_device_id', data.guestToken)
      completeAuthOverlay()
      await new Promise(r => setTimeout(r, 600))
      hideAuthOverlay()
      login(data.token, data.user)
      navigate('/')
    } catch (err) {
      hideAuthOverlay()
      toast.error(getApiError(err, 'We could not start a guest session right now. Please try again.'))
    } finally {
      setGuestLoading(false)
    }
  }, [navigate, showAuthOverlay, completeAuthOverlay, hideAuthOverlay, login])

  // Memoized so the returned object keeps a stable reference between renders —
  // prevents the 12 landing sections (which consume this via context) from
  // re-rendering together on unrelated state changes. Same keys/values as before.
  return useMemo(() => ({
    navigate,
    user,
    logout,
    ...themeProps,
    guestLoading,
    mobileMenuOpen,
    setMobileMenuOpen,
    platformStats,
    countUpRef,
    handleEnter,
    handleGuest,
  }), [navigate, user, logout, themeProps, guestLoading, mobileMenuOpen, platformStats, handleEnter, handleGuest])
}
