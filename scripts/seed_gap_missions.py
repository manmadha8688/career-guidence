"""
Seed gap-filling missions into the LOCAL backend.

Fills two gaps found in the mission audit:
  - 8 beginner (D-rank) SUBJECT_PRACTICE missions for the thin backend/Python/data on-ramps
  - 5 ROLE_BASED missions for the missing lanes (Frontend, Full-Stack, Mobile, DevOps, QA)

Usage:
  python scripts/seed_gap_missions.py
  python scripts/seed_gap_missions.py --dry   # print what would be posted, no writes

Only 3 categories exist: SUBJECT_PRACTICE, ROLE_BASED, ACADEMIC.
"""

import json
import re
import sys
import urllib.request
import urllib.error


def norm(s):
    """Lowercase, drop punctuation/dashes, collapse whitespace — for robust title matching."""
    return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9]+", " ", (s or "").lower())).strip()

BASE = "http://localhost:8080"
ADMIN_EMAIL = "admin@demo.com"
ADMIN_PASSWORD = "***REMOVED***"
ANY_TECH = ["Use any tech stack to complete this mission"]
DRY = "--dry" in sys.argv


def req(method, path, token=None, body=None):
    data = json.dumps(body).encode("utf-8") if body is not None else None
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    r = urllib.request.Request(f"{BASE}{path}", data=data, method=method, headers=headers)
    with urllib.request.urlopen(r, timeout=30) as resp:
        raw = resp.read().decode("utf-8")
        return json.loads(raw) if raw else None


