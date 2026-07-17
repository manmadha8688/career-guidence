import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#FFBE00'

export default function WandbPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Data & Analysis">
      <ToolHeader
        icon="📈"
        title="Weights & Biases — Experiment Tracking for ML"
        tagline="Log every training run, compare experiments, and share results — the MLOps standard"
        badges={[['✓ FREE personal tier', '#4ADE80'], ['wandb.ai', color], ['Free for students', 'var(--text-muted)']]}
        overview={"Weights & Biases (W&B, wandb.ai) is the industry-standard tool for experiment tracking and MLOps — used across research labs and companies to make machine learning reproducible. When you train models, it is nearly impossible to remember which learning rate, batch size, or dataset produced your best result. W&B fixes this: add a few lines of code and every run's hyperparameters, metrics, loss curves, system stats (GPU/CPU usage), and output artifacts are automatically logged to a beautiful web dashboard where you can compare runs side by side. For students this is a genuine career skill — knowing W&B is expected in most ML roles — and it is free to use. There is a free Personal plan for individual, non-commercial projects, and, crucially, a free-forever academic license that unlocks the full Pro feature set (unlimited tracking hours, 200GB storage, up to 100 seats) for anyone with a valid academic email. W&B also covers modern GenAI/LLM work through Weave, its tracing and evaluation toolkit."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Weights & Biases in 10 Minutes — Quick Start', url: 'https://www.youtube.com/results?search_query=weights+and+biases+tutorial+quickstart', dur: '~10 min', note: 'Install, wandb.init, log metrics, and see your first run in the dashboard' },
            { label: 'Experiment Tracking with W&B (PyTorch)', url: 'https://www.youtube.com/results?search_query=weights+and+biases+pytorch+experiment+tracking', dur: '~20 min', note: 'Track a real PyTorch training loop and compare multiple runs' },
            { label: 'Hyperparameter Tuning with W&B Sweeps', url: 'https://www.youtube.com/results?search_query=weights+and+biases+sweeps+hyperparameter+tuning', dur: '~18 min', note: 'Automate hyperparameter search and visualize which settings win' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why experiment tracking matters" color={color} />
          <InfoBox color={color}>{"Machine learning is empirical — you run dozens of experiments changing one thing at a time. Without tracking, you end up with folders full of model files and no memory of which settings produced them. W&B automatically records the full context of every run: the hyperparameters you used, the metrics over time (loss, accuracy), system utilization, code version, and saved model artifacts. Months later you can open the dashboard, sort by best accuracy, and see exactly how that model was trained — fully reproducible."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>The best part for students is the cost: W&B is genuinely free for the way you will use it. Understanding the free options up front means you never hit a paywall for coursework or research:</p>
          {[
            'Free Personal plan — $0/month for individual, non-commercial projects (experiment tracking, registry, lineage)',
            'Free academic license — full Pro features free forever for students, professors, and postdocs with an academic email',
            'The academic plan includes unlimited tracked hours, 200GB cloud storage, and up to 100 seats — great for group research',
            'Just add a few lines of code — works with PyTorch, TensorFlow, Keras, scikit-learn, Hugging Face, and more',
            'Pairs perfectly with free GPUs — log runs from Google Colab or Kaggle notebooks straight to your W&B dashboard',
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
            { name: 'Experiment Tracking', desc: 'Log hyperparameters and metrics with wandb.init() and wandb.log(). Every run appears in an interactive dashboard with live loss/accuracy curves you can compare across runs.' },
            { name: 'Sweeps', desc: 'Automated hyperparameter search — define a search space and a strategy (grid, random, or Bayesian) and W&B orchestrates the runs, then visualizes which settings produced the best results.' },
            { name: 'Artifacts & Lineage', desc: 'Version datasets and model files as Artifacts. W&B tracks lineage — which dataset version and code produced which model — so your pipeline is fully reproducible and auditable.' },
            { name: 'Reports', desc: 'Turn results into shareable, interactive reports that mix live charts, tables, and text. Perfect for project write-ups, thesis documentation, or sharing findings with a professor or team.' },
            { name: 'Tables', desc: 'Log and explore rich data — images, predictions, audio, and text — in interactive tables. Inspect exactly which examples your model got wrong, an essential debugging step.' },
            { name: 'Weave (GenAI/LLM)', desc: 'For LLM apps, Weave traces every call, logs prompts and responses, and runs evaluations/scorers — bringing the same rigor of experiment tracking to prompt engineering and RAG pipelines.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — track your first run" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Create a free account', body: 'Sign up at wandb.ai. Use your academic (college) email so you can later apply for the free academic Pro license. Confirm your email and you are in.' },
            { n: '2', title: 'Install and log in', body: 'pip install wandb\nThen run: wandb login — paste your API key from wandb.ai/authorize when prompted. On Colab/Kaggle, the same login works inside a notebook cell.' },
            { n: '3', title: 'Initialize a run', body: 'import wandb\nwandb.init(project="my-first-project", config={"lr": 0.001, "epochs": 10}) — this creates a run and logs your hyperparameters (config) automatically.' },
            { n: '4', title: 'Log metrics during training', body: 'Inside your training loop: wandb.log({"loss": loss, "accuracy": acc}) each step or epoch. W&B streams these to the dashboard live — you watch the curves update as the model trains.' },
            { n: '5', title: 'Open your dashboard', body: 'Go to wandb.ai and open your project. You will see loss/accuracy charts, system metrics (GPU/CPU/memory), and your config. Run the training a few times with different settings.' },
            { n: '6', title: 'Compare runs & apply for academic Pro', body: 'Select multiple runs to overlay their curves and find the best one. Then visit the pricing page and apply for the free academic license with your college email to unlock all Pro features.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="W&B plans — free options explained" color={color} />
          <Compare color={color} items={[
            { label: 'Free (Personal)', badge: '$0 — personal projects', body: 'For individual, non-commercial use: experiment tracking, registry, and lineage. Corporate use is not allowed on this tier. Perfect for learning, personal projects, and coursework where you are not part of a company.' },
            { label: 'Academic (Free forever)', badge: 'Best for students', body: 'A free Pro license for students, professors, and postdocs whose research is not tied to a for-profit. Includes all Pro features, unlimited tracked hours, 200GB storage, up to ~25GB/mo Weave ingestion, and up to 100 seats. Apply with an academic email — this is the one to get.' },
            { label: 'Pro', badge: 'Teams — 30-day trial', body: 'For professionals and small teams, billed monthly or annually. More seats and higher usage limits. Starts with a 30-day free trial. Relevant once you are working at a company rather than studying.' },
            { label: 'Enterprise', badge: 'Security & compliance', body: 'For large organizations that need self-hosting, SSO, advanced security, and compliance controls. Custom pricing. Not something students need — listed here so you know the full ladder.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="W&B vs the alternatives" color={color} />
          <Compare color={color} items={[
            { label: 'Weights & Biases', badge: 'The market standard', body: 'The most widely used and polished experiment-tracking platform, with Sweeps, Artifacts, Reports, and Weave for LLMs. Hosted by default (nothing to run). Free for personal and academic use. Knowing W&B is a recognized, resume-worthy skill.' },
            { label: 'TensorBoard', badge: 'Free & local', body: 'Google\'s built-in visualization tool for TensorFlow/PyTorch. Free and simple, but local-first with no cloud collaboration, no sweeps orchestration, and weaker run comparison across many experiments. Great for quick local checks.' },
            { label: 'MLflow', badge: 'Open source, self-host', body: 'Open-source tracking you host yourself — strong on the model registry and deployment lifecycle. More setup and infrastructure to manage. Popular in companies that want to own their stack rather than use a hosted service.' },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Track and Compare a Real Training Run</span></div>
          <p className="tool-layout-task__desc">Instrument a real model training with W&B and use the dashboard to find your best configuration. This is the exact workflow ML engineers use daily, and it produces a shareable report you can put in your portfolio or thesis. Run it on a free Colab or Kaggle GPU so the whole project costs ₹0.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Set up on a free GPU', body: 'Open a Google Colab or Kaggle GPU notebook. pip install wandb and run wandb.login() with your API key. Grab a small dataset (e.g. Fashion-MNIST or CIFAR-10) and a simple PyTorch/Keras model.' },
            { n: '2', title: 'Instrument your training loop', body: 'Call wandb.init(project="wandb-project", config={...}) with your hyperparameters. In the loop, wandb.log({"train_loss": ..., "val_acc": ...}) each epoch. Save the trained model as a W&B Artifact.' },
            { n: '3', title: 'Run several experiments', body: 'Train 4–5 times, changing one thing each time — learning rate, batch size, or optimizer. Each becomes a separate run in your project. Do not touch anything else so comparisons are fair.' },
            { n: '4', title: 'Compare in the dashboard', body: 'On wandb.ai, overlay all runs\' validation-accuracy curves. Use the runs table to sort by best accuracy. Identify which hyperparameters produced your top model — this is the core value of tracking.' },
            { n: '5', title: 'Write a W&B Report', body: 'Create a Report that embeds your live charts and a short explanation of what you tried and what won. Share the link. You now have a professional, reproducible ML experiment write-up.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — W&B free Personal tier (or free academic Pro) plus a free Colab/Kaggle GPU = ₹0 total</span></div>
        </div>
        <ProTip>
        Apply for the free academic license the moment you have a college email — it is the single best-value upgrade a student can get. The free Personal tier is fine for learning, but the academic license unlocks the full Pro feature set (Sweeps at scale, more storage, team seats, unlimited tracked hours) at zero cost, forever, as long as your work is not tied to a for-profit company. Sign up on wandb.ai with your institutional email, start the 30-day trial, then convert it on the W&B academic application page. Do this early so your entire degree's worth of experiments lives under the full-featured plan — and so a group research project can share one team with up to 100 seats.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/data/kaggle', label: 'Kaggle' }}
        next={{ path: '/ai-lab/data/julius', label: 'Julius AI' }}
      />
    </ToolPageShell>
  )
}
