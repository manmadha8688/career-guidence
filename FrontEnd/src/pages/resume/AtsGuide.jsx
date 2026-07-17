import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  ScanLine, Bot, Columns3, Table, Image as ImageIcon, KeyRound, Target,
  Building2, ShieldCheck, Wrench, ListChecks, FileText,
  Mail, GraduationCap, FolderGit2, BadgeCheck, Search, CheckCircle2, XCircle,
  AlertTriangle, Info, ChevronRight, Gauge, User, Sparkles, ExternalLink,
} from 'lucide-react'
import '../../styles/pages/ats-guide.css'

const EASE = [0.16, 1, 0.3, 1]

const SECTIONS = [
  { id: 'what',     n: '01', label: 'What is ATS' },
  { id: 'fail',     n: '02', label: 'Why creative fails' },
  { id: 'friendly', n: '03', label: 'The safe format' },
  { id: 'keywords', n: '04', label: 'Keywords' },
  { id: 'sections', n: '05', label: 'Section by section' },
  { id: 'india',    n: '06', label: 'Indian IT companies' },
  { id: 'truth',    n: '07', label: 'The honest truth' },
  { id: 'checklist',n: '08', label: 'Pre-apply checklist' },
  { id: 'tools',    n: '09', label: 'Free ATS tools' },
  { id: 'mistakes', n: '10', label: 'Top 10 mistakes' },
]

/* Small scroll-reveal wrapper */
function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

function SectionHead({ n, kicker, title, children }) {
  return (
    <Reveal className="ats-sec__head">
      <span className="ats-sec__n">{n}</span>
      <div>
        {kicker && <span className="ats-sec__kicker">{kicker}</span>}
        <h2 className="ats-sec__title">{title}</h2>
        {children && <p className="ats-sec__lead">{children}</p>}
      </div>
    </Reveal>
  )
}

