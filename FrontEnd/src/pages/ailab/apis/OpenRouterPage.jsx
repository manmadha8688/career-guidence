import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#6366F1'

export default function OpenRouterPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="APIs">
      <ToolHeader
        icon="🛣️"
        title="OpenRouter — One API Key for 200+ AI Models"
        tagline="Switch between any LLM with one line of code — including free models"
        badges={[['✓ FREE Models', '#4ADE80'], ['openrouter.ai', color], ['200+ Models', 'var(--text-muted)']]}
        overview={"OpenRouter is not an AI model company — it is a routing layer. Think of it as a travel aggregator for AI models: instead of buying direct from one airline, you book through one platform that connects to hundreds of routes. OpenRouter gives you a single API endpoint, a single API key, and a single billing account that grants access to 500+ models from 60+ providers — GPT-4o, Claude Sonnet, Llama 4, Gemini, Mistral, Qwen, DeepSeek, and dozens more. The API is 100% OpenAI-compatible, meaning any code that runs against OpenAI's API runs against OpenRouter by changing one line: the base URL. What makes this genuinely powerful for students and developers is the breadth of free models available with no credit card, the ability to compare and switch models with a single parameter change, and automatic fallback routing if a provider has downtime. You stop thinking about which provider to use and start thinking about which model fits your task."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'How to Access EVERY AI Model with ONE API Key (OpenRouter Tutorial)', url: 'https://www.youtube.com/watch?v=JYw6yFzVi44', dur: '~10 min', note: 'Complete walkthrough — API key setup, model switching, free models' },
            { label: 'How to Use OpenRouter AI — Free LLM Models, Pricing & API Key Tutorial', url: 'https://www.youtube.com/watch?v=OkMep9yQICM', dur: '~15 min', note: 'Registration, free vs paid models, API key, Postman REST demo' },
            { label: 'How to use OpenRouter API with JavaScript Node.js Tutorial', url: 'https://www.youtube.com/watch?v=lSwoy6ZHIWw', dur: '~12 min', note: 'Real code — Node.js integration with model switching' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How the routing concept works" color={color} />
          <InfoBox color={color}>OpenRouter sits between your application and every AI provider. Your request goes to one endpoint (openrouter.ai/api/v1/chat/completions), and OpenRouter routes it to whichever model and provider you specify in the model parameter. The providers — OpenAI, Anthropic, Google, Meta, Mistral — never see your application code. OpenRouter normalises their different API formats into a single OpenAI-compatible response shape, so you write the integration once and it works across every model.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '0.875rem'}}>The routing layer adds one small overhead: approximately 50-150ms of additional latency on each request, and a 5.5% markup on credits for paid models. For most use cases this is imperceptible and the cost is easily offset by not needing separate API keys, accounts, and billing for each provider.</p>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The real power emerges when you use routing features: set a list of fallback models so your app keeps working even if OpenAI has downtime. Set cost limits per request. Route between a cheap fast model for simple tasks and an expensive powerful model only when needed. These patterns would require significant engineering work with direct provider APIs. With OpenRouter they are configuration options.</p>
        </Block>
        <Block>
          <SubHead label="Free models available right now" color={color} />
          <CardGrid color={color} items={[
            { name: 'Meta Llama 4 Scout :free', desc: 'Meta\'s newest open-source model. Strong reasoning and instruction following at zero cost. Model ID: meta-llama/llama-4-scout:free — rate limit 20 req/min, 200 req/day.' },
            { name: 'Meta Llama 4 Maverick :free', desc: 'Larger Llama 4 variant. Better for complex tasks, longer reasoning chains. Free tier with the same 200 requests/day limit. Solid GPT-3.5-class quality at no cost.' },
            { name: 'Google Gemma 3 27B :free', desc: 'Google\'s best open Gemma variant available free. Excellent instruction following and safe outputs. Model ID: google/gemma-3-27b-it:free. Also available: 12B and 4B variants.' },
            { name: 'Qwen3 Coder :free', desc: 'Strongest free coding model on OpenRouter. 1M token context window — entire codebases fit in one call. From Alibaba\'s Qwen team. Best free choice for code generation tasks.' },
            { name: 'DeepSeek V4 Flash :free', desc: 'DeepSeek\'s fast reasoning model available free. Excellent for reasoning-heavy coding tasks and math. Chinese open-source model that competes with top Western models on benchmarks.' },
            { name: 'Free Models Router', desc: 'Model ID: openrouter/auto — OpenRouter automatically picks an appropriate free model for each request. Use this when you just want something that works and do not care which specific model answers.' },
          ]} />
          <div className="tool-success-note">
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#4ADE80', letterSpacing: '0.08em' }}>FREE TIER LIMITS: 20 requests/minute · 200 requests/day · No credit card · No hidden fees · Models have :free suffix in the ID</span>
          </div>
        </Block>
        <Block>
          <SubHead label="Getting started — change two lines" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Create a free account and get your API key', body: 'Go to openrouter.ai → Sign up (no credit card needed for free models) → Keys → Create key. Copy the key — it starts with sk-or-v1-. Free models work immediately with zero balance.' },
            { n: '2', title: 'Install the OpenAI SDK (you already know it)', body: "pip install openai (Python) or npm install openai (Node.js). OpenRouter is fully OpenAI-compatible — you use the exact same SDK. No separate openrouter package needed." },
            { n: '3', title: 'Change the base URL and model — that is the entire migration', body: "from openai import OpenAI\nclient = OpenAI(\n  base_url='https://openrouter.ai/api/v1',\n  api_key='sk-or-v1-your_key_here'\n)\nresponse = client.chat.completions.create(\n  model='meta-llama/llama-4-scout:free',\n  messages=[{'role': 'user', 'content': 'Hello!'}]\n)\nprint(response.choices[0].message.content)" },
            { n: '4', title: 'Switch models by changing one parameter', body: "To use Claude instead: model='anthropic/claude-3.5-sonnet'\nTo use Gemini: model='google/gemini-2.0-flash-001'\nTo use GPT-4o: model='openai/gpt-4o'\nEvery other line of code stays identical. This is the core value — experiment with any model without rewriting your integration." },
            { n: '5', title: 'Add fallback routing for reliability', body: "Pass a list of models: OpenRouter tries the first, falls back to the next if unavailable. In the extra_body param: extra_body={'models': ['openai/gpt-4o', 'anthropic/claude-3.5-sonnet', 'meta-llama/llama-4-scout:free']}. Your app never goes down because one provider had outage." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Model comparison on openrouter.ai" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '0.875rem'}}>The openrouter.ai website is one of the most useful model comparison tools available anywhere — better than most third-party benchmarking sites because it shows real production pricing and live data. Go to openrouter.ai/models to see every model with its current price per million tokens for input and output, context window size, latency benchmarks, and provider availability.</p>
          <CardGrid color={color} items={[
            { name: 'Price comparison table', desc: 'Side-by-side pricing for all 500+ models. Sort by price to find the cheapest capable model for your task. Filter by free-only to see what costs nothing. Prices update in real time as providers change their rates.' },
            { name: 'Context window filter', desc: 'Filter models by context window size — 8K, 32K, 128K, 1M tokens. Critical when working with large documents or long code files. Some models like Qwen3 Coder offer 1M context even on the free tier.' },
            { name: 'Speed benchmarks', desc: 'Tokens per second (throughput) and time-to-first-token (latency) for each model. For chatbot applications, time-to-first-token matters more than throughput. OpenRouter shows both metrics across providers.' },
            { name: 'Model arena / rankings', desc: 'openrouter.ai/rankings shows model performance rankings across categories: coding, reasoning, math, creative writing. Based on actual usage patterns rather than just benchmark scores. Useful for picking the right model per task type.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="OpenRouter vs direct provider APIs" color={color} />
          <Compare color={color} items={[
            { label: 'Setup complexity', badge: 'OpenRouter wins clearly', body: 'Direct APIs: one account, one key, one SDK, one billing account per provider. If you use OpenAI + Anthropic + Google = 3 accounts, 3 keys, 3 billing setups, 3 different SDKs. OpenRouter: one account, one key, one SDK for all of them. For prototyping and experimentation this is a significant time saving.' },
            { label: 'Cost per token', badge: 'Direct API is slightly cheaper', body: 'OpenRouter charges a 5.5% markup on credits for paid models — you pay $1.055 for $1 worth of tokens. At low to moderate usage this is worth the convenience. At high production scale (millions of tokens/day), direct APIs save meaningful money. For learning and building: the 5.5% is irrelevant.' },
            { label: 'Free tier access', badge: 'OpenRouter wins significantly', body: 'Most direct provider APIs require a credit card and paid plan to access their models. OpenRouter offers 20+ free models with 200 requests/day, no credit card required. For students building projects, this is the biggest practical difference — real models at zero cost.' },
            { label: 'Model switching speed', badge: 'OpenRouter wins by design', body: 'Switching from GPT-4o to Claude on direct APIs requires rewriting your integration — different SDK, different auth, different response parsing. On OpenRouter: change one line. For A/B testing models or finding the best model for a task, this speed is transformative.' },
            { label: 'Rate limits', badge: 'Direct API often higher', body: 'Direct provider accounts — especially paid ones — typically have higher rate limits than going through OpenRouter, which applies its own limits on top of provider limits. For high-throughput production workloads, direct API gives you more headroom to negotiate limit increases.' },
            { label: 'Provider-specific features', badge: 'Direct API wins for advanced use', body: 'Some providers offer unique features only through their direct API: Anthropic\'s prompt caching, OpenAI\'s Assistants API with file storage, Google\'s grounding with Search. These features are not available through the OpenRouter routing layer. Use direct API when you need provider-specific capabilities.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="When OpenRouter is the right choice" color={color} />
          <CardGrid color={color} items={[
            { name: 'Prototyping and experimentation', desc: 'You want to test 5 different models on your task and pick the best one. With OpenRouter: write the code once, loop through model names, compare outputs. What would take days with direct APIs takes an afternoon.' },
            { name: 'Cost optimization routing', desc: 'Route simple questions to a cheap fast model (Llama 4 Scout at $0.03/M tokens) and complex reasoning tasks to a premium model (Claude 3.5 Sonnet at $3/M tokens). Same codebase, automatic cost management.' },
            { name: 'High-availability production apps', desc: 'Set up fallback chains: try OpenAI first, fall back to Anthropic, fall back to free Llama if both are down. Your app maintains uptime across provider outages. One configuration, no custom failover logic to write.' },
            { name: 'Access models not on your platform', desc: "OpenRouter hosts models that many platforms don't offer — DeepSeek, Qwen, Yi, Nous Hermes, various Mistral variants. If you want to use a specific open-source or Chinese model that OpenAI and Anthropic don't offer, OpenRouter often has it." },
            { name: 'Zero-cost learning projects', desc: 'Build your portfolio project with real AI models at zero cost. Free Llama 4 or Gemma 3 models on OpenRouter are capable enough to build meaningful applications. Impress interviewers with a real product that runs on production-quality models.' },
            { name: 'Multi-model comparison tools', desc: 'Build a tool that sends the same prompt to GPT-4o, Claude, Gemini, and Llama simultaneously and displays all responses side by side. Only possible with OpenRouter\'s unified interface — building this with direct APIs would take weeks.' },
          ]} />
        </Block>
        <ProjectTask
        title={"Build a Model Comparison Tool"}
        description={"Build a web app or CLI that sends the same prompt to 3 different free models via OpenRouter simultaneously and displays their responses side by side. This project demonstrates the core value of OpenRouter — write the integration once, use any model. It also makes a genuinely useful tool: a personal AI model comparison playground. Focus on: (1) concurrent API calls to all 3 models at once using async, (2) displaying which model responded faster, (3) clean UI that makes responses easy to compare."}
        costNote={"TOTAL COST: ₹0 — All free models, 200 requests/day, no credit card required"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Set up the project', body: 'Create a folder. pip install openai python-dotenv aiohttp (Python) for async calls. Create .env with OPENROUTER_API_KEY=your_key. Create a .gitignore with .env on line 1. All free models, so total cost: zero.' },
            { n: '2', title: 'Build the async multi-model caller', body: "import asyncio\nfrom openai import AsyncOpenAI\n\nclient = AsyncOpenAI(base_url='https://openrouter.ai/api/v1', api_key=os.getenv('OPENROUTER_API_KEY'))\n\nasync def ask_model(model, prompt):\n    r = await client.chat.completions.create(model=model, messages=[{'role':'user','content':prompt}])\n    return model, r.choices[0].message.content\n\nasync def compare(prompt):\n    models = ['meta-llama/llama-4-scout:free', 'google/gemma-3-27b-it:free', 'qwen/qwen3-coder:free']\n    results = await asyncio.gather(*[ask_model(m, prompt) for m in models])\n    return results" },
            { n: '3', title: 'Add response timing', body: "Wrap each ask_model call with time.time() before and after. Track which model responded first, which was slowest. Display response time next to each model name. This makes the comparison genuinely informative — speed vs quality trade-off becomes visible." },
            { n: '4', title: 'Build the display layer', body: 'Print or render responses in columns. For a web version, use Streamlit (3 st.columns, one response per column) for a clean UI in under 30 lines. For CLI: use rich library for coloured panel boxes. The visual side matters — interviewers see your attention to presentation.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Always append :free to the model ID when using free tier models (e.g. meta-llama/llama-4-scout:free not meta-llama/llama-4-scout). Without :free, OpenRouter routes to the paid version and will charge your balance. Check openrouter.ai/models, filter by "Free", and copy the exact model ID shown — it will have the :free suffix. Also: the free tier resets daily, so if you hit the 200 request limit, wait until midnight UTC for the reset, or switch to a different free model while the other recovers.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/apis/huggingface', label: 'Hugging Face' }}
        next={{ path: '/ai-lab/apis/aws-bedrock', label: 'AWS Bedrock' }}
      />
    </ToolPageShell>
  )
}
