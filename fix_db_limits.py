"""Fix all incorrect database free tier information in guideData.js.

Confirmed correct data (2025):
- Neon: 0.5GB per project (NOT 3GB), auto-suspends compute after 5 min (data always preserved)
- Render PostgreSQL: 30 days expiry (NOT 90 days), data permanently deleted after grace period
- MongoDB Atlas M0: 512MB, free forever, 1 free cluster per project
- Supabase: 500MB, pauses after 7 days DB inactivity, data preserved
"""

import re

with open('C:/manmadha/Student-project/FrontEnd/src/pages/deployment/guideData.js', 'r', encoding='utf-8') as f:
    content = f.read()

# ── Targeted replacements ─────────────────────────────────────────────────────

replacements = [
    # STACKS entries
    ("subtitle: 'Free SQL database — 3GB, never expires'",
     "subtitle: 'Free SQL database — 0.5GB/project, data safe'"),

    ("desc: 'Set up a free Neon PostgreSQL database (3GB, never expires). Connect it to Node.js (pg/Prisma), Python (psycopg2/SQLAlchemy), Django, FastAPI, Flask, and Spring Boot.'",
     "desc: 'Set up a free Neon PostgreSQL database (0.5GB per project, data preserved forever). Connect it to Node.js (pg/Prisma), Python (psycopg2/SQLAlchemy), Django, FastAPI, Flask, and Spring Boot.'"),

    ("subtitle: 'Free SQL database — 1GB, 90 days'",
     "subtitle: 'Free SQL database — 1GB, 30 days ⚠️'"),

    ("desc: 'Set up a free Render PostgreSQL database (1GB). Easy to link directly to Render backend services. Free tier expires after 90 days — best for demos and short-term projects.'",
     "desc: 'Set up a free Render PostgreSQL database (1GB). Easy to link to Render backend services. Free tier expires after 30 days and data is permanently deleted — best for short-term demos only.'"),

    ("tags: ['postgresql', 'sql', 'render', 'database', 'free', '90 days', 'node', 'python', 'django', 'spring boot']",
     "tags: ['postgresql', 'sql', 'render', 'database', 'free', '30 days', 'node', 'python', 'django', 'spring boot']"),

    # PLATFORMS sidebar
    ("desc: 'Serverless PostgreSQL — 3 GB free, never expires, better than Render free DB'",
     "desc: 'Serverless PostgreSQL — 0.5GB/project free, data preserved forever, compute auto-suspends when idle'"),

    ("free: '3 GB free, no expiry'",
     "free: '0.5 GB/project, data safe forever'"),

    # Django guide Phase 11 references
    ("'⚠️  Free Render PostgreSQL expires after 90 days.'",
     "'⚠️  Free Render PostgreSQL expires after 30 days.'"),

    ("note: 'Render PostgreSQL free: 1GB storage, expires in 90 days. Good for demos and learning projects. For long-term projects, use Neon.'",
     "note: 'Render PostgreSQL free: 1GB storage, expires in 30 days — data permanently deleted after grace period. Use Neon for any project lasting more than a month.'"),

    ("label: 'Option B: Neon PostgreSQL (3GB free, never expires)'",
     "label: 'Option B: Neon PostgreSQL (0.5GB/project, data preserved forever)'"),

    ("'→ Database never expires. 3GB storage free. No credit card.'",
     "'→ Data preserved forever. 0.5GB per project. No credit card.'"),

    ("'→ Render DB: easier setup (auto-link in dashboard), expires in 90 days'",
     "'→ Render DB: easier setup (auto-link in dashboard), expires in 30 days'"),

    ("'→ Neon: requires copy-paste setup, never expires, 3x more storage'",
     "'→ Neon: requires copy-paste setup, data preserved forever, auto-suspends after 5 min idle'"),

    # Checklist references
    ("'✅ PostgreSQL expires in 90 days (Render DB)'",
     "'✅ PostgreSQL expires in 30 days (Render DB) — data permanently deleted after grace period'"),

    # Common errors sections
    ("'Cause 4: Database has expired (90-day Render free tier limit).'",
     "'Cause 4: Database has expired (30-day Render free tier limit — data deleted permanently).'"),

    # Django fullstack guide references
    ("'⚠️  Render free PostgreSQL expires in 90 days.'",
     "'⚠️  Render free PostgreSQL expires in 30 days — data permanently deleted after grace period.'"),

    ("note: 'Render PostgreSQL: 1GB free, expires 90 days. Best for demos and project submissions where data lifespan does not matter.'",
     "note: 'Render PostgreSQL: 1GB free, expires 30 days — data permanently deleted. Use Neon for any project beyond a short demo.'"),

    ("note: 'Neon is the better choice for projects you plan to keep alive for months. 3GB free, no expiry, no credit card.'",
     "note: 'Neon is the better choice for long-term projects. 0.5GB per project, data preserved forever, compute auto-suspends when idle. No credit card.'"),

    # FastAPI/Flask guide Neon references
    ("'   3GB storage, never expires, serverless connection pooler.'",
     "'   0.5GB per project, data preserved forever, compute auto-suspends when idle.'"),

    ("'→ Neon (neon.tech): 3GB free, never expires, serverless'",
     "'→ Neon (neon.tech): 0.5GB/project, data preserved forever, auto-suspends'"),

    ("'→ Render PostgreSQL: 1GB free, expires 90 days'",
     "'→ Render PostgreSQL: 1GB free, expires 30 days (data permanently deleted)'"),

    ("'→ Neon (neon.tech): 3GB free, never expires'",
     "'→ Neon (neon.tech): 0.5GB per project, data preserved forever'"),

    ("'→ Render PostgreSQL: free, expires in 90 days'",
     "'→ Render PostgreSQL: free, expires in 30 days (data deleted permanently)'"),

    # Render Postgres guide Phase 01 - correct the expiry info
    ("'⚠️  Free Render PostgreSQL expires after 90 days.'",
     "'⚠️  Free Render PostgreSQL expires after 30 days.'"),

    # Neon guide Phase 01
    ("note: 'Neon is the best free PostgreSQL option for long-term student projects. Unlike Render PostgreSQL which expires after 90 days, Neon is permanent.'",
     "note: 'Neon is the best free PostgreSQL option for long-term student projects. Unlike Render PostgreSQL which permanently deletes data after 30 days, Neon data is preserved forever (compute just auto-suspends when idle).'"),

    ("'✅ Free forever — no 90-day expiry like Render PostgreSQL'",
     "'✅ Data preserved forever — no 30-day deletion like Render PostgreSQL'"),

    # Render guide incorrect 90-day references
    ("note: 'Neon is better for long-term projects. 3GB free, never expires, no credit card.'",
     "note: 'Neon is better for long-term projects. 0.5GB/project, data preserved forever, no credit card.'"),
]

