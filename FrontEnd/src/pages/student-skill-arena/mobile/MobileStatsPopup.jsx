import { X } from 'lucide-react'
import useBodyLock from '../../../hooks/useBodyLock'

export default function MobileStatsPopup({ user, rank, level, xp, stats, hunterStats, onClose }) {
  const xpToNext = rank.next ? rank.next - xp : null
  const allBadges = hunterStats ? [...(hunterStats.badges || []), ...(hunterStats.roadmapBadges || [])] : []
  useBodyLock()
  return (
    <>
      <div onClick={onClose} className="dash-overlay-backdrop dash-overlay-backdrop--quests" />
      <div className="dash-sheet dash-sheet--purple dash-sheet--stats">
        <div className="dash-sheet__header">
          <span className="dash-sheet__title">[ STATUS WINDOW ]</span>
          <button onClick={onClose} className="dash-sheet__close"><X size={16} /></button>
        </div>
        <div className="dash-sheet__body dash-sheet__body--scroll">
          <div className="dash-mob-stats-level-card">
            <div className="dash-mob-stats-level-num-wrap">
              <div className="dash-mob-stats-level-num">{level}</div>
              <div className="dash-mob-stats-level-label">HUNTER LEVEL</div>
            </div>
            <div className="dash-flex-1">
              <div className="dash-mob-stats-xp-row">
                <span className="dash-mob-stats-xp">{xp.toLocaleString()} XP</span>
                <span className={`rank-badge ${rank.cls} dash-rank-badge-xs`}>{rank.label}</span>
              </div>
              <div className="dash-progress-track dash-progress-track--md">
                <div
                  className="dash-progress-fill"
                  style={{ '--progress-pct': `${rank.progress}%`, '--accent': rank.color, '--accent-80': `${rank.color}80` }}
                />
              </div>
              <div className="dash-mob-stats-xp-hint">
                {xpToNext != null ? `${xpToNext.toLocaleString()} XP to next rank` : 'MAX RANK ACHIEVED'}
              </div>
            </div>
          </div>

          <div className="dash-mob-stats-section-title">— COMBAT STATS —</div>
          {stats.map(stat => {
            const isUntouched = stat.totalAll === 0
            return (
              <div key={stat.key} className="dash-mob-stat-card" style={{ '--stat-color': stat.statColor }}>
                <div className="dash-mob-stat-card__header">
                  <div>
                    <span className="dash-mob-stat-card__key">{stat.key}</span>
                    <span className="dash-mob-stat-card__domain">{stat.label}</span>
                  </div>
                  <span className="dash-mob-stat-card__pct">{isUntouched ? '0%' : `${stat.pct}%`}</span>
                </div>
                <div className="dash-progress-track">
                  <div
                    className="dash-progress-fill dash-progress-fill--stat"
                    style={{
                      '--progress-pct': `${isUntouched ? 0 : stat.pct}%`,
                      '--accent': stat.statColor,
                      '--accent-50': `${stat.statColor}50`,
                    }}
                  />
                </div>
                <div className="dash-mob-stat-card__meta">{stat.totalDone}/{stat.totalAll} skills · {stat.domain}</div>
              </div>
            )
          })}

          <div className="dash-mob-stats-section-title dash-mob-stats-section-title--badges">— BADGES —</div>
          {allBadges.length === 0 ? (
            <div className="dash-mob-stats-empty">🔒 NO BADGES YET</div>
          ) : allBadges.map(b => {
            const key = b.subjectId ?? b.roadmapId
            const scorePct = b.total > 0 ? Math.round((b.score / b.total) * 100) : 0
            const isRoadmap = b.type === 'ROADMAP'
            const badgeColor = b.color || '#9B6ED4'
            return (
              <div
                key={key}
                className="dash-mob-badge-card"
                style={{ '--badge-bg': `${badgeColor}0D`, '--badge-border': `${badgeColor}28`, '--badge-color': badgeColor }}
              >
                <div className="dash-mob-badge-card__icon">{b.icon || (isRoadmap ? '🗺️' : '📚')}</div>
                <div className="dash-flex-1">
                  <div className="dash-mob-badge-card__title">{b.title}</div>
                  {!isRoadmap && (
                    <div className="dash-progress-track dash-progress-track--sm">
                      <div className="dash-progress-fill" style={{ '--progress-pct': `${scorePct}%`, '--accent': badgeColor }} />
                    </div>
                  )}
                </div>
                <span className="dash-mob-badge-card__score">{b.score}/{b.total}</span>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
