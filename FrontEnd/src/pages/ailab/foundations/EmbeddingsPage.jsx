import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#10B981'

export default function EmbeddingsPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="AI Foundations">
      <ToolHeader
        icon="🔢"
        title="Embeddings & Vector Databases"
        tagline="How AI stores, searches, and finds meaning in data"
        badges={[['✓ FREE', '#4ADE80'], ['Free open-source tools available', color], ['AI Foundations', 'var(--text-muted)']]}
        overview={"An embedding is a way of converting any content — text, images, audio, code — into a list of numbers that represents its meaning. The key insight: similar meaning produces numerically similar vectors. \"The cat sat on the mat\" and \"A feline rested on the rug\" use completely different words but their embeddings will be close to each other in the mathematical space. This ability to represent and compare meaning mathematically is the foundation of RAG systems, semantic search, recommendation engines, and AI memory. Every production AI application that works with documents or knowledge uses this technology."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Vector Embeddings Explained — Fireship', url: 'https://www.youtube.com/watch?v=yfHHvmeh7dM', dur: '8 min', note: 'Best visual explainer — start here, very clear' },
            { label: 'Vector Databases Simply Explained — Fireship', url: 'https://www.youtube.com/watch?v=klTvEwg3oJ4', dur: '6 min', note: 'What vector DBs are and why they exist' },
            { label: 'Vector Databases Full Tutorial — freeCodeCamp', url: 'https://www.youtube.com/watch?v=dN0lsF2cvm8', dur: '45 min', note: 'Build a semantic search system from scratch in Python — hands-on' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <p className="tool-layout-block__para">To understand why embeddings exist, start with what traditional search cannot do. A database stores the text "myocardial infarction treatment guidelines". A user searches "how to treat a heart attack". Keyword search finds nothing — the words do not match. An embedding-based search finds it immediately, because both phrases carry the same medical meaning and their embedding vectors are numerically close.</p>
          <InfoBox color={color}>Embeddings encode meaning as geometry. Similar meanings are physically close in a high-dimensional mathematical space. Finding semantically similar content means finding vectors that are close together — like finding nearby points on a map, except the map has 768 or 1536 dimensions instead of 2.</InfoBox>
          <p className="tool-layout-block__para tool-layout-block__para--flush">An embedding model converts text into a fixed-length list of numbers — typically 384 to 1536 floating point values. These numbers are not arbitrary: they are learned through training on massive amounts of text to capture semantic relationships. The model learns that "king - man + woman ≈ queen" is expressible as a vector arithmetic operation. This is not programmed explicitly — it emerges from the training process.</p>
        </Block>
        <Block>
          <SubHead label="How embeddings work — step by step" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Input text arrives', body: 'Any piece of text — a sentence, a paragraph, a document section. The embedding model processes this as a sequence of tokens.' },
            { n: '2', title: 'The model encodes meaning', body: 'The embedding model (a transformer-based neural network) processes the tokens and produces a vector representation that captures the semantic content. The model was trained to make similar meanings produce similar vectors.' },
            { n: '3', title: 'Output: a vector of numbers', body: 'The result is a list of floats — e.g. [0.23, -0.41, 0.87, 0.12, ...] with 768 or 1536 values. This is the "embedding" — the text converted to a point in high-dimensional space.' },
            { n: '4', title: 'Stored in a vector database', body: 'The embedding is stored alongside the original text in a vector database (ChromaDB, Pinecone, Qdrant). The database indexes vectors for fast similarity search.' },
            { n: '5', title: 'Query time: embed the question', body: 'When a user asks a question, it is also passed through the same embedding model, producing another vector in the same mathematical space.' },
            { n: '6', title: 'Similarity search', body: 'The database finds the stored vectors that are closest to the query vector — measured by cosine similarity or dot product. These are the semantically most relevant stored documents.' },
            { n: '7', title: 'Return matched content', body: 'The original text associated with the closest vectors is returned as the search result. This is the content most likely to answer the question.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="How similarity is measured" color={color} />
          <p className="tool-layout-block__para">Vector databases measure similarity between embeddings using mathematical distance metrics. Understanding these helps you configure systems correctly.</p>
          <Compare color={color} items={[
            { label: 'Cosine similarity', badge: 'Most common', body: 'Measures the angle between two vectors — not their length. Two vectors pointing in the same direction have cosine similarity of 1.0 (identical meaning). Opposite directions: -1.0. Perpendicular: 0 (unrelated). Used when the magnitude of the vector does not matter, only its direction. Standard choice for text embeddings.' },
            { label: 'Dot product', badge: 'Fast, used in retrieval', body: 'Multiplies corresponding elements and sums them. Faster than cosine similarity but affected by vector magnitude. Used when embeddings are normalized (same magnitude), making it equivalent to cosine similarity at lower computational cost. Recommended by OpenAI for their embeddings.' },
            { label: 'Euclidean distance', badge: 'Less common for text', body: 'The straight-line distance between two points in vector space. Sensitive to vector magnitude, which makes it less ideal for text embeddings where you care about direction (meaning) not length. More commonly used in image embeddings and clustering.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Embedding models — which to use" color={color} />
          <p className="tool-layout-block__para">The choice of embedding model directly affects retrieval quality. Better embeddings = more relevant search results = better RAG answers. This is often more impactful than changing the LLM.</p>
          <div className="tool-table-wrap">
            <table className="tool-table" style={{ '--tool-color': color }}>
              <thead>
                <tr>
                  {['Model', 'Dimensions', 'Cost', 'Speed', 'Best For'].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { model: 'all-MiniLM-L6-v2', dim: '384', cost: 'Free (local)', speed: 'Very fast', best: 'General English, learning, prototyping' },
                  { model: 'BAAI/bge-large-en', dim: '1024', cost: 'Free (local)', speed: 'Moderate', best: 'Best free English quality, outperforms OpenAI' },
                  { model: 'text-embedding-3-small', dim: '1536', cost: '$0.02/1M tokens', speed: 'Fast (API)', best: 'Production, multilingual, OpenAI ecosystem' },
                  { model: 'text-embedding-3-large', dim: '3072', cost: '$0.13/1M tokens', speed: 'Moderate (API)', best: 'Highest quality tasks, complex semantic search' },
                  { model: 'Cohere embed-v3', dim: '1024', cost: 'Free trial', speed: 'Fast (API)', best: 'Strong multilingual including Indian languages' },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="tool-table__cell--accent">{row.model}</td>
                    <td>{row.dim}</td>
                    <td>{row.cost}</td>
                    <td>{row.speed}</td>
                    <td>{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="tool-footnote">all-MiniLM-L6-v2 and BAAI/bge-large-en are from Hugging Face Sentence-Transformers — completely free, run locally, no API key needed.</p>
        </Block>
        <Block>
          <SubHead label="Vector databases — what they do and which to use" color={color} />
          <p className="tool-layout-block__para">A vector database stores embeddings alongside metadata and original text, then provides fast similarity search across millions of vectors. Regular SQL databases cannot efficiently search by vector similarity — a vector database is specifically optimized for this operation.</p>
          <CardGrid color={color} items={[
            { name: 'ChromaDB', desc: 'Free, open source. Runs in Python memory or persists to disk. Zero configuration. Best for: learning, prototyping, projects with <1M vectors. Start here.' },
            { name: 'Pinecone', desc: 'Managed cloud. Free tier: 100k vectors. Scales to billions. Best for: deployed applications that need cloud vector storage without managing infrastructure.' },
            { name: 'Qdrant', desc: 'Open source, self-host or cloud. Better performance than ChromaDB at scale. Best for: production self-hosted deployments, advanced filtering needs.' },
            { name: 'Weaviate', desc: 'Open source with hybrid search built in. Combines vector similarity with BM25 keyword search. Best for: production apps that need both semantic and keyword search.' },
            { name: 'FAISS (Facebook)', desc: 'Library (not a database). Extremely fast, runs locally. Used in production at Facebook scale. Best for: high-performance local use, very large datasets.' },
            { name: 'pgvector', desc: 'PostgreSQL extension. Add vector search to an existing Postgres database. Best for: projects already using Postgres that need to add vector search.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Chunking — the most underrated decision in RAG systems" color={color} />
          <p className="tool-layout-block__para">Before embedding documents for a RAG system, they must be split into chunks — smaller pieces that fit within the embedding model's token limit and represent coherent semantic units. The chunking strategy is one of the most impactful decisions you make in building a RAG system, and most beginners get it wrong.</p>
          <InfoBox color="#EF4444">If chunks are too small: each chunk loses context — the answer to a question might require combining two adjacent chunks, but you only retrieved one. If chunks are too large: each chunk contains irrelevant content that confuses the LLM and reduces answer precision.</InfoBox>
          <Compare color={color} items={[
            { label: 'Fixed-size chunking', badge: 'Simplest, often wrong', body: 'Split every N characters regardless of content. "chunk_size=500, chunk_overlap=50" in LangChain. Fast to implement but often splits mid-sentence or mid-paragraph, breaking semantic coherence. Good enough for dense technical text where every chunk is dense with relevant information.' },
            { label: 'Recursive character splitting', badge: 'LangChain default, better', body: 'Try to split on paragraph breaks (\\n\\n) first, then sentence breaks (\\n), then character limits. Preserves more natural semantic boundaries. This is RecursiveCharacterTextSplitter in LangChain and is a better starting point than fixed-size.' },
            { label: 'Semantic chunking', badge: 'Best quality, more expensive', body: 'Embed sentences, then group consecutive sentences with similar embeddings into chunks. Splits happen where meaning changes rather than at arbitrary character counts. Produces the most semantically coherent chunks at the cost of more processing time and embedding calls.' },
          ]} />
          <p className="tool-layout-block__para tool-layout-block__para--flush">Practical starting point: chunk_size=800-1000 characters with chunk_overlap=100-150. The overlap ensures content at chunk boundaries is captured in adjacent chunks. Tune based on your document type — short Q&A content benefits from smaller chunks (300-400), narrative text from larger ones (1000-1500).</p>
        </Block>
        <Block>
          <SubHead label="Where embeddings appear in real products" color={color} />
          <div className="tool-example-grid" style={{ '--tool-color': color }}>
            {[
              { product: 'Spotify / YouTube recommendations', how: 'Your listening/viewing history is embedded. New content is embedded. You are shown content whose embedding is closest to your behavior embedding.' },
              { product: 'GitHub Copilot context', how: 'Your open files and recent code are embedded. The most relevant code context is retrieved and sent to the LLM with your cursor position.' },
              { product: 'NotebookLM', how: 'Your uploaded documents are chunked and embedded into ChromaDB. Your question is embedded and the most relevant document chunks are retrieved before Claude generates an answer.' },
              { product: 'Google Search (partially)', how: 'Neural matching uses embeddings to understand query intent beyond keywords. "good restaurants near me" finds pages about "nearby dining options" even without those exact words.' },
              { product: 'Email spam filters', how: 'Email content is embedded. Spam emails cluster near each other in embedding space. New emails close to known-spam embeddings are flagged.' },
              { product: 'Code semantic search', how: 'GitHub\'s code search embeds repository code. Searching "function that converts timestamps to ISO format" finds relevant code even without those exact variable names.' },
            ].map((item, i) => (
              <div key={i} className="tool-example-card">
                <div className="tool-example-card__title">{item.product}</div>
                <p className="tool-example-card__desc">{item.how}</p>
              </div>
            ))}
          </div>
        </Block>
        <Block>
          <SubHead label="What affects embedding quality" color={color} />
          <Compare color={color} items={[
            { label: 'Domain specificity', body: 'General embedding models are trained on broad web text. For a specialized domain (medical, legal, Indian languages, niche technical), a domain-specific embedding model will significantly outperform a general one. Hugging Face has models fine-tuned for code, biomedical text, legal text, and multiple Indian languages.' },
            { label: 'Chunk quality', body: 'The embedding of a well-formed paragraph with complete sentences and a single topic is more semantically precise than the embedding of a chunk that was split mid-sentence. Garbage in, garbage out — poor chunking produces embeddings that are hard to search effectively.' },
            { label: 'Context vs. keywords', body: 'Short snippets (a single sentence) embed differently than longer passages. A single sentence captures a narrow meaning. A paragraph captures a richer, more contextual meaning. For Q&A tasks, chunk size 300-800 words tends to give better retrieval than either very short or very long chunks.' },
            { label: 'Multilingual coverage', body: 'Most popular free embedding models are trained primarily on English. For content in Hindi, Tamil, Telugu, or other Indian languages, use models specifically trained for those languages. Cohere embed-v3 and LaBSE (Language-Agnostic BERT Sentence Embeddings) have strong Indian language support.' },
          ]} />
        </Block>
        <Block title="What you can do after understanding this" titleColor={color}>
        <CanDoList items={[
          'Build semantic search that finds content by meaning — not just exact keyword matches',
            'Understand and implement the retrieval layer of any RAG application from scratch',
            'Choose the right embedding model for your domain — not just the most popular one',
            'Debug poor RAG retrieval by identifying whether the problem is chunking, embedding model, or similarity threshold',
            'Add semantic search to any web application using ChromaDB (free, local) or Pinecone (cloud)',
            'Understand how Spotify, YouTube, GitHub, and Google use embeddings in their products',
        ]} />
      </Block>
        <ProjectTask
        title={"Semantic Search in 15 Lines"}
        description={"Build a semantic search system over a small document collection. Search for \"machine learning algorithms\" and see it correctly find documents that mention \"neural networks\" and \"decision trees\" — even though those exact words are not in the search query. Then compare with keyword search on the same data to see the concrete difference."}
        costNote={"TOTAL COST: ₹0 — Sentence-Transformers and ChromaDB are both fully free and open source"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Install dependencies', body: 'pip install sentence-transformers chromadb\n(Both free, run locally, no API key needed)' },
            { n: '2', title: 'Create your document collection', body: 'Write or copy 15-20 short text snippets on a topic you know well — study notes, Wikipedia paragraphs, anything. One paragraph per document.' },
            { n: '3', title: 'Embed and store', body: 'from sentence_transformers import SentenceTransformer; import chromadb\nmodel = SentenceTransformer("all-MiniLM-L6-v2")\nCreate a ChromaDB collection, embed each document, add to collection.' },
            { n: '4', title: 'Query semantically', body: 'Search for 5 queries that are about the content but use different vocabulary than the documents. See what it retrieves.' },
            { n: '5', title: 'Compare with keyword search', body: 'Run the same 5 queries as simple string.contains() keyword search. Compare: what does semantic search find that keyword search misses? This is the value of embeddings made concrete.' },
          ]} />
      </ProjectTask>
        <ProTip>
        The embedding model you choose has more impact on RAG quality than the LLM you choose for generation. A mediocre LLM with excellent retrieval gives better answers than an excellent LLM with poor retrieval — because if the wrong documents are retrieved, even GPT-5.5 cannot answer correctly from them. Spend time testing and choosing your embedding model. Try at least two options: all-MiniLM-L6-v2 (fast, decent) and BAAI/bge-large-en-v1.5 (slower, significantly better). Measure which one retrieves more relevant chunks for your specific content domain.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/foundations/rag', label: 'RAG' }}
        next={{ path: '/ai-lab/chatbots/chatgpt', label: 'ChatGPT' }}
      />
    </ToolPageShell>
  )
}
