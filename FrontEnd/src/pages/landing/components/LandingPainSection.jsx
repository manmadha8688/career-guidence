import { PAIN_POINTS } from '../landingData'

export default function LandingPainSection() {
  return (
    <section className="lp-section-block lp-section-block--pain">
      <div className="lp-section-block--pain-inner">
        <div className="lp-pain-header lp-reveal">
          <p className="lp-section-eyebrow lp-section-eyebrow--sm">The Reality</p>
          <h2 className="lp-section-title">Sound familiar?</h2>
          <p className="lp-section-desc lp-section-desc--flush">
            Every year, thousands of Indian graduates face the same wall.
          </p>
        </div>

        <div className="lp-pain-list lp-stagger">
          {PAIN_POINTS.map((p, i) => (
            <div key={i} className="lp-pain-quote lp-reveal">
              <span className="lp-pain-quote__mark">"</span>
              <p className="lp-pain-quote__text">{p.slice(1, -1)}</p>
            </div>
          ))}
        </div>

        <div className="lp-pain-answer">
          <p className="lp-pain-answer__lead">You don't need a degree from IIT.</p>
          <p className="lp-pain-answer__highlight lp-grad-text">
            You need the right skills — learned in the right order.
          </p>
          <p className="lp-pain-answer__body">
            learnforearn gives you a clear roadmap so you always know what to learn next —
            and quizzes to prove you actually learned it.
          </p>
        </div>
      </div>
    </section>
  )
}
