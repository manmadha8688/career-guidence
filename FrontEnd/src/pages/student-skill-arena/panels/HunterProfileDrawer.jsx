import { X, LogOut } from 'lucide-react'
import useBodyLock from '../../../hooks/useBodyLock'

const RANK_LADDER = [
  { letter: 'E', label: 'E-RANK', cls: 'rank-e', color: '#888888', bg: '#88888815', min: 0 },
  { letter: 'D', label: 'D-RANK', cls: 'rank-d', color: '#4ADE80', bg: '#4ADE8015', min: 500 },
  { letter: 'C', label: 'C-RANK', cls: 'rank-c', color: '#60A5FA', bg: '#60A5FA15', min: 1500 },
  { letter: 'B', label: 'B-RANK', cls: 'rank-b', color: '#9B6ED4', bg: '#9B6ED415', min: 3000 },
  { letter: 'A', label: 'A-RANK', cls: 'rank-a', color: '#F59E0B', bg: '#F59E0B15', min: 6000 },
  { letter: 'S', label: 'S-RANK', cls: 'rank-s', color: '#EF4444', bg: '#EF444415', min: 10000 },
]

// Plain-language glossary for the 3 core themed words a newcomer meets first.
const GLOSSARY = [
  {
    word: 'Skill', plain: 'One lesson / topic', color: '#4ADE80',
    desc: 'The smallest step. One thing you learn — like "CSS Flexbox" or "Java Loops" — followed by a short quiz. (Also shown as a "concept".)',
  },
  {
    word: 'Dungeon Gate', plain: 'A Subject', color: '#60A5FA',
    desc: 'A full subject made up of many skills — such as HTML, JavaScript, or Java. Learn all the skills inside it to master the subject and earn its badge.',
  },
  {
    word: 'Hunter Path', plain: 'A Career Roadmap', color: '#9B6ED4',
    desc: 'A guided, ordered set of subjects for a specific job — like Java Full Stack or MERN. Follow it start to finish to go from beginner to job-ready.',
  },
]

// Shorter one-line words to round out the vocabulary.
const QUICK_WORDS = [
  { k: 'Trial', v: 'a quiz you take to clear a skill or subject' },
  { k: 'XP', v: 'points you earn for passing quizzes' },
  { k: 'Rank (E → S)', v: 'your overall level, based on total XP' },
  { k: 'Badge', v: 'proof you finished a subject or roadmap' },
]

const HOW_IT_WORKS = [
  { num: '01', color: '#9B6ED4', title: 'Pick a Hunter Path (career roadmap)', desc: 'Open the HUNTER PATH tab and choose a roadmap for the job you want — Java Full Stack, MERN, Python, or Frontend. It lays out the subjects to learn, in the right order.' },
  { num: '02', color: '#60A5FA', title: 'Enter a Dungeon Gate (subject)', desc: 'Open the DUNGEON GATE tab. Each gate is one subject (HTML, CSS, JavaScript…). Go in and learn its skills one by one, at your own pace.' },
  { num: '03', color: '#F59E0B', title: 'Clear skills & earn XP', desc: 'Read each skill, then pass its quiz (8 out of 10 to clear). You earn XP for every skill — the first one each day gives a +50 bonus.' },
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
  useBodyLock()

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
            <SectionTitle>ABOUT LEARNFOREARN</SectionTitle>
            <div className="dash-hunter-about-card">
              <p className="dash-hunter-about-card__text">
                learnforearn is a learning platform with a Solo Leveling (anime) theme — so you level up your tech skills like a game character. Don't worry if you don't know the anime: the game words simply stand for normal learning terms, explained right below.
              </p>
              <div className="dash-hunter-about-card__tags">Learn · Earn XP · Badges · Get Job-Ready</div>
            </div>
          </div>

          <div>
            <SectionTitle>WHAT THE WORDS MEAN</SectionTitle>
            <div className="dash-hunter-glossary">
              {GLOSSARY.map(g => (
                <div
                  key={g.word}
                  className="dash-hunter-term"
                  style={{ '--term-color': g.color, '--term-bg': `${g.color}14`, '--term-border': `${g.color}38` }}
                >
                  <div className="dash-hunter-term__head">
                    <span className="dash-hunter-term__word">{g.word}</span>
                    <span className="dash-hunter-term__eq">means</span>
                    <span className="dash-hunter-term__plain">{g.plain}</span>
                  </div>
                  <div className="dash-hunter-term__desc">{g.desc}</div>
                </div>
              ))}
            </div>
            <div className="dash-hunter-words">
              {QUICK_WORDS.map(w => (
                <div key={w.k} className="dash-hunter-word">
                  <span className="dash-hunter-word__k">{w.k}</span>
                  <span className="dash-hunter-word__v">{w.v}</span>
                </div>
              ))}
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
          <div className="dash-hunter-drawer__actions">
            <button onClick={() => { window.location.href = '/' }} className="dash-hunter-exit-btn">
              ← EXIT ARENA
            </button>
            <button onClick={onLogout} className="dash-hunter-logout-btn">
              <LogOut size={13} /> EXIT SYSTEM
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
