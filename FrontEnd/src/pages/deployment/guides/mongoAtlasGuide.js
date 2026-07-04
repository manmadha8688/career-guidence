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
          '✅ Free forever — no 30-day expiry like Render PostgreSQL',
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
          '   → Role: "Read and write to any database" (least privilege — your',
          '     app only needs read/write). Avoid "Atlas admin", which can also',
          '     delete databases and change cluster settings.',
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
