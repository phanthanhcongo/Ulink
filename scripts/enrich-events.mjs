#!/usr/bin/env node
// Wrapper: runs enrich-events.ts inside frontend/ via tsx.
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const frontendDir = resolve(__dirname, '..', 'frontend');

const r = spawnSync(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['tsx', 'scripts/enrich-events.ts'],
  { cwd: frontendDir, stdio: 'inherit', env: process.env }
);
process.exit(r.status ?? 1);
