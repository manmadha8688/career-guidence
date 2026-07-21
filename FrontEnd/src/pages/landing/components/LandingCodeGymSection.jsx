import { CODE_GYM_TRACKS } from '../landingData'
import { useLanding } from '../context/LandingPageContext'

export default function LandingCodeGymSection() {
  const { navigate, user } = useLanding()

  const goToTrack = (href) => {
    if (user) navigate(href)
    else navigate(`/login?redirect=${encodeURIComponent(href)}`)
  }

  return (
    <section className="lp-section-block">
      <div className="lp-section-block--inner">
        <div className="lp-section-header--sm lp-section-header--center lp-reveal">
          <span className="lp-topic-badge lp-topic-badge--code">💻 Code GYM</span>
        </div>

        <div className="lp-two-col lp-two-col--spaced">
          <div className="lp-reveal-left">
            <h2 className="lp-section-title--lg">
              Know the code.<br />
              <span className="lp-grad-blue">Crack the interview.</span>
            </h2>
            <p className="lp-section-desc--left">
              Five tracks built for every type of learner — from writing your first print statement to solving questions asked at Amazon and Google.
              Every problem shows brute force to optimized in four languages.
            </p>
            <button type="button" onClick={() => navigate('/code-gym')} className="lp-section-cta lp-section-cta--code">
              💻 Start Solving
            </button>
          </div>

          <div className="lp-reveal-right lp-track-grid">
            {CODE_GYM_TRACKS.map(track => (
              <div
                key={track.title}
                className="lp-color-card lp-color-card--top"
                style={{ '--cc-color': track.color }}
                onClick={() => goToTrack(track.href)}
              >
                <div className="lp-color-card__icon">{track.icon}</div>
                <div className="lp-color-card__title">{track.title}</div>
                <p className="lp-color-card__desc">{track.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
