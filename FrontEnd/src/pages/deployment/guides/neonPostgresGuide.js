export const NEON_POSTGRES_GUIDE = [
  {
    phase: '01',
    title: 'What is Neon and why use it?',
    color: '#A78BFA',
    steps: [
      {
        label: 'Neon — serverless PostgreSQL, 0.5GB/project, data preserved forever',
        isText: true,
        text: [
          'Neon is a serverless PostgreSQL database service.',
          'Free tier: 0.5GB/project, data preserved, no credit card.',
          '',
          'When to use PostgreSQL (SQL / relational):',
          '→ Structured data with clear relationships (users → orders → products)',
          '→ Complex queries, JOINs, aggregations',
          '→ Django ORM projects (Django is built for SQL)',
          '→ Spring Boot + JPA projects',
          '→ Prisma ORM with Node.js/Next.js',
          '→ Any project where data structure is well-defined',
          '',
          'Why Neon over Render PostgreSQL:',
          '✅ 0.5GB/project (vs 1GB Render)',
          '✅ Never expires (vs 30-day Render expiry)',
          '✅ Serverless — scales to zero, no idle cost',
          '✅ Branching feature — create DB branches like Git branches',
          '✅ Works perfectly with Vercel serverless functions',
          '',
          'Free tier:',
          '   0.5GB per project (5GB aggregate across 10 projects), data preserved forever',
          '   Free forever, no credit card',
        ],
        note: 'Neon is the best free PostgreSQL option for long-term student projects. Unlike Render PostgreSQL which expires after 30 days, Neon is permanent.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Create your free Neon project',
    color: '#A78BFA',
    steps: [
      {
        label: 'Step-by-step: create Neon project and get connection string',
        isText: true,
        text: [
          '1. Go to neon.tech → click "Sign Up"',
          '   Use GitHub or email — no credit card needed',
          '',
          '2. After signup, click "Create a project"',
          '   → Project name: e.g. "myproject"',
          '   → PostgreSQL version: 16 (latest)',
          '   → Region: choose nearest to your deployment (AWS us-east-1 for Render)',
          '   → Click "Create project"',
          '',
          '3. Neon creates your database automatically:',
          '   → Database name: neondb (default)',
          '   → Role: your username',
          '   → Connection string shown immediately',
          '',
          '4. Copy the connection string from "Connection Details":',
          '   → Select your database in the dropdown',
          '   → Choose connection type: "Connection string"',
          '   → It looks like:',
          '   postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require',
          '',
          '5. Store this as DATABASE_URL in:',
          '   → .env file (local)',
          '   → Render/Vercel environment variables (production)',
        ],
        note: '?sslmode=require at the end of the URL is important — always include it. Without SSL, Neon rejects the connection.',
      },
      {
        label: 'Understanding the Neon connection string',
        isText: true,
        text: [
          'postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require',
          '',
          'Breaking it down:',
          '   postgresql://    = protocol',
          '   user             = your Neon username',
          '   :password        = your Neon password',
          '   @ep-xxx...       = the Neon endpoint hostname',
          '   /neondb          = database name',
          '   ?sslmode=require = SSL required (always needed)',
          '',
          'For Spring Boot, the JDBC format is different:',
          '   jdbc:postgresql://ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require',
          '   (add "jdbc:" at the start, remove user:password from URL)',
          '   Set user/password as separate env vars:',
          '   SPRING_DATASOURCE_USERNAME = your_neon_user',
          '   SPRING_DATASOURCE_PASSWORD = your_neon_password',
          '',
          'Neon also provides a pooled connection URL for serverless:',
          '   postgresql://user:password@ep-xxx-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
          '   Use the pooled URL for Vercel serverless functions (Next.js API routes)',
          '   Use the direct URL for traditional servers (Render, etc.)',
        ],
        note: 'Use the pooled connection URL for Vercel/serverless deployments. It prevents connection exhaustion when many serverless functions connect simultaneously.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Connect Neon to Node.js / Express',
    color: '#68A063',
    steps: [
      {
        label: 'Option A: Using Prisma ORM (recommended)',
        commands: [
          `npm install prisma @prisma/client`,
          `npx prisma init`,
        ],
        note: 'Prisma init creates a prisma/schema.prisma file and adds DATABASE_URL to .env. Move DATABASE_URL to .env.local for Next.js projects.',
      },
      {
        label: 'Prisma schema and push to Neon',
        isFile: true,
        fileName: 'prisma/schema.prisma',
        commands: [
          `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
}`,
        ],
        note: 'After editing schema.prisma: run "npx prisma db push" to create tables in Neon. Run "npx prisma generate" to update the Prisma client. Run "npx prisma studio" to view your data.',
      },
      {
        label: 'Push schema and use Prisma in Express',
        commands: [
          `# Push schema to Neon (creates tables)
npx prisma db push`,
          `# Generate Prisma client
npx prisma generate`,
        ],
        note: '',
      },
      {
        label: 'Use Prisma in routes',
        isFile: true,
        fileName: 'routes/users.js',
        commands: [
          `const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.post('/', async (req, res) => {
  const user = await prisma.user.create({ data: req.body });
  res.status(201).json(user);
});

module.exports = router;`,
        ],
        note: 'Create one PrismaClient instance and reuse it. Creating a new PrismaClient per request causes too many database connections.',
      },
      {
        label: 'Option B: Using raw pg (no ORM)',
        commands: [
          `npm install pg dotenv`,
        ],
        note: '',
      },
      {
        label: 'Connect with raw pg',
        isFile: true,
        fileName: 'database.js',
        commands: [
          `const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;`,
        ],
        note: 'Use Pool (not Client) for Express apps — it manages multiple connections efficiently. ssl: { rejectUnauthorized: false } is needed for Neon SSL.',
      },
      {
        label: '.env for local development',
        isFile: true,
        fileName: '.env',
        commands: [
          `DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`,
        ],
        note: '',
      },
    ],
  },

  {
    phase: '04',
    title: 'Connect Neon to Python',
    color: '#009688',
    steps: [
      {
        label: 'Install PostgreSQL drivers for Python',
        commands: [
          `# For Flask / FastAPI basic:
pip install psycopg2-binary python-decouple`,
          `# For SQLAlchemy ORM (Flask or FastAPI):
pip install sqlalchemy psycopg2-binary python-decouple`,
          `# For async FastAPI with SQLAlchemy:
pip install sqlalchemy asyncpg python-decouple`,
          `pip freeze > requirements.txt`,
        ],
        note: 'psycopg2-binary is the standard PostgreSQL driver for Python. asyncpg is the async alternative for FastAPI.',
      },
      {
        label: 'Flask — connect with SQLAlchemy',
        isFile: true,
        fileName: 'database.py',
        commands: [
          `from flask_sqlalchemy import SQLAlchemy
from decouple import config

db = SQLAlchemy()

def init_db(app):
    app.config["SQLALCHEMY_DATABASE_URI"] = config("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)`,
        ],
        note: 'Flask-SQLAlchemy integrates SQLAlchemy with Flask. Call init_db(app) in your app factory or main app.py file.',
      },
      {
        label: 'Flask — define a model',
        isFile: true,
        fileName: 'models/user.py',
        commands: [
          `from database import db
from datetime import datetime

class User(db.Model):
    __tablename__ = "users"
    id         = db.Column(db.Integer, primary_key=True)
    name       = db.Column(db.String(100), nullable=False)
    email      = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "email": self.email}`,
        ],
        note: 'After defining models, run db.create_all() inside the app context to create tables in Neon. Or use Flask-Migrate for proper migration management.',
      },
      {
        label: 'FastAPI — async SQLAlchemy',
        isFile: true,
        fileName: 'database.py',
        commands: [
          `from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker
from decouple import config

DATABASE_URL = config("DATABASE_URL").replace(
    "postgresql://", "postgresql+asyncpg://"
)

engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session`,
        ],
        note: 'For async SQLAlchemy, the URL prefix must be postgresql+asyncpg:// instead of postgresql://. The .replace() handles the conversion from the standard DATABASE_URL format.',
      },
      {
        label: '.env for local development',
        isFile: true,
        fileName: '.env',
        commands: [
          `DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`,
        ],
        note: '',
      },
    ],
  },

  {
    phase: '05',
    title: 'Connect Neon to Django',
    color: '#34D399',
    steps: [
      {
        label: 'Django + Neon — perfect combination',
        commands: [
          `pip install psycopg2-binary dj-database-url python-decouple`,
          `pip freeze > requirements.txt`,
        ],
        note: 'Django is built for relational databases. PostgreSQL + Django is the industry-standard combination. Neon is the best free PostgreSQL option for Django.',
      },
      {
        label: 'Configure settings.py for Neon',
        isFile: true,
        fileName: 'settings.py',
        commands: [
          `import dj_database_url
from decouple import config

# Local: SQLite | Production: Neon PostgreSQL
DATABASES = {
    "default": dj_database_url.config(
        default=config("DATABASE_URL", default="sqlite:///db.sqlite3"),
        conn_max_age=600,
        ssl_require=not config("DEBUG", default=False, cast=bool),
    )
}`,
        ],
        note: 'dj_database_url automatically parses the DATABASE_URL connection string. Locally it falls back to SQLite. In production (Render), it uses Neon PostgreSQL.',
      },
      {
        label: 'Run migrations on Neon',
        commands: [
          `python manage.py makemigrations`,
          `python manage.py migrate`,
        ],
        note: 'Set DATABASE_URL in your .env before running migrate locally against Neon. Or let Render run migrations automatically in the Build Command.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Connect Neon to Spring Boot',
    color: '#6DB33F',
    steps: [
      {
        label: 'Spring Boot + Neon setup',
        isFile: true,
        fileName: 'src/main/resources/application.properties',
        commands: [
          `# Server
server.port=\${PORT:8080}

# Neon PostgreSQL — JDBC format (different from standard PostgreSQL URL)
spring.datasource.url=\${SPRING_DATASOURCE_URL:jdbc:h2:mem:devdb;DB_CLOSE_DELAY=-1}
spring.datasource.username=\${SPRING_DATASOURCE_USERNAME:sa}
spring.datasource.password=\${SPRING_DATASOURCE_PASSWORD:}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false`,
        ],
        note: 'In Render, set SPRING_DATASOURCE_URL to the JDBC format: jdbc:postgresql://ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require',
      },
      {
        label: 'Convert Neon URL to JDBC format',
        isText: true,
        text: [
          'Neon gives you:',
          '   postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require',
          '',
          'Spring Boot needs:',
          '   jdbc:postgresql://ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require',
          '',
          'Conversion steps:',
          '1. Add "jdbc:" at the beginning',
          '2. Remove "user:pass@" from the URL (use separate env vars)',
          '3. Keep "?sslmode=require" at the end',
          '',
          'Set in Render Environment Variables:',
          '   SPRING_DATASOURCE_URL = jdbc:postgresql://ep-xxx.../neondb?sslmode=require',
          '   SPRING_DATASOURCE_USERNAME = your_neon_username',
          '   SPRING_DATASOURCE_PASSWORD = your_neon_password',
        ],
        note: 'This JDBC URL conversion is the most common mistake for Spring Boot + Neon/PostgreSQL. Always add "jdbc:" prefix and remove credentials from the URL.',
      },
    ],
  },
]

// ─── Supabase ─────────────────────────────────────────────────────────────────
