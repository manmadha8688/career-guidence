import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Award, Calendar, Trophy, ShieldX, Github, Linkedin, Globe, Zap, Medal, ScrollText, ExternalLink, Share2, Check, Mail } from 'lucide-react'
import { getPublicProfile } from '../api/api'
import { getRank } from '../utils/slRank'
import '../styles/pages/shared/public-profile.css'

const EASE = [0.16, 1, 0.3, 1]

const PROFILE_LINKS = [
  { key: 'githubUrl', label: 'GitHub', icon: Github },
  { key: 'linkedinUrl', label: 'LinkedIn', icon: Linkedin },
  { key: 'portfolioUrl', label: 'Portfolio', icon: Globe },
]

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
  const reduce = useReducedMotion()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareProfile = async () => {
    const url = window.location.href
    const name = profile?.fullName || 'this hunter'
    // Native share sheet (WhatsApp, Telegram, X, email, …) when the device supports it.
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${name} on LearnForEarn`,
          text: `Check out ${name}'s hunter profile on LearnForEarn`,
          url,
        })
      } catch { /* user cancelled or share failed — do nothing */ }
      return
    }
    // Fallback (mostly desktop): copy the link.
    try {
      await navigator.clipboard?.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard unavailable — no-op */ }
  }

  useEffect(() => {
    let active = true
    setLoading(true); setNotFound(false)
    getPublicProfile(username)
      .then(r => { if (active) setProfile(r.data) })
      .catch(() => { if (active) setNotFound(true) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [username])

  const rank = profile ? getRank(profile.xp || 0) : null
  const nextRank = rank?.next ? getRank(rank.next) : null
  const toNext = rank?.next ? Math.max(0, rank.next - (profile.xp || 0)) : 0

  const anim = (delay = 0) => reduce
    ? {}
    : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay, ease: EASE } }

  return (
    <div className="pp-page">
      <header className="pp-topbar">
        <Link to="/" className="pp-brand"><span className="pp-brand__mark">⚔</span> LearnForEarn</Link>
        <Link to="/" className="pp-topbar__cta">Join free →</Link>
      </header>

      <div className="pp-shell">
        {loading && <div className="pp-state">Loading profile…</div>}

        {!loading && notFound && (
          <div className="pp-state pp-state--empty">
            <span className="pp-state__icon"><ShieldX size={38} /></span>
            <p>This hunter profile does not exist or is no longer available.</p>
          </div>
        )}

        {!loading && profile && rank && (
          <>
            <motion.p className="pp-pagetitle" {...anim(0)}>◆ HUNTER PROFILE</motion.p>

            <motion.section className="pp-hero-card" style={{ '--rank': rank.color }} {...anim(0.05)}>
              {/* creative animated backdrop */}
              {!reduce && (
                <div className="pp-aura" aria-hidden="true">
                  <span className="pp-aura__glow" />
                  {Array.from({ length: 7 }).map((_, i) => (
                    <span key={i} className="pp-spark" style={{ '--i': i }} />
                  ))}
                </div>
              )}

              <button type="button" className="pp-share" onClick={shareProfile}
                aria-label="Share profile" title="Share this profile">
                {copied ? <><Check size={14} /> Copied</> : <><Share2 size={14} /> Share</>}
              </button>

              <div className="pp-hero-grid">
                {/* identity */}
                <div className="pp-hero__id">
                  <div className="pp-avatar-wrap">
                    {!reduce && <span className="pp-avatar__aura" aria-hidden="true" />}
                    <div className="pp-avatar" style={{ background: profile.avatarColor || '#4F46E5' }}>
                      {initials(profile.fullName)}
                    </div>
                    <span className="pp-avatar__rank" title={`Rank ${rank.label}`}>{rank.label}</span>
                  </div>

                  <div className="pp-hero__idtext">
                    <h1 className="pp-name">{profile.fullName}</h1>
                    <p className="pp-handle">@{profile.username}</p>
                    {profile.bio && <p className="pp-bio">{profile.bio}</p>}
                    {formatDate(profile.joinedAt) && (
                      <p className="pp-joined"><Calendar size={13} /> Hunting since {formatDate(profile.joinedAt)}</p>
                    )}
                    <div className="pp-links">
                      {PROFILE_LINKS.some(l => profile[l.key]) ? (
                        PROFILE_LINKS.filter(l => profile[l.key]).map(({ key, label, icon: Icon }) => (
                          <a key={key} className="pp-link" href={profile[key]}
                            target="_blank" rel="noopener noreferrer nofollow">
                            <Icon size={14} /> {label}
                          </a>
                        ))
                      ) : (
                        <span className="pp-hero__links-empty">No career links yet</span>
                      )}
                    </div>
                    {profile.email && (
                      <a className="pp-email" href={`mailto:${profile.email}`}>
                        <Mail size={14} /> {profile.email}
                      </a>
                    )}
                  </div>
                </div>

                {/* rank + xp + stats panel */}
                <div className="pp-hero__panel">
                  <div className="pp-rankline">
                    <div className="pp-rankline__head">
                      <span className="pp-rankchip">Rank {rank.label}</span>
                      <span className="pp-rankline__xp">
                        {nextRank
                          ? <>{toNext.toLocaleString('en-IN')} XP to Rank {nextRank.label}</>
                          : <>Max rank — S-Class</>}
                      </span>
                    </div>
                    <div className="pp-xpbar">
                      <motion.span className="pp-xpbar__fill"
                        initial={reduce ? false : { width: 0 }}
                        animate={reduce ? false : { width: `${rank.progress}%` }}
                        style={reduce ? { width: `${rank.progress}%` } : undefined}
                        transition={{ duration: 0.9, delay: 0.3, ease: EASE }} />
                    </div>
                  </div>

                  <div className="pp-stats">
                    {[
                      { icon: Trophy, value: rank.label, label: 'Rank' },
                      { icon: Zap, value: (profile.xp || 0).toLocaleString('en-IN'), label: 'XP' },
                      { icon: Medal, value: profile.level, label: 'Level' },
                      { icon: Award, value: profile.badgeCount ?? profile.badges?.length ?? 0, label: 'Badges' },
                    ].map((s, i) => (
                      <motion.div key={i} className="pp-stat"
                        {...(reduce ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: 0.35 + i * 0.08, ease: EASE } })}>
                        <s.icon className="pp-stat__icon" size={16} />
                        <span className="pp-stat__value">{s.value}</span>
                        <span className="pp-stat__label">{s.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* certificates — verifiable credentials */}
            <motion.div className="pp-section" {...anim(0.12)}>
              <div className="pp-section__label">
                <ScrollText size={15} /> Certificates
              </div>
              {(!profile.certificates || profile.certificates.length === 0) ? (
                <div className="pp-state pp-state--empty pp-state--inline">
                  <p>No certificates earned yet.</p>
                </div>
              ) : (
                <div className="badge-grid badge-grid--panel">
                  {profile.certificates.map((c, i) => (
                    <a key={i} className="badge-card pp-cert" href={`/certificate/verify/${c.code}`}
                      target="_blank" rel="noopener noreferrer" style={{ '--bc': c.color || '#9B6ED4' }}>
                      <div className="badge-card__glow" aria-hidden="true" />
                      <div className="badge-card__medal">
                        <span className="badge-card__medal-icon">{c.icon || '📜'}</span>
                        <span className="badge-card__medal-ring" aria-hidden="true" />
                      </div>
                      <div className="badge-card__kind">{c.kind || 'Certificate'}</div>
                      <div className="badge-card__title">{c.title}</div>
                      <div className="badge-card__subtitle">
                        {c.scorePercent > 0 ? `${c.scorePercent}% · ` : ''}{formatDate(c.issuedAt) || 'Issued'}
                      </div>
                      <span className="pp-cert__verify"><ExternalLink size={12} /> Verify</span>
                    </a>
                  ))}
                </div>
              )}
            </motion.div>

            {/* badges */}
            <motion.div className="pp-section" {...anim(0.16)}>
              <div className="pp-section__label">
                <Award size={15} /> Badges Earned
              </div>
              {(!profile.badges || profile.badges.length === 0) ? (
                <div className="pp-state pp-state--empty pp-state--inline">
                  <p>No badges earned yet.</p>
                </div>
              ) : (
                <div className="badge-grid badge-grid--panel">
                  {profile.badges.map((b, i) => (
                    <div key={i} className="badge-card" style={{ '--bc': b.color || '#9B6ED4' }}>
                      <div className="badge-card__glow" aria-hidden="true" />
                      <div className="badge-card__medal">
                        <span className="badge-card__medal-icon">{b.icon || '🏅'}</span>
                        <span className="badge-card__medal-ring" aria-hidden="true" />
                      </div>
                      <div className="badge-card__kind">Subject Mastery</div>
                      <div className="badge-card__title">{b.title}</div>
                      <div className="badge-card__subtitle">
                        {b.total > 0 ? `Scored ${b.score}/${b.total}` : (formatDate(b.earnedAt) || 'Earned')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

          </>
        )}

        <Link to="/" className="pp-powered">
          Powered by <strong>LearnForEarn</strong> — build your own hunter profile, free →
        </Link>
      </div>
    </div>
  )
}
