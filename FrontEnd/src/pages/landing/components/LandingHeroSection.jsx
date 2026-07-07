import { lazy, Suspense, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Swords, Ghost, Sparkles } from 'lucide-react'
import { useLanding } from '../context/LandingPageContext'

const Spline = lazy(() => import('@splinetool/react-spline'))
const SPLINE_ROBOT = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

export default function LandingHeroSection() {
  const { user, handleEnter, handleGuest, guestLoading } = useLanding()
  const [splineReady, setSplineReady] = useState(false)

  // The 3D scene is ~4MB — load it everywhere (mobile included) so the hero
  // looks identical across devices. Only skip it for users who explicitly opt
  // out via reduced-motion or data-saver; they get an animated glow fallback.
  const [enable3D] = useState(() => {
    if (typeof window === 'undefined') return false
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    const saveData = navigator.connection?.saveData
    return !reduced && !saveData
  })

  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 600], [0, -70])
  const contentOpacity = useTransform(scrollY, [0, 480], [1, 0])
  const robotScale = useTransform(scrollY, [0, 500], [1, 1.14])
  const robotY = useTransform(scrollY, [0, 500], [0, 60])

  return (
    <section className="lp-hero-section lp-hero-section--robot">
      <div className="lp-hero-bg" />
      <div className="lp-aurora lp-aurora-1" />
      <div className="lp-aurora lp-aurora-2" />

      {/* ── 3D robot background ── */}
      <motion.div style={{ scale: robotScale, y: robotY }} className="lp-hero-robot" aria-hidden="true">
        <div className="lp-hero-robot__glow" />
        {enable3D ? (
          <>
            {!splineReady && (
              <div className="lp-hero-robot__loader">
                <span className="lp-hero-robot__spinner" />
                <span className="lp-hero-robot__loading">INITIALIZING AI…</span>
              </div>
            )}
            <Suspense fallback={null}>
              <Spline
                scene={SPLINE_ROBOT}
                onLoad={() => setSplineReady(true)}
                className="lp-hero-robot__canvas"
                style={{ opacity: splineReady ? 1 : 0, transition: 'opacity 1.1s ease' }}
              />
            </Suspense>
          </>
        ) : (
          <div className="lp-hero-robot__static">🤖</div>
        )}
      </motion.div>

      <div className="lp-hero-robot__scrim" />
      <div className="lp-hero-robot__grid" />
      <div className="lp-hero-fade-bottom" />

      {/* ── Message over the 3D ── */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="lp-hero-stage">
      

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lp-punch-title"
        >
          <span className="lp-punch-line">AI won't replace humans.</span>
          <span className="lp-punch-line lp-punch-grad">Humans who use AI efficiently will replace those who don't.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lp-punch-quote"
        >
          AI is not your competition — <strong>the person using it better than you is.</strong>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lp-punch-desc"
        >
          So become that person. A <strong>completely free</strong> platform to
          <strong> learn the skills and earn the job</strong> — career roadmaps, real coding
          problems and hands-on AI projects that take you from fresher to hired.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.7 }}
          className="lp-hero-actions lp-punch-actions"
        >
          <button type="button" onClick={handleEnter} className="lp-btn-primary lp-cta-pulse lp-btn-primary--hero">
            <Swords size={17} />
            {user ? 'Go to Dashboard' : 'Start Learning — Free'}
          </button>
          {!user && (
            <button
              type="button"
              onClick={handleGuest}
              disabled={guestLoading}
              className="lp-btn-ghost lp-btn-ghost--guest"
            >
              <Ghost size={14} /> {guestLoading ? 'Starting…' : 'Try as Guest'}
            </button>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
