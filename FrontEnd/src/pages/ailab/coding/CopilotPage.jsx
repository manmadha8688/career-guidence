import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#F59E0B'

export default function CopilotPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(0,217,255,0.09)' : 'rgba(79,70,229,0.11)'
  const txt   = dark ? '#E2E8F0' : '#0F172A'
  const sub   = dark ? '#94A3B8' : '#475569'
  const muted = dark ? '#64748B' : '#94A3B8'

  return (
    <div style={{ minHeight: '100vh', background: bg, color: txt, fontFamily: "'Rajdhani', sans-serif", overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, borderRadius: '50%', background: `radial-gradient(ellipse, ${color}07 0%, transparent 65%)`, filter: 'blur(60px)' }} />
      </div>

      <nav style={{ position: 'sticky', top: 0, zIndex: 50, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', background: dark ? 'rgba(2,8,23,0.93)' : 'rgba(240,244,255,0.95)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${border}` }}>
        <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.72rem', letterSpacing: '0.1em', color: CYAN, padding: 0 }}>
          <ArrowLeft size={14} /> AI Lab
        </button>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Coding</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🤖</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>GitHub Copilot — AI Pair Programmer Inside Your Editor</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>The tool that autocompletes entire functions as you type</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE for Students', '#4ADE80'], ['GitHub Student Pack', color], ['GitHub + OpenAI', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>GitHub Copilot was the first mainstream AI coding assistant embedded directly inside a code editor. Before Copilot, AI coding help meant switching to a chat window, pasting code, reading a response, and copying back. Copilot changed this: it watches what you type and suggests completions inline — entire functions, test cases, boilerplate — without breaking your flow. For students, Copilot is completely free through the GitHub Student Developer Pack. It uses GPT-4o under the hood and has access to the context of your entire open file plus related files in your project. Beyond autocomplete, Copilot Chat lets you select code and ask questions, generate documentation, explain errors, and refactor — all without leaving VS Code.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'GitHub Copilot Tutorial — Getting Started', url: 'https://www.youtube.com/watch?v=jXp5D5ZnxGM', dur: '14 min', note: 'Setup and core features walkthrough' },
            { label: 'GitHub Copilot Tips and Tricks — Get More Out of It', url: 'https://www.youtube.com/watch?v=1qs6QKk0DVc', dur: '11 min', note: 'Advanced usage patterns' },
            { label: 'GitHub Copilot vs Cursor vs Codeium — Which is Best?', url: 'https://www.youtube.com/watch?v=sZqBpSVjUXw', dur: '9 min', note: 'Comparison of coding AI tools' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* How Copilot works */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How Copilot works" color={color} />
          <InfoBox color={color} dark={dark}>Copilot sends your current file content, cursor position, and relevant open files to a GPT-4o model running on GitHub's servers. The model predicts the most likely code continuation. This context window (called "copilot context") is why writing a clear function name and a docstring comment dramatically improves suggestion quality — you are giving the model more signal.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The critical concept is that Copilot is not searching a code database — it is using a language model that learned coding patterns from billions of lines of public code. It does not copy-paste existing code; it generates new code that follows the patterns it learned. This is why it can generate code for your specific variable names, your project's existing style, and your partial implementation. It adapts to what it sees in your file.</p>
        </Block>

        {/* Getting it free as a student */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Getting it free as a student" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Apply for GitHub Student Developer Pack', body: 'Go to education.github.com/pack. Verify with your college email address or student ID. Approval usually takes 1-3 days.' },
            { n: '2', title: 'Enable Copilot on your GitHub account', body: 'After Pack approval, go to github.com/settings/copilot. Enable Copilot Individual (free for students). Connect your GitHub account.' },
            { n: '3', title: 'Install the VS Code extension', body: "In VS Code: Extensions (Ctrl+Shift+X) → search 'GitHub Copilot' → Install. Also install 'GitHub Copilot Chat'. Sign in with your GitHub account." },
            { n: '4', title: "Verify it's working", body: 'Open any code file. Start typing a function. You should see gray ghost text suggestions appearing. Press Tab to accept, Esc to dismiss, Alt+] to see next suggestion.' },
          ]} />
        </Block>

        {/* Core features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Core features" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Inline autocomplete', desc: 'Suggests completions as you type — from single tokens to entire multi-line functions. Accept with Tab, dismiss with Esc. The most used feature.' },
            { name: 'Copilot Chat', desc: 'Side panel chat in VS Code. Ask about selected code, request explanations, generate tests, refactor. Context-aware: knows your current file.' },
            { name: 'Copilot Edits (multi-file)', desc: "Describe a change in natural language and Copilot applies it across multiple files simultaneously. 'Add input validation to all API endpoints' — works across your codebase." },
            { name: 'Generate from comments', desc: 'Write a comment describing what you want. Copilot reads it and generates the implementation below. The clearer the comment, the better the code.' },
            { name: 'Test generation', desc: "Select a function → Copilot Chat → 'Generate unit tests for this'. Produces complete test cases including edge cases. Dramatically faster than writing tests manually." },
            { name: 'Explain code', desc: "Select any code → 'Explain this'. Works on code you didn't write — third-party libraries, legacy code, unfamiliar algorithms. Better than searching documentation." },
          ]} />
        </Block>

        {/* Writing prompts that get better suggestions */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Writing prompts that get better suggestions" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Name functions descriptively', body: 'get_user_by_email() gives far better suggestions than getData(). Copilot uses the function name as the primary signal for what to generate. Descriptive names are free documentation AND better AI hints.' },
            { n: '2', title: 'Write the docstring first', body: "Write a clear docstring or JSDoc comment before the function body. 'Fetches paginated user records from the database, sorted by creation date, with optional email filter.' Copilot reads this and generates matching code." },
            { n: '3', title: 'Start the implementation yourself', body: 'Write the first 2-3 lines of a function before pausing. This gives Copilot the pattern to follow. It generates far more accurate completions with partial context than from a blank function body.' },
            { n: '4', title: 'Use meaningful variable names', body: 'results not r, userEmail not ue. Copilot infers type and intent from names. A well-named variable tells it what operations are likely next.' },
            { n: '5', title: 'Accept then edit', body: "Copilot's suggestion is rarely 100% right. Accept it (Tab), then modify. This is faster than writing from scratch plus fixing the 30% that's wrong." },
          ]} />
        </Block>

        {/* What Copilot cannot do */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What Copilot cannot do" color="#EF4444" />
          <Compare dark={dark} border={border} color="#EF4444" items={[
            { label: 'It does not understand your full project', badge: 'Context limitation', body: 'Copilot sees your open files and nearby code, not your entire repository. For large codebases, it does not know about functions defined elsewhere unless those files are open. This is why Cursor (which indexes the full codebase) often performs better on large projects.' },
            { label: 'It does not always generate correct code', badge: 'Always verify', body: 'Copilot generates plausible code — not verified correct code. It can introduce bugs, use deprecated APIs, or implement algorithms incorrectly. Treat every suggestion as a starting draft that requires review.' },
            { label: 'It does not know your runtime errors', badge: 'Use Copilot Chat', body: 'Inline suggestions do not know about errors in your terminal. For debugging, copy the error message and paste it into Copilot Chat — that context is required for useful debugging help.' },
            { label: 'Security vulnerabilities', badge: 'Known risk', body: 'Copilot can suggest insecure code: SQL concatenation instead of parameterized queries, storing passwords in plaintext, hardcoded credentials. Never blindly accept suggestions for security-critical code. Review everything involving auth, input validation, and data storage.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Write code faster by accepting AI suggestions for boilerplate, standard patterns, and repetitive code',
            'Generate complete test suites for existing functions without writing them manually',
            'Understand unfamiliar code by selecting it and asking Copilot to explain in plain English',
            'Apply consistent changes across multiple files by describing the change in natural language',
            'Complete your GitHub Student Pack to get Copilot free along with dozens of other developer tools',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}`, marginBottom: '0.5rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 7 }} />
              <span style={{ fontSize: '0.85rem', color: sub, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build Something with Copilot</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Write a small CRUD REST API (5-6 endpoints) using whatever language you're learning (Python Flask, Node Express, Java Spring, etc.). Deliberately use Copilot for every function. Before each function, write a clear docstring. Then accept Copilot's suggestion, review it, and modify what's wrong. Document: which suggestions were immediately usable, which needed editing, and which were completely wrong. This calibration exercise shows you how to work with AI as a tool, not a replacement.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Set up a simple project', body: 'Create a new project folder. A basic REST API is a good target — define 5 endpoints: list, get by ID, create, update, delete for a simple resource (users, tasks, books).' },
            { n: '2', title: 'Write docstrings before functions', body: 'For each endpoint, write the full docstring first: what it does, what it returns, what errors it can raise. Then pause and let Copilot suggest the implementation.' },
            { n: '3', title: 'Track suggestion quality', body: 'Keep a simple tally: suggestions you accepted unchanged ✓, suggestions you modified ~, suggestions you rejected ✗. After 5 functions, review the pattern.' },
            { n: '4', title: 'Use Copilot Chat for tests', body: "Select each completed function → Copilot Chat → 'Write unit tests for this function including edge cases'. Review and add the generated tests." },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Free with GitHub Student Developer Pack</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>The biggest productivity gain from Copilot is not the fancy features — it is the autocomplete for code you already know how to write. Boilerplate, error handling, standard library calls, repetitive patterns. Copilot handles the typing; you handle the thinking. This saves 30-40% of keystroke time on familiar patterns, which compounds into significant daily time savings.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/chatbots/notebooklm')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> NotebookLM
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/coding/cursor')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Cursor <ChevronRight size={14} />
          </button>
        </div>

      </div>
      <ScrollToTop />
    </div>
  )
}

function Block({ title, titleColor, dark, border, card, children }) {
  return (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '1.375rem', backdropFilter: 'blur(8px)', marginBottom: '1.25rem' }}>
      {title && <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.14em', color: titleColor, textTransform: 'uppercase', paddingBottom: '0.75rem', marginBottom: '1rem', borderBottom: `1px solid ${titleColor}20` }}>{title}</div>}
      {children}
    </div>
  )
}

function VideoCard({ v, dark, txt, muted }) {
  return (
    <a href={v.url} target="_blank" rel="noopener noreferrer"
      style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1.125rem', borderRadius: 11, textDecoration: 'none', background: dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.16)', marginBottom: '0.625rem', transition: 'background 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.09)'}
      onMouseLeave={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)'}
    >
      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Play size={13} color="#fff" fill="#fff" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: txt }}>{v.label}</div>
        {(v.dur || v.note) && <div style={{ fontSize: '0.7rem', color: muted, marginTop: 2 }}>{[v.dur, v.note].filter(Boolean).join(' · ')}</div>}
      </div>
      <ExternalLink size={12} color={muted} />
    </a>
  )
}
