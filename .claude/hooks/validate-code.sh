#!/usr/bin/env bash
# validate-code.sh — PostToolUse hook for Claude Code
# After an edit, lint/compile-check the touched file so broken code is caught early.
#   • FrontEnd/**/*.{js,jsx}      → run `npx eslint` on that file (errors reported, warnings ok)
#   • Student-BackEnd/**/*.java   → remind Claude to recompile with `./mvnw.cmd -q compile`
# Reads the Claude Code tool-call JSON from stdin; extracts the edited file path.
# Non-blocking on warnings. Reports (but does not hard-block) lint errors so they surface.
set -uo pipefail

# ── Locate the repo root (this script lives in <repo>/.claude/hooks) ──────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# ── Read hook JSON from stdin ─────────────────────────────────────────────────
INPUT="$(cat)"

# ── Extract the edited file path (jq if present, else grep fallback) ──────────
# Claude Code passes the path under tool_input.file_path (Edit/Write) or .path.
extract_path() {
    if command -v jq >/dev/null 2>&1; then
        printf '%s' "$INPUT" | jq -r '
            .tool_input.file_path
            // .tool_input.path
            // .tool_input.notebook_path
            // empty' 2>/dev/null
    else
        # Grep fallback: first "file_path" / "path" string value in the JSON.
        printf '%s' "$INPUT" \
            | grep -oE '"(file_path|path|notebook_path)"[[:space:]]*:[[:space:]]*"[^"]+"' \
            | head -n1 \
            | sed -E 's/.*:[[:space:]]*"([^"]+)"/\1/'
    fi
}

FILE_PATH="$(extract_path)"

# ── No path? Nothing to validate — exit cleanly ──────────────────────────────
if [[ -z "${FILE_PATH:-}" ]]; then
    exit 0
fi

# Normalize Windows backslashes to forward slashes for matching.
NORM_PATH="${FILE_PATH//\\//}"

# ── Frontend JS/JSX → eslint ──────────────────────────────────────────────────
if [[ "$NORM_PATH" == *FrontEnd/* && "$NORM_PATH" =~ \.(js|jsx)$ ]]; then
    FRONTEND_DIR="$REPO_ROOT/FrontEnd"
    if [[ ! -d "$FRONTEND_DIR" ]]; then
        echo "validate-code: FrontEnd dir not found at $FRONTEND_DIR — skipping." >&2
        exit 0
    fi
    if ! command -v npx >/dev/null 2>&1; then
        echo "validate-code: npx not on PATH — skipping eslint for $NORM_PATH." >&2
        exit 0
    fi

    # Lint just this one file (fast). Capture output; decide on errors vs warnings.
    LINT_OUTPUT="$(cd "$FRONTEND_DIR" && npx eslint "$FILE_PATH" 2>&1)"
    LINT_STATUS=$?

    if [[ $LINT_STATUS -eq 0 ]]; then
        # Clean, or warnings-only that eslint still exits 0 on.
        exit 0
    fi

    # eslint exits 1 when there are errors. Surface them to Claude.
    echo "ESLint reported errors in $NORM_PATH:"
    echo "$LINT_OUTPUT"
    echo ""
    echo "Fix the errors above (warnings are acceptable) then re-check."
    # Exit 2 = block/notify so Claude sees and addresses the errors.
    exit 2
fi

# ── Backend Java → recompile reminder ─────────────────────────────────────────
if [[ "$NORM_PATH" == *Student-BackEnd/* && "$NORM_PATH" =~ \.java$ ]]; then
    echo "Reminder: $NORM_PATH changed — the backend must still compile."
    echo "Run:  cd Student-BackEnd && ./mvnw.cmd -q compile"
    # Reminder only — do not block.
    exit 0
fi

# ── Any other file type → no-op ───────────────────────────────────────────────
exit 0
