"""Append 4 database guides to guideData.js."""

DB_GUIDES = r"""

// ─── MongoDB Atlas ────────────────────────────────────────────────────────────
export const MONGODB_ATLAS_GUIDE = [
  {
    phase: '01',
    title: 'What is MongoDB Atlas and why use it?',
    color: '#00ED64',
    steps: [
      {
        label: 'MongoDB Atlas — free NoSQL cloud database, forever',
        isText: true,
        text: [
          'MongoDB Atlas is the official cloud database service for MongoDB.',
          'M0 free cluster: 512MB storage, free forever, no credit card needed.',
          '',
          'When to use MongoDB (NoSQL):',
          '→ Flexible, changing data structures (no fixed schema)',
          '→ JSON-like documents — great for user profiles, posts, configs',
          '→ Node.js/Express projects (MERN stack)',
          '→ Python projects with varying document shapes',
          '→ When you do not need complex SQL JOINs',
          '',
          'When NOT to use MongoDB:',
          '→ Highly relational data (users → orders → products with JOINs)',
          '→ Financial/accounting systems needing strict ACID transactions',
          '→ When your framework assumes SQL (Django ORM, Spring JPA)',
          '',
          'Free tier highlights:',
          '✅ 512MB storage — plenty for student projects',
          '✅ Free forever — no 90-day expiry like Render PostgreSQL',
          '✅ No credit card required',
          '✅ Hosted on AWS/Azure/GCP globally',
          '✅ Works with every backend framework',
        ],
        note: 'MongoDB Atlas M0 is the most popular free database for student projects. It never expires and requires zero maintenance.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Create your free MongoDB Atlas cluster',
    color: '#00ED64',
    steps: [
      {
        label: 'Step-by-step: create M0 free cluster',
        isText: true,
        text: [
          '1. Go to cloud.mongodb.com → click "Sign Up"',
          '   Use Google or email — no credit card needed',
          '',
          '2. After signup, click "Create" to make a cluster',
          '   → Select M0 Free tier',
          '   → Choose a Cloud Provider (AWS recommended)',
          '   → Choose the region nearest to you or your users',
          '   → Cluster name: leave default or name it "myproject-cluster"',
          '   → Click "Create Deployment"',
          '',
          '3. Create a database user:',
          '   → Username: e.g. myappuser',
          '   → Password: click "Autogenerate Secure Password"',
          '   → COPY and SAVE this password immediately — not shown again',
          '   → Role: "Atlas admin" (full access for student projects)',
          '   → Click "Create Database User"',
          '',
          '4. Set up Network Access:',
          '   → Click "Network Access" in the left menu',
          '   → Click "Add IP Address"',
          '   → Click "Allow Access from Anywhere"',
          '   → This adds 0.0.0.0/0 (required for Render/Vercel dynamic IPs)',
          '   → Click "Confirm"',
          '',
          '5. Get your connection string:',
          '   → Clusters → click "Connect" on your cluster',
          '   → Select "Drivers"',
          '   → Driver: Node.js (or Python, Java depending on your stack)',
          '   → Copy the connection string',
        ],
        note: 'Always click "Allow Access from Anywhere" (0.0.0.0/0) for deployment platforms like Render and Vercel. They use dynamic IPs that change on every restart — whitelisting a single IP fails.',
      },
      {
        label: 'Build your final MONGODB_URI',
        isText: true,
        text: [
          'Atlas gives you a template like:',
          '   mongodb+srv://myappuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority',
          '',
          'You need to:',
          '1. Replace <password> with your actual password',
          '2. Add your database name before the ?',
          '',
          'Final MONGODB_URI:',
          '   mongodb+srv://myappuser:yourpassword@cluster0.xxxxx.mongodb.net/mydbname?retryWrites=true&w=majority',
          '',
          'The database name (mydbname) is created automatically',
          'when your app first writes data to it.',
          '',
          'Store this string as MONGODB_URI in:',
          '→ .env file (local development)',
          '→ Render Environment Variables (production)',
          '→ Vercel Environment Variables (if using Next.js)',
          '',
          'NEVER put MONGODB_URI in your code files.',
          'NEVER commit it to GitHub.',
          'NEVER use NEXT_PUBLIC_ prefix — it exposes DB credentials in browser.',
        ],
        note: 'Special characters in the password (@ # % etc.) must be URL-encoded. To avoid this, regenerate the password until you get one with only letters and numbers.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Connect MongoDB to Node.js / Express',
    color: '#68A063',
    steps: [
      {
        label: 'Install Mongoose and connect',
        commands: [
          `npm install mongoose dotenv`,
        ],
        note: 'Mongoose is the most popular MongoDB ODM for Node.js. It provides schema definitions, validation, and query helpers on top of the raw MongoDB driver.',
      },
      {
        label: 'server.js — connect with Mongoose',
        isFile: true,
        fileName: 'server.js',
        commands: [
          `const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err.message));`,
        ],
        note: 'Call mongoose.connect() once at startup. Mongoose maintains a connection pool — you do not call it again per request.',
      },
      {
        label: 'Define a model and use it',
        isFile: true,
        fileName: 'models/User.js',
        commands: [
          `const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);`,
        ],
        note: 'Mongoose automatically creates the collection name as the lowercase plural of the model name — "User" becomes "users" collection in MongoDB.',
      },
      {
        label: 'Example route using the model',
        isFile: true,
        fileName: 'routes/users.js',
        commands: [
          `const express = require('express');
const User    = require('../models/User');
const router  = express.Router();

// GET all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST create user
router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

module.exports = router;`,
        ],
        note: 'Always use async/await with Mongoose operations. Wrap in try/catch for production code to handle errors gracefully.',
      },
      {
        label: '.env for local development',
        isFile: true,
        fileName: '.env',
        commands: [
          `MONGODB_URI=mongodb+srv://myappuser:yourpassword@cluster0.xxxxx.mongodb.net/mydbname?retryWrites=true&w=majority`,
        ],
        note: '',
      },
    ],
  },

  {
    phase: '04',
    title: 'Connect MongoDB to Python (Flask & FastAPI)',
    color: '#009688',
    steps: [
      {
        label: 'Install the right driver for your framework',
        isText: true,
        text: [
          'Flask (synchronous WSGI):',
          '   pip install pymongo python-decouple',
          '   Use pymongo — it is synchronous, matches Flask',
          '',
          'FastAPI (asynchronous ASGI):',
          '   pip install motor python-decouple',
          '   Use motor — it is async, matches FastAPI',
          '',
          'Rule:',
          '→ Flask + pymongo  ✅',
          '→ FastAPI + motor  ✅',
          '→ Flask + motor    ❌ (async mismatch)',
          '→ FastAPI + pymongo ❌ (blocks event loop)',
          '',
          'After installing, run:',
          '   pip freeze > requirements.txt',
        ],
        note: 'Using the wrong driver (motor with Flask or pymongo with FastAPI) causes either blocking issues or compatibility errors. Match the driver to your framework.',
      },
      {
        label: 'Flask — connect with PyMongo',
        isFile: true,
        fileName: 'app.py',
        commands: [
          `from flask import Flask, jsonify
from pymongo import MongoClient
from decouple import config

app = Flask(__name__)

mongodb_uri = config("MONGODB_URI", default=None)
db_name     = config("DB_NAME", default="mydb")

if mongodb_uri:
    client = MongoClient(mongodb_uri)
    db = client[db_name]
    users_collection = db["users"]
    print("MongoDB connected")

@app.route("/api/users")
def get_users():
    users = list(users_collection.find({}, {"_id": 0}))
    return jsonify(users)`,
        ],
        note: 'MongoClient creates a connection pool at module level — it is shared across all requests. Do not create a new MongoClient per request.',
      },
      {
        label: 'FastAPI — connect with Motor (async)',
        isFile: true,
        fileName: 'main.py',
        commands: [
          `from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from decouple import config

app = FastAPI()

@app.on_event("startup")
async def startup_db():
    mongodb_uri = config("MONGODB_URI", default=None)
    if mongodb_uri:
        app.mongodb_client = AsyncIOMotorClient(mongodb_uri)
        app.mongodb = app.mongodb_client[config("DB_NAME", default="mydb")]
        print("MongoDB connected")

@app.on_event("shutdown")
async def shutdown_db():
    if hasattr(app, "mongodb_client"):
        app.mongodb_client.close()

@app.get("/api/users")
async def get_users():
    users = await app.mongodb["users"].find({}, {"_id": 0}).to_list(100)
    return users`,
        ],
        note: 'Motor is fully async — all database operations use await. Open the connection on startup, close on shutdown. This is the correct pattern for FastAPI + MongoDB.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Connect MongoDB to Django',
    color: '#34D399',
    steps: [
      {
        label: 'Use Djongo or MongoEngine with Django',
        isText: true,
        text: [
          'Django is built for SQL databases (PostgreSQL, MySQL, SQLite).',
          'Using MongoDB with Django requires a third-party connector.',
          '',
          'Option A — Djongo (maps Django ORM to MongoDB):',
          '   pip install djongo',
          '   Works with Django migrations but has limitations',
          '',
          'Option B — MongoEngine (separate ODM for Django):',
          '   pip install mongoengine',
          '   More stable, but uses different syntax from Django ORM',
          '',
          'Option C — Use PyMongo directly (no ORM):',
          '   pip install pymongo',
          '   Full control, manual queries, best for simple use cases',
          '',
          'Honest recommendation for students:',
          '→ If your project needs MongoDB → use FastAPI or Flask, not Django',
          '→ Django with MongoDB is possible but adds complexity',
          '→ Django is designed for SQL — use PostgreSQL (Neon) with Django',
        ],
        note: 'For new Django projects: use PostgreSQL (Neon or Render) — it integrates perfectly with Django ORM. Reserve MongoDB for Node.js, FastAPI, or Flask projects.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Connect MongoDB to Spring Boot',
    color: '#6DB33F',
    steps: [
      {
        label: 'Spring Data MongoDB setup',
        isFile: true,
        fileName: 'src/main/resources/application.properties',
        commands: [
          `# MongoDB connection
spring.data.mongodb.uri=\${SPRING_DATA_MONGODB_URI:mongodb://localhost:27017/devdb}

# The URI above uses the SPRING_DATA_MONGODB_URI env var in production
# Locally falls back to local MongoDB (if installed) or embedded`,
        ],
        note: 'Set SPRING_DATA_MONGODB_URI in Render environment variables with your full Atlas connection string.',
      },
      {
        label: 'Add dependency and create a Document',
        isFile: true,
        fileName: 'pom.xml + User.java',
        commands: [
          `<!-- Add to pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>`,
          `// User.java — MongoDB document
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    // getters + setters
}`,
          `// UserRepository.java
import org.springframework.data.mongodb.repository.MongoRepository;
public interface UserRepository extends MongoRepository<User, String> {}`,
        ],
        note: 'Spring Data MongoDB works almost identically to Spring Data JPA — just replace @Entity with @Document and JpaRepository with MongoRepository.',
      },
    ],
  },

  {
    phase: '07',
    title: 'Security, tips, and common mistakes',
    color: '#EF4444',
    steps: [
      {
        label: 'Security rules for MongoDB Atlas',
        isText: true,
        text: [
          '✅ Use a strong autogenerated password (letters + numbers only)',
          '✅ Store MONGODB_URI only in .env and deployment env vars',
          '✅ Add .env to .gitignore before your first commit',
          '✅ Never log MONGODB_URI in console.log or print statements',
          '',
          '⚠️  0.0.0.0/0 network access:',
          '   Allows any IP to attempt a connection.',
          '   Your DB password is the real security — make it strong.',
          '   For student demos: acceptable.',
          '   For real production: restrict to known IPs when possible.',
          '',
          'Common mistakes:',
          '',
          'Forgetting the database name in URI:',
          '   Wrong: .../mongodb.net/?retryWrites=true',
          '   Right: .../mongodb.net/mydbname?retryWrites=true',
          '',
          'Special characters in password:',
          '   @ # % in password breaks the URI.',
          '   Fix: autogenerate a new password with only letters/numbers.',
          '',
          'Network Access blocking deployment server:',
          '   Fix: Atlas → Network Access → allow 0.0.0.0/0.',
          '',
          'Wrong driver (motor vs pymongo):',
          '   Flask = pymongo (sync)',
          '   FastAPI = motor (async)',
        ],
        note: 'MongoDB Atlas M0 free tier is 512MB and never expires. It is the most reliable free database choice for student projects across all frameworks.',
      },
    ],
  },
]

// ─── Neon PostgreSQL ──────────────────────────────────────────────────────────
export const NEON_POSTGRES_GUIDE = [
  {
    phase: '01',
    title: 'What is Neon and why use it?',
    color: '#A78BFA',
    steps: [
      {
        label: 'Neon — serverless PostgreSQL, free forever, 3GB',
        isText: true,
        text: [
          'Neon is a serverless PostgreSQL database service.',
          'Free tier: 3GB storage, never expires, no credit card.',
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
          '✅ 3GB free (vs 1GB Render)',
          '✅ Never expires (vs 90-day Render expiry)',
          '✅ Serverless — scales to zero, no idle cost',
          '✅ Branching feature — create DB branches like Git branches',
          '✅ Works perfectly with Vercel serverless functions',
          '',
          'Free tier:',
          '   3GB storage, 1 project, unlimited databases in project',
          '   Free forever, no credit card',
        ],
        note: 'Neon is the best free PostgreSQL option for long-term student projects. Unlike Render PostgreSQL which expires after 90 days, Neon is permanent.',
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
export const SUPABASE_GUIDE = [
  {
    phase: '01',
    title: 'What is Supabase and why use it?',
    color: '#3ECF8E',
    steps: [
      {
        label: 'Supabase — PostgreSQL + Auth + Storage, free forever',
        isText: true,
        text: [
          'Supabase is an open-source Firebase alternative built on PostgreSQL.',
          'Free tier: 500MB database, 5GB file storage, 50MB edge function size.',
          '',
          'What Supabase gives you beyond a database:',
          '✅ PostgreSQL database — standard SQL, works with any ORM',
          '✅ Auto-generated REST API — instant CRUD without writing backend code',
          '✅ Built-in authentication — email, Google, GitHub, etc.',
          '✅ File storage — upload images, PDFs, and other files',
          '✅ Realtime subscriptions — listen to database changes live',
          '✅ Edge functions — serverless JavaScript functions',
          '',
          'Best use cases for students:',
          '→ Next.js full-stack apps with auth',
          '→ React apps that need a backend without building one',
          '→ Rapid prototypes with auth + database together',
          '→ Projects needing file upload/storage',
          '',
          'Free tier:',
          '   2 projects, 500MB database, never expires, no credit card',
          '   Projects pause after 1 week of inactivity (free tier)',
          '   Restore from dashboard — takes ~1 minute',
        ],
        note: 'Supabase free projects pause after 1 week of inactivity. You can resume them from the Supabase dashboard — it takes about 1 minute. Paid projects never pause.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Create your free Supabase project',
    color: '#3ECF8E',
    steps: [
      {
        label: 'Step-by-step: create Supabase project',
        isText: true,
        text: [
          '1. supabase.com → click "Start your project"',
          '   Sign in with GitHub (recommended) — no credit card needed',
          '',
          '2. Click "New project"',
          '   → Organization: your personal org',
          '   → Project name: e.g. "myproject"',
          '   → Database password: click "Generate a password" → SAVE IT',
          '   → Region: choose nearest to your deployment',
          '   → Click "Create new project" — takes ~2 minutes to set up',
          '',
          '3. Get your connection details:',
          '   → Left sidebar → Settings → Database',
          '   → Scroll to "Connection string"',
          '   → Select "URI" tab',
          '   → Copy: postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres',
          '   → Replace [YOUR-PASSWORD] with the password you saved',
          '',
          '4. Also get the Supabase API credentials (for Supabase client):',
          '   → Left sidebar → Settings → API',
          '   → Copy: Project URL and anon/public key',
          '   → These are used with the Supabase JavaScript/Python client',
        ],
        note: 'Save your database password when creating the project — Supabase shows it only once. If you forget it, reset it in Settings → Database → Reset database password.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Connect Supabase to Next.js / React',
    color: '#60A5FA',
    steps: [
      {
        label: 'Install Supabase client and configure',
        commands: [
          `npm install @supabase/supabase-js`,
        ],
        note: '',
      },
      {
        label: 'Create Supabase client',
        isFile: true,
        fileName: 'lib/supabase.js',
        commands: [
          `import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);`,
        ],
        note: 'NEXT_PUBLIC_ prefix is safe here — the Supabase anon/public key is designed to be exposed in the browser. It has Row Level Security (RLS) to restrict data access.',
      },
      {
        label: '.env.local for Next.js',
        isFile: true,
        fileName: '.env.local',
        commands: [
          `# Public — safe to expose (Supabase anon key is designed to be public)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Private — never expose (for server-side only)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:[password]@db.xxxxx.supabase.co:5432/postgres`,
        ],
        note: 'NEXT_PUBLIC_ vars go to the browser. SUPABASE_SERVICE_ROLE_KEY is PRIVATE — never use NEXT_PUBLIC_ prefix for it. Service role key bypasses Row Level Security.',
      },
      {
        label: 'Query data with Supabase client',
        isFile: true,
        fileName: 'pages/api/users.js (Next.js API route)',
        commands: [
          `import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  }

  if (req.method === 'POST') {
    const { data, error } = await supabase
      .from('users')
      .insert(req.body)
      .select();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }
}`,
        ],
        note: 'The Supabase client auto-generates REST API calls. .from("users").select("*") is equivalent to SELECT * FROM users.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Connect Supabase to Node.js / Python',
    color: '#68A063',
    steps: [
      {
        label: 'Node.js — use as standard PostgreSQL',
        isText: true,
        text: [
          'Supabase is PostgreSQL — you can use it with any PostgreSQL client.',
          '',
          'With Prisma:',
          '   DATABASE_URL=postgresql://postgres:[pass]@db.xxxxx.supabase.co:5432/postgres',
          '   npx prisma db push',
          '',
          'With raw pg:',
          '   const pool = new Pool({ connectionString: process.env.DATABASE_URL });',
          '',
          'With Supabase JS client:',
          '   npm install @supabase/supabase-js',
          '   const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)',
          '',
          'The Supabase JS client also gives you auth:',
          '   const { data, error } = await supabase.auth.signUp({ email, password })',
          '   const { data, error } = await supabase.auth.signInWithPassword({ email, password })',
        ],
        note: 'For Node.js with Express: use the DATABASE_URL with Prisma or pg. For Next.js with auth: use the Supabase JS client which bundles auth + database in one.',
      },
      {
        label: 'Python — connect as standard PostgreSQL',
        isText: true,
        text: [
          'Supabase is standard PostgreSQL — any Python PostgreSQL library works.',
          '',
          'With Django:',
          '   DATABASE_URL=postgresql://postgres:[pass]@db.xxxxx.supabase.co:5432/postgres',
          '   Add to settings.py with dj-database-url',
          '',
          'With SQLAlchemy (Flask/FastAPI):',
          '   from decouple import config',
          '   DATABASE_URL = config("DATABASE_URL")',
          '   engine = create_engine(DATABASE_URL)',
          '',
          'With psycopg2:',
          '   import psycopg2',
          '   conn = psycopg2.connect(os.environ["DATABASE_URL"])',
          '',
          'Supabase also has an official Python client:',
          '   pip install supabase',
          '   from supabase import create_client',
          '   supabase = create_client(SUPABASE_URL, SUPABASE_KEY)',
        ],
        note: 'For Django and FastAPI: use DATABASE_URL with SQLAlchemy or dj-database-url. For quick CRUD without writing SQL: use the supabase Python client.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Supabase Auth — built-in authentication',
    color: '#EC4899',
    steps: [
      {
        label: 'Using Supabase Auth with Next.js',
        isText: true,
        text: [
          'Supabase provides authentication out of the box:',
          '→ Email + password',
          '→ Magic link (email)',
          '→ OAuth: Google, GitHub, Discord, etc.',
          '',
          'Install Supabase Auth helpers for Next.js:',
          '   npm install @supabase/ssr @supabase/supabase-js',
          '',
          'Sign up:',
          '   const { data, error } = await supabase.auth.signUp({',
          '     email: "user@example.com",',
          '     password: "securepassword123"',
          '   })',
          '',
          'Sign in:',
          '   const { data, error } = await supabase.auth.signInWithPassword({',
          '     email: "user@example.com",',
          '     password: "securepassword123"',
          '   })',
          '',
          'Get current user:',
          '   const { data: { user } } = await supabase.auth.getUser()',
          '',
          'Sign out:',
          '   await supabase.auth.signOut()',
          '',
          'All auth handles JWT tokens automatically.',
          'Row Level Security (RLS) uses auth to restrict data access.',
        ],
        note: 'Supabase Auth eliminates the need to build your own auth system. For student projects needing login/register, Supabase is the fastest way to add auth.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Free tier limitations',
    color: '#F97316',
    steps: [
      {
        label: 'Supabase free tier — honest details',
        isText: true,
        text: [
          'What is free:',
          '   2 projects, 500MB database, 5GB file storage',
          '   50,000 monthly active users for auth',
          '   500K edge function invocations',
          '   Free forever — no 90-day expiry',
          '',
          'Important limitation — project pausing:',
          '   Free projects pause after 1 week of inactivity',
          '   Paused project = database not accessible',
          '   Resume from Supabase dashboard → takes ~1 minute',
          '   The pause resets after every access',
          '',
          'For student demos:',
          '   Open your Supabase project in the browser before a demo',
          '   Or make an API call once a week to prevent pausing',
          '',
          'Upgrade to Pro ($25/month) to prevent pausing.',
          '',
          'When to use Supabase vs Neon:',
          '→ Neon: pure PostgreSQL, never pauses, great for backend apps',
          '→ Supabase: PostgreSQL + auth + storage, may pause, great for Next.js full-stack',
        ],
        note: 'The 1-week inactivity pause is the main limitation of Supabase free tier. For actively developed projects, this is rarely an issue since dev activity keeps the project alive.',
      },
    ],
  },
]

// ─── Render PostgreSQL ────────────────────────────────────────────────────────
export const RENDER_POSTGRES_GUIDE = [
  {
    phase: '01',
    title: 'What is Render PostgreSQL and when to use it?',
    color: '#4ADE80',
    steps: [
      {
        label: 'Render PostgreSQL — easiest setup when using Render backend',
        isText: true,
        text: [
          'Render offers a free PostgreSQL database service.',
          '',
          'Key facts:',
          '✅ Free tier: 1GB storage',
          '✅ Easiest setup when your backend is also on Render',
          '✅ Internal URL: faster connections within Render network',
          '✅ Auto-linked to Render web services',
          '',
          '⚠️  Important limitation:',
          '   Render free PostgreSQL expires after 90 DAYS',
          '   After 90 days, the database is DELETED permanently',
          '   All data is lost if not backed up before expiry',
          '   You get email warnings before expiry',
          '',
          'When to use Render PostgreSQL:',
          '→ Short-term demos and college project submissions',
          '→ When you want the simplest possible setup (auto-link feature)',
          '→ When data beyond 90 days does not matter',
          '',
          'When NOT to use Render PostgreSQL:',
          '→ Projects you want to keep alive long-term',
          '→ When you cannot afford to lose data',
          '',
          'Better alternatives for persistent data:',
          '→ Neon: 3GB free, never expires ← use this for long-term projects',
          '→ Supabase: 500MB free, never expires (may pause)',
        ],
        note: '⚠️  The 90-day expiry is the most important thing to know about Render PostgreSQL. Set a calendar reminder on day 80 to back up your data or migrate to Neon.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Create Render PostgreSQL database',
    color: '#4ADE80',
    steps: [
      {
        label: 'Step-by-step: create free Render PostgreSQL',
        isText: true,
        text: [
          '1. render.com → sign in with GitHub',
          '',
          '2. Click "New" → "PostgreSQL"',
          '   → Name: e.g. "myproject-db"',
          '   → Database: e.g. "mydb" (leave blank for auto-name)',
          '   → User: e.g. "mydbuser" (leave blank for auto-name)',
          '   → Region: same region as your web service',
          '   → PostgreSQL Version: 16 (latest)',
          '   → Plan: Free',
          '   → Click "Create Database"',
          '',
          '3. After creation, you see connection details:',
          '   → Internal Database URL — use this if app is ALSO on Render',
          '   → External Database URL — use this for local development',
          '   → Hostname, Port, Database, Username, Password shown separately',
          '',
          '4. Copy the relevant URL:',
          '   → For Render backend (same account):',
          '      Use Internal URL (stays within Render network, faster + free)',
          '   → For local development or Vercel/other hosts:',
          '      Use External URL',
        ],
        note: 'Always use the Internal Database URL when your web service and database are both on Render. It is faster (private network) and does not count against your bandwidth.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Auto-link to Render Web Service',
    color: '#4ADE80',
    steps: [
      {
        label: 'The easiest connection — auto-link in Render dashboard',
        isText: true,
        text: [
          'Render has a feature that auto-fills DATABASE_URL for you:',
          '',
          '1. In your Render Web Service → click "Environment" tab',
          '2. Click "Add from Database"',
          '3. Select your PostgreSQL database from the dropdown',
          '4. Select "DATABASE_URL" from the connection types',
          '5. Render automatically sets DATABASE_URL to the Internal URL',
          '',
          'This is why Render PostgreSQL is the easiest option when',
          'your backend is also on Render — no copy-pasting credentials.',
          '',
          'After clicking Save:',
          '→ DATABASE_URL is set in your web service environment',
          '→ Render triggers a redeployment',
          '→ Your app connects to PostgreSQL automatically',
        ],
        note: 'The auto-link feature is unique to Render PostgreSQL. Neon and Supabase require manual copy-paste of connection strings. For quick setup on Render: use auto-link.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Connect Render PostgreSQL to your backend',
    color: '#60A5FA',
    steps: [
      {
        label: 'Node.js — with Prisma',
        isText: true,
        text: [
          'DATABASE_URL is already set via auto-link (see Phase 03).',
          '',
          'prisma/schema.prisma:',
          '   datasource db {',
          '     provider = "postgresql"',
          '     url      = env("DATABASE_URL")',
          '   }',
          '',
          'Run: npx prisma db push',
          'Prisma creates tables in the Render database.',
        ],
        note: 'The DATABASE_URL from Render PostgreSQL Internal URL works directly with Prisma and pg without any modification.',
      },
      {
        label: 'Python/Django — with dj-database-url',
        isText: true,
        text: [
          'DATABASE_URL is set automatically by Render auto-link.',
          '',
          'In Django settings.py:',
          '   import dj_database_url',
          '   from decouple import config',
          '   DATABASES = {',
          '       "default": dj_database_url.config(',
          '           default=config("DATABASE_URL", default="sqlite:///db.sqlite3"),',
          '           conn_max_age=600,',
          '           ssl_require=True',
          '       )',
          '   }',
          '',
          'In Render Build Command:',
          '   pip install -r requirements.txt && python manage.py migrate',
          '',
          'Django migrations run automatically on every deploy.',
        ],
        note: 'ssl_require=True is important for Render PostgreSQL connections. Without SSL, the connection may be refused.',
      },
      {
        label: 'Spring Boot — JDBC URL conversion',
        isText: true,
        text: [
          'Render provides:',
          '   postgresql://user:pass@dpg-xxx.render.com:5432/mydb',
          '',
          'Spring Boot needs JDBC format:',
          '   jdbc:postgresql://dpg-xxx.render.com:5432/mydb',
          '',
          'In Render Environment Variables:',
          '   SPRING_DATASOURCE_URL = jdbc:postgresql://dpg-xxx.render.com:5432/mydb',
          '   SPRING_DATASOURCE_USERNAME = your_username',
          '   SPRING_DATASOURCE_PASSWORD = your_password',
          '',
          'Or use the auto-link + convert in application.properties:',
          '   spring.datasource.url=jdbc:postgresql://...',
        ],
        note: 'Render PostgreSQL does not need ?sslmode=require (unlike Neon) for internal connections. For external connections, you may want to add it.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Back up data before 90-day expiry',
    color: '#EF4444',
    steps: [
      {
        label: 'Export your data before the database expires',
        isText: true,
        text: [
          'Render sends warning emails before the 90-day expiry.',
          'If you do not act, the database and ALL data are permanently deleted.',
          '',
          'Option 1: Export with pg_dump (command line):',
          '   pg_dump -h HOST -U USER -d DBNAME -f backup.sql',
          '   (Copy HOST, USER, DBNAME from Render PostgreSQL dashboard)',
          '',
          'Option 2: Export from Render dashboard:',
          '   Render → PostgreSQL → your database → Settings → Export data',
          '',
          'Option 3: Migrate to Neon (free, never expires):',
          '   1. Create a Neon project',
          '   2. Export from Render: pg_dump ... > backup.sql',
          '   3. Import to Neon: psql NEON_DATABASE_URL < backup.sql',
          '   4. Update DATABASE_URL in your Render web service to Neon URL',
          '   5. Redeploy',
          '',
          'Set a calendar reminder for day 80 (10 days before expiry).',
          '',
          'Best practice: for any project beyond a demo,',
          'start with Neon (free forever) instead of Render PostgreSQL.',
        ],
        note: 'The 90-day expiry applies only to the FREE tier Render PostgreSQL. Paid Render PostgreSQL plans do not expire.',
      },
    ],
  },
]
"""

with open('C:/manmadha/Student-project/FrontEnd/src/pages/deployment/guideData.js', 'a', encoding='utf-8') as f:
    f.write(DB_GUIDES)

print('Done. 4 database guides appended.')
