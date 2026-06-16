// Shared UI helpers for all AI Lab tool pages
// Import what you need: import { InfoBox, Steps, Compare, Highlight } from '../helpers'

export function InfoBox({ children, color, dark }) {
  return (
    <div style={{ margin: '1rem 0', padding: '0.875rem 1.125rem', borderRadius: 10, background: dark ? `${color}09` : `${color}07`, border: `1px solid ${color}28` }}>
      <p style={{ fontSize: '0.875rem', color, lineHeight: 1.75, margin: 0, fontWeight: 600 }}>{children}</p>
    </div>
  )
}

export function Steps({ items, color, dark, border }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', margin: '0.75rem 0' }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start', padding: '0.75rem 1rem', borderRadius: 10, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.02)', border: `1px solid ${border}` }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: `${color}20`, border: `1.5px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Orbitron', sans-serif", fontSize: '0.6rem', fontWeight: 700, color, flexShrink: 0 }}>
            {item.n}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.875rem', color: dark ? '#E2E8F0' : '#0F172A', marginBottom: '0.25rem' }}>{item.title}</div>
            <div style={{ fontSize: '0.82rem', color: dark ? '#94A3B8' : '#475569', lineHeight: 1.65 }}>{item.body}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function Compare({ items, color, dark, border }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', margin: '0.75rem 0' }}>
      {items.map((item, i) => (
        <div key={i} style={{ padding: '1rem 1.125rem', borderRadius: 10, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', color, letterSpacing: '0.06em' }}>{item.label}</span>
            {item.badge && <span style={{ fontSize: '0.6rem', background: `${color}15`, color, border: `1px solid ${color}25`, borderRadius: 4, padding: '0.1rem 0.4rem', fontFamily: "'Share Tech Mono', monospace" }}>{item.badge}</span>}
          </div>
          <p style={{ fontSize: '0.83rem', color: dark ? '#94A3B8' : '#475569', lineHeight: 1.7, margin: 0 }}>{item.body}</p>
        </div>
      ))}
    </div>
  )
}

export function Highlight({ children, dark, color }) {
  return (
    <div style={{ padding: '0.75rem 1rem', borderRadius: 9, background: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', border: `1px solid ${color}20`, margin: '0.5rem 0' }}>
      <p style={{ fontSize: '0.83rem', color: dark ? '#94A3B8' : '#475569', lineHeight: 1.7, margin: 0 }}>{children}</p>
    </div>
  )
}

export function CardGrid({ items, color, dark, border }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px,100%),1fr))', gap: '0.625rem', margin: '0.75rem 0' }}>
      {items.map((item, i) => (
        <div key={i} style={{ padding: '0.875rem 1rem', borderRadius: 10, background: dark ? `${color}08` : `${color}06`, border: `1px solid ${color}1e` }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', color, letterSpacing: '0.06em', marginBottom: '0.4rem' }}>{item.name}</div>
          <p style={{ fontSize: '0.8rem', color: dark ? '#94A3B8' : '#475569', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
        </div>
      ))}
    </div>
  )
}

export function SubHead({ label, color }) {
  return <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 800, fontSize: '0.95rem', color, margin: '1.25rem 0 0.625rem' }}>{label}</div>
}

export const P = (sub) => ({ fontSize: '0.9rem', color: sub, lineHeight: 1.85, margin: '0 0 0.875rem' })
