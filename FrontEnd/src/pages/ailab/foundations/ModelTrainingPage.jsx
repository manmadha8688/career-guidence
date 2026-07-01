import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#8B5CF6'

export default function ModelTrainingPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="AI Foundations">
      <ToolHeader
        icon="🏋️"
        title="Model Training — From Experiments to Production-Ready Models"
        tagline="Hugging Face Trainer + Weights &amp; Biases for the complete ML training workflow"
        badges={[['✓ FREE Tier', '#4ADE80'], ['Colab + Kaggle GPU', color], ['Hugging Face + W&B', 'var(--text-muted)']]}
        overview={"Model training is where AI models actually get built — where raw data becomes a system that can predict, generate, or classify. For students, the most practical form is fine-tuning: taking a pre-trained model like BERT or Llama 3 and training it further on your own labeled data to adapt it for a specific task. Hugging Face's Trainer class handles the entire training loop (gradient updates, checkpointing, evaluation, mixed precision) so you write the configuration, not the loop. Weights &amp; Biases adds the observability layer — every training run is automatically logged with loss curves, metrics, hyperparameters, and visualizations, making experiments reproducible and comparable. Together, these two tools represent how professional ML teams actually train models in 2025."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'LLM Fine-Tuning 08: Master Hugging Face in 3 Hours | Full Crash Course 2025', url: 'https://www.youtube.com/watch?v=SPNaP4ik9a4', dur: '3 hrs', note: 'Comprehensive Hugging Face Trainer crash course' },
            { label: 'Fine-Tuning with Hugging Face Trainer', url: 'https://www.youtube.com/watch?v=L6Dr8AFXMd8', dur: 'Hands-on', note: 'Hands-on Trainer walkthrough — practical end to end' },
            { label: 'Weights & Biases W&B: Quick Start Tutorial! (Log Metrics & Models FAST)', url: 'https://www.youtube.com/watch?v=iq8NFthBffM', dur: 'Quick start', note: 'W&B quickstart — set up experiment tracking in minutes' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="The three paths — pre-trained, fine-tune, train from scratch" color={color} />
          <InfoBox color={color}>Most students and developers never need to train a model from scratch. 99% of real-world ML work uses pre-trained models via APIs (fastest, no code) or fine-tuned models (a few hours, your data). Training from scratch costs hundreds of thousands of dollars in compute and requires months of engineering — this is what OpenAI, Google, and Meta do. Your goal is to know when each approach is right, not to do all three.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The decision is straightforward: use a pre-trained model via API until you hit a quality ceiling. If the model consistently fails at your specific task despite good prompting, fine-tune. If fine-tuning cannot achieve the quality you need — usually because no relevant pre-trained model exists for your domain — then you consider training from scratch, with appropriate compute and budget. For most student and production use cases, the answer stops at fine-tuning.</p>
        </Block>
        <Block>
          <SubHead label="Hugging Face Trainer — the training loop, handled" color={color} />
          <Steps color={color} items={[
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
        <Block>
          <SubHead label="Weights & Biases — experiment tracking" color={color} />
          <p className="tool-layout-block__para">Training a model without experiment tracking is like cooking without tasting — you make changes but cannot tell what improved and what hurt. W&B solves this by automatically recording every metric, every hyperparameter, and every artifact from every training run. Two runs trained side by side with different learning rates? W&B overlays their loss curves so you see exactly which one converged better and when.</p>
          <CardGrid color={color} items={[
            { name: 'Run tracking', desc: 'Every training run is automatically logged with loss, accuracy, epoch, and custom metrics. Runs are timestamped, named, and searchable. Never lose a training run\'s results again.' },
            { name: 'Loss curve visualization', desc: 'Live interactive charts as training progresses. Watch training loss, validation loss, and learning rate in real time. Spot overfitting the moment validation loss starts rising.' },
            { name: 'Hyperparameter sweeps', desc: 'Automatically search for the best learning rate, batch size, dropout, and other hyperparameters using Bayesian optimization, grid search, or random search. W&B runs many experiments and shows you which configuration wins.' },
            { name: 'Artifacts', desc: 'Version and store datasets and model checkpoints. Every checkpoint is linked to the exact training run that produced it. Reproducibility across team members and months of experiments.' },
            { name: 'Reports', desc: 'Shareable interactive documents combining plots, metrics, and text. Perfect for presenting ML experiment results to instructors, teammates, or in portfolio writeups.' },
            { name: 'Model registry', desc: 'Promote the best checkpoint from experiments to a registered model version. Track which model is deployed in production and its training lineage.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Free GPU platforms for students" color={color} />
          <Compare color={color} items={[
            { label: 'Google Colab', badge: 'Most accessible', body: 'Free T4 GPU (16GB VRAM), 15-30 hours/week. Disconnect and your session closes — use checkpointing to save progress. Pro ($9.99/mo) gives more GPU time and A100 access. Best starting point.' },
            { label: 'Kaggle Notebooks', badge: 'Best free tier', body: 'Free P100 GPU (16GB VRAM), 30 hours/week GPU quota. Longer session limits than free Colab. Zero credit card needed. Competitions provide additional GPU. Best sustained free GPU for students.' },
            { label: 'Lightning.ai', badge: 'Modern MLOps environment', body: 'Free tier with Hugging Face integration built in. Studio environment designed for ML workflows. Good for teams. Less setup than raw Colab for Trainer-based workflows.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="When W&B matters most" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Comparing hyperparameter configurations', body: 'Run the same model with 5 different learning rates. W&B overlays the loss curves on one chart. The best learning rate is immediately visible — no manual tracking needed.' },
            { n: '2', title: 'Debugging training problems', body: 'Loss spiking? Validation accuracy plateauing? W&B shows you exactly when it happened, what the learning rate was at that moment, and what batch the spike occurred on. Diagnose in minutes instead of hours.' },
            { n: '3', title: 'Making experiments reproducible', body: 'A W&B run captures the exact code version, random seed, library versions, and configuration that produced a result. Recreate any past result exactly — or share a run with a teammate and have them reproduce it.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Fine-tune any classification or generation model using Hugging Face Trainer in under 50 lines of code',
            "Track every experiment automatically — loss curves, accuracy, hyperparameters — with no extra code beyond report_to='wandb'",
            'Run systematic hyperparameter sweeps to find the optimal learning rate and batch size automatically',
            "Save model checkpoints to Hugging Face Hub and load them anywhere with from_pretrained()",
            'Build a reproducible ML experiment workflow that produces results you can explain and share',
        ]} />
      </Block>
        <ProjectTask
        title={"Train and Track a Text Classifier"}
        description={"Pick a binary text classification task you care about: spam vs not spam, positive vs negative reviews, technical vs non-technical questions. Find or create 200-500 labeled examples. Fine-tune distilbert-base-uncased (fast, runs on free Colab T4) using the Trainer API. Enable W&B logging. Run 3 experiments with different learning rates (1e-5, 2e-5, 5e-5). Compare the loss curves in W&B. Share your W&B report URL. This is how ML engineers actually work."}
        costNote={"TOTAL COST: ₹0 — Google Colab free + Kaggle free + W&B free tier"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Set up W&B account', body: "wandb.ai → free signup → pip install wandb → wandb login (paste API key from Settings). That is all the setup. W&B logs automatically once report_to='wandb' is in TrainingArguments." },
            { n: '2', title: 'Prepare 200-500 labeled examples', body: "Format as CSV with 'text' and 'label' columns. Label 0 = class A, label 1 = class B. Quality matters more than quantity — 200 clean examples often beats 2000 noisy ones. Real labeled data you have or care about." },
            { n: '3', title: 'Run 3 experiments on Colab', body: 'Open a Colab notebook. Copy the Trainer setup. Change only the learning_rate and run_name for each experiment. Run all 3. Kaggle gives 30 free GPU hours/week if Colab runs out.' },
            { n: '4', title: 'Compare in W&B and write up', body: 'Open W&B → your project → Runs. Compare the 3 run loss curves side by side. Which learning rate converged fastest? Which had the best validation accuracy? Write 3 sentences summarizing what you learned. This is your first ML experiment report.' },
          ]} />
      </ProjectTask>
        <ProTip>
        When your training loss decreases steadily but validation loss increases or plateaus after a few epochs, that is overfitting — the model is memorizing training examples instead of learning general patterns. Solutions in order of effort: (1) add dropout to the model head, (2) reduce the number of training epochs (early stopping), (3) collect more diverse training data. W&B makes overfitting visible the moment it starts — watch the gap between train and eval loss in real time.
      </ProTip>
      <PageNavRow
        prev={undefined}
        next={{ path: '/ai-lab/foundations/benchmark-evals', label: 'Benchmarks &amp; Evals' }}
      />
    </ToolPageShell>
  )
}
