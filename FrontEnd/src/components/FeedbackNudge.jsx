import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STORAGE_KEY = 'feedback_nudge_dismissed'
const DELAY_MS    =  90 * 1000

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

      <div className="feedback-nudge__label">QUICK QUESTION</div>

      <p className="feedback-nudge__lead">
        I am building LearnToEarn to help students enter the right learning path, level up their skills, and become job-ready.
      </p>

      <p className="feedback-nudge__highlight">
        The platform is still being updated, and your suggestions will help me understand what students really need.
      </p>

      <p className="feedback-nudge__sub">
        Your feedback helps shape the next version. Takes just 30 seconds.
      </p>

      <button type="button" onClick={goFeedback} className="feedback-nudge__cta" aria-label="Give feedback about the platform">
        GIVE FEEDBACK
      </button>
    </div>
  )
}
