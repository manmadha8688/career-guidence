import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#111827'

export default function SunoPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Video & Music AI">
      <ToolHeader
        icon="🎵"
        title="Suno — Make Full Songs From a Prompt"
        tagline="Type a description, get a complete song with vocals and instruments — 10 free songs every day"
        badges={[['✓ FREE daily songs', '#4ADE80'], ['suno.com', color], ['Text → Music', 'var(--text-muted)']]}
        overview={"Suno is the most popular AI music generator — type a description of a song and it produces a complete track with vocals, lyrics, instrumentation, and structure in under a minute. Built by Suno Inc. (Cambridge, Massachusetts), it has a genuinely permanent free tier: 50 credits refreshed every day, which Suno describes as up to about 10 songs daily. The free plan uses the v4.5-all model, runs on a shared creation queue, and — this is the honest, important part — grants NO commercial rights (songs are for personal use only and Suno retains ownership). The flagship v5.5 model (released March 2026), along with commercial rights and advanced tools like voice customization and stem extraction, requires the Pro plan (around $8–$10/month). For students, Suno is the fastest way to add original music to videos, games, and projects for free — just keep the commercial-use limit in mind before publishing anything monetized."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Suno AI music tutorial for beginners (search results)', url: 'https://www.youtube.com/results?search_query=suno+ai+music+tutorial', dur: '~10–20 min', note: 'Recent 2026 walkthrough — signup, daily credits, prompts, and custom lyrics mode' },
            { label: 'Suno prompting tips for better songs (search)', url: 'https://www.youtube.com/results?search_query=suno+ai+prompt+tips+2026', dur: 'varies', note: 'Learn genre, mood, and structure prompting to get pro-sounding tracks' },
            { label: 'Suno v5.5 vs v4.5 comparison (search)', url: 'https://www.youtube.com/results?search_query=suno+v5.5+vs+v4.5', dur: 'varies', note: 'Hear the difference between the free v4.5-all and the paid v5.5 model' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How Suno's free tier works — 50 credits a day" color={color} />
          <InfoBox color={color}>{"Suno's free Basic plan gives 50 credits, refreshed daily, which Suno describes as up to ~10 songs per day. Credits do NOT roll over — today's unused credits are gone tomorrow, but a fresh 50 arrive each day, so it's a permanent free tier, not a trial. Free songs use the v4.5-all model, run on a shared (slower) queue, and are strictly personal, non-commercial — Suno retains ownership. To own your songs or use them commercially, and to access the flagship v5.5 model, you need a paid plan."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>What makes Suno remarkable is how little you need to know about music. You describe a song in plain language — genre, mood, instruments, and a theme — and Suno writes lyrics, composes the music, and performs it with AI vocals. You can also switch to Custom mode to write your own lyrics and pick a style, giving you real creative control. Two vital honesty points for students: first, the free tier's daily credits reset, so treat Suno as a "generate a few songs a day" tool rather than a one-time burst; second, and most important, free-plan songs cannot be used commercially and Suno owns them — so a track you make for a monetized YouTube video, a client, or a released game needs a Pro subscription made before you generate the song you intend to sell. For personal projects, learning, portfolio demos, and background music in non-monetized work, the free 10-songs-a-day tier is genuinely generous.</p>
          {[
            'Free = 50 credits/day (~10 songs), refreshed daily, no rollover — a permanent free tier',
            'Free songs use the v4.5-all model on a shared (slower) creation queue',
            'Free songs are PERSONAL, non-commercial only — Suno retains ownership',
            'Flagship v5.5 (March 2026), commercial rights, stems, and voice tools require a paid plan',
            'Custom mode lets you write your own lyrics and choose the musical style',
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
            { name: 'Full Songs From Text', desc: 'Describe a song in plain language and Suno generates complete audio — vocals, lyrics, instruments, and structure — in under a minute. No musical skill required.' },
            { name: 'Free Daily Credits', desc: '50 credits refreshed every day (up to ~10 songs) on the permanent free plan. Credits don\'t roll over, so log in daily to keep creating original music at zero cost.' },
            { name: 'Custom Lyrics Mode', desc: 'Switch from "simple" to Custom mode to write your own lyrics, set a title, and choose a specific style. This gives you far more creative control over the final song.' },
            { name: 'v4.5-all (Free) vs v5.5 (Paid)', desc: 'The free tier runs v4.5-all; the paid flagship v5.5 (March 2026) adds higher vocal realism, expressiveness, and personalization features like Voices and Custom Models.' },
            { name: 'Extend & Remix', desc: 'Extend a song to make it longer, or generate variations. Paid plans add powerful editing like stem extraction (separating vocals and instruments) and adding parts to existing songs.' },
            { name: 'Upload Your Audio', desc: 'Free users can upload up to ~8 minutes of audio to build from; paid users get much more. Useful for turning a hummed idea or a clip into a full track.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — your first song" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Sign up at suno.com', body: 'Create a free account (Google or email). You start on the Basic plan with 50 credits that refresh daily — enough for about 10 songs a day. No credit card required.' },
            { n: '2', title: 'Try a simple prompt first', body: 'In simple mode, describe a song: e.g. "an upbeat lo-fi hip hop track about late-night studying, chill and motivational". Suno writes the lyrics and music for you. Generate and listen.' },
            { n: '3', title: 'Switch to Custom mode', body: 'For more control, use Custom mode: paste your own lyrics (or a chorus you wrote), set a title, and enter a style like "indie pop, female vocals, acoustic guitar, warm and nostalgic".' },
            { n: '4', title: 'Use structure tags in lyrics', body: 'In Custom lyrics, add tags like [Verse], [Chorus], and [Bridge] to shape the song. This helps Suno build a proper song structure rather than a shapeless clip.' },
            { n: '5', title: 'Extend or regenerate', body: 'If you like part of a song, use Extend to lengthen it, or regenerate for a fresh take. Each generation spends from your 50 daily credits, so pick your best ideas.' },
            { n: '6', title: 'Download for personal use', body: 'Download your song. Remember: free-plan tracks are personal, non-commercial, and owned by Suno — perfect for practice, demos, and non-monetized projects. Upgrade before making anything you intend to sell.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Suno plans — free vs paid" color={color} />
          <Compare color={color} items={[
            { label: 'Free (Basic)', badge: '50 credits/day (~10 songs)', body: 'Daily-refreshing 50 credits, v4.5-all model, shared queue, upload up to ~8 min of audio. Personal, non-commercial only — Suno retains ownership. A genuinely generous permanent free tier for learning and personal projects.' },
            { label: 'Pro (~$8–$10/mo)', badge: 'Commercial + v5.5', body: 'Around 2,500 credits/month (~500 songs), flagship v5.5, commercial-use rights for songs made while subscribed, priority queue, stem extraction, Voices, and Custom Models. The plan for anyone monetizing their music.' },
            { label: 'Premier (~$24–$30/mo)', badge: 'High volume', body: 'Roughly 10,000 credits/month (~2,000 songs), Suno Studio, and the broadest feature set. Aimed at heavy creators and teams producing music at scale.' },
            { label: 'Commercial-use warning', badge: 'Read before publishing', body: 'Free-plan songs cannot be used commercially, and a subscription does not retroactively license songs you made before subscribing. Subscribe FIRST, then generate the song you plan to sell.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Suno vs Udio — the two AI music tools" color={color} />
          <Compare color={color} items={[
            { label: 'Free allowance', badge: 'Suno is more generous', body: 'Suno: 50 credits/day (~10 songs daily). Udio: 10 credits/day plus a 100-credit monthly pool (~1–3 songs/day) with a cap of three ~2-minute songs per day. For sheer free volume, Suno leads.' },
            { label: 'Reputation', badge: 'Different strengths', body: 'Suno: fast, catchy full songs, easiest for beginners, huge community. Udio: often praised for audio detail and fine control (inpainting). Both are top-tier — try each on the same prompt and compare.' },
            { label: 'Commercial rights', badge: 'Both gate it behind paid', body: 'Neither free tier grants clean commercial rights: Suno free is personal-only, and Udio free requires a "Created with Udio" credit and watermarks. Subscribe before making anything monetized on either.' },
            { label: 'Best for students', badge: 'Start with Suno', body: 'Suno\'s 10-free-songs-a-day and beginner-friendly flow make it the best starting point. Add Udio when you want a second creative voice or its detailed editing. Pair either with your AI videos.' },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — An Original Theme Song for Your Project</span></div>
          <p className="tool-layout-task__desc">Use Suno's free daily credits to compose an original theme song or background track for one of your projects — an app, a game, a YouTube intro, or an AI video from the media pages. This teaches music prompting and gives your work a professional, finished feel, all for free (personal use).</p>
          <Steps color={color} items={[
            { n: '1', title: 'Define the mood', body: 'Decide what feeling your project needs: energetic and modern, calm and focused, epic and cinematic, playful and fun. Write down 3–4 mood/genre words to guide your prompt.' },
            { n: '2', title: 'Generate a simple-mode draft', body: 'In simple mode, describe the track: e.g. "an energetic synthwave intro theme, driving beat, retro 80s, confident and exciting". Generate two versions and pick the stronger one.' },
            { n: '3', title: 'Refine in Custom mode', body: 'Switch to Custom mode. Refine the style tags and, if your project needs vocals, write short lyrics with [Verse] and [Chorus] tags. Regenerate until the vibe fits your project.' },
            { n: '4', title: 'Extend to the length you need', body: 'Use Extend to reach the duration you want — a 15-second intro, a 60-second loop, or a full song. Keep an eye on your daily credits and save your best takes.' },
            { n: '5', title: 'Pair it with your visuals', body: 'Drop the track under an AI video (from Runway, Kling, Luma, or Pika) or your app demo. Notice how much more polished the whole thing feels with original music.' },
            { n: '6', title: 'Know your rights', body: 'For a personal portfolio or non-monetized demo, the free track is fine. If you\'ll monetize it (ads, client work, a released product), subscribe to Pro first and regenerate the song under the paid plan for commercial rights.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE to complete — uses Suno's free 50 daily credits (v4.5-all, personal use only). No credit card needed. Upgrade to Pro (~$8–$10/mo) only if you need v5.5 or commercial rights.</span></div>
        </div>
        <ProTip>
        The one rule that saves students from real trouble with Suno: the free tier is personal-use only and Suno owns those songs — so never put a free-plan track in anything you monetize (a YouTube video with ads, client work, a game you sell). And critically, subscribing later does NOT retroactively license a song you already made for free; you must subscribe to Pro first, then generate the song you intend to sell. For everything else — learning, practice, portfolio demos, background music in non-monetized projects — the free 10-songs-a-day tier is one of the most generous in all of AI, so use it freely and daily.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/media/pika', label: 'Pika' }}
        next={{ path: '/ai-lab/media/udio', label: 'Udio' }}
      />
    </ToolPageShell>
  )
}
