import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, BookOpen, Zap, Filter, Repeat, Timer, Layers } from 'lucide-react'
import Navbar from '../../components/navbars/Navbar'
import { getAptitudeCategories } from '../../api/api'
import { APTITUDE_CATEGORIES } from './aptitudeData'

const EASE = [0.16, 1, 0.3, 1]

// A taste of what each round throws at you — shown as a preview so the console reads
// visually, not as a wall of text.
const CONSOLE_HINT = {
  quantitative: 'A train covers 240 km in 3 h. Speed = ?',
  logical: 'If MONDAY is 123456, what is DAY?',
  verbal: 'Pick the word closest to “candid”.',
  'data-interpretation': 'From the bar chart, find the 2-yr growth %.',
}

// The method — how you actually get good at aptitude. One loop, run per topic.
const FLOW = [
  { n: '01', icon: '📘', color: '#0EA5E9', title: 'Learn it once, properly', text: 'Read the topic a single careful time — what it asks, the one core formula, and why it works. Don’t move on until you can explain it in a sentence.' },
  { n: '02', icon: '✍️', color: '#9B6ED4', title: 'Solve the long way', text: 'Work 8–10 questions writing every step out. The pattern gets wired in by doing the method by hand — never by watching someone else solve it.' },
  { n: '03', icon: '⚡', color: '#F59E0B', title: 'Layer the shortcuts', text: 'Redo those same questions the fast way — approximation, option elimination, plugging answers. Speed comes from a better method, not from rushing.' },
  { n: '04', icon: '⏱️', color: '#22C55E', title: 'Test under the clock', text: 'Mix topics, set a timer, solve like it’s the real round. Review every miss the same day so the same trap never catches you twice.' },
]

// Why it pays off — the honest, specific case (peer-to-peer, no mentor framing).
const WHY = [
  { icon: Filter, title: 'It decides who gets seen', body: 'Most drives shortlist on the aptitude score before anyone opens your resume or your code. It’s the one round that controls whether the rest of your prep even gets a chance to matter.' },
  { icon: Layers, title: 'Highest return on your hours', body: 'It’s a fixed, finite syllabus built from repeating patterns — the rare part of prep where a few focused weeks reliably convert into marks. Nothing else you study is this predictable.' },
  { icon: Timer, title: 'Speed is the actual test', body: 'Given time, almost anyone gets the answer. The round gives you about a minute each — so it isn’t testing whether you can solve it, but how fast. That speed is 100% trainable.' },
  { icon: Repeat, title: 'You learn it once, for years', body: 'The same topics show up in every company test, plus CAT, GATE, and bank exams. The weeks you put in now keep paying off across every opportunity long after this placement season.' },
]

// The two layers every topic is taught in.
const MODES = [
  { icon: BookOpen, tag: 'LEARN IT', title: 'Build real understanding', body: 'The beginner-first walkthrough: what the topic is, the formula and why it holds, fully worked examples, and the classic mistakes — so the concept actually sticks instead of fading by exam day.' },
  { icon: Zap, tag: 'CRACK IT', title: 'Get exam-day fast', body: 'The shortcut layer once you understand the basics: the elimination trick, the approximation, and the option-plugging move that turn a 4-minute problem into a confident 40-second one.' },
]

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function AptitudeConsole() {
  const [i, setI] = useState(0)
  const reduce = prefersReduced()

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI(v => (v + 1) % APTITUDE_CATEGORIES.length), 2600)
    return () => clearInterval(t)
  }, [reduce])

  const cat = APTITUDE_CATEGORIES[i]

  return (
    <div className="apt-console" style={{ '--cat-color': cat.color }} aria-hidden="true">
      <div className="apt-console__bar">
        <span className="apt-console__label">APTITUDE&nbsp;ROUND</span>
        <span className={`apt-console__timer${reduce ? '' : ' is-running'}`}>
          <Timer size={12} /> 0:40
        </span>
      </div>

      <div className="apt-console__screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={cat.id}
            className="apt-console__q"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -14 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="apt-console__q-head">
              <span className="apt-console__q-icon">{cat.icon}</span>
              <span className="apt-console__q-cat">{cat.label}</span>
            </div>
            <p className="apt-console__q-text">{CONSOLE_HINT[cat.id]}</p>
            <div className="apt-console__opts">
              <span className="apt-console__opt" />
              <span className="apt-console__opt apt-console__opt--pick" />
              <span className="apt-console__opt" />
              <span className="apt-console__opt" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="apt-console__foot">
        {APTITUDE_CATEGORIES.map((c, idx) => (
          <span
            key={c.id}
            className={`apt-console__tick${idx === i ? ' is-on' : ''}`}
            style={{ '--tick-color': c.color }}
          />
        ))}
      </div>
    </div>
  )
}

