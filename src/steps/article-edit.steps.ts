import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/fixtures';
import { createArticle } from '../support/api-helpers';

const { Given, When, Then } = createBdd(test);

let slug: string;
let updatedTitle: string;

Given('an article exists', async ({ request, articlePage }) => {
  slug = await createArticle(request, `Seeded Article ${Date.now()}`);
  await articlePage.gotoArticle(slug);
});

When('I update its title', async ({ articlePage }) => {
  updatedTitle = `Updated Article ${Date.now()}`;
  await articlePage.updateTitle(updatedTitle);
});

Then('the article page shows the updated title', async ({ articlePage }) => {
  await expect(articlePage.articleTitle).toHaveText(updatedTitle);
});

When('I delete it', async ({ articlePage }) => {
  await articlePage.deleteArticle();
});

Then('the article should no longer exist', async ({ page }) => {
  await expect(page).toHaveURL(process.env.BASE_URL + '/');
});