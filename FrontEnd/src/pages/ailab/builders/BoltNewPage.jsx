import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#F59E0B'

export default function BoltNewPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(245,158,11,0.09)' : 'rgba(245,158,11,0.13)'
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>⚡</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Bolt.new — Type a Prompt, Get a Full-Stack App</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Browser-based AI app builder — from idea to deployed in minutes</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE TIER', '#4ADE80'], ['bolt.new', color], ['StackBlitz', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Bolt.new is the AI app builder that went from zero to $40 million in annual revenue in six months — because it does something genuinely new. You type what you want to build in plain English, and Bolt generates a complete full-stack web application running live in your browser: React frontend, Node.js backend, Tailwind styling, npm packages, and all. No local installation, no configuration, no "getting started" friction. The code is visible and editable as it generates — which matters for learning. You can read every file Bolt creates, understand why it made each choice, and modify anything. One-click deploy to Netlify gets your app live on the internet. For students who want to build a professional portfolio project, prototype an idea, or just see how a real full-stack app is structured — Bolt removes every barrier except the idea itself.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Bolt.new Tutorial for Beginners (2025)', url: 'https://www.youtube.com/watch?v=snKX9QjLVaY', dur: null, note: 'Best beginner walkthrough 2025' },
            { label: 'Bolt.new Tutorial: Build & Deploy AI Web Apps in Minutes', url: 'https://www.youtube.com/watch?v=cSDWr2WdpqI', dur: null, note: '2024 beginner guide' },
            { label: 'The Ultimate Guide to Bolt.new | Build Apps with AI (Step-by-Step)', url: 'https://www.youtube.com/watch?v=0_Ij8FEvY4U', dur: null, note: 'Comprehensive step-by-step' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* How Bolt works — WebContainers */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How Bolt works — WebContainers" color={color} />
          <InfoBox color={color} dark={dark}>Bolt uses StackBlitz's WebContainers technology — it compiles Node.js to WebAssembly and runs a complete operating system in your browser tab. This is not a simulation: npm packages actually install, servers actually start, and code actually executes — all locally in your browser, not on a remote cloud server. This is why Bolt has zero latency between edit and preview.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The practical result: open bolt.new and you have a full development environment in 3 seconds with no setup. Type a prompt, and Bolt generates code as diffs (targeted changes) rather than rewriting entire files — which means iteration is fast and your existing work is preserved. Everything is editable: click any file in the project tree on the right, change the code, and the preview updates instantly. This is closer to pair programming than autocomplete.</p>
        </Block>

        {/* What Bolt can build */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What Bolt can build" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Portfolio websites', desc: 'Professional portfolio with sections, contact form, project showcase. Builds in under 10 minutes. Deploys to Netlify with a live URL. Better output than 90% of manually built portfolios at 1% of the time.' },
            { name: 'SaaS prototypes', desc: 'Landing page + authentication + dashboard + database. Show investors or employers a working demo of your idea. Bolt connects Supabase for real database functionality.' },
            { name: 'Full-stack web apps', desc: 'React frontend + Node.js backend + REST API. Todo apps, trackers, dashboards, CRUD applications. Real full-stack architecture visible in the code.' },
            { name: 'Landing pages', desc: 'Marketing pages with hero sections, feature grids, pricing tables, and CTAs. Tailwind CSS styling, responsive by default. Useful for hackathon submissions and project demos.' },
            { name: 'Admin dashboards', desc: 'Data tables, charts, filtering, CRUD operations. Connect to Supabase for real data. Build internal tools, analytics dashboards, or project management boards.' },
            { name: 'Side project MVPs', desc: 'Turn a business idea into a working MVP for a hackathon or portfolio. Bolt accelerates from idea to functional demo in an afternoon, not weeks.' },
          ]} />
        </Block>

        {/* The technology Bolt uses */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="The technology Bolt uses" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Frontend stack', badge: 'React + TypeScript + Tailwind', body: 'Bolt defaults to React with TypeScript and Tailwind CSS. The output follows real production patterns — component structure, hooks, proper TypeScript types. Reading Bolt\'s generated React code teaches you how professionals structure React applications.' },
            { label: 'Backend stack', badge: 'Node.js + Express only', body: 'Backend is Node.js with Express. Important limitation: Bolt does NOT support Python, PHP, or Go backends. If your project requires Python (data science, ML), use Replit instead. For JavaScript full-stack (which covers 80% of web apps), Node.js is the right choice.' },
            { label: 'Database and auth', badge: 'Supabase integration', body: 'Connect Supabase (free tier: 500MB database) for PostgreSQL database, authentication, file storage, and real-time subscriptions. Bolt generates the complete integration code. Supabase works best with Vite + React projects in Bolt.' },
          ]} />
        </Block>

        {/* Free tier */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Free tier — what you actually get" color={color} />
          <InfoBox color={color} dark={dark}>Bolt's free tier gives 300,000 tokens per day and 1,000,000 tokens per month. A simple portfolio site uses ~50,000–150,000 tokens. A complex full-stack app with authentication and database can use 500,000+ tokens. Free tier is enough for learning, prototyping, and portfolio projects — but complex multi-feature apps may hit limits.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Simple apps fit comfortably in free tier', body: 'Portfolio sites, landing pages, simple CRUD apps: 50K–200K tokens. Well within free limits. Build and iterate multiple times per day.' },
            { n: '2', title: 'Complex apps burn tokens fast', body: 'Real-time features, complex auth flows, multiple API integrations: 300K–800K tokens. May hit daily limits. Strategy: describe the full app in one detailed prompt rather than many small iterative prompts.' },
            { n: '3', title: 'Pro ($25/month) if you ship regularly', body: '10M tokens/month with rollover (from July 2025), custom domains, remove Bolt branding. Worth it if you\'re building apps professionally or for client work. Free tier covers all student learning and prototyping.' },
          ]} />
        </Block>

        {/* Bolt vs v0 vs Lovable vs Replit */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Bolt vs v0 vs Lovable vs Replit" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Bolt.new', badge: 'Best: full-stack + learning', body: 'Builds complete full-stack apps. Code is fully visible and editable. Best for: students who want to build real apps and understand the code, hackathon prototypes, portfolio projects. Limitation: JavaScript/TypeScript only.' },
            { label: 'v0 by Vercel', badge: 'Best: React UI components', body: 'Generates beautiful React + Tailwind UI components from text. Frontend only — no backend, no database. Best for: copying ready-made components into an existing project, designing UI layouts quickly. Not an app builder.' },
            { label: 'Lovable', badge: 'Best: beginners who want beauty', body: 'Similar to Bolt but hides more of the code complexity. Produces more polished outputs with less config. Best for: non-technical founders, demos where visual quality matters more than code learning. Less useful for developing actual coding skills.' },
            { label: 'Replit', badge: 'Best: learning to code', body: 'Online IDE with AI assistance. Supports 50+ languages including Python, Java, C++. Best for: CS students learning programming fundamentals, running class assignments, any language except JavaScript-only. Bolt is faster for building; Replit is better for learning.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Build a professional portfolio website with multiple sections, projects, and contact form — deployed live in 20 minutes',
            'Prototype any web app idea with real React + Node.js + database architecture visible in the code',
            'Learn how full-stack applications are structured by reading the code Bolt generates',
            'Deploy to Netlify with one click and share a live URL in your resume or LinkedIn',
            'Iterate on your app by describing changes in plain English — Bolt applies targeted diffs',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build and Deploy Your Portfolio</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Use Bolt.new to build a professional portfolio website. Include: hero section with your name and role, skills section with your tech stack, projects section with 3 projects (add placeholders if needed), and a contact section. Deploy to Netlify. Share the live URL. Then: open the generated code and read every component file. Where is the routing? How is Tailwind used? What does the component structure look like? Reading the output is the learning.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Write a detailed prompt', body: "Be specific: 'Build a professional portfolio for a software developer named [Your Name]. Include: a hero section with name and tagline, a skills section showing React/Node.js/Python/SQL, a projects section with 3 project cards (title, description, tech stack, GitHub link), and a contact form. Use a dark theme with purple accent colors. Make it fully responsive.'" },
            { n: '2', title: 'Iterate with follow-ups', body: "After the first generation: ask for changes in plain English. 'Make the hero section text larger', 'Add a smooth scroll animation', 'Change the accent color to cyan', 'Add hover effects to the project cards'. Each follow-up makes targeted changes." },
            { n: '3', title: 'Deploy to Netlify', body: 'Click the Deploy button in Bolt → connect your Netlify account (free) → deploy. You get a live URL like yourname-portfolio.netlify.app in under 2 minutes. Add this URL to your LinkedIn and GitHub profile.' },
            { n: '4', title: 'Read the generated code', body: 'Open each component file in the right panel. Read: how is React Router used? How are the Tailwind classes structured? Where is the data defined? Understanding the code Bolt wrote is how you learn React patterns from real working examples.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>FREE TIER — 300K tokens/day is enough for a full portfolio build</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Write your initial Bolt prompt in one detailed paragraph rather than starting simple and adding features. More context in the first prompt = fewer token-burning iterations. Include: the app name, target users, all features you want, design preferences (dark/light, color scheme, style), and any specific technologies (Supabase for database, Clerk for auth). A 200-word prompt produces a much better first draft than a 10-word one.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/chatbots/huggingchat')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> HuggingChat
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/builders/v0')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            v0 by Vercel <ChevronRight size={14} />
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
