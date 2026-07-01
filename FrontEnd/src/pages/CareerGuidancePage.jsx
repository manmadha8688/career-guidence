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

const QUIZ_ITEMS = [
  { q: 'When I see a beautiful website, I want to know how they built it', a: '→ Frontend Development' },
  { q: 'I enjoy figuring out why something does not work and fixing it', a: '→ Backend Development' },
  { q: 'I want to build complete products end-to-end on my own', a: '→ Full Stack Development' },
  { q: 'I enjoy working with numbers, spreadsheets, and finding patterns', a: '→ Data Analyst' },
  { q: 'I want to understand how AI models actually work, not just use them', a: '→ Data Science / ML' },
  { q: 'I think like someone trying to break things, not just build them', a: '→ QA / Automation Testing' },
  { q: 'I enjoy systems, servers, and making things run reliably at scale', a: '→ DevOps / Cloud' },
]

const PATH_PICKS = [
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
]

const EXPECT_ITEMS = [
  { icon: '🧠', title: 'Strong Fundamentals', desc: 'If your resume says Java or Python, you must be able to explain OOP, exceptions, data flow, and write code without AI help in an interview. "I watched tutorials" is not preparation.' },
  { icon: '🔬', title: 'Own Your Projects', desc: 'They will ask "why did you choose this database?", "how does your authentication work?", "what would you do differently?". If you cannot answer, the project works against you, not for you.' },
  { icon: '🗣️', title: 'Clear Communication', desc: 'Explaining what you built simply and confidently is a skill. Practice it. Record yourself. Most freshers know their work but cannot communicate it — and that costs them offers.' },
  { icon: '🤖', title: 'AI Tool Awareness', desc: 'Companies now expect freshers to use Copilot, Claude, or ChatGPT as development tools. Saying "I never use AI" is not impressive. Show you can use it AND understand what it produces.' },
  { icon: '📝', title: 'Basic Problem Solving', desc: 'You do not need FAANG-level DSA for most fresher roles. But you should be able to solve basic array, string, and logic problems without panicking. Consistent practice for 30 minutes daily adds up fast.' },
  { icon: '🛠️', title: 'Deployed, Live Projects', desc: 'A deployed project with a real URL beats 10 local projects every time. Deployment shows you understand how real applications work end-to-end — most freshers skip this and it shows.' },
]

