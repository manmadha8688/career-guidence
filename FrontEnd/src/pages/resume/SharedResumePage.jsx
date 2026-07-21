import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Download, Share2, Check, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { getPublicResume } from '../../api/api'
import ResumeDocument from './ResumeDocument'
import ResumeNotFoundState from './ResumeNotFoundState'
import ResumePrivateState from './ResumePrivateState'
import { buildAndSaveResumePdf } from './resumePdf'
import '../../styles/pages/resume.css'

export default function SharedResumePage() {
  const { slug } = useParams()
  const [state, setState] = useState('loading') // loading | ok | notfound | private
  const [data, setData] = useState(null)
  const [title, setTitle] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [copied, setCopied] = useState(false)

  // Zoom-to-fit the A4 sheet on screen (like opening a PDF) — never scroll.
  // CSS `zoom` (not transform) re-rasterises the text so it stays crisp.
  const stageRef = useRef(null)
  const [scale, setScale] = useState(1)
  // "Copied" toast reset timer — cleared on unmount so it never fires on a gone component.
  const copiedTimerRef = useRef(null)
  useEffect(() => () => clearTimeout(copiedTimerRef.current), [])

  useEffect(() => {
    let active = true
    setState('loading')
    getPublicResume(slug)
      .then(({ data: res }) => {
        if (!active) return
        setData(res?.data || null)
        setTitle(res?.title || '')
        setState('ok')
      })
      .catch(err => {
        if (!active) return
        // 403 (or an explicit "private" body) → the resume exists but sharing
        // is off; anything else (404 / gone) → treat as not found.
        const status = err?.response?.status
        const isPrivate = status === 403 || err?.response?.data?.error === 'private'
        setState(isPrivate ? 'private' : 'notfound')
      })
    return () => { active = false }
  }, [slug])

  useEffect(() => {
    const name = data?.fullName ? `${data.fullName} — Resume` : (title || 'Resume')
    document.title = name
  }, [data, title])

  // Fit the whole sheet into its stage on both axes (never past 100%).
  // A4 at 760px wide is 1075px tall (210:297).
  useEffect(() => {
    if (state !== 'ok') return
    const stage = stageRef.current
    if (!stage) return
    const A4W = 760, A4H = 1075, PAD = 24 // stage padding (12px per side)
    const fit = () => {
      const availW = stage.clientWidth - PAD
      const availH = stage.clientHeight - PAD
      if (availW <= 0 || availH <= 0) return
      setScale(Math.min(availW / A4W, availH / A4H, 1))
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(stage)
    return () => ro.disconnect()
  }, [state, data])

  const download = async () => {
    if (downloading || !data) return
    setDownloading(true)
    try {
      await buildAndSaveResumePdf(data, title)
    } catch {
      toast.error('Could not generate the PDF. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  const copyLink = async () => {
    const url = window.location.href
    const name = data?.fullName ? `${data.fullName} — Resume` : (title || 'Resume')
    // Native share sheet (WhatsApp, Telegram, email, …) when supported; else copy.
    if (navigator.share) {
      try { await navigator.share({ title: name, text: 'Check out this resume', url }) } catch { /* cancelled */ }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      clearTimeout(copiedTimerRef.current)
      copiedTimerRef.current = setTimeout(() => setCopied(false), 1600)
    } catch {
      toast.error('Could not copy the link.')
    }
  }

  if (state === 'loading') {
    return (
      <div className="rzs-status">
        <Loader2 size={26} className="rz-spin" />
        <p>Loading resume…</p>
      </div>
    )
  }

  if (state === 'notfound') return <ResumeNotFoundState />
  if (state === 'private') return <ResumePrivateState />

  return (
    <div className="rzs-page">
      <main className="rzs-main">
        <div className="rzs-actions">
          <button className="rz-btn rz-btn--ghost" onClick={copyLink}>
            {copied ? <><Check size={15} /> Copied</> : <><Share2 size={15} /> Share link</>}
          </button>
          <button className="rz-btn rz-btn--accent" onClick={download} disabled={downloading}>
            {downloading ? <><Loader2 size={15} className="rz-spin" /> Preparing…</> : <><Download size={15} /> Download PDF</>}
          </button>
        </div>

        <div className="rzs-stage" ref={stageRef}>
          <div className="rzs-paper" style={{ zoom: scale }}>
            <ResumeDocument resume={data || {}} />
          </div>
        </div>
      </main>
    </div>
  )
}
