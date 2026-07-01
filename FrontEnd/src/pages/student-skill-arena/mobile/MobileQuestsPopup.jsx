import { X, CheckCircle } from 'lucide-react'
import useBodyLock from '../../../hooks/useBodyLock'

const DAILY_QUESTS = [
  { id: 'q1', label: 'Complete 1 concept',    xp: 50 },
  { id: 'q2', label: 'Study for 20 min',      xp: 30 },
]

export default function MobileQuestsPopup({ quests, doneCount, earnedXp, onClose }) {
  useBodyLock()
  return (
    <>
      <div onClick={onClose} className="dash-overlay-backdrop dash-overlay-backdrop--quests" />
      <div className="dash-sheet dash-sheet--green">
        <div className="dash-sheet__header">
          <span className="dash-sheet__title">[ DAILY QUESTS ]</span>
          <button onClick={onClose} className="dash-sheet__close"><X size={16} /></button>
        </div>
        <div className="dash-sheet__body">
          {DAILY_QUESTS.map(q => (
            <div key={q.id} className={`dash-quest-item${quests[q.id] ? ' is-done' : ''}`}>
              <div className="dash-quest-item__check">
                {quests[q.id] && <CheckCircle size={12} color="#4ADE80" />}
              </div>
              <span className="dash-quest-item__label">{q.label}</span>
              <span className="dash-quest-item__xp">+{q.xp} XP</span>
            </div>
          ))}
          <div className="dash-quest-summary">
            {doneCount}/{DAILY_QUESTS.length} completed · +{earnedXp} XP earned today
          </div>
        </div>
      </div>
    </>
  )
}
