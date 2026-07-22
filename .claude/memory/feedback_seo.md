---
name: feedback-seo
description: SEO rules — sitemap only public hubs; protected pages noindex; never list login-gated URLs
metadata:
  type: feedback
---

# SEO Feedback (LearnForEarn)

## Sitemap / robots (standing rule — Jul 2026)

- **Sitemap = public 200s only.** Never list login-gated detail URLs (`/ai-lab/*`, `/deployment/*`, `/code-gym/*`, `/missions/*`, `/skill-arena/*`).
- **Hubs stay crawlable:** `/ai-lab`, `/deployment`, `/missions`, `/aptitude` (+ aptitude category hubs).
- Trailing-slash `Disallow: /ai-lab/` blocks children but **allows** the hub `/ai-lab`.
- Protected routes also get `noindex` via `resolveSeo` / `Seo` in `App.jsx` (defense in depth if a bot runs JS).

## Files

- `FrontEnd/index.html` — primary meta, OG/Twitter, Organization + WebSite + ItemList JSON-LD
- `FrontEnd/src/utils/documentTitle.js` — per-route titles/descriptions/canonical/noindex
- `FrontEnd/src/App.jsx` — `Seo` syncs head on navigation + route Breadcrumb/WebPage JSON-LD
- `FrontEnd/public/sitemap.xml`, `robots.txt`, `site.webmanifest`

## Ranking unlock (product decision)

To index AI tool / deploy guide pages later: make them **publicly readable first**, then add to sitemap and remove the matching `Disallow`. Do not add while ProtectedRoute redirects to login.
