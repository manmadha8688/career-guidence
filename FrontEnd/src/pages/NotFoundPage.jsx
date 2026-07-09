import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

// Sarcastic rotator — roasting a Gen-Z traveler who got lost WITH technology
const ROASTS = [
  'You had GPS, Google Maps, and an AI in your pocket… and still ended up here?',
  'Gen-Z legend — lost on the internet, WITH the internet.',
  'The ancestors navigated oceans by starlight. You mistyped a URL.',
  'This page doesn’t exist in any timeline. We checked all of them.',
  'Even the pigeons delivered to the right address.',
]

// The eras you fall through — newest to oldest
const ERAS = [
  { year: 'Present',    icon: '📱', label: 'you were here' },
  { year: '1995',    icon: '💾', label: 'dial-up era' },
  { year: '1870',    icon: '📮', label: 'telegram era' },
  { year: '900 AD',  icon: '🕊️', label: 'pigeon mail' },
  { year: '3000 BC', icon: '𓂀',  label: 'hieroglyphs' },
  { year: '???',     icon: '🗿', label: 'YOU ARE HERE', current: true },
]

// Cinematic sequence beats (ms) — signal → rift → fall (per-era) → impact → settled
const T_SIGNAL = 1100
const T_RIFT   = 800
const T_ERA    = 430
const T_IMPACT = 650

