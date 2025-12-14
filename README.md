# Sudoku Logic Lab 🧩

A modern, browser-based Sudoku game with leaderboard, chat, and campaign features. Built with React and Google Apps Script.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://edmund-alexander.github.io/Sudoku-Labs/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ✨ Features

- 🎮 **Multiple Difficulty Levels**: Easy, Medium, Hard, and Daily challenges
- 🏆 **Global Leaderboard**: Track your best times and compete with others
- 💬 **Chat System**: Discuss strategies and connect with other players
- 📊 **Campaign Mode**: Progress through increasingly challenging puzzles
- ⏱️ **Timer & Move Counter**: Track your solving efficiency
- 🎨 **Modern UI**: Clean, responsive design with dark mode support
- 🚀 **Serverless Architecture**: No backend server to maintain
- 🔒 **Privacy-First**: No login required, play anonymously

## 🚀 Quick Start

### For Players

Just visit the live game: **[Play Now](https://edmund-alexander.github.io/Sudoku-Labs/)**

### For Developers

1. **Clone the repository**
   ```bash
   git clone https://github.com/edmund-alexander/Sudoku-Labs.git
   cd Sudoku-Labs
   ```

2. **Set up configuration**
   ```bash
   cp config/config.example.js config/config.local.js
   ```
   
3. **Open in browser**
   ```bash
   # Open index.html in your browser
   # or use a simple HTTP server
   python -m http.server 8000
   ```

4. **For full functionality** (leaderboard, chat), you'll need to:
   - Deploy the Google Apps Script backend (see [Deployment Guide](docs/DEPLOYMENT_CHECKLIST.md))
   - Update `config/config.local.js` with your deployment URL

## 📚 Documentation

- **[Architecture](docs/ARCHITECTURE.md)** - System design and component overview
- **[Configuration](docs/CONFIGURATION.md)** - How to configure the application
- **[Deployment Checklist](docs/DEPLOYMENT_CHECKLIST.md)** - Complete deployment guide
- **[Troubleshooting](docs/TROUBLESHOOTING.md)** - Common issues and solutions
- **[Wiki](../../wiki)** - Additional guides and resources

## 🏗️ Architecture

```
GitHub Pages (Frontend)  ←→  Google Apps Script (Backend)
     ↓                              ↓
  index.html                    Code.gs
  src/app.jsx                   (REST API)
  (React UI)                        ↓
                              Google Sheets
                        (Leaderboard, Chat, Logs)
```

**Tech Stack:**
- **Frontend**: React 18, Tailwind CSS, Babel (in-browser compilation)
- **Backend**: Google Apps Script
- **Database**: Google Sheets
- **Hosting**: GitHub Pages

## 🛠️ Development

### Project Structure

```
Sudoku-Labs/
├── apps_script/
│   └── Code.gs              # Backend API
├── config/
│   ├── config.example.js    # Configuration template
│   └── config.local.js      # Your config (gitignored)
├── docs/                    # Documentation
├── src/
│   └── app.jsx             # React application
├── index.html              # Main HTML file
└── diagnostic.sh           # API health check script
```

### Running Locally

The app runs entirely in the browser with in-browser Babel compilation. Simply open `index.html` or serve it with any HTTP server.

**Without backend:**
- Sudoku generation works (client-side)
- Leaderboard and chat are disabled

**With backend:**
- All features enabled
- Requires Google Apps Script deployment

### API Health Check

```bash
# Set your GAS URL
export GAS_URL="https://script.google.com/macros/s/YOUR_ID/exec"

# Run diagnostics
./diagnostic.sh
```

## 📝 Configuration

Configuration is managed through `config/config.local.js` (gitignored):

```javascript
const CONFIG = {
  GAS_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
};
```

See [Configuration Guide](docs/CONFIGURATION.md) for details.

## 🚢 Deployment

### Frontend (GitHub Pages)

1. Push `index.html` and `src/app.jsx` to your repository
2. Enable GitHub Pages in repository settings
3. Your site will be live at `https://[username].github.io/[repo]/`

### Backend (Google Apps Script)

1. Create a new Apps Script project at [script.google.com](https://script.google.com)
2. Copy code from `apps_script/Code.gs`
3. Deploy as Web App with "Anyone" access
4. Copy deployment URL to `config/config.local.js`

**Full deployment guide:** [DEPLOYMENT_CHECKLIST.md](docs/DEPLOYMENT_CHECKLIST.md)

## 🎮 How to Play

1. **Select Difficulty**: Choose Easy, Medium, Hard, or Daily challenge
2. **Fill the Grid**: Click cells to select, type numbers 1-9
3. **Complete the Puzzle**: Fill all cells correctly
4. **Submit Score**: Enter your name to save your time to the leaderboard
5. **Chat**: Discuss strategies with other players

**Rules:**
- Each row must contain digits 1-9
- Each column must contain digits 1-9
- Each 3×3 box must contain digits 1-9
- No duplicates in any row, column, or box

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to your fork** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Development Guidelines

- Keep changes minimal and focused
- Follow existing code style
- Test all changes locally
- Update documentation if needed
- Ensure no security vulnerabilities

## 🐛 Troubleshooting

**Common Issues:**

- **404 on GAS requests**: Check deployment URL in `config/config.local.js`
- **CORS errors**: Ensure GAS deployment has "Anyone" access
- **Leaderboard not loading**: Verify Sheet ID in `Code.gs` matches your Google Sheet
- **Config not found warning**: Copy `config.example.js` to `config.local.js`

See [Troubleshooting Guide](docs/TROUBLESHOOTING.md) for more solutions.

## 📊 API Reference

All endpoints use GET requests with an `action` parameter:

| Endpoint | Parameters | Description |
|----------|-----------|-------------|
| `ping` | none | Health check |
| `generateSudoku` | `difficulty` | Generate new puzzle |
| `getLeaderboard` | none | Get top scores |
| `saveScore` | `name`, `difficulty`, `time`, `date` | Save score |
| `getChat` | none | Get chat messages |
| `postChat` | `username`, `text`, `id` | Post message |
| `logError` | `type`, `message`, `userAgent` | Log error |

**Example:**
```javascript
const url = `${GAS_URL}?action=generateSudoku&difficulty=Easy`;
const response = await fetch(url);
const puzzle = await response.json();
```

## 🔒 Security

- Configuration files with sensitive data are gitignored
- No authentication required (public game)
- Input sanitization on backend
- XSS protection via proper escaping
- HTTPS-only communication

**Security considerations:**
- `config.local.js` is never committed (in `.gitignore`)
- GAS deployment URL can be public (it's just an API endpoint)
- No personal data is collected
- Chat messages are sanitized

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React and Google Apps Script
- Styled with Tailwind CSS
- Hosted on GitHub Pages
- Inspired by classic Sudoku puzzles

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/edmund-alexander/Sudoku-Labs/issues)
- **Wiki**: [Project Wiki](https://github.com/edmund-alexander/Sudoku-Labs/wiki)
- **Discussions**: Use in-game chat or GitHub Discussions

## 🎯 Roadmap

- [ ] Puzzle hints system
- [ ] User accounts and profiles
- [ ] Multiplayer competitive mode
- [ ] Mobile app version
- [ ] Puzzle difficulty analyzer
- [ ] Custom puzzle import/export

---

**Made with ❤️ by the Sudoku-Labs community**

[Play Now](https://edmund-alexander.github.io/Sudoku-Labs/) | [Report Bug](https://github.com/edmund-alexander/Sudoku-Labs/issues) | [Request Feature](https://github.com/edmund-alexander/Sudoku-Labs/issues)
