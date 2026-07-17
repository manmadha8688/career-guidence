import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#20BEFF'

export default function KagglePage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Data & Analysis">
      <ToolHeader
        icon="🥇"
        title="Kaggle — Free GPU Notebooks, Datasets & Competitions"
        tagline="The world's data science community — free cloud GPU/TPU, thousands of datasets, and real competitions"
        badges={[['✓ FREE', '#4ADE80'], ['kaggle.com', color], ['~30 GPU hrs/week', 'var(--text-muted)']]}
        overview={"Kaggle (owned by Google) is the largest data science and machine learning community in the world — and one of the most valuable free resources a student can use. It bundles four things into one free account: cloud notebooks with a published free GPU/TPU quota, a huge library of ready-to-use datasets, real machine learning competitions with prizes, and free hands-on micro-courses (Kaggle Learn). Unlike Colab's dynamic and unpublished limits, Kaggle gives a clear weekly budget — roughly 30 GPU hours per week (NVIDIA P100 or dual T4) and about 20 TPU hours per week — which makes it easy to plan a project. For Indian students, Kaggle is where you learn by doing: grab a dataset, open a GPU notebook, try a competition, and build a public portfolio of notebooks that recruiters actually look at. You need to verify your phone number once to unlock the free accelerators."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Kaggle for Beginners — Full Walkthrough', url: 'https://www.youtube.com/results?search_query=kaggle+for+beginners+tutorial', dur: '~20 min', note: 'Tour of Kaggle — notebooks, datasets, competitions, and how it all fits together' },
            { label: 'How to Use Kaggle Notebooks with Free GPU', url: 'https://www.youtube.com/results?search_query=kaggle+notebooks+free+gpu+tutorial', dur: '~15 min', note: 'Enable the free GPU/TPU, attach a dataset, and run your first notebook' },
            { label: 'Your First Kaggle Competition — Titanic', url: 'https://www.youtube.com/results?search_query=kaggle+titanic+competition+tutorial', dur: '~30 min', note: 'The classic starter competition — from data to your first leaderboard submission' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Four free tools in one account" color={color} />
          <InfoBox color={color}>{"Kaggle is not just free GPUs — it is a complete learning ecosystem. Notebooks give you cloud compute with a clear weekly quota. Datasets give you thousands of real, ready-to-analyze files with no download hassle. Competitions give you real problems, a leaderboard, and a reason to improve. Kaggle Learn gives you free, hands-on micro-courses in Python, pandas, ML, deep learning, and SQL. Together they take you from zero to a public portfolio of work — all free, all in the browser."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>The free accelerator quota is Kaggle's standout feature for students because it is published and predictable — you always know roughly how much GPU time you have this week. Here is exactly what the free tier gives you:</p>
          {[
            '~30 GPU hours per week — NVIDIA Tesla P100 (16GB) or dual T4 GPUs, resetting weekly',
            '~20 TPU hours per week (TPU v3-8) for TensorFlow/JAX workloads',
            'Sessions run up to ~12 hours (GPU) or ~9 hours (TPU) each, with ~20GB writable disk per session',
            'Phone verification is required once to unlock the free accelerators — a one-time step',
            'Turn accelerators OFF when not training so you do not burn your weekly quota on idle time',
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
            { name: 'Free GPU / TPU Notebooks', desc: 'Cloud Jupyter notebooks with a published ~30 GPU hrs/week and ~20 TPU hrs/week quota. Pre-installed data science stack, attachable datasets, and one-click accelerator switching.' },
            { name: 'Datasets', desc: 'Tens of thousands of public datasets on every topic — cricket stats, Indian census, movies, finance, medical, satellite imagery. Attach them to a notebook with no download; they mount read-only instantly.' },
            { name: 'Competitions', desc: 'Real ML problems with leaderboards, from beginner "Getting Started" (Titanic, House Prices) to prize competitions run by companies. The best way to sharpen skills against real evaluation.' },
            { name: 'Kaggle Learn', desc: 'Free, short, hands-on courses: Python, pandas, data visualization, intro/intermediate ML, deep learning, SQL, feature engineering. Each ends with a practical exercise and a certificate.' },
            { name: 'Models', desc: 'A hub of pre-trained models you can attach to notebooks directly — download-free access to popular open weights for fine-tuning and inference within your quota.' },
            { name: 'Public Portfolio', desc: 'Publish notebooks, earn upvotes and medals, and climb the tiers (Novice → Contributor → Expert → Master → Grandmaster). A public Kaggle profile is real, recruiter-visible proof of skill.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — from signup to first GPU run" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Create a free account', body: 'Go to kaggle.com and sign up (Google sign-in works). It is completely free. Then go to Settings → Phone Verification and verify your number — this one-time step unlocks the free GPU and TPU.' },
            { n: '2', title: 'Open a new notebook', body: 'Click Create → New Notebook. You get a cloud Jupyter environment in the browser with the data science stack pre-installed. No setup, no install.' },
            { n: '3', title: 'Turn on an accelerator', body: 'Open the right sidebar → Session options → Accelerator → choose "GPU P100" (or "GPU T4 x2" / "TPU"). Verify in a cell with !nvidia-smi. Remember: switch it off when you are not actively training.' },
            { n: '4', title: 'Attach a dataset', body: 'Click "Add Input" → search Kaggle Datasets → add one. It mounts read-only at /kaggle/input. Read it straight into pandas: import pandas as pd; df = pd.read_csv(\'/kaggle/input/<dataset>/file.csv\').' },
            { n: '5', title: 'Write outputs that persist', body: 'Save models, plots, and results to /kaggle/working — this is your writable folder that persists with the saved notebook version. Anything outside it is ephemeral.' },
            { n: '6', title: 'Save, version, and share', body: 'Click "Save Version" to run the whole notebook top-to-bottom and store a reproducible version. Make it public to add it to your portfolio, or keep it private while you iterate.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Kaggle vs Google Colab" color={color} />
          <Compare color={color} items={[
            { label: 'Quota clarity', badge: 'Kaggle is predictable', body: 'Kaggle publishes its quota (~30 GPU hrs/week, ~20 TPU hrs/week) so you can plan a project. Colab uses dynamic, unpublished limits that change with demand. For a project on a deadline, Kaggle\'s known budget is easier to work with.' },
            { label: 'Data workflow', badge: 'Kaggle wins for datasets', body: 'Kaggle datasets attach to a notebook with zero download — mounted read-only instantly. On Colab you typically upload files or mount Google Drive first. Kaggle is smoother when your project centers on public datasets.' },
            { label: 'Flexibility', badge: 'Colab is more open', body: 'Colab integrates with Google Drive, is easily shared like a Doc, and has Gemini code assistance. Kaggle\'s environment is a bit more locked down. Colab feels more like a free general-purpose GPU playground.' },
            { label: 'Extras', badge: 'Kaggle has more', body: 'Kaggle bundles competitions, Kaggle Learn courses, a models hub, and a public ranking system — a full learning-and-portfolio ecosystem. Colab is purely the notebook. Many students use both: Kaggle to learn/compete, Colab for ad-hoc GPU work.' },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Enter Your First Kaggle Competition</span></div>
          <p className="tool-layout-task__desc">Complete a beginner competition end to end and make a real leaderboard submission. This teaches the full ML workflow — load data, explore, engineer features, train a model, predict, and submit — and gives you a public notebook for your portfolio. The "Getting Started" competitions (Titanic or House Prices) never close and are built exactly for this.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Join a Getting Started competition', body: 'Go to kaggle.com/competitions → filter "Getting Started" → open "Titanic - Machine Learning from Disaster". Read the overview and the data description. Click "Join Competition".' },
            { n: '2', title: 'Open the starter notebook', body: 'From the competition page click "New Notebook". The competition data is auto-attached at /kaggle/input. Load train.csv and test.csv into pandas and look at the columns, types, and missing values.' },
            { n: '3', title: 'Explore and engineer features', body: 'Visualize survival by sex, class, and age. Handle missing values, encode categorical columns, and create a couple of new features. Good features matter more than a fancy model for beginners.' },
            { n: '4', title: 'Train a model', body: 'Fit a simple model — LogisticRegression or RandomForestClassifier from scikit-learn — on your features. Check accuracy with cross-validation. Iterate on features to improve the score.' },
            { n: '5', title: 'Submit to the leaderboard', body: 'Predict on the test set, build a submission.csv in the required format, and click "Submit Predictions". Your score appears on the public leaderboard. Save the notebook version and make it public.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — Kaggle is entirely free; the Titanic competition needs no GPU, so it costs zero quota</span></div>
        </div>
        <ProTip>
        Guard your weekly GPU quota — it is your most limited free resource. The single biggest mistake beginners make is leaving the GPU/TPU accelerator ON while writing code, cleaning data, or just thinking. That idle time silently eats your ~30 hours. Do all your data exploration and code-writing with the accelerator set to "None" (CPU), and only switch to GPU for the actual training cells. Check your remaining hours in the Session options panel. Used this way, ~30 hours a week is plenty for serious learning and small fine-tuning projects — waste it on idle sessions and you will run dry by Tuesday.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/data/colab', label: 'Google Colab' }}
        next={{ path: '/ai-lab/data/wandb', label: 'Weights & Biases' }}
      />
    </ToolPageShell>
  )
}
