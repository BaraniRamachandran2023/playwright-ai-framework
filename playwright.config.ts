import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import dotenv from 'dotenv';

dotenv.config();

const testDir = defineBddConfig({
  features: 'src/features/**/*.feature',
  steps: ['src/steps/**/*.ts', 'src/fixtures/**/*.ts'],
});

export default defineConfig({
  testDir,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [
  ['list'],
  ['html', { open: 'never' }],
  ['./src/support/run-history-reporter.ts'],
  ['allure-playwright', { resultsDir: 'allure-results' }],
],
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
projects: [
  {
    name: 'setup',
    testDir: './src/support',
    testMatch: /global\.setup\.ts/,
  },
  {
    name: 'api',
    testDir,
    testMatch: /api-.*\.feature\.spec\.js/,
  },
  {
    name: 'auth-ui',
    testDir,
    testMatch: /login\.feature\.spec\.js/,
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'chromium',
    testDir,
    testIgnore: /(login|api-.*)\.feature\.spec\.js/,
    use: {
      ...devices['Desktop Chrome'],
      storageState: '.auth/user.json',
    },
    dependencies: ['setup'],
  },
],


});