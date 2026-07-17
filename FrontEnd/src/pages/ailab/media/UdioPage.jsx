import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#7C3AED'

export default function UdioPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Video & Music AI">
      <ToolHeader
        icon="🎶"
        title="Udio — Detailed AI Music & Fine Editing"
        tagline="A powerful AI music generator praised for audio detail and precise editing — Suno's main rival"
        badges={[['✓ FREE tier', '#4ADE80'], ['udio.com', color], ['Text → Music', 'var(--text-muted)']]}
        overview={"Udio is a leading AI music generator and Suno's biggest rival, often praised for audio detail and precise editing controls like inpainting (regenerating just a section of a track). You describe a song and Udio produces full music with vocals. Its free tier is real but modest: 10 credits per day plus an additional 100-credit monthly pool, where roughly one credit is a ~30-second generation, so in practice about 1–3 full tracks a day. Free accounts are also capped at three ~130-second songs per day. The honest catch: free-tier exports are watermarked, commercial use requires a visible 'Created with Udio' credit, and credits don't roll over (they reset). Clean, no-attribution commercial rights and much larger credit pools come with Standard (~$10/month) and Pro (~$30/month, adds full commercial rights). For students, Udio is the perfect second AI-music tool to compare against Suno — its editing precision teaches you a more hands-on approach to shaping a song."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Udio AI music tutorial for beginners (search results)', url: 'https://www.youtube.com/results?search_query=udio+ai+music+tutorial', dur: '~10–20 min', note: 'Recent 2026 walkthrough — signup, credits, prompting, and extending songs' },
            { label: 'Udio inpainting & editing explained (search)', url: 'https://www.youtube.com/results?search_query=udio+ai+inpainting+editing', dur: 'varies', note: 'See Udio\'s standout feature — regenerating just one section of a track' },
            { label: 'Suno vs Udio comparison (search)', url: 'https://www.youtube.com/results?search_query=suno+vs+udio+2026', dur: 'varies', note: 'Hear the two top AI music tools on the same prompt and pick your favorite' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How Udio's free tier works — daily + monthly credits" color={color} />
          <InfoBox color={color}>{"Udio's free plan gives 10 credits per day PLUS an extra 100-credit monthly pool — once your daily 10 are gone, you can draw from the monthly 100. Roughly one credit is a ~30-second generation, so that's about 1–3 full tracks per day after accounting for extensions. Free accounts are also capped at three ~130-second (~2 minute) songs per day. Credits do NOT roll over — they reset. Free exports are watermarked, and any commercial use requires a visible 'Created with Udio' credit. It's a real free tier for learning, not a shipping plan."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Udio's identity is precision. Where Suno is the fastest way to a catchy full song, Udio gives you finer control over the audio and standout editing tools — most notably inpainting, which lets you regenerate just a problem section (a weak line, an off note) instead of re-rolling the whole track. That control is a great teacher: it pushes you to listen critically and fix specific parts rather than gambling on a full regeneration. Two honesty points for students: first, the free credit math is tighter than Suno's (about 1–3 tracks a day versus Suno's ~10 songs), so budget your generations; second, the free tier's watermark and mandatory 'Created with Udio' attribution mean it is not suitable for clean commercial releases — for that you need Standard (removes attribution) or Pro (adds full commercial rights). For learning, comparing against Suno, and personal projects, the free tier is perfectly usable.</p>
          {[
            'Free = 10 credits/day + a 100-credit monthly pool; ~1 credit ≈ a 30-second generation',
            'Free accounts capped at three ~130-second (2-min) songs per day',
            'Credits do NOT roll over — daily and monthly limits reset',
            'Free exports are watermarked; commercial use needs a visible "Created with Udio" credit',
            'Inpainting is Udio\'s standout — regenerate one section instead of the whole song',
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
            { name: 'Full Songs From Text', desc: 'Describe a track — genre, mood, instruments, theme — and Udio generates complete music with vocals. Comparable to Suno, with a reputation for detailed, high-fidelity audio.' },
            { name: 'Inpainting', desc: 'Udio\'s signature editing tool: select a section of a song and regenerate only that part. Fix a weak line or a bad transition without losing the rest — a more surgical workflow than full re-rolls.' },
            { name: 'Extend Songs', desc: 'Grow a short generation into a full-length track by extending it section by section. Each extension consumes credits, so plan your structure before extending.' },
            { name: 'Free Daily + Monthly Credits', desc: '10 credits per day plus a 100-credit monthly pool. Roughly 1–3 full tracks a day. Credits reset (no rollover), and free accounts are capped at three ~2-minute songs daily.' },
            { name: 'Custom Lyrics & Style', desc: 'Provide your own lyrics and detailed style prompts for precise creative control, or let Udio write everything. Great for learning how prompt wording changes the output.' },
            { name: 'Stem Separation (Paid)', desc: 'Higher tiers add stem separation (isolating vocals and instruments) and clean commercial rights — useful once you move from learning into real production.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — your first Udio track" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Sign up at udio.com', body: 'Create a free account — no credit card needed. You get 10 credits per day plus a 100-credit monthly pool. Note the cap: three ~2-minute songs per day on the free plan.' },
            { n: '2', title: 'Write a descriptive prompt', body: 'Describe your song in detail: e.g. "dreamy indie pop, female vocals, reverb-heavy guitar, nostalgic and warm, 90 BPM". Udio rewards specific, musical language. Generate and listen.' },
            { n: '3', title: 'Budget your credits', body: 'Since ~1 credit is a 30-second generation and you have limited daily/monthly credits, avoid re-rolling entire songs. Plan to make 1–2 tracks and refine, rather than many rough attempts.' },
            { n: '4', title: 'Use inpainting to fix, not re-roll', body: 'If most of a song is good but one section is weak, use inpainting to regenerate just that part. This is Udio\'s superpower and it conserves credits compared to full regenerations.' },
            { n: '5', title: 'Extend to full length', body: 'Extend your favorite generation section by section to build a complete track with intro, verse, chorus, and outro. Watch your credit balance as you go.' },
            { n: '6', title: 'Export (with attribution)', body: 'Download your track. Free exports are watermarked and require a "Created with Udio" credit for any public/commercial use. For clean or commercial output, upgrade to Standard or Pro.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Udio plans — free vs paid" color={color} />
          <Compare color={color} items={[
            { label: 'Free', badge: '10/day + 100/mo', body: '10 credits/day plus a 100-credit monthly pool (~1–3 tracks/day), capped at three ~2-minute songs per day. Watermarked, "Created with Udio" credit required for commercial use, no rollover. Good for learning and comparison.' },
            { label: 'Standard (~$10/mo)', badge: 'No attribution', body: 'Around 1,200–2,400 credits/month (verify current), no daily cap, high-quality downloads, private songs, stem separation, and clean output without the attribution requirement. The practical creator plan.' },
            { label: 'Pro (~$30/mo)', badge: 'Full commercial rights', body: 'Roughly 4,800–6,000 credits/month, everything in Standard plus full commercial-use rights and early access to new models. For serious, monetized production.' },
            { label: 'A-la-carte credits', badge: 'Never expire', body: 'Purchased top-up credits (bought outside a subscription) never expire and roll over — unlike plan credits. Useful as a spike buffer, but you still need an active plan context to use them.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Udio vs Suno — pick your AI music tool" color={color} />
          <Compare color={color} items={[
            { label: 'Free volume', badge: 'Suno gives more', body: 'Suno: 50 credits/day (~10 songs). Udio: 10/day + 100/month (~1–3 tracks/day, max three 2-min songs). If you want maximum free songs, Suno; if you want precise editing, Udio.' },
            { label: 'Editing control', badge: 'Udio\'s edge', body: 'Udio\'s inpainting lets you fix one section surgically, and its audio is often praised for detail. Suno is faster and simpler. Different philosophies — hands-on control vs speed.' },
            { label: 'Commercial rights', badge: 'Both gate it', body: 'Suno free = personal only. Udio free = watermark + "Created with Udio" attribution. Neither free tier is clean for monetized releases; upgrade before selling on either platform.' },
            { label: 'Best approach', badge: 'Use both free tiers', body: 'The smartest student move is to run the same prompt through both free tiers and compare. You\'ll quickly develop taste for which tool suits which kind of song, at zero cost.' },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Suno vs Udio Head-to-Head</span></div>
          <p className="tool-layout-task__desc">Use both free tiers to generate the same song on Suno and Udio, then edit the Udio version with inpainting. This teaches you critical listening, prompt consistency, and Udio's precise editing — and leaves you with a clear personal opinion on which AI music tool fits your style.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Write one detailed prompt', body: 'Craft a single, specific song description (genre, vocals, instruments, mood, tempo). You\'ll use the exact same prompt on both platforms so the comparison is fair.' },
            { n: '2', title: 'Generate on Suno', body: 'On suno.com (free), generate the song with your prompt. Save the best of two takes. Note the vibe, vocal quality, and how quickly it nailed the idea.' },
            { n: '3', title: 'Generate on Udio', body: 'On udio.com (free), generate the same prompt. Save your best take. Compare the audio detail and character against the Suno version — mind your limited daily credits.' },
            { n: '4', title: 'Fix a weak spot with inpainting', body: 'On the Udio track, find one section you\'d improve (a flat line, an awkward transition) and use inpainting to regenerate just that part. Notice how targeted this is versus a full re-roll.' },
            { n: '5', title: 'Extend the winner', body: 'Take whichever track you prefer and extend it into a fuller structure. Keep an eye on credits on both platforms — this is real budget discipline.' },
            { n: '6', title: 'Write your verdict', body: 'In a few sentences, note which tool you preferred and why. This kind of hands-on comparison is exactly how you build genuine skill and taste with AI creative tools.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE to complete — uses the free tiers of Suno (50 credits/day) and Udio (10/day + 100/mo, watermarked + attribution). No credit card needed. Upgrade only for clean commercial rights.</span></div>
        </div>
        <ProTip>
        Udio's inpainting is the feature that will make you a better AI-music creator, and it's usable on the free tier — so lean on it hard. Instead of throwing away a whole 90% -good track because one line is off (and burning credits on a full re-roll), select just that section and regenerate only it. This forces you to listen like a producer: identify the exact problem, fix it surgically, keep everything that works. On a tight free-credit budget (about 1–3 tracks a day), that surgical habit stretches your credits much further than Suno-style full regenerations — and the critical-listening skill you build transfers to every creative tool you'll ever use.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/media/suno', label: 'Suno' }}
        next={null}
      />
    </ToolPageShell>
  )
}
