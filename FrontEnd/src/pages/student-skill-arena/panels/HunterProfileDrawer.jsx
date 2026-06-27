import { X, LogOut } from 'lucide-react'

const RANK_LADDER = [
  { letter: 'E', label: 'E-RANK', cls: 'rank-e', color: '#888888', bg: '#88888815', min: 0 },
  { letter: 'D', label: 'D-RANK', cls: 'rank-d', color: '#4ADE80', bg: '#4ADE8015', min: 500 },
  { letter: 'C', label: 'C-RANK', cls: 'rank-c', color: '#60A5FA', bg: '#60A5FA15', min: 1500 },
  { letter: 'B', label: 'B-RANK', cls: 'rank-b', color: '#9B6ED4', bg: '#9B6ED415', min: 3000 },
  { letter: 'A', label: 'A-RANK', cls: 'rank-a', color: '#F59E0B', bg: '#F59E0B15', min: 6000 },
  { letter: 'S', label: 'S-RANK', cls: 'rank-s', color: '#EF4444', bg: '#EF444415', min: 10000 },
]

// ─── Hunter Profile Drawer ────────────────────────────────
const HOW_IT_WORKS = [
  { num: '01', color: '#9B6ED4', title: 'Pick a Hunter Path', desc: 'Go to HUNTER PATH tab and choose a career roadmap — Java Full Stack, MERN, Python, Frontend. Each path is a structured sequence of dungeon gates.' },
  { num: '02', color: '#60A5FA', title: 'Enter Dungeon Gates', desc: 'Go to DUNGEON GATE tab — each gate is a subject (HTML, CSS, JavaScript...). Enter a gate and start clearing concepts one by one at your own pace.' },
  { num: '03', color: '#F59E0B', title: 'Clear Concepts & Earn XP', desc: 'Read each concept then pass the quiz (8/10 to clear). Earn XP per concept — first concept of the day gives +50 bonus XP.' },
]

const XP_TIPS = [
  'First concept of the day gives +50 bonus XP',
  'Each quiz earns score × 10 XP (max 100 per concept)',
  'Clear all concepts in a gate to unlock the subject badge',
  'Enroll a Hunter Path to track your full career progress',
]

function SectionTitle({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.14em', color: '#64748B', whiteSpace: 'nowrap' }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
    </div>
  )
}

