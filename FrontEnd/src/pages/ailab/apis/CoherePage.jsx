import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#FF7759'

export default function CoherePage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="APIs">
      <ToolHeader
        icon="🪢"
        title="Cohere — Command Models + Best-in-Class Embeddings & Rerank"
        tagline="The enterprise RAG toolkit: Command chat, Embed 4, and Rerank 3.5 — free trial key"
        badges={[['✓ Free trial key', '#4ADE80'], ['cohere.com', color], ['1,000 calls/month', 'var(--text-muted)']]}
        overview={"Cohere is an enterprise AI company whose real superpower is not chat — it is search. While its Command family (Command A, Command R+, Command R, Command R7B) are solid instruction-following chat models, Cohere is best known for two building blocks that power serious Retrieval-Augmented Generation (RAG) systems: Embed 4, among the strongest text/multimodal embedding models, and Rerank 3.5, a reranker that reorders search results by true relevance. Together, embeddings + rerank are how you make an AI actually find the right document before it answers — the core of any 'chat with your data' product. For students, Cohere offers a free trial (evaluation) API key with no credit card: 1,000 API calls per month shared across all endpoints, with the SAME model access as a paid production key. The catch, accurate as of 2026: the trial key is for testing/learning only (not commercial use), each request counts as one call regardless of tokens, and per-endpoint rate limits apply (Chat ~20 req/min, Rerank ~10 req/min, Embed ~2,000 inputs/min). It resets on the 1st of each month. Cohere is the tool to learn if you want to build search and RAG the way companies actually do it."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Cohere API — Beginner Setup & Free Key', url: 'https://www.youtube.com/results?search_query=cohere+api+tutorial+2026', dur: '~14 min', note: 'Get a free trial key and make your first Command chat call' },
            { label: 'Build RAG with Cohere Embed + Rerank', url: 'https://www.youtube.com/results?search_query=cohere+embed+rerank+rag+tutorial', dur: '~22 min', note: 'The real Cohere use case — semantic search that actually finds the right docs' },
            { label: 'Rerank Explained — Why It Beats Plain Vector Search', url: 'https://www.youtube.com/results?search_query=cohere+rerank+explained+semantic+search', dur: '~12 min', note: 'How reranking dramatically improves retrieval quality in RAG' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why Cohere is different — it's a search company" color={color} />
          <InfoBox color={color}>{"Most AI providers sell you a chat model. Cohere sells you the pieces that make chat useful on YOUR data: Embed (turn text into vectors for semantic search) and Rerank (reorder candidate results so the most relevant one is first). This is the backbone of RAG — the technique behind every 'ask questions about my documents' product. If you learn Cohere, you learn how real retrieval systems are built, not just how to prompt a chatbot."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Here is the mental model. A plain vector search using embeddings gets you close — it returns, say, the top 50 chunks that seem related to a question. But 'seems related by vector distance' is not the same as 'actually answers the question'. That is where Rerank comes in: you pass those 50 candidates plus the query to Rerank 3.5, and it returns them reordered by genuine relevance, so your top 3 are the ones worth sending to the LLM. This two-step retrieve-then-rerank pattern is what separates a demo RAG from a reliable one — and Cohere is the best-known, easiest place to learn it.</p>
          {[
            'Embed 4 — a top-tier embedding model for semantic search, RAG, clustering, and classification (text + multimodal)',
            'Rerank 3.5 — reorders search results by true relevance; the single biggest quality boost you can add to RAG',
            'Command models — Command A, Command R+, Command R, Command R7B for chat, RAG answers, and tool use',
            'Free trial key — 1,000 API calls/month across all endpoints, no credit card, same model access as paid',
            'Trial limits to know — testing/learning only (not commercial); each request = 1 call; Chat ~20 req/min, Rerank ~10 req/min',
            'Resets monthly — the 1,000-call allowance refreshes on the 1st of each calendar month',
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
            { name: 'Embed 4', desc: 'One of the strongest embedding models available — converts text (and images) into vectors for semantic search, RAG, clustering, and classification. The foundation of any "search my data" feature. Trial limit: ~2,000 inputs/min.' },
            { name: 'Rerank 3.5', desc: 'A dedicated reranker: give it a query and a list of documents, it returns them ordered by real relevance. Bolt it onto any existing search to sharply improve which results reach your LLM. Trial limit: ~10 req/min.' },
            { name: 'Command Chat Models', desc: 'Command A (flagship), Command R+ and Command R (RAG-optimized), and Command R7B (small, cheap, fast). Strong at grounded answers with citations — built for answering from retrieved documents, not just free chat.' },
            { name: 'Built-in RAG & Citations', desc: 'Cohere\'s Chat API can take documents directly and return answers with citations pointing to the source passages — a huge help for trustworthy, verifiable AI answers.' },
            { name: 'Tool Use', desc: 'Command models support tool/function calling, so they can decide to search, call an API, or run code — the basis for agents that act on retrieved information.' },
            { name: 'Same Access on Trial', desc: 'The free trial key reaches the same models as a paid key — only rate limits and the commercial-use restriction differ. You can genuinely learn the full platform for ₹0.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — chat, embed, and rerank" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Get a free trial key', body: 'Sign up at cohere.com (dashboard.cohere.com) — no credit card needed. Go to API Keys and create a Trial key. Store it in an environment variable: export CO_API_KEY=your-trial-key' },
            { n: '2', title: 'Install the SDK', body: 'pip install cohere (Python) or npm install cohere-ai (Node.js). The SDK wraps chat, embed, and rerank in one client, so you can build a full RAG pipeline from a single library.' },
            { n: '3', title: 'Call a Command chat model', body: "import cohere\nco = cohere.ClientV2()  # reads CO_API_KEY from env\nresp = co.chat(\n    model='command-r-plus',\n    messages=[{'role': 'user', 'content': 'Explain reranking in 2 sentences.'}],\n)\nprint(resp.message.content[0].text)" },
            { n: '4', title: 'Create embeddings for search', body: "docs = ['Cats are mammals.', 'Python is a language.', 'The sky is blue.']\nemb = co.embed(\n    model='embed-v4.0',\n    texts=docs,\n    input_type='search_document',\n)\n# emb.embeddings are vectors you store in a vector DB for semantic search" },
            { n: '5', title: 'Rerank search results', body: "results = co.rerank(\n    model='rerank-v3.5',\n    query='What animal is a cat?',\n    documents=docs,\n    top_n=2,\n)\n# results.results are reordered by true relevance — index 0 is the best match" },
            { n: '6', title: 'Mind the trial limits', body: 'You have 1,000 calls/month total (resets on the 1st). Each chat/embed/rerank request is one call regardless of token count — so batch documents into single embed calls where possible. Trial keys are for learning, not commercial products.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="The RAG pipeline — where Cohere fits" color={color} />
          <Compare color={color} items={[
            { label: 'Step 1 — Embed your documents', badge: 'Embed 4', body: 'Split your source documents into chunks and call co.embed(input_type=\'search_document\') to turn each into a vector. Store the vectors in a vector database (Chroma, Pinecone, or even a simple in-memory list for learning).' },
            { label: 'Step 2 — Embed the question & search', badge: 'Vector similarity', body: 'Embed the user\'s question with input_type=\'search_query\', then find the nearest document vectors. This gives you a candidate set — often the top 20–50 chunks that look related.' },
            { label: 'Step 3 — Rerank the candidates', badge: 'Rerank 3.5 (the magic)', body: 'Pass the query + candidates to co.rerank(). It reorders them by genuine relevance and you keep only the top 3–5. This step is where retrieval quality jumps — plain vector search alone often misses the best chunk.' },
            { label: 'Step 4 — Answer with Command', badge: 'Grounded generation', body: 'Send the top reranked chunks as context to a Command model via co.chat(). Ask it to answer using only those documents and cite them. Result: an accurate, verifiable answer grounded in your data.' },
            { label: 'Why not skip rerank?', badge: 'Quality vs simplicity', body: 'You can build RAG with embeddings alone, but adding Rerank is the highest-leverage improvement for the least effort. It is why Cohere is a favorite for production RAG — and why learning it here matters.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Cohere vs general chat APIs" color={color} />
          <InfoBox color={color}>{"Do not think of Cohere as a ChatGPT competitor — think of it as the retrieval layer that makes any LLM smarter about your data. You might use Gemini or Cerebras for the final answer generation, but reach for Cohere's Embed 4 and Rerank 3.5 to find the right context first. Many production systems mix providers exactly this way: Cohere for search/rerank, a fast free API for generation."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>For an Indian student building a portfolio, a 'chat with your PDFs/notes/textbook' project built the proper way — embed, retrieve, rerank, then generate with citations — is far more impressive to recruiters than another wrapper around a chat model. It shows you understand how real AI products handle knowledge. Cohere's free trial key gives you every piece you need to build that end to end, and the retrieve-then-rerank pattern you learn here transfers to every RAG framework (LangChain, LlamaIndex) you will meet later.</p>
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Build a "Chat With Your Notes" RAG App</span></div>
          <p className="tool-layout-task__desc">Build a mini RAG system that answers questions about your own study notes using the full Cohere pipeline: Embed 4 for search, Rerank 3.5 for relevance, and a Command model for the grounded answer. This is a portfolio-grade project that demonstrates you understand real retrieval — not just prompting.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Prepare your knowledge base', body: 'Take a set of notes (a subject\'s summary, a few articles, or a textbook chapter). Split the text into small chunks of a few sentences each. Put them in a Python list — this is your document store for learning.' },
            { n: '2', title: 'Embed all chunks once', body: 'Call co.embed(model=\'embed-v4.0\', texts=chunks, input_type=\'search_document\') in a SINGLE call to stay efficient with your trial quota. Store the returned vectors alongside their chunk text.' },
            { n: '3', title: 'Retrieve candidates for a question', body: 'When the user asks something, embed the question (input_type=\'search_query\'), compute cosine similarity against your stored vectors, and take the top ~20 chunks as candidates.' },
            { n: '4', title: 'Rerank to find the best context', body: 'Pass the question and those 20 candidates to co.rerank(model=\'rerank-v3.5\', top_n=3). Keep the top 3 — these are the chunks most likely to actually contain the answer.' },
            { n: '5', title: 'Generate a grounded answer', body: 'Send the 3 reranked chunks as context to co.chat() with a Command model. Instruct it: "Answer only from the provided notes and cite which chunk you used. If the notes don\'t cover it, say so." Print the answer.' },
            { n: '6', title: 'Wrap it in a loop', body: 'Put steps 3–5 in a while loop reading input(), so you can keep asking questions. You now have a working, citation-backed RAG app — the kind of project that stands out on a resume.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — a full embed + rerank + chat pipeline uses only a few calls per question, well inside the 1,000 calls/month trial</span></div>
        </div>
        <ProTip>
        Guard your 1,000 monthly calls by batching. Each API request counts as one call no matter how much text it carries — so embed all your document chunks in a SINGLE co.embed() call (pass the whole list), not one call per chunk. That one habit can turn what would be 200 calls into 1. Save your call budget for the interactive part — the per-question retrieve, rerank, and answer steps — and you can comfortably develop and demo a real RAG app all month for free. And remember: the trial key is for learning and portfolios, not shipping a commercial product; upgrade to a production key before you charge anyone.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/apis/sambanova', label: 'SambaNova' }}
        next={{ path: '/ai-lab/apis/openrouter', label: 'OpenRouter' }}
      />
    </ToolPageShell>
  )
}
