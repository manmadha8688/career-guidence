import { Trash2, X } from 'lucide-react'

export default function AdminBulkToolbar({ count, onClear, onDelete, deleting, label = 'item' }) {
  if (count < 1) return null

  return (
    <div className="admin-bulk-toolbar" role="region" aria-label="Bulk actions">
      <div className="admin-bulk-toolbar__info">
        <span className="admin-bulk-toolbar__count">{count}</span>
        <span>{label}{count !== 1 ? 's' : ''} selected</span>
      </div>
      <div className="admin-bulk-toolbar__actions">
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClear} disabled={deleting}>
          <X size={14} /> Clear
        </button>
        <button type="button" className="btn btn-danger btn-sm" onClick={onDelete} disabled={deleting}>
          {deleting ? <span className="loading-spinner" /> : <Trash2 size={14} />}
          Delete selected
        </button>
      </div>
    </div>
  )
}
