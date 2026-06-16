// Section loader for Problem Solving panels
import { useEffect, useRef } from 'react'
import { LOADERS_ON } from './_config'

const CHARS = '01アイウエオカキクケコ<>{}[]()/#$%&ABCDEF0123456789'

function getChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

// Each column: array of characters falling at different speeds
const COLUMNS = Array.from({ length: 12 }, (_, i) => ({
  delay: `${(i * 0.18).toFixed(2)}s`,
  dur:   `${(0.8 + (i % 4) * 0.25).toFixed(2)}s`,
  chars: Array.from({ length: 8 }, getChar),
  opacity: 0.3 + (i % 5) * 0.14,
}))

export default function MatrixRainLoader({ accentColor = '#f97316', height = 200, label = '', fullPage = false }) {
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)

  useEffect(() => {
    if (!LOADERS_ON) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    canvas.width  = W
    canvas.height = H

    const COL_W   = Math.floor(W / 14)
    const cols    = Math.floor(W / COL_W)
    const drops   = Array.from({ length: cols }, (_, i) => -(i * 3))
    const speeds  = Array.from({ length: cols }, () => 0.5 + Math.random() * 1.2)

    const draw = () => {
      // Fade trail
      ctx.fillStyle = 'rgba(8,11,20,0.18)'
      ctx.fillRect(0, 0, W, H)

      for (let i = 0; i < cols; i++) {
        // Head char — bright accent
        ctx.font = `${COL_W - 2}px "Share Tech Mono", monospace`
        ctx.fillStyle = accentColor
        ctx.globalAlpha = 0.95
        ctx.fillText(
          CHARS[Math.floor(Math.random() * CHARS.length)],
          i * COL_W + 2,
          drops[i] * COL_W
        )

        // Trail chars — dimmer
        ctx.fillStyle = accentColor
        for (let t = 1; t < 6; t++) {
          ctx.globalAlpha = Math.max(0, 0.7 - t * 0.13)
          ctx.fillText(
            CHARS[Math.floor(Math.random() * CHARS.length)],
            i * COL_W + 2,
            (drops[i] - t) * COL_W
          )
        }

        ctx.globalAlpha = 1

        drops[i] += speeds[i]
        if (drops[i] * COL_W > H + COL_W * 5) {
          drops[i] = -(Math.random() * 20)
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(rafRef.current)
  }, [accentColor])

  if (!LOADERS_ON) return null

  return (
    <div className="mrl-root" style={fullPage ? { position: 'fixed', inset: 0, zIndex: 9998 } : { height }}>
      <canvas ref={canvasRef} className="mrl-canvas" />

      {/* Center overlay */}
      <div className="mrl-center">
        <div className="mrl-icon" style={{ borderColor: accentColor, boxShadow: `0 0 16px ${accentColor}55` }}>
          <span style={{ color: accentColor, fontSize: '1.1rem', fontFamily: 'Share Tech Mono, monospace' }}>{'</>'}</span>
        </div>
        {label && <div className="mrl-label" style={{ color: accentColor }}>{label}</div>}
      </div>
    </div>
  )
}
