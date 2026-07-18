import { AlertTriangle, Trash2, X } from 'lucide-react'
import useBodyLock from '../../hooks/useBodyLock'
import useModalA11y from '../../hooks/useModalA11y'

export default function AdminDeleteModal({
  open,
  title = 'Delete selected items?',
  subtitle,
  items = [],
  deleting,
  confirmLabel,
  onConfirm,
  onClose,
}) {
  useBodyLock(open)
  const modalRef = useModalA11y(() => { if (!deleting) onClose() }, open)

  if (!open) return null

  const count = items.length || 0
  const defaultConfirmLabel = `Delete ${count || ''} item${count !== 1 ? 's' : ''}`

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && !deleting && onClose()}>
      <div ref={modalRef} className="modal admin-delete-modal" role="dialog" aria-modal="true" aria-labelledby="admin-delete-title">
        <div className="admin-delete-modal__icon" aria-hidden="true">
          <AlertTriangle size={28} />
        </div>
        <h3 id="admin-delete-title" className="modal-title modal-title--center">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-muted modal-subtitle">{subtitle}</p>
        )}
        {items.length > 0 && (
          <ul className="admin-delete-modal__list">
            {items.slice(0, 8).map(item => (
              <li key={item.id}>{item.label}</li>
            ))}
            {items.length > 8 && (
              <li className="admin-delete-modal__more">+ {items.length - 8} more</li>
            )}
          </ul>
        )}
        <p className="admin-delete-modal__warn">This action cannot be undone.</p>
        <div className="modal-actions modal-actions--center">
          <button type="button" className="btn btn-ghost" onClick={onClose} disabled={deleting}>
            <X size={14} /> Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={deleting}>
            {deleting ? <span className="loading-spinner" /> : <Trash2 size={14} />}
            {confirmLabel || defaultConfirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
