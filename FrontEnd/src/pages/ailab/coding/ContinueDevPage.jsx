import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#8B5CF6'

export default function ContinueDevPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(139,92,246,0.09)' : 'rgba(139,92,246,0.11)'
  const txt   = dark ? '#E2E8F0' : '#0F172A'
  const sub   = dark ? '#94A3B8' : '#475569'
  const muted = dark ? '#64748B' : '#94A3B8'

  return (
    <div style={{ minHeight: '100vh', background: bg, color: txt, fontFamily: "'Rajdhani', sans-serif", overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, borderRadius: '50%', background: `radial-gradient(ellipse, ${color}07 0%, transparent 65%)`, filter: 'blur(60px)' }} />
      </div>

      <nav style={{ position: 'sticky', top: 0, zIndex: 50, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', background: dark ? 'rgba(2,8,23,0.93)' : 'rgba(240,244,255,0.95)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${border}` }}>
        <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.72rem', letterSpacing: '0.1em', color: CYAN, padding: 0 }}>
          <ArrowLeft size={14} /> AI Lab
        </button>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Coding</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🔄</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Continue.dev — Open-Source Copilot for VS Code and JetBrains</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>The free self-hosted AI coding assistant — any model, any IDE</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ 100% FREE', '#4ADE80'], ['continue.dev', color], ['Open Source', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Continue.dev is the leading open-source AI coding assistant — a free VS Code extension and JetBrains plugin that gives you GitHub Copilot-style features without any subscription. The key difference is that Continue does not lock you into one AI provider. You bring your own model: connect it to Claude, GPT-4o, Gemini, or run a completely local model through Ollama for free, offline coding with zero data leaving your machine. Unlike Cursor or Windsurf, which are standalone editors you must migrate to, Continue installs into your existing VS Code or JetBrains IDE (IntelliJ IDEA, PyCharm, WebStorm) in minutes. For Java developers, Android developers, and Python students using PyCharm, this is especially important — Continue is one of the few AI assistants that works natively inside JetBrains without requiring you to abandon your IDE. Version 1.0 launched in early 2025 alongside a $3 million funding round, bringing total funding to $5.1 million.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Install Continue AI in VS Code: Setup Guide', url: 'https://www.youtube.com/watch?v=C1g4_YQJEg8', dur: '2026', note: 'Full installation walkthrough — VS Code extension setup from scratch' },
            { label: 'VS Code with FREE Local AI — GitHub Copilot vs Continue.dev REVIEW & Setup', url: 'https://www.youtube.com/watch?v=18niVtczoUs', dur: '2025', note: 'Side-by-side comparison plus how to configure local models with Ollama' },
            { label: 'Continue.dev vs. Cline: The Best Coding Assistant for VSCode?', url: 'https://www.youtube.com/watch?v=u70zctCPaLc', dur: 'YouTube', note: 'Understand when to use Continue vs Cline — complementary tools explained' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Why Continue exists */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why Continue.dev exists" color={color} />
          <InfoBox color={color} dark={dark}>GitHub Copilot costs $10/month. Cursor costs $20/month. Both lock you into their model choices. Continue.dev was built to answer one question: what if AI coding assistance were a utility — free, open, and model-agnostic — the same way VS Code is free and language-agnostic? The result is an Apache 2.0 licensed project where you own the configuration and pay only the API provider you choose (or nothing at all if you use Ollama locally).</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>Continue launched in 2023 and reached version 1.0 in February 2025. It is maintained by a venture-backed company (Continue.dev Inc.) but the extension itself remains permanently open source. The business model is enterprise teams paying for Continue Hub features — individual developers get the full tool free, indefinitely. This is the same model as VS Code, Ollama, and most developer infrastructure: free for individuals, paid for enterprise.</p>
        </Block>

        {/* Key features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Four core interaction modes" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Tab Autocomplete', desc: 'Ghost text suggestions as you type — press Tab to accept. Configure a fast local model (Qwen2.5-Coder 1.5B via Ollama) for sub-100ms latency. Works identically to Copilot autocomplete.' },
            { name: 'Chat Panel (Cmd+L)', desc: 'Open a chat sidebar with Cmd/Ctrl+L. Highlight code and ask questions, request refactoring, or generate tests. The chat is context-aware: it sees your open files and indexed codebase.' },
            { name: 'Inline Edit (Cmd+I)', desc: 'Select any block of code, press Cmd/Ctrl+I, describe the change in natural language. Continue generates a diff inline — you see exactly what changed and can Accept or Reject.' },
            { name: 'Agent Mode', desc: 'Autonomous multi-file edits and terminal command execution for complex tasks. Like Claude Code but running inside your IDE. Available in v1.0+ with MCP server support.' },
            { name: 'Codebase Indexing', desc: 'Continue indexes your entire project and stores embeddings locally. Use @codebase in chat to ask questions about any part of your repo — finds relevant files automatically.' },
            { name: 'Context Providers', desc: '@file, @codebase, @docs, @terminal, @git, @web — prefix any chat message to inject specific context. @git adds recent diffs. @docs fetches framework documentation into the prompt.' },
          ]} />
        </Block>

        {/* Model configuration */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Configuring your models" color={color} />
          <InfoBox color={color} dark={dark}>Continue uses a config.yaml file (migrated from JSON in v1.0). You assign different models to different roles: a fast 1.5B local model for autocomplete, a powerful cloud model for chat. This lets you get fast completions for free while reserving expensive API calls for complex questions.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install the extension', body: "VS Code: search 'Continue' in the Extensions panel (Ctrl+Shift+X) — look for the purple icon by Continue.dev. JetBrains: Settings → Plugins → Marketplace → search 'Continue'. Install and restart." },
            { n: '2', title: 'Open the config.yaml', body: "Click the gear icon in the Continue sidebar, or open ~/.continue/config.yaml directly. This is your master configuration file. The v1.0 format uses YAML with models, rules, and tools sections." },
            { n: '3', title: 'Add a cloud model for chat', body: "Under models, add your API provider. For Claude: provider: anthropic, model: claude-sonnet-4-5, apiKey: your-key. For GPT-4o: provider: openai, model: gpt-4o. For Gemini (free): provider: gemini, model: gemini-2.5-flash." },
            { n: '4', title: 'Add a local model for autocomplete (optional, free)', body: "Install Ollama from ollama.com. Run: ollama pull qwen2.5-coder:1.5b (fast, small). In config.yaml set autocomplete model to provider: ollama, model: qwen2.5-coder:1.5b. Now completions are free and private." },
            { n: '5', title: 'Test it', body: "Open any code file — ghost text should appear within 1-2 seconds. Press Cmd/Ctrl+L to open chat. Type @file to reference a specific file. Everything works inside your existing IDE." },
          ]} />
        </Block>

        {/* Model support */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Supported model providers" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Ollama (local, free)', desc: 'Run models entirely on your machine — no API key, no cost, no data sent anywhere. Best for autocomplete: Qwen2.5-Coder 1.5B. Best for chat: Qwen2.5-Coder 7B or DeepSeek-Coder.' },
            { name: 'Anthropic (Claude)', desc: 'Claude Sonnet 4.5 and above support tools and images. Strong for complex reasoning, code review, and multi-file refactoring. Pay per token — no subscription required.' },
            { name: 'OpenAI (GPT-4o)', desc: 'GPT-4o supports tools and vision. Good general-purpose choice. Use with your existing OpenAI API key. Also compatible with any OpenAI-compatible API endpoint.' },
            { name: 'Google Gemini', desc: 'All Gemini models support function calling. Gemini 2.5 Flash is available on the free tier. Good price-to-performance ratio for chat.' },
            { name: 'Groq', desc: 'Ultra-fast inference for open models — Llama, Mixtral, and others at speeds far above standard API providers. Free tier available. Great for fast chat responses.' },
            { name: 'OpenRouter / Bedrock / Azure', desc: 'OpenRouter gives access to 100+ models through one API key. AWS Bedrock and Azure OpenAI for enterprise deployments. LM Studio as a local alternative to Ollama.' },
          ]} />
        </Block>

        {/* JetBrains section */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="JetBrains support — important for Java and Android developers" color={color} />
          <InfoBox color={color} dark={dark}>Cursor, Windsurf, and most AI coding editors are VS Code forks — they do not run inside IntelliJ IDEA, PyCharm, or WebStorm. Continue.dev is one of the very few AI assistants with a full-featured JetBrains plugin. If your college teaches Java, Android, or you prefer PyCharm for Python, Continue is the most capable free option that works inside your existing IDE without forcing you to switch editors.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install from JetBrains Marketplace', body: 'Open Settings (Ctrl+Alt+S) → Plugins → Marketplace tab → search Continue → Install. Restart the IDE. The Continue icon appears in the right sidebar.' },
            { n: '2', title: 'Open the chat panel', body: 'Cmd/Ctrl+J opens the Continue chat panel in JetBrains (same as Cmd+L in VS Code). Highlight any code and press Cmd+J to add it to the context window.' },
            { n: '3', title: 'Use inline edit', body: 'Select code → press Cmd+I (Mac) or Ctrl+I (Windows/Linux) → describe the change. Continue generates a diff with Accept/Reject buttons directly in your editor.' },
            { n: '4', title: 'Configure via the same config.yaml', body: 'Continue uses one shared ~/.continue/config.yaml across VS Code and JetBrains. Configure your models once — both IDEs use the same settings automatically.' },
          ]} />
          <div style={{ padding: '0.75rem 1rem', borderRadius: 10, background: dark ? `${color}08` : `${color}06`, border: `1px solid ${color}20`, marginTop: '1rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color, letterSpacing: '0.08em' }}>SUPPORTED: IntelliJ IDEA · PyCharm · WebStorm · GoLand · Rider · Android Studio · DataGrip</span>
          </div>
        </Block>

        {/* Continue Hub */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Continue Hub — share configurations with teams" color={color} />
          <p style={{ ...P(sub), marginBottom: '1rem' }}>Continue Hub is the official registry for sharing and discovering reusable assistant configurations. It launched with v1.0 and lets individuals and organizations publish pre-built blocks: model configurations, rules, MCP servers, and complete assistant definitions that others can import with a single line.</p>
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Assistant definitions', desc: 'A complete config that combines a model, rules, and tools. Import a community-built Python expert assistant or a React code reviewer in one line: anthropic/claude-sonnet-assistant.' },
            { name: 'Rules (slash commands)', desc: 'Custom /commands like /review, /test, /explain. Define your own using Markdown files in .continue/prompts/. Rules guide the AI behavior — team style guides, naming conventions, test requirements.' },
            { name: 'Context providers', desc: 'Share custom @providers that inject project-specific context. A team might publish a @jira provider that pulls current sprint tickets, or a @docs provider pointing to internal API docs.' },
            { name: 'MCP server configs', desc: 'Model Context Protocol tools let agents call external services — read files, run terminal commands, query databases. Hub distributes pre-configured MCP setups teams can reuse.' },
          ]} />
        </Block>

        {/* Comparison */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Continue.dev vs Codeium vs Cline" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Continue.dev', badge: 'BYOK — you choose the model', body: 'Fully open source (Apache 2.0). Works in VS Code and JetBrains. You connect your own API key (Claude, GPT-4o, Gemini) or run Ollama locally for free. Best choice if you want model flexibility, privacy, or JetBrains support. Requires 10-15 minutes of initial configuration. The config.yaml approach gives you full control but means more setup than Codeium.' },
            { label: 'Codeium (Windsurf extension)', badge: 'Zero config — works immediately', body: 'One-click install, no API key needed, free forever for individuals. Codeium provides the model — you do not bring your own. Excellent autocomplete quality, fast responses, 70+ editors. The tradeoff: you are locked into Codeium\'s model. No local deployment option. Best if you want Copilot-quality autocomplete with zero setup.' },
            { label: 'Cline', badge: 'Autonomous agent — not autocomplete', body: 'Cline is a chat/agent tool — it handles multi-file edits, runs terminal commands, and executes complex tasks autonomously. It does NOT do tab autocomplete. Most developers pair Continue (for completions) + Cline (for heavy agentic tasks). Cline requires an API key and costs more per session than Continue because agent tasks use many more tokens.' },
            { label: 'GitHub Copilot', badge: '$10/month or free student tier', body: 'Strongest out-of-the-box experience, deepest VS Code integration, and the most polished autocomplete. But requires a subscription (or student GitHub pack). Locked into GitHub/OpenAI models. No local deployment. No JetBrains chat (autocomplete only for JetBrains on paid plans). For students without the free tier, Continue + Gemini Flash is a strong free alternative.' },
          ]} />
        </Block>

        {/* Project task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build Your Free AI Dev Setup</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Set up Continue.dev with two models: a free local model for autocomplete and a free cloud API for chat. This gives you a complete Copilot replacement at zero cost. The goal is to have ghost-text suggestions appearing as you type, and a chat panel you can ask questions about your code — all without paying anything.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install Continue in your IDE', body: 'VS Code: search Continue in Extensions. JetBrains: Settings → Plugins → Marketplace → Continue. The purple icon confirms it is installed.' },
            { n: '2', title: 'Install Ollama for free autocomplete', body: 'Download from ollama.com. After install, run in terminal: ollama pull qwen2.5-coder:1.5b — this is a fast 1.5B model that gives instant autocomplete suggestions. Takes 1-2 GB download.' },
            { n: '3', title: 'Get a free Gemini API key for chat', body: 'Visit aistudio.google.com/apikey — free tier gives you Gemini 2.5 Flash with generous limits. Add it to config.yaml: provider: gemini, model: gemini-2.5-flash, apiKey: your-key.' },
            { n: '4', title: 'Configure config.yaml', body: 'Set autocomplete model to Ollama qwen2.5-coder:1.5b (fast, local). Set chat model to Gemini Flash (free API). Now typing gives you instant local suggestions. Complex questions use the cloud.' },
            { n: '5', title: 'Use on a real project for one week', body: 'Open your most recent project. Use Tab for completions, Cmd+L for questions, Cmd+I for inline edits. After a week, decide if you want to upgrade the chat model to Claude or keep Gemini.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(139,92,246,0.08)' : 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color, letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Ollama is free, Gemini Flash free tier covers normal usage</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(139,92,246,0.07)' : 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color, marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Use two models for two jobs. A small Ollama model (Qwen2.5-Coder 1.5B) handles tab autocomplete — it is fast enough that suggestions appear before you finish a word. Reserve a stronger model (Claude Sonnet or Gemini Pro) for chat and inline edits where reasoning quality matters. This split is Continue's biggest advantage over Copilot: you can optimize speed and cost separately for each interaction type. Most users find that 90% of their AI usage is autocomplete — and that 90% is now free.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/coding/codeium')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Codeium
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/coding/aider')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Aider <ChevronRight size={14} />
          </button>
        </div>

      </div>
      <ScrollToTop />
    </div>
  )
}

function Block({ title, titleColor, dark, border, card, children }) {
  return (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '1.375rem', backdropFilter: 'blur(8px)', marginBottom: '1.25rem' }}>
      {title && <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.14em', color: titleColor, textTransform: 'uppercase', paddingBottom: '0.75rem', marginBottom: '1rem', borderBottom: `1px solid ${titleColor}20` }}>{title}</div>}
      {children}
    </div>
  )
}

function VideoCard({ v, dark, txt, muted }) {
  return (
    <a href={v.url} target="_blank" rel="noopener noreferrer"
      style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1.125rem', borderRadius: 11, textDecoration: 'none', background: dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.16)', marginBottom: '0.625rem', transition: 'background 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.09)'}
      onMouseLeave={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)'}
    >
      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Play size={13} color="#fff" fill="#fff" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: txt }}>{v.label}</div>
        {(v.dur || v.note) && <div style={{ fontSize: '0.7rem', color: muted, marginTop: 2 }}>{[v.dur, v.note].filter(Boolean).join(' · ')}</div>}
      </div>
      <ExternalLink size={12} color={muted} />
    </a>
  )
}
