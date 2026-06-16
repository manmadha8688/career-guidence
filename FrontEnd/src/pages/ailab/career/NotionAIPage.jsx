import ToolPageLayout from '../ToolPageLayout'
const tool = { id: 'notion-ai', category: 'career', name: 'Notion AI', tagline: 'AI writing assistant built directly into your notes', icon: '📝', color: '#475569', free: false, freeTier: '20 free AI responses, then $10/month', officialUrl: 'https://notion.so' }
const videos = [{ label: 'Notion AI Complete Tutorial 2024 — All Features', url: 'https://www.youtube.com/watch?v=pIFUYFYEFeg', duration: '20 min', note: 'Full walkthrough of all AI features with real examples' }]
const overview = `Notion AI adds AI writing, summarization, and editing capabilities directly inside Notion's note-taking and workspace platform. If you already use Notion for organizing your notes, tasks, and projects, AI features appear exactly where your content is — no switching tools. Summarize long meeting notes, improve your writing, draft first drafts, and get AI assistance without leaving your workspace.`
const sections = [{ content: `The core value of Notion AI is integration. When you take notes on a lecture, meeting, or research session, AI features are available inline — not in a separate chat window. Select any text and choose "Improve writing", "Make shorter", "Fix spelling and grammar", "Change tone to professional", or ask AI to add more detail. The AI works on your specific selected text, in context, without requiring you to switch applications or re-explain the context.

The summarization feature is the most frequently useful for students. After writing notes on a complex topic (or importing a large piece of text), ask Notion AI to "Summarize" and it produces a condensed version of the key points. For studying, this creates quick-review versions of detailed notes. For project management, it creates action items from meeting notes. For research, it extracts the main arguments from lengthy texts.

The 20 free responses are a genuine limitation — they are used quickly when you are actively working in Notion. However, the free responses are most useful for learning which AI features you use most and whether the tool fits your workflow. For students who write a lot — research, reports, project documentation, application essays — the $10/month is worth considering but not essential.

The alternative workflow for Notion users: write your notes in Notion, then paste specific sections into Claude or ChatGPT (both free) for AI assistance. Less seamless but identical in capability and free. Notion AI's value is the integration and workflow speed, not unique AI capability.` }]
const canDo = [
  'Improve any written content inline — without leaving your notes to use a separate AI tool',
  'Summarize long meeting notes into action items and key decisions automatically',
  'Draft first versions of emails, reports, and documents from bullet point outlines',
  'Change the tone of any writing — from casual to professional — in one click',
  'Extract action items and decisions from messy, comprehensive meeting notes',
]
const task = {
  title: 'Meeting Notes Processor',
  description: 'Use Notion AI to transform a set of rough meeting or lecture notes into a structured summary with key points and action items.',
  steps: [
    'Take your messiest set of recent notes from a meeting, lecture, or brainstorming session',
    'Paste them into Notion',
    'Use AI Summary to get a condensed version',
    'Use AI to "Find action items" from the notes',
    'Compare the AI summary to your own mental model of what was important',
    'Note: what did AI correctly identify? What did it miss?',
  ],
  cost: '20 free AI responses included — sufficient for this task',
}
const tip = `If Notion AI's 20 free responses are not enough for your regular workflow, the same AI capabilities are available free in Claude or ChatGPT — just with an extra step of copying and pasting. Decide based on your actual usage: if you would use AI assistance more than 20 times a month in Notion, the subscription is worthwhile. If not, the free tools handle it.`
export default function NotionAIPage() {
  return <ToolPageLayout tool={tool} videos={videos} overview={overview} sections={sections} canDo={canDo} task={task} tip={tip} />
}
