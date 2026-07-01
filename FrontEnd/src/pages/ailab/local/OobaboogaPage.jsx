import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F59E0B'

export default function OobaboogaPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Local AI">
      <ToolHeader
        icon="🌐"
        title="text-generation-webui — The Power-User's Local AI Interface"
        tagline="Run any LLM locally with full control — GGUF, GPTQ, extensions, API server"
        badges={[['✓ 100% FREE', '#4ADE80'], ['github.com/oobabooga', color], ['Open Source', 'var(--text-muted)']]}
        overview={"text-generation-webui (known as \"oobabooga\" after its creator) is the most feature-complete web interface for running LLMs locally. With over 40,000 GitHub stars, it is the go-to tool for power users who want full control: every generation parameter exposed, every quantization format supported, extensions for voice input, image generation, long-term memory, and an OpenAI-compatible API server. If Ollama is the beginner-friendly option and LM Studio is the polished desktop app, oobabooga is the cockpit — every dial and lever is accessible. For students who want to deeply understand local AI, experiment with character cards, fine-tune models with LoRA, or build a custom inference server, this is the tool that does everything."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Install Oobabooga Text Generation WebUI With Llama 3.2 — 2024 Tutorial', url: 'https://www.youtube.com/watch?v=NNK6Kj_unOw', dur: '~20 min', note: 'Full install walkthrough — Colab and local, with Llama 3.2' },
            { label: 'Oobabooga Text-Generation-WebUI Tutorials Playlist', url: 'https://www.youtube.com/playlist?list=PLf-waOxb8tM7Bf9yW0W1_mo2SmamDe1Il', dur: 'Playlist', note: 'Comprehensive series — install, models, extensions, API, fine-tuning' },
            { label: 'How To Set Up The Oobabooga TextGen WebUI — Full Tutorial', url: 'https://techtactician.com/how-to-set-up-the-oobabooga-textgen-webui-tutorial/', dur: 'Step-by-step', note: 'Text + video guide — setup, model loading, chat modes explained clearly' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What is text-generation-webui" color={color} />
          <InfoBox color={color}>text-generation-webui is a Gradio-based Python web application that runs locally and provides a browser interface for loading and chatting with LLMs. It supports multiple backends (llama.cpp, ExLlamaV2, Transformers, AutoGPTQ, AutoAWQ) so any model format works. It exposes an OpenAI-compatible REST API so any code that calls OpenAI can switch to a local model by changing the base URL. The original project goal: become the AUTOMATIC1111 of text generation — the community standard for local LLM experimentation.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The key difference from Ollama and LM Studio: oobabooga exposes every generation parameter — temperature, top-p, top-k, repetition penalty, mirostat, context length, rope scaling, and dozens more. It supports character cards (a standard format for defining AI personas), notebook mode for freeform text generation, multiple chat formats, and a rich extension system. For users who want maximum control over their inference — researchers, enthusiasts, developers building specialized applications — this level of control is the point. For users who just want to chat with a local model quickly, Ollama is faster to start.</p>
        </Block>
        <Block>
          <SubHead label="Model formats supported" color={color} />
          <InfoBox color={color}>
            GGUF (llama.cpp backend) — The most common format for consumer hardware. Quantized models in 2-bit through 8-bit precision. GGUF files run on CPU only, GPU only, or split across both. Most models on HuggingFace have GGUF versions. This is the format you will use most often.{'\n\n'}
            GPTQ — GPU-quantized format. Faster than GGUF on NVIDIA GPUs. Requires CUDA. Usually 4-bit quantized. Lower memory usage than full-precision with minimal quality loss.{'\n\n'}
            AWQ (Activation-aware Weight Quantization) — More advanced 4-bit GPU quantization. Often better quality than GPTQ at the same bit width. Requires AutoAWQ backend.{'\n\n'}
            ExLlamaV2 (EXL2) — Fastest GPU inference among quantized formats. Mixed-bit quantization per layer. Best quality-per-memory-usage ratio. Requires NVIDIA GPU with CUDA.{'\n\n'}
            Transformers (HuggingFace) — Full-precision or bfloat16 models loaded directly. Highest quality, highest memory requirement. Used for fine-tuning with LoRA.
          </InfoBox>
        </Block>
        <Block>
          <SubHead label="Key features" color={color} />
          <CardGrid color={color} items={[
            { name: 'Chat Mode', desc: 'Full conversational interface with conversation history. Supports character cards — define an AI persona with name, description, personality, scenario, and example dialogue. Switch characters instantly. Import community character cards.' },
            { name: 'Notebook Mode', desc: 'Freeform text generation — type a prompt, continue generating from any point. Ideal for creative writing, story generation, and testing raw model completions without a chat wrapper.' },
            { name: 'Default (Instruct) Mode', desc: 'Direct prompt completion with full control over the instruction template. Useful when you need to inspect raw model behavior or test custom prompt formats.' },
            { name: 'LoRA Loading', desc: 'Load LoRA adapters on top of base models at runtime — no merging required. Swap LoRAs without reloading the base model. Fine-tune your own LoRA using the built-in Training tab with PEFT.' },
            { name: 'Extensions System', desc: 'Python plugin system — each extension is a folder with script.py. Built-in extensions: Whisper speech-to-text, Stable Diffusion image generation, Silero TTS, long-term memory, translation, and more.' },
            { name: 'OpenAI-Compatible API', desc: 'Runs an HTTP server on localhost:5000 (or configurable port) with /v1/chat/completions and /v1/completions endpoints. Any OpenAI SDK client works by changing base_url. Enables local LLM integration into any existing app.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Installation" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'One-click installer (recommended for beginners)', body: 'Download the repository from github.com/oobabooga/text-generation-webui\nOn Windows: double-click start_windows.bat\nOn Linux/Mac: run ./start_linux.sh or ./start_macos.sh\n\nThe start script automatically downloads Miniconda, creates an isolated conda environment inside the project folder, and installs all dependencies. No manual Python setup required.' },
            { n: '2', title: 'Manual installation (for experienced users)', body: 'git clone https://github.com/oobabooga/text-generation-webui\ncd text-generation-webui\npip install -r requirements.txt\n\nFor GPU support: install the CUDA version of PyTorch separately first. Choose requirements_nvidia.txt, requirements_amd.txt, or requirements_cpu_only.txt instead of requirements.txt.' },
            { n: '3', title: 'Launch the web UI', body: 'python server.py\n\nOr use the start script again after first-time setup. The UI opens at http://localhost:7860 by default. Add --listen to make it accessible on your local network. Add --api to enable the OpenAI-compatible API server.' },
            { n: '4', title: 'Download and load a model', body: 'Option A — Model tab: paste a HuggingFace model ID (e.g. TheBloke/Llama-2-7B-Chat-GGUF) and click Download.\nOption B — Manual: place GGUF files in the /models folder.\n\nAfter downloading, go to the Model tab → select the model → click Load. For GGUF models, the llama.cpp loader is selected automatically.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Loading models and choosing the right loader" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>The loader determines which backend processes the model. Choosing the right loader is the most important configuration decision in oobabooga.</p>
          <Compare color={color} items={[
            { label: 'llama.cpp (GGUF)', badge: 'CPU + GPU hybrid', body: 'Best choice for most users. Works on any hardware — CPU-only, NVIDIA, AMD, Apple Silicon. Set n-gpu-layers to control how many layers run on GPU vs CPU. Start with n-gpu-layers=35 for a 7B model on a GPU with 6GB VRAM. Increase until you hit VRAM limits.' },
            { label: 'ExLlamaV2 (EXL2)', badge: 'NVIDIA GPU only', body: 'Fastest GPU inference. Use for EXL2-format models downloaded from HuggingFace. Requires NVIDIA GPU with CUDA. Memory usage is controlled by the max_seq_len and cache_8bit settings.' },
            { label: 'Transformers (HuggingFace)', badge: 'Full precision', body: 'Loads models directly from HuggingFace format. Use for fine-tuning with LoRA (Training tab). Slowest and highest memory usage. Use load_in_4bit or load_in_8bit to reduce memory at a quality cost.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Extensions — expanding beyond basic chat" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Extensions are Python scripts in the extensions/ folder. Enable them from Session tab → Extensions. Each extension adds a new tab or modifies the UI. The extension system is what makes oobabooga far more capable than a simple chat interface.</p>
          <CardGrid color={color} items={[
            { name: 'openai (API server)', desc: 'Enables the OpenAI-compatible REST API. Start with --extensions openai --api. Exposes /v1/chat/completions and /v1/completions on port 5000. Works with LangChain, AutoGen, any OpenAI SDK client.' },
            { name: 'whisper_stt', desc: 'Speech-to-text input using OpenAI Whisper (running locally). Speak into your microphone instead of typing. Whisper transcribes locally — no API key, completely private voice input.' },
            { name: 'sd_api_pictures', desc: 'Connects to a running Automatic1111 Stable Diffusion WebUI. The model can respond with generated images — ask for a picture and it generates one. Requires a separate SD WebUI instance running on localhost.' },
            { name: 'silero_tts', desc: 'Text-to-speech using the Silero models (runs locally). Model responses are read aloud. Multiple voice options. No API key required — all TTS inference happens on your machine.' },
            { name: 'long_term_memory', desc: 'Adds persistent memory across conversations using a local vector store. The bot "remembers" previous conversations. Useful for building persistent AI companions or assistants with memory.' },
            { name: 'translate', desc: 'Automatic input/output translation via Google Translate. Interact with the model in your native language even if the model was trained primarily in English. Useful for multilingual applications.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="OpenAI-compatible API server" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>The built-in API server makes oobabooga a drop-in replacement for the OpenAI API in any project. Launch with <code className="tool-inline-code">python server.py --api</code> and the following endpoints are available at localhost:5000:</p>
          <Steps color={color} items={[
            { n: '1', title: 'Enable the API', body: 'python server.py --api --api-port 5000 --extensions openai\n\nOptionally add --listen to expose on your network. Add --api-key yourkey to require authentication.' },
            { n: '2', title: 'Use with Python (OpenAI SDK)', body: "from openai import OpenAI\nclient = OpenAI(\n    base_url='http://localhost:5000/v1',\n    api_key='none'  # required field, ignored unless --api-key set\n)\nresponse = client.chat.completions.create(\n    model='loaded-model',  # any string works — uses currently loaded model\n    messages=[{'role': 'user', 'content': 'Hello!'}]\n)\nprint(response.choices[0].message.content)" },
            { n: '3', title: 'Use with LangChain', body: "from langchain_openai import ChatOpenAI\nllm = ChatOpenAI(\n    base_url='http://localhost:5000/v1',\n    api_key='none',\n    model='loaded-model'\n)\n# Drop-in for any LangChain chain, RAG pipeline, or agent" },
            { n: '4', title: 'Streaming support', body: "stream = client.chat.completions.create(\n    model='loaded-model',\n    messages=[{'role': 'user', 'content': 'Write a short story'}],\n    stream=True\n)\nfor chunk in stream:\n    print(chunk.choices[0].delta.content or '', end='', flush=True)\n\nFull streaming support — tokens print as they are generated." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Oobabooga vs Ollama vs LM Studio" color={color} />
          <Compare color={color} items={[
            { label: 'Ollama', badge: 'Easiest to start', body: 'One command to install, one command to run a model. Manages everything automatically. OpenAI-compatible API out of the box. Best for: beginners, developers who want local inference with minimal setup, dropping into existing projects. Limitation: fewer configuration knobs, limited UI, no extensions, no character cards.' },
            { label: 'LM Studio', badge: 'Best desktop experience', body: 'Polished GUI desktop app. Browse and download models visually. Good for exploring models without code. Best for: non-technical users, model discovery, quick experiments. Limitation: closed source, less control than oobabooga, not ideal for server/API use cases.' },
            { label: 'text-generation-webui', badge: 'Maximum control', body: 'Every parameter exposed. All model formats supported. Extensions for voice, images, memory, TTS. LoRA training built in. API server included. Best for: power users, researchers, developers who need full control, anyone building specialized local AI applications. Limitation: steeper learning curve, more complex setup, Gradio UI feels less polished than LM Studio.' },
          ]} />
        </Block>
        <ProjectTask
        title={"Build a Local Persona Chatbot with Voice Input"}
        description={"Use text-generation-webui to build a custom AI persona chatbot with speech-to-text input, then expose it via the OpenAI-compatible API and build a simple Python client that calls it. You will experience the full power-user workflow: install, load a GGUF model, enable the whisper_stt extension, define a character card, launch the API server, and call it from Python. All 100% local, 100% free."}
        costNote={"TOTAL COST: ₹0 — oobabooga is free, models are free from HuggingFace, all inference is local"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Install and launch', body: 'Clone the repo and run start_windows.bat (or the script for your OS). Wait for the one-click installer to finish. Open http://localhost:7860. Go to Model tab → download TheBloke/Mistral-7B-Instruct-v0.2-GGUF. Select the Q4_K_M file (best quality/size balance for 7B). Load it.' },
            { n: '2', title: 'Enable extensions', body: 'Session tab → Extensions → check openai and whisper_stt → Apply and restart. The API is now live on port 5000. The chat interface now has a microphone button for voice input.' },
            { n: '3', title: 'Create a character card', body: "Character tab → New character.\nName: Aria\nContext: You are Aria, a helpful AI tutor who explains technical concepts in simple terms using relatable analogies. You are patient, encouraging, and never condescending.\nGreeting: Hi! I'm Aria. What concept would you like to explore today?\nSave the character." },
            { n: '4', title: 'Call via Python API', body: "pip install openai\nfrom openai import OpenAI\nclient = OpenAI(base_url='http://localhost:5000/v1', api_key='none')\nwhile True:\n    q = input('You: ')\n    r = client.chat.completions.create(\n        model='Aria',\n        messages=[{'role':'user','content':q}]\n    )\n    print('Aria:', r.choices[0].message.content)" },
          ]} />
      </ProjectTask>
        <ProTip>
        The Q4_K_M quantization level is the sweet spot for GGUF models. "Q4" means 4-bit quantization. "K_M" refers to the k-quant method (better quality than standard Q4_0) at medium size. A 7B model at Q4_K_M is around 4.4GB and delivers quality close to Q8 (8-bit) at half the file size. For larger models: Q5_K_M gives noticeably better quality at only 25% more size. Avoid Q2 and Q3 for chat use — quality degradation becomes obvious. Rule of thumb: if you have the disk space, choose Q5_K_M. If you need to fit in limited VRAM, Q4_K_M is the right choice.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/local/lmstudio', label: 'LM Studio' }}
        next={{ path: '/ai-lab/local/litelllm', label: 'LiteLLM' }}
      />
    </ToolPageShell>
  )
}
