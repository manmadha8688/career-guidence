#!/usr/bin/env bash
# block-sensitive-writes.sh — PreToolUse hook for Claude Code
# BLOCKS (exit 2) writes/edits to sensitive files: local secret configs, env files,
# anything carrying MONGODB_URI / JWT_SECRET, production config, and DB migration/seed
# files (unless explicitly confirmed). Runs BEFORE the tool executes, so a block
# prevents the write entirely. Reads the target path + content from stdin JSON.
#
# Escape hatch: set ALLOW_SENSITIVE_WRITE=1 in the environment to bypass a legitimate
# edit (e.g. intentionally updating a seed file).
set -uo pipefail

# ── Read hook JSON from stdin ─────────────────────────────────────────────────
INPUT="$(cat)"

# ── Extract target path and (if any) the content being written ────────────────
extract_field() {
    local field="$1"
    if command -v jq >/dev/null 2>&1; then
        printf '%s' "$INPUT" | jq -r "$2" 2>/dev/null
    else
        printf '%s' "$INPUT" \
            | grep -oE "\"$field\"[[:space:]]*:[[:space:]]*\"[^\"]+\"" \
            | head -n1 \
            | sed -E 's/.*:[[:space:]]*"([^"]+)"/\1/'
    fi
}

if command -v jq >/dev/null 2>&1; then
    FILE_PATH="$(printf '%s' "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // empty' 2>/dev/null)"
    # content (Write) or new_string (Edit) — used for secret-token scanning.
    CONTENT="$(printf '%s' "$INPUT" | jq -r '.tool_input.content // .tool_input.new_string // empty' 2>/dev/null)"
else
    FILE_PATH="$(extract_field 'file_path' '')"
    [[ -z "$FILE_PATH" ]] && FILE_PATH="$(extract_field 'path' '')"
    # Grep fallback can't reliably isolate content; scan the whole payload instead.
    CONTENT="$INPUT"
fi

# ── No path → can't evaluate; allow (other hooks/permissions still apply) ─────
if [[ -z "${FILE_PATH:-}" ]]; then
    exit 0
fi

NORM_PATH="${FILE_PATH//\\//}"
BASENAME="${NORM_PATH##*/}"

block() {
    echo "BLOCKED: refusing to write $NORM_PATH"
    echo "Reason: $1"
    echo "Secrets and generated/migration data must not be edited by the agent."
    echo "If this is intentional, re-run with ALLOW_SENSITIVE_WRITE=1 or edit it manually."
    exit 2
}

# ── Explicit override ─────────────────────────────────────────────────────────
if [[ "${ALLOW_SENSITIVE_WRITE:-0}" == "1" ]]; then
    exit 0
fi

# ── Allowlist: sitemap is generated but safe to write ─────────────────────────
if [[ "$NORM_PATH" == *public/sitemap.xml ]]; then
    exit 0
fi

# ── Local secret / config files (exact + glob) ────────────────────────────────
case "$BASENAME" in
    application-local.properties)  block "local backend secrets (DB URI, JWT secret live here)";;
    CLAUDE.local.md)               block "gitignored local project secrets";;
    .env)                          block "environment file (secrets)";;
    .env.*)                        block "environment file variant (secrets)";;
    *.env)                         block "environment file (secrets)";;
esac

# application-*.properties for non-local profiles that hold prod config
if [[ "$BASENAME" =~ ^application-(prod|production).*\.properties$ ]]; then
    block "production Spring configuration"
fi

# ── Production config by path (generic catch) ─────────────────────────────────
if [[ "$NORM_PATH" == *"/prod/"* || "$NORM_PATH" == *".production."* ]]; then
    block "production configuration path"
fi

# ── DB migration / seed files (unless confirmed) ──────────────────────────────
# Java seeders (DataSeeder.java, *Seeder.java) and migration dirs.
if [[ "$BASENAME" =~ ([Ss]eeder|[Ss]eed)\.java$ || "$NORM_PATH" == *DataSeeder.java ]]; then
    block "database seed file — confirm intentional data changes first"
fi
if [[ "$NORM_PATH" == */migrations/* || "$NORM_PATH" == */migration/* || "$NORM_PATH" == */db/changelog/* ]]; then
    block "database migration file — confirm intentional schema/data changes first"
fi

# ── Content scan: never let a secret token land in ANY file ───────────────────
# Catches attempts to write MONGODB_URI / JWT_SECRET (with a value) into any path.
if [[ -n "${CONTENT:-}" ]]; then
    if printf '%s' "$CONTENT" | grep -qE '(MONGODB_URI|JWT_SECRET|mongodb\+srv://[^ ]*:[^ ]*@)'; then
        block "content contains a secret (MONGODB_URI / JWT_SECRET / Atlas credential)"
    fi
fi

# ── Safe: allow the write ─────────────────────────────────────────────────────
exit 0
