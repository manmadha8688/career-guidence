import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BrandNavButton from '../components/BrandNavButton'
import EnterArenaButton from '../components/EnterArenaButton'
import { useTheme } from '../context/ThemeContext'
import '../styles/pages-animations.css'
import {
  Sun, Moon, X,
  TrendingUp, MessageCircle, Building2, BookOpen,
  Cpu, Bot, FolderGit2, Brain, Target,
  AlertTriangle, Map, Rocket, ArrowRight,
  CheckCircle, Code2, Briefcase, Server,
  Zap, GraduationCap, Swords, ChevronRight,
} from 'lucide-react'

// ─── Section Data ─────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: 1, icon: TrendingUp, color: '#EF4444', bg: 'rgba(239,68,68,0.09)',
    title: 'The Real IT Market Situation',
    brief: 'Hiring has genuinely slowed at large companies — but new doors have opened elsewhere.',
    content: 'This is the honest picture — not filtered for comfort.\n\nBetween 2022 and 2025, major IT service companies reduced fresher hiring significantly. TCS, Infosys, Wipro, and Cognizant — who once hired 30,000–50,000 freshers per year — cut batch sizes by 40–60%. This happened for real reasons:\n• Post-COVID over-hiring correction\n• AI and automation handling work that previously needed entry-level developers\n• Global economic slowdown reducing client budgets\n\nAt the same time, FAANG and big tech companies globally laid off over 300,000 employees in 2022–2024. Tech is no longer immune to economic cycles.\n\nBUT — here is what is also growing:\n• Global Capability Centers (GCCs): 1,700+ GCCs in India now, adding lakhs of quality jobs. Companies like Goldman Sachs, JPMorgan, Boeing, and Google have major India engineering centers.\n• AI/ML, Cloud, Cybersecurity, and DevOps roles are in shortage — and paying 30–50% more than regular dev roles.\n• Product startups, SaaS companies, and D2C tech companies are still actively hiring.\n• Demand for engineers who can work with AI tools is growing faster than supply.\n\nThe conclusion: the era of mass bulk hiring at service companies is slowing. The era of quality hiring is growing. Fewer seats, but the seats that exist are going to freshers who actually stand out.',
    keyPoints: [
      'Service company bulk hiring slowed 40–60% from 2022 peak — this is real',
      'GCCs, startups, AI/ML roles are growing and actively hiring',
      'Global tech layoffs proved tech is not a safe bubble — skills matter more',
      'Fewer seats, higher bar — quality matters more than quantity now',
    ],
  },
  {
    id: 2, icon: MessageCircle, color: '#3B82F6', bg: 'rgba(59,130,246,0.09)',
    title: 'What Is True vs What Is a Myth',
    brief: 'Some fears are valid. Some are panic. Know the difference — then act on facts.',
    content: 'Let us be direct about what is real and what is not.\n\nPARTIALLY TRUE (do not ignore these):\n• "Service companies are not hiring as many freshers" — TRUE. Volume has genuinely dropped.\n• "Competition is very high" — TRUE. More engineering graduates, fewer seats at top companies.\n• "AI is affecting entry-level jobs" — TRUE. Basic coding tasks, manual testing, and data entry are being automated right now.\n• "Getting placed is harder than it was in 2019–2022" — TRUE. That period was unusual. This period is the new normal.\n\nACTUAL MYTHS:\n• "All IT hiring has completely stopped" — Wrong. Different companies and different roles are actively hiring.\n• "Only top college students get placed" — Wrong. Skills and real projects matter more than college brand in most companies.\n• "AI will replace all developers soon" — Wrong. AI replaces tasks, not roles that require judgment, design, and problem-solving.\n• "I need to master everything before applying" — Wrong. Apply when you have solid basics + real projects. Waiting for perfection is a trap.\n• "Certifications alone will get me a job" — Wrong. Certificates with no applied knowledge impress nobody.\n\nThe right mindset: acknowledge what is hard about the market, then prepare specifically for what companies are actually hiring for today — not for the market of five years ago.',
    keyPoints: [
      'Service hiring is down — stop comparing to 2019–2022 batch outcomes',
      'AI is automating specific tasks — not ending the entire profession',
      'Skills + projects get jobs, not certificates + hope',
      'Acknowledge the hard reality — then prepare smarter, not harder',
    ],
    highlight: 'Facing reality clearly is the first step. Preparing specifically for that reality is the second.',
    highlightColor: '#3B82F6',
  },
  {
    id: 3, icon: Building2, color: '#8B5CF6', bg: 'rgba(139,92,246,0.09)',
    title: 'What Companies Actually Expect',
    brief: 'The bar has gone up. Companies want freshers who can think — not freshers who can memorize.',
    content: 'The fresher bar has shifted. Here is what companies actually look for today:\n\nNON-NEGOTIABLES (every company):\n• You can explain your own project — every part of it, why you made choices\n• You know the fundamentals of your chosen language, not just syntax\n• You have used Git and GitHub — your code is visible\n• You understand how a real application works end-to-end\n• You communicate clearly about what you know and what you do not\n\nWHAT MOST FRESHERS MISS:\n• AI tools: can you actually use GitHub Copilot, Claude, or ChatGPT to develop? Companies now expect this.\n• Debugging ability: can you find a bug you did not create? This is rare and valued.\n• Deployment: did you actually host your project? Vercel, Render, Railway — this shows you built something real.\n• Understanding over memorization: interviewers now ask "why did you use this approach?" not just "what is this?"\n\nWHAT COMPANIES NO LONGER CARE ABOUT:\n• CGPA above 8 (unless it is a filter for shortlisting)\n• Knowing 5+ programming languages at surface level\n• Certificates from online platforms without applied work\n• Resumes padded with buzzwords but no real projects\n\nBottom line: a fresher with 2 well-built, deployed, explainable projects will always outperform a fresher with 10 certifications and no code.',
    keyPoints: [
      'AI tool proficiency is now expected, not optional',
      'Your project must be deployed and you must explain every decision',
      'Debugging ability is rare — it makes you stand out immediately',
      'Communication about what you know clearly > pretending to know more',
    ],
  },
  {
    id: 4, icon: BookOpen, color: '#10B981', bg: 'rgba(16,185,129,0.09)',
    title: 'Why Fundamentals Are More Important Than Ever',
    brief: 'AI writes code. Only you can understand it, verify it, and fix it. That requires fundamentals.',
    content: 'Here is something most students do not realize:\n\nAI tools like GitHub Copilot, Claude, and ChatGPT can generate code in seconds. Any fresher can generate a working React app or a REST API by prompting an AI.\n\nSo if everyone can generate code — what makes YOU valuable?\n\nThe answer is: understanding what the code is doing, knowing when it is wrong, and being able to fix it.\n\nAI is confidently wrong. It generates code that looks correct but has hidden bugs, security vulnerabilities, or logic errors. The fresher who understands fundamentals can catch this. The fresher who does not — cannot.\n\nCritical fundamentals you must own:\n• Programming logic — control flow, recursion, edge cases\n• Data structures — arrays, linked lists, hashmaps, trees\n• Object-oriented programming — classes, inheritance, polymorphism, SOLID basics\n• Databases — write real SQL queries, understand indexes, know NoSQL basics\n• HTTP and APIs — understand request/response, status codes, authentication\n• Git — commit, branch, merge, resolve conflicts\n• Debugging — use breakpoints, read stack traces, isolate problems\n• System thinking — what happens when a user clicks a button, end to end\n\nWith strong fundamentals, you can work with any framework, in any company, with or without AI assistance. Without them, you will be exposed in any real interview.',
    keyPoints: [
      'AI generates code — you must be able to read, verify, and fix it',
      'Fundamentals let you catch AI mistakes before they reach production',
      'Debugging is a superpower that AI cannot fully replace',
      'Framework knowledge fades; fundamentals compound over time',
    ],
  },
  {
    id: 5, icon: Cpu, color: '#06B6D4', bg: 'rgba(6,182,212,0.09)',
    title: 'The Real Impact of AI on IT Jobs',
    brief: 'AI is replacing tasks, not roles. Know exactly which tasks — so you build skills above them.',
    content: 'This is the most important section. Read it carefully.\n\nWhat AI is genuinely replacing right now:\n• Writing boilerplate CRUD code (GitHub Copilot does this faster than any fresher)\n• Simple manual test case writing and basic test execution\n• Data entry, basic reporting, simple dashboards\n• Documentation writing and code commenting\n• Basic customer support and FAQ responses\n• Copy-paste integration of known APIs\n\nThis means: if your only skill is writing tutorial-level code, you are in direct competition with a free AI tool. That is a competition you will lose.\n\nWhat AI cannot replace:\n• Understanding what to build and why (requirements, product thinking)\n• System design and architecture — choosing the right approach for the right problem\n• Debugging complex, real-world issues in production systems\n• Understanding a client\'s actual business problem and translating it to technical solutions\n• Reviewing AI\'s own code and knowing when it is subtly wrong\n• Working with teams, building trust, communicating trade-offs\n• Making decisions under uncertainty with incomplete information\n\nThe honest insight:\nAI has raised the floor — even bad developers can now produce working code. But it has also raised the ceiling on what a skilled developer can accomplish. A good developer with AI tools does 3–5x the work.\n\nYour goal is not to compete with AI. Your goal is to become the person who directs AI, verifies its output, and delivers value that goes beyond what AI alone can produce.',
    keyPoints: [
      'Boilerplate coding, basic testing, data entry — AI is doing this now',
      'System design, debugging, product thinking — AI cannot replace these',
      'AI raised the floor AND the ceiling — skilled developers get more done',
      'Your goal: direct AI and verify it, not just use it blindly',
    ],
    highlight: 'AI does not replace engineers. It replaces engineers who only do what AI can already do.',
    highlightColor: '#06B6D4',
  },
  {
    id: 6, icon: Bot, color: '#F59E0B', bg: 'rgba(245,158,11,0.09)',
    title: 'How to Use AI Without Becoming Dependent',
    brief: 'There is a thin line between using AI as a tool and becoming unable to work without it.',
    content: 'Many students use AI the wrong way and create a hidden problem for themselves: they can generate code, but they cannot explain or fix it in interviews.\n\nThe right approach:\n\nStep 1: Understand the concept first — at least enough to know what you need\nStep 2: Attempt the problem yourself, even partially\nStep 3: Use AI to get unstuck, to explore, or to speed up known work\nStep 4: Read the AI output carefully — do not just copy-paste\nStep 5: Test it, break it, understand why it works\nStep 6: Be ready to explain every line in an interview\n\nWRONG use of AI:\n"Give me the complete project code for a student management system"\n\nRIGHT use of AI:\n"I am building a REST API in Spring Boot for student login. I have set up the User model and UserRepository. Now I want to implement JWT authentication. Explain the flow and show me the JwtFilter class."\n\nThe difference: in the right approach, you understand what you already built, you know what you need next, and you use AI for a specific, bounded task.\n\nPractical rule: If a recruiter asks you to explain any part of your project and you cannot — that project should not be on your resume. Every line you submit for evaluation must be something you can own.',
    keyPoints: [
      'Cannot explain what AI wrote for you? Do not put it on your resume.',
      'Use AI for speed on things you understand — not to skip understanding',
      'Specific, context-rich prompts get far better and more accurate AI output',
      'AI dependency is invisible until an interview — then it is very visible',
    ],
  },
  {
    id: 7, icon: Zap, color: '#A855F7', bg: 'rgba(168,85,247,0.09)',
    title: 'Vibe Coding — What It Is and How to Use It Right',
    brief: 'The new way to build fast. Powerful when used right, dangerous when used blindly.',
    content: 'Vibe coding is a term coined by AI researcher Andrej Karpathy in early 2025. The idea: instead of writing every line of code yourself, you describe what you want in plain English, let AI generate it, and iterate by adjusting your description until the result is right. You are directing the AI like a product manager, not writing syntax like a programmer.\n\nThis approach is real and genuinely useful. Startups are using it to build prototypes in hours. Developers are shipping features 3–5x faster. Non-developers are building functional tools they could not have built before.\n\nWHEN VIBE CODING WORKS WELL:\n• Prototyping a new feature quickly to test an idea\n• Building small tools, scripts, or automations\n• Exploring an unfamiliar framework to see how it works\n• Generating boilerplate and standard patterns you already understand\n• Rapid iteration on UI layouts and designs\n\nWHEN IT GOES WRONG:\n• Using it to build your entire fresher project without understanding any of it\n• Skipping the step of reading and understanding the generated code\n• Vibe coding authentication, payment systems, or anything security-critical\n• Building on top of code you cannot explain when something breaks in production\n• Submitting vibe-coded projects to interviews without being able to explain them\n\nTHE RIGHT MINDSET FOR FRESHERS:\nVibe coding is a multiplier — it multiplies whatever skills you already have. With strong fundamentals, it makes you significantly more productive. Without fundamentals, it produces code you cannot maintain, debug, or explain.\n\nUse vibe coding to go faster on things you understand. Not to skip understanding things.\n\nPRACTICAL RULE: Before adding any AI-generated code to a project on your resume, read every file it produced, understand what it does, and be able to explain it in an interview. If you cannot — rewrite it yourself until you can. The portfolio project is for you to learn, not for AI to impress.',
    keyPoints: [
      'Vibe coding is legitimate and growing — knowing it is an actual skill advantage',
      'It multiplies existing skills — not a substitute for having skills',
      'Always read and understand AI-generated code before using it in your projects',
      'Security, auth, and payment code should never be vibe coded blindly',
    ],
    highlight: 'The best vibe coders are the ones who also understand what the code is doing.',
    highlightColor: '#A855F7',
  },
  {
    id: 8, icon: FolderGit2, color: '#F97316', bg: 'rgba(249,115,22,0.09)',
    title: 'What Makes a Project Actually Impressive',
    brief: 'Most fresher projects look the same. Here is what makes yours stand out.',
    content: 'The hard truth: most fresher GitHub profiles look identical — to-do apps, weather apps, calculator apps. Interviewers have seen hundreds of these. They are not impressed by the app idea. They are impressed by how you built it and whether you can explain your choices.\n\nWhat makes a project genuinely stand out:\n\n1. It is deployed and accessible — not "works on my machine"\n   Use: Vercel (frontend), Render / Railway (backend), MongoDB Atlas (database)\n\n2. It solves a real problem — even a small one\n   "Track my college assignments with deadlines and reminders" is more interesting than "CRUD todo app"\n\n3. It has real authentication — not fake login with hardcoded passwords\n   JWT, session handling, protected routes\n\n4. You can explain every decision:\n   Why did you use this database? Why this framework? What would you change if you had more time?\n\n5. You added something your own — not just followed a YouTube tutorial line by line\n   One original feature, one improvement, one thing that came from your own thinking\n\n6. The README is clean — setup instructions, tech stack, what it does, screenshots\n\nMinimum target: 2 deployed full-stack projects where you can explain every part. That is worth more than 10 certificates.',
    keyPoints: [
      'Deployed > localhost. A link in your resume proves it is real.',
      'Explain every design decision — "I used MongoDB because..." shows thinking',
      'One original feature per project separates you from tutorial followers',
      'A clean GitHub README signals professionalism before the interview starts',
    ],
  },
  {
    id: 9, icon: Brain, color: '#EC4899', bg: 'rgba(236,72,153,0.09)',
    title: 'Problem Solving, Technical Depth, and AI Skills',
    brief: 'Three different skill sets — different companies test different ones.',
    content: 'The hiring landscape now has three separate preparation tracks:\n\nTRACK 1 — Problem Solving (DSA)\nFor: Product companies, MAANG, funded startups\nWhat: Arrays, linked lists, trees, graphs, dynamic programming, time/space complexity\nReality: These companies want to know how you think under pressure. A 6–12 month preparation is needed to be competitive. Not for everyone, but highest paying.\n\nTRACK 2 — Technical Depth\nFor: Service companies (TCS, Infosys, Wipro), GCCs, mid-size companies\nWhat: Programming fundamentals, DBMS, OS, networking basics, REST APIs, your projects\nReality: They want someone they can train and deploy. Strong basics + real project experience is enough. This is the most accessible path for most freshers.\n\nTRACK 3 — AI-Augmented Engineering (NEW and growing fast)\nFor: Startups, product companies, AI companies\nWhat: Using Copilot, Claude, GPT-4 as daily development tools. Building with AI APIs. Prompt engineering. Knowing how to review and deploy AI-generated code safely.\nReality: This track did not exist 3 years ago. It is growing the fastest. Freshers who learn this early have a significant advantage.\n\nMost freshers only prepare for Track 2 and ignore 1 and 3. That is fine for service companies. But if you want to future-proof yourself, add at least the basics of Track 3 to your skillset.',
    keyPoints: [
      'Product companies: DSA — 6–12 months dedicated prep needed',
      'Service/GCC companies: fundamentals + projects is the entry bar',
      'AI-augmented dev is the fastest growing track — start learning it now',
      'Know which track matches your target company before you start preparing',
    ],
  },
  {
    id: 10, icon: Target, color: '#22C55E', bg: 'rgba(34,197,94,0.09)',
    title: 'Which Skills Are Actually Growing',
    brief: 'Not all tech skills are equal right now. Focus on what the market is actually paying for.',
    content: 'Based on current hiring trends (2025–2026), here are the skills with the highest fresher demand:\n\nHIGH DEMAND (learn these):\n• Cloud basics — AWS or Azure fundamentals. Even basic knowledge of EC2, S3, Lambda, and deployment pipelines makes you more hireable.\n• DevOps basics — Docker, basic CI/CD with GitHub Actions. Companies want developers who can ship code, not just write it.\n• AI integration — Using OpenAI, Anthropic, or Gemini APIs to build features. Connecting AI capabilities to real applications.\n• Full-stack JavaScript — React + Node.js + MongoDB is still the fastest path to building complete applications.\n• Python for data/AI — If you are interested in data roles, Python with Pandas, NumPy, and basic ML concepts is valuable.\n• Cybersecurity basics — Every company needs people who understand secure coding, OWASP Top 10, and basic threat awareness.\n\nDECLINING DEMAND (do not over-invest):\n• Manual QA testing without automation skills\n• Basic data entry and reporting roles\n• Simple frontend without any backend knowledge\n\nSAME AS ALWAYS (non-negotiable everywhere):\n• Java or Python fundamentals — one of these is required for most backend roles\n• SQL — database querying is a basic skill for almost every tech role\n• Git and GitHub — if you cannot version control your work, you are not hireable\n\nYou do not need to learn everything. Pick one stack, go deep, add one cloud or AI skill on top.',
    keyPoints: [
      'Cloud basics (AWS/Azure) now expected even for fresher roles at many companies',
      'Docker + CI/CD basics separate you from 90% of freshers',
      'AI API integration is a skill gap — most freshers have not built with it yet',
      'Manual QA without automation is shrinking fast — add Selenium or Playwright',
    ],
  },
  {
    id: 11, icon: AlertTriangle, color: '#EF4444', bg: 'rgba(239,68,68,0.09)',
    title: 'Mistakes That Are Costing Students Jobs',
    brief: 'These are not small mistakes. These are the exact reasons good students do not get placed.',
    content: 'These mistakes are extremely common — and each one is costing students real opportunities.\n\nMISTAKE 1: Tutorial hell without building\nWatching 200 hours of YouTube tutorials and building zero projects. Tutorials feel productive. They are not. Build something after every tutorial.\n\nMISTAKE 2: Copying projects without understanding\nCloning a GitHub repo, changing the name, putting it on your resume. Interviewers ask "how does your authentication work?" and the answer is silence. This ends interviews immediately.\n\nMISTAKE 3: Using AI as a replacement for thinking\nGenerating entire projects with AI, submitting them, and hoping interviewers do not ask questions. They always ask questions. This backfires 100% of the time.\n\nMISTAKE 4: Learning 10 technologies at surface level\nOne week of React, one week of Angular, one week of Vue. You know none of them properly. Pick one and go deep enough to build real things.\n\nMISTAKE 5: Resume lies\nListing "Machine Learning" and "Cloud" as skills based on watching two YouTube videos. Interviewers can probe this in 30 seconds. A lie on a resume destroys your credibility for the entire interview.\n\nMISTAKE 6: Waiting until placement season to start\nPreparation that starts 2 months before placement is not preparation — it is panic. Real skills take 6–12 months of consistent building.\n\nMISTAKE 7: No deployed projects\nEverything "works on my machine" but nothing is live. Deploy your projects. A live link in your resume is proof of work.',
    keyPoints: [
      'Copying projects is immediately visible in interviews — do not do it',
      'AI-generated code you cannot explain should not be on your resume',
      'Depth in one stack beats surface knowledge in five stacks every time',
      'Start 12 months before placement, not 2 months before',
    ],
  },
  {
    id: 12, icon: Map, color: '#6366F1', bg: 'rgba(99,102,241,0.09)',
    title: 'The Realistic Path to Getting Placed',
    brief: 'A clear 12-month plan — not motivational fluff, but an actual sequence that works.',
    content: 'This is the honest timeline for a fresher who starts from basics:\n\nMONTHS 1–3: Foundation\n• Pick ONE language: Java (backend), Python (data/AI), or JavaScript (full-stack). Commit fully.\n• Learn programming fundamentals: control flow, functions, OOP, debugging.\n• Complete at least 50 small coding challenges — not theory, actual code.\n• Set up Git and GitHub. Push code from day one.\n\nMONTHS 3–6: Building\n• Learn your tech stack: database, backend framework or frontend framework.\n• Build 1 complete project from scratch — no tutorial copy. Struggle with it.\n• Deploy it. Get it live on a real URL.\n• Start using AI tools (Claude, Copilot) as coding assistants — not as replacements.\n\nMONTHS 6–9: Depth + Interview Prep\n• Build a second, more complex project. Add authentication, real data, a real use case.\n• Start solving DSA problems — 150+ problems minimum for product companies.\n• Practice explaining your projects out loud. Record yourself. It feels uncomfortable. Do it anyway.\n• Learn one cloud or DevOps tool: basic AWS, or Docker, or CI/CD with GitHub Actions.\n\nMONTHS 9–12: Applications\n• Resume must have: 2 deployed projects, GitHub link, tech stack, clear descriptions.\n• Apply broadly — not just big companies. GCCs, startups, mid-size companies.\n• Do mock interviews. Real practice, not just reading interview questions.\n• Follow up. Respond fast. Show up on time. These things matter more than students think.\n\nThis path is hard. It is also the one that works.',
    keyPoints: [
      '12 months of consistent work beats 3 months of panic preparation',
      'Deploy at month 6 — not after placement. Live projects change everything.',
      'Mock interviews out loud are uncomfortable and absolutely essential',
      'Apply to GCCs and mid-size companies — not just Infosys and Google',
    ],
  },
  {
    id: 13, icon: Rocket, color: '#F59E0B', bg: 'rgba(245,158,11,0.09)',
    title: 'The Unfiltered Truth — And the Real Opportunity',
    brief: 'The honest picture: harder than it was. Still very much possible. Here is why.',
    content: 'Here is the truth without softening.\n\nTHE HARD PART:\nThe era of bulk hiring at service companies is shrinking. The market you heard about from 2019–2022 seniors is not the market you are entering. AI tools are changing what junior developers do. Competition has increased. Salaries for freshers have not grown proportionally to the effort required.\n\nTHESE ARE FACTS. Do not let anyone tell you the market is the same as before.\n\nTHE REAL OPPORTUNITY:\nAt the same time — India\'s digital economy is expanding. There are 1,700+ GCCs (Global Capability Centers) hiring quality engineers. Startups are building real products. AI companies need engineers who understand AI, not just engineers who fear it. Cybersecurity roles are understaffed. Cloud engineers are in demand. Every company in every industry now needs technology.\n\nThe opportunity is not gone. It has shifted.\n\nWHO IS GETTING PLACED RIGHT NOW:\nNot the students who memorized the most. The ones getting placed can explain their projects clearly. They built and deployed something real. They know their fundamentals well enough to catch AI mistakes. They applied broadly, not just to the top 5 companies. They showed up prepared, communicated honestly, and demonstrated they could learn.\n\nTHE HONEST ADVICE:\nDo not study for the market of 2020. Study for the market of 2026. Learn to work with AI, not against it. Build real things. Deploy them. Go deep on one skill instead of shallow on ten. Apply before you feel ready — you will never feel fully ready.\n\nThis path is harder than it looked from the outside. It is also yours to take.',
    keyPoints: [
      'The 2019–2022 market is gone — stop comparing to those batches',
      'GCCs, AI companies, startups — new doors exist, different from old ones',
      'Students getting placed today build real things and explain them clearly',
      'The path is harder. It is still yours to take.',
    ],
    highlight: 'The market does not owe you a job. Skills, real projects, and honest effort still open doors — just different ones than before.',
    highlightColor: '#F59E0B',
  },
]

