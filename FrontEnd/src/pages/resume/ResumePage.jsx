import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Save, Download, Loader2, Plus, Trash2,
  Sparkles, PenLine, Lightbulb, Lock,
} from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '../../components/navbars/Navbar'
import { useAuth } from '../../context/AuthContext'
import { getResume, saveResume } from '../../api/api'
import { getApiError } from '../../utils/apiError'
import ResumeDocument from './ResumeDocument'
import AtsGuide from './AtsGuide'
import { buildAndSaveResumePdf } from './resumePdf'
import '../../styles/pages/resume.css'

const EASE = [0.16, 1, 0.3, 1]

const EMPTY = {
  fullName: '', email: '', mobile: '', linkedin: '', github: '', portfolio: '',
  objective: '',
  education: [],
  skills: [],       // [{ category, value }]
  projects: [],     // [{ name, link, repo, points: [] }]
  internships: [],  // [{ role, company, duration, points: [] }]
  certificates: [], // string[]
  softSkills: [],   // string[]
}

// ── Field validators (run on blur + before download) ──
const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const rePhone = /^[+]?\d[\d\s().-]{6,17}$/
const reUrl = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i
const vPhone = (v) => !v?.trim() ? '' : rePhone.test(v.trim()) ? '' : 'Enter a valid phone number.'
const vUrl = (v) => !v?.trim() ? '' : reUrl.test(v.trim()) ? '' : 'Enter a valid link, e.g. github.com/you'
const vRequired = (v) => v?.trim() ? '' : 'This field is required.'
const vEmail = (v) => !v?.trim() ? 'Email is required.' : reEmail.test(v.trim()) ? '' : 'Enter a valid email address.'

// Full-resume validation gate — every message here blocks the PDF download.
function collectResumeErrors(r) {
  const e = []
  if (!r.fullName?.trim()) e.push('Full name is required.')
  if (vEmail(r.email)) e.push(vEmail(r.email))
  if (vPhone(r.mobile)) e.push('Mobile number is not valid.')
  ;[['linkedin', 'LinkedIn'], ['github', 'GitHub'], ['portfolio', 'Portfolio']].forEach(([k, label]) => {
    if (vUrl(r[k])) e.push(`${label} link is not a valid URL.`)
  })
  ;(r.projects || []).forEach((p, i) => {
    if (vUrl(p.link)) e.push(`Project ${i + 1}: link is not a valid URL.`)
  })
  return e
}

