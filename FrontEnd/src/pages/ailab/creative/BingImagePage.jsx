import ToolPageLayout from '../ToolPageLayout'
const tool = { id: 'dalle-free', category: 'creative', name: 'Bing Image Creator', tagline: 'DALL-E 3 image generation — completely free', icon: '🎨', color: '#EC4899', free: true, freeTier: '100% Free — Microsoft account required', officialUrl: 'https://www.bing.com/images/create' }
const videos = [
  { label: 'How to Use OpenAI\'s DALL-E 3 AI Image Generator for FREE — Bing Image Creator', url: 'https://www.youtube.com/watch?v=Suwl5w_PfjA', duration: '~12 min', note: 'Best guide — free access via Bing, prompts, quality settings explained' },
  { label: 'DALL-E 3 in Microsoft Bing Image Creator — Full Walkthrough', url: 'https://www.youtube.com/watch?v=mL7R23aG7lQ', duration: '~15 min', note: 'All features, prompt tips, and creative styles covered' },
  { label: 'Bing Image Creator Tutorial — FREE AI Image Generator 2024', url: 'https://www.youtube.com/watch?v=uVqTlioHeFU', duration: '~12 min', note: 'Beginner-friendly — from signup to first generation in minutes' },
]
const overview = `Bing Image Creator uses DALL-E 3 — the same model powering ChatGPT's paid image generation — completely free. Sign in with a Microsoft account and you get 15 fast generations per day, then unlimited slower generations. For students who need professional visuals for projects, presentations, and portfolios, this is the best free option available. Quality matches paid DALL-E 3 exactly.`
const sections = [{ content: `DALL-E 3 produces significantly better results than older image AI models at following specific instructions and producing coherent, photorealistic or stylized images. The key to good results is specific, detailed prompts — not "a developer", but "a focused software developer at a modern standing desk in a dark-themed home office, dual monitors with code visible, soft neon lighting, photorealistic, professional photography style, 4K".

Prompt anatomy for consistent results: subject (what/who is in the image) + environment (where/setting) + style (photorealistic, flat design, 3D render, watercolor, etc.) + lighting (natural light, neon glow, golden hour) + quality modifiers (ultra-detailed, 4K, professional photography). Including all five components significantly increases the chance of getting a usable result on the first try.

For UI and design projects, DALL-E 3 is useful for generating visual assets: header images for web applications, presentation slide backgrounds, social media post visuals, portfolio project thumbnails, and icon concepts. The flat design and vector style prompts produce clean, professional results that look designed rather than photographed.

The intellectual property situation: images generated through Bing Image Creator can generally be used for personal and commercial projects. Microsoft's terms allow this, though you should review them for any commercial use. Images are not copyrighted by you (you did not create them), but you are generally free to use them.` }]
const canDo = [
  'Generate professional project thumbnails, portfolio banners, and presentation images for free',
  'Create UI concept visuals and mockup images without design skills',
  'Produce social media and GitHub profile visual assets',
  'Design logo concepts and visual identity elements for projects',
  'Generate 15 high-quality images per day for any creative need',
]
const task = {
  title: 'Visual Assets for Your Portfolio Project',
  description: 'Generate 5 professional visual assets for your best portfolio project using Bing Image Creator: a hero banner, a features illustration, a tech stack visualization concept, a social media card, and an icon or logo concept.',
  steps: [
    'Sign in at bing.com/images/create with Microsoft account',
    'Generate hero banner: "[project name] web application, modern dark UI, [tech stack] code visible, professional, ultra-detailed"',
    'Generate features illustration: "infographic showing [3 main features], clean flat design, dark background, teal and purple accents"',
    'Generate social media card: "developer portfolio card for [your name], clean modern design, code aesthetic"',
    'Generate logo concept: "minimalist logo for [project name], geometric, dark background, [your chosen color]"',
    'Use the best results in your portfolio README and presentation',
  ],
  cost: 'TOTAL COST: ₹0 — Bing Image Creator is completely free with a Microsoft account',
}
const tip = `When Bing Image Creator blocks a prompt (rare), rephrase it to be more neutral. Instead of "hacker in a dark room", try "software developer working late at night with multiple monitors". The content filters are sensitive to certain words even in benign contexts — focus on describing what you want to see visually rather than who is doing what.`
export default function BingImagePage() {
  return <ToolPageLayout tool={tool} videos={videos} overview={overview} sections={sections} canDo={canDo} task={task} tip={tip} />
}
