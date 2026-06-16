// Loader #4 — System Awakening
import { LOADERS_ON } from './_config'

const CHOSEN_TEXT = 'YOU HAVE BEEN CHOSEN'

export default function SystemAwakeningLoader({ subtitle = '' }) {
  if (!LOADERS_ON) return null
  return (
    <div className="saw-root">
      {/* Static noise overlay */}
      <div className="saw-noise" aria-hidden="true" />

      {/* Center content */}
      <div className="saw-center">
        {/* Eye / system symbol */}
        <div className="saw-eye">
          <svg viewBox="0 0 80 40" width="120" height="60">
            {/* Eye outline */}
            <path d="M4,20 Q40,-10 76,20 Q40,50 4,20 Z"
              fill="none" stroke="rgba(155,110,212,0.6)" strokeWidth="1"
              className="saw-eye-path" />
            {/* Iris */}
            <circle cx="40" cy="20" r="10"
              fill="none" stroke="rgba(155,110,212,0.8)" strokeWidth="1.5"
              className="saw-iris" />
            {/* Pupil */}
            <circle cx="40" cy="20" r="4"
              fill="rgba(155,110,212,0.9)"
              className="saw-pupil" />
            {/* Glow */}
            <circle cx="40" cy="20" r="10"
              fill="rgba(155,110,212,0.15)"
              className="saw-iris-glow" />
          </svg>
        </div>

        {/* Typing text */}
        <div className="saw-chosen">
          {CHOSEN_TEXT.split('').map((ch, i) => (
            <span key={i} className="saw-char"
              style={{ animationDelay: `${0.2 + i * 0.02}s` }}>
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </div>

        {/* Divider line that draws itself */}
        <div className="saw-divider" />

        {/* ARISE — appears after typing */}
        <div className="saw-arise">ARISE</div>

        {/* Subtitle */}
        {subtitle && <div className="saw-sub">{subtitle}</div>}

        {/* Status bar */}
        <div className="saw-bar-wrap">
          <div className="saw-bar" />
        </div>
      </div>

      {/* Corner glitch lines */}
      <div className="saw-glitch saw-glitch-tl" aria-hidden="true" />
      <div className="saw-glitch saw-glitch-br" aria-hidden="true" />

      {/* Floating hex codes */}
      {['0x4E', '0xA7', '0xFF', '0x12', '0x8B', '0xD4'].map((h, i) => (
        <div key={i} className="saw-hex"
          style={{
            left: `${8 + i * 16}%`,
            animationDelay: `${1 + i * 0.3}s`,
            animationDuration: `${3 + (i % 3) * 0.5}s`,
          }}>{h}</div>
      ))}
    </div>
  )
}
