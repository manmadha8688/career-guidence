import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F97316'

export default function MistralAPIPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="APIs">
      <ToolHeader
        icon="🌪️"
        title="Mistral AI API — Europe's Best LLM for Code and Multilingual Tasks"
        tagline="Fast, affordable, and open — with specialist models for code, vision, and edge"
        badges={[['✓ Free Trial', '#4ADE80'], ['mistral.ai', color], ['French AI', 'var(--text-muted)']]}
        overview={"Mistral AI is a French AI research lab founded in 2023 by former DeepMind and Meta researchers — and it quickly became Europe's answer to OpenAI. In just over a year, Mistral released models that rivaled GPT-4 at a fraction of the cost, built on a core belief that high-quality AI should be open, efficient, and not locked behind US cloud providers. While OpenAI and Anthropic keep their weights closed, Mistral regularly publishes open-weight models under Apache 2.0, letting anyone download, fine-tune, and self-host. Their commercial API, called La Plateforme, offers the frontier versions at prices significantly lower than OpenAI — Mistral Large costs $2/1M tokens input, versus GPT-4o at $5/1M. But what truly sets Mistral apart is specialization: Codestral is one of the best dedicated code models available, Pixtral handles vision, and Ministral targets edge devices. For any project where cost, European data residency, or code generation quality matters, Mistral is the first API to evaluate."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Mistral AI API Released — EASILY use Mistral\'s Latest Models Now! (Full Tutorial)', url: 'https://www.youtube.com/watch?v=Bqwobo1yHsI', dur: '~15 min', note: 'Complete walkthrough — API key setup to first working call' },
            { label: 'CodeStral AI Tutorial: Getting Started with Mistral\'s Coding LLM', url: 'https://www.youtube.com/watch?v=GP_HpRVfHWw', dur: '~12 min', note: 'Codestral-specific tutorial — FIM, chat completion, Python examples' },
            { label: 'Getting Started with the Python Library of Mistral AI', url: 'https://www.youtube.com/watch?v=6ZVEy2rmoRg', dur: '~10 min', note: 'Official Python SDK walkthrough — streaming, function calling, chat' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="European AI champion — why it matters" color={color} />
          <InfoBox color={color}>Mistral's EU-native infrastructure is not just a marketing point. For any project where GDPR compliance, European data residency, or simply not routing traffic through US data centers matters, Mistral is the only frontier model provider built for this use case from the ground up. Enterprise customers under strict data regulations — healthcare, finance, government — increasingly mandate it.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>Mistral's architecture philosophy differs from OpenAI's: instead of one massive general-purpose model, Mistral builds specialist models for specific domains. Codestral handles code. Pixtral handles vision. Ministral handles edge inference. Mistral Large handles complex reasoning. This means you pick the right tool for the job and pay only for what that task requires — rather than always routing everything through the most expensive model. Their open-source foundation also means the developer community can verify the weights, audit the models, and self-host when needed. That transparency is unusual among frontier AI providers.</p>
        </Block>
        <Block>
          <SubHead label="Mistral model lineup" color={color} />
          <CardGrid color={color} items={[
            { name: 'Mistral Large', desc: 'Flagship frontier model. Best reasoning, complex code generation, nuanced instruction following. Comparable to GPT-4o for most tasks. Priced at $2/$6 per 1M tokens — significantly cheaper than GPT-4o at $5/$15. Best for production pipelines where quality matters most.' },
            { name: 'Mistral Small', desc: 'Mid-tier model balancing quality and cost. $0.10/$0.30 per 1M tokens — excellent for high-volume tasks where Large is overkill. Strong on classification, summarization, light reasoning. The sweet spot for most applications.' },
            { name: 'Codestral', desc: "Mistral's dedicated code model. Trained on 80+ programming languages with 128K context window. Supports fill-in-the-middle (FIM) — complete code within an existing snippet, not just append to the end. $0.30/$0.90 per 1M tokens. Integrated with VS Code, JetBrains, and Vim." },
            { name: 'Pixtral Large', desc: 'Multimodal flagship. Accepts images + text — analyze screenshots, diagrams, charts, and photos alongside code. Same $2/$6 pricing as Mistral Large. Strong on visual reasoning tasks: reading UI screenshots, understanding technical diagrams, comparing images.' },
            { name: 'Ministral 8B / 3B', desc: 'Edge-optimized models designed to run on devices with limited compute. Ministral 3B at $0.04/$0.04 per 1M tokens is among the cheapest frontier-quality tokens available. Ideal for high-volume classification, IoT applications, and cost-sensitive production systems.' },
            { name: 'Mixtral 8x7B (open)', desc: 'Open-weight mixture-of-experts model. 8 experts with only 2 active per token — GPT-3.5 quality at much lower compute. Apache 2.0 licensed. Run it yourself on a consumer GPU or access it via La Plateforme. Available free on Groq for fast inference.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started with La Plateforme" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Create your account and get an API key', body: 'Go to console.mistral.ai → Sign up with email → API Keys → Create new key. The free trial includes enough credits to explore all models. No credit card required for the initial trial.' },
            { n: '2', title: 'Install the SDK', body: "pip install mistralai (Python) or npm install @mistralai/mistralai (Node.js). Mistral's SDK deliberately mirrors the OpenAI SDK structure — if you know OpenAI, the method names and patterns will feel familiar." },
            { n: '3', title: 'Write your first API call', body: "from mistralai import Mistral\nclient = Mistral(api_key='your_key')\nresponse = client.chat.complete(\n  model='mistral-large-latest',\n  messages=[{'role': 'user', 'content': 'Explain list comprehensions in Python'}]\n)\nprint(response.choices[0].message.content)" },
            { n: '4', title: 'Add streaming for real-time output', body: "Use client.chat.stream() instead of client.chat.complete(). Iterate over chunks: for event in stream: print(event.data.choices[0].delta.content or '', end='', flush=True). Streaming makes chatbots feel live rather than waiting for the full response." },
            { n: '5', title: 'Store your API key safely', body: "Never hardcode keys in source code. Create a .env file: MISTRAL_API_KEY=your_key_here. Use python-dotenv to load it: from dotenv import load_dotenv; load_dotenv(). Always add .env to .gitignore before your first commit." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Codestral — the coding specialist" color={color} />
          <InfoBox color={color}>Codestral is a genuinely different kind of model from a general-purpose LLM. It was trained on 80+ programming languages with a 128K token context window, using a mixture of code completion, fill-in-the-middle, and instruction-following objectives. The result is a model that understands code structure in a way that general models do not — it knows where functions begin and end, how indentation creates scope, and how variable names propagate across a file.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>The key unique capability is Fill-in-the-Middle (FIM). Standard code generation appends new code after a prompt — useful but limited. FIM lets you provide a prefix (code before the cursor) and a suffix (code after the cursor), and Codestral fills in exactly what should go between them. This is how VS Code Copilot-style inline completion works: it sees what is above and below the cursor and inserts the right code in the middle.</p>
          <CardGrid color={color} items={[
            { name: 'Fill-in-the-Middle (FIM)', desc: 'Provide prefix and suffix code — Codestral inserts the correct code between them. Powers cursor-position completion in VS Code and JetBrains plugins. Use the /fim/completions endpoint with prompt, suffix, and max_tokens.' },
            { name: 'VS Code integration', desc: 'Install the Mistral AI extension from the VS Code marketplace. Set CODESTRAL_API_KEY in settings. Get inline completions as you type — comparable to GitHub Copilot but powered by Codestral and significantly cheaper.' },
            { name: 'Test generation', desc: "Ask Codestral to generate unit tests for existing code. Its understanding of the code's structure — not just its text — means it generates tests that cover actual edge cases, not just happy paths." },
            { name: 'Multi-language support', desc: 'Unlike models optimized primarily for Python and JavaScript, Codestral has strong coverage of Go, Rust, Java, C++, TypeScript, PHP, Ruby, and Bash. Useful for polyglot codebases.' },
          ]} />
          <div className="tool-helper-highlight" style={{ marginTop: '0.875rem' }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: color, letterSpacing: '0.08em', marginBottom: '0.5rem' }}>CODESTRAL FIM — EXAMPLE</div>
            <pre className="tool-code-block">{`# Standard chat completion for code
response = client.chat.complete(
  model='codestral-latest',
  messages=[{'role': 'user', 'content': 'Write a binary search function in Python'}]
)

# FIM completion — fill between prefix and suffix
response = client.fim.complete(
  model='codestral-latest',
  prompt='def binary_search(arr, target):\\n    left, right = 0, len(arr) - 1\\n    ',
  suffix='\\n    return -1',
  max_tokens=256
)`}</pre>
          </div>
        </Block>
        <Block>
          <SubHead label="Open-weight vs commercial models" color={color} />
          <Compare color={color} items={[
            { label: 'Open-weight models (Apache 2.0)', badge: 'Free to self-host', body: 'Mistral 7B, Mixtral 8x7B, Mixtral 8x22B, Mistral Small, Codestral — released under Apache 2.0 or open research license. Download the weights from HuggingFace, run locally with Ollama or LM Studio, fine-tune on your own data, deploy on your own GPU server. No per-token costs, no data leaving your machine. The catch: you need hardware to run them, and self-hosting at scale is non-trivial.' },
            { label: 'Commercial API models (La Plateforme)', badge: 'Pay per token', body: 'Mistral Large 3, Pixtral Large, and the latest Codestral versions are commercial-only — hosted on Mistral\'s EU infrastructure. Access via API at pay-per-token pricing. No infrastructure management, automatic scaling, SLA guarantees, GDPR-compliant data handling. The right choice when you need managed hosting, legal compliance, or the latest frontier models.' },
            { label: 'Which to use as a student', badge: 'Recommendation', body: 'Start with La Plateforme free tier for development — no hardware needed. Use Ollama + Mistral 7B for offline experimentation and learning. When building portfolio projects, use La Plateforme small/medium models (very cheap). For code projects, Codestral via API or via Ollama (it is open-weight) is the best coding model you can access for free or near-free.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Mistral vs OpenAI vs Groq — when to choose each" color={color} />
          <Compare color={color} items={[
            { label: 'Cost per token', badge: 'Mistral wins', body: 'Mistral Large: $2/$6 per 1M tokens. OpenAI GPT-4o: $5/$15 per 1M tokens. Mistral is 40-60% cheaper than OpenAI for equivalent flagship-tier tasks. Mistral Small at $0.10/$0.30 is competitive with GPT-4o-mini. For high-volume production systems, Mistral\'s pricing advantage compounds significantly.' },
            { label: 'Raw speed / latency', badge: 'Groq wins by far', body: 'Groq (running Llama/Mixtral on custom LPU hardware): 500-800 tokens/second. Mistral La Plateforme: ~80-120 tokens/second. OpenAI GPT-4o: ~50-80 tokens/second. For latency-critical applications, Groq is the choice. For production quality where speed matters less than model quality or cost, Mistral.' },
            { label: 'Code generation quality', badge: 'Mistral has Codestral', body: "Mistral Codestral is a dedicated code model — it uniquely supports fill-in-the-middle completion, has 128K context, and is trained on 80+ languages. OpenAI's o-mini and GPT-4o are strong on code reasoning but are general models. For IDE completion, FIM tasks, and cost-effective code generation, Codestral has a genuine edge." },
            { label: 'GDPR and data residency', badge: 'Mistral wins outright', body: 'Mistral is the only frontier API provider with EU-native infrastructure and explicit GDPR compliance as a core offering. OpenAI processes data in the US. Anthropic processes in the US. Groq is US-based. For any European project with data compliance requirements, Mistral is the default answer.' },
            { label: 'OpenAI compatibility', badge: 'Mistral is easiest to switch to', body: "Mistral deliberately mirrors OpenAI's SDK interface. Switch base_url to https://api.mistral.ai/v1 and change the model name — any existing OpenAI code works on Mistral with minimal changes. This makes Mistral the lowest-friction alternative to add as a fallback provider." },
          ]} />
        </Block>
        <Block>
          <SubHead label="What you can build" color={color} />
          <CardGrid color={color} items={[
            { name: 'AI code editor plugin', desc: "Use Codestral's FIM API to build a VS Code extension or CLI tool that completes code at the cursor position. The FIM endpoint understands what's above and below — your completions will feel context-aware, not just predictive." },
            { name: 'Multilingual chatbot', desc: "Mistral Large has native-quality support for French, Spanish, German, Italian, Portuguese, and other European languages — not just English with translation. Build chatbots for non-English users without quality degradation." },
            { name: 'Document processing pipeline', desc: 'Pixtral Large accepts images and text together. Build a pipeline that reads scanned invoices, screenshots of error messages, or architecture diagrams — extract structured data from visual documents programmatically.' },
            { name: 'Cost-efficient RAG system', desc: 'Use Mistral Small for document retrieval and re-ranking (cheap at $0.10/1M), then pass only the top-k chunks to Mistral Large for final answer generation. This two-tier approach cuts costs dramatically versus routing everything through the expensive model.' },
            { name: 'Function calling agent', desc: "Mistral supports OpenAI-compatible function calling / tool use. Define tools (search, database query, API call), pass them to the model, and let it decide when to call them. Build agents that can look things up and take actions." },
            { name: 'Edge AI application', desc: 'Ministral 3B is designed for deployment on devices with limited compute. Costs $0.04/1M tokens via API — or self-host on a Raspberry Pi-class device. Build applications that run inference locally at near-zero marginal cost.' },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Build a Code Review Bot with Codestral</span></div>
          <p className="tool-layout-task__desc">Build a command-line code review tool that accepts a Python file, sends it to Codestral, and returns a structured review: what the code does, potential bugs, improvements, and a refactored version. This project demonstrates Codestral's code understanding and Mistral's function calling. Focus on: (1) reading files and passing code as context, (2) structured output using JSON mode, (3) comparing the original and refactored versions, (4) cost tracking (log token usage per review).</p>
          <Steps color={color} items={[
            { n: '1', title: 'Set up your environment', body: 'pip install mistralai python-dotenv. Create .env with MISTRAL_API_KEY=your_key. Create .gitignore with .env. The free trial credits are sufficient to complete this project.' },
            { n: '2', title: 'Read and send the code file', body: "with open('target.py', 'r') as f: code = f.read()\nThen construct a system prompt: 'You are a senior Python developer. Review the following code and return a JSON object with keys: summary, bugs, improvements, refactored_code.' Pass code in the user message." },
            { n: '3', title: 'Use JSON mode for structured output', body: "Add response_format={'type': 'json_object'} to your chat.complete() call. Mistral will guarantee the response is valid JSON. Parse with json.loads(response.choices[0].message.content). Print each field formatted with color using colorama or rich." },
            { n: '4', title: 'Track token usage and cost', body: "Access response.usage.prompt_tokens and response.usage.completion_tokens. Calculate cost: input_cost = (prompt_tokens / 1_000_000) * 0.30 (Codestral pricing). Print the estimated cost per review. Run 10 reviews and track cumulative spend." },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">ESTIMATED COST: ~$0.001 per code review with Codestral — 1000 reviews for $1</span></div>
        </div>
        <ProTip>
        Mistral's SDK is intentionally OpenAI-compatible. If you are already building with the OpenAI Python SDK, you can point it at Mistral's base URL with one line: client = OpenAI(api_key=MISTRAL_KEY, base_url="https://api.mistral.ai/v1"). Use this to A/B test OpenAI vs Mistral on the same task with the same code — measure quality, latency, and cost side-by-side. This is a valuable habit for any production system: never depend on a single provider.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/apis/aws-bedrock', label: 'AWS Bedrock' }}
        next={{ path: '/ai-lab/agents/langchain', label: 'LangChain' }}
      />
    </ToolPageShell>
  )
}
