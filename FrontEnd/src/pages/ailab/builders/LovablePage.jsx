import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#EC4899'

export default function LovablePage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(236,72,153,0.09)' : 'rgba(236,72,153,0.11)'
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Builders</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>💜</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.0rem,3vw,1.5rem)', color: txt, margin: '0 0 0.25rem' }}>Lovable — AI Builds Your Full-Stack App From a Description</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>From prompt to production-ready web app — no coding experience required</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE TRIAL', '#4ADE80'], ['lovable.dev', color], ['Full-stack AI', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Lovable started as GPT Engineer — an open-source project that hit 50,000 GitHub stars by letting developers describe software in plain English and watch it write itself. In December 2024, the company rebranded as Lovable and launched a commercial product targeting a much wider audience: anyone who has an app idea but not the engineering background to build it. Within months, Lovable grew to 2.3 million users and $100M ARR, and received a $330M Series B in December 2025 at a $6.6B valuation backed by Nvidia and Salesforce. The core promise: describe what you want, and Lovable generates a complete React + TypeScript + Supabase application — frontend design, authentication, database schema, and backend logic — that you can deploy immediately. No environment setup, no package management, no infrastructure decisions.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Lovable Tutorial for Beginners (Best AI App Builder?)', url: 'https://www.youtube.com/watch?v=6VejFu1nEYs', dur: '~25 min', note: 'Official Lovable tutorial — covers GitHub + Supabase integrations for real full-stack apps' },
            { label: 'How I Built an App with Lovable in Under 1 Hour (2025)', url: 'https://www.youtube.com/watch?v=ZRmePOajOiI', dur: '~45 min', note: 'Full walkthrough — from first prompt to deployed app with auth and database' },
            { label: 'Build an App (SaaS) Using Lovable.dev & Supabase — Full Course', url: 'https://lovable.dev/video/build-an-app-saas-using-lovabledev-ai-supabase-full-course', dur: 'Full course', note: 'Production SaaS build: auth, payments, dashboard, database — the complete path' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What Lovable actually is */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What Lovable actually is" color={color} />
          <InfoBox color={color} dark={dark}>Lovable is a full-stack AI app builder that converts a plain English description into a working React + TypeScript + Tailwind CSS frontend wired to a Supabase backend — including PostgreSQL database, authentication, file storage, and Edge Functions. The entire project syncs to GitHub, can be published to a custom domain, and is yours to edit further with code if you want. You are not locked into a proprietary runtime — the output is standard, portable web technology.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The difference between Lovable and a simple code generator is context persistence. Lovable maintains the full application state across your conversation — add a feature, and it understands the existing components, schema, and auth setup. Ask it to fix a bug, and it reads the entire codebase to find the root cause. The Agent Mode goes further: it can search the web for solutions, explore files autonomously, and debug chains of errors without you guiding each step. This is not autocomplete for developers — it is an AI that builds the app alongside you, whether or not you know how to code.</p>
        </Block>

        {/* How it works */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How it works — the full-stack generation pipeline" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'You describe the app in plain English', body: 'Write what you want: "A task manager where users can sign in, create projects, add tasks with due dates and priority levels, and see a dashboard with completion stats." Lovable reads this as a product spec, not a command.' },
            { n: '2', title: 'Lovable generates the full React + TypeScript frontend', body: 'Component tree, routing with React Router, Tailwind CSS styling, responsive layout, forms with validation — all generated as clean, readable TypeScript. No CSS frameworks to configure, no component library to install.' },
            { n: '3', title: 'Supabase backend is provisioned automatically', body: 'Lovable connects to your Supabase project and creates: a PostgreSQL schema with the right tables, Row Level Security policies so users only see their own data, authentication with email/password and OAuth, and storage buckets if you need file uploads.' },
            { n: '4', title: 'You iterate with follow-up prompts', body: '"Add a drag-and-drop reorder for tasks", "Make the dashboard chart a bar chart instead", "Add a search bar to the projects list." Each instruction updates only the relevant components without breaking the rest of the app.' },
            { n: '5', title: 'Publish with one click — or sync to GitHub', body: 'Lovable hosts your app on a *.lovable.app subdomain instantly. Connect a custom domain on Pro. Every change syncs to a GitHub repository you own — so you can clone it, hand it to a developer, or deploy it anywhere.' },
          ]} />
        </Block>

        {/* Key features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Key features" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
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

        {/* Free vs Paid */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Free vs paid — what you actually get" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Free — $0/month', badge: 'Start here', body: '5 daily credits, public projects only, unlimited collaborators. Each credit covers a prompt-response cycle. 5 credits per day is enough to experiment and build small things. Projects are publicly visible on lovable.app — not a problem for learning and demos, but not suitable for anything you want to keep private.' },
            { label: 'Pro — $25/month', badge: 'For serious projects', body: '100 monthly credits, private projects, custom domain support, credit rollovers (unused credits carry to next month). This is the tier for building something real — a portfolio project, a side project, an MVP for a startup idea. Private projects and custom domains make it production-viable.' },
            { label: 'Business — $50/month', badge: 'For teams', body: 'Everything in Pro plus SSO, opt-out of data training (your code is not used to improve Lovable\'s model), design templates, and personal project spaces. Relevant if you are building for a client or startup and need data privacy guarantees.' },
            { label: 'Enterprise — Custom pricing', badge: 'For organizations', body: 'Dedicated support, custom onboarding, advanced access control, custom integrations. Only relevant if a company is deploying Lovable at scale.' },
          ]} />
        </Block>

        {/* Lovable vs Bolt vs v0 */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Lovable vs Bolt.new vs v0 — which one to use" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Lovable — full-stack MVPs fastest', badge: 'Best for complete apps', body: 'Choose Lovable when you need a working full-stack app: auth, database, frontend, deployment — all from one tool. Best for non-technical founders, students building portfolio projects, and anyone who wants a real product rather than a prototype. The Supabase integration is first-class and the code is actually clean and exportable.' },
            { label: 'Bolt.new — developer flexibility', badge: 'Best for developers', body: 'Bolt.new is better if you are a developer who wants framework flexibility (Next.js, Vue, SvelteKit) and more control over the generated code. Bolt gives 1M tokens/month free — a more generous free tier. Trade-off: backend integration is manual, you configure your own services. Better for developers; harder for beginners.' },
            { label: 'v0 by Vercel — clean React UI', badge: 'Best for frontend components', body: 'v0 is unbeatable for generating individual React components and full-page UIs with shadcn/ui. It has no backend story — it is purely a frontend tool. Use v0 when you want a production-quality component and you will handle the backend yourself. Many developers use v0 for UI design + Lovable for the backend logic.' },
          ]} />
          <div style={{ padding: '0.75rem 1rem', borderRadius: 10, background: dark ? `${color}08` : `${color}06`, border: `1px solid ${color}20`, marginTop: '0.75rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color, letterSpacing: '0.06em' }}>PRACTICAL STRATEGY:</span>
            <span style={{ fontSize: '0.82rem', color: sub, marginLeft: '0.5rem' }}>Use Lovable to build the full app quickly. When you need a polished specific UI component, pull in v0. Use Bolt when you have developer skills and want code-level control.</span>
          </div>
        </Block>

        {/* Best use cases */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What you can actually build" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'SaaS MVPs', desc: 'Authenticated multi-user SaaS products: subscription dashboards, booking platforms, project management tools, CRM systems. Full auth + database + UI in one session.' },
            { name: 'Portfolio projects', desc: 'Build portfolio pieces that actually work — not static mockups. A task app, a blog platform, a booking system with a real database behind it impresses interviewers far more than a Figma design.' },
            { name: 'Internal tools', desc: 'Admin dashboards, data entry forms, approval workflows, reporting panels for teams. Non-technical managers can ship internal tools without a developer queue.' },
            { name: 'Startup validation', desc: 'Test a product idea with a real working prototype before hiring engineers. Show users an actual app — with login, data, and core flows — to validate demand before investing in a full build.' },
            { name: 'Learning projects', desc: 'Build real apps to learn React and TypeScript by reading Lovable\'s generated code. The output is clean, well-structured code that demonstrates real patterns — better learning material than tutorials.' },
            { name: 'Client projects', desc: 'Freelancers can deliver simple web apps in hours rather than weeks. Landing pages with forms, small business dashboards, event registration tools — all fully functional and deployable.' },
          ]} />
        </Block>

        {/* Getting started */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Getting started — from zero to deployed app" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Sign up at lovable.dev', body: 'Create a free account. You get 5 daily credits to start. No credit card required. The free tier is enough to build a complete small app over a few days.' },
            { n: '2', title: 'Write a clear initial prompt', body: 'Do not just say "make a to-do app". Describe the full product: who uses it, what they can do, what data is stored, what the main screens are. More context in the first prompt = less iteration needed later. A 3–5 sentence product description is ideal.' },
            { n: '3', title: 'Connect a Supabase project', body: 'Create a free account at supabase.com. Lovable will prompt you to connect it — paste the project URL and anon key. Lovable then creates all tables, auth setup, and RLS policies automatically in your Supabase project.' },
            { n: '4', title: 'Iterate with specific follow-up prompts', body: 'After the initial generation, refine one thing at a time: "Add a profile page where users can update their name and avatar", "Make the navigation mobile-friendly", "Add sorting to the table by date". Vague follow-ups produce vague results.' },
            { n: '5', title: 'Connect GitHub and publish', body: 'Sync to GitHub before you have much work done — it gives you a safety net. Then publish: your app is live on a *.lovable.app URL instantly. On Pro, add your own domain.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Build a complete full-stack web app — auth, database, frontend, deployment — entirely from plain English prompts',
            'Go from app idea to live URL in a single afternoon, without installing anything or configuring infrastructure',
            'Generate clean React + TypeScript code you own, can export, and can continue building with standard tools',
            'Automatically create Supabase databases with proper schema, Row Level Security, and auth providers',
            'Sync every project to a GitHub repository from day one — your code is never locked in the platform',
            'Use Agent Mode to debug complex issues autonomously — describe the problem, Lovable investigates and fixes it',
            'Build portfolio projects that actually work with real data, impressing interviewers far beyond static mockups',
            'Validate startup ideas with working prototypes before spending money on engineering hires',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Study Session Tracker</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Build a real full-stack study tracker app using Lovable — with authentication, a database, and a working frontend. The goal is not just to generate the app, but to understand each part of what was generated and to walk away with something deployed and shareable. A working app in your portfolio beats a tutorial project on GitHub every time.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Write your product prompt', body: 'Write a clear description: "A study session tracker where students can sign in, log study sessions with subject, duration, and notes, see their total study hours per subject in a dashboard, and set a weekly study goal with a progress bar." Spend 5 minutes on this prompt — it determines the quality of the initial generation.' },
            { n: '2', title: 'Generate and connect Supabase', body: 'Paste the prompt into Lovable, watch the app generate, then connect a free Supabase project when prompted. Lovable creates the sessions table, user auth, and RLS policies. Log in to Supabase and inspect the tables — understand what was created.' },
            { n: '3', title: 'Add 3 features via follow-up prompts', body: 'Iterate: (1) "Add a streak counter showing how many days in a row the user has logged a session", (2) "Add the ability to export session data as a CSV", (3) "Make the dashboard mobile responsive." Each prompt is one credit — be specific.' },
            { n: '4', title: 'Publish and sync to GitHub', body: 'Publish to a *.lovable.app URL and sync to your GitHub account. Share the live URL in your portfolio or resume. Look at the generated code in the GitHub repo — read 3 components to understand the React + Supabase patterns used.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Lovable free tier (5 daily credits) + Supabase free tier. No credit card required for either.</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>The most common mistake with Lovable is treating it like a search engine — one prompt and done. Real apps are built iteratively. Write a complete initial prompt, then add one feature per follow-up message. Trying to describe everything in one giant prompt produces bloated, confused code. Small, specific follow-ups produce clean, targeted changes. Also: sync to GitHub early, before you have much work. It takes 10 seconds and means you can always roll back if a prompt goes badly.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/builders/v0')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> v0 by Vercel
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
        {(v.dur || v.note) && <div style={{ fontSize: '0.7rem', color: muted, marginTop: 2 }}>{[v.dur, v.note].filter(Boolean).join(' · ')}</div>}
      </div>
      <ExternalLink size={12} color={muted} />
    </a>
  )
}
