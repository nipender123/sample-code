const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const authorization = req.headers.authorization;
      req.jwt = jwt.verify(authorization, process.env.JWTSECRET);
      return next();
    } catch (err) {
      return res.status(401).json({ error: "Not authenticated" });
    }
  } else {
    return res.status(401).json({ error: "Not authenticated" });
  }
};

exports.inviteAuth = (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const authorization = req.headers.authorization;
      req.params.projectContactId = jwt.verify(
        authorization,
        process.env.JWTSECRET
      ).data.projectContactId;
      req.params.projectId = jwt.verify(
        authorization,
        process.env.JWTSECRET
      ).data.projectId;
      req.params.contactId = jwt.verify(
        authorization,
        process.env.JWTSECRET
      ).data.contactId;
      return next();
    } catch (err) {
      return res.status(401).json({ error: "Not authenticated" });
    }
  } else {
    return res.status(401).json({ error: "Not authenticated" });
  }
};
