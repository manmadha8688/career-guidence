import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: '5rem',
        right: '1.5rem',
        zIndex: 89,
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        color: 'var(--text-muted)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        transition: 'background 0.15s, color 0.15s, border-color 0.15s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--primary)'
        e.currentTarget.style.borderColor = 'var(--primary)'
        e.currentTarget.style.color = '#fff'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--bg-card)'
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.color = 'var(--text-muted)'
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 12V4M4 8l4-4 4 4"
          stroke="currentColor" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
