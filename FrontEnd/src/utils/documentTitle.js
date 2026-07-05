import { TOOLS } from '../pages/ailab/aiLabData'

const BRAND = 'learnforearn'
const brand = (label) => `${label} · ${BRAND}`

export const BASE_TITLE = `${BRAND} — Gamified Career Learning Platform`

/** Browser tab titles — counts come from data files, never hardcoded. */
export function resolveDocumentTitle(pathname) {
  switch (pathname) {
    case '/':
      return BASE_TITLE
    case '/login':
      return brand('Sign In')
    case '/register':
      return brand('Create Account')
    case '/forgot-password':
      return brand('Reset Password')
    case '/about':
      return brand('About')
    case '/terms':
      return brand('Terms of Service')
    case '/privacy':
      return brand('Privacy Policy')
    case '/missions':
      return brand('Missions')
    case '/walk-ins':
      return brand('Walk-In Drives')
    case '/fresher-instructions':
      return brand('Fresher Guide')
    case '/fresher-instructions/career-guidance':
      return brand('Career Guidance')
    case '/ai-lab':
      return `AI Lab — ${TOOLS.length} AI Tools · ${BRAND}`
    case '/deployment':
      return brand('Deployment Guides')
    case '/problem-solving':
      return brand('Code GYM — Problem Solving')
    case '/skill-arena/dashboard':
      return brand('Skill Arena')
    default:
      break
  }

  if (pathname.startsWith('/ai-lab/')) return brand('AI Lab')
  if (pathname.startsWith('/deployment/')) return brand('Deployment Guide')
  if (pathname.startsWith('/problem-solving/')) return brand('Code GYM')
  if (pathname.startsWith('/admin-skill-arena')) return brand('Admin')
  if (pathname.startsWith('/skill-arena')) return brand('Skill Arena')

  return BASE_TITLE
}
