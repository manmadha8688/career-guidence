import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import {
  Sun, Moon, X,
  TrendingUp, MessageCircle, Building2, BookOpen,
  Cpu, Bot, FolderGit2, Brain, Target,
  AlertTriangle, Map, Rocket, ArrowRight,
  CheckCircle, Code2, Briefcase, Server,
  Zap, GraduationCap, Swords, ChevronRight,
} from 'lucide-react'

// ─── Section Data ─────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: 1, icon: TrendingUp, color: '#EF4444', bg: 'rgba(239,68,68,0.09)',
    title: 'Present IT Market Situation',
    brief: 'Market is competitive — but the real problem is the skills gap, not a job gap.',
    content: 'Today\'s IT market is more competitive than before. Many students are applying for the same jobs, and companies have many options to choose from.\n\nBecause of AI and automation, companies are not expecting freshers to know everything. But they do expect freshers to understand technical concepts clearly.\n\nCompanies are not looking only for certificates or copied projects. They want students who can explain what they learned, how they built something, and how they solve problems.\n\nThe main problem is not always lack of jobs. The problem is lack of matching skills.',
    keyPoints: [
      'Market is competitive, but not closed',
      'Companies want concept clarity, not just certificates',
      'Skills gap — not job gap — is the real issue',
      'AI changed expectations, not eliminated opportunities',
    ],
  },
  {
    id: 2, icon: MessageCircle, color: '#3B82F6', bg: 'rgba(59,130,246,0.09)',
    title: 'What Students Are Thinking',
    brief: 'Most fears freshers have about the market are misunderstandings — not reality.',
    content: 'Many students are thinking:\n• "There is no hiring."\n• "Placements are not happening."\n• "Freshers don\'t have opportunities."\n• "AI will replace jobs."\n• "I need to master everything before applying."\n\nBut this thinking is not completely correct.\n\nThere are opportunities, but students need to prepare in the right way. Instead of learning randomly, students need structured learning, strong basics, real-world projects, and interview preparation.\n\nStudents should not compare themselves with others. Focus on improving step by step.',
    keyPoints: [
      '"No hiring" is a myth — there is a skills mismatch',
      'Structured learning beats random tutorial watching',
      'Stop waiting for "perfect knowledge" to apply',
      'This platform exists to bridge exactly this gap',
    ],
    highlight: 'This platform exists to give you the structured path from confusion to job-ready.',
    highlightColor: '#3B82F6',
  },
  {
    id: 3, icon: Building2, color: '#8B5CF6', bg: 'rgba(139,92,246,0.09)',
    title: 'What Companies Expect',
    brief: 'Companies don\'t expect everything — but they expect you to think clearly.',
    content: 'Companies do not expect freshers to know everything like experienced developers.\n\nBut they do expect:\n• Strong fundamentals\n• Basic to intermediate technical knowledge\n• Problem-solving ability\n• Clear understanding of your own projects\n• Communication skills\n• Willingness to learn\n• Ability to use tools and AI properly\n• Basic knowledge of real-world development\n\nFor example, if a student says they know React, Java, Python, or SQL — they should be able to explain basic concepts and apply them.\n\nKnowing only definitions is not enough. Students should know how to apply concepts.',
    keyPoints: [
      'Strong fundamentals over a wide but shallow skillset',
      'Can you explain your own project clearly?',
      'Willingness to learn matters as much as current knowledge',
      'Applying concepts beats memorising definitions',
    ],
  },
  {
    id: 4, icon: BookOpen, color: '#10B981', bg: 'rgba(16,185,129,0.09)',
    title: 'Importance of Fundamentals',
    brief: 'One strong foundation beats ten half-learned technologies.',
    content: 'Students do not need to master every skill in the beginning.\n\nFirst, they should become strong in fundamentals.\n\nImportant fundamentals include:\n• Programming basics — variables, loops, functions\n• Data structures basics\n• Object-oriented programming\n• Database basics (SQL + NoSQL)\n• Web basics (HTTP, request/response)\n• Git and GitHub\n• APIs (REST)\n• Debugging mindset\n• Problem-solving approach\n\nIf fundamentals are strong, learning any new technology becomes easier.\n\nDo not run behind too many technologies at once. First understand one skill properly, then slowly expand.',
    keyPoints: [
      'Strong fundamentals = learn any technology faster',
      'One skill done well beats three skills half-done',
      'Git + GitHub + APIs are non-negotiable basics',
      'OOP + DSA basics open most interview doors',
    ],
  },
  {
    id: 5, icon: Cpu, color: '#06B6D4', bg: 'rgba(6,182,212,0.09)',
    title: 'AI in Today\'s IT Market',
    brief: 'AI won\'t replace you — but someone using AI right will do the work of three people.',
    content: 'AI is now part of the software industry. Students should not fear AI. They should learn how to use AI smartly.\n\nAI can help with:\n• Understanding concepts faster\n• Writing sample code\n• Debugging errors\n• Generating project ideas\n• Explaining difficult topics\n• Improving resumes\n• Practising mock interviews\n\nBut AI is not always correct. AI can make mistakes — wrong code, wrong logic, incomplete answers.\n\nThat is why students should learn the concept first, then use AI as a helper.\n\nAI should be used like an assistant, not like a replacement for your brain.',
    keyPoints: [
      'AI is a tool — learn to wield it, not fear it',
      'AI makes mistakes — you need knowledge to verify',
      'Use AI to learn faster, not to skip learning',
      'The real skill is knowing how to instruct AI correctly',
    ],
    highlight: 'AI cannot replace humans — but a human with the right skills can replace multiple humans.',
    highlightColor: '#06B6D4',
  },
  {
    id: 6, icon: Bot, color: '#F59E0B', bg: 'rgba(245,158,11,0.09)',
    title: 'How to Use AI Correctly',
    brief: 'There is a big difference between prompting AI and instructing AI intelligently.',
    content: 'Students should use AI in this way:\n\n1. First understand the concept yourself.\n2. Try to solve the problem on your own.\n3. Use AI when you are stuck.\n4. Ask AI to explain step by step.\n5. Check whether the answer is correct.\n6. Modify the answer based on your understanding.\n7. Learn from the process.\n\nWRONG way:\n"AI, give me full project code."\n\nRIGHT way:\n"I am building a student task management app. I completed login and dashboard. Now I want to add task filtering. Explain the logic and give me a simple approach."\n\nAI works better when you give clear context and instructions.',
    keyPoints: [
      'We should instruct AI, not just prompt AI',
      'Context-rich questions get far better AI answers',
      'Verify every AI output — especially code',
      'AI assistance + your understanding = unstoppable combination',
    ],
  },
  {
    id: 7, icon: FolderGit2, color: '#F97316', bg: 'rgba(249,115,22,0.09)',
    title: 'Real-World Projects',
    brief: 'Projects are proof that you can actually build something — not just talk about it.',
    content: 'Only learning theory is not enough.\n\nStudents should build real-world projects because projects show practical skills.\n\nA good project proves that the student can:\n• Understand requirements\n• Design a solution\n• Write real code\n• Use a database\n• Connect frontend and backend\n• Fix bugs and errors\n• Deploy the project\n• Explain the project in interviews\n\nProject ideas:\n• Portfolio website\n• Student notes app\n• Resume builder\n• Job application tracker\n• Expense tracker\n• Quiz application\n• Task management app\n• College event management system\n• Full-stack blog\n\nDo not just copy projects. Understand them. Add your own features. Be able to explain every part.',
    keyPoints: [
      'At least 2–3 deployed projects on GitHub',
      'Can you explain every line you wrote? You should.',
      'Add your own feature to every tutorial project you follow',
      'Deployment = extra points in every interview',
    ],
  },
  {
    id: 8, icon: Brain, color: '#EC4899', bg: 'rgba(236,72,153,0.09)',
    title: 'Problem Solving vs Technical',
    brief: 'Different companies test differently — prepare both and never be closed out.',
    content: 'Different companies hire in different ways.\n\nSome companies focus on technical knowledge:\n• Programming language concepts\n• Database queries\n• Web development\n• Frameworks\n• Projects\n• APIs\n\nSome companies focus on problem-solving:\n• Data structures and algorithms\n• Logical thinking\n• Coding problems\n• Time and space complexity\n• Pattern-based questions\n\nSome companies hire students with good problem-solving skills and train them in required technologies later.\n\nSo students should prepare both:\n• Technical concepts (what you know)\n• Problem-solving skills (how you think)\n\nBoth are important. Neither alone is enough.',
    keyPoints: [
      'Product companies (Google, Amazon) = DSA heavy',
      'Service companies (TCS, Infosys) = technical + project',
      'Startups = can you build and deploy something?',
      'Prepare both — technical depth + logical thinking',
    ],
  },
  {
    id: 9, icon: Target, color: '#22C55E', bg: 'rgba(34,197,94,0.09)',
    title: 'What Freshers Should Focus On',
    brief: 'A clear priority list — so you always know exactly what to do next.',
    content: 'Freshers should focus on these areas in order:\n\n1. One programming language — Java, Python, or JavaScript. Pick one, go deep.\n\n2. Fundamentals — Programming basics, OOP, DBMS, OS basics, networking basics.\n\n3. Web or software development basics — Frontend, backend, database, APIs.\n\n4. Real-world projects — At least 2 to 3 good, complete, deployed projects.\n\n5. GitHub and portfolio — Upload projects with good README files.\n\n6. Resume preparation — Simple, clean, project-focused. No fluff.\n\n7. Interview preparation — Technical questions, HR questions, project walkthroughs.\n\n8. AI usage — Use AI to learn faster, but always verify what it gives you.',
    keyPoints: [
      '1 language done well > 5 languages half-done',
      'GitHub with real projects = your visible portfolio to companies',
      'Projects on resume without explanation = red flag in interviews',
      'Interview prep is a skill — practise it, do not just hope for it',
    ],
  },
  {
    id: 10, icon: AlertTriangle, color: '#EF4444', bg: 'rgba(239,68,68,0.09)',
    title: 'Common Mistakes to Avoid',
    brief: 'Recognise these mistakes now — so you stop making them today.',
    content: 'Many students make these mistakes:\n\n• Learning randomly without a roadmap\n• Watching tutorials but not writing code\n• Copying projects without understanding them\n• Depending completely on AI for answers\n• Ignoring fundamentals and jumping to frameworks\n• Not using GitHub\n• Not building real projects\n• Not preparing for interviews until it is too late\n• Waiting for "perfect knowledge" before applying\n• Comparing themselves with others and losing confidence\n• Learning 10 technologies surface-level instead of 2 deeply',
    keyPoints: [
      'Tutorial hell is real — build things, do not just watch',
      'AI dependency without understanding = disaster in interviews',
      'Frameworks without fundamentals = a shaky, falling foundation',
      'Progress > perfection. Apply before you feel ready.',
    ],
  },
  {
    id: 11, icon: Map, color: '#6366F1', bg: 'rgba(99,102,241,0.09)',
    title: 'Structured Learning Is the Answer',
    brief: 'Confusion comes from not knowing where to start. A roadmap fixes that completely.',
    content: 'Many students are confused because they do not know:\n• Where to start\n• What to learn first\n• Which skill is actually useful\n• How to build projects\n• How to prepare for jobs\n• How to use AI correctly\n• How to become industry-ready\n\nA structured learning platform helps students step by step.\n\nThe learning path should be:\n1. Understand career options\n2. Learn fundamentals\n3. Learn one technical skill\n4. Practice small tasks\n5. Build real-world projects\n6. Use AI as a learning assistant\n7. Prepare resume and GitHub\n8. Practice interviews\n9. Apply for internships and jobs\n\nFollow this path. Do not skip steps.',
    keyPoints: [
      'Confusion = missing roadmap. Roadmap = complete clarity.',
      'This platform follows exactly this structured path',
      'Each step builds on the previous — do not skip any',
      'Internship applications should happen at step 8–9, not step 2',
    ],
  },
  {
    id: 12, icon: Rocket, color: '#F59E0B', bg: 'rgba(245,158,11,0.09)',
    title: 'Final Message',
    brief: 'The IT market is tough but not closed. Your preparation is what opens the door.',
    content: 'The IT market is tough, but it is not closed.\n\nFreshers still have opportunities if they prepare properly.\n\nDo not think there is no hiring. Think about how to improve your skills to match company expectations.\n\nYou do not need to master everything at once. Start with fundamentals. Build projects. Learn how to solve problems. Use AI wisely.\n\nAI can help you — but your understanding is more important.\n\nIf you know the concept, you can use AI better.\nIf you do not know the concept, you cannot correct AI mistakes.\n\nSo learn step by step. Build consistently. Improve every day.\n\nEven if one student gets clarity and starts learning in the right direction, this effort is worth it.\n\nStart today.',
    keyPoints: [
      'You do not need to be perfect to start — you start to become better',
      'Every senior developer was once a confused fresher',
      'Build in public. Learn in public. Grow in public.',
      'One step every day beats one big leap every month',
    ],
    highlight: 'The market does not need perfect freshers. It needs freshers who are willing to learn, build, and grow.',
    highlightColor: '#F59E0B',
  },
]

