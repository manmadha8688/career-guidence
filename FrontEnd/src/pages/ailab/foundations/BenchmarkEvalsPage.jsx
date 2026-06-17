import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, P, CardGrid } from '../helpers'

const CYAN = '#00D9FF'
const color = '#F59E0B'

export default function BenchmarkEvalsPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg   = dark ? '#020817' : '#F0F4FF'
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>AI Foundations</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>📏</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Benchmarks & Evals — How to Measure AI Model Quality</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>MMLU, HumanEval, SWE-bench, LMSYS Arena — what they test and what they miss</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['crfm.stanford.edu/helm', color], ['AI Foundations', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Every week a new AI model claims to be "the best" — but best at what? Benchmarks are standardized tests that let you compare models fairly: same questions, same conditions, same scoring. Understanding the 5 major benchmarks — MMLU, HumanEval, SWE-bench, HELM, and LMSYS Chatbot Arena — tells you how to read model release announcements without being misled by cherry-picked numbers. More importantly, understanding their limitations tells you when benchmark scores predict real performance and when they do not. For anyone building with AI or choosing between models for a project, this is the tool literacy that separates informed decisions from marketing-driven ones.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'The Best AI Model...According To What??', url: 'https://www.youtube.com/watch?v=fCJeLK8bIeQ', dur: null, note: 'Best explainer on AI benchmarks and what they really measure' },
            { label: 'AI Benchmarks Explained — How to Compare LLMs', url: 'https://www.youtube.com/watch?v=MZb3H8PBNaU', dur: null, note: 'Benchmark explainer' },
            { label: 'How AI Leaderboards Are Gamed — LMSYS Arena Explained', url: 'https://www.youtube.com/watch?v=FqxGW3S_E8E', dur: null, note: 'Covers LMSYS, Elo, limitations' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Why benchmarks exist */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why benchmarks exist" color={color} />
          <InfoBox color={color} dark={dark}>Before benchmarks, comparing AI models meant running your own experiments — expensive, slow, and non-reproducible. Benchmarks solve this by defining a fixed test set that any researcher can run. A benchmark score is the output of: model + settings + test harness + scoring function. Change any variable and the score changes. This is why "best on benchmark X" is a specific, narrow claim — not a general verdict.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The 5 major benchmarks you will see cited in every model announcement each measure something different. MMLU measures general knowledge breadth. HumanEval measures whether code runs correctly. SWE-bench measures whether the model can fix real software bugs. HELM measures safety, fairness, and multiple dimensions at once. LMSYS Chatbot Arena measures which model humans actually prefer in conversation. None of them measures "overall intelligence" — and any claim to that effect is a marketing statement, not a technical one.</p>
        </Block>

        {/* The 5 benchmarks */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="The 5 benchmarks you need to know" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'MMLU — 57 subjects, 15,908 questions', body: 'Massive Multitask Language Understanding. 4-option multiple choice across math, physics, chemistry, history, law, medicine, ethics, and 51 other subjects. Tests world knowledge from pre-training. Status in 2025: SATURATED — top models exceed 90%, making score differences statistically meaningless. MMLU-Pro was created as a harder successor with more complex, multi-step questions.' },
            { n: '2', title: 'HumanEval — 164 Python coding problems', body: 'Created by OpenAI. Models must write Python code that passes unit tests. Metric: pass@1 — does a single attempt produce working code? Status in 2025: Most frontier models exceed 85% — discriminating power is largely lost. HumanEval+ was created with more rigorous test cases. Key insight: it only tests Python, only 164 problems, and only single-function tasks — not full application code.' },
            { n: '3', title: 'SWE-bench — real GitHub issues, real codebases', body: 'Princeton NLP. Given a real GitHub repository and a bug report, can the AI fix the codebase? SWE-bench Verified has 500 confirmed-solvable problems — the gold standard. In 2023, top models solved 4.4%. By 2025, top models reached 80-95% on Verified. But SWE-bench Pro (harder, gaming-resistant version): the same models score only 46-58%. The gap between Verified and Pro reveals how much of the high scores come from gaming the test.' },
            { n: '4', title: 'HELM — 42 scenarios, 7 dimensions', body: "Stanford's Holistic Evaluation of Language Models. Evaluates accuracy, calibration (does it know what it doesn't know?), robustness, fairness, bias, toxicity, and efficiency — all in one framework. The key difference: no single score. HELM produces a multi-dimensional profile. A model can be excellent on accuracy but poor on toxicity. This is why HELM matters for safety-conscious applications: crfm.stanford.edu/helm" },
            { n: '5', title: 'LMSYS Chatbot Arena — 6M+ human votes', body: 'Real humans compare two anonymous AI models side by side and vote for the better response. Uses Elo rating (borrowed from chess) — beating a stronger model gains more points. Trusted because human preference is harder to game than automated tests: you cannot "train your model on the human vote data" the way you can contaminate other benchmarks. 6+ million votes as of 2025. Limitation discovered: labs submit only their best variants, inflating proprietary scores by up to 112 Elo points.' },
          ]} />
        </Block>

        {/* How to use benchmarks */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How to use benchmarks to choose a model" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Coding tasks', desc: 'Check SWE-bench Verified (real bug fixing) and HumanEval+ (function writing). A model that scores 80% on Verified handles more complex code than one at 50%. Also check the model\'s specific language — most benchmarks test Python primarily.' },
            { name: 'Reasoning and knowledge', desc: 'Check MMLU-Pro (harder than original MMLU) and GPQA Diamond (PhD-level science). For general Q&A tasks, LMSYS Arena Elo is a better predictor than MMLU since it measures real-world conversation quality.' },
            { name: 'Safety and fairness', desc: 'Check HELM. It explicitly measures toxicity, bias, and fairness alongside accuracy. If your application serves diverse users or handles sensitive topics, HELM scores matter more than accuracy benchmarks alone.' },
            { name: 'Conversational quality', desc: 'Check LMSYS Chatbot Arena Elo. This is the most human-predictive benchmark for chat applications. A model with high Arena Elo actually produces responses humans prefer — which is what matters for user-facing products.' },
            { name: 'Math and science', desc: 'GPQA Diamond (expert-level multiple choice science) and AIME (math competition problems) are the current hardest reasoning benchmarks. MMLU is now too easy to differentiate top models on these tasks.' },
            { name: 'Your actual task', desc: 'Run your own evaluation. Take 20-50 representative examples from your real use case. Score them manually. The model that scores best on YOUR data is more relevant than any public benchmark. Always verify on your own data before production.' },
          ]} />
        </Block>

        {/* Limitations */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="The limitations — why benchmark scores mislead" color="#EF4444" />
          <Compare dark={dark} border={border} color="#EF4444" items={[
            { label: "Goodhart's Law", badge: 'The fundamental problem', body: "When a benchmark becomes a target, it stops being a good measure. As soon as a benchmark is widely used, AI labs optimize their training for it — either deliberately (training on similar questions) or unintentionally (training on data that includes the test questions). A model that scores 92% on MMLU may have absorbed MMLU questions during training, not actually know the subjects better." },
            { label: 'Data contamination', badge: 'Quietly inflating scores', body: 'Test questions leak into training data. StarCoder-7B scored 4.9x higher on contaminated benchmark data versus clean data — on the same model, just from data leakage. GPT-3 series showed ~20 percentage point inflation on contaminated benchmarks. Training corpora are now so large that even AI labs cannot always verify what is inside them.' },
            { label: 'Benchmark saturation', badge: 'Scores stop meaning anything', body: 'MMLU and HumanEval no longer distinguish frontier models — everyone exceeds 90% and 85% respectively. This forces researchers to create progressively harder benchmarks. Humanity\'s Last Exam was created in 2025 specifically because GPT-5 and Claude 4 were approaching 100% on everything else.' },
            { label: 'Real-world performance gap', badge: 'The 37% gap', body: 'Enterprise AI systems show a 37% gap between benchmark scores and real deployment performance. When GPT-4 launched and dominated every benchmark, engineers discovered smaller "inferior" models often outperformed it on specific production tasks at a fraction of the cost. SWE-bench Verified (80-95%) vs SWE-bench Pro (46-58%) on the same models illustrates exactly this gap.' },
          ]} />
        </Block>

        {/* Reading a model announcement */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Reading a model announcement without being misled" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Ask: which benchmark, which subset?', body: '"State-of-the-art on coding" could mean HumanEval (easy), HumanEval+ (harder), or SWE-bench Verified (hard). The specific benchmark matters enormously. Always look for the exact test name and variant — not just the category.' },
            { n: '2', title: 'Ask: what is the comparison set?', body: 'A model that is "best on HumanEval" might only be compared to models from 6 months ago. Check the publication date of the leaderboard and what models were included. A benchmark table with only 5 models is different from one with 50.' },
            { n: '3', title: 'Cross-reference multiple benchmarks', body: 'No single benchmark captures general capability. A model that leads on coding (SWE-bench) may lag on conversation quality (LMSYS Arena). Check at least 2-3 benchmarks relevant to your use case. Sites like lmsys.org/leaderboard and llm-stats.com aggregate across benchmarks.' },
            { n: '4', title: 'Test on your own data', body: 'Public benchmarks are a starting point, not a verdict. Every serious engineering team evaluates models on their own representative examples before choosing one for production. Take 20-50 real examples from your task, run each candidate model, score manually. This 2-hour investment prevents months of wrong-model regret.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do after understanding this" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Read any model announcement and understand exactly what "state-of-the-art" means and what it doesn\'t',
            'Use LMSYS Chatbot Arena to compare models directly on your own prompts with human-quality feedback',
            'Choose the right benchmark to evaluate a model for your specific task (coding → SWE-bench, safety → HELM, conversation → Arena)',
            'Identify when a benchmark score is likely inflated by data contamination or cherry-picking',
            'Run a basic model evaluation on your own data before committing to any AI model in production',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}`, marginBottom: '0.5rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 7 }} />
              <span style={{ fontSize: '0.85rem', color: sub, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </Block>

        {/* Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Run a Mini Evaluation</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Pick one task you want to use AI for (code explanation, essay improvement, math tutoring, summarization, anything real). Write 10 test examples with your ideal output for each. Run all 10 through 3 different models (use free tiers: ChatGPT free, Claude free, Gemini free). Score each output 1-5 yourself. Calculate average per model. Which won? Did the "best benchmark model" actually win on your task? Write 3 sentences on what you learned about benchmark scores vs. your actual preferences.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Choose a task and write 10 examples', body: 'Pick a task you actually need. Write 10 inputs that represent real questions you would ask. For each, write what an ideal output looks like — your rubric. This is harder than it sounds. Good evaluation examples are specific, not generic.' },
            { n: '2', title: 'Score your rubric: what makes a 5?', body: 'Define what 1-5 means for YOUR task before you run the models. For code explanation: 5 = explains every line accurately, 3 = mostly right but misses one concept, 1 = confusing or wrong. Rubric first, then evaluation.' },
            { n: '3', title: 'Run all 10 prompts through 3 models', body: 'Use the free tiers. Open 3 browser tabs. Same prompt to each. Copy responses into a spreadsheet. Score immediately while the quality difference is fresh. Do not score in batches days later.' },
            { n: '4', title: 'Compare your results to public benchmarks', body: 'Check LMSYS Arena Elo for your 3 models (lmsys.org/leaderboard). Did the higher Elo model win your evaluation? If not, why? This analysis builds genuine intuition about when benchmarks predict real performance and when they fail.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — ChatGPT free + Claude free + Gemini free</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>The most useful benchmark for students is not MMLU or HumanEval — it is your own evaluation on your own tasks. Public benchmarks are designed for researchers who need standardized comparison. You need something more specific: does this model handle my actual use case well? A 20-prompt personal evaluation takes 2 hours and tells you more than reading 10 model cards.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/foundations/model-training')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ArrowLeft size={14} /> Model Training
          </button>
          <button onClick={() => navigate('/ai-lab/chatbots/chatgpt')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            ChatGPT <ChevronRight size={14} />
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
    <a href={v.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1.125rem', borderRadius: 11, textDecoration: 'none', background: dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.16)', marginBottom: '0.625rem', transition: 'background 0.15s' }}
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
