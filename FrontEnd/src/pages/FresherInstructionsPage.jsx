import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Navbar from '../components/navbars/Navbar'
import '../styles/pages-animations.css'
import {
  X,
  TrendingUp, MessageCircle, Building2, BookOpen,
  Cpu, Bot, FolderGit2, Brain, Target,
  AlertTriangle, Map, Rocket,
  CheckCircle, Code2, Briefcase, Server,
  Zap, GraduationCap, Swords, ChevronRight,
} from 'lucide-react'

// ─── Section Data ─────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: 1, icon: TrendingUp, color: '#EF4444', bg: 'rgba(239,68,68,0.09)',
    title: 'The Real IT Market Situation',
    brief: 'Hiring genuinely slowed at the big service companies. But other doors opened — and knowing exactly where is your edge.',
    content: "Most freshers panic with zero information. They hear 'no jobs' and freeze. You are about to know the actual shape of the market — which is the whole advantage.\n\nWHAT SLOWED DOWN:\nBetween 2022 and 2025, the big service companies — TCS, Infosys, Wipro, Cognizant — cut fresher batch sizes by 40–60%. They once hired 30,000–50,000 freshers a year. The reasons were real: post-COVID over-hiring correcting itself, AI absorbing entry-level work, and tighter client budgets in a slow global economy.\nWhat this means for you: stop pinning your whole plan on one mass service-company drive. Fewer seats there. Aim wider.\n\nGlobal big tech laid off over 300,000 people across 2022–2024. Tech is not a recession-proof bubble.\nWhat this means for you: nobody is owed a seat anymore — which means the seat goes to whoever can actually do the work.\n\nWHAT IS GROWING:\nGlobal Capability Centers (GCCs) — India now has 1,700+, adding lakhs of genuinely good jobs. Goldman Sachs, JPMorgan, Boeing, and Google all run major engineering centers here.\nWhat this means for you: this is where to aim. Most of your batch ignores GCCs. You should not.\n\nAI/ML, Cloud, Cybersecurity, and DevOps roles are short on people — and pay 30–50% more than regular dev roles. Product startups, SaaS, and D2C tech are still hiring. Demand for engineers who can actually work with AI tools is outrunning supply.\nWhat this means for you: the opportunity moved. It did not disappear.\n\nTHE HONEST CONCLUSION:\nBulk hiring at service companies is shrinking. Quality hiring is growing. Fewer seats — but the ones that exist go to freshers who stand out. That can be you, and now you know where to point.",
    keyPoints: [
      'Service bulk hiring is down 40–60% — do not bet everything on one campus drive',
      '1,700+ GCCs are hiring quality freshers — most of your batch overlooks them',
      'AI/ML, cloud, security, and DevOps pay 30–50% more and are short on people',
      '300,000 global layoffs proved one thing: the seat goes to whoever can do the work',
    ],
  },
  {
    id: 2, icon: MessageCircle, color: '#3B82F6', bg: 'rgba(59,130,246,0.09)',
    title: 'What Is True vs What Is a Myth',
    brief: 'Some of your fears are real. Some are just panic wearing a costume. Here is which is which.',
    content: "You are carrying a mix of true fears and borrowed panic. Let us sort them, because you can only prepare for what is real.\n\nTRUE — DO NOT IGNORE:\n• 'Service companies are not hiring as many freshers.' True. Volume genuinely dropped.\n• 'Competition is brutal.' True. More graduates, fewer top seats.\n• 'AI is affecting entry-level jobs.' True — basic coding, manual testing, and data entry are being automated right now.\n• 'It is harder than it was in 2019–2022.' True. That window was unusual. This is the normal.\n\nMYTHS YOU PROBABLY BELIEVE:\n• 'All IT hiring has stopped.' I thought that too after a few rejections. It has not — different companies and roles are actively hiring.\n• 'Only top-college students get placed.' Feels true when you are not from one. It is not — skills and real projects beat brand at most companies.\n• 'AI will replace all developers soon.' Scary headline, wrong conclusion. AI replaces tasks, not judgment, design, and problem-solving.\n• 'I must master everything before applying.' This one keeps good students unemployed. Apply with solid basics plus real projects. Waiting for perfect is a trap.\n• 'Certifications alone will get me hired.' A lot of us collected them hoping so. Certificates with no applied work impress nobody.\n\nTHE RIGHT MINDSET:\nAdmit what is genuinely hard. Then prepare for the market companies are hiring for today — not the one your seniors described from five years ago.",
    keyPoints: [
      'Service hiring really is down — stop measuring yourself against 2019–2022 batches',
      'AI is automating specific tasks, not ending the profession — big difference',
      'Skills plus projects get offers; certificates plus hope do not',
      'You do not need to know everything to apply — solid basics plus real projects is enough',
    ],
    highlight: 'Facing reality clearly is the first step. Preparing specifically for that reality is the second.',
    highlightColor: '#3B82F6',
  },
  {
    id: 3, icon: Building2, color: '#8B5CF6', bg: 'rgba(139,92,246,0.09)',
    title: 'What Companies Actually Expect',
    brief: 'What actually goes through a hiring manager’s head — reading your resume, setting your test, sitting across from you.',
    content: "I have sat on the other side of the table now. Here is what is actually going through our heads.\n\nREADING YOUR RESUME:\nWe skim for one thing first — did this person build something real, or just list keywords? A live project link and an active GitHub stop us; your code being visible matters. Ten certificates and no code, and we move on. The question in our head: can this person do work, or only talk about it?\n\nSETTING THE CODING TEST:\nWe are not trying to trap you. We want to see how you think when something breaks. Working code is the start — we watch whether you understand why it works. A candidate who can debug a problem they did not create is rare, and we notice immediately.\n\nIN THE TECHNICAL ROUND:\nWe ask you to explain your own project — every part, every choice: why this database, why this framework, what would you change. We check whether you know your language's fundamentals, not just its syntax, and whether you understand how a real application works end to end. And we respect the candidate who says 'I do not know that yet' clearly over one who bluffs. We also quietly check: can you actually develop with Copilot, Claude, or ChatGPT? We expect that now.\n\nWHAT WE HAVE STOPPED CARING ABOUT:\n• CGPA above 8 (unless it is just a shortlist filter)\n• Knowing 5+ languages at surface level\n• Certificates with no applied work\n• Resumes padded with buzzwords and no real projects\n\nTHE BOTTOM LINE FROM OUR SIDE:\nA fresher with 2 well-built, deployed, explainable projects beats one with 10 certifications and no code — every time. Did you host it? Vercel, Render, Railway — that alone tells us it is real, not just 'works on my machine.'",
    keyPoints: [
      'Using AI tools well is now expected in the room, not a bonus',
      'We will ask you to justify every choice in your own project — be ready',
      'Debugging a problem you did not create is rare and makes you stand out instantly',
      'Saying "I do not know yet" clearly beats bluffing — we can tell',
    ],
  },
  {
    id: 4, icon: BookOpen, color: '#10B981', bg: 'rgba(16,185,129,0.09)',
    title: 'Why Fundamentals Are More Important Than Ever',
    brief: 'AI writes the code. You are the one who has to understand it, catch its mistakes, and fix it. Here is where each fundamental shows up.',
    content: "Here is what most students do not see coming.\n\nAI tools — Copilot, Claude, ChatGPT — generate working code in seconds. Any fresher can prompt out a React app or a REST API. So if everyone can generate code, what makes you worth hiring?\n\nUnderstanding what the code does, knowing when it is wrong, and being able to fix it. AI is confidently wrong constantly — code that looks right but hides bugs, security holes, and logic errors. Fundamentals are how you catch that. Skip them and you are exposed the moment an interviewer probes.\n\nWhere each fundamental actually shows up:\n\nPROGRAMMING LOGIC:\nControl flow, recursion, edge cases. Shows up in the very first coding screen. Skip it and you freeze on a problem you half-solved.\n\nDATA STRUCTURES:\nArrays, linked lists, hashmaps, trees. Shows up in product-company rounds. Skip it and 'optimize this' becomes a wall.\n\nOBJECT-ORIENTED PROGRAMMING:\nClasses, inheritance, polymorphism, SOLID basics. Shows up when they ask you to design a small module. Skip it and your code review goes badly.\n\nDATABASES AND SQL:\nReal queries, indexes, NoSQL basics. Shows up in almost every backend interview. Skip it and 'write a query for this' ends the round.\n\nHTTP AND APIS:\nRequest/response, status codes, authentication. Shows up the second you explain your project. Skip it and you cannot describe how your own app talks to its server.\n\nGIT:\nCommit, branch, merge, resolve conflicts. Shows up on day one of any team. Skip it and you look like you have never worked with others.\n\nDEBUGGING:\nBreakpoints, stack traces, isolating the problem. Shows up when their test code intentionally breaks. Skip it and you stare at a red error with no plan.\n\nSYSTEM THINKING:\nWhat happens end to end when a user clicks a button. Shows up in every 'walk me through your project.' Skip it and your answers stay shallow.\n\nWith these, you can work in any framework, at any company, with or without AI. Without them, any real interview will find the gap.",
    keyPoints: [
      'AI generates code — you get hired to read, verify, and fix it',
      'Fundamentals are how you catch AI’s confident mistakes before they ship',
      'Debugging is the fundamental that shows up the moment their test breaks',
      'Frameworks fade; logic, data structures, and SQL compound for years',
    ],
  },
  {
    id: 5, icon: Cpu, color: '#06B6D4', bg: 'rgba(6,182,212,0.09)',
    title: 'The Real Impact of AI on IT Jobs',
    brief: 'AI is replacing tasks, not roles. Here are the exact tasks — and how to sit above them.',
    content: "This is the section to read twice.\n\nWHAT AI IS GENUINELY AUTOMATING NOW:\n• Boilerplate CRUD code — Copilot writes it faster than any fresher\n• Simple manual test-case writing and basic test runs\n• Data entry, basic reporting, simple dashboards\n• Documentation and code comments\n• Basic customer support and FAQ replies\n• Copy-paste integration of well-known APIs\n\nIf your only skill is tutorial-level code, you are competing head-on with a free tool. That is a competition you lose.\n\nWHAT GETS MORE VALUABLE:\n• Deciding what to build and why — requirements, product thinking\n• System design — choosing the right approach for the problem\n• Debugging real, messy production issues\n• Turning a client's actual business problem into a technical solution\n• Reviewing AI's own output and spotting where it is subtly wrong\n• Working with a team, building trust, explaining trade-offs\n• Deciding under uncertainty with incomplete information\n\nWHAT EACH FRESHER LOOKS LIKE TO US:\nThe one who uses AI well shows up with a working, deployed project, explains every line, and says 'AI drafted this part, I rewrote it here because...' — that reads as a real engineer. The one who uses it badly submits code they cannot explain and goes quiet the moment we ask why. We can tell them apart in under five minutes.\n\nTHE HONEST INSIGHT:\nAI raised the floor — even weak developers now ship working code. It also raised the ceiling — a skilled developer with AI does 3–5x the work. Your job is not to beat AI. It is to be the person who directs it, verifies it, and delivers what AI alone cannot.\n\nHABITS THAT KEEP YOU ABOVE THE LINE:\n• Write the first version yourself before asking AI — even a rough one\n• Never paste AI code you cannot explain out loud\n• Ask AI 'what could break here?' after it gives you code\n• Rewrite at least one AI-generated file from memory to prove you learned it",
    keyPoints: [
      'Boilerplate, basic testing, data entry — AI is doing these right now',
      'System design, debugging, product thinking — these get more valuable, not less',
      'To a hiring manager, "AI drafted, I rewrote" reads as a real engineer',
      'Habit: never paste AI code you cannot explain out loud',
    ],
    highlight: 'AI does not replace engineers. It replaces engineers who only do what AI can already do.',
    highlightColor: '#06B6D4',
  },
  {
    id: 6, icon: Bot, color: '#F59E0B', bg: 'rgba(245,158,11,0.09)',
    title: 'How to Use AI Without Becoming Dependent',
    brief: 'There is a thin line between using AI as a tool and not being able to work without it. Here is how to stay on the right side.',
    content: "A lot of students use AI in a way that quietly sabotages them: they can generate code, but they cannot explain or fix it when it counts. I did a version of this early on. Here is the approach that keeps AI a tool, not a crutch.\n\nStep 1: Understand the concept first — at least enough to know what you actually need\nStep 2: Attempt the problem yourself, even partially\nStep 3: Use AI to get unstuck, to explore, or to speed up work you already understand\nStep 4: Read the output carefully — never blind copy-paste\nStep 5: Test it, break it, understand why it works\nStep 6: Be ready to explain every line in an interview\n\nWRONG USE OF AI:\n'Give me the complete project code for a student management system.'\n\nRIGHT USE OF AI:\n'I am building a REST API in Spring Boot for student login. I have set up the User model and UserRepository. Now I want JWT authentication — explain the flow and show me the JwtFilter class.'\n\nThe difference: in the right one, you already understand what you built, you know exactly what is next, and you use AI for a specific, bounded task.\n\nPRACTICAL RULE:\nIf a recruiter asks you to explain any part of your project and you cannot, that part should not be on your resume. Everything you submit for evaluation has to be something you can own.",
    keyPoints: [
      'Cannot explain what AI wrote for you? It does not go on your resume.',
      'Use AI for speed on things you understand — not to skip understanding',
      'Specific, context-rich prompts get far better and more accurate output',
      'AI dependency is invisible until an interview — then it is very visible',
    ],
  },
  {
    id: 7, icon: Zap, color: '#A855F7', bg: 'rgba(168,85,247,0.09)',
    title: 'Vibe Coding — What It Is and How to Use It Right',
    brief: 'The new way to build fast. Genuinely useful when you understand it — a trap when you do not.',
    content: "You will hear the term 'vibe coding' everywhere now. It is worth understanding what it actually is.\n\nVibe coding was coined by AI researcher Andrej Karpathy in early 2025. Instead of writing every line yourself, you describe what you want in plain English, let AI generate it, and iterate by adjusting your description until it is right. You are directing the AI like a product manager, not typing syntax like a programmer.\n\nIt is real and genuinely useful. Startups prototype in hours with it. Developers ship features 3–5x faster. Non-developers build functional tools they could not before.\n\nWHEN VIBE CODING WORKS WELL:\n• Prototyping a feature fast to test an idea\n• Building small tools, scripts, and automations\n• Exploring an unfamiliar framework to see how it works\n• Generating boilerplate and standard patterns you already understand\n• Rapid iteration on UI layouts and designs\n\nWHEN IT GOES WRONG:\n• Building your entire fresher project without understanding any of it\n• Skipping the step where you read and understand the generated code\n• Vibe coding authentication, payment systems, or anything security-critical\n• Building on top of code you cannot explain when it breaks in production\n• Submitting vibe-coded projects to interviews you cannot defend\n\nTHE RIGHT MINDSET FOR FRESHERS:\nVibe coding is a multiplier — it multiplies whatever skills you already have. With strong fundamentals it makes you far more productive. Without them, it produces code you cannot maintain, debug, or explain. Use it to go faster on things you understand, not to skip understanding them.\n\nPRACTICAL RULE:\nBefore any AI-generated code goes into a project on your resume, read every file it produced, understand what it does, and be able to explain it in an interview. If you cannot, rewrite it yourself until you can. The portfolio project is for you to learn — not for AI to impress.",
    keyPoints: [
      'Vibe coding is legitimate and growing — knowing it is an actual advantage',
      'It multiplies existing skills — it is not a substitute for having skills',
      'Always read and understand AI-generated code before it goes in your projects',
      'Security, auth, and payment code should never be vibe coded blindly',
    ],
    highlight: 'The best vibe coders are the ones who also understand what the code is doing.',
    highlightColor: '#A855F7',
  },
  {
    id: 8, icon: FolderGit2, color: '#F97316', bg: 'rgba(249,115,22,0.09)',
    title: 'What Makes a Project Actually Impressive',
    brief: 'Most fresher projects look identical. Here is what makes an interviewer stop scrolling.',
    content: "Hard truth: most fresher GitHub profiles look the same — to-do apps, weather apps, calculators. We have seen hundreds. The app idea is not what impresses us; how you built it and whether you can explain your choices is.\n\nWhat actually makes a project stand out:\n\n1. It is deployed and reachable — not 'works on my machine.' Use Vercel (frontend), Render / Railway (backend), MongoDB Atlas (database).\n\n2. It solves a real problem, even a small one. 'Track my college assignments with deadlines and reminders' beats 'CRUD todo app.'\n\n3. It has real authentication — not fake login with hardcoded passwords. JWT, session handling, protected routes.\n\n4. You can explain every decision. Why this database? Why this framework? What would you change with more time?\n\n5. You added something of your own — not a YouTube tutorial copied line by line. One original feature, one improvement, one idea that came from you.\n\n6. The README is clean — setup instructions, tech stack, what it does, screenshots.\n\nMinimum target: 2 deployed full-stack projects you can explain end to end. Worth more than 10 certificates.",
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
    brief: 'Three different skill sets. Different companies test different ones — know which you are preparing for.',
    content: "Hiring now splits into three prep tracks. Pick before you start — preparing for the wrong one burns months.\n\nTRACK 1 — PROBLEM SOLVING (DSA):\nFor product companies, MAANG, funded startups. Arrays, linked lists, trees, graphs, dynamic programming, time/space complexity. They want to see how you think under pressure — expect 6–12 months of prep to be competitive. Not for everyone, but highest paying.\n\nTRACK 2 — TECHNICAL DEPTH:\nFor service companies (TCS, Infosys, Wipro), GCCs, and mid-size companies. Programming fundamentals, DBMS, OS, networking basics, REST APIs, your projects. They want someone they can train and deploy — strong basics plus real project experience is enough. The most accessible path for most freshers.\n\nTRACK 3 — AI-AUGMENTED ENGINEERING:\nNew and growing fast. For startups, product companies, and AI companies. Using Copilot, Claude, and GPT-4 as daily development tools. Building with AI APIs. Prompt engineering. Knowing how to review and deploy AI-generated code safely. This track did not exist 3 years ago and is growing fastest — freshers who learn it early have a significant advantage.\n\nMost freshers only prepare Track 2 and skip 1 and 3. That is fine for service companies. But to future-proof yourself, add at least the basics of Track 3.",
    keyPoints: [
      'Product companies: DSA — 6–12 months of dedicated prep needed',
      'Service/GCC companies: fundamentals plus projects is the entry bar',
      'AI-augmented dev is the fastest-growing track — start learning it now',
      'Know which track matches your target company before you start preparing',
    ],
  },
  {
    id: 10, icon: Target, color: '#22C55E', bg: 'rgba(34,197,94,0.09)',
    title: 'Which Skills Are Actually Growing',
    brief: 'Not every tech skill is worth the same right now. Aim at what the market is actually paying for.',
    content: "Based on current hiring trends (2025–2026), here is where fresher demand actually is.\n\nHIGH DEMAND — LEARN THESE:\n• Cloud basics — AWS or Azure fundamentals. Even basic EC2, S3, Lambda, and deployment pipelines make you more hireable.\n• DevOps basics — Docker, basic CI/CD with GitHub Actions. Companies want developers who can ship, not just write.\n• AI integration — using OpenAI, Anthropic, or Gemini APIs to build real features.\n• Full-stack JavaScript — React + Node.js + MongoDB is still the fastest path to complete applications.\n• Python for data/AI — Pandas, NumPy, and basic ML concepts if you are aiming at data roles.\n• Cybersecurity basics — secure coding, OWASP Top 10, and basic threat awareness.\n\nDECLINING DEMAND — DO NOT OVER-INVEST:\n• Manual QA testing without automation skills\n• Basic data entry and reporting roles\n• Simple frontend with no backend knowledge\n\nNON-NEGOTIABLE EVERYWHERE:\n• Java or Python fundamentals — one of these is required for most backend roles\n• SQL — database querying is basic for almost every tech role\n• Git and GitHub — if you cannot version control your work, you are not hireable\n\nYou do not need to learn everything. Pick one stack, go deep, add one cloud or AI skill on top.",
    keyPoints: [
      'Cloud basics (AWS/Azure) are now expected even for many fresher roles',
      'Docker + CI/CD basics separate you from 90% of freshers',
      'AI API integration is a skill gap — most freshers have not built with it yet',
      'Manual QA without automation is shrinking fast — add Selenium or Playwright',
    ],
  },
  {
    id: 11, icon: AlertTriangle, color: '#EF4444', bg: 'rgba(239,68,68,0.09)',
    title: 'Mistakes That Are Costing Students Jobs',
    brief: 'These are not small slip-ups. These are the exact reasons capable students stay unplaced.',
    content: "These mistakes are common, and each one is quietly costing students offers.\n\nMISTAKE 1 — TUTORIAL HELL:\n200 hours of YouTube tutorials and zero projects built. Tutorials feel productive; they are not. Build something after every one.\n\nMISTAKE 2 — COPYING PROJECTS:\nCloning a GitHub repo, renaming it, listing it on your resume. Then 'how does your authentication work?' and there is silence. Ends interviews on the spot.\n\nMISTAKE 3 — AI INSTEAD OF THINKING:\nGenerating whole projects with AI and hoping nobody asks. They always ask. Backfires 100% of the time.\n\nMISTAKE 4 — TEN TECHNOLOGIES, SURFACE DEEP:\nA week of React, a week of Angular, a week of Vue — and you know none properly. Pick one and go deep enough to build real things.\n\nMISTAKE 5 — RESUME LIES:\nListing 'Machine Learning' and 'Cloud' off two YouTube videos. We can probe it in 30 seconds. One lie kills your credibility for the whole interview.\n\nMISTAKE 6 — STARTING AT PLACEMENT SEASON:\nPrep that begins 2 months before placement is not prep — it is panic. Real skills take 6–12 months of consistent building.\n\nMISTAKE 7 — NOTHING DEPLOYED:\nEverything 'works on my machine,' nothing is live. Deploy your projects. A live link in your resume is proof of work.",
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
    brief: 'An honest 12-month plan — not motivation, an actual sequence that works.',
    content: "This is the honest timeline if you are starting from basics.\n\nMONTHS 1–3 — FOUNDATION:\n• Pick ONE language: Java (backend), Python (data/AI), or JavaScript (full-stack). Commit fully.\n• Learn programming fundamentals: control flow, functions, OOP, debugging.\n• Complete at least 50 small coding challenges — actual code, not theory.\n• Set up Git and GitHub. Push code from day one.\n\nMONTHS 3–6 — BUILDING:\n• Learn your tech stack: a database, and a backend or frontend framework.\n• Build 1 complete project from scratch — no tutorial copy. Struggle through it.\n• Deploy it. Get it live on a real URL.\n• Start using AI tools (Claude, Copilot) as coding assistants — not replacements.\n\nMONTHS 6–9 — DEPTH + INTERVIEW PREP:\n• Build a second, more complex project — add authentication, real data, a real use case.\n• Start solving DSA problems — 150+ problems minimum for product companies.\n• Practice explaining your projects out loud. Record yourself. It feels uncomfortable. Do it anyway.\n• Learn one cloud or DevOps tool: basic AWS, or Docker, or CI/CD with GitHub Actions.\n\nMONTHS 9–12 — APPLICATIONS:\n• Resume must have: 2 deployed projects, GitHub link, tech stack, clear descriptions.\n• Apply broadly — GCCs, startups, and mid-size companies, not just the big names.\n• Do mock interviews. Real practice, not just reading interview questions.\n• Follow up. Reply fast. Show up on time. These matter more than students think.\n\nThis path is hard. It is also the one that works.",
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
    brief: 'The honest picture: harder than before, still absolutely possible. Here is why.',
    content: "The truth, unsoftened.\n\nTHE HARD PART:\nBulk hiring at service companies is shrinking. The market your 2019–2022 seniors describe is not the one you are entering. AI is changing what junior developers do. Competition is up. Fresher salaries have not grown to match the effort now required. These are facts — do not let anyone tell you it is the same as before.\n\nTHE REAL OPPORTUNITY:\nAt the same time, India's digital economy is expanding. There are 1,700+ GCCs (Global Capability Centers) hiring quality engineers. Startups are building real products. AI companies need engineers who understand AI, not fear it. Cybersecurity roles are understaffed. Cloud engineers are in demand. Every company in every industry now runs on technology. The opportunity did not vanish — it moved.\n\nWHO IS GETTING PLACED RIGHT NOW:\nNot the ones who memorized the most. The ones who can explain their projects clearly, who built and deployed something real, who know their fundamentals well enough to catch AI's mistakes, who applied broadly instead of only to the top 5, and who showed up prepared, honest, and ready to learn.\n\nTHE HONEST ADVICE:\nDo not study for the market of 2020. Study for the market of 2026. Work with AI, not against it. Build real things and deploy them. Go deep on one skill instead of shallow on ten. Apply before you feel ready — you will never feel fully ready.\n\nThis is harder than it looked from the outside. It is also yours to take.",
    keyPoints: [
      'The 2019–2022 market is gone — stop comparing to those batches',
      'GCCs, AI companies, startups — new doors exist, different from the old ones',
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
  { step: '01', text: 'Day 1 — Open the Skill Arena and pick ONE subject gate. Read its first concept, then take that concept quiz. 30–40 minutes. You know it worked when you pass a quiz you could not have passed yesterday.', color: '#6366F1' },
  { step: '02', text: 'Day 2–3 — Stay in the same gate. Clear 3–4 concepts and their quizzes. Depth in one subject, not five open browser tabs. Aim for 45 minutes a day.', color: '#8B5CF6' },
  { step: '03', text: 'Day 4 — Open the Problem Solving gym. Solve 2 beginner problems fully by hand before looking at any solution. This is the exact muscle every technical round tests.', color: '#EC4899' },
  { step: '04', text: 'Day 5–6 — Pick one project from the Mission Board and start building it. Lean on the AI Lab tool guides and deployment guides when you get stuck — to move forward, not to skip the thinking.', color: '#10B981' },
  { step: '05', text: 'Day 7 — Open Career Guidance and lock your target role. It gives you the role-by-role roadmap, so week two is a plan and not a guess.', color: '#F59E0B' },
]

const CTA_FEATURES = ['Structured Roadmaps', 'Real Projects', 'Problem Solving', 'Interview Prep']

// ─── Hero visual: a clear path rising out of the noise ──────────────────────
const HERO_EASE = [0.16, 1, 0.3, 1]
const HERO_NODES = [
  { x: 54, y: 250, label: 'Learn' },
  { x: 130, y: 194, label: 'Build' },
  { x: 206, y: 138, label: 'Apply' },
  { x: 286, y: 74, label: 'Hired', goal: true },
]
const HERO_NOISE = [
  { x: 40, y: 60, text: 'is it all AI now?' },
  { x: 190, y: 44, text: 'no callbacks' },
  { x: 30, y: 150, text: 'too late to start?' },
  { x: 210, y: 250, text: 'which role?' },
]
const HERO_PATH = 'M54,250 L130,194 L206,138 L286,74'

function FresherHeroViz() {
  const reduce = useReducedMotion()
  return (
    <svg className="fi-viz" viewBox="0 0 340 300" role="img"
      aria-label="Anxious questions fade as a clear path rises from Learn to Build to Apply to Hired.">
      {/* drifting worries in the background */}
      {HERO_NOISE.map((n, i) => (
        <text key={i} x={n.x} y={n.y}
          className={`fi-viz__noise${reduce ? '' : ' fi-viz__noise--drift'}`}
          style={{ animationDelay: `${i * 0.9}s` }}>{n.text}</text>
      ))}
      {/* the path */}
      <motion.path d={HERO_PATH} className="fi-viz__path" fill="none"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={reduce ? false : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.3, ease: HERO_EASE }} />
      {/* goal glow */}
      <circle cx={286} cy={74} r={26} className="fi-viz__goal-glow" />
      {/* milestone nodes */}
      {HERO_NODES.map((n, i) => (
        <g key={n.label}>
          <motion.circle cx={n.x} cy={n.y} r={n.goal ? 11 : 7}
            className={`fi-viz__node${n.goal ? ' fi-viz__node--goal' : ''}`}
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            animate={reduce ? false : { scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.28, type: 'spring', stiffness: 220, damping: 15 }} />
          <motion.text x={n.x} y={n.y - (n.goal ? 20 : 15)}
            className={`fi-viz__label${n.goal ? ' fi-viz__label--goal' : ''}`} textAnchor="middle"
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.28, duration: 0.4 }}>{n.label}</motion.text>
        </g>
      ))}
    </svg>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function FresherInstructionsPage() {
  const navigate = useNavigate()
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

      <Navbar sticky />

      <div className="fi-bg-orbs">
        <div className="fi-bg-orb fi-bg-orb--1" />
        <div className="fi-bg-orb fi-bg-orb--2" />
      </div>

      <header className="fi-hero fi-hero--split">
        <div className="fi-hero__grid">
          <div className="fi-hero__copy">
            <div className="fi-hero__badge pg-hero-1">
              <span className="fi-hero__pulse pg-pulse-dot" />
              <GraduationCap size={14} /> FOR EVERY STUDENT STARTING OUT
            </div>
            <h1 className="fi-hero__title pg-hero-2">
              Just graduated? Still learning? Not hearing back?<br />
              <span className="fi-hero__title-grad">Here is what is really going on — and what to do next.</span>
            </h1>
            <p className="fi-hero__subtitle pg-hero-3">
              Maybe you just finished your degree. Maybe you are mid-course, still learning to code.
              Maybe you have been applying for months with no reply. Wherever you are, the panic going
              around is real — it is just aimed at the wrong thing. Here is the honest picture, and a
              plan you can start today.
            </p>
            <div className="fi-hero__cta-wrap pg-hero-4">
              <button type="button" onClick={() => navigate('/fresher-instructions/career-guidance')} className="fi-hero__cta-btn">
                🧭 Explore Career Guidance
              </button>
              <span className="fi-hero__cta-hint">9 ROLES · FIND THE ONE THAT FITS YOU · NO HYPE</span>
            </div>
          </div>
          <div className="fi-hero__viz pg-hero-5">
            <FresherHeroViz />
          </div>
        </div>
      </header>

      <div className="fi-ai-banner-wrap">
        <div className="fi-ai-banner pg-reveal">
          <div className="fi-ai-banner__icon">
            <Cpu size={20} color="#06B6D4" />
          </div>
          <p className="fi-ai-banner__text">
            AI does not replace engineers — it replaces engineers who only do what AI can already do. The whole game is building the skills that sit above what AI can automate.
          </p>
        </div>
      </div>

      <div className="fi-sections-wrap">
        <div className="fi-sections-head pg-reveal">
          <h2 className="fi-sections-head__title">13 Things I Wish Someone Had Told Me First</h2>
          <p className="fi-sections-head__hint">Tap any card for the full, honest version</p>
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
              <h2 className="fi-action-panel__title">Your First Week Inside ARISE</h2>
              <p className="fi-action-panel__hint">A day-by-day plan — what to open, how long to spend, and how you will know it is working</p>
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
              Each path needs different preparation. Prep for the wrong one and you lose months. Pick your target, then prepare specifically for it.
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
          <h2 className="fi-cta-panel__title">So — what do you actually do next?</h2>
          <p className="fi-cta-panel__desc">
            Everything above points to one first move: open the Skill Arena, pick one gate, and clear one concept and its quiz today.
            Not because a timer says so — because momentum starts the moment you finish something, not the moment you feel ready.
          </p>
          <div className="fi-cta-panel__actions">
            <button type="button" onClick={() => navigate('/skill-arena/dashboard')} className="fi-cta-panel__btn-primary">
              <Swords size={15} /> Open the Skill Arena
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
