import { useState, useEffect, useRef, useCallback } from 'react'
import { PAGE_MIN_MS } from '../components/loaders/_config'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ChevronDown, Sun, Moon,
  Clock, Target, Sparkles, Compass, PenLine,
  AlertTriangle, Lightbulb, ListChecks, BookOpen,
  Github, Globe, ExternalLink, Check, Rocket, Loader2, Unlink,
} from 'lucide-react'
import { motion } from 'framer-motion'
import SmokeBladeLoader from '../components/loaders/SmokeBladeLoader'
import EnterArenaButton from '../components/EnterArenaButton'
import SectionNotFoundPage from '../components/SectionNotFoundPage'
import { isMongoId } from '../utils/mongoId'
import { getMission, getMissionSubmission, saveMissionSubmission, connectGitHub, clearUserCache } from '../api/api'
import { getApiError } from '../utils/apiError'
import { getLinkVerificationResults, isLinkVerificationError } from '../utils/linkVerification'
import { normalizeGitHubRepoUrl } from '../utils/githubRepoUrl'
import { isLooseHttpUrl, normalizeHttpUrl } from '../utils/normalizeHttpUrl'
import { saveOnEnter } from '../utils/saveOnEnter'
import { removeMissionLinkConfirmOptions } from '../utils/confirmRemoveLink'
import { safeExternalUrl } from '../utils/safeExternalUrl'
import { useConfirm } from '../context/ConfirmContext'
import BookmarkButton from '../components/BookmarkButton'
import LinkVerifyModal from '../components/LinkVerifyModal'
import '../styles/pages/shared/missions.css'
import GitHubConnectModal from '../components/GitHubConnectModal'
import { useUnsavedChangesGuard } from '../hooks/useUnsavedChangesGuard'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const EASE = [0.16, 1, 0.3, 1]

const GITHUB_ERRORS = {
  denied: 'GitHub connection was cancelled.',
  already_linked: 'That GitHub is already linked to another ARISE account. Use your own GitHub, or ask them to disconnect first.',
  unavailable: 'GitHub connect is not configured yet. Try again later.',
  guest: 'Guest accounts cannot connect GitHub.',
  invalid: 'GitHub connection expired. Please try again.',
  failed: 'Could not connect GitHub. Please try again.',
}

// "+N XP" suffix for a save toast when the backend awarded XP for this link (0 or − → no suffix)
const xpSuffix = (data) => (data?.xpEarned > 0 ? ` · +${data.xpEarned} XP` : '')

// Removal toast content — appends a red "−N XP" when clearing the link reversed XP (0 → plain label)
const removeToast = (label, data) =>
  data?.xpEarned < 0
    ? <span>{label} · <span style={{ color: '#EF4444', fontWeight: 700 }}>−{Math.abs(data.xpEarned)} XP</span></span>
    : label

const RANK_META = {
  D: { color: '#4ADE80', bg: 'rgba(74,222,128,0.12)',  desc: 'Beginner' },
  C: { color: '#60A5FA', bg: 'rgba(96,165,250,0.12)',  desc: 'Intermediate' },
  B: { color: '#9B6ED4', bg: 'rgba(155,110,212,0.12)', desc: 'Advanced' },
  A: { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)',  desc: 'Expert' },
  S: { color: '#EF4444', bg: 'rgba(239,68,68,0.12)',   desc: 'Elite' },
}

// Shared scroll-reveal for content sections
const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.5, ease: EASE },
}

