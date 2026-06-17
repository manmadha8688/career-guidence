import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#4285F4'

export default function GeminiCLIPage() {
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🌟</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Gemini CLI — Google's Free Terminal AI Agent</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Claude Code's free competitor — 1M context, 1000 free requests/day</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ 100% FREE', '#4ADE80'], ['Gemini 2.5 Pro', color], ['Google', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Gemini CLI is Google's open-source terminal AI agent, released in June 2025. It brings Gemini 2.5 Pro — one of the most capable AI models available — directly into your terminal, completely free with a personal Google account. Think of it as the free alternative to Claude Code: you type natural language commands, it reads your codebase, edits files, runs shell commands, and builds features autonomously. The free tier gives you 60 requests per minute and 1,000 requests per day, which is enough to use it as a primary coding assistant without ever thinking about limits. For students, this is significant — you get access to an agentic AI with a 1M token context window (capable of reading an entire large project at once) at zero cost.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'How to Install & Use Gemini CLI + MCP: A Step-by-Step Tutorial', url: 'https://www.youtube.com/watch?v=we2HwLyKYEg', dur: '~15 min', note: 'Full walkthrough — install, auth, first commands, MCP setup' },
            { label: 'Google Gemini CLI Tutorial for Beginners | Install, Test & Run Locally', url: 'https://www.youtube.com/watch?v=h4QN7f0C4fw', dur: '~12 min', note: 'Beginner-friendly — install, test, and run your first AI coding session' },
            { label: 'All You Need to Know About Google\'s Gemini CLI (10 Minute Tutorial)', url: 'https://www.youtube.com/watch?v=bMSq6ghdIYk', dur: '10 min', note: 'Concise overview of all key features, context window, and real use cases' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* How it works */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How Gemini CLI works" color={color} />
          <InfoBox color={color} dark={dark}>{"Gemini CLI is a terminal agent — it doesn't just answer questions, it takes actions. When you give it a task like 'add user authentication to this Express app', it reads your project files, plans the changes, edits the code, creates new files, and runs commands. It operates as an autonomous agent in a loop: observe → plan → act → verify. You watch it work in real time in your terminal."}</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The 1M token context window is what makes Gemini CLI especially powerful for large projects. Most AI coding tools have to pick and choose which files to include in context — Gemini CLI can load your entire codebase at once. For a 50-file project, this means it understands every import, every function, and every architectural pattern before writing a single line. Compare that to tools with a 32K or 128K limit that have to guess which files matter. The practical result: fewer hallucinated function names, fewer missed imports, and changes that fit your project's actual structure.</p>
        </Block>

        {/* Installation */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Get started in 3 steps" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install Node.js 20+ (if not already installed)', body: "Gemini CLI requires Node.js version 20 or higher. Check your version with: node --version. If you need to install or upgrade, download from nodejs.org. The LTS version is always the safe choice." },
            { n: '2', title: 'Install Gemini CLI globally via npm', body: "Run: npm install -g @google/gemini-cli — This installs the gemini command globally so you can run it from any directory. After installation, verify with: gemini --version" },
            { n: '3', title: 'Authenticate with your Google account', body: "Run: gemini auth — A browser window opens. Sign in with your personal Google account (Gmail works). Once authenticated, you get the free tier: 60 requests/minute and 1,000 requests/day using Gemini 2.5 Pro. No credit card, no API key needed." },
          ]} />
          <div style={{ padding: '0.875rem 1rem', borderRadius: 10, background: dark ? `${color}0A` : `${color}07`, border: `1px solid ${color}20`, marginTop: '0.875rem' }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: color, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>QUICK START — 3 commands to get running</div>
            {['npm install -g @google/gemini-cli', 'gemini auth', 'cd your-project && gemini'].map((cmd, i) => (
              <div key={i} style={{ padding: '0.4rem 0.75rem', borderRadius: 6, background: dark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.06)', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.78rem', color: dark ? '#A5F3FC' : '#1E40AF', marginBottom: i < 2 ? '0.35rem' : 0 }}>{cmd}</div>
            ))}
          </div>
        </Block>

        {/* Key capabilities */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Key capabilities" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Agentic coding', desc: 'Give it a task in plain English — "add pagination to the user list API" — and it reads your project, plans the changes, edits multiple files, and verifies the result. You watch it think and act in your terminal.' },
            { name: '1M token context', desc: 'Load your entire codebase into context at once. No guessing which files matter. Gemini CLI can understand a 50-file project completely before making any change, reducing errors from missing context.' },
            { name: 'MCP support', desc: 'The Model Context Protocol lets you extend Gemini CLI with external tools — connect it to databases, APIs, GitHub, Jira, or any custom tool. Same MCP standard used by Claude Code.' },
            { name: 'File editing', desc: 'Reads, creates, and edits files directly. When it proposes a change, it shows you the diff. You approve before changes are applied — full control over what gets written to disk.' },
            { name: 'Shell commands', desc: 'Executes terminal commands as part of its workflow. It can run tests, install packages, check git status, and verify its own changes — completing full development tasks end-to-end.' },
            { name: 'Google Search grounding', desc: 'Built-in access to Google Search. When it needs to look up a library, check an API, or verify current syntax, it can search the web without leaving your workflow.' },
          ]} />
        </Block>

        {/* Gemini CLI vs Claude Code */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Gemini CLI vs Claude Code" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Cost', badge: 'Gemini CLI wins for free use', body: 'Gemini CLI is 100% free with a Google account — 1,000 requests/day, 60/minute. Claude Code requires either API usage billing (can add up fast) or a $20/month Claude Max subscription. For students, Gemini CLI is the obvious starting point.' },
            { label: 'Context window', badge: 'Both support 1M tokens', body: 'Gemini CLI launched with a 1M token context window and has maintained it. Claude Code now also supports 1M tokens on Claude Sonnet 4.6+. Both can theoretically load an entire large codebase — Gemini CLI was first to make this the default.' },
            { label: 'Code quality & accuracy', badge: 'Claude Code wins currently', body: 'On SWE-bench Verified (the standard coding benchmark), Claude Code scores ~80.9% vs Gemini CLI\'s ~63.8%. Claude Code produces more accurate multi-file changes with fewer errors. For complex refactors and tricky bugs, Claude Code has an edge in precision.' },
            { label: 'Open source', badge: 'Gemini CLI wins', body: 'Gemini CLI is fully open source (Apache 2.0 license) — you can inspect the code, modify it, and contribute on GitHub. Claude Code is closed source. For trust, customization, and learning how it works, Gemini CLI is more transparent.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do with Gemini CLI" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Build new features in an existing project by describing them in plain English — it reads your codebase and writes code that fits your patterns',
            'Refactor large codebases with the full 1M token context — ask it to rename a pattern or restructure a module across every file at once',
            'Debug complex issues by letting it trace through your code, add logging, run the program, and interpret the output autonomously',
            'Generate comprehensive tests for your functions — it reads your code, writes test cases, and can run them to verify they pass',
            'Connect external tools via MCP to give Gemini CLI access to your database, GitHub, or any API during coding sessions',
            'Use it completely free as a daily coding assistant without any API billing or subscription required',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Feature with Gemini CLI</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Install Gemini CLI and use it to add a complete feature to an existing project. Take any project you have — a REST API, a simple web app, anything with a few files. Ask Gemini CLI to add a new feature end-to-end: user authentication, a search function, data export, or rate limiting. Watch how it reads your project, plans the approach, and edits multiple files autonomously. This is the fastest way to understand what terminal AI agents actually do.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install and authenticate', body: 'Run: npm install -g @google/gemini-cli then gemini auth. Sign in with your Google account. The whole setup takes under 5 minutes.' },
            { n: '2', title: 'Navigate to your project', body: 'cd into any existing project directory. Run: gemini to start an interactive session. Gemini CLI will automatically read your project structure.' },
            { n: '3', title: 'Give it a feature task', body: "Try: 'Add JWT authentication to this Express API. Create a /login endpoint, a /register endpoint, and middleware that protects all /api routes. Follow the existing code patterns.' Watch it work." },
            { n: '4', title: 'Review diffs and approve changes', body: 'Before applying changes, Gemini CLI shows you what it wants to edit. Review each file change. Ask follow-up questions: "Why did you choose this approach?" or "Use environment variables for the secret key instead."' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(66,133,244,0.08)' : 'rgba(66,133,244,0.06)', border: '1px solid rgba(66,133,244,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color, letterSpacing: '0.08em' }}>100% FREE — no credit card, no API key, just a Google account</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(66,133,244,0.07)' : 'rgba(66,133,244,0.07)', border: '1px solid rgba(66,133,244,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color, marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Start every Gemini CLI session by asking it to read and summarize your project first: "Read all the files in this project and explain the architecture, what each file does, and the main patterns used." This primes the 1M context window with your full codebase and produces dramatically better results for every subsequent request. Treat it like briefing a new developer before asking them to write code.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/coding/windsurf')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Windsurf
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
