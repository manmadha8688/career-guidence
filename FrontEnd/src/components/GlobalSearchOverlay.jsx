import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { Search, X, CornerDownLeft, SearchX } from 'lucide-react'
import { globalSearch } from '../api/api'
import { useAuth } from '../context/AuthContext'
import { searchStudentCatalog } from '../utils/studentSearchCatalog'
import useBodyLock from '../hooks/useBodyLock'
import useBackClose from '../hooks/useBackClose'

const MIN_LEN = 2

const GROUPS = [
  { key: 'pages', label: 'Pages', link: (i) => i.path },
  { key: 'subjects', label: 'Dungeon Gates', link: (i) => `/skill-arena/dashboard?view=gates&subject=${i.id}` },
  { key: 'concepts', label: 'Concepts', link: (i) => `/skill-arena/dashboard?view=gates&subject=${i.subjectId}&concept=${i.id}` },
  { key: 'roadmaps', label: 'Hunter Paths', link: (i) => `/skill-arena/roadmaps/${i.id}` },
  { key: 'aptitude', label: 'Aptitude', link: (i) => `/aptitude/${i.category}/${i.group}/${i.topic}` },
  { key: 'tracks', label: 'Code Gym Tracks', link: (i) => `/code-gym/${i.id}` },
  { key: 'problems', label: 'Code Gym', link: (i) => `/code-gym/${i.id}` },
  { key: 'missions', label: 'Missions', link: (i) => `/missions/${i.id}` },
  { key: 'ailab', label: 'AI Lab', link: (i) => `/ai-lab/${i.category}/${i.id}` },
  { key: 'deployment', label: 'Deploy Guides', link: (i) => i.path },
]

// `openGlobalSearch` lives in ./globalSearchBus (dependency-free) so navbars can
// trigger search without importing this heavy overlay.

export default function GlobalSearchOverlay() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const canSearch = !!user && user.role !== 'ADMIN'
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef(null)

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setResults(null)
    setActiveIdx(0)
  }, [])

  // Open triggers: custom event + Cmd/Ctrl+K (only for searchable users)
  useEffect(() => {
    if (!canSearch) return
    const onOpen = () => setOpen(true)
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('open-search', onOpen)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('open-search', onOpen)
      window.removeEventListener('keydown', onKey)
    }
  }, [canSearch])

  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => inputRef.current?.focus(), 30)
    return () => clearTimeout(t)
  }, [open])

  // Stop the page behind the search overlay from scrolling on mobile.
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches
  useBodyLock(open && isMobile)
  useBackClose(open, close)

  // Debounced search: student catalog (instant) + Mongo content (API)
  useEffect(() => {
    if (!open) return
    const q = query.trim()
    if (q.length < MIN_LEN) { setResults(null); setLoading(false); return }

    let active = true
    const local = searchStudentCatalog(q)
    setResults(local)
    setActiveIdx(0)
    setLoading(true)
    const t = setTimeout(() => {
      globalSearch(q)
        .then((r) => {
          if (!active) return
          setResults({ ...(r.data.results || {}), ...local })
        })
        .catch(() => { /* keep local catalog results */ })
        .finally(() => { if (active) setLoading(false) })
    }, 220)
    return () => { active = false; clearTimeout(t) }
  }, [query, open])

  // Flatten results for keyboard navigation (memoized so it isn't rebuilt on every
  // keystroke / activeIdx change — only when the result set actually changes).
  const flat = useMemo(() => {
    const arr = []
    if (results) {
      GROUPS.forEach(g => (results[g.key] || []).forEach(item => arr.push({ ...item, _link: g.link(item) })))
    }
    return arr
  }, [results])

  const goTo = useCallback((link) => { close(); navigate(link) }, [close, navigate])

  const onKeyDown = (e) => {
    if (e.key === 'Escape') { close(); return }
    if (!flat.length) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => (i + 1) % flat.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => (i - 1 + flat.length) % flat.length) }
    else if (e.key === 'Enter') { e.preventDefault(); const t = flat[activeIdx]; if (t) goTo(t._link) }
  }

  if (!open) return null

  const totalCount = flat.length
  const showEmpty = !loading && results && totalCount === 0
  const showHint = query.trim().length > 0 && query.trim().length < MIN_LEN

  let runningIdx = -1

  return createPortal(
    <div className="gs-overlay" onMouseDown={close}>
      <div className="gs-panel" onMouseDown={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Search">
        <div className="gs-input-row">
          <Search size={20} className="gs-input-icon" />
          <input
            ref={inputRef}
            className="gs-input"
            placeholder="Search gates, AI tools, deploy guides, aptitude, jobs…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Search"
          />
          {query
            ? <button type="button" className="gs-clear" onClick={() => { setQuery(''); inputRef.current?.focus() }}>Clear</button>
            : <button type="button" className="gs-clear gs-clear--icon" onClick={close} aria-label="Close"><X size={18} /></button>}
        </div>

        <div className="gs-body">
          {showHint && <div className="gs-empty">Type at least {MIN_LEN} characters to search.</div>}

          {!query && (
            <div className="gs-empty">
              Search learning content, AI tools, deploy guides, and career pages.
              <div className="gs-kbd-hint"><kbd>↑</kbd><kbd>↓</kbd> to navigate · <kbd>↵</kbd> to open · <kbd>esc</kbd> to close</div>
            </div>
          )}

          {loading && totalCount === 0 && <div className="gs-empty">Searching…</div>}

          {showEmpty && (
            <div className="gs-empty">
              <SearchX size={34} className="gs-empty__icon" />
              No matches for “{query.trim()}”. Try a different keyword.
            </div>
          )}

          {results && totalCount > 0 && GROUPS.map(group => {
            const items = results[group.key] || []
            if (!items.length) return null
            return (
              <div key={group.key} className="gs-group">
                <div className="gs-group-label">{group.label}</div>
                {items.map(item => {
                  runningIdx += 1
                  const idx = runningIdx
                  return (
                    <button
                      key={`${group.key}-${item.id}`}
                      type="button"
                      className={`gs-result${idx === activeIdx ? ' is-active' : ''}`}
                      onMouseEnter={() => setActiveIdx(idx)}
                      onClick={() => goTo(group.link(item))}
                    >
                      <span className="gs-result__icon">{item.icon || '•'}</span>
                      <span className="gs-result__body">
                        <span className="gs-result__title">{item.title}</span>
                        {item.subtitle && <span className="gs-result__sub">{item.subtitle}</span>}
                      </span>
                      {idx === activeIdx && <CornerDownLeft size={15} className="gs-result__enter" />}
                    </button>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>,
    document.body,
  )
}
