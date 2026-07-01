import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#EC4899'

export default function QdrantPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Vector Databases">
      <ToolHeader
        icon="🎯"
        title="Qdrant — The Fastest Open-Source Vector Database"
        tagline="Rust-powered vector search — free local, 1GB free cloud cluster"
        badges={[['✓ FREE', '#4ADE80'], ['qdrant.tech', color], ['Rust-Powered', 'var(--text-muted)']]}
        overview={"Qdrant is the highest-performance open-source vector database available today — and it is free to self-host. Built entirely in Rust with no wrappers or dependencies on Python or Java, it delivers the lowest query latencies and highest requests-per-second of any vector database tested in independent benchmarks. The name stands for Quadrant: it divides vector space into regions for fast approximate nearest-neighbour lookup. You can run it locally with one Docker command, connect to it via the Python client, and query millions of vectors in milliseconds. For production, Qdrant Cloud offers a permanent free 1GB cluster — enough for hundreds of thousands of vectors. With 29,000+ GitHub stars and 250 million+ downloads, Qdrant has crossed the threshold from popular to production-standard. If ChromaDB is the right tool for prototyping, Qdrant is what you graduate to when performance and scale start to matter."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Qdrant Vector Database Full Course — Python, Filtering, RAG', url: 'https://www.youtube.com/watch?v=LRcZ9pbGnno', dur: '~45 min', note: 'Complete walkthrough: install, collections, upsert, search, filter, RAG pipeline' },
            { label: 'How to Build a Qdrant Vector Database for AI Agents | RAG Tutorial', url: 'https://www.youtube.com/watch?v=JSHWLGAysDM', dur: '~30 min', note: 'No-code + Python — build a production RAG knowledge base with Qdrant Cloud' },
            { label: 'Qdrant vs ChromaDB vs Pinecone — Which Vector DB Should You Use?', url: 'https://www.youtube.com/watch?v=dN0lsF2cvm4', dur: '~20 min', note: 'Side-by-side comparison — benchmarks, use cases, when to switch from Chroma' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why Rust makes Qdrant different" color={color} />
          <InfoBox color={color}>Qdrant is the only major vector database written entirely in Rust with a custom storage engine called Gridstore. Every other popular option — ChromaDB (Python/SQLite), Weaviate (Go), Milvus (Go + C++) — adds layers between your query and the hardware. Qdrant has none. The result: 4x higher requests-per-second than the next competitor in independent benchmarks, and the most consistent tail latencies under load. In Rust, memory is managed without a garbage collector, which means no GC pauses mid-query. For a latency-sensitive search engine, this is the most important architectural advantage possible.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The Rust architecture also means predictable memory usage. ChromaDB stores all active vectors in Python objects in RAM, which can spike unpredictably under concurrent load. Qdrant's memory-mapped files and custom storage engine let it serve vectors directly from disk when RAM is full — a feature called on-disk payload storage. You can run a Qdrant instance with 500K vectors on a server with 2GB RAM. ChromaDB would exhaust that RAM at a fraction of that count. This makes Qdrant the practical choice for any deployment where RAM is constrained or query volume is real.</p>
        </Block>
        <Block>
          <SubHead label="Key features that matter for production" color={color} />
          <CardGrid color={color} items={[
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
        <Block>
          <SubHead label="Getting started — three ways to run Qdrant" color={color} />
          <Steps color={color} items={[
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
        <Block>
          <SubHead label="Python client — core operations" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '0.875rem'}}>Every object in Qdrant is a <strong>Point</strong> — an ID + vector + optional payload. Points live inside a <strong>Collection</strong>, which has a fixed vector dimension and distance metric. The <code className="tool-inline-code">upsert</code> operation is insert-or-update: if a point with that ID already exists it is overwritten, otherwise it is created. This is the recommended write pattern — you never need separate insert vs update logic.</p>
          <Steps color={color} items={[
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
        <Block>
          <SubHead label="Filtered search — why Qdrant does it better" color={color} />
          <InfoBox color={color}>ChromaDB's metadata filtering is a post-filter: it runs ANN search, gets N candidates, then filters by metadata from those candidates. If your filter removes 90% of results, you get far fewer than N back. Qdrant solves this with pre-filtering inside the HNSW graph using its ACORN algorithm — it respects the filter constraints while traversing the graph, not after. You always get exactly the number of results you asked for, even with aggressive filters.</InfoBox>
          <Steps color={color} items={[
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
        <Block>
          <SubHead label="Qdrant vs ChromaDB vs Pinecone — when to use each" color={color} />
          <Compare color={color} items={[
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
        <Block>
          <SubHead label="Hybrid search — dense + sparse vectors" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '0.875rem'}}>Hybrid search is Qdrant's most powerful differentiator. A pure dense vector search finds semantically similar content but misses exact keyword matches. A pure BM25 keyword search finds exact terms but misses paraphrases. Hybrid search runs both in parallel and merges results by Reciprocal Rank Fusion — capturing both. This matters in RAG: if a user asks about a specific function name or technical term, dense search alone can miss it entirely.</p>
          <Steps color={color} items={[
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
        <ProjectTask
        title={"Resume and Job Description Matcher"}
        description={"Build a semantic job-matching engine using Qdrant. Collect 20 job descriptions from LinkedIn or Naukri (copy the text). Embed and store each as a Qdrant point, with metadata: company, role, required skills, experience level. Then input your resume text and query Qdrant for the top 5 most semantically similar job descriptions. Add payload filtering to restrict results by experience level. This is a real tool freshers use — and it demonstrates filtered vector search, the exact skill interviewers ask about."}
        costNote={"TOTAL COST: ₹0 — Qdrant open source + FastEmbed runs locally for free"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Collect and structure job descriptions', body: 'Copy 20 job descriptions as plain text. Store each as a dict: {"text": "...", "company": "...", "role": "...", "exp_years": 0, "skills": ["Python", "SQL"]}. Save to a JSON file.' },
            { n: '2', title: 'Set up Qdrant and embed', body: 'Run Qdrant with Docker or use QdrantClient(path=\'./qdrant_data\') for local persistence. Use FastEmbed (all-MiniLM-L6-v2) to embed and upsert all job descriptions with payloads.' },
            { n: '3', title: 'Build the matcher with filtering', body: 'Embed your resume text. Query Qdrant with limit=5. Add a filter for exp_years <= 2 (fresher roles only). Print each match with company, role, score, and required skills.' },
            { n: '4', title: 'Add hybrid search', body: 'Swap to client.set_sparse_model() and use client.query() for hybrid search. Compare results with dense-only — notice how specific skill names (e.g., "FastAPI", "React") show up in hybrid that dense-only missed.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Always create a <strong>payload index</strong> on any field you filter by regularly — especially <code className="tool-inline-code">source</code>, <code className="tool-inline-code">category</code>, and numeric fields. Without an index, Qdrant scans every payload to evaluate the filter — slow at scale. With an index, filtering is O(log n). Call <code className="tool-inline-code">client.create_payload_index(collection_name, field_name, PayloadSchemaType.KEYWORD)</code> right after creating your collection, before upserting data. This one habit is the difference between Qdrant feeling fast and feeling slow in production.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/vector/chromadb', label: 'ChromaDB' }}
        next={{ path: '/ai-lab/vector/weaviate', label: 'Weaviate' }}
      />
    </ToolPageShell>
  )
}
