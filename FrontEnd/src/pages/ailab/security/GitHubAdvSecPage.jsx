import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#10B981'

export default function GitHubAdvSecPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Security & Code Review">
      <ToolHeader
        icon="🐙"
        title="GitHub Advanced Security — Security Built Into Your Workflow"
        tagline="Code scanning, secret detection, dependency review — free for public repos"
        badges={[['Free for Public', '#4ADE80'], ['GitHub', color], ['DevSecOps', 'var(--text-muted)']]}
        overview={"GitHub Advanced Security (GHAS) is the security layer built directly into GitHub — no external tools, no separate pipelines, no configuration overhead. It consists of three core features: code scanning (powered by CodeQL, GitHub's own semantic code analysis engine), secret scanning (detecting API keys, tokens, and credentials committed to your repo), and dependency review (blocking PRs that introduce vulnerable packages). In March 2025, GitHub restructured GHAS into two standalone products — GitHub Secret Protection and GitHub Code Security — making it easier for organizations to adopt the specific capabilities they need. For students with public repositories, all of this is free with zero setup."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Introduction to GitHub Advanced Security (GHAS) 2025', url: 'https://www.youtube.com/watch?v=mtxlvWYjIxc', dur: '~20 min', note: 'Best 2025 overview — CodeQL, secret scanning, Dependabot all covered' },
            { label: 'GHAS Features — CodeQL, Dependabot, SAST, Secret Scanning', url: 'https://www.youtube.com/watch?v=LO5u45ZUUU4', dur: '~25 min', note: 'All GHAS features explained with demos — May 2025' },
            { label: 'Decrease Secret Leaks with GitHub Advanced Security', url: 'https://www.youtube.com/watch?v=2fJ0mi9rekY', dur: '~15 min', note: 'Secret scanning and push protection walkthrough — Dec 2024' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How GitHub Advanced Security works" color={color} />
          <InfoBox color={color}>GitHub Advanced Security embeds security analysis directly into the pull request workflow — the place where code changes happen. Instead of scanning code after it is merged, GHAS flags vulnerabilities, secrets, and risky dependencies in the PR diff before the merge button is clickable. This "shift left" approach is why it is the model for DevSecOps: security as a PR check, not a post-release audit.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>CodeQL — GitHub's code analysis engine — treats code as data. It builds a semantic model of your codebase and runs queries that can find complex vulnerability patterns a regex cannot: a user-controlled value that flows through three function calls and lands in a SQL query unsanitized. CodeQL supports C, C++, C#, Go, Java, Kotlin, JavaScript, TypeScript, Python, Ruby, Swift. Secret scanning monitors every push and every commit in history for 200+ secret types from providers like AWS, Google, Azure, Stripe, and GitHub itself. Push protection blocks the push before it even reaches GitHub if a secret is detected. Dependency review shows exactly what vulnerable packages a PR would add, with CVE details, inline in the PR diff.</p>
        </Block>
        <Block>
          <SubHead label="Free vs paid — the real breakdown" color={color} />
          <Compare color={color} items={[
            { label: 'Public repos — everything free', badge: 'Zero cost, zero setup', body: 'All GHAS features are permanently free for public repositories on GitHub. Code scanning, secret scanning, push protection, and Dependabot are all included. If you are building an open-source project or have your portfolio repos public, you already have enterprise-grade security at no cost. Enable it in Settings → Security → Code security and analysis.' },
            { label: 'GitHub Secret Protection — $19/active-committer/month', badge: 'Private repos', body: 'Enables secret scanning with AI-detected passwords, push protection, custom secret patterns, and validity checks on private repositories. Available to GitHub Team plan customers as of April 2025. Worth it for any private repo handling real API keys or credentials.' },
            { label: 'GitHub Code Security — $30/active-committer/month', badge: 'Private repos', body: 'Enables CodeQL code scanning, Copilot Autofix (AI-generated fix suggestions for found vulnerabilities), security campaigns for addressing security debt at scale, and PR dependency review for private repos. The Copilot Autofix feature significantly reduces the time to fix findings.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Core capabilities" color={color} />
          <CardGrid color={color} items={[
            { name: 'CodeQL code scanning', desc: 'Semantic analysis engine that finds injection flaws, authentication bypasses, and logic vulnerabilities that pattern matching misses. Runs as a GitHub Actions workflow. Results appear as PR annotations and in the Security tab.' },
            { name: 'Secret scanning', desc: 'Monitors every push for 200+ known secret formats — AWS Access Keys, GitHub PATs, Stripe keys, OpenAI keys, Azure credentials, and more. Automatically notifies the service provider so tokens can be rotated before exploitation.' },
            { name: 'Push protection', desc: 'Blocks pushes before they reach GitHub if a high-confidence secret is detected. The developer must confirm no secret exists or acknowledge the risk. This is the difference between detecting a leak and preventing it.' },
            { name: 'Dependabot', desc: 'Free for all repos (public and private). Automatically opens PRs to upgrade vulnerable dependencies. Dependabot security updates are zero-touch: GitHub writes the version bump PR, you just review and merge.' },
            { name: 'Copilot Autofix', desc: 'When CodeQL finds a vulnerability, Copilot Autofix generates a suggested code fix — not just a description. The developer reviews a diff showing exactly how to remediate the finding. Dramatically reduces fix time for common vulnerability classes.' },
            { name: 'Security campaigns', desc: 'New in 2025: helps security teams create structured campaigns to address categories of security debt (e.g., all SQL injection findings across all repos) with tracking and developer notifications at scale.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Enable GHAS on your public repo — 3 minutes" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Enable in repository settings', body: 'Go to your repo → Settings → Security → Code security and analysis. Enable: Dependabot alerts, Dependabot security updates, Code scanning (select "Set up CodeQL"), and Secret scanning.' },
            { n: '2', title: 'CodeQL Action runs automatically', body: 'GitHub creates a .github/workflows/codeql.yml file. On every push and PR to main, CodeQL scans your code. First run takes ~5-10 minutes. Results appear in the Security → Code scanning alerts tab.' },
            { n: '3', title: 'Review security alerts', body: 'Security tab → Code scanning alerts. Each alert shows: severity, the vulnerable code line, a description of the vulnerability, and suggested fix. Click "Show more" to see data-flow paths for injection vulnerabilities.' },
            { n: '4', title: 'Respond to secret scanning alerts', body: 'If any committed secrets are found, GitHub emails you and shows them in Security → Secret scanning alerts. Immediately revoke the secret at the provider (AWS console, OpenAI dashboard, etc.) then rotate to a new one.' },
            { n: '5', title: 'Review Dependabot PRs', body: 'Dependabot opens PRs automatically for vulnerable dependencies. Review the diff (usually a one-line version bump), check if tests pass, and merge. GitHub tracks your response rate in the security overview.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Enable full code scanning, secret detection, and dependency review on every public repo — completely free',
            'Get CodeQL vulnerability annotations directly on pull request diffs before merging',
            'Block accidental credential commits with push protection — GitHub stops the push before it lands',
            'Receive automated Dependabot PRs that fix vulnerable dependencies with one-click merges',
            'Use the Security tab as a single dashboard for all vulnerability types across your repositories',
            'Get AI-generated fix suggestions via Copilot Autofix for every CodeQL finding (paid private repos)',
        ]} />
      </Block>
        <ProjectTask
        title={"Full DevSecOps Pipeline on a Public Repo"}
        description={"Take any public GitHub repo (your own or a fork of an open-source project). Enable all GHAS features, run a full scan, resolve at least two findings, and set up branch protection rules that require code scanning to pass before merging. This is a real DevSecOps workflow used at professional engineering organizations."}
        costNote={"TOTAL COST: ₹0 — all features free for public repositories"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Enable all security features', body: 'Settings → Security → Code security and analysis → enable everything: Dependabot, CodeQL, secret scanning, push protection.' },
            { n: '2', title: 'Wait for first CodeQL scan', body: 'GitHub runs the scan automatically. Check Actions tab for progress. Then review Security → Code scanning alerts for all findings.' },
            { n: '3', title: 'Resolve 2 findings', body: 'Pick two findings, understand them, fix the code, push the fix, verify the alert closes. Document what the vulnerability was and how you fixed it.' },
            { n: '4', title: 'Set branch protection rules', body: 'Settings → Branches → Add rule for main. Enable "Require status checks to pass" and add the CodeQL analysis check. Now no PR merges unless the security scan passes.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Never commit real API keys or credentials to a repository — even a private one. GitHub scans private repos for secrets too (with GHAS paid), and even without it, git history is permanent. Once a secret is pushed, assume it is compromised and rotate it immediately. The professional habit is to always use environment variables (.env files with .gitignore) or a secrets manager. Set up push protection on every repo you touch — it is a one-click enable that stops the accident before it happens.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/security/sonarqube', label: 'SonarQube' }}
        next={{ path: '/ai-lab/security/gitguardian', label: 'GitGuardian' }}
      />
    </ToolPageShell>
  )
}
