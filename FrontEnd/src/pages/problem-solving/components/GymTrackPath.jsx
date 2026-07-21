import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]

const TICKER = [
  'Python', 'Java', 'C++', 'JavaScript', 'Arrays', 'Strings', 'Recursion',
  'Hash Maps', 'Two Pointers', 'Sorting', 'Binary Search', 'Linked Lists',
  'Stacks', 'Queues', 'Trees', 'Graphs', 'Dynamic Programming', 'Greedy',
  'Bit Magic', 'Sliding Window', 'Backtracking', 'Big-O',
]

const METHOD = [
  { n: '01', icon: '🧠', short: 'Think', color: '#60A5FA', title: 'Think before coding', text: 'Read the problem slowly. Be clear on what is being asked and picture the tricky cases before you write a single line.' },
  { n: '02', icon: '💻', short: 'Build', color: '#4ADE80', title: 'Build a working solution', text: 'Get a version that runs — even if it is slow or messy. A working answer beats a perfect plan you never finish.' },
  { n: '03', icon: '🐛', short: 'Debug', color: '#F59E0B', title: 'Debug and validate', text: 'Run it, try different inputs, read the errors, and fix them one by one until every case passes.' },
  { n: '04', icon: '🚀', short: 'Improve', color: '#9B6ED4', title: 'Improve and optimize', text: 'Make it cleaner and faster, name the pattern you just used, and carry that lesson into the next challenge.' },
]

const GATES = [
  {
    key: 'start-coding',
    rank: 'E',
    icon: '🌑',
    system: 'SYSTEM · AWAKENING',
    title: 'Start Coding',
    line: 'Never written code before? This is your gate.',
    desc: 'Learn the basics — how to write, run, and fix simple programs step by step.',
    quest: 'Write your first program and make it run.',
    chips: ['First steps', 'Syntax', 'Hello World'],
    color: '#9CA3AF',
  },
  {
    key: 'logic-building',
    rank: 'D',
    icon: '🗡️',
    system: 'SYSTEM · TRAINING',
    title: 'Logic Building',
    line: 'You can type code — but problems still confuse you.',
    desc: 'Learn to break a question into small steps and solve it on paper before you code.',
    quest: 'Solve one problem using your own thinking.',
    chips: ['Step-by-step', 'Dry runs', 'Problem solving'],
    color: '#4ADE80',
  },
  {
    key: 'skill-up',
    rank: 'C',
    icon: '⚡',
    system: 'SYSTEM · ASCENSION',
    title: 'Skill Up',
    line: 'Ready to handle harder coding questions.',
    desc: 'Practice arrays, strings, and common patterns — get a slow answer working, then make it faster.',
    quest: 'Solve it the simple way first. Then improve it.',
    chips: ['Arrays & strings', 'Patterns', 'Faster code'],
    color: '#60A5FA',
  },
  {
    key: 'crack-it',
    rank: 'B',
    icon: '🎯',
    system: 'SYSTEM · RAID',
    title: 'Crack It',
    line: 'Questions that read like a real-life story.',
    desc: 'Read a situation, spot every rule inside it, and write code that handles all the cases.',
    quest: 'Understand the full story before you type.',
    chips: ['Story problems', 'Many conditions', 'Real logic'],
    color: '#9B6ED4',
  },
  {
    key: 'build-it',
    rank: 'A',
    icon: '🔥',
    system: 'SYSTEM · FORGE',
    title: 'Build It',
    line: 'Your code works — now make it smarter.',
    desc: 'Take a working solution and improve it — fewer steps, less time, and be able to explain why.',
    quest: 'Make it run first. Then make it better.',
    chips: ['Better code', 'Less time', 'Explain why'],
    color: '#F59E0B',
  },
  {
    key: 'prove-it',
    rank: 'S',
    icon: '👑',
    system: 'SYSTEM · MONARCH',
    title: 'Prove It',
    line: 'Real problems with real rules — build the full answer.',
    desc: 'Put together a complete solution: every rule, check, and edge case handled properly. This is where coding meets the real world.',
    quest: 'List every rule first, then build the whole solution.',
    chips: ['Real systems', 'Edge cases', 'Complete logic'],
    color: '#EF4444',
  },
]

