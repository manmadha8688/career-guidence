import { memo } from 'react'

export default memo(function ConceptVideo({ videoUrl, videoTitle, title }) {
  if (!videoUrl) return null
  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="dash-concept-video"
    >
      <div className="dash-concept-video__play">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="#fff">
          <path d="M4 2.5l10 5.5-10 5.5V2.5z" />
        </svg>
      </div>
      <div className="dash-concept-video__content">
        <div className="dash-concept-video__label">▶ WATCH ON YOUTUBE</div>
        <div className="dash-concept-video__title">
          {videoTitle || title || 'Watch video'}
        </div>
      </div>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dash-concept-video__external">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
  )
})
