import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PANEL_NOT_FOUND } from '../config/sectionNotFoundConfigs'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Compact cinematic not-found for dashboard panels (Skill Arena overlays).
 * Same DNA as SectionNotFoundPage — shorter scan beat, no warp sequence.
 */
export default function SectionNotFoundPanel({ variant, onBack, fill = true }) {
  const cfg = PANEL_NOT_FOUND[variant]
  const reduced = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [stage, setStage] = useState(() => (reduced ? 'settled' : 'scan'))
  const [quipIdx, setQuipIdx] = useState(0)

  useEffect(() => {
    if (reduced) return
    const t = setTimeout(() => setStage('settled'), 750)
    return () => clearTimeout(t)
  }, [reduced])

  useEffect(() => {
    if (stage !== 'settled') return
    const t = setInterval(() => setQuipIdx(i => (i + 1) % cfg.quips.length), 4000)
    return () => clearInterval(t)
  }, [stage, cfg.quips.length])

  return (
    <div className={`snp ${cfg.themeClass}${fill ? ' snp--fill' : ''}`}>
      <div className="snp__bg" aria-hidden="true">
        <div className="snp__grid" />
        <div className="snp__vortex" />
      </div>

      <AnimatePresence mode="wait">
        {stage === 'scan' && (
          <motion.div
            key="scan"
            className="snp-scan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          >
            <div className="snp-scan__lines" />
            <div className="snp-scan__text">{cfg.scanText}</div>
          </motion.div>
        )}

        {stage === 'settled' && (
          <motion.div
            key="settled"
            className="snp-body"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="snp-eyebrow">{cfg.eyebrow}</div>

            <div className="snp-code" aria-label={`Error ${cfg.code}`}>
              <span className="snp-code__glitch" aria-hidden="true">{cfg.code}</span>
              {cfg.code}
            </div>

            <p className="snp-title">{cfg.title}</p>

            <div className="snp-quip" aria-hidden="true">
              <AnimatePresence mode="wait">
                <motion.p
                  key={quipIdx}
                  className="snp-quip__line"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  “{cfg.quips[quipIdx]}”
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="sr-only">{cfg.title}</p>

            <div className="snp-stages" aria-hidden="true">
              {cfg.stages.map((s, i) => (
                <motion.div
                  key={s.label}
                  className={`snp-stage${s.current ? ' snp-stage--current' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.08 + i * 0.07, ease: EASE }}
                >
                  <span className="snp-stage__icon">{s.icon}</span>
                  <span className="snp-stage__label">{s.label}</span>
                  {s.current && <span className="snp-stage__ping" />}
                </motion.div>
              ))}
            </div>

            {onBack && (
              <motion.button
                type="button"
                className="snp-btn"
                onClick={onBack}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35, ease: EASE }}
              >
                {cfg.backLabel}
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
