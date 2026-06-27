import { useState } from 'react'
import { ArrowLeft, Sun, Moon, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react'

// ─── CodeBlock ────────────────────────────────────────────────────────────────
export function CodeBlock({ lines, isFile = false, fileName = '', dark = true }) {
  const [copied, setCopied] = useState(false)
  const text = Array.isArray(lines) ? lines.join('\n') : lines
  const handle = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  const codeBg   = dark ? '#0D1117' : '#1E2433'
  const codeText = '#E2E8F0'
  const hdrBg    = dark ? '#161B22' : '#252D3E'
  const hdrClr   = '#7D8FA8'
  const bdrClr   = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.25)'
  const btnBg    = copied ? 'rgba(74,222,128,0.25)' : (dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.15)')
  const btnBdr   = dark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.2)'
  return (
    <div style={{ margin: '0.6rem 0', borderRadius: 10, overflow: 'hidden', border: `1px solid ${bdrClr}` }}>
      {isFile && fileName && (
        <div style={{ background: hdrBg, padding: '0.35rem 0.75rem', fontSize: '0.72rem', color: hdrClr, fontFamily: 'monospace', display: 'flex', alignItems: 'center' }}>
          <span>📄 {fileName}</span>
        </div>
      )}
      <div style={{ background: codeBg, padding: '0.85rem 1rem', position: 'relative' }}>
        <pre style={{ margin: 0, paddingRight: '3.5rem', fontFamily: "'Fira Code', 'Share Tech Mono', monospace", fontSize: '0.78rem', color: codeText, lineHeight: 1.65, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{text}</pre>
        <button onClick={handle} style={{ position: 'absolute', top: 8, right: 8, background: btnBg, border: `1px solid ${btnBdr}`, borderRadius: 6, padding: '0.25rem 0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: copied ? '#4ADE80' : '#94A3B8', fontSize: '0.68rem' }}>
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

// ─── StepCard ─────────────────────────────────────────────────────────────────
export function StepCard({ step, idx, dark = true }) {
  const [open, setOpen] = useState(false)
  const cardBg    = dark ? '#0C1018' : '#FFFFFF'
  const cardBdr   = dark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.12)'
  const labelClr  = dark ? '#E2E8F0' : '#18244A'
  const chevClr   = dark ? '#475569' : '#94A3B8'
  const textClr   = dark ? '#94A3B8' : '#475569'
  const greenClr  = dark ? '#4ADE80' : '#15803D'
  const textBg    = dark ? '#060A10' : '#F0F4FA'
  const noteBg    = dark ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.12)'
  const noteBdr   = 'rgba(245,158,11,0.3)'
  const noteClr   = dark ? '#FCD34D' : '#92400E'
  return (
    <div style={{ marginBottom: '0.6rem', borderRadius: 12, border: `1px solid ${cardBdr}`, overflow: 'hidden', background: cardBg }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: '100%', background: 'none', border: 'none', padding: '0.9rem 1.1rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: labelClr, textAlign: 'left', gap: '0.5rem' }}>
        <span style={{ fontWeight: 600, fontSize: '0.88rem', flex: 1 }}>{step.label}</span>
        {open ? <ChevronUp size={16} color={chevClr} /> : <ChevronDown size={16} color={chevClr} />}
      </button>
      {open && (
        <div style={{ padding: '0 1.1rem 1rem', borderTop: `1px solid ${cardBdr}` }}>
          <div style={{ height: '0.75rem' }} />
          {step.isText ? (
            <div style={{ background: textBg, borderRadius: 8, padding: '0.85rem 1rem', border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'}` }}>
              {step.text.map((line, i) => (
                <div key={i} style={{ fontSize: '0.83rem', color: line.startsWith('✅') ? greenClr : textClr, lineHeight: 1.75, fontFamily: line.startsWith('   ') || line.startsWith('→') ? 'monospace' : 'inherit' }}>{line}</div>
              ))}
            </div>
          ) : (
            step.commands.map((cmd, i) => (
              <CodeBlock key={i} lines={[cmd]} isFile={step.isFile && i === 0} fileName={step.isFile && i === 0 ? step.fileName : ''} dark={dark} />
            ))
          )}
          {step.note && (
            <div style={{ marginTop: '0.6rem', padding: '0.55rem 0.85rem', background: noteBg, border: `1px solid ${noteBdr}`, borderRadius: 8, fontSize: '0.75rem', color: noteClr, lineHeight: 1.5 }}>
              💡 {step.note}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── PhaseBlock ───────────────────────────────────────────────────────────────
export function PhaseBlock({ phase, dark = true }) {
  const titleClr  = dark ? '#E2E8F0' : '#18244A'
  const bannerBg  = dark ? `${phase.color}18` : `${phase.color}15`
  const bannerBdr = dark ? `${phase.color}35` : `${phase.color}40`
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem', padding: '0.65rem 1rem', borderRadius: 10, background: bannerBg, border: `1px solid ${bannerBdr}` }}>
        <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.75rem', color: phase.color, background: `${phase.color}25`, borderRadius: 6, padding: '0.15rem 0.5rem' }}>{phase.phase}</span>
        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: titleClr }}>{phase.title}</span>
      </div>
      {phase.steps.map((step, i) => <StepCard key={i} step={step} idx={i} dark={dark} />)}
    </div>
  )
}

// ─── GuidePageWrapper ─────────────────────────────────────────────────────────
export default function GuidePageWrapper({ guide, stackData, dark, toggleTheme, onBack }) {
  const bg    = dark ? '#07090F' : '#EEF0F8'
  const card  = dark ? '#0C101C' : '#FFFFFF'
  const text  = dark ? '#E2E8F0' : '#18244A'
  const muted = dark ? '#64748B' : '#5E7299'
  const bdr   = dark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.1)'
  const navBg = dark ? 'rgba(7,9,15,0.96)' : 'rgba(238,240,248,0.97)'

  return (
    <div style={{ minHeight: '100vh', background: bg, color: text, fontFamily: "'Rajdhani', 'Inter', sans-serif" }}>

      {/* ── Sticky Nav ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: navBg, backdropFilter: 'blur(12px)', borderBottom: `1px solid ${bdr}`, padding: '0 1.5rem', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', color: muted, fontSize: '0.82rem', padding: '0.35rem 0.5rem', borderRadius: 7 }}>
          <ArrowLeft size={15} />
          Back to guides
        </button>
        <span style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 800, fontSize: '0.78rem', color: dark ? '#9B6ED4' : '#7C5DBB', letterSpacing: '0.1em' }}>DEPLOY GUIDE</span>
        <button onClick={toggleTheme} style={{ background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)', border: `1px solid ${bdr}`, borderRadius: 8, padding: '0.38rem', cursor: 'pointer', display: 'flex', alignItems: 'center', color: muted }}>
          {dark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </nav>

      {/* ── Guide content ── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '2.5rem 1.25rem 4rem' }}>

        {/* Header card */}
        <div style={{ background: card, border: `1px solid ${stackData.color}40`, borderRadius: 16, padding: '1.5rem 1.75rem', marginBottom: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', boxShadow: dark ? 'none' : '0 2px 12px rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '2.5rem', flexShrink: 0 }}>{stackData.emoji}</span>
          <div>
            <div style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 800, fontSize: '1.1rem', color: stackData.color, marginBottom: '0.25rem' }}>{stackData.title}</div>
            <div style={{ fontSize: '0.83rem', color: muted, marginBottom: '0.6rem' }}>{stackData.desc}</div>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: stackData.color, background: `${stackData.color}18`, border: `1px solid ${stackData.color}35`, borderRadius: 20, padding: '0.15rem 0.55rem' }}>🌐 {stackData.platforms}</span>
              <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#4ADE80', background: dark ? 'rgba(74,222,128,0.12)' : 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 20, padding: '0.15rem 0.55rem' }}>💰 Free</span>
            </div>
          </div>
        </div>

        {/* All phases */}
        {guide.map((phase, i) => <PhaseBlock key={i} phase={phase} dark={dark} />)}

        {/* Done banner */}
        <div style={{ background: dark ? 'linear-gradient(135deg,rgba(74,222,128,0.13),rgba(96,165,250,0.09))' : 'linear-gradient(135deg,rgba(74,222,128,0.18),rgba(96,165,250,0.14))', border: dark ? '1px solid rgba(74,222,128,0.3)' : '1px solid rgba(74,222,128,0.45)', borderRadius: 16, padding: '1.75rem', textAlign: 'center', marginTop: '1.5rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉</div>
          <div style={{ fontWeight: 700, fontSize: '1rem', color: dark ? '#4ADE80' : '#15803D', marginBottom: '0.4rem' }}>Your project is live!</div>
          <div style={{ fontSize: '0.83rem', color: muted, lineHeight: 1.7 }}>
            Add the live URL to your resume, LinkedIn profile, and GitHub repo.<br />
            A deployed project is 10× more impressive than code that only runs locally.
          </div>
          <button onClick={onBack} style={{ marginTop: '1rem', background: dark ? 'rgba(74,222,128,0.15)' : 'rgba(74,222,128,0.2)', border: `1px solid ${dark ? 'rgba(74,222,128,0.35)' : 'rgba(74,222,128,0.5)'}`, color: dark ? '#4ADE80' : '#15803D', borderRadius: 8, padding: '0.5rem 1.25rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.83rem' }}>
            ← Back to all guides
          </button>
        </div>

      </div>
    </div>
  )
}
