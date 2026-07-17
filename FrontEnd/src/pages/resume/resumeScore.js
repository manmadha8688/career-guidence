/**
 * Resume scorer — deterministic, 100% in-browser (no API, nothing uploaded).
 *
 * The model mirrors how real ATS checkers actually grade resumes (Jobscan's
 * match rate + Resume Worded's Score-My-Resume), grounded in 2024–2026 research:
 *
 *   • Content & keyword relevance — 50%  (the dominant real ranking signal;
 *       hard-skill match to the JD is weighted highest, then verbs/metrics)
 *   • ATS parse-readiness / format — 30%  (can the machine read it cleanly)
 *   • Completeness & hygiene       — 20%  (sections a recruiter expects, length)
 *
 * Honest framing (per the research): a low score means the resume may PARSE
 * poorly or RANK lower — NOT that "a bot auto-rejects you" (that, and the
 * "75% never seen by a human" line, are debunked myths). Our generated PDF is
 * single-column, real selectable text with standard headings and contact in the
 * body, so it legitimately earns a high parse score.
 *
 * Because the builder holds the resume as structured JSON, we grade the data
 * directly — more reliable than an ATS re-parsing a designed PDF.
 */

// Strong achievement verbs that should open a bullet (Harvard / Resume Worded).
const STRONG_VERBS = new Set([
  'built', 'created', 'developed', 'designed', 'implemented', 'led', 'managed',
  'improved', 'increased', 'reduced', 'optimized', 'automated', 'launched',
  'delivered', 'engineered', 'architected', 'integrated', 'migrated', 'refactored',
  'analyzed', 'streamlined', 'boosted', 'cut', 'achieved', 'drove', 'shipped',
  'maintained', 'coordinated', 'debugged', 'resolved', 'enhanced', 'scaled',
  'initiated', 'spearheaded', 'organized', 'presented', 'trained', 'mentored',
  'researched', 'modeled', 'configured', 'programmed', 'generated', 'processed',
  'deployed', 'transformed', 'accelerated', 'redesigned', 'established', 'led',
])

// Weak / passive openers that ATS content checkers penalize.
const WEAK_OPENERS = new Set([
  'assisted', 'helped', 'responsible', 'worked', 'involved', 'participated',
  'tasked', 'supported', 'contributed', 'aided', 'attempted', 'tried',
])

// Clichés / filler recruiters and checkers flag as empty words.
const CLICHES = [
  'team player', 'hard worker', 'hardworking', 'go-getter', 'detail-oriented',
  'detail oriented', 'self-starter', 'self starter', 'think outside the box',
  'synergy', 'results-driven', 'go getter', 'fast learner', 'quick learner',
  'passionate', 'motivated individual', 'dynamic', 'proactive', 'multitasking',
]

// A quantified result: %, multiplier, money, or a counted quantity/unit.
const RE_METRIC = /(\d+(\.\d+)?\s*%|\b\d+(\.\d+)?\s*(x|×)\b|[$₹]\s?\d|\b\d[\d,]*\s*(users?|customers?|clients?|records?|rows?|requests?|queries|transactions?|ms|seconds?|minutes?|hours?|days?|weeks?|months?|projects?|apis?|endpoints?|models?|tests?|bugs?|downloads?|k\b|m\b|k\+))/i
const RE_PRONOUN = /\b(i|me|my|myself|we|our)\b/i

