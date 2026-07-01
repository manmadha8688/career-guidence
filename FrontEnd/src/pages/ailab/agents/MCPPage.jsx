import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#EC4899'

export default function MCPPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Agents">
      <ToolHeader
        icon="🔌"
        title="MCP — The Universal Protocol for AI Tool Connections"
        tagline="Anthropic's open standard that lets any AI connect to any tool"
        badges={[['✓ FREE', '#4ADE80'], ['Open standard', color], ['Anthropic', 'var(--text-muted)']]}
        overview={"The Model Context Protocol (MCP) is an open standard published by Anthropic in November 2024 that defines how AI assistants connect to external data sources and tools. Before MCP, every AI tool — Claude, ChatGPT, Cursor, Copilot — had its own proprietary way of connecting to external systems. A custom plugin for each AI for each service. MCP replaces this fragmentation with a single standard: an MCP server exposes tools and data via the protocol, and any MCP client (Claude Desktop, Cursor, Windsurf, your own app) can connect to it. Build one MCP server that reads your GitHub repositories, and it works in Claude, Cursor, and any other MCP-compatible client simultaneously. Think of MCP as USB-C for AI tools — one standard connector for everything."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'You Need to Learn MCP Right Now!! (Model Context Protocol)', url: 'https://www.youtube.com/watch?v=GuTcle5edjk', dur: '~15 min', note: 'Best conceptual intro — what MCP is and why it matters, clear and fast' },
            { label: 'Building Agents with Model Context Protocol — Full Workshop (Anthropic)', url: 'https://www.youtube.com/watch?v=kQmXtrmQ5Zg', dur: '~60 min', note: 'Official Anthropic workshop — build MCP servers and clients end to end' },
            { label: 'Model Context Protocol Tutorial — Build Your First MCP Server in 6 Steps', url: 'https://www.youtube.com/watch?v=xuhmyPaHKe8', dur: '~20 min', note: 'Hands-on Python server build — tools, resources, Claude Desktop setup' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why MCP matters" color={color} />
          <InfoBox color={color}>Before MCP, connecting an AI to a tool meant building a custom integration for each AI-tool pair. An integration with Notion for Claude was completely different from an integration with Notion for Cursor. MCP standardizes the interface: build one Notion MCP server, and it works with every MCP client. This is the same reason HTTP mattered — one standard protocol means everything can talk to everything.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>MCP's timing is important — it arrived exactly when AI tools were proliferating rapidly enough that the fragmentation problem was becoming painful. It is already supported by Claude Desktop (Anthropic), Cursor, Windsurf, Zed editor, and dozens of third-party tools. The MCP ecosystem has hundreds of pre-built servers for popular services: GitHub, Slack, Notion, PostgreSQL, filesystem access, web search, and many more. For developers, this means you can give any MCP-compatible AI access to your tools in minutes instead of building custom integrations.</p>
        </Block>
        <Block>
          <SubHead label="How MCP works — the architecture" color={color} />
          <InfoBox color={color}>MCP defines three primitives: Tools (functions the AI can call — like function calling), Resources (data the AI can read — like files, database records, API responses), and Prompts (pre-defined prompt templates the server exposes). An MCP server implements some combination of these three. An MCP client connects to the server and exposes its tools and resources to the AI.</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'MCP Host (the AI application)', body: "The application that the user interacts with — Claude Desktop, Cursor, your own app. The host manages the AI model and decides which connected MCP servers' tools to make available." },
            { n: '2', title: 'MCP Client (inside the host)', body: 'A component inside the host that maintains the connection to MCP servers. Handles the protocol: discovers available tools, translates AI tool calls into MCP requests, returns results.' },
            { n: '3', title: 'MCP Server (your tool provider)', body: 'A process you build or install that exposes tools and data via the MCP protocol. Can be local (runs on your computer) or remote (hosted on a server). Speaks the MCP protocol on one side and calls real APIs and databases on the other.' },
            { n: '4', title: 'The flow in action', body: "User asks AI a question → AI decides it needs to call a tool → MCP client sends tool call to MCP server → server executes the real action → server returns result → AI incorporates result into response. You never see the protocol — just the AI using real tools." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Available MCP servers" color={color} />
          <CardGrid color={color} items={[
            { name: 'GitHub MCP server', desc: 'Read repositories, issues, pull requests, code. Ask Claude to review your PR, summarize issues, find related code across repos. Official server from Anthropic.' },
            { name: 'Filesystem server', desc: 'Read and write local files. Give Claude access to your project directory. It can read code, suggest changes, create new files. Use with caution — write access is powerful.' },
            { name: 'PostgreSQL / SQLite server', desc: 'Run SQL queries against your database. Ask natural language questions, get results. The model generates the query, the server executes it safely.' },
            { name: 'Slack MCP server', desc: 'Read channels, search messages, send messages. Build AI workflows that interact with your Slack workspace — summarize discussions, draft responses, surface important threads.' },
            { name: 'Brave Search server', desc: "Web search via Brave's API (free tier available). Give any MCP client real-time web search capability. Better privacy than Google alternatives." },
            { name: 'Memory server', desc: 'Persistent memory for AI assistants. Store facts between conversations using a knowledge graph. The AI remembers things you told it in previous sessions.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Setting up MCP in Claude Desktop" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Install Claude Desktop', body: 'Download from claude.ai/download. Claude Desktop supports MCP natively — it is the reference MCP client implementation.' },
            { n: '2', title: 'Find an MCP server to add', body: 'Browse github.com/modelcontextprotocol/servers — the official repository of reference MCP servers. Also browse glama.ai/mcp/servers for community servers.' },
            { n: '3', title: 'Edit claude_desktop_config.json', body: 'Claude Desktop reads its MCP configuration from claude_desktop_config.json in the app data directory. Add server configuration:\n{\n  "mcpServers": {\n    "filesystem": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allow"]\n    }\n  }\n}' },
            { n: '4', title: 'Restart Claude Desktop', body: 'Restart the app. In a new conversation, Claude now has access to the tools from your configured servers. Ask "What files are in my project directory?" to verify the filesystem server is working.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Building your own MCP server" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Install the Python SDK', body: 'pip install mcp\nThe MCP Python SDK handles all protocol details — you just define your tools as Python functions.' },
            { n: '2', title: 'Create a server with tools', body: "from mcp.server import Server\nfrom mcp.server.stdio import stdio_server\napp = Server('my-server')\n@app.tool()\nasync def get_weather(city: str) -> str:\n    'Get current weather for a city'\n    return f'Weather in {city}: 28°C, sunny'  # Real implementation calls a weather API" },
            { n: '3', title: 'Define resources (optional)', body: "@app.resource('config://settings')\nasync def get_settings() -> str:\n    'Read application settings'\n    return open('settings.json').read()\nResources give the AI read access to data without it being a 'tool call'." },
            { n: '4', title: 'Run the server', body: 'async def main():\n    async with stdio_server() as streams:\n        await app.run(*streams)\nasyncio.run(main())\nLocal MCP servers communicate over stdio — they launch as child processes of the MCP host.' },
            { n: '5', title: 'Connect to Claude Desktop', body: 'Add your server to claude_desktop_config.json with the path to your Python script. Restart Claude Desktop. Your custom tools are now available to Claude.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="MCP vs direct function calling" color={color} />
          <Compare color={color} items={[
            { label: 'Direct function calling (OpenAI tools)', badge: 'Application-specific', body: 'Functions are defined in your application code and passed to one specific LLM call. Works perfectly for a single application. Does not share tools across AI clients.' },
            { label: 'MCP server', badge: 'Cross-client, reusable', body: 'Tools are defined once in an MCP server. Any MCP-compatible AI client can connect and use them. Build once, use everywhere. The right choice when the same tools should work in Claude, Cursor, and your own app.' },
            { label: 'When to use each', badge: 'Practical guide', body: 'Use function calling for application-specific tools that only one AI in one app needs. Use MCP for general-purpose tool servers — database access, file systems, external APIs — that you want accessible from multiple AI tools and workflows.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Connect Claude Desktop to your local filesystem, GitHub repos, or databases with pre-built MCP servers',
            'Build a custom MCP server that exposes any API or data source to any MCP-compatible AI',
            'Give Cursor and Claude simultaneous access to the same tools without building separate integrations',
            'Create persistent memory for AI assistants that remembers facts across conversations',
            'Understand the emerging standard for how AI systems will connect to the real world',
        ]} />
      </Block>
        <ProjectTask
        title={"Connect Claude to Your GitHub"}
        description={"Set up the GitHub MCP server in Claude Desktop and use it to do a real code review. Point it at one of your GitHub repositories. Then ask Claude to: review recent commits for potential issues, summarize open issues by priority, identify which files are changed most frequently and why that might be a concern. This is AI doing real work on your real project — not a demo."}
        costNote={"TOTAL COST: ₹0 — Claude Desktop free, GitHub MCP server free, read-only token required"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Install Claude Desktop and Node.js', body: 'Download Claude Desktop from claude.ai/download. Install Node.js from nodejs.org (needed to run npm-based MCP servers). Both are free.' },
            { n: '2', title: 'Configure GitHub MCP server', body: 'Edit claude_desktop_config.json. Add the GitHub server configuration with your GitHub personal access token (create at github.com/settings/tokens — read-only scope is sufficient). Follow the official setup guide at modelcontextprotocol.io.' },
            { n: '3', title: 'Verify the connection', body: 'Restart Claude Desktop. In a new chat, click the tools icon (bottom of input). You should see GitHub tools listed: get_repository, list_issues, get_pull_request, search_code, etc.' },
            { n: '4', title: 'Do a real code review', body: 'Ask Claude: "Look at the recent commits in [repo-owner]/[repo-name] from the last week. Identify any commits that could introduce bugs or that lack proper error handling." Let Claude use the tools and report its findings.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Start with read-only MCP servers when learning. Filesystem and database servers with write access can modify or delete real data if the AI misunderstands an instruction. Configure the filesystem server with read-only access to a specific directory first. Once you are comfortable with how the AI uses tools and understand the risks, add write permissions incrementally.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/agents/hermes', label: 'Hermes' }}
        next={{ path: '/ai-lab/automation/n8n', label: 'n8n' }}
      />
    </ToolPageShell>
  )
}
