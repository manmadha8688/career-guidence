import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#8B5CF6'

export default function LlamaIndexPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Agents">
      <ToolHeader
        icon="🗂️"
        title="LlamaIndex — The Data Framework for RAG and Agents"
        tagline="Connect any LLM to your own data — documents, PDFs, databases, APIs"
        badges={[['✓ FREE (OSS)', '#4ADE80'], ['llamaindex.ai', color], ['Python & TypeScript', 'var(--text-muted)']]}
        overview={"LlamaIndex is one of the two biggest open-source frameworks for building AI applications over your own data, alongside LangChain. It began life as a pure Retrieval-Augmented Generation (RAG) framework — the toolkit for making an LLM read and answer questions about your documents — and has grown into a full agent framework. Where LangChain positions itself as a general-purpose orchestration library, LlamaIndex is opinionated and specialized around one hard problem: getting your private data (PDFs, Notion pages, SQL tables, APIs, a folder of notes) into a form an LLM can accurately retrieve and reason over. It gives you document loaders, chunking, embeddings, vector indexes, retrievers, query engines, and an agent loop on top. The core framework is MIT-licensed and free on pip; the company also ships a commercial managed layer (LlamaCloud / LlamaParse) for enterprise document parsing, but you never need it to learn or build. Available in both Python and TypeScript."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'LlamaIndex tutorial — build a RAG app over your documents', url: 'https://www.youtube.com/results?search_query=llamaindex+tutorial', dur: 'Search', note: 'Latest walkthroughs — install, load documents, build a query engine' },
            { label: 'LlamaIndex vs LangChain — which framework to choose', url: 'https://www.youtube.com/results?search_query=llamaindex+vs+langchain', dur: 'Search', note: 'Understand where each framework fits before you commit to one' },
            { label: 'LlamaIndex agents & workflows crash course', url: 'https://www.youtube.com/results?search_query=llamaindex+agents+workflows+tutorial', dur: 'Search', note: 'Beyond RAG — building tool-using agents with LlamaIndex' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What LlamaIndex is for — data, not just chat" color={color} />
          <InfoBox color={color}>{"An LLM only knows what was in its training data — it has never seen your class notes, your company's PDFs, or last week's report. LlamaIndex solves exactly this: it ingests your data, splits it into chunks, turns those chunks into embeddings, stores them in a vector index, and then — at question time — retrieves the most relevant chunks and hands them to the LLM as context. This is RAG, and LlamaIndex is arguably the most focused, batteries-included framework for it."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>The mental model is a five-stage pipeline: load → chunk → embed → index → query. LlamaIndex gives you a clean abstraction for each stage and a high-level API (VectorStoreIndex) that does all five in a few lines when you are prototyping, plus low-level control over every stage when you need to tune retrieval quality for production. It integrates with the vector databases you already know (Chroma, Pinecone, Qdrant, Weaviate), every major LLM provider, and 300+ data connectors on LlamaHub.</p>
          {[
            'Documents → Nodes — LlamaIndex loads your files and splits them into "Nodes" (chunks) with metadata preserved for filtering and citation',
            'VectorStoreIndex — the default index: embeds every node and stores it for semantic (meaning-based) search, not keyword matching',
            'Query engines — wrap an index in a .query() interface that retrieves relevant nodes and synthesises an answer with source citations',
            'Data connectors (LlamaHub) — 300+ loaders for PDFs, Notion, Google Docs, Slack, databases, websites, and APIs',
            'Agents & Workflows — use RAG query engines as tools inside a larger agent that can plan, call tools, and complete multi-step tasks',
          ].map((item, i) => (
            <div key={i} className="tool-layout-cando-item">
              <div className="tool-layout-cando-item__dot" />
              <span className="tool-layout-cando-item__text">{item}</span>
            </div>
          ))}
        </Block>
        <Block>
          <SubHead label="Key features" color={color} />
          <CardGrid color={color} items={[
            { name: 'VectorStoreIndex', desc: 'The core RAG building block. Point it at a folder of documents and it loads, chunks, embeds, and indexes them. index.as_query_engine() gives you a question-answering interface with source citations in a handful of lines.' },
            { name: 'Data Connectors (LlamaHub)', desc: '300+ community loaders: PDFs, DOCX, Notion, Google Drive, Slack, Confluence, SQL databases, GitHub repos, web pages, and APIs. SimpleDirectoryReader loads a whole folder of mixed file types automatically.' },
            { name: 'Query Engines & Retrievers', desc: 'Fine-grained control over retrieval: adjust top-k, add re-ranking, filter by metadata, or combine vector + keyword (hybrid) search. Retrieval quality is the #1 factor in RAG answer quality — LlamaIndex exposes every knob.' },
            { name: 'Agents & Workflows', desc: 'Build agents that use RAG query engines, functions, and other tools. Workflows is an event-driven system for orchestrating multi-step agentic pipelines with loops and branching — LlamaIndex\'s answer to complex control flow.' },
            { name: 'Model & vector-store agnostic', desc: 'Swap OpenAI for Anthropic, Gemini, Groq, or a local Ollama model with one line. Same for storage: Chroma, Pinecone, Qdrant, Weaviate, or an in-memory store for quick tests. No lock-in.' },
            { name: 'LlamaParse (optional, paid)', desc: 'A managed service for parsing messy real-world PDFs — tables, multi-column layouts, scanned docs. Free tier with monthly credits. Optional: the open-source framework works fine with standard parsers for most learning projects.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — your first RAG query" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Install LlamaIndex', body: 'pip install llama-index — the starter package bundles the core plus OpenAI defaults. For a lean install, use pip install llama-index-core and add only the integration packages you need (e.g. llama-index-llms-ollama, llama-index-embeddings-huggingface). Requires Python 3.10+.' },
            { n: '2', title: 'Choose your model', body: 'By default LlamaIndex uses OpenAI, so set OPENAI_API_KEY. To stay free, use a local model via Ollama (ollama pull llama3) and local HuggingFace embeddings — no API key, no cost. You configure both through the global Settings object.' },
            { n: '3', title: 'Put documents in a folder', body: 'Create a ./data folder and drop in the files you want to query — PDFs, .txt, .md, .docx. SimpleDirectoryReader reads them all automatically, detecting file types and extracting text.' },
            { n: '4', title: 'Build the index and query', body: 'Five lines is all it takes:\n\nfrom llama_index.core import VectorStoreIndex, SimpleDirectoryReader\ndocuments = SimpleDirectoryReader("data").load_data()\nindex = VectorStoreIndex.from_documents(documents)\nquery_engine = index.as_query_engine()\nprint(query_engine.query("What is this document about?"))' },
            { n: '5', title: 'Inspect the sources', body: 'response = query_engine.query("...") — then read response.source_nodes to see exactly which chunks were retrieved. This is how you debug bad answers: almost always a retrieval problem (wrong chunks), not the LLM.' },
            { n: '6', title: 'Persist the index', body: 'Embedding is the slow, costly step. Save it once with index.storage_context.persist("./storage") and reload with load_index_from_storage() on future runs so you never re-embed the same documents.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="LlamaIndex vs LangChain — which should you use?" color={color} />
          <Compare color={color} items={[
            { label: 'LlamaIndex — data-first', badge: 'Best for RAG over your data', body: 'Opinionated and specialized around ingestion, indexing, and retrieval. If your core problem is "make an LLM answer questions about my documents accurately," LlamaIndex gives you the shortest, cleanest path with the best default retrieval abstractions.' },
            { label: 'LangChain — orchestration-first', badge: 'Best for general LLM apps', body: 'A broader, general-purpose framework for chaining LLM calls, tools, memory, and agents. More building blocks, more flexibility, but less opinionated about the RAG data pipeline. The de facto standard many tutorials assume.' },
            { label: 'They are not mutually exclusive', badge: 'Often used together', body: 'A common pattern: use LlamaIndex for the retrieval layer (loading, indexing, querying your data) and plug that query engine into a LangChain or LangGraph agent as one tool among many. Learn the RAG concepts once — they transfer between both.' },
            { label: 'For students learning RAG', badge: 'Start with LlamaIndex', body: 'LlamaIndex\'s VectorStoreIndex teaches the RAG pipeline with the least ceremony. You will understand load → chunk → embed → index → query faster here, then apply that understanding anywhere. It is the gentlest on-ramp to the single most important applied-AI skill for jobs.' },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — "Chat With Your Syllabus" RAG App</span></div>
          <p className="tool-layout-task__desc">Build a RAG assistant over documents you actually care about — your course syllabus, lecture notes, a textbook chapter, or a set of research papers. Ask it exam-style questions and verify it answers only from your material, with citations. This teaches the single most job-relevant applied-AI skill: grounding an LLM in private data. Keep it free with local Ollama + HuggingFace embeddings.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Set up a free stack', body: 'pip install llama-index-core llama-index-llms-ollama llama-index-embeddings-huggingface. Install Ollama and run ollama pull llama3. This gives you a fully local, ₹0 stack — no API key, no per-query cost.' },
            { n: '2', title: 'Collect your documents', body: 'Make a ./data folder. Add your syllabus PDF, lecture note PDFs, or a textbook chapter. Aim for 5–15 documents so retrieval has something meaningful to choose between.' },
            { n: '3', title: 'Configure local models', body: 'Set the global Settings: Settings.llm = Ollama(model="llama3"), Settings.embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5"). Now everything runs offline on your machine.' },
            { n: '4', title: 'Build the index and query engine', body: 'documents = SimpleDirectoryReader("data").load_data(); index = VectorStoreIndex.from_documents(documents); qe = index.as_query_engine(similarity_top_k=4). Persist the index so you only embed once.' },
            { n: '5', title: 'Ask and verify sources', body: 'Ask 10 exam-style questions. For each, print response.source_nodes and confirm the answer actually came from your documents — not the model\'s pretraining. When an answer is wrong, check the retrieved chunks first; that is where the fix usually is.' },
            { n: '6', title: 'Wrap it in a simple UI', body: 'Put a Streamlit or Gradio text box in front of your query engine so anyone can ask questions. This turns a script into a portfolio-ready demo you can show in interviews as proof you can build grounded, citeable AI.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — LlamaIndex is MIT open source; local Ollama + HuggingFace embeddings keep API cost at ₹0</span></div>
        </div>
        <ProTip>
        When a RAG answer is wrong, resist the urge to blame the LLM or swap models — 90% of the time it is a retrieval problem. Before anything else, print response.source_nodes and read what was actually retrieved. If the right information is not in those chunks, the best LLM on earth cannot answer correctly. Fix retrieval first: adjust chunk size, raise similarity_top_k, add metadata filters, or try hybrid search. This debugging habit — inspect retrieval before touching the model — is what separates people who can ship reliable RAG from people who just chain calls and hope.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/agents/langchain', label: 'LangChain' }}
        next={{ path: '/ai-lab/agents/pydantic-ai', label: 'Pydantic AI' }}
      />
    </ToolPageShell>
  )
}
