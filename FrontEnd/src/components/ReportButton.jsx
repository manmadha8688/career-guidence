import { useState } from 'react'
import { Flag, X, Send } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import toast from 'react-hot-toast'

const TYPES = [
  { value: 'NO_QUESTIONS',     label: '❓ No questions available' },
  { value: 'WRONG_CONTENT',    label: '✏️ Wrong or incorrect content' },
  { value: 'MISSING_CONTENT',  label: '📭 Content is missing' },
  { value: 'BROKEN',           label: '🔧 Something is broken' },
  { value: 'OTHER',            label: '💬 Other issue' },
]

/**
 * pageTitle — e.g. "Quiz — Variables and Input", "Concept — Loops"
 * variant   — 'floating' (bottom-right fixed) | 'inline' (small button inline)
 */
export default function ReportButton({ pageTitle, variant = 'floating' }) {
  const [open, setOpen]           = useState(false)
  const [type, setType]           = useState('')
  const [description, setDesc]    = useState('')
  const [submitting, setSubmit]   = useState(false)
  const { user }                  = useAuth()
  const navigate                  = useNavigate()

  const handleOpen = () => {
    if (!user) {
      toast.error('Please sign in to report an issue')
      navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`)
      return
    }
    setOpen(true)
  }

  const handleSubmit = async () => {
    if (!type) { toast.error('Please select an issue type'); return }
    if (!description.trim()) { toast.error('Please describe the issue'); return }
    setSubmit(true)
    try {
      await api.post('/reports', {
        pageUrl:   window.location.pathname,
        pageTitle: pageTitle || document.title,
        type,
        description: description.trim(),
      })
      toast.success('Report submitted — thank you!')
      setOpen(false)
      setType('')
      setDesc('')
    } catch {
      toast.error('Failed to submit report. Try again.')
    } finally {
      setSubmit(false)
    }
  }

  const close = () => { setOpen(false); setType(''); setDesc('') }

  return (
    <>
      {/* ── Trigger Button ── */}
      {variant === 'floating' ? (
        <button
          onClick={handleOpen}
          title="Report an issue"
          style={{
            position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 90,
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(239,68,68,0.12)', border: '1.5px solid rgba(239,68,68,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s', color: '#EF4444',
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.22)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.6)'; e.currentTarget.style.transform = 'scale(1.08)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'; e.currentTarget.style.transform = 'scale(1)' }}
        >
          <Flag size={16} />
        </button>
      ) : (
        <button
          onClick={handleOpen}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            background: 'none', border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: 6, padding: '0.25rem 0.6rem', cursor: 'pointer',
            fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem',
            letterSpacing: '0.06em', color: '#EF4444', transition: 'all 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <Flag size={10} /> REPORT
        </button>
      )}

      {/* ── Modal ── */}
      {open && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={e => e.target === e.currentTarget && close()}
        >
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderTop: '3px solid #EF4444',
            borderRadius: 14, padding: '1.5rem',
            width: 'min(460px, 100%)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'rgba(239,68,68,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Flag size={15} color="#EF4444" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Report an Issue</div>
                  {pageTitle && (
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.06em', marginTop: '0.1rem' }}>
                      {pageTitle}
                    </div>
                  )}
                </div>
              </div>
              <button onClick={close} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0.25rem', borderRadius: 4 }}>
                <X size={16} />
              </button>
            </div>

            {/* Issue Type */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em' }}>
                ISSUE TYPE *
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {TYPES.map(t => (
                  <button
                    key={t.value}
                    onClick={() => setType(t.value)}
                    style={{
                      textAlign: 'left', padding: '0.5rem 0.75rem',
                      borderRadius: 7, cursor: 'pointer',
                      border: `1.5px solid ${type === t.value ? 'rgba(239,68,68,0.5)' : 'var(--border)'}`,
                      background: type === t.value ? 'rgba(239,68,68,0.07)' : 'transparent',
                      color: type === t.value ? '#EF4444' : 'var(--text-secondary)',
                      fontFamily: "'Rajdhani', sans-serif", fontWeight: type === t.value ? 600 : 400,
                      fontSize: '0.875rem', transition: 'all 0.15s',
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em' }}>
                DESCRIPTION *
              </label>
              <textarea
                value={description}
                onChange={e => setDesc(e.target.value)}
                placeholder="Describe the issue clearly — what you expected vs what happened..."
                rows={3}
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: 'var(--bg-secondary)', border: '1.5px solid var(--border)',
                  borderRadius: 8, padding: '0.625rem 0.75rem',
                  color: 'var(--text-primary)', fontSize: '0.875rem',
                  fontFamily: "'Rajdhani', sans-serif", lineHeight: 1.6,
                  outline: 'none', resize: 'vertical',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(239,68,68,0.4)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', gap: '0.625rem', justifyContent: 'flex-end' }}>
              <button onClick={close} style={{
                background: 'none', border: '1px solid var(--border)',
                borderRadius: 7, padding: '0.5rem 1.1rem', cursor: 'pointer',
                color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: "'Rajdhani', sans-serif",
              }}>
                Cancel
              </button>
              <button onClick={handleSubmit} disabled={submitting} style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                background: 'linear-gradient(135deg, #DC2626, #EF4444)',
                border: 'none', borderRadius: 7, padding: '0.5rem 1.25rem',
                cursor: submitting ? 'not-allowed' : 'pointer',
                color: '#fff', fontWeight: 700, fontSize: '0.875rem',
                fontFamily: "'Rajdhani', sans-serif",
                opacity: submitting ? 0.7 : 1,
              }}>
                {submitting ? <span className="loading-spinner" style={{ width: 14, height: 14 }} /> : <Send size={13} />}
                {submitting ? 'Sending...' : 'Submit Report'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
