import { BookOpen, Wrench, Monitor, Lightbulb } from 'lucide-react'

export const REPORT_CATEGORIES = [
  {
    id: 'content',
    label: 'Content',
    hint: 'Wrong, missing, or incorrect material',
    icon: BookOpen,
    types: [
      { value: 'WRONG_CONTENT', label: 'Wrong or outdated content' },
      { value: 'MISSING_CONTENT', label: 'Content is missing' },
      { value: 'WRONG_ANSWER', label: 'Wrong answer or solution' },
      { value: 'NO_QUESTIONS', label: 'No quiz questions available' },
    ],
  },
  {
    id: 'bug',
    label: 'Broken',
    hint: 'Feature crashed or failed',
    icon: Wrench,
    types: [
      { value: 'BROKEN', label: 'Something is not working' },
    ],
  },
  {
    id: 'ui',
    label: 'Display',
    hint: 'Layout, text, or visual glitch',
    icon: Monitor,
    types: [
      { value: 'UI_ISSUE', label: 'UI or display problem' },
    ],
  },
  {
    id: 'idea',
    label: 'Idea',
    hint: 'Improvement or general feedback',
    icon: Lightbulb,
    types: [
      { value: 'SUGGESTION', label: 'Suggestion or improvement' },
      { value: 'OTHER', label: 'Something else' },
    ],
  },
]

export const REPORT_TYPE_LABELS = {
  WRONG_CONTENT: '✏️ Wrong content',
  MISSING_CONTENT: '📭 Missing content',
  WRONG_ANSWER: '❌ Wrong answer',
  NO_QUESTIONS: '❓ No questions',
  BROKEN: '🔧 Broken / not working',
  UI_ISSUE: '🖥️ UI / display',
  SUGGESTION: '💡 Suggestion',
  OTHER: '💬 Other',
}

export const ALL_REPORT_TYPES = REPORT_CATEGORIES.flatMap(c => c.types)
