import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]

// Creative, resume-themed dead-end (404). A ghost résumé sheet the archive
// scanner sweeps but finds no record of — then a "NO RECORD" stamp lands.
// Reads clearly as: this link never worked, or the resume was removed.
export default function ResumeNotFoundState() {
  return (
    <div className="rznf">
      <div className="rznf__scene" aria-hidden="true">
        <motion.div
          className="rznf__sheet"
          initial={{ opacity: 0, y: 26, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="rznf__sheet-avatar" />
          <span className="rznf__sheet-bar rznf__sheet-bar--title" />
          <span className="rznf__sheet-bar rznf__sheet-bar--sub" />
          <span className="rznf__sheet-rule" />
          <span className="rznf__sheet-bar" />
          <span className="rznf__sheet-bar rznf__sheet-bar--w80" />
          <span className="rznf__sheet-bar rznf__sheet-bar--w60" />
          <span className="rznf__sheet-rule" />
          <span className="rznf__sheet-bar rznf__sheet-bar--w70" />
          <span className="rznf__sheet-bar rznf__sheet-bar--w40" />

          <div className="rznf__scan" />
          <div className="rznf__stamp">
            <span className="rznf__stamp-code">404</span>
            <span className="rznf__stamp-label">NO RECORD</span>
          </div>
        </motion.div>
        <div className="rznf__glow" />
      </div>

      <motion.div
        className="rznf__copy"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
      >
        <p className="rznf__eyebrow">// ERROR 404 · RESUME ARCHIVE</p>
        <h1 className="rznf__title">Resume not found</h1>
        <p className="rznf__sub">This resume link doesn’t exist or may have been removed.</p>
        <Link to="/resume" className="rz-btn rz-btn--primary rznf__cta">
          <Sparkles size={15} /> Build your resume
        </Link>
      </motion.div>
    </div>
  )
}
