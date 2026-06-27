import { X } from 'lucide-react'
import useBodyLock from '../../../hooks/useBodyLock'

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

  if (!meta) return null

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.78)', zIndex: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
      <div style={{ background: '#090E1C', border: `1px solid ${meta.color}33`, borderTop: `3px solid ${meta.color}`, borderRadius: 16, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', boxShadow: `0 0 60px ${meta.color}20`, animation: 'slideUp 0.2s ease' }}>

        {/* Header */}
        <div style={{ padding: '1rem 1.25rem', borderBottom: `1px solid ${meta.color}1A`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.14em', color: meta.color }}>[ {meta.label} PROTOCOL ]</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex', padding: '0.2rem' }}><X size={15} /></button>
        </div>

        <div style={{ padding: '1.375rem 1.5rem' }}>

          {/* Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.375rem' }}>
            {intent.icon && <span style={{ fontSize: '1.75rem', flexShrink: 0 }}>{intent.icon}</span>}
            <div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 800, fontSize: '1.175rem', color: '#E2E8F0', lineHeight: 1.2 }}>{intent.title}</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: meta.color, letterSpacing: '0.08em', marginTop: '0.2rem' }}>{meta.label}</div>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.5rem', marginBottom: '1.375rem' }}>
            {[
              { label: 'QUESTIONS', value: meta.questions, color: '#60A5FA', big: true },
              { label: 'TIME LIMIT', value: meta.time ?? 'NONE', color: '#F59E0B', big: true },
              { label: 'PASS MARK', value: `${meta.passNum}/${meta.questions}`, color: meta.color, big: true },
              { label: 'REWARD', value: meta.reward, color: meta.rewardColor, big: false },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center', padding: '0.75rem 0.375rem', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10 }}>
                <div style={{ fontFamily: s.big ? "'Orbitron', sans-serif" : "'Rajdhani', sans-serif", fontSize: s.big ? '1.1rem' : '0.72rem', fontWeight: 800, color: s.color, lineHeight: 1.2 }}>{s.value}</div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: '#64748B', letterSpacing: '0.07em', marginTop: '0.3rem' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Rules */}
          <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10 }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.12em', color: '#64748B', marginBottom: '0.75rem' }}>[ TRIAL RULES ]</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {meta.rules.map((rule, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.5rem', fontWeight: 800, color: meta.color, flexShrink: 0, marginTop: '0.28rem', minWidth: 16 }}>0{i + 1}</span>
                  <span style={{ fontSize: '0.8rem', color: '#8B9AB8', lineHeight: 1.65 }}>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={onClose}
              style={{ flex: '0 0 100px', padding: '0.75rem', borderRadius: 8, background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: '#64748B', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.06em', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#8B9AB8' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B' }}>
              CANCEL
            </button>
            <button onClick={onConfirm}
              style={{ flex: 1, padding: '0.875rem', borderRadius: 8, background: `linear-gradient(135deg, ${meta.color}BB, ${meta.color})`, border: 'none', color: intent.type === 'subject' ? '#1A0F00' : '#fff', fontFamily: "'Rajdhani', sans-serif", fontWeight: 800, fontSize: '1rem', letterSpacing: '0.08em', cursor: 'pointer', boxShadow: `0 0 24px ${meta.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 40px ${meta.color}60`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 24px ${meta.color}40`}>
              ⚔ BEGIN {meta.label}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
