import {
  Swords, Code2, Briefcase, ChevronRight, Trophy, Target,
  CheckCircle, ArrowRight, Zap, Rocket,
} from 'lucide-react'

export const features = [
  { Icon: Swords,   iconD: '#C4B5FD', iconL: '#7C5DBB', label: 'Skills Arena',    status: '', statusColorD: '#4ADE80', statusColorL: '#15803D', statusBg: 'rgba(74,222,128,0.12)', desc: 'Structured career roadmaps with concept-by-concept learning, real code examples, quizzes, and XP progression.', glow: 'rgba(155,110,212,0.15)', activeBorder: 'rgba(155,110,212,0.4)', isLive: true },
  { Icon: Code2,    iconD: '#0EA5E9', iconL: '#0284C7', label: 'Problem Solving', status: '', statusColorD: '#4ADE80', statusColorL: '#15803D', statusBg: 'rgba(74,222,128,0.12)', desc: 'Five learning tracks — Start Coding, Logic Building, Skill Up, Interview Prep, and Scenario Coding — with solutions in C, Python, Java, and C++.', glow: 'rgba(14,165,233,0.1)', activeBorder: 'rgba(14,165,233,0.25)', isLive: true, href: '/problem-solving', cta: 'Start Solving' },
  { Icon: Trophy,   iconD: '#FF7F2A', iconL: '#B45309', label: 'Mission Board',   status: '', statusColorD: '#4ADE80', statusColorL: '#15803D', statusBg: 'rgba(74,222,128,0.12)', desc: 'Real-world project missions with clear objectives, hints, and proof-of-skill builds — not drills, actual portfolio pieces.', glow: 'rgba(255,127,42,0.12)', activeBorder: 'rgba(255,127,42,0.35)', isLive: true, href: '/missions', cta: 'Explore Missions' },
  { Icon: Rocket,   iconD: '#9B6ED4', iconL: '#7C5DBB', label: 'Deploy Guidance', status: '', statusColorD: '#4ADE80', statusColorL: '#15803D', statusBg: 'rgba(74,222,128,0.12)', desc: 'Step-by-step guides to ship React, Django, Node, FastAPI, Spring Boot, and ML demos live — free hosting, databases, and env setup included.', glow: 'rgba(155,110,212,0.12)', activeBorder: 'rgba(155,110,212,0.35)', isLive: true, href: '/deployment', cta: 'Open Deploy Guide' },
  { Icon: Briefcase,iconD: '#4ADE80', iconL: '#15803D', label: 'Walk-In Jobs',    status: '', statusColorD: '#4ADE80', statusColorL: '#15803D', statusBg: 'rgba(74,222,128,0.12)', desc: 'Live walk-in interview updates posted by students and community. Find opportunities near you.', glow: 'rgba(74,222,128,0.12)', activeBorder: 'rgba(74,222,128,0.3)', isLive: true, href: '/walk-ins', cta: 'View Walk-Ins' },
  { Icon: Zap,      iconD: '#00D9FF', iconL: '#0284C7', label: 'AI Lab',          status: '', statusColorD: '#4ADE80', statusColorL: '#15803D', statusBg: 'rgba(74,222,128,0.12)', desc: 'Explore every AI tool a developer needs — ChatGPT, Copilot, LangChain, CrewAI, automation, and more. With free tutorials.', glow: 'rgba(0,217,255,0.1)', activeBorder: 'rgba(0,217,255,0.35)', isLive: true, href: '/ai-lab', cta: 'Explore AI Tools' },
]

export const steps = [
  { num: '01', Icon: Target, iconD: '#C4B5FD', iconL: '#7C5DBB', title: 'Pick Your Roadmap',          colorD: '#9B6ED4', colorL: '#7C5DBB', desc: 'Choose a career path — Java Full Stack, MERN, Python, Frontend, Backend. Each is a structured sequence of subjects built around real job requirements.' },
  { num: '02', Icon: Zap,    iconD: '#60A5FA', iconL: '#1D4ED8', title: 'Learn Concept by Concept',  colorD: '#60A5FA', colorL: '#1D4ED8', desc: 'Each concept has simple + technical explanations, syntax breakdowns, real code examples, and common mistakes. Learn at your own pace.' },
  { num: '03', Icon: Trophy, iconD: '#F59E0B', iconL: '#B45309', title: 'Earn XP. Prove Your Skills.', colorD: '#F59E0B', colorL: '#B45309', desc: 'Pass quizzes to earn XP and unlock badges. Your rank rises as you progress. Completed subjects become proof of skill on your resume.' },
]

