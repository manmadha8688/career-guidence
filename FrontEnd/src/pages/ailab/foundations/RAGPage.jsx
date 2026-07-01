import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList,
  ProjectTask, ProTip, PageNavRow,
} from '../toolPageComponents'

const color = '#06B6D4'

export default function RAGPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="AI Foundations">
      <ToolHeader
        icon="📚"
        title="RAG — Retrieval Augmented Generation"
        tagline="How AI reads your own documents to answer questions accurately"
        badges={[['✓ FREE', '#4ADE80'], ['Concept + free open-source tools', color], ['AI Foundations', 'var(--text-muted)']]}
        overview="RAG is a technique that gives AI access to your own documents so it can answer questions based on that specific content — not from memory or training data. Instead of asking ChatGPT a general question and hoping it knows the answer, you give it your notes, reports, or codebase and it answers from there. No hallucination. No outdated information. No generic answers. This is how NotebookLM, custom chatbots, and enterprise AI assistants work."
      />

      <Block title="Watch first — understand the concept visually" titleColor="#EF4444">
        {[
          { label: 'RAG Explained for Beginners — KodeKloud', url: 'https://www.youtube.com/watch?v=_HQ2H_0Ayy0', dur: '10 min', note: 'Start here — clearest conceptual overview of how RAG works' },
          { label: 'RAG Crash Course for Beginners — KodeKloud', url: 'https://www.youtube.com/watch?v=swvzKSOEluc', dur: '59 min', note: 'Theory + hands-on labs — practical production-ready RAG' },
          { label: 'Learn RAG from Scratch — freeCodeCamp (LangChain Engineer)', url: 'https://www.youtube.com/watch?v=sVcwVQRHIc8', dur: '2.5 hrs', note: 'Advanced techniques: query translation, routing, RAPTOR — after basics' },
        ].map((v, i) => <VideoCard key={i} v={v} />)}
      </Block>

      <Block title="The problem RAG solves" titleColor={color}>
        <p className="tool-layout-block__para">Standard LLMs — ChatGPT, Claude, Gemini — have a serious limitation: they can only answer from what they learned during training. Ask GPT-4 about your company's internal policy document, your professor's lecture notes, or a codebase you wrote last week — it has no idea. Worse, it will try to answer anyway and make something up.</p>
        <p className="tool-layout-block__para">There is also the knowledge cutoff problem. Models are trained on data up to a certain date. A model trained in early 2024 knows nothing about libraries, frameworks, or events after that. You cannot ask it about the latest LangChain API changes or what happened in your industry last month.</p>
        <p className="tool-layout-block__para">RAG solves both. It gives the LLM fresh, specific, real content at the moment of each question. The LLM is no longer guessing from memory — it is reading from your actual documents and generating an answer based on what it finds there.</p>
        <InfoBox color={color}>
          RAG does not change the LLM — it changes what information the LLM gets to read before it answers. Think of it as giving the AI an open-book exam instead of a memory test.
        </InfoBox>
      </Block>

      <Block title="How RAG works — step by step" titleColor={color}>
        <p className="tool-layout-block__para">RAG has two phases. The first happens once when you set up your knowledge base. The second happens every time a user asks a question.</p>

        <SubHead label="Phase 1 — Building the knowledge base" color={color} />
        <Steps color={color} items={[
          { n: '1', title: 'Load your documents', body: 'Your PDFs, Word docs, website pages, code files — anything with text. A document loader reads them into memory.' },
          { n: '2', title: 'Split into chunks', body: 'Documents are too large to send to an LLM all at once. They get split into smaller pieces — usually 300-1000 words each — with some overlap between consecutive chunks so context is not lost at the boundaries.' },
          { n: '3', title: 'Create embeddings', body: 'Each chunk is passed through an embedding model which converts the text into a list of numbers — a vector — that represents its meaning. Chunks with similar meaning will have numerically similar vectors.' },
          { n: '4', title: 'Store in vector database', body: 'All the chunks and their vectors are saved in a vector database (ChromaDB, Pinecone). This database can search millions of chunks by meaning in milliseconds.' },
        ]} />

        <SubHead label="Phase 2 — Answering a question" color={color} />
        <Steps color={color} items={[
          { n: '5', title: 'User asks a question', body: 'The user types: "What is the deadline for the project submission?"' },
          { n: '6', title: 'Question is embedded', body: 'The question is converted to a vector using the same embedding model used in Phase 1.' },
          { n: '7', title: 'Retrieve similar chunks', body: 'The vector database finds the chunks whose vectors are most similar to the question vector — the chunks most likely to contain the answer.' },
          { n: '8', title: 'Build the prompt', body: 'The retrieved chunks + the original question are combined into a prompt: "Using only the following context: [chunks]. Answer this question: [question]."' },
          { n: '9', title: 'LLM generates the answer', body: 'The LLM reads the context and generates an answer based on the provided chunks — not from memory. If the answer is not in the chunks, a well-configured RAG system says "I do not have that information" instead of making something up.' },
        ]} />
      </Block>

      <Block title="The core components" titleColor={color}>
        <CardGrid color={color} items={[
          { name: 'Document Loader', desc: 'Reads files — PDFs, DOCX, HTML, CSV, YouTube transcripts. LangChain and LlamaIndex have loaders for 50+ formats.' },
          { name: 'Text Splitter', desc: 'Splits documents into chunks. The chunking strategy is critical — too small loses context, too large adds noise. Recursive character splitter is a good starting point.' },
          { name: 'Embedding Model', desc: 'Converts text to vectors. OpenAI ada-002 is common. Free options: Sentence-Transformers (all-MiniLM-L6-v2) runs on any laptop.' },
          { name: 'Vector Database', desc: 'Stores embeddings and enables fast similarity search. ChromaDB is free and runs locally. Pinecone is managed cloud. Qdrant, Weaviate, FAISS are other options.' },
          { name: 'Retriever', desc: 'Finds the top-K most relevant chunks for a given query. "Top K" is typically 3-6 chunks. Can use vector similarity, keyword search, or a hybrid of both.' },
          { name: 'LLM', desc: 'Generates the final answer from question + retrieved context. Can be GPT-4, Claude, or a free model via Groq. The LLM is told to answer only from the provided context.' },
        ]} />
      </Block>

      <Block title="RAG vs other approaches" titleColor={color}>
        <p className="tool-layout-block__para">Students often ask: "Why not just fine-tune the model?" or "Why not put everything in the prompt?" RAG is the right answer for most knowledge-related use cases, but understanding when it is not helps you make better decisions.</p>
        <Compare color={color} items={[
          { label: 'RAG vs Fine-tuning', badge: 'RAG wins for facts', body: 'Fine-tuning trains the model on your data — expensive ($500-$5000+), takes hours, requires ML expertise, and bakes knowledge permanently (hard to update). RAG costs nothing to set up, updates instantly by adding new documents, and works with any LLM. Use fine-tuning only when you need to change the model\'s style or behavior, not its knowledge.' },
          { label: 'RAG vs Stuffing context', badge: 'RAG wins for large docs', body: 'You could just paste your entire document into the prompt. Works for small docs (a few pages). Fails for anything larger — context limits are hit, cost explodes (GPT-4 charges per token), and the model struggles to focus with too much irrelevant content. RAG retrieves only relevant chunks.' },
          { label: 'RAG vs Prompt engineering', badge: 'Different purposes', body: 'Prompt engineering guides how the model reasons and responds. RAG provides the model with specific factual content. They are complementary — great RAG systems also have carefully engineered prompts.' },
          { label: 'RAG vs Search engines', badge: 'Depends on the use case', body: 'Search returns links and snippets. RAG generates a synthesized answer from your specific content. RAG is better when you want a conversational answer from private documents. Search is better for discovering new information across the public web.' },
        ]} />
      </Block>

      <Block title="Key concepts to understand" titleColor={color}>
        <p className="tool-layout-block__para">These terms come up constantly in RAG discussions. Understanding them makes reading documentation, tutorials, and research papers significantly easier.</p>
        <div className="tool-term-list">
          {[
            { term: 'Chunking strategy', body: 'How you split documents is one of the most impactful decisions in a RAG system. A chunk that splits mid-sentence or cuts a paragraph in half loses critical context. Recursive character splitting (LangChain\'s default) tries to split on paragraph breaks, then sentence breaks, then character limits. Semantic chunking splits based on meaning changes — more expensive but more accurate.' },
            { term: 'Top-K retrieval', body: 'When a question is asked, the retriever finds the K most similar chunks. K=3 means the top 3 chunks are sent to the LLM. Too small and you miss relevant information. Too large and you overwhelm the LLM with irrelevant context. 4-6 is typical for most applications.' },
            { term: 'Reranking', body: 'Vector similarity finds chunks that are mathematically close in embedding space. But the most mathematically similar is not always the most relevant. A reranker (like Cohere Rerank) applies a second, more expensive model to rescore the top-K candidates for true relevance. Significantly improves answer quality.' },
            { term: 'Hybrid search', body: 'Combines vector search (semantic similarity) with keyword search (BM25). Vector search is great for finding conceptually similar content even when exact words differ. Keyword search is great when exact terms matter (product names, codes, technical identifiers). Combining both gives better results than either alone.' },
            { term: 'Grounding', body: 'A grounded answer is one that comes directly from retrieved context — not from model memory. The LLM prompt instructs it to only use the provided documents and to say "I don\'t know" if the answer is not present. This is how you eliminate hallucination for your specific domain.' },
          ].map((item, i) => (
            <div key={i} className="tool-term-item">
              <div className="tool-term-item__label">{item.term}</div>
              <p className="tool-term-item__body">{item.body}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="When RAG fails — and why" titleColor="#EF4444">
        <p className="tool-layout-block__para">RAG is not magic. There are specific patterns that cause RAG systems to fail. Knowing these helps you build better systems and debug problems faster.</p>
        {[
          { problem: 'Bad chunking', fix: 'If chunks split mid-sentence or separate a question from its answer across chunks, retrieval finds the wrong content. Fix: use smaller chunks with overlap (50-100 word overlap between consecutive chunks).' },
          { problem: 'Wrong embedding model', fix: 'Different embedding models are trained for different purposes. A model trained on general English may perform poorly on technical documentation. Test a few models — Sentence-Transformers has many specialized options.' },
          { problem: 'Question-document mismatch', fix: 'RAG finds documents similar to the question. If the question is casual ("what\'s the refund policy?") but the document is formal ("Clause 4.2: Customer shall be entitled to..."), they may not match. HyDE (Hypothetical Document Embeddings) generates a hypothetical answer, then searches for similar content — fixes this mismatch.' },
          { problem: 'Questions requiring synthesis', fix: '"Summarize all the risk factors from this document" requires reading everything — RAG retrieves only top-K chunks. For synthesis questions, consider map-reduce chains or sequential reading instead of RAG.' },
        ].map((item, i) => (
          <div key={i} className="tool-security-item">
            <div className="tool-security-item__label">⚠ {item.problem}</div>
            <p className="tool-security-item__body">{item.fix}</p>
          </div>
        ))}
      </Block>

      <Block title="Tools and frameworks for building RAG" titleColor={color}>
        <div className="tool-tools-grid">
          {[
            { name: 'LangChain', role: 'RAG orchestration', note: 'Most popular, Python + JS', free: true },
            { name: 'LlamaIndex', role: 'RAG orchestration', note: 'Better for complex indexing', free: true },
            { name: 'ChromaDB', role: 'Vector database', note: 'Free, local, easiest to start', free: true },
            { name: 'Pinecone', role: 'Vector database', note: 'Managed cloud, free tier', free: true },
            { name: 'FAISS', role: 'Vector search', note: 'Facebook, local, fast', free: true },
            { name: 'Groq', role: 'Free LLM API', note: 'Llama 3 free, fast inference', free: true },
            { name: 'Sentence-Transformers', role: 'Free embeddings', note: 'Runs locally, no API key', free: true },
            { name: 'Cohere Rerank', role: 'Reranking', note: 'Free tier available', free: true },
          ].map((t, i) => (
            <div key={i} className="tool-tool-card">
              <div className="tool-tool-card__head">
                <span className="tool-tool-card__name">{t.name}</span>
                {t.free && <span className="tool-tool-card__free">FREE</span>}
              </div>
              <div className="tool-tool-card__role">{t.role}</div>
              <div className="tool-tool-card__note">{t.note}</div>
            </div>
          ))}
        </div>
      </Block>

      <Block title="What you can do after learning RAG" titleColor={color}>
        <CanDoList items={[
          'Build a chatbot that answers questions from your own PDFs — lecture notes, textbooks, manuals',
          'Create a knowledge base for a company or college project where AI gives grounded answers',
          'Add a "search your notes" feature to any application without traditional keyword search',
          'Build a portfolio project that demonstrates AI engineering skills to employers',
          'Understand how products like NotebookLM and custom GPTs actually work under the hood',
          'Design AI features that cannot hallucinate because they are anchored in real documents',
        ]} />
      </Block>

      <ProjectTask
        title="Build a Study Notes Chatbot"
        description={'Build a chatbot that answers questions from your own semester notes using RAG. Upload your lecture PDFs to ChromaDB, connect it to the Groq API (free Llama 3), and build a simple Python chatbot using LangChain. Ask it "What are the key differences between supervised and unsupervised learning?" and it should answer using your actual lecture content — not generic internet knowledge.'}
        costNote="TOTAL COST: ₹0 — Groq is free, ChromaDB is free, Sentence-Transformers is free"
      >
        <div className="tool-layout-task__steps">
          {['1. pip install langchain chromadb sentence-transformers groq', '2. Load your PDF lecture notes with PyPDFLoader', '3. Split into 500-word chunks with RecursiveCharacterTextSplitter', '4. Embed with HuggingFaceEmbeddings (free, local)', '5. Store in ChromaDB vector store', '6. Build a RetrievalQA chain with Groq as the LLM', '7. Ask questions and see answers grounded in your notes'].map((step, i) => (
            <div key={i} className="tool-example-row">
              <span className="tool-example-row__marker">{i === 0 ? '→' : ' '}</span>
              <code className="tool-example-row__code">{step}</code>
            </div>
          ))}
        </div>
      </ProjectTask>

      <ProTip>
        Start with ChromaDB running in-memory (no configuration, zero setup) to build and test your pipeline. Once it works, switch to persistent storage with one parameter change. Build with Groq for zero cost, then decide if you need GPT-4 quality for production. Most student RAG projects work perfectly with free models.
      </ProTip>

      <PageNavRow
        prev={{ path: '/ai-lab/embeddings-vectors', label: 'Embeddings & Vectors' }}
        next={{ path: '/ai-lab/chatgpt', label: 'ChatGPT' }}
      />
    </ToolPageShell>
  )
}
