import ToolPageLayout from '../ToolPageLayout'
const tool = { id: 'teal', category: 'career', name: 'Teal', tagline: 'AI-powered resume builder and job search tracker', icon: '📄', color: '#14B8A6', free: true, freeTier: 'Free — all core features', officialUrl: 'https://tealhq.com' }
const videos = [{ label: 'Teal Resume Builder — Free AI Resume Tutorial', url: 'https://www.youtube.com/watch?v=iXtP_-7Ha70', duration: '15 min', note: 'Complete walkthrough of resume builder and job tracker features' }]
const overview = `Teal is an AI-powered job search platform with three core tools: a resume builder that produces ATS-optimized resumes, a job tracker to organize all your applications, and a resume-job match score that shows exactly how well your resume fits a specific job description. For students actively applying for placements and internships, Teal gives you AI-powered feedback on your resume and a systematic approach to tracking applications.`
const sections = [{ content: `ATS (Applicant Tracking System) optimization is why the resume builder matters. Most companies use software that scans resumes for keywords before a human reads them. A poorly formatted resume — wrong headers, unusual section names, missing keywords from the job description — gets filtered out before any person sees it. Teal formats your resume in a clean, ATS-readable structure and highlights when you are missing important keywords from the roles you are targeting.

The AI bullet point improvement feature is particularly useful for students. Take any resume bullet point — "Worked on backend features for web app" — paste it into Teal's AI rewriter, and it transforms it into a strong, quantified achievement: "Implemented 5 REST API endpoints using Node.js and MongoDB, reducing average page load time by 40%". The transformation requires adding your actual numbers and details, but the structure and impact-focused phrasing comes from the AI.

The job tracker is a simple but genuinely useful CRM for your job search. Add job listings you are interested in, track application status (saved, applied, phone screen, interview, offer), add notes from each interaction, and see your overall pipeline. Most students apply to many companies and lose track of what they have applied to and what stage each is at — the tracker solves this without any spreadsheet maintenance.

The resume-job match score is the highest-value feature. Paste a job description and Teal scores your resume against it: what keywords are present, what keywords are missing, how well your experience matches the requirements. For each application, this score tells you exactly what to add to your resume to improve your match for that specific role.` }]
const canDo = [
  'Build a resume that passes ATS filters for the companies you are targeting',
  'Transform weak "worked on" bullet points into strong quantified achievements',
  'Track every job application systematically without losing track of what is where',
  'Score your resume against any job description and see exactly what keywords to add',
  'Tailor your resume to each application with AI suggestions for each specific role',
]
const task = {
  title: 'Optimize Your Resume for One Role',
  description: 'Take your current resume and use Teal to optimize it for a specific job posting you want to apply for. Measure the match score before and after your improvements.',
  steps: [
    'Sign up at tealhq.com (free account, no credit card)',
    'Import your current resume or build it in Teal\'s editor',
    'Find a specific job posting you genuinely want to apply to',
    'Run the Resume Match: paste the job description, see your initial score',
    'Use AI bullet point rewriter on your weakest 3 bullets',
    'Add missing keywords from the job description to appropriate sections',
    'Re-run the match score — target 70%+ before applying',
  ],
  cost: 'TOTAL COST: ₹0 — Teal core features are completely free',
}
const tip = `Do not send the same resume to every company. Use Teal to create 3-4 resume variants targeting different role types: one for frontend roles, one for backend roles, one for full-stack roles, one for data roles. Keep them in Teal and pull the appropriate variant for each application. A resume tailored to the specific role gets significantly better response rates than a generic one.`
export default function TealPage() {
  return <ToolPageLayout tool={tool} videos={videos} overview={overview} sections={sections} canDo={canDo} task={task} tip={tip} />
}
