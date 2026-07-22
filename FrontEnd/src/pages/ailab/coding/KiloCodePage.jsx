import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#22C55E'

export default function KiloCodePage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Coding">
      <ToolHeader
        icon="⚖️"
        title="Kilo Code — Open-Source VS Code Agent (OpenRouter #2)"
        tagline="Bring your own API key — OpenRouter, Groq, Gemini free tier, or Ollama"
        badges={[['✓ FREE Extension', '#4ADE80'], ['kilocode.ai', color], ['Open Source', 'var(--text-muted)']]}
        overview={"Kilo Code is a free open-source AI coding agent for VS Code — in the same family as Cline and Roo Code, but tuned for fast setup and OpenRouter integration. On OpenRouter's live app rankings it consistently sits near the top of real-world usage: developers route agent workloads through OpenRouter and Kilo Code is one of the most popular clients. Like Cline, Kilo reads your repo, edits files, runs terminal commands, and asks for approval before each action. The extension itself costs nothing — you pay only your chosen API provider, and students can run at $0 using Groq's free tier, Google AI Studio, or local Ollama models."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Kilo Code — VS Code AI Agent Setup (OpenRouter + free models)', url: 'https://www.youtube.com/results?search_query=kilo+code+vs+code+openrouter', dur: 'YouTube', note: 'Search for the latest setup walkthrough — install, API key, first task' },
            { label: 'Cline vs Roo vs Kilo — which BYOK agent to pick?', url: 'https://www.youtube.com/results?search_query=cline+roo+kilo+code+comparison', dur: 'YouTube', note: 'Compare agentic VS Code extensions before committing to one workflow' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why students pick Kilo Code" color={color} />
          <InfoBox color={color}>Kilo Code is ideal when you already use OpenRouter (one key, dozens of models) or want the fastest path from install to first working agent task. You are not locked into a $20/month IDE subscription — you keep VS Code, your extensions, and your keybindings. Swap models in settings when a cheaper or smarter model appears, without migrating projects.</InfoBox>
          <CardGrid color={color} items={[
            { name: 'OpenRouter-first', desc: 'First-class OpenRouter support — one API key unlocks free Llama, Gemma, Qwen Coder, and paid Claude/GPT when you need them.' },
            { name: 'Full repo context', desc: 'Indexes your workspace, proposes multi-file edits, and runs shell commands with your approval — not just inline completions.' },
            { name: 'BYOK = student budget', desc: 'Extension free forever. Pair with Groq free tier or OpenRouter :free models for homework and portfolio projects at zero cost.' },
            { name: 'Same agent skills as Cline', desc: 'Plan → act workflows, checkpoints, MCP tools, browser automation — the agentic patterns employers expect in 2026.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Kilo Code vs Cline vs Roo Code" color={color} />
          <Compare color={color} items={[
            { label: 'Best for OpenRouter users', badge: 'Kilo Code', body: 'If your stack already uses OpenRouter for model routing, Kilo is the shortest setup path. Copy one key from openrouter.ai/keys and start.' },
            { label: 'Most mature ecosystem', badge: 'Cline', body: 'Cline has the longest track record and largest VS Code Marketplace install base. Pick Cline when you want maximum community tutorials.' },
            { label: 'Most features / modes', badge: 'Roo Code', body: 'Roo Code (Cline fork) adds extra modes, marketplace integrations, and rapid experimentation. Power users who outgrow Cline often land here.' },
            { label: 'Student budget', badge: 'All three win', body: 'All are free extensions + BYOK. Your cost is API usage only — controllable with free tiers. Try all three on the same repo; keep the UX you prefer.' },
          ]} />
        </Block>
        <ProjectTask
        title="Ship a feature with Kilo Code + OpenRouter free models"
        description="Use Kilo Code to implement one small feature in an existing repo (e.g. add search to a React list, add validation to a Spring endpoint). Route through an OpenRouter free model so total cost stays ₹0."
        costNote="TOTAL COST: ₹0 — Kilo extension free + OpenRouter free tier (200 req/day)"
      >
        <Steps color={color} items={[
            { n: '1', title: 'Install & connect', body: 'Install Kilo Code from the VS Code Marketplace. Create a key at openrouter.ai/keys. Paste into Kilo settings with base URL https://openrouter.ai/api/v1. Pick a free model ID ending in :free.' },
            { n: '2', title: 'Plan before code', body: 'Ask Kilo to outline steps without editing files. Review the plan — fix wrong file paths or assumptions while cost is still zero.' },
            { n: '3', title: 'Approve each edit', body: 'Let Kilo implement one step at a time. Read diffs like a code review. Reject bad changes early instead of rolling back a mess.' },
            { n: '4', title: 'Commit like a pro', body: 'When tests pass, commit with a clear message. Note which model you used — interviewers love hearing how you controlled cost and quality.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Check openrouter.ai/rankings#apps monthly — the top apps list reflects what working developers actually use, not hype. Kilo Code, Cline, Claude Code, and OpenClaw stay high because agent workflows dominate real token volume. Align your learning with that list and you learn employable skills, not toy demos.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/coding/cline', label: 'Cline' }}
        next={{ path: '/ai-lab/coding/roo-code', label: 'Roo Code' }}
      />
    </ToolPageShell>
  )
}
