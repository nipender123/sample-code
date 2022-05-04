const axios = require("axios");

const skyBiometryHelper = {
  fetchfacialfromSky: async (imgUrl) => {
    try {
      return await axios.post(
        `${process.env.SKYBIOMETRY_API_URL}/detect.json?api_key=${process.env.SKYBIOMETRY_API_KEY}&api_secret=${process.env.SKYBIOMETRY_API_SECRET}&urls=${imgUrl}&detector=agressive&attributes=all&detect_all_feature_points=true&force_reprocess_image=true`
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      return null;
    }
  },

  detectFaces: async (imgUrl) => {
    try {
      const config = {
        method: "get",
        url: `${process.env.SKYBIOMETRY_API_URL}/detect.json?api_key=${process.env.SKYBIOMETRY_API_KEY}&api_secret=${process.env.SKYBIOMETRY_API_SECRET}&urls=${imgUrl}&detector=agressive&attributes=all&detect_all_feature_points=true&force_reprocess_image=true`,
        headers: {},
      };

      const response = await axios(config);

      return { status: true, data: response.data };
    } catch (err) {
      return { status: false, data: null, message: err.message, image: imgUrl };
    }
  },
};

module.exports = skyBiometryHelper;
