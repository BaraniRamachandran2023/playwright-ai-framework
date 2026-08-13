import { test as base } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage';


import { ArticlePage } from '../pages/ArticlePage';

type Pages = {
  loginPage: LoginPage;
  articlePage: ArticlePage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  articlePage: async ({ page }, use) => {
    await use(new ArticlePage(page));
  },
});



export const expect = test.expect;


