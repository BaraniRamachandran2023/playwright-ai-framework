import { test as setup, expect } from '@playwright/test';
import fs from 'fs';

const AUTH_FILE = '.auth/user.json';

setup('authenticate via API', async ({ request }) => {
  const response = await request.post(`${process.env.API_URL}/users/login`, {
    data: {
      user: {
        email: process.env.USER_EMAIL!,
        password: process.env.USER_PASSWORD!,
      },
    },
  });

  expect(response.ok()).toBeTruthy();

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
