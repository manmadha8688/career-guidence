import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#10B981'

export default function ClinePage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Coding">
      <ToolHeader
        icon="🔧"
        title="Cline — Free Open-Source AI Agent in VS Code"
        tagline="Like Claude Code but inside VS Code — bring your own API key, any model"
        badges={[['✓ FREE Extension', '#4ADE80'], ['cline.bot', color], ['Open Source', 'var(--text-muted)']]}
        overview={"Cline started as \"Claude Dev\" — a VS Code extension built by a developer to bring Claude's agentic capabilities directly into the editor. It quickly became one of the most popular AI coding tools on the VS Code Marketplace, now with 5M+ installs and 61k+ GitHub stars. The core idea is simple but powerful: unlike GitHub Copilot (which suggests code) or Cursor (which requires a subscription), Cline is a completely free open-source extension where you bring your own API key from any provider you choose. The extension itself costs nothing — you pay only for the AI calls you make, and you can use free-tier APIs (Gemini, Groq) or local models via Ollama to keep costs at zero. Cline reads your entire codebase, edits files, runs terminal commands, and can even control a browser — all inside VS Code, with your approval at each step."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'How to Use Cline Code in VS Code: Beginner\'s Guide 2025', url: 'https://www.youtube.com/watch?v=7-cc7qAmDeo', dur: '~15 min', note: 'Full walkthrough — install, configure API key, first agentic task' },
            { label: 'Getting Started with Cline — The Best VS Code AI Plugin', url: 'https://www.youtube.com/watch?v=f33Fw6NiPpw', dur: '~18 min', note: 'Plan mode, Act mode, MCP servers, and Ollama local setup' },
            { label: 'Cline with Claude API — Build a Full App from Scratch', url: 'https://www.youtube.com/watch?v=KjqQC4AnJ1I', dur: '~20 min', note: 'Real project build using Plan/Act workflow and checkpoint rollbacks' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="The BYOK model — why it matters" color={color} />
          <InfoBox color={color}>{"BYOK = Bring Your Own API Key. Cline the extension is 100% free and open source. You connect it to whichever AI provider you want — Anthropic, OpenAI, Google Gemini, Groq, or a local Ollama model. You pay the provider directly at their standard API rates. The key insight: with free-tier APIs (Gemini Flash via Google AI Studio, or Groq's free tier), your total cost for using Cline can be exactly $0."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>This matters because most AI coding tools lock you into their subscription or their chosen model. Cursor at $20/month uses whatever model Cursor picks. GitHub Copilot uses whatever Microsoft deploys. Cline inverts this: you choose the model, you control costs, and you can switch providers anytime. When Anthropic releases a better Claude model, you just update the model name in Cline's settings — no waiting for the tool vendor to update. When Google releases a new Gemini Flash with better free limits, you switch to that. This flexibility is why developers who care about cost control and model choice consistently prefer Cline over subscription tools.</p>
        </Block>
        <Block>
          <SubHead label="Key features" color={color} />
          <CardGrid color={color} items={[
            { name: 'Full Agentic Loop', desc: 'Cline reads your entire codebase, creates and edits files, runs terminal commands, and drives a browser via Puppeteer. It acts like an autonomous developer — not just a suggestion engine.' },
            { name: 'Plan / Act Mode', desc: 'Switch to Plan mode: Cline devises a full implementation plan for review before touching any code. Switch to Act mode: it executes step-by-step with your approval at each file edit and terminal command.' },
            { name: 'Checkpoint System', desc: 'Every action creates a checkpoint — granular snapshots of your project state. If Cline goes in the wrong direction, one click rolls back to any previous checkpoint. Experiment freely with a safety net.' },
            { name: 'Multi-Model Support', desc: 'Claude Sonnet 5 / Opus 4.8, GPT-5.5, Gemini 3.5 Flash, DeepSeek, Llama via Groq, any OpenAI-compatible endpoint, and local models via Ollama or LM Studio. One extension, every model.' },
            { name: 'MCP Server Support', desc: 'Cline has a built-in MCP Marketplace. Connect databases, CI/CD pipelines, cloud monitoring, web fetching, and hundreds of third-party APIs as tools Cline can use inside your workflow.' },
            { name: 'Approval-First Design', desc: 'Cline never acts without showing you what it wants to do. Every file edit, terminal command, and browser action is shown and requires your approval before execution — you stay in control.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Plan mode vs Act mode" color={color} />
          <InfoBox color={color}>{"Plan/Act is Cline's most important workflow feature. In Plan mode, Cline thinks and outlines — it reads your codebase and produces a step-by-step implementation plan without touching any files. You review and refine the plan. Then you switch to Act mode and Cline executes. This separation prevents the most common agentic failure: an AI that immediately starts making changes based on misunderstood requirements."}</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Switch to Plan mode', body: "Click the Plan/Act toggle in the Cline sidebar to enter Plan mode. Now Cline reads your codebase and thinks — it won't touch any files yet. Describe what you want to build or change." },
            { n: '2', title: 'Review the plan', body: 'Cline produces a structured implementation plan: what files it will create, what functions it will modify, what the overall approach is. Read it carefully. Push back on anything that looks wrong.' },
            { n: '3', title: 'Refine before acting', body: "In Plan mode you can ask follow-up questions: 'Why are you using approach X instead of Y?' or 'The auth module is actually in /lib/auth, not /utils.' Cline adjusts the plan. No code changed yet." },
            { n: '4', title: 'Switch to Act mode', body: 'Once the plan looks right, toggle to Act mode. Cline executes step-by-step, showing you each file edit and terminal command before running it. Approve each action or reject and redirect.' },
            { n: '5', title: 'Checkpoints auto-save', body: 'Every approved action creates a checkpoint. If something goes wrong three steps later, you can roll back to any earlier checkpoint instantly. This makes it safe to let Cline make sweeping changes.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Model options — free vs paid" color={color} />
          <Compare color={color} items={[
            { label: 'Gemini 3.5 Flash (Google AI Studio)', badge: 'Free tier available', body: 'Get a free API key from aistudio.google.com — no billing required. Gemini 3.5 Flash is fast and capable. Free tier has rate limits (requests per minute) but is enough for learning projects. Best genuinely free option for most students.' },
            { label: 'Groq API (free tier)', badge: 'Free — ultra fast', body: 'Groq offers a free tier running Llama 4, Llama 3.3 70B, Qwen3-32B, and others on custom LPU hardware at 700+ tokens/second. Free tier: 30 req/min, 14,400/day. Excellent for fast iteration when you don\'t need frontier models.' },
            { label: 'Ollama (local models)', badge: '100% free — offline', body: 'Run models locally — no API key, no rate limits, no usage costs. Requires decent hardware: 8B models need ~8GB RAM/VRAM, 32B models need ~20GB. Works offline. Best for privacy and zero-cost unlimited usage if you have the hardware.' },
            { label: 'Claude API (Anthropic)', badge: 'Best quality — paid', body: 'Claude Sonnet 5 / Opus 4.8 is what Cline was originally built for and where it performs best. Pay-as-you-go: roughly $3/M input tokens, $15/M output. For a typical coding session: $0.10–$0.50. Worth it for serious projects.' },
            { label: 'OpenRouter', badge: 'Pay-per-use — flexible', body: 'OpenRouter is an API gateway that routes to 200+ models from one key and one bill. Pay only for what you use. Good option if you want to compare models or access models not available via direct APIs.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Cline vs Cursor vs Claude Code" color={color} />
          <Compare color={color} items={[
            { label: 'Cost model', badge: 'Cline is cheapest to start', body: 'Cline: free extension + your API costs (can be $0 with free tiers). Cursor: free tier with limits, then $20/month Pro. Claude Code: free CLI + Anthropic API costs. Cline gives you the most control over spending.' },
            { label: 'Where it lives', badge: 'Different environments', body: 'Cline: VS Code sidebar — GUI, file explorer, everything familiar. Claude Code: terminal only — powerful but CLI-native. Cursor: a full fork of VS Code — you leave VS Code and use Cursor as your editor.' },
            { label: 'Model flexibility', badge: 'Cline wins clearly', body: 'Cline: any model, any provider, switch anytime. Cursor: uses its own model routing (you can pick Claude/GPT but through Cursor\'s system). Claude Code: Anthropic models only. Cline is the most model-agnostic option.' },
            { label: 'MCP support', badge: 'Cline built it in from scratch', body: 'Cline has a built-in MCP Marketplace and MCP is architectural — every tool call goes through the MCP interface. Cursor added MCP later as an add-on. Claude Code supports MCP natively. Cline and Claude Code are stronger here.' },
            { label: 'Best for', badge: 'Different use cases', body: 'Cline: students and developers who want max flexibility and zero subscription costs while staying in VS Code. Cursor: teams and professionals who want the best GUI AI editor and don\'t mind paying. Claude Code: power users and production work on the command line.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="MCP servers — extending what Cline can do" color={color} />
          <InfoBox color={color}>{"MCP (Model Context Protocol) is an open standard for giving AI tools access to external capabilities. In Cline, MCP servers are plugins that let Cline interact with databases, fetch web pages, call APIs, run cloud commands, and more — beyond just reading and editing files."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Cline launched its MCP Marketplace in early 2025. You can browse and install pre-configured MCP servers for common tools. Once installed, Cline can use those capabilities as part of its agentic loop — for example, a Postgres MCP server lets Cline query your database directly, inspect schema, and generate migrations based on real data.</p>
          {[
            'Fetch MCP — lets Cline read web pages and documentation as context when writing code',
            'Database MCP servers — connect Cline to Postgres, SQLite, or MongoDB to query and modify data',
            'GitHub MCP — lets Cline create issues, PRs, and read repository data from within the editor',
            'File system MCP — extended file operations beyond the project folder',
            'Custom MCP — write your own MCP server in Python or TypeScript to expose any internal tool or API to Cline',
          ].map((item, i) => (
            <div key={i} className="tool-layout-cando-item">
              <div className="tool-layout-cando-item__dot" />
              <span className="tool-layout-cando-item__text">{item}</span>
            </div>
          ))}
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Build Something Real with Cline</span></div>
          <p className="tool-layout-task__desc">Use Cline with a free API key (Gemini AI Studio or Groq) to build a small full-stack feature from scratch. Use Plan mode first — describe what you want, review Cline's plan, refine it before acting. Then watch it build step by step with your approval at each action. This teaches you the agentic AI workflow used by professional developers in 2025.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Install and configure Cline', body: 'Open VS Code → Extensions → search "Cline" → install. Click the Cline icon in the sidebar. Get a free Gemini API key from aistudio.google.com (no billing needed). In Cline settings: select Google Gemini as provider, paste your key, choose gemini-3.5-flash.' },
            { n: '2', title: 'Open or create a project', body: "Open a project folder in VS Code (even a simple one). Cline reads your project structure automatically. If starting fresh: create an empty folder, open it in VS Code, and Cline will help you scaffold everything from nothing." },
            { n: '3', title: 'Use Plan mode first', body: "Toggle to Plan mode. Type: 'I want to build a simple REST API with Express that has user registration and login with JWT tokens. Plan the implementation.' Read Cline's plan carefully before switching to Act." },
            { n: '4', title: 'Execute with approval', body: 'Switch to Act mode. Cline will create files one by one, showing you each change. Approve file creations, terminal installs, and code edits as they come. Watch it build the full feature step by step.' },
            { n: '5', title: 'Try a checkpoint rollback', body: "Intentionally tell Cline to do something that goes in the wrong direction, then roll back using the checkpoint system. This teaches you how to safely experiment with AI-generated changes without fear of breaking your project." },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — Extension free, use Gemini AI Studio free tier or Groq free tier for $0 API costs</span></div>
        </div>
        <ProTip>
        Always use Plan mode for any non-trivial task. The most common mistake with agentic AI tools is jumping straight to Act mode on a complex change. Spending 2 minutes reviewing Cline's plan catches 80% of direction errors before a single file is touched. Treat Plan mode like a whiteboard session — get the architecture right first, then let it build. And always read the full plan, not just the first step.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/coding/amazon-q', label: 'Amazon Q' }}
        next={{ path: '/ai-lab/coding/codeium', label: 'Codeium' }}
      />
    </ToolPageShell>
  )
}
