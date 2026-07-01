import { useState } from 'react'
import { ArrowLeft, Sun, Moon, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react'

export function CodeBlock({ lines, isFile = false, fileName = '' }) {
  const [copied, setCopied] = useState(false)
  const text = Array.isArray(lines) ? lines.join('\n') : lines
  const handle = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="deploy-code">
      {isFile && fileName && (
        <div className="deploy-code__file-header">
          <span>📄 {fileName}</span>
        </div>
      )}
      <div className="deploy-code__body">
        <pre className="deploy-code__pre">{text}</pre>
        <button
          onClick={handle}
          className={`deploy-code__copy${copied ? ' deploy-code__copy--copied' : ''}`}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

export function StepCard({ step }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="deploy-step">
      <button onClick={() => setOpen(o => !o)} className="deploy-step__toggle">
        <span className="deploy-step__label">{step.label}</span>
        {open ? <ChevronUp size={16} className="deploy-step__chev" /> : <ChevronDown size={16} className="deploy-step__chev" />}
      </button>
      {open && (
        <div className="deploy-step__body">
          <div className="deploy-step__spacer" />
          {step.isText ? (
            <div className="deploy-step__text-block">
              {step.text.map((line, i) => (
                <div
                  key={i}
                  className={`deploy-step__text-line${line.startsWith('✅') ? ' deploy-step__text-line--success' : ''}${line.startsWith('   ') || line.startsWith('→') ? ' deploy-step__text-line--mono' : ''}`}
                >
                  {line}
                </div>
              ))}
            </div>
          ) : (
            step.commands.map((cmd, i) => (
              <CodeBlock key={i} lines={[cmd]} isFile={step.isFile && i === 0} fileName={step.isFile && i === 0 ? step.fileName : ''} />
            ))
          )}
          {step.note && (
            <div className="deploy-step__note">💡 {step.note}</div>
          )}
        </div>
      )}
    </div>
  )
}

export function PhaseBlock({ phase }) {
  return (
    <div className="deploy-phase" style={{ '--phase-color': phase.color }}>
      <div className="deploy-phase__banner">
        <span className="deploy-phase__num">{phase.phase}</span>
        <span className="deploy-phase__title">{phase.title}</span>
      </div>
      {phase.steps.map((step, i) => <StepCard key={i} step={step} />)}
    </div>
  )
}

export default function GuidePageWrapper({ guide, stackData, toggleTheme, onBack }) {
  return (
    <div className="deploy-page" style={{ '--stack-color': stackData.color }}>

      <nav className="deploy-nav">
        <button onClick={onBack} className="deploy-nav__back">
          <ArrowLeft size={15} />
          Back to guides
        </button>
        <span className="deploy-nav__title">DEPLOY GUIDE</span>
        <button onClick={toggleTheme} className="deploy-nav__theme">
          <Sun size={15} className="deploy-nav__theme-icon deploy-nav__theme-icon--dark" />
          <Moon size={15} className="deploy-nav__theme-icon deploy-nav__theme-icon--light" />
        </button>
      </nav>

      <div className="deploy-content">

        <div className="deploy-header">
          <span className="deploy-header__emoji">{stackData.emoji}</span>
          <div>
            <div className="deploy-header__title">{stackData.title}</div>
            <div className="deploy-header__desc">{stackData.desc}</div>
            <div className="deploy-header__badges">
              <span className="deploy-header__badge">🌐 {stackData.platforms}</span>
              <span className="deploy-header__badge deploy-header__badge--free">💰 Free</span>
            </div>
          </div>
        </div>

        {guide.map((phase, i) => <PhaseBlock key={i} phase={phase} />)}

        <div className="deploy-done">
          <div className="deploy-done__emoji">🎉</div>
          <div className="deploy-done__title">Your project is live!</div>
          <div className="deploy-done__text">
            Add the live URL to your resume, LinkedIn profile, and GitHub repo.<br />
            A deployed project is 10× more impressive than code that only runs locally.
          </div>
          <button onClick={onBack} className="deploy-done__btn">
            ← Back to all guides
          </button>
        </div>

      </div>
    </div>
  )
}
