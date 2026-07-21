import {
  Swords, Code2, Briefcase, ChevronRight, Trophy, Target,
  CheckCircle, ArrowRight, Zap, Rocket, Brain, FileText,
} from 'lucide-react'

export const features = [
  { Icon: Swords,   iconD: '#C4B5FD', iconL: '#7C5DBB', label: 'Skills Arena',    status: '', statusColorD: '#4ADE80', statusColorL: '#15803D', statusBg: 'rgba(74,222,128,0.12)', desc: 'Career roadmaps that tell you exactly what to learn and in what order. Every concept comes with a plain-English explanation, the technical detail, real code, and a quiz that confirms you actually understood it.', glow: 'rgba(155,110,212,0.15)', activeBorder: 'rgba(155,110,212,0.4)', isLive: true },
  { Icon: Code2,    iconD: '#0EA5E9', iconL: '#0284C7', label: 'Problem Solving', status: '', statusColorD: '#4ADE80', statusColorL: '#15803D', statusBg: 'rgba(74,222,128,0.12)', desc: 'Five tracks that take you from your very first line of code to interview-level DSA. Each problem shows the brute-force idea first, then the optimized approach — in C, Python, Java, and C++.', glow: 'rgba(14,165,233,0.1)', activeBorder: 'rgba(14,165,233,0.25)', isLive: true, href: '/code-gym', cta: 'Start Solving' },
  { Icon: Brain,    iconD: '#A5B4FC', iconL: '#6366F1', label: 'Aptitude',        status: '', statusColorD: '#4ADE80', statusColorL: '#15803D', statusBg: 'rgba(74,222,128,0.12)', desc: 'The round every placement test opens with. Master quantitative, logical reasoning, verbal, and data interpretation — each topic taught twice: a full Learn It walkthrough, then Crack It shortcuts to solve it in seconds.', glow: 'rgba(129,140,248,0.12)', activeBorder: 'rgba(129,140,248,0.35)', isLive: true, href: '/aptitude', cta: 'Train Aptitude' },
  { Icon: Trophy,   iconD: '#FF7F2A', iconL: '#B45309', label: 'Mission Board',   status: '', statusColorD: '#4ADE80', statusColorL: '#15803D', statusBg: 'rgba(74,222,128,0.12)', desc: 'Real project briefs you build end to end. Finish one and you walk away with a portfolio piece to show recruiters — not just another tutorial you followed along with.', glow: 'rgba(255,127,42,0.12)', activeBorder: 'rgba(255,127,42,0.35)', isLive: true, href: '/missions', cta: 'Explore Missions' },
  { Icon: Rocket,   iconD: '#9B6ED4', iconL: '#7C5DBB', label: 'Deploy Guidance', status: '', statusColorD: '#4ADE80', statusColorL: '#15803D', statusBg: 'rgba(74,222,128,0.12)', desc: 'Get your project off localhost and onto a live URL. Copy-paste-ready guides for React, Django, Node, FastAPI, Spring Boot, and ML demos — free hosting, database, and env setup included.', glow: 'rgba(155,110,212,0.12)', activeBorder: 'rgba(155,110,212,0.35)', isLive: true, href: '/deployment', cta: 'Open Deploy Guide' },
  { Icon: FileText, iconD: '#5EEAD4', iconL: '#0F766E', label: 'Resume Studio',   status: '', statusColorD: '#4ADE80', statusColorL: '#15803D', statusBg: 'rgba(74,222,128,0.12)', desc: 'Turn everything you build here into a recruiter-ready resume. Fill in guided sections, watch it update live, and download a clean, ATS-friendly PDF — saved to your account so you can refine it anytime.', glow: 'rgba(94,234,212,0.12)', activeBorder: 'rgba(94,234,212,0.35)', isLive: true, href: '/resume', cta: 'Build Resume' },
  { Icon: Briefcase,iconD: '#4ADE80', iconL: '#15803D', label: 'Walk-In Jobs',    status: '', statusColorD: '#4ADE80', statusColorL: '#15803D', statusBg: 'rgba(74,222,128,0.12)', desc: 'Real walk-in interview drives shared by the community. Filter by city, see the role and skills needed, and show up prepared.', glow: 'rgba(74,222,128,0.12)', activeBorder: 'rgba(74,222,128,0.3)', isLive: true, href: '/walk-ins', cta: 'View Walk-Ins' },
  { Icon: Zap,      iconD: '#00D9FF', iconL: '#0284C7', label: 'AI Lab',          status: '', statusColorD: '#4ADE80', statusColorL: '#15803D', statusBg: 'rgba(74,222,128,0.12)', desc: 'Learn the AI tools every developer is now expected to know — chatbots, coding copilots, agents, and automation — with beginner-friendly guides and a hands-on project for each.', glow: 'rgba(0,217,255,0.1)', activeBorder: 'rgba(0,217,255,0.35)', isLive: true, href: '/ai-lab', cta: 'Explore AI Tools' },
]

