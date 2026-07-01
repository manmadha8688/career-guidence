import { Suspense } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TOOLS } from './aiLabData'
import { TOOL_COMPONENTS } from './toolComponents'

export default function AIToolPage() {
  const { category, toolId } = useParams()
  const navigate = useNavigate()

  const tool = TOOLS.find(t => t.id === toolId && t.category === category)

  const DedicatedPage = TOOL_COMPONENTS[toolId]
  if (DedicatedPage) {
    return (
      <Suspense fallback={
        <div className="ai-tool-fallback ai-tool-fallback--loading">
          LOADING...
        </div>
      }>
        <DedicatedPage />
      </Suspense>
    )
  }

  if (!tool) {
    return (
      <div className="ai-tool-fallback">
        <div className="ai-tool-fallback__icon">🔍</div>
        <p>Tool not found</p>
        <button type="button" onClick={() => navigate('/ai-lab')} className="ai-tool-fallback__btn--primary">
          Back to AI Lab
        </button>
      </div>
    )
  }

  return (
    <div className="ai-tool-fallback" style={{ '--tool-color': tool.color }}>
      <span className="ai-tool-fallback__icon">{tool.icon}</span>
      <h1 className="ai-tool-fallback__title" style={{ color: tool.color }}>{tool.name}</h1>
      <p className="ai-tool-fallback__tagline">{tool.tagline}</p>
      <p className="ai-tool-fallback__soon">Deep content page coming soon</p>
      {tool.officialUrl && (
        <a
          href={tool.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ai-tool-fallback__link"
          style={{ background: tool.color }}
        >
          Visit Official Site
        </a>
      )}
      <button type="button" onClick={() => navigate('/ai-lab')} className="ai-tool-fallback__btn">
        ← Back to AI Lab
      </button>
    </div>
  )
}
