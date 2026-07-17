import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#0F172A'

export default function JanPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Local AI">
      <ToolHeader
        icon="🫙"
        title="Jan — Open-Source ChatGPT That Runs Offline"
        tagline="A private, local AI desktop app — download models and chat 100% offline, free forever"
        badges={[['✓ 100% FREE', '#4ADE80'], ['jan.ai', color], ['Open Source (Apache 2.0)', 'var(--text-muted)']]}
        overview={"Jan is a free, open-source desktop application that is a drop-in alternative to ChatGPT — except it runs 100% offline on your own computer. You download the app, pick a model from the built-in Hub (Llama, Gemma, Qwen, DeepSeek, GPT-oss, or Jan's own reasoning model), and chat in a familiar ChatGPT-style interface with nothing leaving your machine. Where Ollama is command-line first, Jan is built for people who want a polished graphical app: a clean chat window, a model browser that shows what will fit your hardware, custom assistants, and settings — no terminal required. Under the hood it uses llama.cpp for fast local inference, is licensed Apache 2.0 (free for personal and commercial use), and ships for Windows, macOS, and Linux. It also includes an OpenAI-compatible local API server at localhost:1337, so developers can point existing code at their local models. For students, Jan means unlimited private AI with no subscription, no API key, and no data ever sent to the cloud."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Jan AI — Run ChatGPT Offline on Your Computer', url: 'https://www.youtube.com/results?search_query=jan+ai+local+chatgpt+tutorial', dur: '~12 min', note: 'Install Jan, download your first model from the Hub, and chat fully offline' },
            { label: 'Jan vs Ollama vs LM Studio — Which Local AI App?', url: 'https://www.youtube.com/results?search_query=jan+vs+ollama+vs+lm+studio', dur: '~15 min', note: 'Compare the main local-AI desktop apps and pick the right one for your machine' },
            { label: 'Using Jan\'s Local API Server (localhost:1337)', url: 'https://www.youtube.com/results?search_query=jan+ai+local+api+server+tutorial', dur: '~10 min', note: 'Point your own code at Jan\'s OpenAI-compatible local endpoint' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why Jan — private, free, and GUI-first" color={color} />
          <InfoBox color={color}>{"Jan gives you the ChatGPT experience without the cloud: everything runs on your hardware, so your conversations and files never leave your computer. There is no subscription, no API key, and no per-message cost — once a model is downloaded, you can use it unlimited times, even with no internet. Because it is Apache 2.0 open source, you can inspect the code, trust what it does with your data, and even use it commercially. It is the friendliest on-ramp to local AI for anyone who prefers a real app over the command line."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Jan is a great fit for students because it is genuinely free and works on ordinary laptops. A few things worth knowing before you start:</p>
          {[
            'Runs 100% offline — after downloading a model, no internet is needed and nothing is sent to any server',
            'Free forever, Apache 2.0 licensed — no account required, no paywall, source code on GitHub (janhq/jan)',
            'GUI-first — a ChatGPT-style app, no terminal needed; the Hub shows which models fit your RAM before you download',
            'Runs on modest hardware — 8GB RAM handles small 3B–7B models on CPU; no GPU required (a GPU just makes it faster)',
            'Optional cloud models — you can also plug in OpenAI, Anthropic, Groq, or Mistral API keys and use them in the same app',
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
            { name: 'Local Model Hub', desc: 'Browse and one-click download open models (Llama, Gemma, Qwen, DeepSeek, GPT-oss, Jan\'s own models) from Hugging Face in GGUF format. Jan shows real-time RAM/VRAM requirements so you pick a model that fits.' },
            { name: '100% Offline & Private', desc: 'Inference runs locally via llama.cpp. Your chats and documents stay on your device — no telemetry required, no data collection. Ideal for private notes, personal data, or working without internet.' },
            { name: 'ChatGPT-Style Interface', desc: 'A clean, familiar chat UI with conversation history and model switching. Non-technical users are productive within minutes — no commands, no config files to edit.' },
            { name: 'Custom Assistants', desc: 'Create specialized assistants with their own system prompts and settings — a study tutor, a code helper, a writing editor — and switch between them per conversation.' },
            { name: 'OpenAI-Compatible API', desc: 'Jan runs a local server at localhost:1337 that speaks the OpenAI API format. Point any code that uses the OpenAI SDK at it by changing the base URL — build apps on local models for free.' },
            { name: 'MCP + Cloud Models', desc: 'Model Context Protocol support adds agentic tools (like web search). You can also connect cloud providers (OpenAI, Anthropic, Groq, Mistral) and use local and cloud models side by side in one app.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — install and first chat" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Download Jan', body: 'Go to jan.ai and download the installer for your OS — jan.exe (Windows 10/11), the .dmg (macOS), or .deb/.AppImage (Linux). Install it like any normal desktop app. It is free and needs no account.' },
            { n: '2', title: 'Open the Hub and pick a model', body: 'Open Jan → go to the Hub tab. Start small: try Jan\'s own model (~2.5GB) or a recommended 7B GGUF like Llama 3.1 8B (Q4). Jan shows whether it fits your RAM — choose one it recommends for your machine.' },
            { n: '3', title: 'Download the model', body: 'Click Download. This is the only step that needs internet — the model file (a few GB) downloads once and is stored locally. After this you can go fully offline.' },
            { n: '4', title: 'Start chatting', body: 'Click "New Chat", select your downloaded model, and type. Everything runs on your computer. Try a question, ask for code, or paste text to summarize — no internet, no cost, no limits.' },
            { n: '5', title: 'Tune for your hardware', body: 'If replies are slow, use a smaller model or a lower quantization (Q4). If you have a good GPU, enable GPU acceleration in Settings and try a larger model (13B+) at higher quality (Q6/Q8).' },
            { n: '6', title: 'Optional — enable the local API', body: 'In Settings, start the local API server (localhost:1337). Now your Python/JS code can call your local model using the OpenAI SDK — just set base_url to http://localhost:1337/v1.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Jan vs Ollama vs LM Studio" color={color} />
          <Compare color={color} items={[
            { label: 'Jan', badge: 'Open source + polished GUI', body: 'A ChatGPT-style desktop app that is fully open source (Apache 2.0) and offline-first, with a model Hub, custom assistants, MCP tools, and an OpenAI-compatible API. Best when you want a friendly, private app you can also inspect and trust.' },
            { label: 'Ollama', badge: 'CLI-first & developer-friendly', body: 'Command-line tool for pulling and running models, with a local REST API popular for building apps and integrating with LangChain/CrewAI. Best when you are comfortable in the terminal and want the standard local-model backend for code.' },
            { label: 'LM Studio', badge: 'GUI, closed source', body: 'A polished desktop app for browsing, downloading, and running models with a built-in local server. Feature-rich and beginner-friendly, but not open source. Best if you want a rich GUI and do not mind that the app itself is proprietary.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Using Jan's local API with Python" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Because Jan exposes an OpenAI-compatible endpoint, any code written for the OpenAI SDK works with your local model — just change the base URL. This lets you build and test AI features for free, offline, with no API bills.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Start the local server', body: 'In Jan → Settings, enable the local API server. It runs at http://localhost:1337. Make sure the model you want to call is downloaded and selected.' },
            { n: '2', title: 'Install the OpenAI SDK', body: 'pip install openai\nNo special Jan SDK is needed — the standard OpenAI client works because Jan mimics the OpenAI API format.' },
            { n: '3', title: 'Point the client at Jan', body: "from openai import OpenAI\nclient = OpenAI(\n    base_url='http://localhost:1337/v1',\n    api_key='jan'  # required field, ignored locally\n)" },
            { n: '4', title: 'Call your local model', body: "resp = client.chat.completions.create(\n    model='<your-model-name>',\n    messages=[{'role': 'user', 'content': 'Explain overfitting simply'}]\n)\nprint(resp.choices[0].message.content)\nIdentical to OpenAI code — just local, free, and offline." },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Build a Private Offline Study Assistant</span></div>
          <p className="tool-layout-task__desc">Set up Jan as a personal, fully offline study tutor and coding helper that costs nothing and keeps your data private. You will install Jan, run a local model, create a custom assistant, and (optionally) call it from your own code. This proves you can run capable AI with zero cloud dependency — perfect for exam prep on flaky internet.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Install Jan and a model', body: 'Download Jan from jan.ai. In the Hub, download a recommended 7B GGUF model (or Jan\'s own model on a low-RAM laptop). Confirm it runs by starting a chat offline (disconnect your Wi-Fi to prove it).' },
            { n: '2', title: 'Create a "Study Tutor" assistant', body: 'Make a custom assistant with a system prompt like: "You are a patient tutor for engineering students. Explain concepts step by step, give examples, and quiz me at the end." Save it and use it for a topic you are studying.' },
            { n: '3', title: 'Create a "Code Helper" assistant', body: 'Add a second assistant tuned for coding: "You are a concise coding assistant. Explain code, find bugs, and suggest fixes with short examples." Switch between tutor and coder per conversation.' },
            { n: '4', title: 'Test it offline', body: 'With the internet off, ask 10 real questions from your coursework — some conceptual, some coding. Note where the local model shines and where a bigger cloud model would do better. Adjust model size/quantization for speed.' },
            { n: '5', title: 'Optional — call it from code', body: 'Enable the local API server (localhost:1337) and write a short Python script using the OpenAI SDK that asks your local model to summarize your lecture notes from a text file. A free, offline mini-app.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">TOTAL COST: ₹0 — Jan is free and open source; models run locally with no API key or subscription</span></div>
        </div>
        <ProTip>
        Match the model to your machine, then tune quantization for the sweet spot. The most common beginner frustration with any local AI app is picking a model that is too big — it either fails to load or runs painfully slowly. Trust Jan's Hub recommendations: on an 8GB-RAM laptop stick to 3B–7B models at Q4 quantization; with 16GB you can comfortably run 7B–13B; and only reach for 13B+ at Q6/Q8 if you have a dedicated GPU. The "Q4/Q6/Q8" number is the precision — Q4 is smallest and fastest with barely noticeable quality loss for most tasks, while Q8 is larger but sharper. Start at Q4, and only move up if you have RAM/VRAM to spare and need better answers.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/local/localai', label: 'LocalAI' }}
        next={{ path: '/ai-lab/local/ollama', label: 'Ollama' }}
      />
    </ToolPageShell>
  )
}
