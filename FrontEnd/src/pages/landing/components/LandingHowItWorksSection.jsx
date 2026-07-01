import { steps } from '../landingData'
import { useLanding } from '../context/LandingPageContext'

export default function LandingHowItWorksSection() {
  const { lt } = useLanding()

  return (
    <section id="how-it-works" className="lp-section-block lp-section-block--journey">
      <div className="lp-section-block--narrow">
        <div className="lp-section-header lp-reveal">
          <p className="lp-section-eyebrow">The Journey</p>
          <h2 className="lp-section-title">Learn. Plan. Get Hired.</h2>
          <p className="lp-section-desc lp-section-desc--mid">
            Follow skill roadmaps that show you exactly where to start and what to learn next.
          </p>
        </div>

        <div className="lp-steps-grid lp-stagger">
          {steps.map(step => (
            <div
              key={step.num}
              className="lp-step-card lp-reveal"
              style={{
                '--step-color': lt ? step.colorL : step.colorD,
                '--step-icon': lt ? step.iconL : step.iconD,
              }}
            >
              <div className="lp-step-card__glow" />
              <div className="lp-step-card__inner">
                <div className="lp-step-card__head">
                  <div className="lp-step-card__icon-wrap">
                    <step.Icon size={22} color={lt ? step.iconL : step.iconD} />
                  </div>
                  <span className="lp-step-card__num">STEP {step.num}</span>
                </div>
                <h3 className="lp-step-card__title">{step.title}</h3>
                <p className="lp-step-card__desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
