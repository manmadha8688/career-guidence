import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STORAGE_KEY = 'feedback_nudge_dismissed'
const DELAY_MS    =  110 * 1000

export default function FeedbackNudge() {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const scrollTimer = useRef(null)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    const t = setTimeout(() => setVisible(true), DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    return () => { if (scrollTimer.current) clearTimeout(scrollTimer.current) }
  }, [])

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  function goFeedback() {
    dismiss()
    navigate('/')
    scrollTimer.current = setTimeout(() => {
      document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  if (!visible) return null

  return (
    <div className="feedback-nudge">
      <button type="button" onClick={dismiss} className="feedback-nudge__close" aria-label="Close">
        x
      </button>

      <div className="feedback-nudge__label">CAN I ASK YOU SOMETHING?</div>

      <p className="feedback-nudge__lead">
        Hey! I&rsquo;m building LearnForEarn on my own to help students like you find the right path, grow real skills, and actually become job-ready.
      </p>

      <p className="feedback-nudge__highlight">
        It&rsquo;s still growing every day &mdash; and honestly, I can&rsquo;t make it better without hearing from the people actually using it.
      </p>

      <p className="feedback-nudge__sub">
        A few honest words from you would mean a lot, and they genuinely shape what I build next. Takes about 30 seconds, promise.
      </p>

      <button type="button" onClick={goFeedback} className="feedback-nudge__cta" aria-label="Share your feedback about the platform">
        SHARE YOUR THOUGHTS
      </button>
    </div>
  )
}
