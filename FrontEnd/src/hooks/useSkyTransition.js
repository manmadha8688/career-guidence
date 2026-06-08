import { useRef, useCallback, useEffect } from 'react'

const SKY_STAGES = [
  { t: 0.00, top: [2,   6,  23], bot: [15,  23,  42] },
  { t: 0.24, top: [14,  8,  50], bot: [55,  18,  78] },
  { t: 0.44, top: [34, 10,  84], bot: [208, 68,  14] },
  { t: 0.58, top: [7,  68, 152], bot: [244, 126, 32] },
  { t: 0.78, top: [9, 112, 202], bot: [172, 212, 252] },
  { t: 1.00, top: [6, 132, 222], bot: [198, 232, 255] },
]

function lerp(a, b, f) {
  return a.map((v, i) => Math.round(v + (b[i] - v) * f))
}

function rgb(c) {
  return `rgb(${c[0]},${c[1]},${c[2]})`
}

function skyColors(animT) {
  for (let i = 0; i < SKY_STAGES.length - 1; i++) {
    const s0 = SKY_STAGES[i]
    const s1 = SKY_STAGES[i + 1]
    if (animT >= s0.t && animT <= s1.t) {
      const f = (animT - s0.t) / (s1.t - s0.t)
      return { top: lerp(s0.top, s1.top, f), bot: lerp(s0.bot, s1.bot, f) }
    }
  }
  const last = SKY_STAGES[SKY_STAGES.length - 1]
  return { top: last.top, bot: last.bot }
}

function makeStars(W, H) {
  return Array.from({ length: 150 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H * 0.7,
    r: Math.random() * 1.5 + 0.3,
    phase: Math.random() * Math.PI * 2,
  }))
}

