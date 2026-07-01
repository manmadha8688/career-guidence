import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#6366F1'

export default function V0Page() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="AI App Builders">
      <ToolHeader
        icon="🎨"
        title="v0 by Vercel — Describe UI, Get Production React Code"
        tagline="AI-powered React component generator — prompt to shadcn/Tailwind code in seconds"
        badges={[['✓ FREE TIER', '#4ADE80'], ['v0.dev', color], ['React + shadcn/ui', 'var(--text-muted)'], ['Vercel', 'var(--text-muted)']]}
        overview={"v0 is Vercel's AI-powered UI generator. You describe what you want — \"a login form with email and password fields and a forgot password link\" — and v0 generates production-ready React code with Tailwind CSS and shadcn/ui components instantly. No boilerplate. No looking up component APIs. The output is copy-paste ready JSX that fits directly into any Next.js or React project. v0 is not a full-stack app builder — it does not write backends or databases. It does one thing exceptionally well: turning UI descriptions into clean, accessible, professionally styled frontend code. Since going generally available in 2024, over 4 million developers have used it. It has evolved from a component generator into a more complete development environment with GitHub sync, Vercel deploy, and agentic planning — but its core strength remains UI generation that would take a developer hours to write from scratch."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'v0 Tutorial: Beginner to Pro in 15 Minutes (Build ANY UI with AI)', url: 'https://www.youtube.com/watch?v=Gb3tF3jp4XU', note: 'Fastest way to get productive — all key features covered' },
            { label: 'How To Use v0 by Vercel 2025 (Tutorial For Beginners)', url: 'https://www.youtube.com/watch?v=P5ucjCOOj7I', note: 'Step-by-step beginner walkthrough — March 2025' },
            { label: 'v0 by Vercel — A Beginner\'s Guide', url: 'https://www.youtube.com/watch?v=ddmLx4KJI9I', note: 'Covers prompting, iteration, and copying code into a project' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What v0 actually is — and what it is not" color={color} />
          <InfoBox color={color}>v0 is a UI code generator, not an app builder. It generates the frontend — the React components, the layout, the styling. It does not write Node.js servers, configure databases, or handle authentication logic. Think of it as an AI that writes the visual layer of your application. This focus is its strength: the components it generates are cleaner, more accessible, and more production-ready than what most generic AI tools produce.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>When you open v0.dev, you see a chat interface. Type a description of the UI you need. v0 generates React JSX with Tailwind CSS and shadcn/ui component library. You see a live preview immediately. You can iterate by sending follow-up messages: "add a loading state to the button", "make it responsive for mobile", "use a different color for the error message". When you are happy with the result, you copy the code into your project — or continue editing it in v0's built-in editor. This is the core workflow: prompt, iterate, copy. Everything else (GitHub sync, Vercel deploy, database integrations) is built on top of this foundation.</p>
        </Block>
        <Block>
          <SubHead label="How v0 works — step by step" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Write a prompt describing your UI', body: "Be specific about layout, purpose, and visual style. Example: 'A pricing page with three tier cards — Free, Pro, and Enterprise. Each card shows price, 5 feature bullet points, and a CTA button. Use a dark background with indigo accent colors. The Pro plan should be highlighted as recommended.' The more context you give, the better the first draft." },
            { n: '2', title: 'v0 generates React + Tailwind + shadcn/ui code', body: 'Within seconds you see generated JSX with live preview. The code uses real shadcn/ui components (Button, Card, Badge, etc.) and Tailwind utility classes. It follows Next.js conventions — server components where appropriate, proper TypeScript types if you ask.' },
            { n: '3', title: 'Iterate with follow-up messages', body: "v0 is a conversation, not a one-shot generator. You refine in chat: 'Make the Pro card border glow', 'Reduce the padding on mobile', 'Add a monthly/annual billing toggle'. Each message targets only what needs to change. This iterative loop is where v0 feels closest to working with a real developer." },
            { n: '4', title: 'Copy code or open in project', body: 'Click the Code tab to see the full JSX. Copy it directly into your React or Next.js project. Or use the \"Open in\" options to push to a new GitHub repo, open in StackBlitz, or deploy to Vercel. The code is yours — no lock-in, no runtime dependency on v0.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Key features" color={color} />
          <CardGrid color={color} items={[
            { name: 'Text to component', desc: 'Describe any UI element in plain English — login forms, nav bars, hero sections, data tables, pricing cards, dashboards — and get React code instantly. The primary use case, and what v0 does better than any competitor.' },
            { name: 'Image to UI', desc: 'Upload a screenshot, wireframe, or Figma export. v0 analyzes the layout and generates matching React code. Accuracy is best on landing pages, dashboards, and form-heavy interfaces. High-resolution images give better results.' },
            { name: 'Full page generation', desc: 'v0 is not limited to single components. You can generate complete page layouts — entire landing pages, dashboard shells, authentication flows. Combine the output with targeted component generation for specific sections.' },
            { name: 'Live preview', desc: 'Every generation shows a live rendered preview alongside the code. Toggle between Preview and Code tabs. See exactly what the component looks like before copying it. The preview is interactive — you can click buttons and test states.' },
            { name: 'Conversational iteration', desc: 'Refine any output with follow-up messages. v0 maintains context across the conversation — it knows what it generated and can apply targeted changes. This is faster than regenerating from scratch each time.' },
            { name: 'GitHub + Vercel integration', desc: 'Push to a GitHub repository directly. Deploy to Vercel with one click for instant production URL. A Git panel lets you manage branches and pull requests within v0. Production-grade CI/CD workflow from inside the UI generator.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="What v0 outputs — the technology stack" color={color} />
          <Compare color={color} items={[
            { label: 'React + Next.js', badge: 'Primary framework', body: "v0's output follows Next.js conventions by default — app router, server components, proper file structure. The code is designed to drop directly into a Next.js project with zero modification. Works equally well in a plain React project if you remove Next.js-specific imports." },
            { label: 'Tailwind CSS', badge: 'Styling system', body: "Every component uses Tailwind utility classes exclusively — no custom CSS, no CSS Modules. Tailwind is the industry standard for React+Next.js projects in 2025. Reading v0's Tailwind output teaches you how experienced developers compose utility classes for responsive, accessible layouts." },
            { label: 'shadcn/ui', badge: 'Component library', body: "shadcn/ui is not an npm package — it's a collection of accessible, customizable React components you copy into your project. v0 uses shadcn's Button, Card, Input, Dialog, Tabs, Badge, and 30+ other components. Understanding shadcn/ui is a valuable skill: it's used in thousands of production apps." },
            { label: 'TypeScript', badge: 'Type system (optional)', body: 'v0 can generate TypeScript or JavaScript. TypeScript output includes proper prop types, interface definitions, and type annotations. If you ask for TypeScript, the generated code teaches you real TypeScript patterns — not just adding `: any` everywhere.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Free tier vs paid — what you actually get" color={color} />
          <InfoBox color={color}>v0 uses token-based credits. Free tier: $5 in monthly credits + 7 messages per day. Paid plans start at $20/month (Premium) which gives $20 in monthly credits plus $2 in free daily login credits. Token costs are model-dependent — simple prompts cost less, complex full-page generation costs more. The free tier is enough for learning, component prototyping, and integrating v0 into your development workflow.</InfoBox>
          <Steps color={color} items={[
            { n: 'Free', title: '$5 monthly credits — good for learning', body: 'Approximately 20–40 component generations per month depending on complexity. Simple components (a button group, a form) use fewer tokens. Full-page generations (landing page, dashboard layout) use more. Free tier is enough to learn v0 and generate components for a portfolio project.' },
            { n: 'Pro', title: '$20/month — for regular use', body: '$20 in monthly credits + $2 daily credits when you log in. Worth it if you are actively building projects and using v0 for real UI work. Includes deploy to Vercel, Design Mode, and GitHub sync. Token costs vary by model: v0 Mini (cheapest), v0 (standard), v0 Pro, v0 Max (most capable).' },
            { n: 'Tip', title: 'Make your free tier last longer', body: 'Be detailed in your first prompt — one good 100-word prompt beats five short iterative ones. Use v0 Mini for simple components, save Max for complex full-page layouts. The more context you provide upfront, the fewer iteration messages you need, the fewer credits you spend.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="v0 vs Bolt.new — which one to use" color={color} />
          <Compare color={color} items={[
            { label: 'v0 by Vercel', badge: 'UI components → existing projects', body: 'Use v0 when you already have a React/Next.js project and need to build UI fast. It generates components you copy into your existing codebase. Best for: frontend-only UI prototyping, generating shadcn/Tailwind components, iterating on specific UI sections. Does not generate backends or handle databases.' },
            { label: 'Bolt.new', badge: 'Full-stack apps from scratch', body: 'Use Bolt when you want to generate a complete app — React frontend + Node.js backend + database integration — starting from nothing. Best for: new project scaffolding, portfolio sites, SaaS prototypes, hackathons. Installs npm packages and runs a real dev server in your browser.' },
            { label: 'When to use both', badge: 'Real workflow', body: "Start a new app in Bolt for the structure and backend, then use v0 to generate polished UI components to drop in. Or: use v0 to prototype how a section should look, then implement it in your existing project. The tools complement each other — v0 is a UI factory, Bolt is an app factory." },
          ]} />
        </Block>
        <Block title="Best use cases" titleColor={color}>
          {[
            'Generate a complete login/signup page with form validation, error states, and loading indicators — copy directly into your Next.js project',
            'Build a professional portfolio UI section-by-section: hero, skills grid, project cards, contact form — iterate until it looks right',
            'Convert a rough wireframe or design screenshot into working React code in under 2 minutes',
            'Prototype multiple UI variations for a feature (e.g., three different dashboard header designs) and compare them in the live preview',
            'Learn how experienced developers compose shadcn/ui and Tailwind — read v0\'s output as a teaching resource',
            'Generate accessible, responsive data tables, modals, and form components that would take hours to write from scratch',
            'Add UI to an existing project without switching out of your codebase — copy the component, adjust the props, done',
          ].map((item, i) => (
            <div key={i} className="tool-layout-cando-item">
              <div className="tool-layout-cando-item__dot" />
              <span className="tool-layout-cando-item__text">{item}</span>
            </div>
          ))}
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Build a Component Library for Your Portfolio</span></div>
          <p className="tool-layout-task__desc">Use v0 to generate four UI components and integrate them into a React project. The goal is to practice the real v0 workflow: prompt, iterate, copy, integrate. By the end you will have four production-quality components built in under an hour that would normally take a full day to write.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Generate a hero section', body: "Prompt: 'A hero section for a software developer portfolio. Full-width, dark background. Large heading with name placeholder, subtitle showing role (Full Stack Developer), two CTA buttons (View Projects / Contact Me), and a subtle animated gradient background. Use Tailwind and shadcn/ui. Make it responsive.' Iterate until it looks right. Copy the code." },
            { n: '2', title: 'Generate a project card component', body: "Prompt: 'A project card component for a portfolio. Shows: project name, one-line description, tech stack as small badge chips (React, Node.js, etc.), a GitHub link icon, and a Live Demo button. Dark card background with a subtle border. Hover state lifts the card slightly. Use shadcn/ui Card and Badge components.' Copy and parameterize the props." },
            { n: '3', title: 'Generate a skills section', body: "Prompt: 'A skills section for a developer portfolio. Organize skills into three groups: Frontend (React, TypeScript, Tailwind), Backend (Node.js, Python, SQL), and Tools (Git, Docker, VS Code). Each skill shows an icon placeholder and label. Clean grid layout, 3 columns on desktop, 2 on tablet, 1 on mobile.' Adjust the skills list to match your actual stack." },
            { n: '4', title: 'Integrate into a project and deploy', body: 'Create a new Next.js app (npx create-next-app). Install shadcn/ui following their setup guide. Copy each v0-generated component into the components folder. Import and use them in your page. Deploy to Vercel — free account, 30 seconds to live URL. Share the deployed URL.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE TIER — 4 components well within monthly credits. shadcn/ui setup required once.</span></div>
        </div>
        <ProTip>
        Treat v0's output as a starting point, not a final answer. Copy the generated code, then read through every class name and component prop. Change things: swap a color, adjust spacing, rename a prop. This transforms v0 from a "generate and forget" tool into a learning accelerator. Every component v0 writes teaches you how Tailwind and shadcn/ui are used in real production code — which is more valuable than the component itself.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/builders/bolt-new', label: 'Bolt.new' }}
        next={{ path: '/ai-lab/builders/replit', label: 'Replit' }}
      />
    </ToolPageShell>
  )
}
