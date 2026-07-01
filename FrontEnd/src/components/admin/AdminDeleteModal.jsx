import { AlertTriangle, Trash2, X } from 'lucide-react'
import useBodyLock from '../../hooks/useBodyLock'

export default function AdminDeleteModal({
  open,
  title = 'Delete selected items?',
  subtitle,
  items = [],
  deleting,
  onConfirm,
  onClose,
}) {
  useBodyLock(open)

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && !deleting && onClose()}>
      <div className="modal admin-delete-modal" role="dialog" aria-modal="true" aria-labelledby="admin-delete-title">
        <div className="admin-delete-modal__icon" aria-hidden="true">
          <AlertTriangle size={28} />
        </div>
        <h3 id="admin-delete-title" className="modal-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-muted" style={{ textAlign: 'center', margin: '0 0 1rem', lineHeight: 1.6 }}>
            {subtitle}
          </p>
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
        <div className="modal-actions" style={{ justifyContent: 'center', gap: '0.75rem' }}>
          <button type="button" className="btn btn-ghost" onClick={onClose} disabled={deleting}>
            <X size={14} /> Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={deleting}>
            {deleting ? <span className="loading-spinner" /> : <Trash2 size={14} />}
            Delete {items.length || ''} item{(items.length || 0) !== 1 ? 's' : ''}
          </button>
        </div>
      </div>
    </div>
  )
}
