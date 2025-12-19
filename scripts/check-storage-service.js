const fs = require("fs");
const path = require("path");

const APP_PATH = path.join(__dirname, "../src/App.jsx");
const SERVICES_PATH = path.join(__dirname, "../src/services.js");

// 1. Find all usages in App.jsx
const appContent = fs.readFileSync(APP_PATH, "utf8");
const usageRegex = /StorageService\.(\w+)/g;
const usages = new Set();
let match;
while ((match = usageRegex.exec(appContent)) !== null) {
  usages.add(match[1]);
}

// 2. Find all definitions in services.js
const servicesContent = fs.readFileSync(SERVICES_PATH, "utf8");

// We will search the whole file for keys that look like object properties
// This is a heuristic: "  methodName:" or "  methodName: ("
const definitionRegex = /^\s+([a-zA-Z0-9_]+)\s*:/gm;
const definitions = new Set();

while ((match = definitionRegex.exec(servicesContent)) !== null) {
  definitions.add(match[1]);
}

// 3. Compare
const missing = [];
for (const usage of usages) {
  // Check if usage is in definitions
  if (!definitions.has(usage)) {
    // Double check: maybe it's defined as "StorageService.methodName =" assignment?
    if (!servicesContent.includes(`StorageService.${usage} =`)) {
      missing.push(usage);
    }
  }
}

console.log("--- StorageService Analysis ---");
console.log(`Found ${usages.size} unique usages in App.jsx`);
console.log(`Found ${definitions.size} definitions in services.js`);

if (missing.length > 0) {
  console.log("\n❌ MISSING METHODS:");
  missing.forEach((m) => console.log(`- ${m}`));
  process.exit(1);
} else {
  console.log("\n✅ All methods defined.");
  process.exit(0);
}
