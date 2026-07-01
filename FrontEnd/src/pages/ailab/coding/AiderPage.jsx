import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#EC4899'

export default function AiderPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Coding">
      <ToolHeader
        icon="🤝"
        title="Aider — AI Pair Programmer in Your Terminal"
        tagline="Edit code with git commits — refactor, debug, and build with any LLM from the terminal"
        badges={[['✓ FREE (BYOK)', '#4ADE80'], ['aider.chat', color], ['Open Source', 'var(--text-muted)']]}
        overview={"Aider is a free, open-source AI pair programming tool created by Paul Gauthier that runs entirely in your terminal. Unlike Cline (VS Code extension) or Cursor (a full editor fork), Aider is purely terminal-native — you open it in any directory that is a Git repo and it reads your files, understands your codebase, and edits code with your natural language instructions. Every single change Aider makes is automatically committed to Git with an AI-written commit message, so every modification is tracked, reviewable, and instantly reversible. Aider has crossed 40,000+ GitHub stars, ships releases roughly every two weeks, and consistently ranks at the top of the independent Aider coding benchmark leaderboard. It works with virtually every major LLM — Claude, GPT, Gemini, DeepSeek, and local models via Ollama — making it one of the most model-flexible coding tools available."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Aider: Best AI Programming Assistant for Terminal', url: 'https://www.youtube.com/watch?v=XzfDV_She-E', dur: '~12 min', note: 'Concise intro to Aider — install, configure API key, first session in terminal' },
            { label: 'Holy Grail: FREE Coding Assistant That Builds From EXISTING CODE BASE', url: 'https://www.youtube.com/watch?v=df8afeb1FY8', dur: '~18 min', note: 'Matthew Berman — full walkthrough with a real codebase, architect mode, and git commits' },
            { label: 'Cline & Aider + Knowledge Base & Web Search is AMAZING!', url: 'https://www.youtube.com/watch?v=Qtn-RUr6bgQ', dur: '~20 min', note: 'AICodeKing — combining Aider with knowledge and web search for advanced workflows' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How Aider is different — git-native, terminal-first" color={color} />
          <InfoBox color={color}>{"Aider's defining philosophy: Git is the source of truth. Every successful edit is committed automatically with a descriptive message. Nothing is lost. There are no 'unsaved AI changes' sitting outside your version control — everything Aider does is a real Git commit that you can inspect with git log, diff, or revert with git reset. This makes Aider uniquely safe for working on real projects."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Most AI coding tools work outside of Git — they edit files and leave it to you to commit. Aider inverts this: it is architected around Git from day one. This means you get a clean, readable history of every AI-assisted change, you can undo any single change with /undo (which runs git reset HEAD~1), and you can see exactly what the AI did at every step. Combined with Aider's whole-repo map — a structural understanding of every file in your codebase — this creates a workflow that scales to real, multi-file projects in ways that simple chat-based code editors cannot.</p>
          {[
            'Every change is a git commit — Aider writes the commit message too, describing what it changed and why',
            'Whole-repo map — Aider builds a tree-sitter map of your entire codebase, understanding file relationships even for files not in the current chat',
            '/undo command — instantly reverts the last AI commit with a single command, no manual git needed',
            'Works with any editor — Aider edits files; your editor (VS Code, Vim, JetBrains) just reads the saved changes automatically',
            'Terminal-first — run it on a remote server via SSH, in a tmux split, or alongside any workflow without an IDE',
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
            { name: 'Auto Git Commits', desc: 'Every change Aider makes is committed automatically with an AI-written message. Your git log becomes a readable history of the AI\'s work. /undo reverts the last commit instantly.' },
            { name: 'Whole-Repo Awareness', desc: 'Aider uses tree-sitter to build a map of your entire repository — class names, function signatures, file relationships. It understands your project structure even for files you didn\'t add to the chat.' },
            { name: 'Architect Mode', desc: 'Use --architect to separate planning from implementation. One model (Claude Opus) designs the approach; a faster, cheaper model (Sonnet or Flash) writes the actual code. Best for complex multi-file features.' },
            { name: 'Diff Edit Format', desc: 'Aider uses a smart diff format for edits — sending only the changed lines rather than rewriting entire files. This saves tokens, reduces cost, and works on large files that would otherwise hit context limits.' },
            { name: 'Multi-Model Support', desc: 'Run any model: Claude 4.x, GPT-5, Gemini 2.5 Pro, DeepSeek R1/V3, Grok 4, Ollama local models, and any OpenAI-compatible endpoint. Switch models per-session with --model.' },
            { name: 'TDD Workflow', desc: 'Write a failing test, then tell Aider "make this test pass." Aider implements the code until all tests green. This Test-Driven Development loop with AI is one of the most reliable ways to use Aider on real projects.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — install and first session" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Install Aider via pip', body: 'Open your terminal. Run: pip install aider-chat (or pipx install aider-chat for an isolated install). On macOS you can also use Homebrew: brew install aider. Requires Python 3.9+. Verify with: aider --version' },
            { n: '2', title: 'Get a free API key', body: 'For the freest start: get a Google Gemini API key from aistudio.google.com (no billing required). Or use the free DeepSeek tier via OpenRouter. For best results: get an Anthropic API key for Claude — roughly $0.10–$0.30 per coding session.' },
            { n: '3', title: 'Navigate into a git repo', body: 'Aider requires Git. cd into any existing project: cd my-project. If the folder is not a git repo, run git init first. Aider will refuse to run outside of a git repo — this is intentional and a feature, not a bug.' },
            { n: '4', title: 'Start Aider with your model', body: 'Run: GEMINI_API_KEY=your-key aider --model gemini/gemini-2.0-flash (for free Gemini). Or: ANTHROPIC_API_KEY=your-key aider --model sonnet (for Claude). Aider will display your repo structure and drop into interactive chat.' },
            { n: '5', title: 'Add files and make changes', body: 'In the Aider chat, type /add filename.py to add a file to the context. Then describe your change: "Add a function that validates email addresses with regex and write a test for it." Aider edits the file and commits the change.' },
            { n: '6', title: 'Review and undo', body: 'After each change, run git log to see Aider\'s commit. Run git diff HEAD~1 to see exactly what changed. If you don\'t like it, type /undo in Aider chat — it rolls back the commit. Repeat until the code is right.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Model options — free vs paid" color={color} />
          <Compare color={color} items={[
            { label: 'Gemini 2.0 Flash (Google AI Studio)', badge: 'Free tier available', body: 'Get a free API key from aistudio.google.com — no billing required. Run: aider --model gemini/gemini-2.0-flash. The free tier has rate limits but is sufficient for learning projects and small codebases. Best zero-cost starting point.' },
            { label: 'DeepSeek via OpenRouter (free tier)', badge: 'Free — strong coder', body: 'OpenRouter offers deepseek/deepseek-r1:free on its free tier. DeepSeek R1 is an exceptionally capable coding model. Set OPENROUTER_API_KEY and run: aider --model openrouter/deepseek/deepseek-r1:free. Rate-limited but free.' },
            { label: 'Ollama (local models)', badge: '100% free — offline', body: 'Run Aider with local models via Ollama — zero API cost, no rate limits, fully offline. Run ollama pull deepseek-coder:6.7b then: aider --model ollama/deepseek-coder:6.7b. Needs 8GB+ RAM. Best for total privacy and unlimited free use.' },
            { label: 'Claude Sonnet (Anthropic)', badge: 'Best quality — paid', body: 'Claude 3.5 Sonnet / Claude 4 Sonnet is Aider\'s default recommended model and where it performs best on the benchmark. Pay-as-you-go. A typical coding session costs $0.10–$0.40. Worth it for real projects with complex multi-file changes.' },
            { label: 'Architect mode: Opus + Sonnet', badge: 'Premium — complex tasks', body: 'For very complex features, use --architect with Claude Opus as planner and Sonnet as coder: aider --architect --model claude-opus-4 --editor-model claude-sonnet-4. Opus designs the approach; Sonnet implements it efficiently.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Architect mode — plan then implement" color={color} />
          <InfoBox color={color}>{"Architect mode (--architect flag) separates the thinking model from the coding model. A powerful, reasoning-capable model (like Claude Opus or o1) reads your codebase and designs the full implementation approach. A faster, cheaper model then executes the actual code edits. This combination beats using a single model for both tasks — you get better reasoning and lower cost simultaneously."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Architect mode is Aider's most powerful feature for complex, multi-file changes. When you add --architect, Aider runs the task through two separate LLM calls: the architect model thinks through the problem holistically and describes the changes needed, then the editor model applies those changes file by file. This mirrors how senior developers work — design first, implement second — and produces significantly better results on complex refactors than asking a single model to do everything at once.</p>
          {[
            'aider --architect — uses the same model for both planning and coding (a good default)',
            'aider --architect --model claude-opus-4 --editor-model claude-sonnet-4 — Opus plans, Sonnet codes',
            'aider --architect --model o1 --editor-model gpt-4o — OpenAI equivalent with reasoning model',
            'Best for: new features spanning 5+ files, architectural refactors, migrating between frameworks',
            'Architect commits are still individual git commits per file — full history preserved',
          ].map((item, i) => (
            <div key={i} className="tool-layout-cando-item">
              <div className="tool-layout-cando-item__dot" />
              <span className="tool-layout-cando-item__text">{item}</span>
            </div>
          ))}
        </Block>
        <Block>
          <SubHead label="Aider vs Cline vs Claude Code" color={color} />
          <Compare color={color} items={[
            { label: 'Where it runs', badge: 'Different environments', body: 'Aider: pure terminal — any OS, any SSH session, any server. Cline: VS Code sidebar — GUI with file explorer. Claude Code: terminal — Anthropic-native CLI. Aider is the only one that runs easily on remote machines via SSH without a GUI.' },
            { label: 'Git integration', badge: 'Aider is git-native', body: 'Aider: every change is a git commit, /undo rolls back commits, git is core to the workflow. Cline: uses checkpoints (not git commits by default). Claude Code: you commit manually. Aider\'s git-native approach is unique and powerful for code review.' },
            { label: 'Token efficiency', badge: 'Aider uses fewer tokens', body: 'Benchmarks show Aider uses ~4x fewer tokens than Claude Code on equivalent tasks by using diff edit formats rather than rewriting whole files. This matters for API costs on large codebases.' },
            { label: 'Model flexibility', badge: 'All three support BYOK', body: 'Aider: any model via --model flag, OpenRouter, Ollama. Cline: any model via settings. Claude Code: Anthropic models natively, other providers via API-compatible endpoints. All three let you bring your own key.' },
            { label: 'Best use cases', badge: 'Different strengths', body: 'Aider: large codebase refactors, TDD workflows, server-side development via SSH, any environment without a GUI. Cline: GUI-driven agentic work in VS Code with MCP tools. Claude Code: deep reasoning tasks with full repo context on complex production code.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="The Aider benchmark leaderboard" color={color} />
          <InfoBox color={color}>{"Aider runs an independent, open benchmark (aider.chat/docs/leaderboards) that tests how well each LLM can actually edit code. It measures 133 coding exercises from Exercism (Python) and 225 polyglot exercises across C++, Go, Java, JavaScript, Python, and Rust. The benchmark tests the real-world editing task: given a failing test, make it pass by editing the source file."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The Aider leaderboard is one of the most respected independent coding benchmarks because it tests edit quality in real files — not just code generation in isolation. Top performers in 2025–2026 include GPT-5 (88% polyglot), Claude Opus 4 and Sonnet 4, Gemini 2.5 Pro, and DeepSeek R1. The benchmark also evaluates different edit formats (whole file vs. diff), showing that models able to use diff formats are significantly more token-efficient. Check aider.chat/docs/leaderboards to see the current rankings before choosing your model.</p>
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Refactor a Real Project with Aider</span></div>
          <p className="tool-layout-task__desc">Take an existing project — your own code or a cloned GitHub repo — and use Aider to refactor it. This teaches you the most powerful real-world use case: using AI to improve existing code rather than writing from scratch. Use architect mode for the planning phase and watch how Aider's git commits create a clean record of every AI change.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Set up Aider with a free key', body: 'Install Aider: pip install aider-chat. Get a free Gemini key from aistudio.google.com. Navigate to any Python or JavaScript project you have locally (or clone a small GitHub repo). Confirm it is a git repo: git status.' },
            { n: '2', title: 'Start Aider and explore the repo', body: 'Run: GEMINI_API_KEY=your-key aider --model gemini/gemini-2.0-flash. In the chat, type /map to see Aider\'s repository map. Notice how it understands your entire file structure. Ask Aider: "What does this codebase do?" — it will summarize from the map.' },
            { n: '3', title: 'Request a refactor', body: 'Add the files you want to refactor: /add utils.py. Then ask: "Refactor this file — extract any repeated logic into helper functions, improve variable names, and add docstrings to each function." Watch Aider plan, edit, and commit the changes.' },
            { n: '4', title: 'Review the git history', body: 'After Aider finishes, run: git log --oneline. You will see individual commits for each change with AI-written messages. Run: git diff HEAD~3..HEAD to see all the refactor changes at once. This is the power of git-native AI.' },
            { n: '5', title: 'Try TDD — write a failing test', body: 'Add a test file: /add test_utils.py. Write a test for a new function (or ask Aider to write the test first): "Write a failing test for a function called parse_config that reads a YAML file." Then say: "Now make the test pass." Watch Aider implement the function to satisfy your test.' },
            { n: '6', title: 'Use architect mode for a bigger task', body: 'For a complex multi-file change, restart with: aider --architect --model gemini/gemini-2.0-flash. Ask: "Separate the database logic from the business logic in this project into distinct modules." Architect mode plans the restructuring before writing a single line.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — Aider is free open source; use Gemini AI Studio free tier or DeepSeek via OpenRouter free tier for $0 API costs</span></div>
        </div>
        <ProTip>
        Use Aider for TDD — it is one of the best AI coding workflows that actually produces reliable results. The pattern: write a failing test that describes what you want, then run aider and say "make this test pass." Because the test is the ground truth, Aider cannot hallucinate a working solution — either the test passes or it doesn't. This feedback loop between test runner and AI makes the output dramatically more correct than asking Aider to "build a feature" from scratch without tests. Start with one failing test, let Aider implement, run the tests, and iterate.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/coding/continue-dev', label: 'Continue.dev' }}
        next={{ path: '/ai-lab/coding/tabnine', label: 'Tabnine' }}
      />
    </ToolPageShell>
  )
}
