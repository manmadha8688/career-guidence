import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#06B6D4'

export default function WizPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Security & Code Review">
      <ToolHeader
        icon="🌀"
        title="Wiz — Cloud Security for the Modern Enterprise"
        tagline="Agentless cloud security — find risks across AWS, Azure, GCP in minutes"
        badges={[['Free Trial', '#4ADE80'], ['wiz.io', color], ['Enterprise', 'var(--text-muted)']]}
        overview={"Wiz is the cloud-native application protection platform (CNAPP) that reshaped enterprise cloud security. Founded in 2020, it reached $100 million ARR faster than any enterprise software company in history — and became the fastest company to reach $1 billion ARR. Wiz secures 40% of Fortune 100 companies including BMW, DocuSign, Salesforce, and Morgan Stanley. Its key innovation is agentless scanning: instead of installing agents on every cloud resource, Wiz connects directly to the cloud control plane via API and scans cloud environments in hours, not months. Google's $32 billion acquisition of Wiz closed in 2026, making it the largest cybersecurity acquisition in history — while Wiz continues as a multi-cloud platform. As a student, Wiz is the most important cloud security platform to understand for enterprise security roles."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Wiz Cloud Security Tutorial for Beginners 2025', url: 'https://www.youtube.com/watch?v=47piBKwsFiY', dur: '~20 min', note: 'Best beginner tutorial — Security Graph, risk prioritization, and dashboard tour' },
            { label: 'Wiz Cloud Security Platform — Technical Walkthrough Nov 2025', url: 'https://www.youtube.com/watch?v=e2UuCbcLTIo', dur: '~25 min', note: 'Key capabilities deep dive — CSPM, CWPP, and attack path analysis' },
            { label: 'Wiz Cloud Security Tutorial — Beginner Guide and Demo', url: 'https://www.youtube.com/watch?v=KBG843lP0EM', dur: '~20 min', note: 'Step-by-step demo — connecting cloud accounts and reading findings' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How Wiz works — the agentless difference" color={color} />
          <InfoBox color={color}>Traditional cloud security tools require installing agents on every virtual machine, container, and cloud resource. For large organizations with thousands of resources, agent deployment takes months and creates operational overhead. Wiz bypasses this entirely: it connects via API to your cloud control plane (AWS, Azure, GCP), reads configurations and metadata directly, and delivers a full security picture within 24 hours. No agents. No performance impact. No deployment projects.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>Wiz's core technology is the Security Graph — a graph database that models every relationship between cloud resources: which EC2 instance has which IAM role, which S3 bucket is publicly accessible and contains which sensitive data, which Kubernetes pod has elevated privileges and can reach the internet. The graph correlates across dimensions that point tools miss: a vulnerability in an application is not critical on its own, but when that application runs on an internet-facing instance with an IAM role that has admin access to your entire AWS account, it becomes a critical attack path. Wiz surfaces these toxic combinations and ranks them by real risk, not raw vulnerability count. In 2025, Wiz expanded with three modules: Wiz Code (CI/CD pipeline scanning), Wiz Cloud (the core agentless CNAPP), and Wiz Defend (eBPF-based runtime protection).</p>
        </Block>
        <Block>
          <SubHead label="Wiz platform modules" color={color} />
          <Compare color={color} items={[
            { label: 'Wiz Code', badge: 'Shift-left security', body: 'Scans code, IaC, and container images in CI/CD pipelines. Integrates with GitHub, GitLab, Jenkins. Generates one-click fix PRs for findings. Connects pre-production findings to their cloud context — so you know which IaC misconfiguration will create a real risk when deployed. Catches problems before they reach the cloud.' },
            { label: 'Wiz Cloud', badge: 'Core CNAPP', body: 'The flagship product: agentless CSPM (cloud security posture management), CWPP (cloud workload protection), CIEM (cloud identity and entitlement management), and DSPM (data security posture management). Connects to AWS, Azure, GCP, OCI, Alibaba Cloud, Kubernetes, and VMware. Full risk profile within 24 hours of connecting.' },
            { label: 'Wiz Defend', badge: 'Runtime protection', body: 'Real-time threat detection and response using eBPF technology — a lightweight kernel-level instrumentation that requires no agent installation. Detects active attacks, lateral movement, cryptomining, and container escapes in running workloads. The runtime layer completes the full code-to-cloud-to-runtime security chain.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Core capabilities" color={color} />
          <CardGrid color={color} items={[
            { name: 'Security Graph', desc: 'Graph database modeling every cloud resource relationship. Finds attack paths — sequences of connected vulnerabilities that combine to create a critical risk. Prioritizes the 1% of findings that actually matter for remediation.' },
            { name: 'CSPM — Misconfigurations', desc: 'Detects cloud misconfigurations against CIS Benchmarks, AWS Well-Architected Framework, NIST, PCI-DSS, SOC2, and ISO27001. Open S3 buckets, overly permissive security groups, unencrypted storage, disabled logging.' },
            { name: 'CIEM — Identity risks', desc: 'Analyzes IAM permissions across AWS, Azure, and GCP. Finds overly permissive roles, unused credentials, privilege escalation paths, and shadow admin accounts. Identity misconfigurations are the #1 cause of cloud breaches.' },
            { name: 'DSPM — Data discovery', desc: 'Discovers sensitive data (PII, financial records, health data, secrets) across cloud storage — S3, Azure Blob, GCS, databases, data warehouses. Maps what sensitive data exists and whether it is protected or exposed.' },
            { name: 'Vulnerability prioritization', desc: 'Wiz ingests CVEs from cloud workloads and correlates them with cloud context. A critical CVE on an isolated internal instance with no attack path is low priority. The same CVE on an internet-facing instance with admin IAM is the #1 issue to fix.' },
            { name: '24-hour deployment', desc: 'Connect your cloud accounts (read-only API access) and get a full risk profile within 24 hours. No agents. No configuration. No performance impact on workloads. This speed is why enterprise security teams choose Wiz.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Wiz vs traditional cloud security tools" color={color} />
          <Compare color={color} items={[
            { label: 'Wiz (agentless CNAPP)', badge: 'Modern approach', body: 'No agents, API-based connection, full cloud context in 24 hours. Correlates misconfigurations + vulnerabilities + identity + data into connected attack paths. Understands cloud-native resources natively (serverless, containers, Kubernetes). Single platform replacing 5+ point tools. Expensive enterprise pricing.' },
            { label: 'Traditional CSPM tools (Prisma, Dome9)', badge: 'Configuration-focused', body: 'Solid at detecting misconfigurations and compliance violations. Struggle with correlating findings across resource types into real risk. Often require agents for workload scanning. Can produce thousands of alerts without prioritization. Many are being displaced by CNAPPs like Wiz.' },
            { label: 'Cloud provider native tools (AWS Security Hub, Azure Defender)', badge: 'Single-cloud', body: 'Free and deeply integrated into their respective clouds. AWS Security Hub aggregates findings from Guard Duty, Inspector, and Macie. Excellent for single-cloud organizations. No cross-cloud visibility. Less sophisticated risk correlation than dedicated CNAPPs. Good starting point for learning cloud security.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Why Wiz matters for your career" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Cloud security is the fastest-growing security domain', body: 'Enterprise attack surfaces have moved to the cloud. Security engineering roles at tech companies almost always involve cloud security. Wiz is the dominant platform in this space — knowing how it works makes you relevant in every cloud security discussion.' },
            { n: '2', title: 'The CNAPP category is how enterprises buy security', body: 'The consolidation from point tools (CSPM + CWPP + CIEM + DSPM + vulnerability management) to single CNAPP platforms is happening now. Wiz led this consolidation. Understanding why it won helps you understand modern enterprise security architecture.' },
            { n: '3', title: 'Security Graph thinking applies everywhere', body: 'The principle of correlating findings across multiple dimensions to find real attack paths — not just raw vulnerability counts — is how senior security engineers think. The Security Graph model shifts thinking from "how many vulnerabilities do we have" to "what can an attacker actually reach."' },
            { n: '4', title: 'Hands-on via the free trial and AWS Free Tier', body: 'Connect a free AWS account (nothing real) to Wiz\'s free trial. Spin up a few EC2 instances with intentional misconfigurations. See what Wiz finds. This is the hands-on experience that makes the platform real rather than theoretical.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Request a free Wiz trial and connect a test AWS account to see agentless scanning in action',
            'Use AWS Free Tier to create intentionally misconfigured resources and see how Wiz surfaces the risks',
            'Study the Wiz Security Graph model to understand how cloud attack paths are constructed',
            'Learn CNAPP as a category — it will come up in every enterprise cloud security interview',
            'Understand the difference between CSPM, CWPP, CIEM, and DSPM as distinct cloud security problems',
            'Explore AWS Security Hub (free with AWS account) as an accessible introduction to cloud security posture',
        ]} />
      </Block>
        <ProjectTask
        title={"Simulate a Cloud Security Assessment"}
        description={"Create an intentionally insecure AWS environment, scan it with AWS Security Hub (free), and manually trace the attack paths that Wiz would identify. This simulates the cloud security assessment process used by professional security engineers, using only free tools. Document your findings in a risk report — this is a strong portfolio piece for cloud security roles."}
        costNote={"TOTAL COST: AWS Free Tier resources + AWS Security Hub free for first 30 days in new accounts"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Enable AWS Security Hub', body: 'Create a free AWS account. Go to Security Hub → Enable. It automatically activates GuardDuty, Inspector, and Macie integrations. This is AWS\'s free equivalent to some Wiz CSPM functionality.' },
            { n: '2', title: 'Create intentional misconfigurations', body: 'Create an S3 bucket with public access enabled. Create an EC2 instance with overly permissive security group (0.0.0.0/0 on all ports). Create an IAM user with AdministratorAccess. These are the classic misconfigurations Wiz finds.' },
            { n: '3', title: 'Review Security Hub findings', body: 'Within 30 minutes, Security Hub will flag your misconfigurations. Read each finding: what is the resource, what is the risk, what is the severity. This is what Wiz shows at enterprise scale.' },
            { n: '4', title: 'Map the attack path manually', body: 'Think like Wiz: your S3 bucket + public access + no bucket policy + sensitive data = data exposure. Your EC2 + all-ports-open + admin IAM role = full account takeover if the instance is compromised. Document these combinations in a risk report.' },
          ]} />
      </ProjectTask>
        <ProTip>
        The cloud security market in 2025 is hiring heavily — it is one of the few areas in tech where demand significantly exceeds supply of qualified candidates. If you are interested in security as a career path, cloud security offers the highest compensation and fastest growth. The path is: get an AWS account, learn IAM and networking fundamentals, get AWS Solutions Architect Associate certification, then layer in security tools like Wiz and AWS Security Hub. A student who can talk intelligently about attack path analysis, CSPM, and CNAPP in an interview is immediately differentiated from the 90% of candidates who only know perimeter security.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/security/gitguardian', label: 'GitGuardian' }}
        next={{ path: '/ai-lab', label: 'AI Lab' }}
      />
    </ToolPageShell>
  )
}
