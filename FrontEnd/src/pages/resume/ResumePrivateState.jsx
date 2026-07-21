import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Sparkles } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]

// Warm, composed "sealed résumé" screen — deliberately NOT an error feel.
// A real résumé sits behind frosted glass; a lock medallion pops in once and
// rests. The person is real, their resume exists, they chose to keep it private.
export default function ResumePrivateState() {
  return (
    <div className="rzpv">
      <motion.div
        className="rzpv__scene"
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className="rzpv__sheet" aria-hidden="true">
          <span className="rzpv__sheet-avatar" />
          <span className="rzpv__sheet-bar rzpv__sheet-bar--title" />
          <span className="rzpv__sheet-bar rzpv__sheet-bar--sub" />
          <span className="rzpv__sheet-rule" />
          <span className="rzpv__sheet-bar" />
          <span className="rzpv__sheet-bar rzpv__sheet-bar--w80" />
          <span className="rzpv__sheet-bar rzpv__sheet-bar--w60" />
        </div>
        <div className="rzpv__frost" aria-hidden="true" />
        <div className="rzpv__medallion">
          <span className="rzpv__medallion-ring" aria-hidden="true" />
          <Lock size={28} strokeWidth={2.2} />
        </div>
      </motion.div>

      <motion.div
        className="rzpv__copy"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
      >
        <p className="rzpv__eyebrow">Private · owner’s choice</p>
        <h1 className="rzpv__title">This resume is private</h1>
        <p className="rzpv__sub">The owner has chosen to keep this resume private. You can build and share your own.</p>
        <Link to="/resume" className="rz-btn rz-btn--primary rzpv__cta">
          <Sparkles size={15} /> Build your resume
        </Link>
      </motion.div>
    </div>
  )
}
