const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const config = require('../lib/config');

describe('Login invalid tests', () => {
    let browser;
    let page;

    before(async () => {
        browser = await puppeteer.launch({
            headless: config.isHeadLess,
            slowMo: config.slowMo,
            devtools: config.devtools,
            timeout: config.launchTimeout,
        });
        page = await browser.newPage();
        await page.setDefaultTimeout(config.waitingTimeout);
        await page.setViewport({
            width: config.viewportWeiht,
            height: config.viewportHeight
        });
    });

    after(async () => {
        //await page.waitFor(3000); // for debub
        await browser.close();
    });

    // it('Showing exceptions when inputs were empty', async () => {
    //     await page.goto(config.baseURl);
    //     await page.waitForSelector(".btn.btn-primary");
    //     await page.click(".btn.btn-primary");
    //     await page.waitForSelector(".help-block");
    // });

    // it('Invalid log in ', async () => {
    //     await page.type("#email", "admin@gmail.com");
    //     await page.type("#password", "admin1");
    //     await page.click(".btn.btn-primary");
    //     await page.waitForSelector(".help-block");
    // });
});