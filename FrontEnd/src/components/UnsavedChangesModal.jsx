import { createPortal } from 'react-dom'
import { Loader2 } from 'lucide-react'
import useBodyLock from '../hooks/useBodyLock'
import useModalA11y from '../hooks/useModalA11y'
import '../styles/components/unsaved-changes-modal.css'

export default function UnsavedChangesModal({
  open,
  busy = false,
  contextLabel = 'changes',
  onStay,
  onDiscard,
  onSave,
}) {
  useBodyLock(open)
  const modalRef = useModalA11y(() => { if (!busy) onStay?.() }, open)

  if (!open) return null

  return createPortal(
    <div
      className="modal-overlay unsaved-changes-modal-overlay"
      onClick={e => e.target === e.currentTarget && !busy && onStay?.()}
    >
      <div
        ref={modalRef}
        className="modal unsaved-changes-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="unsaved-changes-title"
      >
        <h3 id="unsaved-changes-title" className="modal-title">Unsaved changes</h3>
        <p className="unsaved-changes-modal__lead">
          You have unsaved {contextLabel}. Save before leaving, or discard them.
        </p>
        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onStay} disabled={busy}>
            Stay
          </button>
          <button type="button" className="btn btn-ghost" onClick={onDiscard} disabled={busy}>
            Discard
          </button>
          <button type="button" className="btn btn-primary" onClick={onSave} disabled={busy}>
            {busy ? <Loader2 size={14} className="unsaved-changes-modal__spin" aria-hidden="true" /> : null}
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
