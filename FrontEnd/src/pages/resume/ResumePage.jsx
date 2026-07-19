import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Save, Download, Loader2, Plus, Trash2,
  PenLine, Lightbulb, Lock,
  Globe, Share2, Check, ExternalLink, FileText,
  User, GraduationCap, Unlink,
} from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '../../components/navbars/Navbar'
import LinkVerifyModal from '../../components/LinkVerifyModal'
import { useAuth } from '../../context/AuthContext'
import {
  listResumes, createResume, updateResume, deleteResume, setResumeShare,
} from '../../api/api'
import { getApiError } from '../../utils/apiError'
import { getLinkVerificationResults, isLinkVerificationError } from '../../utils/linkVerification'
import { normalizeHttpUrl } from '../../utils/normalizeHttpUrl'
import ResumeDocument from './ResumeDocument'
import { scoreResume } from './resumeScore'
import AtsGuide from './AtsGuide'
import { buildAndSaveResumePdf } from './resumePdf'
import {
  deleteResumeConfirmOptions,
  removeResumeProjectLinkConfirmOptions,
  turnOffShareConfirmOptions,
} from '../../utils/confirmRemoveLink'
import { useConfirm } from '../../context/ConfirmContext'
import { isRegistered as isRegisteredUser } from '../../utils/auth'
import { useUnsavedChangesGuard } from '../../hooks/useUnsavedChangesGuard'
import {
  pickResumeOwn, mergeResumeWithProfile, profileEducation,
} from './resumeProfile'
import '../../styles/pages/resume.css'

const EASE = [0.16, 1, 0.3, 1]
const MAX_RESUMES = 3

const EMPTY = {
  objective: '',
  skills: [],       // [{ category, value }]
  projects: [],     // [{ name, link, repo, points: [] }]
  internships: [],  // [{ role, company, duration, points: [] }]
  achievements: [], // string[]
  certificates: [], // string[]
  softSkills: [],   // string[]
}

// ── Field validators (run on blur) ──
const reUrl = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i
const vUrl = (v) => !v?.trim() ? '' : reUrl.test(v.trim()) ? '' : 'Enter a valid link, e.g. github.com/you'

function collectProjectLinkErrors(projects) {
  const e = []
  ;(projects || []).forEach((p, i) => {
    const msg = vUrl(p.link)
    if (msg) e.push(`Project ${i + 1}: enter a valid link (e.g. github.com/you/repo or your-app.vercel.app)`)
  })
  return e
}

function normalizeResumePayload(data) {
  const payload = pickResumeOwn(data)
  payload.projects = (payload.projects || []).map(p => {
    const link = (p.link || '').trim()
    return { ...p, link: link ? normalizeHttpUrl(link) : '' }
  })
  return payload
}

// Stable signature of just the project links (normalized). The backend re-runs a live
// reachability check on every save; we use this to skip re-verifying links that haven't
// changed since the last successful save/load, so editing text (e.g. the career objective)
// never re-triggers the "can't verify link" modal. New/edited links still get verified.
function projectLinksSignature(data) {
  return JSON.stringify(
    (data?.projects || [])
      .map(p => (p.link || '').trim())
      .filter(Boolean)
      .map(link => normalizeHttpUrl(link) || link)
  )
}

