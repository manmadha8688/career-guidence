// Shared UI helpers for all AI Lab tool pages
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'

export function InfoBox({ children, color }) {
  return (
    <div className="tool-helper-infobox" style={{ '--tool-color': color }}>
      <p className="tool-helper-infobox__text">{children}</p>
    </div>
  )
}

export function Steps({ items, color }) {
  return (
    <div className="tool-helper-steps" style={{ '--tool-color': color }}>
      {items.map((item, i) => (
        <div key={i} className="tool-helper-step">
          <div className="tool-helper-step__num">{item.n}</div>
          <div>
            <div className="tool-helper-step__title">{item.title}</div>
            <div className="tool-helper-step__body">{item.body}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function Compare({ items, color }) {
  return (
    <div className="tool-helper-compare" style={{ '--tool-color': color }}>
      {items.map((item, i) => (
        <div key={i} className="tool-helper-compare__item">
          <div className="tool-helper-compare__head">
            <span className="tool-helper-compare__label">{item.label}</span>
            {item.badge && <span className="tool-helper-compare__badge">{item.badge}</span>}
          </div>
          <p className="tool-helper-compare__body">{item.body}</p>
        </div>
      ))}
    </div>
  )
}

export function Highlight({ children, color }) {
  return (
    <div className="tool-helper-highlight" style={{ '--tool-color': color }}>
      <p className="tool-helper-highlight__text">{children}</p>
    </div>
  )
}

export function CardGrid({ items, color }) {
  return (
    <div className="tool-helper-card-grid" style={{ '--tool-color': color }}>
      {items.map((item, i) => (
        <div key={i} className="tool-helper-card">
          <div className="tool-helper-card__name">{item.name}</div>
          <p className="tool-helper-card__desc">{item.desc}</p>
        </div>
      ))}
    </div>
  )
}

export function SubHead({ label, color }) {
  return (
    <div className="tool-helper-subhead" style={{ '--tool-color': color }}>
      {label}
    </div>
  )
}

/** @deprecated Use className="tool-layout-block__para" instead */
export const P = () => ({})

export function PromptBlockList({ prompts, accentColor = '#00D9FF' }) {
  const copyText = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied!')
  }

  return (
    <div className="tool-prompt-list">
      {prompts.map((p, i) => (
        <div key={i} className="tool-prompt-block" style={{ '--accent-color': accentColor }}>
          <div className="tool-prompt-block__header">
            <span className="tool-prompt-block__label">{p.label}</span>
            <button type="button" onClick={() => copyText(p.text)} className="tool-prompt-block__copy">
              <Copy size={11} /> copy
            </button>
          </div>
          <pre className="tool-prompt-block__body">{p.text}</pre>
        </div>
      ))}
    </div>
  )
}
