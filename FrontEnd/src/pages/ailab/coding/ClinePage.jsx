import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#10B981'

export default function ClinePage() {
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Coding</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🔧</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Cline — Free Open-Source AI Agent in VS Code</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Like Claude Code but inside VS Code — bring your own API key, any model</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE Extension', '#4ADE80'], ['cline.bot', color], ['Open Source', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Cline started as "Claude Dev" — a VS Code extension built by a developer to bring Claude's agentic capabilities directly into the editor. It quickly became one of the most popular AI coding tools on the VS Code Marketplace, now with 5M+ installs and 61k+ GitHub stars. The core idea is simple but powerful: unlike GitHub Copilot (which suggests code) or Cursor (which requires a subscription), Cline is a completely free open-source extension where you bring your own API key from any provider you choose. The extension itself costs nothing — you pay only for the AI calls you make, and you can use free-tier APIs (Gemini, Groq) or local models via Ollama to keep costs at zero. Cline reads your entire codebase, edits files, runs terminal commands, and can even control a browser — all inside VS Code, with your approval at each step.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'How to Use Cline Code in VS Code: Beginner\'s Guide 2025', url: 'https://www.youtube.com/watch?v=7-cc7qAmDeo', dur: '~15 min', note: 'Full walkthrough — install, configure API key, first agentic task' },
            { label: 'Getting Started with Cline — The Best VS Code AI Plugin', url: 'https://www.youtube.com/watch?v=f33Fw6NiPpw', dur: '~18 min', note: 'Plan mode, Act mode, MCP servers, and Ollama local setup' },
            { label: 'Cline with Claude API — Build a Full App from Scratch', url: 'https://www.youtube.com/watch?v=KjqQC4AnJ1I', dur: '~20 min', note: 'Real project build using Plan/Act workflow and checkpoint rollbacks' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* BYOK Model explained */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="The BYOK model — why it matters" color={color} />
          <InfoBox color={color} dark={dark}>{"BYOK = Bring Your Own API Key. Cline the extension is 100% free and open source. You connect it to whichever AI provider you want — Anthropic, OpenAI, Google Gemini, Groq, or a local Ollama model. You pay the provider directly at their standard API rates. The key insight: with free-tier APIs (Gemini Flash via Google AI Studio, or Groq's free tier), your total cost for using Cline can be exactly $0."}</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>This matters because most AI coding tools lock you into their subscription or their chosen model. Cursor at $20/month uses whatever model Cursor picks. GitHub Copilot uses whatever Microsoft deploys. Cline inverts this: you choose the model, you control costs, and you can switch providers anytime. When Anthropic releases a better Claude model, you just update the model name in Cline's settings — no waiting for the tool vendor to update. When Google releases a new Gemini Flash with better free limits, you switch to that. This flexibility is why developers who care about cost control and model choice consistently prefer Cline over subscription tools.</p>
        </Block>

        {/* Key Features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Key features" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Full Agentic Loop', desc: 'Cline reads your entire codebase, creates and edits files, runs terminal commands, and drives a browser via Puppeteer. It acts like an autonomous developer — not just a suggestion engine.' },
            { name: 'Plan / Act Mode', desc: 'Switch to Plan mode: Cline devises a full implementation plan for review before touching any code. Switch to Act mode: it executes step-by-step with your approval at each file edit and terminal command.' },
            { name: 'Checkpoint System', desc: 'Every action creates a checkpoint — granular snapshots of your project state. If Cline goes in the wrong direction, one click rolls back to any previous checkpoint. Experiment freely with a safety net.' },
            { name: 'Multi-Model Support', desc: 'Claude 3.5/3.7, GPT-4o, Gemini 2.0 Flash, DeepSeek, Llama via Groq, any OpenAI-compatible endpoint, and local models via Ollama or LM Studio. One extension, every model.' },
            { name: 'MCP Server Support', desc: 'Cline has a built-in MCP Marketplace. Connect databases, CI/CD pipelines, cloud monitoring, web fetching, and hundreds of third-party APIs as tools Cline can use inside your workflow.' },
            { name: 'Approval-First Design', desc: 'Cline never acts without showing you what it wants to do. Every file edit, terminal command, and browser action is shown and requires your approval before execution — you stay in control.' },
          ]} />
        </Block>

        {/* Plan vs Act Mode */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Plan mode vs Act mode" color={color} />
          <InfoBox color={color} dark={dark}>{"Plan/Act is Cline's most important workflow feature. In Plan mode, Cline thinks and outlines — it reads your codebase and produces a step-by-step implementation plan without touching any files. You review and refine the plan. Then you switch to Act mode and Cline executes. This separation prevents the most common agentic failure: an AI that immediately starts making changes based on misunderstood requirements."}</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Switch to Plan mode', body: "Click the Plan/Act toggle in the Cline sidebar to enter Plan mode. Now Cline reads your codebase and thinks — it won't touch any files yet. Describe what you want to build or change." },
            { n: '2', title: 'Review the plan', body: 'Cline produces a structured implementation plan: what files it will create, what functions it will modify, what the overall approach is. Read it carefully. Push back on anything that looks wrong.' },
            { n: '3', title: 'Refine before acting', body: "In Plan mode you can ask follow-up questions: 'Why are you using approach X instead of Y?' or 'The auth module is actually in /lib/auth, not /utils.' Cline adjusts the plan. No code changed yet." },
            { n: '4', title: 'Switch to Act mode', body: 'Once the plan looks right, toggle to Act mode. Cline executes step-by-step, showing you each file edit and terminal command before running it. Approve each action or reject and redirect.' },
            { n: '5', title: 'Checkpoints auto-save', body: 'Every approved action creates a checkpoint. If something goes wrong three steps later, you can roll back to any earlier checkpoint instantly. This makes it safe to let Cline make sweeping changes.' },
          ]} />
        </Block>

        {/* Model options — free vs paid */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Model options — free vs paid" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Gemini 2.0 Flash (Google AI Studio)', badge: 'Free tier available', body: 'Get a free API key from aistudio.google.com — no billing required. Gemini 2.0 Flash is fast and capable. Free tier has rate limits (requests per minute) but is enough for learning projects. Best genuinely free option for most students.' },
            { label: 'Groq API (free tier)', badge: 'Free — ultra fast', body: 'Groq offers a free tier running Llama 4, Llama 3.3 70B, Qwen3-32B, and others on custom LPU hardware at 700+ tokens/second. Free tier: 30 req/min, 14,400/day. Excellent for fast iteration when you don\'t need frontier models.' },
            { label: 'Ollama (local models)', badge: '100% free — offline', body: 'Run models locally — no API key, no rate limits, no usage costs. Requires decent hardware: 8B models need ~8GB RAM/VRAM, 32B models need ~20GB. Works offline. Best for privacy and zero-cost unlimited usage if you have the hardware.' },
            { label: 'Claude API (Anthropic)', badge: 'Best quality — paid', body: 'Claude 3.5 Sonnet / Claude 3.7 is what Cline was originally built for and where it performs best. Pay-as-you-go: roughly $3/M input tokens, $15/M output. For a typical coding session: $0.10–$0.50. Worth it for serious projects.' },
            { label: 'OpenRouter', badge: 'Pay-per-use — flexible', body: 'OpenRouter is an API gateway that routes to 200+ models from one key and one bill. Pay only for what you use. Good option if you want to compare models or access models not available via direct APIs.' },
          ]} />
        </Block>

        {/* Cline vs Cursor vs Claude Code */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Cline vs Cursor vs Claude Code" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Cost model', badge: 'Cline is cheapest to start', body: 'Cline: free extension + your API costs (can be $0 with free tiers). Cursor: free tier with limits, then $20/month Pro. Claude Code: free CLI + Anthropic API costs. Cline gives you the most control over spending.' },
            { label: 'Where it lives', badge: 'Different environments', body: 'Cline: VS Code sidebar — GUI, file explorer, everything familiar. Claude Code: terminal only — powerful but CLI-native. Cursor: a full fork of VS Code — you leave VS Code and use Cursor as your editor.' },
            { label: 'Model flexibility', badge: 'Cline wins clearly', body: 'Cline: any model, any provider, switch anytime. Cursor: uses its own model routing (you can pick Claude/GPT but through Cursor\'s system). Claude Code: Anthropic models only. Cline is the most model-agnostic option.' },
            { label: 'MCP support', badge: 'Cline built it in from scratch', body: 'Cline has a built-in MCP Marketplace and MCP is architectural — every tool call goes through the MCP interface. Cursor added MCP later as an add-on. Claude Code supports MCP natively. Cline and Claude Code are stronger here.' },
            { label: 'Best for', badge: 'Different use cases', body: 'Cline: students and developers who want max flexibility and zero subscription costs while staying in VS Code. Cursor: teams and professionals who want the best GUI AI editor and don\'t mind paying. Claude Code: power users and production work on the command line.' },
          ]} />
        </Block>

        {/* MCP in Cline */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="MCP servers — extending what Cline can do" color={color} />
          <InfoBox color={color} dark={dark}>{"MCP (Model Context Protocol) is an open standard for giving AI tools access to external capabilities. In Cline, MCP servers are plugins that let Cline interact with databases, fetch web pages, call APIs, run cloud commands, and more — beyond just reading and editing files."}</InfoBox>
          <p style={{ ...P(sub), marginBottom: '1rem' }}>Cline launched its MCP Marketplace in early 2025. You can browse and install pre-configured MCP servers for common tools. Once installed, Cline can use those capabilities as part of its agentic loop — for example, a Postgres MCP server lets Cline query your database directly, inspect schema, and generate migrations based on real data.</p>
          {[
            'Fetch MCP — lets Cline read web pages and documentation as context when writing code',
            'Database MCP servers — connect Cline to Postgres, SQLite, or MongoDB to query and modify data',
            'GitHub MCP — lets Cline create issues, PRs, and read repository data from within the editor',
            'File system MCP — extended file operations beyond the project folder',
            'Custom MCP — write your own MCP server in Python or TypeScript to expose any internal tool or API to Cline',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build Something Real with Cline</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Use Cline with a free API key (Gemini AI Studio or Groq) to build a small full-stack feature from scratch. Use Plan mode first — describe what you want, review Cline's plan, refine it before acting. Then watch it build step by step with your approval at each action. This teaches you the agentic AI workflow used by professional developers in 2025.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install and configure Cline', body: 'Open VS Code → Extensions → search "Cline" → install. Click the Cline icon in the sidebar. Get a free Gemini API key from aistudio.google.com (no billing needed). In Cline settings: select Google Gemini as provider, paste your key, choose gemini-2.0-flash.' },
            { n: '2', title: 'Open or create a project', body: "Open a project folder in VS Code (even a simple one). Cline reads your project structure automatically. If starting fresh: create an empty folder, open it in VS Code, and Cline will help you scaffold everything from nothing." },
            { n: '3', title: 'Use Plan mode first', body: "Toggle to Plan mode. Type: 'I want to build a simple REST API with Express that has user registration and login with JWT tokens. Plan the implementation.' Read Cline's plan carefully before switching to Act." },
            { n: '4', title: 'Execute with approval', body: 'Switch to Act mode. Cline will create files one by one, showing you each change. Approve file creations, terminal installs, and code edits as they come. Watch it build the full feature step by step.' },
            { n: '5', title: 'Try a checkpoint rollback', body: "Intentionally tell Cline to do something that goes in the wrong direction, then roll back using the checkpoint system. This teaches you how to safely experiment with AI-generated changes without fear of breaking your project." },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#10B981', letterSpacing: '0.08em' }}>FREE — Extension free, use Gemini AI Studio free tier or Groq free tier for $0 API costs</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(16,185,129,0.07)' : 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#10B981', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Always use Plan mode for any non-trivial task. The most common mistake with agentic AI tools is jumping straight to Act mode on a complex change. Spending 2 minutes reviewing Cline's plan catches 80% of direction errors before a single file is touched. Treat Plan mode like a whiteboard session — get the architecture right first, then let it build. And always read the full plan, not just the first step.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/coding/amazon-q')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Amazon Q
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/coding/codeium')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Codeium <ChevronRight size={14} />
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
