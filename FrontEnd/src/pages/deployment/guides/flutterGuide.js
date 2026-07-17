export const FLUTTER_GUIDE = [
  {
    phase: '01',
    title: 'What "deploying" a Flutter app actually means',
    color: '#02569B',
    steps: [
      {
        label: 'One codebase, several ways to share — at different costs',
        isText: true,
        text: [
          'Flutter builds from ONE Dart codebase to many targets: Android, iOS, web,',
          'Windows, macOS, Linux. But "deploying" is different per target, and they',
          'cost different things. Here is the honest map for a student:',
          '',
          '1) WEB build — free',
          '   flutter build web → a normal static site you host free (Firebase,',
          '   GitHub Pages, Netlify, Vercel). Anyone opens it in a browser.',
          '',
          '2) Android APK — free',
          '   flutter build apk → a real .apk file you send to people. They install',
          '   it directly, no store needed.',
          '',
          '3) The app STORES — NOT free',
          '   Google Play: one-time $25 developer fee.',
          '   Apple App Store: $99 PER YEAR — and it is the ONLY way to put an iOS',
          '   app on someone else\'s iPhone. There is no free iOS distribution.',
          '',
          'This guide covers the two FREE paths (web + APK) in depth, and is honest',
          'about the store costs (Phase 06). For a portfolio you do not need the',
          'stores at all — a web link and an APK prove the same skill.',
        ],
        note: 'For showcasing a Flutter project you do NOT need the app stores. A free web build + a free Android APK let recruiters click a link on a laptop and let Android users install the real app — at zero cost.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Test locally and build the web release',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Confirm your toolchain and run the app',
        commands: [
          `# Check Flutter is installed and healthy
flutter doctor`,
          `# Enable web support (usually already on in modern Flutter)
flutter config --enable-web`,
          `# Run in Chrome to test the web version live
flutter run -d chrome`,
        ],
        note: 'flutter doctor flags missing pieces (Android toolchain, Chrome, licenses). Fix anything with a red X before building. Test the WEB version specifically — some mobile-only plugins (camera, some native APIs) do not work on web.',
      },
      {
        label: 'Build the web release',
        commands: [
          `# Produces the static site in build/web
flutter build web --release`,
        ],
        note: 'The output lands in build/web — that folder is a plain static site (index.html + assets). Any static host can serve it. If the build fails, fix it locally first; the host runs the same command.',
      },
      {
        label: 'Preview the build locally before deploying',
        commands: [
          `cd build/web`,
          `# Serve it with any static server, e.g. Python:
python -m http.server 8000`,
        ],
        note: 'Open http://localhost:8000 to see the exact files you are about to deploy. Flutter web can be heavy on first load (it downloads the engine) — that is normal; it caches after the first visit.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Deploy the web build to Firebase Hosting (easiest)',
    color: '#FFCA28',
    steps: [
      {
        label: 'Install the CLI and log in',
        commands: [
          `npm install -g firebase-tools`,
          `firebase login`,
        ],
        note: 'Firebase Hosting free (Spark) gives ~10 GB storage + ~10 GB/month transfer with free SSL and a *.web.app domain — plenty for a portfolio app, no credit card needed.',
      },
      {
        label: 'Option A — classic (you build, Firebase serves build/web)',
        commands: [
          `# In your Flutter project root
firebase init hosting`,
          `# Build the web release
flutter build web --release`,
          `# Deploy the built folder
firebase deploy --only hosting`,
        ],
        note: 'During firebase init hosting: set the public directory to "build/web" (NOT the default "public"), and answer YES to "Configure as a single-page app" so Flutter\'s routing works on refresh. Rebuild with flutter build web before each deploy.',
      },
      {
        label: 'Option B — let Firebase build Flutter for you (framework-aware)',
        commands: [
          `# Turn on the web-frameworks preview
firebase experiments:enable webframeworks`,
          `# Init hosting → choose "Flutter Web" as the framework
firebase init hosting`,
          `# This runs "flutter build web --release" for you, then deploys
firebase deploy`,
        ],
        note: 'The framework-aware path detects Flutter and runs the web build automatically on deploy — you do not run flutter build web yourself. Either option works; Option A is more explicit, Option B is fewer steps.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Deploy the web build to GitHub Pages (100% free, no CLI)',
    color: '#F97316',
    steps: [
      {
        label: '⚠️ The base-href gotcha — the #1 blank-page cause',
        isText: true,
        text: [
          'GitHub Pages serves a PROJECT site from a sub-path:',
          '   https://USERNAME.github.io/REPO_NAME/',
          '',
          'Flutter web, by default, assumes it lives at the ROOT ("/"). If you deploy',
          'to a sub-path without telling Flutter, every JS/asset request 404s and you',
          'get a BLANK PAGE. The fix is the --base-href flag, set to your repo name',
          'with slashes on BOTH sides.',
          '',
          'Requirement: your web/index.html must contain the placeholder line',
          '   <base href="$FLUTTER_BASE_HREF">',
          'inside <head>. Modern Flutter projects already have it; older ones have',
          '<base href="/"> which you must change to the placeholder.',
        ],
        note: 'Blank page on GitHub Pages = wrong base-href 99% of the time. The value MUST match your repository name exactly, e.g. /my-flutter-app/ (leading AND trailing slash). A user/org site at username.github.io needs base-href "/" (the default).',
      },
      {
        label: 'Build with the correct base-href',
        commands: [
          `# Replace REPO_NAME with your exact GitHub repository name
flutter build web --release --base-href "/REPO_NAME/"`,
        ],
        note: 'Only for a PROJECT site (username.github.io/REPO_NAME). If you instead named the repo USERNAME.github.io (a user site served at the root), drop this flag and just use flutter build web --release.',
      },
      {
        label: 'Push the build/web folder to a gh-pages branch',
        commands: [
          `# From your project root, publish just the build output
cd build/web`,
          `git init`,
          `git add .`,
          `git commit -m "deploy flutter web"`,
          `git branch -M gh-pages`,
          `git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git`,
          `git push -f origin gh-pages`,
        ],
        note: 'Then on GitHub: repo → Settings → Pages → set Source to the "gh-pages" branch, "/ (root)". Wait a minute, then open https://YOUR_USERNAME.github.io/REPO_NAME/. Tip: a GitHub Actions workflow can automate this build+publish on every push (see subosito/flutter-action).',
      },
    ],
  },

  {
    phase: '05',
    title: 'Build a shareable Android APK — free',
    color: '#3DDC84',
    steps: [
      {
        label: 'Build the release APK',
        commands: [
          `# Builds a release .apk on your machine (needs the Android toolchain)
flutter build apk --release`,
        ],
        note: 'The file appears at build/app/outputs/flutter-apk/app-release.apk. This is a real, installable Android app — no Play Store, no fee. You need Android SDK/tooling installed (flutter doctor confirms it).',
      },
      {
        label: 'Optional — smaller, per-architecture APKs',
        commands: [
          `# Splits into smaller APKs per CPU architecture
flutter build apk --split-per-abi`,
        ],
        note: 'A single universal APK is bigger because it bundles all CPU architectures. --split-per-abi produces smaller files (arm64-v8a is the one most modern phones use). For simple sharing, the plain app-release.apk is easiest — just larger.',
      },
      {
        label: 'Share the APK so people can install it',
        isText: true,
        text: [
          '1. Upload build/app/outputs/flutter-apk/app-release.apk somewhere people',
          '   can download it — Google Drive, GitHub Releases, or your own site.',
          '   (GitHub Releases is great: attach the .apk to a release on your repo.)',
          '',
          '2. The person opens the link on an Android phone and downloads it.',
          '',
          '3. Android warns "install from unknown source" — that is normal for any',
          '   app not from the Play Store. They allow it once and install.',
          '',
          'That is a real app in someone\'s pocket, for free, with no store account.',
        ],
        note: 'GitHub Releases is the cleanest free host for an APK — it sits right next to your code, and the download link is stable. Add a short note that Android may ask to allow "unknown sources".',
      },
    ],
  },

  {
    phase: '06',
    title: 'The app stores — the honest cost breakdown',
    color: '#EF4444',
    steps: [
      {
        label: 'What is free, and what genuinely is not',
        isText: true,
        text: [
          'This is where students get misled, so here is the plain truth:',
          '',
          'FREE (no fees, ever):',
          '✅ Testing on your phone / emulator (flutter run)',
          '✅ Building & sharing an Android .apk directly (Phase 05)',
          '✅ The web version on Firebase / GitHub Pages / Netlify (Phases 03–04)',
          '',
          'NOT free (money to the store owners, not to Flutter/Google Cloud):',
          '💰 Google Play Store: a ONE-TIME $25 developer registration fee',
          '💰 Apple App Store: a $99 PER YEAR Apple Developer membership',
          '',
          'Honest about iPhone: to put a Flutter iOS app on any iPhone that is not',
          'your own — even via TestFlight — you need the paid Apple Developer',
          'account AND a Mac to build it. There is no free way to distribute an iOS',
          'app to others.',
          '',
          'For a PORTFOLIO you simply do not need the stores. The free Android APK',
          '+ web link prove the exact same skill at zero cost.',
        ],
        note: 'Store fees go to Apple and Google, not to Flutter. Skip them for a portfolio. If you ever DO publish to Play, note that Google now requires an Android App Bundle (flutter build appbundle → .aab), not a raw APK, for store uploads.',
      },
    ],
  },

  {
    phase: '07',
    title: 'Your free showcase kit + how to present it',
    color: '#34D399',
    steps: [
      {
        label: 'Environment values and the secret rule',
        isText: true,
        text: [
          'A shipped Flutter app (web OR APK) can be unpacked and inspected. So,',
          'exactly like a website:',
          '',
          '✅ SAFE to bundle: your public backend URL, app name, public API bases,',
          '   Firebase web config (designed to be public)',
          '🚫 NEVER bundle: database passwords, JWT secrets, payment SECRET keys,',
          '   admin credentials — those live on a BACKEND your app calls.',
          '',
          'Pass build-time config with --dart-define:',
          '   flutter build web --dart-define=API_URL=https://api.example.com',
          '   read it with: const String.fromEnvironment("API_URL")',
        ],
        note: 'Treat anything compiled into a Flutter app as public — a determined user can extract it. Keep true secrets on a server the app talks to (see the FastAPI / Node / Flask backend guides).',
      },
      {
        label: 'Your entirely-free Flutter showcase',
        isText: true,
        text: [
          'Put together, here is the zero-cost way to ship a Flutter app:',
          '',
          '→ Develop & test:   flutter run (Chrome or a device)',
          '→ Web version:      flutter build web → Firebase / GitHub Pages (free URL)',
          '→ Android app:       flutter build apk → share the .apk via GitHub Releases',
          '',
          'For your resume / portfolio:',
          '→ Link the web version (recruiters click it on a laptop)',
          '→ Offer the APK download for Android users',
          '→ Add 2–3 screenshots and a short screen-recording GIF to the README',
          '→ Say "Flutter (Dart)" and list web + Android — real, in-demand keywords',
          '',
          'Fewer students ship a real mobile app, so a working Flutter build with a',
          'live link is a memorable, standout portfolio piece.',
        ],
        note: 'A web link + an Android APK together cover almost everyone — laptop users click, Android users install — and both are completely free. That is more than enough to prove your mobile skills.',
      },
    ],
  },
]