const HIRING_TYPES = [
  {
    icon: Code2, color: '#6366F1', bg: 'rgba(99,102,241,0.09)',
    type: 'Product Companies', examples: 'Google, Amazon, Microsoft, Flipkart, Swiggy',
    focus: 'DSA Heavy — Needs 6–12 months prep',
    rounds: ['Online Coding Test', 'DSA Rounds (2–3)', 'System Design', 'HR Round'],
    tip: 'LeetCode medium/hard is the standard. Arrays, trees, graphs, DP. Optimal solutions, not just working code. Start early — this cannot be crammed.',
  },
  {
    icon: Server, color: '#10B981', bg: 'rgba(16,185,129,0.09)',
    type: 'Service Companies', examples: 'TCS, Infosys, Wipro, Cognizant, Capgemini',
    focus: 'Technical + Aptitude — Volume down, quality bar up',
    rounds: ['Aptitude Test', 'Technical Round', 'HR Round'],
    tip: 'Hiring volumes are lower than before — fewer seats per campus. Strong fundamentals, clear project explanation, and good communication still get offers here.',
  },
  {
    icon: Zap, color: '#F97316', bg: 'rgba(249,115,22,0.09)',
    type: 'Startups & Product SaaS', examples: 'Early-stage startups, B2B SaaS, D2C tech companies',
    focus: 'Project + Build Ability — Most open to strong freshers',
    rounds: ['Resume + GitHub Review', 'Take-home Assignment', 'Technical Interview', 'Culture Fit'],
    tip: 'Deployed projects and GitHub activity matter most here. They want to see you can ship, not just interview. This is where strong freshers with real projects get their best opportunities.',
  },
  {
    icon: Briefcase, color: '#EC4899', bg: 'rgba(236,72,153,0.09)',
    type: 'GCCs (Global Capability Centers)', examples: 'Goldman Sachs, JPMorgan, Boeing, Cisco India',
    focus: 'Quality Engineering — Growing fast in India',
    rounds: ['Online Assessment', 'Technical Rounds (2)', 'Manager Round', 'HR Round'],
    tip: 'GCCs pay better than most service companies and offer global-standard work. They expect solid fundamentals, system thinking, and clear communication. Often overlooked by freshers — do not ignore them.',
  },
  {
    icon: GraduationCap, color: '#06B6D4', bg: 'rgba(6,182,212,0.09)',
    type: 'AI & Cloud-First Companies', examples: 'AI startups, cloud providers, data platforms',
    focus: 'AI Integration + Engineering — Fastest growing demand',
    rounds: ['Portfolio/GitHub Review', 'Technical Build Task', 'AI Tool Proficiency', 'HR Round'],
    tip: 'Build something with an AI API (OpenAI, Anthropic, Gemini). Know Docker basics. Know one cloud platform. These companies are hiring freshers who built AI-integrated applications — even simple ones.',
  },
]

