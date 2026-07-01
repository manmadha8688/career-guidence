import { MISSION_FEATURE_CARDS, MISSION_STATS } from '../landingData'
import { useLanding } from '../context/LandingPageContext'

export default function LandingMissionsSection() {
  const { navigate } = useLanding()

  return (
    <section className="lp-section-pad">
      <div className="lp-section-inner">
        <div className="lp-section-header--sm lp-section-header--center lp-reveal">
          <span className="lp-topic-badge lp-topic-badge--missions">⚔ Mission Board</span>
        </div>

        <div className="lp-two-col lp-two-col--spaced">
          <div className="lp-reveal-left">
            <h2 className="lp-section-title--lg">
              Tutorials teach you.<br />
              <span className="lp-grad-orange">Missions prove you.</span>
            </h2>
            <p className="lp-section-desc--left lp-section-desc--left-narrow">
              We've built a collection of real-world project challenges.
              Accept a mission, build something that actually works, and prove your skills beyond theory.
            </p>
            <button type="button" onClick={() => navigate('/missions')} className="lp-section-cta lp-section-cta--missions">
              ⚔ Explore Missions
            </button>
          </div>

          <div className="lp-reveal-right lp-mission-cards">
            {MISSION_FEATURE_CARDS.map((card, i) => (
              <div key={card.title} className={`lp-mission-card${i === 0 ? ' lp-mission-card--highlight' : ''}`}>
                <span className="lp-mission-card__icon">{card.icon}</span>
                <div>
                  <div className="lp-mission-card__title">{card.title}</div>
                  <p className="lp-mission-card__body">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lp-stats-row-3">
          {MISSION_STATS.map((s, i) => (
            <div key={i} className="lp-stat-cell">
              <div className="lp-stat-cell__value lp-stat-cell__value--mission">{s.number}</div>
              <div className="lp-stat-cell__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
