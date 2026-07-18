import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Sun, Moon } from 'lucide-react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { CodeBlock, textLineClass } from './GuideLayout'
import { GUIDE_JOURNEYS } from './guideJourneys'
import BookmarkButton from '../../components/BookmarkButton'
import '../../styles/pages/shared/deployment.css'
import '../../styles/pages/shared/deployment-guide.css'

// Split a flat list of stages into balanced rows so a long flow can "snake"
// (left→right, then right→left) instead of overflowing off the screen.
const MAX_PER_ROW = 5
function toRows(stages) {
  if (stages.length <= MAX_PER_ROW) return [stages]
  const rowCount = Math.ceil(stages.length / MAX_PER_ROW)
  const perRow = Math.ceil(stages.length / rowCount)
  const rows = []
  for (let i = 0; i < stages.length; i += perRow) rows.push(stages.slice(i, i + perRow))
  return rows
}

const EASE = [0.16, 1, 0.3, 1]

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.5, ease: EASE },
}

/* One step, always open — no checkbox, no tracking. Pure guidance. */
function Step({ step }) {
  return (
    <div className="dgx-step">
      <div className="dgx-step__label">{step.label}</div>
      <div className="dgx-step__body">
        {step.isText ? (
          <div className="deploy-step__text-block">
            {step.text.map((line, i) => (
              <div key={i} className={textLineClass(line)}>{line}</div>
            ))}
          </div>
        ) : (
          step.commands.map((cmd, i) => (
            <CodeBlock
              key={i}
              lines={[cmd]}
              isFile={step.isFile && i === 0}
              fileName={step.isFile && i === 0 ? step.fileName : ''}
            />
          ))
        )}
        {step.note && <div className="deploy-step__note">💡 {step.note}</div>}
      </div>
    </div>
  )
}