count = 0
for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        count += 1
    else:
        print(f'NOT FOUND: {old[:60]}...')

# Also fix the NEON guide Phase 01 that says 3GB
content = content.replace(
    "'→ 3GB storage — plenty for student projects'",
    "'→ 0.5GB per project — enough for student demos'"
)
content = content.replace(
    "'   3GB storage, never expires, serverless connection pooler.'",
    "'   0.5GB per project, data preserved forever, auto-suspends compute.'"
)

# Fix remaining 90 day → 30 day (any missed)
content = re.sub(r'90[- ]day(?:s)?(?:\s+Render)', '30-day Render', content)
content = re.sub(r'90 days\b(?=[^a-zA-Z])', '30 days', content)
content = re.sub(r'90-day\b', '30-day', content)

# Fix remaining 3GB / 3 GB for Neon
content = content.replace("'3GB free, never expires'", "'0.5GB/project, data preserved'")
content = content.replace("'3 GB free, no expiry'", "'0.5GB/project, data safe forever'")

with open('C:/manmadha/Student-project/FrontEnd/src/pages/deployment/guideData.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f'Fixed {count} targeted replacements + regex cleanups.')

# Verify no 90-day remains
remaining_90 = [i+1 for i, l in enumerate(content.splitlines()) if '90 day' in l.lower() or '90-day' in l.lower()]
remaining_3gb = [i+1 for i, l in enumerate(content.splitlines()) if '3gb' in l.lower() or '3 gb' in l.lower()]
print(f'Remaining "90 day" lines: {remaining_90[:10]}')
print(f'Remaining "3GB/3 GB" lines: {remaining_3gb[:10]}')
