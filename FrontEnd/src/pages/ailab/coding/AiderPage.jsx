import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#EC4899'

export default function AiderPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(236,72,153,0.09)' : 'rgba(236,72,153,0.11)'
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🤝</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Aider — AI Pair Programmer in Your Terminal</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Edit code with git commits — refactor, debug, and build with any LLM from the terminal</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE (BYOK)', '#4ADE80'], ['aider.chat', color], ['Open Source', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Aider is a free, open-source AI pair programming tool created by Paul Gauthier that runs entirely in your terminal. Unlike Cline (VS Code extension) or Cursor (a full editor fork), Aider is purely terminal-native — you open it in any directory that is a Git repo and it reads your files, understands your codebase, and edits code with your natural language instructions. Every single change Aider makes is automatically committed to Git with an AI-written commit message, so every modification is tracked, reviewable, and instantly reversible. Aider has crossed 40,000+ GitHub stars, ships releases roughly every two weeks, and consistently ranks at the top of the independent Aider coding benchmark leaderboard. It works with virtually every major LLM — Claude, GPT, Gemini, DeepSeek, and local models via Ollama — making it one of the most model-flexible coding tools available.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Aider: Best AI Programming Assistant for Terminal', url: 'https://www.youtube.com/watch?v=XzfDV_She-E', dur: '~12 min', note: 'Concise intro to Aider — install, configure API key, first session in terminal' },
            { label: 'Holy Grail: FREE Coding Assistant That Builds From EXISTING CODE BASE', url: 'https://www.youtube.com/watch?v=df8afeb1FY8', dur: '~18 min', note: 'Matthew Berman — full walkthrough with a real codebase, architect mode, and git commits' },
            { label: 'Cline & Aider + Knowledge Base & Web Search is AMAZING!', url: 'https://www.youtube.com/watch?v=Qtn-RUr6bgQ', dur: '~20 min', note: 'AICodeKing — combining Aider with knowledge and web search for advanced workflows' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* How Aider differs */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How Aider is different — git-native, terminal-first" color={color} />
          <InfoBox color={color} dark={dark}>{"Aider's defining philosophy: Git is the source of truth. Every successful edit is committed automatically with a descriptive message. Nothing is lost. There are no 'unsaved AI changes' sitting outside your version control — everything Aider does is a real Git commit that you can inspect with git log, diff, or revert with git reset. This makes Aider uniquely safe for working on real projects."}</InfoBox>
          <p style={{ ...P(sub), marginBottom: '1rem' }}>Most AI coding tools work outside of Git — they edit files and leave it to you to commit. Aider inverts this: it is architected around Git from day one. This means you get a clean, readable history of every AI-assisted change, you can undo any single change with /undo (which runs git reset HEAD~1), and you can see exactly what the AI did at every step. Combined with Aider's whole-repo map — a structural understanding of every file in your codebase — this creates a workflow that scales to real, multi-file projects in ways that simple chat-based code editors cannot.</p>
          {[
            'Every change is a git commit — Aider writes the commit message too, describing what it changed and why',
            'Whole-repo map — Aider builds a tree-sitter map of your entire codebase, understanding file relationships even for files not in the current chat',
            '/undo command — instantly reverts the last AI commit with a single command, no manual git needed',
            'Works with any editor — Aider edits files; your editor (VS Code, Vim, JetBrains) just reads the saved changes automatically',
            'Terminal-first — run it on a remote server via SSH, in a tmux split, or alongside any workflow without an IDE',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}`, marginBottom: '0.5rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 7 }} />
              <span style={{ fontSize: '0.85rem', color: sub, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </Block>

        {/* Key Features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Key features" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Auto Git Commits', desc: 'Every change Aider makes is committed automatically with an AI-written message. Your git log becomes a readable history of the AI\'s work. /undo reverts the last commit instantly.' },
            { name: 'Whole-Repo Awareness', desc: 'Aider uses tree-sitter to build a map of your entire repository — class names, function signatures, file relationships. It understands your project structure even for files you didn\'t add to the chat.' },
            { name: 'Architect Mode', desc: 'Use --architect to separate planning from implementation. One model (Claude Opus) designs the approach; a faster, cheaper model (Sonnet or Flash) writes the actual code. Best for complex multi-file features.' },
            { name: 'Diff Edit Format', desc: 'Aider uses a smart diff format for edits — sending only the changed lines rather than rewriting entire files. This saves tokens, reduces cost, and works on large files that would otherwise hit context limits.' },
            { name: 'Multi-Model Support', desc: 'Run any model: Claude 4.x, GPT-5, Gemini 2.5 Pro, DeepSeek R1/V3, Grok 4, Ollama local models, and any OpenAI-compatible endpoint. Switch models per-session with --model.' },
            { name: 'TDD Workflow', desc: 'Write a failing test, then tell Aider "make this test pass." Aider implements the code until all tests green. This Test-Driven Development loop with AI is one of the most reliable ways to use Aider on real projects.' },
          ]} />
        </Block>

        {/* Getting Started */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Getting started — install and first session" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install Aider via pip', body: 'Open your terminal. Run: pip install aider-chat (or pipx install aider-chat for an isolated install). On macOS you can also use Homebrew: brew install aider. Requires Python 3.9+. Verify with: aider --version' },
            { n: '2', title: 'Get a free API key', body: 'For the freest start: get a Google Gemini API key from aistudio.google.com (no billing required). Or use the free DeepSeek tier via OpenRouter. For best results: get an Anthropic API key for Claude — roughly $0.10–$0.30 per coding session.' },
            { n: '3', title: 'Navigate into a git repo', body: 'Aider requires Git. cd into any existing project: cd my-project. If the folder is not a git repo, run git init first. Aider will refuse to run outside of a git repo — this is intentional and a feature, not a bug.' },
            { n: '4', title: 'Start Aider with your model', body: 'Run: GEMINI_API_KEY=your-key aider --model gemini/gemini-2.0-flash (for free Gemini). Or: ANTHROPIC_API_KEY=your-key aider --model sonnet (for Claude). Aider will display your repo structure and drop into interactive chat.' },
            { n: '5', title: 'Add files and make changes', body: 'In the Aider chat, type /add filename.py to add a file to the context. Then describe your change: "Add a function that validates email addresses with regex and write a test for it." Aider edits the file and commits the change.' },
            { n: '6', title: 'Review and undo', body: 'After each change, run git log to see Aider\'s commit. Run git diff HEAD~1 to see exactly what changed. If you don\'t like it, type /undo in Aider chat — it rolls back the commit. Repeat until the code is right.' },
          ]} />
        </Block>

        {/* Model options */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Model options — free vs paid" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Gemini 2.0 Flash (Google AI Studio)', badge: 'Free tier available', body: 'Get a free API key from aistudio.google.com — no billing required. Run: aider --model gemini/gemini-2.0-flash. The free tier has rate limits but is sufficient for learning projects and small codebases. Best zero-cost starting point.' },
            { label: 'DeepSeek via OpenRouter (free tier)', badge: 'Free — strong coder', body: 'OpenRouter offers deepseek/deepseek-r1:free on its free tier. DeepSeek R1 is an exceptionally capable coding model. Set OPENROUTER_API_KEY and run: aider --model openrouter/deepseek/deepseek-r1:free. Rate-limited but free.' },
            { label: 'Ollama (local models)', badge: '100% free — offline', body: 'Run Aider with local models via Ollama — zero API cost, no rate limits, fully offline. Run ollama pull deepseek-coder:6.7b then: aider --model ollama/deepseek-coder:6.7b. Needs 8GB+ RAM. Best for total privacy and unlimited free use.' },
            { label: 'Claude Sonnet (Anthropic)', badge: 'Best quality — paid', body: 'Claude 3.5 Sonnet / Claude 4 Sonnet is Aider\'s default recommended model and where it performs best on the benchmark. Pay-as-you-go. A typical coding session costs $0.10–$0.40. Worth it for real projects with complex multi-file changes.' },
            { label: 'Architect mode: Opus + Sonnet', badge: 'Premium — complex tasks', body: 'For very complex features, use --architect with Claude Opus as planner and Sonnet as coder: aider --architect --model claude-opus-4 --editor-model claude-sonnet-4. Opus designs the approach; Sonnet implements it efficiently.' },
          ]} />
        </Block>

        {/* Architect mode */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Architect mode — plan then implement" color={color} />
          <InfoBox color={color} dark={dark}>{"Architect mode (--architect flag) separates the thinking model from the coding model. A powerful, reasoning-capable model (like Claude Opus or o1) reads your codebase and designs the full implementation approach. A faster, cheaper model then executes the actual code edits. This combination beats using a single model for both tasks — you get better reasoning and lower cost simultaneously."}</InfoBox>
          <p style={{ ...P(sub), marginBottom: '1rem' }}>Architect mode is Aider's most powerful feature for complex, multi-file changes. When you add --architect, Aider runs the task through two separate LLM calls: the architect model thinks through the problem holistically and describes the changes needed, then the editor model applies those changes file by file. This mirrors how senior developers work — design first, implement second — and produces significantly better results on complex refactors than asking a single model to do everything at once.</p>
          {[
            'aider --architect — uses the same model for both planning and coding (a good default)',
            'aider --architect --model claude-opus-4 --editor-model claude-sonnet-4 — Opus plans, Sonnet codes',
            'aider --architect --model o1 --editor-model gpt-4o — OpenAI equivalent with reasoning model',
            'Best for: new features spanning 5+ files, architectural refactors, migrating between frameworks',
            'Architect commits are still individual git commits per file — full history preserved',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}`, marginBottom: '0.5rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 7 }} />
              <span style={{ fontSize: '0.85rem', color: sub, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </Block>

        {/* Aider vs others */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Aider vs Cline vs Claude Code" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Where it runs', badge: 'Different environments', body: 'Aider: pure terminal — any OS, any SSH session, any server. Cline: VS Code sidebar — GUI with file explorer. Claude Code: terminal — Anthropic-native CLI. Aider is the only one that runs easily on remote machines via SSH without a GUI.' },
            { label: 'Git integration', badge: 'Aider is git-native', body: 'Aider: every change is a git commit, /undo rolls back commits, git is core to the workflow. Cline: uses checkpoints (not git commits by default). Claude Code: you commit manually. Aider\'s git-native approach is unique and powerful for code review.' },
            { label: 'Token efficiency', badge: 'Aider uses fewer tokens', body: 'Benchmarks show Aider uses ~4x fewer tokens than Claude Code on equivalent tasks by using diff edit formats rather than rewriting whole files. This matters for API costs on large codebases.' },
            { label: 'Model flexibility', badge: 'All three support BYOK', body: 'Aider: any model via --model flag, OpenRouter, Ollama. Cline: any model via settings. Claude Code: Anthropic models natively, other providers via API-compatible endpoints. All three let you bring your own key.' },
            { label: 'Best use cases', badge: 'Different strengths', body: 'Aider: large codebase refactors, TDD workflows, server-side development via SSH, any environment without a GUI. Cline: GUI-driven agentic work in VS Code with MCP tools. Claude Code: deep reasoning tasks with full repo context on complex production code.' },
          ]} />
        </Block>

        {/* Aider Benchmark */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="The Aider benchmark leaderboard" color={color} />
          <InfoBox color={color} dark={dark}>{"Aider runs an independent, open benchmark (aider.chat/docs/leaderboards) that tests how well each LLM can actually edit code. It measures 133 coding exercises from Exercism (Python) and 225 polyglot exercises across C++, Go, Java, JavaScript, Python, and Rust. The benchmark tests the real-world editing task: given a failing test, make it pass by editing the source file."}</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The Aider leaderboard is one of the most respected independent coding benchmarks because it tests edit quality in real files — not just code generation in isolation. Top performers in 2025–2026 include GPT-5 (88% polyglot), Claude Opus 4 and Sonnet 4, Gemini 2.5 Pro, and DeepSeek R1. The benchmark also evaluates different edit formats (whole file vs. diff), showing that models able to use diff formats are significantly more token-efficient. Check aider.chat/docs/leaderboards to see the current rankings before choosing your model.</p>
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Refactor a Real Project with Aider</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Take an existing project — your own code or a cloned GitHub repo — and use Aider to refactor it. This teaches you the most powerful real-world use case: using AI to improve existing code rather than writing from scratch. Use architect mode for the planning phase and watch how Aider's git commits create a clean record of every AI change.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Set up Aider with a free key', body: 'Install Aider: pip install aider-chat. Get a free Gemini key from aistudio.google.com. Navigate to any Python or JavaScript project you have locally (or clone a small GitHub repo). Confirm it is a git repo: git status.' },
            { n: '2', title: 'Start Aider and explore the repo', body: 'Run: GEMINI_API_KEY=your-key aider --model gemini/gemini-2.0-flash. In the chat, type /map to see Aider\'s repository map. Notice how it understands your entire file structure. Ask Aider: "What does this codebase do?" — it will summarize from the map.' },
            { n: '3', title: 'Request a refactor', body: 'Add the files you want to refactor: /add utils.py. Then ask: "Refactor this file — extract any repeated logic into helper functions, improve variable names, and add docstrings to each function." Watch Aider plan, edit, and commit the changes.' },
            { n: '4', title: 'Review the git history', body: 'After Aider finishes, run: git log --oneline. You will see individual commits for each change with AI-written messages. Run: git diff HEAD~3..HEAD to see all the refactor changes at once. This is the power of git-native AI.' },
            { n: '5', title: 'Try TDD — write a failing test', body: 'Add a test file: /add test_utils.py. Write a test for a new function (or ask Aider to write the test first): "Write a failing test for a function called parse_config that reads a YAML file." Then say: "Now make the test pass." Watch Aider implement the function to satisfy your test.' },
            { n: '6', title: 'Use architect mode for a bigger task', body: 'For a complex multi-file change, restart with: aider --architect --model gemini/gemini-2.0-flash. Ask: "Separate the database logic from the business logic in this project into distinct modules." Architect mode plans the restructuring before writing a single line.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(236,72,153,0.08)' : 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#EC4899', letterSpacing: '0.08em' }}>FREE — Aider is free open source; use Gemini AI Studio free tier or DeepSeek via OpenRouter free tier for $0 API costs</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(236,72,153,0.07)' : 'rgba(236,72,153,0.07)', border: '1px solid rgba(236,72,153,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color, marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Use Aider for TDD — it is one of the best AI coding workflows that actually produces reliable results. The pattern: write a failing test that describes what you want, then run aider and say "make this test pass." Because the test is the ground truth, Aider cannot hallucinate a working solution — either the test passes or it doesn't. This feedback loop between test runner and AI makes the output dramatically more correct than asking Aider to "build a feature" from scratch without tests. Start with one failing test, let Aider implement, run the tests, and iterate.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/coding/continue-dev')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Continue.dev
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/coding/tabnine')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Tabnine <ChevronRight size={14} />
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
