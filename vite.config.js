import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Absolute base path for Firebase Hosting
  define: {
    // Inject config for production build
    "window.CONFIG": JSON.stringify({
      API_URL: "/api",
      BASE_PATH: "",
    }),
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist/public",
    assetsDir: "assets",
    emptyOutDir: true,
  },
});
