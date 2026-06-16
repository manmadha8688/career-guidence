// Full-page cinematic loader for Skill Arena — "ARISE" gate effect
// Section variant available as HunterSectionLoader

const PARTICLES = [
  { left:'3%',  w:2, h:40, delay:'0s',    dur:'2.4s' },
  { left:'8%',  w:3, h:70, delay:'0.3s',  dur:'1.9s' },
  { left:'13%', w:2, h:30, delay:'0.8s',  dur:'2.6s' },
  { left:'19%', w:4, h:90, delay:'0.1s',  dur:'2.0s' },
  { left:'25%', w:2, h:50, delay:'0.6s',  dur:'2.2s' },
  { left:'31%', w:3, h:65, delay:'1.0s',  dur:'1.8s' },
  { left:'37%', w:2, h:35, delay:'0.4s',  dur:'2.5s' },
  { left:'43%', w:5, h:100,delay:'0.2s',  dur:'2.1s' },
  { left:'49%', w:2, h:45, delay:'0.7s',  dur:'2.3s' },
  { left:'55%', w:3, h:75, delay:'0.9s',  dur:'1.7s' },
  { left:'61%', w:2, h:55, delay:'0.5s',  dur:'2.4s' },
  { left:'67%', w:4, h:85, delay:'0.1s',  dur:'2.0s' },
  { left:'73%', w:2, h:40, delay:'0.8s',  dur:'2.2s' },
  { left:'79%', w:3, h:60, delay:'0.3s',  dur:'2.6s' },
  { left:'85%', w:2, h:30, delay:'0.6s',  dur:'1.9s' },
  { left:'91%', w:4, h:80, delay:'0.4s',  dur:'2.1s' },
  { left:'97%', w:2, h:50, delay:'1.1s',  dur:'2.3s' },
]

export default function HunterLoader({ subtitle = '' }) {
  return (
    <div className="hl-root">
      {/* Rising shadow particles */}
      <div className="hl-particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <div key={i} className="hl-particle" style={{
            left: p.left, width: p.w, height: p.h,
            animationDelay: p.delay, animationDuration: p.dur,
          }} />
        ))}
      </div>

      {/* Background radial glow */}
      <div className="hl-glow" aria-hidden="true" />

      {/* Horizontal energy lines */}
      <div className="hl-lines" aria-hidden="true">
        <div className="hl-line hl-line-1" />
        <div className="hl-line hl-line-2" />
      </div>

      {/* Center content */}
      <div className="hl-center">
        {/* Icon mark */}
        <div className="hl-badge">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <polygon points="28,4 34,22 52,22 38,33 43,51 28,40 13,51 18,33 4,22 22,22"
              fill="none" stroke="rgba(155,110,212,0.8)" strokeWidth="1.5"
              className="hl-badge-star" />
            <circle cx="28" cy="28" r="5" fill="rgba(155,110,212,0.9)" className="hl-badge-dot" />
          </svg>
        </div>

        {/* ARISE */}
        <div className="hl-arise">ARISE</div>

        {/* Subtitle / page name */}
        {subtitle && <div className="hl-sub">{subtitle}</div>}

        {/* Progress dots */}
        <div className="hl-dots">
          <span /><span /><span />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="hl-corner hl-corner-tl" aria-hidden="true" />
      <div className="hl-corner hl-corner-tr" aria-hidden="true" />
      <div className="hl-corner hl-corner-bl" aria-hidden="true" />
      <div className="hl-corner hl-corner-br" aria-hidden="true" />
    </div>
  )
}

// Compact section loader for panels
export function HunterSectionLoader({ height = 200 }) {
  return (
    <div className="hl-section" style={{ height }}>
      <div className="hl-scan-line" />
      <div className="hl-section-text">
        <span className="hl-section-dot" />
        <span className="hl-section-dot" style={{ animationDelay: '0.2s' }} />
        <span className="hl-section-dot" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  )
}
