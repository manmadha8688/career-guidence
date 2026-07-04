import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowLeft, Sun, Moon, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, useScroll, useSpring } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

// Visual classification of a single text line so long instruction blocks stay
// scannable for students of every level — headings pop, warnings go red,
// checklists go green, and indented / diagram lines stay monospaced & aligned.
export function textLineClass(line) {
  const cls = ['deploy-step__text-line']
  const trimmed = line.trim()
  if (line.startsWith('✅')) cls.push('deploy-step__text-line--success')
  else if (line.startsWith('🚫') || line.startsWith('⚠️') || line.startsWith('💰'))
    cls.push('deploy-step__text-line--warn')
  if (line.startsWith('   ') || line.startsWith('→')) cls.push('deploy-step__text-line--mono')
  else if (trimmed.length > 0 && trimmed.length <= 62 && trimmed.endsWith(':'))
    cls.push('deploy-step__text-line--head')
  return cls.join(' ')
}

// Shared scroll-reveal for guide sections (reduced-motion handled globally by MotionConfig)
const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: EASE },
}

export function CodeBlock({ lines, isFile = false, fileName = '' }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  const text = Array.isArray(lines) ? lines.join('\n') : lines
  const handle = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="deploy-code">
      {isFile && fileName && (
        <div className="deploy-code__file-header">
          <span>📄 {fileName}</span>
        </div>
      )}
      <div className="deploy-code__body">
        <pre className="deploy-code__pre">{text}</pre>
        <button
          onClick={handle}
          className={`deploy-code__copy${copied ? ' deploy-code__copy--copied' : ''}`}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

export function StepCard({ step, done, onToggleDone }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`deploy-step${done ? ' deploy-step--done' : ''}`}>
      <div className="deploy-step__row">
        <button
          type="button"
          onClick={onToggleDone}
          className={`deploy-step__check${done ? ' deploy-step__check--done' : ''}`}
          aria-label={done ? 'Mark step as not done' : 'Mark step as done'}
        >
          {done && <Check size={12} strokeWidth={3} />}
        </button>
        <button type="button" onClick={() => setOpen(o => !o)} className="deploy-step__toggle">
          <span className="deploy-step__label">{step.label}</span>
          {open ? <ChevronUp size={16} className="deploy-step__chev" /> : <ChevronDown size={16} className="deploy-step__chev" />}
        </button>
      </div>
      {open && (
        <div className="deploy-step__body">
          <div className="deploy-step__spacer" />
          {step.isText ? (
            <div className="deploy-step__text-block">
              {step.text.map((line, i) => (
                <div key={i} className={textLineClass(line)}>
                  {line}
                </div>
              ))}
            </div>
          ) : (
            step.commands.map((cmd, i) => (
              <CodeBlock key={i} lines={[cmd]} isFile={step.isFile && i === 0} fileName={step.isFile && i === 0 ? step.fileName : ''} />
            ))
          )}
          {step.note && (
            <div className="deploy-step__note">💡 {step.note}</div>
          )}
        </div>
      )}
    </div>
  )
}

export function PhaseBlock({ phase, phaseIdx, doneSet, onToggleStep, innerRef }) {
  const phaseDone = phase.steps.filter((_, si) => doneSet.has(`${phaseIdx}-${si}`)).length
  return (
    <motion.div ref={innerRef} className="deploy-phase" style={{ '--phase-color': phase.color }} {...reveal}>
      <div className="deploy-phase__banner">
        <span className="deploy-phase__num">{phase.phase}</span>
        <span className="deploy-phase__title">{phase.title}</span>
        <span className={`deploy-phase__progress${phaseDone === phase.steps.length ? ' deploy-phase__progress--done' : ''}`}>
          {phaseDone === phase.steps.length ? '✓ DONE' : `${phaseDone}/${phase.steps.length}`}
        </span>
      </div>
      {phase.steps.map((step, si) => (
        <StepCard
          key={si}
          step={step}
          done={doneSet.has(`${phaseIdx}-${si}`)}
          onToggleDone={() => onToggleStep(phaseIdx, si)}
        />
      ))}
    </motion.div>
  )
}

