import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F59E0B'

export default function CursorPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Coding">
      <ToolHeader
        icon="⚡"
        title="Cursor — The AI-First Code Editor"
        tagline="VS Code rebuilt with codebase-aware AI at every level"
        badges={[['✓ FREE TIER', '#4ADE80'], ['2 weeks Pro free', color], ['Best-in-class AI editor', 'var(--text-muted)']]}
        overview={"Cursor is a fork of VS Code — it looks identical, supports all VS Code extensions, and has the same keyboard shortcuts. The difference is that every feature in Cursor is built around AI from the start. Where Copilot is an extension added to VS Code, Cursor is a code editor redesigned with AI as a first-class citizen. The most important capability: Cursor indexes your entire codebase and understands it. When you ask a question or request a change, Cursor knows about every file, every function, and every import in your project — not just the file you have open. This codebase-level context is what makes Cursor significantly more powerful than Copilot for real project work. It is free to start, with 2 weeks of the Pro tier included, and the free tier with limited AI calls is enough to experience what it does."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Cursor AI Tutorial For Beginners — Latest 2025 Edition', url: 'https://www.youtube.com/watch?v=kbfdFlqzjcs', dur: '~20 min', note: 'Chat, Agents, Cursor Rules, MCP servers — complete walkthrough' },
            { label: 'How To Use Cursor AI — Full Tutorial For Beginners 2025', url: 'https://www.youtube.com/watch?v=cE84Q5IRR6U', dur: '~20 min', note: 'Composer, codebase indexing, and inline edits explained' },
            { label: 'Cursor 2.0: Composer and New UX in 12 Minutes', url: 'https://www.youtube.com/watch?v=GS0mtpDiX08', dur: '12 min', note: 'Composer multi-file editing deep dive — the flagship feature' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why Cursor is different" color={color} />
          <InfoBox color={color}>{"Cursor's defining feature is @codebase context. When you use @codebase in a prompt, Cursor embeds every file in your project, indexes the embeddings, and retrieves the most relevant code context for your question. It knows your full project architecture — not just the open file. This is the same RAG architecture used in enterprise AI systems, built into the editor."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The practical difference shows up immediately on real projects. With GitHub Copilot: you open 5 related files, give context manually, get a suggestion that misses how your auth middleware works. With Cursor: you type "add rate limiting to all API endpoints" and it knows your project's endpoint structure, your middleware pattern, and your configuration setup — because it indexed your whole project. For greenfield projects and larger codebases, this context difference is enormous.</p>
        </Block>
        <Block>
          <SubHead label="Core Cursor features" color={color} />
          <CardGrid color={color} items={[
            { name: 'Composer (Cmd+I)', desc: "The flagship feature. Describe a change in natural language. Cursor reads your full codebase, generates a multi-file diff, and shows every change before applying. Press Accept to apply all at once." },
            { name: 'Chat with @codebase', desc: "Cmd+L opens a chat panel. @codebase tells Cursor to search your full project. Ask 'Where is the user authentication logic?' and it finds and explains the relevant code." },
            { name: 'Inline edit (Cmd+K)', desc: 'Select code → Cmd+K → describe the change. Cursor modifies that specific block. Faster than copy-paste-chat-copy-back for targeted edits.' },
            { name: 'Tab autocomplete', desc: "Same as Copilot's inline autocomplete but with full codebase context. Suggestions are aware of your project's patterns, not just the current file." },
            { name: '@-mentions for context', desc: '@file, @folder, @docs, @web, @codebase — precisely control what context Cursor reads for each request. Reference specific files or pull in documentation.' },
            { name: 'Cursor Rules', desc: 'A .cursorrules file in your project root defines persistent instructions — coding style, patterns to follow, architecture rules. Every AI interaction follows these rules automatically.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="The Composer workflow" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Open Composer (Cmd+I / Ctrl+I)', body: "This is Cursor's most powerful feature. Press Ctrl+I (Windows/Linux) or Cmd+I (Mac) to open the Composer panel." },
            { n: '2', title: 'Describe the full change', body: "Write what you want: 'Add JWT authentication to the Express app. Create a middleware function that validates tokens and attach the user to req.user. Protect all /api routes.' Be specific about what you want." },
            { n: '3', title: 'Review the diff', body: 'Cursor generates a multi-file diff showing every change it proposes. Review each file carefully. You see exactly what it wants to change before anything is applied.' },
            { n: '4', title: 'Accept, reject, or iterate', body: "Accept all changes, reject specific files, or follow up: 'The middleware looks right but use environment variables for the JWT secret instead of hardcoding'. Cursor adjusts." },
            { n: '5', title: 'Use @codebase for questions', body: "Before making changes to an unfamiliar part of the codebase, ask @codebase questions first: '@codebase How is error handling done in this project currently?' Then make your change consistent with existing patterns." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Cursor vs GitHub Copilot" color={color} />
          <Compare color={color} items={[
            { label: 'Codebase understanding', badge: 'Cursor wins clearly', body: "Cursor indexes your entire project. Copilot sees only open files. For any project larger than a single file, Cursor's contextual awareness produces dramatically more relevant suggestions and changes." },
            { label: 'Multi-file changes', badge: 'Cursor wins', body: 'Cursor Composer applies changes across multiple files in one operation with a reviewable diff. Copilot edits one file at a time and requires you to manually apply changes to each file.' },
            { label: 'Cost', badge: 'Copilot wins for students', body: 'Copilot is completely free for students (GitHub Education Pack). Cursor free tier has limited AI calls (200 completions/month, 50 premium requests). For unlimited use, Cursor Pro is $20/month. Students on a budget: Copilot free, Cursor as a secondary tool.' },
            { label: 'Familiarity', badge: 'Equal (VS Code base)', body: 'Both work in/as VS Code. Same extensions, same keyboard shortcuts, same interface. Switching from Copilot to Cursor requires zero relearning of the editor itself.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Setting up Cursor Rules" color={color} />
          <InfoBox color={color}>{'Cursor Rules is one of the most powerful features for consistent, high-quality output. Without rules, every new conversation starts with no context about how your project should be written. With a .cursorrules file, every interaction follows your defined standards automatically.'}</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Create .cursorrules in project root', body: 'Add a file called .cursorrules to the root of your project. This is a plain text file with instructions for how Cursor should write code for this project.' },
            { n: '2', title: 'Define your standards', body: "Include: language version, framework conventions, naming conventions, error handling pattern, testing approach. Example: 'Use async/await not callbacks. Use TypeScript strict mode. All functions must have JSDoc comments. Errors go through the central ErrorHandler class.'" },
            { n: '3', title: 'Commit it to your repository', body: 'Commit .cursorrules to git. Now everyone on the project benefits from consistent AI assistance that follows your team\'s actual standards — not generic defaults.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Make multi-file changes to a codebase by describing them in plain English, with full diff review before applying',
            'Ask questions about any part of your project and get answers that reference your actual code',
            'Set persistent coding standards in .cursorrules so every AI suggestion follows your project\'s conventions',
            'Refactor, debug, and add features to real projects with context-aware AI that knows your architecture',
            'Switch from VS Code to Cursor with zero learning curve — same interface, same extensions',
        ]} />
      </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span>
            <span className="tool-layout-task__label">PROJECT — Refactor a Real Project</span>
          </div>
          <p className="tool-layout-task__desc">Take any project you have (even a small one from class). Open it in Cursor. First, ask @codebase to explain the overall structure. Then use Composer to: (1) add proper input validation to all user-facing functions, (2) add consistent error handling following the pattern already in the codebase, (3) generate unit tests for the core functions. Review every diff before accepting. This exercise shows the full Cursor workflow on real code.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Open your project in Cursor', body: 'Download Cursor from cursor.sh. Open an existing project folder. Let it index (shown in bottom bar). Sign in to activate the 2-week Pro trial.' },
            { n: '2', title: 'Understand the codebase', body: "Cmd+L → Chat → '@codebase explain the overall structure of this project, what each main file does, and how the components relate to each other'. Read the response." },
            { n: '3', title: 'Add validation with Composer', body: "Cmd+I → 'Add input validation to all functions that accept user-provided data. Use [your framework's validation library] and throw descriptive errors on invalid input.' Review the diff." },
            { n: '4', title: 'Generate tests', body: "Cmd+I → 'Generate unit tests for all core business logic functions. Use [Jest/PyTest/JUnit]. Include tests for both happy path and error cases.' Review and apply." },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — 2-week Pro trial included on signup at cursor.sh</span></div>
        </div>
        <ProTip>
        Write a .cursorrules file for every project you start. Even 10 lines of standards (language, naming conventions, error handling pattern, testing framework) saves hours of correcting AI suggestions that follow the wrong conventions. Treat it like a README for the AI — the clearer your rules, the more useful every Cursor interaction becomes.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/coding/copilot', label: 'GitHub Copilot' }}
        next={{ path: '/ai-lab/coding/windsurf', label: 'Windsurf' }}
      />
    </ToolPageShell>
  )
}