export const steps = [
  { num: '01', Icon: Target, iconD: '#C4B5FD', iconL: '#7C5DBB', title: 'Pick Your Roadmap',          colorD: '#9B6ED4', colorL: '#7C5DBB', desc: 'Choose a career goal — Full Stack, MERN, Python, Frontend, or Backend. Each roadmap is an ordered path of subjects mapped to what employers actually hire for, so you never wonder what to learn next.' },
  { num: '02', Icon: Zap,    iconD: '#60A5FA', iconL: '#1D4ED8', title: 'Learn Concept by Concept',  colorD: '#60A5FA', colorL: '#1D4ED8', desc: 'No overwhelm. Each concept gives you a simple explanation, the technical depth, clean syntax, real examples, and the mistakes beginners make — so you learn it once, properly, at your own pace.' },
  { num: '03', Icon: Trophy, iconD: '#F59E0B', iconL: '#B45309', title: 'Earn XP. Prove Your Skills.', colorD: '#F59E0B', colorL: '#B45309', desc: 'Clear each quiz to earn XP, climb the ranks, and unlock badges. Every subject you finish becomes verifiable proof of skill you can put on your resume and talk about in interviews.' },
]

export const NAV_LINKS = [
  { label: 'Code GYM',         live: true, href: '/code-gym' },
  { label: 'Aptitude',         live: true, href: '/aptitude' },
  { label: 'Resume',           live: true, href: '/resume' },
  { label: 'Walk-Ins',         live: true, href: '/walk-ins' },
  { label: 'AI Lab',           live: true, href: '/ai-lab' },
  { label: 'Deploy Guidance',  live: true, href: '/deployment' },
]

export const ABOUT_AUDIENCE = [
  'College students',
  'Final-year graduates',
  'Career switchers',
  'Self-taught coders',
]

export const ABOUT_OFFERINGS = [
  { icon: '🗺️', color: '#9B6ED4', title: 'Learn in the right order', body: 'Follow a clear roadmap built from real job descriptions. You always know exactly what to learn next — no more random, half-finished tutorials.' },
  { icon: '💻', color: '#0EA5E9', title: 'Practice by doing', body: 'Solve real coding problems in C, Python, Java and C++ — from your very first line of code to interview-level DSA, every solution explained.' },
  { icon: '🚀', color: '#FF7F2A', title: 'Build real projects', body: 'Finish guided project missions you can actually put on your resume, then deploy them live with copy-paste-ready hosting guides.' },
  { icon: '🤖', color: '#22C55E', title: 'Master AI tools', body: 'Learn the AI tools every developer is now expected to use — the exact edge that gets a fresher hired over everyone else.' },
]

export const ABOUT_TRUST = [
  { value: 'subjects',        label: 'Subjects' },
  { value: 'concepts',        label: 'Concepts to learn' },
  { value: 'paths',           label: 'Career paths' },
  { value: 'India',           label: 'Built for freshers' },
]

export const FRESHER_GUIDE_POINTS = [
  'How to choose the right roadmap for your goal',
  'The exact order to learn, practice and build',
  'How to turn projects into a resume that gets calls',
  'Common fresher mistakes — and how to avoid them',
]

