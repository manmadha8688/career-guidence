import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#00AFF0'

export default function IFTTTPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Automation">
      <ToolHeader
        icon="🔀"
        title="IFTTT — The Simplest Automation on the Planet"
        tagline="If This Then That — connect 900+ apps with zero code in under 2 minutes"
        badges={[['✓ FREE TIER', '#4ADE80'], ['ifttt.com', color], ['No-Code', 'var(--text-muted)']]}
        overview={"IFTTT — \"If This Then That\" — is the original consumer automation platform. Founded in 2011, it pioneered the idea that anyone (not just developers) should be able to connect apps and automate repetitive tasks. The core idea is beautifully simple: pick a trigger from one service, and an action to run in another. Done. No flowcharts, no code, no configuration overhead. With 900+ supported services — from Gmail and Instagram to smart home devices, Spotify, weather alerts, and now ChatGPT — IFTTT covers the everyday digital life of students and non-technical users better than any other tool. The free plan gives you up to 5 Applets and is genuinely useful for personal automations. For multi-step workflows or faster execution, Pro starts at $2.78/month."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'IFTTT Tutorial For Beginners (Automation Software) — Better than Zapier?', url: 'https://www.youtube.com/watch?v=Rm37IdWDiYE', dur: '~15 min', note: 'Jan 2024 — full walkthrough of applets, triggers, actions, and real use cases' },
            { label: 'How To Start Using IFTTT If This Then That For Beginners', url: 'https://www.youtube.com/watch?v=wPuxauvRbTc', dur: '~12 min', note: 'May 2024 — step-by-step setup for complete beginners, free tier walkthrough' },
            { label: 'IFTTT Tutorial | Beginner\'s Guide', url: 'https://www.youtube.com/watch?v=IRLMkV-tCKQ', dur: '~18 min', note: 'Most-watched IFTTT beginner tutorial — applet creation, smart home, social media' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="The Applet — IFTTT's core concept" color={color} />
          <InfoBox color={color}>An Applet is IFTTT's word for an automation. Every Applet has two required parts: a Trigger ("This") and an Action ("That"). The Trigger is something that happens in one service — a new Instagram post, a weather alert, a new email, a calendar event starting, your phone entering a GPS location. The Action is what IFTTT does in response — send a notification, save a file to Dropbox, add a row to a spreadsheet, turn on a smart light. Applets run automatically in IFTTT's cloud — nothing needs to stay open on your device.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>IFTTT pre-built 300,000+ community Applets that you can enable with one click. You can browse by category — social media, smart home, productivity, notifications — and enable any Applet in under 30 seconds. Creating your own custom Applet is equally fast: choose a trigger service, pick the trigger event, choose an action service, map the fields, and save. The whole flow takes under 2 minutes and requires zero technical knowledge.</p>
        </Block>
        <Block>
          <SubHead label="Popular use cases for students" color={color} />
          <CardGrid color={color} items={[
            { name: 'Social media automation', desc: 'Auto-share Instagram posts to Twitter/X. Cross-post new YouTube videos to Facebook. Save every tweet you like to a Google Sheet. Maintain social presence without manual copy-pasting across platforms.' },
            { name: 'Study & productivity alerts', desc: 'Get a daily weather notification at 7am so you dress right. Set a recurring reminder every Sunday to review your weekly goals. Trigger a phone vibration when a specific contact emails you.' },
            { name: 'Smart home shortcuts', desc: 'Turn off all smart lights when you leave home (GPS trigger). Set the thermostat when the first person arrives. Play a Spotify playlist when your morning alarm fires. IFTTT invented consumer smart home automation.' },
            { name: 'Content saving pipeline', desc: 'Save any article you star in Feedly to Pocket for offline reading. When you save a bookmark in Safari, add it to a Notion database. Build a personal knowledge base automatically without manual entry.' },
            { name: 'Gmail auto-organization', desc: 'When a new email arrives from a specific sender, add a label and forward it to a Slack channel. Auto-save Gmail attachments to Google Drive. Log every newsletter you receive to a spreadsheet for weekly review.' },
            { name: 'AI content assistant', desc: 'Use IFTTT\'s ChatGPT integration: when a new RSS article is published, send it to ChatGPT to summarize it, then post the summary to a Slack channel or save to Notion. AI-powered content curation with zero effort.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — create your first Applet" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Sign up at ifttt.com', body: "Go to ifttt.com and create a free account with Google, Apple, or email. The free plan lets you create up to 5 active Applets — enough to automate your most useful daily tasks. No credit card required." },
            { n: '2', title: 'Browse or create', body: 'Click "Explore" to browse 300,000+ pre-built community Applets organized by category. Find one you like and click "Connect" — IFTTT will ask you to link the relevant accounts (e.g. Gmail + Slack) and the Applet activates immediately. Or click "Create" to build your own.' },
            { n: '3', title: 'Choose your trigger (If This)', body: 'Search for a trigger service — Gmail, Instagram, Google Calendar, Weather Underground, YouTube, Spotify, etc. Select the trigger event: "New email from", "New post by you", "Event starts in 30 minutes", "Temperature drops below". Fill in any required trigger fields.' },
            { n: '4', title: 'Choose your action (Then That)', body: 'Search for an action service. Map any dynamic data from the trigger into the action fields using "ingredients" — these are the variables IFTTT extracts from the trigger (subject line, post URL, temperature value, etc.). You click them in — no typing required.' },
            { n: '5', title: 'Save and activate', body: "Give your Applet a name and click Finish. It's now live. IFTTT polls your trigger service every 15 minutes on the free plan (near-instant on Pro). Check the Activity log to see when it ran and what it did." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Free vs Pro — what you actually get" color={color} />
          <Compare color={color} items={[
            { label: 'Applet limit', badge: 'Free = 5, Pro = unlimited', body: 'Free plan: up to 5 active Applets at any time. Pro ($2.99/month) and Pro+ ($8.99/month) unlock unlimited Applets. For most students, 5 carefully chosen Applets cover the most valuable automations. Prioritize: 1 social cross-post, 1 smart notification, 1 content-save, 1 Gmail rule, 1 AI summary.' },
            { label: 'Multi-step Applets', badge: 'Pro+ only', body: 'The free plan and standard Pro plan only support one trigger → one action. Multi-step Applets (one trigger → multiple actions, or chained logic) require Pro or Pro+. For example: new Instagram post → post to Twitter AND save to Google Sheets AND send a Slack notification. This is the biggest limitation of the free plan.' },
            { label: 'Execution speed', badge: 'Pro is ~instant, Free is up to 1hr', body: 'Free plan Applets poll trigger services every 15 minutes to 1 hour depending on the service. Pro Applets are prioritized and run near-instantly. For time-sensitive automations (stock alerts, urgent notifications), the free tier delay can be a real problem. For save-to-spreadsheet style tasks, the delay is usually fine.' },
            { label: 'AI features & filter code', badge: 'Pro+ required for filter code', body: 'ChatGPT and Claude integrations work on free (they are just action services). Filter code — JavaScript snippets that let you add conditional logic to Applets ("only run if the email subject contains X") — requires Pro+. For basic conditional routing, you can work around this with multiple separate Applets.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="IFTTT vs Zapier vs n8n — choose the right tool" color={color} />
          <Compare color={color} items={[
            { label: 'Target audience', badge: 'Different jobs', body: 'IFTTT = consumers and students who want simple personal automations with minimal setup. Zapier = business teams automating operational workflows across SaaS tools. n8n = developers and technical teams who need custom logic, self-hosting, and unlimited scale. They rarely compete directly — most power users end up using all three for different purposes.' },
            { label: 'Ease of use', badge: 'IFTTT wins clearly', body: "IFTTT's trigger-action model is the simplest automation concept that exists. Creating an Applet takes 2 minutes from zero. Zapier adds more complexity (multi-step Zaps, filters, paths) which is powerful but slower to learn. n8n has a node-canvas that requires understanding workflow concepts. If you've never used automation tools before, start with IFTTT." },
            { label: 'App integrations', badge: 'Zapier wins (7,000+)', body: 'IFTTT: 900+ services, strong on consumer apps (Instagram, Spotify, smart home, Strava, weather, Fitbit). Zapier: 7,000+ apps, much better business software coverage (CRMs, project management, finance tools). n8n: 500+ with HTTP Request node as a universal fallback. For everyday consumer apps, IFTTT usually has what you need.' },
            { label: 'Smart home support', badge: 'IFTTT wins decisively', body: 'IFTTT invented consumer smart home automation and still dominates it. Google Home, Amazon Alexa, Philips Hue, LIFX, Nest, Ring, SmartThings — all deeply integrated. Zapier and n8n have minimal smart home support. If smart home automation is your goal, IFTTT is the only real choice.' },
            { label: 'Pricing at scale', badge: 'n8n wins (self-hosted = free)', body: 'IFTTT: $0 (5 Applets) or $2.99/month Pro. Zapier: $0 (5 Zaps, 100 tasks) or $20/month+. n8n: free self-hosted (unlimited), $24/month cloud. For students doing personal automations, IFTTT free or Pro is the most affordable. For business-scale, n8n self-hosted wins on cost.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="AI integrations — IFTTT meets ChatGPT and Claude" color={color} />
          <InfoBox color={color}>IFTTT now connects to ChatGPT (OpenAI), Claude (Anthropic), and DeepSeek as action services. This means you can use any IFTTT trigger to send data to an AI model and use the response in a subsequent action. IFTTT also offers an MCP (Model Context Protocol) integration — your AI assistant can directly trigger IFTTT Applets from a conversation. An official IFTTT Automation Assistant GPT on ChatGPT lets you manage Applets directly from the ChatGPT interface.</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'AI content summarizer', body: "Trigger: New RSS item from your favorite tech blog. Action: Send article text to ChatGPT with prompt 'Summarize this in 3 bullets'. Second action (Pro): Post summary to Slack or save to Notion. You get daily AI-curated digests without reading every article." },
            { n: '2', title: 'Smart email digest', body: "Trigger: New starred email in Gmail. Action: Send email body to ChatGPT with prompt 'Extract the key action items from this email'. Second action (Pro): Create a task in Todoist or append to a Google Doc. Your inbox turns into a task list automatically." },
            { n: '3', title: 'Social media AI writer', body: "Trigger: New photo posted to Instagram. Action: Send caption to ChatGPT with prompt 'Rewrite this caption for a LinkedIn professional audience, keep under 200 chars'. Second action: Post the AI-rewritten version to LinkedIn. One post, two platforms, two tones." },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span>
            <span className="tool-layout-task__label">PROJECT — Create 3 Useful Personal Automations</span>
          </div>
          <p className="tool-layout-task__desc">Build three real Applets that solve actual friction in your daily life. Use all 5 free Applet slots strategically — these three are proven to be immediately useful for students. Once they're running, you'll feel the difference within a week.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Morning weather alert', body: "Create Applet → Trigger: Weather Underground 'Today's weather report' → fires every day at 7:00 AM. Action: Notifications 'Send a rich notification' with the day's forecast. You'll never leave home underdressed again. Takes 90 seconds to set up." },
            { n: '2', title: 'Auto-save social posts to Google Sheets', body: "Trigger: Instagram 'New photo post by you'. Action: Google Sheets 'Add row to spreadsheet'. Map fields: Date, Caption, Image URL, Likes count. After a month you'll have a personal analytics sheet of everything you posted — zero manual work." },
            { n: '3', title: 'RSS to Pocket reading list', body: "Pick one blog or news site you want to keep up with. Trigger: RSS Feed 'New feed item' (enter the RSS URL). Action: Pocket 'Save for later'. Every new article automatically lands in your Pocket reading list. Read on your commute, offline, on any device." },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE TIER: 3 Applets uses only 60% of your 5 free slots — save the other 2 for personal ideas you discover later</span></div>
        </div>
        <ProTip>
        {"IFTTT is the best first automation tool to learn because it teaches the trigger-action mental model without any distracting complexity. Once you understand 'something happens → something else happens automatically', you're ready to graduate to Zapier (for business tools) or n8n (for custom logic and scale). Think of IFTTT as your automation kindergarten — simple, friendly, and surprisingly powerful for everyday life. Many professionals still use IFTTT alongside Zapier and n8n because some consumer app integrations (smart home, fitness trackers, social media) exist only in IFTTT."}
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/automation/zapier', label: 'Zapier' }}
        next={{ path: '/ai-lab/local/ollama', label: 'Ollama' }}
      />
    </ToolPageShell>
  )
}
