/** Human-readable page title from route. */
export function getReportPageTitle(pathname) {
  if (pathname.startsWith('/skill-arena/quiz/result')) return 'Quiz Result'
  if (pathname.startsWith('/skill-arena/quiz')) return 'Quiz'
  if (pathname.startsWith('/skill-arena/roadmaps')) return 'Hunter Path Detail'
  if (pathname.startsWith('/skill-arena')) return 'Skill Arena'
  if (pathname.startsWith('/problem-solving') && pathname.length > 16) return 'Code GYM — Problem'
  if (pathname.startsWith('/problem-solving')) return 'Code GYM'
  if (pathname.startsWith('/missions') && pathname.length > 9) return 'Mission Detail'
  if (pathname.startsWith('/missions')) return 'Mission Board'
  if (pathname.startsWith('/fresher-instructions/career-guidance')) return 'Career Guidance'
  if (pathname.startsWith('/fresher-instructions')) return 'Fresher Guide'
  if (pathname.startsWith('/ai-lab')) return 'AI Lab'
  if (pathname.startsWith('/deployment')) return 'Deployment Guide'
  if (pathname.startsWith('/walk-ins')) return 'Walk-Ins'
  if (pathname.startsWith('/jobs')) return 'Jobs'
  if (pathname === '/') return 'Landing Page'
  return pathname.replace(/^\//, '').replace(/\//g, ' › ') || 'Unknown page'
}

/** Structured context attached to every report — helps admins reproduce issues. */
export function buildReportContext(pathname, search) {
  const params = new URLSearchParams(search)
  const ctx = {
    fullUrl: pathname + (search || ''),
    viewport: `${window.innerWidth}×${window.innerHeight}`,
    platform: navigator.platform || '',
  }

  const view = params.get('view')
  const subject = params.get('subject')
  const concept = params.get('concept')
  if (view) ctx.dashboardView = view
  if (subject) ctx.subjectId = subject
  if (concept) ctx.conceptId = concept

  const quizMatch = pathname.match(/\/skill-arena\/quiz\/([^/]+)\/([^/]+)/)
  if (quizMatch) {
    ctx.quizType = quizMatch[1]
    ctx.quizRefId = quizMatch[2]
  }

  const problemMatch = pathname.match(/\/problem-solving\/[^/]+\/([^/]+)/)
  if (problemMatch) ctx.problemId = problemMatch[1]

  const missionMatch = pathname.match(/\/missions\/([^/]+)/)
  if (missionMatch) ctx.missionId = missionMatch[1]

  return ctx
}

/** Short summary lines shown in the report form preview. */
export function formatContextPreview(ctx) {
  const lines = []
  if (ctx.dashboardView) lines.push(`View: ${ctx.dashboardView}`)
  if (ctx.subjectId) lines.push(`Subject: ${ctx.subjectId}`)
  if (ctx.conceptId) lines.push(`Concept: ${ctx.conceptId}`)
  if (ctx.quizType) lines.push(`Quiz: ${ctx.quizType} / ${ctx.quizRefId}`)
  if (ctx.problemId) lines.push(`Problem: ${ctx.problemId}`)
  if (ctx.missionId) lines.push(`Mission: ${ctx.missionId}`)
  lines.push(`Screen: ${ctx.viewport}`)
  return lines
}
