import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#EC4899'

export default function ReplicatePage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="APIs">
      <ToolHeader
        icon="🔁"
        title="Replicate — Run Any AI Model With One API Call"
        tagline="Image generation, video, audio, language — any model, pay per second"
        badges={[['✓ Free Credits', '#4ADE80'], ['replicate.com', color], ['Pay-per-use', 'var(--text-muted)']]}
        overview={"Replicate is a cloud platform that works like \"GitHub for AI models plus serverless GPUs.\" It gives you instant API access to 100,000+ open-source machine learning models — image generation with FLUX and Stable Diffusion, video synthesis, voice cloning, speech transcription, language models — all without owning a single GPU or managing any infrastructure. You pay only for the compute seconds your prediction uses. The model runs, you get the output, billing stops. There are no monthly minimums, no idle charges for public models, and no long-term commitments. For developers, this means you can generate a photorealistic image, transcribe audio, or run a 70-billion-parameter language model with literally one API call and a few lines of Python — then pay a few cents for the result. It removes the biggest barrier to experimenting with cutting-edge ML: the need for expensive hardware."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Replicate API Tutorial — Run AI Models in Python', url: 'https://www.youtube.com/watch?v=7ZtuQlX8Yc8', dur: '~14 min', note: 'Full Python walkthrough: API key setup, SDXL image generation, saving outputs' },
            { label: 'Build an Image Generator App with Replicate + Streamlit', url: 'https://www.youtube.com/watch?v=uj6KKoJyTCQ', dur: '~18 min', note: 'End-to-end project — Streamlit UI + Replicate backend, deployable to Streamlit Cloud' },
            { label: 'Replicate AI — Generate Images, Video & Audio via API', url: 'https://www.youtube.com/watch?v=iMTGAHXFIXo', dur: '~20 min', note: 'Covers multiple model types: FLUX, Stable Diffusion, MusicGen, Whisper in one session' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="The model marketplace concept" color={color} />
          <InfoBox color={color}>Replicate works like an app store for ML models. A researcher trains a model, packages it with Cog (Replicate's open-source containerization tool), and publishes it to replicate.com. You — a developer with zero ML knowledge — find it, call it via API, and get results. The researcher's model gets discovered and used at scale; you skip months of setup. Everyone wins.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>Before platforms like Replicate, running an image generation model required: a powerful GPU machine (NVIDIA A100 = $10,000+ to buy), CUDA drivers and Python environment setup, downloading multi-gigabyte model weights, understanding PyTorch or diffusers library internals, and writing inference code from scratch. Replicate collapses this entire stack into a single API call. The GPU spins up on demand, your prediction runs in seconds, and you get a URL pointing to your output. The concept of "pay per second of compute" means that generating one image might cost $0.003. Running a 10-second video generation might cost $0.50. You only pay when predictions are actually running — idle time and setup time are free.</p>
        </Block>
        <Block>
          <SubHead label="Available model categories" color={color} />
          <CardGrid color={color} items={[
            { name: 'Text-to-Image (66+ models)', desc: 'FLUX.1 Pro and Schnell from Black Forest Labs (state-of-the-art open-source), Stable Diffusion XL, Imagen. Generate photorealistic, artistic, or stylized images from text prompts.' },
            { name: 'Text-to-Video (73+ models)', desc: 'Veo 3.1, Seedance, Minimax, Kling. Generate short video clips from text descriptions or animate still images. Some support audio-synchronized generation.' },
            { name: 'Text-to-Speech (25+ models)', desc: 'ElevenLabs, Bark, Kokoro. Convert text to natural-sounding speech with voice cloning and multiple language support.' },
            { name: 'Speech-to-Text (13+ models)', desc: "OpenAI Whisper and Faster Whisper variants. Transcribe audio files in 99 languages with timestamps, speaker diarization, and word-level accuracy." },
            { name: 'Music Generation (16+ models)', desc: 'MusicGen from Meta. Generate full music tracks from text descriptions — specify genre, tempo, mood, instruments. Up to 30 seconds of high-quality audio.' },
            { name: 'Language Models (LLMs)', desc: 'Llama 3.1 405B (most powerful open-source LLM from Meta), Mixtral, Mistral. Run massive language models without managing GPU servers.' },
            { name: 'Vision & Image Analysis', desc: 'LLaVA, Gemini Vision variants. Analyze images, answer questions about visual content, extract structured data from photos and diagrams.' },
            { name: 'Restoration & Editing', desc: 'Background removal (RMBG, BiRefNet), face restoration (GFPGAN), upscaling (Real-ESRGAN), inpainting, style transfer. Process and enhance existing images programmatically.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — your first prediction" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Create your account and get API token', body: 'Go to replicate.com → Sign up (GitHub login recommended) → Click your avatar → API tokens → Create token. New accounts receive free starter credits. Copy your token immediately — it is shown only once.' },
            { n: '2', title: 'Install the Python client', body: "pip install replicate\n\nThen set your API token as an environment variable:\nexport REPLICATE_API_TOKEN=r8_your_token_here\n\nOr in a .env file (recommended):\nREPLICATE_API_TOKEN=r8_your_token_here" },
            { n: '3', title: 'Generate your first image with FLUX', body: "import replicate\n\noutput = replicate.run(\n    \"black-forest-labs/flux-schnell\",\n    input={\"prompt\": \"a golden retriever on a surfboard, photorealistic\"}\n)\n\n# output is a list of FileOutput objects\nwith open('output.png', 'wb') as f:\n    f.write(output[0].read())\n\nprint('Image saved as output.png')" },
            { n: '4', title: 'Run any other model the same way', body: "# Whisper — transcribe audio\noutput = replicate.run(\n    \"openai/whisper\",\n    input={\"audio\": open(\"audio.mp3\", \"rb\"), \"language\": \"en\"}\n)\nprint(output[\"transcription\"])\n\n# MusicGen — generate music\noutput = replicate.run(\n    \"meta/musicgen\",\n    input={\"prompt\": \"upbeat jazz, 120bpm\", \"duration\": 10}\n)" },
            { n: '5', title: 'Browse models and find parameters', body: 'Every model on replicate.com has an interactive playground. Run it in the browser first to understand the input parameters (prompt, width, height, num_inference_steps, guidance_scale, seed, etc.). Then copy the API code snippet directly from the model page — Replicate auto-generates Python, JavaScript, and cURL examples for every model.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Replicate Deployments — host your own model" color={color} />
          <InfoBox color={color}>Deployments give you a private, production-grade API endpoint for any model — community models or your own custom models. Your endpoint scales automatically based on traffic, eliminates cold-start delays with always-on instances, and can be configured with custom hardware (A100, H100, T4) without changing any code.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>The workflow for publishing your own model uses Cog — Replicate's open-source containerization tool. You define your model's environment (Python version, dependencies, GPU requirements) and write a Predict class with a predict() method. Cog handles generating the API server, Docker container, and cloud deployment automatically. This means a researcher or developer with a custom PyTorch model can publish it as a public or private API endpoint in about 30 minutes, without writing any server code.</p>
          <CardGrid color={color} items={[
            { name: 'Scale-to-zero', desc: 'Deployments can scale to zero instances when idle, saving cost. Traffic triggers automatic scale-up. Perfect for low-traffic use cases where cost efficiency matters more than instant response.' },
            { name: 'Always-on instances', desc: 'For production apps where cold starts are unacceptable, configure minimum instances. Your model stays warm and ready. You pay for reserved compute but eliminate the 10-30 second first-prediction delay.' },
            { name: 'Hardware selection', desc: 'Choose from NVIDIA T4, A40, A100, H100 GPUs or CPU-only instances. Switch hardware types without code changes. Real-time cost estimates shown as you configure.' },
            { name: 'Private models', desc: 'Push custom, proprietary models as private endpoints. Only accessible with your API token. Use for fine-tuned models or internal tooling that should not be publicly visible.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Replicate vs Hugging Face vs Modal" color={color} />
          <Compare color={color} items={[
            { label: 'What it is', badge: 'Different purposes', body: 'Replicate: run community models via API, pay per prediction. Hugging Face: the open-source hub — model discovery, datasets, training infrastructure, Inference API. Modal: run arbitrary Python functions on cloud GPUs, pay per second. Each solves a different problem.' },
            { label: 'Ease of use', badge: 'Replicate wins for beginners', body: 'Replicate: one function call, no setup. Hugging Face Inference API: similar simplicity but fewer model categories. Modal: requires writing Python infrastructure code — much steeper learning curve. For "I want to call a model and get output," Replicate is fastest to working code.' },
            { label: 'Model variety', badge: 'Replicate leads on creative AI', body: 'Replicate excels at image, video, audio, and creative models. Hugging Face has the largest overall model catalog (500,000+ models) including obscure research models, NLP pipelines, and specialized classifiers. Modal has no model catalog — you bring your own or load from Hugging Face inside your Modal function.' },
            { label: 'Pricing', badge: 'Depends on use case', body: 'Replicate: pay per prediction (seconds of compute). Hugging Face Inference API: free tier for smaller models, Inference Endpoints for dedicated hosting. Modal: pay per GPU-second, very cost-efficient for custom workloads. For occasional image generation, Replicate is cheapest. For continuous workloads, Modal can be more cost-efficient.' },
            { label: 'Best for', badge: 'Pick by use case', body: 'Replicate: "I want to run FLUX/Stable Diffusion/Whisper/MusicGen now, with minimal code." Hugging Face: "I want to explore the research ecosystem, fine-tune models, or use NLP pipelines." Modal: "I have a custom Python ML script and want to run it on cloud GPUs with full control."' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Use cases for students and developers" color={color} />
          <CardGrid color={color} items={[
            { name: 'AI image generation app', desc: 'Build a web app where users type a description and get an AI-generated image. Use FLUX.1 Schnell for fast generations (~3 seconds). Deploy to Streamlit or Vercel. A complete portfolio project in a weekend.' },
            { name: 'Podcast transcription tool', desc: 'Upload an MP3, get back a full transcript with timestamps. Use Whisper on Replicate. Process audio files up to hours long. Add speaker labels, export to SRT subtitle format.' },
            { name: 'Background removal API', desc: 'Build a micro-service that accepts an image URL and returns the subject with background removed. Use RMBG or BiRefNet on Replicate. Useful for product photo automation, profile picture tools.' },
            { name: 'AI music generator', desc: 'Text prompt → 10-30 seconds of generated music using MusicGen. Specify genre, instruments, tempo. Useful for app background music, content creation tools, or demonstrating generative audio to non-technical audiences.' },
            { name: 'Image-to-video animation', desc: 'Take a still image and animate it into a short video clip. Demonstrate creative AI capabilities in portfolio projects. Some models support image + text description to guide the motion.' },
            { name: 'Automated image pipeline', desc: "Batch-process images: upscale low-res photos with Real-ESRGAN, restore old faces with GFPGAN, or run style transfer on 100 images programmatically. Replicate's async predictions API handles batches without blocking your code." },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span>
            <span className="tool-layout-task__label">PROJECT — Build an AI Image Generator Web App</span>
          </div>
          <p className="tool-layout-task__desc">Build a web app where a user types any text description, clicks Generate, and receives an AI-generated image using FLUX via Replicate's API. Use Streamlit (easiest), Flask, or FastAPI as your backend. Focus on: (1) correct API call with FLUX.1 Schnell, (2) displaying the output image in the UI, (3) handling errors gracefully (invalid prompt, API limit), (4) a clean UI with a loading state while the image generates. This is a complete, deployable portfolio project demonstrating real AI integration.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Set up environment', body: 'pip install replicate streamlit python-dotenv\nCreate .env with REPLICATE_API_TOKEN=r8_your_token\nCreate .gitignore with .env as the first line — never commit API keys.' },
            { n: '2', title: 'Write the core generation function', body: "import replicate\nimport os\nfrom dotenv import load_dotenv\n\nload_dotenv()\n\ndef generate_image(prompt: str) -> str:\n    output = replicate.run(\n        \"black-forest-labs/flux-schnell\",\n        input={\"prompt\": prompt, \"num_outputs\": 1}\n    )\n    return str(output[0])  # returns a URL to the generated image" },
            { n: '3', title: 'Build the Streamlit UI', body: "import streamlit as st\nfrom generate import generate_image\n\nst.title('AI Image Generator')\nprompt = st.text_input('Describe your image')\n\nif st.button('Generate') and prompt:\n    with st.spinner('Generating...'):\n        url = generate_image(prompt)\n        st.image(url, caption=prompt)\n\nRun with: streamlit run app.py" },
            { n: '4', title: 'Improve and experiment', body: 'Add parameters: aspect ratio selector, number of images (1-4), a style dropdown (photorealistic, anime, oil painting — add these words to the prompt). Try swapping flux-schnell for flux-pro for higher quality. Time the predictions and show the generation time in the UI.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">ESTIMATED COST: ~$0.003 per image with flux-schnell — free credits cover 100+ test images</span></div>
        </div>
        <ProTip>
        Always test a model in Replicate's browser playground before writing any code. Every model page has an interactive demo where you can adjust every parameter and see results instantly. Once you find settings that produce good outputs, click "API" on the result — Replicate shows you the exact Python, Node.js, or cURL code that reproduces that specific prediction, with all your chosen parameters already filled in. This saves 30 minutes of trial-and-error in code.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/apis/aws-bedrock', label: 'AWS Bedrock' }}
        next={{ path: '/ai-lab/apis/groq', label: 'Groq' }}
      />
    </ToolPageShell>
  )
}
