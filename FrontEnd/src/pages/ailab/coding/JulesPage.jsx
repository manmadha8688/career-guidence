import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#A78BFA'

export default function JulesPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Coding">
      <ToolHeader
        icon="🪼"
        title="Google Jules — Async Autonomous Coding Agent"
        tagline="Delegate a coding task, walk away, and come back to a ready-to-review pull request"
        badges={[['✓ Free tier', '#4ADE80'], ['jules.google', color], ['Powered by Gemini', '#4285F4'], ['Public Beta', 'var(--text-muted)']]}
        overview={"Jules is Google's asynchronous coding agent. Unlike an in-editor assistant that helps you type, Jules works like a remote teammate: you connect it to a GitHub repository, describe a task in plain English, and Jules clones your whole repo into a secure Google Cloud VM, forms a plan with a Gemini model, edits the code, runs it, and finally opens a pull request you can review and merge. Because it runs in the cloud, you can fire off a task and close your laptop — you are not tied to your machine while it works. Jules is in public beta and has a genuinely useful free tier (15 tasks per day, up to 3 running at once). It also reaches beyond the web app: there is a terminal companion (Jules Tools), an extension inside the Gemini CLI, and a Jules API, all sharing the same view of your project. For an Indian student on a laptop with limited RAM, the appeal is real — the heavy work happens on Google's servers, not on your device."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Google Jules — full tutorial & first task walkthrough', url: 'https://www.youtube.com/results?search_query=google+jules+coding+agent+tutorial', dur: 'search', note: 'How to connect GitHub, write a task, and review the pull request Jules opens' },
            { label: 'Jules vs OpenAI Codex vs Devin — async agents compared', url: 'https://www.youtube.com/results?search_query=google+jules+vs+codex+async+coding+agent', dur: 'search', note: 'Where cloud async agents beat in-editor assistants — and where they do not' },
            { label: 'Jules Tools + Gemini CLI — running Jules from the terminal', url: 'https://www.youtube.com/results?search_query=jules+tools+gemini+cli+tutorial', dur: 'search', note: 'Using the terminal companion and CLI extension for the same tasks' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How Jules is different — async, cloud, PR-native" color={color} />
          <InfoBox color={color}>{"Jules' defining idea: you delegate, you don't drive. Most AI coding tools (Cursor, Cline, Copilot) sit inside your editor and help you as you type — you stay in the loop for every step. Jules flips that. You hand it a task, it runs autonomously on a Google Cloud VM, and it comes back with a finished pull request. Your job is to review the result, not to babysit the process. This is the same model as OpenAI Codex (cloud) and Devin — 'async' agents you assign work to."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>The workflow feels less like using a tool and more like managing a junior developer. You write an issue-style request — "add pagination to the products API and update the tests" — and Jules reads your entire codebase to understand the conventions before it changes anything. Because everything happens in an isolated cloud VM connected to GitHub, the output is always a pull request: a clean, reviewable diff with a description of what changed and why. Nothing lands on your main branch until you approve it. This makes Jules well suited to well-scoped, self-contained tasks — bug fixes, adding documentation, writing tests, small features — that you would otherwise queue up and do yourself.</p>
          {[
            'Runs in the cloud — Jules clones your repo into a Google Cloud VM, so your own machine stays free (great for low-spec laptops)',
            'Every result is a pull request — you review a normal GitHub diff and merge only when happy; your branches stay protected',
            'Fully asynchronous — start a task, close your laptop, get notified when the PR is ready; run up to 3 tasks at once on the free tier',
            'Reads the whole repo first — Jules studies your project structure and conventions before editing, not just the file in front of you',
            'Multiple surfaces — the web app, Jules Tools in the terminal, a Gemini CLI extension, and a Jules API all share the same project context',
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
            { name: 'GitHub-Native', desc: 'Jules connects directly to your GitHub account and repositories. It works on a branch, opens a pull request with its changes, and lets you review and merge through the normal GitHub flow — no new tool to learn for reviewing.' },
            { name: 'Cloud VM Sandbox', desc: 'Each task runs in an isolated Google Cloud virtual machine with your repo cloned in. Jules can install dependencies and run your code and tests there, so its changes are actually executed — not just guessed at — before the PR opens.' },
            { name: 'Plan-First Execution', desc: 'Before editing, Jules writes a plan describing the steps it will take. You can read the plan to understand its approach, which makes the final diff far easier to trust and review.' },
            { name: 'Gemini-Powered', desc: 'Jules is built on Google\'s Gemini models. The free tier runs on a capable Gemini model; paid Google AI Pro and Ultra plans give higher access and priority to the latest models (starting with Gemini 3 Pro).' },
            { name: 'Parallel Tasks', desc: 'Because tasks run in the cloud, you can run several at once — 3 concurrent on the free tier, 15 on Pro, 60 on Ultra. Delegate a batch of small fixes and let them all work in parallel.' },
            { name: 'Terminal & API Access', desc: 'Beyond the web app, Jules Tools brings it to your terminal, a Gemini CLI extension embeds it in that workflow, and the Jules API lets you trigger tasks programmatically — all sharing one project context.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — your first delegated task" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Sign in at jules.google', body: 'Go to jules.google and sign in with your Google account. Jules is in public beta with a free tier — no payment needed to start. (Paid plans are bundled with Google AI Pro/Ultra subscriptions, currently for individual Google accounts.)' },
            { n: '2', title: 'Connect a GitHub repository', body: 'Authorise Jules to access GitHub and pick a repo to work on. Use one of your own projects, or fork a small open-source repo to experiment safely. Jules only touches the repos you grant it.' },
            { n: '3', title: 'Write a clear, scoped task', body: 'Describe one well-defined task in plain English, like a GitHub issue: "Add input validation to the signup form and write tests for it." The tighter the scope, the better the result — async agents shine on focused tasks, not vague "build my whole app" prompts.' },
            { n: '4', title: 'Review the plan', body: 'Jules clones your repo into a cloud VM and proposes a plan of steps. Read it. If the approach looks wrong, refine your task before it writes code — this saves one of your daily task credits.' },
            { n: '5', title: 'Let it run — then check the PR', body: 'Jules edits the code and runs it in the VM. You can close your laptop; it works asynchronously. When done, it opens a pull request on GitHub with the diff and a summary. You have 15 tasks/day and 3 concurrent on the free tier.' },
            { n: '6', title: 'Review, request changes, merge', body: 'Open the PR on GitHub. Read the diff exactly as you would review a teammate\'s code. Leave a comment to ask Jules for a change, or merge it if it is good. Never merge AI code you have not read.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Free tier vs paid plans" color={color} />
          <Compare color={color} items={[
            { label: 'Free (Jules public beta)', badge: 'Free — 15 tasks/day', body: 'No cost. 15 tasks per rolling 24 hours and up to 3 concurrent tasks, running on a capable Gemini model. This is genuinely enough for a student to learn the async-agent workflow and handle real bug fixes and small features. Best starting point.' },
            { label: 'Jules in Google AI Pro', badge: '~$19.99/mo (bundled)', body: 'Jules is included with the Google AI Pro subscription: roughly 100 tasks per day and 15 concurrent tasks, with higher access to the latest models (starting with Gemini 3 Pro). For someone coding daily and delegating a lot, this removes the free-tier ceiling.' },
            { label: 'Jules in Google AI Ultra', badge: '~$124.99/mo (bundled)', body: 'The heaviest tier: about 300 tasks per day and 60 concurrent tasks with priority access to the newest models. Built for power users running many agents in parallel — usually overkill for individual students.' },
            { label: 'Verify before you rely on limits', badge: 'Beta — limits evolve', body: 'Jules is in public beta and Google has said limits and features will evolve. Always confirm the current free-tier task count, concurrency, and model on jules.google/docs before planning around them.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Jules vs Cursor vs OpenAI Codex" color={color} />
          <Compare color={color} items={[
            { label: 'Where the work happens', badge: 'Different environments', body: 'Jules: a Google Cloud VM — fully async, you are not needed while it runs. Cursor: your local editor — interactive, you drive every step. OpenAI Codex: also a cloud sandbox (async, PR-based), the closest analogue to Jules.' },
            { label: 'Interaction style', badge: 'Delegate vs collaborate', body: 'Jules and Codex are "delegate" tools: assign a task, review a PR. Cursor and Cline are "collaborate" tools: you and the AI edit together in real time. Async agents win when you have many small self-contained tasks; interactive editors win when you are actively designing.' },
            { label: 'Model', badge: 'Gemini vs GPT vs any', body: 'Jules runs on Google Gemini models. OpenAI Codex runs on OpenAI\'s coding models. Cursor and Cline let you pick from many providers. Jules is the most convenient if you already live in the Google ecosystem.' },
            { label: 'Cost to start', badge: 'All have free access', body: 'Jules: free tier (15 tasks/day). Codex: included with a ChatGPT Plus/Pro plan. Cursor: free tier with limited fast uses. For a zero-rupee start on async agents, Jules\' free tier is one of the most generous.' },
            { label: 'Best fit', badge: 'Different jobs', body: 'Jules: batch of well-scoped fixes/features you want done in the background while you do other work. Cursor: hands-on building and refactoring in your editor. Codex: similar to Jules but inside the OpenAI/ChatGPT ecosystem.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting good results from an async agent" color={color} />
          <InfoBox color={color}>{"Async agents like Jules reward good task-writing more than any other AI tool. Because you are not in the loop while it works, a vague prompt wastes an entire task (and one of your daily credits). Treat each task like a well-written GitHub issue: state the goal, the files or area involved, the acceptance criteria, and whether tests are expected. The clearer the request, the better the pull request."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>The most common beginner mistake is asking an async agent to do too much at once — "build me a full e-commerce site." That is a poor fit. Async agents excel at bounded work you could describe in a single issue. Break big goals into a queue of small, independent tasks and delegate them one by one (or a few in parallel). Review each PR before moving on so mistakes do not compound.</p>
          {[
            'Scope tightly — one task should map to one reviewable pull request, not an entire application',
            'Write acceptance criteria — "the endpoint returns 400 on invalid input and there is a test proving it"',
            'Name the area — mention the file, folder, or feature so Jules knows where to look first',
            'Read the plan before it codes — refining the task early is cheaper than reviewing a wrong PR later',
            'Always review the diff on GitHub — never merge agent output you have not read line by line',
          ].map((item, i) => (
            <div key={i} className="tool-layout-cando-item">
              <div className="tool-layout-cando-item__dot" />
              <span className="tool-layout-cando-item__text">{item}</span>
            </div>
          ))}
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Fix a Real GitHub Issue with Jules</span></div>
          <p className="tool-layout-task__desc">The best way to learn an async agent is to use it exactly as a working developer would: pick a real, bounded task and delegate it end to end. You will practice the full loop — connect a repo, write a crisp task, review the plan, and merge a pull request. This is the same workflow companies now use to let agents clear their backlog.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Set up a practice repo', body: 'Sign in at jules.google with your Google account (free tier). On GitHub, fork a small open-source project — or create a fresh repo with a simple app you built. Connect it to Jules. Working on a fork means zero risk to anything real.' },
            { n: '2', title: 'Pick one clear task', body: 'Choose a single, well-defined improvement: "Add a /health endpoint that returns status ok and a test for it," or "Add JSDoc comments to every function in utils.js." Write it as a proper issue with a clear done-condition.' },
            { n: '3', title: 'Delegate and read the plan', body: 'Submit the task. Jules clones the repo to a cloud VM and proposes a plan. Read the plan carefully — does it understand your intent? If not, cancel and rewrite the task more precisely before spending another credit.' },
            { n: '4', title: 'Let it run in the background', body: 'Approve the plan and let Jules work. Because it is async, start a second small task in parallel (you get 3 concurrent) or just step away. You will be notified when the pull request is ready.' },
            { n: '5', title: 'Review the pull request properly', body: 'Open the PR on GitHub. Read the full diff. Check that tests were added and that the change matches your acceptance criteria. Leave a review comment asking Jules to fix anything that is off.' },
            { n: '6', title: 'Merge and reflect', body: 'Once the PR is correct, merge it. Then write down what made the task succeed or fail — scope, clarity, acceptance criteria. This reflection is exactly the skill that makes you effective with any async agent.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — Jules public beta gives 15 tasks/day and 3 concurrent tasks at no cost; a forked GitHub repo keeps the whole exercise risk-free</span></div>
        </div>
        <ProTip>
        Think of Jules as a teammate you assign issues to, not a chatbot you converse with. The single biggest lever on quality is how you write the task. Before you hit submit, ask yourself: "Could a new developer complete this from my description alone, and would they know when they are done?" If the answer is no, add the missing scope, the file names, and the acceptance criteria. A batch of five tightly-scoped tasks running in parallel will get you far more done than one sprawling "build everything" request — and every result comes back as a clean pull request you fully control.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/coding/openai-codex', label: 'OpenAI Codex' }}
        next={{ path: '/ai-lab/coding/cody', label: 'Sourcegraph Cody' }}
      />
    </ToolPageShell>
  )
}
