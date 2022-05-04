const AWS = require("aws-sdk");
const { uuid } = require("short-uuid");

const spacesEndpoint = new AWS.Endpoint(process.env.S3_ENDPOINT);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.SPACE_ACCESS_KEY_ID,
  secretAccessKey: process.env.SPACE_ACCESS_SECRET_KEY,
});

// =====================================
// const getFileExtension = (base64) =>
//   base64.substring(base64.indexOf("/") + 1, base64.indexOf(";base64"));

//  ========================================

const putObjectWrapper = (params) =>
  new Promise((resolve, reject) => {
    s3.putObject(params, (err, result) => {
      if (err) reject(err);
      if (result) resolve(result);
    });
  });

const uploadToS3 = async (base64) => {
  const time = uuid();
  const fileName = `${time}.jpeg`;

  //   const blob = await base64toBlob(base64);
  const blob = Buffer.from(
    base64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const params = {
    Bucket: process.env.SPACE_BUCKET_NAME,
    Key: fileName,
    Body: blob,
    ContentType: "image/jpeg",
    ContentEncoding: "base64",
    ACL: "public-read",
  };

  try {
    await putObjectWrapper(params);
    return fileName;
  } catch (err) {
    return null;
  }
};

module.exports = uploadToS3;
