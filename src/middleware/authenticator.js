const { JsonWebTokenError } = require("jsonwebtoken");
const token = require("../utils/token");
const clientErrors = require("../utils/clientErrors");

const authenticator = (req, res, next) => {
  try {
    const { accessToken } = req.body;
    if (!accessToken) throw clientErrors.BadRequest("no accessToken supplied");
    const tokenData = token.validateAccessToken(accessToken); // throws an error if invalid, else it is true
    next(tokenData);
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      throw clientErrors.Unauthorized("invalid api token");
    }
  }
};

module.exports = authenticator;
