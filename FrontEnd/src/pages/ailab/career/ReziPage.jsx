import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#111827'

export default function ReziPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Career & Productivity">
      <ToolHeader
        icon="🧾"
        title="Rezi — AI ATS-Optimized Resume Builder"
        tagline="Build a clean, keyword-matched resume that gets past Applicant Tracking Systems"
        badges={[['Free plan (limited)', '#FBBF24'], ['rezi.ai', color], ['ATS-focused', 'var(--text-muted)']]}
        overview={"Rezi is an AI resume builder laser-focused on one thing: getting your resume past the Applicant Tracking Systems (ATS) that most companies use to filter applications before a human ever reads them. It gives you ATS-friendly templates, an AI bullet-point and summary writer, real-time keyword targeting against a job description, and the Rezi Score, which grades your resume against up to 23 content and formatting checks. The free plan is real and needs no credit card — but it is best understood as an extended trial: you can create one resume, use limited AI features, and — the single most important catch — download only three PDFs for the entire lifetime of the account (not three per month). DOCX and Google Drive exports are unlimited, so there is an honest workaround. For Indian graduate students applying at scale, Rezi is a great way to learn what an ATS-ready resume looks like; just go in knowing where the paywall sits."}
      />

      <Block title="Watch first" titleColor="#EF4444">
        {[
          { label: 'Rezi AI resume builder — full tutorial', url: 'https://www.youtube.com/results?search_query=rezi+ai+resume+builder+tutorial', dur: 'search', note: 'End-to-end walkthrough — building an ATS resume, using the AI writer, and reading the Rezi Score' },
          { label: 'What is an ATS and how to beat it', url: 'https://www.youtube.com/results?search_query=what+is+ATS+resume+how+to+beat+applicant+tracking+system', dur: 'search', note: 'Understand why ATS filtering exists before you optimise for it — the "why" behind Rezi' },
          { label: 'Rezi free plan — limits and workarounds', url: 'https://www.youtube.com/results?search_query=rezi+free+plan+review+limits', dur: 'search', note: 'Honest look at what the free tier does and does not include (the 3-PDF lifetime cap)' },
        ].map((v, i) => <VideoCard key={i} v={v} />)}
      </Block>

      <Block>
        <SubHead label="Why ATS optimization matters" color={color} />
        <InfoBox color={color}>{"Most medium and large companies run every submitted resume through an Applicant Tracking System first. The software parses your resume into fields and scores it against the job description before any recruiter opens it. A resume with unusual section names, images, columns, tables, or missing keywords can get filtered out even when you are perfectly qualified. ATS optimization is not about tricking the system — it is about formatting cleanly and using the same language the job description uses, so the parser reads you correctly and a human actually sees your application."}</InfoBox>
        <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Rezi builds this in by default: its templates are single-column, plain-text-friendly, and use standard section headings. Its keyword targeting compares your resume against a pasted job description and shows which important terms are missing. Its AI writer turns a weak line like "worked on backend" into a quantified, impact-led bullet — though you still have to supply the real numbers. And the Rezi Score gives you a running grade so you know when the resume is "done."</p>
        {[
          'ATS-friendly single-column templates that parse cleanly — no images, tables, or fancy columns to break the reader',
          'Keyword targeting — paste a job description and see which terms your resume is missing',
          'AI bullet & summary writer — turns vague duties into quantified, achievement-focused lines',
          'Rezi Score — grades your resume against up to 23 content and formatting criteria in real time',
          'Unlimited DOCX and Google Drive exports even on the free plan — the honest workaround for the PDF cap',
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
          { name: 'ATS Templates', desc: 'Clean, single-column, recruiter-designed templates that Applicant Tracking Systems can parse without errors. The free plan gives a limited selection; the most distinctive designs are paid.' },
          { name: 'AI Resume Writer', desc: 'Generate summaries and bullet points from a job title and a short description. It produces impact-led phrasing; you fill in your real metrics. Great for beating the blank-page problem.' },
          { name: 'Keyword Targeting', desc: 'Paste a specific job description and Rezi highlights the keywords the role wants that your resume is missing, so you can add the ones that genuinely apply to you.' },
          { name: 'Rezi Score', desc: 'A live grade evaluating your resume against up to 23 attributes — content, formatting, ATS-readiness, and completeness. Aim to push the score up before you export.' },
          { name: 'Cover & Resignation Letters', desc: 'Unlimited cover-letter and resignation-letter builders even on the free plan — a genuinely useful freebie for tailoring an application to each role.' },
          { name: 'Real-Time Analysis', desc: 'As you type, Rezi flags weak phrasing, missing sections, and formatting issues, so you fix problems while writing instead of discovering them after applying.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="Getting started — build one strong resume" color={color} />
        <Steps color={color} items={[
          { n: '1', title: 'Sign up free at rezi.ai', body: 'Create a free account — no credit card required. Remember the constraint before you invest time: the free plan allows one resume and three PDF downloads for the lifetime of the account. Plan to make that one resume excellent.' },
          { n: '2', title: 'Pick an ATS template', body: 'Choose one of the clean, single-column free templates. Do not chase a fancy design — for ATS parsing, plain and standard beats decorative every time. Recruiters care about content, not colour.' },
          { n: '3', title: 'Fill in content, then run the AI writer', body: 'Add your education, projects, internships, and skills. For each weak bullet, use the AI writer to rephrase it into an impact line — then edit in your real numbers ("built X, reducing Y by 40%"). Never ship AI text with placeholder metrics.' },
          { n: '4', title: 'Target a specific job description', body: 'Paste a real job posting you want to apply to into keyword targeting. Add the missing keywords that genuinely describe you into the relevant sections. Do not keyword-stuff — only add terms you can defend in an interview.' },
          { n: '5', title: 'Push the Rezi Score up', body: 'Watch the Rezi Score and fix what it flags — missing metrics, weak verbs, formatting issues — until the score is strong. This is your objective "is it done yet" signal.' },
          { n: '6', title: 'Export smartly (mind the PDF cap)', body: 'Because PDF downloads are capped at three for the account lifetime, do your editing first and only export a PDF when the resume is truly final. Or export unlimited DOCX/Google Drive and convert that to PDF yourself with Word or Google Docs for free.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="Free plan vs paid — the honest breakdown" color={color} />
        <Compare color={color} items={[
          { label: 'Free — $0, no card', badge: 'Extended trial', body: 'One resume, limited AI (basic keyword targeting and content analysis), a limited set of ATS templates, unlimited cover/resignation letters, and unlimited DOCX + Google Drive exports. Genuinely useful to learn what an ATS resume looks like and to produce one solid resume.' },
          { label: 'The 3-PDF lifetime cap', badge: 'Read this first', body: 'The catch that surprises everyone: the free plan allows only three PDF downloads for the entire life of the account — not three per month. For one application that is plenty; for an active search where you re-export per role, it runs out fast. Workaround: export DOCX/Google Drive (unlimited) and convert to PDF yourself.' },
          { label: 'Pro — about $29/month', badge: 'Active job search', body: 'Unlimited resumes, full AI capabilities, unlimited downloads, the full Resume Checker, and a monthly human resume review. Worth it only during an active, high-volume search where you need many tailored versions. 30-day money-back guarantee.' },
          { label: 'Lifetime — about $149 one-time', badge: 'Long-term value', body: 'A one-time payment for permanent Pro-level access (unlimited resumes, full AI, unlimited downloads), minus the free monthly human review. Verify current pricing on rezi.ai before buying — plan terms change.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="Rezi and this platform's own resume builder" color={color} />
        <InfoBox color={color}>{"ARISE already includes its own ATS Resume Builder and an ATS guide, so you do not have to pay anyone to get an interview-ready resume. Use Rezi to learn the principles — clean formatting, keyword matching, quantified bullets, a scored checklist — and to see a polished commercial workflow. Then apply those same principles for free in the platform's own resume builder, or export DOCX from Rezi's free plan. The skill (writing an ATS resume) is what matters and transfers everywhere; the specific tool is interchangeable. Be clear-eyed about free vs paid and do not pay unless an active, high-volume search truly needs it."}</InfoBox>
      </Block>

      <div className="tool-layout-task">
        <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Build One ATS-Ready Resume for a Real Role</span></div>
        <p className="tool-layout-task__desc">Take one specific job you genuinely want and build a resume tuned to it — measuring the Rezi Score and keyword match before and after. The goal is not just a resume; it is understanding what makes a resume ATS-ready so you can do it anywhere, for free, forever.</p>
        <Steps color={color} items={[
          { n: '1', title: 'Pick one real target role', body: 'Find one specific job posting (internship or fresher role) you actually want to apply for. Copy the full job description — you will use it for keyword targeting. One focused target beats a generic resume aimed at everyone.' },
          { n: '2', title: 'Draft in Rezi with an ATS template', body: 'Sign up free at rezi.ai, choose a clean single-column template, and add your real content: education, 2-3 projects, any internships, and skills. Note your starting Rezi Score.' },
          { n: '3', title: 'Rewrite your 3 weakest bullets with AI', body: 'Use the AI writer on your three vaguest bullets. Then edit in real metrics — "Built a REST API with 6 endpoints, cutting load time 35%." AI gives structure; you supply the truth. Never leave invented numbers.' },
          { n: '4', title: 'Run keyword targeting against the JD', body: 'Paste the job description into keyword targeting. Add the missing keywords that genuinely apply to you into the right sections. Skip any you cannot back up in an interview.' },
          { n: '5', title: 'Push the Rezi Score up, then export DOCX', body: 'Fix everything the Rezi Score flags until it is strong. To preserve your 3 lifetime PDF downloads, export unlimited DOCX (or to Google Drive) and convert to PDF with Google Docs/Word for free.' },
          { n: '6', title: 'Recreate it free in the ARISE resume builder', body: 'Now rebuild the same resume in this platform\'s own ATS Resume Builder. You already know the principles — clean format, matched keywords, quantified bullets — so you can produce unlimited tailored versions at zero cost going forward.' },
        ]} />
        <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">TOTAL COST: ₹0 — free plan + unlimited DOCX export; the ARISE resume builder keeps you free beyond Rezi's 3-PDF cap</span></div>
      </div>

      <ProTip>
        The single most important Rezi fact: the free plan gives you only three PDF downloads for the entire lifetime of the account — not three per month. Do not "burn" a download on a draft. Do all your editing first, get the Rezi Score high, and only export a PDF when the resume is genuinely final. Better still, export DOCX or to Google Drive (both unlimited on free) and convert to PDF yourself in Google Docs or Word — that completely sidesteps the cap and costs nothing. Use Rezi to learn what an ATS-ready resume looks like, then reproduce it in this platform's own free resume builder for every future application.
      </ProTip>

      <PageNavRow
        prev={{ path: '/ai-lab/career/pramp', label: 'Pramp' }}
        next={{ path: '/ai-lab/career/kickresume', label: 'Kickresume' }}
      />
    </ToolPageShell>
  )
}
