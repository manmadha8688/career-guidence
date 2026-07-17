export const AIVEN_GUIDE = [
  {
    phase: '01',
    title: 'What is Aiven and why use it?',
    color: '#FF5C69',
    steps: [
      {
        label: 'Aiven — fully managed databases with a free plan, no credit card',
        isText: true,
        text: [
          'Aiven is a managed open-source data platform.',
          'It hosts and runs databases for you — you never manage a server.',
          'Free plans available for PostgreSQL, MySQL, and Valkey (Redis).',
          '',
          'What Aiven runs for you (free plans):',
          '→ PostgreSQL — the most popular open-source SQL database',
          '→ MySQL — classic relational database, great for LAMP-style apps',
          '→ Valkey — a Redis-compatible in-memory store (caching, sessions, queues)',
          '',
          'When to use Aiven:',
          '→ You want a managed SQL database and prefer a real UI + metrics',
          '→ You need MySQL specifically (many free options are Postgres-only)',
          '→ You want a free Redis-style cache (Valkey) alongside your database',
          '→ Django, Spring Boot + JPA, Prisma, or SQLAlchemy projects',
          '',
          'Why Aiven over other free databases:',
          '✅ Choice of engine — PostgreSQL, MySQL, or Valkey on the free plan',
          '✅ Free plan needs no credit card to start',
          '✅ Clean dashboard with connection info, metrics, and logs',
          '✅ Runs on major clouds (AWS/GCP) in a region you pick',
          '',
          'Free plan (honest limits):',
          '   Single-node service with a modest amount of storage',
          '   Great for student projects, demos, and small apps',
          '   For production scale you upgrade to a paid plan later',
        ],
        note: 'Aiven is one of the few free options that lets you choose PostgreSQL, MySQL, OR a Redis-compatible cache (Valkey). If your project specifically needs MySQL or a free cache, Aiven is an excellent pick.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Create your free Aiven service',
    color: '#FF5C69',
    steps: [
      {
        label: 'Step-by-step: create an Aiven service and get the connection string',
        isText: true,
        text: [
          '1. Go to aiven.io → click "Get started for free"',
          '   Sign up with GitHub, Google, or email — no credit card for the free plan',
          '',
          '2. Create a new service:',
          '   → Click "Create service"',
          '   → Choose a service type: PostgreSQL (recommended), MySQL, or Valkey',
          '   → Select the "Free plan" (look for the plan marked Free)',
          '   → Cloud + region: pick the region nearest your deployment',
          '   → Give the service a name, e.g. "myproject-db"',
          '   → Click "Create service"',
          '',
          '3. Wait for the service to build:',
          '   → Status goes from "Rebuilding" → "Running" (takes a couple of minutes)',
          '',
          '4. Open the service → "Overview" tab → "Connection information":',
          '   → You will see Host, Port, User, Password, Database name, and SSL mode',
          '   → Switch the "Connection" dropdown to "Service URI" to get a full string',
          '   → A PostgreSQL URI looks like:',
          '   postgres://avnadmin:PASSWORD@myproject-db-xxx.aivencloud.com:12345/defaultdb?sslmode=require',
          '',
          '5. Store this as DATABASE_URL in:',
          '   → .env file (local)',
          '   → Render / Vercel / Railway environment variables (production)',
        ],
        note: 'Aiven always uses SSL. Keep ?sslmode=require in the URL — without it, the connection is rejected. Copy the password from the dashboard; it is only fully shown there.',
      },
      {
        label: 'Understanding the Aiven connection string',
        isText: true,
        text: [
          'postgres://avnadmin:PASSWORD@myproject-db-xxx.aivencloud.com:12345/defaultdb?sslmode=require',
          '',
          'Breaking it down:',
          '   postgres://       = protocol (postgres:// and postgresql:// are equivalent)',
          '   avnadmin          = the default Aiven admin username',
          '   :PASSWORD         = your service password (from the dashboard)',
          '   @...aivencloud.com = the Aiven service hostname',
          '   :12345            = the port (Aiven uses a non-standard port — always include it)',
          '   /defaultdb        = the default database name',
          '   ?sslmode=require  = SSL required (always needed on Aiven)',
          '',
          'For MySQL the URI looks like:',
          '   mysql://avnadmin:PASSWORD@myproject-db-xxx.aivencloud.com:12345/defaultdb?ssl-mode=REQUIRED',
          '',
          'For Spring Boot, convert to JDBC format:',
          '   jdbc:postgresql://myproject-db-xxx.aivencloud.com:12345/defaultdb?sslmode=require',
          '   (add "jdbc:" at the start, remove avnadmin:PASSWORD@ from the URL)',
          '   Set user/password as separate env vars:',
          '   SPRING_DATASOURCE_USERNAME = avnadmin',
          '   SPRING_DATASOURCE_PASSWORD = your_aiven_password',
        ],
        note: 'Aiven uses a non-standard port (not 5432/3306). Always keep the :PORT in your connection string or the connection will fail.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Connect Aiven to Node.js / Express',
    color: '#68A063',
    steps: [
      {
        label: 'Option A: Using Prisma ORM (recommended)',
        commands: [
          `npm install prisma @prisma/client`,
          `npx prisma init`,
        ],
        note: 'Prisma init creates a prisma/schema.prisma file and adds DATABASE_URL to .env. Paste your Aiven Service URI as DATABASE_URL.',
      },
      {
        label: 'Prisma schema and push to Aiven',
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
        note: 'After editing schema.prisma: run "npx prisma db push" to create tables in Aiven. Run "npx prisma generate" to update the client. Run "npx prisma studio" to view your data. For MySQL, change provider = "mysql".',
      },
      {
        label: 'Push schema and use Prisma in Express',
        commands: [
          `# Push schema to Aiven (creates tables)
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
        note: 'Use Pool (not Client) for Express apps — it manages multiple connections efficiently. ssl: { rejectUnauthorized: false } is needed for Aiven SSL.',
      },
      {
        label: '.env for local development',
        isFile: true,
        fileName: '.env',
        commands: [
          `DATABASE_URL=postgres://avnadmin:PASSWORD@myproject-db-xxx.aivencloud.com:12345/defaultdb?sslmode=require`,
        ],
        note: '',
      },
    ],
  },

  {
    phase: '04',
    title: 'Connect Aiven to Python',
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
        note: 'psycopg2-binary is the standard PostgreSQL driver. For MySQL on Aiven use "pip install PyMySQL" instead. asyncpg is the async alternative for FastAPI.',
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
        note: 'After defining models, run db.create_all() inside the app context to create tables in Aiven. Or use Flask-Migrate for proper migration management.',
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
    "postgres://", "postgresql+asyncpg://"
).replace("postgresql://", "postgresql+asyncpg://")

engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session`,
        ],
        note: 'For async SQLAlchemy, the URL prefix must be postgresql+asyncpg://. The .replace() calls convert Aiven\'s postgres:// URI into the async format.',
      },
      {
        label: '.env for local development',
        isFile: true,
        fileName: '.env',
        commands: [
          `DATABASE_URL=postgres://avnadmin:PASSWORD@myproject-db-xxx.aivencloud.com:12345/defaultdb?sslmode=require`,
        ],
        note: '',
      },
    ],
  },

  {
    phase: '05',
    title: 'Connect Aiven to Django',
    color: '#34D399',
    steps: [
      {
        label: 'Django + Aiven — managed relational database',
        commands: [
          `pip install psycopg2-binary dj-database-url python-decouple`,
          `pip freeze > requirements.txt`,
        ],
        note: 'Django is built for relational databases. Aiven PostgreSQL is a great managed option. For MySQL on Aiven, install mysqlclient instead of psycopg2-binary.',
      },
      {
        label: 'Configure settings.py for Aiven',
        isFile: true,
        fileName: 'settings.py',
        commands: [
          `import dj_database_url
from decouple import config

# Local: SQLite | Production: Aiven PostgreSQL
DATABASES = {
    "default": dj_database_url.config(
        default=config("DATABASE_URL", default="sqlite:///db.sqlite3"),
        conn_max_age=600,
        ssl_require=not config("DEBUG", default=False, cast=bool),
    )
}`,
        ],
        note: 'dj_database_url parses the DATABASE_URL connection string. Locally it falls back to SQLite. In production it uses your Aiven service. Aiven requires SSL, so keep ssl_require on in production.',
      },
      {
        label: 'Run migrations on Aiven',
        commands: [
          `python manage.py makemigrations`,
          `python manage.py migrate`,
        ],
        note: 'Set DATABASE_URL in your .env before running migrate locally against Aiven. Or let Render run migrations automatically in the Build Command.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Connect Aiven to Spring Boot',
    color: '#6DB33F',
    steps: [
      {
        label: 'Spring Boot + Aiven setup',
        isFile: true,
        fileName: 'src/main/resources/application.properties',
        commands: [
          `# Server
server.port=\${PORT:8080}

# Aiven PostgreSQL — JDBC format (different from the standard Aiven URI)
spring.datasource.url=\${SPRING_DATASOURCE_URL:jdbc:h2:mem:devdb;DB_CLOSE_DELAY=-1}
spring.datasource.username=\${SPRING_DATASOURCE_USERNAME:sa}
spring.datasource.password=\${SPRING_DATASOURCE_PASSWORD:}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false`,
        ],
        note: 'In production, set SPRING_DATASOURCE_URL to the JDBC format: jdbc:postgresql://myproject-db-xxx.aivencloud.com:12345/defaultdb?sslmode=require',
      },
      {
        label: 'Convert the Aiven URI to JDBC format',
        isText: true,
        text: [
          'Aiven gives you:',
          '   postgres://avnadmin:pass@myproject-db-xxx.aivencloud.com:12345/defaultdb?sslmode=require',
          '',
          'Spring Boot needs:',
          '   jdbc:postgresql://myproject-db-xxx.aivencloud.com:12345/defaultdb?sslmode=require',
          '',
          'Conversion steps:',
          '1. Add "jdbc:postgresql://" at the beginning (note: postgresql, not postgres)',
          '2. Remove "avnadmin:pass@" from the URL (use separate env vars)',
          '3. Keep the :12345 port — Aiven uses a non-standard port',
          '4. Keep "?sslmode=require" at the end',
          '',
          'Set in your host\'s Environment Variables:',
          '   SPRING_DATASOURCE_URL = jdbc:postgresql://...aivencloud.com:12345/defaultdb?sslmode=require',
          '   SPRING_DATASOURCE_USERNAME = avnadmin',
          '   SPRING_DATASOURCE_PASSWORD = your_aiven_password',
        ],
        note: 'The two most common Aiven + Spring Boot mistakes: forgetting the "jdbc:postgresql://" prefix, and dropping the non-standard port. Keep both and it connects cleanly.',
      },
    ],
  },
]
