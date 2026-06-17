import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#EC4899'

export default function AutoGenPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(0,217,255,0.09)' : 'rgba(79,70,229,0.11)'
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Agents</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🤖</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>AutoGen — Microsoft's Conversational Multi-Agent Framework</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Agents that talk to each other to solve complex problems</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['Microsoft Research', color], ['Python framework', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>AutoGen is Microsoft Research's framework for multi-agent AI systems built around a simple, powerful idea: agents solve problems by having conversations with each other. A UserProxyAgent (representing a human or automated process) sends tasks to an AssistantAgent (an LLM). The assistant responds with a plan or code. The proxy executes the code, sees the result, and sends it back. This conversation continues until the task is done. AutoGen v0.4 (AgentChat) is a major rewrite from the original v0.2, with a cleaner API, better async support, a team-based orchestration model, and built-in support for streaming. It is particularly strong for tasks involving code generation and execution — the conversation loop means the LLM can see execution errors and fix them automatically.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'AutoGen FULL Tutorial with Python — Build AI Agent Teams!', url: 'https://www.youtube.com/watch?v=V2qZ_lgxTzg', dur: '~45 min', note: 'Most comprehensive step-by-step — AssistantAgent, UserProxy, GroupChat' },
            { label: 'Master AI Agents & AutoGen in Python — 6 Step-by-Step Projects 2025', url: 'https://www.youtube.com/watch?v=YeJG_H-sw84', dur: '~90 min', note: 'AutoGen 0.5 — six real projects covering all major patterns' },
            { label: 'Autogen Full Beginner Course', url: 'https://www.youtube.com/watch?v=JmjxwTEJSE8', dur: '~60 min', note: 'Beginner-friendly deep dive — conversation loops, code execution, tools' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* The conversational agent model */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="The conversational agent model" color={color} />
          <InfoBox color={color} dark={dark}>AutoGen's core metaphor is conversation. Every interaction is a sequence of messages between agents. An AssistantAgent thinks and responds. A UserProxyAgent executes code in the response and sends back the output. A GroupChatManager coordinates multiple agents talking to each other. The conversation continues until a termination condition is met — the task is done, max messages reached, or a specific phrase appears in a response.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The key insight is the code execution loop. When an LLM generates Python code in a response, AutoGen's UserProxyAgent can execute that code automatically, capture the output (or error), and send it back to the LLM. The LLM sees "your code produced this error" and generates a fix. This self-correcting loop continues until the code runs successfully. For data analysis, data processing, and any computational task, this is dramatically more powerful than a single LLM call.</p>
        </Block>

        {/* Core components */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="AutoGen v0.4 core components (AgentChat API)" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'AssistantAgent', desc: 'An LLM-backed agent that responds to messages. Configured with a system message defining its role and capabilities. The "thinking" agent in most patterns.' },
            { name: 'UserProxyAgent', desc: 'Acts on behalf of a human or automated process. Can execute code blocks in LLM responses. Sends results back as the next message. Drives the conversation forward.' },
            { name: 'RoundRobinGroupChat', desc: 'A team of agents that take turns responding to messages. Each agent responds once per round. Useful for tasks benefiting from multiple independent perspectives.' },
            { name: 'SelectorGroupChat', desc: 'A team where a selector (LLM or function) chooses which agent responds next based on the conversation context. More dynamic than round-robin for complex coordination.' },
            { name: 'Termination conditions', desc: 'MaxMessageTermination (stop after N messages), TextMentionTermination (stop when agent says "TERMINATE"), ExternalTermination (stop on external signal). Control when the conversation ends.' },
            { name: 'Code executors', desc: 'LocalCommandLineCodeExecutor (runs locally), DockerCommandLineCodeExecutor (sandboxed, safer), JupyterCodeExecutor (notebook environment). Choose based on security requirements.' },
          ]} />
        </Block>

        {/* Building a code generation agent */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Building a code generation agent" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install AutoGen', body: "pip install 'autogen-agentchat==0.4.*' autogen-ext[openai]\nFor Groq: pip install langchain-groq (use via OpenAI-compatible endpoint)" },
            { n: '2', title: 'Define the model client', body: "from autogen_ext.models.openai import OpenAIChatCompletionClient\nclient = OpenAIChatCompletionClient(\n    model='llama-3.1-70b-versatile',\n    base_url='https://api.groq.com/openai/v1',\n    api_key=os.getenv('GROQ_API_KEY')\n)" },
            { n: '3', title: 'Create agents', body: "from autogen_agentchat.agents import AssistantAgent, CodeExecutorAgent\nfrom autogen_ext.code_executors.local import LocalCommandLineCodeExecutor\ncoder = AssistantAgent('coder', model_client=client, system_message='You are an expert Python developer. When given a task, write and execute Python code to complete it.')\nexecutor = CodeExecutorAgent('executor', code_executor=LocalCommandLineCodeExecutor(work_dir='./output'))" },
            { n: '4', title: 'Create a team and run', body: "from autogen_agentchat.teams import RoundRobinGroupChat\nfrom autogen_agentchat.conditions import MaxMessageTermination\nteam = RoundRobinGroupChat([coder, executor], termination_condition=MaxMessageTermination(10))\nresult = await team.run(task='Analyze the CSV file data.csv and plot a bar chart of sales by region')" },
            { n: '5', title: 'Stream responses', body: "async for message in team.run_stream(task='...'):\n    print(message)\nThe run_stream() method yields each message as it is generated — you see the agent's thinking in real time." },
          ]} />
        </Block>

        {/* AutoGen vs CrewAI vs LangGraph */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="AutoGen vs CrewAI vs LangGraph" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Core metaphor', badge: 'Different models', body: "AutoGen: agents have conversations with each other — messages drive everything. CrewAI: agents are team members with roles assigned to tasks. LangGraph: agents are nodes in a graph with explicit state. Choose based on which model fits your problem's natural structure." },
            { label: 'Code execution', badge: 'AutoGen strongest', body: "AutoGen's code execution loop (generate code → execute → see output → fix) is its strongest feature. For computational tasks, data analysis, and automated debugging, AutoGen's design is optimized for this. CrewAI and LangGraph support code execution but it requires more manual setup." },
            { label: 'Conversation control', badge: 'AutoGen most natural', body: "When the interaction between agents IS the product — debates, collaborative writing, adversarial review — AutoGen's conversation model is the most natural fit. The back-and-forth is explicit and readable." },
            { label: 'Production readiness', badge: 'LangGraph most robust', body: "For production systems requiring reliability: LangGraph's checkpointing, human-in-the-loop, and explicit state management are more battle-tested. AutoGen v0.4 is newer and still maturing for large-scale production use." },
          ]} />
        </Block>

        {/* Common patterns */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Common patterns" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'The code review pattern', body: "Coder agent writes code. Code reviewer agent reviews it and gives specific feedback. Coder revises based on feedback. Repeat until reviewer says LGTM. AutoGen's conversation structure makes this natural." },
            { n: '2', title: 'The research + synthesis pattern', body: 'Multiple researcher agents independently research different aspects of a topic. A synthesis agent reads all their outputs and writes a unified report. Use RoundRobinGroupChat so each researcher contributes.' },
            { n: '3', title: 'The critic-creator pattern', body: 'Creator generates output (code, writing, analysis). Critic evaluates it and identifies specific weaknesses. Creator revises. This adversarial loop produces higher-quality outputs than a single generation.' },
            { n: '4', title: 'The human-in-the-loop pattern', body: "UserProxyAgent with human_input_mode='ALWAYS' pauses and asks the human for approval before each step. human_input_mode='TERMINATE' only asks when the conversation ends. Use for tasks where human review matters." },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Build agents that write code, execute it, see errors, and automatically fix them in a loop',
            "Create adversarial review systems where one agent creates and another agent critiques",
            "Run multi-agent research conversations where agents build on each other's findings",
            'Automate data analysis tasks — describe what you want, AutoGen writes and runs the Python',
            'Build conversational debugging tools that explain errors and iterate toward working code',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Automated Data Analysis</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Give AutoGen a dataset (any CSV file — your project data, a Kaggle dataset, anything). Ask it to: (1) explore the data structure and statistics, (2) identify interesting patterns or correlations, (3) generate 3 visualizations, (4) write a summary of key findings. The code execution loop means AutoGen fixes its own errors. Your job is only to describe what you want and review the final output.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Set up the environment', body: "pip install 'autogen-agentchat==0.4.*' autogen-ext[openai] pandas matplotlib seaborn. Download any CSV dataset you find interesting." },
            { n: '2', title: 'Create coder and executor agents', body: 'AssistantAgent with a data scientist system message. CodeExecutorAgent with LocalCommandLineCodeExecutor pointing to a working directory. Put your CSV file in that directory.' },
            { n: '3', title: 'Write the task description', body: "Be specific: 'Analyze sales_data.csv. First print dtypes and basic statistics. Then find the top 5 products by revenue. Then plot revenue by month as a bar chart. Save the chart as analysis.png.'" },
            { n: '4', title: 'Review generated code and output', body: 'Read every code block AutoGen generated. Understand what each pandas/matplotlib call does. The analysis is the product; understanding the code is the learning.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>COST: Free with Groq API key — llama-3.1-70b-versatile on Groq has a generous free tier</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Always set work_dir in your CodeExecutor to an isolated directory, not your project root. AutoGen will create files, run scripts, and potentially modify the working directory. An isolated directory keeps your project clean and makes it easy to review everything the agent produced in one place.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/agents/crewai')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> CrewAI
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/agents/hermes')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Hermes <ChevronRight size={14} />
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
