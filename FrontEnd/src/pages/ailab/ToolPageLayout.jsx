import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../components/ScrollToTop'
import { TOOLS, CATEGORIES } from './aiLabData'
import { Block, VideoCard, ProjectTask, ProTip } from './toolPageComponents'

/**
 * ToolPageLayout — shared layout for every AI tool page
 *
 * Props:
 *   tool: { id, category, name, tagline, icon, color, free, freeTier, officialUrl }
 *   videos: [{ label, url, duration, note }]
 *   overview: string  — 1-2 paragraph plain text shown right after header
 *   sections: [{ content: string | ReactNode }]  — flowing content blocks (no titles)
 *   canDo: string[]   — what you can do after learning this
 *   task: { title, description, steps[], cost }  — project task
 *   tip: string       — pro tip
 */
export default function ToolPageLayout({ tool, videos = [], overview, sections = [], canDo = [], task, tip }) {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'

  const categoryLabel = CATEGORIES.find(c => c.id === tool.category)?.label || ''

  const sameCat = TOOLS.filter(t => t.category === tool.category)
  const idx = sameCat.findIndex(t => t.id === tool.id)
  const prev = idx > 0 ? sameCat[idx - 1] : null
  const next = idx < sameCat.length - 1 ? sameCat[idx + 1] : null

  return (
    <div className="tool-layout-page" style={{ '--tool-color': tool.color }}>
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

      <div className="tool-layout-content">
        <div className="tool-layout-header">
          <div className="tool-layout-header__row">
            <div className="tool-layout-header__icon">{tool.icon}</div>
            <div className="tool-layout-header__info">
              <h1 className="tool-layout-header__title">{tool.name}</h1>
              <p className="tool-layout-header__tagline">{tool.tagline}</p>
            </div>
          </div>
          <div className="tool-layout-header__badges">
            <Chip label={tool.free ? '✓ FREE' : '⊕ PAID'} color={tool.free ? '#4ADE80' : '#FB923C'} />
            <Chip label={tool.freeTier} color={tool.color} />
            <Chip label={categoryLabel} color="var(--text-muted)" />
            {tool.officialUrl && (
              <a
                href={tool.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tool-layout-chip tool-layout-chip--link"
                style={{ '--chip-color': tool.color }}
              >
                <ExternalLink size={10} /> Official Site
              </a>
            )}
          </div>
          {overview && <p className="tool-layout-header__overview">{overview}</p>}
        </div>

        {videos.length > 0 && (
          <Block title="Free tutorials — watch these first" titleColor="#EF4444">
            <div className="tool-layout-video-list">
              {videos.map((v, i) => (
                <VideoCard key={i} v={{ ...v, dur: v.duration, note: v.note }} />
              ))}
            </div>
          </Block>
        )}

        {sections.map((section, i) => (
          <Block key={i}>
            {typeof section.content === 'string'
              ? section.content.split('\n\n').map((para, j, arr) => (
                  <p
                    key={j}
                    className={`tool-layout-block__para${j === arr.length - 1 ? ' tool-layout-block__para--flush' : ''}`}
                  >
                    {para}
                  </p>
                ))
              : section.content}
          </Block>
        ))}

        {canDo.length > 0 && (
          <Block title="What you can do after this" titleColor={tool.color}>
            <div className="tool-layout-cando-grid">
              {canDo.map((item, i) => (
                <div key={i} className="tool-layout-cando-item">
                  <div className="tool-layout-cando-item__dot" />
                  <span className="tool-layout-cando-item__text">{item}</span>
                </div>
              ))}
            </div>
          </Block>
        )}

        {task && (
          <ProjectTask title={task.title} description={task.description} costNote={task.cost}>
            {task.steps?.length > 0 && (
              <div className="tool-layout-task__steps">
                {task.steps.map((step, i) => (
                  <div key={i} className="tool-layout-task__step">
                    <span className="tool-layout-task__arrow">→</span>
                    <span className="tool-layout-task__step-text">{step}</span>
                  </div>
                ))}
              </div>
            )}
          </ProjectTask>
        )}

        {tip && <ProTip>{tip}</ProTip>}

        <div className="tool-layout-nav-row">
          {prev ? (
            <button type="button" className="tool-layout-nav-btn" onClick={() => navigate(`/ai-lab/${prev.category}/${prev.id}`)}>
              <ChevronLeft size={14} /> <span>{prev.icon}</span> {prev.name}
            </button>
          ) : (
            <span />
          )}
          <button type="button" className="tool-layout-nav-btn--hub" onClick={() => navigate('/ai-lab')}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          {next ? (
            <button type="button" className="tool-layout-nav-btn" onClick={() => navigate(`/ai-lab/${next.category}/${next.id}`)}>
              {next.name} <span>{next.icon}</span> <ChevronRight size={14} />
            </button>
          ) : (
            <span />
          )}
        </div>
      </div>
      <ScrollToTop />
    </div>
  )
}

function Chip({ label, color }) {
  return (
    <span className="tool-layout-chip" style={{ '--chip-color': color }}>
      {label}
    </span>
  )
}
