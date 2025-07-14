const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  try {
    console.log('[INFO] Received request to /');
    console.log('[INFO] Launching Puppeteer...');
    const chromePath = process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium';
    console.log('[DEBUG] Chrome path:', chromePath, 'Exists:', fs.existsSync(chromePath));
    const browser = await puppeteer.launch({
      executablePath: chromePath,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true
    });
    console.log('[INFO] Browser launched.');
    const page = await browser.newPage();
    console.log('[INFO] New page opened.');
    await page.goto('https://example.com');
    console.log('[INFO] Navigated to https://example.com');
    const title = await page.title();
    console.log(`[INFO] Page title fetched: ${title}`);
    await browser.close();
    console.log('[INFO] Browser closed.');
    res.send(`Page Title: ${title}`);
  } catch (err) {
    console.error('[ERROR]', err);
    res.status(500).send('Error running Puppeteer: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});