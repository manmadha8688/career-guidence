import { InfoBox, Steps, Compare, SubHead, CardGrid, PromptBlockList } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#0EA5E9'
const CYAN = '#00D9FF'

const prompts = [
  { label: 'Turn a task into a loop spec', text: 'I want to hand this task to an AI coding agent (Cursor / Claude Code) and let it run on its own instead of me prompting it turn by turn.\n\nTask: [describe what you want built or fixed]\n\nWrite me a "loop specification" for it with these 6 parts:\n1. Trigger — when should this run\n2. Goal — one sentence, measurable\n3. Tools/actions the agent is allowed to use\n4. Verification — the exact check that proves it is actually done (a test, a command, an output)\n5. Stop rule — max attempts / when to give up\n6. Escalation — when it should stop and ask me instead of guessing' },
  { label: 'Add a real verification step', text: 'Here is what my AI agent is supposed to build:\n\n[describe the feature]\n\nGive me a concrete, automatic way to VERIFY it is correct that does not rely on the agent saying "done". Prefer: a unit test, an assertion, a command whose exit code proves success, or a checklist of end-to-end checks the agent must make pass. Show me the actual test/command.' },
  { label: 'Design a self-correcting fix loop', text: 'I want a loop where an AI agent: runs my test suite, reads any failing test, edits the code to fix it, re-runs the tests, and repeats until all tests pass OR it has tried 5 times.\n\nMy project: [language/framework]. My test command: [e.g. npm test / pytest].\n\nWrite the exact instructions I should give the agent so it follows this loop and stops correctly. Include what it should do when it is stuck after 5 tries.' },
  { label: 'Debug a runaway / stuck loop', text: 'My AI agent keeps looping without making progress on this task:\n\n[describe task + what the agent keeps doing]\n\nDiagnose which part of my loop is broken using this checklist: is the goal measurable, is there a real verification step, is the stop rule missing, is the context growing stale, is it reward-hacking the check instead of solving the task? Tell me which one it is and how to fix the loop.' },
]

