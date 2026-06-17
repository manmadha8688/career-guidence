import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#FF9900'

export default function AmazonQPage() {
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>☁️</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Amazon Q Developer — AWS's Free AI Coding Assistant</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Code completion, multi-file agent, security scanning — free for individual developers</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE Individual Tier', '#4ADE80'], ['AWS', color], ['15+ Languages', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Amazon Q Developer is AWS's AI-powered coding assistant — the evolution of Amazon CodeWhisperer, rebranded and significantly expanded in 2024. Where CodeWhisperer focused on inline code completions, Amazon Q Developer adds a full agentic layer: it can plan multi-file changes, write and run tests, generate documentation, review code for security issues, and transform legacy Java applications — all from natural language prompts inside your IDE. For individual developers, the Free Tier gives you unlimited inline code completions and 50 agentic chat interactions per month (rising to 1,000 from August 2025), at zero cost. The defining difference from GitHub Copilot or Cursor is depth of AWS integration: Q Developer natively understands CloudFormation templates, CDK constructs, Lambda configurations, and 200+ AWS services, making it the obvious choice when you are building on AWS infrastructure.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Getting Started with Amazon Q Developer in VS Code — AWS Official', url: 'https://www.youtube.com/watch?v=6-MlALaPX9A', dur: '~30 min', note: 'AWS re:Invent 2024 — installing, logging in with Builder ID, inline completions, /dev agent' },
            { label: 'How to Easily Get Started with Amazon Q Developer — AWS Events', url: 'https://www.classcentral.com/course/youtube-how-to-easily-get-started-with-amazon-q-developer-aws-events-406285', dur: 'Part 1+2', note: 'Two-part official series — setup, chat, agentic tasks, advanced features' },
            { label: 'Amazon Q Tutorials Playlist — AWS Official YouTube', url: 'https://www.youtube.com/playlist?list=PLhr1KZpdzukc7UVN2n8HZ7A6L2QJ9j0W7', dur: 'Series', note: 'Full AWS playlist covering every major Q Developer feature from basics to agents' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* How Amazon Q works */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How Amazon Q Developer works" color={color} />
          <InfoBox color={color} dark={dark}>Amazon Q Developer runs as an extension inside your IDE and connects to AWS's model infrastructure. It reads your current file, open files, and the surrounding codebase to generate inline completions. When you use the chat panel or run an agent command like /dev, it enters agentic mode — planning a sequence of actions, reading relevant files, writing code changes across multiple files, and running builds and tests to validate its own output. You give it a goal; it handles the steps.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The key architectural difference from standard autocomplete tools is that Q Developer's agents can interact with your actual development environment. They can read files, write changes, run shell commands, execute tests, and iterate based on results. This means when you say "add pagination to all API endpoints," it does not just suggest code — it plans the change, modifies every affected file, verifies the result compiles, and reports back. This agentic loop is what makes Q Developer comparable to Cursor's Composer and Claude Code, rather than just a smarter autocomplete.</p>
        </Block>

        {/* Key features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Key features" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Inline code completion', desc: 'Suggests completions as you type — single tokens to entire multi-line functions. Unlimited completions on the free tier. Works across 15+ languages including Python, Java, JavaScript, TypeScript, C#, Go, and Rust.' },
            { name: 'Agentic chat (/dev)', desc: 'Describe a feature or task in natural language. Q Developer plans the implementation, makes changes across multiple files simultaneously, runs builds and tests, and iterates until the code works.' },
            { name: 'Security scanning', desc: 'Built-in SAST scanner checks your code for vulnerabilities — OWASP Top 10, SQL injection, hardcoded credentials, insecure configs. Flags issues with line-level explanations and suggested fixes.' },
            { name: 'Unit test generation (/test)', desc: 'Select a function or class and run /test. Q Developer generates a full test suite covering normal cases, edge cases, and error conditions. Saves hours on test writing for existing code.' },
            { name: 'Documentation generation (/doc)', desc: 'Run /doc on a function, class, or entire file. Q Developer generates docstrings, inline comments, and README-level documentation that accurately describes what the code does.' },
            { name: 'Code review (/review)', desc: 'Runs a code review that detects security issues, code quality problems, and logic errors. Produces a structured report with severity levels — like having a senior engineer review your PR.' },
          ]} />
        </Block>

        {/* Agent commands */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Agent commands — what each one does" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '/dev', title: 'Multi-file code generation', body: 'The most powerful command. Describe a feature, bug fix, or refactor in plain English. Q Developer reads your codebase, plans changes across multiple files, writes the code, runs your build/tests, and iterates. Example: "/dev Add JWT authentication to the Express API with refresh token support".' },
            { n: '/test', title: 'Automated test writing', body: 'Select a function, class, or file and type /test. Q Developer generates a complete test suite with unit tests, edge cases, and error handling tests. Supports Jest, pytest, JUnit, and other popular frameworks based on your project config.' },
            { n: '/doc', title: 'Documentation generation', body: 'Run /doc on any code block to generate accurate docstrings, JSDoc comments, or Python docstrings. Can also generate a README for your entire project or summarize what a module does. Saves 20-30 minutes per file of manual doc writing.' },
            { n: '/review', title: 'Security and quality code review', body: 'Runs a structured review detecting security vulnerabilities (OWASP Top 10), code quality issues, logic errors, and improvement opportunities. Produces a numbered list of findings sorted by severity — critical, high, medium, low.' },
            { n: '/transform', title: 'Legacy code transformation', body: 'Automates upgrading Java applications between versions (Java 8 → Java 17/21). Analyzes compatibility issues, rewrites deprecated APIs, updates dependencies, and generates a full migration report. Handles enterprise-scale transformations.' },
          ]} />
        </Block>

        {/* AWS ecosystem integration */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="AWS ecosystem integration — the real differentiator" color={color} />
          <InfoBox color={color} dark={dark}>Amazon Q Developer is the only coding assistant trained with deep knowledge of AWS services. It understands CloudFormation syntax, CDK constructs, Lambda handler patterns, IAM policies, S3 operations, DynamoDB query patterns, and 200+ other AWS APIs natively — without needing generic web search or extra context.</InfoBox>
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'CloudFormation & Terraform', desc: 'Generates complete CloudFormation templates from descriptions. Knows resource types, property names, and dependency patterns. Also supports Terraform HCL with AWS provider completions.' },
            { name: 'AWS CDK', desc: 'First-class CDK support — generates CDK constructs in Python, TypeScript, Java, or C#. Understands L1/L2/L3 construct patterns, stack composition, and cross-stack references.' },
            { name: 'Lambda functions', desc: 'Generates Lambda handlers with correct event types (API Gateway, S3, DynamoDB Streams, SQS). Knows the handler signature, context object, and how to return proper response formats.' },
            { name: 'IAM policies', desc: 'Helps write least-privilege IAM policies. Suggests correct action names, resource ARN formats, and condition keys for any AWS service. Flags overly permissive policies during /review.' },
            { name: 'AWS SDK calls', desc: 'Autocompletes AWS SDK v3 (JavaScript), boto3 (Python), and AWS SDK for Java calls with correct method names, parameters, and async patterns. Far more accurate than generic models.' },
            { name: 'Serverless architecture', desc: 'Can design and scaffold complete serverless architectures — API Gateway + Lambda + DynamoDB — from a description, including CDK or CloudFormation IaC code for the entire stack.' },
          ]} />
          <p style={{ ...P(sub), marginBottom: 0, marginTop: '0.75rem' }}>For students learning AWS, this integration is uniquely valuable. Writing your first Lambda function, CDK stack, or CloudFormation template has a steep learning curve because AWS resource names and property structures are complex. Q Developer removes that barrier — you can describe what you want in plain English and get working AWS code immediately, then learn by reading what it generated.</p>
        </Block>

        {/* Q vs Copilot vs Cursor */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Amazon Q vs GitHub Copilot vs Cursor" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Amazon Q Developer', badge: 'Best for AWS', body: 'Free unlimited completions + 50 agent uses/month. Deepest AWS integration of any tool — natively understands CloudFormation, CDK, Lambda, and 200+ AWS services. Agentic /dev command for multi-file tasks. Built-in security scanner. Ideal if you are building on AWS or learning cloud development. The AWS-specific context advantage over other tools is significant.' },
            { label: 'GitHub Copilot', badge: 'Best for students (GitHub pack)', body: 'Free for students via GitHub Student Developer Pack. Best IDE support coverage (VS Code, JetBrains, Visual Studio, Neovim). The most widely used tool — 68% developer adoption in Stack Overflow survey. Strong for general-purpose coding but has no cloud-specific specialization. Easiest to get started for GitHub-centric workflows.' },
            { label: 'Cursor', badge: 'Best for complex projects', body: 'Paid ($20/month after free trial). Full codebase indexing makes it the strongest tool for large, complex projects where other tools lose context. Composer (multi-file editing) is the most capable on the market. Supports multiple AI models (GPT-4o, Claude 3.7, Gemini). No AWS specialization, but works well with any codebase regardless of tech stack.' },
          ]} />
          <p style={{ ...P(sub), marginBottom: 0, marginTop: '0.75rem' }}>The practical answer for students: use Amazon Q if you are actively learning AWS or building cloud applications. Use Copilot if you want the free student option with the broadest general support. Use Cursor if you are working on a large codebase and can afford the paid tier. These tools complement each other — many professional developers use Q for AWS work and Cursor for everything else.</p>
        </Block>

        {/* Free tier details */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Free tier — what you actually get" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Create a free AWS Builder ID', body: 'Go to aws.amazon.com/q/developer and click "Get started free." Create an AWS Builder ID — this is a free account separate from a full AWS account. No credit card required for the individual free tier.' },
            { n: '2', title: 'Install the Amazon Q extension in VS Code', body: "Open VS Code → Extensions (Ctrl+Shift+X) → search 'Amazon Q' → Install. Also available for JetBrains IDEs (IntelliJ, PyCharm, etc.), Visual Studio (Windows), and Eclipse. Sign in with your Builder ID." },
            { n: '3', title: 'Enable inline completions', body: 'Completions appear automatically as you type. Look for gray ghost text suggestions. Press Tab to accept, Esc to dismiss. These are unlimited on the free tier — there is no monthly cap on basic inline suggestions.' },
            { n: '4', title: 'Use the chat panel for agent commands', body: "Open the Amazon Q chat panel (sidebar icon or Ctrl+Shift+P → 'Amazon Q: Open Chat'). Type /dev, /test, /doc, or /review followed by your instruction. Free tier allows 50 agentic interactions per month (1,000 from August 2025)." },
            { n: '5', title: 'Run a security scan on your code', body: 'Right-click any file in the explorer → Amazon Q → Run Security Scan. The scanner checks for OWASP Top 10 vulnerabilities and common code issues. Free tier includes security scans — use this on every project you build.' },
          ]} />
          <div style={{ padding: '0.75rem 1rem', borderRadius: 9, background: dark ? `${color}08` : `${color}06`, border: `1px solid ${color}25`, marginTop: '0.5rem' }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color, letterSpacing: '0.08em', marginBottom: '0.35rem' }}>FREE TIER SUMMARY</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px,100%),1fr))', gap: '0.4rem' }}>
              {[
                'Inline completions — unlimited',
                'Agentic chat — 50/month (→1,000 from Aug 2025)',
                'Security scans — included',
                '/dev /test /doc /review — included in chat quota',
                'Code transformation — 1,000 lines/month',
                'No credit card required',
              ].map((item, i) => (
                <div key={i} style={{ fontSize: '0.78rem', color: sub, display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
                  <span style={{ color, flexShrink: 0, fontSize: '0.7rem', marginTop: 2 }}>✓</span>{item}
                </div>
              ))}
            </div>
          </div>
        </Block>

        {/* IDE support */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="IDE and language support" color={color} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px,100%),1fr))', gap: '0.75rem', margin: '0.75rem 0' }}>
            {[
              { title: 'VS Code', desc: 'Full support — inline completions, chat panel, /dev agent, security scanning. Most popular IDE for Q Developer.' },
              { title: 'JetBrains IDEs', desc: 'IntelliJ IDEA, PyCharm, WebStorm, GoLand. Full agentic experience available from June 2025.' },
              { title: 'Visual Studio', desc: 'Windows-only. Full agentic experience available from June 2025. Good for .NET/C# AWS work.' },
              { title: 'Command Line (CLI)', desc: 'Amazon Q in the terminal — autocompletes shell commands, explains CLI flags, and can run agentic tasks from the command line.' },
            ].map((ide, i) => (
              <div key={i} style={{ padding: '0.875rem 1rem', borderRadius: 10, background: dark ? `${color}07` : `${color}05`, border: `1px solid ${color}1e` }}>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', color, letterSpacing: '0.06em', marginBottom: '0.4rem' }}>{ide.title}</div>
                <p style={{ fontSize: '0.8rem', color: sub, lineHeight: 1.65, margin: 0 }}>{ide.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ ...P(sub), marginBottom: 0 }}>Supported languages include Python, Java, JavaScript, TypeScript, C#, C++, Go, Rust, Kotlin, Scala, PHP, Ruby, Dart, Bash, PowerShell, CloudFormation (YAML/JSON), Terraform (HCL), and more — 15+ languages total. AWS-specific config formats like CloudFormation and CDK are treated as first-class languages with deep completions, not just generic text suggestions.</p>
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Serverless API on AWS with Amazon Q</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Build a serverless REST API using AWS Lambda + API Gateway + DynamoDB. Use Amazon Q Developer's /dev agent to generate the entire stack including CDK infrastructure code. This project teaches you both serverless architecture and cloud-native development — the most in-demand skill combination for AWS roles in 2025.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Set up Amazon Q Developer free', body: 'Create an AWS Builder ID at aws.amazon.com/q/developer. Install the Amazon Q extension in VS Code. Sign in. Verify inline completions appear when you type Python or JavaScript.' },
            { n: '2', title: 'Use /dev to scaffold the Lambda function', body: 'Open the Q chat panel. Type: "/dev Create a Python Lambda function for a simple To-Do API with CRUD operations. Include DynamoDB read/write operations and proper error handling." Review and accept the generated code.' },
            { n: '3', title: 'Generate CDK infrastructure', body: 'Type: "/dev Generate AWS CDK Python code to deploy this Lambda with API Gateway (REST API with 4 routes) and a DynamoDB table with a partition key of id." Q will create the complete infrastructure stack.' },
            { n: '4', title: 'Run a security scan', body: 'Right-click the Lambda file → Amazon Q → Run Security Scan. Review any findings. Use /review in chat to get a full code quality report. Fix flagged issues using the inline suggestions Q provides.' },
            { n: '5', title: 'Generate tests with /test', body: 'Select the Lambda handler function → type /test in the chat. Q generates a pytest suite with mocked DynamoDB calls. Run the tests locally. This is production-grade development practice.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(255,153,0,0.08)' : 'rgba(255,153,0,0.06)', border: '1px solid rgba(255,153,0,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color, letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Free Individual Tier, no credit card required</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(255,153,0,0.07)' : 'rgba(255,153,0,0.07)', border: '1px solid rgba(255,153,0,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color, marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>The highest-value use of Amazon Q for a student learning AWS is not code completion — it is using /dev to build complete working infrastructure and then reading what it generated. AWS CDK and CloudFormation have hundreds of resource types with complex property structures. Having Q generate a working stack and then exploring the code is the fastest way to learn AWS services. Treat each generated CDK file as a live tutorial written specifically for what you asked to build.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/coding/codeium')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Codeium
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
