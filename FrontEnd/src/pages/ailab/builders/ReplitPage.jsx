import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#F26207'

export default function ReplitPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(242,98,7,0.09)' : 'rgba(242,98,7,0.13)'
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🔁</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Replit — Code, Build, and Deploy in Your Browser</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>50+ languages, AI coding assistant, and instant deployment — no setup needed</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE TIER', '#4ADE80'], ['replit.com', color], ['Browser IDE + AI', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Replit started as a browser-based IDE where you could write and run code in 50+ languages without installing anything — no Python setup, no Node.js environment, no terminal configuration. That alone made it the go-to platform for CS courses, coding bootcamps, and students learning their first programming language. Then in September 2024, Replit launched Replit Agent: describe what you want to build in plain English, and the AI writes the code, installs dependencies, sets up the database, and deploys the app — all in the browser, all automatically. Replit is now both a coding education platform and an AI app builder, which makes it uniquely useful for students who want to learn real programming AND ship real projects. As of 2025, Replit attracts over 12.6 million monthly visitors and is used by more than 30 million developers worldwide.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Replit Tutorial for Beginners: Build App with AI (2025)', url: 'https://www.youtube.com/watch?v=qpIDMZZIv3s', dur: '~15 min', note: 'Best intro — covers the full IDE and AI agent workflow' },
            { label: 'How to Build Apps with Replit AI Agent | Full Beginner Course', url: 'https://www.youtube.com/watch?v=DaXQ5L7r7Lg', dur: 'Full course', note: 'Step-by-step Replit Agent tutorial from zero to deployed app' },
            { label: 'Replit 2025 Tutorial — How to Use Replit For Beginners', url: 'https://www.youtube.com/watch?v=difq3ygPPiI', dur: '~20 min', note: 'Covers IDE, multiplayer, hosting and AI features' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What Replit actually is */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What Replit actually is" color={color} />
          <InfoBox color={color} dark={dark}>Replit is three things combined: a browser-based IDE that runs real code in 50+ languages, a cloud hosting platform that deploys your app with one click, and since 2024 — an AI agent that can build entire applications from a plain-English description. You open a browser, describe what you want, and Replit handles everything else: writing the code, installing packages, configuring the database, and hosting the live URL.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>Before Replit, learning to code meant spending the first few hours of every project fighting environment setup — installing Python, dealing with version conflicts, configuring virtual environments, figuring out why npm install failed. Replit eliminated all of that. Every project starts in seconds in the browser. This is why it became the standard platform for CS courses at universities and coding bootcamps: students can focus on writing code rather than fighting their operating system. The 2024 addition of Replit Agent extended this further — now students can build and deploy real full-stack applications even before they know how to write all the code themselves, then read the generated code to understand how it works.</p>
        </Block>

        {/* Key Features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Key features" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Browser-based IDE', desc: 'Full code editor in your browser — syntax highlighting, autocomplete, file tree, terminal, and package manager. Works on any device including Chromebooks and tablets. No local installation ever.' },
            { name: '50+ languages', desc: 'Python, JavaScript, TypeScript, Java, C, C++, Go, Rust, Ruby, PHP, HTML/CSS, SQL and dozens more — all pre-configured and ready to run. Switch between languages on the same platform.' },
            { name: 'Ghostwriter AI', desc: 'AI coding assistant built directly into the editor. Provides real-time code completions, explains any selected code in plain English, fixes bugs on demand, and generates functions from comments. Available in all paid plans.' },
            { name: 'Multiplayer coding', desc: 'Share a live coding session with a link — multiple people edit the same file in real-time, like Google Docs for code. Every cursor is visible. Used widely for pair programming and group assignments.' },
            { name: 'One-click deploy', desc: 'Every Replit project can become a live public URL with one click. No server configuration, no domain setup, no DevOps. The app runs 24/7 on Replit\'s infrastructure as long as you keep it hosted.' },
            { name: 'Replit Database', desc: 'Built-in key-value database available to every project — no setup, no connection strings. For full-stack apps, Replit Agent automatically provisions and configures a PostgreSQL database.' },
          ]} />
        </Block>

        {/* Replit Agent */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Replit Agent — describe an app, it builds it" color={color} />
          <InfoBox color={color} dark={dark}>Replit Agent (launched September 2024) is an autonomous AI that turns a plain-English description into a working, deployed full-stack application. You describe what you want — the Agent writes the code, installs dependencies, sets up the database, runs tests, fixes errors it finds, and deploys the final app. In 2025, Agent v3 can work autonomously for up to 200 minutes and includes Design Mode for building interactive UI mockups in under 2 minutes.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Describe your app', body: 'Type a description in the Agent chat: "Build a todo app with user login, task categories, and a progress bar" — be specific about features. The more detail you provide, the closer the result is to what you need. You can also ask Agent to add features to an existing project.' },
            { n: '2', title: 'Agent plans and builds', body: 'Agent generates a plan, writes all the code files, installs required packages, and sets up the project structure. You can watch it work in real-time — every file it creates appears in the editor. Agent tests its own code and fixes errors it finds before handing it to you.' },
            { n: '3', title: 'Review the generated code', body: 'Every file Agent created is visible in the editor. Read through the code — this is one of the best learning opportunities Replit provides. You can ask Agent to explain any part: "Explain what this function does" or "Why did you use this approach here?"' },
            { n: '4', title: 'Iterate and customize', body: 'Continue the conversation: "Add a dark mode toggle", "Change the color scheme to blue", "Add a search bar". Agent modifies the existing code rather than starting over. Each iteration teaches you how specific features are implemented.' },
            { n: '5', title: 'Deploy with one click', body: 'When the app is ready, click Deploy. Replit hosts it at a public URL instantly. Share the link with anyone — no additional setup. The deployed app runs on Replit\'s servers 24/7.' },
          ]} />
        </Block>

        {/* Free vs Paid */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Free vs paid — what you actually get" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Free Starter Plan', badge: 'Good for learning', body: 'Create unlimited public projects in any language, run code directly in the browser, access the multiplayer collaboration features, and deploy one hosted app. Free includes 100 Ghostwriter AI completions per day — enough to experiment and learn. Storage is limited to 10GB. For CS courses, Python scripts, and exploring Replit, the free tier covers most student needs.' },
            { label: 'Replit Core — $25/month', badge: 'Needed for Replit Agent', body: 'Unlimited Ghostwriter AI completions, full access to Replit Agent (the natural-language app builder), private projects, 4 vCPUs and 8 GiB of memory per workspace, and $25 in monthly compute credits for deployed apps. Core is required to use Replit Agent for building full-stack apps. The upgrade makes sense when you want to ship real projects, not just learn.' },
            { label: 'Replit Teams — $40/seat', badge: 'For classrooms and orgs', body: 'All Core features plus team workspaces, shared projects, admin controls, and education-focused features. Universities and bootcamps use Teams to give all students a consistent environment and enable instructors to monitor and help with live code sessions.' },
          ]} />
        </Block>

        {/* Replit vs Bolt.new vs Cursor */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Replit vs Bolt.new vs Cursor — which to use" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Replit', badge: 'Best for students + learning', body: '50+ languages including Python, Java, C++ — not just JavaScript. Full cloud IDE so you can actually write and learn code, not just generate it. Built-in hosting, multiplayer, and a real database. Replit Agent builds full-stack apps including backend logic and server-side code. Best choice if you want to learn programming AND build real projects, or if your work involves Python or backend languages.' },
            { label: 'Bolt.new', badge: 'Best for fast JavaScript apps', body: 'Fastest path from prompt to deployed frontend — better for JavaScript/TypeScript React apps. Backend is limited to Node.js/Express only; no Python, Java, or other languages. Excellent free tier with monthly credits. The right choice when you need a polished web app front-end quickly and are already comfortable with the JavaScript ecosystem. Not a coding education platform — purely a build-and-deploy tool.' },
            { label: 'Cursor', badge: 'Best for professional coding', body: 'VS Code rebuilt with deep AI integration — you write the code, AI helps. Not a no-code builder; requires real programming knowledge. No hosting included. Best for students who already code and want an AI pair programmer while writing real, production-quality code in their local environment. Completely different use case from Replit Agent — Cursor accelerates coding skill, Replit Agent builds apps for you.' },
          ]} />
        </Block>

        {/* Student use cases */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Use cases for students" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'CS course assignments', body: 'Every major CS course platform (CS50, MIT OpenCourseWare, freeCodeCamp) recommends or supports Replit. Your professor shares a link, you open it in a browser, write your code, and submit — no installation, no "it works on my machine" problems. Works from any computer including the library.' },
            { n: '2', title: 'Python data science projects', body: 'Run Jupyter-style Python code, use pandas, numpy, and matplotlib without installing Anaconda. For data science coursework, machine learning experiments, or data visualization projects, Replit provides a ready-made environment with common packages pre-available.' },
            { n: '3', title: 'Collaborative group projects', body: 'Share a Replit link and code with teammates in real-time — everyone sees each other\'s cursors, changes sync instantly. Much more practical than merging Git branches for non-CS students working on coding-adjacent projects for the first time.' },
            { n: '4', title: 'Build and ship a portfolio project', body: 'Use Replit Agent to build a full-stack application — a web app, API, or tool — and deploy it to a live URL. Add the URL to your resume and GitHub. Recruiters value seeing deployed, working projects. Replit gives you a public URL with no cost or server management.' },
            { n: '5', title: 'Learn by reading generated code', body: 'Ask Replit Agent to build something, then read every file it generated. Ask Agent to explain anything you do not understand. This reverse-engineering approach — read working code, understand it, modify it — accelerates learning faster than building from scratch when you are just starting.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Write and run code in 50+ languages directly in the browser with no setup or installation',
            'Use Replit Agent to build a full-stack web application from a plain-English description',
            'Deploy a live public URL for any project with one click — share it in your resume or portfolio',
            'Code collaboratively in real-time with teammates using multiplayer mode — no merge conflicts',
            'Complete CS course assignments from any device, including Chromebooks and shared computers',
            'Learn Python, JavaScript, Java, and C++ all on the same platform without switching tools',
            'Use Ghostwriter AI for code completions, bug fixes, and plain-English code explanations inline',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build and Deploy a Real App</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Use Replit to build a small but real project — a Python tool or a simple web app — and deploy it to a live URL. The goal is to experience the full cycle: write code, run it, fix it, ship it. You do not need Replit Agent for this; the free IDE is enough for a Python script or basic web page.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Create a free account at replit.com', body: 'Sign up with your Google account. Create a new Repl and choose Python (or any language you are learning). The editor opens immediately — no downloads.' },
            { n: '2', title: 'Build a small Python project', body: 'Write a Python script that does something useful: a number guessing game, a unit converter, a simple calculator, or a text-based quiz. Aim for 30-50 lines. Run it with the Run button and fix any errors using Ghostwriter\'s "Fix" suggestion.' },
            { n: '3', title: 'Use Ghostwriter to explain your code', body: 'Select any function you wrote, right-click and choose "Explain code". Read the explanation. Then try asking it to add a feature: "Add a high score tracker using a list". Observe how it modifies the existing code.' },
            { n: '4', title: 'Deploy and share the live URL', body: 'Click the Deploy button. Replit gives you a public URL — your app is live on the internet. Copy the URL and add it to your LinkedIn profile or resume under Projects. This is now a real, verifiable portfolio piece.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Replit free tier, no credit card needed</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>The most underused Replit feature for students is reading Replit Agent's generated code rather than just running the app. When Agent builds something, every file it creates is open in the editor. Spend 15 minutes reading through it: what files did it create, how does the routing work, how does it connect to the database. This is the fastest way to go from "I used AI to build this" to "I understand how this works and could modify it myself" — which is what matters when you are in a technical interview.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/builders/v0')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> v0 by Vercel
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/builders/lovable')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Lovable <ChevronRight size={14} />
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
