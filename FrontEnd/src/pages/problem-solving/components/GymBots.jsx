import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// Reuses the login-page bot personalities: Nova (optimist, cyan) + Pixel
// (sarcastic roaster, amber). Self-contained so it never touches auth state.
const BOT = {
  nova:  { name: 'NOVA',  color: '#22D3EE' },
  pixel: { name: 'PIXEL', color: '#FBBF24' },
  echo:  { name: 'ECHO',  color: '#9B6ED4' },
}

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Same read-time feel as the auth bots
const readMs = (text = '') =>
  Math.min(5200, Math.max(2300, 2300 + Math.max(0, String(text).length - 24) * 42))

/* Steps through a line array with readable timing; pauses when active=false. */
function useSequence(lines, active, loop) {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(false)
  const runRef = useRef({ displayIdx: 0, timers: [], linesKey: '', started: false })

  const clearTimers = () => {
    runRef.current.timers.forEach(clearTimeout)
    runRef.current.timers = []
  }

  useEffect(() => {
    clearTimers()
    if (!lines?.length) { setVisible(false); return }

    const linesKey = lines.map(l => l.text).join('\x00')
    if (runRef.current.linesKey !== linesKey) {
      runRef.current.linesKey = linesKey
      runRef.current.displayIdx = 0
      runRef.current.started = false
      setIdx(0)
      setVisible(false)
    }

    if (reduced()) {
      setIdx(lines.length - 1)
      setVisible(true)
      return
    }

    if (!active) return

    setVisible(true)
    const schedule = (fn, ms) => {
      runRef.current.timers.push(setTimeout(fn, ms))
    }

    const showFrom = (startIdx, initialDelay) => {
      const show = (i) => {
        setIdx(i)
        runRef.current.displayIdx = i
        const dur = readMs(lines[i].text)
        const isLast = i >= lines.length - 1
        if (!isLast) {
          schedule(() => show(i + 1), dur + 440)
        } else if (loop) {
          schedule(() => show(0), dur + 1400)
        }
      }
      schedule(() => show(startIdx), initialDelay)
    }

    const delay = runRef.current.started ? 280 : 0
    runRef.current.started = true
    showFrom(runRef.current.displayIdx, delay)

    return clearTimers
  }, [active, loop, lines])

  return { idx, visible }
}

/* A single CSS/SVG robot — glowing eyes, antenna, mouth that moves when talking. */
export function GymBot({ bot, talking, size = 'lg' }) {
  const meta = BOT[bot] || BOT.nova
  return (
    <div
      className={`gb${talking ? ' gb--talk' : ''}`}
      data-bot={bot}
      style={{ '--gb': meta.color }}
      aria-hidden="true"
    >
      <span className="gb__antenna"><span className="gb__antenna-tip" /></span>
      <div className="gb__head">
        <div className="gb__eyes">
          <span className="gb__eye"><span className="gb__pupil" /></span>
          <span className="gb__eye"><span className="gb__pupil" /></span>
        </div>
        <div className="gb__mouth" />
      </div>
    </div>
  )
}

/* Two bots + a manga speech bubble above whoever is talking. */
export function BotStage({ lines, loop = false, active = true, size = 'lg' }) {
  const { idx, visible } = useSequence(lines, active, loop)
  const line = lines?.[idx]
  const speaker = line?.who || 'nova'
  const meta = BOT[speaker] || BOT.nova
  const sideLeft = speaker === 'nova'

  return (
    <div className={`gb-stage gb-stage--${size}`}>
      <div className="gb-stage__bubbles">
        <AnimatePresence mode="wait">
          {visible && line && (
            <motion.div
              key={idx}
              className={`gb-bubble gb-bubble--${sideLeft ? 'left' : 'right'}`}
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 4 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="gb-bubble__who" style={{ color: meta.color }}>{meta.name}</span>
              <p className="gb-bubble__text">{line.text}</p>
              <span className="gb-bubble__tail" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="gb-stage__bots">
        <GymBot bot="nova"  talking={visible && speaker === 'nova'}  size={size} />
        <GymBot bot="pixel" talking={visible && speaker === 'pixel'} size={size} />
      </div>
    </div>
  )
}

/* Per-gate banter — activates only when the gate scrolls into view. */
export function GateBots({ lines }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.35 })
  return (
    <div ref={ref} className={`lv-row__bots${inView ? '' : ' lv-row__bots--paused'}`}>
      <BotStage lines={lines} active={inView} size="sm" />
    </div>
  )
}
