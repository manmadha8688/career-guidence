import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#CB1F36'

export default function SonarQubePage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(203,31,54,0.18)' : 'rgba(203,31,54,0.14)'
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Security & Code Review</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🔍</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>SonarQube — Code Quality and Security Analysis</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Static analysis for 25+ languages — find bugs, vulnerabilities, code smells</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE Community', '#4ADE80'], ['sonarqube.com', color], ['25+ Languages', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>SonarQube is the industry standard for continuous code quality and security inspection. Used by over 400,000 organizations worldwide, it analyzes code for bugs, vulnerabilities, and code smells — problems that make code hard to maintain or extend — across 40+ programming languages. Unlike Snyk which focuses on dependency vulnerabilities, SonarQube does deep static analysis of your actual source code: does this logic have a null pointer dereference? Is this SQL query injectable? Is this function so complex that no one can maintain it? SonarQube Community Edition is completely free and self-hosted via Docker, making it accessible for any student or developer. SonarQube adopted calendar versioning in 2025, with major releases shipping quarterly.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'SonarQube Tutorial: Everything You Need to Know for Beginners', url: 'https://www.youtube.com/watch?v=GRVA4AiO7OM', dur: '~25 min', note: 'Best beginner guide — setup, first scan, understanding results' },
            { label: '2025 SonarQube Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=7-P81EKq-r8', dur: '~30 min', note: 'Updated 2025 guide — Docker setup, project analysis, quality gates' },
            { label: 'How to Setup SonarQube From Scratch and Code Analysis 2024', url: 'https://www.youtube.com/watch?v=6vdRvz_LnbQ', dur: '~25 min', note: 'Complete setup walkthrough with CI/CD integration and report reading' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What SonarQube is */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What SonarQube actually analyzes" color={color} />
          <InfoBox color={color} dark={dark}>SonarQube introduces the concept of "Clean Code" — code that is not just functional but readable, maintainable, and secure. It tracks four issue types: bugs (runtime failures), vulnerabilities (security weaknesses), code smells (maintainability problems), and security hotspots (code needing human review). The combination of these gives a holistic quality picture, not just a security scan.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>SonarQube's static analysis goes beyond pattern matching. It performs data-flow analysis, tracking how data moves through your code to find SQL injection, XSS, and path traversal vulnerabilities that simple pattern matchers miss. The security model maps to OWASP Top 10, CWE Top 25, and SANS Top 25 — the frameworks you will encounter in every professional security discussion. The Community Edition covers the core Java, JavaScript, TypeScript, Python, PHP, C#, C, C++, Go, and Ruby analysis. The commercial editions add branch analysis and AI CodeFix suggestions. SonarQube Server adopted calendar versioning in 2025 — the current LTA (Long-Term Active) release is 2026.1.</p>
        </Block>

        {/* Community vs paid */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Community vs Developer vs Enterprise" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Community Edition — Free', badge: 'Self-hosted Docker', body: 'Full static analysis for core languages, OWASP/CWE security mapping, quality gates, dashboards, and CI/CD integration. No branch analysis — scans main branch only. Sufficient for learning, personal projects, and portfolio work. Run with: docker run -d --name sonarqube -p 9000:9000 sonarqube:community' },
            { label: 'Developer Edition — $150/year+', badge: 'Branch & PR analysis', body: 'Adds branch analysis (scan every feature branch and PR), taint analysis for deeper security tracking, and additional language support. This is what professional dev teams run. If your company provides it, you will use this.' },
            { label: 'Enterprise / Data Center', badge: 'Large organizations', body: 'Security reports, portfolio-level views, project aggregations, and high-availability deployment. For companies running hundreds of repos. Irrelevant for individual use — but useful to know the tier exists for interviews.' },
          ]} />
        </Block>

        {/* Core capabilities */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Core capabilities" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Bug detection', desc: 'Finds logical errors, null pointer dereferences, unreachable code, incorrect API usage, and resource leaks. These are runtime failures waiting to happen — catching them in static analysis saves hours of debugging.' },
            { name: 'Vulnerability detection', desc: 'OWASP Top 10 coverage: injection, broken authentication, sensitive data exposure, XXE, broken access control, security misconfiguration, XSS, insecure deserialization, and more.' },
            { name: 'Code smells', desc: 'Complexity metrics, duplicated code, dead code, methods that are too long, classes that do too much. These are not immediately harmful but make code unmaintainable over time.' },
            { name: 'Security hotspots', desc: 'Code that is not necessarily vulnerable but needs a human security review — cryptographic functions, authentication code, authorization checks. Requires manual review to clear.' },
            { name: 'Quality gates', desc: 'Pass/fail thresholds you define: no new blocker bugs, coverage above 80%, no new critical vulnerabilities. CI/CD breaks the build if quality gate fails. This is the standard enterprise workflow.' },
            { name: 'Technical debt tracking', desc: 'SonarQube estimates how long it would take to fix every issue it finds. The "technical debt ratio" shows what percentage of development time is being spent managing past shortcuts.' },
          ]} />
        </Block>

        {/* Setup with Docker */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Set up SonarQube locally with Docker" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Start SonarQube with Docker', body: 'docker run -d --name sonarqube -p 9000:9000 sonarqube:community\n\nWait ~60 seconds, then open http://localhost:9000. Default login: admin/admin. You will be prompted to change the password.' },
            { n: '2', title: 'Create a project', body: 'Click "Create Project" → "Manually". Give it a name and key. Under "How do you want to analyze your repository?" select "Locally". Generate a project token — save it.' },
            { n: '3', title: 'Install SonarScanner', body: 'Download SonarScanner CLI from sonarsource.com/products/sonarscanner. Add it to your PATH. Or use the Maven/Gradle plugin if it is a Java project.' },
            { n: '4', title: 'Run the analysis', body: 'In your project root:\nsonar-scanner -Dsonar.projectKey=my-project -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=YOUR_TOKEN' },
            { n: '5', title: 'Read the dashboard', body: 'Return to localhost:9000. You will see: reliability (bugs), security (vulnerabilities), maintainability (code smells), and coverage. Click any metric to drill into specific file and line findings.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Run SonarQube Community Edition locally via Docker — completely free with no account needed',
            'Scan projects in Java, JavaScript, TypeScript, Python, PHP, C#, Go, Ruby, and more',
            'Find security vulnerabilities mapped to OWASP Top 10 and CWE Top 25 in your own code',
            'Set quality gates in CI/CD that fail the build when new bugs or vulnerabilities are introduced',
            'Track technical debt over time and see if your codebase is getting better or worse each sprint',
            'Use SonarLint IDE plugin (free, VS Code + JetBrains) for real-time in-editor feedback without a server',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Audit Your Codebase and Track Quality Over Time</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Set up SonarQube locally, run it against a real project (even a course assignment), and generate a quality report. Fix at least 3 issues it finds. Then set up SonarLint in VS Code so you get real-time feedback on every file you open. Document your before/after metrics. This makes an excellent portfolio case study — most junior developers have never run static analysis on their own code.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Spin up SonarQube via Docker', body: 'docker run -d --name sonarqube -p 9000:9000 sonarqube:community && open http://localhost:9000' },
            { n: '2', title: 'Scan your chosen project', body: 'Use SonarScanner CLI or the Maven/Gradle/npm plugin. Take a screenshot of the initial dashboard — this is your before state.' },
            { n: '3', title: 'Fix the top 3 highest-severity findings', body: 'Click into each finding, read the explanation, understand WHY it is a problem, then fix it. Re-run the analysis to confirm the issues are resolved.' },
            { n: '4', title: 'Install SonarLint in VS Code', body: 'Extensions → search "SonarLint". Connect it to your local SonarQube server for synchronized rules. Now every file you open shows quality feedback inline.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — SonarQube Community Edition is fully free and open source</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Install SonarLint (the IDE plugin, free forever) even if you never set up the server. It gives you real-time SonarQube analysis in VS Code or IntelliJ with no server required — just the plugin. The connected mode (linking to a SonarQube or SonarCloud server) synchronizes rules, but standalone mode is already extremely valuable for catching bugs and code smells while you write. Most working developers have it installed and forget it is there — it just highlights issues as you code.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/security/snyk')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Snyk
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/security/github-adv-sec')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            GitHub Adv Sec <ChevronRight size={14} />
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
