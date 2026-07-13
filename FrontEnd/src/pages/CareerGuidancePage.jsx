import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Navbar from '../components/navbars/Navbar'
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react'
import '../styles/pages-animations.css'

// ─── Data ────────────────────────────────────────────────────────────────────

const ROLES = [
  {
    emoji: '🎨', title: 'Frontend Developer',
    demand: 'Very High', color: '#60A5FA',
    day: 'It is 10am Tuesday. A designer drops you a screen, and your morning goes into turning it real in the browser — nudging spacing, fixing why a button jumps on mobile, watching an animation finally feel smooth. You refresh the page a hundred times a day, and every time you see your own work. Energizing if you love instant feedback; draining if fiddling at the pixel level bores you.',
    desc: 'You build what users see and experience — layouts, animations, interactions. If seeing your work come alive in a browser excites you, this path will keep you motivated.',
    passion: 'Good fit if you enjoy visual design, care about how things look and feel, and like immediate visual feedback when you write code.',
    aiImpact: 'AI generates UI code fast now — so typing markup matters less. The skill that grows in value is judgment: knowing why a screen feels right, what a user will fumble, how to say no to a bad layout. That stays human.',
    future: 'Next 3 years: steady. Design-engineering hybrids (people who can both build and judge UI) get picked first. React stays in demand, so time spent there is not wasted.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React or Vue'],
    salary: '₹3.5L – ₹8L (fresher)',
    timeToJob: '6–9 months',
  },
  {
    emoji: '⚙️', title: 'Backend Developer',
    demand: 'Very High', color: '#4ADE80',
    day: 'It is 10am Tuesday and an API is returning the wrong total for some users, and nobody knows why. You read logs, trace the data, and finally find the one wrong line. No visuals — just you, the logic, and the quiet win of a system that behaves. Energizing if puzzles pull you in; draining if you need something on a screen to feel done.',
    desc: 'You build the invisible engine — APIs, databases, authentication, business logic. If you enjoy solving puzzles and thinking about how systems work, this is your space.',
    passion: 'Good fit if you like logic over visuals, enjoy thinking about performance and data flow, and do not need instant visual results to feel satisfied.',
    aiImpact: 'AI writes boilerplate REST APIs in seconds — so knowing the syntax counts for less. What counts more: designing systems that survive real load, thinking about security, and debugging failures AI cannot reason about.',
    future: 'Next 3 years: very stable. Every product company needs backend that does not fall over. Java and Python backend skills stay a long-term, boring-in-a-good-way career.',
    skills: ['Java or Python or Node.js', 'SQL', 'REST APIs', 'Spring Boot or Django'],
    salary: '₹4L – ₹10L (fresher)',
    timeToJob: '8–12 months',
  },
  {
    emoji: '🔗', title: 'Full Stack Developer',
    demand: 'Highest', color: '#9B6ED4',
    day: 'You start the morning fixing a login bug on the frontend, then realise the real problem is the backend token check, then rewrite the database query behind that. By lunch you have touched the whole feature. Energizing if you like owning something end to end; draining if constant switching between very different problems tires you out.',
    desc: 'You own the full product — frontend, backend, database, deployment. Startups love this because one person can ship a complete feature without waiting on others.',
    passion: 'Good fit if you want to build complete products and like variety in your work. Be honest — this takes more time to learn. Do not choose it just because demand is high.',
    aiImpact: 'AI helps at every layer, so it is easy to feel fast without understanding much. The value of a full stack dev is integration thinking — knowing how frontend, backend, and DB actually talk to each other when something breaks.',
    future: 'Next 3 years: highest fresher demand of any path. Startups, GCCs, and product companies all want one person who can move across the stack.',
    skills: ['HTML/CSS/JS', 'React', 'Node.js or Java', 'MongoDB or SQL'],
    salary: '₹4L – ₹12L (fresher)',
    timeToJob: '10–14 months',
  },
  {
    emoji: '🤖', title: 'Data Scientist / ML Engineer',
    demand: 'High (but competitive)', color: '#EF4444',
    day: 'It is 10am and you are staring at a model that is 71% accurate, trying to understand why it fails on one kind of input. Half your day is reading, experimenting, and maths that often does not work the first time. Energizing if the hunt itself is fun; draining, fast, if you wanted results without the long research.',
    desc: 'You build AI models — prediction systems, recommendation engines, classification. This requires strong maths and real curiosity about how machines learn.',
    passion: 'Only choose this if you genuinely enjoy statistics, maths, and reading research. If you are choosing it because "AI is the future" but do not actually enjoy the work — you will struggle and burn out.',
    aiImpact: 'AI raised this role in importance and made it harder at the same time. Calling an API is easy and everyone can do it; the value now is understanding models deeply enough to know when they are wrong. The bar keeps rising.',
    future: 'Next 3 years: highest ceiling of all roles, and the toughest entry. Do not start here — build strong Python and maths basics first, then move in.',
    skills: ['Python', 'Statistics + Linear Algebra', 'ML libraries', 'Deep Learning basics'],
    salary: '₹5L – ₹15L',
    timeToJob: '12–18 months',
  },
  {
    emoji: '🛡️', title: 'QA / Test Engineer',
    demand: 'Shifting', color: '#34D399',
    day: 'You get a new feature and your first instinct is "what happens if I do this weird thing?" You spend the day trying to break it before customers do, then write scripts so the computer keeps checking it forever. Energizing if catching the hidden edge case feels like winning; draining if clicking through the same screens without automation bores you.',
    desc: 'You find bugs before users do. You think like a user trying to break the product. Good QA engineers are underrated and genuinely save companies from disasters.',
    passion: 'Good fit if you have a detail-oriented mindset and enjoy finding edge cases. But be honest: manual testing alone is shrinking. You must learn automation to stay relevant.',
    aiImpact: 'AI now generates manual test cases on its own — so pure manual testing is the part that shrinks. The safe skill is automation: Selenium, Playwright, or Cypress. Automation QA stays in demand.',
    future: 'Next 3 years: manual-only QA keeps declining; automation QA stays stable. If you enter this path, commit to automation from day one, not later.',
    skills: ['Selenium or Playwright or Cypress', 'JIRA', 'API Testing (Postman)', 'Basic Java or Python'],
    salary: '₹2.5L – ₹6L (fresher)',
    timeToJob: '4–7 months',
  },
  {
    emoji: '☁️', title: 'DevOps / Cloud Engineer',
    demand: 'Growing Fast', color: '#A78BFA',
    day: 'It is 10am and a deploy is stuck. You are in the terminal, reading pipelines, working out why the server that ran fine yesterday will not start today. Mostly infrastructure, not features. Energizing if you like automating away repetitive pain and being the person who keeps things running; draining if you wanted to build things users see.',
    desc: 'You make sure software actually runs in production — deployments, infrastructure, monitoring, scaling. More infrastructure than development, but very impactful work.',
    passion: 'Good fit if you enjoy working with systems, enjoy automation of repetitive tasks, and like the idea of keeping critical applications running at scale.',
    aiImpact: 'AI writes deployment configs and scripts fine. What it cannot do: make the infrastructure call, get security right, or know what to do when production breaks at 2am. That judgment is where you become valuable.',
    future: 'Next 3 years: fastest growing of all these paths, with the least fresher competition because most skip it. AWS or Azure certifications open doors quickly here.',
    skills: ['Linux basics', 'AWS or Azure basics', 'Docker', 'CI/CD with GitHub Actions'],
    salary: '₹4L – ₹10L',
    timeToJob: '10–14 months',
  },
  {
    emoji: '📊', title: 'Data Analyst',
    demand: 'High', color: '#F59E0B',
    day: 'Someone asks "why did sales drop last month?" and your day goes into pulling data, writing SQL, and building one chart that answers it clearly. Less code, more "what is this number actually telling us". Energizing if you like turning messy data into a decision people act on; draining if you would rather build software than explain it.',
    desc: 'You turn raw numbers into decisions. You pull data, find patterns, build dashboards, and tell a story with numbers. Less coding than development, more business thinking.',
    passion: 'Good fit if you enjoy working with data, asking "why is this number different?", and communicating findings to non-technical people. SQL and Excel should feel satisfying, not painful.',
    aiImpact: 'AI can write SQL and draw charts for you now. So the value moves to the human parts: understanding the business question, knowing what to even look for, and presenting an insight people trust enough to act on.',
    future: 'Next 3 years: growing fast, because every company now decides with data. Entry bar is lower than development, and strong communication counts as much as technical skill here.',
    skills: ['SQL', 'Excel or Google Sheets', 'Python basics (Pandas)', 'Power BI or Tableau'],
    salary: '₹3L – ₹7L (fresher)',
    timeToJob: '5–8 months',
  },
  {
    emoji: '🤖', title: 'AI / ML Engineer',
    demand: 'Very High', color: '#00D9FF',
    day: 'You are wiring a model into a real product — cleaning messy data in the morning, then in the afternoon digging into why the recommendations feel off. It is deep, mathy, and it breaks in subtle ways you have to reason about. Energizing if understanding how models work fascinates you; draining if you only wanted to call an API and move on.',
    desc: 'You build AI-powered systems — recommendation engines, prediction models, NLP pipelines, and AI integrations. One of the most in-demand and highest-paying roles in the market right now.',
    passion: 'Good fit if you genuinely enjoy maths, statistics, and understanding how models work — not just using them. If you want to use AI tools without understanding them, this is not the right path.',
    aiImpact: 'AI tools made this role more important and more crowded at once. Anyone can call a model; few can tell why it fails and fix it. That gap — deep understanding, not API usage — is the whole job now, and the bar keeps rising.',
    future: 'Next 3 years: highest ceiling of all roles, and the hardest to break into. Python + maths + LangChain + cloud is the foundation. Do not start here — build Python and data fundamentals first.',
    skills: ['Python (strong)', 'Statistics + Linear Algebra basics', 'ML libraries (scikit-learn, PyTorch)', 'LangChain or Hugging Face'],
    salary: '₹6L – ₹18L',
    timeToJob: '14–20 months',
  },
  {
    emoji: '⚗️', title: 'Prompt Engineer / AI Product',
    demand: 'Emerging', color: '#8B5CF6',
    day: 'Your day is experiments — rewriting one instruction to the AI ten different ways, watching where it confidently gets things wrong, then designing the product so those failures do not reach the user. Lots of writing and testing, little heavy coding. Energizing if you are fascinated by what AI can and cannot do; draining if you wanted a hard, structured technical track.',
    desc: 'You design, optimize, and systematize AI prompts and workflows for products. The role that barely existed 2 years ago and is now on job boards everywhere.',
    passion: 'Good fit if you enjoy experimenting, writing clearly, thinking about user experience, and you are fascinated by what AI can and cannot do. No deep coding required to start.',
    aiImpact: 'This role only exists because of AI — but it lives on knowing AI\'s limits. The value is spotting where the model will fail and building systems that handle those failures gracefully, not pretending they will not happen.',
    future: 'Next 3 years: a genuinely new role that is still forming. Companies building AI products need people who understand both the product and the model. A good bridge for strong communicators with real AI curiosity.',
    skills: ['Prompt engineering', 'LangChain basics', 'API usage (OpenAI, Anthropic)', 'Product thinking'],
    salary: '₹4L – ₹12L',
    timeToJob: '6–10 months',
  },
]