export default function ResumePage() {
  const { user, loading: authLoading } = useAuth()
  const confirm = useConfirm()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  // Registered = logged in AND not a guest. Only these can save, share & download.
  const isRegistered = isRegisteredUser(user)

  const [tab, setTab] = useState('guide')
  const [resumes, setResumes] = useState([])   // saved resumes (owner view maps)
  const [currentId, setCurrentId] = useState(null) // null = unsaved draft
  const [title, setTitle] = useState('My Resume')
  const [resume, setResume] = useState(EMPTY)
  const [loaded, setLoaded] = useState(false)
  const [saving, setSaving] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [sharing, setSharing] = useState(false)
  const [showProjectLinkErrors, setShowProjectLinkErrors] = useState(false)
  const [copied, setCopied] = useState(false)
  const [linkVerifyResults, setLinkVerifyResults] = useState(null)

  // Preview zoom-to-fit — the A4 sheet is fixed; we zoom it (crisp, not blurry)
  // to fill its stage so the whole page is visible on screen without scrolling.
  const stageRef = useRef(null)
  const [scale, setScale] = useState(1)

  // Baseline snapshot of the last saved/loaded state — used to detect unsaved edits.
  const baselineRef = useRef('')
  // Signature of the project links as of the last successful save/load — lets us skip
  // re-verifying links that haven't changed (see projectLinksSignature).
  const savedLinksRef = useRef('')
  // "Copied" toast reset timer — cleared on unmount so it never fires on a gone component.
  const copiedTimerRef = useRef(null)
  useEffect(() => () => clearTimeout(copiedTimerRef.current), [])
  const pendingSaveRef = useRef(null)
  const leaveGuardRef = useRef({ notifyDeferredLeave: () => {}, completePendingLeave: () => {} })
  const saveBeforeLeaveRef = useRef(async () => true)
  const current = resumes.find(r => r.id === currentId) || null
  const dirty = loaded && JSON.stringify({ title, resume }) !== baselineRef.current
  const shareUrl = current?.shareSlug ? `${window.location.origin}/r/${current.shareSlug}` : ''
  const mergedResume = useMemo(() => mergeResumeWithProfile(resume, user), [resume, user])
  const profileEdu = useMemo(() => profileEducation(user), [user])

  // How complete the resume is (0–100) — shown next to the resume name.
  const completeness = useMemo(() => scoreResume(mergedResume).completeness, [mergedResume])

  const syncResumeIdInUrl = useCallback((id) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      if (id) {
        if (next.get('id') === id) return prev
        next.set('id', id)
      } else {
        if (!next.has('id')) return prev
        next.delete('id')
      }
      return next
    }, { replace: true })
  }, [setSearchParams])

  // Load state into the editor and reset the dirty baseline.
  const loadInto = (id, ttl, data) => {
    const clean = pickResumeOwn(data)
    setCurrentId(id)
    setTitle(ttl)
    setResume(clean)
    setShowProjectLinkErrors(false)
    baselineRef.current = JSON.stringify({ title: ttl, resume: clean })
    // Loaded links were already accepted when previously saved — treat them as verified.
    savedLinksRef.current = projectLinksSignature(clean)
  }

  // Load the user's saved resumes once auth resolves — only for registered users.
  // Guests / logged-out visitors get a blank builder (they can't persist).
  useEffect(() => {
    if (authLoading) return
    if (!isRegistered) {
      loadInto(null, 'My Resume', {})
      setLoaded(true)
      return
    }
    let active = true
    listResumes()
      .then(({ data }) => {
        if (!active) return
        const list = Array.isArray(data) ? data : []
        setResumes(list)
        const wantedId = searchParams.get('id')?.trim()
        const picked = wantedId ? list.find(r => r.id === wantedId) : null
        if (picked) {
          loadInto(picked.id, picked.title, picked.data || {})
          setTab('build')
        } else if (list.length) loadInto(list[0].id, list[0].title, list[0].data || {})
        else loadInto(null, 'My Resume', {})
      })
      .catch(() => {
        if (active) {
          toast.error('Could not load your resumes. Please try again.')
          loadInto(null, 'My Resume', {})
        }
      })
      .finally(() => { if (active) setLoaded(true) })
    return () => { active = false }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, isRegistered])

  // Fill the stage — same zoom-fit as shared resume (full area, crisp zoom).
  useEffect(() => {
    if (tab !== 'build') return
    const stage = stageRef.current
    if (!stage) return
    const A4W = 760, A4H = 1075
    const fit = () => {
      const availW = stage.clientWidth
      const availH = stage.clientHeight
      if (availW <= 0 || availH <= 0) return
      setScale(Math.min(availW / A4W, availH / A4H, 1))
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(stage)
    return () => ro.disconnect()
  }, [tab, loaded])

  // Guests / logged-out users can build & preview, but saving/sharing/downloading
  // need a real account — send them to register, returning here afterwards.
  const requireAccount = (action) => {
    toast.error(`Create a free account to ${action} your resume.`)
    navigate('/register?redirect=/resume')
  }

  // ── resume manager ──
  const applyResumeSaveSuccess = (createdOrUpdated, isNew) => {
    if (isNew) {
      setResumes(prev => [createdOrUpdated, ...prev])
      setCurrentId(createdOrUpdated.id)
      setTitle(createdOrUpdated.title)
      baselineRef.current = JSON.stringify({ title: createdOrUpdated.title, resume })
      syncResumeIdInUrl(createdOrUpdated.id)
    } else {
      setResumes(prev => prev.map(r => r.id === createdOrUpdated.id ? createdOrUpdated : r))
      baselineRef.current = JSON.stringify({ title, resume })
    }
    // Links just passed (or were overridden) — remember them so an unrelated edit
    // (career objective, skills, etc.) won't re-trigger link verification next save.
    savedLinksRef.current = projectLinksSignature(resume)
    setLinkVerifyResults(null)
    setShowProjectLinkErrors(false)
  }

  const executeResumeSave = async (skipLinkVerification = false) => {
    const pending = pendingSaveRef.current
    if (!pending) return
    const { payload, resumeTitle, id } = pending
    if (id == null) {
      const { data: created } = await createResume(resumeTitle, payload, skipLinkVerification)
      applyResumeSaveSuccess(created, true)
    } else {
      const { data: updated } = await updateResume(id, resumeTitle, payload, skipLinkVerification)
      applyResumeSaveSuccess(updated, false)
    }
    toast.success('Resume saved to your account')
  }

  const onSave = async () => {
    if (!isRegistered) { requireAccount('save'); return false }
    const linkErrors = collectProjectLinkErrors(resume.projects)
    if (linkErrors.length) {
      setShowProjectLinkErrors(true)
      toast.error(linkErrors.length === 1 ? linkErrors[0] : `Fix ${linkErrors.length} project links before saving.`)
      requestAnimationFrame(() => {
        document.querySelector('.rz-input--error')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
      return false
    }
    setShowProjectLinkErrors(false)
    pendingSaveRef.current = { payload: normalizeResumePayload(resume), resumeTitle: title, id: currentId }
    setSaving(true)
    try {
      // Only re-verify links that actually changed since the last successful save.
      const skipVerify = projectLinksSignature(resume) === savedLinksRef.current
      await executeResumeSave(skipVerify)
      return true
    } catch (e) {
      if (isLinkVerificationError(e)) {
        setLinkVerifyResults(getLinkVerificationResults(e))
        return false
      }
      toast.error(getApiError(e, 'Could not save your resume. Please try again.'))
      return false
    } finally {
      setSaving(false)
    }
  }

  const handleLinkVerifyRetry = async () => {
    setSaving(true)
    try {
      await executeResumeSave(false)
      leaveGuardRef.current.completePendingLeave()
      return true
    } catch (e) {
      if (isLinkVerificationError(e)) {
        setLinkVerifyResults(getLinkVerificationResults(e))
        return false
      }
      toast.error(getApiError(e, 'Could not save your resume. Please try again.'))
      setLinkVerifyResults(null)
      return undefined
    } finally {
      setSaving(false)
    }
  }

  const handleLinkVerifyOverride = async () => {
    setSaving(true)
    try {
      await executeResumeSave(true)
      leaveGuardRef.current.completePendingLeave()
    } catch (e) {
      if (isLinkVerificationError(e)) {
        setLinkVerifyResults(getLinkVerificationResults(e))
        return
      }
      toast.error(getApiError(e, 'Could not save your resume. Please try again.'))
    } finally {
      setSaving(false)
    }
  }

  const saveBeforeLeave = useCallback(async () => {
    if (!isRegistered) {
      requireAccount('save')
      return false
    }
    const linkErrors = collectProjectLinkErrors(resume.projects)
    if (linkErrors.length) {
      setShowProjectLinkErrors(true)
      toast.error(linkErrors.length === 1 ? linkErrors[0] : `Fix ${linkErrors.length} project links before saving.`)
      requestAnimationFrame(() => {
        document.querySelector('.rz-input--error')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
      return false
    }
    setShowProjectLinkErrors(false)
    pendingSaveRef.current = { payload: normalizeResumePayload(resume), resumeTitle: title, id: currentId }
    setSaving(true)
    try {
      // Only re-verify links that actually changed since the last successful save.
      const skipVerify = projectLinksSignature(resume) === savedLinksRef.current
      await executeResumeSave(skipVerify)
      return true
    } catch (e) {
      if (isLinkVerificationError(e)) {
        setLinkVerifyResults(getLinkVerificationResults(e))
        leaveGuardRef.current.notifyDeferredLeave()
        return false
      }
      toast.error(getApiError(e, 'Could not save your resume. Please try again.'))
      return false
    } finally {
      setSaving(false)
    }
  }, [isRegistered, resume, title, currentId, navigate])

  saveBeforeLeaveRef.current = saveBeforeLeave

  const leaveGuard = useUnsavedChangesGuard(loaded && dirty, {
    onSave: () => saveBeforeLeaveRef.current(),
    saving,
    contextLabel: 'resume edits',
  })
  leaveGuardRef.current = {
    notifyDeferredLeave: leaveGuard.notifyDeferredLeave,
    completePendingLeave: leaveGuard.completePendingLeave,
  }
  const { requestLeave, leaveModal } = leaveGuard

  const openBuilder = () => {
    requestLeave(() => {
      setTab('build')
      if (currentId) syncResumeIdInUrl(currentId)
      else syncResumeIdInUrl(null)
    })
  }

  const switchTab = (nextTab) => {
    if (nextTab === tab) return
    if (nextTab === 'build') {
      openBuilder()
      return
    }
    requestLeave(() => setTab('guide'))
  }

  const newResume = () => {
    if (resumes.length >= MAX_RESUMES) {
      toast.error(`You can keep up to ${MAX_RESUMES} resumes. Delete one to add another.`)
      return
    }
    requestLeave(() => {
      const blank = pickResumeOwn({})
      loadInto(null, `Resume ${resumes.length + 1}`, blank)
      syncResumeIdInUrl(null)
    })
  }

  const switchTo = (r) => {
    if (r.id === currentId) return
    requestLeave(() => {
      loadInto(r.id, r.title, r.data || {})
      syncResumeIdInUrl(r.id)
    })
  }

  const onDelete = async () => {
    if (currentId == null) {
      requestLeave(() => loadInto(null, `Resume ${resumes.length + 1}`, {}))
      return
    }
    if (!(await confirm(deleteResumeConfirmOptions()))) return
    try {
      await deleteResume(currentId)
      const rest = resumes.filter(r => r.id !== currentId)
      setResumes(rest)
      if (rest.length) {
        loadInto(rest[0].id, rest[0].title, rest[0].data || {})
        syncResumeIdInUrl(rest[0].id)
      } else {
        loadInto(null, 'My Resume', {})
        syncResumeIdInUrl(null)
      }
      toast.success('Resume deleted')
    } catch (e) {
      toast.error(getApiError(e, 'Could not delete this resume.'))
    }
  }

  const toggleShare = async () => {
    if (!isRegistered) return requireAccount('share')
    if (currentId == null) { toast.error('Save this resume first, then share it.'); return }
    if (dirty) { toast.error('Save your changes before updating the share link.'); return }

    const enable = !current?.isPublic
    if (!enable) {
      if (!(await confirm(turnOffShareConfirmOptions({ featured: current?.featured })))) return
    }

    setSharing(true)
    try {
      const { data: updated } = await setResumeShare(currentId, enable)
      setResumes(prev => prev.map(r => r.id === updated.id ? { ...updated, featured: enable ? r.featured : false } : r))
      if (enable) {
        toast.success('Share link on — you can feature this resume on your public profile')
      } else if (updated?.clearedFromProfile || current?.featured) {
        toast.success('Sharing turned off — also removed from your public profile')
        window.dispatchEvent(new Event('sl:refresh'))
      } else {
        toast.success('Sharing turned off')
      }
    } catch (e) {
      toast.error(getApiError(e, 'Could not update sharing.'))
    } finally {
      setSharing(false)
    }
  }

  const copyLink = async () => {
    if (!shareUrl) return
    // Native share sheet (WhatsApp, Telegram, email, …) when supported; else copy.
    if (navigator.share) {
      try { await navigator.share({ title: `${title || 'My resume'} — LearnForEarn`, text: 'Here is my resume', url: shareUrl }) } catch { /* cancelled */ }
      return
    }
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      clearTimeout(copiedTimerRef.current)
      copiedTimerRef.current = setTimeout(() => setCopied(false), 1600)
    } catch {
      toast.error('Could not copy the link.')
    }
  }

  // ── state helpers ──
  const set = (key, val) => setResume(r => ({ ...r, [key]: val }))
  const addEntry = (key, empty) => setResume(r => ({ ...r, [key]: [...(r[key] || []), empty] }))
  const updEntry = (key, idx, patch) => setResume(r => ({ ...r, [key]: r[key].map((e, i) => i === idx ? { ...e, ...patch } : e) }))
  const delEntry = (key, idx) => setResume(r => ({ ...r, [key]: r[key].filter((_, i) => i !== idx) }))
  const removeProjectLink = async (idx) => {
    if (!(await confirm(removeResumeProjectLinkConfirmOptions()))) return
    updEntry('projects', idx, { link: '' })
  }
  const addStr = (key) => setResume(r => ({ ...r, [key]: [...(r[key] || []), ''] }))
  const updStr = (key, idx, val) => setResume(r => ({ ...r, [key]: r[key].map((s, i) => i === idx ? val : s) }))

  // Education is a single entry (highest / current degree) stored as a one-item array.
  const downloadPdf = async () => {
    if (downloading || saving) return
    if (!isRegistered) return requireAccount('download')
    // Persist any unsaved edits first so the PDF matches what's stored on the account.
    // No completeness / field gating — download whatever the resume currently holds.
    if (dirty) {
      const saved = await onSave()
      if (!saved) return // save failed or needs link verification — don't download yet
    }
    setDownloading(true)
    try {
      await buildAndSaveResumePdf(mergedResume, title)
      toast.success('Resume downloaded — links are clickable')
    } catch {
      toast.error('Could not generate the PDF. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  // Skeleton while auth resolves / resumes load — avoids a blank builder flash.
  if (authLoading || !loaded) {
    return (
      <div className="rz-page">
        <Navbar sticky />
        <main className="rz-main">
          <div className="rz-skel-wrap" aria-hidden="true">
            <div className="rz-skel rz-skel--tabs" />
            <div className="rz-skel-layout">
              <div className="rz-skel rz-skel--form" />
              <div className="rz-skel rz-skel--preview" />
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="rz-page">
      <Navbar sticky />

      <main className="rz-main">
        {/* Hero / intro */}
        <motion.header
          className="rz-hero"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="rz-tabs" role="tablist">
            <button role="tab" aria-selected={tab === 'guide'} className={`rz-tab${tab === 'guide' ? ' is-active' : ''}`} onClick={() => switchTab('guide')}>
              <Lightbulb size={15} /> ATS Guide
            </button>
            <button role="tab" aria-selected={tab === 'build'} className={`rz-tab${tab === 'build' ? ' is-active' : ''}`} onClick={() => switchTab('build')}>
              <PenLine size={15} /> Builder
            </button>
          </div>
        </motion.header>

        {tab === 'guide' ? (
          <AtsGuide />
        ) : (
          <>
            <div className="rz-layout">
              {/* ── Form ── */}
              <div className="rz-form">
                {/* ── Resume manager (registered users) — sits at the top of the form
                    column so the preview rides up beside it ── */}
                {isRegistered && (
                  <section className="rz-manager" aria-label="Your resumes">
                    <div className="rz-manager__tabs">
                      {resumes.map(r => (
                        <button
                          key={r.id}
                          className={`rz-rtab${r.id === currentId ? ' is-active' : ''}`}
                          onClick={() => switchTo(r)}
                        >
                          <FileText size={14} />
                          <span className="rz-rtab__label">{r.title || 'Untitled'}</span>
                          {r.isPublic && <Globe size={12} className="rz-rtab__globe" aria-label="Shared" />}
                        </button>
                      ))}
                      {currentId == null && (
                        <button className="rz-rtab is-active" aria-current>
                          <FileText size={14} />
                          <span className="rz-rtab__label">{title || 'Untitled'}</span>
                          <span className="rz-rtab__draft">draft</span>
                        </button>
                      )}
                      <button
                        className="rz-rtab rz-rtab--new"
                        onClick={newResume}
                        disabled={resumes.length >= MAX_RESUMES}
                        title={resumes.length >= MAX_RESUMES ? `Limit of ${MAX_RESUMES} resumes reached` : 'Start a new resume'}
                      >
                        <Plus size={14} /> New
                      </button>
                    </div>

                    <div className="rz-manager__row">
                      <label className="rz-manager__name">
                        <span className="rz-field__label">Resume name</span>
                        <input
                          className="rz-input"
                          value={title}
                          maxLength={60}
                          onChange={e => setTitle(e.target.value)}
                          placeholder="e.g. Full Stack Developer"
                        />
                      </label>
                    </div>

                    <div className="rz-manager__share" aria-label="Resume visibility">
                      <div className="rz-share-panel rz-share-panel--manager">
                        <div className="rz-share-panel__row">
                          <div className="rz-share-panel__toggle">
                            <span className={`rz-vis-label${!current?.isPublic ? ' is-active' : ''}`}>Private</span>
                            <button
                              type="button"
                              className={`rz-switch rz-switch--manager${current?.isPublic ? ' is-on' : ''}`}
                              onClick={toggleShare}
                              disabled={sharing || currentId == null}
                              aria-pressed={!!current?.isPublic}
                              aria-label={current?.isPublic ? 'Switch to private' : 'Switch to public'}
                            >
                              <span className="rz-switch__track" aria-hidden="true">
                                <span className="rz-switch__thumb" />
                              </span>
                            </button>
                            <span className={`rz-vis-label${current?.isPublic ? ' is-active' : ''}`}>Public</span>
                          </div>
                          {current?.isPublic && shareUrl && (
                            <div className="rz-share-panel__links">
                              <button type="button" className="rz-btn rz-btn--ghost rz-btn--sm" onClick={copyLink}>
                                {copied ? <><Check size={14} /> Copied</> : <><Share2 size={14} /> Share</>}
                              </button>
                              <a className="rz-btn rz-btn--ghost rz-btn--sm" href={shareUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink size={14} /> View
                              </a>
                            </div>
                          )}
                        </div>
                        <p className="rz-share-panel__hint">
                          {currentId == null
                            ? 'Save your resume first to get a share link'
                            : current?.isPublic
                              ? 'Anyone with your link can view this resume'
                              : 'Turn on Public to share a view link'}
                        </p>
                      </div>
                    </div>

                  
                  </section>
                )}

                {/* Personal information (incl. education) — read-only from My Profile */}
                <fieldset className="rz-card rz-card--profile">
                  <legend className="rz-card__legend rz-card__legend--split">
                    <span><User size={15} /> Personal information</span>
                    <Link to="/myprofile" className="rz-profile-edit">Edit in My Profile</Link>
                  </legend>
                  <p className="rz-profile-note">Filled automatically from your profile. Update them on My Profile.</p>
                  <div className="rz-grid-2">
                    <ReadonlyField label="Full name" value={mergedResume.fullName} />
                    <ReadonlyField label="Email" value={mergedResume.email} />
                    <ReadonlyField label="Mobile" value={mergedResume.mobile} />
                  </div>

                  <div className="rz-subsection">
                    <h3 className="rz-subsection__title"><GraduationCap size={16} /> Education</h3>
                    <p className="rz-subsection__sub">Your highest or current qualification.</p>
                  </div>
                  <div className="rz-grid-2">
                    <ReadonlyField label="Degree" value={profileEdu.degree} />
                    <ReadonlyField label="Branch / Specialization" value={profileEdu.branch} />
                    <ReadonlyField label="Years (start – graduation)" value={profileEdu.years} />
                    <ReadonlyField label="College / University" value={profileEdu.college} />
                    <ReadonlyField label="CGPA / %" value={profileEdu.cgpa} />
                  </div>
                </fieldset>

                <fieldset className="rz-card rz-card--profile">
                  <legend className="rz-card__legend rz-card__legend--split">
                    <span><Globe size={15} /> Social links</span>
                    <Link to="/myprofile#social-links" className="rz-profile-edit">Edit in My Profile</Link>
                  </legend>
                  <div className="rz-grid-2">
                    <ReadonlyField label="LinkedIn" value={mergedResume.linkedin} />
                    <ReadonlyField label="GitHub" value={mergedResume.github} />
                    <ReadonlyField label="Portfolio" value={mergedResume.portfolio} />
                  </div>
                </fieldset>

                {/* Career Objective */}
                <fieldset className="rz-card">
                  <legend className="rz-card__legend">Career Objective</legend>
                  <TextArea
                    value={resume.objective}
                    onChange={v => set('objective', v)}
                    placeholder="e.g. I am an aspiring Python Full Stack Developer eager to build scalable web applications using Django and React. I enjoy creating clean, responsive interfaces backed by solid server-side logic. As a fresher, I am looking to join a collaborative team where I can work on real projects, grow my skills, and contribute meaningfully from day one."
                    rows={4}
                  />
                </fieldset>

                {/* Technical Skills — compact key/value rows with a side delete */}
                <PairList
                  title="Technical Skills"
                  addLabel="skill"
                  items={resume.skills}
                  onAdd={() => addEntry('skills', { category: '', value: '' })}
                  onChange={(i, patch) => updEntry('skills', i, patch)}
                  onRemove={i => delEntry('skills', i)}
                  ph1="Category (e.g. Frontend)"
                  ph2="HTML, CSS, JavaScript, React"
                />

                {/* Projects */}
                <Repeater
                  title="Projects"
                  items={resume.projects}
                  onAdd={() => addEntry('projects', { name: '', link: '', points: [] })}
                  renderItem={(p, i) => (
                    <>
                      <div className="rz-grid-2">
                        <TextField label="Project name" value={p.name} onChange={v => updEntry('projects', i, { name: v })} placeholder="College Management Portal" />
                        <div className="rz-link-field">
                          <TextField label="Live link or GitHub repo" value={p.link} onChange={v => updEntry('projects', i, { link: v })} placeholder="college-portal.vercel.app or github.com/you/repo" validate={vUrl} validateOnBlur={false} forceShow={showProjectLinkErrors} />
                          {p.link?.trim() && (
                            <button
                              type="button"
                              className="rz-link-remove"
                              onClick={() => removeProjectLink(i)}
                            >
                              <Unlink size={13} aria-hidden="true" /> Remove link
                            </button>
                          )}
                        </div>
                      </div>
                      <TextArea
                        label="Highlights (one per line)"
                        value={(p.points || []).join('\n')}
                        onChange={v => updEntry('projects', i, { points: v.split('\n') })}
                        placeholder={'Built a portal using React, Django, and SQL with secure auth\nRole-based dashboards for Admin, Staff, and Students'}
                        rows={4}
                      />
                    </>
                  )}
                  onRemove={i => delEntry('projects', i)}
                />

                {/* Internships (optional) */}
                <Repeater
                  title="Internships"
                  addLabel="internship"
                  items={resume.internships}
                  onAdd={() => addEntry('internships', { role: '', company: '', duration: '', points: [] })}
                  renderItem={(it, i) => (
                    <>
                      <div className="rz-grid-2">
                        <TextField label="Role" value={it.role} onChange={v => updEntry('internships', i, { role: v })} placeholder="Frontend Developer Intern" />
                        <TextField label="Company" value={it.company} onChange={v => updEntry('internships', i, { company: v })} placeholder="Acme Technologies" />
                      </div>
                      <TextField label="Duration" value={it.duration} onChange={v => updEntry('internships', i, { duration: v })} placeholder="Jun 2025 – Aug 2025" />
                      <TextArea
                        label="Highlights (one per line)"
                        value={(it.points || []).join('\n')}
                        onChange={v => updEntry('internships', i, { points: v.split('\n') })}
                        placeholder={'Built a dashboard in React that cut reporting time by 40%\nCollaborated with a team of 4 using Git and Agile'}
                        rows={3}
                      />
                    </>
                  )}
                  onRemove={i => delEntry('internships', i)}
                />

                {/* Achievements */}
                <StringList
                  title="Achievements"
                  items={resume.achievements}
                  onAdd={() => addStr('achievements')}
                  onChange={(i, v) => updStr('achievements', i, v)}
                  onRemove={i => delEntry('achievements', i)}
                  placeholder="Won 1st place at XYZ Hackathon (200+ teams) · Solved 300+ DSA problems on LeetCode"
                />

                {/* Certificates */}
                <StringList
                  title="Certificates"
                  items={resume.certificates}
                  onAdd={() => addStr('certificates')}
                  onChange={(i, v) => updStr('certificates', i, v)}
                  onRemove={i => delEntry('certificates', i)}
                  placeholder="Full Stack Web Development — hands-on front-end & back-end projects"
                />

                {/* Soft Skills */}
                <StringList
                  title="Soft Skills"
                  items={resume.softSkills}
                  onAdd={() => addStr('softSkills')}
                  onChange={(i, v) => updStr('softSkills', i, v)}
                  onRemove={i => delEntry('softSkills', i)}
                  placeholder="Strong analytical and problem-solving skills"
                />
              </div>

              {/* ── Preview ── */}
              <div className="rz-preview">
                {!isRegistered && (
                  <p className="rz-gate-note">
                    <Lock size={13} />
                    <span>
                      <button type="button" className="rz-gate-note__link" onClick={() => navigate('/register?redirect=/resume')}>Create a free account</button>
                      {' '}to save, share and download your resume.
                    </span>
                  </p>
                )}
                <div className="rz-preview__stage">
                  <div className="rz-rail rz-rail--left">
                    <div className="rz-rail__actions">
                      {isRegistered && (
                        <div
                          className={`rz-complete rz-complete--rail${completeness >= 80 ? ' is-good' : completeness >= 50 ? ' is-ok' : ''}`}
                          title={`${completeness}% complete`}
                        >
                          <div className="rz-ring">
                            <svg viewBox="0 0 44 44" width="44" height="44" aria-hidden="true">
                              <circle className="rz-ring__track" cx="22" cy="22" r="18" />
                              <circle
                                className="rz-ring__bar" cx="22" cy="22" r="18"
                                strokeDasharray={2 * Math.PI * 18}
                                strokeDashoffset={2 * Math.PI * 18 * (1 - completeness / 100)}
                              />
                            </svg>
                          </div>
                          <span className="rz-complete__pct">{completeness}%</span>
                        </div>
                      )}
                      {isRegistered && (
                        <>
                          <button className="rz-btn rz-btn--rail-save rz-btn--primary" onClick={onSave}
                            disabled={saving || (!dirty && currentId != null)}
                            title={currentId == null ? 'Save resume' : 'Save changes'} aria-label="Save resume">
                            {saving ? <Loader2 size={22} className="rz-spin" /> : <Save size={22} />}
                            <span className="rz-btn__label">{saving ? 'Saving…' : 'Save'}</span>
                          </button>
                          {(currentId != null || resumes.length > 0) && (
                            <button className="rz-btn rz-btn--icon rz-btn--danger" onClick={onDelete}
                              title="Delete this resume" aria-label="Delete resume">
                              <Trash2 size={16} />
                            </button>
                          )}
                        </>
                      )}
                      <button className="rz-btn rz-btn--icon rz-btn--accent" onClick={downloadPdf} disabled={downloading}
                        title="Download PDF" aria-label="Download PDF">
                        {downloading ? <Loader2 size={16} className="rz-spin" /> : <Download size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="rz-preview__viewport" ref={stageRef}>
                    <div className="rz-preview__paper" style={{ zoom: scale }}>
                      <ResumeDocument resume={mergedResume} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <LinkVerifyModal
        open={!!linkVerifyResults?.length}
        results={linkVerifyResults || []}
        busy={saving}
        context="resume"
        onClose={() => setLinkVerifyResults(null)}
        onRetry={handleLinkVerifyRetry}
        onSaveUnverified={handleLinkVerifyOverride}
      />
      {leaveModal}
    </div>
  )
}

/* ── Field primitives ── */
function ReadonlyField({ label, value, empty = '—' }) {
  const display = value?.trim() ? value : empty
  const isMissing = !value?.trim()
  return (
    <div className="rz-field rz-field--readonly">
      <span className="rz-field__label">{label}</span>
      <div className={`rz-readonly${isMissing ? ' is-empty' : ''}`}>{display}</div>
    </div>
  )
}

function TextField({ label, value, onChange, placeholder, validate, type = 'text', forceShow = false, validateOnBlur = true }) {
  const [touched, setTouched] = useState(false)
  const err = ((validateOnBlur && touched) || forceShow) && validate ? validate(value) : ''
  return (
    <label className="rz-field">
      {label && <span className="rz-field__label">{label}</span>}
      <input
        className={`rz-input${err ? ' rz-input--error' : ''}`}
        type={type}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        onBlur={() => { if (validateOnBlur) setTouched(true) }}
        placeholder={placeholder}
      />
      {err && <span className="rz-field__error">{err}</span>}
    </label>
  )
}

function TextArea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <label className="rz-field">
      {label && <span className="rz-field__label">{label}</span>}
      <textarea className="rz-input rz-textarea" rows={rows} value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </label>
  )
}

function Repeater({ title, items, onAdd, onRemove, renderItem, addLabel }) {
  return (
    <fieldset className="rz-card">
      <legend className="rz-card__legend">{title}</legend>
      {items.map((item, i) => (
        <div key={i} className="rz-entry">
          <div className="rz-entry__head">
            <span className="rz-entry__num">{title} #{i + 1}</span>
            <button type="button" className="rz-icon-btn" onClick={() => onRemove(i)} aria-label="Remove"><Trash2 size={15} /></button>
          </div>
          {renderItem(item, i)}
        </div>
      ))}
      <button type="button" className="rz-btn rz-btn--ghost" onClick={onAdd}><Plus size={15} /> Add {addLabel || title.toLowerCase()}</button>
    </fieldset>
  )
}

function PairList({ title, addLabel, items, onAdd, onChange, onRemove, ph1, ph2 }) {
  return (
    <fieldset className="rz-card">
      <legend className="rz-card__legend">{title}</legend>
      {items.map((it, i) => (
        <div key={i} className="rz-row">
          <input className="rz-input" value={it.category || ''} onChange={e => onChange(i, { category: e.target.value })} placeholder={ph1} />
          <input className="rz-input" value={it.value || ''} onChange={e => onChange(i, { value: e.target.value })} placeholder={ph2} />
          <button type="button" className="rz-icon-btn" onClick={() => onRemove(i)} aria-label="Remove"><Trash2 size={15} /></button>
        </div>
      ))}
      <button type="button" className="rz-btn rz-btn--ghost" onClick={onAdd}><Plus size={15} /> Add {addLabel}</button>
    </fieldset>
  )
}

function StringList({ title, items, onAdd, onChange, onRemove, placeholder }) {
  return (
    <fieldset className="rz-card">
      <legend className="rz-card__legend">{title}</legend>
      {items.map((s, i) => (
        <div key={i} className="rz-row">
          <input className="rz-input" value={s} onChange={e => onChange(i, e.target.value)} placeholder={placeholder} />
          <button type="button" className="rz-icon-btn" onClick={() => onRemove(i)} aria-label="Remove"><Trash2 size={15} /></button>
        </div>
      ))}
      <button type="button" className="rz-btn rz-btn--ghost" onClick={onAdd}><Plus size={15} /> Add {title.toLowerCase().replace(/s$/, '')}</button>
    </fieldset>
  )
}
