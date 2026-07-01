import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#3B82F6'

export default function TogetherAIPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="APIs">
      <ToolHeader
        icon="🤝"
        title="Together AI — Run 100+ Open-Source Models via API"
        tagline="The platform for fast, affordable open-source model inference"
        badges={[['$1 Free Credit', '#4ADE80'], ['100+ models', color], ['OpenAI-compatible', 'var(--text-muted)']]}
        overview={"Together AI is a cloud inference platform that hosts over 100 open-source models — Llama, Mistral, Qwen, FLUX image generation, Stable Diffusion — accessible through a single OpenAI-compatible API. If you want to experiment with different model families without running anything locally and without paying OpenAI prices, Together AI is the right choice. It gives you access to the full landscape of open-source AI in one place: compare Llama 3.1 70B to Qwen 2.5 72B to Mistral Large on the same task. New accounts get $1 free credit — enough for thousands of API calls on smaller models. Pricing is among the lowest for cloud inference, and the OpenAI SDK compatibility means zero integration changes when switching models."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Open Source AI Inference API with Together AI', url: 'https://www.youtube.com/watch?v=_GQfj3jhXVM', dur: '~12 min', note: 'How Together AI works — setup and first API calls' },
            { label: 'Together AI — The Cloud Platform for Generative AI Models', url: 'https://www.youtube.com/watch?v=79gB2Jkrtnw', dur: '~10 min', note: 'Platform walkthrough, model catalog, and pricing explained' },
            { label: 'Getting Started with OpenAI API and GPT Models in Python', url: 'https://www.youtube.com/watch?v=TWiCf2uEKZg', dur: '~20 min', note: 'OpenAI-compatible SDK pattern — works directly with Together AI' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why open-source models matter" color={color} />
          <InfoBox color={color}>Open-source models (Llama, Mistral, Qwen, Falcon) are publicly released model weights — anyone can download, run, or fine-tune them. Together AI, Groq, and Hugging Face host these models on cloud infrastructure, making them accessible via API without needing the hardware to run them yourself. The practical choice: open-source models via API for development and experimentation; proprietary models (GPT-4o, Claude) for tasks that demand the highest quality.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The economics are compelling. Llama 3.1 70B on Together AI costs $0.88 per million tokens. GPT-4o costs $2.50 input and $10 output per million tokens — roughly 10x more expensive. For applications with significant token volume — a product with many users, a batch processing pipeline, a RAG system ingesting thousands of documents — this cost difference is the difference between a viable product and an unaffordable one.</p>
        </Block>
        <Block>
          <SubHead label="Notable models on Together AI" color={color} />
          <CardGrid color={color} items={[
            { name: 'Llama 3.1 405B', desc: "Meta's largest open-source model. Comparable to GPT-4o on many benchmarks. $3.50/1M tokens — cheaper than GPT-4o for comparable quality. Best open-source option for complex reasoning." },
            { name: 'Llama 3.1 70B / 8B', desc: 'The practical workhorses. 70B: great quality at $0.88/1M. 8B: extremely cheap at $0.18/1M. 8B handles simple tasks; 70B handles complex ones.' },
            { name: 'Qwen 2.5 72B', desc: "Alibaba's model with strong multilingual performance. Excellent for code generation and tasks involving Asian languages. Often outperforms Llama 3.1 70B on coding benchmarks." },
            { name: 'Mistral 7B / Mixtral 8x7B', desc: "Lightweight, fast models. Mistral 7B is one of the best small models. Mixtral's mixture-of-experts architecture gives large-model quality at smaller-model speed." },
            { name: 'FLUX.1 (image generation)', desc: "State-of-the-art open-source image generation. FLUX.1-schnell is fast and cheap; FLUX.1-dev is higher quality. Both accessible via Together AI's image API." },
            { name: 'Code Llama / DeepSeek Coder', desc: 'Models fine-tuned specifically for code generation. Strong on fill-in-the-middle, code completion, and code explanation. Better than general models on pure coding tasks.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Together AI vs alternatives" color={color} />
          <Compare color={color} items={[
            { label: 'vs OpenAI API', badge: 'Together wins on cost, OpenAI wins on quality ceiling', body: "Together AI's best models (Llama 3.1 405B) approach GPT-4o quality at lower cost. For 80% of use cases, a $0.88/1M token model is indistinguishable from a $2.50/1M token model. Switch down to Together for cost savings; switch up to OpenAI when quality gaps show." },
            { label: 'vs Groq', badge: 'Different strengths', body: 'Groq prioritizes speed (500+ tokens/sec) with fewer model options. Together AI prioritizes model variety (100+) at competitive pricing but not the same raw speed. Groq for latency-critical apps; Together for model variety and experimentation.' },
            { label: 'vs running locally', badge: 'Together wins for development', body: 'Running Llama locally requires 16-80GB VRAM depending on model size. Together AI gives you cloud access to the same models without the hardware. Use Together AI for development, consider local deployment only for production privacy requirements.' },
            { label: 'vs Hugging Face Inference API', badge: 'Together often faster and cheaper', body: 'Both host open-source models. Together AI tends to have faster inference and lower latency. Hugging Face has more model variety (hundreds of thousands vs hundreds). Together AI for production inference; Hugging Face for finding and experimenting with niche models.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Create account and get API key', body: 'api.together.xyz → Sign up → Settings → API Keys → Create. New accounts get $1 free credit. No credit card required to start.' },
            { n: '2', title: 'Use OpenAI SDK with Together base URL', body: "from openai import OpenAI\nclient = OpenAI(\n  api_key=os.getenv('TOGETHER_API_KEY'),\n  base_url='https://api.together.xyz/v1'\n)\nEvery OpenAI API call now routes to Together. Same code, different models." },
            { n: '3', title: 'Browse the model catalog', body: 'api.together.xyz/models — filter by task (chat, code, image, embedding), by cost, by context length. Each model page shows pricing, a playground to test prompts, and example API calls.' },
            { n: '4', title: 'Compare models on your task', body: 'Run the same 5 prompts through 3 different models. Compare quality and cost. This direct comparison on your actual task is more useful than any benchmark. Settle on the cheapest model that gives acceptable quality.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Model selection strategy" color={color} />
          <InfoBox color={color}>The right model selection strategy is: start with the cheapest model that meets your quality bar, not the most capable model. You can always upgrade. The common mistake is defaulting to the largest, most expensive model and never benchmarking whether a smaller model is good enough.</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Define your quality bar first', body: "What does 'good enough' mean for your task? For summarization: accurate main points. For coding: working code. For classification: >90% correct. Define this before comparing models." },
            { n: '2', title: 'Test from cheapest to most capable', body: 'Start with the 8B model. Is it good enough? If yes, done. If not, try 70B. If not, try 405B. Most tasks are solved before you reach the expensive tier.' },
            { n: '3', title: 'Measure on real examples', body: 'Test on 20-30 real examples from your use case. Not generic prompts. Your actual data. A model that scores well on your data is better than one that scores well on academic benchmarks.' },
            { n: '4', title: 'Factor in total cost', body: 'Cost per 1M tokens × expected monthly token volume = monthly budget. Build this spreadsheet before committing to a model. Small per-token differences compound significantly at scale.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Access 100+ open-source models through a single OpenAI-compatible API without changing your code',
            'Run Llama 3.1, Qwen, Mistral, and other top open-source models at 10x lower cost than GPT-4o',
            "Generate images with FLUX.1 (better than DALL-E on many tasks) through the same API",
            'Systematically compare models on your specific task to find the best quality/cost ratio',
            "Build AI applications that are not locked into a single provider's pricing or availability",
        ]} />
      </Block>
        <ProjectTask
        title={"Model Comparison Benchmark"}
        description={"Pick one task you want to build an AI feature for. Write 10 test prompts for that task. Run all 10 prompts through 3 models: Llama 3.1 8B ($0.18/1M), Llama 3.1 70B ($0.88/1M), and one other (Qwen 2.5 72B or Mixtral 8x7B). Score each response 1-5 for quality. Calculate: average quality score and estimated cost per 1000 requests for each model. Pick the model with the best quality/cost ratio. This is production AI development done right."}
        costNote={"TOTAL COST: ~$0 from free credit — thousands of test calls on small models"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Define your task and write test prompts', body: "Be specific: not 'summarize text' but 'summarize a customer support ticket into: problem (1 sentence), steps taken (bullet points), resolution needed (1 sentence)'. Write 10 real examples." },
            { n: '2', title: 'Run through 3 models', body: "Use Together AI's playground (api.together.xyz/playground) for initial testing — no code needed. Run all 10 prompts through all 3 models. Save the outputs." },
            { n: '3', title: 'Score quality', body: 'Score each response 1 (completely wrong) to 5 (exactly right). Calculate average per model. Be strict — a response that is 80% correct but missing a key element is not a 5.' },
            { n: '4', title: 'Calculate cost', body: "Estimate tokens per request (input + output). Multiply by your model's per-1M token price. Multiply by expected request volume. Which model hits your quality bar at the lowest cost?" },
          ]} />
      </ProjectTask>
        <ProTip>
        Use Together AI's playground (no code required) to test prompts on different models before writing any API integration code. This saves significant development time — you discover model quality differences in 5 minutes in the playground versus hours of debugging API code. Always benchmark in the playground first, then integrate the winner.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/apis/openai-api', label: 'OpenAI API' }}
        next={{ path: '/ai-lab/apis/huggingface', label: 'Hugging Face' }}
      />
    </ToolPageShell>
  )
}
