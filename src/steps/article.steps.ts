import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/fixtures';

const { Given, When, Then } = createBdd(test);

let articleTitle: string;

Given('I am on the article editor', async ({ articlePage }) => {
  await articlePage.gotoEditor();
});

When('I publish an article with a unique title', async ({ articlePage }) => {
  articleTitle = `Playwright Test Article ${Date.now()}`;
  await articlePage.publish(
    articleTitle,
    'Written by an automated test',
    'This article was created by a Playwright BDD scenario.',
    'automation'
  );
});

Then('I should land on the published article page', async ({ articlePage }) => {
  await expect(articlePage.articleTitle).toHaveText(articleTitle);
});