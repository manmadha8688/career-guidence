import { useState, useEffect } from 'react'

const MESSAGES = {
  register: [
    'Registering with the Hunter Association...',
    'Creating your Hunter License...',
    'Generating your unique Hunter ID...',
    'Setting up your Skill Arena...',
    'Assigning your starting rank: E-Rank...',
    'Almost ready, Hunter!',
  ],
  guest: [
    'Issuing a temporary Hunter License...',
    'Generating your guest Hunter ID...',
    'Preparing trial arena access...',
    'Loading the mission board...',
    'Welcome, Hunter!',
  ],
  login: [
    'Verifying Hunter credentials...',
    'Loading your profile...',
    'Syncing XP and battle records...',
    'Restoring your rank status...',
    'Preparing your dashboard...',
    'Welcome back, Hunter!',
  ],
  logout: [
    'Saving your progress...',
    'Syncing XP data...',
    'Securing your account...',
    'Logging out safely...',
    'See you next time, Hunter!',
  ],
}

const TITLES = {
  register: 'Creating Hunter License',
  guest:    'Issuing Guest License',
  login:    'Entering the System',
  logout:   'Saving & Signing Out',
}

const TIPS = [
  'Complete one concept daily to earn a streak bonus XP',
  'Pass the quiz to officially mark a concept as cleared',
  'Missions are real-world projects — build to prove your skills',
  'Your XP determines your rank: E → D → C → B → A → S',
  'Skill Arena roadmaps are built around real job requirements',
  'Higher rank missions unlock advanced topics to challenge you',
]

export default function LoadingOverlay({ type, completing = false }) {
  const [msgIdx, setMsgIdx]     = useState(0)
  const [tipIdx, setTipIdx]     = useState(Math.floor(Math.random() * TIPS.length))
  const [progress, setProgress] = useState(0)
  const [visible, setVisible]   = useState(false)

  const messages = MESSAGES[type] || MESSAGES.login
  const title    = TITLES[type]   || 'Loading...'

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    setMsgIdx(0)
    const t = setInterval(() => setMsgIdx(i => (i + 1) % messages.length), 1500)
    return () => clearInterval(t)
  }, [type])

  useEffect(() => {
    const t = setInterval(() => setTipIdx(i => (i + 1) % TIPS.length), 3000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (completing) { setProgress(100); return }
    setProgress(0)
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 88) { clearInterval(t); return 88 }
        return p + (p < 40 ? 3 : p < 70 ? 2 : 1)
      })
    }, 120)
    return () => clearInterval(t)
  }, [completing])

  return (
    <div className={`loading-overlay${visible ? ' loading-overlay--visible' : ' loading-overlay--hidden'}`}>
      <div className="loading-overlay__glow" />

      <div className="loading-overlay__logo lp-grad-text">ARISE</div>
      <div className="loading-overlay__subtitle">HUNTER ASSOCIATION SYSTEM</div>

      <div className="loading-overlay__card">
        <h2 className="loading-overlay__title">⚔&nbsp; {title}</h2>

        <div className="loading-overlay__track">
          <div
            className={`loading-overlay__fill${completing ? ' loading-overlay__fill--complete' : ''}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="loading-overlay__pct">{Math.round(progress)}%</div>

        <p key={msgIdx} className="loading-overlay__message">{messages[msgIdx]}</p>

        <div className="loading-overlay__tip">
          <div className="loading-overlay__tip-label">◈ HUNTER TIP</div>
          <p key={tipIdx} className="loading-overlay__tip-text">{TIPS[tipIdx]}</p>
        </div>
      </div>
    </div>
  )
}
