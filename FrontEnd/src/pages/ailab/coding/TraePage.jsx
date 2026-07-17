import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#6D28D9'

export default function TraePage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Coding">
      <ToolHeader
        icon="🧩"
        title="Trae — ByteDance's AI IDE (Free Cursor Alternative)"
        tagline="A VS Code-based AI editor with premium models included and no API keys to manage"
        badges={[['✓ Free tier', '#4ADE80'], ['trae.ai', color], ['By ByteDance', 'var(--text-muted)'], ['VS Code-based', '#0EA5E9']]}
        overview={"Trae is an AI-powered code editor from ByteDance (the company behind TikTok), built on the familiar VS Code foundation so it feels instantly comfortable and supports VS Code extensions. Its pitch has always been \"a free Cursor alternative\": premium AI models bundled in with no API keys to set up, plus agentic features like Builder Mode (scaffold a whole project from a prompt) and SOLO mode (a fully autonomous coding agent). Since February 2026 Trae uses a token-based pricing model with five tiers — a free plan plus Lite ($3), Pro ($10), Pro+ ($30) and Ultra ($100) per month. The free tier is real but metered: roughly 5,000 autocompletions a month and a small monthly allowance of premium-model requests. For an Indian student who wants a polished, Cursor-like AI editor without paying up front — and without wiring up their own API keys — Trae is one of the easiest on-ramps. The one thing to weigh is that it is a ByteDance product, so be mindful of what code you send through it."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Trae AI IDE — full walkthrough and first project', url: 'https://www.youtube.com/results?search_query=trae+ai+ide+tutorial', dur: 'search', note: 'Install Trae, use Builder Mode, and build an app with bundled models' },
            { label: 'Trae SOLO mode — the autonomous agent explained', url: 'https://www.youtube.com/results?search_query=trae+solo+mode+tutorial', dur: 'search', note: 'How SOLO drives the whole build loop while you stay in visual control' },
            { label: 'Trae vs Cursor — free AI editor comparison 2026', url: 'https://www.youtube.com/results?search_query=trae+vs+cursor+ai+ide+2026', dur: 'search', note: 'Where the free ByteDance editor holds up against Cursor, and where it does not' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How Trae is different — premium models, zero setup" color={color} />
          <InfoBox color={color}>{"Trae's defining choice: bundle premium AI models into a free editor with no API keys. With Cursor or Cline you often manage subscriptions or bring your own key; with Trae you just install, sign in, and the models (Claude, GPT, Gemini, DeepSeek) are available inside the editor immediately. Because it is built on VS Code, your muscle memory, shortcuts, and many extensions carry straight over. That combination — familiar editor + included models + no key wrangling — is what makes it such a low-friction start."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Trae layers two agentic modes on top of the editor. Builder Mode scaffolds a whole project from a natural-language description — good for going from idea to running app fast. SOLO mode is a fully autonomous agent that plans, writes, and iterates through the development loop while keeping you in visual control; since early 2026 SOLO also exists as a standalone app, not just a plugin. The catch is that the free tier is metered: you get a monthly pool of autocompletions plus a limited number of premium-model requests, and heavy Builder/SOLO sessions burn through the allowance faster than simple chat. When you hit the cap the editor keeps working — you just lose the AI layer until it resets or you upgrade.</p>
          {[
            'Premium models included — Claude, GPT, Gemini and DeepSeek available in-editor with no API key to configure',
            'Built on VS Code — familiar UI, keybindings, and extension compatibility, so there is almost no learning curve',
            'Builder Mode — describe an app in plain English and Trae scaffolds the project structure and code',
            'SOLO mode — a fully autonomous agent that runs the build loop end to end while you stay in visual control',
            'Metered free tier — a monthly pool of autocompletions plus limited premium requests; the editor still works after the cap, minus AI',
          ].map((item, i) => (
            <div key={i} className="tool-layout-cando-item">
              <div className="tool-layout-cando-item__dot" />
              <span className="tool-layout-cando-item__text">{item}</span>
            </div>
          ))}
        </Block>
        <Block>
          <SubHead label="Key features" color={color} />
          <CardGrid color={color} items={[
            { name: 'Bundled Multi-Model AI', desc: 'Access frontier models — Claude Sonnet-class, GPT, Gemini, and DeepSeek — from inside Trae with no API keys. Pick the right model per task: reasoning-heavy refactors, fast autocomplete, or multimodal work.' },
            { name: 'Builder Mode', desc: 'Describe the app you want in natural language and Trae scaffolds the project — files, structure, and starter code — so you go from idea to a running skeleton quickly. Available on the free tier within the usage quota.' },
            { name: 'SOLO Autonomous Mode', desc: 'SOLO drives the full development loop — plan, code, run, iterate — as an autonomous agent while you supervise visually. Since early 2026 it also ships as a standalone app (Code and broader "more than coding" modes).' },
            { name: 'VS Code Foundation', desc: 'Trae is built on VS Code, so it supports familiar shortcuts, themes, and many extensions. Switching from VS Code or Cursor feels natural — your workflow largely carries over.' },
            { name: 'AI Autocomplete', desc: 'Inline completions as you type, with a monthly allowance on the free tier (around 5,000 completions). Paid tiers make autocomplete effectively unlimited.' },
            { name: 'Token-Based Tiers', desc: 'Since February 2026, usage is billed against a monthly credit pool. Free gives a small allowance; Lite ($3), Pro ($10), Pro+ ($30) and Ultra ($100) add progressively larger credit pools and higher concurrency.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — install and build" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Download Trae from trae.ai', body: 'Go to trae.ai and download the Trae IDE for your OS (Windows, macOS, Linux). It installs like any desktop app. Because it is built on VS Code, the interface will look immediately familiar.' },
            { n: '2', title: 'Sign in — no API key needed', body: 'Create a free Trae account and sign in. Unlike BYO-key tools, you do not paste any model API keys — the premium models come bundled with your plan. The free tier is active by default.' },
            { n: '3', title: 'Import your VS Code setup (optional)', body: 'On first run Trae can import your VS Code settings, themes, and extensions. This makes the switch painless — your keybindings and favourite extensions come along.' },
            { n: '4', title: 'Try Builder Mode on a fresh idea', body: 'Open Builder Mode and describe a small app: "A to-do list web app with add, complete, and delete, using plain HTML/CSS/JS." Trae scaffolds the project. Watch how it turns a sentence into a running skeleton.' },
            { n: '5', title: 'Use chat + autocomplete on real code', body: 'Open one of your own projects. Use inline autocomplete as you type and the chat panel to ask questions or request edits. Pick a premium model for harder tasks; remember free-tier premium requests are limited each month.' },
            { n: '6', title: 'Experiment with SOLO — then review', body: 'Try SOLO mode on a small, well-scoped task and watch it plan and build autonomously. Always review what it produced before trusting it. Keep an eye on your monthly credit usage in the account panel.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Free tier vs paid plans (2026)" color={color} />
          <Compare color={color} items={[
            { label: 'Free', badge: '$0 — metered', body: 'Around 5,000 autocompletions per month, a small monthly Basic Usage allowance, a limited number of premium-model requests (roughly 10 fast + 50 slow), standard queue, 2 concurrent cloud tasks, and limited SOLO/Builder use. Genuinely enough to learn the editor and build small projects for free.' },
            { label: 'Lite', badge: '~$3/mo', body: 'A small monthly usage credit plus bonus usage and effectively unlimited autocompletion. The cheapest step up once the free premium-request cap starts to pinch — good value for a student who codes regularly.' },
            { label: 'Pro', badge: '~$10/mo', body: 'A larger monthly credit pool, full SOLO mode, faster queue priority, and higher concurrency. The tier most regular users settle on for meaningful frontier-model access without enterprise pricing.' },
            { label: 'Pro+ / Ultra', badge: '~$30 / ~$100/mo', body: 'Pro+ (~$30) roughly multiplies the Pro usage pool; Ultra (~$100) is the heaviest tier with the largest credit pool, most concurrency, and early access to new models. Usually overkill for individual students.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Trae vs Cursor vs Windsurf" color={color} />
          <Compare color={color} items={[
            { label: 'Cost model', badge: 'Trae bundles models free', body: 'Trae: free tier with premium models included, no API key. Cursor: free tier + $20/mo Pro. Windsurf: free tier with generous limits. Trae is often the cheapest way to get frontier models in a polished editor at zero up-front cost.' },
            { label: 'Setup friction', badge: 'Trae is lowest', body: 'Trae: install, sign in, done — no keys. Cursor: similar, subscription-based. Cline (for contrast): you bring your own key. If "just works with no config" matters most, Trae leads.' },
            { label: 'Agentic power', badge: 'All three are agentic', body: 'Trae: Builder Mode + SOLO autonomous agent. Cursor: strong agent mode and codebase context. Windsurf: Cascade agent builds autonomously. All can plan and edit across files; feel differs more than capability.' },
            { label: 'Editor familiarity', badge: 'All VS Code-flavoured', body: 'Trae and Cursor are both built on VS Code; Windsurf (Codeium) is too. Extensions and shortcuts carry over across all three, so trying each is low-risk.' },
            { label: 'The honest caveat', badge: 'ByteDance ownership', body: 'Trae is a ByteDance product. For coursework and open-source practice that is fine, but be thoughtful about sending sensitive or proprietary code through it — a data-privacy consideration that does not apply the same way to a local BYO-key tool like Cline.' },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Idea to App with Builder + SOLO</span></div>
          <p className="tool-layout-task__desc">Use Trae's two headline features together to go from a plain-English idea to a working, refined app — entirely on the free tier. You will learn how scaffolding (Builder Mode) and autonomous iteration (SOLO) complement each other, and how to stay in control of an AI editor while it does the heavy lifting.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Install Trae and pick an idea', body: 'Download Trae from trae.ai, sign in (free tier), and choose a small, well-defined project — e.g. a "unit converter" web app or a "flashcards" study tool. Keep the scope tight so free-tier credits stretch further.' },
            { n: '2', title: 'Scaffold with Builder Mode', body: 'Open Builder Mode and describe the app in one clear paragraph: features, pages, and tech (plain HTML/CSS/JS is fine). Let Trae scaffold the project. Run it to confirm the skeleton works before going further.' },
            { n: '3', title: 'Refine with chat + a premium model', body: 'Use the chat panel to improve specific parts: "Make the layout responsive," or "Add input validation." Select a premium model for trickier requests, but watch your monthly premium-request count.' },
            { n: '4', title: 'Hand a task to SOLO mode', body: 'Give SOLO one bounded task — "Add a dark-mode toggle that persists in localStorage." Watch it plan and implement autonomously while you supervise. This is your first taste of an autonomous coding loop.' },
            { n: '5', title: 'Review everything it wrote', body: 'Read the diffs. Test each feature by hand. Fix or ask Trae to fix anything wrong. Never assume autonomous output is correct — reviewing is the skill that separates good AI-assisted developers from careless ones.' },
            { n: '6', title: 'Track your credit usage', body: 'Open the account/usage panel and see how much of your monthly free allowance the session used. Note which actions (SOLO, premium chat) were most expensive. This awareness helps you decide whether the $3 Lite or $10 Pro tier is worth it later.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — Trae&apos;s free tier (autocompletions + limited premium requests + limited Builder/SOLO) covers a small project end to end; upgrade only if you hit the monthly cap</span></div>
        </div>
        <ProTip>
        Treat Trae's free tier like a metered fuel tank: autocomplete and simple chat are cheap, but Builder Mode and SOLO on premium models burn your monthly premium-request allowance fast. Do your exploratory, high-volume work with a lighter model and save premium requests for the genuinely hard problems — a tricky bug, a complex refactor. And because Trae is a ByteDance product with bundled cloud models, keep truly sensitive or proprietary code out of it; use it freely for learning, coursework, and open-source, and reach for a local BYO-key tool when privacy is the priority.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/coding/cody', label: 'Sourcegraph Cody' }}
        next={{ path: '/ai-lab/coding/qodo', label: 'Qodo' }}
      />
    </ToolPageShell>
  )
}
