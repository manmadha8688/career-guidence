// Full-page terminal boot loader for Problem Solving pages

const BOOT_LINES = [
  { text: '> SYSTEM BOOT........................', fill: 100, delay: 0 },
  { text: '> LOADING PROBLEM DATABASE..........', fill: 100, delay: 0.6 },
  { text: '> COMPILING EXAMPLES................', fill: 100, delay: 1.2 },
  { text: '> INITIALIZING CODE ENGINE..........', fill: 100, delay: 1.8 },
  { text: '> READY', fill: null, delay: 2.4 },
]

export default function TerminalLoader({ accentColor = '#f97316', label = 'LOADING...' }) {
  return (
    <div className="tl-root" style={{ '--tl-accent': accentColor }}>
      {/* CRT scanline overlay */}
      <div className="tl-scanlines" aria-hidden="true" />

      {/* Terminal window */}
      <div className="tl-window">
        {/* Title bar */}
        <div className="tl-titlebar">
          <div className="tl-dot tl-dot-red" />
          <div className="tl-dot tl-dot-yellow" />
          <div className="tl-dot tl-dot-green" />
          <span className="tl-title">terminal — {label.toLowerCase()}</span>
        </div>

        {/* Terminal body */}
        <div className="tl-body">
          {BOOT_LINES.map((line, i) => (
            <div key={i} className="tl-line" style={{ animationDelay: `${line.delay}s` }}>
              <span className="tl-line-text">{line.text}</span>
              {line.fill !== null && (
                <span className="tl-bar">
                  <span className="tl-bar-fill" style={{ animationDelay: `${line.delay + 0.1}s` }} />
                </span>
              )}
              {line.fill !== null && (
                <span className="tl-pct" style={{ animationDelay: `${line.delay + 0.4}s` }}>100%</span>
              )}
              {line.fill === null && (
                <span className="tl-cursor">█</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom label */}
      <div className="tl-footer">{label}</div>
    </div>
  )
}
