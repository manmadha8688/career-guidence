// "Don't learn everything from anyone" — a manifesto right after the hero.
// The centrepiece is a full-width exploration MAP with a clear journey:
//   MENTORS/SENIORS/AI  →  a spark into YOU  →  you branch out and explore  →
//   every path converges on the GOAL: HIRED.
// Paths draw themselves, energy flows toward the goal, discovery nodes twinkle,
// and the goal pulses like a beacon. The idea, animated: take the direction,
// explore it yourself, and it all leads somewhere.
import { motion, useReducedMotion } from 'framer-motion'
import { GraduationCap, ArrowRight, Sparkles } from 'lucide-react'
import { useLanding } from '../context/LandingPageContext'

const EASE = [0.16, 1, 0.3, 1]

// ── map geometry (viewBox 0 0 1200 340) ─────────────────────────────────────
const SOURCES = [{ x: 60, y: 110 }, { x: 60, y: 170 }, { x: 60, y: 230 }]
const GATHER = [
  'M60,110 C120,120 150,160 190,170',
  'M60,170 L190,170',
  'M60,230 C120,220 150,180 190,170',
]
const TRUNK = 'M190,170 L320,170'
const YOU = { x: 320, y: 170 }

const WAYPOINTS = [
  { x: 680, y: 80, label: 'your questions', lx: 680, ly: 60 },
  { x: 680, y: 170, label: 'experiments', lx: 680, ly: 152 },
  { x: 680, y: 260, label: 'your projects', lx: 680, ly: 290 },
]
const MAIN = [
  'M320,170 C450,150 560,95 680,80',
  'M320,170 C470,170 560,170 680,170',
  'M320,170 C450,190 560,245 680,260',
]
// faint dead-end detours — the tangents you wander down while exploring
const DETOURS = [
  'M680,80 C740,58 780,40 830,34',
  'M680,170 C750,150 800,132 860,124',
  'M680,260 C740,282 780,300 830,306',
]
const DETOUR_TIPS = [{ x: 830, y: 34 }, { x: 860, y: 124 }, { x: 830, y: 306 }]
// every waypoint converges onto the goal
const CONVERGE = [
  'M680,80 C830,95 960,150 1080,170',
  'M680,170 L1080,170',
  'M680,260 C830,245 960,190 1080,170',
]
const GOAL = { x: 1080, y: 170 }
const BRANCHES = [...MAIN, ...CONVERGE]