export default function AptitudePage() {
  const navigate = useNavigate()
  const [counts, setCounts] = useState({})

  useEffect(() => {
    let alive = true
    getAptitudeCategories()
      .then(r => {
        if (!alive) return
        const map = {}
        ;(r.data || []).forEach(c => { map[c.category] = c.topicCount })
        setCounts(map)
      })
      .catch(() => { if (alive) setCounts({}) })
    return () => { alive = false }
  }, [])

  return (
    <div className="apt-page">
      <div className="apt-aura" aria-hidden="true">
        <div className="apt-aura__blob apt-aura__blob--1" />
        <div className="apt-aura__blob apt-aura__blob--2" />
      </div>

      <Navbar sticky />

      {/* ── Split hero ─────────────────────────────────────────────── */}
      <section className="apt-hero apt-hero--split">
        <div className="apt-hero__grid">
          <motion.div
            className="apt-hero__copy"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="apt-hero__eyebrow">⟡ APTITUDE · THE FIRST GATE OF EVERY PLACEMENT</p>
            <h1 className="apt-hero__title">
              Before they read your code,<br />
              they test your{' '}
              <span className="apt-hero__speed">
                speed
                <span className="apt-hero__speed-lines" aria-hidden="true" />
              </span>
            </h1>
            <p className="apt-hero__lead">
             Most placement drives start with aptitude — the first
              gate many freshers struggle with. But it’s also the easiest to improve
            </p>
            <div className="apt-hero__actions">
              <button
                type="button"
                className="apt-hero__cta"
                onClick={() => {
                  document.getElementById('apt-sections')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
              >
                Pick a section <ChevronRight size={16} />
              </button>

            </div>
          </motion.div>

          <motion.div
            className="apt-hero__visual"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            <AptitudeConsole />
          </motion.div>
        </div>
      </section>

      {/* ── Sections — one column of rich gate cards ────────────────── */}
      <section id="apt-sections" className="apt-sections" aria-label="Aptitude sections">
        <motion.header
          className="apt-sections__head"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <h2 className="apt-sections__title">Pick where you want to get sharper.</h2>
          <p className="apt-sections__sub">
            Every aptitude round is built from these four. Each opens into topics you
            can learn end-to-end, then crack against the clock.
          </p>
        </motion.header>

        <div className="apt-gates">
          {APTITUDE_CATEGORIES.map((cat, i) => (
            <motion.button
              type="button"
              key={cat.id}
              className="apt-gate"
              style={{ '--cat-color': cat.color }}
              onClick={() => navigate(`/aptitude/${cat.id}`)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              whileHover={{ y: -6 }}
            >
              <span className="apt-gate__rail" aria-hidden="true" />
              <span className="apt-gate__icon" aria-hidden="true">{cat.icon}</span>

              <h3 className="apt-gate__title">{cat.label}</h3>
              <p className="apt-gate__tagline">{cat.tagline}</p>
              <p className="apt-gate__desc">{cat.description}</p>

              <span className="apt-gate__chips">
                {(cat.chips || []).map(chip => (
                  <span className="apt-gate__chip" key={chip}>{chip}</span>
                ))}
              </span>

              <span className="apt-gate__foot">
                <span className="apt-gate__count">
                  {counts[cat.id] != null ? counts[cat.id] : '—'} topics
                </span>
                <span className="apt-gate__enter">
                  Explore <ChevronRight size={15} />
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── Motivation — the practical loop + why it pays off ───────── */}
      <section className="apt-why" aria-label="Why aptitude matters">
        <motion.header
          className="apt-why__head"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <p className="apt-why__eyebrow">◈ THE METHOD</p>
          <h2 className="apt-why__title">Aptitude isn’t studied. It’s drilled.</h2>
          <p className="apt-why__sub">
            Reading solved examples feels like progress but changes almost nothing.
            Real improvement comes from one short loop — run it on every topic until the
            method is automatic and the answer arrives before the panic does.
          </p>
        </motion.header>

        {/* The training loop — a flow diagram */}
        <div className="apt-flow">
          <div className="apt-flow__track">
            {FLOW.map((s, i) => (
              <motion.div
                className="apt-flow__node"
                key={s.n}
                style={{ '--step-color': s.color }}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
              >
                <span className="apt-flow__num">{s.n}</span>
                <span className="apt-flow__ring" aria-hidden="true">
                  <span className="apt-flow__glyph">{s.icon}</span>
                </span>
                <h3 className="apt-flow__title">{s.title}</h3>
                <p className="apt-flow__text">{s.text}</p>
                {i < FLOW.length - 1 && (
                  <span className="apt-flow__arrow" aria-hidden="true">
                    <ChevronRight size={18} />
                  </span>
                )}
              </motion.div>
            ))}
          </div>
          <motion.div
            className="apt-flow__loop"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          >
            ↻ one topic done — run the same loop on the next. Two topics a week clears the whole syllabus before placement season.
          </motion.div>
        </div>

        {/* Why it pays off — the honest case */}
        <div className="apt-why__band">
          <p className="apt-why__band-label">WHY IT PAYS OFF</p>
          <div className="apt-why__grid">
            {WHY.map((w, i) => {
              const Icon = w.icon
              return (
                <motion.div
                  key={w.title}
                  className="apt-why__card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                >
                  <span className="apt-why__card-num">0{i + 1}</span>
                  <span className="apt-why__card-icon"><Icon size={20} /></span>
                  <h3 className="apt-why__card-title">{w.title}</h3>
                  <p className="apt-why__card-body">{w.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Learn It / Crack It */}
        <div className="apt-modes">
          {MODES.map((m, i) => {
            const Icon = m.icon
            return (
              <motion.div
                key={m.tag}
                className={`apt-mode${i === 1 ? ' apt-mode--crack' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              >
                <div className="apt-mode__head">
                  <span className="apt-mode__icon"><Icon size={18} /></span>
                  <span className="apt-mode__tag">{m.tag}</span>
                </div>
                <h3 className="apt-mode__title">{m.title}</h3>
                <p className="apt-mode__body">{m.body}</p>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
