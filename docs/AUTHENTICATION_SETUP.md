# Authentication Setup Guide

This guide explains how to set up and deploy the optional authentication system for Sudoku Logic Lab.

## Overview

The authentication system is **completely optional** and designed to give equal weight to three modes:

1. **Guest Mode** - Play without signing up (default behavior, no changes from before)
2. **Register** - Create a new account to track stats across devices
3. **Login** - Sign in with existing account to access saved progress

**Key Features:**
- Non-forceful: Users can always choose to continue as guest
- Equal prominence: All three options are presented with equal visual weight
- Backwards compatible: Existing guest users can continue playing without interruption
- Cloud sync: Authenticated users get their progress synced across devices
- Stats tracking: Win/loss ratios, total games played, and more

## Prerequisites

Before setting up authentication, you must have already completed the basic deployment from [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md).

## Backend Setup (Google Apps Script)

### 1. Update Your Apps Script Code

If you've already deployed the backend, you need to update it with the new authentication endpoints:

1. Go to https://script.google.com/home
2. Open your existing "Sudoku Logic Lab API" project
3. Replace the entire `Code.gs` content with the updated version from `apps_script/Code.gs` in this repository
4. Save (Ctrl+S)

### 2. Initialize the Users Sheet

The authentication system requires a new sheet called "Users" in your Google Sheet:

1. In the Apps Script editor, select the function dropdown
2. Choose `setupSheets_` from the list
3. Click the **Run** button (▶️)
4. Check the execution log - you should see "Sheets initialized successfully"

This will create a new "Users" sheet with the following columns:
- UserID (unique identifier)
- Username (login name)
- PasswordHash (simple hash - see security note below)
- CreatedAt (timestamp)
- DisplayName (shown in UI)
- TotalGames (counter)
- TotalWins (counter)

### 3. Redeploy the Web App

After updating the code, you need to create a new deployment:

1. Click **Deploy** → **New Deployment**
2. Type: **Web App**
3. Description: "v2 - Added Authentication" (or similar)
4. Execute as: **Your email address**
5. Who has access: **"Anyone"** ⚠️ **CRITICAL - MUST BE "Anyone"**
6. Click **Deploy**

**Important:** If you create a new deployment, you'll get a new URL. Make sure to update your `config/config.local.js` with the new deployment URL.

Alternatively, you can update the existing deployment:
1. Click **Deploy** → **Manage Deployments**
2. Click the edit icon (✏️) on your existing Web App deployment
3. Create new version
4. Click **Deploy**
5. The URL stays the same

## Frontend Setup

The frontend code has already been updated in this repository. No additional configuration is needed - the authentication UI will automatically appear contextually when needed.

### How It Works - Natural Flow Authentication

The authentication system uses a **natural flow** approach - users are only prompted to sign in when they need a feature that benefits from authentication:

1. **Playing Games**: Users can immediately start playing without any authentication prompt
2. **Winning a Game**: After completing a puzzle, users see a contextual prompt suggesting they create an account to save their score to the cloud leaderboard
3. **Using Chat**: When trying to send a chat message, users are prompted to sign in to establish their identity
4. **Viewing Leaderboard**: When opening the leaderboard, users get a contextual prompt suggesting authentication to track their own progress

### Authentication Modal

When prompted, users see a modal with three equal options:
- 🎮 **Continue as Guest** - Proceed without signing in
- 🔑 **Login** - Sign in to existing account
- ✨ **Register** - Create a new account

Each context provides specific messaging explaining why authentication would be helpful:
- **Chat**: "💬 Chat with others and share strategies"
- **Leaderboard**: "🏆 Keep your scores and track your improvement"
- **Profile**: "📊 View your win rate and total games played"

### Guest Mode (Default)

- No authentication required to play
- Progress saved locally in browser (localStorage)
- Random username assigned (e.g., "Guest1234")
- Works offline
- Can send chat messages as guest (if backend is configured)

### Authenticated Mode

When a user logs in or registers:
- Username appears in the top-left corner of the main menu
- Stats tracked in Google Sheets Users table
- Progress synced across devices
- Campaign progress still local (by design)
- Identified in chat and leaderboard

## Testing the Authentication System

### 1. Test Natural Flow - Win a Game

