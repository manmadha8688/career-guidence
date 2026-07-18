/** Loose GitHub repo URL — accepts /tree/..., /blob/..., .git, query strings. */
const GITHUB_REPO_RE =
  /^https?:\/\/(?:www\.)?github\.com\/([a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38})\/([a-zA-Z0-9._-]+)(?:\/.*)?(?:\?.*)?$/i

/** Normalize to https://github.com/owner/repo or null when not a GitHub repo link. */
export function normalizeGitHubRepoUrl(raw) {
  if (!raw || !raw.trim()) return null
  const m = raw.trim().match(GITHUB_REPO_RE)
  if (!m) return null
  let repo = m[2]
  if (repo.endsWith('.git')) repo = repo.slice(0, -4)
  return `https://github.com/${m[1]}/${repo}`
}

export function isGitHubRepoUrl(raw) {
  return normalizeGitHubRepoUrl(raw) !== null
}
