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

### For Chrome OS Users:

```bash
# 1. Extract the downloaded file
# 2. Open terminal in the folder
# 3. Run:
./RUN.sh

# 4. App opens in browser
# 5. Click install button
# 6. App now appears in your app drawer!
```

### For Windows:
```bash
# Double-click: RUN.bat
```

### For macOS:
```bash
# Double-click: RUN.command
```

### For Linux:
```bash
chmod +x RUN.sh && ./RUN.sh
```

## 📋 System Requirements

- **OS**: Chrome OS, Windows, macOS, or Linux
- **RAM**: 2GB minimum (4GB recommended)
- **Disk Space**: 300MB
- **Browser**: Chrome, Chromium, Edge, etc.
- **Additional Software**: None!

## 🎯 How It Works

1. **Download** the app package
2. **Extract** to any folder
3. **Run** the launcher script for your OS
4. **Install** as native app (one click)
5. **Launch** from your app drawer anytime

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

### Method 1: Install Button
1. Open http://localhost:5000
2. Click install button in browser
3. Confirm installation
4. Done!

### Method 2: Chrome Menu
1. Open http://localhost:5000
2. Click ⋮ (three dots)
3. Select "Install Chrome OS VM Manager"
4. Confirm

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
