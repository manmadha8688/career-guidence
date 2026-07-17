import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#5B21B6'

export default function QodoPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Coding">
      <ToolHeader
        icon="🧪"
        title="Qodo — AI Test Generation & Code Review"
        tagline="Code integrity, not just code generation — AI that reviews PRs and writes real tests"
        badges={[['✓ Free plan', '#4ADE80'], ['qodo.ai', color], ['Formerly CodiumAI', 'var(--text-muted)'], ['Open-source core', '#10B981']]}
        overview={"Qodo — formerly CodiumAI, rebranded in 2024 — approaches AI coding from the opposite direction to most tools. While Cursor, Copilot and friends focus on writing code faster, Qodo focuses on code integrity: making sure the code you ship is correct. It combines three things in one platform: automated pull-request review using specialised AI agents, meaningful unit-test generation (its original claim to fame), and an IDE assistant (Qodo Gen) plus a CLI for VS Code, JetBrains, and the terminal. There is a free Developer plan aimed at individuals — roughly 30 PR reviews and 250 IDE/CLI credits per month — with a paid Teams plan (about $30/user/month) for teams that need more. The open-source foundation of its PR reviewer, PR-Agent, can even be self-hosted for free with your own model keys. For an Indian student, Qodo teaches a skill that pure code-generation tools skip: writing tests and reviewing code, which is exactly what senior engineers and interviewers care about."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Qodo (CodiumAI) — AI test generation walkthrough', url: 'https://www.youtube.com/results?search_query=qodo+codiumai+test+generation+tutorial', dur: 'search', note: 'Generate meaningful unit tests for real code inside VS Code / JetBrains' },
            { label: 'Qodo Merge — automated AI pull-request review', url: 'https://www.youtube.com/results?search_query=qodo+merge+pr+agent+code+review+tutorial', dur: 'search', note: 'How Qodo reviews a PR with specialised agents and posts actionable feedback' },
            { label: 'PR-Agent open source — self-host the reviewer for free', url: 'https://www.youtube.com/results?search_query=qodo+pr-agent+open+source+self+host', dur: 'search', note: 'Run the open-source PR reviewer with your own LLM API key at zero platform cost' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How Qodo is different — quality, not just quantity" color={color} />
          <InfoBox color={color}>{"Qodo's defining philosophy: generating code is only half the job — the code must also be correct. So instead of racing to autocomplete more lines, Qodo generates tests that prove behaviour and reviews pull requests with specialised agents that catch bugs, security issues, and style problems. It answers the question most AI coding tools ignore: 'Is this code actually good?' That test-and-review focus is what makes it complementary to, not a replacement for, a code-writing tool like Cursor or Copilot."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Qodo lives in two places. Qodo Gen is the IDE and CLI assistant: it analyses a function, reasons about its behaviour and edge cases, and generates a suite of meaningful tests — not just one trivial happy-path test. Qodo Merge (built on the open-source PR-Agent) plugs into your Git provider and reviews pull requests automatically: it summarises the change, flags bugs and risks, suggests improvements, and can even propose the tests a PR is missing. The result is a workflow where AI does not just help you type code — it helps you trust it. For students preparing for internships and interviews, learning to think in tests and reviews is a genuine differentiator.</p>
          {[
            'Test generation — analyses a function\'s behaviour and edge cases to produce meaningful unit tests, not trivial stubs',
            'AI PR review — Qodo Merge summarises changes and flags bugs, security issues, and missing tests on every pull request',
            'IDE + CLI + Git — works inside VS Code and JetBrains (Qodo Gen), from the terminal (CLI), and on your PRs (Qodo Merge)',
            'Open-source core — PR-Agent, the engine behind Qodo Merge, is open source and self-hostable with your own model keys',
            'Complements code writers — pair it with Cursor/Copilot: they write, Qodo checks — the way real engineering teams work',
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
            { name: 'Meaningful Test Generation', desc: 'Qodo Gen reasons about what a function should do — including edge cases and failure paths — and generates a suite of unit tests, not a single happy-path stub. This is the capability that made CodiumAI famous.' },
            { name: 'Agentic PR Review', desc: 'Qodo Merge reviews pull requests with multiple specialised agents: it summarises the change, flags likely bugs and security risks, suggests improvements, and highlights missing tests — posted right in your Git provider.' },
            { name: 'IDE Assistant (Qodo Gen)', desc: 'Inside VS Code and JetBrains, Qodo Gen offers chat, code suggestions, local review, and test generation — bringing the quality workflow into the editor where you already work.' },
            { name: 'CLI for the Terminal', desc: 'The Qodo CLI extends test generation and quality workflows to the command line, so you can run agentic checks in scripts and CI-style flows without opening an IDE.' },
            { name: 'Open-Source PR-Agent', desc: 'PR-Agent is the open-source foundation of Qodo Merge. Teams can self-host it with Docker and their own LLM API keys for a zero-platform-cost path — great for learning how AI PR review actually works.' },
            { name: 'Credit-Based Usage', desc: 'IDE and CLI actions consume credits; most standard model requests cost 1 credit while premium models cost more. The free Developer plan includes a monthly credit allowance plus a set number of PR reviews.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — write tests with AI" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Install Qodo Gen in your IDE', body: 'Sign up at qodo.ai and install the Qodo Gen extension for VS Code or JetBrains from the marketplace. Sign in with your account — the free Developer plan is available to individuals.' },
            { n: '2', title: 'Open a function to test', body: 'Open a project and pick a function with real logic — input validation, a calculation, a parser. Select it. Test generation works best on functions that have clear inputs and outputs and a few edge cases.' },
            { n: '3', title: 'Generate a test suite', body: 'Use Qodo Gen\'s "generate tests" action on the selected function. It analyses the behaviour and proposes multiple tests, including edge cases you may not have thought of. Read each one — do they actually assert the right thing?' },
            { n: '4', title: 'Run the tests and fix gaps', body: 'Run the generated tests with your test runner. Some may reveal real bugs; some may need tweaking. Adjust the tests (or the code) until they pass and genuinely cover the behaviour. This loop is the whole point.' },
            { n: '5', title: 'Try PR review with Qodo Merge', body: 'Open a pull request in a GitHub repo and let Qodo Merge review it. Read its summary, bug flags, and suggestions. Note that the free plan includes a limited number of PR reviews per month (around 30) — use them on real changes.' },
            { n: '6', title: 'Optional: self-host PR-Agent', body: 'For an advanced, zero-platform-cost route, clone the open-source PR-Agent, run it with Docker, and point it at your own LLM API key. This teaches you exactly how AI code review is built — a strong portfolio talking point.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Free plan vs paid (2026)" color={color} />
          <Compare color={color} items={[
            { label: 'Developer (Free)', badge: 'Free for individuals', body: 'Around 30 PR reviews per month plus roughly 250 IDE/CLI credits per month, with the full code-review experience, the IDE plugin, the CLI, and community support via GitHub. Genuinely enough for a student to learn testing and review workflows. (Exact review counts have shifted recently — verify current numbers on qodo.ai.)' },
            { label: 'Teams', badge: '~$30/user/mo (annual)', body: 'About $30 per user per month billed annually (roughly $38 monthly). Includes a much larger credit pool (around 2,500 credits/user/month), agentic PR review at team scale, and priority support. The plan most working teams use in production.' },
            { label: 'Enterprise', badge: 'Custom', body: 'Custom pricing with on-premise/self-hosted deployment, custom models, compliance and security controls, and dedicated support — for larger organisations with strict requirements.' },
            { label: 'Self-hosted PR-Agent', badge: 'Free (BYO key)', body: 'The open-source PR-Agent can be self-hosted for free; you only pay for the LLM API tokens it consumes via your own key. The true zero-platform-cost option if you have the DevOps comfort to run it.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Qodo vs Copilot vs Cursor" color={color} />
          <Compare color={color} items={[
            { label: 'What it optimises for', badge: 'Different goals', body: 'Qodo: code integrity — tests and review, "is this code correct?" Copilot & Cursor: code generation — "help me write more, faster." They are complementary: use Cursor/Copilot to write, Qodo to test and review.' },
            { label: 'Test generation', badge: 'Qodo leads', body: 'Qodo: purpose-built, meaningful test suites with edge cases. Copilot/Cursor: can write tests when asked, but it is not their central focus or strength. If tests are the goal, Qodo is the specialist.' },
            { label: 'PR review', badge: 'Qodo\'s home turf', body: 'Qodo Merge: automated, agentic PR review on every change, built on open-source PR-Agent. Copilot has review features too, but Qodo\'s multi-agent review is its core product, not a side feature.' },
            { label: 'Cost for students', badge: 'All have free access', body: 'Qodo: free Developer plan. Copilot: free for students via GitHub Education. Cursor: free tier. You can run all three at once — write with Cursor/Copilot, then have Qodo review and test the result.' },
            { label: 'Career signal', badge: 'Qodo builds rare skills', body: 'Most students can prompt an AI to write code; far fewer can write good tests and review code critically. Practising with Qodo builds exactly the quality-focused habits that impress interviewers and senior engineers.' },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Add a Test Safety Net with Qodo</span></div>
          <p className="tool-layout-task__desc">Take an untested project and give it a real test suite plus an AI code review — the workflow professional teams live by. You will learn to think in tests and reviews, not just in features, which is the habit that separates hobby coders from employable engineers.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Set up Qodo Gen', body: 'Sign up at qodo.ai (free Developer plan) and install Qodo Gen in VS Code or JetBrains. Open a small project of your own that has little or no test coverage — a script, a small API, or a utility library.' },
            { n: '2', title: 'Generate tests for the core logic', body: 'Pick the two or three functions that carry the most logic. Use Qodo Gen to generate a test suite for each. Read the generated tests critically — do they cover the edge cases (empty input, invalid types, boundaries)?' },
            { n: '3', title: 'Run the suite and find bugs', body: 'Run all the tests. Any failures are gold: they may be a bad test, or a real bug in your code. Investigate each. Fix the code or refine the test until the suite passes and genuinely reflects correct behaviour.' },
            { n: '4', title: 'Commit and open a pull request', body: 'Commit your code and tests to a branch and open a pull request on GitHub. This sets up the review step and mirrors how real teams ship changes.' },
            { n: '5', title: 'Review the PR with Qodo Merge', body: 'Let Qodo Merge review the PR. Read its summary, its bug/security flags, and its suggestions. Apply the ones that make sense and note the ones you disagree with — reviewing the reviewer is part of the skill.' },
            { n: '6', title: 'Write a short reflection', body: 'Note which tests caught real problems, what the AI review found that you missed, and what it got wrong. This reflection turns a coding task into a genuine learning artifact you can talk about in an interview.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — Qodo&apos;s free Developer plan (≈30 PR reviews + ≈250 credits/month) covers this project; or self-host open-source PR-Agent for a fully free, BYO-key route</span></div>
        </div>
        <ProTip>
        Do not blindly trust AI-generated tests — a test that asserts the wrong thing is worse than no test, because it gives false confidence. Always read each generated test and ask "is this actually checking correct behaviour?" The real value of Qodo is not that it writes tests for you; it is that it forces you to think about edge cases, failure paths, and what "correct" even means for your code. Pair Qodo with a code-writing tool (Cursor, Copilot) for the complete professional loop: generate the feature, generate the tests, run them, and review the PR. That write-test-review cycle is exactly how strong engineering teams work — and practising it as a student puts you ahead of peers who only know how to prompt for code.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/coding/trae', label: 'Trae' }}
        next={{ path: '/ai-lab/coding/roo-code', label: 'Roo Code' }}
      />
    </ToolPageShell>
  )
}
