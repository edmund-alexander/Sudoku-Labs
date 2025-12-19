import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // Relative base path for GitHub Pages subdirectory deployment
  define: {
    // Inject config for production build to avoid relying on ignored local files
    'window.CONFIG': JSON.stringify({
      API_URL: '/',
      BASE_PATH: ''
    })
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
