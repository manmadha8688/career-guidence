import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SECTION_NOT_FOUND } from '../config/sectionNotFoundConfigs'

const EASE = [0.16, 1, 0.3, 1]
const T_SIGNAL = 1100
const T_RIFT   = 800
const T_ERA    = 430
const T_IMPACT = 650

/**
 * Cinematic section-themed not-found — same engine as global 404,
 * but content and colors match AI Lab, Missions, Code GYM, etc.
 */
export default function SectionNotFoundPage({ variant }) {
  const cfg = SECTION_NOT_FOUND[variant]
  const navigate = useNavigate()
  const sceneRef = useRef(null)
  const timers = useRef([])

  const [stage, setStage] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'settled' : 'signal'
  )
  const [flyIdx, setFlyIdx] = useState(-1)
  const [quipIdx, setQuipIdx] = useState(0)

  const stages = cfg.stages

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const pending = timers.current
    const later = (fn, ms) => { pending.push(setTimeout(fn, ms)) }
    later(() => setStage('rift'), T_SIGNAL)
    later(() => setStage('fall'), T_SIGNAL + T_RIFT)
    stages.forEach((_, i) => later(() => setFlyIdx(i), T_SIGNAL + T_RIFT + i * T_ERA))
    later(() => setStage('impact'), T_SIGNAL + T_RIFT + stages.length * T_ERA)
    later(() => setStage('settled'), T_SIGNAL + T_RIFT + stages.length * T_ERA + T_IMPACT)
    return () => pending.forEach(clearTimeout)
  }, [stages])

  const skipIntro = () => {
    if (stage === 'settled') return
    timers.current.forEach(clearTimeout)
    setStage('settled')
  }

  useEffect(() => {
    if (stage !== 'settled') return
    const t = setInterval(() => setQuipIdx(i => (i + 1) % cfg.quips.length), 3800)
    return () => clearInterval(t)
  }, [stage, cfg.quips.length])

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
    sceneRef.current?.style.setProperty('--rx', '0deg')
    sceneRef.current?.style.setProperty('--ry', '0deg')
  }

  const inIntro = stage !== 'settled'
  const warping = stage === 'rift' || stage === 'fall'

  const goPrimary = () => navigate(cfg.primaryBtn.path)
  const goSecondary = () => {
    if (cfg.secondaryBtn.back) navigate(-1)
    else if (cfg.secondaryBtn.path) navigate(cfg.secondaryBtn.path)
  }

  return (
    <div
      className={`nf-void ${cfg.themeClass}${stage === 'impact' ? ' nf-void--shake' : ''}`}
      ref={sceneRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={inIntro ? skipIntro : undefined}
    >
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

      <AnimatePresence>
        {stage === 'signal' && (
          <motion.div className="nf-signal" exit={{ opacity: 0 }} transition={{ duration: 0.25 }} aria-hidden="true">
            <div className="nf-signal__scanlines" />
            <div className="nf-signal__text">{cfg.signalText}</div>
            <div className="nf-signal__meta">{cfg.signalMeta}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {warping && (
        <div className="nf-warp" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="nf-warp__streak" style={{ '--a': `${i * 18}deg`, '--d': `${(i % 5) * 0.09}s` }} />
          ))}
        </div>
      )}

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
            <span className="nf-flyby__icon">{stages[flyIdx].icon}</span>
            <span className="nf-flyby__year">{stages[flyIdx].year}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {stage === 'impact' && <div className="nf-shockwave" aria-hidden="true" />}

      {(stage === 'impact' || stage === 'settled') && (
        <div className="nf-scene">
          {stage === 'settled' && (
            <motion.div
              className="nf-eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {cfg.eyebrow}
            </motion.div>
          )}

          <motion.div
            className="nf-code"
            aria-label={`Error ${cfg.code}`}
            initial={{ scale: 4.5, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: T_IMPACT / 1000, ease: [0.22, 1.2, 0.36, 1] }}
          >
            <span className="nf-code__glitch" aria-hidden="true">{cfg.code}</span>
            {cfg.code}
          </motion.div>

          {stage === 'settled' && (
            <>
              <motion.h1
                className="nf-title"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
              >
                {cfg.title}
              </motion.h1>

              <div className="nf-roast" aria-hidden="true">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={quipIdx}
                    className="nf-roast__line"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    “{cfg.quips[quipIdx]}”
                  </motion.p>
                </AnimatePresence>
              </div>
              <p className="sr-only">{cfg.title}</p>

              <motion.div
                className="nf-timeline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                aria-hidden="true"
              >
                <div className="nf-timeline__line" />
                <span className="nf-traveler">{cfg.traveler}</span>
                {stages.map((era, i) => (
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
                <button type="button" className="nf-btn" onClick={goPrimary}>
                  {cfg.primaryBtn.label}
                </button>
                <button type="button" className="nf-btn nf-btn--ghost" onClick={goSecondary}>
                  {cfg.secondaryBtn.label}
                </button>
              </motion.div>
            </>
          )}
        </div>
      )}

      {inIntro && stage !== 'signal' && (
        <div className="nf-skip" aria-hidden="true">click to skip</div>
      )}
    </div>
  )
}
