import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#6366F1'

export default function OllamaPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Local AI">
      <ToolHeader
        icon="🦙"
        title="Ollama — Run AI Models Locally on Your Machine"
        tagline="Download and run Llama, Mistral, Gemma, and more — no cloud, no API key"
        badges={[['✓ COMPLETELY FREE', '#4ADE80'], ['No API key needed', color], ['Runs offline', 'var(--text-muted)']]}
        overview={"Ollama is the easiest way to run large language models on your own computer. Download the app, run one command, and a model like Llama 3.1, Mistral, Gemma 2, or Phi-3 is running locally — no internet connection required, no API key, no per-token cost, complete data privacy. Ollama manages model downloads, quantization, and the inference server automatically. It exposes a local REST API that is compatible with the OpenAI SDK, so any code that calls OpenAI can be switched to a local model by changing one line. For students who want to experiment with AI without spending money, or for any application where data privacy is critical, Ollama is the starting point."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Learn Ollama in 15 Minutes — Run LLM Models Locally for FREE', url: 'https://www.youtube.com/watch?v=UtSSMs6ObqY', dur: '15 min', note: 'Best quick start — install, pull, run, API usage in 15 minutes' },
            { label: 'How to Run & Train LLMs Locally with Ollama — Beginner to Pro', url: 'https://www.youtube.com/watch?v=bRsAMtNfShk', dur: '~40 min', note: 'Complete guide — setup, models, Python integration, fine-tuning' },
            { label: 'How to Run Local LLMs with Ollama: A Step-by-Step Guide', url: 'https://www.youtube.com/watch?v=N4haIG4kWN8', dur: '~25 min', note: 'Step-by-step 2025 — covers latest models and Open WebUI setup' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why run models locally" color={color} />
          <InfoBox color={color}>Local models offer three things cloud APIs cannot: zero ongoing cost (run unlimited times after model download), complete data privacy (nothing leaves your machine), and offline operation (works without internet). The tradeoff: local models require disk space (4–40GB per model) and are slower than cloud APIs on most consumer hardware without a dedicated GPU.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The practical sweet spot for local models in 2025: Llama 3.1 8B and Gemma 2 9B run well on 8GB RAM with acceptable speed on CPU. Phi-3 Mini runs on 4GB RAM. For development, testing prompts, building features that need privacy, or learning how models work without API costs — these models are more than capable. For tasks requiring the absolute best quality (complex reasoning, difficult code), cloud APIs still lead. The right approach: use local models for development and experimentation, cloud for production when quality demands it.</p>
        </Block>
        <Block>
          <SubHead label="Getting started" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Download and install Ollama', body: 'Go to ollama.com → download for Windows, Mac, or Linux. Install like a regular app. Ollama runs a background service that manages models and handles inference requests on localhost:11434.' },
            { n: '2', title: 'Pull your first model', body: 'ollama pull llama3.1 (8B, ~5GB)\nollama pull gemma2 (9B, ~6GB)\nollama pull phi3 (3.8B, ~2.3GB — best for low-RAM systems)\nModels download once. After that they run instantly offline.' },
            { n: '3', title: 'Chat in the terminal', body: 'ollama run llama3.1\nType your message and press Enter. Type /bye to exit. This is the fastest way to test a model — no code needed.' },
            { n: '4', title: 'Use the REST API', body: "Ollama runs on http://localhost:11434. It accepts the same request format as OpenAI:\ncurl http://localhost:11434/api/chat -d '{\"model\": \"llama3.1\", \"messages\": [{\"role\": \"user\", \"content\": \"Hello\"}]}'" },
          ]} />
        </Block>
        <Block>
          <SubHead label="Popular models and what they're good for" color={color} />
          <CardGrid color={color} items={[
            { name: 'Llama 3.1 8B', desc: "Meta's flagship small model. Best general-purpose local model for most tasks. ~5GB download. Requires 8GB RAM. Strong instruction following, coding, and reasoning for its size." },
            { name: 'Llama 3.1 70B', desc: 'Much more capable, much larger. ~40GB download. Requires 32GB+ RAM or GPU VRAM. Quality approaches GPT-3.5. Only practical on high-spec machines or with GPU.' },
            { name: 'Gemma 2 9B', desc: "Google's open-source model. Excellent instruction following and safety. Slightly better than Llama 3.1 8B on some tasks. ~6GB download. Good default choice." },
            { name: 'Phi-3 Mini (3.8B)', desc: "Microsoft's surprisingly capable small model. ~2.3GB download. Runs on 4GB RAM. Best choice for low-spec hardware. Strong for its size on reasoning tasks." },
            { name: 'Mistral 7B', desc: 'Fast and capable. Strong on coding and technical tasks. ~4GB download. One of the best models at the 7B parameter level. Good balance of speed and quality.' },
            { name: 'CodeLlama / DeepSeek-Coder', desc: 'Fine-tuned specifically for code generation. Better than general models for pure coding tasks. ollama pull codellama or ollama pull deepseek-coder.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Using Ollama with Python (OpenAI SDK)" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Install OpenAI SDK', body: 'pip install openai\nThe OpenAI Python SDK works with Ollama by changing the base URL. No need for a separate Ollama SDK.' },
            { n: '2', title: 'Point the client to Ollama', body: "from openai import OpenAI\nclient = OpenAI(\n    base_url='http://localhost:11434/v1',\n    api_key='ollama'  # required field but ignored by Ollama\n)" },
            { n: '3', title: 'Make API calls exactly as OpenAI', body: "response = client.chat.completions.create(\n    model='llama3.1',\n    messages=[{'role': 'user', 'content': 'Explain recursion briefly'}]\n)\nprint(response.choices[0].message.content)\nIdentical to OpenAI SDK — just a different base URL and model name." },
            { n: '4', title: 'Use streaming', body: "stream = client.chat.completions.create(\n    model='llama3.1',\n    messages=[{'role': 'user', 'content': 'Write a short poem'}],\n    stream=True\n)\nfor chunk in stream:\n    print(chunk.choices[0].delta.content or '', end='', flush=True)" },
          ]} />
        </Block>
        <Block>
          <SubHead label="Open WebUI — ChatGPT interface for local models" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Open WebUI is a free, open-source web interface for Ollama that looks and works like ChatGPT. It runs in your browser, connects to your local Ollama instance, and provides a full chat interface with conversation history, system prompts, file uploads, and model switching. If you want the ChatGPT experience with local models at zero cost, Open WebUI + Ollama is the combination.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Install with Docker', body: 'docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main\nOpen http://localhost:3000' },
            { n: '2', title: 'Connect to Ollama', body: 'Open WebUI auto-detects Ollama on localhost:11434. Your installed models appear in the model selector immediately. No configuration needed.' },
            { n: '3', title: 'Use like ChatGPT', body: 'Create conversations, save history, set system prompts, upload files for analysis. Full conversation management with local models. Free, private, offline-capable.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Ollama with LangChain and other frameworks" color={color} />
          <Compare color={color} items={[
            { label: 'LangChain + Ollama', badge: 'ChatOllama class', body: "from langchain_ollama import ChatOllama\nllm = ChatOllama(model='llama3.1')\nDrop-in replacement for ChatOpenAI in any LangChain chain. Build RAG systems, agents, and chains that run entirely locally at zero cost." },
            { label: 'CrewAI + Ollama', badge: 'Local agent teams', body: 'Pass a ChatOllama instance as the llm parameter to any CrewAI Agent. Run multi-agent systems locally — useful for development and for systems processing sensitive data.' },
            { label: 'Flowise + Ollama', badge: 'Visual local AI', body: 'Flowise has an Ollama Chat Model node. Build visual LangChain flows with local models. Prototype AI applications at zero cost before switching to cloud models.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Run Llama 3.1, Gemma 2, Mistral, and 100+ other models on your own computer with zero ongoing cost',
            'Build AI features that work completely offline — no internet, no API key, no usage limits',
            'Process sensitive data (personal documents, confidential code) through an AI without sending it to the cloud',
            'Use any local Ollama model as a drop-in replacement for OpenAI in LangChain, CrewAI, and other frameworks',
            'Get the ChatGPT web interface experience with local models using Open WebUI + Ollama',
        ]} />
      </Block>
        <ProjectTask
        title={"Build a Private Document Assistant"}
        description={"Using Ollama (local model) + LangChain + ChromaDB (local vector store), build a document Q&A system where all data stays on your machine. Load a personal document — your CV, notes, a book chapter. Ask questions. The entire pipeline: document → embeddings → vector store → retrieval → LLM → answer runs locally. No data leaves your computer. Cost: ₹0 total."}
        costNote={"TOTAL COST: ₹0 — Ollama is free, all models run locally, no API keys required"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Install everything', body: 'Install Ollama and pull llama3.1. pip install langchain langchain-ollama chromadb sentence-transformers pypdf. All free, all local.' },
            { n: '2', title: 'Build the local RAG chain', body: "Use PyPDFLoader → RecursiveCharacterTextSplitter → HuggingFaceEmbeddings (local, free) → ChromaDB (local) → ChatOllama('llama3.1'). Every component runs on your machine." },
            { n: '3', title: 'Persist the vector store', body: "Pass persist_directory='./chroma_db' when creating ChromaDB. Now the vectors are saved to disk — you do not need to re-embed the document every run." },
            { n: '4', title: 'Test with real questions', body: 'Ask 10 questions about your document. Compare quality to a cloud API (ChatGroq with Llama 3.1 70B via API). Note where the local 8B model struggles vs where it handles questions well.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Model quantization is how Ollama fits large models on consumer hardware. A 7B model in full 32-bit precision requires ~28GB RAM. Ollama automatically downloads 4-bit quantized versions (~4GB) that sacrifice small quality for massive size reduction. The 'q4_0' in model names means 4-bit quantization. For most tasks, q4 quality is indistinguishable from full precision. If you need higher quality: pull the q8 version (8-bit, larger but better quality). ollama pull llama3.1:8b-instruct-q8_0
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/automation/zapier', label: 'Zapier' }}
        next={{ path: '/ai-lab/local/lmstudio', label: 'LM Studio' }}
      />
    </ToolPageShell>
  )
}
