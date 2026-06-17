import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#0078D4'

export default function AzureOpenAIPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(0,120,212,0.12)' : 'rgba(0,120,212,0.13)'
  const txt   = dark ? '#E2E8F0' : '#0F172A'
  const sub   = dark ? '#94A3B8' : '#475569'
  const muted = dark ? '#64748B' : '#94A3B8'

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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🔷</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Azure OpenAI — Enterprise GPT-4o with Compliance and Privacy</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>The same OpenAI models — but inside Microsoft Azure with enterprise security</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['Free Trial', '#4ADE80'], ['Microsoft Azure', color], ['Enterprise', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Azure OpenAI Service is Microsoft's enterprise-grade hosting of OpenAI's models — GPT-4o, GPT-4o mini, DALL-E 3, Whisper, and embeddings — running entirely inside Microsoft's Azure cloud infrastructure. The model weights and APIs are identical to what OpenAI offers directly, but the hosting environment is completely different. Your data stays inside Azure, never reaches OpenAI's servers for training, and is protected by Microsoft's compliance certifications (SOC 2, ISO 27001, HIPAA, FedRAMP). If a company already runs its infrastructure on Azure — which most enterprises do — Azure OpenAI is the natural choice because it fits into existing security, networking, identity, and billing frameworks without any new vendor relationships. Banks, hospitals, government agencies, and large companies use it because their data governance policies simply cannot allow API calls going to a third-party cloud they do not control.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Getting Started with Azure OpenAI | GPT-4o | 2025 Updated', url: 'https://www.youtube.com/watch?v=H_1Ge6wxaaE', dur: '~20 min', note: 'Create a resource, deploy a model, connect via SDK — full walkthrough' },
            { label: 'Getting Started with Azure OpenAI: A Beginner\'s Guide', url: 'https://www.youtube.com/watch?v=Pb4Zi2hojL8', dur: '~25 min', note: 'End-to-end Azure OpenAI setup, playground, and first API call' },
            { label: 'Azure OpenAI Hands-on Lab for Beginners', url: 'https://www.youtube.com/watch?v=m2IEm8wef70', dur: '~45 min', note: 'Guest lecture with study guide — resource creation, deployments, chat completions' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Why enterprises use Azure OpenAI */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why enterprises choose Azure OpenAI over the direct OpenAI API" color={color} />
          <InfoBox color={color} dark={dark}>The fundamental difference is not the model — it is where the model runs and who controls the infrastructure around it. OpenAI's API routes your data through OpenAI's cloud. Azure OpenAI routes your data through Microsoft's cloud, inside your Azure tenant, with your existing compliance controls applied on top. For most individual developers and startups, the direct OpenAI API is simpler and cheaper. For any company that is already on Azure, handles sensitive data, or needs to meet regulatory standards, Azure OpenAI is the right choice.</InfoBox>
          <p style={{ ...P(sub), marginBottom: '1rem' }}>The practical differences that matter to enterprises:</p>
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Data never trains OpenAI models', desc: 'Prompts and responses sent through Azure OpenAI are not used to train or improve OpenAI models — ever. This is contractually guaranteed. Direct OpenAI API users must opt out of training; Azure users are opted out by default.' },
            { name: 'Data stays in your Azure region', desc: 'Choose East US, West Europe, Southeast Asia, or any other region. Your data stays there. Azure does not move it across regions except during fine-tuning (disclosed separately). Critical for data residency laws like GDPR.' },
            { name: 'Compliance certifications included', desc: 'Azure OpenAI inherits Azure\'s existing certifications: SOC 1/2/3, ISO 27001, HIPAA, FedRAMP High, PCI DSS. Healthcare and government customers need these certifications — they come built in.' },
            { name: 'Microsoft Entra ID (Azure AD)', desc: 'Use the same identity provider your company already uses. Assign permissions to users, groups, service principals. No separate OpenAI accounts to manage. Audit logs go into the same SIEM as the rest of your Azure activity.' },
            { name: 'Private endpoints (VNet)', desc: 'Connect to Azure OpenAI over a private Azure network connection — no traffic leaves your virtual network and hits the public internet. Required by many financial and government security policies.' },
            { name: 'Content filtering controls', desc: 'Built-in content filters for hate, violence, sexual content, and self-harm, configurable per deployment. Enterprise customers can request modified filter configurations for legitimate use cases like medical applications.' },
          ]} />
        </Block>

        {/* Enterprise features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Enterprise security and governance features" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '🔒', title: 'Private networking with VNet integration', body: 'Deploy Azure OpenAI with a private endpoint — the service gets a private IP address inside your Azure Virtual Network. API calls never leave your private network to reach the public internet. Combined with network security groups and firewall rules, this meets the strictest enterprise network isolation requirements.' },
            { n: '👤', title: 'Role-Based Access Control (RBAC) via Entra ID', body: 'Assign Azure roles: Cognitive Services OpenAI User (can make API calls), Cognitive Services OpenAI Contributor (can also manage deployments), or Owner (full control). Permissions attach to Azure AD users, groups, managed identities, or service principals — not separate API keys passed around in Slack.' },
            { n: '📋', title: 'Audit logs in Azure Monitor', body: 'Every API call, every permission change, every deployment action logs to Azure Monitor and can be routed to Log Analytics, a SIEM like Microsoft Sentinel, or long-term storage in Azure Blob. Compliance teams can audit exactly who called the model, when, and from where.' },
            { n: '🛡️', title: 'Content filtering and responsible AI controls', body: 'Four content filter categories (hate/fairness, violence, sexual, self-harm) with severity thresholds configurable at the deployment level. Prompt Shield blocks prompt injection attacks. Groundedness detection flags responses not supported by the provided context.' },
            { n: '📊', title: 'Quota and cost management', body: 'Deployments have configurable token-per-minute (TPM) quotas. Set spending budgets and alerts in Azure Cost Management. Quota is regional — request increases through the Azure portal. No surprise bills from a misconfigured loop.' },
            { n: '🔑', title: 'Managed identity — no API keys required', body: 'Use Azure Managed Identity so your Azure Functions, AKS pods, or App Service instances authenticate to Azure OpenAI without storing any credentials. The managed identity token is fetched and rotated automatically by Azure — no secret rotation scripts needed.' },
          ]} />
        </Block>

        {/* Getting started */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Getting started with Azure OpenAI" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Create an Azure account — $200 free credit', body: 'Go to azure.microsoft.com → Start free. New accounts receive $200 in Azure credits valid for 30 days, plus 12 months of free-tier services. Use a personal Microsoft account or create one. No credit card charge during the trial.' },
            { n: '2', title: 'Request access to Azure OpenAI (if needed)', body: 'Azure OpenAI was previously gated behind an application form, but as of 2025, most Azure subscriptions have direct access. Go to the Azure portal, search "Azure OpenAI", and create a resource. If your subscription is blocked, submit the access request form — approval typically takes 1–2 business days.' },
            { n: '3', title: 'Create an Azure OpenAI resource', body: 'Azure portal → Create a resource → search "Azure OpenAI" → Create. Select your subscription, resource group, region (East US has the broadest model availability), pricing tier (Standard S0). Give it a name and create it.' },
            { n: '4', title: 'Deploy a model in Azure AI Foundry', body: 'Inside your resource → click "Go to Azure OpenAI Studio" (now Azure AI Foundry). Go to Deployments → + Create deployment → select model (gpt-4o or gpt-4o-mini) → set deployment name and token quota → Create. The deployment name is what you use in your API calls instead of the model name directly.' },
            { n: '5', title: 'Get your endpoint and API key', body: 'In your Azure OpenAI resource → Keys and Endpoint. You get: Endpoint URL (like https://your-name.openai.azure.com/), Key 1, Key 2 (rotate these without downtime). The API call path includes your deployment name: /openai/deployments/{deployment-name}/chat/completions.' },
            { n: '6', title: 'Make your first API call', body: "pip install openai\n\nfrom openai import AzureOpenAI\n\nclient = AzureOpenAI(\n    azure_endpoint='https://your-name.openai.azure.com/',\n    api_key='your-key-here',\n    api_version='2024-08-01-preview'\n)\n\nresponse = client.chat.completions.create(\n    model='your-deployment-name',\n    messages=[{'role': 'user', 'content': 'Hello from Azure!'}]\n)\nprint(response.choices[0].message.content)" },
          ]} />
          <div style={{ padding: '0.75rem 1rem', borderRadius: 10, background: dark ? `${color}08` : `${color}06`, border: `1px solid ${color}22`, marginTop: '0.5rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color, letterSpacing: '0.06em' }}>KEY DIFFERENCE FROM OPENAI API:</span>
            <p style={{ fontSize: '0.82rem', color: sub, margin: '0.375rem 0 0', lineHeight: 1.65 }}>Azure OpenAI uses the same Python SDK (<code style={{ fontFamily: "'Share Tech Mono', monospace", color }}>openai</code>) but with <code style={{ fontFamily: "'Share Tech Mono', monospace", color }}>AzureOpenAI</code> client instead of <code style={{ fontFamily: "'Share Tech Mono', monospace", color }}>OpenAI</code>. You pass your Azure endpoint URL, and in the <code style={{ fontFamily: "'Share Tech Mono', monospace", color }}>model</code> parameter you use your deployment name (not the OpenAI model name). The rest of the API — messages, parameters, response format — is identical.</p>
          </div>
        </Block>

        {/* Azure OpenAI vs OpenAI API vs AWS Bedrock */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Azure OpenAI vs OpenAI API vs AWS Bedrock — when to use each" color={color} />
          <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr>
                  {['', 'OpenAI API', 'Azure OpenAI', 'AWS Bedrock'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.6rem 0.875rem', borderBottom: `1px solid ${color}30`, color, fontSize: '0.65rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Models', 'GPT-4o, o1, DALL-E, Whisper', 'Same GPT-4o, o1, DALL-E, Whisper', 'Claude, Llama, Mistral, Titan, Nova, Cohere'],
                  ['Data control', 'OpenAI\'s cloud, opt-out training', 'Your Azure tenant, no training ever', 'Your AWS account, no training ever'],
                  ['Compliance certs', 'SOC 2, limited', 'SOC 1/2/3, HIPAA, FedRAMP, ISO', 'SOC 1/2/3, HIPAA, FedRAMP, ISO'],
                  ['Identity', 'API key only', 'Azure AD / Managed Identity', 'IAM roles / Managed Identity'],
                  ['Cloud infra fit', 'Any / no cloud dependency', 'Best for Azure-first orgs', 'Best for AWS-first orgs'],
                  ['Model variety', 'OpenAI models only', 'OpenAI models only', 'Multiple providers in one API'],
                  ['Free start', '$5 credit, easy signup', '$200 Azure credit, 30 days', 'Free tier credits, AWS account'],
                  ['Pricing', 'Per-token, direct', 'Per-token, same rates as OpenAI', 'Per-token, varies by model'],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? (dark ? `${color}04` : `${color}03`) : 'transparent' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '0.6rem 0.875rem', color: j === 0 ? color : sub, borderBottom: `1px solid ${border}`, fontFamily: j === 0 ? "'Share Tech Mono', monospace" : "'Rajdhani', sans-serif", fontSize: j === 0 ? '0.72rem' : '0.82rem', letterSpacing: j === 0 ? '0.05em' : 0 }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Choose OpenAI API when...', badge: 'Startups & individual devs', body: "You're building a product that does not need enterprise compliance, you want the simplest possible setup, or you want to access the very latest models the moment OpenAI releases them (Azure OpenAI gets new models slightly later). Great for side projects, prototyping, indie SaaS." },
            { label: 'Choose Azure OpenAI when...', badge: 'Enterprise / Azure shops', body: 'Your company already runs on Azure, you handle regulated data (healthcare records, financial data, government information), you need HIPAA/FedRAMP/ISO certifications, or your security policy requires private endpoints and no data leaving your Azure tenant. The standard choice for any enterprise already in the Microsoft ecosystem.' },
            { label: 'Choose AWS Bedrock when...', badge: 'AWS shops / multi-model needs', body: "Your infrastructure runs on AWS and you want AI to fit into existing IAM, VPC, Lambda, S3 patterns. Or you want to use multiple model providers (Claude, Llama, Mistral) through one unified API without managing separate credentials per provider. Bedrock's model variety is its main advantage over Azure OpenAI." },
          ]} />
        </Block>

        {/* Use cases */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Who uses Azure OpenAI and for what" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Banking and financial services', desc: 'Document summarization, contract analysis, customer support bots — using internal financial data that cannot leave the bank\'s cloud. HIPAA/SOC 2 compliance and private networking satisfy legal and audit requirements.' },
            { name: 'Healthcare systems', desc: 'Clinical note summarization, medical literature Q&A, patient intake automation. HIPAA compliance and data residency guarantees are non-negotiable. Azure OpenAI is one of the few AI APIs certified for PHI (Protected Health Information) use cases.' },
            { name: 'Government and public sector', desc: 'Azure OpenAI has FedRAMP High authorization. In January 2025, GPT-4o received approval for classified workloads in Azure Government. Government agencies can now use GPT-4o for sensitive public sector AI projects.' },
            { name: 'Enterprises already on Microsoft 365', desc: 'Companies using Teams, SharePoint, Dynamics 365, and Power Platform find Azure OpenAI integrates naturally. Microsoft Copilot in Office 365 is itself built on Azure OpenAI. Extending those capabilities with custom apps requires Azure OpenAI API access.' },
            { name: 'Students learning cloud AI', desc: 'Azure OpenAI is the right service to learn if you want to work at large enterprises or pursue cloud architect/AI engineer roles. Azure certifications (AZ-900, AI-102) include Azure OpenAI topics. The $200 trial is enough to build a full learning project.' },
            { name: 'Internal enterprise tools', desc: 'HR document Q&A, IT support bots, internal knowledge search, meeting summarization — tools that process internal company data. Azure OpenAI\'s private networking ensures proprietary company data never travels to a public endpoint.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do as a student" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Deploy GPT-4o inside Azure and make API calls using the same Python openai SDK you already know — just swap the client class',
            'Learn Microsoft Entra ID and RBAC by setting up proper role assignments instead of just using API keys',
            'Build a private-endpoint-aware architecture diagram that you can explain in enterprise job interviews',
            'Get hands-on with Azure AI Foundry (formerly Azure OpenAI Studio) — the model management portal used by enterprise AI teams',
            'Combine Azure OpenAI with Azure Cognitive Search for enterprise RAG — the architecture used in most large-company AI deployments',
            'Earn the AI-102 Azure AI Engineer Associate certification, which includes Azure OpenAI deployment and management',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Private Enterprise AI Chat with Azure OpenAI</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Build a simple document Q&A system using Azure OpenAI — the pattern used in nearly every enterprise internal AI tool. Upload a text file (a policy document, a product manual, meeting notes), send it as context in the system prompt, and let users ask questions about it. This is the foundational pattern for enterprise knowledge assistants. Requirements: use AzureOpenAI client (not OpenAI), load the API key from environment variables, handle the case where the answer is not in the document, and log the token usage from the response.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Set up Azure OpenAI resource', body: 'Create a free Azure account → Create Azure OpenAI resource in East US → Deploy gpt-4o-mini in Azure AI Foundry → Copy endpoint URL and API key to a .env file. Never commit the .env file.' },
            { n: '2', title: 'Load a document as context', body: "Read a text file into a string. Add it to the system message: 'You are a document assistant. Answer questions only based on the following document. If the answer is not in the document, say so clearly. Document: {document_text}'" },
            { n: '3', title: 'Build the chat loop', body: 'Accept user questions in a loop. Each call sends the system message (with document) plus the current user question. Keep conversation history for multi-turn follow-up questions. Print the response and token usage.' },
            { n: '4', title: 'Add a \"not found\" handler', body: "Check if the model responds with phrases like 'not mentioned' or 'not in the document'. Log these as unanswered questions — in a real enterprise tool, these would feed into a gap analysis of what information is missing from the knowledge base." },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>COST: gpt-4o-mini is $0.15/1M input tokens — a 10-page document + 50 questions costs under $0.01. The $200 Azure trial covers months of this kind of experimentation.</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>When interviewing for enterprise AI engineer or cloud architect roles, the question "why would you use Azure OpenAI instead of the OpenAI API directly?" comes up constantly. The answer is not "because Azure is better" — it is specific: data residency requirements, existing Azure identity infrastructure (Entra ID), HIPAA or FedRAMP compliance needs, private endpoint requirements, and the ability to use managed identities instead of static API keys. Knowing these reasons concretely — not just "enterprise security" — is what distinguishes candidates who have actually used Azure from those who just read about it.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/apis/aws-bedrock')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> AWS Bedrock
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/apis/mistral-api')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Mistral API <ChevronRight size={14} />
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
