/**
 * Student-facing static search catalog (AI Lab, deployment guides, hubs, Code Gym tracks).
 * Merged client-side with GET /api/search — these surfaces live in FE data, not Mongo.
 */
import { TOOLS, CATEGORIES } from '../pages/ailab/aiLabData'
import { STACKS } from '../pages/deployment/guideIndex'

const PER_GROUP = 6

const CATEGORY_LABEL = Object.fromEntries(
  CATEGORIES.filter((c) => c.id !== 'all').map((c) => [c.id, c.label]),
)

const CODE_GYM_TRACKS = [
  { id: 'start-coding', title: 'Start Coding', subtitle: 'E-Rank · Code Gym track', icon: '🌑', keywords: ['beginner', 'hello world', 'syntax', 'first program'] },
  { id: 'logic-building', title: 'Logic Building', subtitle: 'D-Rank · Code Gym track', icon: '🗡️', keywords: ['logic', 'dry run', 'thinking'] },
  { id: 'skill-up', title: 'Skill Up', subtitle: 'C-Rank · Code Gym track', icon: '⚡', keywords: ['arrays', 'strings', 'patterns', 'dsa'] },
  { id: 'crack-it', title: 'Crack It', subtitle: 'B-Rank · Code Gym track', icon: '🎯', keywords: ['story', 'interview', 'conditions'] },
  { id: 'build-it', title: 'Build It', subtitle: 'A-Rank · Code Gym track', icon: '🔥', keywords: ['optimize', 'improve', 'refactor'] },
  { id: 'prove-it', title: 'Prove It', subtitle: 'S-Rank · Code Gym track', icon: '👑', keywords: ['edge cases', 'systems', 'advanced'] },
]

/** Hub / career surfaces students actually look for by name. */
const HUB_PAGES = [
  {
    id: 'skill-arena',
    title: 'Skill Arena',
    subtitle: 'Gates, concepts, quizzes & hunter paths',
    icon: '⚔️',
    path: '/skill-arena/dashboard',
    keywords: ['skill arena', 'dashboard', 'gates', 'dungeon', 'quiz', 'xp', 'rank', 'hunter'],
  },
  {
    id: 'aptitude-hub',
    title: 'Aptitude Arena',
    subtitle: 'Quantitative · Logical · Verbal',
    icon: '🧠',
    path: '/aptitude',
    keywords: ['aptitude', 'quant', 'quantitative', 'logical', 'verbal', 'reasoning'],
  },
  {
    id: 'aptitude-mock',
    title: 'Core Aptitude Mock',
    subtitle: '50 questions · 65 minutes · placement-style',
    icon: '📝',
    path: '/aptitude/mock',
    keywords: ['mock', 'mock test', 'core mock', 'placement test', 'company test'],
  },
  {
    id: 'code-gym',
    title: 'Code Gym',
    subtitle: 'Coding tracks & practice problems',
    icon: '💻',
    path: '/code-gym',
    keywords: ['code gym', 'coding', 'problems', 'dsa', 'practice', 'leetcode'],
  },
  {
    id: 'missions',
    title: 'Missions',
    subtitle: 'Build & ship project missions',
    icon: '🎯',
    path: '/missions',
    keywords: ['missions', 'projects', 'portfolio', 'build'],
  },
  {
    id: 'ai-lab',
    title: 'AI Lab',
    subtitle: 'AI tools every student should know',
    icon: '🤖',
    path: '/ai-lab',
    keywords: ['ai lab', 'ai tools', 'chatgpt', 'cursor'],
  },
  {
    id: 'deployment',
    title: 'Deployment Guides',
    subtitle: 'Ship apps for free — step by step',
    icon: '🚀',
    path: '/deployment',
    keywords: ['deploy', 'deployment', 'hosting', 'vercel', 'render'],
  },
  {
    id: 'resume',
    title: 'Resume Builder',
    subtitle: 'ATS-friendly resume for campus & jobs',
    icon: '📄',
    path: '/resume',
    keywords: ['resume', 'cv', 'ats', 'curriculum vitae'],
  },
  {
    id: 'walk-ins',
    title: 'Walk-ins & Jobs',
    subtitle: 'Fresher openings and drive info',
    icon: '💼',
    path: '/walk-ins',
    keywords: ['jobs', 'walk-in', 'walkins', 'hiring', 'openings', 'drive', 'placement'],
  },
  {
    id: 'fresher',
    title: 'Fresher Instructions',
    subtitle: 'How to start your job hunt',
    icon: '🧭',
    path: '/fresher-instructions',
    keywords: ['fresher', 'instructions', 'job hunt', 'placement prep'],
  },
  {
    id: 'career',
    title: 'Career Guidance',
    subtitle: 'Paths, roles & what to learn next',
    icon: '🗺️',
    path: '/fresher-instructions/career-guidance',
    keywords: ['career', 'guidance', 'roles', 'job role'],
  },
  {
    id: 'bookmarks',
    title: 'My Bookmarks',
    subtitle: 'Saved concepts & problems',
    icon: '🔖',
    path: '/bookmarks',
    keywords: ['bookmarks', 'saved', 'favourites', 'favorites'],
  },
  {
    id: 'my-profile',
    title: 'My Profile',
    subtitle: 'Hunter card, XP & public link',
    icon: '👤',
    path: '/myprofile',
    keywords: ['profile', 'hunter', 'username', 'stats'],
  },
]

function haystack(...parts) {
  return parts
    .flat()
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function matches(q, ...parts) {
  const h = haystack(...parts)
  return h.includes(q)
}

function item(id, title, subtitle, icon, type, extra = {}) {
  return { id, title, subtitle, icon, type, ...extra }
}

/**
 * @param {string} rawQuery
 * @returns {{ ailab: object[], deployment: object[], tracks: object[], pages: object[] }}
 */
export function searchStudentCatalog(rawQuery) {
  const empty = { ailab: [], deployment: [], tracks: [], pages: [] }
  const q = (rawQuery || '').trim().toLowerCase()
  if (q.length < 2) return empty

  const ailab = TOOLS.filter((t) => t.hasPage !== false)
    .filter((t) => matches(q, t.name, t.tagline, t.id, t.tags, CATEGORY_LABEL[t.category]))
    .slice(0, PER_GROUP)
    .map((t) =>
      item(t.id, t.name, t.tagline || CATEGORY_LABEL[t.category] || 'AI Lab', t.icon || '🤖', 'AILAB', {
        category: t.category,
      }),
    )

  const deployment = STACKS.filter((s) => s.route)
    .filter((s) => matches(q, s.title, s.subtitle, s.desc, s.id, s.platforms, s.tags, s.stackType))
    .slice(0, PER_GROUP)
    .map((s) =>
      item(s.id, s.title, s.subtitle || s.platforms || 'Deployment guide', s.emoji || '🚀', 'DEPLOY', {
        path: s.route,
      }),
    )

  const tracks = CODE_GYM_TRACKS.filter((t) => matches(q, t.title, t.subtitle, t.id, t.keywords))
    .slice(0, PER_GROUP)
    .map((t) => item(t.id, t.title, t.subtitle, t.icon, 'TRACK'))

  const pages = HUB_PAGES.filter((p) => matches(q, p.title, p.subtitle, p.id, p.keywords))
    .slice(0, PER_GROUP)
    .map((p) => item(p.id, p.title, p.subtitle, p.icon, 'PAGE', { path: p.path }))

  return { ailab, deployment, tracks, pages }
}
