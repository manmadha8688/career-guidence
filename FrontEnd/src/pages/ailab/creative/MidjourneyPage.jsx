import ToolPageLayout from '../ToolPageLayout'
const tool = { id: 'midjourney', category: 'creative', name: 'Midjourney', tagline: 'Professional-grade AI art generation — the tool creatives actually use', icon: '🎨', color: '#F59E0B', free: false, freeTier: 'From $10/month', officialUrl: 'https://midjourney.com' }
const videos = [
  { label: 'The ULTIMATE Beginner\'s Guide to Midjourney in 2025', url: 'https://www.youtube.com/watch?v=q2NP5M7FOL0', duration: '~35 min', note: 'Complete walkthrough — web app, /imagine command, parameters, and prompt techniques for stunning results' },
  { label: '2025 Midjourney Full Guide — Beginner to Pro', url: 'https://www.youtube.com/watch?v=NM_pnGGdsac', duration: '~40 min', note: 'Covers everything from first image to advanced stylization — the most thorough single guide available' },
  { label: 'Midjourney AI Tutorial for 2025 (Step-by-Step for Beginners!)', url: 'https://www.youtube.com/watch?v=CrP6ANileFw', duration: '~20 min', note: 'Beginner-friendly — turning text prompts into professional images, aspect ratios, and version settings' },
]
const overview = `Midjourney is the AI image generator that professional designers, concept artists, and creative directors actually pay for. While competitors offer free tiers, Midjourney's image quality is so far ahead that hundreds of thousands of creatives choose to pay $10–$120/month just for access. The results have a distinct cinematic quality — correct lighting, coherent composition, and a level of aesthetic polish that feels intentional rather than random.

Originally Discord-only, Midjourney now has a full web app at midjourney.com with a gallery, editor, and prompt history. You no longer need to join a Discord server to use it. The web interface makes it significantly more accessible for beginners and more productive for power users.`
const sections = [{ content: `The core workflow is simple: go to midjourney.com, click Create, and type a description in the Imagine bar. Midjourney generates four image variations in 30–60 seconds. You can upscale any image (U1–U4 buttons), generate variations (V1–V4), or remix and re-roll for different results.

The /imagine command is Midjourney's foundation. Parameters control every aspect of the output:

--ar sets aspect ratio. Use --ar 16:9 for widescreen, --ar 9:16 for mobile/portrait, --ar 1:1 for square. This single parameter changes how Midjourney composes the scene.

--v sets the model version. --v 6.1 is the current flagship model (2024–2025) with the best photorealism, accurate hands, and coherent multi-person scenes. --v 7 is available and focuses on improved prompt adherence.

--style controls the aesthetic. --style raw gives you a less processed, more realistic output — favored by photographers and realists. Without --style raw, Midjourney applies its signature artistic enhancement.

--chaos (0–100) controls variation between the four generated images. Higher values produce more diverse, experimental results. Use --chaos 0 for consistent outputs, --chaos 75 when exploring ideas.

--no is a negative prompt. --no text, watermark, blurry tells Midjourney what to exclude.

Writing effective prompts follows a clear pattern: subject + environment + lighting + style + mood. Instead of "a woman in a city", write "a woman in her 30s standing in rainy Tokyo at night, neon reflections on wet pavement, cinematic lighting, shot on 35mm film, melancholy mood". The specificity transforms generic results into striking images.

For photorealism, add: "shot on Sony A7R IV, f/1.8, natural light, RAW photograph". For illustration: "editorial illustration, flat design, Pantone colors". For concept art: "concept art, matte painting, ArtStation trending, volumetric lighting".

Midjourney v6.1 specifically improved: fabric and skin texture rendering, architectural accuracy, multi-person scene coherence (less body merging), finer facial expression detail, and dynamic motion in scenes. It is the best version for professional work as of 2024–2025.` }]
const canDo = [
  'Generate professional-quality images for portfolios, presentations, client work, and social media',
  'Create concept art, character designs, and environment illustrations at AAA game studio quality',
  'Use --ar and --v 6.1 for photorealistic portraits with accurate hands and coherent faces',
  'Iterate rapidly — generate 4 variations, pick the best, generate 4 more variations from it',
  'Use the web app\'s Editor to extend images, change backgrounds, and make targeted edits',
]
const task = {
  title: 'Professional Portfolio Image Challenge',
  description: 'Use Midjourney to create 3 professional-quality images that could appear in a design portfolio. Focus on one consistent subject across different styles — for example, a product, a person, or an environment.',
  steps: [
    'Subscribe to the Basic plan ($10/month) at midjourney.com — cancel anytime',
    'Create a base prompt: "[subject], [environment], cinematic lighting, --ar 16:9 --v 6.1"',
    'Generate the first image and note what works and what does not',
    'Add --style raw for a more photographic feel, compare the difference',
    'Use V buttons to create variations of the best result',
    'Try the same subject with three different styles: photorealistic, concept art, editorial illustration',
    'Upscale the best of each style using U buttons — these are your portfolio pieces',
  ],
  cost: 'COST: $10/month for Basic plan (200 fast generations) — pause or cancel after your portfolio images are done',
}
const tip = `Before subscribing, study Midjourney's public gallery at midjourney.com/showcase to see what prompts produce what results. Every public image has a visible prompt — this is the best way to learn what language Midjourney responds to. When starting out, copy a prompt from an image style you like, replace the subject, and use that as your template. Reverse-engineering successful prompts beats starting from scratch every time.`
export default function MidjourneyPage() {
  return <ToolPageLayout tool={tool} videos={videos} overview={overview} sections={sections} canDo={canDo} task={task} tip={tip} />
}
