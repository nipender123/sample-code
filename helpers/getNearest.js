const jsdom = require("jsdom");
const strip_tags = require("striptags");

const getNearest = (htmlArray, src) => {
  const html = htmlArray.find((hA) => hA.search(src));

  return strip_tags(html).trim();
};

const convertHtmlToArray = (html) => {
  const dom = new jsdom.JSDOM(html);
  const domElement = new dom.window.DOMParser().parseFromString(
    html,
    "text/html"
  );
  const arr = [...domElement.body.children].map((child) => child.outerHTML);

  const cleanHTML = arr.map((child) => {
    const filterStr = child.split("\n").join(" ");
    const onlyText = filterStr.split("\t").join(" ").trim();
    return onlyText;
  });

  return cleanHTML;
};

module.exports = { getNearest, convertHtmlToArray };
