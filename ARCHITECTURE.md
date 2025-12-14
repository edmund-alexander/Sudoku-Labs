# ✅ Sudoku Logic Lab - Working Architecture

## Architecture Overview

**Embedded Google Apps Script Web App** - Frontend and backend in same GAS project.

```
Google Apps Script Project
├── Code.gs (Backend: Sudoku generation, Leaderboard, Chat, Logs)
└── index.html (Frontend: React game UI)
    └── Served via HtmlService.createTemplateFromFile('index')

All frontend-backend calls use: google.script.run (direct function calls)
```

## Key Components

### Code.gs (Google Apps Script Backend)
- **SHEET_ID**: `1a7-R53GPrnR0etBKPwqRA09-ZCHjO_DxPFvkKN_ZTWE`
- **doGet()**: Serves the frontend HTML directly
- **Public Functions** (callable from frontend):
  - `generateSudoku(difficulty)` - Creates new puzzle
  - `getLeaderboardData()` - Fetches scores
  - `saveLeaderboardScore(entry)` - Saves score
  - `getChatData()` - Fetches chat messages
  - `postChatData(msg)` - Posts chat message
  - `logClientError(entry)` - Logs errors
  
- **Private Functions** (helper functions, not callable from frontend):
  - `setupSheets_()` - Creates required sheets
  - Sudoku logic: `fillDiagonal_()`, `solveSudoku_()`, `isValid_()`, etc.
  - Security: `sanitizeInput_()`, `sanitizeOutput_()`

### index.html (Frontend)
- **Technology**: React 18, Babel standalone, Tailwind CSS
- **Function Calls**: Uses `google.script.run` for all GAS calls
- **No fetch() calls** - Everything goes through google.script.run
- **No CORS issues** - Same-origin by design

## Frontend-Backend Communication

### Old Way (GitHub Pages + Fetch - Didn't Work)
```javascript
// ❌ HTTP fetch with action params
fetch('https://script.google.com/macros/s/.../exec?action=generateSudoku')
```

### New Way (Embedded GAS - Works!)
```javascript
// ✅ Direct google.script.run calls
google.script.run
  .withSuccessHandler(resolve)
  .withFailureHandler(reject)
  .generateSudoku('Easy');
```

## Unified Frontend Call Wrapper

```javascript
const runGasFn = async (fnName, ...args) => {
  return new Promise((resolve, reject) => {
    window.google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      [fnName](...args);
  });
};

// Usage:
const puzzle = await runGasFn('generateSudoku', 'Easy');
const scores = await runGasFn('getLeaderboardData');
```

## Deployment Steps

1. **In Google Apps Script Editor**:
   - Create new Apps Script project
   - Upload Code.gs (copy entire content from apps_script/Code.gs)
   - Create index.html file
   - Paste content from index.html
   - Update SHEET_ID to your Google Sheet

2. **Deploy as Web App**:
   - Click **Deploy** → **New Deployment**
   - Select **Web App**
   - Execute as: **Your email address**
   - Who has access: **Anyone**
   - Click **Deploy**
   - Copy the deployment URL (looks like: https://script.google.com/macros/s/.../exec)
   - This URL is where users access the game

3. **Google Sheets Setup**:
   - Create a Google Sheet
   - Copy sheet ID from URL (between /d/ and /edit)
   - Update SHEET_ID in Code.gs
   - In GAS editor, run `setupSheets_()` manually
   - This creates Leaderboard, Chat, and Logs sheets

## File Structure

```
apps_script/
└── Code.gs                     # Backend (API, sudoku logic, security)

index.html                      # Frontend (React, game UI, google.script.run calls)

config/
├── config.example.js          # Not used anymore (was for external deployments)
├── config.local.js            # Not used anymore
└── README.md                  # Documentation

CONFIGURATION.md               # Config setup guide (now obsolete)
GAS_TROUBLESHOOTING.md        # Troubleshooting guide
```

## Why This Works

✅ **No CORS issues** - Frontend and backend in same origin
✅ **No 403 errors** - google.script.run doesn't need special permissions
✅ **Direct function calls** - All GAS functions directly accessible
✅ **Same codebase** - Both served from one Apps Script project
✅ **Simpler** - No fetch logic, no action routing, no URL parameters
✅ **Secure** - Private functions (ending with _) are not callable

## Google Sheets Database

Connected via `SHEET_ID = '1a7-R53GPrnR0etBKPwqRA09-ZCHjO_DxPFvkKN_ZTWE'`

**Sheets created automatically by setupSheets_():**

1. **Leaderboard**
   - Columns: Name | Time | Difficulty | Date
   - Stores all game scores

2. **Chat**
   - Columns: ID | Sender | Text | Timestamp
   - Last 50 messages returned to frontend

3. **Logs**
   - Columns: Timestamp | Type | Message | UserAgent | Count
   - Client-side errors logged here

## Testing

1. Deploy Code.gs and index.html as Web App
2. Open the deployment URL in browser
3. Game should load immediately
4. Try:
   - Starting a game (generateSudoku)
   - Saving a score (saveLeaderboardScore)
   - Sending chat messages (postChatData)
   - Checking leaderboard (getLeaderboardData)

## Differences from Original Plan

We initially planned:
- ❌ GitHub Pages frontend + GAS API backend (fetch-based)
- ❌ External config files for GAS URL

We now use:
- ✅ Embedded GAS web app (frontend + backend in one project)
- ✅ google.script.run for all function calls
- ✅ Simple, secure, no configuration needed

This works perfectly and avoids all deployment/permission issues!
