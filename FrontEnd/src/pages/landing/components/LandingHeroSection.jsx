import { Swords, Ghost } from 'lucide-react'
import { HERO_SKILL_BADGES } from '../landingData'
import { useLanding } from '../context/LandingPageContext'

const STAT_TONES = ['primary', 'blue', 'green', 'gold']

export default function LandingHeroSection() {
  const { user, navigate, handleEnter, handleGuest, guestLoading, platformStats, countUpRef } = useLanding()

  const stats = [
    [platformStats.paths,    'Career Paths',  /^\d+$/.test(platformStats.paths) ? platformStats.paths : null, ''],
    [platformStats.subjects, 'Subjects',      /^\d+$/.test(platformStats.subjects) ? platformStats.subjects : null, ''],
    [platformStats.concepts, 'Concepts',      platformStats.concepts.replace('+', ''), '+'],
    ['100+',                 'Problems',      null, ''],
  ]

  return (
    <section className="lp-hero-section">
      <div className="lp-hero-bg" />
      <div className="lp-aurora lp-aurora-1" />
      <div className="lp-aurora lp-aurora-2" />
      <div className="lp-hero-noise" />
      <div className="lp-hero-fade-bottom" />

      <div className="lp-skill-badges" aria-hidden="true">
        {HERO_SKILL_BADGES.map((s, i) => (
          <div
            key={i}
            className="lp-skill-pill"
            style={{
              left: s.x,
              top: s.y,
              color: s.color,
              borderColor: `${s.color}40`,
              background: `${s.color}0d`,
              animationDelay: s.delay,
              animationDuration: s.dur,
            }}
          >
            {s.label}
          </div>
        ))}
      </div>

      <div className="lp-hero-center">
        <div className="lp-hero-eyebrow lp-hero-title">
          <span className="lp-eyebrow-dot" />
          Skills Arena · Code GYM · Mission Board — Free
        </div>

        <p className="lp-hero-tagline-cap lp-hero-title lp-hero-title--d1">
          Learn the skills. Earn the job.
        </p>

        <h1 className="lp-hero-headline-v2 lp-hero-title lp-hero-title--d2">
          Your path to becoming a<br />
          <span className="lp-job-rotate">
            <span className="lp-job-word lp-job-1 lp-grad-text">Python Developer</span>
            <span className="lp-job-word lp-job-2 lp-grad-blue">Full Stack Dev</span>
            <span className="lp-job-word lp-job-3 lp-grad-orange">Data Analyst</span>
            <span className="lp-job-word lp-job-4 lp-grad-text">Backend Engineer</span>
          </span>
        </h1>

        <p className="lp-hero-desc-v2 lp-hero-sub lp-hero-sub--d3">
          Structured career roadmaps, real coding problems, and project missions —<br className="lp-br-desktop" />
          everything an Indian fresher needs to land their first tech job.
        </p>

        <div className="lp-hero-actions lp-hero-ctas lp-hero-actions--center">
          <button type="button" onClick={handleEnter} className="lp-btn-primary lp-cta-pulse lp-btn-primary--hero">
            <Swords size={17} />
            {user ? 'Go to Dashboard' : 'Start Learning — Free'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/fresher-instructions')}
            className="lp-btn-ghost lp-btn-ghost--fresher"
          >
            🎓 Fresher? Read this first
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

        <div ref={countUpRef} className="lp-hero-stats-row lp-hero-stats">
          {stats.map(([val, label, countTarget, suffix], i) => (
            <div key={label} className="lp-hero-stat">
              <div
                data-target={countTarget || undefined}
                data-suffix={suffix || undefined}
                className={`lp-countup lp-hero-stat__value lp-hero-stat__value--${STAT_TONES[i]}`}
              >
                {val}
              </div>
              <div className="lp-hero-stat__label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
