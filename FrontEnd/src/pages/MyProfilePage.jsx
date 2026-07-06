import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { User as UserIcon, Shield, Copy, Check, ExternalLink, Save, Bookmark } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { updateProfile } from '../api/api'
import { getApiError } from '../utils/apiError'
import FeatureTopBar from '../components/FeatureTopBar'
import toast from 'react-hot-toast'

const AVATAR_COLORS = [
  '#4F46E5', '#7C3AED', '#DB2777', '#DC2626', '#EA580C',
  '#D97706', '#16A34A', '#0891B2', '#2563EB', '#475569',
]
const BIO_MAX = 300

function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('') || '?'
}

export default function MyProfilePage() {
  const { user } = useAuth()
  const [form, setForm] = useState({ fullName: '', username: '', bio: '', avatarColor: '#4F46E5' })
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(false)
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
      })
    }
  }, [user])

  const isGuest = user?.role === 'GUEST'
  const profileUrl = form.username ? `${window.location.origin}/u/${form.username}` : ''

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const save = async (e) => {
    e.preventDefault()
    if (saving) return
    setSaving(true)
    try {
      await updateProfile({
        fullName: form.fullName,
        username: form.username,
        bio: form.bio,
        avatarColor: form.avatarColor,
      })
      toast.success('Profile updated')
      window.dispatchEvent(new Event('sl:refresh'))
    } catch (err) {
      toast.error(getApiError(err, 'We could not save your changes. Please review the fields and try again.'))
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

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <FeatureTopBar />

      <div className="feat-page">
        <div className="feat-page-header">
          <h1 className="feat-page-title"><UserIcon size={22} /> My Profile</h1>
          <p className="feat-page-sub">Manage your details and how your public profile appears to others.</p>
        </div>

        {isGuest ? (
          <div className="feat-empty">
            Guest accounts cannot be customised. <Link to="/register" style={{ color: 'var(--accent-light)' }}>Create a free account</Link> to unlock your profile.
          </div>
        ) : (
          <form onSubmit={save}>
            {/* Live preview */}
            <div className="feat-profile-hero" style={{ marginBottom: 18 }}>
              <div className="feat-profile-avatar" style={{ background: form.avatarColor || '#4F46E5' }}>
                {initials(form.fullName)}
              </div>
              <div style={{ minWidth: 0 }}>
                <h2 className="feat-profile-name">{form.fullName || 'Your name'}</h2>
                <p className="feat-profile-handle">@{form.username || 'username'}</p>
                {form.bio && <p className="feat-profile-bio">{form.bio}</p>}
              </div>
            </div>

            {/* Profile */}
            <div className="feat-section">
              <h2 className="feat-section-title"><UserIcon size={16} /> Profile details</h2>

              <div className="feat-field">
                <label htmlFor="s-name">Display name</label>
                <input id="s-name" className="feat-search-input" style={{ border: '1px solid var(--border)', borderRadius: 9, padding: '9px 12px', width: '100%' }}
                  value={form.fullName} maxLength={60}
                  onChange={e => set('fullName', e.target.value)} />
              </div>

              <div className="feat-field">
                <label htmlFor="s-username">Username</label>
                <input id="s-username" className="feat-search-input" style={{ border: '1px solid var(--border)', borderRadius: 9, padding: '9px 12px', width: '100%' }}
                  value={form.username} maxLength={20}
                  onChange={e => set('username', e.target.value.toLowerCase())} />
                <div className="feat-field-hint">3–20 characters: lowercase letters, numbers or underscore. This forms your public profile link.</div>
              </div>

              <div className="feat-field">
                <label htmlFor="s-bio">Bio</label>
                <textarea id="s-bio" rows={3} maxLength={BIO_MAX}
                  style={{ border: '1px solid var(--border)', borderRadius: 9, padding: '9px 12px', width: '100%', background: 'transparent', color: 'var(--text-primary)', resize: 'vertical', fontFamily: 'inherit' }}
                  value={form.bio} onChange={e => set('bio', e.target.value)} />
                <div className="feat-field-hint">{form.bio.length}/{BIO_MAX}</div>
              </div>

              <div className="feat-field">
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

              <button type="submit" className="feat-bookmark-btn is-saved" disabled={saving}>
                <Save size={15} /> {saving ? 'Saving…' : 'Save changes'}
              </button>
            </div>

            {/* Public profile sharing */}
            <div className="feat-section">
              <h2 className="feat-section-title"><Shield size={16} /> Public profile</h2>
              <p className="feat-field-hint" style={{ marginBottom: 12 }}>
                Anyone with your link can view your safe public info (name, username, bio, rank and badges).
                Your email and private data are never shared.
              </p>
              {profileUrl && (
                <div className="feat-search-bar" style={{ marginBottom: 0 }}>
                  <span className="feat-search-input" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{profileUrl}</span>
                  <button type="button" className="feat-bookmark-btn" onClick={copyLink} aria-label="Copy profile link">
                    {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
                  </button>
                  <a className="feat-bookmark-btn" href={profileUrl} target="_blank" rel="noreferrer" aria-label="Open profile">
                    <ExternalLink size={14} /> View
                  </a>
                </div>
              )}
            </div>

            {/* Account */}
            <div className="feat-section">
              <h2 className="feat-section-title"><UserIcon size={16} /> Account</h2>
              <div className="feat-field">
                <label>Email</label>
                <div className="feat-field-hint" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{user?.email}</div>
              </div>
              <Link to="/bookmarks" className="feat-bookmark-btn" style={{ textDecoration: 'none' }}>
                <Bookmark size={14} /> My Bookmarks
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
