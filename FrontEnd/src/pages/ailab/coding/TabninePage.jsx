import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#6366F1'

export default function TabninePage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Coding">
      <ToolHeader
        icon="💎"
        title="Tabnine — Privacy-First AI Code Completion"
        tagline="The AI coding assistant that can run entirely on your machine — zero data exposure"
        badges={[['✓ FREE TIER', '#4ADE80'], ['tabnine.com', color], ['Privacy-First', 'var(--text-muted)']]}
        overview={"Tabnine is one of the oldest and most battle-tested AI code completion tools — launched in 2018, long before GitHub Copilot existed. What sets it apart today is not speed or model quality (Copilot and Codeium often match or exceed it there), but its unmatched commitment to privacy. Tabnine can run entirely on your local machine with no code ever leaving your system. It can also be deployed on a private VPC, on-premise server, or in a fully air-gapped environment — making it the go-to choice for enterprise teams in banking, healthcare, defense, and regulated industries. For students, the most relevant thing to know is this: Tabnine teaches you the privacy model that serious companies require, and understanding it will make you a better engineer when you join those companies."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Tabnine AI Tutorial For Beginners 2024', url: 'https://www.youtube.com/watch?v=Dx6pWyfaNkA', dur: '~10 min', note: 'Install Tabnine, enable completions, use chat — full beginner walkthrough' },
            { label: 'Tabnine AI | Intelligent Code Completion & AI-Powered Development', url: 'https://www.youtube.com/watch?v=A99F-f76Vjk', dur: '~8 min', note: 'Overview of Tabnine agents, switchable models, and enterprise privacy features' },
            { label: 'I Tested Tabnine\'s AI Pair Programmer — Is This Better Than GitHub Copilot?', url: 'https://www.youtube.com/watch?v=3KeLh9eqOPU', dur: '~12 min', note: 'Honest side-by-side comparison of Tabnine vs GitHub Copilot on real projects' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why Tabnine exists — the privacy model" color={color} />
          <InfoBox color={color}>Tabnine's core differentiator is its privacy architecture. Unlike GitHub Copilot and Codeium — which send your code to their cloud servers for processing — Tabnine offers a genuinely local option. Its lightweight model runs on your CPU or GPU with under 50ms latency. For enterprise teams dealing with proprietary code, this is not optional: it is a legal and compliance requirement.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>There are two deployment modes: the cloud model (similar to Copilot, code is sent to Tabnine's servers but never stored or used for training), and the fully local model where everything runs on device. The local model is smaller and less capable than the cloud model, but it is genuinely useful for single-line completions and simple patterns. For students, the local model is an interesting experiment — it shows you how AI assistants work without needing an internet connection, and demonstrates that powerful developer tooling does not always require cloud infrastructure.</p>
        </Block>
        <Block>
          <SubHead label="Key features" color={color} />
          <CardGrid color={color} items={[
            { name: 'Full-line & multi-line completion', desc: 'Tabnine suggests the next line, next block, or full function body as you type. The fast local model handles single-line; the cloud model handles multi-line function generation with context awareness.' },
            { name: 'Tabnine Chat', desc: 'AI chat sidebar available in VS Code, JetBrains, and Eclipse. Ask questions about your code, generate tests, request refactoring. Supports switchable underlying models including Claude and GPT-4o.' },
            { name: 'Local model option', desc: 'Run Tabnine entirely offline on your CPU or GPU. No code leaves your machine. Ideal for working on sensitive projects, poor internet conditions, or learning how local AI inference works.' },
            { name: 'RAG-powered context', desc: 'Tabnine uses Retrieval-Augmented Generation connected to your Git repositories. It learns your codebase patterns — your naming conventions, your preferred abstractions — and uses that to improve suggestions.' },
            { name: 'Enterprise privacy controls', desc: 'Zero data retention, VPC deployment, on-premise hosting, air-gapped environments. "Protected" models trained only on permissively licensed open-source code — no GPL, no copyleft risk.' },
            { name: 'AI agents (Pro/Enterprise)', desc: 'Code Review Agent and AI Test Agent automate repetitive review and testing tasks. Part of the newer Agentic Platform that goes beyond autocomplete into full SDLC automation.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Setting up Tabnine with the local model" color={color} />
          <InfoBox color={color}>The local model requires no internet connection after the initial one-time download. It runs on your CPU using about 1-2GB RAM. The quality is lower than the cloud model for complex completions, but it demonstrates that AI coding assistance is possible entirely on-device — which is worth understanding as a future engineer.</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Install Tabnine in VS Code or JetBrains', body: "VS Code: open Extensions (Ctrl+Shift+X), search 'Tabnine AI Autocomplete', install. JetBrains: Settings → Plugins → Marketplace → search 'Tabnine' → install. Restart the IDE." },
            { n: '2', title: 'Sign up or sign in', body: 'Create a free account at tabnine.com. After installing, a sign-in prompt appears in the IDE. Use the same email. Free tier provides basic completions without a credit card.' },
            { n: '3', title: 'Enable the local model in VS Code', body: "Open Settings (Ctrl+,) → search 'Tabnine Local' → enable 'Tabnine: Use Local Model'. Tabnine will download the local model (~400MB) on first activation. The download happens once and then works offline." },
            { n: '4', title: 'Verify local mode is active', body: "Click the Tabnine icon in the VS Code status bar. If it shows 'Local' or 'Offline' mode, your completions are running on-device. Cloud mode shows a cloud icon. You can switch between them from this menu." },
            { n: '5', title: 'Test completions and chat', body: "Open a Python or JavaScript file and start typing a function. Accept suggestions with Tab. Open Tabnine Chat from the sidebar (the chat bubble icon). Ask: 'What does this function do?' or 'Write a test for this.'" },
          ]} />
        </Block>
        <Block>
          <SubHead label="IDE and editor support" color={color} />
          <CardGrid color={color} items={[
            { name: 'VS Code', desc: 'Full support: inline completions, multi-line suggestions, Tabnine Chat, local model. The most feature-complete integration. Install from the VS Code Marketplace in one click.' },
            { name: 'JetBrains IDEs', desc: 'IntelliJ IDEA, PyCharm, WebStorm, GoLand, Rider, Android Studio, DataGrip. Full Tabnine Chat support added in 2024. Install from JetBrains Marketplace.' },
            { name: 'Eclipse', desc: 'Full-tier support including Tabnine Chat. One of few AI coding assistants with Eclipse integration — important for Java enterprise development and many university CS programs.' },
            { name: 'Visual Studio 2022', desc: 'Windows-focused development with Tabnine Chat support. Good for C#, .NET, and game development workflows in Unity.' },
            { name: 'Vim / Neovim', desc: 'Plugin available for terminal-based development. Note: Vim/Neovim support is limited to basic completions — Chat and agent features require VS Code, JetBrains, or Eclipse.' },
            { name: 'Sublime Text & others', desc: 'Legacy plugin support for Sublime Text. Check tabnine.com/install for the full list of supported editors and current feature availability per platform.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Tabnine vs Codeium vs GitHub Copilot" color={color} />
          <Compare color={color} items={[
            { label: 'Privacy & data handling', badge: 'Tabnine wins clearly', body: "Tabnine is the only tool that can run 100% locally with zero code leaving your machine. Copilot sends code to Microsoft/GitHub servers. Codeium offers optional zero data retention but still processes in the cloud by default. For students working on anything sensitive — internship code, personal projects you plan to patent, consulting work — Tabnine is the only safe choice." },
            { label: 'Completion quality', badge: 'Copilot slightly ahead', body: "GitHub Copilot uses GPT-4o and generally produces the most accurate multi-line completions. Codeium's cloud model is close and very fast. Tabnine's cloud model is competitive for single-line and pattern completions. Tabnine's local model is noticeably weaker for complex suggestions but perfectly fine for boilerplate and pattern matching." },
            { label: 'Price', badge: 'Codeium is freest', body: "Codeium is completely free with no usage limits. Tabnine's Basic plan was sunset in April 2025 — you now need a Pro plan ($12-15/month) for full features. GitHub Copilot is free for students via GitHub Education, or $10/month. For cost-conscious students, Codeium is the clearest winner." },
            { label: 'Enterprise / job readiness', badge: 'Tabnine advantage', body: 'In regulated industries (banking, healthcare, government, defense), Copilot and Codeium are often banned because of data exposure risk. Tabnine is the tool these companies actually use. Understanding Tabnine\'s privacy model — VPC, on-prem, air-gapped — puts you ahead in interviews at companies that take security seriously.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Pricing — what changed in 2025" color={color} />
          <InfoBox color={color}>Important: Tabnine sunset its long-standing Basic (free) plan on April 2, 2025. If you want the full Tabnine experience today, you need a paid plan. However, limited free trials remain available, and the local model download is still accessible after signup. For students who need a fully free tool, Codeium remains the better choice day-to-day.</InfoBox>
          <CardGrid color={color} items={[
            { name: 'Free trial', desc: 'Sign up at tabnine.com for a free trial period. No credit card required initially. Gives access to cloud completions and Tabnine Chat. Ideal for evaluating before committing.' },
            { name: 'Pro — $12-15/month', desc: 'Full cloud completions, Tabnine Chat with switchable models (including Claude and GPT-4o), local model access, and RAG-based personalization from your codebase.' },
            { name: 'Enterprise — $39/user/month', desc: 'VPC and on-premise deployment, custom model training on your codebase, air-gapped environment support, SSO/SAML, compliance features. Used by Fortune 500 companies.' },
            { name: 'Agentic Platform — $59/user/month', desc: 'Includes everything in Enterprise plus the Code Review Agent and AI Test Agent for automated SDLC workflows. Cutting edge of what AI coding tools can do in 2025.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Why enterprises choose Tabnine" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '0.875rem'}}>Most students only think about AI coding tools from a personal productivity angle — will this make me faster at assignments? But as a future engineer, you will work at organizations where your manager says "we cannot use Copilot because of data policy." Understanding why is important:</p>
          {[
            'Banks and financial institutions handle proprietary trading algorithms and customer data — sending code to external servers violates regulations like GDPR and internal security policies',
            'Healthcare tech companies building on patient data cannot risk code snippets containing PHI (Protected Health Information) being sent to cloud APIs',
            'Defense contractors and government agencies often work in air-gapped networks with no internet access at all — cloud tools simply cannot function',
            'Enterprise codebases contain trade secrets, unpublished patents, and proprietary algorithms that companies do not want model providers training on',
            'Tabnine\'s on-premise deployment means the AI model lives inside the company\'s own data center — no external API calls, fully auditable, fully compliant',
          ].map((item, i) => (
            <div key={i} className="tool-layout-cando-item">
              <div className="tool-layout-cando-item__dot" />
              <span className="tool-layout-cando-item__text">{item}</span>
            </div>
          ))}
        </Block>
        <Block>
          <SubHead label="Language support — 80+ languages" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '0.875rem'}}>Tabnine supports over 80 programming languages. Its completions adapt per language — it knows Python idioms are different from Java conventions, that JavaScript callbacks differ from Rust closures.</p>
          <CardGrid color={color} items={[
            { name: 'Python', desc: 'Strongest support. Knows pandas, numpy, scikit-learn, Django, FastAPI patterns. Great for data science, ML, and backend development.' },
            { name: 'JavaScript / TypeScript', desc: 'Full support for React, Node.js, Express, Next.js. TypeScript type-aware completions help with interface and generic patterns.' },
            { name: 'Java', desc: 'Deep support — important since Java is dominant in enterprise, Android, and many CS programs. Works exceptionally well in IntelliJ IDEA.' },
            { name: 'C / C++ / Rust', desc: 'Strong completions for systems programming. Rust support is particularly good — fills in match patterns, trait implementations, lifetimes.' },
            { name: 'Go, Kotlin, Swift', desc: 'All well-supported. Kotlin completions in Android Studio / IntelliJ, Swift in VS Code with appropriate extensions.' },
            { name: 'HTML, CSS, SQL, Bash', desc: 'HTML/CSS completions, SQL query generation (SELECT/JOIN patterns), Bash scripting help. Useful across web dev, database, and devops workflows.' },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Set Up Tabnine with the Local Model</span></div>
          <p className="tool-layout-task__desc">The goal of this project is to experience what it feels like to use AI code completion with zero internet dependency — a situation you will encounter in real enterprise environments. Install Tabnine, enable the local model, and use it on a real coding task. Then intentionally disconnect from the internet and verify it still works. This gives you hands-on understanding of what "local AI inference" means beyond the theory.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Install Tabnine and sign up', body: "Install the Tabnine extension in VS Code or your JetBrains IDE. Create a free account at tabnine.com. Authenticate from within the IDE. This takes about 5 minutes." },
            { n: '2', title: 'Enable and download the local model', body: "In VS Code: Settings → search 'Tabnine Local' → enable it. Tabnine downloads the local model once (~400MB). Let it complete. In JetBrains: Tabnine settings → Local Mode. Wait for the download." },
            { n: '3', title: 'Use it on a real project', body: "Open a project you are actively working on — an assignment, personal project, or practice code. Use it for at least 30 minutes. Accept completions you agree with (Tab), reject ones you don't (Esc or just keep typing)." },
            { n: '4', title: 'Disconnect from internet and test', body: "Disable your Wi-Fi or unplug ethernet. Open your project. Start typing code. Tabnine completions should still appear — they are running entirely from the local model. This is the moment that makes the privacy model real." },
            { n: '5', title: 'Compare cloud vs local quality', body: "Reconnect and re-enable cloud mode. Notice any difference in completion quality or speed? The cloud model will suggest longer, more complex completions. The local model is faster but more conservative. Both are valid for different contexts." },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">KEY INSIGHT: When your future employer says "we can't use Copilot for this codebase" — you'll know exactly what tool to reach for</span></div>
        </div>
        <ProTip>
        In interviews at security-conscious companies (banks, fintech, healthtech, govtech), mentioning that you understand the difference between cloud-based AI tools and locally-deployable ones signals maturity most candidates lack. If asked "what AI tools do you use and how do you handle sensitive code?" — the right answer includes knowing Tabnine's local model exists and why it matters. It's a small detail that reveals you think about data security, not just feature velocity.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/coding/codeium', label: 'Codeium' }}
        next={{ path: '/ai-lab/coding/aider', label: 'Aider' }}
      />
    </ToolPageShell>
  )
}
