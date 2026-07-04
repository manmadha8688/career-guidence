export const SPRINGBOOT_GUIDE = [
  {
    phase: '01',
    title: 'Why Docker — Render has no native Java runtime',
    color: '#6DB33F',
    steps: [
      {
        label: 'Spring Boot on Render requires Docker — here is why',
        isText: true,
        text: [
          'Render supports Python, Node.js, Ruby, Go, and Rust natively.',
          'Java / Spring Boot is NOT in that list.',
          '',
          'This means you cannot just push code and click deploy.',
          'You must package your Spring Boot app inside a Docker container.',
          'Render then builds and runs the Docker image — no Java setup needed.',
          '',
          'This guide covers ALL Spring Boot project types:',
          '→ REST API (returns JSON — for React, Android, mobile frontend)',
          '→ MVC with Thymeleaf/JSP (returns HTML — full-stack in one app)',
          '→ Mixed (/api routes + template pages)',
          '',
          'The deployment process is identical for all three.',
          'Spring Boot handles routing internally — Render only sees one container.',
          '',
          'What you get free on Render:',
          '✅ Live HTTPS URL — your-api.onrender.com',
          '✅ Auto-deploy on every GitHub push',
          '✅ Free PostgreSQL or MongoDB Atlas',
          '✅ 512 MB RAM — enough for a tuned Spring Boot app',
          '',
          'You do NOT need to know Docker deeply.',
          'This guide gives you the exact Dockerfile — copy and deploy.',
        ],
        note: 'Docker is the only supported way to deploy Spring Boot on Render. This is also true of AWS, GCP, and most modern cloud platforms — learning Docker deployment is a real skill.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Before deployment — checklist',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Verify your project is ready before touching Render',
        isText: true,
        text: [
          '✅ Spring Boot app runs locally: mvn spring-boot:run',
          '✅ All API endpoints respond correctly (test with Postman)',
          '✅ No hard-coded passwords, secrets, or URLs in Java code',
          '',
          '✅ Docker Desktop is installed and running',
          '   Download: docs.docker.com/get-docker/',
          '   Verify: docker --version',
          '',
          '✅ pom.xml (or build.gradle) is up to date',
          '✅ .gitignore exists and excludes target/, .env, credentials',
          '',
          'Common mistakes to avoid:',
          '→ Hard-coding database URLs like "localhost:5432" in the code',
          '→ Putting JWT_SECRET or passwords inside application.properties',
          '→ Using spring.jpa.hibernate.ddl-auto=create-drop (destroys data on restart)',
        ],
        note: 'Install Docker Desktop before proceeding. You need it to test your Docker build locally and catch errors before they reach Render.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Add required dependencies to pom.xml',
    color: '#60A5FA',
    steps: [
      {
        label: 'Option A: PostgreSQL + H2 (SQL with local fallback)',
        isFile: true,
        fileName: 'pom.xml (add inside <dependencies>)',
        commands: [
          `<!-- PostgreSQL driver — for production on Render -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>

<!-- H2 in-memory database — for local development -->
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>

<!-- Spring Data JPA — if not already present -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>`,
        ],
        note: 'H2 in-memory database works locally without any setup. On Render, set SPRING_DATASOURCE_URL to PostgreSQL and Spring Boot switches automatically.',
      },
      {
        label: 'Option B: MongoDB (add instead of PostgreSQL)',
        isFile: true,
        fileName: 'pom.xml (add inside <dependencies>)',
        commands: [
          `<!-- Spring Data MongoDB — replaces JPA for MongoDB projects -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>

<!-- Remove spring-boot-starter-data-jpa, postgresql, and h2
     if you choose MongoDB — they are for SQL databases only -->`,
        ],
        note: 'Use MongoDB if your project uses @Document and MongoRepository. Use PostgreSQL if your project uses @Entity and JpaRepository. Do not mix both in the same project without extra config.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Configure application.properties',
    color: '#F59E0B',
    steps: [
      {
        label: 'application.properties for PostgreSQL + H2 fallback',
        isFile: true,
        fileName: 'src/main/resources/application.properties',
        commands: [
          `# ── Server ────────────────────────────────────────────────
server.port=\${PORT:8080}

# ── Database ──────────────────────────────────────────────
# Local: uses H2 in-memory (default, no setup needed)
# Render: set SPRING_DATASOURCE_URL, USERNAME, PASSWORD env vars

spring.datasource.url=\${SPRING_DATASOURCE_URL:jdbc:h2:mem:devdb;DB_CLOSE_DELAY=-1}
spring.datasource.username=\${SPRING_DATASOURCE_USERNAME:sa}
spring.datasource.password=\${SPRING_DATASOURCE_PASSWORD:}

# ── JPA — update = never drops data, safe for production
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.h2.console.enabled=false

# ── App secrets ────────────────────────────────────────────
jwt.secret=\${JWT_SECRET:local-dev-secret-only}
jwt.expiration=\${JWT_EXPIRATION:86400000}`,
        ],
        note: 'The ${VAR:default} syntax reads from environment variables with a fallback. Locally it uses H2. On Render, set SPRING_DATASOURCE_URL to your PostgreSQL URL and it switches automatically.',
      },
      {
        label: 'application.properties for MongoDB',
        isFile: true,
        fileName: 'src/main/resources/application.properties (MongoDB)',
        commands: [
          `server.port=\${PORT:8080}

# MongoDB — set SPRING_DATA_MONGODB_URI in Render env vars
spring.data.mongodb.uri=\${SPRING_DATA_MONGODB_URI:mongodb://localhost:27017/devdb}

# No spring.jpa.* settings needed for MongoDB
jwt.secret=\${JWT_SECRET:local-dev-secret-only}`,
        ],
        note: 'For MongoDB, no JPA/Hibernate settings are needed. Spring Data MongoDB connects using the URI and manages documents via @Document and MongoRepository.',
      },
      {
        label: 'Critical: never use create-drop in production',
        isText: true,
        text: [
          'spring.jpa.hibernate.ddl-auto controls what Hibernate does on startup.',
          '',
          'create-drop → DELETES all tables on every restart = data lost',
          'create      → DROPS and recreates tables = data lost',
          'update      → Creates/alters tables, NEVER deletes data ✅',
          'validate    → Only checks schema, no changes',
          '',
          'Always use: spring.jpa.hibernate.ddl-auto=update',
          'This is the only safe option for production.',
        ],
        note: 'If you deployed with create-drop or create, your database was wiped on every restart. Change to update immediately and redeploy.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Create .gitignore and Dockerfile',
    color: '#EC4899',
    steps: [
      {
        label: '.gitignore for Spring Boot',
        isFile: true,
        fileName: '.gitignore',
        commands: [
          `# Maven build output
target/
!.mvn/wrapper/maven-wrapper.jar

# Gradle build output
build/
.gradle/

# Environment variables
.env
.env.local

# IDE files
.idea/
*.iml
.classpath
.project

# OS files
.DS_Store
Thumbs.db

# Logs
*.log`,
        ],
        note: 'target/ contains your compiled JAR — often 30-50MB. The Dockerfile builds this inside the container, so you never need to commit it.',
      },
      {
        label: 'Dockerfile — multi-stage Maven build',
        isFile: true,
        fileName: 'Dockerfile',
        commands: [
          `# ── Stage 1: Build the JAR with Maven ────────────────────
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Download dependencies first (cached layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Build the JAR
COPY src ./src
RUN mvn clean package -DskipTests -B

# ── Stage 2: Run with slim JRE ────────────────────────────
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080

# CRITICAL: -Xmx256m keeps memory under Render's 512MB limit
ENTRYPOINT ["java", "-Xmx256m", "-Xms128m", "-jar", "app.jar"]`,
        ],
        note: 'CRITICAL: The -Xmx256m flag is mandatory for Render free tier. Without it, Spring Boot exceeds 512MB and Render kills the container with an out-of-memory error.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Test Docker build locally',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Build and run Docker image locally',
        commands: [
          `# Build the image (5-10 min first time — downloads dependencies)
docker build -t my-spring-app .`,
          `# Run locally
docker run -p 8080:8080 my-spring-app`,
          `# Test at http://localhost:8080`,
          `# Stop the container
docker stop $(docker ps -q --filter "ancestor=my-spring-app")`,
        ],
        note: 'If the Docker build fails, the error message tells you exactly what is wrong. Fix locally — do not push until docker build succeeds and the app runs.',
      },
    ],
  },

  {
    phase: '07',
    title: 'Push to GitHub',
    color: '#60A5FA',
    steps: [
      {
        label: 'Push project to GitHub',
        commands: [
          `git init`,
          `git add .`,
          `git status`,
          `git commit -m "spring boot app with Dockerfile ready for Render"`,
          `git branch -M main`,
          `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git`,
          `git push -u origin main`,
        ],
        note: 'After git add . run git status and verify target/ and .env are NOT staged. The Dockerfile MUST be visible at the repository root after pushing.',
      },
    ],
  },

  {
    phase: '08',
    title: 'If you accidentally pushed a secret to GitHub',
    color: '#EF4444',
    steps: [
      {
        label: 'Act immediately — revoke and clean',
        commands: [
          `git rm --cached .env`,
          `git commit -m "remove .env from git tracking"`,
          `git push`,
          `git log --all -- .env`,
        ],
        note: '⚠️  Treat any pushed secret as already compromised. Revoke it at the provider dashboard immediately, then clean Git tracking. See the React guide\'s "If you accidentally pushed a secret" phase for full history-cleanup steps (git rm --cached, git-filter-repo).',
      },
    ],
  },

  {
    phase: '09',
    title: 'Database — PostgreSQL or MongoDB Atlas',
    color: '#A78BFA',
    steps: [
      {
        label: 'Option A: Render PostgreSQL (easiest)',
        isText: true,
        text: [
          '1. render.com → New → PostgreSQL → Free plan → Create',
          '2. Copy the Internal Database URL after creation',
          '3. Build your SPRING_DATASOURCE_URL:',
          '   jdbc:postgresql://dpg-xxx.render.com:5432/dbname?sslmode=require',
          '   (add "jdbc:" at the start, remove user:pass from URL, add ?sslmode=require)',
          '4. Add separately:',
          '   SPRING_DATASOURCE_USERNAME = your_username',
          '   SPRING_DATASOURCE_PASSWORD = your_password',
          '',
          '⚠️  Render free PostgreSQL expires after 30 days.',
          '   Export before expiry: pg_dump DATABASE_URL > backup.sql',
        ],
        note: 'Use the Internal Database URL (not External) when both your app and database are on Render. It is faster and stays within Render\'s private network.',
      },
      {
        label: 'Option B: Neon PostgreSQL (0.5GB/project, data preserved)',
        isText: true,
        text: [
          '1. neon.tech → Sign up free',
          '2. Create project → copy connection string:',
          '   postgresql://user:pass@ep-xxx.aws.neon.tech/neondb?sslmode=require',
          '3. Build SPRING_DATASOURCE_URL:',
          '   jdbc:postgresql://ep-xxx.aws.neon.tech/neondb?sslmode=require',
          '4. Set SPRING_DATASOURCE_USERNAME and SPRING_DATASOURCE_PASSWORD separately',
        ],
        note: 'Neon is better for long-term projects. 0.5GB/project, data preserved, no credit card.',
      },
      {
        label: 'Option C: MongoDB Atlas (NoSQL, free forever)',
        isText: true,
        text: [
          '1. cloud.mongodb.com → Sign up free',
          '2. Create M0 cluster → add user → allow 0.0.0.0/0',
          '3. Connect → Drivers → Java → copy connection string:',
          '   mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/mydb?retryWrites=true&w=majority',
          '4. Add as SPRING_DATA_MONGODB_URI in Render env vars',
        ],
        note: 'MongoDB Atlas M0 is 512MB, free forever. Use this if your project uses @Document and MongoRepository.',
      },
    ],
  },

  {
    phase: '10',
    title: 'Deploy on Render — Docker Web Service',
    color: '#4ADE80',
    steps: [
      {
        label: 'Create Docker Web Service on Render',
        isText: true,
        text: [
          '1. render.com → New → Web Service',
          '2. Connect your GitHub repository',
          '3. Configure:',
          '   Name:    your-spring-api',
          '   Runtime: Docker  ← MUST select Docker, not Python/Node',
          '   Branch:  main',
          '',
          '   Build Command: leave EMPTY (Dockerfile handles the build)',
          '   Start Command: leave EMPTY (Dockerfile ENTRYPOINT handles startup)',
          '',
          '4. Click "Create Web Service"',
          '',
          'First build takes 5-10 minutes:',
          '→ Render clones your repo',
          '→ Runs docker build (downloads Maven + dependencies)',
          '→ Starts the container',
          '',
          'Your app goes live at: https://your-spring-api.onrender.com',
        ],
        note: 'Build Command and Start Command fields MUST be empty for Docker services. If filled, Render ignores them anyway — the Dockerfile controls everything.',
      },
    ],
  },

  {
    phase: '11',
    title: 'Add environment variables in Render',
    color: '#60A5FA',
    steps: [
      {
        label: 'Add all required variables',
        isText: true,
        text: [
          'Render → your service → Environment tab → Add:',
          '',
          'For PostgreSQL:',
          '   SPRING_DATASOURCE_URL      = jdbc:postgresql://host:5432/db?sslmode=require',
          '   SPRING_DATASOURCE_USERNAME = your_username',
          '   SPRING_DATASOURCE_PASSWORD = your_password',
          '',
          'For MongoDB:',
          '   SPRING_DATA_MONGODB_URI = mongodb+srv://user:pass@cluster.xxx.mongodb.net/mydb',
          '',
          'For JWT (if using auth):',
          '   JWT_SECRET = (50+ random chars)',
          '',
          'IMPORTANT: SPRING_DATASOURCE_URL format:',
          '   Must start with jdbc:postgresql://',
          '   NOT the plain postgresql:// format that Render/Neon provides',
          '   Add jdbc: at the start and remove user:pass from the URL',
          '   Add ?sslmode=require at the end',
          '',
          'Example conversion:',
          '   Render gives: postgresql://user:pass@host:5432/db',
          '   You set:      jdbc:postgresql://host:5432/db?sslmode=require',
          '   Plus:         SPRING_DATASOURCE_USERNAME = user',
          '   Plus:         SPRING_DATASOURCE_PASSWORD = pass',
        ],
        note: 'The JDBC URL conversion is the most common mistake for students deploying Spring Boot. Add "jdbc:" at start, remove credentials from URL, add "?sslmode=require" at end.',
      },
    ],
  },

  {
    phase: '12',
    title: 'Verify live Spring Boot API',
    color: '#34D399',
    steps: [
      {
        label: 'Test your live API after deployment',
        isText: true,
        text: [
          '✅ API root: https://your-spring-api.onrender.com',
          '✅ Health (if Spring Actuator): https://your-spring-api.onrender.com/actuator/health',
          '✅ Your endpoints: test with Postman',
          '✅ Render Logs: no OOM errors, no DB connection errors',
          '',
          'First request may take 30-60 seconds:',
          '   Docker container cold start + JVM warmup.',
          '   This is normal for Render free tier.',
          '',
          'If container keeps restarting:',
          '   Check Render Logs for "Killed" or "OutOfMemoryError"',
          '   Reduce JVM memory: -Xmx200m -Xms100m in Dockerfile ENTRYPOINT',
        ],
        note: 'Check the Render Logs tab for startup errors. Spring Boot logs the full startup sequence including which datasource URL it connected to.',
      },
    ],
  },

  {
    phase: '13',
    title: 'Admin access in Spring Boot (no built-in superuser)',
    color: '#F59E0B',
    steps: [
      {
        label: 'Spring Boot admin access',
        isText: true,
        text: [
          'Spring Boot does not have a built-in admin panel like Django.',
          '',
          'If using Spring Security, your admin user is created via:',
          '→ Application startup logic (CommandLineRunner or ApplicationRunner)',
          '→ Database seeder with @PostConstruct',
          '→ Manual POST request to your register/create-user endpoint',
          '',
          'If using Spring Boot + Thymeleaf (full stack):',
          '→ Create your first admin via the registration form',
          '→ Or seed it in your DataInitializer class',
          '',
          'Never hardcode admin passwords in Java code.',
          'Always use environment variables.',
        ],
        note: 'Spring Boot does not have a built-in admin — you design your own admin logic. Use environment variables for any admin credentials.',
      },
    ],
  },

  {
    phase: '14',
    title: 'Free tier — 512 MB memory limit',
    color: '#4ADE80',
    steps: [
      {
        label: 'Memory management on Render free tier',
        isText: true,
        text: [
          'Render free tier gives 512 MB total RAM for OS + JVM + your app.',
          'Spring Boot without tuning can use 400-600 MB just for the JVM.',
          'If you exceed 512 MB, Render kills the container — app stops.',
          '',
          'The fix is already in the Dockerfile:',
          '   ENTRYPOINT ["java", "-Xmx256m", "-Xms128m", "-jar", "app.jar"]',
          '',
          '-Xmx256m = maximum heap (most objects live here)',
          '-Xms128m = starting heap size',
          '',
          'Memory breakdown:',
          '   OS + system:          ~50 MB',
          '   JVM non-heap (classes): ~80 MB',
          '   JVM heap (-Xmx256m):  256 MB max',
          '   Total:                ~386 MB — safely under 512 MB',
          '',
          'If container still crashes with OOM:',
          '   Try: -Xmx200m -Xms100m',
          '   Remove unused Spring Boot starters from pom.xml',
          '   Check for large in-memory caches at startup',
          '',
          'Free tier behavior:',
          '   Sleeps after 15 min inactivity → 30-60s cold start + JVM warmup',
          '   Use cron-job.org with /actuator/health to stay awake (optional)',
        ],
        note: 'Exit code 137 in Render Logs = killed by OS due to out of memory. Always add -Xmx256m. This is the most common Spring Boot failure on Render free tier.',
      },
    ],
  },

  {
    phase: '15',
    title: 'Common errors and fixes',
    color: '#F97316',
    steps: [
      {
        label: 'Dockerfile not found',
        isText: true,
        text: [
          'Problem: Render cannot find the Dockerfile.',
          'Cause: Dockerfile is not at the project root.',
          'Fix: Move Dockerfile to the same level as pom.xml.',
        ],
        note: '',
      },
      {
        label: 'Out of memory — container restarts',
        isText: true,
        text: [
          'Problem: App starts then crashes. Logs show "Killed" or exit code 137.',
          'Cause: JVM heap exceeds 512 MB Render free tier limit.',
          'Fix: In Dockerfile ENTRYPOINT:',
          '   ["java", "-Xmx200m", "-Xms100m", "-jar", "app.jar"]',
          'Commit and push.',
        ],
        note: '',
      },
      {
        label: 'Database connection failed',
        isText: true,
        text: [
          'Problem: App starts but DB connection fails.',
          '',
          'Cause 1: SPRING_DATASOURCE_URL uses wrong format.',
          '   Must start with jdbc:postgresql:// not postgresql://',
          '',
          'Cause 2: Missing ?sslmode=require',
          '   Append it to the JDBC URL.',
          '',
          'Cause 3: Credentials in env vars wrong.',
          '   Re-copy from Render/Neon dashboard.',
        ],
        note: '',
      },
      {
        label: 'Application returns 404 for all endpoints',
        isText: true,
        text: [
          'Problem: Docker deploys but all API calls return 404.',
          '',
          'Cause 1: Incorrect base URL path.',
          '   Check if controllers use @RequestMapping("/api") prefix.',
          '',
          'Cause 2: server.port is wrong.',
          '   Must be: server.port=${PORT:8080}',
          '   Render injects PORT — do NOT hardcode 8080.',
          '',
          'Cause 3: Component scan not finding controllers.',
          '   Main class must be in root package above all other packages.',
        ],
        note: '',
      },
    ],
  },
]


// ─── MongoDB Atlas ────────────────────────────────────────────────────────────
