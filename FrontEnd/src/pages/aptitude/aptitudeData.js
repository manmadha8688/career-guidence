// Aptitude — static category metadata (like the Code Gym tracks, kept in the
// frontend). Topics themselves live in the database and are fetched via the API.
// The `id` matches the `category` value stored on each topic in Mongo.

export const APTITUDE_CATEGORIES = [
  {
    id: 'quantitative',
    label: 'Quantitative Aptitude',
    icon: '🧮',
    color: '#0EA5E9',
    tagline: 'Numbers, arithmetic & math-based problem solving',
    description: 'Master the maths that shows up in every placement test — percentages, time & work, speed, interest, probability and more.',
    chips: ['Percentages', 'Time & Work', 'Probability'],
  },
  {
    id: 'logical',
    label: 'Logical Reasoning',
    icon: '🧩',
    color: '#9B6ED4',
    tagline: 'Patterns, puzzles & step-by-step deduction',
    description: 'Train your thinking with series, blood relations, seating puzzles, syllogisms, coding-decoding and data sufficiency.',
    chips: ['Series', 'Blood Relations', 'Syllogisms'],
  },
  {
    id: 'verbal',
    label: 'Verbal Ability',
    icon: '📖',
    color: '#22C55E',
    tagline: 'English usage, comprehension & word reasoning',
    description: 'Sharpen reading comprehension, vocabulary, grammar, sentence completion, para jumbles and critical reasoning.',
    chips: ['Comprehension', 'Vocabulary', 'Para Jumbles'],
  },
  {
    id: 'data-interpretation',
    label: 'Data Interpretation',
    icon: '📊',
    color: '#F59E0B',
    tagline: 'Read charts, tables & graphs to answer questions',
    description: 'Learn to pull fast, accurate answers from bar graphs, pie charts, line graphs, tables and caselets.',
    chips: ['Bar Graphs', 'Pie Charts', 'Caselets'],
  },
]

export const APTITUDE_CATEGORY_MAP = Object.fromEntries(
  APTITUDE_CATEGORIES.map(c => [c.id, c])
)

export const DIFFICULTY_META = {
  easy:   { label: 'Easy',   color: '#4ADE80' },
  medium: { label: 'Medium', color: '#F59E0B' },
  hard:   { label: 'Hard',   color: '#C084FC' },
}

// Study priority — what a student should tackle first. Drives filtering + sort.
export const PRIORITY_META = {
  high:   { label: 'Must-know', short: 'High',   color: '#EF4444', rank: 0 },
  medium: { label: 'Important', short: 'Medium', color: '#F59E0B', rank: 1 },
  low:    { label: 'Advanced',  short: 'Low',    color: '#60A5FA', rank: 2 },
}

/** Sort topics for a category: high priority first, then syllabus order. */
export function sortTopics(topics) {
  const rank = (p) => (PRIORITY_META[p]?.rank ?? 1)
  return [...topics].sort((a, b) =>
    rank(a.priority) - rank(b.priority) || (a.order ?? 0) - (b.order ?? 0))
}
