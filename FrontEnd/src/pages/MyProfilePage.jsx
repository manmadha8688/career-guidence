import { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  User as UserIcon, AtSign, Mail, Lock, MapPin, GraduationCap, Building2, Phone,
  Github, Linkedin, Globe, Check, X, Loader2, Save, Share2, ExternalLink,
  Eye, EyeOff, FileText, Unlink, ShieldCheck,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import {
  updateProfile, checkUsername, listResumes, connectGitHub, disconnectGitHub, clearUserCache,
  sendProfileContactOtp, verifyProfileContactOtp,
} from '../api/api'
import { getApiError } from '../utils/apiError'
import { getLinkVerificationResults, isLinkVerificationError } from '../utils/linkVerification'
import { linkedinUrlState, LINKEDIN_URL_HINT } from '../utils/linkedinUrl'
import { normalizeHttpUrl, isLooseHttpUrl } from '../utils/normalizeHttpUrl'
import { saveOnEnter } from '../utils/saveOnEnter'
import { safeExternalUrl } from '../utils/safeExternalUrl'
import { isGuest } from '../utils/auth'
import { disconnectGitHubConfirmOptions, removeProfileLinkConfirmOptions } from '../utils/confirmRemoveLink'
import { useConfirm } from '../context/ConfirmContext'
import { getRank } from '../utils/slRank'
import { getInitials as initials } from '../utils/initials'
import Navbar from '../components/navbars/Navbar'
import LinkVerifyModal from '../components/LinkVerifyModal'
import GitHubConnectModal from '../components/GitHubConnectModal'
import { useUnsavedChangesGuard } from '../hooks/useUnsavedChangesGuard'
import toast from 'react-hot-toast'
import '../styles/pages/shared/my-profile.css'

const BIO_MAX = 150
const USERNAME_RE = /^[a-z0-9_]{3,20}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[+]?\d[\d\s().-]{6,17}$/
const EASE = [0.16, 1, 0.3, 1]

const AVATAR_COLORS = [
  '#6366F1', '#8B5CF6', '#EC4899', '#EF4444', '#F97316',
  '#F59E0B', '#10B981', '#06B6D4', '#3B82F6', '#64748B',
]
const LINK_FIELDS = [
  { key: 'linkedinUrl', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://www.linkedin.com/in/your-name' },
  { key: 'portfolioUrl', label: 'Portfolio / website', icon: Globe, placeholder: 'https://your-site.com' },
]
const GITHUB_ERRORS = {
  denied: 'GitHub connection was cancelled.',
  already_linked: 'That GitHub is already linked to another ARISE account. Use your own GitHub, or ask them to disconnect first.',
  unavailable: 'GitHub connect is not configured yet. Try again later.',
  guest: 'Guest accounts cannot connect GitHub.',
  invalid: 'GitHub connection expired. Please try again.',
  failed: 'Could not connect GitHub. Please try again.',
}

// "+N XP" suffix when a profile save unlocked one-time completion XP (0 → no suffix)
const xpSuffix = (data) => (data?.xpEarned > 0 ? ` · +${data.xpEarned} XP` : '')

const EMPTY_EDU = { degree: '', fieldOfStudy: '', institution: '', years: '', cgpa: '' }
// Backend stores blank education fields as null; coerce to '' so inputs stay controlled.
function normEdu(e = {}) {
  let years = e?.years || ''
  if (!years) {
    const start = e?.yearStart?.trim()
    const end = (e?.yearEnd || e?.graduationYear || '').trim()
    if (start && end) years = `${start} - ${end}`
    else if (end) years = end
    else if (start) years = start
  }
  return {
    degree: e?.degree || '',
    fieldOfStudy: e?.fieldOfStudy || '',
    institution: e?.institution || '',
    years,
    cgpa: e?.cgpa || '',
  }
}
const EMPTY_FORM = {
  fullName: '', username: '', bio: '', avatarColor: '#6366F1', location: '', publicEmail: '', mobile: '',
  contactEmailMode: 'different',
  linkedinUrl: '', portfolioUrl: '',
  education: { ...EMPTY_EDU }, publicProfile: true, featuredResumeId: '',
}

function fmtMonthYear(iso) {
  if (!iso) return '—'
  try { return new Date(iso).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) }
  catch { return '—' }
}
// Personal + education only (links and resume save separately).
function personalSnapshot(f) {
  return JSON.stringify({
    fullName: f.fullName.trim(),
    username: f.username.trim().toLowerCase(),
    bio: f.bio.trim(),
    avatarColor: f.avatarColor,
    location: f.location.trim(),
    publicEmail: f.publicEmail.trim(),
    contactEmailMode: f.contactEmailMode,
    mobile: f.mobile.trim(),
    education: {
      degree: (f.education.degree || '').trim(),
      fieldOfStudy: (f.education.fieldOfStudy || '').trim(),
      institution: (f.education.institution || '').trim(),
      years: (f.education.years || '').trim(),
      cgpa: (f.education.cgpa || '').trim(),
    },
  })
}
function portfolioUrlState(v) {
  if (!v || !v.trim()) return 'empty'
  return isLooseHttpUrl(v) ? 'valid' : 'invalid'
}
function emailState(v) {
  if (!v || !v.trim()) return 'empty'
  return EMAIL_RE.test(v.trim()) ? 'valid' : 'invalid'
}
function phoneState(v) {
  if (!v || !v.trim()) return 'empty'
  return PHONE_RE.test(v.trim()) ? 'valid' : 'invalid'
}
function normEmail(v) {
  return (v || '').trim().toLowerCase()
}

// Isolated so the 1s cooldown countdown re-renders ONLY this button, not the
// entire MyProfilePage. Driven by a `cooldownUntil` timestamp (changes only when
// an OTP is sent), so the parent no longer ticks every second. Output identical to
// the previous inline button.
const ContactOtpButton = memo(function ContactOtpButton({ sending, sent, cooldownUntil, disabledExtra, onClick }) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!cooldownUntil || cooldownUntil <= Date.now()) return
    setNow(Date.now())
    const t = setInterval(() => {
      const n = Date.now()
      setNow(n)
      if (n >= cooldownUntil) clearInterval(t)
    }, 1000)
    return () => clearInterval(t)
  }, [cooldownUntil])
  const remaining = cooldownUntil ? Math.max(0, Math.ceil((cooldownUntil - now) / 1000)) : 0
  return (
    <button
      type="button"
      className="mpx-btn-otp"
      onClick={onClick}
      disabled={sending || remaining > 0 || disabledExtra}
    >
      {sending ? '…' : sent && remaining > 0 ? `${remaining}s` : sent ? 'Resend' : 'Verify'}
    </button>
  )
})

