import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, BookOpen, Target, CheckCircle2, Zap, AlertTriangle, ListChecks, Layers } from 'lucide-react'
import { DIChart } from './AptitudeCharts'

const EASE = [0.16, 1, 0.3, 1]

/* Split layout: chart(s) pinned to the side(s), the reading/answering column
   scrolls in the middle so the data stays on screen the whole time.
   1 chart → [sticky chart | body].  2 charts → [sticky chart | body | sticky chart]. */
function DISplit({ charts = [], accent, note, children }) {
  const two = charts.length >= 2
  return (
    <div className={`di-split${two ? ' di-split--three' : ''}`}>
      <aside className="di-split__vis di-split__vis--left">
        {note && <p className="di-note">{note}</p>}
        <div className="di-visual"><DIChart chart={charts[0]} accent={accent} /></div>
        <span className="di-split__ref">Keep this in view while you answer →</span>
      </aside>

      <div className="di-split__body">{children}</div>

      {two && (
        <aside className="di-split__vis di-split__vis--right">
          <div className="di-visual"><DIChart chart={charts[1]} accent={accent} /></div>
        </aside>
      )}
    </div>
  )
}

function PracticeItem({ q, index }) {
  const [open, setOpen] = useState(false)
  return (
    <li className="di-prac">
      <div className="di-prac__head">
        <span className="di-prac__num">Q{index + 1}</span>
        <p className="di-prac__q">{q.question}</p>
      </div>
      <button type="button" className="di-prac__reveal" onClick={() => setOpen(o => !o)}>
        {open ? <><EyeOff size={14} /> Hide answer</> : <><Eye size={14} /> Reveal answer</>}
      </button>
      {open && (
        <motion.div className="di-prac__sol" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, ease: EASE }}>
          <p className="di-prac__ans"><CheckCircle2 size={14} /> <strong>{q.answer}</strong></p>
          {q.solution && <p className="di-prac__how">{q.solution}</p>}
        </motion.div>
      )}
    </li>
  )
}

// Teaching body — how to read, question types, speed tips, traps, worked example.
function TeachBody({ howToRead = [], questionTypes = [], speedTips = [], traps = [], worked }) {
  return (
    <>
      {howToRead.length > 0 && (
        <section className="di-tblock">
          <h3 className="di-block__h"><BookOpen size={16} /> How to read it</h3>
          <ol className="di-read">
            {howToRead.map((r, i) => (
              <li key={i} className="di-read__item">
                <span className="di-read__num">{i + 1}</span>
                <div className="di-read__body">
                  <span className="di-read__step">{r.step}</span>
                  {r.detail && <span className="di-read__detail">{r.detail}</span>}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {questionTypes.length > 0 && (
        <section className="di-tblock di-tblock--types">
          <h3 className="di-block__h"><Layers size={16} /> Every question type you will see</h3>
          <div className="di-qtypes">
            {questionTypes.map((t, i) => (
              <div key={i} className="di-qtype">
                <span className="di-qtype__name">{t.name}</span>
                {t.how && <span className="di-qtype__how">{t.how}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {speedTips.length > 0 && (
        <section className="di-tblock di-tblock--tips">
          <h3 className="di-block__h"><Zap size={16} /> Speed tricks (beginner → expert)</h3>
          <ul className="di-taglist">
            {speedTips.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </section>
      )}

      {traps.length > 0 && (
        <section className="di-tblock di-tblock--traps">
          <h3 className="di-block__h"><AlertTriangle size={16} /> Traps that cost marks</h3>
          <ul className="di-taglist">
            {traps.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </section>
      )}

      {worked && (
        <section className="di-tblock di-tblock--worked">
          <h3 className="di-block__h"><Target size={16} /> Worked example</h3>
          <p className="di-worked__q">{worked.question}</p>
          {Array.isArray(worked.steps) && (
            <ol className="di-worked__steps">
              {worked.steps.map((s, i) => (
                <li key={i} className="di-worked__step">
                  <span className="di-worked__action">{s.action}</span>
                  {s.why && <span className="di-worked__why">{s.why}</span>}
                </li>
              ))}
            </ol>
          )}
          {worked.answer && <p className="di-worked__ans"><CheckCircle2 size={15} /> <strong>Answer:</strong> {worked.answer}</p>}
        </section>
      )}
    </>
  )
}

export default function DataInterpretationLesson({ lesson, accent = '#F59E0B' }) {
  if (!lesson) return null
  const { intro, visual = {}, howToRead, questionTypes, speedTips, traps, worked, sheets = [] } = lesson
  const charts = visual.charts || [visual.chart, visual.chart2].filter(Boolean)
  const totalQs = sheets.reduce((n, s) => n + (s.questions?.length || 0), 0)

  return (
    <div className="di-lesson" style={{ '--cat-color': accent }}>
      {intro && (
        <motion.p className="di-intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}>
          {intro}
        </motion.p>
      )}

      {/* Learn — anchor chart pinned, teaching scrolls beside it */}
      <section className="di-section">
        <div className="di-section__label"><span>Understand the chart</span></div>
        <DISplit charts={charts} accent={accent} note={visual.note}>
          <TeachBody howToRead={howToRead} questionTypes={questionTypes} speedTips={speedTips} traps={traps} worked={worked} />
        </DISplit>
      </section>

      {/* Practice sheets — each chart stays pinned while its questions scroll */}
      {sheets.length > 0 && (
        <section className="di-section di-section--practice">
          <div className="di-section__label di-section__label--practice">
            <ListChecks size={16} />
            <span>Practice sheets</span>
            <em>{sheets.length} set{sheets.length !== 1 ? 's' : ''} · {totalQs} questions</em>
          </div>
          <p className="di-prac__hint">Each set keeps its chart on screen — solve every question from the chart before revealing. No peeking.</p>

          {sheets.map((sheet, si) => (
            <div key={si} className="di-sheet">
              <h3 className="di-sheet__title">
                {sheet.title || `Practice Set ${si + 1}`}
                {sheet.difficulty && (
                  <span className={`di-sheet__diff di-sheet__diff--${String(sheet.difficulty).toLowerCase().replace(/[^a-z]/g, '')}`}>
                    {sheet.difficulty}
                  </span>
                )}
              </h3>
              <DISplit charts={sheet.charts || []} accent={accent} note={sheet.note}>
                <ol className="di-prac-list">
                  {(sheet.questions || []).map((q, i) => <PracticeItem key={i} q={q} index={i} />)}
                </ol>
              </DISplit>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
