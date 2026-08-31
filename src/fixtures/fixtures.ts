import { test as base } from 'playwright-bdd';
import AxeBuilder from '@axe-core/playwright';
import { LoginPage } from '../pages/LoginPage';
import { ArticlePage } from '../pages/ArticlePage';

// 1. Combine all fixture types into a single interface
type MyFixtures = {
  loginPage: LoginPage;
  articlePage: ArticlePage;
  makeAxeBuilder: () => AxeBuilder;
};

// 2. Extend base test once with all fixtures
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  articlePage: async ({ page }, use) => {
    await use(new ArticlePage(page));
  },
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () =>
      new AxeBuilder({ page }).withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
      ]);
    await use(makeAxeBuilder);
  },
});

export const expect = test.expect;