const HIRING_TYPES = [
  {
    icon: Code2, color: '#6366F1', bg: 'rgba(99,102,241,0.09)',
    type: 'Product Companies', examples: 'Google, Amazon, Microsoft, Flipkart',
    focus: 'DSA Heavy',
    rounds: ['Online Coding Test', 'DSA Rounds (2–3)', 'System Design', 'HR Round'],
    tip: 'Practice LeetCode, GeeksForGeeks. Focus on arrays, trees, graphs, dynamic programming.',
  },
  {
    icon: Server, color: '#10B981', bg: 'rgba(16,185,129,0.09)',
    type: 'Service Companies', examples: 'TCS, Infosys, Wipro, Cognizant, Capgemini',
    focus: 'Technical + Aptitude',
    rounds: ['Aptitude Test', 'Technical Round', 'HR Round'],
    tip: 'Focus on verbal, logical reasoning, basic programming, DBMS, OS, and project explanation.',
  },
  {
    icon: Zap, color: '#F97316', bg: 'rgba(249,115,22,0.09)',
    type: 'Startups', examples: 'Early-stage and growth-stage product startups',
    focus: 'Project + Practical',
    rounds: ['Resume Shortlisting', 'Take-home Assignment', 'Technical Interview', 'Culture Fit'],
    tip: 'Show deployed projects. Show GitHub activity. They want to see you can build, not just recite.',
  },
  {
    icon: Briefcase, color: '#EC4899', bg: 'rgba(236,72,153,0.09)',
    type: 'MAANG / Dream Companies', examples: 'Meta, Apple, Amazon, Netflix, Google',
    focus: 'Highly Competitive DSA',
    rounds: ['Online Assessment', 'Phone Screen', 'Multiple DSA Rounds', 'Behavioural', 'Bar Raiser'],
    tip: 'Needs 6–12 months of dedicated DSA prep. Focus on optimal solutions, not just working code.',
  },
  {
    icon: GraduationCap, color: '#06B6D4', bg: 'rgba(6,182,212,0.09)',
    type: 'Campus / Mass Recruitment', examples: 'Campus drives, job fairs, hackathons',
    focus: 'Aptitude + Basic Technical',
    rounds: ['Group Discussion', 'Aptitude Exam', 'Technical Round', 'HR Round'],
    tip: 'Strong verbal and quant skills help. Be confident in explaining your resume. Projects matter.',
  },
]

