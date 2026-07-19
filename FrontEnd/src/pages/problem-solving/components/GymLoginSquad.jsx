import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useInView, useSpring, useTransform } from 'framer-motion'
import { MangaSpeechBubble } from '../../auth/components/MangaSpeechBubble'
import { getLineReadMs, LINE_GAP_MS, BEAT_TAIL_MS } from '../../auth/hooks/companionMurmurs'
// The bot/scene shapes (.login-bot*, .login-scene*) live in auth-animations.css.
// Import it here so the styles always ship with this component's chunk — otherwise
// the squad can paint unstyled (broken black shape) on a fresh load before the
// auth layout's CSS chunk happens to be cached.
import '../../../styles/auth-animations.css'

const START_DELAY_MS = 380

const lineSpeaker = (line) => line?.speaker || line?.who || null

function useBotSequence(lines, active, loop, clearAfterDone) {
  const [idx, setIdx] = useState(0)
  const [done, setDone] = useState(false)
  const runRef = useRef({ displayIdx: 0, timers: [], linesKey: '', started: false, finished: false })

  const clearTimers = () => {
    runRef.current.timers.forEach(clearTimeout)
    runRef.current.timers = []
  }

  useEffect(() => {
    clearTimers()
    if (!lines?.length) return

    const linesKey = lines.map(l => l.text).join('\x00')
    if (runRef.current.linesKey !== linesKey) {
      runRef.current.linesKey = linesKey
      runRef.current.displayIdx = 0
      runRef.current.started = false
      runRef.current.finished = false
      setIdx(0)
      setDone(false)
    }

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduced) {
      setIdx(lines.length - 1)
      setDone(false)
      return
    }

    if (!active) return
    if (runRef.current.finished && clearAfterDone) return

    const schedule = (fn, ms) => {
      runRef.current.timers.push(setTimeout(fn, ms))
    }

    const showFrom = (startIdx, initialDelay) => {
      const show = (i) => {
        setDone(false)
        setIdx(i)
        runRef.current.displayIdx = i
        const dur = getLineReadMs(lines[i]?.text)
        const isLast = i >= lines.length - 1
        if (!isLast) {
          schedule(() => show(i + 1), dur + LINE_GAP_MS)
        } else if (loop) {
          schedule(() => show(0), dur + 1600)
        } else if (clearAfterDone) {
          schedule(() => { runRef.current.finished = true; setDone(true) }, dur + BEAT_TAIL_MS)
        }
      }
      schedule(() => show(startIdx), initialDelay)
    }

    const delay = runRef.current.started ? 280 : START_DELAY_MS
    runRef.current.started = true
    showFrom(runRef.current.displayIdx, delay)

    return clearTimers
  }, [active, clearAfterDone, loop, lines])

  const line = done ? null : lines?.[idx]
  return { line, idx, speaker: lineSpeaker(line), done }
}

