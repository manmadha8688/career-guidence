import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, CardGrid, SubHead, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#8B5CF6'

export default function WeaviatePage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(139,92,246,0.09)' : 'rgba(139,92,246,0.13)'
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🕸️</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Weaviate — Vector Database With Built-In Hybrid Search</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Combine vector similarity and keyword search — automatic vectorization included</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['weaviate.io', color], ['Open Source', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Weaviate is an open-source vector database built around two powerful ideas that set it apart: hybrid search and automatic vectorization. While ChromaDB and Pinecone require you to generate embeddings yourself before storing data, Weaviate can call embedding model providers — OpenAI, Cohere, HuggingFace — directly on your behalf. You configure a vectorizer on your collection and Weaviate handles the embedding automatically at insert and query time. The second differentiator is hybrid search: most vector databases do vector similarity OR keyword search. Weaviate does both simultaneously in a single query, fusing the results using a configurable BM25 + vector score blend. This matters because pure vector search misses exact keyword matches, while pure BM25 misses semantic meaning — hybrid captures both. Weaviate 1.35+ also adds object TTL for automatic data expiration, zstd compression for storage efficiency, and AI agent operations for autonomous database querying.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Weaviate Vector Database Full Tutorial — Getting Started in Python', url: 'https://www.youtube.com/watch?v=6hdEJdHWXRE', dur: '~25 min', note: 'End-to-end: create cluster, define schema, add data, run semantic and hybrid search' },
            { label: 'Weaviate Crash Course — Hybrid Search, Vectorizers & RAG', url: 'https://www.youtube.com/watch?v=BxB3lJpDFpg', dur: '~20 min', note: 'Hybrid search deep dive with alpha parameter, built-in vectorizers, practical RAG pipeline' },
            { label: 'Build a RAG App with Weaviate + LangChain — Step by Step', url: 'https://www.youtube.com/watch?v=lhby7Ql7hbk', dur: '~18 min', note: 'LangChain WeaviateVectorStore integration, retriever setup, question-answering chain' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Hybrid search explained */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why hybrid search is Weaviate's killer feature" color={color} />
          <InfoBox color={color} dark={dark}>Hybrid search combines two fundamentally different search algorithms — dense vector similarity (understanding meaning) and BM25F keyword matching (finding exact terms) — and fuses their result sets into a single ranked list. The <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85em' }}>alpha</code> parameter controls the blend: alpha=1 is pure vector search, alpha=0 is pure keyword search, alpha=0.5 balances both equally. Most production RAG applications benefit from alpha between 0.5 and 0.75.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The problem with pure vector search: if a user searches "GPT-4o API error code 429", a semantic search may return articles about API rate limits in general rather than the exact error. BM25 would find documents containing "429" directly. Hybrid search finds both semantically related content AND exact keyword matches simultaneously — critical for technical documentation, code search, product catalogs, and support systems. Weaviate uses Relative Score Fusion by default (configurable to Reciprocal Rank Fusion) to merge the two result sets fairly regardless of score distribution differences.</p>
        </Block>

        {/* Key features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Key features" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Hybrid Search', desc: 'Vector + BM25F in one query with configurable alpha blending. No need to run two separate searches and merge manually.' },
            { name: 'Auto-Vectorization', desc: 'Configure a vectorizer (OpenAI, Cohere, HuggingFace) per collection — Weaviate calls the API automatically on insert and query.' },
            { name: 'GraphQL + REST + gRPC', desc: 'Three query interfaces. GraphQL for flexible queries, REST for CRUD operations, gRPC for high-throughput production.' },
            { name: 'Multi-Tenancy', desc: 'One Weaviate instance serves isolated tenants — separate storage, index, and permissions per tenant. Built for SaaS products.' },
            { name: 'Modules System', desc: 'Pluggable modules for vectorizers, rerankers, generative models, and custom NLP. Extend without changing core.' },
            { name: 'Metadata Filtering', desc: 'Filter vector search by structured properties with comparison operators — combine semantic and structured filters in one query.' },
            { name: 'Horizontal Scaling', desc: 'Kubernetes-native with sharding and replication. Scales from a single Docker container to multi-node clusters.' },
            { name: 'Named Vectors', desc: 'Store multiple vectors per object (e.g., title vector + body vector) and search each independently or together.' },
          ]} />
        </Block>

        {/* Setup */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Three ways to run Weaviate" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Weaviate Cloud (fastest start — free Sandbox)', body: "# 1. Go to: https://console.weaviate.cloud\n# 2. Create account → New Cluster → Sandbox (free tier)\n# 3. Note your cluster URL and API key\n# Sandbox clusters last 14 days, auto-deleted — good for learning\n\npip install weaviate-client\n\nimport weaviate\nfrom weaviate.classes.init import Auth\n\nclient = weaviate.connect_to_weaviate_cloud(\n    cluster_url='https://your-cluster.weaviate.network',\n    auth_credentials=Auth.api_key('your-weaviate-api-key')\n)\nprint(client.is_ready())  # True" },
            { n: '2', title: 'Local Docker (no account needed, fully private)', body: "# docker-compose.yml\nversion: '3.4'\nservices:\n  weaviate:\n    image: cr.weaviate.io/semitechnologies/weaviate:1.28.0\n    ports: ['8080:8080', '50051:50051']\n    environment:\n      QUERY_DEFAULTS_LIMIT: 25\n      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'\n      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'\n      DEFAULT_VECTORIZER_MODULE: 'none'\n      CLUSTER_HOSTNAME: 'node1'\n    volumes: ['weaviate_data:/var/lib/weaviate']\nvolumes:\n  weaviate_data:\n\n# Run:\ndocker compose up -d\n\n# Connect:\nclient = weaviate.connect_to_local()  # defaults to localhost:8080" },
            { n: '3', title: 'Install client library', body: "pip install weaviate-client\n\n# For OpenAI auto-vectorization, also set your key:\n# Pass as header when connecting to Weaviate Cloud:\nimport weaviate\nfrom weaviate.classes.init import Auth, AdditionalConfig, Timeout\n\nclient = weaviate.connect_to_weaviate_cloud(\n    cluster_url='https://your-cluster.weaviate.network',\n    auth_credentials=Auth.api_key('your-weaviate-api-key'),\n    headers={'X-OpenAI-Api-Key': 'your-openai-key'}  # for auto-vectorization\n)" },
          ]} />
        </Block>

        {/* Built-in vectorizers */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Built-in vectorizers — no pre-embedding needed" color={color} />
          <InfoBox color={color} dark={dark}>Weaviate's vectorizer modules are the feature that most surprises developers coming from ChromaDB or Pinecone. Instead of generating embeddings in your application code before inserting data, you configure a vectorizer on the collection. Weaviate then calls the embedding API automatically every time you insert a document or run a query. Your application code sends raw text — Weaviate handles the rest.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Define a collection with auto-vectorization (OpenAI)', body: "import weaviate.classes.config as wc\n\nclient.collections.create(\n    name='Article',\n    vectorizer_config=wc.Configure.Vectorizer.text2vec_openai(\n        model='text-embedding-3-small'  # specify which OpenAI model\n    ),\n    properties=[\n        wc.Property(name='title', data_type=wc.DataType.TEXT),\n        wc.Property(name='body', data_type=wc.DataType.TEXT),\n        wc.Property(name='source', data_type=wc.DataType.TEXT),\n    ]\n)\n# Weaviate will call OpenAI embeddings API automatically on insert + query" },
            { n: '2', title: 'Use Cohere vectorizer (often better for RAG)', body: "client.collections.create(\n    name='Document',\n    vectorizer_config=wc.Configure.Vectorizer.text2vec_cohere(\n        model='embed-english-v3.0'\n    ),\n    properties=[\n        wc.Property(name='content', data_type=wc.DataType.TEXT),\n        wc.Property(name='category', data_type=wc.DataType.TEXT),\n    ]\n)\n# Pass Cohere API key in connection headers:\n# headers={'X-Cohere-Api-Key': 'your-cohere-key'}" },
            { n: '3', title: 'Use HuggingFace (free, no API key required for public models)', body: "client.collections.create(\n    name='Notes',\n    vectorizer_config=wc.Configure.Vectorizer.text2vec_huggingface(\n        model='sentence-transformers/all-MiniLM-L6-v2'  # free public model\n    ),\n    properties=[\n        wc.Property(name='text', data_type=wc.DataType.TEXT),\n    ]\n)\n# HuggingFace Inference API is free for public models\n# Pass: headers={'X-HuggingFace-Api-Key': 'your-hf-key'}" },
            { n: '4', title: 'Insert data — no embedding code needed', body: "articles = client.collections.get('Article')\n\n# Simple insert — Weaviate calls OpenAI automatically:\narticles.data.insert({\n    'title': 'Introduction to Vector Search',\n    'body': 'Vector search finds semantically similar documents using embeddings...',\n    'source': 'docs.company.com'\n})\n\n# Batch insert for efficiency:\nwith articles.batch.dynamic() as batch:\n    for doc in your_documents:\n        batch.add_object({'title': doc['title'], 'body': doc['body'], 'source': doc['source']})" },
          ]} />
        </Block>

        {/* Hybrid search code */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Hybrid search — the core query pattern" color={color} />
          <p style={{ ...P(sub), marginBottom: '1rem' }}>Hybrid search sends both a vector query and a BM25 keyword query simultaneously, then fuses the ranked results. The <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.82em', background: dark ? 'rgba(139,92,246,0.1)' : 'rgba(139,92,246,0.08)', padding: '0.1em 0.4em', borderRadius: 4, color }}>alpha</code> value is the most important parameter — higher alpha weights semantic similarity more, lower alpha weights keyword matching more. Start with 0.5 and tune from there based on your search quality tests.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Basic hybrid search', body: "from weaviate.classes.query import HybridFusion\n\narticles = client.collections.get('Article')\n\n# Hybrid search with equal weight (alpha=0.5)\nresults = articles.query.hybrid(\n    query='error handling in async Python',  # Weaviate embeds this automatically\n    alpha=0.5,         # 0=pure BM25, 1=pure vector, 0.5=balanced\n    limit=5\n)\nfor obj in results.objects:\n    print(obj.properties['title'])\n    print(obj.metadata.score)  # hybrid fusion score" },
            { n: '2', title: 'Hybrid search with metadata filter', body: "from weaviate.classes.query import Filter\n\n# Only search articles from a specific source + hybrid scoring\nresults = articles.query.hybrid(\n    query='rate limiting API 429',\n    alpha=0.6,  # slightly favor semantic\n    filters=Filter.by_property('source').equal('docs.company.com'),\n    limit=5,\n    return_properties=['title', 'body', 'source']\n)" },
            { n: '3', title: 'Pure vector search (for comparison)', body: "# nearText uses vector similarity only — no keyword component\nresults = articles.query.near_text(\n    query='Python exception handling patterns',\n    limit=5,\n    return_metadata=['distance']  # lower distance = more similar\n)\nfor obj in results.objects:\n    print(obj.properties['title'], '—', round(obj.metadata.distance, 3))" },
            { n: '4', title: 'BM25 keyword search (for comparison)', body: "# Pure BM25 — good for exact term matching, no semantic understanding\nresults = articles.query.bm25(\n    query='429 rate limit error',\n    limit=5\n)\n# Combine insights: if hybrid gives better results than either alone,\n# you are in a use case that benefits from Weaviate's core feature" },
          ]} />
        </Block>

        {/* Comparison */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Weaviate vs ChromaDB vs Pinecone" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'ChromaDB', badge: 'Best for learning & prototyping', body: 'Zero setup, in-memory or local disk, 3 lines of Python to start. No automatic vectorization (you generate embeddings yourself). No built-in hybrid search (vector only). Free forever. Best for: learning RAG, personal projects, prototypes, applications under ~1M vectors. If you are just starting with vector databases, start here.' },
            { label: 'Weaviate', badge: 'Best for hybrid search & production RAG', body: 'Open source, self-hostable or Weaviate Cloud (free Sandbox). Built-in hybrid search (vector + BM25 combined). Automatic vectorization via OpenAI/Cohere/HuggingFace modules — no embedding code needed. Multi-tenancy for SaaS. Best for: production RAG apps needing both semantic and keyword search, technical documentation search, enterprise search, teams that want the vectorization handled for them.' },
            { label: 'Pinecone', badge: 'Best for pure scale & managed infra', body: 'Fully managed cloud, scales to billions of vectors, sub-33ms p99 latency, no infrastructure to operate. No self-hosting option. Free tier: ~100K vectors. Best for: production applications that need extreme scale, high availability, and zero infrastructure management. Pinecone focuses on pure vector search at scale — it does not have Weaviate\'s hybrid search or auto-vectorization built in.' },
            { label: 'When to use Weaviate specifically', badge: 'Decision guide', body: 'Choose Weaviate when: (1) you need hybrid search — combining semantic + keyword in one query, (2) you want the database to handle vectorization automatically so your code stays clean, (3) you are building a SaaS product that needs multi-tenancy, (4) you want to self-host a production vector database with horizontal scaling. Do not choose Weaviate if you just need a quick local prototype (use ChromaDB) or if you need managed cloud with billions of vectors and SLA guarantees (use Pinecone).' },
          ]} />
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Technical Documentation Search Engine</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Build a documentation search engine that demonstrates Weaviate's hybrid search advantage. Pick a framework you use (Django, React, FastAPI — any framework with publicly available docs). Chunk 30-50 documentation sections into Weaviate using the HuggingFace vectorizer. Then build a simple interface to compare pure vector search vs pure BM25 vs hybrid search on the same query. This makes the hybrid advantage concrete: you will see exact queries that one method misses and the other catches.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Set up Weaviate locally with Docker', body: "Run docker compose up -d with the provided docker-compose.yml. Verify at http://localhost:8080/v1/meta. Create your collection with text2vec-huggingface vectorizer — free, no API key for public models. Add properties: title, content, url, section." },
            { n: '2', title: 'Collect and insert documentation chunks', body: "Collect 30-50 documentation pages or sections as plain text. Keep each chunk under 400 words for best retrieval quality. Insert in batch using articles.batch.dynamic(). Weaviate calls HuggingFace automatically — no embedding code in your app." },
            { n: '3', title: 'Build the comparison interface', body: "Write a Python script with three functions: search_vector(query), search_bm25(query), search_hybrid(query, alpha=0.5). For 10 test queries, print all three results side by side. Note which queries each method handles better — you will see patterns in 20 minutes." },
            { n: '4', title: 'Tune alpha and analyze results', body: "For keyword-heavy queries (exact function names, error codes, version numbers), try alpha=0.3. For conceptual queries (\"how to handle errors\", \"best practices for performance\"), try alpha=0.7. Find the alpha that works best across your test queries and explain why in a short README. This is the practical knowledge interviewers want to hear." },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Weaviate open source + Docker local + HuggingFace free public model API</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Always test your hybrid search with <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85em', background: dark ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.08)', padding: '0.1em 0.4em', borderRadius: 4, color: '#F59E0B' }}>alpha=0</code>, <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85em', background: dark ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.08)', padding: '0.1em 0.4em', borderRadius: 4, color: '#F59E0B' }}>alpha=1</code>, and <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85em', background: dark ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.08)', padding: '0.1em 0.4em', borderRadius: 4, color: '#F59E0B' }}>alpha=0.5</code> on your actual dataset before picking a value. The "right" alpha is data-dependent: a product catalog with exact SKU codes needs low alpha (keyword dominant), while a support knowledge base benefits from higher alpha (semantic dominant). There is no universal default — the difference in retrieval quality between a wrong and right alpha can be significant enough to make or break your RAG application's usefulness.</p>
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
