import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F59E0B'

export default function CopilotPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Coding">
      <ToolHeader
        icon="🤖"
        title="GitHub Copilot — AI Pair Programmer Inside Your Editor"
        tagline="The tool that autocompletes entire functions as you type"
        badges={[['✓ FREE for Students', '#4ADE80'], ['GitHub Student Pack', color], ['GitHub + OpenAI', 'var(--text-muted)']]}
        overview={"GitHub Copilot was the first mainstream AI coding assistant embedded directly inside a code editor. Before Copilot, AI coding help meant switching to a chat window, pasting code, reading a response, and copying back. Copilot changed this: it watches what you type and suggests completions inline — entire functions, test cases, boilerplate — without breaking your flow. For students, Copilot is completely free through the GitHub Student Developer Pack. It uses GPT-4o under the hood and has access to the context of your entire open file plus related files in your project. Beyond autocomplete, Copilot Chat lets you select code and ask questions, generate documentation, explain errors, and refactor — all without leaving VS Code."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Get Started with GitHub Copilot in VS Code (2025) — Official VS Code', url: 'https://www.youtube.com/watch?v=vdBxfFVXnc0', dur: '21 min', note: 'Official guide — setup, @workspace, Copilot Edits, slash commands' },
            { label: 'How to Use GitHub Copilot in VS Code — Full Setup + Tips', url: 'https://www.youtube.com/watch?v=TI9TsuwpguM', dur: '10 min', note: 'Quick practical guide — get productive fast' },
            { label: 'Cursor AI Tutorial For Beginners 2025 — Full Comparison with Copilot', url: 'https://www.youtube.com/watch?v=kbfdFlqzjcs', dur: '~20 min', note: 'How Cursor compares to Copilot — when to use each' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How Copilot works" color={color} />
          <InfoBox color={color}>Copilot sends your current file content, cursor position, and relevant open files to a GPT-4o model running on GitHub's servers. The model predicts the most likely code continuation. This context window (called "copilot context") is why writing a clear function name and a docstring comment dramatically improves suggestion quality — you are giving the model more signal.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The critical concept is that Copilot is not searching a code database — it is using a language model that learned coding patterns from billions of lines of public code. It does not copy-paste existing code; it generates new code that follows the patterns it learned. This is why it can generate code for your specific variable names, your project's existing style, and your partial implementation. It adapts to what it sees in your file.</p>
        </Block>
        <Block>
          <SubHead label="Getting it free as a student" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Apply for GitHub Student Developer Pack', body: 'Go to education.github.com/pack. Verify with your college email address or student ID. Approval usually takes 1-3 days.' },
            { n: '2', title: 'Enable Copilot on your GitHub account', body: 'After Pack approval, go to github.com/settings/copilot. Enable Copilot Individual (free for students). Connect your GitHub account.' },
            { n: '3', title: 'Install the VS Code extension', body: "In VS Code: Extensions (Ctrl+Shift+X) → search 'GitHub Copilot' → Install. Also install 'GitHub Copilot Chat'. Sign in with your GitHub account." },
            { n: '4', title: "Verify it's working", body: 'Open any code file. Start typing a function. You should see gray ghost text suggestions appearing. Press Tab to accept, Esc to dismiss, Alt+] to see next suggestion.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Core features" color={color} />
          <CardGrid color={color} items={[
            { name: 'Inline autocomplete', desc: 'Suggests completions as you type — from single tokens to entire multi-line functions. Accept with Tab, dismiss with Esc. The most used feature.' },
            { name: 'Copilot Chat', desc: 'Side panel chat in VS Code. Ask about selected code, request explanations, generate tests, refactor. Context-aware: knows your current file.' },
            { name: 'Copilot Edits (multi-file)', desc: "Describe a change in natural language and Copilot applies it across multiple files simultaneously. 'Add input validation to all API endpoints' — works across your codebase." },
            { name: 'Generate from comments', desc: 'Write a comment describing what you want. Copilot reads it and generates the implementation below. The clearer the comment, the better the code.' },
            { name: 'Test generation', desc: "Select a function → Copilot Chat → 'Generate unit tests for this'. Produces complete test cases including edge cases. Dramatically faster than writing tests manually." },
            { name: 'Explain code', desc: "Select any code → 'Explain this'. Works on code you didn't write — third-party libraries, legacy code, unfamiliar algorithms. Better than searching documentation." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Writing prompts that get better suggestions" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Name functions descriptively', body: 'get_user_by_email() gives far better suggestions than getData(). Copilot uses the function name as the primary signal for what to generate. Descriptive names are free documentation AND better AI hints.' },
            { n: '2', title: 'Write the docstring first', body: "Write a clear docstring or JSDoc comment before the function body. 'Fetches paginated user records from the database, sorted by creation date, with optional email filter.' Copilot reads this and generates matching code." },
            { n: '3', title: 'Start the implementation yourself', body: 'Write the first 2-3 lines of a function before pausing. This gives Copilot the pattern to follow. It generates far more accurate completions with partial context than from a blank function body.' },
            { n: '4', title: 'Use meaningful variable names', body: 'results not r, userEmail not ue. Copilot infers type and intent from names. A well-named variable tells it what operations are likely next.' },
            { n: '5', title: 'Accept then edit', body: "Copilot's suggestion is rarely 100% right. Accept it (Tab), then modify. This is faster than writing from scratch plus fixing the 30% that's wrong." },
          ]} />
        </Block>
        <Block>
          <SubHead label="What Copilot cannot do" color="#EF4444" />
          <Compare color="#EF4444" items={[
            { label: 'It does not understand your full project', badge: 'Context limitation', body: 'Copilot sees your open files and nearby code, not your entire repository. For large codebases, it does not know about functions defined elsewhere unless those files are open. This is why Cursor (which indexes the full codebase) often performs better on large projects.' },
            { label: 'It does not always generate correct code', badge: 'Always verify', body: 'Copilot generates plausible code — not verified correct code. It can introduce bugs, use deprecated APIs, or implement algorithms incorrectly. Treat every suggestion as a starting draft that requires review.' },
            { label: 'It does not know your runtime errors', badge: 'Use Copilot Chat', body: 'Inline suggestions do not know about errors in your terminal. For debugging, copy the error message and paste it into Copilot Chat — that context is required for useful debugging help.' },
            { label: 'Security vulnerabilities', badge: 'Known risk', body: 'Copilot can suggest insecure code: SQL concatenation instead of parameterized queries, storing passwords in plaintext, hardcoded credentials. Never blindly accept suggestions for security-critical code. Review everything involving auth, input validation, and data storage.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Write code faster by accepting AI suggestions for boilerplate, standard patterns, and repetitive code',
            'Generate complete test suites for existing functions without writing them manually',
            'Understand unfamiliar code by selecting it and asking Copilot to explain in plain English',
            'Apply consistent changes across multiple files by describing the change in natural language',
            'Complete your GitHub Student Pack to get Copilot free along with dozens of other developer tools',
        ]} />
      </Block>
        <ProjectTask
        title={"Build Something with Copilot"}
        description={"Write a small CRUD REST API (5-6 endpoints) using whatever language you're learning (Python Flask, Node Express, Java Spring, etc.). Deliberately use Copilot for every function. Before each function, write a clear docstring. Then accept Copilot's suggestion, review it, and modify what's wrong. Document: which suggestions were immediately usable, which needed editing, and which were completely wrong. This calibration exercise shows you how to work with AI as a tool, not a replacement."}
        costNote={"TOTAL COST: ₹0 — Free with GitHub Student Developer Pack"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Set up a simple project', body: 'Create a new project folder. A basic REST API is a good target — define 5 endpoints: list, get by ID, create, update, delete for a simple resource (users, tasks, books).' },
            { n: '2', title: 'Write docstrings before functions', body: 'For each endpoint, write the full docstring first: what it does, what it returns, what errors it can raise. Then pause and let Copilot suggest the implementation.' },
            { n: '3', title: 'Track suggestion quality', body: 'Keep a simple tally: suggestions you accepted unchanged ✓, suggestions you modified ~, suggestions you rejected ✗. After 5 functions, review the pattern.' },
            { n: '4', title: 'Use Copilot Chat for tests', body: "Select each completed function → Copilot Chat → 'Write unit tests for this function including edge cases'. Review and add the generated tests." },
          ]} />
      </ProjectTask>
        <ProTip>
        The biggest productivity gain from Copilot is not the fancy features — it is the autocomplete for code you already know how to write. Boilerplate, error handling, standard library calls, repetitive patterns. Copilot handles the typing; you handle the thinking. This saves 30-40% of keystroke time on familiar patterns, which compounds into significant daily time savings.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/chatbots/notebooklm', label: 'NotebookLM' }}
        next={{ path: '/ai-lab/coding/cursor', label: 'Cursor' }}
      />
    </ToolPageShell>
  )
}
