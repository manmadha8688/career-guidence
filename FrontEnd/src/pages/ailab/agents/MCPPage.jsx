import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#EC4899'

export default function MCPPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(0,217,255,0.09)' : 'rgba(79,70,229,0.11)'
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Agents</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🔌</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>MCP — The Universal Protocol for AI Tool Connections</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Anthropic's open standard that lets any AI connect to any tool</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['Open standard', color], ['Anthropic', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>The Model Context Protocol (MCP) is an open standard published by Anthropic in November 2024 that defines how AI assistants connect to external data sources and tools. Before MCP, every AI tool — Claude, ChatGPT, Cursor, Copilot — had its own proprietary way of connecting to external systems. A custom plugin for each AI for each service. MCP replaces this fragmentation with a single standard: an MCP server exposes tools and data via the protocol, and any MCP client (Claude Desktop, Cursor, Windsurf, your own app) can connect to it. Build one MCP server that reads your GitHub repositories, and it works in Claude, Cursor, and any other MCP-compatible client simultaneously. Think of MCP as USB-C for AI tools — one standard connector for everything.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'MCP Explained — Model Context Protocol by Anthropic', url: 'https://www.youtube.com/watch?v=7j_NE6Pjv-E', dur: '12 min', note: 'Clear explanation of what MCP is and why it matters' },
            { label: 'Build Your First MCP Server — Python Tutorial', url: 'https://www.youtube.com/watch?v=Mha5bRxntiE', dur: '20 min', note: 'Hands-on server building' },
            { label: 'MCP in Cursor and Claude Desktop — Setup Guide', url: 'https://www.youtube.com/watch?v=Do_J5p9lHEk', dur: '15 min', note: 'Connecting MCP servers to AI clients' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Why MCP matters */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why MCP matters" color={color} />
          <InfoBox color={color} dark={dark}>Before MCP, connecting an AI to a tool meant building a custom integration for each AI-tool pair. An integration with Notion for Claude was completely different from an integration with Notion for Cursor. MCP standardizes the interface: build one Notion MCP server, and it works with every MCP client. This is the same reason HTTP mattered — one standard protocol means everything can talk to everything.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>MCP's timing is important — it arrived exactly when AI tools were proliferating rapidly enough that the fragmentation problem was becoming painful. It is already supported by Claude Desktop (Anthropic), Cursor, Windsurf, Zed editor, and dozens of third-party tools. The MCP ecosystem has hundreds of pre-built servers for popular services: GitHub, Slack, Notion, PostgreSQL, filesystem access, web search, and many more. For developers, this means you can give any MCP-compatible AI access to your tools in minutes instead of building custom integrations.</p>
        </Block>

        {/* How MCP works — the architecture */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How MCP works — the architecture" color={color} />
          <InfoBox color={color} dark={dark}>MCP defines three primitives: Tools (functions the AI can call — like function calling), Resources (data the AI can read — like files, database records, API responses), and Prompts (pre-defined prompt templates the server exposes). An MCP server implements some combination of these three. An MCP client connects to the server and exposes its tools and resources to the AI.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'MCP Host (the AI application)', body: "The application that the user interacts with — Claude Desktop, Cursor, your own app. The host manages the AI model and decides which connected MCP servers' tools to make available." },
            { n: '2', title: 'MCP Client (inside the host)', body: 'A component inside the host that maintains the connection to MCP servers. Handles the protocol: discovers available tools, translates AI tool calls into MCP requests, returns results.' },
            { n: '3', title: 'MCP Server (your tool provider)', body: 'A process you build or install that exposes tools and data via the MCP protocol. Can be local (runs on your computer) or remote (hosted on a server). Speaks the MCP protocol on one side and calls real APIs and databases on the other.' },
            { n: '4', title: 'The flow in action', body: "User asks AI a question → AI decides it needs to call a tool → MCP client sends tool call to MCP server → server executes the real action → server returns result → AI incorporates result into response. You never see the protocol — just the AI using real tools." },
          ]} />
        </Block>

        {/* Available MCP servers */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Available MCP servers" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'GitHub MCP server', desc: 'Read repositories, issues, pull requests, code. Ask Claude to review your PR, summarize issues, find related code across repos. Official server from Anthropic.' },
            { name: 'Filesystem server', desc: 'Read and write local files. Give Claude access to your project directory. It can read code, suggest changes, create new files. Use with caution — write access is powerful.' },
            { name: 'PostgreSQL / SQLite server', desc: 'Run SQL queries against your database. Ask natural language questions, get results. The model generates the query, the server executes it safely.' },
            { name: 'Slack MCP server', desc: 'Read channels, search messages, send messages. Build AI workflows that interact with your Slack workspace — summarize discussions, draft responses, surface important threads.' },
            { name: 'Brave Search server', desc: "Web search via Brave's API (free tier available). Give any MCP client real-time web search capability. Better privacy than Google alternatives." },
            { name: 'Memory server', desc: 'Persistent memory for AI assistants. Store facts between conversations using a knowledge graph. The AI remembers things you told it in previous sessions.' },
          ]} />
        </Block>

        {/* Setting up MCP in Claude Desktop */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Setting up MCP in Claude Desktop" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install Claude Desktop', body: 'Download from claude.ai/download. Claude Desktop supports MCP natively — it is the reference MCP client implementation.' },
            { n: '2', title: 'Find an MCP server to add', body: 'Browse github.com/modelcontextprotocol/servers — the official repository of reference MCP servers. Also browse glama.ai/mcp/servers for community servers.' },
            { n: '3', title: 'Edit claude_desktop_config.json', body: 'Claude Desktop reads its MCP configuration from claude_desktop_config.json in the app data directory. Add server configuration:\n{\n  "mcpServers": {\n    "filesystem": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allow"]\n    }\n  }\n}' },
            { n: '4', title: 'Restart Claude Desktop', body: 'Restart the app. In a new conversation, Claude now has access to the tools from your configured servers. Ask "What files are in my project directory?" to verify the filesystem server is working.' },
          ]} />
        </Block>

        {/* Building your own MCP server */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Building your own MCP server" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install the Python SDK', body: 'pip install mcp\nThe MCP Python SDK handles all protocol details — you just define your tools as Python functions.' },
            { n: '2', title: 'Create a server with tools', body: "from mcp.server import Server\nfrom mcp.server.stdio import stdio_server\napp = Server('my-server')\n@app.tool()\nasync def get_weather(city: str) -> str:\n    'Get current weather for a city'\n    return f'Weather in {city}: 28°C, sunny'  # Real implementation calls a weather API" },
            { n: '3', title: 'Define resources (optional)', body: "@app.resource('config://settings')\nasync def get_settings() -> str:\n    'Read application settings'\n    return open('settings.json').read()\nResources give the AI read access to data without it being a 'tool call'." },
            { n: '4', title: 'Run the server', body: 'async def main():\n    async with stdio_server() as streams:\n        await app.run(*streams)\nasyncio.run(main())\nLocal MCP servers communicate over stdio — they launch as child processes of the MCP host.' },
            { n: '5', title: 'Connect to Claude Desktop', body: 'Add your server to claude_desktop_config.json with the path to your Python script. Restart Claude Desktop. Your custom tools are now available to Claude.' },
          ]} />
        </Block>

        {/* MCP vs direct function calling */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="MCP vs direct function calling" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Direct function calling (OpenAI tools)', badge: 'Application-specific', body: 'Functions are defined in your application code and passed to one specific LLM call. Works perfectly for a single application. Does not share tools across AI clients.' },
            { label: 'MCP server', badge: 'Cross-client, reusable', body: 'Tools are defined once in an MCP server. Any MCP-compatible AI client can connect and use them. Build once, use everywhere. The right choice when the same tools should work in Claude, Cursor, and your own app.' },
            { label: 'When to use each', badge: 'Practical guide', body: 'Use function calling for application-specific tools that only one AI in one app needs. Use MCP for general-purpose tool servers — database access, file systems, external APIs — that you want accessible from multiple AI tools and workflows.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Connect Claude Desktop to your local filesystem, GitHub repos, or databases with pre-built MCP servers',
            'Build a custom MCP server that exposes any API or data source to any MCP-compatible AI',
            'Give Cursor and Claude simultaneous access to the same tools without building separate integrations',
            'Create persistent memory for AI assistants that remembers facts across conversations',
            'Understand the emerging standard for how AI systems will connect to the real world',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}`, marginBottom: '0.5rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 7 }} />
              <span style={{ fontSize: '0.85rem', color: sub, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Connect Claude to Your GitHub</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Set up the GitHub MCP server in Claude Desktop and use it to do a real code review. Point it at one of your GitHub repositories. Then ask Claude to: review recent commits for potential issues, summarize open issues by priority, identify which files are changed most frequently and why that might be a concern. This is AI doing real work on your real project — not a demo.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install Claude Desktop and Node.js', body: 'Download Claude Desktop from claude.ai/download. Install Node.js from nodejs.org (needed to run npm-based MCP servers). Both are free.' },
            { n: '2', title: 'Configure GitHub MCP server', body: 'Edit claude_desktop_config.json. Add the GitHub server configuration with your GitHub personal access token (create at github.com/settings/tokens — read-only scope is sufficient). Follow the official setup guide at modelcontextprotocol.io.' },
            { n: '3', title: 'Verify the connection', body: 'Restart Claude Desktop. In a new chat, click the tools icon (bottom of input). You should see GitHub tools listed: get_repository, list_issues, get_pull_request, search_code, etc.' },
            { n: '4', title: 'Do a real code review', body: 'Ask Claude: "Look at the recent commits in [repo-owner]/[repo-name] from the last week. Identify any commits that could introduce bugs or that lack proper error handling." Let Claude use the tools and report its findings.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Claude Desktop free, GitHub MCP server free, read-only token required</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Start with read-only MCP servers when learning. Filesystem and database servers with write access can modify or delete real data if the AI misunderstands an instruction. Configure the filesystem server with read-only access to a specific directory first. Once you are comfortable with how the AI uses tools and understand the risks, add write permissions incrementally.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/agents/hermes')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Hermes
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/automation/n8n')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            n8n <ChevronRight size={14} />
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