const LANGUAGES = [
  {
    goal: '🚀 Get a job fast', color: '#4ADE80', bg: 'rgba(74,222,128,0.08)',
    picks: [
      { lang: 'JavaScript', reason: 'Because one language covers frontend and backend, so you unlock the most jobs for the least learning — and the basics come fast.' },
      { lang: 'Python', reason: 'Because its syntax is the gentlest to start, and it opens web, data, and automation roles all at once — the widest door from zero.' },
    ],
  },
  {
    goal: '🏢 Stable corporate career', color: '#60A5FA', bg: 'rgba(96,165,250,0.08)',
    picks: [
      { lang: 'Java', reason: 'Because banks, MNCs, and large product companies run on Java, and those jobs move slowly — pick it if you want a long, stable track.' },
      { lang: 'Python', reason: 'Because it is the second language most corporate backend and data teams accept, so it keeps your options open alongside Java.' },
    ],
  },
  {
    goal: '📊 Data / AI path', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',
    picks: [
      { lang: 'Python', reason: 'Because every data and AI tool — NumPy, Pandas, the ML libraries — is built for Python first. There is no real alternative here.' },
      { lang: 'SQL', reason: 'Because the data always lives in a database, and SQL is how you get it out. No data role exists without it.' },
    ],
  },
  {
    goal: '💡 Easy to start learning', color: '#9B6ED4', bg: 'rgba(155,110,212,0.08)',
    picks: [
      { lang: 'Python', reason: 'Because it reads almost like plain English, so the language stops fighting you and you can focus on learning to think in code.' },
      { lang: 'JavaScript', reason: 'Because it runs in any browser instantly — you see the result the second you write it, and that fast feedback keeps you going.' },
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
      building: 'Static pages that look right on any screen — your first real things on the internet.',
      blocked: 'Nothing interactive yet: no data, no clicks that change anything. Just structure and style.',
      realTime: 'About 5 weeks if you build alongside learning, not after.',
      recruiterSees: 'Nothing hire-worthy on its own yet — but this is the ground every frontend job stands on.',
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
      building: 'Pages that respond — a to-do that updates, an app that pulls in live data.',
      blocked: 'Without this, your pages just sit there. Nothing reacts to the user.',
      realTime: '6–8 weeks of real practice — writing code, not only watching it.',
      recruiterSees: 'You can make things actually work. But they will look for React right after this.',
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
      building: 'A full frontend app with several pages, real state, and reusable components.',
      blocked: 'Without React, big apps get messy fast and companies will not shortlist you for frontend.',
      realTime: '6–10 weeks — React takes a little time to click, and that is normal.',
      recruiterSees: '"This person can build a frontend." It is the single most-asked skill on fresher job posts.',
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
      building: 'A real product — database, login, and your own API that your frontend talks to.',
      blocked: 'Without a backend, your data vanishes on refresh and there is no real login.',
      realTime: '8–10 weeks to get genuinely comfortable, not just following along.',
      recruiterSees: 'Full stack. You understand how the whole thing fits together, front to back.',
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
      building: 'One deployed project with a live URL, a clean GitHub, and a story you can tell in an interview.',
      blocked: 'Skip this and you stay invisible. Skills nobody can see do not get you hired.',
      realTime: '3–4 weeks to polish and start applying — keep 30 mins of DSA going daily.',
      recruiterSees: 'A shipped, live project — the strongest single signal a fresher can send.',
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
    reality: 'A student picks backend because it "pays more". A year in, they are good enough to keep the job but dread every morning. The people who race ahead are the ones who find the work genuinely interesting — passion is the fuel that survives the hard months, not a luxury.',
    icon: '💔',
  },
  {
    mistake: 'Following what your friend or batch is doing',
    reality: 'Your whole batch group picks Data Science, so you do too. Six months later they are thriving on the maths and you are miserable. Open LinkedIn yourself, search jobs in your city, and decide from your own interests and real postings — not from what the group chat is doing.',
    icon: '🐑',
  },
  {
    mistake: 'Learning too many technologies at once',
    reality: 'A fresher lists React, Angular, Vue, and Svelte on their resume. The interviewer picks React, asks one deep question, and it falls apart. Someone who knows React well beats someone who "knows" four frameworks at the surface. Pick one and go 6 months deep.',
    icon: '❌',
  },
  {
    mistake: 'Tutorial hell — watching, never building',
    reality: 'Three months of tutorials. It felt productive — play, nod, next video. Then they open a blank editor and cannot build a thing from memory. After every tutorial, close it and rebuild from scratch. That struggle is the actual learning; without it, nothing sticks.',
    icon: '📺',
  },
  {
    mistake: 'Copying projects without understanding',
    reality: 'The project runs, it is on the resume, the interview is going well. Then: "explain this line." Silence — they copied it. The interview ends right there. Every line on your resume has to be something you can own and explain.',
    icon: '📋',
  },
  {
    mistake: 'Ignoring AI tools entirely OR depending on them completely',
    reality: 'One fresher refuses to touch AI tools and works half as fast as peers who use them. Another leans on AI completely and freezes the moment an interviewer asks how the code works. Both lose. Use AI as a co-pilot that speeds you up — never as a replacement for your own understanding.',
    icon: '🤖',
  },
  {
    mistake: 'Waiting until placement season to start',
    reality: 'Two months before campus placements, the panic starts — cram everything at once. But real skills take 6–12 months of steady building. The students who look "lucky" in placements quietly started a year early. Start now, even if placement feels far away.',
    icon: '⏳',
  },
]

const QUIZ_ITEMS = [
  { q: 'When I see a website I like, my first instinct is to open it up and see how it was built', a: '→ Frontend Development', next: 'Start with HTML + CSS in Skill Arena, then rebuild one page you actually like from scratch.' },
  { q: 'I lose track of time figuring out why something is broken and finally fixing it', a: '→ Backend Development', next: 'Pick one language (Python or Java) and build a tiny API that saves and reads data.' },
  { q: 'I want to build a whole product on my own, front to back, without waiting on anyone', a: '→ Full Stack Development', next: 'Follow the Full Stack roadmap below in order — do not skip stages to save time.' },
  { q: 'I enjoy sitting with numbers and spreadsheets until a pattern shows up', a: '→ Data Analyst', next: 'Start with SQL and one real dataset in a spreadsheet — answer one honest question with it.' },
  { q: 'I want to understand how AI models actually work inside, not just call them', a: '→ Data Science / ML', next: 'Build strong Python and maths first; do not jump straight into training models.' },
  { q: 'I naturally think like someone trying to break things, not only build them', a: '→ QA / Automation Testing', next: 'Learn one automation tool (Selenium or Playwright) alongside the manual testing basics.' },
  { q: 'I like systems, servers, and the idea of keeping things running reliably at scale', a: '→ DevOps / Cloud', next: 'Get comfortable with Linux basics and Docker, then pick one cloud (AWS or Azure).' },
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
  { text: 'Spend 30 minutes on LinkedIn today. Search "fresher developer [your city] 2026". Look at 15 job postings. See what skills, what stacks, what company types are actually hiring near you. That is real data — more useful than any YouTube video.', color: '#9B6ED4' },
  { text: 'Pick a path based on what genuinely interests you — not what someone said pays more. Interest is what keeps you going when the learning gets hard. And it will get hard.', color: '#60A5FA' },
  { text: 'Start building something this week. Not a tutorial. Not watching someone else code. Open a code editor and build even a basic version of an idea. The confusion clears when you start building.', color: '#4ADE80' },
  { text: 'Stop comparing your progress to others. Someone ahead of you started earlier or had more time or practiced more. The only comparison that matters is you today vs you last month.', color: '#F59E0B' },
  { text: 'Use AI tools — Copilot, Claude, ChatGPT — as learning tools. Ask them to explain concepts. Use them to get unstuck. But always understand what you are submitting as your own work.', color: '#06B6D4' },
  { text: 'Apply before you feel ready. You will never feel fully ready. 70% ready with real projects is good enough to start. Interviews show you exactly what to learn next.', color: '#EC4899' },
]

// ─── Component ───────────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1]

// ─── Hero visual: conflicting advice in every direction → one clear fit ─────
const CG_HERO_EASE = [0.16, 1, 0.3, 1]
const CG_FORKS = [
  { d: 'M56,150 C120,120 160,70 210,54', x: 210, y: 54, label: 'college' },
  { d: 'M56,150 C120,112 180,98 252,90', x: 252, y: 90, label: 'LinkedIn' },
  { d: 'M56,150 C120,188 180,202 252,210', x: 252, y: 210, label: 'parents' },
  { d: 'M56,150 C120,182 160,232 210,246', x: 210, y: 246, label: 'a video' },
]

function CareerHeroViz() {
  const reduce = useReducedMotion()
  return (
    <svg className="cg-viz" viewBox="0 0 340 300" role="img"
      aria-label="Advice points in every direction — college, LinkedIn, parents, a video — while one clear path leads to the role that fits you.">
      {CG_FORKS.map((f, i) => (
        <g key={f.label}>
          <motion.path d={f.d} className="cg-viz__fork" fill="none"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={reduce ? false : { pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: CG_HERO_EASE }} />
          <motion.circle cx={f.x} cy={f.y} r="4" className="cg-viz__fork-dot"
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            animate={reduce ? false : { scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.12, type: 'spring', stiffness: 220, damping: 15 }} />
          <motion.text x={f.x + 8} y={f.y + 4} className="cg-viz__fork-label"
            initial={reduce ? false : { opacity: 0 }} animate={reduce ? false : { opacity: 1 }}
            transition={{ delay: 0.7 + i * 0.12 }}>{f.label}</motion.text>
        </g>
      ))}
      <motion.path d="M56,150 L286,150" className="cg-viz__path" fill="none"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={reduce ? false : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.1, ease: CG_HERO_EASE }} />
      <circle cx="286" cy="150" r="24" className="cg-viz__goal-glow" />
      <motion.circle cx="286" cy="150" r="12" className="cg-viz__goal"
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        animate={reduce ? false : { scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 220, damping: 14 }} />
      <motion.text x="286" y="180" className="cg-viz__goal-label" textAnchor="middle"
        initial={reduce ? false : { opacity: 0 }} animate={reduce ? false : { opacity: 1 }}
        transition={{ delay: 1.7 }}>YOUR FIT</motion.text>
      <circle cx="56" cy="150" r="6" className="cg-viz__you" />
      <text x="56" y="176" className="cg-viz__you-label" textAnchor="middle">YOU</text>
    </svg>
  )
}

