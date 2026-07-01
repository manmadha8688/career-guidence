import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F97316'

export default function FineTuningPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="AI Foundations">
      <ToolHeader
        icon="🎯"
        title="Fine-Tuning — Adapting AI Models for Your Specific Domain"
        tagline="When prompting and RAG aren't enough — specialize any LLM on your own data"
        badges={[['✓ FREE on Colab', '#4ADE80'], ['Lambda Labs, HuggingFace', color], ['AI Foundations', 'var(--text-muted)']]}
        overview={"Fine-tuning is the process of taking a pre-trained large language model — one that already understands language from training on hundreds of billions of words — and training it further on your own labeled data to specialize its behavior. Where RAG connects an LLM to documents it can search, fine-tuning changes what the model itself knows and how it responds. A customer support model fine-tuned on 10,000 real support conversations learns your product's terminology, your resolution patterns, and your company's tone — permanently, without needing prompts to establish that context every time. For students, understanding when and how to fine-tune separates people who use AI as a tool from people who can build production AI systems."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'LLM Fine Tuning Explained in 8 Minutes: LoRA, QLoRA, DPO', url: 'https://www.youtube.com/watch?v=wmCmrEijfQ0', dur: '8 min', note: 'Best quick conceptual overview — covers the core ideas without code' },
            { label: 'The Complete Guide to End-to-End LLM Fine-Tuning (LoRA, QLoRA & Full)', url: 'https://www.youtube.com/watch?v=jrf5vyOEMr8', dur: 'Complete guide', note: 'Full walkthrough from dataset prep to deployment' },
            { label: 'Fine-Tune ANY LLM with LLaMA Factory | Full Guide', url: 'https://www.youtube.com/watch?v=RL38OsL5ycY', dur: 'Hands-on', note: 'Practical guide using LLaMA Factory — no heavy coding required' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="The decision ladder: prompt engineering → RAG → fine-tuning" color={color} />
          <InfoBox color={color}>These are not competing approaches — they are a ladder of investment. Start at the bottom. Prompt engineering is free and takes hours. RAG takes days and costs infrastructure. Fine-tuning takes weeks and costs real money. Only move up when the level below cannot solve your problem. Most real problems are solved at the prompting or RAG level.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The right question is not "should I fine-tune?" but "which approach solves my specific problem with the least investment?" Fine-tuning is justified when you have 500+ high-quality labeled examples, the task requires deep domain-specific reasoning that prompts cannot capture, you need consistent output formats without lengthy system prompts on every call, or you are deploying a small model (7B parameters) and want the quality of a much larger one for your specific task.</p>
        </Block>
        <Block>
          <SubHead label="Understanding the techniques" color={color} />
          <Compare color={color} items={[
            { label: 'Full Fine-Tuning', badge: 'For large enterprises only', body: 'Updates all model weights. Maximum quality but extreme compute requirements — a 7B parameter model needs 100-120 GB of GPU VRAM, approximately $50,000 worth of H100 hardware for a single run. Overkill for 95% of real use cases. Mention it to understand why LoRA exists.' },
            { label: 'LoRA (Low-Rank Adaptation)', badge: 'The standard approach', body: 'Freezes the original model weights and trains tiny "adapter" matrices injected into attention layers. 90%+ fewer trainable parameters. LoRA adapters are 10-100 MB instead of 5-15 GB. Fine-tune a 7B model on a $1,500 consumer RTX 4090. Performance within 1-2% of full fine-tuning. You can swap different LoRA adapters onto the same base model for different tasks.' },
            { label: 'QLoRA (Quantized LoRA)', badge: 'What students should use', body: 'LoRA plus quantizing the base model to 4-bit precision. As little as 0.5 GB of VRAM per billion parameters — a 7B model fits in 4-6 GB VRAM. Runs on the free Google Colab T4 GPU. ~33% memory savings versus LoRA with ~39% longer training time. Negligible accuracy loss. This is how you fine-tune for free.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Platforms for fine-tuning" color={color} />
          <CardGrid color={color} items={[
            { name: 'Hugging Face AutoTrain', desc: 'No-code web interface. Upload your dataset, choose a base model, configure hyperparameters, click train. Handles NLP, vision, and tabular data. Best starting point for students who want results without writing training loops. AutoML-style tuning built in.' },
            { name: 'Google Colab + Unsloth', desc: 'Free Colab gives T4 GPU (16GB VRAM). Unsloth library makes QLoRA 2x faster with 70% less VRAM. Has ready-made Colab notebooks for Llama 3.2, Phi-3, Mistral, Qwen. This is the free path to actually fine-tuning a model yourself.' },
            { name: 'Together AI', desc: 'Managed fine-tuning + inference in one platform. LoRA fine-tuning from $0.48/1M tokens. H100 SXM at $1.75/hr. Supports Llama, Mistral, and other open models. Best for teams wanting managed fine-tuning without managing servers.' },
            { name: 'Lambda Labs', desc: 'GPU cloud — H100 PCIe at ~$2.49/hr, A100 at ~$1.99/hr with zero egress fees. Run your own PyTorch/Hugging Face training scripts. Best when you want raw GPU access to fully control the training process.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="What fine-tuning actually costs" color={color} />
          <InfoBox color={color}>GPU prices dropped significantly in 2024-2025 — H100 rates fell from ~$8/hr at launch to $2.85-3.50/hr by late 2025 (AWS cut P5 pricing 44% in June 2025). Using QLoRA instead of full fine-tuning reduces compute costs by up to 80%. Smaller base models (7B vs 70B) are proportionally cheaper.</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Small models with LoRA (student range)', body: 'Phi-2 (2.7B): $300-700. Mistral 7B: $1,000-3,000. A 6B model fine-tuned in 40 minutes for under $7 in an optimized setup (Anyscale benchmark). For most student projects, free Colab or <$50 on Together AI covers the experiment.' },
            { n: '2', title: 'Larger models (team range)', body: 'Llama 3.1 13B with LoRA: $2,000-5,000. Llama 70B full fine-tune: up to $35,000. For most production fine-tuning, staying at 7-13B with LoRA is the right cost-quality balance.' },
            { n: '3', title: 'The quality factor that drives cost', body: 'Curated, high-quality training data reduces cost dramatically by shortening training runs. 2,000 carefully written examples often outperforms 20,000 scraped low-quality ones. Data quality is your most important cost lever — not GPU choice.' },
            { n: '4', title: 'Free path: Colab + Unsloth + QLoRA', body: 'pip install unsloth; use a pre-made Unsloth Colab notebook; load Llama 3.2 1B or Phi-3 Mini in 4-bit; format your data as instruction-response pairs; train for 30-60 minutes on free T4. This is genuinely free and genuinely produces a fine-tuned model.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Real-world use cases where fine-tuning pays off" color={color} />
          <CardGrid color={color} items={[
            { name: 'Customer support', desc: 'Train on 10,000 real support conversations. Model learns your product terminology, resolution patterns, escalation logic, and tone — permanently. No 2,000-word system prompt needed every call.' },
            { name: 'Medical documentation', desc: 'Fine-tuned models (like Meditron on Llama) trained on clinical guidelines reduce charting time by up to 50%. Learn drug names, symptoms, ICD codes, and clinical language that general models handle poorly.' },
            { name: 'Legal document analysis', desc: 'Contract review, clause extraction, jurisdiction-specific language. Fine-tuned models learn to classify clauses, flag risky language, and summarize documents in legal professionals\' terminology.' },
            { name: 'Domain-specific code generation', desc: 'Fine-tuned GPT-J achieved 70.4% secure code generation for C/C++ — 10% above base model. Fine-tune on your company\'s codebase to generate code in your team\'s specific style and patterns.' },
          ]} />
        </Block>
        <Block title="What you can do after understanding this" titleColor={color}>
        <CanDoList items={[
          'Understand when RAG and prompting are sufficient vs. when fine-tuning is actually the right tool',
            'Fine-tune a small language model (Llama 3.2 1B or Phi-3 Mini) for free on Google Colab using QLoRA',
            'Use Hugging Face AutoTrain for no-code fine-tuning without writing training code',
            'Estimate the realistic cost of fine-tuning a model for a specific production use case',
            'Build a specialized AI model that handles your domain\'s terminology and format requirements without lengthy prompts',
        ]} />
      </Block>
        <ProjectTask
        title={"Fine-Tune a Small Model for Free"}
        description={"Use Google Colab + Unsloth + QLoRA to fine-tune Llama 3.2 1B (or Phi-3 Mini) on a small dataset of your own. Pick a task you care about: a customer FAQ system with 50 Q&A pairs, a code comment generator with 100 code+comment examples, or a study guide generator with 30 topic+summary pairs. Fine-tune on Colab (free T4 GPU). Test before and after — compare how the base model answers vs. your fine-tuned version. This is how you understand fine-tuning in practice, not just theory."}
        costNote={"TOTAL COST: $0 — Google Colab free T4 GPU + Unsloth open source"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Prepare your dataset', body: 'Create 50-200 instruction-response pairs in JSONL format: {instruction: "question or prompt", output: "ideal answer"}. Quality matters more than quantity — write each example carefully. This is the most important step.' },
            { n: '2', title: 'Open an Unsloth Colab notebook', body: 'Go to unsloth.ai → Notebooks. Open the Llama 3.2 or Phi-3 Mini notebook in Google Colab (free). Unsloth handles the QLoRA setup, quantization, and training loop. You only configure the model, dataset, and hyperparameters.' },
            { n: '3', title: 'Train and monitor', body: 'Connect to the T4 GPU runtime (free in Colab). Run the training cells. Training 50-200 examples takes 5-20 minutes on T4. Watch the loss curve — it should decrease steadily. If it drops to near-zero immediately, your dataset is too small or too simple.' },
            { n: '4', title: 'Compare before and after', body: 'Ask the same 10 questions to the base model AND your fine-tuned version. Where does your model perform better? Where is it worse? What did fine-tuning actually change? This comparison is the learning — understanding what fine-tuning does and does not do.' },
          ]} />
      </ProjectTask>
        <ProTip>
        The most common fine-tuning mistake is treating it as a fix for insufficient prompting. Before spending money on fine-tuning, spend 2 hours aggressively optimizing your prompts and testing few-shot examples. In most cases, a well-crafted system prompt with 5 examples outperforms a lazily fine-tuned model. Fine-tuning is for problems that genuinely cannot be solved with prompting — not for problems where you have not tried hard enough with prompts yet.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/foundations/embeddings', label: 'Embeddings' }}
        next={{ path: '/ai-lab/foundations/model-training', label: 'Model Training' }}
      />
    </ToolPageShell>
  )
}
