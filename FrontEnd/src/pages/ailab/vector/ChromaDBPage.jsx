import { InfoBox, Steps, Compare, SubHead } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#14B8A6'

export default function ChromaDBPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Vector Databases">
      <ToolHeader
        icon="🎯"
        title="ChromaDB — The Developer-Friendly Vector Database"
        tagline="Start locally in seconds, scale to production when ready"
        badges={[['✓ FREE', '#4ADE80'], ['Open source', color], ['Python & JS', 'var(--text-muted)']]}
        overview={<>ChromaDB is the most popular vector database for Python developers — specifically because of how fast it is to start. <code className="tool-inline-code">import chromadb; client = chromadb.Client(); collection = client.create_collection(&apos;docs&apos;)</code> — that is a running in-memory vector database in three lines. No Docker, no configuration, no server. For learning RAG, prototyping AI features, and building applications that do not need to scale to millions of vectors, ChromaDB is the right starting point. It handles the full vector store lifecycle: add documents with embeddings, query by semantic similarity, filter by metadata, and persist to disk. Version 0.5+ introduced the HttpClient for connecting to a persistent server and better performance at scale.</>}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'ChromaDB Crash Course in 20 Minutes — Python Vector Database', url: 'https://www.youtube.com/watch?v=cm2Ze2n9lxw', dur: '20 min', note: 'Best quick start — create, add, query, persist with Python' },
            { label: 'ChromaDB Tutorial for Beginners — Create, Store & Query Vectors', url: 'https://www.youtube.com/watch?v=_Ci1tLMafQs', dur: '~20 min', note: 'Beginner-friendly — embeddings, metadata filtering, persistence' },
            { label: 'ChromaDB Tutorial: Store & Query Document Embeddings (OpenAI + Python)', url: 'https://www.youtube.com/watch?v=5_BuuBJSyOc', dur: '~20 min', note: 'OpenAI embeddings + ChromaDB — full RAG retrieval pipeline' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="ChromaDB modes" color={color} />
          <InfoBox color={color}>ChromaDB runs in three modes: in-memory (data lives in RAM, lost when program ends), persistent (data saved to disk, survives restarts), and client-server (ChromaDB runs as a separate server process, your code connects to it via HTTP). Use in-memory for quick experiments, persistent for most development and small production apps, and client-server when multiple processes or services need to share the same vector store.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The persistent mode is what most developers use for real applications. <code className="tool-inline-code">chromadb.PersistentClient(path='./chroma_db')</code> creates or loads a vector database from disk. All collections, documents, embeddings, and metadata are stored in that directory. The database loads in milliseconds on subsequent runs — you do not re-embed documents every time your application starts. This makes it practical for personal projects and moderate-scale production use.</p>
        </Block>
        <Block>
          <SubHead label="Core concepts and API" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Create a client and collection', body: "import chromadb\n# In-memory:\nclient = chromadb.Client()\n# Persistent:\nclient = chromadb.PersistentClient(path='./chroma_db')\n# Create or get collection:\ncollection = client.get_or_create_collection(\n    name='my_docs',\n    metadata={'hnsw:space': 'cosine'}  # use cosine similarity\n)" },
            { n: '2', title: 'Add documents', body: "collection.add(\n    documents=['The cat sat on the mat', 'A feline rested on the rug'],\n    embeddings=[[0.1, 0.2, ...], [0.12, 0.18, ...]],  # your embedding vectors\n    metadatas=[{'source': 'doc1', 'page': 1}, {'source': 'doc1', 'page': 2}],\n    ids=['chunk_1', 'chunk_2']  # unique IDs, required\n)\nOr let ChromaDB embed for you using a built-in embedding function." },
            { n: '3', title: 'Query by similarity', body: "results = collection.query(\n    query_texts=['cat resting'],  # ChromaDB embeds this automatically if using built-in embedder\n    n_results=3,  # return top 3 most similar\n    where={'source': 'doc1'}  # optional metadata filter\n)\nprint(results['documents'])  # list of matching document texts\nprint(results['distances'])  # similarity scores" },
            { n: '4', title: 'Use with sentence-transformers', body: "from chromadb.utils import embedding_functions\nemf = embedding_functions.SentenceTransformerEmbeddingFunction(\n    model_name='all-MiniLM-L6-v2'\n)\ncollection = client.get_or_create_collection(\n    name='docs',\n    embedding_function=emf\n)\n# Now collection.add() and collection.query() accept raw text — no manual embedding needed" },
            { n: '5', title: 'Update and delete', body: "# Update documents:\ncollection.update(ids=['chunk_1'], documents=['Updated text'], metadatas=[{'source': 'doc1_v2'}])\n# Delete by ID:\ncollection.delete(ids=['chunk_1'])\n# Delete by metadata filter:\ncollection.delete(where={'source': 'old_doc'})" },
          ]} />
        </Block>
        <Block>
          <SubHead label="ChromaDB with LangChain" color={color} />
          <InfoBox color={color}>LangChain's Chroma integration wraps ChromaDB's API and adds retriever functionality — the standard interface used by all LangChain RAG chains. Use <code className="tool-inline-code">langchain_chroma.Chroma</code> (not the community package) for the current LangChain v0.3+ integration.</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Index documents', body: "from langchain_chroma import Chroma\nfrom langchain_huggingface import HuggingFaceEmbeddings\nembeddings = HuggingFaceEmbeddings(model_name='all-MiniLM-L6-v2')\nvectorstore = Chroma.from_documents(\n    documents=chunks,  # from your text splitter\n    embedding=embeddings,\n    persist_directory='./chroma_db',\n    collection_name='my_docs'\n)" },
            { n: '2', title: 'Load existing store', body: "# Load without re-indexing:\nvectorstore = Chroma(\n    persist_directory='./chroma_db',\n    embedding_function=embeddings,\n    collection_name='my_docs'\n)\n# Now retrieve:\nretriever = vectorstore.as_retriever(search_kwargs={'k': 4})" },
            { n: '3', title: 'Use in a chain', body: "from langchain_core.runnables import RunnablePassthrough\nchain = (\n    {'context': retriever, 'question': RunnablePassthrough()}\n    | prompt\n    | llm\n    | StrOutputParser()\n)\nresult = chain.invoke('Your question here')" },
          ]} />
        </Block>
        <Block>
          <SubHead label="Metadata filtering — ChromaDB's powerful feature" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>ChromaDB's <code className="tool-inline-code">where</code> parameter enables metadata filtering alongside vector similarity search. You can store source, page number, date, category, author, or any other fields as metadata when adding documents. Then filter at query time: only search documents from a specific source, only recent documents, only a specific category. This is critical for RAG systems with heterogeneous document collections.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Add metadata when indexing', body: "collection.add(\n    documents=[text],\n    ids=[doc_id],\n    metadatas=[{\n        'source': 'company_policy.pdf',\n        'section': 'HR',\n        'date': '2024-01',\n        'confidential': False\n    }]\n)" },
            { n: '2', title: 'Filter at query time', body: "results = collection.query(\n    query_texts=['vacation days policy'],\n    n_results=5,\n    where={\n        '$and': [\n            {'section': {'$eq': 'HR'}},\n            {'confidential': {'$eq': False}}\n        ]\n    }\n)" },
            { n: '3', title: 'Available filter operators', body: "$eq (equals), $ne (not equals), $gt/$gte/$lt/$lte (numeric comparison), $in (value in list), $nin (value not in list), $and/$or (logical). Combine for complex multi-condition filters on any metadata field." },
          ]} />
        </Block>
        <Block>
          <SubHead label="ChromaDB vs Pinecone" color={color} />
          <Compare color={color} items={[
            { label: 'ChromaDB', badge: 'Best for development', body: 'Free, self-hosted, zero setup, works locally. Perfect for: learning RAG, personal projects, applications up to ~1M vectors, development and prototyping. Disk-based persistence. No infrastructure to manage.' },
            { label: 'Pinecone', badge: 'Best for cloud production', body: 'Managed cloud, scales to billions of vectors, high availability, automatic backups. Free tier: 1 pod with ~100K vectors. Best for: production applications needing scale, reliability, or multi-region deployment. Managed infrastructure, no ops required.' },
            { label: 'When to migrate', badge: 'Practical guide', body: "Start with ChromaDB. Migrate to Pinecone when: your vector count exceeds what your server can handle (typically >1M), you need multi-region or high availability, or you need vector store infrastructure you don't maintain. The LangChain integration is nearly identical — swapping is a few lines of code." },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Start a working vector database in 3 lines of Python with zero configuration or setup',
            'Build complete RAG systems for personal projects with disk persistence — data survives restarts',
            'Filter vector search results by metadata to narrow searches to specific documents, dates, or categories',
            'Use with LangChain as a drop-in retriever for any RAG chain',
            'Migrate to Pinecone for production scale by changing one import — same LangChain interface',
        ]} />
      </Block>
        <ProjectTask
        title={"Personal Knowledge Base"}
        description={"Build a searchable personal knowledge base using ChromaDB. Collect 20-30 pieces of content you want to be able to find later: saved articles, notes, documentation snippets, key paragraphs from papers. Embed and store them in ChromaDB with metadata (source, topic, date). Then build a semantic search interface: type a question, get back the 3 most relevant items from your collection. This is a real tool you will keep using."}
        costNote={"TOTAL COST: ₹0 — ChromaDB is fully open source, all-MiniLM-L6-v2 runs locally for free"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Collect your documents', body: '20-30 text snippets, notes, or article summaries. Keep each under 500 words for best retrieval. Save as text files or a JSON file with text + source + topic metadata.' },
            { n: '2', title: 'Embed and index', body: "Use sentence-transformers all-MiniLM-L6-v2 (free, local). Add to a persistent ChromaDB collection with metadata: source, topic, date_added. Verify with collection.count()." },
            { n: '3', title: 'Build the search interface', body: 'Write a Python script that takes a query, embeds it, queries ChromaDB (n_results=3), and prints each result with its source and similarity score. Or build a simple Gradio UI around the same logic.' },
            { n: '4', title: 'Test semantic search quality', body: 'Try 10 queries that should find relevant content. Check if the right items appear. If retrieval is off, check your chunk sizes and metadata. Add more content to improve coverage.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Always call <code className="tool-inline-code">get_or_create_collection()</code> instead of <code className="tool-inline-code">create_collection()</code> in your application code. <code className="tool-inline-code">create_collection()</code> throws an error if the collection already exists — which breaks your app on every restart after the first run. <code className="tool-inline-code">get_or_create_collection()</code> creates it if missing and loads it if it exists. This one change makes your ChromaDB code safe to run repeatedly without clearing the database first.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/local/lmstudio', label: 'LM Studio' }}
        next={{ path: '/ai-lab/vector/pinecone', label: 'Pinecone' }}
      />
    </ToolPageShell>
  )
}
