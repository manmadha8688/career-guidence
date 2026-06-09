import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { Sun, Moon, ArrowLeft, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react'
import ReportButton from '../components/ReportButton'

// ─── Data ────────────────────────────────────────────────────────────────────

const ROLES = [
  {
    emoji: '🎨', title: 'Frontend Developer',
    demand: 'Very High', color: '#60A5FA',
    desc: 'You build what users see — buttons, pages, animations. If you love design + coding, this is your space.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React or Vue'],
    salary: '₹3.5L – ₹8L (fresher)',
    timeToJob: '6–9 months',
  },
  {
    emoji: '⚙️', title: 'Backend Developer',
    demand: 'Very High', color: '#4ADE80',
    desc: 'You build the engine behind the app — APIs, databases, business logic. More logic-heavy, less design.',
    skills: ['Java or Python or Node.js', 'SQL', 'REST APIs', 'Spring Boot or Django'],
    salary: '₹4L – ₹10L (fresher)',
    timeToJob: '8–12 months',
  },
  {
    emoji: '🔗', title: 'Full Stack Developer',
    demand: 'Highest', color: '#9B6ED4',
    desc: 'You do both frontend and backend. Startups love this — one person who can build complete features.',
    skills: ['HTML/CSS/JS', 'React', 'Node.js or Java', 'MongoDB or SQL'],
    salary: '₹4L – ₹12L (fresher)',
    timeToJob: '10–14 months',
  },
  {
    emoji: '📊', title: 'Data Analyst',
    demand: 'High', color: '#F59E0B',
    desc: 'You analyse business data to find patterns and insights. More Excel + SQL than coding. Great for non-CS too.',
    skills: ['Excel', 'SQL', 'Python basics', 'Power BI or Tableau'],
    salary: '₹3L – ₹7L (fresher)',
    timeToJob: '5–8 months',
  },
  {
    emoji: '🤖', title: 'Data Scientist / ML',
    demand: 'High', color: '#EF4444',
    desc: 'Build AI models and prediction systems. Needs strong maths. Not a beginner path — build basics first.',
    skills: ['Python', 'Statistics', 'ML libraries', 'Deep Learning'],
    salary: '₹5L – ₹15L',
    timeToJob: '12–18 months',
  },
  {
    emoji: '🛡️', title: 'QA / Test Engineer',
    demand: 'Steady', color: '#34D399',
    desc: 'You find bugs before users do. Underrated and very stable. Great entry point with less coding pressure.',
    skills: ['Manual Testing', 'Selenium or Cypress', 'JIRA', 'API Testing'],
    salary: '₹2.5L – ₹6L (fresher)',
    timeToJob: '4–7 months',
  },
  {
    emoji: '☁️', title: 'DevOps / Cloud',
    demand: 'Growing Fast', color: '#A78BFA',
    desc: 'Deploy and manage applications on cloud (AWS, Azure). More infrastructure than development.',
    skills: ['Linux', 'AWS basics', 'Docker', 'CI/CD pipelines'],
    salary: '₹4L – ₹10L',
    timeToJob: '10–14 months',
  },
]

const LANGUAGES = [
  {
    goal: '🚀 Get a job fast', color: '#4ADE80', bg: 'rgba(74,222,128,0.08)',
    picks: [
      { lang: 'JavaScript', reason: 'One language for frontend + backend. Massive job market. Fast to learn basics.' },
      { lang: 'Python', reason: 'Easiest syntax. Used in web, data, automation. Huge demand.' },
    ],
  },
  {
    goal: '🏢 Stable corporate career', color: '#60A5FA', bg: 'rgba(96,165,250,0.08)',
    picks: [
      { lang: 'Java', reason: 'King of enterprise. Banks, MNCs, product companies — Java is everywhere.' },
      { lang: 'Python', reason: 'Second choice for corporate backend + data roles.' },
    ],
  },
  {
    goal: '📊 Data / AI path', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',
    picks: [
      { lang: 'Python', reason: 'No debate. Python + NumPy + Pandas + ML libraries — this is the data language.' },
      { lang: 'SQL', reason: 'Not optional. Every data role needs SQL to query databases.' },
    ],
  },
  {
    goal: '💡 Easy to start learning', color: '#9B6ED4', bg: 'rgba(155,110,212,0.08)',
    picks: [
      { lang: 'Python', reason: 'Reads like English. Best first language for absolute beginners.' },
      { lang: 'JavaScript', reason: 'Run it in the browser instantly. See results immediately — addictive.' },
    ],
  },
]

