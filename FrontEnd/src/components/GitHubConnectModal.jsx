import { Github, ExternalLink, Loader2, X } from 'lucide-react'
import useBodyLock from '../hooks/useBodyLock'
import useModalA11y from '../hooks/useModalA11y'
import '../styles/components/link-verify-modal.css'

export default function GitHubConnectModal({ open, busy = false, onConfirm, onClose }) {
  useBodyLock(open)
  const modalRef = useModalA11y(() => { if (!busy) onClose?.() }, open)

  if (!open) return null

  return (
    <div className="modal-overlay link-verify-modal-overlay" onClick={e => e.target === e.currentTarget && !busy && onClose?.()}>
      <div
        ref={modalRef}
        className="modal link-verify-modal github-connect-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="github-connect-title"
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
        <div className="link-verify-modal__icon github-connect-modal__icon" aria-hidden="true">
          <Github size={26} />
        </div>
        <h3 id="github-connect-title" className="modal-title modal-title--center">
          Connect your GitHub
        </h3>
        <p className="link-verify-modal__lead">
          Only connect on <strong>your</strong> ARISE account. Each GitHub profile can be linked to one ARISE account only.
        </p>
        <ul className="link-verify-modal__list github-connect-modal__list">
          <li className="link-verify-modal__item">
            <p className="link-verify-modal__advice">
              GitHub opens in this browser — it uses whichever GitHub account is signed in here, not your ARISE login.
            </p>
          </li>
          <li className="link-verify-modal__item">
            <p className="link-verify-modal__advice">
              On a shared computer?{' '}
              <a href="https://github.com/logout" target="_blank" rel="noopener noreferrer" className="link-verify-modal__open">
                Sign out of GitHub <ExternalLink size={14} aria-hidden="true" />
              </a>
              {' '}first, then sign in with your GitHub before continuing.
            </p>
          </li>
          <li className="link-verify-modal__item">
            <p className="link-verify-modal__advice">
              If that GitHub is already on someone else&apos;s profile, connect will be blocked.
            </p>
          </li>
        </ul>

        <div className="modal-actions link-verify-modal__actions">
          <button type="button" className="btn btn-primary" onClick={onConfirm} disabled={busy}>
            {busy ? <Loader2 size={14} className="link-verify-modal__spin" /> : <Github size={14} />}
            Continue to GitHub
          </button>
        </div>
      </div>
    </div>
  )
}