export default function AtsGuide() {
  const [active, setActive] = useState(SECTIONS[0].id)
  const rootRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="ats" ref={rootRef}>
      {/* ── Hero ── */}
      <motion.section
        className="ats-hero"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="ats-hero__text">
          <span className="ats-badge"><Bot size={14} /> A machine reads first</span>
          <h1 className="ats-hero__title">ATS, <span className="ats-hi">decoded</span>.</h1>
          <p className="ats-hero__lead">
            Before a recruiter ever sees your resume, software scans it. If that software can’t read
            your resume, you’re out — no matter how talented you are. Here’s exactly how it works, and
            how to build a resume that sails through, in plain language for first-time job seekers.
          </p>
          <div className="ats-hero__chips">
            <span className="ats-chip"><ScanLine size={13} /> Parsed in seconds</span>
            <span className="ats-chip"><KeyRound size={13} /> Ranked by keywords</span>
            <span className="ats-chip"><FileText size={13} /> One clean page</span>
          </div>
        </div>

        {/* Animated scanner mock — centered between the copy and the score */}
        <div className="ats-hero__scan" aria-hidden="true">
          <div className="ats-scanpaper">
            <span className="ats-scanpaper__line ats-scanpaper__line--title" />
            <span className="ats-scanpaper__line w80" />
            <span className="ats-scanpaper__line w60" />
            <span className="ats-scanpaper__line" />
            <span className="ats-scanpaper__line w90" />
            <span className="ats-scanpaper__line w40" />
            <span className="ats-scanpaper__line w70" />
            <span className="ats-scanpaper__beam" />
          </div>
        </div>

        {/* Score — far right */}
        <div className="ats-hero__score" aria-hidden="true">
          <ScoreRing value={92} />
        </div>
      </motion.section>

      {/* ── Body: sticky TOC + content ── */}
      <div className="ats-body">
        <aside className="ats-toc">
          <span className="ats-toc__label">On this page</span>
          <nav>
            {SECTIONS.map(s => (
              <button
                key={s.id}
                className={`ats-toc__item${active === s.id ? ' is-active' : ''}`}
                onClick={() => jump(s.id)}
              >
                <span className="ats-toc__n">{s.n}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="ats-content">

          {/* 01 — What is ATS */}
          <section id="what" className="ats-sec">
            <SectionHead n="01" kicker="The basics" title="What is an ATS?">
              ATS stands for <strong>Applicant Tracking System</strong> — the software companies use to
              collect and read every resume that comes in.
            </SectionHead>
            <div className="ats-grid-2">
              <Reveal className="ats-card">
                <h3 className="ats-card__h"><Bot size={17} /> How it reads your resume</h3>
                <ol className="ats-steps">
                  <li>You upload a file (PDF or Word).</li>
                  <li>The ATS opens it and tries to pull out your <strong>name, contact, skills, education, projects and experience</strong>.</li>
                  <li>It drops each piece into a database — like filling a form automatically.</li>
                  <li>Recruiters then <strong>search and filter</strong> that database by keywords (e.g. “React”, “Java”, “2025 batch”).</li>
                </ol>
                <p className="ats-note"><Info size={14} /> If your details land in the wrong box — or don’t get read at all — you simply won’t show up in their search.</p>
              </Reveal>

              <Reveal className="ats-vs" delay={0.08}>
                <div className="ats-vs__col ats-vs__col--bad">
                  <span className="ats-vs__tag ats-vs__tag--bad"><XCircle size={13} /> Creative resume, as the ATS reads it</span>
                  <pre className="ats-parse">{`NAME  ????
Skills  Experience  Java  2025
Python  TCS  React  Projects
Email  ▢  Phone  ▢  (in header — lost)`}</pre>
                </div>
                <div className="ats-vs__col ats-vs__col--good">
                  <span className="ats-vs__tag ats-vs__tag--good"><CheckCircle2 size={13} /> Clean resume, as the ATS reads it</span>
                  <pre className="ats-parse">{`Name: Aarav Sharma
Email: aarav@email.com | Phone: 98765 43210
Skills: Java, Python, React
Education: B.Tech CSE, 2025`}</pre>
                </div>
              </Reveal>
            </div>
          </section>

          {/* 02 — Why creative templates fail */}
          <section id="fail" className="ats-sec">
            <SectionHead n="02" kicker="The trap" title="Why creative templates fail">
              Those beautiful two-column templates on Canva look great to <em>you</em>. To a parser, they
              often turn into scrambled nonsense. Here’s what actually happens.
            </SectionHead>

            <div className="ats-fail-grid">
              {[
                { Icon: Columns3, t: 'Two-column layout', you: 'Skills on the left, experience on the right — looks tidy.', ats: 'Reads left-to-right across both columns and blends them into one jumbled stream. Your job dates end up next to random skills.' },
                { Icon: Table, t: 'Tables for skills', you: 'A neat grid of skills and ratings.', ats: 'Many parsers read cells in the wrong order or skip them entirely — your skills can vanish completely.' },
                { Icon: ImageIcon, t: 'Icons & images', you: '📧 email · 📱 phone · skill bars & logos.', ats: 'Images aren’t text, so they’re ignored. If an icon replaced the word “Email”, the context is gone.' },
                { Icon: FileText, t: 'Header / footer contact', you: 'Name, email and phone placed in the page header.', ats: 'A lot of systems don’t read headers or footers — your contact details get dropped and no one can reach you.' },
                { Icon: Wrench, t: 'Text boxes & shapes', you: 'A “callout” box with your summary or achievements.', ats: 'Text inside boxes is frequently invisible to the parser — that content simply disappears.' },
              ].map((x, i) => {
                const Icon = x.Icon
                return (
                  <Reveal key={i} className="ats-fail" delay={i * 0.05}>
                    <div className="ats-fail__head"><span className="ats-fail__icon"><Icon size={18} /></span>{x.t}</div>
                    <div className="ats-fail__row">
                      <span className="ats-fail__label ats-fail__label--you">You designed</span>
                      <p>{x.you}</p>
                    </div>
                    <div className="ats-fail__row">
                      <span className="ats-fail__label ats-fail__label--ats">ATS reads</span>
                      <p>{x.ats}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </section>

          {/* 03 — ATS-friendly format */}
          <section id="friendly" className="ats-sec">
            <SectionHead n="03" kicker="The safe format" title="What an ATS-friendly resume looks like">
              Boring to the eye is beautiful to the machine. Follow these exact rules and your resume
              parses perfectly every time.
            </SectionHead>
            <div className="ats-rules">
              {[
                { Icon: Columns3, t: 'Single column only', d: 'One column, top to bottom. No side panels, no two-column splits.' },
                { Icon: ListChecks, t: 'Standard headings', d: 'Use exactly: Summary, Skills, Education, Projects, Experience, Certifications.' },
                { Icon: Table, t: 'No tables or columns', d: 'Write plain lines and bullet points instead of grids.' },
                { Icon: ImageIcon, t: 'No icons / images / logos', d: 'No photo, no skill bars, no graphics. Text only.' },
                { Icon: Mail, t: 'Contact in the body', d: 'Put name, email, phone and links in the top lines — never in a header or footer.' },
                { Icon: FileText, t: 'Safe fonts, 10–12 pt', d: 'Calibri, Arial, Times New Roman or Georgia. Nothing decorative.' },
                { Icon: ShieldCheck, t: 'PDF, named simply', d: 'Export as PDF (use DOCX only if the portal demands it). Name it FirstName_LastName.pdf.' },
                { Icon: Gauge, t: 'Spacing & margins', d: 'Line spacing 1.0–1.15, margins 0.7"–1". Keep it to ONE page as a fresher.' },
              ].map((x, i) => {
                const Icon = x.Icon
                return (
                  <Reveal key={i} className="ats-rule" delay={i * 0.04}>
                    <span className="ats-rule__icon"><Icon size={18} /></span>
                    <div>
                      <div className="ats-rule__t">{x.t}</div>
                      <div className="ats-rule__d">{x.d}</div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </section>

          {/* 04 — Keywords */}
          <section id="keywords" className="ats-sec">
            <SectionHead n="04" kicker="The most important part" title="Keywords win or lose the game">
              The ATS ranks you by how well your resume matches the job description. Keywords are how it
              measures that match.
            </SectionHead>
            <div className="ats-grid-2">
              <Reveal className="ats-card">
                <h3 className="ats-card__h"><Search size={17} /> Find the right keywords</h3>
                <ul className="ats-ul">
                  <li>Open the <strong>job description</strong> and highlight every hard skill, tool, and the exact role title (e.g. “React”, “SQL”, “Full Stack Developer”).</li>
                  <li>Write them <strong>exactly as the company wrote them</strong> — “JavaScript”, not “JS”.</li>
                  <li>Place them in your <strong>Skills</strong> and <strong>Summary</strong>, and prove them inside your <strong>Project/Experience bullets</strong>.</li>
                  <li>Use each important keyword <strong>1–3 times</strong>, only where it’s genuinely true.</li>
                </ul>
                <p className="ats-note ats-note--warn"><AlertTriangle size={14} /> <strong>Keyword stuffing</strong> — pasting 30 keywords or hiding white text — fails. Modern ATS and humans both catch it, and it looks dishonest.</p>
              </Reveal>

              <Reveal className="ats-card" delay={0.08}>
                <h3 className="ats-card__h"><Target size={17} /> How the ATS scores you</h3>
                <p className="ats-card__p">It compares your resume text against the job description and produces a <strong>match score</strong>. Missing key terms → lower rank → you appear further down the recruiter’s list.</p>
                <KeywordMeter />
                <p className="ats-card__p ats-card__p--muted">Same person, same skills — the one that mirrors the job description’s words ranks far higher.</p>
              </Reveal>
            </div>
          </section>

          {/* 05 — Section by section */}
          <section id="sections" className="ats-sec">
            <SectionHead n="05" kicker="Write it right" title="Section-by-section guide">
              Exactly what to put in each part of your resume, what to leave out, and a quick example.
            </SectionHead>
            <div className="ats-sections">
              {SECTION_GUIDE.map((s, i) => {
                const Icon = s.Icon
                return (
                  <Reveal key={i} className="ats-scard" delay={(i % 2) * 0.06}>
                    <div className="ats-scard__head"><span className="ats-scard__icon"><Icon size={18} /></span>{s.name}</div>
                    <div className="ats-scard__grid">
                      <div><span className="ats-scard__lab ats-scard__lab--in">Include</span><p>{s.include}</p></div>
                      <div><span className="ats-scard__lab ats-scard__lab--out">Avoid</span><p>{s.avoid}</p></div>
                    </div>
                    <div className="ats-scard__ex"><span className="ats-scard__exlab">Example</span><code>{s.example}</code></div>
                  </Reveal>
                )
              })}
            </div>
          </section>

          {/* 06 — Indian IT companies */}
          <section id="india" className="ats-sec">
            <SectionHead n="06" kicker="Know your target" title="What Indian IT companies use">
              The big recruiters each run a different ATS, and each is tuned to its own job vocabulary.
              (Systems change — always confirm from the portal URL.)
            </SectionHead>
            <div className="ats-co-grid">
              {COMPANIES.map((c, i) => (
                <Reveal key={i} className="ats-co" delay={(i % 3) * 0.05}>
                  <div className="ats-co__head">
                    <span className="ats-co__name">{c.name}</span>
                    <span className="ats-co__ats">{c.ats}</span>
                  </div>
                  <p className="ats-co__look"><strong>Looks for:</strong> {c.look}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="ats-split">
              <div className="ats-split__col">
                <h4 className="ats-split__t"><GraduationCap size={16} /> Campus / on-campus</h4>
                <p>You apply through your college (TCS NQT, Infosys InfyTQ, Wipro NLTH). A test usually comes first; your resume is still parsed and checked before/at interview. Get the format right so nothing breaks.</p>
              </div>
              <div className="ats-split__col">
                <h4 className="ats-split__t"><Building2 size={16} /> Off-campus</h4>
                <p>You apply on portals (Naukri, LinkedIn, company careers). Here the ATS + recruiter search decide if you even get a test — so <strong>keyword matching matters far more</strong>. Tailor every application.</p>
              </div>
            </Reveal>
          </section>

          {/* 07 — Honest truth */}
          <section id="truth" className="ats-sec">
            <SectionHead n="07" kicker="No myths" title="The honest truth about ATS">
              You’ve probably heard “75% of resumes are rejected by ATS before a human sees them.” That
              number is <strong>disputed and often misquoted</strong>. Here’s what really happens.
            </SectionHead>
            <div className="ats-truth">
              {[
                { Icon: Bot, t: 'ATS mostly ranks — it rarely auto-deletes', d: 'It organizes and orders resumes. At campus scale especially, humans still review most of them.' },
                { Icon: XCircle, t: 'Real reason resumes fail', d: 'Poor keyword matching and formatting that breaks parsing — not a robot silently binning you.' },
                { Icon: CheckCircle2, t: 'What this means for you', d: 'Don’t fear the machine. A clean, single-page, keyword-matched resume passes both the software and the recruiter.' },
              ].map((x, i) => {
                const Icon = x.Icon
                return (
                  <Reveal key={i} className="ats-truth__card" delay={i * 0.06}>
                    <span className="ats-truth__icon"><Icon size={18} /></span>
                    <div className="ats-truth__t">{x.t}</div>
                    <p className="ats-truth__d">{x.d}</p>
                  </Reveal>
                )
              })}
            </div>
          </section>

          {/* 08 — Checklist */}
          <section id="checklist" className="ats-sec">
            <SectionHead n="08" kicker="60-second check" title="Before you hit ‘Apply’">
              Run through this every single time — it takes under a minute and saves you from silent rejections.
            </SectionHead>
            <Reveal className="ats-check">
              {CHECKLIST.map((c, i) => (
                <motion.div
                  key={i}
                  className="ats-check__item"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
                >
                  <span className="ats-check__box"><CheckCircle2 size={16} /></span>
                  <span>{c}</span>
                </motion.div>
              ))}
            </Reveal>
          </section>

          {/* 09 — Free tools */}
          <section id="tools" className="ats-sec">
            <SectionHead n="09" kicker="Test before you send" title="Free tools to check your resume (2026)">
              Paste your resume and the job description; the tool tells you your match score and which
              keywords you’re missing. Add the true ones and re-scan.
            </SectionHead>
            <div className="ats-tools">
              {TOOLS.map((t, i) => (
                <Reveal key={i} className="ats-tool" delay={(i % 3) * 0.05}>
                  <a className="ats-tool__name" href={t.url} target="_blank" rel="noopener noreferrer">
                    {t.name}<ExternalLink size={13} />
                  </a>
                  <div className="ats-tool__free">{t.free}</div>
                  <p className="ats-tool__d">{t.d}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="ats-score-note">
              <Gauge size={18} />
              <span>Aim for <strong>80+</strong>. Below <strong>60</strong> usually means a formatting or keyword problem — fix it before you apply.</span>
            </Reveal>
          </section>

          {/* 10 — Mistakes */}
          <section id="mistakes" className="ats-sec">
            <SectionHead n="10" kicker="Learn from others" title="Top 10 fresher mistakes (and the fix)">
              These are the exact reasons freshers get filtered out — by the machine or by a recruiter in the first 8 seconds.
            </SectionHead>
            <div className="ats-mistakes">
              {MISTAKES.map((m, i) => (
                <Reveal key={i} className="ats-mistake" delay={(i % 2) * 0.05}>
                  <span className="ats-mistake__n">{String(i + 1).padStart(2, '0')}</span>
                  <div className="ats-mistake__body">
                    <div className="ats-mistake__wrong"><XCircle size={14} /> {m.wrong}</div>
                    <div className="ats-mistake__fix"><CheckCircle2 size={14} /> {m.fix}</div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="ats-cta">
              <Sparkles size={18} />
              <div>
                <div className="ats-cta__t">Now build yours the right way</div>
                <div className="ats-cta__d">Switch to the <strong>Builder</strong> tab — it’s already single-column, black-and-white, and ATS-safe by design.</div>
              </div>
              <ChevronRight size={20} className="ats-cta__chev" />
            </Reveal>
          </section>
        </div>
      </div>
    </div>
  )
}

/* ── Animated score ring ── */
function ScoreRing({ value = 90 }) {
  const R = 46
  const C = 2 * Math.PI * R
  const off = C * (1 - value / 100)
  return (
    <div className="ats-ring">
      <svg viewBox="0 0 110 110" className="ats-ring__svg">
        <circle cx="55" cy="55" r={R} className="ats-ring__track" />
        <motion.circle
          cx="55" cy="55" r={R} className="ats-ring__bar"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: off }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
        />
      </svg>
      <div className="ats-ring__label">
        <span className="ats-ring__val">{value}</span>
        <span className="ats-ring__cap">ATS score</span>
      </div>
    </div>
  )
}

/* ── Animated keyword match meter ── */
function KeywordMeter() {
  const rows = [
    { label: 'Generic resume', pct: 38, tone: 'bad' },
    { label: 'Tailored to the job', pct: 88, tone: 'good' },
  ]
  return (
    <div className="ats-meter">
      {rows.map((r, i) => (
        <div key={i} className="ats-meter__row">
          <div className="ats-meter__top"><span>{r.label}</span><span>{r.pct}%</span></div>
          <div className="ats-meter__track">
            <motion.div
              className={`ats-meter__fill ats-meter__fill--${r.tone}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${r.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.15 + i * 0.15 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Data ── */
const SECTION_GUIDE = [
  { Icon: User, name: 'Contact information', include: 'Full name, phone, professional email, LinkedIn, GitHub/portfolio — as plain text lines at the very top.', avoid: 'Photo, date of birth, full home address, or putting any of this in the page header/footer.', example: 'Aarav Sharma | aarav@email.com | 98765 43210 | linkedin.com/in/aarav | github.com/aarav' },
  { Icon: FileText, name: 'Professional summary', include: '3–4 lines: who you are, your core stack, and the role you want. Add a keyword or two from the JD.', avoid: 'Vague filler like “hardworking team player seeking growth”. Say something concrete.', example: 'Final-year CSE student & full-stack developer skilled in React, Django and SQL. Built 3 deployed projects. Seeking a software engineer role.' },
  { Icon: KeyRound, name: 'Skills', include: 'Group by category (Languages, Frontend, Backend, Database, Tools) as plain comma-separated text.', avoid: 'Skill rating bars, star graphics, or a table grid — parsers mangle these.', example: 'Languages: Python, Java · Frontend: HTML, CSS, JavaScript, React · Database: MySQL' },
  { Icon: GraduationCap, name: 'Education', include: 'Degree, branch, college, years, and CGPA/percentage. Newest first.', avoid: 'Every school marksheet detail. Keep 10th/12th to one line each if included.', example: 'B.Tech (CSE), Bapatla Engineering College, 2021–2025 — CGPA 8.2/10' },
  { Icon: FolderGit2, name: 'Projects', include: 'Name, live + GitHub links, and 2–3 bullets: what it does, your stack, and impact. Freshers: this is your strongest section.', avoid: 'Just a title with no link or detail. No “mini project” filler.', example: 'College Portal — React, Django, SQL. Live: college-portal.vercel.app. Role-based dashboards + secure auth.' },
  { Icon: Building2, name: 'Experience (if any)', include: 'Internships/freelance: role, company, dates, and action-verb bullets with numbers.', avoid: '“Responsible for…”. Start with a verb: Built, Automated, Reduced.', example: 'Frontend Intern, Acme (Jun–Aug 2025): Built a dashboard in React that cut reporting time 40%.' },
  { Icon: BadgeCheck, name: 'Certifications', include: 'Certificate name, issuer, and year. Keep it relevant to the role.', avoid: 'Listing 20 random courses. Pick the ones that back your target job.', example: 'Full Stack Web Development — LearnForEarn, 2026' },
]

const COMPANIES = [
  { name: 'TCS', ats: 'NextStep / iBegin (iCIMS)', look: 'Java/Python, SDLC basics, clear skills, CGPA. Correct file naming is parsed too.' },
  { name: 'Infosys', ats: 'Oracle Taleo', look: 'Strict parser — no tables/columns. Wants 8–10 skills, CGPA near the top, strong DSA (InfyTQ).' },
  { name: 'Wipro', ats: 'SAP SuccessFactors', look: 'Cloud/DevOps + core skills; PDF preferred. Also weighs written communication (NLTH).' },
  { name: 'Accenture', ats: 'SAP SuccessFactors', look: 'Both technical and soft/consulting keywords, reflecting its services portfolio.' },
  { name: 'Cognizant', ats: 'Internal portal (Taleo-style)', look: 'GenC hiring keywords: Full Stack, React, cloud, Agile, JIRA. Tailor per role.' },
  { name: 'Amazon India', ats: 'Workday', look: 'Exact keyword match + quantified impact; align bullets to the Leadership Principles.' },
]

const CHECKLIST = [
  'Added the exact keywords from THIS job description',
  'Single column — no tables, no side panels',
  'No icons, images, logos or photo',
  'Contact info is in the body, not the header/footer',
  'Standard section headings used',
  'Saved as PDF, named FirstName_LastName.pdf',
  'Fits on one page',
  'Email and phone number spelled correctly',
  'Ran it through a free ATS checker and scored 80+',
]

const TOOLS = [
  { name: 'Jobscan', url: 'https://www.jobscan.co', free: '5 free scans / month', d: 'Paste resume + JD for a match % and platform-specific parsing (Taleo, Workday, iCIMS…). The gold standard for keyword gaps.' },
  { name: 'Resume Worded', url: 'https://resumeworded.com', free: 'Free instant score', d: '“Score My Resume” gives free, line-by-line feedback on strength, impact and clarity (deep job-match is paid).' },
  { name: 'Teal', url: 'https://www.tealhq.com', free: 'Free — generous', d: 'Free resume builder + job tracker that scores your resume against any job description and flags the missing keywords.' },
  { name: 'Enhancv Resume Checker', url: 'https://enhancv.com/resume-checker', free: 'Free checker', d: 'Upload your resume for a free check across ~20 ATS + content rules (formatting, sections, action verbs, length).' },
  { name: 'Rezi', url: 'https://www.rezi.ai', free: 'Free tier', d: 'ATS resume builder with the Rezi Score — grades your resume on 23 content & formatting checks in real time.' },
]

const MISTAKES = [
  { wrong: 'A fancy Canva template with columns and graphics.', fix: 'Use a plain single-column layout — like this builder.' },
  { wrong: 'Sending the same resume to every company.', fix: 'Tailor Skills + Summary to each job description (15 mins).' },
  { wrong: 'Contact details in the page header/footer.', fix: 'Move name, email and phone into the top body lines.' },
  { wrong: 'Skills shown as rating bars or a table.', fix: 'Plain comma-separated skills grouped by category.' },
  { wrong: 'Projects with no links.', fix: 'Add a live demo link and the GitHub repo.' },
  { wrong: 'Vague bullets like “responsible for testing”.', fix: 'Action verb + what you built + measurable impact.' },
  { wrong: 'A two-page resume as a fresher.', fix: 'Trim ruthlessly to one focused page.' },
  { wrong: 'Spelling and grammar errors.', fix: 'Proofread twice; run a free checker.' },
  { wrong: 'Adding a photo to the resume.', fix: 'Remove it — not needed for Indian IT roles.' },
  { wrong: 'No keywords from the job posting.', fix: 'Mirror the exact skills and job title from the JD.' },
]
