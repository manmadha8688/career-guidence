// Skill Arena Panel Loader — Dungeon Portal (scaled for panels)
import { LOADERS_ON } from './_config'

export default function GateOpenLoader({ height = 200 }) {
  if (!LOADERS_ON) return null

  const size = Math.min(height * 0.85, 200)

  return (
    <div className="gol-panel-root" style={{ height }}>

      {/* Stars */}
      <div className="dpl-stars" aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="dpl-star" style={{
            left:  `${(i * 37 + 11) % 100}%`,
            top:   `${(i * 53 + 7) % 100}%`,
            width:  `${1 + (i % 2)}px`,
            height: `${1 + (i % 2)}px`,
            animationDelay: `${(i * 0.13) % 3}s`,
            animationDuration: `${2 + (i % 5) * 0.4}s`,
          }} />
        ))}
      </div>

      {/* Portal */}
      <div className="dpl-portal" style={{ width: size, height: size }}>
        <svg viewBox="0 0 280 280" className="dpl-svg" style={{ width: size, height: size }}>
          <defs>
            <radialGradient id="pcPanel" cx="50%" cy="50%" r="50%">
              <stop offset="0%"  stopColor="rgba(155,110,212,0.9)" />
              <stop offset="40%" stopColor="rgba(100,60,180,0.5)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="pgPanel" cx="50%" cy="50%" r="50%">
              <stop offset="0%"  stopColor="rgba(155,110,212,0.25)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          <circle cx="140" cy="140" r="130" fill="url(#pgPanel)" />

          <circle cx="140" cy="140" r="118"
            fill="none" stroke="rgba(155,110,212,0.2)" strokeWidth="1"
            strokeDasharray="741" className="dpl-ring dpl-ring-1" />
          <circle cx="140" cy="140" r="100"
            fill="none" stroke="rgba(155,110,212,0.4)" strokeWidth="1.5"
            strokeDasharray="628" strokeLinecap="round"
            className="dpl-ring dpl-ring-2" />
          <circle cx="140" cy="140" r="80"
            fill="none" stroke="rgba(180,138,232,0.45)" strokeWidth="1.2"
            strokeDasharray="502" className="dpl-ring dpl-ring-3" />
          <circle cx="140" cy="140" r="58"
            fill="none" stroke="rgba(200,160,255,0.55)" strokeWidth="2"
            strokeDasharray="364" className="dpl-ring dpl-ring-4" />
          <circle cx="140" cy="140" r="42" fill="url(#pcPanel)" className="dpl-core" />

          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i / 6) * Math.PI * 2
            return <line key={i} x1="140" y1="140"
              x2={140 + 115 * Math.cos(a)} y2={140 + 115 * Math.sin(a)}
              stroke="rgba(155,110,212,0.1)" strokeWidth="0.8" />
          })}

          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2
            return <circle key={i}
              cx={140 + 100 * Math.cos(a)} cy={140 + 100 * Math.sin(a)}
              r="3" fill="rgba(180,138,232,0.7)"
              className="dpl-rune-mark"
              style={{ animationDelay: `${i * 0.15}s` }} />
          })}

          {[30, 110, 200, 290].map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            return <line key={i}
              x1={140 + 42 * Math.cos(rad)} y1={140 + 42 * Math.sin(rad)}
              x2={140 + 58 * Math.cos(rad)} y2={140 + 58 * Math.sin(rad)}
              stroke="rgba(220,180,255,0.7)" strokeWidth="1.8"
              strokeLinecap="round"
              className="dpl-crack"
              style={{ animationDelay: `${i * 0.2}s` }} />
          })}
        </svg>

        {/* Particles */}
        <div className="dpl-particles">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="dpl-particle" style={{
              '--orbit-r': `${50 + (i % 5) * 12}px`,
              '--orbit-start': `${i * 26}deg`,
              animationDelay: `${i * 0.15}s`,
              animationDuration: `${1.6 + (i % 4) * 0.3}s`,
              width:  `${2 + (i % 2)}px`,
              height: `${2 + (i % 2)}px`,
            }} />
          ))}
        </div>
      </div>

    </div>
  )
}
