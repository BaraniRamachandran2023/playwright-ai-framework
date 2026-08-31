import dotenv from 'dotenv';
import path from 'path';



const TEST_ENV = process.env.TEST_ENV || 'dev';

dotenv.config({ path: path.resolve(process.cwd(), `.env.${TEST_ENV}`) });










 


























/*
import type { Environment } from '../types';

const VALID_ENVIRONMENTS: Environment[] = ['dev', 'staging', 'prod'];

function isEnvironment(value: string): value is Environment {
  return (VALID_ENVIRONMENTS as string[]).includes(value);
}

const raw = process.env.TEST_ENV ?? 'dev';

if (!isEnvironment(raw)) {
  throw new Error(
    `Unknown TEST_ENV "${raw}". Valid values: ${VALID_ENVIRONMENTS.join(', ')}`
  );
}

export const TEST_ENV: Environment = raw;

dotenv.config({ path: path.resolve(process.cwd(), `.env.${TEST_ENV}`) });

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing "${key}" in .env.${TEST_ENV}`);
  }
  return value;
}

export const env = {
  baseURL: requireEnv('BASE_URL'),
  apiURL: requireEnv('API_URL'),
  userEmail: requireEnv('USER_EMAIL'),
  userPassword: requireEnv('USER_PASSWORD'),
  userName: requireEnv('USER_NAME'),
  authEmail: requireEnv('AUTH_USER_EMAIL'),
  authPassword: requireEnv('AUTH_USER_PASSWORD'),
  authName: requireEnv('AUTH_USER_NAME'),
} as const;


*/