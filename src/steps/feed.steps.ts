import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/fixtures';
const { Given, When, Then } = createBdd(test);


Given('I am on the home page', async ({ page }) => {
  await page.goto('/');
});

When('I select the {string} tag', async ({ page }, tag: string) => {
  await page.locator('.sidebar').getByRole('link', { name: tag, exact: true }).click();
});

Then('the feed should show only articles tagged {string}', async ({ page }, tag: string) => {
  await expect(page).toHaveURL(new RegExp(`/tag/${tag}$`));
  await expect(page.locator('.feed-toggle').getByText(tag)).toBeVisible();

  const previews = page.locator('.article-preview');
  await expect(previews.first()).toBeVisible();

  const count = await previews.count();
  for (let i = 0; i < count; i++) {
    await expect(previews.nth(i).locator('.tag-list')).toContainText(tag);
  }
});

let initialCount: number;

function parseCount(text: string | null): number {
  return Number((text ?? '').trim());
}

When('I favorite the first article', async ({ page }) => {
  const button = page.locator('app-favorite-button button').first();
  initialCount = parseCount(await button.textContent());

  const response = page.waitForResponse(
    (r) => r.url().includes('/favorite') && r.request().method() === 'POST'
  );
  await button.click();
  await response;
});

Then('the favorite count should increase by one', async ({ page }) => {
  const button = page.locator('app-favorite-button button').first();
  await expect(button).toHaveText(new RegExp(`\\b${initialCount + 1}\\b`));
});