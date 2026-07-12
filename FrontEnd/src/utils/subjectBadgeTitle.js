// Turns a subject name into a creative "hunter title" for badges — so a mastered
// subject reads as an earned rank ("Serpent Sovereign") rather than just the
// syllabus name ("Python Fundamentals"). Keyword-matched (most specific first)
// so every subject in the catalogue gets a fitting title, with a themed fallback.
const TITLE_RULES = [
  [/django\s*rest|drf/,                         'API Archon'],
  [/django/,                                    'Full-Stack Druid'],
  [/spring\s*boot|spring/,                      'Backend Berserker'],
  [/express|node/,                              'Runtime Ranger'],
  [/react/,                                     'Component Conjurer'],
  [/type\s*script|\btsx?\b/,                    'Type Sentinel'],
  [/java\s*script|\bjs\b/,                      'Script Phantom'],
  [/\bhtml\b/,                                  'Markup Architect'],
  [/\bcss\b/,                                   'Style Sorcerer'],
  [/oop|object.?oriented/,                      'Class Commander'],
  [/py\s*torch/,                                'Tensor Templar'],
  [/deep\s*learning/,                           'Neural Nomad'],
  [/pandas|numpy/,                              'Dataframe Sage'],
  [/feature\s*engineering|model\s*(eval|valid)|mlops|machine\s*learning|\bml\b/, 'Model Mystic'],
  [/nlp|text\s*process/,                        'Language Luminary'],
  [/llm|langchain|prompt|rag|vector|hugging\s*face|fastapi|ai\s*agent/, 'Prompt Paladin'],
  [/mongo/,                                     'Document Dominus'],
  [/sql|database/,                              'Query Warden'],
  [/docker|container|kubernetes/,               'Container Captain'],
  [/git|github/,                                'Version Vanguard'],
  [/power\s*bi|tableau|visuali|business\s*intel|kpi/, 'Insight Illuminator'],
  [/excel|sheets/,                              'Spreadsheet Strategist'],
  [/statistic|probability/,                     'Probability Prophet'],
  [/python/,                                    'Serpent Sovereign'],
]

// Tier suffix nuance from the level word in the subject name.
function tierOf(name) {
  const n = name.toLowerCase()
  if (/advanced|professional|expert/.test(n)) return 'Master'
  if (/intermediate/.test(n)) return 'Adept'
  return 'Ascendant'
}

export function subjectBadgeTitle(subjectName = '') {
  const name = subjectName.toLowerCase()
  const hit = TITLE_RULES.find(([re]) => re.test(name))
  return hit ? hit[1] : `${tierOf(subjectName)} Sovereign`
}

export default subjectBadgeTitle
