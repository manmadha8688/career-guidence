import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#FF9900'

export default function AmazonQPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Coding">
      <ToolHeader
        icon="☁️"
        title="Amazon Q Developer — AWS's Free AI Coding Assistant"
        tagline="Code completion, multi-file agent, security scanning — free for individual developers"
        badges={[['✓ FREE Individual Tier', '#4ADE80'], ['AWS', color], ['15+ Languages', 'var(--text-muted)']]}
        overview={"Amazon Q Developer is AWS's AI-powered coding assistant — the evolution of Amazon CodeWhisperer, rebranded and significantly expanded in 2024. Where CodeWhisperer focused on inline code completions, Amazon Q Developer adds a full agentic layer: it can plan multi-file changes, write and run tests, generate documentation, review code for security issues, and transform legacy Java applications — all from natural language prompts inside your IDE. For individual developers, the Free Tier gives you unlimited inline code completions and 50 agentic chat interactions per month (rising to 1,000 from August 2025), at zero cost. The defining difference from GitHub Copilot or Cursor is depth of AWS integration: Q Developer natively understands CloudFormation templates, CDK constructs, Lambda configurations, and 200+ AWS services, making it the obvious choice when you are building on AWS infrastructure."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Getting Started with Amazon Q Developer in VS Code — AWS Official', url: 'https://www.youtube.com/watch?v=6-MlALaPX9A', dur: '~30 min', note: 'AWS re:Invent 2024 — installing, logging in with Builder ID, inline completions, /dev agent' },
            { label: 'How to Easily Get Started with Amazon Q Developer — AWS Events', url: 'https://www.classcentral.com/course/youtube-how-to-easily-get-started-with-amazon-q-developer-aws-events-406285', dur: 'Part 1+2', note: 'Two-part official series — setup, chat, agentic tasks, advanced features' },
            { label: 'Amazon Q Tutorials Playlist — AWS Official YouTube', url: 'https://www.youtube.com/playlist?list=PLhr1KZpdzukc7UVN2n8HZ7A6L2QJ9j0W7', dur: 'Series', note: 'Full AWS playlist covering every major Q Developer feature from basics to agents' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How Amazon Q Developer works" color={color} />
          <InfoBox color={color}>Amazon Q Developer runs as an extension inside your IDE and connects to AWS's model infrastructure. It reads your current file, open files, and the surrounding codebase to generate inline completions. When you use the chat panel or run an agent command like /dev, it enters agentic mode — planning a sequence of actions, reading relevant files, writing code changes across multiple files, and running builds and tests to validate its own output. You give it a goal; it handles the steps.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The key architectural difference from standard autocomplete tools is that Q Developer's agents can interact with your actual development environment. They can read files, write changes, run shell commands, execute tests, and iterate based on results. This means when you say "add pagination to all API endpoints," it does not just suggest code — it plans the change, modifies every affected file, verifies the result compiles, and reports back. This agentic loop is what makes Q Developer comparable to Cursor's Composer and Claude Code, rather than just a smarter autocomplete.</p>
        </Block>
        <Block>
          <SubHead label="Key features" color={color} />
          <CardGrid color={color} items={[
            { name: 'Inline code completion', desc: 'Suggests completions as you type — single tokens to entire multi-line functions. Unlimited completions on the free tier. Works across 15+ languages including Python, Java, JavaScript, TypeScript, C#, Go, and Rust.' },
            { name: 'Agentic chat (/dev)', desc: 'Describe a feature or task in natural language. Q Developer plans the implementation, makes changes across multiple files simultaneously, runs builds and tests, and iterates until the code works.' },
            { name: 'Security scanning', desc: 'Built-in SAST scanner checks your code for vulnerabilities — OWASP Top 10, SQL injection, hardcoded credentials, insecure configs. Flags issues with line-level explanations and suggested fixes.' },
            { name: 'Unit test generation (/test)', desc: 'Select a function or class and run /test. Q Developer generates a full test suite covering normal cases, edge cases, and error conditions. Saves hours on test writing for existing code.' },
            { name: 'Documentation generation (/doc)', desc: 'Run /doc on a function, class, or entire file. Q Developer generates docstrings, inline comments, and README-level documentation that accurately describes what the code does.' },
            { name: 'Code review (/review)', desc: 'Runs a code review that detects security issues, code quality problems, and logic errors. Produces a structured report with severity levels — like having a senior engineer review your PR.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Agent commands — what each one does" color={color} />
          <Steps color={color} items={[
            { n: '/dev', title: 'Multi-file code generation', body: 'The most powerful command. Describe a feature, bug fix, or refactor in plain English. Q Developer reads your codebase, plans changes across multiple files, writes the code, runs your build/tests, and iterates. Example: "/dev Add JWT authentication to the Express API with refresh token support".' },
            { n: '/test', title: 'Automated test writing', body: 'Select a function, class, or file and type /test. Q Developer generates a complete test suite with unit tests, edge cases, and error handling tests. Supports Jest, pytest, JUnit, and other popular frameworks based on your project config.' },
            { n: '/doc', title: 'Documentation generation', body: 'Run /doc on any code block to generate accurate docstrings, JSDoc comments, or Python docstrings. Can also generate a README for your entire project or summarize what a module does. Saves 20-30 minutes per file of manual doc writing.' },
            { n: '/review', title: 'Security and quality code review', body: 'Runs a structured review detecting security vulnerabilities (OWASP Top 10), code quality issues, logic errors, and improvement opportunities. Produces a numbered list of findings sorted by severity — critical, high, medium, low.' },
            { n: '/transform', title: 'Legacy code transformation', body: 'Automates upgrading Java applications between versions (Java 8 → Java 17/21). Analyzes compatibility issues, rewrites deprecated APIs, updates dependencies, and generates a full migration report. Handles enterprise-scale transformations.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="AWS ecosystem integration — the real differentiator" color={color} />
          <InfoBox color={color}>Amazon Q Developer is the only coding assistant trained with deep knowledge of AWS services. It understands CloudFormation syntax, CDK constructs, Lambda handler patterns, IAM policies, S3 operations, DynamoDB query patterns, and 200+ other AWS APIs natively — without needing generic web search or extra context.</InfoBox>
          <CardGrid color={color} items={[
            { name: 'CloudFormation & Terraform', desc: 'Generates complete CloudFormation templates from descriptions. Knows resource types, property names, and dependency patterns. Also supports Terraform HCL with AWS provider completions.' },
            { name: 'AWS CDK', desc: 'First-class CDK support — generates CDK constructs in Python, TypeScript, Java, or C#. Understands L1/L2/L3 construct patterns, stack composition, and cross-stack references.' },
            { name: 'Lambda functions', desc: 'Generates Lambda handlers with correct event types (API Gateway, S3, DynamoDB Streams, SQS). Knows the handler signature, context object, and how to return proper response formats.' },
            { name: 'IAM policies', desc: 'Helps write least-privilege IAM policies. Suggests correct action names, resource ARN formats, and condition keys for any AWS service. Flags overly permissive policies during /review.' },
            { name: 'AWS SDK calls', desc: 'Autocompletes AWS SDK v3 (JavaScript), boto3 (Python), and AWS SDK for Java calls with correct method names, parameters, and async patterns. Far more accurate than generic models.' },
            { name: 'Serverless architecture', desc: 'Can design and scaffold complete serverless architectures — API Gateway + Lambda + DynamoDB — from a description, including CDK or CloudFormation IaC code for the entire stack.' },
          ]} />
          <p className="tool-layout-block__para" style={{ marginBottom: 0, marginTop: '0.75rem'}}>For students learning AWS, this integration is uniquely valuable. Writing your first Lambda function, CDK stack, or CloudFormation template has a steep learning curve because AWS resource names and property structures are complex. Q Developer removes that barrier — you can describe what you want in plain English and get working AWS code immediately, then learn by reading what it generated.</p>
        </Block>
        <Block>
          <SubHead label="Amazon Q vs GitHub Copilot vs Cursor" color={color} />
          <Compare color={color} items={[
            { label: 'Amazon Q Developer', badge: 'Best for AWS', body: 'Free unlimited completions + 50 agent uses/month. Deepest AWS integration of any tool — natively understands CloudFormation, CDK, Lambda, and 200+ AWS services. Agentic /dev command for multi-file tasks. Built-in security scanner. Ideal if you are building on AWS or learning cloud development. The AWS-specific context advantage over other tools is significant.' },
            { label: 'GitHub Copilot', badge: 'Best for students (GitHub pack)', body: 'Free for students via GitHub Student Developer Pack. Best IDE support coverage (VS Code, JetBrains, Visual Studio, Neovim). The most widely used tool — 68% developer adoption in Stack Overflow survey. Strong for general-purpose coding but has no cloud-specific specialization. Easiest to get started for GitHub-centric workflows.' },
            { label: 'Cursor', badge: 'Best for complex projects', body: 'Paid ($20/month after free trial). Full codebase indexing makes it the strongest tool for large, complex projects where other tools lose context. Composer (multi-file editing) is the most capable on the market. Supports multiple AI models (GPT-5.5, Claude Sonnet 5, Gemini). No AWS specialization, but works well with any codebase regardless of tech stack.' },
          ]} />
          <p className="tool-layout-block__para" style={{ marginBottom: 0, marginTop: '0.75rem'}}>The practical answer for students: use Amazon Q if you are actively learning AWS or building cloud applications. Use Copilot if you want the free student option with the broadest general support. Use Cursor if you are working on a large codebase and can afford the paid tier. These tools complement each other — many professional developers use Q for AWS work and Cursor for everything else.</p>
        </Block>
        <Block>
          <SubHead label="Free tier — what you actually get" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Create a free AWS Builder ID', body: 'Go to aws.amazon.com/q/developer and click "Get started free." Create an AWS Builder ID — this is a free account separate from a full AWS account. No credit card required for the individual free tier.' },
            { n: '2', title: 'Install the Amazon Q extension in VS Code', body: "Open VS Code → Extensions (Ctrl+Shift+X) → search 'Amazon Q' → Install. Also available for JetBrains IDEs (IntelliJ, PyCharm, etc.), Visual Studio (Windows), and Eclipse. Sign in with your Builder ID." },
            { n: '3', title: 'Enable inline completions', body: 'Completions appear automatically as you type. Look for gray ghost text suggestions. Press Tab to accept, Esc to dismiss. These are unlimited on the free tier — there is no monthly cap on basic inline suggestions.' },
            { n: '4', title: 'Use the chat panel for agent commands', body: "Open the Amazon Q chat panel (sidebar icon or Ctrl+Shift+P → 'Amazon Q: Open Chat'). Type /dev, /test, /doc, or /review followed by your instruction. Free tier allows 50 agentic interactions per month (1,000 from August 2025)." },
            { n: '5', title: 'Run a security scan on your code', body: 'Right-click any file in the explorer → Amazon Q → Run Security Scan. The scanner checks for OWASP Top 10 vulnerabilities and common code issues. Free tier includes security scans — use this on every project you build.' },
          ]} />
          <div className="tool-helper-highlight" style={{ '--tool-color': color }}>
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
                <div key={i} className="tool-checklist-item">
                  <span style={{ color, flexShrink: 0, fontSize: '0.7rem', marginTop: 2 }}>✓</span>{item}
                </div>
              ))}
            </div>
          </div>
        </Block>
        <Block>
          <SubHead label="IDE and language support" color={color} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px,100%),1fr))', gap: '0.75rem', margin: '0.75rem 0' }}>
            {[
              { title: 'VS Code', desc: 'Full support — inline completions, chat panel, /dev agent, security scanning. Most popular IDE for Q Developer.' },
              { title: 'JetBrains IDEs', desc: 'IntelliJ IDEA, PyCharm, WebStorm, GoLand. Full agentic experience available from June 2025.' },
              { title: 'Visual Studio', desc: 'Windows-only. Full agentic experience available from June 2025. Good for .NET/C# AWS work.' },
              { title: 'Command Line (CLI)', desc: 'Amazon Q in the terminal — autocompletes shell commands, explains CLI flags, and can run agentic tasks from the command line.' },
            ].map((ide, i) => (
              <div key={i} className="tool-helper-card">
                <div className="tool-helper-card__name">{ide.title}</div>
                <p className="tool-helper-card__desc">{ide.desc}</p>
              </div>
            ))}
          </div>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>Supported languages include Python, Java, JavaScript, TypeScript, C#, C++, Go, Rust, Kotlin, Scala, PHP, Ruby, Dart, Bash, PowerShell, CloudFormation (YAML/JSON), Terraform (HCL), and more — 15+ languages total. AWS-specific config formats like CloudFormation and CDK are treated as first-class languages with deep completions, not just generic text suggestions.</p>
        </Block>
        <ProjectTask
        title={"Build a Serverless API on AWS with Amazon Q"}
        description={"Build a serverless REST API using AWS Lambda + API Gateway + DynamoDB. Use Amazon Q Developer's /dev agent to generate the entire stack including CDK infrastructure code. This project teaches you both serverless architecture and cloud-native development — the most in-demand skill combination for AWS roles in 2025."}
        costNote={"TOTAL COST: ₹0 — Free Individual Tier, no credit card required"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Set up Amazon Q Developer free', body: 'Create an AWS Builder ID at aws.amazon.com/q/developer. Install the Amazon Q extension in VS Code. Sign in. Verify inline completions appear when you type Python or JavaScript.' },
            { n: '2', title: 'Use /dev to scaffold the Lambda function', body: 'Open the Q chat panel. Type: "/dev Create a Python Lambda function for a simple To-Do API with CRUD operations. Include DynamoDB read/write operations and proper error handling." Review and accept the generated code.' },
            { n: '3', title: 'Generate CDK infrastructure', body: 'Type: "/dev Generate AWS CDK Python code to deploy this Lambda with API Gateway (REST API with 4 routes) and a DynamoDB table with a partition key of id." Q will create the complete infrastructure stack.' },
            { n: '4', title: 'Run a security scan', body: 'Right-click the Lambda file → Amazon Q → Run Security Scan. Review any findings. Use /review in chat to get a full code quality report. Fix flagged issues using the inline suggestions Q provides.' },
            { n: '5', title: 'Generate tests with /test', body: 'Select the Lambda handler function → type /test in the chat. Q generates a pytest suite with mocked DynamoDB calls. Run the tests locally. This is production-grade development practice.' },
          ]} />
      </ProjectTask>
        <ProTip>
        The highest-value use of Amazon Q for a student learning AWS is not code completion — it is using /dev to build complete working infrastructure and then reading what it generated. AWS CDK and CloudFormation have hundreds of resource types with complex property structures. Having Q generate a working stack and then exploring the code is the fastest way to learn AWS services. Treat each generated CDK file as a live tutorial written specifically for what you asked to build.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/coding/roo-code', label: 'Roo Code' }}
        next={{ path: '/ai-lab', label: 'AI Lab' }}
      />
    </ToolPageShell>
  )
}
