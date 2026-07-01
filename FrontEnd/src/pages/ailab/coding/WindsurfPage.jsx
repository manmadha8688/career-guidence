import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F59E0B'

export default function WindsurfPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Coding Tools">
      <ToolHeader
        icon="🌊"
        title="Windsurf — The Agentic AI Code Editor"
        tagline="Codeium's editor that executes multi-step tasks autonomously"
        badges={[['✓ FREE TIER', '#4ADE80'], ['Generous free plan', color], ['Codeium', 'var(--text-muted)']]}
        overview={"Windsurf is Codeium's answer to Cursor — a full VS Code fork rebuilt for AI-first development. What makes Windsurf distinct is its \"Cascade\" feature: an agentic AI mode that doesn't just suggest code or answer questions, but executes multi-step tasks end to end. Tell Cascade to \"build a REST API with authentication, connect it to a PostgreSQL database, and write integration tests\" — it plans the steps, writes the code, runs commands in the terminal, fixes errors it encounters, and works through the task largely autonomously. For students who want to learn by watching an AI build something complete — and understand every step — Windsurf's transparent execution approach is uniquely valuable. The free tier is among the most generous of any AI coding editor."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Windsurf Tutorial for Beginners — Better than Cursor?? — Tech with Tim', url: 'https://www.youtube.com/watch?v=8TcWGk1DJVs', dur: '~20 min', note: 'Best beginner guide — Cascade, Chat, Write mode all covered' },
            { label: 'Windsurf AI Tutorial: Building Apps with Cascade', url: 'https://www.youtube.com/watch?v=DXazEf7ZmGs', dur: '~15 min', note: 'Build a real app using Cascade — agentic AI in action' },
            { label: 'Windsurf Cascade — AI Coding Tool Easy Enough for Beginners', url: 'https://www.youtube.com/watch?v=RptkOLELyas', dur: '~12 min', note: 'Cascade deep dive — how the agent loop actually works' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What makes Windsurf different" color={color} />
          <InfoBox color={color}>Windsurf's Cascade operates as a coding agent — it maintains a mental model of your codebase, plans sequences of actions, executes them, observes the results (including terminal output and errors), and adjusts. Unlike autocomplete or chat, Cascade acts in a loop: plan → execute → observe → continue, the same cycle that defines agentic AI systems.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The practical difference between Windsurf Cascade and Cursor Composer is autonomy. Cursor generates a diff and waits for you to approve each step. Cascade can run terminal commands, read file outputs, fix errors it caused, and continue working toward the goal with less manual intervention. For learning, Windsurf's action log shows every step it takes — making it transparent about what an AI agent actually does, not just what code it produces.</p>
        </Block>
        <Block>
          <SubHead label="Cascade vs traditional AI coding assistance" color={color} />
          <Compare color={color} items={[
            { label: 'Traditional autocomplete (Copilot)', badge: 'Reactive', body: 'You type, it suggests the next line or block. You accept or reject. The AI is a fast typist responding to your immediate context. Best for familiar patterns you could write yourself — just faster.' },
            { label: 'Chat + diff (Cursor Composer)', badge: 'Collaborative', body: 'You describe a change, it generates a full multi-file diff, you review and apply. More powerful than autocomplete for larger changes. Still requires you to review and apply every change.' },
            { label: 'Agentic execution (Windsurf Cascade)', badge: 'Autonomous', body: 'You describe a goal, Cascade works toward it through multiple steps, running commands, fixing errors, writing code iteratively. Best for complex multi-step tasks. Requires less manual intervention but more careful goal description upfront.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Core features" color={color} />
          <CardGrid color={color} items={[
            { name: 'Cascade (agentic mode)', desc: 'The headline feature. Describe a goal and Cascade executes it step by step — writing code, running terminal commands, reading outputs, fixing errors. Works toward the full goal autonomously.' },
            { name: 'Inline AI (Cmd+I)', desc: "Select code and describe an edit. Same as Cursor's inline edit. Fast for targeted modifications to specific blocks." },
            { name: 'AI Chat panel', desc: 'Context-aware chat with your codebase. Ask questions, request explanations, understand architecture. Full codebase indexing like Cursor.' },
            { name: 'Tab autocomplete', desc: "Free autocomplete powered by Codeium's model (same technology as the Codeium extension). Available on the free tier with no usage limits." },
            { name: 'Action log', desc: 'Every Cascade action is logged — file reads, writes, terminal commands, outputs. You can see exactly what the agent did and why, making it a learning tool as much as a productivity tool.' },
            { name: 'Model selection', desc: "Choose between Claude 3.5 Sonnet, GPT-4o, and Codeium's own models per conversation. Different models have different strengths for different types of coding tasks." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Using Cascade effectively" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Write specific goal descriptions', body: 'Vague: "build a user system". Specific: "Create a user authentication system in Python Flask with: registration endpoint, login endpoint returning JWT, a protected /profile route, and passwords stored as bcrypt hashes in SQLite." The more specific, the more aligned the result.' },
            { n: '2', title: 'Let it run, then review', body: "Cascade will execute multiple steps automatically. Resist the urge to interrupt constantly. Let it complete its plan, then review the action log and the resulting code together." },
            { n: '3', title: 'Review the action log', body: 'After Cascade completes a task, read through the action log step by step. This is how you learn what the agent did — understanding the execution trace is as valuable as the code output.' },
            { n: '4', title: 'Iterate on the result', body: "Cascade's first pass is rarely perfect. Follow up: \"The authentication works but add refresh token support and proper error messages for invalid credentials.\" Cascade reads its previous work and extends it." },
            { n: '5', title: 'Use it to learn unfamiliar tech', body: 'Pick a technology you want to learn. Ask Cascade to build a small working example. Read the code, the action log, and ask follow-up questions. Seeing a complete working implementation with your project\'s context is better than most tutorials.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Free tier comparison" color={color} />
          <Compare color={color} items={[
            { label: 'Windsurf free tier', badge: 'Most generous', body: "Free plan includes: unlimited Codeium tab autocomplete, 25 Cascade agent uses per month, 5 premium AI model uses per month. The autocomplete alone (unlimited) is comparable to Copilot's paid tier. Best free option for daily use." },
            { label: 'Cursor free tier', badge: 'Limited AI calls', body: 'Free plan includes: 200 completions and 50 premium model uses per month. After 2 weeks Pro trial. More restrictive than Windsurf on the free tier for high-volume use.' },
            { label: 'Copilot free tier', badge: 'Free for students', body: 'Free for verified students via GitHub Education Pack. Unlimited completions and chat. Best free unlimited option if you qualify for the student pack.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Describe a complete feature and let Windsurf Cascade execute it step by step including terminal commands',
            "Learn how AI agents work by reading Cascade's action log — see exactly what steps it planned and executed",
            "Use the free tier's unlimited tab autocomplete daily without worrying about usage limits",
            'Build complete working examples of technologies you want to learn by prompting Cascade to construct them',
            'Compare different AI models (Claude, GPT-4o, Codeium) for different coding task types',
        ]} />
      </Block>
        <ProjectTask
        title={"Give Cascade a Complete Task"}
        description={"Pick something you want to build: a web scraper, a CLI tool, a REST API, a data processing script. Write a detailed specification (5-8 sentences covering what it does, what technologies to use, what the inputs/outputs are, and any constraints). Give this to Cascade in one prompt. Watch it execute. Read the action log. After it finishes, read every file it created. The goal is not just to have the thing built — it is to understand every decision Cascade made and why."}
        costNote={"TOTAL COST: ₹0 — Windsurf free tier, generous Cascade uses included"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Write a detailed spec', body: 'Define your task clearly: what it does, tech stack (Python/JS/etc.), inputs, outputs, any constraints. 5-8 sentences is the right length for a well-scoped Cascade task.' },
            { n: '2', title: 'Start a Cascade session', body: 'Click the Cascade icon (or Ctrl+L). Paste your spec. Press enter and let Cascade work. Do not interrupt until it pauses or completes.' },
            { n: '3', title: 'Read the action log', body: 'Open the action log. Read every step: what files it read, what commands it ran, what outputs it saw, how it handled errors. Map each action to a decision.' },
            { n: '4', title: 'Run and test the result', body: 'Run the code Cascade produced. Does it work? If not, use the error as a follow-up prompt. If yes, identify 2-3 things you would improve — and ask Cascade to make those improvements.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Windsurf's action log is a free AI programming tutorial. After every Cascade session, spend 5 minutes reading exactly what it did. When it ran a terminal command you don't recognize, look it up. When it structured a file in an unexpected way, understand why. The difference between using Cascade as a black box and using it as a learning tool is this 5 minutes of post-task review.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/coding/cursor', label: 'Cursor' }}
        next={{ path: '/ai-lab/coding/codeium', label: 'Codeium' }}
      />
    </ToolPageShell>
  )
}
