import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  User as UserIcon, AtSign, Mail, Lock, MapPin, GraduationCap, Building2,
  Github, Linkedin, Globe, Check, X, Loader2, Save, Share2, ExternalLink,
  Eye, EyeOff, FileText,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { updateProfile, checkUsername, listResumes } from '../api/api'
import { getApiError } from '../utils/apiError'
import { getRank } from '../utils/slRank'
import Navbar from '../components/navbars/Navbar'
import toast from 'react-hot-toast'
import '../styles/pages/shared/my-profile.css'

const BIO_MAX = 150
const USERNAME_RE = /^[a-z0-9_]{3,20}$/
const URL_RE = /^https?:\/\/[^\s]{3,}$/i
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const EASE = [0.16, 1, 0.3, 1]

const AVATAR_COLORS = [
  '#6366F1', '#8B5CF6', '#EC4899', '#EF4444', '#F97316',
  '#F59E0B', '#10B981', '#06B6D4', '#3B82F6', '#64748B',
]
const LINK_FIELDS = [
  { key: 'githubUrl', label: 'GitHub', icon: Github, placeholder: 'https://github.com/username' },
  { key: 'linkedinUrl', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/username' },
  { key: 'portfolioUrl', label: 'Portfolio / website', icon: Globe, placeholder: 'https://your-site.com' },
]

const EMPTY_EDU = { degree: '', fieldOfStudy: '', institution: '', graduationYear: '', cgpa: '' }
// Backend stores blank education fields as null; coerce to '' so inputs stay controlled.
function normEdu(e = {}) {
  return {
    degree: e?.degree || '',
    fieldOfStudy: e?.fieldOfStudy || '',
    institution: e?.institution || '',
    graduationYear: e?.graduationYear || '',
    cgpa: e?.cgpa || '',
  }
}
const EMPTY_FORM = {
  fullName: '', username: '', bio: '', avatarColor: '#6366F1', location: '', publicEmail: '',
  githubUrl: '', linkedinUrl: '', portfolioUrl: '',
  education: { ...EMPTY_EDU }, publicProfile: true, featuredResumeId: '',
}

const CURRENT_YEAR = new Date().getFullYear()
const GRAD_YEARS = Array.from({ length: CURRENT_YEAR + 6 - 1980 + 1 }, (_, i) => CURRENT_YEAR + 6 - i)

function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('') || '?'
}
function fmtMonthYear(iso) {
  if (!iso) return '—'
  try { return new Date(iso).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) }
  catch { return '—' }
}
// Normalised snapshot of the editable fields (privacy is excluded — it auto-saves).
function snapshot(f) {
  return JSON.stringify({
    fullName: f.fullName.trim(),
    username: f.username.trim().toLowerCase(),
    bio: f.bio.trim(),
    avatarColor: f.avatarColor,
    location: f.location.trim(),
    publicEmail: f.publicEmail.trim(),
    githubUrl: f.githubUrl.trim(),
    linkedinUrl: f.linkedinUrl.trim(),
    portfolioUrl: f.portfolioUrl.trim(),
    education: {
      degree: (f.education.degree || '').trim(),
      fieldOfStudy: (f.education.fieldOfStudy || '').trim(),
      institution: (f.education.institution || '').trim(),
      graduationYear: (f.education.graduationYear || '').trim(),
      cgpa: (f.education.cgpa || '').trim(),
    },
    featuredResumeId: f.featuredResumeId || '',
  })
}
function urlState(v) {
  if (!v || !v.trim()) return 'empty'
  return URL_RE.test(v.trim()) ? 'valid' : 'invalid'
}
function emailState(v) {
  if (!v || !v.trim()) return 'empty'
  return EMAIL_RE.test(v.trim()) ? 'valid' : 'invalid'
}

