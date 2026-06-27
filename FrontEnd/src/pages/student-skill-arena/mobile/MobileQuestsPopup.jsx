import { X, CheckCircle } from 'lucide-react'
import useBodyLock from '../../../hooks/useBodyLock'

const DAILY_QUESTS = [
  { id: 'q1', label: 'Complete 1 concept',    xp: 50 },
  { id: 'q2', label: 'Study for 20 min',      xp: 30 },
]

// ─── Mobile: Daily Quests popup ───────────────────────────
export default function MobileQuestsPopup({ quests, doneCount, earnedXp, onClose }) {
  useBodyLock()
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 320, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }} />
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 321, background: '#090E1C', borderTop: '2px solid rgba(74,222,128,0.4)', borderRadius: '20px 20px 0 0', boxShadow: '0 -8px 48px rgba(0,0,0,0.7)', display: 'flex', flexDirection: 'column', animation: 'slideUp 0.22s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.25rem', borderBottom: '1px solid rgba(74,222,128,0.12)', flexShrink: 0 }}>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.14em', color: '#4ADE80' }}>[ DAILY QUESTS ]</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex' }}><X size={16} /></button>
        </div>
        <div style={{ padding: '1rem 1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {DAILY_QUESTS.map(q => (
            <div key={q.id} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1rem', background: quests[q.id] ? 'rgba(74,222,128,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${quests[q.id] ? 'rgba(74,222,128,0.22)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 10 }}>
              <div style={{ width: 22, height: 22, border: `2px solid ${quests[q.id] ? '#4ADE80' : 'var(--border-hover)'}`, borderRadius: 5, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: quests[q.id] ? 'rgba(74,222,128,0.15)' : 'transparent' }}>
                {quests[q.id] && <CheckCircle size={12} color="#4ADE80" />}
              </div>
              <span style={{ flex: 1, fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: '0.9375rem', color: quests[q.id] ? 'var(--text-muted)' : 'var(--text-secondary)', textDecoration: quests[q.id] ? 'line-through' : 'none' }}>{q.label}</span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem', color: quests[q.id] ? '#4ADE80' : '#F59E0B', fontWeight: 700 }}>+{q.xp} XP</span>
            </div>
          ))}
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.25rem', letterSpacing: '0.08em' }}>
            {doneCount}/{DAILY_QUESTS.length} completed · +{earnedXp} XP earned today
          </div>
        </div>
      </div>
    </>
  )
}
