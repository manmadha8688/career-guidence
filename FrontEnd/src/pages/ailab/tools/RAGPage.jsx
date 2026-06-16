import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, Copy, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import toast from 'react-hot-toast'

const CYAN = '#00D9FF'
const color = '#06B6D4'

export default function RAGPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'

  const bg     = dark ? '#020817' : '#F0F4FF'
  const card   = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(0,217,255,0.1)' : 'rgba(79,70,229,0.12)'
  const txt    = dark ? '#E2E8F0' : '#0F172A'
  const sub    = dark ? '#94A3B8' : '#475569'
  const muted  = dark ? '#64748B' : '#94A3B8'

  const copyText = (t) => { navigator.clipboard.writeText(t); toast.success('Copied!') }

  return (
    <div style={{ minHeight: '100vh', background: bg, color: txt, fontFamily: "'Rajdhani', sans-serif", overflowX: 'hidden' }}>

      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, borderRadius: '50%', background: `radial-gradient(ellipse, ${color}07 0%, transparent 65%)`, filter: 'blur(60px)' }} />
      </div>

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', background: dark ? 'rgba(2,8,23,0.93)' : 'rgba(240,244,255,0.95)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${border}` }}>
        <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.72rem', letterSpacing: '0.1em', color: CYAN, padding: 0 }}>
          <ArrowLeft size={14} /> AI Lab
        </button>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: sub, letterSpacing: '0.08em' }}>AI Foundations</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: sub }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 6rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.5rem', boxShadow: dark ? `0 0 60px ${color}10` : `0 4px 30px ${color}12` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', border: `1.5px solid ${color}30`, flexShrink: 0 }}>📚</div>
            <div>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.25rem,3vw,1.75rem)', color: txt, margin: '0 0 0.25rem' }}>RAG — Retrieval Augmented Generation</h1>
              <p style={{ fontSize: '1rem', color: sub, margin: 0 }}>How AI reads your own documents to answer questions accurately</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <Badge label="✓ FREE" color="#4ADE80" />
            <Badge label="Concept + free open-source tools" color={color} />
            <Badge label="AI Foundations" color={sub} border={border} />
          </div>

          {/* Overview */}
          <p style={{ fontSize: '0.95rem', color: sub, lineHeight: 1.85, margin: 0 }}>
            RAG is a technique that gives AI access to your own documents so it can answer questions based on that specific content — not from memory or training data. Instead of asking ChatGPT a general question and hoping it knows the answer, you give it your notes, reports, or codebase and it answers from there. No hallucination. No outdated information. No generic answers. This is how NotebookLM, custom chatbots, and enterprise AI assistants work.
          </p>
        </div>

        {/* Videos — right after overview */}
        <Section title="Watch first — understand the concept visually" color="#EF4444" dark={dark} border={border} card={card}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: 'RAG in 10 Minutes — What it is and how it works (beginner)', url: 'https://www.youtube.com/watch?v=gweRh5Xtkq0', duration: '10 min', note: 'Start here — best conceptual overview' },
              { label: 'Build a RAG App from Scratch — Python + LangChain + ChromaDB', url: 'https://www.youtube.com/watch?v=tcqEUSNCn8I', duration: '35 min', note: 'Hands-on implementation tutorial' },
              { label: 'RAG vs Fine-tuning — Which to use and when', url: 'https://www.youtube.com/watch?v=00Q0G84kq3M', duration: '18 min', note: 'Clears up the biggest confusion' },
              { label: 'Advanced RAG Techniques — Chunking, Reranking, Hybrid Search', url: 'https://www.youtube.com/watch?v=sVcwVQRHIc8', duration: '30 min', note: 'After you understand the basics' },
            ].map((v, i) => (
              <a key={i} href={v.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1.125rem', borderRadius: 12, textDecoration: 'none', background: dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.18)', transition: 'all 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.09)'}
                onMouseLeave={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)'}
              >
                <div style={{ width: 38, height: 38, borderRadius: 9, background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Play size={14} color="#fff" fill="#fff" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: txt }}>{v.label}</div>
                  <div style={{ fontSize: '0.7rem', color: sub, marginTop: 2 }}>{v.duration} · {v.note}</div>
                </div>
                <ExternalLink size={13} color={muted} />
              </a>
            ))}
          </div>
        </Section>

        {/* The Problem */}
        <Section title="The problem RAG solves" color={color} dark={dark} border={border} card={card}>
          <p style={p(sub)}>Standard LLMs — ChatGPT, Claude, Gemini — have a serious limitation: they can only answer from what they learned during training. Ask GPT-4 about your company's internal policy document, your professor's lecture notes, or a codebase you wrote last week — it has no idea. Worse, it will try to answer anyway and make something up.</p>
          <p style={p(sub)}>There is also the knowledge cutoff problem. Models are trained on data up to a certain date. A model trained in early 2024 knows nothing about libraries, frameworks, or events after that. You cannot ask it about the latest LangChain API changes or what happened in your industry last month.</p>
          <p style={p(sub)}>RAG solves both. It gives the LLM fresh, specific, real content at the moment of each question. The LLM is no longer guessing from memory — it is reading from your actual documents and generating an answer based on what it finds there.</p>
          <InfoBox dark={dark} color={color}>
            RAG does not change the LLM — it changes what information the LLM gets to read before it answers. Think of it as giving the AI an open-book exam instead of a memory test.
          </InfoBox>
        </Section>

        {/* How it works */}
        <Section title="How RAG works — step by step" color={color} dark={dark} border={border} card={card}>
          <p style={p(sub)}>RAG has two phases. The first happens once when you set up your knowledge base. The second happens every time a user asks a question.</p>

          <SubHeading label="Phase 1 — Building the knowledge base" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Load your documents', body: 'Your PDFs, Word docs, website pages, code files — anything with text. A document loader reads them into memory.' },
            { n: '2', title: 'Split into chunks', body: 'Documents are too large to send to an LLM all at once. They get split into smaller pieces — usually 300-1000 words each — with some overlap between consecutive chunks so context is not lost at the boundaries.' },
            { n: '3', title: 'Create embeddings', body: 'Each chunk is passed through an embedding model which converts the text into a list of numbers — a vector — that represents its meaning. Chunks with similar meaning will have numerically similar vectors.' },
            { n: '4', title: 'Store in vector database', body: 'All the chunks and their vectors are saved in a vector database (ChromaDB, Pinecone). This database can search millions of chunks by meaning in milliseconds.' },
          ]} />

          <SubHeading label="Phase 2 — Answering a question" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '5', title: 'User asks a question', body: 'The user types: "What is the deadline for the project submission?"' },
            { n: '6', title: 'Question is embedded', body: 'The question is converted to a vector using the same embedding model used in Phase 1.' },
            { n: '7', title: 'Retrieve similar chunks', body: 'The vector database finds the chunks whose vectors are most similar to the question vector — the chunks most likely to contain the answer.' },
            { n: '8', title: 'Build the prompt', body: 'The retrieved chunks + the original question are combined into a prompt: "Using only the following context: [chunks]. Answer this question: [question]."' },
            { n: '9', title: 'LLM generates the answer', body: 'The LLM reads the context and generates an answer based on the provided chunks — not from memory. If the answer is not in the chunks, a well-configured RAG system says "I do not have that information" instead of making something up.' },
          ]} />
        </Section>

        {/* Core Components */}
        <Section title="The core components" color={color} dark={dark} border={border} card={card}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px,100%),1fr))', gap: '0.75rem' }}>
            {[
              { name: 'Document Loader', desc: 'Reads files — PDFs, DOCX, HTML, CSV, YouTube transcripts. LangChain and LlamaIndex have loaders for 50+ formats.' },
              { name: 'Text Splitter', desc: 'Splits documents into chunks. The chunking strategy is critical — too small loses context, too large adds noise. Recursive character splitter is a good starting point.' },
              { name: 'Embedding Model', desc: 'Converts text to vectors. OpenAI ada-002 is common. Free options: Sentence-Transformers (all-MiniLM-L6-v2) runs on any laptop.' },
              { name: 'Vector Database', desc: 'Stores embeddings and enables fast similarity search. ChromaDB is free and runs locally. Pinecone is managed cloud. Qdrant, Weaviate, FAISS are other options.' },
              { name: 'Retriever', desc: 'Finds the top-K most relevant chunks for a given query. "Top K" is typically 3-6 chunks. Can use vector similarity, keyword search, or a hybrid of both.' },
              { name: 'LLM', desc: 'Generates the final answer from question + retrieved context. Can be GPT-4, Claude, or a free model via Groq. The LLM is told to answer only from the provided context.' },
            ].map((c, i) => (
              <div key={i} style={{ padding: '0.875rem 1rem', borderRadius: 10, background: dark ? `${color}08` : `${color}06`, border: `1px solid ${color}20` }}>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', color: color, letterSpacing: '0.06em', marginBottom: '0.4rem' }}>{c.name}</div>
                <p style={{ fontSize: '0.82rem', color: sub, lineHeight: 1.65, margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* RAG vs Alternatives */}
        <Section title="RAG vs other approaches" color={color} dark={dark} border={border} card={card}>
          <p style={p(sub)}>Students often ask: "Why not just fine-tune the model?" or "Why not put everything in the prompt?" RAG is the right answer for most knowledge-related use cases, but understanding when it is not helps you make better decisions.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { vs: 'RAG vs Fine-tuning', winner: 'RAG wins for facts', body: 'Fine-tuning trains the model on your data — expensive ($500-$5000+), takes hours, requires ML expertise, and bakes knowledge permanently (hard to update). RAG costs nothing to set up, updates instantly by adding new documents, and works with any LLM. Use fine-tuning only when you need to change the model\'s style or behavior, not its knowledge.' },
              { vs: 'RAG vs Stuffing context', winner: 'RAG wins for large docs', body: 'You could just paste your entire document into the prompt. Works for small docs (a few pages). Fails for anything larger — context limits are hit, cost explodes (GPT-4 charges per token), and the model struggles to focus with too much irrelevant content. RAG retrieves only relevant chunks.' },
              { vs: 'RAG vs Prompt engineering', winner: 'Different purposes', body: 'Prompt engineering guides how the model reasons and responds. RAG provides the model with specific factual content. They are complementary — great RAG systems also have carefully engineered prompts.' },
              { vs: 'RAG vs Search engines', winner: 'Depends on the use case', body: 'Search returns links and snippets. RAG generates a synthesized answer from your specific content. RAG is better when you want a conversational answer from private documents. Search is better for discovering new information across the public web.' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '1rem 1.125rem', borderRadius: 10, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem', color: color, letterSpacing: '0.06em' }}>{item.vs}</span>
                  <span style={{ fontSize: '0.62rem', background: `${color}15`, color: color, border: `1px solid ${color}25`, borderRadius: 4, padding: '0.1rem 0.4rem', fontFamily: "'Share Tech Mono', monospace" }}>{item.winner}</span>
                </div>
                <p style={{ fontSize: '0.83rem', color: sub, lineHeight: 1.7, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Key concepts */}
        <Section title="Key concepts to understand" color={color} dark={dark} border={border} card={card}>
          <p style={p(sub)}>These terms come up constantly in RAG discussions. Understanding them makes reading documentation, tutorials, and research papers significantly easier.</p>
          {[
            { term: 'Chunking strategy', body: 'How you split documents is one of the most impactful decisions in a RAG system. A chunk that splits mid-sentence or cuts a paragraph in half loses critical context. Recursive character splitting (LangChain\'s default) tries to split on paragraph breaks, then sentence breaks, then character limits. Semantic chunking splits based on meaning changes — more expensive but more accurate.' },
            { term: 'Top-K retrieval', body: 'When a question is asked, the retriever finds the K most similar chunks. K=3 means the top 3 chunks are sent to the LLM. Too small and you miss relevant information. Too large and you overwhelm the LLM with irrelevant context. 4-6 is typical for most applications.' },
            { term: 'Reranking', body: 'Vector similarity finds chunks that are mathematically close in embedding space. But the most mathematically similar is not always the most relevant. A reranker (like Cohere Rerank) applies a second, more expensive model to rescore the top-K candidates for true relevance. Significantly improves answer quality.' },
            { term: 'Hybrid search', body: 'Combines vector search (semantic similarity) with keyword search (BM25). Vector search is great for finding conceptually similar content even when exact words differ. Keyword search is great when exact terms matter (product names, codes, technical identifiers). Combining both gives better results than either alone.' },
            { term: 'Grounding', body: 'A grounded answer is one that comes directly from retrieved context — not from model memory. The LLM prompt instructs it to only use the provided documents and to say "I don\'t know" if the answer is not present. This is how you eliminate hallucination for your specific domain.' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: i < 4 ? `1px solid ${border}` : 'none' }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem', color: color, letterSpacing: '0.06em', marginBottom: '0.4rem' }}>{item.term}</div>
              <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </Section>

        {/* When RAG fails */}
        <Section title="When RAG fails — and why" color="#EF4444" dark={dark} border={border} card={card}>
          <p style={p(sub)}>RAG is not magic. There are specific patterns that cause RAG systems to fail. Knowing these helps you build better systems and debug problems faster.</p>
          {[
            { problem: 'Bad chunking', fix: 'If chunks split mid-sentence or separate a question from its answer across chunks, retrieval finds the wrong content. Fix: use smaller chunks with overlap (50-100 word overlap between consecutive chunks).' },
            { problem: 'Wrong embedding model', fix: 'Different embedding models are trained for different purposes. A model trained on general English may perform poorly on technical documentation. Test a few models — Sentence-Transformers has many specialized options.' },
            { problem: 'Question-document mismatch', fix: 'RAG finds documents similar to the question. If the question is casual ("what\'s the refund policy?") but the document is formal ("Clause 4.2: Customer shall be entitled to..."), they may not match. HyDE (Hypothetical Document Embeddings) generates a hypothetical answer, then searches for similar content — fixes this mismatch.' },
            { problem: 'Questions requiring synthesis', fix: '"Summarize all the risk factors from this document" requires reading everything — RAG retrieves only top-K chunks. For synthesis questions, consider map-reduce chains or sequential reading instead of RAG.' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '0.875rem 1rem', borderRadius: 10, marginBottom: '0.625rem', background: dark ? 'rgba(239,68,68,0.05)' : 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.15)' }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', color: '#EF4444', marginBottom: '0.4rem' }}>⚠ {item.problem}</div>
              <p style={{ fontSize: '0.83rem', color: sub, lineHeight: 1.7, margin: 0 }}>{item.fix}</p>
            </div>
          ))}
        </Section>

        {/* Tools */}
        <Section title="Tools and frameworks for building RAG" color={color} dark={dark} border={border} card={card}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px,100%),1fr))', gap: '0.625rem' }}>
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
              <div key={i} style={{ padding: '0.75rem', borderRadius: 9, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: txt }}>{t.name}</span>
                  {t.free && <span style={{ fontSize: '0.55rem', color: '#4ADE80', fontFamily: "'Share Tech Mono', monospace" }}>FREE</span>}
                </div>
                <div style={{ fontSize: '0.68rem', color: color, fontFamily: "'Share Tech Mono', monospace", marginBottom: '0.2rem' }}>{t.role}</div>
                <div style={{ fontSize: '0.72rem', color: muted }}>{t.note}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* What you can do */}
        <Section title="What you can do after learning RAG" color={color} dark={dark} border={border} card={card}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px,100%),1fr))', gap: '0.5rem' }}>
            {[
              'Build a chatbot that answers questions from your own PDFs — lecture notes, textbooks, manuals',
              'Create a knowledge base for a company or college project where AI gives grounded answers',
              'Add a "search your notes" feature to any application without traditional keyword search',
              'Build a portfolio project that demonstrates AI engineering skills to employers',
              'Understand how products like NotebookLM and custom GPTs actually work under the hood',
              'Design AI features that cannot hallucinate because they are anchored in real documents',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}` }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 7 }} />
                <span style={{ fontSize: '0.85rem', color: sub, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}30`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.8rem', letterSpacing: '0.08em', color: color }}>PROJECT — Build a Study Notes Chatbot</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>
            Build a chatbot that answers questions from your own semester notes using RAG. Upload your lecture PDFs to ChromaDB, connect it to the Groq API (free Llama 3), and build a simple Python chatbot using LangChain. Ask it "What are the key differences between supervised and unsupervised learning?" and it should answer using your actual lecture content — not generic internet knowledge.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {['1. pip install langchain chromadb sentence-transformers groq', '2. Load your PDF lecture notes with PyPDFLoader', '3. Split into 500-word chunks with RecursiveCharacterTextSplitter', '4. Embed with HuggingFaceEmbeddings (free, local)', '5. Store in ChromaDB vector store', '6. Build a RetrievalQA chain with Groq as the LLM', '7. Ask questions and see answers grounded in your notes'].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: color, flexShrink: 0, marginTop: 3 }}>{i === 0 ? '→' : ' '}</span>
                <code style={{ fontSize: '0.78rem', color: dark ? '#CBD5E1' : '#334155', fontFamily: "'Share Tech Mono', monospace", lineHeight: 1.6 }}>{step}</code>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.1em' }}>TOTAL COST: ₹0 — Groq is free, ChromaDB is free, Sentence-Transformers is free</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.22)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Start with ChromaDB running in-memory (no configuration, zero setup) to build and test your pipeline. Once it works, switch to persistent storage with one parameter change. Build with Groq for zero cost, then decide if you need GPT-4 quality for production. Most student RAG projects work perfectly with free models.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/embeddings-vectors')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.25rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ArrowLeft size={14} /> Embeddings & Vectors
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}40`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem' }}>
            Back to AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/chatgpt')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.25rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            ChatGPT <ChevronRight size={14} />
          </button>
        </div>

      </div>
      <ScrollToTop />
    </div>
  )
}

