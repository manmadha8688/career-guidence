import { APTITUDE_CATEGORIES } from '../../aptitude/aptitudeData'
import { useLanding } from '../context/LandingPageContext'

export default function LandingAptitudeSection() {
  const { navigate } = useLanding()

  return (
    <section className="lp-section-block">
      <div className="lp-section-block--inner">
        <div className="lp-section-header--sm lp-section-header--center lp-reveal">
          <span className="lp-topic-badge lp-topic-badge--aptitude">🧠 Aptitude</span>
        </div>

        <div className="lp-two-col lp-two-col--spaced">
          <div className="lp-reveal-left">
            <h2 className="lp-section-title--lg">
              Every placement test<br />
              <span className="lp-grad-text">opens with aptitude.</span>
            </h2>
            <p className="lp-section-desc--left">
              It’s the first round that decides who gets shortlisted — and the most
              learnable part of the whole process. Quantitative, logical reasoning,
              verbal and data interpretation, each taught twice: <strong>Learn It</strong> for
              the full method, <strong>Crack It</strong> for the exam-day shortcuts.
            </p>
            <button
              type="button"
              onClick={() => navigate('/aptitude')}
              className="lp-section-cta lp-section-cta--aptitude"
            >
              🧠 Train Aptitude
            </button>
          </div>

          <div className="lp-reveal-right lp-track-grid">
            {APTITUDE_CATEGORIES.map(cat => (
              <div
                key={cat.id}
                className="lp-color-card lp-color-card--top"
                style={{ '--cc-color': cat.color }}
                onClick={() => navigate(`/aptitude/${cat.id}`)}
              >
                <div className="lp-color-card__icon">{cat.icon}</div>
                <div className="lp-color-card__title">{cat.label}</div>
                <p className="lp-color-card__desc">{cat.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
