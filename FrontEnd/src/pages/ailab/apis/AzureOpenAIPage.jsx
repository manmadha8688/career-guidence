import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#0078D4'

export default function AzureOpenAIPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="APIs">
      <ToolHeader
        icon="🔷"
        title="Azure OpenAI — Enterprise GPT-5.5 with Compliance and Privacy"
        tagline="The same OpenAI models — but inside Microsoft Azure with enterprise security"
        badges={[['Free Trial', '#4ADE80'], ['Microsoft Azure', color], ['Enterprise', 'var(--text-muted)']]}
        overview={"Azure OpenAI Service is Microsoft's enterprise-grade hosting of OpenAI's models — GPT-5.5 and smaller GPT variants, image generation, Whisper speech-to-text, and embeddings — running entirely inside Microsoft's Azure cloud infrastructure. The model weights and APIs are identical to what OpenAI offers directly, but the hosting environment is completely different. Your data stays inside Azure, never reaches OpenAI's servers for training, and is protected by Microsoft's compliance certifications (SOC 2, ISO 27001, HIPAA, FedRAMP). If a company already runs its infrastructure on Azure — which most enterprises do — Azure OpenAI is the natural choice because it fits into existing security, networking, identity, and billing frameworks without any new vendor relationships. Banks, hospitals, government agencies, and large companies use it because their data governance policies simply cannot allow API calls going to a third-party cloud they do not control."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Getting Started with Azure OpenAI | GPT-4o | 2025 Updated', url: 'https://www.youtube.com/watch?v=H_1Ge6wxaaE', dur: '~20 min', note: 'Create a resource, deploy a model, connect via SDK — full walkthrough' },
            { label: 'Getting Started with Azure OpenAI: A Beginner\'s Guide', url: 'https://www.youtube.com/watch?v=Pb4Zi2hojL8', dur: '~25 min', note: 'End-to-end Azure OpenAI setup, playground, and first API call' },
            { label: 'Azure OpenAI Hands-on Lab for Beginners', url: 'https://www.youtube.com/watch?v=m2IEm8wef70', dur: '~45 min', note: 'Guest lecture with study guide — resource creation, deployments, chat completions' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why enterprises choose Azure OpenAI over the direct OpenAI API" color={color} />
          <InfoBox color={color}>The fundamental difference is not the model — it is where the model runs and who controls the infrastructure around it. OpenAI's API routes your data through OpenAI's cloud. Azure OpenAI routes your data through Microsoft's cloud, inside your Azure tenant, with your existing compliance controls applied on top. For most individual developers and startups, the direct OpenAI API is simpler and cheaper. For any company that is already on Azure, handles sensitive data, or needs to meet regulatory standards, Azure OpenAI is the right choice.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>The practical differences that matter to enterprises:</p>
          <CardGrid color={color} items={[
            { name: 'Data never trains OpenAI models', desc: 'Prompts and responses sent through Azure OpenAI are not used to train or improve OpenAI models — ever. This is contractually guaranteed. Direct OpenAI API users must opt out of training; Azure users are opted out by default.' },
            { name: 'Data stays in your Azure region', desc: 'Choose East US, West Europe, Southeast Asia, or any other region. Your data stays there. Azure does not move it across regions except during fine-tuning (disclosed separately). Critical for data residency laws like GDPR.' },
            { name: 'Compliance certifications included', desc: 'Azure OpenAI inherits Azure\'s existing certifications: SOC 1/2/3, ISO 27001, HIPAA, FedRAMP High, PCI DSS. Healthcare and government customers need these certifications — they come built in.' },
            { name: 'Microsoft Entra ID (Azure AD)', desc: 'Use the same identity provider your company already uses. Assign permissions to users, groups, service principals. No separate OpenAI accounts to manage. Audit logs go into the same SIEM as the rest of your Azure activity.' },
            { name: 'Private endpoints (VNet)', desc: 'Connect to Azure OpenAI over a private Azure network connection — no traffic leaves your virtual network and hits the public internet. Required by many financial and government security policies.' },
            { name: 'Content filtering controls', desc: 'Built-in content filters for hate, violence, sexual content, and self-harm, configurable per deployment. Enterprise customers can request modified filter configurations for legitimate use cases like medical applications.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Enterprise security and governance features" color={color} />
          <Steps color={color} items={[
            { n: '🔒', title: 'Private networking with VNet integration', body: 'Deploy Azure OpenAI with a private endpoint — the service gets a private IP address inside your Azure Virtual Network. API calls never leave your private network to reach the public internet. Combined with network security groups and firewall rules, this meets the strictest enterprise network isolation requirements.' },
            { n: '👤', title: 'Role-Based Access Control (RBAC) via Entra ID', body: 'Assign Azure roles: Cognitive Services OpenAI User (can make API calls), Cognitive Services OpenAI Contributor (can also manage deployments), or Owner (full control). Permissions attach to Azure AD users, groups, managed identities, or service principals — not separate API keys passed around in Slack.' },
            { n: '📋', title: 'Audit logs in Azure Monitor', body: 'Every API call, every permission change, every deployment action logs to Azure Monitor and can be routed to Log Analytics, a SIEM like Microsoft Sentinel, or long-term storage in Azure Blob. Compliance teams can audit exactly who called the model, when, and from where.' },
            { n: '🛡️', title: 'Content filtering and responsible AI controls', body: 'Four content filter categories (hate/fairness, violence, sexual, self-harm) with severity thresholds configurable at the deployment level. Prompt Shield blocks prompt injection attacks. Groundedness detection flags responses not supported by the provided context.' },
            { n: '📊', title: 'Quota and cost management', body: 'Deployments have configurable token-per-minute (TPM) quotas. Set spending budgets and alerts in Azure Cost Management. Quota is regional — request increases through the Azure portal. No surprise bills from a misconfigured loop.' },
            { n: '🔑', title: 'Managed identity — no API keys required', body: 'Use Azure Managed Identity so your Azure Functions, AKS pods, or App Service instances authenticate to Azure OpenAI without storing any credentials. The managed identity token is fetched and rotated automatically by Azure — no secret rotation scripts needed.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started with Azure OpenAI" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Create an Azure account — $200 free credit', body: 'Go to azure.microsoft.com → Start free. New accounts receive $200 in Azure credits valid for 30 days, plus 12 months of free-tier services. Use a personal Microsoft account or create one. No credit card charge during the trial.' },
            { n: '2', title: 'Request access to Azure OpenAI (if needed)', body: 'Azure OpenAI was previously gated behind an application form, but as of 2025, most Azure subscriptions have direct access. Go to the Azure portal, search "Azure OpenAI", and create a resource. If your subscription is blocked, submit the access request form — approval typically takes 1–2 business days.' },
            { n: '3', title: 'Create an Azure OpenAI resource', body: 'Azure portal → Create a resource → search "Azure OpenAI" → Create. Select your subscription, resource group, region (East US has the broadest model availability), pricing tier (Standard S0). Give it a name and create it.' },
            { n: '4', title: 'Deploy a model in Azure AI Foundry', body: 'Inside your resource → click "Go to Azure OpenAI Studio" (now Azure AI Foundry). Go to Deployments → + Create deployment → select model (gpt-5.5 or gpt-4o-mini) → set deployment name and token quota → Create. The deployment name is what you use in your API calls instead of the model name directly.' },
            { n: '5', title: 'Get your endpoint and API key', body: 'In your Azure OpenAI resource → Keys and Endpoint. You get: Endpoint URL (like https://your-name.openai.azure.com/), Key 1, Key 2 (rotate these without downtime). The API call path includes your deployment name: /openai/deployments/{deployment-name}/chat/completions.' },
            { n: '6', title: 'Make your first API call', body: "pip install openai\n\nfrom openai import AzureOpenAI\n\nclient = AzureOpenAI(\n    azure_endpoint='https://your-name.openai.azure.com/',\n    api_key='your-key-here',\n    api_version='2024-08-01-preview'\n)\n\nresponse = client.chat.completions.create(\n    model='your-deployment-name',\n    messages=[{'role': 'user', 'content': 'Hello from Azure!'}]\n)\nprint(response.choices[0].message.content)" },
          ]} />
          <div className="tool-helper-highlight" style={{ marginTop: '0.5rem' }}>
            <span className="tool-helper-highlight__label">KEY DIFFERENCE FROM OPENAI API:</span>
            <p className="tool-helper-highlight__text" style={{ margin: '0.375rem 0 0' }}>Azure OpenAI uses the same Python SDK (<code className="tool-inline-code">openai</code>) but with <code className="tool-inline-code">AzureOpenAI</code> client instead of <code className="tool-inline-code">OpenAI</code>. You pass your Azure endpoint URL, and in the <code className="tool-inline-code">model</code> parameter you use your deployment name (not the OpenAI model name). The rest of the API — messages, parameters, response format — is identical.</p>
          </div>
        </Block>
        <Block>
          <SubHead label="Azure OpenAI vs OpenAI API vs AWS Bedrock — when to use each" color={color} />
          <div className="tool-table-wrap" style={{ marginBottom: '1.25rem' }}>
            <table className="tool-table tool-table--striped">
              <thead>
                <tr>
                  {['', 'OpenAI API', 'Azure OpenAI', 'AWS Bedrock'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.6rem 0.875rem', borderBottom: `1px solid ${color}30`, color, fontSize: '0.65rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Models', 'GPT-5.5, o1, DALL-E, Whisper', 'Same GPT-5.5, o1, DALL-E, Whisper', 'Claude, Llama, Mistral, Titan, Nova, Cohere'],
                  ['Data control', 'OpenAI\'s cloud, opt-out training', 'Your Azure tenant, no training ever', 'Your AWS account, no training ever'],
                  ['Compliance certs', 'SOC 2, limited', 'SOC 1/2/3, HIPAA, FedRAMP, ISO', 'SOC 1/2/3, HIPAA, FedRAMP, ISO'],
                  ['Identity', 'API key only', 'Azure AD / Managed Identity', 'IAM roles / Managed Identity'],
                  ['Cloud infra fit', 'Any / no cloud dependency', 'Best for Azure-first orgs', 'Best for AWS-first orgs'],
                  ['Model variety', 'OpenAI models only', 'OpenAI models only', 'Multiple providers in one API'],
                  ['Free start', '$5 credit, easy signup', '$200 Azure credit, 30 days', 'Free tier credits, AWS account'],
                  ['Pricing', 'Per-token, direct', 'Per-token, same rates as OpenAI', 'Per-token, varies by model'],
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
            { label: 'Choose OpenAI API when...', badge: 'Startups & individual devs', body: "You're building a product that does not need enterprise compliance, you want the simplest possible setup, or you want to access the very latest models the moment OpenAI releases them (Azure OpenAI gets new models slightly later). Great for side projects, prototyping, indie SaaS." },
            { label: 'Choose Azure OpenAI when...', badge: 'Enterprise / Azure shops', body: 'Your company already runs on Azure, you handle regulated data (healthcare records, financial data, government information), you need HIPAA/FedRAMP/ISO certifications, or your security policy requires private endpoints and no data leaving your Azure tenant. The standard choice for any enterprise already in the Microsoft ecosystem.' },
            { label: 'Choose AWS Bedrock when...', badge: 'AWS shops / multi-model needs', body: "Your infrastructure runs on AWS and you want AI to fit into existing IAM, VPC, Lambda, S3 patterns. Or you want to use multiple model providers (Claude, Llama, Mistral) through one unified API without managing separate credentials per provider. Bedrock's model variety is its main advantage over Azure OpenAI." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Who uses Azure OpenAI and for what" color={color} />
          <CardGrid color={color} items={[
            { name: 'Banking and financial services', desc: 'Document summarization, contract analysis, customer support bots — using internal financial data that cannot leave the bank\'s cloud. HIPAA/SOC 2 compliance and private networking satisfy legal and audit requirements.' },
            { name: 'Healthcare systems', desc: 'Clinical note summarization, medical literature Q&A, patient intake automation. HIPAA compliance and data residency guarantees are non-negotiable. Azure OpenAI is one of the few AI APIs certified for PHI (Protected Health Information) use cases.' },
            { name: 'Government and public sector', desc: 'Azure OpenAI has FedRAMP High authorization, and OpenAI models have received approval for classified workloads in Azure Government. Government agencies can use frontier GPT models for sensitive public sector AI projects while keeping data inside compliant boundaries.' },
            { name: 'Enterprises already on Microsoft 365', desc: 'Companies using Teams, SharePoint, Dynamics 365, and Power Platform find Azure OpenAI integrates naturally. Microsoft Copilot in Office 365 is itself built on Azure OpenAI. Extending those capabilities with custom apps requires Azure OpenAI API access.' },
            { name: 'Students learning cloud AI', desc: 'Azure OpenAI is the right service to learn if you want to work at large enterprises or pursue cloud architect/AI engineer roles. Azure certifications (AZ-900, AI-102) include Azure OpenAI topics. The $200 trial is enough to build a full learning project.' },
            { name: 'Internal enterprise tools', desc: 'HR document Q&A, IT support bots, internal knowledge search, meeting summarization — tools that process internal company data. Azure OpenAI\'s private networking ensures proprietary company data never travels to a public endpoint.' },
          ]} />
        </Block>
        <Block title="What you can do as a student" titleColor={color}>
        <CanDoList items={[
          'Deploy GPT-5.5 inside Azure and make API calls using the same Python openai SDK you already know — just swap the client class',
            'Learn Microsoft Entra ID and RBAC by setting up proper role assignments instead of just using API keys',
            'Build a private-endpoint-aware architecture diagram that you can explain in enterprise job interviews',
            'Get hands-on with Azure AI Foundry (formerly Azure OpenAI Studio) — the model management portal used by enterprise AI teams',
            'Combine Azure OpenAI with Azure Cognitive Search for enterprise RAG — the architecture used in most large-company AI deployments',
            'Earn the AI-102 Azure AI Engineer Associate certification, which includes Azure OpenAI deployment and management',
        ]} />
      </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Build a Private Enterprise AI Chat with Azure OpenAI</span></div>
          <p className="tool-layout-task__desc">Build a simple document Q&A system using Azure OpenAI — the pattern used in nearly every enterprise internal AI tool. Upload a text file (a policy document, a product manual, meeting notes), send it as context in the system prompt, and let users ask questions about it. This is the foundational pattern for enterprise knowledge assistants. Requirements: use AzureOpenAI client (not OpenAI), load the API key from environment variables, handle the case where the answer is not in the document, and log the token usage from the response.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Set up Azure OpenAI resource', body: 'Create a free Azure account → Create Azure OpenAI resource in East US → Deploy gpt-4o-mini in Azure AI Foundry → Copy endpoint URL and API key to a .env file. Never commit the .env file.' },
            { n: '2', title: 'Load a document as context', body: "Read a text file into a string. Add it to the system message: 'You are a document assistant. Answer questions only based on the following document. If the answer is not in the document, say so clearly. Document: {document_text}'" },
            { n: '3', title: 'Build the chat loop', body: 'Accept user questions in a loop. Each call sends the system message (with document) plus the current user question. Keep conversation history for multi-turn follow-up questions. Print the response and token usage.' },
            { n: '4', title: 'Add a "not found" handler', body: "Check if the model responds with phrases like 'not mentioned' or 'not in the document'. Log these as unanswered questions — in a real enterprise tool, these would feed into a gap analysis of what information is missing from the knowledge base." },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">COST: gpt-4o-mini is $0.15/1M input tokens — a 10-page document + 50 questions costs under $0.01. The $200 Azure trial covers months of this kind of experimentation.</span></div>
        </div>
        <ProTip>
        When interviewing for enterprise AI engineer or cloud architect roles, the question "why would you use Azure OpenAI instead of the OpenAI API directly?" comes up constantly. The answer is not "because Azure is better" — it is specific: data residency requirements, existing Azure identity infrastructure (Entra ID), HIPAA or FedRAMP compliance needs, private endpoint requirements, and the ability to use managed identities instead of static API keys. Knowing these reasons concretely — not just "enterprise security" — is what distinguishes candidates who have actually used Azure from those who just read about it.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/apis/aws-bedrock', label: 'AWS Bedrock' }}
        next={{ path: '/ai-lab/apis/mistral-api', label: 'Mistral API' }}
      />
    </ToolPageShell>
  )
}
