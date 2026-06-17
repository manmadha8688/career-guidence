import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, P, CardGrid } from '../helpers'

const CYAN = '#00D9FF'
const color = '#8B5CF6'

export default function ModelTrainingPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg   = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(0,217,255,0.09)' : 'rgba(79,70,229,0.11)'
  const txt   = dark ? '#E2E8F0' : '#0F172A'
  const sub   = dark ? '#94A3B8' : '#475569'
  const muted = dark ? '#64748B' : '#94A3B8'

  return (
    <div style={{ minHeight: '100vh', background: bg, color: txt, fontFamily: "'Rajdhani', sans-serif", overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, borderRadius: '50%', background: `radial-gradient(ellipse, ${color}07 0%, transparent 65%)`, filter: 'blur(60px)' }} />
      </div>

      <nav style={{ position: 'sticky', top: 0, zIndex: 50, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', background: dark ? 'rgba(2,8,23,0.93)' : 'rgba(240,244,255,0.95)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${border}` }}>
        <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.72rem', letterSpacing: '0.1em', color: CYAN, padding: 0 }}>
          <ArrowLeft size={14} /> AI Lab
        </button>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>AI Foundations</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🏋️</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Model Training — From Experiments to Production-Ready Models</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Hugging Face Trainer + Weights &amp; Biases for the complete ML training workflow</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE Tier', '#4ADE80'], ['Colab + Kaggle GPU', color], ['Hugging Face + W&B', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Model training is where AI models actually get built — where raw data becomes a system that can predict, generate, or classify. For students, the most practical form is fine-tuning: taking a pre-trained model like BERT or Llama 3 and training it further on your own labeled data to adapt it for a specific task. Hugging Face's Trainer class handles the entire training loop (gradient updates, checkpointing, evaluation, mixed precision) so you write the configuration, not the loop. Weights &amp; Biases adds the observability layer — every training run is automatically logged with loss curves, metrics, hyperparameters, and visualizations, making experiments reproducible and comparable. Together, these two tools represent how professional ML teams actually train models in 2025.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'LLM Fine-Tuning 08: Master Hugging Face in 3 Hours | Full Crash Course 2025', url: 'https://www.youtube.com/watch?v=SPNaP4ik9a4', dur: '3 hrs', note: 'Comprehensive Hugging Face Trainer crash course' },
            { label: 'Fine-Tuning with Hugging Face Trainer', url: 'https://www.youtube.com/watch?v=L6Dr8AFXMd8', dur: 'Hands-on', note: 'Hands-on Trainer walkthrough — practical end to end' },
            { label: 'Weights & Biases W&B: Quick Start Tutorial! (Log Metrics & Models FAST)', url: 'https://www.youtube.com/watch?v=iq8NFthBffM', dur: 'Quick start', note: 'W&B quickstart — set up experiment tracking in minutes' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* The three paths */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="The three paths — pre-trained, fine-tune, train from scratch" color={color} />
          <InfoBox color={color} dark={dark}>Most students and developers never need to train a model from scratch. 99% of real-world ML work uses pre-trained models via APIs (fastest, no code) or fine-tuned models (a few hours, your data). Training from scratch costs hundreds of thousands of dollars in compute and requires months of engineering — this is what OpenAI, Google, and Meta do. Your goal is to know when each approach is right, not to do all three.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The decision is straightforward: use a pre-trained model via API until you hit a quality ceiling. If the model consistently fails at your specific task despite good prompting, fine-tune. If fine-tuning cannot achieve the quality you need — usually because no relevant pre-trained model exists for your domain — then you consider training from scratch, with appropriate compute and budget. For most student and production use cases, the answer stops at fine-tuning.</p>
        </Block>

        {/* Hugging Face Trainer */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Hugging Face Trainer — the training loop, handled" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            {
              n: '1',
              title: 'Install and load model + tokenizer',
              body: 'from transformers import AutoModelForSequenceClassification, AutoTokenizer\nmodel = AutoModelForSequenceClassification.from_pretrained(\'bert-base-uncased\', num_labels=2)\ntokenizer = AutoTokenizer.from_pretrained(\'bert-base-uncased\')',
            },
            {
              n: '2',
              title: 'Prepare your dataset',
              body: 'from datasets import load_dataset, Dataset\n# Load from Hugging Face Hub:\ndataset = load_dataset(\'imdb\')\n# Or from your own data:\ndf = pd.read_csv(\'my_data.csv\')\ndataset = Dataset.from_pandas(df)\n# Tokenize:\ndef tokenize(examples): return tokenizer(examples[\'text\'], truncation=True, padding=True)\ndataset = dataset.map(tokenize, batched=True)',
            },
            {
              n: '3',
              title: 'Configure TrainingArguments',
              body: 'from transformers import TrainingArguments\nargs = TrainingArguments(\n    output_dir=\'./results\',\n    num_train_epochs=3,\n    per_device_train_batch_size=16,\n    learning_rate=2e-5,\n    evaluation_strategy=\'epoch\',\n    save_strategy=\'epoch\',\n    load_best_model_at_end=True,\n    report_to=\'wandb\',  # automatic W&B logging\n    run_name=\'my-experiment-01\',\n)',
            },
            {
              n: '4',
              title: 'Create Trainer and train',
              body: 'from transformers import Trainer, DataCollatorWithPadding\ntrainer = Trainer(\n    model=model,\n    args=args,\n    train_dataset=dataset[\'train\'],\n    eval_dataset=dataset[\'test\'],\n    tokenizer=tokenizer,\n    data_collator=DataCollatorWithPadding(tokenizer),\n)\ntrainer.train()  # Training starts — W&B logs everything',
            },
            {
              n: '5',
              title: 'Save and push to Hub',
              body: '# Save locally:\ntrainer.save_model(\'./final-model\')\n# Or push to Hugging Face Hub (share publicly or privately):\ntrainer.push_to_hub(\'your-username/my-fine-tuned-bert\')\n# Now anyone can load your model with from_pretrained(\'your-username/my-fine-tuned-bert\')',
            },
          ]} />
        </Block>

        {/* Weights & Biases */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Weights & Biases — experiment tracking" color={color} />
          <p style={P(sub)}>Training a model without experiment tracking is like cooking without tasting — you make changes but cannot tell what improved and what hurt. W&B solves this by automatically recording every metric, every hyperparameter, and every artifact from every training run. Two runs trained side by side with different learning rates? W&B overlays their loss curves so you see exactly which one converged better and when.</p>
          <CardGrid color={color} dark={dark} border={border} items={[
            { name: 'Run tracking', desc: 'Every training run is automatically logged with loss, accuracy, epoch, and custom metrics. Runs are timestamped, named, and searchable. Never lose a training run\'s results again.' },
            { name: 'Loss curve visualization', desc: 'Live interactive charts as training progresses. Watch training loss, validation loss, and learning rate in real time. Spot overfitting the moment validation loss starts rising.' },
            { name: 'Hyperparameter sweeps', desc: 'Automatically search for the best learning rate, batch size, dropout, and other hyperparameters using Bayesian optimization, grid search, or random search. W&B runs many experiments and shows you which configuration wins.' },
            { name: 'Artifacts', desc: 'Version and store datasets and model checkpoints. Every checkpoint is linked to the exact training run that produced it. Reproducibility across team members and months of experiments.' },
            { name: 'Reports', desc: 'Shareable interactive documents combining plots, metrics, and text. Perfect for presenting ML experiment results to instructors, teammates, or in portfolio writeups.' },
            { name: 'Model registry', desc: 'Promote the best checkpoint from experiments to a registered model version. Track which model is deployed in production and its training lineage.' },
          ]} />
        </Block>

        {/* Free GPU platforms */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Free GPU platforms for students" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Google Colab', badge: 'Most accessible', body: 'Free T4 GPU (16GB VRAM), 15-30 hours/week. Disconnect and your session closes — use checkpointing to save progress. Pro ($9.99/mo) gives more GPU time and A100 access. Best starting point.' },
            { label: 'Kaggle Notebooks', badge: 'Best free tier', body: 'Free P100 GPU (16GB VRAM), 30 hours/week GPU quota. Longer session limits than free Colab. Zero credit card needed. Competitions provide additional GPU. Best sustained free GPU for students.' },
            { label: 'Lightning.ai', badge: 'Modern MLOps environment', body: 'Free tier with Hugging Face integration built in. Studio environment designed for ML workflows. Good for teams. Less setup than raw Colab for Trainer-based workflows.' },
          ]} />
        </Block>

        {/* When W&B matters most */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="When W&B matters most" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Comparing hyperparameter configurations', body: 'Run the same model with 5 different learning rates. W&B overlays the loss curves on one chart. The best learning rate is immediately visible — no manual tracking needed.' },
            { n: '2', title: 'Debugging training problems', body: 'Loss spiking? Validation accuracy plateauing? W&B shows you exactly when it happened, what the learning rate was at that moment, and what batch the spike occurred on. Diagnose in minutes instead of hours.' },
            { n: '3', title: 'Making experiments reproducible', body: 'A W&B run captures the exact code version, random seed, library versions, and configuration that produced a result. Recreate any past result exactly — or share a run with a teammate and have them reproduce it.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Fine-tune any classification or generation model using Hugging Face Trainer in under 50 lines of code',
            "Track every experiment automatically — loss curves, accuracy, hyperparameters — with no extra code beyond report_to='wandb'",
            'Run systematic hyperparameter sweeps to find the optimal learning rate and batch size automatically',
            "Save model checkpoints to Hugging Face Hub and load them anywhere with from_pretrained()",
            'Build a reproducible ML experiment workflow that produces results you can explain and share',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}`, marginBottom: '0.5rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 7 }} />
              <span style={{ fontSize: '0.85rem', color: sub, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Train and Track a Text Classifier</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Pick a binary text classification task you care about: spam vs not spam, positive vs negative reviews, technical vs non-technical questions. Find or create 200-500 labeled examples. Fine-tune distilbert-base-uncased (fast, runs on free Colab T4) using the Trainer API. Enable W&B logging. Run 3 experiments with different learning rates (1e-5, 2e-5, 5e-5). Compare the loss curves in W&B. Share your W&B report URL. This is how ML engineers actually work.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Set up W&B account', body: "wandb.ai → free signup → pip install wandb → wandb login (paste API key from Settings). That is all the setup. W&B logs automatically once report_to='wandb' is in TrainingArguments." },
            { n: '2', title: 'Prepare 200-500 labeled examples', body: "Format as CSV with 'text' and 'label' columns. Label 0 = class A, label 1 = class B. Quality matters more than quantity — 200 clean examples often beats 2000 noisy ones. Real labeled data you have or care about." },
            { n: '3', title: 'Run 3 experiments on Colab', body: 'Open a Colab notebook. Copy the Trainer setup. Change only the learning_rate and run_name for each experiment. Run all 3. Kaggle gives 30 free GPU hours/week if Colab runs out.' },
            { n: '4', title: 'Compare in W&B and write up', body: 'Open W&B → your project → Runs. Compare the 3 run loss curves side by side. Which learning rate converged fastest? Which had the best validation accuracy? Write 3 sentences summarizing what you learned. This is your first ML experiment report.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Google Colab free + Kaggle free + W&B free tier</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>When your training loss decreases steadily but validation loss increases or plateaus after a few epochs, that is overfitting — the model is memorizing training examples instead of learning general patterns. Solutions in order of effort: (1) add dropout to the model head, (2) reduce the number of training epochs (early stopping), (3) collect more diverse training data. W&B makes overfitting visible the moment it starts — watch the gap between train and eval loss in real time.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/foundations/fine-tuning')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ArrowLeft size={14} /> Fine-Tuning
          </button>
          <button onClick={() => navigate('/ai-lab/foundations/benchmark-evals')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Benchmarks &amp; Evals <ChevronRight size={14} />
          </button>
        </div>

      </div>
      <ScrollToTop />
    </div>
  )
}

function Block({ title, titleColor, dark, border, card, children }) {
  return (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '1.375rem', backdropFilter: 'blur(8px)', marginBottom: '1.25rem' }}>
      {title && <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.14em', color: titleColor, textTransform: 'uppercase', paddingBottom: '0.75rem', marginBottom: '1rem', borderBottom: `1px solid ${titleColor}20` }}>{title}</div>}
      {children}
    </div>
  )
}

function VideoCard({ v, dark, txt, muted }) {
  return (
    <a href={v.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1.125rem', borderRadius: 11, textDecoration: 'none', background: dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.16)', marginBottom: '0.625rem', transition: 'background 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.09)'}
      onMouseLeave={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)'}
    >
      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Play size={13} color="#fff" fill="#fff" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: txt }}>{v.label}</div>
        {(v.dur || v.note) && <div style={{ fontSize: '0.7rem', color: muted, marginTop: 2 }}>{[v.dur, v.note].filter(Boolean).join(' · ')}</div>}
      </div>
      <ExternalLink size={12} color={muted} />
    </a>
  )
}
