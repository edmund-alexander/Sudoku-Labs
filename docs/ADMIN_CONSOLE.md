# Admin Console Documentation

## Overview

The Sudoku Labs Admin Console is a secure, browser-based administrative panel for managing users, chat, game statistics, and assets. Access is restricted and requires authentication through the browser console.

## Features

### 1. **System Overview**
- Real-time statistics dashboard
- Total users, games played, chat messages
- Active users in the last 24 hours
- Quick access buttons to all admin functions

### 2. **Chat Management**
- View complete chat history with timestamps
- Filter messages by username or content
- Bulk select and delete messages
- Ban users directly from chat view
- Message moderation tools

### 3. **User Management**
- View all registered users with statistics
- Ban/unban users
- Mute users (temporary chat restriction)
- Quick access to edit user stats
- View win rates and game history

### 4. **Stats Editor**
- Manually modify any user's statistics
- Update:
  - Total games and wins
  - Easy/Medium/Hard wins
  - Perfect wins (no mistakes)
  - Fast wins (under 3 minutes)
- Useful for corrections or special events

### 5. **Theme Manager**
- View all available themes
- Information about unlock conditions
- Asset management (documentation for custom uploads)

### 6. **System Tools**
- Clear all chat messages (with confirmation)
- Refresh all data from server
- Session management information
- Database maintenance tools

## Setup Instructions

### 1. Backend Configuration (Google Apps Script)

1. **Open your Google Apps Script project** containing Code.gs

2. **Set Script Properties** (File → Project Properties → Script Properties):
   ```
   Key: ADMIN_USERNAME
   Value: your_admin_username

   Key: ADMIN_PASSWORD_HASH
   Value: your_sha256_hashed_password
   ```

3. **Generate Password Hash**:
   - Visit: https://emn178.github.io/online-tools/sha256.html
   - Enter your desired password
   - Copy the resulting hash
   - Paste into ADMIN_PASSWORD_HASH property

4. **Add Admin Endpoints**:
   - Copy all code from `backend/gas/AdminEndpoints.gs`
   - Paste into your Code.gs file (or create a new .gs file in the project)

5. **Update doGet() function** to include admin routes:
   ```javascript
   case 'adminLogin':
     return makeJsonResponse(adminLogin(e.parameter));
   case 'getAdminStats':
     return makeJsonResponse(getAdminStats(e.parameter));
   case 'getAdminChatHistory':
     return makeJsonResponse(getAdminChatHistory(e.parameter));
   case 'getAdminUsers':
     return makeJsonResponse(getAdminUsers(e.parameter));
   case 'deleteMessages':
     return makeJsonResponse(deleteMessages(e.parameter));
   case 'banUser':
     return makeJsonResponse(banUser(e.parameter));
   case 'unbanUser':
     return makeJsonResponse(unbanUser(e.parameter));
   case 'muteUser':
     return makeJsonResponse(muteUser(e.parameter));
   case 'updateUserStats':
     return makeJsonResponse(updateUserStats(e.parameter));
   case 'clearAllChat':
     return makeJsonResponse(clearAllChat(e.parameter));
   ```

6. **Deploy** your web app (must redeploy after adding new endpoints)

### 2. Frontend Configuration

1. **Copy the admin config template**:
   ```bash
   cp config/admin.example.js config/admin.local.js
   ```

2. **Edit `config/admin.local.js`**:
   ```javascript
   window.ADMIN_CONFIG = {
     ADMIN_USERNAME: 'your_admin_username',  // Same as backend
     ADMIN_PASSWORD_HASH: 'your_sha256_hash', // Same as backend
     SESSION_TIMEOUT: 30 * 60 * 1000          // 30 minutes
   };
   ```

3. **IMPORTANT**: Never commit `admin.local.js` to version control!
   - It's already in `.gitignore`
   - Contains sensitive credentials

## Usage

### Accessing the Admin Console

1. **Open your Sudoku Labs site** in a web browser

2. **Open Browser Console**:
   - Chrome/Edge: `F12` or `Ctrl+Shift+J` (Windows) / `Cmd+Option+J` (Mac)
   - Firefox: `F12` or `Ctrl+Shift+K` (Windows) / `Cmd+Option+K` (Mac)
   - Safari: Enable Developer menu first, then `Cmd+Option+C`

3. **View available commands**:
   ```javascript
   sudokuAdmin.help()
   ```

4. **Login**:
   ```javascript
   sudokuAdmin.login()
   ```
   - You'll be prompted for username and password
   - Credentials are verified locally and with backend
   - Session token is generated (valid for 30 minutes)

5. **Open Admin Console**:
   ```javascript
   sudokuAdmin.open()
   ```

6. **Check Status**:
   ```javascript
   sudokuAdmin.status()
   ```

7. **Logout**:
   ```javascript
   sudokuAdmin.logout()
   ```

### Admin Console Interface

Once opened, the console provides a full-featured GUI with tabs:

#### Overview Tab
- Dashboard with key metrics
- Quick action buttons

#### Chat Management Tab
- **Filter**: Search messages by username or content
- **Select**: Click checkboxes to select messages
- **Delete**: Remove selected messages
- **Ban**: Ban users directly from their messages
- **Refresh**: Reload chat history

