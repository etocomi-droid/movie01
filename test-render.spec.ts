import { test, expect } from '@playwright/test';

test('load remotion page and extract html with inline scripts', async ({ page }) => {
  const logs: string[] = [];
  page.on('console', msg => logs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => logs.push(`[pageerror] ${err.name}: ${err.message}\n${err.stack}`));

  await page.goto('http://localhost:3000');
  await page.waitForTimeout(3000); // wait for page to render
  
  const fs = require('fs');
  fs.writeFileSync('c:\\Users\\user\\movie_01\\console-logs-detailed.txt', logs.join('\n\n'));
  
  const html = await page.content();
  fs.writeFileSync('c:\\Users\\user\\movie_01\\raw-page.html', html);
});
