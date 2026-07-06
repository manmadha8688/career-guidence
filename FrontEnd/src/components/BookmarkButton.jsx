import { useState, useEffect, useRef } from 'react'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { getBookmarks, addBookmark, removeBookmark } from '../api/api'
import { useAuth } from '../context/AuthContext'
import { getApiError } from '../utils/apiError'
import toast from 'react-hot-toast'

// Lightweight per-session cache so multiple buttons don't each hit the API.
let _cache = null
async function loadBookmarkSet() {
  if (_cache) return _cache
  const res = await getBookmarks()
  _cache = new Set((res.data || []).map(b => `${b.type}:${b.refId}`))
  return _cache
}
export function invalidateBookmarkCache() { _cache = null }

/**
 * Toggle a "save for later" bookmark for a piece of content.
 * type: SUBJECT | ROADMAP | MISSION | PROBLEM
 */
export default function BookmarkButton({ type, refId, title, description, icon, className = '', iconOnly = false, stopPropagation = false }) {
  const { isAuthenticated } = useAuth()
  const [saved, setSaved]     = useState(false)
  const [busy, setBusy]       = useState(false)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  useEffect(() => {
    if (!isAuthenticated || !refId) return
    let active = true
    loadBookmarkSet()
      .then(set => { if (active) setSaved(set.has(`${type}:${refId}`)) })
      .catch(() => {})
    return () => { active = false }
  }, [isAuthenticated, type, refId])

  if (!isAuthenticated) return null

  const toggle = async (e) => {
    if (stopPropagation) { e?.stopPropagation?.() }
    if (busy) return
    setBusy(true)
    try {
      if (saved) {
        await removeBookmark(type, refId)
        _cache?.delete(`${type}:${refId}`)
        if (mountedRef.current) setSaved(false)
        toast.success('Removed from bookmarks')
      } else {
        await addBookmark({ type, refId, title, description, icon })
        _cache?.add(`${type}:${refId}`)
        if (mountedRef.current) setSaved(true)
        toast.success('Saved to bookmarks')
      }
    } catch (err) {
      if (mountedRef.current) toast.error(getApiError(err, 'We could not update your bookmark. Please try again.'))
    } finally {
      if (mountedRef.current) setBusy(false)
    }
  }

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={toggle}
        disabled={busy}
        aria-pressed={saved}
        aria-label={saved ? 'Remove bookmark' : 'Save bookmark'}
        title={saved ? 'Saved' : 'Save for later'}
        className={`feat-bookmark-icon${saved ? ' is-saved' : ''} ${className}`}
      >
        {saved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-pressed={saved}
      aria-label={saved ? 'Remove bookmark' : 'Save bookmark'}
      className={`feat-bookmark-btn${saved ? ' is-saved' : ''} ${className}`}
    >
      {saved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
      {saved ? 'Saved' : 'Save'}
    </button>
  )
}
