import { X } from 'lucide-react'
import useBodyLock from '../../../hooks/useBodyLock'

export default function AboutGateModal({ subject, onClose }) {
  const RANK_COLOR = { S:'#EF4444', A:'#F59E0B', B:'#9B6ED4', C:'#60A5FA', D:'#4ADE80', E:'#888888' }
  const rc = RANK_COLOR[subject?.rank] || '#888888'

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
          <span style={{ color: rc, flexShrink: 0, marginTop: '0.1rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem' }}>›</span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: 'var(--bg-card)', border: `1px solid ${rc}33`, borderTop: `3px solid ${rc}`, borderRadius: 'var(--radius-lg)', width: 'clamp(340px, 62vw, 860px)', maxHeight: '88vh', display: 'flex', flexDirection: 'column', boxShadow: `0 0 40px ${rc}18` }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <div style={{ width: 40, height: 40, background: subject.color + '22', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
            {subject.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{subject.title}</div>
            <div style={{ display: 'flex', gap: '0.625rem', marginTop: '0.2rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.6rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: 3, border: `1.5px solid ${rc}`, color: rc, background: rc + '15' }}>{subject.rank || 'E'}-RANK</span>
              {subject.difficulty && <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '0.1rem 0.4rem', borderRadius: 3 }}>{subject.difficulty}</span>}
              {subject.estimatedHours > 0 && <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '0.1rem 0.4rem', borderRadius: 3 }}>{subject.estimatedHours}h</span>}
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '0.1rem 0.4rem', borderRadius: 3 }}>{subject.totalConcepts} skills</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0.25rem', borderRadius: 4, flexShrink: 0 }}><X size={16} /></button>
        </div>

        {/* Body — 2-col grid on wide screens, single col on narrow */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '1.25rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', alignContent: 'start' }}>

          {subject.overview && (
            <div style={{ gridColumn: '1 / -1' }}>
              <Section label="Overview">
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0, padding: '0.625rem 0.875rem', background: rc + '08', borderLeft: `3px solid ${rc}`, borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>{subject.overview}</p>
              </Section>
            </div>
          )}

          {subject.whyLearn && (
            <Section label="Why Learn This?">
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{subject.whyLearn}</p>
            </Section>
          )}

          {subject.forWho && (
            <Section label="Who Is This For?">
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{subject.forWho}</p>
            </Section>
          )}

          {subject.prerequisites?.length > 0 && (
            <Section label="What you need to know first">
              <ListItems items={subject.prerequisites} />
            </Section>
          )}

          {subject.toolsRequired?.length > 0 && (
            <Section label="Tools Required">
              <ListItems items={subject.toolsRequired} />
            </Section>
          )}

          {subject.outcomes?.length > 0 && (
            <Section label="What You'll Be Able To Do">
              <ListItems items={subject.outcomes} />
            </Section>
          )}

          {subject.whatYouWillBuild?.length > 0 && (
            <Section label="What You'll Build">
              <ListItems items={subject.whatYouWillBuild} />
            </Section>
          )}

          {subject.careerUse && (
            <div style={{ gridColumn: '1 / -1' }}>
              <Section label="Career Use">
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{subject.careerUse}</p>
              </Section>
            </div>
          )}

          {!subject.overview && !subject.whyLearn && !subject.outcomes?.length && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
              NO GATE INTEL AVAILABLE YET
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
