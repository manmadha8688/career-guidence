import { memo } from 'react'

export default memo(function ConceptVideo({ videoUrl, videoTitle, title }) {
  if (!videoUrl) return null
  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex', alignItems: 'center', gap: '0.875rem',
        padding: '0.75rem 1rem', borderRadius: '10px', textDecoration: 'none',
        background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)',
        marginBottom: '1rem', transition: 'background 0.15s', cursor: 'pointer',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.13)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.07)'}
    >
      {/* Red play button */}
      <div style={{
        width: 36, height: 36, borderRadius: 8, background: '#EF4444',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="#fff">
          <path d="M4 2.5l10 5.5-10 5.5V2.5z" />
        </svg>
      </div>
      {/* Label + title */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', color: '#EF4444', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>▶ WATCH ON YOUTUBE</div>
        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {videoTitle || title || 'Watch video'}
        </div>
      </div>
      {/* External link icon */}
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
  )
})
