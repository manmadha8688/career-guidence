import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#6366F1'

export default function IdeogramPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Creative & Media AI">
      <ToolHeader
        icon="🖋️"
        title="Ideogram — The Best AI for Text in Images"
        tagline="Generate posters, logos, and ads with accurate, legible text — where other image AIs fail"
        badges={[['✓ FREE tier', '#4ADE80'], ['ideogram.ai', color], ['Text-in-Image', 'var(--text-muted)']]}
        overview={"Ideogram is the AI image generator that solved the problem every other model struggles with: rendering accurate, legible text inside images. While Midjourney, DALL-E, and Stable Diffusion routinely produce garbled letters, Ideogram 3.0 (its latest model) reaches roughly 90–95% text accuracy — making it the go-to tool for logos, posters, ads, packaging, social graphics, and anything with words in it. It also delivers strong photorealism and reusable Style References. The free tier gives you a small pool of 'slow queue' credits (widely reported around 10 per day; a few sources describe a weekly allotment resetting Saturdays — verify in-app), with access to the Ideogram 3.0 model. The honest catch: all free-tier generations are PUBLIC — they appear in Ideogram's community gallery and can't be made private — and you're limited to the slow queue. For students designing graphics with text, Ideogram's free tier is the single best place to get professional-looking, readable typography for free."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Ideogram AI tutorial for beginners (search results)', url: 'https://www.youtube.com/results?search_query=ideogram+ai+tutorial', dur: '~10–20 min', note: 'Recent 2026 walkthrough — signup, text rendering, Magic Prompt, and styles' },
            { label: 'Ideogram 3.0 text-in-image demo (search)', url: 'https://www.youtube.com/results?search_query=ideogram+3.0+text+in+image', dur: 'varies', note: 'See the accurate typography that sets Ideogram apart from other image AIs' },
            { label: 'Ideogram for logos and posters (search)', url: 'https://www.youtube.com/results?search_query=ideogram+ai+logo+poster+design', dur: 'varies', note: 'Practical design use cases where legible text matters most' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why Ideogram wins on text — and how the free tier works" color={color} />
          <InfoBox color={color}>{"Ideogram's whole reason for existing is text rendering. Ideogram 3.0 understands how typography interacts with design — that a neon sign should glow, embossed text casts shadows, a logo should be clean — reaching roughly 90–95% text accuracy versus far lower rates on Midjourney or DALL-E. The free tier gives a small pool of slow-queue credits (commonly reported as ~10/day; some sources say a weekly allotment — check your account) on the Ideogram 3.0 model. The big free-tier tradeoff: every generation is PUBLIC in the community gallery and cannot be made private."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Each Ideogram credit generates one prompt, which typically returns up to four image variations — so a small credit pool still gives you a decent number of images to choose from. The free tier includes powerful helpers like Magic Prompt (which expands your short prompt into a richer one) and Remix (variations on an image). What's gated behind paid plans: private generation, image uploads/Style References from your own files, Character Consistency, Batch Generation, and the faster priority queue. The most important honesty point for students is the public-gallery rule — do not use the free tier for confidential client work, unreleased brand assets, or anything you don't want other users to see. For learning typography-driven design, making posters and social graphics, and building a portfolio, though, the free tier is genuinely excellent and produces text that actually reads correctly.</p>
          {[
            'Ideogram 3.0 hits ~90–95% text accuracy — best-in-class for words in images',
            'Free tier = small pool of slow-queue credits (commonly ~10/day; verify in-app) on Ideogram 3.0',
            'Each credit = one prompt, usually returning up to 4 image variations',
            'ALL free-tier generations are PUBLIC in the community gallery — no private mode on free',
            'Paid plans add priority speed, private generation, Style References, and Batch Generation',
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
            { name: 'Industry-Leading Text Rendering', desc: 'Ideogram 3.0 renders accurate, legible text (~90–95%) — logos, posters, signs, packaging, and lengthy compositions that other models turn into gibberish. This is its defining strength.' },
            { name: 'Magic Prompt', desc: 'Automatically expands a short prompt into a detailed one for richer results. Great for learning what descriptive language produces better images — free to use on all plans.' },
            { name: 'Style References', desc: 'Upload up to 3 reference images to steer the aesthetic, then reuse a style via its Style Code. (Uploading references requires a paid plan; a huge random-style library is available to explore.)' },
            { name: 'Strong Photorealism', desc: 'Beyond text, Ideogram 3.0 produces natural skin tones, accurate lighting, and detailed compositions — competitive with the best general image models.' },
            { name: 'Remix & Describe', desc: 'Remix generates variations of an image; Describe analyzes an image and suggests a prompt (Describe costs 1 credit on free, free on paid). Both are great learning tools.' },
            { name: 'Character Consistency (Paid)', desc: 'Keep the same character across multiple images — essential for storyboards and brand mascots. A paid feature, but worth knowing about as you grow.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — your first text poster" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Sign up at ideogram.ai', body: 'Create a free account (Google or email) — no credit card needed. You\'ll receive a small pool of slow-queue credits (commonly ~10/day; check your account for the exact reset).' },
            { n: '2', title: 'Write a text-focused prompt', body: 'Put the exact words in quotes: e.g. \'A vintage travel poster that says "VISIT MARS", retro 1950s style, bold sans-serif type, warm orange palette\'. Quoting the text helps Ideogram render it accurately.' },
            { n: '3', title: 'Turn on Magic Prompt', body: 'Enable Magic Prompt to let Ideogram enrich your description. Generate and you\'ll get up to four variations — pick the one where the text and layout read best.' },
            { n: '4', title: 'Iterate on the wording', body: 'If a letter is off, regenerate — but be economical since the free queue is slow and credits are limited. Small prompt tweaks (font style, "clean typography", "centered text") improve accuracy.' },
            { n: '5', title: 'Remix your favorite', body: 'Use Remix to explore variations of your best result — different colors, framing, or mood — while keeping the working text and composition.' },
            { n: '6', title: 'Download (remember: public)', body: 'Download your image. Note that free-tier generations are public in the community gallery, so keep confidential or client work off the free tier — upgrade to a paid plan for private generation.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Ideogram plans — free vs paid" color={color} />
          <Compare color={color} items={[
            { label: 'Free', badge: 'Public, slow queue', body: 'A small pool of slow-queue credits (commonly ~10/day; some report a weekly allotment — verify), Ideogram 3.0 access, Magic Prompt, Remix. All generations PUBLIC, JPG downloads, one at a time, Default rendering. Great for testing and learning.' },
            { label: 'Basic (~$8/mo)', badge: 'Adds private + priority', body: 'Adds private generation, priority credits, image uploads, and free Describe. The entry paid plan for anyone doing real design work who needs their images kept private.' },
            { label: 'Plus (~$20/mo)', badge: 'For professionals', body: 'A large monthly priority-credit pool plus unlimited slow generations, private mode, and full feature access. Aimed at marketers and designers producing regularly.' },
            { label: 'Pro / Team', badge: 'High volume + collaboration', body: 'Pro adds a very large monthly credit pool for agencies; Team adds per-seat credits and collaboration. For heavy or team-based production, not needed for students learning.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Ideogram vs Midjourney vs Leonardo vs FLUX" color={color} />
          <Compare color={color} items={[
            { label: 'Text in images', badge: 'Ideogram wins clearly', body: 'Ideogram: ~90–95% text accuracy — unmatched for logos, posters, ads. Midjourney: gorgeous art but weak text (~40%). Leonardo & FLUX: strong images, but not text specialists. For words in images, choose Ideogram.' },
            { label: 'Free access', badge: 'Different models', body: 'Ideogram: small daily/weekly slow credits (public). Leonardo: 150 tokens/day. FLUX: free via Hugging Face/ComfyUI. Midjourney: paid only. For free text-in-image work, Ideogram is the specialist.' },
            { label: 'Privacy on free', badge: 'Know before you post', body: 'Ideogram free generations are PUBLIC. Leonardo free generations are also public by default. If privacy matters for client work, you must pay on either — plan accordingly.' },
            { label: 'Best combo', badge: 'Text + art', body: 'Use Ideogram for anything with typography (logos, posters, thumbnails with text) and Midjourney/Leonardo/FLUX for pure artwork. Together they cover the whole design spectrum.' },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Design a Logo and Poster Set</span></div>
          <p className="tool-layout-task__desc">Use Ideogram's free tier to create a small brand set — a logo concept and a matching poster — both with accurate, legible text. This teaches typography-driven prompting, the skill that makes AI images actually usable for real design work, and gives you portfolio pieces.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Invent a brand', body: 'Make up a simple brand name and vibe — e.g. "Nova Coffee, modern minimalist café". Having a name forces you to test Ideogram\'s text rendering on real words.' },
            { n: '2', title: 'Generate logo concepts', body: 'Prompt: \'A clean minimalist logo with the text "NOVA COFFEE", simple coffee-bean icon, modern sans-serif, muted earth tones, on a white background\'. Generate and pick the best of the four variations.' },
            { n: '3', title: 'Design a matching poster', body: 'Prompt a poster that reuses the name: \'A promotional café poster that says "NOVA COFFEE — OPEN NOW", warm morning light, editorial layout, bold legible type\'. Aim for consistent style with the logo.' },
            { n: '4', title: 'Refine the typography', body: 'If any letters are imperfect, tweak the prompt (add "clean typography, accurate text, centered") and regenerate economically — the free queue is slow, so make each attempt count.' },
            { n: '5', title: 'Explore variations with Remix', body: 'Use Remix on your favorite poster to try alternate color palettes and moods while keeping the working text and layout. Choose a final logo + poster pair.' },
            { n: '6', title: 'Assemble your brand board', body: 'Put the logo and poster side by side in a free tool (Canva, Figma, or a simple slide). You now have a mini brand identity with accurate text — a strong, unique portfolio piece.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE to complete — uses Ideogram's free slow-queue credits on Ideogram 3.0 (generations are PUBLIC). No credit card needed. Upgrade only if you need private generation or the faster priority queue.</span></div>
        </div>
        <ProTip>
        The single trick that dramatically improves Ideogram's text accuracy: put the exact words you want in quotation marks inside your prompt, and describe the type treatment explicitly ("bold sans-serif", "clean legible typography", "centered text"). Ideogram is already the best model at text, but quoting the words tells it precisely what letters to render, and naming the font style guides the look. Keep the text short and punchy — logos and posters read far better than paragraphs. And always remember the free-tier catch: every image you make is public in Ideogram's gallery, so use free for learning, posters, and portfolio work, and reserve paid private generation for anything confidential or client-owned.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/creative/canva-ai', label: 'Canva AI' }}
        next={{ path: '/ai-lab/creative/leonardo', label: 'Leonardo AI' }}
      />
    </ToolPageShell>
  )
}
