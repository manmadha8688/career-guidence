import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bookmark, ChevronRight, Trash2, BookmarkX } from 'lucide-react'
import Navbar from '../components/navbars/Navbar'
import { getBookmarks, removeBookmarkById } from '../api/api'
import { invalidateBookmarkCache } from '../components/BookmarkButton'
import { getApiError } from '../utils/apiError'
import toast from 'react-hot-toast'

const TYPE_META = {
  SUBJECT: { label: 'Dungeon Gates (Subjects)', link: (id) => `/skill-arena/dashboard?view=gates&subject=${id}`, fallbackIcon: '📚' },
  ROADMAP: { label: 'Hunter Paths (Roadmaps)',  link: (id) => `/skill-arena/roadmaps/${id}`,                     fallbackIcon: '🗺️' },
  MISSION: { label: 'Missions',                 link: (id) => `/missions/${id}`,                                 fallbackIcon: '🎯' },
  PROBLEM: { label: 'Code Gym Problems',        link: (id) => `/code-gym/${id}`,                                  fallbackIcon: '💻' },
  AITOOL:  { label: 'AI Tools',                 link: (id) => `/ai-lab/${id}`,                                   fallbackIcon: '🤖' },
  GUIDE:   { label: 'Deployment Guides',        link: (id) => id,                                                fallbackIcon: '🚀' },
  APTITUDE:{ label: 'Aptitude',                 link: (id) => id,                                                fallbackIcon: '🧠' },
}
const ORDER = ['SUBJECT', 'ROADMAP', 'MISSION', 'PROBLEM', 'AITOOL', 'GUIDE', 'APTITUDE']

function formatDate(iso) {
  if (!iso) return ''
  try { return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) }
  catch { return '' }
}

export default function MyBookmarksPage() {
  const navigate = useNavigate()
  const [items, setItems]     = useState([])
  const [loading, setLoading] = useState(true)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    let active = true
    getBookmarks()
      .then(r => { if (active) setItems(r.data || []) })
      .catch(err => { if (active) toast.error(getApiError(err, 'We could not load your bookmarks.')) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false; mountedRef.current = false }
  }, [])

  const remove = async (bm) => {
    try {
      await removeBookmarkById(bm.id)
      invalidateBookmarkCache()
      if (mountedRef.current) setItems(list => list.filter(x => x.id !== bm.id))
      toast.success('Removed from bookmarks')
    } catch (err) {
      if (mountedRef.current) toast.error(getApiError(err, 'We could not remove this bookmark.'))
    }
  }

  const grouped = ORDER
    .map(type => ({ type, meta: TYPE_META[type], list: items.filter(b => b.type === type) }))
    .filter(g => g.list.length > 0)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar sticky />

      <div className="feat-page">
        <div className="feat-page-header">
          <h1 className="feat-page-title"><Bookmark size={22} /> My Bookmarks</h1>
          <p className="feat-page-sub">Everything you saved to revisit later, grouped by type.</p>
        </div>

        {loading && <div className="feat-loading">Loading your bookmarks…</div>}

        {!loading && items.length === 0 && (
          <div className="feat-empty">
            <div className="feat-empty__icon"><BookmarkX size={40} /></div>
            You have not saved anything yet. Look for the <strong>Save</strong> button on subjects, roadmaps, missions and problems.
          </div>
        )}

        {!loading && grouped.map(group => (
          <div key={group.type} className="feat-group">
            <div className="feat-group-label">
              {group.meta.label}
              <span className="feat-group-count">{group.list.length}</span>
            </div>
            {group.list.map(bm => (
              <div key={bm.id} className="feat-result-card" style={{ cursor: 'default' }}>
                <button
                  type="button"
                  className="feat-result-icon"
                  onClick={() => navigate(group.meta.link(bm.refId))}
                  aria-label={`Open ${bm.title}`}
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  {bm.icon || group.meta.fallbackIcon}
                </button>
                <button
                  type="button"
                  className="feat-result-body"
                  onClick={() => navigate(group.meta.link(bm.refId))}
                  style={{ background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', color: 'inherit' }}
                >
                  <div className="feat-result-title">{bm.title || 'Untitled'}</div>
                  <div className="feat-result-sub">
                    {bm.description ? `${bm.description} · ` : ''}Saved {formatDate(bm.createdAt)}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => remove(bm)}
                  className="feat-bookmark-btn"
                  aria-label="Remove bookmark"
                  title="Remove"
                >
                  <Trash2 size={14} />
                </button>
                <ChevronRight size={16} className="feat-result-arrow" onClick={() => navigate(group.meta.link(bm.refId))} style={{ cursor: 'pointer' }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
