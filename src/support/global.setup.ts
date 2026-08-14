import { test as setup, expect } from '@playwright/test';
import fs from 'fs';

const AUTH_FILE = '.auth/user.json';

setup('authenticate via API', async ({ request }) => {
  const email = process.env.USER_EMAIL!;
  const password = process.env.USER_PASSWORD!;
  const username = process.env.USER_NAME!;

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

  const body = await response.json();
  const token: string = body.user.token;

  fs.mkdirSync('.auth', { recursive: true });
  fs.writeFileSync(
    AUTH_FILE,
    JSON.stringify({
      cookies: [],
      origins: [
        {
          origin: process.env.BASE_URL!,
          localStorage: [{ name: 'jwtToken', value: token }],
        },
      ],
    }, null, 2)
  );
});