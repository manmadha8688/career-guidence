import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F59E0B'

export default function BoltNewPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="AI App Builders">
      <ToolHeader
        icon="⚡"
        title="Bolt.new — Type a Prompt, Get a Full-Stack App"
        tagline="Browser-based AI app builder — from idea to deployed in minutes"
        badges={[['✓ FREE TIER', '#4ADE80'], ['bolt.new', color], ['StackBlitz', 'var(--text-muted)']]}
        overview={"Bolt.new is the AI app builder that went from zero to $40 million in annual revenue in six months — because it does something genuinely new. You type what you want to build in plain English, and Bolt generates a complete full-stack web application running live in your browser: React frontend, Node.js backend, Tailwind styling, npm packages, and all. No local installation, no configuration, no \"getting started\" friction. The code is visible and editable as it generates — which matters for learning. You can read every file Bolt creates, understand why it made each choice, and modify anything. One-click deploy to Netlify gets your app live on the internet. For students who want to build a professional portfolio project, prototype an idea, or just see how a real full-stack app is structured — Bolt removes every barrier except the idea itself."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Bolt.new Tutorial for Beginners (2025)', url: 'https://www.youtube.com/watch?v=snKX9QjLVaY', dur: null, note: 'Best beginner walkthrough 2025' },
            { label: 'Bolt.new Tutorial: Build & Deploy AI Web Apps in Minutes', url: 'https://www.youtube.com/watch?v=cSDWr2WdpqI', dur: null, note: '2024 beginner guide' },
            { label: 'The Ultimate Guide to Bolt.new | Build Apps with AI (Step-by-Step)', url: 'https://www.youtube.com/watch?v=0_Ij8FEvY4U', dur: null, note: 'Comprehensive step-by-step' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How Bolt works — WebContainers" color={color} />
          <InfoBox color={color}>Bolt uses StackBlitz's WebContainers technology — it compiles Node.js to WebAssembly and runs a complete operating system in your browser tab. This is not a simulation: npm packages actually install, servers actually start, and code actually executes — all locally in your browser, not on a remote cloud server. This is why Bolt has zero latency between edit and preview.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The practical result: open bolt.new and you have a full development environment in 3 seconds with no setup. Type a prompt, and Bolt generates code as diffs (targeted changes) rather than rewriting entire files — which means iteration is fast and your existing work is preserved. Everything is editable: click any file in the project tree on the right, change the code, and the preview updates instantly. This is closer to pair programming than autocomplete.</p>
        </Block>
        <Block>
          <SubHead label="What Bolt can build" color={color} />
          <CardGrid color={color} items={[
            { name: 'Portfolio websites', desc: 'Professional portfolio with sections, contact form, project showcase. Builds in under 10 minutes. Deploys to Netlify with a live URL. Better output than 90% of manually built portfolios at 1% of the time.' },
            { name: 'SaaS prototypes', desc: 'Landing page + authentication + dashboard + database. Show investors or employers a working demo of your idea. Bolt connects Supabase for real database functionality.' },
            { name: 'Full-stack web apps', desc: 'React frontend + Node.js backend + REST API. Todo apps, trackers, dashboards, CRUD applications. Real full-stack architecture visible in the code.' },
            { name: 'Landing pages', desc: 'Marketing pages with hero sections, feature grids, pricing tables, and CTAs. Tailwind CSS styling, responsive by default. Useful for hackathon submissions and project demos.' },
            { name: 'Admin dashboards', desc: 'Data tables, charts, filtering, CRUD operations. Connect to Supabase for real data. Build internal tools, analytics dashboards, or project management boards.' },
            { name: 'Side project MVPs', desc: 'Turn a business idea into a working MVP for a hackathon or portfolio. Bolt accelerates from idea to functional demo in an afternoon, not weeks.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="The technology Bolt uses" color={color} />
          <Compare color={color} items={[
            { label: 'Frontend stack', badge: 'React + TypeScript + Tailwind', body: 'Bolt defaults to React with TypeScript and Tailwind CSS. The output follows real production patterns — component structure, hooks, proper TypeScript types. Reading Bolt\'s generated React code teaches you how professionals structure React applications.' },
            { label: 'Backend stack', badge: 'Node.js + Express only', body: 'Backend is Node.js with Express. Important limitation: Bolt does NOT support Python, PHP, or Go backends. If your project requires Python (data science, ML), use Replit instead. For JavaScript full-stack (which covers 80% of web apps), Node.js is the right choice.' },
            { label: 'Database and auth', badge: 'Supabase integration', body: 'Connect Supabase (free tier: 500MB database) for PostgreSQL database, authentication, file storage, and real-time subscriptions. Bolt generates the complete integration code. Supabase works best with Vite + React projects in Bolt.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Free tier — what you actually get" color={color} />
          <InfoBox color={color}>Bolt's free tier gives 300,000 tokens per day and 1,000,000 tokens per month. A simple portfolio site uses ~50,000–150,000 tokens. A complex full-stack app with authentication and database can use 500,000+ tokens. Free tier is enough for learning, prototyping, and portfolio projects — but complex multi-feature apps may hit limits.</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Simple apps fit comfortably in free tier', body: 'Portfolio sites, landing pages, simple CRUD apps: 50K–200K tokens. Well within free limits. Build and iterate multiple times per day.' },
            { n: '2', title: 'Complex apps burn tokens fast', body: 'Real-time features, complex auth flows, multiple API integrations: 300K–800K tokens. May hit daily limits. Strategy: describe the full app in one detailed prompt rather than many small iterative prompts.' },
            { n: '3', title: 'Pro ($25/month) if you ship regularly', body: '10M tokens/month with rollover (from July 2025), custom domains, remove Bolt branding. Worth it if you\'re building apps professionally or for client work. Free tier covers all student learning and prototyping.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Bolt vs v0 vs Lovable vs Replit" color={color} />
          <Compare color={color} items={[
            { label: 'Bolt.new', badge: 'Best: full-stack + learning', body: 'Builds complete full-stack apps. Code is fully visible and editable. Best for: students who want to build real apps and understand the code, hackathon prototypes, portfolio projects. Limitation: JavaScript/TypeScript only.' },
            { label: 'v0 by Vercel', badge: 'Best: React UI components', body: 'Generates beautiful React + Tailwind UI components from text. Frontend only — no backend, no database. Best for: copying ready-made components into an existing project, designing UI layouts quickly. Not an app builder.' },
            { label: 'Lovable', badge: 'Best: beginners who want beauty', body: 'Similar to Bolt but hides more of the code complexity. Produces more polished outputs with less config. Best for: non-technical founders, demos where visual quality matters more than code learning. Less useful for developing actual coding skills.' },
            { label: 'Replit', badge: 'Best: learning to code', body: 'Online IDE with AI assistance. Supports 50+ languages including Python, Java, C++. Best for: CS students learning programming fundamentals, running class assignments, any language except JavaScript-only. Bolt is faster for building; Replit is better for learning.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Build a professional portfolio website with multiple sections, projects, and contact form — deployed live in 20 minutes',
            'Prototype any web app idea with real React + Node.js + database architecture visible in the code',
            'Learn how full-stack applications are structured by reading the code Bolt generates',
            'Deploy to Netlify with one click and share a live URL in your resume or LinkedIn',
            'Iterate on your app by describing changes in plain English — Bolt applies targeted diffs',
        ]} />
      </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Build and Deploy Your Portfolio</span></div>
          <p className="tool-layout-task__desc">Use Bolt.new to build a professional portfolio website. Include: hero section with your name and role, skills section with your tech stack, projects section with 3 projects (add placeholders if needed), and a contact section. Deploy to Netlify. Share the live URL. Then: open the generated code and read every component file. Where is the routing? How is Tailwind used? What does the component structure look like? Reading the output is the learning.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Write a detailed prompt', body: "Be specific: 'Build a professional portfolio for a software developer named [Your Name]. Include: a hero section with name and tagline, a skills section showing React/Node.js/Python/SQL, a projects section with 3 project cards (title, description, tech stack, GitHub link), and a contact form. Use a dark theme with purple accent colors. Make it fully responsive.'" },
            { n: '2', title: 'Iterate with follow-ups', body: "After the first generation: ask for changes in plain English. 'Make the hero section text larger', 'Add a smooth scroll animation', 'Change the accent color to cyan', 'Add hover effects to the project cards'. Each follow-up makes targeted changes." },
            { n: '3', title: 'Deploy to Netlify', body: 'Click the Deploy button in Bolt → connect your Netlify account (free) → deploy. You get a live URL like yourname-portfolio.netlify.app in under 2 minutes. Add this URL to your LinkedIn and GitHub profile.' },
            { n: '4', title: 'Read the generated code', body: 'Open each component file in the right panel. Read: how is React Router used? How are the Tailwind classes structured? Where is the data defined? Understanding the code Bolt wrote is how you learn React patterns from real working examples.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE TIER — 300K tokens/day is enough for a full portfolio build</span></div>
        </div>
        <ProTip>
        Write your initial Bolt prompt in one detailed paragraph rather than starting simple and adding features. More context in the first prompt = fewer token-burning iterations. Include: the app name, target users, all features you want, design preferences (dark/light, color scheme, style), and any specific technologies (Supabase for database, Clerk for auth). A 200-word prompt produces a much better first draft than a 10-word one.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/chatbots/huggingchat', label: 'HuggingChat' }}
        next={{ path: '/ai-lab/builders/v0', label: 'v0 by Vercel' }}
      />
    </ToolPageShell>
  )
}
