import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#F97316'

export default function MakePage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(249,115,22,0.09)' : 'rgba(249,115,22,0.11)'
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🔄</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Make — Visual Automation That's 13x Cheaper Than Zapier</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Build complex AI workflows on a flowchart canvas — no code, 1,000 free operations/month</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE TIER', '#4ADE80'], ['1,000 ops/month free', color], ['make.com', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Make (formerly Integromat) is a visual no-code automation platform that lets you connect apps and build workflows on a flowchart canvas — where each circle represents an action in a service like Gmail, Notion, Slack, or an AI model like ChatGPT. The critical difference from Zapier: Make's free tier gives 1,000 operations per month versus Zapier's 100, and the first paid tier at $9/month provides 10,000 operations versus Zapier's $19.99/month for 750. Make handles complex logic — branches, loops, error handling, iterating through lists — that Zapier cannot express without expensive workarounds. For students building automation projects or AI-powered workflows, Make is the visual platform that gives you genuine power without writing backend code.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Make Automation and ChatGPT — Beginner\'s Guide To AI Automation | Tutorial For 2024', url: 'https://www.youtube.com/watch?v=iDxDVPUSQW8', dur: 'Beginner', note: 'AI automation with Make + ChatGPT' },
            { label: 'Make.com Automation Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=JSA2oezQWOU', dur: 'May 2024', note: 'Beginner tutorial — full walkthrough' },
            { label: 'Master Make.com in 2 Hours: Complete Beginner\'s Guide', url: 'https://www.youtube.com/watch?v=MpmpC4C5fZs', dur: '2 hrs', note: 'Comprehensive guide — covers all core features' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Core concepts */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Core concepts" color={color} />
          <InfoBox color={color} dark={dark}>Everything in Make happens inside a Scenario — a visual flowchart you build on a canvas. Each circle is a Module: an action like "Watch new email" (a trigger), "Send a message" (an action), or "Call OpenAI" (an AI step). When a trigger fires, Make executes all the modules in sequence. Each module execution counts as one Operation — your monthly billing unit. 1,000 free operations means 1,000 total module executions across all your scenarios.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>What separates Make from Zapier at the technical level is its handling of complex data flows. When a trigger returns a list of items — 5 new emails, 10 new spreadsheet rows, a JSON array from an API — Make's Iterator module processes each item individually through a sub-flow, then its Aggregator combines results back into a single output. Zapier handles lists clumsily; this pattern is native in Make. For AI workflows where you process batches of items (classify 10 emails, summarize 20 articles), this makes a real difference.</p>
        </Block>

        {/* Building your first scenario */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Building your first scenario" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Sign up and open a new scenario', body: 'make.com → free signup, no credit card. Dashboard → Create a new scenario. You see the canvas — a blank workspace where you will drag and connect modules. Click the + button in the center to add your first module.' },
            { n: '2', title: 'Add a trigger module', body: 'Search for your trigger app (Gmail, Google Sheets, Webhook, Schedule). Choose the trigger event ("Watch new emails", "New spreadsheet row", "Incoming webhook"). Connect your account via OAuth. Click Run once to fetch a test event — this is the sample data all later modules can use.' },
            { n: '3', title: 'Add an AI processing module', body: 'Click the + after your trigger. Search "OpenAI". Choose "Create a Completion" or "Create a Message". Write your prompt in the message field. Use the data panel on the left to insert values from the trigger — click any field to insert it dynamically. Example: summarize {{1.subject}} + {{1.body}} (values from email trigger).' },
            { n: '4', title: 'Add an output module', body: 'Click + after the AI module. Search for your output app (Slack, Notion, Gmail, Google Sheets). Choose the action ("Send a message", "Create a page", "Add a row"). Map the AI output into the output fields — drag from the data panel or type {{ to insert values.' },
            { n: '5', title: 'Test, schedule, and activate', body: 'Click Run once to execute the scenario with your test data. Check each module\'s output in the execution log. Fix any mapping errors. Set a schedule (every 15 minutes, every hour, daily). Toggle the scenario Active. It now runs automatically.' },
          ]} />
        </Block>

        {/* Make vs Zapier vs n8n */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Make vs Zapier vs n8n" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Make', badge: 'Best value, visual power', body: '1,000 free ops/month (10x Zapier). $9/month for 10,000 ops (13x more than Zapier\'s $19.99/750). Visual flowchart handles branching, loops, iterators — things Zapier cannot do cleanly. 1,500+ app integrations. Best for students who want visual and power without developer overhead.' },
            { label: 'Zapier', badge: 'Simplest for basics', body: '100 free tasks/month. $19.99/month for 750 tasks. Linear step-by-step builder — easiest to use for simple 2-step automations. 7,000+ integrations (most of any platform). Best when: you just need a simple trigger → action and want zero learning curve.' },
            { label: 'n8n', badge: 'Best for developers', body: 'Free self-hosted (unlimited). $20/month cloud. 400+ native nodes + HTTP for any API. Full JavaScript and Python code in any node. AI agent workflows built in. Fastest runtime (~2.2s). Best when: you are comfortable with code and want maximum flexibility and control.' },
          ]} />
        </Block>

        {/* AI workflows you can build */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="AI workflows you can build" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Email classification pipeline', desc: 'Gmail trigger → OpenAI "classify this email as billing/technical/general/other" → route to different Slack channels based on the AI classification. No backend code needed.' },
            { name: 'Content summarizer', desc: 'RSS feed trigger (new article) or Notion webhook → OpenAI summarize in 3 bullet points → append to Notion database → post to Slack or Discord. Runs every hour automatically.' },
            { name: 'Job application tracker', desc: 'Watch Gmail for job application responses → OpenAI extract company name, role, response type (interview/rejection/follow-up) → add row to Google Sheets job tracker. AI-powered inbox parsing.' },
            { name: 'Study note publisher', desc: 'Notion trigger (new page in study notes database) → OpenAI generate 5 key points from the content → create a Notion summary card → post to Discord study server.' },
            { name: 'GitHub → Slack alerts', desc: 'GitHub webhook (new PR, new issue, new comment) → format message with branch name, author, description → send to team Slack with color-coded priority. Team project coordination.' },
            { name: 'Form to everything', desc: 'Google Forms submission → OpenAI classify or extract data from the response → route to Airtable (CRM), calendar (if meeting request), or email (if contact form). One form, intelligent routing.' },
          ]} />
        </Block>

        {/* Free tier strategy */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Free tier strategy" color={color} />
          <InfoBox color={color} dark={dark}>1,000 free operations sounds like a lot — but a 4-module scenario running every 15 minutes uses 4 ops × 4 runs/hour × 24 hours = 384 ops/day. A busy scenario can exhaust the free tier in 2-3 days. Plan which scenarios run frequently vs. which can run hourly or daily. Most student projects running 2-3 scenarios on hourly/daily schedules fit comfortably within the free tier.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Match execution frequency to need', body: 'Not every scenario needs to run every 15 minutes. Email summaries? Run hourly. Job tracker? Run every 6 hours. Study note publisher? Run when you add a note (webhook trigger, not scheduled). Match frequency to actual need.' },
            { n: '2', title: 'Use webhooks instead of polling', body: 'Polling ("watch for new emails every 15 min") uses operations even when there is nothing new. Webhook triggers fire only when something actually happens — zero wasted operations. When your apps support webhooks, prefer them over polling.' },
            { n: '3', title: 'Test with "Run once" before activating', body: 'Use "Run once" to test your scenario with real data before setting it to active. A buggy scenario running on a schedule wastes operations on every failed run. Get it working first, then activate.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Build AI-powered automation workflows visually without writing any backend code',
            'Connect 1,500+ apps to AI models (ChatGPT, Claude, Gemini) in scenarios that run automatically',
            'Process batches of items — emails, rows, articles — through AI and route results intelligently',
            'Get 10x more free automation than Zapier\'s free tier with the same zero-code approach',
            'Build impressive portfolio projects: automated job trackers, content pipelines, AI email routers',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}`, marginBottom: '0.5rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 7 }} />
              <span style={{ fontSize: '0.85rem', color: sub, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build an AI-Powered Content Summary Bot</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Create a Make scenario that watches an RSS feed from a blog you like (tech news, programming blogs, AI news), sends each new article to OpenAI for a 3-bullet-point summary, and posts the summary to a Discord channel or Notion database. Run it every 6 hours. This is a real tool you will actually use — and a portfolio project that demonstrates automation + AI integration without a single line of code.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Set up Make account and Discord/Notion', body: 'make.com → free signup. Set up a Discord server (or Notion workspace) if you do not have one. Find an RSS feed URL for a source you care about (most blogs have /feed or /rss). Collect: RSS URL, Discord webhook URL or Notion API key.' },
            { n: '2', title: 'Build: RSS → OpenAI → output', body: 'New scenario → RSS module (Watch RSS feed items) → OpenAI module (Create completion, prompt: "Summarize this article in 3 bullet points: {{title}} {{content}}") → Discord Send Message or Notion Create Page module. Map OpenAI output to the message/content field.' },
            { n: '3', title: 'Test with Run once', body: 'Click Run once. Make fetches the latest RSS item, sends it to OpenAI, and posts the summary. Check each module output in the execution log. Does the summary make sense? Is the Discord message formatted correctly?' },
            { n: '4', title: 'Schedule and activate', body: 'Set to run every 6 hours. Toggle Active. Leave it running for a week. Review the summaries — are they useful? Adjust the OpenAI prompt if the quality is off. This iterative refinement is how real automation projects improve.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Make free tier + OpenAI free credits on signup, no credit card required</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Make's scenario history (the Execution Log) is the most underused debugging tool. Every scenario run — success or failure — saves the complete input and output of every module. When something goes wrong, click the failed run in the history and see exactly what data entered each module and what error occurred. This is dramatically faster than adding print statements or re-running from scratch. Check the execution log before anything else when a scenario produces unexpected results.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/automation/zapier')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Zapier
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/automation/n8n')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            n8n <ChevronRight size={14} />
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
