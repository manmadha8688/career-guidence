import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#FF9900'

export default function AWSBedrockPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="APIs">
      <ToolHeader
        icon="☁️"
        title="AWS Bedrock — Enterprise AI on Amazon Web Services"
        tagline="Access Claude, Llama, Titan and more — with enterprise security and compliance"
        badges={[['Free Trial', '#4ADE80'], ['AWS', color], ['Enterprise', 'var(--text-muted)']]}
        overview={"Amazon Bedrock is AWS's fully managed AI service that gives you access to 50+ foundation models — Claude (Anthropic), Llama 3 (Meta), Titan (Amazon), Mistral, Stable Diffusion, and more — through a single unified API. No GPU clusters to provision, no model weights to host, no infrastructure to manage. You send a request, Bedrock routes it to the model, you get a response and pay per token. What makes Bedrock different from OpenAI API or Hugging Face is not the models — it is the security architecture. Your data never leaves the AWS network, it is encrypted end-to-end, you control access through IAM, and it is FedRAMP High authorized. For enterprises that already run on AWS, this means they can add AI to production systems without any new compliance discussions — it falls under the same security boundary as everything else."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Amazon Bedrock for Beginners — From First Prompt to AI Agent (Full Tutorial)', url: 'https://www.youtube.com/watch?v=FAgmR9VV0GQ', dur: 'Full tutorial', note: 'Covers everything: first API call, Converse API, building an AI agent step by step' },
            { label: 'All You Need To Know About Amazon Bedrock', url: 'https://www.youtube.com/watch?v=v4ae7L-slPU', dur: 'Comprehensive overview', note: 're:Invent 2024 updates — Agents, Knowledge Bases, Guardrails, Nova models all covered' },
            { label: 'Build Scalable RAG Applications Using Amazon Bedrock Knowledge Bases', url: 'https://www.youtube.com/watch?v=jSlNfr8Uuco', dur: 'AWS re:Invent 2024', note: 'Deep dive into Knowledge Bases for RAG — real production patterns from AWS engineers' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Foundation models available on Bedrock" color={color} />
          <CardGrid color={color} items={[
            { name: 'Claude (Anthropic)', desc: 'Claude Sonnet 5, Claude Opus 4.8, Claude Haiku 4.5. Best for complex reasoning, long-document analysis (up to 1M context), and agentic coding. Anthropic\'s Constitutional AI training makes Claude particularly strong for enterprise use cases that require nuanced, instruction-following behavior.' },
            { name: 'Llama 3 (Meta)', desc: 'Llama 3 8B, 70B, and 405B. Fully open-weights model — you can fine-tune it on your own data directly within Bedrock. Best for cost-sensitive production workloads and teams that want to customize model behavior without proprietary model lock-in.' },
            { name: 'Amazon Titan & Nova', desc: 'Amazon\'s own foundation models. Titan for text generation and embeddings. Nova Pro, Nova Lite, Nova Micro — AWS\'s newest generation, optimized for speed and cost at AWS scale. Native integration with the AWS ecosystem, competitive pricing for high-volume workloads.' },
            { name: 'Mistral', desc: 'Mistral 7B, Mixtral 8x7B, Mistral Large. European LLM provider with strong code and reasoning capability. Mixture-of-Experts architecture in Mixtral gives GPT-5 class performance at fraction of the cost. Good for structured extraction and classification tasks.' },
            { name: 'Stable Diffusion (Stability AI)', desc: 'Stable Diffusion XL and newer Stability AI models for image generation. Generate product images, design mockups, and visual content programmatically. Integrate into applications that need custom image creation without external image APIs.' },
            { name: 'Cohere & AI21 Labs', desc: 'Cohere Command for text generation, Embed for embeddings. AI21 Jamba for long-context workloads. Specialized models for specific enterprise tasks — Cohere is particularly strong for search and retrieval, AI21 for structured document processing.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started with boto3" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Create an AWS account and enable model access', body: 'aws.amazon.com → Create account → Sign in to AWS Console → Search "Bedrock" → Model access (left sidebar) → Enable the models you want (Claude, Llama, Titan). Model access is free to enable — you pay only when you call the API. New AWS accounts get free tier credits.' },
            { n: '2', title: 'Set up IAM permissions', body: 'Create an IAM user or role with the AmazonBedrockFullAccess policy (or the custom policy: bedrock:InvokeModel + bedrock:InvokeModelWithResponseStream for production). For local development: aws configure — enter your Access Key ID, Secret Access Key, and region (us-east-1 has the most models).' },
            { n: '3', title: 'Install boto3 and call the Converse API', body: "pip install boto3\n\nimport boto3, json\nclient = boto3.client('bedrock-runtime', region_name='us-east-1')\n\nresponse = client.converse(\n  modelId='anthropic.claude-sonnet-5-v2:0',\n  messages=[{\n    'role': 'user',\n    'content': [{'text': 'Explain AWS Bedrock in 3 sentences.'}]\n  }]\n)\nprint(response['output']['message']['content'][0]['text'])" },
            { n: '4', title: 'Use the Converse API for all models', body: 'The Converse API is the unified interface — the same code structure works for Claude, Llama, Mistral, and Titan. Just change the modelId. This is Bedrock\'s biggest ergonomic advantage: one API format, all models. No per-model SDK differences to manage.' },
            { n: '5', title: 'Monitor with CloudWatch', body: 'Bedrock automatically sends metrics to CloudWatch: invocation count, latency, input tokens, output tokens, throttle count. Set up a CloudWatch dashboard and billing alerts from day one. Enable model invocation logging in Bedrock settings to log every prompt and response to S3 for audit purposes.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Bedrock Agents — build AI agents without managing orchestration" color={color} />
          <InfoBox color={color}>
            Bedrock Agents is a fully managed agent orchestration layer. You define the agent's instructions, connect it to Action Groups (Lambda functions the agent can call), attach a Knowledge Base, and Bedrock handles the entire ReAct loop — planning, tool calls, result synthesis — automatically. You do not write the orchestration code.
          </InfoBox>
          <CardGrid color={color} items={[
            { name: 'Action Groups', desc: 'Lambda functions the agent can invoke. Define them with an OpenAPI schema — the agent reads the schema, decides which action to call based on the user request, and invokes Lambda with the right parameters. Connect to databases, internal APIs, CRMs, or any AWS service.' },
            { name: 'Agent Memory', desc: 'Agents can retain context across multiple sessions. Previous interactions, user preferences, and task history persist between conversations. Enables agents that learn from ongoing interactions with a user, not just within a single session.' },
            { name: 'Code Interpreter', desc: 'Built-in sandboxed Python runtime. The agent writes and executes Python code dynamically to solve data analysis, math, and visualization tasks. No separate code execution infrastructure needed — Bedrock runs the code securely and returns results.' },
            { name: 'Multi-agent collaboration', desc: 'Orchestrate multiple specialized agents — a supervisor agent delegates subtasks to specialist agents. Each sub-agent has its own instructions, tools, and knowledge base. Complex workflows where different agents handle research, writing, and review can be built as a managed multi-agent system.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Knowledge Bases — fully managed RAG" color={color} />
          <InfoBox color={color}>
            Knowledge Bases for Amazon Bedrock implements the complete RAG pipeline — document ingestion, chunking, embedding, vector storage, retrieval, and prompt augmentation — as a managed service. You connect a data source (S3, Confluence, SharePoint, Salesforce, web domains), and Bedrock handles the rest. No vector database to provision, no embedding pipeline to build.
          </InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Connect a data source', body: 'Supported sources: S3 buckets (PDF, Word, HTML, Markdown, CSV), Confluence, SharePoint, Salesforce, web crawl, and custom connectors. Documents are automatically chunked and embedded. Sync on a schedule or trigger manually when content changes.' },
            { n: '2', title: 'Bedrock handles vectorization', body: 'Bedrock automatically generates embeddings using Titan Embeddings (or your choice of embedding model) and stores them in a managed vector store — OpenSearch Serverless, Pinecone, Aurora PostgreSQL, MongoDB Atlas, or Redis. You select the vector store; Bedrock manages the index.' },
            { n: '3', title: 'Query with RetrieveAndGenerate', body: "response = client.retrieve_and_generate(\n  input={'text': 'What is our refund policy?'},\n  retrieveAndGenerateConfiguration={\n    'type': 'KNOWLEDGE_BASE',\n    'knowledgeBaseConfiguration': {\n      'knowledgeBaseId': 'YOUR_KB_ID',\n      'modelArn': 'arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-haiku-4-5-v1:0'\n    }\n  }\n)" },
            { n: '4', title: 'Citations included automatically', body: 'Every response from RetrieveAndGenerate includes the source document chunks that were retrieved. The model\'s answer is grounded in your actual documents. Show citations in your UI to build user trust — users can see exactly which documents the answer came from.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Guardrails — enterprise content safety" color={color} />
          <InfoBox color={color}>
            Guardrails for Amazon Bedrock is an independent safety layer that applies across any foundation model on Bedrock — and via a standalone API, to models hosted anywhere. Bedrock Guardrails blocks up to 88% of harmful content and detects hallucinations with up to 99% accuracy using Automated Reasoning checks.
          </InfoBox>
          <CardGrid color={color} items={[
            { name: 'Content filters', desc: 'Block harmful content across 6 categories: hate speech, insults, sexual content, violence, misconduct, and prompt injection attacks. Each category has configurable thresholds (low/medium/high sensitivity). Apply to both input prompts and model responses.' },
            { name: 'Topic denial', desc: 'Define topics your application should never discuss — competitor products, legal advice, medical diagnoses, anything outside the app\'s scope. The model will politely redirect when a user tries to go off-topic. Critical for domain-specific enterprise chatbots.' },
            { name: 'PII redaction', desc: 'Automatically detect and redact personally identifiable information (names, emails, phone numbers, SSNs, credit cards) before prompts reach the model, and in responses before they reach users. Configurable per field type — block, mask, or replace with anonymized tokens.' },
            { name: 'Grounding check (hallucination detection)', desc: 'Automated Reasoning checks verify that model responses are factually grounded in the retrieved context or source documents. Flags responses that contain plausible-sounding information not supported by the knowledge base. Critical for compliance use cases where accuracy is non-negotiable.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Bedrock vs OpenAI API vs Google Vertex AI" color={color} />
          <div className="tool-table-wrap" style={{ marginBottom: '1.25rem' }}>
            <table className="tool-table tool-table--striped">
              <thead>
                <tr>
                  {['Factor', 'AWS Bedrock', 'OpenAI API', 'Google Vertex AI'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.6rem 0.875rem', borderBottom: `1px solid ${color}30`, color, fontSize: '0.65rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Model variety', '50+ from Anthropic, Meta, Mistral, Amazon, Stability AI', 'OpenAI models only (GPT-5.5, image + audio models)', 'Google models (Gemini) + Llama via Model Garden'],
                  ['Data residency', 'Stays in AWS — FedRAMP High, HIPAA eligible', 'Sent to OpenAI servers', 'Stays in GCP — similar enterprise controls'],
                  ['Best for', 'AWS shops, compliance-heavy industries, multi-model needs', 'Fastest path to GPT-5.5, general developer use', 'Google Cloud shops, BigQuery integration, Gemini long context'],
                  ['Pricing model', 'Pay per token, no subscription', 'Pay per token, no subscription', 'Pay per token, sustained use discounts'],
                  ['Setup complexity', 'Higher — IAM, boto3, region selection', 'Lowest — one API key, one SDK', 'Medium — GCP account, service account'],
                  ['Ecosystem lock-in', 'AWS services (Lambda, S3, CloudWatch)', 'OpenAI only', 'Google Cloud (BigQuery, Vertex Pipelines)'],
                  ['Agent framework', 'Bedrock Agents (managed, no-code setup)', 'Assistants API (beta, improving)', 'Vertex AI Agent Builder + Dialogflow'],
                  ['Long context', 'Up to 1M (Claude Sonnet 5)', 'Up to ~256K (GPT-5.5)', 'Up to ~1M tokens (Gemini 3.1 Pro)'],
                ].map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className={j === 0 ? 'tool-table__cell--accent' : undefined}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Compare color={color} items={[
            { label: 'When to choose Bedrock', badge: 'Enterprise AWS workloads', body: 'Your team already runs on AWS, you have strict data residency requirements, you need to benchmark multiple models for the same task, or you are in a regulated industry (healthcare, finance, government). Bedrock is not the easiest onramp but it is the most defensible long-term for enterprise production systems.' },
            { label: 'When to choose OpenAI API', badge: 'Fastest developer path', body: 'You want to build and ship something quickly. One API key, excellent documentation, the most community resources, and GPT-5.5 remains a top-tier model. If you are a startup or individual developer without AWS infrastructure, OpenAI API is the right starting point. Add enterprise controls later if needed.' },
            { label: 'When to choose Vertex AI', badge: 'Google Cloud shops', body: 'Your data is already in BigQuery, you want Gemini 3.1 Pro\'s roughly 1 million token context for very long document processing, or you are building MLOps pipelines that connect to Vertex Pipelines and data warehouses. Vertex has the best native data pipeline integration of the three.' },
          ]} />
        </Block>
        <Block title="Enterprise use cases" titleColor={color}>
          {[
            'Document processing: extract structured data from contracts, invoices, and compliance reports using Claude on Bedrock — data stays within the company AWS account',
            'Internal knowledge assistants: give employees a chatbot over internal wikis, HR policies, and technical documentation using Knowledge Bases + Guardrails to prevent hallucination',
            'Code review automation: route pull requests through a Bedrock agent that checks for security issues, style violations, and logic errors — integrates directly with CodePipeline',
            'Customer support automation: Bedrock Agents handle tier-1 support queries with access to CRM data via Lambda Action Groups — escalate to humans when confidence is low',
            'Compliance document generation: use Claude to draft regulatory filings, audit reports, and policy documents from structured data — with Guardrails ensuring no hallucinated regulatory references',
            'Multi-model benchmarking: run the same enterprise prompt against Claude, Llama, and Mistral in parallel, compare quality and cost, choose the model per task type based on real production data',
          ].map((item, i) => (
            <div key={i} className="tool-layout-cando-item">
              <div className="tool-layout-cando-item__dot" />
              <span className="tool-layout-cando-item__text">{item}</span>
            </div>
          ))}
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Build an Internal Document Q&A System</span></div>
          <p className="tool-layout-task__desc">Build a Q&A system over a set of documents using Bedrock Knowledge Bases and the Converse API. Upload 5–10 PDF or text documents to S3 (your company policies, technical guides, or any content you want to query), create a Knowledge Base, and build a Python script that answers questions grounded in those documents. Add Guardrails to block off-topic questions. This is the complete pattern that enterprise RAG systems use in production.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Upload documents to S3', body: 'Create an S3 bucket and upload 5–10 PDFs or text files. Use any content: course notes, public company policies, open-source documentation. The content of the documents defines what questions your system can answer.' },
            { n: '2', title: 'Create a Knowledge Base in the Bedrock console', body: 'Bedrock console → Knowledge Bases → Create → Select S3 as data source → Choose Titan Embeddings → Select OpenSearch Serverless as vector store (Bedrock creates and manages it). Sync the data source to trigger chunking and embedding.' },
            { n: '3', title: 'Query with RetrieveAndGenerate', body: 'Use client.retrieve_and_generate() with your Knowledge Base ID and Claude Haiku as the model. Claude Haiku is the cheapest and fastest Claude model — ideal for Q&A where latency matters. Print the generated answer and the cited source documents.' },
            { n: '4', title: 'Add Guardrails', body: 'Create a Guardrail in the Bedrock console — add a Topic denial rule: "Do not answer questions unrelated to the uploaded documents. Politely redirect to the document scope." Attach the guardrailId to your retrieve_and_generate call. Test it by asking an off-topic question.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">COST: OpenSearch Serverless is ~$0.24/hour while the collection is active — delete after the project. Bedrock inference costs cents for development volume.</span></div>
        </div>
        <ProTip>
        When interviewing at companies that run on AWS, knowing Bedrock sets you apart from candidates who only know the OpenAI API. Bedrock is what teams at large enterprises, banks, and government agencies actually use — not because it is easier, but because the security model is non-negotiable. If you understand the IAM + VPC endpoint + CloudTrail pattern, you can speak the language of enterprise AI infrastructure. The Converse API is straightforward once you get past the AWS credential setup — spend the time on that once, and you will have a skill very few junior developers have.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/apis/huggingface', label: 'Hugging Face' }}
        next={{ path: '/ai-lab/apis/azure-openai', label: 'Azure OpenAI' }}
      />
    </ToolPageShell>
  )
}
