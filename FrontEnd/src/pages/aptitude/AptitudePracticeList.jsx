import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, CheckCircle2, Eye, EyeOff } from 'lucide-react'
import { DIFFICULTY_META } from './aptitudeData'

const EASE = [0.16, 1, 0.3, 1]

// Shared "Practice It" question set — self-test cards with per-question reveal.
// Used inline as the topic page's Practice tab AND by the standalone questions
// route, so the solve experience stays identical everywhere.
export default function AptitudePracticeList({ questions = [], emptyAction = null }) {
  const [revealed, setRevealed] = useState({})

  const toggle = (id) => setRevealed(r => ({ ...r, [id]: !r[id] }))
  const revealedCount = Object.values(revealed).filter(Boolean).length
  const allOpen = questions.length > 0 && revealedCount === questions.length
  const toggleAll = () => {
    if (allOpen) setRevealed({})
    else setRevealed(Object.fromEntries(questions.map((q, i) => [q.id || i, true])))
  }

  if (questions.length === 0) {
    return (
      <section className="apt-questions-soon">
        <span className="apt-questions-soon__badge">Practice</span>
        <h2>Questions coming soon</h2>
        <p>Solved practice questions for this topic are on the way. Meanwhile, work through the lesson and its worked examples.</p>
        {emptyAction}
      </section>
    )
  }

  return (
    <div className="apt-practice-block">
      <div className="apt-practice-block__bar">
        <span className="apt-practice-block__count">{questions.length} question{questions.length !== 1 ? 's' : ''}</span>
        <button type="button" className="apt-practice__toggle-all" onClick={toggleAll}>
          {allOpen ? <><EyeOff size={14} /> Hide all answers</> : <><Eye size={14} /> Reveal all answers</>}
        </button>
      </div>

      <ol className="apt-q-list">
        {questions.map((q, i) => {
          const id = q.id || i
          const isOpen = !!revealed[id]
          const diff = DIFFICULTY_META[q.difficulty] || DIFFICULTY_META.easy
          return (
            <motion.li
              key={id}
              className="apt-q"
              style={{ '--diff-color': diff.color }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.3), ease: EASE }}
            >
              <div className="apt-q__prompt">
                <span className="apt-q__num">{q.order || i + 1}.</span>
                <p className="apt-q__text">{q.question}</p>
              </div>

              <div className="apt-q__options">
                {(q.options || []).map((opt, oi) => {
                  const letter = String.fromCharCode(65 + oi)
                  const isAns = isOpen && letter === q.answer
                  return (
                    <div key={oi} className={`apt-q__opt${isAns ? ' is-answer' : ''}`}>
                      <span className="apt-q__opt-letter">{letter}</span>
                      <span className="apt-q__opt-text">{opt}</span>
                      {isAns && <CheckCircle2 size={15} className="apt-q__opt-tick" />}
                    </div>
                  )
                })}
              </div>

              <button type="button" className="apt-q__reveal" onClick={() => toggle(id)}>
                {isOpen ? <><EyeOff size={14} /> Hide solution</> : <><Eye size={14} /> Reveal answer &amp; solution</>}
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="apt-q__sol"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    <p className="apt-q__answer"><strong>Answer:</strong> {q.answer}</p>
                    {q.solution && <p className="apt-q__sol-text">{q.solution}</p>}
                    {q.trick && (
                      <p className="apt-q__trick"><Zap size={14} /> <span>{q.trick}</span></p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}