export default function ResumePage() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  // Registered = logged in AND not a guest. Only these can save & download.
  const isRegistered = !!user && user.role !== 'GUEST'
  const [tab, setTab] = useState('guide')
  const [resume, setResume] = useState(EMPTY)
  const [, setLoaded] = useState(false)
  const [saving, setSaving] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [showErrors, setShowErrors] = useState(false)

  // Load the saved resume once auth resolves — only for registered users.
  // Guests / logged-out visitors get a blank builder (they can't persist).
  // NOTE: no "fetch once" ref here — under React StrictMode the first mount's
  // request would be discarded by cleanup and a ref guard would then block the
  // refetch, leaving the builder empty. The `active` flag + stable deps are enough.
  useEffect(() => {
    if (authLoading) return
    if (!isRegistered) { setLoaded(true); return }
    let active = true
    getResume()
      .then(({ data }) => {
        if (!active) return
        if (data && Object.keys(data).length) setResume({ ...EMPTY, ...data })
        else setResume(r => ({ ...r, fullName: user?.fullName || '', email: user?.email || '' }))
      })
      .catch(() => {})
      .finally(() => { if (active) setLoaded(true) })
    return () => { active = false }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, isRegistered])

  // Guests / logged-out users can build & preview, but saving and downloading
  // need a real account — send them to register, returning here afterwards.
  const requireAccount = (action) => {
    toast.error(`Create a free account to ${action} your resume.`)
    navigate('/register?redirect=/resume')
  }

  // ── state helpers ──
  const set = (key, val) => setResume(r => ({ ...r, [key]: val }))
  const addEntry = (key, empty) => setResume(r => ({ ...r, [key]: [...(r[key] || []), empty] }))
  const updEntry = (key, idx, patch) => setResume(r => ({ ...r, [key]: r[key].map((e, i) => i === idx ? { ...e, ...patch } : e) }))
  const delEntry = (key, idx) => setResume(r => ({ ...r, [key]: r[key].filter((_, i) => i !== idx) }))
  const addStr = (key) => setResume(r => ({ ...r, [key]: [...(r[key] || []), ''] }))
  const updStr = (key, idx, val) => setResume(r => ({ ...r, [key]: r[key].map((s, i) => i === idx ? val : s) }))

  // Education is a single entry (highest / current degree) stored as a one-item array.
  const edu = resume.education?.[0] || {}
  const setEdu = (patch) => setResume(r => ({ ...r, education: [{ ...(r.education?.[0] || {}), ...patch }] }))

  const onSave = async () => {
    if (!isRegistered) return requireAccount('save')
    setSaving(true)
    try {
      await saveResume(resume)
      toast.success('Resume saved to your account')
    } catch (e) {
      toast.error(getApiError(e, 'Could not save your resume. Please try again.'))
    } finally {
      setSaving(false)
    }
  }

  const downloadPdf = async () => {
    if (downloading) return
    if (!isRegistered) return requireAccount('download')
    const errors = collectResumeErrors(resume)
    if (errors.length) {
      setShowErrors(true)
      setTab('build') // make sure the form (with the highlighted fields) is visible
      toast.error(errors.length === 1
        ? errors[0]
        : `Please fix ${errors.length} fields before downloading.`)
      // Bring the first invalid field into view.
      requestAnimationFrame(() => {
        document.querySelector('.rz-input--error')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
      return
    }
    setDownloading(true)
    try {
      await buildAndSaveResumePdf(resume)
      toast.success('Resume downloaded — links are clickable')
    } catch {
      toast.error('Could not generate the PDF. Please try again.')
    } finally {
      setDownloading(false)
    }
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
            <button role="tab" aria-selected={tab === 'guide'} className={`rz-tab${tab === 'guide' ? ' is-active' : ''}`} onClick={() => setTab('guide')}>
              <Lightbulb size={15} /> ATS Guide
            </button>
            <button role="tab" aria-selected={tab === 'build'} className={`rz-tab${tab === 'build' ? ' is-active' : ''}`} onClick={() => setTab('build')}>
              <PenLine size={15} /> Builder
            </button>
          </div>
        </motion.header>

        {tab === 'guide' ? (
          <AtsGuide />
        ) : (
          <div className="rz-layout">
            {/* ── Form ── */}
            <div className="rz-form">
              {/* Basics */}
              <fieldset className="rz-card">
                <legend className="rz-card__legend"><Sparkles size={15} /> Basics</legend>
                <div className="rz-grid-2">
                  <TextField label="Full name" value={resume.fullName} onChange={v => set('fullName', v)} placeholder="your name" validate={vRequired} forceShow={showErrors} />
                  <TextField label="Email" type="email" value={resume.email} onChange={v => set('email', v)} placeholder="you@email.com" validate={vEmail} forceShow={showErrors} />
                  <TextField label="Mobile" value={resume.mobile} onChange={v => set('mobile', v)} placeholder="9876543210" validate={vPhone} forceShow={showErrors} />
                  <TextField label="LinkedIn" value={resume.linkedin} onChange={v => set('linkedin', v)} placeholder="linkedin.com/in/you" validate={vUrl} forceShow={showErrors} />
                  <TextField label="GitHub" value={resume.github} onChange={v => set('github', v)} placeholder="github.com/you" validate={vUrl} forceShow={showErrors} />
                  <TextField label="Portfolio" value={resume.portfolio} onChange={v => set('portfolio', v)} placeholder="your-portfolio.dev" validate={vUrl} forceShow={showErrors} />
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

              {/* Education (single — highest / current degree) */}
              <fieldset className="rz-card">
                <legend className="rz-card__legend">Education</legend>
                <div className="rz-grid-2">
                  <TextField label="Degree" value={edu.degree} onChange={v => setEdu({ degree: v })} placeholder="Bachelor of Technology" />
                  <TextField label="Branch / Specialization" value={edu.branch} onChange={v => setEdu({ branch: v })} placeholder="Computer Science and Engineering" />
                  <TextField label="Pass out year" value={edu.years} onChange={v => setEdu({ years: v })} placeholder="2025" />
                  <TextField label="College" value={edu.college} onChange={v => setEdu({ college: v })} placeholder="Bapatla Engineering College" />
                  <TextField label="CGPA / %" value={edu.cgpa} onChange={v => setEdu({ cgpa: v })} placeholder="8.2/10" />
                </div>
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
                      <TextField label="Live link or GitHub repo" value={p.link} onChange={v => updEntry('projects', i, { link: v })} placeholder="college-portal.vercel.app or github.com/you/repo" validate={vUrl} forceShow={showErrors} />
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
              <div className="rz-preview__actions">
                <button className="rz-btn rz-btn--primary" onClick={onSave} disabled={saving}>
                  {saving ? <><Loader2 size={15} className="rz-spin" /> Saving…</> : <><Save size={15} /> Save</>}
                </button>
                <button className="rz-btn rz-btn--accent" onClick={downloadPdf} disabled={downloading}>
                  {downloading ? <><Loader2 size={15} className="rz-spin" /> Preparing…</> : <><Download size={15} /> Download PDF</>}
                </button>
              </div>
              {!isRegistered && (
                <p className="rz-gate-note">
                  <Lock size={13} />
                  <span>
                    <button type="button" className="rz-gate-note__link" onClick={() => navigate('/register?redirect=/resume')}>Create a free account</button>
                    {' '}to save and download your resume.
                  </span>
                </p>
              )}
              <div className="rz-preview__scroll">
                <ResumeDocument resume={resume} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

/* ── Field primitives ── */
function TextField({ label, value, onChange, placeholder, validate, type = 'text', forceShow = false }) {
  const [touched, setTouched] = useState(false)
  const err = (touched || forceShow) && validate ? validate(value) : ''
  return (
    <label className="rz-field">
      {label && <span className="rz-field__label">{label}</span>}
      <input
        className={`rz-input${err ? ' rz-input--error' : ''}`}
        type={type}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        onBlur={() => setTouched(true)}
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
