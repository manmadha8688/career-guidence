import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F97316'

export default function N8NPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Automation">
      <ToolHeader
        icon="⚙️"
        title="n8n — Open-Source Workflow Automation with AI"
        tagline="Connect any app to any AI model with visual workflow builder"
        badges={[['✓ FREE self-host', '#4ADE80'], ['500+ integrations', color], ['Visual + code', 'var(--text-muted)']]}
        overview={"n8n is an open-source workflow automation platform — think Zapier, but self-hosted, free, and with native AI capabilities built in. You build workflows visually by connecting nodes: a trigger (webhook, schedule, email received), processing steps (AI model call, data transformation, conditional logic), and actions (send Slack message, update database, create calendar event). n8n's AI nodes support OpenAI, Anthropic, Google Gemini, and local models via Ollama — letting you build AI-powered automations without writing backend code. Self-hosted means you run it on your own machine or a cheap server, paying nothing for the software. For developers, n8n also supports writing custom JavaScript or TypeScript in any node — the best of visual and code approaches."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'n8n Masterclass: Build AI Agents & Automate Workflows — Nate Herk', url: 'https://www.youtube.com/watch?v=ZbIVOy_GPyQ', dur: '~90 min', note: '#1 n8n creator — beginner to pro, AI agents + real workflows' },
            { label: 'N8N FULL COURSE — Build & Sell AI Automations + Agents', url: 'https://www.youtube.com/watch?v=2GZ2SNXWK-c', dur: '6 hrs', note: '19+ real-world agents — RAG, support bots, invoice processors, voice AI' },
            { label: 'Build AI Agents with n8n — Complete Beginner Automation Course 2025', url: 'https://www.youtube.com/watch?v=UtXzdmpysmU', dur: '~3 hrs', note: 'JavaScript Mastery — core n8n + AI integrations + Inbox Manager project' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why n8n over Zapier" color={color} />
          <InfoBox color={color}>n8n is free to self-host with no per-task pricing. Zapier charges per "zap execution" — at scale, automation costs compound quickly. n8n also allows custom JavaScript in any node, handles complex data transformations that Zapier cannot express, and has native AI model integration. The tradeoff: Zapier is hosted and zero-maintenance; n8n requires running your own instance (trivial with Docker).</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The AI integration is n8n's current strongest differentiator. AI Agent nodes, LLM Chain nodes, and vector store nodes are built in — you can build a complete RAG pipeline visually: receive a user message via webhook → embed it → search ChromaDB → pass retrieved context + question to OpenAI → return answer. No code. This visual AI workflow approach makes building AI-powered automations accessible to people who understand the concepts but do not want to write Python.</p>
        </Block>
        <Block>
          <SubHead label="Core node types" color={color} />
          <CardGrid color={color} items={[
            { name: 'Trigger nodes', desc: 'Start a workflow: webhook (HTTP call), schedule (cron), email received, new file in Google Drive, new row in database. Every workflow starts with a trigger.' },
            { name: 'AI Agent node', desc: 'A complete LangChain agent with tool use. Give it tools (web search, HTTP request, database query) and it autonomously uses them to complete a task. No code required.' },
            { name: 'LLM Chain node', desc: 'Send a prompt to any LLM (OpenAI, Anthropic, Groq, Ollama). Chain multiple LLM calls. Pass data from previous nodes into prompts dynamically.' },
            { name: 'Vector Store nodes', desc: 'Store embeddings in Pinecone, Qdrant, or Supabase. Query vector stores. Build visual RAG pipelines without writing Python.' },
            { name: 'Code node', desc: 'Write JavaScript or Python directly in any node. Full access to node input data, npm packages, and Python libraries. For anything the visual nodes cannot express.' },
            { name: 'HTTP Request node', desc: 'Call any REST API. Set method, headers, body, authentication. n8n can integrate with any service that has an API, even ones without built-in nodes.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Setting up n8n locally" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Install with Docker (recommended)', body: 'docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n\nOpen http://localhost:5678 in your browser. Create your account. n8n is now running locally.' },
            { n: '2', title: 'Or install with npm', body: 'npm install n8n -g\nn8n start\nSame result, no Docker needed. npm install takes longer but works without Docker Desktop.' },
            { n: '3', title: 'Connect your first service', body: 'Add a credential: Settings → Credentials → Add Credential. Search for Gmail, Slack, OpenAI, etc. Follow the OAuth or API key setup. Credentials are stored encrypted locally.' },
            { n: '4', title: 'Import a template workflow', body: 'n8n.io/workflows has hundreds of pre-built templates. Import any template with one click. This is the fastest way to see a working workflow and understand node patterns.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Building an AI workflow" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Add a webhook trigger', body: 'Add Webhook node → copy the test URL → this is the endpoint that starts your workflow. Test it with a POST request from Postman or curl.' },
            { n: '2', title: 'Add an LLM Chain node', body: 'Connect the webhook output to an LLM Chain node. Set the model (OpenAI, Groq, Anthropic). Write a system prompt. Use {{ $json.body.message }} to insert the webhook payload dynamically.' },
            { n: '3', title: 'Add processing logic', body: 'Between nodes: IF node for conditional branching, Set node to reshape data, Function node for custom JavaScript. The node graph is your application logic.' },
            { n: '4', title: 'Add an output action', body: 'Send the LLM response via Slack, email, or HTTP response to the webhook caller. Actions are nodes just like triggers — search for the service, connect credentials, configure the action.' },
            { n: '5', title: 'Activate and test', body: 'Toggle the workflow to Active. Now it runs every time the trigger fires. Use the execution log to see every run — inputs, outputs, and errors at each node.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="n8n vs Zapier vs Make" color={color} />
          <Compare color={color} items={[
            { label: 'n8n', badge: 'Best for developers', body: 'Free to self-host, unlimited executions, custom code in any node, built-in AI nodes, handles complex data. Requires running your own instance (Docker or npm). Best when you need power and control over cost.' },
            { label: 'Zapier', badge: 'Easiest to start', body: 'Fully hosted, 7,000+ app integrations, zero setup. Paid per task execution — costs add up at scale. Limited to built-in node logic, no custom code. Best for simple automations where simplicity beats cost.' },
            { label: 'Make (formerly Integromat)', badge: 'Middle ground', body: 'Hosted, cheaper than Zapier, handles complex scenarios better. Good for teams needing hosted automation with more power than Zapier. n8n self-hosted is typically still cheaper for high-volume automations.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Build AI-powered automations without writing backend code — visual pipeline for the full RAG flow',
            'Connect 500+ services (Gmail, Slack, GitHub, Notion, databases) to AI models in a visual editor',
            'Create webhooks that trigger AI workflows from any external service or your own application',
            'Build scheduled jobs that run AI analysis on data, generate reports, and send results automatically',
            'Self-host with Docker for zero ongoing software cost and full data privacy',
        ]} />
      </Block>
        <ProjectTask
        title={"Build an AI Email Summarizer"}
        description={"Create an n8n workflow that: (1) triggers when a new email arrives in Gmail (or polls every 30 minutes), (2) sends the email subject + body to an LLM to generate a 3-sentence summary and priority rating (high/medium/low), (3) sends the summary to a Slack channel (or writes to a Google Sheet). This is a real productivity automation that runs 24/7 once deployed."}
        costNote={"TOTAL COST: ₹0 — n8n self-hosted is free software; only LLM API calls cost money"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Set up n8n and connect Gmail', body: 'Run n8n locally with Docker. Add Gmail OAuth credential. Add Google Sheets or Slack credential. Test each connection independently before building the workflow.' },
            { n: '2', title: 'Build the trigger', body: 'Gmail trigger node → set to poll every 15 minutes for unread emails. Configure filters if needed (specific label, sender, subject pattern). Test with one real email.' },
            { n: '3', title: 'Add the LLM summarization', body: "LLM Chain node → system prompt: 'You are an email assistant. Summarize emails concisely in 3 sentences. Rate priority as HIGH, MEDIUM, or LOW based on urgency and action required.' Dynamic prompt includes {{$json.subject}} and {{$json.text}}." },
            { n: '4', title: 'Route the output', body: 'Add a Slack message node or Google Sheets append node. Format the message: Subject, Priority badge, Summary. Activate the workflow and let it run on your real inbox for one day.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Use n8n's built-in execution history to debug workflows. Every execution saves the input and output of every node. When a workflow fails or produces wrong output, open the failed execution and click through each node to see exactly what data was present at each step. This is dramatically faster than print-statement debugging — you see the full data flow visually.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/agents/mcp', label: 'MCP' }}
        next={{ path: '/ai-lab/automation/flowise', label: 'Flowise' }}
      />
    </ToolPageShell>
  )
}
