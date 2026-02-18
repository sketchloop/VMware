# Chrome OS VM Manager

Native Progressive Web App (PWA) for Chrome OS Virtual Machine Management

![Chrome OS](https://img.shields.io/badge/Chrome%20OS-Compatible-brightgreen)
![PWA](https://img.shields.io/badge/PWA-Progressive%20Web%20App-blue)
![Standalone](https://img.shields.io/badge/Standalone-No%20Dependencies-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## ⚡ What This Is

A **native Chrome OS application** that installs like any other app. Download, run, install, and go. No servers, no complex setup, no Linux environment needed.

## ✨ Features

- **Native App Installation** - Installs from the web like a real app
- **Offline Support** - Works offline with cached data
- **Zero Dependencies** - Everything included, no Node.js or npm required
- **Lightning Fast** - Minimal resources, instant launch
- **Chrome OS Optimized** - Built specifically for Chrome OS
- **Cross-Platform** - Also works on Windows, macOS, and Linux

## 🚀 Quick Start

### All Platforms - One Click:

1. **Extract** the downloaded file to any folder
2. **Double-click** the launcher for your OS:
   - **Windows**: `RUN.bat`
   - **macOS**: `RUN.command`
   - **Chrome OS / Linux**: `RUN.sh`
3. **Wait** 3 seconds - the app opens automatically in your browser
4. **Click Install** button to add to your app drawer (native app)
5. **Done!** App now launches like any other app on your system

That's it. No terminal. No complicated setup. Just download, extract, double-click.

## 📋 System Requirements

- **OS**: Chrome OS, Windows, macOS, or Linux
- **RAM**: 2GB minimum (4GB recommended)
- **Disk Space**: 300MB
- **Browser**: Chrome, Chromium, Edge, etc.
- **Additional Software**: None!

## 🎯 How It Works

1. **Download** the app package and extract it
2. **Double-click** the launcher file (`RUN.sh`, `RUN.bat`, or `RUN.command`)
3. **Browser opens** automatically with your app running
4. **Click Install** to add it as a native app to your system
5. **Launch anytime** from your app drawer, just like any other app

## 🏗️ Architecture

```
Frontend:  React + TypeScript (PWA)
Backend:   Express.js (Node.js) - runs locally
Storage:   Browser Cache + IndexedDB
Protocol:  HTTPS (local development)
```

## 📱 Progressive Web App (PWA)

This is a **Progressive Web App**, which means:
- ✅ Installable on desktop and mobile
- ✅ Works offline with service workers
- ✅ Native-like experience
- ✅ Updates automatically
- ✅ No app store required

## 🔧 Installation Methods

After the app launches, you have two options to install it as a native app:

### Option 1: Install Button (Easiest)
- Look for the **"Install App"** button in the browser
- Click it
- Confirm when prompted
- Done! App now appears in your app drawer

### Option 2: Browser Menu
- Click the **⋮** (three dots) menu in Chrome
- Select **"Install Chrome OS VM Manager"**
- Confirm
- App is now installed

### Method 3: From App Drawer
1. App automatically appears in app drawer
2. Right-click and "Pin to shelf"
3. Launch anytime!

## 🎨 Customization

To modify the app:

```bash
# Install dependencies
npm install

# Build for all platforms
npm run build:standalone

# Build specific platform
npm run bundle:win    # Windows
npm run bundle:linux  # Linux
npm run bundle:mac    # macOS
```

See [BUILD_STANDALONE.txt](./BUILD_STANDALONE.txt) for detailed build instructions.

## 📚 Documentation

- [SETUP.txt](./SETUP.txt) - Installation and setup guide
- [BUILD_STANDALONE.txt](./BUILD_STANDALONE.txt) - Building from source

## 🔒 Security & Privacy

- ✅ Runs completely locally on your device
- ✅ No data sent to external servers
- ✅ No tracking or analytics
- ✅ No cloud storage required
- ✅ Complete privacy

## 🐛 Troubleshooting

### App won't launch?
- Ensure RUN script completed successfully
- Verify http://localhost:5000 is accessible
- Wait 5 seconds and try again

### Can't install as app?
- Try Chrome menu instead of install button
- Refresh page and try again
- In Chrome OS, app menu (⋮) → "Install"

### Port already in use?
- Edit `.env` file: `PORT=5001`
- Restart the app

## 📦 What's Included

```
├── Frontend (React + TypeScript)
├── Backend (Express.js)
├── Service Worker (Offline support)
├── Manifest (PWA metadata)
├── Launchers (RUN.bat, RUN.sh, RUN.command)
└── Everything needed to run
```

## 🚀 Performance

- **Package Size**: ~100MB (includes Node.js runtime)
- **Memory Usage**: ~150-300MB while running
- **CPU Usage**: Minimal
- **Startup Time**: 2-5 seconds

## 🤝 Contributing

Fork, modify, and submit pull requests!

## 📄 License

MIT License - See LICENSE file for details

## 📧 Support

- 📖 Check [SETUP.txt](./SETUP.txt) first
- 🐛 Report issues on GitHub
- 💬 Discuss in GitHub Discussions

---

**Made for Chrome OS. Works everywhere.**

*Version 1.0.0 | Updated February 2026*
