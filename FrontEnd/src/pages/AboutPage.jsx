import { useNavigate } from 'react-router-dom'
import {
  Swords, Dumbbell, Rocket, Sparkles, Server, Compass, MapPin,
  Target, ArrowRight, Mail,
} from 'lucide-react'
import InfoPageLayout from '../components/InfoPageLayout'

const RANKS = [
  { label: 'E', color: '#888888', name: 'Beginner' },
  { label: 'D', color: '#4ADE80', name: 'Learner' },
  { label: 'C', color: '#60A5FA', name: 'Improver' },
  { label: 'B', color: '#9B6ED4', name: 'Skilled' },
  { label: 'A', color: '#F59E0B', name: 'Advanced' },
  { label: 'S', color: '#EF4444', name: 'Expert' },
]

const STATS = [
  { num: '88+', label: 'AI tools with hands-on guides' },
  { num: '20+', label: 'Deployment stacks covered' },
  { num: '6', label: 'Ranks from Beginner to Expert' },
  { num: '₹0', label: 'Free forever — no paywall' },
]

const FEATURES = [
  { icon: Swords, title: 'Skill Arena', text: 'Structured subjects and career paths — Full Stack, Frontend, Data — with progress tracking, XP, and earned badges.' },
  { icon: Dumbbell, title: 'Code GYM', text: 'Coding problems across every level, from your first program to placement-style challenges, each with approaches and multiple solutions.' },
  { icon: Rocket, title: 'Missions', text: 'Real project briefs you can build and ship straight to your resume — subject practice, role-based take-homes, and academic ideas.' },
  { icon: Sparkles, title: 'AI Lab', text: 'Hands-on guides for 88+ AI tools every student should know — from ChatGPT and Copilot to vector databases and agents.' },
  { icon: Server, title: 'Deployment Guides', text: 'Step-by-step instructions to put your projects live on free hosting, across 20+ tech stacks.' },
  { icon: Compass, title: 'Fresher & Career Guidance', text: 'Honest, no-hype advice on the job market, choosing a role, and what companies actually expect from you.' },
  { icon: MapPin, title: 'Walk-Ins', text: 'A community board where students share walk-in interview drives happening in their city.' },
]

const AUDIENCE = [
  'College students and recent graduates starting from scratch',
  'Freshers preparing for their first tech job or internship',
  'Students building final-year or mini projects',
  'Anyone who prefers provable progress over passive watching',
]

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <InfoPageLayout
      eyebrow="About"
      title="We turn freshers into hires."
      lede="LearnForEarn is a free platform that takes students from zero knowledge to job-ready — through structured skills, real coding challenges, portfolio-grade projects, and career roadmaps that actually reflect the market."
    >
      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">01</span>
          <h2 className="info-block__title">Why we exist</h2>
          <p className="info-block__desc">The real reason students stall — and how we remove it.</p>
        </div>
        <div className="info-block__content">
          <div className="info-callout">
            <Target className="info-callout__icon" size={22} />
            <p>
              Most students don't fail because they lack ability. They fail because nobody told them
              <strong> what to learn, in what order, and how to prove it.</strong>
            </p>
          </div>
          <p>
            Tutorials pile up. Motivation drops. Six months later there's a graveyard of half-finished
            courses and still nothing to show a recruiter. The problem was never the content — it was
            the absence of structure, proof, and momentum.
          </p>
          <p>
            LearnForEarn replaces passive watching with a clear path: small wins every day, tests that
            verify real understanding, and projects that become portfolio proof. You don't just feel
            like you're learning — you can prove it. <strong>Learn the skills. Earn the job.</strong>
          </p>
          <div className="info-stats">
            {STATS.map(s => (
              <div key={s.label} className="info-stat">
                <div className="info-stat__num">{s.num}</div>
                <div className="info-stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">02</span>
          <h2 className="info-block__title">How it works</h2>
          <p className="info-block__desc">A leveling system where every rank is earned, never given.</p>
        </div>
        <div className="info-block__content">
          <p>
            Every subject is a <strong>gate</strong>: HTML, CSS, JavaScript, Python, React, Spring
            Boot, SQL, and more. Each gate holds focused concepts with clear explanations, real code
            examples, live previews, and a short test. Pass the test, earn XP, and your rank climbs.
          </p>
          <div className="info-ranks">
            {RANKS.map(r => (
              <span key={r.label} className="info-ranks__chip" style={{ '--rank-color': r.color }}>
                {r.label} · {r.name}
              </span>
            ))}
          </div>
          <p>
            Every badge on your profile is backed by a real assessment — so when you say you know a
            skill, you can back it up in the interview room.
          </p>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">03</span>
          <h2 className="info-block__title">What's inside</h2>
          <p className="info-block__desc">Seven connected tools that take you from learning to hired.</p>
        </div>
        <div className="info-block__content">
          <div className="info-grid">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="info-card">
                <span className="info-card__icon"><Icon size={20} /></span>
                <h3 className="info-card__title">{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">04</span>
          <h2 className="info-block__title">Who it's for</h2>
          <p className="info-block__desc">Built for the start of the journey, not the middle.</p>
        </div>
        <div className="info-block__content">
          <ul className="info-list">
            {AUDIENCE.map(a => <li key={a}>{a}</li>)}
          </ul>
          <p style={{ marginTop: '1rem' }}>
            Everything works without payment. You can even explore as a <strong>guest</strong> before
            you create an account.
          </p>
          <div className="info-cta">
            <button type="button" className="info-cta__btn info-cta__btn--primary" onClick={() => navigate('/register')}>
              Start free <ArrowRight size={16} />
            </button>
            <button type="button" className="info-cta__btn info-cta__btn--ghost" onClick={() => navigate('/fresher-instructions')}>
              Read the Fresher Guide
            </button>
          </div>
        </div>
      </div>

      <div className="info-block" id="contact">
        <div className="info-block__head">
          <span className="info-block__num">05</span>
          <h2 className="info-block__title">Work with us</h2>
          <p className="info-block__desc">Built in the open, shaped by student feedback.</p>
        </div>
        <div className="info-block__content">
          <p>
            If you're a college, community, or company that wants to help more freshers get hired — or
            you spotted something we can do better — we'd genuinely like to hear from you.
          </p>
          <div className="info-grid info-grid--2">
            <div className="info-card">
              <span className="info-card__icon"><Mail size={20} /></span>
              <h3 className="info-card__title">Partnerships & outreach</h3>
              <p>Colleges, communities, and hiring teams.</p>
              <a className="info-card__email" href="mailto:partnerships@learnforearn.in">partnerships@learnforearn.in</a>
            </div>
            <div className="info-card">
              <span className="info-card__icon"><Mail size={20} /></span>
              <h3 className="info-card__title">Say hello</h3>
              <p>General questions, ideas, and everything else.</p>
              <a className="info-card__email" href="mailto:hello@learnforearn.in">hello@learnforearn.in</a>
            </div>
          </div>
        </div>
      </div>
    </InfoPageLayout>
  )
}
