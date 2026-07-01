import { InfoBox, Steps, Compare, SubHead } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#14B8A6'

export default function PineconePage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Vector Databases">
      <ToolHeader
        icon="🌲"
        title="Pinecone — Managed Vector Database for Production AI"
        tagline="Scale your RAG system to billions of vectors in the cloud"
        badges={[['✓ FREE tier', '#4ADE80'], ['Serverless available', color], ['Production-grade', 'var(--text-muted)']]}
        overview={"Pinecone is a fully managed, cloud-hosted vector database designed for production AI applications. Where ChromaDB runs on your machine and requires you to manage storage and scaling, Pinecone handles all infrastructure automatically — you upsert vectors via API, query by similarity, and Pinecone handles the rest. The free Starter plan includes one serverless index with enough capacity for ~100,000 vectors and thousands of queries per month. Pinecone's serverless tier (launched 2024) removed the previous per-hour pod pricing for small-scale use, making it genuinely free for personal projects and moderate-traffic applications. For any production AI application that needs to serve real users reliably, Pinecone is the standard choice in the industry."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'What is Pinecone Vector Database Explained + How to Use It (2025)', url: 'https://www.youtube.com/watch?v=Ab77M-k4dmc', dur: '~20 min', note: 'Concept + practical — serverless, upsert, query, metadata filtering' },
            { label: 'Pinecone Full Tutorial: Vector DB Setup', url: 'https://www.youtube.com/watch?v=laLrSH8qEm0', dur: '~25 min', note: 'Full setup walkthrough — index creation, Python client, namespaces' },
            { label: 'Pinecone Vector Database — Build Knowledgeable AI', url: 'https://www.youtube.com/watch?v=v4bye5Rfa3g', dur: '~20 min', note: 'End-to-end AI use case — embed documents, store, retrieve, generate' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Pinecone's architecture" color={color} />
          <InfoBox color={color}>Pinecone indexes use the HNSW (Hierarchical Navigable Small World) algorithm for approximate nearest neighbor search — finding the most similar vectors extremely fast even across billions of entries. Serverless indexes automatically scale compute and storage independently. You only pay for storage and query operations, not for idle time. For small applications, the free tier's allowances are never exhausted.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The key difference from self-hosted vector databases is operational overhead. With ChromaDB or Qdrant on your server, you manage backups, scaling, replication, and uptime. With Pinecone, none of this exists from your perspective — the API is just there, always available, always fast. For teams shipping production AI applications, this managed infrastructure saves significant engineering time. For solo developers, the free tier means production-ready vector storage at zero cost.</p>
        </Block>
        <Block>
          <SubHead label="Getting started" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Create account and index', body: "app.pinecone.io → Sign up free → Create Index. Choose: serverless (recommended), region (us-east-1 for lowest latency), dimensions (match your embedding model: 384 for MiniLM, 1536 for OpenAI text-embedding-3-small), metric (cosine for text)." },
            { n: '2', title: 'Install and initialize', body: "pip install pinecone\nfrom pinecone import Pinecone\npc = Pinecone(api_key=os.getenv('PINECONE_API_KEY'))\nindex = pc.Index('your-index-name')" },
            { n: '3', title: 'Upsert vectors', body: "# Upsert: insert or update\nindex.upsert(\n    vectors=[\n        {'id': 'chunk_1', 'values': [0.1, 0.2, ...], 'metadata': {'text': 'original text', 'source': 'doc.pdf', 'page': 1}},\n        {'id': 'chunk_2', 'values': [0.3, 0.4, ...], 'metadata': {'text': 'more text', 'source': 'doc.pdf', 'page': 2}},\n    ]\n)" },
            { n: '4', title: 'Query the index', body: "results = index.query(\n    vector=[0.1, 0.2, ...],  # your query embedding\n    top_k=5,\n    include_metadata=True,  # return stored metadata\n    filter={'source': 'doc.pdf'}  # optional metadata filter\n)\nfor match in results.matches:\n    print(match.score, match.metadata['text'])" },
            { n: '5', title: 'Batch upsert for large datasets', body: "# Upsert in batches of 100 (Pinecone recommendation)\nbatch_size = 100\nfor i in range(0, len(vectors), batch_size):\n    batch = vectors[i:i+batch_size]\n    index.upsert(vectors=batch)\nprint(f'Upserted {len(vectors)} vectors')" },
          ]} />
        </Block>
        <Block>
          <SubHead label="Pinecone with LangChain" color={color} />
          <InfoBox color={color}>LangChain's PineconeVectorStore integrates with Pinecone using the same retriever interface as ChromaDB. For applications that start on ChromaDB locally and need to migrate to Pinecone for production: change the vector store initialization (3 lines), and the rest of your RAG chain stays identical.</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Index documents', body: "from langchain_pinecone import PineconeVectorStore\nfrom langchain_huggingface import HuggingFaceEmbeddings\nembeddings = HuggingFaceEmbeddings(model_name='all-MiniLM-L6-v2')\nvectorstore = PineconeVectorStore.from_documents(\n    documents=chunks,\n    embedding=embeddings,\n    index_name='your-index-name',\n    pinecone_api_key=os.getenv('PINECONE_API_KEY')\n)" },
            { n: '2', title: 'Query and retrieve', body: "# Load existing index (no re-indexing):\nvectorstore = PineconeVectorStore(\n    index_name='your-index-name',\n    embedding=embeddings,\n    pinecone_api_key=os.getenv('PINECONE_API_KEY')\n)\nretriever = vectorstore.as_retriever(search_kwargs={'k': 4})" },
            { n: '3', title: 'Use in RAG chain', body: "# Same chain as ChromaDB — only the vectorstore initialization changed\nchain = (\n    {'context': retriever, 'question': RunnablePassthrough()}\n    | prompt\n    | llm\n    | StrOutputParser()\n)\n# ChromaDB → Pinecone migration: 3 lines changed, rest identical" },
          ]} />
        </Block>
        <Block>
          <SubHead label="Metadata filtering in Pinecone" color={color} />
          <Compare color={color} items={[
            { label: 'Equality filters', badge: 'Most common', body: "filter={'source': 'manual.pdf'} — find only vectors from a specific source. Works with any metadata field. Pinecone supports: $eq, $ne, $gt, $gte, $lt, $lte, $in, $nin operators." },
            { label: 'Combining filters', badge: 'AND / OR logic', body: "filter={'$and': [{'category': {'$eq': 'technical'}}, {'year': {'$gte': 2023}}]} — vectors that are both technical AND from 2023 or later. Use $or for either/or conditions." },
            { label: 'Metadata design matters', badge: 'Plan before indexing', body: 'Add metadata that reflects how you will filter at query time. Common useful fields: source filename, page/section, date, category, language, author. Hard to add retroactively — design your metadata schema before indexing.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Namespaces — multi-tenant vector storage" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Pinecone namespaces let you partition one index into isolated sections. Different users' data, different document collections, or different application environments (dev/staging/prod) can all live in the same index with complete isolation. Queries only search the specified namespace — different namespaces never interfere. This is cheaper than creating multiple indexes and simpler to manage.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Upsert to a namespace', body: "index.upsert(\n    vectors=[...],\n    namespace='user-123'  # isolates this data per user\n)\n# Query only this namespace:\nresults = index.query(vector=[...], top_k=5, namespace='user-123')" },
            { n: '2', title: 'Use for multi-tenant apps', body: 'For applications where different users upload their own documents: create one index, use namespace=user_id for each user. Their searches only find their own documents. Free tier supports unlimited namespaces in one index.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Pinecone vs ChromaDB" color={color} />
          <Compare color={color} items={[
            { label: 'ChromaDB', badge: 'Best for development', body: 'Zero cost, zero setup, runs locally. Perfect for learning, personal projects, and applications up to ~500K vectors. No API key needed. Self-managed storage. Use as your starting point.' },
            { label: 'Pinecone', badge: 'Best for production cloud', body: 'Managed infrastructure, scales to billions of vectors, high availability, no ops overhead. Free tier adequate for small production apps. Use when you need reliability and scale you cannot manage yourself.' },
            { label: 'Migration path', badge: 'Simple when ready', body: "Start with ChromaDB. When you need production scale: switch to Pinecone. LangChain's abstraction means 3 lines of code change and the entire RAG chain stays the same. Validate with ChromaDB first, deploy with Pinecone." },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          "Store and query up to ~100,000 vectors for free on Pinecone's serverless tier",
            'Build production RAG systems that serve real users at scale without managing vector database infrastructure',
            "Use namespaces to build multi-tenant applications where each user's documents are isolated",
            'Filter vector searches by metadata to scope queries to relevant subsets of your knowledge base',
            'Migrate from ChromaDB to Pinecone with 3 lines of LangChain code when you need cloud scale',
        ]} />
      </Block>
        <ProjectTask
        title={"Deploy Your RAG System to Production"}
        description={"Take the ChromaDB RAG system you built locally and migrate it to Pinecone. The goal: a publicly accessible RAG endpoint that anyone can query. Steps: create a Pinecone account, re-index your documents to Pinecone, wrap the chain in a FastAPI endpoint, deploy to Render or Railway (both have free tiers). Share the URL. You now have a live, production AI application."}
        costNote={"TOTAL COST: ₹0 — Pinecone free tier + Render free tier, no credit card required to start"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Create Pinecone index', body: "Sign up at pinecone.io. Create serverless index matching your embedding model's dimensions (384 for MiniLM). Note the index name and API key." },
            { n: '2', title: 'Re-index to Pinecone', body: 'Replace Chroma initialization with PineconeVectorStore.from_documents(). Run once to upsert all your document chunks. Verify in the Pinecone console that vectors were indexed.' },
            { n: '3', title: 'Wrap in FastAPI', body: 'Create main.py with FastAPI. One POST endpoint at /query that takes a question, runs the chain, returns the answer. Test locally first: uvicorn main:app --reload.' },
            { n: '4', title: 'Deploy to Render', body: 'Push to GitHub. Connect to render.com (free tier). Add environment variables: PINECONE_API_KEY. Deploy. You get a public HTTPS URL. Share it — your RAG system is live.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Store the original chunk text in Pinecone's metadata alongside any other metadata fields. Pinecone does not store document content by default — it only stores vectors and metadata. If you do not include the text in metadata, you get back similarity scores and IDs but not the actual content. Always add 'text': chunk.page_content to your metadata dict when upserting. This makes retrieval self-contained without needing a separate document store.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/vector/chromadb', label: 'ChromaDB' }}
        next={{ path: '/ai-lab/data/julius', label: 'Julius AI' }}
      />
    </ToolPageShell>
  )
}
