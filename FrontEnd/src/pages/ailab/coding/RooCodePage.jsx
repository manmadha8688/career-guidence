import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#E11D48'

export default function RooCodePage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Coding">
      <ToolHeader
        icon="🦘"
        title="Roo Code — Advanced Open-Source Agent for VS Code"
        tagline="Evolved from Cline — custom modes, MCP marketplace, multi-model hub"
        badges={[['✓ FREE Extension', '#4ADE80'], ['roocode.com', color], ['Open Source', 'var(--text-muted)']]}
        overview={"Roo Code started as a fork of Cline and grew into one of the most feature-rich open-source coding agents in VS Code. It keeps Cline's core strengths — read the repo, edit files, run terminal commands, approve each step — and adds custom modes (Architect, Code, Ask, Debug, and user-defined personas), a model marketplace, and deep MCP (Model Context Protocol) integration. On OpenRouter's app leaderboard, Roo sits alongside Cline and Kilo Code as proof that BYOK agent extensions are how students and professionals actually build software in 2026, not proprietary subscriptions alone. The extension is free; you bring API keys from Anthropic, OpenRouter, Groq, or run Ollama locally."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Roo Code — full setup and first project', url: 'https://www.youtube.com/results?search_query=roo+code+vs+code+setup', dur: 'YouTube', note: 'Latest install guide — modes, API keys, MCP servers' },
            { label: 'Roo Code custom modes explained', url: 'https://www.youtube.com/results?search_query=roo+code+custom+modes', dur: 'YouTube', note: 'Architect vs Code vs Debug — when to switch modes' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Custom modes — Roo's killer feature" color={color} />
          <InfoBox color={color}>Modes change how the agent behaves without changing the model. Architect mode plans structure and file layout without touching code. Code mode implements. Ask mode explains. Debug mode focuses on errors and logs. You can define your own modes with system prompts — e.g. "Security reviewer" or "Write tests only". This teaches the same separation of concerns used in production agent pipelines.</InfoBox>
          <CardGrid color={color} items={[
            { name: 'Architect mode', desc: 'Design folder structure, APIs, and data flow before a single line is written — like a senior dev whiteboard session.' },
            { name: 'Code mode', desc: 'Execute the plan with multi-file edits and terminal runs, with checkpoints if something goes wrong.' },
            { name: 'MCP marketplace', desc: 'Plug in databases, GitHub, browsers, and docs as tools the agent can call — same protocol Claude Desktop and Cline use.' },
            { name: 'Model hub', desc: 'Switch between Claude, GPT, Gemini, DeepSeek, or local Ollama per task — cheap model for boilerplate, strong model for hard bugs.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="When to choose Roo over Cline or Kilo" color={color} />
          <Compare color={color} items={[
            { label: 'You want structured workflows', badge: 'Roo Code', body: 'Custom modes map cleanly to plan → build → test → debug. Great for learning disciplined agent use.' },
            { label: 'You want simplest onboarding', badge: 'Cline', body: 'Fewer concepts on day one. Start with Cline if agent tools feel overwhelming; graduate to Roo when you want modes.' },
            { label: 'You live on OpenRouter', badge: 'Kilo Code', body: 'Fastest OpenRouter defaults. Roo supports OpenRouter too — pick based on UI preference after a 30-minute trial.' },
            { label: 'Interview portfolio', badge: 'Any BYOK agent', body: 'Document your workflow: which mode, which model, which MCP tools. That story beats "I used Copilot autocomplete".' },
          ]} />
        </Block>
        <ProjectTask
        title="Build a feature using Architect → Code modes"
        description="Pick a small full-stack or backend task. Use Roo's Architect mode to produce a written plan and file list. Switch to Code mode and implement with approvals. Finish with Debug mode if tests fail."
        costNote="TOTAL COST: ₹0 possible — use Groq or OpenRouter free models for every mode"
      >
        <Steps color={color} items={[
            { n: '1', title: 'Install Roo Code', body: 'VS Code Marketplace → Roo Code (formerly Roo Cline). Connect an API provider or Ollama. Enable MCP if you need GitHub or docs access.' },
            { n: '2', title: 'Architect the change', body: 'In Architect mode, describe the feature and ask for a step plan with files to touch. Edit the plan until it matches your codebase conventions.' },
            { n: '3', title: 'Implement in Code mode', body: 'Switch modes and execute step-by-step. Approve diffs and terminal commands. Use checkpoints before risky refactors.' },
            { n: '4', title: 'Debug if needed', body: 'Paste failing test output into Debug mode. Let Roo trace the error — but verify the fix yourself before merging.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Roo, Cline, and Kilo Code all teach the same career-critical skill: supervising an agent instead of blindly accepting output. Employers in 2026 care less about which extension you used and more about whether you can plan, review diffs, and control API spend. Master one BYOK agent deeply — that transfers to Claude Code, Cursor, and internal company tools.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/coding/kilo-code', label: 'Kilo Code' }}
        next={{ path: '/ai-lab/coding/amazon-q', label: 'Amazon Q' }}
      />
    </ToolPageShell>
  )
}
