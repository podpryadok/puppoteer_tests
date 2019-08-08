const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const config = require('../lib/config');

describe('Home page tests', () => {
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

    it('Open the page', async () => {
        await page.goto(config.baseURl);
        await page.waitForSelector(".header-logotype");

        const url = await page.url();
        const title = await page.title();

        expect(url).to.contain("http://dnepr.hillel.it:5000/index.html");
        expect(title).to.contains("trashoff");
    });
});