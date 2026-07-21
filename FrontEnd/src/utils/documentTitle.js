import { TOOLS } from '../pages/ailab/aiLabData'

const BRAND = 'LearnForEarn'
const ORIGIN = 'https://learnforearn.in'
const brand = (label) => `${label} · ${BRAND}`

export const BASE_TITLE = `${BRAND} — Coding Practice, Career Roadmaps & Fresher Jobs`
export const BASE_DESCRIPTION =
  'LearnForEarn is a learning platform for students and freshers in India. Follow guided career roadmaps, practice real coding problems in C, Python, Java & C++, build resume-worthy projects, master in-demand AI tools, and find walk-in job drives — everything you need to go from beginner to hired.'

// Broad, audience-focused keyword base. Per-route keywords below are prepended
// to this so each page leads with its own most-relevant terms.
export const BASE_KEYWORDS =
  'DSA practice, placement preparation, aptitude preparation, quantitative aptitude, logical reasoning, verbal ability, data interpretation, fresher jobs India, walk-in drives, AI tools for students, career roadmap, coding problems with solutions, project ideas for students, deployment guides, interview preparation, learn Python, learn Java, learn React, coding for beginners'

/**
 * Per-route SEO metadata. Titles use live counts from data files (never hardcoded).
 * Descriptions + keywords are hand-written per public route so search + social
 * previews are meaningful for every crawlable page (SPA crawlers read the DOM
 * we mutate here).
 */
const ROUTE_SEO = {
  '/': { title: BASE_TITLE, description: BASE_DESCRIPTION },
  '/login': { title: brand('Sign In'), description: 'Sign in to LearnForEarn to continue your career roadmaps, coding practice, and job search.', keywords: 'LearnForEarn login, student login' },
  '/register': { title: brand('Create Account'), description: 'Create your LearnForEarn account and start your journey from fresher to hired.', keywords: 'sign up, create account, learning platform' },
  '/forgot-password': { title: brand('Reset Password'), description: 'Reset your LearnForEarn account password.', keywords: 'reset password' },
  '/about': { title: brand('About Us'), description: 'What LearnForEarn is, who it is for, and how it helps Indian students and freshers go from zero to hired.', keywords: 'about LearnForEarn, learning platform for students, career platform India' },
  '/contact': { title: brand('Contact Us'), description: 'Get in touch with the LearnForEarn team — support, feedback, privacy, and partnership enquiries.', keywords: 'contact LearnForEarn, support, feedback, partnerships' },
  '/terms': { title: brand('Terms of Service'), description: 'LearnForEarn terms of service.', keywords: 'terms of service' },
  '/privacy': { title: brand('Privacy Policy'), description: 'How LearnForEarn collects, uses, and protects your data.', keywords: 'privacy policy, data protection' },
  '/missions': { title: brand('Project Missions'), description: 'Real, buildable project missions — subject practice, role-based, and academic — to turn what you learn into portfolio-grade, resume-worthy work.', keywords: 'project ideas for students, resume projects, portfolio projects, mini projects, final year project ideas' },
  '/walk-ins': { title: brand('Walk-In Job Drives'), description: 'Latest walk-in interview drives and hiring opportunities for freshers across India — filter by city, role, and skills.', keywords: 'walk-in drives, fresher jobs India, walk-in interview, off campus drive, IT jobs for freshers, hiring near me' },
  '/fresher-instructions': { title: brand('Fresher Guide'), description: 'An honest, peer-to-peer guide for freshers: the truth about hiring, AI impact, and how to actually land your first job.', keywords: 'fresher guide, how to get first job, placement tips, fresher career advice, first job after graduation' },
  '/fresher-instructions/career-guidance': { title: brand('Career Guidance'), description: 'Role-by-role career guidance for students — passion fit, AI impact, salaries, and realistic future outlook for each path.', keywords: 'career guidance, which career to choose, IT career paths, software career roadmap, career after B.Tech' },
  '/ai-lab': { title: `AI Lab — ${TOOLS.length}+ AI Tools for Students · ${BRAND}`, description: `Learn ${TOOLS.length}+ AI tools across 14 categories — hands-on, beginner-friendly guides to use ChatGPT, coding copilots, agents, RAG, and automation for learning, building, and your career.`, keywords: 'AI tools for students, ChatGPT guide, AI coding tools, prompt engineering, RAG, LangChain, AI copilots, learn AI' },
  '/deployment': { title: brand('Free Deployment Guides'), description: 'Beginner-friendly, copy-paste deployment guides to host React, Node, Django, Spring Boot, FastAPI, databases, and AI apps for free.', keywords: 'free hosting, deploy React app, deploy Django, deploy Node.js, free deployment, host project free, Vercel, Render' },
  '/code-gym': { title: brand('Code GYM — Coding Practice'), description: 'Practice coding in the Code GYM — problems across ranked tracks in C, Python, Java & C++, from your first line of code to interview-level DSA, with brute-force and optimized solutions.', keywords: 'coding practice, DSA practice, coding problems with solutions, LeetCode alternative, practice Python, practice Java, interview coding questions' },
  '/aptitude': { title: brand('Aptitude — Quant, Reasoning, Verbal & DI'), description: 'Master placement aptitude the easy way — every topic explained two ways: Learn It for the full beginner-first walkthrough and Crack It for the fastest shortcut methods, across quantitative, logical, verbal and data interpretation.', keywords: 'aptitude preparation, quantitative aptitude, logical reasoning, verbal ability, data interpretation, placement aptitude, aptitude shortcuts, TCS NQT aptitude, aptitude tricks' },
  '/skill-arena/dashboard': { title: brand('Skill Arena'), description: 'Your Skill Arena dashboard — subjects, concepts, quests, XP, and rank progression.' },
}

