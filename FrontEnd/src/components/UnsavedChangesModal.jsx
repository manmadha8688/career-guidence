import { createPortal } from 'react-dom'
import { Loader2 } from 'lucide-react'
import useBodyLock from '../hooks/useBodyLock'
import useModalA11y from '../hooks/useModalA11y'
import '../styles/components/unsaved-changes-modal.css'

export default function UnsavedChangesModal({
  open,
  busy = false,
  contextLabel = 'changes',
  sections = null,
  onStay,
  onDiscard,
  onSave,
}) {
  useBodyLock(open)
  // Driven by React Router's useBlocker — it owns history, so opt out of Back-to-close
  // (otherwise Stay/Discard/Save stop navigating and just dismiss the dialog).
  const modalRef = useModalA11y(() => { if (!busy) onStay?.() }, open, { backClose: false })

  if (!open) return null

  const hasSections = Array.isArray(sections) && sections.length > 0

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
          {hasSections ? (
            <>
              You have unsaved changes to your{' '}
              {sections.map((name, i) => (
                <span key={name}>
                  {i > 0 && (i === sections.length - 1 ? ' and ' : ', ')}
                  <span className="unsaved-changes-modal__section">{name}</span>
                </span>
              ))}
              . Save before leaving, or discard them.
            </>
          ) : (
            <>You have unsaved {contextLabel}. Save before leaving, or discard them.</>
          )}
        </p>
        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onStay} disabled={busy}>
            Stay
          </button>
          <button type="button" className="btn btn-danger" onClick={onDiscard} disabled={busy}>
            Discard
          </button>
          <button type="button" className="btn btn-success" onClick={onSave} disabled={busy}>
            {busy ? <Loader2 size={14} className="unsaved-changes-modal__spin" aria-hidden="true" /> : null}
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
