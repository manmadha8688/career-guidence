/** Option presets for useConfirm() — replaces native window.confirm. */

// A profile link (LinkedIn / portfolio). Removing it never affects XP already earned.
export function removeProfileLinkConfirmOptions(name) {
  return {
    title: `Remove ${name}?`,
    message: `This hides it from your public profile. Any XP you already earned for it stays. You can add it again anytime.`,
    confirmLabel: 'Remove',
    tone: 'danger',
  }
}

// A mission link (GitHub repo / live demo). Removing it REVERSES the XP it earned, so
// tell the hunter the exact amount when we know it.
export function removeMissionLinkConfirmOptions(kind, xp = 0) {
  const isRepo = kind === 'repository'
  const label = isRepo ? 'repository link' : 'live demo link'
  const noun = isRepo ? 'GitHub repo' : 'live demo'
  const xpNote = xp > 0 ? ` and takes back the ${xp} XP you earned for it` : ''
  return {
    title: `Remove ${label}?`,
    message: `This removes your ${noun} from this mission${xpNote}. You can add it again anytime.`,
    confirmLabel: 'Remove',
    tone: 'danger',
  }
}

// A link inside a resume project entry.
export function removeResumeProjectLinkConfirmOptions() {
  return {
    title: 'Remove project link?',
    message: 'This removes the link from this project. Save the resume to apply the change.',
    confirmLabel: 'Remove',
    tone: 'danger',
  }
}

export function disconnectGitHubConfirmOptions() {
  return {
    title: 'Disconnect GitHub?',
    message:
      'This removes the verified GitHub badge from your profile. Your earned XP stays, and you can reconnect anytime.',
    confirmLabel: 'Disconnect',
    tone: 'danger',
  }
}

export function deleteResumeConfirmOptions() {
  return {
    title: 'Delete resume?',
    message:
      "This permanently deletes this resume and stops its share link. If it's shown on your public profile, it'll be removed there too. This can't be undone.",
    confirmLabel: 'Delete',
    tone: 'danger',
  }
}

export function turnOffShareConfirmOptions({ featured = false } = {}) {
  const profileNote = featured
    ? ' It will also be removed from your public profile.'
    : ''
  return {
    title: 'Turn off sharing?',
    message: `Your public resume link will stop working.${profileNote} You can turn sharing back on anytime.`,
    confirmLabel: 'Turn off',
    tone: 'danger',
  }
}

export function deleteWalkInConfirmOptions() {
  return {
    title: 'Delete walk-in?',
    message: 'Delete this walk-in?',
    confirmLabel: 'Delete',
    tone: 'danger',
  }
}

export function deleteQuestionConfirmOptions() {
  return {
    title: 'Delete question?',
    message: 'Delete this question?',
    confirmLabel: 'Delete',
    tone: 'danger',
  }
}

export function deleteReportConfirmOptions() {
  return {
    title: 'Delete report?',
    message: 'Delete this report?',
    confirmLabel: 'Delete',
    tone: 'danger',
  }
}

export function removeRoadmapSubjectConfirmOptions(subjectTitle, roadmapTitle) {
  return {
    title: 'Remove subject from roadmap?',
    message: `Remove "${subjectTitle}" from "${roadmapTitle}"? Learners on this path will no longer see this gate.`,
    confirmLabel: 'Remove',
    tone: 'danger',
  }
}
