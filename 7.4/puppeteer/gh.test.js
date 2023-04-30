const { TimeoutError } = require("puppeteer");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  }, 60000); 

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 60000); 

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    }, 60000); 
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  });
});
describe("Github tabs tests", () => {

  test("Enterprice", async () => {
    await page.goto("https://github.com/enterprise");
    await page.waitForSelector('h1');
    const title1 = await page.title();
    expect(title1).toEqual('Enterprise · A smarter way to work together · GitHub');
  }, 6000);

  test("Marketplace", async () => {
    await page.goto("https://github.com/marketplace");
    await page.waitForSelector('h1');
    const title1 = await page.title();
    expect(title1).toEqual('GitHub Marketplace · to improve your workflow · GitHub');
  }, 6000);

  test("Plans", async () => {
    await page.goto("https://github.com/pricing");
    await page.waitForSelector('h1');
    const title1 = await page.title();
    expect(title1).toEqual('Pricing · Plans for every developer · GitHub');
  }, 6000);
 
});