function GateCard({ gate, index, onEnter }) {
  return (
    <motion.button
      type="button"
      className={`gym-gate gym-gate--${gate.rank.toLowerCase()}`}
      style={{ '--rank': gate.color }}
      onClick={() => onEnter(gate.key)}
      aria-label={`Enter the ${gate.title} gate, Rank ${gate.rank}`}
      initial={{ opacity: 0, y: 40 + index * 10, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      whileHover={{ y: -6 }}
    >
      <span className="gym-gate__rank" aria-hidden="true">
        {gate.rank}
        <span className="gym-gate__rank-tag">RANK</span>
      </span>

      <span className="gym-gate__system">{gate.system}</span>
      <span className="gym-gate__icon" aria-hidden="true">{gate.icon}</span>
      <h3 className="gym-gate__title">{gate.title}</h3>
      <p className="gym-gate__line">{gate.line}</p>
      <p className="gym-gate__desc">{gate.desc}</p>

      <span className="gym-gate__quest">
        <span className="gym-gate__quest-label">◈ QUEST</span>
        <span className="gym-gate__quest-text">{gate.quest}</span>
      </span>

      <span className="gym-gate__chips">
        {gate.chips.map((chip) => (
          <span className="gym-gate__chip" key={chip}>{chip}</span>
        ))}
      </span>

      <span className="gym-gate__enter">
        Enter the Gate <ChevronRight size={14} />
      </span>
    </motion.button>
  )
}

function GymGates() {
  const navigate = useNavigate()
  const enter = (key) => navigate(`/code-gym/${key}`)

  return (
    <section className="gym-gates" aria-labelledby="gym-gates-title">
      <div className="gym-gates__bg" aria-hidden="true">
        <div className="gym-gates__beam gym-gates__beam--1" />
        <div className="gym-gates__beam gym-gates__beam--2" />
      </div>

      <div className="gym-gates__wrap">
        <motion.header
          className="gym-gates__head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="gym-gates__eyebrow">⟡ SIX GATES · ONE PATH</p>
          <h2 id="gym-gates-title" className="gym-gates__headline">
          Choose your training ground. Each one teaches something different.
          </h2>
          <p className="gym-gates__sub">
          Each level targets a different skill, helping you build coding strength, problem-solving speed, and development confidence.
          </p>
        </motion.header>

        <div className="gym-gates__grid">
          {GATES.map((gate, i) => (
            <GateCard key={gate.key} gate={gate} index={i} onEnter={enter} />
          ))}
        </div>
      </div>
    </section>
  )
}

function GymTicker() {
  const strip = [...TICKER, ...TICKER]
  return (
    <div className="gym-ticker" aria-hidden="true">
      <div className="gym-ticker__row">
        {strip.map((word, i) => (
          <span className="gym-ticker__item" key={`${word}-${i}`}>
            <span className="gym-ticker__dot" />
            {word}
          </span>
        ))}
      </div>
    </div>
  )
}

function GymMethod() {
  return (
    <section className="gym-method" aria-labelledby="gym-method-title">
      <div className="gym-method__bg" aria-hidden="true">
        <div className="gym-method__beam" />
      </div>

      <div className="gym-method__wrap">
        <motion.header
          className="gym-method__head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="gym-method__eyebrow">◈ THE TRAINING LOOP</p>
          <h2 id="gym-method-title" className="gym-method__headline">
            Four steps. Practice them on every challenge.
          </h2>
          <p className="gym-method__sub">
            Forget perfection. Focus on progress. Repeat the cycle often enough,
            and solving problems becomes second nature.
          </p>
        </motion.header>

        <motion.div
          className="gym-loop__flow"
          aria-hidden="true"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {METHOD.map((step, i) => (
            <span className="gym-loop__flow-item" key={step.n}>
              <span className="gym-loop__flow-word" style={{ '--step-color': step.color }}>
                {step.short}
              </span>
              {i < METHOD.length - 1 && <span className="gym-loop__flow-arrow">→</span>}
            </span>
          ))}
        </motion.div>

        <div className="gym-loop">
          <div className="gym-loop__track">
            {METHOD.map((step, i) => (
              <motion.article
                className="gym-loop__node"
                key={step.n}
                style={{ '--step-color': step.color }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
              >
                <span className="gym-loop__accent" aria-hidden="true" />
                <span className="gym-loop__num">{step.n}</span>
                <span className="gym-loop__ring" aria-hidden="true">
                  <span className="gym-loop__glyph">{step.icon}</span>
                </span>
                <h3 className="gym-loop__title">{step.title}</h3>
                <p className="gym-loop__text">{step.text}</p>

                {i < METHOD.length - 1 && (
                  <span className="gym-loop__arrow" aria-hidden="true">
                    <ChevronRight size={18} />
                  </span>
                )}
              </motion.article>
            ))}
          </div>

          <motion.div
            className="gym-loop__return"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          >
            <span className="gym-loop__return-tip" />
            <span className="gym-loop__return-label">↻ next problem — start again from step 01</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function GymTrackPath() {
  return (
    <>
      <GymGates />
      <GymTicker />
      <GymMethod />
    </>
  )
}
