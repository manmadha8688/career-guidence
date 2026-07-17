import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#00A98F'

export default function SemgrepPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Security & Code Review">
      <ToolHeader
        icon="🕵️"
        title="Semgrep — Fast, Open-Source Static Analysis (SAST)"
        tagline="Scan code for bugs and security flaws with grep-like pattern rules"
        badges={[['✓ FREE (CE)', '#4ADE80'], ['semgrep.dev', color], ['Open Source · LGPL 2.1', 'var(--text-muted)']]}
        overview={"Semgrep (\"semantic grep\") is one of the most popular static application security testing (SAST) tools in the world — a fast, open-source engine that scans your source code for security vulnerabilities, bugs, and anti-patterns using rules that look and feel like the code itself. Unlike traditional SAST tools that are slow, noisy, and painful to configure, Semgrep runs in seconds, understands code structure (not just text), and lets you write a rule almost as easily as you write the buggy pattern you want to catch. The core engine — Semgrep Community Edition (CE) — is genuinely open source (LGPL 2.1), free forever, needs no login, and installs in under a minute via pip, Homebrew, or Docker. It ships with 3,000+ community-maintained rules across 30+ languages. On top of CE, the company runs the commercial Semgrep AppSec Platform (Pro rules, cross-file dataflow analysis, Supply Chain, Secrets, an AI assistant) which is free for up to 10 contributors and 10 private repos, then $30+/contributor/month. For students, Semgrep CE alone is a serious, résumé-worthy security tool at zero cost."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Semgrep tutorial — static analysis for beginners', url: 'https://www.youtube.com/results?search_query=semgrep+tutorial', dur: 'Search', note: 'Install the CLI, run your first scan, read the findings' },
            { label: 'Writing custom Semgrep rules from scratch', url: 'https://www.youtube.com/results?search_query=semgrep+custom+rules+tutorial', dur: 'Search', note: 'The killer feature — catch your own team\'s bug patterns' },
            { label: 'Semgrep in CI/CD — block insecure code in pull requests', url: 'https://www.youtube.com/results?search_query=semgrep+ci+cd+github+actions', dur: 'Search', note: 'Add Semgrep to GitHub Actions as a security gate' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What makes Semgrep different — rules that look like code" color={color} />
          <InfoBox color={color}>{"Traditional SAST tools force you to learn a complex query language to write custom rules. Semgrep's insight: let people write rules that look like the code they want to find. To catch a dangerous eval(user_input), your rule pattern is basically eval(...). Semgrep parses code into an abstract syntax tree and matches semantically — so it ignores formatting, variable renaming, and whitespace, catching the pattern no matter how it is written. This is why it is both fast and approachable."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Semgrep runs offline and locally by default — your code never has to leave your machine to be scanned, which matters for privacy and for coursework you cannot upload. It is deterministic (a rules engine, not a flaky AI guess), fast enough to run on every save or every commit, and produces output as human-readable terminal text or machine-readable SARIF/JSON for pipelines. The Community Edition gives you single-function taint analysis and constant propagation; the paid Pro engine adds cross-file/cross-function dataflow for deeper detection.</p>
          {[
            'Semantic matching — rules match code structure, not raw text, so they survive reformatting and variable renames',
            'Write-your-own rules easily — a rule pattern looks like the vulnerable code you want to catch; no obscure query DSL to master',
            '3,000+ community rules — ready-made detections for OWASP Top 10, injection, hardcoded secrets, insecure config, and more',
            '30+ languages — Python, JavaScript/TypeScript, Java, Go, C, C#, Ruby, PHP, Kotlin, Rust, and others',
            'Runs locally & offline — scan without a login or uploading code; output to terminal, SARIF, or JSON for CI',
          ].map((item, i) => (
            <div key={i} className="tool-layout-cando-item">
              <div className="tool-layout-cando-item__dot" />
              <span className="tool-layout-cando-item__text">{item}</span>
            </div>
          ))}
        </Block>
        <Block>
          <SubHead label="Key features" color={color} />
          <CardGrid color={color} items={[
            { name: 'Semgrep CE engine', desc: 'The open-source (LGPL 2.1) CLI scanner. Free forever, no account needed. Single-file and single-function analysis with constant propagation and taint tracking — enough to catch a large share of common vulnerabilities.' },
            { name: 'The Registry (rulesets)', desc: '3,000+ community-maintained rules organised into rulesets. Run the auto config to let Semgrep pick relevant rules for your languages, or target a specific ruleset like p/owasp-top-ten or p/secrets.' },
            { name: 'Custom rules', desc: 'The standout feature: write a rule in YAML whose pattern mirrors the code you want to flag. Perfect for enforcing your own team\'s conventions — "never call this deprecated function," "always parameterise SQL."' },
            { name: 'IDE extensions', desc: 'Official VS Code and IntelliJ/JetBrains extensions surface findings inline as you code, so security feedback arrives while you write rather than after the fact.' },
            { name: 'CI/CD integration', desc: 'A one-line addition to GitHub Actions, GitLab CI, or any pipeline. Fail the build when high-severity findings appear, so insecure code cannot merge. Outputs SARIF for native code-scanning dashboards.' },
            { name: 'AppSec Platform (paid tier)', desc: 'The commercial layer adds Pro rules, cross-file dataflow analysis, Supply Chain (SCA), Secrets detection, and an AI triage assistant. Free for up to 10 contributors / 10 private repos, then $30+/contributor/month.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — scan a project in 3 minutes" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Install Semgrep CE', body: 'On macOS: brew install semgrep. On Windows/Linux with Python: pip install semgrep. Or run it with zero install via Docker: docker run --rm -v "${PWD}:/src" semgrep/semgrep semgrep. Verify with: semgrep --version' },
            { n: '2', title: 'Run the default scan', body: 'cd into any project and run: semgrep --config auto. Semgrep detects your languages automatically, downloads relevant community rules from the Registry, and scans the whole codebase. No login required for community rules.' },
            { n: '3', title: 'Read the findings', body: 'Each finding shows the rule ID, severity, the exact file and line, a plain-English explanation of the risk, and often a fix suggestion. Findings are grouped by rule so you can see all instances of one pattern together.' },
            { n: '4', title: 'Target a specific ruleset', body: 'Scan for a focused category: semgrep --config p/owasp-top-ten (web app security), semgrep --config p/secrets (hardcoded credentials), or semgrep --config p/python for language-specific checks.' },
            { n: '5', title: 'Write your first custom rule', body: 'Create rule.yaml with a pattern that mirrors the bad code (e.g. pattern: eval(...) with message and severity), then run: semgrep --config rule.yaml. You just built a custom static-analysis check — a genuinely senior skill.' },
            { n: '6', title: 'Output for pipelines', body: 'Add --sarif -o results.sarif for code-scanning dashboards, or --json for scripting. Combine with --severity ERROR to focus on the highest-priority issues in CI.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Semgrep vs Snyk vs SonarQube" color={color} />
          <Compare color={color} items={[
            { label: 'Semgrep', badge: 'Best custom-rule SAST', body: 'Fast, open-source, runs locally, and uniquely easy to extend with your own rules that look like code. Best when you want SAST you fully control at zero cost, or need to enforce project-specific patterns. CE is single-function; Pro adds cross-file analysis.' },
            { label: 'Snyk', badge: 'Best all-in-one dev security', body: 'Developer-first platform covering code (SAST), dependencies (SCA), containers, and IaC with auto-fix PRs and a generous free tier. Best when you want dependency + container scanning and one-click fixes alongside code analysis.' },
            { label: 'SonarQube', badge: 'Best for code quality', body: 'Deep static analysis across 25+ languages focused on quality, maintainability, and code smells as well as security. Community Edition is free and self-hosted (Docker). Best when quality metrics matter as much as vulnerabilities.' },
            { label: 'How they combine', badge: 'Not either/or', body: 'A strong real-world setup: Semgrep for fast custom SAST in CI, Snyk for dependency/container scanning, SonarQube for quality gates. Knowing where each fits — and being able to say so in an interview — signals genuine DevSecOps maturity.' },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Write a Custom Rule and Gate a Repo</span></div>
          <p className="tool-layout-task__desc">Take one of your own projects, run a full Semgrep scan, fix real findings, then write a custom rule that catches a mistake specific to your codebase — and wire Semgrep into GitHub Actions so the rule blocks bad pull requests. Writing a working custom SAST rule and enforcing it in CI is exactly the kind of concrete DevSecOps artifact that stands out on a fresher's résumé.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Install and baseline scan', body: 'pip install semgrep (or brew install semgrep). Run semgrep --config auto on a real project of yours. Record every finding — rule ID, severity, file, line.' },
            { n: '2', title: 'Fix at least three findings', body: 'Pick three genuine issues (an eval, a hardcoded secret, an unsanitised input) and fix them in code. Re-run the scan and confirm they are gone. Note what each vulnerability actually enables — understanding the "why" matters.' },
            { n: '3', title: 'Write a custom rule', body: 'Create a rule.yaml that flags a pattern specific to your project — e.g. direct use of a deprecated function, or string-formatted SQL. Test it: semgrep --config rule.yaml. Iterate until it catches every real instance and no false ones.' },
            { n: '4', title: 'Add Semgrep to CI', body: 'Create .github/workflows/semgrep.yml that runs Semgrep with your rules on every pull request, failing the build on ERROR-severity findings. Now insecure code physically cannot merge.' },
            { n: '5', title: 'Prove the gate works', body: 'Open a PR that deliberately reintroduces the bad pattern. Watch the Semgrep check fail and block the merge. Screenshot it — this is your evidence that you built a working security gate.' },
            { n: '6', title: 'Document it', body: 'Add a short SECURITY.md describing what you scan for, your custom rule, and the CI gate. A clear write-up turns a scan into a portfolio story recruiters can understand at a glance.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — Semgrep Community Edition is open source (LGPL 2.1); community rules and CI usage cost ₹0</span></div>
        </div>
        <ProTip>
        The skill that sets Semgrep users apart is writing custom rules. Anyone can run a scanner with default rules — but writing a rule that encodes your team's specific hard-won lesson ("we got burned by this exact pattern once, never again") is real security engineering. Start tiny: pick one bad pattern from your own code, write a pattern that matches it, and watch Semgrep find every instance across the repo in milliseconds. Because rules look like the code they catch, you can go from idea to working rule in minutes. Being able to demo a custom SAST rule you wrote — and explain the vulnerability it prevents — is worth more in an interview than reciting the OWASP Top 10.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/security/wiz', label: 'Wiz' }}
        next={{ path: '/ai-lab/security/trivy', label: 'Trivy' }}
      />
    </ToolPageShell>
  )
}
