import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#1904DA'

export default function TrivyPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Security & Code Review">
      <ToolHeader
        icon="📦"
        title="Trivy — All-in-One Open-Source Security Scanner"
        tagline="Scan containers, filesystems, IaC, and dependencies for vulnerabilities"
        badges={[['✓ FREE (OSS)', '#4ADE80'], ['trivy.dev', color], ['Open Source · Apache-2.0', 'var(--text-muted)']]}
        overview={"Trivy is the most popular open-source security scanner of its kind — a single, fast Go binary from Aqua Security that finds known vulnerabilities (CVEs), misconfigurations, exposed secrets, and license issues across an unusually wide range of targets. Where many tools scan just one thing, Trivy scans them all: container images, your local filesystem and project lock files, Git repositories, virtual machine images, Kubernetes clusters, and infrastructure-as-code (Terraform, Kubernetes YAML, Dockerfiles, Helm, CloudFormation). It installs in seconds, has no paywalled features in the scanner itself (Apache-2.0 licensed, 36,000+ GitHub stars), and needs no account. Trivy has become the default vulnerability scanner in modern DevSecOps pipelines precisely because one command covers your whole software supply chain — from the dependencies in your requirements.txt to the base image in your Dockerfile to the IAM policy in your Terraform. Aqua sells enterprise products around it, but the Trivy scanner is fully free and open source."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Trivy tutorial — scan container images for vulnerabilities', url: 'https://www.youtube.com/results?search_query=trivy+tutorial', dur: 'Search', note: 'Install Trivy and run your first image scan' },
            { label: 'Trivy filesystem & IaC scanning explained', url: 'https://www.youtube.com/results?search_query=trivy+filesystem+iac+scan', dur: 'Search', note: 'Scan projects, dependencies, and Terraform/Kubernetes config' },
            { label: 'Trivy in CI/CD and Kubernetes — DevSecOps demo', url: 'https://www.youtube.com/results?search_query=trivy+ci+cd+kubernetes+tutorial', dur: 'Search', note: 'Add Trivy to pipelines and scan a live cluster' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="One binary, many targets — the whole supply chain" color={color} />
          <InfoBox color={color}>{"Trivy separates two ideas: targets (where it looks) and scanners (what it looks for). Targets include container images, filesystems/projects, Git repos, VM images, and Kubernetes clusters. Scanners include known vulnerabilities (CVEs) in OS packages and app dependencies, IaC misconfigurations, hardcoded secrets, and software licenses. You mix and match: 'scan this project for vulnerabilities, secrets, and misconfigs' is one command. That breadth from a single tool is why Trivy is a DevSecOps default."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>A modern app is a stack of other people's code: your dependencies, the OS packages inside your container's base image, and the cloud config that deploys it. A single unpatched dependency in a container image is one of the most common ways attackers get an initial foothold. Trivy scans every layer of that stack with one tool — reading lock files like package-lock.json, requirements.txt, go.sum, and pom.xml; inspecting Docker/OCI images for OS-level CVEs; and checking Terraform and Kubernetes manifests for insecure settings before they ship.</p>
          {[
            'Vulnerabilities (CVEs) — finds known issues in OS packages and application dependencies, including transitive ones you never imported directly',
            'Misconfigurations (IaC) — scans Terraform, Kubernetes YAML, Dockerfiles, Helm, and CloudFormation for insecure defaults',
            'Secrets — detects hardcoded API keys, tokens, and passwords accidentally committed to code or baked into images',
            'SBOM & licenses — generates a Software Bill of Materials and flags risky software licenses across your dependencies',
            'Many targets — container images, filesystems/projects, remote Git repos, VM images, and live Kubernetes clusters',
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
            { name: 'Container image scanning', desc: 'trivy image node:18 pulls and scans any Docker/OCI image for OS-package CVEs and vulnerable app dependencies. The classic use case — catch hundreds of vulnerabilities in a base image before you deploy it.' },
            { name: 'Filesystem & project scan', desc: 'trivy fs . scans your local project: reads lock files (package-lock.json, requirements.txt, go.sum, pom.xml) and reports vulnerable dependencies, plus optional secret and misconfig scanning.' },
            { name: 'IaC / misconfiguration scan', desc: 'trivy config . checks Terraform, Kubernetes manifests, Dockerfiles, and Helm charts against hundreds of built-in policies — open ports, missing encryption, over-permissive access, running as root.' },
            { name: 'Secret detection', desc: 'Finds hardcoded credentials — AWS keys, tokens, private keys — in your code and container layers. Enabled by default in filesystem and image scans so leaked secrets surface immediately.' },
            { name: 'SBOM generation', desc: 'Produce a Software Bill of Materials in CycloneDX or SPDX format (trivy image --format cyclonedx). Increasingly required for compliance and supply-chain transparency — a valuable thing to know.' },
            { name: 'CI/CD & Kubernetes', desc: 'A single binary drops into any pipeline (GitHub Actions, GitLab CI) and can fail builds on high-severity findings. The Trivy Operator continuously scans a running Kubernetes cluster for new vulnerabilities.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — scan your first image and project" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Install Trivy', body: 'macOS: brew install trivy. Linux: curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sudo sh -s -- -b /usr/local/bin. Or run with zero install via Docker: docker run aquasec/trivy. Verify: trivy --version' },
            { n: '2', title: 'Scan a container image', body: 'Point Trivy at any public image: trivy image python:3.9. It downloads the vulnerability database (first run only), scans every layer, and lists CVEs grouped by severity — often revealing that an old base image carries hundreds of known issues.' },
            { n: '3', title: 'Scan your project filesystem', body: 'cd into a project and run: trivy fs . — Trivy reads your lock files, finds vulnerable dependencies (direct and transitive), and scans for hardcoded secrets. Add scanners explicitly: trivy fs --scanners vuln,secret,misconfig .' },
            { n: '4', title: 'Scan infrastructure-as-code', body: 'For a Terraform or Kubernetes folder: trivy config . — Trivy checks your manifests against built-in security policies and reports misconfigurations like unencrypted storage, exposed ports, or containers running as root.' },
            { n: '5', title: 'Focus on what matters', body: 'Cut the noise: trivy image --severity HIGH,CRITICAL --ignore-unfixed node:18 shows only serious issues that actually have a fix available. This is how you triage a long report into an actionable to-do list.' },
            { n: '6', title: 'Fix and re-scan', body: 'Upgrade a vulnerable dependency or switch to a slimmer base image (e.g. node:18 → node:18-alpine), then re-run the scan and watch the CVE count drop. That before/after delta is the whole point.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Trivy vs Snyk vs Semgrep" color={color} />
          <Compare color={color} items={[
            { label: 'Trivy', badge: 'Best supply-chain scanner', body: 'Open-source, no paywalled scanner features, and unmatched breadth of targets — containers, filesystems, IaC, VM images, Kubernetes. Best when you want one free tool to cover dependencies, images, and infrastructure config across your whole pipeline.' },
            { label: 'Snyk', badge: 'Best developer UX + auto-fix', body: 'Commercial platform (with a free tier) covering SCA, containers, IaC, and SAST with one-click fix PRs and polished IDE integration. Best when you want auto-remediation and a managed dashboard rather than a pure CLI.' },
            { label: 'Semgrep', badge: 'Best for your own code (SAST)', body: 'Focuses on static analysis of your source code with easy custom rules. Trivy does not do deep SAST on your code logic; Semgrep does not scan container images. They are complementary, not competing.' },
            { label: 'The combined setup', badge: 'Use them together', body: 'A complete free-tier DevSecOps stack: Semgrep for your source code (SAST), Trivy for dependencies + images + IaC (supply chain), and GitHub secret scanning on top. Being able to place each tool correctly is exactly the systems-level thinking interviewers look for.' },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Secure a Dockerised App End-to-End</span></div>
          <p className="tool-layout-task__desc">Take a small containerised app (your own, or a simple Node/Python project you Dockerise), then use Trivy to scan the image, the dependencies, and the IaC — fix the worst findings, and add Trivy to a CI pipeline that blocks vulnerable images from being built. Demonstrating a measurable before/after drop in vulnerabilities and a working CI gate is a standout supply-chain-security artifact for a fresher.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Install Trivy and pick a target', body: 'Install via brew/script/Docker. Take a project with a Dockerfile (or add one to a small app). Build the image: docker build -t myapp . so you have something concrete to scan.' },
            { n: '2', title: 'Baseline scan everything', body: 'Run three scans and record the counts: trivy image myapp (image CVEs), trivy fs . (dependencies + secrets), trivy config . (Dockerfile/IaC misconfigs). This is your starting vulnerability baseline.' },
            { n: '3', title: 'Slim the base image', body: 'Switch to a minimal base (e.g. python:3.9-slim or node:18-alpine), rebuild, and re-scan. Watch the OS-level CVE count fall dramatically — the single highest-impact fix in container security.' },
            { n: '4', title: 'Fix dependencies and secrets', body: 'Upgrade the vulnerable dependencies Trivy flagged and remove any hardcoded secret it found (move it to an environment variable). Re-run trivy fs . to confirm the findings are gone.' },
            { n: '5', title: 'Add a CI gate', body: 'Create .github/workflows/trivy.yml that runs trivy image with --exit-code 1 --severity HIGH,CRITICAL on every push. Now a build fails if a serious, fixable vulnerability is present.' },
            { n: '6', title: 'Generate an SBOM and document', body: 'Produce an SBOM: trivy image --format cyclonedx -o sbom.json myapp. Write a short report with your before/after vulnerability counts and the CI gate — a clear, quantified security story.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — Trivy is Apache-2.0 open source; the scanner has no paid features, so this costs ₹0</span></div>
        </div>
        <ProTip>
        The fastest security win you will ever ship is switching to a smaller base image and re-scanning with Trivy. Run trivy image on a full base like node:18 or python:3.9, note the CVE count, then rebuild on the -alpine or -slim variant and scan again — the number of vulnerabilities often drops by hundreds, because you removed all the OS packages your app never used. A smaller image means a smaller attack surface, faster pulls, and fewer things to patch. Make trivy image a habit before every deploy, and always pair --severity HIGH,CRITICAL with --ignore-unfixed so you focus only on serious issues you can actually fix today.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/security/semgrep', label: 'Semgrep' }}
        next={{ path: '/ai-lab', label: 'AI Lab' }}
      />
    </ToolPageShell>
  )
}