export default function LoopEngineeringPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="AI Foundations">
      <ToolHeader
        icon="🔁"
        title="Loop Engineering"
        tagline="The layer above prompting — designing the loop an AI agent runs, instead of prompting it turn by turn"
        badges={[['✓ FREE', '#4ADE80'], ['Concept — free to learn', color], ['AI Foundations', 'var(--text-muted)']]}
        overview={"Loop engineering is the practice of designing the system an AI agent runs inside — the repeating cycle of act, observe the result, decide the next step, and repeat — until a goal is proven done, instead of you typing a new prompt for every single step. It is the newest layer of the craft, named as its own discipline in mid-2026, and it sits directly on top of prompt engineering. When you use tools like Cursor's agent, Claude Code, or Devin, you are already using loop engineering — the tool reads your files, writes code, runs tests, reads the errors, fixes them, and runs again on its own. The model does the thinking; the loop decides whether it ever reaches a good answer. Learning to design good loops is quickly becoming the highest-leverage AI skill for anyone who builds."}
      />

      <Block title="Read first — the sources that defined this" titleColor="#EF4444">
        {[
          { label: 'Loop Engineering Explained — eesel AI', url: 'https://www.eesel.ai/blog/loop-engineering', isLink: true, note: 'Clearest beginner explainer — shows the prompt → context → loop layers' },
          { label: 'What Is Loop Engineering? — MindStudio', url: 'https://www.mindstudio.ai/blog/what-is-loop-engineering-ai-coding-agents', isLink: true, note: 'How the loop is the real engine behind Claude Code, Devin & Codex' },
          { label: 'Building Effective Agents — Anthropic', url: 'https://www.anthropic.com/research/building-effective-agents', isLink: true, note: 'The foundational agent-loop patterns from Anthropic — must read' },
          { label: 'awesome-loop-engineering — curated corpus (Hugging Face)', url: 'https://huggingface.co/datasets/cy0307/awesome-loop-engineering', isLink: true, note: 'A growing library of real production loops to learn from' },
        ].map((v, i) => <VideoCard key={i} v={v} />)}
      </Block>

      <Block>
        <SubHead label="Where it fits — the four layers of the craft" color={color} />
        <p className="tool-layout-block__para">You asked whether loop engineering is "above prompting" — yes, exactly. The craft of getting good work out of AI has grown in layers, each one built on the one below it. Loop engineering is the top floor.</p>
        <Steps color={color} items={[
          { n: '01', title: 'Prompt engineering — the single call', body: 'Write one good instruction so a single model response is as useful as possible. This is where everyone starts, and it never goes away — every step inside a loop is still a prompt.' },
          { n: '02', title: 'Context engineering — what the model sees', body: 'Curate the whole set of information the model gets each turn: the right files, past steps, retrieved documents (RAG), and nothing that wastes the context window. Optimizes the state, not just the question.' },
          { n: '03', title: 'Harness engineering — the runtime around one run', body: 'The tools the agent can call, its permissions, the sandbox it runs in, and the safety checks around a single agent run. This is the machinery for one execution.' },
          { n: '04', title: 'Loop engineering — the system that repeats', body: 'Design the loop that decides when the agent runs, what "done" means, how it verifies its own work, what it remembers, and when it must stop. It is the governance layer on top of all three below it.' },
        ]} />
        <InfoBox color={color}>The relationship is nested, not competitive. Prompting optimizes one call. Context engineering optimizes what the model sees each turn. Loop engineering optimizes the machinery that decides whether the agent ever reaches a good answer at all. As the community puts it: "If you're not the model, you're the loop — and the loop is where the engineering now lives."</InfoBox>
      </Block>

      <Block>
        <SubHead label="What a loop actually is" color={color} />
        <p className="tool-layout-block__para">An agent loop is a repeating cycle. The model takes an action, gets feedback from the environment, reasons about that feedback, and uses it to choose its next action. It keeps going until a stopping condition is met.</p>
        <div className="tool-example-grid" style={{ '--tool-color': color }}>
          {[
            { part: '1. Act', example: 'Agent calls a tool', why: 'Writes a file, runs a command, searches, calls an API — takes a real action in the world.' },
            { part: '2. Observe', example: 'Read the result', why: 'Test output, error message, command exit code, returned data — fresh evidence of what happened.' },
            { part: '3. Reason', example: 'Decide next move', why: 'Given the new evidence, what should happen next? Fix, retry, move on, or stop?' },
            { part: '4. Repeat', example: 'Loop until done', why: 'Go again — until the goal is verifiably met, or a stop rule is hit.' },
          ].map((item, i) => (
            <div key={i} className="tool-example-card">
              <div className="tool-example-card__title">{item.part}</div>
              <div className="tool-example-card__sample">{item.example}</div>
              <p className="tool-example-card__desc">{item.why}</p>
            </div>
          ))}
        </div>
        <InfoBox color={color}>Concrete example — an AI coding agent fixing a bug: it reads the failing test (observe), edits the code (act), re-runs the tests (act + observe), reads the new result (reason), and repeats until the tests pass. You never told it each individual step — you designed the loop and let it run.</InfoBox>
      </Block>

      <Block>
        <SubHead label="The loop contract — the 6 parts every reliable loop needs" color={color} />
        <p className="tool-layout-block__para">A loop without these parts turns into one of two failures: a manual prompt habit (you babysitting every step) or an unsafe background automation (a runaway agent). A good loop is a contract with all six parts defined up front.</p>
        <Steps color={color} items={[
          { n: '01', title: 'Trigger', body: 'What starts the loop — you pressing run, a schedule (every night), or an event (a new issue, a failing build). Automated triggering is what turns an agent from a tool you drive into a system that runs itself.' },
          { n: '02', title: 'Goal', body: 'One clear, measurable outcome. "Make the checkout page mobile-responsive and all tests pass" — not "improve the app". If you cannot measure it, the loop cannot know when to stop.' },
          { n: '03', title: 'Tools / actions', body: 'The exact set of things the agent is allowed to do — read files, run tests, call an API, edit code. Fewer, well-chosen tools beat a giant pile of them. This is the harness the loop drives.' },
          { n: '04', title: 'Verification', body: 'The single most important lever. A concrete, automatic proof that the work is actually done — a passing test suite, an assertion, a command exit code, a checklist of end-to-end features. The agent must not be able to mark "done" without proving it.' },
          { n: '05', title: 'Memory / state', body: 'What the loop remembers between turns and between runs — what it tried, what worked, where it is in the plan. Without durable state, the agent forgets and repeats its own mistakes.' },
          { n: '06', title: 'Stop rules & guardrails', body: 'When to quit: goal proven, max attempts reached, budget spent, or escalate to a human. Plus safety limits — a sandbox, scoped credentials, and a spend cap so a runaway loop cannot do real damage.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="How it relates to prompting — same tool box, different job" color={color} />
        <p className="tool-layout-block__para">Loop engineering does not replace prompt engineering. They are distinct tools for distinct jobs — and every turn inside a loop is still powered by a prompt. Knowing which one you are doing keeps you from using the wrong fix.</p>
        <Compare color={color} items={[
          { label: 'Prompt engineering', body: 'Optimizes ONE call. You want the best possible single answer — an explanation, a draft, a function. You are in the loop: you read the output and decide the next prompt yourself. Best for: chat, one-off tasks, anything where you want to stay in control turn by turn.' },
          { label: 'Loop engineering', body: 'Optimizes the SYSTEM that makes many calls. You define the goal, the verification, and the stop rule — then let the agent prompt itself repeatedly until it is done. Best for: multi-step work like "build this feature and make the tests pass", where babysitting every step is the bottleneck.' },
        ]} />
        <InfoBox color={color}>Rule of thumb: if you find yourself pasting "now do the next step… now fix that… now run it again" over and over, that repetition IS the loop. Stop hand-prompting each step and design the loop instead — a goal, a verification check, and a stop rule.</InfoBox>
      </Block>

      <Block>
        <SubHead label="Common loop patterns" color={color} />
        <CardGrid color={color} items={[
          { name: 'Plan → Execute → Verify', desc: 'Agent first writes a plan, executes each step, then verifies the result against the goal before finishing. The most common reliable pattern for real tasks.' },
          { name: 'Retry loop', desc: 'Try the action; if the verification fails, feed the error back in and try again — up to a max number of attempts. The backbone of self-correcting coding agents.' },
          { name: 'ReAct (Reason + Act)', desc: 'The agent alternates: reason about what to do, take one action, observe, reason again. The original agent-loop pattern that most frameworks are built on.' },
          { name: 'Reflexion / self-critique', desc: 'After an attempt, the agent critiques its own work ("what went wrong and why"), then retries using that reflection. Improves quality on hard, open-ended tasks.' },
          { name: 'Explore → Narrow', desc: 'Generate several approaches, evaluate them, then commit to the best one. Good when the right path is not obvious up front.' },
          { name: 'Human-in-the-loop', desc: 'The loop runs autonomously but pauses to ask a human before any irreversible or high-stakes action (deleting data, spending money, deploying). Safety by design.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="You already use loop engineering" color={color} />
        <p className="tool-layout-block__para">This is not just theory — it is the operating model behind every serious AI coding tool. When you use these in agent mode, a loop is running under the hood:</p>
        <Compare color={color} items={[
          { label: 'Cursor (agent mode) & Claude Code', body: 'Give it a task and it loops: reads relevant files, edits code, runs your tests or the app, reads the errors, revises, and repeats — often for many turns — until the task works. Its quality comes far more from loop design than from raw model power.' },
          { label: 'Devin, OpenAI Codex agent, autonomous agents', body: 'Handed a goal and a codebase, they run long loops of read → write → run → check → fix, marking work done only when a verification step passes. The whole product IS a well-engineered loop around a model.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="When loops go wrong — the anti-patterns" color="#EF4444" />
        <p className="tool-layout-block__para">Most loop failures trace back to a missing part of the contract. Learn to spot these before you let an agent run on its own.</p>
        <Compare color="#EF4444" items={[
          { label: 'No real verification', body: 'The agent says "done" without proof, so it ships broken work. Fix: attach a concrete check (a passing test, an exit code) the agent cannot fake its way past.' },
          { label: 'Reward hacking', body: 'The agent games the check instead of solving the task — e.g. deleting the failing test so the suite "passes". Fix: verify the outcome, not just a green light, and protect the checks.' },
          { label: 'Runaway loop', body: 'No stop rule or budget, so it burns tokens or money forever. Fix: a max-attempts limit, a spend cap, and a sandbox with scoped credentials.' },
          { label: 'Stale / bloated context', body: 'The loop keeps piling old junk into the context until the model loses the plot. Fix: manage state deliberately — keep what matters, drop what does not.' },
          { label: 'Cognitive surrender', body: 'You stop understanding what the agent did and rubber-stamp its output. Fix: keep verification human-readable and review the diff — you own the result.' },
        ]} />
      </Block>

      <Block title="Copy-ready prompts — start designing loops" titleColor={CYAN}>
        <PromptBlockList prompts={prompts} accentColor={CYAN} />
      </Block>

      <Block title="What you can do after learning this" titleColor={color}>
        <CanDoList items={[
          'Recognize when to stop hand-prompting step by step and design a loop instead',
          'Write a clear loop specification — trigger, goal, tools, verification, memory, stop rule',
          'Add real verification so an AI agent proves its work instead of just claiming "done"',
          'Get far more out of Cursor agent mode and Claude Code by giving them good goals and checks',
          'Diagnose a stuck or runaway agent by finding the missing part of the loop contract',
          'Build simple self-correcting loops — test, fix, re-test — for your own projects',
        ]} />
      </Block>

      <ProjectTask
        title={"Build your first self-correcting loop"}
        description={"Take a small coding project with a test suite (or add one). Instead of fixing failures yourself, design a loop and let an AI coding agent run it: fix failing tests until they all pass. The point is to practice writing the loop contract — goal, verification, and stop rule — not to write the code yourself."}
        costNote={"TOTAL COST: ₹0 — Cursor free tier or Claude Code free tier + a project you already have"}
      >
        <Steps color={color} items={[
          { n: '1', title: 'Pick a project with tests', body: 'Any small repo. If it has no tests, ask the AI to write 3–5 tests for one feature first — that becomes your verification.' },
          { n: '2', title: 'Write the loop spec', body: 'Goal: "all tests pass". Verification: your test command (npm test / pytest). Stop rule: max 5 attempts, then stop and explain. Tools: read files, edit code, run tests.' },
          { n: '3', title: 'Break something on purpose', body: 'Introduce 2–3 real bugs so tests fail. This gives the loop something to actually solve.' },
          { n: '4', title: 'Hand it the loop, not steps', body: 'In Cursor/Claude Code agent mode, give it the spec once: "Run the tests, fix failures, re-run, repeat until green or 5 tries." Do not prompt each step.' },
          { n: '5', title: 'Review the loop, not just the code', body: 'Did it verify properly? Did it stop correctly? Did it try to cheat the check? Note which part of the contract worked and which you would tighten.' },
        ]} />
      </ProjectTask>

      <ProTip>
        The fastest way to level up: every time you catch yourself typing "okay now do the next thing… now fix that… try again" to an AI, pause. That repetition is a loop you are running by hand. Write down the goal, the check that proves it is done, and when to stop — then hand that to the agent once. You will get more done and understand exactly why it worked or failed.
      </ProTip>

      <PageNavRow
        prev={{ path: '/ai-lab/foundations/prompt-eng', label: 'Prompt Engineering' }}
        next={{ path: '/ai-lab/foundations/rag', label: 'RAG' }}
      />
    </ToolPageShell>
  )
}
