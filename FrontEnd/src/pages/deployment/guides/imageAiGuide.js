export const IMAGE_AI_GUIDE = [
  {
    phase: '01',
    title: 'Deploy your Image AI demo as a live app',
    color: '#4ADE80',
    steps: [
      {
        label: 'What you will build — upload an image, get AI predictions',
        isText: true,
        text: [
          'This guide deploys an image AI demo:',
          'User uploads an image → AI model returns predictions.',
          '',
          'No custom frontend needed.',
          'Gradio handles the upload UI automatically.',
          '',
          'Use this guide for:',
          '→ Image classification (cat vs dog, plant disease, waste type)',
          '→ Object detection (YOLO, DETR)',
          '→ Image captioning (BLIP)',
          '→ Vision transformer demo',
          '→ Custom PyTorch image classifier you trained',
          '→ Medical image research demo (public/safe datasets only)',
          '',
          'Do NOT use this guide for:',
          '→ CSV-based ML models → use Streamlit Cloud guide',
          '→ Data dashboards → use Streamlit Cloud guide',
          '→ Full-stack web apps → use React + Django guides',
          '',
          'Why Hugging Face Spaces for image AI:',
          '   Vision transformer models (ViT, EfficientNet) need 4–8GB RAM.',
          '   Streamlit Cloud free = 1GB → crashes on vision transformers.',
          '   HF Spaces free CPU = 16GB → handles most image classifiers.',
        ],
        note: 'Gradio Image input handles file upload, webcam capture, and drag-and-drop automatically. You only write the prediction function.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Before deployment — checklist',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Verify locally before deploying',
        isText: true,
        text: [
          '✅ Model loads locally without error',
          '✅ Prediction runs on a sample image',
          '✅ Class names list is correct and in the right order',
          '✅ Image preprocessing matches training preprocessing exactly',
          '✅ map_location="cpu" used when loading PyTorch model',
          '✅ Model works with torch.no_grad()',
          '✅ requirements.txt exists',
          '✅ README.md exists with frontmatter',
          '✅ .gitignore created',
          '✅ No private or sensitive images included',
          '✅ model.pt is under 100MB (or using HF Model Hub)',
          '',
          'Test locally:',
          '   python app.py',
          '   App opens at http://127.0.0.1:7860',
          '   Upload a test image — prediction appears',
          '',
          'Most common bug: class names in wrong order.',
          '   Your training used alphabetical order.',
          '   Your CLASS_NAMES list must match exactly.',
          '',
          'Check class order:',
          '   print(train_dataset.classes)  ← in your training script',
          '   Copy this exact list to CLASS_NAMES in app.py',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '03',
    title: 'Project structure',
    color: '#60A5FA',
    steps: [
      {
        label: 'Folder structure for an image AI Space',
        isText: true,
        text: [
          'For a HuggingFace pipeline demo (no local model file):',
          '',
          '   image-ai-space/',
          '     app.py',
          '     requirements.txt',
          '     README.md',
          '     .gitignore',
          '',
          'For a custom PyTorch model:',
          '',
          '   image-ai-space/',
          '     app.py',
          '     model.pt           ← saved weights (if <100MB)',
          '     class_names.txt    ← one class per line',
          '     requirements.txt',
          '     README.md',
          '     .gitignore',
          '     sample_images/',
          '       dog.jpg          ← public safe sample (optional)',
          '       cat.jpg',
          '',
          'Rules:',
          '→ app.py must be at the project root',
          '→ model.pt only if custom trained and under 100MB',
          '→ Large models (>100MB) use HF Model Hub (Phase 07)',
          '→ sample_images must be public / safe-to-share images',
          '→ Never push private or sensitive images',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '04',
    title: 'app.py — HuggingFace vision pipeline',
    color: '#EC4899',
    steps: [
      {
        label: 'Image classifier using ViT — no local model file needed',
        isFile: true,
        fileName: 'app.py (vision transformer pipeline)',
        commands: [
          `import gradio as gr
from transformers import pipeline

# Model loaded ONCE at startup — outside the function
classifier = pipeline(
    "image-classification",
    model="google/vit-base-patch16-224"
)

def classify_image(image):
    # Handle empty/null input
    if image is None:
        return {}

    results = classifier(image)

    # Return top 5 predictions as {label: probability}
    return {
        item["label"]: float(item["score"])
        for item in results[:5]
    }

demo = gr.Interface(
    fn=classify_image,
    inputs=gr.Image(type="pil", label="Upload an image"),
    outputs=gr.Label(num_top_classes=5, label="Top Predictions"),
    title="🖼️ Image Classification Demo",
    description="Upload any image — the Vision Transformer model predicts what it sees.",
    theme=gr.themes.Soft(),
)

if __name__ == "__main__":
    demo.launch()`,
        ],
        note: 'gr.Image(type="pil") converts the uploaded image to a PIL Image automatically — no manual file reading needed. The ViT model is downloaded from HF Hub on first run (~350MB, takes a few minutes).',
      },
    ],
  },

  {
    phase: '05',
    title: 'app.py — Custom PyTorch image classifier',
    color: '#EC4899',
    steps: [
      {
        label: 'Custom ResNet model trained on your own dataset',
        isFile: true,
        fileName: 'app.py (custom PyTorch model)',
        commands: [
          `import gradio as gr
import torch
from torchvision import transforms, models
from PIL import Image

# ── Class names — must match training order exactly ────────────
# Replace with your actual class names in the correct order
# Check order with: print(train_dataset.classes) in your training script
CLASS_NAMES = ["cats", "dogs"]  # adapt to your project

# ── Load model ─────────────────────────────────────────────────
model = models.resnet18(weights=None)
model.fc = torch.nn.Linear(model.fc.in_features, len(CLASS_NAMES))

# map_location="cpu" — REQUIRED for Hugging Face free CPU Spaces
model.load_state_dict(torch.load("model.pt", map_location="cpu"))
model.eval()

# ── Preprocessing — must match training preprocessing exactly ──
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],  # ImageNet mean
        std= [0.229, 0.224, 0.225],  # ImageNet std
    ),
])

def classify(image):
    if image is None:
        return {}

    # Apply preprocessing
    tensor = transform(image).unsqueeze(0)  # add batch dimension

    with torch.no_grad():
        output       = model(tensor)
        probabilities = torch.softmax(output, dim=1)[0]

    return {
        CLASS_NAMES[i]: float(probabilities[i])
        for i in range(len(CLASS_NAMES))
    }

demo = gr.Interface(
    fn=classify,
    inputs=gr.Image(type="pil", label="Upload image"),
    outputs=gr.Label(label="Prediction"),
    title="🐾 Custom Image Classifier",
    description="Upload an image and get class probabilities from a trained model.",
    theme=gr.themes.Soft(),
)

if __name__ == "__main__":
    demo.launch()`,
        ],
        note: 'map_location="cpu" is mandatory for HF Spaces free CPU tier. Without it, the model will fail to load because it looks for CUDA which is not available.',
      },
      {
        label: 'Critical: class names must match training order',
        isText: true,
        text: [
          'The most common reason predictions are wrong:',
          '   CLASS_NAMES list is in the wrong order.',
          '',
          'When PyTorch trains on ImageFolder, it assigns class indices',
          'alphabetically. Your app.py must use the same order.',
          '',
          'How to find the correct class order:',
          '   In your training script, after creating the dataset:',
          '   print(train_dataset.classes)',
          '   → ["cats", "dogs"]  ← use this exact order',
          '',
          'Wrong:',
          '   CLASS_NAMES = ["dogs", "cats"]',
          '   Result: all cats predicted as dogs, all dogs as cats',
          '',
          'Right:',
          '   CLASS_NAMES = ["cats", "dogs"]  ← matches alphabetical/training order',
          '',
          'Also: if you used LabelEncoder during training,',
          'save it and load it in app.py to ensure consistent encoding.',
          '',
          'Preprocessing must also match training exactly:',
          '   Same resize dimensions (224x224)',
          '   Same mean and std for Normalize',
          '   Same transforms order',
        ],
        note: 'Test your class order by predicting a known image locally and verifying the output is correct before deploying.',
      },
    ],
  },

  {
    phase: '06',
    title: 'requirements.txt',
    color: '#60A5FA',
    steps: [
      {
        label: 'requirements.txt for image AI projects',
        isFile: true,
        fileName: 'requirements.txt',
        commands: [
          `gradio
transformers
torch
torchvision
Pillow

# Add only if your project uses OpenCV:
# opencv-python`,
        ],
        note: 'Use "Pillow" not "PIL" and "opencv-python" not "cv2" in requirements.txt. PIL and cv2 are import names, not package names — they will cause ModuleNotFoundError if used in requirements.txt.',
      },
      {
        label: 'Recommended lightweight vision models',
        isText: true,
        text: [
          'Image classification:',
          '   google/vit-base-patch16-224   ← 86M params, good accuracy',
          '   microsoft/resnet-50           ← classic, fast on CPU',
          '   WinKawaks/vit-small-patch16-224 ← smaller ViT, faster',
          '',
          'Image captioning:',
          '   Salesforce/blip-image-captioning-base  ← good quality, 370MB',
          '',
          'Object detection:',
          '   hustvl/yolos-tiny             ← tiny YOLO via HF transformers',
          '   facebook/detr-resnet-50       ← DETR, works on CPU',
          '',
          'Custom PyTorch model architectures (from torchvision):',
          '   models.resnet18               ← 11M params, fast',
          '   models.efficientnet_b0        ← efficient, small',
          '   models.mobilenet_v3_small     ← very lightweight',
          '',
          'Rule: Always prefer the smallest model that gives acceptable accuracy.',
          'ResNet-18 for student demos is usually enough and much faster than ResNet-50.',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '07',
    title: 'Model file strategy — local vs HF Model Hub',
    color: '#F59E0B',
    steps: [
      {
        label: 'When to commit model.pt vs use HF Model Hub',
        isText: true,
        text: [
          'Model is under 50MB (small ResNet, MobileNet):',
          '   → Commit model.pt directly to the Space repo.',
          '   → model.load_state_dict(torch.load("model.pt", map_location="cpu"))',
          '',
          'Model is 50–100MB (ResNet-50, EfficientNet-B3):',
          '   → Can commit directly but consider HF Model Hub.',
          '   → GitHub warns at 50MB but allows up to 100MB.',
          '',
          'Model is over 100MB (ViT-base, ResNet-152, EfficientNet-B7):',
          '   → GitHub blocks files over 100MB.',
          '   → Upload model to HF Model Hub (separate model repository).',
          '   → Load in app.py using hf_hub_download:',
          '',
          '   from huggingface_hub import hf_hub_download',
          '   import torch',
          '',
          '   model_path = hf_hub_download(',
          '       repo_id="your-username/your-model-repo",',
          '       filename="model.pt"',
          '   )',
          '   model.load_state_dict(torch.load(model_path, map_location="cpu"))',
          '',
          'Create a model repo: huggingface.co → "+" → New Model',
          'Upload model.pt there, then reference it in app.py.',
          '',
          'Never commit:',
          '→ Private/proprietary trained models',
          '→ Models trained on confidential data',
          '→ Training datasets (even small ones unless fully public)',
        ],
        note: 'HF Model Hub is the cleanest solution for large models — model versioning is separate from code, and updates do not bloat your Space repo history.',
      },
    ],
  },

  {
    phase: '08',
    title: 'README.md and .gitignore',
    color: '#F59E0B',
    steps: [
      {
        label: 'README.md — required Space metadata',
        isFile: true,
        fileName: 'README.md',
        commands: [
          `---
title: Image Classification Demo
emoji: 🖼️
colorFrom: green
colorTo: teal
sdk: gradio
sdk_version: 4.44.0
app_file: app.py
pinned: false
---

# Image Classification Demo

Upload any image and the AI model returns predictions.

## Model
- Architecture: ResNet-18 (custom trained)
- Classes: cats, dogs
- Dataset: Public cat/dog dataset
- Accuracy: 94% on test set

## Limitations
- Trained on standard pet images — unusual angles may reduce accuracy
- Demo model — not intended for production use
- CPU inference — response time ~2–5 seconds`,
        ],
        note: 'Always include Limitations in your README. Recruiters value honesty about model constraints — it shows engineering maturity.',
      },
      {
        label: '.gitignore',
        isFile: true,
        fileName: '.gitignore',
        commands: [
          `venv/
env/
.venv/

__pycache__/
*.pyc

.env
.env.local
.env.*

.DS_Store
Thumbs.db

# Do not ignore model.pt if it is your own custom model
# Only ignore if you are loading from HF Model Hub instead`,
        ],
        note: '',
      },
    ],
  },

  {
    phase: '09',
    title: 'Create Space and deploy',
    color: '#4ADE80',
    steps: [
      {
        label: 'Create Hugging Face Space and push code',
        isText: true,
        text: [
          '1. huggingface.co → "+" → New Space',
          '   Space name: image-ai-demo',
          '   SDK: Gradio',
          '   Hardware: CPU basic (free)',
          '   Visibility: Public',
          '   Create Space',
          '',
          '2. Clone and push:',
        ],
        note: '',
      },
      {
        label: 'Git commands to deploy',
        commands: [
          `git clone https://huggingface.co/spaces/YOUR_USERNAME/image-ai-demo`,
          `cd image-ai-demo`,
          `# Copy app.py, requirements.txt, README.md, .gitignore
# Copy model.pt if using custom model`,
          `git add .`,
          `git commit -m "add image AI demo"`,
          `git push`,
        ],
        note: 'If git push asks for password, use your HF access token (create at huggingface.co → Settings → Access Tokens → Write permission).',
      },
    ],
  },

  {
    phase: '10',
    title: 'Free tier and honest limitations',
    color: '#34D399',
    steps: [
      {
        label: 'What works vs what does not on free CPU',
        isText: true,
        text: [
          'Works well on free CPU:',
          '✅ ResNet-18, ResNet-50 classifiers',
          '✅ MobileNet, EfficientNet-B0 (very fast on CPU)',
          '✅ ViT-base (slower but works, ~5–10s per image)',
          '✅ BLIP image captioning base',
          '✅ YOLO-tiny, DETR-ResNet-50',
          '',
          'Will be slow or may fail on free CPU:',
          '⚠️  Large transformer vision models (ViT-large, CLIP)',
          '⚠️  Real-time video processing',
          '⚠️  High-resolution image processing (>1024px)',
          '⚠️  Multiple models loaded simultaneously',
          '',
          'Typical response time on free CPU:',
          '   ResNet-18 classifier: ~0.5–1 second per image',
          '   ViT-base classifier:  ~3–8 seconds per image',
          '   BLIP captioning:      ~5–10 seconds per image',
          '',
          'Space sleeps after inactivity:',
          '   First request after sleep: ~30 seconds to wake up.',
          '',
          'For faster responses: upgrade to GPU hardware (paid).',
          'For student demos, free CPU is usually acceptable.',
          '',
          'Verify current hardware specs at huggingface.co/pricing.',
        ],
        note: 'Set realistic expectations in your README. Say: "CPU inference — response time ~2-5 seconds". This shows engineering awareness, not a weakness.',
      },
    ],
  },

  {
    phase: '11',
    title: 'Common errors and fixes',
    color: '#F97316',
    steps: [
      {
        label: 'Error 1 — CUDA not available',
        isText: true,
        text: [
          'Problem: "RuntimeError: CUDA is not available"',
          '',
          'Fix: Always use map_location="cpu":',
          '   model.load_state_dict(torch.load("model.pt", map_location="cpu"))',
          '',
          'Or use device detection:',
          '   device = torch.device("cuda" if torch.cuda.is_available() else "cpu")',
          '   model.load_state_dict(torch.load("model.pt", map_location=device))',
          '   model = model.to(device)',
          '',
          'Free CPU Spaces have no GPU — always add map_location="cpu".',
        ],
        note: '',
      },
      {
        label: 'Error 2 — model.pt not found',
        isText: true,
        text: [
          'Problem: "FileNotFoundError: model.pt"',
          '',
          'Cause 1: model.pt not committed to the Space repo.',
          '   Fix: git add model.pt && git commit && git push',
          '',
          'Cause 2: model.pt is over 100MB — GitHub/HF blocked the push.',
          '   Fix: Use HF Model Hub (Phase 07)',
          '',
          'Cause 3: Wrong file path.',
          '   Fix: Use just "model.pt" if file is at root.',
          '   Or: "models/model.pt" if inside a subfolder.',
        ],
        note: '',
      },
      {
        label: 'Error 3 — Wrong predictions (class names mismatch)',
        isText: true,
        text: [
          'Problem: Model always predicts the wrong class.',
          '',
          'Cause: CLASS_NAMES list order does not match training order.',
          '',
          'Fix: Check your training script:',
          '   print(train_dataset.classes)',
          '   Copy this exact list to CLASS_NAMES in app.py.',
          '',
          'Example:',
          '   Training: ["cats", "dogs"] (alphabetical)',
          '   Wrong:    CLASS_NAMES = ["dogs", "cats"]',
          '   Right:    CLASS_NAMES = ["cats", "dogs"]',
        ],
        note: '',
      },
      {
        label: 'Error 4 — Preprocessing mismatch',
        isText: true,
        text: [
          'Problem: Model predicts with low confidence or wrong class consistently.',
          '',
          'Cause: Image preprocessing in app.py does not match training.',
          '',
          'Check these match:',
          '   Same resize: transforms.Resize((224, 224))',
          '   Same normalize values:',
          '     mean=[0.485, 0.456, 0.406],  ← ImageNet mean',
          '     std= [0.229, 0.224, 0.225]   ← ImageNet std',
          '',
          'If you used custom mean/std during training:',
          '   Calculate from your dataset: mean, std = dataset_mean_std()',
          '   Use those values in both training AND app.py',
        ],
        note: '',
      },
      {
        label: 'Error 5 — ModuleNotFoundError (Pillow / OpenCV)',
        isText: true,
        text: [
          'Problem: "ModuleNotFoundError: No module named PIL"',
          '   Fix: Add "Pillow" to requirements.txt (not "PIL")',
          '',
          'Problem: "ModuleNotFoundError: No module named cv2"',
          '   Fix: Add "opencv-python" to requirements.txt (not "cv2")',
          '',
          'pip install name vs import name:',
          '   Import as "from PIL import Image"  →  pip: Pillow',
          '   Import as "import cv2"             →  pip: opencv-python',
        ],
        note: '',
      },
      {
        label: 'Error 6 — Out of memory',
        isText: true,
        text: [
          'Problem: Space crashes with memory error.',
          '',
          'Cause: Model too large for free CPU RAM, or',
          'processing very high-resolution images.',
          '',
          'Fix 1: Use a smaller model architecture.',
          '   ResNet-50  →  ResNet-18',
          '   ViT-large  →  ViT-base or ViT-small',
          '',
          'Fix 2: Resize input images before processing:',
          '   transforms.Resize((224, 224))  ← already in preprocessing',
          '',
          'Fix 3: Use torch.no_grad() — saves memory during inference:',
          '   with torch.no_grad():',
          '       output = model(tensor)',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '12',
    title: 'Final checklist',
    color: '#34D399',
    steps: [
      {
        label: 'Verify before sharing your image AI demo URL',
        isText: true,
        text: [
          '── Code ─────────────────────────────────────────────',
          '  app.py works locally',
          '  model loaded with map_location="cpu"',
          '  CLASS_NAMES order matches training',
          '  Preprocessing matches training (resize, normalize)',
          '  torch.no_grad() used for inference',
          '  None/empty image handled',
          '',
          '── Files ────────────────────────────────────────────',
          '  requirements.txt uses correct pip names (Pillow not PIL)',
          '  README.md has correct frontmatter (sdk, app_file)',
          '  .gitignore excludes venv/ and __pycache__/',
          '  model.pt included OR HF Model Hub loading configured',
          '  No private images committed',
          '',
          '── Deployment ───────────────────────────────────────',
          '  Space builds without errors',
          '  Image upload works',
          '  Predictions are correct for test images',
          '  Build/Logs tab shows no errors',
          '',
          '── Sharing ───────────────────────────────────────────',
          '  Space URL in GitHub README',
          '  Space URL in LinkedIn Projects',
          '  Space URL in resume',
          '  Limitations mentioned honestly in README',
        ],
        note: 'A live image AI demo on HF Spaces is a strong computer vision portfolio item. It shows you can deploy a trained model end-to-end.',
      },
    ],
  },
]

// ─── RAG / Document Q&A App → HF Spaces ──────────────────────────────────────
