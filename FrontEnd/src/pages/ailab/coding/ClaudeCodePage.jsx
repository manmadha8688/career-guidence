import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, P, CardGrid } from '../helpers'

const CYAN = '#00D9FF'
const color = '#F59E0B'

export default function ClaudeCodePage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg   = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(245,158,11,0.09)' : 'rgba(245,158,11,0.13)'
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>AI Coding Tools</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🤖</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Claude Code — The Terminal-Native AI Coding Agent</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Anthropic's agentic CLI that understands and edits your entire codebase</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ Free Tier Available', '#4ADE80'], ['Terminal CLI', color], ['Anthropic', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Claude Code is not a plugin or autocomplete tool — it is an autonomous coding agent that lives in your terminal. Released by Anthropic in February 2025 and reaching general availability in May 2025, it represents a different category from Copilot or Cursor. While those tools assist you inside an editor, Claude Code reads your entire codebase (up to 1 million tokens — roughly a full project), plans a sequence of actions, edits multiple files, runs your tests, fixes failures, and creates pull requests — all from a natural language description of what you want. It holds the highest score of any AI coding tool on SWE-bench Verified (80.8%), the benchmark measuring ability to solve real GitHub issues. For students building projects, it is particularly powerful for tasks that span multiple files or require understanding how different parts of a codebase connect.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Claude Code Tutorial 2025', url: 'https://www.youtube.com/watch?v=2eHgWt_WBuc', dur: '~20 min', note: 'Best overall overview — setup to advanced workflows' },
            { label: 'Claude Code Tutorial: Beginner to Advanced in 20 Minutes', url: 'https://www.youtube.com/watch?v=ujHXnlSVheI', dur: '20 min', note: 'Covers install, CLAUDE.md, multi-file tasks, and real project workflow' },
            { label: 'How to Build an App With Claude Code - Full Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=GUgxx6fMiR8', dur: 'Full tutorial', note: 'End-to-end: build a real app from scratch using Claude Code' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* How Claude Code works differently */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How Claude Code works differently" color={color} />
          <InfoBox color={color} dark={dark}>Claude Code runs as a process in your terminal with full access to your project directory. It reads all your code, understands the architecture, then plans and executes multi-step tasks. The key difference from chat-based tools: it takes actions — writing files, running commands, reading test output — rather than just generating text you then act on.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The CLAUDE.md file is Claude Code's memory. Create this file in your project root and write everything the agent needs to know to work effectively: what the project does, how to run it, how to run tests, coding standards, naming conventions, anything important. Claude reads CLAUDE.md at the start of every session. This transforms every session from starting cold to starting with full context.</p>
        </Block>

        {/* Installing and setting up */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Installing and setting up" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            {
              n: '1',
              title: 'Install via npm',
              body: 'npm install -g @anthropic-ai/claude-code\nRequires Node.js 18+. On Windows, you need WSL2 (Windows Subsystem for Linux) — Claude Code is not natively supported on Windows CMD or PowerShell. macOS and Linux work directly.',
            },
            {
              n: '2',
              title: 'Sign in to Anthropic',
              body: 'claude login\nThis opens your browser to authenticate. You need a free Anthropic account. The free tier gives you limited daily usage — enough to learn and experiment. Pro ($20/month) gives full access.',
            },
            {
              n: '3',
              title: 'Navigate to your project and start',
              body: 'cd your-project-folder\nclaude\nClaude Code starts, reads your project, and waits for your first instruction. Type what you want in plain English. Press Esc to interrupt Claude mid-task.',
            },
            {
              n: '4',
              title: 'Create a CLAUDE.md file',
              body: 'In your project root, create CLAUDE.md and write: what the project does, how to run it (npm start / python app.py / etc.), how to run tests, any important conventions. Claude reads this every session — this is how you give it permanent context about your project.',
            },
          ]} />
        </Block>

        {/* Core capabilities */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Core capabilities" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Autonomous multi-file editing', desc: 'Describe a feature or change. Claude plans which files to edit, makes the changes across all of them, runs tests to verify, and fixes any failures it caused — without you manually applying each change.' },
            { name: 'Full codebase understanding', desc: '1 million token context window. Claude reads your entire project at once — not just the open file. It knows how components connect, where functions are defined, what patterns your codebase uses.' },
            { name: 'Test-driven execution', desc: 'Tell Claude to "add input validation to all API endpoints and make sure all tests pass." It writes the code, runs your test suite, reads the failures, fixes them, and iterates until tests are green.' },
            { name: 'Git integration', desc: '"Create a PR for the authentication feature I just described." Claude writes the code, stages the changes, writes a commit message, creates the branch, and opens a pull request — all from one instruction.' },
            { name: 'CLAUDE.md memory', desc: 'Persistent project context stored in a file. Write your project standards once. Claude reads them every session. Never re-explain your codebase\'s conventions again.' },
            { name: 'CI/CD pipeline mode', desc: 'Claude Code can run in headless (non-interactive) mode inside automated pipelines — useful for AI-assisted code review, automated refactoring jobs, or test generation on every commit.' },
          ]} />
        </Block>

        {/* What you can actually say to it */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What you can actually say to it" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            {
              n: '1',
              title: 'Feature requests',
              body: '"Add user authentication with JWT tokens. Use the existing User model. Protect all /api routes. Write integration tests." Claude plans the implementation, writes it across multiple files, and verifies with tests.',
            },
            {
              n: '2',
              title: 'Refactoring',
              body: '"Refactor all API error handling to use our ErrorHandler class consistently. Currently some endpoints throw raw errors and some use the class." Claude finds every inconsistency across all files and fixes them uniformly.',
            },
            {
              n: '3',
              title: 'Debugging',
              body: '"The user login test is failing with a 401 even though credentials are correct. Investigate and fix it." Claude reads the test, traces through the auth flow, finds the bug, and fixes it.',
            },
            {
              n: '4',
              title: 'Understanding unfamiliar code',
              body: '"Explain how the payment processing flow works in this codebase. What files are involved and what does each one do?" Claude maps the entire flow and explains it in plain English — useful when joining an existing project.',
            },
          ]} />
        </Block>

        {/* Claude Code vs Cursor vs GitHub Copilot */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Claude Code vs Cursor vs GitHub Copilot" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            {
              label: 'Claude Code',
              badge: 'Best for complex autonomous tasks',
              body: 'Terminal-based agent. Plans and executes entire multi-file development tasks autonomously. SWE-bench 80.8% — highest of any AI coding tool. 1M token context. Best when you want to describe what you want and have it done. $20/month Pro or free tier with daily limits.',
            },
            {
              label: 'Cursor',
              badge: 'Best for visual daily coding',
              body: 'VS Code fork with codebase indexing and Composer for multi-file changes. Full visual IDE experience. 2000 free completions/month. Best for developers who prefer a visual interface and want AI integrated into their editor workflow.',
            },
            {
              label: 'GitHub Copilot',
              badge: 'Best for frictionless autocomplete',
              body: 'IDE plugin for inline code suggestions. Works everywhere (VS Code, JetBrains, Vim). Free for GitHub Student Pack holders. Best for low-friction, high-frequency suggestions as you type — the least powerful but the least disruptive.',
            },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Describe a complete feature in plain English and have it implemented across multiple files',
            'Run tests, see failures, and have Claude fix them autonomously — without manual intervention',
            'Understand unfamiliar codebases by asking Claude to map and explain the architecture',
            'Use CLAUDE.md to give Claude permanent memory of your project\'s standards and conventions',
            'Create pull requests, commit messages, and branch names from natural language descriptions',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}`, marginBottom: '0.5rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 7 }} />
              <span style={{ fontSize: '0.85rem', color: sub, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </Block>

        {/* Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Feature with Claude Code</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Take a project you are working on (class project, personal project, anything with real code). Write a CLAUDE.md file first: describe the project, how to run it, how to run tests, and any important conventions. Then ask Claude Code to implement one real feature you actually need — something that touches at least 3 files. Let it run. Review every change it made. For each file it edited: do you understand WHY it made that change? If not, ask Claude to explain. This calibration exercise teaches you what Claude Code can handle autonomously vs. what still needs your judgment.</p>
          <Steps dark={dark} border={border} color={color} items={[
            {
              n: '1',
              title: 'Write CLAUDE.md first',
              body: 'Before running any task, create CLAUDE.md. Include: project description (2-3 sentences), how to run: npm start/python app.py/etc., how to run tests, any important conventions. This alone dramatically improves output quality.',
            },
            {
              n: '2',
              title: 'Pick a real feature',
              body: 'Choose something you actually need, not a demo. Authentication, a new API endpoint, input validation, a data export feature. Real requirements produce real learning.',
            },
            {
              n: '3',
              title: 'Run and observe',
              body: 'Type the feature description. Watch what Claude does: which files it reads first, what plan it makes (it usually shows its thinking), what it edits. Do not interrupt unless it asks a question.',
            },
            {
              n: '4',
              title: 'Review every change',
              body: 'After Claude finishes: git diff to see all changes. Read every file it touched. Understand each change. Ask Claude to explain anything unclear. Run tests manually to verify. This review step is the learning — not just accepting the output.',
            },
          ]} />
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Claude Code respects .gitignore — it will not read files listed there, which is where secrets and credentials live. However, always review what Claude proposes to commit before it creates a pull request. Claude can produce correct code that commits configuration changes or debugging artifacts you did not intend to include. The review step is not optional when Claude has write access to your repository.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/coding/codeium')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${border}`, borderRadius: 8, padding: '0.6rem 1.1rem', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ArrowLeft size={14} /> Codeium
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/coding/cursor')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Cursor <ChevronRight size={14} />
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
    <a href={v.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1.125rem', borderRadius: 11, textDecoration: 'none', background: dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.16)', marginBottom: '0.625rem', transition: 'background 0.15s' }}
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
