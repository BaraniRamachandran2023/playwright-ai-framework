import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import fs from 'fs';
import { execSync } from 'child_process';

const HISTORY_PATH = 'data/run-history.jsonl';

function classifyError(msg: string | undefined): string {
  if (!msg) return 'NONE';
  const m = msg.toLowerCase();
  if (m.includes('waiting for locator') || m.includes('element is not visible')) return 'LOCATOR_TIMEOUT';
  if (m.includes('strict mode violation')) return 'LOCATOR_AMBIGUOUS';
  if (m.includes('expect(') || m.includes('assertion')) return 'ASSERTION';
  if (m.includes('net::') || m.includes('econnrefused') || m.includes('socket hang up')) return 'NETWORK';
  if (m.includes('navigation') || m.includes('page.goto')) return 'NAVIGATION';
  if (m.includes('timeout') && m.includes('exceeded')) return 'GENERIC_TIMEOUT';
  return 'UNCLASSIFIED';
}

function git(cmd: string): string {
  try {
    return execSync(cmd).toString().trim();
  } catch {
    return 'unknown';
  }
}

type HistoryRow = {
  runId: string;
  timestamp: string;
  testId: string;
  title: string;
  project: string;
  status: string;
  retry: number;
  passedOnRetry: boolean;
  durationMs: number;
  errorClass: string;
  errorMessage: string | null;
  commit: string;
  branch: string;
  ci: boolean;
};

export default class RunHistoryReporter implements Reporter {
  private runId = `${Date.now()}`;
  private commit = git('git rev-parse --short HEAD');
  private branch = git('git rev-parse --abbrev-ref HEAD');
  private rows: HistoryRow[] = [];

  onTestEnd(test: TestCase, result: TestResult) {
    this.rows.push({
      runId: this.runId,
      timestamp: new Date().toISOString(),
      testId: test.titlePath().join(' > '),
      title: test.title,
      project: test.parent.project()?.name ?? 'unknown',
      status: result.status,
      retry: result.retry,
      passedOnRetry: result.retry > 0 && result.status === 'passed',
      durationMs: result.duration,
      errorClass: classifyError(result.error?.message),
      errorMessage: result.error?.message?.slice(0, 400) ?? null,
      commit: this.commit,
      branch: this.branch,
      ci: !!process.env.CI,
    });
  }

  onEnd() {
    if (this.rows.length === 0) return;
    fs.mkdirSync('data', { recursive: true });
    fs.appendFileSync(
      HISTORY_PATH,
      this.rows.map((r) => JSON.stringify(r)).join('\n') + '\n'
    );
  }
}