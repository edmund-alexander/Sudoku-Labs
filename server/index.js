const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const admin = require("firebase-admin");
const apiRouter = require("./controllers/api");

// Initialize Firebase Admin
try {
  admin.initializeApp();
  console.log("Firebase Admin initialized with default credentials");
} catch (e) {
  console.error("Failed to initialize Firebase Admin:", e);
}

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", apiRouter);

// Static Files
// Determine the path to the public directory
// We support two structures:
// 1. Running from project root (development or full-repo deploy): Built files are in ./dist/public
// 2. Running from dist folder (production artifact): Built files are in ./public (sibling to server folder)

const rootBuildPath = path.join(__dirname, "../dist/public");
const distBuildPath = path.join(__dirname, "../public");

// Check for the existence of index.html to confirm the valid build directory
// Priority: Check root/dist/public first (standard build output), then fallback to ../public (dist structure)
const PUBLIC_DIR = fs.existsSync(path.join(rootBuildPath, "index.html")) 
  ? rootBuildPath 
  : distBuildPath;

console.log(`Serving static files from: ${PUBLIC_DIR}`);

app.use(express.static(PUBLIC_DIR));

// SPA Fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

// Start the server if run directly
const PORT = parseInt(process.env.PORT) || 8080;
const HOST = "0.0.0.0"; // Listen on all network interfaces

if (require.main === module) {
  app.listen(PORT, HOST, () => {
    console.log(`Server running and listening on http://${HOST}:${PORT}`);
  });
}

module.exports = app;
