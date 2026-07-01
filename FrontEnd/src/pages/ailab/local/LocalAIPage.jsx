import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#06B6D4'

export default function LocalAIPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Local AI">
      <ToolHeader
        icon="🏠"
        title="LocalAI — Self-Hosted OpenAI-Compatible API"
        tagline="Run a private AI API server on your hardware — any model, no cloud, no API keys"
        badges={[['✓ 100% FREE', '#4ADE80'], ['localai.io', color], ['Self-Hosted', 'var(--text-muted)']]}
        overview={"LocalAI is a free, open-source REST API server that gives your own hardware an OpenAI-compatible endpoint. Point any app that calls OpenAI at LocalAI's address instead — same request format, same response format, zero API costs, zero data leaving your network. Unlike Ollama (which focuses on developer UX for a single machine) or LM Studio (which targets desktop experimentation), LocalAI is designed to be an API server — the kind you deploy on a server or VM and share across a team or application. It supports chat completions, embeddings, image generation, text-to-speech, and speech-to-text, all from one self-hosted endpoint. If your goal is to replace OpenAI with a private, self-managed API for a team or project, LocalAI is the right tool."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'How to Use and Set up LocalAI — OpenAI API Open-Source Alternative', url: 'https://www.youtube.com/watch?v=9YuT5bmwQCY', dur: '~20 min', note: 'Step-by-step setup guide — Docker install, model loading, API calls' },
            { label: 'Install & Run LocalAI — LLM, TTS, Stable Diffusion on GPU/CPU', url: 'https://www.youtube.com/watch?v=yNF1vOxMMDg', dur: '~25 min', note: 'Multi-modal walkthrough — chat, image generation, and audio in one server' },
            { label: 'LocalAI Introduction — Install, Configure and Build on Your Own AI Platform', url: 'https://www.youtube.com/watch?v=cMVNnlqwfw4', dur: '~45 min', note: 'Deep-dive — Docker setup, model gallery, building apps on top of LocalAI' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What LocalAI actually is" color={color} />
          <InfoBox color={color}>LocalAI is an API server, not a desktop app. You run it as a Docker container (or binary) on any machine — your laptop, a home server, a cloud VM, or an air-gapped enterprise machine. It listens on a port (default: 8080) and exposes the exact same REST endpoints as OpenAI: /v1/chat/completions, /v1/embeddings, /v1/images/generations, /v1/audio/transcriptions, /v1/audio/speech. Any code that works with the OpenAI SDK works with LocalAI by changing one line: the base URL.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The key design decision that sets LocalAI apart: it runs multiple AI workloads from a single server. Most teams have separate services for chat, embeddings, and image generation — each with their own cloud API costs. LocalAI consolidates all of these into one self-hosted endpoint. A RAG pipeline that needs both embeddings and chat completions, a creative pipeline that needs both image generation and text, a voice app that needs both STT and TTS — all of these can run against a single LocalAI instance with zero per-call cost. The server also works without a GPU; it uses CPU inference by default, which is slower but runs on any machine.</p>
        </Block>
        <Block>
          <SubHead label="Key features" color={color} />
          <CardGrid color={color} items={[
            { name: 'Full OpenAI API Compatibility', desc: 'Implements /v1/chat/completions, /v1/embeddings, /v1/images/generations, /v1/audio/transcriptions, /v1/audio/speech. Any OpenAI SDK client (Python, JS, Go) works unchanged — just swap the base URL.' },
            { name: 'No GPU Required', desc: 'Runs on CPU using llama.cpp under the hood. Slower than GPU inference, but works on any laptop, server, or VM without special hardware. GPU acceleration optional with NVIDIA CUDA, AMD ROCm, or Intel oneAPI.' },
            { name: 'Docker Deployment', desc: 'Official Docker images for CPU and GPU variants. One docker run command or a docker-compose.yml is all you need to have a running AI API server. No Python environment, no dependency conflicts.' },
            { name: 'GGUF Model Support', desc: 'Loads GGUF-format models (the quantized format from llama.cpp). Download any GGUF model from Hugging Face, place it in the models directory, define a config YAML — and it appears as an API endpoint.' },
            { name: 'Built-in Model Gallery', desc: 'LocalAI ships a curated gallery of optimized models. Install with one API call: POST /models/apply with the model name. The gallery handles downloading, configuring, and registering the model automatically.' },
            { name: 'Multi-modal in One Server', desc: 'Chat LLMs, embedding models, Stable Diffusion image generation, Whisper speech-to-text, and TTS models all run from the same LocalAI instance. One server, one base URL, every modality.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Docker setup — quickstart" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Pull and run LocalAI (CPU)', body: 'docker run -p 8080:8080 -v $PWD/models:/build/models localai/localai:latest-aio-cpu\n\nThis starts LocalAI on http://localhost:8080. The -v flag mounts a local models/ directory so model files persist between container restarts. The "aio-cpu" tag is the all-in-one CPU image.' },
            { n: '2', title: 'Run with docker-compose (recommended)', body: 'Create docker-compose.yml:\nservices:\n  localai:\n    image: localai/localai:latest-aio-cpu\n    ports:\n      - "8080:8080"\n    volumes:\n      - ./models:/build/models\n    restart: unless-stopped\n\nThen: docker compose up -d' },
            { n: '3', title: 'Install a model from the gallery', body: 'curl http://localhost:8080/models/apply -H "Content-Type: application/json" -d \'{"id": "huggingface@TheBloke/Mistral-7B-Instruct-v0.2-GGUF/mistral-7b-instruct-v0.2.Q4_K_M.gguf"}\'\n\nThe gallery API downloads and registers the model. After it finishes (poll /models/jobs/{id}), the model is ready.' },
            { n: '4', title: 'Or drop in a GGUF file manually', body: 'Download any GGUF from Hugging Face into your models/ directory, then create a YAML config:\n# models/mistral.yaml\nname: mistral\nbackend: llama\nparameters:\n  model: mistral-7b-instruct-v0.2.Q4_K_M.gguf\n  context_size: 4096\n\nRestart the container and the model appears at the API.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Using the API with OpenAI SDK" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Python — point client at LocalAI', body: 'pip install openai\n\nfrom openai import OpenAI\nclient = OpenAI(\n    base_url="http://localhost:8080/v1",\n    api_key="not-needed"  # LocalAI ignores the key by default\n)' },
            { n: '2', title: 'Chat completions', body: 'response = client.chat.completions.create(\n    model="mistral",  # must match your model YAML name\n    messages=[{"role": "user", "content": "Explain Docker in one paragraph"}]\n)\nprint(response.choices[0].message.content)\n\nIdentical to OpenAI — change the model name and base_url, nothing else.' },
            { n: '3', title: 'Embeddings', body: 'result = client.embeddings.create(\n    model="text-embedding-ada-002",  # map to a local embedding model\n    input="LocalAI is an OpenAI-compatible API server"\n)\nvector = result.data[0].embedding\nprint(f"Embedding dim: {len(vector)}")\n\nUse with ChromaDB, FAISS, or any vector DB for local RAG at zero cost.' },
            { n: '4', title: 'Image generation', body: 'image = client.images.generate(\n    model="stablediffusion",  # configure a diffusion model in LocalAI\n    prompt="a futuristic city at night, cyberpunk style",\n    n=1,\n    size="512x512"\n)\nprint(image.data[0].url)\n\nStable Diffusion runs locally — no DALL-E API costs.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="LocalAI vs Ollama vs LM Studio" color={color} />
          <Compare color={color} items={[
            { label: 'LocalAI', badge: 'API server focus', body: 'Designed for deployment as a shared API server. Best for: teams sharing a single AI endpoint, projects that need chat + embeddings + images + audio from one service, air-gapped production deployments, replacing OpenAI costs across an entire app. Requires more manual setup (YAML configs, Docker volumes). More powerful, more complex.' },
            { label: 'Ollama', badge: 'Developer UX focus', body: 'Designed for a single developer running models locally during development. Best for: quick model downloads and chat, OpenAI-compatible dev API, switching models fast. Simpler commands (ollama pull, ollama run), cleaner developer experience. Less flexible for multi-modal or team deployments. 15–20% faster inference than LocalAI on LLM tasks.' },
            { label: 'LM Studio', badge: 'Desktop GUI focus', body: 'Designed for interactive exploration and experimentation on a desktop machine. Best for: beginners, browsing and comparing models, quick prompting without code. Not intended for serving APIs to applications. No Docker, no CLI — pure desktop GUI. Ideal for learning what models can do, not for production deployment.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="When to use LocalAI" color={color} />
          <CardGrid color={color} items={[
            { name: 'Team API Server', desc: 'Deploy LocalAI on one machine (or VM) on your network. Every team member points their OpenAI SDK calls at the same LocalAI URL. No one needs their own API key. No per-token costs for internal tools, scripts, and experiments.' },
            { name: 'Air-Gapped Environments', desc: 'Banks, hospitals, government, and defense projects where data cannot touch the internet. LocalAI on an internal server gives the full OpenAI API surface with no network dependency after model download. Fully compliant with data isolation requirements.' },
            { name: 'Eliminating Cloud API Costs', desc: 'High-volume internal tools — document processing, code review automation, batch summarization — are expensive against cloud APIs. LocalAI handles these workloads at fixed hardware cost. The ROI pays off quickly for teams with high token volumes.' },
            { name: 'Multi-modal Apps Without Multiple APIs', desc: 'An app that generates images, transcribes audio, creates embeddings, and chats can use one LocalAI instance for everything. No managing multiple API keys and vendor accounts. One endpoint, one auth, all modalities.' },
            { name: 'Privacy-First Applications', desc: 'HR tools, legal document analysis, medical record summarization — anything where data privacy is a legal or ethical requirement. LocalAI keeps all data on your infrastructure. Zero leakage to cloud providers.' },
            { name: 'Development and CI/CD', desc: 'Run tests against AI features without real API costs or rate limits. LocalAI in Docker makes it easy to spin up a local AI server in CI pipelines for integration testing of AI-powered features.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Supported model formats and backends" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>LocalAI uses a plugin-style backend system. Each backend handles a different format or task type. The most important ones to know:</p>
          <Steps color={color} items={[
            { n: 'GGUF', title: 'GGUF — primary format for LLMs', body: 'The standard quantized format for llama.cpp. All major open-source LLMs (Llama, Mistral, Gemma, Phi, Qwen, DeepSeek) are available as GGUF on Hugging Face. Pick the Q4_K_M quantization for the best balance of quality and RAM use. This is the format you will use most.' },
            { n: 'SD', title: 'Stable Diffusion — image generation', body: 'LocalAI supports Stable Diffusion 1.5 and SDXL for image generation via the /v1/images/generations endpoint. Download diffusion model weights, point the config at them — fully local image generation compatible with the DALL-E API format.' },
            { n: 'Whisper', title: 'Whisper — speech to text', body: 'OpenAI Whisper models run locally for speech-to-text. Exposes the /v1/audio/transcriptions endpoint. Useful for building transcription tools that process audio without sending data to OpenAI. Whisper models are available in tiny, base, small, medium, large sizes.' },
            { n: 'TTS', title: 'Text-to-Speech backends', body: 'LocalAI supports several TTS engines via the /v1/audio/speech endpoint. Piper TTS is the recommended backend — fast, free, offline, and produces natural-sounding speech in multiple languages. No ElevenLabs costs for internal tools.' },
          ]} />
        </Block>
        <ProjectTask
        title={"Build a Private Team AI API Server"}
        description={"Set up a LocalAI server with three models: one LLM (Mistral 7B), one embedding model, and one Whisper STT model. Write a Python script that uses all three through the OpenAI SDK — chat, generate embeddings for a set of documents, and transcribe an audio clip. Everything runs locally. The entire multi-modal AI stack costs ₹0 to run."}
        costNote={"TOTAL COST: ₹0 — LocalAI is free, open source, runs on your own hardware or any cheap VPS"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Start LocalAI with Docker', body: "docker run -p 8080:8080 -v $(pwd)/models:/build/models localai/localai:latest-aio-cpu\n\nCreate a models/ directory first. On Windows: use %cd%/models or an absolute path. Wait for LocalAI to finish starting — it prints 'LocalAI API is ready' when done." },
            { n: '2', title: 'Install a GGUF model', body: "Download Mistral-7B-Instruct Q4_K_M GGUF from Hugging Face into models/. Create models/mistral.yaml:\nname: mistral\nbackend: llama\nparameters:\n  model: mistral-7b-instruct-v0.2.Q4_K_M.gguf\n  context_size: 4096\n\nRestart LocalAI — the model is now available at /v1/chat/completions." },
            { n: '3', title: 'Connect with OpenAI SDK', body: "pip install openai\n\nfrom openai import OpenAI\nclient = OpenAI(base_url='http://localhost:8080/v1', api_key='local')\n\nresponse = client.chat.completions.create(\n    model='mistral',\n    messages=[{'role': 'user', 'content': 'What is LocalAI in one sentence?'}]\n)\nprint(response.choices[0].message.content)" },
            { n: '4', title: 'Compare cost: LocalAI vs OpenAI', body: "Estimate: if your app sends 1M tokens/day to GPT-4o-mini at $0.15/1M input tokens = TOTAL COST: ₹0 — LocalAI is free, open source, runs on your own hardware or any cheap VPS5/month.\nLocalAI on a Build a Private Team AI API Server0/month VPS: Build a Private Team AI API Server0/month — same traffic, 78% cheaper.\nFor internal tools processing 10M+ tokens/month, the savings compound fast. Calculate your team's actual token usage and project the savings." },
          ]} />
      </ProjectTask>
        <ProTip>
        The single most impactful LocalAI optimization: choose the right GGUF quantization. Q4_K_M is the sweet spot — roughly 4-bit with K-quant mixing that preserves quality on important layers. Q2_K fits more models into RAM but noticeably degrades coherence on complex tasks. Q8_0 is near-lossless but doubles the file size vs Q4. For a team API server, run Q4_K_M for general use. If a specific task (legal analysis, code generation) needs higher quality, load a Q6_K or Q8_0 variant as a second named model alongside your default. Users pick the right model per task — LocalAI serves both from one container.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/local/lmstudio', label: 'LM Studio' }}
        next={{ path: '/ai-lab/local/oobabooga', label: 'text-gen-webui' }}
      />
    </ToolPageShell>
  )
}
