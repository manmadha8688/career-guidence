export const DOCKER_GUIDE = [
  {
    phase: '01',
    title: 'What is Docker and why should you care?',
    color: '#2496ED',
    steps: [
      {
        label: 'Containers — "it works on my machine", solved',
        isText: true,
        text: [
          'A container is your app plus EVERYTHING it needs to run — the code, the',
          'runtime (Node/Python/Java), the libraries, the system packages — bundled',
          'into one portable box. That box runs the same way on your laptop, on a',
          "friend's PC, and on a cloud server. No more \"but it works on my machine\".",
          '',
          'The three words you must not mix up:',
          '→ Dockerfile — a text recipe describing how to build your app box',
          '→ Image — the built box (a frozen snapshot). You build it once.',
          '→ Container — a running instance of an image. You can run many.',
          '   Analogy: Dockerfile = recipe, Image = the cake, Container = a slice',
          '   you are actually eating right now.',
          '',
          'Container vs Virtual Machine (why containers won):',
          '→ A VM ships a WHOLE operating system → gigabytes, slow to boot',
          '→ A container SHARES the host OS kernel → megabytes, boots in ms',
          '',
          'Why students should learn it:',
          '→ Some hosts (like Render for Java/Spring Boot) REQUIRE a Dockerfile',
          '→ Interviews and real jobs assume you know the basics',
          '→ "docker run" locally = a clean, reproducible environment every time',
        ],
        note: 'You do not need to master Docker to deploy most apps — Vercel/Render auto-detect Node and Python. But the moment you hit "there is no native runtime for my language" (Java on Render) or "I need Redis + Postgres running locally", Docker is the answer.',
      },
      {
        label: 'Install Docker Desktop and verify',
        commands: [
          `# Windows / macOS: install "Docker Desktop" from docker.com
# Linux: install "Docker Engine" from docs.docker.com/engine/install

# Verify it is running:
docker --version`,
          `# Run the classic smoke test — pulls a tiny image and prints a message
docker run hello-world`,
        ],
        note: 'On Windows, Docker Desktop uses WSL 2 under the hood — accept the WSL prompt during install. If "docker run hello-world" prints a welcome message, your install works.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Your first Dockerfile — a Node.js app',
    color: '#68A063',
    steps: [
      {
        label: 'Anatomy of a Dockerfile (read the comments)',
        isFile: true,
        fileName: 'Dockerfile',
        commands: [
          `# 1. Start FROM a base image (an OS + Node already installed)
FROM node:20-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy ONLY package files first (smart layer caching — see the note)
COPY package*.json ./

# 4. Install dependencies
RUN npm ci --omit=dev

# 5. Now copy the rest of your source code
COPY . .

# 6. Document which port your app listens on
EXPOSE 3000

# 7. The command that starts your app when the container runs
CMD ["node", "server.js"]`,
        ],
        note: 'Copying package.json BEFORE the rest of the code is the key trick: Docker caches each step as a "layer". If your code changes but dependencies do not, Docker reuses the cached npm install layer and rebuilds in seconds instead of minutes.',
      },
      {
        label: 'The instructions you will actually use',
        isText: true,
        text: [
          'FROM   — the base image to build on (node:20-alpine, python:3.12-slim)',
          'WORKDIR— sets/creates the folder commands run in inside the container',
          'COPY   — copy files from your machine into the image',
          'RUN    — run a command AT BUILD TIME (install deps, compile)',
          'EXPOSE — documents the port (does not actually publish it)',
          'ENV    — set an environment variable inside the image',
          'CMD    — the default command run WHEN the container starts',
          'ENTRYPOINT — like CMD but harder to override (for wrapper scripts)',
          '',
          'RUN vs CMD (a classic confusion):',
          '→ RUN happens once, while BUILDING the image (e.g. npm install)',
          '→ CMD happens every time you START a container (e.g. node server.js)',
          '',
          'Why "-alpine" / "-slim" tags?',
          '→ They are tiny base images → smaller, faster, more secure builds',
          '→ node:20 is ~1GB; node:20-alpine is ~130MB. Prefer the small ones.',
        ],
        note: 'Pin a specific version tag (node:20-alpine, not node:latest). "latest" silently changes over time and will eventually break your build when you least expect it.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Dockerfiles for Python and Java',
    color: '#009688',
    steps: [
      {
        label: 'Python (Flask / FastAPI / Django)',
        isFile: true,
        fileName: 'Dockerfile',
        commands: [
          `FROM python:3.12-slim

WORKDIR /app

# Copy requirements first for layer caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the code
COPY . .

EXPOSE 8000

# gunicorn for Flask/Django, uvicorn for FastAPI
# Flask:   CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]
# FastAPI: CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]`,
        ],
        note: 'Bind to 0.0.0.0 (all interfaces), NOT 127.0.0.1. Inside a container, 127.0.0.1 is only reachable from within the container itself — the outside world can never connect. This is the #1 "my container runs but I cannot reach it" bug.',
      },
      {
        label: 'Java (Spring Boot) — multi-stage build',
        isFile: true,
        fileName: 'Dockerfile',
        commands: [
          `# ---- Stage 1: build the jar with Maven ----
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline      # cache dependencies
COPY src ./src
RUN mvn clean package -DskipTests

# ---- Stage 2: tiny runtime image with just the jar ----
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]`,
        ],
        note: 'This is a MULTI-STAGE build: stage 1 has the full Maven + JDK toolchain to build the jar; stage 2 copies ONLY the finished jar into a small JRE image. The final image is a fraction of the size because none of the build tools ship to production.',
      },
      {
        label: 'Why multi-stage builds matter',
        isText: true,
        text: [
          'Without multi-stage: your image includes the compiler, build tools,',
          'caches — hundreds of MB you never need at runtime.',
          '',
          'With multi-stage: you build in a fat image, then copy just the output',
          '(the .jar, the compiled binary, the built /dist) into a lean image.',
          '',
          'Same idea works for a React build inside Docker:',
          '→ Stage 1: node image runs "npm run build" → produces /dist',
          '→ Stage 2: nginx image serves the static /dist folder',
        ],
        note: 'Multi-stage builds are the single biggest lever for small, secure images. Ship only what you run — never the tools you used to build it.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Build, run & .dockerignore',
    color: '#F59E0B',
    steps: [
      {
        label: 'Build an image and run a container',
        commands: [
          `# Build an image and tag it "myapp" (the "." = build using the
# Dockerfile in the current folder)
docker build -t myapp .`,
          `# Run it: map host port 3000 → container port 3000
docker run -p 3000:3000 myapp`,
          `# Run in the background (detached) and name it
docker run -d --name myapp-1 -p 3000:3000 myapp`,
          `# Pass environment variables in
docker run -p 3000:3000 -e DATABASE_URL=... -e NODE_ENV=production myapp`,
        ],
        note: 'The -p flag is HOST:CONTAINER. "-p 3000:3000" means "requests to localhost:3000 on my machine go to port 3000 inside the container". If your app runs on 8000 inside, use "-p 3000:8000" to still reach it at localhost:3000.',
      },
      {
        label: 'Everyday container commands',
        commands: [
          `docker ps                 # list running containers`,
          `docker ps -a              # list ALL containers (incl. stopped)`,
          `docker logs myapp-1       # view a container's logs`,
          `docker logs -f myapp-1    # follow logs live (like tail -f)`,
          `docker exec -it myapp-1 sh  # open a shell INSIDE the container`,
          `docker stop myapp-1       # stop it`,
          `docker rm myapp-1         # remove the stopped container`,
          `docker images             # list images you have built/pulled`,
          `docker system prune       # clean up dangling images/containers`,
        ],
        note: 'docker exec -it <name> sh drops you into a shell inside a running container — invaluable for debugging "is the file actually there? is the env var set?" questions.',
      },
      {
        label: 'Always add a .dockerignore',
        isFile: true,
        fileName: '.dockerignore',
        commands: [
          `node_modules
npm-debug.log
.git
.gitignore
.env
.env.*
dist
build
*.md
.vscode
__pycache__
*.pyc
target`,
        ],
        note: 'Like .gitignore but for Docker builds. It stops huge/secret folders (node_modules, .git, .env) from being copied into the image. This makes builds faster, images smaller, and prevents accidentally baking secrets into a shared image.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Docker Compose — multiple services at once',
    color: '#A78BFA',
    steps: [
      {
        label: 'When and why to use Compose',
        isText: true,
        text: [
          'Real apps are more than one process: your API + a database + Redis.',
          'Starting each with a long "docker run ..." command is painful.',
          '',
          'Docker Compose lets you describe ALL of them in one YAML file and',
          'start everything with a single command. Perfect for LOCAL development',
          'where you want a Postgres and Redis running next to your app.',
          '',
          'Key idea — the private network:',
          'Compose puts all services on one network and lets them reach each',
          'other BY SERVICE NAME. Your app connects to the DB at host "db",',
          'not "localhost". That name resolves to the database container.',
        ],
        note: 'Compose is mainly a LOCAL dev tool here. Most free hosts (Render, Koyeb) deploy ONE container per service, not a whole compose file — you run the database as a separate managed service and pass its URL as an env var.',
      },
      {
        label: 'A typical docker-compose.yml',
        isFile: true,
        fileName: 'docker-compose.yml',
        commands: [
          `services:
  app:
    build: .                 # build from the Dockerfile here
    ports:
      - "3000:3000"
    environment:
      # note: host is "db", the service name below — not localhost
      DATABASE_URL: postgresql://postgres:secret@db:5432/mydb
      REDIS_URL: redis://cache:6379
    depends_on:
      - db
      - cache

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data   # persist data across restarts

  cache:
    image: redis:7-alpine

volumes:
  pgdata:`,
        ],
        note: 'The "volumes" section is critical for databases: without it, your Postgres data is wiped every time the container is recreated. A named volume (pgdata) keeps the data on disk between restarts.',
      },
      {
        label: 'Compose commands',
        commands: [
          `docker compose up          # start everything (foreground)`,
          `docker compose up -d       # start in the background`,
          `docker compose up --build  # rebuild images, then start`,
          `docker compose logs -f     # follow logs from all services`,
          `docker compose down        # stop and remove everything`,
          `docker compose down -v     # ...and delete the volumes (wipes data!)`,
        ],
        note: 'Use "docker compose down -v" carefully — the -v deletes named volumes, which erases your local database data. Leave it off if you want to keep the data.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Push your image to a registry',
    color: '#EC4899',
    steps: [
      {
        label: 'What a registry is & the two free options',
        isText: true,
        text: [
          'A registry is like GitHub, but for Docker IMAGES instead of code.',
          'You "push" a built image up, and any server can "pull" it down to run.',
          '',
          'Two free registries students use:',
          '→ Docker Hub (hub.docker.com) — the default, 1 free private repo',
          '→ GitHub Container Registry (ghcr.io) — free, lives with your repo',
          '',
          'Image naming = registry/username/name:tag',
          '→ Docker Hub: yourname/myapp:latest',
          '→ GHCR:       ghcr.io/yourname/myapp:latest',
        ],
        note: 'For most free deployments you often do NOT push manually — hosts like Render build the image FROM your GitHub repo for you. Pushing to a registry matters when a host asks for a pre-built image, or you want to run the same image on multiple machines.',
      },
      {
        label: 'Push to Docker Hub',
        commands: [
          `# 1. Log in (create a free account at hub.docker.com first)
docker login`,
          `# 2. Build with your Docker Hub username in the tag
docker build -t yourusername/myapp:latest .`,
          `# 3. Push it up
docker push yourusername/myapp:latest`,
          `# Anyone (or any server) can now run it:
docker run -p 3000:3000 yourusername/myapp:latest`,
        ],
        note: 'If you already built the image with a different name, re-tag it instead of rebuilding: "docker tag myapp yourusername/myapp:latest", then push.',
      },
    ],
  },

  {
    phase: '07',
    title: 'Deploy a container to Render (free)',
    color: '#4ADE80',
    steps: [
      {
        label: 'The easy path: let Render build from your Dockerfile',
        isText: true,
        text: [
          'You usually do NOT push an image to Render. Instead, Render reads the',
          'Dockerfile in your GitHub repo and builds + runs the container for you',
          'on every push. This is exactly how Java/Spring Boot deploys on Render.',
          '',
          'Steps:',
          '1. Commit a Dockerfile to your repo root and push to GitHub',
          '2. Render.com → "New +" → "Web Service" → connect the repo',
          '3. Render detects the Dockerfile → Runtime shows "Docker"',
          '4. Instance type: Free',
          '5. Add environment variables (DATABASE_URL, etc.) under "Environment"',
          '6. Click "Create Web Service" — Render builds the image and deploys',
          '',
          'The one rule that trips everyone up — the PORT:',
          '→ Render sets a PORT env var and expects your app to listen on it',
          '→ Read process.env.PORT (Node) / os.environ["PORT"] (Python) /',
          "  \\${PORT} (Spring) and bind to 0.0.0.0 — not a hard-coded port",
        ],
        note: 'Bind to 0.0.0.0 and the PORT env var Render provides. Hard-coding localhost or a fixed port is the most common reason a container that runs fine locally shows "no open ports detected" on Render.',
      },
      {
        label: 'Make your app read the PORT env var',
        isFile: true,
        fileName: 'server.js (Node example)',
        commands: [
          `const port = process.env.PORT || 3000; // Render injects PORT
app.listen(port, '0.0.0.0', () => {
  console.log(\`listening on \${port}\`);
});`,
        ],
        note: 'The "|| 3000" fallback keeps local dev working while honoring Render\'s injected PORT in production. Free Render services sleep after ~15 min of inactivity and take a few seconds to wake on the next request — normal for the free tier.',
      },
      {
        label: 'Where else these skills apply',
        isText: true,
        text: [
          'The exact same Dockerfile deploys to other free/cheap container hosts:',
          '→ Koyeb — deploy from GitHub (Dockerfile) or a pushed image, free tier',
          '→ Railway — Docker apps + databases, monthly credit',
          '→ Fly.io — global containers (card required, small free-ish allowance)',
          '',
          'That is the whole point of Docker: build the box once, run it anywhere.',
        ],
        note: 'Once your app has a working Dockerfile, you are no longer locked to one platform. If a host changes its free tier, you can move the same container elsewhere with minimal changes.',
      },
    ],
  },
]
