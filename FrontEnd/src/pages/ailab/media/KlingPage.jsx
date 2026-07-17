import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#00C2FF'

export default function KlingPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Video & Music AI">
      <ToolHeader
        icon="🎥"
        title="Kling AI — Daily-Free Cinematic Video"
        tagline="The most generous free daily credits in AI video — and a benchmark-topping model from Kuaishou"
        badges={[['✓ FREE daily credits', '#4ADE80'], ['klingai.com', color], ['Text/Image → Video', 'var(--text-muted)']]}
        overview={"Kling AI is the AI video generator built by Kuaishou, the Chinese short-video giant. Its standout feature for students is the free daily credit allowance — registered users receive roughly 66 free credits every 24 hours (this number is 'subject to platform announcement' and has changed before, so verify in-app), which reset each day and do not roll over. That daily reset makes Kling the most generous ongoing free tier among the major AI video tools. On quality, the flagship Kling 3.0 model (released February 2026) has ranked at or near the top of independent AI-video ELO benchmarks. Free-tier videos are watermarked and licensed for personal, non-commercial use only. For a student on zero budget, the practical routine is simple: log in daily, spend your ~66 credits on a couple of short clips, and build up a body of work over a week or two without ever paying."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Kling AI full tutorial for beginners (search results)', url: 'https://www.youtube.com/results?search_query=kling+ai+tutorial', dur: '~15–25 min', note: 'Recent 2026 walkthrough — signup, daily credits, Standard vs Professional mode' },
            { label: 'Kling AI free daily credits explained (search)', url: 'https://www.youtube.com/results?search_query=kling+ai+free+credits+2026', dur: 'varies', note: 'See how far ~66 daily credits actually go and how to budget them' },
            { label: 'Kling 3.0 image-to-video results (search)', url: 'https://www.youtube.com/results?search_query=kling+3.0+image+to+video', dur: 'varies', note: 'Judge the model quality yourself before committing time' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How Kling's free tier works — daily credits that reset" color={color} />
          <InfoBox color={color}>{"Kling gives registered free users roughly 66 credits per day. They reset every 24 hours and do NOT carry over — so it is a 'use it today or lose it' allowance, not a savings account. This is the key difference from Runway (one-time credits) and Pika (monthly): Kling refreshes daily, so patient students can generate a little every day for free, indefinitely. Always confirm the exact daily number in-app, as Kling has adjusted it before (it was previously higher)."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>The trick to Kling's free tier is understanding modes. Standard mode is cheap — a 5-second clip costs roughly 10 credits — so ~66 daily credits buys you several Standard clips. Professional mode looks better but is expensive, around 35 credits for a 5-second clip, which means only one or two Pro clips per day. For learning and iterating, stay in Standard mode: you get more attempts, learn faster, and only switch to Professional for a final "hero" shot you really care about. Kling also offers different model versions (older 1.6 / 2.6 lines and the newest 3.0) at different credit costs — the older 2.6 Pro line is often praised as the best quality-per-credit choice for free users, while Kling 3.0 unlocks the newest features like audio and higher resolution.</p>
          {[
            'Free = ~66 credits/day, reset every 24 hours, no rollover (verify the exact number in-app)',
            'Standard mode ≈ 10 credits per 5-second clip — best for learning and multiple attempts',
            'Professional mode ≈ 35 credits per 5-second clip — save it for one final hero shot',
            'Free output is watermarked and for personal, non-commercial use only',
            'Kling 3.0 is the flagship (Feb 2026); older 2.6 Pro is often the best value-per-credit',
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
            { name: 'Free Daily Credits', desc: 'Roughly 66 credits every day, resetting at midnight (verify in-app). The most generous ongoing free allowance in AI video — log in daily to keep creating at zero cost.' },
            { name: 'Kling 3.0 (Flagship)', desc: 'The February 2026 flagship model, ranked at or near #1 on independent AI-video ELO benchmarks. Adds features like higher resolution and audio. Costs more credits than older versions.' },
            { name: 'Standard vs Professional Mode', desc: 'Standard is cheap (~10 credits/5s) and great for iteration; Professional (~35 credits/5s) gives higher fidelity. Choosing the right mode is the core skill for free-tier users.' },
            { name: 'Image-to-Video', desc: 'Upload a still image and animate it. As with every AI video tool, this gives more control and wastes fewer credits than pure text-to-video — the recommended free-tier workflow.' },
            { name: 'Start & End Frames', desc: 'Kling pioneered specifying both a start and an end frame, letting you control a transition precisely. Excellent for controlled morphs, reveals, and smooth motion between two images.' },
            { name: 'Motion & Elements Control', desc: 'Newer Kling versions add motion control and multi-element editing for more intentional, directable shots — useful once you\'ve mastered the basics in Standard mode.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — your first free daily clip" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Sign up at klingai.com', body: 'Register with email — no credit card required. Verify your account. Your free daily credits (around 66) appear on your first login each day and reset every 24 hours.' },
            { n: '2', title: 'Check your credit balance and mode', body: 'Find your credit counter. Before generating, choose Standard mode (cheaper, ~10 credits per 5s) so your ~66 daily credits stretch to several attempts while you learn.' },
            { n: '3', title: 'Start with image-to-video', body: 'Upload a clear still image (a photo, or an AI image from Ideogram/Leonardo/Runway). Image-to-video gives you far more control than text alone and is more credit-efficient.' },
            { n: '4', title: 'Write a focused motion prompt', body: 'Describe the movement, not the whole scene: e.g. "gentle camera push-in, hair moving in the breeze, soft cinematic lighting". Keep the clip to 5 seconds to conserve credits.' },
            { n: '5', title: 'Generate and review', body: 'Run the generation (Standard mode). Watch the result. Because credits reset tomorrow, you can afford to experiment across several days rather than burning everything at once.' },
            { n: '6', title: 'Save your best, come back tomorrow', body: 'Download your favorite clip (watermarked on free). When your daily credits run out, generation pauses until the next reset — just log back in the next day to continue for free.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Kling plans — free vs paid" color={color} />
          <Compare color={color} items={[
            { label: 'Free tier', badge: '~66 credits/day', body: 'Daily-resetting credits (no rollover), Standard and limited Professional generations, image-to-video and start/end frames. Watermarked, personal/non-commercial only. The most generous ongoing free tier — verify the exact daily number in-app.' },
            { label: 'Standard plan', badge: 'Low-cost entry', body: 'An affordable monthly plan removes the daily cap for more consistent volume and adds higher resolution. The practical step up once the daily free allowance is no longer enough for your project pace.' },
            { label: 'Pro plan', badge: 'Commercial + more', body: 'Larger monthly credit pools, 1080p output, commercial license, video extension, and credit rollover for a limited window. Aimed at creators producing regularly rather than students experimenting.' },
            { label: 'What free users miss', badge: 'Know the limits', body: 'The free tier is personal-use only (no commercial license), watermarked, and capped by daily credits. That is fine for learning and portfolio pieces — upgrade only when you need commercial rights or higher volume.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Kling vs Runway vs Luma vs Pika" color={color} />
          <Compare color={color} items={[
            { label: 'Free model type', badge: 'Kling renews daily', body: 'Kling: ~66 credits every day (best for ongoing free use). Runway: 125 one-time credits. Luma: limited monthly credits. Pika: 80 credits/month. If you want to create a little every day at $0, Kling wins.' },
            { label: 'Benchmark quality', badge: 'Kling 3.0 near the top', body: 'Kling 3.0 has topped several 2026 AI-video ELO benchmarks. Runway (Gen-4.5), Luma (Ray3.14), and Pika are all strong too. Try each free tier and compare on your own prompts.' },
            { label: 'Credit discipline', badge: 'Modes matter most', body: 'On Kling, choosing Standard over Professional mode is the biggest lever on how many clips you get. On Runway/Luma/Pika, resolution and model choice do the same. Learn the cheap path first.' },
            { label: 'Best combo for students', badge: 'Kling + one other', body: 'Use Kling daily for volume and practice, and pair it with Runway to learn the professional pipeline or Pika for playful social effects. Suno/Udio add AI music to finish your videos.' },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — A 7-Day Free AI Video Challenge</span></div>
          <p className="tool-layout-task__desc">Use Kling's daily free credits to build a small portfolio of clips over one week — completely free. This project teaches patience and credit discipline: instead of paying for a burst of generations, you learn to create a little every day and improve steadily. By day 7 you'll have a reel of AI video clips and a real feel for the model.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Day 1 — set up and learn Standard mode', body: 'Sign up at klingai.com, claim your ~66 daily credits, and generate 3–4 short Standard-mode clips (image-to-video) just to learn the interface and how motion prompts behave.' },
            { n: '2', title: 'Days 2–3 — theme your clips', body: 'Pick one theme (e.g. "nature in motion" or "sci-fi cityscapes"). Each day, spend your credits generating 2–3 clips on that theme. Save the best one per day.' },
            { n: '3', title: 'Day 4 — try start & end frames', body: 'Use Kling\'s start/end frame feature to create a controlled transition between two images. This is a signature Kling capability worth learning while it\'s free.' },
            { n: '4', title: 'Day 5 — one Professional-mode hero shot', body: 'Spend most of your day\'s ~66 credits on a single Professional-mode 5-second clip of your best idea. Compare its quality to your Standard clips.' },
            { n: '5', title: 'Days 6–7 — assemble a reel', body: 'Collect your best 5–6 clips from the week. Stitch them into a 25–30 second reel with any free editor, and add an AI-generated music track (see the Suno page).' },
            { n: '6', title: 'Reflect', body: 'You built a video reel across a week for $0. Note which mode and model gave the best results per credit — that judgement is what makes you effective on any AI video tool.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE to complete — uses only Kling's daily free credits (watermarked, personal use). No credit card needed. Just log in each day to claim fresh credits.</span></div>
        </div>
        <ProTip>
        Kling's daily reset rewards patience over impatience — the biggest mistake free users make is trying to do everything in one session and getting frustrated when ~66 credits vanish in three Professional-mode clips. Instead, do almost all your learning in cheap Standard mode (roughly 10 credits per 5-second clip), which gives you five or six attempts a day, and save Professional mode for a single hero shot once you already know exactly what you want. Because the credits come back every 24 hours, treating Kling as a "daily practice" tool rather than a "one big project" tool gets you far more free video over a week.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/media/runway', label: 'Runway' }}
        next={{ path: '/ai-lab/media/luma', label: 'Luma Dream Machine' }}
      />
    </ToolPageShell>
  )
}