const ADVICE_ITEMS = [
  { text: 'Spend 30 minutes on LinkedIn today. Search "fresher developer [your city] 2025". Look at 15 job postings. See what skills, what stacks, what company types are actually hiring near you. That is real data — more useful than any YouTube video.', color: '#9B6ED4' },
  { text: 'Pick a path based on what genuinely interests you — not what someone said pays more. Interest is what keeps you going when the learning gets hard. And it will get hard.', color: '#60A5FA' },
  { text: 'Start building something this week. Not a tutorial. Not watching someone else code. Open a code editor and build even a basic version of an idea. The confusion clears when you start building.', color: '#4ADE80' },
  { text: 'Stop comparing your progress to others. Someone ahead of you started earlier or had more time or practiced more. The only comparison that matters is you today vs you last month.', color: '#F59E0B' },
  { text: 'Use AI tools — Copilot, Claude, ChatGPT — as learning tools. Ask them to explain concepts. Use them to get unstuck. But always understand what you are submitting as your own work.', color: '#06B6D4' },
  { text: 'Apply before you feel ready. You will never feel fully ready. 70% ready with real projects is good enough to start. Interviews show you exactly what to learn next.', color: '#EC4899' },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function CareerGuidancePage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const light = theme === 'light'
  const [openStep, setOpenStep] = useState(0)

  useEffect(() => {
    const els = document.querySelectorAll('.pg-reveal, .pg-reveal-left, .pg-reveal-right')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('pg-visible'); io.unobserve(e.target) } }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="cg-page">

      <div className="cg-bg-orbs">
        <div className="cg-bg-orb cg-bg-orb--1" />
        <div className="cg-bg-orb cg-bg-orb--2" />
        <div className="cg-bg-orb cg-bg-orb--3" />
      </div>

      <nav className="cg-nav">
        <button type="button" onClick={() => navigate(-1)} className="cg-nav__back">
          <ArrowLeft size={14} /> FRESHER GUIDE
        </button>
        <span className="cg-nav__title">CAREER GUIDANCE</span>
        <button type="button" onClick={toggleTheme} className="cg-nav__theme">
          {light ? <Moon size={13} /> : <Sun size={13} />}
        </button>
      </nav>

      <header className="cg-hero">
        <div className="cg-hero__badge pg-hero-1">◈ YOUR PATH — YOUR CHOICE — YOUR FUTURE</div>
        <h1 className="cg-hero-title pg-hero-2">Find Your Path.<br />Own Your Direction.</h1>
        <p className="cg-hero__subtitle pg-hero-3">
          The biggest confusion for freshers is not the lack of options — it is too many options with no clarity.
          This guide helps you figure out what actually fits you, what the future of each role looks like,
          and how to research what companies in your city are actually hiring for right now.
        </p>
      </header>

      <div className="cg-intro-wrap">
        <div className="cg-intro">
          <div className="cg-intro__label">BEFORE YOU PICK A ROLE — READ THIS</div>
          <p className="cg-text cg-text--flush" style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>
            Every year, freshers pick a tech stack for the wrong reasons — because a YouTube video made it look cool, because a friend is doing it, because someone said it pays well. They spend 12 months learning something, get a job, and hate the work within 6 months.
          </p>
          <p className="cg-text cg-text--flush" style={{ fontSize: '0.95rem' }}>
            The right path is the one that matches what you genuinely find interesting. Before reading further — ask yourself one honest question: <strong className="cg-strong">What kind of work could I do for 8 hours and not feel drained?</strong> That answer matters more than any salary figure on this page.
          </p>
        </div>
      </div>

      <Section title="01 — Start With What Interests You, Not What Pays More" color="#EF4444">
        <p className="cg-text">
          The most common advice students get is wrong — "pick the highest paying role." That leads to choosing a path you do not enjoy, grinding through it, and burning out before you even reach a good salary.
        </p>
        <p className="cg-text">
          Here is the truth: <strong className="cg-strong">people who enjoy their work get better faster. People who get better faster get paid more.</strong> Passion is not just a nice feeling — it is a career advantage.
        </p>
        <p className="cg-text" style={{ marginBottom: '1.5rem' }}>
          Answer these honestly. Do not answer what you think you should say — answer what is actually true for you:
        </p>
        <div className="cg-quiz-grid">
          {QUIZ_ITEMS.map((item, i) => (
            <div key={i} className="cg-quiz-card">
              <div className="cg-quiz-card__q">{item.q}</div>
              <div className="cg-quiz-card__a">{item.a}</div>
            </div>
          ))}
        </div>
        <div className="cg-warning">
          <p>
            <strong>Honest warning:</strong> Do not choose a role only because someone said "that's where AI won't replace you" or "that pays the most right now." Markets change. Technologies change. The one constant is your ability to grow — and you grow fastest in work that interests you.
          </p>
        </div>
      </Section>

      <Section title="02 — Every Role Explained Honestly" color="#3B82F6">
        <p className="cg-text">For each role: what the work actually feels like, who it genuinely suits, how AI is changing it, and what the future looks like.</p>
        <p className="cg-text cg-text--sm">
          Also do your own research — open LinkedIn, search fresher jobs in your city, look at 10–15 real job postings for each role you are considering. See what skills they actually ask for. That data is more accurate than any guide.
        </p>
        <div className="cg-role-list pg-stagger">
          {ROLES.map((role, i) => (
            <div key={i} className="cg-role-card pg-reveal" style={{ '--role-color': role.color }}>
              <div className="cg-role-card__head">
                <span className="cg-role-card__emoji">{role.emoji}</span>
                <div className="cg-role-card__meta">
                  <div className="cg-role-card__title">{role.title}</div>
                  <div className="cg-role-card__badges">
                    <span className="cg-role-card__demand">{role.demand}</span>
                    <span className="cg-role-card__salary">💰 {role.salary} · ⏱ {role.timeToJob}</span>
                  </div>
                </div>
              </div>
              <p className="cg-role-card__desc">{role.desc}</p>
              <div className="cg-role-card__cols">
                <div className="cg-role-card__col cg-role-card__col--fit">
                  <div className="cg-role-card__col-label">WHO IT FITS</div>
                  <p>{role.passion}</p>
                </div>
                <div className="cg-role-card__col cg-role-card__col--ai">
                  <div className="cg-role-card__col-label">AI IMPACT</div>
                  <p>{role.aiImpact}</p>
                </div>
                <div className="cg-role-card__col cg-role-card__col--future">
                  <div className="cg-role-card__col-label">FUTURE OUTLOOK</div>
                  <p>{role.future}</p>
                </div>
              </div>
              <div className="cg-role-card__skills">
                {role.skills.map(s => (
                  <span key={s} className="cg-role-card__skill">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="03 — If You Are Still Unsure, Start Here" color="#8B5CF6">
        <p className="cg-text" style={{ marginBottom: '1.5rem' }}>
          If after reading the roles above you are still genuinely unsure, here are the paths that give beginners the most clarity, the most job options, and the best chance of building confidence early. These are not the "best" paths for everyone — they are the best starting points for most.
        </p>
        <div className="cg-path-grid">
          {PATH_PICKS.map((p, i) => (
            <div key={i} className="cg-path-card" style={{ '--item-color': p.color }}>
              <div className="cg-path-card__head">
                <div className="cg-path-card__rank">{p.rank}</div>
                <div className="cg-path-card__title">{p.title}</div>
              </div>
              <p className="cg-path-card__why">{p.why}</p>
              <div className="cg-path-card__honest">
                <p><strong>Be honest with yourself:</strong> {p.honest}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="04 — Which Language to Choose Based on Your Goal" color="#F59E0B">
        <p className="cg-text" style={{ marginBottom: '1.5rem' }}>
          Stop asking "which language is best?" Start asking "best for what?" Here's the honest answer by goal:
        </p>
        <div className="cg-lang-grid">
          {LANGUAGES.map((l, i) => (
            <div key={i} className="cg-lang-card" style={{ '--lang-color': l.color, '--lang-bg': l.bg }}>
              <div className="cg-lang-card__goal">{l.goal}</div>
              {l.picks.map((p, j) => (
                <div key={j} className="cg-lang-card__pick">
                  <div className="cg-lang-card__lang">{p.lang}</div>
                  <div className="cg-lang-card__reason">{p.reason}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="cg-note">
          <p>
            <strong className="accent">Bottom line:</strong> If you are confused, start with <strong className="cg-strong">Python or JavaScript</strong>. Both are beginner-friendly, both have massive job markets. Python is better for data + backend. JavaScript is better for web development.
          </p>
        </div>
      </Section>

      <Section title="05 — Step-by-Step Roadmap: Full Stack Developer" color="#9B6ED4">
        <div className="cg-roadmap-banner">
          <span className="cg-roadmap-banner__emoji">🗺️</span>
          <div className="cg-roadmap-banner__text">{ROADMAP.subtitle}</div>
        </div>
        <div className="cg-steps">
          {ROADMAP.steps.map((step, i) => (
            <div key={i} className={`cg-step${openStep === i ? ' cg-step--open' : ''}`}>
              <button type="button" onClick={() => setOpenStep(openStep === i ? -1 : i)} className="cg-step__toggle">
                <div className="cg-step__toggle-left">
                  <div className="cg-step__num">{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <div className="cg-step__phase">{step.phase}</div>
                    <div className="cg-step__title">{step.title}</div>
                  </div>
                </div>
                {openStep === i ? <ChevronUp size={16} color="#9B6ED4" /> : <ChevronDown size={16} color="var(--cg-muted)" />}
              </button>
              {openStep === i && (
                <div className="cg-step__body">
                  <div className="cg-step__items">
                    {step.items.map((item, j) => (
                      <div key={j} className="cg-step__item">
                        <CheckCircle size={14} color="#9B6ED4" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                        <span className="cg-step__item-text">{item}</span>
                      </div>
                    ))}
                    <div className="cg-step__tip">
                      <span className="cg-step__tip-label">⚡ REALITY: </span>
                      <span className="cg-step__tip-text">{step.tip}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title="06 — What Companies Actually Look For in Freshers" color="#4ADE80">
        <p className="cg-text">
          This has shifted. The companies hiring right now are not looking for perfect knowledge — they are looking for specific signals that tell them you can learn, build, and communicate.
        </p>
        <p className="cg-text cg-text--sm">
          A tip: before any interview, research that specific company. Check their LinkedIn, their job postings, their tech blog if they have one. Companies tell you exactly what they value — most candidates just do not bother to read it.
        </p>
        <div className="cg-expect-grid">
          {EXPECT_ITEMS.map((item, i) => (
            <div key={i} className="cg-expect-card">
              <span className="cg-expect-card__icon">{item.icon}</span>
              <div>
                <div className="cg-expect-card__title">{item.title}</div>
                <p className="cg-expect-card__desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="07 — Mistakes That Are Costing Students Their Direction" color="#EF4444">
        <p className="cg-text" style={{ marginBottom: '1.5rem' }}>
          These are not small mistakes. They are patterns that keep students stuck for months or years. Read each one honestly and ask yourself if any of them apply to you right now:
        </p>
        <div className="cg-mistake-list">
          {MISTAKES.map((m, i) => (
            <div key={i} className="cg-mistake-card">
              <span className="cg-mistake-card__icon">{m.icon}</span>
              <div>
                <div className="cg-mistake-card__title">Mistake: {m.mistake}</div>
                <div className="cg-mistake-card__body"><strong>Reality:</strong> {m.reality}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="08 — What You Should Do Right Now" color="#9B6ED4">
        <div className="cg-advice-list">
          {ADVICE_ITEMS.map((advice, i) => (
            <div key={i} className="cg-advice-item" style={{ '--advice-color': advice.color }}>
              <div className="cg-advice-item__num">{i + 1}</div>
              <span className="cg-advice-item__text">{advice.text}</span>
            </div>
          ))}
        </div>
        <div className="cg-cta">
          <div className="cg-cta__emoji">⚔️</div>
          <h3 className="cg-cta__title">Your Path Is Waiting — Start It Today</h3>
          <p className="cg-cta__desc">
            The gap between where you are and where you want to be is not talent. It is time + consistent work + the right direction. You now have the direction. The time is yours. Start building.
          </p>
          <div className="cg-cta__actions">
            <button type="button" onClick={() => navigate('/skill-arena/dashboard')} className="cg-cta__btn-primary">
              ⚔ Start Learning Now
            </button>
            <button type="button" onClick={() => navigate(-1)} className="cg-cta__btn-secondary">
              ← Back to Fresher Guide
            </button>
          </div>
        </div>
      </Section>

      <footer className="cg-footer">◈ ARISE — LEARN THE SKILLS. EARN THE JOB. ◈</footer>
    </div>
  )
}

function Section({ title, color, children }) {
  return (
    <section className="cg-section">
      <div className="cg-section__head" style={{ '--section-color': color }}>
        <div className="cg-section__bar" />
        <h2 className="cg-section__title">{title}</h2>
      </div>
      {children}
    </section>
  )
}
