import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { User as UserIcon, Shield, Copy, Check, ExternalLink, Save, AtSign, Github, Linkedin, Globe } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { updateProfile } from '../api/api'
import { getApiError } from '../utils/apiError'
import { getRank } from '../utils/slRank'
import Navbar from '../components/navbars/Navbar'
import toast from 'react-hot-toast'

const AVATAR_COLORS = [
  '#4F46E5', '#7C3AED', '#DB2777', '#DC2626', '#EA580C',
  '#D97706', '#16A34A', '#0891B2', '#2563EB', '#475569',
]
const BIO_MAX = 300
const USERNAME_RE = /^[a-z0-9_]{3,20}$/
const URL_RE = /^https?:\/\/[^\s]{3,}$/i
const LINK_FIELDS = [
  { key: 'githubUrl', label: 'GitHub', icon: Github, placeholder: 'https://github.com/username' },
  { key: 'linkedinUrl', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/username' },
  { key: 'portfolioUrl', label: 'Portfolio / website', icon: Globe, placeholder: 'https://your-site.com' },
]
const EASE = [0.16, 1, 0.3, 1]
const NEXT_RANK = { E: 'D', D: 'C', C: 'B', B: 'A', A: 'S' }

function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('') || '?'
}
function fmtMonthYear(iso) {
  if (!iso) return '—'
  try { return new Date(iso).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) }
  catch { return '—' }
}