// Canonical skill → aliases. Drives JD keyword matching so the "missing" list
// stays meaningful. Covers the platform's domains: web, python, data/ML, cloud, DB, tooling.
const SKILLS = {
  javascript: ['javascript', 'js', 'es6', 'ecmascript'], typescript: ['typescript', 'ts'],
  react: ['react', 'react.js', 'reactjs'], 'next.js': ['next.js', 'nextjs', 'next js'],
  'node.js': ['node.js', 'nodejs', 'node js', 'node'], express: ['express', 'express.js', 'expressjs'],
  redux: ['redux'], vue: ['vue', 'vue.js', 'vuejs'], angular: ['angular'], svelte: ['svelte'],
  html: ['html', 'html5'], css: ['css', 'css3'], sass: ['sass', 'scss'],
  tailwind: ['tailwind', 'tailwindcss'], bootstrap: ['bootstrap'], 'material ui': ['material ui', 'mui'],
  'rest api': ['rest', 'rest api', 'restful', 'rest apis'], graphql: ['graphql'],
  python: ['python'], java: ['java'], 'c++': ['c++', 'cpp'], 'c#': ['c#', 'csharp'],
  c: ['c language'], go: ['golang', 'go lang'], php: ['php'], ruby: ['ruby'],
  kotlin: ['kotlin'], swift: ['swift'], dart: ['dart'], r: ['r language'],
  flutter: ['flutter'], 'react native': ['react native'], laravel: ['laravel'], rails: ['rails', 'ruby on rails'],
  sql: ['sql'], mysql: ['mysql'], postgresql: ['postgresql', 'postgres', 'psql'],
  mongodb: ['mongodb', 'mongo'], redis: ['redis'], firebase: ['firebase'], supabase: ['supabase'],
  'sql server': ['sql server', 'mssql'], oracle: ['oracle db', 'oracle database'], sqlite: ['sqlite'],
  django: ['django'], flask: ['flask'], fastapi: ['fastapi', 'fast api'],
  'spring boot': ['spring boot', 'springboot', 'spring'],
  pandas: ['pandas'], numpy: ['numpy'], matplotlib: ['matplotlib'], seaborn: ['seaborn'],
  'scikit-learn': ['scikit-learn', 'sklearn', 'scikit learn'], tensorflow: ['tensorflow'],
  pytorch: ['pytorch'], keras: ['keras'], opencv: ['opencv'], xgboost: ['xgboost'],
  'machine learning': ['machine learning', 'ml'], 'deep learning': ['deep learning'],
  nlp: ['nlp', 'natural language processing'], 'computer vision': ['computer vision'],
  'data analysis': ['data analysis', 'data analytics', 'analytics'],
  'data visualization': ['data visualization', 'data viz'],
  'power bi': ['power bi', 'powerbi'], tableau: ['tableau'], excel: ['excel', 'spreadsheets'],
  statistics: ['statistics', 'statistical'], 'a/b testing': ['a/b testing', 'ab testing'],
  docker: ['docker'], kubernetes: ['kubernetes', 'k8s'], aws: ['aws', 'amazon web services'],
  azure: ['azure'], gcp: ['gcp', 'google cloud'], vercel: ['vercel'], netlify: ['netlify'],
  git: ['git', 'github', 'gitlab', 'version control'], jenkins: ['jenkins'],
  'ci/cd': ['ci/cd', 'cicd', 'ci cd', 'continuous integration'], terraform: ['terraform'],
  linux: ['linux', 'unix', 'bash', 'shell'], nginx: ['nginx'], kafka: ['kafka'],
  spark: ['spark', 'apache spark'], hadoop: ['hadoop'],
  agile: ['agile', 'scrum'], jira: ['jira'], figma: ['figma'],
  jest: ['jest'], pytest: ['pytest'], junit: ['junit'], selenium: ['selenium'], cypress: ['cypress'],
  api: ['api', 'apis'], microservices: ['microservices', 'microservice'], oop: ['oop', 'object oriented'],
  'data structures': ['data structures', 'dsa', 'algorithms'], 'problem solving': ['problem solving'],
  jwt: ['jwt'], oauth: ['oauth'], websocket: ['websocket', 'websockets'], webpack: ['webpack'], vite: ['vite'],
  llm: ['llm', 'llms', 'large language model', 'gpt', 'openai'], langchain: ['langchain'],
  rag: ['rag', 'retrieval augmented generation'], 'vector database': ['vector database', 'pinecone', 'chromadb'],
  // soft skills (JD-relevant but lower weight)
  communication: ['communication'], leadership: ['leadership'], teamwork: ['teamwork', 'collaboration'],
}
const SOFT = new Set(['communication', 'leadership', 'teamwork', 'problem solving'])

const clean = (s) => String(s || '').trim()
const words = (s) => clean(s).split(/\s+/).filter(Boolean)
const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const looksLikeUrl = (v) => !v || /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i.test(clean(v))
const pct = (n) => Math.max(0, Math.min(100, Math.round(n)))
// Weighted average of [weight, fraction] pairs → 0..100.
const weigh = (pairs) => {
  const w = pairs.reduce((s, [x]) => s + x, 0)
  return w ? pct((pairs.reduce((s, [x, f]) => s + x * f, 0) / w) * 100) : 0
}

// Normalize free text for phrase scanning (keep + # . for c++, c#, node.js).
const normalize = (t) => ` ${String(t || '').toLowerCase().replace(/[^a-z0-9+#. ]/g, ' ').replace(/\s+/g, ' ').trim()} `

function detectSkills(text) {
  const n = normalize(text)
  const found = new Set()
  for (const [canon, aliases] of Object.entries(SKILLS)) {
    if (aliases.some((a) => n.includes(` ${a} `))) found.add(canon)
  }
  return found
}

function gatherResumeText(r) {
  return [
    r.objective,
    ...(r.skills || []).flatMap((s) => [s.category, s.value]),
    ...(r.projects || []).flatMap((p) => [p.name, ...(p.points || [])]),
    ...(r.internships || []).flatMap((it) => [it.role, it.company, ...(it.points || [])]),
    ...(r.achievements || []), ...(r.certificates || []), ...(r.softSkills || []),
    ...(r.education || []).flatMap((e) => [e.degree, e.branch]),
  ].filter(Boolean).join(' ')
}

