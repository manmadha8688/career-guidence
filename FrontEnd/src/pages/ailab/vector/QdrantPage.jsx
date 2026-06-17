import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, CardGrid, SubHead, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#EC4899'

export default function QdrantPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(236,72,153,0.09)' : 'rgba(236,72,153,0.13)'
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
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Qdrant — The Fastest Open-Source Vector Database</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Rust-powered vector search — free local, 1GB free cloud cluster</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['qdrant.tech', color], ['Rust-Powered', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Qdrant is the highest-performance open-source vector database available today — and it is free to self-host. Built entirely in Rust with no wrappers or dependencies on Python or Java, it delivers the lowest query latencies and highest requests-per-second of any vector database tested in independent benchmarks. The name stands for Quadrant: it divides vector space into regions for fast approximate nearest-neighbour lookup. You can run it locally with one Docker command, connect to it via the Python client, and query millions of vectors in milliseconds. For production, Qdrant Cloud offers a permanent free 1GB cluster — enough for hundreds of thousands of vectors. With 29,000+ GitHub stars and 250 million+ downloads, Qdrant has crossed the threshold from popular to production-standard. If ChromaDB is the right tool for prototyping, Qdrant is what you graduate to when performance and scale start to matter.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Qdrant Vector Database Full Course — Python, Filtering, RAG', url: 'https://www.youtube.com/watch?v=LRcZ9pbGnno', dur: '~45 min', note: 'Complete walkthrough: install, collections, upsert, search, filter, RAG pipeline' },
            { label: 'How to Build a Qdrant Vector Database for AI Agents | RAG Tutorial', url: 'https://www.youtube.com/watch?v=JSHWLGAysDM', dur: '~30 min', note: 'No-code + Python — build a production RAG knowledge base with Qdrant Cloud' },
            { label: 'Qdrant vs ChromaDB vs Pinecone — Which Vector DB Should You Use?', url: 'https://www.youtube.com/watch?v=dN0lsF2cvm4', dur: '~20 min', note: 'Side-by-side comparison — benchmarks, use cases, when to switch from Chroma' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Why Rust matters */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why Rust makes Qdrant different" color={color} />
          <InfoBox color={color} dark={dark}>Qdrant is the only major vector database written entirely in Rust with a custom storage engine called Gridstore. Every other popular option — ChromaDB (Python/SQLite), Weaviate (Go), Milvus (Go + C++) — adds layers between your query and the hardware. Qdrant has none. The result: 4x higher requests-per-second than the next competitor in independent benchmarks, and the most consistent tail latencies under load. In Rust, memory is managed without a garbage collector, which means no GC pauses mid-query. For a latency-sensitive search engine, this is the most important architectural advantage possible.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The Rust architecture also means predictable memory usage. ChromaDB stores all active vectors in Python objects in RAM, which can spike unpredictably under concurrent load. Qdrant's memory-mapped files and custom storage engine let it serve vectors directly from disk when RAM is full — a feature called on-disk payload storage. You can run a Qdrant instance with 500K vectors on a server with 2GB RAM. ChromaDB would exhaust that RAM at a fraction of that count. This makes Qdrant the practical choice for any deployment where RAM is constrained or query volume is real.</p>
        </Block>

        {/* Key features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Key features that matter for production" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Filtered Vector Search', desc: 'Filter by metadata at query time without a post-filter step. Qdrant applies filters during HNSW traversal — not after — so filtering is fast even at high filter selectivity.' },
            { name: 'Payload (Metadata) Support', desc: 'Attach any JSON payload to a point: strings, numbers, booleans, arrays. Index payload fields for fast filtering. Use payloads to store source, date, category, or any structured data alongside your vectors.' },
            { name: 'Sparse Vectors', desc: 'Native sparse vector support for BM25-style keyword matching. Combine dense semantic vectors and sparse keyword vectors in a single query for hybrid search — better recall than dense-only.' },
            { name: 'Vector Quantization', desc: 'Scalar, Product, and Binary Quantization compress vectors to 1/4 to 1/32 of their original size in memory. Binary Quantization gives 40x memory reduction with minimal recall loss — critical for large collections.' },
            { name: 'On-Disk Storage', desc: 'Vectors and payloads can be stored on disk and memory-mapped. Serve collections larger than your available RAM. Essential for cost-efficient deployment on small cloud instances.' },
            { name: 'HNSW Index', desc: 'Qdrant uses HNSW (Hierarchical Navigable Small World) — the fastest approximate nearest-neighbour algorithm. New vectors are immediately searchable without full index rebuilds.' },
            { name: 'FastEmbed Integration', desc: "Qdrant's own lightweight ONNX-based embedding library. Zero PyTorch dependency — runs on CPU only. Drop-in for sentence-transformers with faster startup and smaller install." },
            { name: 'Hybrid Search', desc: 'Query dense + sparse vectors in one API call. Results are merged by Reciprocal Rank Fusion. Captures both semantic similarity and keyword relevance — higher precision than dense-only for factual queries.' },
          ]} />
        </Block>

        {/* Getting Started */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Getting started — three ways to run Qdrant" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            {
              n: '1',
              title: 'Local in-process (Python only, fastest for dev)',
              body: `# pip install qdrant-client
from qdrant_client import QdrantClient
client = QdrantClient(':memory:')  # in-memory, data gone when process ends
# Or persist to disk:
client = QdrantClient(path='./qdrant_local')  # data saved to disk`
            },
            {
              n: '2',
              title: 'Docker (recommended — same as production, local control)',
              body: `docker pull qdrant/qdrant
docker run -p 6333:6333 -p 6334:6334 \\
  -v $(pwd)/qdrant_storage:/qdrant/storage:z \\
  qdrant/qdrant
# Dashboard available at: http://localhost:6333/dashboard
# Connect from Python:
from qdrant_client import QdrantClient
client = QdrantClient(url='http://localhost:6333')`
            },
            {
              n: '3',
              title: 'Qdrant Cloud — free 1GB cluster (no infrastructure to manage)',
              body: `# 1. Sign up free at cloud.qdrant.io
# 2. Create a Free Cluster (1GB RAM, 4GB disk — no credit card)
# 3. Copy your cluster URL and API key
from qdrant_client import QdrantClient
client = QdrantClient(
    url='https://your-cluster.qdrant.io',
    api_key='your-api-key'
)
# Free tier: ~100K-500K vectors depending on dimension
# Auto-suspended after 1 week of no activity`
            },
          ]} />
        </Block>

        {/* Python Client Core Operations */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Python client — core operations" color={color} />
          <p style={{ ...P(sub), marginBottom: '0.875rem' }}>Every object in Qdrant is a <strong style={{ color: txt }}>Point</strong> — an ID + vector + optional payload. Points live inside a <strong style={{ color: txt }}>Collection</strong>, which has a fixed vector dimension and distance metric. The <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.82em', background: dark ? 'rgba(236,72,153,0.1)' : 'rgba(236,72,153,0.08)', padding: '0.1em 0.4em', borderRadius: 4, color }}>upsert</code> operation is insert-or-update: if a point with that ID already exists it is overwritten, otherwise it is created. This is the recommended write pattern — you never need separate insert vs update logic.</p>
          <Steps dark={dark} border={border} color={color} items={[
            {
              n: '1',
              title: 'Create a collection',
              body: `from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams

client = QdrantClient(':memory:')

client.create_collection(
    collection_name='my_docs',
    vectors_config=VectorParams(
        size=384,           # must match your embedding model dimension
        distance=Distance.COSINE  # or Distance.DOT, Distance.EUCLID
    )
)
# all-MiniLM-L6-v2 → size=384  |  text-embedding-3-small → size=1536`
            },
            {
              n: '2',
              title: 'Upsert points with payload',
              body: `from qdrant_client.models import PointStruct

# Upsert = insert + update. Overwrites if ID already exists.
client.upsert(
    collection_name='my_docs',
    points=[
        PointStruct(
            id=1,
            vector=[0.05, 0.61, 0.76, ...],  # your 384-dim embedding
            payload={
                'text': 'Python was created by Guido van Rossum',
                'source': 'python_docs',
                'year': 1991,
                'topic': 'history'
            }
        ),
        PointStruct(id=2, vector=[...], payload={'text': '...', 'source': 'wiki', 'year': 2024}),
    ]
)
# Batch upserts are more efficient — pass all points in one call`
            },
            {
              n: '3',
              title: 'Semantic search',
              body: `# Embed your query first, then search
query_vector = embedding_model.encode('What year was Python created?').tolist()

results = client.search(
    collection_name='my_docs',
    query_vector=query_vector,
    limit=3,          # return top 3 results
    with_payload=True # include the stored payload in results
)

for hit in results:
    print(f'Score: {hit.score:.4f} | {hit.payload["text"]}')
# Score: 0.9421 | Python was created by Guido van Rossum`
            },
            {
              n: '4',
              title: 'Filtered search — the Qdrant superpower',
              body: `from qdrant_client.models import Filter, FieldCondition, MatchValue, Range

results = client.search(
    collection_name='my_docs',
    query_vector=query_vector,
    query_filter=Filter(
        must=[
            FieldCondition(key='source', match=MatchValue(value='python_docs')),
            FieldCondition(key='year',   range=Range(gte=2020))  # year >= 2020
        ]
    ),
    limit=5
)
# Unlike ChromaDB, Qdrant applies filters INSIDE the HNSW graph — not after
# This means filtering is fast even when 95% of points are filtered out`
            },
            {
              n: '5',
              title: 'Use FastEmbed — no manual embedding needed',
              body: `# pip install qdrant-client[fastembed]
from qdrant_client import QdrantClient

client = QdrantClient(':memory:')
client.set_model('sentence-transformers/all-MiniLM-L6-v2')  # auto-downloads

# Now add raw text — FastEmbed handles embedding automatically
client.add(
    collection_name='my_docs',
    documents=['Python is a high-level programming language', 'Rust is blazing fast'],
    metadata=[{'source': 'textbook'}, {'source': 'article'}],
    ids=[1, 2]
)

# Query with raw text too — no manual encode() needed
results = client.query(collection_name='my_docs', query_text='fast systems language')
for r in results:
    print(r.document, r.score)`
            },
          ]} />
        </Block>

        {/* Filtered Search Deep Dive */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Filtered search — why Qdrant does it better" color={color} />
          <InfoBox color={color} dark={dark}>ChromaDB's metadata filtering is a post-filter: it runs ANN search, gets N candidates, then filters by metadata from those candidates. If your filter removes 90% of results, you get far fewer than N back. Qdrant solves this with pre-filtering inside the HNSW graph using its ACORN algorithm — it respects the filter constraints while traversing the graph, not after. You always get exactly the number of results you asked for, even with aggressive filters.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            {
              n: '1',
              title: 'Index payload fields for fast filtering',
              body: `from qdrant_client.models import PayloadSchemaType

# Index a keyword field (for exact match filtering)
client.create_payload_index(
    collection_name='my_docs',
    field_name='source',
    field_schema=PayloadSchemaType.KEYWORD
)
# Index a numeric field (for range filtering)
client.create_payload_index(
    collection_name='my_docs',
    field_name='year',
    field_schema=PayloadSchemaType.INTEGER
)
# Indexed fields filter 10-100x faster than unindexed ones at scale`
            },
            {
              n: '2',
              title: 'Logical filter operators',
              body: `from qdrant_client.models import Filter, FieldCondition, MatchValue, MatchAny, Range

# must = AND, should = OR, must_not = NOT
filter_expr = Filter(
    must=[
        FieldCondition(key='topic', match=MatchAny(any=['history', 'tutorial'])),
    ],
    must_not=[
        FieldCondition(key='source', match=MatchValue(value='untrusted')),
    ],
    should=[
        FieldCondition(key='year', range=Range(gte=2023)),
    ]
)
# Combine must + should + must_not in a single query`
            },
            {
              n: '3',
              title: 'Scroll without a query vector (list or export)',
              body: `# No query vector needed — just iterate by filter
results, next_offset = client.scroll(
    collection_name='my_docs',
    scroll_filter=Filter(
        must=[FieldCondition(key='source', match=MatchValue(value='python_docs'))]
    ),
    limit=100,
    with_payload=True,
    with_vectors=False
)
# Use next_offset to paginate through all matching points`
            },
          ]} />
        </Block>

        {/* Qdrant vs ChromaDB vs Pinecone */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Qdrant vs ChromaDB vs Pinecone — when to use each" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            {
              label: 'ChromaDB',
              badge: 'Best for prototyping',
              body: 'Free, zero setup, runs in 3 lines of Python. Ideal for: learning RAG, Jupyter notebooks, personal projects, applications under a few hundred thousand vectors. Python-native design makes it the fastest way to start. Use it until performance becomes a concern — then graduate to Qdrant.'
            },
            {
              label: 'Qdrant',
              badge: 'Best for production performance',
              body: 'Free self-hosted, 1GB free cloud cluster. Rust-powered — 4x higher RPS than nearest competitor in benchmarks. HNSW filtered search is faster than ChromaDB at any scale. Choose Qdrant when: you have more than ~50K vectors, you need reliable filtered search, you are building something that will stay up in production, or you need Docker/Kubernetes deployment. The Python client is nearly as simple as ChromaDB.'
            },
            {
              label: 'Pinecone',
              badge: 'Best for managed cloud at scale',
              body: 'Fully managed — no infrastructure to run or maintain. Scales to billions of vectors, multi-region, automatic backups. Free tier: 2GB storage. Choose Pinecone when: you need enterprise SLAs, you cannot run your own infrastructure, or you are building a product where vector search uptime is business-critical. Most expensive option, but the ops overhead is zero. LangChain integration is identical to Qdrant — swap is a few lines of code.'
            },
            {
              label: 'Migration path',
              badge: 'Practical guide',
              body: 'Start with ChromaDB for fast iteration. Migrate to Qdrant when you hit performance walls, need reliable filtered search, or want to run in Docker. Migrate to Pinecone if you need managed infrastructure or multi-region availability. The LangChain vector store interface is nearly identical across all three — the same retriever chain code works with any of them.'
            },
          ]} />
        </Block>

        {/* Hybrid Search with FastEmbed */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Hybrid search — dense + sparse vectors" color={color} />
          <p style={{ ...P(sub), marginBottom: '0.875rem' }}>Hybrid search is Qdrant's most powerful differentiator. A pure dense vector search finds semantically similar content but misses exact keyword matches. A pure BM25 keyword search finds exact terms but misses paraphrases. Hybrid search runs both in parallel and merges results by Reciprocal Rank Fusion — capturing both. This matters in RAG: if a user asks about a specific function name or technical term, dense search alone can miss it entirely.</p>
          <Steps dark={dark} border={border} color={color} items={[
            {
              n: '1',
              title: 'Setup for hybrid search with FastEmbed',
              body: `# pip install qdrant-client[fastembed]
from qdrant_client import QdrantClient

client = QdrantClient(':memory:')

# Configure both dense and sparse encoders
client.set_model('sentence-transformers/all-MiniLM-L6-v2')           # dense
client.set_sparse_model('prithivida/Splade_PP_en_v1')                  # sparse

# Add documents — both vector types computed automatically
client.add(
    collection_name='hybrid_docs',
    documents=['Qdrant is written in Rust for performance', 'Python is great for prototyping'],
    metadata=[{'category': 'databases'}, {'category': 'languages'}]
)`
            },
            {
              n: '2',
              title: 'Run a hybrid query',
              body: `# One call — Qdrant queries both dense + sparse, merges with RRF
results = client.query(
    collection_name='hybrid_docs',
    query_text='Rust vector search performance',
    # RRF automatically balances dense semantic + sparse keyword signals
)
for r in results:
    print(r.document, r.score)
# Captures both "Rust" (exact keyword) and "performance" (semantic) in the same query`
            },
          ]} />
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Resume and Job Description Matcher</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Build a semantic job-matching engine using Qdrant. Collect 20 job descriptions from LinkedIn or Naukri (copy the text). Embed and store each as a Qdrant point, with metadata: company, role, required skills, experience level. Then input your resume text and query Qdrant for the top 5 most semantically similar job descriptions. Add payload filtering to restrict results by experience level. This is a real tool freshers use — and it demonstrates filtered vector search, the exact skill interviewers ask about.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Collect and structure job descriptions', body: 'Copy 20 job descriptions as plain text. Store each as a dict: {"text": "...", "company": "...", "role": "...", "exp_years": 0, "skills": ["Python", "SQL"]}. Save to a JSON file.' },
            { n: '2', title: 'Set up Qdrant and embed', body: 'Run Qdrant with Docker or use QdrantClient(path=\'./qdrant_data\') for local persistence. Use FastEmbed (all-MiniLM-L6-v2) to embed and upsert all job descriptions with payloads.' },
            { n: '3', title: 'Build the matcher with filtering', body: 'Embed your resume text. Query Qdrant with limit=5. Add a filter for exp_years <= 2 (fresher roles only). Print each match with company, role, score, and required skills.' },
            { n: '4', title: 'Add hybrid search', body: 'Swap to client.set_sparse_model() and use client.query() for hybrid search. Compare results with dense-only — notice how specific skill names (e.g., "FastAPI", "React") show up in hybrid that dense-only missed.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Qdrant open source + FastEmbed runs locally for free</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Always create a <strong style={{ color: txt }}>payload index</strong> on any field you filter by regularly — especially <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85em', background: dark ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.08)', padding: '0.1em 0.4em', borderRadius: 4, color: '#F59E0B' }}>source</code>, <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85em', background: dark ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.08)', padding: '0.1em 0.4em', borderRadius: 4, color: '#F59E0B' }}>category</code>, and numeric fields. Without an index, Qdrant scans every payload to evaluate the filter — slow at scale. With an index, filtering is O(log n). Call <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.82em' }}>client.create_payload_index(collection_name, field_name, PayloadSchemaType.KEYWORD)</code> right after creating your collection, before upserting data. This one habit is the difference between Qdrant feeling fast and feeling slow in production.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/vector/chromadb')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> ChromaDB
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/vector/weaviate')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Weaviate <ChevronRight size={14} />
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
