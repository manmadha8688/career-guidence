import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#6366F1'

export default function TabninePage() {
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
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Tabnine — Privacy-First AI Code Completion</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>The AI coding assistant that can run entirely on your machine — zero data exposure</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE TIER', '#4ADE80'], ['tabnine.com', color], ['Privacy-First', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Tabnine is one of the oldest and most battle-tested AI code completion tools — launched in 2018, long before GitHub Copilot existed. What sets it apart today is not speed or model quality (Copilot and Codeium often match or exceed it there), but its unmatched commitment to privacy. Tabnine can run entirely on your local machine with no code ever leaving your system. It can also be deployed on a private VPC, on-premise server, or in a fully air-gapped environment — making it the go-to choice for enterprise teams in banking, healthcare, defense, and regulated industries. For students, the most relevant thing to know is this: Tabnine teaches you the privacy model that serious companies require, and understanding it will make you a better engineer when you join those companies.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Tabnine AI Tutorial For Beginners 2024', url: 'https://www.youtube.com/watch?v=Dx6pWyfaNkA', dur: '~10 min', note: 'Install Tabnine, enable completions, use chat — full beginner walkthrough' },
            { label: 'Tabnine AI | Intelligent Code Completion & AI-Powered Development', url: 'https://www.youtube.com/watch?v=A99F-f76Vjk', dur: '~8 min', note: 'Overview of Tabnine agents, switchable models, and enterprise privacy features' },
            { label: 'I Tested Tabnine\'s AI Pair Programmer — Is This Better Than GitHub Copilot?', url: 'https://www.youtube.com/watch?v=3KeLh9eqOPU', dur: '~12 min', note: 'Honest side-by-side comparison of Tabnine vs GitHub Copilot on real projects' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Overview */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why Tabnine exists — the privacy model" color={color} />
          <InfoBox color={color} dark={dark}>Tabnine's core differentiator is its privacy architecture. Unlike GitHub Copilot and Codeium — which send your code to their cloud servers for processing — Tabnine offers a genuinely local option. Its lightweight model runs on your CPU or GPU with under 50ms latency. For enterprise teams dealing with proprietary code, this is not optional: it is a legal and compliance requirement.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>There are two deployment modes: the cloud model (similar to Copilot, code is sent to Tabnine's servers but never stored or used for training), and the fully local model where everything runs on device. The local model is smaller and less capable than the cloud model, but it is genuinely useful for single-line completions and simple patterns. For students, the local model is an interesting experiment — it shows you how AI assistants work without needing an internet connection, and demonstrates that powerful developer tooling does not always require cloud infrastructure.</p>
        </Block>

        {/* Key Features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Key features" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Full-line & multi-line completion', desc: 'Tabnine suggests the next line, next block, or full function body as you type. The fast local model handles single-line; the cloud model handles multi-line function generation with context awareness.' },
            { name: 'Tabnine Chat', desc: 'AI chat sidebar available in VS Code, JetBrains, and Eclipse. Ask questions about your code, generate tests, request refactoring. Supports switchable underlying models including Claude and GPT-4o.' },
            { name: 'Local model option', desc: 'Run Tabnine entirely offline on your CPU or GPU. No code leaves your machine. Ideal for working on sensitive projects, poor internet conditions, or learning how local AI inference works.' },
            { name: 'RAG-powered context', desc: 'Tabnine uses Retrieval-Augmented Generation connected to your Git repositories. It learns your codebase patterns — your naming conventions, your preferred abstractions — and uses that to improve suggestions.' },
            { name: 'Enterprise privacy controls', desc: 'Zero data retention, VPC deployment, on-premise hosting, air-gapped environments. "Protected" models trained only on permissively licensed open-source code — no GPL, no copyleft risk.' },
            { name: 'AI agents (Pro/Enterprise)', desc: 'Code Review Agent and AI Test Agent automate repetitive review and testing tasks. Part of the newer Agentic Platform that goes beyond autocomplete into full SDLC automation.' },
          ]} />
        </Block>

        {/* Local model setup */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Setting up Tabnine with the local model" color={color} />
          <InfoBox color={color} dark={dark}>The local model requires no internet connection after the initial one-time download. It runs on your CPU using about 1-2GB RAM. The quality is lower than the cloud model for complex completions, but it demonstrates that AI coding assistance is possible entirely on-device — which is worth understanding as a future engineer.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install Tabnine in VS Code or JetBrains', body: "VS Code: open Extensions (Ctrl+Shift+X), search 'Tabnine AI Autocomplete', install. JetBrains: Settings → Plugins → Marketplace → search 'Tabnine' → install. Restart the IDE." },
            { n: '2', title: 'Sign up or sign in', body: 'Create a free account at tabnine.com. After installing, a sign-in prompt appears in the IDE. Use the same email. Free tier provides basic completions without a credit card.' },
            { n: '3', title: 'Enable the local model in VS Code', body: "Open Settings (Ctrl+,) → search 'Tabnine Local' → enable 'Tabnine: Use Local Model'. Tabnine will download the local model (~400MB) on first activation. The download happens once and then works offline." },
            { n: '4', title: 'Verify local mode is active', body: "Click the Tabnine icon in the VS Code status bar. If it shows 'Local' or 'Offline' mode, your completions are running on-device. Cloud mode shows a cloud icon. You can switch between them from this menu." },
            { n: '5', title: 'Test completions and chat', body: "Open a Python or JavaScript file and start typing a function. Accept suggestions with Tab. Open Tabnine Chat from the sidebar (the chat bubble icon). Ask: 'What does this function do?' or 'Write a test for this.'" },
          ]} />
        </Block>

        {/* IDE Support */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="IDE and editor support" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'VS Code', desc: 'Full support: inline completions, multi-line suggestions, Tabnine Chat, local model. The most feature-complete integration. Install from the VS Code Marketplace in one click.' },
            { name: 'JetBrains IDEs', desc: 'IntelliJ IDEA, PyCharm, WebStorm, GoLand, Rider, Android Studio, DataGrip. Full Tabnine Chat support added in 2024. Install from JetBrains Marketplace.' },
            { name: 'Eclipse', desc: 'Full-tier support including Tabnine Chat. One of few AI coding assistants with Eclipse integration — important for Java enterprise development and many university CS programs.' },
            { name: 'Visual Studio 2022', desc: 'Windows-focused development with Tabnine Chat support. Good for C#, .NET, and game development workflows in Unity.' },
            { name: 'Vim / Neovim', desc: 'Plugin available for terminal-based development. Note: Vim/Neovim support is limited to basic completions — Chat and agent features require VS Code, JetBrains, or Eclipse.' },
            { name: 'Sublime Text & others', desc: 'Legacy plugin support for Sublime Text. Check tabnine.com/install for the full list of supported editors and current feature availability per platform.' },
          ]} />
        </Block>

        {/* Comparison */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Tabnine vs Codeium vs GitHub Copilot" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Privacy & data handling', badge: 'Tabnine wins clearly', body: "Tabnine is the only tool that can run 100% locally with zero code leaving your machine. Copilot sends code to Microsoft/GitHub servers. Codeium offers optional zero data retention but still processes in the cloud by default. For students working on anything sensitive — internship code, personal projects you plan to patent, consulting work — Tabnine is the only safe choice." },
            { label: 'Completion quality', badge: 'Copilot slightly ahead', body: "GitHub Copilot uses GPT-4o and generally produces the most accurate multi-line completions. Codeium's cloud model is close and very fast. Tabnine's cloud model is competitive for single-line and pattern completions. Tabnine's local model is noticeably weaker for complex suggestions but perfectly fine for boilerplate and pattern matching." },
            { label: 'Price', badge: 'Codeium is freest', body: "Codeium is completely free with no usage limits. Tabnine's Basic plan was sunset in April 2025 — you now need a Pro plan ($12-15/month) for full features. GitHub Copilot is free for students via GitHub Education, or $10/month. For cost-conscious students, Codeium is the clearest winner." },
            { label: 'Enterprise / job readiness', badge: 'Tabnine advantage', body: 'In regulated industries (banking, healthcare, government, defense), Copilot and Codeium are often banned because of data exposure risk. Tabnine is the tool these companies actually use. Understanding Tabnine\'s privacy model — VPC, on-prem, air-gapped — puts you ahead in interviews at companies that take security seriously.' },
          ]} />
        </Block>

        {/* Pricing */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Pricing — what changed in 2025" color={color} />
          <InfoBox color={color} dark={dark}>Important: Tabnine sunset its long-standing Basic (free) plan on April 2, 2025. If you want the full Tabnine experience today, you need a paid plan. However, limited free trials remain available, and the local model download is still accessible after signup. For students who need a fully free tool, Codeium remains the better choice day-to-day.</InfoBox>
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Free trial', desc: 'Sign up at tabnine.com for a free trial period. No credit card required initially. Gives access to cloud completions and Tabnine Chat. Ideal for evaluating before committing.' },
            { name: 'Pro — $12-15/month', desc: 'Full cloud completions, Tabnine Chat with switchable models (including Claude and GPT-4o), local model access, and RAG-based personalization from your codebase.' },
            { name: 'Enterprise — $39/user/month', desc: 'VPC and on-premise deployment, custom model training on your codebase, air-gapped environment support, SSO/SAML, compliance features. Used by Fortune 500 companies.' },
            { name: 'Agentic Platform — $59/user/month', desc: 'Includes everything in Enterprise plus the Code Review Agent and AI Test Agent for automated SDLC workflows. Cutting edge of what AI coding tools can do in 2025.' },
          ]} />
        </Block>

        {/* Enterprise use cases */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why enterprises choose Tabnine" color={color} />
          <p style={{ ...P(sub), marginBottom: '0.875rem' }}>Most students only think about AI coding tools from a personal productivity angle — will this make me faster at assignments? But as a future engineer, you will work at organizations where your manager says "we cannot use Copilot because of data policy." Understanding why is important:</p>
          {[
            'Banks and financial institutions handle proprietary trading algorithms and customer data — sending code to external servers violates regulations like GDPR and internal security policies',
            'Healthcare tech companies building on patient data cannot risk code snippets containing PHI (Protected Health Information) being sent to cloud APIs',
            'Defense contractors and government agencies often work in air-gapped networks with no internet access at all — cloud tools simply cannot function',
            'Enterprise codebases contain trade secrets, unpublished patents, and proprietary algorithms that companies do not want model providers training on',
            'Tabnine\'s on-premise deployment means the AI model lives inside the company\'s own data center — no external API calls, fully auditable, fully compliant',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}`, marginBottom: '0.5rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 7 }} />
              <span style={{ fontSize: '0.85rem', color: sub, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </Block>

        {/* Language support */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Language support — 80+ languages" color={color} />
          <p style={{ ...P(sub), marginBottom: '0.875rem' }}>Tabnine supports over 80 programming languages. Its completions adapt per language — it knows Python idioms are different from Java conventions, that JavaScript callbacks differ from Rust closures.</p>
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Python', desc: 'Strongest support. Knows pandas, numpy, scikit-learn, Django, FastAPI patterns. Great for data science, ML, and backend development.' },
            { name: 'JavaScript / TypeScript', desc: 'Full support for React, Node.js, Express, Next.js. TypeScript type-aware completions help with interface and generic patterns.' },
            { name: 'Java', desc: 'Deep support — important since Java is dominant in enterprise, Android, and many CS programs. Works exceptionally well in IntelliJ IDEA.' },
            { name: 'C / C++ / Rust', desc: 'Strong completions for systems programming. Rust support is particularly good — fills in match patterns, trait implementations, lifetimes.' },
            { name: 'Go, Kotlin, Swift', desc: 'All well-supported. Kotlin completions in Android Studio / IntelliJ, Swift in VS Code with appropriate extensions.' },
            { name: 'HTML, CSS, SQL, Bash', desc: 'HTML/CSS completions, SQL query generation (SELECT/JOIN patterns), Bash scripting help. Useful across web dev, database, and devops workflows.' },
          ]} />
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Set Up Tabnine with the Local Model</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>The goal of this project is to experience what it feels like to use AI code completion with zero internet dependency — a situation you will encounter in real enterprise environments. Install Tabnine, enable the local model, and use it on a real coding task. Then intentionally disconnect from the internet and verify it still works. This gives you hands-on understanding of what "local AI inference" means beyond the theory.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install Tabnine and sign up', body: "Install the Tabnine extension in VS Code or your JetBrains IDE. Create a free account at tabnine.com. Authenticate from within the IDE. This takes about 5 minutes." },
            { n: '2', title: 'Enable and download the local model', body: "In VS Code: Settings → search 'Tabnine Local' → enable it. Tabnine downloads the local model once (~400MB). Let it complete. In JetBrains: Tabnine settings → Local Mode. Wait for the download." },
            { n: '3', title: 'Use it on a real project', body: "Open a project you are actively working on — an assignment, personal project, or practice code. Use it for at least 30 minutes. Accept completions you agree with (Tab), reject ones you don't (Esc or just keep typing)." },
            { n: '4', title: 'Disconnect from internet and test', body: "Disable your Wi-Fi or unplug ethernet. Open your project. Start typing code. Tabnine completions should still appear — they are running entirely from the local model. This is the moment that makes the privacy model real." },
            { n: '5', title: 'Compare cloud vs local quality', body: "Reconnect and re-enable cloud mode. Notice any difference in completion quality or speed? The cloud model will suggest longer, more complex completions. The local model is faster but more conservative. Both are valid for different contexts." },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color, letterSpacing: '0.08em' }}>KEY INSIGHT: When your future employer says "we can't use Copilot for this codebase" — you'll know exactly what tool to reach for</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(99,102,241,0.07)' : 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color, marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>In interviews at security-conscious companies (banks, fintech, healthtech, govtech), mentioning that you understand the difference between cloud-based AI tools and locally-deployable ones signals maturity most candidates lack. If asked "what AI tools do you use and how do you handle sensitive code?" — the right answer includes knowing Tabnine's local model exists and why it matters. It's a small detail that reveals you think about data security, not just feature velocity.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/coding/codeium')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Codeium
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/coding/aider')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Aider <ChevronRight size={14} />
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
