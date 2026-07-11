// Aptitude loaders — one distinct visual per category, all sharing the same
// shell (drifting background tokens + centre animation + label).
//   quantitative        → timer ring + cycling math operators
//   logical             → 3×3 pattern-lock grid lighting in sequence
//   verbal              → cycling words
//   data-interpretation → animated bar chart
import { LOADERS_ON } from './_config'

const OPS = ['+', '−', '×', '÷', '%', '=']
const WORDS = ['READ', 'THINK', 'ANSWER']
// Pattern-lock light order over a 3×3 grid (a snake path).
const PATTERN_ORDER = [0, 1, 2, 5, 4, 3, 6, 7, 8]
const BARS = [0.45, 0.8, 0.6, 1, 0.7]

const VARIANTS = {
  quantitative: { color: '#0EA5E9', tokens: ['7', '%', '+', '3', '=', '9', '×', '÷', '2', '−', '5', '√'] },
  logical:      { color: '#9B6ED4', tokens: ['▲', '●', '■', '◆', '?', '○', '△', '◇', '◈', '□', '?', '▲'] },
  verbal:       { color: '#22C55E', tokens: ['A', 'E', '"', 'R', 'S', '?', 'T', 'a', 'N', '.', 'O', 'z'] },
  'data-interpretation': { color: '#F59E0B', tokens: ['▮', '▬', '%', '↑', '↓', '◔', '▮', '▬', '↑', '%', '◑', '▬'] },
}

function CenterVisual({ variant, color }) {
  if (variant === 'logical') {
    return (
      <div className="apl-grid">
        {Array.from({ length: 9 }, (_, i) => (
          <span
            key={i}
            className="apl-dot"
            style={{ background: color, animationDelay: `${PATTERN_ORDER.indexOf(i) * 0.16}s` }}
          />
        ))}
      </div>
    )
  }
  if (variant === 'verbal') {
    return (
      <div className="apl-words">
        {WORDS.map((w, i) => (
          <span key={w} className="apl-word" style={{ color, animationDelay: `${-i * 1.5}s` }}>{w}</span>
        ))}
      </div>
    )
  }
  if (variant === 'data-interpretation') {
    return (
      <div className="apl-bars">
        {BARS.map((h, i) => (
          <span
            key={i}
            className="apl-bar"
            style={{ background: color, height: `${h * 100}%`, animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
    )
  }
  // quantitative (default)
  return (
    <div className="apl-ring">
      <svg viewBox="0 0 100 100" className="apl-ring__svg">
        <circle className="apl-ring__track" cx="50" cy="50" r="42" style={{ stroke: `${color}22` }} />
        <circle className="apl-ring__sweep" cx="50" cy="50" r="42" style={{ stroke: color }} />
      </svg>
      <div className="apl-ring__core">
        {OPS.map((op, i) => (
          <span key={op} className="apl-op" style={{ color, animationDelay: `${-i}s` }}>{op}</span>
        ))}
      </div>
    </div>
  )
}

export default function AptitudeLoader({ variant = 'quantitative', accentColor, height = 200, label = '', fullPage = false }) {
  if (!LOADERS_ON) return null
  const v = VARIANTS[variant] || VARIANTS.quantitative
  const color = accentColor || v.color

  return (
    <div className="apl-root" style={fullPage ? { position: 'fixed', inset: 0, zIndex: 9998 } : { height }}>
      <div className="apl-field" aria-hidden="true">
        {v.tokens.map((t, i) => (
          <span
            key={i}
            className="apl-token"
            style={{
              color,
              left: `${6 + (i * 8.1) % 90}%`,
              fontSize: `${0.8 + (i % 4) * 0.35}rem`,
              animationDelay: `${(i * 0.53) % 4}s`,
              animationDuration: `${4.5 + (i % 5) * 0.7}s`,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="apl-center">
        <CenterVisual variant={variant} color={color} />
        {label && <div className="apl-label" style={{ color }}>{label}</div>}
      </div>
    </div>
  )
}
