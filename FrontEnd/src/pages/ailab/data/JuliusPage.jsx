import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#0EA5E9'

export default function JuliusPage() {
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Data & Analysis</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>📊</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Julius — Chat With Your Data in Plain English</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>AI-powered data analysis without writing a single line of code</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE tier', '#4ADE80'], ['No code needed', color], ['Powered by GPT-4o', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Julius is an AI data analysis platform that lets you upload any data file — CSV, Excel, PDF with tables, Google Sheets — and analyze it by asking questions in plain English. No SQL, no Python, no pandas. Ask "Which product category had the highest revenue last quarter?" and Julius generates and executes the analysis, produces charts, and explains the findings. It is built on GPT-4o and Code Interpreter, meaning it writes Python code to analyze your data, executes it, and shows you both the result and the code it used. For students without data science backgrounds who need to analyze survey results, project data, or academic datasets, Julius makes data analysis as accessible as chatting. The free tier allows a limited number of analyses per month.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'How to Use Julius AI for Data Analysis — Step-by-Step Guide', url: 'https://www.youtube.com/watch?v=rWoFcshWrTg', dur: '~15 min', note: 'Best full walkthrough — upload data, ask questions, get charts' },
            { label: 'AI Tool That Will Analyse ANY Dataset in SECONDS — Julius AI (No Code)', url: 'https://www.youtube.com/watch?v=HfurQPa5jF8', dur: '~10 min', note: 'Fast demo — see what Julius can do on a real dataset in minutes' },
            { label: 'Julius AI Tutorial: From Ideas to Data Analysis & Visualisation in a Click', url: 'https://www.youtube.com/watch?v=tm02Lf9WbWU', dur: '~15 min', note: 'Visualisation focus — charts, trends, and insight generation' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* How Julius works */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How Julius works" color={color} />
          <InfoBox color={color} dark={dark}>Julius sends your data file and your question to GPT-4o. The model writes Python code (using pandas, matplotlib, seaborn) to answer the question, executes it in a sandboxed environment, and returns the result — along with the generated chart or table. You see the answer, the visualization, and optionally the Python code that produced it. This is the same Code Interpreter capability that powers ChatGPT Plus's data analysis, wrapped in a purpose-built interface.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The critical feature for learning is that Julius shows you the code it wrote. Ask "which month had the highest sales?" and Julius answers the question and shows the pandas code it used. This is how many students learn data analysis in practice — see the code produced by AI, understand what each line does, modify it, and build their own skills. The 'see the code' toggle makes Julius simultaneously a data analysis tool and a pandas learning resource.</p>
        </Block>

        {/* What Julius can analyze */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What Julius can analyze" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'CSV and Excel files', desc: 'Upload any spreadsheet. Julius reads columns, data types, and values automatically. Ask about trends, comparisons, outliers, or correlations. Works with files up to tens of thousands of rows.' },
            { name: 'Survey data', desc: "Google Forms exports, Typeform results, SurveyMonkey downloads. Ask: 'What percentage chose option A?', 'Is there a correlation between age and score?', 'Visualize the distribution of responses.'" },
            { name: 'Financial data', desc: 'Revenue reports, budget spreadsheets, expense tracking. Ask Julius to identify trends, compare periods, calculate growth rates, flag anomalies.' },
            { name: 'Academic datasets', desc: 'Public datasets from Kaggle, UCI ML Repository, government data portals. Upload and explore. Ask about distributions, correlations, summary statistics — the kinds of analyses required in data science courses.' },
            { name: 'PDF tables', desc: 'Julius extracts tables from PDF documents. Annual reports, research papers, government statistics with data in PDF form. Ask questions about the extracted data.' },
            { name: 'Time series data', desc: "Data with date columns. Ask: 'Show monthly trends', 'Which year had the best performance?', 'Plot sales over the past 12 months with a trend line.'" },
          ]} />
        </Block>

        {/* Types of analysis */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Types of analysis Julius handles" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Descriptive statistics', badge: 'Most used', body: "'Give me summary statistics for all numeric columns' gives you a complete statistical overview of your dataset in seconds. Mean, median, standard deviation, count, percentages, distributions — instantly." },
            { label: 'Visualization', badge: 'Strongest feature', body: 'Bar charts, line charts, scatter plots, histograms, heatmaps, pie charts. Specify exactly what you want or let Julius choose the right chart type. Professional quality matplotlib/seaborn output.' },
            { label: 'Correlation and comparison', badge: 'Great for research', body: "'Is there a correlation between X and Y?' — Julius calculates Pearson or Spearman correlation and shows a scatter plot. 'Compare group A vs group B' — Julius runs comparison tests." },
            { label: 'Filtering and segmentation', badge: 'Operational analysis', body: "'Show me only sales from Q4', 'Filter to customers who spent more than ₹10,000', 'Group by region and calculate totals for each'. Subset and summarize data without knowing pandas syntax." },
          ]} />
        </Block>

        {/* Using Julius effectively */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Using Julius effectively" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Start with exploration', body: "Upload your file and first ask: 'Describe this dataset. What columns does it have, what are the data types, and how many rows?' Julius gives you an overview that shapes better follow-up questions." },
            { n: '2', title: 'Ask specific questions', body: "Vague: 'analyze this data'. Specific: 'What are the top 5 products by total revenue? Show as a bar chart sorted descending.' The more specific your question, the more useful the answer." },
            { n: '3', title: 'Ask for visualizations explicitly', body: "Julius can produce text answers or charts. Explicitly request: 'show as a bar chart', 'plot as a time series', 'create a heatmap of correlations'. Visualizations communicate patterns that tables cannot." },
            { n: '4', title: 'View and learn from the code', body: "Click 'View Code' on any response to see the Python/pandas code Julius wrote. Copy it. Run it in Jupyter to verify. Modify it. This is how you learn pandas — by reading working code that solves your actual problem." },
            { n: '5', title: 'Build on previous answers', body: "Julius remembers the conversation. 'Now filter that to only include rows where revenue > 10000 and redo the chart.' Iterative analysis through conversation is more natural than writing code." },
          ]} />
        </Block>

        {/* Julius vs alternatives */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Julius vs ChatGPT Code Interpreter" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Julius', badge: 'Purpose-built for data', body: 'Designed specifically for data analysis. Cleaner interface for data workflows. Better file management. Results organized by conversation. Free tier available. Faster for the specific workflow of upload → analyze → visualize → iterate.' },
            { label: 'ChatGPT Plus Code Interpreter', badge: 'More general purpose', body: 'Full GPT-4o plus code execution. More powerful for complex multi-step tasks. Handles non-data tasks in the same session. $20/month. Better when you need the full ChatGPT Plus feature set, not just data analysis.' },
            { label: 'Google Colab + AI', badge: 'Full control, more work', body: 'Free Jupyter notebooks with AI code assistance (Gemini or Copilot). Maximum control — you see and modify all code. More setup and learning curve. Best when you need to build reusable analysis scripts rather than one-off interactive analysis.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Analyze any CSV or Excel file by asking questions in plain English — no Python or SQL required',
            'Generate professional data visualizations (bar charts, scatter plots, heatmaps) from natural language descriptions',
            'Explore academic datasets and research data without writing pandas code',
            'Learn pandas and data analysis by studying the working Python code Julius generates for your questions',
            'Turn survey results, academic data, or financial spreadsheets into actionable insights in minutes',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Analyze a Real Dataset</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Find a dataset on Kaggle (kaggle.com/datasets — thousands of free datasets on any topic: sports, movies, finance, health, cities). Download as CSV. Upload to Julius. Ask 10 analytical questions: 3 descriptive (summary stats, distributions), 3 comparison (A vs B, top/bottom N), 3 visualization (plot X over time, show correlation between Y and Z), and 1 insight question (what is the most interesting pattern in this data?). Save the most interesting chart.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Find a dataset you care about', body: 'Kaggle.com/datasets → search any topic that interests you. Sports statistics, movie ratings, Indian census data, stock prices, cricket scores. Choose a CSV dataset under 100MB. Download it.' },
            { n: '2', title: 'Start with exploration', body: "Upload to Julius (julius.ai). First message: 'Describe this dataset — columns, data types, row count, missing values.' Read Julius's response to understand the data before diving into analysis." },
            { n: '3', title: 'Ask your 10 questions', body: "Work through your questions. For each, check: is the answer numerically correct? Does the chart show what you expected? Click 'View Code' on the most interesting responses." },
            { n: '4', title: 'Export and learn', body: 'Download the most interesting chart. Copy the Python code from at least 3 responses. Paste into a Jupyter notebook. Run it to verify it works. Now you have working pandas code you understand because you watched it being produced.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: Free tier — limited analyses per month on julius.ai</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>When Julius gives you a chart or result that is almost right but needs a small adjustment, describe the change rather than starting over: 'Add a title to that chart saying "Monthly Revenue by Region"' or 'Change the x-axis label to show months as Jan, Feb, Mar instead of 1, 2, 3'. Julius modifies the code and re-runs it. This iterative refinement is faster than trying to get the perfect chart in one prompt.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/vector/pinecone')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Pinecone
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/data/code-interpreter')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Code Interpreter <ChevronRight size={14} />
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