def login():
    res = req("POST", "/api/auth/login", body={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    token = res.get("token")
    if not token:
        raise SystemExit(f"Login returned no token: {res}")
    print(f"Logged in as {ADMIN_EMAIL} (role={res.get('role')})")
    return token


# ─────────────────────────────────────────────────────────────────────────────
# SUBJECT_PRACTICE — beginner (D) on-ramps for thin subjects
# subjectTitles must match existing subjects exactly; subjectIds resolved at run.
# ─────────────────────────────────────────────────────────────────────────────
SUBJECT_MISSIONS = [
    {
        "title": "Build a Command-Line Tip Calculator",
        "subjectTitles": ["Python Fundamentals"],
        "techStack": ["Python"],
        "rank": "D",
        "estimatedHours": 2,
        "missionBrief": "Build a small terminal program that asks for a bill amount, a tip percentage, and how many people are splitting the bill, then prints the tip, the grand total, and how much each person owes. This is the kind of first program every developer writes: it takes input, does some maths, and shows a clean result. You will see exactly how a program reads what the user types, converts it, calculates, and formats the answer.",
        "learningOutcome": "You can write a small interactive Python program that reads user input, performs calculations, and prints neatly formatted output.",
        "prerequisites": [
            "Variables and basic data types (int, float, string)",
            "Using input() to read from the user and print() to show output",
            "Basic arithmetic operators (+, -, *, /)",
        ],
        "conceptsCovered": ["input and output", "type conversion", "f-string formatting", "while loops", "if/else validation"],
        "objectives": [
            "Ask the user for the bill amount and the number of people, and read both values",
            "Offer tip percentage options (e.g. 10%, 15%, 20%) and let the user pick one",
            "Convert the typed input from text into numbers before calculating",
            "Calculate the tip amount, the grand total, and the amount each person owes",
            "Print all money values formatted to exactly 2 decimal places",
            "Loop so the user can run another calculation without restarting the program",
            "Show a clear error message if the user types something that is not a number, instead of crashing",
        ],
        "bonusObjectives": [
            "Let the user type a custom tip percentage",
            "Round each person's share up so the total is always fully covered",
        ],
        "approachSteps": [
            "Read the inputs with input() and convert the bill and people count to numbers.",
            "Do the maths: tip = bill * (percent/100), total = bill + tip, per person = total / people.",
            "Print the results using f-strings formatted to 2 decimals.",
            "Wrap everything in a while loop that asks 'Calculate again? (y/n)' and exits on 'n'.",
        ],
        "hints": [
            "input() always returns text — use float(...) before doing maths.",
            "Format money with f\"{value:.2f}\" so it always shows two decimals.",
            "Wrap the number conversion in try/except ValueError to catch bad input.",
        ],
        "commonMistakes": [
            "Forgetting to convert input() text to a number, causing a type error when you multiply.",
            "Using integer division so the per-person amount loses its decimals.",
            "Not rounding money, so the total prints as 33.333333333.",
        ],
    },
    {
        "title": "Build a To-Do List You Run in the Terminal",
        "subjectTitles": ["Python Fundamentals"],
        "techStack": ["Python"],
        "rank": "D",
        "estimatedHours": 3,
        "missionBrief": "Build a menu-driven to-do app that runs in the terminal — the user can add tasks, view them, mark them done, and delete them, and the tasks are saved to a file so they are still there next time the program runs. This teaches the backbone of almost every command-line tool: a loop that shows a menu, functions that do the work, and reading and writing a file to keep data between runs.",
        "learningOutcome": "You can build a menu-driven Python program that manages a collection of data and saves it to a file so it persists between runs.",
        "prerequisites": [
            "Lists and how to add, read, and remove items by index",
            "Writing and calling your own functions",
            "while loops and if/elif/else",
        ],
        "conceptsCovered": ["lists", "dictionaries", "functions", "reading and writing files", "loops and menus"],
        "objectives": [
            "Show a menu with options: add, view, mark done, delete, and quit",
            "Add a task and store each task with its text and a done/not-done flag",
            "List all tasks with numbers, clearly showing which are done and which are not",
            "Mark a task as done by its number",
            "Delete a task by its number",
            "Save tasks to a file when quitting and load them when the program starts, so they persist",
            "Quit the program cleanly when the user chooses to exit",
        ],
        "bonusObjectives": [
            "Add a 'clear completed' option that removes all done tasks at once",
            "Show a count of remaining (not done) tasks in the menu",
        ],
        "approachSteps": [
            "Build the menu loop first — print options and read the user's choice.",
            "Make each action (add, view, mark, delete) its own function that works on a list of tasks.",
            "Store each task as a small dictionary like {'text': ..., 'done': False}.",
            "Load tasks from a file at startup and save back to it when the user quits.",
        ],
        "hints": [
            "Use enumerate() to number tasks when you print them.",
            "Save the list with json.dump() to a file and load it with json.load().",
            "Guard the file load with try/except FileNotFoundError for the first run.",
        ],
        "commonMistakes": [
            "Off-by-one errors: the user picks task '1' but the list index is 0.",
            "Crashing when the user picks a number with no matching task.",
            "Forgetting to save on exit, so all tasks disappear next run.",
        ],
    },
    {
        "title": "Design and Query a Small Library Database",
        "subjectTitles": ["SQL Fundamentals"],
        "techStack": ["SQL", "SQLite"],
        "rank": "D",
        "estimatedHours": 3,
        "missionBrief": "Create a small library database with three tables — books, members, and loans — fill them with sample data, and then write queries to answer real questions: who currently has which book, which loans are overdue, and which titles are borrowed most. This is the perfect first SQL project because the data is easy to picture, and you practise creating tables, inserting rows, and selecting with filters and joins on something that makes intuitive sense.",
        "learningOutcome": "You can design a small relational schema with related tables and query it using filters, joins, and aggregates.",
        "prerequisites": [
            "What a table, row, and column are",
            "The idea of a primary key and a foreign key (how one table points to another)",
            "Basic SELECT ... FROM syntax",
        ],
        "conceptsCovered": ["CREATE TABLE", "INSERT", "SELECT with WHERE", "ORDER BY", "JOIN", "GROUP BY", "COUNT"],
        "objectives": [
            "Create books, members, and loans tables with sensible column types and keys",
            "Insert at least 8 books, 4 members, and 6 loans as sample data",
            "Write a query that returns all books by a given author",
            "Write a query that finds loans that have not been returned yet",
            "Join loans, members, and books to show who borrowed which title",
            "Use ORDER BY and LIMIT to list the most recently borrowed books",
            "Use COUNT with GROUP BY to find how many times each book has been borrowed",
        ],
        "bonusObjectives": [
            "Add a due_date and find loans that are past due using a date comparison",
            "Find members who currently have more than one book on loan",
        ],
        "approachSteps": [
            "Design the tables and their keys first — decide how loans links to books and members.",
            "Insert the sample data so you have something to query.",
            "Write the simple SELECTs first, then add WHERE conditions.",
            "Write the JOIN queries last, once the single-table queries work.",
        ],
        "hints": [
            "Use IS NULL (not = NULL) to find loans with no returned date.",
            "Give tables short aliases in joins, e.g. FROM loans l JOIN books b ON l.book_id = b.id.",
            "SQLite via the command line or DB Browser for SQLite is the fastest way to start.",
        ],
        "commonMistakes": [
            "Forgetting the foreign key columns, so you cannot connect loans to books or members.",
            "Writing = NULL instead of IS NULL and getting no rows back.",
            "Ambiguous column names in a join when two tables both have 'id' or 'title'.",
        ],
    },
    {
        "title": "Analyze a Sales Table with Aggregate Queries",
        "subjectTitles": ["SQL Fundamentals"],
        "techStack": ["SQL", "SQLite"],
        "rank": "D",
        "estimatedHours": 2,
        "missionBrief": "Given a single orders table, answer the business questions a junior analyst is asked every day — total revenue, revenue per month, the top customers, the average order value, and how many orders each product had. This project focuses entirely on aggregate SQL (SUM, COUNT, AVG, GROUP BY), the exact skill that turns raw rows into the numbers a business actually cares about.",
        "learningOutcome": "You can write aggregate SQL queries to answer business questions from a table of records.",
        "prerequisites": [
            "SELECT and WHERE",
            "What SUM, COUNT, and AVG do",
            "Basic idea of a date column",
        ],
        "conceptsCovered": ["SUM", "COUNT", "AVG", "GROUP BY", "HAVING", "ORDER BY", "date filtering"],
        "objectives": [
            "Create an orders table with id, customer, product, amount, and order_date",
            "Insert at least 15 rows spread across a few different months",
            "Calculate total revenue across all orders using SUM",
            "Calculate revenue per month using GROUP BY on the month",
            "Find the top 3 customers by total spend",
            "Calculate the average order value",
            "Count how many orders each product had, and filter to products with more than one order",
        ],
        "bonusObjectives": [
            "Find the single best sales month and its revenue",
            "Calculate month-over-month revenue and spot the biggest jump",
        ],
        "approachSteps": [
            "Create the orders table and insert your sample rows.",
            "Write each aggregate one at a time, starting with total revenue.",
            "Add GROUP BY for the per-month and per-product breakdowns.",
            "Use HAVING to filter grouped results (e.g. products with more than one order).",
        ],
        "hints": [
            "HAVING filters groups after aggregation; WHERE filters rows before it.",
            "Top customers: ORDER BY SUM(amount) DESC LIMIT 3.",
            "Group by month with strftime('%Y-%m', order_date) in SQLite.",
        ],
        "commonMistakes": [
            "Putting an aggregate like SUM() inside WHERE instead of HAVING.",
            "Forgetting to list non-aggregated columns in GROUP BY.",
            "Mixing a plain column with an aggregate without grouping, giving wrong results.",
        ],
    },
    {
        "title": "Build a Command-Line File Organizer",
        "subjectTitles": ["Node.js Foundations"],
        "techStack": ["Node.js"],
        "rank": "D",
        "estimatedHours": 3,
        "missionBrief": "Build a Node.js script that scans a folder and tidies it up — moving files into subfolders by type, so images go into an Images folder, documents into Docs, code into Code, and so on. This is a great first Node project because it uses the file system module and runs straight from the terminal with node, teaching you how Node interacts with your computer before you ever build a server.",
        "learningOutcome": "You can write a Node.js script that reads the file system and takes command-line arguments to do a useful task.",
        "prerequisites": [
            "JavaScript basics (variables, functions, arrays, loops)",
            "What Node.js is and how it differs from browser JavaScript",
            "Running a script with 'node file.js' from the terminal",
        ],
        "conceptsCovered": ["fs module", "path module", "process.argv", "arrays and loops", "string handling"],
        "objectives": [
            "Read the list of files in a target folder",
            "Decide a category for each file based on its extension (images, docs, code, other)",
            "Create the category subfolders if they do not already exist",
            "Move each file into its matching category folder",
            "Print a summary showing how many files were moved into each category",
            "Accept the target folder as a command-line argument instead of hardcoding it",
            "Skip subfolders and hidden files so only real files are moved",
        ],
        "bonusObjectives": [
            "Add a --dry flag that prints what would move without actually moving anything",
            "Handle name clashes by adding a number suffix instead of overwriting",
        ],
        "approachSteps": [
            "Read the folder contents with the fs module.",
            "Build a small map of file extensions to category names.",
            "Create the category folders, then move each file into the right one.",
            "Print the summary and read the folder path from process.argv.",
        ],
        "hints": [
            "path.extname() gives you a file's extension including the dot.",
            "fs.renameSync(oldPath, newPath) moves a file.",
            "The folder argument is in process.argv[2].",
        ],
        "commonMistakes": [
            "Mixing up sync and async fs calls and moving files before folders exist.",
            "Crashing on files that have no extension.",
            "Hardcoding the folder path so the script only works for one place.",
        ],
    },
    {
        "title": "Build a Notes REST API with Express",
        "subjectTitles": ["Express.js Basics"],
        "techStack": ["Node.js", "Express"],
        "rank": "D",
        "estimatedHours": 3,
        "missionBrief": "Build your first backend server: a small REST API with Express that manages notes kept in memory — you can create a note, list them all, fetch one, update it, and delete it. This is the foundational backend project. It teaches routes, HTTP methods, reading JSON from a request, sending JSON back, and returning the right status codes — the core of every web backend you will ever build.",
        "learningOutcome": "You can build a working CRUD REST API with Express using correct routes, HTTP methods, and status codes.",
        "prerequisites": [
            "JavaScript basics",
            "What an HTTP request is and the difference between GET and POST",
            "Node and npm (installing a package, running a file)",
        ],
        "conceptsCovered": ["Express routing", "HTTP methods", "req.body and req.params", "status codes", "middleware"],
        "objectives": [
            "Start an Express server that listens on a port",
            "GET /notes returns all notes as JSON",
            "POST /notes reads a note from the JSON request body and adds it",
            "GET /notes/:id returns a single note by its id",
            "PUT /notes/:id updates an existing note",
            "DELETE /notes/:id removes a note",
            "Return correct status codes: 201 when created, 404 when a note is not found, and use express.json() so request bodies are parsed",
        ],
        "bonusObjectives": [
            "Validate that a note has non-empty text and return 400 if not",
            "Add a created timestamp to each note",
        ],
        "approachSteps": [
            "Set up Express and add the express.json() middleware.",
            "Build the routes one at a time, starting with GET and POST.",
            "Test each route with curl or Postman before moving to the next.",
            "Add 404 handling and correct status codes last.",
        ],
        "hints": [
            "Without express.json(), req.body will be undefined on POST/PUT.",
            "Store notes in an array with an incrementing id counter.",
            "Return res.status(404).json({ error: 'Not found' }) for a missing note.",
        ],
        "commonMistakes": [
            "Forgetting express.json(), so the request body is always empty.",
            "Sending the wrong status code (200 for everything, even errors).",
            "Not returning after res.send, so code keeps running and sends twice.",
        ],
    },
    {
        "title": "Build a Personal Blog with the Django Admin",
        "subjectTitles": ["Django Framework"],
        "techStack": ["Python", "Django"],
        "rank": "D",
        "estimatedHours": 4,
        "missionBrief": "Create a Django project with a blog Post model, use Django's built-in admin panel to write and edit posts, and then show the published posts on a public page with a detail view for each. This is the fastest way to feel Django's 'batteries included' power: with a model and a migration you get a full admin interface for free, and you learn the project structure, models, templates, and URLs that everything else in Django builds on.",
        "learningOutcome": "You can build a database-backed Django page using models, migrations, the admin, views, templates, and URL routing.",
        "prerequisites": [
            "Python basics (functions, classes)",
            "What a web framework does at a high level",
            "Using the command line to run manage.py commands",
        ],
        "conceptsCovered": ["Django models", "migrations", "Django admin", "views", "templates", "URL routing"],
        "objectives": [
            "Start a Django project and create an app inside it",
            "Define a Post model with title, body, created_at, and a published boolean",
            "Run makemigrations and migrate to create the database table",
            "Register the Post model in the Django admin",
            "Create a superuser and add at least 3 posts through the admin",
            "Build a view and template that list published posts, newest first",
            "Add a detail page that shows one full post, with URLs wired for both the list and detail pages",
        ],
        "bonusObjectives": [
            "Show the post's date in a friendly format on the list page",
            "Add a simple 'no posts yet' message when the list is empty",
        ],
        "approachSteps": [
            "Run startproject and startapp, and add the app to INSTALLED_APPS.",
            "Define the Post model, then makemigrations and migrate.",
            "Register the model in admin, create a superuser, and add posts.",
            "Build the list view and template, then add the detail view and URL.",
        ],
        "hints": [
            "Register with admin.site.register(Post) in the app's admin.py.",
            "Query published posts newest first: Post.objects.filter(published=True).order_by('-created_at').",
            "Put templates in app/templates/app/ and check your TEMPLATES setting if they are not found.",
        ],
        "commonMistakes": [
            "Forgetting makemigrations/migrate, so the table does not exist.",
            "Not adding the app to INSTALLED_APPS, so the admin does not see the model.",
            "Template-not-found errors from putting templates in the wrong folder.",
        ],
    },
    {
        "title": "Build a Bookshelf API with Mongoose",
        "subjectTitles": ["MongoDB and Mongoose"],
        "techStack": ["Node.js", "Express", "MongoDB", "Mongoose"],
        "rank": "D",
        "estimatedHours": 3,
        "missionBrief": "Build a small Express + Mongoose API that stores your reading list in MongoDB — add a book, list all books, filter by reading status, update a book's status or rating, and delete a book. This teaches the real workflow of a document database: defining a schema, connecting to MongoDB, and doing full CRUD with Mongoose model methods, which is exactly how Node backends talk to MongoDB in real projects.",
        "learningOutcome": "You can build a CRUD REST API backed by MongoDB using Mongoose schemas and models.",
        "prerequisites": [
            "JavaScript and basic Express (routes, req/res)",
            "What a database is and what a 'document' means in MongoDB",
            "Node and npm, plus a free MongoDB Atlas cluster or a local MongoDB",
        ],
        "conceptsCovered": ["Mongoose schema and model", "connecting to MongoDB", "CRUD methods", "query filtering", "schema validation"],
        "objectives": [
            "Connect to MongoDB using Mongoose when the server starts",
            "Define a Book schema with title, author, status (to-read/reading/done), and rating",
            "POST a new book and save it to the database",
            "GET all books from the database",
            "GET books filtered by status using a query parameter",
            "PATCH a book to update its status or rating by id",
            "DELETE a book by id, and make title and author required in the schema",
        ],
        "bonusObjectives": [
            "Return a 404 when updating or deleting a book id that does not exist",
            "Add a createdAt timestamp automatically with schema timestamps",
        ],
        "approachSteps": [
            "Connect Mongoose to your MongoDB connection string.",
            "Define the Book schema and model.",
            "Build the CRUD routes using Mongoose model methods.",
            "Add the status query filter and validation last.",
        ],
        "hints": [
            "Use async/await with try/catch around every database call.",
            "Filter with Book.find(req.query.status ? { status: req.query.status } : {}).",
            "An invalid ObjectId throws — catch it and return a clean 400 or 404.",
        ],
        "commonMistakes": [
            "Not awaiting the async database calls, so responses send before data is ready.",
            "Crashing on an invalid id string instead of returning a clean error.",
            "Forgetting to handle the not-found case on update and delete.",
        ],
    },
]

# ─────────────────────────────────────────────────────────────────────────────
# ROLE_BASED — the missing lanes (Frontend, Full-Stack, Mobile, DevOps, QA)
# ─────────────────────────────────────────────────────────────────────────────
ROLE_MISSIONS = [
    {
        "title": "Movie Discovery App with a Public API",
        "targetRoles": ["Frontend Developer", "React Developer"],
        "rank": "B",
        "estimatedHours": 12,
        "missionBrief": "Build a responsive React app that lets users search for movies using a free public API (such as TMDB), browse the results in a clean poster grid, open a detail view for any movie, and save favourites that stay saved after a refresh. This is the classic frontend portfolio project because it proves the three things every frontend team looks for: you can consume a real API, manage application state, and build a polished, responsive interface.",
        "learningOutcome": "You can build and deploy a responsive React app that consumes a real API, manages state, and persists user data in the browser.",
        "prerequisites": [
            "React fundamentals (components, props, state, useEffect)",
            "Fetching data with fetch or axios and handling async code",
            "CSS layout with flexbox or grid",
            "npm and running a dev server",
        ],
        "conceptsCovered": ["React hooks", "data fetching", "conditional rendering (loading/error/empty)", "client-side routing", "localStorage", "responsive design"],
        "objectives": [
            "A search bar that queries the movie API and shows matching results",
            "A results grid showing each movie's poster, title, year, and rating",
            "Loading, error, and empty (no results) states that the user clearly sees",
            "A detail view for a selected movie with its overview, genres, and runtime",
            "Add and remove favourites, saved in localStorage so they survive a refresh",
            "A dedicated Favourites page listing the saved movies",
            "A responsive layout that works from mobile to desktop, with the search input debounced so it does not fire on every keystroke",
        ],
        "bonusObjectives": [
            "Add pagination or infinite scroll for large result sets",
            "Deploy the app to Vercel or Netlify and put the live link in the README",
        ],
        "approachSteps": [
            "Get a free API key and confirm you can fetch and log search results.",
            "Build the search input, fetch results, and render the poster grid.",
            "Add loading, error, and empty states around the fetch.",
            "Add a detail route and a favourites feature backed by localStorage.",
            "Polish the responsive layout and debounce the search input.",
        ],
        "hints": [
            "Keep your API key in an environment variable (VITE_...), never hardcoded in the repo.",
            "Debounce the search with a small setTimeout or a useDebounce hook.",
            "Use React Router for the detail and favourites pages.",
        ],
        "commonMistakes": [
            "Committing your API key into the public repository.",
            "Not handling empty or failed searches, leaving the screen blank.",
            "Missing the key prop when rendering the list of movie cards.",
            "Firing a request on every keystroke instead of debouncing.",
        ],
    },
    {
        "title": "Full-Stack URL Shortener with Click Analytics",
        "targetRoles": ["Full Stack Developer", "MERN Stack Developer"],
        "rank": "B",
        "estimatedHours": 10,
        "missionBrief": "Build a complete URL shortener: paste in a long link, get back a short code, and be redirected to the original page whenever someone visits the short link — while the app counts how many times each link is clicked. It is small enough to finish quickly but touches every layer of a full-stack app: a frontend form, an API, a database, redirects, and analytics. This is a favourite screening project because it shows you can wire the whole stack together, not just one part.",
        "learningOutcome": "You can build a complete full-stack app with a frontend, an API, a database, redirects, and basic analytics all working together.",
        "prerequisites": [
            "A frontend framework or plain HTML/JS to build the form",
            "A backend framework (Express, Flask, or Spring Boot)",
            "Basic database create/read/update operations",
            "Understanding of HTTP redirects (301/302)",
        ],
        "conceptsCovered": ["REST API design", "database persistence", "HTTP redirects", "unique ID generation", "frontend-backend integration", "CORS"],
        "objectives": [
            "A frontend form to submit a long URL and display the resulting short link",
            "A backend endpoint that generates a unique short code for a submitted URL",
            "Store the mapping (long URL, short code, click count, created date) in a database",
            "Visiting the short link redirects to the original URL and increments its click count",
            "Validate the submitted URL before shortening it",
            "A stats view or endpoint showing the click count for each shortened link",
            "A copy-to-clipboard button on the generated short link",
        ],
        "bonusObjectives": [
            "Let users choose a custom short code (and reject it if taken)",
            "Show the most-clicked links in a small leaderboard",
        ],
        "approachSteps": [
            "Design the data model for a shortened link.",
            "Build the shorten endpoint and the short-code generation.",
            "Build the redirect route that looks up the code and increments clicks.",
            "Build the frontend form and result display.",
            "Add URL validation and the stats view.",
        ],
        "hints": [
            "Generate short codes from a base62 of an incrementing id, or use a library like nanoid.",
            "Use a 301 or 302 redirect from the short route to the original URL.",
            "Enable CORS so the frontend can call the API from the browser.",
        ],
        "commonMistakes": [
            "Short-code collisions when two links generate the same code.",
            "Not validating URLs, which allows broken links or open-redirect abuse.",
            "Using an in-memory store so all links vanish when the server restarts.",
            "CORS errors because the API does not allow the frontend origin.",
        ],
    },
    {
        "title": "Cross-Platform Expense Tracker Mobile App",
        "targetRoles": ["Mobile App Developer", "React Native Developer"],
        "rank": "B",
        "estimatedHours": 15,
        "missionBrief": "Build a mobile expense tracker that runs on a real Android phone (and iOS) — add expenses with a category and amount, see a running total, and view how much you are spending in each category. This is the ideal first mobile project: it is genuinely useful, and it teaches the mobile essentials of multiple screens, navigation, on-device storage, and building a UI that works on a small touch screen, all runnable on an emulator or your own phone.",
        "learningOutcome": "You can build and run a cross-platform mobile app with navigation and on-device data persistence.",
        "prerequisites": [
            "JavaScript + React (for React Native/Expo) OR Dart basics (for Flutter)",
            "What a mobile emulator or simulator is",
            "Node and Expo installed, or the Flutter SDK installed",
        ],
        "conceptsCovered": ["mobile screens and components", "navigation between screens", "on-device storage", "state management", "rendering lists"],
        "objectives": [
            "An add-expense screen capturing amount, category, an optional note, and date",
            "A list of expenses shown newest first",
            "A running total of all expenses and a per-category breakdown",
            "The ability to delete an expense",
            "Expense data that persists on the device so it survives closing the app",
            "Navigation between an Add screen and a Summary screen (tabs or a stack)",
            "The app runs on an emulator or a real phone (via Expo Go or a Flutter build)",
        ],
        "bonusObjectives": [
            "Add a simple bar or pie chart of spending by category",
            "Add a monthly filter so the user sees only the current month",
        ],
        "approachSteps": [
            "Scaffold the app with Expo (React Native) or Flutter.",
            "Build the add-expense screen and the expense list screen.",
            "Wire up on-device persistence so data is saved and reloaded.",
            "Add the running total and per-category breakdown.",
            "Add navigation between screens and polish the mobile layout.",
        ],
        "hints": [
            "Expo is the fastest way to get React Native running on your phone.",
            "Use AsyncStorage (React Native) or Hive/SQLite (Flutter) for local data.",
            "Test on a real device early — layouts behave differently than on the emulator.",
        ],
        "commonMistakes": [
            "Not persisting data, so everything is lost when the app reloads.",
            "Blocking the UI while reading or writing storage.",
            "A layout that breaks on smaller screens or with the keyboard open.",
            "Only ever testing on the emulator and never on a real phone.",
        ],
    },
    {
        "title": "Containerize and Ship a Web App with Docker + CI/CD",
        "targetRoles": ["DevOps Engineer", "Cloud Engineer"],
        "rank": "B",
        "estimatedHours": 10,
        "missionBrief": "Take a small web app — one you have already built or a simple one you write for this — package it into a Docker container, and set up a GitHub Actions pipeline that automatically builds it, runs its tests, and deploys it on every push. This is the core DevOps loop that every real team relies on: the process that turns 'it works on my machine' into 'it ships to production automatically and safely.'",
        "learningOutcome": "You can containerize an application and run a CI/CD pipeline that builds, tests, and deploys it automatically.",
        "prerequisites": [
            "Comfort with the command line and git",
            "Basic understanding of how a web app runs (a port, a start command)",
            "A GitHub account and an account on a free host (Render, Railway, or Fly.io)",
        ],
        "conceptsCovered": ["Docker images and containers", "docker-compose", "CI/CD pipelines", "GitHub Actions", "secrets management", "container registries"],
        "objectives": [
            "A Dockerfile that builds and runs the app inside a container",
            "A docker-compose file running the app together with one dependency (e.g. a database)",
            "A .dockerignore that keeps the image small",
            "A GitHub Actions workflow that builds the image on every push",
            "The pipeline runs the tests or lint and fails the build if they fail",
            "On pushes to main, the image is pushed to a registry (Docker Hub or GHCR)",
            "The app is deployed to a free host (or the deploy step is fully documented), with secrets provided via GitHub secrets rather than hardcoded",
        ],
        "bonusObjectives": [
            "Use a multi-stage build to shrink the final image significantly",
            "Add a container healthcheck and a deploy-only-on-green rule",
        ],
        "approachSteps": [
            "Containerize the app locally and confirm it runs with docker run.",
            "Add docker-compose to bring up the app plus its dependency.",
            "Write the GitHub Actions workflow to build and test on push.",
            "Add the image push to a registry on the main branch.",
            "Wire the deploy step and move all secrets into GitHub secrets.",
        ],
        "hints": [
            "A multi-stage build plus a good .dockerignore keeps images small.",
            "Store credentials in GitHub Actions secrets, never in the Dockerfile or repo.",
            "Make the deploy job depend on the test job so a red build never ships.",
        ],
        "commonMistakes": [
            "Huge images because of no multi-stage build or missing .dockerignore.",
            "Hardcoding secrets or connection strings into the image.",
            "A pipeline that deploys even when the tests fail.",
            "Exposing or mapping the wrong port so the container is unreachable.",
        ],
    },
    {
        "title": "Automated Test Suite for a Web App",
        "targetRoles": ["QA Engineer", "Test Automation Engineer", "SDET"],
        "rank": "B",
        "estimatedHours": 10,
        "missionBrief": "Take a real web app — a public demo site or one you built — and write an automated test suite that covers its most important behaviour: unit tests for the logic and end-to-end browser tests for the real user journeys. This is exactly what a QA automation engineer does day to day: turn fragile manual test cases into reliable automated checks that catch bugs before users do.",
        "learningOutcome": "You can design and automate a test suite with both unit and end-to-end coverage for a web application.",
        "prerequisites": [
            "Basic programming in one language (JavaScript or Python is ideal)",
            "Understanding of how a web app's UI flows work (forms, buttons, pages)",
            "npm or pip to install a test runner",
        ],
        "conceptsCovered": ["test planning", "unit testing", "end-to-end testing", "locators/selectors", "assertions", "handling async and waits"],
        "objectives": [
            "A short test plan listing the critical flows to cover (e.g. login, add item, checkout)",
            "Unit tests for at least 3 pieces of pure logic or utility functions",
            "End-to-end tests for 2 real user journeys using Playwright, Cypress, or Selenium",
            "Tests that assert both what the user sees and the expected data outcome",
            "Correct handling of async behaviour and waits (no fixed sleep() calls)",
            "At least one negative test where invalid input shows the expected error",
            "All tests runnable with a single command, plus a short README summarising results",
        ],
        "bonusObjectives": [
            "Run the suite automatically in GitHub Actions on every push",
            "Capture a screenshot on any failed end-to-end test",
        ],
        "approachSteps": [
            "Write the test plan first — decide which flows matter most.",
            "Add unit tests for the pure logic pieces.",
            "Set up the end-to-end tool and automate the first user journey.",
            "Automate the second journey and add a negative test.",
            "Clean up the assertions and document how to run everything.",
        ],
        "hints": [
            "Prefer locating elements by role or visible text over brittle CSS selectors.",
            "Use the tool's built-in auto-waiting instead of arbitrary sleeps.",
            "Keep each test independent so it can run alone and in any order.",
        ],
        "commonMistakes": [
            "Flaky tests caused by fixed sleeps instead of proper waits.",
            "Selecting elements by fragile CSS that breaks on any UI tweak.",
            "Testing implementation details instead of user-visible behaviour.",
            "Only testing the happy path and skipping negative and edge cases.",
        ],
    },
]


def build_mission(m, category, order_index, subject_map):
    body = {
        "title": m["title"],
        "missionBrief": m["missionBrief"],
        "rank": m["rank"],
        "category": category,
        "techStack": m.get("techStack", ANY_TECH),
        "estimatedHours": m["estimatedHours"],
        "subjectIds": [],
        "subjectTitles": [],
        "targetRoles": m.get("targetRoles", []),
        "learningOutcome": m["learningOutcome"],
        "prerequisites": m["prerequisites"],
        "conceptsCovered": m["conceptsCovered"],
        "objectives": m["objectives"],
        "bonusObjectives": m.get("bonusObjectives", []),
        "approachSteps": m["approachSteps"],
        "hints": m["hints"],
        "commonMistakes": m["commonMistakes"],
        "published": True,
        "orderIndex": order_index,
    }
    if category == "SUBJECT_PRACTICE":
        ids = []
        resolved = []
        for t in m["subjectTitles"]:
            match = subject_map.get(norm(t))
            if not match:
                print(f"  !! WARNING: subject not found: '{t}' — mission '{m['title']}' will have no subject link")
                continue
            ids.append(match["id"])
            resolved.append(match["title"])  # store the REAL subject title
        body["subjectIds"] = ids
        body["subjectTitles"] = resolved
    return body


def main():
    token = login()

    subjects = req("GET", "/api/subjects", token=token) or []
    subject_map = {norm(s.get("title")): {"id": s.get("id"), "title": s.get("title")} for s in subjects}
    print(f"Loaded {len(subject_map)} subjects.")

    existing = req("GET", "/api/admin/missions", token=token) or []
    max_oi = max([m.get("orderIndex", 0) or 0 for m in existing], default=0)
    print(f"Existing missions: {len(existing)}, max orderIndex: {max_oi}")

    oi = max_oi + 1
    planned = [("SUBJECT_PRACTICE", m) for m in SUBJECT_MISSIONS] + [("ROLE_BASED", m) for m in ROLE_MISSIONS]

    print(f"\nSeeding {len(planned)} missions (dry={DRY})...\n")
    created = 0
    for category, m in planned:
        body = build_mission(m, category, oi, subject_map)
        oi += 1
        if DRY:
            print(f"  [DRY] {category} #{body['orderIndex']} [{body['rank']}] {body['title']}")
            continue
        try:
            res = req("POST", "/api/admin/missions", token=token, body=body)
            print(f"  OK  {category} #{body['orderIndex']} [{res.get('rank')}] {res.get('title')} ({res.get('id')})")
            created += 1
        except urllib.error.HTTPError as e:
            print(f"  ERR {category} '{m['title']}': HTTP {e.code} — {e.read().decode('utf-8', 'ignore')[:300]}")
        except Exception as e:
            print(f"  ERR {category} '{m['title']}': {e}")

    print(f"\nDone. Created {created}/{len(planned)} missions.")


if __name__ == "__main__":
    main()
