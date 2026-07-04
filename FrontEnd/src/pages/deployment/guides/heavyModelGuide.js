export const HEAVY_MODEL_DEPLOY_GUIDE = [
  {
    phase: '01',
    title: 'Why heavy models need a different deployment approach',
    color: '#8B5CF6',
    steps: [
      {
        label: 'The problem — large files, high RAM, GitHub limits',
        isText: true,
        text: [
          'Small sklearn/XGBoost models deploy easily on Streamlit Cloud.',
          'Large DL models have two problems that need a different approach:',
          '',
          'Problem 1 — File size:',
          '   GitHub blocks files over 100MB in normal Git.',
          '   model.pt for ResNet-152 = 230MB → cannot push to GitHub normally.',
          '   model.keras for VGG-16   = 550MB → blocked.',
          '',
          'Problem 2 — RAM:',
          '   Streamlit Cloud free tier = 1GB RAM.',
          '',
          '   ResNet-50:      100MB file,  ~500MB RAM  ✅ Streamlit OK',
          '   ResNet-152:     230MB file,  ~1GB RAM    ⚠️  borderline',
          '   EfficientNet-B7:250MB file,  ~1.5GB RAM  ❌ crashes Streamlit',
          '   VGG-16:         550MB file,  ~2GB RAM    ❌ crashes Streamlit',
          '   BERT-base:      440MB file,  ~2–4GB RAM  ❌ crashes Streamlit',
          '   GPT-2 medium:   1.5GB file,  ~6GB RAM    ❌ crashes Streamlit',
          '',
          'The solution — two separate repositories:',
          '   Space repo (code):     app.py, requirements.txt, README.md',
          '   Model repo (weights):  model.pt / model.keras / class_names.txt',
          '',
          'app.py downloads model weights at startup using hf_hub_download.',
          'HF Spaces gives 16GB RAM — runs most large DL models.',
          '',
          'This guide is for:',
          '→ Large PyTorch models (.pt / .pth)',
          '→ Large TensorFlow/Keras models (.keras / .h5)',
          '→ Any model file above 100MB',
          '→ Models needing more than 1GB RAM',
        ],
        note: 'The HF Model Hub is like GitHub but for model weights. Keep code in the Space repo, weights in the Model repo. They are two separate git repositories.',
      },
    ],
  },

  {
    phase: '02',
    title: 'When to use this guide',
    color: '#8B5CF6',
    steps: [
      {
        label: 'Use this guide when — and when not to',
        isText: true,
        text: [
          'Use this guide when:',
          '✅ Model file is larger than 100MB',
          '✅ Model is PyTorch .pt / .pth',
          '✅ Model is TensorFlow/Keras .keras / .h5',
          '✅ Model needs more than 1GB RAM',
          '✅ GitHub is blocking the file push',
          '✅ You want a live Gradio demo URL',
          '',
          'Do NOT use this guide for:',
          '→ Small sklearn / XGBoost models → use Streamlit Cloud guide',
          '→ Small ML models under 50MB → commit to repo directly',
          '→ Pandas / EDA dashboards → use Streamlit Cloud guide',
          '→ Power BI / Tableau → use those platforms directly',
          '',
          'The rule:',
          '   Model file ≤100MB AND model needs ≤1GB RAM → Streamlit Cloud',
          '   Model file >100MB OR model needs >1GB RAM  → this guide',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '03',
    title: 'Free tier reality check — read before deploying',
    color: '#EF4444',
    steps: [
      {
        label: 'Honest: what works and what does not on free CPU',
        isText: true,
        text: [
          'Hugging Face Spaces free CPU is useful for student demos.',
          'It is NOT the same as a GPU server.',
          '',
          'Good candidates for free CPU:',
          '✅ ResNet-50, ResNet-152 — image classification',
          '✅ EfficientNet-B4 through B7 — image classification',
          '✅ VGG-16, VGG-19 — if memory fits',
          '✅ BERT-base, DistilBERT — NLP tasks',
          '✅ T5-small, FLAN-T5-small — text generation',
          '✅ Custom student CNN image classifiers',
          '',
          'Poor candidates for free CPU (too slow or out of memory):',
          '❌ LLaMA 7B+ — out of memory',
          '❌ GPT-2 XL (1.5GB model) — very slow',
          '❌ Stable Diffusion, DALL-E — needs GPU',
          '❌ Video models — heavy',
          '❌ Very large segmentation models (SAM, etc.)',
          '',
          'Performance expectations on free CPU:',
          '   ResNet-50 image classification: ~1–2 seconds per image',
          '   DistilBERT NLP task:            ~2–5 seconds per request',
          '   First startup (model download):  ~30 seconds to 3 minutes',
          '',
          'Runtime disk is NOT persistent.',
          '   Files created during runtime may be lost on Space restart.',
          '   For persistent user data, use MongoDB Atlas or Supabase.',
          '',
          'Rule: Try on free CPU first.',
          'If too slow or crashes → use smaller model OR upgrade to paid GPU.',
        ],
        note: 'Always mention response time expectations in your README: "First startup takes ~30s while model downloads. Subsequent predictions take ~1–2s."',
      },
    ],
  },

  {
    phase: '04',
    title: 'Two-repository strategy',
    color: '#60A5FA',
    steps: [
      {
        label: 'Space repo (code) vs Model repo (weights) — keep them separate',
        isText: true,
        text: [
          'A. Space repository — contains app code only:',
          '',
          '   heavy-model-space/',
          '     app.py              ← Gradio demo',
          '     requirements.txt',
          '     README.md           ← Space metadata',
          '     .gitignore',
          '',
          'B. Model repository — contains model weights only:',
          '',
          '   my-trained-model/',
          '     model.pt            ← PyTorch weights',
          '     class_names.txt     ← one label per line',
          '     config.json         ← architecture info (optional)',
          '     README.md           ← model card',
          '',
          '   For TensorFlow/Keras:',
          '     model.keras         ← Keras saved model',
          '     class_names.txt',
          '',
          'Benefits of separating:',
          '→ Space repo stays small — fast code pushes',
          '→ Model updates do not create large git history',
          '→ Same model can be reused in multiple Spaces',
          '→ Professional ML workflow (code vs artifacts)',
          '→ Supports files up to 50GB via HF LFS',
        ],
        note: 'Think of the Space repo as your codebase and the Model repo as your build artifact. In production ML, these are always kept separate.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Step 1 — Create Model repository on HF Model Hub',
    color: '#4ADE80',
    steps: [
      {
        label: 'Create the model repo where weights will live',
        isText: true,
        text: [
          '1. huggingface.co → click "+" → "New Model"',
          '',
          '2. Configure:',
          '   Model name: my-resnet-classifier (or your project name)',
          '   License:    MIT or Apache 2.0',
          '   Visibility: Public (for student demo)',
          '   Create model',
          '',
          '3. Your model repo is at:',
          '   huggingface.co/YOUR_USERNAME/my-resnet-classifier',
          '',
          '4. Note the repo_id — you will use it in app.py:',
          '   repo_id = "YOUR_USERNAME/my-resnet-classifier"',
        ],
        note: 'Public model repos are visible to everyone — do not upload private/proprietary model weights. For student portfolio projects trained on public datasets, public is fine.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Step 2 — Upload model weights to Model Hub',
    color: '#4ADE80',
    steps: [
      {
        label: 'Method A — Web upload (for files up to a few GB)',
        isText: true,
        text: [
          '1. Open your Model repo on huggingface.co',
          '2. Click "Files and versions" tab',
          '3. Click "Add file" → "Upload files"',
          '4. Drag and drop:',
          '   model.pt (or model.keras)',
          '   class_names.txt',
          '5. Add a commit message: "add trained model weights"',
          '6. Click "Commit changes to main"',
          '',
          'That is it. Your model is now hosted on HF Model Hub.',
        ],
        note: '',
      },
      {
        label: 'Method B — Python upload (for large files or automation)',
        isFile: true,
        fileName: 'upload_model.py (run once locally)',
        commands: [
          `from huggingface_hub import HfApi

api = HfApi()

# Upload model weights
api.upload_file(
    path_or_fileobj="model.pt",
    path_in_repo="model.pt",
    repo_id="YOUR_USERNAME/my-resnet-classifier",
    repo_type="model",
    token="YOUR_HF_WRITE_TOKEN",  # from Settings → Access Tokens
)

# Upload class names
api.upload_file(
    path_or_fileobj="class_names.txt",
    path_in_repo="class_names.txt",
    repo_id="YOUR_USERNAME/my-resnet-classifier",
    repo_type="model",
    token="YOUR_HF_WRITE_TOKEN",
)

print("Upload complete.")`,
        ],
        note: 'Use upload_model.py ONLY locally — never commit it with the real token. Run it once to upload, then delete the token from the script.',
      },
      {
        label: 'Get your HF write token for Python upload',
        isText: true,
        text: [
          '1. huggingface.co → your profile → Settings',
          '2. Access Tokens → "New token"',
          '   Name: upload-token | Permission: Write',
          '   Create → Copy the token',
          '',
          '3. Use as the "token" parameter in upload_model.py',
          '',
          'Security:',
          '→ Never put this token in app.py',
          '→ Never commit it to any file',
          '→ Use it only locally for the upload',
          '→ Revoke it after upload if you want extra safety',
          '→ If leaked: revoke at huggingface.co → Settings → Tokens',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '07',
    title: 'Create class_names.txt',
    color: '#F59E0B',
    steps: [
      {
        label: 'class_names.txt — one label per line, correct order is critical',
        isFile: true,
        fileName: 'class_names.txt',
        commands: [
          `cats
dogs
rabbits`,
        ],
        note: 'One label per line, in the SAME order your model was trained on (see the examples below). NO extra spaces or blank lines. These match the ["cats", "dogs", "rabbits"] order shown next.',
      },
      {
        label: 'How to get the correct class order from your training',
        isText: true,
        text: [
          'The class order MUST match the order used during training.',
          'If the order is wrong, predictions will be for the wrong label.',
          '',
          'For PyTorch ImageFolder (most common):',
          '   In your training notebook/script:',
          '   print(train_dataset.classes)',
          '   → ["cats", "dogs", "rabbits"]',
          '   Use this exact order in class_names.txt',
          '',
          'For sklearn LabelEncoder:',
          '   print(list(encoder.classes_))',
          '   Use this exact order',
          '',
          'For Keras with flow_from_directory:',
          '   print(train_generator.class_indices)',
          '   → {"cats": 0, "dogs": 1, "rabbits": 2}',
          '   Sort by value: ["cats", "dogs", "rabbits"]',
          '',
          'Wrong class order is the #1 cause of correct model, wrong predictions.',
          'Always verify with a known test image after deployment.',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '08',
    title: 'app.py — Large PyTorch model',
    color: '#EC4899',
    steps: [
      {
        label: 'Complete app.py for large PyTorch image classifier',
        isFile: true,
        fileName: 'app.py (PyTorch)',
        commands: [
          `import gradio as gr
import torch
from torchvision import transforms, models
from huggingface_hub import hf_hub_download
from PIL import Image

# ── Config — update these to match your model ──────────────────
MODEL_REPO = "YOUR_USERNAME/YOUR_MODEL_REPO"
MODEL_FILE = "model.pt"
CLASS_FILE = "class_names.txt"

# ── Load class names from Model Hub ───────────────────────────
def load_class_names():
    class_path = hf_hub_download(
        repo_id=MODEL_REPO,
        filename=CLASS_FILE,
        repo_type="model",
    )
    with open(class_path, "r", encoding="utf-8") as f:
        return [line.strip() for line in f if line.strip()]

CLASS_NAMES = load_class_names()

# ── Load model from Model Hub at startup ──────────────────────
# @torch.no_grad() here means the function runs in no-grad context
def load_model():
    model_path = hf_hub_download(
        repo_id=MODEL_REPO,
        filename=MODEL_FILE,
        repo_type="model",
    )
    # Adapt architecture to match your trained model
    model = models.resnet50(weights=None)
    model.fc = torch.nn.Linear(model.fc.in_features, len(CLASS_NAMES))
    model.load_state_dict(torch.load(model_path, map_location="cpu"))
    model.eval()
    return model

model = load_model()

# ── Preprocessing — must match training preprocessing exactly ──
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],  # ImageNet mean
        std= [0.229, 0.224, 0.225],  # ImageNet std
    ),
])

def predict(image):
    if image is None:
        return {}
    tensor = transform(image).unsqueeze(0)
    with torch.no_grad():
        output = model(tensor)
        probs  = torch.softmax(output, dim=1)[0]
    return {CLASS_NAMES[i]: float(probs[i]) for i in range(len(CLASS_NAMES))}

demo = gr.Interface(
    fn=predict,
    inputs=gr.Image(type="pil", label="Upload an image"),
    outputs=gr.Label(label="Prediction"),
    title="🧠 Heavy PyTorch Model Demo",
    description=(
        "Loads a trained PyTorch model from Hugging Face Model Hub. "
        "First startup may take 30–60s while model downloads."
    ),
    theme=gr.themes.Soft(),
)

if __name__ == "__main__":
    demo.launch()`,
        ],
        note: 'map_location="cpu" is mandatory on free CPU Spaces. model.eval() puts PyTorch in inference mode (disables dropout, batch norm uses running stats). torch.no_grad() saves memory by disabling gradients.',
      },
    ],
  },

  {
    phase: '09',
    title: 'app.py — Large TensorFlow / Keras model',
    color: '#EC4899',
    steps: [
      {
        label: 'Complete app.py for large TensorFlow/Keras image classifier',
        isFile: true,
        fileName: 'app.py (TensorFlow/Keras)',
        commands: [
          `import gradio as gr
import numpy as np
import tensorflow as tf
from huggingface_hub import hf_hub_download
from PIL import Image

# ── Config ─────────────────────────────────────────────────────
MODEL_REPO = "YOUR_USERNAME/YOUR_KERAS_MODEL_REPO"
MODEL_FILE = "model.keras"
CLASS_FILE = "class_names.txt"

# ── Load class names ───────────────────────────────────────────
def load_class_names():
    class_path = hf_hub_download(
        repo_id=MODEL_REPO,
        filename=CLASS_FILE,
        repo_type="model",
    )
    with open(class_path, "r", encoding="utf-8") as f:
        return [line.strip() for line in f if line.strip()]

CLASS_NAMES = load_class_names()

# ── Load Keras model ───────────────────────────────────────────
model_path = hf_hub_download(
    repo_id=MODEL_REPO,
    filename=MODEL_FILE,
    repo_type="model",
)
model = tf.keras.models.load_model(model_path)

def predict(image):
    if image is None:
        return {}

    # Resize — must match training input size
    img = image.resize((224, 224))
    # Normalize to [0, 1]
    arr = np.array(img, dtype=np.float32) / 255.0
    # Add batch dimension: (224, 224, 3) → (1, 224, 224, 3)
    arr = np.expand_dims(arr, axis=0)

    probs = model.predict(arr, verbose=0)[0]
    return {CLASS_NAMES[i]: float(probs[i]) for i in range(len(CLASS_NAMES))}

demo = gr.Interface(
    fn=predict,
    inputs=gr.Image(type="pil", label="Upload an image"),
    outputs=gr.Label(label="Prediction"),
    title="🧠 Heavy Keras Model Demo",
    description=(
        "Loads a trained Keras model from Hugging Face Model Hub. "
        "First startup may take 30–60s while model downloads."
    ),
)

if __name__ == "__main__":
    demo.launch()`,
        ],
        note: 'Adapt the resize dimensions (224, 224) and normalization to match exactly what you used during training. If training used ImageDataGenerator(rescale=1/255), use /255.0 here too.',
      },
    ],
  },

  {
    phase: '10',
    title: 'requirements.txt',
    color: '#60A5FA',
    steps: [
      {
        label: 'requirements.txt — use only the framework your model needs',
        isText: true,
        text: [
          'For PyTorch models:',
          '   gradio',
          '   huggingface_hub',
          '   torch',
          '   torchvision',
          '   Pillow',
          '',
          'For TensorFlow/Keras models:',
          '   gradio',
          '   huggingface_hub',
          '   tensorflow',
          '   Pillow',
          '   numpy',
          '',
          'Rules:',
          '→ Do NOT install both torch and tensorflow unless absolutely needed',
          '   Both together = ~5GB install = very long build + high memory',
          '→ huggingface_hub is always required (for hf_hub_download)',
          '→ Pillow is required for gr.Image(type="pil")',
          '→ Add numpy only if you use numpy in your preprocessing',
          '',
          'Check your exact Gradio version locally:',
          '   python -c "import gradio; print(gradio.__version__)"',
          '   Use this version in README.md sdk_version field',
        ],
        note: 'Minimal requirements = faster builds = less chance of dependency conflicts. Every package you do not need is a package that cannot cause a build failure.',
      },
    ],
  },

  {
    phase: '11',
    title: 'README.md and .gitignore',
    color: '#F59E0B',
    steps: [
      {
        label: 'README.md — Space metadata + honest description',
        isFile: true,
        fileName: 'README.md',
        commands: [
          `---
title: Heavy Model Demo
emoji: 🧠
colorFrom: purple
colorTo: indigo
sdk: gradio
sdk_version: 4.44.0
app_file: app.py
pinned: false
---

# Heavy ML/DL Model Demo

This Space demonstrates a large deep learning model loaded from Hugging Face Model Hub.

## Model
- Architecture: ResNet-50 (or your architecture)
- Model Hub: huggingface.co/YOUR_USERNAME/YOUR_MODEL_REPO
- Classes: see class_names.txt in Model Hub repo

## How it works
1. Model weights are stored in a separate Hugging Face Model Hub repository
2. At startup, app.py downloads model weights using hf_hub_download()
3. Gradio Interface handles image upload and prediction display

## Performance notes
- First startup: ~30–60s (model download + cache)
- Inference: ~1–3s per image on free CPU
- Running on CPU — GPU hardware gives faster inference
- This is a student demo, not a production service

## Limitations
- Optimised for images similar to training dataset
- CPU inference — slower than GPU
- Demo purposes only`,
        ],
        note: 'Always document the model source, expected performance, and limitations. Honest documentation is a sign of good engineering.',
      },
      {
        label: '.gitignore',
        isFile: true,
        fileName: '.gitignore',
        commands: [
          `.env
.env.local
.env.*

__pycache__/
*.pyc

venv/
env/
.venv/

.DS_Store
Thumbs.db

# Do NOT include model.pt here if your model is small enough to commit
# For large models — they should be in Model Hub, not this repo`,
        ],
        note: '',
      },
    ],
  },

  {
    phase: '12',
    title: 'Create HF Space and push code',
    color: '#4ADE80',
    steps: [
      {
        label: 'Create the Space',
        isText: true,
        text: [
          '1. huggingface.co → "+" → "New Space"',
          '',
          '2. Configure:',
          '   Owner:      your username',
          '   Space name: heavy-model-demo',
          '   License:    MIT',
          '   SDK:        Gradio',
          '   Hardware:   CPU basic (free)',
          '   Visibility: Public',
          '',
          '3. Click "Create Space"',
          '',
          '4. Note: Hardware and pricing change at HF.',
          '   Always verify current options at huggingface.co/pricing.',
        ],
        note: '',
      },
      {
        label: 'Push your code to the Space',
        commands: [
          `git clone https://huggingface.co/spaces/YOUR_USERNAME/heavy-model-demo`,
          `cd heavy-model-demo`,
          `# Copy: app.py, requirements.txt, README.md, .gitignore
# DO NOT copy model.pt here — it is in Model Hub`,
          `git add .`,
          `git commit -m "add heavy model demo"`,
          `git push`,
        ],
        note: 'If git push asks for password, use your HF access token (not account password). Create at huggingface.co → Settings → Access Tokens → Write permission.',
      },
    ],
  },

  {
    phase: '13',
    title: 'Handle private model repos with HF_TOKEN',
    color: '#A78BFA',
    steps: [
      {
        label: 'For public demo repos — no token needed',
        isText: true,
        text: [
          'If your model repo is PUBLIC (recommended for student portfolio):',
          '   hf_hub_download(repo_id="...", filename="...", repo_type="model")',
          '   No token needed. App downloads freely.',
          '',
          'If your model repo is PRIVATE:',
          '   You must pass an HF token.',
          '   Add HF_TOKEN as a Space secret.',
          '',
          '1. Space page → Settings → Repository secrets',
          '2. Add: Name = HF_TOKEN, Value = your-hf-read-token',
          '3. In app.py:',
          '',
          '   import os',
          '   model_path = hf_hub_download(',
          '       repo_id=MODEL_REPO,',
          '       filename=MODEL_FILE,',
          '       repo_type="model",',
          '       token=os.getenv("HF_TOKEN"),  ← from Space secrets',
          '   )',
          '',
          'Rules:',
          '→ Never hardcode HF_TOKEN in app.py',
          '→ Never commit HF_TOKEN to any file',
          '→ For student public demos, use public model repos — no token needed',
        ],
        note: 'For most student portfolio projects, keep the model repo public. It is simpler and shows your work openly. Only make it private if the model contains proprietary/sensitive data.',
      },
    ],
  },

  {
    phase: '14',
    title: 'If a secret was accidentally pushed to Git',
    color: '#EF4444',
    steps: [
      {
        label: 'Act immediately — revoke and clean',
        commands: [
          `# Step 1: Revoke token at huggingface.co → Settings → Tokens`,
          `# Step 2: Remove from tracking
git rm --cached .env
git commit -m "remove secret file from tracking"
git push`,
          `# Step 3: Check if token is in Git history
git grep "hf_" $(git rev-list --all)`,
          `# Step 4: Clean history (if found in old commits)
pip install git-filter-repo
git filter-repo --path .env --invert-paths
git push --force`,
        ],
        note: '⚠️  Even after cleaning history, the revoked token must not be reused. Generate a new token and use that instead.',
      },
    ],
  },

  {
    phase: '15',
    title: 'Optimization tips for free CPU',
    color: '#34D399',
    steps: [
      {
        label: 'Make your heavy model run better on free CPU',
        isText: true,
        text: [
          'Model architecture choices:',
          '→ Use ResNet-50 instead of ResNet-152 when possible',
          '→ Use EfficientNet-B0 instead of B7',
          '→ Use DistilBERT instead of BERT-large',
          '→ Use FLAN-T5-small instead of FLAN-T5-large',
          '→ Smaller model = faster inference + less memory',
          '',
          'PyTorch inference best practices:',
          '→ model.eval()         ← disables dropout, uses running batch norm stats',
          '→ torch.no_grad()      ← disables gradient computation, saves memory',
          '→ map_location="cpu"   ← prevents CUDA errors on CPU-only Space',
          '→ Never call .cuda()   ← free CPU has no GPU',
          '',
          'Input size:',
          '→ Resize images to model input size BEFORE inference',
          '→ Do not pass 4K images to a model trained on 224×224',
          '→ transforms.Resize((224, 224)) handles this',
          '',
          'Loading:',
          '→ Load model ONCE at startup (module level)',
          '→ NEVER load model inside the predict() function',
          '→ Loading inside predict = model re-downloads on every click',
          '',
          'Build time:',
          '→ Keep requirements.txt minimal',
          '→ Only install what your app actually uses',
          '→ torch alone is ~2GB download',
        ],
        note: 'Loading the model inside predict() instead of at module level is the most common performance mistake. It causes a 30-second delay on every single prediction.',
      },
    ],
  },

  {
    phase: '16',
    title: 'Common errors and fixes',
    color: '#F97316',
    steps: [
      {
        label: 'Error 1 — RepositoryNotFoundError',
        isText: true,
        text: [
          'Problem: "RepositoryNotFoundError" when downloading model.',
          '',
          'Cause 1: Wrong repo_id.',
          '   Fix: Open the Model Hub repo and copy the exact repo_id from the URL.',
          '   URL: huggingface.co/username/model-name → repo_id = "username/model-name"',
          '',
          'Cause 2: Model repo is private and no token set.',
          '   Fix: Make model repo public, OR add HF_TOKEN as Space secret.',
        ],
        note: '',
      },
      {
        label: 'Error 2 — EntryNotFoundError (file not found in repo)',
        isText: true,
        text: [
          'Problem: "EntryNotFoundError: model.pt is not a valid path in..."',
          '',
          'Cause: filename in hf_hub_download does not match the actual file name in Model Hub.',
          '',
          'Fix:',
          '   Open Model Hub repo → "Files and versions" tab',
          '   Copy the exact filename (including any subfolder path)',
          '   Update filename= in hf_hub_download to match exactly',
        ],
        note: '',
      },
      {
        label: 'Error 3 — CUDA not available',
        isText: true,
        text: [
          'Problem: "RuntimeError: CUDA is not available"',
          '',
          'Fix 1: Use map_location="cpu" when loading PyTorch model:',
          '   torch.load(model_path, map_location="cpu")',
          '',
          'Fix 2: Remove any .cuda() calls from your code.',
          '',
          'Fix 3: Use device detection:',
          '   device = "cuda" if torch.cuda.is_available() else "cpu"',
          '   model = model.to(device)',
          '',
          'Free CPU Spaces have no GPU — always use CPU-safe loading.',
        ],
        note: '',
      },
      {
        label: 'Error 4 — Out of memory',
        isText: true,
        text: [
          'Problem: Space crashes with memory error.',
          '',
          'Fix 1: Use a smaller model architecture.',
          '   VGG-16 → ResNet-50 or EfficientNet-B0',
          '',
          'Fix 2: Half precision for PyTorch (reduces memory by ~50%):',
          '   model = model.half()  ← float16 uses half the memory',
          '   tensor = tensor.half()',
          '   Note: Check if your model and preprocessing support half precision',
          '',
          'Fix 3: Upgrade to paid GPU hardware on HF Spaces.',
        ],
        note: '',
      },
      {
        label: 'Error 5 — Wrong predictions',
        isText: true,
        text: [
          'Problem: Model loads but every prediction is wrong.',
          '',
          'Cause A: CLASS_NAMES in wrong order.',
          '   Fix: Print train_dataset.classes in training — copy that exact order.',
          '',
          'Cause B: Preprocessing mismatch.',
          '   Fix: Match resize dimensions, normalize mean/std to training values.',
          '',
          'Cause C: Model architecture mismatch.',
          '   Fix: Verify the architecture (resnet50, vgg16, etc.) matches exactly what was trained.',
        ],
        note: '',
      },
      {
        label: 'Error 6 — Model downloads on every prediction',
        isText: true,
        text: [
          'Problem: Each prediction takes 30+ seconds.',
          '',
          'Cause: hf_hub_download or model loading is inside the predict() function.',
          '',
          'Wrong:',
          '   def predict(image):',
          '       model_path = hf_hub_download(...)  ← re-downloads every call',
          '       model = torch.load(model_path)     ← re-loads every call',
          '',
          'Right:',
          '   model_path = hf_hub_download(...)  ← at module level (once at startup)',
          '   model = torch.load(model_path)',
          '',
          '   def predict(image):',
          '       ...use model here...',
        ],
        note: '',
      },
      {
        label: 'Error 7 — Space stuck building',
        isText: true,
        text: [
          'Problem: Space stays in "Building" state for >15 minutes.',
          '',
          'Cause 1: torch + torchvision are large (~2GB download). Normal for first build.',
          '',
          'Cause 2: Both torch AND tensorflow installed.',
          '   Fix: Use only the framework your model needs.',
          '',
          'Cause 3: Dependency conflict.',
          '   Check Build logs for the exact error line.',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '17',
    title: 'Final checklist',
    color: '#34D399',
    steps: [
      {
        label: 'Verify before sharing your heavy model demo URL',
        isText: true,
        text: [
          '── Model Hub ─────────────────────────────────────────',
          '  Model file uploaded (model.pt or model.keras)',
          '  class_names.txt uploaded with correct class order',
          '  Model repo public OR HF_TOKEN secret added in Space',
          '  repo_id and filename in app.py match exactly',
          '',
          '── app.py ────────────────────────────────────────────',
          '  hf_hub_download used for model and class file',
          '  map_location="cpu" for PyTorch',
          '  model.eval() called (PyTorch)',
          '  torch.no_grad() used in predict()',
          '  Preprocessing matches training exactly',
          '  CLASS_NAMES order matches training order',
          '  Model/class loading at module level (not inside predict)',
          '',
          '── Space ─────────────────────────────────────────────',
          '  requirements.txt has huggingface_hub',
          '  requirements.txt uses only one DL framework',
          '  README.md has correct frontmatter (sdk, app_file)',
          '  No model weights committed to Space repo',
          '  No secrets in any file',
          '  Space builds without errors',
          '',
          '── Live test ─────────────────────────────────────────',
          '  Model downloads on first run (check Logs tab)',
          '  Known test image gives correct prediction',
          '  First startup time mentioned in README',
          '',
          '── Sharing ───────────────────────────────────────────',
          '  Space URL in GitHub README',
          '  Space URL in LinkedIn Projects',
          '  Space URL in resume',
          '  Limitations documented in README',
        ],
        note: 'A deployed large DL model with a live demo URL shows end-to-end ML engineering skill — training, saving, versioning, and serving a model through a proper deployment pipeline.',
      },
    ],
  },
]
