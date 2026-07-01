import { InfoBox, Steps, Compare, SubHead, CardGrid, Highlight } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#8B5CF6'

export default function ContinueDevPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Coding">
      <ToolHeader
        icon="🔄"
        title="Continue.dev — Open-Source Copilot for VS Code and JetBrains"
        tagline="The free self-hosted AI coding assistant — any model, any IDE"
        badges={[['✓ 100% FREE', '#4ADE80'], ['continue.dev', color], ['Open Source', 'var(--text-muted)']]}
        overview={"Continue.dev is the leading open-source AI coding assistant — a free VS Code extension and JetBrains plugin that gives you GitHub Copilot-style features without any subscription. The key difference is that Continue does not lock you into one AI provider. You bring your own model: connect it to Claude, GPT-4o, Gemini, or run a completely local model through Ollama for free, offline coding with zero data leaving your machine. Unlike Cursor or Windsurf, which are standalone editors you must migrate to, Continue installs into your existing VS Code or JetBrains IDE (IntelliJ IDEA, PyCharm, WebStorm) in minutes. For Java developers, Android developers, and Python students using PyCharm, this is especially important — Continue is one of the few AI assistants that works natively inside JetBrains without requiring you to abandon your IDE. Version 1.0 launched in early 2025 alongside a $3 million funding round, bringing total funding to $5.1 million."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Install Continue AI in VS Code: Setup Guide', url: 'https://www.youtube.com/watch?v=C1g4_YQJEg8', dur: '2026', note: 'Full installation walkthrough — VS Code extension setup from scratch' },
            { label: 'VS Code with FREE Local AI — GitHub Copilot vs Continue.dev REVIEW & Setup', url: 'https://www.youtube.com/watch?v=18niVtczoUs', dur: '2025', note: 'Side-by-side comparison plus how to configure local models with Ollama' },
            { label: 'Continue.dev vs. Cline: The Best Coding Assistant for VSCode?', url: 'https://www.youtube.com/watch?v=u70zctCPaLc', dur: 'YouTube', note: 'Understand when to use Continue vs Cline — complementary tools explained' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why Continue.dev exists" color={color} />
          <InfoBox color={color}>GitHub Copilot costs $10/month. Cursor costs $20/month. Both lock you into their model choices. Continue.dev was built to answer one question: what if AI coding assistance were a utility — free, open, and model-agnostic — the same way VS Code is free and language-agnostic? The result is an Apache 2.0 licensed project where you own the configuration and pay only the API provider you choose (or nothing at all if you use Ollama locally).</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>Continue launched in 2023 and reached version 1.0 in February 2025. It is maintained by a venture-backed company (Continue.dev Inc.) but the extension itself remains permanently open source. The business model is enterprise teams paying for Continue Hub features — individual developers get the full tool free, indefinitely. This is the same model as VS Code, Ollama, and most developer infrastructure: free for individuals, paid for enterprise.</p>
        </Block>
        <Block>
          <SubHead label="Four core interaction modes" color={color} />
          <CardGrid color={color} items={[
            { name: 'Tab Autocomplete', desc: 'Ghost text suggestions as you type — press Tab to accept. Configure a fast local model (Qwen2.5-Coder 1.5B via Ollama) for sub-100ms latency. Works identically to Copilot autocomplete.' },
            { name: 'Chat Panel (Cmd+L)', desc: 'Open a chat sidebar with Cmd/Ctrl+L. Highlight code and ask questions, request refactoring, or generate tests. The chat is context-aware: it sees your open files and indexed codebase.' },
            { name: 'Inline Edit (Cmd+I)', desc: 'Select any block of code, press Cmd/Ctrl+I, describe the change in natural language. Continue generates a diff inline — you see exactly what changed and can Accept or Reject.' },
            { name: 'Agent Mode', desc: 'Autonomous multi-file edits and terminal command execution for complex tasks. Like Claude Code but running inside your IDE. Available in v1.0+ with MCP server support.' },
            { name: 'Codebase Indexing', desc: 'Continue indexes your entire project and stores embeddings locally. Use @codebase in chat to ask questions about any part of your repo — finds relevant files automatically.' },
            { name: 'Context Providers', desc: '@file, @codebase, @docs, @terminal, @git, @web — prefix any chat message to inject specific context. @git adds recent diffs. @docs fetches framework documentation into the prompt.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Configuring your models" color={color} />
          <InfoBox color={color}>Continue uses a config.yaml file (migrated from JSON in v1.0). You assign different models to different roles: a fast 1.5B local model for autocomplete, a powerful cloud model for chat. This lets you get fast completions for free while reserving expensive API calls for complex questions.</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Install the extension', body: "VS Code: search 'Continue' in the Extensions panel (Ctrl+Shift+X) — look for the purple icon by Continue.dev. JetBrains: Settings → Plugins → Marketplace → search 'Continue'. Install and restart." },
            { n: '2', title: 'Open the config.yaml', body: "Click the gear icon in the Continue sidebar, or open ~/.continue/config.yaml directly. This is your master configuration file. The v1.0 format uses YAML with models, rules, and tools sections." },
            { n: '3', title: 'Add a cloud model for chat', body: "Under models, add your API provider. For Claude: provider: anthropic, model: claude-sonnet-4-5, apiKey: your-key. For GPT-4o: provider: openai, model: gpt-4o. For Gemini (free): provider: gemini, model: gemini-2.5-flash." },
            { n: '4', title: 'Add a local model for autocomplete (optional, free)', body: "Install Ollama from ollama.com. Run: ollama pull qwen2.5-coder:1.5b (fast, small). In config.yaml set autocomplete model to provider: ollama, model: qwen2.5-coder:1.5b. Now completions are free and private." },
            { n: '5', title: 'Test it', body: "Open any code file — ghost text should appear within 1-2 seconds. Press Cmd/Ctrl+L to open chat. Type @file to reference a specific file. Everything works inside your existing IDE." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Supported model providers" color={color} />
          <CardGrid color={color} items={[
            { name: 'Ollama (local, free)', desc: 'Run models entirely on your machine — no API key, no cost, no data sent anywhere. Best for autocomplete: Qwen2.5-Coder 1.5B. Best for chat: Qwen2.5-Coder 7B or DeepSeek-Coder.' },
            { name: 'Anthropic (Claude)', desc: 'Claude Sonnet 4.5 and above support tools and images. Strong for complex reasoning, code review, and multi-file refactoring. Pay per token — no subscription required.' },
            { name: 'OpenAI (GPT-4o)', desc: 'GPT-4o supports tools and vision. Good general-purpose choice. Use with your existing OpenAI API key. Also compatible with any OpenAI-compatible API endpoint.' },
            { name: 'Google Gemini', desc: 'All Gemini models support function calling. Gemini 2.5 Flash is available on the free tier. Good price-to-performance ratio for chat.' },
            { name: 'Groq', desc: 'Ultra-fast inference for open models — Llama, Mixtral, and others at speeds far above standard API providers. Free tier available. Great for fast chat responses.' },
            { name: 'OpenRouter / Bedrock / Azure', desc: 'OpenRouter gives access to 100+ models through one API key. AWS Bedrock and Azure OpenAI for enterprise deployments. LM Studio as a local alternative to Ollama.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="JetBrains support — important for Java and Android developers" color={color} />
          <InfoBox color={color}>Cursor, Windsurf, and most AI coding editors are VS Code forks — they do not run inside IntelliJ IDEA, PyCharm, or WebStorm. Continue.dev is one of the very few AI assistants with a full-featured JetBrains plugin. If your college teaches Java, Android, or you prefer PyCharm for Python, Continue is the most capable free option that works inside your existing IDE without forcing you to switch editors.</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Install from JetBrains Marketplace', body: 'Open Settings (Ctrl+Alt+S) → Plugins → Marketplace tab → search Continue → Install. Restart the IDE. The Continue icon appears in the right sidebar.' },
            { n: '2', title: 'Open the chat panel', body: 'Cmd/Ctrl+J opens the Continue chat panel in JetBrains (same as Cmd+L in VS Code). Highlight any code and press Cmd+J to add it to the context window.' },
            { n: '3', title: 'Use inline edit', body: 'Select code → press Cmd+I (Mac) or Ctrl+I (Windows/Linux) → describe the change. Continue generates a diff with Accept/Reject buttons directly in your editor.' },
            { n: '4', title: 'Configure via the same config.yaml', body: 'Continue uses one shared ~/.continue/config.yaml across VS Code and JetBrains. Configure your models once — both IDEs use the same settings automatically.' },
          ]} />
          <div className="tool-helper-highlight" style={{ marginTop: '1rem' }}>
            <span className="tool-helper-highlight__label">SUPPORTED: IntelliJ IDEA · PyCharm · WebStorm · GoLand · Rider · Android Studio · DataGrip</span>
          </div>
        </Block>
        <Block>
          <SubHead label="Continue Hub — share configurations with teams" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Continue Hub is the official registry for sharing and discovering reusable assistant configurations. It launched with v1.0 and lets individuals and organizations publish pre-built blocks: model configurations, rules, MCP servers, and complete assistant definitions that others can import with a single line.</p>
          <CardGrid color={color} items={[
            { name: 'Assistant definitions', desc: 'A complete config that combines a model, rules, and tools. Import a community-built Python expert assistant or a React code reviewer in one line: anthropic/claude-sonnet-assistant.' },
            { name: 'Rules (slash commands)', desc: 'Custom /commands like /review, /test, /explain. Define your own using Markdown files in .continue/prompts/. Rules guide the AI behavior — team style guides, naming conventions, test requirements.' },
            { name: 'Context providers', desc: 'Share custom @providers that inject project-specific context. A team might publish a @jira provider that pulls current sprint tickets, or a @docs provider pointing to internal API docs.' },
            { name: 'MCP server configs', desc: 'Model Context Protocol tools let agents call external services — read files, run terminal commands, query databases. Hub distributes pre-configured MCP setups teams can reuse.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Continue.dev vs Codeium vs Cline" color={color} />
          <Compare color={color} items={[
            { label: 'Continue.dev', badge: 'BYOK — you choose the model', body: 'Fully open source (Apache 2.0). Works in VS Code and JetBrains. You connect your own API key (Claude, GPT-4o, Gemini) or run Ollama locally for free. Best choice if you want model flexibility, privacy, or JetBrains support. Requires 10-15 minutes of initial configuration. The config.yaml approach gives you full control but means more setup than Codeium.' },
            { label: 'Codeium (Windsurf extension)', badge: 'Zero config — works immediately', body: 'One-click install, no API key needed, free forever for individuals. Codeium provides the model — you do not bring your own. Excellent autocomplete quality, fast responses, 70+ editors. The tradeoff: you are locked into Codeium\'s model. No local deployment option. Best if you want Copilot-quality autocomplete with zero setup.' },
            { label: 'Cline', badge: 'Autonomous agent — not autocomplete', body: 'Cline is a chat/agent tool — it handles multi-file edits, runs terminal commands, and executes complex tasks autonomously. It does NOT do tab autocomplete. Most developers pair Continue (for completions) + Cline (for heavy agentic tasks). Cline requires an API key and costs more per session than Continue because agent tasks use many more tokens.' },
            { label: 'GitHub Copilot', badge: '$10/month or free student tier', body: 'Strongest out-of-the-box experience, deepest VS Code integration, and the most polished autocomplete. But requires a subscription (or student GitHub pack). Locked into GitHub/OpenAI models. No local deployment. No JetBrains chat (autocomplete only for JetBrains on paid plans). For students without the free tier, Continue + Gemini Flash is a strong free alternative.' },
          ]} />
        </Block>
        <ProjectTask
        title={"Build Your Free AI Dev Setup"}
        description={"Set up Continue.dev with two models: a free local model for autocomplete and a free cloud API for chat. This gives you a complete Copilot replacement at zero cost. The goal is to have ghost-text suggestions appearing as you type, and a chat panel you can ask questions about your code — all without paying anything."}
        costNote={"TOTAL COST: ₹0 — Ollama is free, Gemini Flash free tier covers normal usage"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Install Continue in your IDE', body: 'VS Code: search Continue in Extensions. JetBrains: Settings → Plugins → Marketplace → Continue. The purple icon confirms it is installed.' },
            { n: '2', title: 'Install Ollama for free autocomplete', body: 'Download from ollama.com. After install, run in terminal: ollama pull qwen2.5-coder:1.5b — this is a fast 1.5B model that gives instant autocomplete suggestions. Takes 1-2 GB download.' },
            { n: '3', title: 'Get a free Gemini API key for chat', body: 'Visit aistudio.google.com/apikey — free tier gives you Gemini 2.5 Flash with generous limits. Add it to config.yaml: provider: gemini, model: gemini-2.5-flash, apiKey: your-key.' },
            { n: '4', title: 'Configure config.yaml', body: 'Set autocomplete model to Ollama qwen2.5-coder:1.5b (fast, local). Set chat model to Gemini Flash (free API). Now typing gives you instant local suggestions. Complex questions use the cloud.' },
            { n: '5', title: 'Use on a real project for one week', body: 'Open your most recent project. Use Tab for completions, Cmd+L for questions, Cmd+I for inline edits. After a week, decide if you want to upgrade the chat model to Claude or keep Gemini.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Use two models for two jobs. A small Ollama model (Qwen2.5-Coder 1.5B) handles tab autocomplete — it is fast enough that suggestions appear before you finish a word. Reserve a stronger model (Claude Sonnet or Gemini Pro) for chat and inline edits where reasoning quality matters. This split is Continue's biggest advantage over Copilot: you can optimize speed and cost separately for each interaction type. Most users find that 90% of their AI usage is autocomplete — and that 90% is now free.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/coding/codeium', label: 'Codeium' }}
        next={{ path: '/ai-lab/coding/aider', label: 'Aider' }}
      />
    </ToolPageShell>
  )
}
