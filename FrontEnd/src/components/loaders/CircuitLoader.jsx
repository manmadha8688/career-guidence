// Problem Solving Panel Loader — PCB circuit traces lighting up from a chip
// Traces branch out like electricity through a circuit board

export default function CircuitLoader({ accentColor = '#f97316', height = 220 }) {
  // Define trace paths — grid-snapped lines branching from center chip
  const traces = [
    // Top
    { d: 'M100,85 L100,60 L130,60 L130,40', delay: '0s', dur: '0.6s' },
    { d: 'M100,85 L100,60 L70,60 L70,40', delay: '0.2s', dur: '0.5s' },
    { d: 'M100,85 L100,50 L155,50 L155,35 L170,35', delay: '0.4s', dur: '0.7s' },
    { d: 'M100,85 L100,50 L45,50 L45,35 L30,35', delay: '0.35s', dur: '0.7s' },
    // Right
    { d: 'M115,100 L145,100 L145,75 L165,75', delay: '0.15s', dur: '0.55s' },
    { d: 'M115,100 L150,100 L150,125 L175,125', delay: '0.5s', dur: '0.6s' },
    { d: 'M115,105 L160,105 L160,155 L175,155', delay: '0.7s', dur: '0.65s' },
    // Left
    { d: 'M85,100 L55,100 L55,75 L35,75', delay: '0.25s', dur: '0.55s' },
    { d: 'M85,100 L50,100 L50,130 L25,130', delay: '0.55s', dur: '0.6s' },
    { d: 'M85,105 L40,105 L40,155 L25,155', delay: '0.65s', dur: '0.65s' },
    // Bottom
    { d: 'M100,115 L100,140 L125,140 L125,165', delay: '0.3s', dur: '0.6s' },
    { d: 'M100,115 L100,140 L75,140 L75,165', delay: '0.45s', dur: '0.55s' },
    { d: 'M100,115 L100,150 L145,150 L145,170', delay: '0.6s', dur: '0.7s' },
    { d: 'M100,115 L100,150 L55,150 L55,170', delay: '0.5s', dur: '0.7s' },
  ]

  // Endpoint nodes (small squares/circles at trace ends)
  const nodes = [
    { x: 130, y: 40 }, { x: 70, y: 40 }, { x: 170, y: 35 }, { x: 30, y: 35 },
    { x: 165, y: 75 }, { x: 175, y: 125 }, { x: 175, y: 155 },
    { x: 35,  y: 75 }, { x: 25, y: 130 }, { x: 25, y: 155 },
    { x: 125, y: 165 }, { x: 75, y: 165 }, { x: 145, y: 170 }, { x: 55, y: 170 },
  ]

  const totalLen = (d) => 300 // approximation for stroke-dasharray

  return (
    <div className="crl-root" style={{ height }}>
      {/* Grid background dots */}
      <div className="crl-grid" />

      <svg className="crl-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"
        style={{ '--crl-accent': accentColor }}>

        {/* Base faint grid lines */}
        {[30,60,90,120,150,170].map(v => (
          <line key={`h${v}`} x1="15" y1={v} x2="185" y2={v}
            stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        ))}
        {[30,60,90,120,150,170].map(v => (
          <line key={`v${v}`} x1={v} y1="15" x2={v} y2="185"
            stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        ))}

        {/* Traces — dark base */}
        {traces.map((t, i) => (
          <path key={`base-${i}`} d={t.d}
            fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5"
            strokeLinecap="square" />
        ))}

        {/* Traces — lit up with animation */}
        {traces.map((t, i) => (
          <path key={`lit-${i}`} d={t.d}
            fill="none"
            stroke={accentColor}
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeOpacity="0.85"
            strokeDasharray="300"
            strokeDashoffset="300"
            className="crl-trace"
            style={{
              animationDelay: t.delay,
              animationDuration: t.dur,
              filter: `drop-shadow(0 0 3px ${accentColor})`,
            }} />
        ))}

        {/* Traveling glow dot on each trace */}
        {traces.slice(0, 6).map((t, i) => (
          <circle key={`dot-${i}`} r="3" fill={accentColor} opacity="0.9"
            style={{ filter: `drop-shadow(0 0 5px ${accentColor})` }}
            className="crl-traveler"
            style={{
              animationDelay: t.delay,
              filter: `drop-shadow(0 0 5px ${accentColor})`,
            }}>
            <animateMotion dur={t.dur} begin={t.delay} fill="freeze"
              path={t.d} />
          </circle>
        ))}

        {/* Endpoint nodes */}
        {nodes.map((n, i) => (
          <rect key={i} x={n.x - 3} y={n.y - 3} width="6" height="6" rx="1"
            fill={accentColor} opacity="0"
            className="crl-node"
            style={{ animationDelay: `${0.5 + i * 0.06}s` }} />
        ))}

        {/* Center chip */}
        <rect x="82" y="82" width="36" height="36" rx="3"
          fill="#0e1220" stroke={accentColor} strokeWidth="1.5"
          style={{ filter: `drop-shadow(0 0 6px ${accentColor})` }} />
        {/* Chip pins - top/bottom */}
        {[-1,0,1].map(o => (
          <g key={o}>
            <line x1={100 + o*10} y1="82" x2={100 + o*10} y2="78"
              stroke={accentColor} strokeWidth="1.5" opacity="0.7" />
            <line x1={100 + o*10} y1="118" x2={100 + o*10} y2="122"
              stroke={accentColor} strokeWidth="1.5" opacity="0.7" />
            <line x1="82" y1={100 + o*10} x2="78" y2={100 + o*10}
              stroke={accentColor} strokeWidth="1.5" opacity="0.7" />
            <line x1="118" y1={100 + o*10} x2="122" y2={100 + o*10}
              stroke={accentColor} strokeWidth="1.5" opacity="0.7" />
          </g>
        ))}
        {/* Chip label */}
        <text x="100" y="97" textAnchor="middle" fill={accentColor}
          fontSize="6" fontFamily="Share Tech Mono, monospace" opacity="0.9">CPU</text>
        <text x="100" y="107" textAnchor="middle" fill={accentColor}
          fontSize="5" fontFamily="Share Tech Mono, monospace" opacity="0.6">CORE</text>

        {/* Pulsing center glow */}
        <circle cx="100" cy="100" r="18" fill="none"
          stroke={accentColor} strokeWidth="0.5" opacity="0.3"
          className="crl-pulse" />

      </svg>

      {/* Bottom status */}
      <div className="crl-status" style={{ color: accentColor }}>
        <span className="crl-cursor" style={{ background: accentColor }} />
        <span className="crl-status-text">COMPILING CIRCUIT</span>
      </div>
    </div>
  )
}
