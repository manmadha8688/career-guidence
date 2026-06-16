// Map of toolId → dedicated page component
// Every tool has a dedicated page
import { lazy } from 'react'

export const TOOL_COMPONENTS = {
  // Foundations
  'gen-ai':          lazy(() => import('./foundations/GenAIPage')),
  'prompt-eng':      lazy(() => import('./foundations/PromptEngPage')),
  'rag':             lazy(() => import('./foundations/RAGPage')),
  'embeddings':      lazy(() => import('./foundations/EmbeddingsPage')),
  // Chatbots
  'chatgpt':         lazy(() => import('./chatbots/ChatGPTPage')),
  'claude':          lazy(() => import('./chatbots/ClaudePage')),
  'gemini':          lazy(() => import('./chatbots/GeminiPage')),
  'perplexity':      lazy(() => import('./chatbots/PerplexityPage')),
  'notebooklm':      lazy(() => import('./chatbots/NotebookLMPage')),
  // Coding
  'copilot':         lazy(() => import('./coding/CopilotPage')),
  'cursor':          lazy(() => import('./coding/CursorPage')),
  'windsurf':        lazy(() => import('./coding/WindsurfPage')),
  'codeium':         lazy(() => import('./coding/CodeiumPage')),
  // APIs
  'groq':            lazy(() => import('./apis/GroqPage')),
  'openai-api':      lazy(() => import('./apis/OpenAIAPIPage')),
  'together-ai':     lazy(() => import('./apis/TogetherAIPage')),
  'huggingface':     lazy(() => import('./apis/HuggingFacePage')),
  // Agents
  'langchain':       lazy(() => import('./agents/LangChainPage')),
  'langgraph':       lazy(() => import('./agents/LangGraphPage')),
  'crewai':          lazy(() => import('./agents/CrewAIPage')),
  'autogen':         lazy(() => import('./agents/AutoGenPage')),
  'openclaw':        lazy(() => import('./agents/OpenClawPage')),
  'hermes':          lazy(() => import('./agents/HermesPage')),
  'mcp':             lazy(() => import('./agents/MCPPage')),
  // Automation
  'n8n':             lazy(() => import('./automation/N8NPage')),
  'flowise':         lazy(() => import('./automation/FlowisePage')),
  'dify':            lazy(() => import('./automation/DifyPage')),
  'zapier':          lazy(() => import('./automation/ZapierPage')),
  // Local AI
  'ollama':          lazy(() => import('./local/OllamaPage')),
  'lmstudio':        lazy(() => import('./local/LMStudioPage')),
  // Vector
  'chromadb':        lazy(() => import('./vector/ChromaDBPage')),
  'pinecone':        lazy(() => import('./vector/PineconePage')),
  // Data
  'julius':          lazy(() => import('./data/JuliusPage')),
  'code-interpreter':lazy(() => import('./data/CodeInterpreterPage')),
  // Creative
  'dalle-free':      lazy(() => import('./creative/BingImagePage')),
  'stable-diffusion':lazy(() => import('./creative/StableDiffusionPage')),
  'gamma':           lazy(() => import('./creative/GammaPage')),
  'canva-ai':        lazy(() => import('./creative/CanvaAIPage')),
  // Voice
  'whisper':         lazy(() => import('./voice/WhisperPage')),
  'elevenlabs':      lazy(() => import('./voice/ElevenLabsPage')),
  // Career
  'teal':            lazy(() => import('./career/TealPage')),
  'notion-ai':       lazy(() => import('./career/NotionAIPage')),
  'grammarly':       lazy(() => import('./career/GrammarlyPage')),
}