function RepoTipsHelp({ githubLogin = 'your-username' }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  return (
    <div className={`md-submit__help${open ? ' is-open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className="md-submit__help-btn"
        aria-label="How to paste your repo link"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        ?
      </button>
      {open && (
        <div className="md-submit__help-panel" role="dialog" aria-label="How to paste your repo link">
          <p className="md-submit__help-title">How to paste your repo link</p>
          <ul className="md-submit__tips-list">
            <li>
              Best format:{' '}
              <span className="md-submit__tips-code">{`https://github.com/${githubLogin}/project-name`}</span>
            </li>
            <li>Links with <span className="md-submit__tips-code">/tree/…</span> or <span className="md-submit__tips-code">/blob/…</span> also work — we clean them on save.</li>
            <li>Repo must be <strong>public</strong> and under your connected GitHub account.</li>
            <li>Each repo can only be linked to <strong>one mission</strong> on ARISE.</li>
            <li>Use a repo you built for this mission — don&apos;t reuse the same project across missions.</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default function MissionDetailPage() {
  const { id }              = useParams()
  const navigate            = useNavigate()
  const confirm             = useConfirm()
  const { user }            = useAuth()
  const { theme, toggleTheme } = useTheme()
  const light               = theme === 'light'
  const [mission, setMission] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [approachOpen, setApproachOpen] = useState(false)
  const [mistakesOpen, setMistakesOpen] = useState(false)
  const [hintsOpen, setHintsOpen] = useState(false)

  // ── Hunter's submitted work (repo + live demo) ──
  const [submission, setSubmission] = useState(null)
  const [subLoading, setSubLoading] = useState(true)
  const [repoUrl, setRepoUrl]       = useState('')
  const [deployUrl, setDeployUrl]   = useState('')
  const [savingRepo, setSavingRepo] = useState(false)
  const [savingDeploy, setSavingDeploy] = useState(false)
  const [repoErr, setRepoErr]       = useState('')
  const [deployErr, setDeployErr]   = useState('')
  const [githubBusy, setGithubBusy] = useState(false)
  const [githubConnectOpen, setGithubConnectOpen] = useState(false)
  const [linkVerifyResults, setLinkVerifyResults] = useState(null)
  const pendingDeploySaveRef = useRef(null)
  const leaveGuardRef = useRef({ notifyDeferredLeave: () => {}, completePendingLeave: () => {} })
  const saveAllBeforeLeaveRef = useRef(async () => true)
  const submitRef = useRef(null)

  const githubConnected = !!user?.githubConnected
  const githubLogin = user?.githubLogin || 'you'

  const savedRepo = (submission?.repoUrl || '').trim()
  const savedDeploy = (submission?.deployUrl || '').trim()
  const repoTrim = repoUrl.trim()
  const deployTrim = deployUrl.trim()
  const repoNormalized = repoTrim ? normalizeGitHubRepoUrl(repoTrim) : ''
  const repoUnchanged = !!savedRepo && repoNormalized === savedRepo
  const canSaveRepo = githubConnected && !repoUnchanged && (repoTrim !== '' || savedRepo !== '') && !savingRepo && !savingDeploy
  const deployUnchanged = deployTrim === savedDeploy
  const deployLooksValid = !deployTrim || isLooseHttpUrl(deployTrim)
  const canSaveDeploy = deployLooksValid && !deployUnchanged && (deployTrim !== '' || savedDeploy !== '') && !savingRepo && !savingDeploy

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const gh = params.get('github')
    if (gh === 'connected') {
      clearUserCache()
      toast.success('GitHub connected — paste your repository link below.')
      window.dispatchEvent(new Event('sl:refresh'))
    } else if (gh === 'error') {
      toast.error(GITHUB_ERRORS[params.get('reason') || 'failed'] || GITHUB_ERRORS.failed)
    }
    if (gh) {
      params.delete('github')
      params.delete('reason')
      const qs = params.toString()
      window.history.replaceState(window.history.state, '', window.location.pathname + (qs ? `?${qs}` : ''))
    }
  }, [id])

  useEffect(() => {
    let active = true
    if (!isMongoId(id)) {
      setNotFound(true)
      setTimeout(() => { if (active) setLoading(false) }, PAGE_MIN_MS)
      return () => { active = false }
    }
    getMission(id)
      .then(r => { if (active) setMission(r.data) })
      .catch(() => { if (active) setNotFound(true) })
      .finally(() => setTimeout(() => { if (active) setLoading(false) }, PAGE_MIN_MS))
    return () => { active = false }
  }, [id])

  useEffect(() => {
    if (!isMongoId(id)) return
    let active = true
    setSubLoading(true)
    getMissionSubmission(id)
      .then(r => {
        if (!active) return
        const s = r.data
        setSubmission(s)
        setRepoUrl(s?.repoUrl || '')
        setDeployUrl(s?.deployUrl || '')
      })
      .catch(() => {})
      .finally(() => { if (active) setSubLoading(false) })
    return () => { active = false }
  }, [id])

  // Deep-link from the mission board's "Add repo / demo" button: once the page content
  // is actually on screen (both the mission AND the submission have loaded — otherwise
  // the loader is still showing and the target doesn't exist), scroll to the submit
  // section and focus the missing field.
  useEffect(() => {
    if (loading || subLoading) return undefined
    const params = new URLSearchParams(window.location.search)
    const add = params.get('add')
    if (add !== 'repo' && add !== 'deploy') return undefined
    params.delete('add')
    const qs = params.toString()
    window.history.replaceState(window.history.state, '', window.location.pathname + (qs ? `?${qs}` : ''))
    const t = setTimeout(() => {
      const field = document.getElementById(add === 'repo' ? 'md-repo-url' : 'md-deploy-url')
      if (field) {
        field.scrollIntoView({ behavior: 'smooth', block: 'center' })
        field.focus({ preventScroll: true })
      } else {
        submitRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 260)
    return () => clearTimeout(t)
  }, [loading, subLoading])

  const handleConnectGitHub = async () => {
    if (githubBusy || !isMongoId(id)) return
    setGithubBusy(true)
    try {
      await connectGitHub(`/missions/${id}`)
    } catch (err) {
      toast.error(getApiError(err, 'Could not start GitHub connect. Try again in a moment.'))
      setGithubBusy(false)
    }
  }

  const mergeSubmission = (data) => {
    setSubmission(data)
    setRepoUrl(data?.repoUrl || '')
    setDeployUrl(data?.deployUrl || '')
    setLinkVerifyResults(null)
    setRepoErr('')
    setDeployErr('')
  }

  const ensureCanSave = () => {
    if (!user) {
      toast.error('Sign in to save your mission links.')
      return false
    }
    if (!isMongoId(id)) return false
    return true
  }

  const handleSaveRepo = async () => {
    setRepoErr('')
    if (!ensureCanSave()) return
    if (!githubConnected) {
      setRepoErr('Connect your GitHub account on this page before adding a repository.')
      return
    }
    const repo = repoUrl.trim()
    if (!repo && !savedRepo) {
      setRepoErr('Paste your GitHub repository link before saving.')
      return
    }
    const normalized = repo ? normalizeGitHubRepoUrl(repo) : ''
    if (repo && !normalized) {
      setRepoErr('Enter a GitHub repository link like https://github.com/your-username/project-name')
      return
    }
    setSavingRepo(true)
    try {
      const { data } = await saveMissionSubmission(id, { target: 'repo', repoUrl: normalized || '' })
      mergeSubmission(data)
      toast.success(normalized ? `Repository saved${xpSuffix(data)}` : removeToast('Repository removed', data))
    } catch (e) {
      setRepoErr(getApiError(e, 'Could not save your repository. Check the link and try again.'))
    } finally {
      setSavingRepo(false)
    }
  }

  const handleRemoveRepo = async () => {
    if (!savedRepo || savingRepo || savingDeploy) return
    if (!ensureCanSave()) return
    if (!(await confirm(removeMissionLinkConfirmOptions('repository', submission?.repoXp)))) return
    setRepoUrl('')
    setRepoErr('')
    setSavingRepo(true)
    try {
      const { data } = await saveMissionSubmission(id, { target: 'repo', repoUrl: '' })
      mergeSubmission(data)
      toast.success(removeToast('Repository removed', data))
    } catch (e) {
      setRepoErr(getApiError(e, 'Could not remove repository. Please try again.'))
    } finally {
      setSavingRepo(false)
    }
  }

  const executeDeploySave = async (skipLinkVerification = false) => {
    const deploy = normalizeHttpUrl(pendingDeploySaveRef.current ?? deployUrl)
    pendingDeploySaveRef.current = deploy
    const { data } = await saveMissionSubmission(id, {
      target: 'deploy',
      deployUrl: deploy,
      ...(skipLinkVerification ? { skipLinkVerification: true } : {}),
    })
    mergeSubmission(data)
    toast.success(deploy ? `Live demo saved${xpSuffix(data)}` : removeToast('Live demo removed', data))
  }

  const handleSaveDeploy = async () => {
    setDeployErr('')
    if (!ensureCanSave()) return
    const normalized = normalizeHttpUrl(deployUrl)
    if (deployUrl.trim() && !isLooseHttpUrl(deployUrl)) {
      setDeployErr('Enter a full URL like https://your-app.onrender.com')
      return
    }
    pendingDeploySaveRef.current = normalized
    setSavingDeploy(true)
    try {
      await executeDeploySave(false)
    } catch (e) {
      if (isLinkVerificationError(e)) {
        setLinkVerifyResults(getLinkVerificationResults(e))
        return
      }
      setDeployErr(getApiError(e, 'Could not save your live demo link. Check the URL and try again.'))
    } finally {
      setSavingDeploy(false)
    }
  }

  const handleRemoveDeploy = async () => {
    if (!savedDeploy || savingRepo || savingDeploy) return
    if (!ensureCanSave()) return
    if (!(await confirm(removeMissionLinkConfirmOptions('live demo', submission?.deployXp)))) return
    setDeployUrl('')
    setDeployErr('')
    setLinkVerifyResults(null)
    pendingDeploySaveRef.current = ''
    setSavingDeploy(true)
    try {
      await executeDeploySave(false)
    } catch (e) {
      setDeployErr(getApiError(e, 'Could not remove live demo. Please try again.'))
    } finally {
      setSavingDeploy(false)
    }
  }

  const handleLinkVerifyRetry = async () => {
    setSavingDeploy(true)
    try {
      await executeDeploySave(false)
      leaveGuardRef.current.completePendingLeave()
      return true
    } catch (e) {
      if (isLinkVerificationError(e)) {
        setLinkVerifyResults(getLinkVerificationResults(e))
        return false
      }
      setDeployErr(getApiError(e, 'Could not save. Please try again.'))
      setLinkVerifyResults(null)
      return undefined
    } finally {
      setSavingDeploy(false)
    }
  }

  const handleLinkVerifyOverride = async () => {
    setSavingDeploy(true)
    pendingDeploySaveRef.current = normalizeHttpUrl(pendingDeploySaveRef.current ?? deployUrl)
    try {
      await executeDeploySave(true)
      leaveGuardRef.current.completePendingLeave()
    } catch (e) {
      if (isLinkVerificationError(e)) {
        setLinkVerifyResults(getLinkVerificationResults(e))
      } else {
        setDeployErr(getApiError(e, 'Could not save. Please try again.'))
      }
    } finally {
      setSavingDeploy(false)
    }
  }

  const submissionDirty = repoTrim !== savedRepo || deployTrim !== savedDeploy

  const saveAllBeforeLeave = useCallback(async () => {
    if (!ensureCanSave()) return false
    try {
      if (repoTrim !== savedRepo) {
        if (!githubConnected) {
          toast.error('Connect GitHub before saving your repository link.')
          return false
        }
        const normalized = repoTrim ? normalizeGitHubRepoUrl(repoTrim) : ''
        if (repoTrim && !normalized) {
          setRepoErr('Enter a GitHub repository link like https://github.com/your-username/project-name')
          return false
        }
        setSavingRepo(true)
        try {
          const { data } = await saveMissionSubmission(id, { target: 'repo', repoUrl: normalized || '' })
          mergeSubmission(data)
        } finally {
          setSavingRepo(false)
        }
      }
      if (deployTrim !== savedDeploy) {
        if (deployTrim && !isLooseHttpUrl(deployUrl)) {
          setDeployErr('Enter a full URL like https://your-app.onrender.com')
          return false
        }
        pendingDeploySaveRef.current = normalizeHttpUrl(deployUrl)
        setSavingDeploy(true)
        try {
          await executeDeploySave(false)
        } catch (e) {
          if (isLinkVerificationError(e)) {
            setLinkVerifyResults(getLinkVerificationResults(e))
            leaveGuardRef.current.notifyDeferredLeave()
            return false
          }
          setDeployErr(getApiError(e, 'Could not save your live demo link. Check the URL and try again.'))
          return false
        } finally {
          setSavingDeploy(false)
        }
      }
      return true
    } catch (e) {
      toast.error(getApiError(e, 'Could not save your changes.'))
      return false
    }
  }, [
    repoTrim, savedRepo, deployTrim, savedDeploy, githubConnected,
    deployUrl, id, user,
  ])

  saveAllBeforeLeaveRef.current = saveAllBeforeLeave

  const leaveGuard = useUnsavedChangesGuard(submissionDirty, {
    onSave: () => saveAllBeforeLeaveRef.current(),
    saving: savingRepo || savingDeploy,
    contextLabel: 'mission links',
  })
  leaveGuardRef.current = {
    notifyDeferredLeave: leaveGuard.notifyDeferredLeave,
    completePendingLeave: leaveGuard.completePendingLeave,
  }
  const { requestLeave, leaveModal } = leaveGuard

  if (loading) return <SmokeBladeLoader />
  if (notFound) return <SectionNotFoundPage variant="missions" />
  if (!mission) return null

  const m = RANK_META[mission.rank] || RANK_META['D']
  const rankStyle = { '--rank-color': m.color, '--rank-bg': m.bg }

  // One consolidated stat strip — each fact shown only here
  const stats = [
    { icon: Clock, value: `~${mission.estimatedHours}h`, label: 'to build' },
    mission.objectives?.length && { icon: ListChecks, value: mission.objectives.length, label: 'objectives' },
    mission.approachSteps?.length && { icon: Compass, value: mission.approachSteps.length, label: 'guided steps' },
    mission.bonusObjectives?.length && { icon: Sparkles, value: mission.bonusObjectives.length, label: 'bonus goals' },
  ].filter(Boolean).slice(0, 4)

  const hasSide =
    mission.prerequisites?.length > 0 ||
    !!mission.learningOutcome ||
    mission.conceptsCovered?.length > 0 ||
    mission.subjectTitles?.length > 0

  return (
    <div className="md" style={rankStyle}>
      {/* ── Sticky top bar ─────────────────────────────────────────────── */}
      <header className="md-top">
        <button type="button" onClick={() => requestLeave(() => navigate(-1))} className="md-top__back">
          <ArrowLeft size={14} /> <span>All Missions</span>
        </button>
        <span className="md-top__title">{mission.title}</span>
        <div className="md-top__right">
          <button
            type="button"
            onClick={toggleTheme}
            className="md-top__icon-btn"
            title={light ? 'Switch to dark' : 'Switch to light'}
          >
            {light ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <EnterArenaButton />
        </div>
      </header>

      {/* ── The project (statement) ────────────────────────────────────── */}
      <section className="md-hero">
        <div className="md-hero__bg" aria-hidden="true"><div className="md-hero__grid" /></div>
        <motion.div
          className="md-hero__inner"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="md-hero__bookmark">
            <BookmarkButton
              type="MISSION"
              refId={id}
              title={mission.title}
              description={mission.rank ? `${mission.rank}-Rank mission` : 'Mission'}
              icon="🎯"
              iconOnly
            />
          </span>

          <div className="md-hero__badges">
            <span className="md-rank-pill">{mission.rank}-RANK · {m.desc}</span>
          
          </div>

          <h1 className="md-hero__title">{mission.title}</h1>

          {mission.missionBrief && (
            <p className="md-hero__lead">{mission.missionBrief}</p>
          )}

          {mission.techStack?.length > 0 && (
            <div className="md-hero__tech">
              {mission.techStack.map(t => (
                <span key={t} className="md-tech-tag">{t}</span>
              ))}
            </div>
          )}

          {stats.length > 0 && (
            <div className="md-stat-strip">
              {stats.map(s => {
                const Icon = s.icon
                return (
                  <div key={s.label} className="md-stat">
                    <Icon size={15} className="md-stat__icon" />
                    <span className="md-stat__v">{s.value}</span>
                    <span className="md-stat__l">{s.label}</span>
                  </div>
                )
              })}
            </div>
          )}
        </motion.div>
      </section>

      {/* ── Guided reading flow ────────────────────────────────────────── */}
      <div className="md-body">

        {/* Objectives (left) + context cards (right) */}
        <div className={`md-cols${hasSide ? '' : ' md-cols--solo'}`}>
          <div className="md-cols__main">
            {mission.objectives?.length > 0 && (
              <motion.section {...reveal} id="objectives" className="md-block">
                <div className="md-block__head">
                  
                  <div className="md-block__headtext">
                    <h2 className="md-block__title"><ListChecks size={18} /> What your build must do</h2>
                    <p className="md-block__hint">These are the requirements. Aim to make every one of them work.</p>
                  </div>
                </div>
                <ol className="md-steps">
                  {mission.objectives.map((obj, i) => (
                    <li key={i} className="md-step">
                      <span className="md-step__num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="md-step__text">{obj}</span>
                    </li>
                  ))}
                </ol>

                {mission.bonusObjectives?.length > 0 && (
                  <div className="md-bonus">
                    <span className="md-bonus__label"><Sparkles size={14} /> Bonus — go further to stand out</span>
                    <ul className="md-bonus-list">
                      {mission.bonusObjectives.map((obj, i) => (
                        <li key={i} className="md-bonus-item"><span className="md-bonus-item__star">★</span><span>{obj}</span></li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.section>
            )}
          </div>

          {hasSide && (
            <aside className="md-cols__side">
              {mission.prerequisites?.length > 0 && (
                <motion.section {...reveal} className="md-note md-note--amber">
                  <span className="md-note__label"><AlertTriangle size={15} /> Before you start</span>
                  <p className="md-note__text">Get comfortable with these first — the mission builds on them.</p>
                  <div className="md-chips">
                    {mission.prerequisites.map((pre, i) => (
                      <span key={i} className="md-chip md-chip--amber">{pre}</span>
                    ))}
                  </div>
                </motion.section>
              )}

              {mission.learningOutcome && (
                <motion.section {...reveal} className="md-goal">
                  <span className="md-goal__label"><Target size={15} /> WHAT YOU'LL BE ABLE TO DO</span>
                  <p className="md-goal__text">{mission.learningOutcome}</p>
                </motion.section>
              )}

              {(mission.conceptsCovered?.length > 0 || mission.subjectTitles?.length > 0) && (
                <motion.section {...reveal} className="md-skills">
                  <span className="md-skills__label"><BookOpen size={14} /> Skills this mission builds</span>
                  <div className="md-chips">
                    {mission.conceptsCovered?.map((c, i) => (
                      <span key={`c${i}`} className="md-chip md-chip--blue">{c}</span>
                    ))}
                    {mission.subjectTitles?.map(s => (
                      <span key={`s${s}`} className="md-chip">{s}</span>
                    ))}
                  </div>
                </motion.section>
              )}
            </aside>
          )}
        </div>

        {/* Plan it yourself → reveal approach only on demand */}
        <motion.section {...reveal} id="approach" className="md-block">
          <div className="md-block__head">
            
            <div className="md-block__headtext">
              <h2 className="md-block__title"><PenLine size={18} /> Plan your approach</h2>
              <p className="md-block__hint">
                Before looking at any guidance, sketch how <em>you</em> would build this —
                the data, the screens, the order of work. That struggle is where real learning happens.
              </p>
            </div>
          </div>

          {mission.approachSteps?.length > 0 ? (
            <div className="md-approach">
              <button
                type="button"
                className={`md-reveal${approachOpen ? ' is-open' : ''}`}
                onClick={() => setApproachOpen(o => !o)}
              >
                <span className="md-reveal__text">
                  <Compass size={16} />
                  {approachOpen ? 'Hide the guided approach' : "Stuck? Reveal a step-by-step approach"}
                </span>
                <ChevronDown size={18} className="md-reveal__chev" />
              </button>

              {approachOpen && (
                <motion.div
                  className="md-timeline"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  {mission.approachSteps.map((step, i) => (
                    <div key={i} className="md-timeline__item">
                      <span className="md-timeline__dot">{i + 1}</span>
                      <div className="md-timeline__card">{step}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ) : (
            <p className="md-block__hint">This one is all yours — no guided steps. Trust your plan and start building.</p>
          )}
        </motion.section>

        {mission.commonMistakes?.length > 0 && (
          <motion.section {...reveal} className={`md-fold${mistakesOpen ? ' is-open' : ''}`}>
            <button type="button" className="md-fold__toggle" onClick={() => setMistakesOpen(o => !o)}>
              <span className="md-fold__title md-fold__title--red"><AlertTriangle size={17} /> Common mistakes to avoid</span>
              <ChevronDown size={17} className="md-fold__chev" />
            </button>
            {mistakesOpen && (
              <div className="md-callouts">
                {mission.commonMistakes.map((mistake, i) => (
                  <div key={i} className="md-callout md-callout--red">{mistake}</div>
                ))}
              </div>
            )}
          </motion.section>
        )}

        {mission.hints?.length > 0 && (
          <motion.section {...reveal} className={`md-fold${hintsOpen ? ' is-open' : ''}`}>
            <button type="button" className="md-fold__toggle" onClick={() => setHintsOpen(o => !o)}>
              <span className="md-fold__title md-fold__title--blue"><Lightbulb size={17} /> Hints — open only if truly stuck</span>
              <ChevronDown size={17} className="md-fold__chev" />
            </button>
            {hintsOpen && (
              <div className="md-callouts">
                {mission.hints.map((hint, i) => (
                  <div key={i} className="md-callout md-callout--blue">{hint}</div>
                ))}
              </div>
            )}
          </motion.section>
        )}

        {/* Submit your build — repo + live demo links */}
        <motion.section {...reveal} ref={submitRef} className="md-submit">
          <div className="md-submit__head">
            <span className="md-submit__eyebrow"><Sparkles size={13} /> Final step</span>
            <h2 className="md-submit__title"><Rocket size={22} /> Ship it &amp; show it off</h2>
            <p className="md-submit__hint">
              Add your <strong>GitHub repo</strong> and <strong>live demo</strong> — that&apos;s your best proof of work.
            </p>
          </div>

          {subLoading ? (
            <div className="md-submit__loading">Loading your submission…</div>
          ) : (
            <div className="md-submit__form">
              {!githubConnected ? (
                <div className="md-submit__github md-submit__github--inline">
                  <button type="button" className="md-submit__github-btn" disabled={githubBusy} onClick={() => setGithubConnectOpen(true)}>
                    {githubBusy ? <Loader2 size={16} className="md-submit__spin" /> : <Github size={16} />}
                    {githubBusy ? 'Connecting…' : 'Connect GitHub'}
                  </button>
                </div>
              ) : (
                <>
                  <div className="md-submit__connected">
                    <Github size={15} />
                    <span>Connected as <strong>@{githubLogin}</strong></span>
                  </div>

                  <div className="md-submit__field">
                    <div className="md-submit__label-row">
                      <label className="md-submit__label" htmlFor="md-repo-url">
                        <Github size={15} /> GitHub repository
                      </label>
                      <RepoTipsHelp githubLogin={githubLogin} />
                    </div>
                    <div className="md-submit__field-row">
                      <input
                        id="md-repo-url"
                        type="url"
                        inputMode="url"
                        className="md-submit__input"
                        placeholder={`https://github.com/${githubLogin}/your-project`}
                        value={repoUrl}
                        onChange={e => { setRepoUrl(e.target.value); setRepoErr('') }}
                        onKeyDown={e => saveOnEnter(e, canSaveRepo, handleSaveRepo)}
                      />
                      <div className="md-submit__field-actions">
                        {savedRepo && (
                          <button
                            type="button"
                            className="md-submit__field-remove"
                            onClick={handleRemoveRepo}
                            disabled={savingRepo || savingDeploy}
                            aria-label="Remove saved repository link"
                          >
                            {savingRepo ? <Loader2 size={14} className="md-submit__spin" /> : <Unlink size={14} aria-hidden="true" />}
                            Remove
                          </button>
                        )}
                        <button
                          type="button"
                          className="md-submit__field-save"
                          onClick={handleSaveRepo}
                          disabled={!canSaveRepo}
                        >
                          {savingRepo ? <Loader2 size={15} className="md-submit__spin" /> : <><Check size={15} /> Save</>}
                        </button>
                      </div>
                    </div>
                    {repoErr && (
                      <p className="md-submit__error"><AlertTriangle size={14} /> {repoErr}</p>
                    )}
                  </div>
                </>
              )}

              <div className="md-submit__field">
                <div className="md-submit__label-row">
                  <label className="md-submit__label" htmlFor="md-deploy-url">
                    <Globe size={15} /> Live demo
                  </label>
                </div>
                <div className="md-submit__field-row">
                  <input
                    id="md-deploy-url"
                    type="url"
                    inputMode="url"
                    className="md-submit__input"
                    placeholder="https://your-app.onrender.com"
                    value={deployUrl}
                    onChange={e => { setDeployUrl(e.target.value); setDeployErr('') }}
                    onKeyDown={e => saveOnEnter(e, canSaveDeploy, handleSaveDeploy)}
                  />
                  <div className="md-submit__field-actions">
                    {savedDeploy && (
                      <button
                        type="button"
                        className="md-submit__field-remove"
                        onClick={handleRemoveDeploy}
                        disabled={savingRepo || savingDeploy}
                        aria-label="Remove saved live demo link"
                      >
                        {savingDeploy ? <Loader2 size={14} className="md-submit__spin" /> : <Unlink size={14} aria-hidden="true" />}
                        Remove
                      </button>
                    )}
                    <button
                      type="button"
                      className="md-submit__field-save"
                      onClick={handleSaveDeploy}
                      disabled={!canSaveDeploy}
                    >
                      {savingDeploy ? <Loader2 size={15} className="md-submit__spin" /> : <><Check size={15} /> Save</>}
                    </button>
                  </div>
                </div>
                {deployErr && (
                  <p className="md-submit__error"><AlertTriangle size={14} /> {deployErr}</p>
                )}
                {!deployErr && deployTrim && !deployLooksValid && (
                  <p className="md-submit__error"><AlertTriangle size={14} /> Enter a full URL like https://your-app.onrender.com</p>
                )}
              </div>

              {(submission?.repoUrl || submission?.deployUrl) && (
                <div className="md-submit__links md-submit__links--inline">
                  {submission?.repoUrl && safeExternalUrl(submission.repoUrl) && (
                    <a href={safeExternalUrl(submission.repoUrl)} target="_blank" rel="noopener noreferrer" className="md-submit__link">
                      <Github size={16} /> <span>Repository</span> <ExternalLink size={13} className="md-submit__ext" />
                    </a>
                  )}
                  {submission?.deployUrl && safeExternalUrl(submission.deployUrl) && (
                    <a href={safeExternalUrl(submission.deployUrl)} target="_blank" rel="noopener noreferrer" className="md-submit__link md-submit__link--live">
                      <Globe size={16} /> <span>Live demo</span> <ExternalLink size={13} className="md-submit__ext" />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </motion.section>

        <div className="md-back-wrap">
          <button type="button" onClick={() => requestLeave(() => navigate(-1))} className="md-back-btn">
            <ArrowLeft size={14} /> Back to Mission Board
          </button>
        </div>
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
        busy={savingDeploy}
        context="mission"
        onClose={() => setLinkVerifyResults(null)}
        onRetry={handleLinkVerifyRetry}
        onSaveUnverified={handleLinkVerifyOverride}
      />
      {leaveModal}
    </div>
  )
}
