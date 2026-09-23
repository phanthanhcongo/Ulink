import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config cho bộ UI test có sẵn trong `test/ui`.
 *
 * Target mặc định lấy từ env (khớp với các default hardcode trong từng spec):
 *   - FRONTEND_URL : URL frontend Next.js  (vd http://localhost:3000)
 *   - DIRECTUS_URL : URL Directus API      (vd http://localhost:8055)
 *   - MAILPIT_URL  : URL Mailpit (password-flow test)
 *
 * Chạy:  npm run test:ui
 *        FRONTEND_URL=http://localhost:3000 DIRECTUS_URL=http://localhost:8055 npm run test:ui
 */
export default defineConfig({
  testDir: './test/ui',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.FRONTEND_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