export default function MyProfilePage() {
  const { user, loading } = useAuth()
  const { theme } = useTheme()
  const confirm = useConfirm()
  const reduce = useReducedMotion()

  const [form, setForm] = useState(EMPTY_FORM)
  const [personalBaseline, setPersonalBaseline] = useState(null)
  const [savedLinkedin, setSavedLinkedin] = useState('')
  const [savedPortfolio, setSavedPortfolio] = useState('')
  const [savedFeaturedResumeId, setSavedFeaturedResumeId] = useState('')
  const [resumes, setResumes] = useState([])
  const [resumesLoaded, setResumesLoaded] = useState(false)
  const [savingPersonal, setSavingPersonal] = useState(false)
  const [savingLinkedin, setSavingLinkedin] = useState(false)
  const [savingPortfolio, setSavingPortfolio] = useState(false)
  const [savingResume, setSavingResume] = useState(false)
  const [privacyBusy, setPrivacyBusy] = useState(false)
  const [githubBusy, setGithubBusy] = useState(false)
  const [githubConnectOpen, setGithubConnectOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [usernameStatus, setUsernameStatus] = useState('idle') // idle|checking|available|taken|invalid
  const [usernameError, setUsernameError] = useState('')
  const [linkedinErr, setLinkedinErr] = useState('')
  const [portfolioErr, setPortfolioErr] = useState('')
  const [contactOtpSent, setContactOtpSent] = useState(false)
  const [contactOtp, setContactOtp] = useState('')
  const [verifiedContactEmail, setVerifiedContactEmail] = useState('')
  const [sendingContactOtp, setSendingContactOtp] = useState(false)
  const [verifyingContactOtp, setVerifyingContactOtp] = useState(false)
  const [contactOtpCooldownUntil, setContactOtpCooldownUntil] = useState(0)
  const [contactEmailError, setContactEmailError] = useState('')
  const [savedContactEmail, setSavedContactEmail] = useState('')
  const [linkVerifyResults, setLinkVerifyResults] = useState(null)
  const [showPortfolioFormatError, setShowPortfolioFormatError] = useState(false)

  const mountedRef = useRef(true)
  const initializedRef = useRef(false)
  const originalUsernameRef = useRef('')
  const pendingLinkKeyRef = useRef(null)
  const leaveGuardRef = useRef({ notifyDeferredLeave: () => {}, completePendingLeave: () => {} })
  const saveAllBeforeLeaveRef = useRef(async () => true)
  const socialLinksRef = useRef(null)

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
      contactEmailMode: user.useLoginEmailForContact ? 'same' : 'different',
      mobile: user.mobile || '',
      linkedinUrl: user.linkedinUrl || '',
      portfolioUrl: user.portfolioUrl || '',
      education: normEdu(user.education),
      publicProfile: user.publicProfile !== false,
      featuredResumeId: user.featuredResumeId || '',
    }
    setForm(next)
    setPersonalBaseline(personalSnapshot(next))
    setSavedLinkedin(user.linkedinUrl || '')
    setSavedPortfolio(user.portfolioUrl || '')
    setSavedFeaturedResumeId(user.featuredResumeId || '')
    originalUsernameRef.current = (user.username || '').toLowerCase()
    setSavedContactEmail(user.useLoginEmailForContact ? '' : normEmail(user.publicEmail))
    initializedRef.current = true
  }, [user])

  const startContactOtpCooldown = useCallback((seconds) => {
    setContactOtpCooldownUntil(Date.now() + seconds * 1000)
  }, [])

  const resetContactOtp = useCallback(() => {
    setContactOtpSent(false)
    setContactOtp('')
    setVerifiedContactEmail('')
    setContactEmailError('')
  }, [])

  // useCallback so the memoized ContactOtpButton doesn't re-render on every parent tick.
  const handleSendContactOtp = useCallback(async () => {
    if (emailState(form.publicEmail) !== 'valid') {
      toast.error('Please enter a valid contact email first.')
      return
    }
    setContactEmailError('')
    setSendingContactOtp(true)
    try {
      await sendProfileContactOtp(form.publicEmail.trim())
      setContactOtpSent(true)
      setContactOtp('')
      startContactOtpCooldown(60)
      toast.success('We sent a 6-digit code to your inbox.')
    } catch (err) {
      const retryAfter = err.response?.data?.retryAfter
      const msg = getApiError(err, 'We could not send the code. Please try again.')
      if (retryAfter) {
        startContactOtpCooldown(retryAfter)
        toast.error(`Please wait ${retryAfter}s before requesting another code.`)
      } else {
        setContactEmailError(msg)
        toast.error(msg)
      }
    } finally {
      if (mountedRef.current) setSendingContactOtp(false)
    }
  }, [form.publicEmail, startContactOtpCooldown])

  const handleVerifyContactOtp = useCallback(async (code = contactOtp) => {
    if (code.length !== 6 || emailState(form.publicEmail) !== 'valid') return
    setVerifyingContactOtp(true)
    try {
      await verifyProfileContactOtp(form.publicEmail.trim(), code)
      setVerifiedContactEmail(normEmail(form.publicEmail))
      setContactOtpSent(false)
      setContactOtp('')
      toast.success('Contact email verified — save your personal details when ready.')
    } catch (err) {
      toast.error(getApiError(err, 'That code did not work. Please check your email and try again.'))
    } finally {
      if (mountedRef.current) setVerifyingContactOtp(false)
    }
  }, [contactOtp, form.publicEmail])

  useEffect(() => {
    if (contactOtp.length !== 6 || !contactOtpSent || verifyingContactOtp) return
    if (normEmail(form.publicEmail) === savedContactEmail) return
    if (normEmail(form.publicEmail) === verifiedContactEmail) return
    handleVerifyContactOtp(contactOtp)
  }, [contactOtp, contactOtpSent, verifyingContactOtp, form.publicEmail, verifiedContactEmail, savedContactEmail, handleVerifyContactOtp])

  // Load the user's resumes (for the "resume on profile" picker).
  useEffect(() => {
    if (isGuest(user)) return
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
    setSavedFeaturedResumeId('')
    updateProfile({ featuredResumeId: '' }).catch(() => {})
    window.dispatchEvent(new Event('sl:refresh'))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumes, resumesLoaded])

  // OAuth return from GitHub (backend redirects to /myprofile?github=…#social-links).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const gh = params.get('github')
    const shouldScroll = gh || window.location.hash === '#social-links'

    if (gh === 'connected') {
      clearUserCache()
      const xp = parseInt(params.get('xp'), 10)
      toast.success(`GitHub connected — your profile link is verified.${xp > 0 ? ` · +${xp} XP` : ''}`)
      window.dispatchEvent(new Event('sl:refresh'))
    } else if (gh === 'error') {
      const reason = params.get('reason') || 'failed'
      toast.error(GITHUB_ERRORS[reason] || GITHUB_ERRORS.failed)
    }

    if (gh) {
      params.delete('github')
      params.delete('reason')
      params.delete('xp')
      const qs = params.toString()
      const hash = shouldScroll ? '#social-links' : ''
      window.history.replaceState(window.history.state, '', window.location.pathname + (qs ? `?${qs}` : '') + hash)
    }

    if (shouldScroll) {
      const t = setTimeout(() => {
        socialLinksRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      }, 120)
      return () => clearTimeout(t)
    }
  }, [reduce])

  // Keep GitHub UI in sync with /me after connect, disconnect, or sl:refresh — URL comes from OAuth only.

  const guest = isGuest(user)
  const githubConnected = !!user?.githubConnected
  const profileUrl = form.username ? `${window.location.origin}/u/${form.username}` : ''
  const contactEmailNorm = normEmail(form.publicEmail)
  const loginEmailNorm = normEmail(user?.email)
  const contactEmailVerified = form.contactEmailMode !== 'different'
    || emailState(form.publicEmail) !== 'valid'
    || contactEmailNorm === savedContactEmail
    || contactEmailNorm === verifiedContactEmail
  const contactEmailIsLogin = contactEmailNorm && contactEmailNorm === loginEmailNorm

  const xp = user?.xp || 0
  const rank = useMemo(() => getRank(xp), [xp, theme]) // eslint-disable-line react-hooks/exhaustive-deps

  const isPersonalDirty = useMemo(
    () => personalBaseline != null && personalSnapshot(form) !== personalBaseline,
    [form, personalBaseline])
  const linkedinTrim = form.linkedinUrl.trim()
  const portfolioTrim = form.portfolioUrl.trim()
  const canSaveLinkedin = !savingLinkedin && !savingPortfolio
    && linkedinTrim !== savedLinkedin
    && (linkedinTrim !== '' || savedLinkedin !== '')
    && (linkedinUrlState(form.linkedinUrl) === 'valid' || linkedinTrim === '')
  const canSavePortfolio = !savingLinkedin && !savingPortfolio
    && portfolioTrim !== savedPortfolio
    && (portfolioTrim !== '' || savedPortfolio !== '')
    && portfolioUrlState(form.portfolioUrl) !== 'invalid'
  const isSocialDirty = linkedinTrim !== savedLinkedin || portfolioTrim !== savedPortfolio
  const isPageDirty = isPersonalDirty || isSocialDirty
  // Name the exact unsaved section(s) so the leave prompt is specific, not generic.
  const unsavedSections = [
    isPersonalDirty && 'personal details',
    isSocialDirty && 'social links',
  ].filter(Boolean)

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

  const applyPersonalSuccess = (data) => {
    const saved = {
      ...form,
      fullName: data?.fullName ?? form.fullName,
      username: data?.username ?? form.username,
      bio: data?.bio ?? form.bio,
      avatarColor: data?.avatarColor ?? form.avatarColor,
      location: data?.location ?? form.location,
      publicEmail: data?.publicEmail ?? form.publicEmail,
      contactEmailMode: data?.useLoginEmailForContact ? 'same' : 'different',
      mobile: data?.mobile ?? form.mobile,
      education: normEdu(data?.education || form.education),
    }
    if (!mountedRef.current) return
    setForm(saved)
    setPersonalBaseline(personalSnapshot(saved))
    originalUsernameRef.current = (saved.username || '').toLowerCase()
    setSavedContactEmail(saved.contactEmailMode === 'different' ? normEmail(saved.publicEmail) : '')
    resetContactOtp()
    window.dispatchEvent(new Event('sl:refresh'))
  }

  const applyLinkSuccess = (data, key) => {
    const val = (data?.[key] ?? '').trim()
    if (!mountedRef.current) return
    setForm(f => ({ ...f, [key]: val }))
    if (key === 'linkedinUrl') {
      setSavedLinkedin(val)
      setLinkedinErr('')
    } else {
      setSavedPortfolio(val)
      setPortfolioErr('')
    }
    setLinkVerifyResults(null)
    pendingLinkKeyRef.current = null
    setShowPortfolioFormatError(false)
    window.dispatchEvent(new Event('sl:refresh'))
  }

  const handleSavePersonal = async () => {
    if (savingPersonal || !isPersonalDirty) return

    const username = form.username.trim().toLowerCase()
    if (!USERNAME_RE.test(username)) {
      setUsernameError('Username must be 3–20 characters: lowercase letters, numbers or underscore.')
      return
    }
    if (usernameStatus === 'taken') {
      setUsernameError('That username is already taken.')
      return
    }
    if (form.contactEmailMode === 'different' && emailState(form.publicEmail) === 'invalid') {
      toast.error('Please enter a valid contact email address')
      return
    }
    if (form.contactEmailMode === 'different' && emailState(form.publicEmail) === 'valid' && !contactEmailVerified) {
      toast.error('Verify your contact email with the code we sent before saving.')
      return
    }
    if (phoneState(form.mobile) === 'invalid') {
      toast.error('Please enter a valid mobile number')
      return
    }

    setUsernameError('')
    const payload = {
      fullName: form.fullName,
      username,
      bio: form.bio,
      avatarColor: form.avatarColor,
      location: form.location.trim(),
      publicEmail: form.contactEmailMode === 'same' ? '' : form.publicEmail.trim(),
      useLoginEmailForContact: form.contactEmailMode === 'same',
      mobile: form.mobile.trim(),
      education: {
        degree: (form.education.degree || '').trim(),
        fieldOfStudy: (form.education.fieldOfStudy || '').trim(),
        institution: (form.education.institution || '').trim(),
        years: (form.education.years || '').trim(),
        cgpa: (form.education.cgpa || '').trim(),
      },
    }
    setSavingPersonal(true)
    try {
      const { data } = await updateProfile(payload)
      applyPersonalSuccess(data)
      toast.success(`Personal details saved${xpSuffix(data)}`)
    } catch (err) {
      const msg = getApiError(err, 'We could not save your details. Please review the fields and try again.')
      if (/username/i.test(msg)) setUsernameError(msg)
      else toast.error(msg)
    } finally {
      if (mountedRef.current) setSavingPersonal(false)
    }
  }

  const executeLinkSave = async (key, skipLinkVerification = false, rawOverride) => {
    const raw = (rawOverride !== undefined
      ? rawOverride
      : (key === 'linkedinUrl' ? form.linkedinUrl : form.portfolioUrl)).trim()
    const url = raw ? normalizeHttpUrl(raw) : ''
    const body = {
      [key]: url,
      ...(skipLinkVerification ? { skipLinkVerification: true } : {}),
    }
    const { data } = await updateProfile(body)
    applyLinkSuccess(data, key)
    const label = key === 'linkedinUrl' ? 'LinkedIn' : 'Portfolio'
    toast.success(url ? `${label} saved${xpSuffix(data)}` : `${label} removed`)
  }

  const handleSaveLinkedin = async () => {
    setLinkedinErr('')
    if (!canSaveLinkedin) return
    if (linkedinTrim && linkedinUrlState(form.linkedinUrl) !== 'valid') {
      setLinkedinErr(LINKEDIN_URL_HINT)
      return
    }
    pendingLinkKeyRef.current = 'linkedinUrl'
    setSavingLinkedin(true)
    try {
      await executeLinkSave('linkedinUrl', false)
    } catch (err) {
      if (isLinkVerificationError(err)) {
        setLinkVerifyResults(getLinkVerificationResults(err))
        setLinkedinErr('')
        setPortfolioErr('')
        return
      }
      setLinkedinErr(getApiError(err, 'Could not save LinkedIn. Check the URL and try again.'))
    } finally {
      if (mountedRef.current) setSavingLinkedin(false)
    }
  }

  const handleSavePortfolio = async () => {
    setPortfolioErr('')
    setShowPortfolioFormatError(false)
    if (!canSavePortfolio) return
    const raw = form.portfolioUrl.trim()
    if (raw && !isLooseHttpUrl(raw)) {
      setShowPortfolioFormatError(true)
      setPortfolioErr('Enter a valid link like your-site.com or https://your-site.com')
      return
    }
    pendingLinkKeyRef.current = 'portfolioUrl'
    setSavingPortfolio(true)
    try {
      await executeLinkSave('portfolioUrl', false)
    } catch (err) {
      if (isLinkVerificationError(err)) {
        setLinkVerifyResults(getLinkVerificationResults(err))
        setPortfolioErr('')
        return
      }
      setPortfolioErr(getApiError(err, 'Could not save portfolio link. Check the URL and try again.'))
    } finally {
      if (mountedRef.current) setSavingPortfolio(false)
    }
  }

  const handleRemoveLink = async (key) => {
    const isLinkedin = key === 'linkedinUrl'
    const name = isLinkedin ? 'LinkedIn' : 'portfolio link'
    const saved = (isLinkedin ? savedLinkedin : savedPortfolio).trim()
    if (!saved || savingLinkedin || savingPortfolio) return
    if (!(await confirm(removeProfileLinkConfirmOptions(name)))) return
    set(key, '')
    if (isLinkedin) setLinkedinErr('')
    else { setPortfolioErr(''); setShowPortfolioFormatError(false) }
    pendingLinkKeyRef.current = key
    if (isLinkedin) setSavingLinkedin(true)
    else setSavingPortfolio(true)
    try {
      await executeLinkSave(key, false, '')
    } catch (err) {
      if (isLinkVerificationError(err)) {
        setLinkVerifyResults(getLinkVerificationResults(err))
        return
      }
      const msg = getApiError(err, 'Could not remove this link. Please try again.')
      if (isLinkedin) setLinkedinErr(msg)
      else setPortfolioErr(msg)
    } finally {
      if (mountedRef.current) {
        setSavingLinkedin(false)
        setSavingPortfolio(false)
      }
    }
  }

  const handleLinkVerifyRetry = async () => {
    const key = pendingLinkKeyRef.current
    if (!key) return undefined
    if (key === 'linkedinUrl') setSavingLinkedin(true)
    else setSavingPortfolio(true)
    try {
      await executeLinkSave(key, false)
      leaveGuardRef.current.completePendingLeave()
      return true
    } catch (err) {
      if (isLinkVerificationError(err)) {
        setLinkVerifyResults(getLinkVerificationResults(err))
        return false
      }
      const msg = getApiError(err, 'We could not save. Please try again.')
      if (key === 'linkedinUrl') setLinkedinErr(msg)
      else setPortfolioErr(msg)
      setLinkVerifyResults(null)
      pendingLinkKeyRef.current = null
      return undefined
    } finally {
      if (mountedRef.current) {
        setSavingLinkedin(false)
        setSavingPortfolio(false)
      }
    }
  }

  const handleLinkVerifyOverride = async () => {
    const key = pendingLinkKeyRef.current
    if (!key) return
    if (key === 'linkedinUrl') setSavingLinkedin(true)
    else setSavingPortfolio(true)
    try {
      await executeLinkSave(key, true)
      leaveGuardRef.current.completePendingLeave()
    } catch (err) {
      if (isLinkVerificationError(err)) {
        setLinkVerifyResults(getLinkVerificationResults(err))
        return
      }
      const msg = getApiError(err, 'We could not save. Please try again.')
      if (key === 'linkedinUrl') setLinkedinErr(msg)
      else setPortfolioErr(msg)
    } finally {
      if (mountedRef.current) {
        setSavingLinkedin(false)
        setSavingPortfolio(false)
      }
    }
  }

  const saveAllBeforeLeave = useCallback(async () => {
    try {
      if (isPersonalDirty) {
        const username = form.username.trim().toLowerCase()
        if (!USERNAME_RE.test(username)) {
          setUsernameError('Username must be 3–20 characters: lowercase letters, numbers or underscore.')
          toast.error('Fix personal details before saving.')
          return false
        }
        if (usernameStatus === 'taken') {
          setUsernameError('That username is already taken.')
          toast.error('Fix personal details before saving.')
          return false
        }
        if (form.contactEmailMode === 'different' && emailState(form.publicEmail) === 'invalid') {
          toast.error('Please enter a valid contact email address')
          return false
        }
        if (form.contactEmailMode === 'different' && emailState(form.publicEmail) === 'valid' && !contactEmailVerified) {
          toast.error('Verify your contact email with the code we sent before saving.')
          return false
        }
        if (phoneState(form.mobile) === 'invalid') {
          toast.error('Please enter a valid mobile number')
          return false
        }
        setUsernameError('')
        const payload = {
          fullName: form.fullName,
          username,
          bio: form.bio,
          avatarColor: form.avatarColor,
          location: form.location.trim(),
          publicEmail: form.contactEmailMode === 'same' ? '' : form.publicEmail.trim(),
          useLoginEmailForContact: form.contactEmailMode === 'same',
          mobile: form.mobile.trim(),
          education: {
            degree: (form.education.degree || '').trim(),
            fieldOfStudy: (form.education.fieldOfStudy || '').trim(),
            institution: (form.education.institution || '').trim(),
            years: (form.education.years || '').trim(),
            cgpa: (form.education.cgpa || '').trim(),
          },
        }
        setSavingPersonal(true)
        try {
          const { data } = await updateProfile(payload)
          applyPersonalSuccess(data)
        } finally {
          if (mountedRef.current) setSavingPersonal(false)
        }
      }
      if (linkedinTrim !== savedLinkedin) {
        if (linkedinTrim && linkedinUrlState(form.linkedinUrl) !== 'valid') {
          setLinkedinErr(LINKEDIN_URL_HINT)
          toast.error('Fix LinkedIn URL before saving.')
          return false
        }
        pendingLinkKeyRef.current = 'linkedinUrl'
        setSavingLinkedin(true)
        try {
          await executeLinkSave('linkedinUrl', false, linkedinTrim)
        } catch (err) {
          if (isLinkVerificationError(err)) {
            setLinkVerifyResults(getLinkVerificationResults(err))
            leaveGuardRef.current.notifyDeferredLeave()
            return false
          }
          setLinkedinErr(getApiError(err, 'Could not save LinkedIn. Check the URL and try again.'))
          return false
        } finally {
          if (mountedRef.current) setSavingLinkedin(false)
        }
      }
      if (portfolioTrim !== savedPortfolio) {
        if (portfolioTrim && !isLooseHttpUrl(portfolioTrim)) {
          setShowPortfolioFormatError(true)
          setPortfolioErr('Enter a valid link like your-site.com or https://your-site.com')
          toast.error('Fix portfolio URL before saving.')
          return false
        }
        pendingLinkKeyRef.current = 'portfolioUrl'
        setSavingPortfolio(true)
        try {
          await executeLinkSave('portfolioUrl', false, portfolioTrim)
        } catch (err) {
          if (isLinkVerificationError(err)) {
            setLinkVerifyResults(getLinkVerificationResults(err))
            leaveGuardRef.current.notifyDeferredLeave()
            return false
          }
          setPortfolioErr(getApiError(err, 'Could not save portfolio link. Check the URL and try again.'))
          return false
        } finally {
          if (mountedRef.current) setSavingPortfolio(false)
        }
      }
      return true
    } catch (err) {
      if (!isLinkVerificationError(err)) {
        toast.error(getApiError(err, 'Could not save your changes.'))
      }
      return false
    }
  }, [
    isPersonalDirty, form, usernameStatus, contactEmailVerified,
    linkedinTrim, savedLinkedin, portfolioTrim, savedPortfolio,
  ])

  saveAllBeforeLeaveRef.current = saveAllBeforeLeave

  const leaveGuard = useUnsavedChangesGuard(isPageDirty, {
    onSave: () => saveAllBeforeLeaveRef.current(),
    saving: savingPersonal || savingLinkedin || savingPortfolio,
    contextLabel: 'profile edits',
    sections: unsavedSections,
  })
  leaveGuardRef.current = {
    notifyDeferredLeave: leaveGuard.notifyDeferredLeave,
    completePendingLeave: leaveGuard.completePendingLeave,
  }
  const { leaveModal } = leaveGuard

  const handleFeaturedResumeChange = async (resumeId) => {
    if (savingResume || resumeId === savedFeaturedResumeId) return
    const prev = savedFeaturedResumeId
    setForm(f => ({ ...f, featuredResumeId: resumeId }))
    setSavingResume(true)
    try {
      const { data } = await updateProfile({ featuredResumeId: resumeId || '' })
      setSavedFeaturedResumeId(resumeId)
      toast.success(resumeId ? `Resume added to your profile${xpSuffix(data)}` : 'Resume removed from your profile')
      window.dispatchEvent(new Event('sl:refresh'))
    } catch (err) {
      setForm(f => ({ ...f, featuredResumeId: prev }))
      toast.error(getApiError(err, 'Could not update your profile resume. Please try again.'))
    } finally {
      if (mountedRef.current) setSavingResume(false)
    }
  }

  const handleConnectGitHub = async () => {
    if (githubBusy) return
    setGithubBusy(true)
    try {
      await connectGitHub()
    } catch (err) {
      toast.error(getApiError(err, 'Could not start GitHub connect. Is the backend running with GITHUB_CLIENT_ID set?'))
      if (mountedRef.current) setGithubBusy(false)
    }
  }

  const handleDisconnectGitHub = async () => {
    if (githubBusy || !githubConnected) return
    if (!(await confirm(disconnectGitHubConfirmOptions()))) return
    setGithubBusy(true)
    try {
      await disconnectGitHub()
      toast.success('GitHub disconnected')
      window.dispatchEvent(new Event('sl:refresh'))
    } catch (err) {
      toast.error(getApiError(err, 'Could not disconnect GitHub. Please try again.'))
    } finally {
      if (mountedRef.current) setGithubBusy(false)
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
          <div className="mpx-skel mpx-skel--sm" />
        </div>
      </div>
    )
  }

  if (guest) {
    return (
      <div className="mpx-page">
        <Navbar sticky />
        <div className="mpx-shell">
          <div className="mpx-guest">
            Guest accounts can’t be customised.<br />
            <Link to="/register" className="mpx-guest__link">Create an account</Link> to unlock your profile and shareable card.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mpx-page">
      <Navbar sticky />

      <div className="mpx-shell">
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
          <div className={`mpx-visibility${form.publicProfile ? ' is-public' : ''}`}>
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
                  <a className="mpx-share__btn" href={profileUrl} target="_blank" rel="noopener noreferrer">
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

        {/* ── Personal information (incl. education) ── */}
        <motion.section className="mpx-card" {...rise(0.05)}>
          <div className="mpx-card__head">
            <h2 className="mpx-card__title"><UserIcon size={17} /> Personal information</h2>
            <p className="mpx-card__sub">Your details and qualification — shown on your public profile.</p>
          </div>

          <div className="mpx-grid-2">
            <div className="mpx-field" style={{ marginBottom: 0 }}>
              <label className="mpx-label" htmlFor="mpx-name">Full name</label>
              <input id="mpx-name" className="mpx-input" value={form.fullName} maxLength={60}
                onChange={e => set('fullName', e.target.value)} placeholder="Your full name" />
            </div>
            <div className="mpx-field" style={{ marginBottom: 0 }}>
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
            </div>
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

          <div className="mpx-field">
            <label className="mpx-label" htmlFor="mpx-bio">Bio</label>
            <textarea id="mpx-bio" className="mpx-input mpx-textarea" rows={3} maxLength={BIO_MAX}
              value={form.bio} onChange={e => set('bio', e.target.value)}
              placeholder="A short line about who you are and what you’re building." />
            <div className={`mpx-counter${form.bio.length >= BIO_MAX ? ' is-max' : ''}`}>{form.bio.length}/{BIO_MAX}</div>
          </div>

          <div className="mpx-grid-2">
            <div className="mpx-field" style={{ marginBottom: 0 }}>
              <label className="mpx-label" htmlFor="mpx-email">Login email
                <span className="mpx-locktip" tabIndex={0} aria-label="Email cannot be changed">
                  <Lock size={12} />
                  <span className="mpx-tooltip">Email cannot be changed</span>
                </span>
              </label>
              <div className="mpx-inputwrap is-locked">
                <Mail size={15} className="mpx-inputwrap__icon" />
                <input id="mpx-email" className="mpx-input mpx-input--affix" value={user?.email || ''} readOnly disabled />
              </div>
              <p className="mpx-hint">Used to sign in only.</p>
            </div>
            <div className="mpx-field" style={{ marginBottom: 0 }}>
              <label className="mpx-label" htmlFor="mpx-public-email">Contact email</label>
              <div className="mpx-email-toggle" role="group" aria-label="Contact email source">
                <button type="button"
                  className={`mpx-email-toggle__btn${form.contactEmailMode === 'same' ? ' is-active' : ''}`}
                  aria-pressed={form.contactEmailMode === 'same'}
                  onClick={() => { resetContactOtp(); set('contactEmailMode', 'same') }}>
                  Same as login
                </button>
                <button type="button"
                  className={`mpx-email-toggle__btn${form.contactEmailMode === 'different' ? ' is-active' : ''}`}
                  aria-pressed={form.contactEmailMode === 'different'}
                  onClick={() => { resetContactOtp(); set('contactEmailMode', 'different') }}>
                  Different
                </button>
              </div>
              {form.contactEmailMode === 'same' ? (
                <>
                  <div className="mpx-inputwrap is-locked">
                    <Mail size={15} className="mpx-inputwrap__icon" />
                    <input className="mpx-input mpx-input--affix" value={user?.email || ''} readOnly disabled tabIndex={-1} />
                  </div>
                  <p className="mpx-hint">Shown on your resume &amp; public profile</p>
                </>
              ) : (
                <>
                  <div className="mpx-contact-otp-row">
                    <div className={`mpx-inputwrap mpx-inputwrap--flex${emailState(form.publicEmail) === 'invalid' ? ' has-error' : ''}${contactEmailVerified && emailState(form.publicEmail) === 'valid' ? ' is-verified' : ''}`}>
                      <Mail size={15} className="mpx-inputwrap__icon" />
                      <input id="mpx-public-email" className="mpx-input mpx-input--affix"
                        type="email" inputMode="email" autoComplete="off" spellCheck={false}
                        value={form.publicEmail} maxLength={254}
                        onChange={e => { set('publicEmail', e.target.value); resetContactOtp() }}
                        placeholder="you@example.com"
                        disabled={contactEmailVerified && emailState(form.publicEmail) === 'valid'} />
                      <span className="mpx-status">
                        {emailState(form.publicEmail) === 'valid' && <Check size={15} className="mpx-status--ok" />}
                        {emailState(form.publicEmail) === 'invalid' && <X size={15} className="mpx-status--bad" />}
                      </span>
                    </div>
                    {emailState(form.publicEmail) === 'valid' && !contactEmailVerified && (
                      <ContactOtpButton
                        sending={sendingContactOtp}
                        sent={contactOtpSent}
                        cooldownUntil={contactOtpCooldownUntil}
                        disabledExtra={contactEmailIsLogin}
                        onClick={handleSendContactOtp}
                      />
                    )}
                    {emailState(form.publicEmail) === 'valid' && contactEmailVerified && (
                      <span className="mpx-verified-badge"><ShieldCheck size={15} /> OK</span>
                    )}
                  </div>
                  {contactEmailIsLogin && (
                    <p className="mpx-msg mpx-msg--bad">Use &quot;Same as login&quot; for your login email.</p>
                  )}
                  {contactEmailError && !contactEmailIsLogin && (
                    <p className="mpx-msg mpx-msg--bad">{contactEmailError}</p>
                  )}
                  {contactOtpSent && !contactEmailVerified && emailState(form.publicEmail) === 'valid' && (
                    <div className="mpx-otp-row">
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        className="mpx-input mpx-input--otp"
                        placeholder="000000"
                        aria-label="Contact email verification OTP"
                        aria-busy={verifyingContactOtp}
                        value={contactOtp}
                        disabled={verifyingContactOtp}
                        onChange={e => setContactOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      />
                      {verifyingContactOtp && <span className="mpx-otp-verifying">Verifying…</span>}
                    </div>
                  )}
                  {emailState(form.publicEmail) === 'invalid'
                    ? <p className="mpx-msg mpx-msg--bad">Enter a valid email address</p>
                    : !contactEmailVerified && emailState(form.publicEmail) === 'valid' && !contactEmailIsLogin
                      ? <p className="mpx-hint">Verify this email before saving personal details — shown on your resume &amp; public profile</p>
                      : <p className="mpx-hint">Shown on your resume &amp; public profile</p>}
                </>
              )}
            </div>
          </div>

          <div className="mpx-grid-2">
            <div className="mpx-field" style={{ marginBottom: 0 }}>
              <label className="mpx-label" htmlFor="mpx-mobile">Mobile</label>
              <div className={`mpx-inputwrap${phoneState(form.mobile) === 'invalid' ? ' has-error' : ''}`}>
                <Phone size={15} className="mpx-inputwrap__icon" />
                <input id="mpx-mobile" className="mpx-input mpx-input--affix"
                  type="tel" inputMode="tel" autoComplete="tel"
                  value={form.mobile} maxLength={20}
                  onChange={e => set('mobile', e.target.value)}
                  placeholder="9876543210" />
                <span className="mpx-status">
                  {phoneState(form.mobile) === 'valid' && <Check size={15} className="mpx-status--ok" />}
                  {phoneState(form.mobile) === 'invalid' && <X size={15} className="mpx-status--bad" />}
                </span>
              </div>
              {phoneState(form.mobile) === 'invalid'
                ? <p className="mpx-msg mpx-msg--bad">Enter a valid mobile number</p>
                : <p className="mpx-hint">Used on your resume</p>}
            </div>
            <div className="mpx-field" style={{ marginBottom: 0 }}>
              <label className="mpx-label" htmlFor="mpx-location">Location</label>
              <div className="mpx-inputwrap">
                <MapPin size={15} className="mpx-inputwrap__icon" />
                <input id="mpx-location" className="mpx-input mpx-input--affix" value={form.location} maxLength={120}
                  onChange={e => set('location', e.target.value)} placeholder="City, State / Country" />
              </div>
            </div>
          </div>

          <div className="mpx-subsection">
            <h3 className="mpx-subsection__title"><GraduationCap size={16} /> Education</h3>
            <p className="mpx-subsection__sub">Your highest or current qualification.</p>
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
            <div className="mpx-field" style={{ marginBottom: 0 }}>
              <label className="mpx-label" htmlFor="mpx-years">Years (start – graduation)</label>
              <input id="mpx-years" className="mpx-input" value={form.education.years} maxLength={20}
                onChange={e => setEdu('years', e.target.value)} placeholder="2021 - 2025" />
            </div>
            <div className="mpx-field" style={{ marginBottom: 0 }}>
              <label className="mpx-label" htmlFor="mpx-college">College / University</label>
              <div className="mpx-inputwrap">
                <Building2 size={15} className="mpx-inputwrap__icon" />
                <input id="mpx-college" className="mpx-input mpx-input--affix" value={form.education.institution} maxLength={120}
                  onChange={e => setEdu('institution', e.target.value)} placeholder="Your college name" />
              </div>
            </div>
          </div>

          <div className="mpx-grid-2 mpx-field--last">
            <div className="mpx-field" style={{ marginBottom: 0 }}>
              <label className="mpx-label" htmlFor="mpx-cgpa">CGPA / %</label>
              <input id="mpx-cgpa" className="mpx-input" value={form.education.cgpa} maxLength={20}
                onChange={e => setEdu('cgpa', e.target.value)} placeholder="8.2/10 or 82%" />
            </div>
          </div>

          <div className="mpx-card__save">
            <button type="button" className="mpx-save" disabled={!isPersonalDirty || savingPersonal} onClick={handleSavePersonal}>
              {savingPersonal ? <><Loader2 size={15} className="mpx-spin" /> Saving…</> : <><Save size={15} /> Save personal details</>}
            </button>
          </div>
        </motion.section>

        {/* ── Social links ── */}
        <motion.section id="social-links" ref={socialLinksRef} className="mpx-card mpx-card--social" {...rise(0.1)}>
          <div className="mpx-card__head">
            <h2 className="mpx-card__title"><Globe size={17} /> Social links</h2>
          </div>

          {/* GitHub — OAuth connect only (no manual URL before link) */}
          <div className="mpx-field">
            <label className="mpx-label">GitHub</label>
            {githubConnected ? (
              <div className="mpx-github-connected">
                <div className="mpx-github-connected__head">
                  <Github size={15} className="mpx-github-connected__icon" aria-hidden="true" />
                  <span className="mpx-github-connected__handle">
                    @{user?.githubLogin || 'github-user'}
                  </span>
                  <span className="mpx-github-badge">Verified</span>
                </div>
                <div className="mpx-github-connected__actions">
                  {user?.githubUrl && safeExternalUrl(user.githubUrl) && (
                    <a className="mpx-github-btn mpx-github-btn--ghost" href={safeExternalUrl(user.githubUrl)} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={14} aria-hidden="true" /> View profile
                    </a>
                  )}
                  <button type="button" className="mpx-github-btn mpx-github-btn--ghost" disabled={githubBusy} onClick={handleDisconnectGitHub}>
                    {githubBusy ? <Loader2 size={14} className="mpx-spin" /> : <Unlink size={14} aria-hidden="true" />}
                    Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <div className="mpx-github-connect">
                <p className="mpx-hint">Connect your GitHub account to add a verified profile link.</p>
                <button type="button" className="mpx-github-btn" disabled={githubBusy} onClick={() => setGithubConnectOpen(true)}>
                  {githubBusy ? <Loader2 size={15} className="mpx-spin" /> : <Github size={15} />}
                  {githubBusy ? 'Connecting…' : 'Connect GitHub'}
                </button>
              </div>
            )}
          </div>

          {LINK_FIELDS.map(({ key, label, icon: Icon, placeholder }, i) => {
            const isLinkedin = key === 'linkedinUrl'
            const st = isLinkedin ? linkedinUrlState(form[key]) : portfolioUrlState(form[key])
            const showFormatError = isLinkedin
              ? (st === 'invalid' || st === 'not-linkedin')
              : (showPortfolioFormatError && st === 'invalid')
            const err = key === 'linkedinUrl' ? linkedinErr : portfolioErr
            const saving = key === 'linkedinUrl' ? savingLinkedin : savingPortfolio
            const canSave = key === 'linkedinUrl' ? canSaveLinkedin : canSavePortfolio
            const onSave = key === 'linkedinUrl' ? handleSaveLinkedin : handleSavePortfolio
            const savedUrl = (key === 'linkedinUrl' ? savedLinkedin : savedPortfolio).trim()
            return (
              <div key={key} className={`mpx-field${i === LINK_FIELDS.length - 1 ? ' mpx-field--last' : ''}`}>
                <label className="mpx-label" htmlFor={`mpx-${key}`}>{label}</label>
                <div className="mpx-field-row">
                  <div className={`mpx-inputwrap mpx-inputwrap--flex${showFormatError ? ' has-error' : ''}`}>
                    <Icon size={15} className="mpx-inputwrap__icon" />
                    <input id={`mpx-${key}`} className="mpx-input mpx-input--affix"
                      type="url" inputMode="url" autoComplete="off" spellCheck={false}
                      value={form[key]} placeholder={placeholder}
                      onChange={e => {
                        set(key, e.target.value)
                        if (key === 'linkedinUrl') setLinkedinErr('')
                        else { setPortfolioErr(''); setShowPortfolioFormatError(false) }
                      }}
                      onKeyDown={e => saveOnEnter(e, canSave, onSave)} />
                    <span className="mpx-status">
                      {st === 'valid' && <Check size={15} className="mpx-status--ok" />}
                      {showFormatError && <X size={15} className="mpx-status--bad" />}
                    </span>
                  </div>
                  <div className="mpx-field-actions">
                    {savedUrl && safeExternalUrl(savedUrl) && (
                      <a
                        className="mpx-field-view"
                        href={safeExternalUrl(savedUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={14} aria-hidden="true" /> View
                      </a>
                    )}
                    {savedUrl && (
                      <button
                        type="button"
                        className="mpx-field-remove"
                        onClick={() => handleRemoveLink(key)}
                        disabled={savingLinkedin || savingPortfolio}
                        aria-label={`Remove ${label}`}
                      >
                        {saving ? <Loader2 size={14} className="mpx-spin" aria-hidden="true" /> : <Unlink size={14} aria-hidden="true" />}
                        Remove
                      </button>
                    )}
                    <button type="button" className="mpx-field-save" onClick={onSave} disabled={!canSave}>
                      {saving ? <Loader2 size={15} className="mpx-spin" /> : <><Check size={15} /> Save</>}
                    </button>
                  </div>
                </div>
                {err && <p className="mpx-msg mpx-msg--bad">{err}</p>}
                {!err && isLinkedin && st === 'not-linkedin' && (
                  <p className="mpx-msg mpx-msg--bad">{LINKEDIN_URL_HINT}</p>
                )}
                {!err && isLinkedin && st === 'invalid' && (
                  <p className="mpx-msg mpx-msg--bad">Enter a full URL starting with https://</p>
                )}
              </div>
            )
          })}
        </motion.section>

        {/* ── Resume on profile ── */}
        <motion.section className="mpx-card" {...rise(0.14)}>
          <div className="mpx-card__head">
            <h2 className="mpx-card__title"><FileText size={17} /> Resume on your profile</h2>
            <p className="mpx-card__sub">Pick one to show on your public profile. Saves automatically.</p>
          </div>

          {!resumesLoaded ? (
            <p className="mpx-hint">Loading your resumes…</p>
          ) : resumes.length === 0 ? (
            <div className="mpx-resumeempty">
              <p className="mpx-resumeempty__text">
                No saved resumes yet. Create one in Resume Studio, then come back to feature it here.
              </p>
              <Link to="/resume" className="mpx-resumeempty__btn">
                <FileText size={15} /> Go to Resume Studio
              </Link>
            </div>
          ) : (
            <>
              <div className="mpx-resumepick" role="radiogroup" aria-label="Resume on your profile" aria-busy={savingResume}>
                <label className={`mpx-resumeopt${!form.featuredResumeId ? ' is-active' : ''}`}>
                  <input type="radio" name="featuredResume" className="mpx-resumeopt__input"
                    checked={!form.featuredResumeId} disabled={savingResume}
                    onChange={() => handleFeaturedResumeChange('')} />
                  <span className="mpx-resumeopt__radio" aria-hidden="true" />
                  <span className="mpx-resumeopt__body">
                    <span className="mpx-resumeopt__title">None</span>
                    <span className="mpx-resumeopt__meta">Hide resume on profile</span>
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
                        checked={active} disabled={!selectable || savingResume}
                        onChange={() => selectable && handleFeaturedResumeChange(r.id)} />
                      <span className="mpx-resumeopt__radio" aria-hidden="true" />
                      <span className="mpx-resumeopt__body">
                        <span className="mpx-resumeopt__title">{r.title || 'Untitled'}</span>
                        <span className="mpx-resumeopt__meta">
                          {selectable ? 'Ready to show' : 'Turn on sharing to show on profile'}
                        </span>
                      </span>
                      {url ? (
                        <span className="mpx-resumeopt__actions">
                          <button type="button" className="mpx-resumeopt__view"
                            onClick={e => { e.preventDefault(); e.stopPropagation(); shareResume(url, r.title) }}>
                            <Share2 size={13} /> Share link
                          </button>
                          <a className="mpx-resumeopt__view" href={safeExternalUrl(url) || url} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}>
                            <ExternalLink size={13} /> View
                          </a>
                        </span>
                      ) : (
                        <span className="mpx-resumeopt__actions">
                          <Link
                            to={`/resume?id=${encodeURIComponent(r.id)}`}
                            className="mpx-resumeopt__view mpx-resumeopt__cta"
                            onClick={e => e.stopPropagation()}
                          >
                            <Globe size={13} aria-hidden="true" /> Make public
                          </Link>
                        </span>
                      )}
                    </label>
                  )
                })}
              </div>
              {savingResume && (
                <p className="mpx-hint"><Loader2 size={14} className="mpx-spin" /> Updating your profile…</p>
              )}
              {!savingResume && resumes.every(r => !r.isPublic) ? (
                <p className="mpx-hint">
                  Turn on sharing in{' '}
                  <Link to="/resume" className="mpx-inlinelink">Resume Studio</Link>
                  {' '}to unlock a resume here.
                </p>
              ) : !savingResume ? (
                <p className="mpx-hint">
                  If sharing is turned off later, that resume is removed from your profile.
                </p>
              ) : null}
            </>
          )}
        </motion.section>
      </div>

      <GitHubConnectModal
        open={githubConnectOpen}
        busy={githubBusy}
        onClose={() => { if (!githubBusy) setGithubConnectOpen(false) }}
        onConfirm={handleConnectGitHub}
      />
      <LinkVerifyModal
        open={!!linkVerifyResults?.length}
        results={linkVerifyResults || []}
        busy={savingLinkedin || savingPortfolio}
        context="profile"
        onClose={() => { setLinkVerifyResults(null); pendingLinkKeyRef.current = null }}
        onRetry={handleLinkVerifyRetry}
        onSaveUnverified={handleLinkVerifyOverride}
      />
      {leaveModal}
    </div>
  )
}
