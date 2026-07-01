import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#3B82F6'

export default function HuggingFacePage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="APIs">
      <ToolHeader
        icon="🤗"
        title="Hugging Face — The GitHub of AI Models"
        tagline="Where the AI community shares models, datasets, and demos"
        badges={[['✓ FREE', '#4ADE80'], ['200,000+ models', color], ['Open-source hub', 'var(--text-muted)']]}
        overview={"Hugging Face is the central hub of the open-source AI world. If a new model is released by Meta, Mistral, Google, or any research lab, it appears on Hugging Face within hours. Over 200,000 models are freely available — text generation, image generation, speech recognition, translation, code generation, embeddings, and dozens of specialized tasks. Beyond model hosting, Hugging Face provides the Transformers library (Python) for loading and running any model locally, the Inference API for running models without downloading them, Spaces for hosting interactive demos, and Datasets for accessing research-grade training data. Understanding Hugging Face is understanding where AI models come from and how to use them directly."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Getting Started With Hugging Face in 15 Minutes — Transformers, Pipeline, Models', url: 'https://www.youtube.com/watch?v=QEaBAZQCtwE', dur: '15 min', note: 'Best intro — pipeline API, tokenizers, and model hub' },
            { label: 'Hugging Face Tutorial (2024) — Sentiment Analysis, Text Generation, LLM', url: 'https://www.youtube.com/watch?v=cWpgaIeF8pU', dur: '~20 min', note: 'Hands-on tasks with Transformers library in Python' },
            { label: 'Hugging Face 101: Your First Steps Coding with Transformers', url: 'https://www.youtube.com/watch?v=Mji39uWdhLU', dur: '~20 min', note: 'Beginner-friendly coding walkthrough from the Hub to inference' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What Hugging Face is" color={color} />
          <InfoBox color={color}>Hugging Face hosts three types of assets: Models (trained weights you can download or run via API), Datasets (training and evaluation data), and Spaces (interactive demos). The Transformers library is the standard way to load and run any model in Python. The Model Hub is where to go when you need to find a model for a specific task — especially specialized tasks (medical NER, code generation, a specific language) that major providers do not offer.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The importance of Hugging Face to the AI field is difficult to overstate. When a research paper introduces a new model, the authors upload the weights to Hugging Face so anyone can reproduce their results. When a company like Meta releases Llama, the model appears on Hugging Face. When a startup fine-tunes BERT for a niche task, they publish it on Hugging Face. It is simultaneously a research infrastructure tool and a production model registry. Learning to navigate it is a core skill for anyone working with AI.</p>
        </Block>
        <Block>
          <SubHead label="The Transformers library" color={color} />
          <InfoBox color={color}>The Transformers library (pip install transformers) provides a unified Python interface to load and run any model from the Hugging Face hub. The pipeline() function is the highest-level abstraction — give it a task name and optionally a model, and it handles tokenization, inference, and decoding automatically.</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Install the library', body: 'pip install transformers torch (for PyTorch) or pip install transformers tensorflow. PyTorch is the standard choice for most models.' },
            { n: '2', title: 'Use pipeline() for quick inference', body: "from transformers import pipeline\nclassifier = pipeline('sentiment-analysis')\nresult = classifier('I love learning about AI!')\nprint(result)  # [{'label': 'POSITIVE', 'score': 0.998}]\nOne line to run any standard task." },
            { n: '3', title: 'Specify a model', body: "pipeline('text-generation', model='meta-llama/Llama-3.1-8B') loads a specific model. Browse huggingface.co/models to find models for your task. Filter by task, language, and license." },
            { n: '4', title: 'Download model weights', body: 'Weights download automatically on first use (~gigabytes for large models). Set TRANSFORMERS_CACHE to control where. For large models, ensure you have enough disk space and RAM/GPU VRAM.' },
            { n: '5', title: 'Use tokenizer directly for control', body: 'For fine-grained control: load model and tokenizer separately. AutoTokenizer and AutoModel give you direct access to tokenize text, run forward pass, and process outputs.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Available tasks" color={color} />
          <CardGrid color={color} items={[
            { name: 'Text generation', desc: "Generate text completions, chat responses, story continuations. Hundreds of language models from GPT-2 to Llama 3. pipeline('text-generation')." },
            { name: 'Sentence embeddings', desc: 'Convert text to vectors for semantic search and RAG. sentence-transformers library (built on top of Transformers). The all-MiniLM-L6-v2 model (free, fast) is the most used embedding model.' },
            { name: 'Text classification', desc: 'Sentiment analysis, topic classification, spam detection, intent recognition. Many task-specific fine-tuned models — far better than prompting a general LLM for classification tasks.' },
            { name: 'Named Entity Recognition', desc: 'Extract people, organizations, locations, dates from text. Medical NER (drug names, symptoms), legal NER, financial NER — domain-specific models for each.' },
            { name: 'Translation', desc: 'Helsinki-NLP has 1000+ translation models for pairs of languages including Indian languages. Better than a general LLM for many low-resource language pairs.' },
            { name: 'Image-to-text / Vision', desc: 'BLIP, LLaVA, and other vision-language models. Describe images, answer questions about images, extract text from images (OCR).' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Inference API — no local GPU needed" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Get a free API token', body: 'huggingface.co → Settings → Access Tokens → New token (read permission). Free tier allows inference on most models with rate limits.' },
            { n: '2', title: 'Call any model via HTTP', body: "import requests\nAPI_URL = 'https://api-inference.huggingface.co/models/gpt2'\nheaders = {'Authorization': f'Bearer {HF_TOKEN}'}\nresponse = requests.post(API_URL, headers=headers, json={'inputs': 'Hello world'})\nprint(response.json())" },
            { n: '3', title: 'Handle cold starts', body: "Models on the free inference API 'sleep' when not in use. First request may return a 503 with 'estimated_time'. Wait that many seconds and retry. This only affects free tier — paid inference has warm models." },
            { n: '4', title: 'Use the Inference Client', body: "from huggingface_hub import InferenceClient\nclient = InferenceClient(model='...', token=HF_TOKEN)\nresponse = client.text_generation('prompt here')\nCleaner than raw requests for Hugging Face models." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Hugging Face Spaces" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Spaces are hosted interactive demos — Gradio or Streamlit apps running on Hugging Face's infrastructure. Thousands of spaces let you test models in a browser without any code. Before integrating a model into your project, find its Space demo and test it interactively. This is the fastest way to evaluate whether a model does what you need.</p>
          <CardGrid color={color} items={[
            { name: 'Test before integrating', desc: "Find the model's Space. Try your actual use case inputs. Assess quality interactively before writing any API code. Saves significant integration time." },
            { name: 'Host your own demos', desc: 'Free hosting for Gradio/Streamlit apps with GPU (limited). Deploy your own AI demo. Great for portfolio projects and sharing work.' },
            { name: 'Find specialized models', desc: 'Search Spaces by task. Want to test a specific translation model, an image segmentation model, or a music generation model? There is usually a Space demo.' },
            { name: 'Duplicate and modify', desc: 'Clone any public Space to your own account. Modify the code. Deploy your version. Fast way to prototype AI-powered demos.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Finding the right model" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Filter by task', body: 'huggingface.co/models → Filter by task type on the left. This narrows 200K models to the relevant hundreds or dozens.' },
            { n: '2', title: 'Sort by downloads', body: "Sort by 'Most Downloads'. High download count = battle-tested by the community. A model with 10M downloads has been stress-tested in production across many use cases." },
            { n: '3', title: 'Check the model card', body: 'Click any model → read the Model Card. Look for: training data, intended use, known limitations, evaluation results. A model without a card is lower quality or less trustworthy.' },
            { n: '4', title: 'Check the license', body: 'Filter by license if building a commercial product. Apache 2.0 and MIT = use freely. Llama community license = free for non-commercial. Some models have commercial restrictions. Check before building on them.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Access 200,000+ pre-trained models for text, image, audio, and specialized tasks completely free',
            'Run any model locally with 3 lines of Python using the Transformers library',
            'Use the Inference API to call models without downloading weights or needing a GPU',
            "Find domain-specific models (medical, legal, Indian languages) that general APIs don't offer",
            'Host interactive demos of your AI projects for free on Hugging Face Spaces',
        ]} />
      </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span>
            <span className="tool-layout-task__label">PROJECT — Build a Sentence Similarity Tool</span>
          </div>
          <p className="tool-layout-task__desc">Use Hugging Face's sentence-transformers library to build a tool that compares how similar two pieces of text are. Input: any two texts. Output: a similarity score from 0 (unrelated) to 1 (identical meaning). Test it with: (1) paraphrases of the same sentence, (2) sentences on completely different topics, (3) questions and their correct answers. This demonstrates semantic similarity — the core of RAG retrieval and recommendation systems.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Install sentence-transformers', body: 'pip install sentence-transformers\nThis library wraps Hugging Face models for easy sentence-level embeddings. No raw Transformers complexity.' },
            { n: '2', title: 'Load a model and encode', body: "from sentence_transformers import SentenceTransformer, util\nmodel = SentenceTransformer('all-MiniLM-L6-v2')\nsent1 = model.encode('The cat sat on the mat')\nsent2 = model.encode('A feline rested on the rug')\nprint(util.cos_sim(sent1, sent2))  # ~0.85" },
            { n: '3', title: 'Test semantic vs lexical similarity', body: 'Compare pairs that are similar in meaning but different in words. Compare pairs that share words but have different meaning. The score should reflect meaning, not word overlap.' },
            { n: '4', title: 'Build a simple search', body: "Encode a list of 20 sentences as a 'database'. Encode a search query. Use util.semantic_search() to find the top 3 most semantically similar sentences. This is semantic search in ~10 lines of code." },
          ]} />
        </div>
        <ProTip>
        The sentence-transformers library (separate from but built on Transformers) is the fastest path to building anything involving text similarity, semantic search, or embeddings. pip install sentence-transformers gives you access to 50+ pre-trained embedding models with a clean, consistent API. Start with all-MiniLM-L6-v2 (fast, 384 dimensions, free) and upgrade to BAAI/bge-large-en-v1.5 (better quality, 1024 dimensions) only if quality is measurably insufficient for your task.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/apis/together-ai', label: 'Together AI' }}
        next={{ path: '/ai-lab/agents/langchain', label: 'LangChain' }}
      />
    </ToolPageShell>
  )
}
