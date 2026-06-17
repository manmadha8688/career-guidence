import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#F59E0B'

export default function CodeiumPage() {
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Coding</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>💎</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Codeium — Free AI Coding for Any Editor</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>The completely free autocomplete that works everywhere</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ COMPLETELY FREE', '#4ADE80'], ['No usage limits', color], ['70+ editors supported', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Codeium is the most accessible AI coding assistant available — completely free, with no usage limits, no student verification required, and support for over 70 code editors including VS Code, JetBrains IDEs (IntelliJ, PyCharm, WebStorm), Vim, Neovim, and even web-based editors. Where GitHub Copilot requires a student pack or $10/month, Codeium gives you fast, capable autocomplete for free indefinitely. It is built by the same team that makes Windsurf, so the underlying model is the same. For students who use JetBrains IDEs (common in Java, Python, and Android development), Codeium is often the only strong free AI coding option. It also runs fast — responses feel nearly instantaneous compared to some competitors.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'How to PROPERLY Use Codeium in VS Code — Full Guide', url: 'https://www.youtube.com/watch?v=XfH-3wg8i-8', dur: '~12 min', note: 'Install, configure, multiline suggestions, Codeium Chat — full guide' },
            { label: 'How to Install and Use Codeium AI for Web Development', url: 'https://www.youtube.com/watch?v=fT9rNvvEFSQ', dur: '~12 min', note: 'Complete setup guide — web dev focused, VS Code + JetBrains' },
            { label: 'Get Started with GitHub Copilot in VS Code (2025) — Official VS Code', url: 'https://www.youtube.com/watch?v=vdBxfFVXnc0', dur: '21 min', note: 'Compare Codeium free against Copilot — understand the difference' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Why free matters */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why free matters" color={color} />
          <InfoBox color={color} dark={dark}>Codeium's free tier has no usage limits, no rate limiting during normal use, and requires only an email address to sign up — no credit card, no student verification, no waiting period. This makes it the default recommendation for anyone who cannot access Copilot's student pack or does not want to pay for Cursor Pro.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The "completely free" model is sustainable because Codeium monetizes through its enterprise product (Codeium for Teams). Individual developers get the full product for free as a way to build an audience and demonstrate quality. This is the same model as VSCode (free for individuals, paid enterprise support) and has historically been more sustainable than VC-subsidized free tiers that eventually switch to paid.</p>
        </Block>

        {/* Editor support */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Editor support" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'VS Code / VS Code forks', desc: 'VS Code, Cursor, Windsurf, Theia, Gitpod. Install the Codeium extension from the marketplace. Full autocomplete and chat features.' },
            { name: 'JetBrains IDEs', desc: 'IntelliJ IDEA, PyCharm, WebStorm, Android Studio, GoLand, Rider, DataGrip. Plugin available from JetBrains Marketplace. Works in all paid and free JetBrains editions.' },
            { name: 'Vim / Neovim', desc: 'Plugin available. Full autocomplete for terminal-based development workflows. For students using Linux or preferring keyboard-driven editors.' },
            { name: 'Jupyter Notebooks', desc: 'Works in JupyterLab and classic Jupyter notebooks. Autocomplete for Python data science and ML workflows — fills in pandas, numpy, sklearn patterns.' },
            { name: 'Web IDEs', desc: 'GitHub Codespaces, GitLab Web IDE, Replit, CodeSandbox. Browser-based development with AI assistance — no local install required.' },
            { name: 'Emacs, Sublime, others', desc: '30+ additional editors with varying feature levels. Check codeium.com/editors for the full list and installation instructions.' },
          ]} />
        </Block>

        {/* Features comparison */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Features comparison: Codeium vs competitors" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'vs GitHub Copilot', badge: 'Codeium: free, Copilot: free for students', body: "Copilot requires student verification or $10/month. Codeium is free for everyone. Copilot uses GPT-4o (stronger model). Codeium's model is fast and capable for everyday autocomplete. For pure autocomplete quality, Copilot slightly edges Codeium on complex suggestions — but Codeium is good enough for most daily use and works in JetBrains IDEs." },
            { label: 'vs Cursor', badge: 'Codeium: free, Cursor: limited free', body: 'Cursor has better codebase understanding (full indexing) and multi-file Composer. Codeium extension + VS Code is free without limits. Windsurf (by Codeium) gives you an editor with similar features to Cursor. Use Codeium extension if you want to stay in your current editor; use Windsurf if you want a full Cursor alternative.' },
            { label: 'vs Tabnine', badge: 'Similar, Codeium typically better', body: 'Tabnine is another free AI coding tool. Codeium generally has faster completions, better context awareness, and broader editor support. Both are free. Codeium is the current recommendation for most use cases.' },
            { label: 'Speed', badge: 'Codeium advantage', body: 'Codeium is consistently faster than Copilot at returning autocomplete suggestions — often sub-100ms. This matters because slow autocomplete breaks flow. Copilot can lag noticeably on slower connections. Codeium\'s speed is a real quality-of-life advantage.' },
          ]} />
        </Block>

        {/* Getting started */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Getting started" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Sign up at codeium.com', body: 'Free account with email only — no credit card. The signup takes 30 seconds.' },
            { n: '2', title: 'Install for your editor', body: "VS Code: search 'Codeium' in the Extensions panel. JetBrains: Settings → Plugins → Marketplace → search 'Codeium'. Follow the authentication prompt to connect your account." },
            { n: '3', title: 'Test autocomplete immediately', body: 'Open any code file and start typing a function. Gray ghost text should appear within 1-2 seconds. Tab accepts. Esc dismisses. Alt+] cycles through alternative suggestions.' },
            { n: '4', title: 'Open Codeium Chat', body: 'Codeium Chat is available in VS Code and JetBrains. Open it from the sidebar. Ask questions about your code, request refactoring, generate tests. It has file context awareness similar to Copilot Chat.' },
          ]} />
        </Block>

        {/* Using Codeium effectively in JetBrains */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Using Codeium effectively in JetBrains" color={color} />
          <InfoBox color={color} dark={dark}>JetBrains IDEs (PyCharm, IntelliJ, WebStorm) are the standard in many CS programs and at most Indian tech companies. If your college uses Java or Android development, or if you prefer PyCharm for Python, Codeium is often your only strong free option — Copilot's JetBrains plugin is paid-only, and Cursor/Windsurf are VS Code-based.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install from JetBrains Marketplace', body: "Open Settings (Ctrl+Alt+S) → Plugins → Marketplace tab → search 'Codeium' → Install. Restart the IDE. Login with your Codeium account." },
            { n: '2', title: 'Enable in the IDE', body: 'After restart, look for the Codeium icon in the bottom status bar. Green = active. If it shows as inactive, click it and sign in again.' },
            { n: '3', title: 'Adjust suggestion behavior', body: 'Settings → Codeium → enable/disable auto-suggestions, adjust trigger delay. Default settings work well. If suggestions feel distracting, increase the trigger delay.' },
            { n: '4', title: 'Use inline refactor', body: 'Select code → right-click → Codeium: Refactor (or the Codeium icon in the toolbar). Describe the change. Works for renaming, simplifying, extracting methods.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Get AI autocomplete in any IDE including JetBrains (PyCharm, IntelliJ, WebStorm) completely free',
            'Generate boilerplate, fill in standard patterns, and autocomplete complex API calls without research',
            'Use Codeium Chat to ask questions about your code, generate tests, and understand error messages',
            'Switch between 70+ editors without losing AI assistance — Codeium works wherever you code',
            'Start immediately without a student email, credit card, or waiting period',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Install and Use for One Week</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Install Codeium in whichever IDE you use most. Then use it actively for one week on your regular coursework or projects. At the end of the week, note: (1) which types of suggestions were most useful, (2) which were distracting or wrong, (3) how your coding speed felt compared to before. This calibration is more valuable than any tutorial because it is grounded in your actual workflow.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install in your primary IDE', body: 'Whether VS Code, IntelliJ, PyCharm, or another — install Codeium today. The process takes under 5 minutes.' },
            { n: '2', title: 'Use it on real work', body: 'For one week, use it on whatever you are actually working on — assignments, personal projects, coursework. Not a demo project. Your real work.' },
            { n: '3', title: 'Track three types of suggestions', body: 'Useful (autocomplete exactly what you wanted), Neutral (had to modify), Wrong (rejected entirely). At the end of the week, which type was most common for your coding style?' },
            { n: '4', title: 'Adjust your workflow', body: "Based on what you learned: write clearer function names? More detailed comments? Or just trust the tab key more? Adjust your coding style to work with the AI's strengths." },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Codeium is completely free, no credit card required</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Codeium works best when you write the function signature and a one-line comment before the body. The function name tells it the purpose, the comment confirms it. Then pause — let Codeium suggest the first few lines. If they are right, Tab. If not, write two lines yourself and pause again. This rhythm of write → pause → accept/reject is more natural than trying to use AI for every single keystroke.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/coding/windsurf')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Windsurf
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/apis/groq')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Groq API <ChevronRight size={14} />
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
