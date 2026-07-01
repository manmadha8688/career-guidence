import { motion } from 'framer-motion'

export function MangaSpeechBubble({ text, delay = 0, tail = 'center' }) {
  if (!text) return null

  return (
    <motion.div
      className={`login-manga-bubble login-manga-bubble--tail-${tail}`}
      initial={{ opacity: 0, scale: 0.82, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 4 }}
      transition={{ duration: 0.28, delay, ease: [0.22, 1, 0.36, 1] }}
      role="note"
    >
      <p className="login-manga-bubble-text">{text}</p>
      <svg className="login-manga-arrow" viewBox="0 0 24 16" aria-hidden="true">
        <path d="M12 16 L2 2 L22 2 Z" className="login-manga-arrow-fill" />
        <path d="M12 16 L2 2 L22 2 Z" className="login-manga-arrow-stroke" />
      </svg>
    </motion.div>
  )
}