const ROADMAP = {
  title: 'Full Stack Web Developer',
  subtitle: 'Strongest beginner path with the most job options',
  color: '#9B6ED4',
  duration: '12–14 months if consistent',
  steps: [
    {
      phase: 'Month 1–2', title: 'Build the Foundation',
      items: [
        'HTML — structure of web pages (2 weeks)',
        'CSS — styling, Flexbox, Grid, responsive design (3 weeks)',
        'Build 3 real pages: Profile, Landing Page, Portfolio',
        'Do NOT start JavaScript yet — master HTML/CSS first',
      ],
      tip: 'Most students rush to JavaScript without mastering HTML/CSS. This is where they struggle later.',
    },
    {
      phase: 'Month 3–5', title: 'Learn JavaScript Properly',
      items: [
        'JavaScript fundamentals: variables, loops, functions, arrays, objects',
        'DOM manipulation — make pages interactive',
        'Fetch API — connect to real APIs',
        'Build: To-Do App, Weather App, Quiz App',
      ],
      tip: 'Understand JavaScript deeply — not just syntax. Ask "why" not just "how".',
    },
    {
      phase: 'Month 6–8', title: 'React — Modern Frontend',
      items: [
        'React basics: components, props, state, hooks',
        'React Router — multiple pages in one app',
        'State management basics',
        'Build a complete frontend project (e-commerce or dashboard)',
      ],
      tip: 'React is the #1 frontend skill companies look for. Learn it properly.',
    },
    {
      phase: 'Month 9–11', title: 'Backend with Node.js',
      items: [
        'Node.js + Express — build APIs',
        'MongoDB or MySQL — store data',
        'Authentication: JWT, sessions',
        'Build: REST API for your frontend project',
      ],
      tip: 'Now your projects are real — they have a database, login, and real data.',
    },
    {
      phase: 'Month 12–14', title: 'Job Prep',
      items: [
        'Deploy your project online (Vercel + Render or Railway)',
        'Polish your GitHub profile — clean code, good README',
        'Build ONE strong project you can explain in interviews',
        'Start applying — don\'t wait for "perfect"',
        'Practice 30 mins of DSA daily (HackerRank basics)',
      ],
      tip: 'Companies hire people who have shipped something. A live project beats 5 half-done ones.',
    },
  ],
}

