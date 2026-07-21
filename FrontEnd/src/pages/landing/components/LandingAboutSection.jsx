import { MapPin } from 'lucide-react'
import { ABOUT_AUDIENCE, ABOUT_OFFERINGS, ABOUT_TRUST } from '../landingData'
import { useLanding } from '../context/LandingPageContext'

export default function LandingAboutSection() {
  const { platformStats, countUpRef } = useLanding()

  const resolveTrust = (value) => {
    if (value === 'subjects') return { text: platformStats.subjects, target: /^\d+$/.test(platformStats.subjects) ? platformStats.subjects : null, suffix: '' }
    if (value === 'concepts') return { text: platformStats.concepts, target: platformStats.concepts.replace('+', ''), suffix: '+' }
    if (value === 'paths') return { text: platformStats.paths, target: /^\d+$/.test(platformStats.paths) ? platformStats.paths : null, suffix: '' }
    return { text: value, target: /^\d+$/.test(value) ? value : null }
  }

  return (
    <section id="about" className="lp-section-block lp-about-section">
      <div className="lp-section-block--inner">
        <div className="lp-section-header lp-reveal">
          <p className="lp-section-eyebrow">What is LearnForEarn?</p>
          <h2 className="lp-grad-text lp-section-title lp-section-title--lg">
            A training ground that turns freshers into hired developers.
          </h2>
          <p className="lp-section-desc lp-about-lead">
            LearnForEarn is a platform for students and graduates in India who
            want a tech job but don't know where to start. Everything you need to go from
            <strong> "zero idea"</strong> to <strong>"I got the offer"</strong> — learn, practice,
            build and get noticed.
          </p>
        </div>

        <div className="lp-about-audience lp-reveal">
          <span className="lp-about-audience__label">Built for</span>
          {ABOUT_AUDIENCE.map(a => (
            <span key={a} className="lp-about-chip">{a}</span>
          ))}
          <span className="lp-about-chip lp-about-chip--accent"><MapPin size={13} /> India</span>
        </div>

        <div className="lp-about-grid lp-stagger">
          {ABOUT_OFFERINGS.map(o => (
            <div key={o.title} className="lp-about-card lp-reveal" style={{ '--ac': o.color }}>
              <div className="lp-about-card__icon">{o.icon}</div>
              <h3 className="lp-about-card__title">{o.title}</h3>
              <p className="lp-about-card__body">{o.body}</p>
            </div>
          ))}
        </div>

        <div ref={countUpRef} className="lp-about-trust lp-reveal">
          {ABOUT_TRUST.map((t, i) => {
            const r = resolveTrust(t.value)
            return (
              <div key={i} className="lp-about-trust__item">
                <div
                  className="lp-about-trust__value"
                  data-target={r.target || undefined}
                  data-suffix={(t.suffix ?? r.suffix) || undefined}
                >
                  {r.text}{t.suffix || ''}
                </div>
                <div className="lp-about-trust__label">{t.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
