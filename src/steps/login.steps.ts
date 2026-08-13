import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/fixtures';

const { Given, When, Then } = createBdd(test);

Given('I am on the login page', async ({ loginPage }) => {
  await loginPage.goto();
});

When('I sign in with valid credentials', async ({ loginPage }) => {
  await loginPage.login(process.env.AUTH_USER_EMAIL!, process.env.AUTH_USER_PASSWORD!);
});

When(
  'I sign in with email {string} and password {string}',
  async ({ loginPage }, email: string, password: string) => {
    await loginPage.login(email, password);
  }
);

Then('I should see my username in the navigation bar', async ({ page }) => {
  await expect(page.getByRole('link', { name: process.env.AUTH_USER_NAME! })).toBeVisible();
});

Then('I should see a login error message', async ({ loginPage }) => {
  await expect(loginPage.errorMessages.first()).toBeVisible();
});