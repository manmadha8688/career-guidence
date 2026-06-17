import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const ACCENT = '#6366F1'
const color   = '#6366F1'

export default function LangfusePage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark   = theme !== 'light'
  const bg     = dark ? '#020817' : '#F0F4FF'
  const card   = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(99,102,241,0.10)' : 'rgba(99,102,241,0.13)'
  const txt    = dark ? '#E2E8F0' : '#0F172A'
  const sub    = dark ? '#94A3B8' : '#475569'
  const muted  = dark ? '#64748B' : '#94A3B8'

  return (
    <div style={{ minHeight: '100vh', background: bg, color: txt, fontFamily: "'Rajdhani', sans-serif", overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, borderRadius: '50%', background: `radial-gradient(ellipse, ${color}07 0%, transparent 65%)`, filter: 'blur(60px)' }} />
      </div>

      <nav style={{ position: 'sticky', top: 0, zIndex: 50, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', background: dark ? 'rgba(2,8,23,0.93)' : 'rgba(240,244,255,0.95)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${border}` }}>
        <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.72rem', letterSpacing: '0.1em', color: ACCENT, padding: 0 }}>
          <ArrowLeft size={14} /> AI Lab
        </button>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Data & Observability</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>📡</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Langfuse — Observability for LLM Applications</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Trace, debug, and monitor your AI in production — open source</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['langfuse.com', color], ['Open Source', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Langfuse is the leading open-source LLM engineering platform. When you build an AI application — a chatbot, a RAG pipeline, an autonomous agent — things break in production in ways you cannot reproduce locally. A prompt returns garbage for one user but works fine in testing. A chain takes 12 seconds on some queries and 0.8 seconds on others. An agent loops or skips a step. Langfuse gives you full visibility into every LLM call, tool invocation, retrieval step, and token spent — in real time. It was backed by Y Combinator (W23) and acquired by ClickHouse in January 2026, cementing it as the production-grade standard for LLM observability.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: '10 min Walkthrough of Langfuse — Observability, Evaluation, Prompt Management', url: 'https://www.youtube.com/watch?v=2E8iTvGo9Hs', dur: '~10 min', note: 'Best first watch — covers Dashboard, Tracing, Evaluation, Prompts, Datasets all in one' },
            { label: 'LangFuse Full Setup & Tutorial — Debug, Trace & Improve Your AI App', url: 'https://www.youtube.com/watch?v=pN9sF1KgiAI', dur: '~20 min', note: 'Full hands-on setup: install SDK, send your first trace, inspect it in the UI' },
            { label: 'Langfuse Tutorial | MLOps for LLMs — Trace, Compare & Score Prompt Variants', url: 'https://www.youtube.com/watch?v=wj--ViUHR_0', dur: '~18 min', note: 'MLOps angle — compare prompt versions in production, score outputs, build evaluation pipelines' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What Langfuse is */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What Langfuse is" color={color} />
          <InfoBox color={color} dark={dark}>Langfuse is an open-source LLM observability platform — the equivalent of Datadog or New Relic, but built specifically for AI applications. Where traditional monitoring tracks server CPU and HTTP response times, Langfuse tracks what matters for LLMs: which prompt was sent, what the model responded, how many tokens were used, what it cost, how long each step took, and whether the output was good or bad. Every AI call in your application becomes a visible, inspectable trace.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The key insight: production AI failures are invisible without observability. A user reports "the AI gave a wrong answer" — but without Langfuse, you have no record of what prompt was actually sent, what context was retrieved, what the model received, or what it output. With Langfuse, every call is captured. You click into the trace, see the full prompt, the retrieved documents, the model's response, the latency breakdown, and any evaluation scores. You can reproduce the failure exactly and fix it. This is why observability is considered non-optional for serious AI production deployments.</p>
        </Block>

        {/* Key features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Key features" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Distributed Tracing', desc: 'Captures the full call chain for every AI request — from the user message through each retrieval step, LLM call, tool use, and final response. Hierarchical traces show parent/child relationships so you see exactly where time is spent and where failures occur.' },
            { name: 'LLM-as-a-Judge Evaluation', desc: 'Automatically evaluate the quality of every LLM output using another LLM as a judge. Define criteria (correctness, helpfulness, toxicity) and Langfuse scores every production trace. No manual reviewing of thousands of responses.' },
            { name: 'Prompt Management', desc: 'Version-control your prompts in Langfuse and deploy them without code changes. Roll back a bad prompt instantly. See exactly which prompt version produced which trace. A/B test prompt variants in production and compare quality scores.' },
            { name: 'Cost & Token Dashboards', desc: 'Real-time dashboards showing total spend, cost per user, cost per trace, tokens per model, and cost trends over time. Set alerts when spending exceeds thresholds. Essential for keeping AI application costs predictable at scale.' },
            { name: 'Datasets & Experiments', desc: 'Build evaluation datasets from your production traces — curate a set of challenging real examples. Run any new prompt version or model against the dataset to compare quality before deploying. Benchmark-driven development for AI.' },
            { name: 'Session Tracking', desc: 'Group related traces into sessions to see a full multi-turn conversation. Track which users generate the most traces, have the longest sessions, or encounter the most errors. User-level analytics for AI applications.' },
          ]} />
        </Block>

        {/* How it works */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How Langfuse works" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Instrument your code with the SDK', body: 'Install the Langfuse Python or JS SDK. For OpenAI, swap one import: replace `from openai import OpenAI` with `from langfuse.openai import OpenAI`. That single change instruments every OpenAI call automatically — no further code changes needed.' },
            { n: '2', title: 'SDK wraps your LLM calls', body: 'Every LLM call, embedding request, or tool invocation is intercepted by the SDK. It records: the full prompt, the model used, the completion, input/output token counts, latency, and any metadata you attach (user ID, session ID, custom attributes).' },
            { n: '3', title: 'Data is sent to Langfuse server', body: 'The recorded data is sent asynchronously (no impact on latency) to Langfuse Cloud or your self-hosted instance. Langfuse stores traces in ClickHouse (a columnar database optimized for analytical queries over billions of rows).' },
            { n: '4', title: 'Inspect traces in the UI', body: 'Open the Langfuse dashboard. Every AI call in your application is now visible — you can search by user, session, error status, cost, latency, or any custom metadata. Click into any trace to see the full prompt, context, response, and timing breakdown.' },
            { n: '5', title: 'Evaluate and iterate', body: 'Set up automated evaluators (LLM-as-a-judge, regex checks, custom functions) to score every production trace. Monitor quality over time. When you change a prompt, compare scores before and after. Use datasets to validate improvements before deploying.' },
          ]} />
        </Block>

        {/* Integrations */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Integrations — works with everything" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'OpenAI SDK', badge: 'Drop-in replacement', body: 'One import change: `from langfuse.openai import OpenAI`. All subsequent OpenAI calls (chat completions, embeddings, function calling) are automatically traced. Works with gpt-4o, o1, o3-mini, any current or future OpenAI model.' },
            { label: 'LangChain & LangGraph', badge: 'Callback handler', body: 'Pass `CallbackHandler()` from the Langfuse SDK when initializing your LangChain chain or LangGraph agent. Every node execution, tool call, and LLM call inside the chain is automatically captured as a hierarchical trace.' },
            { label: 'LiteLLM', badge: 'Universal proxy', body: 'Langfuse integrates natively with LiteLLM — the universal LLM proxy that routes to 100+ models. Add Langfuse as a callback and you get observability across every model provider (Anthropic, Google, Mistral, Cohere) in a single dashboard.' },
            { label: 'OpenTelemetry', badge: 'Any framework', body: 'Langfuse supports the OpenTelemetry standard. Any framework that exports OpenTelemetry traces (LlamaIndex, Haystack, CrewAI, custom frameworks) can send data to Langfuse — future-proof instrumentation without vendor lock-in.' },
          ]} />
        </Block>

        {/* Free tier / self-host */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Free tier and self-hosting" color={color} />
          <InfoBox color={color} dark={dark}>Langfuse Cloud has a free Hobby plan with 50,000 observations per month — enough to instrument a personal project, a hackathon app, or a university research project and see every trace in the UI. No credit card required. For production workloads, paid plans scale from $0 to enterprise. Self-hosting is fully supported and battle-tested: run Langfuse on your own server with Docker Compose in under 5 minutes. The entire codebase is open source on GitHub (MIT license).</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The self-hosting option is significant: large organizations with data privacy requirements can run Langfuse entirely within their own infrastructure. All traces stay on-premises. The Langfuse team actively maintains the self-hosted deployment path, with one-command Docker Compose and Kubernetes Helm chart options. For students, the Langfuse Cloud free tier is the easiest way to start — sign up, get your API keys, and see your first trace in the UI within 5 minutes of installing the SDK.</p>
        </Block>

        {/* Why it matters */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why LLM observability matters in production" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Debugging without Langfuse', badge: 'Blind', body: 'User reports bad AI response. You have no record of what prompt was sent, what context was retrieved, or what the model saw. You try to reproduce it manually. You cannot. You ship a guess fix and hope it works. This is how most student AI projects fail in production.' },
            { label: 'Debugging with Langfuse', badge: 'Visible', body: "User reports bad AI response. You search for the trace in Langfuse. You see the exact prompt, retrieved documents, model response, token count, and latency. You identify the bad retrieval step — a document with wrong content was fetched. You fix the retrieval logic. Problem solved." },
            { label: 'Cost monitoring', badge: 'Essential at scale', body: "Without observability, you discover your AI app spent $500 on GPT-4o at the end of the month. With Langfuse dashboards, you see cost per trace in real time. You identify that one user's session used 40,000 tokens in a loop. You add a guard. You save money." },
            { label: 'Quality tracking over time', badge: 'Engineering discipline', body: 'You change a prompt. Did it get better or worse? Without Langfuse, you do manual spot-checks. With Langfuse evaluation, automated quality scores tell you immediately whether the new prompt improved or degraded quality across all production traces.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Trace every LLM call in a Python or JavaScript AI application with a single import change',
            'Debug production AI failures by inspecting the full prompt, retrieved context, and model response for any trace',
            'Monitor token costs in real time and get alerted when spending spikes unexpectedly',
            'Version-control prompts and compare quality scores between versions before deploying changes',
            'Build evaluation datasets from production traces and automatically score LLM outputs using LLM-as-a-judge',
            'Integrate with LangChain, LangGraph, OpenAI SDK, LiteLLM, or any OpenTelemetry-compatible framework',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Add Observability to an AI App</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Take any Python script that calls OpenAI (even a 10-line demo). Instrument it with Langfuse. Make 5–10 calls with different prompts. Open the Langfuse UI and explore every trace. This exercise gives you hands-on experience with LLM observability — a skill that senior AI engineers consider essential and that most bootcamp graduates lack entirely.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Sign up and get API keys', body: 'Go to cloud.langfuse.com. Create a free account (no credit card). Create a new project. Copy your Public Key and Secret Key from the project settings.' },
            { n: '2', title: 'Install and configure the SDK', body: 'pip install langfuse openai. Set environment variables: LANGFUSE_PUBLIC_KEY, LANGFUSE_SECRET_KEY, LANGFUSE_HOST=https://cloud.langfuse.com, OPENAI_API_KEY. The SDK reads these automatically.' },
            { n: '3', title: 'One-line instrumentation for OpenAI', body: "Change `from openai import OpenAI` to `from langfuse.openai import OpenAI`. That's it. Every subsequent call to OpenAI is now traced. Run your script and make a few completions." },
            { n: '4', title: 'Explore traces in the UI', body: 'Go to cloud.langfuse.com → your project → Traces. You should see your calls. Click into a trace: see the full prompt, the model, the response, token usage, latency, and cost estimate. This is what your AI app is doing — now visible.' },
            { n: '5', title: 'Add metadata to traces', body: "Pass user_id and session_id to group traces: `openai.chat.completions.create(..., name='my-feature', metadata={'user': 'user-123'})`. Now you can filter traces by user or session in the dashboard — production-grade observability." },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: Free — Langfuse Cloud hobby plan (50k observations/month)</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Add Langfuse to every AI project you build, even small demos. When you show your portfolio to a hiring manager, being able to say "I instrumented this app with Langfuse and here are the production traces, cost dashboards, and evaluation scores" separates you from 95% of candidates who just show the UI. Observability demonstrates that you think about production, not just demos. The free tier is generous enough that there is zero reason not to add it.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/data/code-interpreter')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Code Interpreter
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${ACCENT}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: ACCENT, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/data/modal')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Modal <ChevronRight size={14} />
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
