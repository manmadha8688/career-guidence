import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#E520E9'

export default function PydanticAIPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Agents">
      <ToolHeader
        icon="✳️"
        title="Pydantic AI — Type-Safe Agents, the Pydantic Way"
        tagline="Build production-grade AI agents with validated, structured outputs"
        badges={[['✓ FREE (OSS)', '#4ADE80'], ['ai.pydantic.dev', color], ['Python · MIT', 'var(--text-muted)']]}
        overview={"Pydantic AI is an open-source, type-safe Python agent framework built by the team behind Pydantic — the data-validation library used by an enormous share of Python projects (and the foundation of FastAPI). The pitch is simple: FastAPI made web APIs ergonomic and type-safe using Pydantic and Python type hints; Pydantic AI does the same for LLM agents. Instead of parsing raw model text and hoping it is valid JSON, you define a Pydantic model for the output you want and the framework guarantees the LLM's response is validated against it — moving whole classes of errors from runtime to write-time, giving you that Rust-like 'if it compiles, it works' feeling. It is model-agnostic (OpenAI, Anthropic, Google Gemini, Groq, Mistral, Bedrock, Ollama, and more), has built-in dependency injection for testable agents, native MCP support, streaming, multi-agent workflows, and OpenTelemetry tracing out of the box. The framework is MIT-licensed and free; the company also offers Logfire (observability) as a separate commercial product you never need to get started."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Pydantic AI tutorial — type-safe agents in Python', url: 'https://www.youtube.com/results?search_query=pydantic+ai+tutorial', dur: 'Search', note: 'Getting started — define an Agent, structured outputs, tools' },
            { label: 'Pydantic AI — structured outputs & validation deep dive', url: 'https://www.youtube.com/results?search_query=pydantic+ai+structured+output', dur: 'Search', note: 'Why validated outputs matter for production reliability' },
            { label: 'Pydantic AI vs LangChain — a cleaner agent framework?', url: 'https://www.youtube.com/results?search_query=pydantic+ai+vs+langchain', dur: 'Search', note: 'Where a type-first framework fits in your toolkit' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why type safety changes agent development" color={color} />
          <InfoBox color={color}>{"LLMs return text. Most agent bugs come from that text not matching what your code expects — a missing field, a string where you wanted a number, malformed JSON. Pydantic AI eliminates this class of bug: you declare the shape of the output as a Pydantic model, and the framework validates every response against it, retrying automatically if the model returns something invalid. Your downstream code receives a guaranteed, typed Python object — not a string you have to defensively parse."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Because Pydantic AI is built on type hints, your IDE and static type checkers (mypy, pyright) understand your agents. Agents are generic in their dependency type and their output type, so autocomplete works, and mistakes surface while you write the code rather than in production. Add dependency injection — passing database connections, API clients, or config into an agent in a type-safe way — and you get agents that are genuinely testable, which is rare in this space.</p>
          {[
            'Validated structured outputs — declare a Pydantic model, get a guaranteed typed object back, with automatic retries on invalid responses',
            'Model-agnostic — OpenAI, Anthropic, Gemini, Groq, Mistral, Bedrock, Ollama; switch providers by changing one string like "openai:gpt-4o" → "anthropic:claude-..."',
            'Dependency injection — pass DB connections, HTTP clients, and config into agents type-safely, making them easy to unit-test with a built-in "test" model',
            'Function tools — decorate any Python function with @agent.tool and the agent can call it, with arguments validated by Pydantic',
            'Built-in observability — OpenTelemetry tracing everywhere, so you can see every model request/response (works with Logfire or any OTel backend, no lock-in)',
          ].map((item, i) => (
            <div key={i} className="tool-layout-cando-item">
              <div className="tool-layout-cando-item__dot" />
              <span className="tool-layout-cando-item__text">{item}</span>
            </div>
          ))}
        </Block>
        <Block>
          <SubHead label="Key features" color={color} />
          <CardGrid color={color} items={[
            { name: 'The Agent object', desc: 'The primary interface: Agent(model, instructions=..., output_type=...). Run it with agent.run_sync() (synchronous), agent.run() (async), or agent.run_stream() (streaming). One clean abstraction for the whole loop.' },
            { name: 'Structured outputs', desc: 'Set output_type to a Pydantic model (or a dataclass, or a plain type). The framework enforces the schema on the model\'s response and returns a validated instance. No more json.loads() and defensive key checks.' },
            { name: 'Function tools', desc: 'Register tools with the @agent.tool decorator. Argument types are validated by Pydantic before your function runs, and the docstring tells the model when to use the tool. Type-safe tool calling with almost no boilerplate.' },
            { name: 'Dependency injection', desc: 'Pass runtime dependencies (a DB session, an API client, user context) via a typed deps object accessed through RunContext. Makes agents deterministic to test — swap real deps for fakes in unit tests.' },
            { name: 'Model-agnostic + MCP', desc: 'Point at any provider with a model string, and connect to external tools/servers via native Model Context Protocol support. Multi-agent workflows and durable execution are supported for more complex systems.' },
            { name: 'Test model — no API key', desc: 'Pass the built-in "test" model to run an agent entirely offline without calling any LLM. Perfect for learning the API and writing fast, deterministic unit tests before you spend a rupee on tokens.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — your first typed agent" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Install Pydantic AI', body: 'pip install pydantic-ai — installs the full framework with all model integrations. For a lean install, use the slim package with only the providers you need: pip install "pydantic-ai-slim[openai]". Requires Python 3.9+.' },
            { n: '2', title: 'Try it with zero cost first', body: 'You do not need an API key to learn the API. Pass the built-in test model: Agent("test"). It runs offline, returns canned responses, and is ideal for understanding the flow and writing unit tests before spending on tokens.' },
            { n: '3', title: 'Write a minimal agent', body: 'from pydantic_ai import Agent\nagent = Agent("openai:gpt-4o", instructions="Be concise.")\nresult = agent.run_sync("What is retrieval-augmented generation?")\nprint(result.output)' },
            { n: '4', title: 'Add a structured output', body: 'from pydantic import BaseModel\nclass Answer(BaseModel):\n    summary: str\n    confidence: float\nagent = Agent("openai:gpt-4o", output_type=Answer)\nres = agent.run_sync("Summarise RAG in one line")\nprint(res.output.summary, res.output.confidence)  # validated, typed' },
            { n: '5', title: 'Give the agent a tool', body: '@agent.tool_plain\ndef get_marks(subject: str) -> int:\n    """Return the student\'s marks for a subject."""\n    return db[subject]\nThe agent decides when to call get_marks; Pydantic validates the subject argument automatically.' },
            { n: '6', title: 'Swap providers freely', body: 'Change one string to move between vendors: Agent("anthropic:claude-3-5-sonnet-latest") or Agent("google-gla:gemini-1.5-flash") or a local Agent("ollama:llama3"). The rest of your code is untouched — this is the payoff of a model-agnostic design.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Pydantic AI vs LangChain vs LlamaIndex" color={color} />
          <Compare color={color} items={[
            { label: 'Pydantic AI', badge: 'Type-safety & reliability', body: 'A focused, ergonomic agent framework built around validated outputs, dependency injection, and IDE/type-checker friendliness. Best when correctness and testability matter — production services, structured data extraction, anything where a malformed response is a real bug.' },
            { label: 'LangChain', badge: 'Breadth & ecosystem', body: 'The broadest general-purpose framework with the largest ecosystem of integrations and tutorials. Best when you want maximum building blocks and community examples, and are comfortable with a heavier, less type-strict API.' },
            { label: 'LlamaIndex', badge: 'Data & RAG-first', body: 'Specialized around ingesting and retrieving your own data. Best when the core challenge is RAG over documents. Often paired with an agent framework rather than competing head-on with one.' },
            { label: 'The honest take', badge: 'Pick by problem', body: 'Choose Pydantic AI when you want clean, type-safe agents and reliable structured output. Reach for LlamaIndex when your problem is data retrieval, and LangChain when you need its vast integration catalogue. The underlying concepts (agents, tools, RAG) transfer between all three.' },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Type-Safe Resume Parser Agent</span></div>
          <p className="tool-layout-task__desc">Build an agent that reads raw resume text and returns a strictly-validated structured object — name, skills, years of experience, education — using a Pydantic output model. This is a real, common production task (parsing messy text into clean data) and it showcases exactly what makes Pydantic AI valuable: you get a guaranteed typed object back, never a string you have to defensively parse. Perfect for a portfolio because the "structured extraction" pattern shows up constantly in AI jobs.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Install and pick a free model', body: 'pip install pydantic-ai. Use a free option: a Groq free-tier key (fast, generous limits) with Agent("groq:llama-3.1-8b-instant"), or a local Agent("ollama:llama3"). Both keep this project at ₹0.' },
            { n: '2', title: 'Define the output schema', body: 'Create a Pydantic model: class Resume(BaseModel) with fields name: str, email: str, skills: list[str], years_experience: float, highest_degree: str. This schema is the contract the LLM must satisfy.' },
            { n: '3', title: 'Build the extraction agent', body: 'agent = Agent(model, output_type=Resume, instructions="Extract structured data from the resume. If a field is unknown, make a best-effort estimate."). Pydantic AI enforces the schema and retries automatically on invalid responses.' },
            { n: '4', title: 'Run it on real resumes', body: 'Feed in 5–10 real (anonymised) resume texts. Print result.output.skills and result.output.years_experience. Notice you get typed Python objects — you can immediately do sorted(res.output.skills) with no parsing.' },
            { n: '5', title: 'Test without spending tokens', body: 'Write a unit test using Agent("test") or by overriding the model, so your parsing logic is verified offline and deterministically. This demonstrates testable AI code — a genuinely rare and valued skill.' },
            { n: '6', title: 'Batch and export', body: 'Loop over a folder of resumes, run the agent on each, and write the validated results to a CSV or JSON. You now have a working structured-extraction pipeline — a concrete, explainable portfolio artifact.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — Pydantic AI is MIT open source; Groq free tier or local Ollama keeps API cost at ₹0</span></div>
        </div>
        <ProTip>
        Reach for structured outputs (output_type=YourModel) far more often than you think. The instinct with LLMs is to get back a paragraph of text and then parse it — but the moment your program needs to *use* the answer (store it, sort it, branch on it), unstructured text becomes a liability. By declaring a Pydantic model up front, you push the "make it valid" burden onto the framework, get automatic retries when the model misbehaves, and receive a clean typed object your code can trust. Design the output schema first, then write the agent around it — this single habit makes AI features dramatically more reliable.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/agents/llamaindex', label: 'LlamaIndex' }}
        next={{ path: '/ai-lab/agents/smolagents', label: 'smolagents' }}
      />
    </ToolPageShell>
  )
}
