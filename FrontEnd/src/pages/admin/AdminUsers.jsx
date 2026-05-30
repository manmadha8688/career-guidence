import { useState, useEffect, useCallback } from 'react'
import { Search, Trash2, Eye } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import { getAdminUsers, deleteUser } from '../../api/api'
import toast from 'react-hot-toast'

function debounce(fn, d) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), d) } }

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState({})
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
      .catch(() => toast.error('Failed to load users'))
      .finally(() => setLoading(false))
  }, [search])

  useEffect(() => { load(0) }, [])

  const debouncedSearch = useCallback(debounce(q => load(0, q), 400), [])

  const handleSearch = e => {
    setSearch(e.target.value)
    debouncedSearch(e.target.value)
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete user "${name}"? This cannot be undone.`)) return
    setDeleting(p => ({ ...p, [id]: true }))
    try {
      await deleteUser(id)
      toast.success('User deleted')
      load(page)
    } catch {
      toast.error('Failed to delete user')
    } finally {
      setDeleting(p => ({ ...p, [id]: false }))
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
        <div className="flex-center" style={{ height: '40vh' }}><div className="loading-spinner-lg" /></div>
      ) : (
        <>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>College</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="navbar-avatar" style={{ width: 34, height: 34, fontSize: '0.8rem', background: u.avatarColor || '#4F46E5', flexShrink: 0 }}>
                          {u.fullName?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <div className="table-name">{u.fullName}</div>
                          <div className="text-xs text-muted">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-muted">{u.collegeName || '—'}</td>
                    <td><span className={`badge ${u.role === 'ADMIN' ? 'badge-admin' : 'badge-student'}`}>{u.role}</span></td>
                    <td><span className={`badge ${u.isActive ? 'badge-success' : 'badge-danger'}`}>{u.isActive ? 'Active' : 'Inactive'}</span></td>
                    <td className="text-sm text-muted">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id, u.fullName)} disabled={deleting[u.id]}>
                        {deleting[u.id] ? <span className="loading-spinner" /> : <Trash2 size={13} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex-center" style={{ gap: '0.5rem', marginTop: '1.5rem' }}>
              <button className="btn btn-ghost btn-sm" disabled={page === 0} onClick={() => load(page - 1)}>← Prev</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} className={`btn btn-sm ${page === i ? 'btn-primary' : 'btn-ghost'}`} onClick={() => load(i)}>{i + 1}</button>
              ))}
              <button className="btn btn-ghost btn-sm" disabled={page === totalPages - 1} onClick={() => load(page + 1)}>Next →</button>
            </div>
          )}
        </>
      )}
    </AppLayout>
  )
}
