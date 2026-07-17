import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#2D3E50'

export default function KickresumePage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Career & Productivity">
      <ToolHeader
        icon="👔"
        title="Kickresume — Resume & Cover Letter Builder"
        tagline="Templates, AI writing, and matching cover letters — plus up to 6 months free Premium for students"
        badges={[['Free plan (very limited)', '#FBBF24'], ['6 months Premium for students', '#4ADE80'], ['kickresume.com', color]]}
        overview={"Kickresume is a design-first resume and cover-letter builder with 40+ recruiter-designed templates, an AI writer that can draft an entire resume from a job title, matching cover letters, an ATS checker, and even a personal-website option. The headline for students: verify your student or teacher status through ISIC, ITIC, or UNiDAYS and you unlock up to 6 months (180 days) of Premium for free — which is the smart way to use Kickresume, because its free plan is genuinely restrictive. On the free plan you get four basic templates and access to thousands of pre-written phrases and example resumes, but the AI is capped and then locks sections, you are limited to two work-experience entries, most sections and customisation are locked, and you cannot download a proper PDF (only a PNG of the first page, or a watermarked DOCX). For Indian graduate students, the play is clear: claim the student Premium, use the AI writer and ATS checker while it is free, and export a clean PDF then."}
      />

      <Block title="Watch first" titleColor="#EF4444">
        {[
          { label: 'Kickresume full tutorial — build a resume', url: 'https://www.youtube.com/results?search_query=kickresume+tutorial+build+resume', dur: 'search', note: 'Complete walkthrough — templates, the AI writer, cover letters, and exporting' },
          { label: 'Kickresume free student Premium (ISIC/UNiDAYS)', url: 'https://www.youtube.com/results?search_query=kickresume+student+free+premium+unidays', dur: 'search', note: 'How to verify student status and unlock up to 6 months of Premium at no cost' },
          { label: 'Kickresume free vs premium — honest review', url: 'https://www.youtube.com/results?search_query=kickresume+free+vs+premium+review', dur: 'search', note: 'What the free plan really includes (and its no-real-PDF, 2-job limit)' },
        ].map((v, i) => <VideoCard key={i} v={v} />)}
      </Block>

      <Block>
        <SubHead label="What makes Kickresume useful" color={color} />
        <InfoBox color={color}>{"Kickresume's strength is polish and speed. Its templates are professionally designed by recruiters and typographers, its AI writer can generate a full first draft from just a job title and a job ad, and its cover-letter builder produces letters that visually match your resume for a coherent application package. It also includes an ATS resume checker and a library of 20,000+ pre-written phrases and 1,500+ real example resumes sorted by job title — genuinely helpful when you are staring at a blank page and unsure how to phrase your experience."}</InfoBox>
        <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>The important caveat is that most of this power lives behind Premium. The free plan is deliberately limited to make you upgrade — but students have a legitimate side door: ISIC, ITIC, or UNiDAYS verification unlocks up to 6 months of Premium for free. That turns Kickresume from "limited demo" into "fully unlocked professional builder" at zero cost, which is exactly how a graduate student should use it.</p>
        {[
          '40+ recruiter-designed templates for both resumes and matching cover letters (Premium unlocks the full set)',
          'AI writer that drafts an entire resume from a job title and a pasted job advertisement',
          'ATS resume checker to test how well your resume parses (Premium feature)',
          '20,000+ pre-written phrases and 1,500+ example resumes by job title — helpful even on free',
          'Up to 6 months of Premium free for students/teachers via ISIC, ITIC, or UNiDAYS verification',
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
          { name: 'Designed Templates', desc: '40+ templates crafted by recruiters and typographers, with matching resume + cover-letter pairs. Free gives 4 basic black-and-white designs; the full set and colour/font customisation are Premium.' },
          { name: 'AI Resume Writer', desc: 'Enter a job title and job ad, and the AI drafts full resume sections — summary, experience, skills. Free AI is capped and then locks; Premium (or student Premium) gives full AI writing.' },
          { name: 'Matching Cover Letters', desc: 'Generate a cover letter that mirrors your resume design in under a minute, then personalise it. A coherent resume + cover-letter pair makes a stronger first impression.' },
          { name: 'ATS Resume Checker', desc: 'Checks how well your resume will parse through Applicant Tracking Systems and flags issues. This is a Premium feature — one more reason to claim the free student Premium.' },
          { name: 'Phrase & Example Library', desc: '20,000+ pre-written phrases you can paste in and 1,500+ real example resumes organised by job title. Available even on free — great for phrasing your projects and internships.' },
          { name: 'Career Map & Website', desc: 'Premium extras include a Career Map, LinkedIn/PDF import, and personal-website templates to host an online version of your resume — useful for a shareable profile link.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="Getting started — claim student Premium first" color={color} />
        <Steps color={color} items={[
          { n: '1', title: 'Create a free account', body: 'Sign up at kickresume.com with email or Google — no card needed. Before building anything, do step 2: unlocking student Premium first means you avoid hitting the free plan\'s hard limits mid-way.' },
          { n: '2', title: 'Verify student status for free Premium', body: 'Go to the students/education offer and verify with ISIC, ITIC, or UNiDAYS. This unlocks up to 6 months (180 days) of Premium at no cost — full templates, uncapped AI, the ATS checker, and real PDF export.' },
          { n: '3', title: 'Start from a template or import', body: 'Pick a clean ATS-friendly template. If you already have a resume, use LinkedIn/PDF import (Premium) to auto-fill, then refine — much faster than typing everything from scratch.' },
          { n: '4', title: 'Draft with the AI writer, then edit hard', body: 'Enter your target job title and paste a job ad; let the AI draft sections. Then edit ruthlessly — replace generic lines with your real projects and quantified results. AI is a starting point, never the final word.' },
          { n: '5', title: 'Run the ATS checker and add a cover letter', body: 'Use the ATS checker to catch parsing and content issues. Then generate a matching cover letter for your target role and personalise the opening and closing lines to the specific company.' },
          { n: '6', title: 'Export a clean PDF while Premium is active', body: 'With student Premium you can export a proper, watermark-free PDF and DOCX. Do your final exports during the free Premium window. (On the plain free plan you would only get a PNG of the first page or a watermarked DOCX.)' },
        ]} />
      </Block>

      <Block>
        <SubHead label="Free vs student Premium vs paid" color={color} />
        <Compare color={color} items={[
          { label: 'Free — $0', badge: 'Very limited', body: '4 basic templates, 20,000+ phrases, 1,500+ examples, and unlimited document creation — BUT AI is capped then locks, you get max 2 work-experience entries, most sections and customisation are locked, no ATS checker, and no proper PDF (only a first-page PNG or a watermarked DOCX). Fine for a quick preview, not for a real application.' },
          { label: 'Student / Teacher Premium', badge: 'Best value — free', body: 'Verify with ISIC, ITIC, or UNiDAYS to unlock up to 6 months (180 days) of full Premium at no cost: all templates, uncapped AI, ATS checker, LinkedIn/PDF import, and real PDF/DOCX export. This is the way for graduate students to use Kickresume.' },
          { label: 'Paid Premium', badge: 'After the student window', body: 'Roughly $8/month on an annual plan up to about $24/month monthly (verify current pricing on kickresume.com). Unlocks everything the student Premium does. Only worth paying once your free student Premium runs out and you still need it.' },
          { label: 'Honest verdict', badge: 'Free-first', body: 'The plain free plan is too restrictive for a real job search — no true PDF and a 2-job limit are dealbreakers. But the free student Premium makes Kickresume genuinely worth using. Claim that, export what you need, and you never have to pay.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="Kickresume, Rezi, and the ARISE resume builder" color={color} />
        <InfoBox color={color}>{"These tools complement your learning here rather than replace it. ARISE already ships its own ATS Resume Builder and an ATS guide, so you always have a free, unlimited option. Kickresume shines for design polish and its student-Premium unlock; Rezi shines for pure ATS keyword scoring. Use them to see professional templates and phrasing, learn what a strong resume looks like, then keep a free, tailorable master version in the platform's own builder. Be honest with yourself about free vs paid: with the free student Premium (Kickresume) and unlimited DOCX (Rezi) plus the built-in ARISE builder, you can run an entire placement season at ₹0."}</InfoBox>
      </Block>

      <div className="tool-layout-task">
        <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — A Polished Resume + Matching Cover Letter for ₹0</span></div>
        <p className="tool-layout-task__desc">Use Kickresume's free student Premium to produce one professionally designed resume with a matching cover letter for a real target role — then bring the content back into the ARISE resume builder so you stay free after the Premium window ends.</p>
        <Steps color={color} items={[
          { n: '1', title: 'Unlock student Premium', body: 'Sign up at kickresume.com and verify with ISIC, ITIC, or UNiDAYS to get up to 6 months of Premium free. Do this before building so you never hit the free plan\'s 2-job / no-PDF walls.' },
          { n: '2', title: 'Pick a template and import your info', body: 'Choose a clean, ATS-friendly template. Import from LinkedIn or an existing PDF if you have one, or start fresh with your education, projects, and internships.' },
          { n: '3', title: 'AI-draft, then rewrite with real results', body: 'Enter your target job title and paste the job ad; let the AI draft your sections. Then rewrite every generic bullet with your actual projects and numbers. Use the phrase library for inspiration, not as-is.' },
          { n: '4', title: 'Run the ATS checker', body: 'Use the Premium ATS checker to catch parsing and content problems. Fix everything it flags — standard headings, no risky formatting, keywords that match the job ad.' },
          { n: '5', title: 'Generate a matching cover letter', body: 'Create a cover letter that matches your resume design. Personalise the first and last paragraphs to the specific company and role — never send a generic one. Export both as clean PDFs while Premium is active.' },
          { n: '6', title: 'Port it to the ARISE resume builder', body: 'Copy your finalised content into this platform\'s own free ATS Resume Builder. Now you can produce unlimited tailored versions for every application forever, with no dependence on any paid plan.' },
        ]} />
        <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">TOTAL COST: ₹0 — up to 6 months free student Premium via ISIC/ITIC/UNiDAYS, then the ARISE resume builder keeps you free</span></div>
      </div>

      <ProTip>
        Do not fight Kickresume's free plan — it is designed to be too limited for a real application (no true PDF, only 2 work-experience entries, capped AI). Instead, verify your student status through ISIC, ITIC, or UNiDAYS the moment you sign up and claim up to 6 months of Premium for free. That single step unlocks the full templates, uncapped AI writer, ATS checker, and real PDF export. Do your serious resume and cover-letter work — and all your exports — inside that free window, then copy the finished content into this platform's own ATS Resume Builder so you stay free forever after the Premium period ends.
      </ProTip>

      <PageNavRow
        prev={{ path: '/ai-lab/career/rezi', label: 'Rezi' }}
        next={{ path: '/ai-lab/career/teal', label: 'Teal' }}
      />
    </ToolPageShell>
  )
}
