/* eslint-disable prettier/prettier */
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const User = require("../models").user;

const login = async (req, res) => {
  const { email, password } = req.body;
  let code = 401;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      if (user.password === md5(password)) {
        delete user.password;
        code = 200;
        return res.status(code).json({
          code,
          user,
          accessToken: jwt.sign({ user }, process.env.JWTSECRET),
        });
      }
      return res.status(code).json({
        code,
        errors: { password: "Please provide valid password" },
      });
    }
    
    return res
      .status(code)
      .json({ code, errors: { email: "Please provide valid email address" } });
  } catch (err) {
    code = 500;
    return res.status(code).json({ code, errors: { error: err.message } });
  }
};


// eslint-disable-next-line arrow-body-style
const uploadImage = async (_req, res) => {
  return res.status(200).json({ response: {} });
};

module.exports = {
  login,
  uploadImage,
};
