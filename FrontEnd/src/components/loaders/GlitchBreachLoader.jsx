// Loader #5 — Glitch Breach
import { LOADERS_ON } from './_config'

const CORRUPT_LINES = [
  '> INIT SEQUENCE.......... [ERROR]',
  '> L0AD1NG C0RE.......... [FAIL]',
  '> BYPASSING FIREWALL..... ██████',
  '> DECRYPTING ACCESS...... ░░░░░░',
  '> BREACH DETECTED',
  '> OVERRIDING SYSTEM......',
  '> ACCESS GRANTED',
]

export default function GlitchBreachLoader({ accentColor = '#f97316', label = '' }) {
  if (!LOADERS_ON) return null
  return (
    <div className="gbl-root" style={{ '--gbl-accent': accentColor }}>
      {/* CRT scanlines */}
      <div className="gbl-scanlines" aria-hidden="true" />

      {/* Glitch horizontal slices */}
      <div className="gbl-slices" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="gbl-slice"
            style={{
              top: `${5 + i * 11}%`,
              height: `${4 + (i % 3) * 2}%`,
              animationDelay: `${i * 0.15}s`,
              animationDuration: `${0.1 + (i % 4) * 0.05}s`,
            }} />
        ))}
      </div>

      {/* RGB split shadow */}
      <div className="gbl-rgb-r" aria-hidden="true" />
      <div className="gbl-rgb-b" aria-hidden="true" />

      {/* Terminal window */}
      <div className="gbl-window">
        <div className="gbl-win-header">
          <span className="gbl-win-dot" style={{ background: '#FF5F57' }} />
          <span className="gbl-win-dot" style={{ background: '#FEBC2E' }} />
          <span className="gbl-win-dot" style={{ background: '#28C840' }} />
          <span className="gbl-win-title">SYSTEM BREACH — UNAUTHORIZED ACCESS</span>
        </div>
        <div className="gbl-win-body">
          {CORRUPT_LINES.map((line, i) => (
            <div key={i} className="gbl-line"
              style={{ animationDelay: `${0.2 + i * 0.35}s` }}>
              <span className={`gbl-line-text${i === CORRUPT_LINES.length - 1 ? ' gbl-granted' : i === CORRUPT_LINES.length - 3 ? ' gbl-detected' : ''}`}
                style={i < 4 ? { color: 'rgba(255,80,80,0.75)' } : {}}>
                {line}
              </span>
              {i === CORRUPT_LINES.length - 1 && (
                <span className="gbl-cursor">█</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Big ACCESS GRANTED overlay */}
      <div className="gbl-access">
        <span className="gbl-access-text" style={{ color: accentColor, textShadow: `0 0 30px ${accentColor}, 0 0 60px ${accentColor}88` }}>
          ACCESS GRANTED
        </span>
      </div>

      {/* Label */}
      {label && (
        <div className="gbl-label" style={{ color: `${accentColor}99` }}>{label}</div>
      )}

      {/* Corner brackets */}
      <div className="gbl-bracket gbl-bracket-tl" style={{ borderColor: `${accentColor}66` }} />
      <div className="gbl-bracket gbl-bracket-tr" style={{ borderColor: `${accentColor}66` }} />
      <div className="gbl-bracket gbl-bracket-bl" style={{ borderColor: `${accentColor}66` }} />
      <div className="gbl-bracket gbl-bracket-br" style={{ borderColor: `${accentColor}66` }} />
    </div>
  )
}
