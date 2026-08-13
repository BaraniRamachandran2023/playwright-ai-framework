import { test as base } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage';

type Pages = {
  loginPage: LoginPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export const expect = test.expect;