// Skeleton shimmer loader for Admin pages — professional data-loading feel

import { LOADERS_ON } from './_config'
export default function AdminSkeleton({ rows = 6 }) {
  if (!LOADERS_ON) return null
  return (
    <div className="ask-root">
      {/* Stats row */}
      <div className="ask-stats">
        {[1,2,3,4].map(i => (
          <div key={i} className="ask-stat-card ask-shimmer" style={{ animationDelay: `${i * 0.08}s` }} />
        ))}
      </div>

      {/* Table skeleton */}
      <div className="ask-table">
        {/* Header */}
        <div className="ask-row ask-header">
          {[40,15,15,15,15].map((w, i) => (
            <div key={i} className="ask-cell ask-shimmer" style={{ width: `${w}%`, height: 14, animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, ri) => (
          <div key={ri} className="ask-row" style={{ animationDelay: `${ri * 0.07}s` }}>
            {[40,15,15,15,15].map((w, ci) => (
              <div key={ci} className="ask-cell ask-shimmer"
                style={{ width: `${w - (ci === 0 ? 0 : Math.random() * 5 | 0)}%`, height: 14,
                  animationDelay: `${(ri * 5 + ci) * 0.04}s` }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
