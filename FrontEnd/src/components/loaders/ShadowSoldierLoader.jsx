// Section loader for Skill Arena panels
// Three shadow soldier silhouettes rising from the ground with purple energy

import { useEffect, useRef } from 'react'

// SVG soldier silhouette path (simple humanoid)
const SOLDIER = `M12 2 C12 2 14 3 14 5 C14 7 12 8 12 8 C12 8 10 7 10 5 C10 3 12 2 12 2Z
  M9 9 L7 18 L10 18 L11 14 L12 14 L13 14 L14 18 L17 18 L15 9
  C15 9 13.5 10.5 12 10.5 C10.5 10.5 9 9 9 9Z
  M7 18 L5 24 L8 24 L10 18Z
  M17 18 L15 18 L16 24 L19 24Z
  M7 9 L4 14 L7 15 L9 11Z
  M17 9 L15 11 L17 15 L20 14Z`

const SOLDIERS = [
  { delay: '0s',    dur: '2.2s', x: '22%', scale: 0.85, opacity: 0.5 },
  { delay: '0.4s',  dur: '2.0s', x: '50%', scale: 1.1,  opacity: 0.85 },
  { delay: '0.8s',  dur: '2.4s', x: '78%', scale: 0.9,  opacity: 0.6 },
]

export default function ShadowSoldierLoader({ height = 200, label = '' }) {
  return (
    <div className="ssl-root" style={{ height }}>
      {/* Ground glow line */}
      <div className="ssl-ground" />

      {/* Energy mist rising */}
      <div className="ssl-mist ssl-mist-1" />
      <div className="ssl-mist ssl-mist-2" />
      <div className="ssl-mist ssl-mist-3" />

      {/* Soldiers */}
      {SOLDIERS.map((s, i) => (
        <div key={i} className="ssl-soldier-wrap" style={{
          left: s.x,
          transform: `translateX(-50%) scale(${s.scale})`,
          animationDelay: s.delay,
          animationDuration: s.dur,
          opacity: 0,
        }}>
          {/* Shadow glow beneath soldier */}
          <div className="ssl-shadow" style={{ opacity: s.opacity }} />

          {/* Soldier SVG */}
          <svg className="ssl-svg" viewBox="0 0 24 24" width="36" height="36"
            style={{ filter: `drop-shadow(0 0 8px rgba(155,110,212,${s.opacity}))` }}>
            <path d={SOLDIER} fill={`rgba(155,110,212,${s.opacity + 0.15})`} />
          </svg>

          {/* Energy aura ring */}
          <div className="ssl-ring" style={{
            borderColor: `rgba(155,110,212,${s.opacity * 0.6})`,
            animationDelay: s.delay,
          }} />
        </div>
      ))}

      {/* Rune circle drawing itself */}
      <div className="ssl-rune">
        <svg viewBox="0 0 80 80" width="80" height="80">
          <circle cx="40" cy="40" r="36"
            fill="none" stroke="rgba(155,110,212,0.15)" strokeWidth="1" />
          <circle cx="40" cy="40" r="36"
            fill="none" stroke="rgba(155,110,212,0.5)" strokeWidth="1.5"
            strokeDasharray="226" strokeLinecap="round"
            className="ssl-rune-arc" />
          {/* Inner triangle */}
          <polygon points="40,12 63,52 17,52"
            fill="none" stroke="rgba(155,110,212,0.2)" strokeWidth="0.8"
            className="ssl-rune-tri" />
        </svg>
      </div>

      {/* Label */}
      {label && <div className="ssl-label">{label}</div>}
    </div>
  )
}
