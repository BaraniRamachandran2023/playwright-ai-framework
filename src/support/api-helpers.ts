import { APIRequestContext } from '@playwright/test';
import fs from 'fs';

export function getToken(): string {
  const state = JSON.parse(fs.readFileSync('.auth/user.json', 'utf-8'));
  return state.origins[0].localStorage.find(
    (i: { name: string }) => i.name === 'jwtToken'
  ).value;
}

export async function createArticle(
  request: APIRequestContext,
  title: string
): Promise<string> {
  const response = await request.post(`${process.env.API_URL}/articles`, {
    headers: { Authorization: `Token ${getToken()}` },
    data: {
      article: {
        title,
        description: 'Seeded by API for test setup',
        body: 'Seeded body',
        tagList: ['automation'],
      },
    },
  });
  if (!response.ok()) {
    throw new Error(`Seed failed: ${response.status()} ${await response.text()}`);
  }
  const body = await response.json();
  return body.article.slug;
}