function Node({ stage, delay }) {
  return (
    <motion.div
      className={`dgx-journey__node${stage.live ? ' dgx-journey__node--live' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay, ease: EASE }}
    >
      <span className="dgx-journey__ring">
        {stage.live && <span className="dgx-journey__radar" />}
        <span className="dgx-journey__glyph">{stage.icon}</span>
      </span>
      <span className="dgx-journey__label">{stage.label}</span>
      <span className="dgx-journey__node-sub">{stage.sub}</span>
    </motion.div>
  )
}

function Conduit({ delay }) {
  return (
    <motion.div
      className="dgx-journey__conduit"
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: EASE }}
    >
      <span className="dgx-journey__pulse" />
    </motion.div>
  )
}

/* The per-guide payoff: an animated flow of THIS guide's real journey.
   Short flows sit on one line; long ones snake (→→→ then ←←←). */
function JourneyFlow({ journey }) {
  if (!journey || !journey.stages?.length) return null
  const rows = toRows(journey.stages)
  let seq = 0 // running index across all stages, for staggered reveal timing

  return (
    <motion.section className="dgx-journey" {...reveal}>
      <div className="dgx-journey__head">
        <span className="dgx-journey__eyebrow">THE WHOLE JOURNEY</span>
        <h2 className="dgx-journey__title">{journey.title || 'From your computer to a live link'}</h2>
        {journey.subtitle && <p className="dgx-journey__sub">{journey.subtitle}</p>}
      </div>

      <div className="dgx-journey__flow" aria-hidden="true">
        {rows.map((row, rIdx) => {
          const reversed = rIdx % 2 === 1
          const ordered = reversed ? [...row].reverse() : row
          // Turn sits on the side the row ends on: right after L→R, left after R→L
          const turnSide = reversed ? 'left' : 'right'
          return (
            <div className="dgx-journey__row-block" key={rIdx}>
              <div className={`dgx-journey__row${reversed ? ' dgx-journey__row--rev' : ''}`}>
                {ordered.map((stage, i) => {
                  const delay = seq++ * 0.12
                  return (
                    <div className="dgx-journey__node-wrap" key={stage.label}>
                      <Node stage={stage} delay={delay} />
                      {i < ordered.length - 1 && <Conduit delay={delay + 0.06} />}
                    </div>
                  )
                })}
              </div>
              {rIdx < rows.length - 1 && (
                <div className={`dgx-journey__turn dgx-journey__turn--${turnSide}`}>
                  <span className="dgx-journey__turn-line" />
                  <span className="dgx-journey__turn-arrow">↓</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </motion.section>
  )
}

export default function GuideExperience({ guide, stackData, journey, toggleTheme, onBack }) {
  const [activePhase, setActivePhase] = useState(0)
  const phaseRefs = useRef([])
  const resolvedJourney = journey || GUIDE_JOURNEYS[stackData?.id]

  const { scrollYProgress } = useScroll()
  const progressX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  // Scroll-spy only — highlights where you are. No "done" state, no storage.
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActivePhase(Number(e.target.dataset.idx))
        })
      },
      { rootMargin: '-25% 0px -65% 0px' }
    )
    phaseRefs.current.forEach(el => el && io.observe(el))
    return () => io.disconnect()
  }, [guide])

  const jumpToPhase = (i) =>
    phaseRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="dgx" style={{ '--stack-color': stackData.color }}>
      <motion.div className="deploy-scrollbar" style={{ scaleX: progressX }} aria-hidden="true" />

      <nav className="deploy-nav">
        <button onClick={onBack} className="deploy-nav__back">
          <ArrowLeft size={15} />
          Back to guides
        </button>
        <span className="deploy-nav__title">DEPLOY GUIDE</span>
        <button onClick={toggleTheme} className="deploy-nav__theme" aria-label="Toggle theme">
          <Sun size={15} className="deploy-nav__theme-icon deploy-nav__theme-icon--dark" />
          <Moon size={15} className="deploy-nav__theme-icon deploy-nav__theme-icon--light" />
        </button>
      </nav>

      {/* Full-width hero header */}
      <header className="dgx-hero">
        <span className="dgx-hero__bookmark">
          <BookmarkButton
            type="GUIDE"
            refId={stackData.route}
            title={stackData.title}
            description={stackData.subtitle || stackData.platforms}
            icon={stackData.emoji}
            iconOnly
          />
        </span>
        <motion.div
          className="dgx-hero__content"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <span className="dgx-hero__emoji">{stackData.emoji}</span>
          <h1 className="dgx-hero__title">{stackData.title}</h1>
          <p className="dgx-hero__desc">{stackData.desc}</p>
          <div className="dgx-hero__badges">
            <span className="dgx-hero__badge">🌐 {stackData.platforms}</span>
            <span className="dgx-hero__badge dgx-hero__badge--free">💰 100% Free</span>
            <span className="dgx-hero__badge">📖 {guide.length} steps · read at your pace</span>
          </div>
        </motion.div>
      </header>

      <div className="dgx-body">
        {/* Sticky "steps" rail — a map, not a checklist */}
        <aside className="dgx-rail">
          <div className="dgx-rail__label">STEPS</div>
          <ol className="dgx-rail__list">
            {guide.map((phase, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => jumpToPhase(i)}
                  className={`dgx-rail__item${activePhase === i ? ' dgx-rail__item--active' : ''}`}
                  style={{ '--phase-color': phase.color }}
                >
                  <span className="dgx-rail__dot" />
                  <span className="dgx-rail__num">{phase.phase}</span>
                  <span className="dgx-rail__text">{phase.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </aside>

        <main className="dgx-content">
          {guide.map((phase, i) => (
            <section
              key={i}
              ref={el => { phaseRefs.current[i] = el }}
              data-idx={i}
              className="dgx-phase"
              style={{ '--phase-color': phase.color }}
            >
              <motion.div className="dgx-phase__head" {...reveal}>
                <span className="dgx-phase__num">{phase.phase}</span>
                <h2 className="dgx-phase__title">{phase.title}</h2>
              </motion.div>
              <div className="dgx-phase__steps">
                {phase.steps.map((step, si) => (
                  <motion.div key={si} {...reveal}>
                    <Step step={step} />
                  </motion.div>
                ))}
              </div>
            </section>
          ))}

          <JourneyFlow journey={resolvedJourney} />

          <motion.div className="dgx-outro" {...reveal}>
            <div className="dgx-outro__emoji">🚀</div>
            <div className="dgx-outro__title">That’s the whole path — now it’s live.</div>
            <div className="dgx-outro__text">
              Add the live link to your resume, LinkedIn, and GitHub README.<br />
              A project people can open beats one that only runs on your laptop.
            </div>
            <button onClick={onBack} className="dgx-outro__btn">← Back to all guides</button>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
