import { useNavigate } from 'react-router-dom'
import InfoPageLayout from '../components/InfoPageLayout'

const RANKS = [
  { label: 'E', color: '#888888', name: 'Beginner' },
  { label: 'D', color: '#4ADE80', name: 'Learner' },
  { label: 'C', color: '#60A5FA', name: 'Improver' },
  { label: 'B', color: '#9B6ED4', name: 'Skilled' },
  { label: 'A', color: '#F59E0B', name: 'Advanced' },
  { label: 'S', color: '#EF4444', name: 'Expert' },
]

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <InfoPageLayout label="[ ABOUT ]" title="About learnforearn">
      <p className="info-page__intro">
        learnforearn is a free learning platform built for students — especially freshers and
        final-year students who want to go from <strong>zero knowledge to job-ready</strong>.
        Instead of endless video playlists, everything here works on a simple leveling system:
        you start as a beginner, clear one skill at a time, prove it in a test, and level up
        step by step until you reach expert level.
      </p>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">01</span> The Leveling System</h2>
        <p>
          Every subject on the platform is a <strong>gate</strong> — HTML, CSS, JavaScript, Python,
          React, Spring Boot, SQL, and more. Each gate contains focused skills (concepts) with clear
          explanations, real code examples, live previews, and a short test. Pass the test, earn XP,
          and your rank climbs:
        </p>
        <div className="info-ranks">
          {RANKS.map(r => (
            <span key={r.label} className="info-ranks__chip" style={{ '--rank-color': r.color }}>
              {r.label} · {r.name}
            </span>
          ))}
        </div>
        <p>
          Ranks are earned, never given. Every badge on your profile is backed by a real assessment —
          which means when you say you know a skill, you can prove it.
        </p>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">02</span> What's Inside</h2>
        <ul>
          <li><strong>Skill Arena</strong> — structured subjects and career paths (Full Stack, Frontend, Data roles) with progress tracking, XP, and badges.</li>
          <li><strong>Code GYM</strong> — coding problems across levels, from your first program to placement-style challenges, with step-by-step approaches and multiple solutions.</li>
          <li><strong>Missions</strong> — real project briefs you can build and put on your resume: subject practice, role-based take-home projects, and academic project ideas.</li>
          <li><strong>AI Lab</strong> — guides for 88+ AI tools every student should know, from ChatGPT and Copilot to vector databases and deployment platforms.</li>
          <li><strong>Deployment Guides</strong> — step-by-step instructions to put your projects live on free hosting, for 20+ tech stacks.</li>
          <li><strong>Fresher Guide &amp; Career Guidance</strong> — honest, no-hype advice about the job market, choosing a role, and what companies actually expect.</li>
          <li><strong>Walk-Ins</strong> — a community board where students share walk-in interview drives happening in their city.</li>
        </ul>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">03</span> Why This Exists</h2>
        <p>
          Most students don't fail because they lack ability — they fail because they don't know
          <strong> what to learn, in what order, and how to prove it</strong>. Tutorials pile up,
          motivation drops, and there's no way to show progress to a recruiter.
        </p>
        <p>
          learnforearn fixes that with structure: a clear path from beginner to expert, small wins
          every day, tests that verify real understanding, and projects that become portfolio proof.
          Learn the skills. Earn the job.
        </p>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">04</span> Who It's For</h2>
        <ul>
          <li>College students and recent graduates starting from scratch</li>
          <li>Freshers preparing for their first tech job or internship</li>
          <li>Students building final-year or mini projects</li>
          <li>Anyone who prefers structured, provable progress over passive watching</li>
        </ul>
        <p>
          Everything works without payment. You can even explore as a <strong>guest</strong> before
          creating an account.
        </p>
      </div>

      <div className="info-section" id="contact">
        <h2 className="info-section__title"><span className="info-section__num">05</span> Contact &amp; Feedback</h2>
        <p>
          This platform is actively built and improved based on student feedback. Found something
          wrong, missing, or confusing? Use the <strong>Report button</strong> on every page,
          or visit our <a onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>Contact page</a>.
        </p>
        <p>
          <a onClick={() => { navigate('/'); setTimeout(() => document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' }), 300) }} style={{ cursor: 'pointer' }}>
            → Share your feedback
          </a>
        </p>
      </div>
    </InfoPageLayout>
  )
}
