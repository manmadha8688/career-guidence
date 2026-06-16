// Loader #6 — Shuriken Standby (Mission)
import { LOADERS_ON } from './_config'

export default function SmokeBladeLoader({ inline = false }) {
  if (!LOADERS_ON) return null
  return (
    <div className={`sbl-root${inline ? ' sbl-root-inline' : ''}`}>
      <div className="sbl-bg" />

      {/* Outer glow ring */}
      <div className="sbl-glow-ring" />

      {/* Spinning shuriken */}
      <div className="sbl-standby-wrap">
        {/* Orbit ring */}
        <div className="sbl-orbit" />

        {/* Shuriken */}
        <div className="sbl-spin">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
            <path d="M40 5 L47 31 L73 40 L47 49 L40 75 L33 49 L7 40 L33 31 Z"
              fill="#FF7F2A" opacity="0.95" />
            <circle cx="40" cy="40" r="8" fill="#FF7F2A" />
            <circle cx="40" cy="40" r="4" fill="#fff" opacity="0.55" />
            <path d="M40 5 L44 28 L40 37 Z" fill="rgba(255,255,255,0.25)" />
            <path d="M73 40 L50 44 L41 40 Z" fill="rgba(255,255,255,0.18)" />
          </svg>
        </div>

        {/* 4 orbiting sparks */}
        {[0, 90, 180, 270].map((deg, i) => (
          <div key={i} className="sbl-spark"
            style={{ '--spark-delay': `${i * 0.25}s`, '--spark-deg': `${deg}deg` }} />
        ))}
      </div>

      {/* Bottom text */}
      <div className="sbl-standby-text">
        <div className="sbl-tag">◈ MISSION INCOMING ◈</div>
        <div className="sbl-title">STAND BY</div>
        <div className="sbl-pulse-dots">
          <span style={{ animationDelay: '0s' }} />
          <span style={{ animationDelay: '0.2s' }} />
          <span style={{ animationDelay: '0.4s' }} />
        </div>
      </div>

      {/* Corner marks */}
      <div className="sbl-corner sbl-c-tl" />
      <div className="sbl-corner sbl-c-tr" />
      <div className="sbl-corner sbl-c-bl" />
      <div className="sbl-corner sbl-c-br" />
    </div>
  )
}
