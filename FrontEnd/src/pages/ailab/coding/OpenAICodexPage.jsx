import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#10A37F'

export default function OpenAICodexPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Coding">
      <ToolHeader
        icon="🧠"
        title="OpenAI Codex — Cloud Software Engineering Agent"
        tagline="Delegate real coding tasks — build features, fix bugs, and open pull requests from ChatGPT, the terminal, or your IDE"
        badges={[['✓ Included with ChatGPT Plus', '#4ADE80'], ['openai.com/codex', color], ['codex-1 model', 'var(--text-muted)']]}
        overview={"OpenAI Codex is OpenAI's software engineering agent — a system that reads your codebase, writes and edits code, runs commands, executes tests, and returns finished work you can review. The modern Codex (relaunched in 2025) is powered by codex-1, a version of OpenAI's o-series reasoning models fine-tuned specifically for real-world software engineering. It comes in three connected forms: the cloud agent inside ChatGPT (each task runs in its own isolated sandbox pre-loaded with your repo), the open-source Codex CLI that runs the agent in your terminal, and an IDE extension for VS Code and Cursor. You hand Codex a task in plain English — 'add pagination to the users API' or 'fix the failing checkout test' — and it works autonomously in a sandbox, runs your tests to verify its own work, and hands back a diff or a ready-to-review pull request. It is designed for delegating multiple parallel tasks at once rather than line-by-line autocomplete, making it a true teammate rather than a completion engine."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Introducing Codex — OpenAI', url: 'https://www.youtube.com/watch?v=hhdpnbfH6NU', dur: '~10 min', note: 'Official OpenAI launch — what the Codex cloud agent is and how tasks run in isolated sandboxes' },
            { label: 'OpenAI Codex CLI — Get Started in the Terminal', url: 'https://www.youtube.com/watch?v=FUq9qRwrDrI', dur: '~15 min', note: 'Install the open-source Codex CLI, authenticate, and run your first agentic coding task locally' },
            { label: 'Codex vs Claude Code vs Cursor — Which Agent Wins?', url: 'https://www.youtube.com/watch?v=aQjMTQpXCzs', dur: '~18 min', note: 'Hands-on comparison of the top agentic coding tools on real tasks and pull requests' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How Codex is different — delegate tasks, not keystrokes" color={color} />
          <InfoBox color={color}>{"Codex's defining philosophy: you assign work, the agent completes it. Instead of suggesting the next line as you type, Codex takes a full task, spins up an isolated sandbox pre-loaded with your repository, and works independently — reading files, editing code, running your test suite, and iterating until the task is done. You review the finished diff, request changes, or merge the pull request. It is built for parallelism: fire off several tasks at once and let each run in its own cloud container."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Most coding assistants live inside your editor and help you write the current file. Codex operates one level up — at the task level. When you give it a job, it doesn't just generate text; it executes a real engineering loop inside a sandboxed environment: it explores the repo to understand context, makes the changes across as many files as needed, runs the tests and linters you already have, reads the output, and fixes its own mistakes before returning. Because each task runs in isolation with no internet access during execution, it is safe to let it run autonomously. The result is a reviewable diff or GitHub pull request — the same artifact a human teammate would hand you.</p>
          {[
            'Runs in an isolated sandbox — each task gets its own cloud container pre-loaded with your repo, safe to run autonomously',
            'Verifies its own work — Codex runs your existing tests and linters, reads the results, and iterates until they pass',
            'Task-level parallelism — assign multiple tasks at once and let each run independently in the background',
            'Opens pull requests — connect your GitHub and Codex returns a ready-to-review PR, not just a code snippet',
            'Three surfaces, one agent — cloud (ChatGPT), terminal (Codex CLI), and IDE extension share the same codex-1 engine',
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
            { name: 'codex-1 Engine', desc: 'Powered by codex-1, a version of OpenAI\'s o-series reasoning models fine-tuned for software engineering. It plans before it codes, handles multi-file changes, and reasons about test failures rather than guessing.' },
            { name: 'Cloud Sandbox', desc: 'Every task in ChatGPT runs in its own isolated container pre-loaded with your repository. No internet access during execution keeps the run safe and reproducible. You get a full log of every command it ran.' },
            { name: 'Codex CLI (Open Source)', desc: 'The open-source terminal agent brings Codex to your local machine. Run it in any project, approve or auto-run commands, and keep everything on your own hardware. Bring your ChatGPT login or an API key.' },
            { name: 'IDE Extension', desc: 'The Codex extension for VS Code and Cursor lets you delegate tasks and review diffs without leaving your editor. Hand off work to the cloud, keep coding, and pull the result back in when it\'s ready.' },
            { name: 'GitHub Pull Requests', desc: 'Connect your GitHub account and Codex opens real pull requests with its changes and a summary of what it did. Review, comment, request changes, and merge using your normal review workflow.' },
            { name: 'AGENTS.md Guidance', desc: 'Drop an AGENTS.md file in your repo to tell Codex how to build, test, and follow your conventions — like a README written for the agent. It reads this to work the way your team works.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — cloud, CLI, and IDE" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Open Codex in ChatGPT', body: 'You need a ChatGPT Plus, Pro, Team, Edu, or Enterprise plan. Go to chatgpt.com and open Codex from the sidebar. On first use, connect the GitHub account and repositories you want Codex to work in.' },
            { n: '2', title: 'Connect a repository', body: 'Select the repo Codex should operate on. Codex clones it into an isolated sandbox for each task. Add an AGENTS.md file at the repo root describing how to install dependencies, run the app, and run tests so Codex follows your setup.' },
            { n: '3', title: 'Assign your first task', body: 'Describe a task in plain English: "Add input validation to the signup form and write tests for it." Choose "Code" to have Codex make changes, or "Ask" to have it answer questions about the codebase without editing.' },
            { n: '4', title: 'Watch it work and review', body: 'Codex explores the repo, edits files, and runs your tests inside the sandbox. When it finishes it shows a diff plus a log of every command it ran. Review the changes, request follow-up edits, or open a pull request.' },
            { n: '5', title: 'Try the Codex CLI locally', body: 'Install the open-source terminal agent: npm install -g @openai/codex (or brew install codex). Run codex inside any project folder and sign in with your ChatGPT account. Now the same agent runs on your machine.' },
            { n: '6', title: 'Add the IDE extension', body: 'Install the Codex extension from the VS Code / Cursor marketplace. Sign in, select a task, and delegate it from your editor. Diffs come back inline so you can review and apply them without switching tools.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Where to run Codex — pick your surface" color={color} />
          <Compare color={color} items={[
            { label: 'Codex in ChatGPT (cloud)', badge: 'Best for parallel tasks', body: 'Runs each task in an isolated cloud sandbox pre-loaded with your repo. Ideal for delegating several independent tasks at once and reviewing finished diffs or PRs later. Included with your ChatGPT Plus/Pro/Team/Enterprise plan.' },
            { label: 'Codex CLI (terminal)', badge: 'Open source — local', body: 'The open-source agent runs in your terminal on your own machine. Best when you want the code and commands to stay local, or to script Codex into your own workflows. Sign in with ChatGPT or use an OpenAI API key.' },
            { label: 'Codex IDE extension', badge: 'Best inside your editor', body: 'The VS Code / Cursor extension lets you delegate tasks and review diffs without leaving your editor. Best for staying in flow — hand off work, keep coding, and pull results back inline when ready.' },
            { label: 'Codex via API (codex-mini)', badge: 'For builders', body: 'codex-mini-latest is available through the OpenAI Responses API for developers who want to build Codex-style agents into their own products. Best when you are integrating agentic coding into an app rather than using it directly.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="AGENTS.md — teach Codex your project" color={color} />
          <InfoBox color={color}>{"AGENTS.md is a plain Markdown file you place at the root of your repository to guide the agent. Think of it as a README written specifically for Codex: it describes how to install dependencies, how to run the project, how to run and validate tests, coding conventions to follow, and anything else the agent needs to work like a member of your team. Codex reads it automatically at the start of every task."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>A good AGENTS.md file is the single biggest lever on Codex output quality. Without it, the agent has to infer your build and test commands; with it, Codex knows exactly how to verify its own work, which dramatically increases the chance that the diff it returns actually passes CI. Keep it short, concrete, and command-focused.</p>
          {[
            'Setup — the exact commands to install dependencies (npm install, pip install -r requirements.txt, mvn install)',
            'Run — how to start the app locally so Codex can reason about behaviour',
            'Test — the precise test and lint commands Codex should run to validate its changes',
            'Conventions — code style, folder structure, and patterns your team follows',
            'Scope hints — files or directories the agent should or should not touch',
          ].map((item, i) => (
            <div key={i} className="tool-layout-cando-item">
              <div className="tool-layout-cando-item__dot" />
              <span className="tool-layout-cando-item__text">{item}</span>
            </div>
          ))}
        </Block>
        <Block>
          <SubHead label="Codex vs Claude Code vs Cursor" color={color} />
          <Compare color={color} items={[
            { label: 'Core model', badge: 'Different engines', body: 'Codex: codex-1 (OpenAI o-series, tuned for software engineering). Claude Code: Anthropic Claude models. Cursor: your choice of frontier models (Claude, GPT, Gemini). All three are strong; pick based on ecosystem and workflow fit.' },
            { label: 'Primary workflow', badge: 'Task vs edit', body: 'Codex: delegate full tasks that run autonomously in a sandbox, often in parallel, returning PRs. Claude Code: terminal agent for interactive, deep sessions. Cursor: an editor where you code alongside the AI with full-codebase context.' },
            { label: 'Where it runs', badge: 'Cloud + local', body: 'Codex: cloud sandbox (ChatGPT), plus local CLI and IDE extension. Claude Code: terminal. Cursor: a full VS Code-based editor. Codex is the strongest option for offloading background work to the cloud.' },
            { label: 'Pricing model', badge: 'Bundled vs usage', body: 'Codex: included with ChatGPT Plus/Pro/Team/Enterprise; API access via codex-mini. Claude Code: Anthropic subscription / API. Cursor: free tier plus paid Pro. Codex is the best value if you already pay for ChatGPT.' },
            { label: 'Best use cases', badge: 'Different strengths', body: 'Codex: parallel bug fixes, well-scoped features, and PR-based work you review async. Claude Code: long interactive reasoning sessions in the terminal. Cursor: hands-on flow coding with instant in-editor context.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="What Codex is great at (and its limits)" color={color} />
          <InfoBox color={color}>{"Codex is strongest on well-scoped, verifiable tasks — the kind where success can be checked by running tests. Bug fixes with a failing test, adding an endpoint that follows an existing pattern, writing tests for existing code, and small-to-medium features are its sweet spot. It is weaker on tasks with vague requirements, decisions that need product judgement, or changes that touch systems it cannot exercise in the sandbox."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The practical rule: the clearer the definition of done, the better Codex performs. Give it a failing test to make pass, an AGENTS.md that tells it how to validate its work, and a tightly scoped task, and it will often return a mergeable diff on the first try. Give it a fuzzy prompt like "improve the app" and you'll get less predictable results. Always review Codex's diff and run the code yourself before merging — treat it as a fast, capable junior engineer whose work you still review, not an infallible oracle.</p>
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Fix a Bug and Ship a Feature with Codex</span></div>
          <p className="tool-layout-task__desc">Use Codex end-to-end on a real repository: connect it, teach it your project with an AGENTS.md, then delegate two tasks — a bug fix guided by a failing test and a small new feature — and review the pull requests it returns. This teaches you the core agentic loop: assign, verify, review, merge.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Connect a repo in Codex', body: 'Open Codex in ChatGPT (Plus/Pro plan). Connect your GitHub and pick a small project you own — ideally one that already has a test suite. Let Codex clone it into a sandbox.' },
            { n: '2', title: 'Write an AGENTS.md', body: 'Add AGENTS.md at the repo root. Include the install command, how to run the app, and the exact test command (e.g. "npm test"). Commit it. This tells Codex how to validate its own work.' },
            { n: '3', title: 'Delegate a bug fix', body: 'Write or point to a failing test. Assign: "Make the failing test in tests/checkout.test.js pass without breaking other tests." Watch Codex read the failure, edit the code, and re-run the suite in the sandbox.' },
            { n: '4', title: 'Review the diff', body: 'When Codex finishes, read the diff and the command log. Confirm the tests pass. Request a change if needed ("also add a test for the empty-cart case"), then open a pull request from the task.' },
            { n: '5', title: 'Delegate a small feature', body: 'Assign a well-scoped feature that mirrors existing patterns: "Add a GET /api/users/:id endpoint following the same style as the existing users list endpoint, with a test." Let it run in parallel while you do other work.' },
            { n: '6', title: 'Merge and reflect', body: 'Review both pull requests, pull the branch locally, run the app, and confirm everything works. Note which task Codex nailed and which needed follow-up — that intuition is how you learn to scope tasks well.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">Included with ChatGPT Plus ($20/mo), Pro, Team, and Enterprise — no separate Codex subscription needed for normal usage</span></div>
        </div>
        <ProTip>
        Treat AGENTS.md and a failing test as Codex's two best inputs. The single most reliable way to get a mergeable diff on the first try is to hand Codex a clearly defined finish line it can check itself: a failing test that describes exactly what "done" means, plus an AGENTS.md that tells it how to run that test. Because Codex runs your suite inside the sandbox and iterates until it's green, a good test is worth more than a long prompt. Scope each task tightly, let several run in parallel, and always review the diff before you merge — Codex is a fast junior engineer, not a replacement for your judgement.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/coding/tabnine', label: 'Tabnine' }}
        next={{ path: '/ai-lab/apis/gemini-api', label: 'Gemini API' }}
      />
    </ToolPageShell>
  )
}
