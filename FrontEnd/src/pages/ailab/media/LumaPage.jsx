import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F59E0B'

export default function LumaPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Video & Music AI">
      <ToolHeader
        icon="🌠"
        title="Luma Dream Machine — Fast, Fluid AI Video"
        tagline="The Ray model family from Luma Labs — smooth motion, quick previews, and a Draft Mode for free ideation"
        badges={[['✓ FREE trial credits', '#4ADE80'], ['lumalabs.ai', color], ['Text/Image → Video', 'var(--text-muted)']]}
        overview={"Luma Dream Machine, from Luma Labs, is an AI video generator known for smooth, natural motion and fast iteration. Its models are the Ray family — as of 2026 the latest is Ray3.14 (also called Ray3 Pi), which delivers native 1080p, runs several times faster than earlier Ray3, and is cheaper per second at 720p. Luma's free access works through 'free trial credits' rather than a classic unlimited free plan: you get a limited pool of monthly credits, and crucially free accounts can use video via Draft Mode — a fast, lightweight preview mode that's ideal for exploring ideas before spending credits on full-fidelity output. Free output is watermarked, non-commercial, and lower priority. Exact free allocations vary by platform and account (some report a credit pool on web, and the iOS app has listed around 250 monthly credits), so always check your own account. For students, Luma is the best tool to learn fast ideation: use Draft Mode to sketch motion cheaply, then decide what's worth upgrading for."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Luma Dream Machine tutorial for beginners (search results)', url: 'https://www.youtube.com/results?search_query=luma+dream+machine+tutorial', dur: '~10–20 min', note: 'Recent 2026 walkthrough — signup, credits, Draft Mode, and Ray models' },
            { label: 'Luma Ray3 / Ray3.14 video results (search)', url: 'https://www.youtube.com/results?search_query=luma+ray3+dream+machine+2026', dur: 'varies', note: 'See the motion quality and Draft vs full-fidelity difference' },
            { label: 'Luma Dream Machine free tier explained (search)', url: 'https://www.youtube.com/results?search_query=luma+dream+machine+free+credits', dur: 'varies', note: 'Understand trial credits, watermarks, and Draft Mode limits' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How Luma's free access works — trial credits + Draft Mode" color={color} />
          <InfoBox color={color}>{"Luma doesn't advertise a classic 'free forever' plan — instead every plan comes with free trial credits, and free accounts can generate video through Draft Mode with a limited monthly credit pool. Draft Mode runs up to ~5x faster and produces lightweight previews, so it's perfect for testing ideas cheaply before committing credits to full Ray3.14 fidelity, HDR, or 4K upscaling. Exact free amounts vary by platform and account (web free is described as 'limited monthly credits'; the iOS free plan has listed ~250 monthly credits) — check your own account for the real number."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>The single most useful concept in Luma is that credit cost scales sharply with resolution. On Ray3.14, Draft resolution costs only a few credits per second, 720p costs more, and 1080p costs dramatically more (roughly 80 credits/second in Luma's own pricing tables). For a student on limited free credits, this means you should do essentially all your exploration in Draft Mode or 540p, find the exact prompt and motion you want, and only spend on higher resolution once — if at all. Ray3.14's speed makes this iterate-in-Draft workflow genuinely fast: you can try many ideas quickly, then lock in the winner. Because free output is watermarked and non-commercial, treat Luma as a fast idea-sketching studio rather than a final-delivery tool.</p>
          {[
            'Free access = trial credits + video via Draft Mode (limited monthly credit pool)',
            'Ray3.14 (Ray3 Pi) is the latest model — native 1080p, ~4x faster than Ray3, cheaper at 720p',
            'Credit cost scales with resolution: Draft is cheap, 1080p is very expensive — iterate in Draft',
            'Free output is watermarked, non-commercial, and lower priority',
            'Exact free credits vary by platform/account — check your own dashboard for the real number',
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
            { name: 'Draft Mode', desc: 'Fast, lightweight video previews (up to ~5x faster) available to free accounts. Explore ideas and test motion cheaply before spending credits on full fidelity. The core free-tier workflow.' },
            { name: 'Ray3.14 (Latest Model)', desc: 'Luma\'s newest Ray model (a.k.a. Ray3 Pi): native 1080p, 24 fps, much faster and more cost-efficient than earlier Ray3, with cleaner and more consistent results.' },
            { name: 'Smooth, Natural Motion', desc: 'Luma is especially praised for fluid, believable motion and camera movement — often its standout strength versus other AI video tools.' },
            { name: 'Image-to-Video & Keyframes', desc: 'Animate a still image, or set keyframes to guide the start and end of a shot. Keyframe control gives you directable, intentional motion.' },
            { name: 'HDR & 4K Upscaling', desc: 'Full Ray3.14 fidelity unlocks HDR and EXR export, and 540p/720p/1080p generations can be upscaled to 4K — paid features for final, high-quality output.' },
            { name: 'Loop Support', desc: 'Create seamlessly looping clips at 540p/720p/1080p (not in Draft Mode) — handy for backgrounds, social loops, and design assets.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — sketch a clip in Draft Mode" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Sign up at lumalabs.ai/dream-machine', body: 'Create an account (web or the iOS app). You\'ll receive free trial credits — check your dashboard for your exact balance, since it varies by platform and account.' },
            { n: '2', title: 'Switch to Draft Mode', body: 'Before generating, select Draft Mode. It\'s fast and cheap, so you can try many ideas without draining your limited free credits. This is where all your early experimentation should happen.' },
            { n: '3', title: 'Start from an image', body: 'Upload or generate a strong still image and use image-to-video. This gives more control and better results per credit than pure text-to-video, especially in Draft.' },
            { n: '4', title: 'Describe the motion', body: 'Write a motion-focused prompt: e.g. "slow orbit around the subject, gentle parallax, soft natural light". Luma\'s strength is smooth motion, so lean into camera moves.' },
            { n: '5', title: 'Iterate quickly in Draft', body: 'Generate several Draft previews and refine your prompt each time. Because Draft is fast and cheap, keep going until the motion and framing are exactly right.' },
            { n: '6', title: 'Decide before you spend on fidelity', body: 'Once you love a Draft result, decide whether it\'s worth generating at full 720p/1080p fidelity (which costs many more credits) or upgrading. Often the Draft is enough to learn from.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Luma plans — free vs paid" color={color} />
          <Compare color={color} items={[
            { label: 'Free (trial credits)', badge: 'Draft Mode video', body: 'Limited monthly credits, video via Draft Mode, 720p image generation, lower priority, watermarked, non-commercial. Best for fast idea-sketching. Web and iOS free allowances differ — check your account.' },
            { label: 'Entry paid plan', badge: 'Adds full video', body: 'Lower-cost paid tiers add full-fidelity video generation and more credits, though some keep watermarks/commercial limits. The step up when Draft Mode is no longer enough.' },
            { label: 'Standard / higher', badge: 'Watermark-free + commercial', body: 'Higher tiers remove watermarks, add commercial rights, more monthly credits, HDR/EXR export, and 4K upscaling. Aimed at creators delivering finished, professional video.' },
            { label: 'Relaxed Mode (top tiers)', badge: 'Endless generations', body: 'Unlimited/Enterprise plans include Relaxed Mode — lower-priority generations that continue after fast credits run out. Not available on free or entry plans.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Luma vs Runway vs Kling vs Pika" color={color} />
          <Compare color={color} items={[
            { label: 'Standout strength', badge: 'Luma = motion + speed', body: 'Luma: smooth motion and very fast Draft iteration. Runway: mature pro pipeline. Kling: benchmark-topping quality + daily free credits. Pika: playful effects. Each has a clear personality — match it to your goal.' },
            { label: 'Free model type', badge: 'Different refill rules', body: 'Luma: limited monthly trial credits + Draft Mode. Kling: ~66 credits/day (renews daily). Runway: 125 one-time. Pika: 80/month. For sheer ongoing free volume, Kling; for fast cheap previews, Luma\'s Draft Mode.' },
            { label: 'Cost discipline', badge: 'Resolution is the lever', body: 'On Luma, Draft/540p is cheap and 1080p is very expensive — iterate low, finish high (once). Same principle on the others: explore cheap, spend on the final only.' },
            { label: 'Best student combo', badge: 'Draft here, volume elsewhere', body: 'Use Luma\'s Draft Mode to explore motion ideas fast, Kling for daily free volume, and Runway to learn the pro workflow. Add Suno/Udio for music to complete any video.' },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — A Motion Study in Draft Mode</span></div>
          <p className="tool-layout-task__desc">Use Luma's Draft Mode to explore how camera and subject motion change the feel of a shot — spending as few credits as possible. This teaches the most valuable AI-video skill: prompting motion deliberately. You'll end with a set of quick studies and a clear sense of Luma's smooth-motion strength.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Pick one still image', body: 'Choose a single strong image (a photo or an AI image). You\'ll animate this same image several ways, so the only variable is the motion prompt.' },
            { n: '2', title: 'Generate 4 motion variations in Draft', body: 'In Draft Mode, animate the image four times with different motion prompts: (1) "slow push-in", (2) "orbit around subject", (3) "gentle handheld drift", (4) "rack focus, subtle parallax". Keep them short.' },
            { n: '3', title: 'Compare the feel', body: 'Watch all four back to back. Notice how camera language alone changes the emotional tone — this is the essence of directing AI video, and Draft Mode let you learn it for almost no credits.' },
            { n: '4', title: 'Refine the winner', body: 'Take your favorite motion and refine the prompt two or three more times in Draft until it\'s exactly right. Speed of iteration is Luma\'s superpower — use it.' },
            { n: '5', title: 'Optionally finish at higher fidelity', body: 'If you have credits to spare, generate the winning shot once at 720p to see the fidelity difference. If not, your Draft study is already a complete learning exercise.' },
            { n: '6', title: 'Write down what you learned', body: 'Note which motion prompts worked and their credit cost. This motion vocabulary transfers directly to Kling, Runway, and Pika.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE to complete — uses Luma's free trial credits in Draft Mode (watermarked, non-commercial). Check your account for your exact credit balance; upgrade only for full fidelity, no watermark, or commercial rights.</span></div>
        </div>
        <ProTip>
        Draft Mode is Luma's secret weapon for broke students — because it runs several times faster and costs a fraction of full-fidelity generation, you can run a dozen motion experiments for what one 1080p clip would cost. The winning habit: never generate at 720p or 1080p until you've already nailed the exact prompt and motion in Draft. Luma's resolution-based pricing means a single 1080p clip can eat a huge chunk of your free credits (roughly 80 credits per second), so treat high resolution as a "final render" you do once, not a mode you explore in. Explore in Draft, finish high — that discipline is what makes a limited free credit pool last.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/media/kling', label: 'Kling AI' }}
        next={{ path: '/ai-lab/media/pika', label: 'Pika' }}
      />
    </ToolPageShell>
  )
}
