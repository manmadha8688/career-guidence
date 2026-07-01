import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F97316'

export default function ZapierPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Automation">
      <ToolHeader
        icon="⚡"
        title="Zapier — Automate Your Workflow Without Writing Code"
        tagline="Connect 7,000+ apps and add AI to any automation"
        badges={[['✓ FREE tier', '#4ADE80'], ['7,000+ integrations', color], ['No-code automation', 'var(--text-muted)']]}
        overview={"Zapier is the most widely used no-code automation platform — with over 7,000 app integrations, it connects virtually any two services without writing code. A \"Zap\" is an automated workflow: a trigger in one app causes an action in another. When a new row is added to Google Sheets, send a Slack message. When a form is submitted, create a Trello card and send an email. Zapier added AI steps in 2023-2024 — you can now add ChatGPT, Claude, or Gemini as processing steps in any Zap, letting you transform, analyze, and generate content as part of your automations. The free plan includes 5 Zaps with 100 tasks per month — enough for learning and simple personal automations. Zapier's value is its breadth: if an app exists, Zapier probably supports it."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Zapier Agents: The Only Tutorial You\'ll Ever Need — Liam Ottley', url: 'https://www.youtube.com/watch?v=VVQoGo0hYss', dur: '~30 min', note: 'Morningside AI founder — Zapier AI Agents complete walkthrough 2025' },
            { label: 'How to Automate Work With AI Agents and Workflows in Zapier', url: 'https://www.youtube.com/watch?v=dwhEdN51PZU', dur: '~20 min', note: 'AI Agents vs AI Workflows — when to use each and how to build both' },
            { label: 'Automate Your Life — Complete Zapier Agent & Automation Course', url: 'https://www.youtube.com/watch?v=-leIp449qXA', dur: '4 hrs', note: 'freeCodeCamp — zero to advanced, AI automations + MCP server integration' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How Zapier works" color={color} />
          <InfoBox color={color}>Every Zap has two parts: a Trigger (something that happens in one app — new email, form submission, new calendar event, new database row) and one or more Actions (things that happen in response — send message, create record, update spreadsheet, call API). When the trigger fires, Zapier automatically runs all the actions. The whole thing runs in Zapier's cloud — no server required.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>Zapier's AI steps changed the platform from simple data routing to intelligent automation. Add a "ChatGPT" action between trigger and output: receive a support email (trigger) → use ChatGPT to classify it as billing, technical, or general and draft a response (AI step) → route to the right Slack channel and send the draft to the support rep (actions). Tasks that previously required custom backend code now take 10 minutes to set up with Zapier.</p>
        </Block>
        <Block>
          <SubHead label="Common automation patterns" color={color} />
          <CardGrid color={color} items={[
            { name: 'Form → notification', desc: 'Google Forms or Typeform submission → Slack notification or email. Every form fill appears in a channel immediately. Add an AI step to summarize or classify the submission.' },
            { name: 'Email → task', desc: 'New email matching a filter → create Trello/Asana/Notion task with email details. AI step: extract action items from the email body and add them as task description.' },
            { name: 'Sheet → outreach', desc: 'New row in Google Sheets → send personalized email or LinkedIn connection request. AI step: personalize the message using data from the row.' },
            { name: 'Social → content', desc: 'New RSS feed item → generate summary with AI → post to Twitter/LinkedIn/Slack. Content pipeline that runs automatically without manual curation.' },
            { name: 'Meeting → notes', desc: 'Calendar event ends → trigger a Zap → AI step transcribes/summarizes the meeting notes → creates Notion page and sends recap email to attendees.' },
            { name: 'Support → routing', desc: 'New Zendesk ticket → AI classifies urgency and category → routes to the right team in Slack with priority badge. Intelligent triage without manual review.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Building your first Zap" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Sign up and choose a trigger', body: 'zapier.com → Create Zap. Search for your trigger app (Gmail, Google Forms, Notion, Slack). Choose the trigger event (New Email, New Form Response, etc.). Connect your account via OAuth.' },
            { n: '2', title: 'Configure the trigger', body: 'Set filters if needed — only trigger on emails with a specific label, forms from a specific form, etc. Click Test Trigger to pull in real sample data from your connected account.' },
            { n: '3', title: 'Add an AI step (optional)', body: "Add Action → search 'ChatGPT' or 'AI by Zapier'. Choose an action like 'Send Message' or 'Extract Data'. Write a prompt that uses data from the trigger: 'Classify this support email as billing, technical, or general: {{trigger.body}}'" },
            { n: '4', title: 'Add the output action', body: 'Add another action — Slack, Gmail, Notion, Trello, Google Sheets, etc. Map the fields from previous steps into the action fields. The AI step output appears as a variable you can use.' },
            { n: '5', title: 'Test and turn on', body: 'Test each step with real data. Fix any mapping errors. Turn the Zap on. It now runs automatically every time the trigger fires. Monitor the first few runs in the Zap history.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Zapier vs n8n — when to use each" color={color} />
          <Compare color={color} items={[
            { label: 'Setup complexity', badge: 'Zapier wins', body: "Zapier: sign up, connect apps, done. Fully hosted with no infrastructure. n8n: requires running a local instance (Docker/npm) or paying for n8n Cloud. For anyone non-technical or for quick personal automations, Zapier's zero-setup is a major advantage." },
            { label: 'Cost at scale', badge: 'n8n wins', body: 'Zapier free: 100 tasks/month. Zapier paid: starts at $20/month for 750 tasks. At higher volumes (1000s of tasks), Zapier costs compound significantly. n8n self-hosted: unlimited tasks, no per-execution cost. For high-volume automations, n8n is dramatically cheaper.' },
            { label: 'App integrations', badge: 'Zapier wins clearly', body: 'Zapier: 7,000+ apps. n8n: 500+ apps. For connecting less common business tools (CRMs, niche SaaS products, enterprise software), Zapier almost certainly has the integration you need. n8n may not.' },
            { label: 'Custom logic', badge: 'n8n wins', body: "n8n supports full JavaScript/Python in any node. Zapier's code step is limited and the overall platform is designed for simple trigger-action patterns. For automations with complex branching, data transformation, or custom API calls, n8n handles it better." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Zapier AI Steps — practical uses" color={color} />
          <InfoBox color={color}>{"Zapier's AI steps use OpenAI's API under the hood. You do not need your own OpenAI key — Zapier includes AI step credits in its plans. The AI step appears as a regular action in your Zap: configure a prompt, map in data from previous steps as variables, use the output in subsequent actions. The simplicity is the point."}</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Classify and route', body: "AI prompt: 'Classify this support ticket as: BILLING, TECHNICAL, ACCOUNT, or OTHER. Reply with only the category word.' Use the output to route to different Slack channels with Filter steps." },
            { n: '2', title: 'Summarize content', body: "AI prompt: 'Summarize this article in 3 bullet points: {{article_text}}'. Use the summary in a Slack message or email digest. Works for newsletters, reports, research papers." },
            { n: '3', title: 'Extract structured data', body: "AI prompt: 'Extract the name, email, company, and budget from this inquiry: {{form_response}}. Reply as JSON.' Parse the JSON in a subsequent step to populate different fields in your CRM." },
            { n: '4', title: 'Generate personalized content', body: "AI prompt: 'Write a personalized follow-up email for {{name}} from {{company}} who is interested in {{product}}. Keep it under 100 words, professional tone.' Use the output in a Gmail send action." },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Connect any two apps you use daily and automate the data transfer between them',
            'Add AI processing to any automation — classify, summarize, extract, or generate content in the middle of a workflow',
            'Build personal productivity automations: digest emails, route notifications, log activities automatically',
            'Create content pipelines that automatically summarize, transform, and distribute content across platforms',
            'Automate repetitive tasks that currently require you to copy-paste data between apps',
        ]} />
      </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span>
            <span className="tool-layout-task__label">PROJECT — Build a Job Application Tracker</span>
          </div>
          <p className="tool-layout-task__desc">Create a Zapier workflow that automatically tracks your job applications. When you receive an email from a company you applied to: (1) an AI step extracts the company name, role, and response type (interview invite, rejection, follow-up needed, waiting), (2) a Google Sheets step adds a row with this data + date. After building it, apply to 10 companies over a week and let the automation populate your tracker. This is a real tool you will use.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Set up the Gmail trigger', body: "Create Zap → Gmail trigger → New Email. Filter by label if you have a 'Job Applications' label, or leave unfiltered and let AI classify. Test with a real application email." },
            { n: '2', title: 'Add AI extraction step', body: "Add Action → AI by Zapier → Analyze Text. Prompt: 'From this email, extract: Company Name, Job Title, Response Type (INTERVIEW_INVITE/REJECTION/FOLLOW_UP/OTHER/WAITING). Reply as JSON with keys: company, title, response_type.' Input: {{email body}}." },
            { n: '3', title: 'Add Google Sheets step', body: 'Add Action → Google Sheets → Create Spreadsheet Row. Map fields: Date (today), Company (from AI output), Role (from AI output), Status (from AI output), Email Subject. Set up the spreadsheet with those column headers first.' },
            { n: '4', title: 'Test and activate', body: 'Send yourself a test email mimicking a job application response. Run through all steps. Verify the sheet row is created correctly. Activate the Zap. Apply for jobs and watch your tracker populate automatically.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE TIER: 5 Zaps, 100 tasks/month — this project fits comfortably within the free plan</span></div>
        </div>
        <ProTip>
        {"Zapier's free tier resets monthly and gives you 100 task executions. Each step in a Zap counts as one task — a 3-step Zap uses 3 tasks per execution. For automations that run frequently (every hour) or with many steps, this limit is reached quickly. Prioritize your 5 free Zaps for automations that run less frequently but save significant manual time. For high-frequency automations, n8n self-hosted is more practical."}
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/automation/dify', label: 'Dify' }}
        next={{ path: '/ai-lab/local/ollama', label: 'Ollama' }}
      />
    </ToolPageShell>
  )
}
