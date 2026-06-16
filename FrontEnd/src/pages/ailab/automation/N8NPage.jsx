import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#F97316'

export default function N8NPage() {
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>⚙️</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>n8n — Open-Source Workflow Automation with AI</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Connect any app to any AI model with visual workflow builder</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE self-host', '#4ADE80'], ['500+ integrations', color], ['Visual + code', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>n8n is an open-source workflow automation platform — think Zapier, but self-hosted, free, and with native AI capabilities built in. You build workflows visually by connecting nodes: a trigger (webhook, schedule, email received), processing steps (AI model call, data transformation, conditional logic), and actions (send Slack message, update database, create calendar event). n8n's AI nodes support OpenAI, Anthropic, Google Gemini, and local models via Ollama — letting you build AI-powered automations without writing backend code. Self-hosted means you run it on your own machine or a cheap server, paying nothing for the software. For developers, n8n also supports writing custom JavaScript or TypeScript in any node — the best of visual and code approaches.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'n8n Tutorial for Beginners — Complete Guide 2024', url: 'https://www.youtube.com/watch?v=1MwSoB0gnM4', dur: '25 min', note: 'Full platform walkthrough' },
            { label: 'n8n AI Workflows — Build LLM Automation Pipelines', url: 'https://www.youtube.com/watch?v=RM-GCLOTrWk', dur: '18 min', note: 'AI-specific features' },
            { label: 'n8n Self-Hosting Setup — Docker Installation Guide', url: 'https://www.youtube.com/watch?v=0m_RX5y5FtI', dur: '12 min', note: 'Local setup with Docker' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Why n8n over Zapier */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why n8n over Zapier" color={color} />
          <InfoBox color={color} dark={dark}>n8n is free to self-host with no per-task pricing. Zapier charges per "zap execution" — at scale, automation costs compound quickly. n8n also allows custom JavaScript in any node, handles complex data transformations that Zapier cannot express, and has native AI model integration. The tradeoff: Zapier is hosted and zero-maintenance; n8n requires running your own instance (trivial with Docker).</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The AI integration is n8n's current strongest differentiator. AI Agent nodes, LLM Chain nodes, and vector store nodes are built in — you can build a complete RAG pipeline visually: receive a user message via webhook → embed it → search ChromaDB → pass retrieved context + question to OpenAI → return answer. No code. This visual AI workflow approach makes building AI-powered automations accessible to people who understand the concepts but do not want to write Python.</p>
        </Block>

        {/* Core node types */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Core node types" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Trigger nodes', desc: 'Start a workflow: webhook (HTTP call), schedule (cron), email received, new file in Google Drive, new row in database. Every workflow starts with a trigger.' },
            { name: 'AI Agent node', desc: 'A complete LangChain agent with tool use. Give it tools (web search, HTTP request, database query) and it autonomously uses them to complete a task. No code required.' },
            { name: 'LLM Chain node', desc: 'Send a prompt to any LLM (OpenAI, Anthropic, Groq, Ollama). Chain multiple LLM calls. Pass data from previous nodes into prompts dynamically.' },
            { name: 'Vector Store nodes', desc: 'Store embeddings in Pinecone, Qdrant, or Supabase. Query vector stores. Build visual RAG pipelines without writing Python.' },
            { name: 'Code node', desc: 'Write JavaScript or Python directly in any node. Full access to node input data, npm packages, and Python libraries. For anything the visual nodes cannot express.' },
            { name: 'HTTP Request node', desc: 'Call any REST API. Set method, headers, body, authentication. n8n can integrate with any service that has an API, even ones without built-in nodes.' },
          ]} />
        </Block>

        {/* Setting up n8n locally */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Setting up n8n locally" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install with Docker (recommended)', body: 'docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n\nOpen http://localhost:5678 in your browser. Create your account. n8n is now running locally.' },
            { n: '2', title: 'Or install with npm', body: 'npm install n8n -g\nn8n start\nSame result, no Docker needed. npm install takes longer but works without Docker Desktop.' },
            { n: '3', title: 'Connect your first service', body: 'Add a credential: Settings → Credentials → Add Credential. Search for Gmail, Slack, OpenAI, etc. Follow the OAuth or API key setup. Credentials are stored encrypted locally.' },
            { n: '4', title: 'Import a template workflow', body: 'n8n.io/workflows has hundreds of pre-built templates. Import any template with one click. This is the fastest way to see a working workflow and understand node patterns.' },
          ]} />
        </Block>

        {/* Building an AI workflow */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Building an AI workflow" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Add a webhook trigger', body: 'Add Webhook node → copy the test URL → this is the endpoint that starts your workflow. Test it with a POST request from Postman or curl.' },
            { n: '2', title: 'Add an LLM Chain node', body: 'Connect the webhook output to an LLM Chain node. Set the model (OpenAI, Groq, Anthropic). Write a system prompt. Use {{ $json.body.message }} to insert the webhook payload dynamically.' },
            { n: '3', title: 'Add processing logic', body: 'Between nodes: IF node for conditional branching, Set node to reshape data, Function node for custom JavaScript. The node graph is your application logic.' },
            { n: '4', title: 'Add an output action', body: 'Send the LLM response via Slack, email, or HTTP response to the webhook caller. Actions are nodes just like triggers — search for the service, connect credentials, configure the action.' },
            { n: '5', title: 'Activate and test', body: 'Toggle the workflow to Active. Now it runs every time the trigger fires. Use the execution log to see every run — inputs, outputs, and errors at each node.' },
          ]} />
        </Block>

        {/* n8n vs Zapier vs Make */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="n8n vs Zapier vs Make" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'n8n', badge: 'Best for developers', body: 'Free to self-host, unlimited executions, custom code in any node, built-in AI nodes, handles complex data. Requires running your own instance (Docker or npm). Best when you need power and control over cost.' },
            { label: 'Zapier', badge: 'Easiest to start', body: 'Fully hosted, 7,000+ app integrations, zero setup. Paid per task execution — costs add up at scale. Limited to built-in node logic, no custom code. Best for simple automations where simplicity beats cost.' },
            { label: 'Make (formerly Integromat)', badge: 'Middle ground', body: 'Hosted, cheaper than Zapier, handles complex scenarios better. Good for teams needing hosted automation with more power than Zapier. n8n self-hosted is typically still cheaper for high-volume automations.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Build AI-powered automations without writing backend code — visual pipeline for the full RAG flow',
            'Connect 500+ services (Gmail, Slack, GitHub, Notion, databases) to AI models in a visual editor',
            'Create webhooks that trigger AI workflows from any external service or your own application',
            'Build scheduled jobs that run AI analysis on data, generate reports, and send results automatically',
            'Self-host with Docker for zero ongoing software cost and full data privacy',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build an AI Email Summarizer</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Create an n8n workflow that: (1) triggers when a new email arrives in Gmail (or polls every 30 minutes), (2) sends the email subject + body to an LLM to generate a 3-sentence summary and priority rating (high/medium/low), (3) sends the summary to a Slack channel (or writes to a Google Sheet). This is a real productivity automation that runs 24/7 once deployed.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Set up n8n and connect Gmail', body: 'Run n8n locally with Docker. Add Gmail OAuth credential. Add Google Sheets or Slack credential. Test each connection independently before building the workflow.' },
            { n: '2', title: 'Build the trigger', body: 'Gmail trigger node → set to poll every 15 minutes for unread emails. Configure filters if needed (specific label, sender, subject pattern). Test with one real email.' },
            { n: '3', title: 'Add the LLM summarization', body: "LLM Chain node → system prompt: 'You are an email assistant. Summarize emails concisely in 3 sentences. Rate priority as HIGH, MEDIUM, or LOW based on urgency and action required.' Dynamic prompt includes {{$json.subject}} and {{$json.text}}." },
            { n: '4', title: 'Route the output', body: 'Add a Slack message node or Google Sheets append node. Format the message: Subject, Priority badge, Summary. Activate the workflow and let it run on your real inbox for one day.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — n8n self-hosted is free software; only LLM API calls cost money</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Use n8n's built-in execution history to debug workflows. Every execution saves the input and output of every node. When a workflow fails or produces wrong output, open the failed execution and click through each node to see exactly what data was present at each step. This is dramatically faster than print-statement debugging — you see the full data flow visually.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/agents/mcp')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> MCP
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/automation/flowise')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Flowise <ChevronRight size={14} />
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
