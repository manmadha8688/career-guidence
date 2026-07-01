import { AI_LAB_CATEGORIES } from '../landingData'
import { useLanding } from '../context/LandingPageContext'

export default function LandingAILabSection() {
  const { navigate } = useLanding()

  return (
    <section className="lp-section-block">
      <div className="lp-section-block--inner">
        <div className="lp-section-header--sm lp-section-header--center lp-reveal">
          <span className="lp-topic-badge lp-topic-badge--ai">⚡ AI Lab</span>
        </div>

        <div className="lp-two-col lp-two-col--spaced">
          <div className="lp-reveal-left">
            <h2 className="lp-section-title--lg">
              Every AI tool.<br />
              <span className="lp-ai-gradient-text">One place to learn them.</span>
            </h2>
            <p className="lp-section-desc--left">
              AI tools explained — what they are, how they work, what you can build.
              From ChatGPT and Copilot to LangChain, CrewAI, RAG systems, and local models.
            </p>
            <p className="lp-section-desc--sm">
              Each tool page includes free video tutorials, concept explanations, and a hands-on project to build. Most tools are completely free to use.
            </p>
            <button type="button" onClick={() => navigate('/ai-lab')} className="lp-section-cta lp-section-cta--ai">
              ⚡ Explore AI Lab — Free
            </button>
          </div>

          <div className="lp-reveal-right lp-category-grid">
            {AI_LAB_CATEGORIES.map(cat => (
              <div
                key={cat.title}
                className="lp-color-card lp-color-card--left"
                style={{ '--cc-color': cat.color }}
                onClick={() => navigate('/ai-lab')}
              >
                <div className="lp-color-card__icon--sm">{cat.icon}</div>
                <div className="lp-color-card__title--sm">{cat.title}</div>
                <p className="lp-color-card__desc--muted">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lp-ai-empty-stats" />
      </div>
    </section>
  )
}
