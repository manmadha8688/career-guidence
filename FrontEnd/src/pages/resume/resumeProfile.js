/** Map /me profile → resume personal, education & link fields (single source of truth).
 *  Backend mirror: ResumeProfileMerge.java — strips these keys on save, merges on public read. */

export function profileEducation(user) {
  const e = user?.education || {}
  let years = e.years || ''
  if (!years) {
    const start = String(e.yearStart || '').trim()
    const end = String(e.yearEnd || e.graduationYear || '').trim()
    if (start && end) years = `${start} - ${end}`
    else years = end || start || ''
  }
  return {
    degree: e.degree || '',
    branch: e.fieldOfStudy || '',
    college: e.institution || '',
    years,
    cgpa: e.cgpa || '',
  }
}

export function profileContactEmail(user) {
  if (!user) return ''
  if (user.useLoginEmailForContact) return (user.email || '').trim()
  return (user.publicEmail || '').trim()
}

export function profileResumeFields(user) {
  if (!user) {
    return {
      fullName: '', email: '', mobile: '', linkedin: '', github: '', portfolio: '',
      education: [profileEducation(null)],
    }
  }
  return {
    fullName: (user.fullName || '').trim(),
    email: profileContactEmail(user),
    mobile: (user.mobile || '').trim(),
    linkedin: (user.linkedinUrl || '').trim(),
    github: (user.githubUrl || '').trim(),
    portfolio: (user.portfolioUrl || '').trim(),
    education: [profileEducation(user)],
  }
}

/** Human-readable missing pieces — empty when profile is ready for resume. */
export function profileResumeGaps(user) {
  if (!user || user.role === 'GUEST') return ['a registered account and My Profile']
  const gaps = []
  if (!(user.fullName || '').trim()) gaps.push('full name')
  if (!profileContactEmail(user)) gaps.push('contact email')
  const edu = profileEducation(user)
  if (!edu.degree) gaps.push('degree')
  if (!edu.branch) gaps.push('branch / specialization')
  if (!edu.college) gaps.push('college')
  if (!edu.years) gaps.push('years (start – graduation)')
  return gaps
}

export function isProfileResumeReady(user) {
  return profileResumeGaps(user).length === 0
}

/** Resume-owned fields only — never edited on the resume form for profile data. */
export function pickResumeOwn(data = {}) {
  return {
    objective: data.objective || '',
    skills: Array.isArray(data.skills) ? data.skills : [],
    projects: Array.isArray(data.projects) ? data.projects : [],
    internships: Array.isArray(data.internships) ? data.internships : [],
    achievements: Array.isArray(data.achievements) ? data.achievements : [],
    certificates: Array.isArray(data.certificates) ? data.certificates : [],
    softSkills: Array.isArray(data.softSkills) ? data.softSkills : [],
  }
}

export function mergeResumeWithProfile(resume, user) {
  const profile = profileResumeFields(user)
  const own = pickResumeOwn(resume)
  return {
    ...profile,
    ...own,
    fullName: profile.fullName,
    email: profile.email,
    mobile: profile.mobile,
    linkedin: profile.linkedin,
    github: profile.github,
    portfolio: profile.portfolio,
    education: profile.education,
  }
}
