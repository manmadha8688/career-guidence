import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F97316'

export default function FlowisePage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Automation">
      <ToolHeader
        icon="🌊"
        title="Flowise — Build LLM Apps Visually, No Code Required"
        tagline="Drag-and-drop LangChain and LlamaIndex flows in your browser"
        badges={[['✓ FREE self-host', '#4ADE80'], ['Visual LangChain', color], ['Open source', 'var(--text-muted)']]}
        overview={"Flowise is an open-source, self-hosted tool that lets you build LangChain and LlamaIndex applications visually — dragging and dropping nodes in a browser canvas instead of writing Python. Every LangChain concept has a visual node: ChatOpenAI, ConversationalRetrievalChain, ChromaDB, HuggingFaceEmbeddings, BufferMemory, AgentExecutor. Connect them on the canvas, configure settings in the panel, and your LLM application is running. Flowise can embed a chat widget on any website with one line of HTML. For students who understand the LangChain architecture but want to prototype rapidly — or who want to build and deploy AI chatbots without backend code — Flowise is exceptionally fast to get working results."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'FlowiseAI Masterclass: Build AI Agents (Beginner to Pro) — Leon van Zyl', url: 'https://www.youtube.com/watch?v=9TaRksXuLWY', dur: '~90 min', note: 'THE Flowise creator — official tutorial linked from Flowise docs' },
            { label: 'Flowise v3 Complete Tutorial: Build AI Agents WITHOUT Coding — Leon van Zyl', url: 'https://www.youtube.com/watch?v=SLVVDUIbIBE', dur: '~60 min', note: 'Latest v3 — updated agent flows, tools, and RAG pipelines' },
            { label: 'Flowise AI Tutorial #1: Build AI Apps With No Code — Leon van Zyl', url: 'https://www.youtube.com/watch?v=nqAK_L66sIQ', dur: '~35 min', note: 'Best starting point — install, setup, and first chatflow end to end' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What Flowise makes visual" color={color} />
          <InfoBox color={color}>Flowise wraps LangChain and LlamaIndex in a visual interface. Every node on the canvas corresponds to a real LangChain class. When you drag a ChatOpenAI node and connect it to a ConversationChain node, Flowise is literally instantiating ChatOpenAI() and ConversationChain() behind the scenes. Understanding LangChain makes Flowise more powerful; Flowise makes LangChain more accessible.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The most practical feature for students is the embedded chatbot. After building a flow on the canvas, Flowise generates a simple API endpoint and an embeddable chat widget. Paste one script tag into any HTML page and your AI chatbot appears on that website. No backend code, no deployment complexity, no server setup beyond running Flowise. This is how you add AI to a portfolio project or demo website in under an hour.</p>
        </Block>
        <Block>
          <SubHead label="Core node categories" color={color} />
          <CardGrid color={color} items={[
            { name: 'Chat Models', desc: 'ChatOpenAI, ChatAnthropic, ChatGroq, ChatOllama (local), ChatHuggingFace. Drag in the model you want, configure API key and settings. Swap models without changing anything else.' },
            { name: 'Vector Stores', desc: 'Chroma, Pinecone, Qdrant, Supabase, FAISS. Drag in your vector store, connect an embedding node and document loader. Your RAG database is configured.' },
            { name: 'Document Loaders', desc: 'PDF, Web Scraper, GitHub, Notion, Confluence, S3, Google Drive. Load documents from any source for indexing into your vector store.' },
            { name: 'Chains', desc: 'ConversationalRetrievalQAChain, LLMChain, APIChain, SQLDatabaseChain. Pre-built patterns for common use cases — drag the chain node and connect its components.' },
            { name: 'Agents', desc: 'ReAct Agent, OpenAI Function Agent, Conversational Agent. Give agents tools: Calculator, Web Browser, API Tool, custom tools. The agent decides which tools to use.' },
            { name: 'Memory', desc: 'BufferMemory, BufferWindowMemory, SummaryMemory. Connect to any chain to add conversation history. The memory node handles all persistence automatically.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Building a RAG chatbot in Flowise" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Install and open Flowise', body: 'npm install -g flowise\nflowise start\nOpen http://localhost:3000. Create a new Chatflow. The canvas is your workspace.' },
            { n: '2', title: 'Add document loader and text splitter', body: 'Drag PDF File Loader onto canvas. Drag Recursive Character Text Splitter. Connect loader → splitter. Upload your PDF in the loader node settings.' },
            { n: '3', title: 'Add embeddings and vector store', body: 'Drag HuggingFace Inference Embeddings (free) or OpenAI Embeddings. Drag Chroma vector store. Connect: splitter → embeddings → Chroma. Click Upsert in the Chroma node to index the document.' },
            { n: '4', title: 'Add the conversation chain', body: 'Drag ConversationalRetrievalQAChain. Drag ChatOpenAI (or ChatGroq for free). Drag BufferMemory. Connect: Chroma retriever → chain; ChatOpenAI → chain; BufferMemory → chain.' },
            { n: '5', title: 'Test and embed', body: 'Click the chat bubble icon to test. Type questions about your document. When satisfied: click </> Embed → copy the script tag → paste into any HTML page. Done.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Flowise API — integrate with anything" color={color} />
          <InfoBox color={color}>Every Flowise chatflow automatically gets a REST API endpoint. Send a POST request with your question, get back the AI response. This means Flowise chatflows can power chatbots in React apps, mobile apps, Discord bots, or any system that can make HTTP requests — without writing any LangChain code.</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Get the API endpoint', body: 'In your chatflow: API Endpoint tab → copy the endpoint URL. It looks like: http://localhost:3000/api/v1/prediction/{chatflow-id}' },
            { n: '2', title: 'Call from any application', body: 'POST request with body: {"question": "your question here", "overrideConfig": {}}. Response contains the answer. Works from curl, Python requests, JavaScript fetch, or any HTTP client.' },
            { n: '3', title: 'Deploy for production', body: 'Flowise deploys to Railway, Render, or any server with Docker in minutes. Once deployed to a public URL, your chatbot API and embed widget work from anywhere on the internet.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Flowise vs building LangChain directly" color={color} />
          <Compare color={color} items={[
            { label: 'Flowise (visual)', badge: 'Faster to prototype', body: 'Build and test a RAG chatbot in 20 minutes without writing code. Swap models and vector stores by changing one node. Great for prototyping, portfolio demos, and non-developer use. Limited for complex custom logic.' },
            { label: 'LangChain (code)', badge: 'More control', body: 'Full Python control over every parameter. Complex custom logic (multi-step reasoning, custom retrievers, advanced memory). Better for production systems with specific requirements. Higher initial time investment.' },
            { label: 'Which to use', badge: 'Start Flowise, graduate to code', body: 'Use Flowise to validate that your RAG design works — right chunking strategy, right retrieval, right model. Once it works visually, rewrite in LangChain code if you need custom behavior or want to understand deeply. Flowise removes architecture uncertainty fast.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Build a complete RAG chatbot over your own documents in 20 minutes with no code',
            'Embed an AI chatbot widget on any website with a single script tag',
            'Prototype different LangChain architectures visually before committing to code',
            'Connect 50+ LLM providers, vector stores, and document sources through drag-and-drop',
            'Deploy a production chatbot API to Railway or Render for free in under 30 minutes',
        ]} />
      </Block>
        <ProjectTask
        title={"Portfolio Chatbot"}
        description={"Build a chatbot that answers questions about you. Create a PDF with: your skills, experience, projects, education, and what you are looking for. Upload it to Flowise as a RAG chatflow. Configure it to answer questions like a professional assistant that knows your background. Embed the widget on your portfolio website. Test it by asking 10 questions a recruiter might ask. This is a real, deployable AI feature for your portfolio."}
        costNote={"TOTAL COST: ₹0 — Flowise self-hosted free + Groq free tier + HuggingFace embeddings free"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Write your knowledge document', body: 'Create a PDF about yourself: current skills and tech stack, projects with what you built and what you learned, education, what kind of roles you\'re seeking, your approach to learning. Be specific — the chatbot\'s quality depends on this document.' },
            { n: '2', title: 'Build the RAG flow', body: 'Install Flowise locally. Build the flow: PDF loader → text splitter → embeddings → Chroma → ConversationalRetrievalQAChain → ChatGroq (free). System message: \'You are a professional assistant helping recruiters learn about [Your Name]. Be accurate, professional, and enthusiastic.\'' },
            { n: '3', title: 'Test with recruiter questions', body: 'Ask: What technologies do you know best? What is your most significant project? Why would you be good for a backend role? Fix the document and system prompt based on answers that were wrong or incomplete.' },
            { n: '4', title: 'Embed on your portfolio', body: 'Get the embed script from Flowise. Add it to your portfolio HTML. Share with friends and mentors to get feedback on the quality of answers.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Set a specific system message for your Flowise chatflow that defines the chatbot's persona, tone, and boundaries. Without a system message, the chatbot will answer any question using retrieved context but may drift off-topic. With a clear system message ('Only answer questions about [person]'s skills and background. If asked about other topics, politely redirect to their professional profile.'), the chatbot stays on-task and behaves predictably.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/automation/n8n', label: 'n8n' }}
        next={{ path: '/ai-lab/automation/dify', label: 'Dify' }}
      />
    </ToolPageShell>
  )
}
