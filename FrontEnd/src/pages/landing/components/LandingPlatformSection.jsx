import { features, ArrowRight } from '../landingData'
import { useLanding } from '../context/LandingPageContext'

export default function LandingPlatformSection() {
  const { lt, navigate, handleEnter } = useLanding()

  return (
    <section className="lp-platform-section">
      <div className="lp-section-header lp-reveal">
        <p className="lp-section-eyebrow">The Platform</p>
        <h2 className="lp-grad-text lp-section-title">One Platform. Zero to Hired.</h2>
        <p className="lp-section-desc">
          Seven tools working together — learn, solve, crack the aptitude round, build missions, deploy live, and land the job.
        </p>
      </div>

      <div className="lp-platform-grid lp-stagger">
        {features.map(f => (
          <div
            key={f.label}
            className={`lp-platform-card lp-reveal${f.isLive ? ' lp-platform-card--live' : ''}`}
            style={{
              '--pc-border': f.activeBorder,
              '--pc-glow': f.glow,
              '--pc-icon': lt ? f.iconL : f.iconD,
              '--pc-glow-strong': f.glow.replace('0.15', '0.25'),
              '--status-color': lt ? f.statusColorL : f.statusColorD,
              '--status-bg': f.statusBg,
            }}
            onClick={f.isLive ? (f.href ? () => navigate(f.href) : handleEnter) : undefined}
          >
            <div className="lp-platform-card__glow" />
            <div className="lp-platform-card__body">
              <div className="lp-platform-card__icon">
                <f.Icon size={30} color={lt ? f.iconL : f.iconD} />
              </div>
              <div className="lp-platform-card__head">
                <span className="lp-platform-card__label">{f.label}</span>
                <span className="lp-platform-card__status">{f.status}</span>
              </div>
              <p className="lp-platform-card__desc">{f.desc}</p>
              {f.isLive && (
                <div className={`lp-platform-card__cta${f.href ? ' lp-platform-card__cta--link' : ''}`}>
                  {f.cta || (f.href ? 'Start Solving' : 'Enter Arena')} <ArrowRight size={14} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