export default function NotFoundPage() {
  const navigate = useNavigate()
  const sceneRef = useRef(null)
  const timers = useRef([])

  // Reduced-motion users skip the title sequence entirely (lazy init, no effect churn)
  const [stage, setStage] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'settled' : 'signal'
  ) // signal | rift | fall | impact | settled
  const [flyIdx, setFlyIdx] = useState(-1)
  const [roastIdx, setRoastIdx] = useState(0)

  // ── Director: run the title sequence once ──
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const pending = timers.current
    const later = (fn, ms) => { pending.push(setTimeout(fn, ms)) }
    later(() => setStage('rift'), T_SIGNAL)
    later(() => setStage('fall'), T_SIGNAL + T_RIFT)
    ERAS.forEach((_, i) => later(() => setFlyIdx(i), T_SIGNAL + T_RIFT + i * T_ERA))
    later(() => setStage('impact'), T_SIGNAL + T_RIFT + ERAS.length * T_ERA)
    later(() => setStage('settled'), T_SIGNAL + T_RIFT + ERAS.length * T_ERA + T_IMPACT)
    return () => pending.forEach(clearTimeout)
  }, [])

  const skipIntro = () => {
    if (stage === 'settled') return
    timers.current.forEach(clearTimeout)
    setStage('settled')
  }

  // Rotate the sarcasm once we've landed
  useEffect(() => {
    if (stage !== 'settled') return
    const t = setInterval(() => setRoastIdx(i => (i + 1) % ROASTS.length), 3800)
    return () => clearInterval(t)
  }, [stage])

  // Pointer parallax — the settled rift tilts toward the cursor
  const onPointerMove = (e) => {
    const el = sceneRef.current
    if (!el || stage !== 'settled') return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(x * 12).toFixed(2)}deg`)
  }
  const onPointerLeave = () => {
    const el = sceneRef.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  const inIntro = stage !== 'settled'
  const warping = stage === 'rift' || stage === 'fall'

  return (
    <div
      className={`nf-void${stage === 'impact' ? ' nf-void--shake' : ''}`}
      ref={sceneRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={inIntro ? skipIntro : undefined}
    >
      {/* ── Ambient layers (always behind everything) ── */}
      <div className="nf-stars" aria-hidden="true" />
      <div className="nf-stars nf-stars--far" aria-hidden="true" />
      {stage === 'settled' && <div className="nf-vortex" aria-hidden="true" />}
      {stage === 'settled' && (
        <div className="nf-dust" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="nf-dust__mote" style={{ '--i': i }} />
          ))}
        </div>
      )}

      {/* ── BEAT 1 · SIGNAL LOST ── */}
      <AnimatePresence>
        {stage === 'signal' && (
          <motion.div className="nf-signal" exit={{ opacity: 0 }} transition={{ duration: 0.25 }} aria-hidden="true">
            <div className="nf-signal__scanlines" />
            <div className="nf-signal__text">SIGNAL LOST_</div>
            <div className="nf-signal__meta">TRACING LAST KNOWN COORDINATES…</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BEAT 2+3 · HYPERSPACE WARP ── */}
      {warping && (
        <div className="nf-warp" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="nf-warp__streak" style={{ '--a': `${i * 18}deg`, '--d': `${(i % 5) * 0.09}s` }} />
          ))}
        </div>
      )}

      {/* ── BEAT 3 · ERA FLY-BYS — falling backwards through time ── */}
      <AnimatePresence>
        {stage === 'fall' && flyIdx >= 0 && (
          <motion.div
            key={flyIdx}
            className="nf-flyby"
            initial={{ scale: 0.12, opacity: 0 }}
            animate={{ scale: [0.12, 1, 3.1], opacity: [0, 1, 0] }}
            transition={{ duration: T_ERA / 1000, times: [0, 0.45, 1], ease: 'easeIn' }}
            aria-hidden="true"
          >
            <span className="nf-flyby__icon">{ERAS[flyIdx].icon}</span>
            <span className="nf-flyby__year">{ERAS[flyIdx].year}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BEAT 4 · IMPACT shockwave ── */}
      {stage === 'impact' && <div className="nf-shockwave" aria-hidden="true" />}

      {/* ── BEAT 4+5 · THE SCENE ── */}
      {(stage === 'impact' || stage === 'settled') && (
        <div className="nf-scene">

          {stage === 'settled' && (
            <motion.div
              className="nf-eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              [ ERROR 404 · TIMELINE BREACH DETECTED ]
            </motion.div>
          )}

          {/* 404 slams in from depth */}
          <motion.div
            className="nf-code"
            aria-label="Error 404"
            initial={{ scale: 4.5, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: T_IMPACT / 1000, ease: [0.22, 1.2, 0.36, 1] }}
          >
            <span className="nf-code__glitch" aria-hidden="true">404</span>
            404
          </motion.div>

          {stage === 'settled' && (
            <>
              <motion.h1
                className="nf-title"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
              >
                This page fell out of the timeline.
              </motion.h1>

              <div className="nf-roast" aria-hidden="true">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={roastIdx}
                    className="nf-roast__line"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    “{ROASTS[roastIdx]}”
                  </motion.p>
                </AnimatePresence>
              </div>
              <p className="sr-only">The page you are looking for does not exist.</p>

              <motion.div
                className="nf-timeline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                aria-hidden="true"
              >
                <div className="nf-timeline__line" />
                <span className="nf-traveler">🧑‍🚀</span>
                {ERAS.map((era, i) => (
                  <motion.div
                    key={era.year}
                    className={`nf-era${era.current ? ' nf-era--current' : ''}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.3 + i * 0.09, ease: EASE }}
                  >
                    <span className="nf-era__icon">{era.icon}</span>
                    <span className="nf-era__year">{era.year}</span>
                    <span className="nf-era__label">{era.label}</span>
                    {era.current && <span className="nf-era__ping" />}
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="nf-actions"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.75, ease: EASE }}
              >
                <button type="button" className="nf-btn" onClick={() => navigate('/')}>
                  ⌂ RETURN TO Present
                </button>
                <button type="button" className="nf-btn nf-btn--ghost" onClick={() => navigate(-1)}>
                  ← last known location
                </button>
              </motion.div>

              <motion.p
                className="nf-help"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.95, ease: EASE }}
              >
                Need help? Contact{' '}
                <a href="mailto:help@learnforearn.in" rel="noopener">help@learnforearn.in</a>
              </motion.p>
            </>
          )}
        </div>
      )}

      {/* Skip hint during the intro */}
      {inIntro && stage !== 'signal' && (
        <div className="nf-skip" aria-hidden="true">click to skip</div>
      )}
    </div>
  )
}
