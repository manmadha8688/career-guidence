import { X } from 'lucide-react'
import useBodyLock from '../../../hooks/useBodyLock'
import useModalA11y from '../../../hooks/useModalA11y'

const QUIZ_META = {
  concept: {
    label: 'SKILL TRIAL', color: '#9B6ED4',
    questions: 10, time: null, passNum: 8, reward: 'XP + Daily Bonus', rewardColor: '#9B6ED4',
    rules: [
      'No time limit — read each question at your own pace',
      'Select one answer per question; you can navigate back freely',
      'Score 8 / 10 or above to clear the skill and earn XP',
      'Your first cleared concept of the day earns +50 bonus XP',
      'Failed? A 10-minute cooldown applies before you can retry',
    ],
  },
  subject: {
    label: 'GATE ASSESSMENT', color: '#F59E0B',
    questions: 25, time: '30 min', passNum: 19, reward: 'Subject Badge', rewardColor: '#F59E0B',
    rules: [
      'Questions are drawn randomly from all skills inside this gate',
      'Timer starts when you begin — 30 minutes total',
      'Score 19 / 25 or above to earn the gate badge and close the gate',
      'You can navigate between questions freely before submitting',
      'Failed? A 24-hour cooldown applies before you can retry',
    ],
  },
  roadmap: {
    label: 'PATH FINAL TRIAL', color: '#EF4444',
    questions: 50, time: '90 min', passNum: 35, reward: 'Path Badge', rewardColor: '#4ADE80',
    rules: [
      'Questions span all subjects and all skills across this path',
      'Timer starts when you begin — 90 minutes total',
      'Score 35 / 50 → Interview Ready Badge',
      'Score 42 / 50 → Job Ready Badge (higher tier)',
      'Failed? A 48-hour cooldown applies before you can retry',
    ],
  },
}

export default function InstructionsModal({ intent, onClose, onConfirm }) {
  const meta = QUIZ_META[intent?.type]
  useBodyLock()
  const modalRef = useModalA11y(onClose, !!meta)

  if (!meta) return null

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} className="dash-overlay-backdrop dash-overlay-backdrop--modal">
      <div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="instructions-title" className="dash-instructions-modal" style={{ '--accent': meta.color }}>
        <div className="dash-instructions-modal__header">
          <span id="instructions-title" className="dash-instructions-modal__tag">[ {meta.label} PROTOCOL ]</span>
          <button type="button" aria-label="Close" onClick={onClose} className="dash-instructions-modal__close"><X size={15} /></button>
        </div>

        <div className="dash-instructions-modal__body">
          <div className="dash-instructions-modal__title-row">
            {intent.icon && <span className="dash-instructions-modal__icon">{intent.icon}</span>}
            <div>
              <div className="dash-instructions-modal__title">{intent.title}</div>
              <div className="dash-instructions-modal__subtitle">{meta.label}</div>
            </div>
          </div>

          <div className="dash-instructions-modal__stats">
            {[
              { label: 'QUESTIONS', value: meta.questions, color: '#60A5FA', big: true },
              { label: 'TIME LIMIT', value: meta.time ?? 'NONE', color: '#F59E0B', big: true },
              { label: 'PASS MARK', value: `${meta.passNum}/${meta.questions}`, color: meta.color, big: true },
              { label: 'REWARD', value: meta.reward, color: meta.rewardColor, big: false },
            ].map(s => (
              <div key={s.label} className="dash-instructions-stat" style={{ '--stat-color': s.color }}>
                <div className={`dash-instructions-stat__value ${s.big ? 'dash-instructions-stat__value--big' : 'dash-instructions-stat__value--small'}`}>{s.value}</div>
                <div className="dash-instructions-stat__label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="dash-instructions-modal__rules">
            <div className="dash-instructions-modal__rules-title">[ TRIAL RULES ]</div>
            <div className="dash-instructions-modal__rules-list">
              {meta.rules.map((rule, i) => (
                <div key={i} className="dash-instructions-rule">
                  <span className="dash-instructions-rule__num">0{i + 1}</span>
                  <span className="dash-instructions-rule__text">{rule}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dash-instructions-modal__actions">
            <button onClick={onClose} className="dash-instructions-cancel">CANCEL</button>
            <button
              onClick={onConfirm}
              className={`dash-instructions-confirm${intent.type === 'subject' ? ' dash-instructions-confirm--subject' : ''}`}
            >
              ⚔ BEGIN {meta.label}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
