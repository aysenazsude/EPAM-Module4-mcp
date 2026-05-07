const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('Navigating to login page...');
  await page.goto('https://the-internet.herokuapp.com/login');

  console.log('Filling in username...');
  await page.fill('#username', 'tomsmith');

  console.log('Filling in password...');
  await page.fill('#password', 'SuperSecretPassword!');

  console.log('Clicking Login button...');
  await page.click('button[type="submit"]');

  await page.waitForLoadState('networkidle');

  const message = await page.locator('.flash').textContent();
  console.log('Result message:', message.trim());

  await page.screenshot({ path: 'login-result.png' });
  console.log('Screenshot saved as login-result.png');

  await browser.close();
})();
