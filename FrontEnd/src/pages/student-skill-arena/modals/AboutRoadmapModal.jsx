import { X } from 'lucide-react'
import useBodyLock from '../../../hooks/useBodyLock'

export default function AboutRoadmapModal({ roadmap: r, onClose }) {
  useBodyLock()

  const Section = ({ label, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.12em', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>{label}</div>
      {children}
    </div>
  )

  const ListItems = ({ items }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      {(items || []).map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
          <span style={{ color: r.color, flexShrink: 0, marginTop: '0.1rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem' }}>›</span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item}</span>
        </div>
      ))}
    </div>
  )

  const hasRichContent = r.overview || r.whyLearn || r.forWho ||
    (r.roleTargets || []).length > 0 ||
    (r.prerequisites || []).length > 0 || (r.toolsRequired || []).length > 0 || (r.outcomes || []).length > 0

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: 'var(--bg-card)', border: `1px solid ${r.color}33`, borderTop: `3px solid ${r.color}`, borderRadius: 'var(--radius-lg)', width: 'clamp(340px, 62vw, 860px)', maxHeight: '88vh', display: 'flex', flexDirection: 'column', boxShadow: `0 0 40px ${r.color}18` }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <div style={{ width: 40, height: 40, background: r.color + '22', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
            {r.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{r.title}</div>
            <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.2rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '0.1rem 0.4rem', borderRadius: 3 }}>
                {r.totalSubjects ?? r.subjectCount ?? '?'} gates
              </span>
              {r.estimatedWeeks > 0 && (
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '0.1rem 0.4rem', borderRadius: 3 }}>
                  {r.estimatedWeeks}w
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0.25rem', borderRadius: 4, flexShrink: 0 }}><X size={16} /></button>
        </div>

        {/* Body */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '1.25rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', alignContent: 'start' }}>

          {!hasRichContent && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem', letterSpacing: '0.08em' }}>
              No detailed info added yet. Admin can add overview, tools, and outcomes.
            </div>
          )}

          {(r.roleTargets || []).length > 0 && (
            <div style={{ gridColumn: '1 / -1' }}>
              <Section label="Career Roles This Path Prepares You For">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {r.roleTargets.map((role, i) => (
                    <span key={i} style={{
                      fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem',
                      padding: '0.3rem 0.75rem', borderRadius: 20,
                      color: r.color, background: r.color + '15',
                      border: `1px solid ${r.color}35`,
                      letterSpacing: '0.03em',
                    }}>
                      {role}
                    </span>
                  ))}
                </div>
              </Section>
            </div>
          )}

          {r.overview && (
            <div style={{ gridColumn: '1 / -1' }}>
              <Section label="Overview">
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0, padding: '0.625rem 0.875rem', background: r.color + '08', borderLeft: `3px solid ${r.color}`, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>{r.overview}</p>
              </Section>
            </div>
          )}

          {r.whyLearn && (
            <Section label="Why This Path?">
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{r.whyLearn}</p>
            </Section>
          )}

          {r.forWho && (
            <Section label="Who Is This For?">
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{r.forWho}</p>
            </Section>
          )}

          {(r.prerequisites || []).length > 0 && (
            <Section label="What You Need First">
              <ListItems items={r.prerequisites} />
            </Section>
          )}

          {(r.toolsRequired || []).length > 0 && (
            <Section label="Tools Required">
              <ListItems items={r.toolsRequired} />
            </Section>
          )}

          {(r.outcomes || []).length > 0 && (
            <Section label="What You Will Achieve">
              <ListItems items={r.outcomes} />
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}
