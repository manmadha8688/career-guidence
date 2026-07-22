import { X } from 'lucide-react'
import useBodyLock from '../../../hooks/useBodyLock'
import useModalA11y from '../../../hooks/useModalA11y'
import { RANK_COLORS_DARK } from '../../../constants/ranks'

export default function AboutGateModal({ subject, onClose }) {
  const rc = RANK_COLORS_DARK[subject?.rank] || '#888888'

  useBodyLock()
  const modalRef = useModalA11y(onClose)

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

  return (
    <div className="dash-overlay-backdrop dash-overlay-backdrop--about" onClick={e => e.target === e.currentTarget && onClose()}>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-gate-title"
        className="dash-about-modal"
        style={{ '--accent': rc, '--rank-bg': rc + '15', '--overview-bg': rc + '08', '--icon-bg': subject.color + '22' }}
      >
        <div className="dash-about-modal__header">
          <div className="dash-about-modal__icon-wrap">{subject.icon}</div>
          <div className="dash-flex-1">
            <div id="about-gate-title" className="dash-about-modal__title">{subject.title}</div>
            <div className="dash-about-modal__meta">
              <span className="dash-about-modal__rank-badge">{subject.rank || 'E'}-RANK</span>
              {subject.difficulty && <span className="dash-about-modal__chip">{subject.difficulty}</span>}
              {subject.estimatedHours > 0 && <span className="dash-about-modal__chip">{subject.estimatedHours}h</span>}
              <span className="dash-about-modal__chip">{subject.totalConcepts} skills</span>
            </div>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="dash-icon-btn"><X size={16} /></button>
        </div>

        <div className="dash-about-modal__body">
          {subject.overview && (
            <div className="dash-about-modal__full-col">
              <Section label="Overview">
                <p className="dash-about-overview">{subject.overview}</p>
              </Section>
            </div>
          )}

          {subject.whyLearn && (
            <Section label="Why Learn This?">
              <p className="dash-about-text">{subject.whyLearn}</p>
            </Section>
          )}

          {subject.forWho && (
            <Section label="Who Is This For?">
              <p className="dash-about-text">{subject.forWho}</p>
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
            <div className="dash-about-modal__full-col">
              <Section label="Career Use">
                <p className="dash-about-text">{subject.careerUse}</p>
              </Section>
            </div>
          )}

          {!subject.overview && !subject.whyLearn && !subject.outcomes?.length && (
            <div className="dash-about-empty">NO GATE INTEL AVAILABLE YET</div>
          )}
        </div>
      </div>
    </div>
  )
}
