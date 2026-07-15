import { motion, useReducedMotion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import useBodyLock from '../../../hooks/useBodyLock'

// Per-section presentation (accent + icon), keyed by view. Surfaces stay muted;
// the accent is a small dose — icon tile, left rail, active glow. Colors track
// the Solo-Leveling rank palette so it feels on-brand.
const SECTION_META = {
  arena:    { accent: '#60A5FA', icon: '⚔️', tag: 'HQ' },
  gates:    { accent: '#F59E0B', icon: '🚪', tag: 'DUNGEON' },
  paths:    { accent: '#9B6ED4', icon: '🗺️', tag: 'CAREER' },
  missions: { accent: '#FF7F2A', icon: '🎯', tag: 'BUILD' },
  code:     { accent: '#4ADE80', icon: '💻', tag: 'ARENA' },
}
const fallbackMeta = { accent: '#9B6ED4', icon: '💠', tag: 'SECTION' }

const EASE = [0.16, 1, 0.3, 1]

export default function MobileNavDrawer({ navItems, activeView, onSelect, onClose }) {
  const reduce = useReducedMotion()
  useBodyLock()

  return (
    <>
      <motion.div
        className="mnav-backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      />

      <motion.nav
        className="mnav-drawer"
        aria-label="Skill Arena sections"
        initial={reduce ? { opacity: 0 } : { x: -24, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.32, ease: EASE }}
      >
        <div className="mnav-grid" aria-hidden="true" />

        <div className="mnav-header">
          <span className="mnav-header__eyebrow">[ SELECT SECTION ]</span>
          <span className="mnav-header__hint">Where to, Hunter?</span>
        </div>

        <ul className="mnav-list">
          {navItems.map((item, i) => {
            const meta = SECTION_META[item.view] ?? fallbackMeta
            const isActive = activeView === item.view
            return (
              <motion.li
                key={item.label}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.08 + i * 0.06 }}
              >
                <motion.button
                  type="button"
                  className={`mnav-item${isActive ? ' is-active' : ''}`}
                  style={{ '--accent': meta.accent }}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`${item.label} — ${item.sub}`}
                  onClick={() => onSelect(item)}
                  whileHover={reduce ? undefined : { x: 5 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  transition={{ duration: 0.22, ease: EASE }}
                >
                  <span className="mnav-item__rail" aria-hidden="true" />
                  <span className="mnav-item__tile" aria-hidden="true">
                    <span className="mnav-item__icon">{meta.icon}</span>
                  </span>
                  <span className="mnav-item__text">
                    <span className="mnav-item__label">{item.label}</span>
                    <span className="mnav-item__sub">{item.sub}</span>
                  </span>
                  {isActive ? (
                    <span className="mnav-item__now">
                      <span className="mnav-item__dot" aria-hidden="true" />
                      NOW
                    </span>
                  ) : (
                    <span className="mnav-item__tag" aria-hidden="true">{meta.tag}</span>
                  )}
                  <ChevronRight size={16} className="mnav-item__chev" aria-hidden="true" />
                </motion.button>
              </motion.li>
            )
          })}
        </ul>

        <div className="mnav-footer" aria-hidden="true">
          <span className="mnav-footer__mark">ARISE</span>
        </div>
      </motion.nav>
    </>
  )
}
