/* eslint-disable no-unused-vars */
const convertapi = require("convertapi")(process.env.CONVERT_API_KEY);

const imagesFromPdf = async (pdf) => {
  try {
    const getImages = await convertapi.convert(
      "extract-images",
      {
        File: pdf,
        StoreFile: true,
      },
      "pdf"
    );
    if (getImages) {
      return { status: true, data: getImages.response.Files };
    }
  } catch (error) {
    return { status: false, message: error.message, data: [], pdf };
  }
};

const splitPdf = async (pdf) => {
  try {
    const pages = await convertapi.convert(
      "split",
      {
        File: pdf,
        // PageRange,
      },
      "pdf"
    );
    if (pages) {
      const pageWithFiles = pages.response.Files.map((page, index) => {
        const pageData = {
          url: page.Url,
          pageNumber: index + 1,
        };
        return pageData;
      });

      return { status: true, data: pageWithFiles };
    }
  } catch (error) {
    return { status: false, message: error.message, data: [] };
  }
};

module.exports = { imagesFromPdf, splitPdf };
