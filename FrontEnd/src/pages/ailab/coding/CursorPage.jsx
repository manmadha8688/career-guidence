import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#F59E0B'

export default function CursorPage() {
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>⚡</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Cursor — The AI-First Code Editor</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>VS Code rebuilt with codebase-aware AI at every level</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE TIER', '#4ADE80'], ['2 weeks Pro free', color], ['Best-in-class AI editor', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Cursor is a fork of VS Code — it looks identical, supports all VS Code extensions, and has the same keyboard shortcuts. The difference is that every feature in Cursor is built around AI from the start. Where Copilot is an extension added to VS Code, Cursor is a code editor redesigned with AI as a first-class citizen. The most important capability: Cursor indexes your entire codebase and understands it. When you ask a question or request a change, Cursor knows about every file, every function, and every import in your project — not just the file you have open. This codebase-level context is what makes Cursor significantly more powerful than Copilot for real project work. It is free to start, with 2 weeks of the Pro tier included, and the free tier with limited AI calls is enough to experience what it does.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Cursor AI Tutorial — Full Beginner Guide', url: 'https://www.youtube.com/watch?v=gqUQbjsYZLQ', dur: '18 min', note: 'Complete walkthrough, start here' },
            { label: 'Cursor AI Tips That Will Change How You Code', url: 'https://www.youtube.com/watch?v=yk9lXobFdKE', dur: '14 min', note: 'Advanced features and workflows' },
            { label: 'Cursor vs GitHub Copilot — Detailed Comparison', url: 'https://www.youtube.com/watch?v=oOq1CmtPBIY', dur: '11 min', note: 'When to use each tool' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Why Cursor is different */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why Cursor is different" color={color} />
          <InfoBox color={color} dark={dark}>{"Cursor's defining feature is @codebase context. When you use @codebase in a prompt, Cursor embeds every file in your project, indexes the embeddings, and retrieves the most relevant code context for your question. It knows your full project architecture — not just the open file. This is the same RAG architecture used in enterprise AI systems, built into the editor."}</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The practical difference shows up immediately on real projects. With GitHub Copilot: you open 5 related files, give context manually, get a suggestion that misses how your auth middleware works. With Cursor: you type "add rate limiting to all API endpoints" and it knows your project's endpoint structure, your middleware pattern, and your configuration setup — because it indexed your whole project. For greenfield projects and larger codebases, this context difference is enormous.</p>
        </Block>

        {/* Core Cursor features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Core Cursor features" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Composer (Cmd+I)', desc: "The flagship feature. Describe a change in natural language. Cursor reads your full codebase, generates a multi-file diff, and shows every change before applying. Press Accept to apply all at once." },
            { name: 'Chat with @codebase', desc: "Cmd+L opens a chat panel. @codebase tells Cursor to search your full project. Ask 'Where is the user authentication logic?' and it finds and explains the relevant code." },
            { name: 'Inline edit (Cmd+K)', desc: 'Select code → Cmd+K → describe the change. Cursor modifies that specific block. Faster than copy-paste-chat-copy-back for targeted edits.' },
            { name: 'Tab autocomplete', desc: "Same as Copilot's inline autocomplete but with full codebase context. Suggestions are aware of your project's patterns, not just the current file." },
            { name: '@-mentions for context', desc: '@file, @folder, @docs, @web, @codebase — precisely control what context Cursor reads for each request. Reference specific files or pull in documentation.' },
            { name: 'Cursor Rules', desc: 'A .cursorrules file in your project root defines persistent instructions — coding style, patterns to follow, architecture rules. Every AI interaction follows these rules automatically.' },
          ]} />
        </Block>

        {/* The Composer workflow */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="The Composer workflow" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Open Composer (Cmd+I / Ctrl+I)', body: "This is Cursor's most powerful feature. Press Ctrl+I (Windows/Linux) or Cmd+I (Mac) to open the Composer panel." },
            { n: '2', title: 'Describe the full change', body: "Write what you want: 'Add JWT authentication to the Express app. Create a middleware function that validates tokens and attach the user to req.user. Protect all /api routes.' Be specific about what you want." },
            { n: '3', title: 'Review the diff', body: 'Cursor generates a multi-file diff showing every change it proposes. Review each file carefully. You see exactly what it wants to change before anything is applied.' },
            { n: '4', title: 'Accept, reject, or iterate', body: "Accept all changes, reject specific files, or follow up: 'The middleware looks right but use environment variables for the JWT secret instead of hardcoding'. Cursor adjusts." },
            { n: '5', title: 'Use @codebase for questions', body: "Before making changes to an unfamiliar part of the codebase, ask @codebase questions first: '@codebase How is error handling done in this project currently?' Then make your change consistent with existing patterns." },
          ]} />
        </Block>

        {/* Cursor vs GitHub Copilot */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Cursor vs GitHub Copilot" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Codebase understanding', badge: 'Cursor wins clearly', body: "Cursor indexes your entire project. Copilot sees only open files. For any project larger than a single file, Cursor's contextual awareness produces dramatically more relevant suggestions and changes." },
            { label: 'Multi-file changes', badge: 'Cursor wins', body: 'Cursor Composer applies changes across multiple files in one operation with a reviewable diff. Copilot edits one file at a time and requires you to manually apply changes to each file.' },
            { label: 'Cost', badge: 'Copilot wins for students', body: 'Copilot is completely free for students (GitHub Education Pack). Cursor free tier has limited AI calls (200 completions/month, 50 premium requests). For unlimited use, Cursor Pro is $20/month. Students on a budget: Copilot free, Cursor as a secondary tool.' },
            { label: 'Familiarity', badge: 'Equal (VS Code base)', body: 'Both work in/as VS Code. Same extensions, same keyboard shortcuts, same interface. Switching from Copilot to Cursor requires zero relearning of the editor itself.' },
          ]} />
        </Block>

        {/* Setting up Cursor Rules */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Setting up Cursor Rules" color={color} />
          <InfoBox color={color} dark={dark}>{'Cursor Rules is one of the most powerful features for consistent, high-quality output. Without rules, every new conversation starts with no context about how your project should be written. With a .cursorrules file, every interaction follows your defined standards automatically.'}</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Create .cursorrules in project root', body: 'Add a file called .cursorrules to the root of your project. This is a plain text file with instructions for how Cursor should write code for this project.' },
            { n: '2', title: 'Define your standards', body: "Include: language version, framework conventions, naming conventions, error handling pattern, testing approach. Example: 'Use async/await not callbacks. Use TypeScript strict mode. All functions must have JSDoc comments. Errors go through the central ErrorHandler class.'" },
            { n: '3', title: 'Commit it to your repository', body: 'Commit .cursorrules to git. Now everyone on the project benefits from consistent AI assistance that follows your team\'s actual standards — not generic defaults.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Make multi-file changes to a codebase by describing them in plain English, with full diff review before applying',
            'Ask questions about any part of your project and get answers that reference your actual code',
            'Set persistent coding standards in .cursorrules so every AI suggestion follows your project\'s conventions',
            'Refactor, debug, and add features to real projects with context-aware AI that knows your architecture',
            'Switch from VS Code to Cursor with zero learning curve — same interface, same extensions',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Refactor a Real Project</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Take any project you have (even a small one from class). Open it in Cursor. First, ask @codebase to explain the overall structure. Then use Composer to: (1) add proper input validation to all user-facing functions, (2) add consistent error handling following the pattern already in the codebase, (3) generate unit tests for the core functions. Review every diff before accepting. This exercise shows the full Cursor workflow on real code.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Open your project in Cursor', body: 'Download Cursor from cursor.sh. Open an existing project folder. Let it index (shown in bottom bar). Sign in to activate the 2-week Pro trial.' },
            { n: '2', title: 'Understand the codebase', body: "Cmd+L → Chat → '@codebase explain the overall structure of this project, what each main file does, and how the components relate to each other'. Read the response." },
            { n: '3', title: 'Add validation with Composer', body: "Cmd+I → 'Add input validation to all functions that accept user-provided data. Use [your framework's validation library] and throw descriptive errors on invalid input.' Review the diff." },
            { n: '4', title: 'Generate tests', body: "Cmd+I → 'Generate unit tests for all core business logic functions. Use [Jest/PyTest/JUnit]. Include tests for both happy path and error cases.' Review and apply." },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>FREE — 2-week Pro trial included on signup at cursor.sh</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Write a .cursorrules file for every project you start. Even 10 lines of standards (language, naming conventions, error handling pattern, testing framework) saves hours of correcting AI suggestions that follow the wrong conventions. Treat it like a README for the AI — the clearer your rules, the more useful every Cursor interaction becomes.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/coding/copilot')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> GitHub Copilot
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/coding/windsurf')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Windsurf <ChevronRight size={14} />
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
