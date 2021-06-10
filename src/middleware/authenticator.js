const { JsonWebTokenError } = require("jsonwebtoken");
const token = require("../utils/token");
const clientErrors = require("../utils/clientErrors");

const authenticator = (req, res, next) => {
  try {
    const { accessToken } = req.body;
    if (!accessToken) throw clientErrors.BadRequest("no accessToken supplied");
    const tokenData = token.validateAccessToken(accessToken); // throws an error if invalid, else it is true
    req.id = tokenData.id;
    next();
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      throw clientErrors.Unauthorized("invalid api token");
    }
    next(err);
  }
};

module.exports = authenticator;
