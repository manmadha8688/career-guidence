// Mission Briefing loader — classified document reveal style

const REDACTED_LINES = [
  { label: 'MISSION ID', value: '███ - ████ - ██' },
  { label: 'PRIORITY',   value: '████████' },
  { label: 'OBJECTIVE',  value: '████████████████████' },
  { label: 'STATUS',     value: 'LOADING...' },
]

export default function MissionLoader({ inline = false }) {
  return (
    <div className={`ml-root${inline ? ' ml-root-inline' : ''}`}>
      {/* Background noise */}
      <div className="ml-noise" aria-hidden="true" />

      {/* Shuriken */}
      <div className="ml-shuriken" aria-hidden="true">
        <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 5 L35 25 L55 30 L35 35 L30 55 L25 35 L5 30 L25 25 Z"
            fill="#FF7F2A" opacity="0.9"/>
          <circle cx="30" cy="30" r="6" fill="#FF7F2A"/>
          <circle cx="30" cy="30" r="3" fill="#fff" opacity="0.6"/>
        </svg>
      </div>

      {/* Briefing document */}
      <div className="ml-brief">
        {/* Header */}
        <div className="ml-brief-header">
          <span className="ml-classified">◈ CLASSIFIED ◈</span>
          <span className="ml-brief-title">MISSION BRIEFING</span>
        </div>

        {/* Divider */}
        <div className="ml-divider" />

        {/* Data rows */}
        <div className="ml-rows">
          {REDACTED_LINES.map((row, i) => (
            <div key={i} className="ml-row" style={{ animationDelay: `${i * 0.2}s` }}>
              <span className="ml-row-label">{row.label}</span>
              <span className={`ml-row-value${row.value === 'LOADING...' ? ' ml-row-loading' : ''}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="ml-divider" />

        {/* Footer */}
        <div className="ml-brief-footer">
          <span className="ml-stamp">STAND BY</span>
        </div>
      </div>
    </div>
  )
}
