import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
  ],
  server: {
    port: 5000,
  },
  define: {
    // Define global for PouchDB dependencies
    global: "globalThis",
  },
});
