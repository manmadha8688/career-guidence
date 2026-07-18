import { createPortal } from 'react-dom'
import { AlertTriangle, X } from 'lucide-react'
import useBodyLock from '../hooks/useBodyLock'
import useModalA11y from '../hooks/useModalA11y'
import '../styles/components/confirm-modal.css'

export default function ConfirmModal({
  open,
  title = 'Are you sure?',
  message = '',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'danger',
  onConfirm,
  onCancel,
}) {
  useBodyLock(open)
  const modalRef = useModalA11y(onCancel, open)

  if (!open) return null

  const confirmClass = tone === 'danger' ? 'btn btn-danger' : 'btn btn-primary'

  return createPortal(
    <div
      className="modal-overlay confirm-modal-overlay"
      onClick={e => e.target === e.currentTarget && onCancel?.()}
    >
      <div
        ref={modalRef}
        className="modal confirm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        <div className="confirm-modal__icon" aria-hidden="true">
          <AlertTriangle size={26} />
        </div>
        <h3 id="confirm-modal-title" className="modal-title modal-title--center">
          {title}
        </h3>
        {message ? <p className="confirm-modal__message">{message}</p> : null}
        <div className="modal-actions modal-actions--center confirm-modal__actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            <X size={14} aria-hidden="true" /> {cancelLabel}
          </button>
          <button type="button" className={confirmClass} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