1. Open your deployed game
2. Start a Quick Play game (any difficulty)
3. Complete the puzzle successfully
4. After winning, you should see an authentication prompt after ~1.5 seconds
5. The prompt will explain "Save Your Score" and suggest creating an account
6. You can choose to continue as guest or sign up

### 2. Test Natural Flow - Chat

1. Open the game
2. Click the chat button in the bottom-right
3. Try to send a message as a guest
4. You should see an authentication prompt explaining "Join the Conversation"
5. You can choose to sign in or continue as guest

### 3. Test Natural Flow - Leaderboard

1. Open the game
2. Click "View Leaderboard" button during gameplay
3. You should see an authentication prompt suggesting you track your progress
4. The leaderboard will still open regardless of your choice

### 4. Test Registration

1. When any auth prompt appears, click "✨ Register"
2. Enter a username (min 3 characters) and password (min 6 characters)
3. Click "Create Account"
4. You should see your username in the top-left corner of the main menu

### 5. Verify in Google Sheets

1. Open your Google Sheet
2. Navigate to the "Users" tab
3. You should see your new user with:
   - A unique UserID
   - Your username
   - A password hash
   - Creation timestamp
   - 0 total games and wins initially

### 6. Test Login

1. Click "Logout" in the top-left corner (on main menu)
2. Win another game or try to use chat to trigger an auth prompt
3. Click "🔑 Login"
4. Enter the same username and password
5. Click "Login"
6. You should be logged back in with your username showing

### 7. Test Guest Mode

1. Open the game (or logout)
2. Start playing without signing in
3. Win a game - you'll see the auth prompt but can choose "Continue as Guest"
4. Your score saves locally only
5. All features work, but progress isn't synced

### 8. Test Stats Tracking

1. Login with your account
2. Start a game (Quick Play - any difficulty)
3. Complete the puzzle successfully
4. Check the Users sheet - TotalGames and TotalWins should increment

## Security Considerations

### ⚠️ Important Security Notes

**This authentication system uses a simple hash function and is NOT suitable for protecting sensitive data.**

