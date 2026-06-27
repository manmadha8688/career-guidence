export const NLP_DEMO_GUIDE = [
  {
    phase: '01',
    title: 'Deploy your NLP / Text AI demo as a live app',
    color: '#60A5FA',
    steps: [
      {
        label: 'What you will build — text in, AI result out',
        isText: true,
        text: [
          'NLP demos take text as input and return an AI result.',
          'No web framework. No HTML. Just Python + Gradio.',
          '',
          'Use this guide for:',
          '→ Sentiment analysis (positive / negative / neutral)',
          '→ Text summarization (long article → short summary)',
          '→ Text / topic / intent classification',
          '→ Named entity recognition (find people, places, dates in text)',
          '→ Question answering (give context + question → answer)',
          '→ Zero-shot classification (classify without training)',
          '→ Any HuggingFace pipeline("task") demo',
          '',
          'Do NOT use this guide for:',
          '→ ML/DL model that fits in 1GB RAM → use Streamlit Cloud guide',
          '→ Data dashboard → use Streamlit Cloud guide',
          '→ Chatbot → use the Chatbot deploy guide',
          '',
          'Why HF Spaces for NLP:',
          '   Transformer models like BERT, DistilBERT, BART need 2–4GB RAM.',
          '   Streamlit Cloud free = 1GB → crashes on transformers.',
          '   HF Spaces free CPU = 16GB → handles most NLP models.',
        ],
        note: 'If your project uses "from transformers import pipeline" — this guide is for you.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Before deployment — checklist',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Verify your NLP demo works locally first',
        isText: true,
        text: [
          '✅ Model loads without error locally',
          '✅ pipeline("task", model="...") works in a local Python script',
          '✅ Test with short and long input — both give reasonable output',
          '✅ Empty input is handled — no crash',
          '✅ Long input is limited — no crash from token overflow',
          '✅ requirements.txt exists',
          '✅ No API keys or secrets hardcoded',
          '✅ README.md created with frontmatter',
          '✅ .gitignore created',
          '',
          'Quick local test:',
          '   python app.py',
          '   App should open at http://127.0.0.1:7860',
          '   Test with example inputs',
          '',
          'Rule: If the app crashes or returns wrong output locally,',
          'fix it before pushing to Hugging Face Spaces.',
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
        label: 'Simple folder structure for an NLP Space',
        isText: true,
        text: [
          'nlp-space/',
          '  app.py           ← Gradio NLP demo (entry point)',
          '  requirements.txt ← Python packages',
          '  README.md        ← Space metadata frontmatter',
          '  .gitignore',
          '',
          'Rules:',
          '→ app.py must be at the root level',
          '→ Never commit private text datasets or training data',
          '→ Limit sample data to public/safe examples',
          '→ No API keys or credentials in any file',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '04',
    title: 'app.py — Sentiment Analysis',
    color: '#EC4899',
    steps: [
      {
        label: 'Sentiment analysis using DistilBERT',
        isFile: true,
        fileName: 'app.py (sentiment analysis)',
        commands: [
          `import gradio as gr
from transformers import pipeline

# Load model ONCE at startup — outside the function
classifier = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)

def analyze_sentiment(text):
    # Handle empty input
    if not text or not text.strip():
        return "Please enter some text."

    # Limit input length — transformers have token limits
    text = text[:1000]

    result = classifier(text)[0]
    label  = result["label"]
    score  = result["score"]

    emoji = "😊" if label == "POSITIVE" else "😞"
    return f"{emoji} {label} — {score:.1%} confidence"

demo = gr.Interface(
    fn=analyze_sentiment,
    inputs=gr.Textbox(
        label="Enter text to analyze",
        placeholder="Type a sentence here...",
        lines=4,
    ),
    outputs=gr.Textbox(label="Sentiment Result"),
    title="📊 Sentiment Analysis Demo",
    description="Detects whether text is POSITIVE or NEGATIVE using DistilBERT transformer.",
    examples=[
        ["This product is absolutely amazing and exceeded my expectations!"],
        ["The service was terrible — I will never return."],
        ["The experience was okay, nothing special."],
    ],
    theme=gr.themes.Soft(),
)

if __name__ == "__main__":
    demo.launch()`,
        ],
        note: 'Always load the pipeline() outside the function. If placed inside, the model downloads and loads on EVERY user click — making the app take 30+ seconds per request.',
      },
    ],
  },

  {
    phase: '05',
    title: 'app.py — Text Summarization',
    color: '#EC4899',
    steps: [
      {
        label: 'Text summarization using BART',
        isFile: true,
        fileName: 'app.py (summarization)',
        commands: [
          `import gradio as gr
from transformers import pipeline

# Summarization model — loaded once at startup
summarizer = pipeline(
    "summarization",
    model="sshleifer/distilbart-cnn-12-6"
)

def summarize_text(text):
    # Handle short input
    if not text or len(text.split()) < 30:
        return "Please enter at least 30 words for a meaningful summary."

    # Limit input — BART has a max token limit
    text = text[:4000]

    result = summarizer(
        text,
        max_length=130,
        min_length=30,
        do_sample=False,
    )

    return result[0]["summary_text"]

demo = gr.Interface(
    fn=summarize_text,
    inputs=gr.Textbox(
        label="Paste a long article or paragraph",
        placeholder="Paste your text here (at least 30 words)...",
        lines=10,
    ),
    outputs=gr.Textbox(label="Summary", lines=4),
    title="📄 AI Text Summarizer",
    description="Summarizes long text into key points using a DistilBART transformer.",
    theme=gr.themes.Soft(),
)

if __name__ == "__main__":
    demo.launch()`,
        ],
        note: 'sshleifer/distilbart-cnn-12-6 is a distilled (smaller) version of BART — faster and less memory-intensive than facebook/bart-large-cnn. Use the smaller model for student demos on free CPU.',
      },
      {
        label: 'Zero-shot classification — classify without training',
        isFile: true,
        fileName: 'app.py (zero-shot classification)',
        commands: [
          `import gradio as gr
from transformers import pipeline

# Zero-shot: classify text into categories without training on them
classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli"
)

def classify_text(text, labels_str):
    if not text.strip():
        return "Please enter text to classify."
    if not labels_str.strip():
        return "Please enter candidate labels."

    labels = [l.strip() for l in labels_str.split(",") if l.strip()]
    result = classifier(text[:500], candidate_labels=labels)

    output = ""
    for label, score in zip(result["labels"], result["scores"]):
        bar = "█" * int(score * 20)
        output += f"{label:<20} {score:.1%}  {bar}\\n"
    return output

demo = gr.Interface(
    fn=classify_text,
    inputs=[
        gr.Textbox(label="Text to classify", lines=3),
        gr.Textbox(
            label="Candidate labels (comma-separated)",
            value="technology, sports, politics, health, education"
        ),
    ],
    outputs=gr.Textbox(label="Classification Results", lines=6),
    title="🏷️ Zero-Shot Text Classifier",
    description="Classify text into any categories without training a model.",
    examples=[
        ["The new iPhone battery life has improved significantly.", "technology, sports, health"],
        ["The team won the championship after a thrilling final.", "technology, sports, politics"],
    ],
)

if __name__ == "__main__":
    demo.launch()`,
        ],
        note: 'Zero-shot classification is one of the most impressive demos for students — it classifies text into any categories you define, without any training data.',
      },
    ],
  },

  {
    phase: '06',
    title: 'requirements.txt',
    color: '#60A5FA',
    steps: [
      {
        label: 'requirements.txt — keep minimal',
        isFile: true,
        fileName: 'requirements.txt',
        commands: [
          `gradio
transformers
torch

# Add only if your specific model needs it:
# sentencepiece  ← for T5, XLM-RoBERTa models
# accelerate     ← only if you use device_map="auto"`,
        ],
        note: 'torch alone is ~2GB. First build takes 8–12 minutes as HF downloads and installs packages. Subsequent builds are faster due to caching. Do not add packages you do not use.',
      },
      {
        label: 'Recommended lightweight models for student demos',
        isText: true,
        text: [
          'Sentiment analysis:',
          '   distilbert-base-uncased-finetuned-sst-2-english  ← fast, small',
          '   cardiffnlp/twitter-roberta-base-sentiment        ← Twitter data',
          '',
          'Summarization:',
          '   sshleifer/distilbart-cnn-12-6    ← distilled, faster',
          '   google/flan-t5-small             ← very lightweight',
          '',
          'Zero-shot classification:',
          '   facebook/bart-large-mnli         ← standard choice',
          '',
          'Question answering:',
          '   distilbert-base-uncased-distilled-squad  ← fast, accurate',
          '',
          'Named entity recognition:',
          '   dslim/bert-base-NER              ← good for student projects',
          '',
          'Rule: Always prefer distil* or small models for CPU demos.',
          'Large models (bert-large, bart-large, t5-large) are very slow on free CPU.',
        ],
        note: 'Distilled models are 40-60% smaller and 2-3x faster than their full-size counterparts with minimal quality loss. Always use the smallest model that gives acceptable results.',
      },
    ],
  },

  {
    phase: '07',
    title: 'README.md — Space metadata',
    color: '#F59E0B',
    steps: [
      {
        label: 'README.md with required frontmatter',
        isFile: true,
        fileName: 'README.md',
        commands: [
          `---
title: NLP Text AI Demo
emoji: 📝
colorFrom: blue
colorTo: cyan
sdk: gradio
sdk_version: 4.44.0
app_file: app.py
pinned: false
---

# NLP Text AI Demo

Interactive NLP demo using HuggingFace transformers.

## What it does
Enter text and the AI model returns an analysis result.

## Model
- Task: Sentiment Analysis
- Model: DistilBERT (distilbert-base-uncased-finetuned-sst-2-english)

## Limitations
- English text only
- Max input length: 1000 characters
- Demo model — not for production use`,
        ],
        note: 'Find your exact Gradio version: python -c "import gradio; print(gradio.__version__)" — use this in sdk_version field.',
      },
    ],
  },

  {
    phase: '08',
    title: 'Create Space and deploy',
    color: '#4ADE80',
    steps: [
      {
        label: 'Create Hugging Face Space and push code',
        isText: true,
        text: [
          '1. huggingface.co → "+" → New Space',
          '   Space name: nlp-demo',
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
        label: 'Git commands to push your NLP demo',
        commands: [
          `git clone https://huggingface.co/spaces/YOUR_USERNAME/nlp-demo`,
          `cd nlp-demo`,
          `# Copy app.py, requirements.txt, README.md, .gitignore here`,
          `git add .`,
          `git commit -m "add NLP demo"`,
          `git push`,
        ],
        note: 'If git push asks for a password, use your HF access token (not account password). Create one at: huggingface.co → Settings → Access Tokens → New token (Write permission).',
      },
    ],
  },

  {
    phase: '09',
    title: 'Free tier and honest limitations',
    color: '#34D399',
    steps: [
      {
        label: 'What works and what does not on free CPU Spaces',
        isText: true,
        text: [
          'Works well on free CPU:',
          '✅ DistilBERT sentiment, NER, QA (small, fast)',
          '✅ DistilBART summarization',
          '✅ Zero-shot with bart-large-mnli (slower but works)',
          '✅ flan-t5-small, flan-t5-base',
          '',
          'Will be slow or may fail on free CPU:',
          '⚠️  bert-large, bart-large, t5-large (heavy models)',
          '⚠️  Summarizing very long documents (5000+ words)',
          '⚠️  Running multiple large models in the same app',
          '',
          'First build takes 8–15 min:',
          '   torch + transformers are ~2GB total download.',
          '   This is normal — wait it out. Subsequent builds are faster.',
          '',
          'Spaces sleep after inactivity:',
          '   First request after sleep: ~30 seconds to wake up.',
          '   Once awake, responses are fast.',
          '',
          'Verify current hardware specs at huggingface.co/pricing.',
        ],
        note: 'For student demos, always test your specific model on CPU before deploying. Some bart-large models time out on free CPU for long inputs.',
      },
    ],
  },

  {
    phase: '10',
    title: 'Common errors and fixes',
    color: '#F97316',
    steps: [
      {
        label: 'Error 1 — ModuleNotFoundError',
        isText: true,
        text: [
          'Problem: "ModuleNotFoundError: No module named X"',
          'Fix: Add the missing package to requirements.txt and push.',
          '',
          'Common additions:',
          '   sentencepiece  ← T5, XLM-RoBERTa models need this',
          '   protobuf       ← some tokenizers need this',
        ],
        note: '',
      },
      {
        label: 'Error 2 — CUDA / GPU errors',
        isText: true,
        text: [
          'Problem: "RuntimeError: CUDA is not available"',
          '',
          'Fix: Force CPU in the pipeline:',
          '   classifier = pipeline("sentiment-analysis", model="...", device=-1)',
          '   device=-1 = CPU',
          '',
          'Or:',
          '   import torch',
          '   device = 0 if torch.cuda.is_available() else -1',
          '   classifier = pipeline("...", device=device)',
        ],
        note: '',
      },
      {
        label: 'Error 3 — Input too long / token limit exceeded',
        isText: true,
        text: [
          'Problem: "Token indices sequence length is longer than..."',
          '',
          'Fix: Truncate input before passing to the model:',
          '   text = text[:1000]   ← for classification',
          '   text = text[:4000]   ← for summarization',
          '',
          'Or use the truncation parameter:',
          '   result = classifier(text, truncation=True, max_length=512)',
        ],
        note: '',
      },
      {
        label: 'Error 4 — Space stuck building / out of memory',
        isText: true,
        text: [
          'Problem: Space fails to build or crashes at runtime.',
          '',
          'Cause A: Model too large for free CPU memory.',
          'Fix: Switch to a smaller distilled model.',
          '   facebook/bart-large-cnn  →  sshleifer/distilbart-cnn-12-6',
          '   bert-large               →  distilbert-base-uncased',
          '',
          'Cause B: Multiple large models loaded at once.',
          'Fix: Use only one model per demo app.',
          '',
          'Cause C: Wrong task/model combination.',
          '   Example: pipeline("summarization", model="bert-base-uncased")',
          '   BERT is not a summarization model.',
          'Fix: Match task to the correct model type.',
        ],
        note: '',
      },
      {
        label: 'Error 5 — Wrong task / model combination',
        isText: true,
        text: [
          'Common wrong combinations:',
          '',
          '   ❌ pipeline("summarization", model="bert-base-uncased")',
          '      BERT is encoder-only — not for generation',
          '',
          '   ❌ pipeline("sentiment-analysis", model="facebook/bart-large-cnn")',
          '      BART-CNN is trained for summarization, not sentiment',
          '',
          'Correct task-model pairs:',
          '   Sentiment:       distilbert-base-uncased-finetuned-sst-2-english',
          '   Summarization:   sshleifer/distilbart-cnn-12-6',
          '   Zero-shot:       facebook/bart-large-mnli',
          '   NER:             dslim/bert-base-NER',
          '   QA:              distilbert-base-uncased-distilled-squad',
          '',
          'Check HuggingFace Hub model page — it shows the task the model was trained for.',
        ],
        note: '',
      },
    ],
  },

  {
    phase: '11',
    title: 'Final checklist',
    color: '#34D399',
    steps: [
      {
        label: 'Verify before sharing your NLP demo URL',
        isText: true,
        text: [
          '── Code ─────────────────────────────────────────────',
          '  app.py works locally',
          '  Model loaded outside function (not inside)',
          '  Empty input handled gracefully',
          '  Long input truncated to avoid token overflow',
          '  Task and model are correctly matched',
          '',
          '── Files ────────────────────────────────────────────',
          '  requirements.txt includes gradio + transformers + torch',
          '  README.md has correct frontmatter (sdk, app_file)',
          '  .gitignore excludes .env and venv/',
          '',
          '── Deployment ───────────────────────────────────────',
          '  Space builds without errors',
          '  App loads in browser',
          '  Example inputs return expected output',
          '  Build/Logs tab shows no errors',
          '',
          '── Sharing ───────────────────────────────────────────',
          '  Space URL in GitHub README',
          '  Space URL in LinkedIn Projects',
          '  Space URL in resume',
          '  README mentions model and limitations honestly',
        ],
        note: 'A live NLP demo on HF Spaces shows recruiters you can use the HuggingFace ecosystem — a key skill for NLP and AI engineering roles.',
      },
    ],
  },
]

// ─── Image AI Demo → HF Spaces ───────────────────────────────────────────────
