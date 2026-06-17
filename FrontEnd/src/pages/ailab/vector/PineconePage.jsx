import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#14B8A6'

export default function PineconePage() {
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Vector Databases</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🌲</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Pinecone — Managed Vector Database for Production AI</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Scale your RAG system to billions of vectors in the cloud</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE tier', '#4ADE80'], ['Serverless available', color], ['Production-grade', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Pinecone is a fully managed, cloud-hosted vector database designed for production AI applications. Where ChromaDB runs on your machine and requires you to manage storage and scaling, Pinecone handles all infrastructure automatically — you upsert vectors via API, query by similarity, and Pinecone handles the rest. The free Starter plan includes one serverless index with enough capacity for ~100,000 vectors and thousands of queries per month. Pinecone's serverless tier (launched 2024) removed the previous per-hour pod pricing for small-scale use, making it genuinely free for personal projects and moderate-traffic applications. For any production AI application that needs to serve real users reliably, Pinecone is the standard choice in the industry.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'What is Pinecone Vector Database Explained + How to Use It (2025)', url: 'https://www.youtube.com/watch?v=Ab77M-k4dmc', dur: '~20 min', note: 'Concept + practical — serverless, upsert, query, metadata filtering' },
            { label: 'Pinecone Full Tutorial: Vector DB Setup', url: 'https://www.youtube.com/watch?v=laLrSH8qEm0', dur: '~25 min', note: 'Full setup walkthrough — index creation, Python client, namespaces' },
            { label: 'Pinecone Vector Database — Build Knowledgeable AI', url: 'https://www.youtube.com/watch?v=v4bye5Rfa3g', dur: '~20 min', note: 'End-to-end AI use case — embed documents, store, retrieve, generate' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Pinecone's architecture */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Pinecone's architecture" color={color} />
          <InfoBox color={color} dark={dark}>Pinecone indexes use the HNSW (Hierarchical Navigable Small World) algorithm for approximate nearest neighbor search — finding the most similar vectors extremely fast even across billions of entries. Serverless indexes automatically scale compute and storage independently. You only pay for storage and query operations, not for idle time. For small applications, the free tier's allowances are never exhausted.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The key difference from self-hosted vector databases is operational overhead. With ChromaDB or Qdrant on your server, you manage backups, scaling, replication, and uptime. With Pinecone, none of this exists from your perspective — the API is just there, always available, always fast. For teams shipping production AI applications, this managed infrastructure saves significant engineering time. For solo developers, the free tier means production-ready vector storage at zero cost.</p>
        </Block>

        {/* Getting started */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Getting started" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Create account and index', body: "app.pinecone.io → Sign up free → Create Index. Choose: serverless (recommended), region (us-east-1 for lowest latency), dimensions (match your embedding model: 384 for MiniLM, 1536 for OpenAI text-embedding-3-small), metric (cosine for text)." },
            { n: '2', title: 'Install and initialize', body: "pip install pinecone\nfrom pinecone import Pinecone\npc = Pinecone(api_key=os.getenv('PINECONE_API_KEY'))\nindex = pc.Index('your-index-name')" },
            { n: '3', title: 'Upsert vectors', body: "# Upsert: insert or update\nindex.upsert(\n    vectors=[\n        {'id': 'chunk_1', 'values': [0.1, 0.2, ...], 'metadata': {'text': 'original text', 'source': 'doc.pdf', 'page': 1}},\n        {'id': 'chunk_2', 'values': [0.3, 0.4, ...], 'metadata': {'text': 'more text', 'source': 'doc.pdf', 'page': 2}},\n    ]\n)" },
            { n: '4', title: 'Query the index', body: "results = index.query(\n    vector=[0.1, 0.2, ...],  # your query embedding\n    top_k=5,\n    include_metadata=True,  # return stored metadata\n    filter={'source': 'doc.pdf'}  # optional metadata filter\n)\nfor match in results.matches:\n    print(match.score, match.metadata['text'])" },
            { n: '5', title: 'Batch upsert for large datasets', body: "# Upsert in batches of 100 (Pinecone recommendation)\nbatch_size = 100\nfor i in range(0, len(vectors), batch_size):\n    batch = vectors[i:i+batch_size]\n    index.upsert(vectors=batch)\nprint(f'Upserted {len(vectors)} vectors')" },
          ]} />
        </Block>

        {/* Pinecone with LangChain */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Pinecone with LangChain" color={color} />
          <InfoBox color={color} dark={dark}>LangChain's PineconeVectorStore integrates with Pinecone using the same retriever interface as ChromaDB. For applications that start on ChromaDB locally and need to migrate to Pinecone for production: change the vector store initialization (3 lines), and the rest of your RAG chain stays identical.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Index documents', body: "from langchain_pinecone import PineconeVectorStore\nfrom langchain_huggingface import HuggingFaceEmbeddings\nembeddings = HuggingFaceEmbeddings(model_name='all-MiniLM-L6-v2')\nvectorstore = PineconeVectorStore.from_documents(\n    documents=chunks,\n    embedding=embeddings,\n    index_name='your-index-name',\n    pinecone_api_key=os.getenv('PINECONE_API_KEY')\n)" },
            { n: '2', title: 'Query and retrieve', body: "# Load existing index (no re-indexing):\nvectorstore = PineconeVectorStore(\n    index_name='your-index-name',\n    embedding=embeddings,\n    pinecone_api_key=os.getenv('PINECONE_API_KEY')\n)\nretriever = vectorstore.as_retriever(search_kwargs={'k': 4})" },
            { n: '3', title: 'Use in RAG chain', body: "# Same chain as ChromaDB — only the vectorstore initialization changed\nchain = (\n    {'context': retriever, 'question': RunnablePassthrough()}\n    | prompt\n    | llm\n    | StrOutputParser()\n)\n# ChromaDB → Pinecone migration: 3 lines changed, rest identical" },
          ]} />
        </Block>

        {/* Metadata filtering */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Metadata filtering in Pinecone" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Equality filters', badge: 'Most common', body: "filter={'source': 'manual.pdf'} — find only vectors from a specific source. Works with any metadata field. Pinecone supports: $eq, $ne, $gt, $gte, $lt, $lte, $in, $nin operators." },
            { label: 'Combining filters', badge: 'AND / OR logic', body: "filter={'$and': [{'category': {'$eq': 'technical'}}, {'year': {'$gte': 2023}}]} — vectors that are both technical AND from 2023 or later. Use $or for either/or conditions." },
            { label: 'Metadata design matters', badge: 'Plan before indexing', body: 'Add metadata that reflects how you will filter at query time. Common useful fields: source filename, page/section, date, category, language, author. Hard to add retroactively — design your metadata schema before indexing.' },
          ]} />
        </Block>

        {/* Namespaces */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Namespaces — multi-tenant vector storage" color={color} />
          <p style={{ ...P(sub), marginBottom: '1rem' }}>Pinecone namespaces let you partition one index into isolated sections. Different users' data, different document collections, or different application environments (dev/staging/prod) can all live in the same index with complete isolation. Queries only search the specified namespace — different namespaces never interfere. This is cheaper than creating multiple indexes and simpler to manage.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Upsert to a namespace', body: "index.upsert(\n    vectors=[...],\n    namespace='user-123'  # isolates this data per user\n)\n# Query only this namespace:\nresults = index.query(vector=[...], top_k=5, namespace='user-123')" },
            { n: '2', title: 'Use for multi-tenant apps', body: 'For applications where different users upload their own documents: create one index, use namespace=user_id for each user. Their searches only find their own documents. Free tier supports unlimited namespaces in one index.' },
          ]} />
        </Block>

        {/* Pinecone vs ChromaDB */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Pinecone vs ChromaDB" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'ChromaDB', badge: 'Best for development', body: 'Zero cost, zero setup, runs locally. Perfect for learning, personal projects, and applications up to ~500K vectors. No API key needed. Self-managed storage. Use as your starting point.' },
            { label: 'Pinecone', badge: 'Best for production cloud', body: 'Managed infrastructure, scales to billions of vectors, high availability, no ops overhead. Free tier adequate for small production apps. Use when you need reliability and scale you cannot manage yourself.' },
            { label: 'Migration path', badge: 'Simple when ready', body: "Start with ChromaDB. When you need production scale: switch to Pinecone. LangChain's abstraction means 3 lines of code change and the entire RAG chain stays the same. Validate with ChromaDB first, deploy with Pinecone." },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            "Store and query up to ~100,000 vectors for free on Pinecone's serverless tier",
            'Build production RAG systems that serve real users at scale without managing vector database infrastructure',
            "Use namespaces to build multi-tenant applications where each user's documents are isolated",
            'Filter vector searches by metadata to scope queries to relevant subsets of your knowledge base',
            'Migrate from ChromaDB to Pinecone with 3 lines of LangChain code when you need cloud scale',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Deploy Your RAG System to Production</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Take the ChromaDB RAG system you built locally and migrate it to Pinecone. The goal: a publicly accessible RAG endpoint that anyone can query. Steps: create a Pinecone account, re-index your documents to Pinecone, wrap the chain in a FastAPI endpoint, deploy to Render or Railway (both have free tiers). Share the URL. You now have a live, production AI application.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Create Pinecone index', body: "Sign up at pinecone.io. Create serverless index matching your embedding model's dimensions (384 for MiniLM). Note the index name and API key." },
            { n: '2', title: 'Re-index to Pinecone', body: 'Replace Chroma initialization with PineconeVectorStore.from_documents(). Run once to upsert all your document chunks. Verify in the Pinecone console that vectors were indexed.' },
            { n: '3', title: 'Wrap in FastAPI', body: 'Create main.py with FastAPI. One POST endpoint at /query that takes a question, runs the chain, returns the answer. Test locally first: uvicorn main:app --reload.' },
            { n: '4', title: 'Deploy to Render', body: 'Push to GitHub. Connect to render.com (free tier). Add environment variables: PINECONE_API_KEY. Deploy. You get a public HTTPS URL. Share it — your RAG system is live.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Pinecone free tier + Render free tier, no credit card required to start</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Store the original chunk text in Pinecone's metadata alongside any other metadata fields. Pinecone does not store document content by default — it only stores vectors and metadata. If you do not include the text in metadata, you get back similarity scores and IDs but not the actual content. Always add 'text': chunk.page_content to your metadata dict when upserting. This makes retrieval self-contained without needing a separate document store.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/vector/chromadb')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> ChromaDB
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/data/julius')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Julius AI <ChevronRight size={14} />
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
