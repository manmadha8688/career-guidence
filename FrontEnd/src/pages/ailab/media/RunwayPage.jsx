import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#1F2937'

export default function RunwayPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Video & Music AI">
      <ToolHeader
        icon="🎬"
        title="Runway — AI Video Generation Studio"
        tagline="Turn text and images into cinematic video clips — the tool film and ad studios actually use"
        badges={[['✓ FREE to try', '#4ADE80'], ['runwayml.com', color], ['Text/Image → Video', 'var(--text-muted)']]}
        overview={"Runway is one of the most established AI video generation platforms, used by filmmakers, advertisers, and creators to turn text prompts and still images into short, cinematic video clips. Its Gen model family has led the AI video space for years. As of 2026 the flagship model is Gen-4.5, with the faster, cheaper Gen-4 Turbo used for quick iteration. Runway's free plan is a genuine 'try it' plan: you get a one-time deposit of 125 credits (they do NOT renew once spent), access to Gen-4 Turbo for image-to-video, and Gen-4 for text-to-image stills. All free-plan output carries a Runway watermark. For students, Runway is the best place to understand the professional AI video workflow — you'll learn credits, models, prompting, and the image-to-video technique — but be honest with yourself: the free credits run out fast (~25 seconds of Gen-4 Turbo video total), so plan your generations before you click."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Runway Gen — full beginner tutorial (search results)', url: 'https://www.youtube.com/results?search_query=runway+gen+tutorial', dur: '~15–30 min', note: 'Pick a recent 2026 walkthrough — signup, credits, image-to-video, and prompting' },
            { label: 'Runway AI video: text-to-video & image-to-video (search)', url: 'https://www.youtube.com/results?search_query=runway+ai+video+generation+2026', dur: 'varies', note: 'Compare a few creators to see real free-plan results and watermarks' },
            { label: 'Runway Gen-4.5 vs Gen-4 Turbo explained (search)', url: 'https://www.youtube.com/results?search_query=runway+gen-4.5+vs+gen-4+turbo', dur: 'varies', note: 'Understand which model the free plan gives you and where credits go' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How Runway works — credits, models, image-to-video" color={color} />
          <InfoBox color={color}>{"Runway runs on a credit system. Every generation spends credits based on the model and clip length. On the free plan you get a ONE-TIME 125 credits that do not refresh — this is the single most important fact to understand before you start. Gen-4 Turbo (the free video model) costs roughly 5 credits per second, so 125 credits ≈ 25 seconds of video total. Spend it deliberately."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>The most reliable way to get good results on Runway — especially on a tight free budget — is image-to-video, not text-to-video. You first create or upload a strong still image (Runway's free plan includes Gen-4 for text-to-image stills, and it can also use Gemini image models), then animate that image into a 5-second clip with Gen-4 Turbo. This gives you far more control over composition, characters, and framing than describing a whole video in words, and it wastes fewer credits on failed generations. Because free-plan clips are watermarked and short, treat Runway as a learning studio: master the workflow here, then decide whether the Standard plan (from ~$12/month billed annually) is worth it for watermark-free, higher-quality Gen-4.5 output.</p>
          {[
            'Free plan = 125 one-time credits that do NOT renew — plan every generation before you click',
            'Gen-4 Turbo (image-to-video) is the free video model — ~5 credits/second, roughly 25 seconds total',
            'Gen-4.5 (flagship, best quality) and Gen-4 text-to-video require the Standard plan or higher',
            'All free-plan videos carry a Runway watermark — removed only on paid plans',
            'Image-to-video beats text-to-video for control — build a strong still first, then animate it',
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
            { name: 'Gen-4 Turbo (Image-to-Video)', desc: 'The free-plan video model. Fast and credit-efficient (~5 credits/sec). Take any still image and animate it into a 5-second clip. Best for social clips, quick iteration, and learning the workflow.' },
            { name: 'Gen-4.5 (Flagship)', desc: 'Runway\'s top video model as of 2026 — highest fidelity, best motion and prompt adherence. Paid plans only. This is what professionals use for client-ready and cinematic output.' },
            { name: 'Text-to-Image (Gen-4)', desc: 'Included on the free plan for still images. Generate reference frames and thumbnails, then feed them into Gen-4 Turbo for image-to-video. A smart way to stretch your credits.' },
            { name: 'Aleph — video-to-video editing', desc: 'Edit and transform existing footage with prompts (change scenes, restyle, add elements). A powerful pro feature on paid plans — great for post-production style workflows.' },
            { name: 'Motion & camera control', desc: 'Guide camera moves and motion direction to get intentional, cinematic shots rather than random movement. Learning this early makes every generation more usable.' },
            { name: 'Generative audio + editor', desc: 'Runway includes text-to-speech and audio tools plus a video editor. The free plan allows a limited number of editor projects so you can assemble clips into a short sequence.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — first video on the free plan" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Sign up at runwayml.com', body: 'Create a free account with email or Google — no credit card needed. You land on the Home dashboard with a one-time deposit of 125 credits. Note this number in your head: it does not refresh.' },
            { n: '2', title: 'Plan before you generate', body: 'Decide your shot first. Since Gen-4 Turbo costs ~5 credits/second and you only have 125 credits, sketch 3–4 five-second clips (about 25 seconds total). Write your prompt and pick your reference image before spending a single credit.' },
            { n: '3', title: 'Create a strong still image', body: 'Use Runway\'s text-to-image (Gen-4) to generate a clean reference frame, or upload your own photo. A good still = a good video. This is cheaper and more controllable than pure text-to-video.' },
            { n: '4', title: 'Animate it with Gen-4 Turbo', body: 'Choose Image-to-Video (Gen-4 Turbo), attach your image, and describe the motion: e.g. "slow push-in, gentle camera drift, subtle wind in the hair, cinematic lighting". Keep clips to 5 seconds to conserve credits.' },
            { n: '5', title: 'Review, then iterate carefully', body: 'Watch the result. If it is close, tweak the motion prompt and regenerate ONE more time. Avoid re-rolling repeatedly — every attempt costs credits and the free 125 do not come back.' },
            { n: '6', title: 'Download and assemble', body: 'Download your clips (they will have a Runway watermark on the free plan). Use the built-in editor or any free editor to stitch your 5-second clips into a short 20–25 second sequence.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Runway plans — free vs paid" color={color} />
          <Compare color={color} items={[
            { label: 'Free plan', badge: '125 one-time credits', body: '125 credits total (do NOT renew), Gen-4 Turbo image-to-video, Gen-4 text-to-image stills, generative audio, and a few editor projects. All output watermarked. Best for learning the workflow — roughly 25 seconds of video before you run out.' },
            { label: 'Standard (~$12/mo annual)', badge: 'Practical entry point', body: 'Monthly renewing credits (around 625/month), access to all models including Gen-4.5, no watermarks, and 4K upscaling. This is where most people go once they want client-ready or non-watermarked output.' },
            { label: 'Pro / higher tiers', badge: 'For heavy use', body: 'Pro (~$28/mo annual) and above give much larger monthly credit pools, more storage, and higher concurrency. Aimed at creators producing video regularly rather than students experimenting.' },
            { label: 'API (pay-as-you-go)', badge: 'For developers', body: 'Runway has a developer API where credits are billed per use. Useful if you\'re building an app that generates video — but separate from the web subscription and not needed for learning.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Runway vs Kling vs Luma vs Pika" color={color} />
          <Compare color={color} items={[
            { label: 'Free generosity', badge: 'Runway is the tightest', body: 'Runway: 125 one-time credits (~25s), then paid. Kling: ~66 credits/day (renews daily). Luma: limited monthly credits. Pika: 80 credits/month. If you want ongoing free generations, Kling\'s daily reset is the most generous of the group.' },
            { label: 'Quality reputation', badge: 'All strong, different styles', body: 'Runway: cinematic, mature toolset, trusted by studios. Kling 3.0: currently tops several video benchmarks. Luma: fast, great motion. Pika: playful effects and social-friendly. Try each free tier and judge with your own eyes.' },
            { label: 'Best free workflow', badge: 'Image-to-video everywhere', body: 'On all four tools, image-to-video gives more control and wastes fewer credits than text-to-video. Build a strong still first, then animate. This single habit stretches every free tier much further.' },
            { label: 'Who should use which', badge: 'Match to your goal', body: 'Runway: learn the professional pipeline. Kling: maximum free daily volume. Luma: quick experiments and smooth motion. Pika: fun social clips and effects. For students, start with Kling (daily free) + Runway (learn the craft).' },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Make a 20-Second AI Video Teaser</span></div>
          <p className="tool-layout-task__desc">Create a short cinematic teaser (about 20 seconds) using only Runway's free 125 credits. This forces you to learn the real professional discipline of AI video: plan your shots, use image-to-video for control, and spend credits deliberately instead of re-rolling endlessly. The goal is a shareable clip for your portfolio or LinkedIn.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Write a 4-shot storyboard', body: 'Pick one idea (e.g. "a lone astronaut on a red desert planet at sunset"). Break it into 4 clear shots of 5 seconds each. Write a one-line prompt per shot. This is your entire 20-credit-per-shot budget planned in advance.' },
            { n: '2', title: 'Generate 4 reference stills', body: 'Use Runway text-to-image (Gen-4) to create one strong still per shot. Iterate the still prompts (stills are cheap) until each frame looks great — the still is what your video will animate from.' },
            { n: '3', title: 'Animate each still with Gen-4 Turbo', body: 'For each shot, use Image-to-Video (Gen-4 Turbo) with a motion prompt like "slow cinematic push-in, drifting dust, warm sunset light". Keep to 5 seconds. Generate once, review, regenerate at most once.' },
            { n: '4', title: 'Assemble the sequence', body: 'Download your 4 clips and stitch them in order using Runway\'s editor or any free editor (e.g. CapCut). Add a simple cut or fade between shots so it plays as one continuous teaser.' },
            { n: '5', title: 'Add music (optional)', body: 'Drop in a royalty-free track or an AI-generated instrumental (see the Suno page) to give your teaser a mood. Now you have a complete, portfolio-ready AI video.' },
            { n: '6', title: 'Reflect on credits spent', body: 'Note how many credits each generation cost and how fast 125 disappeared. This teaches you exactly what a paid Runway plan (or a daily-free tool like Kling) is worth for real projects.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE to complete — uses Runway's one-time 125 free credits (output watermarked). No credit card required; upgrade only if you want Gen-4.5, no watermark, or more credits.</span></div>
        </div>
        <ProTip>
        Never use text-to-video as your first move on a paid-credit tool like Runway — it is the fastest way to burn credits on disappointing results. Instead, spend cheap still-image generations to nail your composition, character, and lighting first, then animate that finished frame with image-to-video. On the free 125-credit plan this discipline can be the difference between one usable teaser and zero. Plan your shots on paper, generate deliberately, and resist the urge to re-roll — those free credits genuinely never come back.
      </ProTip>
      <PageNavRow
        prev={null}
        next={{ path: '/ai-lab/media/kling', label: 'Kling AI' }}
      />
    </ToolPageShell>
  )
}
