// Admin Panel Loader — Radar scan
import { LOADERS_ON } from './_config'

// Fixed blip positions that appear at specific sweep angles
const BLIPS = [
  { cx: 120, cy: 80,  angle: 20,  r: 3.5, label: 'USR' },
  { cx: 145, cy: 110, angle: 45,  r: 2.5, label: 'MIS' },
  { cx: 130, cy: 140, angle: 120, r: 3,   label: 'PRB' },
  { cx: 80,  cy: 145, angle: 200, r: 4,   label: 'REP' },
  { cx: 60,  cy: 110, angle: 230, r: 2.5, label: 'SUB' },
  { cx: 70,  cy: 70,  angle: 310, r: 3,   label: 'CON' },
  { cx: 105, cy: 55,  angle: 350, r: 2,   label: 'RDM' },
]

export default function RadarLoader({ height = 220 }) {
  if (!LOADERS_ON) return null
  return (
    <div className="rdl-root" style={{ height }}>
      <svg className="rdl-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">

        {/* Background circles */}
        {[70, 50, 30, 10].map(r => (
          <circle key={r} cx="100" cy="100" r={r}
            fill="none" stroke="rgba(96,165,250,0.12)" strokeWidth="0.8" />
        ))}

        {/* Cross hairs */}
        <line x1="100" y1="25" x2="100" y2="175"
          stroke="rgba(96,165,250,0.1)" strokeWidth="0.6" />
        <line x1="25" y1="100" x2="175" y2="100"
          stroke="rgba(96,165,250,0.1)" strokeWidth="0.6" />
        <line x1="50" y1="50" x2="150" y2="150"
          stroke="rgba(96,165,250,0.06)" strokeWidth="0.6" />
        <line x1="150" y1="50" x2="50" y2="150"
          stroke="rgba(96,165,250,0.06)" strokeWidth="0.6" />

        {/* Outer ring */}
        <circle cx="100" cy="100" r="75"
          fill="none" stroke="rgba(96,165,250,0.3)" strokeWidth="1.5" />

        {/* Sweep — rotating gradient wedge */}
        <defs>
          <radialGradient id="sweepGrad" cx="0%" cy="50%" r="100%">
            <stop offset="0%" stopColor="rgba(96,165,250,0.7)" />
            <stop offset="100%" stopColor="rgba(96,165,250,0)" />
          </radialGradient>
          <mask id="sweepMask">
            <path d="M100,100 L175,100 A75,75 0 0,0 100,25 Z" fill="white" />
          </mask>
          <clipPath id="radarClip">
            <circle cx="100" cy="100" r="75" />
          </clipPath>
        </defs>

        {/* Sweep trail (fading arc behind sweep line) */}
        <g clipPath="url(#radarClip)" className="rdl-sweep-group">
          {/* 3 trail arcs */}
          <path d="M100,100 L175,100 A75,75 0 0,0 100,25 Z"
            fill="rgba(96,165,250,0.08)" className="rdl-trail-3" />
          <path d="M100,100 L175,100 A75,75 0 0,0 153,47 Z"
            fill="rgba(96,165,250,0.12)" className="rdl-trail-2" />
          <path d="M100,100 L175,100 A75,75 0 0,0 167,68 Z"
            fill="rgba(96,165,250,0.2)" className="rdl-trail-1" />
          {/* Bright sweep line */}
          <line x1="100" y1="100" x2="175" y2="100"
            stroke="#60A5FA" strokeWidth="1.5" opacity="0.9"
            style={{ filter: 'drop-shadow(0 0 3px #60A5FA)' }}
            className="rdl-sweep-line" />
        </g>

        {/* Data blips — appear after sweep passes their angle */}
        {BLIPS.map((b, i) => (
          <g key={i} className="rdl-blip"
            style={{ animationDelay: `${(b.angle / 360) * 3}s` }}>
            {/* Ping ring */}
            <circle cx={b.cx} cy={b.cy} r={b.r + 6}
              fill="none" stroke="#60A5FA" strokeWidth="0.8" opacity="0"
              className="rdl-ping" style={{ animationDelay: `${(b.angle / 360) * 3}s` }} />
            {/* Blip dot */}
            <circle cx={b.cx} cy={b.cy} r={b.r}
              fill="#60A5FA"
              style={{ filter: 'drop-shadow(0 0 4px #60A5FA88)' }} />
            {/* Label */}
            <text x={b.cx + b.r + 3} y={b.cy + 3}
              fill="rgba(96,165,250,0.8)" fontSize="5"
              fontFamily="Share Tech Mono, monospace">{b.label}</text>
          </g>
        ))}

        {/* Center dot */}
        <circle cx="100" cy="100" r="4"
          fill="#60A5FA" style={{ filter: 'drop-shadow(0 0 6px #60A5FA)' }} />
        <circle cx="100" cy="100" r="2" fill="#fff" opacity="0.8" />

        {/* Tick marks around outer ring */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2
          const isMajor = i % 6 === 0
          return (
            <line key={i}
              x1={100 + 72 * Math.cos(a)} y1={100 + 72 * Math.sin(a)}
              x2={100 + 76 * Math.cos(a)} y2={100 + 76 * Math.sin(a)}
              stroke={isMajor ? 'rgba(96,165,250,0.5)' : 'rgba(96,165,250,0.2)'}
              strokeWidth={isMajor ? 1.2 : 0.6} />
          )
        })}

        {/* Corner UI elements */}
        <text x="18" y="20" fill="rgba(96,165,250,0.5)" fontSize="5"
          fontFamily="Share Tech Mono, monospace">RANGE: MAX</text>
        <text x="145" y="185" fill="rgba(96,165,250,0.5)" fontSize="5"
          fontFamily="Share Tech Mono, monospace">SCAN: ACTIVE</text>
      </svg>

      {/* Bottom counter */}
      <div className="rdl-status">
        <span className="rdl-dot" />
        <span className="rdl-text">SCANNING DATABASE</span>
        <span className="rdl-count rdl-blink">{BLIPS.length} TARGETS</span>
      </div>
    </div>
  )
}
