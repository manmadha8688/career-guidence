import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STORAGE_KEY = 'feedback_nudge_dismissed'
const DELAY_MS    =  50 * 1000   // 2 minutes

export default function FeedbackNudge() {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    const t = setTimeout(() => setVisible(true), DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  function goFeedback() {
    dismiss()
    navigate('/')
    setTimeout(() => {
      document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  if (!visible) return null

  return (
    <div className="feedback-nudge" style={{
      position: 'fixed', bottom: '1rem', right: '1rem', left: '1rem', zIndex: 9999,
      width: 'auto', maxWidth: 340, marginLeft: 'auto',
      background: '#151C2E', border: '1px solid #9B6ED4',
      borderRadius: 16, padding: '1.25rem',
      boxShadow: '0 8px 40px rgba(155,110,212,0.3)',
      animation: 'nudgeIn 0.35s cubic-bezier(0.34,1.56,0.64,1)',
    }}>
      <button
        onClick={dismiss}
        style={{
          position: 'absolute', top: '0.75rem', right: '0.75rem',
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#888', fontSize: '1.1rem', lineHeight: 1,
        }}
        aria-label="Close"
      >✕</button>


      <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem', color: '#9B6ED4', marginBottom: '0.5rem', letterSpacing: 1 }}>
        💬 QUICK QUESTION
      </div>

      <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1rem', color: '#CBD5E1', margin: '0 0 0.4rem', lineHeight: 1.5 }}>
      I’m building LearnToEarn to help students enter the right learning path, level up their skills, and become job-ready. 
      </p>
      <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.9rem', color: '#94A3B8', margin: '0 0 1.25rem', lineHeight: 1.5 }}>
        Your feedback helps shape the next version. Takes just 30 seconds.
      </p>

      <button
        onClick={goFeedback}
        style={{
          width: '100%', padding: '0.65rem 1rem',
          background: 'linear-gradient(135deg, #9B6ED4, #7C3AED)',
          border: 'none', borderRadius: 10, cursor: 'pointer',
          fontFamily: 'Orbitron, sans-serif', fontSize: '0.8rem',
          color: '#fff', letterSpacing: 1, fontWeight: 700,
        }}
      >
        GIVE FEEDBACK →
      </button>

      <style>{`
        @keyframes nudgeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @media (min-width: 480px) {
          .feedback-nudge {
            left: auto !important;
            right: 1.5rem !important;
            width: 320px !important;
            max-width: 320px !important;
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