export default function MyProfilePage() {
  const { user } = useAuth()
  const { theme } = useTheme()
  const reduce = useReducedMotion()
  const [form, setForm] = useState({ fullName: '', username: '', bio: '', avatarColor: '#4F46E5', githubUrl: '', linkedinUrl: '', portfolioUrl: '' })
  const [linkErrors, setLinkErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(false)
  const [usernameError, setUsernameError] = useState('')
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || '',
        username: user.username || '',
        bio: user.bio || '',
        avatarColor: user.avatarColor || '#4F46E5',
        githubUrl: user.githubUrl || '',
        linkedinUrl: user.linkedinUrl || '',
        portfolioUrl: user.portfolioUrl || '',
      })
    }
  }, [user])

  const isGuest = user?.role === 'GUEST'
  const profileUrl = form.username ? `${window.location.origin}/u/${form.username}` : ''

  const xp = user?.xp || 0
  // theme is a dep so rank colours re-resolve when the user flips the theme.
  const rank = useMemo(() => getRank(xp), [xp, theme]) // eslint-disable-line react-hooks/exhaustive-deps
  const progress = Math.max(0, Math.min(100, rank.progress || 0))
  const toNext = rank.next ? rank.next - xp : 0

  const activeLinks = LINK_FIELDS.filter(l => form[l.key]?.trim())

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (k === 'username') setUsernameError('')
    if (k in { githubUrl: 1, linkedinUrl: 1, portfolioUrl: 1 }) {
      setLinkErrors(e => { const n = { ...e }; delete n[k]; return n })
    }
  }

  const save = async (e) => {
    e.preventDefault()
    if (saving) return

    const username = form.username.trim().toLowerCase()
    if (!USERNAME_RE.test(username)) {
      setUsernameError('Username must be 3–20 characters: lowercase letters, numbers or underscore.')
      return
    }

    const nextLinkErrors = {}
    LINK_FIELDS.forEach(({ key, label }) => {
      const v = form[key].trim()
      if (v && !URL_RE.test(v)) nextLinkErrors[key] = `${label} must be a full URL starting with https://`
    })
    if (Object.keys(nextLinkErrors).length) { setLinkErrors(nextLinkErrors); return }

    setUsernameError('')
    setLinkErrors({})
    setSaving(true)
    try {
      const { data } = await updateProfile({
        fullName: form.fullName,
        username,
        bio: form.bio,
        avatarColor: form.avatarColor,
        githubUrl: form.githubUrl.trim(),
        linkedinUrl: form.linkedinUrl.trim(),
        portfolioUrl: form.portfolioUrl.trim(),
      })
      if (data?.username) set('username', data.username)
      toast.success('Profile updated')
      window.dispatchEvent(new Event('sl:refresh'))
    } catch (err) {
      const msg = getApiError(err, 'We could not save your changes. Please review the fields and try again.')
      if (/username/i.test(msg)) setUsernameError(msg)
      else toast.error(msg)
    } finally {
      if (mountedRef.current) setSaving(false)
    }
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl)
      setCopied(true)
      setTimeout(() => mountedRef.current && setCopied(false), 1600)
    } catch { toast.error('Could not copy the link.') }
  }

  const rise = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: EASE, delay },
  })

  return (
    <div className="mp-page">
      <Navbar sticky />

      <div className="mp-shell">
        <div className="mp-head">
          <h1 className="mp-head__title"><UserIcon size={24} /> My Profile</h1>
          <p className="mp-head__sub">This is how you show up across ARISE and on your public hunter card.</p>
        </div>

        {isGuest ? (
          <div className="mp-guest">
            Guest accounts can’t be customised.<br />
            <Link to="/register" style={{ color: 'var(--accent-light)', fontWeight: 700 }}>Create a free account</Link> to unlock your profile, rank and shareable card.
          </div>
        ) : (
          <div className="mp-grid">
            {/* ── Left: live identity card ── */}
            <motion.aside className="mp-identity" style={{ '--rank-color': rank.color }} {...rise(0)}>
              <div className="mp-id__top">
                <div className="mp-id__avatar" style={{ background: form.avatarColor || '#4F46E5' }}>
                  {initials(form.fullName)}
                </div>
                <div style={{ minWidth: 0 }}>
                  <h2 className="mp-id__name">{form.fullName || 'Your name'}</h2>
                  <p className="mp-id__handle">@{form.username || 'username'}</p>
                </div>
              </div>

              {form.bio && <p className="mp-id__bio">{form.bio}</p>}

              <div className="mp-rank" style={{ marginTop: form.bio ? 16 : 0 }}>
                <div className="mp-rank__badge">{rank.label}</div>
                <div className="mp-rank__info">
                  <div className="mp-rank__value">Rank {rank.label}</div>
                  <div className="mp-xp__bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                    <div className="mp-xp__fill" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="mp-xp__meta">
                    <span>{xp.toLocaleString()} XP</span>
                    <span>{rank.next ? `${toNext.toLocaleString()} XP to Rank ${NEXT_RANK[rank.label] || ''}`.trim() : 'Max rank reached'}</span>
                  </div>
                </div>
              </div>

              <div className="mp-stats">
                <div className="mp-stat">
                  <div className="mp-stat__num">{user?.level ?? 1}</div>
                  <div className="mp-stat__label">Level</div>
                </div>
                <div className="mp-stat">
                  <div className="mp-stat__num">{xp.toLocaleString()}</div>
                  <div className="mp-stat__label">Total XP</div>
                </div>
                <div className="mp-stat">
                  <div className="mp-stat__num">{fmtMonthYear(user?.createdAt)}</div>
                  <div className="mp-stat__label">Joined</div>
                </div>
              </div>

              {activeLinks.length > 0 && (
                <div className="mp-links">
                  {activeLinks.map(({ key, label, icon: Icon }) => (
                    <a key={key} className="mp-link" href={form[key]} target="_blank" rel="noopener noreferrer">
                      <Icon size={14} /> {label}
                    </a>
                  ))}
                </div>
              )}

              {profileUrl && (
                <div className="mp-share">
                  <span className="mp-share__url">{profileUrl}</span>
                  <button type="button" className="mp-share__btn" onClick={copyLink} aria-label="Copy profile link">
                    {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? 'Copied' : 'Copy'}
                  </button>
                  <a className="mp-share__btn" href={profileUrl} target="_blank" rel="noreferrer" aria-label="Open public profile">
                    <ExternalLink size={13} /> View
                  </a>
                </div>
              )}
            </motion.aside>

            {/* ── Right: editor ── */}
            <motion.form className="mp-editor" onSubmit={save} {...rise(0.08)}>
              <div className="mp-card">
                <h2 className="mp-card__title"><UserIcon size={17} /> Profile details</h2>
                <p className="mp-card__hint">Your name, handle and bio — the card on the left updates as you type.</p>

                <div className="mp-fields-2">
                  <div className="feat-field">
                    <label htmlFor="s-name">Display name</label>
                    <input id="s-name" className="feat-affix-input"
                      value={form.fullName} maxLength={60}
                      onChange={e => set('fullName', e.target.value)} />
                  </div>

                  <div className="feat-field">
                    <label htmlFor="s-username">Username</label>
                    <div className="feat-input-affix">
                      <AtSign size={14} className="feat-input-affix__icon" />
                      <input id="s-username"
                        className={`feat-affix-input${usernameError ? ' has-error' : ''}`}
                        value={form.username} maxLength={20}
                        autoComplete="off" spellCheck={false}
                        onChange={e => set('username', e.target.value.toLowerCase().replace(/\s+/g, ''))} />
                    </div>
                  </div>
                </div>
                {usernameError
                  ? <div className="feat-field-error" style={{ marginTop: -6, marginBottom: 12 }}>{usernameError}</div>
                  : <div className="feat-field-hint" style={{ marginTop: -6, marginBottom: 12 }}>Created from your email — change it to anything unique. 3–20 characters.</div>}

                <div className="feat-field">
                  <label htmlFor="s-bio">Bio</label>
                  <textarea id="s-bio" rows={3} maxLength={BIO_MAX}
                    style={{ border: '1px solid var(--border)', borderRadius: 9, padding: '9px 12px', width: '100%', background: 'transparent', color: 'var(--text-primary)', resize: 'vertical', fontFamily: 'inherit' }}
                    value={form.bio} onChange={e => set('bio', e.target.value)} />
                  <div className="feat-field-hint">{form.bio.length}/{BIO_MAX}</div>
                </div>

                <div className="feat-field" style={{ marginBottom: 0 }}>
                  <label>Avatar colour</label>
                  <div className="feat-color-row">
                    {AVATAR_COLORS.map(c => (
                      <button key={c} type="button"
                        className={`feat-color-swatch${form.avatarColor === c ? ' is-active' : ''}`}
                        style={{ background: c }}
                        aria-label={`Select colour ${c}`}
                        aria-pressed={form.avatarColor === c}
                        onClick={() => set('avatarColor', c)} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mp-card">
                <h2 className="mp-card__title"><Globe size={17} /> Career links</h2>
                <p className="mp-card__hint">Optional — recruiters and visitors see these on your public profile.</p>
                {LINK_FIELDS.map(({ key, label, icon: Icon, placeholder }) => (
                  <div key={key} className="feat-field" style={{ marginBottom: 12 }}>
                    <div className="feat-input-affix">
                      <Icon size={14} className="feat-input-affix__icon" />
                      <input
                        className={`feat-affix-input${linkErrors[key] ? ' has-error' : ''}`}
                        type="url" inputMode="url" autoComplete="off" spellCheck={false}
                        placeholder={placeholder}
                        aria-label={label}
                        value={form[key]}
                        onChange={e => set(key, e.target.value)} />
                    </div>
                    {linkErrors[key] && <div className="feat-field-error">{linkErrors[key]}</div>}
                  </div>
                ))}
              </div>

              <div className="mp-card">
                <h2 className="mp-card__title"><Shield size={17} /> Account</h2>
                <div className="feat-field" style={{ marginBottom: 0 }}>
                  <label htmlFor="s-email">Email</label>
                  <input id="s-email" className="feat-affix-input is-readonly" value={user?.email || ''} readOnly disabled />
                  <div className="feat-field-hint">Used to sign in — it can’t be changed here and is never shown publicly.</div>
                </div>
              </div>

              <div className="feat-section-actions">
                <button type="submit" className="feat-save-btn" disabled={saving}>
                  <Save size={15} /> {saving ? 'Saving…' : 'Save changes'}
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </div>
    </div>
  )
}
