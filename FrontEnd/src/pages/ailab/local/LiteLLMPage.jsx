import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#EC4899'

export default function LiteLLMPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Local AI">
      <ToolHeader
        icon="🔧"
        title="LiteLLM — One Interface for 100+ AI Providers"
        tagline="Switch between OpenAI, Claude, Gemini, Groq, Ollama with one line of code"
        badges={[['✓ 100% FREE', '#4ADE80'], ['litellm.ai', color], ['Open Source', 'var(--text-muted)']]}
        overview={"Every AI provider — OpenAI, Anthropic, Google, Groq, Mistral, Cohere, AWS Bedrock, Azure, Ollama, and 100 more — has a different SDK, different API format, different authentication, different error messages. When you build with one provider and need to switch, you rewrite code. LiteLLM solves this completely. It is a free, open-source Python library (MIT license) that gives every provider the same interface: one function call, one response format, one way to handle errors. Write your AI code once with litellm.completion() and call any provider by just changing the model name string. No other code changes. LiteLLM also ships as a standalone proxy server — the LiteLLM Proxy — so your whole team uses one endpoint regardless of which model they need. For students learning AI development, LiteLLM is the fastest way to experiment with different providers without learning multiple SDKs."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'LiteLLM Crash Course | For Complete Beginners', url: 'https://www.youtube.com/watch?v=WyW4Ifu4rSo', dur: 'June 2025', note: 'Fundamentals of LiteLLM — SDK usage, 100+ providers, OpenAI format explained' },
            { label: 'LiteLLM Proxy Tutorial: Track Costs, Budgets, and Multi-Provider LLM Usage', url: 'https://www.youtube.com/watch?v=9t-W51EHgzY', dur: 'Jan 2026', note: 'Proxy server setup, cost tracking, budgets, and multi-provider routing' },
            { label: 'LiteLLM: Free Open Source Gateway to Manage All Your LLM Providers', url: 'https://www.youtube.com/watch?v=mwP4sdp7gW0', dur: 'Feb 2026', note: 'Unified API gateway overview — virtual keys, fallbacks, load balancing' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="The provider abstraction problem" color={color} />
          <InfoBox color={color}>Without LiteLLM, switching from OpenAI to Anthropic means importing a different SDK, learning a different API structure, rewriting all your completion calls, and handling a completely different error format. With LiteLLM, the only change is the model name string: "gpt-5.5" → "claude-sonnet-5". Everything else stays the same.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The AI landscape in 2026 has dozens of competitive providers. OpenAI GPT-5.5 leads in general capability. Claude leads in long context and coding. Gemini Flash is the fastest and cheapest. Groq runs inference at 500+ tokens/second. Ollama runs models locally for free. The right provider depends on your use case, budget, and latency requirements — and that can change over time. Building your app tightly coupled to one provider's SDK is a liability. LiteLLM decouples your application logic from the provider completely. You configure which provider to use at the model name level — not at the code level. This is the same pattern that made database abstraction layers (like SQLAlchemy) a standard part of Python development.</p>
        </Block>
        <Block>
          <SubHead label="Getting started with LiteLLM SDK" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Install LiteLLM', body: 'pip install litellm\nThat is all. LiteLLM is a pure Python package. No separate service to run for the SDK. Works with Python 3.8+.' },
            { n: '2', title: 'Call any provider with litellm.completion()', body: "import litellm\n\n# OpenAI\nresponse = litellm.completion(\n    model='gpt-5.5',\n    messages=[{'role': 'user', 'content': 'Hello'}]\n)\n\n# Anthropic Claude — same call, different model name\nresponse = litellm.completion(\n    model='claude-sonnet-5',\n    messages=[{'role': 'user', 'content': 'Hello'}]\n)\n\n# Google Gemini — same call\nresponse = litellm.completion(\n    model='gemini/gemini-3.5-flash',\n    messages=[{'role': 'user', 'content': 'Hello'}]\n)\n\nprint(response.choices[0].message.content)" },
            { n: '3', title: 'Set your API keys via environment variables', body: "import os\nos.environ['OPENAI_API_KEY'] = 'your-key'\nos.environ['ANTHROPIC_API_KEY'] = 'your-key'\nos.environ['GEMINI_API_KEY'] = 'your-key'\nos.environ['GROQ_API_KEY'] = 'your-key'\n\nLiteLLM auto-detects which key to use based on the model name prefix. You can have all keys set at once — LiteLLM picks the right one." },
            { n: '4', title: 'Use streaming exactly like OpenAI', body: "response = litellm.completion(\n    model='gpt-5.5',\n    messages=[{'role': 'user', 'content': 'Count to 10'}],\n    stream=True\n)\nfor chunk in response:\n    print(chunk.choices[0].delta.content or '', end='', flush=True)\n\nStreaming works the same way for every provider — LiteLLM normalizes the different streaming formats." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Calling different providers — same code pattern" color={color} />
          <CardGrid color={color} items={[
            { name: 'OpenAI', desc: "model='gpt-5.5' or model='gpt-4o-mini'\nRequires OPENAI_API_KEY. The original — highest general capability, most tool/function support. Use when quality matters most." },
            { name: 'Anthropic Claude', desc: "model='claude-sonnet-5' or model='claude-opus-4-5'\nRequires ANTHROPIC_API_KEY. Best for long-context tasks, coding, detailed analysis, and instruction following." },
            { name: 'Google Gemini', desc: "model='gemini/gemini-3.5-flash' or model='gemini/gemini-2.0-pro'\nRequires GEMINI_API_KEY (free). Fastest response times for Flash. Large free tier — best starting model." },
            { name: 'Groq', desc: "model='groq/llama-3.1-70b-versatile'\nRequires GROQ_API_KEY (free tier). Runs Llama 3 at 500+ tok/sec — fastest inference. Use when speed matters." },
            { name: 'Ollama (local)', desc: "model='ollama/llama3.1' with api_base='http://localhost:11434'\nNo API key. Runs locally via Ollama. Zero cost, complete privacy. Use for development or sensitive data." },
            { name: 'AWS Bedrock', desc: "model='bedrock/anthropic.claude-sonnet-5-v2:0'\nRequires AWS credentials. Enterprise choice — Claude and Llama on AWS infrastructure with compliance guarantees." },
            { name: 'Azure OpenAI', desc: "model='azure/your-deployment-name'\nRequires AZURE_API_KEY and AZURE_API_BASE. Same GPT models on Microsoft infrastructure — preferred for enterprise Azure users." },
            { name: 'Mistral AI', desc: "model='mistral/mistral-large-latest'\nRequires MISTRAL_API_KEY (generous free tier). Strong coding and reasoning. European provider — GDPR native." },
          ]} />
        </Block>
        <Block>
          <SubHead label="LiteLLM Proxy — team-wide LLM gateway" color={color} />
          <InfoBox color={color}>The LiteLLM Proxy is a FastAPI server you run once. Every developer on your team — and every application — sends requests to this one endpoint. The proxy handles routing to the right provider, tracks costs per team/project, enforces budgets, and manages all API keys centrally. Teams use the same OpenAI SDK they already know — just pointing to the proxy URL instead of api.openai.com.</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Install and start the proxy', body: "pip install 'litellm[proxy]'\n\n# Start with a model config\nlitellm --model gpt-5.5\n\n# Or with a config file for multiple models\nlitellm --config config.yaml\n\nProxy starts on http://localhost:4000. That's your unified LLM endpoint." },
            { n: '2', title: 'Create a config.yaml for multiple providers', body: "model_list:\n  - model_name: gpt-5.5\n    litellm_params:\n      model: openai/gpt-5.5\n      api_key: os.environ/OPENAI_API_KEY\n  - model_name: claude-sonnet\n    litellm_params:\n      model: anthropic/claude-sonnet-5\n      api_key: os.environ/ANTHROPIC_API_KEY\n  - model_name: gemini-flash\n    litellm_params:\n      model: gemini/gemini-3.5-flash\n      api_key: os.environ/GEMINI_API_KEY\n\nlitellm_settings:\n  success_callback: ['langfuse']" },
            { n: '3', title: 'Call the proxy from any OpenAI SDK', body: "from openai import OpenAI\n\nclient = OpenAI(\n    base_url='http://localhost:4000',\n    api_key='any-virtual-key'  # create in proxy dashboard\n)\n\n# This hits Claude through your proxy\nresponse = client.chat.completions.create(\n    model='claude-sonnet',\n    messages=[{'role': 'user', 'content': 'Hello'}]\n)\n\nAny code written for OpenAI works unchanged — just change the base_url." },
            { n: '4', title: 'Access the proxy admin dashboard', body: "Go to http://localhost:4000/ui — the built-in admin dashboard shows:\n- Total spend by model, team, and user\n- Request logs with latency and token counts\n- Virtual key management (create, revoke, set budgets)\n- Rate limit configuration per key\n- Live request traces" },
          ]} />
        </Block>
        <Block>
          <SubHead label="Fallbacks and load balancing" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>LiteLLM has built-in fallback routing — if one provider fails or rate-limits you, it automatically retries with the next provider in your list. This is critical for production applications where a single provider going down should not take your app down.</p>
          <Steps color={color} items={[
            { n: '1', title: 'SDK-level fallbacks', body: "from litellm import completion\n\nresponse = completion(\n    model='gpt-5.5',\n    messages=[{'role': 'user', 'content': 'Hello'}],\n    fallbacks=['claude-sonnet-5', 'gemini/gemini-3.5-flash']\n)\n\nIf OpenAI fails → tries Claude → tries Gemini. One line to add multi-provider redundancy." },
            { n: '2', title: 'Load balancing across providers', body: "from litellm import Router\n\nrouter = Router(model_list=[\n    {'model_name': 'gpt-5.5', 'litellm_params': {'model': 'openai/gpt-5.5', 'tpm': 100000}},\n    {'model_name': 'gpt-5.5', 'litellm_params': {'model': 'azure/gpt-5.5-deployment', 'tpm': 100000}},\n])\n\n# Distributes load across both GPT-5.5 endpoints\nresponse = router.completion(model='gpt-5.5', messages=[...])" },
            { n: '3', title: 'Content policy fallbacks', body: "# Fall back when provider rejects the request (content filtering)\nresponse = completion(\n    model='gpt-5.5',\n    messages=messages,\n    fallbacks=['claude-sonnet-5'],\n    context_window_fallbacks=['gpt-4o-mini']  # fall back when context too long\n)" },
          ]} />
        </Block>
        <Block>
          <SubHead label="Cost tracking and virtual keys" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>LiteLLM tracks the cost of every API call automatically, using the published pricing for each provider. In the proxy, you can create virtual keys with spending limits — individual developers or teams get their own key with a monthly budget cap. When the budget is hit, the key stops working automatically.</p>
          <CardGrid color={color} items={[
            { name: 'Automatic cost tracking', desc: "LiteLLM knows the per-token pricing for every supported model. After every completion call, response._hidden_params['response_cost'] contains the exact cost in USD. No manual calculation needed." },
            { name: 'Virtual keys', desc: "Create sk-virtual-abc123 keys in the proxy dashboard. Each key tracks spend separately. Set monthly budgets per key — when reached, requests are blocked. Ideal for team projects." },
            { name: 'Team budgets', desc: 'Assign keys to teams. See which team spends most on which model. Identify cost optimization opportunities. Get Slack/email alerts when budgets approach limits.' },
            { name: 'Usage dashboard', desc: 'Built-in proxy UI at /ui shows cost breakdown by model, user, team, and time period. Export to CSV. Integrate with Langfuse or Prometheus for custom dashboards.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="LiteLLM vs OpenRouter vs direct SDKs" color={color} />
          <Compare color={color} items={[
            { label: 'LiteLLM (Python SDK + Proxy)', badge: 'Best for developers', body: 'Python library you control. Run it in your own infrastructure. Your API keys, your data — nothing passes through a third-party service. Best for: building applications, team gateways, full control. Cost: free, open source. Supports local Ollama models too.' },
            { label: 'OpenRouter', badge: 'Managed service', body: "OpenRouter is a hosted proxy service — you pay OpenRouter, they call the provider on your behalf. No setup needed, just one API key. Best for: rapid prototyping, accessing many models quickly. Tradeoff: your data passes through OpenRouter's servers, adds markup to provider pricing." },
            { label: 'Direct provider SDKs', badge: 'Per-provider', body: "openai, anthropic, google-generativeai — each provider's own SDK. Maximum control and latest features for that one provider. Best for: when you are committed to a single provider and need cutting-edge features. Tradeoff: switching providers means rewriting all your AI code." },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span>
            <span className="tool-layout-task__label">PROJECT — Build a Provider-Agnostic AI Chat App</span>
          </div>
          <p className="tool-layout-task__desc">Build a Python CLI chatbot that can switch between OpenAI, Gemini, and Groq with a single command-line argument — without changing any application logic. This demonstrates the core value of LiteLLM: write once, run on any provider.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Set up your environment', body: "pip install litellm python-dotenv\n\nCreate .env file with your free API keys:\nGEMINI_API_KEY=your-gemini-key   # free at ai.google.dev\nGROQ_API_KEY=your-groq-key       # free at console.groq.com\nOPENAI_API_KEY=your-openai-key   # optional, costs money" },
            { n: '2', title: 'Write the provider-agnostic chat loop', body: "import sys\nimport litellm\nfrom dotenv import load_dotenv\nload_dotenv()\n\nMODELS = {\n    'gemini': 'gemini/gemini-3.5-flash',\n    'groq': 'groq/llama-3.1-70b-versatile',\n    'openai': 'gpt-4o-mini',\n}\n\nmodel = MODELS.get(sys.argv[1], MODELS['gemini'])\nhistory = []\n\nwhile True:\n    user_input = input('You: ')\n    if user_input.lower() == 'quit': break\n    history.append({'role': 'user', 'content': user_input})\n    response = litellm.completion(model=model, messages=history)\n    reply = response.choices[0].message.content\n    history.append({'role': 'assistant', 'content': reply})\n    print(f'AI ({model}): {reply}')" },
            { n: '3', title: 'Add cost tracking', body: "# After each completion call:\ncost = response._hidden_params.get('response_cost', 0)\nprint(f'[Cost: ${cost:.6f}]')\n\n# Track total session cost\ntotal_cost += cost\nprint(f'[Session total: ${total_cost:.4f}]')" },
            { n: '4', title: 'Add fallback routing', body: "# If primary provider fails, auto-switch\nresponse = litellm.completion(\n    model=model,\n    messages=history,\n    fallbacks=['gemini/gemini-3.5-flash', 'groq/llama-3.1-8b-instant']\n)\n\n# Run: python chat.py gemini\n# Run: python chat.py groq\n# Run: python chat.py openai\n# All use identical chat logic" },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE TIER: Gemini API and Groq API are both free with generous limits — build and test this project at zero cost</span></div>
        </div>
        <ProTip>
        LiteLLM has a built-in testing mode — set litellm.mock_response = True and every call returns a fake response instantly, no API key needed. This is invaluable for testing your application logic without burning API credits. Use it in unit tests and CI pipelines. Also: set litellm.set_verbose = True to see exactly which provider was called, what was sent, what came back, and the cost. Essential for debugging why a call failed or why costs are higher than expected.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/local/lmstudio', label: 'LM Studio' }}
        next={{ path: '/ai-lab/local/localai', label: 'LocalAI' }}
      />
    </ToolPageShell>
  )
}