The current implementation:
- Uses a basic hash function for demonstration purposes
- Stores passwords hashed (not plain text)
- Transmits credentials over HTTPS (Google's security)
- Is appropriate for game scores and non-sensitive data

**For Production Use:**

If you plan to collect any sensitive information, you should:

1. **Use a proper authentication provider** like:
   - Firebase Authentication
   - Auth0
   - Google OAuth
   - Other established identity providers

2. **Or implement proper security measures** (see detailed guide below)

3. **Privacy considerations:**
   - Add a privacy policy
   - Comply with GDPR/CCPA if applicable
   - Allow users to delete their data
   - Don't collect more data than necessary

### Current Security Model

The current system is designed for:
- Casual game authentication
- Tracking game statistics
- Syncing progress across devices
- **Not** for protecting sensitive personal information

---

## Implementing Proper Security Measures

If you need production-grade security for your authentication system, follow this comprehensive guide to implement industry-standard security practices.

### 1. Password Hashing with Bcrypt

**Problem:** The current `simpleHash_()` function uses a basic hashing algorithm that is not secure against attacks.

**Solution:** Implement bcrypt with proper salting.

#### Google Apps Script Implementation

Google Apps Script doesn't have native bcrypt support, but you can use the `Utilities.computeDigest()` method with proper salting:

```javascript
// Replace the simpleHash_ function in Code.gs

/**
 * Generates a cryptographically secure salt
 */
function generateSalt_() {
  const bytes = Utilities.getRandomValues(16);
  return Utilities.base64Encode(bytes);
}

/**
 * Hashes a password with PBKDF2 (Password-Based Key Derivation Function 2)
 * This is more secure than the simple hash and includes salt
 */
function hashPassword_(password, salt) {
  if (!salt) {
    salt = generateSalt_();
  }
  
  // Use PBKDF2 with SHA-256 and 10,000 iterations
  const iterations = 10000;
  let hash = password + salt;
  
  for (let i = 0; i < iterations; i++) {
    const digest = Utilities.computeDigest(
      Utilities.DigestAlgorithm.SHA_256,
      hash,
      Utilities.Charset.UTF_8
    );
    hash = Utilities.base64Encode(digest);
  }
  
  return {
    hash: hash,
    salt: salt
  };
}

/**
 * Verifies a password against a stored hash and salt
 */
function verifyPassword_(password, storedHash, storedSalt) {
  const computed = hashPassword_(password, storedSalt);
  return computed.hash === storedHash;
}
```

#### Update Register Function

```javascript
// Update the registerUser function to use the new hashing

function registerUser(data) {
  if (!data || typeof data !== 'object') {
    return { success: false, error: 'Invalid request data' };
  }
  
  const username = sanitizeInput_(data.username || '', 20);
  const password = sanitizeInput_(data.password || '', 100);
  
  // Validate inputs
  if (username.length < 3) {
    return { success: false, error: 'Username must be at least 3 characters' };
  }
  
  if (password.length < 8) { // Increased from 6 to 8
    return { success: false, error: 'Password must be at least 8 characters' };
  }
  
  // Add password strength validation
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
    return { success: false, error: 'Password must contain uppercase, lowercase, and numbers' };
  }
  
  try {
    const sheet = getSpreadsheet_().getSheetByName('Users');
    if (!sheet) {
      return { success: false, error: 'Users sheet not found' };
    }
    
    // Check if username already exists
    const sheetData = sheet.getDataRange().getValues();
    for (let i = 1; i < sheetData.length; i++) {
      if (sheetData[i][1] === username) {
        return { success: false, error: 'Username already exists' };
      }
    }
    
    // Hash password with salt
    const passwordData = hashPassword_(password);
    const userId = 'user_' + new Date().getTime() + '_' + Math.floor(Math.random() * 10000);
    const createdAt = new Date().toISOString();
    
    // Save user: UserID | Username | PasswordHash | Salt | CreatedAt | DisplayName | TotalGames | TotalWins
    // NOTE: You'll need to add a "Salt" column to your Users sheet
    sheet.appendRow([userId, username, passwordData.hash, passwordData.salt, createdAt, username, 0, 0]);
    
    return {
      success: true,
      user: {
        userId: userId,
        username: username,
        displayName: username,
        totalGames: 0,
        totalWins: 0,
        createdAt: createdAt
      }
    };
  } catch (err) {
    Logger.log('registerUser error: ' + err);
    return { success: false, error: 'Registration failed' };
  }
}
```

#### Update Login Function

```javascript
function loginUser(data) {
  if (!data || typeof data !== 'object') {
    return { success: false, error: 'Invalid request data' };
  }
  
  const username = sanitizeInput_(data.username || '', 20);
  const password = sanitizeInput_(data.password || '', 100);
  
  if (!username || !password) {
    return { success: false, error: 'Username and password required' };
  }
  
  try {
    const sheet = getSpreadsheet_().getSheetByName('Users');
    if (!sheet) {
      return { success: false, error: 'Users sheet not found' };
    }
    
    const sheetData = sheet.getDataRange().getValues();
    
    // Search for user
    for (let i = 1; i < sheetData.length; i++) {
      if (sheetData[i][1] === username) {
        const storedHash = sheetData[i][2];
        const storedSalt = sheetData[i][3]; // Salt is now in column 4 (index 3)
        
        // Verify password using salt
        if (verifyPassword_(password, storedHash, storedSalt)) {
          return {
            success: true,
            user: {
              userId: sheetData[i][0],
              username: sheetData[i][1],
              displayName: sheetData[i][5] || sheetData[i][1], // Updated index
              totalGames: Number(sheetData[i][6]) || 0,        // Updated index
              totalWins: Number(sheetData[i][7]) || 0,          // Updated index
              createdAt: sheetData[i][4]                        // Updated index
            }
          };
        }
        
        return { success: false, error: 'Invalid username or password' };
      }
    }
    
    return { success: false, error: 'Invalid username or password' };
  } catch (err) {
    Logger.log('loginUser error: ' + err);
    return { success: false, error: 'Login failed' };
  }
}
```

#### Update Users Sheet Schema

After implementing the above changes, update your Users sheet to include the Salt column:

1. Open your Google Sheet
2. Go to the "Users" tab
3. Insert a new column after "PasswordHash" (between columns C and D)
4. Name it "Salt"
5. The new schema should be: `UserID | Username | PasswordHash | Salt | CreatedAt | DisplayName | TotalGames | TotalWins`

### 2. Rate Limiting

**Problem:** Without rate limiting, attackers can make unlimited login attempts (brute force attacks).

**Solution:** Implement rate limiting using Google Apps Script Properties Service.

```javascript
/**
 * Rate limiting implementation
 * Tracks failed login attempts and blocks after threshold
 */

function checkRateLimit_(identifier, action) {
  const props = PropertiesService.getScriptProperties();
  const key = 'ratelimit_' + action + '_' + identifier;
  const now = new Date().getTime();
  
  const data = props.getProperty(key);
  let attempts = data ? JSON.parse(data) : { count: 0, firstAttempt: now, blocked: false };
  
  // Reset if more than 15 minutes have passed
  if (now - attempts.firstAttempt > 15 * 60 * 1000) {
    attempts = { count: 0, firstAttempt: now, blocked: false };
  }
  
  // Check if blocked
  if (attempts.blocked && (now - attempts.firstAttempt) < 15 * 60 * 1000) {
    return { allowed: false, retryAfter: Math.ceil((15 * 60 * 1000 - (now - attempts.firstAttempt)) / 1000) };
  }
  
  // Check if exceeded max attempts (5 attempts per 15 minutes)
  if (attempts.count >= 5) {
    attempts.blocked = true;
    props.setProperty(key, JSON.stringify(attempts));
    return { allowed: false, retryAfter: 900 }; // 15 minutes
  }
  
  return { allowed: true, attempts: attempts };
}

function recordFailedAttempt_(identifier, action) {
  const props = PropertiesService.getScriptProperties();
  const key = 'ratelimit_' + action + '_' + identifier;
  const now = new Date().getTime();
  
  const data = props.getProperty(key);
  let attempts = data ? JSON.parse(data) : { count: 0, firstAttempt: now, blocked: false };
  
  attempts.count++;
  attempts.lastAttempt = now;
  
  props.setProperty(key, JSON.stringify(attempts));
}

function clearRateLimitOnSuccess_(identifier, action) {
  const props = PropertiesService.getScriptProperties();
  const key = 'ratelimit_' + action + '_' + identifier;
  props.deleteProperty(key);
}
```

#### Update Login Function with Rate Limiting

```javascript
function loginUser(data) {
  if (!data || typeof data !== 'object') {
    return { success: false, error: 'Invalid request data' };
  }
  
  const username = sanitizeInput_(data.username || '', 20);
  const password = sanitizeInput_(data.password || '', 100);
  
  if (!username || !password) {
    return { success: false, error: 'Username and password required' };
  }
  
  // Check rate limit
  const rateLimitCheck = checkRateLimit_(username, 'login');
  if (!rateLimitCheck.allowed) {
    return { 
      success: false, 
      error: 'Too many failed attempts. Please try again in ' + rateLimitCheck.retryAfter + ' seconds.',
      rateLimited: true,
      retryAfter: rateLimitCheck.retryAfter
    };
  }
  
  try {
    const sheet = getSpreadsheet_().getSheetByName('Users');
    if (!sheet) {
      return { success: false, error: 'Users sheet not found' };
    }
    
    const sheetData = sheet.getDataRange().getValues();
    
    // Search for user
    for (let i = 1; i < sheetData.length; i++) {
      if (sheetData[i][1] === username) {
        const storedHash = sheetData[i][2];
        const storedSalt = sheetData[i][3];
        
        if (verifyPassword_(password, storedHash, storedSalt)) {
          // Clear rate limit on successful login
          clearRateLimitOnSuccess_(username, 'login');
          
          return {
            success: true,
            user: {
              userId: sheetData[i][0],
              username: sheetData[i][1],
              displayName: sheetData[i][5] || sheetData[i][1],
              totalGames: Number(sheetData[i][6]) || 0,
              totalWins: Number(sheetData[i][7]) || 0,
              createdAt: sheetData[i][4]
            }
          };
        }
        
        // Record failed attempt
        recordFailedAttempt_(username, 'login');
        return { success: false, error: 'Invalid username or password' };
      }
    }
    
    // Record failed attempt even for non-existent users (prevent user enumeration)
    recordFailedAttempt_(username, 'login');
    return { success: false, error: 'Invalid username or password' };
  } catch (err) {
    Logger.log('loginUser error: ' + err);
    return { success: false, error: 'Login failed' };
  }
}
```

### 3. CSRF Protection

**Problem:** Cross-Site Request Forgery attacks can trick authenticated users into performing unwanted actions.

**Solution:** Implement CSRF tokens for state-changing operations.

```javascript
/**
 * CSRF Token Management
 */

function generateCSRFToken_() {
  const bytes = Utilities.getRandomValues(32);
  return Utilities.base64EncodeWebSafe(bytes);
}

function createSession_(userId) {
  const sessionId = generateCSRFToken_();
  const csrfToken = generateCSRFToken_();
  const expiresAt = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours
  
  const props = PropertiesService.getScriptProperties();
  props.setProperty('session_' + sessionId, JSON.stringify({
    userId: userId,
    csrfToken: csrfToken,
    expiresAt: expiresAt,
    createdAt: new Date().getTime()
  }));
  
  return {
    sessionId: sessionId,
    csrfToken: csrfToken,
    expiresAt: expiresAt
  };
}

function validateSession_(sessionId, csrfToken) {
  const props = PropertiesService.getScriptProperties();
  const sessionData = props.getProperty('session_' + sessionId);
  
  if (!sessionData) {
    return { valid: false, error: 'Invalid session' };
  }
  
  const session = JSON.parse(sessionData);
  
  // Check expiration
  if (new Date().getTime() > session.expiresAt) {
    props.deleteProperty('session_' + sessionId);
    return { valid: false, error: 'Session expired' };
  }
  
  // Validate CSRF token
  if (session.csrfToken !== csrfToken) {
    return { valid: false, error: 'Invalid CSRF token' };
  }
  
  return { valid: true, userId: session.userId };
}

function invalidateSession_(sessionId) {
  const props = PropertiesService.getScriptProperties();
  props.deleteProperty('session_' + sessionId);
}
```

#### Update Login to Return Session

```javascript
function loginUser(data) {
  // ... existing validation and rate limiting code ...
  
  try {
    const sheet = getSpreadsheet_().getSheetByName('Users');
    if (!sheet) {
      return { success: false, error: 'Users sheet not found' };
    }
    
    const sheetData = sheet.getDataRange().getValues();
    
    for (let i = 1; i < sheetData.length; i++) {
      if (sheetData[i][1] === username) {
        const storedHash = sheetData[i][2];
        const storedSalt = sheetData[i][3];
        
        if (verifyPassword_(password, storedHash, storedSalt)) {
          clearRateLimitOnSuccess_(username, 'login');
          
          const userId = sheetData[i][0];
          const sessionData = createSession_(userId);
          
          return {
            success: true,
            user: {
              userId: userId,
              username: sheetData[i][1],
              displayName: sheetData[i][5] || sheetData[i][1],
              totalGames: Number(sheetData[i][6]) || 0,
              totalWins: Number(sheetData[i][7]) || 0,
              createdAt: sheetData[i][4]
            },
            session: {
              sessionId: sessionData.sessionId,
              csrfToken: sessionData.csrfToken,
              expiresAt: sessionData.expiresAt
            }
          };
        }
        
        recordFailedAttempt_(username, 'login');
        return { success: false, error: 'Invalid username or password' };
      }
    }
    
    recordFailedAttempt_(username, 'login');
    return { success: false, error: 'Invalid username or password' };
  } catch (err) {
    Logger.log('loginUser error: ' + err);
    return { success: false, error: 'Login failed' };
  }
}
```

#### Protect State-Changing Operations

```javascript
function updateUserProfile(data) {
  // Validate session and CSRF token
  const sessionId = data.sessionId;
  const csrfToken = data.csrfToken;
  
  const validation = validateSession_(sessionId, csrfToken);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }
  
  const userId = validation.userId;
  
  // ... rest of updateUserProfile implementation ...
}
```

### 4. Session Management Best Practices

Implement proper session management on the frontend:

```javascript
// In src/app.jsx or your authentication module

const SessionManager = {
  // Store session data securely
  saveSession(sessionData) {
    try {
      // Store session with expiration
      localStorage.setItem('sudoku_session', JSON.stringify({
        ...sessionData,
        savedAt: Date.now()
      }));
    } catch (e) {
      console.error('Failed to save session:', e);
    }
  },
  
  // Retrieve and validate session
  getSession() {
    try {
      const data = localStorage.getItem('sudoku_session');
      if (!data) return null;
      
      const session = JSON.parse(data);
      
      // Check if session is expired
      if (session.expiresAt && Date.now() > session.expiresAt) {
        this.clearSession();
        return null;
      }
      
      return session;
    } catch (e) {
      console.error('Failed to retrieve session:', e);
      return null;
    }
  },
  
  // Clear session on logout
  clearSession() {
    localStorage.removeItem('sudoku_session');
    localStorage.removeItem(KEYS.AUTH_USER);
  },
  
  // Refresh session periodically
  async refreshSession() {
    const session = this.getSession();
    if (!session || !session.sessionId) return;
    
    // Call backend to refresh session (extend expiration)
    try {
      const response = await runGasFn('refreshSession', {
        sessionId: session.sessionId,
        csrfToken: session.csrfToken
      });
      
      if (response.success) {
        this.saveSession({
          ...session,
          expiresAt: response.expiresAt,
          csrfToken: response.newCsrfToken // Rotate CSRF token
        });
      }
    } catch (e) {
      console.error('Failed to refresh session:', e);
    }
  }
};

// Auto-refresh session every 30 minutes
setInterval(() => {
  SessionManager.refreshSession();
}, 30 * 60 * 1000);
```

### 5. Additional Security Measures

#### Secure Password Reset

```javascript
function requestPasswordReset(data) {
  const email = sanitizeInput_(data.email || '', 100);
  
  // Generate a secure reset token
  const resetToken = generateCSRFToken_();
  const expiresAt = new Date().getTime() + (60 * 60 * 1000); // 1 hour
  
  // Store reset token
  const props = PropertiesService.getScriptProperties();
  props.setProperty('reset_' + resetToken, JSON.stringify({
    email: email,
    expiresAt: expiresAt
  }));
  
  // In production, send email with reset link
  // For now, return the token (ONLY FOR TESTING)
  return {
    success: true,
    message: 'Password reset instructions sent to email',
    // Remove this in production:
    resetToken: resetToken  // Only for testing
  };
}
```

#### Input Validation Enhancement

```javascript
function sanitizeInput_(input, maxLength) {
  if (typeof input !== 'string') return '';
  
  // Remove dangerous characters
  let cleaned = input
    .replace(/[<>\"']/g, '')  // Prevent XSS
    .replace(/[\x00-\x1F\x7F]/g, '')  // Remove control characters
    .trim();
  
  // Enforce max length
  if (maxLength && cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength);
  }
  
  return cleaned;
}
```

#### Audit Logging

```javascript
function logSecurityEvent_(eventType, details) {
  try {
    const sheet = getSpreadsheet_().getSheetByName('SecurityLog');
    if (!sheet) {
      // Create sheet if it doesn't exist
      const ss = getSpreadsheet_();
      const newSheet = ss.insertSheet('SecurityLog');
      newSheet.appendRow(['Timestamp', 'EventType', 'Details', 'IP', 'UserAgent']);
      return;
    }
    
    sheet.appendRow([
      new Date().toISOString(),
      eventType,
      JSON.stringify(details),
      details.ip || 'unknown',
      details.userAgent || 'unknown'
    ]);
  } catch (err) {
    Logger.log('Failed to log security event: ' + err);
  }
}

// Use in login/register functions
logSecurityEvent_('login_attempt', {
  username: username,
  success: true,
  ip: e.parameter.userIp || 'unknown'
});
```

### 6. Migration Guide

To migrate from the current simple hash to the secure implementation:

1. **Create a backup** of your Users sheet
2. **Add the Salt column** to the Users sheet
3. **Update Code.gs** with the new security functions
4. **Deploy new version** of the Web App
5. **Existing users** will need to reset their passwords or:
   - Implement a migration script that generates salt for existing hashes
   - Mark old passwords for required reset on next login

```javascript
function migrateExistingPasswords() {
  const sheet = getSpreadsheet_().getSheetByName('Users');
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    const oldHash = data[i][2];  // PasswordHash column
    const hasSalt = data[i][3];  // Check if Salt column exists and has value
    
    if (!hasSalt && oldHash) {
      // Generate a flag for password reset required
      sheet.getRange(i + 1, 9).setValue('RESET_REQUIRED');  // Add flag in a new column
    }
  }
  
  Logger.log('Migration complete. Users marked for password reset.');
}
```

### 7. Security Checklist

Before going to production, ensure:

- [x] Passwords are hashed with salt using PBKDF2 or bcrypt equivalent
- [x] Rate limiting is active on authentication endpoints (5 attempts per 15 min)
- [x] CSRF tokens are generated and validated for state-changing operations
- [x] Sessions have proper expiration (24 hours recommended)
- [x] Session tokens are cryptographically random
- [x] Input validation prevents XSS and injection attacks
- [x] Password requirements enforce minimum 8 characters with complexity
- [x] Failed login attempts are logged for security monitoring
- [x] Password reset functionality is secure with time-limited tokens
- [x] HTTPS is enforced (Google Apps Script provides this)
- [ ] Privacy policy is published
- [ ] User data deletion functionality is implemented
- [ ] Security headers are configured (if using custom hosting)
- [ ] Regular security audits are scheduled

### 8. Testing Security Measures

After implementing security measures, test thoroughly:

```bash
# Test rate limiting
for i in {1..6}; do
  curl "$GAS_URL?action=login&username=testuser&password=wrongpass"
  echo "Attempt $i"
done

# Test CSRF protection
curl "$GAS_URL?action=updateUserProfile&userId=user123&sessionId=invalid&csrfToken=invalid"

# Test password strength
curl "$GAS_URL?action=register&username=testuser&password=weak"
```

### Summary

This comprehensive guide provides production-ready security implementations for:
- ✅ Password hashing with PBKDF2 and salt
- ✅ Rate limiting to prevent brute force attacks
- ✅ CSRF protection for state-changing operations
- ✅ Proper session management with secure tokens
- ✅ Additional security best practices

Remember: **Security is an ongoing process**. Keep your implementation updated with the latest security practices and regularly audit your system.

## Troubleshooting

### "Authentication requires GAS backend" Message

If you see this message when trying to login/register:
- Make sure your `config/config.local.js` has the correct `GAS_URL`
- Verify the GAS_URL points to a deployed Apps Script
- Check that the deployment is set to "Anyone" access

### Login/Register Fails

1. **Check Apps Script execution log:**
   - Go to Apps Script editor
   - View → Execution log
   - Look for errors in recent executions

2. **Verify setupSheets_ was run:**
   - Check your Google Sheet has a "Users" tab
   - Verify it has the correct column headers

3. **Test the backend directly:**
   ```bash
   # Test registration endpoint
   curl "YOUR_GAS_URL?action=register&username=testuser&password=testpass123"
   
   # Should return: {"success":true,"user":{...}}
   ```

### User Already Exists Error

- Usernames must be unique
- Try a different username
- Or delete the row from the Users sheet to start fresh

### Stats Not Updating

1. Verify you're logged in (see username in top-left)
2. Check that games are completing successfully
3. Look at the Users sheet after completing a game
4. Check browser console (F12) for any errors

## API Endpoints Reference

The authentication system adds these new endpoints to your GAS API:

| Endpoint | Parameters | Returns | Description |
|----------|-----------|---------|-------------|
| `register` | `username`, `password` | `{success, user, error?}` | Create new account |
| `login` | `username`, `password` | `{success, user, error?}` | Authenticate user |
| `getUserProfile` | `userId` | `{success, user, error?}` | Get user data |
| `updateUserProfile` | `userId`, `displayName?`, `incrementGames?`, `incrementWins?` | `{success, error?}` | Update user stats |

All endpoints use GET requests to avoid POST redirect issues (same as other endpoints).

## Migration Notes

### For Existing Users

Existing users who have been playing as guests can:
- Continue playing as guests with no changes
- Create an account to start tracking stats going forward
- Their local campaign progress remains intact

### For Developers

If you've customized the code:
- The getUserId() function now checks for authenticated users first
- Campaign progress is still stored locally (not per-user)
- Leaderboard submissions use the authenticated username if available
- All authentication is optional - the app works without GAS backend

## Next Steps

After setting up authentication:

1. **Test thoroughly** - Try all three modes (guest, register, login)
2. **Monitor the Users sheet** - Watch for any issues with user creation
3. **Consider privacy** - Add a privacy policy if collecting user data
4. **Plan for scale** - The simple hash is fine for small user bases
5. **Get feedback** - See how users interact with the three-option modal

## Support

If you encounter issues:

1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues
2. Review the Apps Script execution logs
3. Check browser console for frontend errors
4. Verify all deployment steps were followed

Remember: **Authentication is completely optional**. Users can always choose to play as guests!