export default function GuidePageWrapper({ guide, stackData, toggleTheme, onBack }) {
  const totalSteps = guide.reduce((n, p) => n + p.steps.length, 0)
  const storageKey = `deploy_done_${stackData.id}`
  const phaseRefs = useRef([])

  const [doneSet, setDoneSet] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(storageKey) || '[]')) }
    catch { return new Set() }
  })

  const onToggleStep = useCallback((pi, si) => {
    setDoneSet(prev => {
      const next = new Set(prev)
      const id = `${pi}-${si}`
      next.has(id) ? next.delete(id) : next.add(id)
      try { localStorage.setItem(storageKey, JSON.stringify([...next])) } catch { /* quota — non-fatal */ }
      return next
    })
  }, [storageKey])

  // Thin scroll-progress bar tied to page scroll
  const { scrollYProgress } = useScroll()
  const progressX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  const doneCount = doneSet.size
  const pct = totalSteps > 0 ? Math.round((doneCount / totalSteps) * 100) : 0
  const allDone = totalSteps > 0 && doneCount >= totalSteps

  const jumpToPhase = (i) =>
    phaseRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="deploy-page" style={{ '--stack-color': stackData.color }}>

      {/* Scroll progress — reads as "how far through the mission am I" */}
      <motion.div className="deploy-scrollbar" style={{ scaleX: progressX }} aria-hidden="true" />

      <nav className="deploy-nav">
        <button onClick={onBack} className="deploy-nav__back">
          <ArrowLeft size={15} />
          Back to guides
        </button>
        <span className="deploy-nav__title">DEPLOY GUIDE</span>
        <button
          onClick={toggleTheme}
          className="deploy-nav__theme"
          aria-label="Toggle theme"
        >
          <Sun size={15} className="deploy-nav__theme-icon deploy-nav__theme-icon--dark" />
          <Moon size={15} className="deploy-nav__theme-icon deploy-nav__theme-icon--light" />
        </button>
      </nav>

      <div className="deploy-content">

        <motion.div
          className="deploy-header"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <span className="deploy-header__emoji">{stackData.emoji}</span>
          <div className="deploy-header__main">
            <div className="deploy-header__title">{stackData.title}</div>
            <div className="deploy-header__desc">{stackData.desc}</div>
            <div className="deploy-header__badges">
              <span className="deploy-header__badge">🌐 {stackData.platforms}</span>
              <span className="deploy-header__badge deploy-header__badge--free">💰 Free</span>
              <span className={`deploy-header__badge deploy-header__badge--progress${allDone ? ' deploy-header__badge--complete' : ''}`}>
                {allDone ? '🏆 Completed' : `⚡ ${doneCount}/${totalSteps} steps · ${pct}%`}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Mission map — every phase of this guide, clickable */}
        <motion.div
          className="deploy-map"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
        >
          <div className="deploy-map__track" aria-hidden="true" />
          {guide.map((phase, i) => {
            const phaseDone = phase.steps.every((_, si) => doneSet.has(`${i}-${si}`))
            return (
              <button
                key={i}
                type="button"
                onClick={() => jumpToPhase(i)}
                className={`deploy-map__dot${phaseDone ? ' deploy-map__dot--done' : ''}`}
                style={{ '--phase-color': phase.color }}
                title={`${phase.phase} · ${phase.title}`}
                aria-label={`Jump to phase ${phase.phase}: ${phase.title}`}
              >
                {phaseDone ? <Check size={10} strokeWidth={3.5} /> : phase.phase}
              </button>
            )
          })}
        </motion.div>

        {guide.map((phase, i) => (
          <PhaseBlock
            key={i}
            phase={phase}
            phaseIdx={i}
            doneSet={doneSet}
            onToggleStep={onToggleStep}
            innerRef={el => { phaseRefs.current[i] = el }}
          />
        ))}

        <motion.div className={`deploy-done${allDone ? ' deploy-done--celebrate' : ''}`} {...reveal}>
          <div className="deploy-done__emoji">🎉</div>
          <div className="deploy-done__title">
            {allDone ? 'Mission complete — your project is LIVE!' : 'Your project is live!'}
          </div>
          <div className="deploy-done__text">
            Add the live URL to your resume, LinkedIn profile, and GitHub repo.<br />
            A deployed project is 10× more impressive than code that only runs locally.
          </div>
          <button onClick={onBack} className="deploy-done__btn">
            ← Back to all guides
          </button>
        </motion.div>

      </div>
    </div>
  )
}
