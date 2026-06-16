import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#F97316'

export default function DifyPage() {
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Automation</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🎯</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Dify — The LLMOps Platform for Building AI Applications</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>From prompt to production — build, test, and deploy AI apps</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE cloud tier', '#4ADE80'], ['Self-host option', color], ['LLMOps platform', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Dify is an open-source LLMOps (Large Language Model Operations) platform — it combines a visual workflow builder, a prompt engineering IDE, a RAG knowledge base manager, model management, and observability into one platform. Where Flowise focuses on building LangChain flows visually, Dify is a complete production platform: you build your AI application in Dify's visual editor, manage your knowledge bases (upload documents, configure chunking, test retrieval), monitor performance in production, and deploy a shareable web app or API — all in one tool. The free cloud tier at cloud.dify.ai gives you a fully hosted platform with 200 API calls per day. Self-hosting gives you unlimited usage.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Dify Tutorial — Build AI Applications Without Code', url: 'https://www.youtube.com/watch?v=tD6fwQyUIJE', dur: '22 min', note: 'Complete platform introduction' },
            { label: 'Dify RAG Knowledge Base — Setup and Optimization', url: 'https://www.youtube.com/watch?v=Y0GKB4Uo-VQ', dur: '16 min', note: 'Knowledge base deep dive' },
            { label: 'Dify vs Flowise — Which is Better for AI App Building?', url: 'https://www.youtube.com/watch?v=0lnCFTAmgaE', dur: '12 min', note: 'Clear comparison' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What makes Dify a platform, not just a tool */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What makes Dify a platform, not just a tool" color={color} />
          <InfoBox color={color} dark={dark}>Dify covers the full LLMOps lifecycle: Build (visual workflow + prompt IDE), Test (A/B test prompts, evaluate retrieval quality), Deploy (shareable web app, embeddable widget, API endpoint), Monitor (token usage, response latency, conversation logs), and Improve (fine-tune prompts based on production feedback). Most tools cover one of these — Dify covers all five in one interface.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The knowledge base management is Dify's most practical differentiator. Upload documents, and Dify handles chunking, embedding (using your choice of embedding model), and vector storage — with a UI to configure every parameter and test retrieval quality before connecting to your application. You can see exactly which chunks a query retrieves and why, and adjust chunking settings until retrieval is accurate. This level of RAG debugging is difficult to build yourself and rare in other visual tools.</p>
        </Block>

        {/* Core platform features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Core platform features" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Workflow builder', desc: 'Visual canvas to build multi-step AI pipelines. Nodes for LLM calls, knowledge retrieval, HTTP requests, code execution, conditional branching, variable passing. More powerful than Flowise for complex pipelines.' },
            { name: 'Knowledge base (RAG)', desc: 'Upload PDFs, web pages, Notion, GitHub. Configure chunking strategy and size. Choose embedding model. Test retrieval quality before deploying. Full control over the RAG pipeline.' },
            { name: 'Prompt IDE', desc: 'Write, test, and version-control prompts. Side-by-side comparison of different prompt versions. A/B test prompts with real queries. The most important AI engineering tool most people skip.' },
            { name: 'Model management', desc: 'Connect multiple LLM providers: OpenAI, Anthropic, Groq, Azure OpenAI, Ollama (local). Switch models in your application from the model settings without changing application code.' },
            { name: 'App deployment', desc: 'Deploy as: shareable web app (Dify hosts it), embeddable chat widget, or REST API. Any app built in Dify is instantly deployable to a public URL on the free cloud tier.' },
            { name: 'Observability', desc: 'Every production query is logged: input, output, model used, tokens consumed, latency, retrieved knowledge chunks. Essential for debugging production issues and optimizing costs.' },
          ]} />
        </Block>

        {/* Building a knowledge base app */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Building a knowledge base app" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Create a Dify account', body: 'cloud.dify.ai → Sign up free. The free tier gives you 200 API calls per day, access to all features, and hosted deployment. No credit card required.' },
            { n: '2', title: 'Create a knowledge base', body: 'Knowledge → Create Knowledge → Upload your documents (PDF, TXT, MD, HTML). Configure: chunking strategy (by paragraph or fixed size), chunk size (800-1000 recommended), overlap (100). Choose embedding model.' },
            { n: '3', title: 'Test retrieval quality', body: 'In the knowledge base settings, use the Retrieval Testing panel. Type queries and see exactly which chunks are returned. This is RAG debugging — adjust settings until the right chunks appear for your queries.' },
            { n: '4', title: 'Create a chatbot application', body: 'Studio → Create App → Chatbot. Connect your knowledge base as a context. Write a system prompt. Configure the LLM. Set context window settings.' },
            { n: '5', title: 'Deploy and share', body: 'Click Publish → deploy as a web app. Dify gives you a public URL immediately. Share the link — anyone can use your AI application through a clean chat interface.' },
          ]} />
        </Block>

        {/* Dify vs Flowise vs building from code */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Dify vs Flowise vs building from code" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Dify', badge: 'Full platform, production-ready', body: 'Complete lifecycle management: build, test, deploy, monitor. Knowledge base management with retrieval testing. Hosted cloud option. Best when you want a complete production platform without managing infrastructure. Cloud free tier is enough for projects and demos.' },
            { label: 'Flowise', badge: 'Simpler, developer-friendly', body: 'More direct LangChain visual mapping. Better for developers who know LangChain and want to skip code. Fewer production features (no built-in observability, no retrieval testing UI). Best for rapid prototyping and custom LangChain flows.' },
            { label: 'Custom Python code', badge: 'Maximum control', body: 'Full LangChain/LlamaIndex control. Write exactly what you need. Best for production systems with specific requirements, teams with Python expertise, and applications that need custom logic beyond what visual tools support.' },
          ]} />
        </Block>

        {/* Prompt engineering with Dify's IDE */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Prompt engineering with Dify's IDE" color={color} />
          <InfoBox color={color} dark={dark}>Most AI application failures are prompt failures, not model failures. Dify's Prompt IDE is one of the few tools that makes prompt testing systematic — you can run the same input through two different prompts side-by-side and see which produces better output. This replaces guessing with measurement.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Open the Prompt IDE', body: 'In any Dify app, open the prompt editor. You see the system prompt, example user messages, and the model response side-by-side. Edit and immediately test.' },
            { n: '2', title: 'Create comparison versions', body: 'Duplicate the prompt. Make one change in version B (different instruction, different format requirement, different persona). Run 5 test queries through both versions.' },
            { n: '3', title: 'Score and compare', body: 'For each test query, score both outputs 1-5 for quality. Calculate average. The version with higher average quality on your real queries is your better prompt — not the one that sounds better in theory.' },
            { n: '4', title: 'Version and deploy', body: 'Dify saves all prompt versions. Deploy the winning version. If it underperforms in production, roll back to the previous version. This is professional prompt management.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Build and deploy a production AI application with knowledge base, monitoring, and web UI in one day',
            "Test RAG retrieval quality visually — see exactly which document chunks your queries retrieve before deploying",
            'A/B test different prompts on real queries to find the highest-quality version systematically',
            "Deploy a shareable web application from Dify's cloud without managing any servers",
            'Monitor production AI usage: token costs, latency, conversation logs, retrieval quality',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build and Deploy a Study Assistant</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Create a Dify knowledge base app for a subject you're studying. Upload 5-10 relevant documents (notes, textbook sections, research papers). Test retrieval quality on 10 questions before connecting to the chatbot. Deploy as a public web app. Share with 3 classmates and collect feedback on answer quality. Use Dify's conversation logs to see which questions performed worst and improve your knowledge base and prompt based on real usage data.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Create account and knowledge base', body: 'cloud.dify.ai → free signup. Create a Knowledge Base. Upload your study documents. Use chunk size 800, overlap 100. Test retrieval with 10 questions about your content.' },
            { n: '2', title: 'Fix retrieval issues first', body: 'Before building the chatbot, spend time in the retrieval testing panel. If important chunks are not appearing for obvious queries, adjust chunking strategy. Getting retrieval right is 70% of RAG quality.' },
            { n: '3', title: 'Build and prompt the chatbot', body: "Create a Chatbot app. Connect your knowledge base. System prompt: 'You are a study assistant for [subject]. Answer questions using only the provided knowledge base. If information is not in the knowledge base, say so clearly.'" },
            { n: '4', title: 'Deploy and collect feedback', body: "Publish → get the public URL. Share with classmates. After 50+ conversations, review the conversation logs in Dify's analytics. Identify the 5 queries with the worst answers and improve those knowledge base entries." },
          ]} />
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>The single most impactful thing you can do to improve a Dify RAG application is improve your source documents, not your prompt. If a knowledge base answer is wrong or incomplete, check whether the relevant information is actually in your uploaded documents. Often the document has the information but it was split across chunk boundaries, or the information is vague and needs to be rewritten to be more explicit. Better source documents beat prompt engineering every time for RAG quality.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/automation/flowise')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Flowise
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/automation/zapier')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Zapier <ChevronRight size={14} />
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
