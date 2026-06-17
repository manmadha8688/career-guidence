import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#10B981'

export default function GitHubAdvSecPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(16,185,129,0.18)' : 'rgba(16,185,129,0.14)'
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🐙</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>GitHub Advanced Security — Security Built Into Your Workflow</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Code scanning, secret detection, dependency review — free for public repos</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['Free for Public', '#4ADE80'], ['GitHub', color], ['DevSecOps', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>GitHub Advanced Security (GHAS) is the security layer built directly into GitHub — no external tools, no separate pipelines, no configuration overhead. It consists of three core features: code scanning (powered by CodeQL, GitHub's own semantic code analysis engine), secret scanning (detecting API keys, tokens, and credentials committed to your repo), and dependency review (blocking PRs that introduce vulnerable packages). In March 2025, GitHub restructured GHAS into two standalone products — GitHub Secret Protection and GitHub Code Security — making it easier for organizations to adopt the specific capabilities they need. For students with public repositories, all of this is free with zero setup.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Introduction to GitHub Advanced Security (GHAS) 2025', url: 'https://www.youtube.com/watch?v=mtxlvWYjIxc', dur: '~20 min', note: 'Best 2025 overview — CodeQL, secret scanning, Dependabot all covered' },
            { label: 'GHAS Features — CodeQL, Dependabot, SAST, Secret Scanning', url: 'https://www.youtube.com/watch?v=LO5u45ZUUU4', dur: '~25 min', note: 'All GHAS features explained with demos — May 2025' },
            { label: 'Decrease Secret Leaks with GitHub Advanced Security', url: 'https://www.youtube.com/watch?v=2fJ0mi9rekY', dur: '~15 min', note: 'Secret scanning and push protection walkthrough — Dec 2024' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What GHAS is */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How GitHub Advanced Security works" color={color} />
          <InfoBox color={color} dark={dark}>GitHub Advanced Security embeds security analysis directly into the pull request workflow — the place where code changes happen. Instead of scanning code after it is merged, GHAS flags vulnerabilities, secrets, and risky dependencies in the PR diff before the merge button is clickable. This "shift left" approach is why it is the model for DevSecOps: security as a PR check, not a post-release audit.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>CodeQL — GitHub's code analysis engine — treats code as data. It builds a semantic model of your codebase and runs queries that can find complex vulnerability patterns a regex cannot: a user-controlled value that flows through three function calls and lands in a SQL query unsanitized. CodeQL supports C, C++, C#, Go, Java, Kotlin, JavaScript, TypeScript, Python, Ruby, Swift. Secret scanning monitors every push and every commit in history for 200+ secret types from providers like AWS, Google, Azure, Stripe, and GitHub itself. Push protection blocks the push before it even reaches GitHub if a secret is detected. Dependency review shows exactly what vulnerable packages a PR would add, with CVE details, inline in the PR diff.</p>
        </Block>

        {/* Free vs paid */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Free vs paid — the real breakdown" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Public repos — everything free', badge: 'Zero cost, zero setup', body: 'All GHAS features are permanently free for public repositories on GitHub. Code scanning, secret scanning, push protection, and Dependabot are all included. If you are building an open-source project or have your portfolio repos public, you already have enterprise-grade security at no cost. Enable it in Settings → Security → Code security and analysis.' },
            { label: 'GitHub Secret Protection — $19/active-committer/month', badge: 'Private repos', body: 'Enables secret scanning with AI-detected passwords, push protection, custom secret patterns, and validity checks on private repositories. Available to GitHub Team plan customers as of April 2025. Worth it for any private repo handling real API keys or credentials.' },
            { label: 'GitHub Code Security — $30/active-committer/month', badge: 'Private repos', body: 'Enables CodeQL code scanning, Copilot Autofix (AI-generated fix suggestions for found vulnerabilities), security campaigns for addressing security debt at scale, and PR dependency review for private repos. The Copilot Autofix feature significantly reduces the time to fix findings.' },
          ]} />
        </Block>

        {/* Core capabilities */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Core capabilities" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'CodeQL code scanning', desc: 'Semantic analysis engine that finds injection flaws, authentication bypasses, and logic vulnerabilities that pattern matching misses. Runs as a GitHub Actions workflow. Results appear as PR annotations and in the Security tab.' },
            { name: 'Secret scanning', desc: 'Monitors every push for 200+ known secret formats — AWS Access Keys, GitHub PATs, Stripe keys, OpenAI keys, Azure credentials, and more. Automatically notifies the service provider so tokens can be rotated before exploitation.' },
            { name: 'Push protection', desc: 'Blocks pushes before they reach GitHub if a high-confidence secret is detected. The developer must confirm no secret exists or acknowledge the risk. This is the difference between detecting a leak and preventing it.' },
            { name: 'Dependabot', desc: 'Free for all repos (public and private). Automatically opens PRs to upgrade vulnerable dependencies. Dependabot security updates are zero-touch: GitHub writes the version bump PR, you just review and merge.' },
            { name: 'Copilot Autofix', desc: 'When CodeQL finds a vulnerability, Copilot Autofix generates a suggested code fix — not just a description. The developer reviews a diff showing exactly how to remediate the finding. Dramatically reduces fix time for common vulnerability classes.' },
            { name: 'Security campaigns', desc: 'New in 2025: helps security teams create structured campaigns to address categories of security debt (e.g., all SQL injection findings across all repos) with tracking and developer notifications at scale.' },
          ]} />
        </Block>

        {/* Setup guide */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Enable GHAS on your public repo — 3 minutes" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Enable in repository settings', body: 'Go to your repo → Settings → Security → Code security and analysis. Enable: Dependabot alerts, Dependabot security updates, Code scanning (select "Set up CodeQL"), and Secret scanning.' },
            { n: '2', title: 'CodeQL Action runs automatically', body: 'GitHub creates a .github/workflows/codeql.yml file. On every push and PR to main, CodeQL scans your code. First run takes ~5-10 minutes. Results appear in the Security → Code scanning alerts tab.' },
            { n: '3', title: 'Review security alerts', body: 'Security tab → Code scanning alerts. Each alert shows: severity, the vulnerable code line, a description of the vulnerability, and suggested fix. Click "Show more" to see data-flow paths for injection vulnerabilities.' },
            { n: '4', title: 'Respond to secret scanning alerts', body: 'If any committed secrets are found, GitHub emails you and shows them in Security → Secret scanning alerts. Immediately revoke the secret at the provider (AWS console, OpenAI dashboard, etc.) then rotate to a new one.' },
            { n: '5', title: 'Review Dependabot PRs', body: 'Dependabot opens PRs automatically for vulnerable dependencies. Review the diff (usually a one-line version bump), check if tests pass, and merge. GitHub tracks your response rate in the security overview.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Enable full code scanning, secret detection, and dependency review on every public repo — completely free',
            'Get CodeQL vulnerability annotations directly on pull request diffs before merging',
            'Block accidental credential commits with push protection — GitHub stops the push before it lands',
            'Receive automated Dependabot PRs that fix vulnerable dependencies with one-click merges',
            'Use the Security tab as a single dashboard for all vulnerability types across your repositories',
            'Get AI-generated fix suggestions via Copilot Autofix for every CodeQL finding (paid private repos)',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Full DevSecOps Pipeline on a Public Repo</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Take any public GitHub repo (your own or a fork of an open-source project). Enable all GHAS features, run a full scan, resolve at least two findings, and set up branch protection rules that require code scanning to pass before merging. This is a real DevSecOps workflow used at professional engineering organizations.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Enable all security features', body: 'Settings → Security → Code security and analysis → enable everything: Dependabot, CodeQL, secret scanning, push protection.' },
            { n: '2', title: 'Wait for first CodeQL scan', body: 'GitHub runs the scan automatically. Check Actions tab for progress. Then review Security → Code scanning alerts for all findings.' },
            { n: '3', title: 'Resolve 2 findings', body: 'Pick two findings, understand them, fix the code, push the fix, verify the alert closes. Document what the vulnerability was and how you fixed it.' },
            { n: '4', title: 'Set branch protection rules', body: 'Settings → Branches → Add rule for main. Enable "Require status checks to pass" and add the CodeQL analysis check. Now no PR merges unless the security scan passes.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — all features free for public repositories</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Never commit real API keys or credentials to a repository — even a private one. GitHub scans private repos for secrets too (with GHAS paid), and even without it, git history is permanent. Once a secret is pushed, assume it is compromised and rotate it immediately. The professional habit is to always use environment variables (.env files with .gitignore) or a secrets manager. Set up push protection on every repo you touch — it is a one-click enable that stops the accident before it happens.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/security/sonarqube')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> SonarQube
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/security/gitguardian')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            GitGuardian <ChevronRight size={14} />
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
