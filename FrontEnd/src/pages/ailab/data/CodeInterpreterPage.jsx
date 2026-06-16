import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#0EA5E9'

export default function CodeInterpreterPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(14,165,233,0.09)' : 'rgba(14,165,233,0.13)'
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Data &amp; Analysis</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🐍</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Code Interpreter — ChatGPT That Runs Your Code</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Upload files, write Python, and see results instantly inside ChatGPT</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['ChatGPT Plus ($20/mo)', color], ['File uploads', color], ['Python execution', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Code Interpreter (officially called Advanced Data Analysis in ChatGPT Plus) is a feature that gives ChatGPT the ability to write Python code and immediately execute it within the same conversation. Upload a CSV, describe what you want, and Code Interpreter writes pandas code, runs it on your actual data, and shows you the output — charts, tables, computed values — all inside the chat. Unlike asking a regular LLM for code and copying it to run elsewhere, Code Interpreter closes the loop: the model sees the actual output of its own code, can fix errors automatically, and iterates until it gets the right result. For students who need to analyze data, process files, create visualizations, or automate file manipulation tasks without setting up a local Python environment, Code Interpreter is the most accessible Python execution environment available.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'ChatGPT Code Interpreter Tutorial — Advanced Data Analysis', url: 'https://www.youtube.com/watch?v=pVPp4ldOzJU', dur: '18 min', note: 'Complete guide to all Code Interpreter features' },
            { label: 'Code Interpreter for Data Analysis — Real Examples', url: 'https://www.youtube.com/watch?v=MfzHNNVdBKc', dur: '15 min', note: 'Practical data analysis walkthrough' },
            { label: 'ChatGPT Code Interpreter vs Julius AI vs Gemini', url: 'https://www.youtube.com/watch?v=N8e3SBCdl_0', dur: '12 min', note: 'Comparison of AI data tools' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What Code Interpreter actually does */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What Code Interpreter actually does" color={color} />
          <InfoBox color={color} dark={dark}>Code Interpreter runs a sandboxed Python environment inside ChatGPT. When you upload a file and ask a question, GPT-4o writes Python code (using pandas, matplotlib, numpy, sklearn, and many other libraries), executes it in the sandbox, sees the output or error, and responds with results. If the code produces an error, the model automatically rewrites and retries — you never see the failure, just the final correct result.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The key insight is the feedback loop. A regular LLM generates code based on what it thinks will work. Code Interpreter generates code, runs it, and sees what actually happened. This is the difference between guessing and verifying. For data analysis tasks where the exact format of your data matters (column names, data types, missing values), the ability to run and see real results makes Code Interpreter dramatically more reliable than asking for code that you run elsewhere.</p>
        </Block>

        {/* What Code Interpreter can do */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What Code Interpreter can do" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Data analysis', desc: 'Upload CSV, Excel, JSON. Ask questions about the data — statistics, trends, outliers, correlations. Code Interpreter reads your actual column names and data types, not assumptions.' },
            { name: 'Data visualization', desc: 'Generate matplotlib and seaborn charts. Bar, line, scatter, histogram, heatmap, box plot. Specify styling requirements or let it choose. Download the chart directly from the response.' },
            { name: 'File conversion', desc: 'Convert between file formats: CSV to Excel, JSON to CSV, PDF to text, image formats. Merge multiple files. Extract specific columns. Tasks that would require writing a script take seconds.' },
            { name: 'Text processing', desc: 'Analyze text files: word frequency, sentiment patterns, extract patterns with regex, count occurrences, process logs. Works with any text data that can be uploaded as a file.' },
            { name: 'Mathematical computation', desc: 'Complex calculations, statistical tests, numerical optimization. scipy, numpy, sympy are available. Solve equations, run simulations, compute matrix operations — with the model explaining what it computed.' },
            { name: 'Machine learning', desc: 'Build and evaluate simple ML models (scikit-learn). Train classifiers, run regression, evaluate model accuracy. Not for production ML — for understanding and quick experimentation.' },
          ]} />
        </Block>

        {/* Getting the best results */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Getting the best results" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Upload first, then describe', body: 'Upload your file before explaining what you want. Code Interpreter will examine the file structure and understand your column names, data types, and sample values — making all subsequent responses more accurate.' },
            { n: '2', title: 'Describe the output format explicitly', body: "'Create a bar chart with: title Revenue by Region, x-axis labels rotated 45 degrees, bars colored by category, y-axis in thousands (₹000s), save as PNG with 300 DPI.' Specific output specifications produce professional results." },
            { n: '3', title: 'Ask for the code', body: "'Show me the Python code you used for this analysis.' Code Interpreter provides the full code. Copy it to Jupyter or a .py file. Now you have working Python code customized for your data." },
            { n: '4', title: 'Iterate on results', body: "'Now filter that to only rows where category is Electronics and redo the chart.' Code Interpreter remembers the context and modifies its approach. Each follow-up builds on the previous result without restarting." },
            { n: '5', title: 'Ask for interpretation', body: "After a chart or statistical result: 'What does this tell us? What are the 3 most important insights from this analysis?' Code Interpreter combines execution capability with GPT-4o's reasoning to provide interpretation, not just numbers." },
          ]} />
        </Block>

        {/* Practical use cases for students */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Practical use cases for students" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Assignment data analysis', badge: 'Most common', body: 'Export survey data from Google Forms, results from an experiment, or a public dataset for coursework. Upload to Code Interpreter. Generate all required charts and statistics. Understand what the numbers mean with follow-up questions.' },
            { label: 'Excel automation', badge: 'Big time saver', body: 'Complex spreadsheet tasks that would take hours in Excel: merge multiple sheets by a common column, apply transformations to thousands of rows, calculate complex formulas across all rows, reformat dates consistently. Describe the task, it executes.' },
            { label: 'Learning Python', badge: 'Learning tool', body: 'Ask Code Interpreter to solve a problem, then ask it to explain the code line by line. Run the same code yourself in a local Python environment. Having a working example with explanation accelerates learning significantly.' },
            { label: 'Quick calculations', badge: 'Better than a calculator', body: "Complex math that would require writing a script: 'Given this table of values, fit a polynomial regression and tell me the R² score' or 'Calculate the confidence interval for this sample data'. Executes and explains." },
          ]} />
        </Block>

        {/* Limitations to know */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Limitations to know" color="#EF4444" />
          <Compare dark={dark} border={border} color="#EF4444" items={[
            { label: 'Session timeout', badge: 'Data does not persist', body: 'Code Interpreter sessions expire. If you come back hours later, your uploaded files and all generated code are gone. For recurring analysis workflows, export the code (ask Code Interpreter to provide it) and run it locally or in Colab.' },
            { label: 'No internet access', badge: 'Sandboxed environment', body: 'Code Interpreter runs in a sandbox with no internet access. It cannot fetch data from URLs, call external APIs, or access databases. All data must be uploaded as files. Web scraping, API calls, and live data are not possible.' },
            { label: 'Memory limits', badge: 'Large files may fail', body: 'Very large files (hundreds of MB, millions of rows) may hit memory limits in the sandbox. If processing fails, split the file into smaller chunks or sample the data first.' },
            { label: 'Requires Plus subscription', badge: '$20/month', body: 'Code Interpreter is a ChatGPT Plus feature. Free alternatives: Julius AI (purpose-built, free tier), Google Colab (free Jupyter notebooks), Gemini with code execution. Plus is worth it if you use many ChatGPT features beyond just data analysis.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Analyze any data file by describing what you want in plain English — no pandas or SQL knowledge required',
            'Generate professional charts and visualizations with specific formatting by describing the output',
            'Convert, merge, filter, and transform data files without writing code',
            'Extract working Python code from Code Interpreter to learn pandas and matplotlib from real examples',
            'Run quick statistical analyses, fit models, and compute complex calculations on your actual data',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Your Own Data Analysis Report</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Take any real data you have access to or care about. Options: your college's public exam results data, a Kaggle dataset on a topic you like, a CSV export from any app you use (fitness tracker, finance app, etc.). Upload to Code Interpreter. Produce: (1) a summary statistics table, (2) three different charts showing different aspects of the data, (3) one interesting finding explained in plain English. Ask for the Python code at the end. This is the process data analysts use daily — just faster.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Get real data', body: 'Best source: something you actually care about. Kaggle.com has thousands of free CSVs. Google Dataset Search finds government and academic data. Export your own app data (most apps support CSV export).' },
            { n: '2', title: 'Start with exploration', body: "Upload → 'Describe this dataset. How many rows? What columns? Any missing values? What data type is each column?' Read the response carefully before asking analytical questions." },
            { n: '3', title: 'Generate three charts', body: 'Ask for three different visualization types that reveal something interesting: one showing distribution, one showing comparison or trend, one showing relationships. Specify titles, labels, and formatting.' },
            { n: '4', title: 'Extract and save the code', body: "Ask: 'Provide the complete Python code for all three charts as a single script I can run locally.' Save to analysis.py. Run in Google Colab or local Python. Modify one thing to practice." },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>REQUIRES: ChatGPT Plus — $20/month</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Code Interpreter is most valuable as a Python tutor, not just a data tool. When it produces code you do not understand, ask 'Explain what each line of that code does, step by step.' This gives you a line-by-line explanation of working Python that solves your exact problem. Repeat this for 10 different analyses and you will have learned more practical pandas than most introductory courses cover.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/data/julius')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Julius AI
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/creative/dalle-free')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Bing Image Creator <ChevronRight size={14} />
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
