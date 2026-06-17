import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#6366F1'   // indigo — v0's signature tone

export default function V0Page() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(99,102,241,0.09)' : 'rgba(99,102,241,0.13)'
  const txt   = dark ? '#E2E8F0' : '#0F172A'
  const sub   = dark ? '#94A3B8' : '#475569'
  const muted = dark ? '#64748B' : '#94A3B8'

  return (
    <div style={{ minHeight: '100vh', background: bg, color: txt, fontFamily: "'Rajdhani', sans-serif", overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, borderRadius: '50%', background: `radial-gradient(ellipse, ${color}07 0%, transparent 65%)`, filter: 'blur(60px)' }} />
      </div>

      <nav style={{ position: 'sticky', top: 0, zIndex: 50, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', background: dark ? 'rgba(2,8,23,0.93)' : 'rgba(240,244,255,0.95)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${border}` }}>
        <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.72rem', letterSpacing: '0.1em', color: CYAN, padding: 0 }}>
          <ArrowLeft size={14} /> AI Lab
        </button>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>AI App Builders</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🎨</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>v0 by Vercel — Describe UI, Get Production React Code</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>AI-powered React component generator — prompt to shadcn/Tailwind code in seconds</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE TIER', '#4ADE80'], ['v0.dev', color], ['React + shadcn/ui', muted], ['Vercel', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>v0 is Vercel's AI-powered UI generator. You describe what you want — "a login form with email and password fields and a forgot password link" — and v0 generates production-ready React code with Tailwind CSS and shadcn/ui components instantly. No boilerplate. No looking up component APIs. The output is copy-paste ready JSX that fits directly into any Next.js or React project. v0 is not a full-stack app builder — it does not write backends or databases. It does one thing exceptionally well: turning UI descriptions into clean, accessible, professionally styled frontend code. Since going generally available in 2024, over 4 million developers have used it. It has evolved from a component generator into a more complete development environment with GitHub sync, Vercel deploy, and agentic planning — but its core strength remains UI generation that would take a developer hours to write from scratch.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'v0 Tutorial: Beginner to Pro in 15 Minutes (Build ANY UI with AI)', url: 'https://www.youtube.com/watch?v=Gb3tF3jp4XU', note: 'Fastest way to get productive — all key features covered' },
            { label: 'How To Use v0 by Vercel 2025 (Tutorial For Beginners)', url: 'https://www.youtube.com/watch?v=P5ucjCOOj7I', note: 'Step-by-step beginner walkthrough — March 2025' },
            { label: 'v0 by Vercel — A Beginner\'s Guide', url: 'https://www.youtube.com/watch?v=ddmLx4KJI9I', note: 'Covers prompting, iteration, and copying code into a project' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What v0 actually is */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What v0 actually is — and what it is not" color={color} />
          <InfoBox color={color} dark={dark}>v0 is a UI code generator, not an app builder. It generates the frontend — the React components, the layout, the styling. It does not write Node.js servers, configure databases, or handle authentication logic. Think of it as an AI that writes the visual layer of your application. This focus is its strength: the components it generates are cleaner, more accessible, and more production-ready than what most generic AI tools produce.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>When you open v0.dev, you see a chat interface. Type a description of the UI you need. v0 generates React JSX with Tailwind CSS and shadcn/ui component library. You see a live preview immediately. You can iterate by sending follow-up messages: "add a loading state to the button", "make it responsive for mobile", "use a different color for the error message". When you are happy with the result, you copy the code into your project — or continue editing it in v0's built-in editor. This is the core workflow: prompt, iterate, copy. Everything else (GitHub sync, Vercel deploy, database integrations) is built on top of this foundation.</p>
        </Block>

        {/* How it works step by step */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How v0 works — step by step" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Write a prompt describing your UI', body: "Be specific about layout, purpose, and visual style. Example: 'A pricing page with three tier cards — Free, Pro, and Enterprise. Each card shows price, 5 feature bullet points, and a CTA button. Use a dark background with indigo accent colors. The Pro plan should be highlighted as recommended.' The more context you give, the better the first draft." },
            { n: '2', title: 'v0 generates React + Tailwind + shadcn/ui code', body: 'Within seconds you see generated JSX with live preview. The code uses real shadcn/ui components (Button, Card, Badge, etc.) and Tailwind utility classes. It follows Next.js conventions — server components where appropriate, proper TypeScript types if you ask.' },
            { n: '3', title: 'Iterate with follow-up messages', body: "v0 is a conversation, not a one-shot generator. You refine in chat: 'Make the Pro card border glow', 'Reduce the padding on mobile', 'Add a monthly/annual billing toggle'. Each message targets only what needs to change. This iterative loop is where v0 feels closest to working with a real developer." },
            { n: '4', title: 'Copy code or open in project', body: 'Click the Code tab to see the full JSX. Copy it directly into your React or Next.js project. Or use the \"Open in\" options to push to a new GitHub repo, open in StackBlitz, or deploy to Vercel. The code is yours — no lock-in, no runtime dependency on v0.' },
          ]} />
        </Block>

        {/* Key features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Key features" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Text to component', desc: 'Describe any UI element in plain English — login forms, nav bars, hero sections, data tables, pricing cards, dashboards — and get React code instantly. The primary use case, and what v0 does better than any competitor.' },
            { name: 'Image to UI', desc: 'Upload a screenshot, wireframe, or Figma export. v0 analyzes the layout and generates matching React code. Accuracy is best on landing pages, dashboards, and form-heavy interfaces. High-resolution images give better results.' },
            { name: 'Full page generation', desc: 'v0 is not limited to single components. You can generate complete page layouts — entire landing pages, dashboard shells, authentication flows. Combine the output with targeted component generation for specific sections.' },
            { name: 'Live preview', desc: 'Every generation shows a live rendered preview alongside the code. Toggle between Preview and Code tabs. See exactly what the component looks like before copying it. The preview is interactive — you can click buttons and test states.' },
            { name: 'Conversational iteration', desc: 'Refine any output with follow-up messages. v0 maintains context across the conversation — it knows what it generated and can apply targeted changes. This is faster than regenerating from scratch each time.' },
            { name: 'GitHub + Vercel integration', desc: 'Push to a GitHub repository directly. Deploy to Vercel with one click for instant production URL. A Git panel lets you manage branches and pull requests within v0. Production-grade CI/CD workflow from inside the UI generator.' },
          ]} />
        </Block>

        {/* Technology stack */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What v0 outputs — the technology stack" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'React + Next.js', badge: 'Primary framework', body: "v0's output follows Next.js conventions by default — app router, server components, proper file structure. The code is designed to drop directly into a Next.js project with zero modification. Works equally well in a plain React project if you remove Next.js-specific imports." },
            { label: 'Tailwind CSS', badge: 'Styling system', body: "Every component uses Tailwind utility classes exclusively — no custom CSS, no CSS Modules. Tailwind is the industry standard for React+Next.js projects in 2025. Reading v0's Tailwind output teaches you how experienced developers compose utility classes for responsive, accessible layouts." },
            { label: 'shadcn/ui', badge: 'Component library', body: "shadcn/ui is not an npm package — it's a collection of accessible, customizable React components you copy into your project. v0 uses shadcn's Button, Card, Input, Dialog, Tabs, Badge, and 30+ other components. Understanding shadcn/ui is a valuable skill: it's used in thousands of production apps." },
            { label: 'TypeScript', badge: 'Type system (optional)', body: 'v0 can generate TypeScript or JavaScript. TypeScript output includes proper prop types, interface definitions, and type annotations. If you ask for TypeScript, the generated code teaches you real TypeScript patterns — not just adding `: any` everywhere.' },
          ]} />
        </Block>

        {/* Free vs paid */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Free tier vs paid — what you actually get" color={color} />
          <InfoBox color={color} dark={dark}>v0 uses token-based credits. Free tier: $5 in monthly credits + 7 messages per day. Paid plans start at $20/month (Premium) which gives $20 in monthly credits plus $2 in free daily login credits. Token costs are model-dependent — simple prompts cost less, complex full-page generation costs more. The free tier is enough for learning, component prototyping, and integrating v0 into your development workflow.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: 'Free', title: '$5 monthly credits — good for learning', body: 'Approximately 20–40 component generations per month depending on complexity. Simple components (a button group, a form) use fewer tokens. Full-page generations (landing page, dashboard layout) use more. Free tier is enough to learn v0 and generate components for a portfolio project.' },
            { n: 'Pro', title: '$20/month — for regular use', body: '$20 in monthly credits + $2 daily credits when you log in. Worth it if you are actively building projects and using v0 for real UI work. Includes deploy to Vercel, Design Mode, and GitHub sync. Token costs vary by model: v0 Mini (cheapest), v0 (standard), v0 Pro, v0 Max (most capable).' },
            { n: 'Tip', title: 'Make your free tier last longer', body: 'Be detailed in your first prompt — one good 100-word prompt beats five short iterative ones. Use v0 Mini for simple components, save Max for complex full-page layouts. The more context you provide upfront, the fewer iteration messages you need, the fewer credits you spend.' },
          ]} />
        </Block>

        {/* v0 vs Bolt */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="v0 vs Bolt.new — which one to use" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'v0 by Vercel', badge: 'UI components → existing projects', body: 'Use v0 when you already have a React/Next.js project and need to build UI fast. It generates components you copy into your existing codebase. Best for: frontend-only UI prototyping, generating shadcn/Tailwind components, iterating on specific UI sections. Does not generate backends or handle databases.' },
            { label: 'Bolt.new', badge: 'Full-stack apps from scratch', body: 'Use Bolt when you want to generate a complete app — React frontend + Node.js backend + database integration — starting from nothing. Best for: new project scaffolding, portfolio sites, SaaS prototypes, hackathons. Installs npm packages and runs a real dev server in your browser.' },
            { label: 'When to use both', badge: 'Real workflow', body: "Start a new app in Bolt for the structure and backend, then use v0 to generate polished UI components to drop in. Or: use v0 to prototype how a section should look, then implement it in your existing project. The tools complement each other — v0 is a UI factory, Bolt is an app factory." },
          ]} />
        </Block>

        {/* Best use cases */}
        <Block title="Best use cases" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Generate a complete login/signup page with form validation, error states, and loading indicators — copy directly into your Next.js project',
            'Build a professional portfolio UI section-by-section: hero, skills grid, project cards, contact form — iterate until it looks right',
            'Convert a rough wireframe or design screenshot into working React code in under 2 minutes',
            'Prototype multiple UI variations for a feature (e.g., three different dashboard header designs) and compare them in the live preview',
            'Learn how experienced developers compose shadcn/ui and Tailwind — read v0\'s output as a teaching resource',
            'Generate accessible, responsive data tables, modals, and form components that would take hours to write from scratch',
            'Add UI to an existing project without switching out of your codebase — copy the component, adjust the props, done',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}`, marginBottom: '0.5rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 7 }} />
              <span style={{ fontSize: '0.85rem', color: sub, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Component Library for Your Portfolio</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Use v0 to generate four UI components and integrate them into a React project. The goal is to practice the real v0 workflow: prompt, iterate, copy, integrate. By the end you will have four production-quality components built in under an hour that would normally take a full day to write.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Generate a hero section', body: "Prompt: 'A hero section for a software developer portfolio. Full-width, dark background. Large heading with name placeholder, subtitle showing role (Full Stack Developer), two CTA buttons (View Projects / Contact Me), and a subtle animated gradient background. Use Tailwind and shadcn/ui. Make it responsive.' Iterate until it looks right. Copy the code." },
            { n: '2', title: 'Generate a project card component', body: "Prompt: 'A project card component for a portfolio. Shows: project name, one-line description, tech stack as small badge chips (React, Node.js, etc.), a GitHub link icon, and a Live Demo button. Dark card background with a subtle border. Hover state lifts the card slightly. Use shadcn/ui Card and Badge components.' Copy and parameterize the props." },
            { n: '3', title: 'Generate a skills section', body: "Prompt: 'A skills section for a developer portfolio. Organize skills into three groups: Frontend (React, TypeScript, Tailwind), Backend (Node.js, Python, SQL), and Tools (Git, Docker, VS Code). Each skill shows an icon placeholder and label. Clean grid layout, 3 columns on desktop, 2 on tablet, 1 on mobile.' Adjust the skills list to match your actual stack." },
            { n: '4', title: 'Integrate into a project and deploy', body: 'Create a new Next.js app (npx create-next-app). Install shadcn/ui following their setup guide. Copy each v0-generated component into the components folder. Import and use them in your page. Deploy to Vercel — free account, 30 seconds to live URL. Share the deployed URL.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? `rgba(99,102,241,0.08)` : `rgba(99,102,241,0.06)`, border: '1px solid rgba(99,102,241,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color, letterSpacing: '0.08em' }}>FREE TIER — 4 components well within monthly credits. shadcn/ui setup required once.</span>
          </div>
        </div>

        {/* Pro tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? `rgba(99,102,241,0.07)` : `rgba(99,102,241,0.07)`, border: `1px solid rgba(99,102,241,0.2)`, marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color, marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Treat v0's output as a starting point, not a final answer. Copy the generated code, then read through every class name and component prop. Change things: swap a color, adjust spacing, rename a prop. This transforms v0 from a "generate and forget" tool into a learning accelerator. Every component v0 writes teaches you how Tailwind and shadcn/ui are used in real production code — which is more valuable than the component itself.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/builders/bolt-new')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Bolt.new
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/builders/replit')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Replit <ChevronRight size={14} />
          </button>
        </div>

      </div>
      <ScrollToTop />
    </div>
  )
}

function Block({ title, titleColor, dark, border, card, children }) {
  return (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '1.375rem', backdropFilter: 'blur(8px)', marginBottom: '1.25rem' }}>
      {title && <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.14em', color: titleColor, textTransform: 'uppercase', paddingBottom: '0.75rem', marginBottom: '1rem', borderBottom: `1px solid ${titleColor}20` }}>{title}</div>}
      {children}
    </div>
  )
}

function VideoCard({ v, dark, txt, muted }) {
  return (
    <a href={v.url} target="_blank" rel="noopener noreferrer"
      style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1.125rem', borderRadius: 11, textDecoration: 'none', background: dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.16)', marginBottom: '0.625rem', transition: 'background 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.09)'}
      onMouseLeave={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)'}
    >
      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Play size={13} color="#fff" fill="#fff" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: txt }}>{v.label}</div>
        {v.note && <div style={{ fontSize: '0.7rem', color: muted, marginTop: 2 }}>{v.note}</div>}
      </div>
      <ExternalLink size={12} color={muted} />
    </a>
  )
}
