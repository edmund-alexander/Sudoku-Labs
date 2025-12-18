#!/bin/bash
# Admin Console Setup Helper
# This script helps configure the admin console for Sudoku Labs

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║         Sudoku Labs - Admin Console Setup Helper            ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Check if admin.local.js already exists
if [ -f "config/admin.local.js" ]; then
    echo "⚠️  config/admin.local.js already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Setup cancelled. Existing file preserved."
        exit 0
    fi
fi

echo "This script will help you create the admin configuration file."
echo "Your credentials will be stored locally and are gitignored."
echo ""

# Get admin username
read -p "Enter admin username: " admin_username
if [ -z "$admin_username" ]; then
    echo "❌ Username cannot be empty"
    exit 1
fi

# Get admin password
echo ""
echo "Enter admin password (min 8 characters recommended):"
read -s admin_password
echo ""

if [ -z "$admin_password" ]; then
    echo "❌ Password cannot be empty"
    exit 1
fi

# Confirm password
echo "Confirm admin password:"
read -s admin_password_confirm
echo ""

if [ "$admin_password" != "$admin_password_confirm" ]; then
    echo "❌ Passwords do not match"
    exit 1
fi

# Generate SHA-256 hash
echo ""
echo "🔐 Generating password hash..."
password_hash=$(echo -n "$admin_password" | shasum -a 256 | awk '{print $1}')

# Create admin.local.js
cat > config/admin.local.js << EOF
/**
 * Admin Configuration (Local)
 * 
 * ⚠️  NEVER commit this file to version control!
 * 
 * Generated: $(date)
 */

window.ADMIN_CONFIG = {
  // Admin username
  ADMIN_USERNAME: '$admin_username',
  
  // Admin password hash (SHA-256)
  ADMIN_PASSWORD_HASH: '$password_hash',
  
  // Session timeout in milliseconds (default 30 minutes)
  SESSION_TIMEOUT: 30 * 60 * 1000
};
EOF

echo ""
echo "✅ Admin configuration file created successfully!"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Configure Google Apps Script backend:"
echo "   - Open your GAS project"
echo "   - Go to: File → Project Properties → Script Properties"
echo "   - Add two properties:"
echo ""
echo "   Key: ADMIN_USERNAME"
echo "   Value: $admin_username"
echo ""
echo "   Key: ADMIN_PASSWORD_HASH"
echo "   Value: $password_hash"
echo ""
echo "2. Copy the admin endpoints from backend/gas/AdminEndpoints.gs"
echo "   to your Code.gs file"
echo ""
echo "3. Add the admin routes to your doGet() function"
echo "   (See AdminEndpoints.gs header for route list)"
echo ""
echo "4. Redeploy your GAS web app"
echo ""
echo "5. Test the admin console:"
echo "   - Open your Sudoku Labs site"
echo "   - Open browser console (F12)"
echo "   - Type: sudokuAdmin.login()"
echo "   - Enter your credentials when prompted"
echo "   - Type: sudokuAdmin.open()"
echo ""
echo "📚 For detailed instructions, see: docs/ADMIN_CONSOLE.md"
echo ""
echo "🔒 Security reminder:"
echo "   - config/admin.local.js is gitignored"
echo "   - Never share your credentials"
echo "   - Always logout when done: sudokuAdmin.logout()"
echo ""
