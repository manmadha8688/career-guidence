import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#8B5CF6'

export default function PikaPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Video & Music AI">
      <ToolHeader
        icon="🎞️"
        title="Pika — Playful AI Video for Social"
        tagline="Fun effects, cheap plans, and a real free tier — the most social-friendly AI video generator"
        badges={[['✓ FREE — 80 credits/mo', '#4ADE80'], ['pika.art', color], ['Text/Image → Video', 'var(--text-muted)']]}
        overview={"Pika is an AI video generator built for creators and social media, best known for its signature 'Pikaffects' — playful, viral transformations like inflating, melting, crushing, or exploding a subject. As of 2026 the model is Pika 2.5, and Pika offers one of the friendliest entry points in AI video: a free Basic plan with 80 credits per month and the cheapest paid tier of the major tools (Standard around $8/month billed annually). The free plan is capped at 480p and Pika 2.5 basic access, and credits don't roll over. Credit costs vary by feature, resolution, and length — a 5-second 480p text-to-video runs about 12 credits on free, so 80 monthly credits is best treated as a proof-of-concept budget (a handful of short clips) rather than a production tool. For students who want to make fun, shareable clips and effects without committing money, Pika is the easiest and most affordable place to start."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Pika AI video tutorial for beginners (search results)', url: 'https://www.youtube.com/results?search_query=pika+ai+video+tutorial', dur: '~10–20 min', note: 'Recent 2026 walkthrough — signup, credits, Pikaffects, and text/image-to-video' },
            { label: 'Pikaffects viral effects demo (search)', url: 'https://www.youtube.com/results?search_query=pika+pikaffects+2026', dur: 'varies', note: 'See the signature effects that make Pika popular on social media' },
            { label: 'Pika free plan — what 80 credits gets you (search)', url: 'https://www.youtube.com/results?search_query=pika+free+credits+2026', dur: 'varies', note: 'Realistic look at how far the free monthly credits actually go' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How Pika's free plan works — 80 monthly credits" color={color} />
          <InfoBox color={color}>{"Pika's free Basic plan gives 80 credits per month (they do NOT roll over) with Pika 2.5 access capped at 480p. Credit cost depends on the feature, resolution, and duration — a 5-second 480p text-to-video is around 12 credits on the free plan, and effects/other modes cost more. So 80 credits realistically means only a handful of short clips per month. Failed generations can still consume credits, so plan each one. It's a genuine free tier for testing, not a production budget."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Pika's personality is fun. While Runway and Kling chase cinematic realism, Pika leans into creator-friendly, shareable moments — its Pikaffects turn a normal clip into something that makes people stop scrolling. That focus, plus the lowest paid entry price among major tools ($8/month Standard, billed annually), makes it the friendliest on-ramp to AI video. The honest tradeoff on the free plan: you're limited to 480p, monthly credits are small and don't roll over, and higher resolutions (720p/1080p) and Pikaframes require paying. The smart free-tier strategy is to spend most of your 80 monthly credits on one or two well-planned clips or a single fun effect, rather than re-rolling — because unused credits vanish at month end and failed attempts still cost you.</p>
          {[
            'Free Basic plan = 80 credits/month, no rollover, Pika 2.5 at 480p only',
            'A 5-second 480p text-to-video ≈ 12 credits — so ~a handful of short clips per month',
            'Failed generations can still consume credits — plan each clip before generating',
            'Pikaffects are the signature draw — playful, viral-friendly transformations',
            'Standard plan (~$8/mo annual) is the cheapest paid entry in AI video — unlocks 720p/1080p',
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
            { name: 'Pikaffects', desc: 'Pika\'s signature playful effects — inflate, melt, crush, explode, squish, and more applied to a subject. The reason Pika clips go viral on social. Fun, fast, and instantly recognizable.' },
            { name: 'Pika 2.5 Model', desc: 'The current model (2026). On the free plan it\'s capped at 480p; paid plans unlock 720p and 1080p. Good motion and prompt following for social-length clips.' },
            { name: 'Text & Image-to-Video', desc: 'Generate from a prompt or animate a still image. As always, image-to-video gives more control and wastes fewer of your limited free credits than pure text-to-video.' },
            { name: 'Pikaframes', desc: 'Transition and keyframe control for smoother, directed sequences (a paid feature). Useful once you move beyond single short clips into edited sequences.' },
            { name: 'Pikascenes & more', desc: 'Additional modes for scene building and edits. Each has its own credit cost, so check the pricing table before using them heavily on the free plan.' },
            { name: 'Cheapest Paid Entry', desc: 'Standard at roughly $8/month (billed annually) is the lowest-cost paid tier among major AI video tools — the friendliest upgrade if you outgrow the free 80 credits.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — your first fun clip" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Sign up at pika.art', body: 'Create a free account. You\'ll be on the Basic plan with 80 credits for the month. Note that these reset monthly and do not roll over — so use them within the month.' },
            { n: '2', title: 'Plan your ~a-few clips', body: 'With 80 credits and ~12 credits per 480p 5-second clip, budget for roughly a handful of generations. Decide your ideas before generating, since failed attempts still cost credits.' },
            { n: '3', title: 'Try a Pikaffect first', body: 'Upload an image (or generate a clip) and apply a Pikaffect like "inflate" or "melt". This is Pika\'s most fun, most shareable feature — a great first experience.' },
            { n: '4', title: 'Then try image-to-video', body: 'Animate a still with a motion prompt at 480p. Keep it to 5 seconds to conserve credits. Image-to-video gives you more control than describing a whole scene in text.' },
            { n: '5', title: 'Review before re-rolling', body: 'Watch your result. Only regenerate if it\'s clearly wrong — remember every attempt (even failures) spends from your small monthly pool.' },
            { n: '6', title: 'Download and share', body: 'Download your clip and post it. Free-plan output is 480p; if you love the tool and want 720p/1080p or more volume, the $8/month Standard plan is the cheapest upgrade in AI video.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Pika plans — free vs paid" color={color} />
          <Compare color={color} items={[
            { label: 'Free (Basic)', badge: '80 credits/month', body: '80 monthly credits (no rollover), Pika 2.5 at 480p only. Great for testing and fun clips. A 5-second 480p clip is ~12 credits, so expect a handful of generations per month.' },
            { label: 'Standard (~$8/mo annual)', badge: 'Cheapest paid tier', body: 'Around 700 credits/month, all resolutions (720p/1080p), Pikaframes, and faster generation. The best value entry point in AI video if you outgrow the free plan.' },
            { label: 'Pro (~$28/mo annual)', badge: 'For regular creators', body: 'Roughly 2,300 credits/month, watermark-free output, full feature access, and faster generation. For creators producing social video regularly.' },
            { label: 'Fancy (~$76/mo annual)', badge: 'High volume', body: 'Around 6,000 credits/month and the fastest queue, aimed at studios and daily high-volume production. Overkill for students learning the tool.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Pika vs Runway vs Kling vs Luma" color={color} />
          <Compare color={color} items={[
            { label: 'Personality', badge: 'Pika = fun & social', body: 'Pika: playful effects, social-first, cheapest paid tier. Runway: cinematic pro pipeline. Kling: benchmark-topping realism + daily free credits. Luma: smooth motion + fast Draft previews.' },
            { label: 'Free model type', badge: 'Monthly vs daily', body: 'Pika: 80 credits/month (resets monthly). Kling: ~66/day (resets daily, most ongoing volume). Runway: 125 one-time. Luma: monthly trial credits + Draft Mode. Pick based on how you like to create.' },
            { label: 'Cost to go further', badge: 'Pika is cheapest', body: 'If you decide to pay, Pika\'s $8/month Standard is the lowest entry price among these tools — a gentle upgrade compared with Runway or Kling\'s higher tiers.' },
            { label: 'Best student combo', badge: 'Fun + volume + craft', body: 'Use Pika for shareable effects, Kling for daily free volume, and Runway/Luma to learn cinematic technique. Add Suno/Udio music to finish any clip into a real post.' },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — One Viral-Style Social Clip</span></div>
          <p className="tool-layout-task__desc">Use Pika's free 80 monthly credits to make one genuinely shareable social clip built around a Pikaffect. This teaches you how AI video actually gets used online — short, punchy, and effect-driven — while forcing you to budget a small monthly credit pool wisely.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Pick a subject and an effect', body: 'Choose one clear subject (an object, a character, a photo of you) and one Pikaffect that suits it — "inflate", "melt", "explode", or "crush". Match the effect to something surprising for maximum shareability.' },
            { n: '2', title: 'Prepare a strong source image', body: 'Use a clean, well-lit image as your starting frame (a photo or an AI image). A clear subject makes the effect read better and wastes fewer credits on failed attempts.' },
            { n: '3', title: 'Generate the effect clip', body: 'Apply your chosen Pikaffect at 480p. Review it once. Because your monthly credits are small, only regenerate if the result is clearly broken.' },
            { n: '4', title: 'Add a hook', body: 'Plan a one-line caption or on-screen text that sets up the surprise ("wait for it…"). The setup + payoff structure is what makes effect clips work on social.' },
            { n: '5', title: 'Finish in a free editor', body: 'Bring the clip into a free editor (e.g. CapCut), add your caption and a snappy sound or AI music (see the Suno page), and export in a vertical 9:16 format for social.' },
            { n: '6', title: 'Post and observe', body: 'Share it and watch which moment holds attention. You\'ve now learned the full loop — idea, effect, edit, post — on a free plan, and you know exactly what Pika\'s cheap Standard tier would unlock.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE to complete — uses Pika's free 80 monthly credits at 480p. No credit card needed. Standard (~$8/mo annual) is the cheapest upgrade if you want 720p/1080p or more volume.</span></div>
        </div>
        <ProTip>
        Pika's free plan rewards restraint — with only 80 monthly credits that don't roll over and failed generations still costing you, the worst thing you can do is spray-and-pray. Instead, spend a minute planning: pick one clear subject, one surprising effect, and one clean source image, then generate deliberately. Because Pika's whole appeal is the "wait for it" payoff of a Pikaffect, a single well-set-up clip beats five random ones. And if you fall in love with the tool, remember its Standard plan is the cheapest paid entry in all of AI video ($8/month annually) — so upgrading here costs less than any competitor.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/media/luma', label: 'Luma Dream Machine' }}
        next={{ path: '/ai-lab/media/suno', label: 'Suno' }}
      />
    </ToolPageShell>
  )
}
