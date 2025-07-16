const { join } = require('path');
/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
    // Set cache location for Puppeteer so Render doesn't lose it!
    cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
