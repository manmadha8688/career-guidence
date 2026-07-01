import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#EC4899'

export default function HermesPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Agents">
      <ToolHeader
        icon="🪄"
        title="Hermes — Open-Source Models Fine-Tuned for Agents"
        tagline="Nous Research's models built for function calling and structured output"
        badges={[['✓ FREE', '#4ADE80'], ['Run locally with Ollama', color], ['Nous Research', 'var(--text-muted)']]}
        overview={"Hermes is a series of open-source language models created by Nous Research — a community-driven AI research group. Hermes models are fine-tuned versions of base models like Llama 3.1, specifically optimized for tasks that matter most in agent development: function calling, structured JSON output, following complex multi-part instructions, and maintaining consistent personas across long conversations. Where the base Llama 3.1 model is general-purpose, Hermes 3 is trained specifically to be reliable at the mechanics of agentic behavior — calling the right tool at the right time, returning structured data in the exact format requested, and handling complex system prompts without losing context. It runs locally via Ollama (free, private) or via Together AI and Hugging Face APIs."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Shockingly Accurate Function Calling with Hermes 2 Pro — Local AI', url: 'https://www.youtube.com/watch?v=ViXURxck-HM', dur: '~15 min', note: 'Best Hermes function calling demo — see exactly how tool calling works' },
            { label: 'Fully Local Tool Calling with Ollama — Python Tutorial', url: 'https://www.youtube.com/watch?v=Nfk99Fz8H9k', dur: '~20 min', note: 'Run Hermes + Ollama locally — complete function calling implementation' },
            { label: 'Hermes — The Self Improving AI Agent (Ollama + Nous Research)', url: 'https://www.youtube.com/watch?v=lbqysOjR8SU', dur: '~15 min', note: 'Hermes as an agent — Nous Research integration and capabilities overview' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What makes Hermes different from base models" color={color} />
          <InfoBox color={color}>Fine-tuning takes a pre-trained base model and continues training it on a curated dataset focused on specific capabilities. Hermes 3's fine-tuning data emphasizes: structured output (the model reliably returns JSON in the format you specify), function calling (the model decides which tool to call with correct parameters), complex instruction following (multi-part instructions with multiple constraints), and roleplay/persona consistency (the model maintains a defined persona across a long conversation).</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The practical difference shows up when building agents. If you ask a base Llama 3.1 model to return JSON and it returns a mix of explanation text and partial JSON, your agent breaks. Hermes 3 returns exactly the JSON you specified — consistent across different prompts and edge cases. This reliability is the difference between a demo that works once and a production system that works every time. For function calling agents, Hermes 3 consistently outperforms base Llama on which tool to call and how to format the arguments.</p>
        </Block>
        <Block>
          <SubHead label="Getting Hermes running locally with Ollama" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Install Ollama', body: 'Download from ollama.com. Install like a regular app. Ollama runs a local server that manages model downloads and inference. No GPU required for 7B models — runs on CPU (slower but functional).' },
            { n: '2', title: 'Pull the Hermes model', body: 'ollama pull nous-hermes2 (7B, ~4GB)\nollama pull hermes3 (8B, based on Llama 3.1, ~5GB)\nModels download once and run locally. No API key, no internet connection needed after download.' },
            { n: '3', title: 'Run via Ollama API', body: "import requests\nresponse = requests.post('http://localhost:11434/api/chat', json={\n    'model': 'hermes3',\n    'messages': [{'role': 'user', 'content': 'Hello'}],\n    'stream': False\n})\nprint(response.json()['message']['content'])" },
            { n: '4', title: 'Use via OpenAI-compatible endpoint', body: "from openai import OpenAI\nclient = OpenAI(base_url='http://localhost:11434/v1', api_key='ollama')\nresponse = client.chat.completions.create(\n    model='hermes3',\n    messages=[{'role': 'user', 'content': 'Return my name and age as JSON'}]\n)\nSame OpenAI SDK, local model, no cost." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Function calling with Hermes" color={color} />
          <InfoBox color={color}>Hermes uses a specific XML-style format for function calling that differs from OpenAI's tool_calls format. Understanding this format lets you build reliable function-calling agents without needing the OpenAI API. The format uses &lt;tool_call&gt; tags that the model produces in its response, which your code parses and executes.</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Define tools in the system prompt', body: "Tools are defined in the system prompt as JSON schemas. Hermes reads these schemas and calls the appropriate tool by name with correct arguments based on the user's request." },
            { n: '2', title: 'Parse tool call responses', body: 'When Hermes decides to call a tool, it returns a response containing <tool_call>{"name": "function_name", "arguments": {...}}</tool_call>. Parse this XML, extract the JSON, and call the corresponding Python function.' },
            { n: '3', title: 'Return tool results', body: "Add the tool result as a tool message in the conversation: {'role': 'tool', 'content': json.dumps(result), 'name': 'function_name'}. Send the updated conversation back to Hermes." },
            { n: '4', title: 'Continue the conversation', body: 'Hermes reads the tool result and generates a natural language response incorporating the real data. The full loop: user request → Hermes chooses tool → you execute → Hermes responds with result.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Hermes use cases" color={color} />
          <CardGrid color={color} items={[
            { name: 'Local agent development', desc: 'Build function-calling agents that run entirely on your machine. No API costs, no internet required after model download, full data privacy. Hermes 3 8B runs on 8GB RAM.' },
            { name: 'Structured data extraction', desc: 'Extract specific fields from unstructured text as JSON. "Extract name, email, company from this email" returns clean JSON every time — no parsing of free-text responses.' },
            { name: 'Instruction-following automation', desc: 'Complex multi-step instructions with many constraints. Hermes 3 handles "do X but not Y, always format as Z, never include W" better than base models of the same size.' },
            { name: 'Consistent personas', desc: 'Define a character/persona in the system prompt and Hermes maintains it across a very long conversation. Useful for interactive learning assistants, simulation characters, and testing systems.' },
            { name: 'Offline AI features', desc: 'Build features that work without internet: local summarization, local classification, local Q&A. Deploy in environments where cloud API calls are not possible or not allowed.' },
            { name: 'Cost-free development', desc: 'All development and testing completely free. Download once, run unlimited times. When ready for production, evaluate whether the quality justifies staying local or upgrading to cloud APIs.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Hermes vs cloud models for agent work" color={color} />
          <Compare color={color} items={[
            { label: 'Quality vs cost tradeoff', badge: 'Context-dependent', body: 'Hermes 3 8B (free, local) vs GPT-5.5-mini ($0.15/1M tokens) vs GPT-5.5 ($2.50/1M tokens). For structured output and function calling on well-defined tasks, Hermes 3 is often comparable to GPT-5.5-mini. For complex reasoning, GPT-5.5 leads. Benchmark on your specific task before concluding cloud is necessary.' },
            { label: 'Privacy', badge: 'Hermes wins', body: 'Running locally means no data leaves your machine. For applications processing sensitive data — personal documents, internal business data, medical records — local inference with Hermes eliminates data privacy concerns entirely.' },
            { label: 'Deployment', badge: 'Cloud easier, local more private', body: 'Cloud APIs: no hardware requirements, scales automatically, easy to update. Local Hermes: fixed compute requirements (RAM/CPU), no ongoing cost, private. For student projects: use cloud APIs. For applications with privacy requirements: consider local.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Run a capable function-calling language model entirely on your own computer at zero ongoing cost',
            'Extract structured JSON data from any unstructured text reliably and consistently',
            'Build agent prototypes locally before connecting them to paid cloud APIs',
            'Create AI features that work completely offline — no internet, no API key, no cost',
            'Learn agent development patterns (function calling, tool use) without spending on API credits',
        ]} />
      </Block>
        <ProjectTask
        title={"Local Function-Calling Agent"}
        description={"Build an agent that runs entirely on your machine using Hermes via Ollama. Give it 3 tools: get_weather(city) that returns a mock weather response, search_flights(from, to, date) that returns mock flight data, and calculate_trip_cost(flights, hotel_nights) that does simple math. Ask it: \"Plan a 3-day trip from Hyderabad to Bangalore for next weekend and estimate the cost.\" Watch it call the right tools with correct arguments."}
        costNote={"TOTAL COST: ₹0 — Hermes via Ollama, fully local, no API key required"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Install Ollama and pull Hermes', body: "Install from ollama.com. Run: ollama pull hermes3. This downloads ~5GB once. Verify with: ollama run hermes3 'Hello' — if it responds, you are ready." },
            { n: '2', title: 'Define mock tools as Python functions', body: "Write 3 simple Python functions that return hardcoded mock data. The goal is to test tool calling, not real data. get_weather returns {'temp': 28, 'condition': 'sunny'}. Realistic enough to test the pattern." },
            { n: '3', title: 'Build the tool-calling loop', body: 'System prompt defines the tools as JSON schemas. User message triggers tool selection. Parse <tool_call> from response. Execute matching Python function. Return result. Send back to Hermes for final response.' },
            { n: '4', title: 'Test with varied queries', body: 'Try 5 different trip planning queries. Does Hermes correctly identify which tools to call? Does it pass the right arguments? Fix the system prompt if tool selection is wrong — the system prompt is your only lever.' },
          ]} />
      </ProjectTask>
        <ProTip>
        When building function-calling agents with Hermes, write extremely clear tool descriptions. The description field in your tool schema is what the model reads to decide when to use that tool. "Get the current weather for a city" is clear. "Weather tool" is not. Spend time writing precise, unambiguous tool descriptions — it is the most impactful optimization for improving tool selection accuracy.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/agents/autogen', label: 'AutoGen' }}
        next={{ path: '/ai-lab/agents/mcp', label: 'MCP' }}
      />
    </ToolPageShell>
  )
}