function ExploreMap() {
  const reduce = useReducedMotion()
  const drawT = (d) => (reduce ? { duration: 0 } : { pathLength: { duration: 0.9, delay: d, ease: EASE }, opacity: { duration: 0.3, delay: d } })
  const popT = (d) => (reduce ? { duration: 0 } : { delay: d, type: 'spring', stiffness: 220, damping: 15 })

  const line = { hidden: { pathLength: 0, opacity: 0 }, show: (d) => ({ pathLength: 1, opacity: 0.38, transition: drawT(d) }) }
  const faint = { hidden: { pathLength: 0, opacity: 0 }, show: (d) => ({ pathLength: 1, opacity: 0.16, transition: drawT(d) }) }
  const pop = { hidden: { scale: 0, opacity: 0 }, show: (d) => ({ scale: 1, opacity: 1, transition: popT(d) }) }
  const fade = { hidden: { opacity: 0 }, show: (d) => ({ opacity: 1, transition: { delay: d, duration: 0.5 } }) }

  return (
    <motion.svg
      className="lp-exviz"
      viewBox="0 0 1200 340"
      role="img"
      aria-label="A spark from your mentors flows into present-you; you branch out and explore, and every path converges on future-you: hired."
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* input lines from the sources into YOU */}
      {GATHER.map((d, i) => (
        <motion.path key={`g${i}`} d={d} className="lp-exviz-line" fill="none" variants={line} custom={0.2 + i * 0.08} />
      ))}
      <motion.path d={TRUNK} className="lp-exviz-line lp-exviz-line--trunk" fill="none" variants={line} custom={0.45} />

      {/* exploration branches + convergence to the goal */}
      {BRANCHES.map((d, i) => (
        <motion.path key={`b${i}`} d={d} className="lp-exviz-line" fill="none" variants={line} custom={0.7 + i * 0.1} />
      ))}
      {/* faint detours (tangents) */}
      {DETOURS.map((d, i) => (
        <motion.path key={`d${i}`} d={d} className="lp-exviz-line lp-exviz-line--detour" fill="none" variants={faint} custom={1.3 + i * 0.12} />
      ))}
      {/* flowing energy toward the goal */}
      {!reduce && BRANCHES.map((d, i) => (
        <path key={`f${i}`} d={d} className="lp-exviz-flow" fill="none" style={{ animationDelay: `${1.6 + i * 0.22}s` }} />
      ))}

      {/* source nodes + label */}
      {SOURCES.map((s, i) => (
        <motion.circle key={`s${i}`} cx={s.x} cy={s.y} r="6" className="lp-exviz-src" variants={pop} custom={0.15 + i * 0.08} />
      ))}
      <motion.text x="60" y="272" className="lp-exviz-cap" variants={fade} custom={0.5}>MENTORS · SENIORS · AI</motion.text>

      {/* travelling spark: the whole journey, sources → YOU → goal */}
      {!reduce && (
        <motion.circle
          className="lp-exviz-spark" r="6.5" cy={170}
          initial={{ cx: 190, opacity: 0 }}
          animate={{ cx: [190, 320, 340, 1080], opacity: [0, 1, 1, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut', times: [0, 0.22, 0.3, 1] }}
        />
      )}

      {/* PRESENT YOU core with pulsing glow */}
      <circle cx={YOU.x} cy={YOU.y} r="40" className="lp-exviz-you-glow" />
      <motion.circle cx={YOU.x} cy={YOU.y} r="15" className="lp-exviz-you" variants={pop} custom={0.5} />
      <motion.text x={YOU.x} y={YOU.y - 30} className="lp-exviz-you-eyebrow" variants={fade} custom={0.7}>TODAY</motion.text>
      <motion.text x={YOU.x} y={YOU.y + 42} className="lp-exviz-you-label" variants={fade} custom={0.7}>PRESENT YOU</motion.text>

      {/* detour tips (dim, they peter out) */}
      {DETOUR_TIPS.map((t, i) => (
        <motion.circle key={`dt${i}`} cx={t.x} cy={t.y} r="3.5" className="lp-exviz-detour-tip" variants={fade} custom={1.6 + i * 0.12} />
      ))}

      {/* waypoints — your discoveries — pop in then twinkle */}
      {WAYPOINTS.map((w, i) => (
        <g key={`w${i}`}>
          <motion.circle
            cx={w.x} cy={w.y} r="7"
            className={`lp-exviz-tip${reduce ? '' : ' lp-exviz-tip--live'}`}
            style={{ animationDelay: `${2 + i * 0.3}s` }}
            variants={pop} custom={1.2 + i * 0.12}
          />
          <motion.text x={w.lx} y={w.ly} className="lp-exviz-tiplabel" variants={fade} custom={1.5 + i * 0.12}>{w.label}</motion.text>
        </g>
      ))}

      {/* FUTURE YOU — beacon on the right (the goal) */}
      {!reduce && <circle cx={GOAL.x} cy={GOAL.y} r="26" className="lp-exviz-goal-ring" />}
      <circle cx={GOAL.x} cy={GOAL.y} r="50" className="lp-exviz-goal-glow" />
      <motion.circle cx={GOAL.x} cy={GOAL.y} r="22" className="lp-exviz-goal" variants={pop} custom={2.2} />
      <motion.text x={GOAL.x} y={GOAL.y + 7} className="lp-exviz-goal-mark" variants={fade} custom={2.5}>★</motion.text>
      <motion.text x={GOAL.x} y={GOAL.y - 40} className="lp-exviz-goal-eyebrow" variants={fade} custom={2.5}>HIRED · THE GOAL</motion.text>
      <motion.text x={GOAL.x} y={GOAL.y + 58} className="lp-exviz-goal-label" variants={fade} custom={2.6}>FUTURE YOU</motion.text>
    </motion.svg>
  )
}

const PHASES = [
  { icon: '🧭', title: 'Take the direction', body: 'A mentor, a senior, a video — let them point you where to go.' },
  { icon: '🌊', title: 'Catch the flow', body: 'Grab the shape of the idea, not every keystroke.' },
  { icon: '🚀', title: 'Explore, then arrive', body: 'Break it, rebuild it, question it — and every path leads you to hired.' },
]

export default function LandingExploreSection() {
  const { navigate } = useLanding()
  return (
    <section id="explore" className="lp-section-block lp-explore-section">
      <div className="lp-section-block--inner">
        <div className="lp-section-header lp-reveal">
          <p className="lp-section-eyebrow">Before you start</p>
          <h2 className="lp-grad-text lp-section-title lp-section-title--lg">
            Don't try to learn everything from anyone.
          </h2>
          <p className="lp-section-desc lp-explore-lead">
            Not from experts. Not from seniors. Not even from us. The best people in tech
            aren't the ones who memorised the most — they're the ones who took a
            <strong> direction</strong>, went <strong>exploring</strong>, and let every path
            lead them to the <strong>goal</strong>. No mentor? You don't need one — you need a
            map. That's exactly what this is.
          </p>
        </div>
      </div>

      <div className="lp-exviz-wrap lp-reveal">
        <ExploreMap />
      </div>

      <div className="lp-section-block--inner">
        <div className="lp-explore-legend lp-stagger">
          {PHASES.map((p) => (
            <div key={p.title} className="lp-explore-legend__item lp-reveal">
              <span className="lp-explore-legend__icon" aria-hidden="true">{p.icon}</span>
              <div>
                <span className="lp-explore-legend__title">{p.title}</span>
                <span className="lp-explore-legend__body">{p.body}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="lp-explore-punch lp-reveal">
          We just hand you the spark. <span className="lp-grad-text">The fire — and the finish line — are yours.</span>
        </p>

        {/* the concrete first step — merged Fresher's Guide entry point */}
        <div className="lp-explore-cta lp-reveal">
          <span className="lp-explore-cta__badge">
            <GraduationCap size={15} /> New here? Read this first
          </span>
          <h3 className="lp-explore-cta__title">
            Most freshers waste their first months guessing what to learn.
            <span className="lp-grad-text"> The Fresher's Guide ends the guessing.</span>
          </h3>

          <p className="lp-explore-cta__peek-label">Waiting for you inside</p>
          <ul className="lp-explore-cta__peek">
            <li><Sparkles size={14} /> Which roadmap actually fits you — decided in 2 minutes</li>
            <li><Sparkles size={14} /> The 3 kinds of projects that get interview callbacks</li>
            <li><Sparkles size={14} /> The quiet mistake that gets fresher resumes ignored</li>
          </ul>

          <button
            type="button"
            onClick={() => navigate('/fresher-instructions')}
            className="lp-btn-primary lp-btn-primary--hero lp-cta-pulse lp-explore-cta__btn"
          >
            Open the Fresher's Guide <ArrowRight size={16} />
          </button>
          <span className="lp-explore-cta__reassure">Free forever · ~10 min read · built for absolute zero</span>
        </div>
      </div>
    </section>
  )
}
