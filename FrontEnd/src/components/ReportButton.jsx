import { useState, useMemo, useRef, useEffect } from 'react'
import { Flag, X, Send, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { submitReport } from '../api/api'
import toast from 'react-hot-toast'
import { getApiError } from '../utils/apiError'
import useBodyLock from '../hooks/useBodyLock'
import { REPORT_CATEGORIES } from '../constants/reportTypes'
import { buildReportContext, formatContextPreview, getReportPageTitle } from '../utils/reportContext'

const MIN_DESC = 12

export default function ReportButton({ pageTitle, variant = 'floating' }) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [categoryId, setCategoryId] = useState('')
  const [type, setType] = useState('')
  const [description, setDesc] = useState('')
  const [expected, setExpected] = useState('')
  const [showContext, setShowContext] = useState(false)
  const [submitting, setSubmit] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const modalRef = useRef(null)
  const lastFocusRef = useRef(null)

  useBodyLock(open)

  useEffect(() => {
    if (!open) return
    lastFocusRef.current = document.activeElement
    const modal = modalRef.current
    if (!modal) return

    const getFocusables = () =>
      [...modal.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )].filter(el => el.offsetParent !== null)

    const focusFirst = () => {
      const items = getFocusables()
      items[0]?.focus()
    }
    focusFirst()

    const onKeyDown = (e) => {
      if (e.key === 'Escape' && !submitting) {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab') return
      const items = getFocusables()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      lastFocusRef.current?.focus?.()
    }
  }, [open, submitting])

  const resolvedTitle = pageTitle || getReportPageTitle(location.pathname)
  const context = useMemo(
    () => buildReportContext(location.pathname, location.search),
    [location.pathname, location.search],
  )
  const contextLines = useMemo(() => formatContextPreview(context), [context])

  const activeCategory = REPORT_CATEGORIES.find(c => c.id === categoryId)
  const showExpected = categoryId === 'content' || categoryId === 'bug' || categoryId === 'ui'

  const resetForm = () => {
    setCategoryId('')
    setType('')
    setDesc('')
    setExpected('')
    setShowContext(false)
    setSubmitted(false)
  }

  const close = () => {
    setOpen(false)
    resetForm()
  }

  const handleOpen = () => {
    if (!user) {
      toast.error('Sign in first so we can follow up on your report.')
      navigate(`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`)
      return
    }
    resetForm()
    setOpen(true)
  }

  const pickCategory = (id) => {
    setCategoryId(id)
    const cat = REPORT_CATEGORIES.find(c => c.id === id)
    setType(cat?.types.length === 1 ? cat.types[0].value : '')
  }

  const handleSubmit = async () => {
    if (!type) {
      toast.error('Pick the issue type that fits best.')
      return
    }
    const trimmed = description.trim()
    if (trimmed.length < MIN_DESC) {
      toast.error(`Describe what happened — at least ${MIN_DESC} characters helps us fix it faster.`)
      return
    }
    setSubmit(true)
    try {
      await submitReport({
        pageUrl: location.pathname + location.search,
        pageTitle: resolvedTitle,
        type,
        description: trimmed,
        expectedBehavior: expected.trim() || null,
        context: JSON.stringify(context),
      })
      setSubmitted(true)
      toast.success('Report sent — thank you for helping improve ARISE.')
    } catch (err) {
      toast.error(getApiError(err, 'We could not send your report right now. Please try again.'))
    } finally {
      setSubmit(false)
    }
  }

  return (
    <>
      {variant === 'floating' ? (
        <button
          type="button"
          onClick={handleOpen}
          title="Report an issue on this page"
          aria-label="Report an issue on this page"
          className="report-fab"
        >
          <Flag size={13} /> REPORT
        </button>
      ) : (
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Report an issue"
          className="report-inline-btn"
        >
          <Flag size={10} /> REPORT
        </button>
      )}

      {open && (
        <div
          className="report-overlay"
          onClick={e => e.target === e.currentTarget && !submitting && close()}
        >
          <div
            ref={modalRef}
            className="report-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-modal-title"
          >
            <div className="report-modal__header">
              <div className="report-modal__header-icon">
                <Flag size={16} />
              </div>
              <div className="report-modal__header-text">
                <h2 id="report-modal-title">Report an issue</h2>
                <p>{resolvedTitle}</p>
              </div>
              <button type="button" className="report-modal__close" onClick={close} aria-label="Close">
                <X size={16} />
              </button>
            </div>

            {submitted ? (
              <div className="report-modal__success">
                <CheckCircle size={40} className="report-modal__success-icon" />
                <h3>Report received</h3>
                <p>
                  Your report goes straight to the team with page context attached.
                  Honest, specific reports are the fastest way we improve content and fix bugs.
                </p>
                <button type="button" className="btn btn-primary" onClick={close}>
                  Done
                </button>
              </div>
            ) : (
              <div className="report-modal__body">
                <p className="report-modal__intro">
                  Tell us what went wrong. Include what you tried and what you expected — that helps us reproduce and fix it quickly.
                </p>

                {/* Category */}
                <div className="report-field">
                  <span className="report-field__label">What area?</span>
                  <div className="report-category-grid">
                    {REPORT_CATEGORIES.map(cat => {
                      const Icon = cat.icon
                      const on = categoryId === cat.id
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          className={`report-category-card${on ? ' is-on' : ''}`}
                          aria-pressed={on}
                          onClick={() => pickCategory(cat.id)}
                        >
                          <Icon size={16} />
                          <span className="report-category-card__label">{cat.label}</span>
                          <span className="report-category-card__hint">{cat.hint}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Specific type — only when category has multiple options */}
                {activeCategory && activeCategory.types.length > 1 && (
                  <div className="report-field">
                    <span className="report-field__label">More specific</span>
                    <div className="report-type-chips">
                      {activeCategory.types.map(t => (
                        <button
                          key={t.value}
                          type="button"
                          className={`report-type-chip${type === t.value ? ' is-on' : ''}`}
                          aria-pressed={type === t.value}
                          onClick={() => setType(t.value)}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* What happened */}
                <div className="report-field">
                  <label className="report-field__label" htmlFor="report-desc">
                    What happened? <span className="report-required">*</span>
                  </label>
                  <textarea
                    id="report-desc"
                    className="form-input report-textarea"
                    value={description}
                    onChange={e => setDesc(e.target.value)}
                    placeholder="Example: On the Java gate quiz, question 3 marks option B correct but the concept page says option C."
                    rows={3}
                  />
                  <span className="report-char-hint">
                    {description.trim().length < MIN_DESC
                      ? `${MIN_DESC - description.trim().length} more characters needed`
                      : 'Good detail — thank you'}
                  </span>
                </div>

                {/* Expected behavior */}
                {showExpected && (
                  <div className="report-field">
                    <label className="report-field__label" htmlFor="report-expected">
                      What did you expect? <span className="report-optional">optional</span>
                    </label>
                    <textarea
                      id="report-expected"
                      className="form-input report-textarea report-textarea--sm"
                      value={expected}
                      onChange={e => setExpected(e.target.value)}
                      placeholder="Example: Option C should be marked correct, or the explanation should match the quiz."
                      rows={2}
                    />
                  </div>
                )}

                {/* Auto context */}
                <div className="report-context">
                  <button
                    type="button"
                    className="report-context__toggle"
                    onClick={() => setShowContext(v => !v)}
                    aria-expanded={showContext}
                  >
                    <span>Page context (auto-attached)</span>
                    {showContext ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  {showContext && (
                    <ul className="report-context__list">
                      <li><code>{context.fullUrl}</code></li>
                      {contextLines.map(line => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="report-modal__actions">
                  <button type="button" className="btn btn-ghost" onClick={close} disabled={submitting}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleSubmit}
                    disabled={submitting || !type || description.trim().length < MIN_DESC}
                  >
                    {submitting ? <span className="loading-spinner" /> : <Send size={14} />}
                    {submitting ? 'Sending…' : 'Submit report'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
