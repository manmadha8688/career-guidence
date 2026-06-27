# /front-security — Frontend Security & Accessibility Audit

---

## SECURITY CHECKS

### 1. Auth — No Token Leaks
```bash
# No JWT in any client storage
grep -rn "localStorage.setItem.*token\|sessionStorage.setItem.*token\|localStorage.setItem.*jwt" \
  FrontEnd/src/ --include="*.jsx" --include="*.js"
# → Must return 0

# VITE_ variables are public — check no secrets
cat FrontEnd/.env.example
cat FrontEnd/.env.local 2>/dev/null
# → Only VITE_API_URL should exist
```

### 2. External Links
```bash
# All target="_blank" must have rel="noopener noreferrer"
grep -rn 'target="_blank"' FrontEnd/src/ --include="*.jsx" | \
  grep -v 'rel="noopener noreferrer"'
# → Must return 0
```

### 3. No Unsafe HTML
```bash
# No dangerouslySetInnerHTML
grep -rn "dangerouslySetInnerHTML" FrontEnd/src/ --include="*.jsx"
# → Must return 0

# iframe sandbox (ConceptInlinePanel code runner is intentional)
grep -rn "sandbox=" FrontEnd/src/ --include="*.jsx"
# → Only: sandbox="allow-scripts allow-same-origin" in ConceptInlinePanel — OK
```

### 4. No Hardcoded Credentials
```bash
grep -rn "password\|secret\|api_key\|apikey" \
  FrontEnd/src/ --include="*.jsx" --include="*.js" -i | \
  grep -v "password.*input\|password.*form\|password.*state\|setPassword\|showPass\|getStrength\|type.*password"
# → Should not show any actual credential values
```

### 5. User Input Safety
```bash
# User content rendered via React JSX (auto-escaped) — not innerHTML
grep -rn "innerHTML" FrontEnd/src/ --include="*.jsx"
# → Only acceptable in: LivePreview.jsx (code runner output — uses _esc() sanitizer)
```

---

## ACCESSIBILITY CHECKS

### 6. Icon-Only Buttons (Screen Reader)
```bash
# Buttons with only an icon and no visible text need aria-label
grep -rn "<button" FrontEnd/src/components/ --include="*.jsx" -A 3 | \
  grep -B 2 "size={" | grep "<button" | grep -v "aria-label"
# → Report any icon-only buttons missing aria-label
```

**Known required aria-labels:**
- [ ] Theme toggle button: `aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}`
- [ ] Sidebar menu toggle: `aria-label="Toggle sidebar menu"`
- [ ] Password toggle: `aria-label={showPass ? 'Hide password' : 'Show password'}`
- [ ] Report button (floating): `aria-label="Report an issue on this page"`
- [ ] Close buttons in modals: `aria-label="Close"`

### 7. Form Accessibility
```bash
# All inputs should have associated labels or aria-label
grep -rn "<input\b" FrontEnd/src/pages/auth/ --include="*.jsx" -A 1 | \
  grep "<input" | grep -v "aria-label\|htmlFor\|id="
# → Report uncovered inputs
```

### 8. Modal Accessibility
```bash
# Modals need role="dialog" aria-modal="true"
grep -rn "role=\"dialog\"\|aria-modal" FrontEnd/src/ --include="*.jsx"
# → ReportButton modal should have these
```

---

## ACCESSIBILITY QUICK FIXES (Safe)

If issues found:
1. Add `aria-label` to icon buttons
2. Add `type="button"` to non-submit buttons in forms
3. Add `alt=""` to decorative images
4. Verify modal close button has `aria-label="Close"`

These are additive only — no UI change.
