import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

// Live "next attempt in …" countdown. Ticks every second and calls onDone() once
// the target time passes so the caller can re-enable the retry button.
function format(ms) {
  if (ms <= 0) return 'now'
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

export default function CooldownTimer({ until, onDone, prefix = 'Next attempt in', className = '' }) {
  const target = until ? new Date(until).getTime() : 0
  const [remaining, setRemaining] = useState(() => target - Date.now())

  useEffect(() => {
    if (!target) return
    setRemaining(target - Date.now())
    const t = setInterval(() => {
      const rem = target - Date.now()
      setRemaining(rem)
      if (rem <= 0) {
        clearInterval(t)
        onDone?.()
      }
    }, 1000)
    return () => clearInterval(t)
    // eslint-disable-next-line
  }, [target])

  if (!target || remaining <= 0) return null

  return (
    <span className={`cooldown-timer ${className}`}>
      <Clock size={12} /> {prefix} <strong>{format(remaining)}</strong>
    </span>
  )
}
