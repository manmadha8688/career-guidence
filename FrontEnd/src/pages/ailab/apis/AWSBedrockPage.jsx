import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN  = '#00D9FF'
const color = '#FF9900'

export default function AWSBedrockPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark   = theme !== 'light'
  const bg     = dark ? '#020817' : '#F0F4FF'
  const card   = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(255,153,0,0.09)' : 'rgba(255,153,0,0.13)'
  const txt    = dark ? '#E2E8F0' : '#0F172A'
  const sub    = dark ? '#94A3B8' : '#475569'
  const muted  = dark ? '#64748B' : '#94A3B8'

  return (
    <div style={{ minHeight: '100vh', background: bg, color: txt, fontFamily: "'Rajdhani', sans-serif", overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, borderRadius: '50%', background: `radial-gradient(ellipse, ${color}07 0%, transparent 65%)`, filter: 'blur(60px)' }} />
      </div>

      <nav style={{ position: 'sticky', top: 0, zIndex: 50, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', background: dark ? 'rgba(2,8,23,0.93)' : 'rgba(240,244,255,0.95)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${border}` }}>
        <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.72rem', letterSpacing: '0.1em', color: CYAN, padding: 0 }}>
          <ArrowLeft size={14} /> AI Lab
        </button>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>APIs</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>☁️</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.05rem,3vw,1.55rem)', color: txt, margin: '0 0 0.25rem' }}>AWS Bedrock — Enterprise AI on Amazon Web Services</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Access Claude, Llama, Titan and more — with enterprise security and compliance</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['Free Trial', '#4ADE80'], ['AWS', color], ['Enterprise', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Amazon Bedrock is AWS's fully managed AI service that gives you access to 50+ foundation models — Claude (Anthropic), Llama 3 (Meta), Titan (Amazon), Mistral, Stable Diffusion, and more — through a single unified API. No GPU clusters to provision, no model weights to host, no infrastructure to manage. You send a request, Bedrock routes it to the model, you get a response and pay per token. What makes Bedrock different from OpenAI API or Hugging Face is not the models — it is the security architecture. Your data never leaves the AWS network, it is encrypted end-to-end, you control access through IAM, and it is FedRAMP High authorized. For enterprises that already run on AWS, this means they can add AI to production systems without any new compliance discussions — it falls under the same security boundary as everything else.</p>
        </div>

        {/* Why enterprises choose Bedrock */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why enterprises choose Bedrock over standalone APIs" color={color} />
          <InfoBox color={color} dark={dark}>
            The biggest challenge to AI adoption in large companies is not cost or capability — it is compliance. Security teams need to know where data goes, legal teams need data processing agreements, and infrastructure teams need the AI to fit in the existing network security model. Bedrock solves all three: your prompts and responses stay within the AWS network, AWS's standard data agreements cover Bedrock, and you access it through your existing VPC and IAM setup.
          </InfoBox>
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Data never leaves AWS', desc: 'Prompts and model responses are processed entirely within the AWS network. Your data is not used to train foundation models. This alone unblocks AI adoption for regulated industries — healthcare, finance, government — that cannot send sensitive data to third-party APIs.' },
            { name: 'IAM-controlled access', desc: 'Every Bedrock API call goes through AWS Identity and Access Management. You define which services, roles, and users can call which models. Audit logs flow to CloudTrail automatically. No API key rotation — standard AWS credential management.' },
            { name: 'AWS ecosystem integration', desc: 'Bedrock connects natively to S3 (for document storage), Lambda (for serverless inference), CloudWatch (for monitoring), and AWS Glue (for data pipelines). Building AI into existing AWS infrastructure is configuration, not integration work.' },
            { name: 'VPC endpoint support', desc: 'Access Bedrock privately through an interface VPC endpoint (AWS PrivateLink). Traffic never touches the public internet. For air-gapped or high-security environments, this is the only acceptable deployment pattern.' },
            { name: 'Multi-model flexibility', desc: 'Switch between Claude, Llama, Mistral, and Titan models without changing your application code. The Converse API normalizes all model interfaces. Benchmark multiple models, choose the best for each task, swap without refactoring.' },
            { name: 'Compliance certifications', desc: 'FedRAMP High, HIPAA eligible, SOC 1/2/3, ISO 27001, PCI DSS. Most enterprises already have these compliance requirements met for their AWS environment — Bedrock inherits that coverage automatically.' },
          ]} />
        </Block>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Amazon Bedrock for Beginners — From First Prompt to AI Agent (Full Tutorial)', url: 'https://www.youtube.com/watch?v=FAgmR9VV0GQ', dur: 'Full tutorial', note: 'Covers everything: first API call, Converse API, building an AI agent step by step' },
            { label: 'All You Need To Know About Amazon Bedrock', url: 'https://www.youtube.com/watch?v=v4ae7L-slPU', dur: 'Comprehensive overview', note: 're:Invent 2024 updates — Agents, Knowledge Bases, Guardrails, Nova models all covered' },
            { label: 'Build Scalable RAG Applications Using Amazon Bedrock Knowledge Bases', url: 'https://www.youtube.com/watch?v=jSlNfr8Uuco', dur: 'AWS re:Invent 2024', note: 'Deep dive into Knowledge Bases for RAG — real production patterns from AWS engineers' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Available models */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Foundation models available on Bedrock" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Claude (Anthropic)', desc: 'Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku. Best for complex reasoning, long-document analysis, and code. Anthropic\'s Constitutional AI training makes Claude particularly strong for enterprise use cases that require nuanced, instruction-following behavior.' },
            { name: 'Llama 3 (Meta)', desc: 'Llama 3 8B, 70B, and 405B. Fully open-weights model — you can fine-tune it on your own data directly within Bedrock. Best for cost-sensitive production workloads and teams that want to customize model behavior without proprietary model lock-in.' },
            { name: 'Amazon Titan & Nova', desc: 'Amazon\'s own foundation models. Titan for text generation and embeddings. Nova Pro, Nova Lite, Nova Micro — AWS\'s newest generation, optimized for speed and cost at AWS scale. Native integration with the AWS ecosystem, competitive pricing for high-volume workloads.' },
            { name: 'Mistral', desc: 'Mistral 7B, Mixtral 8x7B, Mistral Large. European LLM provider with strong code and reasoning capability. Mixture-of-Experts architecture in Mixtral gives GPT-4 class performance at fraction of the cost. Good for structured extraction and classification tasks.' },
            { name: 'Stable Diffusion (Stability AI)', desc: 'Stable Diffusion XL and newer Stability AI models for image generation. Generate product images, design mockups, and visual content programmatically. Integrate into applications that need custom image creation without external image APIs.' },
            { name: 'Cohere & AI21 Labs', desc: 'Cohere Command for text generation, Embed for embeddings. AI21 Jamba for long-context workloads. Specialized models for specific enterprise tasks — Cohere is particularly strong for search and retrieval, AI21 for structured document processing.' },
          ]} />
        </Block>

        {/* Getting started */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Getting started with boto3" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Create an AWS account and enable model access', body: 'aws.amazon.com → Create account → Sign in to AWS Console → Search "Bedrock" → Model access (left sidebar) → Enable the models you want (Claude, Llama, Titan). Model access is free to enable — you pay only when you call the API. New AWS accounts get free tier credits.' },
            { n: '2', title: 'Set up IAM permissions', body: 'Create an IAM user or role with the AmazonBedrockFullAccess policy (or the custom policy: bedrock:InvokeModel + bedrock:InvokeModelWithResponseStream for production). For local development: aws configure — enter your Access Key ID, Secret Access Key, and region (us-east-1 has the most models).' },
            { n: '3', title: 'Install boto3 and call the Converse API', body: "pip install boto3\n\nimport boto3, json\nclient = boto3.client('bedrock-runtime', region_name='us-east-1')\n\nresponse = client.converse(\n  modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',\n  messages=[{\n    'role': 'user',\n    'content': [{'text': 'Explain AWS Bedrock in 3 sentences.'}]\n  }]\n)\nprint(response['output']['message']['content'][0]['text'])" },
            { n: '4', title: 'Use the Converse API for all models', body: 'The Converse API is the unified interface — the same code structure works for Claude, Llama, Mistral, and Titan. Just change the modelId. This is Bedrock\'s biggest ergonomic advantage: one API format, all models. No per-model SDK differences to manage.' },
            { n: '5', title: 'Monitor with CloudWatch', body: 'Bedrock automatically sends metrics to CloudWatch: invocation count, latency, input tokens, output tokens, throttle count. Set up a CloudWatch dashboard and billing alerts from day one. Enable model invocation logging in Bedrock settings to log every prompt and response to S3 for audit purposes.' },
          ]} />
        </Block>

        {/* Bedrock Agents */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Bedrock Agents — build AI agents without managing orchestration" color={color} />
          <InfoBox color={color} dark={dark}>
            Bedrock Agents is a fully managed agent orchestration layer. You define the agent's instructions, connect it to Action Groups (Lambda functions the agent can call), attach a Knowledge Base, and Bedrock handles the entire ReAct loop — planning, tool calls, result synthesis — automatically. You do not write the orchestration code.
          </InfoBox>
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Action Groups', desc: 'Lambda functions the agent can invoke. Define them with an OpenAPI schema — the agent reads the schema, decides which action to call based on the user request, and invokes Lambda with the right parameters. Connect to databases, internal APIs, CRMs, or any AWS service.' },
            { name: 'Agent Memory', desc: 'Agents can retain context across multiple sessions. Previous interactions, user preferences, and task history persist between conversations. Enables agents that learn from ongoing interactions with a user, not just within a single session.' },
            { name: 'Code Interpreter', desc: 'Built-in sandboxed Python runtime. The agent writes and executes Python code dynamically to solve data analysis, math, and visualization tasks. No separate code execution infrastructure needed — Bedrock runs the code securely and returns results.' },
            { name: 'Multi-agent collaboration', desc: 'Orchestrate multiple specialized agents — a supervisor agent delegates subtasks to specialist agents. Each sub-agent has its own instructions, tools, and knowledge base. Complex workflows where different agents handle research, writing, and review can be built as a managed multi-agent system.' },
          ]} />
        </Block>

        {/* Knowledge Bases */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Knowledge Bases — fully managed RAG" color={color} />
          <InfoBox color={color} dark={dark}>
            Knowledge Bases for Amazon Bedrock implements the complete RAG pipeline — document ingestion, chunking, embedding, vector storage, retrieval, and prompt augmentation — as a managed service. You connect a data source (S3, Confluence, SharePoint, Salesforce, web domains), and Bedrock handles the rest. No vector database to provision, no embedding pipeline to build.
          </InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Connect a data source', body: 'Supported sources: S3 buckets (PDF, Word, HTML, Markdown, CSV), Confluence, SharePoint, Salesforce, web crawl, and custom connectors. Documents are automatically chunked and embedded. Sync on a schedule or trigger manually when content changes.' },
            { n: '2', title: 'Bedrock handles vectorization', body: 'Bedrock automatically generates embeddings using Titan Embeddings (or your choice of embedding model) and stores them in a managed vector store — OpenSearch Serverless, Pinecone, Aurora PostgreSQL, MongoDB Atlas, or Redis. You select the vector store; Bedrock manages the index.' },
            { n: '3', title: 'Query with RetrieveAndGenerate', body: "response = client.retrieve_and_generate(\n  input={'text': 'What is our refund policy?'},\n  retrieveAndGenerateConfiguration={\n    'type': 'KNOWLEDGE_BASE',\n    'knowledgeBaseConfiguration': {\n      'knowledgeBaseId': 'YOUR_KB_ID',\n      'modelArn': 'arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-haiku-20240307-v1:0'\n    }\n  }\n)" },
            { n: '4', title: 'Citations included automatically', body: 'Every response from RetrieveAndGenerate includes the source document chunks that were retrieved. The model\'s answer is grounded in your actual documents. Show citations in your UI to build user trust — users can see exactly which documents the answer came from.' },
          ]} />
        </Block>

        {/* Guardrails */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Guardrails — enterprise content safety" color={color} />
          <InfoBox color={color} dark={dark}>
            Guardrails for Amazon Bedrock is an independent safety layer that applies across any foundation model on Bedrock — and via a standalone API, to models hosted anywhere. Bedrock Guardrails blocks up to 88% of harmful content and detects hallucinations with up to 99% accuracy using Automated Reasoning checks.
          </InfoBox>
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Content filters', desc: 'Block harmful content across 6 categories: hate speech, insults, sexual content, violence, misconduct, and prompt injection attacks. Each category has configurable thresholds (low/medium/high sensitivity). Apply to both input prompts and model responses.' },
            { name: 'Topic denial', desc: 'Define topics your application should never discuss — competitor products, legal advice, medical diagnoses, anything outside the app\'s scope. The model will politely redirect when a user tries to go off-topic. Critical for domain-specific enterprise chatbots.' },
            { name: 'PII redaction', desc: 'Automatically detect and redact personally identifiable information (names, emails, phone numbers, SSNs, credit cards) before prompts reach the model, and in responses before they reach users. Configurable per field type — block, mask, or replace with anonymized tokens.' },
            { name: 'Grounding check (hallucination detection)', desc: 'Automated Reasoning checks verify that model responses are factually grounded in the retrieved context or source documents. Flags responses that contain plausible-sounding information not supported by the knowledge base. Critical for compliance use cases where accuracy is non-negotiable.' },
          ]} />
        </Block>

        {/* Bedrock vs OpenAI API vs Vertex AI */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Bedrock vs OpenAI API vs Google Vertex AI" color={color} />
          <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr>
                  {['Factor', 'AWS Bedrock', 'OpenAI API', 'Google Vertex AI'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.6rem 0.875rem', borderBottom: `1px solid ${color}30`, color, fontSize: '0.65rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Model variety', '50+ from Anthropic, Meta, Mistral, Amazon, Stability AI', 'OpenAI models only (GPT-4o, DALL-E, Whisper)', 'Google models (Gemini) + Llama via Model Garden'],
                  ['Data residency', 'Stays in AWS — FedRAMP High, HIPAA eligible', 'Sent to OpenAI servers', 'Stays in GCP — similar enterprise controls'],
                  ['Best for', 'AWS shops, compliance-heavy industries, multi-model needs', 'Fastest path to GPT-4o, general developer use', 'Google Cloud shops, BigQuery integration, Gemini 1.5 Pro long context'],
                  ['Pricing model', 'Pay per token, no subscription', 'Pay per token, no subscription', 'Pay per token, sustained use discounts'],
                  ['Setup complexity', 'Higher — IAM, boto3, region selection', 'Lowest — one API key, one SDK', 'Medium — GCP account, service account'],
                  ['Ecosystem lock-in', 'AWS services (Lambda, S3, CloudWatch)', 'OpenAI only', 'Google Cloud (BigQuery, Vertex Pipelines)'],
                  ['Agent framework', 'Bedrock Agents (managed, no-code setup)', 'Assistants API (beta, improving)', 'Vertex AI Agent Builder + Dialogflow'],
                  ['Long context', 'Up to 200K (Claude 3.5)', 'Up to 128K (GPT-4o)', 'Up to 2M tokens (Gemini 1.5 Pro)'],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? (dark ? `rgba(255,153,0,0.04)` : `rgba(255,153,0,0.03)`) : 'transparent' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '0.6rem 0.875rem', color: j === 0 ? color : sub, borderBottom: `1px solid ${border}`, fontFamily: j === 0 ? "'Share Tech Mono', monospace" : "'Rajdhani', sans-serif", fontSize: j === 0 ? '0.72rem' : '0.82rem', whiteSpace: 'normal' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'When to choose Bedrock', badge: 'Enterprise AWS workloads', body: 'Your team already runs on AWS, you have strict data residency requirements, you need to benchmark multiple models for the same task, or you are in a regulated industry (healthcare, finance, government). Bedrock is not the easiest onramp but it is the most defensible long-term for enterprise production systems.' },
            { label: 'When to choose OpenAI API', badge: 'Fastest developer path', body: 'You want to build and ship something quickly. One API key, excellent documentation, the most community resources, and GPT-4o remains a top-tier model. If you are a startup or individual developer without AWS infrastructure, OpenAI API is the right starting point. Add enterprise controls later if needed.' },
            { label: 'When to choose Vertex AI', badge: 'Google Cloud shops', body: 'Your data is already in BigQuery, you want Gemini 1.5 Pro\'s 1 million token context for very long document processing, or you are building MLOps pipelines that connect to Vertex Pipelines and data warehouses. Vertex has the best native data pipeline integration of the three.' },
          ]} />
        </Block>

        {/* Enterprise use cases */}
        <Block title="Enterprise use cases" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Document processing: extract structured data from contracts, invoices, and compliance reports using Claude on Bedrock — data stays within the company AWS account',
            'Internal knowledge assistants: give employees a chatbot over internal wikis, HR policies, and technical documentation using Knowledge Bases + Guardrails to prevent hallucination',
            'Code review automation: route pull requests through a Bedrock agent that checks for security issues, style violations, and logic errors — integrates directly with CodePipeline',
            'Customer support automation: Bedrock Agents handle tier-1 support queries with access to CRM data via Lambda Action Groups — escalate to humans when confidence is low',
            'Compliance document generation: use Claude to draft regulatory filings, audit reports, and policy documents from structured data — with Guardrails ensuring no hallucinated regulatory references',
            'Multi-model benchmarking: run the same enterprise prompt against Claude, Llama, and Mistral in parallel, compare quality and cost, choose the model per task type based on real production data',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}`, marginBottom: '0.5rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 7 }} />
              <span style={{ fontSize: '0.85rem', color: sub, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build an Internal Document Q&A System</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Build a Q&A system over a set of documents using Bedrock Knowledge Bases and the Converse API. Upload 5–10 PDF or text documents to S3 (your company policies, technical guides, or any content you want to query), create a Knowledge Base, and build a Python script that answers questions grounded in those documents. Add Guardrails to block off-topic questions. This is the complete pattern that enterprise RAG systems use in production.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Upload documents to S3', body: 'Create an S3 bucket and upload 5–10 PDFs or text files. Use any content: course notes, public company policies, open-source documentation. The content of the documents defines what questions your system can answer.' },
            { n: '2', title: 'Create a Knowledge Base in the Bedrock console', body: 'Bedrock console → Knowledge Bases → Create → Select S3 as data source → Choose Titan Embeddings → Select OpenSearch Serverless as vector store (Bedrock creates and manages it). Sync the data source to trigger chunking and embedding.' },
            { n: '3', title: 'Query with RetrieveAndGenerate', body: 'Use client.retrieve_and_generate() with your Knowledge Base ID and Claude Haiku as the model. Claude Haiku is the cheapest and fastest Claude model — ideal for Q&A where latency matters. Print the generated answer and the cited source documents.' },
            { n: '4', title: 'Add Guardrails', body: 'Create a Guardrail in the Bedrock console — add a Topic denial rule: "Do not answer questions unrelated to the uploaded documents. Politely redirect to the document scope." Attach the guardrailId to your retrieve_and_generate call. Test it by asking an off-topic question.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>COST: OpenSearch Serverless is ~$0.24/hour while the collection is active — delete after the project. Bedrock inference costs cents for development volume.</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>When interviewing at companies that run on AWS, knowing Bedrock sets you apart from candidates who only know the OpenAI API. Bedrock is what teams at large enterprises, banks, and government agencies actually use — not because it is easier, but because the security model is non-negotiable. If you understand the IAM + VPC endpoint + CloudTrail pattern, you can speak the language of enterprise AI infrastructure. The Converse API is straightforward once you get past the AWS credential setup — spend the time on that once, and you will have a skill very few junior developers have.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/apis/huggingface')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Hugging Face
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/apis/azure-openai')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Azure OpenAI <ChevronRight size={14} />
          </button>
        </div>

      </div>
      <ScrollToTop />
    </div>
  )
}

function Block({ title, titleColor, dark, border, card, children }) {
  return (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '1.375rem', backdropFilter: 'blur(8px)', marginBottom: '1.25rem' }}>
      {title && <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.14em', color: titleColor, textTransform: 'uppercase', paddingBottom: '0.75rem', marginBottom: '1rem', borderBottom: `1px solid ${titleColor}20` }}>{title}</div>}
      {children}
    </div>
  )
}

function VideoCard({ v, dark, txt, muted }) {
  return (
    <a href={v.url} target="_blank" rel="noopener noreferrer"
      style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1.125rem', borderRadius: 11, textDecoration: 'none', background: dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.16)', marginBottom: '0.625rem', transition: 'background 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.09)'}
      onMouseLeave={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)'}
    >
      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Play size={13} color="#fff" fill="#fff" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: txt }}>{v.label}</div>
        {(v.dur || v.note) && <div style={{ fontSize: '0.7rem', color: muted, marginTop: 2 }}>{[v.dur, v.note].filter(Boolean).join(' · ')}</div>}
      </div>
      <ExternalLink size={12} color={muted} />
    </a>
  )
}
