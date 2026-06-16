import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#10B981'

export default function EmbeddingsPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark  = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(0,217,255,0.09)' : 'rgba(79,70,229,0.11)'
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>AI Foundations</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🔢</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Embeddings & Vector Databases</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>How AI stores, searches, and finds meaning in data</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['Free open-source tools available', color], ['AI Foundations', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>An embedding is a way of converting any content — text, images, audio, code — into a list of numbers that represents its meaning. The key insight: similar meaning produces numerically similar vectors. "The cat sat on the mat" and "A feline rested on the rug" use completely different words but their embeddings will be close to each other in the mathematical space. This ability to represent and compare meaning mathematically is the foundation of RAG systems, semantic search, recommendation engines, and AI memory. Every production AI application that works with documents or knowledge uses this technology.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Vector Embeddings Explained — Fireship', url: 'https://www.youtube.com/watch?v=yfHHvmeh7dM', dur: '8 min', note: 'Best visual explainer — start here, very clear' },
            { label: 'Vector Databases Simply Explained — Fireship', url: 'https://www.youtube.com/watch?v=klTvEwg3oJ4', dur: '6 min', note: 'What vector DBs are and why they exist' },
            { label: 'Embeddings and Vector Databases — Full Python Tutorial', url: 'https://www.youtube.com/watch?v=4cBFCCELsFg', dur: '25 min', note: 'Hands-on implementation with code' },
            { label: 'Word2Vec Explained — StatQuest with Josh Starmer', url: 'https://www.youtube.com/watch?v=viZrOnJclY0', dur: '16 min', note: 'Intuitive explanation of how embeddings actually learn meaning' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* The core idea */}
        <Block dark={dark} border={border} card={card}>
          <p style={P(sub)}>To understand why embeddings exist, start with what traditional search cannot do. A database stores the text "myocardial infarction treatment guidelines". A user searches "how to treat a heart attack". Keyword search finds nothing — the words do not match. An embedding-based search finds it immediately, because both phrases carry the same medical meaning and their embedding vectors are numerically close.</p>
          <InfoBox color={color} dark={dark}>Embeddings encode meaning as geometry. Similar meanings are physically close in a high-dimensional mathematical space. Finding semantically similar content means finding vectors that are close together — like finding nearby points on a map, except the map has 768 or 1536 dimensions instead of 2.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>An embedding model converts text into a fixed-length list of numbers — typically 384 to 1536 floating point values. These numbers are not arbitrary: they are learned through training on massive amounts of text to capture semantic relationships. The model learns that "king - man + woman ≈ queen" is expressible as a vector arithmetic operation. This is not programmed explicitly — it emerges from the training process.</p>
        </Block>

        {/* How it works step by step */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How embeddings work — step by step" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Input text arrives', body: 'Any piece of text — a sentence, a paragraph, a document section. The embedding model processes this as a sequence of tokens.' },
            { n: '2', title: 'The model encodes meaning', body: 'The embedding model (a transformer-based neural network) processes the tokens and produces a vector representation that captures the semantic content. The model was trained to make similar meanings produce similar vectors.' },
            { n: '3', title: 'Output: a vector of numbers', body: 'The result is a list of floats — e.g. [0.23, -0.41, 0.87, 0.12, ...] with 768 or 1536 values. This is the "embedding" — the text converted to a point in high-dimensional space.' },
            { n: '4', title: 'Stored in a vector database', body: 'The embedding is stored alongside the original text in a vector database (ChromaDB, Pinecone, Qdrant). The database indexes vectors for fast similarity search.' },
            { n: '5', title: 'Query time: embed the question', body: 'When a user asks a question, it is also passed through the same embedding model, producing another vector in the same mathematical space.' },
            { n: '6', title: 'Similarity search', body: 'The database finds the stored vectors that are closest to the query vector — measured by cosine similarity or dot product. These are the semantically most relevant stored documents.' },
            { n: '7', title: 'Return matched content', body: 'The original text associated with the closest vectors is returned as the search result. This is the content most likely to answer the question.' },
          ]} />
        </Block>

        {/* Similarity measurement */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How similarity is measured" color={color} />
          <p style={P(sub)}>Vector databases measure similarity between embeddings using mathematical distance metrics. Understanding these helps you configure systems correctly.</p>
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Cosine similarity', badge: 'Most common', body: 'Measures the angle between two vectors — not their length. Two vectors pointing in the same direction have cosine similarity of 1.0 (identical meaning). Opposite directions: -1.0. Perpendicular: 0 (unrelated). Used when the magnitude of the vector does not matter, only its direction. Standard choice for text embeddings.' },
            { label: 'Dot product', badge: 'Fast, used in retrieval', body: 'Multiplies corresponding elements and sums them. Faster than cosine similarity but affected by vector magnitude. Used when embeddings are normalized (same magnitude), making it equivalent to cosine similarity at lower computational cost. Recommended by OpenAI for their embeddings.' },
            { label: 'Euclidean distance', badge: 'Less common for text', body: 'The straight-line distance between two points in vector space. Sensitive to vector magnitude, which makes it less ideal for text embeddings where you care about direction (meaning) not length. More commonly used in image embeddings and clustering.' },
          ]} />
        </Block>

        {/* Embedding models comparison */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Embedding models — which to use" color={color} />
          <p style={P(sub)}>The choice of embedding model directly affects retrieval quality. Better embeddings = more relevant search results = better RAG answers. This is often more impactful than changing the LLM.</p>
          <div style={{ overflowX: 'auto', margin: '0.75rem 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', fontFamily: "'Rajdhani', sans-serif" }}>
              <thead>
                <tr style={{ background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' }}>
                  {['Model', 'Dimensions', 'Cost', 'Speed', 'Best For'].map(h => (
                    <th key={h} style={{ padding: '0.625rem 0.875rem', textAlign: 'left', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.08em', color: muted, fontWeight: 700, textTransform: 'uppercase', borderBottom: `1px solid ${border}`, whiteSpace: 'nowrap' }}>{h}</th>
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
                  <tr key={i} style={{ borderBottom: `1px solid ${border}` }}
                    onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '0.625rem 0.875rem', fontWeight: 700, color, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem' }}>{row.model}</td>
                    <td style={{ padding: '0.625rem 0.875rem', color: sub }}>{row.dim}</td>
                    <td style={{ padding: '0.625rem 0.875rem', color: sub }}>{row.cost}</td>
                    <td style={{ padding: '0.625rem 0.875rem', color: sub }}>{row.speed}</td>
                    <td style={{ padding: '0.625rem 0.875rem', color: sub }}>{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '0.78rem', color: muted, margin: '0.5rem 0 0', fontFamily: "'Share Tech Mono', monospace" }}>all-MiniLM-L6-v2 and BAAI/bge-large-en are from Hugging Face Sentence-Transformers — completely free, run locally, no API key needed.</p>
        </Block>

        {/* Vector databases */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Vector databases — what they do and which to use" color={color} />
          <p style={P(sub)}>A vector database stores embeddings alongside metadata and original text, then provides fast similarity search across millions of vectors. Regular SQL databases cannot efficiently search by vector similarity — a vector database is specifically optimized for this operation.</p>
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'ChromaDB', desc: 'Free, open source. Runs in Python memory or persists to disk. Zero configuration. Best for: learning, prototyping, projects with <1M vectors. Start here.' },
            { name: 'Pinecone', desc: 'Managed cloud. Free tier: 100k vectors. Scales to billions. Best for: deployed applications that need cloud vector storage without managing infrastructure.' },
            { name: 'Qdrant', desc: 'Open source, self-host or cloud. Better performance than ChromaDB at scale. Best for: production self-hosted deployments, advanced filtering needs.' },
            { name: 'Weaviate', desc: 'Open source with hybrid search built in. Combines vector similarity with BM25 keyword search. Best for: production apps that need both semantic and keyword search.' },
            { name: 'FAISS (Facebook)', desc: 'Library (not a database). Extremely fast, runs locally. Used in production at Facebook scale. Best for: high-performance local use, very large datasets.' },
            { name: 'pgvector', desc: 'PostgreSQL extension. Add vector search to an existing Postgres database. Best for: projects already using Postgres that need to add vector search.' },
          ]} />
        </Block>

        {/* Chunking */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Chunking — the most underrated decision in RAG systems" color={color} />
          <p style={P(sub)}>Before embedding documents for a RAG system, they must be split into chunks — smaller pieces that fit within the embedding model's token limit and represent coherent semantic units. The chunking strategy is one of the most impactful decisions you make in building a RAG system, and most beginners get it wrong.</p>
          <InfoBox color="#EF4444" dark={dark}>If chunks are too small: each chunk loses context — the answer to a question might require combining two adjacent chunks, but you only retrieved one. If chunks are too large: each chunk contains irrelevant content that confuses the LLM and reduces answer precision.</InfoBox>
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Fixed-size chunking', badge: 'Simplest, often wrong', body: 'Split every N characters regardless of content. "chunk_size=500, chunk_overlap=50" in LangChain. Fast to implement but often splits mid-sentence or mid-paragraph, breaking semantic coherence. Good enough for dense technical text where every chunk is dense with relevant information.' },
            { label: 'Recursive character splitting', badge: 'LangChain default, better', body: 'Try to split on paragraph breaks (\\n\\n) first, then sentence breaks (\\n), then character limits. Preserves more natural semantic boundaries. This is RecursiveCharacterTextSplitter in LangChain and is a better starting point than fixed-size.' },
            { label: 'Semantic chunking', badge: 'Best quality, more expensive', body: 'Embed sentences, then group consecutive sentences with similar embeddings into chunks. Splits happen where meaning changes rather than at arbitrary character counts. Produces the most semantically coherent chunks at the cost of more processing time and embedding calls.' },
          ]} />
          <p style={{ ...P(sub), marginBottom: 0, marginTop: '0.875rem' }}>Practical starting point: chunk_size=800-1000 characters with chunk_overlap=100-150. The overlap ensures content at chunk boundaries is captured in adjacent chunks. Tune based on your document type — short Q&A content benefits from smaller chunks (300-400), narrative text from larger ones (1000-1500).</p>
        </Block>

        {/* Real-world applications */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Where embeddings appear in real products" color={color} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px,100%),1fr))', gap: '0.625rem', margin: '0.75rem 0' }}>
            {[
              { product: 'Spotify / YouTube recommendations', how: 'Your listening/viewing history is embedded. New content is embedded. You are shown content whose embedding is closest to your behavior embedding.' },
              { product: 'GitHub Copilot context', how: 'Your open files and recent code are embedded. The most relevant code context is retrieved and sent to the LLM with your cursor position.' },
              { product: 'NotebookLM', how: 'Your uploaded documents are chunked and embedded into ChromaDB. Your question is embedded and the most relevant document chunks are retrieved before Claude generates an answer.' },
              { product: 'Google Search (partially)', how: 'Neural matching uses embeddings to understand query intent beyond keywords. "good restaurants near me" finds pages about "nearby dining options" even without those exact words.' },
              { product: 'Email spam filters', how: 'Email content is embedded. Spam emails cluster near each other in embedding space. New emails close to known-spam embeddings are flagged.' },
              { product: 'Code semantic search', how: 'GitHub\'s code search embeds repository code. Searching "function that converts timestamps to ISO format" finds relevant code even without those exact variable names.' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '0.875rem 1rem', borderRadius: 10, background: dark ? `${color}08` : `${color}06`, border: `1px solid ${color}1e` }}>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', color, letterSpacing: '0.06em', marginBottom: '0.4rem' }}>{item.product}</div>
                <p style={{ fontSize: '0.8rem', color: sub, lineHeight: 1.65, margin: 0 }}>{item.how}</p>
              </div>
            ))}
          </div>
        </Block>

        {/* Embedding quality factors */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What affects embedding quality" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Domain specificity', body: 'General embedding models are trained on broad web text. For a specialized domain (medical, legal, Indian languages, niche technical), a domain-specific embedding model will significantly outperform a general one. Hugging Face has models fine-tuned for code, biomedical text, legal text, and multiple Indian languages.' },
            { label: 'Chunk quality', body: 'The embedding of a well-formed paragraph with complete sentences and a single topic is more semantically precise than the embedding of a chunk that was split mid-sentence. Garbage in, garbage out — poor chunking produces embeddings that are hard to search effectively.' },
            { label: 'Context vs. keywords', body: 'Short snippets (a single sentence) embed differently than longer passages. A single sentence captures a narrow meaning. A paragraph captures a richer, more contextual meaning. For Q&A tasks, chunk size 300-800 words tends to give better retrieval than either very short or very long chunks.' },
            { label: 'Multilingual coverage', body: 'Most popular free embedding models are trained primarily on English. For content in Hindi, Tamil, Telugu, or other Indian languages, use models specifically trained for those languages. Cohere embed-v3 and LaBSE (Language-Agnostic BERT Sentence Embeddings) have strong Indian language support.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do after understanding this" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Build semantic search that finds content by meaning — not just exact keyword matches',
            'Understand and implement the retrieval layer of any RAG application from scratch',
            'Choose the right embedding model for your domain — not just the most popular one',
            'Debug poor RAG retrieval by identifying whether the problem is chunking, embedding model, or similarity threshold',
            'Add semantic search to any web application using ChromaDB (free, local) or Pinecone (cloud)',
            'Understand how Spotify, YouTube, GitHub, and Google use embeddings in their products',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}`, marginBottom: '0.5rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 7 }} />
              <span style={{ fontSize: '0.85rem', color: sub, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </Block>

        {/* Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Semantic Search in 15 Lines</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Build a semantic search system over a small document collection. Search for "machine learning algorithms" and see it correctly find documents that mention "neural networks" and "decision trees" — even though those exact words are not in the search query. Then compare with keyword search on the same data to see the concrete difference.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install dependencies', body: 'pip install sentence-transformers chromadb\n(Both free, run locally, no API key needed)' },
            { n: '2', title: 'Create your document collection', body: 'Write or copy 15-20 short text snippets on a topic you know well — study notes, Wikipedia paragraphs, anything. One paragraph per document.' },
            { n: '3', title: 'Embed and store', body: 'from sentence_transformers import SentenceTransformer; import chromadb\nmodel = SentenceTransformer("all-MiniLM-L6-v2")\nCreate a ChromaDB collection, embed each document, add to collection.' },
            { n: '4', title: 'Query semantically', body: 'Search for 5 queries that are about the content but use different vocabulary than the documents. See what it retrieves.' },
            { n: '5', title: 'Compare with keyword search', body: 'Run the same 5 queries as simple string.contains() keyword search. Compare: what does semantic search find that keyword search misses? This is the value of embeddings made concrete.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Sentence-Transformers and ChromaDB are both fully free and open source</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>The embedding model you choose has more impact on RAG quality than the LLM you choose for generation. A mediocre LLM with excellent retrieval gives better answers than an excellent LLM with poor retrieval — because if the wrong documents are retrieved, even GPT-4o cannot answer correctly from them. Spend time testing and choosing your embedding model. Try at least two options: all-MiniLM-L6-v2 (fast, decent) and BAAI/bge-large-en-v1.5 (slower, significantly better). Measure which one retrieves more relevant chunks for your specific content domain.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/foundations/rag')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> RAG
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/chatbots/chatgpt')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            ChatGPT <ChevronRight size={14} />
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
