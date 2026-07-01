import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#3ECF8E'

export default function SupabasePage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Vector Databases">
      <ToolHeader
        icon="⚡"
        title="Supabase — Add Vector Search to Your PostgreSQL Database"
        tagline="pgvector extension — semantic search in the same database as your app data"
        badges={[['✓ FREE TIER', '#4ADE80'], ['supabase.com', color], ['PostgreSQL', 'var(--text-muted)']]}
        overview={'Supabase is an open-source Firebase alternative built on PostgreSQL. Its vector search capability comes from enabling the pgvector extension — a native PostgreSQL plugin that adds a new vector data type and similarity operators directly to your existing database. The core idea: if you already use Supabase for authentication, row-level security, storage, and application data, you do not need a separate vector database at all. Your embeddings live in the same Postgres instance as your users table and your application rows — you can JOIN vector search results with user data, apply row-level security to vector queries, and run everything in a single database transaction. This is the "same database" advantage no dedicated vector DB can replicate.'}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Supabase Vector: The Postgres Vector Database — Paul Copplestone', url: 'https://www.youtube.com/watch?v=MDxEXKkxf2Q', dur: '~30 min', note: 'Official Supabase talk — pgvector, use cases, architecture deep dive' },
            { label: 'Supabase Postgres Vector DB Crash Course', url: 'https://www.youtube.com/watch?v=cyPZsbO5i5U', dur: 'Crash course', note: 'Enable pgvector, create vector columns, run similarity queries — hands-on' },
            { label: 'Supabase pgvector: The Vector Database Everyone Missed', url: 'https://www.youtube.com/watch?v=a2b2g5D64d4', dur: '2026', note: 'Why Supabase pgvector beats Pinecone for most teams — cost and integration case' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What is pgvector?" color={color} />
          <InfoBox color={color}>pgvector is an open-source PostgreSQL extension that adds native vector storage and similarity search. It introduces a <code className="tool-inline-code" style={{ '--tool-color': color }}>vector(n)</code> column type (where n is the number of dimensions), and three new distance operators: <code className="tool-inline-code" style={{ '--tool-color': color }}>&lt;-&gt;</code> for L2/Euclidean distance, <code className="tool-inline-code" style={{ '--tool-color': color }}>&lt;#&gt;</code> for negative inner product, and <code className="tool-inline-code" style={{ '--tool-color': color }}>&lt;=&gt;</code> for cosine distance. Supabase enables pgvector on every Postgres instance — you just run one SQL command to activate it.</InfoBox>
          <p className="tool-layout-block__para tool-layout-block__para--flush">Since pgvector 0.5.0, two index types are supported: <strong>IVFFlat</strong> (divides vectors into lists, fast to build, good recall at moderate scale) and <strong>HNSW</strong> (Hierarchical Navigable Small World — better recall, faster queries at scale, slightly more memory). For most student projects and apps up to a few million vectors, HNSW indexing on Supabase gives query times under 50ms without any tuning. Supabase automatically handles pgvector version updates and index creation in its managed platform.</p>
        </Block>
        <Block>
          <SubHead label="Key features and advantages" color={color} />
          <CardGrid color={color} items={[
            { name: 'Same database, zero friction', desc: 'Vectors stored alongside your users, posts, and products. JOIN, filter by user ID, apply row-level security — all in one query.' },
            { name: 'Full Postgres power', desc: 'ACID transactions, foreign keys, triggers, functions. Vector search is just another column — full SQL still works.' },
            { name: 'HNSW indexing', desc: 'Create an HNSW index on any vector column for fast approximate nearest-neighbor search. Matches dedicated DB performance up to ~10M vectors.' },
            { name: 'Row-level security', desc: "Supabase's RLS policies apply to vector queries too. Users can only search vectors they have access to — no extra access-control layer." },
            { name: 'Free 500MB database', desc: 'Supabase free tier includes a full Postgres instance with pgvector enabled. Build and deploy your AI app at zero cost.' },
            { name: 'Edge Functions for AI', desc: 'Run embedding generation serverlessly at the edge. Use Supabase Edge Functions (Deno) to call OpenAI or HuggingFace and insert vectors in one request.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — enable pgvector and add semantic search" color={color} />
          <Steps color={color} items={[
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
        <Block>
          <SubHead label="LangChain integration" color={color} />
          <InfoBox color={color}>LangChain has a first-class Supabase vector store integration via <code className="tool-inline-code" style={{ '--tool-color': color }}>langchain_community.vectorstores.SupabaseVectorStore</code>. It uses the same <code className="tool-inline-code" style={{ '--tool-color': color }}>match_documents</code> RPC pattern under the hood, so your Postgres function is the retrieval layer — LangChain is just the orchestration wrapper.</InfoBox>
          <Steps color={color} items={[
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
        <Block>
          <SubHead label="vecs — Supabase's native Python vector client" color={color} />
          <p className="tool-layout-block__para">
            Supabase ships <code className="tool-inline-code" style={{ '--tool-color': color }}>vecs</code> — a lightweight Python client specifically for managing vector collections in Postgres. It abstracts the SQL and index management so you interact with a higher-level collection API, similar to ChromaDB but backed by your Supabase Postgres instance. Use <code className="tool-inline-code" style={{ '--tool-color': color }}>vecs</code> when you want the simplicity of a vector client API without writing raw SQL, but still want Supabase/Postgres as the backend.
          </p>
          <Steps color={color} items={[
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
        <Block>
          <SubHead label="Supabase pgvector vs dedicated vector databases" color={color} />
          <Compare color={color} items={[
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
        <ProjectTask
        title={"Semantic FAQ Search for a Student Portfolio App"}
        description={"Build a semantic search feature into a Supabase project — the kind of thing you would add to a real app. Create a \"FAQ\" table with vector embeddings, then build a search function that returns the most relevant FAQ entries for any question, even if the wording is different. This demonstrates the exact pattern used in production AI-powered support systems."}
        costNote={"TOTAL COST: ₹0 — Supabase free tier + all-MiniLM-L6-v2 runs locally for free"}
      >
        <Steps color={color} items={[
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
      </ProjectTask>
        <ProTip>
        Always use <code className="tool-inline-code tool-inline-code--tip">cosine distance</code> (<code className="tool-inline-code tool-inline-code--tip">&lt;=&gt;</code> operator) for text embeddings from models like OpenAI or sentence-transformers — these models produce normalized vectors where cosine similarity reflects semantic closeness, not raw magnitude. The HNSW index type <code className="tool-inline-code tool-inline-code--tip">vector_cosine_ops</code> matches this operator — creating the index on <code className="tool-inline-code tool-inline-code--tip">vector_l2_ops</code> while querying with <code className="tool-inline-code tool-inline-code--tip">&lt;=&gt;</code> means the index is never used and every query does a full table scan. Match your index ops to your query operator and your similarity search stays fast even as the table grows.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/vector/pinecone', label: 'Pinecone' }}
        next={{ path: '/ai-lab/vector/qdrant', label: 'Qdrant' }}
      />
    </ToolPageShell>
  )
}