const MISTAKES = [
  {
    mistake: 'Learning too many languages at once',
    reality: 'Master one. A student who knows JavaScript well beats someone who "knows" 5 languages shallowly.',
    icon: '❌',
  },
  {
    mistake: 'Tutorial hell — watching, never building',
    reality: 'After every tutorial, immediately build something similar without watching. That\'s when real learning happens.',
    icon: '📺',
  },
  {
    mistake: 'Copying projects without understanding',
    reality: 'In interviews, they will ask: "Explain this line of code." If you copied it, you can\'t answer.',
    icon: '📋',
  },
  {
    mistake: 'Waiting to be "ready" to apply',
    reality: 'You will never feel fully ready. Start applying at 60–70% ready. Interviews teach you what to learn next.',
    icon: '⏳',
  },
  {
    mistake: 'Ignoring DSA and problem solving',
    reality: 'Product companies test DSA heavily. Even service companies are testing it now. Don\'t skip it.',
    icon: '🧩',
  },
  {
    mistake: 'No portfolio, no GitHub',
    reality: 'Your GitHub is your silent resume. Recruiters check it. Empty GitHub = red flag.',
    icon: '👻',
  },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function CareerGuidancePage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const light = theme === 'light'
  const [openStep, setOpenStep] = useState(0)
  const [activeTab, setActiveTab] = useState('roles')

  const C = {
    bg:      'var(--cg-bg)',
    card:    'var(--cg-card)',
    border:  'var(--cg-border)',
    text:    light ? '#12103A' : '#E2E8F0',
    sub:     light ? '#3D3460' : '#8B9AB8',
    muted:   light ? '#7A6FA0' : '#5A5A7A',
    accent:  '#9B6ED4',
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, fontFamily: "'Rajdhani', sans-serif" }}>

      {/* ── Nav ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.5rem', height: 54,
        background: 'var(--cg-nav-bg)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <button onClick={() => navigate('/fresher-instructions')} style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          background: 'none', border: 'none', cursor: 'pointer',
          color: C.sub, fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.7rem', letterSpacing: '0.08em',
        }}>
          <ArrowLeft size={14} /> FRESHER GUIDE
        </button>

        <span style={{
          fontFamily: "'Orbitron', sans-serif", fontWeight: 900,
          fontSize: '0.8rem', letterSpacing: '0.12em',
          color: C.accent,
        }}>CAREER GUIDANCE</span>

        <button onClick={toggleTheme} style={{
          background: 'none', border: `1px solid ${C.border}`,
          borderRadius: 6, width: 30, height: 30, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: C.sub,
        }}>
          {light ? <Moon size={13} /> : <Sun size={13} />}
        </button>
      </div>

      {/* ── Hero ── */}
      <div style={{
        textAlign: 'center',
        padding: 'clamp(2.5rem, 6vw, 5rem) 1.5rem clamp(2rem, 4vw, 3rem)',
        background: 'linear-gradient(180deg, rgba(155,110,212,0.07) 0%, transparent 100%)',
      }}>
        <div style={{
          display: 'inline-block', fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.65rem', letterSpacing: '0.18em',
          color: C.accent, background: 'rgba(155,110,212,0.1)',
          border: '1px solid rgba(155,110,212,0.25)', borderRadius: 20,
          padding: '0.3rem 1rem', marginBottom: '1.25rem',
        }}>
          ◈ FROM A SENIOR DEVELOPER — FOR YOU
        </div>

        <h1 className="cg-hero-title" style={{
          fontFamily: "'Orbitron', sans-serif", fontWeight: 900,
          fontSize: 'clamp(1.75rem, 5vw, 3rem)', letterSpacing: '0.05em',
          lineHeight: 1.15, margin: '0 0 1.25rem',
        }}>
          Stop Being Confused.<br />Start Moving Forward.
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: C.sub,
          maxWidth: 580, margin: '0 auto 0',
          lineHeight: 1.75,
        }}>
          I've been in this industry for 15+ years. I've hired freshers, mentored them, and seen what works and what doesn't. This is the honest guide nobody told you.
        </p>
      </div>

      {/* ── Mentor Note ── */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 1.25rem 2.5rem' }}>
        <div style={{
          background: C.card, border: `1px solid rgba(155,110,212,0.25)`,
          borderLeft: '4px solid #9B6ED4', borderRadius: 12,
          padding: '1.5rem 1.75rem',
          boxShadow: light ? '0 4px 20px rgba(155,110,212,0.08)' : '0 4px 20px rgba(0,0,0,0.3)',
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #7C3AED, #9B6ED4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.25rem',
            }}>🧑‍💻</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#9B6ED4', marginBottom: '0.5rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em' }}>MENTOR SAYS</div>
              <p style={{ color: C.sub, fontSize: '0.95rem', lineHeight: 1.75, margin: 0 }}>
                "Every week I talk to freshers who are lost — they've watched 200 hours of tutorials, learned 4 languages, and still don't know where to start. The problem isn't effort. It's direction. This page gives you that direction. Read it once, then take action."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 1: Choose Role First ── */}
      <Section title="01 — Choose Your Role First, Not the Language" color="#EF4444" C={C}>
        <p style={{ color: C.sub, fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
          This is the <strong style={{ color: C.text }}>biggest mistake freshers make</strong> — they start with "should I learn Python or Java?" That's the wrong question.
        </p>
        <p style={{ color: C.sub, fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
          The right question is: <strong style={{ color: '#9B6ED4' }}>"What kind of work do I want to do every day?"</strong>
        </p>
        <p style={{ color: C.sub, fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          Think about it this way — a doctor doesn't choose a hospital before choosing a specialty. A chef doesn't buy tools before deciding what cuisine to cook. You pick the destination first, then figure out the vehicle.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {[
            { q: 'Do you enjoy visuals, design, UI?', a: '→ Frontend Development' },
            { q: 'Do you love logic, systems, problem solving?', a: '→ Backend Development' },
            { q: 'Do you want max job options?', a: '→ Full Stack Development' },
            { q: 'Are you good at Excel, numbers, business?', a: '→ Data Analyst' },
            { q: 'Do you want stability with less pressure?', a: '→ QA / Testing' },
            { q: 'Interested in AI, statistics, research?', a: '→ Data Science / ML' },
          ].map((item, i) => (
            <div key={i} style={{
              background: light ? 'rgba(155,110,212,0.05)' : 'rgba(155,110,212,0.07)',
              border: `1px solid ${C.border}`, borderRadius: 10,
              padding: '0.875rem 1rem',
            }}>
              <div style={{ fontSize: '0.875rem', color: C.sub, marginBottom: '0.4rem' }}>{item.q}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#9B6ED4' }}>{item.a}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Section 2: In-demand Roles ── */}
      <Section title="02 — In-Demand Roles Right Now" color="#3B82F6" C={C}>
        <p style={{ color: C.sub, fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          Here's the honest breakdown of what's actually hiring, what pays well, and how long it takes a fresher to get in:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,320px), 1fr))', gap: '1rem' }}>
          {ROLES.map((role, i) => (
            <div key={i} style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderTop: `3px solid ${role.color}`,
              borderRadius: 12, padding: '1.25rem',
              boxShadow: light ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{role.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: C.text }}>{role.title}</div>
                  <span style={{
                    fontSize: '0.62rem', fontFamily: "'Share Tech Mono', monospace",
                    letterSpacing: '0.08em', color: role.color,
                    background: `${role.color}15`, border: `1px solid ${role.color}30`,
                    borderRadius: 4, padding: '0.1rem 0.4rem',
                  }}>
                    {role.demand}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: C.sub, lineHeight: 1.6, margin: '0 0 0.875rem' }}>{role.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.75rem' }}>
                {role.skills.map(s => (
                  <span key={s} style={{
                    fontSize: '0.7rem', background: `${role.color}12`,
                    color: role.color, border: `1px solid ${role.color}25`,
                    borderRadius: 5, padding: '0.15rem 0.5rem',
                  }}>{s}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem' }}>
                <span style={{ color: C.muted }}>💰 {role.salary}</span>
                <span style={{ color: C.muted }}>⏱ {role.timeToJob}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Section 3: Best Paths for Beginners ── */}
      <Section title="03 — Best Paths for Beginners (With Honest Reasoning)" color="#8B5CF6" C={C}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,340px), 1fr))', gap: '1.25rem' }}>
          {[
            {
              rank: '🥇 #1', title: 'Full Stack Web Dev', color: '#9B6ED4',
              why: 'Highest job volume. Startups + MNCs both hire. One path covers frontend + backend. Best ROI for time invested.',
              realistic: 'Takes longer (12–14 months) but gives you the most options.',
            },
            {
              rank: '🥈 #2', title: 'Frontend Developer', color: '#60A5FA',
              why: 'Fastest way to get visible results. You can show people what you built. React skills are very high demand.',
              realistic: 'Product companies want strong React + JavaScript fundamentals.',
            },
            {
              rank: '🥉 #3', title: 'Data Analyst', color: '#F59E0B',
              why: 'Lower coding barrier. Great for non-CS background. Excel + SQL + Python basics is enough to start.',
              realistic: 'Not glamorous but very stable. Every business needs data people.',
            },
            {
              rank: '4️⃣ #4', title: 'Backend (Java)', color: '#4ADE80',
              why: 'Best for corporate / banking / government tech jobs. Java Spring Boot is the most stable tech stack in India.',
              realistic: 'Takes more time to learn. But once you get in, growth is very solid.',
            },
          ].map((p, i) => (
            <div key={i} style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 12, padding: '1.25rem',
            }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: p.color, fontWeight: 700, fontFamily: "'Share Tech Mono', monospace" }}>{p.rank}</span>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: C.text, marginTop: '0.25rem' }}>{p.title}</div>
              </div>
              <p style={{ fontSize: '0.875rem', color: C.sub, lineHeight: 1.7, margin: '0 0 0.75rem' }}>
                <strong style={{ color: C.text }}>Why this:</strong> {p.why}
              </p>
              <p style={{ fontSize: '0.825rem', color: C.muted, lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                💡 {p.realistic}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Section 4: Language by Goal ── */}
      <Section title="04 — Which Language to Choose Based on Your Goal" color="#F59E0B" C={C}>
        <p style={{ color: C.sub, fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          Stop asking "which language is best?" Start asking "best for what?" Here's the honest answer by goal:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,320px), 1fr))', gap: '1rem' }}>
          {LANGUAGES.map((l, i) => (
            <div key={i} style={{
              background: l.bg, border: `1px solid ${l.color}25`,
              borderLeft: `3px solid ${l.color}`, borderRadius: 12,
              padding: '1.25rem',
            }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: l.color, marginBottom: '0.875rem' }}>{l.goal}</div>
              {l.picks.map((p, j) => (
                <div key={j} style={{ marginBottom: j < l.picks.length - 1 ? '0.875rem' : 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: C.text, marginBottom: '0.25rem' }}>{p.lang}</div>
                  <div style={{ fontSize: '0.82rem', color: C.sub, lineHeight: 1.6 }}>{p.reason}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{
          marginTop: '1.5rem', padding: '1rem 1.25rem',
          background: 'rgba(155,110,212,0.07)', border: '1px solid rgba(155,110,212,0.2)',
          borderRadius: 10,
        }}>
          <p style={{ color: C.sub, fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: '#9B6ED4' }}>Bottom line:</strong> If you are confused, start with <strong style={{ color: C.text }}>Python or JavaScript</strong>. Both are beginner-friendly, both have massive job markets. Python is better for data + backend. JavaScript is better for web development.
          </p>
        </div>
      </Section>

      {/* ── Section 5: Roadmap ── */}
      <Section title="05 — Step-by-Step Roadmap: Full Stack Developer" color="#9B6ED4" C={C}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
          marginBottom: '1.5rem', padding: '0.875rem 1.25rem',
          background: 'rgba(155,110,212,0.08)', border: '1px solid rgba(155,110,212,0.2)',
          borderRadius: 10,
        }}>
          <span style={{ fontSize: '1.5rem' }}>🗺️</span>
          <div>
            <div style={{ fontWeight: 700, color: C.text }}>{ROADMAP.subtitle}</div>
            <div style={{ fontSize: '0.8rem', color: C.muted }}>⏱ {ROADMAP.duration}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {ROADMAP.steps.map((step, i) => (
            <div key={i} style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 12, overflow: 'hidden',
            }}>
              <button
                onClick={() => setOpenStep(openStep === i ? -1 : i)}
                style={{
                  width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1rem 1.25rem', textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: openStep === i ? '#9B6ED4' : 'rgba(155,110,212,0.15)',
                    border: '1.5px solid rgba(155,110,212,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Orbitron', sans-serif", fontSize: '0.55rem',
                    fontWeight: 700, color: openStep === i ? '#fff' : '#9B6ED4',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#9B6ED4', letterSpacing: '0.1em', marginBottom: '0.15rem' }}>{step.phase}</div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: C.text }}>{step.title}</div>
                  </div>
                </div>
                {openStep === i ? <ChevronUp size={16} color="#9B6ED4" /> : <ChevronDown size={16} color={C.muted} />}
              </button>
              {openStep === i && (
                <div style={{ padding: '0 1.25rem 1.25rem', borderTop: `1px solid ${C.border}` }}>
                  <div style={{ paddingTop: '1rem' }}>
                    {step.items.map((item, j) => (
                      <div key={j} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <CheckCircle size={14} color="#9B6ED4" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                        <span style={{ fontSize: '0.875rem', color: C.sub, lineHeight: 1.6 }}>{item}</span>
                      </div>
                    ))}
                    <div style={{
                      marginTop: '1rem', padding: '0.75rem 1rem',
                      background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
                      borderRadius: 8,
                    }}>
                      <span style={{ fontSize: '0.75rem', color: '#F59E0B', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.08em' }}>⚡ MENTOR TIP: </span>
                      <span style={{ fontSize: '0.825rem', color: C.sub }}>{step.tip}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ── Section 6: What Companies Expect ── */}
      <Section title="06 — What Companies Actually Expect from Freshers" color="#4ADE80" C={C}>
        <p style={{ color: C.sub, fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          I've sat on both sides of the interview table. Here's what actually matters when hiring freshers:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,300px), 1fr))', gap: '1rem' }}>
          {[
            { icon: '🧠', title: 'Strong Fundamentals', desc: 'If you say you know Java, you should know OOP, data types, loops, exceptions. Not just "I watched a tutorial".' },
            { icon: '🔬', title: 'Can You Explain Your Project?', desc: 'Every line. Why you chose this approach, what problems you faced, how you solved them. This separates real work from copy-paste.' },
            { icon: '🗣️', title: 'Communication Skills', desc: 'Technical knowledge + inability to explain = won\'t get hired. Practice explaining things simply.' },
            { icon: '📝', title: 'Problem Solving Basics', desc: 'You don\'t need to crack FAANG-level DSA. But you should solve basic array, string, and logic problems.' },
            { icon: '🤝', title: 'Willingness to Learn', desc: 'This is huge. Every good manager wants someone who asks good questions and is hungry to improve.' },
            { icon: '🛠️', title: 'Real, Live Projects', desc: 'A project deployed online and working beats 10 half-finished local projects. Quality over quantity.' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: '0.875rem', alignItems: 'flex-start',
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 12, padding: '1.125rem',
            }}>
              <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: C.text, marginBottom: '0.3rem' }}>{item.title}</div>
                <p style={{ fontSize: '0.825rem', color: C.sub, lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Section 7: Common Mistakes ── */}
      <Section title="07 — Common Mistakes Beginners Make" color="#EF4444" C={C}>
        <p style={{ color: C.sub, fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          I've seen hundreds of freshers make these same mistakes. Learn from others — don't make them yourself:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {MISTAKES.map((m, i) => (
            <div key={i} style={{
              display: 'flex', gap: '1rem', alignItems: 'flex-start',
              background: C.card, border: `1px solid rgba(239,68,68,0.15)`,
              borderLeft: '3px solid rgba(239,68,68,0.5)',
              borderRadius: 10, padding: '1rem 1.25rem',
            }}>
              <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{m.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#EF4444', marginBottom: '0.3rem' }}>
                  Mistake: {m.mistake}
                </div>
                <div style={{ fontSize: '0.85rem', color: C.sub, lineHeight: 1.65 }}>
                  <strong style={{ color: '#4ADE80' }}>Reality:</strong> {m.reality}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Section 8: Final Advice ── */}
      <Section title="08 — Honest Final Advice from Your Mentor" color="#9B6ED4" C={C}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { text: 'Pick ONE path and go deep. Not wide. Depth beats breadth every time in interviews.' },
            { text: 'Build one complete project you are genuinely proud of. Make it live. Add it to your resume.' },
            { text: 'Learn in public — GitHub commits, LinkedIn posts, sharing progress. Visibility matters.' },
            { text: 'Stop comparing your month 2 to someone else\'s month 18. Everyone\'s timeline is different.' },
            { text: 'Apply even when you feel "not ready". Most rejections teach you more than tutorials.' },
            { text: 'Your degree does not determine your salary. Your skills and projects do.' },
          ].map((advice, i) => (
            <div key={i} style={{
              display: 'flex', gap: '0.875rem', alignItems: 'flex-start',
              padding: '0.875rem 1.125rem',
              background: light ? 'rgba(155,110,212,0.05)' : 'rgba(155,110,212,0.07)',
              border: `1px solid rgba(155,110,212,0.15)`,
              borderRadius: 10,
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(155,110,212,0.2)', border: '1px solid rgba(155,110,212,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Orbitron', sans-serif", fontSize: '0.55rem', fontWeight: 700, color: '#9B6ED4',
              }}>
                {i + 1}
              </div>
              <span style={{ fontSize: '0.9rem', color: C.sub, lineHeight: 1.7 }}>{advice.text}</span>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div style={{
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(155,110,212,0.12), rgba(96,165,250,0.08))',
          border: '1px solid rgba(155,110,212,0.25)',
          borderRadius: 16, padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>⚔️</div>
          <h3 style={{
            fontFamily: "'Orbitron', sans-serif", fontWeight: 700,
            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', letterSpacing: '0.05em',
            color: C.text, margin: '0 0 0.875rem',
          }}>
            My Final Recommendation
          </h3>
          <p style={{ color: C.sub, fontSize: '1rem', lineHeight: 1.8, maxWidth: 540, margin: '0 auto 1.75rem' }}>
            If you are a complete beginner — start with <strong style={{ color: '#9B6ED4' }}>Full Stack Web Development</strong>. Learn HTML → CSS → JavaScript → React → Node.js → MongoDB. Follow the roadmap above. Build real projects. That's your fastest path to a job.
          </p>
          <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/skill-arena/dashboard')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: 'linear-gradient(135deg, #7C3AED, #9B6ED4)',
                border: 'none', borderRadius: 8, padding: '0.75rem 1.75rem',
                color: '#fff', fontWeight: 700, fontSize: '0.9375rem', cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(155,110,212,0.35)',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(155,110,212,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(155,110,212,0.35)' }}
            >
              ⚔ Start Learning Now
            </button>
            <button
              onClick={() => navigate('/fresher-instructions')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: 'none', border: `1px solid rgba(155,110,212,0.35)`,
                borderRadius: 8, padding: '0.75rem 1.5rem',
                color: '#9B6ED4', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(155,110,212,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              ← Back to Fresher Guide
            </button>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <div style={{
        textAlign: 'center', padding: '2rem 1.5rem',
        fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem',
        letterSpacing: '0.1em', color: C.muted,
        borderTop: `1px solid ${C.border}`,
      }}>
        ◈ ARISE — LEARN THE SKILLS. EARN THE JOB. ◈
      </div>
      <ReportButton variant="floating" pageTitle="Career Guidance" />
    </div>
  )
}

// ── Section Wrapper ─────────────────────────────────────────────────────────
function Section({ title, color, C, children }) {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.25rem 3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.75rem' }}>
        <div style={{ width: 4, height: 32, borderRadius: 2, background: color, flexShrink: 0 }} />
        <h2 style={{
          fontFamily: "'Orbitron', sans-serif", fontWeight: 700,
          fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)', letterSpacing: '0.04em',
          color: C.text, margin: 0,
        }}>{title}</h2>
      </div>
      {children}
    </div>
  )
}
