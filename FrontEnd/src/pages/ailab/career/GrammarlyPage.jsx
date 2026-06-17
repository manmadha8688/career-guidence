import ToolPageLayout from '../ToolPageLayout'
const tool = { id: 'grammarly', category: 'career', name: 'Grammarly AI', tagline: 'AI writing assistant for professional communication', icon: '✏️', color: '#15C39A', free: true, freeTier: 'Free — core grammar and AI features included', officialUrl: 'https://grammarly.com' }
const videos = [
  { label: 'How to Use Generative AI in Grammarly — Enhance Writing with AI (2024)', url: 'https://www.youtube.com/watch?v=weZ9i_78TLM', duration: '~15 min', note: 'Best 2024 guide — generative AI features, rewrites, tone adjustment' },
  { label: 'Level Up Your Writing with Grammarly AI — 2024 Full Tutorial', url: 'https://www.youtube.com/watch?v=9kyxkwU6K5A', duration: '~20 min', note: 'Full feature walkthrough — browser extension, Gmail, Docs integration' },
  { label: 'How to Use Grammarly AI in 2024 (Quick & Easy!)', url: 'https://www.youtube.com/watch?v=8GcRvOyvVT4', duration: '~10 min', note: 'Quick practical intro — get started with Grammarly AI in under 10 minutes' },
]
const overview = `Grammarly checks grammar, improves clarity, adjusts tone, and rewrites sentences as you type — in Gmail, LinkedIn, Google Docs, and any website in your browser. For students writing job applications, LinkedIn messages, project documentation, and professional emails, Grammarly ensures everything is polished and error-free. The free tier includes the core grammar checking and basic AI suggestions that cover most student use cases.`
const sections = [{ content: `Install the Grammarly browser extension and it works everywhere you type online. No copy-pasting required — corrections appear inline as you type, similar to spell check but significantly more sophisticated. It catches not just spelling errors but grammatical mistakes, unclear phrasing, wordiness, and tone inconsistencies that spell check misses entirely.

The tone detector is particularly useful for professional communication. After writing a message, Grammarly shows you the tone it detects: confident, friendly, formal, direct, or various combinations. For a job application email, you want "confident and professional". For a follow-up message to a recruiter, "friendly and professional". Seeing the detected tone lets you adjust before sending.

The free rewrite feature takes a selected sentence and offers clearer, more concise alternatives. For students who write technically well but whose prose can be dense or awkward, this single feature improves communication significantly. Accept a suggestion, see how it changed, and gradually internalize the patterns that make writing clearer.

The free tier does not include the full AI generative features (drafting from scratch, longer rewrites) — those are Grammarly Premium ($12/month). The free tier covers grammar, clarity, correctness, and basic tone suggestions, which addresses the most common writing problems students face. For full AI generation, Claude and ChatGPT (both free) are better choices.` }]
const canDo = [
  'Write professional emails and LinkedIn messages that sound confident and error-free',
  'Catch grammar and clarity issues in cover letters before any recruiter reads them',
  'Check the tone of any message before sending — confirm it sounds professional not casual',
  'Improve technical writing clarity in project documentation and README files',
  'Get inline suggestions while writing in Gmail, Google Docs, LinkedIn, and any website',
]
const task = {
  title: 'Polish Your LinkedIn Summary',
  description: 'Rewrite your LinkedIn About section using Grammarly\'s suggestions plus ChatGPT for structure. Your LinkedIn About section is one of the first things recruiters read.',
  steps: [
    'Install Grammarly browser extension (grammarly.com)',
    'Open your LinkedIn profile, click Edit on the About section',
    'Write or paste your current About section',
    'Review all Grammarly suggestions: accept grammar fixes, review clarity suggestions',
    'Ask ChatGPT: "Improve this LinkedIn About section for a [role] student. Make it confident, specific, and under 200 words: [your text]"',
    'Combine the structural improvements from ChatGPT with Grammarly\'s grammar polish',
  ],
  cost: 'TOTAL COST: ₹0 — Grammarly free tier + ChatGPT free tier',
}
const tip = `Enable Grammarly in Google Docs specifically (it requires a separate step). In Google Docs, go to Extensions → Grammarly for Google Docs → Enable. This makes Grammarly available in your most important writing environment. Once enabled, every document you write in Google Docs gets real-time feedback.`
export default function GrammarlyPage() {
  return <ToolPageLayout tool={tool} videos={videos} overview={overview} sections={sections} canDo={canDo} task={task} tip={tip} />
}