// ─── Section Modal ────────────────────────────────────────────────────────────

function SectionModal({ section, onClose, light }) {
  const Icon = section.icon

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [])

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div style={{
        background: light ? '#ffffff' : '#0D1424',
        border: `1px solid ${section.color}40`,
        borderTop: `4px solid ${section.color}`,
        borderRadius: 18, width: '100%', maxWidth: 620,
        maxHeight: '88vh', display: 'flex', flexDirection: 'column',
        boxShadow: `0 24px 80px ${section.color}18, 0 8px 40px rgba(0,0,0,0.5)`,
        animation: 'modalIn 0.2s ease',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: '1rem',
          padding: '1.5rem 1.5rem 1.25rem', flexShrink: 0,
          borderBottom: `1px solid ${light ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.06)'}`,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14, flexShrink: 0,
            background: section.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={24} color={section.color} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{
              fontFamily: "'Rajdhani', sans-serif", fontWeight: 800,
              fontSize: '1.3rem', color: light ? '#0F172A' : '#F1F5F9',
              margin: 0, lineHeight: 1.25,
            }}>
              {section.title}
            </h2>
          </div>
          <button onClick={onClose} style={{
            background: light ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.06)',
            border: 'none', borderRadius: 8, width: 34, height: 34,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: light ? '#64748B' : '#64748B', flexShrink: 0,
            transition: 'background 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = section.bg}
            onMouseLeave={e => e.currentTarget.style.background = light ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.06)'}
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '1.25rem 1.5rem 1.5rem' }}>

          {/* Highlight quote */}
          {section.highlight && (
            <div style={{
              margin: '0 0 1.125rem',
              padding: '0.875rem 1.125rem',
              borderRadius: 10,
              background: `${section.highlightColor || section.color}10`,
              borderLeft: `3px solid ${section.highlightColor || section.color}`,
            }}>
              <p style={{
                fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
                fontSize: '0.95rem', color: section.highlightColor || section.color,
                margin: 0, lineHeight: 1.55,
              }}>
                ❝ {section.highlight} ❞
              </p>
            </div>
          )}

          {/* Content */}
          <div style={{ marginBottom: '1.25rem' }}>
            {section.content.split('\n').map((line, i) => {
              if (!line.trim()) return <div key={i} style={{ height: '0.4rem' }} />
              return (
                <p key={i} style={{
                  fontSize: '0.875rem',
                  color: light ? '#374151' : '#94A3B8',
                  lineHeight: 1.8, margin: '0.1rem 0',
                }}>
                  {line}
                </p>
              )
            })}
          </div>

          {/* Key Takeaways */}
          <div style={{
            background: light ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${light ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)'}`,
            borderRadius: 12, padding: '1rem 1.125rem',
          }}>
            <div style={{
              fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem',
              letterSpacing: '0.12em', color: section.color,
              textTransform: 'uppercase', marginBottom: '0.75rem',
            }}>
              Key Takeaways
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {section.keyPoints.map((pt, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                  <CheckCircle size={14} color={section.color} style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontSize: '0.83rem', color: light ? '#374151' : '#94A3B8', lineHeight: 1.55 }}>
                    {pt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Section Grid Card ────────────────────────────────────────────────────────

function SectionGridCard({ section, onClick, light }) {
  const Icon = section.icon
  return (
    <div
      onClick={onClick}
      style={{
        background: light ? '#ffffff' : '#0D1424',
        border: `1px solid ${light ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 14, padding: '1.25rem',
        cursor: 'pointer',
        transition: 'transform 0.15s, box-shadow 0.15s, border-color 0.15s',
        display: 'flex', flexDirection: 'column', gap: '0.75rem',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = `0 8px 28px ${section.color}20`
        e.currentTarget.style.borderColor = `${section.color}50`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = light ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.06)'
      }}
    >
      {/* Icon */}
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: section.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={20} color={section.color} />
      </div>

      {/* Title */}
      <div style={{
        fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
        fontSize: '0.95rem', color: light ? '#0F172A' : '#E2E8F0',
        lineHeight: 1.3,
      }}>
        {section.title}
      </div>

      {/* Brief */}
      <div style={{
        fontSize: '0.78rem', color: light ? '#64748B' : '#64748B',
        lineHeight: 1.6, flex: 1,
      }}>
        {section.brief}
      </div>

      {/* Read more */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.25rem',
        fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem',
        color: section.color, letterSpacing: '0.06em', marginTop: 'auto',
      }}>
        READ MORE <ChevronRight size={13} />
      </div>
    </div>
  )
}

// ─── Hiring Card ──────────────────────────────────────────────────────────────

function HiringCard({ h, light }) {
  const Icon = h.icon
  return (
    <div style={{
      background: light ? '#ffffff' : '#0D1424',
      border: `1px solid ${light ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.06)'}`,
      borderTop: `3px solid ${h.color}`,
      borderRadius: 14, padding: '1.25rem',
      transition: 'transform 0.15s, box-shadow 0.15s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 6px 24px ${h.color}18` }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: h.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={20} color={h.color} />
        </div>
        <div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: light ? '#0F172A' : '#E2E8F0' }}>
            {h.type}
          </div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: h.color, letterSpacing: '0.06em' }}>
            {h.focus}
          </div>
        </div>
      </div>

      <div style={{ fontSize: '0.73rem', color: light ? '#94A3B8' : '#475569', marginBottom: '0.875rem', fontStyle: 'italic' }}>
        {h.examples}
      </div>

      <div style={{ marginBottom: '0.875rem' }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.56rem', letterSpacing: '0.1em', color: light ? '#94A3B8' : '#475569', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
          Typical Rounds
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.28rem' }}>
          {h.rounds.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: h.bg, border: `1.5px solid ${h.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: h.color, fontWeight: 700 }}>{i + 1}</span>
              </div>
              <span style={{ fontSize: '0.77rem', color: light ? '#374151' : '#94A3B8' }}>{r}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        padding: '0.6rem 0.75rem', borderRadius: 8,
        background: light ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${light ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)'}`,
      }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.56rem', color: h.color, letterSpacing: '0.08em', marginBottom: '0.2rem' }}>💡 TIP</div>
        <p style={{ fontSize: '0.76rem', color: light ? '#374151' : '#94A3B8', margin: 0, lineHeight: 1.55 }}>{h.tip}</p>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function FresherInstructionsPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const light = theme === 'light'
  const [activeSection, setActiveSection] = useState(null)

  const bg = light ? '#F1F5F9' : '#060D1A'

  return (
    <div style={{ minHeight: '100vh', background: bg, fontFamily: "'Rajdhani', sans-serif", color: light ? '#1A1A2E' : '#E2E8F0', overflowX: 'hidden' }}>

      {/* ── Nav ──────────────────────────────────────────────── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.25rem', height: 52,
        background: light ? 'rgba(241,245,249,0.97)' : 'rgba(6,13,26,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${light ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.05)'}`,
      }}>
        <button onClick={() => navigate('/')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          fontFamily: "'Orbitron', sans-serif", fontWeight: 900,
          fontSize: '0.72rem', letterSpacing: '0.1em', color: '#9B6ED4', padding: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          LearnToEarn
        </button>

        <span className="fi-nav-center" style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: '0.65rem', fontWeight: 700,
          letterSpacing: '0.14em', color: light ? '#1A1A2E' : '#CBD5E1',
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        }}>
          FRESHER GUIDE
        </span>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button onClick={toggleTheme} style={{
            background: 'none', border: `1px solid ${light ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: 6, width: 32, height: 32, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B',
          }}>
            {light ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <button onClick={() => navigate('/skill-arena/dashboard')} style={{
            background: 'rgba(155,110,212,0.1)', border: '1px solid rgba(155,110,212,0.4)',
            borderRadius: 6, padding: '0.25rem 0.65rem', cursor: 'pointer',
            fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem',
            letterSpacing: '0.07em', color: '#9B6ED4',
          }}>
            ⚔ SKILL ARENA
          </button>
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', padding: 'clamp(3rem,7vw,5rem) 1.5rem clamp(2rem,4vw,3rem)', maxWidth: 760, margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.35rem 1rem', borderRadius: 999,
          background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.28)',
          fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem',
          fontWeight: 700, color: '#6366F1', letterSpacing: '0.08em', marginBottom: '1.75rem',
        }}>
          <GraduationCap size={14} /> FOR FRESHERS ENTERING IT
        </div>

        <h1 style={{
          fontSize: 'clamp(1.8rem,5vw,3rem)', fontWeight: 900,
          letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 1.25rem',
          color: light ? '#0F172A' : '#F1F5F9',
        }}>
          The IT Market Reality<br />
          <span style={{
            background: 'linear-gradient(135deg, #6366F1, #9B6ED4, #EC4899)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Every Fresher Must Know
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(0.9rem,2vw,1.05rem)', color: light ? '#475569' : '#94A3B8',
          lineHeight: 1.8, maxWidth: 560, margin: '0 auto 2rem',
        }}>
          Many freshers feel lost about the IT job market. This guide covers the real situation,
          what companies expect, how to use AI correctly, and how to prepare — step by step.
          Click any card to read the full section.
        </p>

        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px',
          background: light ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)',
          borderRadius: 14, overflow: 'hidden', maxWidth: 460, margin: '0 auto',
        }}>
          {[['12', 'Key Sections'], ['5', 'Hiring Paths'], ['∞', 'Your Potential']].map(([v, l], i) => (
            <div key={i} style={{ textAlign: 'center', padding: '1rem 0.5rem', background: light ? 'rgba(255,255,255,0.8)' : 'rgba(13,20,36,0.8)' }}>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '1.4rem', color: '#6366F1', marginBottom: '0.15rem' }}>{v}</div>
              <div style={{ fontSize: 'clamp(0.62rem,1.5vw,0.72rem)', color: '#64748B' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── AI Banner ─────────────────────────────────────────── */}
      <div style={{ maxWidth: 920, margin: '0 auto 2.5rem', padding: '0 1.25rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(99,102,241,0.07))',
          border: '1px solid rgba(6,182,212,0.22)', borderRadius: 14,
          padding: '1.125rem 1.375rem',
          display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
        }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(6,182,212,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Cpu size={20} color="#06B6D4" />
          </div>
          <p style={{ flex: 1, margin: 0, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#06B6D4', lineHeight: 1.5 }}>
            AI cannot replace humans — but a human with the right skills can replace multiple humans.
          </p>
        </div>
      </div>

      {/* ── Section Grid ──────────────────────────────────────── */}
      <div style={{ maxWidth: 920, margin: '0 auto', padding: '0 1.25rem 4rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 800, fontSize: '1.25rem', color: light ? '#0F172A' : '#F1F5F9', margin: '0 0 0.25rem' }}>
            12 Things Every Fresher Must Understand
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0 }}>
            Click any card to read the full section
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))',
          gap: '1rem',
        }}>
          {SECTIONS.map(section => (
            <SectionGridCard
              key={section.id}
              section={section}
              onClick={() => setActiveSection(section)}
              light={light}
            />
          ))}
        </div>
      </div>

      {/* ── Hiring Process ────────────────────────────────────── */}
      <div style={{
        padding: '3.5rem 1.25rem',
        background: light ? 'rgba(99,102,241,0.03)' : 'rgba(99,102,241,0.04)',
        borderTop: `1px solid ${light ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)'}`,
        borderBottom: `1px solid ${light ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)'}`,
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.12em', color: '#6366F1', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              How Companies Actually Hire
            </div>
            <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem,3.5vw,2rem)', color: light ? '#0F172A' : '#F1F5F9', margin: '0 0 0.5rem' }}>
              Know the Hiring Process Before You Apply
            </h2>
            <p style={{ fontSize: '0.875rem', color: light ? '#475569' : '#94A3B8', maxWidth: 500, margin: 0, lineHeight: 1.7 }}>
              Different companies hire very differently. Understanding each path helps you prepare the right way for the right company.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px,100%), 1fr))', gap: '1rem' }}>
            {HIRING_TYPES.map((h, i) => <HiringCard key={i} h={h} light={light} />)}
          </div>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <div style={{ padding: '3.5rem 1.5rem 5rem', textAlign: 'center' }}>
        <div style={{
          maxWidth: 640, margin: '0 auto',
          background: light ? 'linear-gradient(135deg, rgba(99,102,241,0.07), rgba(155,110,212,0.05))' : 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(155,110,212,0.07))',
          border: '1px solid rgba(99,102,241,0.22)', borderRadius: 20,
          padding: 'clamp(1.75rem,4vw,3rem)',
        }}>
          <div style={{ fontSize: '2.25rem', marginBottom: '0.875rem' }}>🚀</div>
          <h2 style={{ fontSize: 'clamp(1.3rem,3.5vw,1.75rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 0.875rem', color: light ? '#0F172A' : '#F1F5F9' }}>
            Ready to Start Your Structured Journey?
          </h2>
          <p style={{ fontSize: '0.9rem', color: light ? '#475569' : '#94A3B8', lineHeight: 1.8, margin: '0 0 1.75rem' }}>
            This platform is built exactly for what this guide describes — structured learning from zero to job-ready, with roadmaps, quizzes, projects, and problem solving.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/skill-arena/dashboard')} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'linear-gradient(135deg, #6366F1, #9B6ED4)', border: 'none',
              borderRadius: 10, padding: '0.7rem 1.5rem',
              color: '#fff', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(99,102,241,0.4)', transition: 'transform 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              <Swords size={15} /> Start Learning — Free
            </button>
            <button onClick={() => navigate('/problem-solving')} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'transparent', border: '1px solid rgba(99,102,241,0.35)',
              borderRadius: 10, padding: '0.7rem 1.25rem',
              color: '#6366F1', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              💻 Start Coding Practice <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ marginTop: '1.75rem', display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Structured Roadmaps', 'Real Projects', 'Problem Solving', 'Interview Prep'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#64748B' }}>
                <CheckCircle size={13} color="#22C55E" /> {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Modal ─────────────────────────────────────────────── */}
      {activeSection && (
        <SectionModal
          section={activeSection}
          onClose={() => setActiveSection(null)}
          light={light}
        />
      )}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.94) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @media (max-width: 480px) {
          .fi-nav-center { display: none !important; }
        }
      `}</style>
    </div>
  )
}
