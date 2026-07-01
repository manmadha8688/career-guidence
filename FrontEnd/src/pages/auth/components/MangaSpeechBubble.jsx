import { motion } from 'framer-motion'

export function MangaSpeechBubble({ text, tail = 'center' }) {
  if (!text) return null

  return (
    <motion.div
      className={`login-manga-bubble login-manga-bubble--tail-${tail}`}
      initial={{ opacity: 0, scale: 0.9, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 2 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      role="note"
    >
      <motion.p
        key={text}
        className="login-manga-bubble-text"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {text}
      </motion.p>
      <svg className="login-manga-arrow" viewBox="0 0 24 16" aria-hidden="true">
        <path d="M12 16 L2 2 L22 2 Z" className="login-manga-arrow-fill" />
        <path d="M12 16 L2 2 L22 2 Z" className="login-manga-arrow-stroke" />
      </svg>
    </motion.div>
  )
}
