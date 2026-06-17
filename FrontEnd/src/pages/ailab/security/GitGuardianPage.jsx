import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#F59E0B'

export default function GitGuardianPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(245,158,11,0.18)' : 'rgba(245,158,11,0.14)'
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🔑</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>GitGuardian — Detect Secrets in Your Code Before They Leak</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Real-time detection of API keys, passwords, and credentials in your repos</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE Individual', '#4ADE80'], ['gitguardian.com', color], ['Secret Detection', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>GitGuardian is the leading specialized secret detection platform — built exclusively to find and prevent the exposure of API keys, passwords, tokens, private keys, and credentials in source code. While Snyk and GHAS include secret scanning as one feature among many, GitGuardian's entire product is built around this single problem. It covers over 550 secret types with pattern matching and validation checks, scans every commit including historical ones, and extends beyond git to Slack, Jira, and Confluence where developers paste secrets carelessly. The free plan covers individual developers and teams up to 25 people with full enterprise-grade scanning — the same engine, no feature restrictions.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Quick Start Guide for ggshield — the GitGuardian CLI', url: 'https://www.youtube.com/watch?v=4vaSM23-DLs', dur: '~12 min', note: 'Official GitGuardian tutorial — install ggshield and run your first scan' },
            { label: 'A Deep Dive Into ggshield — GitGuardian CLI', url: 'https://www.youtube.com/watch?v=7c45JtbZgXs', dur: '~20 min', note: 'Advanced ggshield features — pre-commit hooks, CI/CD, config' },
            { label: 'GitGuardian Remediation Guide — From Alert to Resolution', url: 'https://www.youtube.com/watch?v=dOGG9SpFCJg', dur: '~15 min', note: 'What to do when GitGuardian finds a secret — rotate, revoke, remediate' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Why secrets leaking matters */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why leaked secrets are a critical problem" color={color} />
          <InfoBox color={color} dark={dark}>In 2024, GitGuardian's State of Secrets Sprawl report found over 12.8 million secrets leaked on public GitHub alone — a 28% increase year over year. The average time for an attacker to start exploiting a leaked AWS key is 5 minutes. The most commonly leaked secrets are Google API keys, AWS credentials, GitHub tokens, and database connection strings with embedded passwords.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>Secrets end up in code in predictable ways: a developer hardcodes an API key to "test quickly" and forgets to remove it before committing. A .env file gets accidentally committed because .gitignore was not set up. A credential is pasted into a Jupyter notebook that gets pushed. A configuration file with a database password gets added in a commit titled "fix config." Git history is permanent — even if you delete the file in a later commit, the credential exists in every clone of the repo made before that deletion. GitGuardian scans the full git history, not just the latest code, which is why it catches secrets that were "already removed."</p>
        </Block>

        {/* Free vs paid */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Free vs paid — honest breakdown" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Free — up to 25 developers', badge: 'Full scanning power', body: 'GitGuardian does not restrict scanning capabilities for free users. You get the same 550+ secret type detection, historical commit scanning, ggshield CLI, pre-commit hooks, CI/CD integration, and GitHub/GitLab webhooks. The free tier is not a trial — it is the full product for teams under 25 people.' },
            { label: 'Team/Business plan', badge: 'Larger organizations', body: 'Adds centralized dashboards, incident management workflows, SLA tracking, assignment to developers, policy controls, priority support, and SAML SSO. Relevant when you are managing secrets detection across an organization, not just your own repos.' },
            { label: 'Non-Human Identity (NHI) Governance', badge: 'Enterprise add-on', body: 'Tracks machine credentials — service accounts, CI/CD tokens, cloud IAM keys — across the entire organization. Maps which systems use which secrets and alerts when credentials are rotated or expire. A newer capability for mature security programs.' },
          ]} />
        </Block>

        {/* Core capabilities */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Core capabilities" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: '550+ secret types', desc: 'Detects AWS keys, GCP credentials, Azure tokens, GitHub PATs, Stripe keys, OpenAI API keys, database connection strings, private keys (RSA, EC, PKCS#8), SSH keys, Slack tokens, Twilio, SendGrid, and 500+ more.' },
            { name: 'ggshield CLI', desc: 'Command-line tool that scans commits, files, and directories locally. Install as a pre-commit hook so every git commit is scanned before it reaches the remote. Catches secrets before they ever leave your machine.' },
            { name: 'Pre-commit hooks', desc: 'pip install ggshield && ggshield install -m global. Installs a hook that runs on every commit in every repo on your machine. If a secret pattern is detected, the commit is blocked with an explanation.' },
            { name: 'CI/CD integration', desc: 'ggshield secret scan ci works in GitHub Actions, GitLab CI, Jenkins, CircleCI, and more. Scans every push and PR. Fails the pipeline if new secrets are detected. Takes 30 seconds to add to any pipeline.' },
            { name: 'Historical scan', desc: 'ggshield secret scan repo scans the full git history of a repository. Finds secrets committed weeks or years ago that are still in the history even if the file was "deleted." Essential for any repo that has existed for more than a month.' },
            { name: 'Honeytokens', desc: 'GitGuardian can generate fake credentials (honeytokens) you deliberately place in bait files. If an attacker finds and uses them, you get an immediate alert with their IP address — an intrusion detection mechanism.' },
          ]} />
        </Block>

        {/* Setup guide */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Set up GitGuardian on your machine — 10 minutes" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Create a free account', body: 'Sign up at gitguardian.com with GitHub. Free for individual use. No credit card. Connect your GitHub account to enable repo monitoring.' },
            { n: '2', title: 'Install ggshield CLI', body: 'pip install ggshield\nggshield auth login\n\nThis opens a browser for authentication. Once linked, ggshield can scan any local directory.' },
            { n: '3', title: 'Install global pre-commit hook', body: 'ggshield install -m global\n\nNow every git commit on your machine runs a secret scan. If a secret is found, git commit is blocked with a clear message showing what was detected and on which line.' },
            { n: '4', title: 'Scan your existing repos', body: 'cd your-existing-project\nggshield secret scan repo .\n\nThis scans the full git history. Review every finding — some may be false positives (test tokens, example keys). Real secrets should be rotated immediately.' },
            { n: '5', title: 'Add to GitHub Actions', body: 'Add to .github/workflows/gitguardian.yml:\n\nname: GitGuardian\non: [push, pull_request]\njobs:\n  scanning:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n        with:\n          fetch-depth: 0\n      - uses: GitGuardian/ggshield-action@v1\n        env:\n          GITGUARDIAN_API_KEY: ${{ secrets.GITGUARDIAN_API_KEY }}' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Scan any git repository for secrets — including full commit history — with the free ggshield CLI',
            'Install a global pre-commit hook that blocks every git commit containing a credential pattern',
            'Monitor all your GitHub repos from the GitGuardian dashboard with real-time webhook scanning',
            'Add ggshield to GitHub Actions to auto-fail any PR that introduces a new secret',
            'Scan Jupyter notebooks, configuration files, and IaC templates for hardcoded credentials',
            'Generate honeytokens to detect attackers who gain read access to your repositories',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Audit Every Repo You Own for Historical Secrets</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Most developers who have been coding for more than 6 months have accidentally committed a secret at some point. Run a full historical scan across all your repos. You will likely find something. The goal is to find it, rotate it, and put prevention in place. This is a real security audit of your own digital footprint.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Sign up and connect GitHub', body: 'gitguardian.com → Connect your GitHub account. The dashboard immediately starts monitoring all your repos for new commits.' },
            { n: '2', title: 'Run ggshield on every local repo', body: 'For each project directory: ggshield secret scan repo . > findings.txt. Review the output. Look for anything that is a real credential vs. a test placeholder.' },
            { n: '3', title: 'Rotate any real secrets found', body: 'For every real credential found: immediately go to the provider (AWS console, OpenAI dashboard, GitHub settings) and revoke/rotate the key. Update your .env files. The old key is dead.' },
            { n: '4', title: 'Install global pre-commit hook', body: 'ggshield install -m global — this prevents it from ever happening again on your machine.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — GitGuardian free for individual developers, no credit card</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>The most dangerous misconception about secrets in git is "it was only in the repo for a few minutes before I deleted it." Automated bots scan GitHub continuously and are fast enough to detect and test new credentials within seconds of a push. If your secret touched a public repo even briefly, assume it is compromised. This is not hypothetical — there are documented cases of AWS bills reaching thousands of dollars within hours of an accidental push. Always rotate immediately, then clean up history with git filter-branch or BFG Repo Cleaner.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/security/github-adv-sec')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> GitHub Adv Sec
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/security/wiz')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Wiz <ChevronRight size={14} />
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
