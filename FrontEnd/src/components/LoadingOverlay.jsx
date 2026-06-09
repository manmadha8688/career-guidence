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

  // Fade in
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  // Cycle messages every 1.5s
  useEffect(() => {
    setMsgIdx(0)
    const t = setInterval(() => setMsgIdx(i => (i + 1) % messages.length), 1500)
    return () => clearInterval(t)
  }, [type])

  // Cycle tips every 3s
  useEffect(() => {
    const t = setInterval(() => setTipIdx(i => (i + 1) % TIPS.length), 3000)
    return () => clearInterval(t)
  }, [])

  // Progress bar — fills to 88% then holds; jumps to 100% on completing
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
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(4,7,18,0.97)',
      backdropFilter: 'blur(16px)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Rajdhani', sans-serif",
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.3s ease',
      padding: '1rem',
    }}>

      {/* Glow orb */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,127,42,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Logo */}
      <div className="lp-grad-text" style={{
        fontFamily: "'Orbitron', sans-serif", fontWeight: 900,
        fontSize: 'clamp(1.5rem, 5vw, 2.25rem)', letterSpacing: '0.3em',
        marginBottom: '0.5rem',
      }}>
        ARISE
      </div>
      <div style={{
        fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem',
        letterSpacing: '0.2em', color: 'rgba(255,127,42,0.4)',
        marginBottom: '2.5rem',
      }}>
        HUNTER ASSOCIATION SYSTEM
      </div>

      {/* Card */}
      <div style={{
        width: 'min(440px, 92vw)',
        background: 'rgba(10,15,30,0.85)',
        border: '1px solid rgba(255,127,42,0.18)',
        borderRadius: 16, padding: '2rem',
        textAlign: 'center',
        boxShadow: '0 0 60px rgba(255,127,42,0.06), 0 24px 48px rgba(0,0,0,0.5)',
      }}>

        {/* Title */}
        <h2 style={{
          fontFamily: "'Orbitron', sans-serif", fontWeight: 700,
          fontSize: 'clamp(0.875rem, 3vw, 1rem)', letterSpacing: '0.08em',
          color: '#E2E8F0', margin: '0 0 1.75rem',
        }}>
          ⚔&nbsp; {title}
        </h2>

        {/* Progress bar */}
        <div style={{
          background: 'rgba(255,127,42,0.08)', borderRadius: 4,
          height: 5, marginBottom: '0.5rem', overflow: 'hidden',
          border: '1px solid rgba(255,127,42,0.1)',
        }}>
          <div style={{
            height: '100%', borderRadius: 4,
            background: 'linear-gradient(90deg, #FF6B00, #FF9F4A)',
            width: `${progress}%`,
            transition: completing ? 'width 0.5s ease' : 'width 0.12s linear',
            boxShadow: '0 0 10px rgba(255,127,42,0.6)',
          }} />
        </div>
        <div style={{
          fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem',
          letterSpacing: '0.08em', color: 'rgba(255,127,42,0.4)',
          marginBottom: '1.5rem',
        }}>
          {Math.round(progress)}%
        </div>

        {/* Cycling message */}
        <p key={msgIdx} style={{
          fontSize: '0.9rem', color: '#A0B4C8',
          letterSpacing: '0.01em', margin: '0 0 1.5rem',
          minHeight: '1.5rem', lineHeight: 1.5,
          animation: 'fadeIn 0.35s ease',
        }}>
          {messages[msgIdx]}
        </p>

        {/* Tip */}
        <div style={{
          background: 'rgba(155,110,212,0.06)',
          border: '1px solid rgba(155,110,212,0.15)',
          borderRadius: 10, padding: '0.75rem 1rem',
        }}>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.58rem', letterSpacing: '0.14em',
            color: '#9B6ED4', marginBottom: '0.35rem',
          }}>
            ◈ HUNTER TIP
          </div>
          <p key={tipIdx} style={{
            fontSize: '0.8rem', color: '#7A8AA0',
            margin: 0, lineHeight: 1.6,
            animation: 'fadeIn 0.5s ease',
          }}>
            {TIPS[tipIdx]}
          </p>
        </div>

      </div>
    </div>
  )
}
