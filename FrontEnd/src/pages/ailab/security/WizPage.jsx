import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#06B6D4'

export default function WizPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(6,182,212,0.18)' : 'rgba(6,182,212,0.14)'
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🌀</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Wiz — Cloud Security for the Modern Enterprise</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Agentless cloud security — find risks across AWS, Azure, GCP in minutes</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['Free Trial', '#4ADE80'], ['wiz.io', color], ['Enterprise', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Wiz is the cloud-native application protection platform (CNAPP) that reshaped enterprise cloud security. Founded in 2020, it reached $100 million ARR faster than any enterprise software company in history — and became the fastest company to reach $1 billion ARR. Wiz secures 40% of Fortune 100 companies including BMW, DocuSign, Salesforce, and Morgan Stanley. Its key innovation is agentless scanning: instead of installing agents on every cloud resource, Wiz connects directly to the cloud control plane via API and scans cloud environments in hours, not months. Google's $32 billion acquisition of Wiz closed in 2026, making it the largest cybersecurity acquisition in history — while Wiz continues as a multi-cloud platform. As a student, Wiz is the most important cloud security platform to understand for enterprise security roles.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Wiz Cloud Security Tutorial for Beginners 2025', url: 'https://www.youtube.com/watch?v=47piBKwsFiY', dur: '~20 min', note: 'Best beginner tutorial — Security Graph, risk prioritization, and dashboard tour' },
            { label: 'Wiz Cloud Security Platform — Technical Walkthrough Nov 2025', url: 'https://www.youtube.com/watch?v=e2UuCbcLTIo', dur: '~25 min', note: 'Key capabilities deep dive — CSPM, CWPP, and attack path analysis' },
            { label: 'Wiz Cloud Security Tutorial — Beginner Guide and Demo', url: 'https://www.youtube.com/watch?v=KBG843lP0EM', dur: '~20 min', note: 'Step-by-step demo — connecting cloud accounts and reading findings' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What Wiz is */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How Wiz works — the agentless difference" color={color} />
          <InfoBox color={color} dark={dark}>Traditional cloud security tools require installing agents on every virtual machine, container, and cloud resource. For large organizations with thousands of resources, agent deployment takes months and creates operational overhead. Wiz bypasses this entirely: it connects via API to your cloud control plane (AWS, Azure, GCP), reads configurations and metadata directly, and delivers a full security picture within 24 hours. No agents. No performance impact. No deployment projects.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>Wiz's core technology is the Security Graph — a graph database that models every relationship between cloud resources: which EC2 instance has which IAM role, which S3 bucket is publicly accessible and contains which sensitive data, which Kubernetes pod has elevated privileges and can reach the internet. The graph correlates across dimensions that point tools miss: a vulnerability in an application is not critical on its own, but when that application runs on an internet-facing instance with an IAM role that has admin access to your entire AWS account, it becomes a critical attack path. Wiz surfaces these toxic combinations and ranks them by real risk, not raw vulnerability count. In 2025, Wiz expanded with three modules: Wiz Code (CI/CD pipeline scanning), Wiz Cloud (the core agentless CNAPP), and Wiz Defend (eBPF-based runtime protection).</p>
        </Block>

        {/* Platform modules */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Wiz platform modules" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Wiz Code', badge: 'Shift-left security', body: 'Scans code, IaC, and container images in CI/CD pipelines. Integrates with GitHub, GitLab, Jenkins. Generates one-click fix PRs for findings. Connects pre-production findings to their cloud context — so you know which IaC misconfiguration will create a real risk when deployed. Catches problems before they reach the cloud.' },
            { label: 'Wiz Cloud', badge: 'Core CNAPP', body: 'The flagship product: agentless CSPM (cloud security posture management), CWPP (cloud workload protection), CIEM (cloud identity and entitlement management), and DSPM (data security posture management). Connects to AWS, Azure, GCP, OCI, Alibaba Cloud, Kubernetes, and VMware. Full risk profile within 24 hours of connecting.' },
            { label: 'Wiz Defend', badge: 'Runtime protection', body: 'Real-time threat detection and response using eBPF technology — a lightweight kernel-level instrumentation that requires no agent installation. Detects active attacks, lateral movement, cryptomining, and container escapes in running workloads. The runtime layer completes the full code-to-cloud-to-runtime security chain.' },
          ]} />
        </Block>

        {/* Core capabilities */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Core capabilities" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Security Graph', desc: 'Graph database modeling every cloud resource relationship. Finds attack paths — sequences of connected vulnerabilities that combine to create a critical risk. Prioritizes the 1% of findings that actually matter for remediation.' },
            { name: 'CSPM — Misconfigurations', desc: 'Detects cloud misconfigurations against CIS Benchmarks, AWS Well-Architected Framework, NIST, PCI-DSS, SOC2, and ISO27001. Open S3 buckets, overly permissive security groups, unencrypted storage, disabled logging.' },
            { name: 'CIEM — Identity risks', desc: 'Analyzes IAM permissions across AWS, Azure, and GCP. Finds overly permissive roles, unused credentials, privilege escalation paths, and shadow admin accounts. Identity misconfigurations are the #1 cause of cloud breaches.' },
            { name: 'DSPM — Data discovery', desc: 'Discovers sensitive data (PII, financial records, health data, secrets) across cloud storage — S3, Azure Blob, GCS, databases, data warehouses. Maps what sensitive data exists and whether it is protected or exposed.' },
            { name: 'Vulnerability prioritization', desc: 'Wiz ingests CVEs from cloud workloads and correlates them with cloud context. A critical CVE on an isolated internal instance with no attack path is low priority. The same CVE on an internet-facing instance with admin IAM is the #1 issue to fix.' },
            { name: '24-hour deployment', desc: 'Connect your cloud accounts (read-only API access) and get a full risk profile within 24 hours. No agents. No configuration. No performance impact on workloads. This speed is why enterprise security teams choose Wiz.' },
          ]} />
        </Block>

        {/* Wiz vs traditional tools */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Wiz vs traditional cloud security tools" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Wiz (agentless CNAPP)', badge: 'Modern approach', body: 'No agents, API-based connection, full cloud context in 24 hours. Correlates misconfigurations + vulnerabilities + identity + data into connected attack paths. Understands cloud-native resources natively (serverless, containers, Kubernetes). Single platform replacing 5+ point tools. Expensive enterprise pricing.' },
            { label: 'Traditional CSPM tools (Prisma, Dome9)', badge: 'Configuration-focused', body: 'Solid at detecting misconfigurations and compliance violations. Struggle with correlating findings across resource types into real risk. Often require agents for workload scanning. Can produce thousands of alerts without prioritization. Many are being displaced by CNAPPs like Wiz.' },
            { label: 'Cloud provider native tools (AWS Security Hub, Azure Defender)', badge: 'Single-cloud', body: 'Free and deeply integrated into their respective clouds. AWS Security Hub aggregates findings from Guard Duty, Inspector, and Macie. Excellent for single-cloud organizations. No cross-cloud visibility. Less sophisticated risk correlation than dedicated CNAPPs. Good starting point for learning cloud security.' },
          ]} />
        </Block>

        {/* Career relevance */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why Wiz matters for your career" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Cloud security is the fastest-growing security domain', body: 'Enterprise attack surfaces have moved to the cloud. Security engineering roles at tech companies almost always involve cloud security. Wiz is the dominant platform in this space — knowing how it works makes you relevant in every cloud security discussion.' },
            { n: '2', title: 'The CNAPP category is how enterprises buy security', body: 'The consolidation from point tools (CSPM + CWPP + CIEM + DSPM + vulnerability management) to single CNAPP platforms is happening now. Wiz led this consolidation. Understanding why it won helps you understand modern enterprise security architecture.' },
            { n: '3', title: 'Security Graph thinking applies everywhere', body: 'The principle of correlating findings across multiple dimensions to find real attack paths — not just raw vulnerability counts — is how senior security engineers think. The Security Graph model shifts thinking from "how many vulnerabilities do we have" to "what can an attacker actually reach."' },
            { n: '4', title: 'Hands-on via the free trial and AWS Free Tier', body: 'Connect a free AWS account (nothing real) to Wiz\'s free trial. Spin up a few EC2 instances with intentional misconfigurations. See what Wiz finds. This is the hands-on experience that makes the platform real rather than theoretical.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Request a free Wiz trial and connect a test AWS account to see agentless scanning in action',
            'Use AWS Free Tier to create intentionally misconfigured resources and see how Wiz surfaces the risks',
            'Study the Wiz Security Graph model to understand how cloud attack paths are constructed',
            'Learn CNAPP as a category — it will come up in every enterprise cloud security interview',
            'Understand the difference between CSPM, CWPP, CIEM, and DSPM as distinct cloud security problems',
            'Explore AWS Security Hub (free with AWS account) as an accessible introduction to cloud security posture',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Simulate a Cloud Security Assessment</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Create an intentionally insecure AWS environment, scan it with AWS Security Hub (free), and manually trace the attack paths that Wiz would identify. This simulates the cloud security assessment process used by professional security engineers, using only free tools. Document your findings in a risk report — this is a strong portfolio piece for cloud security roles.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Enable AWS Security Hub', body: 'Create a free AWS account. Go to Security Hub → Enable. It automatically activates GuardDuty, Inspector, and Macie integrations. This is AWS\'s free equivalent to some Wiz CSPM functionality.' },
            { n: '2', title: 'Create intentional misconfigurations', body: 'Create an S3 bucket with public access enabled. Create an EC2 instance with overly permissive security group (0.0.0.0/0 on all ports). Create an IAM user with AdministratorAccess. These are the classic misconfigurations Wiz finds.' },
            { n: '3', title: 'Review Security Hub findings', body: 'Within 30 minutes, Security Hub will flag your misconfigurations. Read each finding: what is the resource, what is the risk, what is the severity. This is what Wiz shows at enterprise scale.' },
            { n: '4', title: 'Map the attack path manually', body: 'Think like Wiz: your S3 bucket + public access + no bucket policy + sensitive data = data exposure. Your EC2 + all-ports-open + admin IAM role = full account takeover if the instance is compromised. Document these combinations in a risk report.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: AWS Free Tier resources + AWS Security Hub free for first 30 days in new accounts</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>The cloud security market in 2025 is hiring heavily — it is one of the few areas in tech where demand significantly exceeds supply of qualified candidates. If you are interested in security as a career path, cloud security offers the highest compensation and fastest growth. The path is: get an AWS account, learn IAM and networking fundamentals, get AWS Solutions Architect Associate certification, then layer in security tools like Wiz and AWS Security Hub. A student who can talk intelligently about attack path analysis, CSPM, and CNAPP in an interview is immediately differentiated from the 90% of candidates who only know perimeter security.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/security/gitguardian')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> GitGuardian
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            AI Lab <ChevronRight size={14} />
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
