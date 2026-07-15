#!/usr/bin/env bash
# post-edit-format.sh — PostToolUse hook for Claude Code
# After editing a FrontEnd JS/JSX file, auto-fix safe formatting/lint issues with
# `npx eslint --fix` on just that one file (formatting here is eslint-based; no prettier).
# No-op for every other file type. Kept fast: single file, never the whole project.
set -uo pipefail

# ── Locate the repo root (this script lives in <repo>/.claude/hooks) ──────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# ── Read hook JSON from stdin ─────────────────────────────────────────────────
INPUT="$(cat)"

# ── Extract the edited file path (jq if present, else grep fallback) ──────────
extract_path() {
    if command -v jq >/dev/null 2>&1; then
        printf '%s' "$INPUT" | jq -r '
            .tool_input.file_path
            // .tool_input.path
            // empty' 2>/dev/null
    else
        printf '%s' "$INPUT" \
            | grep -oE '"(file_path|path)"[[:space:]]*:[[:space:]]*"[^"]+"' \
            | head -n1 \
            | sed -E 's/.*:[[:space:]]*"([^"]+)"/\1/'
    fi
}

FILE_PATH="$(extract_path)"

# ── No path → nothing to format ───────────────────────────────────────────────
if [[ -z "${FILE_PATH:-}" ]]; then
    exit 0
fi

NORM_PATH="${FILE_PATH//\\//}"

# ── Only touch FrontEnd JS/JSX; everything else is a no-op ────────────────────
if [[ "$NORM_PATH" != *FrontEnd/* || ! "$NORM_PATH" =~ \.(js|jsx)$ ]]; then
    exit 0
fi

FRONTEND_DIR="$REPO_ROOT/FrontEnd"
if [[ ! -d "$FRONTEND_DIR" ]]; then
    exit 0
fi
if ! command -v npx >/dev/null 2>&1; then
    echo "post-edit-format: npx not on PATH — skipping auto-fix." >&2
    exit 0
fi

# ── Auto-fix in place. Never fail the hook on lint issues that --fix can't fix ─
( cd "$FRONTEND_DIR" && npx eslint --fix "$FILE_PATH" >/dev/null 2>&1 ) || true

exit 0
