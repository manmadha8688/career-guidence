import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, P, CardGrid } from '../helpers'

const CYAN = '#00D9FF'
const color = '#3ECF8E'

export default function SupabasePage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(62,207,142,0.09)' : 'rgba(62,207,142,0.13)'
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>⚡</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Supabase — Add Vector Search to Your PostgreSQL Database</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>pgvector extension — semantic search in the same database as your app data</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE TIER', '#4ADE80'], ['supabase.com', color], ['PostgreSQL', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>
            Supabase is an open-source Firebase alternative built on PostgreSQL. Its vector search capability comes from enabling the <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.82em', background: dark ? 'rgba(62,207,142,0.1)' : 'rgba(62,207,142,0.08)', padding: '0.1em 0.4em', borderRadius: 4, color }}>pgvector</code> extension — a native PostgreSQL plugin that adds a new <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.82em', background: dark ? 'rgba(62,207,142,0.1)' : 'rgba(62,207,142,0.08)', padding: '0.1em 0.4em', borderRadius: 4, color }}>vector</code> data type and similarity operators directly to your existing database. The core idea: if you already use Supabase for authentication, row-level security, storage, and application data, you do not need a separate vector database at all. Your embeddings live in the same Postgres instance as your users table and your application rows — you can <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.82em', background: dark ? 'rgba(62,207,142,0.1)' : 'rgba(62,207,142,0.08)', padding: '0.1em 0.4em', borderRadius: 4, color }}>JOIN</code> vector search results with user data, apply row-level security to vector queries, and run everything in a single database transaction. This is the "same database" advantage no dedicated vector DB can replicate.
          </p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Supabase Vector: The Postgres Vector Database — Paul Copplestone', url: 'https://www.youtube.com/watch?v=MDxEXKkxf2Q', dur: '~30 min', note: 'Official Supabase talk — pgvector, use cases, architecture deep dive' },
            { label: 'Supabase Postgres Vector DB Crash Course', url: 'https://www.youtube.com/watch?v=cyPZsbO5i5U', dur: 'Crash course', note: 'Enable pgvector, create vector columns, run similarity queries — hands-on' },
            { label: 'Supabase pgvector: The Vector Database Everyone Missed', url: 'https://www.youtube.com/watch?v=a2b2g5D64d4', dur: '2026', note: 'Why Supabase pgvector beats Pinecone for most teams — cost and integration case' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* pgvector InfoBox */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What is pgvector?" color={color} />
          <InfoBox color={color} dark={dark}>pgvector is an open-source PostgreSQL extension that adds native vector storage and similarity search. It introduces a <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85em' }}>vector(n)</code> column type (where n is the number of dimensions), and three new distance operators: <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85em' }}>&lt;-&gt;</code> for L2/Euclidean distance, <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85em' }}>&lt;#&gt;</code> for negative inner product, and <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85em' }}>&lt;=&gt;</code> for cosine distance. Supabase enables pgvector on every Postgres instance — you just run one SQL command to activate it.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>Since pgvector 0.5.0, two index types are supported: <strong style={{ color: txt }}>IVFFlat</strong> (divides vectors into lists, fast to build, good recall at moderate scale) and <strong style={{ color: txt }}>HNSW</strong> (Hierarchical Navigable Small World — better recall, faster queries at scale, slightly more memory). For most student projects and apps up to a few million vectors, HNSW indexing on Supabase gives query times under 50ms without any tuning. Supabase automatically handles pgvector version updates and index creation in its managed platform.</p>
        </Block>

        {/* Key Features CardGrid */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Key features and advantages" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Same database, zero friction', desc: 'Vectors stored alongside your users, posts, and products. JOIN, filter by user ID, apply row-level security — all in one query.' },
            { name: 'Full Postgres power', desc: 'ACID transactions, foreign keys, triggers, functions. Vector search is just another column — full SQL still works.' },
            { name: 'HNSW indexing', desc: 'Create an HNSW index on any vector column for fast approximate nearest-neighbor search. Matches dedicated DB performance up to ~10M vectors.' },
            { name: 'Row-level security', desc: "Supabase's RLS policies apply to vector queries too. Users can only search vectors they have access to — no extra access-control layer." },
            { name: 'Free 500MB database', desc: 'Supabase free tier includes a full Postgres instance with pgvector enabled. Build and deploy your AI app at zero cost.' },
            { name: 'Edge Functions for AI', desc: 'Run embedding generation serverlessly at the edge. Use Supabase Edge Functions (Deno) to call OpenAI or HuggingFace and insert vectors in one request.' },
          ]} />
        </Block>

        {/* Getting Started Steps */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Getting started — enable pgvector and add semantic search" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            {
              n: '1',
              title: 'Enable the pgvector extension',
              body: "-- In Supabase SQL Editor (or Dashboard → Database → Extensions → search 'vector'):\nCREATE EXTENSION IF NOT EXISTS vector;\n\n-- That's it — the vector type and <-> operator are now available in your database."
            },
            {
              n: '2',
              title: 'Create a table with a vector column',
              body: "CREATE TABLE documents (\n  id        BIGSERIAL PRIMARY KEY,\n  content   TEXT NOT NULL,\n  source    TEXT,\n  embedding VECTOR(1536)  -- 1536 dims = OpenAI text-embedding-3-small\n                          -- 384 dims = all-MiniLM-L6-v2 (free/local)\n);\n\n-- Create an HNSW index for fast similarity search:\nCREATE INDEX ON documents\n  USING hnsw (embedding vector_cosine_ops);"
            },
            {
              n: '3',
              title: 'Insert document embeddings (Python)',
              body: "import openai\nfrom supabase import create_client\n\nsupabase = create_client(SUPABASE_URL, SUPABASE_KEY)\nopenai_client = openai.OpenAI(api_key=OPENAI_KEY)\n\ndef embed_and_store(text, source):\n    resp = openai_client.embeddings.create(\n        input=text,\n        model='text-embedding-3-small'  # 1536 dims\n    )\n    embedding = resp.data[0].embedding\n    supabase.table('documents').insert({\n        'content': text,\n        'source': source,\n        'embedding': embedding\n    }).execute()"
            },
            {
              n: '4',
              title: 'Run a similarity search with a Postgres function',
              body: "-- Create a reusable search function in SQL:\nCREATE OR REPLACE FUNCTION match_documents(\n  query_embedding VECTOR(1536),\n  match_count      INT DEFAULT 5\n)\nRETURNS TABLE (id BIGINT, content TEXT, source TEXT, similarity FLOAT)\nLANGUAGE SQL STABLE AS $$\n  SELECT id, content, source,\n         1 - (embedding <=> query_embedding) AS similarity\n  FROM documents\n  ORDER BY embedding <=> query_embedding\n  LIMIT match_count;\n$$;\n\n-- Call from Python:\nquery_vec = get_embedding('your question here')\nresults = supabase.rpc('match_documents', {\n    'query_embedding': query_vec,\n    'match_count': 5\n}).execute()"
            },
            {
              n: '5',
              title: 'Filter by metadata (JOIN with your data)',
              body: "-- The killer feature: vector search + relational filter in one query\nSELECT d.id, d.content,\n       1 - (d.embedding <=> query_embedding) AS similarity\nFROM documents d\nJOIN users u ON d.user_id = u.id\nWHERE u.id = auth.uid()  -- RLS: only search this user's documents\n  AND d.source = 'manual_notes'\nORDER BY d.embedding <=> query_embedding\nLIMIT 5;\n\n-- No dedicated vector DB supports this pattern natively."
            },
          ]} />
        </Block>

        {/* LangChain Integration */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="LangChain integration" color={color} />
          <InfoBox color={color} dark={dark}>LangChain has a first-class Supabase vector store integration via <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85em' }}>langchain_community.vectorstores.SupabaseVectorStore</code>. It uses the same <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85em' }}>match_documents</code> RPC pattern under the hood, so your Postgres function is the retrieval layer — LangChain is just the orchestration wrapper.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            {
              n: '1',
              title: 'Install dependencies',
              body: "pip install supabase langchain-community langchain-openai\n\n# The Supabase Python client connects to your database.\n# langchain-community provides the SupabaseVectorStore wrapper."
            },
            {
              n: '2',
              title: 'Index documents',
              body: "from langchain_community.vectorstores import SupabaseVectorStore\nfrom langchain_openai import OpenAIEmbeddings\nfrom supabase import create_client\n\nsupabase = create_client(SUPABASE_URL, SUPABASE_KEY)\nembeddings = OpenAIEmbeddings(model='text-embedding-3-small')\n\nvectorstore = SupabaseVectorStore.from_documents(\n    documents=chunks,           # list of LangChain Document objects\n    embedding=embeddings,\n    client=supabase,\n    table_name='documents',     # your Postgres table\n    query_name='match_documents'  # your RPC function name\n)"
            },
            {
              n: '3',
              title: 'Load and retrieve',
              body: "# Load existing store (no re-indexing):\nvectorstore = SupabaseVectorStore(\n    client=supabase,\n    embedding=embeddings,\n    table_name='documents',\n    query_name='match_documents'\n)\nretriever = vectorstore.as_retriever(search_kwargs={'k': 4})"
            },
            {
              n: '4',
              title: 'Use in a RAG chain',
              body: "from langchain_core.runnables import RunnablePassthrough\nfrom langchain_core.output_parsers import StrOutputParser\n\nchain = (\n    {'context': retriever, 'question': RunnablePassthrough()}\n    | prompt\n    | llm\n    | StrOutputParser()\n)\nresult = chain.invoke('What is the refund policy?')"
            },
          ]} />
        </Block>

        {/* vecs Python Client */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="vecs — Supabase's native Python vector client" color={color} />
          <p style={{ ...P(sub), marginBottom: '0.875rem' }}>
            Supabase ships <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.82em', background: dark ? 'rgba(62,207,142,0.1)' : 'rgba(62,207,142,0.08)', padding: '0.1em 0.4em', borderRadius: 4, color }}>vecs</code> — a lightweight Python client specifically for managing vector collections in Postgres. It abstracts the SQL and index management so you interact with a higher-level collection API, similar to ChromaDB but backed by your Supabase Postgres instance. Use <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.82em', background: dark ? 'rgba(62,207,142,0.1)' : 'rgba(62,207,142,0.08)', padding: '0.1em 0.4em', borderRadius: 4, color }}>vecs</code> when you want the simplicity of a vector client API without writing raw SQL, but still want Supabase/Postgres as the backend.
          </p>
          <Steps dark={dark} border={border} color={color} items={[
            {
              n: '1',
              title: 'Install and connect',
              body: "pip install vecs\n\nimport vecs\n\n# Connect using your Supabase DB connection string:\nvx = vecs.create_client(SUPABASE_DB_URL)\n\n# Create or get a collection (like a table for vectors):\ndocs = vx.get_or_create_collection(name='documents', dimension=384)"
            },
            {
              n: '2',
              title: 'Upsert vectors with metadata',
              body: "docs.upsert(records=[\n    ('doc_1', [0.1, 0.2, ...], {'source': 'readme.txt', 'topic': 'setup'}),\n    ('doc_2', [0.15, 0.18, ...], {'source': 'faq.txt', 'topic': 'pricing'}),\n])\n\n# Create an index after upserting for fast search:\ndocs.create_index(measure=vecs.IndexMeasure.cosine_distance)"
            },
            {
              n: '3',
              title: 'Query by similarity',
              body: "results = docs.query(\n    data=[0.12, 0.19, ...],  # your query embedding\n    limit=5,\n    filters={'topic': {'$eq': 'pricing'}},  # optional metadata filter\n    include_metadata=True\n)\nfor id, metadata in results:\n    print(id, metadata)"
            },
          ]} />
        </Block>

        {/* Supabase vs dedicated vector DBs */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Supabase pgvector vs dedicated vector databases" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            {
              label: 'Supabase + pgvector',
              badge: 'Best for Postgres-first apps',
              body: 'Already using Supabase? Add vector search by enabling one extension — no new service, no extra cost, no API key to manage. Supports JOINs, transactions, row-level security, and full SQL alongside vector queries. Free tier includes 500MB database. Best for: apps under ~10M vectors, teams already on Supabase, use cases needing relational + vector queries in one place.'
            },
            {
              label: 'Pinecone',
              badge: 'Best for pure vector workloads at scale',
              body: "Fully managed, serverless, scales to billions of vectors automatically. No Postgres to maintain. Best for: production apps with very large vector counts (10M+), teams that want zero operational overhead, multi-tenant SaaS where each customer needs isolated vector namespaces. Does not support SQL or relational joins."
            },
            {
              label: 'ChromaDB',
              badge: 'Best for local development',
              body: 'Zero setup, in-memory or persistent on disk, pure Python. No database server needed. Best for: learning RAG, quick prototypes, scripts, personal projects. Not suitable for multi-user apps or anything that needs auth, security, or relational data alongside vectors.'
            },
            {
              label: 'Qdrant',
              badge: 'Best for high-performance self-hosted',
              body: 'Rust-powered, fastest filtered vector search benchmarks. Self-host for free or use managed cloud. Best for: performance-critical workloads, teams comfortable running infrastructure, use cases with complex metadata filter combinations. Does not integrate with your application database.'
            },
          ]} />
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Semantic FAQ Search for a Student Portfolio App</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>
            Build a semantic search feature into a Supabase project — the kind of thing you would add to a real app. Create a "FAQ" table with vector embeddings, then build a search function that returns the most relevant FAQ entries for any question, even if the wording is different. This demonstrates the exact pattern used in production AI-powered support systems.
          </p>
          <Steps dark={dark} border={border} color={color} items={[
            {
              n: '1',
              title: 'Set up Supabase project',
              body: 'Create a free project at supabase.com. In the SQL Editor, enable pgvector: CREATE EXTENSION IF NOT EXISTS vector; Then create a faqs table with columns: id, question TEXT, answer TEXT, embedding VECTOR(384). Use 384 dimensions — compatible with the free all-MiniLM-L6-v2 model.'
            },
            {
              n: '2',
              title: 'Seed FAQ content',
              body: "Write 15-20 real FAQ entries about a topic you know well — a framework, a course, a service. Use sentence-transformers (all-MiniLM-L6-v2, free, local) to generate 384-dim embeddings. Insert with Python using the Supabase client: supabase.table('faqs').insert({'question': q, 'answer': a, 'embedding': embedding}).execute()"
            },
            {
              n: '3',
              title: 'Create the match_faqs function',
              body: "In the SQL Editor, create a Postgres function that takes a query_embedding VECTOR(384) and returns the top 5 most similar FAQ rows ordered by cosine distance. Use the <=> operator. Test it directly in the SQL editor by passing a sample embedding array."
            },
            {
              n: '4',
              title: 'Build a Python or Next.js search UI',
              body: "Write a search function: embed the user's query, call supabase.rpc('match_faqs', {...}).execute(), display the top 3 results with their answer text and similarity score. Test with 10 paraphrased questions that should match your FAQ entries. This is a complete AI-powered semantic search in a production Supabase app."
            },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Supabase free tier + all-MiniLM-L6-v2 runs locally for free</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>
            Always use <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85em', background: dark ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.08)', padding: '0.1em 0.4em', borderRadius: 4, color: '#F59E0B' }}>cosine distance</code> (<code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.82em' }}>&lt;=&gt;</code> operator) for text embeddings from models like OpenAI or sentence-transformers — these models produce normalized vectors where cosine similarity reflects semantic closeness, not raw magnitude. The HNSW index type <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.82em', background: dark ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.08)', padding: '0.1em 0.4em', borderRadius: 4, color: '#F59E0B' }}>vector_cosine_ops</code> matches this operator — creating the index on <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.82em' }}>vector_l2_ops</code> while querying with <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.82em' }}>&lt;=&gt;</code> means the index is never used and every query does a full table scan. Match your index ops to your query operator and your similarity search stays fast even as the table grows.
          </p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/vector/pinecone')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Pinecone
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/vector/qdrant')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Qdrant <ChevronRight size={14} />
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
