// Loader #7 — Dungeon Portal
import { LOADERS_ON } from './_config'

const RUNE_SYMBOLS = ['⟁','◈','✦','⟐','◆','⬡','⟊','✧','◉','⟁']

export default function DungeonPortalLoader({ subtitle = '', panel = false, height = 200 }) {
  if (!LOADERS_ON) return null
  return (
    <div className={panel ? 'dpl-panel' : 'dpl-root'} style={panel ? { height } : undefined}>
      {/* Background stars/particles */}
      <div className="dpl-stars" aria-hidden="true">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="dpl-star"
            style={{
              left:  `${(i * 37 + 11) % 100}%`,
              top:   `${(i * 53 + 7) % 100}%`,
              width:  `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              animationDelay: `${(i * 0.13) % 3}s`,
              animationDuration: `${2 + (i % 5) * 0.4}s`,
            }} />
        ))}
      </div>

      {/* Portal rings — multiple spinning at different speeds */}
      <div className="dpl-portal">
        <svg viewBox="0 0 280 280" className="dpl-svg">
          <defs>
            <radialGradient id="portalCenter" cx="50%" cy="50%" r="50%">
              <stop offset="0%"  stopColor="rgba(155,110,212,0.95)" />
              <stop offset="40%" stopColor="rgba(100,60,180,0.6)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="portalGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"  stopColor="rgba(155,110,212,0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Outer glow */}
          <circle cx="140" cy="140" r="130" fill="url(#portalGlow)" />

          {/* Ring 1 — outer, slow */}
          <circle cx="140" cy="140" r="118"
            fill="none" stroke="rgba(155,110,212,0.25)" strokeWidth="1"
            strokeDasharray="741" className="dpl-ring dpl-ring-1" />

          {/* Ring 2 — rune ring */}
          <circle cx="140" cy="140" r="100"
            fill="none" stroke="rgba(155,110,212,0.4)" strokeWidth="2"
            strokeDasharray="628" strokeLinecap="round"
            className="dpl-ring dpl-ring-2" />

          {/* Ring 3 — middle */}
          <circle cx="140" cy="140" r="80"
            fill="none" stroke="rgba(180,138,232,0.5)" strokeWidth="1.5"
            strokeDasharray="502" className="dpl-ring dpl-ring-3" />

          {/* Ring 4 — inner */}
          <circle cx="140" cy="140" r="58"
            fill="none" stroke="rgba(200,160,255,0.6)" strokeWidth="2.5"
            strokeDasharray="364" className="dpl-ring dpl-ring-4" />

          {/* Portal core */}
          <circle cx="140" cy="140" r="42"
            fill="url(#portalCenter)"
            className="dpl-core" />

          {/* Spiral arms — 6 lines rotating */}
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i / 6) * Math.PI * 2
            return (
              <line key={i}
                x1="140" y1="140"
                x2={140 + 115 * Math.cos(a)}
                y2={140 + 115 * Math.sin(a)}
                stroke="rgba(155,110,212,0.12)"
                strokeWidth="0.8" />
            )
          })}

          {/* Orbiting rune marks on ring 2 */}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2
            return (
              <circle key={i}
                cx={140 + 100 * Math.cos(a)}
                cy={140 + 100 * Math.sin(a)}
                r="3" fill="rgba(180,138,232,0.7)"
                className="dpl-rune-mark"
                style={{ animationDelay: `${i * 0.15}s` }} />
            )
          })}

          {/* Tear / crack lines from center */}
          {[30, 110, 200, 290].map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            return (
              <line key={i}
                x1={140 + 42 * Math.cos(rad)}
                y1={140 + 42 * Math.sin(rad)}
                x2={140 + 58 * Math.cos(rad)}
                y2={140 + 58 * Math.sin(rad)}
                stroke="rgba(220,180,255,0.8)" strokeWidth="2"
                strokeLinecap="round"
                className="dpl-crack"
                style={{ animationDelay: `${i * 0.2}s` }} />
            )
          })}
        </svg>

        {/* Spiraling particles drawn into portal */}
        <div className="dpl-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="dpl-particle"
              style={{
                '--orbit-r': `${70 + (i % 5) * 18}px`,
                '--orbit-start': `${i * 18}deg`,
                animationDelay: `${i * 0.12}s`,
                animationDuration: `${1.8 + (i % 4) * 0.3}s`,
                width:  `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
              }} />
          ))}
        </div>
      </div>

      {/* Floating rune symbols around portal */}
      {RUNE_SYMBOLS.map((r, i) => (
        <div key={i} className="dpl-rune"
          style={{
            '--rune-angle': `${i * 36}deg`,
            '--rune-r': `${135 + (i % 3) * 15}px`,
            animationDelay: `${i * 0.18}s`,
            animationDuration: `${2 + (i % 3) * 0.5}s`,
          }}>{r}</div>
      ))}

      {/* Center text */}
      <div className="dpl-center-text">
        <div className="dpl-gate-text">GATE OPENING</div>
        {subtitle && <div className="dpl-sub">{subtitle}</div>}
      </div>

      {/* Bottom corners */}
      <div className="dpl-corner dpl-corner-tl" />
      <div className="dpl-corner dpl-corner-tr" />
      <div className="dpl-corner dpl-corner-bl" />
      <div className="dpl-corner dpl-corner-br" />
    </div>
  )
}
