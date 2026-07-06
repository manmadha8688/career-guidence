import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Award, Calendar, Trophy, ShieldX } from 'lucide-react'
import { getPublicProfile } from '../api/api'

function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('') || '?'
}
function formatDate(iso) {
  if (!iso) return null
  try { return new Date(iso).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) }
  catch { return null }
}

export default function PublicProfilePage() {
  const { username } = useParams()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true); setNotFound(false)
    getPublicProfile(username)
      .then(r => { if (active) setProfile(r.data) })
      .catch(() => { if (active) setNotFound(true) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [username])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="feat-page">
        <div className="feat-page-header" style={{ textAlign: 'center', marginBottom: 26 }}>
          <Link to="/" style={{ fontWeight: 800, color: 'var(--accent-light)', textDecoration: 'none', fontSize: '1.05rem' }}>
            ARISE
          </Link>
        </div>

        {loading && <div className="feat-loading">Loading profile…</div>}

        {!loading && notFound && (
          <div className="feat-empty">
            <div className="feat-empty__icon"><ShieldX size={40} /></div>
            This hunter profile does not exist or is no longer available.
          </div>
        )}

        {!loading && profile && (
          <>
            <div className="feat-profile-hero">
              <div className="feat-profile-avatar" style={{ background: profile.avatarColor || '#4F46E5' }}>
                {initials(profile.fullName)}
              </div>
              <div style={{ minWidth: 0 }}>
                <h1 className="feat-profile-name">{profile.fullName}</h1>
                <p className="feat-profile-handle">@{profile.username}</p>
                {profile.bio && <p className="feat-profile-bio">{profile.bio}</p>}
                <div className="feat-profile-meta">
                  <span><Trophy size={13} style={{ verticalAlign: -2 }} /> Rank <strong>{profile.rank}</strong></span>
                  <span>Level <strong>{profile.level}</strong></span>
                  <span><strong>{profile.xp}</strong> XP</span>
                  <span><Award size={13} style={{ verticalAlign: -2 }} /> <strong>{profile.badgeCount}</strong> badges</span>
                  {formatDate(profile.joinedAt) && (
                    <span><Calendar size={13} style={{ verticalAlign: -2 }} /> Joined {formatDate(profile.joinedAt)}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="feat-group">
              <div className="feat-group-label">
                Badges Earned
                <span className="feat-group-count">{profile.badges?.length || 0}</span>
              </div>
              {(!profile.badges || profile.badges.length === 0) ? (
                <div className="feat-empty" style={{ padding: '28px 16px' }}>
                  No badges earned yet — this hunter is just getting started.
                </div>
              ) : (
                <div className="feat-badge-grid">
                  {profile.badges.map((b, i) => (
                    <div key={i} className="feat-badge-card">
                      <div className="feat-badge-title">{b.title}</div>
                      <div className="feat-badge-meta">
                        {b.total > 0 && <>Scored {b.score}/{b.total} · </>}
                        {formatDate(b.earnedAt) || 'Earned'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
