import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { Sun, Moon, ArrowLeft, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react'
import '../styles/pages-animations.css'

// ─── Data ────────────────────────────────────────────────────────────────────

const ROLES = [
  {
    emoji: '🎨', title: 'Frontend Developer',
    demand: 'Very High', color: '#60A5FA',
    desc: 'You build what users see and experience — layouts, animations, interactions. If seeing your work come alive in a browser excites you, this path will keep you motivated.',
    passion: 'Good fit if you enjoy visual design, care about how things look and feel, and like immediate visual feedback when you write code.',
    aiImpact: 'AI generates UI code fast — but design judgment, UX thinking, and knowing why something feels right is human. Your value moves toward product sense, not just code.',
    future: 'Growing. Design-engineering hybrid roles are emerging. React skills stay in demand for years.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React or Vue'],
    salary: '₹3.5L – ₹8L (fresher)',
    timeToJob: '6–9 months',
  },
  {
    emoji: '⚙️', title: 'Backend Developer',
    demand: 'Very High', color: '#4ADE80',
    desc: 'You build the invisible engine — APIs, databases, authentication, business logic. If you enjoy solving puzzles and thinking about how systems work, this is your space.',
    passion: 'Good fit if you like logic over visuals, enjoy thinking about performance and data flow, and do not need instant visual results to feel satisfied.',
    aiImpact: 'AI writes boilerplate REST APIs quickly — but system design, performance under load, security architecture, and debugging complex failures need human thinking.',
    future: 'Very stable. Every product company needs strong backend. Java and Python backend roles are a long-term career.',
    skills: ['Java or Python or Node.js', 'SQL', 'REST APIs', 'Spring Boot or Django'],
    salary: '₹4L – ₹10L (fresher)',
    timeToJob: '8–12 months',
  },
  {
    emoji: '🔗', title: 'Full Stack Developer',
    demand: 'Highest', color: '#9B6ED4',
    desc: 'You own the full product — frontend, backend, database, deployment. Startups love this because one person can ship a complete feature without waiting on others.',
    passion: 'Good fit if you want to build complete products and like variety in your work. Be honest — this takes more time to learn. Do not choose it just because demand is high.',
    aiImpact: 'AI helps across the stack, but integration thinking — understanding how frontend, backend, and DB talk to each other — is where full stack developers show their value.',
    future: 'Highest fresher demand for the next 5+ years. Startups, GCCs, and product companies all want this.',
    skills: ['HTML/CSS/JS', 'React', 'Node.js or Java', 'MongoDB or SQL'],
    salary: '₹4L – ₹12L (fresher)',
    timeToJob: '10–14 months',
  },
  {
    emoji: '🤖', title: 'Data Scientist / ML Engineer',
    demand: 'High (but competitive)', color: '#EF4444',
    desc: 'You build AI models — prediction systems, recommendation engines, classification. This requires strong maths and real curiosity about how machines learn.',
    passion: 'Only choose this if you genuinely enjoy statistics, maths, and reading research. If you are choosing it because "AI is the future" but do not actually enjoy the work — you will struggle and burn out.',
    aiImpact: 'Ironically, the rise of AI has made this role more important AND more competitive. You need to understand models deeply — not just call APIs. The bar keeps rising.',
    future: 'Highest ceiling of all roles. Also the hardest path. Do not start here — build strong Python and maths basics first.',
    skills: ['Python', 'Statistics + Linear Algebra', 'ML libraries', 'Deep Learning basics'],
    salary: '₹5L – ₹15L',
    timeToJob: '12–18 months',
  },
  {
    emoji: '🛡️', title: 'QA / Test Engineer',
    demand: 'Shifting', color: '#34D399',
    desc: 'You find bugs before users do. You think like a user trying to break the product. Good QA engineers are underrated and genuinely save companies from disasters.',
    passion: 'Good fit if you have a detail-oriented mindset and enjoy finding edge cases. But be honest: manual testing alone is shrinking. You must learn automation to stay relevant.',
    aiImpact: 'AI is automating manual test case generation. If your only skill is manual testing, this role will shrink for you. Learn Selenium, Playwright, or Cypress — automation QA is still in demand.',
    future: 'Manual QA is declining. Automation QA is stable. If you enter this path, commit to automation skills from day one.',
    skills: ['Selenium or Playwright or Cypress', 'JIRA', 'API Testing (Postman)', 'Basic Java or Python'],
    salary: '₹2.5L – ₹6L (fresher)',
    timeToJob: '4–7 months',
  },
  {
    emoji: '☁️', title: 'DevOps / Cloud Engineer',
    demand: 'Growing Fast', color: '#A78BFA',
    desc: 'You make sure software actually runs in production — deployments, infrastructure, monitoring, scaling. More infrastructure than development, but very impactful work.',
    passion: 'Good fit if you enjoy working with systems, enjoy automation of repetitive tasks, and like the idea of keeping critical applications running at scale.',
    aiImpact: 'AI helps write deployment configs and scripts — but infrastructure decisions, security configurations, and knowing what to do when production breaks at 2am cannot be automated.',
    future: 'Fastest growing among all paths. Least competition from freshers (most skip this). Cloud certifications (AWS, Azure) open doors quickly.',
    skills: ['Linux basics', 'AWS or Azure basics', 'Docker', 'CI/CD with GitHub Actions'],
    salary: '₹4L – ₹10L',
    timeToJob: '10–14 months',
  },
  {
    emoji: '📊', title: 'Data Analyst',
    demand: 'High', color: '#F59E0B',
    desc: 'You turn raw numbers into decisions. You pull data, find patterns, build dashboards, and tell a story with numbers. Less coding than development, more business thinking.',
    passion: 'Good fit if you enjoy working with data, asking "why is this number different?", and communicating findings to non-technical people. SQL and Excel should feel satisfying, not painful.',
    aiImpact: 'AI can generate SQL and charts — but understanding the business question behind the data, knowing what to look for, and presenting insights that people trust requires human judgment.',
    future: 'Growing fast. Every company now makes decisions with data. Entry bar is lower than development. Strong communication skills matter as much as technical skills here.',
    skills: ['SQL', 'Excel or Google Sheets', 'Python basics (Pandas)', 'Power BI or Tableau'],
    salary: '₹3L – ₹7L (fresher)',
    timeToJob: '5–8 months',
  },
  {
    emoji: '🤖', title: 'AI / ML Engineer',
    demand: 'Very High', color: '#00D9FF',
    desc: 'You build AI-powered systems — recommendation engines, prediction models, NLP pipelines, and AI integrations. One of the most in-demand and highest-paying roles entering 2025.',
    passion: 'Good fit if you genuinely enjoy maths, statistics, and understanding how models work — not just using them. If you want to use AI tools without understanding them, this is not the right path.',
    aiImpact: 'Ironically, AI tools are making this role more important — and more competitive. The bar keeps rising. You need to understand models deeply, not just call APIs.',
    future: 'Highest ceiling of all roles. Also the hardest path. Python + maths + LangChain + cloud = strong foundation. Do not start here — build Python and data fundamentals first.',
    skills: ['Python (strong)', 'Statistics + Linear Algebra basics', 'ML libraries (scikit-learn, PyTorch)', 'LangChain or Hugging Face'],
    salary: '₹6L – ₹18L',
    timeToJob: '14–20 months',
  },
  {
    emoji: '⚗️', title: 'Prompt Engineer / AI Product',
    demand: 'Emerging', color: '#8B5CF6',
    desc: 'You design, optimize, and systematize AI prompts and workflows for products. The role that barely existed 2 years ago and is now on job boards everywhere.',
    passion: 'Good fit if you enjoy experimenting, writing clearly, thinking about user experience, and you are fascinated by what AI can and cannot do. No deep coding required to start.',
    aiImpact: 'This role exists because of AI — but also depends on understanding its limitations deeply. You need to know when AI fails and design systems that handle those failures gracefully.',
    future: 'Genuinely new role. Companies building AI products need specialists who understand both the product and the AI. Good bridge role for students who are strong communicators with AI curiosity.',
    skills: ['Prompt engineering', 'LangChain basics', 'API usage (OpenAI, Anthropic)', 'Product thinking'],
    salary: '₹4L – ₹12L',
    timeToJob: '6–10 months',
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
  steps: [
    {
      phase: 'Stage 1', title: 'Build the Foundation',
      items: [
        'HTML — structure of web pages (2 weeks)',
        'CSS — styling, Flexbox, Grid, responsive design (3 weeks)',
        'Build 3 real pages: Profile, Landing Page, Portfolio',
        'Do NOT start JavaScript yet — master HTML/CSS first',
      ],
      tip: 'Most students rush to JavaScript without mastering HTML/CSS. This is where they struggle later.',
    },
    {
      phase: 'Stage 2', title: 'Learn JavaScript Properly',
      items: [
        'JavaScript fundamentals: variables, loops, functions, arrays, objects',
        'DOM manipulation — make pages interactive',
        'Fetch API — connect to real APIs',
        'Build: To-Do App, Weather App, Quiz App',
      ],
      tip: 'Understand JavaScript deeply — not just syntax. Ask "why" not just "how".',
    },
    {
      phase: 'Stage 3', title: 'React — Modern Frontend',
      items: [
        'React basics: components, props, state, hooks',
        'React Router — multiple pages in one app',
        'State management basics',
        'Build a complete frontend project (e-commerce or dashboard)',
      ],
      tip: 'React is the #1 frontend skill companies look for. Learn it properly.',
    },
    {
      phase: 'Stage 4', title: 'Backend with Node.js',
      items: [
        'Node.js + Express — build APIs',
        'MongoDB or MySQL — store data',
        'Authentication: JWT, sessions',
        'Build: REST API for your frontend project',
      ],
      tip: 'Now your projects are real — they have a database, login, and real data.',
    },
    {
      phase: 'Stage 5', title: 'Job Prep',
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
    mistake: 'Choosing a path because of salary, not interest',
    reality: 'You might get the job. But you will struggle to grow in work you do not enjoy. The people who become really good at something are the ones who find it genuinely interesting. Passion is not a luxury — it is the energy that keeps you going when learning gets hard.',
    icon: '💔',
  },
  {
    mistake: 'Following what your friend or batch is doing',
    reality: 'Your friend choosing Data Science does not mean Data Science is right for you. Research for yourself — open LinkedIn, search job postings in your city, see what companies are actually asking for. Make a decision based on your interests and real market data, not peer pressure.',
    icon: '🐑',
  },
  {
    mistake: 'Learning too many technologies at once',
    reality: 'Pick one path and go 6 months deep before touching anything else. Someone who knows React well will always beat someone who "knows" React, Angular, Vue, and Svelte at surface level.',
    icon: '❌',
  },
  {
    mistake: 'Tutorial hell — watching, never building',
    reality: 'Watching a tutorial feels productive. It is not. After every tutorial, close the video and rebuild it from memory. That struggle is where real learning happens. No struggle = no learning.',
    icon: '📺',
  },
  {
    mistake: 'Copying projects without understanding',
    reality: 'In interviews, they will ask "explain this line." If you copied it, you go silent. That ends interviews immediately. Every line on your resume must be something you can own.',
    icon: '📋',
  },
  {
    mistake: 'Ignoring AI tools entirely OR depending on them completely',
    reality: 'Both extremes are wrong. Not using AI tools means you work slower than peers who do. Depending on AI without understanding means you cannot explain your own work. Use AI as a co-pilot, not as a replacement for your brain.',
    icon: '🤖',
  },
  {
    mistake: 'Waiting until placement season to start',
    reality: 'Preparation that starts 2 months before campus placement is panic, not preparation. Real skills take 6–12 months of consistent building. Start now, even if placement is a year away.',
    icon: '⏳',
  },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function CareerGuidancePage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const light = theme === 'light'
  const [openStep, setOpenStep] = useState(0)
  const [activeTab, setActiveTab] = useState('roles')

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.pg-reveal, .pg-reveal-left, .pg-reveal-right')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('pg-visible'); io.unobserve(e.target) } }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

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
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, fontFamily: "'Rajdhani', sans-serif", position: 'relative' }}>

      {/* Background glow orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-5%', left: '40%', width: 600, height: 450, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(155,110,212,0.08) 0%, transparent 65%)', filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', bottom: '30%', left: '-5%', width: 400, height: 350, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 65%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', top: '60%', right: '-5%', width: 450, height: 350, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(236,72,153,0.04) 0%, transparent 65%)', filter: 'blur(40px)' }} />
      </div>

      {/* ── Nav ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 51,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.5rem', height: 54,
        background: 'var(--cg-nav-bg)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <button onClick={() => navigate(-1)} style={{
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
        position: 'relative', zIndex: 1,
        textAlign: 'center',
        padding: 'clamp(2.5rem, 6vw, 5rem) 1.5rem clamp(2rem, 4vw, 3rem)',
        background: 'linear-gradient(180deg, rgba(155,110,212,0.07) 0%, transparent 100%)',
      }}>
        <div className="pg-hero-1" style={{
          display: 'inline-block', fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.65rem', letterSpacing: '0.18em',
          color: C.accent, background: 'rgba(155,110,212,0.1)',
          border: '1px solid rgba(155,110,212,0.25)', borderRadius: 20,
          padding: '0.3rem 1rem', marginBottom: '1.25rem',
        }}>
          ◈ YOUR PATH — YOUR CHOICE — YOUR FUTURE
        </div>

        <h1 className="cg-hero-title pg-hero-2" style={{
          fontFamily: "'Orbitron', sans-serif", fontWeight: 900,
          fontSize: 'clamp(1.75rem, 5vw, 3rem)', letterSpacing: '0.05em',
          lineHeight: 1.15, margin: '0 0 1.25rem',
        }}>
          Find Your Path.<br />Own Your Direction.
        </h1>

        <p className="pg-hero-3" style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: C.sub,
          maxWidth: 600, margin: '0 auto 0',
          lineHeight: 1.75,
        }}>
          The biggest confusion for freshers is not the lack of options — it is too many options with no clarity.
          This guide helps you figure out what actually fits you, what the future of each role looks like,
          and how to research what companies in your city are actually hiring for right now.
        </p>
      </div>

      {/* ── Honest Intro ── */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: '0 1.25rem 2.5rem' }}>
        <div style={{
          background: C.card, border: `1px solid rgba(155,110,212,0.25)`,
          borderLeft: '4px solid #9B6ED4', borderRadius: 12,
          padding: '1.5rem 1.75rem',
          boxShadow: light ? '0 4px 20px rgba(155,110,212,0.08)' : '0 4px 20px rgba(0,0,0,0.3)',
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#9B6ED4', marginBottom: '0.875rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.08em' }}>
            BEFORE YOU PICK A ROLE — READ THIS
          </div>
          <p style={{ color: C.sub, fontSize: '0.95rem', lineHeight: 1.8, margin: '0 0 0.75rem' }}>
            Every year, freshers pick a tech stack for the wrong reasons — because a YouTube video made it look cool, because a friend is doing it, because someone said it pays well. They spend 12 months learning something, get a job, and hate the work within 6 months.
          </p>
          <p style={{ color: C.sub, fontSize: '0.95rem', lineHeight: 1.8, margin: 0 }}>
            The right path is the one that matches what you genuinely find interesting. Before reading further — ask yourself one honest question: <strong style={{ color: C.text }}>What kind of work could I do for 8 hours and not feel drained?</strong> That answer matters more than any salary figure on this page.
          </p>
        </div>
      </div>

      {/* ── Section 1: Choose Role First ── */}
      <Section title="01 — Start With What Interests You, Not What Pays More" color="#EF4444" C={C}>
        <p style={{ color: C.sub, fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
          The most common advice students get is wrong — "pick the highest paying role." That leads to choosing a path you do not enjoy, grinding through it, and burning out before you even reach a good salary.
        </p>
        <p style={{ color: C.sub, fontSize: '1rem', lineHeight: 1.8, marginBottom: '1rem' }}>
          Here is the truth: <strong style={{ color: C.text }}>people who enjoy their work get better faster. People who get better faster get paid more.</strong> Passion is not just a nice feeling — it is a career advantage.
        </p>
        <p style={{ color: C.sub, fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          Answer these honestly. Do not answer what you think you should say — answer what is actually true for you:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { q: 'When I see a beautiful website, I want to know how they built it', a: '→ Frontend Development' },
            { q: 'I enjoy figuring out why something does not work and fixing it', a: '→ Backend Development' },
            { q: 'I want to build complete products end-to-end on my own', a: '→ Full Stack Development' },
            { q: 'I enjoy working with numbers, spreadsheets, and finding patterns', a: '→ Data Analyst' },
            { q: 'I want to understand how AI models actually work, not just use them', a: '→ Data Science / ML' },
            { q: 'I think like someone trying to break things, not just build them', a: '→ QA / Automation Testing' },
            { q: 'I enjoy systems, servers, and making things run reliably at scale', a: '→ DevOps / Cloud' },
          ].map((item, i) => (
            <div key={i} style={{
              background: light ? 'rgba(155,110,212,0.05)' : 'rgba(155,110,212,0.07)',
              border: `1px solid ${C.border}`, borderRadius: 10,
              padding: '0.875rem 1rem',
            }}>
              <div style={{ fontSize: '0.85rem', color: C.sub, marginBottom: '0.5rem', lineHeight: 1.6 }}>{item.q}</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#9B6ED4' }}>{item.a}</div>
            </div>
          ))}
        </div>
        <div style={{
          padding: '1rem 1.25rem', background: 'rgba(239,68,68,0.06)',
          border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10,
        }}>
          <p style={{ color: C.sub, fontSize: '0.9rem', lineHeight: 1.75, margin: 0 }}>
            <strong style={{ color: '#EF4444' }}>Honest warning:</strong> Do not choose a role only because someone said "that's where AI won't replace you" or "that pays the most right now." Markets change. Technologies change. The one constant is your ability to grow — and you grow fastest in work that interests you.
          </p>
        </div>
      </Section>

      {/* ── Section 2: In-demand Roles ── */}
      <Section title="02 — Every Role Explained Honestly" color="#3B82F6" C={C}>
        <p style={{ color: C.sub, fontSize: '1rem', lineHeight: 1.8, marginBottom: '0.75rem' }}>
          For each role: what the work actually feels like, who it genuinely suits, how AI is changing it, and what the future looks like.
        </p>
        <p style={{ color: C.sub, fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.75rem', fontStyle: 'italic' }}>
          Also do your own research — open LinkedIn, search fresher jobs in your city, look at 10–15 real job postings for each role you are considering. See what skills they actually ask for. That data is more accurate than any guide.
        </p>

        <div className="pg-stagger" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {ROLES.map((role, i) => (
            <div key={i} className="pg-reveal" style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderLeft: `4px solid ${role.color}`,
              borderRadius: 12, padding: '1.375rem',
              boxShadow: light ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
            }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                <span style={{ fontSize: '1.6rem' }}>{role.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: C.text }}>{role.title}</div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '0.62rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.08em', color: role.color, background: `${role.color}15`, border: `1px solid ${role.color}30`, borderRadius: 4, padding: '0.1rem 0.4rem' }}>
                      {role.demand}
                    </span>
                    <span style={{ fontSize: '0.62rem', color: C.muted, fontFamily: "'Share Tech Mono', monospace" }}>
                      💰 {role.salary} · ⏱ {role.timeToJob}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.875rem', color: C.sub, lineHeight: 1.7, margin: '0 0 0.875rem' }}>{role.desc}</p>

              {/* 3 columns */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,200px), 1fr))', gap: '0.75rem', marginBottom: '0.875rem' }}>
                <div style={{ padding: '0.75rem', background: `${role.color}08`, border: `1px solid ${role.color}20`, borderRadius: 8 }}>
                  <div style={{ fontSize: '0.6rem', fontFamily: "'Share Tech Mono', monospace", color: role.color, letterSpacing: '0.1em', marginBottom: '0.375rem' }}>WHO IT FITS</div>
                  <p style={{ fontSize: '0.78rem', color: C.sub, lineHeight: 1.6, margin: 0 }}>{role.passion}</p>
                </div>
                <div style={{ padding: '0.75rem', background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.15)', borderRadius: 8 }}>
                  <div style={{ fontSize: '0.6rem', fontFamily: "'Share Tech Mono', monospace", color: '#06B6D4', letterSpacing: '0.1em', marginBottom: '0.375rem' }}>AI IMPACT</div>
                  <p style={{ fontSize: '0.78rem', color: C.sub, lineHeight: 1.6, margin: 0 }}>{role.aiImpact}</p>
                </div>
                <div style={{ padding: '0.75rem', background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 8 }}>
                  <div style={{ fontSize: '0.6rem', fontFamily: "'Share Tech Mono', monospace", color: '#22C55E', letterSpacing: '0.1em', marginBottom: '0.375rem' }}>FUTURE OUTLOOK</div>
                  <p style={{ fontSize: '0.78rem', color: C.sub, lineHeight: 1.6, margin: 0 }}>{role.future}</p>
                </div>
              </div>

              {/* Skills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {role.skills.map(s => (
                  <span key={s} style={{ fontSize: '0.7rem', background: `${role.color}12`, color: role.color, border: `1px solid ${role.color}25`, borderRadius: 5, padding: '0.15rem 0.5rem' }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Section 3: Best Paths for Beginners ── */}
      <Section title="03 — If You Are Still Unsure, Start Here" color="#8B5CF6" C={C}>
        <p style={{ color: C.sub, fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          If after reading the roles above you are still genuinely unsure, here are the paths that give beginners the most clarity, the most job options, and the best chance of building confidence early. These are not the "best" paths for everyone — they are the best starting points for most.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,340px), 1fr))', gap: '1.25rem' }}>
          {[
            {
              rank: '1', title: 'Full Stack Web Dev', color: '#9B6ED4',
              why: 'Highest job volume across all company types — startups, GCCs, product companies, and service companies. One path covers both frontend and backend, which gives you the most flexibility.',
              honest: 'Takes 12–14 months of consistent work. Do not choose this just because demand is high — choose it because building full products excites you.',
            },
            {
              rank: '2', title: 'Frontend Developer', color: '#60A5FA',
              why: 'Fastest path to building something you can show people. React is the most in-demand frontend skill in India right now. Shorter learning curve than full stack.',
              honest: 'If you love design + code and want visible results quickly, this is genuinely satisfying work.',
            },
            {
              rank: '3', title: 'Data Analyst', color: '#F59E0B',
              why: 'Lower coding barrier than development paths. Great for non-CS backgrounds. Excel + SQL + Python basics is enough to get started. Every company needs people who can read data.',
              honest: 'This path suits people who enjoy business context and communication, not just coding. If numbers and insights excite you more than building features — this is your path.',
            },
            {
              rank: '4', title: 'Backend Developer (Java)', color: '#4ADE80',
              why: 'Java Spring Boot is the most stable enterprise tech stack in India. Banks, insurance companies, MNCs, and government tech projects all run on Java. Slower to learn, but very stable once you are in.',
              honest: 'Choose this if you prefer deep logic over visual results and want a corporate, stable career track.',
            },
          ].map((p, i) => (
            <div key={i} style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 12, padding: '1.25rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.625rem' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${p.color}20`, border: `1.5px solid ${p.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Orbitron', sans-serif", fontSize: '0.6rem', fontWeight: 700, color: p.color, flexShrink: 0 }}>{p.rank}</div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: C.text }}>{p.title}</div>
              </div>
              <p style={{ fontSize: '0.875rem', color: C.sub, lineHeight: 1.7, margin: '0 0 0.75rem' }}>{p.why}</p>
              <div style={{ padding: '0.625rem 0.875rem', background: `${p.color}08`, border: `1px solid ${p.color}20`, borderRadius: 8 }}>
                <p style={{ fontSize: '0.8rem', color: C.muted, lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                  <strong style={{ color: p.color, fontStyle: 'normal' }}>Be honest with yourself:</strong> {p.honest}
                </p>
              </div>
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
                      <span style={{ fontSize: '0.75rem', color: '#F59E0B', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.08em' }}>⚡ REALITY: </span>
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
      <Section title="06 — What Companies Actually Look For in Freshers" color="#4ADE80" C={C}>
        <p style={{ color: C.sub, fontSize: '1rem', lineHeight: 1.8, marginBottom: '1rem' }}>
          This has shifted. The companies hiring right now are not looking for perfect knowledge — they are looking for specific signals that tell them you can learn, build, and communicate.
        </p>
        <p style={{ color: C.sub, fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>
          A tip: before any interview, research that specific company. Check their LinkedIn, their job postings, their tech blog if they have one. Companies tell you exactly what they value — most candidates just do not bother to read it.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,300px), 1fr))', gap: '1rem' }}>
          {[
            { icon: '🧠', title: 'Strong Fundamentals', desc: 'If your resume says Java or Python, you must be able to explain OOP, exceptions, data flow, and write code without AI help in an interview. "I watched tutorials" is not preparation.' },
            { icon: '🔬', title: 'Own Your Projects', desc: 'They will ask "why did you choose this database?", "how does your authentication work?", "what would you do differently?". If you cannot answer, the project works against you, not for you.' },
            { icon: '🗣️', title: 'Clear Communication', desc: 'Explaining what you built simply and confidently is a skill. Practice it. Record yourself. Most freshers know their work but cannot communicate it — and that costs them offers.' },
            { icon: '🤖', title: 'AI Tool Awareness', desc: 'Companies now expect freshers to use Copilot, Claude, or ChatGPT as development tools. Saying "I never use AI" is not impressive. Show you can use it AND understand what it produces.' },
            { icon: '📝', title: 'Basic Problem Solving', desc: 'You do not need FAANG-level DSA for most fresher roles. But you should be able to solve basic array, string, and logic problems without panicking. Consistent practice for 30 minutes daily adds up fast.' },
            { icon: '🛠️', title: 'Deployed, Live Projects', desc: 'A deployed project with a real URL beats 10 local projects every time. Deployment shows you understand how real applications work end-to-end — most freshers skip this and it shows.' },
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
      <Section title="07 — Mistakes That Are Costing Students Their Direction" color="#EF4444" C={C}>
        <p style={{ color: C.sub, fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          These are not small mistakes. They are patterns that keep students stuck for months or years. Read each one honestly and ask yourself if any of them apply to you right now:
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
      <Section title="08 — What You Should Do Right Now" color="#9B6ED4" C={C}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { text: 'Spend 30 minutes on LinkedIn today. Search "fresher developer [your city] 2025". Look at 15 job postings. See what skills, what stacks, what company types are actually hiring near you. That is real data — more useful than any YouTube video.', color: '#9B6ED4' },
            { text: 'Pick a path based on what genuinely interests you — not what someone said pays more. Interest is what keeps you going when the learning gets hard. And it will get hard.', color: '#60A5FA' },
            { text: 'Start building something this week. Not a tutorial. Not watching someone else code. Open a code editor and build even a basic version of an idea. The confusion clears when you start building.', color: '#4ADE80' },
            { text: 'Stop comparing your progress to others. Someone ahead of you started earlier or had more time or practiced more. The only comparison that matters is you today vs you last month.', color: '#F59E0B' },
            { text: 'Use AI tools — Copilot, Claude, ChatGPT — as learning tools. Ask them to explain concepts. Use them to get unstuck. But always understand what you are submitting as your own work.', color: '#06B6D4' },
            { text: 'Apply before you feel ready. You will never feel fully ready. 70% ready with real projects is good enough to start. Interviews show you exactly what to learn next.', color: '#EC4899' },
          ].map((advice, i) => (
            <div key={i} style={{
              display: 'flex', gap: '0.875rem', alignItems: 'flex-start',
              padding: '0.875rem 1.125rem',
              background: light ? 'rgba(155,110,212,0.05)' : 'rgba(155,110,212,0.07)',
              borderLeft: `3px solid ${advice.color}`,
              borderRadius: 10,
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                background: `${advice.color}20`, border: `1px solid ${advice.color}50`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Orbitron', sans-serif", fontSize: '0.55rem', fontWeight: 700, color: advice.color,
              }}>
                {i + 1}
              </div>
              <span style={{ fontSize: '0.9rem', color: C.sub, lineHeight: 1.75 }}>{advice.text}</span>
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
            Your Path Is Waiting — Start It Today
          </h3>
          <p style={{ color: C.sub, fontSize: '1rem', lineHeight: 1.8, maxWidth: 560, margin: '0 auto 1.75rem' }}>
            The gap between where you are and where you want to be is not talent. It is time + consistent work + the right direction. You now have the direction. The time is yours. Start building.
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
              onClick={() => navigate(-1)}
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
    </div>
  )
}

// ── Section Wrapper ─────────────────────────────────────────────────────────
function Section({ title, color, C, children }) {
  return (
    <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '0 1.25rem 3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.75rem', paddingBottom: '1rem', borderBottom: `1px solid ${color}22` }}>
        <div style={{ width: 3, height: 28, borderRadius: 2, background: `linear-gradient(to bottom, ${color}, ${color}66)`, flexShrink: 0 }} />
        <h2 style={{
          fontFamily: "'Orbitron', sans-serif", fontWeight: 700,
          fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)', letterSpacing: '0.04em',
          color: C.text, margin: 0,
        }}>{title}</h2>
      </div>
      {children}
    </div>
  )
}
