import ToolPageLayout from '../ToolPageLayout'
const tool = { id: 'gamma', category: 'creative', name: 'Gamma.app', tagline: 'AI creates beautiful presentations from your text', icon: '📊', color: '#7C3AED', free: true, freeTier: 'Free — 400 AI credits on signup', officialUrl: 'https://gamma.app' }
const videos = [
  { label: 'Full Gamma AI App Tutorial For Beginners (2024)', url: 'https://www.youtube.com/watch?v=FJGCaTjB5x4', duration: '~20 min', note: 'Best beginner tutorial — prompt to polished presentation end to end' },
  { label: 'Forget PowerPoint! The BEST AI Tool for Stunning Presentations — Gamma.app', url: 'https://www.youtube.com/watch?v=sDUjoih6JgA', duration: '~15 min', note: 'Why Gamma beats PowerPoint + full feature walkthrough' },
  { label: 'How to Use Gamma AI — Full Tutorial for Presentations, Websites & More', url: 'https://www.youtube.com/watch?v=KcbXKUR7-a0', duration: '~20 min', note: 'Presentations, websites, and docs — covers all output types in Gamma' },
]
const overview = `Gamma.app generates complete, visually polished presentations from a text prompt. Type "Create a 10-slide presentation about React hooks for a beginner audience", choose a design style, and Gamma builds the entire deck in 60 seconds — with slide content, design, layout, and images. Export to PowerPoint or PDF for submission. For students who spend hours making slides look professional, Gamma reduces this to minutes.`
const sections = [{ content: `The generation process takes three inputs: your topic or outline, the design style you want, and the number of slides. Gamma drafts a complete presentation structure, then generates each slide with appropriate content. You can edit any slide afterward — change text, rearrange elements, add your own images, modify the design. The starting point is usually 80-90% usable, making this dramatically faster than starting from a blank slide.

Beyond presentations, Gamma generates web pages and documents. A "document" in Gamma is a scrollable webpage with the same professional styling — useful for project proposals, reports, and portfolio showcases that need to be shared as a link rather than downloaded. These can be embedded in other websites or shared as standalone URLs.

The free tier gives 400 credits on signup. Generating a presentation costs 40-100 credits depending on length. You can extend free credits through referrals or by using the slower (but still fast) non-AI generation mode. The paid tier ($8/month) removes limits for frequent users, but the free tier covers multiple presentation projects.

For technical presentations specifically, Gamma handles code blocks, technical diagrams, and bulleted technical content well. Ask it to create a presentation on a technical topic and it includes appropriate technical vocabulary, logical structure, and code-friendly formatting. This makes it useful for project demos, technical seminars, and capstone presentations.` }]
const canDo = [
  'Create a complete presentation for any project or topic in under 2 minutes',
  'Generate web pages and documents that can be shared as links — not just downloaded files',
  'Export to PowerPoint for submission or further editing in familiar tools',
  'Make technical presentations that look professionally designed without design skills',
  'Use for final year project demos, seminar presentations, and client project showcases',
]
const task = {
  title: 'Project Demo Presentation',
  description: 'Create a presentation for your most important portfolio project using Gamma. Make it good enough to actually use in an interview or project demo.',
  steps: [
    'Sign up at gamma.app (free account with 400 credits)',
    'Click "Generate" and type: "Presentation about [your project]: a [what it does] built with [tech stack]. Include: problem it solves, features, architecture, challenges, and future improvements. 10 slides for a technical audience."',
    'Choose a design style (dark tech theme works well for developer projects)',
    'Review and edit the generated slides — add your actual screenshots and specific details',
    'Export to PDF for safekeeping',
    'Share the Gamma link — it works as a live, shareable portfolio artifact',
  ],
  cost: 'TOTAL COST: ₹0 — covered by the 400 free credits',
}
const tip = `Gamma presentations have shareable URLs. Instead of attaching a PowerPoint to job applications, share the Gamma link — it opens instantly in a browser, looks better than a local file, and works on any device. Put the Gamma presentation link in your resume and GitHub repository README for each project.`
export default function GammaPage() {
  return <ToolPageLayout tool={tool} videos={videos} overview={overview} sections={sections} canDo={canDo} task={task} tip={tip} />
}