// ─── Section Modal ────────────────────────────────────────────────────────────

function SectionModal({ section, onClose }) {
  const Icon = section.icon

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  return (
    <div
      className="fi-modal-overlay"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="fi-modal"
        style={{
          '--section-color': section.color,
          '--section-bg': section.bg,
          '--highlight-color': section.highlightColor || section.color,
        }}
      >
        <div className="fi-modal__head">
          <div className="fi-modal__icon-wrap">
            <Icon size={24} color={section.color} />
          </div>
          <h2 className="fi-modal__title">{section.title}</h2>
          <button type="button" onClick={onClose} className="fi-modal__close">
            <X size={16} />
          </button>
        </div>

        <div className="fi-modal__body">
          {section.highlight && (
            <div className="fi-modal__highlight">
              <p>❝ {section.highlight} ❞</p>
            </div>
          )}

          <div className="fi-modal__content">
            {section.content.split('\n').map((line, i) => {
              if (!line.trim()) return <div key={i} className="fi-modal__spacer" />
              const isSubheading = /^[A-Z][A-Z\s\d/()–:•-]+[:\-—]/.test(line.trim()) && line.trim().length < 80
              if (isSubheading) {
                return (
                  <div key={i} className="fi-modal__subheading">
                    <span className="fi-modal__subheading-bar" />
                    <span className="fi-modal__subheading-text">{line.trim()}</span>
                  </div>
                )
              }
              return <p key={i} className="fi-modal__para">{line}</p>
            })}
          </div>

          <div className="fi-modal__takeaways">
            <div className="fi-modal__takeaways-label">Key Takeaways</div>
            <div className="fi-modal__takeaways-list">
              {section.keyPoints.map((pt, i) => (
                <div key={i} className="fi-modal__takeaway">
                  <CheckCircle size={14} color={section.color} style={{ flexShrink: 0, marginTop: 3 }} />
                  <span className="fi-modal__takeaway-text">{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Section Grid Card ────────────────────────────────────────────────────────

function SectionGridCard({ section, onClick }) {
  const Icon = section.icon
  return (
    <div
      onClick={onClick}
      className="fi-grid-card"
      style={{ '--section-color': section.color, '--section-bg': section.bg }}
    >
      <div className="fi-grid-card__glow" />
      <div className="fi-grid-card__top">
        <div className="fi-grid-card__icon-wrap">
          <Icon size={19} color={section.color} />
        </div>
        <span className="fi-grid-card__num">{String(section.id).padStart(2, '0')}</span>
      </div>
      <div className="fi-grid-card__title">{section.title}</div>
      <div className="fi-grid-card__brief">{section.brief}</div>
      <div className="fi-grid-card__more">
        READ MORE <ChevronRight size={12} />
      </div>
    </div>
  )
}

// ─── Hiring Card ──────────────────────────────────────────────────────────────

function HiringCard({ h }) {
  const Icon = h.icon
  return (
    <div className="fi-hiring-card" style={{ '--card-color': h.color, '--card-bg': h.bg }}>
      <div className="fi-hiring-card__head">
        <div className="fi-hiring-card__icon">
          <Icon size={20} color={h.color} />
        </div>
        <div>
          <div className="fi-hiring-card__type">{h.type}</div>
          <div className="fi-hiring-card__focus">{h.focus}</div>
        </div>
      </div>
      <div className="fi-hiring-card__examples">{h.examples}</div>
      <div className="fi-hiring-card__rounds-label">Typical Rounds</div>
      <div className="fi-hiring-card__rounds">
        {h.rounds.map((r, i) => (
          <div key={i} className="fi-hiring-card__round">
            <div className="fi-hiring-card__round-num">
              <span>{i + 1}</span>
            </div>
            <span className="fi-hiring-card__round-text">{r}</span>
          </div>
        ))}
      </div>
      <div className="fi-hiring-card__tip">
        <div className="fi-hiring-card__tip-label">💡 TIP</div>
        <p className="fi-hiring-card__tip-text">{h.tip}</p>
      </div>
    </div>
  )
}

const ACTION_STEPS = [
  { step: '01', text: 'Set up GitHub today — push any code, even basic. A blank profile loses opportunities before the interview starts.', color: '#6366F1' },
  { step: '02', text: 'Pick ONE language (Python, Java, or JavaScript) and commit to it for 6 months. Depth beats breadth every time.', color: '#8B5CF6' },
  { step: '03', text: 'Decide your track: Service company (fundamentals + project), Product company (DSA), or AI/Startup (build with AI tools).', color: '#EC4899' },
  { step: '04', text: 'Build one project this month — not from a tutorial, from a problem you have seen around you. Deploy it.', color: '#10B981' },
  { step: '05', text: 'Open the Career Guidance page — it gives you the exact role-by-role roadmap for what to learn and in what order.', color: '#F59E0B' },
]

const CTA_FEATURES = ['Structured Roadmaps', 'Real Projects', 'Problem Solving', 'Interview Prep']

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function FresherInstructionsPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const light = theme === 'light'
  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    const els = document.querySelectorAll('.pg-reveal, .pg-reveal-left, .pg-reveal-right')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('pg-visible'); io.unobserve(e.target) } }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="fi-page">

      <nav className="fi-nav">
        <BrandNavButton onClick={() => navigate('/')} />
        <span className="fi-nav-center">FRESHER GUIDE</span>
        <div className="fi-nav__actions">
          <button type="button" onClick={toggleTheme} className="fi-nav__theme">
            {light ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <EnterArenaButton />
        </div>
      </nav>

      <div className="fi-bg-orbs">
        <div className="fi-bg-orb fi-bg-orb--1" />
        <div className="fi-bg-orb fi-bg-orb--2" />
      </div>

      <header className="fi-hero">
        <div className="fi-hero__badge pg-hero-1">
          <span className="fi-hero__pulse pg-pulse-dot" />
          <GraduationCap size={14} /> FOR FRESHERS ENTERING IT
        </div>
        <h1 className="fi-hero__title pg-hero-2">
          The IT Market Reality<br />
          <span className="fi-hero__title-grad">Every Fresher Must Know</span>
        </h1>
        <p className="fi-hero__subtitle pg-hero-3">
          The IT market has changed. This guide covers the real situation — not filtered for comfort.
          What is actually happening with hiring, how AI is changing jobs, what companies genuinely
          want, and the honest path from where you are to where you want to be.
        </p>
        <div className="fi-hero__cta-wrap pg-hero-4">
          <button type="button" onClick={() => navigate('/fresher-instructions/career-guidance')} className="fi-hero__cta-btn">
            🧭 Career Guidance — Which Path Should I Take?
          </button>
          <span className="fi-hero__cta-hint">ROLE GUIDE · ROADMAP · MENTOR ADVICE</span>
        </div>
        <div className="fi-stats pg-hero-5">
          {[['13', 'Key Sections'], ['5', 'Hiring Paths'], ['∞', 'Your Potential']].map(([v, l], i) => (
            <div key={i} className="fi-stats__cell">
              <div className="fi-stats__value">{v}</div>
              <div className="fi-stats__label">{l}</div>
            </div>
          ))}
        </div>
      </header>

      <div className="fi-ai-banner-wrap">
        <div className="fi-ai-banner pg-reveal">
          <div className="fi-ai-banner__icon">
            <Cpu size={20} color="#06B6D4" />
          </div>
          <p className="fi-ai-banner__text">
            AI does not replace engineers — it replaces engineers who only do what AI can already do. Build the skills that sit above what AI can automate.
          </p>
        </div>
      </div>

      <div className="fi-sections-wrap">
        <div className="fi-sections-head pg-reveal">
          <h2 className="fi-sections-head__title">13 Things Every Fresher Must Understand</h2>
          <p className="fi-sections-head__hint">Click any card to read the full section</p>
        </div>
        <div className="fi-sections-grid pg-stagger">
          {SECTIONS.map(section => (
            <div key={section.id} className="pg-reveal">
              <SectionGridCard section={section} onClick={() => setActiveSection(section)} />
            </div>
          ))}
        </div>
      </div>

      <div className="fi-action-wrap">
        <div className="fi-action-panel pg-reveal">
          <div className="fi-action-panel__head">
            <div className="fi-action-panel__icon">
              <Target size={20} color="#6366F1" />
            </div>
            <div>
              <h2 className="fi-action-panel__title">Your Action Plan — Start Today</h2>
              <p className="fi-action-panel__hint">5 things you can do right now to move forward</p>
            </div>
          </div>
          <div className="fi-action-list pg-stagger">
            {ACTION_STEPS.map(({ step, text, color }, i) => (
              <div key={i} className="fi-action-item pg-reveal pg-check-item" style={{ '--step-color': color }}>
                <div className="fi-action-item__step">{step}</div>
                <span className="fi-action-item__text">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="fi-hiring-section">
        <div className="fi-hiring-inner">
          <div className="fi-hiring-head">
            <div className="fi-hiring-head__label">How Companies Actually Hire</div>
            <h2 className="fi-hiring-head__title">5 Hiring Paths — Know Which One You Are Targeting</h2>
            <p className="fi-hiring-head__desc">
              Each path requires different preparation. Preparing for the wrong one wastes months. Pick your target, then prepare specifically for it.
            </p>
          </div>
          <div className="fi-hiring-grid pg-stagger">
            {HIRING_TYPES.map((h, i) => (
              <div key={i} className="pg-reveal"><HiringCard h={h} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="fi-cta-section">
        <div className="fi-cta-panel">
          <div className="fi-cta-panel__emoji">🚀</div>
          <h2 className="fi-cta-panel__title">Ready to Start Your Structured Journey?</h2>
          <p className="fi-cta-panel__desc">
            This platform is built exactly for what this guide describes — structured learning from zero to job-ready, with roadmaps, quizzes, projects, and problem solving.
          </p>
          <div className="fi-cta-panel__actions">
            <button type="button" onClick={() => navigate('/skill-arena/dashboard')} className="fi-cta-panel__btn-primary">
              <Swords size={15} /> Start Learning — Free
            </button>
            <button type="button" onClick={() => navigate('/problem-solving')} className="fi-cta-panel__btn-secondary">
              💻 Start Coding Practice <ArrowRight size={14} />
            </button>
          </div>
          <div className="fi-cta-panel__features">
            {CTA_FEATURES.map(item => (
              <div key={item} className="fi-cta-panel__feature">
                <CheckCircle size={13} color="#22C55E" /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeSection && (
        <SectionModal section={activeSection} onClose={() => setActiveSection(null)} />
      )}
    </div>
  )
}
