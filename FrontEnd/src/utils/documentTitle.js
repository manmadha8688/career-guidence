import { TOOLS } from '../pages/ailab/aiLabData'

const BRAND = 'learnforearn'
const ORIGIN = 'https://learnforearn.in'
const brand = (label) => `${label} · ${BRAND}`

export const BASE_TITLE = `${BRAND} — Gamified Career Learning Platform`
export const BASE_DESCRIPTION =
  'learnforearn (ARISE) is a Solo Leveling–inspired learning platform for students. Master real skills in the Skill Arena, train in the Code GYM, explore the AI Lab, and ship real projects with beginner-friendly deployment guides.'

/**
 * Per-route SEO metadata. Titles use live counts from data files (never hardcoded).
 * Descriptions are hand-written per public route so search + social previews are
 * meaningful for every crawlable page (SPA crawlers read the DOM we mutate here).
 */
const ROUTE_SEO = {
  '/': { title: BASE_TITLE, description: BASE_DESCRIPTION },
  '/login': { title: brand('Sign In'), description: 'Sign in to learnforearn to continue leveling up your skills, quests, and career progress.' },
  '/register': { title: brand('Create Account'), description: 'Create your free learnforearn account and start your journey from 0 to hired.' },
  '/forgot-password': { title: brand('Reset Password'), description: 'Reset your learnforearn account password.' },
  '/about': { title: brand('About'), description: 'What learnforearn is, who it is for, and how the Solo Leveling–inspired system helps students go from 0 to hired.' },
  '/terms': { title: brand('Terms of Service'), description: 'learnforearn terms of service.' },
  '/privacy': { title: brand('Privacy Policy'), description: 'How learnforearn handles your data and privacy.' },
  '/missions': { title: brand('Missions'), description: 'Real, buildable project missions — subject practice, role-based, and academic — to turn what you learn into portfolio-grade work.' },
  '/walk-ins': { title: brand('Walk-In Drives'), description: 'Latest walk-in drives and hiring opportunities for freshers, updated regularly.' },
  '/fresher-instructions': { title: brand('Fresher Guide'), description: 'An honest, peer-to-peer guide for freshers: what is true about hiring, AI impact, and how to actually get your first job.' },
  '/fresher-instructions/career-guidance': { title: brand('Career Guidance'), description: 'Role-by-role career guidance for students — passion fit, AI impact, and realistic future outlook.' },
  '/ai-lab': { title: `AI Lab — ${TOOLS.length} AI Tools · ${BRAND}`, description: `Explore ${TOOLS.length} AI tools across 14 categories — hands-on guides to use modern AI for learning, building, and career work.` },
  '/deployment': { title: brand('Deployment Guides'), description: 'Beginner-friendly, step-by-step guides to deploy React, Node, Django, Spring Boot, databases, and AI apps for free.' },
  '/problem-solving': { title: brand('Code GYM — Problem Solving'), description: 'Train your coding logic in the Code GYM — LeetCode-style problems across ranked tracks, from beginner to real-world systems.' },
  '/skill-arena/dashboard': { title: brand('Skill Arena'), description: 'Your Skill Arena dashboard — subjects, concepts, quests, XP, and rank progression.' },
}

const PREFIX_SEO = [
  ['/ai-lab/', { title: brand('AI Lab'), description: 'A hands-on guide to using this AI tool effectively for learning and building.' }],
  ['/deployment/', { title: brand('Deployment Guide'), description: 'A step-by-step deployment guide with copy-paste commands and free hosting.' }],
  ['/problem-solving/', { title: brand('Code GYM'), description: 'Solve this coding problem with guided approach, explanation, and multiple solution variants.' }],
  ['/admin-skill-arena', { title: brand('Admin'), description: '', noindex: true }],
  ['/skill-arena', { title: brand('Skill Arena'), description: '', noindex: true }],
]

/** Full SEO record for a path: { title, description, canonical, noindex }. */
export function resolveSeo(pathname) {
  const exact = ROUTE_SEO[pathname]
  if (exact) return withCanonical(pathname, exact)
  for (const [prefix, meta] of PREFIX_SEO) {
    if (pathname.startsWith(prefix)) return withCanonical(pathname, meta)
  }
  return withCanonical('/', { title: BASE_TITLE, description: BASE_DESCRIPTION })
}

function withCanonical(pathname, meta) {
  return {
    title: meta.title,
    description: meta.description || BASE_DESCRIPTION,
    canonical: ORIGIN + (pathname === '/' ? '/' : pathname),
    noindex: !!meta.noindex,
  }
}

/** Backwards-compatible title-only helper. */
export function resolveDocumentTitle(pathname) {
  return resolveSeo(pathname).title
}