export default function HunterProfileDrawer({ user, rank, level, xp, onClose, onLogout }) {
  const initials = user?.fullName?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '??'
  const xpToNext = rank.next ? rank.next - xp : null

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 300, backdropFilter: 'blur(2px)' }} />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(420px, 92vw)',
        background: '#090E1C',
        borderLeft: '1px solid rgba(155,110,212,0.22)',
        zIndex: 301, overflowY: 'auto',
        display: 'flex', flexDirection: 'column',
        animation: 'slideInRight 0.22s ease',
        boxShadow: '-12px 0 48px rgba(0,0,0,0.6)',
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderBottom: '1px solid rgba(155,110,212,0.15)', position: 'sticky', top: 0, background: '#090E1C', zIndex: 1 }}>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.14em', color: '#9B6ED4' }}>[ HUNTER INSTRUCTIONS ]</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '0.25rem', display: 'flex', borderRadius: 4 }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.75rem', flex: 1 }}>

          {/* ── About ── */}
          <div>
            <SectionTitle>ABOUT LEARNTOEARN</SectionTitle>
            <div style={{ padding: '0.875rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10 }}>
              <p style={{ fontSize: '0.8125rem', color: '#8B9AB8', lineHeight: 1.75, margin: '0 0 0.625rem' }}>
                LearnToEarn is a Solo Leveling–inspired learning platform where you level up your tech skills like a player. Learn concept by concept, earn XP and badges as proof, and follow structured roadmaps to go from beginner to job-ready.
                </p>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: '#64748B', letterSpacing: '0.06em' }}>
                Skills Arena · Resume · AI · Jobs
              </div>
            </div>
          </div>


          {/* ── How ARISE Works ── */}
          <div>
            <SectionTitle>HOW ARISE WORKS</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {HOW_IT_WORKS.map(s => (
                <div key={s.num} style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem 0.875rem', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: `${s.color}18`, border: `1px solid ${s.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.58rem', fontWeight: 800, color: s.color, fontFamily: "'Orbitron', sans-serif" }}>{s.num}</div>
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#E2E8F0', marginBottom: '0.2rem' }}>{s.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#8B9AB8', lineHeight: 1.65 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── How to Earn Badges ── */}
          <div>
            <SectionTitle>HOW TO EARN BADGES</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                {
                  icon: '🏆',
                  color: '#F59E0B',
                  title: 'Gate Badge',
                  steps: [
                    'Enter a Dungeon Gate and clear all skills inside it',
                    'Once all skills are learned, the "Take Final Test" button unlocks',
                    'Pass the gate final test (19/25) to earn the subject badge',
                  ],
                },
                {
                  icon: '🎖️',
                  color: '#9B6ED4',
                  title: 'Hunter Path Badge',
                  steps: [
                    'Enroll in a Hunter Path from the HUNTER PATH tab',
                    'Earn gate badges for every subject in the path',
                    'Once all gates are closed, the Path Final Trial unlocks',
                    'Pass the roadmap final test to earn the path badge',
                  ],
                },
              ].map(b => (
                <div key={b.title} style={{ padding: '0.875rem', background: `${b.color}0A`, border: `1px solid ${b.color}25`, borderRadius: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>{b.icon}</span>
                    <span style={{ fontWeight: 700, fontSize: '0.875rem', color: b.color }}>{b.title}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {b.steps.map((step, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.52rem', fontWeight: 800, color: b.color, flexShrink: 0, marginTop: '0.2rem', minWidth: 14 }}>0{i + 1}</span>
                        <span style={{ fontSize: '0.775rem', color: '#8B9AB8', lineHeight: 1.6 }}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Rank Progression Guide ── */}
          <div>
            <SectionTitle>RANK PROGRESSION GUIDE</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginBottom: '0.875rem' }}>
              {RANK_LADDER.map(r => {
                const isCurrent = r.letter === rank.label
                const isUnlocked = xp >= r.min
                return (
                  <div key={r.letter} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.55rem 0.75rem', background: isCurrent ? `${r.color}10` : 'rgba(255,255,255,0.02)', border: `1px solid ${isCurrent ? r.color + '35' : 'rgba(255,255,255,0.05)'}`, borderRadius: 8, opacity: isUnlocked ? 1 : 0.45 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, border: `1.5px solid ${r.color}`, background: `${r.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem', fontWeight: 800, color: r.color, fontFamily: "'Orbitron', sans-serif", flexShrink: 0 }}>{r.letter}</div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: isCurrent ? r.color : '#8B9AB8' }}>{r.label}</span>
                      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.64rem', color: isCurrent ? '#F59E0B' : '#64748B' }}>{r.min === 0 ? 'START' : `${r.min.toLocaleString()} XP`}</span>
                    </div>
                    {isCurrent && <span style={{ fontSize: '0.55rem', fontWeight: 700, color: r.color, background: `${r.color}18`, padding: '0.1rem 0.4rem', borderRadius: 3, letterSpacing: '0.06em', fontFamily: "'Share Tech Mono', monospace", flexShrink: 0 }}>NOW</span>}
                  </div>
                )
              })}
            </div>
            {/* XP Tips */}
            <div style={{ padding: '0.75rem 0.875rem', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.18)', borderRadius: 8 }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>[ XP TIPS ]</div>
              {XP_TIPS.map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', color: '#8B9AB8', lineHeight: 1.6 }}>
                  <span style={{ color: '#F59E0B', flexShrink: 0 }}>›</span>{tip}
                </div>
              ))}
            </div>
          </div>

          

        </div>

        {/* ── Sticky footer — exit buttons (desktop only) ── */}
        <div className="sl-drawer-exit-footer" style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(155,110,212,0.12)', background: '#090E1C', position: 'sticky', bottom: 0 }}>
          {user?.role === 'GUEST' && (
            <div style={{ marginBottom: '0.75rem', padding: '0.625rem 0.875rem', background: 'rgba(155,110,212,0.08)', border: '1px solid rgba(155,110,212,0.2)', borderRadius: 8, fontSize: '0.75rem', color: '#8B9AB8', lineHeight: 1.6 }}>
              <span style={{ color: '#C4B5FD', fontWeight: 600 }}>Guest session</span> — create a free account to save your XP and progress permanently.
            </div>
          )}
          <button
            onClick={() => { window.location.href = '/' }}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.65rem', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-muted)', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.1em', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}>
            ← EXIT ARENA
          </button>
          <button
            onClick={onLogout}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 8, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.22)', color: '#EF4444', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.1em', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.16)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}>
            <LogOut size={13} /> EXIT SYSTEM
          </button>
        </div>
      </div>
    </>
  )
}
