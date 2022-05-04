const puppeteer = require("puppeteer");
const url = require("url");
const cheerio = require("cheerio");
const { getNearest, convertHtmlToArray } = require("./getNearest");

const getImagesFromUrl = async (reqUrl) => {
  try {
    // Initialize Puppeteer
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
      ignoreDefaultArgs: ["--disable-extensions"],
      slowMo: 100,
    });

    const page = await browser.newPage();

    // Specify comic issue page url
    await page.goto(reqUrl, { waitUntil: "networkidle0", timeout: 0 });

    const content = await page.content();
    // End Puppeteer
    await browser.close();

    const htmlArray = convertHtmlToArray(content);

    const $ = cheerio.load(content);

    const issueSrcs = await Promise.all(
      $("img").map((image, e) => {
        const dataSrc = $(e).attr("data-src");
        const src = $(e).attr("src");

        const srcUrl =
          typeof dataSrc !== "undefined" ? url.parse(dataSrc) : url.parse(src);

        const nearestText = getNearest(htmlArray, srcUrl.href);

        if (!srcUrl.host) {
          return { text: nearestText, src: url.resolve(reqUrl, srcUrl) };
        } else {
          return { text: nearestText, src: url.format(srcUrl) };
        }
      })
    );

    const imageUrls = issueSrcs.map((iS) => {
      const { src, text } = iS;
      try {
        if (src.match(/^data:image\/\w+;base64,/)) {
          return { type: "base64", src, text };
        }
        // eslint-disable-next-line no-unused-expressions
        return { type: "url", src, text };
      } catch (err) {
        return null;
      }
    });
    return { status: true, length: imageUrls.length, data: imageUrls };
  } catch (error) {
    return { status: false, message: error.message, data: [], Link: url };
  }
};

module.exports = { getImagesFromUrl };
