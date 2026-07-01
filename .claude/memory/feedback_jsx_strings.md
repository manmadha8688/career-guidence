---
name: feedback-jsx-strings
description: NEVER put HTML tags or ${} template literals inside string values in JSX files — causes blank page in Vite
metadata:
  type: feedback
---

Never put `<div>`, `<input>`, `<form>` or other HTML/JSX tags inside string values (`body: "..."`, `title: "..."`) in JSX files. Vite's JSX parser treats them as real JSX elements and fails to compile, causing a blank page with no visible error.

Never put template literals with `${variable}` inside double-quoted strings in JSX files.

**Why:** Vite's JSX transform sees `<div>` inside a string and misparses the file, breaking the entire component silently.

**How to apply:** In AI Lab pages where Steps/Compare items have code examples in the `body:` field — use plain text descriptions instead of actual JSX/HTML code with angle brackets. Or describe it in words like `(div element)` instead of `<div>`.
