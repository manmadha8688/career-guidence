import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F59E0B'

export default function GitGuardianPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Security & Code Review">
      <ToolHeader
        icon="🔑"
        title="GitGuardian — Detect Secrets in Your Code Before They Leak"
        tagline="Real-time detection of API keys, passwords, and credentials in your repos"
        badges={[['✓ FREE Individual', '#4ADE80'], ['gitguardian.com', color], ['Secret Detection', 'var(--text-muted)']]}
        overview={"GitGuardian is the leading specialized secret detection platform — built exclusively to find and prevent the exposure of API keys, passwords, tokens, private keys, and credentials in source code. While Snyk and GHAS include secret scanning as one feature among many, GitGuardian's entire product is built around this single problem. It covers over 550 secret types with pattern matching and validation checks, scans every commit including historical ones, and extends beyond git to Slack, Jira, and Confluence where developers paste secrets carelessly. The free plan covers individual developers and teams up to 25 people with full enterprise-grade scanning — the same engine, no feature restrictions."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Quick Start Guide for ggshield — the GitGuardian CLI', url: 'https://www.youtube.com/watch?v=4vaSM23-DLs', dur: '~12 min', note: 'Official GitGuardian tutorial — install ggshield and run your first scan' },
            { label: 'A Deep Dive Into ggshield — GitGuardian CLI', url: 'https://www.youtube.com/watch?v=7c45JtbZgXs', dur: '~20 min', note: 'Advanced ggshield features — pre-commit hooks, CI/CD, config' },
            { label: 'GitGuardian Remediation Guide — From Alert to Resolution', url: 'https://www.youtube.com/watch?v=dOGG9SpFCJg', dur: '~15 min', note: 'What to do when GitGuardian finds a secret — rotate, revoke, remediate' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why leaked secrets are a critical problem" color={color} />
          <InfoBox color={color}>In 2024, GitGuardian's State of Secrets Sprawl report found over 12.8 million secrets leaked on public GitHub alone — a 28% increase year over year. The average time for an attacker to start exploiting a leaked AWS key is 5 minutes. The most commonly leaked secrets are Google API keys, AWS credentials, GitHub tokens, and database connection strings with embedded passwords.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>Secrets end up in code in predictable ways: a developer hardcodes an API key to "test quickly" and forgets to remove it before committing. A .env file gets accidentally committed because .gitignore was not set up. A credential is pasted into a Jupyter notebook that gets pushed. A configuration file with a database password gets added in a commit titled "fix config." Git history is permanent — even if you delete the file in a later commit, the credential exists in every clone of the repo made before that deletion. GitGuardian scans the full git history, not just the latest code, which is why it catches secrets that were "already removed."</p>
        </Block>
        <Block>
          <SubHead label="Free vs paid — honest breakdown" color={color} />
          <Compare color={color} items={[
            { label: 'Free — up to 25 developers', badge: 'Full scanning power', body: 'GitGuardian does not restrict scanning capabilities for free users. You get the same 550+ secret type detection, historical commit scanning, ggshield CLI, pre-commit hooks, CI/CD integration, and GitHub/GitLab webhooks. The free tier is not a trial — it is the full product for teams under 25 people.' },
            { label: 'Team/Business plan', badge: 'Larger organizations', body: 'Adds centralized dashboards, incident management workflows, SLA tracking, assignment to developers, policy controls, priority support, and SAML SSO. Relevant when you are managing secrets detection across an organization, not just your own repos.' },
            { label: 'Non-Human Identity (NHI) Governance', badge: 'Enterprise add-on', body: 'Tracks machine credentials — service accounts, CI/CD tokens, cloud IAM keys — across the entire organization. Maps which systems use which secrets and alerts when credentials are rotated or expire. A newer capability for mature security programs.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Core capabilities" color={color} />
          <CardGrid color={color} items={[
            { name: '550+ secret types', desc: 'Detects AWS keys, GCP credentials, Azure tokens, GitHub PATs, Stripe keys, OpenAI API keys, database connection strings, private keys (RSA, EC, PKCS#8), SSH keys, Slack tokens, Twilio, SendGrid, and 500+ more.' },
            { name: 'ggshield CLI', desc: 'Command-line tool that scans commits, files, and directories locally. Install as a pre-commit hook so every git commit is scanned before it reaches the remote. Catches secrets before they ever leave your machine.' },
            { name: 'Pre-commit hooks', desc: 'pip install ggshield && ggshield install -m global. Installs a hook that runs on every commit in every repo on your machine. If a secret pattern is detected, the commit is blocked with an explanation.' },
            { name: 'CI/CD integration', desc: 'ggshield secret scan ci works in GitHub Actions, GitLab CI, Jenkins, CircleCI, and more. Scans every push and PR. Fails the pipeline if new secrets are detected. Takes 30 seconds to add to any pipeline.' },
            { name: 'Historical scan', desc: 'ggshield secret scan repo scans the full git history of a repository. Finds secrets committed weeks or years ago that are still in the history even if the file was "deleted." Essential for any repo that has existed for more than a month.' },
            { name: 'Honeytokens', desc: 'GitGuardian can generate fake credentials (honeytokens) you deliberately place in bait files. If an attacker finds and uses them, you get an immediate alert with their IP address — an intrusion detection mechanism.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Set up GitGuardian on your machine — 10 minutes" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Create a free account', body: 'Sign up at gitguardian.com with GitHub. Free for individual use. No credit card. Connect your GitHub account to enable repo monitoring.' },
            { n: '2', title: 'Install ggshield CLI', body: 'pip install ggshield\nggshield auth login\n\nThis opens a browser for authentication. Once linked, ggshield can scan any local directory.' },
            { n: '3', title: 'Install global pre-commit hook', body: 'ggshield install -m global\n\nNow every git commit on your machine runs a secret scan. If a secret is found, git commit is blocked with a clear message showing what was detected and on which line.' },
            { n: '4', title: 'Scan your existing repos', body: 'cd your-existing-project\nggshield secret scan repo .\n\nThis scans the full git history. Review every finding — some may be false positives (test tokens, example keys). Real secrets should be rotated immediately.' },
            { n: '5', title: 'Add to GitHub Actions', body: 'Add to .github/workflows/gitguardian.yml:\n\nname: GitGuardian\non: [push, pull_request]\njobs:\n  scanning:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n        with:\n          fetch-depth: 0\n      - uses: GitGuardian/ggshield-action@v1\n        env:\n          GITGUARDIAN_API_KEY: ${{ secrets.GITGUARDIAN_API_KEY }}' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Scan any git repository for secrets — including full commit history — with the free ggshield CLI',
            'Install a global pre-commit hook that blocks every git commit containing a credential pattern',
            'Monitor all your GitHub repos from the GitGuardian dashboard with real-time webhook scanning',
            'Add ggshield to GitHub Actions to auto-fail any PR that introduces a new secret',
            'Scan Jupyter notebooks, configuration files, and IaC templates for hardcoded credentials',
            'Generate honeytokens to detect attackers who gain read access to your repositories',
        ]} />
      </Block>
        <ProjectTask
        title={"Audit Every Repo You Own for Historical Secrets"}
        description={"Most developers who have been coding for more than 6 months have accidentally committed a secret at some point. Run a full historical scan across all your repos. You will likely find something. The goal is to find it, rotate it, and put prevention in place. This is a real security audit of your own digital footprint."}
        costNote={"TOTAL COST: ₹0 — GitGuardian free for individual developers, no credit card"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Sign up and connect GitHub', body: 'gitguardian.com → Connect your GitHub account. The dashboard immediately starts monitoring all your repos for new commits.' },
            { n: '2', title: 'Run ggshield on every local repo', body: 'For each project directory: ggshield secret scan repo . > findings.txt. Review the output. Look for anything that is a real credential vs. a test placeholder.' },
            { n: '3', title: 'Rotate any real secrets found', body: 'For every real credential found: immediately go to the provider (AWS console, OpenAI dashboard, GitHub settings) and revoke/rotate the key. Update your .env files. The old key is dead.' },
            { n: '4', title: 'Install global pre-commit hook', body: 'ggshield install -m global — this prevents it from ever happening again on your machine.' },
          ]} />
      </ProjectTask>
        <ProTip>
        The most dangerous misconception about secrets in git is "it was only in the repo for a few minutes before I deleted it." Automated bots scan GitHub continuously and are fast enough to detect and test new credentials within seconds of a push. If your secret touched a public repo even briefly, assume it is compromised. This is not hypothetical — there are documented cases of AWS bills reaching thousands of dollars within hours of an accidental push. Always rotate immediately, then clean up history with git filter-branch or BFG Repo Cleaner.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/security/github-adv-sec', label: 'GitHub Adv Sec' }}
        next={{ path: '/ai-lab/security/wiz', label: 'Wiz' }}
      />
    </ToolPageShell>
  )
}
