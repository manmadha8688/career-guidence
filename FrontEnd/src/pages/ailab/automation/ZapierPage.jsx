import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#F97316'

export default function ZapierPage() {
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>⚡</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Zapier — Automate Your Workflow Without Writing Code</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Connect 7,000+ apps and add AI to any automation</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE tier', '#4ADE80'], ['7,000+ integrations', color], ['No-code automation', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Zapier is the most widely used no-code automation platform — with over 7,000 app integrations, it connects virtually any two services without writing code. A "Zap" is an automated workflow: a trigger in one app causes an action in another. When a new row is added to Google Sheets, send a Slack message. When a form is submitted, create a Trello card and send an email. Zapier added AI steps in 2023-2024 — you can now add ChatGPT, Claude, or Gemini as processing steps in any Zap, letting you transform, analyze, and generate content as part of your automations. The free plan includes 5 Zaps with 100 tasks per month — enough for learning and simple personal automations. Zapier's value is its breadth: if an app exists, Zapier probably supports it.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Zapier Tutorial for Beginners — 2024 Complete Guide', url: 'https://www.youtube.com/watch?v=aXBAfcHILKo', dur: '20 min', note: 'Full Zapier walkthrough for beginners' },
            { label: 'Zapier AI Steps — Add ChatGPT to Any Automation', url: 'https://www.youtube.com/watch?v=gJqKnX0h0yc', dur: '14 min', note: 'AI integration tutorial' },
            { label: 'Zapier Free Plan — What You Can Do and Its Limits', url: 'https://www.youtube.com/watch?v=9BO4PnCp2KA', dur: '10 min', note: 'Free tier guide' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* How Zapier works */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How Zapier works" color={color} />
          <InfoBox color={color} dark={dark}>Every Zap has two parts: a Trigger (something that happens in one app — new email, form submission, new calendar event, new database row) and one or more Actions (things that happen in response — send message, create record, update spreadsheet, call API). When the trigger fires, Zapier automatically runs all the actions. The whole thing runs in Zapier's cloud — no server required.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>Zapier's AI steps changed the platform from simple data routing to intelligent automation. Add a "ChatGPT" action between trigger and output: receive a support email (trigger) → use ChatGPT to classify it as billing, technical, or general and draft a response (AI step) → route to the right Slack channel and send the draft to the support rep (actions). Tasks that previously required custom backend code now take 10 minutes to set up with Zapier.</p>
        </Block>

        {/* Common automation patterns */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Common automation patterns" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Form → notification', desc: 'Google Forms or Typeform submission → Slack notification or email. Every form fill appears in a channel immediately. Add an AI step to summarize or classify the submission.' },
            { name: 'Email → task', desc: 'New email matching a filter → create Trello/Asana/Notion task with email details. AI step: extract action items from the email body and add them as task description.' },
            { name: 'Sheet → outreach', desc: 'New row in Google Sheets → send personalized email or LinkedIn connection request. AI step: personalize the message using data from the row.' },
            { name: 'Social → content', desc: 'New RSS feed item → generate summary with AI → post to Twitter/LinkedIn/Slack. Content pipeline that runs automatically without manual curation.' },
            { name: 'Meeting → notes', desc: 'Calendar event ends → trigger a Zap → AI step transcribes/summarizes the meeting notes → creates Notion page and sends recap email to attendees.' },
            { name: 'Support → routing', desc: 'New Zendesk ticket → AI classifies urgency and category → routes to the right team in Slack with priority badge. Intelligent triage without manual review.' },
          ]} />
        </Block>

        {/* Building your first Zap */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Building your first Zap" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Sign up and choose a trigger', body: 'zapier.com → Create Zap. Search for your trigger app (Gmail, Google Forms, Notion, Slack). Choose the trigger event (New Email, New Form Response, etc.). Connect your account via OAuth.' },
            { n: '2', title: 'Configure the trigger', body: 'Set filters if needed — only trigger on emails with a specific label, forms from a specific form, etc. Click Test Trigger to pull in real sample data from your connected account.' },
            { n: '3', title: 'Add an AI step (optional)', body: "Add Action → search 'ChatGPT' or 'AI by Zapier'. Choose an action like 'Send Message' or 'Extract Data'. Write a prompt that uses data from the trigger: 'Classify this support email as billing, technical, or general: {{trigger.body}}'" },
            { n: '4', title: 'Add the output action', body: 'Add another action — Slack, Gmail, Notion, Trello, Google Sheets, etc. Map the fields from previous steps into the action fields. The AI step output appears as a variable you can use.' },
            { n: '5', title: 'Test and turn on', body: 'Test each step with real data. Fix any mapping errors. Turn the Zap on. It now runs automatically every time the trigger fires. Monitor the first few runs in the Zap history.' },
          ]} />
        </Block>

        {/* Zapier vs n8n */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Zapier vs n8n — when to use each" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Setup complexity', badge: 'Zapier wins', body: "Zapier: sign up, connect apps, done. Fully hosted with no infrastructure. n8n: requires running a local instance (Docker/npm) or paying for n8n Cloud. For anyone non-technical or for quick personal automations, Zapier's zero-setup is a major advantage." },
            { label: 'Cost at scale', badge: 'n8n wins', body: 'Zapier free: 100 tasks/month. Zapier paid: starts at $20/month for 750 tasks. At higher volumes (1000s of tasks), Zapier costs compound significantly. n8n self-hosted: unlimited tasks, no per-execution cost. For high-volume automations, n8n is dramatically cheaper.' },
            { label: 'App integrations', badge: 'Zapier wins clearly', body: 'Zapier: 7,000+ apps. n8n: 500+ apps. For connecting less common business tools (CRMs, niche SaaS products, enterprise software), Zapier almost certainly has the integration you need. n8n may not.' },
            { label: 'Custom logic', badge: 'n8n wins', body: "n8n supports full JavaScript/Python in any node. Zapier's code step is limited and the overall platform is designed for simple trigger-action patterns. For automations with complex branching, data transformation, or custom API calls, n8n handles it better." },
          ]} />
        </Block>

        {/* Zapier AI Steps */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Zapier AI Steps — practical uses" color={color} />
          <InfoBox color={color} dark={dark}>{"Zapier's AI steps use OpenAI's API under the hood. You do not need your own OpenAI key — Zapier includes AI step credits in its plans. The AI step appears as a regular action in your Zap: configure a prompt, map in data from previous steps as variables, use the output in subsequent actions. The simplicity is the point."}</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Classify and route', body: "AI prompt: 'Classify this support ticket as: BILLING, TECHNICAL, ACCOUNT, or OTHER. Reply with only the category word.' Use the output to route to different Slack channels with Filter steps." },
            { n: '2', title: 'Summarize content', body: "AI prompt: 'Summarize this article in 3 bullet points: {{article_text}}'. Use the summary in a Slack message or email digest. Works for newsletters, reports, research papers." },
            { n: '3', title: 'Extract structured data', body: "AI prompt: 'Extract the name, email, company, and budget from this inquiry: {{form_response}}. Reply as JSON.' Parse the JSON in a subsequent step to populate different fields in your CRM." },
            { n: '4', title: 'Generate personalized content', body: "AI prompt: 'Write a personalized follow-up email for {{name}} from {{company}} who is interested in {{product}}. Keep it under 100 words, professional tone.' Use the output in a Gmail send action." },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Connect any two apps you use daily and automate the data transfer between them',
            'Add AI processing to any automation — classify, summarize, extract, or generate content in the middle of a workflow',
            'Build personal productivity automations: digest emails, route notifications, log activities automatically',
            'Create content pipelines that automatically summarize, transform, and distribute content across platforms',
            'Automate repetitive tasks that currently require you to copy-paste data between apps',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Job Application Tracker</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Create a Zapier workflow that automatically tracks your job applications. When you receive an email from a company you applied to: (1) an AI step extracts the company name, role, and response type (interview invite, rejection, follow-up needed, waiting), (2) a Google Sheets step adds a row with this data + date. After building it, apply to 10 companies over a week and let the automation populate your tracker. This is a real tool you will use.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Set up the Gmail trigger', body: "Create Zap → Gmail trigger → New Email. Filter by label if you have a 'Job Applications' label, or leave unfiltered and let AI classify. Test with a real application email." },
            { n: '2', title: 'Add AI extraction step', body: "Add Action → AI by Zapier → Analyze Text. Prompt: 'From this email, extract: Company Name, Job Title, Response Type (INTERVIEW_INVITE/REJECTION/FOLLOW_UP/OTHER/WAITING). Reply as JSON with keys: company, title, response_type.' Input: {{email body}}." },
            { n: '3', title: 'Add Google Sheets step', body: 'Add Action → Google Sheets → Create Spreadsheet Row. Map fields: Date (today), Company (from AI output), Role (from AI output), Status (from AI output), Email Subject. Set up the spreadsheet with those column headers first.' },
            { n: '4', title: 'Test and activate', body: 'Send yourself a test email mimicking a job application response. Run through all steps. Verify the sheet row is created correctly. Activate the Zap. Apply for jobs and watch your tracker populate automatically.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>FREE TIER: 5 Zaps, 100 tasks/month — this project fits comfortably within the free plan</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>{"Zapier's free tier resets monthly and gives you 100 task executions. Each step in a Zap counts as one task — a 3-step Zap uses 3 tasks per execution. For automations that run frequently (every hour) or with many steps, this limit is reached quickly. Prioritize your 5 free Zaps for automations that run less frequently but save significant manual time. For high-frequency automations, n8n self-hosted is more practical."}</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/automation/dify')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Dify
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
