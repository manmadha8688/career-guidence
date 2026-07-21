import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, CheckCircle2 } from 'lucide-react'
import { DIFFICULTY_META } from './aptitudeData'

const EASE = [0.16, 1, 0.3, 1]

// Shared "Practice It" question set — tap an option to reveal answer + solution.
export default function AptitudePracticeList({ questions = [], emptyAction = null }) {
  const [picked, setPicked] = useState({})

  const selectOption = (id, letter) => {
    setPicked(prev => (prev[id] ? prev : { ...prev, [id]: letter }))
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
        <span className="apt-practice-block__hint">Tap an option to check your answer</span>
      </div>

      <ol className="apt-q-list">
        {questions.map((q, i) => {
          const id = q.id || i
          const chosen = picked[id]
          const answered = chosen !== undefined
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
                  const isCorrect = letter === q.answer
                  const isChosen = chosen === letter
                  let optClass = 'apt-q__opt'
                  if (answered) {
                    if (isCorrect) optClass += ' is-answer'
                    else if (isChosen) optClass += ' is-wrong'
                  } else if (isChosen) {
                    optClass += ' is-selected'
                  }
                  return (
                    <button
                      key={oi}
                      type="button"
                      className={optClass}
                      disabled={answered}
                      onClick={() => selectOption(id, letter)}
                      aria-pressed={isChosen}
                    >
                      <span className="apt-q__opt-letter">{letter}</span>
                      <span className="apt-q__opt-text">{opt}</span>
                      {answered && isCorrect && <CheckCircle2 size={15} className="apt-q__opt-tick" />}
                    </button>
                  )
                })}
              </div>

              <AnimatePresence initial={false}>
                {answered && (
                  <motion.div
                    className="apt-q__sol"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
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
