import { useState, useEffect, useCallback, useMemo } from 'react'
import { TEST_DELAY_MS } from '../../components/loaders/_config'
import RadarLoader from '../../components/loaders/RadarLoader'
import { Search } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import AdminBulkToolbar from '../../components/admin/AdminBulkToolbar'
import AdminDeleteModal from '../../components/admin/AdminDeleteModal'
import useAdminSelection from '../../hooks/useAdminSelection'
import { getAdminUsers, deleteUser } from '../../api/api'
import toast from 'react-hot-toast'
import { getApiError } from '../../utils/apiError'

const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' }) : '—'
const fmtDateTime = (d) => {
  if (!d) return '—'
  const dt = new Date(d)
  return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
    + ' ' + dt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
}

function debounce(fn, d) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), d) } }

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState(false)
  const [bulkDeleting, setBulkDeleting] = useState(false)
  const SIZE = 10

  const load = useCallback((p = 0, q = search) => {
    setLoading(true)
    getAdminUsers(p, SIZE, q)
      .then(r => {
        setUsers(r.data.content)
        setTotal(r.data.totalElements)
        setTotalPages(r.data.totalPages)
        setPage(p)
      })
      .catch(err => toast.error(getApiError(err, 'We could not load users. Please refresh.')))
      .finally(() => setTimeout(() => setLoading(false), TEST_DELAY_MS))
  }, [search])

  useEffect(() => { load(0) }, [])

  const debouncedSearch = useCallback(debounce(q => load(0, q), 400), [])

  const handleSearch = e => {
    setSearch(e.target.value)
    debouncedSearch(e.target.value)
  }

  const selectableUsers = useMemo(() => users.filter(u => u.role !== 'ADMIN'), [users])
  const filteredIds = useMemo(() => selectableUsers.map(u => u.id), [selectableUsers])
  const selection = useAdminSelection(filteredIds)

  const deleteTargets = useMemo(
    () => selection.selectedIds.map(id => ({
      id,
      label: users.find(u => u.id === id)?.fullName || id,
    })),
    [selection.selectedIds, users],
  )

  const confirmBulkDelete = async () => {
    setBulkDeleting(true)
    try {
      for (const id of selection.selectedIds) {
        await deleteUser(id)
      }
      toast.success(`Deleted ${selection.selectedIds.length} user${selection.selectedIds.length !== 1 ? 's' : ''}`)
      selection.clear()
      setDeleteModal(false)
      load(page)
    } catch (err) {
      toast.error(getApiError(err, 'Some selected users could not be deleted. Please try again.'))
    } finally {
      setBulkDeleting(false)
    }
  }

  return (
    <AppLayout title="Users">
      <div className="page-header">
        <div>
          <h1 className="page-title">Users</h1>
          <p className="page-subtitle">{total} registered users</p>
        </div>
        <div className="search-container">
          <Search size={16} className="search-icon" />
          <input className="search-input" placeholder="Search by name or email…" value={search} onChange={handleSearch} />
        </div>
      </div>

      {loading ? (
        <RadarLoader height={220} />
      ) : (
        <>
          <AdminBulkToolbar
            count={selection.count}
            label="user"
            deleting={bulkDeleting}
            onClear={selection.clear}
            onDelete={() => setDeleteModal(true)}
          />
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th className="admin-th-checkbox">
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      aria-label="Select all users"
                      checked={selection.allSelected}
                      ref={el => { if (el) el.indeterminate = selection.someSelected }}
                      onChange={selection.toggleAll}
                    />
                  </th>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Last Login</th>
                  <th>Last Logout</th>
                  <th className="admin-th-center">Logins</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className={selection.isSelected(u.id) ? 'row-selected' : ''}>
                    <td>
                      {u.role === 'ADMIN' ? (
                        <input type="checkbox" className="table-checkbox" disabled aria-label={`${u.fullName} (admin — cannot delete)`} />
                      ) : (
                        <input
                          type="checkbox"
                          className="table-checkbox"
                          aria-label={`Select ${u.fullName}`}
                          checked={selection.isSelected(u.id)}
                          onChange={() => selection.toggle(u.id)}
                        />
                      )}
                    </td>
                    <td>
                      <div className="admin-row-flex">
                        <div className="navbar-avatar admin-avatar-sm" style={{ '--avatar-bg': u.avatarColor || '#4F46E5' }}>
                          {u.fullName?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <div className="table-name">{u.fullName}</div>
                          <div className="text-xs text-muted">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className={`badge ${u.role === 'ADMIN' ? 'badge-admin' : u.role === 'GUEST' ? 'badge-warning' : 'badge-student'}`}>{u.role}</span></td>
                    <td><span className={`badge ${u.isActive ? 'badge-success' : 'badge-danger'}`}>{u.isActive ? 'Active' : 'Inactive'}</span></td>
                    <td className="text-sm text-muted">{fmtDate(u.createdAt)}</td>
                    <td className="text-sm text-muted" title={u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : ''}>
                      {fmtDateTime(u.lastLoginAt)}
                    </td>
                    <td className="text-sm text-muted" title={u.lastLogoutAt ? new Date(u.lastLogoutAt).toLocaleString() : ''}>
                      {fmtDateTime(u.lastLogoutAt)}
                    </td>
                    <td className="admin-th-center">
                      <span className={`admin-login-count ${u.loginCount > 0 ? 'admin-login-count--active' : 'admin-login-count--muted'}`}>
                        {u.loginCount ?? 0}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex-center admin-pagination">
              <button className="btn btn-ghost btn-sm" disabled={page === 0} onClick={() => load(page - 1)}>← Prev</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} className={`btn btn-sm ${page === i ? 'btn-primary' : 'btn-ghost'}`} onClick={() => load(i)}>{i + 1}</button>
              ))}
              <button className="btn btn-ghost btn-sm" disabled={page === totalPages - 1} onClick={() => load(page + 1)}>Next →</button>
            </div>
          )}
        </>
      )}

      <AdminDeleteModal
        open={deleteModal}
        title="Delete selected users?"
        subtitle="Admin accounts cannot be deleted and are excluded from selection. All other selected users and their progress data will be permanently removed."
        items={deleteTargets}
        deleting={bulkDeleting}
        onConfirm={confirmBulkDelete}
        onClose={() => !bulkDeleting && setDeleteModal(false)}
      />
    </AppLayout>
  )
}
