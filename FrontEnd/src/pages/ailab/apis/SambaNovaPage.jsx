import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#6D28D9'

export default function SambaNovaPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="APIs">
      <ToolHeader
        icon="💫"
        title="SambaNova Cloud — Fast Open-Model Inference, Free & No Card"
        tagline="Run DeepSeek, Llama, and gpt-oss on custom RDU chips — genuine forever-free tier"
        badges={[['✓ FREE (no card)', '#4ADE80'], ['cloud.sambanova.ai', color], ['200K tokens/day', 'var(--text-muted)']]}
        overview={"SambaNova Cloud serves open and partner models on SambaNova's custom RDU (Reconfigurable Dataflow Unit) hardware, which delivers very fast inference — a rival to Groq and Cerebras on speed. Its appeal for students is a genuine forever-free tier with no credit card: you get rate-limited free access to strong open models like DeepSeek-V3.1/V3.2, Llama 3.3 70B, gpt-oss-120b, Gemma 4, and MiniMax. The API is OpenAI-compatible (base URL https://api.sambanova.ai/v1), so it drops into any code that already uses the OpenAI SDK. The honest catch, accurate as of 2026: the free tier is tight on requests — about 20 requests/minute, 20 requests/day, and 200,000 tokens/day per model. That 20-requests-per-day cap is the real constraint, so SambaNova is best for testing quality, running a few large prompts, or comparing models — not for high-volume loops. Adding a payment method upgrades you to the Developer tier (higher limits, 20M tokens/day, plus a small starter credit). For a completely free way to try premium open models like DeepSeek on very fast hardware, SambaNova is well worth having in your toolkit."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'SambaNova Cloud — Free API Key & First Call', url: 'https://www.youtube.com/results?search_query=sambanova+cloud+api+tutorial+2026', dur: '~12 min', note: 'Sign up, get a free key, and run DeepSeek / Llama on RDU hardware' },
            { label: 'SambaNova vs Groq vs Cerebras — Fast Inference', url: 'https://www.youtube.com/results?search_query=sambanova+vs+groq+vs+cerebras+speed', dur: '~14 min', note: 'How the three fast-inference free tiers compare' },
            { label: 'Run DeepSeek Free with SambaNova (Python)', url: 'https://www.youtube.com/results?search_query=sambanova+deepseek+api+python+tutorial', dur: '~16 min', note: 'Point the OpenAI SDK at SambaNova and call DeepSeek-V3.1' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why SambaNova — fast RDU inference, premium open models free" color={color} />
          <InfoBox color={color}>{"SambaNova's RDU chips are purpose-built for AI, giving fast time-to-first-token and high throughput on large open models. The standout is access: on the free tier, with no credit card, you can call genuinely strong models — DeepSeek-V3.1/V3.2 (excellent reasoning), Llama 3.3 70B, and gpt-oss-120b — that would otherwise cost money elsewhere. It is one of the few places to try DeepSeek-class models fast, for free."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>The trade-off is quantity, not quality. The free tier gives full model access but caps you at roughly 20 requests per day per model — so think of it as a place to evaluate models and run a handful of high-value prompts, not to power a chatbot serving many users. That makes SambaNova a perfect complement to a high-volume free tier like Cerebras: use Cerebras for the many small calls, and SambaNova when you want to run a few requests through a premium model like DeepSeek to check its answer quality.</p>
          {[
            'Forever-free tier — rate-limited access to all listed models, no credit card required',
            'Premium open models — DeepSeek-V3.1/V3.2, Llama 3.3 70B, gpt-oss-120b, Gemma 4, MiniMax',
            'Fast RDU hardware — custom Reconfigurable Dataflow Units built for AI inference speed',
            'OpenAI-compatible — base URL https://api.sambanova.ai/v1; reuse the OpenAI SDK unchanged',
            'The real limit — ~20 req/min, ~20 req/day, ~200,000 tokens/day per model on the free tier',
            'Easy upgrade — add a payment method for the Developer tier (20M tokens/day, higher RPM, $5 starter credit)',
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
            { name: 'Forever-Free Tier', desc: 'Rate-limited free access with no credit card and no time limit. You can call every listed model — the free tier restricts how often you call, not which models you reach.' },
            { name: 'DeepSeek Access', desc: 'One of the easiest free ways to run DeepSeek-V3.1 and V3.2 — strong reasoning and coding models. Great for comparing DeepSeek\'s answers against Gemini or Llama on your own prompts.' },
            { name: 'RDU Speed', desc: 'SambaNova\'s custom Reconfigurable Dataflow Units deliver fast inference on large models — competitive with other specialized-hardware providers like Groq and Cerebras.' },
            { name: 'OpenAI-Compatible API', desc: 'Chat Completions at https://api.sambanova.ai/v1. Point any OpenAI client there with your SambaNova key and most existing code runs unchanged — ideal for swapping providers.' },
            { name: 'Broad Model Menu', desc: 'DeepSeek-V3.1/V3.2, Llama 3.3 70B, gpt-oss-120b, Gemma 4 31B, and MiniMax — a good mix of reasoning, general chat, and multilingual models in one place.' },
            { name: 'Clear Upgrade Path', desc: 'Add a payment method to move to the Developer tier: 20M tokens/day, much higher requests-per-minute and per-day caps, plus a small ($5) starter credit that expires in a few months.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — first call in minutes" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Create a free account', body: 'Go to cloud.sambanova.ai and sign up. No credit card is needed for the free tier. Once in, you land in the SambaNova Cloud console.' },
            { n: '2', title: 'Generate an API key', body: 'In the console, open the API keys section and create a new key. Copy it once and store it in an environment variable — never commit it to code: export SAMBANOVA_API_KEY=your-key-here' },
            { n: '3', title: 'Use the OpenAI SDK', body: 'Install the OpenAI SDK (pip install openai) — SambaNova is OpenAI-compatible, so no special library is required. You will simply change the base_url and model name.' },
            { n: '4', title: 'Call DeepSeek in Python', body: "from openai import OpenAI\nimport os\nclient = OpenAI(\n    base_url='https://api.sambanova.ai/v1',\n    api_key=os.environ['SAMBANOVA_API_KEY'],\n)\nresp = client.chat.completions.create(\n    model='DeepSeek-V3.1',\n    messages=[{'role': 'user', 'content': 'Explain RDU chips simply.'}],\n)\nprint(resp.choices[0].message.content)" },
            { n: '5', title: 'Or test with curl', body: "curl https://api.sambanova.ai/v1/chat/completions \\\n  -H \"Authorization: Bearer $SAMBANOVA_API_KEY\" \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"model\":\"Meta-Llama-3.3-70B-Instruct\",\"messages\":[{\"role\":\"user\",\"content\":\"Hi!\"}]}'" },
            { n: '6', title: 'Budget your requests', body: 'The free tier allows only ~20 requests/day per model (and ~20 req/min, 200K tokens/day). Spend them wisely — use SambaNova for a few high-value or quality-comparison calls, and a high-volume free API (Cerebras/Groq) for the rest.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Free tier vs Developer tier — and how it compares" color={color} />
          <Compare color={color} items={[
            { label: 'Free tier', badge: 'No card — but ~20 req/day', body: '~20 requests/min, ~20 requests/day, ~200,000 tokens/day per model, all models available. The 20-req/day cap is the binding limit. Perfect for evaluating models and running occasional big prompts; not for high-traffic apps.' },
            { label: 'Developer tier', badge: 'Add payment — big jump', body: 'Linking a payment method unlocks 20M tokens/day across models, much higher RPM/RPD (e.g. hundreds of req/min on some models), and a $5 starter credit (expires ~3 months). Pay-as-you-go beyond that.' },
            { label: 'vs Cerebras', badge: 'Cerebras far higher free volume', body: 'Cerebras\' free tier gives 1M tokens/day and 30 req/min — vastly more usable for volume than SambaNova\'s 20 req/day. Use SambaNova for its model menu (esp. DeepSeek) and Cerebras when you need to make many calls.' },
            { label: 'vs Groq', badge: 'Both fast, different menus', body: 'Groq focuses on ultra-fast Llama/open models with a mature free tier; SambaNova adds DeepSeek and MiniMax. If you specifically want DeepSeek free, SambaNova is a great pick; for sheer free throughput, Groq/Cerebras win.' },
            { label: 'Preview models caveat', badge: 'Can change', body: 'Some SambaNova models are labeled Preview (e.g. certain DeepSeek/Gemma variants) and may change or be removed as the catalog evolves. Check the current model list in the console before depending on a specific ID.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="How to use SambaNova well as a student" color={color} />
          <InfoBox color={color}>{"Treat SambaNova as your 'premium taster' free tier. Because you only get ~20 requests a day per model, do not waste them on trivial 'hello world' loops. Instead, use them for high-value comparisons: send the same hard prompt to DeepSeek-V3.1 here and to Gemini Flash and Llama elsewhere, then judge which model reasons best on your task. That kind of side-by-side evaluation is exactly what professionals do when choosing a model for a project — and it is a great habit to build."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>Because SambaNova is OpenAI-compatible, plugging it into a model-comparison script is trivial: keep a dictionary of {'{'} provider: (base_url, model) {'}'} pairs and loop the same prompt through each. This provider-agnostic pattern — the same one you learned for surviving the GitHub Models shutdown — turns five free tiers into one flexible toolkit you can mix by task, quality, and remaining quota.</p>
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Build a Model Comparison Tool</span></div>
          <p className="tool-layout-task__desc">Use SambaNova\'s free DeepSeek access alongside another free API to build a tool that sends one prompt to multiple models and shows their answers side by side. This is genuinely useful (real teams do this to pick models) and respects SambaNova\'s low daily request cap by design.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Collect a few free keys', body: 'Get free API keys from SambaNova (DeepSeek), Cerebras (gpt-oss / Llama), and Google AI Studio (Gemini Flash). Store each in its own environment variable. You now have three free providers to compare.' },
            { n: '2', title: 'Define a providers config', body: 'Create a list of providers, each with a base_url, api_key, and model. For the OpenAI-compatible ones (SambaNova, Cerebras) this is uniform; handle Gemini with its own SDK or its OpenAI-compatible endpoint.' },
            { n: '3', title: 'Write one comparison prompt', body: 'Pick a genuinely hard question — a tricky reasoning puzzle, a coding bug to find, or a nuanced explanation. This is where model differences show. Use the SAME prompt for every provider so the comparison is fair.' },
            { n: '4', title: 'Loop and collect answers', body: 'For each provider, make ONE call (respecting SambaNova\'s ~20/day cap) and store the response. Wrap in try/except so one provider failing does not break the whole comparison.' },
            { n: '5', title: 'Display side by side', body: 'Print each model\'s answer under its name, or render them in a simple table/columns. Judge which reasoned best. You have built the exact evaluation tool that engineers use to choose a model — entirely on free tiers.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — one call per provider fits easily inside SambaNova\'s ~20 req/day free tier and the others\' free limits</span></div>
        </div>
        <ProTip>
        Spend SambaNova\'s tiny daily request budget on quality, not quantity. With only ~20 requests per day per model, it is the wrong tool for chatbots or loops — but the perfect tool for evaluation. When you are deciding which model to build a project on, send your hardest, most representative prompt to DeepSeek-V3.1 on SambaNova and compare it against a Cerebras or Gemini answer. One thoughtful comparison call teaches you more than a hundred throwaway ones — and it leaves your high-volume work to the free tiers built for it.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/apis/cerebras', label: 'Cerebras' }}
        next={{ path: '/ai-lab/apis/cohere', label: 'Cohere' }}
      />
    </ToolPageShell>
  )
}