// ─── Shared helpers ───────────────────────────────────────────────────────────
function Badge({ label, color, border }) {
  return (
    <span style={{ fontSize: '0.7rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.08em', padding: '0.25rem 0.75rem', borderRadius: 6, background: `${color}15`, color, border: `1px solid ${border || color + '30'}` }}>
      {label}
    </span>
  )
}

function Section({ title, color, dark, border, card, children }) {
  return (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '1.375rem', backdropFilter: 'blur(8px)', marginBottom: '1.25rem' }}>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.14em', color, textTransform: 'uppercase', paddingBottom: '0.75rem', marginBottom: '1rem', borderBottom: `1px solid ${color}22` }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function SubHeading({ label, color }) {
  return <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 800, fontSize: '0.95rem', color, margin: '1.25rem 0 0.75rem' }}>{label}</div>
}

function Steps({ items, dark, border, color }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '0.5rem' }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start', padding: '0.75rem 1rem', borderRadius: 10, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.02)', border: `1px solid ${border}` }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: `${color}20`, border: `1.5px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Orbitron', sans-serif", fontSize: '0.6rem', fontWeight: 700, color, flexShrink: 0 }}>{item.n}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#E2E8F0', marginBottom: '0.25rem' }}>{item.title}</div>
            <div style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.65 }}>{item.body}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function InfoBox({ children, dark, color }) {
  return (
    <div style={{ margin: '1rem 0', padding: '0.875rem 1rem', borderRadius: 10, background: dark ? `${color}08` : `${color}06`, border: `1px solid ${color}25` }}>
      <p style={{ fontSize: '0.875rem', color: color, lineHeight: 1.75, margin: 0, fontWeight: 600 }}>{children}</p>
    </div>
  )
}

const p = (sub) => ({ fontSize: '0.9rem', color: sub, lineHeight: 1.85, margin: '0 0 0.875rem' })