export default function CareerGuidancePage() {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const [openStep, setOpenStep] = useState(0)
  const [pickedQuiz, setPickedQuiz] = useState(null)

  // Entrance / scroll-reveal variant (movement disabled under reduced-motion)
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: reduce ? 0 : i * 0.06, ease: EASE },
    }),
  }
  const heroContainer = { show: { transition: { staggerChildren: reduce ? 0 : 0.12 } } }
  const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.2 } }
  const hover = reduce ? undefined : { y: -6 }

  return (
    <div className="cg-page">

      <div className="cg-bg-orbs">
        <div className="cg-bg-orb cg-bg-orb--1" />
        <div className="cg-bg-orb cg-bg-orb--2" />
        <div className="cg-bg-orb cg-bg-orb--3" />
      </div>

      <Navbar sticky />

      <header className="cg-hero cg-hero--split">
        <div className="cg-hero__halo" aria-hidden="true" />
        <div className="cg-hero__grid">
          <motion.div className="cg-hero__inner cg-hero__copy" initial="hidden" animate="show" variants={heroContainer}>
            <motion.div className="cg-hero__badge" variants={rise}>
              ◈ FOR ANYONE STARTING OUT IN TECH<span className="cg-hero__cursor" aria-hidden="true">▍</span>
            </motion.div>
            <motion.h1 className="cg-hero-title" variants={rise}>Everyone Gave You<br />a Different Answer.</motion.h1>
            <motion.p className="cg-hero__subtitle" variants={rise}>
              Whether you just graduated, you are still mid-degree and only starting to learn, or you have been
              applying for months and getting nowhere — you have heard five different answers. College pushes one
              path, LinkedIn shows only AI startups, and your parents want something stable.
            </motion.p>
            <motion.p className="cg-hero__subtitle" variants={rise} style={{ marginTop: '1rem' }}>
              Nobody told you what these jobs actually feel like at 10am on a Tuesday. This page is not one more
              opinion to add to the pile — it is a way to find the direction that fits <em>you</em>, so you can
              stop collecting advice and pick one.
            </motion.p>
          </motion.div>
          <motion.div className="cg-hero__viz" initial="hidden" animate="show" variants={rise}>
            <CareerHeroViz />
          </motion.div>
        </div>
      </header>

      <div className="cg-intro-wrap">
        <motion.div className="cg-intro" {...inView} variants={rise}>
          <div className="cg-intro__label">BEFORE YOU PICK A ROLE — READ THIS</div>
          <p className="cg-text cg-text--flush" style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>
            Here is what usually happens. Someone starting out picks a stack because a video made it look cool, or a friend chose it, or someone said it pays well. They spend 12 months learning it, land a job, and quietly hate the work within 6 months.
          </p>
          <p className="cg-text cg-text--flush" style={{ fontSize: '0.95rem' }}>
            The path that lasts is the one that matches what you genuinely find interesting. So before scrolling, sit with one honest question: <strong className="cg-strong">what kind of work could I do for 8 hours and not feel drained?</strong> That answer matters more than any salary number on this page.
          </p>
        </motion.div>
      </div>

      <Section title="01 — What Kind of Work Actually Fits You?" color="#EF4444">
        <p className="cg-text">
          The most common advice — "pick the highest-paying role" — is also the one that traps the most people. It leads you into work you do not enjoy, that you grind through, and burn out of before the good salary ever arrives.
        </p>
        <p className="cg-text">
          The honest version: <strong className="cg-strong">people who enjoy their work get better faster, and people who get better faster get paid more.</strong> Interest is not a soft nice-to-have — it is the practical advantage.
        </p>
        <p className="cg-text" style={{ marginBottom: '1.5rem' }}>
          Tap the line that is most true for you — not the one that sounds impressive. It reveals the kind of work you would enjoy, and your first concrete step:
        </p>
        <div className="cg-quiz-grid">
          {QUIZ_ITEMS.map((item, i) => {
            const active = pickedQuiz === i
            return (
              <motion.button
                type="button"
                key={i}
                className={`cg-quiz-card${active ? ' is-active' : ''}`}
                onClick={() => setPickedQuiz(active ? null : i)}
                variants={rise}
                custom={i}
                {...inView}
                whileHover={reduce ? undefined : { y: -3 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
              >
                <div className="cg-quiz-card__q">{item.q}</div>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      key="reveal"
                      className="cg-quiz-card__reveal"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <div className="cg-quiz-card__a">{item.a}</div>
                      <div className="cg-quiz-card__next"><strong>First step:</strong> {item.next}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {!active && <div className="cg-quiz-card__hint">Tap to see where it points →</div>}
              </motion.button>
            )
          })}
        </div>
        <div className="cg-warning">
          <p>
            <strong>One honest warning:</strong> do not pick a role only because someone said "that's where AI won't replace you" or "that pays the most right now." Markets shift, technologies change. The one thing that stays constant is your ability to grow — and you grow fastest in work that genuinely interests you.
          </p>
        </div>
      </Section>

      <Section title="02 — What Each Role Actually Feels Like" color="#3B82F6">
        <p className="cg-text">Job titles tell you nothing about the day. So each role starts with a real moment — 10am on a Tuesday, what you are actually doing, and who it energizes versus who it drains. Then the honest details: who it suits, how AI is changing it, and what the next 3 years look like.</p>
        <p className="cg-text cg-text--sm">
          Then do your own check — open LinkedIn, search fresher jobs in your city, look at 10–15 real postings for any role you are considering, and see what skills they actually ask for. That data beats any guide, including this one.
        </p>
        <div className="cg-role-list">
          {ROLES.map((role, i) => (
            <motion.div
              key={i}
              className="cg-role-card"
              style={{ '--role-color': role.color }}
              variants={rise}
              custom={i % 3}
              {...inView}
              whileHover={hover}
            >
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
              <div className="cg-role-card__day">
                <span className="cg-role-card__day-label">A DAY IN THE LIFE</span>
                <p>{role.day}</p>
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
            </motion.div>
          ))}
        </div>
      </Section>

      <Section title="03 — If You Are Still Unsure, Start Here" color="#8B5CF6">
        <p className="cg-text" style={{ marginBottom: '1.5rem' }}>
          If after reading the roles above you are still genuinely unsure, here are the paths that give beginners the most clarity, the most job options, and the best chance of building confidence early. These are not the "best" paths for everyone — they are the best starting points for most.
        </p>
        <div className="cg-path-grid">
          {PATH_PICKS.map((p, i) => (
            <motion.div key={i} className="cg-path-card" style={{ '--item-color': p.color }} variants={rise} custom={i} {...inView} whileHover={hover}>
              <div className="cg-path-card__head">
                <div className="cg-path-card__rank">{p.rank}</div>
                <div className="cg-path-card__title">{p.title}</div>
              </div>
              <p className="cg-path-card__why">{p.why}</p>
              <div className="cg-path-card__honest">
                <p><strong>Be honest with yourself:</strong> {p.honest}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section title="04 — Which Language to Choose Based on Your Goal" color="#F59E0B">
        <p className="cg-text" style={{ marginBottom: '1.5rem' }}>
          Stop asking "which language is best?" Start asking "best for what?" Here's the honest answer by goal:
        </p>
        <div className="cg-lang-grid">
          {LANGUAGES.map((l, i) => (
            <motion.div key={i} className="cg-lang-card" style={{ '--lang-color': l.color, '--lang-bg': l.bg }} variants={rise} custom={i} {...inView} whileHover={hover}>
              <div className="cg-lang-card__goal">{l.goal}</div>
              {l.picks.map((p, j) => (
                <div key={j} className="cg-lang-card__pick">
                  <div className="cg-lang-card__lang">{p.lang}</div>
                  <div className="cg-lang-card__reason"><span className="cg-lang-card__why-tag">WHY</span>{p.reason}</div>
                </div>
              ))}
            </motion.div>
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
        <div className="cg-journey">
          {ROADMAP.steps.map((step, i) => {
            const open = openStep === i
            const isLast = i === ROADMAP.steps.length - 1
            return (
              <motion.div key={i} className="cg-journey__row" variants={rise} custom={i} {...inView}>
                <div className="cg-journey__rail" aria-hidden="true">
                  <div className={`cg-journey__node${open ? ' is-open' : ''}`}>{String(i + 1).padStart(2, '0')}</div>
                  {!isLast && <div className="cg-journey__line" />}
                </div>
                <div className={`cg-step${open ? ' cg-step--open' : ''}`}>
                  <button type="button" onClick={() => setOpenStep(open ? -1 : i)} className="cg-step__toggle">
                    <div className="cg-step__toggle-left">
                      <div>
                        <div className="cg-step__phase">{step.phase}</div>
                        <div className="cg-step__title">{step.title}</div>
                      </div>
                    </div>
                    {open ? <ChevronUp size={16} color="#9B6ED4" /> : <ChevronDown size={16} color="var(--cg-muted)" />}
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="body"
                        className="cg-step__body-wrap"
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="cg-step__body">
                          <motion.div
                            className="cg-step__facets"
                            initial="hidden"
                            animate="show"
                            variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: 0.05 } } }}
                          >
                            <motion.div className="cg-step__facet" variants={rise}>
                              <span className="cg-step__facet-label">YOU CAN NOW BUILD</span>
                              <div className="cg-step__facet-text">{step.building}</div>
                            </motion.div>
                            <motion.div className="cg-step__facet" variants={rise}>
                              <span className="cg-step__facet-label">WITHOUT IT, YOU CAN'T</span>
                              <div className="cg-step__facet-text">{step.blocked}</div>
                            </motion.div>
                            <motion.div className="cg-step__facet" variants={rise}>
                              <span className="cg-step__facet-label">HOW LONG, HONESTLY</span>
                              <div className="cg-step__facet-text">{step.realTime}</div>
                            </motion.div>
                            <motion.div className="cg-step__facet" variants={rise}>
                              <span className="cg-step__facet-label">WHAT A RECRUITER SEES</span>
                              <div className="cg-step__facet-text">{step.recruiterSees}</div>
                            </motion.div>
                          </motion.div>
                          <div className="cg-step__items">
                            <div className="cg-step__items-label">THE WORK ITSELF</div>
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
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
            <motion.div key={i} className="cg-expect-card" variants={rise} custom={i % 2} {...inView} whileHover={hover}>
              <span className="cg-expect-card__icon">{item.icon}</span>
              <div>
                <div className="cg-expect-card__title">{item.title}</div>
                <p className="cg-expect-card__desc">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section title="07 — Mistakes That Are Costing Students Their Direction" color="#EF4444">
        <p className="cg-text" style={{ marginBottom: '1.5rem' }}>
          These are not small mistakes. They are patterns that keep students stuck for months or years. Read each one honestly and ask yourself if any of them apply to you right now:
        </p>
        <div className="cg-mistake-list">
          {MISTAKES.map((m, i) => (
            <motion.div key={i} className="cg-mistake-card" variants={rise} custom={i} {...inView} whileHover={reduce ? undefined : { x: 4 }}>
              <span className="cg-mistake-card__icon">{m.icon}</span>
              <div>
                <div className="cg-mistake-card__title">Mistake: {m.mistake}</div>
                <div className="cg-mistake-card__body"><strong>Reality:</strong> {m.reality}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section title="08 — What You Should Do Right Now" color="#9B6ED4">
        <div className="cg-advice-list">
          {ADVICE_ITEMS.map((advice, i) => (
            <motion.div key={i} className="cg-advice-item" style={{ '--advice-color': advice.color }} variants={rise} custom={i} {...inView}>
              <div className="cg-advice-item__num">{i + 1}</div>
              <span className="cg-advice-item__text">{advice.text}</span>
            </motion.div>
          ))}
        </div>
        <motion.div className="cg-cta" {...inView} variants={rise}>
          <div className="cg-cta__emoji">⚔️</div>
          <h3 className="cg-cta__title">You Don't Need to Be Sure. You Need to Start.</h3>
          <p className="cg-cta__desc">
            Every role on this page is learnable. None of them need a genius — they need someone willing to put in the months. The real question was never "am I smart enough", it is "am I willing to show up".
          </p>
          <p className="cg-cta__desc">
            So here is your first move: pick the one path that felt most like you, open Skill Arena, and finish a single concept today. Not the whole roadmap — just one. Direction turns real the moment you build something.
          </p>
          <div className="cg-cta__actions">
            <button type="button" onClick={() => navigate('/skill-arena/dashboard')} className="cg-cta__btn-primary">
              ⚔ Finish One Concept Today
            </button>
            <button type="button" onClick={() => navigate('/fresher-instructions')} className="cg-cta__btn-secondary">
              ← Back to Fresher Guide
            </button>
          </div>
        </motion.div>
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
