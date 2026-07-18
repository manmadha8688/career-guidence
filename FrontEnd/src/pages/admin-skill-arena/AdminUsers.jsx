import { useState, useEffect, useCallback, useMemo } from 'react'
import { TEST_DELAY_MS } from '../../components/loaders/_config'
import RadarLoader from '../../components/loaders/RadarLoader'
import { Search, Users, TrendingUp, Shield, UserRound } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import AppLayout from '../../components/AppLayout'
import AdminPageToolbar from '../../components/admin/AdminPageToolbar'
import '../../styles/pages/admin/index.css'
import AdminFilterStatCards from '../../components/admin/AdminFilterStatCards'
import AdminBulkToolbar from '../../components/admin/AdminBulkToolbar'
import AdminDeleteModal from '../../components/admin/AdminDeleteModal'
import blurOnEnter from '../../utils/blurOnEnter'
import useAdminSelection from '../../hooks/useAdminSelection'
import { getAdminUsers, getAdminStats, deleteUser } from '../../api/api'
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

const providerBadgeClass = (p) => {
  if (p === 'guest') return 'badge-warning'
  if (p === 'google' || p === 'email + google') return 'badge-primary'
  return 'badge-student'
}

const SHOWING = {
  all:     n => `Showing ${n} account${n !== 1 ? 's' : ''}`,
  student: n => `Showing ${n} registered student${n !== 1 ? 's' : ''}`,
  guest:   n => `Showing ${n} guest session${n !== 1 ? 's' : ''}`,
  admin:   n => `Showing ${n} admin${n !== 1 ? 's' : ''}`,
}

export default function AdminUsers() {
  const [searchParams, setSearchParams] = useSearchParams()
  const rawFilter = searchParams.get('filter') || 'all'
  const filter = rawFilter === 'registered' ? 'student' : rawFilter

  const [platformStats, setPlatformStats] = useState(null)
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState(false)
  const [bulkDeleting, setBulkDeleting] = useState(false)
  const SIZE = 10

  const adminCount = useMemo(() => {
    if (!platformStats) return 0
    return Math.max(0, (platformStats.totalUsers ?? 0) - (platformStats.totalStudents ?? 0) - (platformStats.totalGuests ?? 0))
  }, [platformStats])

  const filterCards = useMemo(() => [
    { id: 'all',     label: 'Total Users',           value: platformStats?.totalUsers ?? 0,     color: '#4F46E5', icon: Users },
    { id: 'student', label: 'Registered Students',   value: platformStats?.totalStudents ?? 0, color: '#059669', icon: TrendingUp },
    { id: 'guest',   label: 'Guest Visits',          value: platformStats?.totalGuests ?? 0,    color: '#CA8A04', icon: UserRound },
    { id: 'admin',   label: 'Admins',                value: adminCount,                         color: '#9B6ED4', icon: Shield },
  ], [platformStats, adminCount])

  const loadStats = useCallback(() => {
    getAdminStats()
      .then(r => setPlatformStats(r.data))
      .catch(() => {})
  }, [])

  const load = useCallback((p = 0, q = search) => {
    setLoading(true)
    getAdminUsers(p, SIZE, q, filter)
      .then(r => {
        setUsers(r.data.content)
        setTotal(r.data.totalElements)
        setTotalPages(r.data.totalPages)
        setPage(p)
      })
      .catch(err => toast.error(getApiError(err, 'We could not load users. Please refresh.')))
      .finally(() => setTimeout(() => setLoading(false), TEST_DELAY_MS))
  }, [search, filter])

  useEffect(() => { loadStats() }, [loadStats])

  const debouncedSearch = useCallback(debounce(q => load(0, q), 400), [load])

  const handleSearch = e => {
    setSearch(e.target.value)
    debouncedSearch(e.target.value)
  }

  const setRoleFilter = (id) => {
    if (id === filter) return
    setSearchParams(id === 'all' ? {} : { filter: id }, { replace: true })
  }

  const selectableUsers = useMemo(() => users.filter(u => u.role !== 'ADMIN'), [users])
  const filteredIds = useMemo(() => selectableUsers.map(u => u.id), [selectableUsers])
  const selection = useAdminSelection(filteredIds)

  useEffect(() => {
    selection.clear()
    load(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

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
      loadStats()
      load(page)
    } catch (err) {
      toast.error(getApiError(err, 'Some selected users could not be deleted. Please try again.'))
    } finally {
      setBulkDeleting(false)
    }
  }

  const showingFn = SHOWING[filter] || SHOWING.all

  return (
    <AppLayout title="Users">
      <AdminPageToolbar subtitle={showingFn(total)}>
        <div className="search-container">
          <Search size={16} className="search-icon" />
          <input className="search-input" placeholder="Search by name or email…" value={search} onChange={handleSearch} onKeyDown={blurOnEnter} />
        </div>
      </AdminPageToolbar>

      <AdminFilterStatCards
        items={filterCards}
        active={filter}
        onSelect={setRoleFilter}
        ariaLabel="Filter users by role"
      />

      {loading ? (
        <RadarLoader height={220} />
      ) : users.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👤</div>
          <div className="empty-state-text">No users match this filter</div>
          <div className="empty-state-sub">Try another category or clear your search.</div>
        </div>
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
                  <th>Method</th>
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
                    <td><span className={`badge ${providerBadgeClass(u.provider)}`}>{u.provider || 'email'}</span></td>
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
