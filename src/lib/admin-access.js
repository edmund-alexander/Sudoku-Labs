import React from "react";
import ReactDOM from "react-dom/client";
import { AdminConsole } from "../components/admin/AdminConsole.jsx";

/**
 * Sudoku Logic Lab - Admin Console Access
 *
 * This file provides browser console access to the admin panel.
 * Must be loaded after admin.jsx and React
 *
 * Usage: sudokuAdmin.login()
 */

// Admin Console Manager
const AdminManager = {
  sessionToken: null,
  sessionExpiry: null,
  consoleInstance: null,

  // Helper to render the "GUI" header
  renderHeader() {
    // console.clear(); // Don't clear console to preserve history/errors
    console.log(
      "%c🔐 Sudoku Labs Admin System",
      "font-size: 24px; font-weight: bold; color: #4f46e5; padding: 10px; border-bottom: 2px solid #4f46e5;"
    );
    console.log("");
  },

  // Helper to render status messages
  renderStatus(message, type = "info") {
    const styles = {
      info: "color: #3b82f6; font-weight: bold;",
      success: "color: #10b981; font-weight: bold; font-size: 14px;",
      error: "color: #ef4444; font-weight: bold;",
      warning: "color: #f59e0b; font-weight: bold;",
    };
    console.log(`%c${message}`, styles[type] || styles.info);
  },

  async login() {
    this.renderHeader();
    this.renderStatus("Initializing secure connection...", "info");

    // Check if already logged in
    if (this.sessionToken && Date.now() < this.sessionExpiry) {
      const remaining = Math.floor((this.sessionExpiry - Date.now()) / 60000);
      this.renderStatus(
        `✓ Already authenticated. Session active for ${remaining}m`,
        "success"
      );
      console.log("");
      console.log(
        "%c>> Run sudokuAdmin.open() to launch interface <<",
        "background: #4f46e5; color: white; padding: 5px 10px; border-radius: 4px; font-weight: bold;"
      );
      return;
    }

    // Prompt for credentials (using email for Firebase Auth)
    const email = prompt("Admin Email:");
    if (!email) {
      this.renderStatus("❌ Login cancelled", "error");
      return;
    }

    const password = prompt("Admin Password:");
    if (!password) {
      this.renderStatus("❌ Login cancelled", "error");
      return;
    }

    this.renderStatus("🔒 Authenticating with Firebase...", "info");

    const apiUrl = window.CONFIG?.API_URL;
    if (!apiUrl) {
      this.renderStatus("❌ Configuration Error: API_URL is missing.", "error");
      console.log("Check public/config/config.local.js");
      return;
    }

    this.renderStatus("📡 Connecting to secure backend...", "info");

    // Request session token from backend using email/password
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "adminLogin",
          email: email,
          password: password,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        this.renderStatus(
          "❌ Protocol Error: Invalid response from server",
          "error"
        );
        console.log("Raw response:", text.substring(0, 100));
        return;
      }

      if (data.success && data.token) {
        this.sessionToken = data.token;
        this.sessionExpiry =
          Date.now() + (window.ADMIN_CONFIG?.SESSION_TIMEOUT || 30 * 60 * 1000);

        console.log("");
        this.renderStatus("✓ ACCESS GRANTED", "success");
        console.log("----------------------------------------");
        console.log("");
        console.log(
          `%cSession Token: ${this.sessionToken.substring(0, 12)}...`,
          "color: #6b7280; font-family: monospace;"
        );
        console.log(
          `%cExpires: ${new Date(this.sessionExpiry).toLocaleTimeString()}`,
          "color: #6b7280;"
        );
        console.log("");
        console.log(
          "%c>> Run sudokuAdmin.open() to launch interface <<",
          "background: #4f46e5; color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold; font-size: 14px; display: block; margin-top: 10px;"
        );

        // Auto-open prompt
        console.log("");
        console.log(
          "%c(Or type sudokuAdmin.logout() to exit)",
          "color: #9ca3af; font-size: 11px;"
        );
      } else {
        this.renderStatus(
          `❌ Access Denied: ${data.error || "Invalid credentials"}`,
          "error"
        );
      }
    } catch (err) {
      this.renderStatus(`❌ Connection Failed: ${err.message}`, "error");
      console.log("Verify backend deployment and network connection.");
    }
  },

  open() {
    if (!this.sessionToken || Date.now() >= this.sessionExpiry) {
      console.error("❌ Not authenticated. Run sudokuAdmin.login() first.");
      return;
    }

    if (this.consoleInstance) {
      console.log("⚠️ Console already open");
      return;
    }

    // Check if React and AdminConsole are available
    if (!React || !AdminConsole) {
      console.error(
        "❌ Admin Console component not loaded. Ensure admin.jsx is included."
      );
      return;
    }

    // Create container
    const container = document.createElement("div");
    container.id = "admin-console-root";
    document.body.appendChild(container);

    // Render admin console
    const root = ReactDOM.createRoot(container);
    root.render(
      React.createElement(AdminConsole, {
        sessionToken: this.sessionToken,
        onClose: () => {
          root.unmount();
          container.remove();
          this.consoleInstance = null;
          console.log("✓ Admin console closed");
        },
      })
    );

    this.consoleInstance = root;
    console.log("✓ Admin console opened");
  },

  logout() {
    this.sessionToken = null;
    this.sessionExpiry = null;

    if (this.consoleInstance) {
      // Close console if open
      const container = document.getElementById("admin-console-root");
      if (container) {
        const root = ReactDOM.createRoot(container);
        root.unmount();
        container.remove();
      }
      this.consoleInstance = null;
    }

    console.log("✓ Logged out successfully");
  },

  status() {
    if (!this.sessionToken || Date.now() >= this.sessionExpiry) {
      console.log("Status: Not authenticated");
      console.log("Run sudokuAdmin.login() to authenticate");
      return;
    }

    const remaining = Math.floor((this.sessionExpiry - Date.now()) / 60000);
    console.log("Status: Authenticated ✓");
    console.log(`Session expires in: ${remaining} minutes`);
    console.log("Commands:");
    console.log("  sudokuAdmin.open()   - Open admin console");
    console.log("  sudokuAdmin.logout() - End session");
  },

  help() {
    console.log(
      "%c📖 Sudoku Labs Admin Console - Help",
      "font-size: 16px; font-weight: bold;"
    );
    console.log("");
    console.log("%cAvailable Commands:", "font-weight: bold;");
    console.log("  sudokuAdmin.login()  - Authenticate with admin credentials");
    console.log("  sudokuAdmin.open()   - Open the admin console interface");
    console.log("  sudokuAdmin.logout() - End your session");
    console.log("  sudokuAdmin.status() - Check authentication status");
    console.log("  sudokuAdmin.help()   - Show this help message");
    console.log("");
    console.log("%cAuthentication:", "font-weight: bold;");
    console.log("  Admins are authenticated using Firebase Auth.");
    console.log("  You need an admin email/password to log in.");
    console.log("  Admin status is stored in Firestore under 'admins' collection.");
    console.log("");
    console.log("%cSecurity Notes:", "font-weight: bold; color: #ff6600;");
    console.log("  • Sessions expire after 30 minutes");
    console.log("  • Authentication uses Firebase ID tokens");
    console.log("  • Admin status is verified server-side");
    console.log("  • Always logout when done");
  },
};

// Expose to window
window.sudokuAdmin = AdminManager;

// Show welcome message on load
console.log("%c🎮 Sudoku Labs", "font-size: 16px; font-weight: bold;");
console.log(
  "%cAdmin console available. Type sudokuAdmin.help() for commands.",
  "color: #666;"
);
