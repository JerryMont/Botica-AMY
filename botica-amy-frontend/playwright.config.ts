import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: ['**/*.js'],
  timeout: 120_000,
  retries: 1,
  use: {
    headless: true,
    baseURL: 'http://127.0.0.1:8000',
    // Retain video and trace for failed tests to help debugging headless issues
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    // Launch options to improve stability in headless environments
    launchOptions: {
      args: [
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--window-size=1280,800'
      ]
    },
  },
});
