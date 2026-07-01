import { Swords, Ghost, CheckCircle } from 'lucide-react'
import { PROOF_POINTS } from '../landingData'
import { useLanding } from '../context/LandingPageContext'

export default function LandingFinalCtaSection() {
  const { user, handleEnter, handleGuest, guestLoading } = useLanding()

  return (
    <section className="lp-cta-section">
      <div className="lp-cta-box lp-reveal">
        <div className="lp-cta-box__glow" />
        <div className="lp-cta-box__inner">
          <div className="lp-cta-box__icon">
            <Swords size={24} color="#fff" />
          </div>

          <h2 className="lp-cta-box__title">
            Learn the skills.{' '}
            <span className="lp-grad-text">Earn the job.</span>
          </h2>

          <p className="lp-cta-box__desc">
            Structured roadmaps show you exactly what to learn next.
            Every concept you master brings you one step closer to your first tech job.
          </p>

          <div className="lp-proof-grid">
            {PROOF_POINTS.map(item => (
              <div key={item} className="lp-proof-item">
                <CheckCircle size={15} />
                {item}
              </div>
            ))}
          </div>

          <div className="lp-cta-actions">
            <button type="button" onClick={handleEnter} className="lp-btn-primary lp-cta-pulse lp-btn-primary--cta">
              <Swords size={17} />
              {user ? 'Continue Learning' : 'Start for Free'}
            </button>
            {!user && (
              <button
                type="button"
                onClick={handleGuest}
                disabled={guestLoading}
                className="lp-btn-ghost lp-btn-ghost--guest"
              >
                <Ghost size={14} /> {guestLoading ? 'Starting…' : 'Try as Guest'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
