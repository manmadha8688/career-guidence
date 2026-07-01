export const RAG_APP_GUIDE = [
  {
    phase: '01',
    title: 'Deploy your RAG / Document Q&A app as a live demo',
    color: '#F59E0B',
    steps: [
      {
        label: 'What RAG is and what you will build',
        isText: true,
        text: [
          'RAG = Retrieval-Augmented Generation.',
          '',
          'What happens when a user uploads a PDF:',
          '1. App extracts text from the PDF',
          '2. Splits text into small chunks (500 words each)',
          '3. Creates vector embeddings for each chunk',
          '4. Stores embeddings in FAISS (local vector database)',
          '5. User asks a question',
          '6. App embeds the question and finds the most similar chunks',
          '7. Sends relevant chunks + question to an LLM',
          '8. LLM generates an answer based on the document',
          '',
          'Use this guide for:',
          '→ PDF question answering',
          '→ Document Q&A demo',
          '→ Semantic search demo',
          '→ LangChain / LlamaIndex app',
          '→ FAISS vector search demo',
          '',
          'Do NOT use this guide for:',
          '→ Simple chatbot without documents → use Chatbot guide',
          '→ Basic ML prediction → use Streamlit Cloud guide',
          '→ Data dashboard → use Streamlit Cloud guide',
          '',
          'Why HF Spaces for RAG:',
          '   RAG needs sentence-transformers (embedding model ~80MB)',
          '   + a language model (~250MB for flan-t5-small)',
          '   Total memory: ~4–8GB depending on model',
          '   Streamlit Cloud free 1GB RAM → crashes',
          '   HF Spaces free 16GB RAM → handles RAG demos',
        ],
        note: 'RAG is one of the most impressive AI demos for a student portfolio. It shows you understand embeddings, vector search, and LLM integration — skills directly relevant to AI engineering roles.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Honest limitations — read this first',
    color: '#EF4444',
    steps: [
      {
        label: 'What works and what does not on free CPU',
        isText: true,
        text: [
          'RAG on free CPU works well for:',
          '✅ Small PDFs (5–20 pages)',
          '✅ Factual questions answered by the document',
          '✅ Demo purposes with flan-t5-small or flan-t5-base',
          '✅ Showing the RAG architecture concept',
          '',
          'RAG on free CPU is slow or limited for:',
          '⚠️  Large PDFs (100+ pages) — embedding takes minutes',
          '⚠️  Complex reasoning questions — small models struggle',
          '⚠️  Real-time multi-user usage',
          '⚠️  Large LLMs (Llama, Mistral, GPT-2 XL) — out of memory',
          '',
          'Important storage note:',
          '   HF Spaces free has EPHEMERAL storage.',
          '   Files uploaded at runtime (PDFs) are LOST on restart.',
          '   This is fine for demo purposes — user re-uploads each session.',
          '   For persistent storage: use MongoDB Atlas or Supabase.',
          '',
          'For better answer quality:',
          '   flan-t5-small → flan-t5-base → ChatOpenAI (if you have API key)',
          '   OpenAI gives significantly better answers than small local models.',
          '',
          'Always mention limitations in your README and demo description.',
        ],
        note: 'A RAG demo with honest limitations documented is more impressive than one that overpromises. Recruiters value engineering awareness.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Before deployment — checklist',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Verify your RAG pipeline works locally first',
        isText: true,
        text: [
          '✅ RAG pipeline works on a small 5–10 page PDF locally',
          '✅ Embeddings load without error',
          '✅ FAISS vectorstore builds without error',
          '✅ LLM generates a reasonable answer',
          '✅ Empty PDF input handled gracefully',
          '✅ Empty question handled gracefully',
          '✅ requirements.txt exists',
          '✅ README.md exists with frontmatter',
          '✅ No API key hardcoded in app.py',
          '✅ No private/sensitive PDFs included in the repo',
          '',
          'Quick local test:',
          '   python app.py',
          '   Open http://127.0.0.1:7860',
          '   Upload a short public PDF',
          '   Ask "What is this document about?"',
          '   Verify an answer appears',
          '',
          'Test with small PDFs first — large PDFs take too long locally',
          'and will time out on free CPU deployment.',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '04',
    title: 'Project structure',
    color: '#60A5FA',
    steps: [
      {
        label: 'Folder structure for a RAG Space',
        isText: true,
        text: [
          'rag-space/',
          '  app.py           ← Gradio RAG demo (entry point)',
          '  requirements.txt',
          '  README.md        ← Space metadata frontmatter',
          '  .gitignore',
          '  sample_docs/     ← optional public sample PDFs',
          '    sample.pdf     ← small public PDF for demo (optional)',
          '',
          'Rules:',
          '→ app.py at the project root',
          '→ Do NOT upload private PDFs to the Space repo',
          '→ sample_docs/ only contains public/safe sample documents',
          '→ Never commit API keys, .env, or venv/',
          '→ Uploaded PDFs from users are handled in-memory — not stored',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '05',
    title: 'app.py — Free RAG with local models (no API key)',
    color: '#EC4899',
    steps: [
      {
        label: 'Complete RAG app — sentence-transformers + flan-t5 (fully free)',
        isFile: true,
        fileName: 'app.py (free local model RAG)',
        commands: [
          `import gradio as gr
import os
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.llms import HuggingFacePipeline
from langchain.chains import RetrievalQA
from transformers import pipeline as hf_pipeline

# ── Load models once at startup ────────────────────────────────
# Embedding model — converts text to vectors for similarity search
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# Language model — generates answers from retrieved context
# flan-t5-small: lightweight (~80MB), suitable for free CPU
qa_pipeline = hf_pipeline(
    "text2text-generation",
    model="google/flan-t5-small",
    max_new_tokens=200,
)
llm = HuggingFacePipeline(pipeline=qa_pipeline)

def answer_question(pdf_file, question):
    if pdf_file is None:
        return "Please upload a PDF first."
    if not question or not question.strip():
        return "Please enter a question."

    # Load PDF
    loader    = PyPDFLoader(pdf_file.name)
    documents = loader.load()

    if not documents:
        return "Could not extract text from this PDF. Try a different file."

    # Limit pages for demo safety on free CPU
    documents = documents[:20]

    # Split into chunks
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50,
    )
    chunks = splitter.split_documents(documents)

    if not chunks:
        return "No readable text chunks found. The PDF may be scanned/image-only."

    # Create vector store
    vectorstore = FAISS.from_documents(chunks, embeddings)
    retriever   = vectorstore.as_retriever(search_kwargs={"k": 3})

    # Build QA chain
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
    )

    result = qa_chain.invoke({"query": question})
    return result.get("result", "No answer found. Try rephrasing your question.")

demo = gr.Interface(
    fn=answer_question,
    inputs=[
        gr.File(label="Upload PDF", file_types=[".pdf"]),
        gr.Textbox(
            label="Ask a question about the document",
            placeholder="What is this document about?",
        ),
    ],
    outputs=gr.Textbox(label="Answer", lines=6),
    title="📄 RAG Document Q&A Demo",
    description=(
        "Upload a PDF and ask questions. "
        "Uses sentence-transformers for embeddings and flan-t5-small for answers. "
        "Best for short factual questions on 5–20 page documents."
    ),
    theme=gr.themes.Soft(),
)

if __name__ == "__main__":
    demo.launch()`,
        ],
        note: 'sentence-transformers/all-MiniLM-L6-v2 is only 80MB and very fast for CPU embeddings. flan-t5-small is ~250MB. Combined memory usage: ~4–6GB — fits in HF Spaces 16GB free CPU.',
      },
      {
        label: 'Upgrade path — better answers with flan-t5-base',
        isText: true,
        text: [
          'For better answer quality (still free, no API key):',
          '   Replace "google/flan-t5-small" with "google/flan-t5-base"',
          '   Slightly larger model (~480MB) but noticeably better answers.',
          '',
          'Model size / quality comparison:',
          '   flan-t5-small  → ~250MB,  fast but limited reasoning',
          '   flan-t5-base   → ~480MB,  better for factual Q&A',
          '   flan-t5-large  → ~1.2GB,  good quality, slower on CPU',
          '',
          'For significantly better answers (requires OpenAI API key):',
          '   See Phase 06 — OpenAI RAG option.',
          '',
          'Honest note:',
          '   Small local models (flan-t5-small/base) are great for demonstrating',
          '   the RAG architecture concept.',
          '   For actual document understanding quality, OpenAI/Claude gives',
          '   much better results.',
          '   Be honest about this in your demo description.',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '06',
    title: 'app.py — OpenAI-powered RAG (better quality)',
    color: '#EC4899',
    steps: [
      {
        label: 'RAG with OpenAI — better answers, requires API key',
        isFile: true,
        fileName: 'app.py (OpenAI RAG)',
        commands: [
          `import gradio as gr
import os
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA

# Embedding model — free, no API key needed
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# OpenAI LLM — API key from Space secrets
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

llm = ChatOpenAI(
    model="gpt-4o-mini",
    api_key=OPENAI_API_KEY,
    temperature=0,
) if OPENAI_API_KEY else None

def answer_question(pdf_file, question):
    if llm is None:
        return "OPENAI_API_KEY not set. Add it in Space Settings → Secrets."
    if pdf_file is None:
        return "Please upload a PDF."
    if not question.strip():
        return "Please enter a question."

    loader    = PyPDFLoader(pdf_file.name)
    documents = loader.load()[:20]

    if not documents:
        return "Could not extract text from this PDF."

    splitter  = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks    = splitter.split_documents(documents)
    vectorstore = FAISS.from_documents(chunks, embeddings)
    retriever   = vectorstore.as_retriever(search_kwargs={"k": 3})

    qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)
    result   = qa_chain.invoke({"query": question})
    return result.get("result", "No answer found.")

demo = gr.Interface(
    fn=answer_question,
    inputs=[
        gr.File(label="Upload PDF", file_types=[".pdf"]),
        gr.Textbox(label="Ask a question", placeholder="What is this document about?"),
    ],
    outputs=gr.Textbox(label="Answer", lines=6),
    title="📄 RAG Document Q&A (OpenAI)",
    description="PDF Q&A using sentence-transformers for retrieval and GPT-5.5-mini for answers.",
)

if __name__ == "__main__":
    demo.launch()`,
        ],
        note: 'This version keeps embeddings free (sentence-transformers) and only uses OpenAI for generation. This minimises cost — embeddings run locally, only the final Q&A call hits OpenAI.',
      },
    ],
  },

  {
    phase: '07',
    title: 'requirements.txt',
    color: '#60A5FA',
    steps: [
      {
        label: 'requirements.txt for RAG projects',
        isText: true,
        text: [
          'For free local model RAG:',
          '   gradio',
          '   langchain',
          '   langchain-community',
          '   sentence-transformers',
          '   faiss-cpu',
          '   transformers',
          '   torch',
          '   pypdf',
          '',
          'For OpenAI-powered RAG (add these):',
          '   openai',
          '   langchain-openai',
          '',
          'Rules:',
          '→ Use faiss-cpu (NOT faiss-gpu) on free CPU Spaces',
          '→ torch + transformers are large (~2GB) — first build takes 8–15 min',
          '→ Do not add packages you do not import',
          '→ If build times out, try removing unused packages',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '08',
    title: 'README.md and .gitignore',
    color: '#F59E0B',
    steps: [
      {
        label: 'README.md — Space metadata frontmatter',
        isFile: true,
        fileName: 'README.md',
        commands: [
          `---
title: RAG Document Q&A
emoji: 📄
colorFrom: yellow
colorTo: orange
sdk: gradio
sdk_version: 4.44.0
app_file: app.py
pinned: false
---

# RAG Document Q&A Demo

Upload a PDF and ask questions. The app uses Retrieval-Augmented Generation
to find relevant sections and generate an answer.

## How it works
1. PDF is uploaded and text is extracted
2. Text is split into chunks and embedded using sentence-transformers
3. FAISS vector database stores the embeddings
4. Your question is embedded and matched to relevant chunks
5. A language model generates an answer from the retrieved context

## Models used
- Embeddings: sentence-transformers/all-MiniLM-L6-v2 (free)
- Generation: google/flan-t5-small (free, limited quality)

## Limitations
- Best for short factual questions on 5–20 page PDFs
- Small language model — complex reasoning may not work well
- Uploaded PDFs are not saved permanently (ephemeral storage)
- This is a demo — not for production document management`,
        ],
        note: '',
      },
      {
        label: '.gitignore',
        isFile: true,
        fileName: '.gitignore',
        commands: [
          `.env
.env.local
.env.*

__pycache__/
*.pyc

venv/
env/
.venv/

.DS_Store
Thumbs.db

# Private documents — never push
sample_private_docs/
private_pdfs/`,
        ],
        note: 'Never push private PDFs to your Space repo. Only commit public/safe sample documents if needed for demo purposes.',
      },
    ],
  },

  {
    phase: '09',
    title: 'Create Space and deploy',
    color: '#4ADE80',
    steps: [
      {
        label: 'Create Hugging Face Space and push code',
        isText: true,
        text: [
          '1. huggingface.co → "+" → New Space',
          '   Space name: rag-demo',
          '   SDK: Gradio',
          '   Hardware: CPU basic (free)',
          '   Visibility: Public',
          '   Create Space',
          '',
          '2. Clone and push:',
        ],
        note: '',
      },
      {
        label: 'Git commands to deploy',
        commands: [
          `git clone https://huggingface.co/spaces/YOUR_USERNAME/rag-demo`,
          `cd rag-demo`,
          `# Copy app.py, requirements.txt, README.md, .gitignore`,
          `git add .`,
          `git commit -m "add RAG demo"`,
          `git push`,
        ],
        note: 'First build takes 8–15 minutes — torch + transformers + sentence-transformers are large. Watch the Build tab. Subsequent builds are faster due to caching.',
      },
    ],
  },

  {
    phase: '10',
    title: 'Add OpenAI secret (if using OpenAI)',
    color: '#A78BFA',
    steps: [
      {
        label: 'Add OPENAI_API_KEY in Space settings',
        isText: true,
        text: [
          'Skip this phase if you are using the free local model version.',
          '',
          '1. Open your Space → Settings tab',
          '2. Scroll to "Repository secrets"',
          '3. Click "New secret"',
          '   Name:  OPENAI_API_KEY',
          '   Value: sk-your-actual-openai-key',
          '4. Click "Add new secret"',
          '5. Space restarts automatically',
          '',
          'In app.py (already coded safely):',
          '   OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")',
          '   llm = ChatOpenAI(api_key=OPENAI_API_KEY, ...) if OPENAI_API_KEY else None',
          '',
          'If key is missing — the app shows a clear error message:',
          '   "OPENAI_API_KEY not set. Add it in Space Settings → Secrets."',
          '',
          'Never:',
          '→ Hardcode the key in app.py',
          '→ Print the key with print()',
          '→ Commit the key to any file',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '11',
    title: 'If you accidentally pushed a secret to Git',
    color: '#EF4444',
    steps: [
      {
        label: 'Act immediately — revoke and clean',
        commands: [
          `git rm --cached .env`,
          `git commit -m "remove secret file from tracking"`,
          `git push`,
          `git grep "sk-" $(git rev-list --all)`,
        ],
        note: '⚠️  If an API key was pushed — revoke it immediately at platform.openai.com → API Keys. Then remove from Git tracking. Even after cleaning history, generate a new key.',
      },
    ],
  },

  {
    phase: '12',
    title: 'Verify live RAG app',
    color: '#4ADE80',
    steps: [
      {
        label: 'Test your deployed RAG app after build',
        isText: true,
        text: [
          '✅ Open your Space URL',
          '✅ UI loads with PDF upload and question input',
          '✅ Upload a small public PDF (5–10 pages)',
          '✅ Ask: "What is this document about?" — answer appears',
          '✅ Ask a specific factual question from the document',
          '✅ Answer is related to the document content',
          '',
          'Check Build/Logs if something fails:',
          '   Space → Build tab (during build)',
          '   Space → Logs tab (runtime)',
          '',
          'Common cause of slow response:',
          '   First PDF upload builds the FAISS index from scratch.',
          '   This takes 5–30 seconds depending on PDF size.',
          '   This is expected and normal on CPU.',
          '',
          'Share your Space:',
          '→ Resume under AI/LLM Projects',
          '→ LinkedIn Projects section',
          '→ GitHub README as live demo',
        ],
        note: 'A working RAG demo URL is one of the strongest AI portfolio items for students targeting NLP/LLM engineering roles.',
      },
    ],
  },

  {
    phase: '13',
    title: 'Free tier and limitations',
    color: '#34D399',
    steps: [
      {
        label: 'Honest explanation of what free CPU handles for RAG',
        isText: true,
        text: [
          'Works well on free CPU:',
          '✅ Short PDFs (5–20 pages)',
          '✅ Factual Q&A (questions answered directly in the text)',
          '✅ Demonstrating the RAG architecture concept',
          '✅ sentence-transformers/all-MiniLM-L6-v2 embeddings',
          '✅ flan-t5-small / flan-t5-base for generation',
          '',
          'Does not work well on free CPU:',
          '⚠️  Large PDFs (100+ pages) — too slow',
          '⚠️  Complex reasoning or synthesis questions',
          '⚠️  Large LLMs (Llama 7B, Mistral 7B) — out of memory',
          '⚠️  Real-time multi-user simultaneous requests',
          '',
          'Storage:',
          '   Uploaded PDFs are IN MEMORY only during the session.',
          '   They are NOT saved to disk permanently.',
          '   User must re-upload if Space restarts.',
          '   For persistent storage: use MongoDB Atlas + GridFS or Supabase.',
          '',
          'Always verify current hardware specs at huggingface.co/pricing.',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '14',
    title: 'Common errors and fixes',
    color: '#F97316',
    steps: [
      {
        label: 'Error 1 — Space stuck building for >15 minutes',
        isText: true,
        text: [
          'Cause A: torch + transformers are large (~2GB download).',
          '   Normal for first build — wait it out (8–15 min).',
          '',
          'Cause B: Dependency conflict in requirements.txt.',
          '   Check Build logs for the exact error.',
          '   Try removing packages one at a time to isolate the conflict.',
          '',
          'Cause C: faiss-gpu listed instead of faiss-cpu.',
          '   Fix: Change to "faiss-cpu" in requirements.txt.',
        ],
        note: '',
      },
      {
        label: 'Error 2 — ModuleNotFoundError',
        isText: true,
        text: [
          'Problem: Missing package at runtime.',
          '',
          'Common missing packages for RAG:',
          '   pypdf            ← for PyPDFLoader',
          '   sentence-transformers ← for HuggingFaceEmbeddings',
          '   faiss-cpu        ← for FAISS',
          '   langchain-community  ← for community integrations',
          '   langchain-openai ← for ChatOpenAI (OpenAI version only)',
          '',
          'Fix: Add the missing package to requirements.txt and push.',
        ],
        note: '',
      },
      {
        label: 'Error 3 — PDF has no extractable text',
        isText: true,
        text: [
          'Problem: "Could not extract text from this PDF."',
          '',
          'Cause: PDF is scanned/image-based — no selectable text.',
          '   PyPDFLoader cannot read image PDFs.',
          '',
          'Fix for users:',
          '   Tell them in the app description:',
          '   "Note: scanned or image-only PDFs are not supported."',
          '',
          'Fix for developers:',
          '   Use OCR (pytesseract + pdf2image) to extract text from images.',
          '   This adds complexity and heavy dependencies.',
          '   For student demo: just handle gracefully and inform the user.',
        ],
        note: '',
      },
      {
        label: 'Error 4 — CUDA not available',
        isText: true,
        text: [
          'Problem: "RuntimeError: CUDA is not available"',
          '',
          'Cause: Some model loaders try to use GPU by default.',
          '',
          'Fix for HuggingFaceEmbeddings:',
          '   embeddings = HuggingFaceEmbeddings(',
          '       model_name="...",',
          '       model_kwargs={"device": "cpu"}',
          '   )',
          '',
          'Fix for pipeline:',
          '   qa_pipeline = hf_pipeline(..., device=-1)',
          '   device=-1 forces CPU.',
        ],
        note: '',
      },
      {
        label: 'Error 5 — App very slow for large PDFs',
        isText: true,
        text: [
          'Problem: Processing takes too long or times out.',
          '',
          'Fix 1: Limit pages — already in the code:',
          '   documents = documents[:20]  ← max 20 pages',
          '',
          'Fix 2: Reduce chunk size:',
          '   chunk_size=300  ← fewer chunks = faster embedding',
          '',
          'Fix 3: Reduce k (retrieved chunks):',
          '   search_kwargs={"k": 2}  ← instead of k=3',
          '',
          'Fix 4: Display a warning in the UI:',
          '   "Processing large PDFs may take up to 30 seconds on free CPU."',
        ],
        note: '',
      },
      {
        label: 'Error 6 — Poor answer quality',
        isText: true,
        text: [
          'Problem: Answers are vague, incorrect, or irrelevant.',
          '',
          'Cause A: Small model limitation.',
          '   flan-t5-small gives limited answers.',
          '   Fix: Upgrade to flan-t5-base or use OpenAI (Phase 06).',
          '',
          'Cause B: Question too complex for RAG.',
          '   RAG works best for factual questions directly in the text.',
          '   "What does page 3 say about X?" → good.',
          '   "Analyse the author\'s writing style" → poor for small models.',
          '',
          'Cause C: k=3 chunks not enough context.',
          '   Fix: Try k=4 or k=5 for broader context retrieval.',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '15',
    title: 'Final checklist',
    color: '#34D399',
    steps: [
      {
        label: 'Verify before sharing your RAG demo URL',
        isText: true,
        text: [
          '── Code ─────────────────────────────────────────────',
          '  Small test PDF works end-to-end locally',
          '  Embeddings load without error',
          '  FAISS vectorstore builds without error',
          '  LLM generates a reasonable answer',
          '  Empty PDF and empty question handled gracefully',
          '  No API key hardcoded',
          '',
          '── Files ────────────────────────────────────────────',
          '  requirements.txt uses faiss-cpu not faiss-gpu',
          '  README.md has correct frontmatter',
          '  .gitignore excludes .env and venv/',
          '  No private PDFs in repo',
          '',
          '── Deployment ───────────────────────────────────────',
          '  Space builds without errors',
          '  PDF upload works',
          '  Question input works',
          '  Answer appears for known test question',
          '  Build/Logs show no errors',
          '',
          '── Sharing ───────────────────────────────────────────',
          '  Space URL in GitHub README',
          '  Space URL in LinkedIn Projects',
          '  Space URL in resume',
          '  README mentions limitations honestly',
        ],
        note: 'A working RAG demo with honest limitations documented in the README is one of the best LLM/AI portfolio items for students targeting AI engineering roles.',
      },
    ],
  },
]


// ─── Large / Heavy Model Deploy → HF Spaces + Model Hub ──────────────────────