#### User Management Tab
- **Search**: Filter users by username
- **View Stats**: See games, wins, win rates
- **Ban/Unban**: Manage user access
- **Mute**: Temporarily restrict chat (1 hour default)
- **Edit Stats**: Jump to stats editor for selected user
- **Status Indicators**: Visual badges for banned/muted users

#### Stats Editor Tab
- **Select User**: Enter username
- **Edit Values**: Modify any statistic
- **Update**: Save changes to backend
- Auto-populates when "Edit Stats" clicked from user list

#### Theme Manager Tab
- View all available themes
- See unlock conditions
- Documentation for custom assets

#### System Tools Tab
- **Clear All Chat**: Remove all messages (with confirmation)
- **Refresh Data**: Reload all data from server
- **Session Info**: View token and expiry time

## Security Features

### Authentication
- **Username/Password**: Required for access
- **SHA-256 Hashing**: Passwords never sent in plaintext
- **Dual Verification**: Both frontend and backend validate credentials

### Session Management
- **One-Time Tokens**: Unique token per session
- **30-Minute Expiry**: Automatic timeout
- **In-Memory Storage**: Tokens not persisted, expire on server restart

### Access Control
- **Token Verification**: Every admin endpoint checks token validity
- **Automatic Logout**: Sessions expire after timeout
- **Console-Only Access**: No UI elements visible to regular users

### Best Practices
1. **Never share credentials** or session tokens
2. **Always logout** when done administering
3. **Use strong passwords** (min 12 characters recommended)
4. **Regularly rotate** admin password
5. **Monitor admin actions** via logs
6. **Keep admin.local.js** out of version control

## Troubleshooting

### "Admin credentials not configured in Script Properties"
- **Solution**: Add ADMIN_USERNAME and ADMIN_PASSWORD_HASH to Script Properties in GAS

### "Authentication failed" or "Invalid credentials"
- **Solution**: Verify username and password hash match between frontend and backend
- Double-check hash generation (SHA-256)

### "Unauthorized" when accessing admin functions
- **Solution**: Your session may have expired. Run `sudokuAdmin.login()` again

### "Admin Console component not loaded"
- **Solution**: Ensure admin.jsx is loading (check browser console for errors)
- Verify admin.local.js exists and is properly formatted

### Admin console won't open
- **Solution**: Check that React is loaded
- Verify CONFIG.GAS_URL is set
- Open browser console and look for JavaScript errors

### Changes not reflecting
- **Solution**: Click "Refresh" button in admin console
- Or close and reopen the console

## API Reference

### Backend Endpoints

All admin endpoints require `token` parameter:

#### `adminLogin`
- **Params**: `username`, `passwordHash`
- **Returns**: `{ success: boolean, token?: string, error?: string }`

#### `getAdminStats`
- **Params**: `token`
- **Returns**: System statistics object

#### `getAdminChatHistory`
- **Params**: `token`
- **Returns**: Array of all chat messages

#### `getAdminUsers`
- **Params**: `token`
- **Returns**: Array of users with stats, banned list, muted list

#### `deleteMessages`
- **Params**: `token`, `messageIds` (comma-separated)
- **Returns**: Count of deleted messages

#### `banUser` / `unbanUser`
- **Params**: `token`, `username`
- **Returns**: Success status

#### `muteUser`
- **Params**: `token`, `username`, `duration` (ms, default 3600000)
- **Returns**: Mute expiry timestamp

#### `updateUserStats`
- **Params**: `token`, `username`, stat fields (totalGames, totalWins, etc.)
- **Returns**: Success status

#### `clearAllChat`
- **Params**: `token`
- **Returns**: Success status

### Frontend Console API

#### `sudokuAdmin.login()`
Prompts for credentials and authenticates

#### `sudokuAdmin.open()`
Opens the admin console GUI

#### `sudokuAdmin.logout()`
Ends session and closes console

#### `sudokuAdmin.status()`
Shows authentication status and session info

#### `sudokuAdmin.help()`
Displays help information

## Extending the Admin Console

### Adding New Admin Functions

1. **Backend (Code.gs)**:
   ```javascript
   function myNewAdminFunction(params) {
     if (!verifyAdminToken_(params.token)) {
       return { success: false, error: 'Unauthorized' };
     }
     
     // Your admin logic here
     
     return { success: true, data: yourData };
   }
   ```

2. **Add to doGet()**:
   ```javascript
   case 'myNewAction':
     return makeJsonResponse(myNewAdminFunction(e.parameter));
   ```

3. **Frontend (admin.jsx)**: Add UI in appropriate tab or create new tab

4. **Redeploy** GAS web app

### Adding New Tabs

Edit `admin.jsx`, add to tabs array:
```javascript
{ id: 'newtab', label: '🔧 New Feature', icon: '🔧' }
```

Add content rendering:
```javascript
{activeTab === 'newtab' && (
  <div>
    {/* Your admin UI here */}
  </div>
)}
```

## License & Security

This admin console is part of Sudoku Labs and inherits its license. 

**⚠️ CRITICAL SECURITY NOTES**:
- Admin credentials are sensitive - treat like root access
- Regularly audit admin actions if implementing logging
- Consider implementing IP whitelisting for production
- Monitor failed login attempts
- Use HTTPS in production (GitHub Pages provides this)

---

For questions or issues, refer to the main project README or documentation.
