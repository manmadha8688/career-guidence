import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Award, Calendar, Trophy, ShieldX, Github, Linkedin, Globe, Zap, Medal,
  ScrollText, ExternalLink, Share2, Check, Mail, MapPin, GraduationCap,
  ChevronRight, Rocket, Code2, Rows3, FileText,
} from 'lucide-react'
import { getPublicProfile } from '../api/api'
import { getRank } from '../utils/slRank'
import '../styles/pages/shared/public-profile.css'

const EASE = [0.16, 1, 0.3, 1]

const PROFILE_LINKS = [
  { key: 'githubUrl', label: 'GitHub', icon: Github },
  { key: 'linkedinUrl', label: 'LinkedIn', icon: Linkedin },
  { key: 'portfolioUrl', label: 'Portfolio', icon: Globe },
]

const RANK_LADDER = [
  { label: 'E', min: 0 }, { label: 'D', min: 500 }, { label: 'C', min: 1500 },
  { label: 'B', min: 3000 }, { label: 'A', min: 6000 }, { label: 'S', min: 10000 },
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
const host = (url) => { try { return new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`).hostname.replace(/^www\./, '') } catch { return url } }
const withProto = (url) => (/^https?:\/\//i.test(url) ? url : `https://${url}`)

// Animated number count-up (honors reduced motion).
function CountUp({ value, reduce }) {
  const to = Number(value) || 0
  const [n, setN] = useState(reduce ? to : 0)
  useEffect(() => {
    if (reduce) { setN(to); return }
    let raf, start
    const dur = 950
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
  const [ringP, setRingP] = useState(0)
  const ringRef = useRef(0)

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

  // ── derived ──
  const xp = profile?.xp || 0
  const rank = profile ? getRank(xp) : null
  const nextRank = rank?.next ? getRank(rank.next) : null
  const toNext = rank?.next ? Math.max(0, rank.next - xp) : 0
  let tierIdx = 0
  RANK_LADDER.forEach((t, i) => { if (xp >= t.min) tierIdx = i })
  const ladderFill = (tierIdx / (RANK_LADDER.length - 1)) * 100

  // Fill the circular ring after mount for a smooth sweep.
  useEffect(() => {
    if (!rank) return
    if (reduce) { setRingP(rank.progress); return }
    ringRef.current = requestAnimationFrame(() => setRingP(rank.progress))
    return () => cancelAnimationFrame(ringRef.current)
  }, [rank, reduce])

  const edu = profile?.education
  const hasAbout = !!(edu && (edu.degree || edu.fieldOfStudy || edu.institution || edu.graduationYear || edu.cgpa))
  const links = profile ? PROFILE_LINKS.filter(l => profile[l.key]) : []
  const work = profile?.missionWork || []
  const certs = profile?.certificates || []
  const badges = profile?.badges || []
  const resume = profile?.resume && profile.resume.slug ? profile.resume : null

  const stats = profile ? [
    { icon: Zap, value: xp, label: 'Total XP' },
    { icon: Medal, value: profile.level ?? 1, label: 'Level' },
    { icon: Rocket, value: work.length, label: 'Builds shipped' },
    { icon: ScrollText, value: profile.certificateCount ?? certs.length, label: 'Certificates' },
    { icon: Award, value: profile.badgeCount ?? badges.length, label: 'Badges' },
  ] : []

  const reveal = (delay = 0) => reduce
    ? {}
    : { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.55, delay, ease: EASE } }

  const tilt = reduce ? {} : {
    onMouseMove: (e) => {
      const el = e.currentTarget, r = el.getBoundingClientRect()
      el.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -5}deg`)
      el.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 5}deg`)
    },
    onMouseLeave: (e) => { e.currentTarget.style.setProperty('--rx', '0deg'); e.currentTarget.style.setProperty('--ry', '0deg') },
  }

  return (
    <div className="pp-page">
      <header className="pp-topbar">
        <Link to="/" className="pp-brand"><span className="pp-brand__mark">⚔</span> LearnForEarn</Link>
        <Link to="/" className="pp-topbar__cta">Join free →</Link>
      </header>

      {loading && <div className="pp-state">Loading profile…</div>}

      {!loading && notFound && (
        <div className="pp-state pp-state--empty">
          <span className="pp-state__icon"><ShieldX size={38} /></span>
          <p>This hunter profile does not exist or is no longer available.</p>
          <Link to="/" className="pp-powered">Powered by <strong>LearnForEarn</strong></Link>
        </div>
      )}

      {!loading && profile && rank && (
        <div className="pp-body" style={{ '--rank': rank.color }}>
          {/* ── Cinematic hero band ── */}
          <section className="pp-band">
            {!reduce && <span className="pp-band__aura" aria-hidden="true" />}
            <span className="pp-band__grid" aria-hidden="true" />

            <div className="pp-hero">
              <button type="button" className="pp-share" onClick={shareProfile} aria-label="Share this profile">
                {copied ? <><Check size={14} /> Copied</> : <><Share2 size={14} /> Share</>}
              </button>

              {/* emblem — avatar wrapped in the XP progress ring (the single rank marker) */}
              <motion.div className="pp-emblem"
                {...(reduce ? {} : { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.6, ease: EASE } })}>
                {!reduce && <span className="pp-emblem__aura" aria-hidden="true" />}
                <span className="pp-emblem__ring" style={{ '--p': ringP }} aria-hidden="true" />
                <div className="pp-avatar" style={{ background: profile.avatarColor || '#4F46E5' }}>
                  {initials(profile.fullName)}
                </div>
                <span className="pp-emblem__rank" title={`Rank ${rank.label}`}>{rank.label}</span>
                <span className="pp-emblem__pct">{rank.progress}%</span>
              </motion.div>

              {/* identity */}
              <motion.div className="pp-id"
                {...(reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.12, ease: EASE } })}>
                <p className="pp-eyebrow">◆ Hunter Dossier</p>
                <h1 className="pp-name">{profile.fullName}</h1>
                <p className="pp-handle">@{profile.username}</p>
                <span className="pp-titlechip">{RANK_TITLE[rank.label]} · {rank.label}-Class Hunter</span>
                {profile.bio && <p className="pp-bio">{profile.bio}</p>}
                <div className="pp-meta">
                  {profile.location && <span className="pp-meta__item"><MapPin size={13} /> {profile.location}</span>}
                  {formatDate(profile.joinedAt) && <span className="pp-meta__item"><Calendar size={13} /> Since {formatDate(profile.joinedAt)}</span>}
                </div>
                {(links.length > 0 || profile.publicEmail || resume) && (
                  <div className="pp-links">
                    {links.map(({ key, label, icon: Icon }) => (
                      <a key={key} className="pp-link" href={profile[key]} target="_blank" rel="noopener noreferrer nofollow"><Icon size={14} /> {label}</a>
                    ))}
                    {profile.publicEmail && <a className="pp-link" href={`mailto:${profile.publicEmail}`}><Mail size={14} /> Email</a>}
                    {resume && (
                      <a className="pp-link" href={`/r/${resume.slug}`} target="_blank" rel="noopener noreferrer">
                        <FileText size={14} /> Resume
                      </a>
                    )}
                  </div>
                )}
              </motion.div>

              {/* ascension ladder — full width under the hero */}
              <motion.div className="pp-ladderwrap"
                {...(reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.24, ease: EASE } })}>
                <div className="pp-ladder__meta">
                  <span className="pp-ladder__lead">Ascension path</span>
                  <span className="pp-ladder__next">{nextRank ? <>{toNext.toLocaleString('en-IN')} XP to Rank {nextRank.label}</> : <>Max rank reached — S-Class</>}</span>
                </div>
                <div className="pp-ladder" role="img" aria-label={`Rank progression: currently ${rank.label} on the E to S climb`}>
                  <span className="pp-ladder__track" aria-hidden="true" />
                  <motion.span className="pp-ladder__fill" aria-hidden="true"
                    initial={reduce ? false : { width: 0 }}
                    animate={reduce ? false : { width: `${ladderFill}%` }}
                    style={reduce ? { width: `${ladderFill}%` } : undefined}
                    transition={{ duration: 0.9, delay: 0.5, ease: EASE }} />
                  {RANK_LADDER.map((t, i) => (
                    <span key={t.label} className={`pp-ladder__node${i <= tierIdx ? ' is-earned' : ''}${i === tierIdx ? ' is-current' : ''}`}>{t.label}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          <div className="pp-main">
            {/* ── Stat strip (count-up) ── */}
            <motion.div className="pp-statstrip" {...reveal(0)}>
              {stats.map((s, i) => (
                <div key={i} className="pp-stat">
                  <s.icon className="pp-stat__icon" size={18} />
                  <span className="pp-stat__value"><CountUp value={s.value} reduce={reduce} /></span>
                  <span className="pp-stat__label">{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* ── Résumé (the one the hunter chose to feature) ── */}
            {resume && (
              <motion.section className="pp-section" {...reveal(0)}>
                <div className="pp-section__head"><span className="pp-section__label"><FileText size={16} /> Résumé</span></div>
                <a className="pp-resume" href={`/r/${resume.slug}`} target="_blank" rel="noopener noreferrer">
                  <span className="pp-resume__icon"><FileText size={22} /></span>
                  <span className="pp-resume__body">
                    <span className="pp-resume__title">{resume.title || 'Resume'}</span>
                    <span className="pp-resume__meta">Live resume — view online or download the PDF</span>
                  </span>
                  <span className="pp-resume__cta">View <ExternalLink size={14} /></span>
                </a>
              </motion.section>
            )}

            {/* ── Shipped builds (the showcase) ── */}
            {work.length > 0 && (
              <motion.section className="pp-section" {...reveal(0)}>
                <div className="pp-section__head">
                  <span className="pp-section__label"><Rocket size={16} /> Shipped Builds</span>
                </div>
                <div className="pp-work">
                  {work.map((w, i) => (
                    <motion.article key={i} className="pp-work__card" {...tilt}
                      {...(reduce ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.5, delay: i * 0.06, ease: EASE } })}>
                      <div className="pp-work__glow" aria-hidden="true" />
                      <div className="pp-work__top">
                        <h3 className="pp-work__title">{w.title}</h3>
                        {w.rank && <span className="pp-work__rank">{w.rank}</span>}
                      </div>
                      {Array.isArray(w.techStack) && w.techStack.length > 0 && (
                        <div className="pp-work__tech">
                          {w.techStack.slice(0, 6).map((t, j) => <span key={j} className="pp-chip">{t}</span>)}
                        </div>
                      )}
                      <div className="pp-work__actions">
                        {w.deployUrl && <a className="pp-btn pp-btn--primary" href={withProto(w.deployUrl)} target="_blank" rel="noopener noreferrer"><Rocket size={14} /> Live demo</a>}
                        {w.repoUrl && <a className="pp-btn pp-btn--ghost" href={withProto(w.repoUrl)} target="_blank" rel="noopener noreferrer"><Code2 size={14} /> Code</a>}
                      </div>
                      {(w.deployUrl || w.repoUrl) && <span className="pp-work__host">{host(w.deployUrl || w.repoUrl)}</span>}
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            )}

            {/* ── Certificates ── */}
            {certs.length > 0 && (
              <motion.section className="pp-section" {...reveal(0)}>
                <div className="pp-section__head">
                  <span className="pp-section__label"><ScrollText size={16} /> Certificates</span>
                </div>
                <div className="pp-grid">
                  {certs.map((c, i) => (
                    <motion.article key={i} className="pp-card pp-card--cert" {...tilt} style={{ '--bc': c.color || '#9B6ED4' }}
                      {...(reduce ? {} : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.45, delay: i * 0.05, ease: EASE } })}>
                      <div className="pp-card__top">
                        <span className="pp-card__icon">{c.icon || '📜'}</span>
                      </div>
                      <div className="pp-card__kind">{c.kind || 'Certificate'}</div>
                      <div className="pp-card__title">{c.title}</div>
                      <div className="pp-card__foot">
                        <span className="pp-card__meta">{formatDate(c.issuedAt) || 'Issued'}</span>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            )}

            {/* ── Badges ── */}
            {badges.length > 0 && (
              <motion.section className="pp-section" {...reveal(0)}>
                <div className="pp-section__head">
                  <span className="pp-section__label"><Award size={16} /> Badges</span>
                </div>
                <div className="pp-grid">
                  {badges.map((b, i) => (
                    <motion.div key={i} className="pp-card" style={{ '--bc': b.color || '#9B6ED4' }} {...tilt}
                      {...(reduce ? {} : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.45, delay: i * 0.05, ease: EASE } })}>
                      <div className="pp-card__top"><span className="pp-card__icon">{b.icon || '🏅'}</span></div>
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

            {/* ── Education ── */}
            {hasAbout && (
              <motion.section className="pp-section" {...reveal(0)}>
                <div className="pp-section__head"><span className="pp-section__label"><GraduationCap size={16} /> Education</span></div>
                <div className="pp-edu">
                  <div className="pp-edu__mark"><GraduationCap size={22} /></div>
                  <div className="pp-edu__body">
                    {degreeLine(edu) && <p className="pp-edu__degree">{degreeLine(edu)}</p>}
                    {edu.institution && <p className="pp-edu__inst">{edu.institution}</p>}
                    <div className="pp-edu__tags">
                      {edu.graduationYear && <span className="pp-tag"><Calendar size={12} /> Class of {edu.graduationYear}</span>}
                      {edu.cgpa && <span className="pp-tag"><Trophy size={12} /> {edu.cgpa}</span>}
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {work.length === 0 && certs.length === 0 && badges.length === 0 && !hasAbout && !resume && (
              <div className="pp-empty"><Rows3 size={20} /><p>This hunter is just getting started — achievements will appear here soon.</p></div>
            )}

            <Link to="/" className="pp-cta-foot"><span>Build your own hunter profile — free</span><ChevronRight size={16} /></Link>
          </div>
        </div>
      )}
    </div>
  )
}
