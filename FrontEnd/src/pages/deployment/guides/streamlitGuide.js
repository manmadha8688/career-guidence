export const STREAMLIT_GUIDE = [
  {
    phase: '01',
    title: 'What is Streamlit and why use it for ML projects?',
    color: '#FF4B4B',
    steps: [
      {
        label: 'Streamlit vs HF Spaces — choose the right platform first',
        isText: true,
        text: [
          'IMPORTANT: Read this before starting.',
          '',
          'Use Streamlit Community Cloud when:',
          '✅ Your model fits in 1GB RAM — this is the only real limit',
          '✅ Any sklearn, XGBoost, LightGBM model (small, 1–50MB)',
          '✅ Small PyTorch model (ResNet-18, MobileNet, custom CNN)',
          '✅ Small TensorFlow / Keras model',
          '✅ Pandas dashboard, EDA app, data analysis tool',
          '✅ CSV analysis tool, sales dashboard, business insights app',
          '✅ You want the simplest deployment — connect GitHub and live',
          '',
          'Use Hugging Face Spaces instead when:',
          '⚠️  Your model needs MORE than 1GB RAM',
          '⚠️  Large transformer models: BERT (~440MB model, 2–4GB RAM to run)',
          '⚠️  GPT-2, T5-large, RoBERTa-large — too much RAM for Streamlit Cloud',
          '⚠️  RAG, LangChain, LLM-powered apps (high memory usage)',
          '⚠️  You want AI/ML industry portfolio recognition (HF Spaces is standard)',
          '',
          'The decision is simple — it is about RAM, not framework:',
          '   Model fits in 1GB RAM  →  Streamlit Community Cloud',
          '   Model needs 2GB+ RAM  →  Hugging Face Spaces',
        ],
        note: 'Streamlit Cloud is not limited to sklearn — any ML or DL model works as long as it fits in 1GB RAM. A small PyTorch image classifier or Keras model deploys perfectly on Streamlit Cloud.',
      },
      {
        label: 'What Streamlit gives you — no HTML, no JavaScript, just Python',
        isText: true,
        text: [
          'Streamlit turns a Python script into a live interactive web app.',
          'No HTML. No CSS. No JavaScript. No Flask. No Django. Just Python.',
          '',
          'A Streamlit app can show:',
          '→ Input form — sliders, dropdowns, number fields, file uploader',
          '→ Prediction result — with confidence score',
          '→ Charts — Matplotlib, Plotly, Seaborn all work',
          '→ Dataset preview — interactive table with search/sort',
          '→ Model metrics — accuracy, precision, recall, AUC',
          '→ Business insights — from your EDA',
          '',
          'The ML deployment workflow:',
          '1. Train model in Jupyter Notebook or Python script',
          '2. Save model → model.pkl / model.joblib / model.json',
          '3. Create app.py using Streamlit',
          '4. Add requirements.txt',
          '5. Push safe code to GitHub',
          '6. Deploy on Streamlit Community Cloud',
          '7. Share live app URL on resume and LinkedIn',
          '',
          'Examples of Streamlit ML/DL projects:',
          '→ Customer churn predictor (sklearn RandomForest)',
          '→ House price predictor (XGBoost regression)',
          '→ Plant disease detection (small PyTorch CNN)',
          '→ Handwritten digit recognizer (TensorFlow/Keras CNN)',
          '→ Loan approval predictor (sklearn classification)',
          '→ Sales revenue dashboard (Pandas + Plotly)',
          '→ CSV data analysis tool — upload any CSV and explore',
          '→ Small image classifier (ResNet-18 / MobileNet)',
          '',
          'Streamlit Community Cloud free tier:',
          '✅ Free for public apps — great for student portfolio',
          '✅ Auto-deploys from GitHub on every push',
          '✅ No credit card needed',
          '',
          'Honest note:',
          '→ Apps sleep after inactivity — first visit wakes them (~30 seconds)',
          '→ Large deep learning models may exceed memory limits',
          '→ Not for heavy production or multi-user business apps',
        ],
        note: 'A live Streamlit ML app URL on your resume is worth far more than a Jupyter notebook. It shows you can go from model training to production deployment.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Before deployment — checklist',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Verify everything before touching GitHub or Streamlit Cloud',
        isText: true,
        text: [
          '✅ streamlit run app.py works locally',
          '   App opens at http://localhost:8501 without errors',
          '',
          '✅ Model file exists and loads correctly:',
          '   model.pkl (or model.joblib / model.json / model.pt)',
          '   Python confirms it loads: model = joblib.load("model.pkl")',
          '',
          '✅ Preprocessing objects saved:',
          '   scaler.pkl, encoder.pkl saved if used in training',
          '',
          '✅ requirements.txt exists and covers all imports in app.py',
          '',
          '✅ README.md explains what the project does',
          '',
          '✅ .gitignore excludes venv, .env, secrets.toml, __pycache__',
          '',
          '✅ No API keys, passwords, or secrets inside app.py',
          '',
          '✅ Dataset is safe to share:',
          '   Public dataset — fine to commit a small sample',
          '   Private/sensitive data — never push to GitHub',
          '',
          '✅ Model file is under 100MB',
          '   Check: ls -lh model.pkl (Mac/Linux) or dir model.pkl (Windows)',
          '   Over 100MB — see Phase 08 for alternatives',
          '',
          '✅ App uses @st.cache_resource for model loading',
          '   Without caching, model reloads on every user interaction',
          '',
          'Rule: If the app fails locally, it fails on Streamlit Cloud.',
          'Fix everything locally first.',
        ],
        note: 'Always test with "streamlit run app.py" before pushing to GitHub. Streamlit Cloud runs this exact command.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Recommended project structure',
    color: '#60A5FA',
    steps: [
      {
        label: 'How to organise your ML Streamlit project',
        isText: true,
        text: [
          'ml-streamlit-app/',
          '  app.py              ← main Streamlit entry point',
          '  train_model.py      ← model training script (run once locally)',
          '  model.pkl           ← saved trained model',
          '  scaler.pkl          ← saved preprocessing (if used)',
          '  encoder.pkl         ← saved label encoder (if used)',
          '  requirements.txt    ← packages list',
          '  README.md           ← project description',
          '  .gitignore          ← excludes venv, secrets, __pycache__',
          '  .env.example        ← placeholder vars (safe to commit)',
          '  notebooks/',
          '    model_training.ipynb  ← training notebook',
          '  data/',
          '    sample_data.csv   ← small public sample only',
          '  .streamlit/',
          '    secrets.toml      ← local secrets (NEVER commit)',
          '',
          'Key rules:',
          '→ app.py must be at the project root (Streamlit Cloud default)',
          '→ model.pkl must be accessible from app.py as "model.pkl"',
          '→ .streamlit/secrets.toml is for local secrets only — never push',
          '→ data/ should have only public sample data, not private datasets',
          '→ notebooks/ shows your work — great for GitHub portfolio',
          '→ train_model.py is run locally — NOT inside app.py',
        ],
        note: 'Never train the model inside app.py. Training runs every time a user interacts with the app. Save the trained model once and load it in app.py.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Train and save your ML model',
    color: '#4ADE80',
    steps: [
      {
        label: 'train_model.py — run this once locally to create model.pkl',
        isFile: true,
        fileName: 'train_model.py',
        commands: [
          `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score
import joblib

# Load your dataset
df = pd.read_csv("data/sample_data.csv")

# Define features and target — adapt to your dataset
X = df[["feature1", "feature2", "feature3"]]
y = df["target"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Fit scaler on training data only
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled  = scaler.transform(X_test)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# Evaluate
predictions = model.predict(X_test_scaled)
accuracy = accuracy_score(y_test, predictions)
print(f"Model accuracy: {accuracy:.2%}")

# Save model and preprocessor
joblib.dump(model,  "model.pkl")
joblib.dump(scaler, "scaler.pkl")
print("Saved: model.pkl and scaler.pkl")`,
        ],
        note: 'Run this once: python train_model.py. After it creates model.pkl and scaler.pkl, you never need to run it again. Your Streamlit app just loads these files.',
      },
      {
        label: 'Critical: always save preprocessing objects alongside the model',
        isText: true,
        text: [
          'The most common reason predictions are wrong in deployment:',
          '   The scaler/encoder was NOT saved — so the app creates a NEW one.',
          '   A new scaler has no knowledge of the training data distribution.',
          '   Predictions become random and useless.',
          '',
          'Always save EVERY object used in the training pipeline:',
          '',
          '   # If you used StandardScaler:',
          '   joblib.dump(scaler, "scaler.pkl")',
          '',
          '   # If you used LabelEncoder:',
          '   joblib.dump(encoder, "encoder.pkl")',
          '',
          '   # If you used OneHotEncoder:',
          '   joblib.dump(ohe, "ohe.pkl")',
          '',
          '   # If you used a custom mapping:',
          '   import json',
          '   with open("mappings.json", "w") as f:',
          '       json.dump(your_mapping_dict, f)',
          '',
          'Load ALL of them in app.py:',
          '   model  = joblib.load("model.pkl")',
          '   scaler = joblib.load("scaler.pkl")',
          '   encoder = joblib.load("encoder.pkl")',
          '',
          'The input data in app.py must go through the EXACT same',
          'preprocessing steps as the training data.',
        ],
        note: 'Rule: Whatever you called on X_train (fit_transform, fit, encode), save it. The app must call transform (not fit_transform) on user input.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Model saving methods by library',
    color: '#F59E0B',
    steps: [
      {
        label: 'Save and load patterns for each ML library',
        isText: true,
        text: [
          'scikit-learn (recommended — use joblib):',
          '   import joblib',
          '   joblib.dump(model, "model.pkl")    # save',
          '   model = joblib.load("model.pkl")   # load',
          '',
          'XGBoost:',
          '   model.save_model("model.json")          # save (preferred)',
          '   model.load_model("model.json")          # load',
          '',
          'PyTorch (state_dict method — safer for deployment):',
          '   torch.save(model.state_dict(), "model.pt")              # save',
          '   model.load_state_dict(torch.load("model.pt",',
          '     map_location="cpu"))                                   # load',
          '   model.eval()',
          '   # Note: model architecture class must be imported in app.py too',
          '',
          'TensorFlow/Keras:',
          '   model.save("model.keras")                    # save',
          '   import tensorflow as tf',
          '   model = tf.keras.models.load_model("model.keras")  # load',
          '',
          'Also save:',
          '   joblib.dump(label_encoder, "label_encoder.pkl")',
          '   joblib.dump(feature_names, "features.pkl")  # list of column names',
          '',
          'Test loading before deployment:',
          '   python -c "import joblib; m = joblib.load(\'model.pkl\'); print(type(m))"',
          '   If this prints the model class name — it works.',
        ],
        note: 'After saving, always test loading in a fresh Python session before pushing to GitHub. If loading fails locally, it will fail on Streamlit Cloud.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Create app.py — your Streamlit ML app',
    color: '#EC4899',
    steps: [
      {
        label: 'Complete app.py — ML prediction app template',
        isFile: true,
        fileName: 'app.py',
        commands: [
          `import streamlit as st
import numpy as np
import joblib

# ── Page config ────────────────────────────────────────────────
st.set_page_config(
    page_title="ML Prediction App",
    page_icon="🤖",
    layout="centered"
)

# ── Load model and preprocessor ───────────────────────────────
# @st.cache_resource: loads ONCE, cached across all user sessions
# Without this, model reloads every time a user touches an input
@st.cache_resource
def load_model():
    model  = joblib.load("model.pkl")
    scaler = joblib.load("scaler.pkl")  # remove if no scaler was used
    return model, scaler

model, scaler = load_model()

# ── App title and description ─────────────────────────────────
st.title("🤖 ML Prediction App")
st.write(
    "Enter values below. The app applies the same preprocessing used "
    "during training and returns a prediction from the saved model."
)

# ── Input widgets — adapt to your features ────────────────────
st.subheader("Input Features")

col1, col2 = st.columns(2)

with col1:
    feature1 = st.number_input("Feature 1", min_value=0.0, value=10.0)
    feature2 = st.number_input("Feature 2", min_value=0.0, value=20.0)

with col2:
    feature3 = st.number_input("Feature 3", min_value=0.0, value=30.0)
    category = st.selectbox("Category", ["A", "B", "C"])

# Encode categorical input — must match training encoding
category_map = {"A": 0, "B": 1, "C": 2}
category_encoded = category_map[category]

# ── Prediction ────────────────────────────────────────────────
if st.button("Predict", type="primary"):

    # Build input array — feature ORDER must match training
    input_data = np.array([[feature1, feature2, feature3, category_encoded]])

    # Apply same scaler used during training
    input_scaled = scaler.transform(input_data)

    # Get prediction
    prediction = model.predict(input_scaled)[0]

    st.divider()
    st.subheader("Result")
    st.success(f"Prediction: **{prediction}**")

    # Show probabilities if classifier has predict_proba
    if hasattr(model, "predict_proba"):
        proba = model.predict_proba(input_scaled)[0]
        st.write("Confidence scores:")
        for i, p in enumerate(proba):
            st.progress(float(p), text=f"Class {i}: {p:.1%}")

# ── Model info ────────────────────────────────────────────────
with st.expander("ℹ️ Model Information"):
    st.write("**Algorithm:** Random Forest Classifier")
    st.write("**Features:** feature1, feature2, feature3, category")
    st.write("**Preprocessing:** StandardScaler on numeric features")
    st.write("**Note:** This is a demo model for educational purposes.")`,
        ],
        note: '@st.cache_resource is critical. Without it, the model file is read from disk on every slider move or button click — making the app extremely slow.',
      },
      {
        label: 'Key Streamlit components for ML projects',
        isText: true,
        text: [
          'Input widgets:',
          '   st.number_input()    — for numeric values',
          '   st.slider()          — for range selection',
          '   st.selectbox()       — for categorical options',
          '   st.multiselect()     — for multiple selections',
          '   st.text_input()      — for free text',
          '   st.file_uploader()   — let users upload CSV/image',
          '   st.checkbox()        — binary yes/no',
          '   st.radio()           — pick one from options',
          '',
          'Output:',
          '   st.success()         — green result box',
          '   st.error()           — red error box',
          '   st.warning()         — yellow warning',
          '   st.metric()          — KPI display (value + delta)',
          '   st.dataframe()       — interactive table',
          '   st.plotly_chart()    — Plotly interactive charts',
          '   st.pyplot()          — Matplotlib/Seaborn charts',
          '   st.progress()        — progress bar (for probabilities)',
          '',
          'Layout:',
          '   st.columns([1, 1])   — side-by-side',
          '   st.tabs([])          — tabbed sections',
          '   st.sidebar           — sidebar panel',
          '   st.expander()        — collapsible section',
          '',
          'Caching — IMPORTANT:',
          '   @st.cache_resource   — models, DB connections (loaded once)',
          '   @st.cache_data       — datasets, processed DataFrames',
          '',
          'Streamlit reruns the entire script on every interaction.',
          'Without caching, loading a 20MB model file takes 2-5 seconds',
          'on every slider move.',
        ],
        note: 'Use @st.cache_data on any function that loads or processes a CSV/DataFrame. Use @st.cache_resource for the model and any persistent connection.',
      },
    ],
  },

  {
    phase: '07',
    title: 'requirements.txt',
    color: '#60A5FA',
    steps: [
      {
        label: 'Create requirements.txt — what Streamlit Cloud installs',
        commands: [
          `pip freeze > requirements.txt`,
        ],
        note: 'pip freeze captures everything in your venv. For cleaner deployment, list only what app.py actually imports. A shorter requirements.txt deploys faster.',
      },
      {
        label: 'Minimal requirements.txt for common ML projects',
        isFile: true,
        fileName: 'requirements.txt',
        commands: [
          `# Core Streamlit
streamlit

# Data
pandas
numpy

# ML — standard
scikit-learn
joblib

# Visualisation (add only what you use)
matplotlib
seaborn
plotly

# --- Optional additions ---

# For XGBoost:
# xgboost

# For NLP with transformers:
# transformers
# torch

# For image processing:
# Pillow
# opencv-python

# For finance data:
# yfinance`,
        ],
        note: 'Pin versions (streamlit==1.39.0) for reproducibility once your app works. Without pinning, a future package update might break your app.',
      },
      {
        label: 'Common package name mistakes that crash deployment',
        isText: true,
        text: [
          'These mistakes cause "ModuleNotFoundError" on Streamlit Cloud:',
          '',
          '   In code you write:    In requirements.txt write:',
          '   import sklearn    →   scikit-learn  (NOT sklearn)',
          '   from PIL import   →   Pillow        (NOT PIL)',
          '   import cv2        →   opencv-python (NOT cv2)',
          '   from bs4 import   →   beautifulsoup4 (NOT bs4)',
          '   import yaml       →   PyYAML        (NOT yaml)',
          '',
          'The import name in your code and the pip package name are different.',
          'The requirements.txt must use the pip install name, not the import name.',
          '',
          'Verify a package name:',
          '   pypi.org → search the library → copy the exact pip name',
        ],
        note: 'The scikit-learn vs sklearn confusion is the most common deployment error for ML students. Always write scikit-learn in requirements.txt even though you import it as sklearn.',
      },
    ],
  },

  {
    phase: '08',
    title: 'Model file size — handling the GitHub 100MB limit',
    color: '#EF4444',
    steps: [
      {
        label: 'GitHub blocks files over 100MB — here is what to do',
        isText: true,
        text: [
          'GitHub warns for files over 50MB and blocks files over 100MB.',
          '',
          'Check your model file size:',
          '   ls -lh model.pkl      (macOS/Linux)',
          '   dir model.pkl         (Windows)',
          '',
          'Most scikit-learn models: 1–20MB — push normally ✅',
          'Random forest with 500 trees: ~50–100MB — push normally or compress',
          'Deep learning models (BERT, ResNet): 400MB+ — do NOT push to GitHub',
          '',
          'If your model is under 100MB:',
          '   git add model.pkl',
          '   Streamlit Cloud loads it from your repo automatically.',
          '',
          'If your model is 50–100MB (large but under limit):',
          '   Consider training a smaller model first (fewer trees, smaller depth)',
          '   For demo: fewer estimators gives only slightly worse accuracy',
          '   model = RandomForestClassifier(n_estimators=50)  # instead of 500',
          '',
          'If your model is over 100MB:',
          '   See the options below.',
        ],
        note: 'For student demo projects, aim for models under 50MB. Reduce n_estimators, max_depth, or use a lighter algorithm. A 95% accurate model that deploys beats a 97% model that cannot.',
      },
      {
        label: 'Option A: Hugging Face Model Hub (recommended for large models)',
        isText: true,
        text: [
          '1. Create a free model repo on huggingface.co',
          '2. Upload your model file to the repo',
          '3. In app.py, download at startup:',
          '',
          '   from huggingface_hub import hf_hub_download',
          '   import joblib',
          '',
          '   @st.cache_resource',
          '   def load_model():',
          '       path = hf_hub_download(',
          '           repo_id="your-username/your-model",',
          '           filename="model.pkl"',
          '       )',
          '       return joblib.load(path)',
          '',
          '   model = load_model()',
          '',
          'The model downloads once on first load and is cached.',
          'Your GitHub repo stays lightweight.',
          '',
          'Option B: Git LFS',
          '   git lfs install',
          '   git lfs track "*.pkl"',
          '   git add .gitattributes model.pkl',
          '   git commit -m "add model with LFS"',
          '   git push',
          '   Streamlit Cloud supports Git LFS automatically.',
        ],
        note: 'HF Model Hub is the cleanest solution for large models. The model is versioned separately from code — updating model weights does not clutter Git history.',
      },
    ],
  },

  {
    phase: '09',
    title: 'Create .gitignore',
    color: '#F59E0B',
    steps: [
      {
        label: '.gitignore — protect your project before the first commit',
        isFile: true,
        fileName: '.gitignore',
        commands: [
          `# Virtual environment
venv/
env/
.venv/
ENV/

# Python bytecode
__pycache__/
*.pyc
*.pyo
*.pyd

# Streamlit secrets — NEVER commit
.streamlit/secrets.toml

# Environment variables
.env
.env.local
.env.*

# Jupyter checkpoints
.ipynb_checkpoints/

# OS files
.DS_Store
Thumbs.db

# Test caches
.pytest_cache/
.mypy_cache/

# Large raw data (keep only small samples)
data/raw/
*.sqlite3
*.db

# Note: do NOT ignore data/sample_data.csv if your app needs it`,
        ],
        note: 'Create .gitignore BEFORE running "git add ." for the first time. If you add it after, already-tracked files need extra steps to remove.',
      },
      {
        label: 'Verify .gitignore is working',
        commands: [
          `git add .`,
          `git status`,
        ],
        note: 'After "git add ." run "git status". If .streamlit/secrets.toml, .env, or venv/ appear in the list — STOP. Fix .gitignore and run "git rm --cached" on those files before committing.',
      },
    ],
  },

  {
    phase: '10',
    title: 'Secrets management — st.secrets',
    color: '#A78BFA',
    steps: [
      {
        label: 'Do you need secrets? — Most basic ML apps do NOT',
        isText: true,
        text: [
          'Most student ML prediction apps (churn, house price, fraud detection)',
          'do NOT need any secrets — they load a model file and predict.',
          'Skip this phase if your app does not use external APIs or a database.',
          '',
          'You need secrets when your Streamlit app calls:',
          '→ OpenAI / Anthropic API (GPT, Claude)',
          '→ MongoDB Atlas or PostgreSQL',
          '→ Google Sheets API',
          '→ HuggingFace Inference API',
          '→ Any third-party API requiring a key or password',
          '',
          'NEVER put these directly in app.py:',
          '   api_key = "sk-my-openai-key"       ← visible to everyone',
          '   db_uri  = "mongodb+srv://user:pass" ← visible to everyone',
          '',
          'ALWAYS use st.secrets:',
          '   api_key = st.secrets["api"]["openai_key"]',
          '   db_uri  = st.secrets["mongodb"]["uri"]',
        ],
        note: 'If your app has no external API calls and only loads model.pkl — you do not need secrets at all. Proceed to the next phase.',
      },
      {
        label: 'Create .streamlit/secrets.toml for local development',
        isFile: true,
        fileName: '.streamlit/secrets.toml',
        commands: [
          `# Local secrets — in .gitignore, NEVER push to GitHub

[api]
openai_key = "sk-your-key-here"

[mongodb]
uri = "mongodb+srv://user:password@cluster.xxxxx.mongodb.net/mydb"`,
        ],
        note: 'This file must be in .gitignore. If you push it to GitHub, your secrets are exposed. See Phase 11 if you accidentally push it.',
      },
      {
        label: 'Access secrets in app.py',
        isFile: true,
        fileName: 'app.py (secrets access)',
        commands: [
          `import streamlit as st

# Access secrets — same structure as secrets.toml
openai_key  = st.secrets["api"]["openai_key"]
mongodb_uri = st.secrets["mongodb"]["uri"]

# st.secrets reads from .streamlit/secrets.toml locally
# and from Streamlit Cloud settings in production
# The same code works in both environments`,
        ],
        note: 'Never display secret values using st.write() or print(). If you need to debug, check whether the key exists: st.write("Key exists:", "openai_key" in st.secrets.get("api", {}))',
      },
    ],
  },

  {
    phase: '11',
    title: 'If you accidentally pushed a secret to GitHub',
    color: '#EF4444',
    steps: [
      {
        label: 'Act immediately — deleting in new commit is NOT enough',
        isText: true,
        text: [
          'If .env, secrets.toml, API keys, or passwords were pushed to GitHub:',
          '',
          'Deleting in a new commit does NOT make it safe.',
          'The secret still exists in every previous Git commit.',
          'Anyone can read Git history.',
          '',
          'Bots scan GitHub for leaked secrets within minutes of a push.',
          'Assume the secret is already compromised.',
          '',
          'Step 1 — REVOKE immediately:',
          '→ OpenAI key: platform.openai.com → API Keys → Delete',
          '→ MongoDB password: Atlas → Database Access → Edit user → New password',
          '→ Any API key: provider dashboard → delete/regenerate',
          '',
          'Step 2 — Remove from Git tracking:',
        ],
        note: '⚠️  Revoking is mandatory even if you clean Git history. Old keys may already be scraped.',
      },
      {
        label: 'Remove secrets file from Git tracking',
        commands: [
          `git rm --cached .streamlit/secrets.toml`,
          `git rm --cached .env`,
          `git commit -m "remove secrets from git tracking"`,
          `git push`,
          `git log --all -- .streamlit/secrets.toml`,
          `git grep "OLD_SECRET_VALUE" $(git rev-list --all)`,
        ],
        note: 'git rm --cached removes the file from tracking but keeps it on your local disk. After this, secrets.toml and .env will never be staged again.',
      },
      {
        label: 'Clean Git history if secret is in old commits',
        isText: true,
        text: [
          'If git log shows old commits with the secrets file:',
          '',
          'Option A — git-filter-repo (recommended):',
          '   pip install git-filter-repo',
          '   git filter-repo --path .streamlit/secrets.toml --invert-paths',
          '   git filter-repo --path .env --invert-paths',
          '   git push --force',
          '',
          'Option B — BFG Repo Cleaner:',
          '   java -jar bfg.jar --delete-files secrets.toml',
          '   git reflog expire --expire=now --all',
          '   git gc --prune=now --aggressive',
          '   git push --force',
          '',
          'Force push rewrites all history on GitHub.',
          'Collaborators must re-clone after force push.',
          '',
          'Even after cleaning history:',
          'The old secret must still be revoked.',
          'Cleaning history does NOT make a leaked key safe again.',
        ],
        note: 'For solo student projects: revoke → clean history → generate new key → add only to Streamlit Cloud settings (never to any file that gets committed).',
      },
    ],
  },

  {
    phase: '12',
    title: 'Test locally before pushing',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Set up virtual environment and test the full app',
        commands: [
          `python -m venv venv`,
          `# Activate — macOS/Linux
source venv/bin/activate

# Activate — Windows
venv\\Scripts\\activate`,
          `pip install -r requirements.txt`,
          `streamlit run app.py`,
        ],
        note: 'Testing in a fresh venv catches missing packages that are installed globally on your machine but not in requirements.txt. Streamlit Cloud uses a fresh environment every deploy.',
      },
      {
        label: 'What to verify before pushing',
        isText: true,
        text: [
          '✅ App opens at http://localhost:8501',
          '✅ Model loads without error (check terminal: "model loaded")',
          '✅ Inputs accept values without crashing',
          '✅ Prediction button produces correct output',
          '✅ Known test cases give expected predictions',
          '✅ Charts and visualisations render correctly',
          '✅ File uploader works if used',
          '✅ No ModuleNotFoundError in terminal',
          '✅ No FileNotFoundError (model file missing)',
          '✅ No memory error locally',
          '',
          'Also test the secrets flow (if used):',
          '   st.secrets["api"]["openai_key"] returns your key locally',
          '   Remove the actual key before testing that it gracefully handles missing key',
          '',
          'If anything fails locally:',
          '   Fix it before pushing.',
          '   Streamlit Cloud errors are harder to debug than local errors.',
        ],
        note: 'Quick sanity test for predictions: use values you know the answer for (from your test set) and verify the app gives the same result as model.predict() in Python.',
      },
    ],
  },

  {
    phase: '13',
    title: 'Push to GitHub',
    color: '#60A5FA',
    steps: [
      {
        label: 'Create GitHub repo and push',
        commands: [
          `git init`,
          `git add .`,
          `git status`,
          `git commit -m "streamlit ml app ready for deployment"`,
          `git branch -M main`,
          `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git`,
          `git push -u origin main`,
        ],
        note: 'After "git add ." always run "git status" and review the list. If .streamlit/secrets.toml, .env, or venv/ appear — STOP. Fix .gitignore and remove them before committing.',
      },
      {
        label: 'Verify GitHub repo contains the right files',
        isText: true,
        text: [
          'Open your GitHub repository and confirm:',
          '',
          '✅ These files MUST be present:',
          '   app.py',
          '   requirements.txt',
          '   model.pkl (or model download code if too large)',
          '   README.md',
          '   .gitignore',
          '',
          '✅ These files must NOT be present:',
          '   .env',
          '   .streamlit/secrets.toml',
          '   venv/',
          '   __pycache__/',
          '   Private datasets (CSV with sensitive data)',
          '',
          'Repository must be PUBLIC for Streamlit Community Cloud free tier.',
          'Private repositories require a paid Streamlit plan.',
        ],
        note: 'The repo must be public for the free tier. If your model uses public data and is a student portfolio project, public is fine — nothing sensitive should be in the repo.',
      },
    ],
  },

  {
    phase: '14',
    title: 'Deploy on Streamlit Community Cloud',
    color: '#FF4B4B',
    steps: [
      {
        label: 'Connect GitHub and deploy',
        isText: true,
        text: [
          '1. Go to share.streamlit.io → sign in with GitHub',
          '',
          '2. Click "Create app"',
          '   → "Deploy a public app from GitHub"',
          '',
          '3. Configure:',
          '   Repository: your-username/your-repo-name',
          '   Branch:     main',
          '   Main file path: app.py',
          '   (If app.py is in a subfolder: src/app.py)',
          '',
          '4. Advanced settings (optional):',
          '   Python version: 3.11 or 3.12',
          '   Add secrets if needed (see Phase 15)',
          '',
          '5. Click "Deploy"',
          '',
          '6. Streamlit Cloud:',
          '   → Clones your GitHub repository',
          '   → Creates a fresh Python environment',
          '   → Installs packages from requirements.txt',
          '   → Runs: streamlit run app.py',
          '   → Shows build logs in real time',
          '',
          '7. Your app is live at:',
          '   https://your-username-your-repo-app-py-xxxxx.streamlit.app',
          '',
          'Every push to GitHub automatically redeploys the app.',
        ],
        note: 'First deployment takes 2–5 minutes while packages are installed. Subsequent deploys are faster because packages are cached.',
      },
    ],
  },

  {
    phase: '15',
    title: 'Add secrets in Streamlit Cloud',
    color: '#A78BFA',
    steps: [
      {
        label: 'Add secrets in app settings (only if your app uses external APIs)',
        isText: true,
        text: [
          'Skip this phase if your app only loads model.pkl and predicts.',
          '',
          '1. Streamlit Cloud → your app → "⋮" menu → "Settings"',
          '2. Click "Secrets" tab',
          '3. Paste your secrets in TOML format:',
          '',
          '   [api]',
          '   openai_key = "sk-your-new-key-here"',
          '',
          '   [mongodb]',
          '   uri = "mongodb+srv://user:password@cluster.xxxxx.mongodb.net/db"',
          '',
          '4. Click "Save"',
          '5. App automatically reboots with the new secrets',
          '',
          'Use the exact same structure as your local .streamlit/secrets.toml.',
          'st.secrets["api"]["openai_key"] reads from both local file and Cloud.',
        ],
        note: 'After saving secrets in Streamlit Cloud, the app restarts automatically. You do not need to redeploy manually.',
      },
    ],
  },

  {
    phase: '16',
    title: 'Verify live app',
    color: '#4ADE80',
    steps: [
      {
        label: 'Test your live Streamlit app after deployment',
        isText: true,
        text: [
          '✅ Open your live Streamlit URL',
          '✅ App loads completely — no error screen',
          '✅ Model loads without error (no red "ModuleNotFoundError")',
          '✅ All input widgets work',
          '✅ Prediction button produces output',
          '✅ Test with known inputs — output matches expected prediction',
          '✅ Charts display correctly',
          '✅ File uploader works if used',
          '',
          'Check build/app logs if something fails:',
          '   Streamlit Cloud → your app → "Manage app" (bottom right corner)',
          '   → View logs',
          '   Read the exact error line — it names the file and issue',
          '',
          'First visit may take 30–60 seconds:',
          '   Apps sleep after inactivity on free tier.',
          '   Once awake, they respond quickly.',
          '',
          'Share your live URL:',
          '→ GitHub README (add as live demo badge)',
          '→ LinkedIn Projects section',
          '→ Resume under your project',
          '→ HackerResume / Overleaf portfolio',
        ],
        note: 'Test in incognito mode to simulate what a recruiter sees when they open your link for the first time. This is the most realistic test.',
      },
    ],
  },

  {
    phase: '17',
    title: 'Free tier — honest explanation',
    color: '#34D399',
    steps: [
      {
        label: 'What Streamlit Community Cloud free tier actually gives you',
        isText: true,
        text: [
          'Free tier facts (from Streamlit docs — verify at streamlit.io/pricing):',
          '→ Public apps for free',
          '→ Apps sleep after inactivity — wake up on first visit',
          '→ Limited RAM — most scikit-learn models run fine, large deep learning may not',
          '',
          'For student scikit-learn ML demos and data dashboards:',
          'Streamlit Community Cloud is usually more than enough.',
          '',
          'Limitations that matter for students:',
          '→ 1GB RAM per app — BERT/GPT models will crash (use HF Spaces for those)',
          '→ Limited number of apps on the free tier, and public apps need a',
          '  public GitHub repo — check streamlit.io/cloud for the current count',
          '→ No persistent file system — files written at runtime are temporary',
          '→ Not for production apps with many simultaneous users',
          '→ Not for private business data',
          '',
          'When to consider alternatives:',
          '→ Model needs more than 1GB RAM → HF Spaces (16GB free)',
          '→ Need a BI dashboard with live data → Tableau Public / Looker Studio',
          '→ Need an API not a UI → Render + FastAPI',
          '→ Need persistent storage → add a database (MongoDB Atlas free)',
          '',
          'For normal student ML portfolio projects:',
          'Free tier is more than sufficient.',
        ],
        note: 'Do not claim "1GB RAM is unlimited" to interviewers. Say honestly: "This runs on Streamlit free tier — it handles sklearn models well. Larger transformer models would need HF Spaces."',
      },
    ],
  },

  {
    phase: '18',
    title: 'README template for ML projects',
    color: '#60A5FA',
    steps: [
      {
        label: 'Professional README structure for your ML Streamlit project',
        isFile: true,
        fileName: 'README.md',
        commands: [
          `# Project Title — Short description

## Problem Statement
What business or real-world problem does this project solve?

## Dataset
- **Source:** Kaggle / UCI / custom
- **Rows:** 10,000 | **Columns:** 12
- **Target variable:** churn (binary: 0/1)
- **Note:** Public dataset, no sensitive information

## Live Demo
🚀 [Open App](https://your-app.streamlit.app)

## Project Workflow
1. Data cleaning and EDA
2. Feature engineering
3. Model training and comparison
4. Hyperparameter tuning
5. Evaluation on test set
6. Saving model artifacts
7. Streamlit app deployment

## Model
- **Algorithm:** Random Forest Classifier
- **Features:** tenure, monthly_charges, contract_type, tech_support
- **Preprocessing:** StandardScaler for numeric, OrdinalEncoder for categorical
- **Test Accuracy:** 85.3% | **AUC-ROC:** 0.91

## How to Run Locally

\`\`\`bash
pip install -r requirements.txt
streamlit run app.py
\`\`\`

## Project Files
- app.py — Streamlit app
- model.pkl — trained Random Forest
- scaler.pkl — fitted StandardScaler
- train_model.py — model training script
- notebooks/ — EDA and training notebook

## Limitations
- Model trained on telecom data — may not generalise to other industries
- Does not account for seasonal trends in the data
- Demo model — not validated for production business decisions

## What I Learned
- End-to-end ML pipeline from data to deployment
- Handling class imbalance (SMOTE)
- Streamlit app development and deployment`,
        ],
        note: 'A detailed README with a live demo link is what makes a GitHub portfolio project stand out. Recruiters and interviewers look at the README first.',
      },
    ],
  },

  {
    phase: '19',
    title: 'Final deployment checklist',
    color: '#34D399',
    steps: [
      {
        label: 'Verify all items before sharing your live app link',
        isText: true,
        text: [
          '── Local verification ────────────────────────────────',
          '  streamlit run app.py works at localhost:8501',
          '  Model loads correctly',
          '  Predictions are correct for known inputs',
          '  All inputs and outputs work',
          '',
          '── Files ─────────────────────────────────────────────',
          '  requirements.txt exists and uses correct pip names',
          '  model.pkl (and scaler.pkl if used) exist and load',
          '  README.md explains the project',
          '  .gitignore exists',
          '',
          '── Security ──────────────────────────────────────────',
          '  .env NOT in GitHub',
          '  .streamlit/secrets.toml NOT in GitHub',
          '  venv/ NOT in GitHub',
          '  __pycache__/ NOT in GitHub',
          '  No API keys or passwords in app.py',
          '  No sensitive/private data in GitHub',
          '  No secrets in Git history',
          '',
          '── Streamlit Cloud ───────────────────────────────────',
          '  App deploys without build errors',
          '  Logs show no ModuleNotFoundError',
          '  Logs show no FileNotFoundError',
          '  Live URL loads and app works',
          '  Secrets added in Cloud settings (if needed)',
          '',
          '── Sharing ───────────────────────────────────────────',
          '  Live URL in GitHub README',
          '  Resume updated with live demo link',
          '  LinkedIn Projects updated',
        ],
        note: 'A live Streamlit ML app with a clean README and live URL is one of the strongest data science portfolio projects you can show.',
      },
    ],
  },

  {
    phase: '20',
    title: 'Common errors and fixes',
    color: '#F97316',
    steps: [
      {
        label: 'Error 1 — ModuleNotFoundError',
        isText: true,
        text: [
          'Problem: "ModuleNotFoundError: No module named X"',
          'Cause: Package in app.py imports but not in requirements.txt,',
          'OR package listed with wrong name.',
          '',
          'Fix: Add the correct pip name to requirements.txt:',
          '   import sklearn   →  scikit-learn',
          '   from PIL         →  Pillow',
          '   import cv2       →  opencv-python',
          '   from bs4         →  beautifulsoup4',
          '',
          'Commit and push — Streamlit Cloud auto-redeploys.',
        ],
        note: '',
      },
      {
        label: 'Error 2 — FileNotFoundError: model.pkl not found',
        isText: true,
        text: [
          'Problem: App crashes with FileNotFoundError on model.pkl.',
          '',
          'Cause 1: model.pkl not committed to GitHub.',
          '   Fix: git add model.pkl && git commit && git push',
          '',
          'Cause 2: model.pkl is in .gitignore accidentally.',
          '   Fix: Remove "*.pkl" from .gitignore if it is there',
          '',
          'Cause 3: Model file over 100MB — GitHub blocked the push.',
          '   Fix: Use HF Model Hub (see Phase 08)',
          '',
          'Cause 4: Wrong path — model is in a subfolder.',
          '   Fix: Use the correct relative path: joblib.load("models/model.pkl")',
        ],
        note: '',
      },
      {
        label: 'Error 3 — App exceeds memory / resource limits',
        isText: true,
        text: [
          'Problem: App crashes or becomes very slow on Streamlit Cloud.',
          '',
          'Cause: Large model, huge dataset, or no caching.',
          '',
          'Fix 1: Add @st.cache_resource to model loading function.',
          'Fix 2: Add @st.cache_data to data loading function.',
          'Fix 3: Use a smaller model:',
          '   RandomForest: reduce n_estimators from 500 to 50',
          '   GradientBoosting: reduce n_estimators from 200 to 50',
          'Fix 4: Do not load the full dataset in app.py — only load the model.',
          'Fix 5: For transformer models — use Hugging Face Spaces instead.',
        ],
        note: '',
      },
      {
        label: 'Error 4 — Predictions are wrong',
        isText: true,
        text: [
          'Problem: App runs but predictions look incorrect or random.',
          '',
          'Cause: Preprocessing objects not saved or not used in app.py.',
          '',
          'Fix: Check train_model.py — everything applied to X_train must be saved:',
          '   joblib.dump(scaler, "scaler.pkl")',
          '   joblib.dump(encoder, "encoder.pkl")',
          '',
          'In app.py — transform user input the same way:',
          '   input_scaled = scaler.transform(input_data)  ← transform, not fit_transform',
          '',
          'Also check feature order — input columns must be in the same order',
          'as the training DataFrame columns.',
        ],
        note: '',
      },
      {
        label: 'Error 5 — st.secrets KeyError',
        isText: true,
        text: [
          'Problem: "KeyError: st.secrets has no attribute"',
          '',
          'Cause 1: Secret not added in Streamlit Cloud app settings.',
          '   Fix: Dashboard → your app → Settings → Secrets → add it.',
          '',
          'Cause 2: TOML structure mismatch.',
          '   secrets.toml: [api] openai_key = "..."',
          '   Access as:    st.secrets["api"]["openai_key"]',
          '   NOT:          st.secrets["openai_key"]',
          '',
          'Cause 3: .streamlit/secrets.toml not in .streamlit/ folder.',
          '   Must be at: .streamlit/secrets.toml (not streamlit/secrets.toml)',
        ],
        note: '',
      },
      {
        label: 'Error 6 — Works locally but fails on Cloud',
        isText: true,
        text: [
          'Problem: App runs fine locally but crashes on Streamlit Cloud.',
          '',
          'Cause 1: Missing package in requirements.txt.',
          '   Fix: Add it to requirements.txt and push.',
          '',
          'Cause 2: File path case sensitivity.',
          '   Local (Windows/Mac): "Model.pkl" and "model.pkl" both work.',
          '   Cloud (Linux): case-sensitive — "Model.pkl" fails if file is "model.pkl".',
          '   Fix: Use all lowercase consistently.',
          '',
          'Cause 3: A secret loaded locally from .streamlit/secrets.toml',
          '   is not added in Streamlit Cloud settings.',
          '   Fix: Add all secrets in Streamlit Cloud app settings.',
        ],
        note: '',
      },
      {
        label: 'Error 7 — App is slow on every interaction',
        isText: true,
        text: [
          'Problem: Every slider move or button click takes 3–10 seconds.',
          '',
          'Cause: Model or data reloads on every interaction — no caching.',
          '',
          'Fix: Add caching decorators:',
          '',
          '   @st.cache_resource',
          '   def load_model():',
          '       return joblib.load("model.pkl")',
          '',
          '   @st.cache_data',
          '   def load_data():',
          '       return pd.read_csv("data/sample_data.csv")',
          '',
          'Streamlit reruns the entire script on every interaction.',
          'Without caching, a 20MB model reloads from disk every second.',
        ],
        note: '',
      },
    ],
  },
]


// ─── Chatbot / AI Chat Demo → HF Spaces ──────────────────────────────────────
