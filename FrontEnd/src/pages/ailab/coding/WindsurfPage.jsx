import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#F59E0B'

export default function WindsurfPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(0,217,255,0.09)' : 'rgba(79,70,229,0.11)'
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Coding Tools</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🌊</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Windsurf — The Agentic AI Code Editor</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Codeium's editor that executes multi-step tasks autonomously</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE TIER', '#4ADE80'], ['Generous free plan', color], ['Codeium', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Windsurf is Codeium's answer to Cursor — a full VS Code fork rebuilt for AI-first development. What makes Windsurf distinct is its "Cascade" feature: an agentic AI mode that doesn't just suggest code or answer questions, but executes multi-step tasks end to end. Tell Cascade to "build a REST API with authentication, connect it to a PostgreSQL database, and write integration tests" — it plans the steps, writes the code, runs commands in the terminal, fixes errors it encounters, and works through the task largely autonomously. For students who want to learn by watching an AI build something complete — and understand every step — Windsurf's transparent execution approach is uniquely valuable. The free tier is among the most generous of any AI coding editor.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Windsurf AI Tutorial — Complete Guide for Beginners', url: 'https://www.youtube.com/watch?v=lkPkh_q3tO4', dur: '16 min', note: 'Full overview and Cascade walkthrough' },
            { label: 'Windsurf vs Cursor — Which AI Editor Is Better in 2025?', url: 'https://www.youtube.com/watch?v=4LLvlWJe7oA', dur: '12 min', note: 'Detailed comparison' },
            { label: 'Windsurf Cascade — Agentic AI Coding Explained', url: 'https://www.youtube.com/watch?v=FLkDj6LKTRE', dur: '10 min', note: 'Cascade deep dive' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What makes Windsurf different */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What makes Windsurf different" color={color} />
          <InfoBox color={color} dark={dark}>Windsurf's Cascade operates as a coding agent — it maintains a mental model of your codebase, plans sequences of actions, executes them, observes the results (including terminal output and errors), and adjusts. Unlike autocomplete or chat, Cascade acts in a loop: plan → execute → observe → continue, the same cycle that defines agentic AI systems.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The practical difference between Windsurf Cascade and Cursor Composer is autonomy. Cursor generates a diff and waits for you to approve each step. Cascade can run terminal commands, read file outputs, fix errors it caused, and continue working toward the goal with less manual intervention. For learning, Windsurf's action log shows every step it takes — making it transparent about what an AI agent actually does, not just what code it produces.</p>
        </Block>

        {/* Cascade vs traditional AI coding assistance */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Cascade vs traditional AI coding assistance" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Traditional autocomplete (Copilot)', badge: 'Reactive', body: 'You type, it suggests the next line or block. You accept or reject. The AI is a fast typist responding to your immediate context. Best for familiar patterns you could write yourself — just faster.' },
            { label: 'Chat + diff (Cursor Composer)', badge: 'Collaborative', body: 'You describe a change, it generates a full multi-file diff, you review and apply. More powerful than autocomplete for larger changes. Still requires you to review and apply every change.' },
            { label: 'Agentic execution (Windsurf Cascade)', badge: 'Autonomous', body: 'You describe a goal, Cascade works toward it through multiple steps, running commands, fixing errors, writing code iteratively. Best for complex multi-step tasks. Requires less manual intervention but more careful goal description upfront.' },
          ]} />
        </Block>

        {/* Core features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Core features" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Cascade (agentic mode)', desc: 'The headline feature. Describe a goal and Cascade executes it step by step — writing code, running terminal commands, reading outputs, fixing errors. Works toward the full goal autonomously.' },
            { name: 'Inline AI (Cmd+I)', desc: "Select code and describe an edit. Same as Cursor's inline edit. Fast for targeted modifications to specific blocks." },
            { name: 'AI Chat panel', desc: 'Context-aware chat with your codebase. Ask questions, request explanations, understand architecture. Full codebase indexing like Cursor.' },
            { name: 'Tab autocomplete', desc: "Free autocomplete powered by Codeium's model (same technology as the Codeium extension). Available on the free tier with no usage limits." },
            { name: 'Action log', desc: 'Every Cascade action is logged — file reads, writes, terminal commands, outputs. You can see exactly what the agent did and why, making it a learning tool as much as a productivity tool.' },
            { name: 'Model selection', desc: "Choose between Claude 3.5 Sonnet, GPT-4o, and Codeium's own models per conversation. Different models have different strengths for different types of coding tasks." },
          ]} />
        </Block>

        {/* Using Cascade effectively */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Using Cascade effectively" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Write specific goal descriptions', body: 'Vague: "build a user system". Specific: "Create a user authentication system in Python Flask with: registration endpoint, login endpoint returning JWT, a protected /profile route, and passwords stored as bcrypt hashes in SQLite." The more specific, the more aligned the result.' },
            { n: '2', title: 'Let it run, then review', body: "Cascade will execute multiple steps automatically. Resist the urge to interrupt constantly. Let it complete its plan, then review the action log and the resulting code together." },
            { n: '3', title: 'Review the action log', body: 'After Cascade completes a task, read through the action log step by step. This is how you learn what the agent did — understanding the execution trace is as valuable as the code output.' },
            { n: '4', title: 'Iterate on the result', body: "Cascade's first pass is rarely perfect. Follow up: \"The authentication works but add refresh token support and proper error messages for invalid credentials.\" Cascade reads its previous work and extends it." },
            { n: '5', title: 'Use it to learn unfamiliar tech', body: 'Pick a technology you want to learn. Ask Cascade to build a small working example. Read the code, the action log, and ask follow-up questions. Seeing a complete working implementation with your project\'s context is better than most tutorials.' },
          ]} />
        </Block>

        {/* Free tier comparison */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Free tier comparison" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Windsurf free tier', badge: 'Most generous', body: "Free plan includes: unlimited Codeium tab autocomplete, 25 Cascade agent uses per month, 5 premium AI model uses per month. The autocomplete alone (unlimited) is comparable to Copilot's paid tier. Best free option for daily use." },
            { label: 'Cursor free tier', badge: 'Limited AI calls', body: 'Free plan includes: 200 completions and 50 premium model uses per month. After 2 weeks Pro trial. More restrictive than Windsurf on the free tier for high-volume use.' },
            { label: 'Copilot free tier', badge: 'Free for students', body: 'Free for verified students via GitHub Education Pack. Unlimited completions and chat. Best free unlimited option if you qualify for the student pack.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Describe a complete feature and let Windsurf Cascade execute it step by step including terminal commands',
            "Learn how AI agents work by reading Cascade's action log — see exactly what steps it planned and executed",
            "Use the free tier's unlimited tab autocomplete daily without worrying about usage limits",
            'Build complete working examples of technologies you want to learn by prompting Cascade to construct them',
            'Compare different AI models (Claude, GPT-4o, Codeium) for different coding task types',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Give Cascade a Complete Task</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Pick something you want to build: a web scraper, a CLI tool, a REST API, a data processing script. Write a detailed specification (5-8 sentences covering what it does, what technologies to use, what the inputs/outputs are, and any constraints). Give this to Cascade in one prompt. Watch it execute. Read the action log. After it finishes, read every file it created. The goal is not just to have the thing built — it is to understand every decision Cascade made and why.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Write a detailed spec', body: 'Define your task clearly: what it does, tech stack (Python/JS/etc.), inputs, outputs, any constraints. 5-8 sentences is the right length for a well-scoped Cascade task.' },
            { n: '2', title: 'Start a Cascade session', body: 'Click the Cascade icon (or Ctrl+L). Paste your spec. Press enter and let Cascade work. Do not interrupt until it pauses or completes.' },
            { n: '3', title: 'Read the action log', body: 'Open the action log. Read every step: what files it read, what commands it ran, what outputs it saw, how it handled errors. Map each action to a decision.' },
            { n: '4', title: 'Run and test the result', body: 'Run the code Cascade produced. Does it work? If not, use the error as a follow-up prompt. If yes, identify 2-3 things you would improve — and ask Cascade to make those improvements.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Windsurf free tier, generous Cascade uses included</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Windsurf's action log is a free AI programming tutorial. After every Cascade session, spend 5 minutes reading exactly what it did. When it ran a terminal command you don't recognize, look it up. When it structured a file in an unexpected way, understand why. The difference between using Cascade as a black box and using it as a learning tool is this 5 minutes of post-task review.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/coding/cursor')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Cursor
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/coding/codeium')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Codeium <ChevronRight size={14} />
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
