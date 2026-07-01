import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#EC4899'

export default function ModalPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Serverless Compute">
      <ToolHeader
        icon="🚀"
        title="Modal — Serverless GPU Compute for Python"
        tagline="Run AI models on H100 GPUs with one decorator — scale to zero, pay per second"
        badges={[['✓ FREE Credits', '#4ADE80'], ['modal.com', color], ['Serverless GPU', 'var(--text-muted)']]}
        overview={"Modal is a serverless cloud platform that turns GPU infrastructure into Python functions. Instead of provisioning servers, writing Dockerfiles, configuring Kubernetes, or managing cloud accounts, you write a Python function and decorate it with @app.function(gpu=\"H100\"). Modal handles everything else: spinning up a container with the right GPU drivers, installing your dependencies, running your code, scaling to handle concurrent requests, and spinning back down to zero when done. You pay only for the compute time your code actually runs — not for idle capacity."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Getting Started with Modal — Beginner Introduction to Serverless GPU', url: 'https://www.youtube.com/watch?v=Y7n8sIZV1vQ', dur: '~15 min', note: 'Best first watch — install Modal, write your first decorated function, run on cloud GPU' },
            { label: 'Building End to End ML Applications on Modal — Fine-tune and Deploy', url: 'https://www.youtube.com/watch?v=df-8fiByXMI', dur: '~45 min', note: 'Full ML workflow: fine-tune a diffusion model and deploy it as a web endpoint on Modal' },
            { label: 'Modal LLM Deployment Tutorial — Deploy Fine-Tuned Models with vLLM and LoRA', url: 'https://www.youtube.com/watch?v=ABF5WRPeaEE', dur: '~25 min', note: 'Production LLM deployment — serve a fine-tuned model via vLLM inference on Modal GPUs' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What Modal is" color={color} />
          <InfoBox color={color}>Modal replaces the entire DevOps stack for AI workloads with Python decorators. Where running a model on GPU traditionally requires provisioning EC2 instances, writing Dockerfiles, pushing images to ECR, configuring security groups, and managing auto-scaling groups, Modal reduces this to three lines: define your container image with the Python packages you need, write a function, decorate it with the GPU type. Modal raised an $87M Series B in October 2025 and by December 2025 was managing 20,000+ concurrent GPUs across 20+ locations globally.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The critical feature is scale-to-zero billing. Traditional GPU cloud instances run 24/7 whether your code is executing or not. A single A100 instance costs ~$3/hour running idle. Modal charges only for actual execution time — measured in milliseconds. A function that runs for 500ms on an H100 costs a fraction of a cent. This makes GPU compute economically viable for projects with sporadic usage: a research script that runs once a day, a Telegram bot that processes voice messages occasionally, or a model endpoint that serves unpredictable traffic. You never pay for idle GPUs.</p>
        </Block>
        <Block>
          <SubHead label="How Modal works — the decorator model" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Define your container image', body: 'Use Modal\'s Image builder to specify your environment in Python — no Dockerfile needed. `image = modal.Image.debian_slim().pip_install("torch", "transformers", "diffusers")`. Modal builds and caches this image. Subsequent runs with the same image start in under 2 seconds.' },
            { n: '2', title: 'Decorate your function', body: 'Add `@app.function(gpu="H100", image=image)` above any Python function. That\'s all it takes to tell Modal: run this function on an H100 GPU, in the container defined by `image`. You can also specify `gpu="A100"`, `gpu="T4"`, `cpu=4`, `memory=32768`, or `gpu=["H100", "A100"]` for fallback.' },
            { n: '3', title: 'Run locally or deploy as endpoint', body: 'Run the function once with `modal run my_script.py`. Or convert it to a persistent web endpoint with `@app.function(gpu="H100")` combined with `@modal.web_endpoint()` — Modal gives you an HTTPS URL you can call from anywhere, auto-scaling to handle concurrent requests.' },
            { n: '4', title: 'Modal spins up the container', body: 'When called, Modal provisions a container with the requested GPU, restores from a memory snapshot if available (sub-second cold starts), and runs your code. GPU Memory Snapshotting (launched late 2025) pre-warms model weights so containers restart with models already loaded.' },
            { n: '5', title: 'Pay only for execution', body: 'The container runs for the duration of your function and shuts down immediately. You are billed per millisecond of GPU time. No minimum commitments, no reserved instances, no idle charges. The free tier includes $30/month in credits — enough to run serious GPU experiments without a credit card.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Key features" color={color} />
          <CardGrid color={color} items={[
            { name: 'GPU Access (A100, H100)', desc: 'On-demand access to the latest GPU hardware: NVIDIA A10G ($1.10/hr), A100 (40GB and 80GB), H100 SXM ($4.29/hr). Request any GPU type with a single decorator argument. No waitlists, no reserved capacity required.' },
            { name: 'Scale to Zero', desc: 'Containers spin down to zero when idle. You pay nothing when your code is not running. When traffic arrives, Modal spins containers back up — typically in 2–4 seconds cold, or under 1 second with GPU Memory Snapshotting enabled.' },
            { name: 'Container Images in Python', desc: 'Define your environment with `modal.Image` — install packages, copy local files, set environment variables, run build commands. No Dockerfile, no Docker knowledge required. Modal caches layers so rebuilds only reinstall what changed.' },
            { name: 'Web Endpoints', desc: 'Expose any Modal function as an HTTPS API endpoint with `@modal.web_endpoint()` or a full FastAPI/Flask app with `@modal.asgi_app()`. Modal handles TLS, routing, and auto-scaling. Deploy an AI model API in 10 lines of Python.' },
            { name: 'Concurrent Execution', desc: 'Modal auto-scales horizontally. If 100 requests arrive simultaneously, Modal spins up 100 containers in parallel. Each container handles one request. You specify `concurrency_limit` to cap costs or `allow_concurrent_inputs` for batching.' },
            { name: 'Persistent Volumes', desc: 'Mount a Modal Volume to cache large model weights across runs. Download a 70B model once, cache it in a Volume, and all subsequent function calls read from the cache — no re-downloading 40GB of weights on every cold start.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Modal vs Replicate vs AWS Lambda" color={color} />
          <Compare color={color} items={[
            { label: 'Modal', badge: 'Python-native, GPU-first', body: 'Full Python control — your own code, any model, any framework. GPU access with decorators. Scale to zero billing. Free $30/month credits. Best for: custom model inference, ML training, research scripts, AI APIs you build yourself. Requires Python knowledge.' },
            { label: 'Replicate', badge: 'Model marketplace', body: 'Run pre-packaged models (Stable Diffusion, Whisper, LLAMA, thousands more) via API — no code required. You pick a model from their catalogue, send inputs, get outputs. Best for: using existing models without writing inference code. Less control, higher per-call cost.' },
            { label: 'AWS Lambda', badge: 'General serverless, no GPU', body: 'Serverless compute for CPU workloads. No GPU support. 15-minute time limit. Best for: APIs, webhooks, event processing — not AI model inference. Large ML models cannot run on Lambda due to package size limits and no GPU. Modal is what Lambda would be if it supported GPU.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Use cases" color={color} />
          <CardGrid color={color} items={[
            { name: 'AI model inference', desc: 'Serve any HuggingFace model as an API endpoint. Load the model weights once using Volume caching, expose it via `@modal.web_endpoint()`. Handle burst traffic with automatic horizontal scaling. Zero infrastructure management.' },
            { name: 'Fine-tuning jobs', desc: 'Run fine-tuning scripts (QLoRA, full fine-tune) on Modal A100s. Your training script runs in the cloud with full GPU access. Results saved to a Volume. Pay only for the hours your training job runs — not for an always-on instance.' },
            { name: 'Batch processing', desc: 'Process thousands of documents, images, or audio files in parallel. Use `map()` to distribute work across many containers simultaneously. What takes 8 hours sequentially on your laptop takes 15 minutes with 32 parallel Modal containers.' },
            { name: 'Web scrapers and crawlers', desc: 'Run Playwright or Puppeteer browsers in Modal containers for large-scale web scraping. No browser setup locally. Scale to hundreds of parallel browser instances. Pay per second of crawl time.' },
            { name: 'Scheduled ML pipelines', desc: 'Run nightly model retraining, weekly batch inference, or daily data processing with `@app.function(schedule=modal.Period(hours=24))`. Cron jobs that run on GPU — automatically, without any server management.' },
            { name: 'Jupyter-style experiments', desc: 'Run GPU-accelerated notebooks or experiment scripts with `modal run`. Your local Python environment talks to Modal\'s GPU cloud. Interactive development with cloud-scale compute — no GPU required on your laptop.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Run any Python function on GPU hardware (A100, H100) with a single decorator — no Docker, no Kubernetes',
            'Deploy a HuggingFace model as a production HTTPS API endpoint in under 20 lines of Python',
            'Fine-tune LLMs or image generation models on Modal GPUs without provisioning any servers',
            'Process large datasets in parallel by distributing work across hundreds of Modal containers simultaneously',
            'Cache model weights in Modal Volumes so subsequent runs start instantly without re-downloading 40GB files',
            'Run scheduled ML pipelines (nightly retraining, batch inference) with Python cron decorators',
        ]} />
      </Block>
      <ProjectTask
        title="Deploy a Real AI Model as an API"
        description={"Deploy a HuggingFace text generation model as a live HTTPS API endpoint on Modal. You will experience the full serverless GPU workflow: define container image, load model weights, expose as endpoint, call from your browser. This is closer to real production AI engineering than anything you will build locally."}
        costNote={"TOTAL COST: Free — $30/month credits, T4 GPU ~$0.30/hr, small experiments cost cents"}
      >
        <Steps color={color} items={[
          { n: '1', title: 'Install Modal and authenticate', body: 'pip install modal. Run modal setup — it opens your browser to modal.com/signup (free, no credit card). Authenticate your CLI. You now have $30/month in free credits.' },
          { n: '2', title: 'Write your inference function', body: 'Create inference.py. Import modal. Define `image = modal.Image.debian_slim().pip_install("transformers", "torch")`. Define `app = modal.App()`. Write a function that loads a small HuggingFace model (try `distilgpt2` or `facebook/opt-125m`) and runs text generation.' },
          { n: '3', title: 'Add the GPU decorator', body: 'Decorate your function with `@app.function(gpu="T4", image=image)`. T4 is the cheapest Modal GPU — perfect for experiments. Add `@modal.web_endpoint()` to expose it as an HTTPS API that accepts JSON.' },
          { n: '4', title: 'Deploy and call it', body: 'Run `modal deploy inference.py`. Modal builds the container, deploys it, and gives you an HTTPS URL. Call it with curl or fetch() from JavaScript. Your AI model is now a live API on GPU — callable from anywhere in the world.' },
          { n: '5', title: 'Add Volume caching', body: 'Add a `modal.Volume` to cache the model weights. On first run, the model downloads from HuggingFace and saves to the Volume. On all subsequent calls, it loads from the Volume — cold starts drop from 60 seconds to 3 seconds. This is how production AI APIs handle model loading.' },
        ]} />
      </ProjectTask>
        <ProTip>
        Start with Modal's example gallery at modal.com/docs/examples before writing code from scratch. Modal maintains production-quality examples for common AI tasks: LLM inference with vLLM, Stable Diffusion image generation, Whisper transcription, fine-tuning with QLoRA. Copy an example, understand each part, then modify it for your use case. This is much faster than starting from scratch and gives you production patterns you would not discover on your own — like GPU Memory Snapshotting and Volume caching for fast cold starts.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/data/langfuse', label: 'Langfuse' }}
        next={{ path: '/ai-lab', label: 'AI Lab' }}
      />
    </ToolPageShell>
  )
}
