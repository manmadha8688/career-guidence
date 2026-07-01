import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F59E0B'

export default function CodeiumPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Coding">
      <ToolHeader
        icon="💎"
        title="Codeium — Free AI Coding for Any Editor"
        tagline="The completely free autocomplete that works everywhere"
        badges={[['✓ COMPLETELY FREE', '#4ADE80'], ['No usage limits', color], ['70+ editors supported', 'var(--text-muted)']]}
        overview={"Codeium is the most accessible AI coding assistant available — completely free, with no usage limits, no student verification required, and support for over 70 code editors including VS Code, JetBrains IDEs (IntelliJ, PyCharm, WebStorm), Vim, Neovim, and even web-based editors. Where GitHub Copilot requires a student pack or $10/month, Codeium gives you fast, capable autocomplete for free indefinitely. It is built by the same team that makes Windsurf, so the underlying model is the same. For students who use JetBrains IDEs (common in Java, Python, and Android development), Codeium is often the only strong free AI coding option. It also runs fast — responses feel nearly instantaneous compared to some competitors."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'How to PROPERLY Use Codeium in VS Code — Full Guide', url: 'https://www.youtube.com/watch?v=XfH-3wg8i-8', dur: '~12 min', note: 'Install, configure, multiline suggestions, Codeium Chat — full guide' },
            { label: 'How to Install and Use Codeium AI for Web Development', url: 'https://www.youtube.com/watch?v=fT9rNvvEFSQ', dur: '~12 min', note: 'Complete setup guide — web dev focused, VS Code + JetBrains' },
            { label: 'Get Started with GitHub Copilot in VS Code (2025) — Official VS Code', url: 'https://www.youtube.com/watch?v=vdBxfFVXnc0', dur: '21 min', note: 'Compare Codeium free against Copilot — understand the difference' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why free matters" color={color} />
          <InfoBox color={color}>Codeium's free tier has no usage limits, no rate limiting during normal use, and requires only an email address to sign up — no credit card, no student verification, no waiting period. This makes it the default recommendation for anyone who cannot access Copilot's student pack or does not want to pay for Cursor Pro.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The "completely free" model is sustainable because Codeium monetizes through its enterprise product (Codeium for Teams). Individual developers get the full product for free as a way to build an audience and demonstrate quality. This is the same model as VSCode (free for individuals, paid enterprise support) and has historically been more sustainable than VC-subsidized free tiers that eventually switch to paid.</p>
        </Block>
        <Block>
          <SubHead label="Editor support" color={color} />
          <CardGrid color={color} items={[
            { name: 'VS Code / VS Code forks', desc: 'VS Code, Cursor, Windsurf, Theia, Gitpod. Install the Codeium extension from the marketplace. Full autocomplete and chat features.' },
            { name: 'JetBrains IDEs', desc: 'IntelliJ IDEA, PyCharm, WebStorm, Android Studio, GoLand, Rider, DataGrip. Plugin available from JetBrains Marketplace. Works in all paid and free JetBrains editions.' },
            { name: 'Vim / Neovim', desc: 'Plugin available. Full autocomplete for terminal-based development workflows. For students using Linux or preferring keyboard-driven editors.' },
            { name: 'Jupyter Notebooks', desc: 'Works in JupyterLab and classic Jupyter notebooks. Autocomplete for Python data science and ML workflows — fills in pandas, numpy, sklearn patterns.' },
            { name: 'Web IDEs', desc: 'GitHub Codespaces, GitLab Web IDE, Replit, CodeSandbox. Browser-based development with AI assistance — no local install required.' },
            { name: 'Emacs, Sublime, others', desc: '30+ additional editors with varying feature levels. Check codeium.com/editors for the full list and installation instructions.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Features comparison: Codeium vs competitors" color={color} />
          <Compare color={color} items={[
            { label: 'vs GitHub Copilot', badge: 'Codeium: free, Copilot: free for students', body: "Copilot requires student verification or $10/month. Codeium is free for everyone. Copilot uses GPT-4o (stronger model). Codeium's model is fast and capable for everyday autocomplete. For pure autocomplete quality, Copilot slightly edges Codeium on complex suggestions — but Codeium is good enough for most daily use and works in JetBrains IDEs." },
            { label: 'vs Cursor', badge: 'Codeium: free, Cursor: limited free', body: 'Cursor has better codebase understanding (full indexing) and multi-file Composer. Codeium extension + VS Code is free without limits. Windsurf (by Codeium) gives you an editor with similar features to Cursor. Use Codeium extension if you want to stay in your current editor; use Windsurf if you want a full Cursor alternative.' },
            { label: 'vs Tabnine', badge: 'Similar, Codeium typically better', body: 'Tabnine is another free AI coding tool. Codeium generally has faster completions, better context awareness, and broader editor support. Both are free. Codeium is the current recommendation for most use cases.' },
            { label: 'Speed', badge: 'Codeium advantage', body: 'Codeium is consistently faster than Copilot at returning autocomplete suggestions — often sub-100ms. This matters because slow autocomplete breaks flow. Copilot can lag noticeably on slower connections. Codeium\'s speed is a real quality-of-life advantage.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Sign up at codeium.com', body: 'Free account with email only — no credit card. The signup takes 30 seconds.' },
            { n: '2', title: 'Install for your editor', body: "VS Code: search 'Codeium' in the Extensions panel. JetBrains: Settings → Plugins → Marketplace → search 'Codeium'. Follow the authentication prompt to connect your account." },
            { n: '3', title: 'Test autocomplete immediately', body: 'Open any code file and start typing a function. Gray ghost text should appear within 1-2 seconds. Tab accepts. Esc dismisses. Alt+] cycles through alternative suggestions.' },
            { n: '4', title: 'Open Codeium Chat', body: 'Codeium Chat is available in VS Code and JetBrains. Open it from the sidebar. Ask questions about your code, request refactoring, generate tests. It has file context awareness similar to Copilot Chat.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Using Codeium effectively in JetBrains" color={color} />
          <InfoBox color={color}>JetBrains IDEs (PyCharm, IntelliJ, WebStorm) are the standard in many CS programs and at most Indian tech companies. If your college uses Java or Android development, or if you prefer PyCharm for Python, Codeium is often your only strong free option — Copilot's JetBrains plugin is paid-only, and Cursor/Windsurf are VS Code-based.</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Install from JetBrains Marketplace', body: "Open Settings (Ctrl+Alt+S) → Plugins → Marketplace tab → search 'Codeium' → Install. Restart the IDE. Login with your Codeium account." },
            { n: '2', title: 'Enable in the IDE', body: 'After restart, look for the Codeium icon in the bottom status bar. Green = active. If it shows as inactive, click it and sign in again.' },
            { n: '3', title: 'Adjust suggestion behavior', body: 'Settings → Codeium → enable/disable auto-suggestions, adjust trigger delay. Default settings work well. If suggestions feel distracting, increase the trigger delay.' },
            { n: '4', title: 'Use inline refactor', body: 'Select code → right-click → Codeium: Refactor (or the Codeium icon in the toolbar). Describe the change. Works for renaming, simplifying, extracting methods.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Get AI autocomplete in any IDE including JetBrains (PyCharm, IntelliJ, WebStorm) completely free',
            'Generate boilerplate, fill in standard patterns, and autocomplete complex API calls without research',
            'Use Codeium Chat to ask questions about your code, generate tests, and understand error messages',
            'Switch between 70+ editors without losing AI assistance — Codeium works wherever you code',
            'Start immediately without a student email, credit card, or waiting period',
        ]} />
      </Block>
        <ProjectTask
        title={"Install and Use for One Week"}
        description={"Install Codeium in whichever IDE you use most. Then use it actively for one week on your regular coursework or projects. At the end of the week, note: (1) which types of suggestions were most useful, (2) which were distracting or wrong, (3) how your coding speed felt compared to before. This calibration is more valuable than any tutorial because it is grounded in your actual workflow."}
        costNote={"TOTAL COST: ₹0 — Codeium is completely free, no credit card required"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Install in your primary IDE', body: 'Whether VS Code, IntelliJ, PyCharm, or another — install Codeium today. The process takes under 5 minutes.' },
            { n: '2', title: 'Use it on real work', body: 'For one week, use it on whatever you are actually working on — assignments, personal projects, coursework. Not a demo project. Your real work.' },
            { n: '3', title: 'Track three types of suggestions', body: 'Useful (autocomplete exactly what you wanted), Neutral (had to modify), Wrong (rejected entirely). At the end of the week, which type was most common for your coding style?' },
            { n: '4', title: 'Adjust your workflow', body: "Based on what you learned: write clearer function names? More detailed comments? Or just trust the tab key more? Adjust your coding style to work with the AI's strengths." },
          ]} />
      </ProjectTask>
        <ProTip>
        Codeium works best when you write the function signature and a one-line comment before the body. The function name tells it the purpose, the comment confirms it. Then pause — let Codeium suggest the first few lines. If they are right, Tab. If not, write two lines yourself and pause again. This rhythm of write → pause → accept/reject is more natural than trying to use AI for every single keystroke.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/coding/windsurf', label: 'Windsurf' }}
        next={{ path: '/ai-lab/apis/groq', label: 'Groq API' }}
      />
    </ToolPageShell>
  )
}
