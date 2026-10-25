import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  timeout: 180000,
  use: {
    baseURL: process.env.TEST_BASE_URL || "http://127.0.0.1:4173",
    headless: true,
    launchOptions: { channel: "msedge" },
    screenshot: "only-on-failure",
  },
  webServer: process.env.TEST_BASE_URL
    ? undefined
    : {
        command:
          'node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 4173',
        url: "http://127.0.0.1:4173",
        reuseExistingServer: true,
      },
  reporter: [["list"], ["html", { open: "never" }]],
});
