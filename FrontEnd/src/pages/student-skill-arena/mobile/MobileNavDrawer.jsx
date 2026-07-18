import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import useBodyLock from '../../../hooks/useBodyLock'
import '../../../styles/components/mobile-arena-drawer.css'

const SECTION_META = {
  arena:    { accent: '#60A5FA', icon: '⚔️' },
  gates:    { accent: '#F59E0B', icon: '🚪' },
  paths:    { accent: '#9B6ED4', icon: '🗺️' },
  missions: { accent: '#FF7F2A', icon: '🎯' },
  code:     { accent: '#4ADE80', icon: '💻' },
}
const fallbackMeta = { accent: '#9B6ED4', icon: '💠' }

const EASE = [0.16, 1, 0.3, 1]

export default function MobileNavDrawer({ navItems, activeView, onSelect, onClose }) {
  const reduce = useReducedMotion()
  useBodyLock()

  useEffect(() => {
    document.documentElement.classList.add('sl-drawer-open')
    return () => document.documentElement.classList.remove('sl-drawer-open')
  }, [])

  return (
    <>
      <motion.div
        className="mnav-backdrop mnav-backdrop--v2"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        aria-hidden="true"
      />

      <motion.nav
        className="mnav-drawer mnav-drawer--v2"
        aria-label="Skill Arena sections"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -24, scale: 0.98 }}
        transition={{ duration: 0.38, ease: EASE }}
      >
        <ul className="mnav-list">
          {navItems.map((item, i) => {
            const meta = SECTION_META[item.view] ?? fallbackMeta
            const isActive = activeView === item.view
            return (
              <motion.li
                key={item.label}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.08 + i * 0.06 }}
              >
                <motion.button
                  type="button"
                  className={`mnav-item${isActive ? ' is-active' : ''}`}
                  style={{ '--accent': meta.accent }}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={item.sub ? `${item.label} — ${item.sub}` : item.label}
                  onClick={() => onSelect(item)}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                >
                  <span className="mnav-item__icon" aria-hidden="true">{meta.icon}</span>
                  <span className="mnav-item__label">{item.label}</span>
                </motion.button>
              </motion.li>
            )
          })}
        </ul>
      </motion.nav>
    </>
  )
}
