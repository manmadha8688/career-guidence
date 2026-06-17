import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#00AFF0'

export default function IFTTTPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(0,217,255,0.09)' : 'rgba(79,70,229,0.11)'
  const txt   = dark ? '#E2E8F0' : '#0F172A'
  const sub   = dark ? '#94A3B8' : '#475569'
  const muted = dark ? '#64748B' : '#94A3B8'

  return (
    <div style={{ minHeight: '100vh', background: bg, color: txt, fontFamily: "'Rajdhani', sans-serif", overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, borderRadius: '50%', background: `radial-gradient(ellipse, ${color}07 0%, transparent 65%)`, filter: 'blur(60px)' }} />
      </div>

      <nav style={{ position: 'sticky', top: 0, zIndex: 50, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', background: dark ? 'rgba(2,8,23,0.93)' : 'rgba(240,244,255,0.95)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${border}` }}>
        <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.72rem', letterSpacing: '0.1em', color: CYAN, padding: 0 }}>
          <ArrowLeft size={14} /> AI Lab
        </button>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Automation</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🔀</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>IFTTT — The Simplest Automation on the Planet</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>If This Then That — connect 900+ apps with zero code in under 2 minutes</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE TIER', '#4ADE80'], ['ifttt.com', color], ['No-Code', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>IFTTT — "If This Then That" — is the original consumer automation platform. Founded in 2011, it pioneered the idea that anyone (not just developers) should be able to connect apps and automate repetitive tasks. The core idea is beautifully simple: pick a trigger from one service, and an action to run in another. Done. No flowcharts, no code, no configuration overhead. With 900+ supported services — from Gmail and Instagram to smart home devices, Spotify, weather alerts, and now ChatGPT — IFTTT covers the everyday digital life of students and non-technical users better than any other tool. The free plan gives you up to 5 Applets and is genuinely useful for personal automations. For multi-step workflows or faster execution, Pro starts at $2.78/month.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'IFTTT Tutorial For Beginners (Automation Software) — Better than Zapier?', url: 'https://www.youtube.com/watch?v=Rm37IdWDiYE', dur: '~15 min', note: 'Jan 2024 — full walkthrough of applets, triggers, actions, and real use cases' },
            { label: 'How To Start Using IFTTT If This Then That For Beginners', url: 'https://www.youtube.com/watch?v=wPuxauvRbTc', dur: '~12 min', note: 'May 2024 — step-by-step setup for complete beginners, free tier walkthrough' },
            { label: 'IFTTT Tutorial | Beginner\'s Guide', url: 'https://www.youtube.com/watch?v=IRLMkV-tCKQ', dur: '~18 min', note: 'Most-watched IFTTT beginner tutorial — applet creation, smart home, social media' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What is an Applet */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="The Applet — IFTTT's core concept" color={color} />
          <InfoBox color={color} dark={dark}>An Applet is IFTTT's word for an automation. Every Applet has two required parts: a Trigger ("This") and an Action ("That"). The Trigger is something that happens in one service — a new Instagram post, a weather alert, a new email, a calendar event starting, your phone entering a GPS location. The Action is what IFTTT does in response — send a notification, save a file to Dropbox, add a row to a spreadsheet, turn on a smart light. Applets run automatically in IFTTT's cloud — nothing needs to stay open on your device.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>IFTTT pre-built 300,000+ community Applets that you can enable with one click. You can browse by category — social media, smart home, productivity, notifications — and enable any Applet in under 30 seconds. Creating your own custom Applet is equally fast: choose a trigger service, pick the trigger event, choose an action service, map the fields, and save. The whole flow takes under 2 minutes and requires zero technical knowledge.</p>
        </Block>

        {/* Popular use cases */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Popular use cases for students" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Social media automation', desc: 'Auto-share Instagram posts to Twitter/X. Cross-post new YouTube videos to Facebook. Save every tweet you like to a Google Sheet. Maintain social presence without manual copy-pasting across platforms.' },
            { name: 'Study & productivity alerts', desc: 'Get a daily weather notification at 7am so you dress right. Set a recurring reminder every Sunday to review your weekly goals. Trigger a phone vibration when a specific contact emails you.' },
            { name: 'Smart home shortcuts', desc: 'Turn off all smart lights when you leave home (GPS trigger). Set the thermostat when the first person arrives. Play a Spotify playlist when your morning alarm fires. IFTTT invented consumer smart home automation.' },
            { name: 'Content saving pipeline', desc: 'Save any article you star in Feedly to Pocket for offline reading. When you save a bookmark in Safari, add it to a Notion database. Build a personal knowledge base automatically without manual entry.' },
            { name: 'Gmail auto-organization', desc: 'When a new email arrives from a specific sender, add a label and forward it to a Slack channel. Auto-save Gmail attachments to Google Drive. Log every newsletter you receive to a spreadsheet for weekly review.' },
            { name: 'AI content assistant', desc: 'Use IFTTT\'s ChatGPT integration: when a new RSS article is published, send it to ChatGPT to summarize it, then post the summary to a Slack channel or save to Notion. AI-powered content curation with zero effort.' },
          ]} />
        </Block>

        {/* Getting started */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Getting started — create your first Applet" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Sign up at ifttt.com', body: "Go to ifttt.com and create a free account with Google, Apple, or email. The free plan lets you create up to 5 active Applets — enough to automate your most useful daily tasks. No credit card required." },
            { n: '2', title: 'Browse or create', body: 'Click "Explore" to browse 300,000+ pre-built community Applets organized by category. Find one you like and click "Connect" — IFTTT will ask you to link the relevant accounts (e.g. Gmail + Slack) and the Applet activates immediately. Or click "Create" to build your own.' },
            { n: '3', title: 'Choose your trigger (If This)', body: 'Search for a trigger service — Gmail, Instagram, Google Calendar, Weather Underground, YouTube, Spotify, etc. Select the trigger event: "New email from", "New post by you", "Event starts in 30 minutes", "Temperature drops below". Fill in any required trigger fields.' },
            { n: '4', title: 'Choose your action (Then That)', body: 'Search for an action service. Map any dynamic data from the trigger into the action fields using "ingredients" — these are the variables IFTTT extracts from the trigger (subject line, post URL, temperature value, etc.). You click them in — no typing required.' },
            { n: '5', title: 'Save and activate', body: "Give your Applet a name and click Finish. It's now live. IFTTT polls your trigger service every 15 minutes on the free plan (near-instant on Pro). Check the Activity log to see when it ran and what it did." },
          ]} />
        </Block>

        {/* Free vs Pro */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Free vs Pro — what you actually get" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Applet limit', badge: 'Free = 5, Pro = unlimited', body: 'Free plan: up to 5 active Applets at any time. Pro ($2.99/month) and Pro+ ($8.99/month) unlock unlimited Applets. For most students, 5 carefully chosen Applets cover the most valuable automations. Prioritize: 1 social cross-post, 1 smart notification, 1 content-save, 1 Gmail rule, 1 AI summary.' },
            { label: 'Multi-step Applets', badge: 'Pro+ only', body: 'The free plan and standard Pro plan only support one trigger → one action. Multi-step Applets (one trigger → multiple actions, or chained logic) require Pro or Pro+. For example: new Instagram post → post to Twitter AND save to Google Sheets AND send a Slack notification. This is the biggest limitation of the free plan.' },
            { label: 'Execution speed', badge: 'Pro is ~instant, Free is up to 1hr', body: 'Free plan Applets poll trigger services every 15 minutes to 1 hour depending on the service. Pro Applets are prioritized and run near-instantly. For time-sensitive automations (stock alerts, urgent notifications), the free tier delay can be a real problem. For save-to-spreadsheet style tasks, the delay is usually fine.' },
            { label: 'AI features & filter code', badge: 'Pro+ required for filter code', body: 'ChatGPT and Claude integrations work on free (they are just action services). Filter code — JavaScript snippets that let you add conditional logic to Applets ("only run if the email subject contains X") — requires Pro+. For basic conditional routing, you can work around this with multiple separate Applets.' },
          ]} />
        </Block>

        {/* IFTTT vs Zapier vs n8n */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="IFTTT vs Zapier vs n8n — choose the right tool" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Target audience', badge: 'Different jobs', body: 'IFTTT = consumers and students who want simple personal automations with minimal setup. Zapier = business teams automating operational workflows across SaaS tools. n8n = developers and technical teams who need custom logic, self-hosting, and unlimited scale. They rarely compete directly — most power users end up using all three for different purposes.' },
            { label: 'Ease of use', badge: 'IFTTT wins clearly', body: "IFTTT's trigger-action model is the simplest automation concept that exists. Creating an Applet takes 2 minutes from zero. Zapier adds more complexity (multi-step Zaps, filters, paths) which is powerful but slower to learn. n8n has a node-canvas that requires understanding workflow concepts. If you've never used automation tools before, start with IFTTT." },
            { label: 'App integrations', badge: 'Zapier wins (7,000+)', body: 'IFTTT: 900+ services, strong on consumer apps (Instagram, Spotify, smart home, Strava, weather, Fitbit). Zapier: 7,000+ apps, much better business software coverage (CRMs, project management, finance tools). n8n: 500+ with HTTP Request node as a universal fallback. For everyday consumer apps, IFTTT usually has what you need.' },
            { label: 'Smart home support', badge: 'IFTTT wins decisively', body: 'IFTTT invented consumer smart home automation and still dominates it. Google Home, Amazon Alexa, Philips Hue, LIFX, Nest, Ring, SmartThings — all deeply integrated. Zapier and n8n have minimal smart home support. If smart home automation is your goal, IFTTT is the only real choice.' },
            { label: 'Pricing at scale', badge: 'n8n wins (self-hosted = free)', body: 'IFTTT: $0 (5 Applets) or $2.99/month Pro. Zapier: $0 (5 Zaps, 100 tasks) or $20/month+. n8n: free self-hosted (unlimited), $24/month cloud. For students doing personal automations, IFTTT free or Pro is the most affordable. For business-scale, n8n self-hosted wins on cost.' },
          ]} />
        </Block>

        {/* AI integrations */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="AI integrations — IFTTT meets ChatGPT and Claude" color={color} />
          <InfoBox color={color} dark={dark}>IFTTT now connects to ChatGPT (OpenAI), Claude (Anthropic), and DeepSeek as action services. This means you can use any IFTTT trigger to send data to an AI model and use the response in a subsequent action. IFTTT also offers an MCP (Model Context Protocol) integration — your AI assistant can directly trigger IFTTT Applets from a conversation. An official IFTTT Automation Assistant GPT on ChatGPT lets you manage Applets directly from the ChatGPT interface.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'AI content summarizer', body: "Trigger: New RSS item from your favorite tech blog. Action: Send article text to ChatGPT with prompt 'Summarize this in 3 bullets'. Second action (Pro): Post summary to Slack or save to Notion. You get daily AI-curated digests without reading every article." },
            { n: '2', title: 'Smart email digest', body: "Trigger: New starred email in Gmail. Action: Send email body to ChatGPT with prompt 'Extract the key action items from this email'. Second action (Pro): Create a task in Todoist or append to a Google Doc. Your inbox turns into a task list automatically." },
            { n: '3', title: 'Social media AI writer', body: "Trigger: New photo posted to Instagram. Action: Send caption to ChatGPT with prompt 'Rewrite this caption for a LinkedIn professional audience, keep under 200 chars'. Second action: Post the AI-rewritten version to LinkedIn. One post, two platforms, two tones." },
          ]} />
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Create 3 Useful Personal Automations</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Build three real Applets that solve actual friction in your daily life. Use all 5 free Applet slots strategically — these three are proven to be immediately useful for students. Once they're running, you'll feel the difference within a week.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Morning weather alert', body: "Create Applet → Trigger: Weather Underground 'Today's weather report' → fires every day at 7:00 AM. Action: Notifications 'Send a rich notification' with the day's forecast. You'll never leave home underdressed again. Takes 90 seconds to set up." },
            { n: '2', title: 'Auto-save social posts to Google Sheets', body: "Trigger: Instagram 'New photo post by you'. Action: Google Sheets 'Add row to spreadsheet'. Map fields: Date, Caption, Image URL, Likes count. After a month you'll have a personal analytics sheet of everything you posted — zero manual work." },
            { n: '3', title: 'RSS to Pocket reading list', body: "Pick one blog or news site you want to keep up with. Trigger: RSS Feed 'New feed item' (enter the RSS URL). Action: Pocket 'Save for later'. Every new article automatically lands in your Pocket reading list. Read on your commute, offline, on any device." },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>FREE TIER: 3 Applets uses only 60% of your 5 free slots — save the other 2 for personal ideas you discover later</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>{"IFTTT is the best first automation tool to learn because it teaches the trigger-action mental model without any distracting complexity. Once you understand 'something happens → something else happens automatically', you're ready to graduate to Zapier (for business tools) or n8n (for custom logic and scale). Think of IFTTT as your automation kindergarten — simple, friendly, and surprisingly powerful for everyday life. Many professionals still use IFTTT alongside Zapier and n8n because some consumer app integrations (smart home, fitness trackers, social media) exist only in IFTTT."}</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/automation/zapier')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Zapier
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/local/ollama')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Ollama <ChevronRight size={14} />
          </button>
        </div>

      </div>
      <ScrollToTop />
    </div>
  )
}

function Block({ title, titleColor, dark, border, card, children }) {
  return (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '1.375rem', backdropFilter: 'blur(8px)', marginBottom: '1.25rem' }}>
      {title && <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.14em', color: titleColor, textTransform: 'uppercase', paddingBottom: '0.75rem', marginBottom: '1rem', borderBottom: `1px solid ${titleColor}20` }}>{title}</div>}
      {children}
    </div>
  )
}

function VideoCard({ v, dark, txt, muted }) {
  return (
    <a href={v.url} target="_blank" rel="noopener noreferrer"
      style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1.125rem', borderRadius: 11, textDecoration: 'none', background: dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.16)', marginBottom: '0.625rem', transition: 'background 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.09)'}
      onMouseLeave={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)'}
    >
      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Play size={13} color="#fff" fill="#fff" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: txt }}>{v.label}</div>
        {(v.dur || v.note) && <div style={{ fontSize: '0.7rem', color: muted, marginTop: 2 }}>{[v.dur, v.note].filter(Boolean).join(' · ')}</div>}
      </div>
      <ExternalLink size={12} color={muted} />
    </a>
  )
}
