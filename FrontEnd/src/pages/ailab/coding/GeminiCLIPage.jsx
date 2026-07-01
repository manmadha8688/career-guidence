import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#4285F4'

export default function GeminiCLIPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Coding">
      <ToolHeader
        icon="🌟"
        title="Gemini CLI — Google's Free Terminal AI Agent"
        tagline="Claude Code's free competitor — 1M context, 1000 free requests/day"
        badges={[['✓ 100% FREE', '#4ADE80'], ['Gemini 2.5 Pro', color], ['Google', 'var(--text-muted)']]}
        overview={"Gemini CLI is Google's open-source terminal AI agent, released in June 2025. It brings Gemini 2.5 Pro — one of the most capable AI models available — directly into your terminal, completely free with a personal Google account. Think of it as the free alternative to Claude Code: you type natural language commands, it reads your codebase, edits files, runs shell commands, and builds features autonomously. The free tier gives you 60 requests per minute and 1,000 requests per day, which is enough to use it as a primary coding assistant without ever thinking about limits. For students, this is significant — you get access to an agentic AI with a 1M token context window (capable of reading an entire large project at once) at zero cost."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'How to Install & Use Gemini CLI + MCP: A Step-by-Step Tutorial', url: 'https://www.youtube.com/watch?v=we2HwLyKYEg', dur: '~15 min', note: 'Full walkthrough — install, auth, first commands, MCP setup' },
            { label: 'Google Gemini CLI Tutorial for Beginners | Install, Test & Run Locally', url: 'https://www.youtube.com/watch?v=h4QN7f0C4fw', dur: '~12 min', note: 'Beginner-friendly — install, test, and run your first AI coding session' },
            { label: 'All You Need to Know About Google\'s Gemini CLI (10 Minute Tutorial)', url: 'https://www.youtube.com/watch?v=bMSq6ghdIYk', dur: '10 min', note: 'Concise overview of all key features, context window, and real use cases' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How Gemini CLI works" color={color} />
          <InfoBox color={color}>{"Gemini CLI is a terminal agent — it doesn't just answer questions, it takes actions. When you give it a task like 'add user authentication to this Express app', it reads your project files, plans the changes, edits the code, creates new files, and runs commands. It operates as an autonomous agent in a loop: observe → plan → act → verify. You watch it work in real time in your terminal."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The 1M token context window is what makes Gemini CLI especially powerful for large projects. Most AI coding tools have to pick and choose which files to include in context — Gemini CLI can load your entire codebase at once. For a 50-file project, this means it understands every import, every function, and every architectural pattern before writing a single line. Compare that to tools with a 32K or 128K limit that have to guess which files matter. The practical result: fewer hallucinated function names, fewer missed imports, and changes that fit your project's actual structure.</p>
        </Block>
        <Block>
          <SubHead label="Get started in 3 steps" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Install Node.js 20+ (if not already installed)', body: "Gemini CLI requires Node.js version 20 or higher. Check your version with: node --version. If you need to install or upgrade, download from nodejs.org. The LTS version is always the safe choice." },
            { n: '2', title: 'Install Gemini CLI globally via npm', body: "Run: npm install -g @google/gemini-cli — This installs the gemini command globally so you can run it from any directory. After installation, verify with: gemini --version" },
            { n: '3', title: 'Authenticate with your Google account', body: "Run: gemini auth — A browser window opens. Sign in with your personal Google account (Gmail works). Once authenticated, you get the free tier: 60 requests/minute and 1,000 requests/day using Gemini 2.5 Pro. No credit card, no API key needed." },
          ]} />
          <div className="tool-helper-highlight" style={{ marginTop: '0.875rem' }}>
            <div className="tool-quick-start__label">QUICK START — 3 commands to get running</div>
            {['npm install -g @google/gemini-cli', 'gemini auth', 'cd your-project && gemini'].map((cmd, i) => (
              <div key={i} className="tool-code-block">{cmd}</div>
            ))}
          </div>
        </Block>
        <Block>
          <SubHead label="Key capabilities" color={color} />
          <CardGrid color={color} items={[
            { name: 'Agentic coding', desc: 'Give it a task in plain English — "add pagination to the user list API" — and it reads your project, plans the changes, edits multiple files, and verifies the result. You watch it think and act in your terminal.' },
            { name: '1M token context', desc: 'Load your entire codebase into context at once. No guessing which files matter. Gemini CLI can understand a 50-file project completely before making any change, reducing errors from missing context.' },
            { name: 'MCP support', desc: 'The Model Context Protocol lets you extend Gemini CLI with external tools — connect it to databases, APIs, GitHub, Jira, or any custom tool. Same MCP standard used by Claude Code.' },
            { name: 'File editing', desc: 'Reads, creates, and edits files directly. When it proposes a change, it shows you the diff. You approve before changes are applied — full control over what gets written to disk.' },
            { name: 'Shell commands', desc: 'Executes terminal commands as part of its workflow. It can run tests, install packages, check git status, and verify its own changes — completing full development tasks end-to-end.' },
            { name: 'Google Search grounding', desc: 'Built-in access to Google Search. When it needs to look up a library, check an API, or verify current syntax, it can search the web without leaving your workflow.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Gemini CLI vs Claude Code" color={color} />
          <Compare color={color} items={[
            { label: 'Cost', badge: 'Gemini CLI wins for free use', body: 'Gemini CLI is 100% free with a Google account — 1,000 requests/day, 60/minute. Claude Code requires either API usage billing (can add up fast) or a $20/month Claude Max subscription. For students, Gemini CLI is the obvious starting point.' },
            { label: 'Context window', badge: 'Both support 1M tokens', body: 'Gemini CLI launched with a 1M token context window and has maintained it. Claude Code now also supports 1M tokens on Claude Sonnet 4.6+. Both can theoretically load an entire large codebase — Gemini CLI was first to make this the default.' },
            { label: 'Code quality & accuracy', badge: 'Claude Code wins currently', body: 'On SWE-bench Verified (the standard coding benchmark), Claude Code scores ~80.9% vs Gemini CLI\'s ~63.8%. Claude Code produces more accurate multi-file changes with fewer errors. For complex refactors and tricky bugs, Claude Code has an edge in precision.' },
            { label: 'Open source', badge: 'Gemini CLI wins', body: 'Gemini CLI is fully open source (Apache 2.0 license) — you can inspect the code, modify it, and contribute on GitHub. Claude Code is closed source. For trust, customization, and learning how it works, Gemini CLI is more transparent.' },
          ]} />
        </Block>
        <Block title="What you can do with Gemini CLI" titleColor={color}>
        <CanDoList items={[
          'Build new features in an existing project by describing them in plain English — it reads your codebase and writes code that fits your patterns',
            'Refactor large codebases with the full 1M token context — ask it to rename a pattern or restructure a module across every file at once',
            'Debug complex issues by letting it trace through your code, add logging, run the program, and interpret the output autonomously',
            'Generate comprehensive tests for your functions — it reads your code, writes test cases, and can run them to verify they pass',
            'Connect external tools via MCP to give Gemini CLI access to your database, GitHub, or any API during coding sessions',
            'Use it completely free as a daily coding assistant without any API billing or subscription required',
        ]} />
      </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Build a Feature with Gemini CLI</span></div>
          <p className="tool-layout-task__desc">Install Gemini CLI and use it to add a complete feature to an existing project. Take any project you have — a REST API, a simple web app, anything with a few files. Ask Gemini CLI to add a new feature end-to-end: user authentication, a search function, data export, or rate limiting. Watch how it reads your project, plans the approach, and edits multiple files autonomously. This is the fastest way to understand what terminal AI agents actually do.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Install and authenticate', body: 'Run: npm install -g @google/gemini-cli then gemini auth. Sign in with your Google account. The whole setup takes under 5 minutes.' },
            { n: '2', title: 'Navigate to your project', body: 'cd into any existing project directory. Run: gemini to start an interactive session. Gemini CLI will automatically read your project structure.' },
            { n: '3', title: 'Give it a feature task', body: "Try: 'Add JWT authentication to this Express API. Create a /login endpoint, a /register endpoint, and middleware that protects all /api routes. Follow the existing code patterns.' Watch it work." },
            { n: '4', title: 'Review diffs and approve changes', body: 'Before applying changes, Gemini CLI shows you what it wants to edit. Review each file change. Ask follow-up questions: "Why did you choose this approach?" or "Use environment variables for the secret key instead."' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">100% FREE — no credit card, no API key, just a Google account</span></div>
        </div>
        <ProTip>
        Start every Gemini CLI session by asking it to read and summarize your project first: "Read all the files in this project and explain the architecture, what each file does, and the main patterns used." This primes the 1M context window with your full codebase and produces dramatically better results for every subsequent request. Treat it like briefing a new developer before asking them to write code.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/coding/windsurf', label: 'Windsurf' }}
        next={{ path: '/ai-lab/coding/codeium', label: 'Codeium' }}
      />
    </ToolPageShell>
  )
}
