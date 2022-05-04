const imgToBase64 = require("image-to-base64");

const UrlToBase64 = async (url) => {
  try {
    const returnedB64 = await imgToBase64(url);
    return { status: true, data: returnedB64 };
  } catch (error) {
    return { status: false, data: null, message: error.message, image: url };
  }
};

module.exports = UrlToBase64;
