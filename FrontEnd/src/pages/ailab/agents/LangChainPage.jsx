import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#EC4899'

export default function LangChainPage() {
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Agents</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🔗</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>LangChain — The Standard Framework for LLM Applications</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Build chains, RAG pipelines, and agents with any LLM</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['Open source', color], ['Python & JS', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>LangChain is the most widely used framework for building applications on top of large language models. Where calling an LLM API directly gives you a single request-response, LangChain provides the building blocks for chaining multiple LLM calls, connecting to data sources, managing conversation memory, and building agents that can use tools. Released in 2022, it became the de facto standard for LLM application development — nearly every tutorial, course, and production RAG system you will encounter uses LangChain concepts if not LangChain directly. Version 0.3+ introduced LangChain Expression Language (LCEL), a declarative pipeline syntax that replaced the older, more verbose chain syntax. Understanding LangChain means understanding how production AI applications are structured.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'LangChain Master Class For Beginners 2024 — 20 Examples, LangChain v0.2', url: 'https://www.youtube.com/watch?v=yF9kGeSAi3M', dur: '~90 min', note: 'Most comprehensive beginner masterclass — LCEL, chains, agents, RAG' },
            { label: 'LangChain Crash Course for Beginners — freeCodeCamp', url: 'https://www.youtube.com/watch?v=lG7Uxts9SXs', dur: '~60 min', note: 'Full hands-on course — chains, agents, memory, and tools in Python' },
            { label: 'LangChain Full Crash Course — AI Agents in Python', url: 'https://www.youtube.com/watch?v=J7j5tCB_y4w', dur: '~60 min', note: 'Latest 2025 version — covers LCEL and agent patterns end to end' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Core concepts */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Core concepts" color={color} />
          <InfoBox color={color} dark={dark}>LangChain's architecture has four main layers: Models (wrappers around any LLM API — OpenAI, Groq, Anthropic, HuggingFace), Prompts (PromptTemplate for reusable, parameterized prompts), Chains (sequences of operations using LCEL's pipe | operator), and Retrievers (connecting to vector stores for RAG). Understanding these four layers means you understand LangChain.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>LCEL (LangChain Expression Language) is the modern way to build LangChain pipelines. Instead of manually instantiating chain objects, LCEL uses Python's pipe operator to compose components: chain = prompt | llm | output_parser. Each component is a Runnable — it accepts input and produces output. The pipe operator passes output from left to right. A 5-step RAG chain becomes one readable line of composed components. This declarative style replaced the older, more complex chain constructors in v0.3+.</p>
        </Block>

        {/* Key components */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Key components" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'ChatModels', desc: 'Wrappers around any LLM: ChatOpenAI, ChatGroq, ChatAnthropic, ChatHuggingFace. Swap the model without changing any other code — the interface is identical across providers.' },
            { name: 'PromptTemplate / ChatPromptTemplate', desc: 'Reusable, parameterized prompts. Define a template with variables, fill in at runtime. ChatPromptTemplate for system + human message pairs.' },
            { name: 'LCEL chains (|)', desc: 'The pipe operator composes components: prompt | llm | StrOutputParser(). Each | passes the output of the left component as input to the right. Chains are lazy — they only execute when invoked.' },
            { name: 'Document loaders & text splitters', desc: 'Load PDFs, web pages, Notion, GitHub repos. Split into chunks. The starting point for any RAG pipeline. 100+ loaders for different data sources.' },
            { name: 'Vector stores & retrievers', desc: 'Integrations with ChromaDB, Pinecone, FAISS, Weaviate. Retriever wraps a vector store to provide a consistent .invoke(query) interface for RAG chains.' },
            { name: 'Memory', desc: 'ConversationBufferMemory, ConversationSummaryMemory — persist conversation history across turns. Inject history into prompts automatically. Essential for stateful chatbots.' },
          ]} />
        </Block>

        {/* Building a RAG chain */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Building a RAG chain with LCEL" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Load and split documents', body: "from langchain_community.document_loaders import PyPDFLoader\nfrom langchain.text_splitter import RecursiveCharacterTextSplitter\nloader = PyPDFLoader('document.pdf')\ndocs = loader.load()\nsplitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)\nchunks = splitter.split_documents(docs)" },
            { n: '2', title: 'Create embeddings and vector store', body: "from langchain_community.vectorstores import Chroma\nfrom langchain_community.embeddings import HuggingFaceEmbeddings\nembeddings = HuggingFaceEmbeddings(model_name='all-MiniLM-L6-v2')\nvectorstore = Chroma.from_documents(chunks, embeddings)\nretriever = vectorstore.as_retriever(search_kwargs={'k': 4})" },
            { n: '3', title: 'Define the prompt', body: "from langchain_core.prompts import ChatPromptTemplate\nprompt = ChatPromptTemplate.from_template(\"\"\"\nAnswer based only on the context below:\nContext: {context}\nQuestion: {question}\n\"\"\")" },
            { n: '4', title: 'Build the chain with LCEL', body: "from langchain_groq import ChatGroq\nfrom langchain_core.output_parsers import StrOutputParser\nfrom langchain_core.runnables import RunnablePassthrough\nllm = ChatGroq(model='llama-3.1-70b-versatile')\nchain = {'context': retriever, 'question': RunnablePassthrough()} | prompt | llm | StrOutputParser()" },
            { n: '5', title: 'Invoke the chain', body: "response = chain.invoke('What does the document say about X?')\nprint(response)\nThe retriever fetches relevant chunks, the prompt formats them, the LLM generates the answer, and StrOutputParser extracts the text — all in one call." },
          ]} />
        </Block>

        {/* LangChain for agents */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="LangChain for agents" color={color} />
          <p style={{ ...P(sub), marginBottom: '1rem' }}>LangChain agents give LLMs access to tools — functions the model can call to take real actions. A tool can be a web search, a database query, a Python interpreter, a calculator, or any custom function you define. The agent decides which tool to call based on the user's request, calls it, observes the result, and decides what to do next.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Define tools', body: "Use the @tool decorator: @tool\ndef search_database(query: str) -> str:\n    'Search the product database for relevant items'\n    return db.search(query)\nThe docstring tells the agent when to use this tool." },
            { n: '2', title: 'Create the agent', body: 'from langchain.agents import create_tool_calling_agent, AgentExecutor\nagent = create_tool_calling_agent(llm, tools, prompt)\nexecutor = AgentExecutor(agent=agent, tools=tools, verbose=True)' },
            { n: '3', title: 'Run and observe', body: "result = executor.invoke({'input': 'Find me products under ₹500'})\nSet verbose=True to see the agent's reasoning: what tool it chose, what input it passed, what the tool returned. This reasoning trace is how you debug agent behavior." },
          ]} />
        </Block>

        {/* Common pitfalls */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Common pitfalls" color="#EF4444" />
          <Compare dark={dark} border={border} color="#EF4444" items={[
            { label: 'Version confusion', badge: 'Check imports carefully', body: 'LangChain split into multiple packages: langchain-core (base), langchain (main), langchain-community (integrations), langchain-openai, langchain-groq etc. An import error often means you need to pip install the specific integration package, not langchain itself.' },
            { label: 'Over-chaining', badge: 'Keep it simple', body: 'LangChain makes it easy to add complexity. Many production systems use a simple retriever + prompt + LLM with no framework at all. Use LangChain when you need its abstractions (swappable models, memory, agent loop) — not because it exists.' },
            { label: 'Retrieval quality', badge: 'Most important variable', body: 'Poor RAG answers are almost always a retrieval problem, not an LLM problem. If the wrong chunks are retrieved, the best LLM cannot answer correctly. Debug retrieval (what chunks does retriever.invoke() return?) before blaming the model.' },
            { label: 'Cost tracking', badge: 'Add callbacks', body: 'LangChain does not show token costs by default. Add get_openai_callback() context manager or LangSmith tracing to see token counts and costs per chain invocation. Essential before deploying anything to production.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Build a complete RAG system over your own documents in under 50 lines of Python',
            'Connect any LLM (OpenAI, Groq, Anthropic, local) to your application by swapping one import',
            'Create agents that use tools — web search, database queries, code execution — to complete multi-step tasks',
            'Add conversation memory to any chatbot so it remembers the full conversation history',
            'Structure complex LLM workflows as readable, composable LCEL pipelines',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a PDF Q&amp;A System</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Load a PDF you find interesting (a research paper, a textbook chapter, a product manual). Build a LangChain RAG chain that lets you ask any question about it. Use Groq's free API (Llama 3.1 70B) as the LLM and all-MiniLM-L6-v2 (free, local) for embeddings. The cost: ₹0. Test it with 10 questions that require understanding content from different sections.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install dependencies', body: 'pip install langchain langchain-community langchain-groq chromadb sentence-transformers pypdf python-dotenv' },
            { n: '2', title: 'Load and split the PDF', body: 'Use PyPDFLoader and RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100). Print len(chunks) to verify it loaded correctly.' },
            { n: '3', title: 'Build the vector store', body: "Use HuggingFaceEmbeddings('all-MiniLM-L6-v2') — runs locally, free. Create ChromaDB vector store. This is a one-time step — persist the DB to avoid re-embedding every run." },
            { n: '4', title: 'Build the LCEL chain and test', body: 'Connect retriever + ChatPromptTemplate + ChatGroq + StrOutputParser using the | operator. Ask 10 questions. For each, also check what chunks the retriever returned to understand why the answer is right or wrong.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Groq free tier + local embeddings, no paid API required</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Add verbose=True to your AgentExecutor and LLMChain during development. Seeing the full reasoning trace — what the model decided, which tool it called, what the tool returned — is the fastest way to understand what is working and what is not. Remove verbose=True before showing the app to anyone else.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/apis/huggingface')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Hugging Face
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/agents/langgraph')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            LangGraph <ChevronRight size={14} />
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
