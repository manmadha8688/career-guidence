import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AlertTriangle, ExternalLink, Loader2, RefreshCw, Save, X } from 'lucide-react'
import useBodyLock from '../hooks/useBodyLock'
import useModalA11y from '../hooks/useModalA11y'
import { getLinkVerifyDisplay } from '../utils/linkVerification'
import { safeExternalUrl } from '../utils/safeExternalUrl'
import '../styles/components/link-verify-modal.css'

const LEAD_COPY = {
  profile: {
    single: 'Tap Open to check the link, then Try again or Save without verify to keep it on your profile.',
    multi: 'Tap Open on each link, then Try again or Save without verify to keep them on your profile.',
  },
  mission: {
    single: 'Tap Open to check the link, then Try again or Save without verify to keep it on this mission.',
    multi: 'Tap Open on each link, then Try again or Save without verify to keep them on this mission.',
  },
  resume: {
    single: 'Tap Open to check the link, then Try again or Save without verify to keep it on your resume.',
    multi: 'Tap Open on each link, then Try again or Save without verify to keep them on your resume.',
  },
}

export default function LinkVerifyModal({
  open,
  results = [],
  busy = false,
  context = 'profile',
  onRetry,
  onSaveUnverified,
  onClose,
}) {
  useBodyLock(open)
  // Part of the unsaved-changes leave flow (can trigger blocker.proceed on close), so
  // opt out of Back-to-close to keep React Router's history in sync.
  const modalRef = useModalA11y(() => { if (!busy) onClose?.() }, open, { backClose: false })
  const [retryFeedback, setRetryFeedback] = useState(null)

  useEffect(() => {
    if (!open) setRetryFeedback(null)
  }, [open])

  if (!open || !results.length) return null

  const showOverride = results.some(r => r.status !== 'verified')
  const single = results.length === 1
  const lead = LEAD_COPY[context] || LEAD_COPY.profile

  const handleRetryClick = async () => {
    if (!onRetry || busy) return
    setRetryFeedback(null)
    const ok = await onRetry()
    if (ok === false) setRetryFeedback('still-failing')
  }

  return createPortal(
    <div
      className="modal-overlay link-verify-modal-overlay"
      onClick={e => e.target === e.currentTarget && !busy && onClose?.()}
    >
      <div
        ref={modalRef}
        className="modal link-verify-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="link-verify-title"
      >
        <button
          type="button"
          className="link-verify-modal__close modal-close"
          onClick={onClose}
          disabled={busy}
          aria-label="Close"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="link-verify-modal__icon" aria-hidden="true">
          <AlertTriangle size={26} />
        </div>
        <h3 id="link-verify-title" className="modal-title modal-title--center">
          {single ? "We can't verify this link" : "We can't verify these links"}
        </h3>
        <p className="link-verify-modal__lead">
          {single ? lead.single : lead.multi}
        </p>

        {retryFeedback === 'still-failing' && (
          <p className="link-verify-modal__feedback link-verify-modal__feedback--warn" role="status" aria-live="polite">
            <AlertTriangle size={16} aria-hidden="true" />
            Still could not verify — wait a moment, then Try again, or Save without verify.
          </p>
        )}

        <ul className="link-verify-modal__list">
          {results.map(r => {
            const { message, advice } = getLinkVerifyDisplay()
            return (
              <li key={`${r.label}-${r.url}`} className={`link-verify-modal__item link-verify-modal__item--${r.status || 'unverifiable'}`}>
                <div className="link-verify-modal__item-head">
                  <strong>{r.label}</strong>
                  {r.url && safeExternalUrl(r.url) && (
                    <a href={safeExternalUrl(r.url)} target="_blank" rel="noopener noreferrer" className="link-verify-modal__open">
                      Open <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  )}
                </div>
                <p className="link-verify-modal__msg">{message}</p>
                <p className="link-verify-modal__advice">{advice}</p>
              </li>
            )
          })}
        </ul>

        <div className="modal-actions link-verify-modal__actions">
          {onRetry && (
            <button type="button" className="btn btn-secondary" onClick={handleRetryClick} disabled={busy}>
              {busy ? <Loader2 size={14} className="link-verify-modal__spin" /> : <RefreshCw size={14} />}
              Try again
            </button>
          )}
          {showOverride && (
            <button type="button" className="btn btn-primary" onClick={onSaveUnverified} disabled={busy}>
              {busy ? <Loader2 size={14} className="link-verify-modal__spin" /> : <Save size={14} />}
              Save without verify
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
