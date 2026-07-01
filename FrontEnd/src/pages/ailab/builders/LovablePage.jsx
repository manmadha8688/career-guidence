import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#EC4899'

export default function LovablePage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Builders">
      <ToolHeader
        icon="💜"
        title="Lovable — AI Builds Your Full-Stack App From a Description"
        tagline="From prompt to production-ready web app — no coding experience required"
        badges={[['✓ FREE TRIAL', '#4ADE80'], ['lovable.dev', color], ['Full-stack AI', 'var(--text-muted)']]}
        overview={"Lovable started as GPT Engineer — an open-source project that hit 50,000 GitHub stars by letting developers describe software in plain English and watch it write itself. In December 2024, the company rebranded as Lovable and launched a commercial product targeting a much wider audience: anyone who has an app idea but not the engineering background to build it. Within months, Lovable grew to 2.3 million users and $100M ARR, and received a $330M Series B in December 2025 at a $6.6B valuation backed by Nvidia and Salesforce. The core promise: describe what you want, and Lovable generates a complete React + TypeScript + Supabase application — frontend design, authentication, database schema, and backend logic — that you can deploy immediately. No environment setup, no package management, no infrastructure decisions."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Lovable Tutorial for Beginners (Best AI App Builder?)', url: 'https://www.youtube.com/watch?v=6VejFu1nEYs', dur: '~25 min', note: 'Official Lovable tutorial — covers GitHub + Supabase integrations for real full-stack apps' },
            { label: 'How I Built an App with Lovable in Under 1 Hour (2025)', url: 'https://www.youtube.com/watch?v=ZRmePOajOiI', dur: '~45 min', note: 'Full walkthrough — from first prompt to deployed app with auth and database' },
            { label: 'Build an App (SaaS) Using Lovable.dev & Supabase — Full Course', url: 'https://lovable.dev/video/build-an-app-saas-using-lovabledev-ai-supabase-full-course', dur: 'Full course', note: 'Production SaaS build: auth, payments, dashboard, database — the complete path' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What Lovable actually is" color={color} />
          <InfoBox color={color}>Lovable is a full-stack AI app builder that converts a plain English description into a working React + TypeScript + Tailwind CSS frontend wired to a Supabase backend — including PostgreSQL database, authentication, file storage, and Edge Functions. The entire project syncs to GitHub, can be published to a custom domain, and is yours to edit further with code if you want. You are not locked into a proprietary runtime — the output is standard, portable web technology.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The difference between Lovable and a simple code generator is context persistence. Lovable maintains the full application state across your conversation — add a feature, and it understands the existing components, schema, and auth setup. Ask it to fix a bug, and it reads the entire codebase to find the root cause. The Agent Mode goes further: it can search the web for solutions, explore files autonomously, and debug chains of errors without you guiding each step. This is not autocomplete for developers — it is an AI that builds the app alongside you, whether or not you know how to code.</p>
        </Block>
        <Block>
          <SubHead label="How it works — the full-stack generation pipeline" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'You describe the app in plain English', body: 'Write what you want: "A task manager where users can sign in, create projects, add tasks with due dates and priority levels, and see a dashboard with completion stats." Lovable reads this as a product spec, not a command.' },
            { n: '2', title: 'Lovable generates the full React + TypeScript frontend', body: 'Component tree, routing with React Router, Tailwind CSS styling, responsive layout, forms with validation — all generated as clean, readable TypeScript. No CSS frameworks to configure, no component library to install.' },
            { n: '3', title: 'Supabase backend is provisioned automatically', body: 'Lovable connects to your Supabase project and creates: a PostgreSQL schema with the right tables, Row Level Security policies so users only see their own data, authentication with email/password and OAuth, and storage buckets if you need file uploads.' },
            { n: '4', title: 'You iterate with follow-up prompts', body: '"Add a drag-and-drop reorder for tasks", "Make the dashboard chart a bar chart instead", "Add a search bar to the projects list." Each instruction updates only the relevant components without breaking the rest of the app.' },
            { n: '5', title: 'Publish with one click — or sync to GitHub', body: 'Lovable hosts your app on a *.lovable.app subdomain instantly. Connect a custom domain on Pro. Every change syncs to a GitHub repository you own — so you can clone it, hand it to a developer, or deploy it anywhere.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Key features" color={color} />
          <CardGrid color={color} items={[
            { name: 'Full-stack generation', desc: 'Generates frontend (React + TypeScript + Tailwind) and backend (Supabase: PostgreSQL, auth, storage, Edge Functions) together from a single prompt. Not just UI — actual working data flow.' },
            { name: 'GitHub sync', desc: 'Every project automatically creates a GitHub repository. Your code is not trapped in Lovable — clone it, edit it locally, push changes back. Standard version control from day one.' },
            { name: 'Supabase integration', desc: 'Native Supabase integration sets up tables, Row Level Security, auth providers, and storage in your own Supabase project. You own the database. No black-box proprietary backend.' },
            { name: 'Agent Mode', desc: 'Lovable\'s Agent Mode works autonomously: it explores code, runs tests, searches the web for solutions, and debugs multi-step errors. Ask it to fix something complex — it will work through it without hand-holding.' },
            { name: 'Custom domains', desc: 'Connect your own domain name to any Lovable project (Pro plan). Publish a real product at a real URL — not just a demo subdomain. Supports SSL automatically.' },
            { name: 'Design editing', desc: 'Describe visual changes in plain English: "Make the sidebar narrower and darker", "Add a gradient header", "Use a card layout instead of a table". Targeted edits update only the components you describe.' },
            { name: 'Collaboration', desc: 'Invite team members to the same Lovable project. Multiple people can iterate on the app, review changes, and work from the shared GitHub repository.' },
            { name: 'Code export', desc: 'Download the full source code at any time. You are never locked into Lovable\'s platform — the output is standard React with real package.json, standard dependencies, runs locally with npm.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Free vs paid — what you actually get" color={color} />
          <Compare color={color} items={[
            { label: 'Free — $0/month', badge: 'Start here', body: '5 daily credits, public projects only, unlimited collaborators. Each credit covers a prompt-response cycle. 5 credits per day is enough to experiment and build small things. Projects are publicly visible on lovable.app — not a problem for learning and demos, but not suitable for anything you want to keep private.' },
            { label: 'Pro — $25/month', badge: 'For serious projects', body: '100 monthly credits, private projects, custom domain support, credit rollovers (unused credits carry to next month). This is the tier for building something real — a portfolio project, a side project, an MVP for a startup idea. Private projects and custom domains make it production-viable.' },
            { label: 'Business — $50/month', badge: 'For teams', body: 'Everything in Pro plus SSO, opt-out of data training (your code is not used to improve Lovable\'s model), design templates, and personal project spaces. Relevant if you are building for a client or startup and need data privacy guarantees.' },
            { label: 'Enterprise — Custom pricing', badge: 'For organizations', body: 'Dedicated support, custom onboarding, advanced access control, custom integrations. Only relevant if a company is deploying Lovable at scale.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Lovable vs Bolt.new vs v0 — which one to use" color={color} />
          <Compare color={color} items={[
            { label: 'Lovable — full-stack MVPs fastest', badge: 'Best for complete apps', body: 'Choose Lovable when you need a working full-stack app: auth, database, frontend, deployment — all from one tool. Best for non-technical founders, students building portfolio projects, and anyone who wants a real product rather than a prototype. The Supabase integration is first-class and the code is actually clean and exportable.' },
            { label: 'Bolt.new — developer flexibility', badge: 'Best for developers', body: 'Bolt.new is better if you are a developer who wants framework flexibility (Next.js, Vue, SvelteKit) and more control over the generated code. Bolt gives 1M tokens/month free — a more generous free tier. Trade-off: backend integration is manual, you configure your own services. Better for developers; harder for beginners.' },
            { label: 'v0 by Vercel — clean React UI', badge: 'Best for frontend components', body: 'v0 is unbeatable for generating individual React components and full-page UIs with shadcn/ui. It has no backend story — it is purely a frontend tool. Use v0 when you want a production-quality component and you will handle the backend yourself. Many developers use v0 for UI design + Lovable for the backend logic.' },
          ]} />
          <div className="tool-helper-highlight" style={{ marginTop: '0.75rem' }}>
            <span className="tool-helper-highlight__label">PRACTICAL STRATEGY:</span>
            <span className="tool-layout-block__para" style={{ marginLeft: '0.5rem', display: 'inline' }}>Use Lovable to build the full app quickly. When you need a polished specific UI component, pull in v0. Use Bolt when you have developer skills and want code-level control.</span>
          </div>
        </Block>
        <Block>
          <SubHead label="What you can actually build" color={color} />
          <CardGrid color={color} items={[
            { name: 'SaaS MVPs', desc: 'Authenticated multi-user SaaS products: subscription dashboards, booking platforms, project management tools, CRM systems. Full auth + database + UI in one session.' },
            { name: 'Portfolio projects', desc: 'Build portfolio pieces that actually work — not static mockups. A task app, a blog platform, a booking system with a real database behind it impresses interviewers far more than a Figma design.' },
            { name: 'Internal tools', desc: 'Admin dashboards, data entry forms, approval workflows, reporting panels for teams. Non-technical managers can ship internal tools without a developer queue.' },
            { name: 'Startup validation', desc: 'Test a product idea with a real working prototype before hiring engineers. Show users an actual app — with login, data, and core flows — to validate demand before investing in a full build.' },
            { name: 'Learning projects', desc: 'Build real apps to learn React and TypeScript by reading Lovable\'s generated code. The output is clean, well-structured code that demonstrates real patterns — better learning material than tutorials.' },
            { name: 'Client projects', desc: 'Freelancers can deliver simple web apps in hours rather than weeks. Landing pages with forms, small business dashboards, event registration tools — all fully functional and deployable.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — from zero to deployed app" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Sign up at lovable.dev', body: 'Create a free account. You get 5 daily credits to start. No credit card required. The free tier is enough to build a complete small app over a few days.' },
            { n: '2', title: 'Write a clear initial prompt', body: 'Do not just say "make a to-do app". Describe the full product: who uses it, what they can do, what data is stored, what the main screens are. More context in the first prompt = less iteration needed later. A 3–5 sentence product description is ideal.' },
            { n: '3', title: 'Connect a Supabase project', body: 'Create a free account at supabase.com. Lovable will prompt you to connect it — paste the project URL and anon key. Lovable then creates all tables, auth setup, and RLS policies automatically in your Supabase project.' },
            { n: '4', title: 'Iterate with specific follow-up prompts', body: 'After the initial generation, refine one thing at a time: "Add a profile page where users can update their name and avatar", "Make the navigation mobile-friendly", "Add sorting to the table by date". Vague follow-ups produce vague results.' },
            { n: '5', title: 'Connect GitHub and publish', body: 'Sync to GitHub before you have much work done — it gives you a safety net. Then publish: your app is live on a *.lovable.app URL instantly. On Pro, add your own domain.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Build a complete full-stack web app — auth, database, frontend, deployment — entirely from plain English prompts',
            'Go from app idea to live URL in a single afternoon, without installing anything or configuring infrastructure',
            'Generate clean React + TypeScript code you own, can export, and can continue building with standard tools',
            'Automatically create Supabase databases with proper schema, Row Level Security, and auth providers',
            'Sync every project to a GitHub repository from day one — your code is never locked in the platform',
            'Use Agent Mode to debug complex issues autonomously — describe the problem, Lovable investigates and fixes it',
            'Build portfolio projects that actually work with real data, impressing interviewers far beyond static mockups',
            'Validate startup ideas with working prototypes before spending money on engineering hires',
        ]} />
      </Block>
        <ProjectTask
        title={"Build a Study Session Tracker"}
        description={"Build a real full-stack study tracker app using Lovable — with authentication, a database, and a working frontend. The goal is not just to generate the app, but to understand each part of what was generated and to walk away with something deployed and shareable. A working app in your portfolio beats a tutorial project on GitHub every time."}
        costNote={"TOTAL COST: ₹0 — Lovable free tier (5 daily credits) + Supabase free tier. No credit card required for either."}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Write your product prompt', body: 'Write a clear description: "A study session tracker where students can sign in, log study sessions with subject, duration, and notes, see their total study hours per subject in a dashboard, and set a weekly study goal with a progress bar." Spend 5 minutes on this prompt — it determines the quality of the initial generation.' },
            { n: '2', title: 'Generate and connect Supabase', body: 'Paste the prompt into Lovable, watch the app generate, then connect a free Supabase project when prompted. Lovable creates the sessions table, user auth, and RLS policies. Log in to Supabase and inspect the tables — understand what was created.' },
            { n: '3', title: 'Add 3 features via follow-up prompts', body: 'Iterate: (1) "Add a streak counter showing how many days in a row the user has logged a session", (2) "Add the ability to export session data as a CSV", (3) "Make the dashboard mobile responsive." Each prompt is one credit — be specific.' },
            { n: '4', title: 'Publish and sync to GitHub', body: 'Publish to a *.lovable.app URL and sync to your GitHub account. Share the live URL in your portfolio or resume. Look at the generated code in the GitHub repo — read 3 components to understand the React + Supabase patterns used.' },
          ]} />
      </ProjectTask>
        <ProTip>
        The most common mistake with Lovable is treating it like a search engine — one prompt and done. Real apps are built iteratively. Write a complete initial prompt, then add one feature per follow-up message. Trying to describe everything in one giant prompt produces bloated, confused code. Small, specific follow-ups produce clean, targeted changes. Also: sync to GitHub early, before you have much work. It takes 10 seconds and means you can always roll back if a prompt goes badly.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/builders/v0', label: 'v0 by Vercel' }}
        next={{ path: '/ai-lab/builders/replit', label: 'Replit' }}
      />
    </ToolPageShell>
  )
}
