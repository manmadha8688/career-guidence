/** Option presets for useConfirm() — replaces native window.confirm. */

export function removeLinkConfirmOptions(label, hint = 'You can add it again anytime.') {
  return {
    title: 'Remove link?',
    message: `Remove ${label}? ${hint}`,
    confirmLabel: 'Remove',
    tone: 'danger',
  }
}

export function disconnectGitHubConfirmOptions() {
  return {
    title: 'Disconnect GitHub?',
    message:
      'Disconnect GitHub from your account? Your verified profile link will be removed. You can connect again anytime.',
    confirmLabel: 'Disconnect',
    tone: 'danger',
  }
}

export function deleteResumeConfirmOptions() {
  return {
    title: 'Delete resume?',
    message: 'Delete this resume permanently? Any share link will stop working.',
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
    message: `Turn off sharing? Your public link will stop working.${profileNote}`,
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