export const PAIN_POINTS = [
  '"I have a degree but I\'m still not getting any interview calls."',
  '"There are thousands of courses online — I don\'t know where to even start."',
  '"Every job posting asks for 2 years of experience. I\'m a fresher."',
]

export const PROOF_POINTS = [
  'Roadmaps modeled on real job descriptions — not random syllabi',
  'Every concept taught with examples and common mistakes',
  'Quizzes that confirm understanding — watching isn\'t learning',
  'XP, ranks, and badges you can actually show recruiters',
]

export const MISSION_FEATURE_CARDS = [
  { icon: '🎯', title: 'Project-based practice', body: 'Every mission is a complete project you build from scratch — not a drill, a real thing.' },
  { icon: '🗺️', title: 'Clear objectives & hints', body: "Know exactly what to build. Stuck? Unlock hints one at a time without spoiling the answer." },
  { icon: '📈', title: 'Matched to your skills', body: 'Missions span beginner to advanced — always something challenging but achievable.' },
]

export const CODE_GYM_TRACKS = [
  { icon: '💻', title: 'Start Coding',    color: '#22C55E', href: '/code-gym/start-coding',    desc: 'Never coded before? Begin here. Step-by-step from Hello World to functions.' },
  { icon: '🧠', title: 'Logic Building', color: '#F59E0B', href: '/code-gym/logic-building',  desc: "Can code but can't solve problems? Train your problem-solving mind." },
  { icon: '⚡', title: 'Skill Up',         color: '#0EA5E9', href: '/code-gym/skill-up',        desc: 'Arrays, strings, searching — same problem, 4 languages, brute to optimized.' },
  { icon: '🎯', title: 'Crack It', color: '#9B6ED4', href: '/code-gym/crack-it', desc: 'Story problems packed with rules — read the situation and code every case correctly.' },
  { icon: '🔥', title: 'Build It', color: '#F59E0B', href: '/code-gym/build-it', desc: 'Get it working, then make it faster — optimize under real constraints and explain why.' },
]

export const AI_LAB_CATEGORIES = [
  { icon: '🤖', title: 'AI Chatbots',       color: '#8B5CF6', desc: 'ChatGPT, Claude, Gemini, Perplexity, NotebookLM' },
  { icon: '💻', title: 'Coding Assistants', color: '#F59E0B', desc: 'Copilot, Cursor, Windsurf, Codeium' },
  { icon: '🔗', title: 'AI Agents',         color: '#EC4899', desc: 'LangChain, CrewAI, AutoGen, LangGraph, MCP' },
  { icon: '⚙️', title: 'Automation',        color: '#F97316', desc: 'n8n, Flowise, Dify, Zapier' },
  { icon: '🦙', title: 'Local AI',          color: '#6366F1', desc: 'Ollama, LM Studio — run models free' },
  { icon: '🎯', title: 'Vector Databases',  color: '#14B8A6', desc: 'ChromaDB, Pinecone — build RAG systems' },
]

export const DEPLOY_STACKS = [
  { icon: '⚛️', title: 'React / Vite',       color: '#60A5FA', desc: 'Deploy to Vercel — free HTTPS, auto-redeploy, custom domain' },
  { icon: '🐍', title: 'Django / FastAPI',   color: '#4ADE80', desc: 'Deploy to Render — free PostgreSQL, environment variables' },
  { icon: '🟢', title: 'Node.js / MERN',     color: '#68A063', desc: 'Express on Render + React on Vercel + MongoDB Atlas free' },
  { icon: '📊', title: 'Streamlit ML Apps',  color: '#FF4B4B', desc: 'Train model → save → app.py → Streamlit Cloud. No web framework needed' },
  { icon: '🤗', title: 'HF Spaces — NLP · LLM · RAG · CV', color: '#FF9D00', desc: 'Deploy NLP, chatbots, RAG apps, image classifiers as Gradio demos — 16GB RAM free' },
  { icon: '🗄️', title: 'Free Databases',     color: '#A78BFA', desc: 'MongoDB Atlas, Neon, Supabase — setup + connection guide' },
]

/** Re-export icons used in landing section components. */
export { ChevronRight, CheckCircle, ArrowRight }
