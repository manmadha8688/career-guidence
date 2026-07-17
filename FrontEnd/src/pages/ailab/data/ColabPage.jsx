import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F9AB00'

export default function ColabPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Data & Analysis">
      <ToolHeader
        icon="📔"
        title="Google Colab — Free Cloud Jupyter Notebooks with GPU"
        tagline="Write and run Python in the browser — free NVIDIA GPU, zero setup, nothing to install"
        badges={[['✓ FREE tier', '#4ADE80'], ['colab.research.google.com', color], ['Free T4 GPU', 'var(--text-muted)']]}
        overview={"Google Colaboratory (Colab) is a free, hosted Jupyter notebook service that runs entirely in your browser — no installation, no configuration, and free access to a cloud GPU. You sign in with a Google account, open a notebook, and you are writing and running Python instantly, with your files saved to Google Drive. The reason Colab is essential for Indian students is the free GPU: machine learning, deep learning, and fine-tuning need expensive hardware most students cannot afford, and Colab hands you a free NVIDIA T4 (16GB VRAM) in two clicks. That means you can train neural networks, run Stable Diffusion, fine-tune small LLMs with LoRA/QLoRA, and transcribe audio with Whisper — all for ₹0. The free tier is deliberately limited (dynamic weekly GPU quotas, ~12-hour session cap, and no guaranteed availability at peak times), and Google does not publish exact numbers because they fluctuate with demand. But as a free GPU sandbox for learning and experiments, nothing beats it."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Google Colab Tutorial for Beginners', url: 'https://www.youtube.com/results?search_query=google+colab+tutorial+for+beginners', dur: '~15 min', note: 'Start here — what Colab is, opening a notebook, running cells, saving to Drive' },
            { label: 'How to Enable and Use the Free GPU in Google Colab', url: 'https://www.youtube.com/results?search_query=google+colab+free+gpu+tutorial', dur: '~10 min', note: 'The essential step — switch the runtime to GPU and verify with nvidia-smi' },
            { label: 'Fine-Tune an LLM for Free on Google Colab (LoRA/QLoRA)', url: 'https://www.youtube.com/results?search_query=fine+tune+llm+google+colab+free+gpu', dur: '~25 min', note: 'Real ML workflow — train a model on the free T4 GPU end to end' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why Colab is essential for students — free GPU" color={color} />
          <InfoBox color={color}>{"A single training-capable GPU costs more than most students can spend, and cloud GPUs are billed by the hour. Colab removes that barrier: sign in with any Google account and you get a free NVIDIA T4 (16GB VRAM) in the cloud, with about 12–13GB of system RAM. This is enough to train real deep learning models, run quantized 7B LLMs, generate images with Stable Diffusion, and fine-tune small models with LoRA — the exact hands-on work that ML and data science courses require, at zero cost."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>The trade-off for free is that the resources are not guaranteed. Colab uses dynamic usage limits that fluctuate with demand, so the free tier is best treated as a disposable experiment sandbox — not a place for a training run that must finish. Understanding these limits up front saves you from losing hours of work:</p>
          {[
            'Free NVIDIA T4 GPU (16GB VRAM) when available — switch it on via Runtime → Change runtime type → T4 GPU',
            'Sessions run for at most ~12 hours, and disconnect after roughly 90 minutes of no interaction (idle timeout)',
            'Weekly GPU access is a dynamic quota (Google does not publish exact numbers) — heavy use can temporarily lock you out of GPUs',
            'Storage is ephemeral — files in the runtime vanish when the session ends; mount Google Drive to keep your work',
            'At peak demand you may get no GPU at all on the free tier — try again later or upgrade for priority access',
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
            { name: 'Zero Setup', desc: 'No Python install, no CUDA drivers, no package hell. Everything runs in the browser on a Google-managed VM. Popular libraries (NumPy, pandas, PyTorch, TensorFlow, scikit-learn) come pre-installed.' },
            { name: 'Free Cloud GPU / TPU', desc: 'Free NVIDIA T4 GPU (16GB VRAM), with TPUs sometimes available too. Enable via Runtime → Change runtime type. Verify the GPU with !nvidia-smi in a code cell.' },
            { name: 'Google Drive Integration', desc: 'Mount your Drive with a couple of lines to read datasets and save models, checkpoints, and outputs that survive after the session ends. Notebooks themselves auto-save to Drive.' },
            { name: 'Shareable Notebooks', desc: 'Share a notebook like a Google Doc — send a link, control view/edit access, and collaborate in real time. Perfect for group projects, assignments, and sharing reproducible experiments.' },
            { name: 'Shell + pip in cells', desc: 'Run any shell command by prefixing with ! — install packages (!pip install ...), clone repos (!git clone ...), or download datasets. Full flexibility inside the notebook.' },
            { name: 'Gemini in Colab', desc: 'Colab has built-in AI code assistance powered by Gemini — generate code from a prompt, explain errors, and autocomplete. A helpful way to learn as you write real code.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — your first GPU notebook" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Open Colab', body: 'Go to colab.research.google.com and sign in with any Google account. Click "New notebook". You now have a live Python environment in your browser — no credit card, no install.' },
            { n: '2', title: 'Enable the free GPU', body: 'Menu → Runtime → Change runtime type → select "T4 GPU" → Save. This attaches a free NVIDIA T4. Default is CPU-only, so this step is essential before any ML work.' },
            { n: '3', title: 'Verify the GPU', body: 'In a code cell run: !nvidia-smi — this prints the GPU details (you should see a Tesla T4, 16GB). Also try: import torch; print(torch.cuda.is_available()) — it should print True.' },
            { n: '4', title: 'Mount Google Drive', body: 'from google.colab import drive\ndrive.mount(\'/content/drive\') — authorize when prompted. Now /content/drive/MyDrive is your persistent storage for datasets, models, and outputs.' },
            { n: '5', title: 'Install what you need', body: 'The common libraries are pre-installed. For anything else: !pip install transformers accelerate bitsandbytes — packages install into the current session (you re-install after a fresh session).' },
            { n: '6', title: 'Run, save, and export', body: 'Press Shift+Enter to run a cell. Notebooks auto-save to Drive. To share, click "Share" (like a Google Doc), or File → Download → .ipynb to keep a local copy or push to GitHub.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Free vs Pro vs Pro+ — which tier do you need?" color={color} />
          <Compare color={color} items={[
            { label: 'Free tier', badge: '₹0 — best for learning', body: 'Free T4 GPU when available, ~12-hour session cap, aggressive idle timeout, and a dynamic weekly GPU quota. No credit card. Perfect for coursework, prototyping, small fine-tunes, and experiments. The right starting point for every student.' },
            { label: 'Colab Pro', badge: 'Around $10/month', body: 'Priority access to faster GPUs (T4/L4), more RAM, longer 24-hour sessions, and background execution — governed by a compute-unit balance. Worth it if the free GPU keeps getting taken at peak times or your runs need to last longer.' },
            { label: 'Colab Pro+', badge: 'Around $50/month', body: 'Higher compute-unit allocation and priority access to premium GPUs like the A100. For heavier training jobs. Note: even paid plans revert to free-tier limits once your compute units run out — Google always states availability may change.' },
            { label: 'Pay As You Go', badge: 'No subscription', body: 'Buy compute units as needed (e.g. ~$10 for 100 units) without a monthly plan. Good if you only occasionally need a powerful GPU and prefer not to subscribe. Units are consumed faster on premium GPUs like the A100.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Colab vs Kaggle vs a local setup" color={color} />
          <Compare color={color} items={[
            { label: 'Google Colab', badge: 'Most flexible free GPU', body: 'Best browser notebook experience, deep Google Drive integration, shareable like a Doc, and Gemini code assistance. GPU limits are dynamic and unpublished. Ideal general-purpose free GPU environment for students.' },
            { label: 'Kaggle Notebooks', badge: 'Published weekly quota', body: 'Kaggle gives a clear ~30 GPU hours/week (plus TPU hours) — predictable quota, built-in datasets, and competitions. Slightly more rigid environment. Great when you want a known, guaranteed weekly GPU budget for a project.' },
            { label: 'Local machine', badge: 'Full control, needs a GPU', body: 'Running Jupyter locally means no session limits and full control — but you need your own GPU (expensive) for deep learning, and setup (Python, CUDA, drivers) is real work. Best once you outgrow free cloud limits.' },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Train an Image Classifier on the Free GPU</span></div>
          <p className="tool-layout-task__desc">Train a real deep learning model end to end on Colab's free T4 GPU — the classic hands-on ML project that would be painfully slow without a GPU. You will load a dataset, train a small convolutional neural network (or fine-tune a pretrained model), and save the trained weights to Google Drive. This proves you can do serious ML work for ₹0.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Set up a GPU notebook', body: 'Open colab.research.google.com → New notebook. Runtime → Change runtime type → T4 GPU. Run !nvidia-smi to confirm the GPU is attached. Mount Drive so your model survives the session.' },
            { n: '2', title: 'Load a dataset', body: 'Use a built-in dataset to keep it simple: from torchvision import datasets — load CIFAR-10 or Fashion-MNIST. Or upload your own images to Drive and load them. Explore a few samples so you understand the data.' },
            { n: '3', title: 'Build and train a model', body: 'Define a small CNN in PyTorch (or use a pretrained ResNet and fine-tune it). Move the model and data to the GPU with .to("cuda"). Train for several epochs — watch how much faster the GPU is than CPU.' },
            { n: '4', title: 'Evaluate and save', body: 'Measure accuracy on a held-out test set. Then torch.save(model.state_dict(), "/content/drive/MyDrive/model.pth") so the trained weights persist in Drive after the session ends.' },
            { n: '5', title: 'Share your notebook', body: 'Click "Share" and set link access, or File → Save a copy to GitHub. You now have a reproducible, shareable ML project — perfect for a portfolio, an assignment, or your hunter profile.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — Google Colab free tier gives you a T4 GPU at ₹0; only a Google account is needed</span></div>
        </div>
        <ProTip>
        Always checkpoint long runs to Google Drive. Because free Colab sessions can disconnect after ~12 hours or ~90 minutes of inactivity, a training job that saves nothing can lose everything. Save your model weights and optimizer state to /content/drive/MyDrive every epoch (or every few hundred steps), and write your code to resume from the latest checkpoint if a session dies. Also keep the browser tab active — a quick interaction now and then avoids the idle timeout. Treat the free GPU as powerful but temporary, and design your notebook so a disconnect costs you minutes, not hours.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/data/modal', label: 'Modal' }}
        next={{ path: '/ai-lab/data/kaggle', label: 'Kaggle' }}
      />
    </ToolPageShell>
  )
}
