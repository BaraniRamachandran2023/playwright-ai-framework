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
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://demo.realworld.show',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});