import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#14B8A6'

export default function ChromaDBPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(20,184,166,0.09)' : 'rgba(20,184,166,0.13)'
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🎯</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>ChromaDB — The Developer-Friendly Vector Database</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Start locally in seconds, scale to production when ready</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['Open source', color], ['Python & JS', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>ChromaDB is the most popular vector database for Python developers — specifically because of how fast it is to start. <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.82em', background: dark ? 'rgba(20,184,166,0.1)' : 'rgba(20,184,166,0.08)', padding: '0.1em 0.4em', borderRadius: 4, color }}>import chromadb; client = chromadb.Client(); collection = client.create_collection('docs')</code> — that is a running in-memory vector database in three lines. No Docker, no configuration, no server. For learning RAG, prototyping AI features, and building applications that do not need to scale to millions of vectors, ChromaDB is the right starting point. It handles the full vector store lifecycle: add documents with embeddings, query by semantic similarity, filter by metadata, and persist to disk. Version 0.5+ introduced the HttpClient for connecting to a persistent server and better performance at scale.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'ChromaDB Crash Course in 20 Minutes — Python Vector Database', url: 'https://www.youtube.com/watch?v=cm2Ze2n9lxw', dur: '20 min', note: 'Best quick start — create, add, query, persist with Python' },
            { label: 'ChromaDB Tutorial for Beginners — Create, Store & Query Vectors', url: 'https://www.youtube.com/watch?v=_Ci1tLMafQs', dur: '~20 min', note: 'Beginner-friendly — embeddings, metadata filtering, persistence' },
            { label: 'ChromaDB Tutorial: Store & Query Document Embeddings (OpenAI + Python)', url: 'https://www.youtube.com/watch?v=5_BuuBJSyOc', dur: '~20 min', note: 'OpenAI embeddings + ChromaDB — full RAG retrieval pipeline' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* ChromaDB modes */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="ChromaDB modes" color={color} />
          <InfoBox color={color} dark={dark}>ChromaDB runs in three modes: in-memory (data lives in RAM, lost when program ends), persistent (data saved to disk, survives restarts), and client-server (ChromaDB runs as a separate server process, your code connects to it via HTTP). Use in-memory for quick experiments, persistent for most development and small production apps, and client-server when multiple processes or services need to share the same vector store.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The persistent mode is what most developers use for real applications. <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.82em', background: dark ? 'rgba(20,184,166,0.1)' : 'rgba(20,184,166,0.08)', padding: '0.1em 0.4em', borderRadius: 4, color }}>chromadb.PersistentClient(path='./chroma_db')</code> creates or loads a vector database from disk. All collections, documents, embeddings, and metadata are stored in that directory. The database loads in milliseconds on subsequent runs — you do not re-embed documents every time your application starts. This makes it practical for personal projects and moderate-scale production use.</p>
        </Block>

        {/* Core concepts and API */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Core concepts and API" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Create a client and collection', body: "import chromadb\n# In-memory:\nclient = chromadb.Client()\n# Persistent:\nclient = chromadb.PersistentClient(path='./chroma_db')\n# Create or get collection:\ncollection = client.get_or_create_collection(\n    name='my_docs',\n    metadata={'hnsw:space': 'cosine'}  # use cosine similarity\n)" },
            { n: '2', title: 'Add documents', body: "collection.add(\n    documents=['The cat sat on the mat', 'A feline rested on the rug'],\n    embeddings=[[0.1, 0.2, ...], [0.12, 0.18, ...]],  # your embedding vectors\n    metadatas=[{'source': 'doc1', 'page': 1}, {'source': 'doc1', 'page': 2}],\n    ids=['chunk_1', 'chunk_2']  # unique IDs, required\n)\nOr let ChromaDB embed for you using a built-in embedding function." },
            { n: '3', title: 'Query by similarity', body: "results = collection.query(\n    query_texts=['cat resting'],  # ChromaDB embeds this automatically if using built-in embedder\n    n_results=3,  # return top 3 most similar\n    where={'source': 'doc1'}  # optional metadata filter\n)\nprint(results['documents'])  # list of matching document texts\nprint(results['distances'])  # similarity scores" },
            { n: '4', title: 'Use with sentence-transformers', body: "from chromadb.utils import embedding_functions\nemf = embedding_functions.SentenceTransformerEmbeddingFunction(\n    model_name='all-MiniLM-L6-v2'\n)\ncollection = client.get_or_create_collection(\n    name='docs',\n    embedding_function=emf\n)\n# Now collection.add() and collection.query() accept raw text — no manual embedding needed" },
            { n: '5', title: 'Update and delete', body: "# Update documents:\ncollection.update(ids=['chunk_1'], documents=['Updated text'], metadatas=[{'source': 'doc1_v2'}])\n# Delete by ID:\ncollection.delete(ids=['chunk_1'])\n# Delete by metadata filter:\ncollection.delete(where={'source': 'old_doc'})" },
          ]} />
        </Block>

        {/* ChromaDB with LangChain */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="ChromaDB with LangChain" color={color} />
          <InfoBox color={color} dark={dark}>LangChain's Chroma integration wraps ChromaDB's API and adds retriever functionality — the standard interface used by all LangChain RAG chains. Use <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85em' }}>langchain_chroma.Chroma</code> (not the community package) for the current LangChain v0.3+ integration.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Index documents', body: "from langchain_chroma import Chroma\nfrom langchain_huggingface import HuggingFaceEmbeddings\nembeddings = HuggingFaceEmbeddings(model_name='all-MiniLM-L6-v2')\nvectorstore = Chroma.from_documents(\n    documents=chunks,  # from your text splitter\n    embedding=embeddings,\n    persist_directory='./chroma_db',\n    collection_name='my_docs'\n)" },
            { n: '2', title: 'Load existing store', body: "# Load without re-indexing:\nvectorstore = Chroma(\n    persist_directory='./chroma_db',\n    embedding_function=embeddings,\n    collection_name='my_docs'\n)\n# Now retrieve:\nretriever = vectorstore.as_retriever(search_kwargs={'k': 4})" },
            { n: '3', title: 'Use in a chain', body: "from langchain_core.runnables import RunnablePassthrough\nchain = (\n    {'context': retriever, 'question': RunnablePassthrough()}\n    | prompt\n    | llm\n    | StrOutputParser()\n)\nresult = chain.invoke('Your question here')" },
          ]} />
        </Block>

        {/* Metadata filtering */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Metadata filtering — ChromaDB's powerful feature" color={color} />
          <p style={{ ...P(sub), marginBottom: '1rem' }}>ChromaDB's <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.82em', background: dark ? 'rgba(20,184,166,0.1)' : 'rgba(20,184,166,0.08)', padding: '0.1em 0.4em', borderRadius: 4, color }}>where</code> parameter enables metadata filtering alongside vector similarity search. You can store source, page number, date, category, author, or any other fields as metadata when adding documents. Then filter at query time: only search documents from a specific source, only recent documents, only a specific category. This is critical for RAG systems with heterogeneous document collections.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Add metadata when indexing', body: "collection.add(\n    documents=[text],\n    ids=[doc_id],\n    metadatas=[{\n        'source': 'company_policy.pdf',\n        'section': 'HR',\n        'date': '2024-01',\n        'confidential': False\n    }]\n)" },
            { n: '2', title: 'Filter at query time', body: "results = collection.query(\n    query_texts=['vacation days policy'],\n    n_results=5,\n    where={\n        '$and': [\n            {'section': {'$eq': 'HR'}},\n            {'confidential': {'$eq': False}}\n        ]\n    }\n)" },
            { n: '3', title: 'Available filter operators', body: "$eq (equals), $ne (not equals), $gt/$gte/$lt/$lte (numeric comparison), $in (value in list), $nin (value not in list), $and/$or (logical). Combine for complex multi-condition filters on any metadata field." },
          ]} />
        </Block>

        {/* ChromaDB vs Pinecone */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="ChromaDB vs Pinecone" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'ChromaDB', badge: 'Best for development', body: 'Free, self-hosted, zero setup, works locally. Perfect for: learning RAG, personal projects, applications up to ~1M vectors, development and prototyping. Disk-based persistence. No infrastructure to manage.' },
            { label: 'Pinecone', badge: 'Best for cloud production', body: 'Managed cloud, scales to billions of vectors, high availability, automatic backups. Free tier: 1 pod with ~100K vectors. Best for: production applications needing scale, reliability, or multi-region deployment. Managed infrastructure, no ops required.' },
            { label: 'When to migrate', badge: 'Practical guide', body: "Start with ChromaDB. Migrate to Pinecone when: your vector count exceeds what your server can handle (typically >1M), you need multi-region or high availability, or you need vector store infrastructure you don't maintain. The LangChain integration is nearly identical — swapping is a few lines of code." },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Start a working vector database in 3 lines of Python with zero configuration or setup',
            'Build complete RAG systems for personal projects with disk persistence — data survives restarts',
            'Filter vector search results by metadata to narrow searches to specific documents, dates, or categories',
            'Use with LangChain as a drop-in retriever for any RAG chain',
            'Migrate to Pinecone for production scale by changing one import — same LangChain interface',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Personal Knowledge Base</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Build a searchable personal knowledge base using ChromaDB. Collect 20-30 pieces of content you want to be able to find later: saved articles, notes, documentation snippets, key paragraphs from papers. Embed and store them in ChromaDB with metadata (source, topic, date). Then build a semantic search interface: type a question, get back the 3 most relevant items from your collection. This is a real tool you will keep using.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Collect your documents', body: '20-30 text snippets, notes, or article summaries. Keep each under 500 words for best retrieval. Save as text files or a JSON file with text + source + topic metadata.' },
            { n: '2', title: 'Embed and index', body: "Use sentence-transformers all-MiniLM-L6-v2 (free, local). Add to a persistent ChromaDB collection with metadata: source, topic, date_added. Verify with collection.count()." },
            { n: '3', title: 'Build the search interface', body: 'Write a Python script that takes a query, embeds it, queries ChromaDB (n_results=3), and prints each result with its source and similarity score. Or build a simple Gradio UI around the same logic.' },
            { n: '4', title: 'Test semantic search quality', body: 'Try 10 queries that should find relevant content. Check if the right items appear. If retrieval is off, check your chunk sizes and metadata. Add more content to improve coverage.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — ChromaDB is fully open source, all-MiniLM-L6-v2 runs locally for free</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Always call <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85em', background: dark ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.08)', padding: '0.1em 0.4em', borderRadius: 4, color: '#F59E0B' }}>get_or_create_collection()</code> instead of <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85em', background: dark ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.08)', padding: '0.1em 0.4em', borderRadius: 4, color: '#F59E0B' }}>create_collection()</code> in your application code. <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.82em' }}>create_collection()</code> throws an error if the collection already exists — which breaks your app on every restart after the first run. <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.82em' }}>get_or_create_collection()</code> creates it if missing and loads it if it exists. This one change makes your ChromaDB code safe to run repeatedly without clearing the database first.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/local/lmstudio')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> LM Studio
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/vector/pinecone')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Pinecone <ChevronRight size={14} />
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
