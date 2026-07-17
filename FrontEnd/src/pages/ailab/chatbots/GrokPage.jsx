import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#111827'

export default function GrokPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Chatbots">
      <ToolHeader
        icon="🛸"
        title="Grok — The AI Wired Into Live X"
        tagline="xAI's chatbot with real-time access to X — great for what's happening right now"
        badges={[['✓ FREE TIER', '#4ADE80'], ['Real-time X data', color], ['grok.com', 'var(--text-muted)']]}
        overview={"Grok is the AI assistant built by xAI, Elon Musk's AI company, and its one true superpower is real-time access to X (formerly Twitter). While most chatbots answer from a frozen snapshot of the internet, Grok can pull in live posts, trends, and reactions from X as they happen — which makes it unusually good at 'what are people saying right now?' questions. You can use it free at grok.com or directly inside the X app, with no credit card required. The free tier runs a lighter, capable model with a rolling message limit (roughly 10 prompts every couple of hours) and includes live web and X search plus image understanding. The flagship — the latest Grok model, tuned for coding, agentic tasks, and deep reasoning — along with features like DeepSearch and image generation sit behind the paid SuperGrok tiers. For Indian students, Grok is worth knowing as a distinct tool: a free, personality-forward assistant that is genuinely plugged into the live conversation on X."}
      />

      <Block title="Watch first" titleColor="#EF4444">
        {[
          { label: 'Grok (xAI) full beginner tutorial', url: 'https://www.youtube.com/results?search_query=grok+xai+tutorial+for+beginners', dur: '', note: 'Search results — pick a recent walkthrough of grok.com and the X integration' },
          { label: 'Grok vs ChatGPT vs Gemini comparison', url: 'https://www.youtube.com/results?search_query=grok+vs+chatgpt+vs+gemini+2026', dur: '', note: 'See where Grok\'s real-time strengths actually matter' },
          { label: 'Grok DeepSearch and real-time X search demo', url: 'https://www.youtube.com/results?search_query=grok+deepsearch+real+time+x+demo', dur: '', note: 'How the live-data features work in practice' },
        ].map((v, i) => <VideoCard key={i} v={v} />)}
      </Block>

      <Block>
        <SubHead label="How Grok is different — live, opinionated, X-native" color={color} />
        <InfoBox color={color}>{"Grok's defining feature is that it lives on X. Because xAI and X are part of the same company, Grok has native, real-time access to the X firehose — posts, threads, and trends the moment they appear. Ask 'what's the reaction to today's budget announcement?' and Grok can summarise live posts, not a stale training snapshot. It also has a deliberately more casual, sometimes cheeky personality, and (on paid tiers) a less-filtered mode. No other mainstream chatbot has this direct line into a live social network."}</InfoBox>
        <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Most chatbots are frozen in time — they know the world up to a training cutoff and then guess about anything newer. Grok is built around the opposite idea: the live conversation on X is part of its context. That makes it a genuinely different tool. For breaking news, live sentiment, trending debates, and "is this actually true or just going viral?" questions, Grok often beats a general chatbot because it can read the room in real time. It pairs this with normal chatbot skills — writing, explanations, coding help — and a distinctive, informal voice that some people love and others find a bit much.</p>
        {[
          'Real-time X access — reads live posts, threads, and trends as they happen',
          'Free on grok.com and inside the X app — no credit card, just sign in',
          'Live web search and image understanding included even on the free tier',
          'Distinctive, casual personality — more informal and playful than most assistants',
          'DeepSearch (paid) — agentic, multi-step research across the live web and X',
          'Flagship model (paid) tuned for coding and agentic tasks, available in the xAI API and in editors like Cursor',
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
          { name: 'Real-Time X Search', desc: 'Grok\'s signature ability: it reads live posts and trends from X. Ask about breaking news, live sports, or public reaction to an event and it summarises what people are actually saying right now, with links.' },
          { name: 'Live Web Search', desc: 'Beyond X, Grok searches the open web for current information and cites sources. Included on the free tier, so your answers stay current instead of stuck at a training cutoff.' },
          { name: 'Image Understanding', desc: 'Upload a photo, screenshot, chart, or diagram and ask questions about it. Vision is available for free users — handy for decoding an error screenshot or a confusing graph.' },
          { name: 'DeepSearch (paid)', desc: 'An agentic research mode that runs multi-step investigations — reading many sources, cross-checking, and synthesising a structured answer. Sits on the paid SuperGrok tiers.' },
          { name: 'Flagship Reasoning Model', desc: 'The latest Grok model (Grok 4.5) targets coding, agentic tasks, and knowledge work, and is competitively priced in the xAI API. Available to paid users and in tools like Grok Build and Cursor.' },
          { name: 'Personality & Voice', desc: 'Grok has a deliberately informal, witty tone and, on paid tiers, less-filtered and voice modes. Good for casual brainstorming; use a more neutral tool when you need buttoned-up, formal output.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="Getting started — free chat on grok.com" color={color} />
        <Steps color={color} items={[
          { n: '1', title: 'Open grok.com', body: 'Go to grok.com in a standard Chrome/Chromium browser and sign in — no credit card and no X Premium subscription needed for the free tier. You can also use Grok directly inside the X app if you already have an account.' },
          { n: '2', title: 'Ask a normal question first', body: 'Try something everyday — "Explain OAuth like I\'m new to backend" or "Draft a LinkedIn note to a recruiter." This uses the free model and answers immediately.' },
          { n: '3', title: 'Now ask something live', body: 'This is where Grok shines: "What are people on X saying about [today\'s tech announcement]?" or "Summarise the reaction to [event] in the last few hours." Watch it pull in real posts.' },
          { n: '4', title: 'Mind the free limit', body: 'The free tier is capped at roughly 10 prompts every couple of hours on a rolling window. If you hit the limit, wait for the window to reset — or upgrade for a bigger allowance. Plan your questions rather than firing off dozens.' },
          { n: '5', title: 'Upload an image', body: 'Attach a screenshot of an error, a chart from a paper, or a photo of handwritten notes and ask Grok to explain or transcribe it. Vision works on the free tier.' },
          { n: '6', title: 'Cross-check anything that matters', body: 'Live X data is fast but noisy — viral does not mean true. For claims that matter, open the sources Grok cites and verify with a reputable outlet before you rely on them.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="Free vs paid — what you actually get" color={color} />
        <Compare color={color} items={[
          { label: 'Free tier', badge: 'Text-only, rolling limit', body: 'Free on grok.com and X with no credit card. Runs a lighter (Grok 3 / Grok 4 Mini class) model, roughly 10 prompts per 2 hours. Includes live web + X search and image understanding. Image generation moved to paid in 2026, so free is text-only. Great for everyday questions and live-trend checks.' },
          { label: 'SuperGrok Lite (~$10/mo)', badge: 'Budget upgrade', body: 'A cheaper paid step-up with higher usage and access to more features than free. A reasonable pick if you like Grok but keep hitting the free limit. (Prices and tier names change often — check grok.com before subscribing.)' },
          { label: 'SuperGrok (~$30/mo)', badge: 'Flagship + DeepSearch', body: 'Unlocks the flagship Grok model, DeepSearch agentic research, higher limits, and image generation. This is the tier most heavy users pick. Paid usage now runs on a shared weekly usage pool across Grok products.' },
          { label: 'Heavy / API', badge: 'Power users & developers', body: 'A top "Heavy" consumer tier exists for maximum limits. Separately, developers can call the flagship model via the xAI API (competitively priced per million tokens) — the route to build your own apps on Grok.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="Grok vs ChatGPT vs Perplexity — when to reach for which" color={color} />
        <Compare color={color} items={[
          { label: 'Live social sentiment', badge: 'Grok wins', body: 'For "what are people saying right now" — reactions to news, trending debates, live events — Grok\'s native X access is unmatched. ChatGPT and Perplexity search the web, but neither is wired into the live X firehose the way Grok is.' },
          { label: 'Sourced research answers', badge: 'Perplexity edge', body: 'For a clean, well-cited research answer to a factual question, Perplexity is purpose-built for it. Grok can search too, but Perplexity\'s whole design is answer-plus-sources with less personality noise.' },
          { label: 'General versatility & polish', badge: 'ChatGPT broader', body: 'For a huge range of everyday tasks, formal writing, voice, image generation, and Custom GPTs, ChatGPT\'s ecosystem is deeper. Grok is more focused: live data plus a casual voice.' },
          { label: 'Tone & personality', badge: 'Different vibes', body: 'Grok is deliberately informal and witty; ChatGPT is neutral and professional by default. Pick Grok for playful brainstorming, ChatGPT/Claude when you need buttoned-up, formal output.' },
          { label: 'Free usage ceiling', badge: 'Watch the caps', body: 'Grok\'s free ~10-prompts-per-2-hours cap is tighter than some rivals for sustained work. For long, uninterrupted free sessions, a tool like DeepSeek or Gemini may get in your way less.' },
        ]} />
      </Block>

      <div className="tool-layout-task">
        <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Live Trend Report on a Topic You Care About</span></div>
        <p className="tool-layout-task__desc">Use Grok&apos;s real-time X access to produce a short, sourced &quot;state of the conversation&quot; report — then fact-check it against a neutral tool. This teaches you both Grok&apos;s unique strength and the critical habit of verifying anything that comes from social media.</p>
        <Steps color={color} items={[
          { n: '1', title: 'Pick a live topic', body: 'Choose something actively being discussed — a new phone launch, a placement-season rumour, a tech policy, a cricket match. It should be recent enough that a frozen chatbot could not answer it well.' },
          { n: '2', title: 'Ask Grok for live sentiment', body: 'On grok.com: "What are people on X saying about [topic] in the last 24 hours? Summarise the main viewpoints and include links." Note how it surfaces real posts and clusters opinions.' },
          { n: '3', title: 'Ask for the counter-view', body: 'Follow up: "What is the strongest criticism or opposing take on [topic]?" Live discourse is polarised — deliberately pulling the other side keeps your report balanced.' },
          { n: '4', title: 'Fact-check with a neutral tool', body: 'Take the top 2–3 factual claims Grok surfaced and verify them in Perplexity or a reputable news source. Mark each as confirmed, disputed, or unverified. This is the most important step.' },
          { n: '5', title: 'Write a one-page report', body: 'Combine it into a short brief: the consensus view, the counter-view, and a verified-facts section with sources. This is exactly the kind of synthesis employers and professors value.' },
          { n: '6', title: 'Reflect on the limits', body: 'Note where Grok was fast but wrong or where viral posts turned out to be false. Write two sentences on when you would trust live X data — and when you would not.' },
        ]} />
        <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — Grok&apos;s free tier on grok.com or X covers this; just mind the rolling ~10-prompts-per-2-hours limit</span></div>
      </div>

      <ProTip>
        {"Grok's real advantage is time, not raw intelligence — so use it for questions where 'right now' matters and use a different tool for everything else. When you need live reaction, trending debate, or breaking developments, Grok's native X access is genuinely hard to beat. But live social data is noisy and viral is not the same as true: always open the posts and sources Grok cites and cross-check important claims against a reputable outlet before you repeat them. Treat Grok as a live-listening tool that you verify, not an oracle."}
      </ProTip>

      <PageNavRow
        prev={{ path: '/ai-lab/chatbots/deepseek', label: 'DeepSeek' }}
        next={{ path: '/ai-lab/chatbots/qwen', label: 'Qwen' }}
      />
    </ToolPageShell>
  )
}
