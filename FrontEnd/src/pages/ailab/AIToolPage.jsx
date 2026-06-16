import { Suspense } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TOOLS } from './aiLabData'
import { TOOL_COMPONENTS } from './toolComponents'

export default function AIToolPage() {
  const { category, toolId } = useParams()
  const navigate = useNavigate()

  const tool = TOOLS.find(t => t.id === toolId && t.category === category)

  // Dedicated page exists → render it
  const DedicatedPage = TOOL_COMPONENTS[toolId]
  if (DedicatedPage) {
    return (
      <Suspense fallback={
        <div style={{ minHeight: '100vh', background: '#020817', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00D9FF', fontFamily: "'Orbitron', sans-serif", fontSize: '0.8rem', letterSpacing: '0.1em' }}>
          LOADING...
        </div>
      }>
        <DedicatedPage />
      </Suspense>
    )
  }

  // No tool found
  if (!tool) {
    return (
      <div style={{ minHeight: '100vh', background: '#020817', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: '#E2E8F0', fontFamily: "'Rajdhani', sans-serif" }}>
        <div style={{ fontSize: '3rem' }}>🔍</div>
        <p>Tool not found</p>
        <button onClick={() => navigate('/ai-lab')} style={{ padding: '0.6rem 1.25rem', borderRadius: 8, background: '#00D9FF', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Back to AI Lab</button>
      </div>
    )
  }

  // Fallback generic page (tool exists but no dedicated page yet)
  return (
    <div style={{ minHeight: '100vh', background: '#020817', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: '#E2E8F0', fontFamily: "'Rajdhani', sans-serif", padding: '2rem' }}>
      <span style={{ fontSize: '3rem' }}>{tool.icon}</span>
      <h1 style={{ fontFamily: "'Orbitron', sans-serif", color: tool.color, margin: 0 }}>{tool.name}</h1>
      <p style={{ color: '#94A3B8', textAlign: 'center', maxWidth: 400 }}>{tool.tagline}</p>
      <p style={{ color: '#64748B', fontSize: '0.8rem', textAlign: 'center' }}>Deep content page coming soon</p>
      {tool.officialUrl && (
        <a href={tool.officialUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '0.6rem 1.25rem', borderRadius: 8, background: tool.color, color: '#fff', textDecoration: 'none', fontWeight: 700 }}>
          Visit Official Site
        </a>
      )}
      <button onClick={() => navigate('/ai-lab')} style={{ padding: '0.5rem 1rem', borderRadius: 8, background: 'transparent', border: '1px solid rgba(0,217,255,0.3)', color: '#00D9FF', cursor: 'pointer' }}>
        ← Back to AI Lab
      </button>
    </div>
  )
}
