import { useState, useEffect, useCallback } from 'react'
import { TEST_DELAY_MS } from '../../components/loaders/_config'
import AdminSkeleton from '../../components/loaders/AdminSkeleton'
import RadarLoader from '../../components/loaders/RadarLoader'
import { Search, Trash2 } from 'lucide-react'
import AppLayout from '../../components/AppLayout'
import { getAdminUsers, deleteUser } from '../../api/api'
import toast from 'react-hot-toast'

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
      .finally(() => setTimeout(() => setLoading(false), TEST_DELAY_MS))
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
        <RadarLoader height={220} />
      ) : (
        <>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Last Login</th>
                  <th>Last Logout</th>
                  <th style={{ textAlign: 'center' }}>Logins</th>
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
                    <td><span className={`badge ${u.role === 'ADMIN' ? 'badge-admin' : u.role === 'GUEST' ? 'badge-warning' : 'badge-student'}`}>{u.role}</span></td>
                    <td><span className={`badge ${u.isActive ? 'badge-success' : 'badge-danger'}`}>{u.isActive ? 'Active' : 'Inactive'}</span></td>
                    <td className="text-sm text-muted">{fmtDate(u.createdAt)}</td>
                    <td className="text-sm text-muted" title={u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : ''}>
                      {fmtDateTime(u.lastLoginAt)}
                    </td>
                    <td className="text-sm text-muted" title={u.lastLogoutAt ? new Date(u.lastLogoutAt).toLocaleString() : ''}>
                      {fmtDateTime(u.lastLogoutAt)}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{
                        fontFamily: "'Orbitron', monospace", fontSize: '0.75rem', fontWeight: 700,
                        color: u.loginCount > 0 ? 'var(--primary)' : 'var(--text-muted)',
                      }}>
                        {u.loginCount ?? 0}
                      </span>
                    </td>
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
