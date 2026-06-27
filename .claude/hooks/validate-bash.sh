#!/bin/bash
# validate-bash.sh — Pre-command hook for Claude Code
# Blocks dangerous commands before they execute

COMMAND="$1"

# ── Destructive file operations ───────────────────────────────────────────────
if echo "$COMMAND" | grep -qE "rm\s+-rf\s+[/.]"; then
    echo "BLOCKED: rm -rf on path — verify this is intentional before running manually"
    exit 1
fi

if echo "$COMMAND" | grep -qE "git\s+reset\s+--hard"; then
    echo "BLOCKED: git reset --hard — this discards uncommitted work. Run manually if intended."
    exit 1
fi

if echo "$COMMAND" | grep -qE "git\s+clean\s+-f"; then
    echo "BLOCKED: git clean -f — this deletes untracked files. Run manually if intended."
    exit 1
fi

# ── Dangerous git operations ──────────────────────────────────────────────────
if echo "$COMMAND" | grep -qE "git\s+push\s+--force\s+origin\s+main"; then
    echo "BLOCKED: force push to main — never force push to main branch."
    exit 1
fi

if echo "$COMMAND" | grep -qE "git\s+push\s+-f\s+origin\s+main"; then
    echo "BLOCKED: force push to main — never force push to main branch."
    exit 1
fi

# ── Database destruction ──────────────────────────────────────────────────────
if echo "$COMMAND" | grep -qE "dropDatabase|db\.drop\(\)"; then
    echo "BLOCKED: database drop command detected. Run manually with extreme caution."
    exit 1
fi

# ── Secret exposure ───────────────────────────────────────────────────────────
if echo "$COMMAND" | grep -qE "cat\s+.*\.env$|cat\s+.*\.env\.local"; then
    echo "WARNING: Reading .env file — ensure output is not logged or shared."
    # Allow but warn
fi

# ── Production-only safeguards ────────────────────────────────────────────────
if echo "$COMMAND" | grep -qE "mongosh.*learnData_db.*drop\|delete"; then
    echo "BLOCKED: Destructive MongoDB operation on production database detected."
    exit 1
fi

# ── Safe: allow all other commands ───────────────────────────────────────────
exit 0
