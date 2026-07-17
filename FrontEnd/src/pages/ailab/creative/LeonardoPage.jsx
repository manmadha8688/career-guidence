import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#7C3AED'

export default function LeonardoPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Creative & Media AI">
      <ToolHeader
        icon="🧑‍🎨"
        title="Leonardo AI — Generous Daily Free Image AI"
        tagline="150 free tokens every day, game-art heritage, and models for images and video in one studio"
        badges={[['✓ FREE — 150 tokens/day', '#4ADE80'], ['leonardo.ai', color], ['Text → Image', 'var(--text-muted)']]}
        overview={"Leonardo AI is a full-featured AI image (and now video) platform with one of the most generous free tiers in the space: 150 Fast Tokens every single day, resetting every 24 hours. Originally rooted in game-asset creation, it has grown into a versatile studio with its own model families (Lucid Origin, Lucid Realism, Phoenix) plus support for FLUX and video models like Motion. Tokens are the currency — a standard low-resolution image costs only a few tokens (roughly 2–4), so 150/day is enough for meaningful daily experimentation, though premium features (higher resolution, upscalers) can burn 10–15 tokens each. The honest catch: unused daily tokens do NOT roll over (they expire each day), and free generations are public by default in the community feed. Notably, free-tier images generally come with commercial-use rights (verify current terms), which sets Leonardo apart from some rivals. For students, Leonardo is the best daily-free playground for learning image generation across many models and styles."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Leonardo AI tutorial for beginners (search results)', url: 'https://www.youtube.com/results?search_query=leonardo+ai+tutorial', dur: '~10–20 min', note: 'Recent 2026 walkthrough — signup, tokens, models, and image generation basics' },
            { label: 'Leonardo AI models & styles explained (search)', url: 'https://www.youtube.com/results?search_query=leonardo+ai+models+2026', dur: 'varies', note: 'Compare Lucid, Phoenix, and FLUX models and when to use each' },
            { label: 'Leonardo AI free tokens — what they get you (search)', url: 'https://www.youtube.com/results?search_query=leonardo+ai+free+tokens+2026', dur: 'varies', note: 'Realistic look at how far 150 daily tokens actually go' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How Leonardo's free tier works — 150 tokens a day" color={color} />
          <InfoBox color={color}>{"Leonardo gives free users 150 Fast Tokens per day, resetting every 24 hours. Tokens are spent per generation and the cost depends on model, resolution, and features — a standard low-res image is roughly 2–4 tokens, while premium modes and upscalers can cost 10–15+. Crucially, unused daily tokens do NOT roll over — they expire, so it's a 'use it today' allowance that refreshes tomorrow. Free generations are public by default (visible in the community feed). Unlike some rivals, Leonardo's free tier generally includes commercial-use rights — but always verify current terms before client work."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Leonardo's big advantages for students are variety and daily refresh. In one studio you can try multiple model families — Lucid Origin and Lucid Realism (Leonardo's own), the Phoenix line, FLUX, and video via Motion — which is a fast way to develop taste for how different models render the same prompt. Because 150 tokens reset every day and cheap images cost only a few tokens each, you can realistically generate dozens of standard images daily at zero cost. The discipline that matters: watch what each feature costs. Enabling high resolution, the Alchemy refiner, or upscaling multiplies token cost and can drain your daily allowance in a handful of generations. Keep exploration at standard settings, and reserve premium modes for a final image you really want. Remember the two honest limits — daily tokens expire (no stockpiling) and free output is public — and Leonardo becomes an outstanding everyday learning tool.</p>
          {[
            'Free = 150 Fast Tokens/day, reset every 24 hours, NO rollover (unused tokens expire)',
            'Standard low-res image ≈ 2–4 tokens; premium modes/upscalers ≈ 10–15+ tokens',
            'Multiple model families in one place: Lucid Origin, Lucid Realism, Phoenix, FLUX, Motion (video)',
            'Free generations are PUBLIC by default in the community feed',
            'Free tier generally includes commercial-use rights (verify current terms before client work)',
          ].map((item, i) => (
            <div key={i} className="tool-layout-cando-item">
              <div className="tool-layout-cando-item__dot" />
              <span className="tool-layout-cando-item__text">{item}</span>
            </div>
          ))}
        </Block>
        <Block>
          <SubHead label="Key features" color={color} />
          <CardGrid color={color} items={[
            { name: '150 Free Daily Tokens', desc: 'A generous daily allowance that resets every 24 hours. Cheap images cost only a few tokens, so you can generate dozens of standard images per day for free. Tokens don\'t roll over.' },
            { name: 'Multiple Model Families', desc: 'Lucid Origin and Lucid Realism (Leonardo\'s own), the Phoenix line, and FLUX all in one studio — plus video via Motion models. Great for comparing how different models interpret a prompt.' },
            { name: 'Image Guidance & ControlNet', desc: 'Guide generations with reference images, poses, depth, and edges for precise control over composition — a step beyond plain text prompting, and excellent for learning.' },
            { name: 'Motion (Video)', desc: 'Animate still images into short video clips with Leonardo\'s Motion models. Lets you experiment with image-to-video inside the same tool you use for images.' },
            { name: 'Canvas & Editing', desc: 'An editing canvas with inpainting/outpainting to extend images, fix regions, and refine details — useful for turning a good generation into a finished piece.' },
            { name: 'Game-Art Heritage', desc: 'Leonardo grew from game-asset creation, so it excels at characters, concept art, items, and environments — ideal if you\'re building assets for a game or app.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — your first Leonardo image" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Sign up at leonardo.ai', body: 'Create a free account — no credit card needed. You get 150 Fast Tokens that reset every day. Hover the token counter to see exactly when your next daily reset happens.' },
            { n: '2', title: 'Pick a model and a cheap setting', body: 'Choose a model (try Lucid Origin or Phoenix) and keep resolution standard to conserve tokens. Avoid premium upscalers on your first tries so you can generate many images while learning.' },
            { n: '3', title: 'Write a descriptive prompt', body: 'Describe subject, style, lighting, and mood: e.g. "a stylized fantasy knight, concept art, dramatic rim lighting, painterly, ArtStation trending". Generate a batch and compare.' },
            { n: '4', title: 'Try the same prompt on another model', body: 'Run your prompt through a second model (e.g. FLUX or Lucid Realism). Comparing outputs teaches you each model\'s personality — a fast way to build real taste, cheaply.' },
            { n: '5', title: 'Use Image Guidance for control', body: 'Add a reference image or a pose/depth control to steer composition. This moves you beyond luck-based prompting into intentional, directed image-making.' },
            { n: '6', title: 'Finish on the Canvas', body: 'Take your favorite result into the Canvas to inpaint fixes or outpaint the scene wider. Download when done — remember free generations are public, but generally carry commercial rights (verify).' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Leonardo plans — free vs paid" color={color} />
          <Compare color={color} items={[
            { label: 'Free', badge: '150 tokens/day', body: '150 Fast Tokens daily (reset every 24h, no rollover), access to many models, Image Guidance, and Canvas. Generations are PUBLIC by default but generally include commercial rights. One of the best daily-free image tiers around.' },
            { label: 'Apprentice/Essential (~$12/mo)', badge: 'Monthly token pool', body: 'A monthly Fast Token allowance (thousands per month), token rollover bank, top-up option, private generations, and higher concurrency. The step up for regular creators.' },
            { label: 'Artisan/Premium', badge: 'Relaxed generations', body: 'Much larger monthly token pools plus unlimited "Relaxed" image generation on selected models after fast tokens run out. For heavier image workflows.' },
            { label: 'Maestro/Ultimate', badge: 'Video + top volume', body: 'The largest token pools and unlimited Relaxed generation for both images and selected video models. Aimed at professionals producing image and video at scale.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Leonardo vs Ideogram vs Midjourney vs FLUX" color={color} />
          <Compare color={color} items={[
            { label: 'Free daily volume', badge: 'Leonardo is generous', body: 'Leonardo: 150 tokens/day (dozens of cheap images). Ideogram: small slow-queue pool. FLUX: free via Hugging Face/ComfyUI. Midjourney: paid only. For daily free image volume in a polished UI, Leonardo leads.' },
            { label: 'Best at', badge: 'Different specialties', body: 'Leonardo: versatile, game/concept art, many models. Ideogram: accurate text in images. Midjourney: peak artistic quality. FLUX: best open-source model. Match the tool to the job.' },
            { label: 'Commercial rights on free', badge: 'Leonardo stands out', body: 'Leonardo\'s free tier generally includes commercial rights (verify), while Ideogram free is public and Suno/Kling-style tools gate commercial use. That makes Leonardo unusually useful for free real projects — but its output is still public.' },
            { label: 'Best combo', badge: 'Cover every need', body: 'Use Leonardo for daily free image practice and game/concept assets, Ideogram for anything with text, and FLUX/Midjourney for peak artwork. Animate results with Leonardo Motion or the media-page video tools.' },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — A Character Concept Sheet</span></div>
          <p className="tool-layout-task__desc">Use Leonardo's 150 free daily tokens to design a consistent character across several poses and styles — a classic game/app asset task that showcases Leonardo's strengths. This teaches model comparison, image guidance, and building a coherent visual identity, all for free.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Define your character', body: 'Write a clear description: e.g. "a young inventor with copper goggles, brown leather coat, curious expression, steampunk style". Specificity is what keeps the character consistent across images.' },
            { n: '2', title: 'Generate a base portrait', body: 'Using a standard (cheap) setting, generate several portrait variations. Pick the one that best matches your vision — this becomes your reference for consistency.' },
            { n: '3', title: 'Compare across two models', body: 'Run the same description through a second model (e.g. Phoenix vs FLUX). Note which renders your character best; keep your favorite as the canonical look.' },
            { n: '4', title: 'Use Image Guidance for new poses', body: 'Feed your chosen portrait as a reference and generate the character in new poses or scenes ("standing in a workshop", "action pose"). Image Guidance keeps the look consistent.' },
            { n: '5', title: 'Refine on the Canvas', body: 'Take your best images into the Canvas to fix details with inpainting or extend the scene with outpainting. Aim for 4–5 polished images of the same character.' },
            { n: '6', title: 'Build the concept sheet', body: 'Arrange your character images into a single "concept sheet" layout (in Canva, Figma, or a slide) with the character name and a short bio. A strong, unique portfolio asset — made entirely on the free tier.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE to complete — uses Leonardo's 150 free daily tokens (generations are public; generally include commercial rights — verify). No credit card needed. Spread work across days since tokens don't roll over.</span></div>
        </div>
        <ProTip>
        Leonardo's daily-reset tokens reward a "little every day" habit, and the smartest way to use them is to keep almost all your generation at standard, low-cost settings — a plain image is only a few tokens, so 150/day can be dozens of images, but flip on high resolution, the Alchemy refiner, or an upscaler and you'll watch that same 150 vanish in a handful of clicks. So explore widely and cheaply: compare models, test prompts, learn what works. Only when you have a clear winner should you spend the extra tokens to upscale or refine it into a final piece. And since unused tokens expire each day (no stockpiling) and free output is public, treat Leonardo as your everyday free image gym — perfect for building skill and a portfolio at zero cost.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/creative/ideogram', label: 'Ideogram' }}
        next={null}
      />
    </ToolPageShell>
  )
}
