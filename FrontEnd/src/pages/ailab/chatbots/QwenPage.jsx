import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#615CED'

export default function QwenPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Chatbots">
      <ToolHeader
        icon="💠"
        title="Qwen — Alibaba's Open-Weight Powerhouse"
        tagline="A free assistant plus one of the world's most-downloaded open model families"
        badges={[['✓ FREE CHAT', '#4ADE80'], ['Open Weights (Apache 2.0)', color], ['chat.qwen.ai', 'var(--text-muted)']]}
        overview={"Qwen (from Alibaba Cloud) is two things at once: a free, polished AI assistant you can chat with at chat.qwen.ai — now branded Qwen Studio — and one of the most influential open-weight model families on the planet. The Qwen3 series is released under the permissive Apache 2.0 license, which means anyone can download the weights, run them locally, fine-tune them, and ship commercial products with essentially no strings attached. That openness has made Qwen enormously popular with developers: the family has passed hundreds of millions of downloads and powers tens of thousands of community-built derivative models. Technically, Qwen3 is a 'hybrid reasoning' family — a single model can switch between a fast non-thinking mode for everyday chat and a slower thinking mode for hard maths, coding, and logic. Recent Qwen3 models support very long context (256K tokens, extensible toward 1M in some deployments), speak 100+ languages, and handle text, vision, and tool use. For Indian students, Qwen offers a genuinely free, capable assistant and — uniquely — the ability to run a strong model entirely on your own machine, offline and private."}
      />

      <Block title="Watch first" titleColor="#EF4444">
        {[
          { label: 'Qwen (Qwen Studio) beginner tutorial', url: 'https://www.youtube.com/results?search_query=qwen+chat+tutorial+for+beginners', dur: '', note: 'Search results — pick a recent walkthrough of chat.qwen.ai / Qwen Studio' },
          { label: 'Qwen3 open model explained — thinking vs non-thinking', url: 'https://www.youtube.com/results?search_query=qwen3+model+explained+thinking+mode', dur: '', note: 'Understand hybrid reasoning and when each mode helps' },
          { label: 'Run Qwen locally with Ollama (offline & free)', url: 'https://www.youtube.com/results?search_query=run+qwen+locally+ollama+tutorial', dur: '', note: 'How to download and run Qwen on your own machine for total privacy' },
        ].map((v, i) => <VideoCard key={i} v={v} />)}
      </Block>

      <Block>
        <SubHead label="How Qwen is different — open, multilingual, run-it-yourself" color={color} />
        <InfoBox color={color}>{"Qwen's defining trait is that it is open weight under Apache 2.0 — one of the most permissive licenses in software. Unlike closed chatbots you can only rent through an API, you can download the exact Qwen3 model, run it on your own laptop or server, fine-tune it on your own data, and even build a commercial product on it, all for free. Add strong support for 100+ languages and a hybrid reasoning design that switches between fast and deep thinking, and Qwen becomes the most flexible free option for anyone who wants both a good chatbot and a model they actually control."}</InfoBox>
        <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Most people meet Qwen through its free web assistant, but its real significance is openness. Because the weights are published under Apache 2.0, a student can download a small Qwen3 model (there are sizes from tiny 0.6B up to large mixture-of-experts models), run it offline through a tool like Ollama, and never send a single byte to a company's servers. That is a big deal for privacy, for learning how models actually work, and for building projects that must run without internet. On top of that, Qwen3 is genuinely multilingual — helpful if you work across English and Indian languages — and its hybrid thinking mode lets one model be both a quick chat partner and a careful reasoner.</p>
        {[
          'Open weights (Apache 2.0) — download, run offline, fine-tune, and use commercially for free',
          'Free web assistant at chat.qwen.ai (Qwen Studio) with web search and document tools',
          'Hybrid reasoning — one model switches between fast non-thinking and deep thinking modes',
          'Very long context — recent Qwen3 models handle 256K tokens, extensible toward 1M in some setups',
          'Multilingual — strong support for 100+ languages including many Indian languages',
          'Multimodal & tool use — handles text, vision, and calling external tools/agents',
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
          { name: 'Qwen Studio (Free Chat)', desc: 'The free web and app assistant at chat.qwen.ai, powered by the Qwen3 models. Includes web search, document upload, and coding help — a familiar, easy-to-use interface with no paywall to start.' },
          { name: 'Hybrid Reasoning', desc: 'A single Qwen3 model switches between non-thinking mode (fast, general chat) and thinking mode (step-by-step reasoning for maths, code, and logic). You get speed when you want it and depth when you need it.' },
          { name: 'Open Weights (Apache 2.0)', desc: 'Every open Qwen3 model is Apache 2.0 licensed on Hugging Face and ModelScope. Download, self-host, fine-tune, and ship commercial products with no royalties — the most permissive terms among strong models.' },
          { name: 'Long Context', desc: 'Recent Qwen3-2507 models support a 256K-token context window, extensible toward 1 million tokens in some deployments. Feed in an entire codebase, a long PDF, or a whole set of lecture notes at once.' },
          { name: 'Multilingual & Multimodal', desc: 'Trained across 100+ languages with vision understanding and tool use. Useful for working between English and Indian languages, and for asking questions about images, charts, and screenshots.' },
          { name: 'OpenAI-Compatible API', desc: 'For building, Alibaba Cloud Model Studio serves Qwen with an OpenAI-compatible (and Anthropic-compatible) API, so existing code and tutorials work by changing the base URL and key.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="Getting started — free chat, then run it yourself" color={color} />
        <Steps color={color} items={[
          { n: '1', title: 'Open Qwen Studio', body: 'Go to chat.qwen.ai (Qwen Studio) and sign in — it is free and open to everyone. There are also desktop and mobile apps if you prefer. Start with a normal question to get a feel for it.' },
          { n: '2', title: 'Try both reasoning modes', body: 'Ask an everyday question in the default (fast) mode. Then enable thinking mode and ask a hard maths or coding problem — notice how the model reasons step by step before answering. Use fast for chat, thinking for problems.' },
          { n: '3', title: 'Use web search and Deep Research', body: 'For current information, turn on web search so Qwen pulls in live results with sources. For bigger questions, try the Deep Research / Web Dev tools built into Qwen Studio.' },
          { n: '4', title: 'Upload a long document', body: 'Drop in a big PDF, a research paper, or a code file. Because Qwen3 handles very long context, you can ask questions across an entire document in one session — "summarise", "find the key claims", "explain section 3".' },
          { n: '5', title: 'Install a local Qwen (optional but worth it)', body: 'Install Ollama, then run a command like: ollama pull qwen3 and ollama run qwen3. You now have a capable model running fully offline on your own machine — no internet, no data leaving your laptop, unlimited free use.' },
          { n: '6', title: '(Optional) Get an API key to build', body: 'For apps, sign up on Alibaba Cloud Model Studio and use the OpenAI-compatible endpoint. Or self-host the open weights for zero ongoing cost if you have the hardware.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="Cloud chat vs local model — which route?" color={color} />
        <Compare color={color} items={[
          { label: 'Qwen Studio (free web chat)', badge: 'Easiest start', body: 'Nothing to install — just open chat.qwen.ai and go. Gets you the latest large models, web search, and document tools for free. Best for everyday use and for trying Qwen before you commit to anything heavier.' },
          { label: 'Local via Ollama', badge: '100% free & private — offline', body: 'Download an open Qwen3 model and run it on your own machine with Ollama. Zero API cost, no rate limits, fully offline, and your data never leaves your laptop. Small models (0.6B–8B) run on modest hardware; larger ones need a good GPU.' },
          { label: 'Self-hosted (vLLM / SGLang)', badge: 'For serious deployments', body: 'For a project that needs to serve many requests, deploy the open weights with vLLM or SGLang on a server. More setup, but full control, no per-token bill, and the ability to fine-tune on your own data.' },
          { label: 'Model Studio API', badge: 'Managed & scalable', body: 'Alibaba Cloud Model Studio hosts Qwen behind an OpenAI-compatible API — no infrastructure to manage, pay per use. Best when you want the newest large models without owning GPUs. Check current pricing on the console.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="Qwen vs DeepSeek vs ChatGPT (free) — how to choose" color={color} />
        <Compare color={color} items={[
          { label: 'Openness & running it yourself', badge: 'Qwen & DeepSeek win', body: 'Both Qwen (Apache 2.0) and DeepSeek (MIT) publish open weights you can run offline. Qwen offers the widest range of model sizes — from tiny models that run on a laptop to large MoE models — which makes it the most flexible for local use. ChatGPT is closed and API-only.' },
          { label: 'Model size choice', badge: 'Qwen edge', body: 'Qwen ships everything from 0.6B up to huge MoE models, so you can match the model to your hardware. Need something that runs on a modest laptop? Qwen has it. This granularity is rare among strong model families.' },
          { label: 'Multilingual work', badge: 'Qwen strong', body: 'Qwen\'s 100+ language support is a genuine strength for students working across English and Indian languages, translation tasks, or non-English content. All three handle English well; Qwen is a safe bet for multilingual tasks.' },
          { label: 'Ecosystem & polish', badge: 'ChatGPT broader', body: 'ChatGPT still leads on voice, image generation, Custom GPTs, and integrations. Qwen Studio is clean and capable but more focused. Use ChatGPT for range and polish, Qwen for openness, model choice, and multilingual reach.' },
          { label: 'Reasoning transparency', badge: 'DeepSeek & Qwen', body: 'Both Qwen (thinking mode) and DeepSeek (R1) can show step-by-step reasoning. If your priority is watching a model work through hard problems to learn the method, either is a strong free choice.' },
        ]} />
      </Block>

      <div className="tool-layout-task">
        <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Run a Strong AI Model on Your Own Laptop</span></div>
        <p className="tool-layout-task__desc">Use Qwen&apos;s open weights to get a capable AI running fully offline on your machine, then compare it to the cloud version. This teaches you the single most empowering AI skill for a student: you do not always need someone else&apos;s server or subscription to use real AI.</p>
        <Steps color={color} items={[
          { n: '1', title: 'Install Ollama', body: 'Download Ollama for your OS from its site and install it. It is a tiny tool that makes running open models a one-line command. Verify it works by opening a terminal and running: ollama --version.' },
          { n: '2', title: 'Pull a Qwen model that fits your machine', body: 'Start small: run ollama pull qwen3 (or a small size like the 4B/8B variant). Smaller models download faster and run on modest hardware; pick a bigger one only if you have a good GPU and RAM.' },
          { n: '3', title: 'Chat with it offline', body: 'Run ollama run qwen3. Now turn off your Wi-Fi and keep chatting — the model runs entirely on your laptop. Ask it to explain a concept or write a small function. Notice: nothing is leaving your machine.' },
          { n: '4', title: 'Compare local vs Qwen Studio', body: 'Ask the same question to your local model and to the large model on chat.qwen.ai. Compare answer quality and speed. The cloud model will usually be smarter; the local one is private, free, and offline.' },
          { n: '5', title: 'Wire it into code', body: 'Ollama exposes an OpenAI-compatible endpoint at localhost. Using Python and the openai library, point base_url at http://localhost:11434/v1 and send a prompt. You just called a local LLM from your own program.' },
          { n: '6', title: 'Reflect on the trade-offs', body: 'Write three sentences: when would you use the free local model (privacy, offline, unlimited), and when would you use the cloud model or a paid API (hardest problems, biggest context)? This judgement is the real skill.' },
        ]} />
        <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — Qwen Studio chat and the open-weight local models are both ₹0; the only cost is your laptop&apos;s compute and download bandwidth</span></div>
      </div>

      <ProTip>
        {"Qwen's superpower for students is that you can run it yourself — so learn to do that early. Chatting on chat.qwen.ai is great, but the moment you pull a Qwen3 model with Ollama and watch it answer with your Wi-Fi switched off, AI stops feeling like a magic cloud service you rent and starts feeling like a tool you own. Keep a small local Qwen model on your laptop for private work, offline study sessions, and unlimited experimentation, and save the big cloud model for the hardest problems. Knowing both routes — and when to use each — is what separates a casual user from someone who genuinely understands the technology."}
      </ProTip>

      <PageNavRow
        prev={{ path: '/ai-lab/chatbots/grok', label: 'Grok' }}
        next={{ path: '/ai-lab/chatbots/kimi', label: 'Kimi' }}
      />
    </ToolPageShell>
  )
}
