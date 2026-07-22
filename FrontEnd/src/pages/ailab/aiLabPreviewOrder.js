/**
 * Student-first tool order for AI Lab — most useful / free / career-relevant first.
 * Not alphabetical. Used for preview rows, expanded grids, category tabs, and search.
 */
export const STUDENT_TOOL_ORDER = {
  foundations: ['gen-ai', 'prompt-eng', 'rag', 'loop-engineering', 'embeddings', 'fine-tuning', 'model-training', 'benchmark-evals'],
  chatbots: ['chatgpt', 'gemini', 'claude', 'perplexity', 'deepseek', 'ms-copilot', 'notebooklm', 'huggingchat', 'youcom', 'grok', 'qwen', 'kimi'],
  builders: ['bolt-new', 'v0', 'replit', 'lovable', 'streamlit', 'gradio', 'vercel-ai-sdk'],
  coding: ['claude-code', 'cursor', 'copilot', 'cline', 'kilo-code', 'aider', 'roo-code', 'windsurf', 'gemini-cli', 'continue-dev', 'codeium', 'trae', 'openai-codex', 'jules', 'amazon-q', 'qodo', 'tabnine'],
  apis: ['openrouter', 'groq', 'google-ai-studio', 'gemini-api', 'huggingface', 'together-ai', 'cerebras', 'sambanova', 'openai-api', 'anthropic-api', 'mistral-api', 'replicate', 'cohere', 'aws-bedrock', 'azure-openai'],
  agents: ['openclaw', 'hermes', 'mcp', 'langchain', 'langgraph', 'crewai', 'smolagents', 'pydantic-ai', 'llamaindex', 'autogen', 'metagpt'],
  automation: ['n8n', 'flowise', 'dify', 'make', 'zapier', 'ifttt'],
  local: ['ollama', 'lmstudio', 'jan', 'litelllm', 'oobabooga', 'localai'],
  vector: ['chromadb', 'supabase-vector', 'qdrant', 'pinecone', 'weaviate'],
  data: ['colab', 'kaggle', 'julius', 'code-interpreter', 'langfuse', 'modal', 'wandb'],
  security: ['semgrep', 'github-adv-sec', 'snyk', 'gitguardian', 'sonarqube', 'trivy', 'wiz'],
  creative: ['dalle-free', 'canva-ai', 'gamma', 'stable-diffusion', 'flux', 'ideogram', 'leonardo', 'midjourney'],
  media: ['runway', 'suno', 'luma', 'pika', 'kling', 'udio'],
  voice: ['whisper', 'elevenlabs'],
  career: ['teal', 'rezi', 'grammarly', 'pramp', 'kickresume', 'notion-ai'],
}

const TAG_PRIORITY = {
  'must-know': 0,
  trending: 1,
  popular: 2,
  'open-source': 3,
  new: 4,
  enterprise: 5,
}

function rankInCategory(toolId, categoryId) {
  const order = STUDENT_TOOL_ORDER[categoryId]
  if (!order) return 9999
  const idx = order.indexOf(toolId)
  return idx === -1 ? 9999 : idx
}

function tagScore(tool) {
  if (!tool.tags?.length) return 99
  return Math.min(...tool.tags.map(t => TAG_PRIORITY[t] ?? 50))
}

/** Sort tools within one category by student usefulness. */
export function sortToolsForCategory(tools, categoryId) {
  const order = STUDENT_TOOL_ORDER[categoryId]
  if (!order?.length) return tools
  return [...tools].sort((a, b) => {
    const ai = rankInCategory(a.id, categoryId)
    const bi = rankInCategory(b.id, categoryId)
    if (ai !== bi) return ai - bi
    const ta = tagScore(a)
    const tb = tagScore(b)
    if (ta !== tb) return ta - tb
    return 0
  })
}

/** Sort for flat grids: single category, or all/search grouped by category then usefulness. */
export function sortToolsByUsefulness(tools, activeCategory, categorySequence = []) {
  if (activeCategory && activeCategory !== 'all') {
    return sortToolsForCategory(tools, activeCategory)
  }
  const catRank = new Map(categorySequence.filter(c => c.id !== 'all').map((c, i) => [c.id, i]))
  return [...tools].sort((a, b) => {
    const ca = catRank.get(a.category) ?? 999
    const cb = catRank.get(b.category) ?? 999
    if (ca !== cb) return ca - cb
    const ai = rankInCategory(a.id, a.category)
    const bi = rankInCategory(b.id, b.category)
    if (ai !== bi) return ai - bi
    return tagScore(a) - tagScore(b)
  })
}

/** @deprecated alias */
export const PREVIEW_ORDER = STUDENT_TOOL_ORDER
export const sortToolsForPreview = sortToolsForCategory