export default function MyProfilePage() {
  const { user, loading } = useAuth()
  const { theme } = useTheme()
  const reduce = useReducedMotion()

  const [form, setForm] = useState(EMPTY_FORM)
  const [baseline, setBaseline] = useState(null)
  const [resumes, setResumes] = useState([])
  const [resumesLoaded, setResumesLoaded] = useState(false)
  const [saving, setSaving] = useState(false)
  const [privacyBusy, setPrivacyBusy] = useState(false)
  const [copied, setCopied] = useState(false)
  const [usernameStatus, setUsernameStatus] = useState('idle') // idle|checking|available|taken|invalid
  const [usernameError, setUsernameError] = useState('')

  const mountedRef = useRef(true)
  const initializedRef = useRef(false)
  const originalUsernameRef = useRef('')

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  // Initialise the editable form ONCE from the user so later /me refreshes
  // (xp, rank, navbar) never clobber unsaved edits.
  useEffect(() => {
    if (!user || initializedRef.current) return
    const next = {
      fullName: user.fullName || '',
      username: user.username || '',
      bio: user.bio || '',
      avatarColor: user.avatarColor || '#6366F1',
      location: user.location || '',
      publicEmail: user.publicEmail || '',
      githubUrl: user.githubUrl || '',
      linkedinUrl: user.linkedinUrl || '',
      portfolioUrl: user.portfolioUrl || '',
      education: normEdu(user.education),
      publicProfile: user.publicProfile !== false,
      featuredResumeId: user.featuredResumeId || '',
    }
    setForm(next)
    setBaseline(snapshot(next))
    originalUsernameRef.current = (user.username || '').toLowerCase()
    initializedRef.current = true
  }, [user])

  // Load the user's resumes (for the "resume on profile" picker).
  useEffect(() => {
    if (!user || user.role === 'GUEST') return
    let active = true
    setResumesLoaded(false)
    listResumes()
      .then(({ data }) => { if (active) setResumes(Array.isArray(data) ? data : []) })
      .catch(() => { if (active) setResumes([]) })
      .finally(() => { if (active) setResumesLoaded(true) })
    return () => { active = false }
  }, [user?.id])

  // Keep the picker in sync with reality:
  // - deleted resume → clear pick
  // - share link turned off in Resume Studio → clear pick (backend also clears featuredResumeId)
  // Persist the clear so /me + public profile stay consistent without the student noticing a broken link.
  useEffect(() => {
    if (!initializedRef.current || !resumesLoaded) return
    const fid = form.featuredResumeId
    if (!fid) return
    const match = resumes.find(r => r.id === fid)
    if (match && match.isPublic) return
    const nf = { ...form, featuredResumeId: '' }
    setForm(nf)
    setBaseline(snapshot(nf))
    updateProfile({ featuredResumeId: '' }).catch(() => {})
    window.dispatchEvent(new Event('sl:refresh'))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumes, resumesLoaded])

  const isGuest = user?.role === 'GUEST'
  const profileUrl = form.username ? `${window.location.origin}/u/${form.username}` : ''

  const xp = user?.xp || 0
  const rank = useMemo(() => getRank(xp), [xp, theme]) // eslint-disable-line react-hooks/exhaustive-deps

  const isDirty = baseline != null && snapshot(form) !== baseline

  // Warn before leaving with unsaved edits (covers refresh / tab close / hard nav).
  useEffect(() => {
    if (!isDirty) return
    const handler = (e) => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])

  // Live username availability (debounced).
  useEffect(() => {
    if (!initializedRef.current) return
    const uname = form.username.trim().toLowerCase()
    if (uname === originalUsernameRef.current) { setUsernameStatus('available'); return }
    if (!uname) { setUsernameStatus('idle'); return }
    if (!USERNAME_RE.test(uname)) { setUsernameStatus('invalid'); return }
    setUsernameStatus('checking')
    let cancelled = false
    const t = setTimeout(async () => {
      try {
        const { data } = await checkUsername(uname)
        if (cancelled || !mountedRef.current) return
        setUsernameStatus(data?.available ? 'available' : 'taken')
      } catch {
        if (!cancelled && mountedRef.current) setUsernameStatus('idle')
      }
    }, 450)
    return () => { cancelled = true; clearTimeout(t) }
  }, [form.username])

  const set = useCallback((k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (k === 'username') setUsernameError('')
  }, [])
  const setEdu = useCallback((k, v) => {
    setForm(f => ({ ...f, education: { ...f.education, [k]: v } }))
  }, [])

  const save = async (e) => {
    e.preventDefault()
    if (saving || !isDirty) return

    const username = form.username.trim().toLowerCase()
    if (!USERNAME_RE.test(username)) {
      setUsernameError('Username must be 3–20 characters: lowercase letters, numbers or underscore.')
      return
    }
    if (usernameStatus === 'taken') {
      setUsernameError('That username is already taken.')
      return
    }
    if (LINK_FIELDS.some(({ key }) => urlState(form[key]) === 'invalid')) {
      toast.error('Please fix the invalid links before saving.')
      return
    }
    if (emailState(form.publicEmail) === 'invalid') {
      toast.error('Please enter a valid public contact email address')
      return
    }
    if (form.featuredResumeId) {
      const picked = resumes.find(r => r.id === form.featuredResumeId)
      if (!picked || !picked.isPublic) {
        toast.error('That resume’s share link is off. Turn sharing on in Resume Studio, or pick None.')
        return
      }
    }

    setUsernameError('')
    setSaving(true)
    try {
      const { data } = await updateProfile({
        fullName: form.fullName,
        username,
        bio: form.bio,
        avatarColor: form.avatarColor,
        location: form.location.trim(),
        publicEmail: form.publicEmail.trim(),
        githubUrl: form.githubUrl.trim(),
        linkedinUrl: form.linkedinUrl.trim(),
        portfolioUrl: form.portfolioUrl.trim(),
        education: {
          degree: (form.education.degree || '').trim(),
          fieldOfStudy: (form.education.fieldOfStudy || '').trim(),
          institution: (form.education.institution || '').trim(),
          graduationYear: (form.education.graduationYear || '').trim(),
          cgpa: (form.education.cgpa || '').trim(),
        },
        publicProfile: form.publicProfile,
        featuredResumeId: form.featuredResumeId || '',
      })
      const saved = {
        ...form,
        username: data?.username || username,
        location: data?.location ?? form.location,
        education: normEdu(data?.education || form.education),
        featuredResumeId: data?.featuredResumeId ?? form.featuredResumeId,
      }
      if (!mountedRef.current) return
      setForm(saved)
      setBaseline(snapshot(saved))
      originalUsernameRef.current = (data?.username || username).toLowerCase()
      toast.success('Profile updated successfully')
      window.dispatchEvent(new Event('sl:refresh'))
      // Featuring a resume auto-shares it — refresh the list so its status is current.
      listResumes().then(({ data: list }) => {
        if (mountedRef.current) setResumes(Array.isArray(list) ? list : [])
      }).catch(() => {})
    } catch (err) {
      const msg = getApiError(err, 'We could not save your changes. Please review the fields and try again.')
      if (/username/i.test(msg)) setUsernameError(msg)
      else toast.error(msg)
    } finally {
      if (mountedRef.current) setSaving(false)
    }
  }

  const togglePrivacy = async () => {
    if (privacyBusy) return
    const next = !form.publicProfile
    setForm(f => ({ ...f, publicProfile: next }))
    setPrivacyBusy(true)
    try {
      await updateProfile({ publicProfile: next })
      toast.success(next ? 'Profile is now public' : 'Profile is now private')
      window.dispatchEvent(new Event('sl:refresh'))
    } catch (err) {
      if (mountedRef.current) setForm(f => ({ ...f, publicProfile: !next }))
      toast.error(getApiError(err, 'Could not update visibility. Please try again.'))
    } finally {
      if (mountedRef.current) setPrivacyBusy(false)
    }
  }

  const copyLink = async () => {
    if (!profileUrl) return
    // Native share sheet when supported; else copy the link.
    if (navigator.share) {
      try { await navigator.share({ title: `${form.fullName || user?.fullName || 'My'} profile — LearnForEarn`, text: 'Check out my hunter profile', url: profileUrl }) } catch { /* cancelled */ }
      return
    }
    try {
      await navigator.clipboard.writeText(profileUrl)
      setCopied(true)
      setTimeout(() => mountedRef.current && setCopied(false), 1600)
    } catch { toast.error('Could not copy the link.') }
  }

  // Share a specific resume's public link (native sheet, else copy).
  const shareResume = async (url, name) => {
    if (!url) return
    if (navigator.share) {
      try { await navigator.share({ title: `${name || 'My resume'} — LearnForEarn`, text: 'Here is my resume', url }) } catch { /* cancelled */ }
      return
    }
    try { await navigator.clipboard.writeText(url); toast.success('Resume link copied') }
    catch { toast.error('Could not copy the link.') }
  }

  const rise = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: EASE, delay },
  })

  // ── Loading skeleton ──
  if (loading || (!user && localStorage.getItem('has_session'))) {
    return (
      <div className="mpx-page">
        <Navbar sticky />
        <div className="mpx-shell">
          <div className="mpx-skel mpx-skel--hero" />
          <div className="mpx-skel mpx-skel--card" />
          <div className="mpx-skel mpx-skel--card" />
          <div className="mpx-skel mpx-skel--card mpx-skel--sm" />
        </div>
      </div>
    )
  }

  if (isGuest) {
    return (
      <div className="mpx-page">
        <Navbar sticky />
        <div className="mpx-shell">
          <div className="mpx-guest">
            Guest accounts can’t be customised.<br />
            <Link to="/register" className="mpx-guest__link">Create a free account</Link> to unlock your profile and shareable card.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mpx-page">
      <Navbar sticky />

      <form className="mpx-shell" onSubmit={save}>
        {/* ── Hero header ── */}
        <motion.header className="mpx-hero" style={{ '--mpx-av': form.avatarColor, '--rank-color': rank.color }} {...rise(0)}>
          <div className="mpx-hero__row">
            <div className="mpx-avatar">{initials(form.fullName)}</div>
            <div className="mpx-hero__id">
              <h1 className="mpx-hero__name">{form.fullName || 'Your name'}</h1>
              <p className="mpx-hero__handle">@{form.username || 'username'}</p>
              <div className="mpx-hero__meta">
                <span className="mpx-rankpill">{rank.label} rank</span>
                <span className="mpx-dot">•</span>
                <span>{xp.toLocaleString()} XP</span>
                <span className="mpx-dot">•</span>
                <span>Joined {fmtMonthYear(user?.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Identity colour picker */}
          <div className="mpx-swatches" role="radiogroup" aria-label="Profile colour">
            {AVATAR_COLORS.map(c => (
              <button key={c} type="button"
                className={`mpx-swatch${form.avatarColor === c ? ' is-active' : ''}`}
                style={{ '--sw': c }}
                role="radio" aria-checked={form.avatarColor === c}
                aria-label={`Colour ${c}`}
                onClick={() => set('avatarColor', c)} />
            ))}
          </div>

          {/* Visibility + shareable link */}
          <div className={`mpx-visibility${form.publicProfile ? ' is-public' : ' is-private'}`}>
            <div className="mpx-visibility__top">
              <span className="mpx-visibility__icon">{form.publicProfile ? <Eye size={17} /> : <EyeOff size={17} />}</span>
              <div className="mpx-visibility__text">
                <span className="mpx-visibility__title">{form.publicProfile ? 'Public profile' : 'Private profile'}</span>
                <span className="mpx-visibility__desc">
                  {form.publicProfile
                    ? 'Anyone with your link can view your profile.'
                    : 'Only you can see it — your public link is switched off.'}
                </span>
              </div>
              {profileUrl && form.publicProfile && (
                <div className="mpx-share">
                  <button type="button" className="mpx-share__btn" onClick={copyLink}>
                    {copied ? <Check size={13} /> : <Share2 size={13} />} {copied ? 'Copied' : 'Share link'}
                  </button>
                  <a className="mpx-share__btn" href={profileUrl} target="_blank" rel="noreferrer">
                    <ExternalLink size={13} /> View
                  </a>
                </div>
              )}
              <button type="button"
                className={`mpx-toggle${form.publicProfile ? ' is-on' : ''}`}
                role="switch" aria-checked={form.publicProfile}
                aria-label="Toggle profile visibility"
                disabled={privacyBusy}
                onClick={togglePrivacy}>
                <span className="mpx-toggle__knob">{privacyBusy && <Loader2 size={11} className="mpx-spin" />}</span>
              </button>
            </div>
          </div>
        </motion.header>

        {/* ── Basic information ── */}
        <motion.section className="mpx-card" {...rise(0.05)}>
          <div className="mpx-card__head">
            <h2 className="mpx-card__title"><UserIcon size={17} /> Basic information</h2>
            <p className="mpx-card__sub">The essentials that appear on your profile.</p>
          </div>

          <div className="mpx-field">
            <label className="mpx-label" htmlFor="mpx-name">Full name</label>
            <input id="mpx-name" className="mpx-input" value={form.fullName} maxLength={60}
              onChange={e => set('fullName', e.target.value)} placeholder="Your full name" />
          </div>

          <div className="mpx-field">
            <label className="mpx-label" htmlFor="mpx-username">Username</label>
            <div className={`mpx-inputwrap${usernameError ? ' has-error' : ''}`}>
              <AtSign size={15} className="mpx-inputwrap__icon" />
              <input id="mpx-username" className="mpx-input mpx-input--affix"
                value={form.username} maxLength={20} autoComplete="off" spellCheck={false}
                onChange={e => set('username', e.target.value.toLowerCase().replace(/\s+/g, ''))}
                placeholder="your_handle" />
              <span className="mpx-status">
                {usernameStatus === 'checking' && <Loader2 size={15} className="mpx-spin mpx-status--muted" />}
                {usernameStatus === 'available' && <Check size={15} className="mpx-status--ok" />}
                {(usernameStatus === 'taken' || usernameStatus === 'invalid') && <X size={15} className="mpx-status--bad" />}
              </span>
            </div>
            {usernameError
              ? <p className="mpx-msg mpx-msg--bad">{usernameError}</p>
              : usernameStatus === 'taken'
                ? <p className="mpx-msg mpx-msg--bad">That username is already taken.</p>
                : usernameStatus === 'invalid'
                  ? <p className="mpx-msg mpx-msg--bad">3–20 characters: lowercase letters, numbers or underscore.</p>
                  : usernameStatus === 'available' && form.username.trim().toLowerCase() !== originalUsernameRef.current
                    ? <p className="mpx-msg mpx-msg--ok">Nice — that username is available.</p>
                    : <p className="mpx-hint">This is your public link: /u/{form.username || 'username'}</p>}
          </div>

          <div className="mpx-field">
            <label className="mpx-label" htmlFor="mpx-bio">Bio</label>
            <textarea id="mpx-bio" className="mpx-input mpx-textarea" rows={3} maxLength={BIO_MAX}
              value={form.bio} onChange={e => set('bio', e.target.value)}
              placeholder="A short line about who you are and what you’re building." />
            <div className={`mpx-counter${form.bio.length >= BIO_MAX ? ' is-max' : ''}`}>{form.bio.length}/{BIO_MAX}</div>
          </div>

          <div className="mpx-field">
            <label className="mpx-label" htmlFor="mpx-email">Email
              <span className="mpx-locktip" tabIndex={0} aria-label="Email cannot be changed">
                <Lock size={12} />
                <span className="mpx-tooltip">Email cannot be changed</span>
              </span>
            </label>
            <div className="mpx-inputwrap is-locked">
              <Mail size={15} className="mpx-inputwrap__icon" />
              <input id="mpx-email" className="mpx-input mpx-input--affix" value={user?.email || ''} readOnly disabled />
            </div>
            <p className="mpx-hint">Your login email — private, never shown on your public profile.</p>
          </div>

          <div className="mpx-field">
            <label className="mpx-label" htmlFor="mpx-public-email">Public contact email</label>
            <div className={`mpx-inputwrap${emailState(form.publicEmail) === 'invalid' ? ' has-error' : ''}`}>
              <Mail size={15} className="mpx-inputwrap__icon" />
              <input id="mpx-public-email" className="mpx-input mpx-input--affix"
                type="email" inputMode="email" autoComplete="off" spellCheck={false}
                value={form.publicEmail} maxLength={254}
                onChange={e => set('publicEmail', e.target.value)}
                placeholder="you@example.com (optional)" />
              <span className="mpx-status">
                {emailState(form.publicEmail) === 'valid' && <Check size={15} className="mpx-status--ok" />}
                {emailState(form.publicEmail) === 'invalid' && <X size={15} className="mpx-status--bad" />}
              </span>
            </div>
            {emailState(form.publicEmail) === 'invalid'
              ? <p className="mpx-msg mpx-msg--bad">Enter a valid email address</p>
              : <p className="mpx-hint">Optional — shown on your public profile for recruiters to reach you</p>}
          </div>

          <div className="mpx-field mpx-field--last">
            <label className="mpx-label" htmlFor="mpx-location">Location</label>
            <div className="mpx-inputwrap">
              <MapPin size={15} className="mpx-inputwrap__icon" />
              <input id="mpx-location" className="mpx-input mpx-input--affix" value={form.location} maxLength={120}
                onChange={e => set('location', e.target.value)} placeholder="City, State / Country" />
            </div>
          </div>
        </motion.section>

        {/* ── Education ── */}
        <motion.section className="mpx-card" {...rise(0.1)}>
          <div className="mpx-card__head">
            <h2 className="mpx-card__title"><GraduationCap size={17} /> Education</h2>
            <p className="mpx-card__sub">Your highest / current qualification.</p>
          </div>

          <div className="mpx-grid-2">
            <div className="mpx-field">
              <label className="mpx-label" htmlFor="mpx-degree">Degree</label>
              <input id="mpx-degree" className="mpx-input" value={form.education.degree} maxLength={120}
                onChange={e => setEdu('degree', e.target.value)} placeholder="Bachelor of Technology" />
            </div>
            <div className="mpx-field">
              <label className="mpx-label" htmlFor="mpx-field">Branch / Specialization</label>
              <input id="mpx-field" className="mpx-input" value={form.education.fieldOfStudy} maxLength={120}
                onChange={e => setEdu('fieldOfStudy', e.target.value)} placeholder="Computer Science and Engineering" />
            </div>
          </div>

          <div className="mpx-grid-2">
            <div className="mpx-field">
              <label className="mpx-label" htmlFor="mpx-college">College / University</label>
              <div className="mpx-inputwrap">
                <Building2 size={15} className="mpx-inputwrap__icon" />
                <input id="mpx-college" className="mpx-input mpx-input--affix" value={form.education.institution} maxLength={120}
                  onChange={e => setEdu('institution', e.target.value)} placeholder="Your college name" />
              </div>
            </div>
            <div className="mpx-field">
              <label className="mpx-label" htmlFor="mpx-gradyear">Pass out year</label>
              <input id="mpx-gradyear" className="mpx-input" list="mpx-gradyears"
                inputMode="numeric" maxLength={4} placeholder="e.g. 2025"
                value={form.education.graduationYear}
                onChange={e => setEdu('graduationYear', e.target.value.replace(/[^\d]/g, '').slice(0, 4))} />
              <datalist id="mpx-gradyears">
                {GRAD_YEARS.map(y => <option key={y} value={String(y)} />)}
              </datalist>
            </div>
          </div>

          <div className="mpx-grid-2 mpx-field--last">
            <div className="mpx-field" style={{ marginBottom: 0 }}>
              <label className="mpx-label" htmlFor="mpx-cgpa">CGPA / %</label>
              <input id="mpx-cgpa" className="mpx-input" value={form.education.cgpa} maxLength={20}
                onChange={e => setEdu('cgpa', e.target.value)} placeholder="8.2/10 or 82%" />
            </div>
          </div>
        </motion.section>

        {/* ── Social links ── */}
        <motion.section className="mpx-card" {...rise(0.15)}>
          <div className="mpx-card__head">
            <h2 className="mpx-card__title"><Globe size={17} /> Social links</h2>
            <p className="mpx-card__sub">Optional — shown to visitors and recruiters.</p>
          </div>
          {LINK_FIELDS.map(({ key, label, icon: Icon, placeholder }, i) => {
            const st = urlState(form[key])
            return (
              <div key={key} className={`mpx-field${i === LINK_FIELDS.length - 1 ? ' mpx-field--last' : ''}`}>
                <label className="mpx-label" htmlFor={`mpx-${key}`}>{label}</label>
                <div className={`mpx-inputwrap${st === 'invalid' ? ' has-error' : ''}`}>
                  <Icon size={15} className="mpx-inputwrap__icon" />
                  <input id={`mpx-${key}`} className="mpx-input mpx-input--affix"
                    type="url" inputMode="url" autoComplete="off" spellCheck={false}
                    value={form[key]} placeholder={placeholder}
                    onChange={e => set(key, e.target.value)} />
                  <span className="mpx-status">
                    {st === 'valid' && <Check size={15} className="mpx-status--ok" />}
                    {st === 'invalid' && <X size={15} className="mpx-status--bad" />}
                  </span>
                </div>
                {st === 'invalid' && <p className="mpx-msg mpx-msg--bad">Enter a full URL starting with https://</p>}
              </div>
            )
          })}
        </motion.section>

        {/* ── Resume on profile ── */}
        <motion.section className="mpx-card" {...rise(0.18)}>
          <div className="mpx-card__head">
            <h2 className="mpx-card__title"><FileText size={17} /> Resume on your profile</h2>
            <p className="mpx-card__sub">Only resumes with a share link turned on can appear here — pick one, or none.</p>
          </div>

          {!resumesLoaded ? (
            <p className="mpx-hint">Loading your resumes…</p>
          ) : resumes.length === 0 ? (
            <div className="mpx-resumeempty">
              <p className="mpx-resumeempty__text">
                You haven’t saved a resume yet. Build one in Resume Studio, turn on its share link, then come back here to show it on your profile.
              </p>
              <Link to="/resume" className="mpx-resumeempty__btn">
                <FileText size={15} /> Go to Resume Studio
              </Link>
            </div>
          ) : (
            <>
              <div className="mpx-resumepick" role="radiogroup" aria-label="Resume on your profile">
                <label className={`mpx-resumeopt${!form.featuredResumeId ? ' is-active' : ''}`}>
                  <input type="radio" name="featuredResume" className="mpx-resumeopt__input"
                    checked={!form.featuredResumeId} onChange={() => set('featuredResumeId', '')} />
                  <span className="mpx-resumeopt__radio" aria-hidden="true" />
                  <span className="mpx-resumeopt__body">
                    <span className="mpx-resumeopt__title">None</span>
                    <span className="mpx-resumeopt__meta">Don’t show a resume on my profile</span>
                  </span>
                </label>

                {resumes.map(r => {
                  const selectable = !!r.isPublic
                  const active = form.featuredResumeId === r.id
                  const url = r.isPublic && r.shareSlug ? `${window.location.origin}/r/${r.shareSlug}` : ''
                  return (
                    <label
                      key={r.id}
                      className={`mpx-resumeopt${active ? ' is-active' : ''}${selectable ? '' : ' is-disabled'}`}
                      title={selectable ? undefined : 'Turn on the share link in Resume Studio first'}
                    >
                      <input type="radio" name="featuredResume" className="mpx-resumeopt__input"
                        checked={active} disabled={!selectable}
                        onChange={() => selectable && set('featuredResumeId', r.id)} />
                      <span className="mpx-resumeopt__radio" aria-hidden="true" />
                      <span className="mpx-resumeopt__body">
                        <span className="mpx-resumeopt__title">{r.title || 'Untitled'}</span>
                        <span className="mpx-resumeopt__meta">
                          {selectable
                            ? 'Share link on — can show on your profile'
                            : 'Share link off — open Resume Studio and turn sharing on'}
                        </span>
                      </span>
                      {url ? (
                        <span className="mpx-resumeopt__actions">
                          <button type="button" className="mpx-resumeopt__view"
                            onClick={e => { e.preventDefault(); e.stopPropagation(); shareResume(url, r.title) }}>
                            <Share2 size={13} /> Share link
                          </button>
                          <a className="mpx-resumeopt__view" href={url} target="_blank" rel="noreferrer"
                            onClick={e => e.stopPropagation()}>
                            <ExternalLink size={13} /> View
                          </a>
                        </span>
                      ) : (
                        <Link to="/resume" className="mpx-resumeopt__view" onClick={e => e.stopPropagation()}>
                          Open
                        </Link>
                      )}
                    </label>
                  )
                })}
              </div>
              {resumes.every(r => !r.isPublic) ? (
                <p className="mpx-hint">
                  None of your resumes have a share link yet.{' '}
                  <Link to="/resume" className="mpx-inlinelink">Open Resume Studio</Link>, turn sharing on for one, then pick it here.
                </p>
              ) : (
                <p className="mpx-hint">
                  If you turn off a resume’s share link later, it’s removed from your profile automatically.
                </p>
              )}
            </>
          )}
        </motion.section>

        {/* ── Save ── */}
        <motion.div className="mpx-savebar" {...rise(0.22)}>
          <button type="submit" className="mpx-save" disabled={!isDirty || saving}>
            {saving ? <><Loader2 size={15} className="mpx-spin" /> Saving…</> : <><Save size={15} /> Save changes</>}
          </button>
        </motion.div>
      </form>
    </div>
  )
}
