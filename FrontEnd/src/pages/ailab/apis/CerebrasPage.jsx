import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F55036'

export default function CerebrasPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="APIs">
      <ToolHeader
        icon="🏎️"
        title="Cerebras — The Fastest Inference API, Free 1M Tokens/Day"
        tagline="World-record token speed on open models — a genuinely generous free tier, no card"
        badges={[['✓ 1M free tokens/day', '#4ADE80'], ['cloud.cerebras.ai', color], ['~2,000+ tokens/sec', 'var(--text-muted)']]}
        overview={"Cerebras runs AI models on the WSE-3 — the largest computer chip ever built — and the result is inference so fast it changes how apps feel: roughly 2,000–3,000 tokens per second, often 10–20x faster than typical GPU APIs. For a student, the headline is the free tier: as of 2026 Cerebras gives you 1,000,000 tokens per day, permanently, with no credit card. That is one of the most generous daily allowances of any free LLM API — enough to power real projects, batch jobs, and content pipelines at ₹0. The API is OpenAI-compatible, so if you know the OpenAI SDK you already know Cerebras — just change the base URL and API key. You get open models like gpt-oss-120b, Llama 3.1 8B, Llama 4 Scout, and Qwen3 variants. The main constraints on the free tier are 30 requests/minute, roughly 60,000–100,000 tokens/minute (varies by model), and an 8,192-token context window (described as a temporary free-tier cap). For most learning and prototyping workloads, the speed and daily volume make Cerebras one of the best free APIs available today."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Cerebras Inference — Fastest AI, Free Tier Setup', url: 'https://www.youtube.com/results?search_query=cerebras+inference+api+tutorial+2026', dur: '~14 min', note: 'Sign up, grab a free API key, and run your first ultra-fast call' },
            { label: 'Cerebras vs Groq — Speed Showdown', url: 'https://www.youtube.com/results?search_query=cerebras+vs+groq+speed+benchmark', dur: '~12 min', note: 'How Cerebras compares to Groq on real inference speed' },
            { label: 'Build a Fast Chatbot on Cerebras (OpenAI-compatible)', url: 'https://www.youtube.com/results?search_query=cerebras+api+python+chatbot+tutorial', dur: '~18 min', note: 'Point the OpenAI SDK at Cerebras and stream responses' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why Cerebras is different — wafer-scale speed" color={color} />
          <InfoBox color={color}>{"Most AI APIs run on GPUs; Cerebras runs on the WSE-3, a single wafer-scale chip that keeps an entire model on-chip. That eliminates the memory-bandwidth bottleneck that slows GPU inference, so tokens stream back at 2,000–3,000/sec instead of the 50–150/sec you feel on many APIs. In practice, responses that feel like 'watching it type' become nearly instant — which matters for chat UIs, agents that make many calls, and any interactive tool."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Speed is not just a nice-to-have. When you build agents or multi-step chains, each step waits on the previous model call — so a 10x faster model makes the whole pipeline 10x more responsive. And because the free tier gives 1,000,000 tokens per day, you can actually afford to run those multi-call workflows without burning through a tiny quota. That combination — very fast plus very generous — is what makes Cerebras stand out among free APIs in 2026.</p>
          {[
            '1,000,000 free tokens/day — permanent free tier, no credit card, resets daily (does not roll over)',
            'World-record speed — ~2,000–3,000 tokens/sec on the WSE-3 wafer-scale chip',
            'OpenAI-compatible API — reuse the OpenAI SDK; just change base_url to https://api.cerebras.ai/v1',
            'Open models — gpt-oss-120b, Llama 3.1 8B, Llama 4 Scout, Qwen3 (no proprietary frontier models)',
            'Free-tier caps to know — 30 requests/min, ~60K–100K tokens/min, and an 8,192-token context window',
            'Instant access — sign up at cloud.cerebras.ai, no waitlist, key issued immediately',
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
            { name: '1M Tokens/Day Free', desc: 'A permanent free tier of 1,000,000 tokens per day (input + output combined), no credit card required. It resets daily and does not accumulate. This is among the most generous daily free allowances of any LLM API.' },
            { name: 'Record-Breaking Speed', desc: 'Roughly 2,000–3,000 tokens/second on the WSE-3 chip — often 10–20x faster than GPU-based APIs. Ideal for chat, agents, and any workload where many calls happen in sequence.' },
            { name: 'OpenAI-Compatible', desc: 'The Chat Completions endpoint mirrors OpenAI\'s. Point an existing OpenAI client at https://api.cerebras.ai/v1 with your Cerebras key and most code runs unchanged — great for swapping providers.' },
            { name: 'Strong Open Models', desc: 'gpt-oss-120b (large, capable), Llama 3.1 8B (fast, general), Llama 4 Scout (long context), and Qwen3 variants (multilingual). Model IDs are stable for production models; some are labeled Preview.' },
            { name: 'Streaming & Tools', desc: 'Supports streaming responses (so text appears as it generates) and standard chat features. Because it is OpenAI-compatible, tools and structured-output patterns you know carry over.' },
            { name: 'Predictable Limits', desc: 'Free tier: 30 req/min, ~60K–100K tokens/min (model-dependent), 8,192-token context cap. The Developer (paid) tier raises rate limits ~10x and unlocks larger context windows.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — your first ultra-fast call" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Create a free account', body: 'Go to cloud.cerebras.ai and sign up with email or Google. No credit card is required for the free tier, and there is no waitlist — you get access immediately.' },
            { n: '2', title: 'Generate an API key', body: 'In the Cerebras console, open API Keys → Create key. Copy it once and store it in an environment variable — never hard-code it: export CEREBRAS_API_KEY=your-key-here' },
            { n: '3', title: 'Install the SDK', body: 'You can use the official Cerebras SDK (pip install cerebras-cloud-sdk) or the OpenAI SDK (pip install openai), since the API is OpenAI-compatible. The examples below use the OpenAI SDK so the pattern transfers everywhere.' },
            { n: '4', title: 'Make a call in Python', body: "from openai import OpenAI\nimport os\nclient = OpenAI(\n    base_url='https://api.cerebras.ai/v1',\n    api_key=os.environ['CEREBRAS_API_KEY'],\n)\nresp = client.chat.completions.create(\n    model='gpt-oss-120b',\n    messages=[{'role': 'user', 'content': 'Explain wafer-scale chips in 2 lines.'}],\n)\nprint(resp.choices[0].message.content)" },
            { n: '5', title: 'Or test instantly with curl', body: "curl https://api.cerebras.ai/v1/chat/completions \\\n  -H \"Authorization: Bearer $CEREBRAS_API_KEY\" \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"model\":\"llama3.1-8b\",\"messages\":[{\"role\":\"user\",\"content\":\"Say hi very fast\"}]}'" },
            { n: '6', title: 'Watch the speed & respect limits', body: 'Notice how fast the response returns. Stay within free-tier limits: 30 req/min, ~60K–100K tokens/min, 1M tokens/day, and keep prompts + outputs under the 8,192-token context cap. On a 429, back off and retry.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Free tier vs paid — and how it compares" color={color} />
          <Compare color={color} items={[
            { label: 'Free tier (Developer)', badge: '1M tokens/day, no card', body: '1,000,000 tokens/day, 30 req/min, ~60K–100K tokens/min, 8,192-token context. Permanent, no credit card, no waitlist. Enough for learning, prototypes, batch jobs, and small production workloads under 1M tokens/day.' },
            { label: 'Paid Developer / Enterprise', badge: 'Higher limits & context', body: 'Adding billing raises rate limits (~10x) and unlocks much larger context windows (64K–131K+). Pay-as-you-go pricing (roughly $0.10–$6 per million tokens depending on model). Use it once free-tier caps become the bottleneck.' },
            { label: 'vs Groq', badge: 'Both very fast, free', body: 'Groq is famous for speed too (300+ tokens/sec) with a free tier, but its free daily volume is smaller. Cerebras wins on raw daily allowance (1M tokens/day) and often on peak speed; Groq has a mature, widely-used free tier. Try both.' },
            { label: 'vs SambaNova', badge: 'Cerebras far more daily volume', body: 'SambaNova also offers fast, free open-model inference, but its free tier is only ~20 requests/day — very limiting. Cerebras\' 1M tokens/day and 30 req/min free tier is dramatically more usable for real projects.' },
            { label: 'Context caveat', badge: 'Watch the 8K free cap', body: 'The free-tier 8,192-token context window is the main limitation — you cannot paste huge documents. For long-context work (whole PDFs/codebases), use Gemini Flash (AI Studio) free tier or Cerebras\' paid tier.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Where Cerebras shines for students" color={color} />
          <InfoBox color={color}>{"Cerebras is the best free API when your workload is many calls or high volume rather than one giant prompt. Think: an agent that makes 50 model calls to complete a task, a script that classifies 10,000 rows overnight, a chatbot that needs to feel instant, or a content pipeline generating hundreds of drafts. The 1M-tokens/day allowance and blazing speed make these practical for free — as long as each individual prompt stays under the 8,192-token context cap."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>A smart pattern many developers use in 2026 is to stack free tiers by task: Cerebras for high-volume and speed-critical calls, Gemini Flash (via AI Studio) for long-context document work, and a reasoning model when you need deep thinking. Because Cerebras is OpenAI-compatible, routing a call to it is a one-line change, so you can mix and match providers behind a single, provider-agnostic client and never pay a rupee while you learn.</p>
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Build a Bulk Text Classifier on the Free Tier</span></div>
          <p className="tool-layout-task__desc">Use Cerebras\' speed and 1M-tokens/day allowance to classify a large batch of text — customer reviews, tweets, support tickets, or your own dataset — into categories. This is a genuinely useful real-world task and a perfect fit for a fast, high-volume free API.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Get your data ready', body: 'Grab a CSV of short texts (e.g. 500–2,000 product reviews). Each row should be one item to classify. Keep each text short so you stay well under the 8,192-token context cap per call.' },
            { n: '2', title: 'Write a tight classification prompt', body: 'Use a system message like: "Classify the review as POSITIVE, NEGATIVE, or NEUTRAL. Reply with only that one word." Set temperature=0 for consistent, deterministic labels — essential for classification.' },
            { n: '3', title: 'Loop over rows with rate control', body: 'Read the CSV, call Cerebras (model=\'llama3.1-8b\' for speed) once per row, and collect the label. Add a small sleep so you stay under 30 req/min. Because Cerebras is so fast, throughput is limited by the rate cap, not the model.' },
            { n: '4', title: 'Handle errors and 429s', body: 'Wrap each call in try/except. On a 429 (rate limit), wait a few seconds and retry that row. Log any failures so you can re-run just the missed rows later — never lose a whole batch to one hiccup.' },
            { n: '5', title: 'Save and summarize', body: 'Write the labels back to a new CSV column, then print a summary: how many POSITIVE / NEGATIVE / NEUTRAL. You just built a real data pipeline that would cost money on most APIs — for ₹0 on Cerebras.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — 1,000,000 tokens/day covers thousands of short classifications daily with no credit card</span></div>
        </div>
        <ProTip>
        Match the model to the job to stretch your free tokens. For high-volume, simple tasks (classification, extraction, short replies), use the smaller, fastest model (llama3.1-8b) — it is plenty capable and lets you do far more within the 1M-tokens/day and 30-req/min limits. Save the larger gpt-oss-120b for tasks that genuinely need more reasoning. And because Cerebras is OpenAI-compatible, keep base_url and model in config: when you hit the 8,192-token context cap on a long document, you can route just that one call to a long-context free model (like Gemini Flash) without touching the rest of your code.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/apis/github-models', label: 'GitHub Models' }}
        next={{ path: '/ai-lab/apis/sambanova', label: 'SambaNova' }}
      />
    </ToolPageShell>
  )
}
