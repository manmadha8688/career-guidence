import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#F97316'

export default function FlowisePage() {
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🌊</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Flowise — Build LLM Apps Visually, No Code Required</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Drag-and-drop LangChain and LlamaIndex flows in your browser</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE self-host', '#4ADE80'], ['Visual LangChain', color], ['Open source', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Flowise is an open-source, self-hosted tool that lets you build LangChain and LlamaIndex applications visually — dragging and dropping nodes in a browser canvas instead of writing Python. Every LangChain concept has a visual node: ChatOpenAI, ConversationalRetrievalChain, ChromaDB, HuggingFaceEmbeddings, BufferMemory, AgentExecutor. Connect them on the canvas, configure settings in the panel, and your LLM application is running. Flowise can embed a chat widget on any website with one line of HTML. For students who understand the LangChain architecture but want to prototype rapidly — or who want to build and deploy AI chatbots without backend code — Flowise is exceptionally fast to get working results.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'FlowiseAI Masterclass: Build AI Agents (Beginner to Pro) — Leon van Zyl', url: 'https://www.youtube.com/watch?v=9TaRksXuLWY', dur: '~90 min', note: 'THE Flowise creator — official tutorial linked from Flowise docs' },
            { label: 'Flowise v3 Complete Tutorial: Build AI Agents WITHOUT Coding — Leon van Zyl', url: 'https://www.youtube.com/watch?v=SLVVDUIbIBE', dur: '~60 min', note: 'Latest v3 — updated agent flows, tools, and RAG pipelines' },
            { label: 'Flowise AI Tutorial #1: Build AI Apps With No Code — Leon van Zyl', url: 'https://www.youtube.com/watch?v=nqAK_L66sIQ', dur: '~35 min', note: 'Best starting point — install, setup, and first chatflow end to end' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What Flowise makes visual */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What Flowise makes visual" color={color} />
          <InfoBox color={color} dark={dark}>Flowise wraps LangChain and LlamaIndex in a visual interface. Every node on the canvas corresponds to a real LangChain class. When you drag a ChatOpenAI node and connect it to a ConversationChain node, Flowise is literally instantiating ChatOpenAI() and ConversationChain() behind the scenes. Understanding LangChain makes Flowise more powerful; Flowise makes LangChain more accessible.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The most practical feature for students is the embedded chatbot. After building a flow on the canvas, Flowise generates a simple API endpoint and an embeddable chat widget. Paste one script tag into any HTML page and your AI chatbot appears on that website. No backend code, no deployment complexity, no server setup beyond running Flowise. This is how you add AI to a portfolio project or demo website in under an hour.</p>
        </Block>

        {/* Core node categories */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Core node categories" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Chat Models', desc: 'ChatOpenAI, ChatAnthropic, ChatGroq, ChatOllama (local), ChatHuggingFace. Drag in the model you want, configure API key and settings. Swap models without changing anything else.' },
            { name: 'Vector Stores', desc: 'Chroma, Pinecone, Qdrant, Supabase, FAISS. Drag in your vector store, connect an embedding node and document loader. Your RAG database is configured.' },
            { name: 'Document Loaders', desc: 'PDF, Web Scraper, GitHub, Notion, Confluence, S3, Google Drive. Load documents from any source for indexing into your vector store.' },
            { name: 'Chains', desc: 'ConversationalRetrievalQAChain, LLMChain, APIChain, SQLDatabaseChain. Pre-built patterns for common use cases — drag the chain node and connect its components.' },
            { name: 'Agents', desc: 'ReAct Agent, OpenAI Function Agent, Conversational Agent. Give agents tools: Calculator, Web Browser, API Tool, custom tools. The agent decides which tools to use.' },
            { name: 'Memory', desc: 'BufferMemory, BufferWindowMemory, SummaryMemory. Connect to any chain to add conversation history. The memory node handles all persistence automatically.' },
          ]} />
        </Block>

        {/* Building a RAG chatbot in Flowise */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Building a RAG chatbot in Flowise" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install and open Flowise', body: 'npm install -g flowise\nflowise start\nOpen http://localhost:3000. Create a new Chatflow. The canvas is your workspace.' },
            { n: '2', title: 'Add document loader and text splitter', body: 'Drag PDF File Loader onto canvas. Drag Recursive Character Text Splitter. Connect loader → splitter. Upload your PDF in the loader node settings.' },
            { n: '3', title: 'Add embeddings and vector store', body: 'Drag HuggingFace Inference Embeddings (free) or OpenAI Embeddings. Drag Chroma vector store. Connect: splitter → embeddings → Chroma. Click Upsert in the Chroma node to index the document.' },
            { n: '4', title: 'Add the conversation chain', body: 'Drag ConversationalRetrievalQAChain. Drag ChatOpenAI (or ChatGroq for free). Drag BufferMemory. Connect: Chroma retriever → chain; ChatOpenAI → chain; BufferMemory → chain.' },
            { n: '5', title: 'Test and embed', body: 'Click the chat bubble icon to test. Type questions about your document. When satisfied: click </> Embed → copy the script tag → paste into any HTML page. Done.' },
          ]} />
        </Block>

        {/* Flowise API */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Flowise API — integrate with anything" color={color} />
          <InfoBox color={color} dark={dark}>Every Flowise chatflow automatically gets a REST API endpoint. Send a POST request with your question, get back the AI response. This means Flowise chatflows can power chatbots in React apps, mobile apps, Discord bots, or any system that can make HTTP requests — without writing any LangChain code.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Get the API endpoint', body: 'In your chatflow: API Endpoint tab → copy the endpoint URL. It looks like: http://localhost:3000/api/v1/prediction/{chatflow-id}' },
            { n: '2', title: 'Call from any application', body: 'POST request with body: {"question": "your question here", "overrideConfig": {}}. Response contains the answer. Works from curl, Python requests, JavaScript fetch, or any HTTP client.' },
            { n: '3', title: 'Deploy for production', body: 'Flowise deploys to Railway, Render, or any server with Docker in minutes. Once deployed to a public URL, your chatbot API and embed widget work from anywhere on the internet.' },
          ]} />
        </Block>

        {/* Flowise vs LangChain */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Flowise vs building LangChain directly" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Flowise (visual)', badge: 'Faster to prototype', body: 'Build and test a RAG chatbot in 20 minutes without writing code. Swap models and vector stores by changing one node. Great for prototyping, portfolio demos, and non-developer use. Limited for complex custom logic.' },
            { label: 'LangChain (code)', badge: 'More control', body: 'Full Python control over every parameter. Complex custom logic (multi-step reasoning, custom retrievers, advanced memory). Better for production systems with specific requirements. Higher initial time investment.' },
            { label: 'Which to use', badge: 'Start Flowise, graduate to code', body: 'Use Flowise to validate that your RAG design works — right chunking strategy, right retrieval, right model. Once it works visually, rewrite in LangChain code if you need custom behavior or want to understand deeply. Flowise removes architecture uncertainty fast.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Build a complete RAG chatbot over your own documents in 20 minutes with no code',
            'Embed an AI chatbot widget on any website with a single script tag',
            'Prototype different LangChain architectures visually before committing to code',
            'Connect 50+ LLM providers, vector stores, and document sources through drag-and-drop',
            'Deploy a production chatbot API to Railway or Render for free in under 30 minutes',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Portfolio Chatbot</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Build a chatbot that answers questions about you. Create a PDF with: your skills, experience, projects, education, and what you are looking for. Upload it to Flowise as a RAG chatflow. Configure it to answer questions like a professional assistant that knows your background. Embed the widget on your portfolio website. Test it by asking 10 questions a recruiter might ask. This is a real, deployable AI feature for your portfolio.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Write your knowledge document', body: 'Create a PDF about yourself: current skills and tech stack, projects with what you built and what you learned, education, what kind of roles you\'re seeking, your approach to learning. Be specific — the chatbot\'s quality depends on this document.' },
            { n: '2', title: 'Build the RAG flow', body: 'Install Flowise locally. Build the flow: PDF loader → text splitter → embeddings → Chroma → ConversationalRetrievalQAChain → ChatGroq (free). System message: \'You are a professional assistant helping recruiters learn about [Your Name]. Be accurate, professional, and enthusiastic.\'' },
            { n: '3', title: 'Test with recruiter questions', body: 'Ask: What technologies do you know best? What is your most significant project? Why would you be good for a backend role? Fix the document and system prompt based on answers that were wrong or incomplete.' },
            { n: '4', title: 'Embed on your portfolio', body: 'Get the embed script from Flowise. Add it to your portfolio HTML. Share with friends and mentors to get feedback on the quality of answers.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Flowise self-hosted free + Groq free tier + HuggingFace embeddings free</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Set a specific system message for your Flowise chatflow that defines the chatbot's persona, tone, and boundaries. Without a system message, the chatbot will answer any question using retrieved context but may drift off-topic. With a clear system message ('Only answer questions about [person]'s skills and background. If asked about other topics, politely redirect to their professional profile.'), the chatbot stays on-task and behaves predictably.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/automation/n8n')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> n8n
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/automation/dify')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Dify <ChevronRight size={14} />
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
