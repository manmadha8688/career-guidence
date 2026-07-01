import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#4C4A99'

export default function SnykPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Security & Code Review">
      <ToolHeader
        icon="🛡️"
        title="Snyk — Find and Fix Vulnerabilities in Your Code"
        tagline="Security scanning for code, dependencies, containers, and IaC"
        badges={[['✓ FREE', '#4ADE80'], ['snyk.io', color], ['Developer Security', 'var(--text-muted)']]}
        overview={"Snyk is a developer-first security platform that finds and automatically fixes vulnerabilities before they reach production. Unlike traditional security tools that bolt on at the end of the development cycle, Snyk integrates directly into your IDE, CI/CD pipeline, and source control — so security feedback arrives while you are writing code, not weeks later in a penetration test report. Recognized as a Leader in the 2025 Gartner Magic Quadrant for Application Security Testing, Snyk covers five attack surfaces: your own code (SAST), open-source dependencies (SCA), container images, infrastructure as code, and cloud runtime posture. For students and developers, the free tier provides genuine protection with no credit card required."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Snyk Tutorial in One Shot — Secure Code, Libraries, IaC & Images', url: 'https://www.youtube.com/watch?v=Cz4e_rNULPA', dur: '~30 min', note: 'Best comprehensive intro — CLI, IDE plugin, and all scanning features' },
            { label: 'SAST With Snyk 2024 — Getting Started', url: 'https://www.youtube.com/watch?v=W3CWl7C-pro', dur: '~20 min', note: 'Static analysis scanning setup and first vulnerability scan' },
            { label: 'Snyk + GitLab CI/CD — DevSecOps Full Hands-On Demo 2025', url: 'https://www.youtube.com/watch?v=M0VxNY2JzdY', dur: '~25 min', note: 'Add Snyk security scanning to your CI/CD pipeline step by step' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What Snyk actually scans" color={color} />
          <InfoBox color={color}>Snyk is not one tool — it is five scanners under a single developer-friendly interface. The power comes from combining them: a vulnerability in a dependency used by your container deployed to a misconfigured cloud bucket is one connected risk, and Snyk surfaces that chain rather than five separate alerts.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>Snyk Code uses DeepCode AI — a security-focused engine trained on millions of open-source repositories — to find logic bugs, injection flaws, and security anti-patterns in your source code. Snyk Open Source scans your package managers (npm, pip, Maven, Go modules, and more) for known CVEs in your dependencies and transitive dependencies. Snyk Container checks Docker images for OS-level vulnerabilities and insecure base image choices. Snyk IaC scans Terraform, Kubernetes YAML, Helm, and CloudFormation for misconfigurations before they are deployed. Snyk Cloud monitors your live AWS, Azure, and GCP environments for drift and runtime risk.</p>
        </Block>
        <Block>
          <SubHead label="Free tier — what you actually get" color={color} />
          <Compare color={color} items={[
            { label: 'Free plan', badge: 'No credit card', body: '200 open-source dependency tests per month, 100 container image tests, 300 IaC tests, full IDE plugin access (VS Code, JetBrains, Eclipse), and SCM integration with GitHub/GitLab/Bitbucket. For individual developers and students, this is enough to protect every project you are actively working on.' },
            { label: 'Team plan — $25/user/month', badge: 'For small teams', body: 'Unlimited scans, PR checks on every pull request, license compliance analysis, Jira integration, team dashboards, and priority support. Relevant when you are working on a team project or internship with shared repos.' },
            { label: 'Enterprise', badge: 'For organizations', body: 'SSO, custom policies, SIEM integration, SLA-backed support, and role-based access control. This is what companies at scale run — good to know for interviews and enterprise jobs.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Core capabilities" color={color} />
          <CardGrid color={color} items={[
            { name: 'Snyk Code (SAST)', desc: 'Real-time static analysis in your IDE. Flags SQL injection, XSS, hardcoded secrets, insecure deserialization, and more as you type. Supports JS, TS, Python, Java, Go, C#, C++, PHP, Ruby, Swift, Kotlin.' },
            { name: 'Snyk Open Source (SCA)', desc: 'Scans package.json, requirements.txt, pom.xml, go.mod, and more. Finds CVEs in direct AND transitive dependencies. Shows severity, CVSS score, and fix recommendation (usually a version bump).' },
            { name: 'Snyk Container', desc: 'Pulls and scans Docker images for OS-level CVEs. Recommends a less-vulnerable base image (e.g., switch from node:18 to node:18-alpine to remove 200 vulnerabilities). Integrates with Docker Hub and ECR.' },
            { name: 'Snyk IaC', desc: 'Scans Terraform, Kubernetes YAML, Helm charts, and ARM templates for security misconfigurations — open S3 buckets, overly permissive IAM, missing network policies, unencrypted storage.' },
            { name: 'Fix suggestions', desc: 'Snyk does not just tell you what is broken — it generates pull requests with the fix applied. One-click PR to bump a vulnerable dependency. This is the key differentiator from generic SAST tools.' },
            { name: 'Snyk CLI', desc: 'Run `snyk test` in any project to get a full vulnerability report. `snyk monitor` uploads your dependency tree for continuous monitoring. Integrates into any CI/CD system with a one-line addition.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Set up Snyk in VS Code — 5 minutes" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Install the extension', body: 'Open VS Code Extensions (Ctrl+Shift+X), search "Snyk Security", install the official extension by Snyk Ltd. It has over 1 million installs.' },
            { n: '2', title: 'Authenticate', body: 'Click the Snyk icon in the sidebar. Click "Connect VS Code with Snyk". A browser tab opens — log in with GitHub (recommended), Google, or email. Free account, no card needed.' },
            { n: '3', title: 'Run your first scan', body: 'Open any project folder in VS Code. The Snyk panel runs automatically on open. You will see three trees: Snyk Code issues, Open Source vulnerabilities, and IaC misconfigurations.' },
            { n: '4', title: 'Read the findings', body: 'Each finding shows: severity (Critical/High/Medium/Low), the exact line, a description of the vulnerability, why it is dangerous, and example fix. Click any finding to jump to the line.' },
            { n: '5', title: 'Apply fixes', body: 'For dependency vulnerabilities, click "Fix this vulnerability" to open a PR suggestion. For code issues, apply the suggested fix manually or use Snyk\'s AI fix suggestion where available.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Snyk vs SonarQube vs GitHub Security — comparison" color={color} />
          <Compare color={color} items={[
            { label: 'Snyk', badge: 'Best for developers', body: 'Developer-first UX with IDE plugin, auto-fix PRs, and dependency + container scanning in one tool. Free tier is generous. Best choice if you want security integrated into your daily coding workflow right now. Weakness: SAST depth is below SonarQube for code quality issues.' },
            { label: 'SonarQube', badge: 'Best for code quality', body: 'Deeper static analysis across 40+ languages. Community edition is free and self-hosted. Better for code smells, complexity, and maintainability alongside security. Requires Docker setup. No native dependency scanning — security is one component among many quality checks.' },
            { label: 'GitHub Advanced Security', badge: 'Best for GitHub repos', body: 'Native integration with GitHub — zero setup for public repos. CodeQL-powered code scanning, secret detection with push protection, and Dependabot for dependency alerts. Free for all public repositories. Paid for private repos ($19/user/month). Best if you are already on GitHub and want zero-configuration security.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Student use cases" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Scan your college projects', body: 'Run `snyk test` on any npm or Python project from class. You will almost certainly find vulnerabilities in the packages your professor told you to install. Fix them before submitting — it shows security awareness that most students miss.' },
            { n: '2', title: 'Add to your portfolio GitHub repos', body: 'Add a Snyk badge (![Known Vulnerabilities](https://snyk.io/test/github/youruser/yourrepo/badge.svg)) to your README. Recruiters notice. It signals you think about security, not just functionality.' },
            { n: '3', title: 'Practice reading CVE reports', body: 'When Snyk flags a vulnerability, read the full CVE details it links to. Understanding what a SQL injection or prototype pollution actually means — not just that it is "high severity" — is the kind of depth that separates junior from senior developers.' },
            { n: '4', title: 'Build a DevSecOps pipeline for interview demos', body: 'Add `snyk test --severity-threshold=high` to a GitHub Actions workflow. If a high-severity vulnerability is introduced, the build fails. Show this in interviews as proof you understand the full CI/CD security lifecycle.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Scan any JavaScript, Python, Java, or Go project for vulnerabilities in seconds with the free tier',
            'Get real-time security feedback in VS Code while writing code — no separate scan step needed',
            'Find CVEs in your npm or pip dependencies including transitive packages you never directly imported',
            'Scan Docker images for OS-level vulnerabilities and get base image upgrade recommendations',
            'Add snyk test to GitHub Actions to auto-block PRs that introduce high-severity vulnerabilities',
            'Generate fix PRs automatically — Snyk writes the dependency version bump commit for you',
        ]} />
      </Block>
        <ProjectTask
        title={"Secure a Real Project End-to-End"}
        description={"Take any existing project you have built — even a simple Node.js or Python app from a course. Run a full Snyk security audit, document every finding, fix at least two vulnerabilities, and add Snyk to the CI/CD pipeline. Then write a brief security report summarizing what you found and fixed. This is a concrete portfolio artifact that demonstrates security awareness rare in junior developers."}
        costNote={"TOTAL COST: ₹0 — Snyk free tier covers all of this"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Install and authenticate Snyk CLI', body: 'npm install -g snyk && snyk auth. This opens a browser login. Free signup with GitHub.' },
            { n: '2', title: 'Run a full project scan', body: 'cd your-project && snyk test. Note every vulnerability — severity, package name, CVE number, and recommended fix version.' },
            { n: '3', title: 'Fix at least 2 vulnerabilities', body: 'Run snyk fix (auto-upgrades safe dependencies) or manually bump versions. Re-run snyk test to confirm the CVEs are gone.' },
            { n: '4', title: 'Add to GitHub Actions', body: 'Add a .github/workflows/snyk.yml that runs snyk test on every PR. Set --severity-threshold=high so only critical findings block the build.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Run snyk test on any popular open-source project you admire — clone it and scan it. You will almost certainly find known vulnerabilities even in well-maintained projects. Reading through those findings and understanding why they exist is one of the fastest ways to develop real security intuition. The top entry-level AppSec engineers learn by studying real vulnerabilities in real code, not toy examples.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab', label: 'AI Lab' }}
        next={{ path: '/ai-lab/security/sonarqube', label: 'SonarQube' }}
      />
    </ToolPageShell>
  )
}