export function useSkyTransition(canvasRef, isDay) {
  const isDayRef = useRef(isDay)
  isDayRef.current = isDay

  const rafRef = useRef(null)

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }, [])

  const triggerTransition = useCallback((onThemeSwitch) => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    const goingToDay = !isDayRef.current
    let switched = false

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.display = 'block'
    canvas.style.opacity = '1'

    const W = canvas.width
    const H = canvas.height
    const stars = makeStars(W, H)
    const DURATION = 1800
    const start = performance.now()

    function frame(now) {
      const t = Math.min((now - start) / DURATION, 1)
      const el = canvasRef.current
      if (!el) return

      // Opacity envelope: fade in 0–9%, full 9–86%, fade out 86–100%
      let op
      if (t < 0.09)      op = t / 0.09
      else if (t < 0.86) op = 1
      else               op = 1 - (t - 0.86) / 0.14
      el.style.opacity = String(Math.max(0, Math.min(1, op)))

      // Theme switch at exactly 50%
      if (!switched && t >= 0.5) {
        switched = true
        if (onThemeSwitch) onThemeSwitch()
      }

      const ctx = el.getContext('2d')
      ctx.clearRect(0, 0, W, H)

      // animT: 0 = night sky colours, 1 = day sky colours
      const animT = goingToDay ? t : 1 - t

      // ── Sky gradient ──────────────────────────────────────────────
      const { top, bot } = skyColors(animT)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, H)
      skyGrad.addColorStop(0, rgb(top))
      skyGrad.addColorStop(1, rgb(bot))
      ctx.fillStyle = skyGrad
      ctx.fillRect(0, 0, W, H)

      // ── Twilight horizon glow (t = 0.24 → 0.78) ──────────────────
      if (t >= 0.24 && t <= 0.78) {
        const gf = (t - 0.24) / (0.78 - 0.24)
        const intensity = Math.sin(gf * Math.PI)
        const glowGrad = ctx.createLinearGradient(0, H * 0.50, 0, H * 0.70)
        glowGrad.addColorStop(0, `rgba(255,135,25,${(0.48 * intensity).toFixed(3)})`)
        glowGrad.addColorStop(1, 'rgba(255,80,0,0)')
        ctx.fillStyle = glowGrad
        ctx.fillRect(0, H * 0.50, W, H * 0.20)
      }

      // ── Stars ─────────────────────────────────────────────────────
      const starAlpha = goingToDay
        ? (t < 0.36 ? Math.max(0, 1 - t / 0.36) : 0)
        : (t > 0.56 ? Math.min(1, (t - 0.56) / 0.44) : 0)

      if (starAlpha > 0) {
        stars.forEach(s => {
          const twinkle = 0.5 + 0.5 * Math.sin(now * 0.0017 + s.phase)
          ctx.save()
          ctx.globalAlpha = starAlpha * twinkle
          ctx.fillStyle = '#fff'
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
          ctx.fill()
          if (s.r > 1.0) {
            // 4-point cross sparkle for bright stars
            const len = s.r * 3
            ctx.strokeStyle = '#fff'
            ctx.lineWidth = s.r * 0.35
            ctx.beginPath()
            ctx.moveTo(s.x - len, s.y)
            ctx.lineTo(s.x + len, s.y)
            ctx.moveTo(s.x, s.y - len)
            ctx.lineTo(s.x, s.y + len)
            ctx.stroke()
          }
          ctx.restore()
        })
      }

      // ── Sun & Moon — shared arc, crossfade at midpoint ───────────
      // Both travel the same arc so only one body is ever moving across
      // the sky. The crossfade (t 0.35→0.50) swaps moon→sun or sun→moon
      // in-place; the user sees a seamless morph rather than two objects.
      const cx = W * 0.06 + animT * W * 0.88
      const cy = H * 0.84 - Math.sin(animT * Math.PI) * H * 0.64

      // crossFade: 0 = first body fully visible, 1 = second body fully visible
      const crossFade = t <= 0.35 ? 0 : t >= 0.50 ? 1 : (t - 0.35) / 0.15

      // night→day: moon first, sun second  |  day→night: sun first, moon second
      const moonAlpha = goingToDay ? 1 - crossFade : crossFade
      const sunAlpha  = goingToDay ? crossFade      : 1 - crossFade

      // Draw moon at shared position
      if (moonAlpha > 0) {
        ctx.save()
        ctx.globalAlpha = moonAlpha

        const moonGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 72)
        moonGlow.addColorStop(0, 'rgba(180,200,255,0.40)')
        moonGlow.addColorStop(1, 'rgba(100,140,220,0)')
        ctx.fillStyle = moonGlow
        ctx.beginPath()
        ctx.arc(cx, cy, 72, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = 'rgb(220,230,255)'
        ctx.beginPath()
        ctx.arc(cx, cy, 27, 0, Math.PI * 2)
        ctx.fill()

        // Crescent shadow offset
        ctx.fillStyle = 'rgb(10,15,45)'
        ctx.beginPath()
        ctx.arc(cx + 10, cy - 2, 23, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      }

      // Draw sun at same position
      if (sunAlpha > 0) {
        ctx.save()
        ctx.globalAlpha = sunAlpha

        const sunGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 110)
        sunGlow.addColorStop(0,   'rgba(255,210,80,0.55)')
        sunGlow.addColorStop(0.4, 'rgba(255,160,40,0.28)')
        sunGlow.addColorStop(1,   'rgba(255,100,0,0)')
        ctx.fillStyle = sunGlow
        ctx.beginPath()
        ctx.arc(cx, cy, 110, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = 'rgb(255,198,58)'
        ctx.beginPath()
        ctx.arc(cx, cy, 38, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = 'rgb(255,245,200)'
        ctx.beginPath()
        ctx.arc(cx, cy, 19, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(frame)
      } else {
        el.style.display = 'none'
        el.style.opacity = '1'
        rafRef.current = null
      }
    }

    rafRef.current = requestAnimationFrame(frame)
  }, [canvasRef])

  return triggerTransition
}
