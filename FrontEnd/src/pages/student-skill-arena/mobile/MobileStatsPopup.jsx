import { X } from 'lucide-react'
import useBodyLock from '../../../hooks/useBodyLock'

// ─── Mobile: Stats & Badges combined popup ────────────────
export default function MobileStatsPopup({ user, rank, level, xp, stats, hunterStats, onClose }) {
  const xpToNext = rank.next ? rank.next - xp : null
  const allBadges = hunterStats ? [...(hunterStats.badges || []), ...(hunterStats.roadmapBadges || [])] : []
  useBodyLock()
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 320, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }} />
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 321, maxHeight: '82vh', background: '#090E1C', borderTop: '2px solid rgba(155,110,212,0.4)', borderRadius: '20px 20px 0 0', boxShadow: '0 -8px 48px rgba(0,0,0,0.7)', display: 'flex', flexDirection: 'column', animation: 'slideUp 0.22s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.25rem', borderBottom: '1px solid rgba(155,110,212,0.12)', flexShrink: 0 }}>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.14em', color: '#9B6ED4' }}>[ STATUS WINDOW ]</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex' }}><X size={16} /></button>
        </div>
        <div style={{ overflowY: 'auto', flex: 1, padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Level + XP */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem', background: 'rgba(155,110,212,0.07)', border: '1px solid rgba(155,110,212,0.18)', borderRadius: 12 }}>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.5rem', fontWeight: 900, color: '#B48AE8', lineHeight: 1 }}>{level}</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '0.14em', marginTop: 2 }}>HUNTER LEVEL</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem', color: '#F59E0B' }}>{xp.toLocaleString()} XP</span>
                <span className={`rank-badge ${rank.cls}`} style={{ fontSize: '0.6rem' }}>{rank.label}</span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${rank.progress}%`, background: `linear-gradient(90deg, ${rank.color}80, ${rank.color})`, borderRadius: 3, transition: 'width 1s ease' }} />
              </div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#64748B', marginTop: 4 }}>
                {xpToNext != null ? `${xpToNext.toLocaleString()} XP to next rank` : 'MAX RANK ACHIEVED'}
              </div>
            </div>
          </div>
          {/* Stat bars */}
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textAlign: 'center' }}>— COMBAT STATS —</div>
          {stats.map(stat => {
            const isUntouched = stat.totalAll === 0
            return (
              <div key={stat.key} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '0.625rem 0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div>
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: stat.statColor }}>{stat.key}</span>
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: '#64748B', marginLeft: '0.4rem' }}>{stat.label}</span>
                  </div>
                  <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.68rem', fontWeight: 700, color: stat.statColor }}>{isUntouched ? '0%' : `${stat.pct}%`}</span>
                </div>
                <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${isUntouched ? 0 : stat.pct}%`, background: `linear-gradient(90deg, ${stat.statColor}50, ${stat.statColor})`, borderRadius: 3, transition: 'width 1.2s ease' }} />
                </div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.54rem', color: '#404860', marginTop: 4 }}>{stat.totalDone}/{stat.totalAll} skills · {stat.domain}</div>
              </div>
            )
          })}

          {/* Badges section */}
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.5rem' }}>— BADGES —</div>
          {allBadges.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '1rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: '#404860', letterSpacing: '0.08em' }}>
              🔒 NO BADGES YET
            </div>
          ) : allBadges.map(b => {
            const key = b.subjectId ?? b.roadmapId
            const scorePct = b.total > 0 ? Math.round((b.score / b.total) * 100) : 0
            const isRoadmap = b.type === 'ROADMAP'
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.625rem 0.875rem', background: `${b.color || '#9B6ED4'}0D`, border: `1px solid ${b.color || '#9B6ED4'}28`, borderRadius: 8 }}>
                <div style={{ fontSize: '1.25rem', flexShrink: 0 }}>{b.icon || (isRoadmap ? '🗺️' : '📚')}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.825rem', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</div>
                  <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 2, marginTop: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${scorePct}%`, background: b.color || '#9B6ED4', borderRadius: 2 }} />
                  </div>
                </div>
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: b.color || '#9B6ED4', flexShrink: 0 }}>{b.score}/{b.total}</span>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
