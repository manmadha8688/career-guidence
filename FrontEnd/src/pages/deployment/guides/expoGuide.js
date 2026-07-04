export const EXPO_GUIDE = [
  {
    phase: '01',
    title: 'What "deploying" a mobile app actually means',
    color: '#4630EB',
    steps: [
      {
        label: 'A phone app ships differently from a website — here is the map',
        isText: true,
        text: [
          'A website goes to a URL. A mobile app is different — there is no single',
          '"deploy" button. Instead there are a few ways to get your React Native',
          '(Expo) app into someone else\'s hands, and they cost different things.',
          '',
          'Expo (with its cloud service EAS — Expo Application Services) gives you',
          'three honest ways to share your app:',
          '',
          '1) Expo Go + QR code  — instant, free, for showing people quickly',
          '   Anyone with the free "Expo Go" app scans a QR and runs your app.',
          '',
          '2) A shareable Android APK  — free, a real installable file',
          '   You build an .apk and send it. They install it directly. No store.',
          '',
          '3) A web version  — free, a normal website URL',
          '   React Native runs on the web too; you export it and host it free.',
          '',
          'The honest catch (covered fully in Phase 08):',
          '→ Sharing on ANDROID and the WEB is free.',
          '→ Putting an app on the Apple App Store or Google Play Store costs a',
          '  one-time/annual developer fee — NOT free. For a portfolio you do not',
          '  need the stores at all.',
        ],
        note: 'For showcasing a project, you do NOT need the app stores. A QR code, a free APK, or a web link all prove your app works — and all three are free.',
      },
    ],
  },

  {
    phase: '02',
    title: 'Test locally with Expo Go first',
    color: '#9B6ED4',
    steps: [
      {
        label: 'Run your app on your own phone in 2 minutes',
        isText: true,
        text: [
          '1. Install the free "Expo Go" app on your phone (App Store / Play Store)',
          '2. In your project folder on your computer, run:',
          '      npx expo start',
          '3. A QR code appears in the terminal',
          '4. Android: scan it with the Expo Go app.',
          '   iPhone: scan it with the Camera app → tap the Expo Go banner.',
          '5. Your app loads live on your phone. Edit code → it reloads instantly.',
          '',
          'Your phone and computer must be on the SAME Wi-Fi network. If it will',
          'not connect, run:  npx expo start --tunnel  (slower, but works across',
          'networks).',
        ],
        note: 'Expo Go is the fastest way to test on a real device with zero setup — no Android Studio, no Xcode. This is dev/testing, not the final shareable build.',
      },
      {
        label: 'Confirm it works before you build anything',
        isText: true,
        text: [
          '✅ Every screen opens and navigation works',
          '✅ Images and icons load',
          '✅ No red error screens',
          '✅ It looks right on a real phone, not just the simulator',
          '',
          'If something breaks in Expo Go, it will break in the built app too.',
          'Fix it here first — building takes minutes and uses your free build',
          'quota, so you want the app solid before you spend a build.',
        ],
        note: 'Builds (Phase 05) are limited on the free plan (15 Android/month). Do not waste them on an app that still has bugs — get it right in Expo Go first.',
      },
    ],
  },

  {
    phase: '03',
    title: 'Set up EAS (Expo\'s free cloud build service)',
    color: '#4630EB',
    steps: [
      {
        label: 'Install the CLI and log in',
        commands: [
          `# Install the EAS command-line tool
npm install -g eas-cli`,
          `# Create a free Expo account / log in (opens the browser)
eas login`,
          `# Link this project to EAS and create eas.json
eas build:configure`,
        ],
        note: 'The Expo account is free. eas build:configure creates an eas.json file that defines your build "profiles" (like development, preview, production).',
      },
      {
        label: 'Understand eas.json — add a shareable "preview" profile',
        isFile: true,
        fileName: 'eas.json',
        commands: [
          `{
  "cli": { "version": ">= 5.0.0" },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" }
    },
    "production": {}
  },
  "submit": { "production": {} }
}`,
        ],
        note: 'The "preview" profile with "buildType": "apk" is the important one for students — it produces a plain .apk file you can send to anyone, instead of a store-only bundle.',
      },
    ],
  },

  {
    phase: '04',
    title: 'Set your app identity (needed before a real build)',
    color: '#F59E0B',
    steps: [
      {
        label: 'Fill in app.json / app.config.js',
        isFile: true,
        fileName: 'app.json',
        commands: [
          `{
  "expo": {
    "name": "My Cool App",
    "slug": "my-cool-app",
    "version": "1.0.0",
    "icon": "./assets/icon.png",
    "android": {
      "package": "com.yourname.mycoolapp"
    },
    "ios": {
      "bundleIdentifier": "com.yourname.mycoolapp"
    }
  }
}`,
        ],
        note: 'The android.package (reverse-domain style, all lowercase, unique to you) is REQUIRED for an Android build. Set a real icon too — a default icon looks unfinished in your portfolio screenshots.',
      },
    ],
  },

  {
    phase: '05',
    title: 'Build a shareable Android APK — free',
    color: '#3DDC84',
    steps: [
      {
        label: 'Kick off the build in Expo\'s cloud',
        commands: [
          `# Builds an installable .apk on Expo's servers (no Android Studio needed)
eas build -p android --profile preview`,
        ],
        note: 'The build runs in the cloud, so your laptop does not need Android tooling. On the free plan these are "low-priority" builds — they may wait in a queue during busy times, but they are free.',
      },
      {
        label: 'Get the link and share it',
        isText: true,
        text: [
          'When the build finishes (a few minutes), EAS prints:',
          '→ a build details page URL, and',
          '→ a direct download link for the .apk',
          '',
          'To share your app:',
          '1. Send anyone the .apk download link (or the QR on the build page)',
          '2. On their Android phone they tap it → "Install"',
          '3. Android may warn "install from unknown source" — that is normal for',
          '   any app not from the Play Store; they allow it once and install.',
          '',
          'That is a real, installable app in someone\'s pocket — for free, no',
          'store account, no fee.',
        ],
        note: 'The .apk works on any Android phone with no store involved. This is the single best free way to let people actually USE your React Native app.',
      },
      {
        label: 'Free build quota — the honest numbers',
        isText: true,
        text: [
          'Expo\'s free plan includes:',
          '→ 15 Android builds per month',
          '→ 15 iOS builds per month',
          '(low-priority queue; they reset monthly)',
          '',
          'A student rebuilds only when native things change (new icon, new',
          'package, version bump). For everyday code changes you use EAS Update',
          'instead (Phase 06), which does NOT cost a build. So 15/month is plenty.',
        ],
        note: 'Rebuild only when you truly need a fresh binary. Day-to-day code changes ship via EAS Update (next phase) for free, without touching your 15 monthly builds.',
      },
    ],
  },

  {
    phase: '06',
    title: 'Push updates without rebuilding — EAS Update',
    color: '#8B5CF6',
    steps: [
      {
        label: 'Ship JS/asset changes instantly (over the air)',
        commands: [
          `# One-time: add the update capability to your project
eas update:configure`,
          `# Publish your current code as an over-the-air update
eas update --branch preview --message "fixed the login screen"`,
        ],
        note: 'EAS Update pushes new JavaScript and assets to an already-installed app — the user gets your fix next time they open it, without reinstalling. It does not use your build quota.',
      },
      {
        label: 'Share a preview via QR without building at all',
        isText: true,
        text: [
          'For quick sharing during development, Expo hosts a QR for your update:',
          '→ After an eas update (or eas build with internal distribution), Expo',
          '  gives you a link/QR at qr.expo.dev',
          '→ Testers with a development build or Expo Go can scan it and see your',
          '  latest version immediately.',
          '',
          'Free plan reality: updates can reach up to ~1,000 monthly active users',
          'for free. Far more than any portfolio project needs.',
          '',
          'What updates CANNOT change: anything "native" (adding a new native',
          'library, changing the app icon or package name). Those need a new',
          'build (Phase 05).',
        ],
        note: 'Rule of thumb: JavaScript/UI change → eas update (free, instant). Native change (new native module, icon, permissions) → new eas build.',
      },
    ],
  },

  {
    phase: '07',
    title: 'Deploy the WEB version — a free public URL',
    color: '#60A5FA',
    steps: [
      {
        label: 'Export your app as a website',
        commands: [
          `# Produces a static web build in the dist/ folder
npx expo export --platform web`,
        ],
        note: 'React Native components render to real HTML/CSS/JS on the web via react-native-web (bundled with Expo). Not every native feature has a web equivalent, but most UI-driven apps export cleanly.',
      },
      {
        label: 'Host that dist/ folder free (pick one)',
        isText: true,
        text: [
          'The exported dist/ folder is a normal static site. Host it free on any',
          'of these (same as any Vue/React site):',
          '',
          '→ Netlify: drag the dist/ folder onto app.netlify.com, or connect the',
          '  repo (build command: npx expo export --platform web, publish: dist)',
          '→ Vercel: import the repo, set the build command and output "dist"',
          '→ Cloudflare Pages: connect the repo, same build command + dist output',
          '',
          'Or use Expo\'s own free hosting:',
          '   eas deploy',
          '   (deploys the web export and returns a live *.expo.app URL)',
          '',
          'Now you have a link anyone can open in a browser — perfect for a',
          'resume, even for people who will not install an APK.',
        ],
        note: 'A web URL + an Android APK together cover almost everyone: recruiters can click the link on a laptop, and Android users can install the real app. Both free.',
      },
    ],
  },

  {
    phase: '08',
    title: 'The App Stores — the honest cost breakdown',
    color: '#EF4444',
    steps: [
      {
        label: 'What is free, and what genuinely is not',
        isText: true,
        text: [
          'This is where students get misled, so here is the plain truth:',
          '',
          'FREE (no fees, ever):',
          '✅ Testing on your phone with Expo Go',
          '✅ Building & sharing an Android .apk directly (Phase 05)',
          '✅ The web version on Netlify/Vercel/Cloudflare/Expo (Phase 07)',
          '✅ Over-the-air updates to ~1,000 users (Phase 06)',
          '',
          'NOT free (real money to the store owners, not to Expo):',
          '💰 Google Play Store: a ONE-TIME $25 developer registration fee',
          '💰 Apple App Store: a $99 PER YEAR Apple Developer membership',
          '',
          'Also honest about iPhone: to put an app on an iPhone that is not your',
          'own — even via TestFlight — you need that paid Apple Developer',
          'account. There is no free way to distribute an iOS app to others.',
          '',
          'For a PORTFOLIO you simply do not need the stores. The free Android',
          'APK + web link prove the exact same skill, at zero cost.',
        ],
        note: 'The store fees go to Apple and Google, not Expo. Skip them for a portfolio — a free APK and a web URL are more than enough to show recruiters a working mobile app.',
      },
    ],
  },

  {
    phase: '09',
    title: 'Environment variables in Expo (and the secret rule)',
    color: '#EC4899',
    steps: [
      {
        label: 'Public config vs. real secrets',
        isText: true,
        text: [
          'Expo reads env variables prefixed with EXPO_PUBLIC_ into your app:',
          '',
          '   EXPO_PUBLIC_API_URL=https://your-backend.onrender.com',
          '',
          'Read it in code with:  process.env.EXPO_PUBLIC_API_URL',
          '',
          '⚠️ Just like a website, ANYTHING shipped in the app is readable by',
          'anyone who inspects it. An installed app can be unpacked. So:',
          '',
          '✅ SAFE: your public backend URL, app name, public analytics IDs',
          '🚫 NEVER: database passwords, JWT secrets, payment SECRET keys, admin',
          '   credentials — those live on your BACKEND, and the app calls the',
          '   backend for anything sensitive.',
        ],
        note: 'A mobile app is not a safe place for secrets — treat EXPO_PUBLIC_ values as public. Keep true secrets on a server the app talks to (see the FastAPI/Node/Flask guides).',
      },
    ],
  },

  {
    phase: '10',
    title: 'Free tier summary + how to show it off',
    color: '#34D399',
    steps: [
      {
        label: 'Your zero-cost mobile showcase kit',
        isText: true,
        text: [
          'Put together, here is your entirely free way to ship a mobile app:',
          '',
          '→ Develop & test:  Expo Go + QR (free, instant)',
          '→ Real installable app:  eas build --profile preview → share the .apk',
          '→ Browser version:  npx expo export --platform web → free hosting',
          '→ Push fixes:  eas update (free, no rebuild)',
          '',
          'For your resume / portfolio:',
          '→ Link the web version (recruiters click it on a laptop)',
          '→ Offer the APK download for Android users',
          '→ Add 2–3 screenshots and a short screen-recording GIF to the README',
          '→ Say "React Native (Expo)" and "EAS Build/Update" — real, in-demand',
          '  keywords',
        ],
        note: 'A working mobile app is a standout portfolio piece because far fewer students ship one. You can do it end-to-end for free — no store fees required.',
      },
    ],
  },
]
