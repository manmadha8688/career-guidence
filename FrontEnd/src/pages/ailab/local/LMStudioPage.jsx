import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#6366F1'

export default function LMStudioPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Local AI">
      <ToolHeader
        icon="🖥️"
        title="LM Studio — Desktop App for Running Local AI Models"
        tagline="A beautiful UI to discover, download, and chat with any local model"
        badges={[['✓ FREE', '#4ADE80'], ['Windows / Mac / Linux', color], ['No code needed', 'var(--text-muted)']]}
        overview={"LM Studio is a desktop application that gives you a polished GUI for downloading and running local AI models — think of it as the App Store + ChatGPT interface combined, but for running models on your own hardware. Browse thousands of models from Hugging Face directly in the app, download with one click, chat through a clean interface, and run a local server with an OpenAI-compatible API. Where Ollama is primarily a CLI and API tool optimized for developers, LM Studio is designed for anyone — no command line required. For students who prefer a visual, application-based experience for running local models, LM Studio is the most polished option available."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'LM Studio Tutorial & Review — The Best Way to Run AI Locally', url: 'https://www.youtube.com/watch?v=V5Qap-SNyLU', dur: '~20 min', note: 'Full review + tutorial — model browser, chat, local server explained' },
            { label: 'Run Any AI Model Locally with LM Studio: Full Guide (Coding & Chat)', url: 'https://www.youtube.com/watch?v=PJZD3DbViH8', dur: '~25 min', note: 'Coding + chat use cases — API setup and VS Code integration' },
            { label: 'LM Studio Is Getting Insane — Start Using It Now', url: 'https://www.youtube.com/watch?v=OOCioZC4tk0', dur: '~15 min', note: 'Latest features 2025 — what is new and why it matters' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What LM Studio offers" color={color} />
          <InfoBox color={color}>LM Studio has three main views: Discover (browse and download models from Hugging Face), Chat (full conversation interface with model switching, system prompts, conversation history), and Local Server (run an OpenAI-compatible server so any application can use your local model as if it were the OpenAI API). All three work together — download a model in Discover, chat with it, and serve it to your applications.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The model discovery interface is LM Studio's standout feature. It connects directly to Hugging Face, shows model cards, ratings, memory requirements, and download sizes. You can search for models by capability (coding, instruction, chat, multilingual), filter by size to match your RAM, and read community reviews — all without leaving the app. This makes finding the right model for your hardware trivially easy compared to researching on Hugging Face manually.</p>
        </Block>
        <Block>
          <SubHead label="Key features" color={color} />
          <CardGrid color={color} items={[
            { name: 'Model discovery', desc: 'Browse Hugging Face models directly in the app. Filter by task, size, architecture. See memory requirements. Download with one click. No command line needed.' },
            { name: 'Chat interface', desc: 'Full conversation interface: system prompt editor, temperature control, conversation history, model switching. Comparable to ChatGPT in functionality.' },
            { name: 'Local server', desc: 'Start an OpenAI-compatible server on localhost:1234. Any application using the OpenAI SDK works with your local models — just change the base_url.' },
            { name: 'Model management', desc: 'See all downloaded models, their sizes, and memory usage. Delete models you no longer need. Track total disk usage. Simple management UI.' },
            { name: 'Prompt templates', desc: 'LM Studio applies the correct prompt template for each model automatically (Llama chat format, Mistral format, etc.). Getting prompt templates wrong produces degraded outputs — LM Studio handles this for you.' },
            { name: 'Hardware acceleration', desc: 'Automatically uses GPU acceleration if available (CUDA for NVIDIA, Metal for Apple Silicon). Shows memory usage split between CPU RAM and GPU VRAM. Optimizes inference for your hardware.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Setting up and running your first model" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Download LM Studio', body: 'lmstudio.ai → download for your OS. Install like any desktop app. Launches to a clean dashboard showing your system specs and recommended models for your hardware.' },
            { n: '2', title: 'Find a model to download', body: 'Click Discover tab. Browse or search. Recommended starting models: Llama-3.1-8B-Instruct (general use), Phi-3-mini-4k-instruct (low RAM), Mistral-7B-Instruct (coding). Click Download.' },
            { n: '3', title: 'Start a chat', body: 'Click the Chat tab (speech bubble icon). Select your downloaded model from the dropdown. Configure the system prompt if desired. Start chatting. All runs locally, instantly.' },
            { n: '4', title: 'Adjust generation settings', body: 'Temperature (0 = deterministic, 1 = creative), Context Length (how much conversation history), GPU Layers (how many layers to offload to GPU). Start with defaults and adjust if quality or speed is not what you expect.' },
            { n: '5', title: 'Start the local server', body: "Click the Server tab (➤ icon). Choose a model. Click Start Server. The server runs on localhost:1234 with an OpenAI-compatible API. Use base_url='http://localhost:1234/v1' in any OpenAI SDK application." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Using LM Studio's server in your code" color={color} />
          <InfoBox color={color}>LM Studio's local server exposes the same endpoints as the OpenAI API — /v1/chat/completions, /v1/completions, /v1/embeddings. Any existing code using the OpenAI SDK connects to your local model by changing two values: the base URL and the model name. No other code changes required.</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Connect with OpenAI SDK', body: "from openai import OpenAI\nclient = OpenAI(\n    base_url='http://localhost:1234/v1',\n    api_key='lm-studio'  # any string, ignored locally\n)\nresponse = client.chat.completions.create(\n    model='local-model',  # LM Studio accepts any string here\n    messages=[{'role': 'user', 'content': 'Hello'}]\n)" },
            { n: '2', title: 'Integrate with LangChain', body: "from langchain_openai import ChatOpenAI\nllm = ChatOpenAI(\n    base_url='http://localhost:1234/v1',\n    api_key='lm-studio',\n    model='local-model'\n)\nDrop-in replacement for ChatOpenAI in any LangChain chain." },
            { n: '3', title: 'Test with curl', body: 'curl http://localhost:1234/v1/chat/completions -H \'Content-Type: application/json\' -d \'{"messages": [{"role": "user", "content": "Hello"}], "temperature": 0.7}\'\nFastest way to verify the server is working before writing code.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="LM Studio vs Ollama" color={color} />
          <Compare color={color} items={[
            { label: 'User interface', badge: 'LM Studio wins', body: 'LM Studio: polished desktop app with GUI, model browser, chat interface. Ollama: command-line tool and REST API. For non-developers or anyone who prefers visual tools, LM Studio is significantly more accessible.' },
            { label: 'Developer integration', badge: 'Ollama slightly easier', body: "Both expose OpenAI-compatible APIs. Ollama's CLI (ollama pull, ollama run) integrates more naturally into developer workflows. LM Studio requires the GUI to be running. For server deployment, Ollama is the standard choice." },
            { label: 'Model selection', badge: 'LM Studio broader', body: "LM Studio connects to all of Hugging Face. Ollama has a curated model library (~200 models). For accessing niche, specialized, or newly released models not yet in Ollama's library, LM Studio gives broader access." },
            { label: 'Use together?', badge: 'Yes — complementary', body: 'Many developers use both. LM Studio to discover and evaluate models (better browsing UI), Ollama for consistent CLI/API usage in development. Download in LM Studio to assess quality, then use Ollama for the actual development workflow.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Download and run any model from Hugging Face on your computer through a visual app with no command line',
            'Chat with local AI models through a polished interface comparable to ChatGPT — completely offline',
            'Run a local OpenAI-compatible server so any application uses your local model with zero code changes',
            'Compare different models side-by-side in the same chat interface to find the best one for your needs',
            'Develop and test AI features on your laptop for free before connecting to paid cloud APIs',
        ]} />
      </Block>
        <ProjectTask
        title={"Model Evaluation"}
        description={"Download 3 different models in LM Studio (try: Llama 3.1 8B, Phi-3 Mini, and Mistral 7B or another model your hardware can run). Ask all 3 the same 10 questions covering different domains: a coding task, an explanation task, a creative writing task, a math word problem, and a reasoning task. Score each response 1-5 for quality. At the end, you'll have a personal benchmark that matches your actual use cases — more useful than any public leaderboard."}
        costNote={"TOTAL COST: ₹0 — LM Studio is free, all models run on your hardware"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Download 3 models', body: "Use LM Studio's Discover tab to find and download 3 models within your RAM budget. Check the memory requirement badge before downloading — it shows exact RAM needed." },
            { n: '2', title: 'Write your 10 test prompts', body: 'Write prompts you would actually use: debug this Python error, explain this algorithm, write a function that does X, solve this word problem. Your real use cases, not generic benchmarks.' },
            { n: '3', title: 'Run all prompts through all models', body: 'Switch models between conversations. Keep responses in separate text files or a spreadsheet. Score each immediately while it is fresh — harder to score accurately after the fact.' },
            { n: '4', title: 'Pick your daily driver', body: 'Which model scored highest on the tasks you care about? That is your default model for local development. Revisit this benchmark when new model releases appear.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Pay attention to the 'context length' setting in LM Studio. Default is often 2048 tokens — about 1500 words. For conversations, document analysis, or code review, you typically want 4096-8192 tokens of context. Check the model's supported context length (shown in the model card) and increase the context length in LM Studio's generation settings. Many users get worse results than a model is capable of simply because the context window is too small.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/local/ollama', label: 'Ollama' }}
        next={{ path: '/ai-lab/vector/chromadb', label: 'ChromaDB' }}
      />
    </ToolPageShell>
  )
}
