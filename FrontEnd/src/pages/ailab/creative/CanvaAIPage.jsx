import ToolPageLayout from '../ToolPageLayout'
const tool = { id: 'canva-ai', category: 'creative', name: 'Canva AI', tagline: 'Design anything — AI-powered, no design skills needed', icon: '✨', color: '#00C4CC', free: true, freeTier: 'Free — Pro free for students via Canva for Education', officialUrl: 'https://canva.com' }
const videos = [{ label: 'Canva AI Features Complete Tutorial 2024', url: 'https://www.youtube.com/watch?v=Z_R3gJFjExg', duration: '20 min', note: 'All AI features covered with real examples' }]
const overview = `Canva is the most accessible design tool for non-designers, and its AI features make professional design genuinely possible without design training. Magic Media generates images and videos from text. Background Remover eliminates photo backgrounds in one click. Magic Resize adapts one design to every social media format instantly. For students building professional profiles, portfolios, and presentations, Canva AI removes the design skills barrier entirely. Apply for Canva for Education to get Pro access free with your college email.`
const sections = [{ content: `The single most useful thing students can do with Canva AI is applying for Canva for Education (canva.com/education). With a college email or student ID, you get full Canva Pro access — 610,000+ premium templates, unlimited storage, Magic Resize, background remover, all AI features, and premium content. This is worth approximately ₹5,000/year and is completely free for verified students.

Resume and portfolio design is where Canva provides the most immediate value. Professional resume templates that look designed — not like a Word document — are available for free and can be edited completely. The AI writing assistant suggests improved phrasing for bullet points. The drag-and-drop layout makes it easy to create multi-column designs that stand out without overwhelming content.

LinkedIn and GitHub profile visual assets are another high-value use case. Your LinkedIn banner (the wide image behind your profile photo) is one of the first things recruiters see. Canva has specific templates sized exactly for LinkedIn banners, GitHub profile READMEs, and Twitter/X headers. Spending 15 minutes creating a professional-looking banner makes your profile look significantly more polished than the default.

Magic Resize is one of the genuinely remarkable AI features. Design one asset — a portfolio project card, a skills infographic, a project announcement — and with one click, Canva resizes and reformats it for LinkedIn, Instagram, Twitter, and other platforms simultaneously. It reflows the layout intelligently rather than just scaling.` }]
const canDo = [
  'Design a resume that looks professionally designed, not like a Word template, in 30 minutes',
  'Create a LinkedIn banner that reflects your developer identity and makes your profile stand out',
  'Remove photo backgrounds for professional profile pictures instantly',
  'Generate visual assets for any platform from one original design using Magic Resize',
  'Get full Canva Pro free with your college email through Canva for Education',
]
const task = {
  title: 'Professional Developer Profile Visual Kit',
  description: 'Create a complete set of visual assets for your professional online presence: LinkedIn banner, GitHub profile README header, and a resume template.',
  steps: [
    'Apply for Canva for Education at canva.com/education (college email required)',
    'Create LinkedIn Banner: search "LinkedIn banner developer" in templates, customize with your name, role, and key skills',
    'Create GitHub README Header: search "GitHub profile banner", size to 1280×640px',
    'Create Resume: use a professional template, match colors to your portfolio',
    'Use Background Remover on your best headshot for all profiles',
    'Export all assets and update LinkedIn, GitHub, and your portfolio',
  ],
  cost: 'TOTAL COST: ₹0 — Canva for Education gives full Pro access free',
}
const tip = `Apply for Canva for Education before you need it. The verification can take 24-48 hours — so do it now while you have time. Once approved, download the Canva desktop app for a better experience than the web version. The desktop app is faster, works offline for basic editing, and integrates with your file system for easy export.`
export default function CanvaAIPage() {
  return <ToolPageLayout tool={tool} videos={videos} overview={overview} sections={sections} canDo={canDo} task={task} tip={tip} />
}
