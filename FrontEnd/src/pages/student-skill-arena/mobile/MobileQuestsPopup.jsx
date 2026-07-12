import { X, CheckCircle } from 'lucide-react'
import useBodyLock from '../../../hooks/useBodyLock'

// Quest data is server-driven and passed in from DashboardPage (single source of truth).
export default function MobileQuestsPopup({ questList = [], doneCount = 0, totalQuests = 0, earnedXp = 0, onClose }) {
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
          {questList.map(q => {
            const mins       = q.targetSeconds ? Math.floor((q.progressSeconds || 0) / 60) : null
            const targetMins = q.targetSeconds ? Math.round(q.targetSeconds / 60) : null
            return (
              <div key={q.id} className={`dash-quest-item${q.done ? ' is-done' : ''}`}>
                <div className="dash-quest-item__check">
                  {q.done && <CheckCircle size={12} color="#4ADE80" />}
                </div>
                <span className="dash-quest-item__label">
                  {q.label}
                  {q.targetSeconds != null && !q.done && (
                    <span className="dash-quest-item__progress"> · {mins}/{targetMins}m</span>
                  )}
                </span>
                <span className="dash-quest-item__xp">+{q.xp} XP</span>
              </div>
            )
          })}
          <div className="dash-quest-summary">
            {doneCount}/{totalQuests} completed · +{earnedXp} XP earned today
          </div>
        </div>
      </div>
    </>
  )
}
