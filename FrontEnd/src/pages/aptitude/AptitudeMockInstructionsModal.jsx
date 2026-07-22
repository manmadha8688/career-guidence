import { X } from 'lucide-react'
import useBodyLock from '../../hooks/useBodyLock'
import useModalA11y from '../../hooks/useModalA11y'
import { MOCK_INSTRUCTIONS, MOCK_SECTIONS, MOCK_PASS } from './aptitudeMockConfig'
import { MOCK_XP_RANGE, QUIZ_XP } from '../../utils/quizXp'

export default function AptitudeMockInstructionsModal({ onClose, onConfirm }) {
  const meta = MOCK_INSTRUCTIONS
  useBodyLock()
  const modalRef = useModalA11y(onClose, true)

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} className="dash-overlay-backdrop dash-overlay-backdrop--modal">
      <div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="apt-mock-instructions-title" className="dash-instructions-modal apt-mock-modal" style={{ '--accent': meta.color }}>
        <div className="dash-instructions-modal__header">
          <span id="apt-mock-instructions-title" className="dash-instructions-modal__tag">[ {meta.label} ]</span>
          <button type="button" aria-label="Close" onClick={onClose} className="dash-instructions-modal__close"><X size={15} /></button>
        </div>

        <div className="dash-instructions-modal__body">
          <div className="dash-instructions-modal__title-row">
            <span className="dash-instructions-modal__icon">⏱️</span>
            <div>
              <div className="dash-instructions-modal__title">Full-length aptitude mock</div>
              <div className="dash-instructions-modal__subtitle">Simulates a real placement round</div>
            </div>
          </div>

          <div className="dash-instructions-modal__stats">
            {[
              { label: 'QUESTIONS', value: meta.questions, color: '#60A5FA', big: true },
              { label: 'OVERALL TIME', value: meta.time, color: '#F59E0B', big: true },
              { label: 'SECTIONS', value: '3', color: '#22C55E', big: true },
              { label: 'PASS MARK', value: `${MOCK_PASS}/${QUIZ_XP.mock.total}`, color: '#4ADE80', big: false },
              { label: 'XP', value: MOCK_XP_RANGE, color: meta.color, big: false },
            ].map(s => (
              <div key={s.label} className="dash-instructions-stat" style={{ '--stat-color': s.color }}>
                <div className={`dash-instructions-stat__value ${s.big ? 'dash-instructions-stat__value--big' : 'dash-instructions-stat__value--small'}`}>{s.value}</div>
                <div className="dash-instructions-stat__label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="apt-mock-modal__sections">
            {MOCK_SECTIONS.map(s => (
              <div key={s.id} className="apt-mock-modal__section" style={{ '--sec-color': s.color }}>
                <span className="apt-mock-modal__section-icon">{s.icon}</span>
                <span className="apt-mock-modal__section-label">{s.label}</span>
                <span className="apt-mock-modal__section-meta">{s.questionCount} Q · {Math.round(s.timeSeconds / 60)} min</span>
              </div>
            ))}
          </div>

          <div className="dash-instructions-modal__rules">
            <div className="dash-instructions-modal__rules-title">[ EXAM RULES ]</div>
            <div className="dash-instructions-modal__rules-list">
              {meta.rules.map((rule, i) => (
                <div key={rule} className="dash-instructions-rule">
                  <span className="dash-instructions-rule__num">0{i + 1}</span>
                  <span className="dash-instructions-rule__text">{rule}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dash-instructions-modal__actions">
            <button type="button" onClick={onClose} className="dash-instructions-cancel">Not now</button>
            <button type="button" onClick={onConfirm} className="dash-instructions-confirm">Start mock →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
