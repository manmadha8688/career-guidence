import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F59E0B'

export default function ClaudeCodePage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="AI Coding Tools">
      <ToolHeader
        icon="🤖"
        title="Claude Code — The Terminal-Native AI Coding Agent"
        tagline="Anthropic's agentic CLI that understands and edits your entire codebase"
        badges={[['✓ Free Tier Available', '#4ADE80'], ['Terminal CLI', color], ['Anthropic', 'var(--text-muted)']]}
        overview={"Claude Code is not a plugin or autocomplete tool — it is an autonomous coding agent that lives in your terminal. Released by Anthropic in February 2025 and reaching general availability in May 2025, it represents a different category from Copilot or Cursor. While those tools assist you inside an editor, Claude Code reads your entire codebase (up to 1 million tokens — roughly a full project), plans a sequence of actions, edits multiple files, runs your tests, fixes failures, and creates pull requests — all from a natural language description of what you want. It holds the highest score of any AI coding tool on SWE-bench Verified (80.8%), the benchmark measuring ability to solve real GitHub issues. For students building projects, it is particularly powerful for tasks that span multiple files or require understanding how different parts of a codebase connect."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Claude Code Tutorial 2025', url: 'https://www.youtube.com/watch?v=2eHgWt_WBuc', dur: '~20 min', note: 'Best overall overview — setup to advanced workflows' },
            { label: 'Claude Code Tutorial: Beginner to Advanced in 20 Minutes', url: 'https://www.youtube.com/watch?v=ujHXnlSVheI', dur: '20 min', note: 'Covers install, CLAUDE.md, multi-file tasks, and real project workflow' },
            { label: 'How to Build an App With Claude Code - Full Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=GUgxx6fMiR8', dur: 'Full tutorial', note: 'End-to-end: build a real app from scratch using Claude Code' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How Claude Code works differently" color={color} />
          <InfoBox color={color}>Claude Code runs as a process in your terminal with full access to your project directory. It reads all your code, understands the architecture, then plans and executes multi-step tasks. The key difference from chat-based tools: it takes actions — writing files, running commands, reading test output — rather than just generating text you then act on.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The CLAUDE.md file is Claude Code's memory. Create this file in your project root and write everything the agent needs to know to work effectively: what the project does, how to run it, how to run tests, coding standards, naming conventions, anything important. Claude reads CLAUDE.md at the start of every session. This transforms every session from starting cold to starting with full context.</p>
        </Block>
        <Block>
          <SubHead label="Installing and setting up" color={color} />
          <Steps color={color} items={[
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
        <Block>
          <SubHead label="Core capabilities" color={color} />
          <CardGrid color={color} items={[
            { name: 'Autonomous multi-file editing', desc: 'Describe a feature or change. Claude plans which files to edit, makes the changes across all of them, runs tests to verify, and fixes any failures it caused — without you manually applying each change.' },
            { name: 'Full codebase understanding', desc: '1 million token context window. Claude reads your entire project at once — not just the open file. It knows how components connect, where functions are defined, what patterns your codebase uses.' },
            { name: 'Test-driven execution', desc: 'Tell Claude to "add input validation to all API endpoints and make sure all tests pass." It writes the code, runs your test suite, reads the failures, fixes them, and iterates until tests are green.' },
            { name: 'Git integration', desc: '"Create a PR for the authentication feature I just described." Claude writes the code, stages the changes, writes a commit message, creates the branch, and opens a pull request — all from one instruction.' },
            { name: 'CLAUDE.md memory', desc: 'Persistent project context stored in a file. Write your project standards once. Claude reads them every session. Never re-explain your codebase\'s conventions again.' },
            { name: 'CI/CD pipeline mode', desc: 'Claude Code can run in headless (non-interactive) mode inside automated pipelines — useful for AI-assisted code review, automated refactoring jobs, or test generation on every commit.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="What you can actually say to it" color={color} />
          <Steps color={color} items={[
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
        <Block>
          <SubHead label="Claude Code vs Cursor vs GitHub Copilot" color={color} />
          <Compare color={color} items={[
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
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Describe a complete feature in plain English and have it implemented across multiple files',
            'Run tests, see failures, and have Claude fix them autonomously — without manual intervention',
            'Understand unfamiliar codebases by asking Claude to map and explain the architecture',
            'Use CLAUDE.md to give Claude permanent memory of your project\'s standards and conventions',
            'Create pull requests, commit messages, and branch names from natural language descriptions',
        ]} />
      </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span>
            <span className="tool-layout-task__label">PROJECT — Build a Feature with Claude Code</span>
          </div>
          <p className="tool-layout-task__desc">Take a project you are working on (class project, personal project, anything with real code). Write a CLAUDE.md file first: describe the project, how to run it, how to run tests, and any important conventions. Then ask Claude Code to implement one real feature you actually need — something that touches at least 3 files. Let it run. Review every change it made. For each file it edited: do you understand WHY it made that change? If not, ask Claude to explain. This calibration exercise teaches you what Claude Code can handle autonomously vs. what still needs your judgment.</p>
          <Steps color={color} items={[
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
        <ProTip>
        Claude Code respects .gitignore — it will not read files listed there, which is where secrets and credentials live. However, always review what Claude proposes to commit before it creates a pull request. Claude can produce correct code that commits configuration changes or debugging artifacts you did not intend to include. The review step is not optional when Claude has write access to your repository.
      </ProTip>
      <PageNavRow
        prev={undefined}
        next={{ path: '/ai-lab/coding/cursor', label: 'Cursor' }}
      />
    </ToolPageShell>
  )
}
