import { X } from 'lucide-react'
import useBodyLock from '../../../hooks/useBodyLock'

export default function AboutRoadmapModal({ roadmap: r, onClose }) {
  useBodyLock()

  const Section = ({ label, children }) => (
    <div className="dash-about-section">
      <div className="dash-about-section__label">{label}</div>
      {children}
    </div>
  )

  const ListItems = ({ items }) => (
    <div className="dash-about-list">
      {(items || []).map((item, i) => (
        <div key={i} className="dash-about-list__item">
          <span className="dash-about-list__bullet">›</span>
          <span className="dash-about-list__text">{item}</span>
        </div>
      ))}
    </div>
  )

  const hasRichContent = r.overview || r.whyLearn || r.forWho ||
    (r.roleTargets || []).length > 0 ||
    (r.prerequisites || []).length > 0 || (r.toolsRequired || []).length > 0 || (r.outcomes || []).length > 0

  return (
    <div className="dash-overlay-backdrop dash-overlay-backdrop--about" onClick={e => e.target === e.currentTarget && onClose()}>
      <div
        className="dash-about-modal"
        style={{
          '--accent': r.color,
          '--overview-bg': r.color + '08',
          '--icon-bg': r.color + '22',
          '--role-bg': r.color + '15',
          '--role-border': r.color + '35',
        }}
      >
        <div className="dash-about-modal__header">
          <div className="dash-about-modal__icon-wrap">{r.icon}</div>
          <div className="dash-flex-1">
            <div className="dash-about-modal__title">{r.title}</div>
            <div className="dash-about-modal__meta dash-about-modal__meta--roadmap">
              <span className="dash-about-modal__chip">
                {r.totalSubjects ?? r.subjectCount ?? '?'} gates
              </span>
              {r.estimatedWeeks > 0 && (
                <span className="dash-about-modal__chip">{r.estimatedWeeks}w</span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="dash-icon-btn"><X size={16} /></button>
        </div>

        <div className="dash-about-modal__body">
          {!hasRichContent && (
            <div className="dash-about-empty dash-about-empty--roadmap">
              No detailed info added yet. Admin can add overview, tools, and outcomes.
            </div>
          )}

          {(r.roleTargets || []).length > 0 && (
            <div className="dash-about-modal__full-col">
              <Section label="Career Roles This Path Prepares You For">
                <div className="dash-about-roles">
                  {r.roleTargets.map((role, i) => (
                    <span key={i} className="dash-about-role-tag">{role}</span>
                  ))}
                </div>
              </Section>
            </div>
          )}

          {r.overview && (
            <div className="dash-about-modal__full-col">
              <Section label="Overview">
                <p className="dash-about-overview">{r.overview}</p>
              </Section>
            </div>
          )}

          {r.whyLearn && (
            <Section label="Why This Path?">
              <p className="dash-about-text">{r.whyLearn}</p>
            </Section>
          )}

          {r.forWho && (
            <Section label="Who Is This For?">
              <p className="dash-about-text">{r.forWho}</p>
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
