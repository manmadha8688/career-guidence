import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#CB1F36'

export default function SonarQubePage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Security & Code Review">
      <ToolHeader
        icon="🔍"
        title="SonarQube — Code Quality and Security Analysis"
        tagline="Static analysis for 25+ languages — find bugs, vulnerabilities, code smells"
        badges={[['✓ FREE Community', '#4ADE80'], ['sonarqube.com', color], ['25+ Languages', 'var(--text-muted)']]}
        overview={"SonarQube is the industry standard for continuous code quality and security inspection. Used by over 400,000 organizations worldwide, it analyzes code for bugs, vulnerabilities, and code smells — problems that make code hard to maintain or extend — across 40+ programming languages. Unlike Snyk which focuses on dependency vulnerabilities, SonarQube does deep static analysis of your actual source code: does this logic have a null pointer dereference? Is this SQL query injectable? Is this function so complex that no one can maintain it? SonarQube Community Edition is completely free and self-hosted via Docker, making it accessible for any student or developer. SonarQube adopted calendar versioning in 2025, with major releases shipping quarterly."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'SonarQube Tutorial: Everything You Need to Know for Beginners', url: 'https://www.youtube.com/watch?v=GRVA4AiO7OM', dur: '~25 min', note: 'Best beginner guide — setup, first scan, understanding results' },
            { label: '2025 SonarQube Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=7-P81EKq-r8', dur: '~30 min', note: 'Updated 2025 guide — Docker setup, project analysis, quality gates' },
            { label: 'How to Setup SonarQube From Scratch and Code Analysis 2024', url: 'https://www.youtube.com/watch?v=6vdRvz_LnbQ', dur: '~25 min', note: 'Complete setup walkthrough with CI/CD integration and report reading' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What SonarQube actually analyzes" color={color} />
          <InfoBox color={color}>SonarQube introduces the concept of "Clean Code" — code that is not just functional but readable, maintainable, and secure. It tracks four issue types: bugs (runtime failures), vulnerabilities (security weaknesses), code smells (maintainability problems), and security hotspots (code needing human review). The combination of these gives a holistic quality picture, not just a security scan.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>SonarQube's static analysis goes beyond pattern matching. It performs data-flow analysis, tracking how data moves through your code to find SQL injection, XSS, and path traversal vulnerabilities that simple pattern matchers miss. The security model maps to OWASP Top 10, CWE Top 25, and SANS Top 25 — the frameworks you will encounter in every professional security discussion. The Community Edition covers the core Java, JavaScript, TypeScript, Python, PHP, C#, C, C++, Go, and Ruby analysis. The commercial editions add branch analysis and AI CodeFix suggestions. SonarQube Server adopted calendar versioning in 2025 — the current LTA (Long-Term Active) release is 2026.1.</p>
        </Block>
        <Block>
          <SubHead label="Community vs Developer vs Enterprise" color={color} />
          <Compare color={color} items={[
            { label: 'Community Edition — Free', badge: 'Self-hosted Docker', body: 'Full static analysis for core languages, OWASP/CWE security mapping, quality gates, dashboards, and CI/CD integration. No branch analysis — scans main branch only. Sufficient for learning, personal projects, and portfolio work. Run with: docker run -d --name sonarqube -p 9000:9000 sonarqube:community' },
            { label: 'Developer Edition — $150/year+', badge: 'Branch & PR analysis', body: 'Adds branch analysis (scan every feature branch and PR), taint analysis for deeper security tracking, and additional language support. This is what professional dev teams run. If your company provides it, you will use this.' },
            { label: 'Enterprise / Data Center', badge: 'Large organizations', body: 'Security reports, portfolio-level views, project aggregations, and high-availability deployment. For companies running hundreds of repos. Irrelevant for individual use — but useful to know the tier exists for interviews.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Core capabilities" color={color} />
          <CardGrid color={color} items={[
            { name: 'Bug detection', desc: 'Finds logical errors, null pointer dereferences, unreachable code, incorrect API usage, and resource leaks. These are runtime failures waiting to happen — catching them in static analysis saves hours of debugging.' },
            { name: 'Vulnerability detection', desc: 'OWASP Top 10 coverage: injection, broken authentication, sensitive data exposure, XXE, broken access control, security misconfiguration, XSS, insecure deserialization, and more.' },
            { name: 'Code smells', desc: 'Complexity metrics, duplicated code, dead code, methods that are too long, classes that do too much. These are not immediately harmful but make code unmaintainable over time.' },
            { name: 'Security hotspots', desc: 'Code that is not necessarily vulnerable but needs a human security review — cryptographic functions, authentication code, authorization checks. Requires manual review to clear.' },
            { name: 'Quality gates', desc: 'Pass/fail thresholds you define: no new blocker bugs, coverage above 80%, no new critical vulnerabilities. CI/CD breaks the build if quality gate fails. This is the standard enterprise workflow.' },
            { name: 'Technical debt tracking', desc: 'SonarQube estimates how long it would take to fix every issue it finds. The "technical debt ratio" shows what percentage of development time is being spent managing past shortcuts.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Set up SonarQube locally with Docker" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Start SonarQube with Docker', body: 'docker run -d --name sonarqube -p 9000:9000 sonarqube:community\n\nWait ~60 seconds, then open http://localhost:9000. Default login: admin/admin. You will be prompted to change the password.' },
            { n: '2', title: 'Create a project', body: 'Click "Create Project" → "Manually". Give it a name and key. Under "How do you want to analyze your repository?" select "Locally". Generate a project token — save it.' },
            { n: '3', title: 'Install SonarScanner', body: 'Download SonarScanner CLI from sonarsource.com/products/sonarscanner. Add it to your PATH. Or use the Maven/Gradle plugin if it is a Java project.' },
            { n: '4', title: 'Run the analysis', body: 'In your project root:\nsonar-scanner -Dsonar.projectKey=my-project -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=YOUR_TOKEN' },
            { n: '5', title: 'Read the dashboard', body: 'Return to localhost:9000. You will see: reliability (bugs), security (vulnerabilities), maintainability (code smells), and coverage. Click any metric to drill into specific file and line findings.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Run SonarQube Community Edition locally via Docker — completely free with no account needed',
            'Scan projects in Java, JavaScript, TypeScript, Python, PHP, C#, Go, Ruby, and more',
            'Find security vulnerabilities mapped to OWASP Top 10 and CWE Top 25 in your own code',
            'Set quality gates in CI/CD that fail the build when new bugs or vulnerabilities are introduced',
            'Track technical debt over time and see if your codebase is getting better or worse each sprint',
            'Use SonarLint IDE plugin (free, VS Code + JetBrains) for real-time in-editor feedback without a server',
        ]} />
      </Block>
        <ProjectTask
        title={"Audit Your Codebase and Track Quality Over Time"}
        description={"Set up SonarQube locally, run it against a real project (even a course assignment), and generate a quality report. Fix at least 3 issues it finds. Then set up SonarLint in VS Code so you get real-time feedback on every file you open. Document your before/after metrics. This makes an excellent portfolio case study — most junior developers have never run static analysis on their own code."}
        costNote={"TOTAL COST: ₹0 — SonarQube Community Edition is fully free and open source"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Spin up SonarQube via Docker', body: 'docker run -d --name sonarqube -p 9000:9000 sonarqube:community && open http://localhost:9000' },
            { n: '2', title: 'Scan your chosen project', body: 'Use SonarScanner CLI or the Maven/Gradle/npm plugin. Take a screenshot of the initial dashboard — this is your before state.' },
            { n: '3', title: 'Fix the top 3 highest-severity findings', body: 'Click into each finding, read the explanation, understand WHY it is a problem, then fix it. Re-run the analysis to confirm the issues are resolved.' },
            { n: '4', title: 'Install SonarLint in VS Code', body: 'Extensions → search "SonarLint". Connect it to your local SonarQube server for synchronized rules. Now every file you open shows quality feedback inline.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Install SonarLint (the IDE plugin, free forever) even if you never set up the server. It gives you real-time SonarQube analysis in VS Code or IntelliJ with no server required — just the plugin. The connected mode (linking to a SonarQube or SonarCloud server) synchronizes rules, but standalone mode is already extremely valuable for catching bugs and code smells while you write. Most working developers have it installed and forget it is there — it just highlights issues as you code.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/security/snyk', label: 'Snyk' }}
        next={{ path: '/ai-lab/security/github-adv-sec', label: 'GitHub Adv Sec' }}
      />
    </ToolPageShell>
  )
}
