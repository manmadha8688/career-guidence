import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#8B5CF6'

export default function WeaviatePage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Vector Databases">
      <ToolHeader
        icon="🕸️"
        title="Weaviate — Vector Database With Built-In Hybrid Search"
        tagline="Combine vector similarity and keyword search — automatic vectorization included"
        badges={[['✓ FREE', '#4ADE80'], ['weaviate.io', color], ['Open Source', 'var(--text-muted)']]}
        overview={"Weaviate is an open-source vector database built around two powerful ideas that set it apart: hybrid search and automatic vectorization. While ChromaDB and Pinecone require you to generate embeddings yourself before storing data, Weaviate can call embedding model providers — OpenAI, Cohere, HuggingFace — directly on your behalf. You configure a vectorizer on your collection and Weaviate handles the embedding automatically at insert and query time. The second differentiator is hybrid search: most vector databases do vector similarity OR keyword search. Weaviate does both simultaneously in a single query, fusing the results using a configurable BM25 + vector score blend. This matters because pure vector search misses exact keyword matches, while pure BM25 misses semantic meaning — hybrid captures both. Weaviate 1.35+ also adds object TTL for automatic data expiration, zstd compression for storage efficiency, and AI agent operations for autonomous database querying."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Weaviate Vector Database Full Tutorial — Getting Started in Python', url: 'https://www.youtube.com/watch?v=6hdEJdHWXRE', dur: '~25 min', note: 'End-to-end: create cluster, define schema, add data, run semantic and hybrid search' },
            { label: 'Weaviate Crash Course — Hybrid Search, Vectorizers & RAG', url: 'https://www.youtube.com/watch?v=BxB3lJpDFpg', dur: '~20 min', note: 'Hybrid search deep dive with alpha parameter, built-in vectorizers, practical RAG pipeline' },
            { label: 'Build a RAG App with Weaviate + LangChain — Step by Step', url: 'https://www.youtube.com/watch?v=lhby7Ql7hbk', dur: '~18 min', note: 'LangChain WeaviateVectorStore integration, retriever setup, question-answering chain' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why hybrid search is Weaviate's killer feature" color={color} />
          <InfoBox color={color}>Hybrid search combines two fundamentally different search algorithms — dense vector similarity (understanding meaning) and BM25F keyword matching (finding exact terms) — and fuses their result sets into a single ranked list. The <code className="tool-inline-code">alpha</code> parameter controls the blend: alpha=1 is pure vector search, alpha=0 is pure keyword search, alpha=0.5 balances both equally. Most production RAG applications benefit from alpha between 0.5 and 0.75.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The problem with pure vector search: if a user searches "GPT-4o API error code 429", a semantic search may return articles about API rate limits in general rather than the exact error. BM25 would find documents containing "429" directly. Hybrid search finds both semantically related content AND exact keyword matches simultaneously — critical for technical documentation, code search, product catalogs, and support systems. Weaviate uses Relative Score Fusion by default (configurable to Reciprocal Rank Fusion) to merge the two result sets fairly regardless of score distribution differences.</p>
        </Block>
        <Block>
          <SubHead label="Key features" color={color} />
          <CardGrid color={color} items={[
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
        <Block>
          <SubHead label="Three ways to run Weaviate" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Weaviate Cloud (fastest start — free Sandbox)', body: "# 1. Go to: https://console.weaviate.cloud\n# 2. Create account → New Cluster → Sandbox (free tier)\n# 3. Note your cluster URL and API key\n# Sandbox clusters last 14 days, auto-deleted — good for learning\n\npip install weaviate-client\n\nimport weaviate\nfrom weaviate.classes.init import Auth\n\nclient = weaviate.connect_to_weaviate_cloud(\n    cluster_url='https://your-cluster.weaviate.network',\n    auth_credentials=Auth.api_key('your-weaviate-api-key')\n)\nprint(client.is_ready())  # True" },
            { n: '2', title: 'Local Docker (no account needed, fully private)', body: "# docker-compose.yml\nversion: '3.4'\nservices:\n  weaviate:\n    image: cr.weaviate.io/semitechnologies/weaviate:1.28.0\n    ports: ['8080:8080', '50051:50051']\n    environment:\n      QUERY_DEFAULTS_LIMIT: 25\n      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'\n      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'\n      DEFAULT_VECTORIZER_MODULE: 'none'\n      CLUSTER_HOSTNAME: 'node1'\n    volumes: ['weaviate_data:/var/lib/weaviate']\nvolumes:\n  weaviate_data:\n\n# Run:\ndocker compose up -d\n\n# Connect:\nclient = weaviate.connect_to_local()  # defaults to localhost:8080" },
            { n: '3', title: 'Install client library', body: "pip install weaviate-client\n\n# For OpenAI auto-vectorization, also set your key:\n# Pass as header when connecting to Weaviate Cloud:\nimport weaviate\nfrom weaviate.classes.init import Auth, AdditionalConfig, Timeout\n\nclient = weaviate.connect_to_weaviate_cloud(\n    cluster_url='https://your-cluster.weaviate.network',\n    auth_credentials=Auth.api_key('your-weaviate-api-key'),\n    headers={'X-OpenAI-Api-Key': 'your-openai-key'}  # for auto-vectorization\n)" },
          ]} />
        </Block>
        <Block>
          <SubHead label="Built-in vectorizers — no pre-embedding needed" color={color} />
          <InfoBox color={color}>Weaviate's vectorizer modules are the feature that most surprises developers coming from ChromaDB or Pinecone. Instead of generating embeddings in your application code before inserting data, you configure a vectorizer on the collection. Weaviate then calls the embedding API automatically every time you insert a document or run a query. Your application code sends raw text — Weaviate handles the rest.</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Define a collection with auto-vectorization (OpenAI)', body: "import weaviate.classes.config as wc\n\nclient.collections.create(\n    name='Article',\n    vectorizer_config=wc.Configure.Vectorizer.text2vec_openai(\n        model='text-embedding-3-small'  # specify which OpenAI model\n    ),\n    properties=[\n        wc.Property(name='title', data_type=wc.DataType.TEXT),\n        wc.Property(name='body', data_type=wc.DataType.TEXT),\n        wc.Property(name='source', data_type=wc.DataType.TEXT),\n    ]\n)\n# Weaviate will call OpenAI embeddings API automatically on insert + query" },
            { n: '2', title: 'Use Cohere vectorizer (often better for RAG)', body: "client.collections.create(\n    name='Document',\n    vectorizer_config=wc.Configure.Vectorizer.text2vec_cohere(\n        model='embed-english-v3.0'\n    ),\n    properties=[\n        wc.Property(name='content', data_type=wc.DataType.TEXT),\n        wc.Property(name='category', data_type=wc.DataType.TEXT),\n    ]\n)\n# Pass Cohere API key in connection headers:\n# headers={'X-Cohere-Api-Key': 'your-cohere-key'}" },
            { n: '3', title: 'Use HuggingFace (free, no API key required for public models)', body: "client.collections.create(\n    name='Notes',\n    vectorizer_config=wc.Configure.Vectorizer.text2vec_huggingface(\n        model='sentence-transformers/all-MiniLM-L6-v2'  # free public model\n    ),\n    properties=[\n        wc.Property(name='text', data_type=wc.DataType.TEXT),\n    ]\n)\n# HuggingFace Inference API is free for public models\n# Pass: headers={'X-HuggingFace-Api-Key': 'your-hf-key'}" },
            { n: '4', title: 'Insert data — no embedding code needed', body: "articles = client.collections.get('Article')\n\n# Simple insert — Weaviate calls OpenAI automatically:\narticles.data.insert({\n    'title': 'Introduction to Vector Search',\n    'body': 'Vector search finds semantically similar documents using embeddings...',\n    'source': 'docs.company.com'\n})\n\n# Batch insert for efficiency:\nwith articles.batch.dynamic() as batch:\n    for doc in your_documents:\n        batch.add_object({'title': doc['title'], 'body': doc['body'], 'source': doc['source']})" },
          ]} />
        </Block>
        <Block>
          <SubHead label="Hybrid search — the core query pattern" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Hybrid search sends both a vector query and a BM25 keyword query simultaneously, then fuses the ranked results. The <code className="tool-inline-code">alpha</code> value is the most important parameter — higher alpha weights semantic similarity more, lower alpha weights keyword matching more. Start with 0.5 and tune from there based on your search quality tests.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Basic hybrid search', body: "from weaviate.classes.query import HybridFusion\n\narticles = client.collections.get('Article')\n\n# Hybrid search with equal weight (alpha=0.5)\nresults = articles.query.hybrid(\n    query='error handling in async Python',  # Weaviate embeds this automatically\n    alpha=0.5,         # 0=pure BM25, 1=pure vector, 0.5=balanced\n    limit=5\n)\nfor obj in results.objects:\n    print(obj.properties['title'])\n    print(obj.metadata.score)  # hybrid fusion score" },
            { n: '2', title: 'Hybrid search with metadata filter', body: "from weaviate.classes.query import Filter\n\n# Only search articles from a specific source + hybrid scoring\nresults = articles.query.hybrid(\n    query='rate limiting API 429',\n    alpha=0.6,  # slightly favor semantic\n    filters=Filter.by_property('source').equal('docs.company.com'),\n    limit=5,\n    return_properties=['title', 'body', 'source']\n)" },
            { n: '3', title: 'Pure vector search (for comparison)', body: "# nearText uses vector similarity only — no keyword component\nresults = articles.query.near_text(\n    query='Python exception handling patterns',\n    limit=5,\n    return_metadata=['distance']  # lower distance = more similar\n)\nfor obj in results.objects:\n    print(obj.properties['title'], '—', round(obj.metadata.distance, 3))" },
            { n: '4', title: 'BM25 keyword search (for comparison)', body: "# Pure BM25 — good for exact term matching, no semantic understanding\nresults = articles.query.bm25(\n    query='429 rate limit error',\n    limit=5\n)\n# Combine insights: if hybrid gives better results than either alone,\n# you are in a use case that benefits from Weaviate's core feature" },
          ]} />
        </Block>
        <Block>
          <SubHead label="Weaviate vs ChromaDB vs Pinecone" color={color} />
          <Compare color={color} items={[
            { label: 'ChromaDB', badge: 'Best for learning & prototyping', body: 'Zero setup, in-memory or local disk, 3 lines of Python to start. No automatic vectorization (you generate embeddings yourself). No built-in hybrid search (vector only). Free forever. Best for: learning RAG, personal projects, prototypes, applications under ~1M vectors. If you are just starting with vector databases, start here.' },
            { label: 'Weaviate', badge: 'Best for hybrid search & production RAG', body: 'Open source, self-hostable or Weaviate Cloud (free Sandbox). Built-in hybrid search (vector + BM25 combined). Automatic vectorization via OpenAI/Cohere/HuggingFace modules — no embedding code needed. Multi-tenancy for SaaS. Best for: production RAG apps needing both semantic and keyword search, technical documentation search, enterprise search, teams that want the vectorization handled for them.' },
            { label: 'Pinecone', badge: 'Best for pure scale & managed infra', body: 'Fully managed cloud, scales to billions of vectors, sub-33ms p99 latency, no infrastructure to operate. No self-hosting option. Free tier: ~100K vectors. Best for: production applications that need extreme scale, high availability, and zero infrastructure management. Pinecone focuses on pure vector search at scale — it does not have Weaviate\'s hybrid search or auto-vectorization built in.' },
            { label: 'When to use Weaviate specifically', badge: 'Decision guide', body: 'Choose Weaviate when: (1) you need hybrid search — combining semantic + keyword in one query, (2) you want the database to handle vectorization automatically so your code stays clean, (3) you are building a SaaS product that needs multi-tenancy, (4) you want to self-host a production vector database with horizontal scaling. Do not choose Weaviate if you just need a quick local prototype (use ChromaDB) or if you need managed cloud with billions of vectors and SLA guarantees (use Pinecone).' },
          ]} />
        </Block>
        <ProjectTask
        title={"Technical Documentation Search Engine"}
        description={"Build a documentation search engine that demonstrates Weaviate's hybrid search advantage. Pick a framework you use (Django, React, FastAPI — any framework with publicly available docs). Chunk 30-50 documentation sections into Weaviate using the HuggingFace vectorizer. Then build a simple interface to compare pure vector search vs pure BM25 vs hybrid search on the same query. This makes the hybrid advantage concrete: you will see exact queries that one method misses and the other catches."}
        costNote={"TOTAL COST: ₹0 — Weaviate open source + Docker local + HuggingFace free public model API"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Set up Weaviate locally with Docker', body: "Run docker compose up -d with the provided docker-compose.yml. Verify at http://localhost:8080/v1/meta. Create your collection with text2vec-huggingface vectorizer — free, no API key for public models. Add properties: title, content, url, section." },
            { n: '2', title: 'Collect and insert documentation chunks', body: "Collect 30-50 documentation pages or sections as plain text. Keep each chunk under 400 words for best retrieval quality. Insert in batch using articles.batch.dynamic(). Weaviate calls HuggingFace automatically — no embedding code in your app." },
            { n: '3', title: 'Build the comparison interface', body: "Write a Python script with three functions: search_vector(query), search_bm25(query), search_hybrid(query, alpha=0.5). For 10 test queries, print all three results side by side. Note which queries each method handles better — you will see patterns in 20 minutes." },
            { n: '4', title: 'Tune alpha and analyze results', body: "For keyword-heavy queries (exact function names, error codes, version numbers), try alpha=0.3. For conceptual queries (\"how to handle errors\", \"best practices for performance\"), try alpha=0.7. Find the alpha that works best across your test queries and explain why in a short README. This is the practical knowledge interviewers want to hear." },
          ]} />
      </ProjectTask>
        <ProTip>
        Always test your hybrid search with <code className="tool-inline-code">alpha=0</code>, <code className="tool-inline-code">alpha=1</code>, and <code className="tool-inline-code">alpha=0.5</code> on your actual dataset before picking a value. The "right" alpha is data-dependent: a product catalog with exact SKU codes needs low alpha (keyword dominant), while a support knowledge base benefits from higher alpha (semantic dominant). There is no universal default — the difference in retrieval quality between a wrong and right alpha can be significant enough to make or break your RAG application's usefulness.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/vector/pinecone', label: 'Pinecone' }}
        next={{ path: '/ai-lab/vector/qdrant', label: 'Qdrant' }}
      />
    </ToolPageShell>
  )
}
