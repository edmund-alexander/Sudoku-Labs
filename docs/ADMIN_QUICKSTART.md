# 🔐 Admin Console - Quick Start Guide

## What is the Admin Console?

The Admin Console is a secure, hidden administrative panel for Sudoku Labs that allows you to:
- 💬 Moderate chat (delete messages, ban/mute users)
- 👥 Manage users (view stats, edit data)
- 📊 Modify player statistics
- 🎨 Manage themes and assets
- ⚙️ Perform system maintenance

**Access**: Only via browser console - no visible UI for regular users!

## One-Time Setup (5 minutes)

### Step 1: Run Setup Script

```bash
cd /path/to/Sudoku-Labs
bash scripts/setup-admin.sh
```

This will:
- Prompt for admin username and password
- Generate SHA-256 hash
- Create `config/admin.local.js` (gitignored)
- Display backend configuration values

### Step 2: Configure Google Apps Script Backend

1. Open your Google Apps Script project
2. Click **File → Project Properties → Script Properties**
3. Add TWO properties (use values from setup script):
   ```
   Key: ADMIN_USERNAME
   Value: [your username from script]

   Key: ADMIN_PASSWORD_HASH
   Value: [your hash from script]
   ```

### Step 3: Update Backend (Google Apps Script)

The admin endpoints are now **already included** in the main `Code.gs` file!

1. **Open your Google Apps Script project** containing Code.gs

2. **Replace the entire Code.gs file** with the version from the repository:
   - Copy the entire contents of `backend/gas/Code.gs`
   - Paste into your GAS Code.gs, replacing all existing code

3. **Run the setup function** (one-time):
   - In GAS, select the function: `setupSheets_`
   - Click "Run" 
   - This creates/updates the database structure with admin support (adds `MuteUntil` and `Banned` columns)

4. **Set Script Properties** (File → Project Properties → Script Properties):
   - Click "+ Add property"
   - Add TWO properties (use values from setup script):
   ```
   Key: ADMIN_USERNAME
   Value: [your username from setup script]

   Key: ADMIN_PASSWORD_HASH
   Value: [your hash from setup script]
   ```

5. **Deploy** your web app:
   - Click **Deploy → New Deployment** (or update existing)
   - Click **Deploy**

✅ **Setup Complete!** All admin endpoints are now active.

## How to Use

### Accessing the Console

1. **Open your Sudoku Labs website** in a browser
2. **Open Developer Console**:
   - Windows/Linux: `F12` or `Ctrl+Shift+J`
   - Mac: `Cmd+Option+J`
3. **Type**: `sudokuAdmin.help()`

### Login

```javascript
sudokuAdmin.login()
```

You'll be prompted for:
- Username (the one you configured)
- Password (the one you configured)

Session lasts **30 minutes** then auto-expires.

### Open Console

```javascript
sudokuAdmin.open()
```

A full-screen admin panel will appear with tabs for all features!

### Check Status

```javascript
sudokuAdmin.status()
```

Shows if you're logged in and session time remaining.

### Logout

```javascript
sudokuAdmin.logout()
```

Always logout when done!

## Console Features

### 📊 Overview Tab
- System statistics dashboard
- Total users, games, chat messages
- Active users (24h)
- Quick action buttons

### 💬 Chat Management
- View all chat history
- Filter by username/message
- Select and delete messages
- Ban users from chat view

### 👥 User Management
- List all users with stats
- Ban/unban users
- Mute users (1 hour default)
- Edit stats button

### 📈 Stats Editor
- Select any user
- Modify all statistics
- Games, wins, perfect wins, fast wins
- Save changes

### 🎨 Theme Manager
- View all themes
- See unlock conditions
- Asset management info

### ⚙️ System Tools
- Clear all chat (with confirmation)
- Refresh data
- Session information

## Common Tasks

### Ban a Spammer

**From Chat Tab:**
1. Find their messages
2. Click "Ban User" button

**From Users Tab:**
1. Search for username
2. Click "Ban" button

### Mute Someone Temporarily

**From Users Tab:**
1. Find user
2. Click "Mute 1h" button

### Fix User Stats

**Method 1 - From Users Tab:**
1. Find user
2. Click "Edit Stats" button
3. Console switches to Stats tab with data pre-filled

**Method 2 - From Stats Tab:**
1. Enter username
2. Modify values
3. Click "Update Stats"

### Delete Inappropriate Messages

**From Chat Tab:**
1. Use filter to find messages
2. Check boxes next to messages
3. Click "Delete Selected"
4. Confirm

### Clear All Chat (Nuclear Option)

**From System Tab:**
1. Click "Clear All Chat"
2. Confirm warning
3. All messages deleted

## Security Best Practices

### ✅ DO:
- Use a strong password (12+ characters)
- Logout when done: `sudokuAdmin.logout()`
- Keep `admin.local.js` secret
- Regularly review user list
- Test on local/dev before production

### ❌ DON'T:
- Share credentials with anyone
- Commit `admin.local.js` to git (already gitignored)
- Leave console open unattended
- Use simple/common passwords
- Share session tokens

## Troubleshooting

### "Invalid credentials"
- **Fix**: Verify username/hash match in both frontend and backend
- Re-run `setup-admin.sh` if needed
- Check Script Properties in GAS

### "Unauthorized" errors
- **Fix**: Session expired. Run `sudokuAdmin.login()` again

### Console won't open
- **Fix**: Check browser console for errors
- Verify `admin.local.js` exists
- Ensure GAS backend is deployed with admin endpoints

### Changes not showing
- **Fix**: Click "Refresh" button in console
- Or close and reopen console

### "Admin credentials not configured in Script Properties"
- **Fix**: Add ADMIN_USERNAME and ADMIN_PASSWORD_HASH to GAS Script Properties
- Follow Step 2 in setup guide

## Advanced

### Manual Configuration (Without Script)

If you can't run the bash script:

1. **Create** `config/admin.local.js`:
```javascript
window.ADMIN_CONFIG = {
  ADMIN_USERNAME: 'your_username',
  ADMIN_PASSWORD_HASH: 'your_sha256_hash',
  SESSION_TIMEOUT: 30 * 60 * 1000
};
```

2. **Generate hash** at: https://emn178.github.io/online-tools/sha256.html

3. Follow remaining setup steps

### Changing Password

1. Run `setup-admin.sh` again (overwrites config)
2. Update Script Properties in GAS
3. Redeploy GAS (not always required but recommended)
4. Old sessions will be invalid

### Multiple Admins

Currently supports one admin account. To add multiple:
1. Modify backend to use array of users
2. Store multiple username/hash pairs
3. Check against all in `adminLogin()`

(Not implemented by default for security simplicity)

## Need Help?

- 📚 **Full Documentation**: `docs/ADMIN_CONSOLE.md`
- 🐛 **Issues**: Check browser console for errors
- 💬 **Questions**: Refer to main project README

---

**Remember**: With great power comes great responsibility! 🕷️