const PREFIX_SEO = [
  ['/ai-lab/', { title: brand('AI Lab'), description: 'A hands-on, beginner-friendly guide to using this AI tool effectively for learning and building.', keywords: 'AI tool guide, how to use, AI for students' }],
  ['/deployment/', { title: brand('Deployment Guide'), description: 'A step-by-step deployment guide with copy-paste commands and free hosting.', keywords: 'free hosting, deployment guide, deploy for free' }],
  ['/code-gym/', { title: brand('Code GYM'), description: 'Solve this coding problem with a guided approach, explanation, and multiple solution variants.', keywords: 'coding problem, solution, DSA practice' }],
  ['/aptitude/', { title: brand('Aptitude'), description: 'Learn this aptitude topic two ways — a full beginner-first explanation and quick shortcut methods — with worked examples and common mistakes.', keywords: 'aptitude topic, aptitude shortcuts, aptitude tricks, placement preparation' }],
  ['/admin-skill-arena', { title: brand('Admin'), description: '', noindex: true }],
  ['/skill-arena', { title: brand('Skill Arena'), description: '', noindex: true }],
]

/** Full SEO record for a path: { title, description, keywords, canonical, noindex }. */
export function resolveSeo(pathname) {
  const exact = ROUTE_SEO[pathname]
  if (exact) return withCanonical(pathname, exact)
  for (const [prefix, meta] of PREFIX_SEO) {
    if (pathname.startsWith(prefix)) return withCanonical(pathname, meta)
  }
  return withCanonical('/', { title: BASE_TITLE, description: BASE_DESCRIPTION })
}

function withCanonical(pathname, meta) {
  const keywords = meta.keywords ? `${meta.keywords}, ${BASE_KEYWORDS}` : BASE_KEYWORDS
  return {
    title: meta.title,
    description: meta.description || BASE_DESCRIPTION,
    keywords,
    canonical: ORIGIN + (pathname === '/' ? '/' : pathname),
    noindex: !!meta.noindex,
  }
}
