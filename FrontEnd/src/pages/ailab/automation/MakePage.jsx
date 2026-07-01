import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F97316'

export default function MakePage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Automation">
      <ToolHeader
        icon="🔄"
        title="Make — Visual Automation That's 13x Cheaper Than Zapier"
        tagline="Build complex AI workflows on a flowchart canvas — no code, 1,000 free operations/month"
        badges={[['✓ FREE TIER', '#4ADE80'], ['1,000 ops/month free', color], ['make.com', 'var(--text-muted)']]}
        overview={"Make (formerly Integromat) is a visual no-code automation platform that lets you connect apps and build workflows on a flowchart canvas — where each circle represents an action in a service like Gmail, Notion, Slack, or an AI model like ChatGPT. The critical difference from Zapier: Make's free tier gives 1,000 operations per month versus Zapier's 100, and the first paid tier at $9/month provides 10,000 operations versus Zapier's $19.99/month for 750. Make handles complex logic — branches, loops, error handling, iterating through lists — that Zapier cannot express without expensive workarounds. For students building automation projects or AI-powered workflows, Make is the visual platform that gives you genuine power without writing backend code."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Make Automation and ChatGPT — Beginner\'s Guide To AI Automation | Tutorial For 2024', url: 'https://www.youtube.com/watch?v=iDxDVPUSQW8', dur: 'Beginner', note: 'AI automation with Make + ChatGPT' },
            { label: 'Make.com Automation Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=JSA2oezQWOU', dur: 'May 2024', note: 'Beginner tutorial — full walkthrough' },
            { label: 'Master Make.com in 2 Hours: Complete Beginner\'s Guide', url: 'https://www.youtube.com/watch?v=MpmpC4C5fZs', dur: '2 hrs', note: 'Comprehensive guide — covers all core features' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Core concepts" color={color} />
          <InfoBox color={color}>Everything in Make happens inside a Scenario — a visual flowchart you build on a canvas. Each circle is a Module: an action like "Watch new email" (a trigger), "Send a message" (an action), or "Call OpenAI" (an AI step). When a trigger fires, Make executes all the modules in sequence. Each module execution counts as one Operation — your monthly billing unit. 1,000 free operations means 1,000 total module executions across all your scenarios.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>What separates Make from Zapier at the technical level is its handling of complex data flows. When a trigger returns a list of items — 5 new emails, 10 new spreadsheet rows, a JSON array from an API — Make's Iterator module processes each item individually through a sub-flow, then its Aggregator combines results back into a single output. Zapier handles lists clumsily; this pattern is native in Make. For AI workflows where you process batches of items (classify 10 emails, summarize 20 articles), this makes a real difference.</p>
        </Block>
        <Block>
          <SubHead label="Building your first scenario" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Sign up and open a new scenario', body: 'make.com → free signup, no credit card. Dashboard → Create a new scenario. You see the canvas — a blank workspace where you will drag and connect modules. Click the + button in the center to add your first module.' },
            { n: '2', title: 'Add a trigger module', body: 'Search for your trigger app (Gmail, Google Sheets, Webhook, Schedule). Choose the trigger event ("Watch new emails", "New spreadsheet row", "Incoming webhook"). Connect your account via OAuth. Click Run once to fetch a test event — this is the sample data all later modules can use.' },
            { n: '3', title: 'Add an AI processing module', body: 'Click the + after your trigger. Search "OpenAI". Choose "Create a Completion" or "Create a Message". Write your prompt in the message field. Use the data panel on the left to insert values from the trigger — click any field to insert it dynamically. Example: summarize {{1.subject}} + {{1.body}} (values from email trigger).' },
            { n: '4', title: 'Add an output module', body: 'Click + after the AI module. Search for your output app (Slack, Notion, Gmail, Google Sheets). Choose the action ("Send a message", "Create a page", "Add a row"). Map the AI output into the output fields — drag from the data panel or type {{ to insert values.' },
            { n: '5', title: 'Test, schedule, and activate', body: 'Click Run once to execute the scenario with your test data. Check each module\'s output in the execution log. Fix any mapping errors. Set a schedule (every 15 minutes, every hour, daily). Toggle the scenario Active. It now runs automatically.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Make vs Zapier vs n8n" color={color} />
          <Compare color={color} items={[
            { label: 'Make', badge: 'Best value, visual power', body: '1,000 free ops/month (10x Zapier). $9/month for 10,000 ops (13x more than Zapier\'s $19.99/750). Visual flowchart handles branching, loops, iterators — things Zapier cannot do cleanly. 1,500+ app integrations. Best for students who want visual and power without developer overhead.' },
            { label: 'Zapier', badge: 'Simplest for basics', body: '100 free tasks/month. $19.99/month for 750 tasks. Linear step-by-step builder — easiest to use for simple 2-step automations. 7,000+ integrations (most of any platform). Best when: you just need a simple trigger → action and want zero learning curve.' },
            { label: 'n8n', badge: 'Best for developers', body: 'Free self-hosted (unlimited). $20/month cloud. 400+ native nodes + HTTP for any API. Full JavaScript and Python code in any node. AI agent workflows built in. Fastest runtime (~2.2s). Best when: you are comfortable with code and want maximum flexibility and control.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="AI workflows you can build" color={color} />
          <CardGrid color={color} items={[
            { name: 'Email classification pipeline', desc: 'Gmail trigger → OpenAI "classify this email as billing/technical/general/other" → route to different Slack channels based on the AI classification. No backend code needed.' },
            { name: 'Content summarizer', desc: 'RSS feed trigger (new article) or Notion webhook → OpenAI summarize in 3 bullet points → append to Notion database → post to Slack or Discord. Runs every hour automatically.' },
            { name: 'Job application tracker', desc: 'Watch Gmail for job application responses → OpenAI extract company name, role, response type (interview/rejection/follow-up) → add row to Google Sheets job tracker. AI-powered inbox parsing.' },
            { name: 'Study note publisher', desc: 'Notion trigger (new page in study notes database) → OpenAI generate 5 key points from the content → create a Notion summary card → post to Discord study server.' },
            { name: 'GitHub → Slack alerts', desc: 'GitHub webhook (new PR, new issue, new comment) → format message with branch name, author, description → send to team Slack with color-coded priority. Team project coordination.' },
            { name: 'Form to everything', desc: 'Google Forms submission → OpenAI classify or extract data from the response → route to Airtable (CRM), calendar (if meeting request), or email (if contact form). One form, intelligent routing.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Free tier strategy" color={color} />
          <InfoBox color={color}>1,000 free operations sounds like a lot — but a 4-module scenario running every 15 minutes uses 4 ops × 4 runs/hour × 24 hours = 384 ops/day. A busy scenario can exhaust the free tier in 2-3 days. Plan which scenarios run frequently vs. which can run hourly or daily. Most student projects running 2-3 scenarios on hourly/daily schedules fit comfortably within the free tier.</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Match execution frequency to need', body: 'Not every scenario needs to run every 15 minutes. Email summaries? Run hourly. Job tracker? Run every 6 hours. Study note publisher? Run when you add a note (webhook trigger, not scheduled). Match frequency to actual need.' },
            { n: '2', title: 'Use webhooks instead of polling', body: 'Polling ("watch for new emails every 15 min") uses operations even when there is nothing new. Webhook triggers fire only when something actually happens — zero wasted operations. When your apps support webhooks, prefer them over polling.' },
            { n: '3', title: 'Test with "Run once" before activating', body: 'Use "Run once" to test your scenario with real data before setting it to active. A buggy scenario running on a schedule wastes operations on every failed run. Get it working first, then activate.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Build AI-powered automation workflows visually without writing any backend code',
            'Connect 1,500+ apps to AI models (ChatGPT, Claude, Gemini) in scenarios that run automatically',
            'Process batches of items — emails, rows, articles — through AI and route results intelligently',
            'Get 10x more free automation than Zapier\'s free tier with the same zero-code approach',
            'Build impressive portfolio projects: automated job trackers, content pipelines, AI email routers',
        ]} />
      </Block>
        <ProjectTask
        title={"Build an AI-Powered Content Summary Bot"}
        description={"Create a Make scenario that watches an RSS feed from a blog you like (tech news, programming blogs, AI news), sends each new article to OpenAI for a 3-bullet-point summary, and posts the summary to a Discord channel or Notion database. Run it every 6 hours. This is a real tool you will actually use — and a portfolio project that demonstrates automation + AI integration without a single line of code."}
        costNote={"TOTAL COST: ₹0 — Make free tier + OpenAI free credits on signup, no credit card required"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Set up Make account and Discord/Notion', body: 'make.com → free signup. Set up a Discord server (or Notion workspace) if you do not have one. Find an RSS feed URL for a source you care about (most blogs have /feed or /rss). Collect: RSS URL, Discord webhook URL or Notion API key.' },
            { n: '2', title: 'Build: RSS → OpenAI → output', body: 'New scenario → RSS module (Watch RSS feed items) → OpenAI module (Create completion, prompt: "Summarize this article in 3 bullet points: {{title}} {{content}}") → Discord Send Message or Notion Create Page module. Map OpenAI output to the message/content field.' },
            { n: '3', title: 'Test with Run once', body: 'Click Run once. Make fetches the latest RSS item, sends it to OpenAI, and posts the summary. Check each module output in the execution log. Does the summary make sense? Is the Discord message formatted correctly?' },
            { n: '4', title: 'Schedule and activate', body: 'Set to run every 6 hours. Toggle Active. Leave it running for a week. Review the summaries — are they useful? Adjust the OpenAI prompt if the quality is off. This iterative refinement is how real automation projects improve.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Make's scenario history (the Execution Log) is the most underused debugging tool. Every scenario run — success or failure — saves the complete input and output of every module. When something goes wrong, click the failed run in the history and see exactly what data entered each module and what error occurred. This is dramatically faster than adding print statements or re-running from scratch. Check the execution log before anything else when a scenario produces unexpected results.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/automation/zapier', label: 'Zapier' }}
        next={{ path: '/ai-lab/automation/n8n', label: 'n8n' }}
      />
    </ToolPageShell>
  )
}
