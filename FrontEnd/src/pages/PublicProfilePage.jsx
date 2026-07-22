import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Award, Calendar, Trophy, ShieldX, Github, Linkedin, Globe, Medal,
  ScrollText, ExternalLink, Share2, Check, Mail, MapPin, GraduationCap,
  ChevronRight, Rocket, Code2, Rows3, FileText, Zap, Sparkles, Link2,
} from 'lucide-react'
import { getPublicProfile } from '../api/api'
import { RANK_LADDER } from '../constants/ranks'
import { getRank } from '../utils/slRank'
import { safeExternalUrl } from '../utils/safeExternalUrl'
import '../styles/pages/shared/public-profile.css'

const EASE = [0.16, 1, 0.3, 1]

const PROFILE_LINKS = [
  { key: 'githubUrl', label: 'GitHub', icon: Github },
  { key: 'linkedinUrl', label: 'LinkedIn', icon: Linkedin },
  { key: 'portfolioUrl', label: 'Portfolio', icon: Globe },
]

const RANK_TITLE = { E: 'Awakened', D: 'Rising', C: 'Elite', B: 'Ace', A: 'Master', S: 'Monarch' }

function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('') || '?'
}
function formatDate(iso) {
  if (!iso) return null
  try { return new Date(iso).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) }
  catch { return null }
}
function degreeLine(edu) {
  if (!edu) return ''
  return [edu.degree, edu.fieldOfStudy].filter(Boolean).join(' in ')
}
function formatEduYears(edu) {
  if (!edu) return null
  const years = edu.years?.trim()
  if (years) return years
  const start = edu.yearStart?.trim()
  const end = (edu.yearEnd || edu.graduationYear || '').trim()
  if (start && end) return `${start} – ${end}`
  if (end) return end
  if (start) return start
  return null
}
const host = (url) => { try { return new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`).hostname.replace(/^www\./, '') } catch { return url } }

// Animated number count-up (honors reduced motion).
function CountUp({ value, reduce }) {
  const to = Number(value) || 0
  const [n, setN] = useState(reduce ? to : 0)
  useEffect(() => {
    if (reduce) { setN(to); return undefined }
    let raf, start
    const dur = 1050
    const tick = (t) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(to * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, reduce])
  return <>{n.toLocaleString('en-IN')}</>
}

export default function PublicProfilePage() {
  const { username } = useParams()
  const reduce = useReducedMotion()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [copied, setCopied] = useState(false)
  const heroRef = useRef(null)

  const shareProfile = async () => {
    const url = window.location.href
    const name = profile?.fullName || 'this hunter'
    if (navigator.share) {
      try { await navigator.share({ title: `${name} on LearnForEarn`, text: `Check out ${name}'s hunter profile on LearnForEarn`, url }) }
      catch { /* cancelled */ }
      return
    }
    try { await navigator.clipboard?.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1800) }
    catch { /* no clipboard */ }
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

  // Pointer-driven spotlight + crest parallax on the hero (skipped when reduced motion).
  const onHeroMove = (e) => {
    if (reduce) return
    const el = heroRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const mx = (e.clientX - r.left) / r.width
    const my = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${(mx * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${(my * 100).toFixed(1)}%`)
    el.style.setProperty('--px', `${((mx - 0.5) * 18).toFixed(1)}px`)
    el.style.setProperty('--py', `${((my - 0.5) * 18).toFixed(1)}px`)
  }
  const onHeroLeave = () => {
    const el = heroRef.current
    if (!el) return
    el.style.setProperty('--px', '0px')
    el.style.setProperty('--py', '0px')
  }

  // ── derived ──
  const rank = profile ? getRank(profile.xp || 0) : null
  const xp = profile?.xp || 0
  const toNext = rank && rank.next ? rank.next - xp : 0

  const edu = profile?.education
  const eduYears = formatEduYears(edu)
  const hasAbout = !!(edu && (edu.degree || edu.fieldOfStudy || edu.institution || edu.years || edu.graduationYear || edu.cgpa))
  const links = profile ? PROFILE_LINKS.filter(l => profile[l.key]) : []
  const work = profile?.missionWork || []
  const certs = profile?.certificates || []
  const badges = profile?.badges || []
  const resume = profile?.resume && profile.resume.slug ? profile.resume : null
  const emailHref = profile?.publicEmail ? safeExternalUrl(`mailto:${profile.publicEmail}`) : null
  const hasConnect = links.length > 0 || !!emailHref

  const stats = profile ? [
    { icon: Medal, value: profile.level ?? 1, label: 'Level' },
    { icon: Zap, value: xp, label: 'Total XP' },
    { icon: Rocket, value: work.length, label: 'Builds shipped' },
    { icon: ScrollText, value: profile.certificateCount ?? certs.length, label: 'Certificates' },
    { icon: Award, value: profile.badgeCount ?? badges.length, label: 'Badges' },
  ] : []

  const reveal = (delay = 0) => reduce
    ? {}
    : { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.6, delay, ease: EASE } }

  const tilt = reduce ? {} : {
    onMouseMove: (e) => {
      const el = e.currentTarget, r = el.getBoundingClientRect()
      el.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -6}deg`)
      el.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 6}deg`)
    },
    onMouseLeave: (e) => { e.currentTarget.style.setProperty('--rx', '0deg'); e.currentTarget.style.setProperty('--ry', '0deg') },
  }

  const particles = reduce ? [] : Array.from({ length: 18 })

  return (
    <div className="pp-page">
      <header className="pp-topbar">
        <Link to="/" className="pp-brand"><span className="pp-brand__mark">⚔</span> LearnForEarn</Link>
        <Link to="/" className="pp-topbar__cta">Join →</Link>
      </header>

      {loading && (
        <div className="pp-state">
          <span className="pp-state__spin" aria-hidden="true" />
          Summoning hunter dossier…
        </div>
      )}

      {!loading && notFound && (
        <div className="pp-state pp-state--empty">
          <span className="pp-state__icon"><ShieldX size={38} /></span>
          <p>This hunter profile does not exist or is no longer available.</p>
          <Link to="/" className="pp-powered">Powered by <strong>LearnForEarn</strong></Link>
        </div>
      )}

      {!loading && profile && rank && (
        <div className="pp-doc" style={{ '--rank': rank.color }}>

          {/* ═══════════ CINEMATIC HERO ═══════════ */}
          <section
            ref={heroRef}
            className="pp-hero"
            onMouseMove={onHeroMove}
            onMouseLeave={onHeroLeave}
          >
            {/* ambient FX layers */}
            <span className="pp-hero__grid" aria-hidden="true" />
            {!reduce && <span className="pp-hero__aura pp-hero__aura--a" aria-hidden="true" />}
            {!reduce && <span className="pp-hero__aura pp-hero__aura--b" aria-hidden="true" />}
            {!reduce && <span className="pp-hero__spot" aria-hidden="true" />}
            {!reduce && <span className="pp-hero__scan" aria-hidden="true" />}
            {particles.length > 0 && (
              <span className="pp-hero__particles" aria-hidden="true">
                {particles.map((_, i) => (
                  <span
                    key={i}
                    className="pp-particle"
                    style={{
                      left: `${(i * 5.6 + 3) % 100}%`,
                      '--dur': `${7 + (i % 6)}s`,
                      '--delay': `${(i * 0.6) % 7}s`,
                      '--sz': `${2 + (i % 3)}px`,
                    }}
                  />
                ))}
              </span>
            )}
            <span className="pp-hero__vignette" aria-hidden="true" />

            <div className="pp-hero__inner">
              {/* ── Rank crest (summoning circle + avatar) ── */}
              <motion.div
                className="pp-crest"
                initial={reduce ? false : { opacity: 0, scale: 0.7, filter: 'blur(10px)' }}
                animate={reduce ? {} : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <span className="pp-crest__ring pp-crest__ring--1" aria-hidden="true" />
                <span className="pp-crest__ring pp-crest__ring--2" aria-hidden="true" />
                <span className="pp-crest__glow" aria-hidden="true" />
                {!reduce && <span className="pp-crest__ping" aria-hidden="true" />}
                <div className="pp-crest__disc" style={{ background: profile.avatarColor || '#4F46E5' }}>
                  <span className="pp-crest__initials">{initials(profile.fullName)}</span>
                </div>
                <span className="pp-crest__rank" title={`Rank ${rank.label}`}>
                  <span className="pp-crest__rank-letter">{rank.label}</span>
                </span>
              </motion.div>

              {/* ── Identity ── */}
              <motion.div
                className="pp-ident"
                initial={reduce ? false : 'hidden'}
                animate={reduce ? {} : 'show'}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
              >
                {(() => {
                  const rise = reduce ? {} : {
                    variants: {
                      hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
                      show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: EASE } },
                    },
                  }
                  return (
                    <>
                      <motion.p className="pp-eyebrow" {...rise}>
                        <span className="pp-eyebrow__dot" /> HUNTER DOSSIER · {RANK_TITLE[rank.label]}
                      </motion.p>
                      <motion.h1 className="pp-name" {...rise}>{profile.fullName}</motion.h1>
                      <motion.div className="pp-subline" {...rise}>
                        <span className="pp-handle">@{profile.username}</span>
                        <span className="pp-classchip">{rank.label}-Class Hunter</span>
                      </motion.div>
                      {profile.bio && <motion.p className="pp-bio" {...rise}>{profile.bio}</motion.p>}
                      <motion.div className="pp-meta" {...rise}>
                        {profile.location && <span className="pp-meta__item"><MapPin size={13} /> {profile.location}</span>}
                        {formatDate(profile.joinedAt) && <span className="pp-meta__item"><Calendar size={13} /> Hunter since {formatDate(profile.joinedAt)}</span>}
                        {profile.githubVerified && profile.githubLogin && (
                          <span className="pp-meta__item pp-meta__item--verified"><Check size={13} /> Verified {profile.githubLogin}</span>
                        )}
                      </motion.div>

                      {/* XP → next rank */}
                      <motion.div className="pp-xp" {...rise}>
                        <div className="pp-xp__head">
                          <span className="pp-xp__now"><Zap size={13} /> {xp.toLocaleString('en-IN')} XP</span>
                          <span className="pp-xp__next">
                            {rank.next ? `${toNext.toLocaleString('en-IN')} XP to ${getRank(rank.next).label}-Rank` : 'Max rank reached'}
                          </span>
                        </div>
                        <div className="pp-xp__track">
                          <div className="pp-xp__fill" style={{ width: `${Math.min(100, Math.max(4, rank.progress))}%` }}>
                            {!reduce && <span className="pp-xp__shine" />}
                          </div>
                        </div>
                      </motion.div>

                      {/* actions + links */}
                      <motion.div className="pp-actions" {...rise}>
                        <button type="button" className="pp-share" onClick={shareProfile}>
                          {copied ? <><Check size={15} /> Copied link</> : <><Share2 size={15} /> Share profile</>}
                        </button>
                        {links.map(({ key, label, icon: Icon }) => {
                          const href = safeExternalUrl(profile[key])
                          if (!href) return null
                          return (
                            <a key={key} className="pp-chiplink" href={href} target="_blank" rel="noopener noreferrer nofollow">
                              <Icon size={14} /> {label}
                            </a>
                          )
                        })}
                        {emailHref && <a className="pp-chiplink" href={emailHref}><Mail size={14} /> Email</a>}
                        {resume && (
                          <a className="pp-chiplink pp-chiplink--accent" href={`/r/${resume.slug}`} target="_blank" rel="noopener noreferrer">
                            <FileText size={14} /> Résumé
                          </a>
                        )}
                      </motion.div>
                    </>
                  )
                })()}
              </motion.div>
            </div>

            {/* Ascension ladder E → S (full hero width) */}
            <motion.div className="pp-ladder" {...reveal(0.1)}>
              <div className="pp-ladder__meta">
                <span className="pp-ladder__lead">◇ ASCENSION PATH</span>
                <span className="pp-ladder__cur">Currently {rank.label}-Rank</span>
              </div>
              <div className="pp-ladder__row">
                <span className="pp-ladder__track" />
                <span className="pp-ladder__fill" style={{ width: `${(RANK_LADDER.findIndex(r => r.letter === rank.label) / (RANK_LADDER.length - 1)) * 100}%` }} />
                {RANK_LADDER.map((r) => {
                  const earned = xp >= r.min
                  const current = r.letter === rank.label
                  return (
                    <span key={r.letter} className={`pp-ladder__node${earned ? ' is-earned' : ''}${current ? ' is-current' : ''}`}>
                      {r.letter}
                    </span>
                  )
                })}
              </div>
            </motion.div>
          </section>

          {/* ═══════════ COMMAND STAT BAR ═══════════ */}
          <div className="pp-shell">
            <motion.div
              className="pp-stats"
              initial={reduce ? false : 'hidden'}
              whileInView={reduce ? {} : 'show'}
              viewport={{ once: true, amount: 0.4 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  className="pp-stat"
                  variants={reduce ? {} : { hidden: { opacity: 0, y: 24, scale: 0.92 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } } }}
                >
                  <span className="pp-stat__hud" aria-hidden="true" />
                  <s.icon className="pp-stat__icon" size={20} />
                  <span className="pp-stat__value"><CountUp value={s.value} reduce={reduce} /></span>
                  <span className="pp-stat__label">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* ═══════════ SHIPPED BUILDS — the showcase ═══════════ */}
            {work.length > 0 && (
              <motion.section className="pp-section" {...reveal(0)}>
                <div className="pp-section__head">
                  <span className="pp-section__label"><Rocket size={17} /> Shipped Builds</span>
                  <span className="pp-section__count">{work.length}</span>
                </div>
                <div className="pp-work">
                  {work.map((w, i) => (
                    <motion.article
                      key={i}
                      className="pp-work__card"
                      {...tilt}
                      {...(reduce ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.25 }, transition: { duration: 0.5, delay: i * 0.06, ease: EASE } })}
                    >
                      <div className="pp-work__glow" aria-hidden="true" />
                      <div className="pp-work__top">
                        <span className="pp-work__badge"><Rocket size={14} /> Build</span>
                        {w.rank && <span className="pp-work__rank">{w.rank}</span>}
                      </div>
                      <h3 className="pp-work__title">{w.title}</h3>
                      {Array.isArray(w.techStack) && w.techStack.length > 0 && (
                        <div className="pp-work__tech">
                          {w.techStack.slice(0, 6).map((t, j) => <span key={j} className="pp-chip">{t}</span>)}
                        </div>
                      )}
                      <div className="pp-work__actions">
                        {safeExternalUrl(w.deployUrl) && <a className="pp-btn pp-btn--primary" href={safeExternalUrl(w.deployUrl)} target="_blank" rel="noopener noreferrer"><Rocket size={14} /> Live demo</a>}
                        {safeExternalUrl(w.repoUrl) && <a className="pp-btn pp-btn--ghost" href={safeExternalUrl(w.repoUrl)} target="_blank" rel="noopener noreferrer"><Code2 size={14} /> Code</a>}
                      </div>
                      {(w.deployUrl || w.repoUrl) && <span className="pp-work__host"><Link2 size={11} /> {host(w.deployUrl || w.repoUrl)}</span>}
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            )}

            {/* ═══════════ CERTIFICATES ═══════════ */}
            {certs.length > 0 && (
              <motion.section className="pp-section" {...reveal(0)}>
                <div className="pp-section__head">
                  <span className="pp-section__label"><ScrollText size={17} /> Certificates</span>
                  <span className="pp-section__count">{certs.length}</span>
                </div>
                <div className="pp-grid">
                  {certs.map((c, i) => (
                    <motion.article
                      key={i}
                      className="pp-card pp-card--cert"
                      {...tilt}
                      style={{ '--bc': c.color || '#9B6ED4' }}
                      {...(reduce ? {} : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.25 }, transition: { duration: 0.45, delay: i * 0.05, ease: EASE } })}
                    >
                      <div className="pp-card__top">
                        <span className="pp-card__icon">{c.icon || '📜'}</span>
                        {typeof c.scorePercent === 'number' && c.scorePercent > 0 && (
                          <span className="pp-card__score">{c.scorePercent}%</span>
                        )}
                      </div>
                      <div className="pp-card__kind">{c.kind || 'Certificate'}</div>
                      <div className="pp-card__title">{c.title}</div>
                      <div className="pp-card__foot">
                        <span className="pp-card__meta">{formatDate(c.issuedAt) || 'Issued'}</span>
                        {c.rankAtIssue && <span className="pp-card__rank">{c.rankAtIssue}</span>}
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            )}

            {/* ═══════════ BADGES ═══════════ */}
            {badges.length > 0 && (
              <motion.section className="pp-section" {...reveal(0)}>
                <div className="pp-section__head">
                  <span className="pp-section__label"><Award size={17} /> Badges</span>
                  <span className="pp-section__count">{badges.length}</span>
                </div>
                <div className="pp-grid">
                  {badges.map((b, i) => (
                    <motion.div
                      key={i}
                      className="pp-card"
                      style={{ '--bc': b.color || '#9B6ED4' }}
                      {...tilt}
                      {...(reduce ? {} : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.25 }, transition: { duration: 0.45, delay: i * 0.05, ease: EASE } })}
                    >
                      <div className="pp-card__top">
                        <span className="pp-card__icon">{b.icon || '🏅'}</span>
                        {typeof b.scorePercent === 'number' && b.scorePercent > 0 && (
                          <span className="pp-card__score">{b.scorePercent}%</span>
                        )}
                      </div>
                      <div className="pp-card__kind">{b.type === 'GATE_MASTERED' ? 'Subject Mastery' : 'Roadmap'}</div>
                      <div className="pp-card__title">{b.title}</div>
                      <div className="pp-card__foot">
                        <span className="pp-card__meta">{formatDate(b.earnedAt) || 'Earned'}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* ═══════════ RÉSUMÉ BANNER ═══════════ */}
            {resume && (
              <motion.section className="pp-section" {...reveal(0)}>
                <a className="pp-resume" href={`/r/${resume.slug}`} target="_blank" rel="noopener noreferrer">
                  <span className="pp-resume__icon"><FileText size={24} /></span>
                  <span className="pp-resume__body">
                    <span className="pp-resume__kicker"><Sparkles size={12} /> Featured résumé</span>
                    <span className="pp-resume__title">{resume.title || 'Resume'}</span>
                    <span className="pp-resume__meta">Live résumé — view online or download the PDF</span>
                  </span>
                  <span className="pp-resume__cta">Open <ExternalLink size={15} /></span>
                </a>
              </motion.section>
            )}

            {/* ═══════════ EDUCATION + CONNECT ═══════════ */}
            {(hasAbout || hasConnect) && (
              <motion.section className="pp-section" {...reveal(0)}>
                <div className="pp-duo">
                  {hasAbout && (
                    <div className="pp-panel">
                      <div className="pp-panel__head"><GraduationCap size={16} /> Education</div>
                      <div className="pp-edu">
                        <div className="pp-edu__mark"><GraduationCap size={22} /></div>
                        <div className="pp-edu__body">
                          {degreeLine(edu) && <p className="pp-edu__degree">{degreeLine(edu)}</p>}
                          {edu.institution && <p className="pp-edu__inst">{edu.institution}</p>}
                          <div className="pp-edu__tags">
                            {eduYears && <span className="pp-tag"><Calendar size={12} /> {eduYears}</span>}
                            {edu.cgpa && <span className="pp-tag"><Trophy size={12} /> {edu.cgpa}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {hasConnect && (
                    <div className="pp-panel">
                      <div className="pp-panel__head"><Link2 size={16} /> Connect</div>
                      <div className="pp-connect">
                        {links.map(({ key, label, icon: Icon }) => {
                          const href = safeExternalUrl(profile[key])
                          if (!href) return null
                          return (
                            <a key={key} className="pp-connect__row" href={href} target="_blank" rel="noopener noreferrer nofollow">
                              <span className="pp-connect__ic"><Icon size={16} /></span>
                              <span className="pp-connect__text">
                                <span className="pp-connect__label">{label}
                                  {key === 'githubUrl' && profile.githubVerified && <span className="pp-connect__verified">Verified</span>}
                                </span>
                                <span className="pp-connect__host">{host(profile[key])}</span>
                              </span>
                              <ExternalLink size={14} className="pp-connect__ext" />
                            </a>
                          )
                        })}
                        {emailHref && (
                          <a className="pp-connect__row" href={emailHref}>
                            <span className="pp-connect__ic"><Mail size={16} /></span>
                            <span className="pp-connect__text">
                              <span className="pp-connect__label">Email</span>
                              <span className="pp-connect__host">{profile.publicEmail}</span>
                            </span>
                            <ExternalLink size={14} className="pp-connect__ext" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.section>
            )}

            {work.length === 0 && certs.length === 0 && badges.length === 0 && !hasAbout && !resume && (
              <div className="pp-empty"><Rows3 size={20} /><p>This hunter is just getting started — achievements will appear here soon.</p></div>
            )}

            {/* ═══════════ FOOTER CTA ═══════════ */}
            <motion.div className="pp-foot" {...reveal(0)}>
              <span className="pp-foot__glow" aria-hidden="true" />
              <p className="pp-foot__lead">Your climb starts with one gate.</p>
              <p className="pp-foot__sub">Build the same profile — track XP, earn ranks, ship real projects, and share a card like this.</p>
              <Link to="/" className="pp-foot__btn"><span>Create your hunter profile</span><ChevronRight size={17} /></Link>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}
