import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#6366F1'

export default function MetaGPTPage() {
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🏢</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>MetaGPT — AI Software Company in a Prompt</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Assign roles to AI agents — PM, Architect, Engineer, QA — and watch them build software</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['metagpt.ai', color], ['Open Source', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>MetaGPT is a multi-agent framework that simulates an entire software company inside a single prompt. You describe what you want to build — "create a CLI task manager in Python" — and MetaGPT spawns specialized agents: a Product Manager that writes a PRD, an Architect that designs the system, Engineers that write the code, and a QA Engineer that reviews it. Each agent communicates through a shared message pool, passing structured documents rather than raw text. This document-driven approach, modeled after real software team workflows, produces higher-quality outputs than simple LLM chaining. MetaGPT has crossed 67,900+ GitHub stars, was accepted for oral presentation at ICLR 2024, and remains one of the four most-starred AI agent frameworks in the world. In February 2025, the team launched MetaGPT X (MGX) — a visual interface that removes the need for any Python code to run the full agent team.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'MetaGPT Tutorial For Beginners — What Is MetaGPT? Full Explained', url: 'https://www.youtube.com/watch?v=VI4hMv0eVPU', dur: '~20 min', note: 'Simplilearn — roles, SOPs, document flow, and a complete walkthrough from scratch' },
            { label: 'This AI Can Build Full Stack Websites & Apps in Minutes — MetaGPT X (MGX)', url: 'https://www.youtube.com/watch?v=XxIjNIt5788', dur: '~15 min', note: 'Live demo of MGX visual interface — build an app from a single text prompt, no code needed' },
            { label: 'MetaGPT Setup: Launch a Startup with One Prompt', url: 'https://www.youtube.com/watch?v=nqZlTV_L6Ao', dur: '~18 min', note: 'End-to-end install, config, and a real project — PRD to running code in minutes' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Role-based architecture InfoBox */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="The software team metaphor — why it works" color={color} />
          <InfoBox color={color} dark={dark}>MetaGPT encodes real-world software development SOPs (Standard Operating Procedures) into agent behavior. Each agent knows not just what to do, but in what format to deliver it. The Product Manager does not just summarize requirements — it outputs a structured PRD document. The Architect does not just suggest a design — it produces a class diagram and API specification. These structured artifacts become the inputs for the next agent. This is why MetaGPT produces better code than a single LLM: every downstream agent gets precise, human-readable context, not a vague chat summary.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The framework uses a shared message pool architecture where agents publish messages that others subscribe to based on relevance to their role. The Product Manager publishes a PRD — the Architect subscribes and reads it. The Architect publishes system design specs — Engineers subscribe and read them. This prevents the context-pollution problem where every agent sees everything; each agent only sees what is relevant to its role. This mirrors how real software teams communicate through documents, tickets, and specs rather than endless group chat threads.</p>
        </Block>

        {/* Key Roles */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Key agent roles in MetaGPT" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Product Manager', desc: 'Receives the user requirement. Produces a Product Requirements Document (PRD) with user stories, competitive analysis, goals, and success metrics. Sets the vision for the entire team.' },
            { name: 'Architect', desc: 'Reads the PRD and designs the technical system. Produces a system design document, class diagrams, API interface definitions, and file structure. Decides what modules to build and how they connect.' },
            { name: 'Project Manager', desc: "Reads the Architect's design and creates a task list. Assigns specific coding tasks to each Engineer. Manages the sequence of work to avoid dependencies blocking progress." },
            { name: 'Engineer', desc: 'Receives tasks and writes the actual code. Reads the system design and PRD for context. Produces runnable Python (or other language) source files. Multiple Engineers can work on different modules in parallel.' },
            { name: 'QA Engineer', desc: "Reviews the Engineer's code and writes tests. Checks that the implementation matches the PRD requirements. Produces test files and flags issues back to Engineers for correction." },
            { name: 'Custom Roles', desc: 'MetaGPT lets you define your own agents by subclassing the Role base class. Add a Data Analyst, a Security Auditor, or a Technical Writer to any project. Each custom role subscribes to the messages it needs.' },
          ]} />
        </Block>

        {/* How to run */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How to run MetaGPT" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install MetaGPT', body: 'pip install metagpt\n# Or from source:\ngit clone https://github.com/FoundationAgents/MetaGPT\ncd MetaGPT && pip install --upgrade -e .\n\nRequires Python 3.9–3.11. Also install Node.js + mermaid-js if you want diagram generation:\nnpm install -g @mermaid-js/mermaid-cli' },
            { n: '2', title: 'Configure your LLM API key', body: '# Initialize the config file:\nmetagpt --init-config\n\n# This creates ~/.metagpt/config2.yaml\n# Edit it to add your API key:\n# llm:\n#   api_type: openai      # or groq, anthropic, etc.\n#   model: gpt-4o-mini    # or llama-3-8b-8192 for free Groq\n#   api_key: sk-...\n\n# For free usage: get a Groq API key at console.groq.com' },
            { n: '3', title: 'Run your first project from the CLI', body: '# One command — MetaGPT spawns the full software team:\nmetagpt "write a CLI blackjack game in Python"\n\n# More specific requirements get better results:\nmetagpt "Create a Python REST API with FastAPI that manages a todo list with add, complete, and delete operations. Include unit tests."\n\n# Output is saved to ./workspace/ by default' },
            { n: '4', title: 'Run via Python for more control', body: 'import asyncio\nfrom metagpt.software_company import SoftwareCompany\nfrom metagpt.roles import ProjectManager, ProductManager, Architect, Engineer\n\nasync def main():\n    company = SoftwareCompany()\n    company.hire([ProductManager(), Architect(), ProjectManager(), Engineer(n=3)])\n    company.invest(3.0)  # token budget in USD\n    company.start_project("Build a Python CLI password generator with strength meter")\n    await company.run(n_round=5)\n\nasyncio.run(main())' },
            { n: '5', title: 'Inspect the generated artifacts', body: '# MetaGPT writes everything to ./workspace/<project_name>/\n# You will find:\n#   docs/prd.md          — Product Requirements Document\n#   docs/system_design.md — Architecture + class diagrams\n#   docs/task.md          — Task assignments for Engineers\n#   <module>.py           — All generated source code\n#   tests/test_*.py       — QA Engineer test files\n\n# Review each document — they reveal exactly what each agent decided and why' },
          ]} />
        </Block>

        {/* MetaGPT vs CrewAI vs AutoGen */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="MetaGPT vs CrewAI vs AutoGen" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Primary purpose', badge: 'Very different goals', body: 'MetaGPT is laser-focused on software development — describe a project, get a codebase. CrewAI is a general-purpose role-based framework — research pipelines, content generation, data analysis crews. AutoGen is a conversational multi-agent system — agents debate, refine, and solve problems through dialogue. Choose MetaGPT only if your goal is generating code or software artifacts; for other workflows, CrewAI or AutoGen fit better.' },
            { label: 'Document-driven vs task-driven', badge: 'MetaGPT unique approach', body: 'MetaGPT agents communicate through structured documents (PRD, system design, task list) — each document is a formatted artifact with sections, diagrams, and specifications. CrewAI agents pass task outputs as plain text from one agent to the next. AutoGen agents have back-and-forth conversations. MetaGPT\'s document approach produces more formal, traceable, and high-quality artifacts — but it is harder to customize for non-software tasks.' },
            { label: 'Ease of use', badge: 'CrewAI wins for beginners', body: 'CrewAI is the simplest to start with — define agents and tasks in ~30 lines of Python. AutoGen requires understanding conversation patterns and termination conditions. MetaGPT has the steepest setup curve — config file, optional Node.js for diagrams, and understanding the role hierarchy. However, MetaGPT X (MGX) now provides a no-code visual interface that makes the framework accessible to non-programmers.' },
          ]} />
        </Block>

        {/* Document generation */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What MetaGPT generates for every project" color={color} />
          <InfoBox color={color} dark={dark}>MetaGPT does not just output code — it produces a full software project documentation suite. Every run generates: a PRD (user stories, competitive analysis, requirements), a system design (class diagrams, sequence diagrams, API specs), a task breakdown (each module mapped to an Engineer), source code files, and test files. This mirrors how professional software is actually built — documentation first, then implementation. The documents are not just by-products; each one is the input that drives the next agent's work.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>For students learning software engineering, this document trail is incredibly educational. Run MetaGPT on any project idea and then read what the Product Manager wrote in the PRD, how the Architect translated that into a class diagram, and how the Engineer implemented it. You are reading the decision chain of a simulated software team. This teaches you what a real PRD looks like, how architecture decisions connect to requirements, and what makes code reviewable — patterns that take years to learn on the job.</p>
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Generate a complete Python project — PRD, architecture docs, source code, and tests — from a single sentence',
            'Read the generated PRD and system design to understand how real software teams structure decisions',
            'Use MetaGPT X (MGX) visual interface to build projects without writing any Python code',
            'Define custom agent roles by subclassing Role — add a Security Auditor or a Data Analyst to any project',
            'Study the generated class diagrams and sequence diagrams as a free software architecture course',
            'Use MetaGPT for portfolio projects — the professional docs it generates impress in interviews',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Real Tool with MetaGPT</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Pick a small utility you have always wanted — a habit tracker CLI, a URL shortener API, a Pomodoro timer script — and generate it with MetaGPT. Your goal is not just to get working code; it is to read every document MetaGPT produces and understand why each agent made the decisions it did. The PRD, architecture, and task list are your free software engineering education.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Set up MetaGPT with a free LLM', body: 'pip install metagpt. Run metagpt --init-config to create ~/.metagpt/config2.yaml. Set api_type: groq and add your free Groq API key (console.groq.com). Use model: llama-3.1-8b-instant for speed or llama-3.1-70b-versatile for quality.' },
            { n: '2', title: 'Write a precise requirement', body: "The better your prompt, the better the output. Instead of 'make a todo app', write: 'Create a Python CLI todo list app with commands: add <task>, done <id>, list, delete <id>. Store tasks in a JSON file. Show task IDs, text, and status. Include colorized output with rich library.'" },
            { n: '3', title: 'Run and watch the agent team work', body: 'metagpt "your precise requirement here"\nWatch the terminal output — you will see the Product Manager, Architect, Project Manager, and Engineers each announce their work. The full run takes 2-5 minutes. Output goes to ./workspace/<project_name>/' },
            { n: '4', title: 'Read the documents before running the code', body: 'Open docs/prd.md and read what the Product Manager decided. Then read docs/system_design.md and compare it to your mental model. Then read the code. Ask yourself: do the design decisions match the requirements? What would you have done differently? This reflection is where learning happens.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Groq free tier handles MetaGPT comfortably for small projects</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>MetaGPT's output quality scales directly with how specific your requirement is. The Product Manager agent can only write a good PRD if your requirement is concrete enough to analyze. Include: what it does, who uses it, what the key commands or features are, what language/framework, and any specific constraints. Think of it as writing a brief for a freelancer — the more precise the brief, the less back-and-forth, and the closer the output is to what you actually want. A 3-sentence requirement consistently outperforms a 1-sentence one.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/agents/autogen')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> AutoGen
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/agents/openclaw')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            OpenClaw <ChevronRight size={14} />
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
