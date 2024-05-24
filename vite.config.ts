/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, "certs/privateKey.pem")),
    //   cert: fs.readFileSync(path.resolve(__dirname, "certs/tmpcert.pem")),
    // },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    pool: "forks",
    exclude: [...configDefaults.exclude, "./src/types/**"],
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        "**/src/types/**",
        ".eslintrc.cjs",
        "**/src/vite-env.d.ts",
        "**/src/index.tsx",
        "**/src/main.tsx",
        "**/src/models/Event.ts",
        "**/src/contexts/**",
        "**/src/App.tsx",
      ],
    },
  },
});
