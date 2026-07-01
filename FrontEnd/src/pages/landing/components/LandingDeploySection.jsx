import { DEPLOY_STACKS, DEPLOY_STATS } from '../landingData'
import { useLanding } from '../context/LandingPageContext'

export default function LandingDeploySection() {
  const { navigate } = useLanding()

  return (
    <section className="lp-section-pad">
      <div className="lp-section-inner">
        <div className="lp-section-header--sm lp-section-header--center lp-reveal">
          <span className="lp-topic-badge lp-topic-badge--deploy">🚀 Deploy Guidance</span>
        </div>

        <div className="lp-two-col lp-two-col--spaced">
          <div className="lp-reveal-left">
            <h2 className="lp-section-title--lg">
              Build it locally.<br />
              <span className="lp-deploy-gradient-text">Ship it live. For free.</span>
            </h2>
            <p className="lp-section-desc--left">
              Step-by-step deployment guides for every major tech stack —
              React, Django, Node.js, FastAPI, Spring Boot, and more.
            </p>
            <p className="lp-section-desc--sm">
              Includes free database setup (MongoDB Atlas, Neon, Supabase),
              environment variable security, Git safety, and live URL in under 30 minutes.
            </p>
            <p className="lp-section-desc--accent">
              A live URL on your resume is 10× more impressive than code that only runs on localhost.
            </p>
            <button type="button" onClick={() => navigate('/deployment')} className="lp-section-cta lp-section-cta--deploy">
              🚀 Open Deploy Guide — Free
            </button>
          </div>

          <div className="lp-reveal-right lp-deploy-grid">
            {DEPLOY_STACKS.map(item => (
              <div
                key={item.title}
                className="lp-deploy-card"
                style={{ '--cc-color': item.color }}
                onClick={() => navigate('/deployment')}
              >
                <div className="lp-color-card__icon--sm">{item.icon}</div>
                <div className="lp-color-card__title--sm">{item.title}</div>
                <p className="lp-color-card__desc--muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lp-stats-row-auto lp-reveal">
          {DEPLOY_STATS.map((stat, i) => (
            <div key={i} className="lp-deploy-stat">
              <div className={`lp-deploy-stat__value lp-deploy-stat__value--${stat.tone}`}>{stat.value}</div>
              <div className="lp-deploy-stat__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
