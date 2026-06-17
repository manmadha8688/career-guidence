import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#3B82F6'

export default function HuggingFacePage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>APIs</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🤗</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Hugging Face — The GitHub of AI Models</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Where the AI community shares models, datasets, and demos</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['200,000+ models', color], ['Open-source hub', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Hugging Face is the central hub of the open-source AI world. If a new model is released by Meta, Mistral, Google, or any research lab, it appears on Hugging Face within hours. Over 200,000 models are freely available — text generation, image generation, speech recognition, translation, code generation, embeddings, and dozens of specialized tasks. Beyond model hosting, Hugging Face provides the Transformers library (Python) for loading and running any model locally, the Inference API for running models without downloading them, Spaces for hosting interactive demos, and Datasets for accessing research-grade training data. Understanding Hugging Face is understanding where AI models come from and how to use them directly.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Getting Started With Hugging Face in 15 Minutes — Transformers, Pipeline, Models', url: 'https://www.youtube.com/watch?v=QEaBAZQCtwE', dur: '15 min', note: 'Best intro — pipeline API, tokenizers, and model hub' },
            { label: 'Hugging Face Tutorial (2024) — Sentiment Analysis, Text Generation, LLM', url: 'https://www.youtube.com/watch?v=cWpgaIeF8pU', dur: '~20 min', note: 'Hands-on tasks with Transformers library in Python' },
            { label: 'Hugging Face 101: Your First Steps Coding with Transformers', url: 'https://www.youtube.com/watch?v=Mji39uWdhLU', dur: '~20 min', note: 'Beginner-friendly coding walkthrough from the Hub to inference' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What Hugging Face is */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What Hugging Face is" color={color} />
          <InfoBox color={color} dark={dark}>Hugging Face hosts three types of assets: Models (trained weights you can download or run via API), Datasets (training and evaluation data), and Spaces (interactive demos). The Transformers library is the standard way to load and run any model in Python. The Model Hub is where to go when you need to find a model for a specific task — especially specialized tasks (medical NER, code generation, a specific language) that major providers do not offer.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The importance of Hugging Face to the AI field is difficult to overstate. When a research paper introduces a new model, the authors upload the weights to Hugging Face so anyone can reproduce their results. When a company like Meta releases Llama, the model appears on Hugging Face. When a startup fine-tunes BERT for a niche task, they publish it on Hugging Face. It is simultaneously a research infrastructure tool and a production model registry. Learning to navigate it is a core skill for anyone working with AI.</p>
        </Block>

        {/* The Transformers library */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="The Transformers library" color={color} />
          <InfoBox color={color} dark={dark}>The Transformers library (pip install transformers) provides a unified Python interface to load and run any model from the Hugging Face hub. The pipeline() function is the highest-level abstraction — give it a task name and optionally a model, and it handles tokenization, inference, and decoding automatically.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install the library', body: 'pip install transformers torch (for PyTorch) or pip install transformers tensorflow. PyTorch is the standard choice for most models.' },
            { n: '2', title: 'Use pipeline() for quick inference', body: "from transformers import pipeline\nclassifier = pipeline('sentiment-analysis')\nresult = classifier('I love learning about AI!')\nprint(result)  # [{'label': 'POSITIVE', 'score': 0.998}]\nOne line to run any standard task." },
            { n: '3', title: 'Specify a model', body: "pipeline('text-generation', model='meta-llama/Llama-3.1-8B') loads a specific model. Browse huggingface.co/models to find models for your task. Filter by task, language, and license." },
            { n: '4', title: 'Download model weights', body: 'Weights download automatically on first use (~gigabytes for large models). Set TRANSFORMERS_CACHE to control where. For large models, ensure you have enough disk space and RAM/GPU VRAM.' },
            { n: '5', title: 'Use tokenizer directly for control', body: 'For fine-grained control: load model and tokenizer separately. AutoTokenizer and AutoModel give you direct access to tokenize text, run forward pass, and process outputs.' },
          ]} />
        </Block>

        {/* Available tasks */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Available tasks" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Text generation', desc: "Generate text completions, chat responses, story continuations. Hundreds of language models from GPT-2 to Llama 3. pipeline('text-generation')." },
            { name: 'Sentence embeddings', desc: 'Convert text to vectors for semantic search and RAG. sentence-transformers library (built on top of Transformers). The all-MiniLM-L6-v2 model (free, fast) is the most used embedding model.' },
            { name: 'Text classification', desc: 'Sentiment analysis, topic classification, spam detection, intent recognition. Many task-specific fine-tuned models — far better than prompting a general LLM for classification tasks.' },
            { name: 'Named Entity Recognition', desc: 'Extract people, organizations, locations, dates from text. Medical NER (drug names, symptoms), legal NER, financial NER — domain-specific models for each.' },
            { name: 'Translation', desc: 'Helsinki-NLP has 1000+ translation models for pairs of languages including Indian languages. Better than a general LLM for many low-resource language pairs.' },
            { name: 'Image-to-text / Vision', desc: 'BLIP, LLaVA, and other vision-language models. Describe images, answer questions about images, extract text from images (OCR).' },
          ]} />
        </Block>

        {/* Inference API */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Inference API — no local GPU needed" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Get a free API token', body: 'huggingface.co → Settings → Access Tokens → New token (read permission). Free tier allows inference on most models with rate limits.' },
            { n: '2', title: 'Call any model via HTTP', body: "import requests\nAPI_URL = 'https://api-inference.huggingface.co/models/gpt2'\nheaders = {'Authorization': f'Bearer {HF_TOKEN}'}\nresponse = requests.post(API_URL, headers=headers, json={'inputs': 'Hello world'})\nprint(response.json())" },
            { n: '3', title: 'Handle cold starts', body: "Models on the free inference API 'sleep' when not in use. First request may return a 503 with 'estimated_time'. Wait that many seconds and retry. This only affects free tier — paid inference has warm models." },
            { n: '4', title: 'Use the Inference Client', body: "from huggingface_hub import InferenceClient\nclient = InferenceClient(model='...', token=HF_TOKEN)\nresponse = client.text_generation('prompt here')\nCleaner than raw requests for Hugging Face models." },
          ]} />
        </Block>

        {/* Hugging Face Spaces */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Hugging Face Spaces" color={color} />
          <p style={{ ...P(sub), marginBottom: '1rem' }}>Spaces are hosted interactive demos — Gradio or Streamlit apps running on Hugging Face's infrastructure. Thousands of spaces let you test models in a browser without any code. Before integrating a model into your project, find its Space demo and test it interactively. This is the fastest way to evaluate whether a model does what you need.</p>
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Test before integrating', desc: "Find the model's Space. Try your actual use case inputs. Assess quality interactively before writing any API code. Saves significant integration time." },
            { name: 'Host your own demos', desc: 'Free hosting for Gradio/Streamlit apps with GPU (limited). Deploy your own AI demo. Great for portfolio projects and sharing work.' },
            { name: 'Find specialized models', desc: 'Search Spaces by task. Want to test a specific translation model, an image segmentation model, or a music generation model? There is usually a Space demo.' },
            { name: 'Duplicate and modify', desc: 'Clone any public Space to your own account. Modify the code. Deploy your version. Fast way to prototype AI-powered demos.' },
          ]} />
        </Block>

        {/* Finding the right model */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Finding the right model" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Filter by task', body: 'huggingface.co/models → Filter by task type on the left. This narrows 200K models to the relevant hundreds or dozens.' },
            { n: '2', title: 'Sort by downloads', body: "Sort by 'Most Downloads'. High download count = battle-tested by the community. A model with 10M downloads has been stress-tested in production across many use cases." },
            { n: '3', title: 'Check the model card', body: 'Click any model → read the Model Card. Look for: training data, intended use, known limitations, evaluation results. A model without a card is lower quality or less trustworthy.' },
            { n: '4', title: 'Check the license', body: 'Filter by license if building a commercial product. Apache 2.0 and MIT = use freely. Llama community license = free for non-commercial. Some models have commercial restrictions. Check before building on them.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Access 200,000+ pre-trained models for text, image, audio, and specialized tasks completely free',
            'Run any model locally with 3 lines of Python using the Transformers library',
            'Use the Inference API to call models without downloading weights or needing a GPU',
            "Find domain-specific models (medical, legal, Indian languages) that general APIs don't offer",
            'Host interactive demos of your AI projects for free on Hugging Face Spaces',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}`, marginBottom: '0.5rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 7 }} />
              <span style={{ fontSize: '0.85rem', color: sub, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Sentence Similarity Tool</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Use Hugging Face's sentence-transformers library to build a tool that compares how similar two pieces of text are. Input: any two texts. Output: a similarity score from 0 (unrelated) to 1 (identical meaning). Test it with: (1) paraphrases of the same sentence, (2) sentences on completely different topics, (3) questions and their correct answers. This demonstrates semantic similarity — the core of RAG retrieval and recommendation systems.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install sentence-transformers', body: 'pip install sentence-transformers\nThis library wraps Hugging Face models for easy sentence-level embeddings. No raw Transformers complexity.' },
            { n: '2', title: 'Load a model and encode', body: "from sentence_transformers import SentenceTransformer, util\nmodel = SentenceTransformer('all-MiniLM-L6-v2')\nsent1 = model.encode('The cat sat on the mat')\nsent2 = model.encode('A feline rested on the rug')\nprint(util.cos_sim(sent1, sent2))  # ~0.85" },
            { n: '3', title: 'Test semantic vs lexical similarity', body: 'Compare pairs that are similar in meaning but different in words. Compare pairs that share words but have different meaning. The score should reflect meaning, not word overlap.' },
            { n: '4', title: 'Build a simple search', body: "Encode a list of 20 sentences as a 'database'. Encode a search query. Use util.semantic_search() to find the top 3 most semantically similar sentences. This is semantic search in ~10 lines of code." },
          ]} />
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>The sentence-transformers library (separate from but built on Transformers) is the fastest path to building anything involving text similarity, semantic search, or embeddings. pip install sentence-transformers gives you access to 50+ pre-trained embedding models with a clean, consistent API. Start with all-MiniLM-L6-v2 (fast, 384 dimensions, free) and upgrade to BAAI/bge-large-en-v1.5 (better quality, 1024 dimensions) only if quality is measurably insufficient for your task.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/apis/together-ai')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Together AI
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/agents/langchain')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            LangChain <ChevronRight size={14} />
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
