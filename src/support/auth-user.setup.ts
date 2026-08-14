import { test as setup, expect } from '@playwright/test';

setup('ensure auth user exists', async ({ request }) => {
  const email = process.env.AUTH_USER_EMAIL!;
  const password = process.env.AUTH_USER_PASSWORD!;
  const username = process.env.AUTH_USER_NAME!;

  let response = await request.post(`${process.env.API_URL}/users/login`, {
    data: { user: { email, password } },
  });

  if (!response.ok()) {
    response = await request.post(`${process.env.API_URL}/users`, {
      data: { user: { username, email, password } },
    });
  }

  expect(
    response.ok(),
    `Could not log in or register ${email}: ${response.status()}`
  ).toBeTruthy();
});