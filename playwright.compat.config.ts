import { defineConfig, type Project } from '@playwright/test';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// Run against an already-started local server. Optional executable overrides
// allow installed browser builds without changing application dependencies.
const screens = [
  { name: 'phone', viewport: { width: 390, height: 844 }, touch: true },
  { name: 'tablet', viewport: { width: 820, height: 1180 }, touch: true },
  { name: 'desktop', viewport: { width: 1440, height: 1000 }, touch: false },
  { name: 'large', viewport: { width: 2560, height: 1440 }, touch: false },
];
const projects: Project[] = (['chromium', 'firefox', 'webkit'] as const).flatMap(browserName =>
  screens.map(screen => ({
    name: `${browserName}-${screen.name}`,
    use: {
      browserName,
      viewport: screen.viewport,
      hasTouch: screen.touch,
      ...(browserName !== 'firefox' ? { isMobile: screen.touch } : {}),
      launchOptions: {
        ...(process.env[`COMPAT_${browserName.toUpperCase()}_EXECUTABLE`]
          ? { executablePath: process.env[`COMPAT_${browserName.toUpperCase()}_EXECUTABLE`] } : {}),
        ...(browserName === 'chromium' && process.env.COMPAT_CHROMIUM_CHANNEL
          ? { channel: process.env.COMPAT_CHROMIUM_CHANNEL } : {}),
      },
    },
  })));

export default defineConfig({
  testDir: './tests',
  testMatch: 'responsive-compatibility.spec.ts',
  outputDir: join(tmpdir(), 'bondtite-compat-results'),
  timeout: 60_000,
  workers: 3,
  reporter: 'list',
  use: {
    baseURL: process.env.COMPAT_BASE_URL ?? 'http://localhost:8070',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects,
});
