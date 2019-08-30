const puppeteer = require("puppeteer");
const expect = require("chai").expect;

const config = require("../lib/config");
const functions = require("../lib/helpers");
const utils = require("../lib/utils");

const loginPageLocator = require("../page-objects/login.page");
const homePageLocator = require("../page-objects/home.page");
const accSummaryLocator = require("../page-objects/account_summary.page");

let browser;
let page;

before(async () => {
  browser = await puppeteer.launch({
    headless: config.isHeadLess,
    slowMo: config.slowMo,
    devtools: config.devtools,
    timeout: config.launchTimeout
  });
  page = await browser.newPage();
  await page.setDefaultTimeout(config.waitingTimeout);
  await page.setViewport({
    width: config.viewportWeiht,
    height: config.viewportHeight
  });
});

after(async () => {
  await browser.close();
});

describe('Login page: invalid tests', () => {
  it('Open the site', async () => {
    await functions.loadUrl(page, config.baseURl);
    await functions.shouldExist(page, homePageLocator.corusel, true);
    await functions.shouldExist(page, homePageLocator.navigation_bar, true);
  });

  it('Open the login page', async () => {
    await functions.click(page, homePageLocator.signin_button);
    await functions.shouldExist(page, loginPageLocator.login_form, true);
  });

  it('invalid login', async () => {
    await functions.typeText(page, loginPageLocator.login_input, utils.generateID(5));
    await functions.typeText(page, loginPageLocator.password_input, utils.generateNumbers());

    await functions.click(page, loginPageLocator.submit_button);
    await functions.waitForText(page, loginPageLocator.login_form, "Login and/or password are wrong.");
  });
});

describe('Login page: valid tests', () => {
  it('Select the "Remember me" chackbox', async () => {
    await functions.click(page, loginPageLocator.rememberMe_checkbox);

    const onCheckbox = await page.evaluate(() => {
      return document.querySelector('input[type="checkbox"]').checked;
    });

    expect(onCheckbox).to.equal(true);
  });

  it('Valid login', async () => {
    await functions.typeText(page, loginPageLocator.login_input, "username");
    await functions.typeText(page, loginPageLocator.password_input, "password");
    await functions.click(page, loginPageLocator.submit_button);

    await functions.shouldExist(page, accSummaryLocator.navigation_bar);

    const url = await page.url();
    const title = await page.title();
    expect(url).to.contain("http://zero.webappsecurity.com/bank/account-summary.html");
    expect(title).to.contain("Zero - Account Summary");
  });
});