function BotEye({ size = 'md', pupilX, pupilY, covered, sleepy, led }) {
  const sizeCls = size === 'sm' ? ' login-bot-eye--sm' : size === 'lg' ? ' login-bot-eye--lg' : ''
  const shut = covered

  return (
    <div className={`login-bot-eye${sizeCls}`}>
      <motion.div
        className="login-bot-eye-lens"
        animate={{ scaleY: shut ? 0.1 : sleepy ? 0.4 : 1 }}
        transition={{ duration: 0.22 }}
      >
        {!shut && (
          <motion.div
            className={`login-bot-pupil login-bot-pupil--${led}`}
            animate={{ x: pupilX, y: sleepy ? 1 : pupilY }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          />
        )}
      </motion.div>
    </div>
  )
}

function SideBot({ variant, active, pupilX, pupilY, speech, bubbleKey, paused = false }) {
  const isLeft = variant === 'byte'
  const tail = isLeft ? 'left' : 'right'

  return (
    <motion.div
      className={`login-bot login-bot--${variant}${active ? ' login-bot--speaking' : ''}`}
      animate={{ y: active ? [0, -5, 0] : [0, -2, 0] }}
      transition={{ duration: active ? 0.45 : 2.8, repeat: paused ? 0 : Infinity, ease: 'easeInOut' }}
    >
      <AnimatePresence initial={false}>
        {speech && <MangaSpeechBubble key={bubbleKey} text={speech} tail={tail} />}
      </AnimatePresence>

      {variant === 'glitch' && (
        <motion.div
          className="login-bot-antenna"
          animate={{ rotate: active ? [0, 4, -4, 0] : 0 }}
          transition={{ duration: 1.2, repeat: paused ? 0 : Infinity }}
        >
          <span className="login-bot-antenna-tip" />
        </motion.div>
      )}

      <div className={`login-bot-shell login-bot-shell--${variant}`}>
        <div className="login-bot-panel" />
        <div className="login-bot-face-row">
          {variant === 'byte' ? (
            <BotEye size="sm" pupilX={pupilX * 0.7} pupilY={pupilY * 0.7} led="cyan" />
          ) : (
            <>
              <BotEye size="sm" pupilX={pupilX * 0.6} pupilY={pupilY * 0.6} led="amber" />
              <BotEye size="sm" pupilX={pupilX * 0.6} pupilY={pupilY * 0.6} led="amber" />
            </>
          )}
        </div>
        <motion.div
          className={`login-bot-mouth login-bot-mouth--${variant}`}
          animate={{ width: active ? (isLeft ? 16 : 14) : 12, height: active ? 4 : 3 }}
        />
        <div className="login-bot-feet"><span /><span /></div>
      </div>
      <div className="login-bot-shadow login-bot-shadow--side" />
    </motion.div>
  )
}

function EchoBot({ active, pupilX, pupilY, speech, bubbleKey, paused = false }) {
  const bounce = useSpring(active ? 1 : 0, { stiffness: 180, damping: 14 })
  const bodyY = useTransform(bounce, [0, 1], [0, -6])

  return (
    <motion.div
      className={`login-bot login-bot--prime${active ? ' login-bot--speaking' : ''}`}
      style={{ y: bodyY }}
      animate={{ rotate: active ? [0, -1.5, 1.5, 0] : 0 }}
      transition={{ duration: 0.5, repeat: paused ? 0 : Infinity, ease: 'easeInOut' }}
    >
      <AnimatePresence initial={false}>
        {speech && <MangaSpeechBubble key={bubbleKey} text={speech} tail="center" />}
      </AnimatePresence>
      <div className="login-bot-shell login-bot-shell--prime">
        <div className="login-bot-visor-rim" />
        <div className="login-bot-visor">
          <BotEye size="lg" pupilX={pupilX} pupilY={pupilY} led="violet" />
          <BotEye size="lg" pupilX={pupilX * 0.4} pupilY={pupilY} led="violet" />
        </div>
        <div className="login-bot-chest">
          <motion.span
            className="login-bot-core-led"
            animate={{ opacity: active ? [0.5, 1, 0.5] : [0.25, 0.55, 0.25] }}
            transition={{ duration: active ? 0.8 : 2.2, repeat: paused ? 0 : Infinity }}
          />
        </div>
        <motion.div
          className="login-bot-mouth login-bot-mouth--prime"
          animate={{ width: active ? 24 : 18, height: active ? 5 : 4 }}
        />
      </div>
      <div className="login-bot-shadow login-bot-shadow--prime" />
    </motion.div>
  )
}

/** Login-page bot squad with scripted dialogue — trio (hero) or duo (gate). */
export default function GymLoginSquad({
  lines,
  loop = false,
  active = true,
  mode = 'trio',
  className = '',
  clearAfterDone = false,
}) {
  const sceneRef = useRef(null)
  const inView = useInView(sceneRef, { once: false, amount: 0.3 })
  const [pupil, setPupil] = useState({ x: 0, y: 0 })
  const sequenceActive = active && inView
  const { line, idx, speaker } = useBotSequence(lines, sequenceActive, loop, clearAfterDone)

  useEffect(() => {
    const onMove = (e) => {
      const el = sceneRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width * 0.5
      const cy = rect.top + rect.height * 0.5
      const dx = (e.clientX - cx) / (rect.width * 0.5)
      const dy = (e.clientY - cy) / (rect.height * 0.5)
      setPupil({ x: Math.max(-6, Math.min(6, dx * 8)), y: Math.max(-4, Math.min(4, dy * 6)) })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
    }
  }, [])

  const bubbleKey = line ? `${idx}-${speaker}` : 'idle'
  const showEcho = mode === 'trio'

  return (
    <div
      className={`gym-login-scene gym-login-scene--${mode}${inView ? '' : ' gym-login-scene--paused'}${className ? ` ${className}` : ''}`}
      ref={sceneRef}
    >
      <div className="login-scene-glow gym-login-scene__glow" />
      <div className="login-scene-grid gym-login-scene__grid" />

      <div className="login-scene-center gym-login-scene__center">
        <div className={`login-squad gym-login-squad${showEcho ? '' : ' gym-login-squad--duo'}`}>
          <SideBot
            variant="byte"
            active={speaker === 'nova'}
            paused={!inView}
            pupilX={pupil.x}
            pupilY={pupil.y}
            speech={speaker === 'nova' ? line?.text : null}
            bubbleKey={speaker === 'nova' ? bubbleKey : 'nova-idle'}
          />

          {showEcho && (
            <EchoBot
              active={speaker === 'echo'}
              paused={!inView}
              pupilX={pupil.x}
              pupilY={pupil.y}
              speech={speaker === 'echo' ? line?.text : null}
              bubbleKey={speaker === 'echo' ? bubbleKey : 'echo-idle'}
            />
          )}

          <SideBot
            variant="glitch"
            active={speaker === 'pixel'}
            paused={!inView}
            pupilX={pupil.x}
            pupilY={pupil.y}
            speech={speaker === 'pixel' ? line?.text : null}
            bubbleKey={speaker === 'pixel' ? bubbleKey : 'pixel-idle'}
          />
        </div>
        <div className="login-squad-desk gym-login-scene__desk" />
      </div>
    </div>
  )
}