/**
 * @param {object} resume  the builder's resume object
 * @param {string} [jdText] optional job description to match against
 */
export function scoreResume(resume, jdText = '') {
  const r = resume || {}
  const checks = []
  const add = (ok, sev, msg) => checks.push({ ok, sev, msg })

  const edu = (r.education || []).filter((e) => e && (e.degree || e.branch || e.college))
  const skills = (r.skills || []).filter((s) => s && (s.category || s.value))
  const projects = (r.projects || []).filter((p) => p && (p.name || (p.points || []).some(Boolean)))
  const internships = (r.internships || []).filter((it) => it && (it.role || it.company || (it.points || []).some(Boolean)))
  const achievements = (r.achievements || []).filter(Boolean)
  const certificates = (r.certificates || []).filter(Boolean)
  const softSkills = (r.softSkills || []).filter(Boolean)
  const emailOk = reEmail.test(clean(r.email))
  const hasExperience = internships.length > 0
  const hasSkillsSec = skills.length > 0
  const hasProjOrExp = projects.length > 0 || hasExperience

  // ══ 1. ATS PARSE-READINESS (30%) — can the machine read & sort it ══
  // Our PDF is single-column, real text, standard headings, contact in body → the
  // format factor is genuinely satisfied. The variable parts are contact & sections.
  const linkFields = [['LinkedIn', r.linkedin], ['GitHub', r.github], ['Portfolio', r.portfolio]]
  const badLinks = linkFields.filter(([, v]) => v && !looksLikeUrl(v))
  const contactFrac = (emailOk ? 0.5 : 0) + (clean(r.mobile) ? 0.25 : 0) + ((clean(r.linkedin) || clean(r.github)) ? 0.25 : 0)
  const sectionsFrac = ((edu.length ? 1 : 0) + (hasSkillsSec ? 1 : 0) + (hasProjOrExp ? 1 : 0)) / 3
  const datesFrac = (() => {
    const hasEduDate = edu.some((e) => clean(e.years))
    const hasExpDate = !hasExperience || internships.some((it) => clean(it.duration))
    return ((hasEduDate ? 1 : 0) + (hasExpDate ? 1 : 0)) / 2
  })()
  const ats = weigh([
    [25, 1],                              // machine-readable format (guaranteed by our generator)
    [25, contactFrac],                    // parseable contact info in the body
    [25, sectionsFrac],                   // standard sections present (Education/Skills/Experience)
    [15, datesFrac],                      // dates present for parsing / chronology
    [10, badLinks.length ? 0 : 1],        // clean, valid links
  ])
  if (!emailOk) add(false, 'med', 'Add your email address so you can be contacted.')
  if (!clean(r.mobile)) add(false, 'low', 'Add your phone number.')
  if (!clean(r.linkedin) && !clean(r.github)) add(false, 'low', 'Add a LinkedIn or GitHub link.')
  if (sectionsFrac < 1) add(false, 'low', 'Fill in your Education, Skills and Projects.')
  if (badLinks.length) add(false, 'low', `Check your ${badLinks.map(([k]) => k).join(' and ')} link — it looks incomplete.`)

  // ══ 2. CONTENT QUALITY (part of the 50%) — impact, verbs, brevity, clean language ══
  const bullets = [
    ...projects.flatMap((p) => p.points || []),
    ...internships.flatMap((it) => it.points || []),
    ...achievements,
  ].map(clean).filter(Boolean)

  let content
  if (!bullets.length) {
    content = 0
    add(false, 'low', 'Add a few points under your projects describing what you built.')
  } else {
    const n = bullets.length
    let strong = 0, weak = 0, metric = 0, goodLen = 0, cliche = 0, pronoun = 0, tooLong = 0
    bullets.forEach((b) => {
      const w = words(b)
      const first = (w[0] || '').toLowerCase().replace(/[^a-z]/g, '')
      if (STRONG_VERBS.has(first)) strong++
      if (WEAK_OPENERS.has(first)) weak++
      if (RE_METRIC.test(b)) metric++
      if (w.length >= 6 && w.length <= 30) goodLen++
      else if (w.length > 30) tooLong++
      const low = b.toLowerCase()
      if (CLICHES.some((c) => low.includes(c))) cliche++
      if (RE_PRONOUN.test(b)) pronoun++
    })
    content = weigh([
      [30, metric / n],                                   // quantified achievements (highest content signal)
      [30, Math.max(0, (strong - weak) / n)],             // strong openers, penalize weak/passive
      [20, goodLen / n],                                  // brevity (~6–30 words)
      [20, 1 - Math.min(1, (cliche + pronoun) / n)],      // no clichés / no first-person pronouns
    ])
    // Short, plain, encouraging tips — no rewrites, no jargon.
    add(metric / n >= 0.4, metric / n >= 0.4 ? 'low' : 'med',
      'Add a number or two to your project points — like users, %, or how much faster it got.')
    add(weak === 0 && strong / n >= 0.5, 'low',
      'Start each point with an action word like Built, Made, Designed or Led.')
    if (cliche) add(false, 'low',
      'Try swapping filler words like “team player” or “hardworking” for something you actually did.')
    if (pronoun) add(false, 'low',
      'You can drop words like “I”, “my” and “we” — resumes usually skip them.')
    if (tooLong) add(false, 'low',
      'Keep each point short — about one line is perfect.')
  }

  // ══ 3. COMPLETENESS & HYGIENE (20%) — sections + length + hard requirements ══
  const objLen = words(r.objective).length
  const skillCount = skills.length
  // Rough one-page estimate (freshers should fit one page).
  const estLines = 4 + Math.ceil(objLen / 14) + edu.length * 2 + skillCount + projects.reduce((s, p) => s + 2 + (p.points || []).filter(Boolean).length, 0) + internships.reduce((s, it) => s + 2 + (it.points || []).filter(Boolean).length, 0) + achievements.length + certificates.length + (softSkills.length ? 1 : 0)
  const lengthFrac = estLines <= 52 ? 1 : estLines <= 62 ? 0.6 : 0.3
  const completeness = weigh([
    [8, clean(r.fullName) ? 1 : 0],
    [7, emailOk ? 1 : 0],
    [5, clean(r.mobile) ? 1 : 0],
    [8, clean(r.linkedin) ? 1 : 0],
    [6, clean(r.github) ? 1 : 0],
    [8, objLen >= 20 ? 1 : objLen > 0 ? 0.5 : 0],
    [12, edu.length ? 1 : 0],
    [12, skillCount >= 4 ? 1 : skillCount / 4],
    [16, projects.length >= 2 ? 1 : projects.length ? 0.6 : 0],
    [8, hasExperience || achievements.length ? 1 : 0],
    [5, certificates.length ? 1 : 0],
    [5, lengthFrac],
  ])
  if (!clean(r.linkedin)) add(false, 'low', 'Add your LinkedIn link.')
  if (objLen < 20) add(false, 'low', 'Add a short 2–3 line objective about what you’re looking for.')
  if (skillCount < 4) add(false, 'low', 'Add a few more skills grouped by type (languages, tools, etc.).')
  if (projects.length < 2) add(false, 'low', 'Add a second project if you have one — projects are your strongest signal.')
  if (!hasExperience && !achievements.length) add(false, 'low', 'Add an internship or an achievement if you have one.')
  if (estLines > 62) add(false, 'low', 'Your resume is getting long — try to keep it to one page.')

  // ══ 4. OPTIONAL JD MATCH (Jobscan-style, keyword-based, 80% target) ══
  let jd = null
  if (clean(jdText)) {
    const jdSkills = detectSkills(jdText)
    if (jdSkills.size) {
      const mine = detectSkills(gatherResumeText(r))
      // Hard skills weighted higher than soft skills (mirrors Jobscan's ordering).
      const wOf = (s) => (SOFT.has(s) ? 1 : 2)
      const totalW = [...jdSkills].reduce((s, k) => s + wOf(k), 0)
      const gotW = [...jdSkills].filter((k) => mine.has(k)).reduce((s, k) => s + wOf(k), 0)
      const matched = [...jdSkills].filter((s) => mine.has(s))
      const missing = [...jdSkills].filter((s) => !mine.has(s))
      jd = { score: pct((gotW / totalW) * 100), target: 80, matched, missing }
      if (jd.score < 80 && missing.length) {
        add(false, 'low', `Add any of these skills you truly have: ${missing.slice(0, 6).join(', ')}.`)
      }
    } else {
      jd = { score: null, target: 80, matched: [], missing: [], note: 'No recognizable skills detected in that job description.' }
    }
  }

  // ══ Overall — research weights: content&keyword 50 · ATS-readiness 30 · completeness 20 ══
  // "content&keyword" blends generic content quality with JD match when a JD is present.
  const contentBlend = jd && jd.score != null ? content * 0.4 + jd.score * 0.6 : content
  const overall = pct(contentBlend * 0.5 + ats * 0.3 + completeness * 0.2)

  const rank = { high: 0, med: 1, low: 2 }
  const issues = checks.filter((c) => !c.ok).sort((a, b) => rank[a.sev] - rank[b.sev])

  return {
    overall, ats, content, completeness,
    bulletCount: bullets.length,
    passed: checks.filter((c) => c.ok).length,
    total: checks.length,
    issues, jd,
  }
}
