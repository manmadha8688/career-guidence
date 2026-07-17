export const FIREBASE_GUIDE = [
  {
    phase: '01',
    title: 'What Firebase gives you — and the honest free plan',
    color: '#FFCA28',
    steps: [
      {
        label: 'Firebase = a free backend-in-a-box for your frontend',
        isText: true,
        text: [
          'Firebase (by Google) lets a pure frontend app (React, Vue, plain JS) have',
          'a real backend without you writing or hosting a server. The three pieces',
          'students use most:',
          '',
          '→ Hosting    — put your built site on Google\'s global CDN with free SSL',
          '→ Firestore  — a NoSQL cloud database your app reads/writes directly',
          '→ Auth       — sign in with email/password, Google, and more',
          '',
          'The free tier is the "Spark" plan — no credit card required.',
          '',
          'Honest Spark plan limits (verify current numbers at firebase.google.com/pricing):',
          'Hosting:',
          '   ~10 GB storage, ~10 GB/month data transfer, free SSL + custom domain',
          'Firestore (resets DAILY, ~midnight Pacific):',
          '   1 GiB stored data',
          '   50,000 document reads / day',
          '   20,000 document writes / day',
          '   20,000 document deletes / day',
          '   10 GiB/month network egress',
          '   (exactly ONE free Firestore database per project)',
          'Authentication:',
          '   Email/password, Google, and most social sign-in are free at any scale',
          '',
          '⚠️ Important 2026 change: since Feb 3, 2026, Cloud STORAGE for Firebase',
          '   (file/image uploads via Storage buckets) requires the paid Blaze plan',
          '   to create a bucket — even inside free limits. Hosting, Firestore, and',
          '   Auth stay free on Spark; only the file-upload Storage product changed.',
        ],
        note: 'For a student project, Spark (Hosting + Firestore + Auth) is genuinely free and generous. The one gotcha to know in 2026: uploading user files via Cloud Storage now needs the Blaze plan (a card) — use Cloudinary or ImageKit free tiers for images if you want to stay 100% card-free.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Create a project and install the Firebase CLI',
    color: '#FFCA28',
    steps: [
      {
        label: 'Create your Firebase project in the console',
        isText: true,
        text: [
          '1. Go to console.firebase.google.com → "Create a project"',
          '2. Name it (e.g. my-app) → Continue',
          '3. Google Analytics is optional — you can turn it off for a simple app',
          '4. Wait for the project to be created → "Continue"',
          '',
          'You now have a Firebase project. Everything (Hosting, Firestore, Auth)',
          'lives inside this one project.',
        ],
        note: 'One Firebase project can hold your Hosting, database, and auth together — you do not need a separate project per feature.',
      },
      {
        label: 'Install the CLI and log in',
        commands: [
          `# Install the Firebase command-line tool (once, globally)
npm install -g firebase-tools`,
          `# Log in with the SAME Google account as the console (opens browser)
firebase login`,
          `# Confirm it can see your project
firebase projects:list`,
        ],
        note: 'The CLI is how you deploy from your machine. If "firebase" is not recognized after install, close and reopen your terminal so the new global command is on your PATH.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Connect a React app to Firebase',
    color: '#61DAFB',
    steps: [
      {
        label: 'Register a Web App and copy the config',
        isText: true,
        text: [
          '1. In the Firebase console → Project Overview → click the "</>" (Web) icon',
          '2. Give the app a nickname → "Register app"',
          '3. Firebase shows a firebaseConfig object — copy it. It looks like:',
          '   apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId',
          '',
          'These web config values are DESIGNED to be public — they identify your',
          'project to Firebase and are safe to ship in the browser. Real security',
          'comes from Firestore/Storage Security Rules (Phase 04), not from hiding',
          'these keys.',
        ],
        note: 'The Firebase "apiKey" is NOT a secret — it is a public project identifier, safe in frontend code. Your data is protected by Security Rules, not by hiding the config. (Still, put it in a .env for tidiness.)',
      },
      {
        label: 'Install the SDK and initialize it',
        commands: [
          `# In your React (Vite) project
npm install firebase`,
        ],
        note: 'The modular "firebase" v9+ SDK is tree-shakeable — you import only the functions you use, keeping your bundle small.',
      },
      {
        label: 'Create src/firebase.js',
        isFile: true,
        fileName: 'src/firebase.js',
        commands: [
          `import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Vite env vars must be prefixed VITE_ to reach the browser.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MSG_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);`,
        ],
        note: 'Store each value in a .env file (VITE_FIREBASE_API_KEY=..., etc.) and add .env to .gitignore. These are public identifiers, but keeping them in .env keeps your code clean and lets Hosting/Vercel inject them per environment.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Firestore basics — read and write data',
    color: '#FF6F00',
    steps: [
      {
        label: 'Create the database (start in test mode, then lock it)',
        isText: true,
        text: [
          '1. Firebase console → Build → Firestore Database → "Create database"',
          '2. Choose a location near your users (cannot be changed later)',
          '3. Start in "test mode" ONLY while developing (open for 30 days)',
          '4. Before you share the app publicly, switch to real Security Rules',
          '   (next step) — test mode lets ANYONE read/write your data.',
        ],
        note: 'Test mode is fine for the first day of building. Never leave a real app in test mode — anyone could wipe or steal your data. Lock it with Security Rules before you go live.',
      },
      {
        label: 'Read and write from React',
        isFile: true,
        fileName: 'src/notes.js',
        commands: [
          `import { db } from './firebase';
import {
  collection, addDoc, getDocs, serverTimestamp,
} from 'firebase/firestore';

// Write a document
export async function addNote(text) {
  await addDoc(collection(db, 'notes'), {
    text,
    createdAt: serverTimestamp(),
  });
}

// Read all documents in a collection
export async function getNotes() {
  const snap = await getDocs(collection(db, 'notes'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}`,
        ],
        note: 'Every getDocs / getDoc counts against your 50,000 daily reads; every addDoc / setDoc counts against your 20,000 daily writes. For a student app that is a huge amount — but avoid reading a whole collection on every render.',
      },
      {
        label: 'Lock it down with Security Rules',
        isFile: true,
        fileName: 'firestore.rules',
        commands: [
          `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Anyone can READ notes, but only signed-in users can WRITE.
    match /notes/{noteId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Each user can only touch their OWN profile document.
    match /users/{userId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }
  }
}`,
        ],
        note: 'Security Rules are your REAL backend security — they run on Google\'s servers and cannot be bypassed from the browser. Edit them in the console (Firestore → Rules) or deploy this file with "firebase deploy --only firestore:rules".',
      },
    ],
  },

  {
    phase: '05',
    title: 'Authentication basics — email + Google sign-in',
    color: '#4285F4',
    steps: [
      {
        label: 'Turn on the sign-in methods you want',
        isText: true,
        text: [
          '1. Firebase console → Build → Authentication → "Get started"',
          '2. Under "Sign-in method", enable the providers you need:',
          '   → Email/Password (simplest to start)',
          '   → Google (one click for users; add a support email)',
          '3. For Google/social sign-in on your live site, add your Hosting domain',
          '   (e.g. my-app.web.app) under Authentication → Settings →',
          '   "Authorized domains".',
        ],
        note: 'localhost is authorized by default so sign-in works while developing. Remember to add your live *.web.app (or custom) domain to Authorized domains, or Google sign-in fails only in production.',
      },
      {
        label: 'Email/password sign-up and login in React',
        isFile: true,
        fileName: 'src/authActions.js',
        commands: [
          `import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

export const signUp = (email, pass) =>
  createUserWithEmailAndPassword(auth, email, pass);

export const login = (email, pass) =>
  signInWithEmailAndPassword(auth, email, pass);

export const logout = () => signOut(auth);

// Subscribe to auth changes (call in a top-level effect/context)
export const watchAuth = (cb) => onAuthStateChanged(auth, cb);`,
        ],
        note: 'onAuthStateChanged fires whenever the user logs in or out and on page load — wire it into a React context/effect so your whole app knows who is signed in. Firebase handles password hashing and sessions for you.',
      },
      {
        label: 'Google sign-in (popup)',
        isFile: true,
        fileName: 'src/googleAuth.js',
        commands: [
          `import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const provider = new GoogleAuthProvider();

export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  return result.user; // uid, displayName, email, photoURL
}`,
        ],
        note: 'signInWithPopup is the easiest on desktop. On some mobile browsers popups are blocked — signInWithRedirect is the fallback. Both are free and unlimited on the Spark plan.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Deploy your app to Firebase Hosting',
    color: '#FFA000',
    steps: [
      {
        label: 'Build your React app first',
        commands: [
          `# Vite React → outputs to dist/
npm run build`,
        ],
        note: 'Vite outputs to dist/. Create React App outputs to build/. Note which one your project uses — you set it as the "public directory" in the next step.',
      },
      {
        label: 'Initialize Hosting in your project',
        commands: [
          `firebase init hosting`,
        ],
        note: 'Answer the prompts carefully: (1) "Use an existing project" → pick yours. (2) Public directory → type "dist" for Vite (or "build" for CRA). (3) "Configure as a single-page app (rewrite all urls to /index.html)?" → YES (this fixes 404-on-refresh for React Router). (4) "Set up automatic builds with GitHub?" → optional.',
      },
      {
        label: 'What firebase.json should look like',
        isFile: true,
        fileName: 'firebase.json',
        commands: [
          `{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ]
  }
}`,
        ],
        note: 'The "rewrites" block is the SPA fallback — it makes React Router / Vue Router deep links work on refresh. Make sure "public" matches your build output folder (dist or build).',
      },
      {
        label: 'Deploy — and get your live URL',
        commands: [
          `# Rebuild if you changed code, then deploy
npm run build`,
          `firebase deploy --only hosting`,
        ],
        note: 'After a few seconds you get a live URL like https://your-app.web.app and https://your-app.firebaseapp.com — both free, both with HTTPS. Every time you change code, run npm run build then firebase deploy again.',
      },
    ],
  },

  {
    phase: '07',
    title: 'Free-tier reality + go show it off',
    color: '#34D399',
    steps: [
      {
        label: 'Staying inside the free Spark plan',
        isText: true,
        text: [
          'For a portfolio or college app you will almost never hit these limits:',
          '',
          '→ Hosting: ~10 GB storage + ~10 GB/month transfer — thousands of visits',
          '→ Firestore: 50K reads + 20K writes PER DAY, 1 GiB stored',
          '→ Auth: free at any number of users for email/Google',
          '',
          'Ways students accidentally burn Firestore reads (avoid these):',
          '→ Reading an entire collection on every component render',
          '→ Not using onSnapshot carefully (real-time listeners re-read on change)',
          '→ Loading all data instead of paginating with limit()',
          '',
          'Card-free note for 2026: Hosting + Firestore + Auth need NO card. Only',
          'Cloud Storage (file uploads) now needs the Blaze plan — for images use a',
          'free image CDN (Cloudinary/ImageKit) instead to stay fully free.',
        ],
        note: 'The Spark plan is genuinely enough for student projects. Just be mindful of Firestore reads — batch and paginate instead of re-fetching whole collections, and you will stay far under 50K/day.',
      },
      {
        label: 'You are live — now use it',
        isText: true,
        text: [
          'You now have a real full-stack app: a live URL, a cloud database, and',
          'user login — with no server to manage. Put it to work:',
          '→ Add the *.web.app link to your resume and LinkedIn',
          '→ Pin the GitHub repo and add the live link + a short demo GIF',
          '→ In the README, list "Firebase (Hosting + Firestore + Auth)" — real,',
          '  in-demand keywords recruiters search for',
          '',
          'A working app with real auth and a database is a standout portfolio',
          'piece — it proves you can build more than a static page.',
        ],
        note: 'Deploying a full-stack app with authentication and a live database — entirely free — is exactly the kind of end-to-end skill that turns a project into an interview.',
      },
    ],
  },
]
