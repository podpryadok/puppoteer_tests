const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const config = require('../lib/config');

describe('Login like a client', () => {
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

    it('Open login pop-up', async () => {
        await page.goto(config.baseURl);
        await page.waitForSelector(".header-logotype");

        await page.click(".button");
        await page.waitForSelector("#entranceForm");
    });

    it('Valid log in', async () => {
        // await page.type("#email", "admin@gmail.com");
        // await page.type("#password", "admin");
        // await page.click(".btn.btn-primary");
        // await page.waitForSelector("#nearest_events");

        // const url = await page.url();
        // expect(url).to.contain("https://hub-staging.clockwise.software/home");
    });
});

