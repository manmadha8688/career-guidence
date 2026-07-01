import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import ScrollToTop from '../../components/ScrollToTop'

const CYAN = '#00D9FF'

/** Full-page shell for dedicated AI tool pages */
export function ToolPageShell({ toolColor, categoryLabel, children }) {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'

  return (
    <div className="tool-layout-page" style={{ '--tool-color': toolColor }}>
      <div className="tool-layout-page__glow">
        <div className="tool-layout-page__glow-inner" />
      </div>

      <nav className="tool-layout-nav">
        <button type="button" onClick={() => navigate('/ai-lab')} className="tool-layout-nav__back">
          <ArrowLeft size={14} /> AI Lab
        </button>
        <span className="tool-layout-nav__category">{categoryLabel}</span>
        <button type="button" onClick={toggleTheme} className="tool-layout-nav__theme">
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div className="tool-layout-content">{children}</div>
      <ScrollToTop />
    </div>
  )
}

export function ToolHeader({ icon, title, tagline, badges = [], overview, linkBadge }) {
  return (
    <div className="tool-layout-header">
      <div className="tool-layout-header__row">
        <div className="tool-layout-header__icon">{icon}</div>
        <div>
          <h1 className="tool-layout-header__title">{title}</h1>
          {tagline && <p className="tool-layout-header__tagline">{tagline}</p>}
        </div>
      </div>
      {(badges.length > 0 || linkBadge) && (
        <div className="tool-layout-header__badges">
          {badges.map(([label, chipColor]) => (
            <span key={label} className="tool-layout-chip" style={{ '--chip-color': chipColor }}>
              {label}
            </span>
          ))}
          {linkBadge && (
            <a
              href={linkBadge.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tool-layout-chip tool-layout-chip--link"
              style={{ '--chip-color': linkBadge.color || 'var(--tool-color)' }}
            >
              <ExternalLink size={11} /> {linkBadge.label}
            </a>
          )}
        </div>
      )}
      {overview && <p className="tool-layout-header__overview">{overview}</p>}
    </div>
  )
}

export function Block({ title, titleColor, children }) {
  return (
    <div className="tool-layout-block">
      {title && (
        <div
          className="tool-layout-block__title"
          style={titleColor ? { '--block-title-color': titleColor } : undefined}
        >
          {title}
        </div>
      )}
      {children}
    </div>
  )
}

export function VideoCard({ v }) {
  const url = v?.url || ''
  const isLink = v?.isLink || (url && !url.includes('youtube') && !url.includes('youtu.be'))
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="tool-layout-video-link">
      <div className="tool-layout-video-link__play">
        {isLink ? <ExternalLink size={14} color="#fff" /> : <Play size={13} color="#fff" fill="#fff" />}
      </div>
      <div>
        <div className="tool-layout-video-link__label">{v.label}</div>
        {(v.dur || v.note) && (
          <div className="tool-layout-video-link__meta">
            {[v.dur, v.note].filter(Boolean).join(' · ')}
          </div>
        )}
      </div>
      <ExternalLink size={12} color="var(--text-muted)" />
    </a>
  )
}

export function CanDoList({ items }) {
  return (
    <div className="tool-layout-cando-list">
      {items.map((item, i) => (
        <div key={i} className="tool-layout-cando-item">
          <div className="tool-layout-cando-item__dot" />
          <span className="tool-layout-cando-item__text">{item}</span>
        </div>
      ))}
    </div>
  )
}

export function ProjectTask({ title, description, children, costNote }) {
  return (
    <div className="tool-layout-task">
      <div className="tool-layout-task__header">
        <span>🎯</span>
        <span className="tool-layout-task__label">PROJECT — {title}</span>
      </div>
      {description && <p className="tool-layout-task__desc">{description}</p>}
      {children}
      {costNote && (
        <div className="tool-layout-task__cost">
          <span className="tool-layout-task__cost-text">{costNote}</span>
        </div>
      )}
    </div>
  )
}

export function ProTip({ children }) {
  return (
    <div className="tool-layout-tip">
      <div className="tool-layout-tip__label">⚡ PRO TIP</div>
      <p className="tool-layout-tip__text">{children}</p>
    </div>
  )
}

export function PageNavRow({ prev, next }) {
  const navigate = useNavigate()

  return (
    <div className="tool-layout-nav-row">
      {prev ? (
        <button type="button" className="tool-layout-nav-btn" onClick={() => navigate(prev.path)}>
          <ChevronLeft size={14} /> {prev.label}
        </button>
      ) : (
        <span />
      )}
      <button type="button" className="tool-layout-nav-btn--hub" onClick={() => navigate('/ai-lab')}>
        <ArrowLeft size={12} /> AI Lab
      </button>
      {next ? (
        <button type="button" className="tool-layout-nav-btn" onClick={() => navigate(next.path)}>
          {next.label} <ChevronRight size={14} />
        </button>
      ) : (
        <span />
      )}
    </div>
  )
}

export { CYAN }
