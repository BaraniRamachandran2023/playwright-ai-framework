import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/fixtures';
import type { APIResponse } from '@playwright/test';

const { When, Then } = createBdd(test);

let response: APIResponse;

When('I request a login token with valid credentials', async ({ request }) => {
  response = await request.post(`${process.env.API_URL}/users/login`, {
    data: {
      user: {
        email: process.env.USER_EMAIL!,
        password: process.env.USER_PASSWORD!,
      },
    },
  });
});

When(
  'I request a login token with email {string} and password {string}',
  async ({ request }, email: string, password: string) => {
    response = await request.post(`${process.env.API_URL}/users/login`, {
      data: { user: { email, password } },
    });
  }
);

Then('the response status should be {int}', async ({}, status: number) => {
  expect(response.status()).toBe(status);
});

Then('the response should contain a valid user object', async () => {
  const body = await response.json();
  expect(body).toHaveProperty('user');
  expect(body.user).toMatchObject({
    email: process.env.USER_EMAIL!,
    username: process.env.USER_NAME!,
  });
  expect(typeof body.user.token).toBe('string');
  expect(body.user.token.length).toBeGreaterThan(0);
});