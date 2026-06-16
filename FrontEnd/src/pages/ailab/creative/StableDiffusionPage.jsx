import ToolPageLayout from '../ToolPageLayout'
const tool = { id: 'stable-diffusion', category: 'creative', name: 'Stable Diffusion', tagline: 'Free unlimited image AI — runs on your own computer', icon: '🌈', color: '#8B5CF6', free: true, freeTier: '100% Free — open source, run locally', officialUrl: 'https://comfy.org' }
const videos = [
  { label: 'Stable Diffusion 3 — Run Locally with ComfyUI Tutorial', url: 'https://www.youtube.com/watch?v=-ujULh1aSHw', duration: '25 min', note: 'Complete local setup guide with ComfyUI interface' },
  { label: 'Stable Diffusion Beginner Guide — AUTOMATIC1111', url: 'https://www.youtube.com/watch?v=8F0tPMGEJFk', duration: '30 min', note: 'Traditional interface, more beginner-friendly' },
]
const overview = `Stable Diffusion is an open-source image generation model that runs on your own computer, completely free, with no daily limits and no censorship. Unlike DALL-E or Midjourney, you own the software and generate images privately on your hardware. On a modern GPU (NVIDIA 6GB+ VRAM), image generation takes 5-30 seconds. On CPU (no GPU), it is slower but still works. With the right setup, the image quality matches and often exceeds DALL-E 3.`
const sections = [{ content: `Two main interfaces exist for Stable Diffusion. AUTOMATIC1111 (also called Stable Diffusion Web UI) is the classic interface — feature-rich, widely documented, large community. ComfyUI is the newer, more powerful node-based interface favored by advanced users for precise control over the generation process. For beginners, AUTOMATIC1111 is easier to start with. For serious use, ComfyUI offers better results through its visual workflow builder.

Beyond basic text-to-image, Stable Diffusion has capabilities that cloud tools do not offer freely. img2img takes an existing image and transforms it based on a text prompt — modify a photo's style, add or change elements, use a rough sketch as a starting point. Inpainting lets you mask a specific area of an image and regenerate only that part. ControlNet enables precise control over composition and pose using reference images.

The model ecosystem is enormous. The base Stable Diffusion model is one of hundreds of fine-tuned variants available for free on Hugging Face and Civitai. There are models fine-tuned for photorealism (Realistic Vision), anime style (Anything V5), architecture visualization, product photography, and countless other specializations. Loading a different model takes seconds and gives you a completely different visual style.

The hardware requirement is the honest limiting factor. With an NVIDIA GPU and 6GB+ VRAM, you get fast, high-quality results. With a modern Mac (M1/M2/M3 chip), performance is reasonable. On an older laptop with only CPU, generation is possible but slow (2-5 minutes per image). If your hardware is not suitable, use Bing Image Creator (DALL-E 3 free) as the alternative.` }]
const canDo = [
  'Generate unlimited images with no daily limits, no content restrictions, no cost',
  'Modify existing photos — change style, add elements, transform composition with img2img',
  'Control exact image composition and character poses using ControlNet',
  'Access hundreds of specialized fine-tuned models for different artistic styles',
  'Run completely offline — no data leaves your machine, perfect for private content',
]
const task = {
  title: 'Style Transfer Experiment',
  description: 'Use Stable Diffusion\'s img2img feature to transform a photo in 3 different styles. Take a photo of your project setup, code on screen, or any scene and render it in different artistic styles.',
  steps: [
    'Install AUTOMATIC1111: follow the one-click installer on GitHub',
    'Download a checkpoint model: Realistic Vision V5.1 (photorealistic) from Civitai',
    'Take a photo of your workspace, code, or any scene',
    'Use img2img with the photo as input and prompts describing different styles',
    'Try: "professional photography", "cyberpunk neon aesthetic", "clean minimal illustration"',
    'Compare the outputs — notice how the composition is preserved while the style changes',
  ],
  cost: 'TOTAL COST: ₹0 — Stable Diffusion and all models are open source and free',
}
const tip = `If you do not have a suitable GPU, use Google Colab (free tier) to run Stable Diffusion. There are pre-built Colab notebooks that install and run AUTOMATIC1111 in the cloud — you get GPU access for free on the free tier (limited hours per day). Search "AUTOMATIC1111 Colab notebook" on GitHub for ready-to-use notebooks.`
export default function StableDiffusionPage() {
  return <ToolPageLayout tool={tool} videos={videos} overview={overview} sections={sections} canDo={canDo} task={task} tip={tip} />
}
