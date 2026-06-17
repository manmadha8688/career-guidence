import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#4C4A99'

export default function SnykPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(76,74,153,0.18)' : 'rgba(76,74,153,0.14)'
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🛡️</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Snyk — Find and Fix Vulnerabilities in Your Code</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Security scanning for code, dependencies, containers, and IaC</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['snyk.io', color], ['Developer Security', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Snyk is a developer-first security platform that finds and automatically fixes vulnerabilities before they reach production. Unlike traditional security tools that bolt on at the end of the development cycle, Snyk integrates directly into your IDE, CI/CD pipeline, and source control — so security feedback arrives while you are writing code, not weeks later in a penetration test report. Recognized as a Leader in the 2025 Gartner Magic Quadrant for Application Security Testing, Snyk covers five attack surfaces: your own code (SAST), open-source dependencies (SCA), container images, infrastructure as code, and cloud runtime posture. For students and developers, the free tier provides genuine protection with no credit card required.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Snyk Tutorial in One Shot — Secure Code, Libraries, IaC & Images', url: 'https://www.youtube.com/watch?v=Cz4e_rNULPA', dur: '~30 min', note: 'Best comprehensive intro — CLI, IDE plugin, and all scanning features' },
            { label: 'SAST With Snyk 2024 — Getting Started', url: 'https://www.youtube.com/watch?v=W3CWl7C-pro', dur: '~20 min', note: 'Static analysis scanning setup and first vulnerability scan' },
            { label: 'Snyk + GitLab CI/CD — DevSecOps Full Hands-On Demo 2025', url: 'https://www.youtube.com/watch?v=M0VxNY2JzdY', dur: '~25 min', note: 'Add Snyk security scanning to your CI/CD pipeline step by step' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What Snyk is */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What Snyk actually scans" color={color} />
          <InfoBox color={color} dark={dark}>Snyk is not one tool — it is five scanners under a single developer-friendly interface. The power comes from combining them: a vulnerability in a dependency used by your container deployed to a misconfigured cloud bucket is one connected risk, and Snyk surfaces that chain rather than five separate alerts.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>Snyk Code uses DeepCode AI — a security-focused engine trained on millions of open-source repositories — to find logic bugs, injection flaws, and security anti-patterns in your source code. Snyk Open Source scans your package managers (npm, pip, Maven, Go modules, and more) for known CVEs in your dependencies and transitive dependencies. Snyk Container checks Docker images for OS-level vulnerabilities and insecure base image choices. Snyk IaC scans Terraform, Kubernetes YAML, Helm, and CloudFormation for misconfigurations before they are deployed. Snyk Cloud monitors your live AWS, Azure, and GCP environments for drift and runtime risk.</p>
        </Block>

        {/* Free tier */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Free tier — what you actually get" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Free plan', badge: 'No credit card', body: '200 open-source dependency tests per month, 100 container image tests, 300 IaC tests, full IDE plugin access (VS Code, JetBrains, Eclipse), and SCM integration with GitHub/GitLab/Bitbucket. For individual developers and students, this is enough to protect every project you are actively working on.' },
            { label: 'Team plan — $25/user/month', badge: 'For small teams', body: 'Unlimited scans, PR checks on every pull request, license compliance analysis, Jira integration, team dashboards, and priority support. Relevant when you are working on a team project or internship with shared repos.' },
            { label: 'Enterprise', badge: 'For organizations', body: 'SSO, custom policies, SIEM integration, SLA-backed support, and role-based access control. This is what companies at scale run — good to know for interviews and enterprise jobs.' },
          ]} />
        </Block>

        {/* Core capabilities */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Core capabilities" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Snyk Code (SAST)', desc: 'Real-time static analysis in your IDE. Flags SQL injection, XSS, hardcoded secrets, insecure deserialization, and more as you type. Supports JS, TS, Python, Java, Go, C#, C++, PHP, Ruby, Swift, Kotlin.' },
            { name: 'Snyk Open Source (SCA)', desc: 'Scans package.json, requirements.txt, pom.xml, go.mod, and more. Finds CVEs in direct AND transitive dependencies. Shows severity, CVSS score, and fix recommendation (usually a version bump).' },
            { name: 'Snyk Container', desc: 'Pulls and scans Docker images for OS-level CVEs. Recommends a less-vulnerable base image (e.g., switch from node:18 to node:18-alpine to remove 200 vulnerabilities). Integrates with Docker Hub and ECR.' },
            { name: 'Snyk IaC', desc: 'Scans Terraform, Kubernetes YAML, Helm charts, and ARM templates for security misconfigurations — open S3 buckets, overly permissive IAM, missing network policies, unencrypted storage.' },
            { name: 'Fix suggestions', desc: 'Snyk does not just tell you what is broken — it generates pull requests with the fix applied. One-click PR to bump a vulnerable dependency. This is the key differentiator from generic SAST tools.' },
            { name: 'Snyk CLI', desc: 'Run `snyk test` in any project to get a full vulnerability report. `snyk monitor` uploads your dependency tree for continuous monitoring. Integrates into any CI/CD system with a one-line addition.' },
          ]} />
        </Block>

        {/* VS Code setup */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Set up Snyk in VS Code — 5 minutes" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install the extension', body: 'Open VS Code Extensions (Ctrl+Shift+X), search "Snyk Security", install the official extension by Snyk Ltd. It has over 1 million installs.' },
            { n: '2', title: 'Authenticate', body: 'Click the Snyk icon in the sidebar. Click "Connect VS Code with Snyk". A browser tab opens — log in with GitHub (recommended), Google, or email. Free account, no card needed.' },
            { n: '3', title: 'Run your first scan', body: 'Open any project folder in VS Code. The Snyk panel runs automatically on open. You will see three trees: Snyk Code issues, Open Source vulnerabilities, and IaC misconfigurations.' },
            { n: '4', title: 'Read the findings', body: 'Each finding shows: severity (Critical/High/Medium/Low), the exact line, a description of the vulnerability, why it is dangerous, and example fix. Click any finding to jump to the line.' },
            { n: '5', title: 'Apply fixes', body: 'For dependency vulnerabilities, click "Fix this vulnerability" to open a PR suggestion. For code issues, apply the suggested fix manually or use Snyk\'s AI fix suggestion where available.' },
          ]} />
        </Block>

        {/* Snyk vs SonarQube vs GitHub Security */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Snyk vs SonarQube vs GitHub Security — comparison" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Snyk', badge: 'Best for developers', body: 'Developer-first UX with IDE plugin, auto-fix PRs, and dependency + container scanning in one tool. Free tier is generous. Best choice if you want security integrated into your daily coding workflow right now. Weakness: SAST depth is below SonarQube for code quality issues.' },
            { label: 'SonarQube', badge: 'Best for code quality', body: 'Deeper static analysis across 40+ languages. Community edition is free and self-hosted. Better for code smells, complexity, and maintainability alongside security. Requires Docker setup. No native dependency scanning — security is one component among many quality checks.' },
            { label: 'GitHub Advanced Security', badge: 'Best for GitHub repos', body: 'Native integration with GitHub — zero setup for public repos. CodeQL-powered code scanning, secret detection with push protection, and Dependabot for dependency alerts. Free for all public repositories. Paid for private repos ($19/user/month). Best if you are already on GitHub and want zero-configuration security.' },
          ]} />
        </Block>

        {/* Student use cases */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Student use cases" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Scan your college projects', body: 'Run `snyk test` on any npm or Python project from class. You will almost certainly find vulnerabilities in the packages your professor told you to install. Fix them before submitting — it shows security awareness that most students miss.' },
            { n: '2', title: 'Add to your portfolio GitHub repos', body: 'Add a Snyk badge (![Known Vulnerabilities](https://snyk.io/test/github/youruser/yourrepo/badge.svg)) to your README. Recruiters notice. It signals you think about security, not just functionality.' },
            { n: '3', title: 'Practice reading CVE reports', body: 'When Snyk flags a vulnerability, read the full CVE details it links to. Understanding what a SQL injection or prototype pollution actually means — not just that it is "high severity" — is the kind of depth that separates junior from senior developers.' },
            { n: '4', title: 'Build a DevSecOps pipeline for interview demos', body: 'Add `snyk test --severity-threshold=high` to a GitHub Actions workflow. If a high-severity vulnerability is introduced, the build fails. Show this in interviews as proof you understand the full CI/CD security lifecycle.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Scan any JavaScript, Python, Java, or Go project for vulnerabilities in seconds with the free tier',
            'Get real-time security feedback in VS Code while writing code — no separate scan step needed',
            'Find CVEs in your npm or pip dependencies including transitive packages you never directly imported',
            'Scan Docker images for OS-level vulnerabilities and get base image upgrade recommendations',
            'Add snyk test to GitHub Actions to auto-block PRs that introduce high-severity vulnerabilities',
            'Generate fix PRs automatically — Snyk writes the dependency version bump commit for you',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Secure a Real Project End-to-End</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Take any existing project you have built — even a simple Node.js or Python app from a course. Run a full Snyk security audit, document every finding, fix at least two vulnerabilities, and add Snyk to the CI/CD pipeline. Then write a brief security report summarizing what you found and fixed. This is a concrete portfolio artifact that demonstrates security awareness rare in junior developers.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install and authenticate Snyk CLI', body: 'npm install -g snyk && snyk auth. This opens a browser login. Free signup with GitHub.' },
            { n: '2', title: 'Run a full project scan', body: 'cd your-project && snyk test. Note every vulnerability — severity, package name, CVE number, and recommended fix version.' },
            { n: '3', title: 'Fix at least 2 vulnerabilities', body: 'Run snyk fix (auto-upgrades safe dependencies) or manually bump versions. Re-run snyk test to confirm the CVEs are gone.' },
            { n: '4', title: 'Add to GitHub Actions', body: 'Add a .github/workflows/snyk.yml that runs snyk test on every PR. Set --severity-threshold=high so only critical findings block the build.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Snyk free tier covers all of this</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Run snyk test on any popular open-source project you admire — clone it and scan it. You will almost certainly find known vulnerabilities even in well-maintained projects. Reading through those findings and understanding why they exist is one of the fastest ways to develop real security intuition. The top entry-level AppSec engineers learn by studying real vulnerabilities in real code, not toy examples.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/security/sonarqube')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            SonarQube <ChevronRight size={14} />
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
