import { X, LogOut } from 'lucide-react'

const RANK_LADDER = [
  { letter: 'E', label: 'E-RANK', cls: 'rank-e', color: '#888888', bg: '#88888815', min: 0 },
  { letter: 'D', label: 'D-RANK', cls: 'rank-d', color: '#4ADE80', bg: '#4ADE8015', min: 500 },
  { letter: 'C', label: 'C-RANK', cls: 'rank-c', color: '#60A5FA', bg: '#60A5FA15', min: 1500 },
  { letter: 'B', label: 'B-RANK', cls: 'rank-b', color: '#9B6ED4', bg: '#9B6ED415', min: 3000 },
  { letter: 'A', label: 'A-RANK', cls: 'rank-a', color: '#F59E0B', bg: '#F59E0B15', min: 6000 },
  { letter: 'S', label: 'S-RANK', cls: 'rank-s', color: '#EF4444', bg: '#EF444415', min: 10000 },
]

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
    <div className="dash-section-divider">
      <div className="dash-section-divider__line" />
      <span className="dash-section-divider__label">{children}</span>
      <div className="dash-section-divider__line" />
    </div>
  )
}

export default function HunterProfileDrawer({ user, rank, xp, onClose, onLogout }) {
  return (
    <>
      <div onClick={onClose} className="dash-overlay-backdrop dash-overlay-backdrop--drawer" />

      <div className="dash-hunter-drawer">
        <div className="dash-hunter-drawer__header">
          <span className="dash-hunter-drawer__title">[ HUNTER INSTRUCTIONS ]</span>
          <button onClick={onClose} className="dash-icon-btn"><X size={16} /></button>
        </div>

        <div className="dash-hunter-drawer__body">
          <div>
            <SectionTitle>ABOUT LEARNTOEARN</SectionTitle>
            <div className="dash-hunter-about-card">
              <p className="dash-hunter-about-card__text">
                LearnToEarn is a Solo Leveling–inspired learning platform where you level up your tech skills like a player. Learn concept by concept, earn XP and badges as proof, and follow structured roadmaps to go from beginner to job-ready.
              </p>
              <div className="dash-hunter-about-card__tags">Skills Arena · Resume · AI · Jobs</div>
            </div>
          </div>

          <div>
            <SectionTitle>HOW ARISE WORKS</SectionTitle>
            <div className="dash-hunter-steps">
              {HOW_IT_WORKS.map(s => (
                <div key={s.num} className="dash-hunter-step" style={{ '--step-color': s.color, '--step-bg': `${s.color}18`, '--step-border': `${s.color}40` }}>
                  <div className="dash-hunter-step__num">{s.num}</div>
                  <div>
                    <div className="dash-hunter-step__title">{s.title}</div>
                    <div className="dash-hunter-step__desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle>HOW TO EARN BADGES</SectionTitle>
            <div className="dash-hunter-badge-guide">
              {[
                {
                  icon: '🏆', color: '#F59E0B', title: 'Gate Badge',
                  steps: [
                    'Enter a Dungeon Gate and clear all skills inside it',
                    'Once all skills are learned, the "Take Final Test" button unlocks',
                    'Pass the gate final test (19/25) to earn the subject badge',
                  ],
                },
                {
                  icon: '🎖️', color: '#9B6ED4', title: 'Hunter Path Badge',
                  steps: [
                    'Enroll in a Hunter Path from the HUNTER PATH tab',
                    'Earn gate badges for every subject in the path',
                    'Once all gates are closed, the Path Final Trial unlocks',
                    'Pass the roadmap final test to earn the path badge',
                  ],
                },
              ].map(b => (
                <div key={b.title} className="dash-hunter-badge-card" style={{ '--badge-color': b.color, '--badge-bg': `${b.color}0A`, '--badge-border': `${b.color}25` }}>
                  <div className="dash-hunter-badge-card__header">
                    <span className="dash-hunter-badge-card__icon">{b.icon}</span>
                    <span className="dash-hunter-badge-card__title">{b.title}</span>
                  </div>
                  <div className="dash-hunter-badge-card__steps">
                    {b.steps.map((step, i) => (
                      <div key={i} className="dash-hunter-badge-step">
                        <span className="dash-hunter-badge-step__num">0{i + 1}</span>
                        <span className="dash-hunter-badge-step__text">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle>RANK PROGRESSION GUIDE</SectionTitle>
            <div className="dash-hunter-ranks">
              {RANK_LADDER.map(r => {
                const isCurrent = r.letter === rank.label
                const isUnlocked = xp >= r.min
                return (
                  <div
                    key={r.letter}
                    className={`dash-hunter-rank-row${isCurrent ? ' is-current' : ''}${!isUnlocked ? ' is-locked' : ''}`}
                    style={{ '--rank-color': r.color, '--rank-bg': `${r.color}10`, '--rank-border': `${r.color}35`, '--rank-letter-bg': `${r.color}18` }}
                  >
                    <div className="dash-hunter-rank-row__letter">{r.letter}</div>
                    <div className="dash-hunter-rank-row__info">
                      <span className="dash-hunter-rank-row__label">{r.label}</span>
                      <span className="dash-hunter-rank-row__xp">{r.min === 0 ? 'START' : `${r.min.toLocaleString()} XP`}</span>
                    </div>
                    {isCurrent && <span className="dash-hunter-rank-row__now">NOW</span>}
                  </div>
                )
              })}
            </div>
            <div className="dash-hunter-xp-tips">
              <div className="dash-hunter-xp-tips__title">[ XP TIPS ]</div>
              {XP_TIPS.map((tip, i) => (
                <div key={i} className="dash-hunter-xp-tip">
                  <span className="dash-hunter-xp-tip__bullet">›</span>{tip}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sl-drawer-exit-footer dash-hunter-drawer__footer">
          {user?.role === 'GUEST' && (
            <div className="dash-guest-note dash-guest-note--purple">
              <span className="dash-guest-note__highlight">Guest session</span> — create a free account to save your XP and progress permanently.
            </div>
          )}
          <button onClick={() => { window.location.href = '/' }} className="dash-hunter-exit-btn">
            ← EXIT ARENA
          </button>
          <button onClick={onLogout} className="dash-hunter-logout-btn">
            <LogOut size={13} /> EXIT SYSTEM
          </button>
        </div>
      </div>
    </>
  )
}
