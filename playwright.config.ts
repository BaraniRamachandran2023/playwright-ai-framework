//import { env } from './src/config/env';
import "./src/config/env";
import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";
import dotenv from "dotenv";

dotenv.config();

const testDir = defineBddConfig({
  features: "src/features/**/*.feature",
  steps: ["src/steps/**/*.ts", "src/fixtures/**/*.ts"],
});

export default defineConfig({
  testDir,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ["list"],
    ["html", { open: "never" }],
    ["./src/support/run-history-reporter.ts"],
    ["allure-playwright", { resultsDir: "allure-results" }],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    //baseURL: env.baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "auth-user-setup",
      testDir: "./src/support",
      testMatch: /auth-user\.setup\.ts/,
    },
    {
      name: "api",
      testDir,
      testMatch: /api-.*\.feature\.spec\.js/,
      dependencies: ["auth-user-setup"],
    },
    {
      name: "auth-ui",
      testDir,
      testMatch: /login\.feature\.spec\.js/,
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["auth-user-setup"],
    },
    {
      name: "setup",
      testDir: "./src/support",
      testMatch: /global\.setup\.ts/,
      dependencies: ["api", "auth-ui"],
    },
    {
      name: "chromium",
      testDir,
      testIgnore: /(login|api-.*)\.feature\.spec\.js/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/user.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "api-auth-required",
      testDir,
      testMatch: /api-(?!token-).*\.feature\.spec\.js/,
      dependencies: ["setup"],
    },

    {
      name: "ai-agents",
      testDir: "./tests/ai",
      dependencies: ["setup"], // your existing auth setup project
      use: {
        ...devices["Desktop Chrome"],
        storageState: ".auth/user.json",
      },
    },
  ],
});
