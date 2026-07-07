import { GraduationCap, ArrowRight, CheckCircle } from 'lucide-react'
import { FRESHER_GUIDE_POINTS } from '../landingData'
import { useLanding } from '../context/LandingPageContext'

export default function LandingFreshersSection() {
  const { navigate } = useLanding()

  return (
    <section id="freshers" className="lp-section-block lp-freshers-section">
      <div className="lp-freshers lp-reveal">
        <div className="lp-freshers__glow" />

        <div className="lp-freshers__content">
          <span className="lp-freshers__badge">
            <GraduationCap size={15} /> New here? Start right
          </span>
          <h2 className="lp-freshers__title">
            First time hunting for a tech job?{' '}
            <span className="lp-grad-text">Read the Fresher's Guide.</span>
          </h2>
          <p className="lp-freshers__desc">
            A step-by-step playbook that shows you exactly how to use learnforearn — which
            roadmap to pick, how to practice, what to build, and how to turn it all into
            interview calls. Written for people starting from absolute zero.
          </p>

          <ul className="lp-freshers__list">
            {FRESHER_GUIDE_POINTS.map(p => (
              <li key={p} className="lp-freshers__list-item">
                <CheckCircle size={17} /> {p}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => navigate('/fresher-instructions')}
            className="lp-btn-primary lp-btn-primary--hero lp-freshers__cta"
          >
            Read the Fresher's Guide <ArrowRight size={16} />
          </button>
        </div>

        <div className="lp-freshers__visual" aria-hidden="true">
          <div className="lp-freshers__steps">
            <div className="lp-freshers__step">
              <span className="lp-freshers__step-num">1</span>
              <div>
                <div className="lp-freshers__step-title">Pick a roadmap</div>
                <div className="lp-freshers__step-sub">Choose your career goal</div>
              </div>
            </div>
            <div className="lp-freshers__step">
              <span className="lp-freshers__step-num">2</span>
              <div>
                <div className="lp-freshers__step-title">Learn &amp; practice</div>
                <div className="lp-freshers__step-sub">Concept by concept, then code</div>
              </div>
            </div>
            <div className="lp-freshers__step">
              <span className="lp-freshers__step-num">3</span>
              <div>
                <div className="lp-freshers__step-title">Build &amp; get hired</div>
                <div className="lp-freshers__step-sub">Ship projects, land interviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
