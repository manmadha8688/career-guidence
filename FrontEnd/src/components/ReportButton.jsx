import { useState } from 'react'
import { Flag, X, Send } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../api/api'
import toast from 'react-hot-toast'

const TYPES = [
  { value: 'WRONG_CONTENT',    label: '✏️ Wrong or incorrect content' },
  { value: 'MISSING_CONTENT',  label: '📭 Content is missing' },
  { value: 'NO_QUESTIONS',     label: '❓ No questions available' },
  { value: 'BROKEN',           label: '🔧 Something is broken / not working' },
  { value: 'UI_ISSUE',         label: '🖥️ Display or UI problem' },
  { value: 'WRONG_ANSWER',     label: '❌ Wrong answer or solution' },
  { value: 'SUGGESTION',       label: '💡 Suggestion or improvement' },
  { value: 'OTHER',            label: '💬 Other issue' },
]

function getPageTitle(pathname) {
  if (pathname.startsWith('/skill-arena/quiz/result'))  return 'Quiz Result'
  if (pathname.startsWith('/skill-arena/quiz'))         return 'Quiz'
  if (pathname.startsWith('/skill-arena/roadmaps'))     return 'Hunter Path'
  if (pathname.startsWith('/skill-arena'))              return 'Skill Arena'
  if (pathname.startsWith('/problem-solving') && pathname.length > 16) return 'Code GYM — Problem'
  if (pathname.startsWith('/problem-solving'))          return 'Code GYM'
  if (pathname.startsWith('/missions') && pathname.length > 9) return 'Mission Detail'
  if (pathname.startsWith('/missions'))                 return 'Mission Board'
  if (pathname.startsWith('/fresher-instructions/career-guidance')) return 'Career Guidance'
  if (pathname.startsWith('/fresher-instructions'))     return 'Fresher Guide'
  if (pathname.startsWith('/walk-ins'))                 return 'Walk-Ins'
  if (pathname === '/')                                 return 'Landing Page'
  return pathname
}

export default function ReportButton({ pageTitle, variant = 'floating' }) {
  const [open, setOpen]         = useState(false)
  const [type, setType]         = useState('')
  const [description, setDesc]  = useState('')
  const [submitting, setSubmit] = useState(false)
  const { user }                = useAuth()
  const navigate                = useNavigate()
  const location                = useLocation()

  const resolvedTitle = pageTitle || getPageTitle(location.pathname)

  const handleOpen = () => {
    if (!user) {
      toast.error('Please sign in to report an issue')
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`)
      return
    }
    setOpen(true)
  }

  const handleSubmit = async () => {
    if (!type)             { toast.error('Please select an issue type'); return }
    if (!description.trim()) { toast.error('Please describe the issue'); return }
    setSubmit(true)
    try {
      await api.post('/reports', {
        pageUrl:     location.pathname,
        pageTitle:   resolvedTitle,
        type,
        description: description.trim(),
      })
      toast.success('Report submitted — thank you for helping improve this platform!')
      setOpen(false); setType(''); setDesc('')
    } catch {
      toast.error('Failed to submit report. Try again.')
    } finally {
      setSubmit(false)
    }
  }

  const close = () => { setOpen(false); setType(''); setDesc('') }

  return (
    <>
      {variant === 'floating' ? (
        <button
          onClick={handleOpen}
          title="Report an issue on this page"
          aria-label="Report an issue on this page"
          style={{
            position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 90,
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.45rem 0.875rem',
            borderRadius: 999,
            background: 'rgba(239,68,68,0.1)', border: '1.5px solid rgba(239,68,68,0.28)',
            cursor: 'pointer', transition: 'all 0.2s', color: '#EF4444',
            backdropFilter: 'blur(8px)',
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.62rem', letterSpacing: '0.06em', fontWeight: 700,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.55)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.28)'; e.currentTarget.style.transform = 'none' }}
        >
          <Flag size={13} /> REPORT
        </button>
      ) : (
        <button
          onClick={handleOpen}
          aria-label="Report an issue"
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

      {open && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={e => e.target === e.currentTarget && close()}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Report an issue"
            style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderTop: '3px solid #EF4444', borderRadius: 16,
            width: 'min(480px, 100%)', maxHeight: '90vh', overflow: 'auto',
            boxShadow: '0 24px 64px rgba(0,0,0,0.45)',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.375rem 1rem', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Flag size={15} color="#EF4444" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Report an Issue</div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: '#EF4444', letterSpacing: '0.06em', marginTop: '0.1rem', opacity: 0.75 }}>
                    {resolvedTitle}
                  </div>
                </div>
              </div>
              <button onClick={close} aria-label="Close report dialog" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0.25rem', borderRadius: 4 }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '1.125rem 1.375rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {/* Help note */}
              <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)' }}>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                  Found something wrong, missing, or broken? Let us know — your report directly helps improve the platform for everyone.
                </p>
              </div>

              {/* Issue Type */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  What kind of issue?
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {TYPES.map(t => (
                    <button
                      key={t.value}
                      onClick={() => setType(t.value)}
                      style={{
                        textAlign: 'left', padding: '0.5rem 0.75rem', borderRadius: 8, cursor: 'pointer',
                        border: `1.5px solid ${type === t.value ? 'rgba(239,68,68,0.5)' : 'var(--border)'}`,
                        background: type === t.value ? 'rgba(239,68,68,0.07)' : 'var(--bg-secondary)',
                        color: type === t.value ? '#EF4444' : 'var(--text-secondary)',
                        fontFamily: "'Rajdhani', sans-serif", fontWeight: type === t.value ? 700 : 400,
                        fontSize: '0.875rem', transition: 'all 0.12s',
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Describe the issue
                </label>
                <textarea
                  value={description}
                  onChange={e => setDesc(e.target.value)}
                  placeholder="What did you expect? What actually happened? The more detail you give, the faster we can fix it."
                  rows={3}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    background: 'var(--bg-secondary)', border: '1.5px solid var(--border)',
                    borderRadius: 8, padding: '0.625rem 0.75rem',
                    color: 'var(--text-primary)', fontSize: '0.875rem',
                    fontFamily: "'Rajdhani', sans-serif", lineHeight: 1.6,
                    outline: 'none', resize: 'vertical', transition: 'border-color 0.15s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(239,68,68,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', gap: '0.625rem', justifyContent: 'flex-end' }}>
                <button onClick={close} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '0.5rem 1.1rem', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.875rem', fontFamily: "'Rajdhani', sans-serif" }}>
                  Cancel
                </button>
                <button onClick={handleSubmit} disabled={submitting} style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  background: 'linear-gradient(135deg, #DC2626, #EF4444)',
                  border: 'none', borderRadius: 8, padding: '0.5rem 1.25rem',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  color: '#fff', fontWeight: 700, fontSize: '0.875rem',
                  fontFamily: "'Rajdhani', sans-serif", opacity: submitting ? 0.7 : 1,
                }}>
                  {submitting ? <span className="loading-spinner" style={{ width: 14, height: 14 }} /> : <Send size={13} />}
                  {submitting ? 'Sending…' : 'Submit Report'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