export const NAV_LINKS = [
  { label: 'Missions',         live: true, href: '/missions' },
  { label: 'Code GYM',         live: true, href: '/problem-solving' },
  { label: 'Walk-Ins',         live: true, href: '/walk-ins' },
  { label: 'AI Lab',           live: true, href: '/ai-lab' },
  { label: 'Deploy Guidance',  live: true, href: '/deployment' },
]

export const PAIN_POINTS = [
  '"I have a degree but I\'m still not getting any interview calls."',
  '"There are thousands of courses online — I don\'t know where to even start."',
  '"Every job posting asks for 2 years of experience. I\'m a fresher."',
]

export const PROOF_POINTS = [
  'Roadmaps built around real job requirements',
  'Learn concepts with examples, not just theory',
  'Quizzes prove you understand — not just watched',
  'XP + badges = proof of skill for your resume',
]

export const HERO_SKILL_BADGES = [
  { label: 'Python',      color: '#4ADE80', x: '8%',  y: '22%', delay: '0s',   dur: '6s'   },
  { label: 'DSA',         color: '#C4B5FD', x: '88%', y: '18%', delay: '0.8s', dur: '7s'   },
  { label: 'Java',        color: '#F59E0B', x: '6%',  y: '70%', delay: '1.2s', dur: '5.5s' },
  { label: 'React',       color: '#38BDF8', x: '85%', y: '65%', delay: '0.4s', dur: '6.5s' },
  { label: 'SQL',         color: '#A78BFA', x: '14%', y: '45%', delay: '2s',   dur: '7.5s' },
  { label: 'Node.js',     color: '#86EFAC', x: '80%', y: '42%', delay: '1.6s', dur: '5s'   },
  { label: 'Spring Boot', color: '#FCA5A5', x: '20%', y: '82%', delay: '0.6s', dur: '8s'   },
  { label: 'Git',         color: '#FCD34D', x: '75%', y: '80%', delay: '1.8s', dur: '6s'   },
]

export const MISSION_FEATURE_CARDS = [
  { icon: '🎯', title: 'Project-based practice', body: 'Every mission is a complete project you build from scratch — not a drill, a real thing.' },
  { icon: '🗺️', title: 'Clear objectives & hints', body: "Know exactly what to build. Stuck? Unlock hints one at a time without spoiling the answer." },
  { icon: '📈', title: 'Matched to your skills', body: 'Missions span beginner to advanced — always something challenging but achievable.' },
]

export const MISSION_STATS = [
  { number: '20+', label: 'Missions' },
  { number: '4',   label: 'Technologies' },
  { number: '∞',   label: 'Ways to solve' },
]

export const CODE_GYM_TRACKS = [
  { icon: '💻', title: 'Start Coding',    color: '#22C55E', href: '/problem-solving/start-coding',    desc: 'Never coded before? Begin here. Step-by-step from Hello World to functions.' },
  { icon: '🧠', title: 'Logic Building', color: '#F59E0B', href: '/problem-solving/logic-building',  desc: "Can code but can't solve problems? Train your problem-solving mind." },
  { icon: '⚡', title: 'Skill Up',         color: '#0EA5E9', href: '/problem-solving/skill-up',        desc: 'Arrays, strings, searching — same problem, 4 languages, brute to optimized.' },
  { icon: '💼', title: 'Interview Prep',  color: '#EF4444', href: '/problem-solving/interview-prep',  desc: 'Most-asked questions from Amazon, Google, TCS, and more. All levels.' },
  { icon: '🎯', title: 'Scenario Coding', color: '#A78BFA', href: '/problem-solving/scenario-coding', desc: 'Real-world story problems — solve placement-style scenarios with logic.' },
]

export const CODE_GYM_STATS = [
  { number: '35+', label: 'Problems & growing' },
  { number: '4',   label: 'Languages' },
  { number: '3',   label: 'Approaches each' },
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

export const DEPLOY_STATS = [
  { value: '10+', label: 'Deployment guides', tone: 'purple' },
  { value: '4',   label: 'Free databases',    tone: 'green' },
  { value: '0',   label: 'Credit card needed', tone: 'blue' },
  { value: '30m', label: 'To go live',        tone: 'gold' },
]

/** Re-export icons used in landing section components. */
export { ChevronRight, CheckCircle, ArrowRight }
